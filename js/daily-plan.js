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
  flMax: 6,                 // AAMC Sample Test + 1 app exam + AAMC Practice Exams 1-4
  flFinalOffsets: [28, 21, 14, 7],
};
function dpAddDays(day, n) { const d = new Date(day + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
function dpDiff(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000); }
function dpValidDay(day) { return typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(Date.parse(day + 'T12:00:00Z')) && dpAddDays(day, 0) === day; }

// Full-length offsets (days after plan start), capped at DAILY_RULES.flMax (the 4 AAMC
// practice exams, the AAMC Sample Test and one app exam): a baseline diagnostic at the end of
// week 2, one mid-plan exam halfway to the final month (gaps stretch past 3 weeks on long
// plans rather than adding exams), then weekly in the final month, the last 7 days before the test.
function fullLengthOffsets(totalDays, perWeek) {
  const D = totalDays;
  if (!(D > 3)) return [];
  const slots = DAILY_RULES.flFinalOffsets.map(o => D - o).filter(o => o >= 3);
  const baseline = 7 + Math.min(7, Math.max(1, perWeek)) - 1;  // last study day of week 2
  if (baseline <= D - 7 && (!slots.length || slots[0] > baseline + 3)) {
    const first = slots.length ? slots[0] : D - 7, room = DAILY_RULES.flMax - slots.length - 1;
    // One mid-plan exam when both resulting gaps are at least two weeks.
    const middle = slots.length && room > 0 && first - baseline >= 28 ? [baseline + Math.round((first - baseline) / 2)] : [];
    slots.unshift(baseline, ...middle);
  }
  return [...new Set(slots)].sort((a, b) => a - b).slice(-DAILY_RULES.flMax);
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
// Early slots take the AAMC Sample Test (baseline diagnostic) and then an app exam; the final
// month takes AAMC Practice Exams 1-4. Exams already used before the plan started are skipped.
const FL_FALLBACK = 'Third-party full-length (all AAMC exams already used)';
function fullLengthLabels(n, pools) {
  const finals = Math.min(DAILY_RULES.flFinalOffsets.length, n), early = n - finals;
  const earlyPool = [pools.sample, ...(pools.appExams || [])].filter(Boolean), finalPool = (pools.aamcLeft || []).slice();
  const head = earlyPool.splice(0, early), tail = finalPool.splice(0, finals);
  while (tail.length < finals) tail.unshift(earlyPool.shift() || FL_FALLBACK);
  while (head.length < early) head.push(finalPool.shift() || FL_FALLBACK);
  return { labels: head.concat(tail), extras: earlyPool.concat(finalPool) };
}
const ceilDiv = (a, b) => (a <= 0 ? 0 : Math.ceil(a / Math.max(1, b)));
const factMinutes = n => Math.ceil((n * DAILY_RULES.secondsPerFact) / 60);

/* state (all plain data):
   plan {date, days, minutes, start}
   facts {total, unseen, freshToday}
   passages {appScienceUnseen, appCarsUnseen, firstTodayScience, firstTodayCars, firstTodayOther, externalToday, lastAppCarsDay}
   due, recallMisses [{id, disc, day, answeredDay}], passageMisses [{key, disc, day, reviewedDay}],
   confusedToday, activeDays [day], fullLengths {completed [day], sample title|null, appExams [title], aamcLeft [title], deferred {day:true}, reviewed {completionDay: day}},
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
  // Fewer than 7 study days before the final window cannot absorb the bank (it would ask for
  // hundreds of new facts a day); treat it like a test under 21 days away.
  let contentStudyDays = 0;
  for (let o = 0; o < windowStart; o++) if (cal.types[o] === 'study') contentStudyDays++;
  const shortPlan = contentStudyDays < 7;
  const fls = state.fullLengths || {};
  const completed = (fls.completed || []).filter(dpValidDay).sort();
  const lineup = fullLengthLabels(cal.fl.length, fls);
  const slots = fullLengthSlots(cal, completed, lineup.labels);
  out.fullLengths = slots; out.optionalFullLengths = lineup.extras;
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
  let finalDays = 0;
  for (let o = Math.max(t, windowStart); o < cal.D - 1; o++) if (cal.types[o] === 'final') finalDays++;
  finalDays = Math.max(1, finalDays);
  const f = state.facts, p = state.passages;
  const unseenAtStart = Math.min(f.total, f.unseen + f.freshToday);
  const sciAtStart = p.appScienceUnseen + p.firstTodayScience, carsAtStart = p.appCarsUnseen + p.firstTodayCars;
  // Carry-over: an unfinished quota from the last planned study day is added to today, not dropped.
  const snaps = state.snapshots || {};
  const prevSnapDay = Object.keys(snaps).filter(d => d < today && d >= dpAddDays(today, -7) && ['study', 'final'].includes(snaps[d]?.type)).sort().at(-1);
  const prev = prevSnapDay ? snaps[prevSnapDay] : null;
  const carries = prev && dayType === 'study' && !shortPlan;
  const num = v => (Number.isFinite(v) ? v : 0);
  const carryNew = carries ? Math.min(unseenAtStart, Math.max(0, num(prev.newQuota) - num(prev.newDone))) : 0;
  const carryPass = carries ? Math.min(DAILY_RULES.normalPassages, Math.max(0, num(prev.passQuota) - num(prev.passDone))) : 0;
  let newQuota = 0, appScience = 0, appCars = 0, passageTarget = 0;
  if (pacingToday) {
    if (dayType === 'study') {
      newQuota = shortPlan ? 0 : Math.min(unseenAtStart, carryNew + ceilDiv(unseenAtStart - carryNew, newDays));
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
      passageTarget = budget >= 180 ? 5 : DAILY_RULES.finalPassages;
      appCars = carsAtStart ? 1 : 0;
      appScience = Math.min(passageTarget - appCars, ceilDiv(sciAtStart, finalDays));
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
    step('full-length', 'Take full-length ' + s.index + ': ' + s.label, { action: 'full-length', slot: s.index, label: s.label, count: null, minutes: 450, fullMinutes: 450, done: dayType === 'fl-done', overdue: s.day < today });
    out.notes.push('Tomorrow is your review day: go through this exam’s misses, then due reviews only.');
    return dpFinish(out, budget);
  }
  if (dayType === 'review') {
    const s = slots.find(x => x.done === lastDone);
    step('fl-review', 'Review full-length ' + (s ? s.index + ': ' + s.label : '') + ' misses', { action: 'fl-review', slot: s?.index, label: s?.label, completedDay: lastDone, count: null, minutes: 180, fullMinutes: 180, done: !!state.done?.['fl-review'] });
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

const AAMC_SAMPLE_LABEL = 'AAMC Sample Test: baseline diagnostic (aamc.org)';
// Synced data may come from another device; accept only the expected shapes.
const dpObject = v => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
function dailyPlanStore() {
  const s = store.get(KEYS.dailyPlan, {});
  const days = Object.fromEntries(Object.entries(dpObject(s.days)).filter(([d, row]) => dpValidDay(d) && row && typeof row === 'object'));
  return { days, passageReviews: dpObject(s.passageReviews), fullLengths: Array.isArray(s.fullLengths) ? s.fullLengths.filter(x => dpValidDay(x?.day)) : [], deferred: dpObject(s.deferred), reviewed: dpObject(s.reviewed) };
}
function fullLengthCompletions(start) {
  const days = [];
  store.get(KEYS.examHistory, []).forEach(x => { if (Number.isFinite(x.total) && Number.isFinite(x.date)) days.push(localDay(new Date(x.date))); });
  officialScores().forEach(x => days.push(x.date));
  const diag = store.get(KEYS.diagnostic, null); if (diag?.date) days.push(diag.date);
  dailyPlanStore().fullLengths.forEach(x => days.push(x.day));
  return days.filter(d => dpValidDay(d) && (!start || d >= start)).sort();
}
// The test-date card needs only the full-length calendar: build it from the test date and the full-length
// history, without the recall, passage and past-progress scans of the full plan state.
function calendarPlanState(today = localDay()) {
  const plan = store.get(KEYS.plan, null), ds = dailyPlanStore();
  const start = plan && dpValidDay(plan.start) && plan.start <= today ? plan.start : today;
  const appDone = new Set(store.get(KEYS.examHistory, []).filter(x => Number.isFinite(x.total) && Number.isFinite(x.date) && localDay(new Date(x.date)) < start).map(x => x.examId));
  const official = officialScores(), officialBefore = official.filter(x => x.date < start && !/sample/i.test(x.form)).length;
  return {
    plan, due: 0, confusedToday: 0, facts: { total: 0, unseen: 0, freshToday: 0 },
    passages: { appScienceUnseen: 0, appCarsUnseen: 0, firstTodayScience: 0, firstTodayCars: 0, firstTodayOther: 0, externalToday: 0, lastAppCarsDay: null },
    recallMisses: [], passageMisses: [], activeDays: [],
    fullLengths: { completed: fullLengthCompletions(start), sample: official.some(x => x.date < start && /sample/i.test(x.form)) ? null : AAMC_SAMPLE_LABEL, appExams: FULL_EXAMS.filter(e => !appDone.has(e.id)).map(e => e.title + ' (this app)'),
      aamcLeft: [1, 2, 3, 4].slice(officialBefore).map(n => 'AAMC Practice Exam ' + n + ' (aamc.org)'), deferred: ds.deferred, reviewed: ds.reviewed },
    snapshots: {}, done: ds.days[today]?.done || {}, preferredSubject: null,
  };
}
let calendarMemo = null;
function calendarDailyPlan() {
  const today = localDay(), rev = store.rev || 0;
  if (calendarMemo && calendarMemo.today === today && calendarMemo.rev === rev) return calendarMemo.plan;
  const plan = computeDailyPlan(calendarPlanState(today), today);
  calendarMemo = { today, rev, plan };
  return plan;
}


// ── Rendering ──
const shortDay = day => new Date(day + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
// Below the Section Mastery plan: only the test date and the full-length calendar. The older all-subject daily
// plan (dailyPlanCard: due reviews, new-fact quotas, passage quotas, pace warnings) no longer shows on TODAY;
// the mastery plan replaces it.
function testDateCard() {
  const plan = calendarDailyPlan();
  if (plan.status === 'no-plan') return '<div class="today-head"><div><div class="section-label">Test date &amp; full-length calendar</div></div></div><p class="muted-note">Set your MCAT date to schedule your full-length practice exams.</p><button class="micro-btn" data-click="showPlan()">Set test date</button>';
  const head = '<div class="today-head"><div><div class="today-date">' + shortDay(plan.today) + (plan.daysLeft != null && plan.daysLeft >= 0 ? ' · <b>' + plan.daysLeft + '</b> day' + (plan.daysLeft === 1 ? '' : 's') + ' to the MCAT' : '') + '</div></div><button class="text-btn" data-click="showPlan()">Edit calendar</button></div>';
  const kind = { fl: 'Today is a full-length day: take the scheduled exam instead of the daily plan.', 'fl-done': 'Full-length done today.', review: 'Full-length review day: go over yesterday’s exam before the daily plan.', 'test-day': 'Test day. Trust your preparation, and good luck!', light: 'Day before the test: keep it light.' }[plan.status] || '';
  const next = plan.nextFullLength && plan.status !== 'fl' && plan.status !== 'fl-done' ? '<b>Next full-length:</b> ' + (plan.nextFullLength.overdue ? 'overdue · ' : '') + shortDay(plan.nextFullLength.when) + ' · Full-length ' + plan.nextFullLength.index + ': ' + esc(plan.nextFullLength.label) + '<br><span class="muted-note">The following day (' + shortDay(plan.nextFullLength.reviewDay) + ') is its review day.</span>' : '';
  return head + (kind ? '<p class="today-kind">' + kind + '</p>' : '') + (next || plan.fullLengths?.length ? '<div class="today-fl">' + next + fullLengthCalendarHtml(plan) + '</div>' : '');
}
function fullLengthCalendarHtml(plan) {
  if (!plan.fullLengths?.length) return '';
  const rows = plan.fullLengths.map(f => {
    const state = f.done ? '✓ taken ' + shortDay(f.done) : f.close < plan.today ? 'missed' : f.day < plan.today ? 'overdue' : 'review day ' + shortDay(dpAddDays(f.day, 1));
    return '<li' + (f.done ? ' class="done"' : '') + '><b>' + shortDay(f.day) + '</b> · ' + esc(f.label) + ' <span class="muted-note">· ' + state + '</span></li>';
  }).join('');
  const extras = plan.optionalFullLengths?.length ? '<p class="muted-note">Optional extra if you have time before the final month: ' + plan.optionalFullLengths.map(esc).join('; ') + '. AAMC exams take priority.</p>' : '';
  return '<div class="sw-head">Full-length calendar</div><ol class="today-fl-list">' + rows + '</ol>' + extras + '<p class="muted-note">AAMC exams are taken on aamc.org; record their section scores under Official results so the plan marks them done.</p>';
}
// A home page left open overnight shows the new day's plan when the tab is next viewed.
let dailyPlanRenderedDay = null;
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && dailyPlanRenderedDay && dailyPlanRenderedDay !== localDay() && typeof activeScreen !== 'undefined' && activeScreen === 'screen-home') renderHome();
});
function renderDailyPlan() {
  const el = $('today-plan'); if (!el) return;
  dailyPlanRenderedDay = localDay();
  // A bad synced record must never take down the rest of the home page.
  try { el.innerHTML = masteryCard() + '<details class="today-dateplan"><summary>Test date &amp; full-length calendar</summary>' + testDateCard() + '</details>'; } catch (e) { el.innerHTML = '<div class="section-label">TODAY › Start here</div><p class="muted-note">Today\u2019s plan could not be built from the saved progress. Your other study tools below still work.</p>'; }
}
