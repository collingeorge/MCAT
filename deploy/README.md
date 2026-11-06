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

## Scheduled maintenance

- **Certificate renewal: check in mid-January 2027, before 4 February 2027.** GitHub issues and renews the site's certificate itself, and renewal can fail while the DNS record is proxied by Cloudflare. The current certificate expires on **4 February 2027**. HSTS makes a lapse serious: any browser that has visited the site will refuse to load it, with no warning page to click through.
  1. In *Settings → Pages*, check the certificate status.
  2. If renewal has stalled, switch the `mcat` DNS record to **DNS only** (grey cloud) for a few minutes so GitHub can renew. Then switch it back to proxied.
  3. Repeat this check about three weeks before each yearly expiry.
- **Old Supabase redirect URLs: remove after a few weeks.** Once any old verification or reset emails have expired, remove the `collingeorge.github.io/MCAT/…` and `collinbgeorge.com/study/mcat/…` entries from *Redirect URLs*.

## Rollback

- **Headers only:** set the `mcat` DNS record back to **DNS only** and delete the `mcat.collinbgeorge.com/*` route. Nothing else depends on them.
- **Whole move:** revert the `CNAME` file and redeploy the previous `mcat-study-proxy` source from git history (before PR #36). Then restore the old Supabase Site URL.

## How it was set up (6 November 2026)

1. Progress was synced to the cloud on the old address. Guest progress that was never signed in stays on the old address and does not move.
2. `CNAME mcat → collingeorge.github.io` was added in DNS-only mode, so GitHub could issue the certificate.
3. The `CNAME` file was merged (PR #36), the custom domain was confirmed in Pages, and **Enforce HTTPS** was turned on.
4. The Supabase Site URL and Redirect URLs were updated, keeping the old ones for now.
5. The redirect version of `mcat-study-proxy` was deployed on its existing route.
6. `mcat-security-headers` was created, its route added, and the DNS record switched to proxied.

Run `node tools/test-deployment.cjs` before deploying either Worker. Committing Worker source does not deploy it. No secret keys belong in these Workers or in this repository.
