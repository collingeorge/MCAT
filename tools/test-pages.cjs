const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
function fixture(pathname = '/study/mcat/recall.html', search = '') {
 const nodes = new Map(), storage = new Map(), events = {}, entries = [];
 function node(id) { if(!nodes.has(id)) nodes.set(id,{innerHTML:'',textContent:'',hidden:false,style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]},focus(){},scrollIntoView(){},remove(){}}); return nodes.get(id); }
 const nav = ['index','recall','passages','exams','score-report','about'].map(p=>Object.assign(node('nav-'+p),{dataset:{studyPage:p}}));
 const location = {pathname,search,protocol:'http:'};
 const history = {pushState(s,_,href){entries.push(href); update(href)},replaceState(s,_,href){update(href)}};
 function update(href){const u=new URL(href,'https://example.org/study/mcat/');location.pathname=u.pathname;location.search=u.search;}
 const window = {scrollTo(){},addEventListener(k,fn){events[k]=fn}};
 const ctx = vm.createContext({console,Date,Math,Map,Set,URLSearchParams,history,location,window,navigator:{},setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},document:{getElementById:node,querySelector(s){return node(s)},querySelectorAll(){return nav},addEventListener(k,fn){events[k]=fn}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 const run=code=>vm.runInContext(code,ctx);
 for(const [,file] of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(root+'/'+file,'utf8'));
 return {run,node,nav,location,entries,events,storage,update};
}
let f=fixture();
assert.equal(f.run('activeScreen'),'screen-home');assert.equal(f.run('prefs.mode'),'recall');assert.equal(f.node('home-score').hidden,true);
f.run("setMode('passage')");assert.match(f.location.pathname,/passages.html$/);assert.equal(f.node('nav-passages')['aria-current'],'page');
f.run('selectPassage(ALL_PASSAGES[1].id)');const id=f.run('selectedPassageId');assert.equal(new URLSearchParams(f.location.search).get('passage'),id);
f=fixture('/study/mcat/passages.html','?passage='+id);assert.equal(f.run('selectedPassageId'),id);assert.equal(f.run('prefs.mode'),'passage');
f=fixture('/study/mcat/passage-session.html','?passage='+id);assert.match(f.location.pathname,/passages.html$/);assert.equal(f.run('pq.views.length'),0,'Opening session link must not start exposure');
f=fixture('/study/mcat/exam-session.html','?exam=unknown');assert.match(f.location.pathname,/exams.html$/);assert.equal(f.run('exam'),null);
f=fixture('/study/mcat/score-report.html');assert.equal(f.run('activeScreen'),'screen-results');assert.match(f.node('results-body').innerHTML,/Score report/);
f=fixture('/study/mcat/about.html');assert.equal(f.run('activeScreen'),'screen-about');assert.match(f.node('about-body').innerHTML,/About this app/);
f=fixture('/study/mcat/passages.html','?passage=%3Cscript%3E');assert.equal(f.run('prefs.mode'),'passage');assert.notEqual(f.run('selectedPassageId'),'<script>');
f=fixture();f.run('startRecall()');assert.match(f.location.pathname,/recall-session.html$/);f.run('pick(quiz.items[0].ans); endQuiz()');assert.match(f.location.pathname,/results.html$/);
f.update('about.html');f.events.popstate();assert.equal(f.run('activeScreen'),'screen-about');f.update('exams.html');f.events.popstate();assert.equal(f.run('prefs.mode'),'exam');
const before=f.entries.length;f.events.click({button:0,ctrlKey:true,target:{closest:()=>f.node('nav-recall')}});assert.equal(f.entries.length,before,'Modified clicks use native link behavior');
f.events.click({button:0,preventDefault(){},target:{closest:()=>f.node('nav-recall')}});assert.match(f.location.pathname,/recall.html$/);
for(const p of ['recall','passages','exams','score-report','about','recall-session','passage-session','exam-session','results','exam-results'])assert.match(fs.readFileSync(root+'/'+p+'.html','utf8'),/js\/pages.js/);
console.log('PASS: static entry pages, direct links, passage IDs, transient-session guards, screen URLs, history and native new-tab links.');
