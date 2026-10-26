// Offline support, network-first: when online, always fetch the current file (revalidating
// past the browser's HTTP cache) so new versions show on the first visit; the cached copy
// is used only when the network fails or takes too long. Bump CACHE when deploying.
const CACHE = 'mcat-v2.6-2026-10-26';
const NETWORK_TIMEOUT_MS = 4000;
const ASSETS = [
  './', 'index.html', 'css/styles.css', 'js/app.js', 'manifest.webmanifest', 'icon.svg',
  'data/qb-biochemistry.js', 'data/qb-biology.js', 'data/qb-chemistry.js', 'data/qb-physics.js', 'data/qb-equations.js',
  'data/qb-behavioral-1.js', 'data/qb-behavioral-2.js', 'data/passages-science.js', 'data/passages-cars.js', 'data/passages-data.js', 'data/qb-variants-1.js', 'data/qb-variants-2.js',
  'data/exam1.js', 'data/exam2-cp.js', 'data/exam2-bb.js', 'data/exam2-ps.js', 'data/exams.js',
];

self.addEventListener('install', event => {
  // cache: 'reload' bypasses the HTTP cache so the precache never stores stale files
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const network = fetch(req, { cache: 'no-cache' }).then(res => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  network.catch(() => {}); // a late failure after the timeout fallback is expected offline
  const timeout = new Promise(resolve => setTimeout(resolve, NETWORK_TIMEOUT_MS, null));
  try {
    const res = await Promise.race([network, timeout]);
    if (res) return res;
  } catch (e) { /* offline: fall through to cache */ }
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  return network; // nothing cached: wait for the network (or surface its error)
}
