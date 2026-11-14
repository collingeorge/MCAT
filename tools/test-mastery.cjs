// Section Mastery path rules (one MCAT section at a time, C/P first): diagnostic first (and nothing else that day), then daily misses → 50 flashcards →
// 50 Practice Exam cards with lessons, spread over 5 content categories → end-of-day test; another set when done early; goal (128 or 129) on 2 separate days in a row moves to the next
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

// Day 1: diagnostic only, on the first subject (General Chemistry).
let m = {};
let p = plan(m, '2026-11-15');
assert.equal(p.subj, 'cp'); assert.equal(p.status, 'diagnostic'); assert.deepEqual(ids(p), ['diagnostic']); assert.equal(p.goal, 128);
// After the diagnostic: nothing else that day; weak topics come from it (below 84%), weakest first.
m = apply(m, test('cp', '2026-11-15', 'diagnostic', 122));
p = plan(m, '2026-11-15');
assert.equal(p.status, 'diagnostic-done'); assert.deepEqual(p.steps, []);
assert.deepEqual(p.weak.map(w => w.code), ['5A', '4E'], 'weak topics below 84%, weakest first; passage tally excluded');
// Day 2: yesterday's misses, then 5 sub-topics: the 2 weak ones in the subject's list first (5A 22%, 4E 56%),
// then the subject's others in order. 50 flashcards and 50 Practice Exam cards (each with its lesson), 10 a sub-topic.
p = plan(m, '2026-11-16');
assert.deepEqual(ids(p), ['misses', 'flashcards', 'guided', 'test']);
assert.deepEqual(p.steps[0].ids, ['q1', 'q2']);
assert.deepEqual(p.topics, ['5A', '4E', '4A', '4B', '4C'], 'C/P content categories: the 2 weakest, then in the outline\'s order');
assert.deepEqual(p.steps[1].topics.map(t => t.need), [10, 10, 10, 10, 10]); assert.equal(p.steps[1].count, 50);
assert.equal(p.steps[2].count, 50); assert.equal(p.steps[2].lessonCount, 50);
// A smaller daily size (30 or 20) splits evenly, the weakest first; anything else falls back to 50.
assert.deepEqual(plan({ ...m, perDay: 30 }, '2026-11-16').steps[1].topics.map(t => t.need), [6, 6, 6, 6, 6]);
assert.equal(plan({ ...m, perDay: 7 }, '2026-11-16').steps[1].count, 50);
// A subject with few Practice Exam cards caps that step at what it has.
assert.equal(plan(m, '2026-11-16', { guided: 5 }).steps[2].count, 5);
assert.deepEqual(plan(m, '2026-11-16', { guided: 12 }).steps[2].topics.map(t => t.need), [3, 3, 2, 2, 2]);
// Progress is read per sub-topic from today's row; the day's sub-topics, once saved, stay fixed.
const all10 = { '5A': 10, '4E': 10, '4B': 10, '4C': 10, '4D': 10 };
m.days['2026-11-16'] = { subj: 'cp', topics: ['5A', '4E', '4B', '4C', '4D'], flashT: { ...all10 }, guidedT: { ...all10, '4D': 9 }, lessonsN: 50, reviewed: ['q1', 'q2'], misses: ['g7'] };
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'flashcards').done && !p.steps.find(s => s.id === 'guided').done, 'one Practice Exam card short in 4D');
m.days['2026-11-16'].guidedT['4C'] = 20;
p = plan(m, '2026-11-16');
assert(!p.steps.find(s => s.id === 'guided').done, 'extra cards in one sub-topic do not count for another');
assert.equal(p.steps.find(s => s.id === 'guided').extra, 10, 'cards beyond the set show as extra');
m.days['2026-11-16'].guidedT['4D'] = 10;
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'guided').done && p.steps.find(s => s.id === 'misses').done && !p.steps.find(s => s.id === 'test').done);
m.days['2026-11-16'].lessonsN = 49;
assert(!plan(m, '2026-11-16').steps.find(s => s.id === 'guided').done, 'every card needs its lesson');
m.days['2026-11-16'].lessonsN = 50;
// End-of-day test at goal: one day isn't enough to move on.
m = apply(m, test('cp', '2026-11-16', 'daily', 128, { missIds: ['q9'] }));
p = plan(m, '2026-11-16');
assert(p.steps.find(s => s.id === 'test').done); assert.equal(p.streak, 1); assert.equal(p.subj, 'cp'); assert(!m.passed.cp);
assert.equal(p.latest.scaled, 128); assert.equal(p.previous.scaled, 122, 'compared with the last test');
// Day 3's misses are day 2's card misses plus test misses. The weak sub-topics stay; the other slots go first
// to the sub-topics not studied yet (5B, 5E), so every sub-topic of the subject comes around.
p = plan(m, '2026-11-17');
assert.deepEqual(p.steps[0].ids.slice().sort(), ['g7', 'q9']);
assert.deepEqual(p.topics, ['5A', '4E', '4A', '5B', '5C']);
assert.deepEqual(plan({ ...m, tests: m.tests.map(t => ({ ...t, cats: {} })) }, '2026-11-17').topics.slice(0, 2), ['4A', '5B'], 'no weak topics: the ones not studied yet come first');
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
// Tests look like the exam: discrete questions come from the AAMC-style question bank (not flashcards), and
// passages come in 3 groups, each followed by a set of discrete questions.
assert(src.includes('return AQB_QBANK.filter(q => discs.has(disciplineOfRecall(q)) && cats.has(masteryCategory(q)));') && src.includes('const items = masteryLayout(passages, shuffled(discrete));'), 'exam-style discretes, interleaved');
// A section with no Practice Exam cards (B/B, P/S for now) has no Practice Exam step.
{ const mb = apply({ current: 'bb' }, test('bb', '2026-11-15', 'diagnostic', 122, { cats: { '1A': { c: 2, t: 9 } } }));
  assert.deepEqual(ids(plan(mb, '2026-11-16', { guided: 0 })), ['misses', 'flashcards', 'test']); }
// The diagnostic is a full AAMC section (59 questions, 10 passages, 95 minutes); daily tests are half of one.
assert.equal(vm.runInContext('MASTERY.diagSize', ctx), 59, 'the diagnostic is a full section'); assert.equal(vm.runInContext('MASTERY.diagPassages', ctx), 10);
assert.equal(vm.runInContext('MASTERY.testSize', ctx), 30); assert.equal(vm.runInContext('MASTERY.secondsPerItem', ctx), 95);
// Wiring: TODAY leads with the path; tests are scored by the app's raw-to-scaled table; actions are allowlisted.
const app = fs.readFileSync(root + '/js/app.js', 'utf8'), dp = fs.readFileSync(root + '/js/daily-plan.js', 'utf8'), sp = fs.readFileSync(root + '/js/study-path.js', 'utf8');
assert(dp.includes("masteryCard() + '<details class=\"today-dateplan\"><summary>Test date &amp; full-length calendar</summary>' + testDateCard()") && !/el\.innerHTML = [^;]*dailyPlanCard\(\)/.test(dp.slice(dp.indexOf('function renderDailyPlan'))), 'TODAY leads with the mastery path');
assert(app.includes("subjectPath: 'mcat2_subject_path'") && app.includes('masteryNoteAnswer(view.q, right)'), 'answers feed the path');
assert(sp.includes('if (mini.mastery) {') && src.includes('rawToScaled(pctRight)'), 'mastery tests are scored on the 118–132 table');
const actions = fs.readFileSync(root + '/js/actions.js', 'utf8');
assert(app.includes('masteryNoteLesson(view.q)') && app.includes("quiz.mastery === 'guided' && teachOf(q)) teachStep(1)"), 'finished lessons count; each Practice Exam card in the plan opens its lesson');
for (const a of ['startMasteryGuided', 'startMasteryMisses', 'startMasteryFlashcards', 'startMasteryTest', 'setMasteryGoal', 'setMasteryPerDay', 'setMasterySubject']) assert(actions.includes("'" + a + "'"), a + ' allowlisted');
for (const page of ['index.html', 'recall.html']) assert(fs.readFileSync(root + '/' + page, 'utf8').includes('<script src="js/mastery.js"></script>'), page + ' loads the path');
assert(fs.readFileSync(root + '/sw.js', 'utf8').includes("'js/mastery.js'"), 'cached for offline use');
// Storage keys: the path has its own key (it once collided with the topic-mastery map), is reset with the rest,
// and no two KEYS entries share a name or a storage key.
const block = app.slice(app.indexOf('const KEYS = {'), app.indexOf('};', app.indexOf('const KEYS = {')));
const names = [...block.matchAll(/^\s*([A-Za-z]+)\s*:/gm)].map(x => x[1]), values = [...block.matchAll(/:\s*'(mcat2_[a-z_]+)'/g)].map(x => x[1]);
assert.equal(new Set(names).size, names.length, 'no duplicate KEYS names: ' + names.filter((n, i) => names.indexOf(n) !== i));
assert.equal(new Set(values).size, values.length, 'no two KEYS share a storage key: ' + values.filter((n, i) => values.indexOf(n) !== i));
assert(app.includes("subjectPath: 'mcat2_subject_path'") && app.includes('KEYS.studyPath, KEYS.subjectPath,'), 'own key, included in reset');
console.log('Section mastery passed: C/P → B/B → P/S, each with its AAMC outline; diagnostic-only first day with weak categories; then misses → 50 flashcards → 50 Practice Exam cards with lessons over 5 content categories → end-of-day test (another set when done early) compared with the last; goal 128/129 on 2 separate days moves to the next subject and its diagnostic; manual subject choice; corrupt data tolerated.');
