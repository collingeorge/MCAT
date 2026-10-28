const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/..';
const storage=new Map(),nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){},focus(){},scrollIntoView(){},remove(){}});return nodes.get(id);}
const ctx=vm.createContext({console,Date,Math,Map,Set,URLSearchParams,setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},navigator:{},location:{protocol:'http:',search:''},window:{scrollTo(){}},document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
const run=code=>vm.runInContext(code,ctx);
for(const [,file]of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^\"]+)"/g))run(fs.readFileSync(root+'/'+file,'utf8'));
// Reproduce the learner's sparse science evidence, weak Atomic Structure and P/S-only passage work.
run("const atomic=QB.find(q=>q.subj==='gen_chem'&&q.s==='Atomic Structure');const extra=QB.find(q=>q.subj==='gen_chem'&&q.s==='Intermolecular Forces');const stats={[atomic.key]:{c:3,t:6},[extra.key]:{c:11,t:13}};for(const [subj,c,t]of [['physics',6,7],['biochemistry',8,9],['organic_chem',7,8],['biology',26,30],['psych_soc',51,64]]){const q=QB.find(q=>disciplineOfRecall(q)===subj);stats[q.key]={c,t};}store.set(KEYS.stats,stats);store.set(KEYS.studyPath,[{t:Date.now(),day:localDay(),subj:'psych_soc',kind:'passage',correct:9,total:12}]);store.set(KEYS.daily,{[localDay()]:125});store.set(KEYS.plan,{date:localDay(new Date(Date.now()+93*DAY)),start:localDay(),minutes:240,days:6})");
assert.equal(run('pathRecommendation().subj'),'gen_chem','A demonstrated weakness must beat simple subject rotation');
assert(run("passageOrder('gen_chem')[0].topic.includes('Atomic Structure')"),'Prefer related passage metadata when available');
assert.equal(run("passageWorkDone({subj:'cars',kind:'passage'})"),false,'A P/S completion cannot complete CARS');
assert.equal(run('computePlan().activityDone'),false);
const planned=run('computePlan().activity.subj');
run("logStudyWork('gen_chem','passage',4,5)");
assert.equal(run('computePlan().activity.subj'),planned,'Daily assignment stays stable after completion');
assert.equal(run('computePlan().activityDone'),true);
assert.equal(run('computePlan().recallTargetMet'),false,'125 legacy attempts cannot establish 40 new facts');
assert.equal(run('computePlan().recall.tracked'),false);
assert(run('computePlan().milestones.some(m=>m.label.includes("Baseline diagnostic") && calendarDaysBetween(new Date(localDay()+"T00:00:00"),m.date)<=7)'));
run("const originalPlan=store.get(KEYS.plan,null);store.set(KEYS.plan,{...originalPlan,start:localDay(new Date(Date.now()-10*DAY))})");assert.equal(run('localDay(computePlan().milestones.find(m=>m.label.includes("Baseline diagnostic")).date)'),run('localDay()'),'An overdue diagnostic must stay due, not slide another week');run('store.set(KEYS.plan,originalPlan)');
run('renderHome()');assert.match(el('home-score').innerHTML,/Atomic Structure/);assert.match(el('home-score').innerHTML,/Establish a CARS baseline/);
assert.doesNotMatch(run("studyPathCard('cars')"),/recall foundation|Drill 10 recall/);
assert.doesNotMatch(run('scoreReportCards()'),/of content covered/);
// One new fact followed by another attempt at that fact means 1 new + 1 review.
run("const fresh=QB.find(q=>!loadMem()[q.id]?.seen);beginQuiz([fresh],'Tracking',{adaptive:false});pick((quiz.items[0].ans+1)%4);setWrongAlternative('recall',String(quiz.items[0].ans));commitPending()");
assert.equal(run('recallToday().fresh'),1);assert.equal(run('recallToday().reviews'),0);
assert.equal(run('store.get(KEYS.finalTwo,[]).filter(x=>x.retrospective).length'),1);
run("beginQuiz([fresh],'Tracking repeat',{adaptive:false});pick(quiz.items[0].ans)");
assert.equal(run('recallToday().fresh'),1);assert.equal(run('recallToday().reviews'),1);
assert.doesNotMatch(el('nxt-area').innerHTML,/Which other answer/,'Correct answers skip reflection');
run('commitPending()');assert.equal(run('store.get(KEYS.finalTwo,[]).filter(x=>x.retrospective).length'),1,'Correct answers add no alternative analysis');
run("const goal=computePlan();store.set(KEYS.recallDays,{[localDay()]:{newIds:QB.slice(0,goal.newGoal).map(q=>q.id),reviews:goal.reviewGoal,startedAt:Date.now()}});renderHome()");
assert.equal(run('computePlan().recallTargetMet'),true);assert.match(el('home-actions').innerHTML,/Optional extra practice/);
// Mini-test reflection is also restricted to incorrect submitted responses, after completion.
run("startSubjectWork('biology','mini');answerPassage((pq.views[0].ans+1)%4)");assert.doesNotMatch(el('pp-next').innerHTML,/Which other answer/);
const beforeOmissions=run('recallToday().fresh');run('pq.startedAt=Date.now()-pq.targetMs-1;updatePassageTimer()');assert.equal(run('recallToday().fresh'),beforeOmissions,'Unanswered mini discretes must not earn new-fact credit');assert.equal((el('pp-question-box').innerHTML.match(/Which other answer/g)||[]).length,1);
run('setMiniReviewAlternative(0,String(pq.views[0].ans))');assert.equal(run('pq.results[0].other'),run('pq.views[0].ans'));
run("store.set(KEYS.plannedPassages,{[localDay()]:{subj:'biology',kind:'mini'}})");assert.equal(run('computePlan().activity.kind'),'mini','Completed mini assignments do not turn into passages');assert.equal(run('computePlan().activityDone'),true);
// Full-lengths collect no alternatives while answering; only incorrect review items prompt.
run("startExam(0);beginSection();const v0=examView(0,0),v1=examView(0,1);exam.answers[0][0]=(v0.ans+1)%4;exam.answers[0][1]=v1.ans;renderExamQuestion()");
assert.doesNotMatch(el('exam-body').innerHTML,/Which other answer/);
run("const attempt={ei:0,date:Date.now(),answers:exam.answers,marked:exam.marked,orders:exam.orders,results:[{correct:1,total:59,pct:2,scaled:118}]};store.set(KEYS.examLast(FULL_EXAMS[0].id),attempt);Object.assign(examReviewState,{attempt,si:0,filter:'all'});renderExamReview()");
assert.equal((el('exam-review').innerHTML.match(/Which other answer/g)||[]).length,1);
const prior=run('store.get(KEYS.finalTwo,[]).length');run('setExamReviewAlternative(0,0,String(v0.ans));setExamReviewAlternative(0,1,String((v1.ans+1)%4))');assert.equal(run('store.get(KEYS.finalTwo,[]).length'),prior+1);
console.log('Learning-guide checks passed: reported learner priorities, matching completion, stable assignments, distinct new/review counts, early diagnostic, honest coverage wording, optional extras, and incorrect-only exam review.');
