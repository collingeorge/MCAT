"""Draw the app's chemical structures with RDKit and write data/structures.js.

Run after editing STRUCTURES (needs RDKit: python3 -m pip install rdkit):
    python3 tools/draw-structures.py

Each entry: name -> (SMILES, checks). The checks are verified with RDKit before anything is written,
so a mistyped SMILES fails the build instead of teaching the wrong structure:
    formula   molecular formula (Hill order), e.g. 'C9H11NO3'
    centers   number of stereocenters
    cip       {atom map number: 'R'/'S'} for atoms tagged :n in the SMILES
    ez        'E' or 'Z' for the single stereo double bond
    hl        atom map numbers to highlight (an arrow-free way to point at an atom)
The output is deterministic, so CI can confirm data/structures.js matches this file (see the test).
"""
import hashlib, json, re, sys
from pathlib import Path
from rdkit import Chem
from rdkit.Chem import rdDepictor, rdMolDescriptors
from rdkit.Chem.Draw import rdMolDraw2D

S = {}
def add(name, smiles, **checks): S[name] = (smiles, checks)

# ── The 20 amino acids (L, neutral form) ──
AA = {
 'glycine': ('NCC(=O)O', 'C2H5NO2'), 'alanine': ('N[C@@H](C)C(=O)O', 'C3H7NO2'),
 'valine': ('N[C@@H](C(C)C)C(=O)O', 'C5H11NO2'), 'leucine': ('N[C@@H](CC(C)C)C(=O)O', 'C6H13NO2'),
 'isoleucine': ('N[C@@H]([C@@H](C)CC)C(=O)O', 'C6H13NO2'), 'proline': ('OC(=O)[C@@H]1CCCN1', 'C5H9NO2'),
 'phenylalanine': ('N[C@@H](Cc1ccccc1)C(=O)O', 'C9H11NO2'), 'tryptophan': ('N[C@@H](Cc1c[nH]c2ccccc12)C(=O)O', 'C11H12N2O2'),
 'methionine': ('N[C@@H](CCSC)C(=O)O', 'C5H11NO2S'), 'serine': ('N[C@@H](CO)C(=O)O', 'C3H7NO3'),
 'threonine': ('N[C@@H]([C@@H](C)O)C(=O)O', 'C4H9NO3'), 'cysteine': ('N[C@@H](CS)C(=O)O', 'C3H7NO2S'),
 'tyrosine': ('N[C@@H](Cc1ccc(O)cc1)C(=O)O', 'C9H11NO3'), 'asparagine': ('N[C@@H](CC(N)=O)C(=O)O', 'C4H8N2O3'),
 'glutamine': ('N[C@@H](CCC(N)=O)C(=O)O', 'C5H10N2O3'), 'aspartate': ('N[C@@H](CC(=O)O)C(=O)O', 'C4H7NO4'),
 'glutamate': ('N[C@@H](CCC(=O)O)C(=O)O', 'C5H9NO4'), 'lysine': ('N[C@@H](CCCCN)C(=O)O', 'C6H14N2O2'),
 'arginine': ('N[C@@H](CCCNC(N)=N)C(=O)O', 'C6H14N4O2'), 'histidine': ('N[C@@H](Cc1c[nH]cn1)C(=O)O', 'C6H9N3O2'),
}
for n, (smi, f) in AA.items(): add(n, smi, formula=f, centers=0 if n == 'glycine' else 2 if n in ('isoleucine', 'threonine') else 1)
# L-alanine is S; L-cysteine is R (sulfur outranks the carboxyl), the classic exception
add('alanine-cip', 'N[C@@H:1](C)C(=O)O', formula='C3H7NO2', cip={1: 'S'})
add('cysteine-cip', 'N[C@@H:1](CS)C(=O)O', formula='C3H7NO2S', cip={1: 'R'})

# ── Nucleobases ──
add('adenine', 'Nc1ncnc2[nH]cnc12', formula='C5H5N5')
add('guanine', 'Nc1nc2[nH]cnc2c(=O)[nH]1', formula='C5H5N5O')
add('cytosine', 'Nc1cc[nH]c(=O)n1', formula='C4H5N3O')
add('thymine', 'Cc1c[nH]c(=O)[nH]c1=O', formula='C5H6N2O2')
add('uracil', 'O=c1cc[nH]c(=O)[nH]1', formula='C4H4N2O2')

# ── Functional-group molecules ──
add('aspirin', 'CC(=O)Oc1ccccc1C(=O)O', formula='C9H8O4')
add('acetaminophen', 'CC(=O)Nc1ccc(O)cc1', formula='C8H9NO2')
add('ibuprofen', 'CC(C)Cc1ccc(cc1)C(C)C(=O)O', formula='C13H18O2', centers=1)
add('lidocaine', 'CCN(CC)CC(=O)Nc1c(C)cccc1C', formula='C14H22N2O')
add('benzocaine', 'CCOC(=O)c1ccc(N)cc1', formula='C9H11NO2')
add('acetic-anhydride', 'CC(=O)OC(C)=O', formula='C4H6O3')
add('ethyl-acetate', 'CCOC(C)=O', formula='C4H8O2')
add('diethyl-ether', 'CCOCC', formula='C4H10O')
add('acetone', 'CC(C)=O', formula='C3H6O')
add('butanal', 'CCCC=O', formula='C4H8O')
add('acetonitrile-propyl', 'CCCC#N', formula='C4H7N')
add('n-methylpropanamide', 'CCC(=O)NC', formula='C4H9NO')
add('triethylamine', 'CCN(CC)CC', formula='C6H15N')
add('diethylamine', 'CCNCC', formula='C4H11N')
add('gamma-butyrolactone', 'O=C1CCCO1', formula='C4H6O2')
add('caprolactam', 'O=C1CCCCCN1', formula='C6H11NO')
add('hemiacetal', 'CC(O)OCC', formula='C4H10O2', centers=1)
add('acetal', 'CC(OCC)OCC', formula='C6H14O2')
add('imine', 'CC(C)=NCC', formula='C5H11N')
add('ethanethiol', 'CCS', formula='C2H6S')
add('phenol', 'Oc1ccccc1', formula='C6H6O')
add('acetyl-chloride', 'CC(Cl)=O', formula='C2H3ClO')
add('enol', 'CC(O)=C', formula='C3H6O')

# ── Biomolecules ──
add('glucose-open', 'OC[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)C=O', formula='C6H12O6', centers=4)
add('fructose-open', 'OC[C@@H](O)[C@@H](O)[C@H](O)C(=O)CO', formula='C6H12O6', centers=3)
add('beta-glucopyranose', 'OC[C@H:5]1O[C@@H:1](O)[C@H](O)[C@@H](O)[C@@H]1O', formula='C6H12O6', centers=5, cip={1: 'R', 5: 'R'})  # beta-D: C1 R, C5 R
add('ribose', 'OC[C@H]1OC(O)[C@H](O)[C@@H]1O', formula='C5H10O5')
add('deoxyribose', 'OC[C@H]1OC(O)C[C@@H]1O', formula='C5H10O4')
add('stearic-acid', 'CCCCCCCCCCCCCCCCCC(=O)O', formula='C18H36O2')
add('palmitic-acid', 'CCCCCCCCCCCCCCCC(=O)O', formula='C16H32O2')
add('oleic-acid', 'CCCCCCCC/C=C\\CCCCCCCC(=O)O', formula='C18H34O2', ez='Z')
add('elaidic-acid', 'CCCCCCCC/C=C/CCCCCCCC(=O)O', formula='C18H34O2', ez='E')
add('triacylglycerol', 'CCCCCCCCCCCC(=O)OCC(OC(=O)CCCCCCCCCCC)COC(=O)CCCCCCCCCCC', formula='C39H74O6')
add('phosphatidylcholine', 'CCCCCCCCCCCC(=O)OC[C@H](COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCC', formula='C32H64NO8P')
add('cholesterol', 'C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)O)C)C', formula='C27H46O', centers=8)
add('sphingosine', 'CCCCCCCCCCCCC/C=C/[C@H](O)[C@@H](N)CO', formula='C18H37NO2')
add('atp', 'Nc1ncnc2n(cnc12)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O', formula='C10H16N5O13P3')
add('damp', 'Nc1ncnc2n(cnc12)[C@H]1C[C@H](O)[C@@H](COP(=O)(O)O)O1', formula='C10H14N5O6P')
add('pyruvate', 'CC(=O)C(=O)O', formula='C3H4O3')
add('lactate', 'C[C@H](O)C(=O)O', formula='C3H6O3', centers=1)
add('citrate', 'OC(=O)CC(O)(CC(=O)O)C(=O)O', formula='C6H8O7', centers=0)
add('urea', 'NC(N)=O', formula='CH4N2O')
add('fdg', 'OC[C@H]1O[C@@H](O)[C@H](F)[C@@H](O)[C@@H]1O', formula='C6H11FO5')

# ── Skeletal-formula and stereo reading ──
add('cyclohexanone', 'O=C1CCCCC1', formula='C6H10O')
add('cyclohexanol', 'OC1CCCCC1', formula='C6H12O')
add('diphenylethanol', 'O[C@@H](Cc1ccccc1)c1ccccc1', formula='C14H14O', centers=1)
add('menthol', 'CC(C)[C@@H]1CC[C@@H](C)C[C@H]1O', formula='C10H20O', centers=3)
add('limonene', 'CC1=CC[C@@H](CC1)C(C)=C', formula='C10H16', centers=1)
add('carvone', 'CC1=CC[C@@H](CC1=O)C(C)=C', formula='C10H14O', centers=1)
add('2-butanol-r', 'CC[C@@H:1](C)O', formula='C4H10O', cip={1: 'R'})
add('2-butanol-s', 'CC[C@H:1](C)O', formula='C4H10O', cip={1: 'S'})
add('2-bromobutane-s', 'CC[C@H:1](C)Br', formula='C4H9Br', cip={1: 'S'})
add('cis-2-butene', 'C/C=C\\C', formula='C4H8', ez='Z')
add('trans-2-butene', 'C/C=C/C', formula='C4H8', ez='E')
add('e-3-methyl-2-pentene', 'C/C=C(\\C)CC', formula='C6H12', ez='E')
add('meso-tartaric', 'OC(=O)[C@@H:1](O)[C@@H:2](O)C(=O)O', formula='C4H6O6', centers=2, cip={1: 'S', 2: 'R'})  # S,R = meso
add('ll-tartaric', 'OC(=O)[C@@H:1](O)[C@H:2](O)C(=O)O', formula='C4H6O6', centers=2, cip={1: 'S', 2: 'S'})
add('cis-dimethylcyclohexane', 'C[C@@H]1CC[C@H](C)CC1', formula='C8H16')  # cis: verified by 3D embedding (methyls on the same face)
add('naphthalene', 'c1ccc2ccccc2c1', formula='C10H8')
add('pyridine', 'c1ccncc1', formula='C5H5N')
add('pyrrole', 'c1cc[nH]c1', formula='C4H5N')
add('furan', 'c1ccoc1', formula='C4H4O')
add('imidazole', 'c1c[nH]cn1', formula='C3H4N2')
add('indole', 'c1ccc2[nH]ccc2c1', formula='C8H7N')
add('acetone-hl-c', 'C[C:1](C)=O', formula='C3H6O', hl=[1])
add('acetonitrile-hl', 'C[C:1]#N', formula='C2H3N', hl=[1])
add('ethanol-hl', 'C[CH2:1]O', formula='C2H6O', hl=[1])
add('allene-hl', 'C=[C:1]=C', formula='C3H4', hl=[1])


# ── Card step structures (from the animated Practice Exam walkthroughs) ──
add('3-methyl-3-pentanol', "CCC(C)(O)CC", formula='C6H14O')
add('z-3-methyl-2-pentene', "C/C=C(/C)CC", formula='C6H12')
add('gly-ala', "NCC(=O)N[C@@H](C)C(=O)O", formula='C5H10N2O3')
add('1-butanol', "CCCCO", formula='C4H10O')
add('3-3-dimethyl-2-butanol', "CC(O)C(C)(C)C", formula='C6H14O')
add('2-chloro-3-3-dimethylbutane', "CC(Cl)C(C)(C)C", formula='C6H13Cl')
add('3-3-dimethyl-1-butene', "C=CC(C)(C)C", formula='C6H12')
add('2-chloro-2-3-dimethylbutane', "CC(C)C(C)(C)Cl", formula='C6H13Cl')
add('2-bromobutane-r', "CC[C@@H](C)Br", formula='C4H9Br')
add('2-methylbutanenitrile-s', "CC[C@H](C)C#N", formula='C5H9N')
add('11-cis-retinal', "CC1=C(C(C)(C)CCC1)/C=C/C(C)=C/C=C\\C(C)=C\\C=O", formula='C20H28O')
add('alpha-glucopyranose', "OC[C@H]1O[C@H:1](O)[C@H](O)[C@@H](O)[C@@H]1O", formula='C6H12O6', hl=[1])
add('diacetone-alcohol', "CC(=O)C[C:1](C)(C)O", formula='C6H12O2', hl=[1])
add('mesityl-oxide', "CC(=O)C=C(C)C", formula='C6H10O')
add('glucono-lactone', "OC[C@H]1OC(=O)[C@H](O)[C@@H](O)[C@@H]1O", formula='C6H10O6')
add('n-octane', "CCCCCCCC", formula='C8H18')
add('isooctane', "CC(C)CC(C)(C)C", formula='C8H18')
add('5-methylcytosine', "Cc1c[nH]c(=O)nc1N", formula='C5H7N3O')
add('5-hydroxymethylcytosine', "OCc1c[nH]c(=O)nc1N", formula='C5H7N3O2')
add('sulfur-hexafluoride', "FS(F)(F)(F)(F)F", formula='F6S')
add('tert-butanol-hl', "C[C:1](C)(C)O", formula='C4H10O', hl=[1])
add('1-chlorobutane', "CCCCCl", formula='C4H9Cl')
add('n-ethyl-n-methylbenzylamine', "CCN(C)Cc1ccccc1", formula='C10H15N')
add('methyl-4-oxopentanoate', "CC(=O)CCC(=O)OC", formula='C6H10O3')
add('gamma-valerolactone', "CC1CCC(=O)O1", formula='C5H8O2')
add('cis-tert-butyl-methylcyclohexane', "C[C@@H]1CC[C@H](C(C)(C)C)CC1", formula='C11H22')
add('biotin', "OC(=O)CCCC[C@@H]1SC[C@@H]2NC(=O)N[C@H]12", formula='C10H16N2O3S')
add('ala-gly-ala', "C[C@H](N)C(=O)NCC(=O)N[C@@H](C)C(=O)O", formula='C8H15N3O4')
add('2-propanol', "[CH3:1]C(O)[CH3:2]", formula='C3H8O', hl=[1, 2])
add('1-propanol', "CCCO", formula='C3H8O')
add('tert-butanol', "CC(C)(C)O", formula='C4H10O')
add('carbon-monoxide', "[C-]#[O+]", formula='CO')

def stereo_count(m):
    return len(Chem.FindMolChiralCenters(m, includeUnassigned=True, useLegacyImplementation=False))

def check(name, m, checks):
    f = rdMolDescriptors.CalcMolFormula(m)
    if 'formula' in checks and f != checks['formula']: raise SystemExit(f'{name}: formula {f} != {checks["formula"]}')
    if 'centers' in checks and stereo_count(m) != checks['centers']: raise SystemExit(f'{name}: {stereo_count(m)} stereocenters != {checks["centers"]}')
    for amap, want in checks.get('cip', {}).items():
        a = next(a for a in m.GetAtoms() if a.GetAtomMapNum() == amap)
        got = a.GetProp('_CIPCode') if a.HasProp('_CIPCode') else None
        if got != want: raise SystemExit(f'{name}: atom {amap} is {got}, expected {want}')
    if 'ez' in checks:
        st = [b.GetProp('_CIPCode') for b in m.GetBonds() if b.HasProp('_CIPCode')]
        if st != [checks['ez']]: raise SystemExit(f'{name}: double-bond E/Z {st} != {checks["ez"]}')
    return f

def draw(m, hl):
    rdDepictor.SetPreferCoordGen(True)
    rdDepictor.Compute2DCoords(m)
    d = rdMolDraw2D.MolDraw2DSVG(-1, -1, noFreetype=True)
    o = d.drawOptions()
    o.clearBackground = False; o.bondLineWidth = 2; o.fixedBondLength = 32; o.padding = 0.12
    o.minFontSize = 13; o.additionalAtomLabelPadding = 0.1
    o.setHighlightColour((1.0, 0.82, 0.3))
    for a in m.GetAtoms(): a.SetAtomMapNum(0)
    hs = set(hl or [])
    # A highlighted group (2+ atoms) also lights its bonds, including the one joining it to the rest of the molecule.
    hb = [b.GetIdx() for b in m.GetBonds() if len(hs) > 1 and (b.GetBeginAtomIdx() in hs or b.GetEndAtomIdx() in hs)]
    rdMolDraw2D.PrepareAndDrawMolecule(d, m, highlightAtoms=list(hs), highlightBonds=hb)
    d.FinishDrawing()
    svg = d.GetDrawingText()
    svg = re.sub(r'<\?xml[^>]*>\s*', '', svg)
    svg = re.sub(r'<!-- .*? -->\s*', '', svg)
    svg = re.sub(r'(\d+\.\d)\d+', r'\1', svg)          # one decimal is plenty at this size
    svg = re.sub(r'\s*\n\s*', ' ', svg).replace('> <', '><')
    return svg.strip()

# Amino-acid side-chain highlights ('<aa>-sc'): every heavy atom outside the N–Cα–C(=O)OH backbone.
BACKBONE = Chem.MolFromSmarts('[NX3][CX4][CX3](=O)[OX2H1]')
SIDECHAIN = {}
for n in AA:
    if n == 'glycine': continue
    m = Chem.MolFromSmiles(AA[n][0]); bb = set(m.GetSubstructMatch(BACKBONE))
    if len(bb) != 5: raise SystemExit(f'{n}: backbone not found')
    sc = [a.GetIdx() for a in m.GetAtoms() if a.GetIdx() not in bb]
    if not sc: raise SystemExit(f'{n}: empty side chain')
    SIDECHAIN[n + '-sc'] = (AA[n][0], sc)

out = {}
for name, (smi, checks) in S.items():
    m = Chem.MolFromSmiles(smi)
    if m is None: raise SystemExit(f'{name}: bad SMILES {smi}')
    Chem.AssignStereochemistry(m, cleanIt=True, force=True)
    from rdkit.Chem import rdCIPLabeler; rdCIPLabeler.AssignCIPLabels(m)
    check(name, m, checks)
    hl = [a.GetIdx() for a in m.GetAtoms() if a.GetAtomMapNum() in checks.get('hl', [])]
    out[name] = draw(Chem.Mol(m), hl)

for name, (smi, sc) in SIDECHAIN.items():
    m = Chem.MolFromSmiles(smi)
    out[name] = draw(m, sc)

src = hashlib.sha256(Path(__file__).read_bytes().replace(b'\r\n', b'\n')).hexdigest()[:16]  # line-ending independent (CI runs on Windows too)
body = ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in out.items())
js = (f'// Generated by tools/draw-structures.py (source {src}). Do not edit by hand.\n'
      f'// Skeletal structures drawn with RDKit; each is checked (formula, stereocenters, R/S, E/Z) before writing.\n'
      f'const STRUCT_SVG = {{\n{body}\n}};\n')
Path(__file__).resolve().parent.parent.joinpath('data/structures.js').write_text(js, encoding='utf-8')
print(f'{len(out)} structures, {len(js) // 1024} KB')
