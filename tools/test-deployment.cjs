// Custom-domain delivery: the app lives on its own origin (mcat.collinbgeorge.com via GitHub Pages).
// The old collinbgeorge.com/study/mcat/* Worker only redirects; the optional headers Worker adds
// security headers on the subdomain without changing content.
const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const root = __dirname + '/..';
const load = (file, fetchImpl) => {
  const ctx = vm.createContext({ URL, Request, Response, Headers, fetch: fetchImpl });
  vm.runInContext(fs.readFileSync(root + '/deploy/' + file, 'utf8').replace('export default', 'globalThis.worker ='), ctx);
  return ctx.worker;
};
async function main() {
  // Pages publishes the custom domain from the CNAME file.
  assert.equal(fs.readFileSync(root + '/CNAME', 'utf8').trim(), 'mcat.collinbgeorge.com');

  // 1. Old path: redirect only, never fetch or forward anything.
  let fetched = 0;
  const redirect = load('cloudflare-mcat-proxy.mjs', async () => { fetched++; return new Response('x'); });
  let r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/index.html?code=PRIVATE_CODE&passage=p_bio_1', { headers: { Cookie: 'private_cookie', Authorization: 'private_token' } }));
  assert.equal(r.status, 301);
  assert.equal(r.headers.get('Location'), 'https://mcat.collinbgeorge.com/index.html?passage=p_bio_1', 'page context kept, auth code dropped');
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/'));
  assert.equal(r.headers.get('Location'), 'https://mcat.collinbgeorge.com/');
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat'));
  assert.equal(r.status, 301); assert.equal(r.headers.get('Location'), 'https://mcat.collinbgeorge.com/');
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/exam-session.html?exam=%3Cscript%3E'));
  assert.equal(r.headers.get('Location'), 'https://mcat.collinbgeorge.com/exam-session.html', 'unsafe context values are dropped');
  r = await redirect.fetch(new Request('https://collinbgeorge.com/projects/')); assert.equal(r.status, 404);
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/%2F..%2Fprivate')); assert.equal(r.status, 400);
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/..%2F..%2Fx')); assert.equal(r.status, 400);
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/index.html', { method: 'POST', body: 'private' })); assert.equal(r.status, 405);
  r = await redirect.fetch(new Request('https://collinbgeorge.com/study/mcat/https:%2F%2Fevil.example')); assert.equal(r.status, 400, 'no open redirect');
  assert.equal(fetched, 0, 'the redirect Worker never fetches upstream');

  // 2. Subdomain headers: pass-through content, security headers added, cookies stripped.
  const calls = [];
  const headers = load('cloudflare-mcat-headers.mjs', async req => { calls.push(req); return new Response('app body', { status: 200, headers: { 'Content-Type': 'text/html', 'Set-Cookie': 'upstream=1' } }); });
  r = await headers.fetch(new Request('https://mcat.collinbgeorge.com/index.html'));
  assert.equal(await r.text(), 'app body'); assert.equal(calls.length, 1);
  assert.equal(r.headers.get('X-Frame-Options'), 'DENY'); assert.equal(r.headers.get('Content-Security-Policy'), "frame-ancestors 'none'");
  assert.equal(r.headers.get('X-Content-Type-Options'), 'nosniff'); assert.match(r.headers.get('Strict-Transport-Security'), /max-age=31536000/);
  assert.equal(r.headers.get('Set-Cookie'), null); assert.equal(r.headers.get('Content-Type'), 'text/html');
  r = await headers.fetch(new Request('https://collinbgeorge.com/anything')); assert.equal(r.status, 404); assert.equal(calls.length, 1, 'other hosts are not proxied');

  // 3. The app itself is origin-relative, so it runs unchanged at the subdomain root.
  assert.equal(JSON.parse(fs.readFileSync(root + '/manifest.webmanifest', 'utf8')).scope, './');
  assert.doesNotMatch(fs.readFileSync(root + '/sw.js', 'utf8'), /study\/mcat|github\.io/);
  // 4. Versioned scripts: after a deploy the browser must not take a script from its HTTP cache. Every js/ and data/
  // script URL (each page's script tags, the app's on-demand loads in BANKS and the drawings) carries ?v=<sw.js
  // CACHE>, the service worker precaches the same URLs, and its network fetches revalidate (cache: 'no-cache').
  { const sw = fs.readFileSync(root + '/sw.js', 'utf8'), CACHE = /const CACHE = '([^']+)';/.exec(sw)[1], V = '?v=' + CACHE;
    const swCtx = vm.createContext({ URL, self: { addEventListener() {}, registration: { scope: 'https://x.test/' } }, location: { origin: 'https://x.test' } });
    vm.runInContext(sw + '\n;globalThis.__sw = { ASSETS, RUNTIME, SCRIPTS };', swCtx);
    const { ASSETS, RUNTIME, SCRIPTS } = swCtx.__sw;
    const app = fs.readFileSync(root + '/js/app.js', 'utf8');
    assert.equal(/^const ASSET_V = '([^']*)';$/m.exec(app)[1], V, 'js/app.js ASSET_V is the current CACHE version (run node tools/generate-pages.cjs)');
    assert(app.includes('el.src = src + ASSET_V;') && app.includes("el.src = 'data/structures.js' + ASSET_V;"), 'on-demand loads (BANKS, drawings) add the version');
    const banks = Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(app)[1])()).flat();
    const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
    assert(pages.length >= 13);
    let tags = 0;
    for (const page of pages) {
      const html = fs.readFileSync(root + '/' + page, 'utf8');
      for (const [, src] of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) {
        if (!/^(js|data)\//.test(src)) continue;
        tags++;
        assert(src.endsWith('.js' + V), `${page}: ${src} carries ${V}`);
        assert(SCRIPTS.includes(src.slice(0, -V.length)), `${page}: ${src} is precached by sw.js`);
      }
      assert.doesNotMatch(html, /<script\b[^>]*\bsrc="(js|data)\/[^"?]+"/, page + ': no unversioned script');
    }
    for (const a of [...ASSETS, ...RUNTIME].filter(a => /^(js|data)\//.test(a))) assert(a.endsWith(V), 'sw.js asset ' + a + ' carries the version');
    for (const f of banks) assert(SCRIPTS.includes(f), f + ' (BANKS) is precached at its versioned URL');
    assert(RUNTIME.includes('data/structures.js' + V), 'the drawings are cached at their versioned URL');
    const fetches = [...sw.matchAll(/fetch\(req(?:, (\{[^}]*\}))?\)/g)].map(m => m[1] || '');
    assert(fetches.length >= 2 && fetches.every(o => o.includes("cache: 'no-cache'")), 'every service-worker network fetch revalidates (cache: no-cache)');
    assert(/async function networkFirst[\s\S]*?fetch\(req, \{ cache: 'no-cache' \}\)/.test(sw), 'network-first uses cache: no-cache');
    assert(/async function cacheFirst[\s\S]*?cache\.match\(req\);/.test(sw), 'cached data matches only its exact versioned URL');
    console.log(`Versioned scripts: ${tags} script tags in ${pages.length} pages, ${banks.length} on-demand banks and the drawings at ${V}.`); }
  // Regression (review 3): developer tools (validate.html runs an inline script without the CSP) and internal notes are
// excluded from the published site.
{ const cfg = fs.readFileSync(root + '/_config.yml', 'utf8'); for (const dir of ['tools', 'docs']) assert.match(cfg, new RegExp('^\\s*-\\s*' + dir + '\\s*$', 'm'), dir + '/ is not published'); }
console.log('Deployment passed: CNAME for mcat.collinbgeorge.com; old path 301-redirects with no fetching, forwarding, auth-code carry-over, traversal or open redirect; subdomain headers Worker adds frame-ancestors/XFO/nosniff/HSTS and strips cookies; app is origin-relative.');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
