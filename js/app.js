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
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const value = JSON.parse(raw);
      if (!storedShape(value, fallback)) throw new Error('Unexpected saved-data format');
      return value;
    } catch (e) { storageWarning('Some saved progress could not be read. You can keep studying, but check your browser storage settings.'); return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { storageWarning('Progress could not be saved. Keep this tab open and check browser storage before leaving.'); } },
  del(key) { try { localStorage.removeItem(key); } catch (e) { storageWarning('Saved data could not be removed. Check browser storage settings.'); } },
};
const KEYS = {
  recallDays: 'mcat2_recall_days',
  plannedPassages: 'mcat2_planned_passages',
  diagnostic: 'mcat2_diagnostic',
  studyPath: 'mcat2_study_path',
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
  { id: 'equations', label: 'Essential Equations', groups: [
    { label: 'Equations, Constants & Units', chips: [
      { label: 'Physics equations & units', tags: ['Physics Equations & Units'] },
      { label: 'Chemistry equations & constants', tags: ['Chemistry Equations & Constants'] },
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
  ['physics', QB_PHYSICS], ['equations', typeof QB_EQUATIONS === 'undefined' ? [] : QB_EQUATIONS],
  ['behavioral', QB_BEHAVIORAL_1], ['behavioral', QB_BEHAVIORAL_2],
].forEach(([source, arr]) => arr.forEach(q => {
  const subj = source === 'chemistry' ? (ORGO_TAGS.has(q.s) ? 'organic_chem' : 'gen_chem') : source;
  // Keep pre-edit question identity so memory, flags and variant links survive wording fixes.
  let id = hashId(q.s + '|' + (q.idStem || q.q));
  while (QB_BY_ID.has(id)) id += 'x';
  q.subj = subj;
  q.key = subj + '|' + q.s;
  q.id = id;
  QB.push(q);
  QB_BY_ID.set(id, q);
}));

// Authored variants: the same fact asked from another angle (scenario, prediction, EXCEPT),
// linked to their base question by its exact tag and stem
const AUTHORED = new Map();   // base id → variant forms
const VARIANT_KIND = { application: 'apply the concept', prediction: 'predict the effect', scenario: 'clinical or lab scenario', except: 'which is NOT true' };
(() => {
  const byStem = new Map(QB.flatMap(q => [[q.s + '|' + q.q, q], ...(q.idStem ? [[q.s + '|' + q.idStem, q]] : [])]));
  [typeof QB_VARIANTS_1 === 'undefined' ? [] : QB_VARIANTS_1, typeof QB_VARIANTS_2 === 'undefined' ? [] : QB_VARIANTS_2]
    .flat().forEach(v => {
      const base = byStem.get(v.ofTag + '|' + v.of);
      if (!base) return;
      const list = AUTHORED.get(base.id) || AUTHORED.set(base.id, []).get(base.id);
      list.push({ ...base, id: `${base.id}~a${list.length}`, baseId: base.id, variant: 'authored', kind: v.kind, q: v.q, choices: v.choices, ans: v.ans, exp: v.exp });
    });
})();

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
const DATA_SETS = typeof DATA_PASSAGES === 'undefined' ? [] : DATA_PASSAGES;
const ALL_PASSAGES = [...PASSAGES, ...BIO_PASSAGES, ...GCHEM_PASSAGES, ...OCHEM_PASSAGES, ...PHYSICS_PASSAGES, ...BEHAVIORAL_PASSAGES, ...DATA_SETS, ...CARS_PASSAGES, ...CARS_EXTRA, ...EXAM2_CARS_PASSAGES];
const SKILL_LABEL = {
  'SIRS 1': 'Skill 1: Knowledge of scientific concepts',
  'SIRS 2': 'Skill 2: Scientific reasoning & problem solving',
  'SIRS 3': 'Skill 3: Research design & execution',
  'SIRS 4': 'Skill 4: Data-based & statistical reasoning',
};
const PASSAGE_BY_ID = new Map(ALL_PASSAGES.map(p => [p.id, p]));
const EXAM_PASSAGE_IDS = new Set(FULL_EXAMS.flatMap(e => e.sections.flatMap(s => s.passageIds || [])));
const PASSAGE_GROUPS = [
  { label: 'Biochemistry', test: id => /^p_(aa|enz|met|nuc|lip)/.test(id) },
  { label: 'Biology', test: id => id.startsWith('p_bio') },
  { label: 'General Chemistry', test: id => id.startsWith('p_gchem') },
  { label: 'Organic Chemistry', test: id => id.startsWith('p_oc') },
  { label: 'Physics & Math', test: id => id.startsWith('p_ph') },
  { label: 'Psychology & Sociology', test: id => id.startsWith('p_bs') },
  { label: 'Data & Reasoning (tables, research design, statistics)', test: id => id.startsWith('p_data') },
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
function loadMem() {
  const mem = store.get(KEYS.mem, null);
  if (mem) return mem;
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
  if (q.variant === 'reverse') b += 0.2;
  if (q.variant === 'authored') b += 0.4;
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
function answeredToday() { return store.get(KEYS.daily, {})[localDay()] || 0; }
const ERROR_TYPES = [
  ['knowledge', 'Didn\'t know it'],
  ['confused', 'Mixed it up'],
  ['misread', 'Misread the question'],
  ['calculation', 'Calculation slip'],
  ['time', 'Rushed / ran out of time'],
];
function logError(entry) {
  const log = store.get(KEYS.errors, []);
  log.push(Object.assign({ t: Date.now() }, entry));
  store.set(KEYS.errors, log.slice(-2000));
}
function errorTypeRow(selected, handler) {
  return `<div class="conf-row err-row" role="group" aria-label="Why did you miss it?">
    <span class="conf-label">Why did you miss it?</span>
    ${ERROR_TYPES.map(([id, label]) => `<button class="conf-btn${selected === id ? ' on' : ''}" data-err="${id}" onclick="${handler}('${id}')" aria-pressed="${selected === id}">${label}</button>`).join('')}
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
  recordRecallToday(q);
  const stats = store.get(KEYS.stats, {});
  const s = stats[q.key] || { c: 0, t: 0 };
  s.t++;
  if (right) s.c++;
  stats[q.key] = s;
  store.set(KEYS.stats, stats);
}
function dueQuestions() {
  const mem = loadMem();
  const now = Date.now();
  return QB.filter(q => mem[q.id] && retrievability(mem[q.id], now) < TARGET_RETENTION);
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
function weakKeys() {
  const stats = store.get(KEYS.stats, {});
  return Object.entries(stats).filter(([k, s]) => KEY_COUNTS[k] && s.t >= 5 && s.c / s.t < 0.7).map(([k]) => k);
}

// ── Reverse-direction variants ──
// Definition cards ("_____ is/are …") can be flipped: show the term and ask
// which description fits, with descriptions of related terms as distractors.
let reverseIndex = null;
function definitionParts(q) {
  if ((q.q.match(/_{3,}/g) || []).length !== 1 || q.subj === 'equations') return null;
  const m = q.q.match(/^_{3,}\s+(is|are)\s+(.{12,})$/i);
  const term = String(q.choices[q.ans]);
  if (!m || term.length > 60 || term.includes(' / ')) return null;
  const desc = m[2].trim().replace(/[.\s]+$/, '');
  if (desc.toLowerCase().includes(term.toLowerCase())) return null;
  return { term, verb: m[1].toLowerCase(), desc: desc.charAt(0).toUpperCase() + desc.slice(1) };
}
function buildReverseIndex() {
  const parts = new Map();
  QB.forEach(q => { const p = definitionParts(q); if (p) parts.set(q.id, { q, ...p }); });
  // Topic → its selector group (e.g. "Musculoskeletal System"), for same-area distractors
  const groupOf = {};
  SUBJECTS.forEach(s => s.groups.forEach((g, gi) => g.keys.forEach(k => { groupOf[k] = s.id + '#' + gi; })));
  const byKey = {}, byGroup = {}, bySubj = {};
  parts.forEach(p => {
    (byKey[p.q.key] = byKey[p.q.key] || []).push(p);
    (byGroup[groupOf[p.q.key]] = byGroup[groupOf[p.q.key]] || []).push(p);
    (bySubj[p.q.subj] = bySubj[p.q.subj] || []).push(p);
  });
  reverseIndex = { parts, byKey, byGroup, bySubj, groupOf };
}
function reverseVariant(q) {
  if (!reverseIndex) buildReverseIndex();
  const base = reverseIndex.parts.get(q.baseId || q.id);
  if (!base) return null;
  const termLc = base.term.toLowerCase();
  const usable = list => (list || []).filter(o => o.q.id !== base.q.id && o.term.toLowerCase() !== termLc && !o.desc.toLowerCase().includes(termLc));
  // Same topic first, then same topic group, then same subject; prefer similar lengths so length gives nothing away
  let pool = usable(reverseIndex.byKey[base.q.key]);
  if (pool.length < 3) pool = pool.concat(usable(reverseIndex.byGroup[reverseIndex.groupOf[base.q.key]]).filter(o => !pool.includes(o)));
  if (pool.length < 3) pool = pool.concat(usable(reverseIndex.bySubj[base.q.subj]).filter(o => !pool.includes(o)));
  if (pool.length < 3) return null;
  const sameArea = pool.filter(o => o.q.key === base.q.key || reverseIndex.groupOf[o.q.key] === reverseIndex.groupOf[base.q.key]);
  if (sameArea.length >= 3) pool = sameArea;
  const distractors = pool.slice().sort((a, b) => Math.abs(a.desc.length - base.desc.length) - Math.abs(b.desc.length - base.desc.length))
    .slice(0, 8).sort(() => Math.random() - 0.5).slice(0, 3).map(o => o.desc);
  return {
    ...base.q, id: base.q.id + '~r', baseId: base.q.id, variant: 'reverse',
    q: `Which description fits **${base.term}**?`,
    choices: [base.desc, ...distractors], ans: 0,
    exp: `**${base.term}**: ${base.desc.charAt(0).toLowerCase() + base.desc.slice(1)}. ${base.q.exp}`,
  };
}

// ── Single-blank rewording of multi-blank cards ──
// "An oxidizing agent _____ electrons and is _____" → ask one blank at a time,
// with the other blanks filled in, using that slot's parts from the distractors.
function slotVariants(q) {
  const base = QB_BY_ID.get(q.baseId || q.id) || q;
  const blanks = (base.q.match(/_{3,}/g) || []).length;
  if (blanks < 2) return [];
  const split = c => String(c).split(' / ').map(s => s.trim());
  const key = split(base.choices[base.ans]);
  if (key.length !== blanks) return [];
  const out = [];
  for (let i = 0; i < blanks; i++) {
    const wrong = [...new Set(base.choices.filter((_, ci) => ci !== base.ans).map(c => split(c)[i]).filter(Boolean))]
      .filter(w => w.toLowerCase() !== key[i].toLowerCase());
    if (wrong.length < 3) continue;
    let n = 0;
    const stem = base.q.replace(/_{3,}/g, () => (n++ === i ? '_____' : `**${key[n - 1]}**`));
    out.push({
      ...base, id: `${base.id}~s${i}`, baseId: base.id, variant: 'slot',
      q: stem, choices: [key[i], ...wrong.slice(0, 3)], ans: 0,
    });
  }
  return out;
}
// Every form a fact can be asked in: original, reversed, or one blank at a time
function questionForms(q) {
  const base = QB_BY_ID.get(q.baseId || q.id) || q;
  return [base, reverseVariant(base), ...slotVariants(base), ...(AUTHORED.get(base.id) || [])].filter(Boolean);
}
// A different form of the same fact, preferring an authored angle (for review of lapsed cards)
function alternateForm(q) {
  const auth = AUTHORED.get(q.baseId || q.id);
  if (auth && auth.length) return auth[Math.floor(Math.random() * auth.length)];
  return reverseVariant(q);
}

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
function disciplineYield(d) {
  const w = MCAT_SECTIONS.reduce((a, s) => a + (s.weights[d] || 0), 0);
  return d === 'research' ? 0.3 : w;   // research methods appear in every science section
}
function recentAccuracy() {
  const r = store.get(KEYS.recent, []);
  return r.length >= 8 ? r.reduce((a, b) => a + b, 0) / r.length : null;
}
// Aim slightly easier when you're struggling and harder when you're cruising
function targetSuccess() {
  const acc = recentAccuracy();
  return acc == null ? 0.8 : acc < 0.7 ? 0.86 : acc > 0.9 ? 0.72 : 0.8;
}
function weakTopicNeeds(mast) {
  return ALL_KEYS.map(k => {
    const t = mast[k];
    const p = t ? sigmoid(t.r) : sigmoid(MASTERY_PRIOR);
    const [subj, tag] = [k.split('|')[0], k.slice(k.indexOf('|') + 1)];
    const need = t && t.n >= 2 ? Math.max(0, 0.9 - p) * (0.4 + disciplineYield(disciplineOfKey(subj, tag))) : 0;
    return { k, p, n: t ? t.n : 0, need };
  }).filter(x => x.need > 0).sort((a, b) => b.need - a.need);
}
function buildSmartSession(n) {
  const mem = loadMem();
  const mast = store.get(KEYS.mastery, {});
  const now = Date.now();
  const target = targetSuccess();
  const chosen = new Map();
  const add = (q, reason) => { if (chosen.size < n && !chosen.has(q.id)) chosen.set(q.id, { q, reason }); };
  const recentlySeen = q => mem[q.id] && now - mem[q.id].last < 20 * 60000;

  // 1) Due reviews, most-forgotten first; confident misses jump the queue (up to ~45%)
  QB.filter(q => mem[q.id] && retrievability(mem[q.id], now) < TARGET_RETENTION)
    .map(q => ({ q, m: mem[q.id], R: retrievability(mem[q.id], now) }))
    .sort((a, b) => (b.m.confidentMiss ? 1 : 0) - (a.m.confidentMiss ? 1 : 0) || a.R - b.R)
    .slice(0, Math.ceil(n * 0.45))
    .forEach(x => add(x.m.lapses && Math.random() < 0.6 ? alternateForm(x.q) || x.q : x.q,
      x.m.confidentMiss ? 'confident-miss' : x.m.lapses ? 'missed-before' : 'due'));

  // 2) Weakest high-yield topics: questions pitched closest to the target success rate (to ~60%)
  const weak = weakTopicNeeds(mast).slice(0, 6);
  const byKey = {};
  QB.forEach(q => { (byKey[q.key] = byKey[q.key] || []).push(q); });
  let round = 0;
  while (chosen.size < Math.ceil(n * 0.6) && weak.length && round < n) {
    const t = weak[round % weak.length];
    const cand = (byKey[t.k] || []).filter(q => !chosen.has(q.id) && !recentlySeen(q))
      .map(q => ({ q, d: Math.abs(predictedSuccess(q, mem, mast) - target) }))
      .sort((a, b) => a.d - b.d)[0];
    if (cand) add(cand.q, 'weak');
    round++;
  }

  // Preserve broad sampling: sparse subject evidence is not a demonstrated strength.
  const sparse=learningNeeds().missing;
  let sampleRound=0;
  while(chosen.size<Math.ceil(n*0.8) && sparse.length && sampleRound<n*2){
    const disc=sparse[sampleRound%sparse.length];
    const q=QB.find(q=>disciplineOfRecall(q)===disc && !mem[q.id]?.seen && !chosen.has(q.id));
    if(q)add(q,'new');sampleRound++;
  }
  // 3) New material: pick a discipline in proportion to its MCAT yield (boosted while it
  //    has little data, so weaknesses are discovered early), then its least-covered topic
  const discTopics = {};
  ALL_KEYS.forEach(k => {
    const d = disciplineOfKey(k.split('|')[0], k.slice(k.indexOf('|') + 1));
    (discTopics[d] = discTopics[d] || []).push(k);
  });
  const answeredIn = d => discTopics[d].reduce((a, k) => a + (mast[k] ? mast[k].n : 0), 0);
  const discWeights = Object.keys(discTopics).map(d => ({ d, w: Math.max(0.1, disciplineYield(d)) * (answeredIn(d) < 40 ? 2 : 1) }));
  for (let i = 0; chosen.size < n && i < n * 4; i++) {
    let r = Math.random() * discWeights.reduce((a, x) => a + x.w, 0);
    const d = discWeights.find(x => (r -= x.w) <= 0)?.d || discWeights[0].d;
    const topics = discTopics[d].map(k => {
      const unseen = (byKey[k] || []).filter(q => !mem[q.id] && !chosen.has(q.id));
      return { unseen, frac: unseen.length / (byKey[k] || [1]).length + Math.random() * 0.3 };
    }).filter(x => x.unseen.length).sort((a, b) => b.frac - a.frac);
    if (topics.length) add(topics[0].unseen[Math.floor(Math.random() * topics[0].unseen.length)], 'new');
  }

  // 4) Everything seen and nothing due: refresh the least-stable cards
  if (chosen.size < n) {
    QB.filter(q => mem[q.id] && !chosen.has(q.id) && !recentlySeen(q))
      .sort((a, b) => retrievability(mem[a.id], now) - retrievability(mem[b.id], now))
      .slice(0, n - chosen.size).forEach(q => add(q, 'stretch'));
  }
  return interleave([...chosen.values()]);
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
function relatedQuestion(q, excludeIds) {
  const mem = loadMem();
  const mast = store.get(KEYS.mastery, {});
  const target = targetSuccess();
  return QB.filter(x => x.key === q.key && x.id !== (q.baseId || q.id) && !excludeIds.has(x.id))
    .map(x => ({ x, d: Math.abs(predictedSuccess(x, mem, mast) - target) }))
    .sort((a, b) => a.d - b.d).slice(0, 3).sort(() => Math.random() - 0.5)[0]?.x || null;
}

// ════════════════════════════════════════════════════════════════
//  MCAT SCORE ESTIMATION
//  Section scores are built the way the AAMC builds the exam: each
//  section draws on disciplines in fixed proportions ("What's on the
//  MCAT Exam?", AAMC). Every discipline gets an MCAT-equivalent score
//  from the evidence available (full-length > passage > recall), and a
//  section estimate is the discipline scores weighted by those shares.
// ════════════════════════════════════════════════════════════════
const DISCIPLINES = {
  biochemistry: 'Biochemistry',
  biology: 'Biology',
  gen_chem: 'General Chemistry',
  organic_chem: 'Organic Chemistry',
  physics: 'Physics',
  psych_soc: 'Psychology & Sociology',
  research: 'Research Methods & Statistics',
  cars: 'CARS (reading & reasoning)',
};
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
  const out = {};
  Object.keys(DISCIPLINES).forEach(d => { out[d] = { recall: { c: 0, t: 0 }, passage: { c: 0, t: 0 }, exam: { c: 0, t: 0 } }; });
  Object.entries(store.get(KEYS.stats, {})).forEach(([k, s]) => {
    const tag = k.slice(k.indexOf('|') + 1);
    const d = disciplineOfKey(k.split('|')[0], tag);
    if (!out[d] || !KEY_COUNTS[k]) return;
    out[d].recall.c += s.c; out[d].recall.t += s.t;
  });
  Object.entries(store.get(KEYS.evidence, {})).forEach(([d, src]) => {
    if (!out[d]) return;
    ['passage', 'exam'].forEach(k => { if (src[k]) { out[d][k].c += src[k].c; out[d][k].t += src[k].t; } });
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
  const day = new Date().toISOString().slice(0, 10);
  const entry = { day, total: est.total, sections: Object.fromEntries(est.sections.map(s => [s.id, s.scaled])) };
  if (hist.length && hist[hist.length - 1].day === day) hist[hist.length - 1] = entry; else hist.push(entry);
  store.set(KEYS.scoreHistory, hist.slice(-120));
}

// ════════════════════════════════════════════════════════════════
//  SCREENS & HOME
// ════════════════════════════════════════════════════════════════
const SCREENS = ['screen-home', 'screen-quiz', 'screen-results', 'screen-passage', 'screen-exam', 'screen-exam-results', 'screen-about'];
let activeScreen = 'screen-home';
function show(id) {
  SCREENS.forEach(s => { const el = $(s); if (el) el.hidden = s !== id; });
  activeScreen = id;
  const nav = $('app-nav');
  if (nav) nav.hidden = id === 'screen-home';
  window.scrollTo(0, 0);
}

const prefs = Object.assign({ mode: 'recall', count: 20, selected: null }, store.get(KEYS.prefs, {}));
prefs.mode = ['recall', 'passage', 'exam'].includes(prefs.mode) ? prefs.mode : 'recall';
prefs.mix = ['custom', 'cp', 'bb', 'ps', 'all'].includes(prefs.mix) ? prefs.mix : 'custom';
prefs.count = [0, 10, 20, 30, 50, 100].includes(prefs.count) ? prefs.count : 20;
let selectedKeys = new Set((Array.isArray(prefs.selected) ? prefs.selected : ALL_KEYS).filter(k => KEY_COUNTS[k]));
const openSubjects = new Set();
function savePrefs() { prefs.selected = [...selectedKeys]; store.set(KEYS.prefs, prefs); }

function goHome() {
  if (pq.mini && !pq.mini.completed && !confirm('Exit this mini test? This unfinished attempt will not be saved.')) return;
  if (activeScreen === 'screen-exam' && exam) saveExam();
  pq.mini = null;  stopPassageTimer();
  commitPending();
  flushPassageErr();
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
  const needs=learningNeeds();
  const focus=needs.weak[0] || weakTopicNeeds(store.get(KEYS.mastery, {}))[0];
  const plan=computePlan();
  const optional=!!plan?.recallTargetMet;
  actions.push(`<button class="action-btn smart" onclick="startSmartSession()" title="Adaptive: due reviews, your weakest high-yield topics and new material">
    <span><b class="smart-title">${optional ? 'Optional extra practice' : '▶ Smart Session'}</b><small>${focus ? `Focus: ${esc(KEY_LABEL[focus.k] || focus.k)}` : 'Adapts to your strengths and weaknesses'}</small></span>
    <b>${smartSessionSize()}</b></button>`);
  if (inProgress) actions.push(`<button class="action-btn primary" onclick="startExam(${FULL_EXAMS.indexOf(inProgress)})">Resume ${esc(inProgress.title)}</button>`);
  actions.push(`<button class="action-btn" ${due ? '' : 'disabled'} onclick="startDueReview()">Review due <b>${due}</b></button>`);
  actions.push(`<button class="action-btn" ${flagged ? '' : 'disabled'} onclick="startFlagged()">Flagged <b>${flagged}</b></button>`);
  actions.push(`<button class="action-btn" ${weak ? '' : 'disabled'} onclick="drillWeak()" title="Topics under 70% after at least 5 attempts">Drill weak topics <b>${weak}</b></button>`);
  actions.push(`<button class="action-btn" onclick="startSpeedDrill()" title="${SPEED_N} facts you've learned, ${SPEED_SECONDS} seconds each: builds fast, automatic recall">⚡ Speed drill</button>`);
  actions.push(`<button class="action-btn" onclick="showProgress()">Score report</button>`);
  $('home-actions').innerHTML = actions.join('');
  $('home-score').innerHTML = scoreStrip() + planStrip() + learningGuideCard() + studyPathCard();

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
  const mix = prefs.mix || 'custom';
  $('mix-row').innerHTML = [['custom', 'My subjects'], ...Object.entries(PRACTICE_MIXES).map(([id, m]) => [id, m.label])]
    .map(([id, l]) => `<button class="count-btn small${mix === id ? ' active' : ''}" onclick="setMix('${id}')">${l}</button>`).join('');
  $('mix-note').innerHTML = mix === 'custom'
    ? 'Questions due for spaced review come first, then ones you haven\'t seen. Answer choices are shuffled every time.'
    : `${esc(PRACTICE_MIXES[mix].note)} With "All", a mix session is 59 questions, the length of a real section.`;
  $('subject-card').hidden = mix !== 'custom';
  $('recall-first-toggle').checked = !!prefs.recallFirst;
}
function setCount(n) { prefs.count = n; savePrefs(); renderCountRow(); updateAvail(); }
function setMix(id) { prefs.mix = id; savePrefs(); renderCountRow(); updateAvail(); }

// Recall sessions drawn in the same subject proportions as a real MCAT section.
// About 10% goes to research methods & statistics, which every science section tests.
const PRACTICE_MIXES = {
  cp: { label: 'C/P mix', section: 'cp', note: 'Mixed like the real C/P section: general chemistry, physics, biochemistry, organic chemistry and a little biology, plus research methods.' },
  bb: { label: 'B/B mix', section: 'bb', note: 'Mixed like the real B/B section: mostly biology and biochemistry, a little general and organic chemistry, plus research methods.' },
  ps: { label: 'P/S mix', section: 'ps', note: 'Mixed like the real P/S section: psychology and sociology with a little biology, plus research methods.' },
  all: { label: 'All sciences', section: null, note: 'An even blend of the C/P, B/B and P/S mixes.' },
};
function mixWeights(id) {
  const secs = PRACTICE_MIXES[id].section ? [PRACTICE_MIXES[id].section] : ['cp', 'bb', 'ps'];
  const w = {};
  secs.forEach(sid => Object.entries(MCAT_SECTIONS.find(s => s.id === sid).weights)
    .forEach(([d, v]) => { w[d] = (w[d] || 0) + (v * 0.9) / secs.length; }));
  w.research = 0.1;
  return w;
}
function buildMix(id, n) {
  const w = mixWeights(id);
  const pools = {};
  QB.forEach(q => { const d = disciplineOfRecall(q); (pools[d] = pools[d] || []).push(q); });
  // Largest-remainder allocation so counts add up to n
  const raw = Object.entries(w).map(([d, v]) => ({ d, exact: v * n }));
  raw.forEach(r => { r.count = Math.floor(r.exact); });
  let left = n - raw.reduce((a, r) => a + r.count, 0);
  raw.slice().sort((a, b) => (b.exact - b.count) - (a.exact - a.count)).forEach(r => { if (left > 0) { r.count++; left--; } });
  return shuffled(raw.flatMap(r => pickQuestions(pools[r.d] || [], r.count)));
}

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
  const mixing = (prefs.mix || 'custom') !== 'custom';
  $('start-btn').disabled = prefs.mode === 'recall' && !mixing && n === 0;
  $('start-btn').textContent = prefs.mode === 'recall' && mixing ? `Start ${PRACTICE_MIXES[prefs.mix].label} · ${prefs.count || 59} questions →` : 'Start →';
}

function startSession() {
  if (prefs.mode === 'recall') startRecall();
  else if (prefs.mode === 'passage') startPassage();
}

// ════════════════════════════════════════════════════════════════
//  RECALL QUIZ (tutor mode: immediate feedback)
// ════════════════════════════════════════════════════════════════
const quiz = { items: [], idx: 0, results: [], answered: false, startedAt: 0, qStart: 0, label: '', timer: null, adaptive: false, extras: 0, pending: null,
  loop: new Map(), shakyDone: new Set(), lastForm: new Map(), cleared: 0 };
const LOOP_TARGET = 2;   // correct answers in a row before a missed fact is cleared for the session

function makeView(q, reason) {
  const order = shuffled(q.choices.map((_, i) => i));
  return { q, reason: reason || null, order, choices: order.map(i => q.choices[i]), ans: order.indexOf(q.ans) };
}
function startSmartSession() {
  const n = smartSessionSize();
  const items = buildSmartSession(n);
  if (items.length) beginQuiz(items, 'Smart Session', { adaptive: true });
}
// ── Speed drill ──
// Fluency: facts you already know, against the clock, so recall becomes automatic
// and frees time for passage reasoning. A timeout counts as a miss ("ran out of time").
const SPEED_N = 20, SPEED_SECONDS = 20;
function startSpeedDrill() {
  const mem = loadMem(), now = Date.now();
  const known = QB.filter(q => mem[q.id] && mem[q.id].seen && retrievability(mem[q.id], now) >= 0.6);
  const items = known.length >= SPEED_N ? shuffled(known).slice(0, SPEED_N) : buildSmartSession(SPEED_N);
  if (items.length) beginQuiz(items, 'Speed drill', { adaptive: false, speed: SPEED_SECONDS * 1000 });
}
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
function recordFluency(q, ms) {
  const d = disciplineOfRecall(q);
  const fl = store.get(KEYS.fluency, {});
  fl[d] = (fl[d] || []).concat(Math.round(ms)).slice(-60);
  store.set(KEYS.fluency, fl);
}
const median = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
function fluencyCard() {
  const rows = Object.entries(store.get(KEYS.fluency, {})).filter(([d, a]) => DISCIPLINES[d] && a.length >= 10)
    .map(([d, a]) => ({ d, med: median(a), n: a.length })).sort((a, b) => b.med - a.med);
  if (!rows.length) return '';
  const max = Math.max(...rows.map(r => r.med), 20000);
  return `<div class="results-card">
    <div class="section-label">Recall speed <span class="muted">(median time on correct answers, last 60 per subject)</span></div>
    ${rows.map(r => {
      const col = r.med <= 12000 ? 'var(--green)' : r.med <= 20000 ? 'var(--amber)' : 'var(--red)';
      return `<div class="subject-row"><div class="sr-name">${esc(DISCIPLINES[r.d])}</div>
        <div class="sr-bar-wrap"><div class="sr-bar-fill" style="width:${(r.med / max) * 100}%;background:${col}"></div></div>
        <div class="sr-pct">${(r.med / 1000).toFixed(1)}s</div><div class="sr-n">${r.n}</div></div>`;
    }).join('')}
    <p class="muted-note">A fact you know well should come back in about 10 seconds. Slow-but-right subjects cost time on test day: use the ⚡ Speed drill to make them automatic.</p>
  </div>`;
}

// ── Study-habit nudges ──
// Spaced practice beats marathon sessions: suggest a short break after ~45 minutes
const studyClock = { start: 0, last: 0, nudged: false };
function breakBanner() {
  const now = Date.now();
  if (!studyClock.start || now - studyClock.last > 10 * 60000) Object.assign(studyClock, { start: now, nudged: false });
  studyClock.last = now;
  if (studyClock.nudged || now - studyClock.start < 45 * 60000) return '';
  return `<div class="break-banner" id="break-banner" role="status">☕ You've studied for ${Math.round((now - studyClock.start) / 60000)} minutes. A 5–10 minute break (stand up, look away from the screen) helps the last block stick.
    <button class="micro-btn" onclick="dismissBreak()">Got it</button></div>`;
}
function dismissBreak() { studyClock.nudged = true; const b = $('break-banner'); if (b) b.remove(); }
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

function startRecall() {
  const mix = prefs.mix || 'custom';
  if (mix !== 'custom') { beginQuiz(buildMix(mix, prefs.count || 59), PRACTICE_MIXES[mix].label); return; }
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
  const missed = missedResults().map(r => QB_BY_ID.get(r.view.q.baseId || r.view.q.id) || r.view.q);
  if (missed.length) beginQuiz(shuffled(missed), 'Retry missed');
}
// questions: plain question objects, or {q, reason} items from the Smart Session
function beginQuiz(questions, label, opts = {}) {
  pq.mini = null; stopPassageTimer(); 
  const items = questions.map(x => (x && x.q && x.choices === undefined ? makeView(x.q, x.reason) : makeView(x)));
  // Reinforcement (mastery loop, shaky repeats, confusion follow-ups) is on for every study session
  Object.assign(quiz, { items, idx: 0, results: [], answered: false, startedAt: Date.now(), label, adaptive: opts.adaptive !== false, speed: opts.speed || 0, extras: 0, pending: null,
    loop: new Map(), shakyDone: new Set(), lastForm: new Map(), cleared: 0 });
  show('screen-quiz');
  startQuizTimer();
  renderQuizQuestion();
}
function startQuizTimer() {
  stopQuizTimer();
  quiz.timer = setInterval(() => { $('qm-timer').textContent = fmtTime(Date.now() - quiz.startedAt); }, 1000);
}
function stopQuizTimer() { if (quiz.timer) clearInterval(quiz.timer); quiz.timer = null; stopSpeedTimer(); }

// Optional retrospective reflection follows incorrect answers only; never award partial score credit.

function runnerUpPrompt(view, chosen, handler, selected = null, inputId = 'runner-up') {
  return '<div class="results-card"><label><b>Which other answer were you considering?</b><p class="muted-note">Optional: think back to the other answer you considered before submitting.</p><select id="' + inputId + '" onchange="' + handler + '(this.value)"><option value="">No other answer / skip</option>' + view.choices.map((c, i) => i === chosen ? '' : '<option value="' + i + '"' + (selected === i ? ' selected' : '') + '>' + LETTERS[i] + '. ' + esc(c) + '</option>').join('') + '</select></label></div>';
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
  store.set(KEYS.finalTwo,log.slice(-1000));
}
function finalTwoProgress() {
  const log=store.get(KEYS.finalTwo,[]).filter(x=>x.right===false && x.retrospective);
  if(!log.length)return '';
  return '<div class="results-card"><div class="section-label">Alternative answers after mistakes</div><p>'+log.length+' incorrect answers with an alternative recorded; the alternative was correct in '+log.filter(x=>x.included).length+'.</p><p class="muted-note">Retrospective reflections after feedback, not a validated measure of closeness or extra score credit.</p></div>';
}
function finalTwoFeedback(view,chosen,other) {
  if(other==null || chosen==null || chosen===view.ans)return '';
  const contrast=confusionCard(view.choices[other],view.q);
  return '<div class="tip-card"><b>Other answer considered:</b> '+fmt(view.choices[other])+'<p>'+(other===view.ans?'Your alternative was the correct answer. Identify the clue that should have favored it over your submitted choice.':'Your alternative was also incorrect. Compare both choices with the correct answer and identify the missing distinction.')+'</p>'+(contrast?'<p>'+fmt(meaningOf(contrast))+'</p>':'')+'<p>This reflection was recorded after feedback; it does not measure scientific closeness or change your score.</p></div>';
}
function pick(chosen) { finishPick(chosen); }
function answerPassage(chosen) { finishPassageAnswer(chosen); }

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
  const why = view.reason === 'weak'
    ? `${REASONS.weak}: ${KEY_LABEL[q.key] || q.s}${(() => { const m = topicMastery(q.key); return m.p != null ? ` (${Math.round(m.p * 100)}% predicted)` : ''; })()}`
    : view.reason === 'loop' ? `${REASONS.loop} (${view.loopStreak || 0} of ${LOOP_TARGET} correct in a row)`
    : view.reason ? REASONS[view.reason] : '';
  $('quiz-body').innerHTML = `${breakBanner()}
    <div class="question-box">
      <div class="q-toolbar">
        <span class="q-tag">${esc(SUBJECT_LABEL[q.subj])} · ${esc(KEY_LABEL[q.key] || q.s)}${q.aamc ? ` · AAMC ${esc(q.aamc)}` : ''}</span>
        <button class="flag-btn${flagged ? ' on' : ''}" id="flag-btn" onclick="flagCurrent()" aria-pressed="${flagged}" title="Flag for later review (F)">⚑ ${flagged ? 'Flagged' : 'Flag'}</button>
      </div>
      ${quiz.speed ? `<div class="speed-bar"><div class="speed-fill" id="speed-fill"></div></div>` : ''}
      ${why || q.variant ? `<div class="q-reason">${q.variant ? `<span class="variant-pill">${q.variant === 'authored' ? `Applied: ${esc(VARIANT_KIND[q.kind] || 'new angle')}` : 'Asked a different way'}</span>` : ''}${why ? `<span>Why this question: ${esc(why)}</span>` : ''}</div>` : ''}
      <div class="question-text">${fmt(q.q)}</div>
    </div>
    <div class="choices" id="choices-area" role="group" aria-label="Answer choices">${choicesOrPrompt(view)}</div>
    <div id="exp-area"></div>
    <div id="nxt-area"></div>`;
  if ($('reveal-btn')) $('reveal-btn').focus({ preventScroll: true });
  startSpeedTimer();
}
// Recall first: retrieving the answer before seeing options builds stronger memory
// than recognizing it, so the choices stay hidden until you've thought of it
function choicesOrPrompt(view) {
  if (!prefs.recallFirst || view.revealed || quiz.speed) return choiceButtons(view.choices, 'pick');
  return `<div class="recall-first">
    <p><b>Recall first:</b> think of the answer, then show the choices.</p>
    <button class="next-btn" id="reveal-btn" onclick="revealChoices()">Show choices (Space)</button>
  </div>`;
}
function revealChoices() {
  const view = quiz.items[quiz.idx];
  if (view.revealed) return;
  view.revealed = true;
  view.revealedAt = Date.now();
  $('choices-area').innerHTML = choiceButtons(view.choices, 'pick');
}
function setRecallFirst(on) { prefs.recallFirst = !!on; savePrefs(); }
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
  if (right) recordFluency(view.q, Math.max(0, ms - ((view.revealedAt || quiz.qStart) - quiz.qStart)));
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
      : confusion ? `You chose <b>${fmt(view.choices[chosen])}</b>. ${fmt(meaningOf(confusion))}` : '');
  renderNextArea();
  $('next-btn').focus({ preventScroll: true });
}
function renderNextArea() {
  const last = quiz.idx + 1 >= quiz.items.length;
  const p = quiz.pending;
  const conf = p && p.conf;
  $('nxt-area').innerHTML = `
    <div class="conf-row" role="group" aria-label="How sure were you?">
      <span class="conf-label">How sure were you?</span>
      ${CONFIDENCE.map(([id, label, key]) => `<button class="conf-btn${conf === id ? ' on' : ''}" data-conf="${id}" onclick="setConfidence('${id}')" aria-pressed="${conf === id}" title="Key: ${key}">${label}</button>`).join('')}
    </div>
    ${p && !p.right ? wrongAlternativePanel('recall',quiz.items[quiz.idx],quiz.results.at(-1).chosen,p.other) : ''}
    ${p && !p.right ? errorTypeRow(p.errType, 'setErrType') : ''}
    ${p && !p.right ? `<label class="explain-it">Explain it <span class="muted">(optional)</span>: in one sentence, why is the right answer right?
      <textarea id="explain-input" rows="2" maxlength="300" oninput="if(quiz.pending)quiz.pending.note=this.value">${esc(p.note || '')}</textarea></label>` : ''}
    <button class="next-btn" id="next-btn" onclick="nextQ()">${last && !quiz.adaptive ? 'See results →' : 'Next →'}</button>
    <div class="kb-hint">Keys: 1–4 or A–D to answer · G / U / K for confidence · Enter for next · F to flag</div>`;
}
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
  const base = QB_BY_ID.get(baseId);
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
    const f = forms.filter(x => x.id !== last && x.id !== p.q.id)[Math.floor(Math.random() * Math.max(1, forms.length - 1))] || forms[0];
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
      <div class="score-pct" style="color:${color}">${p}%</div>
      <div class="score-grade" style="color:${color}">${grade}</div>
      <div class="score-sub">${cor} of ${tot} correct · ${fmtTime(sessionMs)} total · ${Math.round(avg / 1000)}s per question</div>
      ${quiz.speed ? `<div class="score-sub reinforce">⚡ Median ${(median(res.filter(r => r.right).map(r => r.ms)) / 1000).toFixed(1)}s on correct answers · ${res.filter(r => r.timedOut).length} timed out. Missed and timed-out facts are now due for review.</div>` : ''}
      ${quiz.cleared || quiz.loop.size ? `<div class="score-sub reinforce">Reinforced: <b>${quiz.cleared}</b> missed ${quiz.cleared === 1 ? 'fact' : 'facts'} drilled to ${LOOP_TARGET} correct in a row${quiz.loop.size ? ` · <b>${quiz.loop.size}</b> still shaky (they'll come back soon in review)` : ''}</div>` : ''}
    </div>
    <div class="results-card">
      <div class="section-label">This session by subject</div>
      ${Object.entries(bySubj).map(([s, v]) => barRow(SUBJECT_LABEL[s], v.c, v.t)).join('')}
      <p class="muted-note">A single session is too small to score. Your answers feed the running MCAT estimate below, which uses all your recall, passage and full-length results.</p>
    </div>
    ${studyPathCard(Object.entries(res.reduce((n, r) => { const d = disciplineOfRecall(r.view.q); n[d] = (n[d] || 0) + 1; return n; }, {})).sort((a, b) => b[1] - a[1])[0]?.[0])}
    ${studyTip()}
    ${scoreStrip()}
    <div class="btn-row">
      ${missed.length ? `<button class="new-quiz-btn" onclick="retryMissed()">Retry ${plural(missed.length, 'missed question')}</button>` : ''}
      <button class="new-quiz-btn secondary" onclick="goHome()">Home</button>
    </div>
    <div class="results-card">
      <div class="section-label">Missed this session (${missed.length})</div>
      ${missed.length ? missed.map(r => reviewItem({
        stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp,
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
function reviewItem({ stem, choices, ans, chosen, exp, tag, passageTitle, other, otherHandler, otherId }) {
  return `<div class="missed-item">
    ${tag ? `<div class="missed-tag">${esc(tag)}</div>` : ''}
    ${passageTitle ? `<div class="missed-tag">Passage: ${esc(passageTitle)}</div>` : ''}
    <div class="missed-q">${fmt(stem)}</div>
    <div class="missed-correct">✓ ${fmt(choices[ans])}</div>
    <div class="missed-wrong">${chosen == null ? '— Not answered' : chosen === ans ? '' : '✗ Your answer: ' + fmt(choices[chosen])}</div>
    ${chosen != null && chosen !== ans && otherHandler ? runnerUpPrompt({choices,ans},chosen,otherHandler,other,otherId) : ''}
    <div${otherId ? ` id="alternative-feedback-${otherId}"` : ''}>${finalTwoFeedback({choices,ans,q:{id:'review'}},chosen,other)}</div>
    <details class="missed-exp"><summary>Explanation</summary>${paragraphs(exp)}</details>
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

// ── Cumulative progress ──
function progressCards() {
  const stats = store.get(KEYS.stats, {});
  const valid = Object.entries(stats).filter(([k]) => KEY_COUNTS[k]);
  if (!valid.length) return finalTwoProgress();
  const bySubj = {};
  valid.forEach(([k, s]) => { const subj = k.split('|')[0]; bySubj[subj] = bySubj[subj] || { c: 0, t: 0 }; bySubj[subj].c += s.c; bySubj[subj].t += s.t; });
  const tot = valid.reduce((a, [, s]) => a + s.t, 0), cor = valid.reduce((a, [, s]) => a + s.c, 0);
  const mem = loadMem();
  const seenIds = Object.keys(mem).filter(id => QB_BY_ID.has(id) && mem[id].seen);
  const mastered = seenIds.filter(id => mem[id].S >= 21).length;
  const topics = valid.filter(([, s]) => s.t >= 5).map(([k, s]) => ({ k, p: s.c / s.t, s }));
  const weak = topics.filter(x => x.p < 0.7).sort((a, b) => a.p - b.p).slice(0, 8);
  const strong = topics.filter(x => x.p >= 0.85).sort((a, b) => b.p - a.p).slice(0, 5);
  const topicLabel = k => `${SUBJECT_LABEL[k.split('|')[0]]} · ${KEY_LABEL[k] || k.split('|')[1]}`;
  return `${finalTwoProgress()}
    <div class="results-card">
      <div class="section-label">All-time progress</div>
      <div class="stat-row">
        <div class="stat"><b>${pct(cor, tot)}%</b><span>accuracy</span></div>
        <div class="stat"><b>${tot.toLocaleString()}</b><span>answers</span></div>
        <div class="stat"><b>${seenIds.length.toLocaleString()}</b><span>of ${QB.length.toLocaleString()} seen</span></div>
        <div class="stat"><b>${mastered.toLocaleString()}</b><span>mastered*</span></div>
      </div>
      ${SUBJECTS.filter(s => bySubj[s.id]).map(s => barRow(s.label, bySubj[s.id].c, bySubj[s.id].t)).join('')}
      <p class="muted-note">*Mastered = memory strong enough that you'd still recall it 3 weeks from now (90% likely).</p>
    </div>
    <div class="results-card">
      <div class="section-label">Strengths & weak topics <span class="muted">(topics with 5+ answers)</span></div>
      ${weak.length ? `<div class="sw-head red">Needs work</div>${weak.map(x => barRow(topicLabel(x.k), x.s.c, x.s.t)).join('')}` : ''}
      ${strong.length ? `<div class="sw-head green">Strong</div>${strong.map(x => barRow(topicLabel(x.k), x.s.c, x.s.t)).join('')}` : ''}
      ${!weak.length && !strong.length ? '<p class="muted-note">Answer at least 5 questions in a topic to see it here.</p>' : ''}
      ${weak.length ? '<button class="new-quiz-btn" onclick="drillWeak()">Drill weak topics</button>' : ''}
    </div>`;
}
// ── MCAT score report ──
// A 118–132 track with a marker; optional ± band shaded around it
function scaleBar(scaled, band, color) {
  if (scaled == null) return '<div class="scale-bar empty"></div>';
  const x = v => ((Math.min(132, Math.max(118, v)) - 118) / 14) * 100;
  return `<div class="scale-bar" title="${Math.round(scaled)} on the 118–132 scale">
    ${band ? `<div class="scale-band" style="left:${x(scaled - band)}%;width:${x(scaled + band) - x(scaled - band)}%"></div>` : ''}
    <div class="scale-mid"></div>
    <div class="scale-mark" style="left:${x(scaled)}%;background:${color || scoreColor(Math.round(scaled))}"></div>
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
    <div class="disc-score" style="color:${s ? scoreColor(s) : 'var(--slate)'}">${s ?? '—'}</div>
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
      <div class="tile-score" style="color:${scoreColor(s.scaled)}">${s.scaled}<small>±${s.band}</small></div>
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
        <p>Every subject below gets an MCAT-equivalent score from your answers. Full-length questions count 3×, passage questions 2× and recall questions 1×. Recall questions test single facts, so they're converted on a stricter curve. A section score is its subjects' scores weighted by the shares above. Subjects with fewer than ${MIN_ANSWERS} answers are left out. A section needs eligible subjects representing at least 70% of its weighting; this is not the percentage of the syllabus studied. The ± range narrows as you answer more.</p>
        <p>Percentiles are the AAMC ranks in effect May 1, 2026 – April 30, 2027. These are study estimates, not predictions: the AAMC converts raw scores separately for every test form. A full-length exam is the best single indicator. <a href="#" onclick="showAbout();return false">About &amp; disclaimers</a></p>
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
// Topic mastery map: each subtopic chip colored by its mastery level
const LEVELS = { new: 'Not enough data', weak: 'Weak', building: 'Building', solid: 'Solid', mastered: 'Mastered' };
function masteryMapCard() {
  const mast = store.get(KEYS.mastery, {});
  if (!Object.keys(mast).length) return '';
  const chipInfo = chip => {
    let n = 0, w = 0;
    chip.keys.forEach(k => { const t = mast[k]; if (t) { n += t.n; w += sigmoid(t.r) * t.n; } });
    if (n < 5) return { n, p: n ? w / n : null, level: 'new' };
    const p = w / n;
    return { n, p, level: p < 0.6 ? 'weak' : p < 0.75 ? 'building' : p < 0.9 ? 'solid' : 'mastered' };
  };
  const focus = weakTopicNeeds(mast).slice(0, 3);
  return `<div class="results-card">
    <div class="section-label">Topic mastery <span class="muted">(predicted chance of answering a typical question correctly)</span></div>
    <div class="legend">${Object.entries(LEVELS).map(([k, l]) => `<span class="m-chip lvl-${k}">${l}</span>`).join('')}</div>
    ${focus.length ? `<div class="focus-box"><b>Next focus:</b> ${focus.map(f => `${esc(KEY_LABEL[f.k] || f.k)} (${Math.round(f.p * 100)}%)`).join(' · ')}
      <button class="micro-btn" onclick="startSmartSession()">Start Smart Session</button></div>` : ''}
    ${SUBJECTS.map(s => `<div class="m-subject"><div class="m-subject-name">${esc(s.label)}</div><div class="m-chips">
      ${s.groups.flatMap(g => g.chips).map(c => { const i = chipInfo(c); return `<span class="m-chip lvl-${i.level}" title="${i.n} answers${i.p != null ? ` · ${Math.round(i.p * 100)}% predicted` : ''}">${esc(c.label)}${i.p != null && i.n >= 5 ? ` <small>${Math.round(i.p * 100)}%</small>` : ''}</span>`; }).join('')}
    </div></div>`).join('')}
    <p class="muted-note">Mastery weighs harder questions more and recent answers most, and guessed right answers count only partly. The Smart Session uses it to choose what to ask next.</p>
  </div>`;
}
// ── Mistake patterns ──
const ERROR_ADVICE = {
  knowledge: 'Content gaps. Keep using the Smart Session (it targets these topics) and read the full explanation on every miss.',
  confused: 'Mix-ups between similar terms. The app now drills the term you picked by mistake; also write a short "X vs. Y" comparison for each pair below.',
  misread: 'Reading errors. Before answering, restate what is asked: watch for NOT/EXCEPT, units, and the direction of a change (increase vs. decrease).',
  calculation: 'Calculation slips. The MCAT has no calculator: write units, round early, estimate the answer\'s size first, and practice timed math drills.',
  time: 'Pacing. Practice timed sets and aim for about 95 seconds per passage question. Skip and mark hard items instead of stalling.',
};
function mistakeCard() {
  const log = store.get(KEYS.errors, []);
  if (log.length < 5) return '';
  const labeled = log.filter(e => e.type !== 'unlabeled');
  const byType = {};
  labeled.forEach(e => { byType[e.type] = (byType[e.type] || 0) + 1; });
  const top = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  const byDisc = {};
  labeled.forEach(e => { const d = byDisc[e.disc] = byDisc[e.disc] || {}; d[e.type] = (d[e.type] || 0) + 1; });
  const pairs = {};
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
const CHIP_AAMC = {
  'Amino Acids': '1A', 'Protein Structure & Function': '1A', 'Mechanism of Action': '1A', 'Kinetics (Michaelis–Menten)': '1A', 'Inhibition & Regulation': '1A',
  'Glycolysis & Glucose Transport': '1D', 'Gluconeogenesis': '1D', 'Glycogen': '1D', 'Acetyl-CoA & PDH': '1D', 'Citric Acid Cycle': '1D',
  'ETC & Oxidative Phosphorylation': '1D', 'Fatty Acid Oxidation': '1D', 'Pentose Phosphate Pathway': '1D', 'Urea Cycle': '1D', 'Lipid Metabolism': '1D',
  'DNA Structure & Chromosomes': '1B', 'Replication': '1B', 'Repair & Mutation': '1B', 'Transcription & RNA Processing': '1B', 'Translation': '1B',
  'Nucleic Acids — General': '1B', 'Lab Techniques': '1B',
  'Membrane Structure & Transport': '2A', 'Lipids': '5D', 'Carbohydrates': '5D', 'Biosignaling': '3A',
  'Cell Structure & Tissues': '2A', 'Cell Cycle, Mitosis & Meiosis': '2C', 'Genetics & Inheritance': '1C', 'Evolution': '1C', 'Viruses & Bacteria': '2B',
  'Neurons & Glia': '3A', 'Action Potential': '3A', 'Synapses': '3A', 'Neurotransmitters': '3A', 'Sensory Systems': '6A',
  'Muscle Types & Control': '3B', 'Muscle Contraction': '3B', 'Bone & Skeleton': '3B',
  'Heart, Blood & Circulation': '3B', 'Airway Anatomy': '3B', 'Respiratory Physiology': '3B',
  'Hormones & Signaling': '3A', 'Reproduction': '3B', 'Development': '2C', 'Thermoregulation': '3B',
  'Innate Immunity': '3B', 'Adaptive Immunity': '3B', 'Digestion': '3B', 'Kidney': '3B', 'Skin': '3B',
  'Atomic Structure': '4E', 'Quantum Numbers': '4E', 'Periodic Trends': '4E', 'Chemical Bonding': '5B', 'Intermolecular Forces': '5B',
  'Thermochemistry': '5E', 'Kinetics': '5E', 'Equilibrium': '5E',
  'Solutions & Solubility': '5A', 'Acids & Bases': '5A', 'Buffers & Titrations': '5A', 'Redox & Electrochemistry': '4C',
  'Bonding & Structure': '5B', 'Reactions & Mechanisms': '5D', 'Carbonyl Chemistry': '5D', 'Spectroscopy': '4D', 'Separations & Lab Techniques': '5C',
  'Motion, Forces & Energy': '4A', 'Fluids': '4B', 'Electricity & Magnetism': '4C', 'Waves, Sound & Light': '4D', 'Nuclear & Atomic Physics': '4E',
  'Research Methods & Statistics': 'SIRS', 'Physics equations & units': '4A', 'Chemistry equations & constants': '5E',
  'Biological Bases of Behavior': '7A', 'Sensation & Perception': '6A', 'Cognition, Learning & Memory': '6B', 'Emotion, Motivation & Stress': '6C',
  'Personality, Development & Disorders': '7A', 'Social Psychology & Society': '8B',
};
let keyAamc = null;
function aamcOfKey(key) {
  if (!keyAamc) {
    keyAamc = {};
    SUBJECTS.forEach(s => s.groups.forEach(g => g.chips.forEach(c => c.keys.forEach(k => { keyAamc[k] = CHIP_AAMC[c.label] || null; }))));
  }
  return keyAamc[key] || null;
}
// A question's own category tag wins over its topic's primary category
function aamcOf(q) { return q.aamc || aamcOfKey(q.key); }
function aamcCard() {
  const mast = store.get(KEYS.mastery, {});
  const mem = loadMem();
  const agg = {};
  QB.forEach(q => {
    const c = aamcOf(q);
    if (!c) return;
    const a = agg[c] = agg[c] || { total: 0, seen: 0, keys: new Set(), tagged: 0, w: 0, n: 0 };
    a.total++;
    a.keys.add(q.key);
    const m = mem[q.id];
    if (m && m.seen) a.seen++;
    // Per-question tags: estimate from each answered question's current recall chance
    if (q.aamc) { a.tagged++; if (m && m.seen) { a.n++; a.w += retrievability(m) * (m.lapses ? 0.85 : 1); } }
  });
  const level = a => {
    let n = 0, w = 0;
    if (a.tagged > a.total / 2) { n = a.n; w = a.w; }
    else a.keys.forEach(k => { const t = mast[k]; if (t) { n += t.n; w += sigmoid(t.r) * t.n; } });
    if (n < 5) return { level: 'new', p: null };
    const p = w / n;
    return { p, level: p < 0.6 ? 'weak' : p < 0.75 ? 'building' : p < 0.9 ? 'solid' : 'mastered' };
  };
  const psTagged = QB.filter(q => q.subj === 'behavioral' && q.aamc).length;
  const psTotal = QB.filter(q => q.subj === 'behavioral').length;
  return `<div class="results-card">
    <div class="section-label">AAMC content categories <span class="muted">(each topic mapped to its primary category)</span></div>
    <table class="aamc">${AAMC_CATEGORIES.map(([code, name]) => {
      const a = agg[code];
      if (!a) return `<tr class="gap"><td><b>${code}</b></td><td>${esc(name)}</td><td colspan="2"><span class="muted">Not covered by recall questions (use passages and the full-length exams)</span></td></tr>`;
      const lv = level(a);
      return `<tr><td><b>${code}</b></td><td>${esc(name)}</td>
        <td>${a.seen}/${a.total} seen</td>
        <td><span class="m-chip lvl-${lv.level}">${lv.p != null ? Math.round(lv.p * 100) + '%' : 'No data'}</span>
          <button class="micro-btn" onclick="drillCategory('${code}')">Drill</button></td></tr>`;
    }).join('')}</table>
    ${psTagged < psTotal ? '<p class="muted-note">Some psychology and sociology recall questions are tagged by topic only, so part of their 7B–10A content is counted under 7A and 8B.</p>' : '<p class="muted-note">Psychology and sociology questions are tagged one by one to their AAMC category; science questions use their topic\'s primary category.</p>'}
  </div>`;
}
// ── Study plan to the test date ──
// Spreads unseen material over the content phase, reserves the final weeks for
// review and full-length practice, and sizes each day's Smart Session.
const SECONDS_PER_RECALL = 48;   // answer + read the explanation
function calendarDaysBetween(a, b) {
  return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / DAY);
}
function computePlan() {
  const plan = store.get(KEYS.plan, null);
  if (!plan || !plan.date) return null;
  const today = new Date(localDay() + 'T00:00:00');
  const test = new Date(plan.date + 'T00:00:00');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(plan.date) || !Number.isFinite(test.getTime())) return null;
  const daysLeft = calendarDaysBetween(today, test);
  const startDay = new Date((plan.start || localDay()) + 'T00:00:00');
  const initialDays = Math.max(0, calendarDaysBetween(Number.isFinite(startDay.getTime()) ? startDay : today, test));
  const mem = loadMem();
  const seen = QB.filter(q => mem[q.id] && mem[q.id].seen).length;
  const unseen = QB.length - seen;
  const perWeek = Math.min(7, Math.max(1, plan.days || 6));
  const finalDays = initialDays > 42 ? 14 : initialDays > 21 ? 7 : Math.min(2, initialDays);
  const studyDaysLeft = Math.max(1, Math.round((daysLeft * perWeek) / 7));
  const contentStudyDays = Math.max(1, Math.round(((daysLeft - finalDays) * perWeek) / 7));
  const inFinal = daysLeft <= finalDays;
  const due = dueQuestions().length;
  const activity = daysLeft > 2 ? plannedPassage(plan.minutes || 120) : null;
  const studyHistory = store.get(KEYS.studyPath, []);
  const todayWork = studyHistory.filter(x => x.day === localDay());
  const activityDone = passageWorkDone(activity);
  const passageMinutes = activity ? Math.min(plan.minutes || 120, activity.minutes) : 0;
  const capacity = Math.max(0, Math.floor((((plan.minutes || 120) - passageMinutes) * 60) / SECONDS_PER_RECALL));
  const newPerDay = inFinal || daysLeft <= 0 ? 0 : Math.ceil(unseen / contentStudyDays);
  const newGoal=Math.min(newPerDay,Math.max(0,capacity-Math.min(due,Math.ceil(capacity/2))));
  const reviewGoal=Math.min(due,capacity-newGoal);
  const target=newGoal+reviewGoal;
  const recall=recallToday();
  const recallTargetMet=(newGoal===0 || recall.tracked && recall.fresh>=newGoal) && (reviewGoal===0 || recall.tracked && recall.reviews>=reviewGoal);
  // Expected progress since the plan started (straight-line over the content phase)
  const total = Math.max(1, initialDays - finalDays);
  const elapsed = Math.min(total, Math.max(0, calendarDaysBetween(Number.isFinite(startDay.getTime()) ? startDay : today, today)));
  const expectedSeen = Math.round((plan.seenAtStart || 0) + (QB.length - (plan.seenAtStart || 0)) * (elapsed / total));
  const fl = [];
  const addMilestone = (offset, label) => { if (daysLeft - offset >= 0) { const date = new Date(test); date.setDate(date.getDate() - offset); fl.push({ date, label }); } };
  // This app's exams come first; AAMC's official exams (the best predictors) fill the final month, one a week
  if (daysLeft >= 49) {
    const done=store.get(KEYS.examHistory,[]).filter(x=>x.total!=null).map(x=>x.examId);
    if(!done.includes(FULL_EXAMS[0].id))addMilestone(42,'Full-Length Practice Exam 1 (this app)');
    if(!done.includes(FULL_EXAMS[1].id))addMilestone(35,'Full-Length Practice Exam 2 (this app)');
  }
  else if (daysLeft >= 33) {
    // At least 3 days between full-lengths so each one can be reviewed
    const first = daysLeft - 2, second = daysLeft - 9;
    addMilestone(first, 'Full-Length Practice Exam 1 (this app)');
    if (second >= 31) addMilestone(second, 'Full-Length Practice Exam 2 (this app)');
  }
  [28, 21, 14, 7].forEach((o, i) => addMilestone(o, `AAMC official full-length ${i + 1} (aamc.org)`));
  if(!diagnosticRecorded() && daysLeft>3) { const date=new Date(today);date.setDate(date.getDate()+Math.min(7,daysLeft-3));fl.push({date,label:'Baseline diagnostic and review (this app or an official exam)'}); }
  addMilestone(2, 'Light review only; rest and sleep before test day');
  fl.sort((a, b) => a.date - b.date);
  return { plan, daysLeft, studyDaysLeft, finalDays, inFinal, seen, unseen, due, capacity, newPerDay, target,
    activity, activityDone, passageMinutes, newGoal, reviewGoal, recall, recallTargetMet, doneToday: recall.fresh+recall.reviews, expectedSeen, overCapacity: newPerDay + due > capacity, milestones: fl.filter(m => m.date >= today) };
}
function smartSessionSize() {
  const p = computePlan();
  if (!p || p.daysLeft <= 0) return prefs.count || 30;
  const left = Math.max(0,p.newGoal-p.recall.fresh)+Math.max(0,p.reviewGoal-p.recall.reviews);
  return left > 0 ? Math.min(60, Math.max(1, left)) : prefs.count || 20;
}
function planStrip() {
  const p = computePlan();
  if (!p) return `<button class="plan-strip empty" onclick="showPlan()">📅 Set your MCAT date to get a daily study plan →</button>`;
  if (p.daysLeft < 0) return `<button class="plan-strip" onclick="showPlan()">📅 Your test date has passed. Update your study plan →</button>`;
  if (p.daysLeft === 0) return `<button class="plan-strip" onclick="showPlan()">📅 Test day. Trust your preparation, and good luck!</button>`;
  const doneAll = p.recallTargetMet;
  const ahead = p.seen - p.expectedSeen;
  return `<button class="plan-strip" onclick="showPlan()">
    <span>📅 <b>${p.daysLeft}</b> day${p.daysLeft === 1 ? '' : 's'} to the MCAT${p.inFinal ? ' · final review phase' : ''}</span>
    <span>New facts: <b>${p.recall.tracked ? p.recall.fresh : '—'}</b> / ${p.newGoal} · Reviews: <b>${p.recall.tracked ? p.recall.reviews : '—'}</b> / ${p.reviewGoal}${doneAll ? ' ✓' : ''}</span>
    <span class="${ahead >= 0 ? 'ok' : 'behind'}">Content-coverage pace: ${ahead >= 0 ? 'on track' : `${-ahead} behind`}</span>
  </button>`;
}
function planSummaryCard() {
  const p = computePlan();
  if (!p || p.daysLeft < 0) return '';
  return `<div class="results-card"><div class="section-label">Study plan</div>${planDetails(p)}
    <button class="micro-btn" onclick="showPlan()">Edit plan</button></div>`;
}
function planDetails(p) {
  return `<div class="stat-row">
      <div class="stat"><b>${p.daysLeft}</b><span>days to test</span></div>
      <div class="stat"><b>${p.target}</b><span>new + due review targets</span></div>
      <div class="stat"><b>${p.newPerDay}</b><span>new per day</span></div>
      <div class="stat"><b>${p.seen.toLocaleString()}</b><span>of ${QB.length.toLocaleString()} seen</span></div>
    </div>
    <p class="muted-note">Today: new facts <b>${p.recall.tracked ? p.recall.fresh : 'not classified'}/${p.newGoal}</b> · review attempts <b>${p.recall.tracked ? p.recall.reviews : 'not classified'}/${p.reviewGoal}</b>. The new/review split covers answers since this tracking was introduced; earlier attempts are not retroactively classified. Content pace tracks bank coverage, not test readiness.</p>
    ${p.activity ? `<div class="advice"><b>Today: ${esc(DISCIPLINES[p.activity.subj])} ${p.activity.kind === 'mini' ? 'mini test' : 'passage'} ${p.activityDone ? '✓ completed' : 'not completed'}</b> · ${p.passageMinutes} minutes reserved including review. Pair it with recall in the same subject.<button class="micro-btn" onclick="startSubjectWork('${p.activity.subj}','${p.activity.kind}')">${p.activityDone ? 'Optional extra practice' : 'Start planned passage work'}</button></div>` : ''}
    ${p.overCapacity ? `<div class="advice">After reserving passage time, your daily time fits about <b>${p.capacity}</b> questions, but you have <b>${p.newPerDay}</b> new plus <b>${p.due}</b> due. Add time, or let the Smart Session prioritize: it puts high-yield and weak topics first.</div>` : ''}
    ${p.inFinal ? '<div class="advice">You\'re in the final review phase: no new material. Focus on due reviews, weak topics, mistake patterns and full-length practice.</div>' : ''}
    ${passageSchedule(p)}
    ${p.milestones.length ? `<div class="sw-head">Upcoming milestones</div><ul class="milestones">${p.milestones.map(m => `<li><b>${m.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</b> · ${esc(m.label)}</li>`).join('')}</ul>` : ''}`;
}
function showPlan() {
  show('screen-results');
  const plan = store.get(KEYS.plan, {}) || {};
  const p = computePlan();
  $('results-body').innerHTML = `
    <div class="results-hero"><div class="r-label">Study plan</div></div>
    <div class="results-card plan-form">
      <label>MCAT test date <input type="date" id="plan-date" min="${localDay()}" value="${esc(plan.date || '')}"></label>
      <label>Study days per week <select id="plan-days">${[3, 4, 5, 6, 7].map(n => `<option value="${n}"${(plan.days || 6) === n ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
      <label>Time per study day <select id="plan-min">${[30, 60, 90, 120, 180, 240].map(n => `<option value="${n}"${(plan.minutes || 120) === n ? ' selected' : ''}>${n >= 60 ? n / 60 + ' h' : n + ' min'}</option>`).join('')}</select></label>
      <button class="new-quiz-btn" onclick="savePlan()">Save plan</button>
      ${plan.date ? '<button class="text-btn" onclick="clearPlan()">Remove plan</button>' : ''}
    </div>
    ${p && p.daysLeft >= 0 ? `<div class="results-card"><div class="section-label">Your plan</div>${planDetails(p)}</div>${studyPathCard()}` : ''}
    <div class="results-card"><div class="section-label">How the plan works</div>
      <p class="muted-note" style="margin-top:0">Unseen questions are spread over your study days up to the final review phase (the last 2 weeks, or 1 week if the test is close). Each day's target is that new material plus everything due for review. Each study day also reserves time for one passage (or a ready subject mini test), including review; recall is capped at the remaining daily time (about ${SECONDS_PER_RECALL} seconds per question). The Smart Session sizes itself to what's left for today. Full-length exams are spaced so the last ones fall in the final month. AAMC's official practice exams are the closest match to the real test, so the plan saves them for last.</p>
    </div>
    <div class="btn-row"><button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div>`;
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
function drillCategory(code) {
  const pool = QB.filter(q => aamcOf(q) === code);
  if (pool.length) beginQuiz(pickQuestions(pool, prefs.count || 20), `AAMC ${code}`);
}

// Compact one-line version for the home screen and session results
function scoreStrip() {
  const est = estimateScores();
  if (!est.sections.some(s => s.scaled != null)) return '';
  return `<button class="score-strip" onclick="showProgress()" title="Open your score report">
    <span class="ss-total"><small>Est. MCAT</small>${est.total ?? '—'}</span>
    ${est.sections.map(s => `<span class="ss-sec"><small>${s.abbrev}</small>${s.scaled ?? '—'}</span>`).join('')}
    <span class="ss-go">Score report →</span>
  </button>`;
}
function showProgress() {
  show('screen-results');
  snapshotEstimate();
  const html = progressCards();
  $('results-body').innerHTML = `
    <div class="results-hero"><div class="r-label">Score report & progress</div></div>
    ${scoreReportCards()}
    ${planSummaryCard()}
    ${masteryMapCard()}
    ${aamcCard()}
    ${mistakeCard()}
    ${calibrationCard()}
    ${fluencyCard()}
    ${html || '<div class="results-card"><p class="muted-note">No recall answers recorded yet. Finish a few questions and your progress will appear here.</p></div>'}
    ${examHistoryCard()}
    <div class="btn-row"><button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div>
    <button class="text-btn danger" onclick="resetProgress()">Reset all progress on this device…</button>`;
}
function resetProgress() {
  if (!confirm('Erase all recall stats, spaced-repetition history, flags, passage scores, score estimates and exam history on this device? This cannot be undone.')) return;
  [KEYS.recallDays, KEYS.plannedPassages, KEYS.diagnostic, KEYS.fluency, KEYS.studyPath, KEYS.finalTwo, KEYS.stats, KEYS.srs, KEYS.mem, KEYS.mastery, KEYS.recent, KEYS.errors, KEYS.calib, KEYS.daily, KEYS.flags, KEYS.passages, KEYS.examHistory, KEYS.evidence, KEYS.scoreHistory].forEach(k => store.del(k));
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
// Next passage of the same kind you haven't tried yet (or simply the next one)
function nextPassage() {
  const pstats = store.get(KEYS.passages, {});
  const g = PASSAGE_GROUPS.find(x => x.test(pq.p.id));
  const i = ALL_PASSAGES.indexOf(pq.p);
  const after = [...ALL_PASSAGES.slice(i + 1), ...ALL_PASSAGES.slice(0, i)];
  const next = after.find(p => g && g.test(p.id) && !pstats[p.id]) || after.find(p => g && g.test(p.id)) || after[0];
  selectedPassageId = next.id;
  startPassage();
}
function startPassage() {
  
  stopQuizTimer();
  pq.mini = null; pq.completed = false; pq.errPending = null;
  const p = PASSAGE_BY_ID.get(selectedPassageId);
  if (!p) return;
  // AAMC pace: 95 min / 59 science questions ≈ 95 s; 90 min / 53 CARS questions ≈ 102 s
  const perQ = /^p_(cars|e2cars)/.test(p.id) ? 102 : 95;
  Object.assign(pq, { p, idx: 0, views: p.questions.map(makeView), results: [], answered: false, startedAt: Date.now(), qStart: Date.now(), targetMs: perQ * 1000 * p.questions.length });
  show('screen-passage');
  $('pp-passage-box').innerHTML = passageCard(p.topic || '', p.title, p.passage, p.figure);
  renderPassageQuestion();
  stopPassageTimer();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
function updatePassageTimer() {
  const el = $('pp-timer');
  if (!el || activeScreen !== 'screen-passage') { stopPassageTimer(); return; }
  const used = Date.now() - pq.startedAt;
  if (pq.mini && !pq.mini.completed && used >= pq.targetMs) { finishSubjectMini(); return; }
  el.textContent = `${fmtTime(used)} / ${fmtTime(pq.targetMs)}`;
  el.title = 'Time used / AAMC pace for this passage';
  el.className = 'qm-timer' + (used > pq.targetMs ? ' danger' : used > pq.targetMs * 0.85 ? ' warn' : '');
}
function stopPassageTimer() { if (pq.timer) clearInterval(pq.timer); pq.timer = null; }
function passageCard(topic, title, text, figure) {
  return `<div class="passage-card">
    ${topic ? `<div class="passage-topic">${esc(topic)}</div>` : ''}
    <div class="passage-title">${esc(title)}</div>
    <div class="passage-text">${paragraphs(text)}</div>
    ${figure ? figureHtml(figure) : ''}
  </div>`;
}
// Data tables for reasoning passages: {caption, columns, rows}
function figureHtml(fig) {
  if (!fig || !Array.isArray(fig.columns)) return '';
  return `<figure class="data-figure">
    <table><thead><tr>${fig.columns.map(c => `<th>${fmt(c)}</th>`).join('')}</tr></thead>
      <tbody>${(fig.rows || []).map(r => `<tr>${r.map(c => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    ${fig.caption ? `<figcaption>${fmt(fig.caption)}</figcaption>` : ''}
  </figure>`;
}
function renderPassageQuestion() {
  
  pq.answered = false;
  const view = pq.views[pq.idx], tot = pq.views.length;
  $('pp-fill').style.width = (pq.idx / tot) * 100 + '%';
  $('pp-counter').textContent = `${pq.idx + 1} / ${tot}`;
  $('pp-subject').textContent = pq.p.title;
  $('pp-score').textContent = `✓ ${pq.results.filter(r => r.right).length}/${pq.results.length}`;
  pq.qStart = Date.now();
  if (pq.mini) {
    const passage = pq.mini.items[pq.idx].passage;
    $('pp-passage-box').innerHTML = passage ? passageCard(passage.topic || '', passage.title, passage.passage, passage.figure) : '<p class="muted-note">Discrete question · no passage</p>';
    $('pp-score').textContent = pq.results.length + '/' + tot + ' answered · feedback at end';
  }
  $('pp-question-box').innerHTML = `${breakBanner()}
    <div class="question-box"><div class="q-toolbar"><span class="q-tag">Question ${pq.idx + 1} of ${tot}${view.q.skill ? ` · ${esc(SKILL_LABEL[view.q.skill] || view.q.skill)}` : ''}</span></div>
      <div class="question-text">${fmt(view.q.q)}</div></div>
    <div class="choices">${choiceButtons(view.choices, 'answerPassage', { prefix: 'pc' })}</div>
    <div id="pp-exp"></div><div id="pp-next"></div>`;
}
function finishPassageAnswer(chosen, other = null, answerMs = null) {
  if (pq.mini) {
    if (Date.now() - pq.startedAt >= pq.targetMs) { finishSubjectMini(); return; }
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
  $('pp-exp').innerHTML = finalTwoFeedback(view, chosen, other) + explanationBox(right, view.choices[view.ans], view.q.exp, issueUrl(`Passage · ${pq.p.title}`, view.q.q));
  const last = pq.idx + 1 >= pq.views.length;
  $('pp-next').innerHTML = `${right ? '' : wrongAlternativePanel('passage',view,chosen,other)+errorTypeRow(null, 'setPassageErr')}<button class="next-btn" id="pp-next-btn" onclick="nextPassageQ()">${last ? 'See results →' : 'Next question →'}</button>`;
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
  if (pq.mini) { finishSubjectMini(); return; }
  if (pq.completed) return;
  pq.completed = true;
  flushPassageErr();
  const tot = pq.results.length, cor = pq.results.filter(r => r.right).length, p = pct(cor, tot);
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
      <div class="score-pct" style="color:${color}">${p}%</div>
      <div class="score-sub">${cor} / ${tot} correct · ${esc(pq.p.title)}</div>
    </div>
    <div class="results-card"><div class="section-label">Pacing</div>
      <p class="muted-note">${paceMsg}${slow.length ? ` Slowest: ${slow.map(s => `Q${s.i + 1} (${fmtTime(s.ms)})`).join(', ')}.` : ''}</p>
    </div>
    <div class="results-card"><div class="section-label">Missed questions</div>
      ${missed.length ? missed.map(r => reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp })).join('')
        : '<div class="all-correct">✓ Perfect — no missed questions.</div>'}
    </div>
    <div class="btn-row">
      <button class="new-quiz-btn" onclick="startPassage()">Retry passage</button>
      <button class="new-quiz-btn secondary" onclick="nextPassage()">Next passage →</button>
      <button class="new-quiz-btn secondary" onclick="goHome()">Home</button>
    </div>
    ${studyPathCard(disciplineOfPassage(pq.p))}
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
  exam.alternatives ||= exam.answers.map(row => row.map(() => null));
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
  if (!exam || !['question', 'review'].includes(exam.phase) || exam.results[exam.si]) return;
  stopExamTimer();
  ensureOrders();
  const qs = curQuestions();
  const sectionId = curSection().id;
  let correct = 0;
  qs.forEach((q, i) => {
    const a = exam.answers[exam.si][i];
    const right = a != null && exam.orders[exam.si][i][a] === q.ans;
    if (right) correct++;
    recordEvidence('exam', disciplineOfExamQuestion(sectionId, q), right);
  });
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
    <p class="muted-note">Scaled scores are estimates. The AAMC converts raw scores separately for each test form. Percentiles are the AAMC ranks in effect May 1, 2026 – April 30, 2027.</p>
    ${examMissSummary(attempt).total ? `<div class="results-card study-misses">
      <div class="section-label">Turn mistakes into points</div>
      <p class="muted-note" style="margin-top:0">The exam itself doesn't adapt, just like the real MCAT. This session does: it targets the subjects you missed, weighted by how many you missed, with the same drill-until-it-sticks reinforcement.</p>
      <button class="new-quiz-btn" onclick="studyExamMistakes()">Study my mistakes from this exam →</button>
      ${examMissSummary(attempt).cars ? `<p class="muted-note">CARS isn't fact recall, so for the ${examMissSummary(attempt).cars} CARS misses, use the CARS passages in Passage mode.</p>` : ''}
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
  const { byDisc, total } = examMissSummary(examReviewState.attempt);
  if (!total) return;
  const n = Math.min(40, Math.max(15, Math.round(total * 0.8)));
  const mem = loadMem(), mast = store.get(KEYS.mastery, {}), target = targetSuccess();
  const items = [];
  Object.entries(byDisc).forEach(([d, misses]) => {
    const share = Math.max(1, Math.round((n * misses) / total));
    QB.filter(q => disciplineOfRecall(q) === d)
      .map(q => ({ q, s: Math.abs(predictedSuccess(q, mem, mast) - target) + (mem[q.id] ? 0.1 : 0) + Math.random() * 0.15 }))
      .sort((a, b) => a.s - b.s).slice(0, share)
      .forEach(x => items.push({ q: x.q, reason: 'exam' }));
  });
  if (items.length) beginQuiz(interleave(items), 'Exam mistakes');
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
        <div class="disc-score" style="color:${scoreColor(eq)}">${eq}</div>
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
      <div class="seg-row">${def.sections.map((s, i) => `<button class="seg-btn${i === si ? ' active' : ''}" onclick="setExamReview('si',${i})">${s.abbrev}</button>`).join('')}</div>
      <div class="seg-row">${[['incorrect', 'Incorrect & unanswered'], ['marked', 'Marked'], ['all', 'All']].map(([f, l]) => `<button class="seg-btn small${f === filter ? ' active' : ''}" onclick="setExamReview('filter','${f}')">${l}</button>`).join('')}</div>
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
      <p>MCAT Study App is a free, open-source study tool by Collin B. George. It offers spaced-repetition recall questions, practice passages and timed full-length practice exams. There are no accounts, ads or fees. The source code and content are on ${link(REPO_URL, 'GitHub')}.</p>

      <h2>Not affiliated with the AAMC</h2>
      <p>MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC). This app is independent: it is not affiliated with, sponsored by or endorsed by the AAMC. It contains no official AAMC exam questions. Section formats, timing and content shares follow the AAMC's public descriptions of the exam. For official information and practice materials, go to ${link('https://students-residents.aamc.org/taking-mcat-exam/take-mcat-exam', 'the AAMC MCAT website')}.</p>

      <h2>Educational use only, not medical advice</h2>
      <p>All content is for MCAT preparation. It is not medical, clinical, pharmacological or psychological advice, and it is not a substitute for a qualified professional. Some explanations mention drugs, doses, disorders and procedures. They are there to teach exam concepts, not to guide anyone's care.</p>

      <h2>Accuracy</h2>
      <p>The question bank was reviewed against current references, including the AAMC content outline and DSM-5-TR, but errors are still possible. Content is provided "as is", without warranty of any kind. Check important facts against your textbooks or official AAMC materials. If something looks wrong, use <b>Report a problem</b> under any explanation. Reports open as <b>public</b> GitHub issues, so don't include personal information.</p>

      <h2>Score estimates</h2>
      <p>Scaled scores, totals and percentiles in this app are <b>study estimates, not predictions</b> of an official MCAT score. The AAMC converts raw scores separately for each test form, and this app's questions are not AAMC questions. Percentile ranks use the AAMC tables in effect May 1, 2026 – April 30, 2027 (${link('https://www.aamc.org/services/mcat-admissions-officers/resources/percentile-ranks', 'source')}). For a test-day prediction, use the AAMC's official practice exams.</p>

      <h2>Privacy</h2>
      <p>This app collects no personal information. There are no accounts and no analytics, ads or tracking cookies. Your progress (answers, flags, scores and exam history) is saved only in this browser's local storage on this device. It is never sent to the author or anyone else. You can erase it at any time with <b>Score report → Reset all progress</b>, or by clearing this site's data in your browser.</p>
      <p>The site is hosted on GitHub Pages. Like any web host, GitHub may log basic technical information such as IP addresses under the ${link('https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', 'GitHub Privacy Statement')}.</p>

      <h2>Sources &amp; credits</h2>
      <ul>
        <li><b>Recall questions</b> are derived from the <b>MCAT Milesdown</b> Anki deck by MileDown (${link('https://ankiweb.net/shared/info/178384887', 'AnkiWeb shared deck 178384887')}, 2,884 notes, last updated May 2020). Its cloze cards were converted to multiple choice and substantially edited and corrected for this app. Credit for the original cards belongs to their creator. MileDown has no affiliation with this app and has not reviewed or endorsed it. To study the original cards with images and video links, download the deck from AnkiWeb. If you created the original decks and would like the credit worded differently, or the material changed or removed, please ${link(REPO_URL + '/issues', 'open an issue')}.</li>
        <li><b>Passages, CARS passages, data &amp; reasoning sets (with their fictional studies and data), "applied" question variants and full-length exam questions</b> are original to this app.</li>
        <li><b>Percentile ranks and section content shares</b> are taken from published AAMC information, credited above.</li>
      </ul>

      <h2>License</h2>
      <p>The app's code and original content are licensed under ${link('https://creativecommons.org/licenses/by-nc/4.0/', 'Creative Commons BY-NC 4.0')}. You may share and adapt them for non-commercial purposes with attribution. Third-party material, including the original MileDown cards, remains subject to its owners' terms.</p>

      <p class="muted-note">Version 2.6 · Last updated October 2026</p>
    </div>
    <div class="btn-row"><button class="new-quiz-btn secondary" onclick="goHome()">Home</button></div>`;
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
