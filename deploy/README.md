# Custom-domain delivery

The live app is https://collinbgeorge.com/study/mcat/index.html. GitHub Pages at https://collingeorge.github.io/MCAT/index.html remains the static release source.

Cloudflare Worker `mcat-study-proxy` runs `cloudflare-mcat-proxy.mjs` with only the route `collinbgeorge.com/study/mcat/*`. Do not replace the portfolio Worker or use a whole-domain wildcard. This serves current MCAT files on the original browser origin, preserving access to local study progress. It does not redirect students to a different origin.

The Worker forwards no cookies, authorization headers, or query parameters to GitHub. Supabase handles account callbacks in the browser; both exact app index URLs must remain in its allowed redirect list. No secret keys belong in this Worker or repository.

App releases publish through GitHub Pages. Changes to the Worker itself must also be deployed to Cloudflare; committing its source alone does not deploy it. Run `node tools/test-deployment.cjs` before deployment. After publishing, verify the custom URL, login form and account status. An older service worker may require a second refresh to activate the new release.
