# Custom-domain delivery

The app lives on its own origin, **https://mcat.collinbgeorge.com/**. It is published by GitHub Pages from this repository; the root `CNAME` file sets the domain.

Why a dedicated subdomain: browsers isolate storage, service workers and login sessions by origin. On its own subdomain, a flaw in any other portfolio app on `collinbgeorge.com` or `collingeorge.github.io` cannot read this app's study data or Supabase session.

## What is deployed (as of 6 November 2026)

| Piece | Where | What it does |
|---|---|---|
| GitHub Pages | repo *Settings → Pages*: custom domain `mcat.collinbgeorge.com`, **Enforce HTTPS** on | Serves the app. `collingeorge.github.io/MCAT/…` redirects to the subdomain. |
| DNS | Cloudflare zone `collinbgeorge.com`: `CNAME mcat → collingeorge.github.io`, **proxied** (orange cloud). Zone SSL/TLS mode **Full (strict)**. | Routes visitors through Cloudflare to GitHub Pages. |
| Worker `mcat-security-headers` | Source: `cloudflare-mcat-headers.mjs`. Route `mcat.collinbgeorge.com/*`. Its public `workers.dev` address is **off**. | Passes each request to GitHub Pages unchanged, strips `Set-Cookie`, and adds the headers below. It answers only for `mcat.collinbgeorge.com`. |
| Worker `mcat-study-proxy` | Source: `cloudflare-mcat-proxy.mjs`. Route `collinbgeorge.com/study/mcat*`. | 301-redirects old links to the same page on the subdomain. It fetches nothing and forwards no cookies, headers or auth codes; only the `passage` and `exam` page context carries over. |
| Cache Rule "MCAT bypass cache" | Cloudflare zone `collinbgeorge.com`: *Caching → Cache Rules*. Match: hostname equals `mcat.collinbgeorge.com`. Action: **Bypass cache**. (Rule id `befb1dc4ab10409ba7d30bccd72dd932`, ruleset `c4f7296fef82467a8cfe5ef23480d471`; the only cache rule on the zone.) | Cloudflare keeps no edge copy of the app's files, so each deploy is visible immediately. GitHub Pages' `max-age=600` and the app's service worker still handle caching. Only the `mcat` hostname matches; `collinbgeorge.com` is unaffected. |
| Supabase | *Authentication → URL Configuration*: Site URL `https://mcat.collinbgeorge.com/index.html`, also in Redirect URLs | Email verification and password-reset links return to the subdomain. |

Security headers added by `mcat-security-headers` (GitHub Pages cannot send headers, and a meta-tag CSP cannot block framing):

| Header | Value |
|---|---|
| `Content-Security-Policy` | `frame-ancestors 'none'` (the full CSP stays in each page's meta tag) |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` |
| `Strict-Transport-Security` | `max-age=31536000` (no `includeSubDomains`, no preload) |

Quick check from any terminal:

```
curl -sI https://mcat.collinbgeorge.com/ | grep -iE 'frame|nosniff|referrer|permissions|strict-transport|set-cookie'
curl -sI https://collinbgeorge.com/study/mcat/recall.html | grep -i location
```

The first should show the six headers and no `Set-Cookie`. The second should show `location: https://mcat.collinbgeorge.com/recall.html`.

## Supabase Security Advisor

After `supabase/schema.sql` is applied, which includes the `rls_auto_enable()` revoke, two warnings remain. Both are expected:

- **`save_mcat_progress` is executable by `authenticated`.** This is by design: it is the only write path, a SECURITY DEFINER function bound to `auth.uid()` with a revision check and a size limit.
- **Leaked password protection is off.** Supabase's own check against known-breached passwords is a paid-plan feature. The app does the same check itself, for free:
  - **New passwords:** before *Create account* or *Set new password*, `js/account.js` checks the password against the HaveIBeenPwned range API using k-anonymity. Only the first 5 characters of the password's SHA-1 hash are sent, with response padding; the match runs in the browser. A breached password is refused, and so is any new password the check cannot verify (fail closed).
  - **Existing passwords:** after sign-in, the same check runs once. If the password has since appeared in a breach, the account panel shows a warning; sign-in is never blocked.
  - **CSP:** `connect-src` allows `https://api.pwnedpasswords.com` for this.

  This is an app-side check: it protects people using the app, but the Supabase API itself does not enforce it, so someone calling Supabase directly could skip it. The Advisor warning therefore stays, accurately. The app also requires passwords of at least 12 characters.

CAPTCHA is deliberately off: hCaptcha and Turnstile load third-party script, which the app's CSP (`script-src 'self'`) forbids. Supabase's built-in auth rate limits stay on. Do not change auth settings without updating the CSP.

## Scheduled maintenance

- **Certificate renewal: check in mid-January 2027, before 4 February 2027.** GitHub issues and renews the site's certificate itself, and renewal can fail while the DNS record is proxied by Cloudflare. The current certificate expires on **4 February 2027**. HSTS makes a lapse serious: any browser that has visited the site will refuse to load it, with no warning page to click through.
  1. In *Settings → Pages*, check the certificate status.
  2. If renewal has stalled, switch the `mcat` DNS record to **DNS only** (grey cloud) for a few minutes so GitHub can renew. Then switch it back to proxied.
  3. Repeat this check about three weeks before each yearly expiry.
- **Old Supabase redirect URLs: remove after a few weeks.** Once any old verification or reset emails have expired, remove the `collingeorge.github.io/MCAT/…` and `collinbgeorge.com/study/mcat/…` entries from *Redirect URLs*.

## Rollback

- **Headers only:** set the `mcat` DNS record back to **DNS only** and delete the `mcat.collinbgeorge.com/*` route. Nothing else depends on them.
- **Cache Rule:** delete "MCAT bypass cache" under *Caching → Cache Rules*. Nothing else depends on it, but Cloudflare would then cache the app's files at the edge again, and a deploy can show stale files for up to about 10 minutes.
- **Whole move:** revert the `CNAME` file and redeploy the previous `mcat-study-proxy` source from git history (before PR #36). Then restore the old Supabase Site URL.

## How it was set up (6 November 2026)

1. Progress was synced to the cloud on the old address. Guest progress that was never signed in stays on the old address and does not move.
2. `CNAME mcat → collingeorge.github.io` was added in DNS-only mode, so GitHub could issue the certificate.
3. The `CNAME` file was merged (PR #36), the custom domain was confirmed in Pages, and **Enforce HTTPS** was turned on.
4. The Supabase Site URL and Redirect URLs were updated, keeping the old ones for now.
5. The redirect version of `mcat-study-proxy` was deployed on its existing route.
6. `mcat-security-headers` was created, its route added, and the DNS record switched to proxied.
7. The "MCAT bypass cache" Cache Rule was added after the first deploy behind the proxy (PR #40). Cloudflare had cached old copies of `account.js`, `app.js`, `styles.css` and `daily-plan.js` that it fetched just before the GitHub Pages deploy finished, so visitors got the new pages with the old scripts until those copies expired.

Run `node tools/test-deployment.cjs` before deploying either Worker. Committing Worker source does not deploy it. No secret keys belong in these Workers or in this repository.
