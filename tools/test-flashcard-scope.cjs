// The Chem/Phys flashcard pool (TODAY's flashcard step: masteryExamPool('cp')) prepares for what the AAMC C/P
// section asks: every card in a C/P content category (4A–5E); every card added to fill a gap names the Practice
// Exam card (data/qb-aamc-fl.js) that tests the same concept; off-test and duplicate cards stay removed; no two
// cards are near-copies; no off-test jargon.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const ctx = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} }, document: { getElementById: () => ({ innerHTML: '', textContent: '', style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {} }), querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} } });
const run = code => vm.runInContext(code, ctx);
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
const pool = JSON.parse(run("JSON.stringify(masteryExamPool('cp').map(q => ({ q: q.q, choices: q.choices, aamc: q.aamc, disc: q.disc, src: q.src, from: q.from || null })))"));
const FL = new Set(JSON.parse(run('JSON.stringify(QB_AAMC_FL.map(q => q.src))')));
const banks = JSON.parse(run('JSON.stringify([...QB_AAMC_CHEM, ...QB_AAMC_PHYS, ...QB_AAMC_BIOCHEM].map(q => ({ src: q.src, aamc: q.aamc })))'));
// 1. Every card of the C/P banks is in a C/P content category, so all of them reach the pool.
for (const q of banks) assert.match(q.aamc, /^[45][A-E]$/, q.src + ' is not in a C/P content category');
assert(pool.length >= banks.length, 'every C/P bank card is in the daily pool');
// 2. Gap-filling cards (and rewrites that name one) are anchored to a Practice Exam card.
const gap = pool.filter(q => /^cp-gap-/.test(q.src));
assert(gap.length >= 150, 'gap-filling cards present: ' + gap.length);
for (const q of pool) if (/^cp-gap-/.test(q.src) || q.from) assert(FL.has(q.from), q.src + ': from "' + q.from + '" is not a Practice Exam card');
// 3. Removed off-test and duplicate cards stay removed.
const REMOVED = ["aamc-chem-qpack:Q6", "aamc-chem-qpack:Q6b", "aamc-chem-qpack:Q7b", "aamc-chem-qpack:Q14", "aamc-chem-qpack:Q27", "aamc-chem-qpack:Q32b", "aamc-chem-qpack:Q66", "aamc-chem-qpack:Q95", "aamc-chem-qpack:Q120b", "aamc-chem-qpack:Q116b", "aamc-phys-qpack:Q10", "aamc-phys-qpack:Q12", "aamc-phys-qpack:Q13", "aamc-phys-qpack:Q14b", "aamc-phys-qpack:Q52", "aamc-phys-qpack:Q98", "aamc-phys-qpack:Q99", "aamc-phys-qpack:Q107b", "aamc-phys-qpack:Q115b", "aamc-phys-qpack:Q15b", "aamc-phys-qpack:Q16b", "aamc-phys-qpack:Q18", "aamc-phys-qpack:Q23b", "aamc-phys-qpack:Q35", "aamc-phys-qpack:Q61b", "aamc-phys-qpack:Q65b", "aamc-phys-qpack:Q67b", "aamc-phys-qpack:Q72b", "aamc-phys-qpack:Q92b", "aamc-phys-qpack:Q98b", "aamc-phys-qpack:Q106b", "aamc-phys-qpack:Q120", "aamc-phys-qpack:Q120b", "aamc-chem-qpack:Q70b", "aamc-phys-qpack:Q103"];
const srcs = new Set(pool.map(q => q.src));
for (const s of REMOVED) assert(!srcs.has(s), s + ' was removed (off-test or duplicate)');
assert.equal(srcs.size, pool.length, 'unique src per card');
// 4. No two cards are near-copies: character-trigram cosine of the stem (and of stem + choices), threshold 0.85.
//    At this threshold the removed verbatim duplicates (chem Q120b/Q46 0.99, phys Q92b/Q46 0.94, Q106b/Q48 0.91,
//    Q61b/Q103 0.93, Q65b/Q7 0.88) are caught. Duplicates of a concept in different words (e.g. phys Q18 vs [28],
//    0.25) cannot be caught by text and were removed by review.
// Stem similarity: character-trigram cosine on normalized text (lowercase, digits kept, punctuation removed).
const norm = t => String(t).toLowerCase().replace(/\*\*|<[^>]+>/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
function grams(t) { const s = ' ' + norm(t) + ' ', m = new Map(); for (let i = 0; i < s.length - 2; i++) { const g = s.slice(i, i + 3); m.set(g, (m.get(g) || 0) + 1); } return m; }
function cos(a, b) { let dot = 0, na = 0, nb = 0; a.forEach((v, k) => { na += v * v; if (b.has(k)) dot += v * b.get(k); }); b.forEach(v => { nb += v * v; }); return dot / Math.sqrt(na * nb || 1); }
const cardText = q => q.q + ' ' + [...q.choices].sort().join(' ');
// Reviewed pairs that share wording; each says why it stays.
const ALLOWED = new Map([
  ["aamc-chem-qpack:Q56 aamc-chem-qpack:Q56b", "different questions on one shared stem (both iodine-clock reactions)"],
  ["aamc-chem-qpack:Q86 aamc-chem-qpack:Q86b", "single vs double replacement"],
  ["aamc-phys-qpack:Q33 aamc-phys-qpack:Q33b", "series vs parallel capacitors"],
  ["aamc-phys-qpack:Q42 aamc-phys-qpack:Q42b", "dB level to intensity and the reverse"]
]);
const gramsOf = pool.map(q => [grams(q.q), grams(cardText(q))]);
for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) {
  const v = Math.max(cos(gramsOf[i][0], gramsOf[j][0]), cos(gramsOf[i][1], gramsOf[j][1]));
  if (v >= 0.85 && !ALLOWED.has([pool[i].src, pool[j].src].sort().join(' '))) assert.fail(`near-duplicate cards ${pool[i].src} and ${pool[j].src} (${v.toFixed(2)})`);
}
// Sanity: the threshold catches a verbatim duplicate.
assert(cos(grams('What happens to the pressure of a real gas compared with an ideal gas at high pressure?'), grams('What happens to the pressure of a real gas compared with an ideal gas at very high pressure?')) >= 0.85);
// 5. No off-test jargon.
const BLOCK = /normality|equivalent weight|theoretical plates|octave|perfect fifth|timbre|red-?shift|scintillation|Moseley/i;
for (const q of pool) assert(!BLOCK.test(q.q + ' ' + q.choices.join(' ')), q.src + ' uses an off-test term');
const by = k => pool.reduce((o, q) => (o[q[k]] = (o[q[k]] || 0) + 1, o), {});
console.log(`C/P flashcard scope passed: ${pool.length} cards (${gap.length} gap cards anchored to Practice Exam cards), all in 4A–5E, ${REMOVED.length} removed cards absent, no near-duplicates, no off-test terms. ` + JSON.stringify(by('disc')));
