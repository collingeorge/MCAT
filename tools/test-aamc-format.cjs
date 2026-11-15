// AAMC length and format for every Chem/Phys (C/P) item: the passages and questions of data/cp-practice.js,
// data/cp-pool.js and data/cp-diagnostic.js, and the C/P flashcards (the cards TODAY's flashcard step uses,
// masteryExamPool('cp') in js/mastery.js: every card of qb-aamc-chem.js, qb-aamc-phys.js and qb-aamc-biochem.js,
// and the cards of qb-aamc-iqb.js in a C/P content category, 4A–5E). data/qb-aamc-fl.js (Practice Exam cards,
// which put passage context into the stem) is measured and reported but never fails the test.
//
// Reference, measured on the AAMC exams: passages 251 words (middle half 214–303, range 131–405); passage-question
// stems 18 (14–24, 6–54); stand-alone stems 23 (13–33, 7–57); 2 words per answer choice (1–5, 90% ≤ 9).
// Words = whitespace-separated tokens after markup (**bold**, <tags>) is stripped.
//
// Part A, length bands (enforced files):
//   passages 150–400 words, each file's median 220–290;
//   passage-question stems 6–50 words, each file's median 15–22;
//   stand-alone and flashcard stems 7–57 words;
//   answer choices: each file's median ≤ 4 words and 90th percentile ≤ 12;
//   key length: the key may not be the single longest choice by more than 1.5× the next-longest, in words, when it
//     is also at least 3 words longer (so "Social loafing" against "Deindividuation", 2 words against 1, passes).
//     Characters are reported, not enforced: symbols, formulas and units make character counts noisy.
// Part B, format (enforced files; every allowance is named where it is applied):
//   1 stems end in "?", ":" or a blank ("___") that the choices complete;
//   2 sentence-completing choices (stem ends in ":" or a blank, and the choice is a phrase of 4+ words, not a
//     number, formula, name or label) start lowercase (proper nouns, symbols and acronyms excepted) and end with ".";
//   3 NOT and EXCEPT are capitalized when they are the question's negation;
//   4 choices are parallel: the same terminal punctuation, the same initial case (proper nouns, symbols, acronyms
//     and numbers count as either case), and all numeric or none numeric;
//   5 numeric choices carry units (dimensionless quantities excepted, see UNITLESS) and are listed in increasing or
//     decreasing order; the order check skips choices with figures and choices that are not all plain numbers;
//   6 two-part choices ("X; Y", "X / Y", "Yes, because …") use one frame across all four choices;
//   7 no meta wording ("this card", "flashcard", "this question card");
//   8 explanations never name answer letters ("choice B", "(C)").
// Run with --list to print every finding, --json=<file> to save the numbers.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const LIST = args.includes('--list');
const JSON_OUT = (args.find(a => a.startsWith('--json=')) || '').slice(7);

const read = f => fs.readFileSync(path.join(root, 'data', f), 'utf8').replace(/\r\n?/g, '\n');
function load(file, name) {
  const ctx = vm.createContext({});
  vm.runInContext(read(file) + '\n;globalThis.__v = ' + name + ';', ctx, { filename: file });
  return ctx.__v;
}

// ── Text helpers ──
const strip = t => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\*\*|__(?=\w)|(?<=\w)__/g, '');
const words = t => strip(t).trim().split(/\s+/).filter(Boolean).length;
const chars = t => strip(t).trim().length;
const median = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const pct = (a, p) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(p * s.length) - 1)]; };

// ── Items ──
const CP_CATS = /^[45][A-E]$/; // MASTERY.topics.cp in js/mastery.js
const files = [];
function passageFile(file, name, get) {
  const data = load(file, name), passages = [], questions = [];
  for (const set of get(data)) {
    for (const p of set.passages || []) {
      passages.push({ file, id: p.id, text: p.passage });
      for (const q of p.questions || []) questions.push({ file, id: q.id, kind: 'pq', q });
    }
    for (const q of set.standalones || []) questions.push({ file, id: q.id, kind: 'sa', q });
  }
  files.push({ file, enforced: true, passages, questions });
}
passageFile('cp-practice.js', 'CP_PRACTICE', d => [{ passages: d }]);
passageFile('cp-pool.js', 'CP_POOL', d => d);
passageFile('cp-diagnostic.js', 'CP_DIAG', d => [d]);
for (const [file, name, all] of [['qb-aamc-chem.js', 'QB_AAMC_CHEM', true], ['qb-aamc-phys.js', 'QB_AAMC_PHYS', true],
  ['qb-aamc-biochem.js', 'QB_AAMC_BIOCHEM', true], ['qb-aamc-iqb.js', 'QB_AAMC_IQB', false], ['qb-aamc-fl.js', 'QB_AAMC_FL', true]]) {
  const cards = load(file, name).filter(q => all || CP_CATS.test(q.aamc));
  files.push({ file, enforced: file !== 'qb-aamc-fl.js', passages: [], questions: cards.map(q => ({ file, id: q.src, kind: 'fc', q })) });
}

// ── Classifiers ──
const NUM_RE = /^[−\-+±~≈<>]?\s*(\d[\d,]*(\.\d+)?|\.\d+)(\s*\/\s*\d+)?(\s*[×x]\s*10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/;
const isNumeric = c => NUM_RE.test(strip(c).trim());
const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
function numValue(c) {
  const m = NUM_RE.exec(strip(c).trim()); if (!m) return null;
  let s = m[0].replace(/[~≈<>±+\s,]/g, '').replace('−', '-');
  let e = 0; const x = /[×x]10([⁻⁰-⁹]+)$/.exec(s);
  if (x) { e = Number([...x[1]].map(ch => SUP[ch] || '').join('')); s = s.slice(0, x.index); }
  const v = s.includes('/') ? s.split('/').reduce((a, b) => Number(a) / Number(b)) : Number(s);
  return Number.isFinite(v) ? v * 10 ** e : null;
}
const unitOf = c => strip(c).trim().replace(NUM_RE, '').trim();
// Dimensionless quantities, which AAMC lists without units: pH and pK values, ratios, counts and "how many",
// equivalents, factors and fractions, orders, charges and oxidation states, coefficients, indices, efficiencies,
// probabilities, equilibrium constants (reported unitless on the MCAT), multiples ("times as great"), magnification,
// percent (the % sign is its unit) and decibel-free logarithms.
const UNITLESS = /\bp(H|OH|Ka|Kb|I|Ksp)\b|\bpK|ratio|how many|number of|\bcount|equivalent|factor|fraction|\border\b|charge|oxidation (state|number)|coefficient|\bindex\b|efficien|probabilit|percent|\bK(eq|a|b|sp|c|p|m|d|w)?\b|equilibrium constant|times|multiple|magnification|power of the lens|significant figures|degrees? of unsaturation|quantum number|\bn\b|\bQ\b|log|proportion|mole fraction|specific gravity|refractive|turnover|Hill coefficient|valence|multiplicity|half-lives|value of|by what|change by|increase by|decrease by|scale|exponent|stoichiometr|\bx\b|\bcos|\bsin|\btan/i;
const LETTER_LIKE = t => /[A-Z].*[A-Z]|[0-9]|[^A-Za-zÀ-ž'’-]/.test(t) && !/^[A-Z][a-z]+[,.;:]?$/.test(t); // acronym/symbol/formula
const firstWord = c => strip(c).trim().split(/\s+/)[0] || '';
const NOUNS = new Set(); // words seen capitalized mid-sentence in this content: proper nouns
for (const f of files) {
  const texts = [...f.passages.map(p => p.text), ...f.questions.flatMap(x => [x.q.q, x.q.exp, ...(x.q.choices || [])])];
  for (const t of texts) for (const m of strip(t).matchAll(/[a-z0-9,;)] ([A-Z][a-zà-ž]+(?:['’]s)?)/g)) NOUNS.add(m[1].replace(/['’]s$/, ''));
}
const isProper = w => { const b = w.replace(/[^\p{L}\p{N}'’-]/gu, '').replace(/['’]s$/, ''); return LETTER_LIKE(w) || NOUNS.has(b) || /^[A-Z][a-z]*-/.test(w); };
function caseOf(c) {
  const w = firstWord(c);
  if (!w || isNumeric(c) || !/^\p{L}/u.test(w) || isProper(w)) return '*';
  return /^\p{Lu}/u.test(w) ? 'U' : 'L';
}
const term = c => { const t = strip(c).trim(); return /[.?!]$/.test(t) ? t.slice(-1) : ''; };
const completes = stem => /(:|_{2,}\.?)$/.test(strip(stem).trim()) || /_{2,}/.test(strip(stem));
const isPhrase = c => !isNumeric(c) && words(c) >= 4;
function frame(c) {
  const t = strip(c).trim();
  const yn = /^(Yes|No)[,;]\s+(\w+)/.exec(t);
  if (yn) return 'yesno ' + yn[2].toLowerCase();
  if (t.includes('; ')) return ';';
  if (/\S \/ \S/.test(t)) return '/';
  return '';
}

// ── Checks ──
const findings = [];
const add = (f, x, band, msg) => findings.push({ file: f.file, enforced: f.enforced, id: x.id, band, msg });
for (const f of files) {
  f.stats = { passage: [], pqStem: [], saStem: [], choice: [], fail: {} };
  const fail = band => { f.stats.fail[band] = (f.stats.fail[band] || 0) + 1; };
  for (const p of f.passages) {
    const n = words(p.text); f.stats.passage.push(n);
    if (n < 150 || n > 400) { fail('passage'); add(f, p, 'passage', n + ' words (150–400)'); }
  }
  for (const x of f.questions) {
    const q = x.q, stem = strip(q.q).trim(), n = words(q.q), ch = q.choices || [];
    const lim = x.kind === 'pq' ? [6, 50] : [7, 57];
    f.stats[x.kind === 'pq' ? 'pqStem' : 'saStem'].push(n);
    if (n < lim[0] || n > lim[1]) { fail(x.kind === 'pq' ? 'pqStem' : 'saStem'); add(f, x, x.kind === 'pq' ? 'pqStem' : 'saStem', n + ' words (' + lim.join('–') + ')'); }
    const hasFig = Array.isArray(q.choiceFigs) && q.choiceFigs.some(Boolean);
    ch.forEach(c => f.stats.choice.push(words(c)));
    // Key length
    const w = ch.map(words), cc = ch.map(chars);
    const others = w.filter((_, i) => i !== q.ans), next = Math.max(...others);
    if (w[q.ans] > 1.5 * next && w[q.ans] - next >= 3) { fail('keyLength'); add(f, x, 'keyLength', `key ${w[q.ans]} words vs next ${next}`); }
    const nextC = Math.max(...cc.filter((_, i) => i !== q.ans));
    if (cc[q.ans] > 1.5 * nextC && cc[q.ans] - nextC >= 20) { f.stats.keyChars = (f.stats.keyChars || 0) + 1; }
    // 1 stem ending
    if (!/(\?|:|_{2,}\.?)$/.test(stem)) { fail('stemEnd'); add(f, x, 'stemEnd', 'stem ends "' + stem.slice(-25) + '"'); }
    // 2 sentence-completing choices
    if (completes(q.q) && !hasFig) for (const c of ch) if (isPhrase(c)) {
      if (caseOf(c) === 'U') { fail('completeCase'); add(f, x, 'completeCase', 'capitalized: ' + c); }
      if (term(c) !== '.') { fail('completePeriod'); add(f, x, 'completePeriod', 'no period: ' + c); }
    }
    // 3 NOT / EXCEPT
    const main = stem.split(/,|\b(if|when|because|after|before|while|although|since|that|whose|which)\b/)[0];
    if (/^(Which|What|Each|All|Any)\b/.test(stem) && /\b(not|except)\b/.test(main) && !/\bnot only\b/.test(main)) { fail('negation'); add(f, x, 'negation', stem); }
    if (/\bexcept[:?]?$/.test(stem) || /\ball of the following\b.*\bexcept\b/.test(stem)) { fail('negation'); add(f, x, 'negation', stem); }
    if (hasFig) continue;
    // 4 parallel form
    const cases = new Set(ch.map(caseOf).filter(k => k !== '*'));
    if (cases.size > 1) { fail('parallelCase'); add(f, x, 'parallelCase', JSON.stringify(ch)); }
    if (new Set(ch.map(term)).size > 1) { fail('parallelEnd'); add(f, x, 'parallelEnd', JSON.stringify(ch)); }
    const nums = ch.map(isNumeric);
    if (nums.some(Boolean) && !nums.every(Boolean)) { fail('parallelNumeric'); add(f, x, 'parallelNumeric', JSON.stringify(ch)); }
    // 5 units and order
    if (nums.every(Boolean)) {
      const units = ch.map(unitOf);
      if (units.some(u => !u) && !UNITLESS.test(stem)) { fail('units'); add(f, x, 'units', stem.slice(-60) + ' ' + JSON.stringify(ch)); }
      const plain = units.every(u => u === units[0]) || units.every(u => /^\S{1,6}$/.test(u));
      const v = ch.map(numValue);
      if (plain && v.every(n => n !== null)) {
        const up = v.every((n, i) => !i || n >= v[i - 1]), down = v.every((n, i) => !i || n <= v[i - 1]);
        if (!up && !down) { fail('order'); add(f, x, 'order', JSON.stringify(ch)); }
      }
    }
    // 6 two-part frame
    const fr = ch.map(frame);
    if (fr.some(Boolean) && new Set(fr).size > 1) { fail('frame'); add(f, x, 'frame', JSON.stringify(ch)); }
    // 7 meta wording, 8 answer letters
    const all = [q.q, q.exp, ...ch].join(' ');
    if (/\bthis card\b|flash ?cards?\b|this question card|\bthis deck\b/i.test(all)) { fail('meta'); add(f, x, 'meta', (all.match(/.{0,30}(this card|flash ?cards?|this question card|this deck).{0,30}/i) || [''])[0]); }
    if (/\b(choice|option|answer)\s+\(?[A-D]\)?(?![\w-])|\([A-D]\)\s/.test(strip(q.exp))) { fail('letters'); add(f, x, 'letters', (strip(q.exp).match(/.{0,30}(\b(choice|option|answer)\s+\(?[A-D]\)?|\([A-D]\)\s).{0,20}/) || [''])[0]); }
  }
  // File bands
  const s = f.stats;
  if (f.passages.length) {
    const m = median(s.passage);
    if (m < 220 || m > 290) { fail('passageMedian'); add(f, { id: '(file)' }, 'passageMedian', 'median ' + m + ' (220–290)'); }
    const mq = median(s.pqStem);
    if (mq < 15 || mq > 22) { fail('pqStemMedian'); add(f, { id: '(file)' }, 'pqStemMedian', 'median ' + mq + ' (15–22)'); }
  }
  if (median(s.choice) > 4) { fail('choiceMedian'); add(f, { id: '(file)' }, 'choiceMedian', 'median ' + median(s.choice) + ' (≤ 4)'); }
  if (pct(s.choice, 0.9) > 12) { fail('choiceP90'); add(f, { id: '(file)' }, 'choiceP90', 'p90 ' + pct(s.choice, 0.9) + ' (≤ 12)'); }
}

// ── Report ──
const summary = {};
for (const f of files) {
  const b = a => (a.length ? { n: a.length, median: median(a), p90: pct(a, 0.9), min: Math.min(...a), max: Math.max(...a) } : null);
  summary[f.file] = { enforced: f.enforced, passage: b(f.stats.passage), pqStem: b(f.stats.pqStem), saStem: b(f.stats.saStem), choice: b(f.stats.choice), keyLongByChars: f.stats.keyChars || 0, failures: f.stats.fail };
}
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify({ summary, findings }, null, 1) + '\n');
if (LIST) for (const x of findings) console.log(`${x.enforced ? 'FAIL' : 'info'} ${x.file} ${x.id} [${x.band}] ${x.msg}`);
for (const [file, s] of Object.entries(summary)) {
  const fmt = (k, v) => (v ? `${k} ${v.median}/${v.p90} (${v.min}–${v.max})` : '');
  console.log(`${s.enforced ? '' : '[report only] '}${file}: ${['passage', 'pqStem', 'saStem', 'choice'].map(k => fmt(k, s[k])).filter(Boolean).join(', ')}; failures ${JSON.stringify(s.failures)}`);
}
const bad = findings.filter(x => x.enforced);
if (bad.length) {
  if (!LIST) for (const x of bad.slice(0, 40)) console.error(`${x.file} ${x.id} [${x.band}] ${x.msg}`);
  console.error(`AAMC length and format: ${bad.length} problem(s) in C/P items` + (LIST ? '' : ' (run with --list for all)'));
  process.exit(1);
}
console.log(`AAMC length and format passed: ${files.filter(f => f.enforced).reduce((n, f) => n + f.questions.length, 0)} C/P questions and cards, ${files.reduce((n, f) => n + f.passages.length, 0)} passages.`);
