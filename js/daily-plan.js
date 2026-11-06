// TODAY › Start here: one ordered daily checklist paced to the test date.
// The pacing rules below are planning heuristics, not validated MCAT readiness thresholds.
// computeDailyPlan() and its helpers are pure (no storage, DOM or clock access) so they
// can be unit-tested with node: tools/test-daily-plan.cjs.
const DAILY_RULES = {
  finalWindow: 21,          // last 21 days: review + timed practice, no new-fact pacing
  secondsPerFact: 48,       // same per-question estimate as SECONDS_PER_RECALL in app.js
  minutesPerPassageMiss: 3, // reread passage + explanation, write one line
  minutesPerPassage: 18,    // ~6 questions at AAMC pace plus a short review
  minutesPerPair: 2,
  normalPassages: 3,        // 1 CARS + 2 science
  finalPassages: 4,         // 4 timed passages; 5 when the daily budget is 3 h or more
  missLookbackDays: 14,     // unfinished miss reviews carry forward at most this long
  flMaxGap: 21,             // full-lengths every 2-3 weeks before the final month
  flFinalOffsets: [28, 21, 14, 7],
};
function dpAddDays(day, n) { const d = new Date(day + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
function dpDiff(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000); }
function dpValidDay(day) { return typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(Date.parse(day + 'T12:00:00Z')) && dpAddDays(day, 0) === day; }

// Full-length offsets (days after plan start): baseline at the end of week 2, then gaps of
// at most 3 weeks, then weekly in the final month with the last one 7 days before the test.
function fullLengthOffsets(totalDays, perWeek) {
  const D = totalDays;
  if (!(D > 3)) return [];
  const slots = DAILY_RULES.flFinalOffsets.map(o => D - o).filter(o => o >= 3);
  const baseline = 7 + Math.min(7, Math.max(1, perWeek)) - 1;  // last study day of week 2
  if (baseline <= D - 7 && (!slots.length || slots[0] > baseline + 3)) {
    const first = slots.length ? slots[0] : D - 7;
    const middle = [];
    if (slots.length) {
      const gap = first - baseline, m = Math.max(0, Math.ceil(gap / DAILY_RULES.flMaxGap) - 1);
      for (let i = 1; i <= m; i++) middle.push(baseline + Math.round((gap * i) / (m + 1)));
    }
    slots.unshift(baseline, ...middle);
  }
  return [...new Set(slots)].sort((a, b) => a - b);
}
// Day types from plan start to test day. Full-length, review and the eve of the test are
// fixed first; each 7-day cycle then gets (7 - study days per week) rest days on its latest
// free dates, so a full-length never lands on a rest day.
function buildCalendar(start, test, perWeek) {
  const D = dpDiff(start, test), week = Math.min(7, Math.max(1, perWeek || 6));
  const types = new Array(Math.max(0, D + 1)).fill(null);
  if (D < 0) return { start, test, D, types, fl: [] };
  const fl = fullLengthOffsets(D, week);
  types[D] = 'test';
  if (D >= 1) types[D - 1] = 'light';
  fl.forEach(o => { types[o] = 'fl'; if (o + 1 < D - 1 && !types[o + 1]) types[o + 1] = 'review'; });
  for (let c = 0; c * 7 < D - 1; c++) {
    const free = [];
    for (let o = c * 7; o < Math.min(c * 7 + 7, D - 1); o++) if (!types[o]) free.push(o);
    free.sort((a, b) => b - a).slice(0, 7 - week).forEach(o => { types[o] = 'rest'; });
  }
  for (let o = 0; o < D - 1; o++) if (!types[o]) types[o] = o < D - DAILY_RULES.finalWindow ? 'study' : 'final';
  return { start, test, D, types, fl };
}
function calendarType(cal, day) { const o = dpDiff(cal.start, day); return o >= 0 && o < cal.types.length ? cal.types[o] : null; }
// Each slot's window runs from shortly before its date until the next slot's window opens,
// so one completion satisfies at most one slot and a missed slot hands off to the next.
function fullLengthSlots(cal, completedDays, labels) {
  const days = cal.fl.map(o => dpAddDays(cal.start, o));
  const opens = days.map((d, i) => i === 0 ? '0000-01-01' : dpAddDays(d, -Math.min(6, Math.floor(dpDiff(days[i - 1], d) / 2))));
  return days.map((day, i) => {
    const close = i + 1 < days.length ? dpAddDays(opens[i + 1], -1) : '9999-12-31';
    const done = completedDays.filter(c => c >= opens[i] && c <= close).sort()[0] || null;
    return { index: i + 1, day, open: opens[i], close, done, label: labels[i] || 'Full-length ' + (i + 1) };
  });
}
function fullLengthLabels(n, appExams, aamcLeft) {
  const finals = Math.min(DAILY_RULES.flFinalOffsets.length, n), early = n - finals;
  const aamc = aamcLeft.slice(0, finals);
  const appPart = appExams.slice(0, Math.max(0, early));
  const out = appPart.slice();
  while (out.length < early) out.push(appExams[out.length] || 'Additional full-length (AAMC Sample Test or a third-party exam)');
  const tail = aamc.slice();
  // If AAMC exams were already used up, the remaining final-month slots take any unused exam.
  const spare = appExams.slice(appPart.length);
  while (tail.length < finals) tail.unshift(spare.shift() || 'Additional full-length (AAMC Sample Test or a third-party exam)');
  return out.concat(tail);
}
// Distribute n items across groups by weight, capped by each group's availability
// (largest remainder; capacity freed by exhausted groups is redistributed).
function allocateByShare(n, weights, available) {
  const out = {}; Object.keys(available).forEach(k => { out[k] = 0; });
  let left = Math.min(n, Object.values(available).reduce((s, x) => s + x, 0));
  while (left > 0) {
    const open = Object.keys(available).filter(k => out[k] < available[k] && (weights[k] || 0) > 0);
    const pool = open.length ? open : Object.keys(available).filter(k => out[k] < available[k]);
    if (!pool.length) break;
    const total = pool.reduce((s, k) => s + (weights[k] || 1), 0);
    const raw = pool.map(k => ({ k, exact: (left * (weights[k] || 1)) / total }));
    let given = 0;
    raw.forEach(r => { const add = Math.min(Math.floor(r.exact), available[r.k] - out[r.k]); out[r.k] += add; given += add; r.rem = r.exact - Math.floor(r.exact); });
    if (!given) { const r = raw.sort((a, b) => b.rem - a.rem || a.k.localeCompare(b.k)).find(r => out[r.k] < available[r.k]); out[r.k]++; given = 1; }
    left -= given;
  }
  return out;
}
const ceilDiv = (a, b) => (a <= 0 ? 0 : Math.ceil(a / Math.max(1, b)));
const factMinutes = n => Math.ceil((n * DAILY_RULES.secondsPerFact) / 60);

/* state (all plain data):
   plan {date, days, minutes, start}
   facts {total, unseen, freshToday}
   passages {appScienceUnseen, appCarsUnseen, firstTodayScience, firstTodayCars, firstTodayOther, externalToday, lastAppCarsDay}
   due, recallMisses [{id, disc, day, answeredDay}], passageMisses [{key, disc, day, reviewedDay}],
   confusedToday, activeDays [day], fullLengths {completed [day], appExams [title], aamcLeft [title], deferred {day:true}, reviewed {completionDay: day}},
   snapshots {day: {type, newQuota, newDone, passQuota, passDone}}, done {stepId: true}, preferredSubject */
function computeDailyPlan(state, today) {
  const plan = state.plan;
  const out = { today, status: 'study', steps: [], notes: [], carry: null, pacing: null, nextFullLength: null, fullLengths: [] };
  if (!plan || !dpValidDay(plan.date)) { out.status = 'no-plan'; out.steps.push({ id: 'set-date', n: 1, title: 'Set your test date to get a daily plan', action: 'plan', count: null, minutes: null, done: false }); return out; }
  const daysLeft = dpDiff(today, plan.date);
  out.daysLeft = daysLeft;
  if (daysLeft < 0) { out.status = 'past'; out.steps.push({ id: 'set-date', n: 1, title: 'Your test date has passed. Update your study plan', action: 'plan', done: false }); return out; }
  if (daysLeft === 0) { out.status = 'test-day'; out.notes.push('Test day. Trust your preparation.'); return out; }
  const start = dpValidDay(plan.start) && plan.start <= today ? plan.start : today;
  const perWeek = Math.min(7, Math.max(1, plan.days || 6)), budget = plan.minutes || 120;
  const cal = buildCalendar(start, plan.date, perWeek), t = dpDiff(start, today);
  const windowStart = cal.D - DAILY_RULES.finalWindow;
  const shortPlan = windowStart <= 0;
  const fls = state.fullLengths || {};
  const completed = (fls.completed || []).filter(dpValidDay).sort();
  const slots = fullLengthSlots(cal, completed, fullLengthLabels(cal.fl.length, fls.appExams || [], fls.aamcLeft || []));
  out.fullLengths = slots;
  out.calendar = cal;
  const hasHistory = (state.activeDays || []).some(d => d < today) || state.facts.unseen < state.facts.total;
  const scheduled = cal.types[t];
  // A slot is due from its date until its window closes; a missed full-length rolls forward.
  const dueSlot = slots.find(s => !s.done && s.day <= today && today <= s.close);
  const nextSlot = dueSlot || slots.find(s => !s.done && s.day > today) || null;
  const doneToday = slots.find(s => s.done === today);
  const lastDone = completed.filter(d => d < today).at(-1);
  const deferred = !!fls.deferred?.[today];
  if (nextSlot) {
    const when = nextSlot.day > today ? nextSlot.day : deferred || scheduled === 'rest' ? dpAddDays(today, 1) : today;
    out.nextFullLength = { ...nextSlot, when, overdue: nextSlot.day < today, reviewDay: dpAddDays(when, 1) };
  }
  let dayType = scheduled;
  if (scheduled === 'light') dayType = 'light';
  else if (doneToday) dayType = 'fl-done';
  else if (dueSlot && !deferred && !(scheduled === 'rest' && dueSlot.day < today)) dayType = 'fl';
  else if (lastDone && lastDone === dpAddDays(today, -1) && !fls.reviewed?.[lastDone]) dayType = 'review';
  else if (scheduled === 'fl' || scheduled === 'review') dayType = t >= windowStart ? 'final' : 'study';
  out.status = dayType;
  const step = (id, title, extra) => out.steps.push({ id, n: out.steps.length + 1, title, ...extra });

  // Remaining new-fact / app-passage days: study days before the final window (rest,
  // full-length and review days excluded). Today counts only if it is a study day.
  const studyAhead = (from, to) => { let n = 0; for (let o = from; o < to; o++) if (cal.types[o] === 'study') n++; return n; };
  const pacingToday = dayType === 'study' || dayType === 'final';
  const newDays = (dayType === 'study' ? 1 : 0) + studyAhead(t + 1, windowStart);
  const finalDays = (() => { let n = 0; for (let o = Math.max(t, windowStart); o < cal.D - 1; o++) if (cal.types[o] === 'final' || (o === t && dayType === 'final')) n++; return Math.max(1, n); })();
  const f = state.facts, p = state.passages;
  const unseenAtStart = Math.min(f.total, f.unseen + f.freshToday);
  const sciAtStart = p.appScienceUnseen + p.firstTodayScience, carsAtStart = p.appCarsUnseen + p.firstTodayCars;
  // Carry-over: an unfinished quota from the last planned study day is added to today, not dropped.
  const snaps = state.snapshots || {};
  const prevSnapDay = Object.keys(snaps).filter(d => d < today && ['study', 'final'].includes(snaps[d].type)).sort().at(-1);
  const prev = prevSnapDay ? snaps[prevSnapDay] : null;
  const carryNew = prev ? Math.min(unseenAtStart, Math.max(0, (prev.newQuota || 0) - (prev.newDone || 0))) : 0;
  const carryPass = prev ? Math.max(0, (prev.passQuota || 0) - (prev.passDone || 0)) : 0;
  let newQuota = 0, appScience = 0, appCars = 0, passageTarget = 0;
  if (pacingToday) {
    if (dayType === 'study') {
      newQuota = Math.min(unseenAtStart, carryNew + ceilDiv(unseenAtStart - carryNew, newDays));
      appScience = ceilDiv(sciAtStart, newDays);
      // Spread the few app CARS passages: one every floor(days / unseen) study days.
      const interval = carsAtStart ? Math.max(1, Math.floor(newDays / carsAtStart)) : Infinity;
      let since = Infinity;
      if (p.lastAppCarsDay) { since = 0; for (let o = Math.max(0, dpDiff(start, p.lastAppCarsDay) + 1); o < t; o++) if (cal.types[o] === 'study') since++; if (p.lastAppCarsDay === today) since = Infinity; }
      appCars = p.firstTodayCars ? p.firstTodayCars : carsAtStart && since + 1 >= interval ? 1 : 0;
      passageTarget = Math.max(DAILY_RULES.normalPassages, appScience + appCars) + carryPass;
    } else {
      // Final window: no new-fact pacing unless coverage is incomplete (and the plan had a content phase).
      newQuota = shortPlan ? 0 : ceilDiv(unseenAtStart, finalDays);
      appScience = ceilDiv(sciAtStart, finalDays); appCars = ceilDiv(carsAtStart, finalDays) ? 1 : 0;
      passageTarget = Math.max(budget >= 180 ? 5 : DAILY_RULES.finalPassages, appScience + appCars);
    }
  }
  if (shortPlan && f.unseen > 0) out.notes.push('Your test is less than ' + DAILY_RULES.finalWindow + ' days away, so there is no new-fact pacing: focus on reviews, timed passages and full-lengths.');
  else if (dayType === 'final' && newQuota) out.notes.push('Final ' + DAILY_RULES.finalWindow + ' days: new facts appear only because bank coverage is incomplete.');
  const passDone = p.firstTodayScience + p.firstTodayCars + (p.firstTodayOther || 0) + p.externalToday;
  out.snapshot = pacingToday ? { type: dayType, newQuota, newDone: f.freshToday, passQuota: passageTarget, passDone } : null;
  out.pacing = { newDays, finalDays, unseenAtStart, newFactsToday: newQuota, appScience, appCars, appPassagesToday: appScience + appCars, passageTarget,
    externalPassages: Math.max(0, passageTarget - appScience - appCars), carsSlot: passageTarget ? 1 : 0, budget, windowStartDay: dpAddDays(start, windowStart) };
  if (carryNew || carryPass) out.carry = { from: prevSnapDay, newFacts: carryNew, passages: carryPass };

  // Misses from the previous study day (not calendar day), plus older ones still unreviewed.
  const prevStudyDay = (state.activeDays || []).filter(d => d < today).sort().at(-1) || null;
  const oldest = dpAddDays(today, -DAILY_RULES.missLookbackDays);
  const pending = (list, doneKey) => list.filter(m => m.day < today && m.day >= oldest && (m.day === prevStudyDay || !m[doneKey] || m[doneKey] <= m.day || m[doneKey] === today));
  const recallPool = pending(state.recallMisses || [], 'answeredDay');
  const passagePool = pending(state.passageMisses || [], 'reviewedDay');
  out.recallPool = recallPool; out.passagePool = passagePool; out.prevStudyDay = prevStudyDay;
  const groups = list => { const g = {}; list.forEach(m => { g[m.disc] = (g[m.disc] || 0) + 1; }); return g; };
  const missRecallStep = () => { const left = recallPool.filter(m => m.answeredDay !== today).length;
    step('recall-misses', "Yesterday's missed recall", { action: 'misses', count: recallPool.length, progress: recallPool.length - left, minutes: factMinutes(left), fullMinutes: factMinutes(recallPool.length), done: left === 0, groups: groups(recallPool), from: prevStudyDay, hidden: !hasHistory }); };
  const missPassageStep = () => { const left = passagePool.filter(m => m.reviewedDay !== today).length;
    step('passage-misses', "Yesterday's missed passage questions", { action: 'passage-misses', count: passagePool.length, progress: passagePool.length - left, minutes: left * DAILY_RULES.minutesPerPassageMiss, fullMinutes: passagePool.length * DAILY_RULES.minutesPerPassageMiss, done: left === 0, groups: groups(passagePool), hidden: !hasHistory, review: true }); };
  const dueStep = optional => step('due', 'Due reviews', { action: 'due', count: state.due, minutes: factMinutes(state.due), fullMinutes: factMinutes(state.due), done: state.due === 0, optional });

  if (dayType === 'light') { out.notes.push('Light review only. Rest and sleep before test day; no new material or full-length.'); dueStep(true); return dpFinish(out, budget); }
  if (dayType === 'fl' || dayType === 'fl-done') {
    const s = dueSlot || doneToday;
    step('full-length', 'Take full-length ' + s.index + ': ' + s.label, { action: 'full-length', slot: s.index, label: s.label, count: 1, minutes: 450, fullMinutes: 450, done: dayType === 'fl-done', overdue: s.day < today });
    out.notes.push('Tomorrow is your review day: go through this exam’s misses, then due reviews only.');
    return dpFinish(out, budget);
  }
  if (dayType === 'review') {
    const s = slots.find(x => x.done === lastDone);
    step('fl-review', 'Review full-length ' + (s ? s.index + ': ' + s.label : '') + ' misses', { action: 'fl-review', slot: s?.index, label: s?.label, completedDay: lastDone, count: 1, minutes: 180, fullMinutes: 180, done: !!state.done?.['fl-review'] });
    dueStep(false);
    out.notes.push('Review day: no new facts or new passages today.');
    return dpFinish(out, budget);
  }
  if (dayType === 'rest') {
    out.notes.push('Rest day. Recovery is part of the plan; nothing new is scheduled.');
    dueStep(true);
    return dpFinish(out, budget);
  }
  missRecallStep();
  missPassageStep();
  dueStep(false);
  step('new-facts', 'New facts', { action: 'new-facts', count: newQuota, progress: Math.min(newQuota, f.freshToday), minutes: factMinutes(Math.max(0, newQuota - f.freshToday)), fullMinutes: factMinutes(newQuota), done: f.freshToday >= newQuota, carry: carryNew });
  step('passages', dayType === 'final' ? 'Timed passages' : 'New passages', { action: 'passages', count: passageTarget, progress: Math.min(passageTarget, passDone), minutes: Math.max(0, passageTarget - passDone) * DAILY_RULES.minutesPerPassage, fullMinutes: passageTarget * DAILY_RULES.minutesPerPassage,
    done: passDone >= passageTarget, appScience, appCars, external: Math.max(0, passageTarget - appScience - appCars), carsOpen: carsAtStart > 0, subject: state.preferredSubject || null, carry: carryPass, timed: dayType === 'final' });
  step('closeout', 'Close-out: compare today’s mix-ups', { action: 'closeout', count: state.confusedToday || 0, minutes: (state.confusedToday || 0) * DAILY_RULES.minutesPerPair, fullMinutes: (state.confusedToday || 0) * DAILY_RULES.minutesPerPair, done: !!state.done?.closeout || false, waiting: !state.confusedToday, hidden: !hasHistory });
  return dpFinish(out, budget);
}
function dpFinish(out, budget) {
  out.steps = out.steps.filter(s => !s.hidden);
  out.steps.forEach((s, i) => { s.n = i + 1; });
  const required = out.steps.filter(s => !s.optional && s.id !== 'full-length' && s.id !== 'fl-review');
  out.estimate = required.reduce((n, s) => n + (s.fullMinutes || 0), 0);
  out.remaining = out.steps.filter(s => !s.done && !s.optional).reduce((n, s) => n + (s.minutes || 0), 0);
  // Never shrink quotas below what finishes the bank; report the gap instead.
  out.behindMinutes = ['study', 'final'].includes(out.status) ? Math.max(0, out.estimate - budget) : 0;
  out.allDone = out.steps.length > 0 && out.steps.filter(s => !s.optional).every(s => s.done);
  return out;
}

// ════════════════════════════════════════════════════════════════
//  Browser wrapper: gathers state from storage and renders the card.
// ════════════════════════════════════════════════════════════════
const FL_MINUTES_NOTE = 'about 7.5 h with breaks';
function dailyPlanStore() { const s = store.get(KEYS.dailyPlan, {}); return { days: s.days || {}, passageReviews: s.passageReviews || {}, fullLengths: s.fullLengths || [], deferred: s.deferred || {}, reviewed: s.reviewed || {} }; }
function saveDailyPlanStore(s) {
  const recent = obj => Object.fromEntries(Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0])).slice(-90));
  store.set(KEYS.dailyPlan, { days: recent(s.days), passageReviews: Object.fromEntries(Object.entries(s.passageReviews).slice(-500)), fullLengths: s.fullLengths.slice(-50), deferred: recent(s.deferred), reviewed: recent(s.reviewed) });
}
function appPracticePassages() { return ALL_PASSAGES.filter(p => !EXAM_PASSAGE_IDS.has(p.id) && p.questions.length); }
function passageSeen(p, exposures, legacy) { return !!exposures[p.id] || !!legacy[p.id]?.attempts; }
function resolvePassageMiss(e) {
  const m = /^(.+)#(\d+)$/.exec(String(e.id || ''));
  const p = m && PASSAGE_BY_ID.get(m[1]), q = p && p.questions[+m[2]];
  return q ? { p, q } : null;
}
function fullLengthCompletions(start) {
  const days = [];
  store.get(KEYS.examHistory, []).forEach(x => { if (x.total != null && Number.isFinite(x.date)) days.push(localDay(new Date(x.date))); });
  officialScores().forEach(x => days.push(x.date));
  const diag = store.get(KEYS.diagnostic, null); if (diag?.date) days.push(diag.date);
  dailyPlanStore().fullLengths.forEach(x => days.push(x.day));
  return days.filter(d => dpValidDay(d) && (!start || d >= start)).sort();
}
function dailyPlanState(today = localDay()) {
  const plan = store.get(KEYS.plan, null), mem = loadMem(), ds = dailyPlanStore();
  const recall = recallToday();
  const unseen = QB.filter(q => !mem[q.id]?.seen).length;
  const exposures = store.get(KEYS.exposures, {}), legacy = store.get(KEYS.passages, {});
  const practice = appPracticePassages();
  const isCars = p => disciplineOfPassage(p) === 'cars';
  const unseenPractice = practice.filter(p => !passageSeen(p, exposures, legacy));
  const firstToday = store.get(KEYS.passageEvidence, []).filter(r => r.first && localDay(new Date(r.t)) === today);
  const practiceIds = new Set(practice.map(p => p.id));
  const carsFirst = practice.filter(isCars).map(p => exposures[p.id]?.firstAt).filter(Number.isFinite).sort((a, b) => a - b).at(-1);
  const external = store.get(KEYS.externalPassages, []).filter(x => x.day === today && x.first);
  const errors = store.get(KEYS.errors, []);
  const latest = new Map();
  errors.forEach(e => { if ((e.src === 'recall' || (e.src === 'mini' && e.key)) && QB_BY_ID.has(e.id)) latest.set(e.id, e); });
  const recallMisses = [...latest.values()].map(e => ({ id: e.id, disc: disciplineOfRecall(QB_BY_ID.get(e.id)), day: localDay(new Date(e.t)), answeredDay: mem[e.id]?.last ? localDay(new Date(mem[e.id].last)) : null, t: e.t }));
  const passageMisses = errors.filter(e => e.src === 'passage' && resolvePassageMiss(e)).map(e => {
    const key = e.t + ':' + e.id, r = ds.passageReviews[key];
    return { key, id: e.id, disc: e.disc || disciplineOfPassage(resolvePassageMiss(e).p), day: localDay(new Date(e.t)), reviewedDay: r?.day || null, t: e.t };
  });
  const todayPairs = new Set(errors.filter(e => e.type === 'confused' && localDay(new Date(e.t)) === today && typeof e.chosen === 'string' && typeof e.answer === 'string').map(e => [e.chosen, e.answer].map(normTerm).sort().join('|')));
  const activeDays = Object.entries(store.get(KEYS.daily, {})).filter(([, n]) => n > 0).map(([d]) => d);
  errors.forEach(e => activeDays.push(localDay(new Date(e.t))));
  const start = plan && dpValidDay(plan.start) ? plan.start : today;
  const appDone = new Set(store.get(KEYS.examHistory, []).filter(x => x.total != null && localDay(new Date(x.date)) < start).map(x => x.examId));
  const officialBefore = officialScores().filter(x => x.date < start).length;
  const weak = learningNeeds().weak.find(w => w.subj !== 'research' && subjectPassages(w.subj).some(p => !passageSeen(p, exposures, legacy)));
  return {
    plan, due: dueQuestions().length, confusedToday: todayPairs.size,
    facts: { total: QB.length, unseen, freshToday: recall.fresh },
    passages: { appScienceUnseen: unseenPractice.filter(p => !isCars(p)).length, appCarsUnseen: unseenPractice.filter(isCars).length,
      firstTodayScience: firstToday.filter(r => practiceIds.has(r.id) && r.disc !== 'cars').length, firstTodayCars: firstToday.filter(r => practiceIds.has(r.id) && r.disc === 'cars').length,
      firstTodayOther: firstToday.filter(r => !practiceIds.has(r.id)).length, externalToday: external.length, lastAppCarsDay: carsFirst ? localDay(new Date(carsFirst)) : null },
    recallMisses, passageMisses, activeDays: [...new Set(activeDays)],
    fullLengths: { completed: fullLengthCompletions(start), appExams: FULL_EXAMS.filter(e => !appDone.has(e.id)).map(e => e.title + ' (this app)'),
      aamcLeft: [1, 2, 3, 4].slice(officialBefore).map(n => 'AAMC Practice Exam ' + n + ' (aamc.org)'), deferred: ds.deferred, reviewed: ds.reviewed },
    snapshots: pastProgress(ds.days, today), done: ds.days[today]?.done || {}, preferredSubject: weak?.subj || null,
  };
}
// Past snapshots keep their quotas; their completed counts come from the study records,
// so work finished after the last time the card was shown still counts.
function pastProgress(days, today) {
  const recallDays = store.get(KEYS.recallDays, {}), evidence = store.get(KEYS.passageEvidence, []), external = store.get(KEYS.externalPassages, []);
  return Object.fromEntries(Object.entries(days).map(([day, row]) => {
    if (day >= today) return [day, row];
    const passDone = evidence.filter(r => r.first && localDay(new Date(r.t)) === day).length + external.filter(x => x.first && x.day === day).length;
    return [day, { ...row, newDone: Math.max(row.newDone || 0, recallDays[day]?.newIds?.length || 0), passDone: Math.max(row.passDone || 0, passDone) }];
  }));
}
function currentDailyPlan() {
  const today = localDay(), state = dailyPlanState(today), plan = computeDailyPlan(state, today);
  if (plan.snapshot) {
    const ds = dailyPlanStore(), row = ds.days[today] || {};
    const next = { ...row, ...plan.snapshot };
    if (JSON.stringify(next) !== JSON.stringify(row)) { ds.days[today] = next; saveDailyPlanStore(ds); }
  }
  plan.state = state;
  return plan;
}
function markDailyStep(id) { const ds = dailyPlanStore(), today = localDay(); ds.days[today] = ds.days[today] || {}; ds.days[today].done = { ...(ds.days[today].done || {}), [id]: true }; saveDailyPlanStore(ds); }

// ── Step launchers ──
function startYesterdayMisses() {
  const p = currentDailyPlan();
  const order = Object.keys(DISCIPLINES);
  const qs = p.recallPool.filter(m => m.answeredDay !== localDay()).sort((a, b) => order.indexOf(a.disc) - order.indexOf(b.disc)).map(m => QB_BY_ID.get(m.id)).filter(Boolean);
  if (qs.length) beginQuiz(qs, 'Yesterday’s missed recall');
}
function startDailyNewFacts() {
  const p = currentDailyPlan(), s = p.steps.find(x => x.id === 'new-facts');
  const n = Math.min(60, Math.max(0, (s?.count || 0) - (s?.progress || 0)));
  if (!n) return;
  const mem = loadMem(), unseen = QB.filter(q => !mem[q.id]?.seen);
  // Weak topics first, then the remainder weighted by MCAT content share (disciplineYield).
  const weakKeys = new Set(learningNeeds().weak.map(w => w.k).concat(weakTopicNeeds(store.get(KEYS.mastery, {})).slice(0, 6).map(w => w.k)));
  const first = shuffled(unseen.filter(q => weakKeys.has(q.key))).slice(0, Math.ceil(n / 3));
  const taken = new Set(first.map(q => q.id)), pools = {};
  unseen.filter(q => !taken.has(q.id)).forEach(q => { const d = disciplineOfRecall(q); (pools[d] = pools[d] || []).push(q); });
  const weights = Object.fromEntries(Object.keys(pools).map(d => [d, Math.max(0.05, disciplineYield(d))]));
  const counts = allocateByShare(n - first.length, weights, Object.fromEntries(Object.entries(pools).map(([d, a]) => [d, a.length])));
  const rest = Object.entries(counts).flatMap(([d, c]) => pickQuestions(pools[d], c));
  beginQuiz(interleave([...first, ...rest].map(q => ({ q, reason: 'new' }))), 'Today’s new facts');
}
function dailyPassageSubject(plan, cars) {
  const exposures = store.get(KEYS.exposures, {}), legacy = store.get(KEYS.passages, {});
  const fresh = s => subjectPassages(s).some(p => !passageSeen(p, exposures, legacy));
  if (cars) return fresh('cars') ? 'cars' : null;
  const pref = plan.state?.preferredSubject;
  if (pref && pref !== 'cars' && fresh(pref)) return pref;
  const ranked = Object.keys(DISCIPLINES).filter(s => s !== 'cars' && subjectPassages(s).length && fresh(s)).map(s => ({ s, p: pathRecommendation(s) }));
  return ranked[0]?.s || null;
}
function startDailyPassage(cars) {
  const subj = dailyPassageSubject(currentDailyPlan(), cars);
  if (subj) startSubjectWork(subj, 'passage');
}
function logExternalPassage() {
  const subj = $('ext-subj').value, n = Number($('ext-n').value), correct = Number($('ext-correct').value), source = $('ext-source').value, first = $('ext-first').checked;
  if (!DISCIPLINES[subj] || !Number.isInteger(n) || n < 1 || n > 15 || !Number.isInteger(correct) || correct < 0 || correct > n) { $('ext-error').textContent = 'Enter 1–15 questions and a correct count no higher than that.'; return; }
  const rows = store.get(KEYS.externalPassages, []);
  rows.push({ t: Date.now(), day: localDay(), subj, source: ['aamc-sb', 'aamc-qp', 'uworld', 'other'].includes(source) ? source : 'other', n, correct, first });
  store.set(KEYS.externalPassages, rows.slice(-1000));
  renderHome();
}
function startPassageMissReview() {
  const plan = currentDailyPlan();
  show('screen-results');
  const items = plan.passagePool.map(m => ({ m, r: resolvePassageMiss(m) })).filter(x => x.r);
  const errors = store.get(KEYS.errors, []);
  $('results-body').innerHTML = '<div class="results-hero"><div class="r-label">Review missed passage questions</div></div><div class="results-card"><p>Reread the passage and explanation, then write one line on why the right answer is right. This review is not scored and does not count as a first exposure.</p></div>' +
    items.map(({ m, r }, i) => {
      const e = errors.find(x => x.t + ':' + x.id === m.key), saved = dailyPlanStore().passageReviews[m.key];
      const ans = r.q.choices[r.q.ans];
      return '<div class="results-card"><details><summary>Passage: ' + esc(r.p.title) + '</summary>' + passageCard(r.p.topic || '', r.p.title, r.p.passage, r.p.figure) + '</details><div class="question-text">' + fmt(r.q.q) + '</div>' +
        '<p>Your answer: ' + fmt(e?.chosen ?? '—') + '<br><b>Correct: ' + fmt(ans) + '</b></p>' + paragraphs(r.q.exp) +
        '<label class="explain-it">Explain it: in one sentence, why is the right answer right?<textarea id="pm-note-' + i + '" rows="2" maxlength="300">' + esc(saved?.note || e?.note || '') + '</textarea></label>' +
        '<button class="micro-btn" onclick="savePassageMissNote(' + i + ',&quot;' + esc(m.key) + '&quot;)">' + (m.reviewedDay === localDay() ? '✓ Saved · update' : 'Save note') + '</button> <span id="pm-msg-' + i + '" role="status"></span></div>';
    }).join('') + '<div class="btn-row"><button class="new-quiz-btn secondary" onclick="goHome()">Back to today’s plan</button></div>';
}
function savePassageMissNote(i, key) {
  const note = ($('pm-note-' + i).value || '').trim().slice(0, 300);
  if (!note) { $('pm-msg-' + i).textContent = 'Write one line first.'; return; }
  const ds = dailyPlanStore(); ds.passageReviews[key] = { day: localDay(), note }; saveDailyPlanStore(ds);
  // Reuse the mistake log's existing "Explain it" note field.
  const log = store.get(KEYS.errors, []), e = log.find(x => x.t + ':' + x.id === key);
  if (e) { e.note = note; store.set(KEYS.errors, log); }
  $('pm-msg-' + i).textContent = '✓ Saved';
}
function startDailyCloseout() { markDailyStep('closeout'); showConfusionReview(); }
function startPlannedFullLength() {
  const p = currentDailyPlan(), s = p.steps.find(x => x.id === 'full-length');
  const ei = FULL_EXAMS.findIndex(e => s?.label?.startsWith(e.title));
  if (ei >= 0) startExam(ei); else showOfficialScores();
}
function logExternalFullLength() {
  if (!confirm('Record that you completed a full-length outside this app today? For AAMC scored exams, also record the section scores under Official results.')) return;
  const ds = dailyPlanStore(); ds.fullLengths.push({ day: localDay(), t: Date.now() }); saveDailyPlanStore(ds); renderHome();
}
function deferFullLength() { const ds = dailyPlanStore(); ds.deferred[localDay()] = true; saveDailyPlanStore(ds); renderHome(); }
function startFullLengthReview() {
  const p = currentDailyPlan(), s = p.steps.find(x => x.id === 'fl-review');
  const ei = FULL_EXAMS.findIndex(e => s?.label?.startsWith(e.title));
  if (ei >= 0 && store.get(KEYS.examLast(FULL_EXAMS[ei].id), null)) openLastExamReview(ei);
  else alert('Review this exam in the platform where you took it: reread every miss and guess, and label why you missed it.');
}
function completeFullLengthReview() {
  const p = currentDailyPlan(), s = p.steps.find(x => x.id === 'fl-review');
  const ds = dailyPlanStore(); if (s?.completedDay) ds.reviewed[s.completedDay] = localDay(); saveDailyPlanStore(ds); markDailyStep('fl-review'); renderHome();
}

// ── Rendering ──
const shortDay = day => new Date(day + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
function dailyStepHtml(s, plan) {
  const groupText = s.groups && Object.keys(s.groups).length ? Object.entries(s.groups).map(([d, n]) => esc(DISCIPLINES[d] || d) + ' ' + n).join(' · ') : '';
  const count = s.count == null || (!s.count && (s.done || s.waiting)) ? '' : s.progress != null ? s.progress + ' / ' + s.count : String(s.count);
  let detail = '', button = '';
  const btn = (label, fn, primary = true) => '<button class="' + (primary ? 'new-quiz-btn' : 'micro-btn') + ' today-start" onclick="' + fn + '">' + label + '</button>';
  switch (s.id) {
    case 'set-date': button = btn('Set test date', 'showPlan()'); break;
    case 'recall-misses': detail = s.count ? (groupText + (s.from ? ' · from ' + shortDay(s.from) : '')) : 'No recall misses from your last study day.'; if (!s.done) button = btn('Start', 'startYesterdayMisses()'); break;
    case 'passage-misses': detail = s.count ? groupText + ' · review only: not scored, not a first exposure' : 'No passage misses to review.'; if (!s.done) button = btn('Start review', 'startPassageMissReview()'); break;
    case 'due': detail = s.optional ? 'Optional today.' : 'Spaced-review cards whose recall chance has dropped below 90%.'; if (s.count) button = btn('Start', 'startDueReview()', !s.optional); break;
    case 'new-facts': detail = s.count ? 'Weak topics first, then weighted by MCAT content share' + (s.carry ? ' · includes ' + s.carry + ' carried over' : '') : 'No new facts scheduled today.'; if (!s.done) button = btn('Start', 'startDailyNewFacts()'); break;
    case 'passages': {
      const st = plan.state || {}, carsLeft = st.passages?.appCarsUnseen;
      detail = (s.timed ? 'Timed. ' : '') + '1 CARS + ' + Math.max(0, s.count - 1) + ' science. App today: ' + s.appScience + ' science' + (s.appCars ? ' + 1 CARS' : '') + (s.external ? ' · external: ' + s.external + (carsLeft === 0 ? ' (incl. CARS: app CARS used up)' : !s.appCars ? ' (incl. CARS: app CARS spaced out)' : '') : '') + (s.subject ? ' · prefer ' + esc(DISCIPLINES[s.subject]) : '') + (s.carry ? ' · includes ' + s.carry + ' carried over' : '') + '. Only first exposures count.';
      if (!s.done) button = (s.appScience || dailyPassageSubject(plan, false) ? btn('Start science passage', 'startDailyPassage(false)') : '') + (s.appCars || (s.carsOpen && !s.external) ? ' ' + btn('Start CARS passage', 'startDailyPassage(true)', false) : '');
      button += externalLoggerHtml();
      break;
    }
    case 'closeout': detail = s.waiting ? 'Appears once you mark a miss as “Mixed it up” today.' : 'X vs. Y comparisons for today’s mix-ups.'; if (s.count && !s.done) button = btn('Compare', 'startDailyCloseout()'); break;
    case 'full-length': detail = (s.overdue ? 'Rolled forward from a missed date. ' : '') + FL_MINUTES_NOTE + '. Take it timed, in one sitting.'; if (!s.done) button = btn('Start full-length', 'startPlannedFullLength()') + ' <button class="micro-btn" onclick="logExternalFullLength()">I took it outside the app</button> <button class="text-btn" onclick="deferFullLength()">Not today</button>'; break;
    case 'fl-review': detail = 'Go through every miss and guess, label why, then do due reviews only.'; if (!s.done) button = btn('Open review', 'startFullLengthReview()') + ' <button class="micro-btn" onclick="completeFullLengthReview()">Mark review complete</button>'; break;
  }
  const mins = s.minutes && !s.done ? '<span class="today-min">~' + s.minutes + ' min</span>' : '';
  return '<li class="today-step' + (s.done ? ' done' : '') + '" data-step="' + s.id + '"><span class="today-num" aria-hidden="true">' + (s.done ? '✓' : s.n) + '</span><div class="today-body"><div class="today-title"><b>' + esc(s.title) + '</b>' + (count ? ' <span class="today-count">' + count + '</span>' : '') + mins + (s.done ? ' <span class="today-ok">✓ done</span>' : '') + '</div>' + (detail ? '<p class="muted-note">' + detail + '</p>' : '') + (button ? '<div class="btn-row">' + button + '</div>' : '') + '</div></li>';
}
function externalLoggerHtml() {
  const subjects = ['cars', 'biology', 'biochemistry', 'gen_chem', 'organic_chem', 'physics', 'psych_soc'];
  return '<details class="today-ext"><summary>I did an external passage</summary><div class="today-ext-form"><label>Subject <select id="ext-subj">' + subjects.map(s => '<option value="' + s + '">' + esc(DISCIPLINES[s]) + '</option>').join('') + '</select></label>' +
    '<label>Source <select id="ext-source"><option value="aamc-sb">AAMC Section Bank</option><option value="aamc-qp">AAMC Question Pack</option><option value="uworld">UWorld</option><option value="other">Other</option></select></label>' +
    '<label># questions <input id="ext-n" type="number" min="1" max="15" value="6"></label><label># correct <input id="ext-correct" type="number" min="0" max="15" value="4"></label>' +
    '<label class="today-check"><input id="ext-first" type="checkbox" checked> First time seeing this passage</label><button class="micro-btn" onclick="logExternalPassage()">Log passage</button><p id="ext-error" role="alert" class="muted-note"></p><p class="muted-note">Repeat passages are logged but do not count toward today’s target.</p></div></details>';
}
function dailyPlanCard() {
  const plan = currentDailyPlan();
  const head = '<div class="today-head"><div><div class="section-label">TODAY › Start here</div><div class="today-date">' + shortDay(plan.today) + (plan.daysLeft != null && plan.daysLeft >= 0 ? ' · <b>' + plan.daysLeft + '</b> day' + (plan.daysLeft === 1 ? '' : 's') + ' to the MCAT' : '') + '</div></div>' + (plan.status !== 'no-plan' ? '<button class="text-btn" onclick="showPlan()">Edit calendar</button>' : '') + '</div>';
  const kind = { study: '', final: 'Final ' + DAILY_RULES.finalWindow + ' days: review and timed practice', rest: 'Rest day', light: 'Day before the test', fl: 'Full-length day', 'fl-done': 'Full-length day', review: 'Full-length review day', 'test-day': 'Test day' }[plan.status] || '';
  const behind = plan.behindMinutes ? '<div class="advice today-behind" role="status"><b>Behind pace: +' + plan.behindMinutes + ' min/day needed</b> (today ≈ ' + plan.estimate + ' min vs. your ' + plan.pacing.budget + ' min), or move your test date. Steps 1–3 stay intact and the new-fact and passage quotas stay at the pace that finishes the bank on time.</div>' : '';
  const carry = plan.carry ? '<div class="today-carry">↻ <b>Carried over</b> from ' + shortDay(plan.carry.from) + ': ' + [plan.carry.newFacts ? plan.carry.newFacts + ' new facts' : '', plan.carry.passages ? plan.carry.passages + ' passage' + (plan.carry.passages === 1 ? '' : 's') : ''].filter(Boolean).join(' · ') + ' (added to steps below)</div>' : '';
  const notes = plan.notes.map(n => '<p class="muted-note">' + esc(n) + '</p>').join('');
  const steps = plan.steps.length ? '<ol class="today-steps">' + plan.steps.map(s => dailyStepHtml(s, plan)).join('') + '</ol>' : '';
  const fl = plan.nextFullLength && plan.status !== 'fl' && plan.status !== 'fl-done' ? '<div class="today-fl"><b>Next full-length:</b> ' + (plan.nextFullLength.overdue ? 'overdue · ' : '') + shortDay(plan.nextFullLength.when) + ' · Full-length ' + plan.nextFullLength.index + ': ' + esc(plan.nextFullLength.label) + '<br><span class="muted-note">The following day (' + shortDay(plan.nextFullLength.reviewDay) + ') is its review day.</span></div>' : '';
  const pace = plan.pacing && plan.status === 'final' ? '<p class="muted-note today-pace">Final window: ' + (plan.state.facts.unseen ? plan.state.facts.unseen.toLocaleString() + ' unseen facts still to cover' : 'bank coverage complete, so no new facts') + '; ' + plan.pacing.passageTarget + ' timed passages a day and a weekly full-length. Unseen app passages: ' + (plan.state.passages.appScienceUnseen + plan.state.passages.appCarsUnseen) + '; the rest come from external sources.' + (plan.remaining ? ' About ' + plan.remaining + ' min left today.' : '') + '</p>' : plan.pacing && plan.status === 'study' ? '<p class="muted-note today-pace">Pacing: ' + plan.state.facts.unseen.toLocaleString() + ' unseen facts over ' + plan.pacing.newDays + ' new-fact day' + (plan.pacing.newDays === 1 ? '' : 's') + ' before ' + shortDay(plan.pacing.windowStartDay) + '; ' + (plan.state.passages.appScienceUnseen + plan.state.passages.appCarsUnseen) + ' unseen app passages. Rest, full-length and review days are excluded; missed days roll forward. Estimates assume ~' + DAILY_RULES.secondsPerFact + ' s per fact and ~' + DAILY_RULES.minutesPerPassage + ' min per passage.' + (plan.remaining ? ' About ' + plan.remaining + ' min left today.' : '') + '</p>' : '';
  const done = plan.allDone && ['study', 'final'].includes(plan.status) ? '<p class="today-alldone">✓ Today’s plan is complete. Anything more is optional.</p>' : '';
  return head + (kind ? '<div class="today-kind">' + kind + '</div>' : '') + behind + notes + carry + steps + done + fl + pace;
}
function renderDailyPlan() { const el = $('today-plan'); if (el) el.innerHTML = dailyPlanCard(); }
