'use strict';
// ════════════════════════════════════════════════════════════════
//  MCAT Study App — application logic
//  Question data is defined in data/*.js, which load before this file.
// ════════════════════════════════════════════════════════════════

// ── Utilities ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const DAY = 86400000;
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const REPO_URL = 'https://github.com/collingeorge/MCAT';

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// The AAMC lists numeric answer choices in order. A choice set that is all numbers in one unit (e.g. "0.15 m",
// "1.2 × 10²⁰ Hz", "−2", "10,000 Cal", "25%", "1/8", or "50 μM" next to "3.0 mM") is shown from lowest to highest;
// any other set is shuffled.
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '' };
const SI = { p: 1e-12, n: 1e-9, μ: 1e-6, m: 1e-3, k: 1e3 };
function choiceNumber(c) {
  const s = String(c).trim().replace(/(\d),(?=\d{3}\b)/g, '$1');
  const m = /^([+−-]?)(?:(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?(?:\s*×\s*10([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?|10([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))(?:\s*([%°])|\s+(\S.*))?$/.exec(s);
  if (!m) return null;
  const pow = e => (e ? 10 ** Number([...e].map(ch => SUP[ch]).join('')) : 1);
  let v = m[2] != null ? Number(m[2]) / (m[3] ? Number(m[3]) : 1) * pow(m[4]) : pow(m[5]);
  if (m[1] && m[1] !== '+') v = -v;
  let unit = m[6] || m[7] || '';
  const pre = /^([pnμmk])((?:g|L|M|J|W|V|A|Pa|Hz|s|m|mol|Ω|C|N|eV)(?:\/.+)?)$/.exec(unit);
  if (pre) { v *= SI[pre[1]]; unit = pre[2]; }
  return { v, unit };
}
function choiceOrder(choices) {
  const idx = choices.map((_, i) => i), nums = choices.map(choiceNumber);
  if (nums.length > 1 && nums.every(n => n && Number.isFinite(n.v) && n.unit === nums[0].unit)) return idx.sort((a, b) => nums[a].v - nums[b].v);
  return shuffled(idx);
}
// Stable 53-bit string hash (cyrb53) used for question ids
function hashId(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// Inline formatting for authored text: **bold** and cloze blanks
function fmt(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_{3,}/g, '<span class="blank" aria-label="blank"></span>');
}
function paragraphs(text) {
  return String(text ?? '').split(/\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${fmt(p)}</p>`).join('');
}
function fmtTime(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
}
const pct = (c, t) => (t ? Math.round((c / t) * 100) : 0);
function plural(n, word) { return n.toLocaleString() + ' ' + word + (n === 1 ? '' : 's'); }
function download(filename, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function issueUrl(context, stem) {
  const title = `Content issue: ${String(stem).replace(/<[^>]+>/g, '').slice(0, 80)}`;
  const body = `**Where:** ${context}\n\n**Question:** ${String(stem).replace(/<[^>]+>/g, '')}\n\n**What looks wrong:**\n\n**Source (textbook/AAMC page), if you have one:**\n`;
  return `${REPO_URL}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

// ── Storage (versioned keys; every access is guarded) ─────────
function storageWarning(message) {
  const el = $('storage-notice');
  if (el) { el.hidden = false; el.textContent = message; }
}
function storedShape(value, fallback) {
  if (fallback === undefined) return true;
  if (value === null) return fallback === null;
  if (Array.isArray(fallback)) return Array.isArray(value);
  if (fallback !== null && typeof fallback === 'object') return typeof value === 'object' && !Array.isArray(value);
  if (fallback === null) return typeof value === 'object' && !Array.isArray(value);
  return typeof value === typeof fallback;
}
const OBJECT_MAPS = new Set(['mcat2_evidence', 'mcat2_srs', 'mcat2_planned_passages', 'mcat2_calibration', 'mcat2_stats', 'mcat2_mastery', 'mcat2_passages', 'mcat2_exposures', 'mcat2_recall_days', 'mcat2_memory']);
// Keys holding numbers rather than records: keep only finite numbers.
const finiteList = v => (Array.isArray(v) ? v.filter(Number.isFinite) : []);
const NUMBER_SHAPES = {
  mcat2_fluency: v => (isRecord(v) ? Object.fromEntries(Object.entries(v).filter(([, a]) => Array.isArray(a)).map(([d, a]) => [d, finiteList(a)])) : {}),
  mcat2_daily: v => (isRecord(v) ? Object.fromEntries(Object.entries(v).filter(([, n]) => Number.isFinite(n))) : {}),
  mcat2_recent: v => finiteList(v),
};
const RECORD_LOGS = new Set(['mcat2_errors', 'mcat2_final_two', 'mcat2_passage_evidence', 'mcat2_external_passages', 'mcat2_exam_history', 'mcat2_official', 'mcat2_retention', 'mcat2_study_path', 'mcat2_score_history']);
// Score fields from synced logs are rendered as numbers; anything else becomes null.
const finiteOrNull = v => (Number.isFinite(v) ? v : null);
const isRecord = v => !!v && typeof v === 'object' && !Array.isArray(v);
const RECORD_FIELDS = {
  mcat2_exam_history: r => typeof r.examId === 'string' && Number.isFinite(r.date) ? { ...r, total: finiteOrNull(r.total),
    sections: Array.isArray(r.sections) ? r.sections.filter(isRecord).map(s => ({ id: typeof s.id === 'string' ? s.id : null, scaled: finiteOrNull(s.scaled), pct: finiteOrNull(s.pct) })) : [] } : null,
  mcat2_score_history: r => /^\d{4}-\d{2}-\d{2}$/.test(r.day) ? { day: r.day, total: finiteOrNull(r.total),
    sections: isRecord(r.sections) ? Object.fromEntries(Object.entries(r.sections).map(([k, v]) => [k, finiteOrNull(v)])) : {} } : null,
};
// A saved full-length attempt is shown only if its section results are numbers.
function validExamAttempt(a) {
  if (!isRecord(a) || !Number.isInteger(a.ei) || !FULL_EXAMS[a.ei] || !Array.isArray(a.results)) return null;
  const nums = x => x == null || (isRecord(x) && ['correct', 'total', 'pct', 'scaled'].every(k => Number.isFinite(x[k])) && (x.timeMs == null || Number.isFinite(x.timeMs)));
  return a.results.every(nums) && Array.isArray(a.answers) && Array.isArray(a.orders) ? a : null;
}
const store = {
  // batch(fn): writes inside fn are kept in memory and written once per key at the end (a finished test or exam
  // section records dozens of answers; each would otherwise rewrite the same large keys).
  _batch: null,
  batch(fn) {
    if (store._batch) return fn();
    store._batch = new Map();
    try { return fn(); } finally { const b = store._batch; store._batch = null; b.forEach((v, k) => store.set(k, v)); }
  },
  get(key, fallback) {
    if (store._batch && store._batch.has(key)) return store._batch.get(key);
    try {
      const raw = localStorage.getItem(window.McatAccount?.storageKey(key) || key);
      if (!raw) return fallback;
      const value = JSON.parse(raw);
      if (!storedShape(value, fallback)) throw new Error('Unexpected saved-data format');
      // Record logs can arrive from another device; drop entries that are not objects.
      if (OBJECT_MAPS.has(key) && isRecord(value)) { for (const k in value) if (!isRecord(value[k])) delete value[k]; return value; }
      if (NUMBER_SHAPES[key]) return NUMBER_SHAPES[key](value);
      if (!Array.isArray(value) || !RECORD_LOGS.has(key)) return value;
      const rows = value.filter(isRecord), shape = RECORD_FIELDS[key];
      return shape ? rows.map(shape).filter(Boolean) : rows;
    } catch (e) { storageWarning('Some saved progress could not be read. You can keep studying, but check your browser storage settings.'); return fallback; }
  },
  set(key, value) { if (store._batch) { store._batch.set(key, value); return; } try { const storageKey=window.McatAccount?.storageKey(key) || key, raw=JSON.stringify(value); if(localStorage.getItem(storageKey)!==raw){localStorage.setItem(storageKey,raw);store.rev=(store.rev||0)+1;if(key===KEYS.mem)memCache={raw,mem:value};window.McatAccount?.changed(key);} } catch (e) { storageWarning('Progress could not be saved. Keep this tab open and check browser storage before leaving.'); } },
  del(key) { if (store._batch) store._batch.delete(key); try { const storageKey=window.McatAccount?.storageKey(key) || key;if(localStorage.getItem(storageKey)!=null){localStorage.removeItem(storageKey);store.rev=(store.rev||0)+1;window.McatAccount?.changed(key);} } catch (e) { storageWarning('Saved data could not be removed. Check browser storage settings.'); } },
};
const KEYS = {
  retention:'mcat2_retention', exposures:'mcat2_exposures', passageEvidence:'mcat2_passage_evidence', official:'mcat2_official',
  recallDays: 'mcat2_recall_days',
  dailyPlan: 'mcat2_daily_plan',             // TODAY checklist: { days: {day: {type, newQuota, newDone, passQuota, passDone, done}}, passageReviews, fullLengths, deferred, reviewed }
  externalPassages: 'mcat2_external_passages', // [{t, day, subj, source, n, correct, first}]
  plannedPassages: 'mcat2_planned_passages',
  diagnostic: 'mcat2_diagnostic',
  studyPath: 'mcat2_study_path',
  subjectPath: 'mcat2_subject_path',   // Section Mastery path (subj = section id: cp, bb, ps): { goal, current, tests: [...], perDay, days: {day: {subj, topics, flashT, guidedT, lessonsN, seen, misses, reviewed}}, passed: {subj: day} }
  finalTwo: 'mcat2_final_two',
  prefs: 'mcat2_prefs',
  stats: 'mcat2_stats',        // { "subject|tag": {c, t} }
  srs: 'mcat2_srs',            // { questionId: {box, due, seen, right} }
  flags: 'mcat2_flags',        // { questionId: true }
  passages: 'mcat2_passages',  // { passageId: {attempts, last, best} }
  examProgress: id => 'mcat2_exam_' + id,
  examLast: id => 'mcat2_exam_last_' + id,
  examHistory: 'mcat2_exam_history',
  evidence: 'mcat2_evidence',        // { discipline: {passage:{c,t}, exam:{c,t}} }
  mem: 'mcat2_memory',               // { questionId: {S, D, last, seen, right, lapses, b, conf, confidentMiss} }
  mastery: 'mcat2_mastery',          // { "subject|tag": {r, n} }
  recent: 'mcat2_recent',            // last 30 answers (1/0), for difficulty tuning
  errors: 'mcat2_errors',            // mistake log: [{t, id, disc, key, type, chosen, answer, src}]
  calib: 'mcat2_calibration',        // { discipline: { knew|unsure|guess|none: {c, t} } }
  plan: 'mcat2_plan',                // { date, days, minutes, start, seenAtStart }
  daily: 'mcat2_daily',              // { 'YYYY-MM-DD': answers }
  fluency: 'mcat2_fluency',          // { discipline: [ms of recent correct recall answers] }
  scoreHistory: 'mcat2_score_history',
};

// ════════════════════════════════════════════════════════════════
//  QUESTION BANK ASSEMBLY & TAXONOMY
// ════════════════════════════════════════════════════════════════
// Section labels for the card banks (the recall-deck subject taxonomy was removed with the decks).
const SUBJECT_LABEL = Object.create(null);
// AAMC Question Bank Flashcards: a separate section. Its questions never enter QB or QB_BY_ID, so they
// are never mixed into recall, Smart Session, mixes, reviews, drills, the TODAY plan or score estimates.
const AAMC_SECTION = { id: 'aamc_qb', label: 'AAMC Question Bank Flashcards', groups: [
  { label: 'Biology Question Pack, Vol. 1', tags: ['Cells, Membranes & Transport', 'Genetics, DNA & Gene Expression', 'Evolution & Microbiology', 'Organ Systems & Physiology', 'Metabolism & Enzymes', 'Passage & Data Skills'] },
  { label: 'Chemistry Question Pack', tags: ['Atoms, Periodic Trends & Bonding', 'Molecular Structure & Intermolecular Forces', 'Stoichiometry, Solutions & Gases', 'Acids, Bases & Solubility', 'Thermodynamics, Kinetics & Equilibrium', 'Electrochemistry & Redox', 'Organic Chemistry & Lab Techniques', 'AAMC Test Concepts'] },
  { label: 'Physics Question Pack', tags: ['Kinematics, Forces & Energy', 'Fluids', 'Electricity & Magnetism', 'Waves & Sound', 'Light & Optics', 'Atomic & Nuclear Physics'] },
  { label: 'Independent Question Bank: Psychology & Sociology', tags: ['Sensation, Perception & Cognition', 'Learning, Memory & Development', 'Motivation, Emotion & Personality', 'Social Psychology', 'Sociology & Social Structure', 'Health, Inequality & Research Methods'] },
  { label: 'Chem/Phys Biochemistry', tags: ['Amino Acids & Proteins', 'Enzymes & Kinetics', 'Carbohydrates, Lipids & Nucleic Acids', 'Bioenergetics'] },
  { label: 'Independent Question Bank: Biochemistry', tags: ['Proteins & Enzymes', 'Metabolism & Bioenergetics', 'Nucleic Acids, Membranes & Lab Techniques'] },
  { label: 'CARS Question Pack, Vol. 1', tags: ['CARS: Foundations of Comprehension', 'CARS: Reasoning Within the Text', 'CARS: Reasoning Beyond the Text'] },
].map(g => ({ label: g.label, chips: g.tags.map(t => ({ label: t, tags: [t] })) })) };
// Universal Rules Quiz cards live in the same AAMC pool (same IDs and saved answers) but are studied from
// AAMC Prep → Rules & Passage Prep, not from the Question Bank packs.
const AAMC_RULES_TAGS = ['Universal Rules: Reading Data', 'Universal Rules: Test Strategy', 'Universal Rules: Chemistry', 'Universal Rules: Biochemistry', 'Universal Rules: Physics'];

// The app's own recall decks were removed: TODAY and every study tool use only the AAMC QBank cards,
// the Practice Exam cards, the C/P diagnostic and quiz passages and the full-length exams.
// QB stays as an empty pool so saved recall progress is kept (and ignored) and older code paths stay safe.
const QB = [];
const QB_BY_ID = new Map();

// AAMC section pool, with its own id map (kept out of QB_BY_ID so the TODAY plan, study path and
// evidence modules, which look questions up there, never pick these questions up)
const AQB = [];
const AQB_BY_ID = new Map();
const AQB_KEY_COUNTS = Object.create(null);
[typeof QB_AAMC_BIO === 'undefined' ? [] : QB_AAMC_BIO, typeof QB_AAMC_CHEM === 'undefined' ? [] : QB_AAMC_CHEM,
  typeof QB_AAMC_PHYS === 'undefined' ? [] : QB_AAMC_PHYS, typeof QB_AAMC_BIOCHEM === 'undefined' ? [] : QB_AAMC_BIOCHEM, typeof QB_AAMC_IQB === 'undefined' ? [] : QB_AAMC_IQB,
  typeof QB_AAMC_CARS === 'undefined' ? [] : QB_AAMC_CARS, typeof QB_AAMC_RULES === 'undefined' ? [] : QB_AAMC_RULES].flat().forEach(q => {
  let id = 'aamc-' + hashId(q.s + '|' + (q.idStem || q.q));
  while (AQB_BY_ID.has(id)) id += 'x';
  Object.assign(q, { subj: AAMC_SECTION.id, key: AAMC_SECTION.id + '|' + q.s, id });
  AQB.push(q);
  AQB_BY_ID.set(id, q);
  AQB_KEY_COUNTS[q.key] = (AQB_KEY_COUNTS[q.key] || 0) + 1;
});
SUBJECT_LABEL[AAMC_SECTION.id] = AAMC_SECTION.label;
AAMC_SECTION.groups.forEach(g => g.chips.forEach(c => { c.keys = c.tags.map(t => AAMC_SECTION.id + '|' + t).filter(k => AQB_KEY_COUNTS[k]); }));
AAMC_SECTION.groups.forEach(g => { g.chips = g.chips.filter(c => c.keys.length); });
AAMC_SECTION.keys = AAMC_SECTION.groups.flatMap(g => g.chips.flatMap(c => c.keys));
const AAMC_RULES_KEYS = new Set(AAMC_RULES_TAGS.map(t => AAMC_SECTION.id + '|' + t));
const AQB_RULES = AQB.filter(q => AAMC_RULES_KEYS.has(q.key));   // Universal Rules Quiz
const AQB_QBANK = AQB.filter(q => !AAMC_RULES_KEYS.has(q.key));  // Question Bank cards
// Full-Length Prep: cards built from the AAMC full-length practice exams. Its own pool and tab, kept out of
// QB, the AAMC QBank section, recall, mixes, reviews, the TODAY plan and score estimates.
const FL_SECTION = { id: 'fl_prep', label: 'Full-Length Prep' };
const FLQ = [];
const FLQ_BY_ID = new Map();
const FL_TESTS = [];
SUBJECT_LABEL[FL_SECTION.id] = FL_SECTION.label;
// Indexes the Practice Exam cards once data/qb-aamc-fl.js has loaded (it loads on demand: see BANKS).
function buildFlq() {
  if (FLQ.length || typeof QB_AAMC_FL === 'undefined') return;
  QB_AAMC_FL.forEach(q => {
    let id = 'fl-' + hashId(q.s + '|' + (q.idStem || q.q));
    while (FLQ_BY_ID.has(id)) id += 'x';
    Object.assign(q, { subj: FL_SECTION.id, key: FL_SECTION.id + '|' + q.s, id });
    FLQ.push(q);
    FLQ_BY_ID.set(id, q);
  });
  FL_TESTS.push(...[...new Set(FLQ.map(q => q.s))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
}
// C/P Practice Test flashcards (data/cp-test-cards.js): original cards that teach what the C/P questions of AAMC
// Practice Exams 1, 3, 4, 5 and 6 need; each names its Practice Exam card(s) in `from`. TODAY's C/P flashcard step
// uses only these (masteryFlashPool in js/mastery.js). Their own pool, kept out of QB, the QBank section and
// Full-Length Prep. Loaded on demand (BANKS.cpt).
const CPT_SECTION = { id: 'cp_test', label: 'C/P Practice Test Flashcards' };
const CPTQ = [];
const CPTQ_BY_ID = new Map();
SUBJECT_LABEL[CPT_SECTION.id] = CPT_SECTION.label;
function buildCpt() {
  if (CPTQ.length || typeof CP_TEST_CARDS === 'undefined') return;
  CP_TEST_CARDS.forEach(q => {
    Object.assign(q, { subj: CPT_SECTION.id, key: CPT_SECTION.id + '|' + q.s });
    CPTQ.push(q);
    CPTQ_BY_ID.set(q.id, q);
  });
}
// ── Data banks loaded on demand ──
// Pages load only what every screen needs. The large banks below load the first time a screen uses them (and are
// cached offline by the service worker). BANK_COUNTS gives the home screen its numbers before they load;
// tools/test-pages.cjs checks them against the data.
// ASSET_V: the deploy's version (sw.js CACHE), added to every script the app loads on demand so the browser's HTTP
// cache never serves one from an earlier deploy. Written by tools/generate-pages.cjs; do not edit by hand.
const ASSET_V = '?v=mcat-v3.03-rule-out-back-2026-11-20';
const BANKS = { fl: ['data/qb-aamc-fl.js'], cp: ['data/cp-diagnostic.js', 'data/cp-pool.js'], prep: ['data/aamc-prep.js'], cpt: ['data/cp-test-cards.js', 'data/cp-rules.js'] };
const BANK_COUNTS = { fl: 354, flCp: 295, flTests: 6 };
const BANK_PRESENT = { fl: () => typeof QB_AAMC_FL !== 'undefined', cp: () => typeof CP_DIAG !== 'undefined' && typeof CP_POOL !== 'undefined', prep: () => typeof AAMC_PREP !== 'undefined', cpt: () => typeof CP_TEST_CARDS !== 'undefined' && typeof CP_RULES !== 'undefined' };   // both files of BANKS.cpt (the rules warm-up needs CP_RULES)
const bankDone = Object.create(null), bankLoading = Object.create(null);
function bankReady(name) {
  if (bankDone[name]) return true;
  if (!BANK_PRESENT[name] || !BANK_PRESENT[name]()) return false;
  bankDone[name] = true;
  if (name === 'fl') buildFlq();
  if (name === 'cpt') buildCpt();
  return true;
}
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src + ASSET_V;
    el.addEventListener('load', resolve);
    el.addEventListener('error', () => { el.remove?.(); reject(new Error(src + ' failed to load')); });
    document.head.appendChild(el);
  });
}
function ensureBank(name) {
  if (bankReady(name)) return Promise.resolve();
  if (bankLoading[name]) return bankLoading[name];
  bankLoading[name] = BANKS[name].reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve())
    .then(() => { bankLoading[name] = null; if (!bankReady(name)) throw new Error(name + ' did not load'); })
    .catch(e => { bankLoading[name] = null; throw e; });
  return bankLoading[name];
}
// Runs fn now if the bank is loaded, else after loading it (with a message if it cannot load, e.g. offline).
function withBank(name, fn) {
  if (bankReady(name)) return fn();
  ensureBank(name).then(fn).catch(() => { const el = $('page-notice'); if (el) { el.textContent = 'This part of the app could not load. Check your connection and try again.'; el.hidden = false; window.scrollTo(0, 0); } });
}
const flCount = () => (bankReady('fl') ? FLQ.length : BANK_COUNTS.fl);
const isFl = q => !!q && q.subj === FL_SECTION.id;
const isAamc = q => !!q && (q.subj === AAMC_SECTION.id || q.subj === FL_SECTION.id);
const isCpt = q => !!q && q.subj === CPT_SECTION.id;
const bankOf = q => (isCpt(q) ? CPTQ : isFl(q) ? FLQ : isAamc(q) ? AQB : QB);
const lookupQ = id => QB_BY_ID.get(id) || AQB_BY_ID.get(id) || FLQ_BY_ID.get(id) || CPTQ_BY_ID.get(id);
const countAamcKeys = keys => keys.reduce((n, k) => n + (AQB_KEY_COUNTS[k] || 0), 0);

// Lookup tables keyed by names that also appear in stored data are prototype-free, so a stored
// key such as "constructor" or "__proto__" can never match an inherited property. KEY_COUNTS stays empty (no
// recall decks), so saved recall statistics are kept but never counted.
const KEY_COUNTS = Object.create(null);
const KEY_LABEL = Object.create(null);
AAMC_SECTION.groups.forEach(g => g.chips.forEach(c => c.keys.forEach(k => { KEY_LABEL[k] = c.label; })));

// ════════════════════════════════════════════════════════════════
//  PASSAGES
// ════════════════════════════════════════════════════════════════
// Passages: the CARS passages the full-length exams use. The C/P diagnostic and daily-quiz passages are run only
// from TODAY. The Passages tab and its C/P practice passages (data/cp-practice.js) were removed in November 2026:
// their questions were not twins of the studied cards; TODAY is the only C/P path. Saved results for them stay in
// storage (ignored, never wiped).
const EXAM_CARS = [...(typeof CARS_PASSAGES === 'undefined' ? [] : CARS_PASSAGES), ...(typeof EXAM2_CARS_PASSAGES === 'undefined' ? [] : EXAM2_CARS_PASSAGES)];
const ALL_PASSAGES = [...EXAM_CARS];
const SKILL_LABEL = Object.assign(Object.create(null), {
  'SIRS 1': 'Skill 1: Knowledge of scientific concepts',
  'SIRS 2': 'Skill 2: Scientific reasoning & problem solving',
  'SIRS 3': 'Skill 3: Research design & execution',
  'SIRS 4': 'Skill 4: Data-based & statistical reasoning',
});
const PASSAGE_BY_ID = new Map(ALL_PASSAGES.map(p => [p.id, p]));
const EXAM_PASSAGE_IDS = new Set(FULL_EXAMS.flatMap(e => e.sections.flatMap(s => s.passageIds || [])));

// ════════════════════════════════════════════════════════════════
//  SCORING — AAMC percentile ranks in effect May 1, 2026 – Apr 30, 2027
//  (aamc.org "Percentile Ranks for the MCAT Exam"). Raw→scaled is an
//  estimate: the AAMC equates every test form separately.
// ════════════════════════════════════════════════════════════════
const SECTION_PERCENTILE = {
  cp:   { 118: 2, 119: 4, 120: 9, 121: 16, 122: 25, 123: 35, 124: 46, 125: 56, 126: 67, 127: 77, 128: 85, 129: 91, 130: 96, 131: 99, 132: 100 },
  cars: { 118: 1, 119: 3, 120: 8, 121: 15, 122: 25, 123: 37, 124: 50, 125: 62, 126: 74, 127: 84, 128: 90, 129: 95, 130: 98, 131: 99, 132: 100 },
  bb:   { 118: 1, 119: 4, 120: 8, 121: 15, 122: 23, 123: 32, 124: 43, 125: 53, 126: 64, 127: 75, 128: 84, 129: 90, 130: 96, 131: 98, 132: 100 },
  ps:   { 118: 1, 119: 3, 120: 6, 121: 10, 122: 17, 123: 25, 124: 34, 125: 44, 126: 54, 127: 65, 128: 76, 129: 85, 130: 92, 131: 97, 132: 100 },
};
const TOTAL_PERCENTILE = [
  [472, '<1'], [473, '<1'], [474, '<1'], [475, 1], [476, 1], [477, 2], [478, 2], [479, 3], [480, 4], [481, 5], [482, 6], [483, 8], [484, 9], [485, 11], [486, 12], [487, 14], [488, 16], [489, 18], [490, 20],
  [491, 23], [492, 25], [493, 28], [494, 31], [495, 33], [496, 36], [497, 39], [498, 42], [499, 45], [500, 48], [501, 52], [502, 55], [503, 58], [504, 61], [505, 64], [506, 67], [507, 71], [508, 74], [509, 76],
  [510, 79], [511, 82], [512, 84], [513, 86], [514, 89], [515, 91], [516, 92], [517, 94], [518, 95], [519, 96], [520, 97], [521, 98], [522, 99], [523, 99], [524, 99], [525, 100], [526, 100], [527, 100], [528, 100],
];
const TOTAL_PERCENTILE_MAP = Object.fromEntries(TOTAL_PERCENTILE);
// Approximate raw-% → scaled conversion, modeled on published AAMC practice-exam curves
const RAW_TO_SCALED = [[0, 118], [38, 118], [45, 119], [50, 120], [55, 121], [60, 122], [64, 123], [68, 124], [72, 125], [76, 126], [80, 127], [84, 128], [88, 129], [92, 130], [95, 131], [98, 132], [100, 132]];
function rawToScaled(p) {
  for (let i = 1; i < RAW_TO_SCALED.length; i++) {
    const [p1, s1] = RAW_TO_SCALED[i];
    if (p <= p1) {
      const [p0, s0] = RAW_TO_SCALED[i - 1];
      // The table's points are thresholds (84% is the first score that earns 128), so round down between them.
      return Math.floor(s0 + ((p - p0) / (p1 - p0 || 1)) * (s1 - s0) + 1e-9);
    }
  }
  return 132;
}
function ordinal(n) {
  if (typeof n !== 'number') return n;
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function scoreColor(scaled) {
  if (scaled >= 128) return 'var(--green)';
  if (scaled >= 125) return 'var(--navy)';
  if (scaled >= 122) return 'var(--amber)';
  return 'var(--red)';
}

// ════════════════════════════════════════════════════════════════
//  ADAPTIVE LEARNING ENGINE
//  1) Memory model (simplified FSRS): each question has a stability S —
//     days until the chance of recalling it falls to 90% — and a
//     difficulty D (1–10). Correctness, confidence and answer time update
//     both, so solid cards back off quickly and shaky ones return sooner.
//  2) Topic mastery (Elo-style): one ability rating per topic, updated
//     against each question's own difficulty.
//  3) Smart Session: due reviews + weakest high-yield topics + new
//     material, interleaved and pitched near ~80% predicted success.
// ════════════════════════════════════════════════════════════════
const TARGET_RETENTION = 0.9;
const sigmoid = x => 1 / (1 + Math.exp(-x));
const MASTERY_PRIOR = 0.8;          // starting topic rating (≈69% predicted)
const CONFIDENCE = [['guess', 'Guessed', 'G'], ['unsure', 'Unsure', 'U'], ['knew', 'Knew it', 'K']];

// Old fixed-interval history is converted once so nobody loses progress
// The memory record is the largest key (~0.5 MB) and is read many times per render. Reuse the parsed
// object while the stored text is unchanged; only updateMemory mutates it, and it saves immediately.
let memCache = { raw: null, mem: null };
function loadMem() {
  let raw = null;
  try { raw = localStorage.getItem(window.McatAccount?.storageKey(KEYS.mem) || KEYS.mem); } catch (e) { raw = null; }
  if (raw && raw === memCache.raw) return memCache.mem;
  const mem = store.get(KEYS.mem, null);
  if (mem) { memCache = { raw, mem }; return mem; }
  const days = [0.5, 1, 3, 7, 16, 35];
  const out = {};
  Object.entries(store.get(KEYS.srs, {})).forEach(([id, e]) => {
    const S = days[e.box] ?? 0.5;
    out[id] = { S, D: 5, last: (e.due || Date.now()) - S * DAY, seen: e.seen || 0, right: e.right || 0, lapses: Math.max(0, (e.seen || 0) - (e.right || 0)) };
  });
  store.set(KEYS.mem, out);
  return out;
}
function retrievability(m, now = Date.now()) {
  if (!m || !m.seen) return null;
  const days = Math.max(0, (now - m.last) / DAY);
  return Math.exp((Math.log(TARGET_RETENTION) * days) / Math.max(m.S, 0.05));
}
function itemPrior(q) {
  let b = 0;
  if ((q.q.match(/_{3,}/g) || []).length >= 2) b += 0.5;
  if (q.subj === 'equations') b += 0.3;
  return b;
}
function itemDifficulty(q, mem) {
  const m = (mem || loadMem())[q.baseId || q.id];
  return m && m.b != null ? m.b : itemPrior(q);
}
// Grade 0 = wrong, 1 = right but guessed (or slow with no rating), 2 = unsure, 3 = knew it
function gradeOf(right, conf, ms) {
  if (!right) return 0;
  if (conf) return { guess: 1, unsure: 2, knew: 3 }[conf];
  return ms > 30000 ? 1 : 2;
}
function updateMemory(q, right, conf, ms) {
  const mem = loadMem();
  const id = q.baseId || q.id;
  const now = Date.now();
  const m = mem[id] || { S: 0, D: 5 + itemPrior(q) * 2, last: now, seen: 0, right: 0, lapses: 0 };
  const delayed = m.seen > 0 && now - m.last >= LEARNING_DELAY;
  if (!right) m.delayedCorrect = 0;
  else if (delayed && conf !== 'guess') m.delayedCorrect = (m.delayedCorrect || 0) + 1;
  const g = gradeOf(right, conf, ms);
  if (!m.seen) m.S = [0.2, 0.6, 2, 5][g];
  else if (g === 0) { m.lapses++; m.S = Math.max(0.1, m.S * 0.25); }
  else {
    const R = retrievability(m, now);
    // Bigger gains for confident recalls, for harder-to-recall moments, and for easier cards
    const growth = [0, 1.3, 2.4, 3.6][g] * (1 + 1.5 * (1 - R)) * ((11 - m.D) / 6);
    // Rapid within-day repeats confirm practice, not long-term retention.
    const sameDay = localDay(new Date(m.last)) === localDay(new Date(now));
    m.S = Math.min(365, m.S * (sameDay ? Math.min(1.1, Math.max(1, growth)) : Math.max(1.1, growth)));
  }
  m.D = Math.min(10, Math.max(1, m.D + [1.2, 0.4, -0.2, -0.6][g]));
  m.seen++;
  if (right) m.right++;
  m.last = now;
  m.conf = conf || null;
  m.confidentMiss = !right && conf === 'knew';

  // Topic rating vs. item difficulty; a guessed right answer is only partial credit
  const mast = store.get(KEYS.mastery, {});
  const t = mast[q.key] || { r: MASTERY_PRIOR, n: 0 };
  const b = m.b != null ? m.b : itemPrior(q);
  const p = sigmoid(t.r - b);
  const y = right ? (g === 1 ? 0.6 : 1) : 0;
  const k = 0.6 / (1 + t.n / 15) + 0.15;
  t.r += k * (y - p) * (m.confidentMiss ? 1.25 : 1);
  t.n++;
  mast[q.key] = t;
  m.b = b - 0.15 * (y - p);          // the item's own difficulty adapts slowly to you
  mem[id] = m;
  store.set(KEYS.mem, mem);
  store.set(KEYS.mastery, mast);

  const recent = store.get(KEYS.recent, []);
  recent.push(right ? 1 : 0);
  store.set(KEYS.recent, recent.slice(-30));

  // Calibration: how often each confidence level turns out to be right, per discipline
  const cal = store.get(KEYS.calib, {});
  const cd = cal[disciplineOfRecall(q)] = cal[disciplineOfRecall(q)] || {};
  const cs = cd[conf || 'none'] = cd[conf || 'none'] || { c: 0, t: 0 };
  cs.t++;
  if (right) cs.c++;
  store.set(KEYS.calib, cal);
}

// ── Daily activity and the mistake log ──
function localDay(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function countAnswerToday() {
  const daily = store.get(KEYS.daily, {});
  const day = localDay();
  daily[day] = (daily[day] || 0) + 1;
  store.set(KEYS.daily, Object.fromEntries(Object.entries(daily).slice(-90)));
}
const ERROR_TYPES = [
  ['knowledge', 'Didn\'t know it'],
  ['confused', 'Mixed it up'],
  ['misread', 'Misread the question'],
  ['reasoning', 'Passage interpretation'],
  ['calculation', 'Calculation slip'],
  ['time', 'Rushed / ran out of time'],
];
function logError(entry) {
  const log = store.get(KEYS.errors, []);
  log.push(Object.assign({ t: Date.now() }, entry));
  store.set(KEYS.errors, log.slice(-1000));
}
function errorTypeRow(selected, handler) {
  return `<div class="conf-row err-row" role="group" aria-label="Why did you miss it?">
    <span class="conf-label">Why did you miss it?</span>
    ${ERROR_TYPES.map(([id, label]) => `<button class="conf-btn${selected === id ? ' on' : ''}" data-err="${id}" data-click="${handler}('${id}')" aria-pressed="${selected === id}">${label}</button>`).join('')}
  </div>`;
}
function markErrorButtons(type) {
  document.querySelectorAll('.err-row .conf-btn').forEach(b => {
    const on = b.dataset.err === type;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
}
function topicMastery(key, mast) {
  const t = (mast || store.get(KEYS.mastery, {}))[key];
  if (!t || t.n < 5) return { p: t ? sigmoid(t.r) : null, n: t ? t.n : 0, level: 'new' };
  const p = sigmoid(t.r);
  const level = p < 0.6 ? 'weak' : p < 0.75 ? 'building' : p < 0.9 ? 'solid' : 'mastered';
  return { p, n: t.n, level };
}
// How likely you are to get this question right now
function predictedSuccess(q, mem, mast) {
  const t = mast[q.key] || { r: MASTERY_PRIOR };
  const pTopic = sigmoid(t.r - itemDifficulty(q, mem));
  const m = mem[q.baseId || q.id];
  return m && m.seen ? 0.5 * retrievability(m) + 0.5 * pTopic : pTopic;
}

function recordAnswer(q, right) {
  countAnswerToday();
  // AAMC section answers don't count toward the TODAY plan's recall targets
  const stats = store.get(KEYS.stats, {});
  const s = stats[q.key] || { c: 0, t: 0 };
  s.t++;
  if (right) s.c++;
  stats[q.key] = s;
  store.set(KEYS.stats, stats);
}
function flaggedIds() { return store.get(KEYS.flags, {}); }
function toggleFlag(id) {
  const flags = flaggedIds();
  if (flags[id]) delete flags[id]; else flags[id] = true;
  store.set(KEYS.flags, flags);
  return !!flags[id];
}
// Due reviews first, then unseen cards, then the soonest-due seen cards
function pickQuestions(pool, n) {
  if (n >= pool.length) return shuffled(pool);
  const mem = loadMem();
  const now = Date.now();
  const due = [], fresh = [], later = [];
  pool.forEach(q => {
    const R = retrievability(mem[q.id], now);
    if (R == null) fresh.push(q);
    else if (R < TARGET_RETENTION) due.push(q);
    else later.push({ q, R });
  });
  later.sort((a, b) => a.R - b.R);
  return shuffled([...shuffled(due), ...shuffled(fresh), ...later.map(x => x.q)].slice(0, n));
}
// The one definition of a weak topic, used by every feature (Drill weak topics, priorities, Smart
// Session, TODAY new facts, passage preference): at least WEAK_RULE.minAttempts answers and
// cumulative accuracy below WEAK_RULE.accuracy (the app's ~80% target success rate). Ranked by
// distance below the target, weighted by MCAT content yield. A study heuristic, not a mastery test.
const WEAK_RULE = { minAttempts: 5, accuracy: 0.8 };

// A card is always asked exactly as written: no reworded, reversed or one-blank forms are generated.
function definitionParts(q) {
  if ((q.q.match(/_{3,}/g) || []).length !== 1) return null;
  const m = q.q.match(/^_{3,}\s+(is|are)\s+(.{12,})$/i);
  const term = String(q.choices[q.ans]);
  if (!m || term.length > 60 || term.includes(' / ')) return null;
  const desc = m[2].trim().replace(/[.\s]+$/, '');
  if (desc.toLowerCase().includes(term.toLowerCase())) return null;
  return { term, verb: m[1].toLowerCase(), desc: desc.charAt(0).toUpperCase() + desc.slice(1) };
}
function questionForms(q) { return [lookupQ(q.baseId || q.id) || q]; }

// ── Wrong-choice confusion ──
// If the answer you picked is itself the answer to another card, that card
// explains what your choice actually means.
let termIndex = null;
function normTerm(s) { return String(s).toLowerCase().replace(/<[^>]+>|\*\*/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
function confusionCard(chosenText, q) {
  if (!termIndex) {
    termIndex = new Map();
    QB.forEach(x => {
      if ((x.q.match(/_{3,}/g) || []).length !== 1) return;
      const t = normTerm(x.choices[x.ans]);
      if (t.length >= 3) (termIndex.get(t) || termIndex.set(t, []).get(t)).push(x);
    });
  }
  const baseId = q.baseId || q.id;
  const list = (termIndex.get(normTerm(chosenText)) || []).filter(x => x.id !== baseId);
  return list.find(x => x.key === q.key) || list.find(x => x.subj === q.subj) || null;
}
// A one-line meaning for a card's answer: its definition, or its stem with the blank filled in
function meaningOf(card) {
  const d = definitionParts(card);
  if (d) return `**${d.term}** ${d.verb} ${d.desc.charAt(0).toLowerCase() + d.desc.slice(1)}.`;
  return card.q.replace(/_{3,}/, `**${card.choices[card.ans]}**`).replace(/\s*\??$/, '.');
}

// ── Smart Session ──
const REASONS = {
  'confident-miss': 'You missed this while feeling sure. Fixing these pays off most',
  'missed-before': 'Missed before and due for review',
  due: 'Due for review. You may be starting to forget it',
  weak: 'Weak topic',
  new: 'New material',
  related: 'Related to a question you just missed',
  'reask': 'Re-asking a question you just missed',
  loop: 'Drilling until it sticks',
  shaky: 'You weren\'t sure last time. Checking it stuck',
  confusion: 'Clearing up a mix-up: this is the answer you chose by mistake',
  exam: 'From your full-length exam mistakes',
  stretch: 'Keeping solid topics fresh',
};
function recentAccuracy() {
  const r = store.get(KEYS.recent, []);
  return r.length >= 8 ? r.reduce((a, b) => a + b, 0) / r.length : null;
}
// Aim slightly easier when you're struggling and harder when you're cruising
function targetSuccess() {
  const acc = recentAccuracy();
  return acc == null ? 0.8 : acc < 0.7 ? 0.86 : acc > 0.9 ? 0.72 : 0.8;
}
// Mix topics so the same topic never appears twice in a row when avoidable
function interleave(items) {
  const left = shuffled(items);
  const out = [];
  while (left.length) {
    const prev = out.length ? out[out.length - 1].q.key : null;
    const i = left.findIndex(x => x.q.key !== prev);
    out.push(left.splice(i < 0 ? 0 : i, 1)[0]);
  }
  return out;
}
// Next wording of a fact: never the one just shown and, when possible, not the one before it.
// The index is drawn over the filtered list itself (drawing over forms.length - 1 could run past it
// and fall back to forms[0], repeating a wording).
function pickNextForm(forms, currentId, lastId) {
  const fresh = forms.filter(x => x.id !== lastId && x.id !== currentId);
  const pool = fresh.length ? fresh : forms.filter(x => x.id !== currentId);
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : forms[0];
}
function relatedQuestion(q, excludeIds) {
  const mem = loadMem();
  const mast = store.get(KEYS.mastery, {});
  const target = targetSuccess();
  const top = bankOf(q).filter(x => x.key === q.key && x.id !== (q.baseId || q.id) && !excludeIds.has(x.id))
    .map(x => ({ x, d: Math.abs(predictedSuccess(x, mem, mast) - target) }))
    .sort((a, b) => a.d - b.d).slice(0, 3);
  return top.length ? top[Math.floor(Math.random() * top.length)].x : null; // uniform pick from the 3 closest
}

// ════════════════════════════════════════════════════════════════
//  MCAT SCORE ESTIMATION
//  Section scores are built the way the AAMC builds the exam: each
//  section draws on disciplines in fixed proportions ("What's on the
//  MCAT Exam?", AAMC). Every discipline gets an MCAT-equivalent score
//  from the evidence available (full-length > passage > recall), and a
//  section estimate is the discipline scores weighted by those shares.
// ════════════════════════════════════════════════════════════════
const DISCIPLINES = Object.assign(Object.create(null), {
  biochemistry: 'Biochemistry',
  biology: 'Biology',
  gen_chem: 'General Chemistry',
  organic_chem: 'Organic Chemistry',
  physics: 'Physics',
  psych_soc: 'Psychology & Sociology',
  research: 'Research Methods & Statistics',
  cars: 'CARS (reading & reasoning)',
});
const MCAT_SECTIONS = [
  { id: 'cp', abbrev: 'C/P', label: 'Chemical & Physical Foundations', weights: { gen_chem: 0.30, physics: 0.25, biochemistry: 0.25, organic_chem: 0.15, biology: 0.05 } },
  { id: 'cars', abbrev: 'CARS', label: 'Critical Analysis & Reasoning Skills', weights: { cars: 1 } },
  { id: 'bb', abbrev: 'B/B', label: 'Biological & Biochemical Foundations', weights: { biology: 0.65, biochemistry: 0.25, gen_chem: 0.05, organic_chem: 0.05 } },
  { id: 'ps', abbrev: 'P/S', label: 'Psychological, Social & Biological Foundations', weights: { psych_soc: 0.95, biology: 0.05 } },
];
// Single-fact recall items are easier than MCAT items, so recall accuracy maps to a stricter curve
const RECALL_TO_SCALED = [[0, 118], [50, 118], [58, 119], [64, 120], [69, 121], [73, 122], [77, 123], [80, 124], [83, 125], [86, 126], [89, 127], [91, 128], [93, 129], [95, 130], [97, 131], [99, 132], [100, 132]];
const EVIDENCE_WEIGHT = { exam: 3, passage: 2, recall: 1 };
const MIN_ANSWERS = 15;   // per discipline before it counts toward a section estimate

function curveScore(curve, p) {
  for (let i = 1; i < curve.length; i++) {
    const [p1, s1] = curve[i];
    if (p <= p1) {
      const [p0, s0] = curve[i - 1];
      return s0 + ((p - p0) / (p1 - p0 || 1)) * (s1 - s0);
    }
  }
  return 132;
}
// Discipline for a recall stats key ("subject|tag"); equations carry physics or chemistry by tag
function disciplineOfKey(subj, tag) {
  if (tag === 'Research Methods & Statistics') return 'research';
  if (subj === 'equations') return tag.startsWith('Physics') ? 'physics' : 'gen_chem';
  return subj === 'behavioral' ? 'psych_soc' : subj;
}
function disciplineOfRecall(q) {
  if (q.disc) return q.disc;
  if (q.s === 'Research Methods & Statistics') return 'research';
  return q.subj === 'behavioral' ? 'psych_soc' : q.subj;
}
const PASSAGE_DISCIPLINE = [
  [/^p_(cars|e2cars)/, 'cars'], [/^p_bs/, 'psych_soc'], [/^p_ph/, 'physics'], [/^p_oc/, 'organic_chem'],
  [/^p_gchem/, 'gen_chem'], [/^p_bio/, 'biology'], [/^p_(aa|enz|met|nuc|lip)/, 'biochemistry'],
];
function disciplineOfPassage(p, q) {
  if (q && q.subj) return q.subj;
  if (p.subj) return p.subj;
  const hit = PASSAGE_DISCIPLINE.find(([re]) => re.test(p.id));
  return hit ? hit[1] : null;
}
// Full-length passages carry their discipline on the passage object
const EXAM_PASSAGE_SUBJ = new Map(
  [EXAM1_CP_PASSAGES, EXAM1_BB_PASSAGES, EXAM1_PS_PASSAGES, EXAM2_CP_PASSAGES, EXAM2_BB_PASSAGES, EXAM2_PS_PASSAGES]
    .flat().filter(p => p.subj).map(p => [p.id, p.subj])
);
function disciplineOfExamQuestion(sectionId, q) {
  if (sectionId === 'cars') return 'cars';
  return q.subj || EXAM_PASSAGE_SUBJ.get(q.passageId) || null;
}
function recordEvidence(source, disc, right) {
  if (!disc) return;
  const ev = store.get(KEYS.evidence, {});
  const d = ev[disc] = ev[disc] || {};
  const s = d[source] = d[source] || { c: 0, t: 0 };
  s.t++;
  if (right) s.c++;
  store.set(KEYS.evidence, ev);
}
// Evidence per discipline: { recall:{c,t}, passage:{c,t}, exam:{c,t} }
function disciplineEvidence() {
  const out = Object.create(null);
  Object.keys(DISCIPLINES).forEach(d => { out[d] = { recall: { c: 0, t: 0 }, passage: { c: 0, t: 0 }, exam: { c: 0, t: 0 } }; });
  Object.entries(store.get(KEYS.stats, {})).forEach(([k, s]) => {
    const tag = k.slice(k.indexOf('|') + 1);
    const d = disciplineOfKey(k.split('|')[0], tag);
    if (!out[d] || !KEY_COUNTS[k]) return;
    if (Number.isFinite(s.c) && Number.isFinite(s.t)) { out[d].recall.c += s.c; out[d].recall.t += s.t; }
  });
  Object.entries(store.get(KEYS.evidence, {})).forEach(([d, src]) => {
    if (!out[d]) return;
    ['passage', 'exam'].forEach(k => { if (Number.isFinite(src[k]?.c) && Number.isFinite(src[k]?.t)) { out[d][k].c += src[k].c; out[d][k].t += src[k].t; } });
  });
  return out;
}
function disciplineScore(ev) {
  let wsum = 0, ssum = 0, n = 0, c = 0;
  Object.entries(ev).forEach(([src, v]) => {
    if (!v.t) return;
    const curve = src === 'recall' ? RECALL_TO_SCALED : RAW_TO_SCALED;
    const w = EVIDENCE_WEIGHT[src] * v.t;
    ssum += curveScore(curve, (v.c / v.t) * 100) * w;
    wsum += w;
    n += v.t; c += v.c;
  });
  return n ? { scaled: ssum / wsum, n, acc: c / n } : { scaled: null, n: 0, acc: null };
}
function scoreBand(n) { return n >= 300 ? 1 : n >= 120 ? 2 : 3; }
function estimateScores() {
  const ev = disciplineEvidence();
  const disc = Object.fromEntries(Object.entries(ev).map(([d, e]) => [d, Object.assign(disciplineScore(e), { ev: e })]));
  const sections = MCAT_SECTIONS.map(sec => {
    let wsum = 0, ssum = 0, n = 0;
    const missing = [];
    Object.entries(sec.weights).forEach(([d, w]) => {
      if (disc[d].n >= MIN_ANSWERS) { wsum += w; ssum += disc[d].scaled * w; n += disc[d].n; }
      else missing.push({ d, w, need: MIN_ANSWERS - disc[d].n });
    });
    const coverage = wsum;
    if (coverage < 0.7) return { ...sec, scaled: null, coverage, missing, n };
    const scaled = Math.round(ssum / wsum);
    return { ...sec, scaled, band: scoreBand(n), percentile: SECTION_PERCENTILE[sec.id][scaled], coverage, missing, n };
  });
  const complete = sections.every(s => s.scaled != null);
  const total = complete ? sections.reduce((a, s) => a + s.scaled, 0) : null;
  const totalBand = complete ? Math.round(Math.sqrt(sections.reduce((a, s) => a + s.band * s.band, 0))) : null;
  return { disc, sections, total, totalBand, totalPercentile: total ? TOTAL_PERCENTILE_MAP[total] : null };
}
// Keep one snapshot per day so progress can be charted
function snapshotEstimate() {
  const est = estimateScores();
  if (!est.sections.some(s => s.scaled != null)) return;
  const hist = store.get(KEYS.scoreHistory, []);
  const day = localDay();   // the local calendar day (toISOString gave the UTC date)
  const entry = { day, total: est.total, sections: Object.fromEntries(est.sections.map(s => [s.id, s.scaled])) };
  if (hist.length && hist[hist.length - 1].day === day) hist[hist.length - 1] = entry; else hist.push(entry);
  store.set(KEYS.scoreHistory, hist.slice(-120));
}

// ════════════════════════════════════════════════════════════════
//  SCREENS & HOME
// ════════════════════════════════════════════════════════════════
const SCREENS = ['screen-home', 'screen-quiz', 'screen-results', 'screen-passage', 'screen-exam', 'screen-exam-results', 'screen-about'];
let activeScreen = 'screen-home';
function show(id, page) {
  tickStudyTimer();
  SCREENS.forEach(s => { const el = $(s); if (el) el.hidden = s !== id; });
  activeScreen = id;
  window.McatPages?.screen(id, page);
  const nav = $('app-nav');
  if (nav) nav.hidden = id === 'screen-home';
  // A Section Mastery test runs full-screen, laid out like the real exam: no site header, menus or study bars.
  if (typeof document !== 'undefined' && document.body) document.body.classList.toggle('exam-mode', id === 'screen-passage' && (!!(pq.mini && pq.mini.mastery && !pq.mini.completed)));
  window.scrollTo(0, 0);
  renderStudyTimer();
}

const prefs = Object.assign({ mode: 'exam', count: 20, selected: null }, store.get(KEYS.prefs, {}));
// The Recall and Passages tabs were removed; a saved 'recall' or 'passage' mode opens Full-length.
prefs.mode = ['exam'].includes(prefs.mode) ? prefs.mode : 'exam';
prefs.mix = ['custom', 'cp', 'bb', 'ps', 'all'].includes(prefs.mix) ? prefs.mix : 'custom';
prefs.count = [0, 10, 20, 30, 50, 100].includes(prefs.count) ? prefs.count : 20;
function savePrefs() { store.set(KEYS.prefs, prefs); }

function goHome() {
  // A walkthrough left playing must not keep stepping on a screen that is gone.
  if (stepper && stepper.timer) clearTimeout(stepper.timer);
  if (pq.mini && !pq.mini.completed && !confirm('Exit this mini test? This unfinished attempt will not be saved.')) return false;
  if (activeScreen === 'screen-exam' && exam) saveExam();
  pq.mini = null;  stopPassageTimer();
  commitPending();
  flushPassageErr();
  stopQuizTimer();
  stopExamTimer();
  show('screen-home');
  renderHome();
  return true;
}

function renderHome() {
  $('hero-badge').textContent = `${AQB_QBANK.length.toLocaleString()} QBank cards · ${flCount()} Practice Exam cards · ${FULL_EXAMS.length} full-length exams`;
  $('mode-exam-sub').textContent = `${FULL_EXAMS.length} timed exams`;
  if ($('mode-aamc-sub')) $('mode-aamc-sub').textContent = `${(AQB.length + flCount()).toLocaleString()} cards · 3 sections`;
  if ($('mode-flprep-sub')) { const nt = bankReady('fl') ? FL_TESTS.length : BANK_COUNTS.flTests; $('mode-flprep-sub').textContent = `${flCount()} cards · ${nt} test${nt === 1 ? '' : 's'}`; }

  // TODAY is the study routine. The old recall tools (Smart Session, due reviews, flagged recall cards,
  // weak-topic drills, speed drill) drew on the removed recall decks and are gone.
  const inProgress = FULL_EXAMS.find(e => store.get(KEYS.examProgress(e.id), null));
  const actions = [];
  if (inProgress) actions.push(`<button class="action-btn primary" data-click="startExam(${FULL_EXAMS.indexOf(inProgress)})">Resume ${esc(inProgress.title)}</button>`);
  actions.push(`<button class="action-btn" data-click="showProgress()">Score report</button>`);
  $('home-actions').innerHTML = actions.join('');
  if (typeof renderDailyPlan === 'function') renderDailyPlan();
  // The TODAY card above is the ordered routine; these cards stay as reference.
  try {
  $('home-score').innerHTML = scoreStrip();
  } catch (e) { $('home-score').innerHTML = '<p class="muted-note">Some saved progress could not be displayed. Study tools still work.</p>'; }

  setMode(prefs.mode, false);
}

function setMode(mode, navigate = true) {
  if (!['exam', 'aamc', 'flprep'].includes(mode)) mode = 'exam';
  prefs.mode = mode;
  // AAMC Prep has one tab button and three sections; remember the last section opened.
  if (mode === 'flprep') prefs.aamcLast = 'exam';
  else if (mode === 'aamc') prefs.aamcLast = aamcView();
  savePrefs();
  ['exam', 'aamc', 'flprep'].forEach(m => {
    const btn = $('btn-' + m), on = m === mode || (m === 'aamc' && mode === 'flprep');
    if (btn) { btn.classList.toggle('active', on); btn.setAttribute('aria-selected', on); }
    if ($(m + '-config')) $(m + '-config').hidden = m !== mode;
  });
  $('start-btn').hidden = mode === 'exam';
  renderAamcMenu();
  if (mode === 'aamc') renderAamcConfig();
  if (mode === 'flprep') renderFlConfig();
  if (mode === 'exam') renderExamList();
  if (navigate) window.McatPages?.mode(mode);
}




function startSession() {
  if (prefs.mode === 'aamc') startAamc();
  else if (prefs.mode === 'flprep') startFl();
}

// ── AAMC Question Bank Flashcards (separate section) ──
let aamcSelected = null;
function aamcSel() {
  if (!aamcSelected) {
    aamcSelected = new Set((Array.isArray(prefs.aamcSelected) ? prefs.aamcSelected : AAMC_SECTION.keys).filter(k => AQB_KEY_COUNTS[k]));
    // Topics added after the selection was saved start out selected, so new cards aren't hidden.
    const known = new Set(Array.isArray(prefs.aamcKnownKeys) ? prefs.aamcKnownKeys : (Array.isArray(prefs.aamcSelected) ? AAMC_SECTION.keys.filter(k => k !== 'aamc_qb|AAMC Test Concepts' && !k.startsWith('aamc_qb|Universal Rules') && !/^aamc_qb\|Practice Exam \d|^aamc_qb\|Sample Test/.test(k)) : AAMC_SECTION.keys));
    AAMC_SECTION.keys.forEach(k => { if (!known.has(k) && AQB_KEY_COUNTS[k]) aamcSelected.add(k); });
    prefs.aamcKnownKeys = [...AAMC_SECTION.keys];
  }
  return aamcSelected;
}
// ── AAMC Prep tab: one tab, three sections (Question Bank cards, Practice Exam cards, Rules & Passage Prep) ──
function aamcView() { return prefs.aamcView === 'rules' ? 'rules' : 'qbank'; }
function openAamcView(view) {
  if (view === 'exam') { ensureStructs().catch(() => {}); setMode('flprep'); return; }  // prefetch drawings for the cards
  prefs.aamcView = view === 'rules' ? 'rules' : 'qbank';
  setMode('aamc');
}
function openAamc() { openAamcView(['qbank', 'exam', 'rules'].includes(prefs.aamcLast) ? prefs.aamcLast : 'qbank'); }
function renderAamcMenu() {
  const box = $('aamc-menu');
  if (!box) return;
  const on = prefs.mode === 'aamc' || prefs.mode === 'flprep';
  box.hidden = !on;
  if (!on) return;
  const cur = prefs.mode === 'flprep' ? 'exam' : aamcView();
  const done = pool => { const s = aamcStatus(pool); return `${s.done} of ${s.total} done`; };
  const guides = bankReady('prep') ? AAMC_PREP.reduce((n, s) => n + s.items.length, 0) : 'the';
  const tiles = [
    ['qbank', 1, 'Question Bank cards', 'Learn the content the AAMC tests, one question pack and topic at a time.', `${AQB_QBANK.length} cards · ${done(AQB_QBANK)}`],
    ['exam', 2, 'Practice Exam cards', 'The concepts tested on each AAMC practice exam. Use them before or after you take that exam.', bankReady('fl') ? `${FLQ.length} cards · ${done(FLQ)}` : `${BANK_COUNTS.fl} cards`],
    ['rules', 3, 'Rules & Passage Prep', 'Quick rules for common question types, plus how-to-find-it guides for real AAMC questions.', `${AQB_RULES.length} rule cards · ${guides} guides`],
  ];
  box.innerHTML = `<p class="aamc-menu-intro">Three ways to study the AAMC material. New here? Work through them in order, 1 to 3. Your progress in each one is saved.</p>
    <div class="aamc-menu-grid">${tiles.map(([id, n, name, desc, meta]) => `<button type="button" class="aamc-tile${cur === id ? ' active' : ''}" aria-pressed="${cur === id}" data-click="openAamcView('${id}')">
      <span class="aamc-tile-step">Step ${n}</span><span class="aamc-tile-name">${name}</span><span class="aamc-tile-desc">${desc}</span><span class="aamc-tile-meta">${meta}</span></button>`).join('')}</div>`;
}
function renderAamcRules() {
  const box = $('aamc-rules');
  if (!box) return;
  const s = aamcStatus(AQB_RULES);
  const acc = s.answers ? ` · ${Math.round((s.correct / s.answers) * 100)}% right` : '';
  box.innerHTML = `<div class="section-label">Universal Rules Quiz</div>
    <p class="muted-note">One short scenario card per rule. Recalling a rule sticks far better than rereading it, so quiz yourself here, then read the rule or guide below for any you miss.</p>
    ${aamcBar('Rule cards', s.done, s.total, `${s.done} of ${s.total} done${acc}`)}
    <div class="home-actions">
      <button class="action-btn" ${s.total ? '' : 'disabled'} data-click="startRulesQuiz()">Quiz all rules <b>${s.total}</b></button>
      <button class="action-btn" ${s.missed ? '' : 'disabled'} data-click="reviewRulesMissed()">Review missed rules <b>${s.missed}</b></button>
    </div>`;
}
function startRulesQuiz() { if (AQB_RULES.length) beginQuiz(shuffled(AQB_RULES), 'Universal Rules Quiz'); }
function reviewRulesMissed() {
  const mem = loadMem();
  const missed = AQB_RULES.filter(q => mem[q.id] && mem[q.id].seen && mem[q.id].right < mem[q.id].seen);
  if (missed.length) beginQuiz(shuffled(missed), 'Universal Rules Quiz: missed');
}
function renderAamcConfig() {
  const rules = aamcView() === 'rules';
  $('aamc-qbank-view').hidden = rules;
  $('aamc-rules-view').hidden = !rules;
  renderAamcMenu();
  if (rules) { $('start-btn').hidden = true; renderAamcRules(); renderAamcPrep(); return; }
  $('start-btn').hidden = false;
  const sel = aamcSel();
  $('aamc-count-row').innerHTML = [10, 20, 30, 50, 100, 0].map(n => `<button class="count-btn${prefs.count === n ? ' active' : ''}" data-click="setAamcCount(${n})">${n || 'All'}</button>`).join('');
  const allOn = keys => keys.length && keys.every(k => sel.has(k));
  const someOn = keys => keys.some(k => sel.has(k));
  $('aamc-grid').innerHTML = AAMC_SECTION.groups.map((g, gi) => g.chips.length ? `
    <div class="sg-topic-row">
      <span class="sg-topic-name">${esc(g.label)}</span>
      <span class="sg-topic-meta"><span class="sg-topic-count">${countAamcKeys(g.chips.flatMap(c => c.keys))} Q</span></span>
    </div>
    <div class="sg-chips">${g.chips.map((c, ci) => `
      <button class="sg-chip${allOn(c.keys) ? ' on' : someOn(c.keys) ? ' partial' : ''}" aria-pressed="${allOn(c.keys)}"
        data-click="setAamcChip(${gi},${ci},${!allOn(c.keys)})">${esc(c.label)}<span class="sg-chip-count">${countAamcKeys(c.keys)}</span></button>`).join('')}
    </div>` : '').join('');
  const byKey = aamcKeyStatus(), selKeys = [...sel].filter(k => AQB_BY_KEY.has(k) && !AAMC_RULES_KEYS.has(k));
  const st = aamcSumStatus(byKey, selKeys), pool = { length: st.total };
  const size = prefs.count ? Math.min(prefs.count, pool.length) : pool.length;
  $('aamc-avail-text').textContent = `${pool.length} questions selected · ${st.done} done · ${st.fresh} not yet seen${st.due ? ` · ${st.due} due for review` : ''}`;
  $('aamc-avail-session').textContent = pool.length ? `Session: ${size} question${size === 1 ? '' : 's'}` : '';
  $('start-btn').disabled = !pool.length;
  $('start-btn').textContent = 'Start →';
  renderAamcProgress(byKey);
}
// ── AAMC Passage Prep: how-to-find-it guides for real AAMC questions (answers hidden until opened) ──
function prepDone() { const d = prefs.prepDone; return d && typeof d === 'object' ? d : {}; }
function togglePrepDone(id) {
  const d = { ...prepDone() };
  if (d[id]) delete d[id]; else d[id] = Date.now();
  prefs.prepDone = d; savePrefs(); renderAamcPrep(id);
}
function renderAamcPrep(openId) {
  const box = $('aamc-prep');
  if (!box) return;
  if (!bankReady('prep')) { box.innerHTML = '<p class="muted-note">Loading the passage guides…</p>'; withBank('prep', () => { if (prefs.mode === 'aamc' && aamcView() === 'rules') { renderAamcPrep(openId); renderAamcMenu(); } }); return; }
  const done = prepDone();
  const card = (set, it) => {
    const id = set.id + '-' + it.q, got = !!done[id];
    const where = it.p ? `Passage ${it.p}` : 'Standalone';
    const row = (icon, label, text) => text && text !== '—' ? `<p class="prep-line"><span class="prep-icon" aria-hidden="true">${icon}</span><b>${label}:</b> ${esc(text)}</p>` : '';
    return `<details class="prep-item${got ? ' prep-got' : ''}"${openId === id ? ' open' : ''}>
      <summary><span class="prep-q">Q${it.q}</span> ${esc(it.t)} <span class="prep-meta">${where}${it.skip ? ' · skip-type' : ''}${got ? ' · ✓ got it' : ''}</span></summary>
      ${row('🔍', 'Find it', it.find)}
      ${row('🧠', 'Outside fact', it.fact)}
      ${row('⚠️', 'Trap', it.trap)}
      ${row('🪝', 'Hook', it.hook)}
      <details class="prep-answer"><summary>Show answer</summary><p class="prep-line"><b>✅ Answer: ${esc(it.ans)}</b></p></details>
      <button class="action-btn small" data-click="togglePrepDone('${id}')">${got ? 'Undo "got it"' : 'I got it on my own'}</button>
    </details>`;
  };
  box.innerHTML = `
    <div class="section-label">AAMC Passage Prep</div>
    <p class="muted-note">How to find the answer on real AAMC questions you've worked through. Open the AAMC question next to this, read 🔍 <b>Find it</b>, try it yourself, then check 🧠, ⚠️ and 🪝. The answer stays hidden until you tap it. Mark a question when you get it right on your own on a redo.</p>
    ${typeof AAMC_PREP_RULES !== 'undefined' && AAMC_PREP_RULES.length ? `<details class="home-reference prep-set"><summary>Universal rules <span class="prep-meta">one rule per question type</span></summary>
      <p class="muted-note">Quiz yourself on these with <b>Quiz all rules</b> above. Recalling a rule sticks far better than rereading it.</p>
      ${['every', 'most'].map(f => `<p class="prep-line prep-meta">${f === 'every' ? 'Show up several times per section on most tests' : 'Show up 1–3 times per section on most tests'}</p>
        ${AAMC_PREP_RULES.filter(r => r.often === f).map(r => `<div class="prep-item"><p class="prep-line"><b>${esc(r.when)}:</b> ${esc(r.rule)}</p><p class="prep-line prep-meta">Used on: ${esc(r.where)}</p></div>`).join('')}`).join('')}
    </details>` : ''}
    ${AAMC_PREP.map(set => {
      const n = set.items.filter(it => done[set.id + '-' + it.q]).length;
      return `<details class="home-reference prep-set"${openId && openId.startsWith(set.id + '-') ? ' open' : ''}>
        <summary>${esc(set.label)} <span class="prep-meta">${n} of ${set.items.length} got it</span></summary>
        <p class="muted-note">${esc(set.source)}</p>
        ${set.items.map(it => card(set, it)).join('')}
      </details>`;
    }).join('')}
    ${typeof AAMC_PREP_GAPS !== 'undefined' && AAMC_PREP_GAPS.length ? `<details class="home-reference prep-set"><summary>Skill gaps to work on</summary>
      ${AAMC_PREP_GAPS.map(g => `<div class="prep-item"><p class="prep-line"><b>${esc(g.t)}</b></p><p class="prep-line">${esc(g.note)}</p><p class="prep-line prep-meta">Redo: ${esc(g.redo)}</p></div>`).join('')}
    </details>` : ''}`;
}
// Progress comes from the same per-question memory and per-topic stats the rest of the app uses
// The AAMC Prep tab reads the memory record once per render and tallies each topic key once; chips, packs and
// the totals add those tallies up (it used to rescan the record and ~1,050 cards about 45 times a render).
const AQB_BY_KEY = new Map();
AQB.forEach(q => { if (!AQB_BY_KEY.has(q.key)) AQB_BY_KEY.set(q.key, []); AQB_BY_KEY.get(q.key).push(q); });
function aamcKeyStatus(mem = loadMem()) {
  const now = Date.now(), out = new Map();
  AQB_BY_KEY.forEach((qs, k) => out.set(k, aamcStatus(qs, mem, now)));
  return out;
}
function aamcSumStatus(byKey, keys) {
  const out = { total: 0, done: 0, fresh: 0, due: 0, missed: 0, answers: 0, correct: 0 };
  new Set(keys).forEach(k => { const s = byKey.get(k); if (s) for (const f in out) out[f] += s[f]; });
  return out;
}
function aamcStatus(pool, mem = loadMem(), now = Date.now()) {
  const out = { total: pool.length, done: 0, fresh: 0, due: 0, missed: 0, answers: 0, correct: 0 };
  pool.forEach(q => {
    const m = mem[q.id];
    if (!m || !m.seen) { out.fresh++; return; }
    out.done++; out.answers += m.seen; out.correct += m.right;
    if (retrievability(m, now) < TARGET_RETENTION) out.due++;
    if (m.right < m.seen) out.missed++;
  });
  return out;
}
const AAMC_SESSION_SIZE = 20;
function aamcSession() {
  const s = prefs.aamcSession;
  if (!s || !Array.isArray(s.ids) || !Number.isFinite(s.startedAt)) return null;
  const mem = loadMem();
  const left = s.ids.filter(id => AQB_BY_ID.has(id) && !(mem[id] && mem[id].last >= s.startedAt && mem[id].seen));
  return left.length ? { left, total: s.ids.length, startedAt: s.startedAt } : null;
}
function aamcWeakChips() {
  const stats = store.get(KEYS.stats, {});
  return AAMC_SECTION.groups.flatMap(g => g.chips).filter(c => {
    const s = c.keys.reduce((a, k) => { const r = stats[k]; if (r && Number.isFinite(r.t) && Number.isFinite(r.c)) { a.c += r.c; a.t += r.t; } return a; }, { c: 0, t: 0 });
    return s.t >= WEAK_RULE.minAttempts && s.c / s.t < WEAK_RULE.accuracy;
  });
}
function aamcBar(label, value, total, sub) {
  const p = total ? Math.round((value / total) * 100) : 0;
  return `<div class="subject-row"><div class="sr-name">${esc(label)}</div>
    <div class="sr-bar-wrap"><div class="sr-bar-fill" data-css="width:${p}%;background:var(--navy)"></div></div>
    <div class="sr-pct">${p}%</div><div class="sr-n">${sub}</div></div>`;
}
function aamcScoreRow(label, s, st) {
  const done = `${st.done}/${st.total} done`;
  if (!s.t) return `<div class="subject-row"><div class="sr-name">${esc(label)}</div><div class="sr-bar-wrap"></div><div class="sr-pct">—</div><div class="sr-n">${done}</div></div>`;
  const p = Math.round((s.c / s.t) * 100);
  const col = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';
  return `<div class="subject-row"><div class="sr-name">${esc(label)}</div>
    <div class="sr-bar-wrap"><div class="sr-bar-fill" data-css="width:${p}%;background:${col}"></div></div>
    <div class="sr-pct">${p}%</div><div class="sr-n">${s.c}/${s.t} right · ${done}</div></div>`;
}
function renderAamcProgress(byKey = aamcKeyStatus()) {
  const box = $('aamc-progress');
  if (!box) return;
  const qbankKeys = [...AQB_BY_KEY.keys()].filter(k => !AAMC_RULES_KEYS.has(k));
  const all = aamcSumStatus(byKey, qbankKeys);
  const sel = aamcSel();
  const st = aamcSumStatus(byKey, qbankKeys.filter(k => sel.has(k)));
  const resume = aamcSession();
  const weak = aamcWeakChips();
  const weakQs = aamcSumStatus(byKey, weak.flatMap(c => c.keys)).total;
  const stats = store.get(KEYS.stats, {});
  const sumStats = keys => keys.reduce((a, k) => { const r = stats[k]; if (r && Number.isFinite(r.t) && Number.isFinite(r.c)) { a.c += r.c; a.t += r.t; } return a; }, { c: 0, t: 0 });
  const btn = (label, n, action, title) => `<button class="action-btn" ${n ? '' : 'disabled'} data-click="${action}" title="${esc(title)}">${label} <b>${n}</b></button>`;
  const acc = all.answers ? Math.round((all.correct / all.answers) * 100) : null;
  box.innerHTML = `
    <div class="section-label">Your progress</div>
    ${aamcBar('All Question Bank cards', all.done, all.total, `${all.done} of ${all.total} done`)}
    <p class="muted-note">${all.done ? `${all.total - all.done} left to see · ${acc}% of your answers correct${all.due ? ` · ${all.due} due for review` : ''}` : 'Nothing answered yet. Start below; your progress is saved as you go.'}</p>
    <div class="home-actions">
      ${resume ? `<button class="action-btn" data-click="resumeAamc()" title="Finish the questions you hadn't answered when you left">▶ Resume last session <b>${resume.left.length}</b></button>` : ''}
      ${btn('Continue with new questions', st.fresh, 'continueAamc()', 'Questions you haven\'t seen yet, from the topics selected below')}
      ${btn('Review missed', st.missed, 'reviewAamcMissed()', 'Questions you have answered wrong at least once, from the selected topics')}
      ${btn('Review due', st.due, 'reviewAamcDue()', 'Questions whose spaced-review time has come, from the selected topics')}
      ${btn('Drill weak topics', weakQs, 'drillAamcWeak()', `Topics under ${Math.round(WEAK_RULE.accuracy * 100)}% after at least ${WEAK_RULE.minAttempts} answers`)}
    </div>
    <details class="home-reference"${all.done ? ' open' : ''}><summary>Score report by topic</summary>
      ${AAMC_SECTION.groups.filter(g => g.chips.length).map(g => {
        return `<div class="disc-section"><div class="disc-section-head">${esc(g.label)}</div>
          ${aamcScoreRow('All topics in this pack', sumStats(g.chips.flatMap(c => c.keys)), aamcSumStatus(byKey, g.chips.flatMap(c => c.keys)))}
          ${g.chips.map(c => aamcScoreRow(c.label, sumStats(c.keys), aamcSumStatus(byKey, c.keys))).join('')}
        </div>`;
      }).join('')}
      <p class="muted-note">Accuracy counts every answer, including repeats. Topics turn weak below ${Math.round(WEAK_RULE.accuracy * 100)}% after at least ${WEAK_RULE.minAttempts} answers.</p>
    </details>`;
}
function beginAamc(questions, label) {
  if (!questions.length) return;
  prefs.aamcSession = { ids: questions.map(q => q.id), startedAt: Date.now() };
  savePrefs();
  beginQuiz(questions, label);
}
function aamcPoolSelected() { const sel = aamcSel(); return AQB_QBANK.filter(q => sel.has(q.key)); }
function sizeOf(n) { return prefs.count ? Math.min(prefs.count, n) : n; }
function resumeAamc() {
  const s = aamcSession();
  if (!s) { renderAamcConfig(); return; }
  beginQuiz(s.left.map(id => AQB_BY_ID.get(id)), AAMC_SECTION.label + ' (resumed)');
}
function continueAamc() {
  const mem = loadMem();
  const fresh = aamcPoolSelected().filter(q => !(mem[q.id] && mem[q.id].seen));
  beginAamc(shuffled(fresh).slice(0, sizeOf(fresh.length) || AAMC_SESSION_SIZE), AAMC_SECTION.label + ': new questions');
}
function reviewAamcMissed() {
  const mem = loadMem();
  const missed = aamcPoolSelected().filter(q => mem[q.id] && mem[q.id].seen && mem[q.id].right < mem[q.id].seen);
  beginAamc(shuffled(missed).slice(0, sizeOf(missed.length)), AAMC_SECTION.label + ': missed questions');
}
function reviewAamcDue() {
  const mem = loadMem(), now = Date.now();
  const due = aamcPoolSelected().filter(q => mem[q.id] && retrievability(mem[q.id], now) < TARGET_RETENTION);
  beginAamc(shuffled(due).slice(0, sizeOf(due.length)), AAMC_SECTION.label + ': due for review');
}
function drillAamcWeak() {
  const weak = aamcWeakChips();
  const pool = AQB_QBANK.filter(q => weak.some(c => c.keys.includes(q.key)));
  beginAamc(pickQuestions(pool, sizeOf(pool.length)), AAMC_SECTION.label + ': weak topics');
}
function saveAamcSel() { prefs.aamcSelected = [...aamcSel()]; savePrefs(); renderAamcConfig(); }
function setAamcCount(n) { prefs.count = n; savePrefs(); renderAamcConfig(); }
function setAamcChip(gi, ci, on) {
  const chip = AAMC_SECTION.groups[gi] && AAMC_SECTION.groups[gi].chips[ci];
  if (!chip) return;
  chip.keys.forEach(k => (on ? aamcSel().add(k) : aamcSel().delete(k)));
  saveAamcSel();
}
function aamcSelectAll(on) { AAMC_SECTION.keys.forEach(k => (on ? aamcSel().add(k) : aamcSel().delete(k))); saveAamcSel(); }
// ── Full-Length Prep tab ──
function flSel() {
  const saved = Array.isArray(prefs.flSelected) ? prefs.flSelected : FL_TESTS;
  const known = new Set(Array.isArray(prefs.flKnown) ? prefs.flKnown : saved);
  return new Set(FL_TESTS.filter(t => saved.includes(t) || !known.has(t)));
}
function saveFlSel(sel) { prefs.flSelected = [...sel]; prefs.flKnown = [...FL_TESTS]; savePrefs(); renderFlConfig(); }
function setFlTest(i, on) { const sel = flSel(); const t = FL_TESTS[i]; if (!t) return; on ? sel.add(t) : sel.delete(t); saveFlSel(sel); }
function flSelectAll(on) { saveFlSel(new Set(on ? FL_TESTS : [])); }
function setFlCount(n) { prefs.flCount = n; savePrefs(); renderFlConfig(); }
function flPool() { const sel = flSel(); return FLQ.filter(q => sel.has(q.s)); }
function renderFlConfig() {
  if (!$('fl-grid')) return;
  if (!bankReady('fl')) { $('fl-grid').innerHTML = '<p class="muted-note">Loading the Practice Exam cards…</p>'; $('start-btn').disabled = true; withBank('fl', () => { if (prefs.mode === 'flprep') { renderFlConfig(); renderAamcMenu(); } }); return; }
  const sel = flSel(), count = prefs.flCount ?? 20;
  $('fl-count-row').innerHTML = [10, 20, 30, 59, 0].map(n => `<button class="count-btn${count === n ? ' active' : ''}" data-click="setFlCount(${n})">${n || 'All'}</button>`).join('');
  $('fl-grid').innerHTML = `<div class="sg-chips">${FL_TESTS.map((t, i) => {
    const n = FLQ.filter(q => q.s === t).length;
    return `<button class="sg-chip${sel.has(t) ? ' on' : ''}" aria-pressed="${sel.has(t)}" data-click="setFlTest(${i},${!sel.has(t)})">${esc(t)}<span class="sg-chip-count">${n}</span></button>`;
  }).join('')}</div>`;
  const pool = flPool(), st = aamcStatus(pool), all = aamcStatus(FLQ);
  const acc = all.answers ? Math.round((all.correct / all.answers) * 100) : null;
  $('fl-progress').innerHTML = `<div class="section-label">Your progress</div>
    ${aamcBar('All Full-Length Prep cards', all.done, all.total, `${all.done} of ${all.total} done`)}
    <p class="muted-note">${all.done ? `${all.total - all.done} left · ${acc}% of your answers correct${all.due ? ` · ${all.due} due for review` : ''}` : 'Nothing answered yet.'}</p>
    <div class="home-actions"><button class="action-btn" ${st.missed ? '' : 'disabled'} data-click="reviewFlMissed()">Review missed <b>${st.missed}</b></button></div>
    ${FL_TESTS.map(t => { const s = aamcStatus(FLQ.filter(q => q.s === t)); return aamcBar(t, s.done, s.total, `${s.done}/${s.total} done${s.answers ? ` · ${Math.round((s.correct / s.answers) * 100)}% right` : ''}`); }).join('')}`;
  const size = count ? Math.min(count, pool.length) : pool.length;
  $('fl-avail-text').textContent = `${pool.length} cards selected · ${st.fresh} not yet seen`;
  $('fl-avail-session').textContent = pool.length ? `Session: ${size} card${size === 1 ? '' : 's'}` : '';
  $('start-btn').disabled = !pool.length;
  $('start-btn').textContent = 'Start →';
}
function startFl() {
  if (!bankReady('fl')) { withBank('fl', startFl); return; }
  const pool = flPool(); if (!pool.length) return;
  const n = prefs.flCount ?? 20;
  beginQuiz(pickQuestions(pool, n || pool.length), FL_SECTION.label);
}
function reviewFlMissed() {
  const mem = loadMem();
  const missed = flPool().filter(q => mem[q.id] && mem[q.id].seen && mem[q.id].right < mem[q.id].seen);
  if (missed.length) beginQuiz(shuffled(missed), FL_SECTION.label + ': missed');
}
function startAamc() {
  const pool = AQB_QBANK.filter(q => aamcSel().has(q.key));
  if (!pool.length) return;
  beginAamc(pickQuestions(pool, prefs.count || pool.length), AAMC_SECTION.label);
}

// ════════════════════════════════════════════════════════════════
//  RECALL QUIZ (tutor mode: immediate feedback)
// ════════════════════════════════════════════════════════════════
const quiz = { items: [], idx: 0, results: [], answered: false, startedAt: 0, qStart: 0, label: '', timer: null, adaptive: false, extras: 0, pending: null,
  loop: new Map(), shakyDone: new Set(), lastForm: new Map(), cleared: 0 };
const LOOP_TARGET = 2;   // correct answers in a row before a missed fact is cleared for the session

function makeView(q, reason) {
  const order = choiceOrder(q.choices);
  return { q, reason: reason || null, order, choices: order.map(i => q.choices[i]), ans: order.indexOf(q.ans), ...(Array.isArray(q.choiceFigs) ? { figs: order.map(i => q.choiceFigs[i]) } : {}) };
}
// ── Speed drill ──
// Fluency: facts you already know, against the clock, so recall becomes automatic
// and frees time for passage reasoning. A timeout counts as a miss ("ran out of time").
const SPEED_N = 20, SPEED_SECONDS = 20;
function startSpeedTimer() {
  stopSpeedTimer();
  if (!quiz.speed) return;
  quiz.speedTimer = setInterval(() => {
    const left = quiz.speed - (Date.now() - quiz.qStart);
    const fill = $('speed-fill');
    if (fill) { fill.style.width = Math.max(0, (left / quiz.speed) * 100) + '%'; fill.classList.toggle('low', left < 5000); }
    if (left <= 0) { stopSpeedTimer(); pick(null); }
  }, 200);
}
function stopSpeedTimer() { if (quiz.speedTimer) clearInterval(quiz.speedTimer); quiz.speedTimer = null; }
const median = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };

// ── Study-habit nudges ──
// Spaced practice beats marathon sessions: suggest a short break after ~45 minutes
// The steady timer bar now supplies break guidance on every screen.
const STUDY_TIPS = [
  'Testing yourself (what you just did) builds memory better than rereading notes. Keep most of your study time on questions.',
  'Spacing beats cramming: a fact reviewed over several days lasts far longer than one drilled many times in one sitting. Trust the review schedule.',
  'Mixing topics feels harder than blocking one topic at a time, but it is what prepares you to recognize which concept a question is testing.',
  'After a miss, explain to yourself in one sentence why the right answer is right. Self-explanation turns a mistake into understanding.',
  'Sleep consolidates what you studied today. A full night\'s sleep is part of your study plan, especially in the final weeks.',
  'Turn on Recall first for topics you think you know: producing the answer before seeing choices is a stronger test than recognizing it.',
  'For passages, read the question stem first if you tend to run long, and move on from any question past about 2 minutes. Come back to it at the end.',
  'Review your full-length exams as carefully as you take them: the review is where most of the score gain happens.',
  'Short daily sessions add up. 30 focused minutes every day beats a 4-hour session once a week.',
];
function studyTip() { return `<div class="tip-card">💡 <b>Study tip:</b> ${STUDY_TIPS[Math.floor(Math.random() * STUDY_TIPS.length)]}</div>`; }

// Missed answers, one per fact (a fact drilled several times appears once)
function missedResults() {
  const seen = new Set();
  return quiz.results.filter(r => !r.right).filter(r => {
    const id = r.view.q.baseId || r.view.q.id;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
function retryMissed() {
  const missed = missedResults().map(r => lookupQ(r.view.q.baseId || r.view.q.id) || r.view.q);
  if (missed.length) beginQuiz(shuffled(missed), 'Retry missed');
}
// questions: plain question objects, or {q, reason} items from the Smart Session
function beginQuiz(questions, label, opts = {}) {
  pq.mini = null; stopPassageTimer(); 
  const items = questions.map(x => (x && x.q && x.choices === undefined ? makeView(x.q, x.reason) : makeView(x)));
  // Reinforcement (mastery loop, shaky repeats, confusion follow-ups) is on for every study session
  Object.assign(quiz, { items, idx: 0, results: [], answered: false, startedAt: Date.now(), label, adaptive: opts.adaptive !== false, speed: opts.speed || 0, extras: 0, pending: null, mastery: opts.mastery || null,
    loop: new Map(), shakyDone: new Set(), lastForm: new Map(), cleared: 0, masteryDay: null, masteryCounted: null, topicOf: null });
  show('screen-quiz');
  startQuizTimer();
  renderQuizQuestion();
  loadStructsFor(items);
}
function startQuizTimer() {
  stopQuizTimer();
  quiz.timer = setInterval(() => { $('qm-timer').textContent = fmtTime(Date.now() - quiz.startedAt); }, 1000);
}
function stopQuizTimer() { if (quiz.timer) clearInterval(quiz.timer); quiz.timer = null; stopSpeedTimer(); }

// Optional retrospective reflection follows incorrect answers only; never award partial score credit.

// "fn.bind(null,a,b)" handler strings become the plain call fn(a,b,<arg>).
function boundCall(handler, arg) { const m = /^([\w.]+)\.bind\(null,(.*)\)$/.exec(handler); return m ? m[1] + '(' + m[2] + ',' + arg + ')' : handler + '(' + arg + ')'; }
function runnerUpPrompt(view, chosen, handler, selected = null, inputId = 'runner-up') {
  return '<div class="results-card"><label><b>Which other answer were you considering?</b><p class="muted-note">Optional: think back to the other answer you considered before submitting.</p><select id="' + inputId + '" data-change="' + boundCall(handler, 'this.value') + '"><option value="">No other answer / skip</option>' + view.choices.map((c, i) => i === chosen ? '' : '<option value="' + i + '"' + (selected === i ? ' selected' : '') + '>' + LETTERS[i] + '. ' + esc(c) + '</option>').join('') + '</select></label></div>';
}
function validAlternative(view, chosen, value) {
  const other=value===''?null:Number(value);
  return other===null || Number.isInteger(other) && other>=0 && other<view.choices.length && other!==chosen;
}
function setWrongAlternative(mode,value) {
  const state=mode==='recall'?quiz:pq;
  const r=state.results.at(-1);
  if(!r || r.right || r.chosen==null || !validAlternative(r.view,r.chosen,value))return;
  r.other=value===''?null:Number(value);
  if(mode==='recall' && quiz.pending)quiz.pending.other=r.other;
  if(mode==='passage' && pq.errPending){pq.errPending.other=r.other==null?null:r.view.choices[r.other];pq.errPending.correctInFinalTwo=r.other===r.view.ans;}
  $('alternative-feedback-'+mode).innerHTML=finalTwoFeedback(r.view,r.chosen,r.other);
}
function wrongAlternativePanel(mode,view,chosen,other=null) {
  if(chosen==null || chosen===view.ans)return '';
  return runnerUpPrompt(view,chosen,"setWrongAlternative.bind(null,'"+mode+"')",other)+'<div id="alternative-feedback-'+mode+'">'+finalTwoFeedback(view,chosen,other)+'</div>';
}
function recordFinalTwo(view,chosen,other,attemptKey=null) {
  if(chosen==null || chosen===view.ans)return;
  let log=store.get(KEYS.finalTwo,[]);
  if(attemptKey)log=log.filter(x=>x.attemptKey!==attemptKey);
  if(other!=null)log.push({t:Date.now(),chosen:view.choices[chosen],other:view.choices[other],answer:view.choices[view.ans],right:false,included:other===view.ans,retrospective:true,attemptKey});
  store.set(KEYS.finalTwo,log.slice(-500));
}
function finalTwoFeedback(view,chosen,other) {
  if(other==null || chosen==null || chosen===view.ans)return '';
  const contrast=confusionCard(view.choices[other],view.q);
  return '<div class="tip-card"><b>Other answer considered:</b> '+fmt(view.choices[other])+'<p>'+(other===view.ans?'Your alternative was the correct answer. Identify the clue that should have favored it over your submitted choice.':'Your alternative was also incorrect. Compare both choices with the correct answer and identify the missing distinction.')+'</p>'+(contrast?'<p>'+fmt(meaningOf(contrast))+'</p>':'')+'<p>This reflection was recorded after feedback; it does not measure scientific closeness or change your score.</p></div>';
}
function pick(chosen) { finishPick(chosen); }
function answerPassage(chosen) { finishPassageAnswer(chosen); }

// ── Chemical structures: skeletal drawings from data/structures.js (RDKit), shown as images ──
// The drawings (~1.7 MB, ~0.3 MB gzipped) load only when Practice Exam cards are opened, not on every page; the service worker
// keeps them for offline use. A question drawn before they arrive is re-rendered once they load.
let structsLoading = null;
// structsFailed: the drawings file could not load (offline before it was cached, or a network error). Drawings
// then show "Drawing unavailable · Retry" instead of a blank space, and loading retries when the connection returns.
let structsFailed = false;
function ensureStructs() {
  if (typeof STRUCT_SVG !== 'undefined') return Promise.resolve();
  if (structsLoading) return structsLoading;
  structsLoading = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = 'data/structures.js' + ASSET_V;
    el.addEventListener('load', () => { structsFailed = false; resolve(); });
    el.addEventListener('error', () => { structsLoading = null; structsFailed = true; el.remove?.(); rerenderStructs(); reject(new Error('structures failed to load')); });
    document.head.appendChild(el);
  });
  return structsLoading;
}
// Redraws the current question or passage once the drawings are available (or have failed).
function rerenderStructs() {
  if (activeScreen === 'screen-quiz' && quiz.items[quiz.idx] && !quiz.answered) renderQuizQuestion();
  if (activeScreen === 'screen-passage' && pq.p) { if (!pq.mini && pq.p.passage) fillPassageBox(pq.p, true); if (pq.views[pq.idx] && !pq.answered) renderPassageQuestion(); }
}
function retryStructs() { structsFailed = false; rerenderStructs(); return ensureStructs().then(rerenderStructs).catch(() => {}); }
if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('online', () => { if (structsFailed) retryStructs(); });
function needsStructs(q) {
  return !!q && (q.fig != null || Array.isArray(q.choiceFigs) || (q.how && Array.isArray(q.how.steps) && q.how.steps.some(st => st && st.fig != null)));
}
function loadStructsFor(items) {
  if (typeof STRUCT_SVG !== 'undefined' || !items.some(v => needsStructs(v.q || v))) return;
  ensureStructs().then(() => { if (activeScreen === 'screen-quiz' && !quiz.answered && quiz.items[quiz.idx]) renderQuizQuestion(); }).catch(() => {});
}
// Each drawing's data URL is built once (encoding a large SVG on every render was a measurable cost).
const structUrls = new Map();
function structUrl(name) {
  if (name == null || typeof STRUCT_SVG === 'undefined') return null;
  if (!structUrls.has(name)) { const svg = STRUCT_SVG[name]; structUrls.set(name, svg ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) : null); }
  return structUrls.get(name);
}
function structImg(name, alt) {
  if (name != null && typeof STRUCT_SVG === 'undefined' && structsFailed) return `<span class="struct-missing muted-note">Drawing unavailable · <button class="text-btn" data-click="retryStructs()">Retry</button></span>`;
  const url = structUrl(name);
  return url ? `<img class="struct-img" src="${url}" alt="${esc(alt || 'Chemical structure')}">` : '';
}
function stemFigs(q) {
  const names = q.fig == null ? [] : [].concat(q.fig);
  const imgs = names.map((n, i) => structImg(n, names.length > 1 ? `Structure ${i + 1}` : 'Structure shown')).filter(Boolean);
  return imgs.length ? `<div class="struct-row">${imgs.map((im, i) => `<figure class="struct-fig">${im}${imgs.length > 1 ? `<figcaption>${i + 1}</figcaption>` : ''}</figure>`).join('')}</div>` : '';
}
// Structure choices show only the drawing until answered; then each is labeled with its name.
function structChoice(view, i) { return view && view.figs ? structImg(view.figs[i], 'Structure ' + LETTERS[i]) : ''; }
function choiceButtons(choices, onclick, opts = {}) {
  return choices.map((c, i) => { const fig = structChoice(opts.view, i); return `
    <button class="choice-btn${opts.selected === i ? ' selected' : ''}" id="${opts.prefix || 'cb'}-${i}" data-click="${onclick}(${i})">
      <span class="choice-lbl">${LETTERS[i]}</span>${fig ? `<span class="choice-text">${fig}<span class="struct-name">${fmt(c)}</span></span>` : `<span class="choice-text">${fmt(c)}</span>`}
    </button>`; }).join('');
}
function renderQuizQuestion() {
  if (stepper && stepper.timer) clearTimeout(stepper.timer);
  stepper = null;
  quiz.answered = false;
  quiz.qStart = Date.now();
  const view = quiz.items[quiz.idx];
  const q = view.q;
  setStudyTimerSubject(disciplineOfRecall(q));
  const correct = quiz.results.filter(r => r.right).length;
  $('pfill').style.width = (quiz.idx / quiz.items.length) * 100 + '%';
  $('qm-counter').textContent = `${quiz.idx + 1} / ${quiz.items.length}`;
  $('qm-subject').textContent = quiz.label;
  $('qm-score').textContent = `✓ ${correct}/${quiz.results.length}`;
  const flagged = !!flaggedIds()[q.id];
  const why = view.reason === 'weak'
    ? `${REASONS.weak}: ${KEY_LABEL[q.key] || q.s}${(() => { const m = topicMastery(q.key); return m.p != null ? ` (${Math.round(m.p * 100)}% predicted)` : ''; })()}`
    : view.reason === 'loop' ? `${REASONS.loop} (${view.loopStreak || 0} of ${LOOP_TARGET} correct in a row)`
    : view.reason ? REASONS[view.reason] : '';
  $('quiz-body').innerHTML = `
    <div class="question-box">
      <div class="q-toolbar">
        <span class="q-tag">${esc(SUBJECT_LABEL[q.subj])} · ${esc(KEY_LABEL[q.key] || q.s)}${q.aamc ? ` · AAMC ${esc(q.aamc)}` : ''}</span>
        <button class="flag-btn${flagged ? ' on' : ''}" id="flag-btn" data-click="flagCurrent()" aria-pressed="${flagged}" title="Flag for later review (F)">⚑ ${flagged ? 'Flagged' : 'Flag'}</button>
      </div>
      ${quiz.speed ? `<div class="speed-bar"><div class="speed-fill" id="speed-fill"></div></div>` : ''}
      ${why ? `<div class="q-reason"><span>Why this question: ${esc(why)}</span></div>` : ''}
      ${q.passage ? `<div class="card-passage"><div class="card-passage-label">Passage</div><p class="card-passage-text">${fmt(q.passage)}</p></div>` : ''}
      <div class="question-text">${fmt(q.q)}</div>
      ${stemFigs(q)}
      ${q.chart ? figureHtml(q.chart) : ''}
    </div>
    ${howOf(q) ? `<div id="hint-area">${hintArea(view)}</div>` : ''}
    <div class="choices" id="choices-area" role="group" aria-label="Answer choices">${choicesOrPrompt(view)}</div>
    <div id="go-on" class="go-on">Tap an answer to go on</div>
    <div id="exp-area"></div>
    <div id="nxt-area"></div>`;
  if ($('reveal-btn')) $('reveal-btn').focus({ preventScroll: true });
  startSpeedTimer();
  // In today's plan, every Practice Exam card opens its step-by-step lesson by itself.
  if ((quiz.mastery === 'guided' || quiz.mastery === 'lessons' || quiz.mastery === 'followup') && teachOf(q)) teachStep(1);
}
// Recall first: retrieving the answer before seeing options builds stronger memory
// than recognizing it, so the choices stay hidden until you've thought of it
function choicesOrPrompt(view) {
  if (!prefs.recallFirst || view.revealed || quiz.speed) return choiceButtons(view.choices, 'pick', { view });
  return `<div class="recall-first">
    <p><b>Recall first:</b> think of the answer, then show the choices.</p>
    <button class="next-btn" id="reveal-btn" data-click="revealChoices()">Show choices (Space)</button>
  </div>`;
}
// ── "How to work it out": a worked method (what it's asking, what to know, steps, the trap) ──
// Only on the original card: a reworded or reversed form asks something else.
function howOf(q) { return q && !q.variant && !q.baseId && q.how && Array.isArray(q.how.steps) ? q.how : null; }
// Before answering, hints come in two stages: what the question asks, then what you need to know.
// Steps and the trap appear only after you answer.
function hintArea(view) {
  const h = howOf(view.q), level = view.hint || 0;
  if (!h) return '';
  // A card with a graph in the question teaches how to read it, on the graph itself, before you answer.
  // The walkthrough can be opened at any time: the button stays above the lesson and restarts it at step 1.
  if (teachOf(view.q)) return helpButton('teachStep(0)') + elimButton(view) + (view.teachCur ? teachHtml(view) : '');
  const shown = (level >= 1 ? `<p><b>What it's asking:</b> ${fmt(h.ask)}</p>` : '') + (level >= 2 ? `<div><b>What you need to know:</b>${paragraphs(h.know)}</div>` : '');
  const label = level === 0 ? 'Show me how to start' : level === 1 ? 'Show what I need to know' : '';
  return `${shown ? `<div class="how-hint" role="status">${shown}</div>` : ''}${label ? `<button class="micro-btn how-btn" id="hint-btn" data-click="showHint()">💡 ${label}</button>` : ''}${elimButton(view)}`;
}
// "💡 Help me / Show me how": on every card with a lesson, before answering, while thinking and after answering (right
// or wrong). Before answering it opens the lesson on the question (teachStep); afterwards it opens the worked solution
// (showLesson). Opening it never blocks answering.
function helpButton(action) { return `<button class="micro-btn how-btn teach-btn" id="hint-btn" data-click="${action}">💡 Show me how</button>`; }
// ── "✂ Rule out": cut 2 or 3 choices at a glance, with no math and no writing ──
// One tiny set of rules on every card (GLANCE_RULES, never more). Each C/P flashcard and guided Practice Exam card
// lists the cuts its rules honestly make (q.cut: [{r: 1–6, c: [indexes in q.choices]}]; the key is never cut, each
// choice at most once; a card may have none). Tapping ✂ Rule out strikes those choices and shows one line per rule
// used, its short name and the letters it cuts. Nothing else: the choice left is not marked and the card waits.
const GLANCE_RULES = [
  { r: 1, name: 'Opposites', full: 'Opposites? Answer is one of them.', ex: 'agonist / antagonist, Q > K / Q < K, gains / loses' },
  { r: 2, name: 'Match the passage', full: 'Match the passage’s direction.', ex: 'blocks → anti-, inhibits, decreases; removes Ca²⁺ → solid forms' },
  { r: 3, name: 'Way off in size', full: 'Way off in size? Cut it.', ex: 'one choice ×1000 or ÷1000 from the rest' },
  { r: 4, name: 'Starting number', full: 'Starting number? Cut it.', ex: 'if something changed, the answer isn’t the number given in the question' },
  { r: 5, name: 'Solid, catalyst or pure liquid', full: 'Solid, catalyst or pure liquid? No change.', ex: 'K, partial pressures and equilibrium stay the same' },
  { r: 6, name: 'Formula has ½', full: 'Formula has ½? Take the smaller twin.', ex: 'two choices differ by exactly ×2' },
];
const GLANCE = Object.fromEntries(GLANCE_RULES.map(g => [g.r, g]));
// A cut is a glance rule ({r: 1–6, c}) or "one fact you know" ({f: a plain fact of 6 words or fewer, c}); both show
// as one line: the rule's name or the fact, then the letters it cuts.
function cutOf(q) { return q && !q.variant && !q.baseId && Array.isArray(q.cut) ? q.cut.filter(e => e && (GLANCE[e.r] || (typeof e.f === 'string' && e.f.trim())) && Array.isArray(e.c) && e.c.length) : null; }
function cutName(e) { return GLANCE[e.r] ? GLANCE[e.r].name : e.f; }
// The six rules, one example each: the 📋 Rules sheet.
function glanceRulesHtml() {
  return `<ol class="glance-rules">${GLANCE_RULES.map(g => `<li><b>${esc(g.full)}</b> <span class="elim-ex">(${esc(g.ex)})</span></li>`).join('')}</ol>`;
}
// The earlier six checks (kept only for the Rules sheet's "More").
const ELIM_CHECKS = [
  { icon: '🚫', name: 'Impossible', ask: 'Does it break a rule of nature?', ex: 'Rf above 1; efficiency above 100%; a negative mass; a base with pH below 7' },
  { icon: '📏', name: 'Units / ×10', ask: 'Is it off by a factor of 10, 100 or 1,000?', ex: 'g vs kg; mL vs L; ms vs s; J vs kJ; μ vs m' },
  { icon: '↕️', name: 'Backwards', ask: 'Is the direction flipped?', ex: 'a sign flipped; a ratio upside down; oxidation vs reduction; anode vs cathode' },
  { icon: '✂️', name: 'Skipped step', ask: 'Is a step of the work missing?', ex: 'a forgotten ×2 or ½; not squaring; not subtracting the start value' },
  { icon: '📋', name: 'Copied number', ask: 'Is it a number from the question, used with no work?', ex: 'the raw reading; the given mass, unchanged' },
  { icon: '🧠', name: 'Wrong fact', ask: 'Does a definition or rule rule it out?', ex: 'a C=O with no N attached can’t be an amide' },
];
function elimChecksHtml() {
  return `<div class="elim-checks"><p><b>Six checks (worked elimination).</b></p><table><tbody>${ELIM_CHECKS.map((k, i) => `<tr><td>${i + 1}. ${k.icon} <b>${k.name}</b></td><td>${esc(k.ask)} <span class="elim-ex">e.g. ${esc(k.ex)}</span></td></tr>`).join('')}</tbody></table></div>`;
}
// Shown only on a card where a rule or fact cuts something: a button that comes up empty trains you to stop using it.
function elimButton(view) { const cut = cutOf(view.q); return cut && cut.length ? `<button class="micro-btn how-btn elim-btn" id="elim-btn" data-click="ruleOut()" aria-pressed="${!!view.elimShown}">✂ Rule out</button>` : ''; }
function elimHowHtml() { return ''; }
// Strikes the cut choices on the answer buttons (by text: a session may show them in another order) and writes one
// line per rule below the choices, with the letters as shown. The choice that is left is not touched.
function applyElim(view, prefix = 'cb') {
  if (!view || !view.elimShown || !cutOf(view.q) || typeof $ !== 'function') return;
  const cut = cutOf(view.q), lines = [];
  for (const e of cut) {
    const letters = [];
    for (const c of e.c) {
      const i = view.choices.indexOf(view.q.choices[c]), b = i < 0 ? null : $(prefix + '-' + i);
      if (i >= 0) letters.push(i);
      if (b && b.classList) b.classList.add('elim-out');
    }
    letters.sort((a, b) => a - b);
    lines.push(`<div class="cut-line${GLANCE[e.r] ? '' : ' cut-fact'}"><span class="cut-rule">${fmt(cutName(e))}</span> → ✂ ${letters.map(i => 'ABCD'[i]).join(', ')}</div>`);
  }
  const area = $('choices-area');
  if (area && area.insertAdjacentHTML && !$('elim-rule')) area.insertAdjacentHTML('afterend', `<div class="cut-lines" id="elim-rule" role="status">${lines.join('') || ''}</div>`);
}
function elimHintRefresh(view) { if ($('hint-area')) $('hint-area').innerHTML = quiz.answered ? helpButton('showLesson()') + elimButton(view) : hintArea(view); }
function ruleOut() {
  const view = quiz.items[quiz.idx];
  if (!view || !cutOf(view.q) || !cutOf(view.q).length) return;
  if (!$('cb-0')) revealChoices();
  view.elimShown = true;
  elimHintRefresh(view);
  applyElim(view);
}
// ── "⚡ Shortcut": the fastest repeatable route to the answer ──
// Every card also carries one shortcut (q.fast: {kind, how}) of six kinds, the same on every card (FAST_KINDS), so
// the student learns six moves, not 540 tricks. Unlike Rule out 3 it may lead straight to the answer, so it stays
// behind its own button (before or after answering); the card still waits for the student's tap.
const FAST_KINDS = [
  { kind: 'units', icon: '📐', name: 'Units first', ask: 'Combine the givens so the units match the answer’s.', ex: 'N × m ÷ s = W' },
  { kind: 'rearrange', icon: '🔁', name: 'Rearrange', ask: 'Use the friendlier form of the formula; cancel before multiplying.', ex: 'P = F × v with v = d ÷ t first' },
  { kind: 'round', icon: '🎯', name: 'Round & ×10', ask: 'Round to 1 digit, do the powers of ten apart, pick the nearest choice.', ex: '0.63 ÷ 8000 ≈ 8 × 10⁻⁵' },
  { kind: 'scale', icon: '⚖️', name: 'Scale it', ask: 'Use what scales with what instead of the full formula.', ex: 'radius halved → rise doubles' },
  { kind: 'edge', icon: '🚦', name: 'Edge case', ask: 'Test a limit (zero, very large) to get the direction.', ex: 'no catalyst → same K' },
  { kind: 'anchor', icon: '🔑', name: 'Anchor fact', ask: 'Use a fixed number or pattern worth memorizing.', ex: '22.4 L/mol; E(eV) ≈ 1240 ÷ λ(nm); carbonyl by its neighbors' },
];
const FAST_KIND = Object.fromEntries(FAST_KINDS.map(k => [k.kind, k]));
function fastOf(q) { return q && !q.variant && !q.baseId && q.fast && FAST_KIND[q.fast.kind] && q.fast.how ? q.fast : null; }
function fastLabel(f) { const k = FAST_KIND[f.kind]; return k.icon + ' ' + k.name; }
function fastKindsHtml() {
  return `<div class="elim-checks"><p><b>⚡ Shortcut: the fastest route to the answer.</b> Every card uses one of these six moves.</p><table><tbody>${FAST_KINDS.map((k, i) => `<tr><td>${i + 1}. ${k.icon} <b>${k.name}</b></td><td>${esc(k.ask)} <span class="elim-ex">e.g. ${esc(k.ex)}</span></td></tr>`).join('')}</tbody></table></div>`;
}
// ── "Teach me this graph": steps that label and measure the question's own graph before answering ──
function teachOf(q) { return q && !q.variant && !q.baseId && Array.isArray(q.teach) && q.teach.length ? q.teach : null; }
function teachHtml(view) {
  const t = teachOf(view.q), i = view.teachCur, st = t[i - 1];
  // A molecule step on a card without a drawn question shows its drawing in the lesson box itself.
  // Drawings, working lines and small graphs that belong to the step appear in the lesson box.
  const inBox = (st.fig && !view.q.fig ? stemFigs({ fig: st.fig }) : '') + (st.chart ? figureHtml(st.chart, st.graph || null) : '') +
    (Array.isArray(st.calc) && st.calc.length ? `<div class="step-calc">${st.calc.map((ln, k) => `<div class="calc-line calc-d${Math.min(k, 7)}">${fmt(ln)}</div>`).join('')}</div>` : '');
  return `<div class="how-hint teach-box" role="status"><div class="how-title">Step by step · ${i} of ${t.length}</div><p>${fmt(st.text)}</p>${inBox}
    <div class="step-progress" aria-hidden="true"><div class="step-progress-fill" data-css="width:${Math.round(i / t.length * 100)}%"></div></div>
    <div class="step-controls"><button class="micro-btn" data-click="teachStep(-1)"${i <= 1 ? ' disabled' : ''}>◀ Step</button>
    ${i < t.length ? `<button class="micro-btn step-next" id="teach-next" data-click="teachStep(1)">Step ▶</button>` : `<button class="micro-btn" data-click="teachStep(0)">↺ Start over</button><span class="step-count">Now answer the question.</span>`}</div></div>`;
}
function teachStep(delta) {
  const view = quiz.items[quiz.idx], t = view && teachOf(view.q);
  if (!t || quiz.answered) return;
  view.teachCur = delta === 0 ? 1 : Math.max(1, Math.min(t.length, (view.teachCur || 0) + delta));
  view.hint = Math.max(view.hint || 0, 1);  // taught before answering: the answer starts as Unsure
  if ($('hint-area')) $('hint-area').innerHTML = hintArea(view);
  // Today's plan counts a lesson once it has been stepped through to the end.
  if (view.teachCur === t.length && !view.lessonDone && typeof masteryNoteLesson === 'function') { view.lessonDone = true; masteryNoteLesson(view.q); }
  const st = t[view.teachCur - 1], qs = sel => (typeof document !== 'undefined' && document.querySelector ? document.querySelector(sel) : null);
  const fEl = view.q.chart && qs('#quiz-body .question-box .chart-figure');
  if (fEl) fEl.outerHTML = figureHtml(view.q.chart, st.chart ? null : (st.graph || null));
  // The words of the question that matter at this step light up.
  const qEl = qs('#quiz-body .question-box .question-text');
  if (qEl) qEl.innerHTML = Array.isArray(st.marks) && st.marks.length ? markCallouts(view.q.q, st.marks) : markText(view.q.q, st.hl && String(view.q.q).includes(st.hl) ? st.hl : null);
  paintCardPassage(view.q, st);
  // Molecule lessons swap the question's drawing for the stage being explained (the OH leaving, the + charge…).
  const sEl = view.q.fig && qs('#quiz-body .question-box .struct-row');
  if (sEl) sEl.outerHTML = stemFigs({ fig: st.fig || view.q.fig });
  const next = $('teach-next'); if (next && delta > 0) next.focus({ preventScroll: true });
  // Keep the whole graph in view (below the sticky bars) with the lesson text under it.
  const live = document.querySelector && ((st.hl || st.marks) && !view.q.chart && !view.q.fig ? document.querySelector('#quiz-body .question-box') : document.querySelector('#quiz-body .question-box .chart-figure, #quiz-body .question-box .struct-row, #quiz-body .question-box'));
  if (live && live.scrollIntoView) live.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function showHint() {
  const view = quiz.items[quiz.idx];
  if (quiz.answered || !howOf(view.q) || (view.hint || 0) >= 2) return;
  view.hint = (view.hint || 0) + 1;
  $('hint-area').innerHTML = hintArea(view);
}
// Steps are plain strings or {text, hl, graph, fig}: hl = exact text to highlight in the passage or question,
// graph = a chart overlay (see figureHtml), fig = structure drawing(s) to show at that step.
function howSteps(h) { return (h.steps || []).map(st => (typeof st === 'string' ? { text: st } : st)).filter(st => st && st.text); }
// Formats text with one highlighted span (an exact substring of the raw text); falls back to plain text.
function markText(text, hl) {
  const raw = String(text ?? ''), i = hl ? raw.indexOf(hl) : -1;
  if (i < 0) return fmt(raw);
  return fmt(raw.slice(0, i)) + `<mark class="step-hl">${fmt(hl)}</mark>` + fmt(raw.slice(i + hl.length));
}
// Callouts on the question's own words: marks = [{t: exact text, note: 'what it is'}] → each piece is highlighted with
// its label shown right above it (used by lessons so text-only questions explain themselves in place).
function markCallouts(text, marks) {
  const raw = String(text ?? ''), spots = [];
  (marks || []).forEach((m, n) => { const i = m && m.t ? raw.indexOf(m.t) : -1; if (i >= 0 && !spots.some(s => i < s.end && i + m.t.length > s.start)) spots.push({ start: i, end: i + m.t.length, note: m.note, n }); });
  if (!spots.length) return fmt(raw);
  spots.sort((a, b) => a.start - b.start);
  let out = '', at = 0;
  spots.forEach(s => { out += fmt(raw.slice(at, s.start)) + `<span class="q-callout q-c${s.n % 4}"><mark class="step-hl">${fmt(raw.slice(s.start, s.end))}</mark>${s.note ? `<span class="q-note">${fmt(s.note)}</span>` : ''}</span>`; at = s.end; });
  return out + fmt(raw.slice(at));
}
// A flashcard's short twin passage (q.passage) lights up like the question: a step's hl or marks that fall in the
// passage are highlighted there.
function paintCardPassage(q, st) {
  if (!q || !q.passage || typeof document === 'undefined' || !document.querySelector) return;
  const el = document.querySelector('#quiz-body .card-passage-text');
  if (!el) return;
  const marks = Array.isArray(st && st.marks) ? st.marks.filter(m => m && m.t && q.passage.includes(m.t)) : [];
  el.innerHTML = marks.length ? markCallouts(q.passage, marks) : markText(q.passage, st && st.hl && q.passage.includes(st.hl) ? st.hl : null);
}
function markParagraphs(text, hl) {
  return String(text ?? '').split(/\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${markText(p, hl && p.includes(hl) ? hl : null)}</p>`).join('');
}
// Interactive solution player: one step at a time, each with its own visual (quoted passage line, traced graph,
// highlighted structure); the passage, question and figure on screen highlight to match.
let stepper = null;
function stepVisual(st, ctx) {
  let out = '';
  if (st.hl) { const pass = ctx.passage || (stepper && stepper.q && stepper.q.passage), src = pass && String(pass).includes(st.hl) ? 'From the passage' : 'From the question';
    out += `<blockquote class="step-quote"><span class="step-quote-src">${src}:</span> <mark class="step-hl">${fmt(st.hl)}</mark></blockquote>`; }
  // A step can carry its own small graph (chart) or reuse the passage's figure; graph is the overlay on it.
  const chart = st.chart || ((st.graph && ctx.figure) ? ctx.figure : null);
  if (chart) out += figureHtml(chart, st.graph || null);
  if (st.fig) out += stemFigs({ fig: st.fig });
  // Worked calculation: lines appear one after another (formula → substitution → result).
  if (Array.isArray(st.calc) && st.calc.length) out += `<div class="step-calc">${st.calc.map((ln, i) => `<div class="calc-line calc-d${Math.min(i, 7)}">${fmt(ln)}</div>`).join('')}</div>`;
  // Eliminated choices, crossed out here and on the answer buttons.
  if (Array.isArray(st.strike) && st.strike.length) out += `<div class="step-strike">${st.strike.map(c => `<div class="strike-line"><span aria-hidden="true">✗</span> <s>${fmt(c)}</s></div>`).join('')}</div>`;
  return out ? `<div class="step-visual">${out}</div>` : '';
}
// Flashcard lessons (the Practice Test flashcards, data/cp-test-cards.js): after a wrong answer the lesson opens by
// itself under the verdict; after a right answer a button replays it. It works the card's own problem one step at a
// time (the question's words light up, working lines animate in, wrong choices are crossed out) and ends with the
// card's Rule to reuse. Back and Next move through it; it never plays on its own.
function isLessonCard(q) { return typeof isCpt === 'function' && isCpt(q) && !!howOf(q) && !!teachOf(q); }
// A card with Rule out 3 opens its lesson with it: the three quick eliminations and the 3-second rule, then the method.
function elimStep(q) { return [...elimOnlyStep(q), ...(fastOf(q) ? [{ text: '**⚡ Shortcut · ' + fastLabel(q.fast) + '.** ' + q.fast.how }] : [])]; }
function elimOnlyStep(q) { const cut = cutOf(q); return cut && cut.length ? [{ text: '**Rule out at a glance.** No math, no writing: the glance rules and one fact you know cut these.', strike: cut.flatMap(e => e.c.map(c => q.choices[c])), calc: cut.map(e => cutName(e) + ' → ✂ ' + e.c.map(c => q.choices[c]).join(' · ')) }] : []; }
// A passage card starts where a passage question starts: the sentence that holds the clue (how.steps[0]), then Rule out 3.
function lessonSteps(q) { const rule = teachOf(q).at(-1), hs = howSteps(howOf(q)), lead = q.passage && hs.length ? hs.splice(0, 1) : [];
  return [...lead, ...elimStep(q), ...hs, { text: rule.text, rule: true }]; }
// A guided Practice Exam card's walkthrough also opens with Rule out 3 when the card has it.
function stepperSteps() { return stepper.lesson ? lessonSteps(stepper.q) : [...elimStep(stepper.q), ...howSteps(howOf(stepper.q))]; }
function lessonPlayerHtml() {
  const { q, cur, ctx } = stepper, steps = lessonSteps(q), n = steps.length, st = steps[cur - 1], h = howOf(q);
  return `<div class="lesson-title">Here's how to solve it — step ${cur} of ${n}</div>
    <div class="how-step current${st.rule ? ' lesson-rule' : ''}"><p class="step-text">${fmt(st.text)}</p>${stepVisual(st, ctx)}</div>
    ${cur >= n && h.trap ? `<p class="how-trap"><b>The trap:</b> ${fmt(h.trap)}</p>` : ''}
    <div class="step-progress" aria-hidden="true"><div class="step-progress-fill" data-css="width:${Math.round(cur / n * 100)}%"></div></div>
    <div class="step-controls">
      <button class="micro-btn" data-click="howStep(-1)"${cur <= 1 ? ' disabled' : ''}>◀ Step</button>
      ${cur < n ? `<button class="micro-btn step-next" id="how-next" data-click="howStep(1)">Step ▶</button>` : `<button class="micro-btn" data-click="howReplay()">↺ Start over</button>`}
    </div>`;
}
function lessonBox(q, ctx) {
  if (stepper && stepper.timer) clearTimeout(stepper.timer);
  stepper = { q, cur: 1, ctx, playing: false, timer: null, lesson: true };
  return `<div class="how-box lesson-box" id="how-box"><div id="how-player" class="how-player" aria-live="polite">${lessonPlayerHtml()}</div></div>`;
}
// After an answer, "Help me / Show me how" (and "Show me how" after a right answer) opens the worked solution at step 1:
// a flashcard's lesson in its slot, or a guided card's walkthrough, replayed from the start.
function showLesson() {
  const view = quiz.items[quiz.idx];
  if (!view || !quiz.answered || !howOf(view.q)) return;
  const ctx = { mode: 'recall', view, prefix: 'cb', figure: view.q.chart || null }, slot = $('lesson-slot');
  if (isLessonCard(view.q) && slot) slot.innerHTML = lessonBox(view.q, ctx);
  else if ($('how-box') && stepper && stepper.q === view.q) howReplay();
  else if ($('exp-area')) $('exp-area').insertAdjacentHTML('beforeend', howBox(view.q, { ctx }));
  applyStepContext();
  howSchedule();
  const box = $('how-box'); if (box && box.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const next = $('how-next'); if (next) next.focus({ preventScroll: true });
}
function howPlayerHtml() {
  if (stepper.lesson) return lessonPlayerHtml();
  const { q, cur, ctx } = stepper, h = howOf(q), steps = stepperSteps(), n = steps.length;
  const list = steps.slice(0, cur).map((st, i) => `<li class="how-step${i === cur - 1 ? ' current' : ''}"><span class="step-text">${fmt(st.text)}</span>${i === cur - 1 ? stepVisual(st, ctx) : ''}</li>`).join('');
  return `<ol class="how-steps">${list}</ol>
    ${cur >= n && h.trap ? `<p class="how-trap"><b>4. The trap:</b> ${fmt(h.trap)}</p>` : ''}
    <div class="step-progress" aria-hidden="true"><div class="step-progress-fill${stepper.playing && cur < n ? ' running' : ''}" data-css="width:${Math.round(cur / n * 100)}%"></div></div>
    <div class="step-controls">
      <button class="micro-btn" data-click="howStep(-1)"${cur <= 1 ? ' disabled' : ''}>◀ Step</button>
      ${cur < n ? `<button class="micro-btn step-play" id="how-play" data-click="howToggle()">${stepper.playing ? '❚❚ Pause' : '▶ Play'}</button>` : `<button class="micro-btn step-play" data-click="howReplay()">↺ Replay</button>`}
      <span class="step-count">Step ${cur} of ${n}</span>
      ${cur < n ? `<button class="micro-btn step-next" id="how-next" data-click="howStep(1)">Step ▶</button><button class="micro-btn" data-click="howStep(99)">Show all</button>` : ''}
    </div>`;
}
// Highlights the live passage, question and figure for the current step.
function applyStepContext() {
  if (!stepper || typeof document === 'undefined' || !document.querySelector) return;
  const { q, cur, ctx } = stepper, st = stepperSteps()[cur - 1] || {};
  const qEl = document.querySelector(ctx.mode === 'passage' ? '#pp-question-box .question-text' : '#quiz-body .question-text');
  if (qEl) qEl.innerHTML = markText(q.q, st.hl && String(q.q).includes(st.hl) ? st.hl : null);
  if (ctx.mode !== 'passage') paintCardPassage(q, st);
  // Choices ruled out so far stay crossed out on the answer buttons.
  if (ctx.view && ctx.prefix && typeof $ === 'function') {
    const struck = new Set(stepperSteps().slice(0, cur).flatMap(x => x.strike || []));
    ctx.view.choices.forEach((c, i) => { const b = $(ctx.prefix + '-' + i); if (b && b.classList) b.classList.toggle('struck', struck.has(c)); });
  }
  if (ctx.mode === 'passage') {
    const pEl = document.querySelector('#pp-passage-box .passage-text');
    if (pEl && ctx.passage) pEl.innerHTML = markParagraphs(ctx.passage, st.hl);
  }
  // The question's own graph traces along with the step (a step's private chart is shown inside the step).
  const fEl = document.querySelector(ctx.mode === 'passage' ? '#pp-passage-box .chart-figure' : '#quiz-body .question-box .chart-figure');
  if (fEl && ctx.figure) fEl.outerHTML = figureHtml(ctx.figure, st.chart ? null : (st.graph || null));
}
// Removes the previous question's passage and figure highlights before the next question.
function clearStepContext() {
  if (stepper && stepper.ctx.mode === 'passage' && typeof document !== 'undefined' && document.querySelector) {
    const pEl = document.querySelector('#pp-passage-box .passage-text');
    if (pEl && stepper.ctx.passage) pEl.innerHTML = paragraphs(stepper.ctx.passage);
    const fEl = document.querySelector('#pp-passage-box .chart-figure');
    if (fEl && stepper.ctx.figure) fEl.outerHTML = figureHtml(stepper.ctx.figure);
  }
  stepper = null;
}
// Guided playback: after an answer the walkthrough plays itself, giving each step time to animate and be read
// (longer for working lines, graphs and structures). Any manual Back/Next/Show all pauses it.
function howStepMs(st) {
  return 3800 + Math.min(String(st.text || '').length, 220) * 18 + (Array.isArray(st.calc) ? st.calc.length * 900 : 0) + (st.chart ? 2600 : 0) + (st.fig ? 1200 : 0) + (st.strike ? 900 : 0);
}
function howSchedule() {
  if (!stepper) return;
  if (stepper.timer) clearTimeout(stepper.timer);
  stepper.timer = null;
  const steps = stepperSteps();
  if (!stepper.playing || stepper.cur >= steps.length || typeof setTimeout !== 'function') { stepper.playing = stepper.playing && stepper.cur < steps.length; return; }
  const me = stepper;
  stepper.timer = setTimeout(() => { if (stepper === me && me.playing) howStep(1, true); }, howStepMs(steps[stepper.cur - 1]));
}
function howToggle() { if (!stepper) return; stepper.playing = !stepper.playing; howStep(0, true); }
function howReplay() { if (!stepper) return; stepper.cur = 1; stepper.playing = !stepper.lesson; howStep(0, true); }
function howStep(delta, auto) {
  if (!stepper) return;
  if (!auto) stepper.playing = false;
  const n = stepperSteps().length;
  stepper.cur = Math.max(1, Math.min(n, stepper.cur + delta));
  const el = typeof $ === 'function' ? $('how-player') : null;
  if (el) el.innerHTML = howPlayerHtml();
  applyStepContext();
  const next = el && $('how-next'); if (next && delta > 0 && !auto) next.focus({ preventScroll: true });
  // Keep the step being played on screen as the list grows.
  const cur = el && el.querySelector && el.querySelector('.how-step.current');
  if (cur && delta > 0 && cur.scrollIntoView) cur.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  howSchedule();
}
// static: every step listed (results review); otherwise the interactive player, starting at step 1.
function howBox(q, opts = {}) {
  const h = howOf(q);
  if (!h) return '';
  const steps = [...elimStep(q), ...howSteps(h)];
  const head = `<div class="how-title">How to work it out</div>
    <p><b>1. What it's asking:</b> ${fmt(h.ask)}</p>
    <div><b>2. What you need to know:</b>${paragraphs(h.know)}</div>`;
  if (opts.static || !steps.length) return `<div class="how-box">${head}
    <div><b>3. Step by step:</b><ol class="how-steps">${steps.map(st => `<li>${fmt(st.text)}</li>`).join('')}</ol></div>
    ${h.trap ? `<p class="how-trap"><b>4. The trap:</b> ${fmt(h.trap)}</p>` : ''}</div>`;
  if (stepper && stepper.timer) clearTimeout(stepper.timer);
  // Plays on its own unless the reader prefers reduced motion; then it waits for Next.
  const calm = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  stepper = { q, cur: 1, ctx: opts.ctx || { mode: 'recall' }, playing: !calm, timer: null };
  return `<div class="how-box" id="how-box">${head}<div class="how-steps-head"><b>3. Watch it solved, step by step:</b></div><div id="how-player" class="how-player" aria-live="polite">${howPlayerHtml()}</div></div>`;
}
function revealChoices() {
  const view = quiz.items[quiz.idx];
  if (view.revealed) return;
  view.revealed = true;
  view.revealedAt = Date.now();
  $('choices-area').innerHTML = choiceButtons(view.choices, 'pick', { view });
  applyElim(view);
}
function flagCurrent() {
  const q = quiz.items[quiz.idx].q;
  const on = toggleFlag(q.baseId || q.id);
  const btn = $('flag-btn');
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.textContent = '⚑ ' + (on ? 'Flagged' : 'Flag');
}
// chosen === null: the speed-drill clock ran out
function finishPick(chosen, other = null, answerMs = null) {
  if (quiz.answered) return;
  stopSpeedTimer();
  if (!$('cb-0')) revealChoices();
  quiz.answered = true;
  const view = quiz.items[quiz.idx];
  const timedOut = chosen == null;
  const right = !timedOut && chosen === view.ans;
  const ms = answerMs ?? (Date.now() - quiz.qStart);
  quiz.results.push({ view, chosen: timedOut ? null : chosen, right, ms, timedOut, other });
  recordAnswer(view.q, right);
  // Subject Mastery path: counts guided cards and remembers misses for tomorrow's review.
  if (typeof masteryNoteAnswer === 'function') { try { masteryNoteAnswer(view.q, right); } catch (e) { console.error('mastery', e); } }
  // Memory and mastery are updated when you move on, so the confidence rating can count
  const confusion = right || timedOut ? null : confusionCard(view.choices[chosen], view.q);
  quiz.pending = { q: view.q, right, ms, conf: null, confusion, chosen: timedOut ? '(time ran out)' : view.choices[chosen], answer: view.choices[view.ans],
    other, errType: right ? null : timedOut ? 'time' : confusion ? 'confused' : null, note: '' };
  view.choices.forEach((_, i) => {
    const b = $('cb-' + i);
    b.disabled = true;
    if (i === view.ans) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });
  $('qm-score').textContent = `✓ ${quiz.results.filter(r => r.right).length}/${quiz.results.length}`;
  $('exp-area').innerHTML = finalTwoFeedback(view, chosen, other) + explanationBox(right, view.choices[view.ans], view.q.exp, issueUrl(`Recall · ${view.q.s}`, view.q.q),
    timedOut ? `Time ran out (${SPEED_SECONDS} seconds). A fact you know well should come back faster: this one is now due for review.`
      : confusion ? `You chose <b>${fmt(view.choices[chosen])}</b>. ${fmt(meaningOf(confusion))}` : '') + (isLessonCard(view.q)
      ? `<div id="lesson-slot">${right ? '<button class="micro-btn how-btn" id="show-how-btn" data-click="showLesson()">💡 Show me how</button>' : lessonBox(view.q, { mode: 'recall', view, prefix: 'cb', figure: view.q.chart || null })}</div>`
      : howBox(view.q, { ctx: { mode: 'recall', view, prefix: 'cb', figure: view.q.chart || null } }));
  if (isLessonCard(view.q) && right) stepper = null;
  // The help button stays after the answer: it opens the worked solution from step 1.
  if ($('hint-area')) $('hint-area').innerHTML = howOf(view.q) ? helpButton('showLesson()') + elimButton(view) : '';
  // A hinted answer was not pure recall: it starts as Unsure so the card comes back (you can change it)
  if (view.hint) quiz.pending.conf = 'unsure';
  if (howOf(view.q)) applyStepContext();
  renderNextArea();
  // A large "Next card →" right under the choices, so the way on is never the lesson's step button.
  if ($('go-on')) $('go-on').innerHTML = `<button class="next-btn next-card-btn" id="next-card-btn" data-click="nextQ()">${quiz.idx + 1 >= quiz.items.length && !quiz.adaptive ? 'See results →' : 'Next card →'}</button>`;
  $('next-btn').focus({ preventScroll: true });
  // Bring the guided walkthrough into view as it starts playing.
  const hb = $('how-box'); if (hb && hb.scrollIntoView) hb.scrollIntoView({ behavior: 'smooth', block: 'start' });
  howSchedule();
}
function renderNextArea() {
  const last = quiz.idx + 1 >= quiz.items.length;
  const p = quiz.pending;
  const conf = p && p.conf;
  $('nxt-area').innerHTML = `
    <div class="conf-row" role="group" aria-label="How sure were you?">
      <span class="conf-label">How sure were you?</span>
      ${CONFIDENCE.map(([id, label, key]) => `<button class="conf-btn${conf === id ? ' on' : ''}" data-conf="${id}" data-click="setConfidence('${id}')" aria-pressed="${conf === id}" title="Key: ${key}">${label}</button>`).join('')}
    </div>
    ${p && !p.right ? wrongAlternativePanel('recall',quiz.items[quiz.idx],quiz.results.at(-1).chosen,p.other) : ''}
    ${p && !p.right ? errorTypeRow(p.errType, 'setErrType') : ''}
    ${p && !p.right ? `<label class="explain-it">Explain it <span class="muted">(optional)</span>: in one sentence, why is the right answer right?
      <textarea id="explain-input" rows="2" maxlength="300" data-input="setPendingNote(this.value)">${esc(p.note || '')}</textarea></label>` : ''}
    <button class="next-btn" id="next-btn" data-click="nextQ()">${last && !quiz.adaptive ? 'See results →' : 'Next →'}</button>
    <div class="kb-hint">Keys: 1–4 or A–D to answer · G / U / K for confidence · Enter for next · F to flag</div>`;
}
function setPendingNote(v) { if (quiz.pending) quiz.pending.note = String(v); }
function setErrType(t) {
  if (!quiz.pending || quiz.pending.right) return;
  quiz.pending.errType = t;
  markErrorButtons(t);
}
function setConfidence(c) {
  if (!quiz.pending) return;
  quiz.pending.conf = c;
  document.querySelectorAll('.conf-btn[data-conf]').forEach(b => {
    const on = b.dataset.conf === c;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
}
// Apply the pending answer to the memory model, then reinforce within the session:
//  • a miss enters the mastery loop: it returns a few questions later, in a different
//    form each time, until answered correctly LOOP_TARGET times in a row;
//  • the wrong choice you picked, if it is another card's answer, is taught next;
//  • a right answer you weren't sure of comes back once more to confirm it stuck.
function commitPending() {
  const p = quiz.pending;
  if (!p) return;
  quiz.pending = null;
  recordFinalTwo(quiz.items[quiz.idx],quiz.results.at(-1).chosen,p.other,'recall:'+quiz.startedAt+':'+quiz.idx);
  updateMemory(p.q, p.right, p.conf || (p.other != null ? 'unsure' : null), p.ms);
  if (!p.right) logError({ id: p.q.baseId || p.q.id, disc: disciplineOfRecall(p.q), key: p.q.key, type: p.errType || 'unlabeled', chosen: p.chosen, answer: p.answer, src: 'recall', other: p.other == null ? null : quiz.items[quiz.idx].choices[p.other], correctInFinalTwo: p.right || p.other === quiz.items[quiz.idx].ans,
    ...(p.note && p.note.trim() ? { note: p.note.trim().slice(0, 300) } : {}) });
  if (!quiz.adaptive) return;
  const baseId = p.q.baseId || p.q.id;
  const base = lookupQ(baseId);
  // Budgets: mastery-loop re-asks may grow a session up to 2× its planned length;
  // optional extras (related, confusion, shaky checks) stop at +50%
  const planned = quiz.items.length - quiz.extras;
  const insert = (offset, q, reason, extra = {}) => {
    const cap = reason === 'loop' ? planned : Math.ceil(planned / 2);
    if (!q || quiz.extras >= cap) return false;
    const v = Object.assign(makeView(q, reason), extra);
    quiz.items.splice(Math.min(quiz.idx + 1 + offset, quiz.items.length), 0, v);
    quiz.extras++;
    return true;
  };
  const upcoming = id => quiz.items.slice(quiz.idx + 1).some(v => (v.q.baseId || v.q.id) === id);
  // Rotate through the fact's forms so the same wording isn't simply memorized
  const nextForm = () => {
    const forms = questionForms(base);
    const last = quiz.lastForm.get(baseId) || p.q.id;
    const f = pickNextForm(forms, p.q.id, last);
    quiz.lastForm.set(baseId, f.id);
    return f;
  };
  const loop = quiz.loop.get(baseId);

  if (!p.right) {
    quiz.loop.set(baseId, { streak: 0, misses: (loop ? loop.misses : 0) + 1 });
    if (!upcoming(baseId)) insert(4, nextForm(), 'loop', { loopStreak: 0 });
    if (p.confusion && !upcoming(p.confusion.id)) insert(2, p.confusion, 'confusion');
    else if (!loop) insert(2, relatedQuestion(p.q, new Set(quiz.items.map(v => v.q.baseId || v.q.id))), 'related');
    if(p.other!=null && p.other!==quiz.items[quiz.idx].ans){const alternative=confusionCard(quiz.items[quiz.idx].choices[p.other],p.q);if(alternative && !upcoming(alternative.id))insert(3,alternative,'confusion');}
    return;
  }
  if (loop) {
    loop.streak++;
    if (loop.streak >= LOOP_TARGET) { quiz.loop.delete(baseId); quiz.cleared++; return; }
    if (!upcoming(baseId)) insert(5, nextForm(), 'loop', { loopStreak: loop.streak });
    return;
  }
  const shaky = p.conf === 'guess' || p.conf === 'unsure' || (!p.conf && p.ms > 30000);
  if (shaky && !quiz.shakyDone.has(baseId) && !upcoming(baseId)) {
    quiz.shakyDone.add(baseId);
    insert(6, nextForm(), 'shaky');
  }
}
function explanationBox(right, answerText, exp, reportUrl, note) {
  return `<div class="explanation-box ${right ? 'is-right' : 'is-wrong'}" role="status">
    <div class="exp-verdict">${right ? '✓ Correct' : '✗ Incorrect'} <span class="exp-answer">Answer: ${fmt(answerText)}</span></div>
    ${note ? `<div class="exp-confusion">${note}</div>` : ''}
    <div class="exp-text">${paragraphs(exp)}</div>
    ${reportUrl ? `<a class="report-link" href="${esc(reportUrl)}" target="_blank" rel="noopener">Report a problem with this question</a>` : ''}
  </div>`;
}
function nextQ() {
  commitPending();
  if (quiz.idx + 1 >= quiz.items.length) { showQuizResults(); return; }
  quiz.idx++;
  renderQuizQuestion();
  window.scrollTo(0, 0);
}
function endQuiz() {
  setTimeout(() => window.McatAccount?.flush?.(), 0);   // a finished section or session goes to the cloud now
  commitPending();
  if (quiz.results.length) showQuizResults();
  else goHome();
}

function showQuizResults() {
  commitPending();
  stopQuizTimer();
  snapshotEstimate();
  show('screen-results');
  const res = quiz.results;
  const tot = res.length, cor = res.filter(r => r.right).length, p = pct(cor, tot);
  const sessionMs = Date.now() - quiz.startedAt;
  const avg = tot ? res.reduce((a, r) => a + r.ms, 0) / tot : 0;
  const grade = p >= 90 ? 'Excellent' : p >= 80 ? 'Strong' : p >= 70 ? 'Good' : p >= 60 ? 'Fair' : 'Keep practicing';
  const color = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';

  // Session breakdown by subject
  const bySubj = {};
  res.forEach(r => { const s = r.view.q.subj; bySubj[s] = bySubj[s] || { c: 0, t: 0 }; bySubj[s].t++; if (r.right) bySubj[s].c++; });
  const missed = missedResults();
  const flags = flaggedIds();
  const flaggedHere = res.filter(r => flags[r.view.q.id]);

  $('results-body').innerHTML = `
    <div class="results-hero">
      <div class="r-label">${esc(quiz.label)} · session complete</div>
      <div class="score-pct" data-css="color:${color}">${p}%</div>
      <div class="score-grade" data-css="color:${color}">${grade}</div>
      <div class="score-sub">${cor} of ${tot} correct · ${fmtTime(sessionMs)} total · ${Math.round(avg / 1000)}s per question</div>
      ${quiz.speed ? `<div class="score-sub reinforce">⚡ Median ${(median(res.filter(r => r.right).map(r => r.ms)) / 1000).toFixed(1)}s on correct answers · ${res.filter(r => r.timedOut).length} timed out. Missed and timed-out facts are now due for review.</div>` : ''}
      ${quiz.cleared || quiz.loop.size ? `<div class="score-sub reinforce">Reinforced: <b>${quiz.cleared}</b> missed ${quiz.cleared === 1 ? 'fact' : 'facts'} drilled to ${LOOP_TARGET} correct in a row${quiz.loop.size ? ` · <b>${quiz.loop.size}</b> still shaky (they'll come back soon in review)` : ''}</div>` : ''}
    </div>
    <div class="results-card">
      <div class="section-label">This session by subject</div>
      ${Object.entries(bySubj).map(([s, v]) => barRow(SUBJECT_LABEL[s], v.c, v.t)).join('')}
      <p class="muted-note">A single session is too small to score. Your passage and full-length answers feed the running MCAT estimate below.</p>
    </div>
    ${studyTip()}
    ${scoreStrip()}
    <div class="btn-row">
      ${missed.length ? `<button class="new-quiz-btn" data-click="retryMissed()">Retry ${plural(missed.length, 'missed question')}</button>` : ''}
      <button class="new-quiz-btn secondary" data-click="goHome()">Home</button>
    </div>
    <div class="results-card">
      <div class="section-label">Missed this session (${missed.length})</div>
      ${missed.length ? missed.map(r => reviewItem({
        stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp, how: howBox(r.view.q, { static: true }),
        tag: `${SUBJECT_LABEL[r.view.q.subj]} · ${KEY_LABEL[r.view.q.key] || r.view.q.s}`,
      })).join('') : '<div class="all-correct">✓ Perfect session — nothing missed.</div>'}
      ${missed.length ? `<button class="micro-btn mt-10" data-click="exportMissed()">Download missed questions (.txt)</button>` : ''}
    </div>
    ${flaggedHere.length ? `<div class="results-card"><div class="section-label">Flagged this session (${flaggedHere.length})</div>
      <p class="muted-note">Flagged questions stay flagged until you unflag them.</p></div>` : ''}`;
}
function barRow(label, c, t) {
  const p = pct(c, t);
  const col = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';
  return `<div class="subject-row">
    <div class="sr-name" title="${esc(label)}">${esc(label)}</div>
    <div class="sr-bar-wrap"><div class="sr-bar-fill" data-css="width:${p}%;background:${col}"></div></div>
    <div class="sr-pct">${p}%</div><div class="sr-n">${c}/${t}</div>
  </div>`;
}
// The studied card a test question twins (its `twin` is the card's src): a Practice Exam card (data/qb-aamc-fl.js,
// with a walkthrough) or a QBank card. Practice Exam cards need the fl bank (loaded before a C/P test starts).
let twinIndex = null;
function twinCardOf(src) {
  if (typeof src !== 'string' || !src) return null;
  if (!twinIndex || (bankReady('fl') && !twinIndex.fl)) {
    twinIndex = new Map(); twinIndex.fl = bankReady('fl');
    for (const q of [...AQB, ...(twinIndex.fl ? FLQ : [])]) if (q.src && !twinIndex.has(q.src)) twinIndex.set(q.src, q);
  }
  return twinIndex.get(src) || null;
}
// "Method from:" the first ~80 characters of the twin card's stem, and a button that opens the card.
function twinFromHtml(src) {
  const card = twinCardOf(src);
  if (!card) return '';
  const plain = String(card.q).replace(/\*\*|<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const cut = plain.length > 80 ? plain.slice(0, 80).replace(/\s+\S*$/, '') + '…' : plain;
  return `<div class="twin-from"><b>Method from:</b> ${esc(cut)} <button type="button" class="text-btn" data-click="studyTwinCard('${esc(src).replace(/'/g, '')}')">Study this card</button></div>`;
}
// Opens the twin card on its own (a Practice Exam card keeps its step-by-step lesson).
function studyTwinCard(src) {
  withBank('fl', () => { const card = twinCardOf(src); if (card) beginQuiz([card], 'Method from your test'); });
}
// chosen: an index, null (not answered: nullLabel, default "— Not answered") or undefined (unknown: no "your answer" line).
function reviewItem({ stem, choices, ans, chosen, exp, how, tag, passageTitle, other, otherHandler, otherId, twin, nullLabel }) {
  return `<div class="missed-item">
    ${tag ? `<div class="missed-tag">${esc(tag)}</div>` : ''}
    ${passageTitle ? `<div class="missed-tag">Passage: ${esc(passageTitle)}</div>` : ''}
    <div class="missed-q">${fmt(stem)}</div>
    <div class="missed-correct">✓ ${fmt(choices[ans])}</div>
    <div class="missed-wrong">${chosen === undefined ? '' : chosen == null ? esc(nullLabel || '— Not answered') : chosen === ans ? '' : '✗ Your answer: ' + fmt(choices[chosen])}</div>
    ${chosen != null && chosen !== ans && otherHandler ? runnerUpPrompt({choices,ans},chosen,otherHandler,other,otherId) : ''}
    <div${otherId ? ` id="alternative-feedback-${otherId}"` : ''}>${finalTwoFeedback({choices,ans,q:{id:'review'}},chosen,other)}</div>
    <details class="missed-exp"><summary>Explanation</summary>${paragraphs(exp)}</details>
    ${how ? `<details class="missed-exp"><summary>How to work it out</summary>${how}</details>` : ''}
    ${twin ? twinFromHtml(twin) : ''}
  </div>`;
}
function exportMissed() {
  const missed = missedResults();
  const lines = ['MCAT Study App — Missed Questions', new Date().toLocaleString(), `${missed.length} missed of ${quiz.results.length}`, ''];
  missed.forEach((r, i) => {
    const q = r.view.q;
    lines.push(`${i + 1}. [${SUBJECT_LABEL[q.subj]} · ${q.s}]`, `Q: ${q.q.replace(/_{3,}/g, '____')}`,
      `Correct: ${r.view.choices[r.view.ans]}`, `Your answer: ${r.timedOut ? '(time ran out)' : r.view.choices[r.chosen]}`, `Why: ${q.exp.replace(/\*\*/g, '')}`, '');
  });
  download(`MCAT_missed_${new Date().toISOString().slice(0, 10)}.txt`, lines.join('\n'));
}

// ── MCAT score report ──
// A 118–132 track with a marker; optional ± band shaded around it
function scaleBar(scaled, band, color) {
  if (scaled == null) return '<div class="scale-bar empty"></div>';
  const x = v => ((Math.min(132, Math.max(118, v)) - 118) / 14) * 100;
  return `<div class="scale-bar" title="${Math.round(scaled)} on the 118–132 scale">
    ${band ? `<div class="scale-band" data-css="left:${x(scaled - band)}%;width:${x(scaled + band) - x(scaled - band)}%"></div>` : ''}
    <div class="scale-mid"></div>
    <div class="scale-mark" data-css="left:${x(scaled)}%;background:${color || scoreColor(Math.round(scaled))}"></div>
  </div>`;
}
function evidenceText(ev) {
  const parts = [];
  if (ev.exam.t) parts.push(`${ev.exam.t} full-length`);
  if (ev.passage.t) parts.push(`${ev.passage.t} passage`);
  if (ev.recall.t) parts.push(`${ev.recall.t} recall`);
  return parts.join(' · ') || 'no answers yet';
}
function disciplineRow(d, info, weight) {
  const s = info.scaled == null ? null : Math.round(info.scaled);
  const enough = info.n >= MIN_ANSWERS;
  return `<div class="disc-row${enough ? '' : ' thin'}">
    <div class="disc-name">${esc(DISCIPLINES[d])}${weight != null ? `<span class="disc-weight">${Math.round(weight * 100)}% of section</span>` : ''}</div>
    <div class="disc-score" data-css="color:${s ? scoreColor(s) : 'var(--slate)'}">${s ?? '—'}</div>
    <div class="disc-bar">${scaleBar(info.scaled, enough ? null : 3)}</div>
    <div class="disc-meta">${info.n ? `${Math.round(info.acc * 100)}% correct · ${evidenceText(info.ev)}` : 'No answers yet'}${info.n && !enough ? ` · <b>${MIN_ANSWERS - info.n} more to count</b>` : ''}</div>
  </div>`;
}
function trendChart(hist) {
  const pts = hist.filter(h => h.total);
  if (pts.length < 2) return '';
  const W = 600, H = 120, pad = 24;
  const lo = Math.min(...pts.map(p => p.total)) - 4, hi = Math.max(...pts.map(p => p.total)) + 4;
  const xs = i => pad + (i / (pts.length - 1)) * (W - 2 * pad);
  const ys = v => H - pad - ((v - lo) / (hi - lo || 1)) * (H - 2 * pad);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${xs(i).toFixed(1)},${ys(p.total).toFixed(1)}`).join(' ');
  return `<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="Estimated total score over time, from ${pts[0].total} to ${pts[pts.length - 1].total}">
    <path d="${line}" fill="none" stroke="var(--navy)" stroke-width="2.5"/>
    ${pts.map((p, i) => `<circle cx="${xs(i).toFixed(1)}" cy="${ys(p.total).toFixed(1)}" r="3.5" fill="var(--navy)"><title>${p.day}: ${p.total}</title></circle>`).join('')}
    <text x="${pad}" y="${H - 4}" class="trend-lbl">${pts[0].day}</text>
    <text x="${W - pad}" y="${H - 4}" class="trend-lbl" text-anchor="end">${pts[pts.length - 1].day}</text>
    <text x="${W - pad}" y="${ys(pts[pts.length - 1].total) - 8}" class="trend-val" text-anchor="end">${pts[pts.length - 1].total}</text>
  </svg>`;
}
function scoreReportCards() {
  const est = estimateScores();
  const lastFL = store.get(KEYS.examHistory, []).filter(h => h.total).slice(-1)[0];
  const sectionTile = s => {
    if (s.scaled == null) {
      const need = s.missing.filter(m => m.need > 0).sort((a, b) => b.w - a.w).slice(0, 2)
        .map(m => `${m.need} more ${DISCIPLINES[m.d]}`).join(', ');
      return `<div class="section-tile dim"><b>${s.abbrev}</b><div class="tile-score">—</div>
        <span>Not enough data yet</span><span class="tile-need">${s.id === 'cars' ? `Answer ${MIN_ANSWERS - est.disc.cars.n} more CARS passage questions` : `Needs ${need}`}</span></div>`;
    }
    return `<div class="section-tile">
      <b>${s.abbrev}</b>
      <div class="tile-score" data-css="color:${scoreColor(s.scaled)}">${s.scaled}<small>±${s.band}</small></div>
      ${scaleBar(s.scaled, s.band)}
      <span>${ordinal(s.percentile)} percentile</span>
      <span>${s.n.toLocaleString()} answers${s.coverage < 0.999 ? ` · ${Math.round(s.coverage * 100)}% of section weighting represented` : ''}</span>
    </div>`;
  };
  return `
    <div class="results-card score-report">
      <div class="section-label">Estimated MCAT score</div>
      <div class="total-row">
        <div class="total-score">${est.total ?? '—'}${est.total ? `<small>±${est.totalBand}</small>` : ''}</div>
        <div class="total-meta">${est.total
          ? `<b>${ordinal(est.totalPercentile)} percentile</b> on the AAMC 472–528 scale<br>Sum of the four section estimates below`
          : 'A total appears once all four sections have enough answers. Each section needs eligible subjects representing at least 70% of its weighting; this is not syllabus coverage.'}
          ${lastFL ? `<br>Last full-length: <b>${lastFL.total}</b> (${new Date(lastFL.date).toLocaleDateString()})` : ''}</div>
      </div>
      <div class="section-grid">${est.sections.map(sectionTile).join('')}</div>
      ${trendChart(store.get(KEYS.scoreHistory, []))}
      <details class="how">
        <summary>How this score is calculated</summary>
        <p>The AAMC scores each section on 118–132 (midpoint 125) and adds the four for a 472–528 total. Each section draws on fixed shares of content. C/P is 30% general chemistry, 25% physics, 25% biochemistry, 15% organic chemistry and 5% biology. B/B is 65% biology, 25% biochemistry and 5% each general and organic chemistry. P/S is 65% psychology, 30% sociology and 5% biology. CARS is reading and reasoning only.</p>
        <p>Every subject below gets an MCAT-equivalent score from your answers. Full-length questions count 3× and passage questions 2×. A section score is its subjects' scores weighted by the shares above. Subjects with fewer than ${MIN_ANSWERS} answers are left out. A section needs eligible subjects representing at least 70% of its weighting; this is not the percentage of the syllabus studied. The ± range narrows as you answer more.</p>
        <p>Percentiles are the AAMC ranks in effect May 1, 2026 – April 30, 2027. These are study estimates, not predictions: the AAMC converts raw scores separately for every test form. A full-length exam is the best single indicator. <a href="#" data-click="showAbout();return false">About &amp; disclaimers</a></p>
      </details>
    </div>
    <div class="results-card">
      <div class="section-label">Score by subject <span class="muted">(MCAT-equivalent, 118–132)</span></div>
      ${MCAT_SECTIONS.map(sec => `
        <div class="disc-section"><div class="disc-section-head">${sec.abbrev} · ${esc(sec.label)}</div>
          ${Object.entries(sec.weights).sort((a, b) => b[1] - a[1]).map(([d, w]) => disciplineRow(d, est.disc[d], sec.id === 'cars' ? null : w)).join('')}
        </div>`).join('')}
      <div class="disc-section"><div class="disc-section-head">Scientific reasoning skill · all science sections</div>
        ${disciplineRow('research', est.disc.research, null)}
        <p class="muted-note">Research design and statistics are tested inside every science section rather than as a separate share, so this skill is shown on its own and isn't added into a section score.</p>
      </div>
    </div>`;
}
// ── Mistake patterns ──
const ERROR_ADVICE = {
  reasoning: 'Return to the specific passage evidence. Explain why the right choice follows and why each tempting alternative goes beyond or contradicts that evidence.',
  knowledge: 'Content gaps. TODAY aims its flashcards and Practice Exam cards at your weakest topics; read the full explanation on every miss.',
  confused: 'Mix-ups between similar terms. Write a short "X vs. Y" comparison for each pair below.',
  misread: 'Reading errors. Before answering, restate what is asked: watch for NOT/EXCEPT, units, and the direction of a change (increase vs. decrease).',
  calculation: 'Calculation slips. The MCAT has no calculator: write units, round early, estimate the answer\'s size first, and practice timed math drills.',
  time: 'Pacing. Practice timed sets and aim for about 95 seconds per passage question. Skip and mark hard items instead of stalling.',
};
function mistakeCard() {
  // Saved (and synced) rows are untrusted: only known types and disciplines are tallied, in prototype-free maps,
  // so a stored "__proto__" or "constructor" cannot break the page.
  const types = new Set(ERROR_TYPES.map(x => x[0]));
  const log = store.get(KEYS.errors, []).filter(e => e && typeof e === 'object');
  if (log.length < 5) return '';
  const labeled = log.filter(e => e.type !== 'unlabeled' && types.has(e.type));
  const byType = Object.create(null);
  labeled.forEach(e => { byType[e.type] = (byType[e.type] || 0) + 1; });
  const top = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  const byDisc = Object.create(null);
  labeled.filter(e => Object.prototype.hasOwnProperty.call(DISCIPLINES, e.disc)).forEach(e => { const d = byDisc[e.disc] = byDisc[e.disc] || Object.create(null); d[e.type] = (d[e.type] || 0) + 1; });
  const pairs = Object.create(null);
  log.filter(e => e.type === 'confused' && e.chosen && e.answer).forEach(e => {
    const k = [String(e.answer), String(e.chosen)].join(' ↔ ');
    pairs[k] = (pairs[k] || 0) + 1;
  });
  const topPairs = Object.entries(pairs).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const label = t => (ERROR_TYPES.find(x => x[0] === t) || [t, t])[1];
  const notes = log.filter(e => e.note).slice(-8).reverse();
  return `<div class="results-card">
    <div class="section-label">Mistake patterns <span class="muted">(${log.length} misses logged · ${labeled.length} with a reason)</span></div>
    ${top.length ? `${top.map(([t, n]) => barRow(label(t), n, labeled.length)).join('')}
      <div class="advice"><b>Biggest pattern: ${esc(label(top[0][0]))}.</b> ${ERROR_ADVICE[top[0][0]] || ''}</div>
      <div class="disc-patterns">${Object.entries(byDisc).map(([d, types]) => {
        const [t, n] = Object.entries(types).sort((a, b) => b[1] - a[1])[0];
        return `<span class="m-chip">${esc(DISCIPLINES[d] || d)}: mostly <b>${esc(label(t).toLowerCase())}</b> (${n})</span>`;
      }).join('')}</div>` : '<p class="muted-note">Tap a reason under each missed question ("Didn\'t know it", "Mixed it up"…) to see your patterns here.</p>'}
    ${topPairs.length ? `<div class="sw-head">Most-confused pairs</div><div class="disc-patterns">${topPairs.map(([k, n]) => `<span class="m-chip lvl-building">${fmt(k)}${n > 1 ? ` ×${n}` : ''}</span>`).join('')}</div>` : ''}
    ${notes.length ? `<div class="sw-head">Your explanations <span class="muted">(most recent)</span></div><ul class="explain-notes">${notes.map(e => `<li><b>${fmt(String(e.answer))}</b>: ${esc(e.note)}</li>`).join('')}</ul>
      <p class="muted-note">Reread these before a full-length exam. If one no longer makes sense, that fact needs another look.</p>` : ''}
  </div>`;
}

// ── Confidence calibration ──
// Well calibrated: "Knew it" ≈ 95%+ right, "Unsure" in between, "Guessed" near chance
function calibrationCard() {
  const cal = store.get(KEYS.calib, {});
  const rows = Object.entries(cal).map(([d, c]) => {
    const r = k => (c[k] && c[k].t ? { p: c[k].c / c[k].t, n: c[k].t } : null);
    const knew = r('knew'), unsure = r('unsure'), guess = r('guess');
    let verdict = '', cls = '';
    if (knew && knew.n >= 8 && knew.p < 0.85) { verdict = `Overconfident: "Knew it" answers are only ${Math.round(knew.p * 100)}% right`; cls = 'lvl-weak'; }
    else if ((unsure && unsure.n >= 8 && unsure.p >= 0.88) || (guess && guess.n >= 8 && guess.p >= 0.65)) { verdict = 'Underconfident: you know more than you think'; cls = 'lvl-solid'; }
    else if (knew && knew.n >= 8) { verdict = 'Well calibrated'; cls = 'lvl-mastered'; }
    return { d, knew, unsure, guess, verdict, cls, n: (knew ? knew.n : 0) + (unsure ? unsure.n : 0) + (guess ? guess.n : 0) };
  }).filter(x => x.n >= 5).sort((a, b) => b.n - a.n);
  if (!rows.length) return '';
  const cell = x => (x ? `${Math.round(x.p * 100)}% <small>(${x.n})</small>` : '—');
  return `<div class="results-card">
    <div class="section-label">Confidence calibration <span class="muted">(how often each rating turns out right)</span></div>
    <table class="calib"><tr><th>Subject</th><th>Knew it</th><th>Unsure</th><th>Guessed</th><th></th></tr>
      ${rows.map(x => `<tr><td>${esc(DISCIPLINES[x.d] || x.d)}</td><td>${cell(x.knew)}</td><td>${cell(x.unsure)}</td><td>${cell(x.guess)}</td>
        <td>${x.verdict ? `<span class="m-chip ${x.cls}">${esc(x.verdict)}</span>` : '<span class="muted">Need more ratings</span>'}</td></tr>`).join('')}
    </table>
    <p class="muted-note">Overconfidence is the costliest pattern: it stops you from reviewing what you don't know. On a real exam, re-check "sure" answers in your overconfident subjects. Underconfidence is safer, but it wastes time second-guessing.</p>
  </div>`;
}

// ── AAMC content categories ──
// The AAMC organizes the exam into foundational concepts and content categories
// ("What's on the MCAT Exam?"). Each topic chip maps to its primary category.
const AAMC_CATEGORIES = [
  ['1A', 'Structure and function of proteins and their constituent amino acids'],
  ['1B', 'Transmission of genetic information from the gene to the protein'],
  ['1C', 'Transmission of heritable information from generation to generation and the processes that increase genetic diversity'],
  ['1D', 'Principles of bioenergetics and fuel molecule metabolism'],
  ['2A', 'Assemblies of molecules, cells, and groups of cells within single cellular and multicellular organisms'],
  ['2B', 'The structure, growth, physiology, and genetics of prokaryotes and viruses'],
  ['2C', 'Processes of cell division, differentiation, and specialization'],
  ['3A', 'Structure and functions of the nervous and endocrine systems and ways these systems coordinate the organ systems'],
  ['3B', 'Structure and integrative functions of the main organ systems'],
  ['4A', 'Translational motion, forces, work, energy, and equilibrium in living systems'],
  ['4B', 'Importance of fluids for the circulation of blood, gas movement, and gas exchange'],
  ['4C', 'Electrochemistry and electrical circuits and their elements'],
  ['4D', 'How light and sound interact with matter'],
  ['4E', 'Atoms, nuclear decay, electronic structure, and atomic chemical behavior'],
  ['5A', 'Unique nature of water and its solutions'],
  ['5B', 'Nature of molecules and intermolecular interactions'],
  ['5C', 'Separation and purification methods'],
  ['5D', 'Structure, function, and reactivity of biologically-relevant molecules'],
  ['5E', 'Principles of chemical thermodynamics and kinetics'],
  ['6A', 'Sensing the environment'],
  ['6B', 'Making sense of the environment'],
  ['6C', 'Responding to the world'],
  ['7A', 'Individual influences on behavior'],
  ['7B', 'Social processes that influence human behavior'],
  ['7C', 'Attitude and behavior change'],
  ['8A', 'Self-identity'],
  ['8B', 'Social thinking'],
  ['8C', 'Social interactions'],
  ['9A', 'Understanding social structure'],
  ['9B', 'Demographic characteristics and processes'],
  ['10A', 'Social inequality'],
  ['SIRS', 'Scientific inquiry and reasoning skills: research design, data and statistical reasoning'],
];
// ── Study plan to the test date ──
// Spreads unseen material over the content phase, reserves the final weeks for
// review and full-length practice, and sizes each day's Smart Session.
const SECONDS_PER_RECALL = DAILY_RULES.secondsPerFact;   // answer + read the explanation (shared with the TODAY plan)
function showPlan() {
  show('screen-results');
  const plan = store.get(KEYS.plan, {}) || {};
  $('results-body').innerHTML = `
    <div class="results-hero"><div class="r-label">Study plan</div></div>
    <div class="results-card plan-form">
      <label>MCAT test date <input type="date" id="plan-date" min="${localDay()}" value="${esc(plan.date || '')}"></label>
      <label>Study days per week <select id="plan-days">${[3, 4, 5, 6, 7].map(n => `<option value="${n}"${(plan.days || 6) === n ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
      <label>Time per study day <select id="plan-min">${[30, 60, 90, 120, 180, 240].map(n => `<option value="${n}"${(plan.minutes || 120) === n ? ' selected' : ''}>${n >= 60 ? n / 60 + ' h' : n + ' min'}</option>`).join('')}</select></label>
      <button class="new-quiz-btn" data-click="savePlan()">Save plan</button>
      ${plan.date ? '<button class="text-btn" data-click="clearPlan()">Remove plan</button>' : ''}
    </div>
    ${plan.date ? `<div class="results-card">${testDateCard()}</div>` : ''}
    <div class="results-card"><div class="section-label">How the plan works</div>
      <p class="muted-note mt-0">Your test date schedules the full-length exams: up to 6, the AAMC ones first, spaced out and ending a week before the test, each followed by a review day. The daily routine is TODAY › Section mastery on the home page.</p>
    </div>
    <div class="btn-row"><button class="new-quiz-btn secondary" data-click="goHome()">Home</button></div>`;
}
function savePlan() {
  const date = $('plan-date').value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(new Date(date + 'T00:00:00').getTime()) || date < localDay()) { alert('Choose today or a future test date.'); return; }
  const old = store.get(KEYS.plan, null);
  const mem = loadMem();
  store.set(KEYS.plan, {
    date, days: +$('plan-days').value, minutes: +$('plan-min').value,
    start: old && old.date === date ? old.start : localDay(),
    seenAtStart: old && old.date === date ? old.seenAtStart : QB.filter(q => mem[q.id] && mem[q.id].seen).length,
  });
  showPlan();
}
function clearPlan() { store.del(KEYS.plan); showPlan(); }

// Compact one-line version for the home screen and session results
function scoreStrip() {
  const est = estimateScores();
  if (!est.sections.some(s => s.scaled != null)) return '';
  return `<button class="score-strip" data-click="showProgress()" title="Open your score report">
    <span class="ss-total"><small>Est. MCAT</small>${est.total ?? '—'}</span>
    ${est.sections.map(s => `<span class="ss-sec"><small>${s.abbrev}</small>${s.scaled ?? '—'}</span>`).join('')}
    <span class="ss-go">Score report →</span>
  </button>`;
}
function showProgress() {
  show('screen-results', 'score-report');
  snapshotEstimate();
  // Recall-deck cards (readiness, plan pace, topic map, recall speed, per-topic recall stats) were removed with the decks.
  $('results-body').innerHTML = `
    <div class="results-hero"><div class="r-label">Score report & progress</div></div>
    ${scoreReportCards()}
    ${officialScoresCard()}
    ${mistakeCard()}
    ${calibrationCard()}
    ${examHistoryCard()}
    ${typeof masteryPastHtml === 'function' ? (h => h ? `<div class="results-card"><div class="section-label">Section mastery quizzes</div>${h}</div>` : '')(masteryPastHtml(masteryLoad(), true)) : ''}
    <div class="btn-row"><button class="new-quiz-btn secondary" data-click="goHome()">Home</button></div>
    <button class="text-btn danger" data-click="resetProgress()">Reset all progress on this device…</button>`;
}
function resetProgress() {
  if (!confirm('Erase recall stats, memory history, flags, passage scores, estimates and exam history for the active study profile? If signed in, this cleared copy will replace your cloud study progress when synced. This cannot be undone.')) return;
  window.McatAccount?.clearBackup();
  [STUDY_TIMER_KEY, KEYS.retention, KEYS.exposures, KEYS.passageEvidence, KEYS.official, KEYS.recallDays, KEYS.dailyPlan, KEYS.externalPassages, KEYS.plannedPassages, KEYS.diagnostic, KEYS.fluency, KEYS.studyPath, KEYS.subjectPath, KEYS.finalTwo, KEYS.stats, KEYS.srs, KEYS.mem, KEYS.mastery, KEYS.recent, KEYS.errors, KEYS.calib, KEYS.daily, KEYS.flags, KEYS.passages, KEYS.examHistory, KEYS.evidence, KEYS.scoreHistory].forEach(k => store.del(k));
  FULL_EXAMS.forEach(e => { store.del(KEYS.examProgress(e.id)); store.del(KEYS.examLast(e.id)); });
  visibleStudyTimer = null;
  goHome();
}

// ════════════════════════════════════════════════════════════════
//  PASSAGE MODE (tutor mode)
// ════════════════════════════════════════════════════════════════
// selectedPassageId: the passage a passage-session URL names (a full-length exam's CARS passage), for a reload.
let selectedPassageId = null;
const pq = { p: null, idx: 0, views: [], results: [], answered: false };

// passage: a passage object to run instead of the selected one.
function startPassage(passage) {
  stopQuizTimer();
  pq.mini = null; pq.completed = false; pq.errPending = null;
  pq.masteryDay = null;
  const p = passage && passage.questions ? passage : PASSAGE_BY_ID.get(selectedPassageId);
  if (!p) return;
  // The address bar (and a reload) follow the passage actually shown, also when TODAY picked it.
  if (PASSAGE_BY_ID.has(p.id)) selectedPassageId = p.id;
  pq.firstExposure = beginPassageExposure(p);
  // AAMC pace: 95 min / 59 science questions ≈ 95 s; 90 min / 53 CARS questions ≈ 102 s
  const perQ = /^p_(cars|e2cars)/.test(p.id) ? 102 : 95;
  Object.assign(pq, { p, idx: 0, views: p.questions.map(makeView), results: [], answered: false, startedAt: Date.now(), qStart: Date.now(), targetMs: perQ * 1000 * p.questions.length });
  show('screen-passage');
  fillPassageBox(p);
  renderPassageQuestion();
  stopPassageTimer();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
function updatePassageTimer() {
  const el = $('pp-timer');
  if (!el || activeScreen !== 'screen-passage') { stopPassageTimer(); return; }
  if (pq.mini && pq.hiddenAt) return;   // paused while the app is hidden
  const used = Date.now() - pq.startedAt;
  if (pq.mini && !pq.mini.completed && used >= pq.targetMs) { pq.mini.timedOut = true; miniTimeUp(el); return; }
  // A timed quiz or diagnostic counts down (time left), with a notice at 10, 5 and 1 minute left.
  if (pq.mini && pq.mini.mastery) {
    const left = Math.max(0, pq.targetMs - used);
    el.textContent = `${fmtTime(left)} left`;
    el.title = 'Time left: the quiz ends on its own at 0:00';
    el.className = 'qm-timer' + (left <= 5 * 60000 ? ' danger' : left <= 10 * 60000 ? ' warn' : '');
    pq.warned = pq.warned || {};
    for (const mn of [1, 5, 10]) if (left <= mn * 60000 && pq.targetMs > mn * 60000 && !pq.warned[mn]) { Object.assign(pq.warned, { 1: mn <= 1, 5: mn <= 5, 10: true }); timeNotice(mn === 1 ? '1 minute left' : mn + ' minutes left'); break; }
    return;
  }
  el.textContent = `${fmtTime(used)} / ${fmtTime(pq.targetMs)}`;
  el.title = 'Time used / AAMC pace for this passage';
  el.className = 'qm-timer' + (used > pq.targetMs ? ' danger' : used > pq.targetMs * 0.85 ? ' warn' : '');
}
function stopPassageTimer() { if (pq.timer) clearInterval(pq.timer); pq.timer = null; }
// Time ran out: the clock reads 0:00, any earlier notice clears, and the quiz ends (results open with "Time's up").
function miniTimeUp(el) {
  if (el && pq.mini && pq.mini.mastery) { el.textContent = '0:00 left'; el.className = 'qm-timer danger'; }
  const tn = typeof document !== 'undefined' && document.getElementById ? document.getElementById('time-notice') : null;
  if (tn) tn.hidden = true;
  finishSubjectMini();
}
// A clear notice for the clock ("10 minutes left"), read out by screen readers, shown for a few seconds.
function timeNotice(msg) {
  if (typeof document === 'undefined' || !document.getElementById) return;
  let el = document.getElementById('time-notice');
  if (!el) { el = document.createElement('div'); el.id = 'time-notice'; el.className = 'time-notice'; el.setAttribute('role', 'alert'); document.body.appendChild(el); }
  el.textContent = '⏰ ' + msg; el.hidden = false;
  clearTimeout(timeNotice.t); timeNotice.t = setTimeout(() => { el.hidden = true; }, 8000);
}
// The quiz clock pauses while the app is hidden (another app, a locked phone) and resumes when it is back, like the
// full-length exam: the hidden time is added to the start.
function miniVisibility() {
  if (!pq.mini || pq.mini.completed || !pq.timer) { pq.hiddenAt = null; return; }
  if (document.visibilityState === 'hidden') { if (!pq.hiddenAt) pq.hiddenAt = Date.now(); return; }
  if (pq.hiddenAt) { const gap = Date.now() - pq.hiddenAt; pq.startedAt += gap; pq.qStart += gap; pq.hiddenAt = null; updatePassageTimer(); }
}
if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', miniVisibility);
function passageCard(topic, title, text, figure, scheme) {
  // Drawn structures and reaction schemes sit after the paragraph they belong to (row.after, 0-based over
  // blank-line-separated paragraphs; default: after the first).
  let body = paragraphs(text);
  if (Array.isArray(scheme) && scheme.length) {
    const chunks = String(text ?? '').split(/\n\s*\n/);
    body = chunks.map((c, i) => paragraphs(c) + scheme.filter(r => (Number.isInteger(r.after) ? r.after : 0) === i).map(schemeHtml).join('')).join('')
      + scheme.filter(r => Number.isInteger(r.after) && r.after >= chunks.length).map(schemeHtml).join('');
  }
  return `<div class="passage-card">
    ${topic ? `<div class="passage-topic">${esc(topic)}</div>` : ''}
    <div class="passage-title">${esc(title)}</div>
    <div class="passage-text">${body}</div>
    ${figure ? figureHtml(figure) : ''}
  </div>`;
}
// One scheme row: structures with "+" and labeled reaction arrows between them, and a caption.
function schemeHtml(row) {
  const parts = (row.parts || []).map(p => {
    if (p === '+') return '<span class="scheme-op" aria-hidden="true">+</span>';
    if (p && typeof p === 'object') return `<span class="scheme-arrow"><span class="scheme-reagent">${fmt(p.arrow || '')}</span><span class="scheme-arrowline" aria-hidden="true">⟶</span></span>`;
    return `<span class="scheme-mol">${structImg(p, 'Structure in ' + (row.caption || 'figure')) || '<span class="muted-note">drawing loading…</span>'}</span>`;
  }).join('');
  return `<figure class="pass-scheme"><div class="scheme-row">${parts}</div>${row.caption ? `<figcaption>${fmt(row.caption)}</figcaption>` : ''}</figure>`;
}
const passageNeedsStructs = p => !!p && Array.isArray(p.scheme) && p.scheme.length > 0;
// Fills the passage box; a passage with drawn structures loads the drawings first, then redraws.
// force: redraw even if this passage is already shown (drawings just loaded). Otherwise moving between questions on
// the same passage keeps the passage pane, and the reader's scroll position, as it is.
function fillPassageBox(p, force) {
  const box = $('pp-passage-box'); if (!box) return;
  const state = p.id + '|' + (typeof STRUCT_SVG !== 'undefined');
  if (!force && box.dataset && box.dataset.shown === state && box.innerHTML) return;
  const html = () => passageCard(p.topic || '', p.title, p.passage, p.figure, p.scheme);
  box.innerHTML = html();
  if (box.dataset) box.dataset.shown = state;
  if (passageNeedsStructs(p) && typeof STRUCT_SVG === 'undefined' && typeof ensureStructs === 'function') ensureStructs().then(() => { if ($('pp-passage-box') === box && box.isConnected !== false) { box.innerHTML = html(); if (box.dataset) box.dataset.shown = p.id + '|true'; } }).catch(() => {});
}
// ── Graph figures: line and bar charts drawn as inline SVG (presentation only, no script) ──
// ov (optional) is one solution step's overlay: {focus:[series], read:[{series,x}], xLine, yLine, bars:[[category, series]]}.
const CHART = { W: 560, L: 70, R: 18, T: 14, H: 250, B: 50 };
function chartNum(v) { return String(Number(Number(v).toFixed(6))).replace('-', '−'); }
function chartText(s) { return esc(s).replace(/_\{?([A-Za-z0-9+−]+)\}?/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>'); }
function chartTicks(a) { const out = []; for (let v = a.min, i = 0; v <= a.max + a.step * 1e-6 && i < 60; v = a.min + a.step * ++i) out.push(v); return out; }
// Monotone cubic (Fritsch–Carlson) path through pixel points: smooth without overshooting the data.
function chartSmooth(P) {
  if (P.length < 3) return 'M' + P.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L');
  const n = P.length, d = [], m = [];
  for (let i = 0; i < n - 1; i++) d.push((P[i + 1][1] - P[i][1]) / ((P[i + 1][0] - P[i][0]) || 1e-9));
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) { if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; } const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b; if (h > 9) { const t = 3 / Math.sqrt(h); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; } }
  let path = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) { const dx = (P[i + 1][0] - P[i][0]) / 3;
    path += ` C${(P[i][0] + dx).toFixed(1)} ${(P[i][1] + m[i] * dx).toFixed(1)} ${(P[i + 1][0] - dx).toFixed(1)} ${(P[i + 1][1] - m[i + 1] * dx).toFixed(1)} ${P[i + 1][0].toFixed(1)} ${P[i + 1][1].toFixed(1)}`; }
  return path;
}
function chartMarker(type, x, y) {
  const r = 4.2, f = n => n.toFixed(1);
  switch (type) {
    case 'circle': case 'circle-open': return `<circle class="ch-mk${type.endsWith('open') ? ' ch-open' : ''}" cx="${f(x)}" cy="${f(y)}" r="${r}"/>`;
    case 'square': case 'square-open': return `<rect class="ch-mk${type.endsWith('open') ? ' ch-open' : ''}" x="${f(x - r)}" y="${f(y - r)}" width="${f(2 * r)}" height="${f(2 * r)}"/>`;
    case 'diamond': case 'diamond-open': return `<path class="ch-mk${type.endsWith('open') ? ' ch-open' : ''}" d="M${f(x)} ${f(y - 5.5)}L${f(x + 5.5)} ${f(y)}L${f(x)} ${f(y + 5.5)}L${f(x - 5.5)} ${f(y)}Z"/>`;
    case 'triangle': case 'triangle-open': return `<path class="ch-mk${type.endsWith('open') ? ' ch-open' : ''}" d="M${f(x)} ${f(y - 5.5)}L${f(x + 5)} ${f(y + 4)}L${f(x - 5)} ${f(y + 4)}Z"/>`;
    case 'plus': return `<path class="ch-mk ch-stroke" d="M${f(x - 5)} ${f(y)}H${f(x + 5)}M${f(x)} ${f(y - 5)}V${f(y + 5)}"/>`;
    case 'cross': return `<path class="ch-mk ch-stroke" d="M${f(x - 4)} ${f(y - 4)}L${f(x + 4)} ${f(y + 4)}M${f(x + 4)} ${f(y - 4)}L${f(x - 4)} ${f(y + 4)}"/>`;
    default: { let d = ''; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 2.4 : 6; d += (k ? 'L' : 'M') + f(x + rr * Math.cos(a)) + ' ' + f(y + rr * Math.sin(a)); } return `<path class="ch-mk" d="${d}Z"/>`; }
  }
}
function chartLegend(items, top, W) {
  const colW = (W - 20) / 2;
  return items.map((it, i) => { const x = 14 + (i % 2) * colW, y = top + Math.floor(i / 2) * 20;
    return `<g class="${it.cls}">${it.key(x + 8, y)}<text class="ch-legend" x="${(x + 22).toFixed(1)}" y="${(y + 4).toFixed(1)}">${chartText(it.name)}</text></g>`; }).join('');
}
function chartAxes(fig, sy, W, H, xTicksSvg) {
  const C = CHART, bottom = C.T + C.H;
  const yT = chartTicks(fig.y).map(v => `<line class="ch-tick" x1="${C.L - 5}" x2="${C.L}" y1="${sy(v).toFixed(1)}" y2="${sy(v).toFixed(1)}"/><text class="ch-tl" x="${C.L - 8}" y="${(sy(v) + 4).toFixed(1)}" text-anchor="end">${chartNum(v)}</text>`).join('');
  return `<line class="ch-axis" x1="${C.L}" x2="${C.L}" y1="${C.T}" y2="${bottom}"/><line class="ch-axis" x1="${C.L}" x2="${W - C.R}" y1="${bottom}" y2="${bottom}"/>${yT}${xTicksSvg}
    <text class="ch-al" x="${((C.L + W - C.R) / 2).toFixed(1)}" y="${bottom + 46}" text-anchor="middle">${chartText(fig.x.label)}</text>
    <text class="ch-al" transform="rotate(-90)" x="${(-(C.T + C.H / 2)).toFixed(1)}" y="16" text-anchor="middle">${chartText(fig.y.label)}</text>`;
}
function lineChart(fig, ov) {
  const C = CHART, W = C.W, bottom = C.T + C.H, pw = W - C.L - C.R;
  const sx = x => C.L + (x - fig.x.min) / (fig.x.max - fig.x.min) * pw, sy = y => bottom - (y - fig.y.min) / (fig.y.max - fig.y.min) * C.H;
  const focus = new Set(ov && ov.focus || []), anyFocus = focus.size > 0;
  const cls = s => 'ch-s' + (anyFocus ? (focus.has(s.name) ? ' ch-focus' : ' ch-dim') : '');
  const xT = chartTicks(fig.x).map(v => `<line class="ch-tick" x1="${sx(v).toFixed(1)}" x2="${sx(v).toFixed(1)}" y1="${bottom}" y2="${bottom + 5}"/><text class="ch-tl" x="${sx(v).toFixed(1)}" y="${bottom + 18}" text-anchor="middle">${chartNum(v)}</text>`).join('');
  const series = fig.series.map(s => { const P = [...s.points].sort((a, b) => a[0] - b[0]).map(([x, y]) => [sx(x), sy(y)]);
    const line = s.line === 'none' ? '' : `<path class="ch-line" d="${s.line === 'straight' ? 'M' + P.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L') : chartSmooth(P)}"/>`;
    return `<g class="${cls(s)}">${line}${P.map(([x, y]) => chartMarker(s.marker, x, y)).join('')}</g>`; }).join('');
  let over = '';
  if (ov) {
    if (ov.xLine != null) over += `<line class="ch-guide" x1="${sx(ov.xLine).toFixed(1)}" x2="${sx(ov.xLine).toFixed(1)}" y1="${C.T}" y2="${bottom}"/>`;
    if (ov.yLine != null) over += `<line class="ch-guide" x1="${C.L}" x2="${W - C.R}" y1="${sy(ov.yLine).toFixed(1)}" y2="${sy(ov.yLine).toFixed(1)}"/>`;
    (ov.read || []).forEach((r, i) => { const s = fig.series.find(t => t.name === r.series); const pt = s && s.points.find(([x]) => x === r.x); if (!pt) return;
      const px = sx(pt[0]), py = sy(pt[1]);
      over += `<path class="ch-trace ch-d${Math.min(i, 3)}" d="M${px.toFixed(1)} ${bottom} V${py.toFixed(1)} H${C.L}"/><circle class="ch-ring" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="8"/>
        <text class="ch-read" x="${(C.L + 6).toFixed(1)}" y="${(py - 6).toFixed(1)}">${chartNum(pt[1])}</text><text class="ch-read" x="${(px + 6).toFixed(1)}" y="${(bottom - 6).toFixed(1)}">${chartNum(pt[0])}</text>`; });
  }
  if (ov) over += chartAnnotations(fig, ov, sx, sy, bottom, W);
  const leg = fig.series.map(s => ({ name: s.name, cls: cls(s), key: (x, y) => (s.line === 'none' ? '' : `<line class="ch-line" x1="${x - 8}" x2="${x + 8}" y1="${y}" y2="${y}"/>`) + chartMarker(s.marker, x, y) }));
  const legTop = bottom + 68, H = legTop + Math.ceil(leg.length / 2) * 20;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.caption || 'Graph')}">${chartAxes(fig, sy, W, H, xT)}${series}${over}${chartLegend(leg, legTop, W)}</svg>`;
}
// Teaching annotations drawn on a line graph (each appears with a short animation):
//   axis: 'x' | 'y'                       highlight an axis and explain what it measures
//   shade: [{x1, x2, text}]                shade a stretch of the graph and name it ("reactants")
//   labels: [{series?, x, y?, text, at}]   a callout pointing at a point (on a series, or at x, y); at = above/below/left/right
//   spans: [{x, from, to, text}]           a two-headed measuring arrow between two levels at x, labeled ("Ea = 80")
function chartAnnotations(fig, ov, sx, sy, bottom, W) {
  const C = CHART, f = n => n.toFixed(1);
  const yOf = (a) => { if (a.y != null) return a.y; const s = fig.series.find(t => t.name === a.series); const pt = s && s.points.find(([x]) => x === a.x); return pt ? pt[1] : null; };
  let out = '';
  (ov.shade || []).forEach((b, i) => {
    const x1 = sx(Math.max(fig.x.min, b.x1)), x2 = sx(Math.min(fig.x.max, b.x2));
    out += `<g class="ch-anim ch-d${Math.min(i, 3)}"><rect class="ch-shade" x="${f(x1)}" y="${C.T}" width="${f(Math.max(2, x2 - x1))}" height="${C.H}"/>` + (b.text ? `<text class="ch-ann" x="${f((x1 + x2) / 2)}" y="${C.T + 16}" text-anchor="middle">${chartText(b.text)}</text>` : '') + '</g>';
  });
  if (ov.axis === 'y') out += `<g class="ch-anim"><line class="ch-axis-hl" x1="${C.L}" x2="${C.L}" y1="${C.T}" y2="${bottom}"/><path class="ch-ann-line" d="M${C.L + 6} ${C.T + 18} l14 0 M${C.L + 6} ${C.T + 18} l6 -5 M${C.L + 6} ${C.T + 18} l6 5"/><text class="ch-ann" x="${C.L + 24}" y="${C.T + 22}">higher = more ${chartText(String(fig.y.label).replace(/\s*\(.*\)\s*$/, '').toLowerCase())}</text></g>`;
  if (ov.axis === 'x') out += `<g class="ch-anim"><line class="ch-axis-hl" x1="${C.L}" x2="${W - C.R}" y1="${bottom}" y2="${bottom}"/><text class="ch-ann" x="${W - C.R - 4}" y="${bottom - 8}" text-anchor="end">→ ${chartText(String(fig.x.label).toLowerCase())}</text></g>`;
  (ov.spans || []).forEach((sp, i) => {
    const x = sx(sp.x), y1 = sy(sp.from), y2 = sy(sp.to), dir = y2 < y1 ? 1 : -1, d = `ch-anim ch-d${Math.min(i + 1, 3)}`;
    out += `<g class="${d}"><line class="ch-span-guide" x1="${C.L}" x2="${f(x)}" y1="${f(y1)}" y2="${f(y1)}"/><line class="ch-span-guide" x1="${C.L}" x2="${f(x)}" y1="${f(y2)}" y2="${f(y2)}"/>` +
      `<path class="ch-span" d="M${f(x)} ${f(y1)} V${f(y2)} M${f(x - 5)} ${f(y2 + 8 * dir)} L${f(x)} ${f(y2)} L${f(x + 5)} ${f(y2 + 8 * dir)} M${f(x - 5)} ${f(y1 - 8 * dir)} L${f(x)} ${f(y1)} L${f(x + 5)} ${f(y1 - 8 * dir)}"/>` +
      (sp.text ? `<text class="ch-ann ch-span-text" x="${f(sp.side === 'left' ? x - 9 : x + 9)}" y="${f((y1 + y2) / 2 + 5)}"${sp.side === 'left' ? ' text-anchor="end"' : ''}>${chartText(sp.text)}</text>` : '') + '</g>';
  });
  (ov.labels || []).forEach((lb, i) => {
    const yv = yOf(lb); if (yv == null) return;
    const px = sx(lb.x), py = sy(yv), at = lb.at || 'above';
    const [dx, dy, anchor] = at === 'below' ? [0, 34, 'middle'] : at === 'left' ? [-34, -6, 'end'] : at === 'right' ? [34, -6, 'start'] : [0, -30, 'middle'];
    // Callout tag: a filled label (sized to its text) joined to the point by a line; it is kept inside the plot area.
    const tw = Math.min(W - C.L - C.R, String(lb.text).length * 11.5 + 16), th = 28;
    let bx = anchor === 'end' ? px + dx - tw : anchor === 'start' ? px + dx : px + dx - tw / 2;
    bx = Math.min(W - C.R - tw, Math.max(C.L + 2, bx));
    const by = Math.max(C.T, Math.min(bottom - th, py + dy - th / 2));
    const cx = Math.min(Math.max(px, bx + 8), bx + tw - 8), cy = py < by ? by : py > by + th ? by + th : by + th / 2;
    out += `<g class="ch-anim ch-d${Math.min(i, 3)}"><line class="ch-ann-line" x1="${f(px)}" y1="${f(py)}" x2="${f(cx)}" y2="${f(cy)}"/><circle class="ch-ring" cx="${f(px)}" cy="${f(py)}" r="8"/>` +
      `<rect class="ch-tag" x="${f(bx)}" y="${f(by)}" width="${f(tw)}" height="${th}" rx="5"/><text class="ch-tag-text" x="${f(bx + tw / 2)}" y="${f(by + 19.5)}" text-anchor="middle">${chartText(lb.text)}</text></g>`;
  });
  return out;
}
function barChart(fig, ov) {
  const C = CHART, W = C.W, bottom = C.T + C.H, pw = W - C.L - C.R, n = fig.categories.length, k = fig.series.length;
  const sy = y => bottom - (y - fig.y.min) / (fig.y.max - fig.y.min) * C.H, gw = pw / n, bw = Math.min(40, gw * 0.7 / k);
  const hl = new Set((ov && ov.bars || []).map(b => b[0] + '|' + b[1])), focus = new Set(ov && ov.focus || []), anyHl = hl.size > 0 || focus.size > 0;
  const xT = fig.categories.map((c, i) => { const cx = C.L + gw * (i + 0.5), words = String(c).split(' '), lines = [];
    words.forEach(w => { if (lines.length && (lines[lines.length - 1] + ' ' + w).length <= 14) lines[lines.length - 1] += ' ' + w; else lines.push(w); });
    return lines.slice(0, 2).map((ln, j) => `<text class="ch-tl" x="${cx.toFixed(1)}" y="${bottom + 16 + j * 12}" text-anchor="middle">${chartText(ln)}</text>`).join(''); }).join('');
  let bars = '';
  fig.series.forEach((s, j) => s.values.forEach((v, i) => {
    const x = C.L + gw * (i + 0.5) - (bw * k) / 2 + j * bw, y = sy(v), on = hl.has(fig.categories[i] + '|' + s.name) || focus.has(s.name);
    bars += `<g class="ch-b${anyHl ? (on ? ' ch-focus' : ' ch-dim') : ''}"><rect class="ch-bar ch-bar${j}${on && hl.size ? ' ch-hlbar' : ''}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw - 3).toFixed(1)}" height="${(bottom - y).toFixed(1)}"/>`;
    const e = (s.errors || [])[i];
    if (e) { const cx = x + (bw - 3) / 2; bars += `<path class="ch-err" d="M${cx.toFixed(1)} ${sy(v + e).toFixed(1)}V${sy(Math.max(fig.y.min, v - e)).toFixed(1)}M${(cx - 4).toFixed(1)} ${sy(v + e).toFixed(1)}h8"/>`; }
    if (on && hl.size) bars += `<text class="ch-read" x="${(x + (bw - 3) / 2).toFixed(1)}" y="${(sy(v + (e || 0)) - 6).toFixed(1)}" text-anchor="middle">${chartNum(v)}</text>`;
    bars += '</g>'; }));
  const leg = fig.series.map((s, j) => ({ name: s.name, cls: 'ch-b', key: (x, y) => `<rect class="ch-bar ch-bar${j}" x="${x - 6}" y="${y - 6}" width="12" height="12"/>` }));
  const legTop = bottom + 68, H = legTop + Math.ceil(leg.length / 2) * 20;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.caption || 'Bar graph')}">${chartAxes(fig, sy, W, H, xT)}${bars}${k > 1 ? chartLegend(leg, legTop, W) : ''}</svg>`;
}
// Data tables and graphs for reasoning passages: {caption, columns, rows} or {type:'line'|'bar', …}
function figureHtml(fig, ov) {
  if (fig && (fig.type === 'line' || fig.type === 'bar') && Array.isArray(fig.series)) {
    return `<figure class="data-figure chart-figure">${fig.type === 'line' ? lineChart(fig, ov) : barChart(fig, ov)}${fig.caption ? `<figcaption>${fmt(fig.caption)}</figcaption>` : ''}</figure>`;
  }
  if (!fig || !Array.isArray(fig.columns)) return '';
  return `<figure class="data-figure">
    <table><thead><tr>${fig.columns.map(c => `<th>${fmt(c)}</th>`).join('')}</tr></thead>
      <tbody>${(fig.rows || []).map(r => `<tr>${r.map(c => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    ${fig.caption ? `<figcaption>${fmt(fig.caption)}</figcaption>` : ''}
  </figure>`;
}
function renderPassageQuestion() {
  clearStepContext();
  pq.answered = false;
  const view = pq.views[pq.idx], tot = pq.views.length;
  const timerPassage = pq.mini?.items[pq.idx]?.passage;
  setStudyTimerSubject(pq.mini && !pq.mini.mastery ? pq.mini.subj : timerPassage || !pq.mini ? disciplineOfPassage(timerPassage || pq.p, view.q) : disciplineOfRecall(view.q));
  $('pp-fill').style.width = (pq.idx / tot) * 100 + '%';
  $('pp-counter').textContent = `${pq.idx + 1} / ${tot}`;
  $('pp-subject').textContent = pq.p.title;
  $('pp-score').textContent = `✓ ${pq.results.filter(r => r.right).length}/${pq.results.length}`;
  pq.qStart = Date.now();
  if (pq.mini) {
    const passage = pq.mini.items[pq.idx].passage;
    if (passage) fillPassageBox(passage); else { $('pp-passage-box').innerHTML = '<p class="muted-note">Discrete question · no passage</p>'; if ($('pp-passage-box').dataset) $('pp-passage-box').dataset.shown = ''; }
    $('pp-score').textContent = pq.results.length + '/' + tot + ' answered · feedback at end';
  }
  // Practice Exam questions can show a molecule, answer-choice drawings or a graph: load the drawings once.
  if (typeof STRUCT_SVG === 'undefined' && needsStructs(view.q)) ensureStructs().then(() => { if (activeScreen === 'screen-passage' && pq.views[pq.idx] === view && !pq.answered) renderPassageQuestion(); }).catch(() => {});
  $('pp-question-box').innerHTML = `
    <div class="question-box"><div class="q-toolbar"><span class="q-tag">Question ${pq.idx + 1} of ${tot}${view.q.skill ? ` · ${esc(SKILL_LABEL[view.q.skill] || view.q.skill)}` : ''}</span></div>
      <div class="question-text">${fmt(view.q.q)}</div>${stemFigs(view.q)}${view.q.chart ? figureHtml(view.q.chart) : ''}</div>
    <div class="choices">${choiceButtons(view.choices, 'answerPassage', { prefix: 'pc', view })}</div>
    <div id="pp-exp"></div><div id="pp-next"></div>`;
}
function finishPassageAnswer(chosen, other = null, answerMs = null) {
  if (pq.mini) {
    if (Date.now() - pq.startedAt >= pq.targetMs) { pq.mini.timedOut = true; miniTimeUp($('pp-timer')); return; }
    miniAnswer(chosen, other, answerMs ?? (Date.now() - pq.qStart)); return;
  }
  if (pq.answered) return;
  pq.answered = true;
  const view = pq.views[pq.idx];
  const right = chosen === view.ans;
  pq.results.push({ view, chosen, right, other, ms: answerMs ?? (Date.now() - pq.qStart) });
  recordEvidence('passage', disciplineOfPassage(pq.p, view.q), right);
  if (view.q.skill) recordEvidence('skill', view.q.skill, right);
  countAnswerToday();
  pq.errPending = right ? null : { id: `${pq.p.id}#${pq.idx}`, disc: disciplineOfPassage(pq.p, view.q), key: null, type: null,
    chosen: view.choices[chosen], answer: view.choices[view.ans], other: other == null ? null : view.choices[other], correctInFinalTwo: right || other === view.ans, src: 'passage' };
  view.choices.forEach((_, i) => {
    const b = $('pc-' + i);
    b.disabled = true;
    if (i === view.ans) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });
  $('pp-score').textContent = `✓ ${pq.results.filter(r => r.right).length}/${pq.results.length}`;
  $('pp-exp').innerHTML = finalTwoFeedback(view, chosen, other) + explanationBox(right, view.choices[view.ans], view.q.exp, issueUrl(`Passage · ${pq.p.title}`, view.q.q)) + howBox(view.q, { ctx: { mode: 'passage', passage: pq.p.passage, figure: pq.p.figure, view, prefix: 'pc' } });
  applyStepContext();
  const last = pq.idx + 1 >= pq.views.length;
  $('pp-next').innerHTML = `${right ? '' : wrongAlternativePanel('passage',view,chosen,other)+errorTypeRow(null, 'setPassageErr')}<button class="next-btn" id="pp-next-btn" data-click="nextPassageQ()">${last ? 'See results →' : 'Next question →'}</button>`;
  $('pp-next-btn').focus({ preventScroll: true });
}
function setPassageErr(t) {
  if (!pq.errPending) return;
  pq.errPending.type = t;
  markErrorButtons(t);
}
function flushPassageErr() {
  if (!pq.errPending) return;
  const r=pq.results.at(-1);
  if(r)recordFinalTwo(r.view,r.chosen,r.other,'passage:'+pq.startedAt+':'+pq.idx);
  logError(Object.assign({}, pq.errPending, { type: pq.errPending.type || 'unlabeled' }));
  pq.errPending = null;
}
function nextPassageQ() {
  if (!pq.answered || pq.completed || pq.mini?.completed) return;
  flushPassageErr();
  if (pq.idx + 1 >= pq.views.length) { showPassageResults(); return; }
  pq.idx++;
  renderPassageQuestion();
  $('pp-question-box').scrollIntoView({ block: 'start', behavior: 'smooth' });
}
function showPassageResults() {
  setTimeout(() => window.McatAccount?.flush?.(), 0);   // a finished section or session goes to the cloud now
  if (pq.mini) { finishSubjectMini(); return; }
  if (pq.completed) return;
  pq.completed = true;
  window.McatPages?.screen('screen-passage', 'results');
  if (typeof document !== 'undefined' && document.body) document.body.classList.remove('exam-mode');
  flushPassageErr();
  const tot = pq.results.length, cor = pq.results.filter(r => r.right).length, p = pct(cor, tot);
  recordPassageEvidence(pq.p, pq.results, pq.firstExposure, 'tutor');
  const pstats = store.get(KEYS.passages, {});
  const prev = pstats[pq.p.id] || { attempts: 0, best: 0 };
  pstats[pq.p.id] = { attempts: prev.attempts + 1, last: p, best: Math.max(prev.best, p), lastAt: Date.now() };
  logStudyWork(disciplineOfPassage(pq.p), 'passage', cor, tot);
  store.set(KEYS.passages, pstats);
  const missed = pq.results.filter(r => !r.right);
  const color = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';
  stopPassageTimer();
  const used = Date.now() - pq.startedAt, target = pq.targetMs;
  const paceMsg = used <= target
    ? `On pace: ${fmtTime(used)} vs. the AAMC pace of ${fmtTime(target)}.`
    : `Over pace by ${fmtTime(used - target)} (${fmtTime(used)} vs. ${fmtTime(target)}). On test day, aim to read the passage once and move on from any question that runs long.`;
  const slow = pq.results.map((r, i) => ({ i, ms: r.ms || 0 })).filter(r => r.ms > target / tot * 1.5);
  $('pp-fill').style.width = '100%';
  $('pp-passage-box').innerHTML = '';
  $('pp-question-box').innerHTML = `
    <div class="results-hero">
      <div class="r-label">Passage complete</div>
      <div class="score-pct" data-css="color:${color}">${p}%</div>
      <div class="score-sub">${cor} / ${tot} correct · ${esc(pq.p.title)}</div>
    </div>
    <div class="results-card"><div class="section-label">Pacing</div>
      <p class="muted-note">${paceMsg}${slow.length ? ` Slowest: ${slow.map(s => `Q${s.i + 1} (${fmtTime(s.ms)})`).join(', ')}.` : ''}</p>
    </div>
    <div class="results-card"><div class="section-label">Missed questions</div>
      ${missed.length ? missed.map(r => reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp })).join('')
        : '<div class="all-correct">✓ Perfect — no missed questions.</div>'}
    </div>
    <div class="btn-row"><button class="new-quiz-btn" data-click="startPassage()">Retry passage</button>
      <button class="new-quiz-btn secondary" data-click="goHome()">Home</button>
    </div>
    ${(snapshotEstimate(), scoreStrip())}`;
  window.scrollTo(0, 0);
}

// ════════════════════════════════════════════════════════════════
//  FULL-LENGTH EXAM ENGINE (test mode: no feedback until the end)
// ════════════════════════════════════════════════════════════════
const BREAK_AFTER_MIN = [10, 30, 10];
let exam = null;          // persisted state for the exam in progress
let examTimer = null;
const sectionCache = {};

function sectionQuestions(ei, si) {
  const key = ei + ':' + si;
  if (!sectionCache[key]) {
    const s = FULL_EXAMS[ei].sections[si];
    sectionCache[key] = s.passageIds
      ? s.passageIds.flatMap(pid => {
          const p = PASSAGE_BY_ID.get(pid);
          return p ? p.questions.map(q => ({ ...q, passageText: p.passage, passageTitle: p.title, passageId: p.id })) : [];
        })
      : s.questions;
  }
  return sectionCache[key];
}
function examDef() { return FULL_EXAMS[exam.ei]; }
function curSection() { return examDef().sections[exam.si]; }
function curQuestions() { return sectionQuestions(exam.ei, exam.si); }
function saveExam() { store.set(KEYS.examProgress(examDef().id), exam); }

function renderExamList() {
  const history = store.get(KEYS.examHistory, []);
  $('exam-list').innerHTML = `
    <div class="config-card">
      <div class="section-label">How the full-length exams work</div>
      <p class="muted-note">Four timed sections in AAMC order (C/P, CARS, B/B, P/S) with optional breaks. Like the real exam, there's no feedback until you finish. Then you get section scores, estimated percentiles, and a full answer review. The timer pauses if you leave, and progress is saved on this device.</p>
    </div>
    ${FULL_EXAMS.map((e, i) => {
      const saved = store.get(KEYS.examProgress(e.id), null);
      const last = history.filter(h => h.examId === e.id).slice(-1)[0];
      const counts = e.sections.map((s, si) => sectionQuestions(i, si).length);
      return `<div class="exam-card">
        <div>
          <div class="exam-title">${esc(e.title)}${saved ? ' <span class="pill">In progress</span>' : ''}</div>
          <div class="exam-meta">${counts.reduce((a, b) => a + b, 0)} questions · ${e.sections.reduce((a, s) => a + s.timeMin, 0)} min testing time + breaks</div>
          <div class="exam-sections">${e.sections.map((s, si) => `<span class="exam-sec"><b>${s.abbrev}</b> ${counts[si]}Q · ${s.timeMin}m</span>`).join('')}</div>
          ${last ? `<div class="exam-meta">Last score: <b>${Number.isFinite(last.total) ? last.total : '—'}</b> (${new Date(last.date).toLocaleDateString()})</div>` : ''}
        </div>
        <div class="exam-actions">
          <button class="new-quiz-btn" data-click="startExam(${i})">${saved ? 'Resume' : 'Start exam'}</button>
          ${saved ? `<button class="text-btn" data-click="abandonExam(${i})">Discard progress</button>` : ''}
          ${store.get(KEYS.examLast(e.id), null) ? `<button class="text-btn" data-click="openLastExamReview(${i})">Review last attempt</button>` : ''}
        </div>
      </div>`;
    }).join('')}`;
}
function abandonExam(i) {
  if (!confirm('Discard your progress on this exam?')) return;
  store.del(KEYS.examProgress(FULL_EXAMS[i].id));
  renderHome();
}
function validExamProgress(x, ei) {
  if (!x || typeof x !== 'object') return null;
  const n = FULL_EXAMS[ei].sections.length, lens = FULL_EXAMS[ei].sections.map((_, si) => sectionQuestions(ei, si).length);
  const rows = k => Array.isArray(x[k]) && x[k].length === n && x[k].every((r, si) => Array.isArray(r) && r.length === lens[si]);
  const ok = Number.isInteger(x.si) && x.si >= 0 && x.si < n && Number.isInteger(x.qi) && x.qi >= 0 && x.qi < lens[x.si]
    && ['intro', 'question', 'review', 'break', 'complete'].includes(x.phase) && rows('answers') && rows('marked')
    && x.answers.every(r => r.every(a => a === null || Number.isInteger(a))) && Array.isArray(x.orders) && x.orders.length === n
    && Array.isArray(x.elapsed) && x.elapsed.length === n && x.elapsed.every(Number.isFinite) && Array.isArray(x.results);
  return ok ? x : null;
}
function startExam(ei) {
  // Saved progress can arrive from another device: discard it unless its shape is sound.
  const saved = validExamProgress(store.get(KEYS.examProgress(FULL_EXAMS[ei].id), null), ei);
  exam = saved || {
    ei, si: 0, qi: 0, phase: 'intro',
    answers: FULL_EXAMS[ei].sections.map((_, si) => new Array(sectionQuestions(ei, si).length).fill(null)),
    marked: FULL_EXAMS[ei].sections.map((_, si) => new Array(sectionQuestions(ei, si).length).fill(false)),
    orders: FULL_EXAMS[ei].sections.map(() => null),
    elapsed: FULL_EXAMS[ei].sections.map(() => 0),
    results: [],
    startedAt: Date.now(),
  };
  exam.alternatives ||= exam.answers.map(row => row.map(() => null));
  exam.ei = ei;
  show('screen-exam');
  renderExam();
}
function ensureOrders() {
  if (!exam.orders[exam.si]) {
    exam.orders[exam.si] = curQuestions().map(q => choiceOrder(q.choices));
    saveExam();
  }
}
function examView(si, qi) {
  const q = sectionQuestions(exam.ei, si)[qi];
  const order = exam.orders[si][qi];
  return { q, choices: order.map(i => q.choices[i]), ans: order.indexOf(q.ans) };
}

function renderExam() {
  stopExamTimer();
  const s = curSection();
  $('ex-section').textContent = `${s.abbrev} · ${s.label}`;
  if (exam.phase === 'intro') return renderSectionIntro();
  if (exam.phase === 'break') return renderBreak();
  ensureOrders();
  if (!startExamTimer()) return;
  if (exam.phase === 'review') return renderSectionReview();
  renderExamQuestion();
}
function renderSectionIntro() {
  const s = curSection(), n = curQuestions().length;
  $('ex-counter').textContent = `Section ${exam.si + 1} of ${examDef().sections.length}`;
  $('ex-timer').textContent = fmtTime(s.timeMin * 60000);
  $('ex-fill').style.width = '0%';
  $('exam-body').innerHTML = `<div class="interstitial">
    <div class="r-label">${esc(examDef().title)}</div>
    <h2>${esc(s.label)}</h2>
    <p>${n} questions · ${s.timeMin} minutes${s.passageIds ? ' · passage-based' : ''}</p>
    <ul class="tips">
      <li>Select answers with the mouse or keys <b>1–4</b> (or <b>A–D</b>). Move with <b>←/→</b>. Press <b>M</b> to mark a question for review.</li>
      <li>Use <b>Review</b> to see all questions, jump around, and end the section.</li>
      <li>When the timer reaches 0:00, the section ends automatically.</li>
    </ul>
    <button class="new-quiz-btn" data-click="beginSection()">Start section →</button>
    <button class="text-btn" data-click="goHome()">Save & exit</button>
  </div>`;
}
function beginSection() { exam.phase = 'question'; exam.qi = 0; saveExam(); renderExam(); }

function startExamTimer() {
  stopExamTimer();
  let last = Date.now();
  const tick = () => {
    const now = Date.now();
    exam.elapsed[exam.si] += now - last;
    last = now;
    const remaining = curSection().timeMin * 60000 - exam.elapsed[exam.si];
    const el = $('ex-timer');
    el.textContent = fmtTime(remaining);
    el.className = 'qm-timer' + (remaining < 300000 ? ' danger' : remaining < 600000 ? ' warn' : '');
    if (remaining <= 0) { stopExamTimer(); endSection(); return; }
    if (Math.floor(exam.elapsed[exam.si] / 1000) % 10 === 0) saveExam();
  };
  examTimer = setInterval(tick, 1000);
  tick();
  return exam.phase === 'question' || exam.phase === 'review';
}
function stopExamTimer() { if (examTimer) clearInterval(examTimer); examTimer = null; }

function renderExamQuestion() {
  const qs = curQuestions(), n = qs.length;
  setStudyTimerSubject(disciplineOfExamQuestion(curSection().id, qs[exam.qi]));
  const view = examView(exam.si, exam.qi);
  const chosen = exam.answers[exam.si][exam.qi];
  const marked = exam.marked[exam.si][exam.qi];
  $('ex-counter').textContent = `Question ${exam.qi + 1} of ${n}`;
  $('ex-fill').style.width = (exam.answers[exam.si].filter(a => a != null).length / n) * 100 + '%';
  const q = view.q;
  const questionHtml = `
    <div class="question-box">
      <div class="q-toolbar">
        <span class="q-tag">${q.passageTitle ? 'Passage-based' : 'Discrete'} · Q${exam.qi + 1}</span>
        <button class="flag-btn${marked ? ' on' : ''}" data-click="toggleMark()" aria-pressed="${marked}" title="Mark for review (M)">⚑ ${marked ? 'Marked' : 'Mark'}</button>
      </div>
      <div class="question-text">${fmt(q.q)}</div>
    </div>
    <div class="choices" role="radiogroup">${choiceButtons(view.choices, 'examPick', { selected: chosen, prefix: 'ec' })}</div>
    <div class="exam-nav">
      <button class="next-btn secondary" data-click="examNav(-1)" ${exam.qi === 0 ? 'disabled' : ''}>← Previous</button>
      <button class="next-btn secondary" data-click="openSectionReview()">Review</button>
      <button class="next-btn" data-click="examNav(1)">${exam.qi + 1 === n ? 'Review & end →' : 'Next →'}</button>
    </div>`;
  // Moving between questions on the same passage replaces only the question, so the passage keeps its scroll.
  const shown = $('ex-passage'), qBox = $('ex-question');
  if (q.passageTitle && shown && qBox && shown.dataset && shown.dataset.pid === String(q.passageId) && shown.isConnected !== false) qBox.innerHTML = questionHtml;
  else $('exam-body').innerHTML = q.passageTitle
    ? `<div class="split"><div class="split-passage" id="ex-passage">${passageCard('', q.passageTitle, q.passageText)}</div><div class="split-question" id="ex-question">${questionHtml}</div></div>`
    : questionHtml;
  // Keep the passage scrolled to the top when moving to a new passage
  const pane = $('ex-passage');
  if (pane && pane.dataset) pane.dataset.pid = q.passageId;
  if (pane && renderExamQuestion.lastPassage !== q.passageId) pane.scrollTop = 0;
  renderExamQuestion.lastPassage = q.passageId;
}
function examPick(i) {
  exam.answers[exam.si][exam.qi] = exam.answers[exam.si][exam.qi] === i ? null : i;
  exam.alternatives[exam.si][exam.qi] = null;
  saveExam();
  document.querySelectorAll('[id^="ec-"]').forEach((b, bi) => b.classList.toggle('selected', exam.answers[exam.si][exam.qi] === bi));
  $('ex-fill').style.width = (exam.answers[exam.si].filter(a => a != null).length / curQuestions().length) * 100 + '%';
}
function toggleMark() {
  exam.marked[exam.si][exam.qi] = !exam.marked[exam.si][exam.qi];
  saveExam();
  renderExamQuestion();
}
function examNav(dir) {
  const n = curQuestions().length;
  const next = exam.qi + dir;
  if (next < 0) return;
  if (next >= n) { openSectionReview(); return; }
  exam.qi = next;
  saveExam();
  renderExamQuestion();
  window.scrollTo(0, 0);
}
function openSectionReview() { exam.phase = 'review'; saveExam(); renderSectionReview(); }
function jumpTo(qi) { exam.phase = 'question'; exam.qi = qi; saveExam(); renderExamQuestion(); window.scrollTo(0, 0); }
function renderSectionReview() {
  const ans = exam.answers[exam.si], marks = exam.marked[exam.si];
  const unanswered = ans.filter(a => a == null).length;
  $('ex-counter').textContent = 'Section review';
  $('exam-body').innerHTML = `<div class="interstitial left">
    <h2>Review — ${esc(curSection().abbrev)}</h2>
    <p>${ans.length - unanswered} answered · <b>${unanswered} unanswered</b> · ${marks.filter(Boolean).length} marked. Select a number to go to that question.</p>
    <div class="nav-grid">${ans.map((a, i) => `<button class="nav-cell${a != null ? ' answered' : ''}${marks[i] ? ' marked' : ''}" data-click="jumpTo(${i})" aria-label="Question ${i + 1}${a != null ? ', answered' : ', unanswered'}${marks[i] ? ', marked' : ''}">${i + 1}</button>`).join('')}</div>
    <div class="legend"><span class="nav-cell answered">1</span> answered <span class="nav-cell">1</span> unanswered <span class="nav-cell marked">1</span> marked</div>
    <div class="btn-row">
      <button class="new-quiz-btn secondary" data-click="jumpTo(${exam.qi})">Return to question ${exam.qi + 1}</button>
      <button class="new-quiz-btn" data-click="confirmEndSection()">End section</button>
    </div>
  </div>`;
}
function confirmEndSection() {
  const unanswered = exam.answers[exam.si].filter(a => a == null).length;
  const msg = unanswered ? `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. There's no penalty for guessing. End the section anyway?` : 'End this section? You cannot return to it.';
  if (confirm(msg)) endSection();
}
function endSection() {
  setTimeout(() => window.McatAccount?.flush?.(), 0);   // a finished section or session goes to the cloud now
  if (!exam || !['question', 'review'].includes(exam.phase) || exam.results[exam.si]) return;
  stopExamTimer();
  ensureOrders();
  const qs = curQuestions();
  const sectionId = curSection().id;
  let correct = 0;
  store.batch(() => qs.forEach((q, i) => {
    const a = exam.answers[exam.si][i];
    const right = a != null && exam.orders[exam.si][i][a] === q.ans;
    if (right) correct++;
    recordEvidence('exam', disciplineOfExamQuestion(sectionId, q), right);
  }));
  const p = pct(correct, qs.length);
  exam.results[exam.si] = { correct, total: qs.length, pct: p, scaled: rawToScaled(p), timeMs: exam.elapsed[exam.si] };
  if (exam.si + 1 < examDef().sections.length) {
    exam.phase = 'break';
    exam.breakStart = Date.now();
    saveExam();
    renderExam();
  } else {
    finishExam();
  }
}
function renderBreak() {
  const mins = BREAK_AFTER_MIN[exam.si] || 10;
  const next = examDef().sections[exam.si + 1];
  $('ex-counter').textContent = 'Break';
  $('ex-fill').style.width = '0%';
  $('exam-body').innerHTML = `<div class="interstitial">
    <div class="r-label">Section ${exam.si + 1} complete</div>
    <h2>Optional ${mins}-minute break</h2>
    <p>The real exam offers a ${mins}-minute break here. Scores are shown at the end, as on test day.</p>
    <div class="break-clock" id="break-clock"></div>
    <p>Next: <b>${esc(next.label)}</b> · ${sectionQuestions(exam.ei, exam.si + 1).length} questions · ${next.timeMin} minutes</p>
    <button class="new-quiz-btn" data-click="continueAfterBreak()">Continue to ${esc(next.abbrev)} →</button>
    <button class="text-btn" data-click="goHome()">Save & exit</button>
  </div>`;
  const clock = () => {
    const el = $('break-clock');
    if (!el || exam.phase !== 'break') return;
    const left = mins * 60000 - (Date.now() - (exam.breakStart || Date.now()));
    el.textContent = left > 0 ? fmtTime(left) + ' remaining' : 'Break time is over';
    $('ex-timer').textContent = '';
  };
  clock();
  examTimer = setInterval(clock, 1000);
}
function continueAfterBreak() { exam.si++; exam.qi = 0; exam.phase = 'intro'; saveExam(); renderExam(); }

function finishExam() {
  exam.phase = 'complete';
  const def = examDef();
  const total = exam.results.length === def.sections.length ? exam.results.reduce((a, r) => a + r.scaled, 0) : null;
  const history = store.get(KEYS.examHistory, []);
  history.push({ examId: def.id, date: Date.now(), total, sections: def.sections.map((s, i) => ({ id: s.id, scaled: exam.results[i]?.scaled, pct: exam.results[i]?.pct })) });
  store.set(KEYS.examHistory, history);
  store.set(KEYS.examLast(def.id), { ei: exam.ei, answers: exam.answers, alternatives: exam.alternatives, marked: exam.marked, orders: exam.orders, results: exam.results, date: Date.now() });
  store.del(KEYS.examProgress(def.id));
  snapshotEstimate();
  showExamResults(store.get(KEYS.examLast(def.id)));
}
function openLastExamReview(ei) {
  const last = store.get(KEYS.examLast(FULL_EXAMS[ei].id), null);
  if (last) showExamResults(last);
}

const examReviewState = { attempt: null, si: 0, filter: 'incorrect' };
function showExamResults(attempt) {
  attempt = validExamAttempt(attempt);
  if (!attempt) { goHome(); return; }
  stopExamTimer();
  show('screen-exam-results');
  examReviewState.attempt = attempt;
  examReviewState.si = 0;
  const def = FULL_EXAMS[attempt.ei];
  const r = attempt.results;
  const complete = r.filter(Boolean).length === def.sections.length;
  const total = complete ? r.reduce((a, x) => a + x.scaled, 0) : null;
  $('exam-results-head').innerHTML = `
    <div class="results-hero">
      <div class="r-label">${esc(def.title)} · ${new Date(attempt.date).toLocaleDateString()}</div>
      ${total ? `<div class="score-pct">${total}</div>
        <div class="score-grade">Estimated total score · ${ordinal(TOTAL_PERCENTILE_MAP[total])} percentile</div>` : '<div class="score-grade">Incomplete exam</div>'}
    </div>
    <div class="section-grid">${def.sections.map((s, i) => {
      const x = r[i];
      if (!x) return `<div class="section-tile dim"><b>${s.abbrev}</b><span>Not completed</span></div>`;
      const pr = SECTION_PERCENTILE[s.id]?.[x.scaled];
      return `<div class="section-tile">
        <b>${s.abbrev}</b>
        <div class="tile-score" data-css="color:${scoreColor(x.scaled)}">${x.scaled}</div>
        <span>${x.correct}/${x.total} correct (${x.pct}%)</span>
        <span>${pr != null ? ordinal(pr) + ' percentile' : ''}</span>
        <span>Time used ${fmtTime(x.timeMs || 0)} of ${s.timeMin}:00</span>
      </div>`;
    }).join('')}</div>
    <p class="muted-note">Scaled scores are estimates. The AAMC converts raw scores separately for each test form. Percentiles are the AAMC ranks in effect May 1, 2026 – April 30, 2027.</p>
    ${examMissSummary(attempt).total ? `<div class="results-card study-misses">
      <div class="section-label">Turn mistakes into points</div>
      <p class="muted-note mt-0">The exam itself doesn't adapt, just like the real MCAT. This session does: it targets the subjects you missed, weighted by how many you missed, with the same drill-until-it-sticks reinforcement.</p>
      <button class="new-quiz-btn" data-click="studyExamMistakes()">Study my mistakes from this exam →</button>
      ${examMissSummary(attempt).cars ? `<p class="muted-note">CARS isn't fact recall, so for the ${examMissSummary(attempt).cars} CARS misses, reread each passage in the review and work out why the right answer fits it.</p>` : ''}
    </div>` : ''}
    ${examBreakdownCard(attempt)}`;
  renderExamReview();
}
// Missed exam questions counted by discipline (unanswered counts as missed)
function examMissSummary(attempt) {
  const def = FULL_EXAMS[attempt.ei];
  const byDisc = {};
  let total = 0, cars = 0;
  def.sections.forEach((s, si) => {
    if (!attempt.results[si]) return;
    sectionQuestions(attempt.ei, si).forEach((q, i) => {
      const o = attempt.orders[si] ? attempt.orders[si][i] : q.choices.map((_, k) => k);
      const a = attempt.answers[si][i];
      if (a != null && o[a] === q.ans) return;
      const d = disciplineOfExamQuestion(s.id, q);
      if (d === 'cars') { cars++; return; }
      if (d) { byDisc[d] = (byDisc[d] || 0) + 1; total++; }
    });
  });
  return { byDisc, total, cars };
}
// A recall session built from an exam's misses: each discipline gets questions in
// proportion to its misses, chosen from your weakest topics near the target success rate
function studyExamMistakes() {
  if (!bankReady('fl')) { withBank('fl', studyExamMistakes); return; }
  const { byDisc, total } = examMissSummary(examReviewState.attempt);
  if (!total) return;
  // Cards from the approved sets (AAMC QBank cards and Practice Exam cards), split over the disciplines of the
  // exam's misses in proportion to them, cards due or unseen first.
  const n = Math.min(40, Math.max(15, Math.round(total * 0.8)));
  const cards = [...AQB_QBANK, ...FLQ], items = [];
  Object.entries(byDisc).forEach(([d, misses]) => {
    const share = Math.max(1, Math.round((n * misses) / total));
    pickQuestions(cards.filter(q => disciplineOfRecall(q) === d && !items.some(x => x.q === q)), share).forEach(q => items.push({ q, reason: 'exam' }));
  });
  if (!items.length) { const el = $('page-notice'); if (el) { el.textContent = 'No cards cover the subjects of this exam’s misses yet. Review the missed questions above.'; el.hidden = false; window.scrollTo(0, 0); } return; }
  beginQuiz(interleave(items), 'Exam mistakes');
}
// Per-section breakdown by discipline and by question type (passage vs discrete)
function examBreakdownCard(attempt) {
  const def = FULL_EXAMS[attempt.ei];
  const blocks = def.sections.map((s, si) => {
    if (!attempt.results[si]) return '';
    const qs = sectionQuestions(attempt.ei, si);
    const byDisc = {}, byType = { passage: { c: 0, t: 0 }, discrete: { c: 0, t: 0 } };
    qs.forEach((q, i) => {
      const o = attempt.orders[si] ? attempt.orders[si][i] : q.choices.map((_, k) => k);
      const a = attempt.answers[si][i];
      const right = a != null && o[a] === q.ans;
      const d = disciplineOfExamQuestion(s.id, q) || 'other';
      byDisc[d] = byDisc[d] || { c: 0, t: 0 };
      byDisc[d].t++; if (right) byDisc[d].c++;
      const type = q.passageTitle ? 'passage' : 'discrete';
      byType[type].t++; if (right) byType[type].c++;
    });
    const rows = Object.entries(byDisc).sort((a, b) => b[1].t - a[1].t).map(([d, v]) => {
      const eq = Math.round(curveScore(RAW_TO_SCALED, (v.c / v.t) * 100));
      return `<div class="disc-row compact">
        <div class="disc-name">${esc(DISCIPLINES[d] || 'Other')}<span class="disc-weight">${v.t} question${v.t === 1 ? '' : 's'}</span></div>
        <div class="disc-score" data-css="color:${scoreColor(eq)}">${eq}</div>
        <div class="disc-bar">${scaleBar(eq)}</div>
        <div class="disc-meta">${v.c}/${v.t} correct (${pct(v.c, v.t)}%)${v.t < 8 ? ' · small sample' : ''}</div>
      </div>`;
    }).join('');
    const typeLine = s.id === 'cars' ? '' : `<p class="muted-note">Passage questions: ${byType.passage.c}/${byType.passage.t} (${pct(byType.passage.c, byType.passage.t)}%) · Discrete questions: ${byType.discrete.c}/${byType.discrete.t} (${pct(byType.discrete.c, byType.discrete.t)}%) · ${Math.round((attempt.results[si].timeMs || 0) / 1000 / qs.length)}s per question (AAMC pace ≈ ${Math.round(s.timeMin * 60 / qs.length)}s)</p>`;
    return `<div class="disc-section"><div class="disc-section-head">${s.abbrev} · ${esc(s.label)}</div>${rows}${typeLine}</div>`;
  }).join('');
  return blocks ? `<div class="results-card"><div class="section-label">Subject breakdown <span class="muted">(MCAT-equivalent of each subject's accuracy)</span></div>${blocks}</div>` : '';
}
function setExamReview(field, value) { examReviewState[field] = value; renderExamReview(); }
function renderExamReview() {
  const { attempt, si, filter } = examReviewState;
  const def = FULL_EXAMS[attempt.ei];
  const qs = sectionQuestions(attempt.ei, si);
  const order = attempt.orders[si];
  const items = qs.map((q, i) => {
    const o = order ? order[i] : q.choices.map((_, k) => k);
    const choices = o.map(k => q.choices[k]);
    const ans = o.indexOf(q.ans);
    const chosen = attempt.answers[si][i];
    return { i, q, choices, ans, chosen, other: attempt.alternativeReflections?.[si]?.[i] ? attempt.alternatives?.[si]?.[i] : null, right: chosen === ans, marked: attempt.marked[si][i] };
  });
  const shown = items.filter(x => filter === 'all' || (filter === 'incorrect' && !x.right) || (filter === 'marked' && x.marked));
  $('exam-review').innerHTML = `
    <div class="results-card">
      <div class="section-label">Answer review</div>
      <div class="seg-row">${def.sections.map((s, i) => `<button class="seg-btn${i === si ? ' active' : ''}" data-click="setExamReview('si',${i})">${s.abbrev}</button>`).join('')}</div>
      <div class="seg-row">${[['incorrect', 'Incorrect & unanswered'], ['marked', 'Marked'], ['all', 'All']].map(([f, l]) => `<button class="seg-btn small${f === filter ? ' active' : ''}" data-click="setExamReview('filter','${f}')">${l}</button>`).join('')}</div>
      ${attempt.results[si] ? (shown.length ? shown.map(x => `<div class="review-wrap"><div class="missed-tag">Q${x.i + 1}${x.marked ? ' · ⚑ marked' : ''}${x.right ? ' · ✓ correct' : ''}</div>${reviewItem({ stem: x.q.q, choices: x.choices, ans: x.ans, chosen: x.chosen, exp: x.q.exp, other: x.other, otherHandler: `setExamReviewAlternative.bind(null,${si},${x.i})`, otherId: `exam-other-${si}-${x.i}`, passageTitle: x.q.passageTitle })}</div>`).join('')
        : '<p class="muted-note">No questions match this filter.</p>') : '<p class="muted-note">This section was not completed.</p>'}
    </div>`;
}
function examHistoryCard() {
  const history = store.get(KEYS.examHistory, []);
  if (!history.length) return '';
  return `<div class="results-card"><div class="section-label">Full-length exam history</div>
    ${history.slice().reverse().map(h => {
      const e = FULL_EXAMS.find(x => x.id === h.examId);
      return `<div class="hist-row"><span>${new Date(h.date).toLocaleDateString()} · ${esc(e ? e.title : h.examId)}</span>
        <span>${h.sections.map(s => s.scaled ?? '—').join(' / ')} → <b>${h.total ?? '—'}</b></span></div>`;
    }).join('')}</div>`;
}

// ════════════════════════════════════════════════════════════════
//  ABOUT & DISCLAIMERS
// ════════════════════════════════════════════════════════════════
function showAbout() {
  stopQuizTimer();
  stopPassageTimer();
  show('screen-about');
  const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
  $('about-body').innerHTML = `
    <div class="results-hero"><div class="r-label">About &amp; disclaimers</div></div>
    <div class="results-card about">
      <h2>About this app</h2>
      <p>MCAT Study App is a free, open-source study tool by Collin B. George. It offers a daily study plan, AAMC-concept flashcards, AAMC-style Chem/Phys passages and timed full-length practice exams. Accounts are optional; guest study remains available, with no ads or study fees. The source code and content are on ${link(REPO_URL, 'GitHub')}.</p>

      <h2>Not affiliated with the AAMC</h2>
      <p>MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC). This app is independent: it is not affiliated with, sponsored by or endorsed by the AAMC. It contains no official AAMC exam questions. Section formats, timing and content shares follow the AAMC's public descriptions of the exam. For official information and practice materials, go to ${link('https://students-residents.aamc.org/taking-mcat-exam/take-mcat-exam', 'the AAMC MCAT website')}.</p>

      <h2>Educational use only, not medical advice</h2>
      <p>All content is for MCAT preparation. It is not medical, clinical, pharmacological or psychological advice, and it is not a substitute for a qualified professional. Some explanations mention drugs, doses, disorders and procedures. They are there to teach exam concepts, not to guide anyone's care.</p>

      <h2>Accuracy</h2>
      <p>The question bank was reviewed against current references, including the AAMC content outline and DSM-5-TR, but errors are still possible. Content is provided "as is", without warranty of any kind. Check important facts against your textbooks or official AAMC materials. If something looks wrong, use <b>Report a problem</b> under any explanation. Reports open as <b>public</b> GitHub issues, so don't include personal information.</p>

      <h2>Score estimates</h2>
      <p>Scaled scores, totals and percentiles in this app are <b>study estimates, not predictions</b> of an official MCAT score. The AAMC converts raw scores separately for each test form, and this app's questions are not AAMC questions. Percentile ranks use the AAMC tables in effect May 1, 2026 – April 30, 2027 (${link('https://www.aamc.org/services/mcat-admissions-officers/resources/percentile-ranks', 'source')}). Use AAMC scored practice exams as a standardized practice benchmark; they do not guarantee a test-day score.</p>

      <h2>Privacy</h2>
      <p>Guest progress stays in this browser. Optional accounts use Supabase Auth for email/password authentication and store signed-in progress with Supabase so it can be restored on other devices. The app does not store your password. When you create an account, set a new password, or sign in, the app checks the password against known data breaches: only the first 5 characters of the password's SHA-1 hash are sent to HaveIBeenPwned (api.pwnedpasswords.com), and nothing else. The password and its full hash never leave your device. There are no analytics, ads or tracking cookies. Check the cloud save status before closing the app; offline changes remain on the device until successfully synced. Reset all progress clears the active study copy and queues that cleared copy for cloud sync when signed in. Clearing browser storage alone does not delete cloud data. To delete your account and cloud data, sign in and use <b>Delete my account and cloud data</b> in the account panel; it is self-service, permanent and immediate. Do not put passwords or private study records in public GitHub issues.</p>
      <p>The site is hosted on GitHub Pages. Like any web host, GitHub may log basic technical information such as IP addresses under the ${link('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'GitHub Privacy Statement')}. Visits to mcat.collinbgeorge.com also pass through Cloudflare, which adds the site's security headers and keeps standard request logs such as IP address and requested URL.</p>

      <h2>Sources &amp; credits</h2>
      <ul>
        <li><b>AAMC Prep cards</b> (QBank cards and Practice Exam cards) are original questions written from the concepts tested in the AAMC question packs, question bank and practice exams. No AAMC passages, questions or answer choices are reproduced.</li>
        <li><b>Chem/Phys passages</b> (the diagnostic and daily quizzes), <b>CARS passages</b> and <b>full-length exam questions</b> are original to this app.</li>
        <li><b>Percentile ranks and section content shares</b> are taken from published AAMC information, credited above.</li>
      </ul>

      <h2>License</h2>
      <p>The app's code and original content are licensed under ${link('https://creativecommons.org/licenses/by-nc/4.0/', 'Creative Commons BY-NC 4.0')}. You may share and adapt them for non-commercial purposes with attribution.</p>

      <p class="muted-note">Version 2.7 · Last updated October 2026</p>
    </div>
    <div class="btn-row"><button class="new-quiz-btn secondary" data-click="goHome()">Home</button></div>`;
}

// ════════════════════════════════════════════════════════════════
//  KEYBOARD
// ════════════════════════════════════════════════════════════════
const KEY_TO_CHOICE = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  const choice = KEY_TO_CHOICE[k];
  if (activeScreen === 'screen-quiz') {
    const hidden = !quiz.answered && $('reveal-btn');
    if (hidden && (k === ' ' || k === 'enter')) { e.preventDefault(); revealChoices(); }
    else if (hidden) { /* choices are hidden until revealed */ }
    else if (choice !== undefined && !quiz.answered && choice < quiz.items[quiz.idx].choices.length) { e.preventDefault(); pick(choice); }
    else if ((k === 'enter' || k === ' ') && quiz.answered && e.target.tagName !== 'BUTTON') { e.preventDefault(); nextQ(); }
    else if (k === 'f') { e.preventDefault(); flagCurrent(); }
    else if (quiz.answered && (k === 'g' || k === 'u' || k === 'k')) { e.preventDefault(); setConfidence({ g: 'guess', u: 'unsure', k: 'knew' }[k]); }
  } else if (activeScreen === 'screen-passage' && pq.views.length) {
    if (choice !== undefined && !pq.answered && pq.idx < pq.views.length && $('pc-0')) { e.preventDefault(); answerPassage(choice); }
    else if ((k === 'enter' || k === ' ') && pq.answered && e.target.tagName !== 'BUTTON' && $('pp-next-btn')) { e.preventDefault(); nextPassageQ(); }
  } else if (activeScreen === 'screen-exam' && exam && exam.phase === 'question') {
    if (choice !== undefined) { e.preventDefault(); examPick(choice); }
    else if (k === 'arrowright' || k === 'n') { e.preventDefault(); examNav(1); }
    else if (k === 'arrowleft' || k === 'p') { e.preventDefault(); examNav(-1); }
    else if (k === 'm' || k === 'f') { e.preventDefault(); toggleMark(); }
  } else if (k === 'escape' && ['screen-results', 'screen-exam-results', 'screen-about'].includes(activeScreen)) {
    goHome();
  }
});

// ════════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════════
goHome();
initStudyTimer();
window.McatAccount?.init();
if(typeof window.addEventListener==='function')window.addEventListener('pagehide',()=>{commitPending();flushPassageErr();if(activeScreen==='screen-exam'&&exam)saveExam();});
// Offline cache on the deployed site only (keeps local development uncached; add ?sw to test it locally)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || new URLSearchParams(location.search).has('sw'))) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
}

function setMiniReviewAlternative(i,value) {
  if(!pq.mini?.completed)return;
  const r=pq.results[i];if(!r || r.right || r.chosen==null || !validAlternative(r.view,r.chosen,value))return;
  r.other=value===''?null:Number(value);
  recordFinalTwo(r.view,r.chosen,r.other,'mini:'+pq.startedAt+':'+i);
  $('alternative-feedback-mini-other-'+i).innerHTML=finalTwoFeedback(r.view,r.chosen,r.other);
}
function setExamReviewAlternative(si,qi,value) {
  const attempt=examReviewState.attempt;
  if(!attempt?.results[si])return;
  const q=sectionQuestions(attempt.ei,si)[qi], order=attempt.orders[si]?.[qi] || q.choices.map((_,i)=>i);
  const view={q,choices:order.map(i=>q.choices[i]),ans:order.indexOf(q.ans)},chosen=attempt.answers[si][qi];
  if(chosen==null || chosen===view.ans || !validAlternative(view,chosen,value))return;
  attempt.alternatives ||= attempt.answers.map(row=>row.map(()=>null));
  const other=value===''?null:Number(value);attempt.alternatives[si][qi]=other;
  attempt.alternativeReflections ||= attempt.answers.map(row=>row.map(()=>false));
  attempt.alternativeReflections[si][qi]=other!=null;
  const key=KEYS.examLast(FULL_EXAMS[attempt.ei].id),saved=store.get(key,null);
  if(saved?.date===attempt.date)store.set(key,attempt);
  recordFinalTwo(view,chosen,other,'exam:'+attempt.date+':'+si+':'+qi);
  $('alternative-feedback-exam-other-'+si+'-'+qi).innerHTML=finalTwoFeedback(view,chosen,other);
}
