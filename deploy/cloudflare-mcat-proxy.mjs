// Route only collinbgeorge.com/study/mcat/* here. Other portfolio paths stay on their existing Worker.
export default {
  async fetch(request) {
    const current = new URL(request.url), prefix = '/study/mcat/';
    if (!current.pathname.startsWith(prefix)) return new Response('Not found', {status:404});
    if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
    let path;
    try { path = decodeURIComponent(current.pathname.slice(prefix.length)); } catch { return new Response('Invalid path',{status:400}); }
    if (path.startsWith('/') || path.split('/').includes('..') || !/^[a-zA-Z0-9_./-]*$/.test(path)) return new Response('Invalid path',{status:400});
    const upstream = new URL(path || 'index.html', 'https://collingeorge.github.io/MCAT/');
    // Do not forward cookies, Authorization, email verification codes or any browser query parameters.
    try {
      const response = await fetch(upstream.href, {method:request.method,redirect:'manual',cf:{cacheTtl:0,cacheEverything:false}});
      if (response.status >= 300 && response.status < 400) return new Response('Resource moved; reload the study app.',{status:502,headers:{'Cache-Control':'no-store'}});
      const headers = new Headers(response.headers);
      headers.set('Cache-Control','no-store');
      headers.set('X-MCAT-Source','github-pages');
      headers.delete('Set-Cookie'); headers.delete('Report-To'); headers.delete('NEL');
      // Meta-tag CSP cannot block framing; send it as headers on the custom domain.
      headers.set('Content-Security-Policy',"frame-ancestors 'none'");
      headers.set('X-Frame-Options','DENY');
      headers.set('X-Content-Type-Options','nosniff');
      if (path === 'sw.js') headers.set('Service-Worker-Allowed',prefix);
      return new Response(response.body,{status:response.status,headers});
    } catch {
      return new Response('The study app is temporarily unavailable. Please retry shortly.',{status:503,headers:{'Cache-Control':'no-store'}});
    }
  }
};
