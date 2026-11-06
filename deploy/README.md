# Custom-domain delivery

The app lives on its own origin, **https://mcat.collinbgeorge.com/**. It is published by GitHub Pages from this repository; the root `CNAME` file sets the domain.

Why a dedicated subdomain: browsers isolate storage, service workers and login sessions by origin. On its own subdomain, a flaw in any other portfolio app on `collinbgeorge.com` or `collingeorge.github.io` cannot read this app's study data or Supabase session.

| File | Cloudflare route | Purpose |
|---|---|---|
| `cloudflare-mcat-proxy.mjs` (Worker `mcat-study-proxy`) | `collinbgeorge.com/study/mcat*` | 301-redirects old links to the subdomain. It fetches nothing and forwards no cookies, headers or auth codes; only the `passage` and `exam` page context carries over. |
| `cloudflare-mcat-headers.mjs` (optional) | `mcat.collinbgeorge.com/*` | Adds `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS. GitHub Pages cannot send headers, and a meta-tag CSP cannot block framing. Requires the DNS record to be proxied. |

## Cut-over order

Do these in order. Merging the `CNAME` file makes GitHub redirect `collingeorge.github.io/MCAT/` to the new domain immediately, so the DNS record must exist first.

1. **Sync your progress.** Sign in on the current site and confirm "Saved to cloud". Guest (not signed-in) progress stays on the old address and does not move.
2. **DNS.** In Cloudflare DNS for `collinbgeorge.com`, add `CNAME mcat → collingeorge.github.io` with the proxy **off** (DNS only, grey cloud), so GitHub can issue the HTTPS certificate.
3. **Merge** the PR that adds `CNAME`. In GitHub, go to *Settings → Pages* and check that the custom domain shows `mcat.collinbgeorge.com` and its DNS check passes. Once the certificate is issued (usually minutes, up to about an hour), tick **Enforce HTTPS**.
4. **Supabase.** In *Authentication → URL Configuration*, set *Site URL* to `https://mcat.collinbgeorge.com/index.html` and add it to *Redirect URLs*, or email verification and password-reset links will fail. Keep the old URLs until old emails have expired. The app's `connect-src` is unchanged, because it names the Supabase project, not the site.
5. **Old links.** Deploy the updated `cloudflare-mcat-proxy.mjs` to Worker `mcat-study-proxy` (route unchanged). Until it is deployed, the old Worker shows "Resource moved" because its upstream now redirects.
6. **Optional headers.** Turn the `mcat` DNS record's proxy **on**, set SSL/TLS to **Full (strict)**, then create a Worker from `cloudflare-mcat-headers.mjs` with the route `mcat.collinbgeorge.com/*`.
7. **Verify.** Open https://mcat.collinbgeorge.com/, sign in (your cloud progress restores automatically), and check that an old link such as `collinbgeorge.com/study/mcat/recall.html` lands on the same page on the subdomain. Then update the portfolio and study-guide links.

Run `node tools/test-deployment.cjs` before deploying either Worker. Committing Worker source does not deploy it. No secret keys belong in these Workers or in this repository.
