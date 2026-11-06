// Route only collinbgeorge.com/study/mcat/* here. Other portfolio paths stay on their existing Worker.
// The app now lives on its own origin, https://mcat.collinbgeorge.com/, so this Worker only redirects
// old links there. Nothing is fetched or forwarded; no cookies, headers or auth codes travel.
const TARGET = 'https://mcat.collinbgeorge.com/';
const KEEP = ['passage', 'exam']; // shareable page context only; auth codes belong to the old origin
export default {
  async fetch(request) {
    const current = new URL(request.url), prefix = '/study/mcat/';
    if (current.pathname === '/study/mcat') return Response.redirect(TARGET, 301);
    if (!current.pathname.startsWith(prefix)) return new Response('Not found', { status: 404 });
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    let path;
    try { path = decodeURIComponent(current.pathname.slice(prefix.length)); } catch { return new Response('Invalid path', { status: 400 }); }
    if (path.startsWith('/') || path.split('/').includes('..') || !/^[a-zA-Z0-9_./-]*$/.test(path)) return new Response('Invalid path', { status: 400 });
    const target = new URL(path, TARGET);
    for (const k of KEEP) { const v = current.searchParams.get(k); if (v && /^[a-zA-Z0-9_-]{1,80}$/.test(v)) target.searchParams.set(k, v); }
    return new Response(null, { status: 301, headers: { Location: target.href, 'Cache-Control': 'public, max-age=3600' } });
  },
};
