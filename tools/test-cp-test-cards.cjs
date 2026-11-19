// C/P Practice Test flashcards (data/cp-test-cards.js) and TODAY's C/P steps without the QBank.
//   1 Coverage: every card's `from` resolves to a Practice Exam 1/3/4/5/6 C/P card (pe1-cp … pe6-cp in
//     data/qb-aamc-fl.js) and carries a source's spec labels. The deck is a study budget: at most 250 cards, one card
//     per method, a card listing in `from` every spec item (and question) it prepares for, across the exams. Every
//     question of each exam that has cards maps to at least one card, and every item of a Partial question (a fact
//     its Practice Exam card doesn't teach) has a card; once all five exams are in, each category is within ±2 of its
//     share of the 250 (DECK_TARGET). Each card has a valid `how` (ask, know,
//     steps, trap; every `hl` and `strike` is an exact substring of the card's own stem or choices, and no step
//     strikes the key) and `teach` (every mark is in the stem; the last step starts "Rule to reuse:").
//   2 Style, AAMC stand-alone: stems median 15–25 words (each 7–45); choices median ≤ 3 words and 90% ≤ 9; the key is
//     never the single longest choice (characters or words); no position words ("the second choice").
//   3 Originality against each source card: no shared answer choice (or paraphrase), no shared data number in the
//     stem or choices (chemical locants such as 2- or 1,2- are names, not data), no shared 6-word run with its stem.
//   4 No QBank in TODAY: over 200 simulated days (each with missed-question twins on a Practice Exam, a Sample Test and
//     a QBank card), the flashcard step holds only Practice Test flashcards and the guided step only Practice Exam
//     1/3/4/5/6 cards; the missed Practice Exam twin and the flashcards built from it lead their steps, and the Sample
//     Test and QBank twins are skipped. The QBank files are byte-identical to main; in qb-aamc-fl.js only the 17 approved rewrites changed.
// Run with --table to print the coverage table (each Practice Exam question → its flashcards) and the per-category
// counts against the 50-card daily split.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { numsOf, norm, grams, paraphrase, BLOCKLIST } = require('./twin-checks.cjs');
const SPEC = require('./cp-test-specs.cjs').load();
const root = __dirname + '/..';
const TABLE = process.argv.includes('--table');

const data = vm.createContext({});
// CPT_FILE=<path>: check another file of cards (a writer's batch) for parts 1–3 only; part 4 runs on the app's deck.
const CPT_FILE = process.env.CPT_FILE || root + '/data/cp-test-cards.js';
// CPT_FL_FILE=<path>: a writer's working copy of qb-aamc-fl.js (Rule out 2 batches).
for (const f of [process.env.CPT_FL_FILE || root + '/data/qb-aamc-fl.js', CPT_FILE]) vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^const /mg, 'var '), data, { filename: f });
vm.runInContext(fs.readFileSync(root + '/data/qb-aamc-phys.js', 'utf8').replace(/^const /mg, 'var '), data, { filename: 'qb-aamc-phys.js' });
const FL = data.QB_AAMC_FL, CARDS = data.CP_TEST_CARDS;
const PE_RE = /^pe[13456]-cp:\d+$/;
const PE = new Map(FL.filter(q => PE_RE.test(q.src)).map(q => [q.src, q]));
assert.equal(PE.size, 295, 'Practice Exams 1, 3, 4, 5 and 6: 59 C/P questions each');
// The specs (docs/cp-test-specs/PE*-spec.md, read by tools/cp-test-specs.cjs): every one of the 295 questions, with its
// labels and its "Needs" items.
assert.equal(SPEC.questions.length, 295, 'the specs cover all 295 questions');
for (const q of SPEC.questions) { assert(PE.has(q.src), q.src + ': spec question has a Practice Exam card'); assert(q.items.length >= 1, q.src + ': spec lists what it needs'); }
const ITEMS = new Map(SPEC.items.map(it => [it.ref, it]));
// Same ask, same setup (the user's standing rule): every card names in `twinOf` the question(s) whose ask it practices
// the way the MCAT asks it: the same kind of stem and choices, and, for a passage question, a short twin passage
// (`passage`, 3–6 sentences) giving the same kind of clues; a stand-alone question gets a stand-alone card. Every
// Practice Exam question (295) and every daily-quiz question's twin (data/cp-pool.js: the 30 Sample Test questions and
// 1 QBank pack question that no Practice Exam card covers) is some card's twin. Passage or stand-alone comes from
// tools/twin-clusters.json (AAMC question numbers only).
const CLUSTERS = require('./twin-clusters.json').exams;
const isPassageQ = src => { const [e, n] = String(src).split(':'); return !!(CLUSTERS[e] && CLUSTERS[e].passages.some(([a, b]) => +n >= a && +n <= b)); };
const POOL = (() => { const c = vm.createContext({}); vm.runInContext(fs.readFileSync(root + '/data/cp-pool.js', 'utf8').replace(/^const /mg, 'var '), c); return c.CP_POOL; })();
const QUIZ_TWINS = [...new Set(POOL.flatMap(h => [...h.passages.flatMap(p => p.questions), ...h.standalones]).map(q => q.twin))];
// The source card of each twin: a Practice Exam or Sample Test card (qb-aamc-fl.js) or the QBank pack card.
const SRC = new Map([...FL.map(q => [q.src, q]), ...data.QB_AAMC_PHYS.filter(q => QUIZ_TWINS.includes(q.src)).map(q => [q.src, q])]);
const QUIZ_EXTRA = QUIZ_TWINS.filter(t => !PE_RE.test(t));
assert(QUIZ_EXTRA.every(t => SRC.has(t)), 'every quiz twin has its source card');
// The AAMC passage a question belongs to (its range in twin-clusters.json): "pe1-cp:P3" for Practice Exam 1's third.
const passageOf = src => { const [e, n] = String(src).split(':'); const i = CLUSTERS[e] ? CLUSTERS[e].passages.findIndex(([a, b]) => +n >= a && +n <= b) : -1; return i < 0 ? null : e + ':P' + (i + 1); };
const sentences = t => String(t).replace(/\b(e\.g|i\.e|vs|approx|ca)\./g, '$1').split(/(?<=[.!?])\s+(?=[A-Z(\d])/).filter(x => x.trim()).length;
// The questions written so far: every question any card comes from. Each of them must have a card for every one of
// its "Needs" items; once all 295 are written, every spec item must have a card.
// The exams written so far: every exam any card comes from; all 59 of each one's questions must map to a card.
// 250 cards for the Practice Exams, plus the cards that twin the daily quiz's Sample Test and QBank-pack questions.
// One card per method (core methods may keep a passage and a discrete card); the user allowed 255 (2026-11-19): three
// categories (4A, 5C, 5B) can't reach target without merging different methods.
const DECK_MAX = 255;
const METHOD_FREQ = Object.fromEntries(require('./method-freq.json').methods.map(m => [m.name, m.freq]));
// The user's per-category targets for the 250-card deck (2026-11-19).
const DECK_TARGET = { '5D': 59, '5E': 40, '4E': 31, '5A': 23, '4D': 21, '4C': 19, '4B': 19, '5B': 16, '4A': 12, '5C': 10 };
// Over target where only merging different methods would get there (the user allowed 255).
const DECK_OVER = { '4A': 2, '5C': 2, '5B': 1 };
assert.equal(Object.values(DECK_TARGET).reduce((a, b) => a + b, 0), 250, 'the category targets add up to the 250-card Practice Exam budget');
assert(CARDS.length <= DECK_MAX, `the deck is ${CARDS.length} cards; the budget is ${DECK_MAX}`);
const EXAMS_WRITTEN = [...new Set(CARDS.flatMap(c => (Array.isArray(c.from) ? c.from : []).map(r => String(r).split('-')[0])))];
// A writer's batch (CPT_FILE) covers some of an exam's questions: only those are checked for coverage.
const BUILT = process.env.CPT_FILE ? [...new Set(CARDS.flatMap(c => (c.from || []).map(r => String(r).split('#')[0])))].filter(s => PE.has(s))
  : [...PE.keys()].filter(s => EXAMS_WRITTEN.includes(s.split('-')[0]));
const ALL_BUILT = BUILT.length === PE.size;

// ── 1. Coverage and worked methods ──
const strip = t => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\*\*/g, '');
const words = t => strip(t).trim().split(/\s+/).filter(Boolean).length;
const SHARED = new Map();
const ids = new Set(), stems = new Map(), bySrc = new Map([...PE.keys()].map(s => [s, []])), byItem = new Map(SPEC.items.map(it => [it.ref, []]));
// Rule out 3 (flashcards and guided cards): exactly three entries {c, tag, why}, one per wrong choice, never the key;
// tag is one of the six checks and the entries run in check order; each why ≤ 160 characters; a rule ≤ 200
// characters; no elimThen. No give-away: no why and no rule contains the correct choice's text, or (for a numeric
// choice) its number (whole numbers 0–10 aside; a power of ten such as 10³ is read as 10^3, not 103).
const ELIM_TAGS = ['impossible', 'units', 'backwards', 'skipped', 'copied', 'fact'];
const GIVE_SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
const giveNorm = t => String(t).replace(/<[^>]+>|\*\*/g, '').replace(/10([⁻⁺]?[⁰¹²³⁴-⁹]+)/g, (m, e) => '10^(' + e + ')').replace(/[₀-₉⁰¹²³⁴-⁹⁺⁻]/g, ch => GIVE_SUB[ch] || ch).toLowerCase().replace(/\s+/g, ' ').replace(/[.;:,]+$/, '').trim();
const giveNums = t => (giveNorm(t).replace(/(\d),(\d{3})/g, '$1$2').match(/\d+(?:\.\d+)?/g) || []).map(Number).filter(n => !(Number.isInteger(n) && n <= 10));
function giveAway(key, text) {
  const k = giveNorm(key), t = giveNorm(text);
  if (k.length >= 3) { const at = t.indexOf(k); if (at >= 0 && !/[a-z0-9]/.test(t[at - 1] || '') && !/[a-z0-9]/.test(t[at + k.length] || '')) return 'its text'; }
  else if (new RegExp('(^|[^A-Za-z0-9])' + String(key).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^A-Za-z0-9]|$)').test(String(text))) return 'its text';
  const kn = giveNums(key), tn = new Set(giveNums(text));
  const hit = kn.find(n => tn.has(n));
  return hit != null ? 'its number ' + hit : null;
}
// ⚡ Shortcut: one of six kinds, the fastest repeatable route (it may lead to the answer). CPT_FAST_PENDING=1 (a
// writer's working copy only) skips cards that don't have one yet.
const FAST_KINDS = ['units', 'rearrange', 'round', 'scale', 'edge', 'anchor'];
function checkFast(q, id) {
  if (process.env.CPT_FAST_PENDING && q.fast === undefined) return;
  assert(q.fast && FAST_KINDS.includes(q.fast.kind), id + ': a shortcut of one of the six kinds');
  assert(typeof q.fast.how === 'string' && q.fast.how.trim() && q.fast.how.length <= 240, id + ': the shortcut is short (≤ 240 characters): ' + ((q.fast && q.fast.how) || '').length);
}
// ✂ Rule out: cut = [{r: 1–6, c} | {f: fact, c}]: each r one of the six glance rules, or one fact you know; each
// choice cut at most once, the key never, at most three cut; the old elim / rule / elimThen fields are gone.
function checkElim3(q, id) {
  checkFast(q, id);
  assert(Array.isArray(q.cut), id + ': a cut list (may be empty)');
  const seen = new Set();
  for (const e of q.cut) {
    // A glance rule (r 1–6) or "one fact you know" (f: a plain fact of 6 words or fewer that never names the key).
    assert(e && ((Number.isInteger(e.r) && e.r >= 1 && e.r <= 6 && e.f === undefined) || (e.r === undefined && typeof e.f === 'string' && e.f.trim() && e.f.trim().split(/\s+/).length <= 6)), id + ': a cut is a glance rule (1–6) or a fact of 6 words or fewer: ' + JSON.stringify(e));
    if (e.f !== undefined) { const g = giveAway(q.choices[q.ans], e.f); assert(!g, id + ': the fact "' + e.f + '" gives the key away (' + g + ')'); }
    assert(Array.isArray(e.c) && e.c.length, id + ': each cut names choices');
    for (const c of e.c) {
      assert(Number.isInteger(c) && c >= 0 && c < q.choices.length, id + ': cut index ' + c);
      assert.notEqual(c, q.ans, id + ': a cut never includes the key');
      assert(!seen.has(c), id + ': a choice is cut at most once'); seen.add(c);
    }
  }
  assert(seen.size <= 3, id + ': at most three cuts');
  for (const f of ['elim', 'rule', 'elimThen']) assert.equal(q[f], undefined, id + ': no ' + f + ' (replaced by cut)');
}
for (const c of CARDS) {
  const id = c.id;
  assert(typeof id === 'string' && /^cpt-pe[13456]-\d{2}[a-z]$/.test(id), 'id format (Practice Exam cards only, no cpt-st-*): ' + id);
  // What the MCAT tests most gets repeated: method (the reusable move), freq (exams whose questions use it, 1–5) and
  // tier (core ≥ 3, common 2, rare 1), from tools/method-freq.json.
  assert(typeof c.method === 'string' && METHOD_FREQ[c.method] === c.freq && c.tier === (c.freq >= 3 ? 'core' : c.freq === 2 ? 'common' : 'rare'), id + ': method, freq and tier from tools/method-freq.json (' + c.method + ', ' + c.freq + ', ' + c.tier + ')');
  const st = /^cpt-st-/.test(id);
  assert(!ids.has(id), 'unique id: ' + id); ids.add(id);
  assert(typeof c.s === 'string' && c.s.trim(), id + ': topic tag s');
  assert(Array.isArray(c.from) && (c.from.length >= 1 || st) && new Set(c.from).size === c.from.length, id + ': from is a list of distinct sources');
  // Same ask, same setup: twinOf names the question(s) it mirrors; a passage question's card has a 3–6 sentence passage.
  assert(Array.isArray(c.twinOf) && c.twinOf.length >= 1 && c.twinOf.every(t => SRC.has(t) && (PE_RE.test(t) || QUIZ_EXTRA.includes(t))), id + ': twinOf names Practice Exam or quiz-twin questions');
  // The setup follows the card's own question (twinOf[0]); twins merged into it (same method) are covered, not mirrored.
  for (const t of c.twinOf.slice(0, 1)) assert.equal(!!c.passage, isPassageQ(t), id + ': ' + t + ' is a ' + (isPassageQ(t) ? 'passage' : 'stand-alone') + ' question, so the card ' + (isPassageQ(t) ? 'has' : 'has no') + ' passage');
  // Teach for the passage: the cards whose twins sit in one AAMC passage share one twin passage (`pid` names that AAMC
  // passage; the same text on each), which combines that passage's topics; the lesson's first step points at the
  // sentence that holds the clue (its hl is in the passage).
  if (c.passage !== undefined) {
    const n = sentences(c.passage); assert(typeof c.passage === 'string' && n >= 3 && n <= 10 && c.passage.length <= 1500, id + ': passage is 3–10 sentences, ≤ 1500 characters (' + n + ', ' + String(c.passage).length + ')');
    {
    assert.equal(passageOf(c.twinOf[0]), c.pid, id + ': pid "' + c.pid + '" is the AAMC passage of its own question ' + c.twinOf[0]);
    const p = SHARED.get(c.pid); if (p === undefined) SHARED.set(c.pid, c.passage); else assert.equal(c.passage, p, id + ': the cards of ' + c.pid + ' share one twin passage');
    const s0 = c.how && c.how.steps && c.how.steps[0];
    assert(s0 && typeof s0.hl === 'string' && c.passage.includes(s0.hl) && /sentence/i.test(s0.text), id + ': the lesson\'s first step names the passage sentence that holds the clue (text says "sentence", hl is in the passage)');
    }
  } else assert.equal(c.pid, undefined, id + ': a stand-alone card has no pid');
  // Each source names a spec item, "peX-cp:Q#n": the card teaches item n of that question's "Needs" list.
  for (const ref of c.from) {
    assert(ITEMS.has(ref), id + ': from "' + ref + '" is an item of a spec question (peX-cp:Q#n)');
    const s = ref.split('#')[0];
    if (!bySrc.get(s).includes(id)) bySrc.get(s).push(id);
    byItem.get(ref).push(id);
  }
  // Labels from the spec line: category, discipline and skill.
  if (c.from.length) assert(c.from.some(ref => { const q = SPEC.bySrc.get(ref.split('#')[0]); return q.aamc === c.aamc && q.disc === c.disc && q.skill === c.skill; }), id + ': aamc, disc and skill come from a source question\'s spec line');
  else assert(DECK_TARGET[c.aamc] && typeof c.disc === 'string' && /^SIRS [1-4]$/.test(c.skill), id + ': labels');
  assert(typeof c.q === 'string' && c.q.trim() && Array.isArray(c.choices) && c.choices.length === 4, id + ': stem and 4 choices');
  assert.equal(new Set(c.choices.map(norm)).size, 4, id + ': distinct choices');
  assert(Number.isInteger(c.ans) && c.ans >= 0 && c.ans < 4, id + ': ans');
  assert(typeof c.exp === 'string' && c.exp.length >= 40, id + ': explanation');
  const k = norm(c.q); assert(!stems.has(k), id + ': duplicate stem of ' + stems.get(k)); stems.set(k, id);
  const inCard = t => typeof t === 'string' && t.length > 0 && (c.q.includes(t) || (c.passage || '').includes(t) || c.choices.some(ch => ch.includes(t)));
  const key = c.choices[c.ans];
  const h = c.how;
  assert(h && typeof h === 'object', id + ': how');
  assert.deepEqual(Object.keys(h).sort(), ['ask', 'know', 'steps', 'trap'], id + ': how has ask, know, steps, trap');
  for (const f of ['ask', 'know', 'trap']) assert(typeof h[f] === 'string' && h[f].trim(), id + ': how.' + f);
  assert(key.length <= 3 || !h.ask.includes(key), id + ': how.ask does not give away the key');
  assert(Array.isArray(h.steps) && h.steps.length >= 2, id + ': at least 2 steps');
  for (const [i, st] of h.steps.entries()) {
    assert(st && typeof st.text === 'string' && st.text.trim(), id + ': step ' + (i + 1) + ' text');
    if (st.hl !== undefined) assert(inCard(st.hl), id + ': step ' + (i + 1) + ' hl "' + st.hl + '" is in the stem or choices');
    if (st.strike !== undefined) {
      assert(Array.isArray(st.strike) && st.strike.length, id + ': step ' + (i + 1) + ' strike is a list');
      for (const x of st.strike) { assert(inCard(x), id + ': strike "' + x + '" is in the stem or choices'); assert.notEqual(x, key, id + ': the key is never struck'); }
    }
    if (st.calc !== undefined) assert(Array.isArray(st.calc) && st.calc.every(x => typeof x === 'string' && x.trim()), id + ': step ' + (i + 1) + ' calc');
  }
  // The lesson crosses out every wrong choice by the end (each strike names its reason in the step text).
  assert.equal(JSON.stringify([...new Set(h.steps.flatMap(st => st.strike || []))].sort()), JSON.stringify(c.choices.filter((_, i) => i !== c.ans).sort()), id + ': the lesson crosses out each wrong choice');
  assert(Array.isArray(c.teach) && c.teach.length >= 2, id + ': teach');
  for (const [i, st] of c.teach.entries()) {
    assert(st && typeof st.text === 'string' && st.text.trim(), id + ': teach ' + (i + 1) + ' text');
    for (const m of st.marks || []) assert(typeof m.t === 'string' && (c.q.includes(m.t) || (c.passage || '').includes(m.t)) && typeof m.note === 'string', id + ': teach mark "' + m.t + '" is in the stem or passage');
  }
  assert(/^\*\*Rule to reuse:\*\* \S/.test(c.teach.at(-1).text), id + ': the last teach step starts "Rule to reuse:"');
  // Rule out 3: every card names its three wrong choices, each with the check that kills it (one of the six, in check
  // order) and a one-line reason, plus a reusable 3-second rule; none of it names the correct choice (checkElim3).
  // CPT_ELIM_PENDING=1 (a writer's working copy only): cards still in the old format (no rule) are skipped.
  checkElim3(c, id);
}
const twinned = new Set(CARDS.flatMap(c => c.twinOf || []));
// A writer's batch covers its own exam(s): every question of each exam it twins.
const TWIN_NEED = process.env.CPT_FILE ? [...PE.keys(), ...QUIZ_EXTRA].filter(t => [...twinned].some(x => x.split(':')[0] === t.split(':')[0])) : [...PE.keys(), ...QUIZ_EXTRA];
assert.deepEqual(TWIN_NEED.filter(t => !twinned.has(t)), [], 'every Practice Exam question and quiz twin has a card with the same ask and setup');
const uncovered = BUILT.filter(s => !bySrc.get(s).length);
assert.deepEqual(uncovered, [], 'every Practice Exam question written so far has at least one flashcard');
// Every "Needs" item of the questions written so far has a card; the items of the questions not yet written are
// reported, not failed, until the deck is complete.
const partialMissing = SPEC.items.filter(it => BUILT.includes(it.src) && SPEC.bySrc.get(it.src).match === 'partial' && !byItem.get(it.ref).length).map(it => it.ref);
assert.deepEqual(partialMissing, [], 'every item of a Partial question (a fact its Practice Exam card does not teach) has a flashcard');
const missingItems = SPEC.items.filter(it => !byItem.get(it.ref).length);
const covered = [...bySrc.values()].filter(a => a.length).length;

// ── 2. Style ──
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(p * s.length) - 1)]; };
const POSITION = /\b(first|second|third|fourth|last|final|top|bottom) (choice|option|answer)s?\b|\b(choice|option)s?\s*\(?[A-D]\)?(?![\w-])/i;
const stemW = CARDS.filter(c => !c.passage).map(c => words(c.q)), choiceW = CARDS.flatMap(c => c.choices.map(words));
for (const c of CARDS) {
  const n = words(c.q); assert(n >= (c.passage ? 3 : 7) && n <= 45, c.id + ': stem ' + n + ' words (' + (c.passage ? 3 : 7) + '–45)');
  const ch = c.choices.map(x => strip(x).trim()), cl = ch.map(x => x.length), cw = c.choices.map(words);
  const oc = cl.filter((_, i) => i !== c.ans), ow = cw.filter((_, i) => i !== c.ans);
  assert(cl[c.ans] <= Math.max(...oc), c.id + ': the key is not the longest choice (characters)');
  assert(cw[c.ans] <= Math.max(...ow), c.id + ': the key is not the longest choice (words)');
  const texts = []; (function walk(v) { if (typeof v === 'string') texts.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })([c.q, c.choices, c.exp, c.how, c.teach]);
  for (const t of texts) assert(!POSITION.test(strip(t)), c.id + ': no position words: "' + (strip(t).match(POSITION) || [''])[0] + '"');
}
const sm = median(stemW), cm = median(choiceW), c90 = pct(choiceW, 0.9);
assert(!stemW.length || (sm >= 15 && sm <= 25), 'stand-alone stem median ' + sm + ' words (15–25; AAMC stand-alones ≈ 20)');
assert(cm <= 3, 'choice median ' + cm + ' words (≤ 3)'); assert(c90 <= 9, 'choice 90th percentile ' + c90 + ' words (≤ 9)');

// ── 3. Originality against each source card ──
const LOCANT = /\b\d+(?:,\d+)*-(?=[\p{L}(])|(?<=[\p{L})])-\d+(?:,\d+)*\b/gu;   // 2-bromo, 1,2-shift, pent-2-ene
// The base of a power of ten ("× 10⁻⁴", "10³") is notation, not a data number.
const dataNums = t => numsOf(strip(t).replace(LOCANT, ' ').replace(/(×\s*)?\b10(?=[⁻⁰¹²³⁴⁵⁶⁷⁸⁹])/g, ' '));
const KEY_SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };
const KEY_STOP = new Set('a an the of to in on at by for from with and or but so as is are was were be it its this that since because which than then into their they both each only'.split(' '));
const keyNorm = t => String(t).toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/g, ch => KEY_SUB[ch]).replace(/[^a-z0-9+\-. ]+/g, ' ').replace(/\s+/g, ' ').trim()
  .replace(/\bd2sp3\b/g, 'sp3d2').replace(/\bdsp3\b/g, 'sp3d').replace(/^(a|an|the) /, '').replace(/ (group|point|bond|bonding)s?$/, '');
const keyWords = t => keyNorm(t).split(' ').filter(w => w && !KEY_STOP.has(w));
const lessonText = c => { const h = c.how || {}; return [c.fast && c.fast.how, h.ask, h.know, h.trap, ...(h.steps || []).flatMap(st => [st.text, ...(st.calc || [])]), ...(c.teach || []).flatMap(t => [t.text, ...(t.calc || []), ...(t.marks || []).map(m => m.note)])].filter(Boolean).join(' \n '); };
// A merged card is checked against its own questions; the questions it took over in the merge (mergedSrcs: same
// method, other cards' questions) only for the key (below), never for wording it was not written from.
const ownSrcs = c => [...new Set([...c.from.map(r => r.split('#')[0]), ...(c.twinOf || [])])].filter(s => !(c.mergedSrcs || []).includes(s));
for (const c of CARDS) {
  assert(!c.mergedSrcs || (Array.isArray(c.mergedSrcs) && Array.isArray(c.mergedFrom) && c.mergedSrcs.every(s => c.twinOf.includes(s) || c.from.some(r => r.split('#')[0] === s))), c.id + ': mergedSrcs are among its from and twinOf');
  for (const s of c.mergedSrcs || []) { const src = SRC.get(s), ka = keyWords(c.choices[c.ans]), kb = keyWords(String(src.choices[src.ans]).split(/,(?!\d)|;| since | because | which /)[0]);
    const [sh, lo] = ka.length <= kb.length ? [ka, kb] : [kb, ka];
    assert(!(keyNorm(c.choices[c.ans]) === keyNorm(String(src.choices[src.ans]).split(/,(?!\d)|;| since | because | which /)[0]) || (sh.length && sh.length <= 3 && sh.every(w => lo.includes(w)))), c.id + ': key "' + c.choices[c.ans] + '" means the same as the key of merged question ' + s); }
}
// AAMC's own words (the user, 2026-11-19): a card uses the AAMC question's terms, stem phrasing and kinds of choices and
// changes only the content (molecule, numbers, system). Against each of its own source questions it may not copy the
// full stem or the full choice set, reuse a data number (constants and standard values are fine: twin-checks STANDARD),
// or have a key that means the real answer (below); its passage text stays original (no 6-word run with the source).
const { copiedStem, copiedChoices, dataOnly } = require('./twin-checks.cjs');
for (const c of CARDS) for (const s of ownSrcs(c)) {
  const src = SRC.get(s), srcNums = dataOnly(dataNums(src.q + ' ' + src.choices.join(' ')));
  const shared = [...dataOnly(dataNums((c.passage || '') + ' ' + c.q + ' ' + c.choices.join(' ')))].filter(n => srcNums.has(n));
  assert.deepEqual(shared, [], c.id + ': reuses no data number of ' + s + ' (constants and standard values aside)');
  assert(!copiedStem(c.q, src.q), c.id + ': does not copy the full stem of ' + s);
  assert(!copiedChoices(c.choices, src.choices), c.id + ': does not copy the full choice set of ' + s);
  if (c.passage) { const g = grams([src.q, ...src.choices, src.exp].join(' \n '), 6), r = [...grams(c.passage, 6)].find(x => g.has(x)); assert(!r, c.id + ': its passage shares the 6-word run "' + r + '" with ' + s + ' (passage text stays original)'); }
  // A numeric key ("0.50", "4.0 Hz"), not a locant in a name ("3-Methylpent-1-ene", "1,2-shift").
  const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  const keyNum = t => {
    const m = /^([−-]?\d+(?:\.\d+)?)(?:\s*×\s*10([⁻⁰-⁹]+)|([⁻⁰-⁹]+))?(?![\d,.]*[\p{L}-])/u.exec(strip(t).trim());
    if (!m) return null;
    const e = m[2] || m[3], exp = e ? Number([...e].map(ch => SUP[ch] || '').join('')) : 0;
    return m[3] ? Number(m[1]) ** exp : Number(m[1].replace('−', '-')) * 10 ** exp;
  };
  const kn = keyNum(c.choices[c.ans]), sn = keyNum(src.choices[src.ans]);
  assert(kn === null || sn === null || kn !== sn, c.id + ': its key number equals ' + s + "'s key number (" + kn + ')');
  // Compare keys by meaning, not just spelling: the card's key must not be the source card's correct choice once both
  // are normalized (subscripts/superscripts to digits; a leading a/an/the and a trailing group/point/bond/bonding dropped;
  // d²sp³ = sp³d², dsp³ = sp³d; the source key read up to its reason, i.e. before ", since …", "; …"), nor may the
  // shorter of the two (up to 3 content words) be contained in the longer ("a photon" ⊂ "A gamma photon").
  // CPT_KEYMEAN_ONLY=id,id (a fixer's working copy only): check just those cards.
  if (!process.env.CPT_KEYMEAN_ONLY || process.env.CPT_KEYMEAN_ONLY.split(',').includes(c.id)) { const ka = keyWords(c.choices[c.ans]), kb = keyWords(String(src.choices[src.ans]).split(/,(?!\d)|;| since | because | which /)[0]);
    const [sh, lo] = ka.length <= kb.length ? [ka, kb] : [kb, ka];
    assert(!(keyNorm(c.choices[c.ans]) === keyNorm(String(src.choices[src.ans]).split(/,(?!\d)|;| since | because | which /)[0]) || (sh.length && sh.length <= 3 && sh.every(w => lo.includes(w)))),
      c.id + ': key "' + c.choices[c.ans] + '" means the same as the key of ' + s); }
  const text = [c.q, ...c.choices, c.exp].join(' ');
  for (const [topic, re] of Object.entries(BLOCKLIST)) assert(!re.test(text), c.id + ': untaught topic ' + topic);
}
// A card practices the quiz question that twins the same source, never its answer: its key is not the quiz
// question's correct choice. (Shared stem wording is expected: the card asks the same thing the same way.)
const QUIZ_BY_TWIN = new Map(); const QUIZ_FAILS = [];
for (const h of POOL) for (const [p, q] of [...h.passages.flatMap(p => p.questions.map(q => [p, q])), ...h.standalones.map(q => [null, q])]) (QUIZ_BY_TWIN.get(q.twin) || QUIZ_BY_TWIN.set(q.twin, []).get(q.twin)).push({ p, q });
for (const c of CARDS) for (const t of c.twinOf || []) for (const { p, q } of QUIZ_BY_TWIN.get(t) || []) {
  const ka = keyWords(c.choices[c.ans]), kb = keyWords(String(q.choices[q.ans]).split(/,? since |,? because |, which /)[0]);
  const [sh, lo] = ka.length <= kb.length ? [ka, kb] : [kb, ka];
  if (process.env.CPT_LIST_QUIZ && (keyNorm(c.choices[c.ans]) === keyNorm(q.choices[q.ans]) || (sh.length && sh.length <= 3 && sh.every(w => lo.includes(w))))) { console.log('QUIZKEY', c.id, '|', c.choices[c.ans], '|', q.choices[q.ans]); continue; }
  assert(!(keyNorm(c.choices[c.ans]) === keyNorm(q.choices[q.ans]) || (sh.length && sh.length <= 3 && sh.every(w => lo.includes(w)))), c.id + ': its key "' + c.choices[c.ans] + '" means the same as the key of the quiz question twinning ' + t + ' ("' + q.choices[q.ans] + '")');
}

// Cards look like the test: a card whose source question shows a figure carries one of the same kind, drawn for its
// own problem: a structure (source `fig` / `choiceFigs`) as a structure on the card or in a lesson step, a graph or
// table (source `chart`) as a chart. On the card itself (stem `fig`/`chart`, `choiceFigs`) when the student must read
// it to answer, otherwise in a lesson step. Every structure name it uses is drawn (data/structures.js, generated by
// tools/draw-structures.py, which checks each with RDKit). MECHANISM: cards whose source graph shows a reaction's
// course, taught with a mechanism-step diagram instead (the user's choice).
const STRUCT = (() => { const c = vm.createContext({}); vm.runInContext(fs.readFileSync(root + '/data/structures.js', 'utf8').replace(/^const /mg, 'var '), c); return c.STRUCT_SVG; })();
const MECHANISM = new Set(['cpt-pe1-48a', 'cpt-pe1-48c']);
const srcKinds = q => new Set([...(q.fig || q.choiceFigs ? ['structure'] : []), ...(q.chart ? ['chart'] : [])]);
const cardFigs = c => { const steps = [...((c.how && c.how.steps) || []), ...(c.teach || [])];
  return { names: [c.fig, c.choiceFigs, ...steps.map(st => st.fig)].flat().filter(x => x != null), chart: !!(c.chart || steps.some(st => st.chart)) }; };
let figCards = 0;
for (const c of CARDS) {
  const need = new Set(ownSrcs(c).flatMap(r => [...srcKinds(SRC.get(r))])), f = cardFigs(c);
  for (const n of f.names) assert(typeof n === 'string' && STRUCT[n], c.id + ': figure "' + n + '" is drawn in data/structures.js');
  if (!need.size) continue;
  figCards++;
  assert(f.names.length || f.chart, c.id + ': its source question shows a figure, so the card has one');
  if (need.has('structure') && !need.has('chart')) assert(f.names.length, c.id + ': its source shows a structure, so the card shows one');
  if (need.has('chart') && !need.has('structure') && !MECHANISM.has(c.id)) assert(f.chart, c.id + ': its source shows a graph or table, so the card shows a chart');
  if (MECHANISM.has(c.id)) assert(f.names.length, c.id + ': its mechanism-step diagram is drawn');
}
assert(process.env.CPT_FILE || figCards > 0, 'some cards come from questions with figures');
if (process.env.CPT_FILE) { console.log(`Batch ${CPT_FILE}: ${CARDS.length} cards pass coverage, worked methods, style and originality.`); process.exit(0); }
// ── 4. No QBank in TODAY ──
// The QBank files are byte-identical to main (line endings normalized for Windows checkouts).
const MAIN_SHA = {
  'qb-aamc-bio.js': '34e9175ade7145b498691dc34ce203fc1d7baa6b4a7e9c6e3bc89204bc3d00e8',
  'qb-aamc-biochem.js': 'a32898c2aa7b33a8a1779325a40af07f1892381845c1a7953446e00dfd339a79',
  'qb-aamc-cars.js': '916bae5e3773ad4a64fecf9337c1bd722b13a2cfe339213b0a0dcad6ad209fc8',
  'qb-aamc-chem.js': '868020ff47af93e92703e703893ec533e31e82407c68b321db1401e161fc80ff',
  'qb-aamc-iqb.js': '94998526c5647b26a32729ed241be11d013bcb7759573fe97aab74e819363e9e',
  'qb-aamc-phys.js': '85758bcf5d055ef42026a7401780001280a7b724c086ed2ae4954dec8f0f8d8a',
  'qb-aamc-rules.js': 'a920ff4112e9a9e62c19edddadc0d47b504ac108a65f24f86e40d8152db0a735',
};
for (const [f, sha] of Object.entries(MAIN_SHA)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(root + '/data/' + f, 'utf8').replace(/\r\n/g, '\n')).digest('hex'), sha, f + ' is byte-identical to main');
assert.deepEqual(fs.readdirSync(root + '/data').filter(f => /^qb-/.test(f)).sort(), [...Object.keys(MAIN_SHA), 'qb-aamc-fl.js'].sort(), 'no QBank file added, renamed or removed');
// qb-aamc-fl.js: only the 17 Practice Exam cards the user approved for rewriting (they reused the AAMC question's own
// numbers) changed; every other card, the 59 Sample Test cards included, is exactly as on main.
const MASTERY_PE_RE = /^pe\d-cp:\d+$/;
const REWRITTEN = new Set(['pe1-cp:3', 'pe1-cp:42', 'pe3-cp:7', 'pe3-cp:19', 'pe3-cp:34', 'pe3-cp:39', 'pe3-cp:45', 'pe4-cp:15', 'pe4-cp:22', 'pe4-cp:38', 'pe4-cp:53', 'pe4-cp:54', 'pe5-cp:15', 'pe5-cp:24', 'pe5-cp:49', 'pe5-cp:50', 'pe5-cp:56']);
// The only other change the user approved: the "Rule out" fields (elim, rule; formerly elimThen) on the 295 Practice Exam cards.
// With those two fields set aside, every card is exactly as approved: the 337 untouched ones as on main, the 17
// rewrites as approved.
const sansElim = q => { const { elim, elimThen, rule, fast, cut, ...rest } = q; return rest; };
// Two explanation fixes the user approved (2026-11-17): pe3-cp:28 (the curve flattens as product builds up, not
// because substrate runs out) and pe5-cp:38 (the octanol/water ratio is not the ether/water ratio).
const FIXED = new Set(['pe3-cp:28', 'pe5-cp:38']);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(FL.filter(q => !REWRITTEN.has(q.src) && !FIXED.has(q.src)).map(sansElim))).digest('hex'), '779611d17648dec02b39a327bd38e2504c7c6f3ebfdd0b21ed74052dff24210e', 'qb-aamc-fl.js: every card but the 17 approved rewrites and 2 approved fixes is unchanged from main (apart from Rule out 2)');
assert.equal(crypto.createHash('sha256').update(JSON.stringify(FL.filter(q => FIXED.has(q.src)).map(sansElim))).digest('hex'), '47807ba9d1a81a8b5774119e1a85398d9cf7cc9bd06b9c458bac7fefd4b94aba', 'qb-aamc-fl.js: the 2 approved explanation fixes are as approved');
assert.equal(crypto.createHash('sha256').update(JSON.stringify(FL.filter(q => REWRITTEN.has(q.src)).map(sansElim))).digest('hex'), 'ff97b9ea57409f7732d1344fb4f72cf609e9d2a46f3938baafd82a42802f1d44', 'qb-aamc-fl.js: the 17 approved rewrites are as approved (apart from Rule out 2)');
// Rule out 3 on every guided Practice Exam card (PE1/3/4/5/6), the same shape as on the flashcards; Sample Test
// cards are left alone. CPT_ELIM_PENDING=1 (a writer's working copy) skips cards still in the old format (no rule).
for (const q of FL) {
  const pe = MASTERY_PE_RE.test(q.src), id = q.src;
  if (!pe) { assert(q.elim === undefined && q.cut === undefined, id + ': Sample Test cards are left alone (no elim or cut)'); continue; }
  checkElim3(q, id);
}
assert.equal(FL.length, 354, 'qb-aamc-fl.js keeps its 354 cards');

const storage = new Map(), node = () => ({ innerHTML: '', textContent: '', value: '', hidden: true, style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } });
const nodes = new Map(), el = id => { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); };
const app = vm.createContext({ console: { log() {}, warn() {}, error() {} }, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} },
  document: { getElementById: el, querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}, createElement: node, head: { appendChild() {} }, body: node(), documentElement: node() },
  localStorage: { getItem: k => (storage.has(k) ? storage.get(k) : null), setItem: (k, v) => storage.set(k, String(v)), removeItem: k => storage.delete(k) } });
const run = code => vm.runInContext(code, app);
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
assert.deepEqual(JSON.parse(run("JSON.stringify(BANKS.cpt)")), ['data/cp-test-cards.js', 'data/cp-rules.js'], 'loaded on demand (BANKS.cpt), with the rules sheet');
assert(['data/cp-test-cards.js', 'data/cp-rules.js'].every(f => fs.readFileSync(root + '/sw.js', 'utf8').includes("'" + f + "'")), 'precached by the service worker');
// The rules sheet and rule cards (data/cp-rules.js): sections of one-line rules; rule cards with a short front and
// back, each tied to its section and to deck cards that use the rule; ids unique.
{ const R = JSON.parse(run('JSON.stringify(CP_RULES)')), deck = new Set(CARDS.map(c => c.id)), secs = new Set(R.sheet.map(x => x.id));
  assert(R.sheet.length >= 8 && R.sheet.every(x => x.id && x.title && Array.isArray(x.items) && x.items.length >= 2 && x.items.every(t => typeof t === 'string' && t.trim() && t.length <= 200)), 'rules sheet: sections of one-line rules');
  assert.equal(secs.size, R.sheet.length, 'rules sheet: unique section ids');
  assert(R.cards.length >= 50, 'at least 50 rule cards: ' + R.cards.length);
  assert.equal(new Set(R.cards.map(c => c.id)).size, R.cards.length, 'rule cards: unique ids');
  // Each rule card is a short multiple-choice problem that applies its rule: 4 different choices (the 3 wrong ones are
  // the traps the rule kills), one key, and the rule as its explanation.
  for (const c of R.cards) {
    assert(/^r-[a-z0-9-]+$/.test(c.id) && secs.has(c.sheet), c.id + ': id and section');
    assert(typeof c.q === 'string' && c.q.trim() && c.q.length <= 200, c.id + ': a short problem (≤ 200 characters)');
    assert(Array.isArray(c.choices) && c.choices.length === 4 && new Set(c.choices).size === 4 && c.choices.every(x => typeof x === 'string' && x.trim()), c.id + ': 4 different choices');
    assert(Number.isInteger(c.ans) && c.ans >= 0 && c.ans < 4, c.id + ': one key');
    assert(typeof c.rule === 'string' && c.rule.trim() && c.rule.length <= 240, c.id + ': the rule, shown after answering (≤ 240 characters)');
    assert(c.front === undefined && c.back === undefined, c.id + ': no flip-card fields');
    assert(Array.isArray(c.cards) && c.cards.length >= 1 && c.cards.every(id => deck.has(id)), c.id + ': tied to deck cards that use the rule');
  }
  for (const sec of R.sheet) assert(R.cards.some(c => c.sheet === sec.id), sec.id + ': the section has rule cards'); }
assert.equal(run("masteryFlashPool('cp').length"), CARDS.length, 'the C/P flashcard pool is the Practice Test flashcards');
assert(run("masteryFlashPool('cp').every(q => CPTQ_BY_ID.has(q.id) && !AQB_BY_ID.has(q.id) && !FLQ_BY_ID.has(q.id))"), 'no QBank or Practice Exam card in the flashcard pool');
assert(run("masteryPracticePool('cp').every(q => /^pe\\d-cp:/.test(q.src))") && run("masteryPracticePool('cp').length") === 295, 'guided pool: the 295 Practice Exam 1/3/4/5/6 cards, no Sample Test card');
assert(run("masteryFlashPool('bb').every(q => AQB_BY_ID.has(q.id))"), 'other sections keep their QBank flashcards');
const sampleSrc = FL.find(q => /^sample-cp:/.test(q.src)).src, qbSrc = run('AQB_QBANK.find(q => q.src && /^[45][A-E]$/.test(q.aamc)).src');
const peList = [...new Set(CARDS.flatMap(c => c.from.map(r => r.split('#')[0])))];
const today = run('localDay()');
let frontSeen = 0;
for (let day = 0; day < 200; day++) {
  const pe = peList[day % peList.length];
  run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [
    { subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: { '5D': { c: 2, t: 14 } } },
    { subj: 'cp', day: '${today}', t: 2, kind: 'daily', correct: 15, total: 30, pct: 50, scaled: 122, version: 'cp_half_${1 + (day % 6)}', cats: { '5C': { c: 0, t: 2 } }, missIds: [], twinMisses: ['${pe}', '${sampleSrc}', '${qbSrc}'] }] })`);
  const front = JSON.parse(run('JSON.stringify([...masteryTwinFront(masteryPlanNow())])'));
  // The Practice Exam twin leads both steps; a missed Sample Test quiz question's twin card (cpt-st) leads the flashcards
  // (it has no guided card); a QBank twin is skipped.
  assert.deepEqual(front, [pe, sampleSrc], 'day ' + day + ': the Practice Exam and Sample Test twins lead (the QBank twin is skipped)');
  // Weakest first: each step's set runs by category (masteryCatRank: weak categories of the latest test, lowest %
  // right first, then untested ones by AAMC weight); within a category the missed twin's cards, then test order
  // (PE1, PE3, PE4, PE5, PE6, then question number, then item).
  const inOrder = `(() => { const plan = masteryPlanNow(), f = masteryTwinFront(plan), rank = masteryCatRank(plan), it = quiz.items.map(v => v.q);
    // Within a category: the missed twins first, then core, then common, then rare cards; then test order.
    const key = q => [rank[q.aamc] ?? 99, masteryIsFront(q, f) ? 0 : 1, masteryIsFront(q, f) ? 0 : masteryTierN(q), ...masteryTestKey(q)];
    const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3] || a[4] - b[4] || a[5] - b[5] || (a[6] < b[6] ? -1 : a[6] > b[6] ? 1 : 0);
    // Cards sharing a twin passage (pid) run back to back in question order; each such run sorts by its earliest card.
    const units = []; for (const q of it) { const u = units.at(-1); if (q.pid && u && u.pid === q.pid) u.qs.push(q); else units.push({ pid: q.pid, qs: [q] }); }
    const pids = units.filter(u => u.pid).map(u => u.pid); if (new Set(pids).size !== pids.length) return false;
    const qn = q => masteryTestKey({ twinOf: q.twinOf })[1];
    if (!units.every(u => u.qs.every((q, i) => !i || qn(u.qs[i - 1]) <= qn(q)))) return false;
    const uk = units.map(u => u.qs.map(key).sort(cmp)[0]);
    return uk.every((k, i) => !i || cmp(uk[i - 1], k) <= 0); })()`;
  run('startMasteryFlashcards(true)');
  const flash = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ id: v.q.id, from: v.q.from || [] })))'));
  assert(flash.length > 0 && flash.every(x => ids.has(x.id)), 'day ' + day + ': flashcards are Practice Test flashcards only');
  assert(run('quiz.items.every(v => !AQB_BY_ID.has(v.q.id) && !(v.q.src && /^sample-cp:/.test(v.q.src)))'), 'day ' + day + ': no QBank or Sample Test card among the flashcards');
  if (run(`(() => { const f = masteryTwinFront(masteryPlanNow()), it = quiz.items.map(v => v.q), i = it.findIndex(q => masteryIsFront(q, f)); return i >= 0 && (i === 0 || it[i - 1].aamc !== it[i].aamc); })()`)) frontSeen++;
  assert(run(inOrder), 'day ' + day + ': the flashcards run weakest category first; in each, the missed twin\'s cards, then test order; a passage\'s cards back to back');
  run('goHome()');
  run('startMasteryGuided(true)');
  const guided = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.src || ""))'));
  assert(guided.length > 0 && guided.every(s => /^pe\d-cp:\d+$/.test(s)), 'day ' + day + ': guided cards are Practice Exam 1/3/4/5/6 cards only');
  assert(run(inOrder), 'day ' + day + ': the guided cards run weakest category first; in each, the missed twin, then test order');
  run('goHome()');
}
assert(frontSeen > 0, 'the flashcards built from a missed twin led their category on some days');
// What the MCAT tests most gets repeated; rare things are asked once. A rare card, once shown, never comes back (not
// even as a miss or due); a common card at most MASTERY.commonShows times; a core card stays in the pool (spaced review
// and misses bring it back). The guided step holds 20 cards or fewer, the twins of the last quiz's misses first.
{ const ids3 = JSON.parse(run(`JSON.stringify(['rare', 'common', 'core'].map(t => CPTQ.find(q => q.tier === t).id))`));
  const [rare, common, core] = ids3, old = Date.now() - 30 * 86400000;
  run(`store.set(KEYS.mem, { '${rare}': { S: 0.2, D: 5, last: ${old}, seen: 1, right: 0, lapses: 1 }, '${common}': { S: 0.2, D: 5, last: ${old}, seen: ${run('MASTERY.commonShows')}, right: 1, lapses: 0 }, '${core}': { S: 0.2, D: 5, last: ${old}, seen: 5, right: 2, lapses: 3 } })`);
  const pool = new Set(JSON.parse(run("JSON.stringify(masteryFlashPool('cp').map(q => q.id))")));
  assert(!pool.has(rare), 'a rare card, once shown, is never scheduled again, even after a miss');
  assert(!pool.has(common), 'a common card is shown at most ' + run('MASTERY.commonShows') + ' times (the first pass and 2 reviews)');
  assert(pool.has(core), 'a core card stays in the pool: missed and due, it comes back');
  run(`(() => { const m = masteryLoad(), row = masteryDayRow(m, 'cp'); row.misses = ['${rare}', '${core}']; masterySave(m); })()`);
  const rank = run(`(() => { const p = masteryPlanNow(), m = masteryLoad(); const r = masteryTierOf(m, p, masteryDayRow(m, 'cp')); return JSON.stringify([r(CPTQ_BY_ID.get('${rare}')), r(CPTQ_BY_ID.get('${core}')), r.isMissed(CPTQ_BY_ID.get('${rare}'))]); })()`);
  const [rr, rc, rm] = JSON.parse(rank);
  assert(rr >= 1 && rc < 1 && rm === false, 'a missed rare card never ranks as missed or due; a missed core card does');
  assert.deepEqual(JSON.parse(run("JSON.stringify(['core','common','rare'].map(t => masteryTierN({ tier: t })))")), [0, 1, 2], 'core, then common, then rare');
  // Guided: up to 20, the twins of the last quiz's misses first.
  run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: { '5D': { c: 2, t: 14 } } },
    { subj: 'cp', day: '${today}', t: 2, kind: 'daily', correct: 15, total: 30, pct: 50, scaled: 122, version: 'cp_half_1', cats: { '4E': { c: 0, t: 2 } }, missIds: [], twinMisses: ['pe3-cp:11'] }] })`);
  const g = JSON.parse(run('JSON.stringify(masteryPlanNow().steps.find(s => s.id === "guided"))'));
  assert(g.count <= 20 && g.count === Math.min(20, run('masteryLoad().perDay')), 'the guided step has 20 cards or fewer (' + g.count + ')');
  run('startMasteryGuided(true)');
  const gl = JSON.parse(run('JSON.stringify(quiz.items.map(v => v.q.src))'));
  assert(gl.length <= 20 && gl.includes('pe3-cp:11'), 'the guided set (' + gl.length + ') holds the missed question\'s twin');
  const cat = run("FLQ.find(q => q.src === 'pe3-cp:11').aamc"), first = gl.findIndex(x => run(`FLQ.find(q => q.src === '${x}').aamc`) === cat);
  assert.equal(gl[first], 'pe3-cp:11', 'within its category, the missed question\'s twin comes first');
  run('goHome()');
  run(`store.set(KEYS.mem, { [FLQ.find(q => q.src === '${run("CPTQ.find(q => q.tier === 'rare' && /^pe/.test(q.twinOf[0])).twinOf[0]")}').id]: { S: 1, D: 5, last: ${old}, seen: 1, right: 1, lapses: 0 } })`);
  assert(!run(`(() => { const mem = loadMem(); return masteryPracticePool('cp').filter(q => masteryTierOk(q, mem)).some(q => q.src === '${run("CPTQ.find(q => q.tier === 'rare' && /^pe/.test(q.twinOf[0])).twinOf[0]")}'); })()`), 'a rare guided card is shown once in total');
  run('store.set(KEYS.mem, {})'); }
// The latest test has 4A < 5A < 4D < 5E (all weak): both steps open with 4A cards, then 5A, 4D, 5E, then the
// untested categories by AAMC weight; TODAY lists each step's category chips in that order.
{ run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2',
    cats: { '4A': { c: 1, t: 10 }, '5A': { c: 3, t: 10 }, '4D': { c: 5, t: 10 }, '5E': { c: 7, t: 10 }, '5D': { c: 9, t: 10 } } }] })`);
  const want = ['4A', '5A', '4D', '5E'], untested = JSON.parse(run("JSON.stringify(masteryWeights('cp', 'cats').map(([c]) => c))")).filter(c => !want.includes(c) && c !== '5D');
  const expect = [...want, ...untested, '5D'];
  assert.deepEqual(Object.keys(JSON.parse(run('JSON.stringify(masteryCatRank(masteryPlanNow()))'))), expect, 'category rank: weak by % right, untested by AAMC weight, then the strong 5D');
  for (const fn of ['startMasteryFlashcards(true)', 'startMasteryGuided(true)']) {
    run(fn);
    // A passage's cards run back to back (one shared twin passage): the run counts once, under its weakest category.
    const items = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ c: v.q.aamc, pid: v.q.pid || null })))')), cats = [];
    items.forEach((x, i) => { if (x.pid && i && items[i - 1].pid === x.pid) { const k = cats.length - 1; if (expect.indexOf(x.c) < expect.indexOf(cats[k])) cats[k] = x.c; } else cats.push(x.c); });
    const runs = cats.filter((c, i) => !i || cats[i - 1] !== c);
    assert.deepEqual(runs, expect.filter(c => cats.includes(c)), fn + ': one run per category, weakest first (' + runs.join(' ') + ')');
    assert.equal(cats[0], '4A', fn + ': the day opens with 4A cards');
    run('goHome()');
  }
  const html = run('masteryCard()');
  for (const step of ['Flashcards', 'Guided Practice Exam cards']) {
    const part = html.slice(html.indexOf('<b>' + step)), chips = [...part.slice(0, part.indexOf('</li>')).matchAll(/class="mastery-chip[^"]*"[^>]*>(?:✓ )?([45][A-E]) /g)].map(m => m[1]);
    assert.deepEqual(chips, expect.filter(c => chips.includes(c)), step + ': TODAY lists the category chips weakest first');
    assert(chips.length >= 8, step + ': chips shown');
  }
  for (const c of want) assert(new RegExp(c + ' [^<]*<b>weak</b>').test(html), c + ': every category listed under "Weak content categories" is marked weak (up to four)');
  assert(!/5D [^<]*<b>weak<\/b>/.test(html), 'a strong category is not marked weak');
  // Missed cards always get a slot first: a 5-card drill on a category whose discipline mix gives biology no slot still
  // holds the missed biology card; the mix fills the other slots.
  { const r = JSON.parse(run(`(() => { const mk = (id, disc) => ({ id, disc, aamc: '4B' });
      const pool = [...Array.from({ length: 12 }, (_, i) => mk('p' + i, 'physics')), ...Array.from({ length: 12 }, (_, i) => mk('c' + i, 'gen_chem')), mk('bio-missed', 'biology'), mk('bio-other', 'biology')];
      const tier = masteryTierRank({ missed: new Set(['bio-missed']) });
      const step = { topics: [{ code: '4B', need: 5, progress: 0 }], count: 5 };
      const discW = [['gen_chem', 0.6], ['physics', 0.38], ['biology', 0.02]];
      const withMiss = masteryTopicSet(step, pool, q => q.aamc, (c, k) => c.slice(0, k), { discOf: q => q.disc, discW, tierOf: tier }).list.map(q => q.id);
      const noMiss = masteryTopicSet(step, pool, q => q.aamc, (c, k) => c.slice(0, k), { discOf: q => q.disc, discW, tierOf: masteryTierRank({}) }).list.map(q => q.id);
      return JSON.stringify({ withMiss, noMiss }); })()`));
    assert(r.withMiss.includes('bio-missed') && r.withMiss.length === 5, 'a missed biology card gets a slot in a 5-card drill: ' + r.withMiss.join(' '));
    assert(!r.noMiss.some(id => id.startsWith('bio')), 'without the miss, the discipline mix gives biology no slot: ' + r.noMiss.join(' '));
    assert(r.withMiss.filter(id => id !== 'bio-missed').every(id => /^[pc]/.test(id)), 'the mix fills the other slots'); }
  // The rules warm-up is step 1 and the flashcards wait for it: "Start" on the flashcards before it is done starts
  // nothing. The warm-up runs today's 10 rule cards as multiple-choice questions with the rule as the explanation;
  // answering them all finishes it, a missed card comes back first next time, and then the flashcards start.
  { run('goHome(); true');
    const plan0 = JSON.parse(run("JSON.stringify(masteryPlanNow().steps.map(s => s.id))"));
    assert.equal(plan0[1], 'rules', 'C/P: the rules warm-up is the first daily step (after the diagnostic): ' + plan0.join(' '));
    assert.equal(plan0[2], 'flashcards', 'then the flashcards');
    assert(/Unlocks when the rules warm-up is done/.test(run('masteryCard()')), 'the flashcard step shows it is locked');
    run('startMasteryFlashcards()');
    assert.notEqual(run('quiz.mastery'), 'flashcards', 'the flashcards wait for the rules warm-up');
    run('startMasteryRules()');
    assert.equal(run('quiz.mastery'), 'rules', 'the warm-up runs as a quiz');
    assert.equal(run('quiz.items.length'), 10, "today's 10 rule cards");
    assert(run('quiz.items.every(v => CP_RULES.cards.some(c => c.id === v.q.id && c.q === v.q.q && /^\\*\\*Rule:\\*\\* /.test(v.q.exp)))'), 'each is a rule card, its rule as the explanation');
    const first = run('quiz.items[0].q.id');
    run('pick((quiz.items[0].ans + 1) % 4)');   // a wrong answer
    assert(run('/Rule:/.test(document.getElementById("exp-area").innerHTML)'), 'the rule shows after answering');
    for (let i = 1; i < 10; i++) { run('quiz.idx = ' + i + '; quiz.answered = false; renderQuizQuestion(); true'); run('pick(quiz.items[' + i + '].ans)'); }
    assert(run('masteryRulesDone(masteryPlanNow())'), 'answering every rule card finishes the warm-up');
    assert.equal(run("masteryPlanNow().steps.find(s => s.id === 'rules').progress"), 10, '10 rule cards a day');
    const saved = JSON.parse(run('JSON.stringify(masteryLoad().rules)'));
    assert(saved[first] && saved[first].ok === false && Object.keys(saved).length === 10, 'each card remembers its result');
    assert.equal(JSON.parse(run('JSON.stringify(masteryRulesPick(masteryLoad(), 1))'))[0], first, 'the missed rule card comes back first');
    run('goHome()'); run('startMasteryFlashcards()');
    assert.equal(run('quiz.mastery'), 'flashcards', 'then the flashcards start');
    run('goHome()');
    const pick = JSON.parse(run(`(() => { const m = { rules: { [CP_RULES.cards[5].id]: { d: '2026-01-01', ok: false }, [CP_RULES.cards[0].id]: { d: '2026-01-02', ok: true } } }; return JSON.stringify(masteryRulesPick(m, 3)); })()`));
    const ids = JSON.parse(run('JSON.stringify(CP_RULES.cards.map(c => c.id))'));
    assert.deepEqual(pick, [ids[5], ids[1], ids[2]], 'missed rule cards first, then new ones'); }
  // The TODAY card describes the C/P steps as they are now: no QBank anywhere.
  assert(!/QBank/i.test(html), 'TODAY never says QBank for C/P');
  { const f = html.slice(html.indexOf('<b>Rules warm-up')), step = f.slice(0, f.indexOf('<li class="today-step'));
    assert(/Rules sheet/.test(step) && ['Opposites? Answer is one of them.', 'Way off in size? Cut it.', 'Formula has ½? Take the smaller twin.'].every(k => step.includes(k)), 'the rules sheet (the six glance rules) sits in the rules warm-up step');
    assert(step.indexOf('<summary>More</summary>') > step.indexOf('Formula has ½') && step.indexOf('Wrong fact') > step.indexOf('<summary>More</summary>') && step.indexOf('Anchor fact') > step.indexOf('<summary>More</summary>'), 'the earlier checks and shortcut moves fold under "More"');
    assert(html.indexOf('<b>Rules warm-up') < html.indexOf('<b>Flashcards'), 'the rules warm-up comes before the flashcards'); }
  assert(html.includes('flashcards built from the C/P questions of AAMC Practice Exams 1, 3, 4, 5 and 6') && html.includes('Help me / Show me how') && html.includes('Split exactly like the exam') && html.includes('Weakest categories first'), 'step 1 says what it does now');
}
// A full day: on a fresh day the flashcard step plans exactly 50 at the AAMC split, with no shortfall moved between
// categories, and the session holds 50 different Practice Test flashcards, each from the category it counts for.
{ run(`store.set(KEYS.mem, {}); store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag2', cats: {} }] })`);
  const step = JSON.parse(run("JSON.stringify(masteryPlanNow().steps.find(s => s.id === 'flashcards'))"));
  const want = JSON.parse(run("JSON.stringify(Object.fromEntries(masteryBlueprintSplit(50, masteryWeights('cp')).map(t => [t.code, t.need])))"));
  assert.equal(step.count, 50, 'the flashcard step is 50 cards');
  assert.deepEqual(Object.fromEntries(step.topics.map(t => [t.code, t.need])), want, 'exactly the AAMC split: ' + JSON.stringify(want));
  assert(step.topics.every(t => t.short === 0 && t.spill === 0), 'no shortfall moved between categories');
  run('startMasteryFlashcards()');
  const day = JSON.parse(run('JSON.stringify(quiz.items.map(v => ({ id: v.q.id, cat: masteryCategory(v.q), topic: quiz.topicOf[v.q.id] })))'));
  assert.equal(day.length, 50, 'a day holds 50 flashcards');
  assert.equal(new Set(day.map(x => x.id)).size, 50, 'no card twice');
  assert(day.every(x => ids.has(x.id) && x.cat === x.topic), 'every card is a Practice Test flashcard from the category it counts for');
  assert.deepEqual(day.reduce((o, x) => (o[x.cat] = (o[x.cat] || 0) + 1, o), {}), want, 'the day\'s set is exactly the AAMC split');
  run('goHome()'); }

// ── Report ──
const split = JSON.parse(run("JSON.stringify(masteryBlueprintSplit(50, masteryWeights('cp')).map(t => [t.code, t.need]))"));
const perCat = CARDS.reduce((o, c) => (o[c.aamc] = (o[c.aamc] || 0) + 1, o), {});
const short = split.filter(([c, n]) => (perCat[c] || 0) < n).map(([c, n]) => `${c} ${perCat[c] || 0}/${n}`);
if (TABLE) {
  console.log('Category  cards  daily need  deck target (250)');
  for (const [c, n] of split) console.log(`  ${c}      ${String(perCat[c] || 0).padStart(4)}  ${String(n).padStart(10)}  ${String(DECK_TARGET[c]).padStart(17)}`);
  console.log('Coverage (question → flashcards; items without their own card are taught inside a card\'s lesson):');
  for (const s of BUILT) console.log(`  ${s}${SPEC.bySrc.get(s).match === 'partial' ? ' (Partial)' : ''} → ${bySrc.get(s).join(', ')}`);
}
assert.deepEqual(short, [], 'every category has its 50-card daily count');
// The category balance is checked on the Practice Exam cards (the quiz-twin cards follow the quiz's own mix).
const perCatPE = CARDS.filter(c => !/^cpt-st-/.test(c.id)).reduce((o, c) => (o[c.aamc] = (o[c.aamc] || 0) + 1, o), {}), nPE = Object.values(perCatPE).reduce((a, b) => a + b, 0);
if (ALL_BUILT) for (const [c, n] of Object.entries(DECK_TARGET)) { const k = perCatPE[c] || 0; assert(k >= n - 1 && k <= n + Math.max(1, DECK_OVER[c] || 0), `category ${c}: ${k} cards, target ${n} ± 1${DECK_OVER[c] ? ' (allowed +' + DECK_OVER[c] + ')' : ''}`); }
console.log(`Practice Test flashcards passed: ${CARDS.length}/${DECK_MAX} cards covering ${covered}/${PE.size} Practice Exam C/P questions and ${SPEC.items.length - missingItems.length}/${SPEC.items.length} spec items` +
  `; stems median ${sm} words, choices median ${cm} / p90 ${c90}; how/teach valid; original against their sources; figures like their sources'; 200 simulated days with no QBank or Sample Test card in TODAY's flashcard or guided steps, each step weakest category first, then test order; QBank files identical to main.` +
  (short.length ? ` Short of the 50-card split: ${short.join(', ')}.` : ''));
