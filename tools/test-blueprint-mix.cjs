// AAMC C/P blueprint mix for TODAY (js/mastery.js): every day's flashcards, guided Practice Exam cards and passage
// questions are split over all 10 C/P content categories, 80% by AAMC weight (largest remainder) and 20% to the two
// weakest categories of the latest test; a small pool passes its shortfall to the next category by weight; cards
// follow the AAMC discipline mix within a category and never repeat on a day while others are left; passages are
// picked greedily to close the day's category and skill gap; each 30-question quiz is checked against its fixed mix;
// days saved before the split still load. Quiz sets that miss the mix are reported, not failed (the data is fixed
// by a later rebuild of data/cp-pool.js).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const src = fs.readFileSync(root + '/js/mastery.js', 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src.slice(0, src.indexOf('// ── Browser side')), ctx);
for (const f of ['data/cp-pool.js', 'data/cp-practice.js', 'data/cp-diagnostic.js', 'data/qb-aamc-fl.js']) vm.runInContext(fs.readFileSync(root + '/' + f, 'utf8'), ctx, { filename: f });
const call = (fn, ...args) => JSON.parse(JSON.stringify(vm.runInContext(fn + '(...a)', Object.assign(ctx, { a: args }))));
const get = expr => JSON.parse(vm.runInContext('JSON.stringify(' + expr + ')', ctx));
const BP = get('MASTERY.blueprint.cp'), W = call('masteryWeights', 'cp'), TOTAL = W.reduce((n, [, w]) => n + w, 0);
const CATS = W.map(([c]) => c);
const byCode = a => Object.fromEntries(a.map(t => [t.code, t.need]));
const split = (n, weak = [], caps = null) => call('masteryBlueprintSplit', n, W, weak, caps);

// The blueprint config holds the AAMC C/P weights (% of the 354 C/P questions on Practice Exams 1–6).
assert.deepEqual(BP.cats, { '5D': 24, '5E': 15, '4E': 13, '5A': 9, '4D': 8, '4C': 8, '4B': 7, '5B': 6, '4A': 5, '5C': 4 });
assert.deepEqual(BP.discs, { gen_chem: 32, biochemistry: 25, physics: 25, organic_chem: 16, biology: 2 });
assert.deepEqual(BP.skills, { 'SIRS 1': 37, 'SIRS 2': 44, 'SIRS 3': 10, 'SIRS 4': 10 });
assert.deepEqual(CATS, ['5D', '5E', '4E', '5A', '4D', '4C', '4B', '5B', '4A', '5C'], 'heaviest first');

// 1. The split adds up to the count, each category within ±1 of its weighted share, the weak bonus on the weakest.
const weakSets = [[], ['5A'], ['5A', '4E'], ['5C', '4A'], ['5D', '5E'], ['4B', '5C'], ['4A', '4A'], ['zz', '4D']];
for (const n of [50, 30, 20, 12, 7, 5, 1, 0]) for (const weak of weakSets) {
  const s = split(n, weak), real = [...new Set(weak)].filter(c => CATS.includes(c)).slice(0, 2);
  const extra = n - Math.round(n * 0.8), bonus = real.length === 2 ? extra : real.length === 1 ? Math.ceil(extra / 2) : 0;
  assert.equal(s.reduce((t, x) => t + x.need, 0), n, `n=${n} weak=${weak}: adds up`);
  for (const t of s) {
    const w = BP.cats[t.code], target = (n - bonus) * w / TOTAL;
    assert(Math.abs(t.base - target) < 1, `n=${n} ${t.code}: ${t.base} within ±1 of ${target.toFixed(2)}`);
    const want = real[0] === t.code ? Math.ceil(extra / 2) : real[1] === t.code ? extra - Math.ceil(extra / 2) : 0;
    assert.equal(t.bonus, want, `n=${n} weak=${weak} ${t.code}: bonus`); assert.equal(t.need, t.base + t.bonus); assert.equal(t.weak, real.includes(t.code));
  }
}
// The example: 40 of 50 by weight is 5D 10, 5E 6, 4E 5, 5A 4, 4D 3, 4C 3, 4B 3, 5B 2, 4A 2, 5C 2, then +5 each.
assert.deepEqual(byCode(split(50, ['5A', '4E']).map(t => ({ code: t.code, need: t.base }))), { '5D': 10, '5E': 6, '4E': 5, '5A': 4, '4D': 3, '4C': 3, '4B': 3, '5B': 2, '4A': 2, '5C': 2 }, 'largest remainder matches the worked example exactly');
assert.deepEqual(byCode(split(50, ['5A', '4E'])), { '5D': 10, '5E': 6, '4E': 10, '5A': 9, '4D': 3, '4C': 3, '4B': 3, '5B': 2, '4A': 2, '5C': 2 });

// 2. The weak bonus goes to the two weakest categories of the latest test below 84% (weakest first), not to
// categories at or above it; one weak category gets its half and the rest goes by weight; none: all by weight.
const diag = (cats) => ({ subj: 'cp', day: '2026-11-15', t: 0, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag', cats });
const planOf = (m, day = '2026-11-16', sizes = { guided: 266, passages: 144 }) => call('masteryPlan', m, day, sizes);
{ const p = planOf({ tests: [diag({ '5B': { c: 1, t: 3 }, '4C': { c: 2, t: 5 }, '5D': { c: 6, t: 14 }, '4E': { c: 8, t: 8 }, passage: { c: 0, t: 9 } })] });
  assert.deepEqual(p.weakT, ['5B', '4C'], '5B 33% and 4C 40%, then 5D 43% gets no bonus');
  for (const id of ['flashcards', 'guided', 'passages']) {
    const st = p.steps.find(s => s.id === id);
    assert.deepEqual(st.topics.filter(t => t.weak).map(t => t.code + '+' + t.bonus), ['4C+5', '5B+5'], id + ': +5 each to the two weakest');
    assert.equal(st.topics.reduce((n, t) => n + t.need, 0), 50, id + ': 50 in all'); }
  const one = planOf({ tests: [diag({ '4A': { c: 1, t: 3 }, '5D': { c: 14, t: 14 } })] }).steps[1];
  assert.deepEqual(one.topics.filter(t => t.bonus).map(t => t.code + '+' + t.bonus), ['4A+5'], 'one weak category: its half');
  assert.equal(one.topics.find(t => t.code === '5D').need, 11, 'the other half by weight (45 × 24/99 = 10.9)');
  const none = planOf({ tests: [diag({ '5D': { c: 14, t: 14 } })] }).steps[1];
  assert(none.topics.every(t => !t.bonus) && none.topics.reduce((n, t) => n + t.need, 0) === 50, 'no weak category: all by weight'); }

// 3. Small pools: the shortfall goes to the next category by weight with cards left (wrapping round), shown on the step.
{ const big = Object.fromEntries(CATS.map(c => [c, 999]));
  let s = split(50, ['5C', '4A'], { ...big, '5C': 3 });
  assert.deepEqual(byCode(s), { '5D': 14, '5E': 6, '4E': 5, '5A': 4, '4D': 3, '4C': 3, '4B': 3, '5B': 2, '4A': 7, '5C': 3 }, '5C (last by weight) gives its 4 to 5D');
  assert.deepEqual(s.find(t => t.code === '5C'), { ...s.find(t => t.code === '5C'), need: 3, short: 4, to: ['5D'] });
  s = split(50, [], { ...big, '4B': 1, '5B': 2 });
  assert.deepEqual(s.filter(t => t.short || t.spill).map(t => t.code + ':' + t.need + (t.short ? ' -' + t.short + '→' + t.to : ' +' + t.spill)), ['4B:1 -2→4A', '5B:2 -1→4A', '4A:5 +3'], '4B and 5B are full, so 4A takes both shortfalls');
  assert.equal(s.reduce((n, t) => n + t.need, 0), 50);
  s = split(50, [], { '5D': 5, '5E': 5 });
  assert.equal(s.reduce((n, t) => n + t.need, 0), 10, 'a pool smaller than the count caps the day at the pool');
  // On TODAY: the plan takes each category's pool and shows the shortfall on the step.
  const p = planOf({ tests: [diag({ '5C': { c: 0, t: 2 }, '4A': { c: 1, t: 3 } })] }, '2026-11-16', { guided: 266, passages: 144, flashCats: { ...big, '5C': 2 }, guidedCats: { ...big, '5C': 6 }, passageCats: { ...big, '5C': 6 } });
  const f = p.steps[1], g = p.steps[2], ps = p.steps.find(x => x.id === 'passages');
  assert.deepEqual([f.count, g.count, ps.topics.reduce((n, t) => n + t.need, 0)], [50, 50, 50]);
  assert.deepEqual(f.topics.find(t => t.code === '5C'), { ...f.topics.find(t => t.code === '5C'), need: 2, short: 5, to: ['5D'] });
  assert.equal(f.topics.find(t => t.code === '5D').need, 15); assert.equal(g.topics.find(t => t.code === '5C').short, 1);
  assert(src.includes("'<p class=\"muted-note\">Shortfall: '") && src.includes("targets(s.topics, 'cards')") && src.includes("targets(s.topics, 'questions')"), 'the step detail shows the shortfall'); }
// The guided pool: the 266 Practice Exam C/P cards. Every category has enough for its largest day (weight share
// of 40 + 5 extra), so no Practice Exam step spills today.
const FL = get("QB_AAMC_FL.filter(q => /^pe\\d-cp:/.test(q.src)).map(q => ({ aamc: q.aamc, disc: q.disc }))");
const flCats = FL.reduce((o, q) => { o[q.aamc] = (o[q.aamc] || 0) + 1; return o; }, {});
assert.equal(FL.length, 266);
for (const t of split(50)) assert(flCats[t.code] >= Math.round(40 * BP.cats[t.code] / TOTAL) + 1 + 5, t.code + ': enough Practice Exam cards for a weak day');

// 4. Building the set: each category gets its count from its own cards, in the AAMC discipline mix where the pool
// allows; no card twice in a day while others are left; cards seen today only after the unseen ones.
{ const pick = (cards, k) => cards.slice(0, Math.max(0, k));
  const cards = [];
  const add = (cat, disc, n) => { for (let i = 0; i < n; i++) cards.push({ id: cat + disc + i, cat, disc }); };
  add('5D', 'biochemistry', 20); add('5D', 'organic_chem', 20); add('5D', 'biology', 3); add('5C', 'organic_chem', 2); add('5E', 'gen_chem', 30);
  const step = { topics: [{ code: '5D', need: 15, progress: 0 }, { code: '5C', need: 4, progress: 0 }, { code: '5E', need: 6, progress: 0 }] };
  const discW = call('masteryWeights', 'cp', 'discs');
  vm.runInContext('pickT = (c, k) => c.slice(0, Math.max(0, k)); catT = q => q.cat; discT = q => q.disc', ctx);
  const set = q => JSON.parse(JSON.stringify(vm.runInContext('masteryTopicSet(st, pl, catT, pickT, { discOf: discT, discW: dw, seen: new Set(sn) })', Object.assign(ctx, q))));
  let r = set({ st: step, pl: cards, dw: discW, sn: [] });
  const in5D = r.list.filter(q => r.topicOf[q.id] === '5D');
  assert.equal(r.list.length, 25); assert.equal(new Set(r.list.map(q => q.id)).size, 25, 'no repeats while cards are left');
  assert.deepEqual(['biochemistry', 'organic_chem', 'biology'].map(d => in5D.filter(q => q.disc === d).length), [9, 5, 1], '5D in the AAMC mix: 25 : 16 : 2 of 15');
  assert.equal(r.list.filter(q => r.topicOf[q.id] === '5C' && q.cat === '5C').length, 2, '5C uses its 2 cards, then the next categories');
  // 26 of the 30 5E cards were seen today: the 4 unseen ones are used, then unseen cards of the next categories,
  // never a card seen today while unseen ones are left.
  const seen26 = cards.filter(q => q.cat === '5E').slice(0, 26).map(q => q.id);
  r = set({ st: step, pl: cards, dw: discW, sn: seen26 });
  assert.equal(r.list.length, 25); assert(!r.list.some(q => seen26.includes(q.id)), 'no card seen today while unseen ones are left');
  assert.equal(r.list.filter(q => q.cat === '5E').length, 4, 'every unseen 5E card is used');
  r = set({ st: step, pl: cards.filter(q => q.cat !== '5D'), dw: discW, sn: seen26 });
  assert.equal(r.list.filter(q => seen26.includes(q.id)).length, 25 - 2 - 4, 'cards seen today only once the unseen ones run out');
  assert.equal(new Set(r.list.map(q => q.id)).size, r.list.length);
  const tiny = cards.filter(q => q.cat === '5C');
  r = set({ st: { topics: [{ code: '5C', need: 5, progress: 0 }] }, pl: tiny, dw: discW, sn: [] });
  assert.equal(r.list.length, 5, 'repeats only when the whole pool is used'); assert.equal(new Set(r.list.map(q => q.id)).size, 2);
  // The app passes the seen list and the discipline weights.
  assert(src.includes("masteryTopicSet(step, pool, catOf, pickQuestions, { seen: new Set(row.seen || []), discOf: disciplineOfRecall, discW })")); }

// 5. Passages: greedy on the gap within the existing rules.
const PRAC = get('CP_PRACTICE');
const rank = (o) => JSON.parse(JSON.stringify(vm.runInContext('masteryPassageRank(pl, o).map(p => p.id)', Object.assign(ctx, { pl: PRAC, o: Object.assign({}, o, { usedToday: new Set(o.usedToday || []) }) }))));
const pracCats = PRAC.flatMap(p => p.questions).reduce((o, q) => { o[q.cat] = (o[q.cat] || 0) + 1; return o; }, {});
const passTargets = (weak) => ({ cats: byCode(split(50, weak, pracCats)), skills: Object.fromEntries(call('masteryWeights', 'cp', 'skills').map(([k], i, a) => [k, call('masteryApportion', a, 50)[i]])) });
const tally = (ids) => { const got = {}, gotSkills = {}; ids.forEach(id => PRAC.find(p => p.id === id).questions.forEach(q => { got[q.cat] = (got[q.cat] || 0) + 1; gotSkills[q.skill] = (gotSkills[q.skill] || 0) + 1; })); return { got, gotSkills }; };
const gapOf = (ids, t) => { const { got, gotSkills } = tally(ids); return Object.entries(t.cats).reduce((n, [k, v]) => n + Math.abs(v - (got[k] || 0)), 0) + Object.entries(t.skills).reduce((n, [k, v]) => n + Math.abs(v - (gotSkills[k] || 0)), 0); };
{ const t = passTargets(['5C', '4A']);
  const greedy = [];
  while (greedy.reduce((n, id) => n + PRAC.find(p => p.id === id).questions.length, 0) < 50) {
    const stats = Object.fromEntries(greedy.map(id => [id, { attempts: 1, last: 50, lastAt: 1 }]));
    greedy.push(rank({ stats, usedToday: greedy, mix: { ...t, ...tally(greedy) } })[0]);
  }
  assert.equal(new Set(greedy).size, greedy.length, 'a day\'s passages are all different (unseen first)');
  const inOrder = []; for (const p of PRAC) { if (inOrder.reduce((n, id) => n + PRAC.find(x => x.id === id).questions.length, 0) >= 50) break; inOrder.push(p.id); }
  const g = gapOf(greedy, t), o = gapOf(inOrder, t);
  assert(g < o, `greedy gap ${g} beats the pool order's ${o}`);
  console.log(`Passages, a day with 5C and 4A weak: ${greedy.length} passages; gap to the category + skill targets ${g} (pool order: ${o}).`);
  const { got, gotSkills } = tally(greedy);
  console.log('  categories got/target: ' + Object.entries(t.cats).map(([k, v]) => `${k} ${got[k] || 0}/${v}`).join(', '));
  console.log('  skills got/target: ' + Object.entries(t.skills).map(([k, v]) => `${k.replace('SIRS ', 'Skill ')} ${gotSkills[k] || 0}/${v}`).join(', '));
  // The rules stay first: an unseen passage beats a seen one however well the seen one fits; a passage used
  // today goes last; once every passage was seen, the lowest score band leads and the gap breaks ties within it.
  const fit = rank({ mix: { ...t, got: {}, gotSkills: {} } })[0];
  const seenFit = rank({ stats: { [fit]: { attempts: 1, last: 0 } }, mix: { ...t, got: {}, gotSkills: {} } });
  assert.notEqual(seenFit[0], fit, 'unseen first'); assert.equal(seenFit.at(-1), fit);
  const all = (last) => Object.fromEntries(PRAC.map((p, i) => [p.id, { attempts: 1, last: last(p, i), lastAt: i + 1 }]));
  const low = all((p, i) => (i === 7 ? 30 : i === 9 ? 40 : 90));
  let r = rank({ stats: low, mix: { ...t, got: {}, gotSkills: {} } });
  assert.deepEqual(r.slice(0, 2).sort(), [PRAC[7].id, PRAC[9].id].sort(), 'lowest band (25–49%) first');
  r = rank({ stats: low, usedToday: [PRAC[7].id, PRAC[9].id], mix: { ...t, got: {}, gotSkills: {} } });
  assert.deepEqual(r.slice(-2).sort(), [PRAC[7].id, PRAC[9].id].sort(), 'used today: last');
  const flat = rank({ stats: all(() => 100), mix: { ...t, got: {}, gotSkills: {} } }), plain = rank({ stats: all(() => 100) });
  assert.notDeepEqual(flat, plain, 'within one band the gap decides');
  assert(src.includes('const next = masteryPassageOrder(pool, rank, new Set(row.pracUsed || []), followup, mix)[0];') && src.includes('row.pracS = '), 'the step uses the mix; skills are counted'); }

// 6. Quizzes: the fixed 30-question mix. Checked against data/cp-pool.js; misses are reported, not failed.
const QT = call('masteryQuizTargets', 'cp');
assert.deepEqual(QT.cats, { '5D': 7, '5E': 5, '4E': 4, '5A': 3, '4D': 2, '4C': 2, '4B': 2, '5B': 2, '4A': 2, '5C': 1 });
assert.deepEqual(QT.discs, { gen_chem: 10, biochemistry: 7, physics: 7, organic_chem: 5, biology: 1 });
assert.equal(get('MASTERY.diagSize'), 59, 'the diagnostic keeps its 59-question blueprint');
const POOL = get('CP_POOL'), DIAG = get('CP_DIAG');
const layout = set => { const byId = new Map(set.passages.map(p => [p.id, p])), out = []; let sa = 0;
  for (const step of set.order) { if (typeof step === 'number') { set.standalones.slice(sa, sa += step).forEach(q => out.push({ cat: q.cat, disc: q.subj, skill: q.skill })); continue; }
    byId.get(step).questions.forEach(q => out.push({ cat: q.cat, disc: q.subj || byId.get(step).subj, skill: q.skill })); }
  return out; };
assert.deepEqual(call('masteryQuizMix', [...Object.entries(QT.cats).flatMap(([c, n]) => Array(n).fill(c))].map((cat, i) => ({ cat, disc: Object.entries(QT.discs).flatMap(([d, n]) => Array(n).fill(d))[i] })), 'cp'), [], 'a set on the mix passes');
const fmt = m => (m.kind === 'category' ? m.code : m.code.replace('_chem', ' chem')) + ' ' + m.got + ' vs ' + m.need + ' (' + (m.got > m.need ? '+' : '') + (m.got - m.need) + ')';
let missing = 0;
console.log('Daily quiz mix (categories exact; disciplines ±1, biology ≤1) against data/cp-pool.js:');
for (const set of POOL) {
  const items = layout(set), miss = call('masteryQuizMix', items, 'cp');
  assert.equal(items.length, 30, set.id + ': 30 questions');
  if (miss.length) missing++;
  console.log('  ' + set.id + ': ' + (miss.length ? 'MISSES ' + ['category', 'discipline'].map(k => miss.filter(m => m.kind === k)).filter(a => a.length).map(a => a[0].kind + ' ' + a.map(fmt).join(', ')).join('; ') : 'on the mix'));
}
console.log('  ' + (missing ? missing + ' of ' + POOL.length + ' sets miss the mix (data unchanged; a rebuild of data/cp-pool.js will fix them).' : 'every set is on the mix.'));
// Weights compared: the quizzes, the practice passages and the diagnostic against the blueprint, by category and skill.
{ const share = (items, k, keys) => { const n = items.length, c = {}; items.forEach(q => { c[q[k]] = (c[q[k]] || 0) + 1; }); return keys.map(x => x + ' ' + (100 * (c[x] || 0) / n).toFixed(0) + '%').join(', '); };
  const quizItems = POOL.flatMap(layout), prac = PRAC.flatMap(p => p.questions.map(q => ({ cat: q.cat, skill: q.skill }))), d = layout(DIAG);
  const skills = Object.keys(BP.skills);
  console.log('Blueprint:        categories ' + CATS.map(c => c + ' ' + (100 * BP.cats[c] / TOTAL).toFixed(0) + '%').join(', ') + ' | skills ' + skills.map(k => k + ' ' + (100 * BP.skills[k] / Object.values(BP.skills).reduce((a, b) => a + b, 0)).toFixed(0) + '%').join(', '));
  console.log('Quizzes (' + quizItems.length + 'q):    categories ' + share(quizItems, 'cat', CATS) + ' | skills ' + share(quizItems, 'skill', skills));
  console.log('Practice (' + prac.length + 'q):  categories ' + share(prac, 'cat', CATS) + ' | skills ' + share(prac, 'skill', skills));
  console.log('Diagnostic (' + d.length + 'q):  categories ' + share(d, 'cat', CATS) + ' | skills ' + share(d, 'skill', skills)); }

// 7. Saved days: a row with the old 5-topic shape (no split marker) keeps its plan and counts; the split starts the
// next day; a blueprint row keeps the weak categories it was saved with; malformed rows never crash.
{ const m = { tests: [diag({ '5A': { c: 2, t: 9 }, '4E': { c: 5, t: 9 } })], days: { '2026-11-16': { subj: 'cp', topics: ['5A', '4E', '4A', '4B', '4C'], flashT: { '5A': 10, '4E': 7 }, guidedT: { '4A': 3 }, prac: 12, pracT: { '5D': 12 } } } };
  let p = planOf(m);
  assert.equal(p.split, 'topics'); assert.deepEqual(p.topics, ['5A', '4E', '4A', '4B', '4C']);
  assert.deepEqual(p.steps[1].topics.map(t => t.code + ' ' + t.progress + '/' + t.need), ['5A 10/10', '4E 7/10', '4A 0/10', '4B 0/10', '4C 0/10'], 'today keeps its 5 topics and counts');
  assert.equal(p.steps.find(s => s.id === 'passages').progress, 12); assert(!p.steps.find(s => s.id === 'passages').topics, 'no passage targets on an old day');
  assert.equal(p.steps.find(s => s.id === 'test').mix, null);
  p = planOf(m, '2026-11-17');
  assert.equal(p.split, 'blueprint'); assert.deepEqual(p.weakT, ['5A', '4E'], 'the next day: the blueprint split');
  m.days['2026-11-17'] = { subj: 'cp', topics: p.topics, split: 'blueprint', weakT: ['5C', '4B'], flashT: { '5C': 3 } };
  m.tests.push({ ...diag({ '4D': { c: 0, t: 5 } }), day: '2026-11-17', kind: 'daily' });
  p = planOf(m, '2026-11-17');
  assert.deepEqual(p.weakT, ['5C', '4B'], 'a saved day keeps its weak categories as tests come in');
  assert.equal(p.steps[1].topics.find(t => t.code === '5C').progress, 3);
  for (const bad of [{ subj: 'cp', topics: 'x', split: 'blueprint', weakT: 5 }, { subj: 'cp', split: 'blueprint', weakT: ['<b>', null] }, { subj: 'cp', topics: [], flashT: 'nope' }, null]) {
    const q = planOf({ ...m, days: { '2026-11-17': bad } }, '2026-11-17');
    assert.equal(q.steps[1].count, 50, 'malformed day row: ' + JSON.stringify(bad)); assert(q.weakT.every(c => CATS.includes(c))); }
  const mixed = src.slice(src.indexOf('function masteryDayRow'), src.indexOf('function masteryCategory'));
  assert(mixed.includes("Object.assign(row, { split: 'blueprint', weakT: p.weakT || [] })"), 'a new day row is stored with the split marker'); }

console.log('Blueprint mix passed: 80% by AAMC weight + 20% to the two weakest, sums and ±1 shares, small-pool spillover, discipline mix, no same-day repeats, greedy passages within the old rules, quiz mix checked, old day rows load.');
