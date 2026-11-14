// Offline support, network-first: when online, always fetch the current file (revalidating
// past the browser's HTTP cache) so new versions show on the first visit; the cached copy
// is used only when the network fails or takes too long. Bump CACHE when deploying.
const CACHE = 'mcat-v2.35-guided-walkthroughs-2026-11-14';
const NETWORK_TIMEOUT_MS = 4000;
const ASSETS = [
  "recall.html", "passages.html", "exams.html", "aamc.html", "flprep.html","score-report.html", "about.html", "recall-session.html", "passage-session.html", "exam-session.html", "results.html", "exam-results.html", 'js/pages.js', './', 'css/portfolio-theme.css?v=20261030', 'index.html', 'css/styles.css', 'js/app.js', 'js/study-path.js', 'js/cloud-config.js', 'js/account.js', 'js/study-timer.js', 'js/learning-evidence.js', 'js/daily-plan.js', 'js/actions.js', 'js/data-css.js', 'vendor/supabase-js-2.118.0.umd.js', 'manifest.webmanifest', 'icon.svg',
  'data/qb-biochemistry.js', 'data/qb-biology.js', 'data/qb-chemistry.js', 'data/qb-physics.js', 'data/qb-equations.js',
  'data/qb-behavioral-1.js', 'data/qb-behavioral-2.js', 'data/passages-science.js', 'data/passages-cars.js', 'data/passages-data.js', 'data/qb-variants-1.js', 'data/qb-variants-2.js',
  'data/qb-aamc-bio.js', 'data/qb-aamc-chem.js', 'data/qb-aamc-phys.js', 'data/qb-aamc-iqb.js', 'data/qb-aamc-cars.js', 'data/qb-aamc-rules.js', 'data/qb-aamc-fl.js', 'data/structures.js', 'data/aamc-prep.js',
  'data/exam1.js', 'data/exam2-cp.js', 'data/exam2-bb.js', 'data/exam2-ps.js', 'data/exams.js',
];

self.addEventListener('install', event => {
  // cache: 'no-cache' revalidates every file with the server, so the precache never stores stale files,
  // but files the page just downloaded come back as 304s instead of a second full download.
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'no-cache' }))))
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
  const allowed = new Set(ASSETS.map(path => new URL(path, self.registration.scope).pathname));
  // Auth callback codes belong to a single online exchange, never the offline cache.
  if (url.searchParams.has('code') || url.searchParams.has('token_hash') || url.searchParams.has('access_token')) return;
  if (req.method !== 'GET' || url.origin !== location.origin || !allowed.has(url.pathname)) return;
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const network = fetch(req, { cache: 'no-cache' }).then(async res => {
    if (res.ok) { try { await cache.put(req, res.clone()); } catch (e) { /* quota/storage failures must not lose the network response */ } }
    return res;
  });
  network.catch(() => {}); // a late failure after the timeout fallback is expected offline
  let timeoutId;
  const timeout = new Promise(resolve => { timeoutId = setTimeout(resolve, NETWORK_TIMEOUT_MS, null); });
  try {
    const res = await Promise.race([network, timeout]);
    if (res) return res;
  } catch (e) { /* offline: fall through to cache */ } finally { clearTimeout(timeoutId); }
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  return network; // nothing cached: wait for the network (or surface its error)
}
