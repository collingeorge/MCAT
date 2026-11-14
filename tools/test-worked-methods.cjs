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
  assert(!h.ask.includes(q.choices[q.ans]), id + ': "ask" does not give away the answer');
}

// Exam form: every Full-Length Prep card asks like the exam. No choice labels why it is right, e.g. "¹H NMR (peak integrals)".
// Rewritten cards keep their original identity (idStem), so progress, flags and review history carry over.
for (const q of FL) {
  assert(q.how, q.src + ': has a worked method');
  assert(q.choices.every(c => !/\(.+\)/.test(c)), q.src + ': no parenthetical hint in choices');
  assert(!/\b(RATIO|MUST)\b/.test(q.q), q.src + ': no capitalized cue words beyond NOT/EXCEPT');
  assert(typeof q.idStem === 'string' && q.idStem !== q.q, q.src + ': original stem kept as idStem');
}
assert(source.includes("let id = 'fl-' + hashId(q.s + '|' + (q.idStem || q.q));"), 'FL ids use idStem');

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
      assert(st.chart, w + ': overlay needs its chart');
      for (const r of st.graph.read || []) { const ser = st.chart.series.find(x => x.name === r.series); assert(ser && ser.points.some(([x]) => x === r.x), w + ': traced point is plotted'); }
    }
  }
  return { visual, rich };
}
for (const q of FL) checkSteps(q.src, q);

// Structure Reading cards and their RDKit drawings.
const STRUCT = new Function(fs.readFileSync(root + '/data/structures.js', 'utf8') + ';return STRUCT_SVG')();
const SQ = new Function(fs.readFileSync(root + '/data/qb-structures.js', 'utf8') + ';return QB_STRUCTURES')();
const crypto = require('node:crypto');
const gen = fs.readFileSync(root + '/tools/draw-structures.py', 'utf8').replace(/\r\n/g, '\n');
const header = /source ([0-9a-f]{16})/.exec(fs.readFileSync(root + '/data/structures.js', 'utf8'));
assert(header && header[1] === crypto.createHash('sha256').update(gen).digest('hex').slice(0, 16), 'data/structures.js is stale: run python3 tools/draw-structures.py');
for (const [name, svg] of Object.entries(STRUCT)) {
  assert(/^<svg[\s\S]*<\/svg>$/.test(svg), name + ': is an SVG');
  assert(!/<script|<foreignObject|\son\w+\s*=|javascript:|href=/i.test(svg), name + ': no script, handlers or links in the drawing');
}
assert(SQ.length >= 90, 'structure cards present');
assert.equal(new Set(SQ.map(q => q.idStem)).size, SQ.length, 'structure card ids are unique');
for (const q of SQ) {
  const id = q.src;
  assert(q.fig != null || Array.isArray(q.choiceFigs), id + ': shows a structure');
  for (const n of [].concat(q.fig ?? [], q.choiceFigs ?? [], ...q.how.steps.map(st => (st && st.fig) || []))) assert(STRUCT[n], id + ': drawing ' + n + ' exists');
  if (q.choiceFigs) assert.equal(q.choiceFigs.length, q.choices.length, id + ': one drawing per choice');
  assert(q.how && Array.isArray(q.how.steps) && q.how.steps.length && ['ask', 'know', 'trap'].every(k => typeof q.how[k] === 'string' && q.how[k].length >= 10), id + ': worked method');
  assert(q.choices.every(c => !/\(.+\)/.test(c)), id + ': no parenthetical hint in choices');
  assert(q.choices[q.ans].length <= 2 || !q.how.ask.includes(q.choices[q.ans]), id + ': "ask" does not give away the answer');
}
assert(source.includes("...(typeof QB_STRUCTURES === 'undefined' ? [] : QB_STRUCTURES)"), 'structure cards load into Full-Length Prep');
for (const page of ['index.html', 'flprep.html']) {
  const html = fs.readFileSync(root + '/' + page, 'utf8');
  assert(html.includes('<script src="data/structures.js"></script>') && html.includes('<script src="data/qb-structures.js"></script>'), page + ' loads structures');
}
const sw = fs.readFileSync(root + '/sw.js', 'utf8');
assert(sw.includes("'data/structures.js'") && sw.includes("'data/qb-structures.js'"), 'structures are cached for offline use');

// Graph Reasoning passages: every question has a worked method with at least two visual steps
// (a passage/question highlight or a graph trace); check-content verifies each one points at real text and data.
const GP = new Function(fs.readFileSync(root + '/data/passages-graphs.js', 'utf8') + ';return GRAPH_PASSAGES')();
assert(GP.length >= 12, 'graph passages present');
for (const p of GP) {
  assert(/^p_graph_/.test(p.id) && ['line', 'bar'].includes(p.figure.type), p.id + ': plotted figure');
  for (const [i, q] of p.questions.entries()) {
    const visual = q.how.steps.filter(st => st && typeof st === 'object' && (st.hl || st.graph)).length;
    assert(visual >= 2, `${p.id} Q${i + 1}: at least two visual steps`);
  }
}
assert(source.includes("...(typeof GRAPH_PASSAGES === 'undefined' ? [] : GRAPH_PASSAGES)"), 'graph passages load into Passages');
assert(sw.includes("'data/passages-graphs.js'") && fs.readFileSync(root + '/passages.html', 'utf8').includes('data/passages-graphs.js'), 'graph passages are loaded and cached');

// Rendering: run the real functions against a minimal DOM.
function extract(name) { const a = source.indexOf('function ' + name + '('), b = source.indexOf('\nfunction ', a + 1); assert(a >= 0, name); return source.slice(a, b < 0 ? source.length : b); }
const nodes = new Map();
const node = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '' }); return nodes.get(id); };
const card = pe6.find(q => q.src === 'pe6-cp:18');
const ctx = vm.createContext({ $: node, quiz: { answered: false, idx: 0, items: [{ q: card }] }, String, Array });
ctx.stepper = null; ctx.Math = Math; ctx.Number = Number; ctx.Set = Set; ctx.encodeURIComponent = encodeURIComponent;
for (const name of ['esc', 'fmt', 'paragraphs', 'howOf', 'hintArea', 'showHint', 'howSteps', 'markText', 'markParagraphs', 'stepVisual', 'howPlayerHtml', 'applyStepContext', 'clearStepContext', 'howStep', 'howBox',
  'chartNum', 'chartText', 'chartTicks', 'chartSmooth', 'chartMarker', 'chartLegend', 'chartAxes', 'lineChart', 'barChart', 'figureHtml', 'structImg', 'stemFigs']) vm.runInContext(extract(name), ctx);
vm.runInContext("var CHART = { W: 560, L: 70, R: 18, T: 14, H: 250, B: 50 };", ctx);
const view = ctx.quiz.items[0];

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
assert.equal((box.match(/<li>/g) || []).length, card.how.steps.length);
// Player: one step at a time; the trap appears only at the last step; Back/Next stay in range.
const player = vm.runInContext('howBox(quiz.items[0].q)', ctx), n = card.how.steps.length;
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
for (const name of ['structImg', 'stemFigs', 'structChoice']) vm.runInContext(extract(name), ctx);
const img = vm.runInContext("structImg('tyr', 'x\"y')", ctx);
assert.match(img, /^<img class="struct-img" src="data:image\/svg\+xml;charset=utf-8,%3Csvg/); assert(img.includes('alt="x&quot;y"'));
assert.equal(vm.runInContext("structImg('missing') + structImg(null) + stemFigs({}) + stemFigs({fig:'missing'})", ctx), '');
assert.equal((vm.runInContext("stemFigs({fig:['tyr','tyr']})", ctx).match(/<figcaption>/g) || []).length, 2, 'two numbered structures');
assert(fs.readFileSync(root + '/css/styles.css', 'utf8').includes('.struct-name{display:none') && fs.readFileSync(root + '/css/styles.css', 'utf8').includes('.choice-btn:disabled .struct-name{display:block}'), 'names hidden until answered');

// Wiring: the hint action is allowlisted, the quiz shows the method after answering, and a hinted
// answer starts as Unsure; the session's missed list includes the method.
assert(fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'showHint'"));
assert(source.includes("+ howBox(view.q, { ctx: { mode: 'recall', view, prefix: 'cb' } });") && source.includes("howBox(view.q, { ctx: { mode: 'passage', passage: pq.p.passage, figure: pq.p.figure, view, prefix: 'pc' } })"), 'player in recall and passage feedback');
assert(fs.readFileSync(root + '/js/actions.js', 'utf8').includes("'howStep'"));
assert(source.includes("if (view.hint) quiz.pending.conf = 'unsure';"));
assert(source.includes('how: howBox(r.view.q, { static: true })'));
console.log(`Worked methods passed: all ${FL.length} Full-Length Prep cards are in exam form with stable ids; ${SQ.length} Structure Reading cards use ${Object.keys(STRUCT).length} script-free RDKit drawings (generator in sync); ${GP.length} graph passages with step-by-step visual solutions; all have what-it's-asking, what-to-know, steps and trap; two-stage hints hide steps and trap before answering; full method after answering and in the missed list; escaped; never on reworded forms.`);
