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
  console.log('Deployment passed: CNAME for mcat.collinbgeorge.com; old path 301-redirects with no fetching, forwarding, auth-code carry-over, traversal or open redirect; subdomain headers Worker adds frame-ancestors/XFO/nosniff/HSTS and strips cookies; app is origin-relative.');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
