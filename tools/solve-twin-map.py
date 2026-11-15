"""Solve the twin map: assign AAMC passage clusters (verified question ranges) and stand-alone cards to the Chem/Phys
diagnostic and the six daily quizzes, at the exact AAMC category, discipline, skill and difficulty mix, each card
twinned at most once. Needs OR-Tools (pip install ortools); the app does not.

  node tools/twin-sources.cjs > sources.json
  python3 tools/solve-twin-map.py sources.json tools/twin-map.json [seconds]

Diagnostic: 10 passages (4,4,4,4,4,4,4,5,5,6 questions) + 15 stand-alones. Quiz: 5 passages (4,4,4,5,5) + 8
stand-alones. The approved sample (tools/twin-sample.json) is pinned into the diagnostic with its labels.
CP-SAT with several workers is not bit-for-bit reproducible: a re-run can give a different map that meets the same
constraints. The committed tools/twin-map.json is the source of truth. Diagnostics: SOFTCAT, SOFTSKILLS turn a
constraint family into a penalty and print the slack.
"""
import json
import os
import sys
from ortools.sat.python import cp_model

src = json.load(open(sys.argv[1]))
out_path = sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))
sample = json.load(open(os.path.join(here, 'twin-sample.json')))
cards = {c['id']: c for c in src['cards']}
prim, sa_prim, secondary = src['prim'], src['sa'], src['secondary']
SA = sa_prim + secondary
SETS = {s['id']: s for s in src['sets']}
QUIZ = [f'quiz{i}' for i in range(1, 7)]
ALL = ['diag', *QUIZ]
EXAMS = ['sample-cp', 'pe1-cp', 'pe3-cp', 'pe4-cp', 'pe5-cp', 'pe6-cp']
LEVELS = ['E', 'M', 'D', 'X']

# Difficulty: each card's base level from its rank among the primary cards (10/30/39/21%).
ranked = sorted([c for c in cards.values() if c['primary']], key=lambda c: c['score'])
for i, c in enumerate(ranked):
    p = i / len(ranked)
    c['base'] = 0 if p < 0.10 else 1 if p < 0.40 else 2 if p < 0.79 else 3
for c in cards.values():
    c.setdefault('base', 1)  # secondary recall cards: medium

# The approved sample: its passage cluster and stand-alones are pinned into the diagnostic with their labels.
pin = {}
for p in ([] if 'NOPIN' in os.environ else sample['passages']):
    for q in p['questions']:
        pin[q['twin']] = (q['skill'], q['diff'])
for q in ([] if 'NOPIN' in os.environ else sample['standalones']):
    pin[q['twin']] = (q['skill'], q['diff'])

m = cp_model.CpModel()
pen = []
use = {}


def U(cid, s):
    if (cid, s) not in use:
        use[(cid, s)] = m.NewBoolVar(f'u_{cid}_{s}')
    return use[(cid, s)]


# Passage clusters: each to at most one set; z[ci, s, k] = cluster ci gives k questions in set s.
xc, z = {}, {}
for ci, c in enumerate(prim):
    opts = []
    for s in ALL:
        xc[(ci, s)] = v = m.NewBoolVar(f'x_{ci}_{s}')
        opts.append(v)
        used = [U(cid, s) for cid in c['ids']]
        for u in used:
            m.AddImplication(u, v)
        ks = {k: m.NewBoolVar(f'z_{ci}_{s}_{k}') for k in sorted(set(SETS[s]['sizes'])) if k <= len(c['ids'])}
        for k, zv in ks.items():
            z[(ci, s, k)] = zv
        m.Add(sum(ks.values()) == v)
        m.Add(sum(used) == sum(k * zv for k, zv in ks.items()))
    m.Add(sum(opts) <= 1)
for s in ALL:
    for k in set(SETS[s]['sizes']):
        m.Add(sum(zv for (ci, ss, kk), zv in z.items() if ss == s and kk == k) == SETS[s]['sizes'].count(k))

# Stand-alones: each card at most once; diag 15, each quiz 8. Secondary cards only when needed.
for cid in SA:
    m.Add(sum(U(cid, s) for s in ALL) <= 1)
    if cid in secondary:
        pen.extend([5 * U(cid, s) for s in ALL])
for s in ALL:
    m.Add(sum(U(cid, s) for cid in SA) == SETS[s]['nSA'])
# A passage card is never a stand-alone twin, and vice versa (structural: SA list holds no passage cards).

# Pins.
pinned_cluster = [ci for ci, c in enumerate(prim) if any(cid in pin for cid in c['ids'])]
for ci in pinned_cluster:
    m.Add(xc[(ci, 'diag')] == 1)
for cid in pin:
    m.Add(U(cid, 'diag') == 1)

# Even draw across the six exams.
for e in (EXAMS if 'NOEVEN' not in os.environ else []):
    pe = [ci for ci, c in enumerate(prim) if c['exam'] == e]
    se = [cid for cid in sa_prim if cid.startswith(e + ':')]
    m.Add(sum(xc[(ci, 'diag')] for ci in pe) >= 1)
    m.Add(sum(xc[(ci, 'diag')] for ci in pe) <= 2)
    m.Add(sum(U(cid, 'diag') for cid in se) >= 2)
    m.Add(sum(U(cid, 'diag') for cid in se) <= 3)
    m.Add(sum(xc[(ci, s)] for ci in pe for s in QUIZ) == 5)
    for s in QUIZ:
        m.Add(sum(xc[(ci, s)] for ci in pe) <= 1)
        m.Add(sum(U(cid, s) for cid in se) <= 2)
    # Quiz stand-alones spread evenly: 7–9 of the 48 from each exam (secondary cards count for none).
    m.Add(sum(U(cid, s) for cid in se for s in QUIZ) <= 9)

# Per-set mixes. Skill and difficulty are labels from each card's options (difficulty: any level, cost by distance).
lab = {}
SLK = []
for s, S in SETS.items():
    items = [(cid, v) for (cid, ss), v in use.items() if ss == s]
    t = S['t']
    for cat, n in t['cats'].items():
        cnt = sum(v for cid, v in items if cards[cid]['aamc'] == cat)
        if 'SOFTCAT' in os.environ:
            a_, b_ = m.NewIntVar(0, 20, ''), m.NewIntVar(0, 20, '')
            m.Add(cnt + a_ - b_ == n); SLK.append((s, cat, a_, b_)); pen.extend([100 * a_, 100 * b_])
        else:
            m.Add(cnt == n)
    for d, n in t['discs'].items():
        cnt = sum(v for cid, v in items if cards[cid]['disc'] == d)
        if d == 'biology':
            if s == 'diag':
                m.Add(cnt == n)
            else:
                m.Add(cnt <= n)
                pen.append(20 * (n - cnt))
        elif 'NODISC' in os.environ:
            pass
        else:  # exact, or +1 for the one discipline that takes biology's slot when a quiz has no biology
            m.Add(cnt >= n)
            m.Add(cnt <= n + 1)
    for kind, opts in (('skills', lambda c: c['skills']), ('diffs', lambda c: LEVELS)):
        if kind == 'skills' and 'NOSKILLS' in os.environ:
            continue
        per = {}
        for cid, v in items:
            ls = []
            for r, o in enumerate(opts(cards[cid])):
                w = m.NewBoolVar(f'{kind}_{cid}_{s}_{o}')
                lab[(kind, cid, s, o)] = w
                ls.append(w)
                per.setdefault(o, []).append(w)
                if cid in pin:
                    want = pin[cid][0 if kind == 'skills' else 1]
                    if o != want:
                        m.Add(w == 0)
                elif kind == 'skills' and r:
                    pen.append(w)
                elif kind == 'diffs':
                    dist = abs(LEVELS.index(o) - cards[cid]['base'])
                    if dist:
                        pen.append(dist * dist * w)
            m.Add(sum(ls) == v)
        for o, n in t[kind].items():
            if kind == 'skills' and 'SOFTSKILLS' in os.environ:
                a_, b_ = m.NewIntVar(0, 40, ''), m.NewIntVar(0, 40, '')
                m.Add(sum(per.get(o, [])) + a_ - b_ == n); SLK.append((s, o, a_, b_)); pen.extend([100 * a_, 100 * b_])
            else:
                m.Add(sum(per.get(o, [])) == n)

if 'MAXSLACK' in os.environ:
    m.Add(sum(a_ + b_ for _, _, a_, b_ in SLK) <= int(os.environ['MAXSLACK']))
m.Minimize(sum(pen))
solver = cp_model.CpSolver()
solver.parameters.max_time_in_seconds = float(sys.argv[3]) if len(sys.argv) > 3 else 300
solver.parameters.num_workers = int(os.environ.get('WORKERS', 8))
solver.parameters.random_seed = 20261115
st = solver.Solve(m)
print(solver.StatusName(st), 'penalty', solver.ObjectiveValue() if st in (cp_model.OPTIMAL, cp_model.FEASIBLE) else None, flush=True)
if st not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
    sys.exit(1)
for s_, c_, a_, b_ in SLK:
    if solver.Value(a_) or solver.Value(b_):
        print('slack', s_, c_, '-', solver.Value(a_), '+', solver.Value(b_))

V = solver.Value
res = {'_note': 'Generated by tools/solve-twin-map.py from tools/twin-clusters.json; one row per question slot.', 'sets': {}}
for s in ALL:
    def row(cid, kind):
        sk = next((o for o in cards[cid]['skills'] if ('skills', cid, s, o) in lab and V(lab[('skills', cid, s, o)])), cards[cid]['skills'][0])
        df = next(o for o in LEVELS if V(lab[('diffs', cid, s, o)]))
        return {'twin': cid, 'kind': kind, 'aamc': cards[cid]['aamc'], 'disc': cards[cid]['disc'], 'skill': sk, 'diff': df}
    groups = []
    for ci, c in enumerate(prim):
        if V(xc[(ci, s)]):
            ids = [cid for cid in c['ids'] if V(use[(cid, s)])]
            groups.append({'cluster': c['key'], 'ids': ids, 'rows': [row(cid, 'P') for cid in ids]})
    # The pinned sample passage first; then 4-question passages before 5s, so the order fills P P [4] P P P [4].
    groups.sort(key=lambda g: (not any(cid in pin for cid in g['ids']), len(g['ids'])))
    sas = sorted([cid for cid in SA if (cid, s) in use and V(use[(cid, s)])], key=lambda cid: cid not in pin)
    res['sets'][s] = {'passages': groups, 'standalones': [row(cid, 'SA') for cid in sas]}
json.dump(res, open(out_path, 'w'), indent=1, ensure_ascii=False)
print('wrote', out_path)
