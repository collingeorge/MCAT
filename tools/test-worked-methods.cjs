// "How to work it out": worked methods on Full-Length Prep cards. Every Practice Exam 6 card has a
// complete method (what it's asking, what to know, steps, trap). Before answering, hints come in two
// stages and never show the steps or the trap. After answering, the full method is shown. A hinted
// answer starts as Unsure. Reworded or reversed forms never borrow the original card's method.
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const root = __dirname + '/..';
const source = fs.readFileSync(root + '/js/app.js', 'utf8');
const data = fs.readFileSync(root + '/data/qb-aamc-fl.js', 'utf8');
const FL = new Function(data + ';return QB_AAMC_FL')();

// Data: every PE6 card has a full method; any card with a method has a well-formed one.
const pe6 = FL.filter(q => /^pe6-/.test(q.src));
assert(pe6.length >= 52, 'PE6 cards present');
for (const q of FL.filter(q => q.how || /^pe6-/.test(q.src))) {
  const h = q.how, id = q.src;
  assert(h, id + ': has a worked method');
  for (const k of ['ask', 'know', 'trap']) assert(typeof h[k] === 'string' && h[k].trim().length >= 10, id + ': ' + k);
  assert(Array.isArray(h.steps) && h.steps.length >= 1 && h.steps.every(s => (typeof s === 'string' && s.trim()) || (s && typeof s.text === 'string' && s.text.trim())), id + ': steps');
  assert.deepEqual(Object.keys(h).sort(), ['ask', 'know', 'steps', 'trap'], id + ': only known fields');
  // The hint shown before answering (ask) must not simply state the correct choice.
  assert(q.choices[q.ans].length <= 3 || !h.ask.includes(q.choices[q.ans]), id + ': "ask" does not give away the answer');
}

// Exam form: every Full-Length Prep card asks like the exam. No choice labels why it is right, e.g. "¹H NMR (peak integrals)".
// Rewritten cards keep their original identity (idStem), so progress, flags and review history carry over.
// Cards added 2026-11-15 (the Sample Test and the Practice Exam gaps) are new, so they have no earlier identity to keep.
const ADDED = new Set(['pe1-cp:2', 'pe1-cp:18', 'pe1-cp:27', 'pe1-cp:36', 'pe1-cp:38', 'pe1-cp:41', 'pe1-cp:43', 'pe1-cp:49', 'pe3-cp:1', 'pe3-cp:4', 'pe3-cp:30', 'pe3-cp:31', 'pe3-cp:35', 'pe3-cp:43',
  'pe4-cp:7', 'pe4-cp:21', 'pe4-cp:23', 'pe4-cp:24', 'pe4-cp:31', 'pe4-cp:33', 'pe5-cp:30', 'pe5-cp:43', 'pe6-cp:3', 'pe6-cp:14', 'pe6-cp:21', 'pe6-cp:31', 'pe6-cp:33', 'pe6-cp:39', 'pe6-cp:40']);
const REWORDED_ADDED = new Set(['sample-cp:47', 'pe4-cp:7']);
const isAdded = q => ADDED.has(q.src) || /^sample-cp:/.test(q.src);
assert.equal(FL.filter(isAdded).length, 88, '59 Sample Test cards and 29 Practice Exam gap cards');
// A parenthetical gloss in a choice (words inside parentheses) can label why it is right. Formula parentheses such as
// ClO₃(OH), (S)-alcohol or J/(kg·°C) are not glosses. Two added cards keep their glosses as supplied: both lens choices
// carry one (sample-cp:43), and "CO₂ (as carbonate)" names the form in base (pe4-cp:33).
const GLOSS_OK = new Set(['sample-cp:43', 'pe4-cp:33']);
for (const q of FL) {
  assert(q.how, q.src + ': has a worked method');
  assert(GLOSS_OK.has(q.src) || q.choices.every(c => !/\([^()]*\s[^()]*\)/.test(c)), q.src + ': no parenthetical hint in choices');
  assert(!/\b(RATIO|MUST)\b/.test(q.q), q.src + ': no capitalized cue words beyond NOT/EXCEPT');
  // Two added cards were reworded after they shipped (2026-11-15: pH 7 → pH 8, 1:20 → 20-fold); they keep the stem they shipped with.
  if (isAdded(q) && !REWORDED_ADDED.has(q.src)) assert.equal(q.idStem, undefined, q.src + ': a new card has no earlier stem');
  else assert(typeof q.idStem === 'string' && q.idStem !== q.q, q.src + ': original stem kept as idStem');
}
assert(source.includes("let id = 'fl-' + hashId(q.s + '|' + (q.idStem || q.q));"), 'FL ids use idStem');

// Rewritten 2026-11-15: these Practice Exam cards had reused the real question's own numbers, so they landed on the real
// test's answer. Each now has its own scenario and numbers (same method, same id via idStem). The old key and choices are
// kept here so a later edit cannot drift back to them: the new key differs from the old key, and no new choice is an old choice.
const REWRITTEN = {
  "pe1-cp:3": { key: "0.20", choices: ["0.27","0.20","5.0","0.30"] },
  "pe1-cp:42": { key: "Nitrogen-14 and sulfur-32", choices: ["Boron-14 and silicon-32","Nitrogen-14 and sulfur-32","Nitrogen-14 and silicon-32","Beryllium-10 and aluminum-28"] },
  "pe3-cp:7": { key: "40 kW", choices: ["40 kW","48 kW","25 W","960 kW"] },
  "pe3-cp:19": { key: "1 × 10⁻¹⁸ J, at 200 nm", choices: ["7 × 10⁻¹⁹ J, at 300 nm","1 × 10⁻²⁷ J, at 200 nm","1 × 10⁻¹⁸ J, at 200 nm","4 × 10⁻³² J, at 200 nm"] },
  "pe3-cp:34": { key: "10⁻⁴ M, a million times greater than [H⁺]", choices: ["10⁻⁴ M, a million times greater than [H⁺]","10⁻⁴ M, a million times smaller than [H⁺]","10⁻¹⁰ M, a million times smaller than [H⁺]","10⁻¹⁰ M, the same as [H⁺]"] },
  "pe3-cp:39": { key: "200 Ω·cm", choices: ["200 Ω·cm","20 Ω·cm","2500 Ω·cm","5.0 × 10⁻³ Ω·cm"] },
  "pe3-cp:45": { key: "pH 7.0, since the protein is negative there", choices: ["pH 4.0, since the protein is positive there","pH 7.0, since the protein is negative there","pH 5.5, since the protein has no net charge there","pH 4.0, since the protein is negative there"] },
  "pe4-cp:15": { key: "4.0 Hz; average power 2.0 W", choices: ["4.0 Hz; average power 2.0 W","4.0 Hz; average power 5.0 × 10⁷ W","0.004 Hz; average power 2.0 × 10⁻³ W","1.0 × 10⁸ Hz; average power 5.0 × 10⁷ W"] },
  "pe4-cp:22": { key: "6 × 10⁻⁴ μM; A is about 750 times more potent", choices: ["6 × 10⁻⁴ μM; A is about 750 times more potent","6 × 10² μM; B is about 1300 times more potent","6 × 10⁻⁷ μM; A is about 7.5 × 10⁵ times more potent","6 × 10⁻⁴ μM; B is about 750 times more potent"] },
  "pe4-cp:38": { key: "500 μM", choices: ["50 μM","3.3 mM","500 μM","980 M"] },
  "pe4-cp:53": { key: "8 m", choices: ["0.8 m","8 m","16 m","80 m"] },
  "pe4-cp:54": { key: "1.5 × 10⁴ C", choices: ["4.2 C","250 C","1.5 × 10⁴ C","5.6 × 10⁴ C"] },
  "pe5-cp:15": { key: "5 × 10⁻⁴ mol", choices: ["0.5 mol","5 × 10⁻⁴ mol","4 × 10⁻⁵ mol","2 × 10⁻⁶ mol"] },
  "pe5-cp:24": { key: "0.15 mol; 8.8 g", choices: ["0.15 mol; 8.8 g","0.015 mol; 0.88 g","1.5 mol; 88 g","0.60 mol; 35 g"] },
  "pe5-cp:49": { key: "20 kPa", choices: ["2.0 kPa","200 kPa","20 kPa","2.0 Pa"] },
  "pe5-cp:50": { key: "7.5 A", choices: ["7.5 A","0.75 A","75 A","7.5 mA"] },
  "pe5-cp:56": { key: "620 nm", choices: ["620 nm","310 nm","2480 nm","1240 nm"] },
};
for (const [src, old] of Object.entries(REWRITTEN)) {
  const q = FL.find(x => x.src === src);
  assert(q, src + ': rewritten card present');
  assert.notEqual(q.choices[q.ans], old.key, src + ': new key differs from the old key');
  for (const c of q.choices) assert(!old.choices.includes(c), src + ': choice "' + c + '" is not an old choice');
  assert(typeof q.idStem === 'string' && q.idStem !== q.q, src + ': keeps its id through idStem');
}

// Animated walkthroughs: every Practice Exam card steps through the solution with at least 3 visual steps, at least
// one of them a worked calculation, a graph or a structure. Each visual must point at something real: question text
// to highlight, a wrong choice to cross out, a plotted point to trace, a drawing that exists.
const STRUCT_NAMES = new Set(Object.keys(new Function(fs.readFileSync(root + '/data/structures.js', 'utf8') + ';return STRUCT_SVG')()));
function checkSteps(id, q) {
  let visual = 0, rich = 0;
  for (const [i, st] of q.how.steps.entries()) {
    if (typeof st === 'string') continue;
    const w = `${id} step ${i + 1}`;
    assert.deepEqual(Object.keys(st).filter(k => !['text', 'hl', 'calc', 'chart', 'graph', 'fig', 'strike'].includes(k)), [], w + ': known fields');
    if (st.hl != null) { visual++; assert(q.q.includes(st.hl), w + ': highlight is question text'); }
    if (st.calc != null) { visual++; rich++; assert(Array.isArray(st.calc) && st.calc.length && st.calc.every(l => typeof l === 'string' && l.trim()), w + ': calc lines'); }
    if (st.fig != null) { visual++; rich++; for (const n of [].concat(st.fig)) assert(STRUCT_NAMES.has(n), w + ': drawing ' + n + ' exists'); }
    if (st.strike != null) { visual++; for (const t of st.strike) { assert(q.choices.includes(t), w + ': strikes a real choice'); assert.notEqual(t, q.choices[q.ans], w + ': never strikes the answer'); } }
    if (st.chart != null) { visual++; rich++; assert(['line', 'bar'].includes(st.chart.type) && Array.isArray(st.chart.series), w + ': chart'); }
    if (st.graph != null) {
      const ch = st.chart || q.chart; assert(ch, w + ': overlay needs a chart (the step\'s or the question\'s)');
      for (const r of st.graph.read || []) { const ser = ch.series.find(x => x.name === r.series); assert(ser && ser.points.some(([x]) => x === r.x), w + ': traced point is plotted'); }
    }
  }
  return { visual, rich };
}
for (const q of FL) assert(Array.isArray(q.teach) && q.teach.length, q.src + ': every Practice Exam card has a step-by-step lesson');
for (const q of FL.filter(q => q.teach)) {
  assert(Array.isArray(q.teach) && q.teach.length >= 3, q.src + ': a lesson has at least 3 steps');
  for (const st of q.teach) {
    assert(typeof st.text === 'string' && st.text.length > 10, q.src + ': lesson step text');
    for (const n of [].concat(st.fig ?? [])) assert(STRUCT_NAMES.has(n), q.src + ': lesson drawing ' + n + ' exists');
    assert.deepEqual(Object.keys(st).filter(f => !['text', 'fig', 'graph', 'hl', 'marks', 'calc', 'chart'].includes(f)), [], q.src + ': lesson step fields');
    for (const m of st.marks || []) assert(q.q.includes(m.t) && typeof m.note === 'string', q.src + ': callout marks question text');
    if (st.hl != null) assert(q.q.includes(st.hl), q.src + ': lesson highlight is question text');
    if (st.graph && !st.chart) assert(q.chart, q.src + ': lesson graph overlay needs the question graph or its own');
    for (const lb of (st.graph && st.graph.labels) || []) if (lb.series) assert((st.chart || q.chart).series.some(s => s.name === lb.series && s.points.some(([x]) => x === lb.x)), q.src + ': lesson label points at a plotted point');
  }
}
assert(source.includes("if (teachOf(view.q)) return helpButton('teachStep(0)') + elimButton(view) + (view.teachCur ? teachHtml(view) : '');") && ['teachStep', 'showLesson', 'ruleOut'].every(f => fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'" + f + "'")), 'graph lessons wired (the help button at any time) and allowlisted');
for (const q of FL) {
  // Exam-form pictures: a structure in the question and/or one per answer choice must exist.
  for (const n of [].concat(q.fig ?? [], q.choiceFigs ?? [])) assert(STRUCT_NAMES.has(n), q.src + ': drawing ' + n + ' exists');
  if (q.choiceFigs) assert.equal(q.choiceFigs.length, q.choices.length, q.src + ': one drawing per choice');
  if (q.chart) assert(['line', 'bar'].includes(q.chart.type) && Array.isArray(q.chart.series) && q.chart.caption, q.src + ': question graph');
  const { visual, rich } = checkSteps(q.src, q);
  assert(visual >= 3 && rich >= 1, `${q.src}: animated walkthrough (${visual} visual steps, ${rich} calc/chart/fig)`);
}

// The RDKit drawings the walkthroughs use: script-free SVG, in sync with their generator, loaded and cached.
const STRUCT = new Function(fs.readFileSync(root + '/data/structures.js', 'utf8') + ';return STRUCT_SVG')();
const crypto = require('node:crypto');
const gen = fs.readFileSync(root + '/tools/draw-structures.py', 'utf8').replace(/\r\n/g, '\n');
const header = /source ([0-9a-f]{16})/.exec(fs.readFileSync(root + '/data/structures.js', 'utf8'));
assert(header && header[1] === crypto.createHash('sha256').update(gen).digest('hex').slice(0, 16), 'data/structures.js is stale: run python3 tools/draw-structures.py');
for (const [name, svg] of Object.entries(STRUCT)) {
  assert(/^<svg[\s\S]*<\/svg>$/.test(svg), name + ': is an SVG');
  assert(!/<script|<foreignObject|\son\w+\s*=|javascript:|href=/i.test(svg), name + ': no script, handlers or links in the drawing');
  assert(!/<\?xml|<!--|rdkit/i.test(svg), name + ': compact SVG (no XML declaration, comments or RDKit metadata)');
}
// The generator compacts RDKit's SVG (one-decimal numbers, shared <style> classes per drawing); keep the file small.
assert(fs.statSync(root + '/data/structures.js').size < 2.5 * 1024 * 1024, 'data/structures.js stays under its 2.5 MB budget');
// The drawings load on demand (Practice Exam sessions), not as a script tag on every page; they stay precached.
for (const page of ['index.html', 'flprep.html', 'aamc.html', 'recall-session.html']) assert(!fs.readFileSync(root + '/' + page, 'utf8').includes('data/structures.js'), page + ' does not load the drawings up front');
assert(source.includes("el.src = 'data/structures.js' + ASSET_V;") && source.includes('loadStructsFor(items);') && source.includes("if (view === 'exam') { ensureStructs()"), 'drawings load when Practice Exam cards are used');
const sw = fs.readFileSync(root + '/sw.js', 'utf8');
assert(sw.includes("'data/structures.js'"), 'structures are cached for offline use');
// Only the Practice Exam cards: no extra card sets or passages ride along.
assert(!fs.existsSync(root + '/data/qb-structures.js') && !fs.existsSync(root + '/data/passages-graphs.js'), 'no added card sets or passages');
assert(new Set(FL.map(q => q.s)).size === 6 && FL.every(q => /^(Practice Exam [13456]|Sample Test): Chem\/Phys$/.test(q.s)), 'Full-Length Prep holds the five Practice Exams and the Sample Test only');
assert.equal(FL.length, 354, '266 Practice Exam cards + 29 gap cards + 59 Sample Test cards');


// Rendering: run the real functions against a minimal DOM.
function extract(name) { const a = source.indexOf('function ' + name + '('), b = source.indexOf('\nfunction ', a + 1); assert(a >= 0, name); return source.slice(a, b < 0 ? source.length : b); }
const nodes = new Map();
const node = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '' }); return nodes.get(id); };
const card = { ...pe6.find(q => q.src === 'pe6-cp:18'), teach: undefined }; // the hint ladder for a card without a lesson
const ctx = vm.createContext({ $: node, quiz: { answered: false, idx: 0, items: [{ q: card }] }, String, Array });
ctx.stepper = null; ctx.Math = Math; ctx.Number = Number; ctx.Set = Set; ctx.Map = Map; ctx.structUrls = new Map(); ctx.structsFailed = false; ctx.encodeURIComponent = encodeURIComponent;
for (const name of ['esc', 'fmt', 'paragraphs', 'howOf', 'teachOf', 'teachHtml', 'teachStep', 'hintArea', 'showHint', 'howSteps', 'markText', 'markParagraphs', 'stepVisual', 'howPlayerHtml', 'applyStepContext', 'clearStepContext', 'howStepMs', 'howSchedule', 'howToggle', 'howReplay', 'howStep', 'howBox',
  'chartNum', 'chartText', 'chartTicks', 'chartSmooth', 'chartMarker', 'chartLegend', 'chartAxes', 'chartAnnotations', 'lineChart', 'barChart', 'figureHtml', 'structUrl', 'structImg', 'stemFigs', 'isLessonCard', 'cutOf', 'glanceRulesHtml', 'elimChecksHtml', 'fastOf', 'fastLabel', 'fastKindsHtml', 'elimButton', 'elimHowHtml', 'elimOnlyStep', 'elimStep', 'lessonSteps', 'stepperSteps', 'lessonPlayerHtml', 'lessonBox', 'paintCardPassage']) vm.runInContext(extract(name), ctx);
vm.runInContext("var CHART = { W: 560, L: 70, R: 18, T: 14, H: 250, B: 50 };", ctx);
const view = ctx.quiz.items[0];

// ✂ Rule out (the glance rules) opens the lesson of a card that has cuts: the cut choices struck, one line per rule
// (its name, then what it cuts), before the full working; a card without cuts starts at its first worked step.
vm.runInContext(source.slice(source.indexOf('const GLANCE_RULES = ['), source.indexOf('function cutOf(')).replace(/^const /mg, 'var '), ctx);
vm.runInContext(source.slice(source.indexOf('const FAST_KINDS = ['), source.indexOf('function fastOf(')).replace(/^const /mg, 'var '), ctx);
{ const q = { q: 'Which?', choices: ['A1', 'B2', 'C3', 'D4'], ans: 2, cut: [{ r: 3, c: [0] }, { r: 6, c: [1] }],
    how: { ask: 'a', know: 'k', steps: [{ text: 'work' }], trap: 't' }, teach: [{ text: 'x' }, { text: '**Rule to reuse:** r' }] };
  ctx.__q = q; const st = vm.runInContext('lessonSteps(__q)', ctx);
  assert.match(st[0].text, /Rule out at a glance/); assert.deepEqual([...st[0].strike], ['A1', 'B2']);
  assert.deepEqual([...st[0].calc], ['Way off in size → ✂ A1', 'Formula has ½ → ✂ B2']);
  assert(!st[0].calc.some(l => l.includes('C3')), 'the Rule out step never names the key');
  assert.equal(st[1].text, 'work'); assert.equal(st.length, 3);
  // A shortcut follows Rule out as its own lesson step.
  ctx.__q = { ...q, fast: { kind: 'rearrange', how: 'Use P = F × v.' } }; const sf = vm.runInContext('lessonSteps(__q)', ctx);
  assert.match(sf[1].text, /⚡ Shortcut · 🔁 Rearrange\.\*\* Use P = F × v\./); assert.equal(sf[2].text, 'work');
  // No cuts (or the old elim format): no Rule out step.
  ctx.__q = { ...q, cut: [] }; assert.equal(vm.runInContext('lessonSteps(__q)', ctx)[0].text, 'work');
  ctx.__q = { ...q, cut: undefined, elim: [{ c: 0, tag: 'units', why: 'x' }] }; assert.equal(vm.runInContext('lessonSteps(__q)', ctx)[0].text, 'work');
  // The six glance rules, in order, with one example each (the Rules sheet).
  const sheet = vm.runInContext('glanceRulesHtml()', ctx);
  ['Opposites? Answer is one of them.', 'Match the passage’s direction.', 'Way off in size? Cut it.', 'Starting number? Cut it.', 'Solid, catalyst or pure liquid? No change.', 'Formula has ½? Take the smaller twin.'].reduce((at, name) => { const k = sheet.indexOf(name); assert(k > at, name + ' in order'); return k; }, -1);
  assert.equal((sheet.match(/<li>/g) || []).length, 6, 'exactly six rules'); }
let html = vm.runInContext('hintArea(quiz.items[0])', ctx);
assert.match(html, /Show me how to start/); assert.doesNotMatch(html, /What it's asking/);
vm.runInContext('showHint()', ctx); html = node('hint-area').innerHTML;
assert.match(html, /What it's asking/); assert.match(html, /Show what I need to know/); assert.doesNotMatch(html, /What you need to know/);
vm.runInContext('showHint()', ctx); html = node('hint-area').innerHTML;
assert.match(html, /What you need to know/); assert.doesNotMatch(html, /hint-btn/, 'no third stage');
for (const st of card.how.steps) assert(!html.includes(vm.runInContext('fmt', ctx)(st)), 'steps stay hidden before answering');
assert(!html.includes('trap'), 'trap stays hidden before answering');
vm.runInContext('showHint()', ctx); assert.equal(view.hint, 2, 'hint level stops at 2');

const box = vm.runInContext('howBox(quiz.items[0].q, { static: true })', ctx);
assert.match(box, /How to work it out/); assert.match(box, /<ol class="how-steps">/); assert.match(box, /The trap/);
// A card with Rule out 3 lists it as its first step.
const hasElim3 = !!(card.cut && card.cut.length), hasFast = !!(card.fast && card.fast.kind && card.fast.how);
assert.equal((box.match(/<li>/g) || []).length, card.how.steps.length + (hasElim3 ? 1 : 0) + (hasFast ? 1 : 0));
if (hasElim3) assert(/<li>(<strong>)?Rule out at a glance/.test(box), 'Rule out is the first step');
// Player: one step at a time; the trap appears only at the last step; Back/Next stay in range.
const player = vm.runInContext('howBox(quiz.items[0].q)', ctx), n = card.how.steps.length + (hasElim3 ? 1 : 0) + (hasFast ? 1 : 0);
assert.match(player, /id="how-player"/); assert.equal((player.match(/class="how-step[ "]/g) || []).length, 1, 'starts at step 1');
assert.doesNotMatch(player, /The trap/, 'trap hidden until the last step'); assert.match(player, new RegExp('Step 1 of ' + n));
assert.match(player, /data-click="howStep\(1\)"/);
const step = d => { vm.runInContext(`howStep(${d})`, ctx); return vm.runInContext('howPlayerHtml()', ctx); };
ctx.$ = () => null;
assert.equal((step(1).match(/class="how-step[ "]/g) || []).length, 2);
assert.match(step(99), /The trap/); assert.equal(vm.runInContext('stepper.cur', ctx), n, 'clamped at the last step');
assert.equal((step(-99).match(/class="how-step[ "]/g) || []).length, 1, 'clamped at step 1');
// Highlighting: exact substring only, escaped; missing text falls back to plain formatting.
assert.equal(vm.runInContext("markText('a <b> c', '<b>')", ctx), 'a <mark class="step-hl">&lt;b&gt;</mark> c');
assert.equal(vm.runInContext("markText('abc', 'zzz')", ctx), 'abc');
assert.match(vm.runInContext("markParagraphs('one\\n\\ntwo three', 'two')", ctx), /<p>one<\/p><p><mark class="step-hl">two<\/mark> three<\/p>/);
// Guided playback: plays on its own after answering, one step per timer, stops at the last step; any manual
// Back/Next pauses it; Play resumes; Replay restarts from step 1. Reduced-motion readers start paused.
{
  const timers = []; ctx.setTimeout = (fn, ms) => { timers.push({ fn, ms }); return timers.length; }; ctx.clearTimeout = () => {};
  ctx.$ = () => null; ctx.matchMedia = () => ({ matches: false });
  ctx.pq3 = { q: 'Q?', choices: ['A', 'B', 'C', 'D'], ans: 0, how: { ask: 'aaaaaaaaaaaa', know: 'kkkkkkkkkkkk', trap: 'tttttttttttt', steps: ['one', { text: 'two', calc: ['x', 'y'] }, 'three'] } };
  vm.runInContext('howBox(pq3); howSchedule()', ctx);
  assert.equal(vm.runInContext('stepper.playing', ctx), true, 'autoplays');
  assert.equal(timers.length, 1); assert(timers[0].ms >= 3800, 'gives time to read');
  timers.shift().fn(); assert.equal(vm.runInContext('stepper.cur', ctx), 2, 'advanced by itself');
  assert(timers.length === 1 && timers[0].ms > 3800 + 1700, 'calc steps get extra time');
  timers.shift().fn(); assert.equal(vm.runInContext('stepper.cur', ctx), 3);
  assert.equal(timers.length, 0, 'stops at the last step'); assert.match(vm.runInContext('howPlayerHtml()', ctx), /howReplay\(\)/);
  vm.runInContext('howReplay()', ctx); assert.equal(vm.runInContext('stepper.cur', ctx), 1); assert.equal(timers.length, 1, 'replay restarts playback');
  timers.length = 0; vm.runInContext('howStep(1)', ctx);
  assert.equal(vm.runInContext('stepper.playing', ctx), false, 'manual step pauses'); assert.equal(timers.length, 0);
  assert.match(vm.runInContext('howPlayerHtml()', ctx), /▶ Play/); assert.doesNotMatch(vm.runInContext('howPlayerHtml()', ctx), /⏸/);
  vm.runInContext('howToggle()', ctx); assert.equal(vm.runInContext('stepper.playing', ctx), true); assert.equal(timers.length, 1, 'play resumes');
  ctx.matchMedia = () => ({ matches: true }); vm.runInContext('howBox(pq3)', ctx);
  assert.equal(vm.runInContext('stepper.playing', ctx), false, 'reduced motion starts paused');
  delete ctx.setTimeout; delete ctx.clearTimeout; delete ctx.matchMedia;
}
assert(fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'howToggle', 'howReplay'"), 'playback actions allowlisted');
// Calculation lines appear in sequence (escaped, **bold** kept); struck choices are listed and crossed out.
const calcHtml = vm.runInContext("stepVisual({ text: 't', calc: ['q = m × L', 'q = **0.050 kg** × 4.0 × 10⁵', '<b>x</b>'], strike: ['1 × 10⁵ J'] }, {})", ctx);
assert.equal((calcHtml.match(/class="calc-line calc-d/g) || []).length, 3); assert.match(calcHtml, /calc-d2/);
assert.match(calcHtml, /<strong>0.050 kg<\/strong>/); assert.doesNotMatch(calcHtml, /<b>x<\/b>/);
assert.match(calcHtml, /<s>1 × 10⁵ J<\/s>/);
// A step's own chart renders even without a passage figure.
assert.match(vm.runInContext("stepVisual({ text: 't', chart: { type: 'line', caption: 'c', x: { label: 'x', min: 0, max: 2, step: 1 }, y: { label: 'y', min: 0, max: 2, step: 1 }, series: [{ name: 'S', marker: 'circle', line: 'straight', points: [[0, 0], [1, 1]] }] }, graph: { read: [{ series: 'S', x: 1 }] } }, {})", ctx), /class="ch-trace/);
// Crossing out: choices ruled out by steps 1..current get the struck class on the answer buttons.
const btns = {}; ctx.$ = id => (btns[id] = btns[id] || { focus() {}, innerHTML: '', classList: { on: false, toggle(c, v) { this.on = v; } } });
ctx.document = { querySelector: () => null };
ctx.sq = { q: 'Q?', choices: ['A1', 'B1', 'C1', 'D1'], ans: 0, how: { ask: 'aaaaaaaaaaaa', know: 'kkkkkkkkkkkk', trap: 'tttttttttttt', steps: [{ text: 's1', strike: ['B1'] }, { text: 's2', strike: ['C1'] }, 'end'] } };
vm.runInContext("howBox(sq, { ctx: { mode: 'recall', view: { choices: ['C1', 'A1', 'D1', 'B1'] }, prefix: 'cb' } }); applyStepContext();", ctx);
assert.deepEqual([0, 1, 2, 3].map(i => btns['cb-' + i].classList.on), [false, false, false, true], 'step 1 crosses out B1');
vm.runInContext('howStep(1)', ctx);
assert.deepEqual([0, 1, 2, 3].map(i => btns['cb-' + i].classList.on), [true, false, false, true], 'step 2 adds C1');
vm.runInContext('howStep(-1)', ctx);
assert.deepEqual([0, 1, 2, 3].map(i => btns['cb-' + i].classList.on), [false, false, false, true], 'going back un-crosses C1');
delete ctx.document; ctx.$ = () => null;
// Charts: series, markers, legend; a read overlay traces to an existing point and labels its value; focus dims others.
ctx.fig = { type: 'line', caption: 'Fig 1', x: { label: 'pH', min: 6, max: 10, step: 1 }, y: { label: 'k_FAD (s⁻¹)', min: 0, max: 3, step: 1 },
  series: [{ name: 'A', marker: 'circle', line: 'smooth', points: [[6, 0.2], [7, 1.1], [7.5, 2], [8, 2.4], [10, 2.5]] }, { name: 'B', marker: 'square', line: 'smooth', points: [[6, 0.1], [7.5, 1], [10, 2.4]] }] };
const plain = vm.runInContext('figureHtml(fig)', ctx);
assert.match(plain, /<svg class="chart"/); assert.match(plain, /<figcaption>Fig 1<\/figcaption>/); assert.doesNotMatch(plain, /ch-trace|ch-dim/);
assert.match(plain, /baseline-shift="sub"[^>]*>FAD</, 'k_FAD subscript');
const traced = vm.runInContext("figureHtml(fig, { focus: ['A', 'B'], read: [{ series: 'A', x: 7.5 }, { series: 'B', x: 7.5 }, { series: 'A', x: 9 }] })", ctx);
assert.equal((traced.match(/class="ch-trace/g) || []).length, 2, 'only points that exist are traced');
assert.match(traced, />2<\/text>/); assert.match(traced, />1<\/text>/);
assert.match(vm.runInContext("figureHtml(fig, { focus: ['A'] })", ctx), /class="ch-s ch-dim"/);
ctx.bar = { type: 'bar', caption: 'Fig 2', x: { label: 'Group' }, y: { label: 'Activity', min: 0, max: 100, step: 20 }, categories: ['Control', 'Drug'], series: [{ name: 'WT', values: [40, 80], errors: [5, 5] }, { name: 'KO', values: [20, 30] }] };
const bars = vm.runInContext("figureHtml(bar, { bars: [['Drug', 'WT']] })", ctx);
assert.equal((bars.match(/ch-hlbar/g) || []).length, 1); assert.match(bars, /class="ch-err"/); assert.match(bars, />80<\/text>/);
ctx.evilFig = { type: 'line', caption: '<script>', x: { label: '<img>', min: 0, max: 1, step: 1 }, y: { label: 'y', min: 0, max: 1, step: 1 }, series: [{ name: '<b onload=x>', marker: 'star', line: 'none', points: [[0, 0], [1, 1]] }] };
assert.doesNotMatch(vm.runInContext('figureHtml(evilFig)', ctx), /<script|<img|<b /, 'chart text is escaped');
assert.equal(vm.runInContext("figureHtml({ type: 'line' })", ctx), '', 'malformed chart renders nothing');
// Teaching annotations: highlighted axis, shaded regions, callout labels and measuring arrows draw on the graph.
vm.runInContext(extract('chartAnnotations'), ctx);
const ann = vm.runInContext("figureHtml(fig, { axis: 'y', shade: [{ x1: 6, x2: 7, text: 'reactants' }], labels: [{ series: 'A', x: 7.5, text: 'peak' }, { series: 'A', x: 9, text: 'missing' }], spans: [{ x: 7.5, from: 0, to: 2, text: 'Ea' }, { x: 8, from: 0, to: 1, text: 'drop', side: 'left' }] })", ctx);
assert.match(ann, /class="ch-axis-hl"/); assert.match(ann, /class="ch-shade"/); assert.match(ann, />reactants</);
assert.match(ann, />peak</); assert.doesNotMatch(ann, />missing</, 'labels only on plotted points');
assert.equal((ann.match(/class="ch-span"/g) || []).length, 2); assert.match(ann, /text-anchor="end">drop</);
assert.doesNotMatch(vm.runInContext("figureHtml(fig, { labels: [{ series: 'A', x: 7, text: '<img src=x>' }] })", ctx), /<img/, 'annotation text escaped');
assert.match(box, /<strong>q = m × L<\/strong>/, 'bold markdown is formatted');
// Escaping: authored text cannot inject markup.
ctx.evil = { how: { ask: '<img src=x>', know: '<script>', steps: ['<i>'], trap: '"x"' } };
const evil = vm.runInContext('howBox(evil)', ctx);
assert.doesNotMatch(evil, /<img|<script|<i>/); assert.match(evil, /&lt;img src=x&gt;/);
// Variants and reversed forms never show the original card's method.
ctx.v1 = { ...card, variant: 'authored' }; ctx.v2 = { ...card, baseId: card.id || 'x' };
assert.equal(vm.runInContext('howBox(v1) + howBox(v2)', ctx), '');
assert.equal(vm.runInContext('hintArea({q:v2})', ctx), '');
// Cards without a method render nothing.
assert.equal(vm.runInContext('howBox({}) + howBox(null)', ctx), '');

// Structure rendering: drawings become escaped data-URI images; structure choices hide their names until answered.
ctx.STRUCT_SVG = { tyr: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>' }; ctx.LETTERS = ['A', 'B', 'C', 'D']; ctx.encodeURIComponent = encodeURIComponent;
for (const name of ['structUrl', 'structImg', 'stemFigs', 'structChoice']) vm.runInContext(extract(name), ctx);
const img = vm.runInContext("structImg('tyr', 'x\"y')", ctx);
assert.match(img, /^<img class="struct-img" src="data:image\/svg\+xml;charset=utf-8,%3Csvg/); assert(img.includes('alt="x&quot;y"'));
assert.equal(vm.runInContext("structImg('missing') + structImg(null) + stemFigs({}) + stemFigs({fig:'missing'})", ctx), '');
assert.equal((vm.runInContext("stemFigs({fig:['tyr','tyr']})", ctx).match(/<figcaption>/g) || []).length, 2, 'two numbered structures');
assert(fs.readFileSync(root + '/css/styles.css', 'utf8').includes('.struct-name{display:none') && fs.readFileSync(root + '/css/styles.css', 'utf8').includes('.choice-btn:disabled .struct-name{display:block}'), 'names hidden until answered');

// Wiring: the hint action is allowlisted, the quiz shows the method after answering, and a hinted
// answer starts as Unsure; the session's missed list includes the method.
assert(fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'showHint'"));
// Recall cards play the walkthrough after an answer; Practice Test flashcards open their lesson instead (isLessonCard).
assert(source.includes(": howBox(view.q, { ctx: { mode: 'recall', view, prefix: 'cb', figure: view.q.chart || null } }));") && source.includes("lessonBox(view.q, { mode: 'recall', view, prefix: 'cb', figure: view.q.chart || null })") && source.includes("howBox(view.q, { ctx: { mode: 'passage', passage: pq.p.passage, figure: pq.p.figure, view, prefix: 'pc' } })"), 'player in recall and passage feedback');
assert(fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'howStep'"));
assert(source.includes("if (view.hint) quiz.pending.conf = 'unsure';"));
assert(source.includes('how: howBox(r.view.q, { static: true })'));
// AAMC lists numeric choices in order: a set of numbers in one unit is shown lowest to highest, never shuffled; others shuffle.
{ const src = source.replace(/\r\n/g, '\n'); // CRLF-safe (Windows checkouts)
  const [, order] = new Function(src.slice(src.indexOf('function shuffled'), src.indexOf('\n}\n', src.indexOf('function choiceOrder')) + 3) + ';return [choiceNumber, choiceOrder]')();
  const show = c => order(c).map(i => c[i]);
  assert.deepEqual(show(["10,000 Cal", "1 Cal", "100 Cal", "10 Cal"]), ["1 Cal", "10 Cal", "100 Cal", "10,000 Cal"]);
  assert.deepEqual(show(["30 μM", "3.0 μM", "300 μM", "3.0 mM"]), ["3.0 μM", "30 μM", "300 μM", "3.0 mM"]);
  assert.deepEqual(show(["1/8", "3/8", "7/8", "2/3"]), ["1/8", "3/8", "2/3", "7/8"]);
  assert.deepEqual(show(["10⁻⁸ W/m²", "10⁸ W/m²", "10⁻⁴ W/m²", "10⁻¹⁰ W/m²"]), ["10⁻¹⁰ W/m²", "10⁻⁸ W/m²", "10⁻⁴ W/m²", "10⁸ W/m²"]);
  assert.deepEqual(show(['1.2 × 10²⁰ Hz', '1.2 × 10¹⁷ Hz', '8.1 × 10⁻²¹ Hz', '5.4 × 10⁻⁴⁷ Hz']), ['5.4 × 10⁻⁴⁷ Hz', '8.1 × 10⁻²¹ Hz', '1.2 × 10¹⁷ Hz', '1.2 × 10²⁰ Hz']);
  assert.deepEqual(show(['−2', '−1', '0', '+1']), ['−2', '−1', '0', '+1']);
  assert.deepEqual(show(['2.80 mg', '3.50 mg', '4.00 mg', '1.40 mg']), ['1.40 mg', '2.80 mg', '3.50 mg', '4.00 mg']);
  assert.equal(order(['Line A', 'Line B', 'Line C', 'Line D']).length, 4, 'labels are shuffled, not sorted');
  assert(source.includes('const order = choiceOrder(q.choices);') && source.includes('curQuestions().map(q => choiceOrder(q.choices))'), 'cards and exams use the ordered choices'); }
console.log(`Worked methods passed: all ${FL.length} Full-Length Prep cards are in exam form with stable ids; walkthroughs use ${Object.keys(STRUCT).length} script-free RDKit drawings (generator in sync); all have what-it's-asking, what-to-know, steps and trap; two-stage hints hide steps and trap before answering; full method after answering and in the missed list; escaped; never on reworded forms.`);
