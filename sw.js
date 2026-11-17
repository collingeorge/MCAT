// Offline support.
// - Pages and code: network-first (revalidating past the browser's HTTP cache), so a new version shows on the
//   first visit; the cached copy is used when the network fails or is slow (1.5 s when a cached copy exists).
// - data/*.js: cache-first with a background refresh. CACHE changes on every deploy, so a cached data file is
//   always from the current version.
// - Every js/*.js and data/*.js URL carries ?v=<CACHE> (the pages' script tags and the app's on-demand loads, written
//   by tools/generate-pages.cjs), so a new deploy never reuses a script from the browser's HTTP cache. The data cache
//   matches the exact versioned URL.
// - The drawings (data/structures.js) and the sign-in SDK are cached the first time they are used, not at install.
// Bump CACHE when deploying, then run node tools/generate-pages.cjs.
const CACHE = 'mcat-v2.77-cp-ruleout2-guided-2026-11-17';
const V = '?v=' + CACHE;
const NETWORK_TIMEOUT_MS = 4000, CACHED_TIMEOUT_MS = 1500;
const SCRIPTS = [
  'js/pages.js', 'js/app.js', 'js/study-path.js', 'js/cloud-config.js', 'js/account.js', 'js/study-timer.js', 'js/learning-evidence.js', 'js/daily-plan.js', 'js/mastery.js', 'js/actions.js', 'js/data-css.js',
  'data/passages-cars.js', 'data/cp-diagnostic.js', 'data/cp-pool.js',
  'data/qb-aamc-bio.js', 'data/qb-aamc-chem.js', 'data/qb-aamc-phys.js', 'data/qb-aamc-biochem.js', 'data/qb-aamc-iqb.js', 'data/qb-aamc-cars.js', 'data/qb-aamc-rules.js', 'data/qb-aamc-fl.js', 'data/cp-test-cards.js', 'data/aamc-prep.js',
  'data/exam1.js', 'data/exam2-cp.js', 'data/exam2-bb.js', 'data/exam2-ps.js', 'data/exams.js',
];
const ASSETS = [
  "recall.html", "passages.html", "exams.html", "aamc.html", "flprep.html","score-report.html", "about.html", "recall-session.html", "passage-session.html", "exam-session.html", "results.html", "exam-results.html", './', 'css/portfolio-theme.css?v=20261116', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'icon.svg',
  ...SCRIPTS.map(path => path + V),
];
const RUNTIME = ['data/structures.js' + V, 'vendor/supabase-js-2.118.0.umd.js'];

self.addEventListener('install', event => {
  // cache: 'no-cache' revalidates every file with the server, so the precache never stores stale files,
  // but files the page just downloaded come back as 304s instead of a second full download.
  event.waitUntil(
    caches.open(CACHE)
      // One file failing (a flaky connection) must not stop the install; it is fetched again when first used.
      .then(cache => Promise.allSettled(ASSETS.map(url => cache.add(new Request(url, { cache: 'no-cache' })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('mcat-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  const allowed = new Set([...ASSETS, ...RUNTIME].map(path => new URL(path, self.registration.scope).pathname));
  // Auth callback codes belong to a single online exchange, never the offline cache.
  if (url.searchParams.has('code') || url.searchParams.has('token_hash') || url.searchParams.has('access_token')) return;
  if (req.method !== 'GET' || url.origin !== location.origin || !allowed.has(url.pathname)) return;
  event.respondWith(/\/data\/[^/]+\.js$/.test(url.pathname) ? cacheFirst(req) : networkFirst(req));
});

// Versioned data: answer from the cache at once and refresh it in the background; fetch it if not cached yet.
// Only the exact URL (with its ?v=) matches, so a request for another version goes to the network.
async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const network = fetch(req, { cache: 'no-cache' }).then(async res => {
    if (res.ok) { try { await cache.put(req, res.clone()); } catch (e) { /* quota: keep the response */ } }
    return res;
  });
  if (cached) { network.catch(() => {}); return cached; }
  return network;
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const network = fetch(req, { cache: 'no-cache' }).then(async res => {
    if (res.ok) { try { await cache.put(req, res.clone()); } catch (e) { /* quota/storage failures must not lose the network response */ } }
    return res;
  });
  network.catch(() => {}); // a late failure after the timeout fallback is expected offline
  let timeoutId;
  const hasCached = !!(await cache.match(req, { ignoreSearch: true }));
  const timeout = new Promise(resolve => { timeoutId = setTimeout(resolve, hasCached ? CACHED_TIMEOUT_MS : NETWORK_TIMEOUT_MS, null); });
  try {
    const res = await Promise.race([network, timeout]);
    if (res) return res;
  } catch (e) { /* offline: fall through to cache */ } finally { clearTimeout(timeoutId); }
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  return network; // nothing cached: wait for the network (or surface its error)
}
