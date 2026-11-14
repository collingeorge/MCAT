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
add('4-heptanone', "CCC[C:1](=O)CCC", formula='C7H14O', hl=[1])
add('4-heptanol', "CCC[CH:1](O)CCC", formula='C7H16O', hl=[1])
add('riboflavin', "Cc1cc2nc3c(=O)[nH]c(=O)nc-3n(C[C@H](O)[C@H](O)[C@H](O)CO)c2cc1C", formula='C17H20N4O6')
add('sodium-dodecyl-sulfate', "CCCCCCCCCCCCOS(=O)(=O)[O-].[Na+]", formula='C12H25NaO4S')
add('ammonium-acetate', "CC(=O)[O-].[NH4+]", formula='C2H7NO2')
add('acetic-acid', "CC(=O)O", formula='C2H4O2')
add('benzene', "c1ccccc1", formula='C6H6')
add('nf3', "FN(F)F", formula='F3N')
add('bf3', "FB(F)F", formula='BF3')
add('co2', "O=C=O", formula='CO2')
add('ccl4', "ClC(Cl)(Cl)Cl", formula='CCl4')
# ── Exam-form structure questions (labeled sites, radical products) ──
# Guanine with four H-bearing sites labeled I–IV: N1–H, the 2-NH₂, C8–H (the only C–H), N9–H.
add('guanine-sites', 'O=c1[nH:1]c([NH2:2])nc2[nH:4][cH:3]nc12', formula='C5H5N5O', notes={1: 'I', 2: 'II', 3: 'III', 4: 'IV'})
# One-electron oxidation products of acetaminophen: the radical (dot) on O, on the amide N, on a ring C, or on the methyl C.
add('guanine-c8', 'O=c1[nH:1]c([NH2:2])nc2[nH:4][cH:3]nc12', formula='C5H5N5O', notes={1: 'I', 2: 'II', 3: 'III', 4: 'IV'}, hl=[3])
add('apap-o-radical', 'CC(=O)Nc1ccc([O])cc1', formula='C8H8NO2', radicals=1)
add('apap-n-radical', 'CC(=O)[N]c1ccc(O)cc1', formula='C8H8NO2', radicals=1)
add('apap-ring-radical', 'CC(=O)Nc1c[c]c(O)cc1', formula='C8H8NO2', radicals=1)
add('apap-methyl-radical', '[CH2]C(=O)Nc1ccc(O)cc1', formula='C8H8NO2', radicals=1)
add('p1-hydroquinone', "Oc1ccc(O)cc1", formula='C6H6O2')
add('p1-hydroquinone-oh', "[OH:1]c1ccc([OH:2])cc1", formula='C6H6O2', hl=[1, 2])
add('p1-dimethoxybenzene', "COc1ccc(OC)cc1", formula='C8H10O2')
add('p1-dibromobenzene', "Brc1ccc(Br)cc1", formula='C6H4Br2')
add('p1-acetophenone', "CC(=O)c1ccccc1", formula='C8H8O')
add('p1-2-phenyl-2-butanol', "CCC(C)(O)c1ccccc1", formula='C10H14O')
# Lesson stages for Practice Exam 1 #4 (acid dehydration, shown step by step on the molecule)
add('p1-lesson-oh', "CCC(C)([OH:1])c1ccccc1", formula='C10H14O', hl=[1])
add('p1-lesson-oxonium', "CCC(C)([OH2+:1])c1ccccc1", formula='C10H15O+', hl=[1])
add('p1-lesson-cation', "CC[C+:1](C)c1ccccc1", formula='C10H13+', hl=[1])
add('p1-lesson-ring-c', "CC[C+](C)[c:1]1ccccc1", formula='C10H13+', hl=[1])
add('p1-phenylbutyl-cation', "C[CH2:1][C+]([CH3:2])c1ccccc1", formula='C10H13+', hl=[1, 2])
add('p1-e-2-phenyl-2-butene', "C/C=C(\\C)c1ccccc1", formula='C10H12')
add('p1-z-2-phenyl-2-butene', "C/C=C(/C)c1ccccc1", formula='C10H12')
add('p1-2-phenyl-1-butene', "C=C(CC)c1ccccc1", formula='C10H12')
add('p1-3-phenyl-1-butene', "C=CC(C)c1ccccc1", formula='C10H12')
add('p1-ala-ser', "N[C@@H](C)C(=O)N[C@@H](CO)C(=O)O", formula='C6H12N2O4')
add('p1-ala-ser-amide', "N[C@@H](C)[C:1](=[O:2])[NH:3][C@@H](CO)C(=O)O", formula='C6H12N2O4', hl=[1, 2, 3])
add('p1-ala-ser-ester', "N[C@@H](C)C(=O)OC[C@H](N)C(=O)O", formula='C6H12N2O4')
add('p1-ala-ser-anhydride', "N[C@@H](C)C(=O)OC(=O)[C@@H](N)CO", formula='C6H12N2O4')
add('p1-ala-ser-dkp', "C[C@@H]1NC(=O)[C@H](CO)NC1=O", formula='C6H10N2O3')
add('p1-1-bromobutane', "CCCCBr", formula='C4H9Br')
add('p1-2-bromopropane', "CC(C)Br", formula='C3H7Br')
add('p1-tert-butyl-bromide', "CC(C)(C)Br", formula='C4H9Br')
add('p1-neopentyl-bromide', "CC(C)(C)CBr", formula='C5H11Br')
add('p1-1-bromobutane-hl', "CCC[CH2:1]Br", formula='C4H9Br', hl=[1])
add('p1-neopentyl-bromide-hl', "C[C:2](C)(C)[CH2:1]Br", formula='C5H11Br', hl=[1, 2])
add('p1-3-methyl-2-butanol', "CC(O)C(C)C", formula='C5H12O')
add('p1-2-cation-hl', "C[CH+:1][CH:2](C)C", formula='C5H11+', hl=[1, 2])
add('p1-3-cation-hl', "CC[C+:1](C)C", formula='C5H11+', hl=[1])
add('p1-2-bromo-3-methylbutane', "CC(Br)C(C)C", formula='C5H11Br')
add('p1-2-bromo-2-methylbutane', "CCC(C)(C)Br", formula='C5H11Br')
add('p1-3-methyl-1-butene', "C=CC(C)C", formula='C5H10')
add('p1-2-methyl-2-butene', "CC=C(C)C", formula='C5H10')
add('p1-2-bromopentane-s', "CCC[C@H](C)Br", formula='C5H11Br')
add('p1-2-bromopentane-s-hl', "CCC[C@H:1](C)Br", formula='C5H11Br', hl=[1])
add('p1-pentane-2-thiol-r', "CCC[C@@H](C)S", formula='C5H12S')
add('p1-pentane-2-thiol-s', "CCC[C@H](C)S", formula='C5H12S')
add('p1-pentane-1-thiol', "CCCCCS", formula='C5H12S')
add('p1-e-2-pentene', "C/C=C/CC", formula='C5H10')
add('p1-benzoic-acid', "OC(=O)c1ccccc1", formula='C7H6O2')
add('p1-methanol-18o', "C[18OH]", formula='CH4O')
add('p1-mb-18o-bridge', "C[18O]C(=O)c1ccccc1", formula='C8H8O2')
add('p1-mb-18o-carbonyl', "COC(=[18O])c1ccccc1", formula='C8H8O2')
add('p1-mb-unlabeled', "COC(=O)c1ccccc1", formula='C8H8O2')
add('p1-mb-18o-both', "C[18O]C(=[18O])c1ccccc1", formula='C8H8O2')
add('p1-mb-18o-bridge-hl', "[CH3:2][18O:1]C(=O)c1ccccc1", formula='C8H8O2', hl=[1, 2])
add('p1-smck-sites', "N[C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('p1-cystine-ss', "N[C@@H](C[S:1][S:2]C[C@H](N)C(=O)O)C(=O)O", formula='C6H12N2O4S2', hl=[1, 2])
add('p1-hkes-sites', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H33N7O8', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('p1-triol', "Oc1ccc(cc1)C(O)CCO", formula='C9H12O3')
add('p1-triol-sites', "[OH:1]c1ccc(cc1)[CH:4]([OH:2])C[CH2:5][OH:3]", formula='C9H12O3', hl=[4, 5], notes={1: "I", 4: "II", 5: "III"})
add('p1-ox-acid', "Oc1ccc(cc1)C(O)CC(=O)O", formula='C9H10O4')
add('p1-ox-ketoacid', "Oc1ccc(cc1)C(=O)CC(=O)O", formula='C9H8O4')
add('p1-ox-aldehyde', "Oc1ccc(cc1)C(O)CC=O", formula='C9H10O3')
add('p1-ox-ketone', "Oc1ccc(cc1)C(=O)CCO", formula='C9H10O3')
add('p1-cholesterol-oh', "C[C@H](CCCC(C)C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CC=C4[C@@]3(CC[C@@H](C4)[OH:1])C)C", formula='C27H46O', hl=[1])
add('p1-serine', "N[C@@H](CO)C(=O)O", formula='C3H7NO3')
add('p1-leucine', "N[C@@H](CC(C)C)C(=O)O", formula='C6H13NO2')
add('p1-aspartate', "N[C@@H](CC(=O)O)C(=O)O", formula='C4H7NO4')
add('p1-lysine', "N[C@@H](CCCCN)C(=O)O", formula='C6H14N2O2')
add('p1-atp-sites', "Nc1ncnc2n(cnc12)[C@@H:4]1O[C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O[P:3](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('p1-atp-gamma', "Nc1ncnc2n(cnc12)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)O[P:3](=O)([OH:5])[OH:6])[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', hl=[3, 5, 6])
add('p1-pentenenitrile-sites', "[CH3:1]/[CH:2]=[CH:5]/[CH2:3][C:4]#N", formula='C5H7N', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('p1-pentenenitrile-hl', "C/[CH:2]=[CH:5]/CC#N", formula='C5H7N', hl=[2, 5])
add('p1-tributyrin', "CCCC(=O)OCC(COC(=O)CCC)OC(=O)CCC", formula='C15H26O6')
add('p1-tributyrin-cut', "CCC[C:1](=O)[O:2]CC(C[O:4][C:3](=O)CCC)OC(=O)CCC", formula='C15H26O6', hl=[1, 2, 3, 4])
add('p1-2-mag', "CCCC(=O)OC(CO)CO", formula='C7H14O4')
add('p1-1-mag', "CCCC(=O)OCC(O)CO", formula='C7H14O4')
add('p1-12-dag', "CCCC(=O)OCC(CO)OC(=O)CCC", formula='C11H20O5')
add('p1-glycerol', "OCC(O)CO", formula='C3H8O3')
add('p1-cellobiose', "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11')
add('p1-cellobiose-num', "O[CH2:6][C@H]1O[C@@H:1]([O:9][C@H:4]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[1, 9, 4], notes={1: "C1", 6: "C6"})
add('p1-3-deoxyribose', "OC[C@H]1OC(O)[C@H](O)C1", formula='C5H10O4')
add('p1-2-deoxyglucose', "OC[C@H]1OC(O)C[C@@H](O)[C@@H]1O", formula='C6H12O5')
add('p1-deoxyribose-c2', "OC[C@H]1O[CH:1](O)[CH2:2][C@@H]1O", formula='C5H10O4', hl=[2], notes={1: "C1'", 2: "C2'"})
add('aldol-3-hydroxybutanal', "CC(O)CC=O", formula='C4H8O2')
add('aldol-3-hydroxybutanal-hl', "C[CH:1](O)[CH2:2]C=O", formula='C4H8O2', hl=[1, 2])
add('crotonaldehyde', "C/C=C/C=O", formula='C4H6O')
add('2-hydroxybutanal', "CCC(O)C=O", formula='C4H8O2')
add('testosterone', "C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@@H]2O)CCC4=CC(=O)CC[C@]34C", formula='C19H28O2')
add('dopamine', "NCCc1ccc(O)c(O)c1", formula='C8H11NO2')
add('arg-uncharged', "NC(CCCNC(N)=N)C(=O)O", formula='C6H14N4O2')
add('arg-sc-neutral', "[NH3+]C(CCCNC(N)=N)C(=O)[O-]", formula='C6H14N4O2')
add('arg-net-plus1', "[NH3+]C(CCCNC(N)=[NH2+])C(=O)[O-]", formula='C6H15N4O2+')
add('arg-net-plus2', "[NH3+]C(CCCNC(N)=[NH2+])C(=O)O", formula='C6H16N4O2+2')
add('asp-ca-sites', "CC(=O)[NH:2][CH:3](C[C:4](=O)[O-:1])C(=O)NC", formula='C7H11N2O4-', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('asp-ca-sites-o', "CC(=O)[NH:2][CH:3](C[C:4](=[O:5])[O-:1])C(=O)NC", formula='C7H11N2O4-', hl=[1, 5], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('ser-ala-sites', "[NH2:3]C(C[OH:2])C(=O)[NH:1]C(C)C(=O)[OH:4]", formula='C6H12N2O4', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('ser-ala-amide-hl', "[NH2:3]C(C[OH:2])[C:5](=[O:6])[NH:1]C(C)C(=O)[OH:4]", formula='C6H12N2O4', hl=[1, 5, 6], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('hydroxymethyluracil', "OCc1c[nH]c(=O)[nH]c1=O", formula='C5H6N2O3')
add('hydroxymethyluracil-hl', "[OH:2][CH2:1]c1c[nH]c(=O)[nH]c1=O", formula='C5H6N2O3', hl=[1, 2])
add('thymine-methyl-hl', "[CH3:1]c1c[nH]c(=O)[nH]c1=O", formula='C5H6N2O2', hl=[1])
add('polyacrylamide-segment', "CC(C(N)=O)CC(C(N)=O)CC(C(N)=O)C", formula='C10H19N3O3')
add('polyacrylamide-amides', "CC([C:1]([NH2:2])=[O:3])CC([C:4]([NH2:5])=[O:6])CC([C:7]([NH2:8])=[O:9])C", formula='C10H19N3O3', hl=[1, 2, 3, 4, 5, 6, 7, 8, 9])
add('propanoic-acid', "CCC(=O)O", formula='C3H6O2')
add('1-butanol-oh-hl', "CCC[CH2:1][OH:2]", formula='C4H10O', hl=[1, 2])
add('1-methylcyclohexanol', "CC1(O)CCCCC1", formula='C7H14O')
add('benzyl-alcohol', "OCc1ccccc1", formula='C7H8O')
add('1-methylcyclohexanol-hl', "C[C:1]1([OH:2])CCCCC1", formula='C7H14O', hl=[1])
add('3-3-dimethyl-2-butanol-hl', "C[CH:1]([OH:2])C(C)(C)C", formula='C6H14O', hl=[1])
add('2-chlorobut-2-ene-e', "C/C(Cl)=C\\C", formula='C4H7Cl')
add('2-chlorobut-2-ene-e-hl', "C/C([Cl:1])=C\\[CH3:2]", formula='C4H7Cl', hl=[1, 2])
add('diethylamine-nh-hl', "CC[NH:1]CC", formula='C4H11N', hl=[1])
add('drug-nitrogens-sites', "CC(=O)[N:1](C)CC[N:2](C)CC[NH:3]Cc1ccc(cc1)C=[N:4]C", formula='C17H28N4O', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('drug-nitrogens-ii', "CC(=O)[N:1](C)CC[N:2](C)CC[NH:3]Cc1ccc(cc1)C=[N:4]C", formula='C17H28N4O', hl=[2], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('ethyl-5-oxohexanoate', "CCOC(=O)CCCC(C)=O", formula='C8H14O3')
add('ethyl-5-hydroxyhexanoate-ring', "CCO[C:1](=O)[CH2:2][CH2:3][CH2:4][CH:5](C)[OH:6]", formula='C8H16O3', hl=[1, 2, 3, 4, 5, 6])
add('delta-hexalactone', "CC1CCCC(=O)O1", formula='C6H10O2')
add('gamma-hexalactone', "CCC1CCC(=O)O1", formula='C6H10O2')
add('epsilon-caprolactone', "O=C1CCCCCO1", formula='C6H10O2')
add('hexane-1-5-diol', "CC(O)CCCCO", formula='C6H14O2')
add('morpholinium', "C1COCC[NH2+]1", formula='C4H10NO+')
add('morpholine', "C1COCCN1", formula='C4H9NO')
add('morpholine-anion', "C1COCC[N-]1", formula='C4H8NO-')
add('1-bromobutyl-carbanion', "CCC[CH-]Br", formula='C4H8Br-')
add('morpholine-n-hl', "C1COCC[NH:1]1", formula='C4H9NO', hl=[1])
add('ibuprofen-isobutyl-hl', "[CH3:1][CH:2]([CH3:3])[CH2:4]c1ccc(cc1)C(C)C(=O)O", formula='C13H18O2', hl=[1, 2, 3, 4])
add('cyanophenyl-butynone', "CC(=O)C#Cc1ccc(C#N)cc1", formula='C11H7NO')
add('cyanophenyl-butynone-pi', "C[C:1](=[O:2])[C:3]#[C:4][c:5]1[cH:6][cH:7][c:8]([C:9]#[N:10])[cH:11][cH:12]1", formula='C11H7NO', hl=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
add('pnpp-sites', "[O-:1][P:2](=O)([O-])[O:3][c:4]1ccc(cc1)[N+](=O)[O-]", formula='C6H4NO6P-2', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('pnpp-p-hl', "[O-:1][P:2](=O)([O-])[O:3][c:4]1ccc(cc1)[N+](=O)[O-]", formula='C6H4NO6P-2', hl=[2], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('uracil-4-enol', "O=c1nc(O)cc[nH]1", formula='C4H4N2O2')
add('uracil-2-enol', "O=c1cc[nH]c(O)n1", formula='C4H4N2O2')
add('uracil-dienol', "Oc1ccnc(O)n1", formula='C4H4N2O2')
add('uracil-pairing-face', "[O:2]=c1cc[nH]c(=O)[nH:1]1", formula='C4H4N2O2', hl=[1, 2])
add('2-phenylethanol', "OCCc1ccccc1", formula='C8H10O')
add('phenylalanine-plain', "N[C@@H](Cc1ccccc1)C(=O)O", formula='C9H11NO2')
add('tyrosine-plain', "N[C@@H](Cc1ccc(O)cc1)C(=O)O", formula='C9H11NO3')
add('pyridylethanol', "OCCc1ccncc1", formula='C7H9NO')
add('pyridylethanol-n', "OCCc1cc[n:1]cc1", formula='C7H9NO', hl=[1])
add('phenethyl-methyl-ether', "COCCc1ccccc1", formula='C9H12O')
add('4-chlorophenylethanol', "OCCc1ccc(Cl)cc1", formula='C8H9ClO')
add('4-methylphenylethanol', "OCCc1ccc(C)cc1", formula='C9H12O')
add('acetophenone', "CC(=O)c1ccccc1", formula='C8H8O')
add('acetophenone-hl', "C[C:1](=O)c1ccccc1", formula='C8H8O', hl=[1])
add('1-phenylethanol', "CC(O)c1ccccc1", formula='C8H10O')
add('1-phenylethanol-hl', "C[CH:1](O)c1ccccc1", formula='C8H10O', hl=[1])
add('phenylacetic-acid', "OC(=O)Cc1ccccc1", formula='C8H8O2')
add('ethylbenzene', "CCc1ccccc1", formula='C8H10')
add('fmn-sites', "Cc1cc2[n:2]c3c(=O)[nH:1]c(=O)[n:5]c-3[n:3](C[C@H](O)[C@H](O)[C@H](O)CO[P:4](=O)(O)O)c2cc1C", formula='C17H21N4O9P', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('fmnh2', "Cc1cc2c(cc1C)N(C[C@H](O)[C@H](O)[C@H](O)COP(=O)(O)O)C1=C([NH:2]2)C(=O)NC(=O)[NH:5]1", formula='C17H23N4O9P', hl=[2, 5])
add('silicon-tetrafluoride', "F[Si](F)(F)F", formula='F4Si')
add('carbon-disulfide', "S=C=S", formula='CS2')
add('boron-trichloride', "ClB(Cl)Cl", formula='BCl3')
add('phosphorus-trichloride', "ClP(Cl)Cl", formula='Cl3P')
add('pyrazole', "c1cn[nH]c1", formula='C3H4N2')
add('pyrazole-c', "[cH:1]1[cH:2]n[nH][cH:3]1", formula='C3H4N2', hl=[1, 2, 3])
add('serine-sites', "[NH2:1][C@@H:2]([CH2:4]O)[C:3](=O)O", formula='C3H7NO3', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('serine-alpha', "[NH2:1][C@@H:2]([CH2:4]O)[C:3](=O)O", formula='C3H7NO3', hl=[2], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('octyl-glucoside', "CCCCCCCCO[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O", formula='C14H28O6')
add('octyl-glucoside-tail', "[CH3:1][CH2:2][CH2:3][CH2:4][CH2:5][CH2:6][CH2:7][CH2:8]O[C@@H]1O[C@H](CO)[C@@H](O)[C@H](O)[C@H]1O", formula='C14H28O6', hl=[1, 2, 3, 4, 5, 6, 7, 8])
add('r-limonene', "CC1=CC[C@@H:1](CC1)C(=C)C", formula='C10H16', hl=[1])
add('s-limonene', "CC1=CC[C@H:1](CC1)C(=C)C", formula='C10H16', hl=[1])
add('aminomethyl-phe', "N[C@@H](Cc1ccc(CN)cc1)C(=O)O", formula='C10H14N2O2')
add('aminomethyl-phe-hl', "N[C@@H](Cc1ccc([CH2:2][NH2:1])cc1)C(=O)O", formula='C10H14N2O2', hl=[1, 2])
add('3-pentanone', "CCC(=O)CC", formula='C5H10O')
add('3-pentanone-hl', "CC[C:1](=O)CC", formula='C5H10O', hl=[1])
add('pentanal', "CCCCC=O", formula='C5H10O')
add('cyclopentanol', "OC1CCCC1", formula='C5H10O')
add('tetrahydropyran', "C1CCOCC1", formula='C5H10O')
add('acid-sites', "[NH3+:1]Cc1cc(CCCC(=O)[OH:3])c(C[OH:4])cc1C(F)(F)C(=O)[OH:2]", formula='C14H18F2NO5+', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('acid-sites-f', "[NH3+:1]Cc1cc(CCCC(=O)[OH:3])c(C[OH:4])cc1C([F:5])([F:6])C(=O)[OH:2]", formula='C14H18F2NO5+', hl=[5, 6], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('ethylphenylhexanol-sites', "CC[C:1](O)(CC)[CH2:2][CH:3](C)[c:4]1ccccc1", formula='C14H22O', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('ethylphenylhexanol-c5', "CC[C:1](O)(CC)[CH2:2][CH:3](C)[c:4]1ccccc1", formula='C14H22O', hl=[3], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('heptanoic-acid', "CCCCCCC(=O)O", formula='C7H14O2')
add('e-3-heptene', "CC/C=C/CCC", formula='C7H14')
add('cis-tert-butyl-3-methylcyclohexane', "C[C@@H]1CCC[C@H](C(C)(C)C)C1", formula='C11H22')
add('aminoimine-nitrile-sites', "N#[C:1][CH2:3][C:2](C)=NCC[NH2:4]", formula='C6H11N3', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('aminoimine-nitrile-c2', "N#[C:1][CH2:3][C:2](C)=NCC[NH2:4]", formula='C6H11N3', hl=[2], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('methylimidazole-sites', "[CH3:4]c1c[nH:1][cH:2][n:3]1", formula='C4H6N2', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('methylimidazole-n3', "[CH3:4]c1c[nH:1][cH:2][n:3]1", formula='C4H6N2', hl=[3], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('hydroxyethylacetamide-sites', "[CH3:4]C(=[O:1])[NH:3]CC[OH:2]", formula='C4H9NO2', notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('hydroxyethylacetamide-o1', "[CH3:4]C(=[O:1])[NH:3]CC[OH:2]", formula='C4H9NO2', hl=[1], notes={1: "I", 2: "II", 3: "III", 4: "IV"})
add('glutamate-net0', "[NH3+][C@@H](CCC(=O)O)C(=O)[O-]", formula='C5H9NO4')
add('glutamate-net-minus1', "[NH3+][C@@H](CCC(=O)[O-])C(=O)[O-]", formula='C5H8NO4-')
add('glutamate-net-plus1', "[NH3+][C@@H](CCC(=O)O)C(=O)O", formula='C5H10NO4+')
add('glutamate-net-minus2', "N[C@@H](CCC(=O)[O-])C(=O)[O-]", formula='C5H7NO4-2')
add('atp-nitrogens', "[NH2:1]c1[n:2]c[n:3]c2[n:4](c[n:5]c12)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', hl=[1, 2, 3, 4, 5])
add('t1-hq-oh', "[OH:1]c1ccc([OH:2])cc1", formula='C6H6O2', hl=[1, 2], notes={1: "O\u2013H: gives H-bond", 2: "O\u2013H: gives H-bond"})
add('t1-hq-read', "[OH:1][c:2]1[cH:3]ccc(O)c1", formula='C6H6O2', notes={2: "corner = carbon", 3: "hidden H here", 1: "O and H atoms"})
add('t1-silica-model', "C[Si:2](C)(C)[OH:1]", formula='C3H10OSi', hl=[1], notes={2: "plate surface (model)", 1: "polar O\u2013H"})
add('t1-hexane', "[CH3:1]CCCC[CH3:2]", formula='C6H14', notes={1: "only C and H", 2: "nonpolar solvent"})
add('t1-dimethoxy-o', "C[O:1]c1ccc([O:2]C)cc1", formula='C8H10O2', hl=[1, 2], notes={1: "O, but no H", 2: "O, but no H"})
add('t1-acetophenone-o', "CC(=[O:1])c1ccccc1", formula='C8H8O', hl=[1], notes={1: "C=O: receives only"})
add('t1-dibromo-br', "[Br:1]c1ccc([Br:2])cc1", formula='C6H4Br2', hl=[1, 2], notes={1: "Br: no H-bond", 2: "heavy but slippery"})
add('t1-ala-ser-amide-ir', "N[C@@H](C)[C:1](=[O:2])[NH:3][C@@H](CO)C(=O)O", formula='C6H12N2O4', hl=[1, 2, 3], notes={2: "C=O \u2248 1650", 3: "N shares its pair"})
add('t1-ala-read', "[NH2:1][C@@H](C)[C:4](=[O:5])O", formula='C3H7NO2', notes={1: "N = nitrogen", 5: "= double bond", 4: "corner = carbon"})
add('t1-ala-cooh', "N[C@@H](C)[C:1](=[O:2])[OH:3]", formula='C3H7NO2', hl=[1, 2, 3], notes={1: "target carbon", 3: "OH will leave"})
add('t1-ser-nh2-oh', "[NH2:1][C@@H](C[OH:2])C(=O)O", formula='C3H7NO3', hl=[1, 2], notes={1: "spare pair: attacker?", 2: "spare pair: attacker?"})
add('t1-ala-ser-dkp-hl', "C[C@@H]1[NH:1][C:2](=O)[C@H](CO)[NH:3][C:4]1=O", formula='C6H10N2O3', hl=[1, 2, 3, 4], notes={2: "new link 1", 4: "new link 2"})
add('t1-ala-ser-ester-hl', "N[C@@H](C)[C:1](=[O:2])[O:3]C[C@H](N)C(=O)O", formula='C6H12N2O4', hl=[1, 2, 3], notes={2: "C=O \u2248 1740", 3: "ester O"})
add('t1-ala-ser-anhydride-hl', "N[C@@H](C)[C:1](=[O:2])[O:5][C:3](=[O:4])[C@@H](N)CO", formula='C6H12N2O4', hl=[1, 2, 3, 4, 5], notes={2: "C=O band 1", 4: "C=O band 2", 5: "shared O"})
add('t1-bb-primary', "CC[CH2:2][CH2:1]Br", formula='C4H9Br', hl=[1, 2], notes={1: "primary", 2: "neighbor: plain CH\u2082"})
add('t1-bb-read', "[CH3:1]C[CH2:2]C[Br:3]", formula='C4H9Br', notes={1: "line end = carbon", 2: "corner = carbon", 3: "Br = bromine"})
add('t1-1-iodobutane', "CCCC[I:1]", formula='C4H9I', hl=[1], notes={1: "I took Br's place"})
add('t1-bb-target', "CCC[CH2:1][Br:2]", formula='C4H9Br', hl=[1], notes={1: "electron-poor carbon", 2: "pulls electrons"})
add('t1-bb-backside', "CCC[CH2:1][Br:2]", formula='C4H9Br', hl=[1], notes={1: "I\u207b enters opposite Br", 2: "leaves as Br\u207b"})
add('t1-2-bromopropane-hl', "C[CH:1](C)Br", formula='C3H7Br', hl=[1], notes={1: "2 carbons: secondary"})
add('t1-tbu-br-hl', "C[C:1](C)(C)Br", formula='C4H9Br', hl=[1], notes={1: "3 carbons: tertiary"})
add('t1-tbu-br-block', "C[C:1](C)(C)[Br:2]", formula='C4H9Br', hl=[1], notes={1: "back side blocked \u2717"})
add('t1-neo-primary', "C[C:2](C)(C)[CH2:1]Br", formula='C5H11Br', hl=[1, 2], notes={1: "primary", 2: "neighbor: three CH\u2083 \u2717"})
add('t1-mb-num', "[CH3:1][CH:2](O)[CH:3](C)[CH3:4]", formula='C5H12O', notes={1: "C1", 2: "C2 (holds OH)", 3: "C3", 4: "C4"})
add('t1-mb-oxonium', "C[CH:2]([OH2+:1])C(C)C", formula='C5H13O+', hl=[1], notes={1: "OH grabbed H\u207a", 2: "C2"})
add('t1-mb-cation2', "C[CH+:1]C(C)C", formula='C5H11+', hl=[1], notes={1: "C2: + charge"})
add('t1-mb-br-c2', "C[CH:1]([Br:2])C(C)C", formula='C5H11Br', hl=[2], notes={2: "Br on C2", 1: "held the OH"})
add('t1-mb-ene1', "[CH2:1]=[CH:2]C(C)C", formula='C5H10', hl=[1, 2], notes={2: "C2", 1: "C=C touches C2"})
add('t1-mb-ene2', "C[CH:2]=[C:3](C)C", formula='C5H10', hl=[2, 3], notes={2: "C2", 3: "C=C touches C2"})
add('t1-mb-shift', "C[CH+:1][CH:2](C)C", formula='C5H11+', hl=[1, 2], notes={1: "+ here (2\u00b0)", 2: "H slides over"})
add('t1-mb-c3cation', "C[CH2:1][C+:2](C)C", formula='C5H11+', hl=[2], notes={2: "+ now here (3\u00b0)", 1: "old C2"})
add('t1-mb-br-c3', "C[CH2:1][C:2](C)(C)[Br:3]", formula='C5H11Br', hl=[3], notes={3: "Br on old C3", 1: "old C2"})
add('t1-bp-sn2', "CCC[C@H:1](C)Br", formula='C5H11Br', hl=[1], notes={1: "attacked carbon"})
add('t1-bp-read', "C[CH2:2]C[C@H:1](C)[Br:3]", formula='C5H11Br', notes={1: "4 different groups", 2: "corner = carbon", 3: "Br = bromine"})
add('t1-bp-leave', "CCC[C@H:2](C)[Br:1]", formula='C5H11Br', hl=[1], notes={1: "leaves as Br\u207b", 2: "HS\u207b bonds here"})
add('t1-bp-backside', "CCC[C@H:1](C)[Br:2]", formula='C5H11Br', hl=[1], notes={1: "HS\u207b enters back", 2: "Br exits front"})
add('t1-bp-rank', "CC[CH2:2][C@H]([CH3:3])[Br:1]", formula='C5H11Br', notes={1: "rank 1 (Br 35)", 2: "rank 2", 3: "rank 3"})
add('t1-thiol-r-rank', "CC[CH2:2][C@@H]([CH3:3])[SH:1]", formula='C5H12S', notes={1: "rank 1 (S 16)", 2: "rank 2", 3: "rank 3"})
add('t1-mb-bridge', "[CH3:2][18O:1]C(=[O:3])c1ccccc1", formula='C8H8O2', hl=[1], notes={1: "\u00b9\u2078O: bridging O", 3: "from the acid"})
add('t1-bz-read', "[OH:1][C:2](=[O:3])[c:4]1ccccc1", formula='C7H6O2', notes={3: "C=O double bond", 1: "OH group", 4: "ring = 6 carbons"})
add('t1-meoh-read', "[CH3:1][18OH:2]", formula='CH4O', hl=[2], notes={2: "\u00b9\u2078O = heavy tag"})
add('t1-meoh-18o-hl', "[CH3:2][18OH:1]", formula='CH4O', hl=[1, 2], notes={1: "tag starts here", 2: "bonded to CH\u2083"})
add('t1-bzoh-protonated', "O[C:1](=[OH+:2])c1ccccc1", formula='C7H7O2+', hl=[1, 2], notes={2: "grabbed H\u207a", 1: "now electron-poor"})
add('t1-tet-int', "OC(O)([18O:1][CH3:2])c1ccccc1", formula='C8H10O3', hl=[1, 2], notes={1: "\u00b9\u2078O bonded here", 2: "still on CH\u2083"})
add('t1-tet-oh2', "[OH2+:3]C(O)([18O:1]C)c1ccccc1", formula='C8H11O3+', hl=[1, 3], notes={3: "leaves as water", 1: "tag stays"})
add('t1-mb-carbonyl-x', "COC(=[18O:1])c1ccccc1", formula='C8H8O2', hl=[1], notes={1: "needs O\u2013CH\u2083 broken"})
add('t1-smck-read', "[NH2:5][C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', notes={5: "chain starts here", 1: "side chain I", 2: "side chain II", 3: "side chain III"})
add('t1-cys-sh', "N[C@@H](C[SH:1])C(=O)O", formula='C3H7NO2S', hl=[1], notes={1: "S\u2013H: can lose H"})
add('t1-cystine-notes', "N[C@@H](C[S:1][S:2]C[C@H](N)C(=O)O)C(=O)O", formula='C6H12N2O4S2', hl=[1, 2], notes={1: "strand 1 sulfur", 2: "strand 2 sulfur"})
add('t1-smck-iii', "N[C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', hl=[3], notes={3: "III: S\u2013H \u2713"})
add('t1-smck-ii', "N[C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', hl=[2], notes={2: "II: S, no H"})
add('t1-smck-i-iv', "N[C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', hl=[1, 4], notes={1: "I: O\u2013H \u2717", 4: "IV: NH\u2082 \u2717"})
add('t1-smck-rule', "N[C@@H](C[OH:1])C(=O)N[C@@H](CC[S:2]C)C(=O)N[C@@H](C[SH:3])C(=O)N[C@@H](CCCC[NH2:4])C(=O)O", formula='C17H33N5O6S2', notes={1: "I: is it S?", 2: "II: is it S?", 3: "III: is it S?", 4: "IV: is it S?"})
add('t1-hkes-read', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H33N7O8', notes={1: "I: His ring N", 2: "II: Lys NH\u2082", 3: "III: Glu COOH", 4: "IV: Ser OH"})
add('t1-asp-minus', "N[C@@H](CC(=O)[O-:1])C(=O)O", formula='C4H6NO4-', hl=[1], notes={1: "\u2212 charge (receptor)"})
add('t1-lys-plus', "N[C@@H](CCCC[NH3+:1])C(=O)O", formula='C6H15N2O2+', hl=[1], notes={1: "gained H\u207a \u2192 +"})
add('t1-glu-minus', "N[C@@H](CCC(=O)[O-:1])C(=O)O", formula='C5H8NO4-', hl=[1], notes={1: "lost H\u207a \u2192 \u2212"})
add('t1-hkes-lys-plus', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH3+:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H34N7O8+', hl=[2], notes={2: "II: NH\u2083\u207a, positive"})
add('t1-hkes-glu-minus', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[O-:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H32N7O8-', hl=[3], notes={3: "III: COO\u207b, negative"})
add('t1-hkes-his', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H33N7O8', hl=[1], notes={1: "I: ~4% charged"})
add('t1-hkes-ser', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H33N7O8', hl=[4], notes={4: "IV: never charged"})
add('t1-hkes-rule', "N[C@@H](Cc1c[nH]c[n:1]1)C(=O)N[C@@H](CCCC[NH2:2])C(=O)N[C@@H](CCC(=O)[OH:3])C(=O)N[C@@H](C[OH:4])C(=O)O", formula='C20H33N7O8', notes={1: "I: pKa 6.0", 2: "II: pKa 10.5", 3: "III: pKa 4.2", 4: "IV: no charge"})
add('t1-triol-classify', "[OH:1][c:4]1ccc(cc1)[CH:5]([OH:2])C[CH2:6][OH:3]", formula='C9H12O3', hl=[4, 5, 6], notes={4: "on ring: phenol", 5: "2 C's: secondary", 6: "1 C: primary"})
add('t1-triol-read', "[OH:1]c1ccc(cc1)C([OH:2])CC[OH:3]", formula='C9H12O3', hl=[1, 2, 3], notes={1: "OH #1", 2: "OH #2", 3: "OH #3"})
add('t1-triol-primary', "Oc1ccc(cc1)C(O)C[CH2:1][OH:2]", formula='C9H12O3', hl=[1, 2], notes={1: "1 carbon neighbor", 2: "primary OH"})
add('t1-ox-aldehyde-mid', "Oc1ccc(cc1)C(O)C[CH:1]=[O:2]", formula='C9H10O3', hl=[1, 2], notes={1: "stop 1: aldehyde"})
add('t1-ox-acid-hl', "Oc1ccc(cc1)C(O)C[C:1](=[O:2])[OH:3]", formula='C9H10O4', hl=[1, 2, 3], notes={1: "end: COOH"})
add('t1-triol-secondary', "Oc1ccc(cc1)[CH:1]([OH:2])CCO", formula='C9H12O3', hl=[1, 2], notes={1: "secondary: unchanged"})
add('t1-triol-phenol', "[OH:1][c:2]1ccc(cc1)C(O)CCO", formula='C9H12O3', hl=[1, 2], notes={1: "phenol: unchanged"})
add('t1-leucine-sc', "N[C@@H]([CH2:1][CH:2]([CH3:3])[CH3:4])C(=O)O", formula='C6H13NO2', hl=[1, 2, 3, 4], notes={2: "side chain: C,H only"})
add('t1-chol-read', "C[C@H](CCCC([CH3:3])C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C[CH:2]=C4[C@@]3(CC[C@@H](C4)[OH:1])C)C", formula='C27H46O', notes={1: "the only OH", 2: "4 fused rings", 3: "carbon tail"})
add('t1-chol-count', "C[C@H](CCCC([CH3:3])C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C[CH:2]=C4[C@@]3(CC[C@@H](C4)[OH:1])C)C", formula='C27H46O', hl=[1], notes={1: "1 polar spot", 2: "C and H only", 3: "C and H only"})
add('t1-chol-polar', "C[C@H](CCCC([CH3:3])C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C[CH:2]=C4[C@@]3(CC[C@@H](C4)[OH:1])C)C", formula='C27H46O', hl=[1], notes={1: "polar: O\u2013H", 2: "nonpolar: C\u2013H", 3: "nonpolar: C\u2013H"})
add('t1-chol-pocket', "C[C@H](CCCC([CH3:3])C)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C[CH:2]=C4[C@@]3(CC[C@@H](C4)[OH:1])C)C", formula='C27H46O', notes={2: "likes nonpolar neighbors", 3: "likes nonpolar neighbors"})
add('t1-serine-sc', "N[C@@H]([CH2:1][OH:2])C(=O)O", formula='C3H7NO3', hl=[1, 2], notes={2: "OH: polar"})
add('t1-asp-charged', "N[C@@H](CC(=O)[O-:1])C(=O)O", formula='C4H6NO4-', hl=[1], notes={1: "full \u2212 charge"})
add('t1-lys-charged', "N[C@@H](CCCC[NH3+:1])C(=O)O", formula='C6H15N2O2+', hl=[1], notes={1: "full + charge"})
add('t1-atp-greek', "[NH2:5]c1ncnc2n(cnc12)[C@@H:4]1[O:6][C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O[P:3](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', notes={1: "I: \u03b1 (near sugar)", 2: "II: \u03b2", 3: "III: \u03b3 (end)", 4: "IV: sugar carbon"})
add('t1-atp-read', "[NH2:5]c1ncnc2n(cnc12)[C@@H:4]1[O:6][C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O[P:3](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', notes={5: "adenine (base)", 6: "sugar ring", 1: "3 phosphates start"})
add('t1-atp-gamma-move', "[NH2:5]c1ncnc2n(cnc12)[C@@H:4]1[O:6][C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O[P:3](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', hl=[3], notes={3: "kinase moves this"})
add('t1-ser-oh-hl', "N[C@@H](C[OH:1])C(=O)O", formula='C3H7NO3', hl=[1], notes={1: "peptide's OH"})
add('t1-phosphoserine', "N[C@@H](C[O:1][P:2](=O)(O)O)C(=O)O", formula='C3H8NO6P', hl=[2], notes={2: "phosphate added"})
add('t1-adp', "Nc1ncnc2n(cnc12)[C@@H]1O[C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H15N5O10P2', hl=[1, 2], notes={1: "\u03b1 stays", 2: "\u03b2 stays"})
add('t1-atp-stay', "[NH2:5]c1ncnc2n(cnc12)[C@@H:4]1[O:6][C@H](CO[P:1](=O)(O)O[P:2](=O)(O)O[P:3](=O)(O)O)[C@@H](O)[C@H]1O", formula='C10H16N5O13P3', hl=[1, 2, 4], notes={1: "I: stays in ADP", 2: "II: stays in ADP", 4: "IV: stays in ADP"})
add('t1-pn-read', "[CH3:1]/C=[CH:5]/C[C:4]#[N:6]", formula='C5H7N', notes={1: "line end = CH\u2083", 5: "= double bond", 6: "\u2261 triple bond"})
add('t1-pn-i', "[CH3:1]/C=C/CC#N", formula='C5H7N', hl=[1], notes={1: "I: 4 groups"})
add('t1-pn-ii', "C/[CH:2]=C/CC#N", formula='C5H7N', hl=[2], notes={2: "II: 3 groups"})
add('t1-pn-iii', "C/C=C/[CH2:3]C#N", formula='C5H7N', hl=[3], notes={3: "III: 4 groups"})
add('t1-pn-iv', "C/C=C/C[C:4]#N", formula='C5H7N', hl=[4], notes={4: "IV: 2 groups"})
add('t1-pn-pi', "C/[CH:2]=[CH:5]/CC#N", formula='C5H7N', hl=[2, 5], notes={2: "\u03c0 bond: no twisting"})
add('t1-tributyrin-num', "CCCC(=O)O[CH2:1][CH:2]([CH2:3]OC(=O)CCC)OC(=O)CCC", formula='C15H26O6', hl=[1, 2, 3], notes={1: "C1", 2: "C2", 3: "C3"})
add('t1-tributyrin-esters', "CCC[C:1](=O)[O:2]CC(C[O:4][C:3](=O)CCC)[O:6][C:5](=O)CCC", formula='C15H26O6', hl=[1, 2, 3, 4, 5, 6], notes={1: "ester", 3: "ester", 5: "ester"})
add('t1-trib-cut1', "CCC[C:1](=O)[O:2]CC(COC(=O)CCC)OC(=O)CCC", formula='C15H26O6', hl=[1, 2], notes={1: "becomes COOH", 2: "keeps O \u2192 OH"})
add('t1-butanoic-acid', "CCC[C:1](=[O:2])[OH:3]", formula='C4H8O2', hl=[1, 2, 3], notes={3: "releases H\u207a"})
add('t1-trib-ends', "CCC[C:1](=O)OCC(CO[C:3](=O)CCC)[O:5]C(=O)CCC", formula='C15H26O6', hl=[1, 3], notes={1: "C1 ester: cut", 3: "C3 ester: cut", 5: "C2 ester: kept"})
add('t1-2-mag-c2', "CCCC(=O)O[CH:3]([CH2:4][OH:6])[CH2:5][OH:7]", formula='C7H14O4', hl=[3], notes={3: "C2: chain kept", 6: "now OH", 7: "now OH"})
add('t1-cellobiose-c4', "OC[C@H]1O[C@@H:1]([O:9][C@H:4]2[C@H](O)[C@@H](O)[CH:7](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[1, 9, 4], notes={1: "C1 (left sugar)", 4: "C4 (right sugar)", 7: "right sugar's C1"})
add('t1-cello-read', "OC[C@H]1[O:2][C@@H]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', notes={2: "O in ring: sugar", 9: "bridge between sugars"})
add('t1-cello-c1', "O[CH2:6][C@H]1O[C@@H:1]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[1], notes={1: "C1: two O's", 6: "C6 (CH\u2082OH)"})
add('t1-cello-face', "O[CH2:6][C@H]1O[C@@H:1]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[1, 6], notes={1: "C1's outside bond", 6: "compare with CH\u2082OH"})
add('t1-cello-beta', "O[CH2:6][C@H]1O[C@@H:1]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[1, 9], notes={9: "same side \u2192 \u03b2", 6: "CH\u2082OH side"})
add('t1-cello-cellulose', "O[CH2:6][C@H]1O[C@@H:1]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[9], notes={9: "\u03b2-link: cellulose"})
add('t1-maltose', "OC[C@H]1O[C@H]([O:9][C@H]2[C@H](O)[C@@H](O)C(O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O", formula='C12H22O11', hl=[9], notes={9: "\u03b1-link: starch"})
add('t1-dr-c2', "OC[C@H]1OC(O)[CH2:2][C@@H]1O", formula='C5H10O4', hl=[2], notes={2: "C2\u2032: no OH"})
add('t1-dr-read', "O[CH2:5][C@H]1[O:6][CH:1](O)C[C@@H]1O", formula='C5H10O4', notes={6: "O in ring: sugar", 1: "C1\u2032: two O's", 5: "C5\u2032"})
add('t1-thymine-base', "[CH3:1]c1c[nH]c(=O)[nH]c1=O", formula='C5H6N2O2', notes={1: "the T in dTTP"})
add('t1-ribose-c2oh', "OC[C@H]1OC(O)[C@H:2]([OH:5])[C@@H]1O", formula='C5H10O5', hl=[2, 5], notes={2: "C2\u2032 has OH"})
add('t1-ribose-o5', "[OH:1]C[C@H]1[O:2]C([OH:3])[C@H]([OH:4])[C@@H]1[OH:5]", formula='C5H10O5', hl=[1, 2, 3, 4, 5], notes={4: "5th O: too many"})
add('t1-2-deoxyglucose-c6', "O[CH2:6][C@H]1OC(O)C[C@@H](O)[C@@H]1O", formula='C6H12O5', hl=[6], notes={6: "6th carbon \u2717"})
add('t1-3-deoxyribose-c3', "OC[C@H]1OC(O)[C@H](O)[CH2:3]1", formula='C5H10O4', hl=[3], notes={3: "C3\u2032: no OH"})
add('t1-deoxyribose-3oh', "OC[C@H]1OC(O)C[C@@H:3]1[OH:5]", formula='C5H10O4', hl=[3, 5], notes={5: "C3\u2032 OH: links chain"})

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

def fix_notes_and_radicals(svg):
    """RDKit writes an atom note one letter per <text> ('III' shows as 'I I I') and draws radical
    electrons as sub-pixel dots. Join each note into one bold word, and redraw each dot so it is visible."""
    notes = list(re.finditer(r"<text x='([\d.]+)' y='([\d.]+)' class='note' style='([^']*)' >([^<]*)</text>", svg))
    groups, cur = [], []
    for m in notes:
        if cur and (m.group(2) != cur[-1].group(2) or float(m.group(1)) - float(cur[-1].group(1)) > 9 or svg[cur[-1].end():m.start()].strip()):
            groups.append(cur); cur = []
        cur.append(m)
    if cur: groups.append(cur)
    for g in reversed(groups):
        style = g[0].group(3).replace('font-weight:normal', 'font-weight:bold').replace('fill:#000000', 'fill:#9A3412')
        style = re.sub(r'font-size:\d+px', 'font-size:14px', style)
        word = ''.join(m.group(4) for m in g)
        svg = svg[:g[0].start()] + f"<text x='{g[0].group(1)}' y='{g[0].group(2)}' class='note' style='{style}' >{word}</text>" + svg[g[-1].end():]
    def dot(m):
        pts = [tuple(map(float, xy.split(','))) for xy in re.findall(r'(-?[\d.]+,-?[\d.]+)', m.group(2))]
        xs, ys = [x for x, _ in pts], [y for _, y in pts]
        if not pts or max(xs) - min(xs) > 3 or max(ys) - min(ys) > 3 or len(pts) < 12: return m.group(0)
        return f"<circle class='{m.group(1)} radical' cx='{(max(xs) + min(xs)) / 2:.1f}' cy='{(max(ys) + min(ys)) / 2:.1f}' r='2.6' style='fill:#000000;stroke:none' />"
    return re.sub(r"<path class='(atom-\d+)' d='([^']*)' style='fill:#000000;fill-rule:evenodd[^']*' />", dot, svg)

def site_labels(d, m, notes):
    """Exam-style labels on the drawing. A one- or two-character site label ('I'-'IV') sits outside the
    molecule with a short arrow to its atom, as on AAMC figures. A longer callout ('carbonyl carbon') is a
    filled tag sized to its text, pushed out until it clears every atom, bond and earlier label."""
    import math
    P = {a.GetIdx(): (d.GetDrawCoords(a.GetIdx()).x, d.GetDrawCoords(a.GetIdx()).y) for a in m.GetAtoms()}
    pts = list(P.values())
    for bd in m.GetBonds():                              # bond midpoints and quarter points: keep tags off bonds
        (x1, y1), (x2, y2) = P[bd.GetBeginAtomIdx()], P[bd.GetEndAtomIdx()]
        pts += [(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t) for t in (0.25, 0.5, 0.75)]
    def gap_pt(cx, cy, hw, hh, px, py):                  # distance from a point to a box
        return math.hypot(max(abs(px - cx) - hw, 0), max(abs(py - cy) - hh, 0))
    def gap_box(a, b):
        return math.hypot(max(abs(a[0] - b[0]) - a[2] - b[2], 0), max(abs(a[1] - b[1]) - a[3] - b[3], 0))
    boxes, out = [], []
    for idx, label in notes.items():
        x, y = P[idx]
        short = len(label) <= 2
        hw, hh = (len(label) * 5.2 + 4, 11) if short else (len(label) * 4.9 + 8, 13)
        nb = [P[n.GetIdx()] for n in m.GetAtomWithIdx(idx).GetNeighbors()]
        base = math.atan2(y - sum(v[1] for v in nb) / len(nb), x - sum(v[0] for v in nb) / len(nb)) if nb else -math.pi / 2
        best = None
        for k in range(24):                              # 24 directions, open side first
            ang = base + (k // 2) * (math.pi / 12) * (1 if k % 2 == 0 else -1)
            ux, uy = math.cos(ang), math.sin(ang)
            ext = min(hw / max(abs(ux), 1e-6), hh / max(abs(uy), 1e-6))   # center-to-edge distance along this direction
            for dist in (24, 34, 46, 60, 76):
                cx, cy = x + ux * (dist + ext), y + uy * (dist + ext)
                clear = min([gap_pt(cx, cy, hw, hh, px, py) for px, py in pts] + [gap_box((cx, cy, hw, hh), bx) for bx in boxes] + [99])
                score = min(clear, 22) * 3 - 0.15 * (k // 2) - 0.12 * dist
                if best is None or score > best[0]: best = (score, ux, uy, cx, cy, ext)
        _, ux, uy, cx, cy, ext = best
        boxes.append((cx, cy, hw, hh))
        # Arrow from the label's edge to just short of the atom.
        sx, sy = cx - ux * (ext + 2), cy - uy * (ext + 2)
        ex, ey = x + ux * 11, y + uy * 11
        if math.hypot(sx - ex, sy - ey) > 4:
            hx1, hy1 = ex + 6 * (ux * math.cos(0.5) - uy * math.sin(0.5)), ey + 6 * (uy * math.cos(0.5) + ux * math.sin(0.5))
            hx2, hy2 = ex + 6 * (ux * math.cos(-0.5) - uy * math.sin(-0.5)), ey + 6 * (uy * math.cos(-0.5) + ux * math.sin(-0.5))
            out.append(f"<path class='site-arrow' d='M {sx:.1f},{sy:.1f} L {ex:.1f},{ey:.1f} M {hx1:.1f},{hy1:.1f} L {ex:.1f},{ey:.1f} L {hx2:.1f},{hy2:.1f}' style='fill:none;stroke:#9A3412;stroke-width:1.8px' />")
        if short:
            out.append(f"<text x='{cx:.1f}' y='{cy + 5.5:.1f}' class='note' style='font-size:16px;font-weight:bold;fill:#9A3412;font-family:sans-serif;text-anchor:middle' >{label}</text>")
        else:
            out.append(f"<rect class='note-tag' x='{cx - hw:.1f}' y='{cy - hh:.1f}' width='{2 * hw:.1f}' height='{2 * hh:.1f}' rx='5' style='fill:#9A3412;stroke:none' />")
            out.append(f"<text x='{cx:.1f}' y='{cy + 5.5:.1f}' class='note-tag-text' style='font-size:15px;font-weight:bold;fill:#FFFFFF;font-family:sans-serif;text-anchor:middle' >{label}</text>")
    return ''.join(out), boxes

def min_gap(m):
    # Smallest distance between atoms that are not bonded: small means a crowded, overlapping layout.
    c = m.GetConformer(); best = 9e9
    for i in range(m.GetNumAtoms()):
        for j in range(i + 1, m.GetNumAtoms()):
            if m.GetBondBetweenAtoms(i, j): continue
            p, q = c.GetAtomPosition(i), c.GetAtomPosition(j)
            best = min(best, ((p.x - q.x) ** 2 + (p.y - q.y) ** 2) ** 0.5)
    return best

def draw(m, hl):
    # Lay out with CoordGen and with RDKit's own method; keep whichever leaves atoms least crowded.
    rdDepictor.SetPreferCoordGen(True); rdDepictor.Compute2DCoords(m); a_gap = min_gap(m); a_pos = Chem.Mol(m)
    rdDepictor.SetPreferCoordGen(False); rdDepictor.Compute2DCoords(m); b_gap = min_gap(m)
    if a_gap >= b_gap * 0.95: m.RemoveAllConformers(); m.AddConformer(a_pos.GetConformer(), assignId=True)
    rdDepictor.SetPreferCoordGen(True)
    # Site labels (I–IV) are drawn by site_labels(), not by RDKit's atom notes, so they never collide.
    notes = {a.GetIdx(): a.GetProp('atomNote') for a in m.GetAtoms() if a.HasProp('atomNote')}
    for a in m.GetAtoms():
        if a.HasProp('atomNote'): a.ClearProp('atomNote')
    d = rdMolDraw2D.MolDraw2DSVG(-1, -1, noFreetype=True)
    o = d.drawOptions()
    o.clearBackground = False; o.bondLineWidth = 2; o.fixedBondLength = 40 if notes else 32; o.padding = 0.12
    o.minFontSize = 13; o.additionalAtomLabelPadding = 0.1
    o.setHighlightColour((1.0, 0.82, 0.3))
    for a in m.GetAtoms(): a.SetAtomMapNum(0)
    hs = set(hl or [])
    # A highlighted group (2+ atoms) also lights its bonds, including the one joining it to the rest of the molecule.
    hb = [b.GetIdx() for b in m.GetBonds() if len(hs) > 1 and (b.GetBeginAtomIdx() in hs or b.GetEndAtomIdx() in hs)]
    rdMolDraw2D.PrepareAndDrawMolecule(d, m, highlightAtoms=list(hs), highlightBonds=hb)
    extra, placed = site_labels(d, m, notes) if notes else ('', [])
    d.FinishDrawing()
    svg = d.GetDrawingText()
    if extra:
        svg = svg.replace('</svg>', extra + '</svg>')
        # Grow the frame so every label fits (labels may sit past RDKit's own margins).
        w0, h0 = float(re.search(r"width='([\d.]+)px'", svg).group(1)), float(re.search(r"height='([\d.]+)px'", svg).group(1))
        x0 = min([0.0] + [x - w - 4 for x, _, w, _ in placed]); y0 = min([0.0] + [y - h - 4 for _, y, _, h in placed])
        x1 = max([w0] + [x + w + 4 for x, _, w, _ in placed]); y1 = max([h0] + [y + h + 4 for _, y, _, h in placed])
        svg = re.sub(r"width='[\d.]+px' height='[\d.]+px' viewBox='[^']*'", f"width='{x1 - x0:.0f}px' height='{y1 - y0:.0f}px' viewBox='{x0:.0f} {y0:.0f} {x1 - x0:.0f} {y1 - y0:.0f}'", svg, count=1)
    svg = fix_notes_and_radicals(svg)
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
    # notes={map: 'I'} labels atoms the way exam figures point at sites I–IV.
    for a in m.GetAtoms():
        if a.GetAtomMapNum() in checks.get('notes', {}): a.SetProp('atomNote', checks['notes'][a.GetAtomMapNum()])
    if 'radicals' in checks:
        got = sum(a.GetNumRadicalElectrons() for a in m.GetAtoms())
        if got != checks['radicals']: raise SystemExit(f'{name}: {got} radical electrons != {checks["radicals"]}')
    out[name] = draw(Chem.Mol(m), hl)

for name, (smi, sc) in SIDECHAIN.items():
    m = Chem.MolFromSmiles(smi)
    out[name] = draw(m, sc)

# Ship only the drawings the Practice Exam walkthroughs show (every entry above is still built and checked).
root = Path(__file__).resolve().parent.parent
cards = (root / 'data/qb-aamc-fl.js').read_text(encoding='utf-8')
used = set()
for m in re.finditer(r'"?(?:fig|choiceFigs)"?:\s*("([^"]+)"|\[([^\]]*)\])', cards):
    used.update([m.group(2)] if m.group(2) else re.findall(r'"([^"]+)"', m.group(3)))
missing = used - set(out)
if missing: raise SystemExit('cards use undrawn structures: ' + ', '.join(sorted(missing)))
out = {k: v for k, v in out.items() if k in used}

src = hashlib.sha256(Path(__file__).read_bytes().replace(b'\r\n', b'\n')).hexdigest()[:16]  # line-ending independent (CI runs on Windows too)
body = ',\n'.join(f'  {json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}' for k, v in out.items())
js = (f'// Generated by tools/draw-structures.py (source {src}). Do not edit by hand.\n'
      f'// Skeletal structures drawn with RDKit; each is checked (formula, stereocenters, R/S, E/Z) before writing.\n'
      f'const STRUCT_SVG = {{\n{body}\n}};\n')
Path(__file__).resolve().parent.parent.joinpath('data/structures.js').write_text(js, encoding='utf-8')
print(f'{len(out)} structures, {len(js) // 1024} KB')
