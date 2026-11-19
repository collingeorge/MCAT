// AAMC length and format for every Chem/Phys (C/P) item: the passages and questions of data/cp-pool.js and
// data/cp-diagnostic.js, and the C/P flashcards (the cards TODAY's flashcard step uses,
// masteryExamPool('cp') in js/mastery.js: every card of qb-aamc-chem.js, qb-aamc-phys.js and qb-aamc-biochem.js,
// and the cards of qb-aamc-iqb.js in a C/P content category, 4A–5E; and data/cp-test-cards.js, the Practice Test
// flashcards TODAY's C/P flashcard step now uses). data/qb-aamc-fl.js (Practice Exam cards,
// which put passage context into the stem) is measured and reported but never fails the test.
//
// Reference, measured on the AAMC exams: passages 251 words (middle half 214–303, range 131–405); passage-question
// stems 18 (14–24, 6–54); stand-alone stems 23 (13–33, 7–57); 2 words per answer choice (1–5, 90% ≤ 9).
// Words = whitespace-separated tokens after markup (**bold**, <tags>) is stripped.
//
// Part A, length bands (enforced files):
//   passages 150–400 words, each file's median 220–290;
//   passage-question stems 6–50 words, each file's median 15–22;
//   stand-alone and flashcard stems 7–57 words (a Practice Test flashcard with a twin passage: 6–50, as a passage
//     question; its short passage is checked by tools/test-cp-test-cards.cjs, not by the AAMC passage band);
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
//     decreasing order. Units that differ by an SI prefix are compared in one unit. The order in the data is
//     REPORTED, not enforced: the app shows every set of plain numbers in one unit from lowest to highest
//     (choiceOrder in js/app.js, checked in test-worked-methods.cjs), so what a student sees is in order, and
//     reordering the data would move the key (ans) in most items;
//   6 two-part choices ("X; Y", "X / Y", "Yes; …" or "Yes, …") use one frame across all four choices (a reason
//     clause such as ", because …" is part of the answer, not a frame);
//   7 no meta wording ("this card", "flashcard", "this question card");
//   8 explanations never name answer letters ("choice B", "(C)").
// Part C, every bank in data/ (all sections, not only C/P): no exp, how or teach text points at a choice by
//   position ("the second choice", "the last option") or letter ("choice B", "option D"). The app sorts numeric
//   choices and shuffles all others, so a position names the wrong choice; name the choice by its text instead.
// Run with --list to print every finding, --json=<file> to save the numbers, --data=<dir> to measure another copy
// of data/.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const LIST = args.includes('--list');
const JSON_OUT = (args.find(a => a.startsWith('--json=')) || '').slice(7);
const DATA = (args.find(a => a.startsWith('--data=')) || '').slice(7) || path.join(root, 'data'); // another copy of data/

const read = f => fs.readFileSync(path.join(DATA, f), 'utf8').replace(/\r\n?/g, '\n');
function load(file, name) {
  const ctx = vm.createContext({});
  vm.runInContext(read(file) + '\n;globalThis.__v = ' + name + ';', ctx, { filename: file });
  return ctx.__v;
}

// ── Text helpers ──
const strip = t => String(t == null ? '' : t).replace(/<\/?[a-z][a-z0-9]*(?:\s[^<>]*)?\/?>/gi, ' ').replace(/\*\*|__(?=\w)|(?<=\w)__/g, '');
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
passageFile('cp-pool.js', 'CP_POOL', d => d);
passageFile('cp-diagnostic.js', 'CP_DIAG', d => [d]);
for (const [file, name, all] of [['qb-aamc-chem.js', 'QB_AAMC_CHEM', true], ['qb-aamc-phys.js', 'QB_AAMC_PHYS', true],
  ['qb-aamc-biochem.js', 'QB_AAMC_BIOCHEM', true], ['qb-aamc-iqb.js', 'QB_AAMC_IQB', false], ['qb-aamc-fl.js', 'QB_AAMC_FL', true],
  ['cp-test-cards.js', 'CP_TEST_CARDS', true]]) {
  const cards = load(file, name).filter(q => all || CP_CATS.test(q.aamc));
  files.push({ file, enforced: file !== 'qb-aamc-fl.js', passages: [], questions: cards.map(q => ({ file, id: q.src || q.id, kind: q.passage ? 'pq' : 'fc', q })) });
}

// ── Classifiers ──
// A number (sign, decimals, a fraction or a power of ten), alone or followed by a space, %, ° or ′: "1-pentene",
// "2F" and "4L/n" are names and expressions, not numbers.
const NUM_RE = /^[−\-+±~≈<>]?\s*√?(\d[\d,]*(\.\d+)?|\.\d+)(\s*\/\s*\d+)?(\s*[×x]\s*10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?(?=$|\s|[%°′])/;
const isNumeric = c => NUM_RE.test(strip(c).trim());
const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
function numValue(c) {
  const m = NUM_RE.exec(strip(c).trim()); if (!m) return null;
  let s = m[0].replace(/[~≈<>±+\s,]/g, '').replace('−', '-'), root = false;
  if (s.includes('√')) { root = true; s = s.replace('√', ''); }
  let e = 0; const x = /[×x]10([⁻⁰-⁹]+)$/.exec(s);
  if (x) { e = Number([...x[1]].map(ch => SUP[ch] || '').join('')); s = s.slice(0, x.index); }
  const v = s.includes('/') ? s.split('/').reduce((a, b) => Number(a) / Number(b)) : Number(s);
  return Number.isFinite(v) ? (root ? Math.sqrt(v) : v) * 10 ** e : null;
}
// Unit scale: units that differ only by an SI prefix (cm and m, μM and mM, kPa and Pa) are compared in one unit.
const PREFIX = { n: 1e-9, 'μ': 1e-6, 'µ': 1e-6, m: 1e-3, c: 1e-2, d: 1e-1, k: 1e3, M: 1e6, G: 1e9 };
function unitScales(units) {
  if (units.every(u => u === units[0])) return units.map(() => 1);
  for (const base of new Set(units.flatMap(u => [u, u.slice(1)]))) {
    if (!base) continue;
    const sc = units.map(u => (u === base ? 1 : u.slice(1) === base && PREFIX[u[0]] ? PREFIX[u[0]] : null));
    if (sc.every(x => x !== null)) return sc;
  }
  return null;
}
const unitOf = c => strip(c).trim().replace(NUM_RE, '').trim();
// Dimensionless quantities, which AAMC lists without units: pH and pK values, ratios, counts and "how many",
// equivalents, factors and fractions, orders, charges and oxidation states, coefficients, indices, efficiencies,
// probabilities, equilibrium constants (reported unitless on the MCAT), multiples ("times as great"), magnification,
// percent (the % sign is its unit) and decibel-free logarithms.
const UNITLESS = /\bp(H|OH|Ka|Kb|I|Ksp)\b|\bpK|ratio|how many|number\b|\bcount|equivalent|factor|fraction|\border\b|charge|oxidation (state|number)|coefficient|\bindex\b|efficien|probabilit|percent|\bK(eq|a|b|sp|c|p|m|d|w)?\b|equilibrium constant|times|multipl|magnification|power of the lens|significant figures|degrees? of unsaturation|quantum number|\bn\b|\bQ\b|log|proportion|mole fraction|specific gravity|refractive|turnover|Hill coefficient|valence|multiplicity|half-lives|value of|by what|change by|increase by|decrease by|scale|exponent|stoichiometr|\bx\b|\bcos|\bsin|\btan/i;
const LETTER_LIKE = t => /[A-Z].*[A-Z]|[0-9]|[^A-Za-zÀ-ž'’-]/.test(t) && !/^[A-Z][a-z]+[,.;:]?$/.test(t); // acronym/symbol/formula
const firstWord = c => strip(c).trim().split(/\s+/)[0] || '';
const NOUNS = new Set(); // words seen capitalized mid-sentence in this content: proper nouns
for (const f of files) {
  const texts = [...f.passages.map(p => p.text), ...f.questions.flatMap(x => [x.q.q, x.q.exp, ...(x.q.choices || [])])];
  for (const t of texts) for (const m of strip(t).matchAll(/[a-z0-9,;)] ([A-Z][a-zà-ž]+(?:['’]s)?)/g)) NOUNS.add(m[1].replace(/['’]s$/, ''));
}
// Symbols written in lowercase: kcat, pH, pKa, mRNA, sp².
const SYMBOL = /^(k(cat|on|off)?|K[a-z]*|p[A-Z]\w*|[a-z]+[A-Z]\w*|sp[²³]?|[a-zα-ω])$/;
const isProper = w => { const b = w.replace(/[^\p{L}\p{N}'’-]/gu, '').replace(/['’]s$/, ''); return LETTER_LIKE(w) || NOUNS.has(b) || SYMBOL.test(b) || /^[A-Z][a-z]*-/.test(w); };
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
  const yn = /^(Yes|No)([,;])\s/.exec(t);
  if (yn) return 'yes/no' + yn[2];
  if (t.includes('; ')) return ';';
  if (/\S \/ \S/.test(t) && !/[=[]/.test(t)) return '/';
  return '';
}

// ── Checks ──
const findings = [];
const add = (f, x, band, msg) => findings.push({ file: f.file, enforced: f.enforced, id: x.id, band, msg });
const addInfo = (f, x, band, msg) => findings.push({ file: f.file, enforced: false, id: x.id, band, msg });
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
    // 1 stem ending. Allowed after the question, as on the AAMC exams: a parenthetical with given data or a note
    // ("? (g = 10 m/s²)", "? (Note: …)"), and display lines of equations or data below the question.
    const lines = stem.split('\n'); while (lines.length > 1 && /[=→⇌]|^\s*\|/.test(lines[lines.length - 1])) lines.pop();
    const ask = lines.join('\n').trim().replace(/([?:])\s*\((?:[^()]|\([^()]*\))*\)\.?$/, '$1');
    if (!/(\?|:|_{2,}\.?)$/.test(ask)) { fail('stemEnd'); add(f, x, 'stemEnd', 'stem ends "' + stem.slice(-25) + '"'); }
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
      const sc = unitScales(units), v = ch.map((c, i) => (sc && numValue(c) !== null ? numValue(c) * sc[i] : null));
      if (sc && v.every(n => n !== null)) {
        const up = v.every((n, i) => !i || n >= v[i - 1]), down = v.every((n, i) => !i || n <= v[i - 1]);
        if (!up && !down) {
          const r = [...v].sort((a, b) => a - b).indexOf(v[q.ans]);
          f.stats.order = (f.stats.order || 0) + 1; addInfo(f, x, 'order', JSON.stringify(ch) + (r === q.ans || 3 - r === q.ans ? ' (can be ordered around the key)' : ' (key at ' + q.ans + ', rank ' + r + ')'));
        }
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

// ── Part C: positional and letter references in every bank ──
const POSITION_REF = /\b(first|second|third|fourth|last|final) (choice|option|answer)s?\b/i;
const LETTER_CHOICE = /\b(choice|option)s?\s*\(?[A-D]\)?(?![\w-])/i;
const positionFindings = [];
{
  const ctx = vm.createContext({}), names = [];
  const order = fs.readdirSync(DATA).filter(f => f.endsWith('.js')).sort((a, b) => (a === 'exams.js') - (b === 'exams.js') || a.localeCompare(b));
  for (const f of order) {
    const t = read(f);
    vm.runInContext(t, ctx, { filename: f });
    for (const m of t.matchAll(/^const ([A-Za-z_$][\w$]*)\s*=/gm)) names.push([f, m[1]]);
  }
  const seen = new Set();
  const texts = (v, out) => {
    if (typeof v === 'string') out.push(v);
    else if (v && typeof v === 'object') for (const x of Object.values(v)) texts(x, out);
    return out;
  };
  const walk = (v, file, where) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return;
    seen.add(v);
    const id = v.id || v.src || where;
    for (const k of ['exp', 'how', 'teach']) if (k in v) for (const t of texts(v[k], [])) {
      const m = POSITION_REF.exec(strip(t)) || LETTER_CHOICE.exec(strip(t));
      if (m) positionFindings.push(`${file} ${id} [${k}] "${m[0]}"`);
    }
    for (const [k, x] of Object.entries(v)) if (!['how', 'teach'].includes(k)) walk(x, file, where + '.' + k);
  };
  for (const [f, n] of names) walk(vm.runInContext('typeof ' + n + ' === "undefined" ? null : ' + n, ctx), f, n);
}
if (positionFindings.length) {
  for (const x of positionFindings) console.error('position reference: ' + x);
  console.error(`Choice position references: ${positionFindings.length} (choices are sorted or shuffled; quote the choice instead)`);
  process.exit(1);
}

// ── Report ──
const summary = {};
for (const f of files) {
  const b = a => (a.length ? { n: a.length, median: median(a), p90: pct(a, 0.9), min: Math.min(...a), max: Math.max(...a) } : null);
  summary[f.file] = { enforced: f.enforced, passage: b(f.stats.passage), pqStem: b(f.stats.pqStem), saStem: b(f.stats.saStem), choice: b(f.stats.choice), keyLongByChars: f.stats.keyChars || 0, unordered: f.stats.order || 0, failures: f.stats.fail };
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
