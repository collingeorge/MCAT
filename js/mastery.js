// Section Mastery path: one MCAT section at a time, as the exam tests it: C/P first, then B/B, then P/S.
//   First: a diagnostic (a full section, scored 118–132, weak AAMC content categories shown; it can be retaken).
//   Then every day, in this order: 50 QBank flashcards → 50 guided Practice Exam cards with step-by-step lessons
//   (both spread over 5 of the section's content categories, weakest first) → 50 passage questions from the
//   AAMC-style C/P practice passages (unseen first, weakest categories first) → a 30-question quiz, half an AAMC
//   section in exam order → done for the day at goal, otherwise work on what the quiz showed was weak.
//   Reaching the goal (128 by default) on the quiz on MASTERY.passDays separate days in a row moves the path to the
//   next section, which starts with its own diagnostic.
// Only approved content is used: the AAMC QBank cards, the Practice Exam cards, the C/P diagnostic / quiz /
// practice passages (data/cp-*.js) and, for other sections until they have their own sets, the QBank cards.
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
  passageQs: 50,        // passage questions a day (about 12–13 four-question practice passages)
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
  // Saved (and cloud-synced) results reach the page as HTML text, so every number must be a real number.
  const tests = (Array.isArray(m.tests) ? m.tests : []).filter(t => t && MASTERY.order.includes(t.subj) && typeof t.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.day)
    && Number.isInteger(t.scaled) && Number.isInteger(t.correct) && Number.isInteger(t.total) && t.total > 0 && t.correct >= 0 && t.correct <= t.total
    && Number.isFinite(t.pct) && (t.kind === 'diagnostic' || t.kind === 'daily'));
  const days = m.days && typeof m.days === 'object' && !Array.isArray(m.days) ? m.days : {};
  const passed = m.passed && typeof m.passed === 'object' && !Array.isArray(m.passed) ? m.passed : {};
  const current = MASTERY.order.includes(m.current) ? m.current : null;
  const perDay = MASTERY.perDay.includes(m.perDay) ? m.perDay : MASTERY.perDay[0];
  // Daily quiz sets already taken, most recent last ({id, day}), so the next quiz picks one not seen yet.
  const usedSets = (Array.isArray(m.usedSets) ? m.usedSets : []).filter(u => u && typeof u.id === 'string' && typeof u.day === 'string').slice(-60);
  return { goal, tests, days, passed, current, perDay, usedSets };
}
// Current section: the one the student picked, else the first not yet mastered (in path order).
function masterySubject(m, today) {
  if (m.current && !(m.passed[m.current] && m.passed[m.current] < today)) return m.current;
  return MASTERY.order.find(s => !(m.passed[s] && m.passed[s] < today)) || null;
}
// Distinct test days (latest test of each day) ending at the most recent one, counted while at or above goal.
// Consecutive calendar days, ending on the latest quiz day, on which a daily quiz reached the goal. Only daily
// quizzes count (a diagnostic, or its retake, never adds to or breaks the streak); a day counts as at goal if any
// quiz that day reached it; a day with no quiz breaks the run.
function masteryStreak(tests, goal) {
  const best = new Map();
  tests.filter(t => t.kind === 'daily').forEach(t => best.set(t.day, Math.max(best.get(t.day) ?? -Infinity, t.scaled)));
  const days = [...best.keys()].sort().reverse();
  let n = 0;
  for (let i = 0; i < days.length; i++) {
    if (i > 0 && masteryDayGap(days[i], days[i - 1]) !== 1) break;
    if (best.get(days[i]) >= goal) n++; else break;
  }
  return n;
}
function masteryDayGap(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000); }
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
  // The daily plan, in the student's order: 1 the diagnostic (done, with a retake), 2 flashcards (QBank first),
  // 3 guided Practice Exam cards with walkthroughs, 4 the 30-question quiz, 5 after the quiz: done for the day at
  // goal, otherwise work on the topics and passages the quiz showed were weak. Study starts the day of the diagnostic.
  const row = m.days[today]?.subj === subj ? m.days[today] : {};
  const todayTest = tests.filter(t => t.kind === 'daily' && t.day === today).at(-1) || null;
  const lastDiag = tests.filter(t => t.kind === 'diagnostic').at(-1);
  const topics = Array.isArray(row.topics) && row.topics.length ? row.topics : masteryTopics(m, subj, today, latest);
  const flashN = m.perDay, guidedN = Number.isFinite(sizes.guided) ? Math.min(m.perDay, sizes.guided) : m.perDay;
  const tally = (key, total) => { const need = masterySplit(total, topics.length); return topics.map((code, i) => { const got = Number((row[key] || {})[code]) || 0; return { code, need: need[i], progress: Math.min(need[i], got), raw: got }; }); };
  const flashT = tally('flashT', flashN), guidedT = tally('guidedT', guidedN);
  const sum = (a, k = 'progress') => a.reduce((n, t) => n + t[k], 0);
  const lessons = Math.min(guidedN, Number(row.lessonsN) || 0);
  out.topics = topics; out.perDay = m.perDay;
  out.steps.push({ id: 'diagnostic', done: true, result: lastDiag, old: !lastDiag.version });
  out.steps.push({ id: 'flashcards', topics: flashT, count: flashN, progress: sum(flashT), extra: sum(flashT, 'raw') - sum(flashT), done: flashT.every(t => t.progress >= t.need) });
  if (guidedN > 0) out.steps.push({ id: 'guided', topics: guidedT, count: guidedN, progress: sum(guidedT), extra: sum(guidedT, 'raw') - sum(guidedT), lessons, lessonCount: guidedN,
    done: guidedT.every(t => t.progress >= t.need) && lessons >= guidedN });
  // Passage questions from the C/P practice passages; each answer counts toward the step and its category.
  const passN = Number.isFinite(sizes.passages) ? Math.min(MASTERY.passageQs, sizes.passages) : 0;
  if (passN > 0) {
    const pracT = row.pracT && typeof row.pracT === 'object' ? row.pracT : {};
    const cats = Object.entries(pracT).filter(([, v]) => Number(v) > 0).map(([code, v]) => ({ code, n: Number(v) })).sort((a, b) => b.n - a.n);
    const done = Math.min(passN, Number(row.prac) || 0);
    out.steps.push({ id: 'passages', count: passN, progress: done, extra: Math.max(0, (Number(row.prac) || 0) - passN), cats, poolDone: !!sizes.passagesPoolDone, done: done >= passN });
  }
  out.steps.push({ id: 'test', done: !!todayTest, result: todayTest });
  if (todayTest) {
    const list = MASTERY.topics[subj] || [];
    const weakQuiz = masteryWeak(todayTest).filter(w => w.pct < MASTERY.weakBelow && list.includes(w.code)).map(w => w.code).slice(0, 3);
    const atGoal = todayTest.scaled >= goal;
    out.steps.push({ id: 'followup', atGoal, weak: weakQuiz, done: atGoal, practiced: Number(row.fix) || 0, passages: passN > 0 });
  }
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
function masteryPlanNow(m = masteryLoad(), day = localDay()) {
  const subj = masterySubject(m, day);
  const pool = subj ? masteryPassagePool(subj) : [];
  return masteryPlan(m, day, { guided: subj ? masteryPracticePool(subj).length : 0, passages: pool.reduce((n, p) => n + p.questions.length, 0), passagesPoolDone: masteryPoolDone(pool) });
}
const masterySection = s => MCAT_SECTIONS.find(x => x.id === s);
const masteryName = s => { const x = masterySection(s); return x ? x.abbrev + ' · ' + x.label : String(s || ''); };
// The section's disciplines, most heavily tested first (AAMC: C/P is 30% general chemistry, 25% physics, …).
const masteryDiscs = s => Object.entries(masterySection(s)?.weights || {}).filter(([d]) => d !== 'cars').sort((a, b) => b[1] - a[1]);
// Flashcards for the section: the AAMC QBank cards only (no other deck fills a gap).
function masteryFlashPool(s) { return masteryExamPool(s); }
// Practice Exam cards: the C/P cards come from the AAMC practice exams' C/P sections.
// Practice passages for the daily passage step (data/cp-practice.js), separate from the diagnostic and quizzes.
const masteryPassagePool = s => (s === 'cp' && typeof CP_PRACTICE !== 'undefined' && Array.isArray(CP_PRACTICE) ? CP_PRACTICE : []);
const masteryPracticePool = s => (s === 'cp' ? FLQ.filter(q => /^pe\d-cp:/.test(q.src)) : []);
function masteryLoad() { return masteryNormalize(store.get(KEYS.subjectPath, {})); }
// Keeps 60 days; the card-id lists (seen, guidedIds, lessonIds, pracUsed) matter only on their own day, so earlier
// days drop them (they would otherwise make up most of the synced copy).
const MASTERY_DAY_LISTS = ['seen', 'guidedIds', 'lessonIds', 'pracUsed'];
function masterySave(m) {
  const keepFrom = localDay(new Date(Date.now() - 86400000));   // yesterday too: a session can run past midnight
  const days = Object.fromEntries(Object.entries(m.days).sort().slice(-60).map(([d, r]) => [d, d >= keepFrom || !r || typeof r !== 'object' ? r : Object.fromEntries(Object.entries(r).filter(([k]) => !MASTERY_DAY_LISTS.includes(k)))]));
  store.set(KEYS.subjectPath, { ...m, days });
}
// day: the day a session started (answers after midnight still count toward the day the session began).
function masteryDayRow(m, subj, day = localDay()) {
  if (m.days[day]?.subj !== subj) m.days[day] = { subj, misses: [], reviewed: [] };
  // Fix today's sub-topics the first time the day is touched, so they don't shift as tests come in.
  if (!Array.isArray(m.days[day].topics) || !m.days[day].topics.length) m.days[day].topics = masteryPlanNow(m, day).topics || [];
  return m.days[day];
}
function masteryCategory(q) { return (q && q.key && typeof aamcOfKey === 'function' && aamcOfKey(q.key)) || (q && q.aamc) || 'other'; }
// Called for every answered recall card: counts guided cards and remembers today's misses.
function masteryNoteAnswer(q, right) {
  const day = quiz.masteryDay || localDay(), m = masteryLoad(), subj = masterySubject(m, day);
  if (!subj) return;
  const id = q.baseId || q.id, row = masteryDayRow(m, subj, day);
  let changed = false;
  // Only the first answer to a card in a session counts: re-asked misses and "unsure" cards are practice, not
  // new cards toward the 50.
  const first = !quiz.masteryCounted || !quiz.masteryCounted.has(id);
  if (quiz.masteryCounted) quiz.masteryCounted.add(id);
  // Each card in a flashcard or Practice Exam session was picked for one of today's sub-topics.
  const topic = quiz.topicOf && quiz.topicOf[q.id];
  if (first && quiz.mastery === 'followup') { row.fixQ = (Number(row.fixQ) || 0) + 1; changed = true; }
  if (first && quiz.mastery === 'guided') { row.guidedIds = [...new Set([...(row.guidedIds || []), id])].slice(-200); changed = true; }
  if (first && topic && (quiz.mastery === 'flashcards' || quiz.mastery === 'guided')) {
    const key = quiz.mastery === 'flashcards' ? 'flashT' : 'guidedT';
    row[key] = { ...(row[key] || {}), [topic]: (Number((row[key] || {})[topic]) || 0) + 1 };
    row.seen = [...new Set([...(row.seen || []), q.id])].slice(-200); changed = true;
  }
  const plan = masteryPlanNow(m), missStep = plan.steps.find(s => s.id === 'misses');
  if (missStep && missStep.ids.includes(id) && !(row.reviewed || []).includes(id)) { row.reviewed = [...(row.reviewed || []), id]; changed = true; }
  if (!right && ['guided', 'flashcards', 'misses', 'followup', 'lessons'].includes(quiz.mastery)) { row.misses = [...new Set([...(row.misses || []), id])]; changed = true; }
  if (changed) masterySave(m);
}
// After the quiz: practice the topics the quiz showed were weak (Practice Exam cards or practice passages).
function startMasteryFollowup(kind) {
  const plan = masteryPlanNow(), f = plan.steps.find(s => s.id === 'followup');
  if (!f) return;
  const cats = f.weak.length ? f.weak : plan.topics.slice(0, 3);
  const pool = kind === 'passages' ? masteryPassagePool(plan.subj) : masteryPracticePool(plan.subj);
  if (!pool.length) { masteryNotice(kind === 'passages' ? 'No practice passages for this section yet.' : 'No Practice Exam cards for this section yet.'); return; }
  const m = masteryLoad(); masteryDayRow(m, plan.subj).fix = (Number(masteryDayRow(m, plan.subj).fix) || 0) + 1; masterySave(m);
  if (kind === 'passages') { startMasteryPassages(cats); return; }
  // Its own mode: these answers count as follow-up practice, never toward the guided step or its lessons.
  const step = { topics: cats.map(code => ({ code, need: 5, progress: 0 })), count: cats.length * 5 };
  masteryBegin(plan, step, pool, q => q.aamc, 'Practice Exam cards · weak spots from the quiz', 'followup', true);
}
// Called when a step-by-step lesson is played to its last step during today's Practice Exam cards.
// Each card's lesson counts once a day, however often it is replayed or the card is re-asked.
function masteryNoteLesson(q) {
  const day = quiz.masteryDay || localDay(), m = masteryLoad(), subj = masterySubject(m, day);
  if (!subj || (quiz.mastery !== 'guided' && quiz.mastery !== 'lessons')) return;
  const row = masteryDayRow(m, subj, day), id = q.baseId || q.id;
  if ((row.lessonIds || []).includes(id)) return;
  row.lessonIds = [...(row.lessonIds || []), id].slice(-200);
  row.lessonsN = (Number(row.lessonsN) || 0) + 1;
  masterySave(m);
}
// A short message at the top of the page when a TODAY button has nothing to start.
function masteryNotice(msg) {
  const el = typeof document !== 'undefined' && document.getElementById && document.getElementById('page-notice');
  if (el) { el.textContent = msg; el.hidden = false; if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0); }
}
// Builds today's set for one step: for each sub-topic, the cards still needed, from that sub-topic first, then
// from the rest of the subject (the pool may be small), repeating cards only if the subject runs out.
function masteryTopicSet(step, pool, catOf, pick) {
  const list = [], topicOf = {};
  for (const t of step.topics) {
    const need = t.need - t.progress;
    if (need <= 0) continue;
    const used = new Set(list.map(q => q.id));
    // pool may be [preferred, fallback]: the preferred pool's cards in this topic come first.
    const pools = Array.isArray(pool[0]) ? pool : [pool], all = pools.flat();
    let got = [];
    for (const pl of pools) if (got.length < need) got = got.concat(pick(pl.filter(q => catOf(q) === t.code && !used.has(q.id) && !got.includes(q)), need - got.length));
    for (const pl of pools) if (got.length < need) got = got.concat(pick(pl.filter(q => catOf(q) !== t.code && !used.has(q.id) && !got.includes(q)), need - got.length));
    while (got.length < need && all.length) got.push(all[(list.length + got.length) % all.length]);
    got.forEach(q => { topicOf[q.id] = topicOf[q.id] || t.code; list.push(q); });
  }
  return { list, topicOf };
}
// more: another full set from today's sub-topics after the day's set is done, cards not seen today first.
function masteryBegin(plan, step, pool, catOf, label, mode, more) {
  if (!plan.subj || !step) { masteryNotice('This step is not available right now.'); return; }
  if (step.done && !more) { masteryNotice('This step is done for today. Choose “Another set” for more.'); return; }
  const m = masteryLoad(), row = masteryDayRow(m, plan.subj); masterySave(m);
  if (more) {
    const seen = new Set(row.seen || []), nested = Array.isArray(pool[0]);
    const fresh = nested ? pool.map(pl => pl.filter(q => !seen.has(q.id))) : pool.filter(q => !seen.has(q.id));
    step = { ...step, topics: step.topics.map(t => ({ ...t, progress: 0 })) };
    if ((nested ? fresh.flat() : fresh).length >= step.count) pool = fresh;
    label += ' · another set';
  }
  const { list, topicOf } = masteryTopicSet(step, pool, catOf, pickQuestions);
  if (!list.length) { masteryNotice('Nothing left to practice in this step today. Choose “Another set” for more.'); return; }
  masteryStartQuiz(list, masterySection(plan.subj).abbrev + ' · ' + label, mode);
  quiz.topicOf = topicOf;
}
function masteryStartQuiz(list, label, mode) {
  beginQuiz(list, label, { mastery: mode });
  quiz.masteryDay = localDay(); quiz.masteryCounted = new Set();
}
// Practice Exam cards for today's sub-topics; each opens its step-by-step lesson. When every card is done but
// some lessons are not, the step continues with today's cards whose lesson wasn't finished.
function startMasteryGuided(more) {
  const plan = masteryPlanNow();
  const pool = masteryPracticePool(plan.subj);
  if (!pool.length) { startMasteryFlashcards(more); return; }
  const step = plan.steps.find(s => s.id === 'guided');
  if (!more && step && !step.done && step.topics.every(t => t.progress >= t.need) && step.lessons < step.lessonCount) {
    const m = masteryLoad(), row = masteryDayRow(m, plan.subj), done = new Set(row.lessonIds || []);
    const byId = new Map(pool.map(q => [q.id, q])), need = step.lessonCount - step.lessons;
    let list = (row.guidedIds || []).filter(id => !done.has(id)).map(id => byId.get(id)).filter(Boolean);
    // Older saved days have no card list: any card from today's topics whose lesson isn't done.
    if (list.length < need) { const topics = new Set(step.topics.map(t => t.code)), have = new Set(list.map(q => q.id)); list = list.concat(pickQuestions(pool.filter(q => topics.has(q.aamc) && !done.has(q.id) && !have.has(q.id)), need - list.length)); }
    list = list.slice(0, need);
    if (!list.length) { masteryNotice('Every card today already has its lesson. Choose “Another set” for more.'); return; }
    masteryStartQuiz(list, masterySection(plan.subj).abbrev + ' · Practice Exam cards · finish the lessons', 'lessons');
    return;
  }
  masteryBegin(plan, step, pool, q => q.aamc, 'Practice Exam cards', 'guided', more);
}
function startMasteryMisses() {
  const plan = masteryPlanNow(), step = plan.steps.find(s => s.id === 'misses');
  const qs = (step?.ids || []).map(id => lookupQ(id)).filter(Boolean);
  if (qs.length) masteryStartQuiz(shuffled(qs), masterySection(plan.subj).abbrev + ' · yesterday’s misses', 'misses');
}
// Regular flashcards for today's sub-topics.
function startMasteryFlashcards(more) {
  const plan = masteryPlanNow();
  // QBank cards only, in today's content categories (weakest first).
  masteryBegin(plan, plan.steps.find(s => s.id === 'flashcards'), masteryFlashPool(plan.subj), masteryCategory, 'flashcards', 'flashcards', more);
}
// Every practice passage attempted at least once (then the step repeats the ones answered least well).
function masteryPoolDone(pool) {
  if (!pool.length) return false;
  const stats = store.get(KEYS.passages, {});
  return pool.every(p => stats[p.id]?.attempts > 0);
}
// Ranks the practice passages: unseen first (or, once all were seen, the lowest last score first), then the
// weakest content categories, then not used today, then practiced longest ago. kind 'step' is today's passage
// step; 'followup' (after the quiz) aims at the quiz's weak categories and prefers passages not used today.
function masteryPassageOrder(pool, rank, usedToday, followup) {
  const stats = store.get(KEYS.passages, {}), done = masteryPoolDone(pool);
  const catRank = p => Math.min(...[...(p.cats || []), ...p.questions.map(q => q.cat)].filter(Boolean).map(c => (rank.has(c) ? rank.get(c) : rank.size + 5)), 99);
  const key = p => {
    const st = stats[p.id] || {}, used = usedToday.has(p.id) ? 1 : 0;
    const seen = done ? (Number.isFinite(st.last) ? st.last : 0) : (st.attempts ? 1000 : 0);
    // Once every passage was seen, a passage already used today goes last, before its low score counts.
    return followup ? [used, catRank(p), seen, st.lastAt || 0] : done ? [used, seen, catRank(p), st.lastAt || 0] : [seen, used, catRank(p), st.lastAt || 0];
  };
  return pool.slice().sort((a, b) => { const x = key(a), y = key(b); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i]; return pool.indexOf(a) - pool.indexOf(b); });
}
// cats: the categories to aim at (after the quiz: its weak ones). Without cats: today's passage step, aimed at
// the weakest categories of the latest test, then today's topics.
function startMasteryPassages(cats) {
  const plan = masteryPlanNow(), pool = masteryPassagePool(plan.subj);
  if (!pool.length) return;
  const followup = Array.isArray(cats) && cats.length > 0;
  const ranked = followup ? cats : [...masteryWeak(plan.latest).map(w => w.code), ...(plan.topics || [])];
  const rank = new Map(); ranked.forEach(c => { if (!rank.has(c)) rank.set(c, rank.size); });
  const m = masteryLoad(), row = masteryDayRow(m, plan.subj);
  const next = masteryPassageOrder(pool, rank, new Set(row.pracUsed || []), followup)[0];
  row.pracUsed = [...new Set([...(row.pracUsed || []), next.id])];
  masterySave(m);
  startPassage(next, { masteryPractice: followup ? 'followup' : 'step', cats: followup ? cats : null });
  pq.masteryDay = localDay();
}
// Counts each answered practice-passage question: toward today's passage step and its AAMC category, or (after
// the quiz) toward the follow-up practice.
function masteryNotePractice(q, passage, kind) {
  const day = (typeof pq !== 'undefined' && pq.masteryDay) || localDay(), m = masteryLoad(), subj = masterySubject(m, day);
  if (!subj) return;
  const row = masteryDayRow(m, subj, day);
  if (kind === 'followup') row.fixQ = (Number(row.fixQ) || 0) + 1;
  else {
    const cat = (q && q.cat) || (passage && passage.cats && passage.cats[0]) || 'other';
    row.prac = (Number(row.prac) || 0) + 1;
    row.pracT = { ...(row.pracT || {}), [cat]: (Number((row.pracT || {})[cat]) || 0) + 1 };
  }
  masterySave(m);
}
// After a practice passage: the next one in the same kind of practice.
function masteryNextPractice() {
  if (pq.masteryPractice === 'followup') startMasteryPassages(pq.masteryCats && pq.masteryCats.length ? pq.masteryCats : (masteryPlanNow().topics || []).slice(0, 3));
  else startMasteryPassages();
}
// Diagnostic / end-of-day test: 2 passages from the section's main disciplines (unattempted first) + discrete
// questions spread over its disciplines in the exam's proportions, from the
// question bank (not the guided cards, so the score is not a memory of today's cards), timed, feedback at the end.
function startMasteryTest(kind) {
  const plan = masteryPlanNow();
  if (!plan.subj) return;
  const subj = plan.subj;
  // C/P: the Chem/Phys Diagnostic (data/cp-diagnostic.js) and the daily half-section pool (data/cp-pool.js):
  // original passages written to the AAMC C/P blueprint, in the exam's order of passages and stand-alones.
  const set = subj === 'cp' ? (kind === 'diagnostic' ? (typeof CP_DIAG !== 'undefined' ? CP_DIAG : null) : masteryNextSet(masteryLoad())) : null;
  if (set) { masteryRunSet(subj, kind, set); return; }
  // Other sections, for now: the Practice Exam cards: questions modeled one-for-one on the AAMC practice exams,
  // with their structures, answer-choice drawings and graphs, split over the section's disciplines by AAMC's
  // weights, cards not yet seen first. (Sections without such cards fall back to the question bank.)
  const full = kind === 'diagnostic', size = full ? MASTERY.diagSize : MASTERY.testSize, discs = masteryDiscs(subj);
  const pool = masteryPracticePool(subj), passages = [];
  const discOf = q => (q.disc === 'biology' ? 'biology' : q.disc);
  const picked = [], share = masteryApportion(discs, size);
  if (pool.length) {
    discs.forEach(([d], i) => picked.push(...pickQuestions(pool.filter(q => discOf(q) === d), share[i])));
    if (picked.length < size) picked.push(...pickQuestions(pool.filter(q => !picked.includes(q)), size - picked.length));
  } else {
    const exam = masteryExamPool(subj);
    discs.forEach(([d], i) => picked.push(...pickQuestions(exam.filter(q => disciplineOfRecall(q) === d), share[i])));
  }
  picked.splice(size);
  const items = shuffled(picked).map(q => ({ view: makeView(q), passage: null }));  if (!items.length) return;
  const firstExposures = Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)]));
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures, completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily', day: localDay() },
    p: { id: 'mastery_' + subj, title: masteryName(subj) + (kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: items.length * MASTERY.secondsPerItem * 1000, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
// The next daily quiz: a half-section not taken yet, else the one taken longest ago.
function masteryNextSet(m) {
  const pool = typeof CP_POOL !== 'undefined' ? CP_POOL : [];
  if (!pool.length) return null;
  const last = {}; (m.usedSets || []).forEach(u => { last[u.id] = u.day; });
  return pool.slice().sort((a, b) => (last[a.id] || '').localeCompare(last[b.id] || '') || pool.indexOf(a) - pool.indexOf(b))[0];
}
// Lays out a passage set in its exam order: a passage id brings all its questions, a number brings that many
// stand-alones.
function masterySetItems(set) {
  const byId = new Map(set.passages.map(p => [p.id, p])), items = [];
  let sa = 0;
  for (const step of set.order) {
    if (typeof step === 'number') { set.standalones.slice(sa, sa += step).forEach(q => items.push({ view: makeView(q), passage: null })); continue; }
    const p = byId.get(step); if (p) p.questions.forEach(q => items.push({ view: makeView(q), passage: p }));
  }
  return items;
}
function masteryRunSet(subj, kind, set) {
  const items = masterySetItems(set);
  if (!items.length) return;
  const passages = set.passages;
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures: Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)])), completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily', setId: set.id, day: localDay() },
    p: { id: 'mastery_' + subj, title: set.title },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: (set.timeMin ? set.timeMin * 60 : items.length * MASTERY.secondsPerItem) * 1000, errPending: null });
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
// Called by finishSubjectMini for a mastery test: scores it, records weak topics, decides on moving on.
function masteryFinishTest(mini, results) {
  const correct = results.filter(r => r.right).length, total = results.length;
  const cats = {};
  const parts = { passage: { c: 0, t: 0 }, single: { c: 0, t: 0 } }, skills = {};
  const tally = (o, k, right) => { o[k] = o[k] || { c: 0, t: 0 }; o[k].t++; if (right) o[k].c++; };
  // Every question counts toward its content category (its own cat, else its passage's), so the weak topics
  // come from the whole test (passages are most of it), not just the single questions.
  results.forEach((r, i) => {
    const p = mini.items[i].passage;
    tally(cats, r.view.q.cat || (p ? ((p.cats && p.cats[0]) || 'other') : masteryCategory(r.view.q)), r.right);
    tally(parts, p ? 'passage' : 'single', r.right);
    if (r.view.q.skill) tally(skills, r.view.q.skill, r.right);
  });
  // Tomorrow's "misses" step reviews missed bank questions; test-only questions are reviewed on the results page.
  const missIds = results.filter((r, i) => !r.right && !mini.items[i].passage).map(r => r.view.q.baseId || r.view.q.id).filter(id => id && typeof lookupQ === 'function' && lookupQ(id));
  const pctRight = total ? 100 * correct / total : 0;
  // The day the test started: a quiz finished after midnight belongs to the day it was taken.
  const test = { subj: mini.subj, day: mini.day || localDay(), t: Date.now(), kind: mini.mastery, correct, total, pct: Math.round(pctRight), scaled: rawToScaled(pctRight), cats, parts, skills, missIds, version: mini.setId || 'cards' };
  const before = masteryLoad();
  const prevTest = before.tests.filter(t => t.subj === test.subj).at(-1) || null;
  const after = masteryApplyTest(before, test);
  if (mini.setId && mini.mastery === 'daily') after.usedSets = [...(after.usedSets || []), { id: mini.setId, day: test.day }].slice(-60);
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
    : test.kind === 'diagnostic' && prev ? '<p>Diagnostic retaken. Your daily plan now aims at the weak topics below.</p>'
    : test.kind === 'diagnostic' ? '<p>Your daily plan now aims at the weak topics below: flashcards, Practice Exam cards and passage questions, then the quiz.</p>'
    : test.scaled >= goal ? '<p>At goal today. One more day at ' + goal + '+ moves you to the next section.</p>' : '<p>Next: review the missed questions below, then practice the weakest topics from TODAY. Tomorrow: 50 flashcards, 50 Practice Exam cards and 50 passage questions on the weakest content categories, then another quiz.</p>';
  const rows = weak.map(w => '<tr' + (w.pct < MASTERY.weakBelow ? ' class="mastery-weak"' : '') + '><td>' + esc(w.code) + '</td><td>' + esc(AAMC_CAT_LABEL(w.code)) + '</td><td>' + w.c + '/' + w.t + '</td><td>' + w.pct + '%</td></tr>').join('');
  const part = test.parts || (test.cats.passage ? { passage: test.cats.passage } : {});
  const SKILL = { 'SIRS 1': 'Knowledge of scientific concepts', 'SIRS 2': 'Scientific reasoning and problem-solving', 'SIRS 3': 'Reasoning about research design', 'SIRS 4': 'Data-based and statistical reasoning' };
  const skillRows = Object.entries(test.skills || {}).sort().map(([k, v]) => '<tr><td>' + esc(k.replace('SIRS ', 'Skill ')) + '</td><td>' + esc(SKILL[k] || k) + '</td><td>' + v.c + '/' + v.t + '</td><td>' + Math.round(100 * v.c / v.t) + '%</td></tr>').join('');
  const pass = (part.passage ? '<p class="muted-note">Passage questions: ' + part.passage.c + '/' + part.passage.t + (part.single ? ' · single questions: ' + part.single.c + '/' + part.single.t : '') + '.</p>' : '') +
    (skillRows ? '<div class="section-label">Scientific skills (data-based passages)</div><table class="data-table mastery-topics"><thead><tr><th>Skill</th><th></th><th>Right</th><th>%</th></tr></thead><tbody>' + skillRows + '</tbody></table>' : '');
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
  // Results saved before the Chem/Phys Diagnostic existed carry no version: label them as the old diagnostic.
  const oldDiag = t => t && t.kind === 'diagnostic' && !t.version;
  const latest = plan.latest ? '<p class="mastery-latest">Last test: <b>' + plan.latest.scaled + '</b> (' + plan.latest.correct + '/' + plan.latest.total + ')' + (oldDiag(plan.latest) ? ' · <b>old diagnostic version</b>: retake the new one below for a fresh start' : '') + (plan.previous ? ' · ' + (plan.latest.scaled > plan.previous.scaled ? '<b class="mastery-up">▲ up ' + (plan.latest.scaled - plan.previous.scaled) + '</b>' : plan.latest.scaled < plan.previous.scaled ? '<b class="mastery-down">▼ down ' + (plan.previous.scaled - plan.latest.scaled) + '</b>' : 'no change') : '') + ' · days at goal in a row: ' + plan.streak + '/' + MASTERY.passDays + '</p>' : '';
  const weak = plan.weak.length ? '<p class="muted-note">Weak content categories: ' + plan.weak.slice(0, 4).map(w => esc(w.code) + ' ' + esc(AAMC_CAT_LABEL(w.code)) + ' (' + w.pct + '%)').join(' · ') + '</p>' : '';
  const btn = (label, fn, primary = true) => '<button class="' + (primary ? 'new-quiz-btn' : 'micro-btn') + ' today-start" data-click="' + fn + '">' + label + '</button>';
  const mins = n => '<span class="today-min">~' + n + ' min</span>';
  const more = (fn, s) => (s.extra ? '<p class="muted-note">+' + s.extra + ' extra today.</p>' : '') + btn('Another set (' + s.count + ')', fn, false);
  const topicList = ts => '<ul class="mastery-subtopics">' + ts.map(t => '<li' + (t.progress >= t.need ? ' class="done"' : '') + '>' + (t.progress >= t.need ? '✓ ' : '') + esc(t.code) + ' ' + esc(AAMC_CAT_LABEL(t.code)) + ' <span class="today-count">' + t.progress + ' / ' + t.need + '</span></li>').join('') + '</ul>';
  let body = '';
  if (plan.status === 'diagnostic') {
    body = '<ol class="today-steps"><li class="today-step"><span class="today-num">1</span><div class="today-body"><div class="today-title"><b>' + name(plan.subj) + ' diagnostic</b>' + mins(Math.round(MASTERY.diagSize * MASTERY.secondsPerItem / 60)) + '</div><div class="today-detail">First day on this section: just the diagnostic, a full AAMC section in the exam’s format. ' + MASTERY.diagSize + ' timed questions (10 passages plus single questions) across all of the section’s subjects and content categories, at exam pace, so every weak and strong area shows up. It scores you on 118–132 and shows your weak content categories; then today’s study starts right away.</div>' + btn('Start diagnostic', "startMasteryTest('diagnostic')") + '</div></li></ol>';
  } else {
    let n = 0;
    body = '<ol class="today-steps">' + plan.steps.map(s => {
      n++;
      let title = '', detail = '', button = '', count = '', time = '';
      if (s.id === 'diagnostic') { title = 'Diagnostic'; count = '<b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + ') · ' + shortDay(s.result.day); detail = (s.old ? '<b>Old diagnostic version.</b> Retake the new ' + MASTERY.diagSize + '-question diagnostic for a fresh start. ' : 'Done. ') + 'Retaking it runs the full section again; your newest result sets the weak topics.'; button = btn('Retake diagnostic', "startMasteryTest('diagnostic')", s.old); }
      if (s.id === 'flashcards') { title = 'Flashcards'; count = s.progress + ' / ' + s.count; detail = 'AAMC QBank cards only, weakest topics first, spread over today’s content categories.' + topicList(s.topics); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 0.6)); button = s.done ? more('startMasteryFlashcards(true)', s) : btn(s.progress ? 'Continue' : 'Start', 'startMasteryFlashcards()'); }
      if (s.id === 'guided') { title = 'Guided Practice Exam cards with walkthroughs'; count = s.progress + ' / ' + s.count + ' cards · ' + s.lessons + ' / ' + s.lessonCount + ' lessons'; detail = 'Weakest topics first. Each card opens its step-by-step lesson: step through it, answer, then watch the walkthrough.' + topicList(s.topics); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 1.2 + (s.lessonCount - s.lessons) * 2)); button = s.done ? more('startMasteryGuided(true)', s) : btn(s.progress || s.lessons ? 'Continue' : 'Start', 'startMasteryGuided()'); }
      if (s.id === 'passages') {
        title = 'Passage questions'; count = s.progress + ' / ' + s.count;
        const byCat = s.cats.length ? '<ul class="mastery-subtopics">' + s.cats.map(c => '<li>' + esc(c.code) + ' ' + esc(AAMC_CAT_LABEL(c.code)) + ' <span class="today-count">' + c.n + '</span></li>').join('') + '</ul>' : '';
        detail = 'AAMC-style Chem/Phys practice passages, one at a time with feedback after each question: passages you haven’t seen first, weakest content categories first (about ' + Math.ceil(s.count / 4) + ' passages).' + (s.poolDone ? ' <b>You have completed every practice passage once</b>, so the step now repeats the ones you answered least well.' : '') + byCat;
        time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 1.6));
        button = s.done ? (s.extra ? '<p class="muted-note">+' + s.extra + ' extra today.</p>' : '') + btn('Another passage', 'startMasteryPassages()', false) : btn(s.progress ? 'Continue' : 'Start', 'startMasteryPassages()');
      }
      if (s.id === 'followup') {
        const ws = s.weak.map(c => esc(c) + ' ' + esc(AAMC_CAT_LABEL(c))).join(' · ');
        if (s.atGoal) { title = 'Done for today'; detail = 'You reached ' + plan.goal + ' on today’s quiz. Anything more is optional.' + (ws ? ' Weakest on the quiz: ' + ws + '.' : ''); button = ws ? btn('Optional: practice the weak spots', 'startMasteryFollowup(\'guided\')', false) : ''; }
        else { title = 'Work on what you missed'; count = s.practiced ? s.practiced + ' done' : ''; detail = 'Today’s quiz was below ' + plan.goal + '. Review the missed questions on the quiz results, then practice the weakest topics' + (ws ? ': ' + ws : '') + '.'; button = btn('Practice Exam cards on these topics', 'startMasteryFollowup(\'guided\')') + (s.passages ? ' ' + btn('Practice passages on these topics', 'startMasteryFollowup(\'passages\')', false) : ''); }
      }
      if (s.id === 'test') { title = '30-question quiz'; detail = s.done ? 'Today: <b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + '). Tomorrow’s weak topics are updated.' : MASTERY.testSize + ' exam-style questions (passages and single questions) at exam pace, to see your progress toward ' + plan.goal + '.'; time = s.done ? '' : mins(Math.round(MASTERY.testSize * MASTERY.secondsPerItem / 60)); if (!s.done) button = btn('Start quiz', "startMasteryTest('daily')", plan.steps.filter(x => x.id !== 'test' && x.id !== 'followup').every(x => x.done)); }
      return '<li class="today-step' + (s.done ? ' done' : '') + '"><span class="today-num" aria-hidden="true">' + (s.done ? '✓' : n) + '</span><div class="today-body"><div class="today-title"><b>' + title + '</b>' + (count ? ' <span class="today-count">' + count + '</span>' : '') + time + '</div><div class="today-detail">' + detail + '</div>' + button + '</div></li>';
    }).join('') + '</ol>';
  }
  const mastered = plan.masteredToday ? '<p class="today-alldone">✓ ' + name(plan.subj) + ' reached goal on ' + MASTERY.passDays + ' days in a row. The next section starts tomorrow.</p>' : '';
  const controls = '<details class="mastery-settings"><summary>Path settings</summary><label>Goal <select data-change="setMasteryGoal(this.value)">' + MASTERY.goals.map(g => '<option value="' + g + '"' + (g === plan.goal ? ' selected' : '') + '>' + g + '</option>').join('') + '</select></label> <label>Cards a day <select data-change="setMasteryPerDay(this.value)">' + MASTERY.perDay.map(n => '<option value="' + n + '"' + (n === plan.perDay ? ' selected' : '') + '>' + n + ' + ' + n + '</option>').join('') + '</select></label> <label>Study this section now <select data-change="setMasterySubject(this.value)"><option value="">Next in path</option>' + MASTERY.order.map(s => '<option value="' + s + '"' + (s === plan.subj && masteryLoad().current === s ? ' selected' : '') + '>' + name(s) + '</option>').join('') + '</select></label></details>';
  return head + latest + weak + mastered + body + controls;
}
