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

const numsOf = t => new Set((String(t).replace(/<\/?[a-z][a-z0-9]*(?:\s[^<>]*)?\/?>|\*\*/gi, ' ').match(/(?<![\w.,])\d+(?:[.,]\d+)*(?![\w])/g) || []).map(n => n.replace(/,/g, '')));
const norm = t => String(t).toLowerCase().replace(/<\/?[a-z][a-z0-9]*(?:\s[^<>]*)?\/?>|\*\*/gi, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const grams = (t, n) => { const w = norm(t).split(' '), o = new Set(); for (let i = 0; i + n <= w.length; i++) o.add(w.slice(i, i + n).join(' ')); return o; };
const STOP = new Set('a an the of to in on at by for from with and or but so as is are was were be been has have had it its this that these those than then which who what when where why how not no nor do does did can could would will may might must should only also both each either neither any all more most less least very into onto over under up down out about there their they them he she his her we our you your one'.split(' '));
const stem = w => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w);
const content = t => new Set(norm(t).split(' ').filter(w => w.length > 1 && !STOP.has(w)).map(stem));
const paraphrase = (a, b) => { const A = content(a), B = content(b); if (A.size < 3 || B.size < 3) return false;
  const shared = [...A].filter(w => B.has(w)).length; return shared / Math.min(A.size, B.size) >= 0.6; };

// AAMC's own words are wanted (the user, 2026-11-19): a twin uses the same terms, stem phrasing and kinds of choices
// as the AAMC question, and changes only the content (molecule, numbers, system). Blocked: a copied full stem, a copied
// full choice set, and the AAMC question's data numbers (constants and standard values are fine). The passage text
// stays original. (A key equal to the real answer is checked where the keys are compared.)
// Constants and standard values any question may use.
const STANDARD = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '14', '22.4', '9.8', '9.81', '10.0', '6.02', '6.022', '8.314', '0.0821', '0.08206', '3.0', '3.00', '2.998', '6.63', '6.626', '1.6', '1.60', '1.602',
  '96500', '96485', '273', '273.15', '298', '760', '101.3', '101', '1.01', '1.013', '4.18', '4.184', '1.0', '1.00', '0.5', '0.50', '100', '1000', '343', '1240', '8.85', '8.99', '9.0', '6.67', '1.67', '9.11', '25', '37', '7.0', '7.4', '11', '12', '13', '15', '16', '17', '18', '32', '44', '4.2',   // periodic groups 1–18 too
  // IR band positions (cm⁻¹)
  '1650', '1700', '1710', '1715', '1720', '1735', '1750', '2100', '2200', '2250', '2850', '2950', '3000', '3200', '3300', '3400', '3500', '3600']);
const dataOnly = set => new Set([...set].filter(n => !STANDARD.has(n)));
// A copied full stem: at least 80% of the stem's 6-word runs (stems of 8+ words) appear in the other stem.
function copiedStem(a, b) {
  const A = grams(a, 6), B = grams(b, 6);
  if (norm(a) === norm(b)) return true;
  if (norm(a).split(' ').length < 8 || !A.size) return false;
  return [...A].filter(g => B.has(g)).length / A.size >= 0.8;
}
// Choices compared with their math kept: <, >, ≤, ≥, √, ∝, ± and signs are part of the answer ("ΔH < 0" is not "ΔH > 0").
const SYM = { '<': ' lt ', '>': ' gt ', '≤': ' le ', '≥': ' ge ', '√': ' sqrt ', '∝': ' prop ', '±': ' pm ', '−': ' minus ', '-': ' minus ', '+': ' plus ', '=': ' eq ', '²': ' sq ', '³': ' cube ' };
const cnorm = t => norm(String(t).replace(/[<>≤≥√∝±−\-+=²³]/g, ch => SYM[ch]));
// Generic label sets (I–IV, A–D, Roman-numeral combinations such as "I and III only") are AAMC's format, not content.
const LABEL = /^(?:(?:[ivx]+|[a-d])(?:\s*(?:,|and|or|&)\s*(?:[ivx]+|[a-d]))*(?:\s+only)?|none of these|all of these)\.?$/i;
// A copied full choice set: every choice of one is a choice of the other (normalized, math kept), unless the set is
// only labels.
const copiedChoices = (a, b) => a.length === b.length && !a.every(x => LABEL.test(String(x).trim())) && a.every(x => b.some(y => cnorm(x) === cnorm(y)));
function twinProblems(q, p, card) {
  const out = [], cardNums = dataOnly(numsOf(card.q + ' ' + card.choices.join(' ')));
  for (const ch of [q.q, ...q.choices]) { const shared = [...dataOnly(numsOf(ch))].filter(n => cardNums.has(n)); if (shared.length) out.push(`"${ch.slice(0, 60)}" repeats the card's data number ${shared.join(', ')}`); }
  if (copiedChoices(q.choices, card.choices)) out.push('copies the card\'s full choice set');
  if (copiedStem(q.q, card.q)) out.push('copies the card\'s full stem');
  if (p) { const cg = grams(card.q + ' ' + (card.exp || ''), 6), shared = [...grams(p.passage, 6)].filter(g => cg.has(g)); if (shared.length) out.push('the passage shares a 6-word run with the card: "' + shared[0] + '" (passage text stays original)'); }
  const text = [q.q, ...q.choices, q.exp, p ? p.passage + ' ' + (p.title || '') : ''].join(' ');
  for (const [topic, re] of Object.entries(BLOCKLIST)) if (re.test(text)) out.push('uses untaught topic: ' + topic);
  return out;
}
module.exports = { BLOCKLIST, numsOf, norm, cnorm, grams, content, paraphrase, twinProblems, STANDARD, dataOnly, copiedStem, copiedChoices };
