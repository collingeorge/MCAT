// Checks one rebuilt Chem/Phys set (tools/twin-build/<set>.json, in the data/cp-diagnostic.js / cp-pool.js shape)
// against its row of the twin map before it is assembled into data/:
//   the AAMC layout and the map's twins (every passage = one map passage, every stand-alone = a map stand-alone);
//   each question's category, discipline, skill and difficulty = its map slot;
//   near-copy and untaught-topic checks (tools/twin-checks.cjs);
//   AAMC length and format: passage 150–400 words, passage-question stem 6–50, stand-alone stem 7–57, stems end in
//   "?" or ":" (a given value in parentheses may follow, as in tools/test-aamc-format.cjs), 4 parallel choices, the set's choice median ≤ 3 words and 90th percentile ≤ 9, key not the single
//   longest choice by 1.5× and 3+ words, explanations end with "**Rule to reuse:**" and never name a choice letter.
// Run: node tools/check-twin-set.cjs diag quiz1 ... (default: every file in tools/twin-build/)
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const S = require('./twin-sources.cjs');
const { twinProblems } = require('./twin-checks.cjs');
const MAP = JSON.parse(fs.readFileSync(path.join(__dirname, 'twin-map.json'), 'utf8'));
const DIR = path.join(__dirname, 'twin-build');
const strip = t => String(t == null ? '' : t).replace(/<[^>]+>/g, ' ').replace(/\*\*/g, '');
const words = t => strip(t).trim().split(/\s+/).filter(Boolean).length;
const median = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const p90 = a => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(0.9 * s.length) - 1)]; };

function check(id) {
  const errs = [], err = m => errs.push(m);
  const file = path.join(DIR, id + '.json');
  if (!fs.existsSync(file)) return ['missing ' + file];
  const set = JSON.parse(fs.readFileSync(file, 'utf8')), sid = id.replace(/-[a-z]$/, ''), spec = S.SETS.find(s => s.id === sid), map = MAP.sets[sid];
  set.order = set.order || [];
  if (!spec || !map) return ['unknown set ' + id];
  // Layout (a partial file, part of a set written in pieces, skips the layout and completeness checks).
  const partial = !!set.partial;
  const shape = set.order.map(x => (typeof x === 'number' ? x : 'P')).join(' ');
  if (!partial && shape !== spec.layout.join(' ')) err(`order ${shape} is not ${spec.layout.join(' ')}`);
  const byId = new Map(set.passages.map(p => [p.id, p]));
  const placed = set.order.filter(x => typeof x === 'string');
  if (!partial && placed.length !== set.passages.length || placed.some(x => !byId.has(x))) err('order must place every passage once');
  if (!partial && set.order.filter(x => typeof x === 'number').reduce((a, b) => a + b, 0) !== set.standalones.length) err('order must place every stand-alone once');
  const rowOf = new Map([...map.passages.flatMap(p => p.rows), ...map.standalones].map(r => [r.twin, r]));
  const used = new Set(), ids = new Set(), choiceW = [];
  const one = (q, p) => {
    const where = q.id || '(no id)', r = rowOf.get(q.twin), card = S.cards[q.twin];
    if (ids.has(q.id)) err(where + ': duplicate id'); ids.add(q.id);
    if (!r) { err(where + `: twin ${q.twin} is not a slot of ${id} in the map`); return; }
    if (used.has(q.twin)) err(where + ': twin used twice'); used.add(q.twin);
    if ((r.kind === 'P') !== !!p) err(where + `: ${q.twin} is a ${r.kind === 'P' ? 'passage' : 'stand-alone'} slot`);
    const subj = q.subj || (p && p.subj);
    if (q.cat !== r.aamc) err(where + `: cat ${q.cat}, map ${r.aamc}`);
    if (subj !== r.disc) err(where + `: subj ${subj}, map ${r.disc}`);
    if (q.skill !== r.skill) err(where + `: skill ${q.skill}, map ${r.skill}`);
    if (q.diff !== r.diff) err(where + `: diff ${q.diff}, map ${r.diff}`);
    for (const m of twinProblems(q, p, card.card)) err(where + ': ' + m);
    if (!Array.isArray(q.choices) || q.choices.length !== 4 || new Set(q.choices).size !== 4) err(where + ': 4 different choices');
    if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans > 3) err(where + ': ans 0–3');
    const sw = words(q.q);
    if (p ? sw < 6 || sw > 50 : sw < 7 || sw > 57) err(where + `: stem ${sw} words`);
    if (!/[?:]$|_{3,}/.test(strip(q.q).trim().replace(/([?:])\s*\((?:[^()]|\([^()]*\))*\)\.?$/, '$1'))) err(where + ': stem must end in "?" or ":"');
    if (q.choices.some(c => /^(?:[A-D](?:,? (?:and )?[A-D])*)(?: only)?$/.test(String(c).trim()))) err(where + ': a choice reads like answer letters');
    q.choices.forEach(c => choiceW.push(words(c)));
    const cw = q.choices.map(words), key = cw[q.ans], others = cw.filter((_, i) => i !== q.ans);
    if (key > Math.max(...others) * 1.5 && key - Math.max(...others) >= 3) err(where + ': key is the longest choice by far');
    const ends = q.choices.map(c => /[.]$/.test(c.trim()));
    if (new Set(ends).size > 1) err(where + ': choices must share terminal punctuation');
    if (/:$/.test(strip(q.q).trim()) && q.choices.some(c => words(c) >= 4 && !/\.$/.test(c.trim()))) err(where + ': sentence-completing choices end with "."');
    if (!/\*\*Rule to reuse:\*\*/.test(q.exp || '')) err(where + ': explanation must end with **Rule to reuse:**');
    if (/\b(choice|option|answer) [A-D]\b|\([A-D]\)|\b[A-D] is (correct|wrong)/.test(q.exp || '')) err(where + ': explanation names a choice by position');
    if (/\b(not|except)\b/.test(q.q) && /which .* (not|except)\b/i.test(q.q)) err(where + ': capitalize NOT / EXCEPT');
  };
  for (const p of set.passages) {
    const pw = words(p.passage);
    if (pw < 150 || pw > 400) err(p.id + `: passage ${pw} words`);
    // Every question twins a card of one AAMC passage of the map, as in tools/test-twins.cjs; the set's one added 4D
    // question (S.OUTSIDE_TWINS) may join a passage.
    const twins = p.questions.map(q => q.twin).filter(t => t !== S.OUTSIDE_TWINS[sid]), m = map.passages.find(mp => twins.every(t => mp.ids.includes(t)));
    if (!m) err(p.id + ': its questions do not all twin one AAMC passage of the map (plus the set\'s one added 4D question)');
    for (const q of p.questions) one(q, p);
  }
  for (const q of set.standalones) one(q, null);
  const missing = [...rowOf.keys()].filter(t => !used.has(t));
  if (missing.length && !partial) err('map slots not written: ' + missing.join(', '));
  if (choiceW.length) { const md = median(choiceW), p9 = p90(choiceW); if (md > 3 || p9 > 9) err(`choice words: median ${md} (≤ 3), 90th percentile ${p9} (≤ 9)`); }
  return errs;
}
const want = process.argv.slice(2).length ? process.argv.slice(2) : (fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5)) : []);
let bad = 0;
for (const id of want) { const e = check(id); bad += e.length; console.log(id + ': ' + (e.length ? e.length + ' problem(s)\n  ' + e.join('\n  ') : 'OK')); }
process.exit(bad ? 1 : 0);
