// C/P Practice Test flashcards (data/cp-test-cards.js) and TODAY's C/P steps without the QBank.
//   1 Coverage: every card's `from` resolves to a Practice Exam 1/3/4/5/6 C/P card (pe1-cp … pe6-cp in
//     data/qb-aamc-fl.js) and carries a source's spec labels. The deck is a study budget: at most 250 cards, one card
//     per method, a card listing in `from` every spec item (and question) it prepares for, across the exams. Every
//     question of each exam that has cards maps to at least one card, and every item of a Partial question (a fact
//     its Practice Exam card doesn't teach) has a card; once all five exams are in, each category is within ±2 of its
//     share of the 250 (DECK_TARGET). Each card has a valid `how` (ask, know,
//     steps, trap; every `hl` and `strike` is an exact substring of the card's own stem or choices, and no step
//     strikes the key) and `teach` (every mark is in the stem; the last step starts "Rule to reuse:").
//   2 Style, AAMC stand-alone: stems median 15–25 words (each 7–45); choices median ≤ 3 words and 90% ≤ 9; the key is
//     never the single longest choice (characters or words); no position words ("the second choice").
//   3 Originality against each source card: no shared answer choice (or paraphrase), no shared data number in the
//     stem or choices (chemical locants such as 2- or 1,2- are names, not data), no shared 6-word run with its stem.
//   4 No QBank in TODAY: over 200 simulated days (each with missed-question twins on a Practice Exam, a Sample Test and
//     a QBank card), the flashcard step holds only Practice Test flashcards and the guided step only Practice Exam
//     1/3/4/5/6 cards; the missed Practice Exam twin and the flashcards built from it lead their steps, and the Sample
//     Test and QBank twins are skipped. The QBank files are byte-identical to main; in qb-aamc-fl.js only the 17 approved rewrites changed.
// Run with --table to print the coverage table (each Practice Exam question → its flashcards) and the per-category
// counts against the 50-card daily split.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { numsOf, norm, grams, paraphrase, BLOCKLIST } = require('./twin-checks.cjs');
const SPEC = require('./cp-test-specs.cjs').load();
const root = __dirname + '/..';
const TABLE = process.argv.includes('--table');

const data = vm.createContext({});
// CPT_FILE=<path>: check another file of cards (a writer's batch) for parts 1–3 only; part 4 runs on the app's deck.
const CPT_FILE = process.env.CPT_FILE || root + '/data/cp-test-cards.js';
for (const f of [root + '/data/qb-aamc-fl.js', CPT_FILE]) vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /mg, 'var '), data, { filename: f });
const FL = data.QB_AAMC_FL, CARDS = data.CP_TEST_CARDS;
const PE_RE = /^pe[13456]-cp:\d+$/;
const PE = new Map(FL.filter(q => PE_RE.test(q.src)).map(q => [q.src, q]));
assert.equal(PE.size, 295, 'Practice Exams 1, 3, 4, 5 and 6: 59 C/P questions each');
// The specs (docs/cp-test-specs/PE*-spec.md, read by tools/cp-test-specs.cjs): every one of the 295 questions, with its
// labels and its "Needs" items.
assert.equal(SPEC.questions.length, 295, 'the specs cover all 295 questions');
for (const q of SPEC.questions) { assert(PE.has(q.src), q.src + ': spec question has a Practice Exam card'); assert(q.items.length >= 1, q.src + ': spec lists what it needs'); }
const ITEMS = new Map(SPEC.items.map(it => [it.ref, it]));
// The questions written so far: every question any card comes from. Each of them must have a card for every one of
// its "Needs" items; once all 295 are written, every spec item must have a card.
// The exams written so far: every exam any card comes from; all 59 of each one's questions must map to a card.
const DECK_MAX = 250;
const DECK_TARGET = { '5D': 60, '5E': 38, '4E': 32, '5A': 23, '4D': 20, '4C': 20, '4B': 17, '5B': 15, '4A': 13, '5C': 12 };
assert.equal(Object.values(DECK_TARGET).reduce((a, b) => a + b, 0), DECK_MAX, 'the category targets add up to the 250-card budget');
assert(CARDS.length <= DECK_MAX, `the deck is ${CARDS.length} cards; the budget is ${DECK_MAX}`);
const EXAMS_WRITTEN = [...new Set(CARDS.flatMap(c => (Array.isArray(c.from) ? c.from : []).map(r => String(r).split('-')[0])))];
// A writer's batch (CPT_FILE) covers some of an exam's questions: only those are checked for coverage.
const BUILT = process.env.CPT_FILE ? [...new Set(CARDS.flatMap(c => (c.from || []).map(r => String(r).split('#')[0])))].filter(s => PE.has(s))
  : [...PE.keys()].filter(s => EXAMS_WRITTEN.includes(s.split('-')[0]));
const ALL_BUILT = BUILT.length === PE.size;

// ── 1. Coverage and worked methods ──
const strip = t => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\*\*/g, '');
const words = t => strip(t).trim().split(/\s+/).filter(Boolean).length;
const ids = new Set(), stems = new Map(), bySrc = new Map([...PE.keys()].map(s => [s, []])), byItem = new Map(SPEC.items.map(it => [it.ref, []]));
for (const c of CARDS) {
  const id = c.id;
  assert(typeof id === 'string' && /^cpt-pe[13456]-\d{2}[a-z]$/.test(id), 'id format: ' + id);
  assert(!ids.has(id), 'unique id: ' + id); ids.add(id);
  assert(typeof c.s === 'string' && c.s.trim(), id + ': topic tag s');
  assert(Array.isArray(c.from) && c.from.length >= 1 && new Set(c.from).size === c.from.length, id + ': from is a list of distinct sources');
  // Each source names a spec item, "peX-cp:Q#n": the card teaches item n of that question's "Needs" list.
  for (const ref of c.from) {
    assert(ITEMS.has(ref), id + ': from "' + ref + '" is an item of a spec question (peX-cp:Q#n)');
    const s = ref.split('#')[0];
    if (!bySrc.get(s).includes(id)) bySrc.get(s).push(id);
    byItem.get(ref).push(id);
  }
  // Labels from the spec line: category, discipline and skill.
  assert(c.from.some(ref => { const q = SPEC.bySrc.get(ref.split('#')[0]); return q.aamc === c.aamc && q.disc === c.disc && q.skill === c.skill; }), id + ': aamc, disc and skill come from a source question\'s spec line');
  assert(typeof c.q === 'string' && c.q.trim() && Array.isArray(c.choices) && c.choices.length === 4, id + ': stem and 4 choices');
  assert.equal(new Set(c.choices.map(norm)).size, 4, id + ': distinct choices');
  assert(Number.isInteger(c.ans) && c.ans >= 0 && c.ans < 4, id + ': ans');
  assert(typeof c.exp === 'string' && c.exp.length >= 40, id + ': explanation');
  const k = norm(c.q); assert(!stems.has(k), id + ': duplicate stem of ' + stems.get(k)); stems.set(k, id);
  const inCard = t => typeof t === 'string' && t.length > 0 && (c.q.includes(t) || c.choices.some(ch => ch.includes(t)));
  const key = c.choices[c.ans];
  const h = c.how;
  assert(h && typeof h === 'object', id + ': how');
  assert.deepEqual(Object.keys(h).sort(), ['ask', 'know', 'steps', 'trap'], id + ': how has ask, know, steps, trap');
  for (const f of ['ask', 'know', 'trap']) assert(typeof h[f] === 'string' && h[f].trim(), id + ': how.' + f);
  assert(key.length <= 3 || !h.ask.includes(key), id + ': how.ask does not give away the key');
  assert(Array.isArray(h.steps) && h.steps.length >= 2, id + ': at least 2 steps');
  for (const [i, st] of h.steps.entries()) {
    assert(st && typeof st.text === 'string' && st.text.trim(), id + ': step ' + (i + 1) + ' text');
    if (st.hl !== undefined) assert(inCard(st.hl), id + ': step ' + (i + 1) + ' hl "' + st.hl + '" is in the stem or choices');
    if (st.strike !== undefined) {
      assert(Array.isArray(st.strike) && st.strike.length, id + ': step ' + (i + 1) + ' strike is a list');
      for (const x of st.strike) { assert(inCard(x), id + ': strike "' + x + '" is in the stem or choices'); assert.notEqual(x, key, id + ': the key is never struck'); }
    }
    if (st.calc !== undefined) assert(Array.isArray(st.calc) && st.calc.every(x => typeof x === 'string' && x.trim()), id + ': step ' + (i + 1) + ' calc');
  }
  // The lesson crosses out every wrong choice by the end (each strike names its reason in the step text).
  assert.equal(JSON.stringify([...new Set(h.steps.flatMap(st => st.strike || []))].sort()), JSON.stringify(c.choices.filter((_, i) => i !== c.ans).sort()), id + ': the lesson crosses out each wrong choice');
  assert(Array.isArray(c.teach) && c.teach.length >= 2, id + ': teach');
  for (const [i, st] of c.teach.entries()) {
    assert(st && typeof st.text === 'string' && st.text.trim(), id + ': teach ' + (i + 1) + ' text');
    for (const m of st.marks || []) assert(typeof m.t === 'string' && c.q.includes(m.t) && typeof m.note === 'string', id + ': teach mark "' + m.t + '" is in the stem');
  }
  assert(/^\*\*Rule to reuse:\*\* \S/.test(c.teach.at(-1).text), id + ': the last teach step starts "Rule to reuse:"');
  // Rule out 2: every card names exactly two wrong choices with the quick rule that kills each (a trap, unit, sign,
  // estimate or the formula's direction; pure recall gets the closest true rule), then how to pick between the two
  // left (elimThen). The ✂ Rule out 2 button and the lesson's first step show them.
  // CPT_ELIM_PENDING=1 (a writer's working copy only): cards that don't have elim yet are skipped; any elim is checked.
  if (process.env.CPT_ELIM_PENDING && c.elim === undefined) continue;
  assert(Array.isArray(c.elim) && c.elim.length === 2, id + ': elim names exactly two choices');
  assert.notEqual(c.elim[0].c, c.elim[1].c, id + ': elim names two different choices');
  for (const e of c.elim) {
    assert(Number.isInteger(e.c) && e.c >= 0 && e.c < c.choices.length && e.c !== c.ans, id + ': elim never points at the key');
    assert(typeof e.why === 'string' && e.why.trim() && e.why.length <= 160, id + ': elim reason is one short line (≤ 160 characters): ' + (e.why || '').length);
  }
  assert(typeof c.elimThen === 'string' && c.elimThen.trim() && c.elimThen.length <= 200, id + ': elimThen says how to choose between the two left (≤ 200 characters)');
}
const uncovered = BUILT.filter(s => !bySrc.get(s).length);
assert.deepEqual(uncovered, [], 'every Practice Exam question written so far has at least one flashcard');
// Every "Needs" item of the questions written so far has a card; the items of the questions not yet written are
// reported, not failed, until the deck is complete.
const partialMissing = SPEC.items.filter(it => BUILT.includes(it.src) && SPEC.bySrc.get(it.src).match === 'partial' && !byItem.get(it.ref).length).map(it => it.ref);
assert.deepEqual(partialMissing, [], 'every item of a Partial question (a fact its Practice Exam card does not teach) has a flashcard');
const missingItems = SPEC.items.filter(it => !byItem.get(it.ref).length);
const covered = [...bySrc.values()].filter(a => a.length).length;

// ── 2. Style ──
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(p * s.length) - 1)]; };
const POSITION = /\b(first|second|third|fourth|last|final|top|bottom) (choice|option|answer)s?\b|\b(choice|option)s?\s*\(?[A-D]\)?(?![\w-])/i;
const stemW = CARDS.map(c => words(c.q)), choiceW = CARDS.flatMap(c => c.choices.map(words));
for (const c of CARDS) {
  const n = words(c.q); assert(n >= 7 && n <= 45, c.id + ': stem ' + n + ' words (7–45)');
  const ch = c.choices.map(x => strip(x).trim()), cl = ch.map(x => x.length), cw = c.choices.map(words);
  const oc = cl.filter((_, i) => i !== c.ans), ow = cw.filter((_, i) => i !== c.ans);
  assert(cl[c.ans] <= Math.max(...oc), c.id + ': the key is not the longest choice (characters)');
  assert(cw[c.ans] <= Math.max(...ow), c.id + ': the key is not the longest choice (words)');
  const texts = []; (function walk(v) { if (typeof v === 'string') texts.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })([c.q, c.choices, c.exp, c.how, c.teach]);
  for (const t of texts) assert(!POSITION.test(strip(t)), c.id + ': no position words: "' + (strip(t).match(POSITION) || [''])[0] + '"');
}
const sm = median(stemW), cm = median(choiceW), c90 = pct(choiceW, 0.9);
assert(sm >= 15 && sm <= 25, 'stem median ' + sm + ' words (15–25; AAMC stand-alones ≈ 20)');
assert(cm <= 3, 'choice median ' + cm + ' words (≤ 3)'); assert(c90 <= 9, 'choice 90th percentile ' + c90 + ' words (≤ 9)');

// ── 3. Originality against each source card ──
const LOCANT = /\b\d+(?:,\d+)*-(?=[\p{L}(])|(?<=[\p{L})])-\d+(?:,\d+)*\b/gu;   // 2-bromo, 1,2-shift, pent-2-ene
// The base of a power of ten ("× 10⁻⁴", "10³") is notation, not a data number.
const dataNums = t => numsOf(strip(t).replace(LOCANT, ' ').replace(/(×\s*)?\b10(?=[⁻⁰¹²³⁴⁵⁶⁷⁸⁹])/g, ' '));
const lessonText = c => { const h = c.how || {}; return [...(c.elim || []).map(e => e.why), c.elimThen, h.ask, h.know, h.trap, ...(h.steps || []).flatMap(st => [st.text, ...(st.calc || [])]), ...(c.teach || []).flatMap(t => [t.text, ...(t.calc || []), ...(t.marks || []).map(m => m.note)])].filter(Boolean).join(' \n '); };
for (const c of CARDS) for (const s of new Set(c.from.map(r => r.split('#')[0]))) {
  const src = PE.get(s), srcNums = dataNums(src.q + ' ' + src.choices.join(' '));
  const shared = [...dataNums(c.q + ' ' + c.choices.join(' '))].filter(n => srcNums.has(n));
  assert.deepEqual(shared, [], c.id + ': shares no data number with ' + s);
  for (const ch of c.choices) {
    assert(!src.choices.some(x => norm(x) === norm(ch)), c.id + ': choice "' + ch + '" is a choice of ' + s);
    const p = src.choices.find(x => paraphrase(ch, x)); assert(!p, c.id + ': choice "' + ch + '" paraphrases "' + p + '" of ' + s);
  }
  // Twin, never the test question: no 6-word run shared with the source card (its stem, choices or explanation), no key
  // number equal to the source card's key number, no shared answer choice of 3 or more words.
  const srcText = [src.q, ...src.choices, src.exp].join(' \n '), g = grams(srcText, 6);
  const run6 = [...grams([c.q, ...c.choices, c.exp].join(' \n '), 6)].find(x => g.has(x));
  assert(!run6, c.id + ': shares the 6-word run "' + run6 + '" with ' + s);
  // The lesson too (how and teach): no 6-word run of prose shared with the source card. A run that is mostly symbols,
  // numbers or one-letter variables (a formula such as "E cell = E cathode − E anode") is a standard formula, not
  // copied wording, so it needs at least 4 words of 3+ letters to count.
  const prose = x => x.split(' ').filter(w => /^\p{L}{3,}$/u.test(w)).length >= 4;
  const lrun = [...grams(lessonText(c), 6)].find(x => g.has(x) && prose(x));
  assert(!lrun, c.id + ': its lesson shares the 6-word run "' + lrun + '" with ' + s);
  // A numeric key ("0.50", "4.0 Hz"), not a locant in a name ("3-Methylpent-1-ene", "1,2-shift").
  const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  const keyNum = t => {
    const m = /^([−-]?\d+(?:\.\d+)?)(?:\s*×\s*10([⁻⁰-⁹]+)|([⁻⁰-⁹]+))?(?![\d,.]*[\p{L}-])/u.exec(strip(t).trim());
    if (!m) return null;
    const e = m[2] || m[3], exp = e ? Number([...e].map(ch => SUP[ch] || '').join('')) : 0;
    return m[3] ? Number(m[1]) ** exp : Number(m[1].replace('−', '-')) * 10 ** exp;
  };
  const kn = keyNum(c.choices[c.ans]), sn = keyNum(src.choices[src.ans]);
  assert(kn === null || sn === null || kn !== sn, c.id + ': its key number equals ' + s + "'s key number (" + kn + ')');
  for (const ch of c.choices) if (words(ch) >= 3) assert(!src.choices.some(x => norm(x) === norm(ch)), c.id + ': shares the answer choice "' + ch + '" with ' + s);
  const text = [c.q, ...c.choices, c.exp].join(' ');
  for (const [topic, re] of Object.entries(BLOCKLIST)) assert(!re.test(text), c.id + ': untaught topic ' + topic);
}

// Cards look like the test: a card whose source question shows a figure carries one of the same kind, drawn for its
// own problem: a structure (source `fig` / `choiceFigs`) as a structure on the card or in a lesson step, a graph or
// table (source `chart`) as a chart. On the card itself (stem `fig`/`chart`, `choiceFigs`) when the student must read
// it to answer, otherwise in a lesson step. Every structure name it uses is drawn (data/structures.js, generated by
// tools/draw-structures.py, which checks each with RDKit). MECHANISM: cards whose source graph shows a reaction's
// course, taught with a mechanism-step diagram instead (the user's choice).
const STRUCT = (() => { const c = vm.createContext({}); vm.runInContext(fs.readFileSync(root + '/data/structures.js', 'utf8').replace(/^const /mg, 'var '), c); return c.STRUCT_SVG; })();
const MECHANISM = new Set(['cpt-pe1-48a', 'cpt-pe1-48c']);
const srcKinds = q => new Set([...(q.fig || q.choiceFigs ? ['structure'] : []), ...(q.chart ? ['chart'] : [])]);
const cardFigs = c => { const steps = [...((c.how && c.how.steps) || []), ...(c.teach || [])];
  return { names: [c.fig, c.choiceFigs, ...steps.map(st => st.fig)].flat().filter(x => x != null), chart: !!(c.chart || steps.some(st => st.chart)) }; };
let figCards = 0;
for (const c of CARDS) {
  const need = new Set(c.from.flatMap(r => [...srcKinds(PE.get(r.split('#')[0]))])), f = cardFigs(c);
  for (const n of f.names) assert(typeof n === 'string' && STRUCT[n], c.id + ': figure "' + n + '" is drawn in data/structures.js');
  if (!need.size) continue;
  figCards++;
  assert(f.names.length || f.chart, c.id + ': its source question shows a figure, so the card has one');
  if (need.has('structure') && !need.has('chart')) assert(f.names.length, c.id + ': its source shows a structure, so the card shows one');
  if (need.has('chart') && !need.has('structure') && !MECHANISM.has(c.id)) assert(f.chart, c.id + ': its source shows a graph or table, so the card shows a chart');
  if (MECHANISM.has(c.id)) assert(f.names.length, c.id + ': its mechanism-step diagram is drawn');
}
assert(figCards > 0, 'some cards come from questions with figures');
if (process.env.CPT_FILE) { console.log(`Batch ${CPT_FILE}: ${CARDS.length} cards pass coverage, worked methods, style and originality.`); process.exit(0); }
// ── 4. No QBank in TODAY ──
// The QBank files are byte-identical to main (line endings normalized for Windows checkouts).
const MAIN_SHA = {
  'qb-aamc-bio.js': '34e9175ade7145b498691dc34ce203fc1d7baa6b4a7e9c6e3bc89204bc3d00e8',
  'qb-aamc-biochem.js': 'a32898c2aa7b33a8a1779325a40af07f1892381845c1a7953446e00dfd339a79',
  'qb-aamc-cars.js': '916bae5e3773ad4a64fecf9337c1bd722b13a2cfe339213b0a0dcad6ad209fc8',
  'qb-aamc-chem.js': '868020ff47af93e92703e703893ec533e31e82407c68b321db1401e161fc80ff',
  'qb-aamc-iqb.js': '94998526c5647b26a32729ed241be11d013bcb7759573fe97aab74e819363e9e',
  'qb-aamc-phys.js': '85758bcf5d055ef42026a7401780001280a7b724c086ed2ae4954dec8f0f8d8a',
  'qb-aamc-rules.js': 'a920ff4112e9a9e62c19edddadc0d47b504ac108a65f24f86e40d8152db0a735',
};
for (const [f, sha] of Object.entries(MAIN_SHA)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(root + '/data/' + f, 'utf8').replace(/\r\n/g, '\n')).digest('hex'), sha, f + ' is byte-identical to main');
assert.deepEqual(fs.readdirSync(root + '/data').filter(f => /^qb-/.test(f)).sort(), [...Object.keys(MAIN_SHA), 'qb-aamc-fl.js'].sort(), 'no QBank file added, renamed or removed');
// qb-aamc-fl.js: only the 17 Practice Exam cards the user approved for rewriting (they reused the AAMC question's own
// numbers) changed; every other card, the 59 Sample Test cards included, is exactly as on main.
const REWRITTEN = new Set(['pe1-cp:3', 'pe1-cp:42', 'pe3-cp:7', 'pe3-cp:19', 'pe3-cp:34', 'pe3-cp:39', 'pe3-cp:45', 'pe4-cp:15', 'pe4-cp:22', 'pe4-cp:38', 'pe4-cp:53', 'pe4-cp:54', 'pe5-cp:15', 'pe5-cp:24', 'pe5-cp:49', 'pe5-cp:50', 'pe5-cp:56']);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(FL.filter(q => !REWRITTEN.has(q.src)))).digest('hex'), '723535cabc35911d6f679fbe0910a422e9c8f2708066bb47329721d7cce25eda', 'qb-aamc-fl.js: every card but the 17 approved rewrites is unchanged from main');
assert.equal(FL.length, 354, 'qb-aamc-fl.js keeps its 354 cards');

const storage = new Map(), node = () => ({ innerHTML: '', textContent: '', value: '', hidden: true, style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } });
const nodes = new Map(), el = id => { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); };
const app = vm.createContext({ console: { log() {}, warn() {}, error() {} }, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} },
  document: { getElementById: el, querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}, createElement: node, head: { appendChild() {} }, body: node(), documentElement: node() },
  localStorage: { getItem: k => (storage.has(k) ? storage.get(k) : null), setItem: (k, v) => storage.set(k, String(v)), removeItem: k => storage.delete(k) } });
const run = code => vm.runInContext(code, app);
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
assert.deepEqual(JSON.parse(run("JSON.stringify(BANKS.cpt)")), ['data/cp-test-cards.js'], 'loaded on demand (BANKS.cpt)');
assert(fs.readFileSync(root + '/sw.js', 'utf8').includes("'data/cp-test-cards.js'"), 'precached by the service worker');
assert.equal(run("masteryFlashPool('cp').length"), CARDS.length, 'the C/P flashcard pool is the Practice Test flashcards');
assert(run("masteryFlashPool('cp').every(q => CPTQ_BY_ID.has(q.id) && !AQB_BY_ID.has(q.id) && !FLQ_BY_ID.has(q.id))"), 'no QBank or Practice Exam card in the flashcard pool');
assert(run("masteryPracticePool('cp').every(q => /^pe\\d-cp:/.test(q.src))") && run("masteryPracticePool('cp').length") === 295, 'guided pool: the 295 Practice Exam 1/3/4/5/6 cards, no Sample Test card');
assert(run("masteryFlashPool('bb').every(q => AQB_BY_ID.has(q.id))"), 'other sections keep their QBank flashcards');
const sampleSrc = FL.find(q => /^sample-cp:/.test(q.src)).src, qbSrc = run('AQB_QBANK.find(q => q.src && /^[45][A-E]$/.test(q.aamc)).src');
const peList = [...new Set(CARDS.flatMap(c => c.from.map(r => r.split('#')[0])))];
const today = run('localDay()');
let frontSeen = 0;
for (let day = 0; day < 200; day++) {
  const pe = peList[day % peList.length];
  run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [
    { subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: { '5D': { c: 2, t: 14 } } },
    { subj: 'cp', day: '${today}', t: 2, kind: 'daily', correct: 15, total: 30, pct: 50, scaled: 122, version: 'cp_half_${1 + (day % 6)}', cats: { '5C': { c: 0, t: 2 } }, missIds: [], twinMisses: ['${pe}', '${sampleSrc}', '${qbSrc}'] }] })`);
  const front = JSON.parse(run('JSON.stringify([...masteryTwinFront(masteryPlanNow())])'));
  assert.deepEqual(front, [pe], 'day ' + day + ': only the Practice Exam twin leads (the Sample Test and QBank twins are skipped)');
  // Weakest first: each step's set runs by category (masteryCatRank: weak categories of the latest test, lowest %
  // right first, then untested ones by AAMC weight); within a category the missed twin's cards, then test order
  // (PE1, PE3, PE4, PE5, PE6, then question number, then item).
  const inOrder = `(() => { const plan = masteryPlanNow(), f = masteryTwinFront(plan), rank = masteryCatRank(plan), it = quiz.items.map(v => v.q);
    const key = q => [rank[q.aamc] ?? 99, masteryIsFront(q, f) ? 0 : 1, ...masteryTestKey(q)];
    const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3] || a[4] - b[4] || (a[5] < b[5] ? -1 : a[5] > b[5] ? 1 : 0);
    return it.every((q, i) => !i || cmp(key(it[i - 1]), key(q)) <= 0); })()`;
  run('startMasteryFlashcards(true)');
  const flash = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ id: v.q.id, from: v.q.from || [] })))'));
  assert(flash.length > 0 && flash.every(x => ids.has(x.id)), 'day ' + day + ': flashcards are Practice Test flashcards only');
  assert(run('quiz.items.every(v => !AQB_BY_ID.has(v.q.id) && !(v.q.src && /^sample-cp:/.test(v.q.src)))'), 'day ' + day + ': no QBank or Sample Test card among the flashcards');
  if (run(`(() => { const f = masteryTwinFront(masteryPlanNow()), it = quiz.items.map(v => v.q), i = it.findIndex(q => masteryIsFront(q, f)); return i >= 0 && (i === 0 || it[i - 1].aamc !== it[i].aamc); })()`)) frontSeen++;
  assert(run(inOrder), 'day ' + day + ': the flashcards run weakest category first; in each, the missed twin\'s cards, then test order');
  run('goHome()');
  run('startMasteryGuided(true)');
  const guided = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.src || ""))'));
  assert(guided.length > 0 && guided.every(s => /^pe\d-cp:\d+$/.test(s)), 'day ' + day + ': guided cards are Practice Exam 1/3/4/5/6 cards only');
  assert(run(inOrder), 'day ' + day + ': the guided cards run weakest category first; in each, the missed twin, then test order');
  run('goHome()');
}
assert(frontSeen > 0, 'the flashcards built from a missed twin led their category on some days');
// The latest test has 4A < 5A < 4D < 5E (all weak): both steps open with 4A cards, then 5A, 4D, 5E, then the
// untested categories by AAMC weight; TODAY lists each step's category chips in that order.
{ run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2',
    cats: { '4A': { c: 1, t: 10 }, '5A': { c: 3, t: 10 }, '4D': { c: 5, t: 10 }, '5E': { c: 7, t: 10 }, '5D': { c: 9, t: 10 } } }] })`);
  const want = ['4A', '5A', '4D', '5E'], untested = JSON.parse(run("JSON.stringify(masteryWeights('cp', 'cats').map(([c]) => c))")).filter(c => !want.includes(c) && c !== '5D');
  const expect = [...want, ...untested, '5D'];
  assert.deepEqual(Object.keys(JSON.parse(run('JSON.stringify(masteryCatRank(masteryPlanNow()))'))), expect, 'category rank: weak by % right, untested by AAMC weight, then the strong 5D');
  for (const fn of ['startMasteryFlashcards(true)', 'startMasteryGuided(true)']) {
    run(fn);
    const cats = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.aamc))')), runs = cats.filter((c, i) => !i || cats[i - 1] !== c);
    assert.deepEqual(runs, expect.filter(c => cats.includes(c)), fn + ': one run per category, weakest first (' + runs.join(' ') + ')');
    assert.equal(cats[0], '4A', fn + ': the day opens with 4A cards');
    run('goHome()');
  }
  const html = run('masteryCard()');
  for (const step of ['Flashcards', 'Guided Practice Exam cards']) {
    const part = html.slice(html.indexOf('<b>' + step)), chips = [...part.slice(0, part.indexOf('</li>')).matchAll(/class="mastery-chip[^"]*"[^>]*>(?:✓ )?([45][A-E]) /g)].map(m => m[1]);
    assert.deepEqual(chips, expect.filter(c => chips.includes(c)), step + ': TODAY lists the category chips weakest first');
    assert(chips.length >= 8, step + ': chips shown');
  }
  assert(/4A [^<]*<b>weak<\/b>/.test(html), 'weak categories are still marked weak');
  // The TODAY card describes the C/P steps as they are now: no QBank anywhere.
  assert(!/QBank/i.test(html), 'TODAY never says QBank for C/P');
  assert(html.includes('flashcards built from the C/P questions of AAMC Practice Exams 1, 3, 4, 5 and 6') && html.includes('Help me / Show me how') && html.includes('Split exactly like the exam') && html.includes('Weakest categories first'), 'step 1 says what it does now');
}
// A full day: on a fresh day the flashcard step plans exactly 50 at the AAMC split, with no shortfall moved between
// categories, and the session holds 50 different Practice Test flashcards, each from the category it counts for.
{ run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: {} }] })`);
  const step = JSON.parse(run("JSON.stringify(masteryPlanNow().steps.find(s => s.id === 'flashcards'))"));
  const want = JSON.parse(run("JSON.stringify(Object.fromEntries(masteryBlueprintSplit(50, masteryWeights('cp')).map(t => [t.code, t.need])))"));
  assert.equal(step.count, 50, 'the flashcard step is 50 cards');
  assert.deepEqual(Object.fromEntries(step.topics.map(t => [t.code, t.need])), want, 'exactly the AAMC split: ' + JSON.stringify(want));
  assert(step.topics.every(t => t.short === 0 && t.spill === 0), 'no shortfall moved between categories');
  run('startMasteryFlashcards()');
  const day = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ id: v.q.id, cat: masteryCategory(v.q), topic: quiz.topicOf[v.q.id] })))'));
  assert.equal(day.length, 50, 'a day holds 50 flashcards');
  assert.equal(new Set(day.map(x => x.id)).size, 50, 'no card twice');
  assert(day.every(x => ids.has(x.id) && x.cat === x.topic), 'every card is a Practice Test flashcard from the category it counts for');
  assert.deepEqual(day.reduce((o, x) => (o[x.cat] = (o[x.cat] || 0) + 1, o), {}), want, 'the day\'s set is exactly the AAMC split');
  run('goHome()'); }

// ── Report ──
const split = JSON.parse(run("JSON.stringify(masteryBlueprintSplit(50, masteryWeights('cp')).map(t => [t.code, t.need]))"));
const perCat = CARDS.reduce((o, c) => (o[c.aamc] = (o[c.aamc] || 0) + 1, o), {});
const short = split.filter(([c, n]) => (perCat[c] || 0) < n).map(([c, n]) => `${c} ${perCat[c] || 0}/${n}`);
if (TABLE) {
  console.log('Category  cards  daily need  deck target (250)');
  for (const [c, n] of split) console.log(`  ${c}      ${String(perCat[c] || 0).padStart(4)}  ${String(n).padStart(10)}  ${String(DECK_TARGET[c]).padStart(17)}`);
  console.log('Coverage (question → flashcards; items without their own card are taught inside a card\'s lesson):');
  for (const s of BUILT) console.log(`  ${s}${SPEC.bySrc.get(s).match === 'partial' ? ' (Partial)' : ''} → ${bySrc.get(s).join(', ')}`);
}
assert.deepEqual(short, [], 'every category has its 50-card daily count');
if (ALL_BUILT) for (const [c, n] of Object.entries(DECK_TARGET)) assert(Math.abs((perCat[c] || 0) - n) <= 2, `category ${c}: ${perCat[c] || 0} cards, target ${n} ± 2`);
console.log(`Practice Test flashcards passed: ${CARDS.length}/${DECK_MAX} cards covering ${covered}/${PE.size} Practice Exam C/P questions and ${SPEC.items.length - missingItems.length}/${SPEC.items.length} spec items` +
  `; stems median ${sm} words, choices median ${cm} / p90 ${c90}; how/teach valid; original against their sources; figures like their sources'; 200 simulated days with no QBank or Sample Test card in TODAY's flashcard or guided steps, each step weakest category first, then test order; QBank files identical to main.` +
  (short.length ? ` Short of the 50-card split: ${short.join(', ')}.` : ''));
