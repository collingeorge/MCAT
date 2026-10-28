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
 for (const [,file] of index.matchAll(/<script src="([^"]+)"/g)) run(fs.readFileSync(root+'/'+file,'utf8'));
 assert.equal(run('QB.length'),2807);
 assert.match(run('fmt('+JSON.stringify('<img src=x onerror=alert(1)> **safe** _____')+')'),/&lt;img/);
 assert.doesNotMatch(run('fmt('+JSON.stringify('<script>alert(1)</script>')+')'),/<script>/);
 assert.match(run("fmt('**safe** _____')"),/<strong>safe<\/strong>/);
 storage.set('bad','[]'); assert.equal(run("store.get('bad',null)"),null);
 storage.set('bad','not json'); assert.equal(run("store.get('bad',[]) .length"),0);
 assert.match(el('storage-notice').textContent,/could not be read/);
 const oldSet=ctx.localStorage.setItem; ctx.localStorage.setItem=()=>{throw Error('quota')}; run("store.set('x',1)"); assert.match(el('storage-notice').textContent,/could not be saved/); ctx.localStorage.setItem=oldSet;
 // Long plans retain their review phase near the test date; short plans still permit new material earlier.
 run("store.set(KEYS.plan,{date:localDay(new Date(Date.now()+10*DAY)),start:localDay(new Date(Date.now()-60*DAY)),minutes:60,days:6})");
 assert.equal(run('computePlan().finalDays'),14); assert.equal(run('computePlan().inFinal'),true); assert.equal(run('computePlan().newPerDay'),0);
 assert.equal(run("calendarDaysBetween(new Date(2026,2,7),new Date(2026,2,10))"),3);
 assert.equal(run("calendarDaysBetween(new Date(2026,9,31),new Date(2026,10,3))"),3);
 // A reflection delay must not inflate the fluency timer.
 run("beginQuiz([QB[0]],'Timing audit',{adaptive:false}); quiz.qStart=Date.now()-1000; stageAnswer('recall',quiz.items[0].ans)");
 clock+=120000; run('confirmFinalTwo(); commitPending()');
 assert.equal(run('store.get(KEYS.fluency,{})[disciplineOfRecall(QB[0])].at(-1)'),1000);
 // Immediate repetitions cannot multiply long-term stability as if they were delayed retrievals.
 run("store.del(KEYS.mem); updateMemory(QB[1],false,null,1000); globalThis.beforeS=loadMem()[QB[1].id].S; updateMemory(QB[1],true,'knew',1000)");
 assert(run('loadMem()[QB[1].id].S <= beforeS*1.100001'));
 // Resuming an expired section must render its break/results, never the expired question.
 run("startExam(0); exam.phase='question'; ensureOrders(); exam.elapsed[0]=curSection().timeMin*60000; renderExam()");
 assert.equal(run('exam.phase'),'break'); assert.doesNotMatch(el('exam-body').innerHTML,/id="ec-0"/);
 const evidence=storage.get('mcat2_evidence'); run('endSection()'); assert.equal(storage.get('mcat2_evidence'),evidence);
 run("exam.si=examDef().sections.length-1; exam.phase='question'; ensureOrders(); exam.elapsed[exam.si]=curSection().timeMin*60000; renderExam()");
 assert.equal(run('exam.phase'),'complete'); assert.equal(run('activeScreen'),'screen-exam-results'); assert.doesNotMatch(el('exam-body').innerHTML,/id="ec-0"/);
 // Missed mini-test discretes lead the reinforcement session, with passage text available for review.
 run("startSubjectWork('biology','mini'); globalThis.missedId=pq.mini.items.find(x=>!x.passage).view.q.id; pq.startedAt=Date.now()-pq.targetMs-1; updatePassageTimer()");
 assert.match(el('pp-question-box').innerHTML,/Review passage:/);
 run('leaveMiniForRecall()'); assert.equal(run('quiz.items[0].q.id'),run('missedId'));
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
 assert.match(index,/Content-Security-Policy/); assert.match(index,/object-src 'none'/);
 console.log('Audit regressions passed: HTML escaping, storage warnings, stable final-review phase, civil dates, fluency timing, conservative repeats, expired exam resume, duplicate scoring, targeted reinforcement, and cache isolation/quota handling.');
}
main();
