// TODAY's passage step and the Passages tab, run in the real app code: only the AAMC-style C/P practice passages
// are listed and practiced; each answer counts toward the step and its AAMC category; unseen passages come first,
// weakest categories first; after every passage was used once the step repeats the ones answered least well; the
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
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"]+)"/g)) run(fs.readFileSync(root + '/' + file, 'utf8'));

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
assert.match(el('hero-badge').textContent, /QBank cards · 266 Practice Exam cards · 36 C\/P passages · \d full-length exams/);

// Flashcards: QBank cards only.
run('startMasteryFlashcards()');
assert(run('quiz.items.length') === 50 && run('quiz.items.every(v=>AQB_BY_ID.has(v.q.id))'), '50 QBank cards');
run('goHome()');

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
console.log('Passage step passed: only the 36 C/P practice passages are listed and practiced; QBank-only flashcards; answers count toward the step and their category; unseen and weakest first; after the pool is used up the lowest-scoring repeat with a note; the follow-up prefers unused passages on the quiz\'s weak categories.');
