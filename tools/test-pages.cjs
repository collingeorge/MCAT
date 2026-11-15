const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
function fixture(pathname = '/study/mcat/aamc.html', search = '') {
 const nodes = new Map(), storage = new Map(), events = {}, entries = [];
 function node(id) { if(!nodes.has(id)) nodes.set(id,{innerHTML:'',textContent:'',hidden:false,style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]},focus(){},scrollIntoView(){},remove(){}}); return nodes.get(id); }
 const nav = ['index','passages','exams','aamc','score-report','about'].map(p=>Object.assign(node('nav-'+p),{dataset:{studyPage:p}}));
 const location = {pathname,search,protocol:'http:'};
 const history = {pushState(s,_,href){entries.push(href); update(href)},replaceState(s,_,href){update(href)}};
 function update(href){const u=new URL(href,'https://example.org/study/mcat/');location.pathname=u.pathname;location.search=u.search;}
 const window = {scrollTo(){},addEventListener(k,fn){events[k]=fn}};
 const ctx = vm.createContext({console,Date,Math,Map,Set,URLSearchParams,history,location,window,navigator:{},setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},document:{getElementById:node,querySelector(s){return node(s)},querySelectorAll(){return nav},addEventListener(k,fn){events[k]=fn}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 const run=code=>vm.runInContext(code,ctx);
 // Banks the app loads on demand (BANKS in js/app.js), loaded first as the browser would have them.
 for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
 for(const [,file] of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(root+'/'+file,'utf8'));
 return {run,node,nav,location,entries,events,storage,update};
}
let f=fixture();
assert.equal(f.run('activeScreen'),'screen-home');assert.equal(f.run('prefs.mode'),'aamc');assert.equal(f.node('home-score').hidden,true);
// The Recall page was removed: an old recall.html link (or a saved Recall mode) lands on Overview / Passages.
// Regression (review 2.9): recall.html exists (GitHub Pages would 404 a bookmark) and routes to Overview.
assert(fs.readFileSync(root+'/recall.html','utf8').includes('js/pages.js'),'legacy recall.html is generated');
f=fixture('/study/mcat/recall.html');assert.match(f.location.pathname,/index.html$/);assert.equal(f.run('activeScreen'),'screen-home');
f=fixture();
f.run("setMode('passage')");assert.match(f.location.pathname,/passages.html$/);assert.equal(f.node('nav-passages')['aria-current'],'page');
f.run('selectPassage(LISTED_PASSAGES[1].id)');const id=f.run('selectedPassageId');assert.equal(new URLSearchParams(f.location.search).get('passage'),id);
f=fixture('/study/mcat/passages.html','?passage='+id);assert.equal(f.run('selectedPassageId'),id);assert.equal(f.run('prefs.mode'),'passage');
f=fixture('/study/mcat/passage-session.html','?passage='+id);assert.match(f.location.pathname,/passages.html$/);assert.equal(f.run('pq.views.length'),0,'Opening session link must not start exposure');
f=fixture('/study/mcat/exam-session.html','?exam=unknown');assert.match(f.location.pathname,/exams.html$/);assert.equal(f.run('exam'),null);
f=fixture('/study/mcat/score-report.html');assert.equal(f.run('activeScreen'),'screen-results');assert.match(f.node('results-body').innerHTML,/Score report/);
f=fixture('/study/mcat/about.html');assert.equal(f.run('activeScreen'),'screen-about');assert.match(f.node('about-body').innerHTML,/About this app/);
f=fixture('/study/mcat/passages.html','?passage=%3Cscript%3E');assert.equal(f.run('prefs.mode'),'passage');assert.notEqual(f.run('selectedPassageId'),'<script>');
f=fixture();f.run('startAamc()');assert.match(f.location.pathname,/recall-session.html$/);f.run('pick(quiz.items[0].ans); endQuiz()');assert.match(f.location.pathname,/results.html$/);
f.update('about.html');f.events.popstate();assert.equal(f.run('activeScreen'),'screen-about');f.update('exams.html');f.events.popstate();assert.equal(f.run('prefs.mode'),'exam');
const before=f.entries.length;f.events.click({button:0,ctrlKey:true,target:{closest:()=>f.node('nav-passages')}});assert.equal(f.entries.length,before,'Modified clicks use native link behavior');
f.events.click({button:0,preventDefault(){},target:{closest:()=>f.node('nav-passages')}});assert.match(f.location.pathname,/passages.html$/);
// TODAY's passage step: the URL names the passage actually shown, and a reload selects that passage.
{ let g=fixture('/study/mcat/index.html');
  g.run(`store.set(KEYS.subjectPath,{tests:[{subj:'cp',day:localDay(),t:1,kind:'diagnostic',correct:30,total:59,pct:51,scaled:122,version:'cp_diag',cats:{'5D':{c:2,t:14}}}]})`);
  g.run("selectPassage(LISTED_PASSAGES[35].id)");
  g.run('startMasteryPassages()');const shown=g.run('pq.p.id');
  assert.notEqual(shown,g.run("LISTED_PASSAGES[35].id"),'TODAY opened a different passage than the one selected in the list');
  assert.match(g.location.pathname,/passage-session.html$/);assert.equal(new URLSearchParams(g.location.search).get('passage'),shown,'URL follows the passage shown');
  g=fixture('/study/mcat/passage-session.html','?passage='+shown);assert.equal(g.run('selectedPassageId'),shown,'reload selects the passage that was shown');
  g=fixture('/study/mcat/index.html');g.run("startMasteryTest('diagnostic')");assert.match(g.location.pathname,/passage-session.html$/);assert.equal(new URLSearchParams(g.location.search).get('passage'),null,'a timed test URL names no passage'); }
for(const p of ['passages','aamc','flprep','exams','score-report','about','recall-session','passage-session','exam-session','results','exam-results'])assert.match(fs.readFileSync(root+'/'+p+'.html','utf8'),/js\/pages.js/);
// Review 4.6: the large banks load on demand; the home screen's counts for them match the data.
{ const g = fixture('/study/mcat/index.html'), index = fs.readFileSync(root + '/index.html', 'utf8');
  for (const f of g.run('Object.values(BANKS).flat()')) { assert(!index.includes('<script src="' + f + '"'), f + ' is not loaded at startup'); assert(fs.readFileSync(root + '/sw.js', 'utf8').includes("'" + f + "'"), f + ' is cached for offline use'); }
  assert(g.run("bankReady('fl')"));
  assert.equal(g.run('FLQ.length'), g.run('BANK_COUNTS.fl')); assert.equal(g.run('FL_TESTS.length'), g.run('BANK_COUNTS.flTests'));
  assert.equal(g.run("FLQ.filter(q => /^(pe\\d|sample)-cp:/.test(q.src)).length"), g.run('BANK_COUNTS.flCp')); }
console.log('PASS: static entry pages, direct links, passage IDs, transient-session guards, screen URLs, history and native new-tab links.');
