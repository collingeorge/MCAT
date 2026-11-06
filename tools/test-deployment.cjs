const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let calls=[];const ctx=vm.createContext({URL,Request,Response,Headers,fetch:async(url,options)=>{calls.push({url,options});return new Response('current app',{headers:{'Content-Type':'text/javascript','Set-Cookie':'upstream=not-forwarded'}});}});
vm.runInContext(fs.readFileSync(__dirname+'/../deploy/cloudflare-mcat-proxy.mjs','utf8').replace('export default','globalThis.worker ='),ctx);
async function main(){
 let response=await ctx.worker.fetch(new Request('https://collinbgeorge.com/study/mcat/index.html?code=PRIVATE_CODE',{headers:{Cookie:'private_cookie',Authorization:'private_token'}}));
 assert.equal(response.status,200);assert.equal(calls[0].url,'https://collingeorge.github.io/MCAT/index.html');assert(!calls[0].options.headers);assert.equal(response.headers.get('Set-Cookie'),null);assert.equal(response.headers.get('Cache-Control'),'no-store');
 assert.equal(response.headers.get('X-Frame-Options'),'DENY');assert.equal(response.headers.get('Content-Security-Policy'),"frame-ancestors 'none'");assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');
 response=await ctx.worker.fetch(new Request('https://collinbgeorge.com/study/mcat/sw.js'));assert.equal(response.headers.get('Service-Worker-Allowed'),'/study/mcat/');
 const before=calls.length;response=await ctx.worker.fetch(new Request('https://collinbgeorge.com/projects/'));assert.equal(response.status,404);assert.equal(calls.length,before);
 response=await ctx.worker.fetch(new Request('https://collinbgeorge.com/study/mcat/%2F..%2Fprivate'));assert.equal(response.status,400);
 response=await ctx.worker.fetch(new Request('https://collinbgeorge.com/study/mcat/index.html',{method:'POST',body:'private'}));assert.equal(response.status,405);assert.equal(calls.length,before);
 console.log('Deployment proxy passed: same-origin paths, no callback/cookie/token forwarding, scope-limited service worker, unrelated-path exclusion and method/path guards.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
