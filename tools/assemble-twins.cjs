// Assembles the rebuilt sets (tools/twin-build/diag.json, quiz1.json … quiz6.json; each checked by
// tools/check-twin-set.cjs) into data/cp-diagnostic.js and data/cp-pool.js. Run: node tools/assemble-twins.cjs
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..'), dir = path.join(__dirname, 'twin-build');
const read = id => JSON.parse(fs.readFileSync(path.join(dir, id + '.json'), 'utf8'));
const strip = s => { const o = { ...s }; delete o._note; return o; };
const d = strip(read('diag'));
const diag = { id: 'cp_diag2', title: 'Chem/Phys Diagnostic', timeMin: 95, order: d.order, passages: d.passages, standalones: d.standalones };
fs.writeFileSync(path.join(root, 'data/cp-diagnostic.js'),
  '// Chem/Phys Diagnostic: original passages and stand-alone questions in the AAMC C/P section format (10 passages +\n' +
  '// 15 stand-alones, 59 questions, 95 minutes, in the exam\'s order). Every question is a twin of one studied card\n' +
  '// (`twin`: the card\'s src): the same concept, method, thing asked and kinds of traps, with new numbers, scenario and\n' +
  '// wording. Map: tools/twin-map.json. Not AAMC material.\n' +
  'const CP_DIAG = ' + JSON.stringify(diag, null, 1) + ';\n');
const pool = [1, 2, 3, 4, 5, 6].map(i => { const q = strip(read('quiz' + i)); return { id: 'cp_half_' + i, title: 'Chem/Phys Quiz ' + i, order: q.order, passages: q.passages, standalones: q.standalones }; });
fs.writeFileSync(path.join(root, 'data/cp-pool.js'),
  '// Chem/Phys daily quizzes: six original half-sections in the AAMC layout (P P [4] P P P [4]: 5 passages with 22\n' +
  '// questions + 8 stand-alones, 30 in all), for the Section Mastery end-of-day test. Every question is a twin of one studied\n' +
  '// card (`twin`: the card\'s src). Map: tools/twin-map.json. Not AAMC material.\n' +
  'const CP_POOL = ' + JSON.stringify(pool, null, 1) + ';\n');
console.log('wrote data/cp-diagnostic.js (' + diag.id + ') and data/cp-pool.js (' + pool.length + ' quizzes)');
