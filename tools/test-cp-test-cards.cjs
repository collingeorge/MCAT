// C/P Practice Test flashcards (data/cp-test-cards.js) and TODAY's C/P steps without the QBank.
//   1 Coverage: every card's `from` resolves to a Practice Exam 1/3/4/5/6 C/P card (pe1-cp … pe6-cp in
//     data/qb-aamc-fl.js) and carries that card's `aamc` and `disc`; every Practice Exam question written so far
//     (BUILT; all 295 once the deck is complete) has at least one card; each card has a valid `how` (ask, know,
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
const root = __dirname + '/..';
const TABLE = process.argv.includes('--table');

const data = vm.createContext({});
for (const f of ['qb-aamc-fl.js', 'cp-test-cards.js']) vm.runInContext(fs.readFileSync(root + '/data/' + f, 'utf8').replace(/^const /mg, 'var '), data, { filename: f });
const FL = data.QB_AAMC_FL, CARDS = data.CP_TEST_CARDS;
const PE_RE = /^pe[13456]-cp:\d+$/;
const PE = new Map(FL.filter(q => PE_RE.test(q.src)).map(q => [q.src, q]));
assert.equal(PE.size, 295, 'Practice Exams 1, 3, 4, 5 and 6: 59 C/P questions each');
// The Practice Exam questions written so far. INTERIM (review commit): Practice Exam 1, Q1–10. When the deck is
// complete this becomes every one of the 295 (ALL_BUILT = true) and the coverage check covers them all.
const ALL_BUILT = false;
const BUILT = ALL_BUILT ? [...PE.keys()] : Array.from({ length: 10 }, (_, i) => 'pe1-cp:' + (i + 1));

// ── 1. Coverage and worked methods ──
const strip = t => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\*\*/g, '');
const words = t => strip(t).trim().split(/\s+/).filter(Boolean).length;
const ids = new Set(), stems = new Map(), bySrc = new Map([...PE.keys()].map(s => [s, []]));
for (const c of CARDS) {
  const id = c.id;
  assert(typeof id === 'string' && /^cpt-pe[13456]-\d{2}[a-z]$/.test(id), 'id format: ' + id);
  assert(!ids.has(id), 'unique id: ' + id); ids.add(id);
  assert(typeof c.s === 'string' && c.s.trim(), id + ': topic tag s');
  assert(Array.isArray(c.from) && c.from.length >= 1 && new Set(c.from).size === c.from.length, id + ': from is a list of distinct sources');
  for (const s of c.from) { assert(PE.has(s), id + ': from "' + s + '" is a Practice Exam 1/3/4/5/6 C/P card'); assert(BUILT.includes(s), id + ': from "' + s + '" is a question written so far'); bySrc.get(s).push(id); }
  assert(c.from.some(s => PE.get(s).aamc === c.aamc && PE.get(s).disc === c.disc), id + ': aamc and disc come from a source card');
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
}
const uncovered = BUILT.filter(s => !bySrc.get(s).length);
assert.deepEqual(uncovered, [], 'every Practice Exam question written so far has at least one flashcard');
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
const dataNums = t => numsOf(strip(t).replace(LOCANT, ' '));
for (const c of CARDS) for (const s of c.from) {
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
const peList = [...new Set(CARDS.flatMap(c => c.from))];
const today = run('localDay()');
let frontSeen = 0;
for (let day = 0; day < 200; day++) {
  const pe = peList[day % peList.length];
  run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [
    { subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: { '5D': { c: 2, t: 14 } } },
    { subj: 'cp', day: '${today}', t: 2, kind: 'daily', correct: 15, total: 30, pct: 50, scaled: 122, version: 'cp_half_${1 + (day % 6)}', cats: { '5C': { c: 0, t: 2 } }, missIds: [], twinMisses: ['${pe}', '${sampleSrc}', '${qbSrc}'] }] })`);
  const front = JSON.parse(run('JSON.stringify([...masteryTwinFront(masteryPlanNow())])'));
  assert.deepEqual(front, [pe], 'day ' + day + ': only the Practice Exam twin leads (the Sample Test and QBank twins are skipped)');
  // Test order: each step's set runs PE1, PE3, PE4, PE5, PE6, then question number, then item; front cards first.
  const inOrder = `(() => { const f = masteryTwinFront(masteryPlanNow()), it = quiz.items.map(v => v.q), k = it.findIndex(q => !masteryIsFront(q, f)), rest = k < 0 ? [] : it.slice(k);
    const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || (a[3] < b[3] ? -1 : a[3] > b[3] ? 1 : 0);
    return rest.every(q => !masteryIsFront(q, f)) && rest.every((q, i) => !i || cmp(masteryTestKey(rest[i - 1]), masteryTestKey(q)) <= 0); })()`;
  run('startMasteryFlashcards(true)');
  const flash = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ id: v.q.id, from: v.q.from || [] })))'));
  assert(flash.length > 0 && flash.every(x => ids.has(x.id)), 'day ' + day + ': flashcards are Practice Test flashcards only');
  assert(run('quiz.items.every(v => !AQB_BY_ID.has(v.q.id) && !(v.q.src && /^sample-cp:/.test(v.q.src)))'), 'day ' + day + ': no QBank or Sample Test card among the flashcards');
  const lead = flash.findIndex(x => !x.from.includes(pe));
  if (lead > 0) frontSeen++;
  assert(flash.slice(lead < 0 ? flash.length : lead).every(x => !x.from.includes(pe)), 'day ' + day + ': the flashcards built from the missed twin come first');
  assert(run(inOrder), 'day ' + day + ': the flashcards run in test order after the front cards');
  run('goHome()');
  run('startMasteryGuided(true)');
  const guided = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.src || ""))'));
  assert(guided.length > 0 && guided.every(s => /^pe\d-cp:\d+$/.test(s)), 'day ' + day + ': guided cards are Practice Exam 1/3/4/5/6 cards only');
  if (guided.includes(pe)) assert.equal(guided[0], pe, 'day ' + day + ': the missed Practice Exam twin leads the guided step');
  assert(run(inOrder), 'day ' + day + ': the guided cards run in test order after the front card');
  run('goHome()');
}
assert(frontSeen > 0, 'the flashcards built from a missed twin led the flashcard step on some days');

// ── Report ──
const split = JSON.parse(run("JSON.stringify(masteryBlueprintSplit(50, masteryWeights('cp')).map(t => [t.code, t.need]))"));
const perCat = CARDS.reduce((o, c) => (o[c.aamc] = (o[c.aamc] || 0) + 1, o), {});
const short = split.filter(([c, n]) => (perCat[c] || 0) < n).map(([c, n]) => `${c} ${perCat[c] || 0}/${n}`);
if (TABLE) {
  console.log('Category  cards  daily need');
  for (const [c, n] of split) console.log(`  ${c}      ${String(perCat[c] || 0).padStart(4)}  ${n}`);
  console.log('Coverage (question → flashcards):');
  for (const s of BUILT) console.log(`  ${s} → ${bySrc.get(s).join(', ')}`);
}
if (ALL_BUILT) assert.deepEqual(short, [], 'every category has its 50-card daily count');
console.log(`Practice Test flashcards passed: ${CARDS.length} cards covering ${covered}/${PE.size} Practice Exam C/P questions` + (ALL_BUILT ? '' : ` (INTERIM: ${BUILT.length} written so far)`) +
  `; stems median ${sm} words, choices median ${cm} / p90 ${c90}; how/teach valid; original against their sources; 200 simulated days with no QBank or Sample Test card in TODAY's flashcard or guided steps, each step in test order; QBank files identical to main.` +
  (short.length ? ` Short of the 50-card split: ${short.join(', ')}.` : ''));
