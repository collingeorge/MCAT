// Resilience fuzzing: every synced storage key receives randomized malformed values (wrong types,
// nulls, nested garbage, markup, huge numbers, prototype keys) and every main screen must still
// render without throwing or emitting markup from the stored data. Seeded, so failures reproduce.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const seed = Number(process.env.FUZZ_SEED || 20261106), rounds = Number(process.env.FUZZ_ROUNDS || 60);
let s = seed >>> 0;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const pick = a => a[Math.floor(rnd() * a.length)];
const MARK = '<img src=x data-fuzz="1">';
const atoms = () => [null, 0, -1, 1e308, NaN, '', 'x', MARK, true, false, [], {}, '2026-02-30', '__proto__', -0.5, 7];
function garbage(depth = 0) {
  const r = rnd();
  if (depth > 2 || r < 0.45) return pick(atoms());
  if (r < 0.7) return Array.from({ length: Math.floor(rnd() * 4) }, () => garbage(depth + 1));
  const o = {};
  for (let i = Math.floor(rnd() * 4); i > 0; i--) o[pick(['t', 'id', 'day', 'date', 'total', 'scores', 'sections', 'newIds', 'c', 'n', 'S', 'last', 'seen', 'subj', 'first', 'form', 'results', 'answers', 'type', 'chosen', 'answer', 'src', 'note', 'days', 'start', 'minutes', 'biology', '2026-11-06', '__proto__', 'constructor'])] = garbage(depth + 1);
  return o;
}

const storage = new Map(), nodes = new Map();
const el = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '', value: '', hidden: false, style: { setProperty() {} }, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } }); return nodes.get(id); };
const ctx = vm.createContext({ console: { ...console, error() {}, warn() {} }, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, clearTimeout() {}, confirm() { return false; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, document: { getElementById: el, querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, String(v)), removeItem: k => storage.delete(k) } });
ctx.window = ctx; ctx.scrollTo = () => {};
const run = code => vm.runInContext(code, ctx);
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"]+)"/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
const keys = run("Object.values(KEYS).filter(k=>typeof k==='string').concat(FULL_EXAMS.flatMap(e=>[KEYS.examProgress(e.id),KEYS.examLast(e.id)]),STUDY_TIMER_KEY)");
const screens = ['dailyPlanMemo=null;renderHome()', 'showProgress()', 'showPlan()', 'showOfficialScores()', "setMode('passage')", "setMode('exam')", "setMode('recall')", 'startPassageMissReview()', 'showConfusionReview()', 'startSmartSession();goHome()', 'startDueReview();goHome()', 'startDailyNewFacts();goHome()', 'startYesterdayMisses();goHome()', 'startExam(0);goHome()', 'openLastExamReview(0);goHome()', 'renderStudyTimer()'];
const plan = () => JSON.stringify({ date: run('localDay(new Date(Date.now()+' + Math.floor(rnd() * 140 - 5) + '*DAY))'), start: run('localDay(new Date(Date.now()-' + Math.floor(rnd() * 60) + '*DAY))'), days: pick([3, 6, 7, 0, 'x']), minutes: pick([30, 120, 240, -5, null]) });
let screensRun = 0;
for (let round = 0; round < rounds; round++) {
  storage.clear();
  // A random subset of keys gets garbage; the plan is usually valid so plan-dependent screens run.
  for (const k of keys) if (rnd() < 0.6) storage.set(k, rnd() < 0.15 ? '{not json' : JSON.stringify(garbage()));
  if (rnd() < 0.8) storage.set('mcat2_plan', plan());
  for (const code of screens) {
    try { run(code); } catch (e) { assert.fail(`seed ${seed} round ${round}: "${code}" threw ${e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : e}`); }
    screensRun++;
  }
  for (const node of nodes.values()) assert(!String(node.innerHTML).includes('data-fuzz'), `seed ${seed} round ${round}: stored markup reached the page`);
  assert.equal(run('Object.prototype.biology'), undefined, 'no prototype pollution');
}
console.log(`Fuzz passed: ${rounds} rounds x ${screens.length} screens (${screensRun} renders) with malformed values in ${keys.length} synced keys, seed ${seed}; no throws, no stored markup rendered, no prototype pollution.`);
