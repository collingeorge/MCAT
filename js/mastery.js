// Section Mastery path: one MCAT section at a time, as the exam tests it: C/P first, then B/B, then P/S.
//   First: a diagnostic (a full section, scored 118–132, weak AAMC content categories shown; it can be retaken).
//   Then every day, exactly 3 steps: 1 50 flashcards (C/P: the Practice Test flashcards of data/cp-test-cards.js, built
//   from the C/P questions of Practice Exams 1, 3, 4, 5 and 6; no QBank card) → 2 50 guided Practice Exam cards with step-by-step
//   lessons → 3 a 30-question quiz from data/cp-pool.js (half an AAMC section in exam order), unlocked once the flashcards
//   are done (guided cards recommended, not required) → done for the day at goal, otherwise a follow-up on the quiz's misses and weak categories with
//   flashcards and guided cards.
//   C/P follows the AAMC blueprint (MASTERY.blueprint) exactly: each step's count is split 100% over all 10 content
//   categories by how often AAMC tests each one (masteryBlueprintSplit: largest remainder, ties to the heavier
//   category), cards in the AAMC discipline mix over the whole day (masteryDiscQuota). Weakness never changes a
//   count: it changes which cards are picked within a category (missed and due cards, then the weakest sub-topics,
//   then the rest; masteryTierPick) and is marked on TODAY.
//   Every day with a blueprint uses the exact split, today included: a day row saved earlier (5 content categories
//   a day, or split 'blueprint') is rewritten to split 'exact' when it loads, keeping the answers it already counted
//   (flashT, guidedT by category) and its weak marks. Fields of the removed passage step (prac, pracT, pracD, pracS,
//   pracX, pracUsed) are ignored.
//   Reaching the goal (128 by default) on the quiz on MASTERY.passDays separate days in a row moves the path to the
//   next section, which starts with its own diagnostic.
// Only approved content is used. C/P: the Practice Test flashcards (data/cp-test-cards.js), the Practice Exam cards
// of Practice Exams 1, 3, 4, 5 and 6 (no Sample Test card) and the C/P diagnostic and quiz passages (data/cp-diagnostic.js,
// data/cp-pool.js). Other sections, until they have their own sets: the QBank cards.
// The scaled scores use the app's raw-to-scaled table (rawToScaled in app.js): an estimate, not an AAMC score.
// masteryPlan() is pure (no storage, DOM or clock) so tools/test-mastery.cjs can test it with node.
const MASTERY = {
  order: ['cp', 'bb', 'ps'],   // MCAT sections (CARS is reading and reasoning: passages, not flashcards)
  topicsPerDay: 5,      // content categories a day, for sections without a blueprint (and days saved before it)
  perDay: [50, 30, 20], // flashcards, and Practice Exam cards, per day (the student picks; 50 by default)
  rulesPerDay: 10,      // C/P: rule cards in the daily rules warm-up, required before the flashcards
  // Each section's AAMC content categories (the exam's own outline).
  topics: {
    cp: ['4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E'],
    bb: ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '3A', '3B'],
    ps: ['6A', '6B', '6C', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '10A'],
  },
  // Diagnostic: a full AAMC section (59 questions: 10 passages + single questions), enough data to rank every
  // content category. End-of-day test: half a section (30: 5 passages + ~10 single). Both at exam pace.
  diagSize: 59, diagPassages: 10,
  // The current diagnostic's id per section (CP_DIAG.id): a diagnostic saved with another id, or none, is an earlier
  // version (the 2026-11 rebuild made every question a twin of a studied card).
  diagVersion: { cp: 'cp_diag2' },
  testSize: 30, testPassages: 5,
  goals: [128, 129],
  defaultGoal: 128,
  passDays: 2,          // separate days in a row at or above the goal
  weakBelow: 84,        // % correct in a topic below this (≈128) counts as weak
  // AAMC blueprint, in % of all 354 C/P questions on Practice Exams 1–6: content categories, disciplines,
  // scientific skills (SIRS) and difficulty (E easy, M medium, D difficult, X hardest), for reference.
  // Every day's flashcards and Practice Exam cards are split 100% by the category and discipline weights.
  blueprint: {
    cp: {
      cats: { '5D': 24, '5E': 15, '4E': 13, '5A': 9, '4D': 8, '4C': 8, '4B': 7, '5B': 6, '4A': 5, '5C': 4 },
      discs: { gen_chem: 32, biochemistry: 25, physics: 25, organic_chem: 16, biology: 2 },
      skills: { 'SIRS 1': 37, 'SIRS 2': 44, 'SIRS 3': 10, 'SIRS 4': 10 },
      diffs: { D: 39, M: 30, X: 21, E: 10 },
    },
  },
  oldBonusShare: 0.2,   // only for a day saved with split 'blueprint' (its two weak categories got +20%): that day only
  secondsPerItem: 95,   // timed test pace: the exam's 95 min for 59 questions is about 97 s each
};

// ── Pure planning ──
function masteryNormalize(raw) {
  const m = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const goal = MASTERY.goals.includes(m.goal) ? m.goal : MASTERY.defaultGoal;
  // Saved (and cloud-synced) results reach the page as HTML text, so every number must be a real number.
  const tests = (Array.isArray(m.tests) ? m.tests : []).filter(t => t && MASTERY.order.includes(t.subj) && typeof t.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.day)
    && Number.isInteger(t.scaled) && Number.isInteger(t.correct) && Number.isInteger(t.total) && t.total > 0 && t.correct >= 0 && t.correct <= t.total
    && Number.isFinite(t.pct) && (t.kind === 'diagnostic' || t.kind === 'daily'));
  const days = m.days && typeof m.days === 'object' && !Array.isArray(m.days) ? m.days : {};
  const passed = m.passed && typeof m.passed === 'object' && !Array.isArray(m.passed) ? m.passed : {};
  const current = MASTERY.order.includes(m.current) ? m.current : null;
  const perDay = MASTERY.perDay.includes(m.perDay) ? m.perDay : MASTERY.perDay[0];
  // Daily quiz sets already taken, most recent last ({id, day}), so the next quiz picks one not seen yet.
  const usedSets = (Array.isArray(m.usedSets) ? m.usedSets : []).filter(u => u && typeof u.id === 'string' && typeof u.day === 'string').slice(-60);
  // Rule cards of the rules warm-up: {id: {d: last day seen, ok: last marked "Got it"}} (synced text: checked).
  const rules = Object.fromEntries(Object.entries(m.rules && typeof m.rules === 'object' && !Array.isArray(m.rules) ? m.rules : {})
    .filter(([id, r]) => /^r-[a-z0-9-]+$/.test(id) && r && typeof r.d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.d) && typeof r.ok === 'boolean').map(([id, r]) => [id, { d: r.d, ok: r.ok }]));
  return { goal, tests, days, passed, current, perDay, usedSets, rules };
}
// Current section: the one the student picked, else the first not yet mastered (in path order).
function masterySubject(m, today) {
  if (m.current && !(m.passed[m.current] && m.passed[m.current] < today)) return m.current;
  return MASTERY.order.find(s => !(m.passed[s] && m.passed[s] < today)) || null;
}
// Distinct test days (latest test of each day) ending at the most recent one, counted while at or above goal.
// Consecutive calendar days, ending on the latest quiz day, on which a daily quiz reached the goal. Only daily
// quizzes count (a diagnostic, or its retake, never adds to or breaks the streak); a day counts as at goal if any
// quiz that day reached it; a day with no quiz breaks the run.
function masteryStreak(tests, goal) {
  const best = new Map();
  tests.filter(t => t.kind === 'daily').forEach(t => best.set(t.day, Math.max(best.get(t.day) ?? -Infinity, t.scaled)));
  const days = [...best.keys()].sort().reverse();
  let n = 0;
  for (let i = 0; i < days.length; i++) {
    if (i > 0 && masteryDayGap(days[i], days[i - 1]) !== 1) break;
    if (best.get(days[i]) >= goal) n++; else break;
  }
  return n;
}
function masteryDayGap(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000); }
// Topics ranked weakest first from a test's per-category tallies {code: {c, t}}.
function masteryWeak(test) {
  if (!test || !test.cats) return [];
  return Object.entries(test.cats).filter(([k, v]) => k !== 'passage' && v && v.t > 0)
    .map(([k, v]) => ({ code: k, c: v.c, t: v.t, pct: Math.round(100 * v.c / v.t) }))
    .sort((a, b) => a.pct - b.pct || b.t - a.t);
}
// Today's content categories: up to 2 of the weakest, then the section's others that were studied longest ago (or never).
function masteryTopics(m, subj, today, latest) {
  const list = MASTERY.topics[subj] || [];
  const weak = masteryWeak(latest).filter(w => w.pct < MASTERY.weakBelow && list.includes(w.code)).map(w => w.code).slice(0, 2);
  const last = {};
  Object.keys(m.days).filter(d => d < today && m.days[d]?.subj === subj).sort().forEach(d => (m.days[d].topics || []).forEach(t => { last[t] = d; }));
  const rest = list.filter(t => !weak.includes(t)).sort((a, b) => (last[a] || '').localeCompare(last[b] || '') || list.indexOf(a) - list.indexOf(b));
  return [...weak, ...rest].slice(0, MASTERY.topicsPerDay);
}
// Splits n items over weighted codes [[code, w], …] by largest remainder: each gets the floor of its exact share,
// then the items left go to the largest remainders, a tie to the higher weight (then the one listed first). For
// C/P categories and 50 items: 5D 12, 5E 8, 4E 7, 5A 5, 4D 4, 4C 4, 4B 3, 5B 3, 4A 2, 5C 2; 5 passages go 2/1/1/1/0.
function masteryApportion(weighted, n) {
  const total = weighted.reduce((t, [, w]) => t + w, 0) || 1;
  const out = weighted.map(([, w]) => Math.floor(n * w / total + 1e-9));
  const rem = weighted.map(([, w], i) => n * w - out[i] * total);   // remainder × total (exact for whole weights)
  const left = n - out.reduce((a, b) => a + b, 0);
  weighted.map((_, i) => i).sort((i, j) => (Math.abs(rem[j] - rem[i]) > 1e-9 ? rem[j] - rem[i] : 0) || weighted[j][1] - weighted[i][1] || i - j)
    .slice(0, Math.max(0, left)).forEach(i => out[i]++);
  return out;
}
// Splits a day's total over the sub-topics as evenly as possible; the weakest (listed first) get any extra.
function masterySplit(total, n) { return Array.from({ length: n }, (_, i) => Math.floor(total / n) + (i < total % n ? 1 : 0)); }
// A section's blueprint weights [[code, weight], …], heaviest first (ties keep the listed order); null without one.
function masteryWeights(subj, key = 'cats') {
  const w = MASTERY.blueprint[subj] && MASTERY.blueprint[subj][key];
  return w ? Object.entries(w).sort((a, b) => b[1] - a[1]) : null;
}
// Splits a day's n items over every content category, 100% by blueprint weight (masteryApportion). Weak categories
// are only marked (weak: true): their counts stay at the AAMC weight. oldBonus: a day saved with split 'blueprint'
// before the exact split keeps its +20% (MASTERY.oldBonusShare) half each to its two weakest, for that day only.
// caps {code: items in the pool}: a category with too few gives its shortfall to the next categories by weight
// (wrapping round) that have items left. Returns, heaviest first: [{code, need, base (the AAMC share), extra (over
// the AAMC share for weakness: 0 except on an old bonus day), weak, short (moved out), to (codes it went to),
// spill (moved in)}]; need = base plus extra, minus short, plus spill.
function masteryBlueprintSplit(n, weights, weak = [], caps = null, oldBonus = false) {
  const codes = weights.map(([c]) => c);
  weak = [...new Set(weak)].filter(c => codes.includes(c)).slice(0, 2);
  const bonus = {};
  if (oldBonus && weak.length) {
    const extra = n - Math.round(n * (1 - MASTERY.oldBonusShare));
    bonus[weak[0]] = Math.ceil(extra / 2); if (weak.length > 1) bonus[weak[1]] = extra - bonus[weak[0]];
  }
  const base = masteryApportion(weights, n - Object.values(bonus).reduce((a, b) => a + b, 0));
  const out = codes.map((code, i) => ({ code, need: base[i] + (bonus[code] || 0), base: base[i], extra: bonus[code] || 0, weak: weak.includes(code), short: 0, to: [], spill: 0 }));
  if (caps) {
    const cap = t => (Number.isFinite(caps[t.code]) ? Math.max(0, caps[t.code]) : 0);
    out.forEach((t, i) => {
      let over = t.need - cap(t);
      if (over <= 0) return;
      t.need -= over; t.short = over;
      for (let k = 1; k < out.length && over > 0; k++) {
        const u = out[(i + k) % out.length], moved = Math.min(cap(u) - u.need, over);
        if (moved > 0) { u.need += moved; u.spill += moved; over -= moved; t.to.push(u.code); }
      }
    });
  }
  return out;
}
// The fixed mix of a daily quiz (30 questions): every category and discipline by blueprint weight.
function masteryQuizTargets(subj, n = MASTERY.testSize) {
  if (!MASTERY.blueprint[subj]) return null;
  const part = key => { const w = masteryWeights(subj, key), s = masteryApportion(w, n); return Object.fromEntries(w.map(([k], i) => [k, s[i]])); };
  return { cats: part('cats'), discs: part('discs') };
}
// Checks a quiz's questions [{cat, disc}] against that mix: each category exactly; each discipline within ±1 (one
// with a target of 1 or less, biology, at most its target). Returns the misses [{kind, code, need, got}], none: [].
function masteryQuizMix(items, subj) {
  const t = masteryQuizTargets(subj, items.length);
  if (!t) return [];
  const tally = k => items.reduce((o, q) => { o[q[k]] = (o[q[k]] || 0) + 1; return o; }, {});
  const cats = tally('cat'), discs = tally('disc'), out = [];
  for (const [code, need] of Object.entries(t.cats)) if ((cats[code] || 0) !== need) out.push({ kind: 'category', code, need, got: cats[code] || 0 });
  for (const [code, need] of Object.entries(t.discs)) { const got = discs[code] || 0; if (need <= 1 ? got > need : Math.abs(got - need) > 1) out.push({ kind: 'discipline', code, need, got }); }
  return out;
}
// Picks k of cards in the AAMC discipline mix (discW [[d, w], …]) over the disciplines the cards have; the rest,
// if a discipline runs short, from any of them.
function masteryDiscPick(cards, k, discOf, discW, pick) {
  if (k <= 0 || !cards.length) return [];
  const present = discW.filter(([d]) => cards.some(q => discOf(q) === d)), share = masteryApportion(present, Math.min(k, cards.length));
  let got = [];
  present.forEach(([d], i) => { got = got.concat(pick(cards.filter(q => discOf(q) === d), share[i])); });
  if (got.length < k) got = got.concat(pick(cards.filter(q => !got.includes(q)), k - got.length));
  return got;
}
// The day's discipline counts per category, chosen for the whole step so the day's total follows the AAMC
// discipline mix (discW) as closely as the categories allow. Category counts never change. rows [{code, k, avail:
// {disc: cards in that category}}] → {code: {disc: count}}. Each category starts at its own AAMC mix over the
// disciplines it has (capped by its cards); then, while a discipline is over its day target and another is under,
// slots move from over to under inside a category that has both (or along a chain of categories: A gives d → f in one
// category and f → e in another), so 5A's all-general-chemistry slots are offset by physics in 4E, 4C or 4B. Each move
// lowers the total distance from the day targets by 2, so it ends; it stops when no move is left.
function masteryDiscQuota(rows, discW) {
  const order = discW.map(([d]) => d), quota = {};
  for (const r of rows) {
    const present = discW.filter(([d]) => (r.avail[d] || 0) > 0), total = present.reduce((n, [d]) => n + r.avail[d], 0);
    const q = Object.fromEntries(present.map(([d]) => [d, 0]));
    let left = Math.min(r.k, total);
    masteryApportion(present, left).forEach((n, i) => { const d = present[i][0]; q[d] = Math.min(n, r.avail[d]); left -= q[d]; });
    for (const [d] of present) { const add = Math.min(left, r.avail[d] - q[d]); q[d] += add; left -= add; }
    quota[r.code] = q;
  }
  const discs = order.filter(d => rows.some(r => (r.avail[d] || 0) > 0));
  const n = rows.reduce((t, r) => t + Object.values(quota[r.code]).reduce((a, b) => a + b, 0), 0);
  const T = Object.fromEntries(masteryApportion(discW.filter(([d]) => discs.includes(d)), n).map((x, i) => [discs[i], x]));
  const count = d => rows.reduce((t, r) => t + (quota[r.code][d] || 0), 0);
  // The category to move one slot from x to y in: the one with the most x over y, then the heavier (listed first).
  const via = (x, y) => {
    let best = null;
    for (const r of rows) {
      const q = quota[r.code];
      if (!(q[x] > 0) || !((r.avail[y] || 0) > (q[y] || 0))) continue;
      if (!best || q[x] - (q[y] || 0) > quota[best][x] - (quota[best][y] || 0)) best = r.code;
    }
    return best;
  };
  for (let guard = 0; guard < 1000; guard++) {
    const c = Object.fromEntries(discs.map(d => [d, count(d)]));
    const over = discs.filter(d => c[d] > T[d]).sort((a, b) => (c[b] - T[b]) - (c[a] - T[a]) || order.indexOf(a) - order.indexOf(b));
    let path = null;
    for (const from of over) {
      // Breadth-first over disciplines: an edge x → y when some category can trade an x slot for a y card.
      const prev = { [from]: null }, queue = [from];
      let to = null;
      while (queue.length) {
        const x = queue.shift();
        for (const y of discs) {
          if (y in prev) continue;
          const cat = via(x, y);
          if (!cat) continue;
          prev[y] = [x, cat]; queue.push(y);
          if (c[y] < T[y] && (!to || T[y] - c[y] > T[to] - c[to])) to = y;
        }
      }
      if (to) { path = []; for (let y = to; prev[y]; y = prev[y][0]) path.unshift([prev[y][0], y, prev[y][1]]); break; }
    }
    if (!path) break;
    for (const [x, y, cat] of path) { quota[cat][x]--; quota[cat][y] = (quota[cat][y] || 0) + 1; }
  }
  return quota;
}
// Picks k of cards by a discipline quota {disc: n}; the rest, if a discipline runs short, from any of them.
function masteryQuotaPick(cards, k, quota, discOf, pick) {
  if (k <= 0 || !cards.length) return [];
  let got = [];
  for (const [d, n] of Object.entries(quota)) if (n > 0 && got.length < k) got = got.concat(pick(cards.filter(q => discOf(q) === d), Math.min(n, k - got.length)));
  if (got.length < k) got = got.concat(pick(cards.filter(q => !got.includes(q)), k - got.length));
  return got;
}
// Which cards to pick, never how many: tierOf(q) gives each card a rank (lower first) and the cards are taken a
// whole rank at a time; pick (the app's due-first picker) chooses within the last rank that only partly fits.
function masteryTierPick(cards, k, tierOf, pick) {
  if (!tierOf || k <= 0) return pick(cards, k);
  const groups = new Map();
  cards.forEach(q => { const t = tierOf(q); if (!groups.has(t)) groups.set(t, []); groups.get(t).push(q); });
  let got = [];
  for (const t of [...groups.keys()].sort((a, b) => a - b)) {
    if (got.length >= k) break;
    const g = groups.get(t);
    got = got.concat(g.length <= k - got.length ? g : pick(g, k - got.length));
  }
  return got;
}
// Test order: Practice Exam 1, 3, 4, 5, 6, then the question number, then the item. A Practice Test flashcard is
// placed by the earliest of its sources (`from`: 'pe1-cp:4#2' is question 4, item 2; without an item number, its id
// letter orders it); a Practice Exam card by its own src. Cards with neither (QBank cards of other sections) keep their
// picked order after them (the sort is stable).
const MASTERY_EXAMS = ['pe1', 'pe3', 'pe4', 'pe5', 'pe6'];
function masteryTestKey(q) {
  let best = null;
  for (const ref of [...(Array.isArray(q.from) ? q.from : []), ...(Array.isArray(q.twinOf) ? q.twinOf : []), q.src]) {
    // A quiz-twin card (twinOf a Sample Test or QBank-pack question) sorts after the Practice Exam cards.
    const x = /^(?:sample-cp|aamc-phys-qpack):Q?(\d+)$/.exec(String(ref || ''));
    const m = x ? [null, null, x[1]] : /^(pe\d)-cp:(\d+)(?:#(\d+))?$/.exec(String(ref || ''));
    if (!m || (!x && !MASTERY_EXAMS.includes(m[1]))) continue;
    const k = [x ? MASTERY_EXAMS.length : MASTERY_EXAMS.indexOf(m[1]), Number(m[2]), m[3] ? Number(m[3]) : 0];
    if (!best || (k[0] - best[0] || k[1] - best[1] || k[2] - best[2]) < 0) best = k;
  }
  return best ? [...best, String(q.id || '')] : null;
}
function masteryTestOrder(list) {
  const keyed = list.map(q => [masteryTestKey(q), q]);
  keyed.sort(([a], [b]) => (a && b ? a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || (a[3] < b[3] ? -1 : a[3] > b[3] ? 1 : 0) : a ? -1 : b ? 1 : 0));
  return keyed.map(([, q]) => q);
}
// Weakest first: the order of a day's content categories. Categories with data on the latest test (masteryWeak, the
// list TODAY shows under "Weak content categories") that are weak (below MASTERY.weakBelow) come first, lowest % right
// first; then categories with no data on that test, in AAMC weight order; then the other tested categories, lowest %
// right first. Returns {code: rank}; codes not in the blueprint rank after all of them.
function masteryCatRank(plan) {
  const weights = (plan && masteryWeights(plan.subj, 'cats')) || [], tested = masteryWeak(plan && plan.latest);
  const seen = new Set(tested.map(w => w.code));
  const order = [...tested.filter(w => w.pct < MASTERY.weakBelow).map(w => w.code), ...weights.map(([c]) => c).filter(c => !seen.has(c)), ...tested.filter(w => w.pct >= MASTERY.weakBelow).map(w => w.code)];
  const rank = {};
  order.forEach(c => { if (!(c in rank)) rank[c] = Object.keys(rank).length; });
  return rank;
}
// The day's order (pure): by category, weakest first (rank from masteryCatRank); within a category the twins of
// missed questions (tierOf -1), then missed and due cards (0), then the rest; each group in test order.
function masteryDayOrder(list, catOf, rank, tierOf) {
  const big = Object.keys(rank).length, cr = q => { const c = catOf(q); return c in rank ? rank[c] : big; };
  const tb = q => { const t = tierOf ? tierOf(q) : 1; return t < 0 ? 0 : t === 0 ? 1 : 2; };
  return masteryGroupPassages(masteryTestOrder(list).map((q, i) => [cr(q), tb(q), i, q]).sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]).map(x => x[3]));
}
// Cards that share one twin passage (the same `pid`: one AAMC passage) run back to back, the way the test shows a
// passage's questions: each group moves up to where its first card stands, in the passage's question order.
function masteryGroupPassages(list) {
  const groups = new Map();
  for (const q of list) if (q && q.pid) (groups.get(q.pid) || groups.set(q.pid, []).get(q.pid)).push(q);
  if (!groups.size) return list;
  const qn = q => { const k = masteryTestKey({ twinOf: q.twinOf }); return k ? k[1] : 0; };
  const out = [], done = new Set();
  for (const q of list) {
    if (!q || !q.pid) { out.push(q); continue; }
    if (done.has(q.pid)) continue;
    done.add(q.pid);
    out.push(...groups.get(q.pid).map((x, i) => [qn(x), i, x]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]));
  }
  return out;
}
// A card is a front card when its own src is in the set (a Practice Exam card) or, for a Practice Test flashcard
// (data/cp-test-cards.js, its subj 'cp_test'), when its `from` names one (an item of it: 'pe1-cp:4#2' names pe1-cp:4).
function masteryIsFront(q, front) {
  if (!q || !front || !front.size) return false;
  if (q.src && front.has(q.src)) return true;
  return q.subj === 'cp_test' && [...(Array.isArray(q.from) ? q.from : []), ...(Array.isArray(q.twinOf) ? q.twinOf : [])].some(s => front.has(String(s).split('#')[0]));
}
// The picking order within a category (pure; the app passes its saved data): 0 missed cards (o.missed, a Set of
// ids: today's and the latest test's misses) and cards due for review (o.due(q): memory below the target
// retention); 1 + accuracy for cards whose sub-topic (o.acc(q): the card's s tag, for Practice Exam cards its
// source exam; saved % right as 0–1, null when never answered) is weak (below MASTERY.weakBelow), weakest first;
// 3 the rest.
// A front card (masteryIsFront: the twin of a question missed on the latest diagnostic or quiz, or a Practice Test
// flashcard built from that twin) comes before all of them (-1): it takes one of its own category's slots, so the day's counts don't change.
function masteryTierRank(o = {}) {
  const missed = o.missed || new Set(), due = o.due || (() => false), acc = o.acc || (() => null), front = o.front || new Set();
  const rank = q => {
    if (masteryIsFront(q, front)) return -1;
    if (missed.has(q.baseId || q.id) || missed.has(q.id) || due(q)) return 0;
    const a = acc(q);
    return Number.isFinite(a) && a < MASTERY.weakBelow / 100 ? 1 + a : 3;
  };
  // Missed cards (a missed question's twin, or a card missed today or on the latest test; not merely due ones): they
  // always get a slot first (masteryTopicSet), before the discipline mix fills the rest.
  rank.isMissed = q => masteryIsFront(q, front) || missed.has(q.baseId || q.id) || missed.has(q.id);
  return rank;
}
// Builds today's set for one step: for each category, the cards it still needs. Cards not seen today come first,
// from the category itself (when o.discW is given, in the discipline counts masteryDiscQuota chose for the whole
// step, so the day's total follows the AAMC discipline mix; within each discipline in the o.tierOf order: missed
// and due, weak sub-topics, the rest), then from the next categories in the step's order
// (by weight), then any other; cards seen today only when no other card is left, and repeats only when the pool
// itself runs out. pool may be [preferred, fallback]: the preferred pool's cards come first.
function masteryTopicSet(step, pool, catOf, pick, o = {}) {
  const seen = o.seen || new Set(), pk = o.tierOf ? (cards, k) => masteryTierPick(cards, k, o.tierOf, pick) : pick;
  const take = (cards, k) => (o.discOf && o.discW ? masteryDiscPick(cards, k, o.discOf, o.discW, pk) : pk(cards, k));
  const list = [], topicOf = {}, used = new Set();
  const pools = Array.isArray(pool[0]) ? pool : [pool], all = pools.flat(), order = step.topics.map(t => t.code);
  let quota = null;
  if (o.discOf && o.discW) {
    const rows = step.topics.filter(t => t.need - t.progress > 0).map(t => {
      const avail = {};
      new Set(all.filter(q => catOf(q) === t.code)).forEach(q => { const d = o.discOf(q); avail[d] = (avail[d] || 0) + 1; });
      return { code: t.code, k: t.need - t.progress, avail };
    });
    quota = masteryDiscQuota(rows, o.discW);
  }
  for (const t of step.topics) {
    const need = t.need - t.progress;
    if (need <= 0) continue;
    const i = order.indexOf(t.code), cats = [...order.slice(i), ...order.slice(0, i), null];   // null: any other
    let got = [];
    // Missed cards of this category first, however the discipline mix would split it (a missed biology card gets its
    // slot even where biology's 2% share would round to none); the mix fills the slots that are left.
    const isMissed = o.isMissed || (o.tierOf && o.tierOf.isMissed);
    if (isMissed) { const ms = all.filter(q => catOf(q) === t.code && !used.has(q.id) && isMissed(q)); got = pk(ms, Math.min(need, ms.length)); }
    // The category's own cards follow the day's quota (what is left of it); other categories' cards, the mix.
    const left = () => Object.fromEntries(Object.entries(quota[t.code]).map(([d, n]) => [d, n - got.filter(q => o.discOf(q) === d).length]));
    for (const fresh of [true, false]) for (const c of cats) for (const pl of pools) {
      if (got.length >= need) break;
      const cards = pl.filter(q => !used.has(q.id) && !got.includes(q) && seen.has(q.id) !== fresh && (c === null ? !order.includes(catOf(q)) : catOf(q) === c));
      got = got.concat(quota && c === t.code ? masteryQuotaPick(cards, need - got.length, left(), o.discOf, pk) : take(cards, need - got.length));
    }
    while (got.length < need && all.length) got.push(all[(list.length + got.length) % all.length]);
    got.forEach(q => { used.add(q.id); topicOf[q.id] = topicOf[q.id] || t.code; list.push(q); });
  }
  return { list, topicOf };
}
// sizes.guided: how many Practice Exam cards the section has (a small pool caps the day's count; none: no step).
// sizes.flashCats / guidedCats {code: n}: each category's pool (flashcards, Practice Exam cards), so a small one
// gives its shortfall to the next category (not given: no cap).
// A diagnostic result from an earlier version: saved without a version, or with another id than the section's
// current diagnostic.
function masteryOldDiag(t) {
  if (!t || t.kind !== 'diagnostic') return false;
  const cur = MASTERY.diagVersion[t.subj];
  return !t.version || (!!cur && t.version !== cur);
}
function masteryPlan(raw, today, sizes = {}) {
  const m = masteryNormalize(raw), goal = m.goal;
  const subj = masterySubject(m, today);
  const out = { goal, subj, order: MASTERY.order, passed: m.passed, steps: [], status: 'study' };
  if (!subj) { out.status = 'complete'; return out; }
  const tests = m.tests.filter(t => t.subj === subj);
  const diag = tests.find(t => t.kind === 'diagnostic');
  const latest = tests.at(-1) || null, previous = tests.length > 1 ? tests.at(-2) : null;
  Object.assign(out, { latest, previous, streak: masteryStreak(tests, goal), weak: masteryWeak(latest).filter(w => w.pct < MASTERY.weakBelow), tests });
  out.masteredToday = m.passed[subj] === today;
  if (!diag) { out.status = 'diagnostic'; out.steps.push({ id: 'diagnostic', done: false }); return out; }
  // The daily plan, in the student's order: the diagnostic (done, with a retake), then the 3 daily steps:
  // 1 flashcards (C/P: Practice Test flashcards), 2 guided Practice Exam cards with walkthroughs, 3 the 30-question quiz; after the quiz:
  // done for the day at goal, otherwise work on the quiz's misses and weak categories with flashcards and guided
  // cards. Study starts the day of the diagnostic.
  const row = m.days[today]?.subj === subj ? m.days[today] : {};
  const todayTest = tests.filter(t => t.kind === 'daily' && t.day === today).at(-1) || null;
  const lastDiag = tests.filter(t => t.kind === 'diagnostic').at(-1);
  // The day's split: every day of a section with a blueprint is 'exact' (100% by AAMC weight), today included. A
  // day row saved earlier with 5 sub-topics or split 'blueprint' plans the exact split too: its counted answers
  // (flashT, guidedT by category) carry over, and a category already past its new count is simply done.
  // Sections without a blueprint use 'topics' (5 sub-topics a day, fixed with the day's row).
  const cw = masteryWeights(subj), legacy = !cw && Array.isArray(row.topics) && row.topics.length > 0;
  const split = cw ? 'exact' : 'topics';
  const list = MASTERY.topics[subj] || [];
  // The day's weak categories (up to 2, weakest first), fixed with the day so they don't shift as tests come in;
  // a row saved earlier keeps its own. They are only marked; the counts stay at the AAMC weight.
  const weakT = split === 'topics' ? [] : (Array.isArray(row.weakT) ? row.weakT
    : masteryWeak(latest).filter(w => w.pct < MASTERY.weakBelow).map(w => w.code)).filter(c => list.includes(c)).slice(0, 2);
  const topics = split === 'exact' ? cw.map(([c]) => c) : legacy ? row.topics : masteryTopics(m, subj, today, latest);
  const flashN = m.perDay, guidedN = Number.isFinite(sizes.guided) ? Math.min(m.perDay, sizes.guided) : m.perDay;
  const got = (key, code) => Number((row[key] || {})[code]) || 0;
  const tally = (key, total, caps) => (split !== 'topics'
    ? masteryBlueprintSplit(total, cw, weakT, caps && typeof caps === 'object' ? caps : null).map(t => ({ ...t, progress: Math.min(t.need, got(key, t.code)), raw: got(key, t.code) }))
    : (need => topics.map((code, i) => ({ code, need: need[i], progress: Math.min(need[i], got(key, code)), raw: got(key, code) })))(masterySplit(total, topics.length)));
  const sum = (a, k = 'progress') => a.reduce((n, t) => n + t[k], 0);
  const flashT = tally('flashT', flashN, sizes.flashCats), guidedT = tally('guidedT', guidedN, sizes.guidedCats);
  const guidedCount = sum(guidedT, 'need'), lessons = Math.min(guidedCount, Number(row.lessonsN) || 0);
  Object.assign(out, { topics, perDay: m.perDay, split, weakT });
  out.steps.push({ id: 'diagnostic', done: true, result: lastDiag, old: masteryOldDiag(lastDiag) });
  // C/P: the rules warm-up comes first (the rules sheet and today's rule cards, data/cp-rules.js); the flashcards
  // wait for it. Progress is the rule cards marked "Got it" today.
  if (subj === 'cp') { const ok = new Set(Array.isArray(row.rulesOk) ? row.rulesOk : []).size; out.steps.push({ id: 'rules', count: MASTERY.rulesPerDay, progress: Math.min(ok, MASTERY.rulesPerDay), done: ok >= MASTERY.rulesPerDay }); }
  out.steps.push({ id: 'flashcards', topics: flashT, count: sum(flashT, 'need'), progress: sum(flashT), extra: sum(flashT, 'raw') - sum(flashT), done: flashT.every(t => t.progress >= t.need) });
  if (guidedN > 0) out.steps.push({ id: 'guided', topics: guidedT, count: guidedCount, progress: sum(guidedT), extra: sum(guidedT, 'raw') - sum(guidedT), lessons, lessonCount: guidedCount,
    done: guidedT.every(t => t.progress >= t.need) && lessons >= guidedCount });
  out.steps.push({ id: 'test', done: !!todayTest, result: todayTest, mix: split !== 'topics' ? masteryQuizTargets(subj) : null });
  if (todayTest) {
    const list = MASTERY.topics[subj] || [];
    const weakQuiz = masteryWeak(todayTest).filter(w => w.pct < MASTERY.weakBelow && list.includes(w.code)).map(w => w.code).slice(0, 3);
    const atGoal = todayTest.scaled >= goal;
    out.steps.push({ id: 'followup', atGoal, weak: weakQuiz, done: atGoal, practiced: Number(row.fix) || 0 });
  }
  return out;
}
// Applies a finished test to the store and returns it; moves to the next section after passDays in a row.
function masteryApplyTest(raw, test) {
  const m = masteryNormalize(raw);
  m.tests = [...m.tests, test].slice(-400);
  const tests = m.tests.filter(t => t.subj === test.subj);
  if (masteryStreak(tests, m.goal) >= MASTERY.passDays && !m.passed[test.subj]) {
    m.passed = { ...m.passed, [test.subj]: test.day };
    if (m.current === test.subj) m.current = null;
  }
  const row = m.days[test.day]?.subj === test.subj ? m.days[test.day] : { subj: test.subj };
  m.days = { ...m.days, [test.day]: { ...row, misses: [...new Set([...(row.misses || []), ...(test.missIds || [])])] } };
  return m;
}

// ── Browser side: storage, sessions, tests ──
function masteryPlanNow(m = masteryLoad(), day = localDay()) {
  const subj = masterySubject(m, day);
  const sizes = { guided: subj ? masteryPracticeCount(subj) : 0 };
  // Each category's pool, so a small one gives its shortfall to the next (the on-demand banks: once loaded).
  if (subj && MASTERY.blueprint[subj]) Object.assign(sizes, { flashCats: masteryFlashReady(subj) ? masteryCatCounts(masteryFlashPool(subj), masteryCategory) : null,
    guidedCats: bankReady('fl') ? masteryCatCounts(masteryPracticePool(subj), q => q.aamc) : null });
  return masteryPlan(m, day, sizes);
}
const masteryCatCounts = (list, catOf) => list.reduce((o, q) => { const c = catOf(q); o[c] = (o[c] || 0) + 1; return o; }, {});
const masterySection = s => MCAT_SECTIONS.find(x => x.id === s);
const masteryName = s => { const x = masterySection(s); return x ? x.abbrev + ' · ' + x.label : String(s || ''); };
// The section's disciplines, most heavily tested first (AAMC: C/P is 30% general chemistry, 25% physics, …).
const masteryDiscs = s => Object.entries(masterySection(s)?.weights || {}).filter(([d]) => d !== 'cars').sort((a, b) => b[1] - a[1]);
// Flashcards for the section. C/P: only the Practice Test flashcards (data/cp-test-cards.js, BANKS.cpt in app.js),
// in a C/P content category; no QBank card and no other deck fills a gap (a short category is reported by
// tools/test-cp-test-cards.cjs). Other sections: the AAMC QBank cards.
const MASTERY_PE = /^pe\d-cp:/;
// A daily-quiz question that twins a Sample Test or QBank-pack question: its flashcard (cpt-st-*, twinOf) leads the
// flashcard step after a miss; the guided step has no card for it.
const MASTERY_QUIZ_TWIN = /^(sample-cp|aamc-phys-qpack):/;   // the Practice Exam C/P cards (Practice Exams 1, 3, 4, 5, 6; no Sample Test)
function masteryFlashPool(s) {
  if (s !== 'cp') return masteryExamPool(s);
  if (!bankReady('cpt')) return [];
  const cats = new Set(MASTERY.topics.cp);
  return CPTQ.filter(q => cats.has(masteryCategory(q)));
}
const masteryFlashReady = s => s !== 'cp' || bankReady('cpt');
// Practice Exam cards: the C/P cards of Practice Exams 1, 3, 4, 5 and 6 (the Sample Test cards stay out of TODAY).
// Loaded on demand (BANKS.fl in app.js): until then the plan uses the known count.
const masteryPracticePool = s => (s === 'cp' && bankReady('fl') ? FLQ.filter(q => MASTERY_PE.test(q.src)) : []);
const masteryPracticeCount = s => (s !== 'cp' ? 0 : bankReady('fl') ? masteryPracticePool(s).length : BANK_COUNTS.flCp);
function masteryLoad() { return masteryNormalize(store.get(KEYS.subjectPath, {})); }
// Keeps 60 days; the card-id lists (seen, guidedIds, lessonIds; pracUsed from the removed passage step) matter
// only on their own day, so earlier days drop them (they would otherwise make up most of the synced copy).
const MASTERY_DAY_LISTS = ['seen', 'guidedIds', 'lessonIds', 'pracUsed'];
function masterySave(m) {
  const keepFrom = localDay(new Date(Date.now() - 86400000));   // yesterday too: a session can run past midnight
  const days = Object.fromEntries(Object.entries(m.days).sort().slice(-60).map(([d, r]) => [d, d >= keepFrom || !r || typeof r !== 'object' ? r : Object.fromEntries(Object.entries(r).filter(([k]) => !MASTERY_DAY_LISTS.includes(k)))]));
  store.set(KEYS.subjectPath, { ...m, days });
}
// day: the day a session started (answers after midnight still count toward the day the session began).
function masteryDayRow(m, subj, day = localDay()) {
  if (m.days[day]?.subj !== subj) m.days[day] = { subj, misses: [], reviewed: [] };
  // Fix today's plan the first time the day is touched, so it doesn't shift as tests come in: with the blueprint,
  // the split marker ('exact') and the day's weak categories (marked only). A row saved earlier (5 sub-topics, or
  // split 'blueprint') is rewritten to 'exact' here, keeping its counted answers and its weak categories.
  const row = m.days[day];
  if (row.split !== 'exact' && (MASTERY.blueprint[subj] || !Array.isArray(row.topics) || !row.topics.length)) {
    const p = masteryPlanNow(m, day);
    row.topics = p.topics || [];
    if (p.split === 'exact') Object.assign(row, { split: 'exact', weakT: p.weakT || [] });
  }
  return row;
}
function masteryCategory(q) { return (q && q.aamc) || 'other'; }
// Called for every answered recall card: counts guided cards and remembers today's misses.
function masteryNoteAnswer(q, right) {
  const day = quiz.masteryDay || localDay(), m = masteryLoad(), subj = masterySubject(m, day);
  if (!subj) return;
  const id = q.baseId || q.id, row = masteryDayRow(m, subj, day);
  // A rule card of the warm-up: its first answer today marks it done for the day and is remembered (right or not:
  // a missed rule card comes back first next time).
  if (quiz.mastery === 'rules') {
    if (quiz.masteryCounted && quiz.masteryCounted.has(id)) return;
    if (quiz.masteryCounted) quiz.masteryCounted.add(id);
    m.rules = m.rules && typeof m.rules === 'object' ? m.rules : {};
    m.rules[id] = { d: day, ok: !!right };
    row.rulesOk = [...new Set([...(row.rulesOk || []), id])];
    masterySave(m); return;
  }
  let changed = false;
  // Only the first answer to a card in a session counts: re-asked misses and "unsure" cards are practice, not
  // new cards toward the 50.
  const first = !quiz.masteryCounted || !quiz.masteryCounted.has(id);
  if (quiz.masteryCounted) quiz.masteryCounted.add(id);
  // Each card in a flashcard or Practice Exam session was picked for one of today's sub-topics.
  const topic = quiz.topicOf && quiz.topicOf[q.id];
  if (first && quiz.mastery === 'followup') { row.fixQ = (Number(row.fixQ) || 0) + 1; changed = true; }
  if (first && quiz.mastery === 'guided') { row.guidedIds = [...new Set([...(row.guidedIds || []), id])].slice(-200); changed = true; }
  if (first && topic && (quiz.mastery === 'flashcards' || quiz.mastery === 'guided')) {
    const key = quiz.mastery === 'flashcards' ? 'flashT' : 'guidedT';
    row[key] = { ...(row[key] || {}), [topic]: (Number((row[key] || {})[topic]) || 0) + 1 };
    row.seen = [...new Set([...(row.seen || []), q.id])].slice(-200); changed = true;
  }
  const plan = masteryPlanNow(m), missStep = plan.steps.find(s => s.id === 'misses');
  if (missStep && missStep.ids.includes(id) && !(row.reviewed || []).includes(id)) { row.reviewed = [...(row.reviewed || []), id]; changed = true; }
  if (!right && ['guided', 'flashcards', 'misses', 'followup', 'lessons'].includes(quiz.mastery)) { row.misses = [...new Set([...(row.misses || []), id])]; changed = true; }
  if (changed) masterySave(m);
}
// After the quiz: review its misses and weak categories with flashcards (kind 'flashcards') or guided Practice Exam
// cards (kind 'guided'); never practice passages. Within each weak category the quiz's missed cards, today's
// misses and due cards come first (masteryTierOf).
function startMasteryFollowup(kind) {
  const guided = kind !== 'flashcards';
  if (guided && !bankReady('fl')) { withBank('fl', () => startMasteryFollowup(kind)); return; }
  if (!guided && !masteryFlashReady(masteryPlanNow().subj)) { withBank('cpt', () => startMasteryFollowup(kind)); return; }
  const plan = masteryPlanNow(), f = plan.steps.find(s => s.id === 'followup');
  if (!f) return;
  const cats = f.weak.length ? f.weak : plan.topics.slice(0, 3);
  const pool = guided ? masteryPracticePool(plan.subj) : masteryFlashPool(plan.subj);
  if (!pool.length) { masteryNotice(guided ? 'No Practice Exam cards for this section yet.' : 'No flashcards for this section yet.'); return; }
  const m = masteryLoad(); masteryDayRow(m, plan.subj).fix = (Number(masteryDayRow(m, plan.subj).fix) || 0) + 1; masterySave(m);
  // Its own mode: these answers count as follow-up practice, never toward the day's steps or lessons.
  const step = { topics: cats.map(code => ({ code, need: 5, progress: 0 })), count: cats.length * 5 };
  masteryBegin(plan, step, pool, guided ? q => q.aamc : masteryCategory, (guided ? 'Practice Exam cards' : 'flashcards') + ' · weak spots from the quiz', 'followup', true);
}
// Called when a step-by-step lesson is played to its last step during today's Practice Exam cards.
// Each card's lesson counts once a day, however often it is replayed or the card is re-asked.
function masteryNoteLesson(q) {
  const day = quiz.masteryDay || localDay(), m = masteryLoad(), subj = masterySubject(m, day);
  if (!subj || (quiz.mastery !== 'guided' && quiz.mastery !== 'lessons')) return;
  const row = masteryDayRow(m, subj, day), id = q.baseId || q.id;
  if ((row.lessonIds || []).includes(id)) return;
  row.lessonIds = [...(row.lessonIds || []), id].slice(-200);
  row.lessonsN = (Number(row.lessonsN) || 0) + 1;
  masterySave(m);
}
// A short message at the top of the page when a TODAY button has nothing to start.
function masteryNotice(msg) {
  const el = typeof document !== 'undefined' && document.getElementById && document.getElementById('page-notice');
  if (el) { el.textContent = msg; el.hidden = false; if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0); }
}
// more: another full set from today's sub-topics after the day's set is done, cards not seen today first.
function masteryBegin(plan, step, pool, catOf, label, mode, more) {
  if (!plan.subj || !step) { masteryNotice('This step is not available right now.'); return; }
  if (step.done && !more) { masteryNotice('This step is done for today. Choose “Another set” for more.'); return; }
  const m = masteryLoad(), row = masteryDayRow(m, plan.subj); masterySave(m);
  if (more) {
    const seen = new Set(row.seen || []), nested = Array.isArray(pool[0]);
    const fresh = nested ? pool.map(pl => pl.filter(q => !seen.has(q.id))) : pool.filter(q => !seen.has(q.id));
    step = { ...step, topics: step.topics.map(t => ({ ...t, progress: 0 })) };
    if ((nested ? fresh.flat() : fresh).length >= step.count) pool = fresh;
    label += ' · another set';
  }
  // Cards not seen today first; the AAMC discipline mix over the day's whole set (blueprint days) and, within each
  // discipline, missed and due cards, then the weakest sub-topics, then the rest (counts never change).
  const discW = plan.split !== 'topics' ? masteryWeights(plan.subj, 'discs') : null;
  const { list: picked, topicOf } = masteryTopicSet(step, pool, catOf, pickQuestions, { seen: new Set(row.seen || []), discOf: disciplineOfRecall, discW, tierOf: masteryTierOf(m, plan, row) });
  // Then the day runs weakest category first (masteryCatRank: % right on the latest test); within each category the
  // missed questions' twin cards (the Practice Exam twin in the guided step, the Practice Test flashcards built from
  // it in the flashcard step), then missed and due cards, then test order. The picking above decides which cards,
  // never their order.
  const list = masteryDayOrder(picked, catOf, masteryCatRank(plan), masteryTierOf(m, plan, row));
  if (!list.length) { masteryNotice('Nothing left to practice in this step today. Choose “Another set” for more.'); return; }
  masteryStartQuiz(list, masterySection(plan.subj).abbrev + ' · ' + label, mode);
  quiz.topicOf = topicOf;
}
// The picking order within a category from the saved data (masteryTierRank): missed cards (today's, the latest
// test's and the misses saved on its day) and cards due for review (memory below TARGET_RETENTION), then cards
// from the weakest sub-topics by saved accuracy (KEYS.stats by the card's key: its s tag, or for a Practice Exam
// card its source exam), then the rest.
function masteryTierOf(m, plan, row) {
  const latest = plan.latest, lrow = latest && m.days[latest.day] && m.days[latest.day].subj === plan.subj ? m.days[latest.day] : {};
  const missed = new Set([...(row.misses || []), ...((latest && latest.missIds) || []), ...(lrow.misses || [])].filter(x => typeof x === 'string'));
  const mem = typeof loadMem === 'function' ? loadMem() : {}, now = Date.now(), stats = store.get(KEYS.stats, {});
  const due = q => { const R = retrievability(mem[q.baseId || q.id] || mem[q.id], now); return R != null && R < TARGET_RETENTION; };
  const acc = q => { const r = stats[q.key || q.s]; return r && Number.isFinite(r.c) && Number.isFinite(r.t) && r.t > 0 ? r.c / r.t : null; };
  return masteryTierRank({ missed, due, acc, front: masteryTwinFront(plan) });
}
// The twin cards (by src) of the questions missed on the latest diagnostic or quiz: Practice Exam 1/3/4/5/6 twins, and
// Sample Test / QBank-pack twins of the daily quiz (their cpt-st flashcards; no guided card). The Practice Exam card
// leads the guided step; the Practice Test flashcards whose `from` names it lead the flashcard step.
function masteryTwinFront(plan) {
  const latest = plan && plan.latest;
  return new Set(((latest && latest.twinMisses) || []).filter(x => typeof x === 'string' && (MASTERY_PE.test(x) || MASTERY_QUIZ_TWIN.test(x))));
}
function masteryStartQuiz(list, label, mode) {
  beginQuiz(list, label, { mastery: mode });
  quiz.masteryDay = localDay(); quiz.masteryCounted = new Set();
}
// Practice Exam cards for today's sub-topics; each opens its step-by-step lesson. When every card is done but
// some lessons are not, the step continues with today's cards whose lesson wasn't finished.
function startMasteryGuided(more) {
  if (!bankReady('fl')) { withBank('fl', () => startMasteryGuided(more)); return; }
  const plan = masteryPlanNow();
  const pool = masteryPracticePool(plan.subj);
  if (!pool.length) { startMasteryFlashcards(more); return; }
  const step = plan.steps.find(s => s.id === 'guided');
  if (!more && step && !step.done && step.topics.every(t => t.progress >= t.need) && step.lessons < step.lessonCount) {
    const m = masteryLoad(), row = masteryDayRow(m, plan.subj), done = new Set(row.lessonIds || []);
    const byId = new Map(pool.map(q => [q.id, q])), need = step.lessonCount - step.lessons;
    let list = (row.guidedIds || []).filter(id => !done.has(id)).map(id => byId.get(id)).filter(Boolean);
    // Older saved days have no card list: any card from today's topics whose lesson isn't done.
    if (list.length < need) { const topics = new Set(step.topics.map(t => t.code)), have = new Set(list.map(q => q.id)); list = list.concat(pickQuestions(pool.filter(q => topics.has(q.aamc) && !done.has(q.id) && !have.has(q.id)), need - list.length)); }
    list = list.slice(0, need);
    if (!list.length) { masteryNotice('Every card today already has its lesson. Choose “Another set” for more.'); return; }
    masteryStartQuiz(list, masterySection(plan.subj).abbrev + ' · Practice Exam cards · finish the lessons', 'lessons');
    return;
  }
  masteryBegin(plan, step, pool, q => q.aamc, 'Practice Exam cards', 'guided', more);
}
// Regular flashcards for today's sub-topics.
function startMasteryFlashcards(more) {
  if (!masteryFlashReady(masteryPlanNow().subj)) { withBank('cpt', () => startMasteryFlashcards(more)); return; }
  const plan = masteryPlanNow();
  // The rules warm-up comes first (C/P): the day's flashcards wait until it is done.
  if (!more && !masteryRulesDone(plan)) { masteryNotice('Do today’s rules warm-up first: the rules sheet and ' + MASTERY.rulesPerDay + ' rule cards.'); return; }
  // C/P: Practice Test flashcards only (other sections: QBank cards), in today's content categories.
  masteryBegin(plan, plan.steps.find(s => s.id === 'flashcards'), masteryFlashPool(plan.subj), masteryCategory, 'flashcards', 'flashcards', more);
}
// ── Rules warm-up (C/P): the rules sheet, then today's rule cards ──
// Each rule card (data/cp-rules.js) is a short multiple-choice problem that applies one rule; its three wrong
// choices are the traps that rule kills, and the rule is the explanation after answering. Today's cards: the ones
// missed last time first, then cards never seen, then the longest unseen (saved per card in m.rules {id: {d, ok}}).
// The step is done when today's cards are all answered; the flashcards wait for it.
// TODAY loads the rules sheet as soon as the warm-up step is shown, so it can be read before starting.
let masteryRulesLoading = false;
function masteryRulesLoad() {
  if (masteryRulesLoading || typeof ensureBank !== 'function' || typeof bankReady !== 'function' || bankReady('cpt')) return;
  masteryRulesLoading = true;
  ensureBank('cpt').then(() => { if (typeof renderDailyPlan === 'function') renderDailyPlan(); }).catch(() => {}).finally(() => { masteryRulesLoading = false; });
}
function masteryRulesDone(plan) { const st = plan && plan.steps.find(s => s.id === 'rules'); return !st || st.done; }
function masteryRulesPick(m, n) {
  const seen = (m.rules && typeof m.rules === 'object') ? m.rules : {};
  const rank = c => { const r = seen[c.id]; return !r ? [1, ''] : r.ok === false ? [0, r.d || ''] : [2, r.d || '']; };
  return (typeof CP_RULES !== 'undefined' ? CP_RULES.cards : []).map((c, i) => [rank(c), i, c]).sort((a, b) => a[0][0] - b[0][0] || (a[0][1] < b[0][1] ? -1 : a[0][1] > b[0][1] ? 1 : 0) || a[1] - b[1]).slice(0, n).map(x => x[2].id);
}
// A rule card as a quiz question (built once per card; the rule is its explanation).
const RULEQ_BY_ID = new Map();
function masteryRuleQ(id) {
  if (RULEQ_BY_ID.has(id)) return RULEQ_BY_ID.get(id);
  const c = typeof CP_RULES !== 'undefined' && CP_RULES.cards.find(x => x.id === id);
  if (!c) return null;
  const sec = CP_RULES.sheet.find(x => x.id === c.sheet), q = { id: c.id, subj: 'cp_test', key: 'cp_test|Rules warm-up', s: 'Rules warm-up · ' + (sec ? sec.title : ''), q: c.q, choices: c.choices, ans: c.ans, exp: '**Rule:** ' + c.rule };
  RULEQ_BY_ID.set(id, q); return q;
}
function startMasteryRules() {
  if (!bankReady('cpt')) { withBank('cpt', () => startMasteryRules()); return; }
  const plan = masteryPlanNow(); if (!plan.subj) return;
  const m = masteryLoad(), row = masteryDayRow(m, plan.subj);
  if (!Array.isArray(row.rulesIds) || !row.rulesIds.length) { row.rulesIds = masteryRulesPick(m, MASTERY.rulesPerDay); masterySave(m); }
  const done = new Set(row.rulesOk || []), list = row.rulesIds.filter(id => !done.has(id)).map(masteryRuleQ).filter(Boolean);
  if (!list.length) { masteryNotice('Today’s rule cards are done.'); return; }
  masteryStartQuiz(list, 'C/P · Rules warm-up', 'rules');
}
// The rules sheet: the six glance rules (no math, no writing), one example each; the earlier checks, shortcut moves
// and the C/P rules by topic folded under "More".
function masteryRulesSheetHtml() {
  const sections = typeof CP_RULES !== 'undefined' ? CP_RULES.sheet : [];
  return (typeof glanceRulesHtml === 'function' ? glanceRulesHtml() : '') +
    '<details class="rules-more"><summary>More</summary>' + (typeof elimChecksHtml === 'function' ? elimChecksHtml() : '') + (typeof fastKindsHtml === 'function' ? fastKindsHtml() : '') +
    sections.map(sec => '<div class="rules-sec"><b>' + esc(sec.title) + '</b><ul>' + sec.items.map(it => '<li>' + fmt(it) + '</li>').join('') + '</ul></div>').join('') + '</details>';
}
// The daily quiz unlocks once today's flashcards are done; the guided cards are recommended but not required.
function masteryQuizUnlocked(plan) {
  return plan.status === 'study' && plan.steps.filter(s => s.id === 'flashcards').every(s => s.done);
}
// Diagnostic / end-of-day test: 2 passages from the section's main disciplines (unattempted first) + discrete
// questions spread over its disciplines in the exam's proportions, from the
// question bank (not the guided cards, so the score is not a memory of today's cards), timed, feedback at the end.
function startMasteryTest(kind) {
  if (!bankReady('cp')) { withBank('cp', () => startMasteryTest(kind)); return; }
  // The review links each question to the Practice Exam card it twins, so that bank loads first.
  if (!bankReady('fl')) { withBank('fl', () => startMasteryTest(kind)); return; }
  const plan = masteryPlanNow();
  if (!plan.subj) return;
  // The daily quiz unlocks once today's flashcards are done (guided cards optional).
  if (kind !== 'diagnostic' && !masteryQuizUnlocked(plan)) { masteryNotice('The quiz unlocks once today’s flashcards are done.'); return; }
  const subj = plan.subj;
  // C/P: the Chem/Phys Diagnostic (data/cp-diagnostic.js) and the daily half-section pool (data/cp-pool.js):
  // original passages written to the AAMC C/P blueprint, in the exam's order of passages and stand-alones.
  const set = subj === 'cp' ? (kind === 'diagnostic' ? (typeof CP_DIAG !== 'undefined' ? CP_DIAG : null) : masteryNextSet(masteryLoad())) : null;
  if (set) { masteryRunSet(subj, kind, set); return; }
  // Other sections, for now: the Practice Exam cards: questions modeled one-for-one on the AAMC practice exams,
  // with their structures, answer-choice drawings and graphs, split over the section's disciplines by AAMC's
  // weights, cards not yet seen first. (Sections without such cards fall back to the question bank.)
  const full = kind === 'diagnostic', size = full ? MASTERY.diagSize : MASTERY.testSize, discs = masteryDiscs(subj);
  const pool = masteryPracticePool(subj), passages = [];
  const discOf = q => (q.disc === 'biology' ? 'biology' : q.disc);
  const picked = [], share = masteryApportion(discs, size);
  if (pool.length) {
    discs.forEach(([d], i) => picked.push(...pickQuestions(pool.filter(q => discOf(q) === d), share[i])));
    if (picked.length < size) picked.push(...pickQuestions(pool.filter(q => !picked.includes(q)), size - picked.length));
  } else {
    const exam = masteryExamPool(subj);
    discs.forEach(([d], i) => picked.push(...pickQuestions(exam.filter(q => disciplineOfRecall(q) === d), share[i])));
  }
  picked.splice(size);
  const items = shuffled(picked).map(q => ({ view: makeView(q), passage: null }));  if (!items.length) return;
  const firstExposures = Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)]));
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures, completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily', day: localDay() },
    p: { id: 'mastery_' + subj, title: masteryName(subj) + (kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: items.length * MASTERY.secondsPerItem * 1000, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
// The next daily quiz: a half-section not taken yet, else the one taken longest ago.
function masteryNextSet(m) {
  const pool = typeof CP_POOL !== 'undefined' ? CP_POOL : [];
  if (!pool.length) return null;
  const last = {}; (m.usedSets || []).forEach(u => { last[u.id] = u.day; });
  return pool.slice().sort((a, b) => (last[a.id] || '').localeCompare(last[b.id] || '') || pool.indexOf(a) - pool.indexOf(b))[0];
}
// Lays out a passage set in its exam order: a passage id brings all its questions, a number brings that many
// stand-alones.
function masterySetItems(set) {
  const byId = new Map(set.passages.map(p => [p.id, p])), items = [];
  let sa = 0;
  for (const step of set.order) {
    if (typeof step === 'number') { set.standalones.slice(sa, sa += step).forEach(q => items.push({ view: makeView(q), passage: null })); continue; }
    const p = byId.get(step); if (p) p.questions.forEach(q => items.push({ view: makeView(q), passage: p }));
  }
  return items;
}
function masteryRunSet(subj, kind, set) {
  const items = masterySetItems(set);
  if (!items.length) return;
  const passages = set.passages;
  stopQuizTimer(); stopPassageTimer();
  Object.assign(pq, { mini: { subj, items, passages, firstExposures: Object.fromEntries(passages.map(p => [p.id, beginPassageExposure(p)])), completed: false, mastery: kind === 'diagnostic' ? 'diagnostic' : 'daily', setId: set.id, day: localDay() },
    p: { id: 'mastery_' + subj, title: set.title },
    idx: 0, views: items.map(x => x.view), results: [], answered: false, completed: false, startedAt: Date.now(), qStart: Date.now(),
    targetMs: (set.timeMin ? set.timeMin * 60 : items.length * MASTERY.secondsPerItem) * 1000, errPending: null });
  show('screen-passage');
  renderPassageQuestion();
  pq.timer = setInterval(updatePassageTimer, 1000);
  updatePassageTimer();
}
// Exam-style discrete questions in the section: the AAMC-style question bank, by discipline and content category.
// Kept per section until the bank changes size (TODAY counts each category's cards on every plan).
const masteryExamPools = new Map();
function masteryExamPool(s) {
  const hit = masteryExamPools.get(s);
  if (hit && hit.n === AQB_QBANK.length) return hit.list;
  const discs = new Set(masteryDiscs(s).map(([d]) => d)), cats = new Set(MASTERY.topics[s] || []);
  const list = AQB_QBANK.filter(q => discs.has(disciplineOfRecall(q)) && cats.has(masteryCategory(q)));
  masteryExamPools.set(s, { n: AQB_QBANK.length, list });
  return list;
}
// Called by finishSubjectMini for a mastery test: scores it, records weak topics, decides on moving on.
function masteryFinishTest(mini, results) {
  const correct = results.filter(r => r.right).length, total = results.length;
  const cats = {};
  const parts = { passage: { c: 0, t: 0 }, single: { c: 0, t: 0 } }, skills = {};
  const tally = (o, k, right) => { o[k] = o[k] || { c: 0, t: 0 }; o[k].t++; if (right) o[k].c++; };
  // Every question counts toward its content category (its own cat, else its passage's), so the weak topics
  // come from the whole test (passages are most of it), not just the single questions.
  results.forEach((r, i) => {
    const p = mini.items[i].passage;
    tally(cats, r.view.q.cat || (p ? ((p.cats && p.cats[0]) || 'other') : masteryCategory(r.view.q)), r.right);
    tally(parts, p ? 'passage' : 'single', r.right);
    if (r.view.q.skill) tally(skills, r.view.q.skill, r.right);
  });
  // Tomorrow's "misses" step reviews missed bank questions; test-only questions are reviewed on the results page.
  const missIds = results.filter((r, i) => !r.right && !mini.items[i].passage).map(r => r.view.q.baseId || r.view.q.id).filter(id => id && typeof lookupQ === 'function' && lookupQ(id));
  // The studied card each missed question twins: tomorrow it leads the guided step (Practice Exam card) or the
  // flashcards (QBank card).
  const twinMisses = [...new Set(results.filter(r => !r.right && typeof r.view.q.twin === 'string').map(r => r.view.q.twin))];
  const pctRight = total ? 100 * correct / total : 0;
  // The day the test started: a quiz finished after midnight belongs to the day it was taken.
  const test = { subj: mini.subj, day: mini.day || localDay(), t: Date.now(), kind: mini.mastery, correct, total, pct: Math.round(pctRight), scaled: rawToScaled(pctRight), cats, parts, skills, missIds, twinMisses, version: mini.setId || 'cards' };
  const before = masteryLoad();
  const prevTest = before.tests.filter(t => t.subj === test.subj).at(-1) || null;
  const after = masteryApplyTest(before, test);
  if (mini.setId && mini.mastery === 'daily') after.usedSets = [...(after.usedSets || []), { id: mini.setId, day: test.day }].slice(-60);
  masterySave(after);
  return masteryResultHtml(test, prevTest, after);
}
const AAMC_CAT_LABEL = code => (typeof AAMC_CATEGORIES !== 'undefined' && (AAMC_CATEGORIES.find(c => c[0] === code) || [])[1]) || (code === 'other' ? 'Other topics' : code);
function masteryResultHtml(test, prev, m) {
  const goal = m.goal, weak = masteryWeak(test);
  const change = prev ? test.scaled - prev.scaled : null;
  const trend = change == null ? '' : change > 0 ? '<b class="mastery-up">▲ Improved by ' + change + '</b> from ' + prev.scaled : change < 0 ? '<b class="mastery-down">▼ Down ' + (-change) + '</b> from ' + prev.scaled : 'Same as last time (' + prev.scaled + ')';
  const passedNow = m.passed[test.subj] === test.day;
  const nextSubj = MASTERY.order.find(s => !m.passed[s]);
  const verdict = passedNow ? '<p class="today-alldone">✓ ' + esc(masteryName(test.subj)) + ' mastered: ' + goal + '+ on ' + MASTERY.passDays + ' days in a row. ' + (nextSubj ? 'Tomorrow starts ' + esc(masteryName(nextSubj)) + ' with its diagnostic.' : 'Every section in the path is mastered.') + '</p>'
    : test.kind === 'diagnostic' && prev ? '<p>Diagnostic retaken. Your daily plan now aims at the weak topics below.</p>'
    : test.kind === 'diagnostic' ? '<p>Your daily plan now follows the AAMC mix and, within each content category, aims at the weak topics below first: flashcards and Practice Exam cards, then the quiz.</p>'
    : test.scaled >= goal ? '<p>At goal today. One more day at ' + goal + '+ moves you to the next section.</p>' : '<p>Next: review the missed questions below, then practice the weakest topics from TODAY. Tomorrow: 50 flashcards and 50 Practice Exam cards in the AAMC mix, your missed and weakest cards first within each category, then another quiz.</p>';
  const rows = weak.map(w => '<tr' + (w.pct < MASTERY.weakBelow ? ' class="mastery-weak"' : '') + '><td>' + esc(w.code) + '</td><td>' + esc(AAMC_CAT_LABEL(w.code)) + '</td><td>' + w.c + '/' + w.t + '</td><td>' + w.pct + '%</td></tr>').join('');
  const part = test.parts || (test.cats.passage ? { passage: test.cats.passage } : {});
  const SKILL = { 'SIRS 1': 'Knowledge of scientific concepts', 'SIRS 2': 'Scientific reasoning and problem-solving', 'SIRS 3': 'Reasoning about research design', 'SIRS 4': 'Data-based and statistical reasoning' };
  const skillRows = Object.entries(test.skills || {}).sort().map(([k, v]) => '<tr><td>' + esc(k.replace('SIRS ', 'Skill ')) + '</td><td>' + esc(SKILL[k] || k) + '</td><td>' + v.c + '/' + v.t + '</td><td>' + Math.round(100 * v.c / v.t) + '%</td></tr>').join('');
  const pass = (part.passage ? '<p class="muted-note">Passage questions: ' + part.passage.c + '/' + part.passage.t + (part.single ? ' · single questions: ' + part.single.c + '/' + part.single.t : '') + '.</p>' : '') +
    (skillRows ? '<div class="section-label">Scientific skills (data-based passages)</div><table class="data-table mastery-topics"><thead><tr><th>Skill</th><th></th><th>Right</th><th>%</th></tr></thead><tbody>' + skillRows + '</tbody></table>' : '');
  return '<div class="results-hero"><div class="r-label">' + esc(masteryName(test.subj)) + (test.kind === 'diagnostic' ? ' diagnostic' : ' end-of-day test') + '</div><div class="score-pct">' + test.scaled + '</div><div class="score-sub">' + test.correct + '/' + test.total + ' correct (' + test.pct + '%) · goal ' + goal + (trend ? ' · ' + trend : '') + '</div></div>' +
    '<div class="results-card">' + verdict + '<div class="section-label">Topics, weakest first</div><table class="data-table mastery-topics"><thead><tr><th>AAMC</th><th>Topic</th><th>Right</th><th>%</th></tr></thead><tbody>' + rows + '</tbody></table>' + pass +
    '<p class="muted-note">Scaled from % correct with the app’s raw-to-scaled table: an estimate for tracking progress, not an AAMC score.</p><div class="btn-row"><button class="new-quiz-btn" data-click="goHome()">Back to TODAY</button></div></div>';
}
function setMasteryGoal(v) { const m = masteryLoad(); if (MASTERY.goals.includes(Number(v))) { m.goal = Number(v); masterySave(m); } renderHome(); }
function setMasteryPerDay(v) { const m = masteryLoad(); if (MASTERY.perDay.includes(Number(v))) { m.perDay = Number(v); masterySave(m); } renderHome(); }
function setMasterySubject(v) { const m = masteryLoad(); m.current = MASTERY.order.includes(v) ? v : null; masterySave(m); renderHome(); }

// ── TODAY card ──
function masteryCard() {
  let plan = masteryPlanNow();
  // Fix today's sub-topics as soon as the day's plan is shown.
  if (plan.status === 'study') { const m = masteryLoad(), d = localDay(), before = JSON.stringify(m.days[d] || null); masteryDayRow(m, plan.subj); if (JSON.stringify(m.days[d]) !== before) { masterySave(m); plan = masteryPlanNow(m); } }
  const name = s => esc(masteryName(s));
  const path = plan.order.map(s => '<span class="mastery-chip' + (plan.passed[s] ? ' done' : s === plan.subj ? ' on' : '') + '">' + (plan.passed[s] ? '✓ ' : '') + name(s) + '</span>').join('<span class="mastery-arrow" aria-hidden="true">→</span>');
  const head = '<div class="today-head"><div><div class="section-label">TODAY › Section mastery</div><div class="today-date">' + (plan.subj ? '<b>' + name(plan.subj) + '</b> · goal ' + plan.goal + ' on ' + MASTERY.passDays + ' days in a row' : 'All sections mastered') + '</div></div></div>' +
    '<div class="mastery-path">' + path + '</div>';
  if (plan.status === 'complete') return head + '<p class="today-alldone">✓ Every section in the path is at goal. Keep your scores up with due reviews and full-length practice.</p>';
  // Results from an earlier diagnostic (no version, or an earlier id): labeled as the earlier version.
  const oldDiag = masteryOldDiag;
  const latest = plan.latest ? '<p class="mastery-latest">Last test: <b>' + plan.latest.scaled + '</b> (' + plan.latest.correct + '/' + plan.latest.total + ')' + (oldDiag(plan.latest) ? ' · <b>earlier version</b> of the diagnostic: retake the new one below for a fresh start' : '') + (plan.previous ? ' · ' + (plan.latest.scaled > plan.previous.scaled ? '<b class="mastery-up">▲ up ' + (plan.latest.scaled - plan.previous.scaled) + '</b>' : plan.latest.scaled < plan.previous.scaled ? '<b class="mastery-down">▼ down ' + (plan.previous.scaled - plan.latest.scaled) + '</b>' : 'no change') : '') + ' · days at goal in a row: ' + plan.streak + '/' + MASTERY.passDays + '</p>' : '';
  const weak = plan.weak.length ? '<p class="muted-note">Weak content categories: ' + plan.weak.slice(0, 4).map(w => esc(w.code) + ' ' + esc(AAMC_CAT_LABEL(w.code)) + ' (' + w.pct + '%)').join(' · ') + '</p>' : '';
  const btn = (label, fn, primary = true) => '<button class="' + (primary ? 'new-quiz-btn' : 'micro-btn') + ' today-start" data-click="' + fn + '">' + label + '</button>';
  const mins = n => '<span class="today-min">~' + n + ' min</span>';
  const more = (fn, s) => (s.extra ? '<p class="muted-note">+' + s.extra + ' more done today, beyond the set.</p>' : '') + btn('Another set (' + s.count + ')', fn, false);
  // Blueprint days: each step's per-category targets as compact chips (✓ when met; weak categories marked "weak",
  // their counts still the AAMC weight), and any category whose pool was too small, with where its shortfall went.
  const bp = plan.split !== 'topics';
  const chip = (code, text, on, title, weak) => '<span class="mastery-chip' + (on ? ' done' : '') + '" title="' + esc(title) + '">' + (on ? '✓ ' : '') + esc(code) + ' ' + text + (weak ? ' <b>weak</b>' : '') + '</span>';
  // "weak" marks every category listed under "Weak content categories" (up to four), not only the two the split uses.
  const weakShown = new Set(plan.weak.slice(0, 4).map(w => w.code));
  const rank = masteryCatRank(plan), byRank = ts => [...ts].sort((a, b) => (a.code in rank ? rank[a.code] : 99) - (b.code in rank ? rank[b.code] : 99));
  const chips = ts => '<div class="mastery-path mastery-mix">' + byRank(ts).filter(t => t.need > 0 || t.raw > 0).map(t => chip(t.code, t.progress + '/' + t.need, t.progress >= t.need, AAMC_CAT_LABEL(t.code), t.weak || weakShown.has(t.code))).join('') + '</div>';
  const shortNote = (ts, unit) => { const sh = ts.filter(t => t.short); return sh.length ? '<p class="muted-note">Shortfall: ' + sh.map(t => esc(t.code) + ' has too few ' + unit + ', so ' + t.short + (t.to.length ? ' moved to ' + t.to.map(esc).join(', ') : ' could not be placed')).join('; ') + '.</p>' : ''; };
  const bpNote = 'Split exactly like the exam: every content category by how often AAMC tests it. Weakest categories first (from your latest test, marked <b>weak</b>; each keeps its AAMC count); within each category, twins of questions you missed, then missed and due cards, then the rest in test order.';
  const cp = plan.subj === 'cp', fromPE = 'the C/P questions of AAMC Practice Exams 1, 3, 4, 5 and 6';
  const targets = (ts, unit) => chips(ts) + shortNote(ts, unit);
  const topicList = ts => '<ul class="mastery-subtopics">' + ts.map(t => '<li' + (t.progress >= t.need ? ' class="done"' : '') + '>' + (t.progress >= t.need ? '✓ ' : '') + esc(t.code) + ' ' + esc(AAMC_CAT_LABEL(t.code)) + ' <span class="today-count">' + t.progress + ' / ' + t.need + '</span></li>').join('') + '</ul>';
  let body = '';
  if (plan.status === 'diagnostic') {
    body = '<ol class="today-steps"><li class="today-step"><span class="today-num">1</span><div class="today-body"><div class="today-title"><b>' + name(plan.subj) + ' diagnostic</b>' + mins(Math.round(MASTERY.diagSize * MASTERY.secondsPerItem / 60)) + '</div><div class="today-detail">First day on this section: just the diagnostic, a full AAMC section in the exam’s format. ' + MASTERY.diagSize + ' timed questions (10 passages plus single questions) across all of the section’s subjects and content categories, at exam pace, so every weak and strong area shows up. It scores you on 118–132 and shows your weak content categories; then today’s study starts right away.</div>' + btn('Start diagnostic', "startMasteryTest('diagnostic')") + '</div></li></ol>';
  } else {
    let n = 0;
    // The 3 daily steps are numbered 1–3; the one-time diagnostic and the after-quiz follow-up are not.
    body = '<ol class="today-steps">' + plan.steps.map(s => {
      const num = ['rules', 'flashcards', 'guided', 'test'].includes(s.id) ? String(++n) : '•';
      let title = '', detail = '', button = '', count = '', time = '';
      if (s.id === 'diagnostic') { title = 'Diagnostic'; count = '<b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + ') · ' + shortDay(s.result.day); detail = (s.old ? '<b>Earlier version</b> of the diagnostic. Retake the new ' + MASTERY.diagSize + '-question diagnostic for a fresh start. ' : 'Done. ') + 'Retaking it runs the full section again; your newest result sets the weak topics.'; button = btn('Retake diagnostic', "startMasteryTest('diagnostic')", s.old); }
      if (s.id === 'rules') { title = 'Rules warm-up'; count = s.progress + ' / ' + s.count; detail = 'Before the flashcards: read the rules sheet (the 6 checks to rule out 3, the 6 shortcut moves and the C/P rules by topic), then ' + s.count + ' rule cards: short problems where one rule gives the answer and the 3 wrong choices are the traps it kills. A missed rule card comes back first next time. The flashcards unlock when today’s rule cards are done.' +
          '<details class="elim-today rules-sheet"' + (s.done ? '' : ' open') + '><summary><b>📋 Rules sheet</b></summary>' + (typeof CP_RULES !== 'undefined' ? masteryRulesSheetHtml() : (masteryRulesLoad(), '<p class="muted-note">Loading the rules sheet…</p>')) + '</details>';
        time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 0.5) + 2); button = s.done ? '' : btn(s.progress ? 'Continue' : 'Start', 'startMasteryRules()'); }
      if (s.id === 'flashcards') { title = 'Flashcards'; count = s.progress + ' / ' + s.count; detail = cp ? '<b>' + s.count + ' flashcards built from ' + fromPE + '.</b> Each card teaches the method behind those questions, with “💡 Help me / Show me how”. ' + bpNote + (bp ? targets(s.topics, 'cards') : topicList(byRank(s.topics))) : bp ? 'AAMC QBank cards only, in the AAMC mix of disciplines across the day. ' + bpNote + targets(s.topics, 'cards') : 'AAMC QBank cards only, weakest topics first, spread over today’s content categories.' + topicList(s.topics); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 0.6)); button = s.done ? more('startMasteryFlashcards(true)', s) : masteryRulesDone(plan) ? btn(s.progress ? 'Continue' : 'Start', 'startMasteryFlashcards()') : '<p class="muted-note">Unlocks when the rules warm-up is done.</p>'; }
      if (s.id === 'guided') { title = 'Guided Practice Exam cards with walkthroughs'; count = s.progress + ' / ' + s.count + ' cards · ' + s.lessons + ' / ' + s.lessonCount + ' lessons'; detail = (cp ? s.count + ' Practice Exam cards: ' + fromPE + ', as the test asks them. ' : '') + (bp ? 'Each card opens its step-by-step lesson: step through it, answer, then watch the walkthrough. ' + bpNote + targets(s.topics, 'cards') : 'Weakest topics first. Each card opens its step-by-step lesson: step through it, answer, then watch the walkthrough.' + topicList(byRank(s.topics))); time = s.done ? '' : mins(Math.ceil((s.count - s.progress) * 1.2 + (s.lessonCount - s.lessons) * 2)); button = s.done ? more('startMasteryGuided(true)', s) : btn(s.progress || s.lessons ? 'Continue' : 'Start', 'startMasteryGuided()'); }
      if (s.id === 'followup') {
        const ws = s.weak.map(c => esc(c) + ' ' + esc(AAMC_CAT_LABEL(c))).join(' · ');
        if (s.atGoal) { title = 'Done for today'; detail = 'You reached ' + plan.goal + ' on today’s quiz. Anything more is optional.' + (ws ? ' Weakest on the quiz: ' + ws + '.' : ''); button = ws ? btn('Optional: flashcards on the weak spots', 'startMasteryFollowup(\'flashcards\')', false) + ' ' + btn('Optional: guided cards on the weak spots', 'startMasteryFollowup(\'guided\')', false) : ''; }
        else { title = 'Work on what you missed'; count = s.practiced ? s.practiced + ' done' : ''; detail = 'Today’s quiz was below ' + plan.goal + '. Review the missed questions on the quiz results, then practice the weakest topics' + (ws ? ': ' + ws : '') + ' with flashcards and guided cards (the quiz’s missed and due cards first).'; button = btn('Flashcards on these topics', 'startMasteryFollowup(\'flashcards\')') + ' ' + btn('Guided cards on these topics', 'startMasteryFollowup(\'guided\')', false); }
      }
      if (s.id === 'test') { title = '30-question quiz'; detail = s.done ? 'Today: <b>' + s.result.scaled + '</b> (' + s.result.correct + '/' + s.result.total + '). Tomorrow’s weak topics are updated.' : MASTERY.testSize + ' exam-style questions (passages and single questions' + (cp ? ', original, written to the AAMC C/P blueprint' : '') + ') at exam pace, to see your progress toward ' + plan.goal + '.';
        // The quiz's fixed AAMC mix by category; once taken, right / asked in each.
        if (s.mix) { const r = s.done && s.result.cats ? s.result.cats : null; detail += (r ? ' Right by content category:' : ' The AAMC mix by content category:') + '<div class="mastery-path mastery-mix">' + Object.entries(s.mix.cats).map(([c, n]) => chip(c, r ? (r[c] ? r[c].c + '/' + r[c].t + ' right' : '–') : '× ' + n, false, AAMC_CAT_LABEL(c), false)).join('') + '</div>'; } time = s.done ? '' : mins(Math.round(MASTERY.testSize * MASTERY.secondsPerItem / 60)); if (!s.done) button = masteryQuizUnlocked(plan) ? btn('Start quiz', "startMasteryTest('daily')") : '<p class="muted-note">Unlocks when the flashcards are done.</p>'; }
      return '<li class="today-step' + (s.done ? ' done' : '') + '"><span class="today-num" aria-hidden="true">' + (s.done ? '✓' : num) + '</span><div class="today-body"><div class="today-title"><b>' + title + '</b>' + (count ? ' <span class="today-count">' + count + '</span>' : '') + time + '</div><div class="today-detail">' + detail + '</div>' + button + '</div></li>';
    }).join('') + '</ol>';
  }
  const mastered = plan.masteredToday ? '<p class="today-alldone">✓ ' + name(plan.subj) + ' reached goal on ' + MASTERY.passDays + ' days in a row. The next section starts tomorrow.</p>' : '';
  const controls = '<details class="mastery-settings"><summary>Path settings</summary><label>Goal <select data-change="setMasteryGoal(this.value)">' + MASTERY.goals.map(g => '<option value="' + g + '"' + (g === plan.goal ? ' selected' : '') + '>' + g + '</option>').join('') + '</select></label> <label>Cards a day <select data-change="setMasteryPerDay(this.value)">' + MASTERY.perDay.map(n => '<option value="' + n + '"' + (n === plan.perDay ? ' selected' : '') + '>' + n + ' + ' + n + '</option>').join('') + '</select></label> <label>Study this section now <select data-change="setMasterySubject(this.value)"><option value="">Next in path</option>' + MASTERY.order.map(s => '<option value="' + s + '"' + (s === plan.subj && masteryLoad().current === s ? ' selected' : '') + '>' + name(s) + '</option>').join('') + '</select></label></details>';
  return head + latest + weak + mastered + body + controls;
}
