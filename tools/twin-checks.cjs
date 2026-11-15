// Shared twin checks (tools/test-twins.cjs and tools/check-twin-set.cjs): the untaught-topic blocklist, and the
// near-copy checks between a question and the card it twins.
'use strict';
const assert = require('node:assert/strict');
const S = require('./twin-sources.cjs');
// Topics no twin-source card teaches (checked against the cards below, so a newly taught topic must leave the list).
const BLOCKLIST = {
  'Hall effect': /hall effect/i, 'electromagnetic induction': /faraday.s law|induced emf|electromagnetic induction|lenz/i,
  transistor: /transistor/i, 'Diels–Alder': /diels/i, Wittig: /wittig/i, 'Friedel–Crafts': /friedel/i, ozonolysis: /ozonolys/i,
  'uncertainty principle': /heisenberg|uncertainty principle/i, 'de Broglie wavelength': /de broglie/i, 'Compton scattering': /compton/i,
  'X-ray diffraction': /x-ray (crystallograph|diffraction)|bragg/i, 'thin-film interference': /thin.film/i, 'moment of inertia': /moment of inertia/i,
  'escape velocity': /escape velocity/i, 'Kepler’s laws': /kepler/i, 'Poiseuille’s law': /poiseuille/i, 'Gibbs–Helmholtz': /gibbs.helmholtz/i,
  'Nernst equation': /nernst/i, 'Raoult’s law': /raoult/i, 'EDTA titration': /\bedta\b|complexometric/i, 'Biot–Savart / μ₀': /μ₀|biot.savart/i,
  'LC resonance': /\bLC circuit/i, 'blackbody radiation': /blackbody|stefan.boltzmann|wien.s law/i, 'adiabatic process': /adiabatic/i,
  'heat engines': /carnot|heat engine/i, 'Hooke’s law': /spring constant|hooke/i };
const cardText = c => JSON.stringify([c.q, c.choices, c.exp, c.how, c.teach]);
for (const [t, re] of Object.entries(BLOCKLIST)) {
  const hit = Object.values(S.cards).find(x => re.test(cardText(x.card)));
  assert(!hit, `blocklisted topic "${t}" is taught by ${hit && hit.id}: remove it from the blocklist`);
}

const numsOf = t => new Set((String(t).replace(/<[^>]+>|\*\*/g, ' ').match(/(?<![\w.,])\d+(?:[.,]\d+)*(?![\w])/g) || []).map(n => n.replace(/,/g, '')));
const norm = t => String(t).toLowerCase().replace(/<[^>]+>|\*\*/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const grams = (t, n) => { const w = norm(t).split(' '), o = new Set(); for (let i = 0; i + n <= w.length; i++) o.add(w.slice(i, i + n).join(' ')); return o; };
const STOP = new Set('a an the of to in on at by for from with and or but so as is are was were be been has have had it its this that these those than then which who what when where why how not no nor do does did can could would will may might must should only also both each either neither any all more most less least very into onto over under up down out about there their they them he she his her we our you your one'.split(' '));
const stem = w => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w);
const content = t => new Set(norm(t).split(' ').filter(w => w.length > 1 && !STOP.has(w)).map(stem));
const paraphrase = (a, b) => { const A = content(a), B = content(b); if (A.size < 3 || B.size < 3) return false;
  const shared = [...A].filter(w => B.has(w)).length; return shared / Math.min(A.size, B.size) >= 0.6; };

// Problems with question q (in passage p, or null) as a twin of card: numbers, shared or paraphrased choices,
// a shared 6-word run with the card's stem, untaught topics.
function twinProblems(q, p, card) {
  const out = [], cardNums = numsOf(card.q + ' ' + card.choices.join(' '));
  for (const ch of q.choices) { const shared = [...numsOf(ch)].filter(n => cardNums.has(n)); if (shared.length) out.push(`choice "${ch}" repeats the card's number ${shared.join(', ')}`); }
  for (const ch of q.choices) if (card.choices.some(c => norm(c) === norm(ch))) out.push(`choice "${ch}" is one of the card's choices`);
  for (const ch of q.choices) { const c = card.choices.find(c => paraphrase(ch, c)); if (c) out.push(`choice "${ch}" paraphrases the card's "${c}"`); }
  const cg = grams(card.q, 6), shared = [...grams(q.q + ' ' + (p ? p.passage : ''), 6)].filter(g => cg.has(g));
  if (shared.length) out.push('shares a 6-word run with the card: "' + shared[0] + '"');
  const text = [q.q, ...q.choices, q.exp, p ? p.passage + ' ' + (p.title || '') : ''].join(' ');
  for (const [topic, re] of Object.entries(BLOCKLIST)) if (re.test(text)) out.push('uses untaught topic: ' + topic);
  return out;
}
module.exports = { BLOCKLIST, numsOf, norm, grams, content, paraphrase, twinProblems };
