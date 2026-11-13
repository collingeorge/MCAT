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
  assert(Array.isArray(h.steps) && h.steps.length >= 1 && h.steps.every(s => typeof s === 'string' && s.trim()), id + ': steps');
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
  for (const n of [].concat(q.fig ?? [], q.choiceFigs ?? [])) assert(STRUCT[n], id + ': drawing ' + n + ' exists');
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

// Rendering: run the real functions against a minimal DOM.
function extract(name) { const a = source.indexOf('function ' + name + '('), b = source.indexOf('\nfunction ', a + 1); assert(a >= 0, name); return source.slice(a, b < 0 ? source.length : b); }
const nodes = new Map();
const node = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '' }); return nodes.get(id); };
const card = pe6.find(q => q.src === 'pe6-cp:18');
const ctx = vm.createContext({ $: node, quiz: { answered: false, idx: 0, items: [{ q: card }] }, String, Array });
for (const name of ['esc', 'fmt', 'paragraphs', 'howOf', 'hintArea', 'showHint', 'howBox']) vm.runInContext(extract(name), ctx);
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

const box = vm.runInContext('howBox(quiz.items[0].q)', ctx);
assert.match(box, /How to work it out/); assert.match(box, /<ol class="how-steps">/); assert.match(box, /The trap/);
assert.equal((box.match(/<li>/g) || []).length, card.how.steps.length);
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
assert(source.includes('+ howBox(view.q);'));
assert(source.includes("if (view.hint) quiz.pending.conf = 'unsure';"));
assert(source.includes('how: howBox(r.view.q)'));
console.log(`Worked methods passed: all ${FL.length} Full-Length Prep cards are in exam form with stable ids; ${SQ.length} Structure Reading cards use ${Object.keys(STRUCT).length} script-free RDKit drawings (generator in sync); all have what-it's-asking, what-to-know, steps and trap; two-stage hints hide steps and trap before answering; full method after answering and in the missed list; escaped; never on reworded forms.`);
