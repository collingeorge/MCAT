// TODAY's passage step and the Passages tab, run in the real app code: only the AAMC-style C/P practice passages
// are listed and practiced; each answer counts toward the step and its AAMC category; unseen passages come first,
// in the AAMC category, discipline, skill and difficulty mix; flashcards split exactly by AAMC weight, weak
// categories changing which cards (missed and due first, then weak sub-topics), never how many; after every passage was used once the step repeats the ones answered least well; the
// post-quiz follow-up prefers passages not used today. (This file once tested the recall subject path, removed
// with the recall decks.)
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const storage = new Map(), nodes = new Map();
function el(id) { if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } }); return nodes.get(id); }
const ctx = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} }, document: { getElementById: el, querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) } });
const run = code => vm.runInContext(code, ctx);
// Banks the app loads on demand (BANKS in js/app.js), loaded first as the browser would have them.
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) run(fs.readFileSync(root + '/' + file, 'utf8'));

// Approved content only: no recall decks, no app-written passages, exam CARS limited to passages 1–9 of each set.
assert.equal(run('QB.length'), 0);
assert.equal(run('LISTED_PASSAGES.length'), 36); assert.equal(run('LISTED_PASSAGES.reduce((n,p)=>n+p.questions.length,0)'), 144);
assert(run('LISTED_PASSAGES.every(p=>/^p_cpx\\d_\\d$/.test(p.id))'), 'the Passages tab lists only CP_PRACTICE');
assert(run("[...CP_DIAG.passages,...CP_POOL.flatMap(s=>s.passages)].every(p=>!LISTED_IDS.has(p.id))"), 'diagnostic and quiz passages are never listed');
assert.equal(run("JSON.stringify(EXAM_CARS.map(p=>p.id))"), JSON.stringify([...Array(9)].map((_, i) => 'p_cars_' + (i + 1)).concat([...Array(9)].map((_, i) => 'p_e2cars_' + (i + 1)))));
assert(run('[...EXAM_PASSAGE_IDS].every(id=>PASSAGE_BY_ID.has(id))'), 'every exam CARS passage resolves');
run("setMode('passage', false)"); assert.match(el('passage-selector').innerHTML, /Chem\/Phys/); assert.doesNotMatch(el('passage-selector').innerHTML, /p_cars_|p_cpd_|p_cpp/);
run("setMode('recall', false)"); assert.equal(run('prefs.mode'), 'passage', 'a saved Recall mode opens Passages');
assert.equal(typeof ctx.questionForms, 'function'); assert.equal(run('questionForms(AQB_QBANK[0]).length'), 1, 'cards are asked only as written');

// Set up: the C/P diagnostic is done (weakest 5D, then 4E), so today is a study day.
const today = run('localDay()');
run(`store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag', cats: { '5D': { c: 2, t: 14 }, '4E': { c: 4, t: 8 }, '5A': { c: 5, t: 6 } } }] })`);
let plan = JSON.parse(run('JSON.stringify(masteryPlanNow())'));
assert.deepEqual(plan.steps.map(s => s.id), ['diagnostic', 'flashcards', 'guided', 'passages', 'test']);
assert.equal(plan.steps[3].count, 50); assert.equal(plan.steps[3].progress, 0);
run('renderHome()'); assert.match(el('today-plan').innerHTML, /Passage questions/); assert.match(el('today-plan').innerHTML, /startMasteryPassages\(\)/);
// Exact split: every step shows its per-category targets as chips at the AAMC weight; the two weak categories are
// marked "weak" with the same counts (5D 12 of 50, as with no weak category); no "+ extra".
assert.equal(plan.split, 'exact'); assert.deepEqual(plan.weakT, ['5D', '4E']);
assert.deepEqual(JSON.parse(run('JSON.stringify(masteryLoad().days[localDay()])')).split, 'exact', 'the day row carries the split marker');
assert.match(el('today-plan').innerHTML, /5D 0\/12 <b>weak<\/b>/); assert.match(el('today-plan').innerHTML, /4E 0\/7 <b>weak<\/b>/); assert.doesNotMatch(el('today-plan').innerHTML, /\+ extra/);
assert.match(el('today-plan').innerHTML, /Skill 2 0\/22/); assert.match(el('today-plan').innerHTML, /Gen chem 0\/16/); assert.match(el('today-plan').innerHTML, /Difficult 0\/20/); assert.match(el('today-plan').innerHTML, /5D × 7/);
assert(plan.steps.filter(s => s.topics).every(s => s.topics.every(t => t.extra === 0) && s.topics.reduce((n, t) => n + t.need, 0) === s.count), 'every step sums to its count, 0 extra on every category');
assert.match(el('hero-badge').textContent, /QBank cards · 354 Practice Exam cards · 36 C\/P passages · \d full-length exams/);

// Weakness picks, never counts: within 5D (a weak category), a card missed today, one missed on the latest test
// and one due for review come first, then the weakest sub-topic's cards (by saved accuracy), then the rest.
const p5D = JSON.parse(run("JSON.stringify(masteryFlashPool('cp').filter(q => masteryCategory(q) === '5D' && disciplineOfRecall(q) === 'biochemistry').map(q => ({ id: q.id, key: q.key })))"));
const keys5D = [...new Set(p5D.map(q => q.key))], weakKey = keys5D.find(k => p5D.filter(q => q.key === k).length >= 2 && p5D.filter(q => q.key === k).length <= 4);
assert(weakKey, 'a small 5D biochemistry sub-topic to mark weak');
const tier0 = p5D.filter(q => q.key !== weakKey).slice(-3).map(q => q.id), weakIds = p5D.filter(q => q.key === weakKey).map(q => q.id);
run(`(() => { const m = masteryLoad(); masteryDayRow(m, 'cp').misses = ['${tier0[0]}']; m.tests[m.tests.length - 1].missIds = ['${tier0[1]}']; masterySave(m);
  store.set(KEYS.mem, { '${tier0[2]}': { S: 1, D: 5, last: Date.now() - 10 * DAY, seen: 1, right: 0, lapses: 1 } });
  store.set(KEYS.stats, { '${weakKey}': { c: 1, t: 5 }, ${JSON.stringify(keys5D.find(k => k !== weakKey))}: { c: 5, t: 5 } }); })()`);
assert.equal(run(`retrievability(loadMem()['${tier0[2]}']) < TARGET_RETENTION`), true, 'the card is due');
// Flashcards: QBank cards only, each category's target count, no card twice.
run('startMasteryFlashcards()');
{ const ids = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.id))')), bio = ids.filter(id => p5D.some(q => q.id === id));
  assert(tier0.every(id => ids.includes(id)), 'missed today, missed on the latest test and due: all picked first in 5D');
  assert.equal(bio.filter(id => !tier0.includes(id)).filter(id => weakIds.includes(id)).length, Math.min(weakIds.length, bio.length - 3), 'then every card of the weakest sub-topic (20%)'); }
assert(run('quiz.items.length') === 50 && run('quiz.items.every(v=>AQB_BY_ID.has(v.q.id))'), '50 QBank cards');
assert.deepEqual(JSON.parse(run("JSON.stringify(quiz.items.reduce((o,v)=>{const c=quiz.topicOf[v.q.id]; o[c]=(o[c]||0)+1; return o;},{}))")),
  Object.fromEntries(plan.steps[1].topics.filter(t => t.need).map(t => [t.code, t.need])), 'each category gets its AAMC target, weak or not');
assert(run('quiz.items.every(v=>masteryCategory(v.q)===quiz.topicOf[v.q.id])'), 'every card is from the category it counts for');
assert.equal(run('new Set(quiz.items.map(v=>v.q.id)).size'), 50, 'no card twice');
run('goHome()');

run("store.set(KEYS.mem, {}); store.set(KEYS.stats, {})");
// Passage step: the first passage is unseen and in the weakest category (5D).
run('startMasteryPassages()');
assert.equal(run('pq.masteryPractice'), 'step');
const first = run('pq.p.id');
assert(run("[...(pq.p.cats||[]),...pq.p.questions.map(q=>q.cat)].includes('5D')"), 'weakest category first: ' + first);
const n1 = run('pq.views.length');
for (let i = 0; i < n1; i++) run('answerPassage(pq.views[pq.idx].ans); nextPassageQ()');
plan = JSON.parse(run('JSON.stringify(masteryPlanNow())'));
const ps = plan.steps.find(s => s.id === 'passages');
assert.equal(ps.progress, n1, 'each answer counts toward the step');
assert.equal(ps.cats.reduce((n, c) => n + c.n, 0), n1, 'and toward its AAMC category');
const day = JSON.parse(run('JSON.stringify(masteryLoad().days[localDay()])'));
assert.deepEqual(day.pracUsed, [first]);
assert.equal(Object.values(day.pracD || {}).reduce((a, b) => a + b, 0), n1, "each answer counts toward its discipline"); assert.equal(Object.values(day.pracX || {}).reduce((a, b) => a + b, 0), n1, "and its difficulty");
assert.equal(ps.diffs.reduce((n, k) => n + k.progress, 0), n1); assert.equal(ps.discs.reduce((n, k) => n + k.progress, 0) <= n1, true);
// The results page offers the next practice passage; repeating showPassageResults never double counts.
assert.match(el('pp-question-box').innerHTML, /masteryNextPractice\(\)/);
const attempts = run(`store.get(KEYS.passages,{})['${first}'].attempts`); run('showPassageResults()'); assert.equal(run(`store.get(KEYS.passages,{})['${first}'].attempts`), attempts);
// The next passage is another unseen one.
run('masteryNextPractice()'); const second = run('pq.p.id'); assert.notEqual(second, first); assert.equal(run(`store.get(KEYS.passages,{})['${second}']`), undefined);
run('goHome()');

// Every passage done once: the step repeats the lowest-scoring passage, and TODAY says the pool was completed.
run("const st={}; LISTED_PASSAGES.forEach((p,i)=>{ st[p.id]={attempts:1,last:100,best:100,lastAt:i+1}; }); st[LISTED_PASSAGES[7].id].last=25; store.set(KEYS.passages,st)");
assert.equal(run('masteryPoolDone(LISTED_PASSAGES)'), true);
run('startMasteryPassages()'); assert.equal(run('pq.p.id'), run('LISTED_PASSAGES[7].id'), 'least well answered first'); run('goHome()');
run('renderHome()'); assert.match(el('today-plan').innerHTML, /completed every practice passage once/);

// After the quiz (below goal): the follow-up aims at the quiz's weak categories and prefers passages not used today.
run(`(() => { const m = masteryLoad(); m.tests.push({ subj: 'cp', day: localDay(), t: 2, kind: 'daily', correct: 12, total: 30, pct: 40, scaled: 120, version: 'cp_half_1', cats: { '4C': { c: 0, t: 3 } } }); masterySave(m); })()`);
run("startMasteryFollowup('passages')");
assert.equal(run('pq.masteryPractice'), 'followup');
assert(!JSON.parse(run('JSON.stringify(masteryLoad().days[localDay()].pracUsed.slice(0,-1))')).includes(run('pq.p.id')), 'not a passage used today');
assert(run("[...(pq.p.cats||[]),...pq.p.questions.map(q=>q.cat)].includes('4C')"), 'aims at the quiz weak category');
const before = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="passages").progress)'));
run('answerPassage(pq.views[0].ans)');
assert.equal(JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="passages").progress)')), before, 'follow-up answers do not count toward the step');
assert.equal(run('masteryLoad().days[localDay()].fixQ'), 1);

// ── Regressions from the code review ──
// 1.1: every card done but lessons short → "Continue" opens today's cards whose lesson isn't finished.
{ const d = run('localDay()'), pool = JSON.parse(run('JSON.stringify(masteryPracticePool("cp").map(q=>q.id))'));
  run(`(() => { const m = masteryLoad(); const row = masteryDayRow(m, 'cp'); const t = row.topics; row.guidedT = Object.fromEntries(masteryPlanNow().steps.find(s=>s.id==='guided').topics.map(x => [x.code, x.need])); row.lessonsN = 40;
    row.guidedIds = ${JSON.stringify(pool.slice(0, 50))}; row.lessonIds = ${JSON.stringify(pool.slice(0, 40))}; masterySave(m); })()`);
  let g = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="guided"))'));
  assert(!g.done && g.progress === 50 && g.lessons === 40, 'stuck state: 50/50 cards, 40/50 lessons');
  run('startMasteryGuided()');
  assert.equal(run('quiz.mastery'), 'lessons'); assert.equal(run('quiz.items.length'), 10, 'the 10 cards whose lesson is unfinished');
  assert(run(`quiz.items.every(v => ${JSON.stringify(pool.slice(40, 50))}.includes(v.q.id))`));
  run('while (quiz.items[quiz.idx].teachCur < teachOf(quiz.items[quiz.idx].q).length) teachStep(1); pick(quiz.items[0].ans)');
  g = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="guided"))'));
  assert.equal(g.lessons, 41, 'finishing a lesson counts'); assert.equal(g.progress, 50, 'finishing lessons adds no cards');
  run('teachStep(0)'); // replaying a lesson on the same card never counts twice
  run('goHome()');
  // A step with nothing to start shows a message instead of doing nothing.
  run(`(() => { const m = masteryLoad(); const row = masteryDayRow(m, 'cp'); row.flashT = Object.fromEntries(masteryPlanNow().steps.find(s=>s.id==='flashcards').topics.map(x => [x.code, x.need])); masterySave(m); })()`);
  el('page-notice').hidden = true; run('startMasteryFlashcards()');
  assert.equal(el('page-notice').hidden, false); assert.match(el('page-notice').textContent, /done for today/); }
// 2.2: only the first answer to a card in a session counts toward the step.
{ run(`(() => { const m = masteryLoad(); const row = masteryDayRow(m, 'cp'); row.flashT = {}; masterySave(m); })()`);
  run('startMasteryFlashcards()'); const q0 = 'quiz.items[0].q';
  const before = run('Object.values(masteryLoad().days[localDay()].flashT||{}).reduce((a,b)=>a+b,0)');
  run(`masteryNoteAnswer(${q0}, false); masteryNoteAnswer(${q0}, true); masteryNoteAnswer(${q0}, true)`);
  assert.equal(run('Object.values(masteryLoad().days[localDay()].flashT||{}).reduce((a,b)=>a+b,0)') - before, 1, 're-asked card counted once');
  run('goHome()'); }
// Follow-up Practice Exam cards have their own mode: they count as follow-up practice, not toward step 3.
{ const before = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="guided"))'));
  run(`(() => { const m = masteryLoad(); m.tests.push({ subj: 'cp', day: localDay(), t: 9, kind: 'daily', correct: 12, total: 30, pct: 40, scaled: 120, version: 'cp_half_2', cats: { '4C': { c: 0, t: 3 } } }); masterySave(m); })()`);
  run("startMasteryFollowup('guided')"); assert.equal(run('quiz.mastery'), 'followup');
  const fix0 = run('masteryLoad().days[localDay()].fixQ || 0');
  run('pick(quiz.items[0].ans)');
  const after = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s=>s.id==="guided"))'));
  assert.equal(after.progress, before.progress); assert.equal(after.lessons, before.lessons);
  assert.equal(run('masteryLoad().days[localDay()].fixQ') - fix0, 1);
  run('goHome()'); }
// 2.4: after the pool is used up, a passage already used today is not repeated before the others.
{ run("(()=>{const s2={}; LISTED_PASSAGES.forEach((p,i)=>{ s2[p.id]={attempts:1,last:100,best:100,lastAt:i+1}; }); s2[LISTED_PASSAGES[3].id].last=10; s2[LISTED_PASSAGES[4].id].last=20; store.set(KEYS.passages,s2)})()");
  run(`(() => { const m = masteryLoad(); masteryDayRow(m, 'cp').pracUsed = [LISTED_PASSAGES[3].id]; masterySave(m); })()`);
  run('startMasteryPassages()'); assert.equal(run('pq.p.id'), run('LISTED_PASSAGES[4].id'), 'the lowest score not used today'); run('goHome()'); }
// Midnight: answers in a session started yesterday count toward yesterday.
{ const y = run('localDay(new Date(Date.now()-DAY))');
  run('startMasteryFlashcards(true)'); run(`quiz.masteryDay = '${y}'`);
  run('pick(quiz.items[0].ans)');
  assert(run(`Object.values(masteryLoad().days['${y}']?.flashT||{}).reduce((a,b)=>a+b,0)`) >= 1, 'counted on the day the session started');
  run('goHome()'); }
// 2.5: "Study my mistakes from this exam" builds a card set from the approved cards (it used the removed decks).
{ run(`examReviewState.attempt = { ei: 0, date: Date.now(), answers: FULL_EXAMS[0].sections.map(() => []), marked: [], orders: [], results: FULL_EXAMS[0].sections.map(() => ({ correct: 0, total: 1, pct: 0, scaled: 118 })) }`);
  run('studyExamMistakes()');
  assert.equal(run('activeScreen'), 'screen-quiz'); assert.equal(run('quiz.label'), 'Exam mistakes');
  assert(run('quiz.items.length') >= 15 && run('quiz.items.every(v => AQB_BY_ID.has(v.q.id) || FLQ_BY_ID.has(v.q.id))'), 'QBank and Practice Exam cards only');
  run('goHome()'); }
// 2.6: past days drop their card-id lists from the saved (synced) copy; today and yesterday keep them.
{ run(`(() => { const m = masteryLoad(); m.days['2026-01-01'] = { subj: 'cp', topics: ['5D'], seen: ['a','b'], guidedIds: ['a'], lessonIds: ['a'], pracUsed: ['p'], flashT: { '5D': 3 } }; masterySave(m); })()`);
  const old = JSON.parse(run(`JSON.stringify(masteryLoad().days['2026-01-01'])`));
  assert(!old.seen && !old.guidedIds && !old.lessonIds && !old.pracUsed && old.flashT['5D'] === 3, 'lists dropped, counts kept');
  assert(Array.isArray(JSON.parse(run('JSON.stringify(masteryLoad().days[localDay()].pracUsed)'))), 'today keeps its lists'); }
console.log('Passage step passed: only the 36 C/P practice passages are listed and practiced; QBank-only flashcards; answers count toward the step and their category; unseen and weakest first; after the pool is used up the lowest-scoring repeat with a note; the follow-up prefers unused passages on the quiz\'s weak categories.');
