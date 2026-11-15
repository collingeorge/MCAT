// Chem/Phys Diagnostic: original passages and stand-alone questions written to the AAMC C/P blueprint
// (10 passages + 15 stand-alones, 59 questions, 95 minutes, in the exam's order). Not AAMC material.
const CP_DIAG = {
 "id": "cp_diag",
 "title": "Chem/Phys Diagnostic",
 "timeMin": 95,
 "order": [
  "p_cpd_1",
  "p_cpd_3",
  4,
  "p_cpd_s1",
  "p_cpd_6",
  "p_cpd_7",
  4,
  "p_cpd_4",
  "p_cpd_2",
  "p_cpd_5",
  4,
  "p_cpd_9",
  "p_cpd_8",
  3
 ],
 "passages": [
  {
   "id": "p_cpd_1",
   "subj": "biochemistry",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5D"
   ],
   "title": "Carnosine Analogs That Resist Serum Carnosinase",
   "passage": "Carnosine (β-alanyl-L-histidine, Compound 1) is a dipeptide found at millimolar concentrations in skeletal muscle and brain. Its N-terminal residue is β-alanine, in which the amino group is attached to the carbon two positions away from the carbonyl carbon instead of to the α-carbon. Carnosine helps buffer the H⁺ released during intense exercise, and its imidazole ring can coordinate Cu²⁺ and Zn²⁺. In carnosine, the carboxyl, imidazole and amino groups have pKa values of 2.6, 6.8 and 9.4, respectively.\n\nCarnosine also scavenges reactive aldehydes such as 4-hydroxynonenal (HNE), a product of lipid peroxidation that forms covalent adducts with lysine and cysteine side chains. Because HNE-modified proteins accumulate in the diabetic kidney and retina, carnosine has been proposed as a therapy. Its use is limited by serum carnosinase (CN1), a zinc-dependent hydrolase that cleaves carnosine into its two amino acids (Figure 1). Human serum contains far more CN1 activity than rodent serum, so studies in mice may overstate how long carnosine survives in patients.\n\nTo find a form of carnosine that resists CN1 but keeps its useful properties, researchers compared Compound 1 with three related compounds (Figure 2): anserine (Compound 2), which carries a methyl group on the ring nitrogen nearest the side chain; D-carnosine (Compound 3), which contains D-histidine; and N-acetylcarnosine (Compound 4). Each compound (1.0 mM) was incubated in pooled human serum at 37°C, and the amount remaining was measured by HPLC at several times. In a separate assay, each compound (5.0 mM) was mixed with 0.50 mM HNE in pH 7.4 phosphate buffer, and the HNE remaining after 1 hour was measured. The imidazole pKa of each compound was found by titration. The results are shown in Table 1.",
   "scheme": [
    {
     "after": 1,
     "caption": "Figure 1 Hydrolysis of carnosine (Compound 1) by CN1",
     "parts": [
      "cpd-carnosine",
      {
       "arrow": "CN1, H₂O"
      },
      "cpd-beta-alanine",
      "+",
      "cpd-l-histidine"
     ]
    },
    {
     "after": 2,
     "caption": "Figure 2 Compounds 2–4",
     "parts": [
      "cpd-anserine",
      "cpd-d-carnosine",
      "cpd-n-acetylcarnosine"
     ]
    }
   ],
   "figure": {
    "caption": "Table 1 Properties of carnosine and three analogs",
    "columns": [
     "Compound",
     "Molar mass (g/mol)",
     "Imidazole pKa",
     "Half-life in human serum (min)",
     "HNE removed in 1 h (%)"
    ],
    "rows": [
     [
      "1 Carnosine",
      "226",
      "6.8",
      "5",
      "62"
     ],
     [
      "2 Anserine",
      "240",
      "7.0",
      "40",
      "58"
     ],
     [
      "3 D-Carnosine",
      "226",
      "6.8",
      ">240",
      "61"
     ],
     [
      "4 N-Acetylcarnosine",
      "268",
      "6.8",
      ">240",
      "4"
     ]
    ]
   },
   "questions": [
    {
     "q": "Unlike the alanine residues found in proteins, the β-alanine residue of Compound 1:",
     "choices": [
      "has no stereocenter, because none of its carbons is bonded to four different groups.",
      "has the D configuration, which is why Compound 1 is cleaved by CN1.",
      "has its amino group on the carbon directly bonded to the carboxyl carbon.",
      "has a side chain that carries a negative charge at pH 7.4."
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "β-Alanine is H₂N–CH₂–CH₂–COOH. Each of its two CH₂ carbons carries **two hydrogens**, so neither is bonded to four different groups, and the residue has **no stereocenter**. Alanine (H₂N–CH(CH₃)–COOH) is chiral because its α-carbon bears H, CH₃, NH₂ and COOH. The only stereocenter in Compound 1 is the histidine α-carbon.\n\nWithout a stereocenter, β-alanine cannot be D or L.\nThe amino group on the carbon next to the carboxyl carbon describes an **α**-amino acid; the passage says β-alanine's amino group is one carbon farther away.\nβ-Alanine has no side chain at all, let alone a negatively charged one.",
     "id": "p_cpd_1_q1"
    },
    {
     "q": "Based on the pKa values given in the passage, what is the isoelectric point of Compound 1?",
     "choices": [
      "4.7",
      "6.0",
      "6.3",
      "8.1"
     ],
     "ans": 3,
     "cat": "5D",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "Track the net charge as the pH rises. Below pH 2.6, all three groups are protonated: –COOH (0), imidazolium (+1) and –NH₃⁺ (+1), net **+2**. Above 2.6 the carboxyl is ionized (−1): net **+1**. Above 6.8 the imidazole loses its H⁺: net **0**. Above 9.4 the amine loses its H⁺: net **−1**.\n\nThe neutral form exists between the two pKa values on either side of it, so **pI = (6.8 + 9.4) ÷ 2 = 8.1**. (At pH 7.4, Compound 1 is therefore slightly positive, about +0.2.)\n\n**4.7** = (2.6 + 6.8) ÷ 2 averages the pKa values that bracket the +1 form, the rule for an amino acid with an acidic side chain.\n**6.0** = (2.6 + 9.4) ÷ 2 ignores the imidazole, as if Compound 1 were a simple amino acid.\n**6.3** averages all three pKa values.",
     "id": "p_cpd_1_q2"
    },
    {
     "q": "Which conclusion about the structure of Compound 1 is best supported by Table 1?",
     "choices": [
      "The free amino group is required for removing HNE but not for buffering near pH 7.",
      "The configuration of the histidine α-carbon determines how well the compound removes HNE.",
      "Methylating the imidazole ring makes the compound a weaker buffer at pH 7.4.",
      "Resistance to CN1 requires an unmodified amino group."
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 4",
     "diff": "X",
     "exp": "Compare Compound 4 with Compound 1. Acetylating the amino group drops HNE removal from **62% to 4%**, but the imidazole pKa stays at **6.8**, so the group that buffers near pH 7 is unchanged. So the free amine is needed for the reaction with the aldehyde (an amine can add to a C=O to form an imine), while the imidazole does the buffering.\n\nD-Carnosine removes 61% of HNE, essentially the same as carnosine (62%), so the α-carbon configuration doesn't matter for scavenging (it matters for CN1, whose half-life jumps from 5 to >240 min).\nAnserine's imidazole pKa (7.0) is **closer** to 7.4 than carnosine's (6.8). A buffer works best when pH ≈ pKa, so anserine is a slightly **better** buffer at 7.4, not a weaker one.\nCompound 4, whose amino group is acetylated, is the most CN1-resistant compound (>240 min), so an unmodified amine is not required for resistance.",
     "id": "p_cpd_1_q3"
    },
    {
     "q": "Which bond in Compound 1 is broken by CN1?",
     "choices": [
      "The amide C–N bond between the β-alanine carbonyl carbon and the histidine nitrogen",
      "The C–N bond between the β-alanine amino group and the adjacent carbon",
      "A C–N bond within the imidazole ring",
      "The C–C bond between the histidine α-carbon and its carboxyl carbon"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "diff": "E",
     "exp": "CN1 is a **hydrolase**: it adds water across the **peptide (amide) bond** joining the two residues. Figure 1 shows the products, β-alanine and L-histidine, so the bond broken must be the one between the β-alanine C=O carbon and the histidine N–H nitrogen. The carbonyl carbon gains –OH (a new COOH on β-alanine) and the nitrogen gains –H (a free NH₂ on histidine).\n\nBreaking the β-alanine C–NH₂ bond would release ammonia, not β-alanine.\nThe aromatic imidazole ring stays intact in histidine.\nBreaking the α-carbon–carboxyl C–C bond would be a decarboxylation releasing CO₂, not a hydrolysis.",
     "id": "p_cpd_1_q4"
    }
   ]
  },
  {
   "id": "p_cpd_2",
   "subj": "biochemistry",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5D",
    "5E",
    "5A"
   ],
   "title": "The Serine Synthesis Pathway in Breast Cancer Cells",
   "passage": "Most cells take up the amino acid serine from the blood, but many tumors also make it from glucose. The glycolytic intermediate 3-phosphoglycerate (Compound 1) is diverted into a three-step pathway (Figure 1). In Step 1, phosphoglycerate dehydrogenase (PHGDH) uses NAD⁺ to oxidize the secondary alcohol of Compound 1 to a ketone. In Step 2, phosphoserine aminotransferase (PSAT1) transfers the amino group of glutamate to Compound 2, producing α-ketoglutarate. In Step 3, phosphoserine phosphatase hydrolyzes the phosphate ester of Compound 3 to give serine (Compound 4). The PHGDH gene is amplified in some breast cancers and melanomas.\n\nStep 1 is uphill under standard conditions (ΔG°′ = +12 kJ/mol), so the pathway runs forward only because the products of Step 1 are kept at low concentration by Steps 2 and 3. At 37°C, 2.303RT = 5.9 kJ/mol.\n\nResearchers measured PHGDH activity in cell extracts with a coupled fluorescence assay: the NADH made in Step 1 was used by a second enzyme, diaphorase, to reduce a nonfluorescent dye to a fluorescent product. Assays were run at 25°C in 50 mM Tris buffer (pKa = 8.1) adjusted to pH 9.1.\n\nThree cell lines were compared: Line A, a breast cancer line with PHGDH amplification; Line B, a breast cancer line without amplification; and Line C, made from Line A by deleting the PHGDH gene. The percentage of cellular serine made from glucose was found by isotope tracing. Each line was also grown for 4 days in complete medium or in serine-free medium, with or without 10 μM Compound 5, a selective PHGDH inhibitor. The results are shown in Table 1.",
   "scheme": [
    {
     "after": 0,
     "caption": "Figure 1 The serine synthesis pathway",
     "parts": [
      "cpd-3-phosphoglycerate",
      {
       "arrow": "Step 1: PHGDH, NAD⁺ → NADH"
      },
      "cpd-3-phosphohydroxypyruvate",
      {
       "arrow": "Step 2: PSAT1, Glu → α-KG"
      },
      "cpd-phosphoserine",
      {
       "arrow": "Step 3: phosphatase, H₂O → Pi"
      },
      "cpd-l-serine"
     ]
    }
   ],
   "figure": {
    "caption": "Table 1 Serine synthesis and growth of three cell lines (growth relative to the same line in complete medium without inhibitor)",
    "columns": [
     "Line",
     "PHGDH activity (nmol·min⁻¹·mg⁻¹)",
     "Serine made from glucose (%)",
     "Growth, serine-free",
     "Growth, serine-free + Compound 5",
     "Growth, complete + Compound 5"
    ],
    "rows": [
     [
      "A",
      "42",
      "45",
      "0.95",
      "0.20",
      "0.85"
     ],
     [
      "B",
      "5.0",
      "8",
      "0.30",
      "0.25",
      "0.95"
     ],
     [
      "C",
      "<0.5",
      "<1",
      "0.05",
      "0.05",
      "0.90"
     ]
    ]
   },
   "questions": [
    {
     "q": "Which cofactor does PSAT1 most likely require to carry out Step 2?",
     "choices": [
      "Pyridoxal phosphate",
      "Thiamine pyrophosphate",
      "Biotin",
      "FAD"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "Step 2 moves an amino group from glutamate to the ketone of Compound 2, a **transamination**. Aminotransferases use **pyridoxal phosphate (PLP, from vitamin B₆)**: the amino group is passed to PLP (forming pyridoxamine phosphate) and then to the keto acid acceptor.\n\nThiamine pyrophosphate is used for decarboxylating α-keto acids (pyruvate dehydrogenase).\nBiotin carries CO₂ in carboxylations (pyruvate carboxylase).\nFAD is a redox cofactor; Step 2 involves no oxidation or reduction of the carbon skeleton overall.",
     "id": "p_cpd_2_q1"
    },
    {
     "q": "In the PHGDH assay buffer, approximately what percentage of the Tris is in its protonated (TrisH⁺) form?",
     "choices": [
      "9%",
      "10%",
      "50%",
      "91%"
     ],
     "ans": 0,
     "cat": "5A",
     "skill": "SIRS 2",
     "diff": "M",
     "subj": "gen_chem",
     "exp": "Use **Henderson–Hasselbalch**: pH = pKa + log([Tris]/[TrisH⁺]). So 9.1 = 8.1 + log(ratio), log(ratio) = 1, and **[Tris]/[TrisH⁺] = 10**.\n\nFor every 1 TrisH⁺ there are 10 Tris, so TrisH⁺ is 1 part in 11: 1 ÷ 11 ≈ **9%**.\n\n**10%** treats the 1 : 10 ratio as if it were a fraction of the total.\n**91%** is the fraction in the basic (Tris) form.\n**50%** would be true only at pH = pKa (8.1).",
     "id": "p_cpd_2_q2"
    },
    {
     "q": "In Line A cells at 37°C, the ratio [Compound 2][NADH]/([Compound 1][NAD⁺]) is about 1 × 10⁻³. What is ΔG for Step 1 in these cells?",
     "choices": [
      "−6 kJ/mol",
      "+9 kJ/mol",
      "+30 kJ/mol",
      "−18 kJ/mol"
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 2",
     "diff": "X",
     "exp": "Use **ΔG = ΔG°′ + 2.303RT log Q**. Here log Q = log(10⁻³) = −3, and the passage gives 2.303RT = 5.9 kJ/mol.\nΔG = +12 + (5.9)(−3) = 12 − 17.7 ≈ **−6 kJ/mol**.\nKeeping the products scarce makes Q small enough to turn an uphill standard reaction downhill.\n\n**+9** uses log Q (−3) without multiplying by 2.303RT.\n**+30** adds 17.7 instead of subtracting it (a sign slip, as if Q were 10³).\n**−18** drops ΔG°′ and keeps only the 2.303RT log Q term.",
     "id": "p_cpd_2_q3"
    },
    {
     "q": "Which conclusion is best supported by the data in Table 1?",
     "choices": [
      "Line A needs PHGDH activity for growth only when serine is unavailable from the medium.",
      "Line B makes a larger percentage of its serine from glucose than Line A does.",
      "Compound 5 slows the growth of Line B in complete medium more than it slows Line A.",
      "Deleting PHGDH prevents Line C from growing even when serine is supplied."
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 4",
     "diff": "D",
     "exp": "In serine-free medium, Compound 5 cuts Line A's growth from **0.95 to 0.20**. In complete medium, Line A treated with Compound 5 still grows at **0.85**. So blocking PHGDH matters only when Line A can't take serine up from the medium.\n\nLine B makes **8%** of its serine from glucose versus **45%** for Line A.\nIn complete medium with Compound 5, Line B grows at 0.95 and Line A at 0.85, so Line B is slowed **less**.\nLine C grows at 0.90 in complete medium with serine available; it fails only in serine-free medium (0.05).",
     "id": "p_cpd_2_q4"
    },
    {
     "q": "Which method would allow the researchers to find the percentage of cellular serine made from glucose, as reported in Table 1?",
     "choices": [
      "Grow cells with glucose in which all six carbons are ¹³C, and use mass spectrometry to find the fraction of serine that is 3 mass units heavier than normal",
      "Grow cells with glucose in which all six carbons are ¹³C, and use mass spectrometry to find the fraction of serine that is 6 mass units heavier than normal",
      "Grow cells with ¹³C-labeled serine, and use mass spectrometry to find the fraction of Compound 1 that carries the label",
      "Grow cells with ¹⁴C-labeled glucose, and measure the total radioactivity of the cells"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 3",
     "diff": "D",
     "exp": "To trace serine back to glucose, label the glucose and look in the serine. Glycolysis splits [U-¹³C]glucose into two 3-carbon units, so Compound 1 carries **three ¹³C atoms**, and so does the serine made from it. Serine has only **3 carbons**, so newly made serine is **M+3** (3 mass units heavier), while serine taken up from the medium is unlabeled. The M+3 fraction is the percentage made from glucose.\n\nSerine can't be 6 mass units heavier: it has only three carbons to label.\nLabeling serine and looking in Compound 1 traces the pathway backward, which it doesn't run in cells.\nTotal cell radioactivity includes label in every glucose-derived molecule (lipids, nucleotides, glycogen), not just serine.",
     "id": "p_cpd_2_q5"
    }
   ]
  },
  {
   "id": "p_cpd_3",
   "subj": "gen_chem",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "4C",
    "4E"
   ],
   "title": "Corrosion of Biodegradable Magnesium Stents",
   "passage": "Coronary stents made of magnesium alloys are designed to hold an artery open for several months and then dissolve. Magnesium is biocompatible, and the Mg²⁺ released is excreted by the kidneys like dietary magnesium. In the body, the metal is oxidized to Mg²⁺ (the reverse of Reaction 1), mainly coupled to the reduction of water (Reaction 2). Dissolved O₂ (Reaction 3) is scarce in tissue. The OH⁻ produced raises the local pH, and Mg(OH)₂ and magnesium phosphates precipitate on the metal surface.\n\nMg²⁺ + 2e⁻ → Mg   E° = −2.37 V\nReaction 1\n2H₂O + 2e⁻ → H₂ + 2OH⁻   E° = −0.83 V\nReaction 2\nO₂ + 2H₂O + 4e⁻ → 4OH⁻   E° = +0.40 V\nReaction 3\n\nIf a stent corrodes too fast, it loses mechanical support before the artery heals, and the H₂ released can form gas pockets in the tissue; each mole of Mg that corrodes by Reactions 1 and 2 releases one mole of H₂. Alloying elements are added to slow corrosion. Researchers compared pure Mg with three alloys, AZ31 (3% Al, 1% Zn), WE43 (4% Y, 3% rare-earth metals) and Mg–Zn–Ca, and with 316L stainless steel, a nondegradable stent material.\n\nPolished samples were immersed in simulated body fluid at 37°C. The corrosion potential (Ecorr) and the corrosion current density (icorr) of each sample were found from polarization curves measured in a three-electrode cell with a platinum counter electrode. The H₂ evolved was collected in an inverted burette over each sample. The results are shown in Table 1. All potentials are reported versus the standard hydrogen electrode.",
   "figure": {
    "caption": "Table 1 Corrosion of stent materials in simulated body fluid at 37°C",
    "columns": [
     "Material",
     "Ecorr (V)",
     "icorr (μA/cm²)",
     "H₂ evolved (mL·cm⁻²·day⁻¹)"
    ],
    "rows": [
     [
      "Pure Mg",
      "−1.62",
      "180",
      "2.0"
     ],
     [
      "AZ31",
      "−1.57",
      "50",
      "0.57"
     ],
     [
      "WE43",
      "−1.52",
      "25",
      "0.28"
     ],
     [
      "Mg–Zn–Ca",
      "−1.55",
      "60",
      "0.68"
     ],
     [
      "316L steel",
      "−0.05",
      "0.05",
      "not detected"
     ]
    ]
   },
   "questions": [
    {
     "q": "The Mg²⁺ ion has a much smaller radius than a neutral Mg atom because Mg²⁺:",
     "choices": [
      "has lost both of its 3s electrons, so its outermost electrons are in the n = 2 shell.",
      "has gained two protons, which pull the electron cloud closer to the nucleus.",
      "has two more electrons than Mg, which increases the attraction to the nucleus.",
      "has a more massive nucleus, which holds the electrons more tightly."
     ],
     "ans": 0,
     "cat": "4E",
     "skill": "SIRS 1",
     "diff": "E",
     "exp": "Mg is 1s²2s²2p⁶3s². Forming Mg²⁺ removes the **two 3s electrons**, leaving 1s²2s²2p⁶ (the neon configuration). The outermost electrons are now in the **n = 2 shell**, much closer to the nucleus, and the 12 protons now pull on only 10 electrons. Both effects shrink the ion.\n\nIonization removes electrons; it never adds protons.\nA cation has fewer electrons than its atom, not more.\nThe nucleus is unchanged, so its mass is the same.",
     "id": "p_cpd_3_q1"
    },
    {
     "q": "What is the standard cell potential for the corrosion of magnesium by water, Mg + 2H₂O → Mg²⁺ + H₂ + 2OH⁻?",
     "choices": [
      "+1.54 V",
      "+3.20 V",
      "−1.54 V",
      "+0.77 V"
     ],
     "ans": 0,
     "cat": "4C",
     "skill": "SIRS 2",
     "diff": "M",
     "exp": "Water is reduced at the cathode (Reaction 2) and Mg is oxidized at the anode (the reverse of Reaction 1). Using reduction potentials:\nE°cell = E°cathode − E°anode = (−0.83 V) − (−2.37 V) = **+1.54 V**.\nThe positive value means the corrosion is spontaneous under standard conditions.\n\n**+3.20 V** adds the magnitudes (2.37 + 0.83), as if water reduction were +0.83 V.\n**−1.54 V** subtracts in the wrong order (anode − cathode).\n**+0.77 V** divides by the 2 electrons transferred; E° is an intensive quantity and isn't scaled by n.",
     "id": "p_cpd_3_q2"
    },
    {
     "q": "An AZ31 stent has 2.0 cm² of surface exposed to blood. If icorr stays at the value in Table 1 and all of the current comes from oxidation of Mg (24.3 g/mol), approximately what mass of Mg corrodes in 1.0 × 10⁶ s (about 12 days)? (F = 96,500 C/mol)",
     "choices": [
      "6.3 mg",
      "13 mg",
      "25 mg",
      "13 g"
     ],
     "ans": 1,
     "cat": "4C",
     "skill": "SIRS 2",
     "diff": "X",
     "exp": "Current: I = 50 μA/cm² × 2.0 cm² = 100 μA = **1.0 × 10⁻⁴ A**.\nCharge: Q = It = (1.0 × 10⁻⁴ A)(1.0 × 10⁶ s) = **100 C**.\nMoles of electrons: 100 ÷ 96,500 ≈ 1.04 × 10⁻³ mol.\nEach Mg gives **2 electrons**: 1.04 × 10⁻³ ÷ 2 ≈ 5.2 × 10⁻⁴ mol Mg.\nMass: 5.2 × 10⁻⁴ mol × 24.3 g/mol ≈ 0.0126 g ≈ **13 mg**.\n\n**6.3 mg** uses the current density without multiplying by the 2.0 cm² area.\n**25 mg** assumes one electron per Mg atom.\n**13 g** treats μA as mA (a factor of 1000).",
     "id": "p_cpd_3_q3"
    },
    {
     "q": "A WE43 stent is placed so that it overlaps and touches a 316L stainless steel stent from an earlier procedure. Based on Table 1, what is the most likely result?",
     "choices": [
      "The WE43 stent acts as the anode and corrodes faster than it would alone.",
      "The steel stent acts as the anode and corrodes faster than it would alone.",
      "The WE43 stent corrodes more slowly, because the steel supplies it with electrons.",
      "Neither corrosion rate changes, because both stents are metals in the same fluid."
     ],
     "ans": 0,
     "cat": "4C",
     "skill": "SIRS 4",
     "diff": "D",
     "exp": "Two metals in electrical contact in an electrolyte form a **galvanic couple**. The metal with the more negative corrosion potential becomes the **anode**. WE43's Ecorr (**−1.52 V**) is far more negative than steel's (**−0.05 V**), so electrons flow from WE43 to the steel, where water is reduced. WE43 is oxidized faster than it would be alone.\n\nSteel is the cathode, so it is protected rather than corroded.\nElectrons flow from WE43 to steel, not the other way, so WE43 corrodes faster, not slower.\nA 1.5 V difference in Ecorr drives a current between the metals; contact between dissimilar metals is exactly what causes galvanic corrosion.",
     "id": "p_cpd_3_q4"
    }
   ]
  },
  {
   "id": "p_cpd_4",
   "subj": "gen_chem",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5A",
    "5E"
   ],
   "title": "Phenobarbital: Acid–Base Behavior and Overdose Treatment",
   "passage": "Phenobarbital (Compound 1, molar mass 232 g/mol) is a barbiturate used to treat seizures, including seizures in newborns. It is a weak acid: an N–H proton located between two carbonyl groups is lost with pKa = 7.4 at 25°C. The neutral form of the drug crosses cell membranes readily, but the anion does not. About half of the drug in plasma is bound to albumin. Normally about 25% of a dose is excreted unchanged in the urine, and the rest is oxidized in the liver by cytochrome P450 enzymes, mainly to p-hydroxyphenobarbital.\n\nBecause phenobarbital is eliminated slowly (half-life about 4 days), an overdose can cause prolonged coma. Phenobarbital filtered by the kidney is partly reabsorbed by passive diffusion across the wall of the renal tubule. One treatment for overdose is intravenous sodium bicarbonate, which raises the pH of the urine from about 6.4 to as high as 8.4 and increases the amount of drug excreted. The sodium salt of Compound 1 is far more water-soluble than the neutral acid, so injectable phenobarbital is supplied as the sodium salt in a solution with a pH of about 10.\n\nTo check the drug content of an oral liquid formulation, a pharmacist diluted a sample with water to 50 mL and titrated it with 0.020 M NaOH at 25°C, recording the pH with a glass electrode that had been calibrated with standard buffers of pH 4.00, 7.00 and 10.00. No other ingredient in the formulation reacts with NaOH. The titration curve is shown in Figure 1.",
   "scheme": [
    {
     "after": 0,
     "caption": "Compound 1 Phenobarbital",
     "parts": [
      "cpd-phenobarbital"
     ]
    }
   ],
   "figure": {
    "type": "line",
    "caption": "Figure 1 Titration of a phenobarbital sample with 0.020 M NaOH at 25°C",
    "x": {
     "label": "Volume of NaOH added (mL)",
     "min": 0,
     "max": 16,
     "step": 2
    },
    "y": {
     "label": "pH",
     "min": 2,
     "max": 12,
     "step": 2
    },
    "series": [
     {
      "name": "Sample",
      "marker": "circle",
      "line": "smooth",
      "points": [
       [
        0,
        4.9
       ],
       [
        1,
        6.45
       ],
       [
        2,
        6.8
       ],
       [
        3,
        7.03
       ],
       [
        4,
        7.22
       ],
       [
        5,
        7.4
       ],
       [
        6,
        7.58
       ],
       [
        7,
        7.77
       ],
       [
        8,
        8.0
       ],
       [
        9,
        8.35
       ],
       [
        9.5,
        8.67
       ],
       [
        10,
        9.46
       ],
       [
        10.5,
        10.23
       ],
       [
        11,
        10.52
       ],
       [
        12,
        10.81
       ],
       [
        14,
        11.1
       ],
       [
        16,
        11.26
       ]
      ]
     }
    ]
   },
   "questions": [
    {
     "q": "When sodium bicarbonate raises the urine pH to 8.4, approximately what percentage of the Compound 1 in the urine is in its ionized form?",
     "choices": [
      "9%",
      "50%",
      "91%",
      "99%"
     ],
     "ans": 2,
     "cat": "5A",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "Henderson–Hasselbalch: log([A⁻]/[HA]) = pH − pKa = 8.4 − 7.4 = 1, so **[A⁻]/[HA] = 10**. Ionized fraction = 10 ÷ (10 + 1) ≈ **91%**.\nThe anion can't diffuse back across the tubule wall, so it is **trapped** in the urine and excreted. At the normal urine pH of 6.4, only about 9% is ionized.\n\n**9%** inverts the ratio (the result at pH 6.4).\n**50%** is the result at pH = pKa (7.4).\n**99%** would need pH − pKa = 2.",
     "id": "p_cpd_4_q1"
    },
    {
     "q": "Based on Figure 1, approximately what mass of Compound 1 was in the titrated sample?",
     "choices": [
      "4.6 mg",
      "23 mg",
      "46 mg",
      "93 mg"
     ],
     "ans": 2,
     "cat": "5A",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "The steep jump in Figure 1 (the equivalence point) is at **10.0 mL** of NaOH. Phenobarbital loses one proton, so moles of drug = moles of NaOH:\n(0.0100 L)(0.020 mol/L) = **2.0 × 10⁻⁴ mol**.\nMass = 2.0 × 10⁻⁴ mol × 232 g/mol = 0.0464 g ≈ **46 mg**.\n\n**23 mg** uses the half-equivalence volume (5.0 mL, where pH = pKa = 7.4).\n**93 mg** assumes both N–H protons are titrated; the curve shows only one jump.\n**4.6 mg** is a factor-of-10 slip in converting mL to L.",
     "id": "p_cpd_4_q2"
    },
    {
     "q": "The N–H proton lost by Compound 1 is far more acidic than the N–H proton of a typical amine because the conjugate base of Compound 1:",
     "choices": [
      "spreads its negative charge onto the oxygen atoms of the two adjacent carbonyl groups by resonance.",
      "places its negative charge on a carbon atom of the phenyl ring.",
      "becomes aromatic when the proton is removed, like the cyclopentadienyl anion.",
      "is stabilized only by the electron-donating ethyl group on the ring."
     ],
     "ans": 0,
     "cat": "5A",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "Acid strength depends on how stable the **conjugate base** is. When the N–H between the two C=O groups is removed, the nitrogen's lone pair is delocalized into **both carbonyls**, putting the negative charge on two electronegative oxygen atoms. An amine anion (R₂N⁻) has no such resonance, so amines have N–H pKa values near 35, while Compound 1's is 7.4.\n\nThe phenyl ring is attached to the sp³ carbon C5, which blocks any conjugation between the ring and the nitrogen.\nThe barbiturate ring isn't made aromatic by losing this proton.\nAn electron-**donating** alkyl group would destabilize an anion, not stabilize it.",
     "id": "p_cpd_4_q3"
    },
    {
     "q": "The researchers hypothesized that ionization of Compound 1 in water is endothermic. Which experiment would best test this hypothesis?",
     "choices": [
      "Repeat the titration at several temperatures and compare the pH at the half-equivalence point.",
      "Repeat the titration with several concentrations of Compound 1 and compare the pH at the half-equivalence point.",
      "Repeat the titration at several temperatures and compare the volume of NaOH needed to reach the equivalence point.",
      "Repeat the titration with 0.20 M NaOH and compare the pH at the equivalence point."
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 3",
     "diff": "X",
     "exp": "At the half-equivalence point, pH = **pKa**, so titrating at several temperatures measures how Ka changes with temperature. By **Le Châtelier's principle**, if ionization absorbs heat, raising the temperature shifts the equilibrium toward the ions: Ka rises and pKa falls. A lower half-equivalence pH at higher temperature would support the hypothesis.\n\nKa is a constant at a given temperature; changing the drug concentration doesn't change it, so this varies the wrong thing.\nThe equivalence volume depends only on the moles of acid (stoichiometry), not on Ka or on temperature.\nChanging the titrant concentration only changes dilution at the equivalence point, at one temperature.",
     "id": "p_cpd_4_q4"
    }
   ]
  },
  {
   "id": "p_cpd_5",
   "subj": "physics",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "4C",
    "4A",
    "4B"
   ],
   "title": "Occlusion Alarm in an Ambulatory Syringe Driver",
   "passage": "Patients in palliative care often receive drugs such as morphine by slow, continuous injection under the skin from a battery-powered syringe driver worn in a holster. In one design, a small DC motor turns a lead screw that pushes the syringe plunger forward at a constant speed. The syringe has an inner cross-sectional area of 2.0 cm², and a typical prescription delivers 2.0 mL/h of drug solution through a long, narrow catheter that ends in a fine needle under the skin.\n\nThe motor is powered by four 1.5 V alkaline cells, each rated at 2500 mAh, connected in series. A 2.0 Ω current-sensing resistor is wired in series with the motor. During normal delivery, the motor behaves electrically like a 28 Ω resistor. A microcontroller continuously measures the voltage across the sense resistor, and its own current draw is negligible. The battery's internal resistance can also be neglected.\n\nIf the catheter kinks or the needle clots, fluid can no longer leave the syringe. The pressure in the syringe then rises, the motor slows, and its effective resistance falls, so the current through the circuit increases. The controller stops the motor and sounds an occlusion alarm when the voltage across the sense resistor reaches 0.60 V. In bench tests, the gauge pressure inside the syringe was about 20 kPa during normal delivery and about 100 kPa when the alarm sounded. Nearly all of the normal 20 kPa pressure difference is needed to push the solution through the catheter.\n\nBecause a delayed alarm means the patient goes without pain relief, the manufacturer tested how quickly the alarm sounded after a complete occlusion. At 2.0 mL/h the alarm took about 25 minutes, mainly because the plunger must compress small air bubbles and stretch the plastic tubing before the pressure can build. At higher flow rates the alarm sounded sooner.",
   "questions": [
    {
     "q": "At the moment the occlusion alarm sounds, what is the effective resistance of the motor?",
     "choices": [
      "3.0 Ω",
      "18 Ω",
      "20 Ω",
      "28 Ω"
     ],
     "ans": 1,
     "cat": "4C",
     "skill": "SIRS 2",
     "diff": "X",
     "exp": "Work from the sense resistor outward. The alarm voltage across the 2.0 Ω resistor gives the current: **I = V/R = 0.60 V ÷ 2.0 Ω = 0.30 A**. In a series circuit the same current flows through everything, so the total resistance is **6.0 V ÷ 0.30 A = 20 Ω** (four 1.5 V cells in series give 6.0 V). Subtract the sense resistor: 20 Ω − 2.0 Ω = **18 Ω** for the motor. That is lower than the normal 28 Ω, which matches the passage: a stalled motor's effective resistance falls.\n\n**20 Ω** is the total resistance; the 2.0 Ω sense resistor was not subtracted.\n**28 Ω** is the normal-delivery value, so it ignores the rise in current.\n**3.0 Ω** uses one cell's 1.5 V instead of the 6.0 V pack (1.5 ÷ 0.30 = 5.0 Ω, minus 2.0 Ω).",
     "id": "p_cpd_5_q1"
    },
    {
     "q": "Compared with a single one of the cells described in the passage, the battery pack used in the syringe driver has:",
     "choices": [
      "four times the voltage and the same charge capacity.",
      "the same voltage and four times the charge capacity.",
      "four times the voltage and four times the charge capacity.",
      "the same voltage and the same charge capacity."
     ],
     "ans": 0,
     "cat": "4C",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "In a **series** connection the emfs add: 4 × 1.5 V = **6.0 V**. But the same current passes through every cell, so each cell is drained at the same rate and the pack runs out when one cell does. The charge the pack can deliver is still **2500 mAh**, the capacity of one cell. (The stored energy does quadruple, because each coulomb now gains 6.0 J instead of 1.5 J.)\n\nThe same voltage with four times the capacity describes cells wired in **parallel**.\nFour times both would require the series and parallel benefits at once, which four cells can't give.\nThe same voltage and capacity would be true of only one cell.",
     "id": "p_cpd_5_q2"
    },
    {
     "q": "During normal delivery, about how much work does the plunger do on the drug solution in 1 hour?",
     "choices": [
      "4.0 × 10⁻⁵ J",
      "0.040 J",
      "4.0 J",
      "40 J"
     ],
     "ans": 1,
     "cat": "4A",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "For a piston pushing fluid at constant pressure, **W = Fd = (PA)d = PΔV**. In 1 hour the syringe delivers 2.0 mL = 2.0 cm³ = **2.0 × 10⁻⁶ m³** (1 cm³ = 10⁻⁶ m³). The gauge pressure is 20 kPa = 2.0 × 10⁴ Pa.\nW = (2.0 × 10⁴ Pa)(2.0 × 10⁻⁶ m³) = **0.040 J**.\n\nCheck with force × distance: F = PA = (2.0 × 10⁴ Pa)(2.0 × 10⁻⁴ m²) = 4.0 N, and the plunger moves 2.0 cm³ ÷ 2.0 cm² = 1.0 cm = 0.010 m, so W = 4.0 N × 0.010 m = 0.040 J.\n\n**4.0 × 10⁻⁵ J** leaves the pressure in kPa (20 × 2.0 × 10⁻⁶).\n**4.0 J** multiplies 4.0 N by the distance in centimeters instead of meters.\n**40 J** treats 1 mL as 10⁻³ m³ (that is 1 L).",
     "id": "p_cpd_5_q3"
    },
    {
     "q": "If the catheter were replaced by one of the same length but half the inner radius, how would the pressure difference needed to keep delivering 2.0 mL/h change?",
     "choices": [
      "It would increase by a factor of 4.",
      "It would increase by a factor of 16.",
      "It would decrease by a factor of 4.",
      "It would decrease by a factor of 16."
     ],
     "ans": 1,
     "cat": "4B",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "For slow, smooth (laminar) flow through a tube, **Poiseuille's law** gives Q = πr⁴ΔP/(8ηL). To keep the flow rate Q the same, ΔP must vary as **1/r⁴**. Halving r divides r⁴ by 2⁴ = 16, so ΔP must rise **16-fold**: from about 20 kPa to about 320 kPa. That is above the 100 kPa reached at the alarm, so this catheter would set off the occlusion alarm during normal delivery.\n\nA factor of **4** comes from scaling with cross-sectional area (r²) instead of r⁴.\nA **decrease** reverses the relationship: a narrower tube resists flow more, so it needs more pressure, not less.",
     "id": "p_cpd_5_q4"
    }
   ]
  },
  {
   "id": "p_cpd_6",
   "subj": "physics",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "4D",
    "4E"
   ],
   "title": "Fluorescence-Guided Removal of Brain Tumors",
   "passage": "Malignant gliomas spread into normal brain tissue, and under white light their edges are hard to see. Before surgery, some patients drink a solution of 5-aminolevulinic acid (5-ALA), a natural precursor of heme. Glioma cells take up 5-ALA and convert it to protoporphyrin IX (PpIX), but they insert iron into PpIX to make heme only slowly, so PpIX builds up in the tumor. PpIX is a large, planar ring with an extended system of conjugated double bonds. It absorbs violet light strongly and fluoresces red. Because 5-ALA itself does not fluoresce, any red signal reports PpIX made inside living cells.\n\nThe surgical microscope can switch from white light to violet light at 405 nm. Light reflected from the tissue and light emitted by it pass through a filter before reaching the eyepiece and camera. Tumor tissue then appears pink-red against a dark blue background.\n\nTo choose the best filter, researchers recorded emission spectra from fresh tissue samples excited at 405 nm (Figure 1). All samples received the same light intensity, and both spectra were scaled to the height of the tumor's main peak. Tumor samples showed a sharp emission peak at 635 nm and a smaller peak at 705 nm. Normal brain showed only weak, broad autofluorescence, mostly from flavins, which peaked near 510 nm. Under continuous illumination, the red PpIX signal fell by about half in 10 minutes as the dye was photobleached, so surgeons switch to violet light only briefly. Photon energies can be estimated from E = hc/λ, with hc ≈ 1240 eV·nm. The refractive index of brain tissue is about 1.4.",
   "figure": {
    "type": "line",
    "caption": "Figure 1 Emission spectra of tumor and normal brain tissue excited at 405 nm",
    "x": {
     "label": "Wavelength (nm)",
     "min": 450,
     "max": 750,
     "step": 50
    },
    "y": {
     "label": "Relative emission intensity",
     "min": 0,
     "max": 1,
     "step": 0.2
    },
    "series": [
     {
      "name": "Glioma tissue",
      "marker": "circle",
      "line": "smooth",
      "points": [
       [
        450,
        0.06
       ],
       [
        480,
        0.1
       ],
       [
        510,
        0.14
       ],
       [
        540,
        0.12
       ],
       [
        570,
        0.1
       ],
       [
        600,
        0.2
       ],
       [
        620,
        0.62
       ],
       [
        635,
        1.0
       ],
       [
        650,
        0.55
       ],
       [
        670,
        0.22
       ],
       [
        690,
        0.3
       ],
       [
        705,
        0.42
       ],
       [
        720,
        0.24
       ],
       [
        750,
        0.06
       ]
      ]
     },
     {
      "name": "Normal brain",
      "marker": "square-open",
      "line": "smooth",
      "points": [
       [
        450,
        0.06
       ],
       [
        480,
        0.12
       ],
       [
        510,
        0.15
       ],
       [
        540,
        0.12
       ],
       [
        570,
        0.08
       ],
       [
        600,
        0.06
       ],
       [
        635,
        0.05
       ],
       [
        670,
        0.04
       ],
       [
        705,
        0.03
       ],
       [
        750,
        0.02
       ]
      ]
     }
    ]
   },
   "questions": [
    {
     "q": "For each PpIX molecule that absorbs a 405 nm photon and then emits a photon at the main emission peak, approximately how much energy is lost as heat rather than emitted as light?",
     "choices": [
      "1.1 eV",
      "2.0 eV",
      "3.1 eV",
      "5.1 eV"
     ],
     "ans": 0,
     "cat": "4D",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "Photon energy is **E = hc/λ**, so shorter wavelengths carry more energy.\nAbsorbed photon: 1240 eV·nm ÷ 405 nm ≈ **3.1 eV**.\nEmitted photon at the 635 nm peak (Figure 1): 1240 ÷ 635 ≈ **2.0 eV**.\nThe difference, 3.1 − 2.0 ≈ **1.1 eV**, is lost as the excited molecule relaxes to the lowest vibrational level of its excited state before emitting. This is why fluorescence is always shifted to longer wavelength (the Stokes shift).\n\n**2.0 eV** is the energy of the emitted photon, not the energy lost.\n**3.1 eV** is the energy of the absorbed photon.\n**5.1 eV** adds the two photon energies instead of subtracting.",
     "id": "p_cpd_6_q1"
    },
    {
     "q": "Based on Figure 1, which filter in front of the eyepiece would give the greatest contrast between tumor and normal tissue under violet light?",
     "choices": [
      "A long-pass filter that transmits only wavelengths longer than 600 nm",
      "A long-pass filter that transmits only wavelengths longer than 400 nm",
      "A short-pass filter that transmits only wavelengths shorter than 550 nm",
      "A band-pass filter that transmits only wavelengths from 400 to 410 nm"
     ],
     "ans": 0,
     "cat": "4D",
     "skill": "SIRS 3",
     "diff": "D",
     "exp": "The goal is to see **only the light that differs between the two tissues**. In Figure 1, the tumor and normal curves overlap below about 570 nm (both show the weak flavin autofluorescence), but above 600 nm the tumor emits strongly at 635 and 705 nm while normal tissue emits almost nothing. A **long-pass filter above 600 nm** passes the PpIX peaks and blocks both the autofluorescence and the far brighter 405 nm light reflected from the tissue.\n\n**Longer than 400 nm** lets the reflected 405 nm excitation light through, which would swamp the weak fluorescence.\n**Shorter than 550 nm** passes only the region where the two tissues look the same and blocks the tumor signal.\n**400 to 410 nm** passes only reflected excitation light, which every tissue reflects.",
     "id": "p_cpd_6_q2"
    },
    {
     "q": "When the 405 nm light passes from air into brain tissue, which property of the light does NOT change?",
     "choices": [
      "Its frequency",
      "Its wavelength",
      "Its speed",
      "Its direction, for light striking the surface at an angle"
     ],
     "ans": 0,
     "cat": "4D",
     "skill": "SIRS 1",
     "diff": "E",
     "exp": "At a boundary, the **frequency is fixed by the source**: each wave crest arriving at the surface produces one crest on the other side, so f stays the same. The speed drops to **v = c/n** ≈ c/1.4, and because v = fλ with f fixed, the wavelength also shrinks by a factor of 1.4 (to about 290 nm inside the tissue). The light's color and photon energy (E = hf) do not change.\n\n**Wavelength** and **speed** both decrease by the factor n.\n**Direction** changes by refraction (Snell's law, n₁ sin θ₁ = n₂ sin θ₂) whenever the light strikes the surface at an angle other than along the normal.",
     "id": "p_cpd_6_q3"
    },
    {
     "q": "Tumor tissue shows emission peaks at both 635 nm and 705 nm, although only one excitation wavelength was used. The second peak most likely arises because the excited PpIX molecule:",
     "choices": [
      "can return to more than one vibrational level of the ground electronic state.",
      "can be raised to two different excited electronic states by the same photon.",
      "loses part of each 635 nm photon's energy when that photon refracts in tissue.",
      "ejects an electron that carries away part of the absorbed energy."
     ],
     "ans": 0,
     "cat": "4E",
     "skill": "SIRS 2",
     "diff": "X",
     "exp": "Compare the energies: 1240 ÷ 635 ≈ 1.95 eV and 1240 ÷ 705 ≈ 1.76 eV, a gap of only about **0.2 eV**. That is far smaller than the ~2 eV electronic gap but typical of **vibrational spacings**. Fluorescence starts from the lowest level of the excited state and can end on different **vibrational levels of the ground state**: landing on v = 0 gives the 635 nm photon, landing one vibrational level higher gives a lower-energy, 705 nm photon. The extra energy then leaves as heat.\n\nOne photon has one energy, so it can't populate **two electronic states** at once, and emission occurs from the lowest excited state anyway.\n**Refraction** changes speed and wavelength inside the tissue but not frequency, so it cannot turn a 635 nm photon into a 705 nm one.\n**Ejecting an electron** is ionization (as in the photoelectric effect). A 3.1 eV photon is far below the ionization energy of an organic molecule, and an ionized molecule would not fluoresce.",
     "id": "p_cpd_6_q4"
    }
   ]
  },
  {
   "id": "p_cpd_7",
   "subj": "organic_chem",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5D",
    "5C"
   ],
   "title": "A Two-Step Synthesis of Phenacetin",
   "passage": "Phenacetin (Compound 3) was one of the first synthetic pain relievers. It was withdrawn in many countries after long-term use was linked to kidney damage. In the liver, phenacetin is converted mainly to acetaminophen (Compound 2), which is responsible for most of its analgesic effect. A teaching laboratory prepared phenacetin from 4-aminophenol (Compound 1) in two steps (Figure 1).\n\nIn Step 1, Compound 1 was warmed with acetic anhydride in water at 85°C for 15 minutes. On cooling in ice, Compound 2 crystallized and was collected by vacuum filtration, then recrystallized from hot water, in 85% yield. Acetic acid, the by-product, stayed in the aqueous filtrate.\n\nIn Step 2, 1.51 g of Compound 2 (10.0 mmol; M = 151 g/mol) was heated at reflux in acetone with bromoethane and powdered potassium carbonate for 1 hour. The solid salts were removed by filtration and the acetone was evaporated. The residue was dissolved in ethyl acetate, and the solution was washed twice with 1 M NaOH, once with saturated NaCl solution, dried over anhydrous MgSO₄, filtered and evaporated. Recrystallization from ethanol–water gave 1.25 g of Compound 3 (M = 179 g/mol), a 70% yield.\n\nEach product was checked by melting point and by thin-layer chromatography (TLC) on silica gel, a polar stationary phase, using 1:1 ethyl acetate–hexane as the eluent. A narrow melting range close to the literature value was taken as evidence of a pure solid. Properties of the three compounds are listed in Table 1. Carbonic acid (H₂CO₃) has pKa 6.4.",
   "scheme": [
    {
     "after": 0,
     "caption": "Figure 1 Synthesis of phenacetin (Compound 3)",
     "parts": [
      "cpd-4-aminophenol",
      "+",
      "acetic-anhydride",
      {
       "arrow": "H₂O, 85°C (Step 1)"
      },
      "acetaminophen",
      {
       "arrow": "CH₃CH₂Br, K₂CO₃, acetone, reflux (Step 2)"
      },
      "cpd-phenacetin"
     ]
    }
   ],
   "figure": {
    "caption": "Table 1 Properties of Compounds 1–3",
    "columns": [
     "Compound",
     "Melting point (°C)",
     "pKa of phenol O–H",
     "pKa of conjugate acid (most basic site)",
     "TLC Rf"
    ],
    "rows": [
     [
      "1 (4-aminophenol)",
      "187",
      "10.3",
      "5.5 (NH₃⁺)",
      "0.10"
     ],
     [
      "2 (acetaminophen)",
      "169",
      "9.5",
      "about −1",
      "0.30"
     ],
     [
      "3 (phenacetin)",
      "134",
      "— (no O–H)",
      "about −1",
      "0.55"
     ]
    ]
   },
   "questions": [
    {
     "q": "In Step 1, acetic anhydride reacts selectively at which atom of Compound 1, and why?",
     "choices": [
      "The nitrogen, because the amino group is the stronger nucleophile",
      "The nitrogen, because the amino group is the stronger acid",
      "The oxygen, because the hydroxyl group is the stronger nucleophile",
      "The oxygen, because the hydroxyl group is the stronger acid"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "Compound 2 is an **amide** (N–C(=O)CH₃) with a free phenol, so the acetyl group went onto **nitrogen**. Nitrogen is less electronegative than oxygen, so it holds its lone pair less tightly and is the **better nucleophile**; Table 1 shows the same thing from the base side (the NH₃⁺ conjugate acid of Compound 1 has pKa 5.5, so the amino group is a far better electron-pair donor than the phenol oxygen). The amine attacks a carbonyl carbon of acetic anhydride, and acetate leaves (nucleophilic acyl substitution).\n\nAcidity is the wrong property: acylation needs a lone pair to attack, not an H⁺ to give away. The N–H is in fact the weaker acid.\nAcylation at **oxygen** would give an ester, 4-aminophenyl acetate, which is not the product drawn in Figure 1.",
     "id": "p_cpd_7_q1"
    },
    {
     "q": "Which change to Step 2 would most likely increase the rate at which Compound 3 forms?",
     "choices": [
      "Replacing bromoethane with iodoethane",
      "Replacing bromoethane with chloroethane",
      "Replacing acetone with ethanol as the solvent",
      "Running the reaction at 25°C instead of at reflux"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "Step 2 is a **Williamson ether synthesis**: K₂CO₃ removes the phenol H of Compound 2, and the phenoxide ion attacks the CH₂ carbon of bromoethane in an **SN2** reaction, displacing Br⁻. The rate depends on the leaving group, and **I⁻ is a better leaving group than Br⁻** (it is larger, more polarizable and a weaker base), so iodoethane reacts faster.\n\n**Chloroethane** has a poorer leaving group (Cl⁻ is a stronger base than Br⁻), so it reacts more slowly.\n**Ethanol** is a polar protic solvent; it hydrogen-bonds to the phenoxide and makes it a weaker nucleophile. Polar aprotic acetone favors SN2.\n**Lower temperature** slows almost every reaction.",
     "id": "p_cpd_7_q2"
    },
    {
     "q": "The ethyl acetate solution in Step 2 was washed with 1 M NaOH rather than with saturated NaHCO₃. What is the best reason for this choice?",
     "choices": [
      "NaOH is a strong enough base to convert unreacted Compound 2 into a water-soluble ion, and NaHCO₃ is not.",
      "NaOH is a strong enough base to convert Compound 3 into a water-soluble ion, and NaHCO₃ is not.",
      "NaHCO₃ would convert unreacted Compound 2 into a water-soluble ion, but it would also hydrolyze Compound 3.",
      "NaHCO₃ would react with leftover bromoethane, but NaOH removes K₂CO₃ that remains in the organic layer."
     ],
     "ans": 0,
     "cat": "5C",
     "skill": "SIRS 3",
     "diff": "X",
     "exp": "The wash is meant to remove **unreacted Compound 2** while leaving the product in ethyl acetate. Compound 2 has a phenol O–H (pKa 9.5); Compound 3 does not, and its amide N–H is far too weak an acid to be removed by aqueous base. An acid–base reaction goes forward when the base's conjugate acid is **weaker** (higher pKa) than the acid being deprotonated.\nOH⁻ → H₂O (pKa ≈ 15.7) is well above 9.5, so NaOH turns Compound 2 into its **phenoxide ion**, which moves into the water.\nHCO₃⁻ → H₂CO₃ (pKa 6.4) is below 9.5, so bicarbonate leaves Compound 2 mostly un-ionized and in the organic layer. (Bicarbonate is the usual choice for removing carboxylic acids, pKa ≈ 4–5.)\n\nPulling **Compound 3** into water would throw away the product; neither base can deprotonate it.\nBicarbonate is too weak a base to deprotonate Compound 2, and a brief cold wash does not hydrolyze an amide.\nBromoethane (bp 38°C) and the K₂CO₃ salts were already removed by evaporation and filtration.",
     "id": "p_cpd_7_q3"
    },
    {
     "q": "On the silica TLC plate, Compound 3 travels farther than Compound 2 mainly because Compound 3:",
     "choices": [
      "lacks a phenolic O–H group, so it binds less strongly to the silica.",
      "has a larger molar mass, so the eluent carries it faster.",
      "lacks a phenolic O–H group, so it binds more strongly to the silica.",
      "is more polar, so it dissolves better in the eluent."
     ],
     "ans": 0,
     "cat": "5C",
     "skill": "SIRS 2",
     "diff": "M",
     "exp": "Silica gel is covered with polar Si–OH groups. Compounds that hydrogen-bond strongly to it **stay near the baseline** (low Rf); less polar compounds spend more time in the moving eluent (high Rf). Converting Compound 2's phenol O–H into an ethyl ether removes a strong **hydrogen-bond donor**, so Compound 3 is less polar, binds the silica more weakly, and moves farther: Rf **0.55 vs 0.30** in Table 1. Compound 1, with both an NH₂ and an OH, has the lowest Rf (0.10).\n\nTLC separates by **polarity**, not size; heavier molecules don't move faster.\nBinding **more strongly** to the silica would lower Rf, not raise it.\nCompound 3 is **less** polar than Compound 2, not more.",
     "id": "p_cpd_7_q4"
    },
    {
     "q": "The amide nitrogen atom in Compound 3 is best described as:",
     "choices": [
      "sp² hybridized, and a weaker base than the nitrogen in Compound 1",
      "sp² hybridized, and a stronger base than the nitrogen in Compound 1",
      "sp³ hybridized, and a weaker base than the nitrogen in Compound 1",
      "sp³ hybridized, and a stronger base than the nitrogen in Compound 1"
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "diff": "D",
     "exp": "In an amide, the nitrogen lone pair is **delocalized into the C=O** (resonance form ⁻O–C=N⁺). To overlap with the carbonyl π system, the lone pair sits in a p orbital, so the nitrogen is **sp² hybridized and planar**, and the C–N bond has partial double-bond character. Because that lone pair is tied up in resonance, it is hardly available to accept H⁺: Table 1 lists the conjugate acid pKa as **about −1** for the amide (and even then H⁺ adds to the carbonyl O, not N), versus **5.5** for the amino group of Compound 1. A lower conjugate-acid pKa means a **weaker base**.\n\n**sp³** is the hybridization you would assign by counting three bonds plus one lone pair without considering resonance.\n**Stronger base** reverses the trend that the pKa values in Table 1 show.",
     "id": "p_cpd_7_q5"
    }
   ]
  },
  {
   "id": "p_cpd_8",
   "subj": "gen_chem",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "4E",
    "4A"
   ],
   "title": "Matched Radioisotopes for Imaging and Treating Prostate Cancer",
   "passage": "Most prostate cancer cells carry large amounts of prostate-specific membrane antigen (PSMA) on their surface. Small molecules that bind PSMA can be attached to a cage-like chelator that holds a metal ion tightly. Because the chelator accepts several different metal ions, the same targeting molecule can carry either an imaging isotope or a therapeutic one. This approach is called theranostics.\n\nFor imaging, the chelator is loaded with gallium-68, a positron (β⁺) emitter. It is eluted on site from a small generator that contains its longer-lived parent isotope, and its short half-life keeps the patient's radiation dose low. Each positron travels a few millimeters through tissue, then meets an electron and annihilates. A positron emission tomography (PET) scanner surrounds the patient with a ring of detectors and records these annihilation events to map where the tracer has collected.\n\nIf the scan shows strong uptake, the patient can be treated with the same molecule carrying lutetium-177, a β⁻ emitter. The tumor dose comes from the kinetic energy that emitted particles deposit in nearby tissue. Lutetium-177 also emits a 208 keV γ-ray, which allows the treatment dose to be imaged. For tumors that no longer respond to β⁻ therapy, the alpha emitter actinium-225 is being tested. Yttrium-90, another β⁻ emitter, is used in a different treatment in which tiny glass beads are lodged in liver tumors.\n\nTable 1 lists properties of these isotopes. The mean range is the average distance an emitted particle travels in soft tissue before it has lost nearly all of its kinetic energy.",
   "figure": {
    "caption": "Table 1 Properties of medical radioisotopes",
    "columns": [
     "Isotope",
     "Z",
     "Decay",
     "Half-life",
     "Mean particle energy (MeV)",
     "Mean range in tissue (mm)"
    ],
    "rows": [
     [
      "⁶⁸Ga",
      "31",
      "β⁺",
      "68 min",
      "0.83",
      "3.5"
     ],
     [
      "⁹⁰Y",
      "39",
      "β⁻",
      "64 h",
      "0.93",
      "2.5"
     ],
     [
      "¹⁷⁷Lu",
      "71",
      "β⁻",
      "6.7 d",
      "0.13",
      "0.67"
     ],
     [
      "²²⁵Ac",
      "89",
      "α",
      "10 d",
      "5.8",
      "0.05"
     ]
    ]
   },
   "questions": [
    {
     "q": "What nucleus is produced when actinium-225 decays?",
     "choices": [
      "²²¹Fr",
      "²²³Fr",
      "²²¹At",
      "²²⁵Th"
     ],
     "ans": 0,
     "cat": "4E",
     "skill": "SIRS 2",
     "diff": "M",
     "exp": "Table 1 lists ²²⁵Ac (Z = 89) as an **α emitter**. An α particle is a helium nucleus, ⁴₂He, so the parent loses **4 from the mass number and 2 from the atomic number**:\n²²⁵₈₉Ac → ²²¹₈₇X + ⁴₂He\nElement 87 is francium, so the product is **²²¹Fr**.\n\n**²²³Fr** subtracts only 2 from the mass number, confusing the α particle's charge with its mass.\n**²²¹At** (Z = 85) subtracts 4 from the atomic number as well as the mass number.\n**²²⁵Th** (Z = 90) is the product of β⁻ decay, in which A stays the same and Z rises by 1.",
     "id": "p_cpd_8_q1"
    },
    {
     "q": "A patient is given 7.4 GBq of the ¹⁷⁷Lu-labeled drug. Ignoring excretion from the body, approximately what activity of ¹⁷⁷Lu remains 20 days later?",
     "choices": [
      "0.46 GBq",
      "0.93 GBq",
      "1.9 GBq",
      "2.5 GBq"
     ],
     "ans": 1,
     "cat": "4E",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "The half-life of ¹⁷⁷Lu is 6.7 days (Table 1), so 20 days is about **20 ÷ 6.7 ≈ 3 half-lives**. Each half-life halves the activity:\n7.4 → 3.7 → 1.85 → **0.93 GBq** (that is, 7.4 ÷ 2³ = 7.4 ÷ 8).\n\n**1.9 GBq** stops after two half-lives.\n**0.46 GBq** counts four half-lives.\n**2.5 GBq** divides by the number of half-lives (7.4 ÷ 3) instead of by 2 raised to that number.",
     "id": "p_cpd_8_q2"
    },
    {
     "q": "The radiation that a PET scanner detects from gallium-68 consists mainly of:",
     "choices": [
      "pairs of 511 keV photons traveling in opposite directions.",
      "pairs of 1022 keV photons traveling in the same direction.",
      "single 511 keV photons traveling in random directions.",
      "positrons that escape the body after leaving the tumor."
     ],
     "ans": 0,
     "cat": "4E",
     "skill": "SIRS 1",
     "diff": "D",
     "exp": "When a positron meets an electron, the two **annihilate** and their rest mass becomes energy. Each particle has a rest energy of mc² = **511 keV**, so 1022 keV in total. Because the pair is nearly at rest, momentum conservation requires the energy to leave as **two 511 keV γ photons moving in opposite directions**. The scanner counts an event only when two detectors on opposite sides of the ring fire at the same instant, which places the annihilation on the line between them.\n\n**1022 keV photons** double-count the energy: 1022 keV is the total shared by the two photons.\nPhotons moving **in the same direction**, or a **single photon**, would leave net momentum where there was essentially none.\n**Positrons** travel only about 3.5 mm in tissue (Table 1) before annihilating, so they don't leave the body.",
     "id": "p_cpd_8_q3"
    },
    {
     "q": "Suppose each emitted particle is slowed by a constant average retarding force from the tissue until it has lost all of its kinetic energy. Based on Table 1, which ranks the average retarding force from greatest to least?",
     "choices": [
      "²²⁵Ac α > ⁹⁰Y β⁻ > ¹⁷⁷Lu β⁻",
      "²²⁵Ac α > ¹⁷⁷Lu β⁻ > ⁹⁰Y β⁻",
      "⁹⁰Y β⁻ > ¹⁷⁷Lu β⁻ > ²²⁵Ac α",
      "¹⁷⁷Lu β⁻ > ⁹⁰Y β⁻ > ²²⁵Ac α"
     ],
     "ans": 0,
     "cat": "4A",
     "skill": "SIRS 4",
     "diff": "X",
     "exp": "By the **work–energy theorem**, the work done by the retarding force equals the kinetic energy lost: F·d = KE, so **F = KE ÷ range**. Use the mean energy and mean range in Table 1:\n²²⁵Ac α: 5.8 MeV ÷ 0.05 mm ≈ **120 MeV/mm**\n⁹⁰Y β⁻: 0.93 ÷ 2.5 ≈ **0.37 MeV/mm**\n¹⁷⁷Lu β⁻: 0.13 ÷ 0.67 ≈ **0.19 MeV/mm**\nSo α > ⁹⁰Y > ¹⁷⁷Lu. The heavy, doubly charged α particle dumps its energy over a tiny distance, which is why α emitters damage the cells they bind with little harm to neighbors.\n\n**α > Lu > Y** ranks by range alone (shortest range = largest force) and ignores the energies.\n**Y > Lu > α** assumes a longer range means a larger force.\n**Lu > Y > α** inverts the ratio (range ÷ energy).",
     "id": "p_cpd_8_q4"
    }
   ]
  },
  {
   "id": "p_cpd_9",
   "subj": "gen_chem",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5B",
    "4B",
    "5E"
   ],
   "title": "Delivering Volatile Anesthetics",
   "passage": "General anesthesia is usually maintained with a volatile halogenated ether breathed in with oxygen. Three ethers are in common use: desflurane (Compound 1), isoflurane (Compound 2) and sevoflurane (Compound 3). Nitrous oxide (N₂O), a gas at room temperature, is often added, although its MAC is above 100%, so it cannot produce full anesthesia on its own at 1 atm. An anesthetic's effect depends on its partial pressure in the brain, which comes to match its partial pressure in the inhaled gas. Potency is reported as the minimum alveolar concentration (MAC), the percentage of 1 atm that prevents movement in response to a skin incision in half of patients. More lipid-soluble agents (higher oil/gas partition coefficient) have lower MAC values. Agents that dissolve poorly in blood (low blood/gas partition coefficient) reach a steady brain partial pressure quickly, so patients both fall asleep and wake up faster.\n\nThe liquid agents are stored in a vaporizer. Part of the fresh gas flow passes through a chamber where it becomes saturated with vapor, and this stream is then mixed with the rest of the flow to give the dialed concentration. Sevoflurane liquid has a density of 1.5 g/mL and a molar mass of 200 g/mol.\n\nEarly vaporizers were made of thin glass. During long operations their output fell steadily, and the liquid inside was found to be several degrees colder than the room. Desflurane presents a different problem. Its boiling point is close to room temperature, so it is delivered from a special vaporizer that heats the liquid to 39°C and holds the vapor at about 2 atm.",
   "scheme": [
    {
     "after": 0,
     "caption": "Figure 1 Structures of desflurane (Compound 1), isoflurane (Compound 2) and sevoflurane (Compound 3)",
     "parts": [
      "cpd-desflurane",
      "cpd-isoflurane",
      "cpd-sevoflurane"
     ]
    }
   ],
   "figure": {
    "caption": "Table 1 Properties of inhaled anesthetics",
    "columns": [
     "Agent",
     "Boiling point (°C)",
     "Vapor pressure at 20°C (mmHg)",
     "Blood/gas partition coefficient",
     "Oil/gas partition coefficient",
     "MAC (%)"
    ],
    "rows": [
     [
      "Nitrous oxide",
      "−88",
      "gas",
      "0.47",
      "1.4",
      "104"
     ],
     [
      "Desflurane (1)",
      "23",
      "670",
      "0.42",
      "19",
      "6.0"
     ],
     [
      "Isoflurane (2)",
      "48",
      "240",
      "1.4",
      "98",
      "1.2"
     ],
     [
      "Sevoflurane (3)",
      "59",
      "160",
      "0.65",
      "47",
      "2.0"
     ]
    ]
   },
   "questions": [
    {
     "q": "Compound 1 differs from Compound 2 only in having F in place of Cl, yet it boils 25°C lower. What is the best explanation?",
     "choices": [
      "Fluorine is less polarizable than chlorine, so Compound 1 has weaker London dispersion forces.",
      "Fluorine is less electronegative than chlorine, so Compound 1 forms weaker hydrogen bonds.",
      "The C–F bond is stronger than the C–Cl bond, so Compound 1 molecules separate more easily.",
      "Fluorine is more electronegative than chlorine, so Compound 1 has stronger dipole–dipole forces."
     ],
     "ans": 0,
     "cat": "5B",
     "skill": "SIRS 1",
     "diff": "M",
     "exp": "Boiling separates whole molecules from each other, so it depends on **intermolecular** forces. Chlorine is a larger atom than fluorine, with more electrons held farther from the nucleus. Its electron cloud is more **polarizable**, so molecules containing Cl attract each other through stronger **London dispersion forces**. Swapping Cl for F (and lowering the molar mass from 184.5 to 168 g/mol) weakens these forces, so desflurane boils at 23°C instead of 48°C (Table 1).\n\nFluorine is the **most** electronegative element, and neither compound has an O–H or N–H, so neither forms hydrogen bonds with itself.\nC–F bond strength concerns **covalent** bonds inside the molecule, which don't break when a liquid boils.\nStronger dipole–dipole forces would **raise** the boiling point, not lower it.",
     "id": "p_cpd_9_q1"
    },
    {
     "q": "Approximately what volume of vapor at 20°C and 1.0 atm is produced when 1.0 mL of liquid Compound 3 evaporates completely?",
     "choices": [
      "0.18 mL",
      "180 mL",
      "1.8 L",
      "36 L"
     ],
     "ans": 1,
     "cat": "4B",
     "skill": "SIRS 2",
     "diff": "D",
     "exp": "First find moles, then use the **ideal gas law**.\nMass: 1.0 mL × 1.5 g/mL = 1.5 g.\nMoles: 1.5 g ÷ 200 g/mol = **7.5 × 10⁻³ mol**.\nAt 20°C (293 K) and 1.0 atm, one mole of gas occupies RT/P = 0.0821 × 293 ≈ **24 L**.\nV = 7.5 × 10⁻³ mol × 24 L/mol = 0.18 L = **180 mL**.\nSo each milliliter of liquid makes about 180 times its volume of vapor.\n\n**0.18 mL** reports the answer in liters but labels it milliliters.\n**1.8 L** slips a decimal place in 1.5 ÷ 200 (0.075 mol).\n**36 L** treats the 1.5 g as 1.5 mol, skipping the molar mass.",
     "id": "p_cpd_9_q2"
    },
    {
     "q": "For the conversion of liquid Compound 1 to its vapor at a pressure of 1.0 atm and a temperature of 15°C, what are the signs of ΔH, ΔS and ΔG?",
     "choices": [
      "ΔH > 0, ΔS > 0, ΔG > 0",
      "ΔH > 0, ΔS > 0, ΔG < 0",
      "ΔH < 0, ΔS > 0, ΔG < 0",
      "ΔH < 0, ΔS < 0, ΔG > 0"
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 2",
     "diff": "X",
     "exp": "Vaporization always **absorbs heat** (intermolecular attractions must be overcome), so **ΔH > 0**, and the gas is far more disordered than the liquid, so **ΔS > 0**. With both positive, ΔG = ΔH − TΔS is negative only above the temperature where ΔH = TΔS, which is the **normal boiling point**: 23°C for Compound 1 (Table 1). At 15°C, below the boiling point, TΔS < ΔH, so **ΔG > 0**: liquid desflurane will not turn into vapor at a pressure of 1 atm.\n(It still evaporates into room air, because there its partial pressure is far below its 670 mmHg vapor pressure. The question fixes the vapor at 1.0 atm.)\n\n**ΔG < 0 with both positive** would be correct above 23°C.\n**ΔH < 0** confuses the cooling of the remaining liquid (the system absorbs heat from it) with an exothermic process.\n**ΔS < 0** describes condensation, not vaporization.",
     "id": "p_cpd_9_q3"
    },
    {
     "q": "Which change to the design of the early vaporizers would best keep their output steady during long operations?",
     "choices": [
      "Surrounding the vaporizing chamber with a thick block of metal with a high specific heat and thermal conductivity",
      "Surrounding the vaporizing chamber with thermal insulation to block heat exchange with the room",
      "Sealing the vaporizing chamber so that it stays at a higher total pressure",
      "Increasing the fraction of the fresh gas flow that passes through the vaporizing chamber"
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 3",
     "diff": "D",
     "exp": "The passage gives the cause: the liquid became **colder** than the room. Evaporation absorbs the **heat of vaporization** from the remaining liquid, and as the liquid cools, its **vapor pressure falls**, so the saturated stream carries less anesthetic. The fix is to supply heat as fast as it is used: a large metal block stores heat (high **specific heat**, q = mcΔT, so its temperature drops little) and conducts it quickly into the liquid (high **thermal conductivity**). Modern vaporizers are built this way, with heavy copper or brass.\n\n**Insulation** blocks the room's heat from reaching the liquid, so it would cool faster.\nA **higher total pressure** in the chamber dilutes the vapor (its partial pressure stays at the vapor pressure while the total rises), and it doesn't address the cooling.\nSending **more gas** through the chamber evaporates more liquid per minute, which speeds the cooling; it would only mask the drift for a while.",
     "id": "p_cpd_9_q4"
    }
   ]
  },
  {
   "id": "p_cpd_s1",
   "subj": "biochemistry",
   "type": "passage",
   "topic": "C/P",
   "cats": [
    "5E",
    "5D",
    "4D"
   ],
   "title": "Alcohol Dehydrogenase and Toxic Alcohol Poisoning",
   "passage": "Methanol and ethylene glycol (HOCH₂CH₂OH) are not very toxic themselves. The damage comes from their metabolites. In the liver, the zinc-containing enzyme alcohol dehydrogenase (ADH) oxidizes each alcohol to an aldehyde, and a second enzyme oxidizes the aldehyde to a carboxylic acid. Methanol is converted to formic acid, which causes metabolic acidosis and damages the optic nerve. Ethylene glycol is eventually converted to oxalate, which precipitates in the kidney as calcium oxalate. ADH uses NAD⁺ as a cofactor, as shown for ethanol in Reaction 1.\n\nCH₃CH₂OH + NAD⁺ → CH₃CHO + NADH + H⁺\nReaction 1\n\nBecause the toxic products form only after ADH acts, poisoned patients are treated by blocking ADH. One antidote is fomepizole (Compound 1, molar mass 82.1 g/mol), a small heterocycle that binds the catalytic zinc ion in the active site. Before fomepizole was available, patients were given ethanol, which is also an ADH substrate.\n\nResearchers compared the three alcohols as ADH substrates. Each assay contained purified human ADH, 2.0 mM NAD⁺ and one alcohol in a pH 7.5 phosphate buffer at 25°C in a 1.0 cm cuvette. The initial rate was found by following the increase in absorbance at 340 nm, where NADH absorbs (ε = 6.2 × 10³ M⁻¹·cm⁻¹) and NAD⁺ does not. Each alcohol was tested at several concentrations, and the data were fit to the Michaelis–Menten equation. The ethanol assays were then repeated in the presence of 1.0 μM Compound 1. The results are shown in Table 1.",
   "figure": {
    "caption": "Table 1 Kinetic constants for human ADH (pH 7.5, 25°C)",
    "columns": [
     "Substrate",
     "Compound 1",
     "KM (mM)",
     "kcat (s⁻¹)"
    ],
    "rows": [
     [
      "Ethanol",
      "none",
      "0.50",
      "3.0"
     ],
     [
      "Methanol",
      "none",
      "20",
      "0.60"
     ],
     [
      "Ethylene glycol",
      "none",
      "40",
      "1.6"
     ],
     [
      "Ethanol",
      "1.0 μM",
      "5.5",
      "3.0"
     ]
    ]
   },
   "questions": [
    {
     "q": "Based on Table 1, by approximately what factor is the catalytic efficiency of ADH for ethanol greater than its catalytic efficiency for ethylene glycol?",
     "choices": [
      "1.9",
      "80",
      "150",
      "1500"
     ],
     "ans": 2,
     "cat": "5E",
     "skill": "SIRS 4",
     "exp": "Catalytic efficiency is **kcat/KM**, so you need both columns. Ethanol: 3.0 s⁻¹ ÷ 0.50 mM = 6.0 mM⁻¹·s⁻¹. Ethylene glycol: 1.6 s⁻¹ ÷ 40 mM = 0.040 mM⁻¹·s⁻¹. The ratio is 6.0 ÷ 0.040 = **150**.\n\n**1.9** compares only kcat (3.0 ÷ 1.6).\n**80** compares only KM (40 ÷ 0.50).\n**1500** is a factor-of-10 slip in the division.",
     "diff": "D",
     "id": "p_cpd_s1_q1"
    },
    {
     "q": "Which type of inhibition by Compound 1 is most consistent with the results in Table 1?",
     "choices": [
      "Competitive, because KM increased while kcat did not change",
      "Uncompetitive, because KM and kcat both decreased",
      "Noncompetitive, because kcat decreased while KM did not change",
      "Mixed, because KM increased while kcat decreased"
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 2",
     "exp": "Compare the two ethanol rows. With Compound 1, **KM rose 11-fold (0.50 → 5.5 mM) and kcat stayed at 3.0 s⁻¹**. Only a competitive inhibitor raises KM without changing kcat (or Vmax): enough substrate can still outcompete it. That fits the passage: Compound 1 binds the active-site zinc, the same place the substrate binds.\n\n**Uncompetitive** inhibition would lower both constants.\n**Noncompetitive** inhibition would lower kcat only.\n**Mixed** inhibition would also lower kcat, but kcat didn't change.\n\nExtra: KM,app = KM(1 + [I]/Ki), so 5.5 = 0.50(1 + 1.0 μM/Ki), giving Ki ≈ 0.10 μM.",
     "diff": "M",
     "id": "p_cpd_s1_q2"
    },
    {
     "q": "In one ethanol assay, the absorbance at 340 nm increased by 0.093 during the first minute. What was the initial rate of NADH formation?",
     "choices": [
      "0.15 μM/min",
      "1.5 μM/min",
      "15 μM/min",
      "150 μM/min"
     ],
     "ans": 2,
     "cat": "4D",
     "skill": "SIRS 2",
     "exp": "Use **A = εbc** to turn absorbance into concentration: Δc = ΔA ÷ (εb) = 0.093 ÷ (6.2 × 10³ M⁻¹·cm⁻¹ × 1.0 cm) = 1.5 × 10⁻⁵ M. That formed in 1 minute, so the rate is 1.5 × 10⁻⁵ M/min = **15 μM/min** (1 μM = 10⁻⁶ M).\n\nThe other choices are the same digits with the power of ten off, which is what happens if you drop the exponent in 10³ or convert M → μM the wrong way.",
     "diff": "D",
     "id": "p_cpd_s1_q3"
    },
    {
     "q": "When ADH acts on ethylene glycol, which functional-group change occurs?",
     "choices": [
      "A primary alcohol is oxidized to an aldehyde.",
      "A secondary alcohol is oxidized to a ketone.",
      "An aldehyde is reduced to a primary alcohol.",
      "A primary alcohol is dehydrated to an alkene."
     ],
     "ans": 0,
     "cat": "5D",
     "skill": "SIRS 1",
     "exp": "Each OH in HOCH₂CH₂OH sits on a CH₂ carbon that is bonded to only one other carbon, so both are **primary** alcohols. Reaction 1 shows what ADH does: it removes H from the alcohol (NAD⁺ → NADH), which is an **oxidation**, giving an aldehyde (–CH₂OH → –CHO).\n\nA ketone needs a secondary alcohol (the OH carbon bonded to two carbons).\nReduction is the reverse direction.\nDehydration loses water rather than hydrogen, and NAD⁺ isn't involved.",
     "diff": "E",
     "id": "p_cpd_s1_q4"
    },
    {
     "q": "In assays with 40 mM ethylene glycol, the absorbance rose beyond the detector's linear range within 10 seconds. Which change would best allow a valid initial-rate measurement without altering the KM being measured?",
     "choices": [
      "Lowering the concentration of ADH in each assay",
      "Raising the concentration of NAD⁺ in each assay",
      "Raising the concentration of ethylene glycol",
      "Measuring the absorbance at 260 nm instead"
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 3",
     "exp": "The rate is proportional to **enzyme concentration** (Vmax = kcat[E]), but KM doesn't depend on [E]. Using less ADH slows the absorbance rise into the measurable range, and the constants being measured stay the same.\n\nRaising NAD⁺ or the alcohol would make the reaction faster, not slower.\nAt 260 nm both NAD⁺ and NADH absorb (they both contain adenine), so the signal would no longer track product formation.",
     "diff": "X",
     "id": "p_cpd_s1_q5"
    },
    {
     "q": "The results in Table 1 best explain why ethanol was effective as an antidote for methanol poisoning because ethanol:",
     "choices": [
      "binds ADH much more tightly, so it outcompetes methanol for the active site.",
      "raises the kcat of ADH for methanol, so methanol is cleared faster.",
      "is converted to product more slowly than methanol, so it occupies ADH longer.",
      "lowers the KM of ADH for methanol, so less formic acid is produced."
     ],
     "ans": 0,
     "cat": "5E",
     "skill": "SIRS 2",
     "exp": "Ethanol and methanol compete for the same active site. Ethanol's **KM is 40 times lower** (0.50 vs 20 mM), so at similar concentrations ADH is mostly occupied by ethanol. Methanol is oxidized only slowly, giving the body time to excrete it unchanged.\n\nEthanol's kcat (3.0 s⁻¹) is actually *higher* than methanol's (0.60 s⁻¹), so \"converted more slowly\" contradicts the table.\nNothing in the data shows ethanol changing methanol's own constants.\nMaking methanol clear faster through ADH would make the poisoning worse, not better.",
     "diff": "M",
     "id": "p_cpd_s1_q6"
    }
   ]
  }
 ],
 "standalones": [
  {
   "q": "During a cardiac stress test, a treadmill belt moves at a constant 2.0 m/s while the motor exerts a 150 N force on the belt to overcome friction and the runner's push. What power does the motor deliver during a 1-minute stage of the test?",
   "choices": [
    "0 W",
    "75 W",
    "300 W",
    "18,000 W"
   ],
   "ans": 2,
   "cat": "4A",
   "skill": "SIRS 2",
   "diff": "M",
   "subj": "physics",
   "exp": "For a constant force along the motion, **P = Fv** = (150 N)(2.0 m/s) = **300 W**. The 1-minute length doesn't change the power, only the total work.\n\n**0 W** confuses zero net force with zero work. The motor's force does positive work on the belt; friction removes that energy as heat.\n**75 W** divides F by v instead of multiplying.\n**18,000 W** is the work done in one minute (300 W × 60 s = 18,000 J), which is an energy, not a power.",
   "id": "cp_diag_sa1"
  },
  {
   "q": "An IV bag of saline (density 1.0 × 10³ kg/m³) hangs so that the top of the fluid is 0.80 m above the catheter in a patient's arm. With the line clamped, what is the gauge pressure of the saline at the catheter? (g = 10 m/s²)",
   "choices": [
    "8.0 Pa",
    "0.80 kPa",
    "8.0 kPa",
    "109 kPa"
   ],
   "ans": 2,
   "cat": "4B",
   "skill": "SIRS 2",
   "diff": "D",
   "subj": "physics",
   "exp": "Gauge pressure in a fluid at rest is **P = ρgh** = (1.0 × 10³ kg/m³)(10 m/s²)(0.80 m) = 8.0 × 10³ Pa = **8.0 kPa** (about 60 mmHg, more than enough to exceed venous pressure).\n\n**8.0 Pa** uses a density of 1.0 (the value in g/cm³) without converting to kg/m³.\n**0.80 kPa** leaves out g.\n**109 kPa** is the **absolute** pressure (8 kPa + 101 kPa atmospheric); gauge pressure excludes the atmosphere.",
   "id": "cp_diag_sa2"
  },
  {
   "q": "A sealed, rigid container of oxygen gas is heated until its absolute temperature doubles. Which quantity also doubles?",
   "choices": [
    "The average kinetic energy of the molecules",
    "The root-mean-square speed of the molecules",
    "The number of moles of gas in the container",
    "The density of the gas in the container"
   ],
   "ans": 0,
   "cat": "4B",
   "skill": "SIRS 1",
   "diff": "M",
   "subj": "physics",
   "exp": "Kinetic molecular theory gives the average translational kinetic energy of a gas molecule as **(3/2)kT**, which is **directly proportional to the absolute temperature**. Doubling T doubles the average kinetic energy (and, at constant volume, the pressure).\n\nBecause KE = ½mv², the rms speed scales as √T, so it increases by a factor of √2 ≈ 1.4, not 2.\nThe container is sealed, so the amount of gas is unchanged.\nThe mass and volume are both unchanged, so the density is too.",
   "id": "cp_diag_sa3"
  },
  {
   "q": "In an eye-examination device, a converging lens with a focal length of 0.50 m forms an image of an object placed 0.75 m from the lens. Where is the image, and what type is it?",
   "choices": [
    "1.5 m from the lens, on the side opposite the object; real and inverted",
    "0.30 m from the lens, on the side opposite the object; real and inverted",
    "1.5 m from the lens, on the same side as the object; virtual and upright",
    "0.25 m from the lens, on the side opposite the object; real and inverted"
   ],
   "ans": 0,
   "cat": "4D",
   "skill": "SIRS 2",
   "diff": "X",
   "subj": "physics",
   "exp": "Thin-lens equation: 1/f = 1/o + 1/i, so 1/i = 1/0.50 − 1/0.75 = 2.0 − 1.33 = 0.67 m⁻¹, and **i = +1.5 m**. A positive image distance means a **real** image on the far side of the lens, and real images from a single lens are **inverted** (m = −i/o = −2).\n\n**0.30 m** adds 1/f and 1/o (2.0 + 1.33 = 3.33 m⁻¹) instead of subtracting.\nA virtual, upright image forms only when the object is inside the focal length (o < f); here o = 0.75 m > f = 0.50 m.\n**0.25 m** subtracts the distances (0.75 − 0.50) instead of their reciprocals.",
   "id": "cp_diag_sa4"
  },
  {
   "q": "A hospital receives a vial of ¹⁸F-labeled glucose analog (half-life 110 min) with an activity of 800 MBq at 7:00 a.m. What is its activity at 12:30 p.m. the same day?",
   "choices": [
    "50 MBq",
    "100 MBq",
    "200 MBq",
    "267 MBq"
   ],
   "ans": 1,
   "cat": "4E",
   "skill": "SIRS 2",
   "diff": "E",
   "subj": "physics",
   "exp": "From 7:00 a.m. to 12:30 p.m. is 5.5 h = **330 min = 3 half-lives** (330 ÷ 110). Each half-life halves the activity: 800 → 400 → 200 → **100 MBq**.\n\n**267 MBq** divides by 3 instead of halving three times.\n**200 MBq** stops after two half-lives.\n**50 MBq** counts four half-lives.",
   "id": "cp_diag_sa5"
  },
  {
   "q": "Which of the following atoms has the largest first ionization energy?",
   "choices": [
    "Boron",
    "Carbon",
    "Nitrogen",
    "Oxygen"
   ],
   "ans": 2,
   "cat": "4E",
   "skill": "SIRS 1",
   "diff": "D",
   "subj": "gen_chem",
   "exp": "Ionization energy generally rises across a period as nuclear charge increases, but there's an exception between groups 15 and 16. **Nitrogen** (2p³) has one electron in each 2p orbital, a stable half-filled set. **Oxygen** (2p⁴) has one orbital holding a **pair** of electrons, and the repulsion between them makes that electron easier to remove. So IE(N) > IE(O).\n\nOxygen is the answer you get from applying the trend alone.\nBoron and carbon have lower nuclear charge and lower ionization energies than nitrogen; boron is also below beryllium because its 2p electron is higher in energy than a 2s electron.",
   "id": "cp_diag_sa6"
  },
  {
   "q": "Zinc is the catalytic metal in many enzymes, where it is present as Zn²⁺. What is the ground-state electron configuration of Zn²⁺?",
   "choices": [
    "[Ar]3d¹⁰",
    "[Ar]4s²3d⁸",
    "[Ar]4s²3d¹⁰",
    "[Ar]4s¹3d⁹"
   ],
   "ans": 0,
   "cat": "4E",
   "skill": "SIRS 1",
   "diff": "M",
   "subj": "gen_chem",
   "exp": "Neutral Zn is [Ar]4s²3d¹⁰. When transition metals form cations, the **4s electrons are removed first**, so Zn²⁺ is **[Ar]3d¹⁰**. Its filled d subshell is why Zn²⁺ is colorless and doesn't undergo redox reactions in enzymes; it acts as a Lewis acid instead.\n\n**[Ar]4s²3d⁸** removes the 3d electrons first, following filling order backward.\n**[Ar]4s²3d¹⁰** is neutral zinc.\n**[Ar]4s¹3d⁹** has the right number of electrons (28) but removes one 3d electron instead of the second 4s electron, so it is not the ground state.",
   "id": "cp_diag_sa7"
  },
  {
   "q": "A technician dilutes 10 mL of 0.10 M HCl with water to a final volume of 1.0 L. What is the pH of the diluted solution?",
   "choices": [
    "1",
    "2",
    "3",
    "11"
   ],
   "ans": 2,
   "cat": "5A",
   "skill": "SIRS 2",
   "diff": "E",
   "subj": "gen_chem",
   "exp": "Use **M₁V₁ = M₂V₂**: (0.10 M)(0.010 L) = M₂(1.0 L), so M₂ = 1.0 × 10⁻³ M. HCl is a strong acid, so [H⁺] = 1.0 × 10⁻³ M and **pH = 3**.\n\n**1** is the pH before dilution.\n**2** assumes a 10-fold dilution; going from 10 mL to 1000 mL is 100-fold.\n**11** is the pOH, not the pH.",
   "id": "cp_diag_sa8"
  },
  {
   "q": "Bone mineral contains calcium phosphate, Ca₃(PO₄)₂. If the molar solubility of Ca₃(PO₄)₂ in pure water is s, which expression gives its Ksp?",
   "choices": [
    "s⁵",
    "6s⁵",
    "72s⁵",
    "108s⁵"
   ],
   "ans": 3,
   "cat": "5A",
   "skill": "SIRS 1",
   "diff": "D",
   "subj": "gen_chem",
   "exp": "Each formula unit dissolves as Ca₃(PO₄)₂ ⇌ 3Ca²⁺ + 2PO₄³⁻, so [Ca²⁺] = **3s** and [PO₄³⁻] = **2s**.\nKsp = [Ca²⁺]³[PO₄³⁻]² = (3s)³(2s)² = 27s³ × 4s² = **108s⁵**.\n\n**s⁵** forgets that each formula unit releases 3 Ca²⁺ and 2 PO₄³⁻.\n**6s⁵** multiplies the coefficients (3 × 2) without raising them to their powers.\n**72s⁵** swaps the exponents (3² × 2³).",
   "id": "cp_diag_sa9"
  },
  {
   "q": "An enzyme increases the rate of a reversible reaction by a factor of 10⁶. Compared with the uncatalyzed reaction, the enzyme-catalyzed reaction has:",
   "choices": [
    "a lower activation energy in both the forward and reverse directions.",
    "a larger equilibrium constant.",
    "a more negative standard free energy change.",
    "a lower activation energy in the forward direction only."
   ],
   "ans": 0,
   "cat": "5E",
   "skill": "SIRS 1",
   "diff": "M",
   "subj": "gen_chem",
   "exp": "A catalyst provides a pathway with a **lower-energy transition state**. Because the forward and reverse reactions pass through the same transition state, **both activation energies drop by the same amount**, and both rates increase.\n\nThe energies of reactants and products don't change, so ΔG° and K stay the same; the catalyst only gets the system to equilibrium faster.\nLowering only the forward barrier would change K, which a catalyst cannot do.",
   "id": "cp_diag_sa10"
  },
  {
   "q": "Which of the following compounds has the highest boiling point?",
   "choices": [
    "1-Butanol",
    "Diethyl ether",
    "Butanal",
    "Pentane"
   ],
   "choiceFigs": [
    "1-butanol",
    "diethyl-ether",
    "butanal",
    "cpd-pentane"
   ],
   "ans": 0,
   "cat": "5B",
   "skill": "SIRS 1",
   "diff": "D",
   "subj": "organic_chem",
   "exp": "All four have similar molar masses (72–74 g/mol), so London dispersion forces are about the same, and the difference comes from the other intermolecular forces. Only **1-butanol** has an O–H group, so it can **hydrogen-bond** to itself (bp ≈ 117°C).\n\nButanal has a polar C=O and dipole–dipole forces but no O–H to donate (bp ≈ 75°C).\nDiethyl ether has a weakly polar C–O–C and no O–H (bp ≈ 35°C).\nPentane has only dispersion forces (bp ≈ 36°C).",
   "id": "cp_diag_sa11"
  },
  {
   "q": "A mixture is spotted on a silica gel TLC plate and developed with 4:1 hexane–ethyl acetate. Which component travels the farthest up the plate?",
   "choices": [
    "Benzyl alcohol",
    "Ethylbenzene",
    "Phenylacetic acid",
    "Acetophenone"
   ],
   "choiceFigs": [
    "benzyl-alcohol",
    "ethylbenzene",
    "phenylacetic-acid",
    "acetophenone"
   ],
   "ans": 1,
   "cat": "5B",
   "skill": "SIRS 1",
   "diff": "D",
   "subj": "organic_chem",
   "exp": "Silica gel is a **polar** stationary phase, and this eluent is mostly nonpolar hexane. Polar compounds stick to the silica and move slowly; nonpolar compounds stay in the mobile phase and travel farthest (highest Rf). **Ethylbenzene** is a hydrocarbon with no polar functional group, so it has the highest Rf.\n\nAcetophenone has a polar C=O, so it moves less.\nBenzyl alcohol hydrogen-bonds to the silica's Si–OH groups.\nPhenylacetic acid, with a carboxylic acid, binds most strongly and moves least.",
   "id": "cp_diag_sa12"
  },
  {
   "q": "In acidic solution, the compound shown cyclizes by intramolecular esterification. The ring in the product contains:",
   "fig": "cpd-4-hydroxybutanoic-acid",
   "choices": [
    "five atoms, one of which is oxygen.",
    "four atoms, one of which is oxygen.",
    "six atoms, two of which are oxygen.",
    "five atoms, two of which are oxygen."
   ],
   "ans": 0,
   "cat": "5D",
   "skill": "SIRS 2",
   "diff": "M",
   "subj": "organic_chem",
   "exp": "The compound is 4-hydroxybutanoic acid, HO–CH₂CH₂CH₂–COOH. The hydroxyl oxygen attacks the carboxyl carbon, and water is lost. The ring closes through C1 (the carbonyl carbon), C2, C3, C4 and the **ester oxygen**: **5 atoms, 1 of them oxygen**. The product is γ-butyrolactone.\n\n**Four atoms** counts only the carbons.\nThe carbonyl oxygen is double-bonded to C1 outside the ring; counting it as a ring atom gives the choices with two oxygens (five or six atoms).",
   "id": "cp_diag_sa13"
  },
  {
   "q": "In an α-helix, the C=O group of the backbone of each residue forms a hydrogen bond with:",
   "choices": [
    "the backbone N–H of the residue four positions farther along the chain.",
    "the side chain of the residue four positions farther along the chain.",
    "the backbone N–H of a residue in a neighboring strand.",
    "the backbone N–H of the next residue in the chain."
   ],
   "ans": 0,
   "cat": "5D",
   "skill": "SIRS 1",
   "diff": "D",
   "subj": "biochemistry",
   "exp": "The α-helix is held together by **backbone–backbone** hydrogen bonds running parallel to the helix axis: the C=O of residue **i** accepts a hydrogen bond from the N–H of residue **i + 4**. That gives 3.6 residues per turn, with side chains pointing outward.\n\nSecondary structure is defined by backbone hydrogen bonds; side chains aren't involved.\nHydrogen bonds between neighboring strands define a **β-sheet**.\nThe adjacent residue (i + 1) is too close; its N–H can't reach the C=O in the right geometry.",
   "id": "cp_diag_sa14"
  },
  {
   "q": "A freshly prepared aqueous solution of pure α-D-glucopyranose shows an optical rotation that changes over about an hour before leveling off. Which statement best explains this observation?",
   "choices": [
    "The ring opens to the open-chain aldehyde and recloses, forming some β-D-glucopyranose, a diastereomer with a different specific rotation.",
    "The glucose slowly racemizes to L-glucose, its enantiomer, which rotates light in the opposite direction.",
    "Water hydrolyzes the glycosidic bond, releasing free glucose with a different specific rotation.",
    "Glucose epimerizes at C2 to mannose, which has a different specific rotation."
   ],
   "ans": 0,
   "cat": "5D",
   "skill": "SIRS 1",
   "diff": "X",
   "subj": "biochemistry",
   "exp": "This is **mutarotation**. Glucopyranose is a cyclic **hemiacetal**, so in water the ring opens to the open-chain aldehyde and recloses. Attack from either face of the C=O gives either anomer at C1, so α and β interconvert until they reach equilibrium (about one-third α, two-thirds β). The **anomers** differ only at C1, so they are diastereomers with different specific rotations, and the rotation of the solution changes until equilibrium is reached.\n\nTurning D-glucose into L-glucose would require inverting all four stereocenters (C2–C5), which doesn't happen in water.\nA monosaccharide has no glycosidic bond to hydrolyze.\nC2 epimerization needs an enzyme or strong base; ring opening and closing changes only C1.",
   "id": "cp_diag_sa15"
  }
 ]
};
