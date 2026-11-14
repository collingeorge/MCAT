// Subject Mastery path: one subject at a time, Chem/Phys first.
//   Day 1 on a subject: a diagnostic test only (scored 118–132, weak AAMC topics shown).
//   Every later day: review yesterday's misses → 100 guided cards (worked walkthroughs, weakest topics first)
//   → optional reinforcement flashcards → an end-of-day test compared with the last one.
//   Reaching the goal (128 by default) on the end-of-day test on MASTERY.passDays separate days in a row moves
//   the path to the next subject, which starts with its own diagnostic.
// The scaled scores use the app's raw-to-scaled table (rawToScaled in app.js): an estimate, not an AAMC score.
// masteryPlan() is pure (no storage, DOM or clock) so tools/test-mastery.cjs can test it with node.
const MASTERY = {
  order: ['gen_chem', 'organic_chem', 'biochemistry', 'physics', 'biology'],
  cardsPerDay: 100,     // guided cards per study day
  testSize: 45,         // questions per diagnostic / end-of-day test
  testPassages: 2,      // passages per test; the rest are discrete questions in the subject
  reinforce: 20,        // optional regular flashcards per day
  goals: [128, 129],
  defaultGoal: 128,
  passDays: 2,          // separate days in a row at or above the goal
  weakBelow: 84,        // % correct in a topic below this (≈128) counts as weak
  secondsPerItem: 95,   // timed test pace, as in the subject mini test
};

// ── Pure planning ──
function masteryNormalize(raw) {
  const m = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const goal = MASTERY.goals.includes(m.goal) ? m.goal : MASTERY.defaultGoal;
  const tests = (Array.isArray(m.tests) ? m.tests : []).filter(t => t && MASTERY.order.includes(t.subj) && typeof t.day === 'string' && Number.isFinite(t.scaled) && (t.kind === 'diagnostic' || t.kind === 'daily'));
  const days = m.days && typeof m.days === 'object' && !Array.isArray(m.days) ? m.days : {};
  const passed = m.passed && typeof m.passed === 'object' && !Array.isArray(m.passed) ? m.passed : {};
  const current = MASTERY.order.includes(m.current) ? m.current : null;
  return { goal, tests, days, passed, current };
}
// Current subject: the one the student picked, else the first not yet mastered (in path order).
function masterySubject(m, today) {
  if (m.current && !(m.passed[m.current] && m.passed[m.current] < today)) return m.current;
  return MASTERY.order.find(s => !(m.passed[s] && m.passed[s] < today)) || null;
}
// Distinct test days (latest test of each day) ending at the most recent one, counted while at or above goal.
function masteryStreak(tests, goal) {
  const byDay = new Map();
  tests.forEach(t => byDay.set(t.day, t));
  let n = 0;
  for (const day of [...byDay.keys()].sort().reverse()) { if (byDay.get(day).scaled >= goal) n++; else break; }
  return n;
}
// Topics ranked weakest first from a test's per-category tallies {code: {c, t}}.
function masteryWeak(test) {
  if (!test || !test.cats) return [];
  return Object.entries(test.cats).filter(([k, v]) => k !== 'passage' && v && v.t > 0)
    .map(([k, v]) => ({ code: k, c: v.c, t: v.t, pct: Math.round(100 * v.c / v.t) }))
    .sort((a, b) => a.pct - b.pct || b.t - a.t);
}
function masteryPlan(raw, today) {
  const m = masteryNormalize(raw), goal = m.goal;
  const subj = masterySubject(m, today);
  const out = { goal, subj, order: MASTERY.order, passed: m.passed, steps: [], status: 'study' };
  if (!subj) { out.status = 'complete'; return out; }
  const tests = m.tests.filter(t => t.subj === subj);
  const diag = tests.find(t => t.kind === 'diagnostic');
  const latest = tests.at(-1) || null, previous = tests.length > 1 ? tests.at(-2) : null;
  Object.assign(out, { latest, previous, streak: masteryStreak(tests, goal), weak: masteryWeak(latest).filter(w => w.pct < MASTERY.weakBelow), tests });
  out.masteredToday = m.passed[subj] === today;
  if (!diag) { out.status = 'diagnostic'; out.steps.push({ id: 'diagnostic', done: false }); return out; }
  if (diag.day === today) { out.status = 'diagnostic-done'; return out; }
  // Yesterday's misses: from the most recent earlier day of this subject.
  const prevDay = Object.keys(m.days).filter(d => d < today && m.days[d]?.subj === subj).sort().at(-1) || null;
  const misses = prevDay ? [...new Set(m.days[prevDay].misses || [])] : [];
  const row = m.days[today]?.subj === subj ? m.days[today] : {};
  const reviewed = new Set(row.reviewed || []);
  const todayTest = tests.filter(t => t.kind === 'daily' && t.day === today).at(-1) || null;
  const guided = Math.min(MASTERY.cardsPerDay, row.guided || 0);
  if (misses.length) out.steps.push({ id: 'misses', count: misses.length, progress: misses.filter(id => reviewed.has(id)).length, ids: misses, from: prevDay, done: misses.every(id => reviewed.has(id)) });
  out.steps.push({ id: 'guided', count: MASTERY.cardsPerDay, progress: guided, done: guided >= MASTERY.cardsPerDay });
  out.steps.push({ id: 'reinforce', count: MASTERY.reinforce, optional: true, done: !!row.reinforced });
  out.steps.push({ id: 'test', done: !!todayTest, result: todayTest });
  return out;
}
// Applies a finished test to the store and returns it; moves to the next subject after passDays in a row.
function masteryApplyTest(raw, test) {
  const m = masteryNormalize(raw);
  m.tests = [...m.tests, test].slice(-400);
  const tests = m.tests.filter(t => t.subj === test.subj);
  if (masteryStreak(tests, m.goal) >= MASTERY.passDays && !m.passed[test.subj]) {
    m.passed = { ...m.passed, [test.subj]: test.day };
    if (m.current === test.subj) m.current = null;
  }
  const row = m.days[test.day]?.subj === test.subj ? m.days[test.day] : { subj: test.subj };
  m.days = { ...m.days, [test.day]: { ...row, misses: [...new Set([...(row.misses || []), ...(test.missIds || [])])] } };
  return m;
}

// ── Browser side: storage, sessions, tests ──
function masteryLoad() { return masteryNormalize(store.get(KEYS.subjectPath, {})); }
function masterySave(m) {
  const days = Object.fromEntries(Object.entries(m.days).sort().slice(-60));
  store.set(KEYS.subjectPath, { ...m, days });
}
function masteryDayRow(m, subj) {
  const day = localDay();
  if (m.days[day]?.subj !== subj) m.days[day] = { subj, guided: 0, misses: [], reviewed: [] };
  return m.days[day];
}
const masterySubjOfCard = q => (q.disc === 'biology' ? 'biology' : q.disc);
function masteryCategory(q) { return (q && q.key && typeof aamcOfKey === 'function' && aamcOfKey(q.key)) || (q && q.aamc) || 'other'; }
// Called for every answered recall card: counts guided cards and remembers today's misses.
function masteryNoteAnswer(q, right) {
  const m = masteryLoad(), subj = masterySubject(m, localDay());
  if (!subj) return;
  const id = q.baseId || q.id, row = masteryDayRow(m, subj);
  let changed = false;
  if (isFl(q) && masterySubjOfCard(q) === subj && quiz.mastery === 'guided') { row.guided = (row.guided || 0) + 1; changed = true; }
  const plan = masteryPlan(m, localDay()), missStep = plan.steps.find(s => s.id === 'misses');
  if (missStep && missStep.ids.includes(id) && !(row.reviewed || []).includes(id)) { row.reviewed = [...(row.reviewed || []), id]; changed = true; }
  if (!right && (quiz.mastery === 'guided' || quiz.mastery === 'reinforce' || quiz.mastery === 'misses')) { row.misses = [...new Set([...(row.misses || []), id])]; changed = true; }
  if (changed) masterySave(m);
}
// Guided cards: this subject's Practice Exam cards, weakest topics first, then never seen or missed, repeated
// in fresh orders until today's count is reached.
function startMasteryGuided() {
  const m = masteryLoad(), plan = masteryPlan(m, localDay());
  const step = plan.steps.find(s => s.id === 'guided');
  if (!plan.subj || !step) return;
  const need = Math.max(1, step.count - step.progress);
  const pool = FLQ.filter(q => masterySubjOfCard(q) === plan.subj);
  if (!pool.length) { startMasteryReinforce(); return; }
  const rank = new Map(plan.weak.map((w, i) => [w.code, i]));
  const mem = loadMem();
  const score = q => (rank.has(q.aamc) ? rank.get(q.aamc) : 50) * 10 + (!mem[q.id]?.seen ? 0 : mem[q.id].right < mem[q.id].seen ? 2 : 5) + Math.random();
  const list = [];
  while (list.length < need) {
    const pass = pool.slice().sort((a, b) => score(a) - score(b));
    if (list.length && pass[0] === list.at(-1)) pass.push(pass.shift());
    list.push(...pass);
  }
  beginQuiz(list.slice(0, Math.min(need, 25)), DISCIPLINES[plan.subj] + ' · guided cards', { mastery: 'guided' });
}
function startMasteryMisses() {
  const plan = masteryPlan(masteryLoad(), localDay()), step = plan.steps.find(s => s.id === 'misses');
  const qs = (step?.ids || []).map(id => lookupQ(id)).filter(Boolean);
  if (qs.length) beginQuiz(shuffled(qs), DISCIPLINES[plan.subj] + ' · yesterday’s misses', { mastery: 'misses' });
}
function startMasteryReinforce() {
  const m = masteryLoad(), plan = masteryPlan(m, localDay());
  if (!plan.subj) return;
  const weak = new Set(plan.weak.map(w => w.code));
  const inSubj = QB.filter(q => disciplineOfRecall(q) === plan.subj);
  const focus = inSubj.filter(q => weak.has(masteryCategory(q)));
  const qs = pickQuestions(focus.length >= 10 ? focus : inSubj, MASTERY.reinforce);
  masteryDayRow(m, plan.subj).reinforced = true; masterySave(m);
  if (qs.length) beginQuiz(qs, DISCIPLINES[plan.subj] + ' · reinforcement flashcards', { mastery: 'reinforce' });
}
// Diagnostic / end-of-day test: 2 passages in the subject (unattempted first) + discrete questions from the
// question bank (not the guided cards, so the score is not a memory of today's cards), timed, feedback at the end.
function startMasteryTest(kind) {
  const plan = masteryPlan(masteryLoad(), localDay());
  if (!plan.subj) return;
  const subj = plan.subj;
  const passages = passageOrder(subj).slice(0, MASTERY.testPassages);
  const items = passages.flatMap(p => p.questions.map(q => ({ view: makeView(q), passage: p })));
  const discrete = pickQuestions(QB.filter(q => disciplineOfRecall(q) === subj), Math.max(0, MASTERY.testSize - items.length));
  discrete.forEach(q => items.push({ view: makeView(q), passage: null }));
  if (!items.length) return;
  const firstExposures = Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)]));
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures, completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily' },
    p: { id: 'mastery_' + subj, title: DISCIPLINES[subj] + (kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: items.length * MASTERY.secondsPerItem * 1000, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
// Called by finishSubjectMini for a mastery test: scores it, records weak topics, decides on moving on.
function masteryFinishTest(mini, results) {
  const correct = results.filter(r => r.right).length, total = results.length;
  const cats = {};
  results.forEach((r, i) => { const k = mini.items[i].passage ? 'passage' : masteryCategory(r.view.q); cats[k] = cats[k] || { c: 0, t: 0 }; cats[k].t++; if (r.right) cats[k].c++; });
  const missIds = results.filter((r, i) => !r.right && !mini.items[i].passage).map(r => r.view.q.baseId || r.view.q.id);
  const pctRight = total ? 100 * correct / total : 0;
  const test = { subj: mini.subj, day: localDay(), t: Date.now(), kind: mini.mastery, correct, total, pct: Math.round(pctRight), scaled: rawToScaled(pctRight), cats, missIds };
  const before = masteryLoad();
  const prevTest = before.tests.filter(t => t.subj === test.subj).at(-1) || null;
  const after = masteryApplyTest(before, test);
  masterySave(after);
  return masteryResultHtml(test, prevTest, after);
}
const AAMC_CAT_LABEL = code => (typeof AAMC_CATEGORIES !== 'undefined' && (AAMC_CATEGORIES.find(c => c[0] === code) || [])[1]) || (code === 'other' ? 'Other topics' : code);
function masteryResultHtml(test, prev, m) {
  const goal = m.goal, weak = masteryWeak(test);
  const change = prev ? test.scaled - prev.scaled : null;
  const trend = change == null ? '' : change > 0 ? '<b class="mastery-up">▲ Improved by ' + change + '</b> from ' + prev.scaled : change < 0 ? '<b class="mastery-down">▼ Down ' + (-change) + '</b> from ' + prev.scaled : 'Same as last time (' + prev.scaled + ')';
  const passedNow = m.passed[test.subj] === test.day;
  const nextSubj = MASTERY.order.find(s => !m.passed[s]);
  const verdict = passedNow ? '<p class="today-alldone">✓ ' + esc(DISCIPLINES[test.subj]) + ' mastered: ' + goal + '+ on ' + MASTERY.passDays + ' days in a row. ' + (nextSubj ? 'Tomorrow starts ' + esc(DISCIPLINES[nextSubj]) + ' with its diagnostic.' : 'Every subject in the path is mastered.') + '</p>'
    : test.kind === 'diagnostic' ? '<p>Study starts tomorrow, aimed at the weak topics below. Today is just the diagnostic.</p>'
    : test.scaled >= goal ? '<p>At goal today. One more day at ' + goal + '+ moves you to the next subject.</p>' : '<p>Tomorrow: yesterday’s misses, then 100 guided cards on the weakest topics, then another test.</p>';
  const rows = weak.map(w => '<tr' + (w.pct < MASTERY.weakBelow ? ' class="mastery-weak"' : '') + '><td>' + esc(w.code) + '</td><td>' + esc(AAMC_CAT_LABEL(w.code)) + '</td><td>' + w.c + '/' + w.t + '</td><td>' + w.pct + '%</td></tr>').join('');
  const pass = test.cats.passage ? '<p class="muted-note">Passage questions: ' + test.cats.passage.c + '/' + test.cats.passage.t + '.</p>' : '';
  return '<div class="results-hero"><div class="r-label">' + esc(DISCIPLINES[test.subj]) + (test.kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') + '</div><div class="score-pct">' + test.scaled + '</div><div class="score-sub">' + test.correct + '/' + test.total + ' correct (' + test.pct + '%) · goal ' + goal + (trend ? ' · ' + trend : '') + '</div></div>' +
    '<div class="results-card">' + verdict + '<div class="section-label">Topics, weakest first</div><table class="data-table mastery-topics"><thead><tr><th>AAMC</th><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>' + rows + '</tbody></table>' + pass +
    '<p class="muted-note">Scaled from % correct with the app’s raw-to-scaled table: an estimate for tracking progress, not an AAMC score.</p><div class="btn-row"><button class="new-quiz-btn" data-click="goHome()">Back to TODAY</button></div></div>';
}
function setMasteryGoal(v) { const m = masteryLoad(); if (MASTERY.goals.includes(Number(v))) { m.goal = Number(v); masterySave(m); } renderHome(); }
function setMasterySubject(v) { const m = masteryLoad(); m.current = MASTERY.order.includes(v) ? v : null; masterySave(m); renderHome(); }

// ── TODAY card ──
function masteryCard() {
  const plan = masteryPlan(masteryLoad(), localDay());
  const name = s => esc(DISCIPLINES[s] || s);
  const path = plan.order.map(s => '<span class="mastery-chip' + (plan.passed[s] ? ' done' : s === plan.subj ? ' on' : '') + '">' + (plan.passed[s] ? '✓ ' : '') + name(s) + '</span>').join('<span class="mastery-arrow" aria-hidden="true">→</span>');
  const head = '<div class="today-head"><div><div class="section-label">TODAY › Subject mastery</div><div class="today-date">' + (plan.subj ? '<b>' + name(plan.subj) + '</b> · goal ' + plan.goal + ' on ' + MASTERY.passDays + ' days in a row' : 'All subjects mastered') + '</div></div></div>' +
    '<div class="mastery-path">' + path + '</div>';
  if (plan.status === 'complete') return head + '<p class="today-alldone">✓ Every subject in the path is at goal. Keep your scores up with due reviews and full-length practice.</p>';
  const latest = plan.latest ? '<p class="mastery-latest">Last test: <b>' + plan.latest.scaled + '</b> (' + plan.latest.correct + '/' + plan.latest.total + ')' + (plan.previous ? ' · ' + (plan.latest.scaled > plan.previous.scaled ? '<b class="mastery-up">▲ up ' + (plan.latest.scaled - plan.previous.scaled) + '</b>' : plan.latest.scaled < plan.previous.scaled ? '<b class="mastery-down">▼ down ' + (plan.previous.scaled - plan.latest.scaled) + '</b>' : 'no change') : '') + ' · days at goal in a row: ' + plan.streak + '/' + MASTERY.passDays + '</p>' : '';
  const weak = plan.weak.length ? '<p class="muted-note">Weak topics: ' + plan.weak.slice(0, 4).map(w => esc(w.code) + ' ' + esc(AAMC_CAT_LABEL(w.code)) + ' (' + w.pct + '%)').join(' · ') + '</p>' : '';
  const btn = (label, fn, primary = true) => '<button class="' + (primary ? 'new-quiz-btn' : 'micro-btn') + ' today-start" data-click="' + fn + '">' + label + '</button>';
  const mins = n => '<span class="today-min">~' + n + ' min</span>';
  let body = '';
  if (plan.status === 'diagnostic') {
    body = '<ol class="today-steps"><li class="today-step"><span class="today-num">1</span><div class="today-body"><div class="today-title"><b>' + name(plan.subj) + ' diagnostic</b>' + mins(Math.round(MASTERY.testSize * MASTERY.secondsPerItem / 60)) + '</div><div class="today-detail">First day on this subject: just the diagnostic. ' + MASTERY.testSize + ' timed questions (2 passages + discrete). It scores you on 118–132 and shows your weak topics; guided study starts tomorrow.</div>' + btn('Start diagnostic', "startMasteryTest('diagnostic')") + '</div></li></ol>';
  } else if (plan.status === 'diagnostic-done') {
    body = '<p class="today-alldone">✓ Diagnostic done today: <b>' + plan.latest.scaled + '</b>. Guided study on your weak topics starts tomorrow.</p>';
  } else {
    let n = 0;
    body = '<ol class="today-steps">' + plan.steps.map(s => {
      n++;
      let title = '', detail = '', button = '', count = '', time = '';
      if (s.id === 'misses') { title = 'Review yesterday’s misses'; count = s.progress + ' / ' + s.count; detail = 'Cards and test questions you missed on ' + shortDay(s.from) + '.'; time = mins(Math.ceil((s.count - s.progress) * 0.8)); if (!s.done) button = btn('Start', 'startMasteryMisses()'); }
      if (s.id === 'guided') { title = 'Guided cards with walkthroughs'; count = s.progress + ' / ' + s.count; detail = 'Weakest topics first. Answer, then watch the walkthrough: that is where the learning happens. Sessions of 25.'; time = mins(Math.ceil((s.count - s.progress) * 1.2)); if (!s.done) button = btn(s.progress ? 'Continue' : 'Start', 'startMasteryGuided()'); }
      if (s.id === 'reinforce') { title = 'Reinforcement flashcards'; detail = 'Optional: ' + s.count + ' regular flashcards on the same weak topics.'; if (!s.done) button = btn('Start', 'startMasteryReinforce()', false); }
      if (s.id === 'test') { title = 'End-of-day test'; detail = s.done ? 'Today: <b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + '). Tomorrow’s weak topics are updated.' : MASTERY.testSize + ' timed questions. Did today move your score toward ' + plan.goal + '?'; time = s.done ? '' : mins(Math.round(MASTERY.testSize * MASTERY.secondsPerItem / 60)); if (!s.done) button = btn('Start test', "startMasteryTest('daily')", plan.steps.find(x => x.id === 'guided').done); }
      return '<li class="today-step' + (s.done ? ' done' : '') + '"><span class="today-num" aria-hidden="true">' + (s.done ? '✓' : n) + '</span><div class="today-body"><div class="today-title"><b>' + title + '</b>' + (count ? ' <span class="today-count">' + count + '</span>' : '') + time + '</div><div class="today-detail">' + detail + '</div>' + button + '</div></li>';
    }).join('') + '</ol>';
  }
  const mastered = plan.masteredToday ? '<p class="today-alldone">✓ ' + name(plan.subj) + ' reached goal on ' + MASTERY.passDays + ' days in a row. The next subject starts tomorrow.</p>' : '';
  const controls = '<details class="mastery-settings"><summary>Path settings</summary><label>Goal <select data-change="setMasteryGoal(this.value)">' + MASTERY.goals.map(g => '<option value="' + g + '"' + (g === plan.goal ? ' selected' : '') + '>' + g + '</option>').join('') + '</select></label> <label>Study this subject now <select data-change="setMasterySubject(this.value)"><option value="">Next in path</option>' + MASTERY.order.map(s => '<option value="' + s + '"' + (s === plan.subj && masteryLoad().current === s ? ' selected' : '') + '>' + name(s) + '</option>').join('') + '</select></label></details>';
  return head + latest + weak + mastered + body + controls;
}
