// B/B Practice Test flashcards (data/bb-test-cards.js): one twin card per B/B question of AAMC Practice Exams 1, 3, 4,
// 5 and the Sample Test (Q113–171), asked the AAMC way with new nouns and numbers. Same card shape as the C/P cards
// (data/cp-test-cards.js): a short twin passage for passage questions, Rule out cuts, a shortcut, an explanation, a
// step-by-step walkthrough (how) and a lesson (teach). TODAY's B/B flashcard step uses only these (masteryFlashPool).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(root + '/data/bb-test-cards.js', 'utf8').replace(/^const /mg, 'var '), ctx);
const CARDS = ctx.BB_TEST_CARDS;
assert(Array.isArray(CARDS) && CARDS.length >= 250, 'B/B cards: ' + (CARDS && CARDS.length));
const CATS = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B'];
const DISCS = ['biology', 'biochemistry', 'gen_chem', 'organic_chem'];
const SKILLS = ['SIRS 1', 'SIRS 2', 'SIRS 3', 'SIRS 4'];
const REF = /^(pe[13456]|st)-bb:(1[1-6]\d|17[01])$/;
const ids = new Set();
for (const c of CARDS) {
  const w = (c.id || '?') + ': ';
  assert(/^bbt-(pe[13456]|st)-\d{3}[a-z]$/.test(c.id) && !ids.has(c.id), w + 'id'); ids.add(c.id);
  assert(CATS.includes(c.aamc) && DISCS.includes(c.disc) && SKILLS.includes(c.skill), w + 'aamc / disc / skill');
  assert(typeof c.s === 'string' && c.s && typeof c.method === 'string' && c.method.trim(), w + 'topic and method');
  assert(Array.isArray(c.twinOf) && c.twinOf.length >= 1 && c.twinOf.every(r => REF.test(r)), w + 'twinOf');
  assert(Array.isArray(c.from) && c.from.length >= 1 && c.from.every(r => REF.test(String(r).split('#')[0])), w + 'from');
  assert(typeof c.q === 'string' && c.q.trim().length > 10, w + 'stem');
  assert(Array.isArray(c.choices) && c.choices.length === 4 && new Set(c.choices).size === 4 && c.choices.every(x => typeof x === 'string' && x.trim()), w + '4 different choices');
  assert(Number.isInteger(c.ans) && c.ans >= 0 && c.ans < 4, w + 'answer');
  const passage = typeof c.passage === 'string' ? c.passage : '';
  if (c.pid) assert(passage.length > 80, w + 'a passage question carries its twin passage');
  // Rule out: every wrong choice is cut, the key never.
  assert(Array.isArray(c.cut) && c.cut.length >= 1, w + 'cuts');
  const cut = new Set(c.cut.flatMap(x => x.c));
  assert(!cut.has(c.ans) && [0, 1, 2, 3].filter(i => i !== c.ans).every(i => cut.has(i)), w + 'cuts strike the 3 wrong choices, never the key');
  assert(c.cut.every(x => typeof x.f === 'string' && x.f.trim() && x.f.split(/\s+/).length <= 8), w + 'each cut is a short fact');
  assert(c.fast && typeof c.fast.how === 'string' && c.fast.how.trim(), w + 'shortcut');
  assert(typeof c.exp === 'string' && c.exp.includes('**Answer:**') && c.exp.includes('**Correct:'), w + 'explanation');
  // Walkthrough: highlights quote the passage; each wrong choice is struck once.
  assert(c.how && Array.isArray(c.how.steps) && c.how.steps.length >= 2, w + 'walkthrough');
  for (const st of c.how.steps) if (st.hl) assert(passage.includes(st.hl), w + 'highlight is in the passage: ' + st.hl);
  const struck = c.how.steps.flatMap(st => st.strike || []);
  assert(struck.every(s => c.choices.includes(s) && s !== c.choices[c.ans]), w + 'struck choices are wrong choices');
  assert(Array.isArray(c.teach) && c.teach.length >= 1 && c.teach.every(t => typeof t.text === 'string'), w + 'lesson');
  for (const t of c.teach) for (const mk of t.marks || []) assert(passage.includes(mk.t), w + 'lesson mark is in the passage: ' + mk.t);
}
// The AAMC B/B mix: every category is present.
for (const cat of CATS) assert(CARDS.some(c => c.aamc === cat), 'category ' + cat + ' has cards');
console.log('B/B Practice Test flashcards: ' + CARDS.length + ' cards, ' + new Set(CARDS.map(c => c.method)).size + ' methods');
