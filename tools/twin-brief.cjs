// Prints, for one set of the twin map, every slot and the full twin card a writer needs: stem, choices and key,
// explanation, walkthrough (what is asked, what to know, each step with its calculations and struck choices, the
// trap), its "Rule to reuse" and any figure. Run: node tools/twin-brief.cjs quiz1
'use strict';
const fs = require('node:fs');
const S = require('./twin-sources.cjs');
const MAP = JSON.parse(fs.readFileSync(__dirname + '/twin-map.json', 'utf8'));
const id = process.argv[2], set = MAP.sets[id], spec = S.SETS.find(s => s.id === id);
if (!set) { console.error('usage: node tools/twin-brief.cjs <diag|quiz1..quiz6>'); process.exit(1); }
const ruleOf = c => { const t = (c.teach || []).map(x => x.text).find(x => /Rule to reuse/.test(x)); if (t) return t.replace(/^.*?\*\*Rule to reuse:\*\*\s*/, '');
  const k = c.how && c.how.know ? c.how.know.split('\n')[0].replace(/^[•\s]+/, '') : null; return k ? '(no Rule line; use the walkthrough\'s key relation) ' + k : '(no walkthrough; follow the explanation)'; };
const show = (r, slot) => {
  const x = S.cards[r.twin], c = x.card;
  console.log(`\n### ${slot} · twin ${r.twin} · ${r.aamc} · ${r.disc} · ${r.skill} · ${r.diff}`);
  console.log('CARD STEM: ' + c.q);
  console.log('CARD CHOICES: ' + c.choices.map((ch, i) => (i === c.ans ? '[KEY] ' : '') + ch).join(' | '));
  if (c.fig || c.chart) console.log('CARD FIGURE: ' + JSON.stringify(c.chart || c.fig).slice(0, 400));
  console.log('CARD EXPLANATION: ' + c.exp);
  if (c.how) {
    console.log('WALKTHROUGH ask: ' + c.how.ask);
    console.log('WALKTHROUGH know: ' + c.how.know);
    c.how.steps.forEach((s, i) => console.log(`  step ${i + 1}: ${s.text}` + (s.calc ? '  CALC: ' + s.calc.join(' ; ') : '') + (s.strike ? '  STRIKES: ' + s.strike.join(' | ') : '')));
    if (c.how.trap) console.log('TRAP: ' + c.how.trap);
  }
  console.log('RULE TO REUSE: ' + ruleOf(c));
};
console.log(`# ${id}: layout ${spec.layout.join(' ')}; passages in this order fill the P slots (sizes ${set.passages.map(p => p.rows.length).join(', ')})`);
set.passages.forEach((p, i) => { console.log(`\n## Passage ${i + 1}: twins AAMC ${p.cluster}`); p.rows.forEach((r, k) => show(r, `P${i + 1}.Q${k + 1}`)); });
console.log('\n## Stand-alones'); set.standalones.forEach((r, i) => show(r, 'SA' + (i + 1)));
