// Twin sources: the cards a Chem/Phys diagnostic, or daily-quiz question may twin, with the
// clusters they came in. Primary: the 354 Sample Test / Practice Exam C/P cards (data/qb-aamc-fl.js). Secondary:
// the C/P cards of qb-aamc-chem.js, qb-aamc-phys.js, qb-aamc-biochem.js and the 5C/5D cards of qb-aamc-iqb.js.
// Clusters: tools/twin-clusters.json. Skill options and a difficulty score are judged from each card's task.
// Used by tools/solve-twin-map.py (node tools/twin-sources.cjs > sources.json) and tools/test-twins.cjs.
'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';

const FILES = { fl: 'qb-aamc-fl.js', chem: 'qb-aamc-chem.js', phys: 'qb-aamc-phys.js', biochem: 'qb-aamc-biochem.js', iqb: 'qb-aamc-iqb.js' };
const ctx = vm.createContext({});
for (const f of Object.values(FILES)) vm.runInContext(fs.readFileSync(root + '/data/' + f, 'utf8').replace(/^const /mg, 'var '), ctx, { filename: f });
const VARS = { fl: 'QB_AAMC_FL', chem: 'QB_AAMC_CHEM', phys: 'QB_AAMC_PHYS', biochem: 'QB_AAMC_BIOCHEM', iqb: 'QB_AAMC_IQB' };
const CP = new Set(['4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E']);
const cards = {};
for (const [k, v] of Object.entries(VARS)) ctx[v].forEach((c, i) => {
  if (!CP.has(c.aamc) || (k === 'iqb' && !['5C', '5D'].includes(c.aamc))) return;
  const id = c.src || FILES[k] + ':' + i;
  cards[id] = { id, file: FILES[k], index: i, card: c, primary: k === 'fl' };
});

// ── Skill and difficulty, judged from the card (the twin keeps the card's task) ──
const numCalc = c => (c.how && c.how.steps || []).flatMap(s => s.calc || []).filter(l => /\d/.test(l) && /[=×÷→]/.test(l)).length;
const hasFig = c => !!(c.fig || c.chart || c.choiceFigs);
const S3 = /\b(researchers?|experiment(al)?|control|hypothes|claim|conclu|design|protocol|procedure|calibrat|would (best )?(support|test)|best test|valid|variable)\b/i;
const S4 = /\b(graph|plotted|plot|figure|table|curve|trace|data|bar|spectrum|shown in)\b/i;
// A research-methods task (separation, assay, controls, which result supports a claim) can also be read as SIRS 3.
const S3B = /\b(separat\w*|purif\w*|assay|isolat\w*|elute|chromatograph\w*|consistent with (these|the) (results|data|observations)|best explains? (this|these|the) (result|observation)s?|measured|to (determine|identify|distinguish|confirm))\b/i;
// The twin may move a card's numbers into the passage's table or figure, so a card that gives several values can
// also be asked as a data question (SIRS 4); a card that applies one relation in one or two steps can be asked as
// knowledge (SIRS 1).
const nums = q => (q.match(/\d+(\.\d+)?/g) || []).length;
function skillOptions(c) {
  const q = c.q, calc = numCalc(c), fig = hasFig(c), o = [];
  if (S3.test(q)) o.push('SIRS 3');
  if (fig || /consider the data/i.test(q) || S4.test(q)) o.push('SIRS 4');
  if (calc >= 1) o.push('SIRS 2');
  if (calc <= 2) o.push('SIRS 1');
  if (S3B.test(q) || c.aamc === '5C') o.push('SIRS 3');
  if (nums(q) >= 3) o.push('SIRS 4');
  if (!o.includes('SIRS 2')) o.push('SIRS 2');
  return [...new Set(o)];
}
const diffScore = c => numCalc(c) * 2 + (c.how ? c.how.steps.length : 2) + (hasFig(c) ? 2 : 0) + c.q.split(/\s+/).length / 25;
for (const x of Object.values(cards)) { x.skills = skillOptions(x.card); x.score = diffScore(x.card); }

// ── Clusters ──
const CL = JSON.parse(fs.readFileSync(__dirname + '/twin-clusters.json', 'utf8'));
const prim = [], saCards = [];
for (const [ex, x] of Object.entries(CL.exams)) {
  x.passages.forEach(([a, b], n) => { const ids = []; for (let i = a; i <= b; i++) ids.push(ex + ':' + i); prim.push({ key: ex + ' P' + (n + 1) + ' (Q' + a + '–' + b + ')', exam: ex, ids }); });
  x.sa.forEach(([a, b]) => { for (let i = a; i <= b; i++) saCards.push(ex + ':' + i); });
}
for (const c of prim) for (const id of c.ids) if (!cards[id]) throw new Error('unknown card ' + id + ' in ' + c.key);
// Stand-alone twins: the AAMC stand-alone cards first; any secondary card (none came from an AAMC passage) may also
// be twinned as a stand-alone.
const secondary = Object.values(cards).filter(x => !x.primary).map(x => x.id);

const W = { cats: { '5D': 24, '5E': 15, '4E': 13, '5A': 9, '4D': 8, '4C': 8, '4B': 7, '5B': 6, '4A': 5, '5C': 4 },
  discs: { gen_chem: 32, biochemistry: 25, physics: 25, organic_chem: 16, biology: 2 },
  skills: { 'SIRS 1': 37, 'SIRS 2': 44, 'SIRS 3': 10, 'SIRS 4': 10 }, diffs: { D: 39, M: 30, X: 21, E: 10 } };
// Largest remainder of the AAMC weights, a tie to the heavier code (as js/mastery.js splits a day).
const lr = (n, w) => { const e = Object.entries(w), t = e.reduce((a, [, x]) => a + x, 0), o = e.map(([, x]) => Math.floor(n * x / t)), r = e.map(([, x], i) => n * x - o[i] * t);
  e.map((_, i) => i).sort((i, j) => r[j] - r[i] || e[j][1] - e[i][1] || i - j).slice(0, n - o.reduce((a, b) => a + b, 0)).forEach(i => o[i]++); return Object.fromEntries(e.map(([c], i) => [c, o[i]])); };
// Diagnostic: P P [4] P P P [4] P P P [4] P P [3], passages of 4,4,4,4,4,4,4,5,5,6. Quiz (AAMC half-section):
// P P [4] P P P [4], passages of 4,4,4,5,5 (22 questions) + 8 stand-alones.
const SETS = [{ id: 'diag', n: 59, nP: 10, nSA: 15, sizes: [4, 4, 4, 4, 4, 4, 4, 5, 5, 6], layout: ['P', 'P', 4, 'P', 'P', 'P', 4, 'P', 'P', 'P', 4, 'P', 'P', 3] },
  ...[1, 2, 3, 4, 5, 6].map(i => ({ id: 'quiz' + i, n: 30, nP: 5, nSA: 8, sizes: [4, 4, 4, 5, 5], layout: ['P', 'P', 4, 'P', 'P', 'P', 4] }))];
for (const s of SETS) s.t = { cats: lr(s.n, W.cats), discs: lr(s.n, W.discs), skills: lr(s.n, W.skills), diffs: lr(s.n, W.diffs) };
module.exports = { cards, prim, secondary, saCards, SETS, W, lr, CL, FILES };
if (require.main === module) process.stdout.write(JSON.stringify({ cards: Object.values(cards).map(x => ({ id: x.id, file: x.file, index: x.index, aamc: x.card.aamc, disc: x.card.disc, skills: x.skills, score: +x.score.toFixed(2), primary: x.primary })), prim, secondary, sa: saCards, sets: SETS }));
