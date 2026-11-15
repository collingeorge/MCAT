// Twins: every Chem/Phys diagnostic and daily-quiz question copies the method of one studied card
// (its `twin`: the card's src). Checks, for the twin map (tools/twin-map.json) and every question that carries a
// twin (data/cp-diagnostic.js, data/cp-pool.js and the approval sample tools/twin-sample.json):
//   1 the twin resolves to a card in the twin sources (tools/twin-sources.cjs);
//   2 the question's category (and discipline) is the card's;
//   3 no card is twinned twice;
//   4 no number from the card's stem or choices appears in the twin's choices, no choice is shared or paraphrased
//     (a twin choice and a card choice of 3+ content words each may share under 60% of the smaller set of content
//     words, stop words removed, simple stems), and the stems share no run of 6 words (not a near-copy);
//   5 no question uses a topic no card teaches (BLOCKLIST);
//   6 the map hits each set's exact AAMC mix (categories; disciplines; skills; difficulty), builds each passage from one
//     verified AAMC passage range, and has the AAMC layout: diagnostic P P [4] P P P [4] P P P [4] P P [3]; each quiz
//     P P [4] P P P [4] (5 passages, 22 passage questions, 8 stand-alones).
//   7 every diagnostic and quiz question has a twin, the data cover the map exactly, the quizzes have the AAMC
//     half-section layout, and the approved sample sits unchanged in the diagnostic.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const S = require('./twin-sources.cjs');
const root = __dirname + '/..';

const { BLOCKLIST, numsOf, norm, grams, paraphrase, twinProblems } = require('./twin-checks.cjs');
const tally = (a, f) => { const o = {}; a.forEach(x => { const k = f(x); o[k] = (o[k] || 0) + 1; }); return o; };

// ── 6. The map ──
const MAP = JSON.parse(fs.readFileSync(__dirname + '/twin-map.json', 'utf8'));
const mapRows = [];
for (const set of S.SETS) {
  const m = MAP.sets[set.id]; assert(m, set.id + ': in the map');
  const rows = [...m.passages.flatMap(p => p.rows), ...m.standalones];
  assert.equal(rows.length, set.n, set.id + ': ' + set.n + ' slots');
  assert.equal(m.passages.length, set.nP, set.id + ': ' + set.nP + ' passages'); assert.equal(m.standalones.length, set.nSA, set.id + ': stand-alones');
  for (const r of rows) { const x = S.cards[r.twin]; assert(x, set.id + ': twin ' + r.twin + ' resolves'); assert.equal(r.aamc, x.card.aamc, r.twin + ': category'); assert.equal(r.disc, x.card.disc, r.twin + ': discipline'); }
  for (const p of m.passages) {
    const c = S.prim.find(c => c.key === p.cluster);
    assert(c && p.rows.every(r => c.ids.includes(r.twin)), set.id + ': every question of ' + p.cluster + ' twins a card of that AAMC passage');
  }
  assert.deepEqual(m.passages.map(p => p.rows.length).sort(), [...set.sizes].sort(), set.id + ': passage sizes');
  // Layout: walk the AAMC order with the passages in map order.
  { let pi = 0, si = 0; for (const step of set.layout) { if (step === 'P') pi++; else si += step; }
    assert.equal(pi, set.nP); assert.equal(si, set.nSA); }
  for (const r of m.standalones) assert(S.saCards.includes(r.twin) || S.secondary.includes(r.twin), set.id + ': stand-alone ' + r.twin + ' twins a stand-alone or secondary card');
  assert.deepEqual(tally(rows, r => r.aamc), Object.fromEntries(Object.entries(set.t.cats).filter(([, n]) => n)), set.id + ': categories exact');
  assert.deepEqual(tally(rows, r => r.skill), set.t.skills, set.id + ': skills exact');
  assert.deepEqual(tally(rows, r => r.diff), set.t.diffs, set.id + ': difficulty exact');
  const d = tally(rows, r => r.disc);
  if (set.id === 'diag') assert.deepEqual(d, set.t.discs, 'diag: disciplines exact');
  else for (const [k, n] of Object.entries(set.t.discs)) assert(k === 'biology' ? (d[k] || 0) <= n : Math.abs((d[k] || 0) - n) <= 1, `${set.id}: ${k} ${d[k] || 0} vs ${n}`);
  mapRows.push(...rows.map(r => ({ ...r, set: set.id })));
}
const twice = Object.entries(tally(mapRows, r => r.twin)).filter(([, n]) => n > 1);
assert.deepEqual(twice, [], 'no card is twinned twice in the map');
const allClusters = S.SETS.flatMap(s => MAP.sets[s.id].passages.map(p => p.cluster));
assert.equal(new Set(allClusters).size, allClusters.length, 'no AAMC passage cluster is used twice');
console.log(`twin map: ${mapRows.length} slots, ${new Set(mapRows.map(r => r.twin)).size} distinct twins; every set on its exact mix`);

// ── 1–5. Questions that carry a twin ──
const ctx = vm.createContext({});
for (const f of ['cp-diagnostic.js', 'cp-pool.js']) vm.runInContext(fs.readFileSync(root + '/data/' + f, 'utf8').replace(/^const /mg, 'var '), ctx, { filename: f });
const sample = JSON.parse(fs.readFileSync(__dirname + '/twin-sample.json', 'utf8'));
const groups = [['cp-diagnostic.js', [ctx.CP_DIAG]], ['cp-pool.js', ctx.CP_POOL], ['twin-sample.json', [sample]]];
const qs = [];
for (const [file, sets] of groups) for (const set of sets) {
  for (const p of set.passages || []) for (const q of p.questions) qs.push({ file, q, p, subj: q.subj || p.subj });
  for (const q of set.standalones || []) qs.push({ file, q, p: null, subj: q.subj });
}
const twinned = qs.filter(x => x.q.twin), seen = new Map();
let fails = 0;
const fail = (x, msg) => { fails++; console.error(`  ${x.file} ${x.q.id}: ${msg}`); };
for (const x of twinned) {
  const t = S.cards[x.q.twin];
  if (!t) { fail(x, 'twin ' + x.q.twin + ' does not resolve'); continue; }
  if (x.q.cat !== t.card.aamc) fail(x, `category ${x.q.cat} is not the twin's ${t.card.aamc}`);
  if (x.subj !== t.card.disc) fail(x, `discipline ${x.subj} is not the twin's ${t.card.disc}`);
  if (x.file !== 'twin-sample.json') { if (seen.has(x.q.twin)) fail(x, 'twin ' + x.q.twin + ' already used by ' + seen.get(x.q.twin)); seen.set(x.q.twin, x.q.id); }
  for (const msg of twinProblems(x.q, x.p, t.card)) fail(x, msg);
}
// The sample twins the map's slots exactly.
for (const p of sample.passages) { const m = mapRows.filter(r => p.questions.some(q => q.twin === r.twin)); assert.equal(m.length, p.questions.length, 'sample passage: every twin is in the map'); }
const dataTwinned = twinned.filter(x => x.file !== 'twin-sample.json').length;
// The rebuilt data: every diagnostic and quiz question carries a twin, every map slot is written once, and each
// quiz is the AAMC half-section P P [4] P P P [4] (5 passages holding 22 questions, then 8 stand-alones).
const dataQs = qs.filter(x => x.file !== 'twin-sample.json');
assert.equal(dataTwinned, dataQs.length, 'every diagnostic and quiz question has a twin');
assert.deepEqual([...seen.keys()].sort(), mapRows.map(r => r.twin).sort(), 'the data twin exactly the map\'s slots');
for (const set of ctx.CP_POOL) {
  assert.equal(set.order.map(x => (typeof x === 'number' ? x : 'P')).join(' '), 'P P 4 P P P 4', set.id + ': P P [4] P P P [4]');
  assert.equal(set.passages.length, 5, set.id + ': 5 passages');
  assert.equal(set.passages.reduce((n, p) => n + p.questions.length, 0), 22, set.id + ': 22 passage questions');
  assert.equal(set.standalones.length, 8, set.id + ': 8 stand-alones');
}
assert.equal(ctx.CP_DIAG.order.map(x => (typeof x === 'number' ? x : 'P')).join(' '), 'P P 4 P P P 4 P P P 4 P P 3', 'diagnostic layout');
// The approved sample is the diagnostic's first passage and first three stand-alones, word for word.
{ const d = ctx.CP_DIAG, sp = sample.passages[0];
  assert.deepEqual(JSON.parse(JSON.stringify(d.passages.find(p => p.id === sp.id))), sp, 'sample passage in the diagnostic unchanged');
  for (const q of sample.standalones) assert.deepEqual(JSON.parse(JSON.stringify(d.standalones.find(x => x.id === q.id))), q, q.id + ' in the diagnostic unchanged'); }
console.log(`questions with a twin: ${twinned.length} (sample ${twinned.length - dataTwinned}, data ${dataTwinned} of ${qs.length - (twinned.length - dataTwinned)})` +
  '');
assert.equal(fails, 0, fails + ' twin check(s) failed');
console.log('test-twins: OK');
