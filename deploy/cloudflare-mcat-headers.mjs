// Optional: route mcat.collinbgeorge.com/* here once that DNS record is proxied by Cloudflare.
// GitHub Pages cannot send response headers and a meta-tag CSP cannot block framing, so this passes
// each request through to GitHub Pages unchanged and adds security headers to the response.
const HEADERS = {
  'Content-Security-Policy': "frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000',
};
export default {
  async fetch(request) {
    if (new URL(request.url).hostname !== 'mcat.collinbgeorge.com') return new Response('Not found', { status: 404 });
    const response = await fetch(request);
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(HEADERS)) headers.set(k, v);
    headers.delete('Set-Cookie');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
