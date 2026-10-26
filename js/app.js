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
  return String(text ?? '')
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
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ } },
  del(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } },
};
const KEYS = {
  prefs: 'mcat2_prefs',
  stats: 'mcat2_stats',        // { "subject|tag": {c, t} }
  srs: 'mcat2_srs',            // { questionId: {box, due, seen, right} }
  flags: 'mcat2_flags',        // { questionId: true }
  passages: 'mcat2_passages',  // { passageId: {attempts, last, best} }
  examProgress: id => 'mcat2_exam_' + id,
  examLast: id => 'mcat2_exam_last_' + id,
  examHistory: 'mcat2_exam_history',
};

// ════════════════════════════════════════════════════════════════
//  QUESTION BANK ASSEMBLY & TAXONOMY
// ════════════════════════════════════════════════════════════════
const SUBJECTS = [
  { id: 'biochemistry', label: 'Biochemistry', groups: [
    { label: 'Amino Acids & Proteins', chips: [
      { label: 'Amino Acids', tags: ['Amino Acids'] },
      { label: 'Protein Structure & Function', tags: ['Proteins', 'General'] },
    ]},
    { label: 'Enzymes', chips: [
      { label: 'Mechanism of Action', tags: ['Enzymes'] },
      { label: 'Kinetics (Michaelis–Menten)', tags: ['Enzymes: Kinetics'] },
      { label: 'Inhibition & Regulation', tags: ['Enzymes: Regulation'] },
    ]},
    { label: 'Metabolism', chips: [
      { label: 'Glycolysis & Glucose Transport', tags: ['Metabolism: Glycolysis', 'Metabolism: Monosaccharides', 'Metabolism: Glucose Transport', 'Metabolism'] },
      { label: 'Gluconeogenesis', tags: ['Metabolism: Gluconeogenesis'] },
      { label: 'Glycogen', tags: ['Metabolism: Glycogen'] },
      { label: 'Acetyl-CoA & PDH', tags: ['Metabolism: Acetyl-CoA'] },
      { label: 'Citric Acid Cycle', tags: ['Metabolism: TCA Cycle'] },
      { label: 'ETC & Oxidative Phosphorylation', tags: ['Metabolism: ETC'] },
      { label: 'Fatty Acid Oxidation', tags: ['Metabolism: Fatty Acids'] },
      { label: 'Pentose Phosphate Pathway', tags: ['Metabolism: PPP'] },
      { label: 'Urea Cycle', tags: ['Metabolism: Urea Cycle'] },
      { label: 'Lipid Metabolism', tags: ['Lipid Metabolism'] },
    ]},
    { label: 'Nucleic Acids & Gene Expression', chips: [
      { label: 'DNA Structure & Chromosomes', tags: ['DNA & RNA: Structure', 'DNA & RNA: Nucleic Acids', 'DNA & RNA: Chromosomes'] },
      { label: 'Replication', tags: ['DNA & RNA: Replication'] },
      { label: 'Repair & Mutation', tags: ['DNA & RNA: Repair'] },
      { label: 'Transcription & RNA Processing', tags: ['DNA & RNA: Transcription', 'DNA & RNA: RNA Processing'] },
      { label: 'Translation', tags: ['DNA & RNA: Translation'] },
      { label: 'Nucleic Acids — General', tags: ['DNA & RNA'] },
      { label: 'Lab Techniques', tags: ['Lab Techniques'] },
    ]},
    { label: 'Membranes, Lipids & Carbohydrates', chips: [
      { label: 'Membrane Structure & Transport', tags: ['Cell Membrane'] },
      { label: 'Lipids', tags: ['Lipids'] },
      { label: 'Carbohydrates', tags: ['Carbohydrates'] },
      { label: 'Biosignaling', tags: ['Biosignaling'] },
    ]},
  ]},
  { id: 'biology', label: 'Biology', groups: [
    { label: 'Cell Biology & Genetics', chips: [
      { label: 'Cell Structure & Tissues', tags: ['Parts of Cell', 'Cytoskeleton', 'Tissues'] },
      { label: 'Cell Cycle, Mitosis & Meiosis', tags: ['Reproduction: Cell Cycle', 'Reproduction: Mitosis', 'Reproduction: Meiosis'] },
      { label: 'Genetics & Inheritance', tags: ['Genetics', 'Biochemistry: DNA and RNA'] },
      { label: 'Evolution', tags: ['Evolution'] },
      { label: 'Viruses & Bacteria', tags: ['Viruses and Bacteria'] },
    ]},
    { label: 'Nervous System', chips: [
      { label: 'Neurons & Glia', tags: ['Nervous System: Structure'] },
      { label: 'Action Potential', tags: ['Nervous System: Action Potential'] },
      { label: 'Synapses', tags: ['Nervous System: Synapses'] },
      { label: 'Neurotransmitters', tags: ['Nervous System: Neurotransmitters'] },
      { label: 'Sensory Systems', tags: ['Behavioral: Sensation and Perception', 'Behavioral: Biology and Behavior'] },
    ]},
    { label: 'Musculoskeletal System', chips: [
      { label: 'Muscle Types & Control', tags: ['Muscular System'] },
      { label: 'Muscle Contraction', tags: ['Muscular System: Contraction'] },
      { label: 'Bone & Skeleton', tags: ['Muscular System: Bones'] },
    ]},
    { label: 'Cardiovascular & Respiratory', chips: [
      { label: 'Heart, Blood & Circulation', tags: ['Cardiovascular System'] },
      { label: 'Airway Anatomy', tags: ['Respiratory System: Pathway'] },
      { label: 'Respiratory Physiology', tags: ['Respiratory System', 'Respiratory System: Bicarbonate Buffer'] },
    ]},
    { label: 'Endocrine, Reproduction & Development', chips: [
      { label: 'Hormones & Signaling', tags: ['Endocrine', 'Biochemistry: Metabolism'] },
      { label: 'Reproduction', tags: ['Reproduction', 'Reproduction: Organs', 'Reproduction: Hormones'] },
      { label: 'Development', tags: ['Development'] },
      { label: 'Thermoregulation', tags: ['Thermoregulation'] },
    ]},
    { label: 'Immune, Digestive, Renal & Skin', chips: [
      { label: 'Innate Immunity', tags: ['Immune System: Innate', 'Immune System'] },
      { label: 'Adaptive Immunity', tags: ['Immune System: Adaptive', 'Immune System: Lymphatic System'] },
      { label: 'Digestion', tags: ['Digestion', 'Digestion: Stomach', 'Digestion: Small Intestine', 'Digestion: Large Intestine', 'Digestion: Other Organs'] },
      { label: 'Kidney', tags: ['Kidney'] },
      { label: 'Skin', tags: ['Skin'] },
    ]},
  ]},
  { id: 'gen_chem', label: 'General Chemistry', groups: [
    { label: 'Atomic Structure & Bonding', chips: [
      { label: 'Atomic Structure', tags: ['Atomic Structure', 'General Chemistry', 'Constants', 'Compounds'] },
      { label: 'Quantum Numbers', tags: ['Atomic Structure: Quantum Numbers'] },
      { label: 'Periodic Trends', tags: ['Periodic Table', 'Periodic Table: Periodic Trends'] },
      { label: 'Chemical Bonding', tags: ['Bonding'] },
      { label: 'Intermolecular Forces', tags: ['Intermolecular Forces'] },
    ]},
    { label: 'Thermodynamics, Kinetics & Equilibrium', chips: [
      { label: 'Thermochemistry', tags: ['Thermochemistry'] },
      { label: 'Kinetics', tags: ['Chemical Kinetics'] },
      { label: 'Equilibrium', tags: ['Equilibrium'] },
    ]},
    { label: 'Solutions, Acids & Electrochemistry', chips: [
      { label: 'Solutions & Solubility', tags: ['Solutions', 'Solutions: Solubility'] },
      { label: 'Acids & Bases', tags: ['Acids and Bases', 'Acids and Bases: pH and pKa'] },
      { label: 'Buffers & Titrations', tags: ['Acids and Bases: Buffers and Titrations'] },
      { label: 'Redox & Electrochemistry', tags: ['REDOX', 'Electrochemistry'] },
    ]},
  ]},
  { id: 'organic_chem', label: 'Organic Chemistry', groups: [
    { label: 'Organic Chemistry', chips: [
      { label: 'Bonding & Structure', tags: ['Bonding & Structure'] },
      { label: 'Reactions & Mechanisms', tags: ['Reactions & Mechanisms'] },
      { label: 'Carbonyl Chemistry', tags: ['Carbonyl Chemistry'] },
      { label: 'Spectroscopy', tags: ['Spectroscopy'] },
      { label: 'Separations & Lab Techniques', tags: ['Separations & Lab Techniques'] },
    ]},
  ]},
  { id: 'physics', label: 'Physics & Math', groups: [
    { label: 'Physics & Research Methods', chips: [
      { label: 'Motion, Forces & Energy', tags: ['Motion, Forces & Energy'] },
      { label: 'Fluids', tags: ['Fluids'] },
      { label: 'Electricity & Magnetism', tags: ['Electricity & Magnetism'] },
      { label: 'Waves, Sound & Light', tags: ['Waves, Sound & Light'] },
      { label: 'Nuclear & Atomic Physics', tags: ['Nuclear & Atomic Physics'] },
      { label: 'Research Methods & Statistics', tags: ['Research Methods & Statistics'] },
    ]},
  ]},
  { id: 'behavioral', label: 'Psychology & Sociology', groups: [
    { label: 'Behavioral Sciences', chips: [
      { label: 'Biological Bases of Behavior', tags: ['Biological Bases of Behavior'] },
      { label: 'Sensation & Perception', tags: ['Sensation & Perception'] },
      { label: 'Cognition, Learning & Memory', tags: ['Cognition, Learning & Memory'] },
      { label: 'Emotion, Motivation & Stress', tags: ['Emotion, Motivation & Stress'] },
      { label: 'Personality, Development & Disorders', tags: ['Personality, Development & Disorders'] },
      { label: 'Social Psychology & Society', tags: ['Social Psychology & Society'] },
    ]},
  ]},
];
const SUBJECT_LABEL = Object.fromEntries(SUBJECTS.map(s => [s.id, s.label]));
const ORGO_TAGS = new Set(['Bonding & Structure', 'Reactions & Mechanisms', 'Carbonyl Chemistry', 'Spectroscopy', 'Separations & Lab Techniques']);

const QB = [];
const QB_BY_ID = new Map();
[
  ['biochemistry', QB_BIOCHEMISTRY], ['biology', QB_BIOLOGY], ['chemistry', QB_CHEMISTRY],
  ['physics', QB_PHYSICS], ['behavioral', QB_BEHAVIORAL_1], ['behavioral', QB_BEHAVIORAL_2],
].forEach(([source, arr]) => arr.forEach(q => {
  const subj = source === 'chemistry' ? (ORGO_TAGS.has(q.s) ? 'organic_chem' : 'gen_chem') : source;
  let id = hashId(q.s + '|' + q.q);
  while (QB_BY_ID.has(id)) id += 'x';
  q.subj = subj;
  q.key = subj + '|' + q.s;
  q.id = id;
  QB.push(q);
  QB_BY_ID.set(id, q);
}));

// Resolve taxonomy chips to keys that actually exist; unmapped tags go to an "Other" chip
const KEY_COUNTS = {};
QB.forEach(q => { KEY_COUNTS[q.key] = (KEY_COUNTS[q.key] || 0) + 1; });
const KEY_LABEL = {};
SUBJECTS.forEach(subject => {
  const mapped = new Set();
  subject.groups.forEach(g => g.chips.forEach(chip => {
    chip.keys = chip.tags.map(t => subject.id + '|' + t).filter(k => KEY_COUNTS[k] && !mapped.has(k));
    chip.keys.forEach(k => { mapped.add(k); KEY_LABEL[k] = chip.label; });
  }));
  const other = Object.keys(KEY_COUNTS).filter(k => k.startsWith(subject.id + '|') && !mapped.has(k));
  if (other.length) {
    subject.groups[subject.groups.length - 1].chips.push({ label: 'Other', keys: other });
    other.forEach(k => { KEY_LABEL[k] = 'Other'; });
  }
  subject.groups.forEach(g => { g.chips = g.chips.filter(c => c.keys.length); g.keys = g.chips.flatMap(c => c.keys); });
  subject.keys = subject.groups.flatMap(g => g.keys);
});
const ALL_KEYS = SUBJECTS.flatMap(s => s.keys);
const countKeys = keys => keys.reduce((n, k) => n + (KEY_COUNTS[k] || 0), 0);

// ════════════════════════════════════════════════════════════════
//  PASSAGES
// ════════════════════════════════════════════════════════════════
const ALL_PASSAGES = [...PASSAGES, ...BIO_PASSAGES, ...GCHEM_PASSAGES, ...OCHEM_PASSAGES, ...PHYSICS_PASSAGES, ...BEHAVIORAL_PASSAGES, ...CARS_PASSAGES, ...CARS_EXTRA, ...EXAM2_CARS_PASSAGES];
const PASSAGE_BY_ID = new Map(ALL_PASSAGES.map(p => [p.id, p]));
const EXAM_PASSAGE_IDS = new Set(FULL_EXAMS.flatMap(e => e.sections.flatMap(s => s.passageIds || [])));
const PASSAGE_GROUPS = [
  { label: 'Biochemistry', test: id => /^p_(aa|enz|met|nuc|lip)/.test(id) },
  { label: 'Biology', test: id => id.startsWith('p_bio') },
  { label: 'General Chemistry', test: id => id.startsWith('p_gchem') },
  { label: 'Organic Chemistry', test: id => id.startsWith('p_oc') },
  { label: 'Physics & Math', test: id => id.startsWith('p_ph') },
  { label: 'Psychology & Sociology', test: id => id.startsWith('p_bs') },
  { label: 'CARS — Set 1', test: id => id.startsWith('p_cars') },
  { label: 'CARS — Set 2', test: id => id.startsWith('p_e2cars') },
];

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
      return Math.round(s0 + ((p - p0) / (p1 - p0 || 1)) * (s1 - s0));
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
//  SPACED REPETITION & STATS
// ════════════════════════════════════════════════════════════════
const SRS_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];
function recordAnswer(q, right) {
  const srs = store.get(KEYS.srs, {});
  const e = srs[q.id] || { box: 0, due: 0, seen: 0, right: 0 };
  e.seen++;
  if (right) { e.right++; e.box = Math.min(e.box + 1, SRS_INTERVAL_DAYS.length - 1); }
  else e.box = 0;
  e.due = Date.now() + SRS_INTERVAL_DAYS[e.box] * DAY;
  srs[q.id] = e;
  store.set(KEYS.srs, srs);

  const stats = store.get(KEYS.stats, {});
  const s = stats[q.key] || { c: 0, t: 0 };
  s.t++;
  if (right) s.c++;
  stats[q.key] = s;
  store.set(KEYS.stats, stats);
}
function dueQuestions() {
  const srs = store.get(KEYS.srs, {});
  const now = Date.now();
  return QB.filter(q => srs[q.id] && srs[q.id].due <= now);
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
  const srs = store.get(KEYS.srs, {});
  const now = Date.now();
  const due = [], fresh = [], later = [];
  pool.forEach(q => {
    const e = srs[q.id];
    if (!e) fresh.push(q);
    else if (e.due <= now) due.push(q);
    else later.push(q);
  });
  later.sort((a, b) => srs[a.id].due - srs[b.id].due);
  return shuffled([...shuffled(due), ...shuffled(fresh), ...later].slice(0, n));
}
function weakKeys() {
  const stats = store.get(KEYS.stats, {});
  return Object.entries(stats).filter(([k, s]) => KEY_COUNTS[k] && s.t >= 5 && s.c / s.t < 0.7).map(([k]) => k);
}

// ════════════════════════════════════════════════════════════════
//  SCREENS & HOME
// ════════════════════════════════════════════════════════════════
const SCREENS = ['screen-home', 'screen-quiz', 'screen-results', 'screen-passage', 'screen-exam', 'screen-exam-results'];
let activeScreen = 'screen-home';
function show(id) {
  SCREENS.forEach(s => { const el = $(s); if (el) el.hidden = s !== id; });
  activeScreen = id;
  window.scrollTo(0, 0);
}

const prefs = Object.assign({ mode: 'recall', count: 20, selected: null }, store.get(KEYS.prefs, {}));
let selectedKeys = new Set((prefs.selected || ALL_KEYS).filter(k => KEY_COUNTS[k]));
const openSubjects = new Set();
function savePrefs() { prefs.selected = [...selectedKeys]; store.set(KEYS.prefs, prefs); }

function goHome() {
  stopQuizTimer();
  stopExamTimer();
  show('screen-home');
  renderHome();
}

function renderHome() {
  const passageQs = ALL_PASSAGES.reduce((n, p) => n + p.questions.length, 0);
  $('hero-badge').textContent = `${QB.length.toLocaleString()} recall questions · ${ALL_PASSAGES.length} passages · ${FULL_EXAMS.length} full-length exams`;
  $('mode-recall-sub').textContent = `${QB.length.toLocaleString()} questions`;
  $('mode-passage-sub').textContent = `${ALL_PASSAGES.length} passages · ${passageQs} Qs`;
  $('mode-exam-sub').textContent = `${FULL_EXAMS.length} timed exams`;

  const due = dueQuestions().length;
  const flagged = Object.keys(flaggedIds()).filter(id => QB_BY_ID.has(id)).length;
  const weak = weakKeys().length;
  const inProgress = FULL_EXAMS.find(e => store.get(KEYS.examProgress(e.id), null));
  const actions = [];
  if (inProgress) actions.push(`<button class="action-btn primary" onclick="startExam(${FULL_EXAMS.indexOf(inProgress)})">Resume ${esc(inProgress.title)}</button>`);
  actions.push(`<button class="action-btn" ${due ? '' : 'disabled'} onclick="startDueReview()">Review due <b>${due}</b></button>`);
  actions.push(`<button class="action-btn" ${flagged ? '' : 'disabled'} onclick="startFlagged()">Flagged <b>${flagged}</b></button>`);
  actions.push(`<button class="action-btn" ${weak ? '' : 'disabled'} onclick="drillWeak()" title="Topics under 70% after at least 5 attempts">Drill weak topics <b>${weak}</b></button>`);
  actions.push(`<button class="action-btn" onclick="showProgress()">My progress</button>`);
  $('home-actions').innerHTML = actions.join('');

  setMode(prefs.mode);
}

function setMode(mode) {
  prefs.mode = mode;
  savePrefs();
  ['recall', 'passage', 'exam'].forEach(m => {
    $('btn-' + m).classList.toggle('active', m === mode);
    $('btn-' + m).setAttribute('aria-selected', m === mode);
    $(m + '-config').hidden = m !== mode;
  });
  $('start-btn').hidden = mode === 'exam';
  if (mode === 'recall') { renderCountRow(); renderSubjectGrid(); }
  if (mode === 'passage') renderPassageSelector();
  if (mode === 'exam') renderExamList();
}

function renderCountRow() {
  const opts = [10, 20, 30, 50, 100, 0];
  $('count-row').innerHTML = opts.map(n => `<button class="count-btn${prefs.count === n ? ' active' : ''}" onclick="setCount(${n})">${n || 'All'}</button>`).join('');
}
function setCount(n) { prefs.count = n; savePrefs(); renderCountRow(); updateAvail(); }

// ── Subject selector ──
function renderSubjectGrid() {
  const allOn = keys => keys.length && keys.every(k => selectedKeys.has(k));
  const someOn = keys => keys.some(k => selectedKeys.has(k));
  $('subject-grid').innerHTML = SUBJECTS.map((s, si) => {
    const open = openSubjects.has(si);
    const on = allOn(s.keys);
    const selCount = countKeys(s.keys.filter(k => selectedKeys.has(k)));
    return `<div class="sg-outer">
      <div class="sg-subject-row" role="button" tabindex="0" aria-expanded="${open}" onclick="toggleSubjectOpen(${si})" onkeydown="if(event.key==='Enter')toggleSubjectOpen(${si})">
        <span class="sg-subject-name">${esc(s.label)}</span>
        <span class="sg-subject-meta">
          <span class="sg-subject-count">${selCount === countKeys(s.keys) ? '' : selCount + ' of '}${countKeys(s.keys)} Q</span>
          <button class="sg-select-all" onclick="event.stopPropagation();setKeys(SUBJECTS[${si}].keys,${!on})">${on ? 'None' : 'All'}</button>
          <span class="sg-chevron${open ? ' open' : ''}">▾</span>
        </span>
      </div>
      <div class="sg-topics${open ? ' open' : ''}">
        ${s.groups.map((g, gi) => `
          ${s.groups.length > 1 ? `<div class="sg-topic-row">
            <span class="sg-topic-name">${esc(g.label)}</span>
            <span class="sg-topic-meta">
              <span class="sg-topic-count">${countKeys(g.keys)} Q</span>
              <button class="sg-topic-sel-all" onclick="setKeys(SUBJECTS[${si}].groups[${gi}].keys,${!allOn(g.keys)})">${allOn(g.keys) ? 'None' : 'All'}</button>
            </span>
          </div>` : ''}
          <div class="sg-chips">${g.chips.map((c, ci) => `
            <button class="sg-chip${allOn(c.keys) ? ' on' : someOn(c.keys) ? ' partial' : ''}" aria-pressed="${allOn(c.keys)}"
              onclick="setKeys(SUBJECTS[${si}].groups[${gi}].chips[${ci}].keys,${!allOn(c.keys)})">${esc(c.label)}<span class="sg-chip-count">${countKeys(c.keys)}</span></button>`).join('')}
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
  updateAvail();
}
function toggleSubjectOpen(si) { openSubjects.has(si) ? openSubjects.delete(si) : openSubjects.add(si); renderSubjectGrid(); }
function setKeys(keys, on) { keys.forEach(k => (on ? selectedKeys.add(k) : selectedKeys.delete(k))); savePrefs(); renderSubjectGrid(); }
function sgSelectAll() { setKeys(ALL_KEYS, true); }
function sgClearAll() { setKeys(ALL_KEYS, false); }
function updateAvail() {
  const n = countKeys([...selectedKeys]);
  const size = prefs.count ? Math.min(prefs.count, n) : n;
  $('avail-text').textContent = `${n.toLocaleString()} questions selected`;
  $('avail-session').textContent = n ? `Session: ${size} question${size === 1 ? '' : 's'}` : '';
  $('start-btn').disabled = prefs.mode === 'recall' && n === 0;
}

function startSession() {
  if (prefs.mode === 'recall') startRecall();
  else if (prefs.mode === 'passage') startPassage();
}

// ════════════════════════════════════════════════════════════════
//  RECALL QUIZ (tutor mode: immediate feedback)
// ════════════════════════════════════════════════════════════════
const quiz = { items: [], idx: 0, results: [], answered: false, startedAt: 0, qStart: 0, label: '', timer: null };

function makeView(q) {
  const order = shuffled(q.choices.map((_, i) => i));
  return { q, order, choices: order.map(i => q.choices[i]), ans: order.indexOf(q.ans) };
}
function startRecall() {
  const pool = QB.filter(q => selectedKeys.has(q.key));
  if (!pool.length) return;
  beginQuiz(pickQuestions(pool, prefs.count || pool.length), 'Recall');
}
function startDueReview() {
  const due = dueQuestions();
  if (due.length) beginQuiz(shuffled(due).slice(0, prefs.count || due.length), 'Due for review');
}
function startFlagged() {
  const flags = flaggedIds();
  const qs = QB.filter(q => flags[q.id]);
  if (qs.length) beginQuiz(shuffled(qs), 'Flagged questions');
}
function drillWeak() {
  const keys = new Set(weakKeys());
  const pool = QB.filter(q => keys.has(q.key));
  if (pool.length) beginQuiz(pickQuestions(pool, prefs.count || pool.length), 'Weak topics');
}
function retryMissed() {
  const missed = quiz.results.filter(r => !r.right).map(r => r.view.q);
  if (missed.length) beginQuiz(shuffled(missed), 'Retry missed');
}
function beginQuiz(questions, label) {
  Object.assign(quiz, { items: questions.map(makeView), idx: 0, results: [], answered: false, startedAt: Date.now(), label });
  show('screen-quiz');
  startQuizTimer();
  renderQuizQuestion();
}
function startQuizTimer() {
  stopQuizTimer();
  quiz.timer = setInterval(() => { $('qm-timer').textContent = fmtTime(Date.now() - quiz.startedAt); }, 1000);
}
function stopQuizTimer() { if (quiz.timer) clearInterval(quiz.timer); quiz.timer = null; }

function choiceButtons(choices, onclick, opts = {}) {
  return choices.map((c, i) => `
    <button class="choice-btn${opts.selected === i ? ' selected' : ''}" id="${opts.prefix || 'cb'}-${i}" onclick="${onclick}(${i})">
      <span class="choice-lbl">${LETTERS[i]}</span><span class="choice-text">${fmt(c)}</span>
    </button>`).join('');
}
function renderQuizQuestion() {
  quiz.answered = false;
  quiz.qStart = Date.now();
  const view = quiz.items[quiz.idx];
  const q = view.q;
  const correct = quiz.results.filter(r => r.right).length;
  $('pfill').style.width = (quiz.idx / quiz.items.length) * 100 + '%';
  $('qm-counter').textContent = `${quiz.idx + 1} / ${quiz.items.length}`;
  $('qm-subject').textContent = quiz.label;
  $('qm-score').textContent = `✓ ${correct}/${quiz.results.length}`;
  const flagged = !!flaggedIds()[q.id];
  $('quiz-body').innerHTML = `
    <div class="question-box">
      <div class="q-toolbar">
        <span class="q-tag">${esc(SUBJECT_LABEL[q.subj])} · ${esc(KEY_LABEL[q.key] || q.s)}</span>
        <button class="flag-btn${flagged ? ' on' : ''}" id="flag-btn" onclick="flagCurrent()" aria-pressed="${flagged}" title="Flag for later review (F)">⚑ ${flagged ? 'Flagged' : 'Flag'}</button>
      </div>
      <div class="question-text">${fmt(q.q)}</div>
    </div>
    <div class="choices" role="group" aria-label="Answer choices">${choiceButtons(view.choices, 'pick')}</div>
    <div id="exp-area"></div>
    <div id="nxt-area"></div>`;
}
function flagCurrent() {
  const q = quiz.items[quiz.idx].q;
  const on = toggleFlag(q.id);
  const btn = $('flag-btn');
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', on);
  btn.textContent = '⚑ ' + (on ? 'Flagged' : 'Flag');
}
function pick(chosen) {
  if (quiz.answered) return;
  quiz.answered = true;
  const view = quiz.items[quiz.idx];
  const right = chosen === view.ans;
  quiz.results.push({ view, chosen, right, ms: Date.now() - quiz.qStart });
  recordAnswer(view.q, right);
  view.choices.forEach((_, i) => {
    const b = $('cb-' + i);
    b.disabled = true;
    if (i === view.ans) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });
  $('qm-score').textContent = `✓ ${quiz.results.filter(r => r.right).length}/${quiz.results.length}`;
  $('exp-area').innerHTML = explanationBox(right, view.choices[view.ans], view.q.exp, issueUrl(`Recall · ${view.q.s}`, view.q.q));
  const last = quiz.idx + 1 >= quiz.items.length;
  $('nxt-area').innerHTML = `<button class="next-btn" id="next-btn" onclick="nextQ()">${last ? 'See results →' : 'Next →'}</button>
    <div class="kb-hint">Keys: 1–4 or A–D to answer · Enter for next · F to flag</div>`;
  $('next-btn').focus({ preventScroll: true });
}
function explanationBox(right, answerText, exp, reportUrl) {
  return `<div class="explanation-box ${right ? 'is-right' : 'is-wrong'}" role="status">
    <div class="exp-verdict">${right ? '✓ Correct' : '✗ Incorrect'} <span class="exp-answer">Answer: ${fmt(answerText)}</span></div>
    <div class="exp-text">${paragraphs(exp)}</div>
    ${reportUrl ? `<a class="report-link" href="${esc(reportUrl)}" target="_blank" rel="noopener">Report a problem with this question</a>` : ''}
  </div>`;
}
function nextQ() {
  if (quiz.idx + 1 >= quiz.items.length) { showQuizResults(); return; }
  quiz.idx++;
  renderQuizQuestion();
  window.scrollTo(0, 0);
}
function endQuiz() {
  if (quiz.results.length) showQuizResults();
  else goHome();
}

function showQuizResults() {
  stopQuizTimer();
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
  const missed = res.filter(r => !r.right);
  const flags = flaggedIds();
  const flaggedHere = res.filter(r => flags[r.view.q.id]);

  $('results-body').innerHTML = `
    <div class="results-hero">
      <div class="r-label">${esc(quiz.label)} · session complete</div>
      <div class="score-pct" style="color:${color}">${p}%</div>
      <div class="score-grade" style="color:${color}">${grade}</div>
      <div class="score-sub">${cor} of ${tot} correct · ${fmtTime(sessionMs)} total · ${Math.round(avg / 1000)}s per question</div>
    </div>
    <div class="results-card">
      <div class="section-label">This session by subject</div>
      ${Object.entries(bySubj).map(([s, v]) => barRow(SUBJECT_LABEL[s], v.c, v.t)).join('')}
      <p class="muted-note">Recall questions test isolated facts, so they aren't converted to an MCAT scaled score. Use the full-length exams for a score estimate.</p>
    </div>
    <div class="btn-row">
      ${missed.length ? `<button class="new-quiz-btn" onclick="retryMissed()">Retry ${plural(missed.length, 'missed question')}</button>` : ''}
      <button class="new-quiz-btn secondary" onclick="goHome()">Home</button>
    </div>
    <div class="results-card">
      <div class="section-label">Missed this session (${missed.length})</div>
      ${missed.length ? missed.map(r => reviewItem({
        stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, exp: r.view.q.exp,
        tag: `${SUBJECT_LABEL[r.view.q.subj]} · ${KEY_LABEL[r.view.q.key] || r.view.q.s}`,
      })).join('') : '<div class="all-correct">✓ Perfect session — nothing missed.</div>'}
      ${missed.length ? `<button class="micro-btn" style="margin-top:10px" onclick="exportMissed()">Download missed questions (.txt)</button>` : ''}
    </div>
    ${flaggedHere.length ? `<div class="results-card"><div class="section-label">Flagged this session (${flaggedHere.length})</div>
      <p class="muted-note">Flagged questions stay in your Flagged list on the home screen until you unflag them.</p></div>` : ''}
    ${progressCards()}`;
}
function barRow(label, c, t) {
  const p = pct(c, t);
  const col = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';
  return `<div class="subject-row">
    <div class="sr-name" title="${esc(label)}">${esc(label)}</div>
    <div class="sr-bar-wrap"><div class="sr-bar-fill" style="width:${p}%;background:${col}"></div></div>
    <div class="sr-pct">${p}%</div><div class="sr-n">${c}/${t}</div>
  </div>`;
}
function reviewItem({ stem, choices, ans, chosen, exp, tag, passageTitle }) {
  return `<div class="missed-item">
    ${tag ? `<div class="missed-tag">${esc(tag)}</div>` : ''}
    ${passageTitle ? `<div class="missed-tag">Passage: ${esc(passageTitle)}</div>` : ''}
    <div class="missed-q">${fmt(stem)}</div>
    <div class="missed-correct">✓ ${fmt(choices[ans])}</div>
    <div class="missed-wrong">${chosen == null ? '— Not answered' : chosen === ans ? '' : '✗ Your answer: ' + fmt(choices[chosen])}</div>
    <details class="missed-exp"><summary>Explanation</summary>${paragraphs(exp)}</details>
  </div>`;
}
function exportMissed() {
  const missed = quiz.results.filter(r => !r.right);
  const lines = ['MCAT Study App — Missed Questions', new Date().toLocaleString(), `${missed.length} missed of ${quiz.results.length}`, ''];
  missed.forEach((r, i) => {
    const q = r.view.q;
    lines.push(`${i + 1}. [${SUBJECT_LABEL[q.subj]} · ${q.s}]`, `Q: ${q.q.replace(/_{3,}/g, '____')}`,
      `Correct: ${r.view.choices[r.view.ans]}`, `Your answer: ${r.view.choices[r.chosen]}`, `Why: ${q.exp.replace(/\*\*/g, '')}`, '');
  });
  download(`MCAT_missed_${new Date().toISOString().slice(0, 10)}.txt`, lines.join('\n'));
}

// ── Cumulative progress ──
function progressCards() {
  const stats = store.get(KEYS.stats, {});
  const valid = Object.entries(stats).filter(([k]) => KEY_COUNTS[k]);
  if (!valid.length) return '';
  const bySubj = {};
  valid.forEach(([k, s]) => { const subj = k.split('|')[0]; bySubj[subj] = bySubj[subj] || { c: 0, t: 0 }; bySubj[subj].c += s.c; bySubj[subj].t += s.t; });
  const tot = valid.reduce((a, [, s]) => a + s.t, 0), cor = valid.reduce((a, [, s]) => a + s.c, 0);
  const srs = store.get(KEYS.srs, {});
  const seenIds = Object.keys(srs).filter(id => QB_BY_ID.has(id));
  const mastered = seenIds.filter(id => srs[id].box >= 3).length;
  const topics = valid.filter(([, s]) => s.t >= 5).map(([k, s]) => ({ k, p: s.c / s.t, s }));
  const weak = topics.filter(x => x.p < 0.7).sort((a, b) => a.p - b.p).slice(0, 8);
  const strong = topics.filter(x => x.p >= 0.85).sort((a, b) => b.p - a.p).slice(0, 5);
  const topicLabel = k => `${SUBJECT_LABEL[k.split('|')[0]]} · ${KEY_LABEL[k] || k.split('|')[1]}`;
  return `
    <div class="results-card">
      <div class="section-label">All-time progress</div>
      <div class="stat-row">
        <div class="stat"><b>${pct(cor, tot)}%</b><span>accuracy</span></div>
        <div class="stat"><b>${tot.toLocaleString()}</b><span>answers</span></div>
        <div class="stat"><b>${seenIds.length.toLocaleString()}</b><span>of ${QB.length.toLocaleString()} seen</span></div>
        <div class="stat"><b>${mastered.toLocaleString()}</b><span>mastered*</span></div>
      </div>
      ${SUBJECTS.filter(s => bySubj[s.id]).map(s => barRow(s.label, bySubj[s.id].c, bySubj[s.id].t)).join('')}
      <p class="muted-note">*Mastered = answered correctly in at least 3 consecutive spaced reviews.</p>
    </div>
    <div class="results-card">
      <div class="section-label">Strengths & weak topics <span class="muted">(topics with 5+ answers)</span></div>
      ${weak.length ? `<div class="sw-head red">Needs work</div>${weak.map(x => barRow(topicLabel(x.k), x.s.c, x.s.t)).join('')}` : ''}
      ${strong.length ? `<div class="sw-head green">Strong</div>${strong.map(x => barRow(topicLabel(x.k), x.s.c, x.s.t)).join('')}` : ''}
      ${!weak.length && !strong.length ? '<p class="muted-note">Answer at least 5 questions in a topic to see it here.</p>' : ''}
      ${weak.length ? '<button class="new-quiz-btn" onclick="drillWeak()">Drill weak topics</button>' : ''}
    </div>`;
}
function showProgress() {
  show('screen-results');
  const html = progressCards();
  $('results-body').innerHTML = `
    <div class="results-hero"><div class="r-label">My progress</div></div>
    ${html || '<div class="results-card"><p class="muted-note">No answers recorded yet. Finish a few questions and your progress will appear here.</p></div>'}
    ${examHistoryCard()}
    <div class="btn-row"><button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div>
    <button class="text-btn danger" onclick="resetProgress()">Reset all progress on this device…</button>`;
}
function resetProgress() {
  if (!confirm('Erase all recall stats, spaced-repetition history, flags, passage scores and exam history on this device? This cannot be undone.')) return;
  [KEYS.stats, KEYS.srs, KEYS.flags, KEYS.passages, KEYS.examHistory].forEach(k => store.del(k));
  FULL_EXAMS.forEach(e => { store.del(KEYS.examProgress(e.id)); store.del(KEYS.examLast(e.id)); });
  goHome();
}

// ════════════════════════════════════════════════════════════════
//  PASSAGE MODE (tutor mode)
// ════════════════════════════════════════════════════════════════
let selectedPassageId = null;
const pq = { p: null, idx: 0, views: [], results: [], answered: false };

function renderPassageSelector() {
  const pstats = store.get(KEYS.passages, {});
  const grouped = PASSAGE_GROUPS.map(g => ({ label: g.label, list: ALL_PASSAGES.filter(p => g.test(p.id)) }));
  const covered = new Set(grouped.flatMap(g => g.list.map(p => p.id)));
  const rest = ALL_PASSAGES.filter(p => !covered.has(p.id));
  if (rest.length) grouped.push({ label: 'Other', list: rest });
  if (!selectedPassageId || !PASSAGE_BY_ID.has(selectedPassageId)) selectedPassageId = ALL_PASSAGES[0].id;
  $('passage-selector').innerHTML = `
    <div class="section-label">Choose a passage</div>
    <p class="muted-note" style="margin:-4px 0 12px">Passages marked <span class="exam-dot">FL</span> appear in a full-length exam. Save them for exam day if you want a fresh practice test.</p>
    ${grouped.filter(g => g.list.length).map(g => `
      <div class="pgroup"><div class="pgroup-label">${esc(g.label)}</div><div class="pgroup-list">
        ${g.list.map(p => {
          const s = pstats[p.id];
          return `<button class="psel-btn${p.id === selectedPassageId ? ' active' : ''}${s ? ' done' : ''}" onclick="selectPassage('${p.id}')">
            <span class="psel-name">${esc(p.title)}</span>
            <span class="psel-meta">${EXAM_PASSAGE_IDS.has(p.id) ? '<span class="exam-dot" title="Used in a full-length exam">FL</span>' : ''}
              ${s ? `<span class="psel-score">Best ${s.best}%</span>` : ''}<span class="psel-count">${p.questions.length}Q</span></span>
          </button>`;
        }).join('')}
      </div></div>`).join('')}`;
}
function selectPassage(id) { selectedPassageId = id; renderPassageSelector(); }
function startPassage() {
  const p = PASSAGE_BY_ID.get(selectedPassageId);
  if (!p) return;
  Object.assign(pq, { p, idx: 0, views: p.questions.map(makeView), results: [], answered: false, startedAt: Date.now() });
  show('screen-passage');
  $('pp-passage-box').innerHTML = passageCard(p.topic || '', p.title, p.passage);
  renderPassageQuestion();
}
function passageCard(topic, title, text) {
  return `<div class="passage-card">
    ${topic ? `<div class="passage-topic">${esc(topic)}</div>` : ''}
    <div class="passage-title">${esc(title)}</div>
    <div class="passage-text">${paragraphs(text)}</div>
  </div>`;
}
function renderPassageQuestion() {
  pq.answered = false;
  const view = pq.views[pq.idx], tot = pq.views.length;
  $('pp-fill').style.width = (pq.idx / tot) * 100 + '%';
  $('pp-counter').textContent = `${pq.idx + 1} / ${tot}`;
  $('pp-subject').textContent = pq.p.title;
  $('pp-score').textContent = `✓ ${pq.results.filter(r => r.right).length}/${pq.results.length}`;
  $('pp-question-box').innerHTML = `
    <div class="question-box"><div class="q-toolbar"><span class="q-tag">Question ${pq.idx + 1} of ${tot}</span></div>
      <div class="question-text">${fmt(view.q.q)}</div></div>
    <div class="choices">${choiceButtons(view.choices, 'answerPassage', { prefix: 'pc' })}</div>
    <div id="pp-exp"></div><div id="pp-next"></div>`;
}
function answerPassage(chosen) {
  if (pq.answered) return;
  pq.answered = true;
  const view = pq.views[pq.idx];
  const right = chosen === view.ans;
  pq.results.push({ view, chosen, right });
  view.choices.forEach((_, i) => {
    const b = $('pc-' + i);
    b.disabled = true;
    if (i === view.ans) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });
  $('pp-score').textContent = `✓ ${pq.results.filter(r => r.right).length}/${pq.results.length}`;
  $('pp-exp').innerHTML = explanationBox(right, view.choices[view.ans], view.q.exp, issueUrl(`Passage · ${pq.p.title}`, view.q.q));
  const last = pq.idx + 1 >= pq.views.length;
  $('pp-next').innerHTML = `<button class="next-btn" id="pp-next-btn" onclick="nextPassageQ()">${last ? 'See results →' : 'Next question →'}</button>`;
  $('pp-next-btn').focus({ preventScroll: true });
}
function nextPassageQ() {
  if (pq.idx + 1 >= pq.views.length) { showPassageResults(); return; }
  pq.idx++;
  renderPassageQuestion();
  $('pp-question-box').scrollIntoView({ block: 'start', behavior: 'smooth' });
}
function showPassageResults() {
  const tot = pq.results.length, cor = pq.results.filter(r => r.right).length, p = pct(cor, tot);
  const pstats = store.get(KEYS.passages, {});
  const prev = pstats[pq.p.id] || { attempts: 0, best: 0 };
  pstats[pq.p.id] = { attempts: prev.attempts + 1, last: p, best: Math.max(prev.best, p) };
  store.set(KEYS.passages, pstats);
  const missed = pq.results.filter(r => !r.right);
  const color = p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--amber)' : 'var(--red)';
  $('pp-fill').style.width = '100%';
  $('pp-passage-box').innerHTML = '';
  $('pp-question-box').innerHTML = `
    <div class="results-hero">
      <div class="r-label">Passage complete</div>
      <div class="score-pct" style="color:${color}">${p}%</div>
      <div class="score-sub">${cor} / ${tot} correct · ${esc(pq.p.title)}</div>
    </div>
    <div class="results-card"><div class="section-label">Missed questions</div>
      ${missed.length ? missed.map(r => reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, exp: r.view.q.exp })).join('')
        : '<div class="all-correct">✓ Perfect — no missed questions.</div>'}
    </div>
    <div class="btn-row">
      <button class="new-quiz-btn" onclick="startPassage()">Retry passage</button>
      <button class="new-quiz-btn secondary" onclick="goHome()">Home</button>
    </div>`;
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
          ${last ? `<div class="exam-meta">Last score: <b>${last.total ?? '—'}</b> (${new Date(last.date).toLocaleDateString()})</div>` : ''}
        </div>
        <div class="exam-actions">
          <button class="new-quiz-btn" onclick="startExam(${i})">${saved ? 'Resume' : 'Start exam'}</button>
          ${saved ? `<button class="text-btn" onclick="abandonExam(${i})">Discard progress</button>` : ''}
          ${store.get(KEYS.examLast(e.id), null) ? `<button class="text-btn" onclick="openLastExamReview(${i})">Review last attempt</button>` : ''}
        </div>
      </div>`;
    }).join('')}`;
}
function abandonExam(i) {
  if (!confirm('Discard your progress on this exam?')) return;
  store.del(KEYS.examProgress(FULL_EXAMS[i].id));
  renderHome();
}
function startExam(ei) {
  const saved = store.get(KEYS.examProgress(FULL_EXAMS[ei].id), null);
  exam = saved || {
    ei, si: 0, qi: 0, phase: 'intro',
    answers: FULL_EXAMS[ei].sections.map((_, si) => new Array(sectionQuestions(ei, si).length).fill(null)),
    marked: FULL_EXAMS[ei].sections.map((_, si) => new Array(sectionQuestions(ei, si).length).fill(false)),
    orders: FULL_EXAMS[ei].sections.map(() => null),
    elapsed: FULL_EXAMS[ei].sections.map(() => 0),
    results: [],
    startedAt: Date.now(),
  };
  exam.ei = ei;
  show('screen-exam');
  renderExam();
}
function ensureOrders() {
  if (!exam.orders[exam.si]) {
    exam.orders[exam.si] = curQuestions().map(q => shuffled(q.choices.map((_, i) => i)));
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
  startExamTimer();
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
    <button class="new-quiz-btn" onclick="beginSection()">Start section →</button>
    <button class="text-btn" onclick="goHome()">Save & exit</button>
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
    if (remaining <= 0) { stopExamTimer(); alert('Time is up for this section.'); endSection(); return; }
    if (Math.floor(exam.elapsed[exam.si] / 1000) % 10 === 0) saveExam();
  };
  examTimer = setInterval(tick, 1000);
  tick();
}
function stopExamTimer() { if (examTimer) clearInterval(examTimer); examTimer = null; }

function renderExamQuestion() {
  const qs = curQuestions(), n = qs.length;
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
        <button class="flag-btn${marked ? ' on' : ''}" onclick="toggleMark()" aria-pressed="${marked}" title="Mark for review (M)">⚑ ${marked ? 'Marked' : 'Mark'}</button>
      </div>
      <div class="question-text">${fmt(q.q)}</div>
    </div>
    <div class="choices" role="radiogroup">${choiceButtons(view.choices, 'examPick', { selected: chosen, prefix: 'ec' })}</div>
    <div class="exam-nav">
      <button class="next-btn secondary" onclick="examNav(-1)" ${exam.qi === 0 ? 'disabled' : ''}>← Previous</button>
      <button class="next-btn secondary" onclick="openSectionReview()">Review</button>
      <button class="next-btn" onclick="examNav(1)">${exam.qi + 1 === n ? 'Review & end →' : 'Next →'}</button>
    </div>`;
  $('exam-body').innerHTML = q.passageTitle
    ? `<div class="split"><div class="split-passage" id="ex-passage">${passageCard('', q.passageTitle, q.passageText)}</div><div class="split-question">${questionHtml}</div></div>`
    : questionHtml;
  // Keep the passage scrolled to the top when moving to a new passage
  const pane = $('ex-passage');
  if (pane && pane.dataset) pane.dataset.pid = q.passageId;
  if (pane && renderExamQuestion.lastPassage !== q.passageId) pane.scrollTop = 0;
  renderExamQuestion.lastPassage = q.passageId;
}
function examPick(i) {
  exam.answers[exam.si][exam.qi] = exam.answers[exam.si][exam.qi] === i ? null : i;
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
    <div class="nav-grid">${ans.map((a, i) => `<button class="nav-cell${a != null ? ' answered' : ''}${marks[i] ? ' marked' : ''}" onclick="jumpTo(${i})" aria-label="Question ${i + 1}${a != null ? ', answered' : ', unanswered'}${marks[i] ? ', marked' : ''}">${i + 1}</button>`).join('')}</div>
    <div class="legend"><span class="nav-cell answered">1</span> answered <span class="nav-cell">1</span> unanswered <span class="nav-cell marked">1</span> marked</div>
    <div class="btn-row">
      <button class="new-quiz-btn secondary" onclick="jumpTo(${exam.qi})">Return to question ${exam.qi + 1}</button>
      <button class="new-quiz-btn" onclick="confirmEndSection()">End section</button>
    </div>
  </div>`;
}
function confirmEndSection() {
  const unanswered = exam.answers[exam.si].filter(a => a == null).length;
  const msg = unanswered ? `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. There's no penalty for guessing. End the section anyway?` : 'End this section? You cannot return to it.';
  if (confirm(msg)) endSection();
}
function endSection() {
  stopExamTimer();
  ensureOrders();
  const qs = curQuestions();
  let correct = 0;
  qs.forEach((q, i) => { const a = exam.answers[exam.si][i]; if (a != null && exam.orders[exam.si][i][a] === q.ans) correct++; });
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
    <button class="new-quiz-btn" onclick="continueAfterBreak()">Continue to ${esc(next.abbrev)} →</button>
    <button class="text-btn" onclick="goHome()">Save & exit</button>
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
  const def = examDef();
  const total = exam.results.length === def.sections.length ? exam.results.reduce((a, r) => a + r.scaled, 0) : null;
  const history = store.get(KEYS.examHistory, []);
  history.push({ examId: def.id, date: Date.now(), total, sections: def.sections.map((s, i) => ({ id: s.id, scaled: exam.results[i]?.scaled, pct: exam.results[i]?.pct })) });
  store.set(KEYS.examHistory, history);
  store.set(KEYS.examLast(def.id), { ei: exam.ei, answers: exam.answers, marked: exam.marked, orders: exam.orders, results: exam.results, date: Date.now() });
  store.del(KEYS.examProgress(def.id));
  showExamResults(store.get(KEYS.examLast(def.id)));
}
function openLastExamReview(ei) {
  const last = store.get(KEYS.examLast(FULL_EXAMS[ei].id), null);
  if (last) showExamResults(last);
}

const examReviewState = { attempt: null, si: 0, filter: 'incorrect' };
function showExamResults(attempt) {
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
        <div class="tile-score" style="color:${scoreColor(x.scaled)}">${x.scaled}</div>
        <span>${x.correct}/${x.total} correct (${x.pct}%)</span>
        <span>${pr != null ? ordinal(pr) + ' percentile' : ''}</span>
        <span>Time used ${fmtTime(x.timeMs || 0)} of ${s.timeMin}:00</span>
      </div>`;
    }).join('')}</div>
    <p class="muted-note">Scaled scores are estimates. The AAMC converts raw scores separately for each test form. Percentiles are the AAMC ranks in effect May 1, 2026 – April 30, 2027.</p>`;
  renderExamReview();
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
    return { i, q, choices, ans, chosen, right: chosen === ans, marked: attempt.marked[si][i] };
  });
  const shown = items.filter(x => filter === 'all' || (filter === 'incorrect' && !x.right) || (filter === 'marked' && x.marked));
  $('exam-review').innerHTML = `
    <div class="results-card">
      <div class="section-label">Answer review</div>
      <div class="seg-row">${def.sections.map((s, i) => `<button class="seg-btn${i === si ? ' active' : ''}" onclick="setExamReview('si',${i})">${s.abbrev}</button>`).join('')}</div>
      <div class="seg-row">${[['incorrect', 'Incorrect & unanswered'], ['marked', 'Marked'], ['all', 'All']].map(([f, l]) => `<button class="seg-btn small${f === filter ? ' active' : ''}" onclick="setExamReview('filter','${f}')">${l}</button>`).join('')}</div>
      ${attempt.results[si] ? (shown.length ? shown.map(x => `<div class="review-wrap"><div class="missed-tag">Q${x.i + 1}${x.marked ? ' · ⚑ marked' : ''}${x.right ? ' · ✓ correct' : ''}</div>${reviewItem({ stem: x.q.q, choices: x.choices, ans: x.ans, chosen: x.chosen, exp: x.q.exp, passageTitle: x.q.passageTitle })}</div>`).join('')
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
//  KEYBOARD
// ════════════════════════════════════════════════════════════════
const KEY_TO_CHOICE = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  const choice = KEY_TO_CHOICE[k];
  if (activeScreen === 'screen-quiz') {
    if (choice !== undefined && !quiz.answered && choice < quiz.items[quiz.idx].choices.length) { e.preventDefault(); pick(choice); }
    else if ((k === 'enter' || k === ' ') && quiz.answered && e.target.tagName !== 'BUTTON') { e.preventDefault(); nextQ(); }
    else if (k === 'f') { e.preventDefault(); flagCurrent(); }
  } else if (activeScreen === 'screen-passage' && pq.views.length) {
    if (choice !== undefined && !pq.answered && pq.idx < pq.views.length && $('pc-0')) { e.preventDefault(); answerPassage(choice); }
    else if ((k === 'enter' || k === ' ') && pq.answered && e.target.tagName !== 'BUTTON' && $('pp-next-btn')) { e.preventDefault(); nextPassageQ(); }
  } else if (activeScreen === 'screen-exam' && exam && exam.phase === 'question') {
    if (choice !== undefined) { e.preventDefault(); examPick(choice); }
    else if (k === 'arrowright' || k === 'n') { e.preventDefault(); examNav(1); }
    else if (k === 'arrowleft' || k === 'p') { e.preventDefault(); examNav(-1); }
    else if (k === 'm' || k === 'f') { e.preventDefault(); toggleMark(); }
  } else if (k === 'escape' && (activeScreen === 'screen-results' || activeScreen === 'screen-exam-results')) {
    goHome();
  }
});

// ════════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════════
goHome();
// Offline cache on the deployed site only (keeps local development uncached)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
}
