const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const files = ['qb-biochemistry','qb-biology','qb-chemistry','qb-physics','qb-equations','qb-behavioral-1','qb-behavioral-2','passages-science','passages-cars','passages-data','exam1','exam2-cp','exam2-bb','exam2-ps','exams'];
const nodes = new Map(), storage = new Map();
function el(id) { if (!nodes.has(id)) nodes.set(id, { innerHTML:'', textContent:'', value:'', style:{}, dataset:{}, classList:{toggle(){},add(){},remove(){}}, setAttribute(){}, focus(){}, scrollIntoView(){}, remove(){}, querySelectorAll(){return []} }); return nodes.get(id); }
const ctx = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval(){return 1}, clearInterval(){}, setTimeout(){}, confirm(){return true}, alert(){}, navigator:{}, location:{protocol:'http:',search:''}, window:{scrollTo(){}}, document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}}, localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)} });
const run = code => vm.runInContext(code,ctx);
files.forEach(name=>run(fs.readFileSync(root+'/data/'+name+'.js','utf8')));
run(fs.readFileSync(root+'/js/study-path.js','utf8'));
run(fs.readFileSync(root+'/js/app.js','utf8'));
assert.equal(run('QB.length'),2807);
// Every science/CARS subject has existing passages; no new generated question content.
for (const subj of ['biology','biochemistry','gen_chem','organic_chem','physics','psych_soc','cars']) {
 assert(run('subjectPassages('+JSON.stringify(subj)+').length')>=2,subj);
}
assert.equal(run("subjectPath('biology').ready"),false);
assert.equal(run("pathWork('biology').kind"),'passage','Beginners can use passages');
run("const bioFacts=QB.filter(q=>disciplineOfRecall(q)==='biology').slice(0,20); store.set(KEYS.mem,Object.fromEntries(bioFacts.map(q=>[q.id,{seen:1}]))); store.set(KEYS.stats,{[bioFacts[0].key]:{c:7,t:10}})");
assert.equal(run("subjectPath('biology').ready"),true);
run("const bioPassages=subjectPassages('biology'); store.set(KEYS.passages,Object.fromEntries(bioPassages.slice(0,2).map(p=>[p.id,{attempts:1,last:80,best:80}])))");
assert.equal(run("pathWork('biology',120).kind"),'mini');
assert.equal(run("pathWork('biology',30).kind"),'passage','Short budgets should use one passage');
assert.equal(run("passageOrder('biology')[0].id===bioPassages[2].id"),true,'Prefer unseen passages');
assert.match(run("studyPathCard('biology')"),/startSubjectWork/);
// Study plan reserves passage time and still schedules full-length exams.
run("const targetDate = new Date(Date.now()+60*86400000); store.set(KEYS.plan,{date:localDay(targetDate),minutes:30,days:6,start:localDay()})");
assert(run('computePlan().passageMinutes')>0);
assert(run('computePlan().capacity * SECONDS_PER_RECALL / 60 + computePlan().passageMinutes')<=30);
assert(run('computePlan().milestones.length')>=4);
assert.match(run('passageSchedule(computePlan())'),/next 7 days/);
assert(run("Object.keys(DISCIPLINES).every(s => subjectPassages(s).every(p => !EXAM_PASSAGE_IDS.has(p.id)))"));
// Complete a same-subject mini test with delayed feedback and real mixed items.
run("startSubjectWork('biology','mini')");
assert.equal(run('pq.mini.passages.length'),2);
assert.equal(run('pq.mini.items.filter(x=>!x.passage).length'),5);
assert(run("pq.mini.items.every(x=>x.passage?disciplineOfPassage(x.passage,x.view.q)==='biology':disciplineOfRecall(x.view.q)==='biology')"));
assert.doesNotMatch(el('pp-question-box').innerHTML,/Answer:|✓ Correct|✗ Incorrect/);
const beforeDaily=run('answeredToday()');
const n=run('pq.views.length');
run("answerPassage(pq.views[0].ans); setRunnerUp(String((pq.views[0].ans+1)%4)); confirmFinalTwo()");
assert.equal(run('answeredToday()'),beforeDaily,'Mini must defer recording until completion');
assert.doesNotMatch(el('pp-next').innerHTML,/Answer:|✓ Correct|✗ Incorrect/);
for(let i=1;i<n;i++) run('nextPassageQ(); answerPassage(pq.views[pq.idx].ans); confirmFinalTwo()');
run('nextPassageQ()');
assert.equal(run('pq.mini.completed'),true);
assert.equal(run('answeredToday()')-beforeDaily,n,'Count all mini questions exactly once');
assert.equal(run("store.get(KEYS.studyPath,[]).at(-1).kind"),'mini');
assert.match(el('pp-question-box').innerHTML,/Subject mini test complete/);
assert.match(el('pp-question-box').innerHTML,/Explanation/);
assert.equal(run("subjectPath('biology').recommendMini"),false,'Avoid recommending a mini again immediately');
run('finishSubjectMini()'); assert.equal(run('answeredToday()')-beforeDaily,n,'Finishing twice must not duplicate records');
// Timed-out blocks count unanswered items as misses and reveal review only once.
run("startSubjectWork('psych_soc','mini'); pq.startedAt=Date.now()-pq.targetMs-1; updatePassageTimer()");
assert.equal(run('pq.mini.completed'),true);
assert.equal(run('pq.results.filter(r=>r.chosen===null).length'),run('pq.views.length'));
run('leaveMiniForRecall()');
assert.equal(run("quiz.items.every(v=>disciplineOfRecall(v.q)==='psych_soc')"),true,'Reinforcement stays in the same subject');
// Old passage records without timestamps still sort, and tutor passage completion is idempotent.
run("startSubjectWork('biology','passage')");
const passageN=run('pq.views.length');
for(let i=0;i<passageN;i++) { run('answerPassage(pq.views[pq.idx].ans); confirmFinalTwo(); nextPassageQ()'); }
const logN=run('store.get(KEYS.studyPath,[]).length'); run('showPassageResults()');
assert.equal(run('store.get(KEYS.studyPath,[]).length'),logN);
assert.equal(run('computePlan().activityDone'),true);
// Test-day/rest phase does not schedule a new passage block.
run("store.set(KEYS.plan,{date:localDay(new Date(Date.now()+86400000)),minutes:30,days:6})");
assert.equal(run('computePlan().activity'),null);
console.log('Study-path integration passed: actual 2,807-fact bank, subject mappings, progression, budgets, delayed mini feedback, timeouts, reinforcement, persistence and duplicate guards.');
