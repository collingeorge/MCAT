// Section Mastery path rules (one MCAT section at a time, C/P first): diagnostic first (and nothing else that day), then daily misses → 50 flashcards →
// 50 Practice Exam cards with lessons, split 100% over the 10 C/P content categories by the AAMC blueprint (weak categories change which cards, never how many) → end-of-day test; another set when done early; goal (128 or 129) on 2 separate days in a row moves to the next
// subject, which starts with its own diagnostic. Test results, misses and weak topics carry into the next day.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const src = fs.readFileSync(root + '/js/mastery.js', 'utf8');
const ctx = vm.createContext({ Object, Array, Map, Set, Math, Number, JSON, String });
vm.runInContext(src.slice(0, src.indexOf('// ── Browser side')), ctx);
const plan = (m, day, sizes = {}) => JSON.parse(JSON.stringify(vm.runInContext('masteryPlan(m, d, z)', Object.assign(ctx, { m, d: day, z: sizes }))));
const apply = (m, t) => JSON.parse(JSON.stringify(vm.runInContext('masteryApplyTest(m, t)', Object.assign(ctx, { m, t }))));
const test = (subj, day, kind, scaled, extra = {}) => ({ subj, day, t: 0, kind, correct: 30, total: 45, pct: 70, scaled, cats: { '5A': { c: 2, t: 9 }, '5E': { c: 8, t: 9 }, '4E': { c: 5, t: 9 }, passage: { c: 8, t: 12 } }, missIds: ['q1', 'q2'], ...extra });
const ids = p => p.steps.map(s => s.id);
// The AAMC split re-derived here from the weights: largest remainder, a tie to the higher weight.
const CPW = Object.entries(JSON.parse(vm.runInContext('JSON.stringify(MASTERY.blueprint.cp.cats)', ctx))).sort((a, b) => b[1] - a[1]);
const lr = (n, w = CPW) => { const tot = w.reduce((t, [, x]) => t + x, 0), out = w.map(([, x]) => Math.floor(n * x / tot)), rem = w.map(([, x], i) => n * x - out[i] * tot);
  w.map((_, i) => i).sort((i, j) => rem[j] - rem[i] || w[j][1] - w[i][1] || i - j).slice(0, n - out.reduce((a, b) => a + b, 0)).forEach(i => out[i]++);
  return Object.fromEntries(w.map(([c], i) => [c, out[i]])); };

// Day 1: diagnostic only, on the first subject (General Chemistry).
let m = {};
let p = plan(m, '2026-11-15');
assert.equal(p.subj, 'cp'); assert.equal(p.status, 'diagnostic'); assert.deepEqual(ids(p), ['diagnostic']); assert.equal(p.goal, 128);
// After the diagnostic, study starts the same day: 1 diagnostic (done, with a retake), 2 flashcards, 3 guided
// Practice Exam cards, 4 the 30-question quiz. Weak topics come from it (below 84%), weakest first.
m = apply(m, test('cp', '2026-11-15', 'diagnostic', 122));
p = plan(m, '2026-11-15');
assert.equal(p.status, 'study'); assert.deepEqual(ids(p), ['diagnostic', 'flashcards', 'guided', 'test']);
assert(p.steps[0].done && p.steps[0].old, 'a diagnostic saved without a version is the old one');
assert.deepEqual(p.weak.map(w => w.code), ['5A', '4E'], 'weak topics below 84%, weakest first; passage tally excluded');
// Day 2: the same steps, over all 10 C/P categories exactly by the AAMC blueprint (50: 5D 12, 5E 8, 4E 7, 5A 5,
// 4D 4, 4C 4, 4B 3, 5B 3, 4A 2, 5C 2). The 2 weakest (5A 22%, 4E 56%) are marked weak; their counts don't change.
p = plan(m, '2026-11-16');
assert.deepEqual(ids(p), ['diagnostic', 'flashcards', 'guided', 'test']);
assert.equal(p.split, 'exact'); assert.deepEqual(p.weakT, ['5A', '4E']);
assert.deepEqual(p.topics, ['5D', '5E', '4E', '5A', '4D', '4C', '4B', '5B', '4A', '5C'], 'all 10 by AAMC weight, heaviest first');
const needs = s => Object.fromEntries(s.topics.map(t => [t.code, t.need]));
assert.deepEqual(lr(50), { '5D': 12, '5E': 8, '4E': 7, '5A': 5, '4D': 4, '4C': 4, '4B': 3, '5B': 3, '4A': 2, '5C': 2 }, 'the 50 split derived from the weights');
assert.deepEqual(needs(p.steps[1]), lr(50)); assert.equal(p.steps[1].count, 50);
assert.deepEqual(p.steps[1].topics.filter(t => t.weak).map(t => t.code + '+' + t.extra), ['4E+0', '5A+0'], 'weak: marked, 0 extra');
assert(p.steps[1].topics.every(t => t.extra === 0 && t.need === t.base), '0 extra on every category');
assert.equal(p.steps[2].count, 50); assert.equal(p.steps[2].lessonCount, 50); assert.deepEqual(needs(p.steps[2]), needs(p.steps[1]));
// A smaller daily size (30 or 20) splits the same way; anything else falls back to 50.
for (const n of [30, 20]) { const t = plan({ ...m, perDay: n }, '2026-11-16').steps[1];
  assert.equal(t.count, n); assert.deepEqual(needs(t), lr(n), n + ' by weight'); }
assert.equal(plan({ ...m, perDay: 7 }, '2026-11-16').steps[1].count, 50);
// A subject with few Practice Exam cards caps that step at what it has.
assert.equal(plan(m, '2026-11-16', { guided: 5 }).steps[2].count, 5);
assert.equal(plan(m, '2026-11-16', { guided: 12 }).steps[2].topics.reduce((n, t) => n + t.need, 0), 12);
// A day row saved before the exact split (5 sub-topics and no split marker) plans the exact split today, not
// tomorrow: the answers it already counted (flashT, guidedT, by category) carry over, a category already past its
// new count is simply done (never negative), and the removed passage step's fields are ignored.
const all10 = { '5A': 10, '4E': 10, '4B': 10, '4C': 10, '4D': 10 };
m.days['2026-11-16'] = { subj: 'cp', topics: ['5A', '4E', '4B', '4C', '4D'], flashT: { ...all10 }, guidedT: { ...all10, '4D': 9 }, lessonsN: 50, reviewed: ['q1', 'q2'], misses: ['g7'],
  prac: 12, pracT: { '5D': 12 }, pracD: { physics: 3 }, pracS: { 'SIRS 1': 2 }, pracX: { D: 1 }, pracUsed: ['p_cpx1_1'] };
p = plan(m, '2026-11-16', { guided: 354, passages: 144 });
assert.equal(p.split, 'exact'); assert.deepEqual(p.topics, ['5D', '5E', '4E', '5A', '4D', '4C', '4B', '5B', '4A', '5C']);
assert.deepEqual(ids(p), ['diagnostic', 'flashcards', 'guided', 'test'], 'exactly 3 daily steps; no passage step whatever the pool');
{ const fl = p.steps.find(s => s.id === 'flashcards'), gd = p.steps.find(s => s.id === 'guided');
  assert.deepEqual(needs(fl), lr(50)); assert.deepEqual(needs(gd), lr(50));
  const prog = st => Object.fromEntries(st.topics.map(t => [t.code, t.progress]));
  assert.deepEqual(prog(fl), { '5D': 0, '5E': 0, '4E': 7, '5A': 5, '4D': 4, '4C': 4, '4B': 3, '5B': 0, '4A': 0, '5C': 0 }, 'counted answers carry over, capped at the new count');
  assert.equal(fl.progress, 23); assert.equal(fl.extra, 27, 'answers past a category\'s new count show as extra'); assert(!fl.done && !gd.done); }
m.days['2026-11-16'].flashT = { ...lr(50) }; m.days['2026-11-16'].guidedT = { ...lr(50), '4D': 3 };
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'flashcards').done && !p.steps.find(s => s.id === 'guided').done, 'one Practice Exam card short in 4D');
m.days['2026-11-16'].guidedT['4C'] = 20;
p = plan(m, '2026-11-16');
assert(!p.steps.find(s => s.id === 'guided').done, 'extra cards in one category do not count for another');
assert.equal(p.steps.find(s => s.id === 'guided').extra, 16, 'cards beyond the set show as extra');
m.days['2026-11-16'].guidedT['4D'] = 4;
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'guided').done && !p.steps.find(s => s.id === 'test').done);
m.days['2026-11-16'].lessonsN = 49;
assert(!plan(m, '2026-11-16').steps.find(s => s.id === 'guided').done, 'every card needs its lesson');
m.days['2026-11-16'].lessonsN = 50;
// A row saved with split 'blueprint' (+20% on its two weak categories) is exact today too; its weak marks stay.
{ const mb = { ...m, days: { '2026-11-16': { subj: 'cp', topics: ['4B', '5C', '5D'], split: 'blueprint', weakT: ['4B', '5C'], flashT: { '4B': 8 } } } };
  const pb = plan(mb, '2026-11-16'), fl = pb.steps.find(s => s.id === 'flashcards');
  assert.equal(pb.split, 'exact'); assert.deepEqual(pb.weakT, ['4B', '5C'], 'saved weak marks kept');
  assert.deepEqual(needs(fl), lr(50), 'no weak bonus'); assert.equal(fl.topics.find(t => t.code === '4B').progress, 3, '4B: 8 counted, done at 3');
  assert.deepEqual(fl.topics.filter(t => t.weak).map(t => t.code), ['4B', '5C']); }
// Quiz at goal: the follow-up says done for the day; one day isn't enough to move on.
m = apply(m, test('cp', '2026-11-16', 'daily', 128, { missIds: ['q9'] }));
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'test').done);
assert.deepEqual(ids(p), ['diagnostic', 'flashcards', 'guided', 'test', 'followup']);
assert(p.steps.at(-1).atGoal && p.steps.at(-1).done, 'at goal: done for the day');
assert.deepEqual(p.steps.at(-1).weak, ['5A', '4E'], 'still lists the quiz\'s weak topics for optional practice');
{ const below = plan(apply(m, test('cp', '2026-11-16', 'daily', 124)), '2026-11-16').steps.at(-1);
  assert(!below.atGoal && !below.done, 'below goal: work on what you missed'); } assert.equal(p.streak, 1); assert.equal(p.subj, 'cp'); assert(!m.passed.cp);
assert.equal(p.latest.scaled, 128); assert.equal(p.previous.scaled, 122, 'compared with the last test');
// Day 3: the exact split; the weak categories stay.
p = plan(m, '2026-11-17');
assert.equal(p.split, 'exact'); assert.deepEqual(p.weakT, ['5A', '4E']); assert.equal(p.topics.length, 10);
assert.deepEqual(needs(p.steps[1]), lr(50), 'weak categories: still the AAMC counts');
{ const none = plan({ ...m, tests: m.tests.map(t => ({ ...t, cats: {} })) }, '2026-11-17');
  assert.deepEqual(none.weakT, [], 'no weak categories'); assert.deepEqual(needs(none.steps[1]), lr(50), 'no weak categories: the same 50 by weight'); }
// Sections without a blueprint (B/B, P/S for now) keep 5 categories a day: the 2 weakest, then the others not
// studied longest, 10 cards each.
{ const mb = apply({ current: 'bb' }, test('bb', '2026-11-15', 'diagnostic', 122, { cats: { '1A': { c: 2, t: 9 } } }));
  mb.days['2026-11-16'] = { subj: 'bb', topics: ['1A', '1B', '1C', '1D', '2A'] };
  const pb = plan(mb, '2026-11-17', { guided: 0 });
  assert.equal(pb.split, 'topics'); assert.deepEqual(pb.topics, ['1A', '2B', '2C', '3A', '3B']); assert.deepEqual(pb.steps[1].topics.map(t => t.need), [10, 10, 10, 10, 10]); }
// A day below goal resets the streak.
m = apply(m, test('cp', '2026-11-17', 'daily', 126));
assert.equal(plan(m, '2026-11-17').streak, 0);
// Two separate days in a row at goal: mastered; the next subject starts the next day with a diagnostic.
m = apply(m, test('cp', '2026-11-18', 'daily', 129));
assert(!m.passed.cp);
m = apply(m, test('cp', '2026-11-18', 'daily', 130));
assert(!m.passed.cp, 'two tests on the same day count as one day');
m = apply(m, test('cp', '2026-11-19', 'daily', 128));
assert.equal(m.passed.cp, '2026-11-19');
p = plan(m, '2026-11-19');
assert.equal(p.subj, 'cp'); assert.equal(p.masteredToday, true, 'today still shows the subject just mastered');
p = plan(m, '2026-11-20');
assert.equal(p.subj, 'bb'); assert.equal(p.status, 'diagnostic');
// Goal 129: 128 no longer counts.
let g = apply({ goal: 129 }, test('ps', '2026-12-01', 'diagnostic', 128));
g = apply(g, test('ps', '2026-12-02', 'daily', 128));
assert.equal(plan(g, '2026-12-03').streak, 0); assert.equal(plan(g, '2026-12-03').goal, 129);
// Picking a subject studies it now, out of order.
p = plan({ current: 'ps' }, '2026-11-20');
assert.equal(p.subj, 'ps'); assert.equal(p.status, 'diagnostic');
// Bad or synced-garbage data never crashes the plan.
assert.equal(plan({ tests: [null, { subj: 'x' }], days: [], passed: 5, goal: 7 }, '2026-11-20').subj, 'cp');
// All subjects mastered.
const all = Object.fromEntries(vm.runInContext('MASTERY.order', ctx).map(s => [s, '2026-01-01']));
assert.equal(plan({ passed: all }, '2026-11-20').status, 'complete');
// The path follows the exam's sections, each with its full AAMC content outline: C/P is 4A–4E and 5A–5E.
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(MASTERY.order)', ctx)), ['cp', 'bb', 'ps']);
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(MASTERY.topics.cp)', ctx)), ['4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E']);
// Test mix follows the exam's weights: C/P is 30% gen chem, 25% physics, 25% biochem, 15% organic, 5% biology.
const cpw = [['gen_chem', 0.30], ['physics', 0.25], ['biochemistry', 0.25], ['organic_chem', 0.15], ['biology', 0.05]];
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(masteryApportion(w, 5))', Object.assign(ctx, { w: cpw }))), [2, 1, 1, 1, 0], '5 passages');
assert.deepEqual(JSON.parse(vm.runInContext('JSON.stringify(masteryApportion(w, 10))', Object.assign(ctx, { w: cpw }))), [3, 3, 3, 1, 0], '10 single questions');
// Tests are built from the Practice Exam cards (modeled one-for-one on the AAMC practice exams, with their
// drawings and graphs), split by AAMC's discipline weights; the question bank is only a fallback.
assert(src.includes('const pool = masteryPracticePool(subj), passages = [];') && src.includes("const items = shuffled(picked).map(q => ({ view: makeView(q), passage: null }));"), 'tests from Practice Exam cards');
// Passage questions count toward their passage's content category, so weak topics use the whole test.
assert(src.includes("tally(cats, r.view.q.cat || (p ? ((p.cats && p.cats[0]) || 'other') : masteryCategory(r.view.q)), r.right);"));
// A section with no Practice Exam cards (B/B, P/S for now) has no Practice Exam step.
{ const mb = apply({ current: 'bb' }, test('bb', '2026-11-15', 'diagnostic', 122, { cats: { '1A': { c: 2, t: 9 } } }));
  assert.deepEqual(ids(plan(mb, '2026-11-16', { guided: 0 })), ['diagnostic', 'flashcards', 'test']); }
// The diagnostic is a full AAMC section (59 questions, 10 passages, 95 minutes); daily tests are half of one.
assert.equal(vm.runInContext('MASTERY.diagSize', ctx), 59, 'the diagnostic is a full section'); assert.equal(vm.runInContext('MASTERY.diagPassages', ctx), 10);
assert.equal(vm.runInContext('MASTERY.testSize', ctx), 30); assert.equal(vm.runInContext('MASTERY.secondsPerItem', ctx), 95);
// Wiring: TODAY leads with the path; tests are scored by the app's raw-to-scaled table; actions are allowlisted.
const app = fs.readFileSync(root + '/js/app.js', 'utf8'), dp = fs.readFileSync(root + '/js/daily-plan.js', 'utf8'), sp = fs.readFileSync(root + '/js/study-path.js', 'utf8');
assert(dp.includes("masteryCard() + '<details class=\"today-dateplan\"><summary>Test date &amp; full-length calendar</summary>' + testDateCard()") && !/el\.innerHTML = [^;]*dailyPlanCard\(\)/.test(dp.slice(dp.indexOf('function renderDailyPlan'))), 'TODAY leads with the mastery path');
assert(app.includes("subjectPath: 'mcat2_subject_path'") && app.includes('masteryNoteAnswer(view.q, right)'), 'answers feed the path');
assert(sp.includes('if (mini.mastery) {') && src.includes('rawToScaled(pctRight)'), 'mastery tests are scored on the 118–132 table');
const actions = fs.readFileSync(root + '/js/actions.js', 'utf8');
assert(app.includes('masteryNoteLesson(view.q)') && app.includes("(quiz.mastery === 'guided' || quiz.mastery === 'lessons' || quiz.mastery === 'followup') && teachOf(q)) teachStep(1)"), 'finished lessons count; each Practice Exam card in the plan opens its lesson');
for (const a of ['startMasteryGuided', 'startMasteryFlashcards', 'startMasteryTest', 'setMasteryGoal', 'setMasteryPerDay', 'setMasterySubject']) assert(actions.includes("'" + a + "'"), a + ' allowlisted');
for (const page of ['index.html', 'recall-session.html']) assert(fs.readFileSync(root + '/' + page, 'utf8').includes('<script src="js/mastery.js?v='), page + ' loads the path');
assert(fs.readFileSync(root + '/sw.js', 'utf8').includes("'js/mastery.js'"), 'cached for offline use');
// After the quiz, below goal: the follow-up reviews the quiz's misses and weak categories with flashcards and
// guided cards only; it never sends the student to practice passages. The quiz unlocks once steps 1 and 2 are done.
{ let mp = apply({}, test('cp', '2026-11-15', 'diagnostic', 122, { version: 'cp_diag' }));
  assert(!plan(mp, '2026-11-15').steps[0].old, 'a versioned diagnostic is current');
  mp = apply(mp, test('cp', '2026-11-16', 'daily', 120, { version: 'cp_half_1' }));
  const f = plan(mp, '2026-11-16', { guided: 266, passages: 144 }).steps.at(-1);
  assert.equal(f.id, 'followup'); assert(!f.atGoal && !('passages' in f), 'below goal: no passage practice'); }
assert(src.includes("btn('Flashcards on these topics', 'startMasteryFollowup(\\'flashcards\\')')") && src.includes("btn('Guided cards on these topics', 'startMasteryFollowup(\\'guided\\')', false)"), 'the follow-up offers flashcards and guided cards');
assert(!/startMasteryPassages|masteryNextPractice|masteryNotePractice|masteryPassagePool|masteryPassageRank|startMasteryFollowup\('passages'\)/.test(src + actions + app), 'the passage step and its practice are gone');
assert(src.includes("if (kind !== 'diagnostic' && !masteryQuizUnlocked(plan))") && src.includes("plan.steps.filter(s => s.id === 'flashcards' || s.id === 'guided').every(s => s.done)"), 'the quiz unlocks once steps 1 and 2 are done');
assert(src.includes("'<p class=\"muted-note\">Unlocks when steps 1 and 2 are done.</p>'"), 'TODAY shows the quiz locked until then');
// Results saved before the Chem/Phys Diagnostic existed (no version) are labeled as the old diagnostic.
assert(src.includes("version: mini.setId || 'cards'") && src.includes('old diagnostic version'), 'old diagnostic labeled');
// A retake button runs the full diagnostic again once the first one is done.
assert(src.includes("btn('Retake diagnostic', \"startMasteryTest('diagnostic')\", s.old)"), 'step 1 offers the retake (the main button while the old diagnostic is current)');
assert(src.includes('function startMasteryFollowup(kind)') && fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'startMasteryFollowup'"), 'after-quiz practice wired and allowlisted');
assert(src.includes('function masteryFlashPool(s) { return masteryExamPool(s); }') && !/QB\.filter/.test(src), 'flashcards are QBank cards only');
// Regression (review 2.3): the streak counts daily quizzes on consecutive calendar days only.
{ const d = (day, kind, scaled) => test('cp', day, kind, scaled);
  const gap = [d('2026-11-01', 'diagnostic', 120), d('2026-11-01', 'daily', 128), d('2026-11-09', 'daily', 128)];
  assert.equal(plan(gap.reduce(apply, {}), '2026-11-09').streak, 1, 'a calendar gap breaks the run');
  assert(!gap.reduce(apply, {}).passed.cp, 'Nov 1 + Nov 9 at goal is not 2 days in a row');
  const retakeHigh = [d('2026-11-01', 'diagnostic', 120), d('2026-11-02', 'daily', 128), d('2026-11-03', 'diagnostic', 129)];
  assert.equal(plan(retakeHigh.reduce(apply, {}), '2026-11-03').streak, 1, 'a diagnostic retake at goal does not add to the streak');
  assert(!retakeHigh.reduce(apply, {}).passed.cp);
  const retakeLow = [d('2026-11-01', 'diagnostic', 120), d('2026-11-02', 'daily', 128), d('2026-11-03', 'daily', 129), d('2026-11-03', 'diagnostic', 125)];
  assert.equal(retakeLow.reduce(apply, {}).passed.cp, '2026-11-03', 'a same-day diagnostic retake below goal does not break it');
  const anyQuiz = [d('2026-11-01', 'diagnostic', 120), d('2026-11-02', 'daily', 129), d('2026-11-03', 'daily', 125), d('2026-11-03', 'daily', 128)];
  assert.equal(anyQuiz.reduce(apply, {}).passed.cp, '2026-11-03', 'a day is at goal if any quiz that day reached it'); }
// Regression (review 3): saved results with non-numeric counts are dropped (they would reach the page as HTML).
{ const bad = { tests: [{ subj: 'cp', day: '2026-11-01', kind: 'diagnostic', scaled: 125, correct: '<img src=x onerror=alert(1)>', total: 59, pct: 50 },
    { subj: 'cp', day: '2026-11-01', kind: 'diagnostic', scaled: 125, correct: 30, total: 59, pct: '<b>' }, { subj: 'cp', day: '<x>', kind: 'daily', scaled: 125, correct: 1, total: 2, pct: 50 }] };
  assert.equal(plan(bad, '2026-11-02').status, 'diagnostic', 'malformed saved tests are ignored'); }
// Storage keys: the path has its own key (it once collided with the topic-mastery map), is reset with the rest,
// and no two KEYS entries share a name or a storage key.
const block = app.slice(app.indexOf('const KEYS = {'), app.indexOf('};', app.indexOf('const KEYS = {')));
const names = [...block.matchAll(/^\s*([A-Za-z]+)\s*:/gm)].map(x => x[1]), values = [...block.matchAll(/:\s*'(mcat2_[a-z_]+)'/g)].map(x => x[1]);
assert.equal(new Set(names).size, names.length, 'no duplicate KEYS names: ' + names.filter((n, i) => names.indexOf(n) !== i));
assert.equal(new Set(values).size, values.length, 'no two KEYS share a storage key: ' + values.filter((n, i) => values.indexOf(n) !== i));
assert(app.includes("subjectPath: 'mcat2_subject_path'") && app.includes('KEYS.studyPath, KEYS.subjectPath,'), 'own key, included in reset');
console.log('Section mastery passed: C/P → B/B → P/S, each with its AAMC outline; diagnostic first, then the same day: 50 QBank flashcards → 50 guided Practice Exam cards → 30-question quiz (unlocked by the first two) → done at goal or practice the weak spots compared with the last; goal 128/129 on 2 separate days moves to the next subject and its diagnostic; manual subject choice; corrupt data tolerated.');
