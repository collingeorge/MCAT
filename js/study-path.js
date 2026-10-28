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
  return subjectPassages(subj).slice().sort((a, b) => {
    const x = stats[a.id], y = stats[b.id];
    return Number(!!x?.attempts) - Number(!!y?.attempts) || (x?.lastAt || 0) - (y?.lastAt || 0) || (x?.last || 0) - (y?.last || 0) || a.id.localeCompare(b.id);
  });
}
function pathRecommendation(preferred) {
  const subjects = Object.keys(DISCIPLINES).filter(s => subjectPassages(s).length);
  const history = store.get(KEYS.studyPath, []);
  const last = s => history.filter(x => x.subj === s).at(-1)?.t || 0;
  const ranked = subjects.map(subjectPath).sort((a, b) => last(a.subj) - last(b.subj) || Number(b.ready) - Number(a.ready) || subjects.indexOf(a.subj) - subjects.indexOf(b.subj));
  return ranked.find(p => p.subj === preferred) || ranked[0] || null;
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
  const work = pathWork(preferred, p?.plan.minutes || 120);
  if (!work) return '';
  const label = DISCIPLINES[work.subj];
  return '<div class="results-card"><div class="section-label">Recall → passage → subject mini test</div><p><b>' + esc(label) + '</b> · ' + (work.kind === 'mini' ? 'Timed mini test' : 'Passage practice') + ' · about ' + work.minutes + ' min including review</p><p class="muted-note">' + (work.kind === 'mini' ? 'You have recall practice and two passages at 70% or better on average. Apply them together, with feedback at the end.' : work.ready ? 'Your recall foundation is building. Apply it to a passage in the same subject.' : work.subj === 'cars' ? 'Practice passage reasoning directly.' : 'Start with 10 recall questions in this subject, then try a passage. You can try passages at any level.') + '</p><div class="btn-row">' + (work.subj === 'cars' ? '' : '<button class="micro-btn" onclick="startSubjectRecall(&quot;' + work.subj + '&quot;)">Drill 10 recall questions</button>') + '<button class="new-quiz-btn" onclick="startSubjectWork(&quot;' + work.subj + '&quot;,&quot;' + work.kind + '&quot;)">' + (work.kind === 'mini' ? 'Start subject mini test' : 'Start same-subject passage') + '</button></div><p class="muted-note">Mini tests are recommended after 20 distinct recall facts at 70% accuracy and two completed passages averaging 70%; CARS uses passages only. These are study heuristics. Full-length exams remain on your calendar.</p></div>';
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
    idx: 0, views: items.map(x => x.view), results: [], answered: false, startedAt: Date.now(), qStart: Date.now(), targetMs, errPending: null });
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
  stopPassageTimer(); finalTwo = null;
  // A timed-out test includes all unattempted items as misses, once.
  for (let i = pq.results.length; i < pq.views.length; i++) pq.results.push({ view: pq.views[i], chosen: null, other: null, right: false, ms: 0 });
  const ps = store.get(KEYS.passages, {});
  pq.results.forEach((r, i) => {
    const item = mini.items[i];
    countAnswerToday(); recordFinalTwo(r.view, r.chosen, r.other);
    // Keep this as passage/recall evidence, not a validated full-length score.
    if (item.passage) {
      recordEvidence('passage', disciplineOfPassage(item.passage, r.view.q), r.right);
      if (r.view.q.skill) recordEvidence('skill', r.view.q.skill, r.right);
    } else {
      const stats = store.get(KEYS.stats, {}), q = r.view.q, row = stats[q.key] || { c: 0, t: 0 };
      row.t++; if (r.right) row.c++; stats[q.key] = row; store.set(KEYS.stats, stats);
      updateMemory(q, r.right, r.other == null ? null : 'unsure', r.ms);
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
  $('pp-question-box').innerHTML = '<div class="results-hero"><div class="r-label">Subject mini test complete</div><div class="score-pct">' + pct(correct, total) + '%</div><div class="score-sub">' + correct + '/' + total + ' · ' + esc(DISCIPLINES[mini.subj]) + ' · ' + fmtTime(Date.now() - pq.startedAt) + '</div></div><div class="results-card"><p>Review the explanations, then drill recall in this subject before the next passage. This mini test is practice, not a scaled MCAT score.</p><div class="btn-row">' + (mini.subj === 'cars' ? '' : '<button class="new-quiz-btn" onclick="leaveMiniForRecall()">Reinforce this subject</button>') + '<button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div></div>' + pq.results.map((r, i) => reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp, tag: 'Q' + (i + 1), passageTitle: mini.items[i].passage?.title })).join('');
  snapshotEstimate();
}
function leaveMiniForRecall() { const subj = pq.mini.subj; pq.mini = null; startSubjectRecall(subj); }

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
    rows.push('<li><b>' + date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + '</b> · ' + esc(DISCIPLINES[work.subj]) + ' · ' + (offset === 0 && p.activityDone ? '✓ completed' : (work.kind === 'mini' ? 'subject mini test' : '10 recall questions + one passage')) + '</li>');
  }
  return '<div class="sw-head">Passage practice: next 7 days</div><ul class="milestones">' + rows.join('') + '</ul><p class="muted-note">Suggested study dates spread across your chosen days per week. Subjects and mini-test recommendations adapt as you complete work; move a block to your next available study day if needed.</p>';
}
