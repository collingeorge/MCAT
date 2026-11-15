const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
async function main() {
 const nodes = new Map(), storage = new Map();
 let clock = Date.now();
 class TestDate extends Date { constructor(...args) { super(...(args.length ? args : [clock])); } static now() { return clock; } }
 function el(id) { if (!nodes.has(id)) nodes.set(id, {innerHTML:'',textContent:'',hidden:true,style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){},focus(){},scrollIntoView(){},remove(){}}); return nodes.get(id); }
 const ctx = vm.createContext({console,Date:TestDate,Math,Map,Set,URLSearchParams,setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},navigator:{},location:{protocol:'http:',search:''},window:{scrollTo(){}},document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 const run = code => vm.runInContext(code,ctx);
 const index = fs.readFileSync(root+'/index.html','utf8');
 // Banks the app loads on demand (BANKS in js/app.js), loaded first as the browser would have them.
 for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
 for (const [,file] of index.matchAll(/<script src="([^"?]+)/g)) run(fs.readFileSync(root+'/'+file,'utf8'));
 // The app's own recall decks were removed: only the AAMC QBank and Practice Exam cards remain.
 assert.equal(run('QB.length'),0); assert(run('AQB_QBANK.length')>1000);
 assert.match(run('fmt('+JSON.stringify('<img src=x onerror=alert(1)> **safe** _____')+')'),/&lt;img/);
 assert.doesNotMatch(run('fmt('+JSON.stringify('<script>alert(1)</script>')+')'),/<script>/);
 assert.match(run("fmt('**safe** _____')"),/<strong>safe<\/strong>/);
 storage.set('bad','[]'); assert.equal(run("store.get('bad',null)"),null);
 storage.set('bad','not json'); assert.equal(run("store.get('bad',[]) .length"),0);
 assert.match(el('storage-notice').textContent,/could not be read/);
 const oldSet=ctx.localStorage.setItem; ctx.localStorage.setItem=()=>{throw Error('quota')}; run("store.set('x',1)"); assert.match(el('storage-notice').textContent,/could not be saved/); ctx.localStorage.setItem=oldSet;
 // Immediate repetitions cannot multiply long-term stability as if they were delayed retrievals.
 run("store.del(KEYS.mem); updateMemory(AQB_QBANK[1],false,null,1000); globalThis.beforeS=loadMem()[AQB_QBANK[1].id].S; updateMemory(AQB_QBANK[1],true,'knew',1000)");
 assert(run('loadMem()[AQB_QBANK[1].id].S <= beforeS*1.100001'));
 // Resuming an expired section must render its break/results, never the expired question.
 run("startExam(0); exam.phase='question'; ensureOrders(); exam.elapsed[0]=curSection().timeMin*60000; renderExam()");
 assert.equal(run('exam.phase'),'break'); assert.doesNotMatch(el('exam-body').innerHTML,/id="ec-0"/);
 const evidence=storage.get('mcat2_evidence'); run('endSection()'); assert.equal(storage.get('mcat2_evidence'),evidence);
 run("exam.si=examDef().sections.length-1; exam.phase='question'; ensureOrders(); exam.elapsed[exam.si]=curSection().timeMin*60000; renderExam()");
 assert.equal(run('exam.phase'),'complete'); assert.equal(run('activeScreen'),'screen-exam-results'); assert.doesNotMatch(el('exam-body').innerHTML,/id="ec-0"/);
 run("commitPending(); resetProgress()"); assert.equal(storage.has('mcat2_fluency'),false);
 // Same-origin cache operations must not delete another app's cache or intercept out-of-scope assets.
 const handlers={}, deleted=[], cleared=[]; let responseCount=0;
 const response={ok:true,clone(){return this}};
 const swctx=vm.createContext({URL,Request:function(){},location:{origin:'https://example.test'},self:{registration:{scope:'https://example.test/MCAT/'},addEventListener:(n,fn)=>handlers[n]=fn,skipWaiting(){},clients:{claim(){}}},caches:{open:async()=>({put:async()=>{throw Error('quota')},match:async()=>null,addAll:async()=>{}}),keys:async()=>['other-app','mcat-old'],delete:async k=>deleted.push(k)},fetch:async()=>response,setTimeout(){return 77},clearTimeout:id=>cleared.push(id)});
 vm.runInContext(fs.readFileSync(root+'/sw.js','utf8'),swctx);
 let activation; handlers.activate({waitUntil:p=>activation=p}); await activation;
 assert.deepEqual(deleted,['mcat-old']);
 handlers.fetch({request:{method:'GET',url:'https://example.test/another-app.js'},respondWith(){responseCount++}}); assert.equal(responseCount,0);
 swctx.req={method:'GET',url:'https://example.test/MCAT/js/app.js'};
 const result=await vm.runInContext('networkFirst(req)',swctx); assert.equal(result,response); assert.deepEqual(cleared,[77]);
 // Service worker (review 4.8): a failed file doesn't stop the install; drawings and the SDK are cached on first
 // use, not at install; data files answer from the cache; a cached page waits at most 1.5 s for the network.
 {
  const h={}, added=[], delays=[]; let skipped=false; const cached=new Map();
  const cache={add:async r=>{added.push(r.url);if(r.url.includes('exams.html'))throw Error('network');},put:async(r,v)=>{cached.set(typeof r==='string'?r:r.url,v)},match:async r=>cached.get(typeof r==='string'?r:r.url)||null};
  const fresh={ok:true,clone(){return this},tag:'network'};
  const sw=vm.createContext({URL,Request:function(u){this.url=u},location:{origin:'https://example.test'},self:{registration:{scope:'https://example.test/MCAT/'},addEventListener:(n,fn)=>h[n]=fn,skipWaiting(){skipped=true},clients:{claim(){}}},
    caches:{open:async()=>cache,keys:async()=>[],delete:async()=>{}},fetch:()=>new Promise(r=>setTimeout(()=>r(fresh),20)),setTimeout:(fn,ms,v)=>{delays.push(ms);return setTimeout(fn,ms,v)},clearTimeout,Promise});
  vm.runInContext(fs.readFileSync(root+'/sw.js','utf8'),sw);
  let inst;h.install({waitUntil:p=>inst=p});await inst;
  assert(skipped,'install completes although one file failed');
  assert(!added.some(u=>/structures\.js|supabase/.test(u)),'drawings and SDK are not precached');
  let responded=0;h.fetch({request:{method:'GET',url:'https://example.test/MCAT/data/structures.js'},respondWith(){responded++}});assert.equal(responded,1,'drawings are cached at runtime');
  const old={ok:true,tag:'cached'};cached.set('https://example.test/MCAT/data/exam1.js',old);
  sw.req={method:'GET',url:'https://example.test/MCAT/data/exam1.js'};
  assert.equal((await vm.runInContext('cacheFirst(req)',sw)).tag,'cached','data answers from the cache at once');
  cached.set('https://example.test/MCAT/js/app.js',old);sw.req={method:'GET',url:'https://example.test/MCAT/js/app.js'};delays.length=0;
  await vm.runInContext('networkFirst(req)',sw);assert(delays.includes(1500),'cached page: 1.5 s network timeout');
 }
 assert.match(index,/Content-Security-Policy/); assert.match(index,/object-src 'none'/);
  // ── Regressions from the code review (section 3) ──
  // Scaled scores: table points are thresholds (84% is the first 128); between points the score rounds down.
  assert.equal(run('rawToScaled(82)'), 127); assert.equal(run('rawToScaled(84)'), 128); assert.equal(run('rawToScaled(83.9)'), 127); assert.equal(run('rawToScaled(100)'), 132);
  // The score history uses the local calendar day.
  run("store.set(KEYS.evidence,{gen_chem:{passage:{c:40,t:50}},physics:{passage:{c:40,t:50}},biochemistry:{passage:{c:40,t:50}},organic_chem:{passage:{c:40,t:50}},biology:{passage:{c:40,t:50}},psych_soc:{passage:{c:40,t:50}},cars:{passage:{c:40,t:50}}});snapshotEstimate()");
  assert.equal(run('store.get(KEYS.scoreHistory,[]).at(-1).day'), run('localDay()'));
  // Saved error rows with prototype keys or unknown types cannot break the score report.
  run(`store.set(KEYS.errors, [...Array(6)].map((_, i) => ({ t: i, disc: i % 2 ? '__proto__' : 'biology', type: i % 3 ? 'knowledge' : 'constructor', src: 'recall' })))`);
  assert.doesNotThrow(() => run('mistakeCard()')); assert.match(run('mistakeCard()'), /Mistake patterns/);
  assert.equal(run('Object.prototype.knowledge'), undefined);
  // Drawings that fail to load show a retry instead of a blank space, and the failed script tag is removed.
  run("structsFailed = true"); assert.match(run("structImg('aspirin')"), /Drawing unavailable[\s\S]*retryStructs\(\)/);
  run("structsFailed = false"); assert.equal(run("structImg('aspirin')"), '', 'still loading: nothing yet');
  run('store.del(KEYS.errors);store.del(KEYS.evidence);store.del(KEYS.scoreHistory)');
  // ── Efficiency (review 4.1) ──
  // store.batch writes each key once; reads inside the batch see the pending values.
  { let writes = 0; const realSet = ctx.localStorage.setItem; ctx.localStorage.setItem = (k, v) => { if (k === 'mcat2_evidence') writes++; return realSet(k, v); };
    run("store.del(KEYS.evidence); store.batch(() => { for (let i = 0; i < 50; i++) recordEvidence('exam', 'biology', i % 2 === 0); })");
    ctx.localStorage.setItem = realSet;
    assert.equal(writes, 1, '50 answers, one write'); assert.equal(run("store.get(KEYS.evidence,{}).biology.exam.t"), 50); assert.equal(run("store.get(KEYS.evidence,{}).biology.exam.c"), 25); }
  // After a memory write, the next read uses the cache instead of re-parsing the large record.
  { run("const m0 = loadMem(); m0['x-test'] = { S: 1, D: 5, last: 1, seen: 1, right: 1, lapses: 0 }; store.set(KEYS.mem, m0)");
    run("globalThis.__parses = 0; globalThis.__jp = JSON.parse; JSON.parse = function (t, ...a) { if (typeof t === 'string' && t.includes('x-test')) __parses++; return __jp.call(this, t, ...a); }");
    assert.equal(run("loadMem()['x-test'].seen"), 1); run('JSON.parse = __jp'); assert.equal(run('__parses'), 0, 'no re-parse after a write'); }
  // Wording rotation never repeats the wording just shown, nor the one before it when another exists.
 {
  const draws = JSON.parse(run("JSON.stringify(Array.from({length:1000},()=>pickNextForm([{id:'A'},{id:'B'},{id:'C'}],'A','B').id))"));
  assert(draws.every(id => id === 'C'), 'with [A,B,C], current A and last B, only C may follow');
  const two = JSON.parse(run("JSON.stringify(Array.from({length:500},()=>pickNextForm([{id:'A'},{id:'B'}],'A','B').id))"));
  assert(two.every(id => id === 'B'), 'two forms: the other one, never the current');
  assert.equal(run("pickNextForm([{id:'A'}],'A','A').id"), 'A', 'a single form is reused');
  const four = JSON.parse(run("JSON.stringify(Array.from({length:3000},()=>pickNextForm([{id:'A'},{id:'B'},{id:'C'},{id:'D'}],'A','B').id))"));
  const c = four.filter(x => x === 'C').length; assert(four.every(id => id === 'C' || id === 'D') && c > 1300 && c < 1700, 'uniform over the eligible forms: ' + c);
  assert.doesNotMatch(fs.readFileSync(root + '/js/app.js', 'utf8'), /sort\(\(\)\s*=>\s*Math\.random\(\)\s*-\s*0\.5\)/, 'no biased sort-based shuffles');
 }
console.log('Audit regressions passed: HTML escaping, storage warnings, stable final-review phase, conservative repeats, expired exam resume, duplicate scoring and cache isolation/quota handling.');
}
main();
