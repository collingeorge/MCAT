// Past quizzes, the quiz clock and a score that tells the whole story (TODAY's C/P quiz and diagnostic), run in the
// real app code: a finished quiz saves its setId and every answer; Past quizzes reopens it ("not reached" for the
// questions the clock ended; filters); a quiz taken before answers were saved is rebuilt from the mistake log; the
// clock counts down, warns at 10/5/1 minute left, pauses while the app is hidden and ends with "Time's up"; the score
// shows answered, right and not reached; weak categories count only answered questions; synced rows are checked.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const storage = new Map(), nodes = new Map(), listeners = {};
function el(id) { if (!nodes.has(id)) nodes.set(id, { id, innerHTML: '', textContent: '', value: '', hidden: false, style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } }); return nodes.get(id); }
const doc = { visibilityState: 'visible', getElementById: el, querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener(t, f) { (listeners[t] = listeners[t] || []).push(f); }, createElement: () => el('x' + Math.random()), body: { classList: { toggle() {}, add() {}, remove() {} }, appendChild() {} } };
const ctx = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() { return 1; }, clearTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, window: { scrollTo() {} }, document: doc,
  localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) } });
const run = code => vm.runInContext(code, ctx);
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for (const [, file] of fs.readFileSync(root + '/index.html', 'utf8').matchAll(/<script src="([^"?]+)/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
const today = run('localDay()');
run(`store.set(KEYS.subjectPath, { tests: [{ subj: 'cp', day: '${today}', t: 1, kind: 'diagnostic', correct: 30, total: 59, pct: 51, scaled: 122, version: 'cp_diag', cats: { '5D': { c: 2, t: 14 } } }] })`);

// Before it starts, TODAY says the quiz is timed.
run('renderHome()');
assert.match(el('today-plan').innerHTML, /Timed: 30 questions · 47½ min · it ends on its own when time runs out, like the real test\./, 'TODAY says the quiz is timed');

// ── A quiz the clock ends: 18 answered (10 right, 8 wrong), 12 not reached ──
run("masteryRunSet('cp', 'daily', CP_POOL[0])");
assert.equal(run('pq.views.length'), 30);
assert.match(el('pp-timer').textContent, /^4[67]:\d\d left$/, 'the clock shows time left: ' + el('pp-timer').textContent);
for (let i = 0; i < 18; i++) { run(`finishPassageAnswer(${i < 10 ? 'pq.views[pq.idx].ans' : '(pq.views[pq.idx].ans + 1) % pq.views[pq.idx].choices.length'})`); run('nextPassageQ()'); }
// Notices at 10, 5 and 1 minute left.
for (const [left, msg] of [[9.5, '10 minutes left'], [4.5, '5 minutes left'], [0.5, '1 minute left']]) {
  run(`pq.startedAt = Date.now() - pq.targetMs + ${left * 60000}; updatePassageTimer()`);
  assert.equal(el('time-notice').textContent, '⏰ ' + msg, 'a notice at ' + msg);
}
// Leaving the app pauses the clock: 20 hidden minutes don't count.
run(`pq.startedAt = Date.now() - 600000; pq.qStart = Date.now()`);
doc.visibilityState = 'hidden'; listeners.visibilitychange.forEach(f => f());
// 20 minutes pass (the clock moves on: shift every stamp back by 20 minutes).
run('pq.hiddenAt -= 20 * 60000; pq.startedAt -= 20 * 60000; pq.qStart -= 20 * 60000; updatePassageTimer()');
assert.equal(run('pq.mini.completed'), false, 'no time runs out while the app is hidden');
doc.visibilityState = 'visible'; listeners.visibilitychange.forEach(f => f());
const used = run('Date.now() - pq.startedAt');
assert(used >= 600000 && used < 601000, 'the hidden time is not counted: ' + used);
// Time runs out.
run('pq.startedAt = Date.now() - pq.targetMs - 1; updatePassageTimer()');
assert.equal(run('pq.mini.completed'), true, 'at 0:00 the quiz ends on its own');
const html = el('pp-question-box').innerHTML;
assert(html.indexOf('Time’s up') >= 0 && html.indexOf('Time’s up') < html.indexOf('score-pct'), '"Time\'s up" before the score');
assert(html.includes('Answered 18 of 30 · 10 of 18 right (56%) · 12 not reached'), 'the score tells the whole story');
assert(html.includes('You ran out of time.') && html.includes('Accuracy on what you answered: 56%') && html.includes('guess on any question you can’t finish; there’s no penalty'), 'the pacing note');

// Saved: setId and one answer per question; weak categories from answered questions only.
const t = JSON.parse(run('JSON.stringify(masteryLoad().tests.at(-1))'));
assert.equal(t.setId, 'cp_half_1'); assert.equal(t.answers.length, 30); assert.equal(t.answered, 18); assert.equal(t.correct, 10); assert.equal(t.timedOut, true);
assert.equal(t.answers.filter(a => a.chosen === null).length, 12, '12 not reached');
assert.equal(t.answers.filter(a => a.right).length, 10);
assert(run(`(() => { const t = masteryLoad().tests.at(-1), set = masterySetById(t.setId), qs = masterySetItems(set).map(x => x.view.q);
  return t.answers.every((a, i) => a.qid === String(qs[i].id) && (a.chosen === null || (a.chosen === qs[i].ans) === a.right)); })()`), 'each answer is the question\'s own choice index');
assert.equal(Object.values(t.cats).reduce((n, v) => n + v.t, 0), 18, 'only answered questions count toward categories');
assert.equal(Object.values(t.notReached).reduce((n, v) => n + v, 0), 12, 'the rest are not reached');
assert(run('masteryWeak(masteryLoad().tests.at(-1)).every(w => w.t > 0)'));
assert(t.twinMisses.length <= 8, 'tomorrow\'s twins come from answered misses only');
assert.equal(t.scaled, run('rawToScaled(100 * 10 / 30)'), 'the scaled score counts unanswered as wrong');

// ── Past quizzes and review ──
run('goHome(); renderHome()');
assert.match(el('today-plan').innerHTML, /Past quizzes \(1\)/); assert.match(el('today-plan').innerHTML, /answered 18 of 30/);
assert.match(el('today-plan').innerHTML, new RegExp('masteryReview\\(' + t.t + '\\)'));
run(`masteryReview(${t.t})`);
let r = el('results-body').innerHTML;
assert.equal(run('activeScreen'), 'screen-results');
assert.equal((r.match(/class="missed-item"/g) || []).length, 30, 'every question');
assert.equal((r.match(/— Not reached/g) || []).length, 12, '"not reached" for the 12');
assert.equal((r.match(/✗ Your answer:/g) || []).length, 8, 'your answer on the 8 missed');
assert(r.includes('Review passage') || r.includes('Passage: '), 'each passage'); assert(r.includes('Explanation'));
run(`masteryReview(${t.t}, 'missed')`); r = el('results-body').innerHTML;
assert.equal((r.match(/class="missed-item"/g) || []).length, 8, 'Missed only');
run(`masteryReview(${t.t}, 'notreached')`); r = el('results-body').innerHTML;
assert.equal((r.match(/class="missed-item"/g) || []).length, 12, 'Not reached only');
run('showProgress()'); assert.match(el('results-body').innerHTML, /Past quizzes \(1\)/, 'on Progress too');

// ── Backfill: a quiz taken before answers were saved comes back from the mistake log ──
run(`(() => { const m = masteryLoad(), t = m.tests.at(-1); for (const k of ['answers', 'setId', 'answered', 'notReached', 'timedOut']) delete t[k]; masterySave(m); })()`);
assert.equal(run('masteryLoad().tests.at(-1).answers'), undefined);
run('renderHome()'); assert.match(el('today-plan').innerHTML, /Past quizzes \(1\)/, 'today\'s quiz reappears in Past quizzes');
const b = JSON.parse(run('JSON.stringify(masteryLoad().tests.at(-1))'));
assert.equal(b.backfilled, true); assert.equal(b.setId, 'cp_half_1'); assert.equal(b.answered, 18);
assert.deepEqual(b.answers.map(a => [a.chosen, a.right]), t.answers.map(a => [a.chosen, a.right]), 'every answer rebuilt');
// When the log doesn't match the score, unmatched questions show without "your answer".
run(`(() => { const m = masteryLoad(), t = m.tests.at(-1); delete t.answers; t.correct = 11; masterySave(m); })()`);
run(`masteryReview(${t.t})`); r = el('results-body').innerHTML;
assert(run('masteryLoad().tests.at(-1).answers.filter(a => a.u).length') === 10, 'the 10 unlogged questions are uncertain');
assert.equal((r.match(/class="missed-item"/g) || []).length, 30); assert.equal((r.match(/✗ Your answer:/g) || []).length, 8);

// ── Synced rows are checked ──
const bad = run(`JSON.stringify(masteryNormalize({ tests: [{ subj: 'cp', day: '${today}', t: 5, kind: 'daily', correct: 1, total: 30, pct: 3, scaled: 118, setId: '<b>', answered: 99, answers: [{ qid: '<img>', chosen: 1, right: true }], notReached: { '<x>': 2 } }] }).tests[0])`);
assert(!/setId|answers|answered|notReached/.test(bad), 'bad review fields are dropped: ' + bad);
console.log('Quiz review passed: answers saved (setId + 30), Past quizzes on TODAY and Progress, review with "not reached" and filters, backfill from the mistake log, a countdown with 10/5/1-minute notices, paused while hidden, "Time\'s up", answered/right/not reached, weak categories from answered questions only.');
