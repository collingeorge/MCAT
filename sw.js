// Offline support: precache the app shell and data, then serve stale-while-revalidate.
// Bump CACHE when deploying so returning users pick up new content.
const CACHE = 'mcat-v2.3-2026-10-26';
const ASSETS = [
  './', 'index.html', 'css/styles.css', 'js/app.js', 'manifest.webmanifest', 'icon.svg',
  'data/qb-biochemistry.js', 'data/qb-biology.js', 'data/qb-chemistry.js', 'data/qb-physics.js', 'data/qb-equations.js',
  'data/qb-behavioral-1.js', 'data/qb-behavioral-2.js', 'data/passages-science.js', 'data/passages-cars.js',
  'data/exam1.js', 'data/exam2-cp.js', 'data/exam2-bb.js', 'data/exam2-ps.js', 'data/exams.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
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
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(cached => {
        const network = fetch(req)
          .then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
