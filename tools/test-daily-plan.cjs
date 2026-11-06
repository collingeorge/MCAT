// Unit tests for the pure TODAY-plan pacing function (no browser, no framework).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ctx = vm.createContext({ console, Date, Math, Map, Set, JSON, Object, Number, String, Array, Infinity });
vm.runInContext(fs.readFileSync(__dirname + '/../js/daily-plan.js', 'utf8'), ctx);
const same = (a, b, m) => assert.equal(JSON.stringify(a), JSON.stringify(b), m); // values cross a vm realm
const { computeDailyPlan, buildCalendar, fullLengthOffsets, allocateByShare, dpAddDays, dpDiff } = ctx;
const FACTS = 2807, SCIENCE = 54, CARS = 6, EXAM_PASSAGES = 18, ALL_PASSAGES = 78;
assert.equal(SCIENCE + CARS + EXAM_PASSAGES, ALL_PASSAGES);
const APP = ['Full-Length Practice Exam 1 (this app)', 'Full-Length Practice Exam 2 (this app)'];
const SAMPLE = 'AAMC Sample Test: baseline diagnostic (aamc.org)';
const AAMC = [1, 2, 3, 4].map(n => 'AAMC Practice Exam ' + n + ' (aamc.org)');

function baseState(start, test, over = {}) {
  return {
    plan: { date: test, days: 6, minutes: 240, start }, due: 0, confusedToday: 0,
    facts: { total: FACTS, unseen: FACTS, freshToday: 0 },
    passages: { appScienceUnseen: SCIENCE, appCarsUnseen: CARS, firstTodayScience: 0, firstTodayCars: 0, firstTodayOther: 0, externalToday: 0, lastAppCarsDay: null },
    recallMisses: [], passageMisses: [], activeDays: [], snapshots: {}, done: {},
    fullLengths: { completed: [], sample: SAMPLE, appExams: APP.slice(), aamcLeft: AAMC.slice(), deferred: {}, reviewed: {} }, ...over,
  };
}
// Simulate a student who does exactly what the card says (optionally skipping or half-doing days).
function simulate(start, days, opts = {}) {
  const test = dpAddDays(start, days), s = baseState(start, test);
  const log = [];
  for (let i = 0; i < days; i++) {
    const day = dpAddDays(start, i);
    Object.assign(s.facts, { freshToday: 0 });
    Object.assign(s.passages, { firstTodayScience: 0, firstTodayCars: 0, externalToday: 0 });
    if (opts.skip?.includes(i)) { log.push({ day, skipped: true }); continue; }
    const plan = computeDailyPlan(s, day);
    const entry = { day, status: plan.status, plan };
    if (plan.status === 'fl') { s.fullLengths.completed.push(day); s.activeDays.push(day); }
    if (plan.status === 'review') s.fullLengths.reviewed[plan.steps[0].completedDay] = day;
    const nf = plan.steps.find(x => x.id === 'new-facts'), ps = plan.steps.find(x => x.id === 'passages');
    if (nf) {
      const share = opts.half?.includes(i) ? 0.5 : 1;
      const doFacts = Math.floor(nf.count * share);
      s.facts.unseen -= doFacts; s.facts.freshToday = doFacts;
      const sci = Math.min(ps.appScience, s.passages.appScienceUnseen), cars = Math.min(ps.appCars, s.passages.appCarsUnseen);
      const target = Math.floor(ps.count * share);
      const appDone = Math.min(target, sci + cars), carsDone = Math.min(cars, appDone);
      s.passages.appScienceUnseen -= appDone - carsDone; s.passages.appCarsUnseen -= carsDone;
      s.passages.firstTodayScience = appDone - carsDone; s.passages.firstTodayCars = carsDone; s.passages.externalToday = target - appDone;
      if (carsDone) s.passages.lastAppCarsDay = day;
      if (doFacts || target) s.activeDays.push(day);
      entry.facts = doFacts; entry.appPassages = appDone; entry.external = target - appDone; entry.cars = carsDone;
      // Snapshot as the browser wrapper does at the end of the day (quota + what was done).
      const after = computeDailyPlan(s, day);
      s.snapshots[day] = after.snapshot;
      entry.after = after;
    }
    log.push(entry);
  }
  return { log, state: s, test, cal: buildCalendar(start, test, 6) };
}

// ── Full-length schedule rule ──
for (const days of [90, 120, 84, 60]) {
  const off = fullLengthOffsets(days, 6);
  assert.equal(off[0], 12, days + ': baseline at the end of week 2');
  assert.equal(off.at(-1), days - 7, days + ': last full-length 7 days before the test');
  same(off.slice(-4), [days - 28, days - 21, days - 14, days - 7], days + ': weekly in the final month');
  assert(off.length <= 6, days + ': capped at 6 full-lengths');
  for (let i = 1; i < off.length - 3; i++) assert(off[i] - off[i - 1] >= 14, days + ': at least 2 weeks between early full-lengths');
}
same(fullLengthOffsets(90, 6), [12, 37, 62, 69, 76, 83]);
same(fullLengthOffsets(120, 6), [12, 52, 92, 99, 106, 113]);
same(fullLengthOffsets(30, 6), [9, 16, 23], 'short plan: the first final-month exam is the baseline');
// Each full-length is followed by its review day and none falls on a rest day.
const cal90 = buildCalendar('2026-11-06', dpAddDays('2026-11-06', 90), 6);
cal90.fl.forEach(o => { assert.equal(cal90.types[o], 'fl'); assert.equal(cal90.types[o + 1], 'review'); });
for (let c = 0; c * 7 < 89; c++) { const week = cal90.types.slice(c * 7, Math.min(c * 7 + 7, 89)); if (week.length === 7) assert.equal(week.filter(x => x === 'rest').length, 1, 'one rest day per week'); }
assert.equal(cal90.types[90], 'test'); assert.equal(cal90.types[89], 'light');

// ── 90- and 120-day calendars: everything is scheduled before the final window ──
for (const days of [90, 120]) {
  const start = '2026-11-06', sim = simulate(start, days), windowDay = dpAddDays(start, days - 21);
  const contentDays = sim.log.filter(x => x.day < windowDay);
  assert.equal(contentDays.reduce((n, x) => n + (x.facts || 0), 0), FACTS, days + ': all 2,807 facts before the final window');
  assert.equal(sim.state.facts.unseen, 0);
  assert.equal(contentDays.reduce((n, x) => n + (x.appPassages || 0), 0), SCIENCE + CARS, days + ': all 60 practice passages before the final window');
  assert(sim.log.filter(x => x.day >= windowDay).every(x => !x.facts), days + ': no new facts in the final 21 days when coverage is complete');
  // Six exams: AAMC Sample Test as the baseline diagnostic, app FL1 mid-plan, AAMC 1-4 in the final month.
  const last = sim.log.at(-1).plan, slots = last.fullLengths;
  same(slots.map(s => s.label), [SAMPLE, APP[0], ...AAMC], days + ': full-length line-up');
  same(last.optionalFullLengths, [APP[1]], days + ': app FL2 offered as an optional extra');
  assert(slots.every(s => s.done && s.done < sim.test));
  assert(slots.every(s => s.done === s.day), days + ': every full-length taken on its date');
  // FL days replace the checklist; the next day is a review day; rest days schedule nothing new.
  sim.log.filter(x => x.status === 'fl').forEach(x => { assert.equal(x.plan.steps.length, 1); assert.match(x.plan.steps[0].title, /^Take full-length \d+/); });
  slots.forEach(s => { const next = sim.log.find(x => x.day === dpAddDays(s.day, 1)); if (next) { assert.equal(next.status, 'review', 'day after FL ' + s.index); same(next.plan.steps.map(x => x.id), ['fl-review', 'due']); } });
  assert(sim.log.filter(x => x.status === 'rest').every(x => x.plan.steps.every(s => s.optional)));
  // Normal days: at least 3 passages (1 CARS + 2 science); final window: 4-5 timed.
  sim.log.filter(x => x.status === 'study').forEach(x => assert(x.plan.steps.find(s => s.id === 'passages').count >= 3));
  sim.log.filter(x => x.status === 'final').forEach(x => { const p = x.plan.steps.find(s => s.id === 'passages'); assert(p.count >= 4 && p.count <= 5 && p.timed); });
  // CARS spread: the six app CARS passages are not used up in the first week.
  const carsDays = sim.log.filter(x => x.cars).map(x => dpDiff(start, x.day));
  assert.equal(carsDays.length, CARS); assert(carsDays.at(-1) - carsDays[0] >= 30, days + ': app CARS spread out, got ' + carsDays);
  // Step order on a normal study day with history.
  const mid = sim.log.find(x => x.status === 'study' && x.day > dpAddDays(start, 3));
  same(mid.plan.steps.map(s => s.id), ['recall-misses', 'passage-misses', 'due', 'new-facts', 'passages', 'closeout']);
}

// ── A missed day redistributes the remaining work ──
{
  const start = '2026-11-06', normal = simulate(start, 90), sim = simulate(start, 90, { skip: [3] });
  const windowDay = dpAddDays(start, 69);
  assert.equal(sim.log.filter(x => x.day < windowDay).reduce((n, x) => n + (x.facts || 0), 0), FACTS, 'skipped day still finishes the bank');
  const q = (log, i) => log[i].plan.steps.find(s => s.id === 'new-facts').count;
  assert(q(sim.log, 4) >= q(normal.log, 4), 'quota rises after a missed day');
  assert(!sim.log[4].plan.carry, 'a day never opened has no snapshot, so it is redistributed rather than carried');
}

// ── Carry-over: an unfinished day is added to the next study day, not dropped ──
{
  const start = '2026-11-06', sim = simulate(start, 90, { half: [1] });
  const d1 = sim.log[1], d2 = sim.log[2];
  const q1 = d1.plan.steps.find(s => s.id === 'new-facts').count;
  assert(d2.plan.carry, 'carry-over shown');
  assert.equal(d2.plan.carry.from, d1.day);
  assert.equal(d2.plan.carry.newFacts, q1 - Math.floor(q1 / 2));
  assert(d2.plan.carry.passages >= 1);
  const nf2 = d2.plan.steps.find(s => s.id === 'new-facts');
  assert.equal(nf2.carry, d2.plan.carry.newFacts);
  assert(nf2.count >= d2.plan.carry.newFacts + 1);
  assert.equal(sim.log.filter(x => x.day < dpAddDays(start, 69)).reduce((n, x) => n + (x.facts || 0), 0), FACTS, 'carry-over still finishes the bank');
}

// ── Yesterday = previous study day, misses grouped by subject, older unreviewed misses carry ──
{
  const start = '2026-11-02', test = dpAddDays(start, 90), today = '2026-11-09';
  const s = baseState(start, test, { activeDays: ['2026-11-05', '2026-11-06'], due: 40, confusedToday: 2 });
  s.facts.unseen = 2600;
  s.recallMisses = [
    { id: 'a', disc: 'biology', day: '2026-11-06', answeredDay: '2026-11-06' },
    { id: 'b', disc: 'biology', day: '2026-11-06', answeredDay: '2026-11-06' },
    { id: 'c', disc: 'physics', day: '2026-11-06', answeredDay: '2026-11-09' },
    { id: 'd', disc: 'gen_chem', day: '2026-11-05', answeredDay: '2026-11-05' },  // never revisited: carries
    { id: 'e', disc: 'gen_chem', day: '2026-11-04', answeredDay: '2026-11-06' },  // revisited later: cleared
  ];
  s.passageMisses = [{ key: 'k1', disc: 'cars', day: '2026-11-06', reviewedDay: null }, { key: 'k2', disc: 'biology', day: '2026-11-06', reviewedDay: today }];
  const p = computeDailyPlan(s, today);
  assert.equal(p.prevStudyDay, '2026-11-06', 'previous study day, not the previous calendar day');
  const r = p.steps.find(x => x.id === 'recall-misses');
  assert.equal(r.count, 4); assert.equal(r.progress, 1); same(r.groups, { biology: 2, physics: 1, gen_chem: 1 });
  const pm = p.steps.find(x => x.id === 'passage-misses');
  assert.equal(pm.count, 2); assert.equal(pm.progress, 1); assert.equal(pm.review, true);
  assert.equal(p.steps.find(x => x.id === 'due').count, 40);
  assert.equal(p.steps.find(x => x.id === 'closeout').count, 2);
  same(p.steps.map(x => x.n), [1, 2, 3, 4, 5, 6]);
}

// ── Behind pace: quotas are not shrunk, the gap is reported ──
{
  const start = '2026-11-06', s = baseState(start, dpAddDays(start, 84), { due: 65 });
  s.plan.minutes = 120; s.activeDays = ['2026-11-05'];
  const p = computeDailyPlan(s, start);
  const nf = p.steps.find(x => x.id === 'new-facts');
  assert.equal(nf.count, Math.ceil(FACTS / p.pacing.newDays), 'quota keeps the finishing pace');
  assert(p.behindMinutes > 0 && p.behindMinutes === p.estimate - 120);
  assert.equal(p.steps.find(x => x.id === 'due').count, 65, 'due reviews intact');
}

// ── Edge cases ──
same(computeDailyPlan(baseState(null, null, { plan: null }), '2026-11-06').steps.map(s => s.title), ['Set your test date to get a daily plan']);
{
  const p = computeDailyPlan(baseState('2026-11-06', '2026-11-20'), '2026-11-06');
  assert.equal(p.steps.find(s => s.id === 'new-facts')?.count || 0, 0, 'under 21 days: no new-fact pacing');
  assert(p.notes.some(n => /less than 21 days/.test(n)));
}
{
  const p = computeDailyPlan(baseState('2026-11-06', dpAddDays('2026-11-06', 90)), '2026-11-06');
  assert.equal(p.status, 'study');
  same(p.steps.map(s => s.id), ['due', 'new-facts', 'passages'], 'new user: steps 1, 2 and 6 hidden');
  assert.equal(p.nextFullLength.day, '2026-11-18'); assert.equal(p.nextFullLength.label, SAMPLE); assert.equal(p.nextFullLength.reviewDay, '2026-11-19');
}
// Missed full-length rolls forward to the next non-rest day, can be deferred, and then hands off.
{
  const start = '2026-11-06', s = baseState(start, dpAddDays(start, 90)); s.activeDays = ['2026-11-17'];
  const flDay = dpAddDays(start, 12), next = dpAddDays(flDay, 1);
  assert.equal(computeDailyPlan(s, flDay).status, 'fl');
  assert.equal(computeDailyPlan(s, next).status, 'fl', 'missed full-length rolls forward');
  assert.equal(computeDailyPlan(s, next).steps[0].overdue, true);
  s.fullLengths.deferred[next] = true;
  assert.notEqual(computeDailyPlan(s, next).status, 'fl', 'Not today keeps the normal checklist');
  assert.equal(computeDailyPlan(s, next).nextFullLength.when, dpAddDays(next, 1));
  const later = computeDailyPlan(s, dpAddDays(start, 34));
  assert.equal(later.nextFullLength.index, 2, 'a slot whose window closed hands off to the next one');
  s.fullLengths.completed.push(next);
  assert.equal(computeDailyPlan(s, dpAddDays(next, 1)).status, 'review');
}
// Final window keeps catching up incomplete coverage on long plans.
{
  const start = '2026-11-06', test = dpAddDays(start, 90), s = baseState(start, test); s.activeDays = ['2026-12-01'];
  s.facts.unseen = 200; s.passages.appScienceUnseen = 0; s.passages.appCarsUnseen = 0;
  s.fullLengths.completed = [12, 37, 62, 69].map(o => dpAddDays(start, o));
  const day = dpAddDays(start, 72), p = computeDailyPlan(s, day);
  assert.equal(p.status, 'final');
  assert(p.steps.find(x => x.id === 'new-facts').count > 0);
  assert(p.notes.some(n => /coverage is incomplete/.test(n)));
  assert.equal(computeDailyPlan(s, test).status, 'test-day');
  assert.equal(computeDailyPlan(s, dpAddDays(test, -1)).status, 'light');
}
// Exams used before the plan started are skipped; missing AAMC exams fall back to unused ones.
{
  const { fullLengthLabels } = ctx;
  const r = fullLengthLabels(6, { sample: null, appExams: APP, aamcLeft: AAMC.slice(1) });
  same(r.labels, [APP[0], APP[1], 'Third-party full-length (all AAMC exams already used)', AAMC[1], AAMC[2], AAMC[3]]);
  same(r.extras, []);
}
// Content-share allocation respects availability and adds up exactly.
{
  const a = allocateByShare(45, { biology: 0.75, psych_soc: 0.95, physics: 0.25 }, { biology: 100, psych_soc: 3, physics: 100 });
  assert.equal(a.biology + a.psych_soc + a.physics, 45); assert.equal(a.psych_soc, 3); assert(a.biology > a.physics);
}
// ── Browser wrapper against the real app scripts (no browser needed) ──
{
  const storage = new Map(), nodes = new Map();
  const el = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } }); return nodes.get(id); };
  const app = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} }, document: { getElementById: el, querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) } });
  for (const [, file] of fs.readFileSync(__dirname + '/../index.html', 'utf8').matchAll(/<script src="([^"]+)"/g)) if (!/account|cloud-config|pages/.test(file)) vm.runInContext(fs.readFileSync(__dirname + '/../' + file, 'utf8'), app);
  const run = code => vm.runInContext(code, app);
  run("store.set(KEYS.plan,{date:localDay(new Date(Date.now()+90*DAY)),start:localDay(),days:6,minutes:120})");
  // Tampered or malformed synced data must not break the home page.
  for (const bad of ['"x"', '[]', '{"days":"oops","fullLengths":{"a":1},"passageReviews":[1],"deferred":null}', '{"days":{"__proto__":{"type":"study"},"not-a-day":{"newQuota":5},"2026-01-01":7}}']) {
    storage.set('mcat2_daily_plan', bad);
    assert.doesNotThrow(() => run('dailyPlanMemo=null;renderHome()'), 'malformed mcat2_daily_plan: ' + bad);
    assert.match(el('today-plan').innerHTML, /TODAY › Start here/);
  }
  assert.equal(run('Object.prototype.type'), undefined, 'no prototype pollution from synced keys');
  // The memoized plan refreshes after any storage write.
  run('dailyPlanMemo=null');
  const before = run("currentDailyPlan().steps.find(s=>s.id==='due').count");
  assert.equal(run('currentDailyPlan()'), run('currentDailyPlan()'), 'repeat calls reuse one computation');
  run("const m=loadMem();QB.slice(0,7).forEach(q=>m[q.id]={S:0.1,D:5,last:Date.now()-5*DAY,seen:1,right:0,lapses:1});store.set(KEYS.mem,m)");
  assert.equal(run("currentDailyPlan().steps.find(s=>s.id==='due').count"), before + 7, 'a storage write invalidates the cached plan');
  // Passage-miss notes are saved by row index; no stored text is placed in inline handlers.
  run("const p=ALL_PASSAGES.find(p=>!EXAM_PASSAGE_IDS.has(p.id));store.set(KEYS.errors,[{t:Date.now()-2*DAY,id:p.id+'#0',src:'passage',type:'reasoning',chosen:'\"><img src=x onerror=alert(1)>',answer:'b'}]);store.set(KEYS.daily,{[localDay(new Date(Date.now()-2*DAY))]:3});startPassageMissReview()");
  assert.doesNotMatch(el('results-body').innerHTML, /<img src=x/, 'stored answers are escaped');
  assert.match(el('results-body').innerHTML, /onclick="savePassageMissNote\(0\)"/);
}
console.log('Daily plan pacing passed: 90/120-day calendars cover all 2,807 facts and 60 practice passages, 6-exam AAMC-first full-length line-up, full-length rule, missed days, carry-over, misses, behind-pace and edge cases, plus malformed synced data, plan caching and escaped passage-miss review.');
