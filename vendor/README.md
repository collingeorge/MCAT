# Vendored third-party code

## @supabase/supabase-js 2.118.0 (MIT)

- File: `supabase-js-2.118.0.umd.js`, copied unmodified from `dist/umd/supabase.js` in the npm package.
- npm tarball integrity: `sha512-FxI8UXMVC2UG7IkeiI8fuQZqq2oI3JeSuN8MPIC2RLVaoEAxKS0nqE6kii9Ewpq8f9gNPM6git1Y8f0vN/QLFw==`
- File SRI (checked by `js/account.js` when it loads the script): `sha384-TcHRA3zBbn+Lexh5n+Oil4guNPOS3rjNDpGRAN46u/s/mB2IZ50ceC6TYDU2yvgK`
- License: `supabase-js-LICENSE.txt`

Self-hosting keeps the Content-Security-Policy at `script-src 'self'`, so no CDN can serve script to the app. To upgrade, run `npm pack @supabase/supabase-js@<version>`, check the tarball against `npm view @supabase/supabase-js@<version> dist.integrity`, copy `dist/umd/supabase.js` here, and update the file name, `SDK_SRC`/`SDK_SRI` in `js/account.js`, the service worker asset list and this README.
