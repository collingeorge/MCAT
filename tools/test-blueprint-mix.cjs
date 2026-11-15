// AAMC C/P blueprint mix for TODAY (js/mastery.js): every day's flashcards and guided Practice Exam cards are split
// 100% over all 10 C/P content categories by AAMC weight (largest remainder, a tie to the heavier category); weak
// categories are marked but keep their AAMC count: weakness only changes which cards are picked within a category
// (missed and due first, then the weakest sub-topics, then the rest). A small pool passes its shortfall to the next
// category by weight; cards follow the AAMC discipline mix over the whole day (the discipline counts are chosen
// across categories, not inside each one) and never repeat on a day while others are left; TODAY has exactly 3 daily
// steps (no passage step); each 30-question quiz is checked against its fixed mix (misses are reported; with
// STRICT_QUIZ_MIX=1 they fail); every pool shortfall per step is listed; days saved before the exact split load as
// the exact split the same day, keeping their counted answers.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const root = __dirname + '/..';
// STRICT_QUIZ_MIX is on: the rebuilt quizzes (data/cp-pool.js, twins of studied cards) are each exactly on the mix.
// STRICT_QUIZ_MIX=0 reports misses without failing.
const STRICT = process.env.STRICT_QUIZ_MIX !== '0';
const src = fs.readFileSync(root + '/js/mastery.js', 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src.slice(0, src.indexOf('// ── Browser side')), ctx);
for (const f of ['data/cp-pool.js', 'data/cp-diagnostic.js', 'data/qb-aamc-fl.js']) vm.runInContext(fs.readFileSync(root + '/' + f, 'utf8'), ctx, { filename: f });
const call = (fn, ...args) => JSON.parse(JSON.stringify(vm.runInContext(fn + '(...a)', Object.assign(ctx, { a: args }))));
const get = expr => JSON.parse(vm.runInContext('JSON.stringify(' + expr + ')', ctx));
const BP = get('MASTERY.blueprint.cp'), W = call('masteryWeights', 'cp'), TOTAL = W.reduce((n, [, w]) => n + w, 0);
const CATS = W.map(([c]) => c);
const byCode = a => Object.fromEntries(a.map(t => [t.code, t.need]));
const split = (n, weak = [], caps = null, old = false) => call('masteryBlueprintSplit', n, W, weak, caps, old);
const sumOf = o => Object.values(o).reduce((a, b) => a + b, 0);

// The AAMC split, re-derived here from the weights (not copied from the app): each code gets the floor of its exact
// share; the items left go to the largest remainders, a tie to the higher weight, then the one listed first.
const lr = (n, weights) => {
  const w = Object.entries(weights), tot = w.reduce((t, [, x]) => t + x, 0), out = w.map(([, x]) => Math.floor(n * x / tot)), rem = w.map(([, x], i) => n * x - out[i] * tot);
  w.map((_, i) => i).sort((i, j) => rem[j] - rem[i] || w[j][1] - w[i][1] || i - j).slice(0, n - out.reduce((a, b) => a + b, 0)).forEach(i => out[i]++);
  return Object.fromEntries(w.map(([c], i) => [c, out[i]]));
};

// The blueprint config holds the AAMC C/P weights (% of the 354 C/P questions on Practice Exams 1–6).
assert.deepEqual(BP.cats, { '5D': 24, '5E': 15, '4E': 13, '5A': 9, '4D': 8, '4C': 8, '4B': 7, '5B': 6, '4A': 5, '5C': 4 });
assert.deepEqual(BP.discs, { gen_chem: 32, biochemistry: 25, physics: 25, organic_chem: 16, biology: 2 });
assert.deepEqual(BP.skills, { 'SIRS 1': 37, 'SIRS 2': 44, 'SIRS 3': 10, 'SIRS 4': 10 });
assert.deepEqual(BP.diffs, { D: 39, M: 30, X: 21, E: 10 });
assert.deepEqual(CATS, ['5D', '5E', '4E', '5A', '4D', '4C', '4B', '5B', '4A', '5C'], 'heaviest first');
assert(!/extraShare/.test(src), 'the weak bonus (extraShare) is gone');

// 1. The split is exactly the AAMC weights: every count matches the re-derived largest remainder, with 0 extra on
// every category whatever the weak categories are; weak categories are only marked.
const L50 = lr(50, BP.cats);
console.log('AAMC split of 50 (re-derived): ' + CATS.map(c => c + ' ' + L50[c]).join(', '));
const weakSets = [[], ['5A'], ['5A', '4E'], ['5C', '4A'], ['5D', '5E'], ['4B', '5C'], ['4A', '4A'], ['zz', '4D']];
for (const n of [50, 30, 20, 13, 12, 7, 5, 1, 0]) for (const weak of weakSets) {
  const s = split(n, weak), real = [...new Set(weak)].filter(c => CATS.includes(c)).slice(0, 2);
  assert.deepEqual(byCode(s), lr(n, BP.cats), `n=${n} weak=${weak}: the AAMC split`);
  assert.equal(s.reduce((t, x) => t + x.need, 0), n, `n=${n}: adds up`);
  for (const t of s) { assert.equal(t.extra, 0, `n=${n} ${t.code}: 0 extra`); assert.equal(t.need, t.base); assert.equal(t.weak, real.includes(t.code)); }
}
// The tie rule: equal remainders go to the higher weight, even when it is listed later.
assert.deepEqual(call('masteryApportion', [['a', 1], ['b', 3]], 2), [0, 2], 'a tie goes to the higher weight');
assert.deepEqual(call('masteryApportion', [['a', 3], ['b', 3]], 1), [1, 0], 'equal weights: the one listed first');

// 2. On TODAY every card step (flashcards, guided cards) splits its count exactly by weight; the weakest
// categories of the latest test are marked weak, with the same counts. TODAY has exactly 3 daily steps after the
// diagnostic (flashcards, guided cards, the quiz): no passage step, whatever passage pool is given.
const diag = (cats) => ({ subj: 'cp', day: '2026-11-15', t: 0, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag', cats });
const planOf = (m, day = '2026-11-16', sizes = { guided: 266 }) => call('masteryPlan', m, day, sizes);
const STEPS = ['flashcards', 'guided'];
{ const p = planOf({ tests: [diag({ '5B': { c: 1, t: 3 }, '4C': { c: 2, t: 5 }, '5D': { c: 6, t: 14 }, '4E': { c: 8, t: 8 }, passage: { c: 0, t: 9 } })] });
  assert.equal(p.split, 'exact'); assert.deepEqual(p.weakT, ['5B', '4C'], '5B 33% and 4C 40% are the weakest');
  assert.deepEqual(p.steps.map(s => s.id), ['diagnostic', 'flashcards', 'guided', 'test'], 'exactly 3 daily steps');
  for (const id of STEPS) {
    const st = p.steps.find(s => s.id === id);
    assert.deepEqual(st.topics.filter(t => t.weak).map(t => t.code + '+' + t.extra), ['4C+0', '5B+0'], id + ': weak marked, 0 extra');
    assert.deepEqual(byCode(st.topics), L50, id + ': exactly the AAMC split'); assert(st.topics.every(t => t.extra === 0), id + ': 0 extra everywhere');
    assert.equal(st.topics.reduce((n, t) => n + t.need, 0), st.count, id + ': sums to its count'); assert.equal(st.count, 50); }
  const none = planOf({ tests: [diag({ '5D': { c: 14, t: 14 } })] });
  for (const id of STEPS) assert.deepEqual(byCode(none.steps.find(s => s.id === id).topics), L50, id + ': no weak category, the same split'); }

// 3. Small pools: the shortfall goes to the next category by weight with cards left (wrapping round), shown on the step.
{ const big = Object.fromEntries(CATS.map(c => [c, 999]));
  let s = split(50, ['5C', '4A'], { ...big, '5C': 1 });
  assert.deepEqual(byCode(s), { ...L50, '5C': 1, '5D': L50['5D'] + L50['5C'] - 1 }, '5C (last by weight) gives its shortfall to 5D');
  assert.deepEqual(s.find(t => t.code === '5C'), { ...s.find(t => t.code === '5C'), need: 1, short: L50['5C'] - 1, to: ['5D'], extra: 0 });
  s = split(50, [], { ...big, '4B': 1, '5B': 2 });
  assert.deepEqual(s.filter(t => t.short || t.spill).map(t => t.code + ':' + t.need + (t.short ? ' -' + t.short + '→' + t.to : ' +' + t.spill)),
    ['4B:1 -' + (L50['4B'] - 1) + '→4A', '5B:2 -' + (L50['5B'] - 2) + '→4A', '4A:' + (L50['4A'] + L50['4B'] - 1 + L50['5B'] - 2) + ' +' + (L50['4B'] - 1 + L50['5B'] - 2)], '4B and 5B are short, so 4A takes both shortfalls');
  assert.equal(s.reduce((n, t) => n + t.need, 0), 50);
  s = split(50, [], { '5D': 5, '5E': 5 });
  assert.equal(s.reduce((n, t) => n + t.need, 0), 10, 'a pool smaller than the count caps the day at the pool');
  // On TODAY: the plan takes each category's pool and shows the shortfall on the step.
  const p = planOf({ tests: [diag({ '5C': { c: 0, t: 2 }, '4A': { c: 1, t: 3 } })] }, '2026-11-16', { guided: 266, flashCats: { ...big, '5C': 1 }, guidedCats: { ...big, '4A': 1 } });
  const f = p.steps[1], g = p.steps[2];
  assert.deepEqual([f.count, g.count], [50, 50]);
  assert.deepEqual(f.topics.find(t => t.code === '5C'), { ...f.topics.find(t => t.code === '5C'), need: 1, short: L50['5C'] - 1, to: ['5D'] });
  assert.equal(f.topics.find(t => t.code === '5D').need, L50['5D'] + L50['5C'] - 1); assert.equal(g.topics.find(t => t.code === '4A').short, L50['4A'] - 1);
  assert(src.includes("'<p class=\"muted-note\">Shortfall: '") && src.includes("targets(s.topics, 'cards')"), 'the step detail shows the shortfall'); }

// 4. Building the set: each category gets its count from its own cards, in the day's AAMC discipline mix where the pool
// allows; no card twice in a day while others are left; cards seen today only after the unseen ones. Weakness
// (tierOf) changes which cards are picked within a category, never how many.
vm.runInContext('pickT = (c, k) => c.slice(0, Math.max(0, k)); catT = q => q.cat; discT = q => q.disc', ctx);
const setOf = q => JSON.parse(JSON.stringify(vm.runInContext('masteryTopicSet(st, pl, catT, pickT, { discOf: discT, discW: dw, seen: new Set(sn), tierOf: tf })', Object.assign(ctx, { tf: null, ...q }))));
const discW = call('masteryWeights', 'cp', 'discs');
{ const cards = [];
  const add = (cat, disc, n, s = 'sub') => { for (let i = 0; i < n; i++) cards.push({ id: cat + disc + i, cat, disc, key: 'aamc|' + s + (i % 4) }); };
  add('5D', 'biochemistry', 20); add('5D', 'organic_chem', 20); add('5D', 'biology', 3); add('5C', 'organic_chem', 2); add('5E', 'gen_chem', 30);
  const step = { topics: [{ code: '5D', need: 15, progress: 0 }, { code: '5C', need: 4, progress: 0 }, { code: '5E', need: 6, progress: 0 }] };
  let r = setOf({ st: step, pl: cards, dw: discW, sn: [] });
  const in5D = r.list.filter(q => r.topicOf[q.id] === '5D');
  assert.equal(r.list.length, 25); assert.equal(new Set(r.list.map(q => q.id)).size, 25, 'no repeats while cards are left');
  assert.deepEqual(['biochemistry', 'organic_chem', 'biology'].map(d => in5D.filter(q => q.disc === d).length), [9, 5, 1], '5D in the AAMC mix: 25 : 16 : 2 of 15');
  assert.equal(r.list.filter(q => r.topicOf[q.id] === '5C' && q.cat === '5C').length, 2, '5C uses its 2 cards, then the next categories');
  const seen26 = cards.filter(q => q.cat === '5E').slice(0, 26).map(q => q.id);
  r = setOf({ st: step, pl: cards, dw: discW, sn: seen26 });
  assert.equal(r.list.length, 25); assert(!r.list.some(q => seen26.includes(q.id)), 'no card seen today while unseen ones are left');
  assert.equal(r.list.filter(q => q.cat === '5E').length, 4, 'every unseen 5E card is used');
  r = setOf({ st: step, pl: cards.filter(q => q.cat !== '5D'), dw: discW, sn: seen26 });
  assert.equal(r.list.filter(q => seen26.includes(q.id)).length, 25 - 2 - 4, 'cards seen today only once the unseen ones run out');
  assert.equal(new Set(r.list.map(q => q.id)).size, r.list.length);
  r = setOf({ st: { topics: [{ code: '5C', need: 5, progress: 0 }] }, pl: cards.filter(q => q.cat === '5C'), dw: discW, sn: [] });
  assert.equal(r.list.length, 5, 'repeats only when the whole pool is used'); assert.equal(new Set(r.list.map(q => q.id)).size, 2);

  // The day's disciplines are chosen over the whole step (masteryDiscQuota): category counts stay exact, and a
  // category with one discipline (5A: general chemistry only) is offset in a category that has both, directly or
  // along a chain (here 4E trades general chemistry for physics, 5D trades organic for biochemistry).
  const Q = rows => call('masteryDiscQuota', rows, discW);
  let q = Q([{ code: '5A', k: 10, avail: { gen_chem: 40 } }, { code: '4E', k: 10, avail: { gen_chem: 40, physics: 40 } }]);
  assert.deepEqual(q, { '5A': { gen_chem: 10 }, '4E': { gen_chem: 1, physics: 9 } }, 'physics in 4E offsets 5A: the day is 11 : 9, the AAMC 32 : 25 of 20');
  q = Q([{ code: '5A', k: 8, avail: { gen_chem: 9 } }, { code: '4E', k: 8, avail: { gen_chem: 9, organic_chem: 9 } }, { code: '4A', k: 8, avail: { organic_chem: 9, physics: 9 } }]);
  assert.deepEqual(Object.fromEntries(Object.entries(q).map(([c, x]) => [c, Object.values(x).reduce((a, b) => a + b, 0)])), { '5A': 8, '4E': 8, '4A': 8 }, 'category counts unchanged');
  const dayOf = q => Object.values(q).reduce((o, x) => { for (const [d, n] of Object.entries(x)) o[d] = (o[d] || 0) + n; return o; }, {});
  assert.deepEqual(dayOf(q), { gen_chem: 11, organic_chem: 5, physics: 8 }, 'a chain: 4E gives general chemistry to organic, 4A organic to physics');
  q = Q([{ code: '5C', k: 4, avail: { organic_chem: 2 } }]);
  assert.deepEqual(q, { '5C': { organic_chem: 2 } }, 'never more than a category has');

  // The picking order (masteryTierRank): missed or due first, then weak sub-topics (weakest first), then the rest.
  const missed = ['5Dbiochemistry17', '5Dbiochemistry18', '5Dorganic_chem19'], due = ['5Dbiochemistry16', '5Egen_chem29'];
  vm.runInContext(`tierT = masteryTierRank({ missed: new Set(${JSON.stringify(missed)}), due: q => ${JSON.stringify(due)}.includes(q.id), acc: q => ({ 'aamc|sub1': 0.4, 'aamc|sub2': 0.7, 'aamc|sub3': 0.95 })[q.key] ?? null })`, ctx);
  const tierOf = id => vm.runInContext(`tierT(${JSON.stringify(cards.find(q => q.id === id))})`, ctx);
  assert.deepEqual(['5Dbiochemistry17', '5Dbiochemistry16', '5Dbiochemistry1', '5Dbiochemistry2', '5Dbiochemistry3', '5Dbiochemistry0'].map(tierOf), [0, 0, 1.4, 1.7, 3, 3], 'missed/due 0, weak sub-topics 1 + accuracy, strong or never answered 3');
  const plain = setOf({ st: step, pl: cards, dw: discW, sn: [] });
  const tiered = JSON.parse(JSON.stringify(vm.runInContext('masteryTopicSet(st, pl, catT, pickT, { discOf: discT, discW: dw, seen: new Set(), tierOf: tierT })', Object.assign(ctx, { st: step, pl: cards, dw: discW }))));
  const countBy = s => s.list.reduce((o, q) => { const k = s.topicOf[q.id] + ' ' + q.disc; o[k] = (o[k] || 0) + 1; return o; }, {});
  assert.deepEqual(countBy(tiered), countBy(plain), 'weakness changes no count (category or discipline)');
  assert(missed.concat(due).every(id => tiered.list.some(q => q.id === id)), 'missed and due cards are picked first within their category');
  assert(!missed.concat(due).every(id => plain.list.some(q => q.id === id)), '(without the tiers they would not all be picked)');
  const bio5D = tiered.list.filter(q => tiered.topicOf[q.id] === '5D' && q.disc === 'biochemistry').map(q => q.id);
  assert.deepEqual(bio5D.slice(0, 3).sort(), ['5Dbiochemistry16', '5Dbiochemistry17', '5Dbiochemistry18'], 'tier 0 first');
  const subOf = id => cards.find(q => q.id === id).key;
  assert.equal(bio5D.length, 9); assert(bio5D.slice(3, 7).every(id => subOf(id) === 'aamc|sub1'), 'then the weakest sub-topic (40%): all 4 of its cards');
  assert(bio5D.slice(7).every(id => subOf(id) === 'aamc|sub2'), 'then the next weakest (70%); none from 95% or never answered');
  assert.equal(tiered.list.filter(q => q.cat === '5E')[0].id, '5Egen_chem29', '5E cards: the due one first (here taken by 5C, whose 2 cards run short)');
  // The app passes the seen list, the discipline weights and the tiers built from the saved data.
  assert(src.includes('masteryTopicSet(step, pool, catOf, pickQuestions, { seen: new Set(row.seen || []), discOf: disciplineOfRecall, discW, tierOf: masteryTierOf(m, plan, row) })'));
  assert(/retrievability\(mem\[q\.baseId \|\| q\.id\] \|\| mem\[q\.id\], now\); return R != null && R < TARGET_RETENTION/.test(src) && src.includes('store.get(KEYS.stats, {})'), 'due from memory, sub-topic accuracy from saved stats'); }

const shortfalls = [];   // every category or discipline shortfall, per step

// 5. Quizzes: the fixed 30-question mix. Checked against data/cp-pool.js; misses are reported, and fail with
// STRICT_QUIZ_MIX=1.
const QT = call('masteryQuizTargets', 'cp');
assert.deepEqual(QT.cats, lr(30, BP.cats)); assert.deepEqual(QT.discs, lr(30, BP.discs));
assert.equal(get('MASTERY.diagSize'), 59, 'the diagnostic keeps its 59-question blueprint');
const POOL = get('CP_POOL'), DIAG = get('CP_DIAG');
const layout = set => { const byId = new Map(set.passages.map(p => [p.id, p])), out = []; let sa = 0;
  for (const step of set.order) { if (typeof step === 'number') { set.standalones.slice(sa, sa += step).forEach(q => out.push({ cat: q.cat, disc: q.subj, skill: q.skill })); continue; }
    byId.get(step).questions.forEach(q => out.push({ cat: q.cat, disc: q.subj || byId.get(step).subj, skill: q.skill })); }
  return out; };
assert.deepEqual(call('masteryQuizMix', [...Object.entries(QT.cats).flatMap(([c, n]) => Array(n).fill(c))].map((cat, i) => ({ cat, disc: Object.entries(QT.discs).flatMap(([d, n]) => Array(n).fill(d))[i] })), 'cp'), [], 'a set on the mix passes');
const fmt = m => (m.kind === 'category' ? m.code : m.code.replace('_chem', ' chem')) + ' ' + m.got + ' vs ' + m.need + ' (' + (m.got > m.need ? '+' : '') + (m.got - m.need) + ')';
let missing = 0;
console.log('Daily quiz mix (categories exact; disciplines ±1, biology ≤1) against data/cp-pool.js' + (STRICT ? ' [STRICT_QUIZ_MIX]' : '') + ':');
for (const set of POOL) {
  const items = layout(set), miss = call('masteryQuizMix', items, 'cp');
  assert.equal(items.length, 30, set.id + ': 30 questions');
  if (miss.length) missing++;
  console.log('  ' + set.id + ': ' + (miss.length ? 'MISSES ' + ['category', 'discipline'].map(k => miss.filter(m => m.kind === k)).filter(a => a.length).map(a => a[0].kind + ' ' + a.map(fmt).join(', ')).join('; ') : 'on the mix'));
}
console.log('  ' + (missing ? missing + ' of ' + POOL.length + ' sets miss the mix (data unchanged; a rebuild of data/cp-pool.js will fix them' + (STRICT ? '' : '; STRICT_QUIZ_MIX=1 fails on them') + ').' : 'every set is on the mix.'));
if (STRICT) assert.equal(missing, 0, `STRICT_QUIZ_MIX: ${missing} of ${POOL.length} quiz sets miss the AAMC mix`);
// Weights compared: the quizzes and the diagnostic against the blueprint, by category and skill.
{ const share = (items, k, keys) => { const n = items.length, c = {}; items.forEach(q => { c[q[k]] = (c[q[k]] || 0) + 1; }); return keys.map(x => x + ' ' + (100 * (c[x] || 0) / n).toFixed(0) + '%').join(', '); };
  const quizItems = POOL.flatMap(layout), d = layout(DIAG);
  const skills = Object.keys(BP.skills);
  console.log('Blueprint:        categories ' + CATS.map(c => c + ' ' + (100 * BP.cats[c] / TOTAL).toFixed(0) + '%').join(', ') + ' | skills ' + skills.map(k => k + ' ' + (100 * BP.skills[k] / sumOf(BP.skills)).toFixed(0) + '%').join(', '));
  console.log('Quizzes (' + quizItems.length + 'q):    categories ' + share(quizItems, 'cat', CATS) + ' | skills ' + share(quizItems, 'skill', skills));
  console.log('Diagnostic (' + d.length + 'q):  categories ' + share(d, 'cat', CATS) + ' | skills ' + share(d, 'skill', skills)); }

// 6. Saved days: the exact split applies today, not tomorrow. A row saved before it (5 sub-topics and no split
// marker, or split 'blueprint' with its weak bonus) plans exactly by AAMC weight the same day, keeps the answers it
// counted (flashT, guidedT by category; a category past its new count is simply done) and its weak marks; the
// removed passage step's fields (prac, pracT, pracD, pracS, pracX) are ignored; malformed rows never crash.
{ const m = { tests: [diag({ '5A': { c: 2, t: 9 }, '4E': { c: 5, t: 9 } })], days: { '2026-11-16': { subj: 'cp', topics: ['5A', '4E', '4A', '4B', '4C'], flashT: { '5A': 10, '4E': 7 }, guidedT: { '4A': 3 }, prac: 12, pracT: { '5D': 12 }, pracD: { physics: 4 }, pracS: { 'SIRS 1': 5 }, pracX: { D: 2 } } } };
  let p = planOf(m);
  assert.equal(p.split, 'exact'); assert.deepEqual(p.topics, CATS, 'an old 5-topic row: the exact split today');
  assert.deepEqual(p.steps.map(s => s.id), ['diagnostic', 'flashcards', 'guided', 'test'], 'no passage step from the old row');
  for (const id of STEPS) assert.deepEqual(byCode(p.steps.find(s => s.id === id).topics), L50, id + ': the AAMC split');
  assert.deepEqual(p.steps[1].topics.filter(t => t.raw).map(t => t.code + ' ' + t.progress + '/' + t.need), ['4E 7/7', '5A 5/5'], 'counted answers carry over; 5A past its new count is done');
  assert.equal(p.steps[1].extra, 5, '5A\'s 5 answers past its count show as extra');
  assert.equal(p.steps[2].topics.find(t => t.code === '4A').progress, 2, 'guided 4A: 3 counted, done at 2');
  assert.deepEqual(p.steps.find(s => s.id === 'test').mix, call('masteryQuizTargets', 'cp'), 'the quiz shows its AAMC mix');
  // The case from the change request: 5 weak topics × 10 saved before the deploy, 1 card counted in 4B.
  p = planOf({ tests: m.tests, days: { '2026-11-16': { subj: 'cp', topics: ['4B', '5D', '4E', '5A', '5B'], flashT: { '4B': 1 } } } });
  assert.equal(p.split, 'exact');
  assert.deepEqual(byCode(p.steps[1].topics), { '5D': 12, '5E': 8, '4E': 7, '5A': 5, '4D': 4, '4C': 4, '4B': 3, '5B': 3, '4A': 2, '5C': 2 }, 'flashcard needs: the AAMC split');
  assert.equal(p.steps[1].topics.find(t => t.code === '4B').progress, 1, '4B progress 1');
  // The PR #60 shape, saved today: split 'blueprint' with its two weak categories. Exact today; weak marks kept.
  m.days['2026-11-17'] = { subj: 'cp', topics: ['5C', '4B', '5D', '5E', '4E', '5A', '4D', '4C', '5B', '4A'], split: 'blueprint', weakT: ['5C', '4B'], flashT: { '5C': 3 }, pracT: { '5C': 2 }, prac: 2, pracS: { 'SIRS 1': 2 } };
  m.tests.push({ ...diag({ '4D': { c: 0, t: 5 } }), day: '2026-11-17', kind: 'daily' });
  p = planOf(m, '2026-11-17');
  assert.equal(p.split, 'exact'); assert.deepEqual(p.weakT, ['5C', '4B'], 'a saved day keeps its weak categories as tests come in');
  for (const id of STEPS) { const st = p.steps.find(s => s.id === id); assert.deepEqual(byCode(st.topics), L50, id + ': no +5/+5 bonus, the AAMC split'); assert.equal(st.count, 50); }
  assert.deepEqual(p.steps[1].topics.filter(t => t.weak).map(t => t.code), ['4B', '5C'], 'weak only marked');
  assert.equal(p.steps[1].topics.find(t => t.code === '5C').progress, 2, '5C: 3 counted, done at its count of 2');
  // An exact row keeps its weak marks (counts never depend on them).
  m.days['2026-11-18'] = { subj: 'cp', topics: CATS, split: 'exact', weakT: ['4D'], flashT: { '4D': 1 } };
  p = planOf(m, '2026-11-18');
  assert.deepEqual(p.weakT, ['4D']); assert.deepEqual(byCode(p.steps[1].topics), L50); assert.equal(p.steps[1].topics.find(t => t.code === '4D').progress, 1);
  for (const bad of [{ subj: 'cp', topics: 'x', split: 'blueprint', weakT: 5 }, { subj: 'cp', split: 'blueprint', weakT: ['<b>', null] }, { subj: 'cp', split: 'exact', weakT: 'x' }, { subj: 'cp', topics: [], flashT: 'nope' }, { subj: 'cp', prac: '<b>', pracT: 7, pracD: null }, null]) {
    const q = planOf({ ...m, days: { '2026-11-17': bad } }, '2026-11-17');
    assert.equal(q.split, 'exact'); assert.equal(q.steps[1].count, 50, 'malformed day row: ' + JSON.stringify(bad)); assert(q.weakT.every(c => CATS.includes(c))); }
  // On load (TODAY, or the first answer of the day) a saved row is rewritten to split 'exact'.
  const mixed = src.slice(src.indexOf('function masteryDayRow'), src.indexOf('function masteryCategory'));
  assert(mixed.includes("if (row.split !== 'exact' && (MASTERY.blueprint[subj] || !Array.isArray(row.topics) || !row.topics.length))") && mixed.includes("Object.assign(row, { split: 'exact', weakT: p.weakT || [] })"), 'a saved row is rewritten to the exact split marker');
  assert(!src.includes('+ extra') && !src.includes('Today keeps the split it was saved with'), 'no old-split wording on TODAY'); }

// 7. Pool shortfalls per step, from the real app's pools: each category's pool against the day's AAMC count (50);
// the day's discipline shares over 200 simulated days.
{ const storage = new Map(), node = () => ({ innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } });
  const app = vm.createContext({ console: { log() {}, warn() {}, error() {} }, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} }, document: { getElementById: node, querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) } });
  const run = code => vm.runInContext(code, app);
  for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
  for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) run(fs.readFileSync(root + '/' + file, 'utf8'));
  const pools = JSON.parse(run(`JSON.stringify({ flashcards: masteryFlashPool('cp').map(q => [masteryCategory(q), disciplineOfRecall(q)]), guided: masteryPracticePool('cp').map(q => [q.aamc, disciplineOfRecall(q)]) })`));
  assert(pools.flashcards.length > 0); assert.equal(pools.guided.length, 354);
  const dw = Object.fromEntries(discW);
  for (const [step, list] of Object.entries(pools)) {
    for (const c of CATS) {
      const have = list.filter(([x]) => x === c), need = L50[c];
      if (have.length < need) shortfalls.push(`${step}: category ${c} ${have.length}/${need} cards (-${need - have.length})`);
    } }
  // A day's set as the app builds it: each step's 50 by category, and its disciplines over the whole step.
  const D50 = lr(50, dw);
  for (const [step, pool, catOf] of [['flashcards', "masteryFlashPool('cp')", 'masteryCategory'], ['guided', "masteryPracticePool('cp')", 'q => q.aamc']]) {
    const got = JSON.parse(run(`(() => { const st = { topics: ${JSON.stringify(CATS.map(c => ({ code: c, need: L50[c], progress: 0 })))} };
      const r = masteryTopicSet(st, ${pool}, ${catOf}, pickQuestions, { discOf: disciplineOfRecall, discW: masteryWeights('cp', 'discs') });
      const o = { cats: {}, discs: {} }; r.list.forEach(q => { o.cats[r.topicOf[q.id]] = (o.cats[r.topicOf[q.id]] || 0) + 1; const d = disciplineOfRecall(q); o.discs[d] = (o.discs[d] || 0) + 1; }); return JSON.stringify(o); })()`));
    assert.deepEqual(got.cats, Object.fromEntries(CATS.filter(c => L50[c]).map(c => [c, L50[c]])), step + ': a built set has exactly the AAMC category counts');
    for (const [d, v] of Object.entries(D50)) if ((got.discs[d] || 0) !== v) shortfalls.push(`${step}: day's set discipline ${d} ${got.discs[d] || 0}/${v} (${(got.discs[d] || 0) > v ? '+' : ''}${(got.discs[d] || 0) - v})`);
  }
  // The day's disciplines, over 200 simulated days of each step (the app's own picker, a fresh student): each
  // discipline's share of the day is within ±3 points of its AAMC weight wherever the pool allows. Where the
  // categories cannot reach the weight (the bounds below: every category gives the discipline as many, or as few,
  // of its cards as it can), the day must sit at that bound.
  const DAYS = 200, dayShares = {};
  for (const [step, pool, catOf] of [['flashcards', "masteryFlashPool('cp')", 'masteryCategory'], ['guided', "masteryPracticePool('cp')", 'q => q.aamc']]) {
    const sim = JSON.parse(run(`(() => { const pool = ${pool}, catOf = ${catOf}, days = [], bounds = {};
      const st = () => ({ topics: ${JSON.stringify(CATS.map(c => ({ code: c, need: L50[c], progress: 0 })))} });
      for (const [d] of masteryWeights('cp', 'discs')) { let lo = 0, hi = 0;
        for (const t of st().topics) { const cards = pool.filter(q => catOf(q) === t.code), n = cards.filter(q => disciplineOfRecall(q) === d).length;
          hi += Math.min(t.need, n); lo += Math.max(0, t.need - (cards.length - n)); }
        bounds[d] = [lo, hi]; }
      for (let i = 0; i < ${DAYS}; i++) { const r = masteryTopicSet(st(), pool, catOf, pickQuestions, { discOf: disciplineOfRecall, discW: masteryWeights('cp', 'discs') });
        const o = { n: r.list.length }; r.list.forEach(q => { const d = disciplineOfRecall(q); o[d] = (o[d] || 0) + 1; }); days.push(o); }
      return JSON.stringify({ days, bounds }); })()`));
    const range = {};
    for (const [d, w] of discW) {
      const [lo, hi] = sim.bounds[d], want = 50 * w / 100, reach = Math.min(hi, Math.max(lo, want));
      for (const [i, o] of sim.days.entries()) {
        const got = o[d] || 0, pts = 100 * got / o.n;
        assert.equal(o.n, 50, `${step} day ${i}: 50 cards`);
        if (reach === want) assert(Math.abs(pts - w) <= 3, `${step} day ${i}: ${d} ${pts}% vs AAMC ${w}% (±3 points)`);
        else assert(Math.abs(got - reach) <= 1, `${step} day ${i}: ${d} ${got} cards; the pool allows at most ${hi}, at least ${lo}`);
      }
      const v = sim.days.map(o => 100 * (o[d] || 0) / o.n);
      range[d] = Math.min(...v) === Math.max(...v) ? Math.min(...v).toFixed(0) + '%' : Math.min(...v).toFixed(0) + '–' + Math.max(...v).toFixed(0) + '%';
    }
    dayShares[step] = range;
  }
  console.log(`Day's discipline shares over ${DAYS} simulated days (AAMC ${discW.map(([d, w]) => d.replace('_chem', ' chem') + ' ' + w + '%').join(', ')}):`);
  for (const [step, r] of Object.entries(dayShares)) console.log('  ' + step + ': ' + Object.entries(r).map(([d, v]) => d.replace('_chem', ' chem') + ' ' + v).join(', '));
  console.log('Shortfalls per step (for the twins rebuild): ' + (shortfalls.length ? '\n  ' + shortfalls.join('\n  ') : 'none')); }

// 8. Every quiz set is on the mix (checked strictly above).
assert.equal(missing, 0, 'every quiz set is exactly on the AAMC mix');

console.log('Blueprint mix passed: every step 100% by AAMC weight (re-derived largest remainder, ties to the heavier), 0 extra on every category, weak categories change picking order not counts, small-pool spillover, discipline mix, no same-day repeats, exactly 3 daily steps (no passage step), every quiz exactly on the mix (STRICT_QUIZ_MIX on), shortfalls listed, old day rows load as the exact split the same day.');
