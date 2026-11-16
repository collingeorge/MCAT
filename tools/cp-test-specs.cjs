// Reads the flashcard specs in docs/cp-test-specs/PE{1,3,4,5,6}-spec.md: for each C/P question of AAMC Practice
// Exams 1, 3, 4, 5 and 6, its labels (category, discipline, skill, difficulty, card match) and its "Needs" items.
// A question line:   "* Q4 · 5C OCH S4 Difficult · Partial"
// Its needs:         "   * Needs: <one item>"  or  "   * Needs:" followed by one item per "      * " bullet;
//                    deeper bullets (and numbered lines) belong to the item above them.
// Item n of question Q of exam peX is referred to as "peX-cp:Q#n" (n counts from 1), e.g. pe4-cp:58#2.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const DIR = path.join(__dirname, '..', 'docs', 'cp-test-specs');
const EXAMS = ['pe1', 'pe3', 'pe4', 'pe5', 'pe6'];
const DISC = { OCH: 'organic_chem', GCH: 'gen_chem', BCH: 'biochemistry', PHY: 'physics', BIO: 'biology' };

function parse(exam) {
  const lines = fs.readFileSync(path.join(DIR, exam.toUpperCase() + '-spec.md'), 'utf8').replace(/\r\n?/g, '\n').split('\n');
  const questions = [];
  let q = null, inNeeds = false;
  for (const line of lines) {
    const head = /^\* Q(\d+) · ([45][A-E]) (OCH|GCH|BCH|PHY|BIO) S([1-4]) (Easy|Moderate|Difficult|Expert) · (✓|Partial)\s*$/.exec(line);
    if (head) {
      q = { src: exam + '-cp:' + head[1], n: Number(head[1]), aamc: head[2], disc: DISC[head[3]], skill: 'SIRS ' + head[4], diff: head[5], match: head[6] === '✓' ? 'match' : 'partial', asked: '', items: [] };
      questions.push(q); inNeeds = false; continue;
    }
    if (!q) continue;
    if (/^\S/.test(line)) { q = null; inNeeds = false; continue; }   // a heading or a summary line ends the question
    const asked = /^ {3}\* Asked: (.*)$/.exec(line);
    if (asked) { q.asked = asked[1]; inNeeds = false; continue; }
    const needs = /^ {3}\* Needs:(.*)$/.exec(line);
    if (needs) { inNeeds = true; if (needs[1].trim()) q.items.push(needs[1].trim()); continue; }
    if (!inNeeds || !line.trim()) continue;
    const item = /^ {6}\* (.*)$/.exec(line);
    if (item) q.items.push(item[1].trim());
    else if (/^ {7,}\S/.test(line) && q.items.length) q.items[q.items.length - 1] += '\n' + line.trim();
  }
  return questions;
}

let cache = null;
function load() {
  if (cache) return cache;
  const questions = EXAMS.flatMap(parse);
  const bySrc = new Map(questions.map(q => [q.src, q]));
  const items = questions.flatMap(q => q.items.map((text, i) => ({ ref: q.src + '#' + (i + 1), src: q.src, n: i + 1, text })));
  cache = { questions, bySrc, items, EXAMS };
  return cache;
}
module.exports = { load, DISC };

if (require.main === module) {
  const { questions, items } = load();
  for (const e of EXAMS) { const qs = questions.filter(q => q.src.startsWith(e + '-')); console.log(e, qs.length, 'questions,', qs.reduce((n, q) => n + q.items.length, 0), 'items,', qs.filter(q => q.match === 'partial').length, 'partial'); }
  console.log('total', questions.length, 'questions,', items.length, 'items');
  if (process.argv[2]) for (const q of questions.filter(q => q.src === process.argv[2])) console.log(JSON.stringify(q, null, 1));
}
