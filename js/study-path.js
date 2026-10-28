// Subject progression uses transparent study heuristics, not validated MCAT cutoffs.
const PATH_RULES = { recallSeen: 20, accuracy: 0.70, passageCount: 2, miniCooldown: 7 * 86400000 };
function subjectPassages(subj) {
  return ALL_PASSAGES.filter(p => !EXAM_PASSAGE_IDS.has(p.id) && p.questions.length && p.questions.every(q => disciplineOfPassage(p, q) === subj));
}
function subjectPath(subj) {
  const mem = loadMem(), stats = store.get(KEYS.stats, {}), ps = store.get(KEYS.passages, {});
  const pool = QB.filter(q => disciplineOfRecall(q) === subj);
  const seen = pool.filter(q => mem[q.id]?.seen).length;
  let c = 0, t = 0;
  Object.entries(stats).forEach(([k, v]) => { if (KEY_COUNTS[k] && disciplineOfKey(k.split('|')[0], k.slice(k.indexOf('|') + 1)) === subj) { c += v.c; t += v.t; } });
  const passages = subjectPassages(subj);
  const completed = passages.filter(p => ps[p.id]?.attempts);
  const passageAccuracy = completed.length ? completed.reduce((n, p) => n + ps[p.id].last / 100, 0) / completed.length : 0;
  const ready = subj === 'cars' || (seen >= PATH_RULES.recallSeen && t > 0 && c / t >= PATH_RULES.accuracy);
  const history = store.get(KEYS.studyPath, []);
  const lastMini = history.filter(x => x.subj === subj && x.kind === 'mini').at(-1);
  const miniReady = ready && completed.length >= PATH_RULES.passageCount && passageAccuracy >= PATH_RULES.accuracy && passages.length >= 2;
  return { subj, seen, c, t, passages, completed: completed.length, passageAccuracy, ready, miniReady,
    recommendMini: miniReady && (!lastMini || Date.now() - lastMini.t >= PATH_RULES.miniCooldown) };
}
function passageOrder(subj) {
  const stats = store.get(KEYS.passages, {});
  const focus=learningNeeds().weak.find(w=>w.subj===subj);
  const words=focus?(KEY_LABEL[focus.k]||focus.k).toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3):[];
  const relevance=p=>words.filter(w=>(p.topic+' '+p.title).toLowerCase().includes(w)).length;
  return subjectPassages(subj).slice().sort((a, b) => {
    const x = stats[a.id], y = stats[b.id];
    return Number(!!x?.attempts) - Number(!!y?.attempts) || relevance(b)-relevance(a) || (x?.lastAt || 0) - (y?.lastAt || 0) || (x?.last || 0) - (y?.last || 0) || a.id.localeCompare(b.id);
  });
}
function pathRecommendation(preferred) {
  const subjects=Object.keys(DISCIPLINES).filter(s=>subjectPassages(s).length);
  const needs=learningNeeds(), history=store.get(KEYS.studyPath,[]);
  const score=p=>{
    const e=needs.ev[p.subj], n=e.recall.t+e.passage.t+e.exam.t;
    const weakness=Math.max(0,...needs.weak.filter(w=>w.subj===p.subj).map(w=>(0.8-w.accuracy)*4));
    const confusion=0.25*needs.confused.filter(x=>x.disc===p.subj).length/Math.max(1,needs.confused.length);
    const last=history.filter(x=>x.subj===p.subj).at(-1);
    const recentlyDone=last && Date.now()-last.t < 86400000 ? 1.3 : 0;
    return weakness+confusion+(p.subj==='cars' && needs.carsMissing?0.95:0)+(n<MIN_ANSWERS?0.4*(1-n/MIN_ANSWERS):0)+(p.subj!=='cars' && !e.passage.t && n>=MIN_ANSWERS?0.4:0)-recentlyDone;
  };
  const ranked=subjects.map(subjectPath).sort((a,b)=>score(b)-score(a));
  return ranked.find(p=>p.subj===preferred)||ranked[0]||null;
}
function pathWork(subj, minutes = 120) {
  const path = pathRecommendation(subj);
  if (!path) return null;
  const mini = path.recommendMini;
  const passages = passageOrder(path.subj).slice(0, mini ? 2 : 1);
  const discreteCount = mini && path.subj !== 'cars' ? Math.min(5, QB.filter(q => disciplineOfRecall(q) === path.subj).length) : 0;
  const n = passages.reduce((s, p) => s + p.questions.length, 0) + discreteCount;
  const needed = Math.ceil(n * (path.subj === 'cars' ? 102 : 95) / 60) + 5;
  // Keep recall in short daily budgets; offer a single passage if the mini does not fit.
  if (mini && needed > minutes - 10) return pathWorkSingle(path);
  return { ...path, kind: mini ? 'mini' : 'passage', minutes: needed, n };
}
function pathWorkSingle(path) {
  const first = passageOrder(path.subj)[0];
  return { ...path, kind: 'passage', n: first.questions.length,
    minutes: Math.ceil(first.questions.length * (path.subj === 'cars' ? 102 : 95) / 60) + 5 };
}
function studyPathCard(preferred) {
  const p = computePlan();
  if (p && p.daysLeft <= 2) return '<div class="results-card"><p>Final days: light review and rest. No new passage block is scheduled.</p></div>';
  const work = preferred ? pathWork(preferred, p?.plan.minutes || 120) : p?.activity || pathWork(null,120);
  if (!work) return '';
  const label = DISCIPLINES[work.subj];
  return '<div class="results-card"><div class="section-label">Recall → passage → subject mini test</div><p><b>' + esc(label) + '</b> · ' + (work.kind === 'mini' ? 'Timed mini test' : 'Passage practice') + ' · about ' + work.minutes + ' min including review' + (!preferred && p?.activityDone ? ' · ✓ completed today' : '') + '</p><p class="muted-note">' + (work.kind === 'mini' ? (work.subj === 'cars' ? 'Apply reading and reasoning across two passages, with feedback at the end.' : 'Combine recall and passage application, with feedback at the end.') : work.subj === 'cars' ? 'Practice comprehension, inference and reasoning from passage evidence; CARS has no recall prerequisite.' : work.ready ? 'Apply your recall in a passage. This recommendation does not establish mastery.' : 'Start with 10 recall questions in this subject, then try a passage. You can try passages at any level.') + '</p><div class="btn-row">' + (work.subj === 'cars' ? '' : '<button class="micro-btn" onclick="startSubjectRecall(&quot;' + work.subj + '&quot;)">Drill 10 recall questions</button>') + '<button class="new-quiz-btn" onclick="startSubjectWork(&quot;' + work.subj + '&quot;,&quot;' + work.kind + '&quot;)">' + (!preferred && p?.activityDone ? 'Optional extra practice' : work.kind === 'mini' ? 'Start subject mini test' : work.subj === 'cars' ? 'Start CARS passage' : 'Start same-subject passage') + '</button></div><p class="muted-note">Mini tests are recommended after 20 distinct recall facts at 70% accuracy and two completed passages averaging 70%; CARS uses passages only. These are study heuristics. Full-length exams remain on your calendar.</p></div>';
}
function startSubjectRecall(subj) {
  const pool = QB.filter(q => disciplineOfRecall(q) === subj);
  if (pool.length) beginQuiz(pickQuestions(pool, 10), DISCIPLINES[subj] + ' · recall before passages');
}
function startSubjectWork(subj, kind) {
  const passages = passageOrder(subj);
  if (!passages.length) return;
  if (kind !== 'mini' || passages.length < 2) { selectedPassageId = passages[0].id; startPassage(); return; }
  startSubjectMini(subj, passages.slice(0, 2));
}
function startSubjectMini(subj, passages) {
  const items = passages.flatMap(p => p.questions.map(q => ({ view: makeView(q), passage: p })));
  if (subj !== 'cars') pickQuestions(QB.filter(q => disciplineOfRecall(q) === subj), 5).forEach(q => items.push({ view: makeView(q), passage: null }));
  stopQuizTimer(); stopPassageTimer();
  const targetMs = items.length * (subj === 'cars' ? 102 : 95) * 1000;
  Object.assign(pq, { mini: { subj, items, passages, completed: false }, p: { id: 'mini_' + subj, title: DISCIPLINES[subj] + ' mini test' },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(), targetMs, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
function miniAnswer(chosen, other, ms) {
  if (pq.answered) return;
  pq.answered = true;
  const view = pq.views[pq.idx];
  pq.results.push({ view, chosen, other, right: chosen === view.ans, ms });
  view.choices.forEach((_, i) => { $('pc-' + i).disabled = true; });
  $('pp-next').innerHTML = '<p class="muted-note">Answer recorded. Feedback follows the complete mini test.</p><button class="next-btn" id="pp-next-btn" onclick="nextPassageQ()">' + (pq.idx + 1 === pq.views.length ? 'Finish mini test' : 'Next question →') + '</button>';
  $('pp-next-btn').focus({ preventScroll: true });
}
function logStudyWork(subj, kind, correct, total) {
  const history = store.get(KEYS.studyPath, []);
  history.push({ t: Date.now(), day: localDay(), subj, kind, correct, total });
  store.set(KEYS.studyPath, history.slice(-500));
}
function finishSubjectMini() {
  const mini = pq.mini;
  if (!mini || mini.completed) return;
  mini.completed = true;
  stopPassageTimer(); 
  // A timed-out test includes all unattempted items as misses, once.
  for (let i = pq.results.length; i < pq.views.length; i++) pq.results.push({ view: pq.views[i], chosen: null, other: null, right: false, ms: 0 });
  const ps = store.get(KEYS.passages, {});
  pq.results.forEach((r, i) => {
    const item = mini.items[i];
    countAnswerToday();
    // Keep this as passage/recall evidence, not a validated full-length score.
    if (item.passage) {
      recordEvidence('passage', disciplineOfPassage(item.passage, r.view.q), r.right);
      if (r.view.q.skill) recordEvidence('skill', r.view.q.skill, r.right);
    } else {
      if(r.chosen!=null)recordRecallToday(r.view.q);
      const stats = store.get(KEYS.stats, {}), q = r.view.q, row = stats[q.key] || { c: 0, t: 0 };
      row.t++; if (r.right) row.c++; stats[q.key] = row; store.set(KEYS.stats, stats);
      if(r.chosen!=null)updateMemory(q, r.right, r.other == null ? null : 'unsure', r.ms);
    }
    if (!r.right) logError({ id: r.view.q.id || 'mini_' + mini.subj + '#' + i, disc: mini.subj, key: item.passage ? null : r.view.q.key, type: 'unlabeled', chosen: r.chosen == null ? '(unanswered)' : r.view.choices[r.chosen], answer: r.view.choices[r.view.ans], src: 'mini' });
  });
  mini.passages.forEach(p => {
    const results = pq.results.filter((_, i) => mini.items[i].passage?.id === p.id);
    const score = pct(results.filter(r => r.right).length, results.length), prev = ps[p.id] || { attempts: 0, best: 0 };
    ps[p.id] = { attempts: prev.attempts + 1, last: score, best: Math.max(prev.best, score), lastAt: Date.now() };
  });
  store.set(KEYS.passages, ps);
  const correct = pq.results.filter(r => r.right).length, total = pq.results.length;
  logStudyWork(mini.subj, 'mini', correct, total);
  $('pp-fill').style.width = '100%'; $('pp-passage-box').innerHTML = '';
  $('pp-score').textContent = '✓ ' + correct + '/' + total;
  $('pp-question-box').innerHTML = '<div class="results-hero"><div class="r-label">Subject mini test complete</div><div class="score-pct">' + pct(correct, total) + '%</div><div class="score-sub">' + correct + '/' + total + ' · ' + esc(DISCIPLINES[mini.subj]) + ' · ' + fmtTime(Date.now() - pq.startedAt) + '</div></div><div class="results-card"><p>Review the explanations, then drill recall in this subject before the next passage. This mini test is practice, not a scaled MCAT score.</p><div class="btn-row">' + (mini.subj === 'cars' ? '' : '<button class="new-quiz-btn" onclick="leaveMiniForRecall()">Reinforce this subject</button>') + '<button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div></div>' + pq.results.map((r, i) => { const source = mini.items[i].passage; return (source && (i === 0 || mini.items[i - 1].passage?.id !== source.id) ? '<details class="results-card"><summary>Review passage: ' + esc(source.title) + '</summary>' + passageCard(source.topic || '', source.title, source.passage, source.figure) + '</details>' : '') + reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp, otherHandler: 'setMiniReviewAlternative.bind(null,'+i+')', otherId: 'mini-other-'+i, tag: 'Q' + (i + 1), passageTitle: mini.items[i].passage?.title }); }).join('');
  snapshotEstimate();
}
function leaveMiniForRecall() {
  if (!pq.mini?.completed) return;
  const subj = pq.mini.subj;
  const missed = pq.results.filter((r, i) => !r.right && !pq.mini.items[i].passage).map(r => r.view.q);
  const unique = [...new Map(missed.map(q => [q.baseId || q.id, q])).values()];
  const ids = new Set(unique.map(q => q.baseId || q.id));
  const extra = pickQuestions(QB.filter(q => disciplineOfRecall(q) === subj && !ids.has(q.id)), Math.max(0, 10 - unique.length));
  pq.mini = null;
  if (subj !== 'cars' && unique.length + extra.length) beginQuiz([...unique, ...extra], DISCIPLINES[subj] + ' · reinforce mini test');
}

function passageSchedule(p) {
  if (!p.activity || p.daysLeft <= 2) return '';
  const history = store.get(KEYS.studyPath, []);
  const last = s => history.filter(x => x.subj === s).at(-1)?.t || 0;
  const subjects = Object.keys(DISCIPLINES).filter(s => subjectPassages(s).length).sort((a, b) => last(a) - last(b));
  // Match today's recommendation, then rotate subjects so strengths do not crowd out weak areas or CARS.
  const rotation = [p.activity.subj, ...subjects.filter(s => s !== p.activity.subj)];
  const spacing = 7 / Math.min(7, Math.max(1, p.plan.days || 6));
  const rows = [];
  for (let i = 0; i < Math.min(7, p.plan.days || 6); i++) {
    const offset = Math.round(i * spacing);
    if (offset >= 7 || offset >= p.daysLeft - 2) break;
    const date = new Date(localDay() + 'T00:00:00'); date.setDate(date.getDate() + offset);
    const work = pathWork(rotation[i % rotation.length], p.plan.minutes || 120);
    rows.push('<li><b>' + date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + '</b> · ' + esc(DISCIPLINES[work.subj]) + ' · ' + (offset === 0 && passageWorkDone(work) ? '✓ completed' : (work.kind === 'mini' ? 'subject mini test' : work.subj === 'cars' ? 'CARS passage and review' : '10 recall questions + one passage')) + '</li>');
  }
  return '<div class="sw-head">Passage practice: next 7 days</div><ul class="milestones">' + rows.join('') + '</ul><p class="muted-note">Suggested study dates spread across your chosen days per week. Subjects and mini-test recommendations adapt as you complete work; move a block to your next available study day if needed.</p>';
}

// Priorities are transparent study heuristics; missing data is not mastery or weakness.
function learningNeeds() {
  const stats = store.get(KEYS.stats, {}), ev = disciplineEvidence();
  const weak = Object.entries(stats).filter(([k,s]) => KEY_COUNTS[k] && s.t >= 5 && s.c / s.t < 0.8)
    .map(([k,s]) => ({k, c:s.c, t:s.t, accuracy:s.c/s.t, subj:disciplineOfKey(k.split('|')[0],k.slice(k.indexOf('|')+1))}))
    .sort((a,b) => a.accuracy-b.accuracy || b.t-a.t);
  const errors = store.get(KEYS.errors, []).slice(-100);
  const confused = errors.filter(e => e.type === 'confused');
  const missing = Object.keys(DISCIPLINES).filter(d => d !== 'cars' && d !== 'research' && ev[d].recall.t + ev[d].passage.t + ev[d].exam.t < MIN_ANSWERS)
    .sort((a,b) => (ev[a].recall.t+ev[a].passage.t+ev[a].exam.t)-(ev[b].recall.t+ev[b].passage.t+ev[b].exam.t));
  return {weak, ev, errors, confused, missing, carsMissing:ev.cars.passage.t+ev.cars.exam.t === 0};
}
function recordRecallToday(q) {
  const days = store.get(KEYS.recallDays, {}), day = localDay(), id = q.baseId || q.id;
  const row = days[day] || {newIds:[], reviews:0, startedAt:Date.now()};
  if (!loadMem()[id]?.seen && !row.newIds.includes(id)) row.newIds.push(id);
  else row.reviews++;
  days[day]=row;
  store.set(KEYS.recallDays,Object.fromEntries(Object.entries(days).slice(-90)));
}
function recallToday() {
  const row = store.get(KEYS.recallDays,{})[localDay()];
  return {tracked:!!row, fresh:row?.newIds.length || 0, reviews:row?.reviews || 0};
}
function diagnosticRecorded() {
  return store.get(KEYS.examHistory,[]).some(x => x.total != null) || !!store.get(KEYS.diagnostic,null);
}
function recordExternalDiagnostic() {
  if (!confirm('Have you completed and reviewed a full-length diagnostic outside this app?')) return;
  store.set(KEYS.diagnostic,{date:localDay()}); goHome();
}
function plannedPassage(minutes) {
  const days=store.get(KEYS.plannedPassages,{}), day=localDay();
  const saved=days[day];
  if (saved && subjectPassages(saved.subj).length) {
    const base=subjectPath(saved.subj);
    if(saved.kind==='passage')return pathWorkSingle(base);
    const passages=passageOrder(saved.subj).slice(0,2);
    const n=passages.reduce((sum,p)=>sum+p.questions.length,0)+(saved.subj==='cars'?0:Math.min(5,QB.filter(q=>disciplineOfRecall(q)===saved.subj).length));
    const needed=Math.ceil(n*(saved.subj==='cars'?102:95)/60)+5;
    return needed<=minutes-10 ? {...base,kind:'mini',minutes:needed,n} : pathWorkSingle(base);
  }
  const work=pathWork(null,minutes);
  if (work) { days[day]={subj:work.subj,kind:work.kind}; store.set(KEYS.plannedPassages,Object.fromEntries(Object.entries(days).slice(-90))); }
  return work;
}
function passageWorkDone(work) {
  return !!work && store.get(KEYS.studyPath,[]).some(x => x.day === localDay() && x.subj === work.subj && (work.kind === 'passage' || x.kind === 'mini'));
}
function startWeakTopic() {
  const weak=learningNeeds().weak[0];
  if (weak) beginQuiz(pickQuestions(QB.filter(q=>q.key===weak.k),10),'Repair: '+(KEY_LABEL[weak.k] || weak.k));
}
function startMissingSubject() {
  const subj=learningNeeds().missing[0]; if(subj) startSubjectRecall(subj);
}
function confusedPairs() {
  const out=new Map();
  learningNeeds().confused.forEach(e=>{
    const pair=[e.chosen,e.answer];
    if(pair.some(x=>typeof x!=='string'))return;
    const key=pair.map(normTerm).sort().join('|');
    const item=out.get(key)||{chosen:e.chosen,answer:e.answer,count:0,id:e.id};item.count++;out.set(key,item);
  });
  return [...out.values()].sort((a,b)=>b.count-a.count).slice(0,6);
}
function showConfusionReview() {
  show('screen-results');
  const pairs=confusedPairs();
  $('results-body').innerHTML='<div class="results-hero"><div class="r-label">Distinguish confused concepts</div></div><div class="results-card"><p>For each pair, explain what each term means and which clue distinguishes them. Then check the explanation before testing yourself again.</p></div>'+pairs.map(p=>{
    const q=QB_BY_ID.get(p.id), other=q?confusionCard(p.chosen,q):null;
    return '<div class="results-card"><b>'+fmt(p.chosen)+' ↔ '+fmt(p.answer)+'</b><p class="muted-note">'+p.count+' logged mix-up(s)</p>'+(other?'<p>'+fmt(meaningOf(other))+'</p>':'')+(q?'<details><summary>Check the question explanation</summary>'+paragraphs(q.exp)+'</details>':'<p>Use the original passage explanation to check the distinction.</p>')+'</div>';
  }).join('')+'<button class="new-quiz-btn" onclick="startConfusionDrill()">Test these concepts</button>';
}
function startConfusionDrill() {
  const pool=new Map();
  learningNeeds().confused.slice().reverse().forEach(e=>{const q=QB_BY_ID.get(e.id);if(q){pool.set(q.id,q);const other=confusionCard(e.chosen,q);if(other)pool.set(other.id,other)}});
  if(pool.size)beginQuiz([...pool.values()].slice(0,15),'Distinguish confused concepts');else startSmartSession();
}
function learningGuideCard() {
  const needs=learningNeeds(), weak=needs.weak[0];
  const missing=needs.missing.slice(0,3).map(d=>DISCIPLINES[d]).join(', ');
  return '<div class="results-card"><div class="section-label">Your next priorities</div>'+
    (weak?'<p><b>Repair '+esc(KEY_LABEL[weak.k]||weak.k)+':</b> '+weak.c+'/'+weak.t+' correct. Review the concept, retrieve it, then apply it in a '+esc(DISCIPLINES[weak.subj])+' passage.</p><button class="micro-btn" onclick="startWeakTopic()">Repair this topic</button>':'<p>Build a broad baseline before treating high recall percentages as established strengths.</p>')+
    (needs.carsMissing?'<p><b>Establish a CARS baseline:</b> no CARS answers are recorded here. Practice comprehension, inference and passage evidence.</p><button class="micro-btn" onclick="startSubjectWork(&quot;cars&quot;,&quot;passage&quot;)">Start CARS passage</button>':'')+
    (needs.confused.length?'<p><b>Distinguish concepts:</b> '+needs.confused.length+' of the last '+needs.errors.length+' logged misses were marked as mix-ups.</p><button class="micro-btn" onclick="showConfusionReview()">Compare confused concepts</button>':'')+
    (missing?'<p><b>Broaden your evidence:</b> '+esc(missing)+' still have fewer than '+MIN_ANSWERS+' answers. This is a sampling threshold, not a mastery target.</p><button class="micro-btn" onclick="startMissingSubject()">Sample an underrepresented subject</button>':'')+
    (!diagnosticRecorded()?'<p><b>Record a diagnostic:</b> no completed full-length diagnostic is recorded here. Plan one within the next week if your test is more than a few days away, then review it to adjust your priorities.</p><button class="micro-btn" onclick="startExam(0)">Start app diagnostic</button> <button class="text-btn" onclick="recordExternalDiagnostic()">I reviewed an external diagnostic</button>':'')+'</div>';
}
