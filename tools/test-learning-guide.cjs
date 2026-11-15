const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/..';
const storage=new Map(),nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){},focus(){},scrollIntoView(){},remove(){}});return nodes.get(id);}
const ctx=vm.createContext({console,Date,Math,Map,Set,URLSearchParams,setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},navigator:{},location:{protocol:'http:',search:''},window:{scrollTo(){}},document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
const run=code=>vm.runInContext(code,ctx);
// Banks the app loads on demand (BANKS in js/app.js), loaded first as the browser would have them.
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for(const [,file]of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^"?]+)/g))run(fs.readFileSync(root+'/'+file,'utf8'));
// The recall planner (subject path, recall targets, Smart Session, weak-topic drills, mini tests) was removed with the
// recall decks. Home shows TODAY plus the score report and exam resume, and nothing built on the removed decks.
run('renderHome()');
assert.doesNotMatch(el('home-actions').innerHTML,/Smart Session|Review due|Drill weak|Speed drill|Flagged/);
assert.match(el('home-actions').innerHTML,/Score report/);
assert.doesNotMatch(el('home-score').innerHTML,/recall|passage path|weekly readiness/i);
assert.doesNotMatch(run('scoreReportCards()'),/of content covered/);
// An incorrect answer on a QBank card asks which other answer was considered; a correct one does not.
run("const card=AQB_QBANK[0];beginQuiz([card],'Tracking',{adaptive:false});pick((quiz.items[0].ans+1)%4);setWrongAlternative('recall',String(quiz.items[0].ans));commitPending()");
assert.equal(run('store.get(KEYS.finalTwo,[]).filter(x=>x.retrospective).length'),1);
run("beginQuiz([card],'Tracking repeat',{adaptive:false});pick(quiz.items[0].ans)");
assert.doesNotMatch(el('nxt-area').innerHTML,/Which other answer/,'Correct answers skip reflection');
run('commitPending()');assert.equal(run('store.get(KEYS.finalTwo,[]).filter(x=>x.retrospective).length'),1,'Correct answers add no alternative analysis');
// Full-lengths collect no alternatives while answering; only incorrect review items prompt.
run("startExam(0);beginSection();const v0=examView(0,0),v1=examView(0,1);exam.answers[0][0]=(v0.ans+1)%4;exam.answers[0][1]=v1.ans;renderExamQuestion()");
assert.doesNotMatch(el('exam-body').innerHTML,/Which other answer/);
run("const attempt={ei:0,date:Date.now(),answers:exam.answers,marked:exam.marked,orders:exam.orders,results:[{correct:1,total:59,pct:2,scaled:118}]};store.set(KEYS.examLast(FULL_EXAMS[0].id),attempt);Object.assign(examReviewState,{attempt,si:0,filter:'all'});renderExamReview()");
assert.equal((el('exam-review').innerHTML.match(/Which other answer/g)||[]).length,1);
const prior=run('store.get(KEYS.finalTwo,[]).length');run('setExamReviewAlternative(0,0,String(v0.ans));setExamReviewAlternative(0,1,String((v1.ans+1)%4))');assert.equal(run('store.get(KEYS.finalTwo,[]).length'),prior+1);
console.log('Learning-guide checks passed: no recall-deck tools on Home, incorrect-only reflection on cards, and incorrect-only exam review.');
