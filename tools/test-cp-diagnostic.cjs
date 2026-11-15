// Chem/Phys Diagnostic and daily quiz sets: the exam's layout, the AAMC C/P blueprint mix, complete questions,
// and every drawn structure present in data/structures.js.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const ctx = vm.createContext({});
for (const f of ['data/cp-diagnostic.js', 'data/cp-pool.js', 'data/cp-practice.js', 'data/structures.js']) vm.runInContext(fs.readFileSync(root + '/' + f, 'utf8'), ctx, { filename: f });
const D = JSON.parse(vm.runInContext('JSON.stringify(CP_DIAG)', ctx));
const POOL = JSON.parse(vm.runInContext('JSON.stringify(CP_POOL)', ctx));
const PRAC = JSON.parse(vm.runInContext('JSON.stringify(CP_PRACTICE)', ctx));
const STRUCTS = new Set(JSON.parse(vm.runInContext('JSON.stringify(Object.keys(STRUCT_SVG))', ctx)));
const CATS = ['4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E'];
const SKILLS = ['SIRS 1', 'SIRS 2', 'SIRS 3', 'SIRS 4'];
const DISCS = ['gen_chem', 'biochemistry', 'physics', 'organic_chem', 'biology'];

// Questions in exam order: a passage id brings its questions, a number brings that many stand-alones.
function layout(set) {
  const byId = new Map(set.passages.map(p => [p.id, p])), out = [], shape = [];
  let sa = 0;
  for (const step of set.order) {
    if (typeof step === 'number') { set.standalones.slice(sa, sa += step).forEach(q => out.push({ q, subj: q.subj })); shape.push(step); continue; }
    const p = byId.get(step); assert(p, set.id + ': order names an unknown passage ' + step);
    p.questions.forEach(q => out.push({ q, subj: q.subj || p.subj, p })); shape.push('P');
  }
  assert.equal(sa, set.standalones.length, set.id + ': every stand-alone is placed once');
  assert.equal(new Set(set.order.filter(x => typeof x === 'string')).size, set.passages.length, set.id + ': every passage is placed once');
  return { items: out, shape: shape.join(' ') };
}
function checkSet(set) {
  const { items, shape } = layout(set);
  const names = new Set();
  for (const p of set.passages) {
    assert(p.title && p.passage && DISCS.includes(p.subj) && Array.isArray(p.cats) && p.cats.every(c => CATS.includes(c)), p.id + ': passage fields');
    for (const r of p.scheme || []) for (const part of r.parts) if (typeof part === 'string' && part !== '+') names.add(part);
  }
  for (const { q, subj } of items) {
    const w = (q.id || '?') + ': ';
    assert(typeof q.q === 'string' && q.q.length > 15, w + 'stem');
    assert(Array.isArray(q.choices) && q.choices.length === 4 && new Set(q.choices).size === 4, w + '4 distinct choices');
    assert(Number.isInteger(q.ans) && q.ans >= 0 && q.ans < 4, w + 'answer index');
    assert(typeof q.exp === 'string' && q.exp.length >= 80, w + 'explanation');
    assert(SKILLS.includes(q.skill), w + 'skill'); assert(CATS.includes(q.cat), w + 'category'); assert(DISCS.includes(subj), w + 'discipline');
    for (const n of [].concat(q.fig ?? [], q.choiceFigs ?? [])) names.add(n);
    if (q.choiceFigs) assert.equal(q.choiceFigs.length, 4, w + 'four drawn choices');
  }
  for (const n of names) assert(STRUCTS.has(n), set.id + ': structure "' + n + '" is drawn in data/structures.js');
  return { items, shape, structures: names.size };
}
const count = (items, key) => items.reduce((o, x) => { const k = key(x); o[k] = (o[k] || 0) + 1; return o; }, {});
const within = (got, want, tol, what) => { for (const [k, v] of Object.entries(want)) assert(Math.abs((got[k] || 0) - v) <= tol, `${what} ${k}: ${got[k] || 0} vs target ${v} (±${tol})`); };

// The diagnostic: a full C/P section, 10 passages + 15 stand-alones = 59 questions in 95 minutes, in the order the
// six AAMC tests share, with seven 4-question passages, two of 5 and one of 6.
assert.equal(D.title, 'Chem/Phys Diagnostic'); assert.equal(D.timeMin, 95);
assert(!/practice exam/i.test(D.title), 'never named like an AAMC or homemade practice exam');
const d = checkSet(D);
assert.equal(d.items.length, 59); assert.equal(D.passages.length, 10); assert.equal(D.standalones.length, 15);
assert.equal(d.shape, 'P P 4 P P P 4 P P P 4 P P 3', 'P1 P2 [4] P3 P4 P5 [4] P6 P7 P8 [4] P9 P10 [3]');
assert.deepEqual(D.passages.map(p => p.questions.length).sort(), [4, 4, 4, 4, 4, 4, 4, 5, 5, 6]);
assert(D.passages.some(p => p.id === 'p_cpd_s1' && p.title === 'Alcohol Dehydrogenase and Toxic Alcohol Poisoning'), 'the approved sample passage is included');
within(count(d.items, x => x.q.cat), { '5D': 14, '5E': 9, '4E': 8, '5A': 6, '4D': 5, '4C': 5, '4B': 4, '5B': 3, '4A': 3, '5C': 2 }, 2, 'diagnostic category');
within(count(d.items, x => x.subj), { gen_chem: 19, biochemistry: 15, physics: 15, organic_chem: 9 }, 4, 'diagnostic discipline');
within(count(d.items, x => x.q.skill), { 'SIRS 2': 26, 'SIRS 1': 22, 'SIRS 3': 6, 'SIRS 4': 5 }, 2, 'diagnostic skill');
assert(D.passages.filter(p => (p.scheme || []).length).length >= 4, 'several diagnostic passages draw structures or a reaction scheme');

// Daily quizzes: at least six half-sections of 30 (5 passages + 10 stand-alones), each in exam order.
assert(POOL.length >= 6, 'a week of different quizzes');
assert.equal(new Set(POOL.map(s => s.id)).size, POOL.length);
const allIds = new Set(D.passages.map(p => p.id));
for (const set of POOL) {
  const r = checkSet(set);
  assert.equal(r.items.length, 30, set.id + ': 30 questions'); assert.equal(set.passages.length, 5); assert.equal(set.standalones.length, 10);
  assert.equal(r.shape, 'P P 4 P P 3 P 3', set.id + ': exam-style order');
  within(count(r.items, x => x.q.cat), { '5D': 7, '5E': 5, '4E': 4, '5A': 3, '4D': 2, '4C': 2, '4B': 2, '5B': 2, '4A': 2, '5C': 1 }, 2, set.id + ' category');
  for (const p of set.passages) { assert(!allIds.has(p.id), 'passage ids are unique across sets: ' + p.id); allIds.add(p.id); }
}
// Practice passages (after the quiz, for weak topics): their own passages, never in the diagnostic or a quiz.
assert(PRAC.length >= 36, 'at least 36 practice passages');
{ const r = checkSet({ id: 'cp_practice', passages: PRAC, standalones: [], order: PRAC.map(p => p.id) });
  for (const p of PRAC) { assert(!allIds.has(p.id), 'practice passages are separate from the tests: ' + p.id); allIds.add(p.id); }
  assert(new Set(r.items.map(x => x.q.cat)).size === 10, 'practice passages cover all 10 C/P categories'); }
// Question ids are unique (results and reviews key on them).
const qids = [D, ...POOL, { passages: PRAC, standalones: [] }].flatMap(s => [...s.passages.flatMap(p => p.questions), ...s.standalones]).map(q => q.id);
assert.equal(new Set(qids).size, qids.length, 'unique question ids');

// Regression (review 3): choices are shuffled, so no choice or explanation may name a choice by its letter,
// and no choice may be a bare letter list ("B and D only") that would read as answer letters.
{ const all = [D, ...POOL, { passages: PRAC, standalones: [] }].flatMap(s => [...s.passages.flatMap(p => p.questions), ...s.standalones]);
  for (const q of all) {
    assert(!q.choices.some(c => /^(?:[A-D](?:,? (?:and )?[A-D])*)(?: only)?$/.test(String(c).trim())), (q.id || q.q.slice(0, 40)) + ': a choice reads like answer letters');
    assert(!/\b(?:choice|option|answer) [A-D]\b/i.test(q.exp), (q.id || q.q.slice(0, 40)) + ': explanation names a choice letter');
  } }
// Wiring: Section Mastery runs the diagnostic and the pool for C/P; pages and the offline cache load them.
const mastery = fs.readFileSync(root + '/js/mastery.js', 'utf8'), app = fs.readFileSync(root + '/js/app.js', 'utf8');
assert(mastery.includes("kind === 'diagnostic' ? (typeof CP_DIAG !== 'undefined' ? CP_DIAG : null) : masteryNextSet(masteryLoad())"), 'mastery uses the diagnostic and the pool');
assert(app.includes('function schemeHtml(row)') && app.includes('fillPassageBox(passage)'), 'passages draw their schemes');
const BANKS = new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(app)[1])();
assert.deepEqual(BANKS.cp, ['data/cp-diagnostic.js', 'data/cp-pool.js'], 'the sets load on demand when a mastery test starts');
assert(mastery.includes("if (!bankReady('cp')) { withBank('cp', () => startMasteryTest(kind)); return; }"), 'a mastery test waits for the sets');
for (const page of ['index.html', 'passages.html']) assert(!fs.readFileSync(root + '/' + page, 'utf8').includes('data/cp-pool.js'), page + ' does not load the quiz sets up front');
const sw = fs.readFileSync(root + '/sw.js', 'utf8'); assert(sw.includes("'data/cp-diagnostic.js'") && sw.includes("'data/cp-pool.js'"), 'cached offline');
console.log(`C/P diagnostic passed: 59 questions (10 passages + 15 stand-alones) in exam order, blueprint mix, ${d.structures} drawn structures; ${POOL.length} daily quiz sets of 30.`);
