// Section Mastery path: one MCAT section at a time, as the exam tests it: C/P first, then B/B, then P/S.
//   Day 1 on a section: a diagnostic test only (scored 118–132, weak AAMC content categories shown).
//   Every later day: review yesterday's misses → 50 flashcards → 50 Practice Exam cards with step-by-step
//   lessons, both spread over 5 of the section's content categories (the weakest first, then the ones not
//   studied for longest) → an end-of-day test, half an AAMC section, mixed across the section's disciplines in
//   the exam's proportions. Finished early? Another set from today's categories.
//   Reaching the goal (128 by default) on the end-of-day test on MASTERY.passDays separate days in a row moves
//   the path to the next section, which starts with its own diagnostic.
// The scaled scores use the app's raw-to-scaled table (rawToScaled in app.js): an estimate, not an AAMC score.
// masteryPlan() is pure (no storage, DOM or clock) so tools/test-mastery.cjs can test it with node.
const MASTERY = {
  order: ['cp', 'bb', 'ps'],   // MCAT sections (CARS is reading and reasoning: passages, not flashcards)
  topicsPerDay: 5,      // content categories studied per day
  perDay: [50, 30, 20], // flashcards, and Practice Exam cards, per day (the student picks; 50 by default)
  // Each section's AAMC content categories (the exam's own outline).
  topics: {
    cp: ['4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E'],
    bb: ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B'],
    ps: ['6A', '6B', '6C', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '10A'],
  },
  // Diagnostic: a full AAMC section (59 questions: 10 passages + single questions), enough data to rank every
  // content category. End-of-day test: half a section (30: 5 passages + ~10 single). Both at exam pace.
  diagSize: 59, diagPassages: 10,
  testSize: 30, testPassages: 5,
  goals: [128, 129],
  defaultGoal: 128,
  passDays: 2,          // separate days in a row at or above the goal
  weakBelow: 84,        // % correct in a topic below this (≈128) counts as weak
  secondsPerItem: 95,   // timed test pace: the exam's 95 min for 59 questions is about 97 s each
};

// ── Pure planning ──
function masteryNormalize(raw) {
  const m = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const goal = MASTERY.goals.includes(m.goal) ? m.goal : MASTERY.defaultGoal;
  const tests = (Array.isArray(m.tests) ? m.tests : []).filter(t => t && MASTERY.order.includes(t.subj) && typeof t.day === 'string' && Number.isFinite(t.scaled) && (t.kind === 'diagnostic' || t.kind === 'daily'));
  const days = m.days && typeof m.days === 'object' && !Array.isArray(m.days) ? m.days : {};
  const passed = m.passed && typeof m.passed === 'object' && !Array.isArray(m.passed) ? m.passed : {};
  const current = MASTERY.order.includes(m.current) ? m.current : null;
  const perDay = MASTERY.perDay.includes(m.perDay) ? m.perDay : MASTERY.perDay[0];
  return { goal, tests, days, passed, current, perDay };
}
// Current section: the one the student picked, else the first not yet mastered (in path order).
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
// Today's content categories: up to 2 of the weakest, then the section's others that were studied longest ago (or never).
function masteryTopics(m, subj, today, latest) {
  const list = MASTERY.topics[subj] || [];
  const weak = masteryWeak(latest).filter(w => w.pct < MASTERY.weakBelow && list.includes(w.code)).map(w => w.code).slice(0, 2);
  const last = {};
  Object.keys(m.days).filter(d => d < today && m.days[d]?.subj === subj).sort().forEach(d => (m.days[d].topics || []).forEach(t => { last[t] = d; }));
  const rest = list.filter(t => !weak.includes(t)).sort((a, b) => (last[a] || '').localeCompare(last[b] || '') || list.indexOf(a) - list.indexOf(b));
  return [...weak, ...rest].slice(0, MASTERY.topicsPerDay);
}
// Splits n items over weighted disciplines [[d, w], …] by largest remainder, so 5 C/P passages go 2/1/1/1/0.
function masteryApportion(weighted, n) {
  const total = weighted.reduce((t, [, w]) => t + w, 0) || 1;
  const raw = weighted.map(([, w]) => n * w / total), out = raw.map(Math.floor);
  raw.map((r, i) => [r - out[i], i]).sort((a, b) => b[0] - a[0]).slice(0, n - out.reduce((a, b) => a + b, 0)).forEach(([, i]) => out[i]++);
  return out;
}
// Splits a day's total over the sub-topics as evenly as possible; the weakest (listed first) get any extra.
function masterySplit(total, n) { return Array.from({ length: n }, (_, i) => Math.floor(total / n) + (i < total % n ? 1 : 0)); }
// sizes.guided: how many Practice Exam cards the section has (a small pool caps the day's count; none: no step).
function masteryPlan(raw, today, sizes = {}) {
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
  const topics = Array.isArray(row.topics) && row.topics.length ? row.topics : masteryTopics(m, subj, today, latest);
  const flashN = m.perDay, guidedN = Number.isFinite(sizes.guided) ? Math.min(m.perDay, sizes.guided) : m.perDay;
  const tally = (key, total) => { const need = masterySplit(total, topics.length); return topics.map((code, i) => { const got = Number((row[key] || {})[code]) || 0; return { code, need: need[i], progress: Math.min(need[i], got), raw: got }; }); };
  const flashT = tally('flashT', flashN), guidedT = tally('guidedT', guidedN);
  const sum = (a, k = 'progress') => a.reduce((n, t) => n + t[k], 0);
  const lessons = Math.min(guidedN, Number(row.lessonsN) || 0);
  out.topics = topics; out.perDay = m.perDay;
  if (misses.length) out.steps.push({ id: 'misses', count: misses.length, progress: misses.filter(id => reviewed.has(id)).length, ids: misses, from: prevDay, done: misses.every(id => reviewed.has(id)) });
  out.steps.push({ id: 'flashcards', topics: flashT, count: flashN, progress: sum(flashT), extra: sum(flashT, 'raw') - sum(flashT), done: flashT.every(t => t.progress >= t.need) });
  if (guidedN > 0) out.steps.push({ id: 'guided', topics: guidedT, count: guidedN, progress: sum(guidedT), extra: sum(guidedT, 'raw') - sum(guidedT), lessons, lessonCount: guidedN,
    done: guidedT.every(t => t.progress >= t.need) && lessons >= guidedN });
  out.steps.push({ id: 'test', done: !!todayTest, result: todayTest });
  return out;
}
// Applies a finished test to the store and returns it; moves to the next section after passDays in a row.
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
function masteryPlanNow(m = masteryLoad()) {
  const subj = masterySubject(m, localDay());
  return masteryPlan(m, localDay(), { guided: subj ? masteryPracticePool(subj).length : 0 });
}
const masterySection = s => MCAT_SECTIONS.find(x => x.id === s);
const masteryName = s => { const x = masterySection(s); return x ? x.abbrev + ' · ' + x.label : String(s || ''); };
// The section's disciplines, most heavily tested first (AAMC: C/P is 30% general chemistry, 25% physics, …).
const masteryDiscs = s => Object.entries(masterySection(s)?.weights || {}).filter(([d]) => d !== 'cars').sort((a, b) => b[1] - a[1]);
// Flashcards in the section: its disciplines, in its content categories (or not yet categorized).
function masteryFlashPool(s) {
  const discs = new Set(masteryDiscs(s).map(([d]) => d)), cats = new Set(MASTERY.topics[s] || []);
  return QB.filter(q => { if (!discs.has(disciplineOfRecall(q))) return false; const c = masteryCategory(q); return cats.has(c) || c === 'other'; });
}
// Practice Exam cards: the C/P cards come from the AAMC practice exams' C/P sections.
const masteryPracticePool = s => (s === 'cp' ? FLQ.filter(q => /^pe\d-cp:/.test(q.src)) : []);
function masteryLoad() { return masteryNormalize(store.get(KEYS.subjectPath, {})); }
function masterySave(m) {
  const days = Object.fromEntries(Object.entries(m.days).sort().slice(-60));
  store.set(KEYS.subjectPath, { ...m, days });
}
function masteryDayRow(m, subj) {
  const day = localDay();
  if (m.days[day]?.subj !== subj) m.days[day] = { subj, misses: [], reviewed: [] };
  // Fix today's sub-topics the first time the day is touched, so they don't shift as tests come in.
  if (!Array.isArray(m.days[day].topics) || !m.days[day].topics.length) m.days[day].topics = masteryPlanNow(m).topics || [];
  return m.days[day];
}
function masteryCategory(q) { return (q && q.key && typeof aamcOfKey === 'function' && aamcOfKey(q.key)) || (q && q.aamc) || 'other'; }
// Called for every answered recall card: counts guided cards and remembers today's misses.
function masteryNoteAnswer(q, right) {
  const m = masteryLoad(), subj = masterySubject(m, localDay());
  if (!subj) return;
  const id = q.baseId || q.id, row = masteryDayRow(m, subj);
  let changed = false;
  // Each card in a flashcard or Practice Exam session was picked for one of today's sub-topics.
  const topic = quiz.topicOf && quiz.topicOf[q.id];
  if (topic && (quiz.mastery === 'flashcards' || quiz.mastery === 'guided')) {
    const key = quiz.mastery === 'flashcards' ? 'flashT' : 'guidedT';
    row[key] = { ...(row[key] || {}), [topic]: (Number((row[key] || {})[topic]) || 0) + 1 };
    row.seen = [...new Set([...(row.seen || []), q.id])].slice(-400); changed = true;
  }
  const plan = masteryPlanNow(m), missStep = plan.steps.find(s => s.id === 'misses');
  if (missStep && missStep.ids.includes(id) && !(row.reviewed || []).includes(id)) { row.reviewed = [...(row.reviewed || []), id]; changed = true; }
  if (!right && (quiz.mastery === 'guided' || quiz.mastery === 'flashcards' || quiz.mastery === 'misses')) { row.misses = [...new Set([...(row.misses || []), id])]; changed = true; }
  if (changed) masterySave(m);
}
// Called when a step-by-step lesson is played to its last step during today's Practice Exam cards.
function masteryNoteLesson(q) {
  const m = masteryLoad(), subj = masterySubject(m, localDay());
  if (!subj || quiz.mastery !== 'guided') return;
  const row = masteryDayRow(m, subj);
  row.lessonsN = (Number(row.lessonsN) || 0) + 1;
  masterySave(m);
}
// Builds today's set for one step: for each sub-topic, the cards still needed, from that sub-topic first, then
// from the rest of the subject (the pool may be small), repeating cards only if the subject runs out.
function masteryTopicSet(step, pool, catOf, pick) {
  const list = [], topicOf = {};
  for (const t of step.topics) {
    const need = t.need - t.progress;
    if (need <= 0) continue;
    const used = new Set(list.map(q => q.id));
    let got = pick(pool.filter(q => catOf(q) === t.code && !used.has(q.id)), need);
    if (got.length < need) got = got.concat(pick(pool.filter(q => catOf(q) !== t.code && !used.has(q.id) && !got.includes(q)), need - got.length));
    while (got.length < need && pool.length) got.push(pool[(list.length + got.length) % pool.length]);
    got.forEach(q => { topicOf[q.id] = topicOf[q.id] || t.code; list.push(q); });
  }
  return { list, topicOf };
}
// more: another full set from today's sub-topics after the day's set is done, cards not seen today first.
function masteryBegin(plan, step, pool, catOf, label, mode, more) {
  if (!plan.subj || !step || (step.done && !more)) return;
  const m = masteryLoad(), row = masteryDayRow(m, plan.subj); masterySave(m);
  if (more) {
    const seen = new Set(row.seen || []), fresh = pool.filter(q => !seen.has(q.id));
    step = { ...step, topics: step.topics.map(t => ({ ...t, progress: 0 })) };
    if (fresh.length >= step.count) pool = fresh;
    label += ' · another set';
  }
  const { list, topicOf } = masteryTopicSet(step, pool, catOf, pickQuestions);
  if (!list.length) return;
  beginQuiz(list, masterySection(plan.subj).abbrev + ' · ' + label, { mastery: mode });
  quiz.topicOf = topicOf;
}
// Practice Exam cards for today's sub-topics; each opens its step-by-step lesson.
function startMasteryGuided(more) {
  const plan = masteryPlanNow();
  const pool = masteryPracticePool(plan.subj);
  if (!pool.length) { startMasteryFlashcards(more); return; }
  masteryBegin(plan, plan.steps.find(s => s.id === 'guided'), pool, q => q.aamc, 'Practice Exam cards', 'guided', more);
}
function startMasteryMisses() {
  const plan = masteryPlanNow(), step = plan.steps.find(s => s.id === 'misses');
  const qs = (step?.ids || []).map(id => lookupQ(id)).filter(Boolean);
  if (qs.length) beginQuiz(shuffled(qs), masterySection(plan.subj).abbrev + ' · yesterday’s misses', { mastery: 'misses' });
}
// Regular flashcards for today's sub-topics.
function startMasteryFlashcards(more) {
  const plan = masteryPlanNow();
  masteryBegin(plan, plan.steps.find(s => s.id === 'flashcards'), masteryFlashPool(plan.subj), masteryCategory, 'flashcards', 'flashcards', more);
}
// Diagnostic / end-of-day test: 2 passages from the section's main disciplines (unattempted first) + discrete
// questions spread over its disciplines in the exam's proportions, from the
// question bank (not the guided cards, so the score is not a memory of today's cards), timed, feedback at the end.
function startMasteryTest(kind) {
  const plan = masteryPlanNow();
  if (!plan.subj) return;
  const subj = plan.subj;
  const discs = masteryDiscs(subj);
  // Passages per discipline in the exam's proportions (C/P: 3 general chemistry, 3 physics, 3 biochemistry,
  // 1 organic for a diagnostic), each discipline's unattempted passages first, then mixed in turn as on the exam.
  const full = kind === 'diagnostic', size = full ? MASTERY.diagSize : MASTERY.testSize;
  const share = masteryApportion(discs, full ? MASTERY.diagPassages : MASTERY.testPassages);
  const byDisc = discs.map(([d], i) => passageOrder(d).slice(0, share[i])), passages = [];
  for (let r = 0; byDisc.some(l => l.length > r); r++) byDisc.forEach(l => { if (l[r]) passages.push(l[r]); });
  const nPassageQs = passages.reduce((n, p) => n + p.questions.length, 0);
  // Discrete questions are exam-style stand-alone questions (the AAMC-style question bank), not flashcards,
  // spread over the section's disciplines by weight; flashcards only fill a gap.
  const need = Math.max(0, size - nPassageQs), exam = masteryExamPool(subj), discrete = [];
  const dShare = masteryApportion(discs, need);
  discs.forEach(([d], i) => discrete.push(...pickQuestions(exam.filter(q => disciplineOfRecall(q) === d), dShare[i])));
  if (discrete.length < need) discrete.push(...pickQuestions(exam.filter(q => !discrete.includes(q)), need - discrete.length));
  if (discrete.length < need) discrete.push(...pickQuestions(masteryFlashPool(subj), need - discrete.length));
  discrete.splice(need);
  // Layout as on the exam: groups of passages, each followed by a set of discrete questions.
  const items = masteryLayout(passages, shuffled(discrete));  if (!items.length) return;
  const firstExposures = Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)]));
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures, completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily' },
    p: { id: 'mastery_' + subj, title: masteryName(subj) + (kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: items.length * MASTERY.secondsPerItem * 1000, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
// Exam-style discrete questions in the section: the AAMC-style question bank, by discipline and content category.
function masteryExamPool(s) {
  const discs = new Set(masteryDiscs(s).map(([d]) => d)), cats = new Set(MASTERY.topics[s] || []);
  return AQB_QBANK.filter(q => discs.has(disciplineOfRecall(q)) && cats.has(masteryCategory(q)));
}
// The exam's order: passages in 3 groups, each group followed by a set of discrete questions.
function masteryLayout(passages, discrete) {
  const groups = 3, pSplit = masteryApportion(Array.from({ length: groups }, () => ['g', 1]), passages.length);
  const dSplit = masteryApportion(Array.from({ length: groups }, () => ['g', 1]), discrete.length), items = [];
  let pi = 0, di = 0;
  for (let g = 0; g < groups; g++) {
    passages.slice(pi, pi += pSplit[g]).forEach(p => p.questions.forEach(q => items.push({ view: makeView(q), passage: p })));
    discrete.slice(di, di += dSplit[g]).forEach(q => items.push({ view: makeView(q), passage: null }));
  }
  return items;
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
  const verdict = passedNow ? '<p class="today-alldone">✓ ' + esc(masteryName(test.subj)) + ' mastered: ' + goal + '+ on ' + MASTERY.passDays + ' days in a row. ' + (nextSubj ? 'Tomorrow starts ' + esc(masteryName(nextSubj)) + ' with its diagnostic.' : 'Every section in the path is mastered.') + '</p>'
    : test.kind === 'diagnostic' ? '<p>Study starts tomorrow, aimed at the weak topics below. Today is just the diagnostic.</p>'
    : test.scaled >= goal ? '<p>At goal today. One more day at ' + goal + '+ moves you to the next section.</p>' : '<p>Tomorrow: yesterday’s misses, then flashcards and Practice Exam cards on 5 content categories (weakest first), then another test.</p>';
  const rows = weak.map(w => '<tr' + (w.pct < MASTERY.weakBelow ? ' class="mastery-weak"' : '') + '><td>' + esc(w.code) + '</td><td>' + esc(AAMC_CAT_LABEL(w.code)) + '</td><td>' + w.c + '/' + w.t + '</td><td>' + w.pct + '%</td></tr>').join('');
  const pass = test.cats.passage ? '<p class="muted-note">Passage questions: ' + test.cats.passage.c + '/' + test.cats.passage.t + '.</p>' : '';
  return '<div class="results-hero"><div class="r-label">' + esc(masteryName(test.subj)) + (test.kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') + '</div><div class="score-pct">' + test.scaled + '</div><div class="score-sub">' + test.correct + '/' + test.total + ' correct (' + test.pct + '%) · goal ' + goal + (trend ? ' · ' + trend : '') + '</div></div>' +
    '<div class="results-card">' + verdict + '<div class="section-label">Topics, weakest first</div><table class="data-table mastery-topics"><thead><tr><th>AAMC</th><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>' + rows + '</tbody></table>' + pass +
    '<p class="muted-note">Scaled from % correct with the app’s raw-to-scaled table: an estimate for tracking progress, not an AAMC score.</p><div class="btn-row"><button class="new-quiz-btn" data-click="goHome()">Back to TODAY</button></div></div>';
}
function setMasteryGoal(v) { const m = masteryLoad(); if (MASTERY.goals.includes(Number(v))) { m.goal = Number(v); masterySave(m); } renderHome(); }
function setMasteryPerDay(v) { const m = masteryLoad(); if (MASTERY.perDay.includes(Number(v))) { m.perDay = Number(v); masterySave(m); } renderHome(); }
function setMasterySubject(v) { const m = masteryLoad(); m.current = MASTERY.order.includes(v) ? v : null; masterySave(m); renderHome(); }

// ── TODAY card ──
function masteryCard() {
  let plan = masteryPlanNow();
  // Fix today's sub-topics as soon as the day's plan is shown.
  if (plan.status === 'study') { const m = masteryLoad(), d = localDay(), before = JSON.stringify(m.days[d] || null); masteryDayRow(m, plan.subj); if (JSON.stringify(m.days[d]) !== before) { masterySave(m); plan = masteryPlanNow(m); } }
  const name = s => esc(masteryName(s));
  const path = plan.order.map(s => '<span class="mastery-chip' + (plan.passed[s] ? ' done' : s === plan.subj ? ' on' : '') + '">' + (plan.passed[s] ? '✓ ' : '') + name(s) + '</span>').join('<span class="mastery-arrow" aria-hidden="true">→</span>');
  const head = '<div class="today-head"><div><div class="section-label">TODAY › Section mastery</div><div class="today-date">' + (plan.subj ? '<b>' + name(plan.subj) + '</b> · goal ' + plan.goal + ' on ' + MASTERY.passDays + ' days in a row' : 'All sections mastered') + '</div></div></div>' +
    '<div class="mastery-path">' + path + '</div>';
  if (plan.status === 'complete') return head + '<p class="today-alldone">✓ Every section in the path is at goal. Keep your scores up with due reviews and full-length practice.</p>';
  const latest = plan.latest ? '<p class="mastery-latest">Last test: <b>' + plan.latest.scaled + '</b> (' + plan.latest.correct + '/' + plan.latest.total + ')' + (plan.previous ? ' · ' + (plan.latest.scaled > plan.previous.scaled ? '<b class="mastery-up">▲ up ' + (plan.latest.scaled - plan.previous.scaled) + '</b>' : plan.latest.scaled < plan.previous.scaled ? '<b class="mastery-down">▼ down ' + (plan.previous.scaled - plan.latest.scaled) + '</b>' : 'no change') : '') + ' · days at goal in a row: ' + plan.streak + '/' + MASTERY.passDays + '</p>' : '';
  const weak = plan.weak.length ? '<p class="muted-note">Weak content categories: ' + plan.weak.slice(0, 4).map(w => esc(w.code) + ' ' + esc(AAMC_CAT_LABEL(w.code)) + ' (' + w.pct + '%)').join(' · ') + '</p>' : '';
  const btn = (label, fn, primary = true) => '<button class="' + (primary ? 'new-quiz-btn' : 'micro-btn') + ' today-start" data-click="' + fn + '">' + label + '</button>';
  const mins = n => '<span class="today-min">~' + n + ' min</span>';
  const more = (fn, s) => (s.extra ? '<p class="muted-note">+' + s.extra + ' extra today.</p>' : '') + btn('Another set (' + s.count + ')', fn, false);
  const topicList = ts => '<ul class="mastery-subtopics">' + ts.map(t => '<li' + (t.progress >= t.need ? ' class="done"' : '') + '>' + (t.progress >= t.need ? '✓ ' : '') + esc(t.code) + ' ' + esc(AAMC_CAT_LABEL(t.code)) + ' <span class="today-count">' + t.progress + ' / ' + t.need + '</span></li>').join('') + '</ul>';
  let body = '';
  if (plan.status === 'diagnostic') {
    body = '<ol class="today-steps"><li class="today-step"><span class="today-num">1</span><div class="today-body"><div class="today-title"><b>' + name(plan.subj) + ' diagnostic</b>' + mins(Math.round(MASTERY.diagSize * MASTERY.secondsPerItem / 60)) + '</div><div class="today-detail">First day on this section: just the diagnostic, a full AAMC section in the exam’s format. ' + MASTERY.diagSize + ' timed questions (10 passages plus single questions) across all of the section’s subjects and content categories, at exam pace, so every weak and strong area shows up. It scores you on 118–132 and shows your weak content categories; study starts tomorrow.</div>' + btn('Start diagnostic', "startMasteryTest('diagnostic')") + '</div></li></ol>';
  } else if (plan.status === 'diagnostic-done') {
    body = '<p class="today-alldone">✓ Diagnostic done today: <b>' + plan.latest.scaled + '</b>. Guided study on your weak topics starts tomorrow.</p>';
  } else {
    let n = 0;
    body = '<ol class="today-steps">' + plan.steps.map(s => {
      n++;
      let title = '', detail = '', button = '', count = '', time = '';
      if (s.id === 'misses') { title = 'Review yesterday’s misses'; count = s.progress + ' / ' + s.count; detail = 'Cards and test questions you missed on ' + shortDay(s.from) + '.'; time = mins(Math.ceil((s.count - s.progress) * 0.8)); if (!s.done) button = btn('Start', 'startMasteryMisses()'); }
      if (s.id === 'flashcards') { title = 'Flashcards'; count = s.progress + ' / ' + s.count; detail = 'Learn the facts first, across the section’s disciplines, spread over today’s content categories.' + topicList(s.topics); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 0.6)); button = s.done ? more('startMasteryFlashcards(true)', s) : btn(s.progress ? 'Continue' : 'Start', 'startMasteryFlashcards()'); }
      if (s.id === 'guided') { title = 'Practice Exam cards with step-by-step lessons'; count = s.progress + ' / ' + s.count + ' cards · ' + s.lessons + ' / ' + s.lessonCount + ' lessons'; detail = 'Then use them the way the exam asks. Each card opens its lesson: step through it to the end, answer, then watch the walkthrough.' + topicList(s.topics); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 1.2 + (s.lessonCount - s.lessons) * 2)); button = s.done ? more('startMasteryGuided(true)', s) : btn(s.progress || s.lessons ? 'Continue' : 'Start', 'startMasteryGuided()'); }
      if (s.id === 'test') { title = 'End-of-day test'; detail = s.done ? 'Today: <b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + '). Tomorrow’s weak topics are updated.' : MASTERY.testSize + ' timed questions, half an AAMC section at exam pace. Did today move your score toward ' + plan.goal + '?'; time = s.done ? '' : mins(Math.round(MASTERY.testSize * MASTERY.secondsPerItem / 60)); if (!s.done) button = btn('Start test', "startMasteryTest('daily')", plan.steps.filter(x => x.id !== 'test').every(x => x.done)); }
      return '<li class="today-step' + (s.done ? ' done' : '') + '"><span class="today-num" aria-hidden="true">' + (s.done ? '✓' : n) + '</span><div class="today-body"><div class="today-title"><b>' + title + '</b>' + (count ? ' <span class="today-count">' + count + '</span>' : '') + time + '</div><div class="today-detail">' + detail + '</div>' + button + '</div></li>';
    }).join('') + '</ol>';
  }
  const mastered = plan.masteredToday ? '<p class="today-alldone">✓ ' + name(plan.subj) + ' reached goal on ' + MASTERY.passDays + ' days in a row. The next section starts tomorrow.</p>' : '';
  const controls = '<details class="mastery-settings"><summary>Path settings</summary><label>Goal <select data-change="setMasteryGoal(this.value)">' + MASTERY.goals.map(g => '<option value="' + g + '"' + (g === plan.goal ? ' selected' : '') + '>' + g + '</option>').join('') + '</select></label> <label>Cards a day <select data-change="setMasteryPerDay(this.value)">' + MASTERY.perDay.map(n => '<option value="' + n + '"' + (n === plan.perDay ? ' selected' : '') + '>' + n + ' + ' + n + '</option>').join('') + '</select></label> <label>Study this section now <select data-change="setMasterySubject(this.value)"><option value="">Next in path</option>' + MASTERY.order.map(s => '<option value="' + s + '"' + (s === plan.subj && masteryLoad().current === s ? ' selected' : '') + '>' + name(s) + '</option>').join('') + '</select></label></details>';
  return head + latest + weak + mastered + body + controls;
}
