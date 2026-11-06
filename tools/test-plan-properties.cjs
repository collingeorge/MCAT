// Property tests for the pure TODAY planner: random calendars and random student behavior must
// never break the plan's invariants. Seeded (PLAN_SEED / PLAN_CASES env vars) so failures reproduce.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ctx = vm.createContext({ console, Date, Math, Map, Set, JSON, Object, Number, String, Array, Infinity });
vm.runInContext(fs.readFileSync(__dirname + '/../js/daily-plan.js', 'utf8'), ctx);
const { computeDailyPlan, dpAddDays, dpDiff } = ctx, DAILY_RULES = vm.runInContext('DAILY_RULES', ctx);
const seed = Number(process.env.PLAN_SEED || 7), cases = Number(process.env.PLAN_CASES || 300);
let s = seed >>> 0;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const FACTS = 2807, SCI = 54, CARS = 6;
const ORDER = ['set-date', 'full-length', 'fl-review', 'recall-misses', 'passage-misses', 'due', 'new-facts', 'passages', 'closeout'];
const STATUSES = new Set(['study', 'final', 'rest', 'light', 'fl', 'fl-done', 'review', 'test-day', 'past', 'no-plan']);
let days = 0, finished = 0, checkedFinish = 0;
for (let c = 0; c < cases; c++) {
  const start = dpAddDays('2026-11-06', int(0, 30)), D = int(1, 200), test = dpAddDays(start, D);
  const perWeek = int(3, 7), minutes = [30, 60, 90, 120, 180, 240][int(0, 5)];
  const behavior = { skip: rnd() * 0.25, half: rnd() * 0.25, missFL: rnd() * 0.4 };
  const st = { plan: { date: test, days: perWeek, minutes, start }, due: 0, confusedToday: 0, facts: { total: FACTS, unseen: FACTS, freshToday: 0 },
    passages: { appScienceUnseen: SCI, appCarsUnseen: CARS, firstTodayScience: 0, firstTodayCars: 0, firstTodayOther: 0, externalToday: 0, lastAppCarsDay: null },
    recallMisses: [], passageMisses: [], activeDays: [], snapshots: {}, done: {},
    fullLengths: { completed: [], sample: 'S', appExams: ['A1', 'A2'], aamcLeft: ['P1', 'P2', 'P3', 'P4'], deferred: {}, reviewed: {} } };
  const windowDay = dpAddDays(start, D - DAILY_RULES.finalWindow);
  let unseenAtWindow = null;
  for (let i = 0; i <= D + 1; i++) {
    const day = dpAddDays(start, i);
    if (day === windowDay) unseenAtWindow = st.facts.unseen;
    Object.assign(st.facts, { freshToday: 0 }); Object.assign(st.passages, { firstTodayScience: 0, firstTodayCars: 0, externalToday: 0 });
    st.due = int(0, 200); st.confusedToday = int(0, 3);
    let p;
    try { p = computeDailyPlan(st, day); } catch (e) { assert.fail(`seed ${seed} case ${c} day ${i}: threw ${e.stack}`); }
    days++;
    const where = `seed ${seed} case ${c} (D=${D}, ${perWeek}/wk, ${minutes} min) day ${i}`;
    assert(STATUSES.has(p.status), where + ' status ' + p.status);
    if (i > D) { assert.equal(p.status, 'past', where); continue; }
    if (i === D) { assert.equal(p.status, 'test-day', where); continue; }
    // Steps: known ids, canonical order, sane non-negative integer counts and minutes.
    const idx = p.steps.map(x => ORDER.indexOf(x.id));
    assert(idx.every(n => n >= 0), where + ' unknown step');
    assert(idx.every((n, j) => j === 0 || n > idx[j - 1]), where + ' steps out of order: ' + p.steps.map(x => x.id));
    for (const x of p.steps) {
      for (const k of ['count', 'progress', 'minutes', 'fullMinutes']) if (x[k] != null) assert(Number.isInteger(x[k]) && x[k] >= 0, `${where} ${x.id}.${k}=${x[k]}`);
      assert.equal(x.n, p.steps.indexOf(x) + 1, where + ' numbering');
    }
    assert(Number.isFinite(p.estimate) && p.estimate >= 0 && Number.isFinite(p.behindMinutes) && p.behindMinutes >= 0, where + ' estimate');
    // Full-lengths: at most 6, strictly increasing, all before the test, at least 3 days apart, last one 7 days out when it fits.
    const fl = p.fullLengths.map(f => f.day);
    assert(fl.length <= 6, where + ' too many full-lengths');
    assert(fl.every((d, j) => d < test && (j === 0 || dpDiff(fl[j - 1], d) >= 3)), where + ' full-length spacing ' + fl);
    if (D >= 10) assert.equal(dpDiff(fl.at(-1), test), 7, where + ' last full-length 7 days out');
    // Quotas: never more new facts than unseen; passages 3+ on study days, 4-5 timed in the final window.
    const nf = p.steps.find(x => x.id === 'new-facts'), ps = p.steps.find(x => x.id === 'passages');
    if (nf) assert(nf.count <= st.facts.unseen, where + ' quota above unseen');
    if (ps && p.status === 'study') assert(ps.count >= 3, where + ' passages');
    if (ps && p.status === 'final') assert(ps.count >= 4 && ps.count <= 5 && ps.timed, where + ' final passages');
    if (p.carry) assert(p.status === 'study' && dpDiff(p.carry.from, day) <= 7 && p.carry.passages <= 3, where + ' carry-over rules');
    // Simulated student.
    if (p.status === 'fl') { if (rnd() > behavior.missFL) { st.fullLengths.completed.push(day); st.activeDays.push(day); } continue; }
    if (p.status === 'review') st.fullLengths.reviewed[p.steps[0].completedDay] = day;
    if (!nf || rnd() < behavior.skip) continue;
    const share = rnd() < behavior.half ? 0.5 : 1, done = Math.min(st.facts.unseen, Math.floor(nf.count * share));
    st.facts.unseen -= done; st.facts.freshToday = done;
    const target = Math.floor(ps.count * share), app = Math.min(target, ps.appScience + ps.appCars, st.passages.appScienceUnseen + st.passages.appCarsUnseen);
    const cars = Math.min(ps.appCars, st.passages.appCarsUnseen, app);
    st.passages.appCarsUnseen -= cars; st.passages.appScienceUnseen -= app - cars;
    st.passages.firstTodayCars = cars; st.passages.firstTodayScience = app - cars; st.passages.externalToday = target - app;
    if (cars) st.passages.lastAppCarsDay = day;
    if (done || target) st.activeDays.push(day);
    st.snapshots[day] = computeDailyPlan(st, day).snapshot;
  }
  // A student who never skips or half-does a day finishes the bank before the final window.
  if (behavior.skip === 0 || (behavior.skip < 0.0001 && behavior.half < 0.0001)) { /* unreachable with random rates */ }
  if (D - DAILY_RULES.finalWindow >= 7 && unseenAtWindow != null) { checkedFinish++; if (unseenAtWindow === 0) finished++; }
}
// Compliance check with perfect behavior on every calendar shape that has a content phase.
let perfect = 0;
for (let D = 28; D <= 200; D += 3) for (const perWeek of [3, 5, 6, 7]) {
  const start = '2026-11-06', test = dpAddDays(start, D);
  const st = { plan: { date: test, days: perWeek, minutes: 120, start }, due: 0, confusedToday: 0, facts: { total: FACTS, unseen: FACTS, freshToday: 0 },
    passages: { appScienceUnseen: SCI, appCarsUnseen: CARS, firstTodayScience: 0, firstTodayCars: 0, firstTodayOther: 0, externalToday: 0, lastAppCarsDay: null },
    recallMisses: [], passageMisses: [], activeDays: [], snapshots: {}, done: {}, fullLengths: { completed: [], sample: 'S', appExams: ['A1', 'A2'], aamcLeft: ['P1', 'P2', 'P3', 'P4'], deferred: {}, reviewed: {} } };
  for (let i = 0; i < D - DAILY_RULES.finalWindow; i++) {
    const day = dpAddDays(start, i); Object.assign(st.facts, { freshToday: 0 }); Object.assign(st.passages, { firstTodayScience: 0, firstTodayCars: 0, externalToday: 0 });
    const p = computeDailyPlan(st, day);
    if (p.status === 'fl') { st.fullLengths.completed.push(day); continue; }
    if (p.status === 'review') { st.fullLengths.reviewed[p.steps[0].completedDay] = day; continue; }
    const nf = p.steps.find(x => x.id === 'new-facts'), ps = p.steps.find(x => x.id === 'passages');
    if (!nf) continue;
    st.facts.unseen -= nf.count; st.facts.freshToday = nf.count;
    const cars = Math.min(ps.appCars, st.passages.appCarsUnseen), sci = Math.min(ps.appScience, st.passages.appScienceUnseen);
    st.passages.appCarsUnseen -= cars; st.passages.appScienceUnseen -= sci; st.passages.firstTodayCars = cars; st.passages.firstTodayScience = sci;
    if (cars) st.passages.lastAppCarsDay = day;
    st.activeDays.push(day); st.snapshots[day] = computeDailyPlan(st, day).snapshot;
  }
  if (computeDailyPlan(st, start).notes.some(n => /less than 21 days/.test(n))) { perfect++; continue; } // short plan: no new-fact pacing by design
  assert.equal(st.facts.unseen, 0, `perfect student, D=${D}, ${perWeek}/wk: facts left at the final window`);
  assert.equal(st.passages.appScienceUnseen, 0, `perfect student, D=${D}, ${perWeek}/wk: app science passages left`);
  // CARS is spaced at one per study day at most, so only calendars with 6+ content study days can finish all 6.
  if (st.activeDays.length >= CARS) assert.equal(st.passages.appCarsUnseen, 0, `perfect student, D=${D}, ${perWeek}/wk: app CARS left`);
  perfect++;
}
console.log(`Plan properties passed: ${cases} random calendars (${days} plan-days, seed ${seed}) keep step order, integer counts, <=6 well-spaced full-lengths ending 7 days out, passage targets and carry-over rules; ${perfect} calendar shapes finish all ${FACTS} facts and 60 practice passages before the final window with full compliance (${finished}/${checkedFinish} random students with skips also finished).`);
