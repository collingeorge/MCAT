// Chem/Phys passage practice: original passages written to the AAMC C/P blueprint, used after the daily quiz
// to practice weak topics (one passage at a time, with explanations). Separate from the diagnostic and quizzes.
const CP_PRACTICE = [
 {
  "id": "p_cpx1_1",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5E"
  ],
  "title": "Acetylcholinesterase and Carbamate Drugs for Myasthenia Gravis",
  "passage": "At the neuromuscular junction, acetylcholine (ACh) released from a motor neuron binds nicotinic receptors on the muscle fiber. The signal ends when acetylcholinesterase (AChE), anchored in the synaptic cleft, hydrolyzes ACh to choline and acetate. AChE is one of the fastest enzymes known; each active site turns over thousands of ACh molecules per second. In myasthenia gravis, antibodies reduce the number of working receptors, and patients are treated with drugs that slow the breakdown of ACh.\n\nThe active site of human AChE lies at the bottom of a narrow gorge lined with aromatic side chains. The positively charged trimethylammonium group of ACh is held by a cation–π interaction with Trp86, and the ester group sits next to a catalytic triad of Ser203, His447 and Glu334. Ser203 attacks the ester carbonyl carbon, choline leaves, and an acetyl-enzyme forms (Figure 1, in which free serine stands in for the Ser203 side chain). A water molecule, activated by the same triad, then hydrolyzes the acetyl-enzyme and regenerates free Ser203.\n\nNeostigmine (Compound 1) and pyridostigmine are carbamate drugs. They bind in the same site as ACh and transfer a dimethylcarbamoyl group to Ser203, releasing a phenol (Compound 2, in the case of neostigmine), as shown in Figure 2. The carbamoylated enzyme is hydrolyzed far more slowly than the acetyl-enzyme, so AChE is out of action for a time and ACh persists longer in the cleft. Organophosphate insecticides such as paraoxon act in a similar way but phosphorylate Ser203 instead.\n\nResearchers modified purified human AChE with each compound, removed the excess compound, and followed the first-order recovery of enzyme activity in pH 7.4 buffer at 37°C. The half-life of each modified enzyme is given in Table 1.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Acylation of the active-site serine by acetylcholine",
    "parts": [
     "cpx1-acetylcholine",
     "+",
     "cpx1-serine",
     {
      "arrow": "AChE (His447, Glu334)"
     },
     "cpx1-acetylserine",
     "+",
     "cpx1-choline"
    ]
   },
   {
    "after": 2,
    "caption": "Figure 2 Carbamoylation of the active-site serine by Compound 1",
    "parts": [
     "cpx1-neostigmine",
     "+",
     "cpx1-serine",
     {
      "arrow": "AChE"
     },
     "cpx1-carbamoylserine",
     "+",
     "cpx1-neostigmine-phenol"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Recovery of modified human AChE (pH 7.4, 37°C)",
   "columns": [
    "Group on Ser203",
    "Transferred from",
    "Leaving group",
    "Half-life of modified enzyme"
   ],
   "rows": [
    [
     "Acetyl",
     "Acetylcholine",
     "Choline",
     "0.10 ms"
    ],
    [
     "Dimethylcarbamoyl",
     "Neostigmine (Compound 1)",
     "Compound 2",
     "30 min"
    ],
    [
     "Dimethylcarbamoyl",
     "Pyridostigmine",
     "3-Hydroxy-1-methylpyridinium",
     "30 min"
    ],
    [
     "Diethylphosphoryl",
     "Paraoxon",
     "4-Nitrophenol",
     "about 1 day"
    ]
   ]
  },
  "questions": [
   {
    "q": "In the catalytic triad of AChE, the side chain of His447 most likely functions to:",
    "choices": [
     "accept a proton from the Ser203 hydroxyl group, making the oxygen a stronger nucleophile.",
     "donate a proton to the Ser203 hydroxyl group, making the oxygen a better leaving group.",
     "form a covalent bond to the carbonyl carbon of acetylcholine.",
     "hold the trimethylammonium group of acetylcholine by a cation–π interaction."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "In a Ser–His–acid triad, the **imidazole ring of histidine acts as a general base**. One ring nitrogen pulls the proton off the serine OH as the oxygen attacks the carbonyl carbon, so the attacking group behaves like an alkoxide, a much stronger nucleophile than a neutral OH. The glutamate (Glu334) holds the histidine in position and stabilizes its positive charge once it is protonated.\n\nDonating a proton to serine would make the oxygen less nucleophilic, the opposite of what is needed.\nThe covalent bond to the carbonyl carbon is formed by **Ser203**, not His447 (Figure 1).\nThe passage gives the cation–π job to the aromatic residue **Trp86**; histidine sits in the triad.",
    "id": "p_cpx1_1_q1"
   },
   {
    "q": "Hydrolysis of the dimethylcarbamoyl-enzyme is much slower than hydrolysis of the acetyl-enzyme. Which statement best explains this difference?",
    "choices": [
     "Donation of the nitrogen lone pair into the C=O group makes the carbonyl carbon less electrophilic.",
     "Withdrawal of electron density by the nitrogen atom makes the carbonyl carbon more electrophilic.",
     "The carbonyl carbon of the carbamoyl group is sp³ hybridized, so water cannot attack it.",
     "The dimethylcarbamoyl group carries a positive charge that repels the attacking water molecule."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Compare the two groups on Ser203 in Figures 1 and 2. In the acetyl-enzyme the carbonyl carbon carries a CH₃ group; in the carbamoyl-enzyme it carries an **N(CH₃)₂ group**. Nitrogen's lone pair is delocalized into the C=O by **resonance**, just as in an amide. That puts extra electron density on the carbonyl carbon, so it is a poorer target for the water molecule that must attack it. The result in Table 1 is a modified enzyme that lasts 30 min instead of 0.10 ms.\n\nNitrogen is electronegative, but its resonance donation outweighs its inductive pull; if it made the carbon more electrophilic, hydrolysis would be faster, not slower.\nA C=O carbon is **sp²**, as in every carbonyl group.\nThe positive trimethylammonium group belongs to the leaving group (Compound 2), which departs; the dimethylcarbamoyl group left on Ser203 is neutral.",
    "id": "p_cpx1_1_q2"
   },
   {
    "q": "After excess Compound 1 is removed, approximately what percentage of the dimethylcarbamoylated AChE is still carbamoylated 2.0 h later?",
    "choices": [
     "6%",
     "12%",
     "25%",
     "94%"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "Recovery is **first order**, so count half-lives. Table 1 gives t½ = 30 min, and 2.0 h = 120 min = 4 half-lives. The fraction left is (1/2)⁴ = 1/16 ≈ 0.0625, or about **6%**.\n\n**12%** is (1/2)³, one half-life short of the count.\n**25%** is (1/2)², what you get by treating each hour as one half-life.\n**94%** is the fraction that has **recovered** (1 − 1/16), not the fraction still modified.",
    "id": "p_cpx1_1_q3"
   },
   {
    "q": "Based on Table 1, the first-order rate constant for hydrolysis of the acetyl-enzyme is larger than that for the dimethylcarbamoyl-enzyme by a factor of approximately:",
    "choices": [
     "1.8 × 10⁴",
     "3.0 × 10⁵",
     "1.8 × 10⁷",
     "1.8 × 10¹⁰"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "For a first-order process **k = 0.693/t½**, so the ratio of rate constants is the inverse ratio of half-lives. Put both half-lives in seconds first:\n30 min = 1800 s\n0.10 ms = 1.0 × 10⁻⁴ s\nRatio = 1800 ÷ (1.0 × 10⁻⁴) = **1.8 × 10⁷**.\n\n**3.0 × 10⁵** comes from dividing 30 by 1.0 × 10⁻⁴, leaving the minutes unconverted.\n**1.8 × 10⁴** comes from dividing 1800 by 0.10, treating milliseconds as seconds.\n**1.8 × 10¹⁰** comes from writing 0.10 ms as 1.0 × 10⁻⁷ s (a microsecond slip).",
    "id": "p_cpx1_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx1_2",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5A",
   "5B",
   "5D"
  ],
  "title": "Formulating Pilocarpine Eye Drops",
  "passage": "Pilocarpine (Compound 1) is a plant alkaloid that activates muscarinic acetylcholine receptors in the eye. It contracts the iris sphincter and the ciliary muscle, which narrows the pupil and opens the drainage pathway for aqueous humor. Eye drops of pilocarpine hydrochloride (molar mass 245 g/mol) are used to lower eye pressure in glaucoma and, at low strength, to treat age-related loss of near focus.\n\nEye-drop strengths are stated as % w/v, the grams of solute in 100 mL of solution.\n\nCompound 1 is a γ-lactone and is unstable in solution. Hydroxide ion promotes two reactions: hydrolysis of the lactone ring to inactive pilocarpic acid, and removal of the acidic C–H at C3, next to the carbonyl group, which leads to the much weaker drug isopilocarpine. To choose storage conditions, a manufacturer prepared four formulations, each containing a buffer and a preservative, and stored them for 12 months at 25°C before assaying the remaining Compound 1 by HPLC (Table 1). Formulation D was buffered near the pH of tear fluid, which is more comfortable on instillation. The imidazole nitrogen of Compound 1 has a pKa near 7, so at pH 5.0 almost all of the drug is present as the protonated cation.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Structure of pilocarpine (Compound 1)",
    "parts": [
     "cpx1-pilocarpine"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Pilocarpine eye-drop formulations",
   "columns": [
    "Formulation",
    "Pilocarpine HCl (% w/v)",
    "pH",
    "Compound 1 remaining after 12 months (%)"
   ],
   "rows": [
    [
     "A",
     "1.0",
     "5.0",
     "98"
    ],
    [
     "B",
     "2.0",
     "5.0",
     "97"
    ],
    [
     "C",
     "4.0",
     "5.0",
     "97"
    ],
    [
     "D",
     "2.0",
     "7.0",
     "71"
    ]
   ]
  },
  "questions": [
   {
    "q": "What is the concentration of chloride ion contributed by pilocarpine hydrochloride in Formulation C?",
    "choices": [
     "0.016 M",
     "0.16 M",
     "0.33 M",
     "6.1 M"
    ],
    "ans": 1,
    "exp": "A strength of **% w/v** is grams per 100 mL, so 4.0% w/v = 4.0 g per 100 mL = **40 g/L**.\nMoles per liter: 40 g/L ÷ 245 g/mol ≈ **0.16 mol/L** (check: 245 × 0.16 = 39.2 ≈ 40).\nEach formula unit of pilocarpine hydrochloride releases **one Cl⁻** (and one protonated drug cation), so [Cl⁻] = **0.16 M**.\n\n**0.016 M** reads 4.0% as 4.0 g per liter instead of per 100 mL.\n**0.33 M** counts both ions of the salt as chloride; only one of the two ions is Cl⁻.\n**6.1 M** inverts the ratio (245 ÷ 40).",
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "M",
    "id": "p_cpx1_2_q1"
   },
   {
    "q": "Take the pKa of the imidazole nitrogen of Compound 1 as 7.0. Compared with Formulation B, Formulation D has how many times the hydroxide ion concentration, and what fraction of Compound 1 in Formulation D is protonated?",
    "choices": [
     "100 times; about half",
     "100 times; nearly all",
     "2 times; about half",
     "2 times; nearly all"
    ],
    "ans": 0,
    "exp": "**Hydroxide:** at 25°C, pOH = 14 − pH. Formulation B (pH 5.0) has pOH 9.0, so [OH⁻] = 10⁻⁹ M; Formulation D (pH 7.0) has pOH 7.0, so [OH⁻] = 10⁻⁷ M.\n10⁻⁷ ÷ 10⁻⁹ = **100 times** more OH⁻. Each pH unit is a **factor of 10**, and the two formulations differ by 2 units. This fits the much faster loss of Compound 1 in Formulation D (71% left versus 97%).\n\n**Protonation:** when **pH = pKa**, the Henderson–Hasselbalch equation gives log([base]/[acid]) = 0, so [base] = [acid] and the drug is **about half protonated**.\n\n**2 times** treats the 2-unit pH difference as a factor of 2 instead of 10².\n**Nearly all** protonated is true at pH 5.0 (two units below the pKa, where the cation outnumbers the neutral form 100 to 1), not at pH 7.0.",
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "X",
    "id": "p_cpx1_2_q2"
   },
   {
    "q": "The structure of isopilocarpine is shown. Pilocarpine (Compound 1) and isopilocarpine are best described as:",
    "fig": "cpx1-isopilocarpine",
    "choices": [
     "enantiomers, because they are nonsuperimposable mirror images.",
     "diastereomers, because they differ in configuration at only one of two stereocenters.",
     "constitutional isomers, because their atoms are connected in a different order.",
     "conformers, because they interconvert by rotation about a single bond."
    ],
    "ans": 1,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "Both molecules have the same connectivity and **two stereocenters**, C3 (bearing the ethyl group) and C4 (bearing the CH₂-imidazole group). Compound 1 is (3S,4R); isopilocarpine is (3R,4R). Changing **one of two** stereocenters gives stereoisomers that are not mirror images: **diastereomers**. Diastereomers that differ at a single center are also called **epimers**, which fits the passage: removing the C3 proton gives a planar enolate, and adding H⁺ back to the other face inverts only C3.\n\nEnantiomers would need **both** centers inverted, (3R,4S).\nThe atoms are bonded in the same order, so they are not constitutional isomers.\nInverting a stereocenter requires breaking a bond (here the C3–H bond), so they are not conformers.",
    "id": "p_cpx1_2_q3"
   },
   {
    "q": "To find out which of the two hydroxide-promoted reactions caused most of the loss of Compound 1 in Formulation D, which measurement on the stored solution would be most useful?",
    "choices": [
     "Mass spectrometry of the main degradation product, to determine its molar mass",
     "The density of the solution, to determine how much solute is still dissolved",
     "The UV absorbance of the imidazole ring, to determine how much ring remains",
     "The optical rotation of the solution, to determine whether it is still chiral"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "The two possible products differ in **mass**. Lactone hydrolysis adds water across the ester bond, so pilocarpic acid is Compound 1 **+ H₂O (+18 g/mol)**: a carboxylic acid and a primary alcohol in one chain. Isopilocarpine is an **epimer** with exactly the same formula and molar mass. A mass spectrum of the product therefore tells the two pathways apart.\n\nDensity: both products stay dissolved and have nearly the same mass as Compound 1, so the density of the solution cannot tell them apart.\nUV of the imidazole: neither reaction touches the imidazole ring, so its absorbance is the same for both products.\nOptical rotation: both products are still chiral and both would change the rotation, so a change cannot say which product formed.",
    "id": "p_cpx1_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx1_3",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4B",
   "4A"
  ],
  "title": "Buoyancy and Water Pressure in Aquatic Therapy",
  "passage": "After a hip or knee replacement, patients are often told to limit how much weight they put on the operated leg for several weeks. An underwater treadmill lets them start walking early. The patient stands on a treadmill belt in a heated pool (34°C) whose floor can be raised or lowered, so the water can be set to any level on the body. The deeper the patient is immersed, the larger the upward buoyant force from the water and the smaller the force that the legs must transmit to the belt. A force plate under the belt records that load.\n\nBy Archimedes' principle, the buoyant force equals the weight of the water displaced by the submerged part of the body. A physical therapist measured the submerged volume of one patient (mass 80 kg) at four standard immersion levels from the rise of the water in the tank: 8 L with the water at the knee (0.50 m deep at the belt), 32 L at the hip (0.90 m), 56 L at the xiphoid process (1.20 m) and 72 L at the neck (1.40 m). The patient's heart rate while walking at 3 km/h fell slightly with deeper immersion, from 104 to 94 beats/min. The density of the pool water is 1.0 g/mL, and g = 10 m/s².\n\nThe water also presses on the body. Gauge pressure in the pool rises with depth as P = ρgh, so the feet and lower legs, at the greatest depth, are squeezed the most. This pressure gradient pushes edema fluid and venous blood from the legs back toward the trunk and can reduce ankle swelling after surgery. Clinicians compare it with venous pressures and with the pressure of compression stockings, both usually given in mmHg (1 mmHg = 133 Pa).\n\nLater in therapy, patients strengthen the shoulders with foam floats (volume 1.5 L, mass 0.10 kg each) held in the hands. The patient pushes a float down until it is fully under water, holds it still, and then lets it rise slowly while resisting it.",
  "questions": [
   {
    "q": "When the patient described in the passage is immersed to the neck, what is the buoyant force on the patient?",
    "choices": [
     "72 N",
     "80 N",
     "720 N",
     "7.2 × 10⁵ N"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "**Archimedes' principle**: the buoyant force equals the weight of the water displaced, **F = ρVg**.\nV = 72 L = 72 × 10⁻³ m³ = 0.072 m³ (1 L = 10⁻³ m³), ρ = 1.0 g/mL = 1000 kg/m³\nF = 1000 × 0.072 × 10 = **720 N** upward, 90% of the patient's 800 N weight.\n\n**72 N** converts liters with 10⁻⁴ m³ per liter instead of 10⁻³.\n**7.2 × 10⁵ N** leaves the volume in liters (1000 × 72 × 10).\n**80 N** is the load left on the belt (800 − 720), the apparent weight, not the buoyant force.",
    "id": "p_cpx1_3_q1"
   },
   {
    "q": "In the first weeks after surgery, the load on the treadmill belt must be no more than 40% of the patient's body weight. Of the four immersion levels in the passage, which is the shallowest that meets this limit while the patient stands still on the belt?",
    "choices": [
     "Knee",
     "Hip",
     "Xiphoid process",
     "Neck"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Standing still, the patient is in **equilibrium**, so the upward forces balance the weight: **N + F(buoyant) = mg**. The belt's normal force N is the patient's apparent weight.\nmg = 80 kg × 10 m/s² = 800 N; the limit is 0.40 × 800 = **320 N**. Each liter submerged gives 1000 × 10⁻³ × 10 = 10 N of buoyancy.\nKnee: N = 800 − 80 = 720 N (90%)\nHip: N = 800 − 320 = 480 N (60%)\nXiphoid: N = 800 − 560 = **240 N (30%)** ✓\nNeck: N = 800 − 720 = 80 N (10%)\nThe **xiphoid** level is the shallowest that keeps the load at or under 40%.\n\n**Hip** is the trap: there the **buoyant force** is 40% of body weight, but the belt still carries the other 60%.\n**Neck** also meets the limit, but it is not the shallowest level that does.\n**Knee** removes only 80 N; the belt still carries 90% of the weight.",
    "id": "p_cpx1_3_q2"
   },
   {
    "q": "When the patient is immersed to the xiphoid process, by about how much does the water raise the pressure on the soles of the feet?",
    "choices": [
     "0.090 mmHg",
     "90 mmHg",
     "850 mmHg",
     "1.6 × 10⁶ mmHg"
    ],
    "ans": 1,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "The pressure added by a column of fluid is the **gauge pressure P = ρgh**. At the xiphoid level the feet are 1.20 m deep:\nP = 1000 kg/m³ × 10 m/s² × 1.20 m = 1.2 × 10⁴ Pa (12 kPa)\nIn mmHg: 1.2 × 10⁴ Pa ÷ 133 Pa/mmHg ≈ **90 mmHg**, about the venous pressure in the ankles of a person standing in air, which is why immersion limits leg swelling.\n\n**850 mmHg** adds atmospheric pressure (760 mmHg), giving the absolute pressure; the water raises the pressure only by the gauge part.\n**0.090 mmHg** uses ρ = 1.0 without converting g/mL to kg/m³ (12 Pa).\n**1.6 × 10⁶ mmHg** multiplies by 133 instead of dividing.",
    "id": "p_cpx1_3_q3"
   },
   {
    "q": "A patient holds a foam float completely under water and then pushes it 0.30 m deeper, again holding it still. Compared with before, the force the patient must exert on the float is:",
    "choices": [
     "the same, because the float displaces the same volume of water at both depths.",
     "larger, because the water pressure is greater at the greater depth.",
     "smaller, because more water above the float pushes it down.",
     "larger, because the buoyant force is proportional to the depth of the float."
    ],
    "ans": 0,
    "cat": "4A",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "Holding the float still means the forces on it balance: **F(hand) + mg = F(buoyant)**. The buoyant force is **ρ(water)·V(displaced)·g**, and a fully submerged float displaces its whole 1.5 L at any depth. So the force is **the same**:\nF(buoyant) = 1000 × 1.5 × 10⁻³ × 10 = 15 N; weight = 0.10 × 10 = 1.0 N; F(hand) = 15 − 1.0 = 14 N at both depths.\n\nPressure does rise with depth, but it rises on the top and the bottom of the float by the same amount; buoyancy comes from the **difference** between them, which depends only on the float's height.\nThe water above the float is already counted in that pressure difference; it does not add a separate downward push.\nDepth does not appear in ρVg, so the buoyant force is not proportional to depth.",
    "id": "p_cpx1_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx1_4",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4E",
   "5C"
  ],
  "title": "Two Routes to the Antihistamine Precursor Benzhydrol",
  "passage": "Diphenhydramine is a first-generation H1 antihistamine; because it crosses the blood–brain barrier, it is also sedating. Its carbon bearing two phenyl rings comes from diphenylmethanol (benzhydrol, Compound 4, 184 g/mol), which a teaching laboratory prepared by two routes.\n\nIn Route A, bromobenzene (Compound 1, 157 g/mol) was stirred with magnesium turnings in anhydrous diethyl ether to give phenylmagnesium bromide (Compound 2). The carbon bonded to magnesium in Compound 2 is both strongly nucleophilic and strongly basic. A solution of benzaldehyde (Compound 3, 106 g/mol) in ether was added dropwise, and the mixture was then poured into cold dilute HCl. In Route B, benzophenone (Compound 5, 182 g/mol) was reduced with NaBH₄ in methanol. Compound 4 from either route was converted to diphenhydramine (Compound 6) by treatment with HBr followed by 2-(dimethylamino)ethanol.\n\nIn Run 1 of Route A, 15.7 g of Compound 1, 2.43 g (0.100 mol) of Mg and 10.6 g of Compound 3 gave 14.7 g of Compound 4, mp 66–68°C. The crude product also contained a little biphenyl (C₆H₅–C₆H₅), formed when two phenyl groups couple during formation of Compound 2. In Run 2, the ether had not been dried; only 5.5 g of Compound 4 formed, and benzene was the main by-product. Route B gave 17.5 g of Compound 4 from 18.2 g of Compound 5. Each reaction was monitored by thin-layer chromatography (TLC) on silica gel, eluted with 9:1 hexane–ethyl acetate. After each workup, the organic layer was separated, dried over anhydrous MgSO₄ and evaporated, and the solid was recrystallized from hexane, in which biphenyl stays dissolved. Compound 6 is a liquid at room temperature and is sold as its hydrochloride salt, a water-soluble solid.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Route A to Compound 4",
    "parts": [
     "cpx1-bromobenzene",
     {
      "arrow": "Mg, dry (C₂H₅)₂O"
     },
     "cpx1-phmgbr",
     "+",
     "cpx1-benzaldehyde",
     {
      "arrow": "1. (C₂H₅)₂O  2. H₃O⁺"
     },
     "cpx1-benzhydrol"
    ]
   },
   {
    "after": 1,
    "caption": "Figure 2 Route B to Compound 4, and conversion to diphenhydramine (Compound 6)",
    "parts": [
     "cpx1-benzophenone",
     {
      "arrow": "NaBH₄, CH₃OH"
     },
     "cpx1-benzhydrol",
     {
      "arrow": "1. HBr  2. HOCH₂CH₂N(CH₃)₂"
     },
     "cpx1-diphenhydramine"
    ]
   }
  ],
  "questions": [
   {
    "q": "If acetone were used in place of Compound 3 in Route A, which product would be isolated after the acidic workup?",
    "choiceFigs": [
     "cpx1-phenylpropan-2-ol-tert",
     "cpx1-phenylpropan-2-ol-sec",
     "acetophenone",
     "cpx1-isopropoxybenzene"
    ],
    "choices": [
     "2-Phenylpropan-2-ol",
     "1-Phenylpropan-2-ol",
     "Acetophenone",
     "Isopropoxybenzene"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "A Grignard reagent adds its carbanion-like carbon to the **carbonyl carbon**. With an aldehyde (Compound 3) that gives a secondary alcohol (Compound 4); with a **ketone** it gives a **tertiary alcohol**. Phenyl adds to the central carbon of acetone, (CH₃)₂C=O, and the alkoxide is protonated in the HCl workup: (CH₃)₂C(OH)C₆H₅, **2-phenylpropan-2-ol**.\n\n1-Phenylpropan-2-ol would need the phenyl group on a methyl carbon, which is not electrophilic.\nAcetophenone is a ketone; a Grignard addition makes an alcohol, not a new carbonyl.\nIsopropoxybenzene would need the phenyl group bonded to oxygen; the new bond forms to carbon.",
    "id": "p_cpx1_4_q1"
   },
   {
    "q": "What was the percent yield of Compound 4 in Run 1?",
    "choices": [
     "8.0%",
     "80%",
     "94%",
     "139%"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Convert each reactant to moles: Compound 1, 15.7 ÷ 157 = 0.100 mol; Mg, 0.100 mol; Compound 3, 10.6 ÷ 106 = 0.100 mol. The reaction is 1 : 1 : 1, so the **theoretical yield is 0.100 mol** of Compound 4 = 18.4 g.\nActual: 14.7 g ÷ 184 g/mol = 0.0799 mol\nPercent yield = 0.0799 ÷ 0.100 × 100% ≈ **80%** (or 14.7 ÷ 18.4).\n\n**94%** compares masses directly (14.7 g ÷ 15.7 g of Compound 1), ignoring the different molar masses.\n**139%** compares masses with Compound 3 (14.7 ÷ 10.6); a yield above 100% is a sign of this slip.\n**8.0%** is a decimal slip.",
    "id": "p_cpx1_4_q2"
   },
   {
    "q": "Which TLC result would best show that the reduction in Route B had gone to completion?",
    "choices": [
     "The spot of Compound 5 is gone, and one new spot appears at a lower Rf.",
     "The spot of Compound 5 is gone, and one new spot appears at a higher Rf.",
     "The spot of Compound 5 remains, and one new spot appears at a lower Rf.",
     "The spot of Compound 5 remains, and one new spot appears with the Rf of biphenyl."
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "D",
    "exp": "Completion means **no starting material is left**, so the Compound 5 spot must be gone. On polar **silica gel** with a mostly nonpolar eluent, the more polar compound binds the plate more strongly and travels less far. The product, Compound 4, has an **O–H group that hydrogen-bonds** to silica, so it is more polar than the ketone and has a **lower Rf**.\n\nA higher Rf would mean the product is less polar than the ketone, which is backwards for an alcohol.\nIf the Compound 5 spot remains, starting material is still present and the reaction is not complete.\nBiphenyl forms only in the Grignard step of Route A, and its presence would not show that Compound 5 is used up.",
    "id": "p_cpx1_4_q3"
   },
   {
    "q": "In Run 2, benzene was the main by-product because Compound 2:",
    "choices": [
     "acted as a base and removed a proton from water.",
     "acted as a nucleophile and bonded to the oxygen of water.",
     "acted as an electrophile and was attacked by hydroxide.",
     "acted as an oxidizing agent and removed hydrogen from ether."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "The passage says the C–Mg carbon is **strongly basic**. Its conjugate acid, benzene, has a pKa near 43, while water's is about 16, so the proton transfer C₆H₅⁻ + H₂O → C₆H₆ + OH⁻ is fast and essentially complete. Every molecule of Compound 2 destroyed this way is lost to the reaction with Compound 3, which is why the yield fell from 14.7 g to 5.5 g and why Grignard reactions need **dry** solvent.\n\nBonding to water's oxygen would give phenol, not benzene.\nThe phenyl carbon of Compound 2 is electron-rich, not an electrophile.\nForming benzene adds H⁺ to the phenyl carbon; it is an acid–base reaction, not an oxidation of the solvent.",
    "id": "p_cpx1_4_q4"
   }
  ]
 },
 {
  "id": "p_cpx1_5",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4E",
   "4C",
   "5D"
  ],
  "title": "Mass Spectrometry of a Chlorzoxazone Metabolite",
  "passage": "Chlorzoxazone (Compound 1) is a muscle relaxant that is cleared almost entirely by one liver enzyme, cytochrome P450 2E1 (CYP2E1). CYP2E1 uses O₂ and electrons from NADPH to insert one oxygen atom into the C–H bond at C6 of the drug, giving 6-hydroxychlorzoxazone (Compound 2). Compound 2 is then conjugated to glucuronic acid and excreted in urine. Because CYP2E1 activity rises with chronic alcohol use and in obesity, the ratio of Compound 2 to Compound 1 in plasma 2 h after an oral dose is used as a measure of CYP2E1 activity.\n\nPlasma extracts were analyzed by electrospray ionization in negative-ion mode, in which each molecule loses H⁺ to give an [M − H]⁻ ion. In the mass analyzer, the ions start essentially at rest and are accelerated toward the detector by a potential difference of 2.0 kV applied between two parallel metal grids.\n\nNatural chlorine is about 76% ³⁵Cl and 24% ³⁷Cl, and natural carbon contains about 1.1% ¹³C. Before analysis, each plasma sample was acidified and extracted into ethyl acetate, which leaves proteins and salts behind. In healthy volunteers, the plasma ratio of Compound 2 to Compound 1 at 2 h is typically 0.3 to 0.5, and the ratio roughly doubles after several weeks of heavy drinking. Selected peaks in the spectrum of one plasma extract are listed in Table 1.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Hydroxylation of chlorzoxazone by CYP2E1",
    "parts": [
     "cpx1-chlorzoxazone",
     {
      "arrow": "CYP2E1, O₂, NADPH"
     },
     "cpx1-hydroxychlorzoxazone"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Selected peaks in the negative-ion mass spectrum of a plasma extract",
   "columns": [
    "m/z",
    "Relative intensity (%)",
    "Assignment"
   ],
   "rows": [
    [
     "167.99",
     "100",
     "[Compound 1 − H]⁻ with ³⁵Cl"
    ],
    [
     "169.99",
     "32",
     "[Compound 1 − H]⁻ with ³⁷Cl"
    ],
    [
     "183.98",
     "45",
     "[Compound 2 − H]⁻ with ³⁵Cl"
    ],
    [
     "184.99",
     "3.5",
     "not assigned"
    ],
    [
     "185.98",
     "14",
     "not assigned"
    ]
   ]
  },
  "questions": [
   {
    "q": "The peak at m/z 185.98 in Table 1 is best assigned to [Compound 2 − H]⁻ ions that contain:",
    "choices": [
     "one ³⁷Cl atom.",
     "one ¹³C atom.",
     "two ¹³C atoms.",
     "one ¹⁸O atom."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "The peak is **2 mass units** above the main [Compound 2 − H]⁻ peak (183.98), and its intensity is 14 ÷ 45 ≈ **0.31** of that peak. Chlorine's isotopes are 2 units apart, and 24% ÷ 76% ≈ 0.32, the same ratio seen for Compound 1 (32 vs 100). So this is the **³⁷Cl** ion.\n\nOne ¹³C adds only 1 unit; that is the small peak at 184.99 (7 carbons × 1.1% ≈ 8% of 45 ≈ 3.5).\nTwo ¹³C atoms would add 2 units, but the chance of two in one ion is well under 1%, far too small for a 14% peak.\n¹⁸O is only about 0.2% of natural oxygen, again far too rare.",
    "id": "p_cpx1_5_q1"
   },
   {
    "q": "How much kinetic energy does a singly charged ion gain as it crosses the gap between the accelerating grids? (e = 1.6 × 10⁻¹⁹ C)",
    "choices": [
     "8.0 × 10⁻²³ J",
     "3.2 × 10⁻¹⁹ J",
     "1.6 × 10⁻¹⁶ J",
     "3.2 × 10⁻¹⁶ J"
    ],
    "ans": 3,
    "cat": "4C",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "The work done by the field on a charge moving through a potential difference is **W = qΔV**, and it all becomes kinetic energy:\nKE = (1.6 × 10⁻¹⁹ C)(2.0 × 10³ V) = **3.2 × 10⁻¹⁶ J** (or 2.0 keV).\nThe answer is the same for every singly charged ion, whatever its mass.\n\n**3.2 × 10⁻¹⁹ J** uses 2.0 V instead of 2.0 kV.\n**1.6 × 10⁻¹⁶ J** adds a factor of ½ that belongs in ½mv², not in qV.\n**8.0 × 10⁻²³ J** divides the charge by the voltage instead of multiplying.",
    "id": "p_cpx1_5_q2"
   },
   {
    "q": "Which accelerating grid is at the higher electric potential, and how does the electric potential energy of an [M − H]⁻ ion change as it crosses the gap between the grids?",
    "choices": [
     "The grid nearer the detector; it decreases",
     "The grid nearer the detector; it increases",
     "The grid nearer the ion source; it decreases",
     "The grid nearer the ion source; it increases"
    ],
    "ans": 0,
    "exp": "The ions are **negative** and are pushed toward the detector. The force on a negative charge points **opposite** to the field, so the field points from the detector-side grid back toward the source-side grid. Field lines run from **higher to lower potential**, so the **grid nearer the detector is at the higher potential**: negative ions are drawn toward higher potential.\nPotential energy is **U = qV**. With q negative and V rising along the path, U **falls** by |q|ΔV = 2.0 keV. Energy is conserved, so the ion gains 2.0 keV of kinetic energy; the field does positive work on it.\n\n**Nearer the ion source** is the answer for a positive ion, which is pushed from high to low potential; it forgets the ions' negative charge.\n**It increases** treats \"moving to higher potential\" as \"gaining potential energy\", which is true only for a positive charge. A charge released from rest always speeds up while losing potential energy.",
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "physics",
    "id": "p_cpx1_5_q3"
   },
   {
    "q": "The conversion of Compound 1 to Compound 2 by CYP2E1 is best classified as:",
    "choices": [
     "an oxidation, because C6 gains a bond to oxygen.",
     "a reduction, because NADPH supplies electrons to the reaction.",
     "a hydrolysis, because the new oxygen atom comes from water.",
     "a tautomerization, because only a hydrogen atom changes position."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "At C6 a **C–H bond is replaced by a C–O bond**. Carbon gives up electron density to the more electronegative oxygen, so its oxidation state rises from −1 to +1: the drug is **oxidized** (P450 enzymes are monooxygenases).\n\nNADPH is the electron source for reducing the **other** O atom of O₂ to water; NADPH itself is oxidized, and so is the drug.\nThe passage says the oxygen comes from **O₂**, and no bond is split by water.\nCompound 2 has one more oxygen atom than Compound 1 (Figure 1), so it is not a tautomer.",
    "id": "p_cpx1_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx1_6",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4D",
   "4B",
   "4E"
  ],
  "title": "Tympanometry and the Acoustics of the Ear Canal",
  "passage": "A pneumatic otoscope lets a clinician watch the eardrum while puffing air into the sealed ear canal; a healthy eardrum moves visibly, whereas one backed by fluid barely moves. The clinician views the eardrum through a converging magnifying lens (focal length 6.0 cm) in the otoscope head; during the exam the eardrum is 4.8 cm from this lens. Tympanometry measures the same property. A soft probe seals the ear canal and contains a small loudspeaker, a microphone and an air pump. The speaker plays a steady probe tone (226 Hz for adults, 1000 Hz for young infants), and the microphone measures how much sound is reflected from the eardrum. The less sound reflected, the more easily the eardrum and middle-ear bones vibrate, a property reported as admittance in equivalent milliliters of air.\n\nWhile the tone plays, the pump sweeps the air pressure in the canal from +200 to −400 daPa relative to atmospheric pressure (1 daPa = 10 Pa). The eardrum vibrates most freely, and admittance peaks, when the pressure in the canal equals the pressure in the air-filled middle ear behind it. The Eustachian tube normally keeps middle-ear pressure near atmospheric by opening briefly during swallowing. If the tube stays closed, gas in the middle ear is slowly absorbed into the blood and middle-ear pressure falls. If fluid fills the middle ear (otitis media with effusion), the eardrum cannot vibrate freely at any canal pressure.\n\nThe otoscope's light is a white LED: a chip that emits blue light (peak 450 nm), coated with a phosphor that converts part of it to yellow. The speed of sound in air at body temperature is 350 m/s. Figure 1 shows tympanograms recorded with the 226 Hz tone from three adults.",
  "figure": {
   "type": "line",
   "caption": "Figure 1 Tympanograms of three adults (226 Hz probe tone)",
   "x": {
    "label": "Canal pressure (daPa)",
    "min": -400,
    "max": 200,
    "step": 100
   },
   "y": {
    "label": "Admittance (mL)",
    "min": 0,
    "max": 1.2,
    "step": 0.2
   },
   "series": [
    {
     "name": "Patient 1",
     "marker": "circle",
     "line": "smooth",
     "points": [
      [
       -400,
       0.2
      ],
      [
       -300,
       0.24
      ],
      [
       -200,
       0.34
      ],
      [
       -100,
       0.6
      ],
      [
       0,
       0.9
      ],
      [
       100,
       0.55
      ],
      [
       200,
       0.3
      ]
     ]
    },
    {
     "name": "Patient 2",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       -400,
       0.14
      ],
      [
       -300,
       0.15
      ],
      [
       -200,
       0.16
      ],
      [
       -100,
       0.17
      ],
      [
       0,
       0.18
      ],
      [
       100,
       0.17
      ],
      [
       200,
       0.16
      ]
     ]
    },
    {
     "name": "Patient 3",
     "marker": "triangle",
     "line": "smooth",
     "points": [
      [
       -400,
       0.32
      ],
      [
       -300,
       0.5
      ],
      [
       -200,
       0.8
      ],
      [
       -100,
       0.5
      ],
      [
       0,
       0.3
      ],
      [
       100,
       0.22
      ],
      [
       200,
       0.18
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "What is the wavelength in the ear canal of the probe tone used for young infants?",
    "choices": [
     "0.35 cm",
     "3.5 cm",
     "35 cm",
     "2.9 m"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "Use **λ = v/f** with the infant tone of 1000 Hz:\nλ = 350 m/s ÷ 1000 Hz = 0.35 m = **35 cm**.\n\n**3.5 cm** and **0.35 cm** are slips in converting meters to centimeters.\n**2.9 m** inverts the ratio (f/v = 1000 ÷ 350 ≈ 2.9) and attaches meters to it.",
    "id": "p_cpx1_6_q1"
   },
   {
    "q": "Where is the image of the eardrum formed by the otoscope's magnifying lens, and is it upright or inverted? (1/f = 1/o + 1/i)",
    "choices": [
     "24 cm from the lens, on the eardrum's side; upright",
     "24 cm from the lens, on the viewer's side; inverted",
     "2.7 cm from the lens, on the viewer's side; inverted",
     "6.0 cm from the lens, at its focal point; upright"
    ],
    "ans": 0,
    "exp": "Solve the thin-lens equation for i with f = +6.0 cm (converging) and o = 4.8 cm:\n1/i = 1/f − 1/o = 1/6.0 − 1/4.8 = 4/24 − 5/24 = **−1/24**, so i = **−24 cm** (check: 1/4.8 + (−1/24) = 5/24 − 1/24 = 4/24 = 1/6 ✓).\nA **negative image distance** means a **virtual image** on the same side of the lens as the object, the eardrum's side, and 24 cm away it is comfortably beyond the eye's near point. The magnification m = −i/o = −(−24)/4.8 = **+5**, so the image is **upright** and five times larger. This is how any magnifier works: the object sits **inside the focal length**.\n\n**24 cm on the viewer's side, inverted** drops the minus sign and treats the image as real.\n**2.7 cm, inverted** adds the reciprocals (1/6.0 + 1/4.8 = 9/24, so i ≈ 2.7 cm) instead of subtracting.\n**6.0 cm, at the focal point** confuses the focal length with the image distance; only an object very far away is imaged at the focal point.",
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "id": "p_cpx1_6_q2"
   },
   {
    "q": "Which patient most likely has a Eustachian tube that stays closed, and what is that patient's middle-ear gauge pressure?",
    "choices": [
     "Patient 3; −2.0 kPa",
     "Patient 3; −20 kPa",
     "Patient 2; −2.0 kPa",
     "Patient 2; 0 kPa"
    ],
    "ans": 0,
    "cat": "4B",
    "skill": "SIRS 4",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Admittance peaks where **canal pressure = middle-ear pressure**. Patient 3's curve peaks at **−200 daPa**, so the middle ear is below atmospheric pressure, as expected when trapped gas is absorbed behind a closed tube.\n−200 daPa × 10 Pa/daPa = −2000 Pa = **−2.0 kPa** (gauge).\n\n**−20 kPa** multiplies by 100 instead of 10 (deca- means 10).\nPatient 2's curve is **flat** with low admittance at every pressure: the eardrum cannot move, the pattern of fluid in the middle ear (effusion), not of a negative-pressure air space. A flat curve has no peak, so no pressure can be read from it.\nPatient 1 peaks at 0 daPa, the normal pattern.",
    "id": "p_cpx1_6_q3"
   },
   {
    "q": "The blue light of the otoscope's LED is emitted when electrons in the chip drop across an energy gap. About how large is that gap? (h = 6.6 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s)",
    "choices": [
     "2.0 × 10⁻²⁵ J",
     "4.4 × 10⁻²⁸ J",
     "1.5 × 10⁻²⁷ J",
     "4.4 × 10⁻¹⁹ J"
    ],
    "ans": 3,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Each emitted photon carries the energy lost by one electron, so the gap equals the photon energy, **E = hc/λ**, with λ = 450 nm = 4.5 × 10⁻⁷ m:\nE = (6.6 × 10⁻³⁴)(3.0 × 10⁸) ÷ (4.5 × 10⁻⁷) = (2.0 × 10⁻²⁵) ÷ (4.5 × 10⁻⁷) ≈ **4.4 × 10⁻¹⁹ J** (about 2.8 eV).\n\n**4.4 × 10⁻²⁸ J** divides by 450 without converting nanometers to meters.\n**1.5 × 10⁻²⁷ J** is h/λ, the photon's momentum in kg·m/s, not its energy.\n**2.0 × 10⁻²⁵ J** is hc alone, with no division by the wavelength.",
    "id": "p_cpx1_6_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_1",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4B",
   "5C",
   "5B"
  ],
  "title": "Separating Plasma Lipoproteins by Flotation",
  "passage": "Cholesterol (Compound 1) and triacylglycerols are almost insoluble in water, so they travel through the plasma inside lipoproteins. Each lipoprotein is a roughly spherical particle with a hydrophobic core of triacylglycerols and cholesteryl esters, surrounded by a single layer of phospholipids, unesterified cholesterol and proteins called apolipoproteins. Most of the cholesteryl ester in plasma is made on high-density lipoprotein (HDL) particles by the enzyme lecithin–cholesterol acyltransferase (LCAT), which transfers a fatty acyl chain from phosphatidylcholine to the 3-hydroxyl group of cholesterol (Reaction 1). The product, a cholesteryl ester (Compound 2), then moves from the particle surface into its core.\n\nPhosphatidylcholine + Compound 1 → lysophosphatidylcholine + Compound 2\nReaction 1\n\nLipid is less dense than protein, so lipoproteins that contain a larger fraction of protein are denser. Lipoprotein classes are therefore defined by density, and they are separated by sequential flotation ultracentrifugation. Plasma, whose salt solution has a density of 1.006 g/mL, is centrifuged first. Particles less dense than the solution float to the top and are collected, while denser particles move toward the bottom of the tube. The density of the bottom fraction is then raised by dissolving solid KBr in it, and the sample is centrifuged again. The density is raised in steps to 1.019, 1.063 and 1.21 g/mL.\n\nA clinical lipid lab used this method on plasma from a healthy volunteer and measured the size and composition of each fraction. Fasting plasma contains no chylomicrons, which carry dietary fat from the intestine, so chylomicrons were collected from a second sample drawn 2 hours after a fatty meal. The results are shown in Table 1.",
  "figure": {
   "caption": "Table 1 Properties of human plasma lipoproteins (composition in % of particle mass; unesterified cholesterol makes up the rest)",
   "columns": [
    "Class",
    "Density (g/mL)",
    "Diameter (nm)",
    "Protein (%)",
    "Triacylglycerol (%)",
    "Cholesteryl ester (%)",
    "Phospholipid (%)"
   ],
   "rows": [
    [
     "Chylomicron",
     "< 0.95",
     "75–1200",
     "2",
     "86",
     "3",
     "7"
    ],
    [
     "VLDL",
     "0.95–1.006",
     "30–80",
     "8",
     "55",
     "12",
     "18"
    ],
    [
     "IDL",
     "1.006–1.019",
     "25–35",
     "19",
     "23",
     "29",
     "20"
    ],
    [
     "LDL",
     "1.019–1.063",
     "18–25",
     "22",
     "6",
     "42",
     "22"
    ],
    [
     "HDL",
     "1.063–1.21",
     "5–12",
     "50",
     "4",
     "16",
     "26"
    ]
   ]
  },
  "questions": [
   {
    "q": "Unesterified Compound 1, shown, sits in the surface layer of a lipoprotein particle. Which part of the molecule points toward the surrounding plasma?",
    "fig": "cholesterol",
    "choices": [
     "The 3-hydroxyl group, because it can hydrogen bond with water",
     "The fused ring system, because it is flat and rigid",
     "The branched hydrocarbon side chain, because it is the most flexible part",
     "The C5=C6 double bond, because its π electrons are easily polarized"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "Cholesterol is **amphipathic**, but only barely: its one polar group is the **3-OH**. Like a phospholipid head group, that OH sits at the water interface, where it can hydrogen bond with water and with phospholipid ester oxygens. The rest of the molecule is hydrocarbon and stays buried among the fatty acyl chains.\n\nThe ring system and the side chain are both nonpolar; they are what sits in the lipid layer, not at the water.\nA C=C bond is polarizable, but that only strengthens London forces with other hydrocarbons. It does not make that part of the molecule water-loving.",
    "id": "p_cpx2_1_q1"
   },
   {
    "q": "During the 1.063 g/mL centrifugation, an HDL particle with a density of 1.10 g/mL is suspended in the KBr solution. The buoyant force on the particle is about what fraction of its weight in the centrifuge, and which way does the particle move?",
    "choices": [
     "0.97; toward the bottom of the tube",
     "0.97; toward the top of the tube",
     "1.03; toward the bottom of the tube",
     "1.03; toward the top of the tube"
    ],
    "ans": 0,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "By **Archimedes' principle**, the buoyant force equals the weight of the displaced fluid: Fb = ρ(fluid)·V·g. The particle's weight is ρ(particle)·V·g. In a centrifuge g is replaced by the much larger effective acceleration, but it is the same in both, so it cancels along with V:\nFb/W = ρ(fluid)/ρ(particle) = 1.063 ÷ 1.10 ≈ **0.97**.\n\nBecause the buoyant force is less than the weight, the net force points toward the bottom, and HDL **sinks**. That is why HDL stays in the bottom fraction at 1.063 g/mL and is collected only at 1.21 g/mL, as Table 1's density ranges predict.\n\n**1.03** is the ratio turned upside down (1.10 ÷ 1.063).\nAny ratio below 1 means the particle sinks, so \"0.97; toward the top\" pairs the right number with the wrong conclusion.",
    "id": "p_cpx2_1_q2"
   },
   {
    "q": "A researcher wants to collect LDL from fasting plasma, free of every other lipoprotein class, using only two centrifugation steps. Which procedure would accomplish this?",
    "choices": [
     "Centrifuge at 1.019 g/mL and discard the top fraction; then raise the bottom fraction to 1.063 g/mL, centrifuge, and keep the top fraction",
     "Centrifuge at 1.019 g/mL and keep the top fraction; then raise it to 1.063 g/mL, centrifuge, and keep the top fraction",
     "Centrifuge at 1.006 g/mL and discard the top fraction; then raise the bottom fraction to 1.063 g/mL, centrifuge, and keep the top fraction",
     "Centrifuge at 1.063 g/mL and discard the top fraction; then raise the bottom fraction to 1.21 g/mL, centrifuge, and keep the top fraction"
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "D",
    "exp": "LDL has a density of **1.019–1.063 g/mL** (Table 1), so you need one cut just below it and one just above it.\nStep 1 at **1.019 g/mL**: everything lighter than LDL (VLDL and IDL; fasting plasma has no chylomicrons) floats and is discarded. LDL and HDL stay at the bottom.\nStep 2 at **1.063 g/mL**: LDL is now less dense than the solution and floats; HDL (above 1.063) sinks. The top fraction is pure LDL.\n\nKeeping the top after a 1.019 spin keeps VLDL and IDL and throws LDL away.\nStarting at 1.006 removes only VLDL, so the second top fraction contains **IDL plus LDL**.\nThe 1.063 then 1.21 sequence discards LDL in step 1 and collects **HDL**.",
    "id": "p_cpx2_1_q3"
   },
   {
    "q": "After Compound 2 forms on an HDL particle, it moves from the surface layer into the core. Which statement best explains this?",
    "choices": [
     "Esterification replaces the O–H group with an ester, so Compound 2 has no hydrogen-bond donor and is too nonpolar to stay at the water interface.",
     "Esterification gives Compound 2 a negative charge, so it is repelled by the phosphate groups at the surface.",
     "Esterification removes the C5=C6 double bond, so the ring system becomes flexible enough to pack in the core.",
     "Esterification makes Compound 2 smaller than Compound 1, so it fits between the triacylglycerols of the core."
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "The only thing that anchored cholesterol at the surface was its **3-OH**, which donates a hydrogen bond to water. Reaction 1 turns that OH into an **ester** (–O–C(=O)–R) and adds a long fatty acyl chain. The ester oxygens are weak hydrogen-bond acceptors buried between two large hydrocarbon groups, so the molecule as a whole interacts with its surroundings almost entirely through **London dispersion forces**. It is most stable among the other nonpolar lipids of the core, which is why Table 1 lists cholesteryl ester as a major core component.\n\nAn ester is neutral; nothing in Reaction 1 adds a charge.\nLCAT acts only at the 3-OH; the C5=C6 double bond and the rigid rings are unchanged.\nAdding an acyl chain makes the molecule larger, not smaller.",
    "id": "p_cpx2_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_2",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4C",
   "5E",
   "5D"
  ],
  "title": "An Enzyme Electrode for Continuous Glucose Monitoring",
  "passage": "Continuous glucose monitors measure glucose in the interstitial fluid under the skin every few minutes. The sensor is a thin wire electrode inserted through the skin. Its tip is coated with glucose oxidase (GOx), an FAD-containing enzyme that oxidizes β-D-glucose (Compound 1) to D-glucono-1,5-lactone (Compound 2), as shown in Figure 1. The reduced enzyme is reoxidized by O₂, which is converted to hydrogen peroxide, so the overall enzyme reaction is Reaction 1. Compound 2 is then hydrolyzed by water to gluconic acid.\n\nβ-D-glucose + O₂ → D-glucono-1,5-lactone + H₂O₂\nReaction 1\n\nUnder the enzyme layer is a platinum working electrode held at +0.60 V relative to an Ag/AgCl reference electrode. At this potential, H₂O₂ that diffuses to the platinum reacts as shown in Reaction 2, and the resulting current is measured.\n\nH₂O₂ → O₂ + 2 H⁺ + 2 e⁻\nReaction 2\n\nEach glucose oxidized by GOx yields one H₂O₂, so the current reports the rate of the enzyme reaction. In people with diabetes, glucose can range from about 2 mM to more than 20 mM, and a useful sensor must give a current proportional to glucose over that whole range.\n\nEngineers compared two sensors in stirred, O₂-saturated phosphate buffer (pH 7.4, 37°C); control runs confirmed that O₂ was not limiting at any glucose concentration tested. Sensor A had only the GOx layer. Sensor B was identical except for an outer polyurethane membrane that lets O₂ pass easily but slows the diffusion of glucose about 10-fold. The steady-state current of each sensor at several glucose concentrations is shown in Figure 2.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Oxidation of Compound 1 by glucose oxidase",
    "parts": [
     "beta-glucopyranose",
     {
      "arrow": "GOx, O₂"
     },
     "glucono-lactone"
    ]
   }
  ],
  "figure": {
   "type": "line",
   "caption": "Figure 2 Steady-state current of two glucose sensors (pH 7.4, 37°C)",
   "x": {
    "label": "Glucose (mM)",
    "min": 0,
    "max": 20,
    "step": 5
   },
   "y": {
    "label": "Current (nA)",
    "min": 0,
    "max": 80,
    "step": 20
   },
   "series": [
    {
     "name": "Sensor A (no outer membrane)",
     "marker": "circle",
     "line": "smooth",
     "points": [
      [
       0,
       0
      ],
      [
       1,
       25
      ],
      [
       2,
       38
      ],
      [
       4,
       50
      ],
      [
       6,
       56
      ],
      [
       10,
       63
      ],
      [
       15,
       66
      ],
      [
       20,
       68
      ]
     ]
    },
    {
     "name": "Sensor B (outer membrane)",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       0,
       0
      ],
      [
       2,
       4
      ],
      [
       5,
       10
      ],
      [
       10,
       20
      ],
      [
       15,
       29
      ],
      [
       20,
       38
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "In a patient whose interstitial glucose holds steady at 8.0 mM, Sensor B gives the current shown in Figure 2. How much charge passes through its platinum electrode during one 5.0-minute reading interval?",
    "choices": [
     "0.080 μC",
     "2.4 μC",
     "4.8 μC",
     "18 μC"
    ],
    "ans": 2,
    "exp": "Read Sensor B (squares) at 8.0 mM: its line rises 2 nA per mM (10 nA at 5 mM, 20 nA at 10 mM), so I ≈ **16 nA**.\nCurrent is charge per unit time, so **Q = It**, with t in seconds: 5.0 min × 60 s/min = 300 s.\nQ = 16 × 10⁻⁹ C/s × 300 s = 4800 × 10⁻⁹ C = **4.8 × 10⁻⁶ C = 4.8 μC**.\n\n**0.080 μC** uses 5.0 s instead of 300 s (16 nA × 5 s = 80 nC).\n**2.4 μC** divides by 2 for the 2 e⁻ per H₂O₂; that would count H₂O₂ molecules, but the charge counts every electron.\n**18 μC** reads Sensor A (circles, about 60 nA at 8 mM) instead of Sensor B.",
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "D",
    "id": "p_cpx2_2_q1"
   },
   {
    "q": "In Reaction 2, the platinum working electrode acts as:",
    "choices": [
     "the anode, because H₂O₂ gives up electrons to it.",
     "the anode, because H₂O₂ takes electrons from it.",
     "the cathode, because H₂O₂ gives up electrons to it.",
     "the cathode, because H₂O₂ takes electrons from it."
    ],
    "ans": 0,
    "cat": "4C",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "In Reaction 2 the electrons are products: H₂O₂ **loses electrons** (oxygen goes from −1 in H₂O₂ to 0 in O₂), so it is **oxidized**. Oxidation always happens at the **anode** (\"an ox\"), whatever the sign of the electrode, and the electrons released flow into the platinum and out through the circuit. That flow is the measured current.\n\nTaking electrons from the electrode would be reduction, which happens at a cathode.\n\"The cathode, because H₂O₂ gives up electrons\" mixes the two: an electrode that receives electrons from the solution is by definition the anode.",
    "id": "p_cpx2_2_q2"
   },
   {
    "q": "According to Figure 2, when glucose increases from 10 mM to 20 mM, the current from Sensor A increases by about what percent, and what does this indicate?",
    "choices": [
     "About 10%; the GOx in Sensor A is nearly saturated with glucose",
     "About 10%; the GOx in Sensor A is far from saturated with glucose",
     "About 100%; the GOx in Sensor A is nearly saturated with glucose",
     "About 100%; the GOx in Sensor A is far from saturated with glucose"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "Read the circles: Sensor A gives about **63 nA at 10 mM and 68 nA at 20 mM**. The increase is 5 ÷ 63 ≈ 0.08, so **roughly 10%** for a doubling of glucose.\n\nThis is **Michaelis–Menten** behavior. Far below KM, rate is proportional to [S] (doubling [S] doubles the rate). Far above KM, nearly every enzyme molecule already has glucose bound, so the rate approaches Vmax and barely responds. Since O₂ was kept in excess, the leveling must come from **saturation of GOx with glucose**. That is why Sensor A is useless above about 10 mM.\n\n**About 100%** is what you get by reading Sensor B (20 → 38 nA). Its membrane keeps the glucose reaching the enzyme far below KM, which is why it stays proportional.\nA 10% rise cannot mean the enzyme is far from saturation; an unsaturated enzyme would respond in proportion to [S].",
    "id": "p_cpx2_2_q3"
   },
   {
    "q": "Compound 2 is hydrolyzed to gluconic acid in the interstitial fluid. Which structure is gluconic acid?",
    "choiceFigs": [
     "cpx2-gluconic-acid",
     "cpx2-glucaric-acid",
     "glucose-open",
     "cpx2-sorbitol"
    ],
    "choices": [
     "D-gluconic acid: C1 is COOH, C6 is CH₂OH",
     "D-glucaric acid: C1 and C6 are both COOH",
     "D-glucose (open chain): C1 is CHO, C6 is CH₂OH",
     "D-sorbitol: C1 and C6 are both CH₂OH"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "Compound 2 is a **lactone**, a cyclic ester formed between the C1 carbonyl and the C5 oxygen. **Hydrolysis** adds water across the ester C–O bond: C1 becomes a **carboxylic acid** and C5 gets back a free OH. Hydrolysis is not a redox step, so the rest of the chain is unchanged and **C6 stays CH₂OH**. The product is the open-chain acid with COOH at C1 and CH₂OH at C6.\n\nGlucaric acid has a second COOH at C6, which would need a further oxidation that GOx doesn't do.\nOpen-chain glucose has an aldehyde at C1; getting back to it from the lactone would require a reduction.\nSorbitol has CH₂OH at both ends; it is the product of reducing glucose, not oxidizing it.",
    "id": "p_cpx2_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_3",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4A",
   "4D",
   "4E"
  ],
  "title": "Choosing Glass Fibers for an Endoscope Light Guide",
  "passage": "Flexible endoscopes carry light into the body, and an image back out, through bundles of thin glass fibers. Each fiber has a glass core surrounded by a thin cladding with a lower index of refraction. Light in the core that strikes the core–cladding boundary at an angle of incidence (measured from the normal) greater than the critical angle is totally internally reflected, so it zigzags along the fiber even when the fiber is bent. The cladding also keeps neighboring fibers from touching, which would let light leak from one fiber into the next.\n\nThe critical angle θc at the core–cladding boundary is given by sin θc = n₂/n₁, where n₁ is the index of the core and n₂ is the index of the cladding. A typical light guide bundles several thousand fibers, each with a core about 30 μm across.\n\nSome endoscopes use narrow-band imaging, in which tissue is lit with only blue light near 415 nm and green light near 540 nm. Hemoglobin absorbs both wavelengths strongly, so blood vessels look dark against the surrounding mucosa and are easier to see. A team designing a 2.0 m light guide for narrow-band imaging tested the four fibers in Table 1.",
  "figure": {
   "caption": "Table 1 Optical properties of four glass fibers",
   "columns": [
    "Fiber",
    "Core index n₁",
    "Cladding index n₂",
    "Critical angle"
   ],
   "rows": [
    [
     "1",
     "1.50",
     "1.20",
     "53°"
    ],
    [
     "2",
     "1.50",
     "1.35",
     "64°"
    ],
    [
     "3",
     "1.60",
     "1.50",
     "70°"
    ],
    [
     "4",
     "1.56",
     "1.52",
     "77°"
    ]
   ]
  },
  "questions": [
   {
    "q": "A short pulse of light travels straight along the axis of a 2.0 m length of Fiber 2, from the light source to the tip of the endoscope. About how long does the trip take? (c = 3.0 × 10⁸ m/s)",
    "choices": [
     "4.4 ns",
     "6.7 ns",
     "10 ns",
     "20 ns"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "Light travels through the core at **v = c/n**, and the pulse moves at constant speed, so t = d/v.\nv = 3.0 × 10⁸ ÷ 1.50 = 2.0 × 10⁸ m/s.\nt = 2.0 m ÷ 2.0 × 10⁸ m/s = 1.0 × 10⁻⁸ s = **10 ns**.\nOnly the core index matters; the ray going straight down the axis never reaches the cladding.\n\n**6.7 ns** uses the speed of light in vacuum (2.0 ÷ 3.0 × 10⁸).\n**4.4 ns** multiplies c by n instead of dividing, as if light went faster in glass.\n**20 ns** is a round trip, source to tip and back; the question asks for one way.",
    "id": "p_cpx2_3_q1"
   },
   {
    "q": "A ray in Fiber 1 strikes the core–cladding boundary at an angle of incidence of 60°. At one spot, the cladding has worn away and the core touches tissue fluid (n = 1.35). At that spot, the ray:",
    "choices": [
     "is totally reflected, because 60° is greater than the critical angle of 53°.",
     "is totally reflected, because 60° is greater than the critical angle of 42°.",
     "is totally reflected, because 60° is greater than the critical angle of 26°.",
     "is partly transmitted into the fluid, because 60° is less than the critical angle of 64°."
    ],
    "ans": 3,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "The critical angle depends on the medium on the **other side of the boundary**, which is now the fluid: sin θc = n(fluid)/n(core) = 1.35 ÷ 1.50 = **0.90**, so θc ≈ **64°**. (Table 1 gives the same value for Fiber 2, which has the same pair of indices.) Total internal reflection needs an angle of incidence **greater** than θc. At 60° < 64°, part of the light refracts out into the fluid, so the fiber leaks light at the damaged spot.\n\n**53°** is Fiber 1's critical angle against its own cladding (1.20/1.50), which is no longer there.\n**42°** is the glass–air value (sin θc = 1/1.50); the core is touching fluid, not air.\n**26°** is 90° − 64°, the angle measured from the surface instead of from the normal.",
    "id": "p_cpx2_3_q2"
   },
   {
    "q": "Compared with a photon of the 540 nm green light used in narrow-band imaging, a photon of the 415 nm blue light has:",
    "choices": [
     "more energy and a higher frequency.",
     "more energy and a lower frequency.",
     "less energy and a higher frequency.",
     "less energy and a lower frequency."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "For light, **f = c/λ** and **E = hf = hc/λ**. A shorter wavelength therefore means a higher frequency **and** more energy per photon; the two always change together. 415 nm is shorter than 540 nm, so the blue photon carries 540 ÷ 415 ≈ 1.3 times as much energy (about 3.0 eV versus 2.3 eV). That larger energy matches a larger gap between electronic states in heme, which is why hemoglobin absorbs 415 nm so strongly.\n\nAny choice that splits energy and frequency (one up, one down) breaks E = hf.\n\"Less energy and lower frequency\" would be true of a longer wavelength, such as red light.",
    "id": "p_cpx2_3_q3"
   },
   {
    "q": "For the 2.0 m light guide, the team wants the fiber that traps light over the widest range of angles of incidence at the core–cladding boundary. Which fiber in Table 1 is best, and how does the speed of light in its core compare with the speed in the core of Fiber 3?",
    "choices": [
     "Fiber 1; light travels faster than in Fiber 3",
     "Fiber 1; light travels slower than in Fiber 3",
     "Fiber 4; light travels faster than in Fiber 3",
     "Fiber 4; light travels slower than in Fiber 3"
    ],
    "ans": 0,
    "exp": "A ray is totally reflected when its angle of incidence is **greater than θc**, so a fiber traps every ray between θc and 90°. The **smallest critical angle** gives the widest range. In Table 1 that is **Fiber 1** (53°, rays from 53° to 90° are trapped), which also has the smallest ratio n₂/n₁ (1.20 ÷ 1.50 = 0.80).\n\nSpeed in the core is **v = c/n**. Fiber 1's core (n = 1.50): v = 3.0 × 10⁸ ÷ 1.50 = **2.0 × 10⁸ m/s**. Fiber 3's core (n = 1.60): v = 3.0 × 10⁸ ÷ 1.60 ≈ **1.9 × 10⁸ m/s**. The lower index means **faster** light in Fiber 1.\n\n**Fiber 4** has the **largest** critical angle (77°), so it traps only rays between 77° and 90°, the narrowest range; it reads a large critical angle as better.\n**Slower** inverts n = c/v: a higher index means a slower speed, and Fiber 3 has the higher core index.",
    "cat": "4D",
    "skill": "SIRS 4",
    "diff": "X",
    "id": "p_cpx2_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_4",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5A",
   "4C"
  ],
  "title": "Urine Amino Acid Electrophoresis in Cystinuria",
  "passage": "Cystinuria is an inherited defect in a kidney transporter that normally reabsorbs cystine and the dibasic amino acids lysine, arginine and ornithine from the filtrate. Patients excrete large amounts of all four. Cystine forms when two molecules of cysteine (Compound 1) are joined by oxidation of their thiol groups (Figure 1). Cystine (Compound 2) is the least soluble of the amino acids; in urine near pH 6 only about 1 mM dissolves, so excess cystine crystallizes and forms kidney stones.\n\nOne screening method is paper electrophoresis. A drop of urine is applied at the center of a strip of filter paper soaked in a pH 6.0 buffer. Each end of the 40 cm strip dips into a buffer reservoir that contains an electrode, and a potential difference of 2.0 kV is applied between the two electrodes. Amino acids move along the strip according to their net charge. After 1 hour, the strip is dried and sprayed with ninhydrin, which forms a purple product with free amino groups. For reference, the pKa values of lysine are 2.2 (α-COOH), 9.0 (α-NH₃⁺) and 10.5 (side-chain NH₃⁺), and those of aspartate are 2.0, 3.9 (side-chain COOH) and 9.9.\n\nFor one patient, the strip showed intense spots for lysine and arginine on one side of the origin, a faint aspartate spot on the other side, and a strong spot close to the origin. A second test was then run on the same urine. Sodium nitroprusside gives a red-purple color with free thiol (–SH) groups but not with disulfides. The urine gave no color with nitroprusside alone, but it turned red-purple when it was first treated with sodium cyanide, which cleaves disulfide bonds, and then with nitroprusside. Together, the results confirmed cystinuria.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Formation of cystine (Compound 2) from cysteine (Compound 1)",
    "parts": [
     "cpx2-cysteine",
     "+",
     "cpx2-cysteine",
     {
      "arrow": "[O]"
     },
     "cpx2-cystine"
    ]
   }
  ],
  "questions": [
   {
    "q": "On the pH 6.0 strip, what is the net charge of the predominant form of aspartate, and toward which electrode does it move?",
    "choices": [
     "−1; toward the positive electrode",
     "−1; toward the negative electrode",
     "−2; toward the positive electrode",
     "0; it stays at the origin"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Compare pH 6.0 with each of aspartate's pKa values from the passage. A group is mostly **deprotonated when pH > pKa** and mostly **protonated when pH < pKa**.\nα-COOH (pKa 2.0): 6.0 is higher → **COO⁻** (−1)\nSide-chain COOH (pKa 3.9): 6.0 is higher → **COO⁻** (−1)\nα-NH₃⁺ (pKa 9.9): 6.0 is lower → stays **NH₃⁺** (+1)\nNet charge = −1 − 1 + 1 = **−1**. An anion is pulled toward the **positive electrode** (anode), the opposite side of the origin from lysine and arginine, as the passage describes.\n\n**Toward the negative electrode** has the right charge but the wrong attraction; opposite charges attract.\n**−2** counts both carboxylates but forgets that the α-amino group is still protonated.\n**0** would hold only near aspartate's pI, (2.0 + 3.9) ÷ 2 ≈ 3.0, far below pH 6.0.",
    "id": "p_cpx2_4_q1"
   },
   {
    "q": "Based on the pKa values in the passage, what is the isoelectric point of lysine?",
    "choices": [
     "5.6",
     "6.4",
     "7.2",
     "9.8"
    ],
    "ans": 3,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "The pI is the pH at which the **net charge is zero**. Count charges as lysine loses protons: +2 (below 2.2) → +1 (between 2.2 and 9.0) → **0 (between 9.0 and 10.5)** → −1. The neutral form exists between the two amine pKa values, so the pI is their average:\npI = (9.0 + 10.5) ÷ 2 = **9.75 ≈ 9.8**.\nA basic pI fits the data: at pH 6.0, well below 9.8, lysine is positive and runs toward the cathode.\n\n**5.6** averages 2.2 and 9.0, the rule for an amino acid with a neutral side chain.\n**6.4** averages 2.2 and 10.5.\n**7.2** averages all three pKa values.",
    "id": "p_cpx2_4_q2"
   },
   {
    "q": "Assuming the electric field along the strip is uniform, what is the magnitude of the electric force on one lysine ion in the buffer? (e = 1.6 × 10⁻¹⁹ C)",
    "choices": [
     "3.2 × 10⁻²³ N",
     "8.0 × 10⁻¹⁸ N",
     "8.0 × 10⁻¹⁶ N",
     "1.6 × 10⁻¹⁵ N"
    ],
    "ans": 2,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "physics",
    "exp": "First find the field: for a uniform field, **E = ΔV/d** = 2.0 × 10³ V ÷ 0.40 m = **5.0 × 10³ V/m** (N/C).\nAt pH 6.0, lysine has a net charge of **+1** (COO⁻, two NH₃⁺), so q = 1.6 × 10⁻¹⁹ C.\n**F = qE** = 1.6 × 10⁻¹⁹ × 5.0 × 10³ = **8.0 × 10⁻¹⁶ N**.\n\n**8.0 × 10⁻¹⁸ N** leaves the length in centimeters (2000 V ÷ 40 = 50 V/cm used as 50 V/m).\n**1.6 × 10⁻¹⁵ N** uses a charge of +2, counting the two amino groups but forgetting the carboxylate.\n**3.2 × 10⁻²³ N** divides the charge by the field instead of multiplying.",
    "id": "p_cpx2_4_q3"
   },
   {
    "q": "Which additional control would best show that the red-purple color in the second test came from disulfide bonds in the urine rather than from a reaction of cyanide itself with nitroprusside?",
    "choices": [
     "Buffer containing no urine, treated with cyanide and then nitroprusside",
     "The patient's urine treated with nitroprusside alone",
     "A cysteine solution treated with nitroprusside alone",
     "The patient's urine treated with cyanide alone"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "X",
    "exp": "The question is whether **cyanide plus nitroprusside** could make the color with no disulfide present. The control that answers this keeps everything the same except the thing being tested: run the **cyanide → nitroprusside** steps on buffer with **no urine**. If that stays colorless, the color in the patient's sample must have needed something in the urine, namely S–S bonds that cyanide cleaved to free –SH groups (as in cystine, Compound 2).\n\nUrine with nitroprusside alone was already done; it shows there were no free thiols, but says nothing about cyanide.\nCysteine with nitroprusside is a positive control showing the reagent detects –SH; it doesn't test cyanide either.\nUrine with cyanide alone has no color reagent, so nothing could be observed.",
    "id": "p_cpx2_4_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_5",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4B",
   "5A",
   "5E",
   "4E"
  ],
  "title": "Hyperbaric Oxygen for Carbon Monoxide Poisoning",
  "passage": "Carbon monoxide (CO) binds the Fe²⁺ of heme about 200 times more tightly than O₂ does. In CO poisoning, much of the hemoglobin is converted to carboxyhemoglobin (COHb), which cannot carry O₂, and the remaining heme groups release their O₂ to tissues less readily. CO leaves the body only through the lungs, by Reaction 1.\n\nHb(CO) + O₂ ⇌ Hb(O₂) + CO\nReaction 1\n\nRaising the partial pressure of O₂ in the lungs drives Reaction 1 to the right. The elimination of CO is first order in COHb, with a half-life of about 300 minutes when the patient breathes room air at 1.0 atm, 80 minutes with 100% O₂ at 1.0 atm, and 20 minutes with 100% O₂ in a hyperbaric chamber at 3.0 atm.\n\nThe chamber has a second benefit. Hemoglobin is already almost fully saturated when the arterial PO₂ is 100 mmHg, so it carries about 20 mL of O₂ per dL of blood no matter how high the PO₂ goes. Extra O₂ can be carried only as gas dissolved in plasma. By Henry's law, the concentration of a dissolved gas is proportional to its partial pressure; at 37°C, blood dissolves 0.0030 mL of O₂ per dL for each mmHg of PO₂. Resting tissues remove about 5 mL of O₂ from each dL of blood that passes through them.\n\nIn the chamber, which is pressurized with air, the patient breathes 100% O₂ through a hood. Water vapor (47 mmHg) and CO₂ (40 mmHg) lower the alveolar PO₂ to about 2190 mmHg, and the arterial PO₂ reaches about 2000 mmHg. Sessions last 90 minutes. A nurse who stays in the chamber breathes the compressed air (21% O₂, 78% N₂) and absorbs extra N₂ into the tissues, so the chamber must be decompressed slowly to keep the dissolved N₂ from coming out of solution as bubbles.",
  "questions": [
   {
    "q": "What is the partial pressure of N₂ in the air that the nurse inhales inside the chamber?",
    "choices": [
     "0.63 atm",
     "0.78 atm",
     "2.3 atm",
     "3.0 atm"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "By **Dalton's law**, each gas's partial pressure is its mole fraction times the total pressure. The chamber is at 3.0 atm and air is 78% N₂:\nP(N₂) = 0.78 × 3.0 atm = 2.34 ≈ **2.3 atm**.\nThat is three times the N₂ pressure at sea level, so by Henry's law about three times as much N₂ dissolves in the nurse's tissues, which is why slow decompression is needed.\n\n**0.78 atm** is the sea-level value; it forgets that the chamber is at 3.0 atm.\n**0.63 atm** is the O₂ partial pressure (0.21 × 3.0), the wrong gas.\n**3.0 atm** is the total pressure of all the gases together.",
    "id": "p_cpx2_5_q1"
   },
   {
    "q": "During treatment, what is the concentration of O₂ dissolved in the patient's arterial blood, and could dissolved O₂ alone meet the O₂ demand of resting tissues?",
    "choices": [
     "0.30 mL/dL; no",
     "0.60 mL/dL; no",
     "6.0 mL/dL; yes",
     "26 mL/dL; yes"
    ],
    "ans": 2,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Henry's law: dissolved O₂ = (0.0030 mL/dL per mmHg) × arterial PO₂.\n0.0030 × 2000 mmHg = **6.0 mL O₂/dL**.\nResting tissues take about 5 mL/dL, and 6.0 > 5, so the **dissolved O₂ alone could supply them** even if all the hemoglobin were tied up as COHb.\n\n**0.30 mL/dL** is the value for breathing room air (0.0030 × 100 mmHg), not the chamber value.\n**0.60 mL/dL** is a decimal slip (0.0030 × 200).\n**26 mL/dL** adds the 20 mL/dL bound to hemoglobin; that is the total O₂ content, not the dissolved O₂ the question asks about.",
    "id": "p_cpx2_5_q2"
   },
   {
    "q": "A patient arrives with 40% COHb and is treated at once with 100% O₂ in the chamber at 3.0 atm. About how long will it take for COHb to fall to 5%?",
    "choices": [
     "20 minutes",
     "60 minutes",
     "80 minutes",
     "240 minutes"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "For a **first-order** process, each half-life cuts the amount in half regardless of how much is left. Count the halvings:\n40% → 20% → 10% → 5% = **3 half-lives**.\nIn the chamber at 3.0 atm the half-life is 20 minutes, so the time is 3 × 20 = **60 minutes**, within one 90-minute session.\n\n**20 minutes** is only one half-life.\n**80 minutes** counts 4 half-lives, by counting the starting value (40, 20, 10, 5) as a step.\n**240 minutes** uses the 80-minute half-life for 100% O₂ at 1.0 atm.",
    "id": "p_cpx2_5_q3"
   },
   {
    "q": "What is the ground-state electron configuration of the iron ion that binds O₂ and CO in heme?",
    "choices": [
     "[Ar] 3d⁶",
     "[Ar] 4s² 3d⁴",
     "[Ar] 3d⁵",
     "[Ar] 4s² 3d⁶"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Neutral Fe (Z = 26) is **[Ar] 4s² 3d⁶**. When a transition metal forms a cation, it loses its **4s electrons first**, because the 4s electrons are the outermost (highest n). Removing two electrons to make **Fe²⁺** gives **[Ar] 3d⁶**.\n\n**[Ar] 4s² 3d⁴** removes the two electrons from 3d, the reverse of the real order.\n**[Ar] 3d⁵** is Fe³⁺, the form in methemoglobin, which cannot bind O₂.\n**[Ar] 4s² 3d⁶** is neutral iron; no electrons were removed.",
    "id": "p_cpx2_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx2_6",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5E",
   "5D"
  ],
  "title": "Isoamyl Acetate for Respirator Fit Testing",
  "passage": "Health care workers who wear N95 respirators must pass a fit test. In one qualitative test, the wearer sits under a hood into which isoamyl acetate (Compound 3), a volatile ester with a strong banana odor, is released. If the wearer smells bananas, air is leaking around the respirator's seal.\n\nA hospital lab prepared Compound 3 by Fischer esterification of acetic acid (Compound 1) with isoamyl alcohol (3-methyl-1-butanol, Compound 2), using a few drops of concentrated H₂SO₄ as a catalyst (Figure 1). Without acid the reaction is extremely slow; with acid it reaches equilibrium after about an hour of heating under reflux. The equilibrium constant, K = [ester][H₂O]/([acid][alcohol]), is 2.25 and changes little with temperature.\n\nIn Trial 1, 1.0 mol of Compound 1 and 1.0 mol of Compound 2 were heated under reflux for 90 minutes. In Trial 2, the same mixture, with some cyclohexane added, was heated under reflux in an apparatus fitted with a Dean–Stark trap, which collects the water that distills out with the cyclohexane and keeps it from returning to the flask.\n\nAfter each trial, the cooled mixture was washed with aqueous NaHCO₃, which released bubbles of CO₂ gas, and the aqueous layer was discarded. The ester (bp 142°C) was then dried and purified by distillation. Trial 2 gave a much higher yield of Compound 3 than Trial 1.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Fischer esterification to form Compound 3",
    "parts": [
     "acetic-acid",
     "+",
     "cpx2-isoamyl-alcohol",
     {
      "arrow": "H₂SO₄ (cat.), heat"
     },
     "cpx2-isoamyl-acetate",
     "+",
     "cpx2-water"
    ]
   }
  ],
  "questions": [
   {
    "q": "Assuming the mixture in Trial 1 reached equilibrium, about how many moles of Compound 3 were formed?",
    "choices": [
     "0.40 mol",
     "0.50 mol",
     "0.60 mol",
     "0.69 mol"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Let x = mol of ester formed. Then H₂O = x, and acid = alcohol = 1.0 − x. The volume cancels because there are equal numbers of moles on each side, so moles can go straight into K:\nK = x² ÷ (1.0 − x)² = 2.25.\nTake the square root of both sides: x ÷ (1.0 − x) = 1.5, so x = 1.5 − 1.5x, 2.5x = 1.5, and **x = 0.60 mol** (a 60% yield).\nCheck: 0.60² ÷ 0.40² = 0.36 ÷ 0.16 = 2.25. ✓\n\n**0.69 mol** solves x ÷ (1.0 − x) = 2.25, forgetting the square root (x = 2.25 ÷ 3.25).\n**0.50 mol** is what K = 1 would give.\n**0.40 mol** is the acid (or alcohol) left over, not the ester formed.",
    "id": "p_cpx2_6_q1"
   },
   {
    "q": "The NaHCO₃ wash removes unreacted acetic acid into the aqueous layer, while Compound 3 stays in the organic layer. Which statement best explains this difference? (pKa values: acetic acid, 4.8; H₂CO₃, 6.4)",
    "choices": [
     "Acetic acid is deprotonated to an ion, but the ester has no acidic O–H proton.",
     "Acetic acid is oxidized to CO₂ gas, but the ester has no oxidizable carbon atom.",
     "Acetic acid is denser than water, but the ester is less dense than water.",
     "Acetic acid donates hydrogen bonds, but the ester cannot accept hydrogen bonds."
    ],
    "ans": 0,
    "exp": "Bicarbonate is a base: CH₃COOH + HCO₃⁻ → CH₃COO⁻ + H₂CO₃, and H₂CO₃ then breaks down to **CO₂ + H₂O** (the bubbles). The equilibrium lies to the right because acid–base reactions favor the **weaker acid**: H₂CO₃ (pKa 6.4) is weaker than acetic acid (pKa 4.8). The product, **acetate, is an ion**, strongly solvated by water and insoluble in the nonpolar organic layer. The ester has **no O–H proton** to lose, so it stays neutral and stays in the organic layer.\n\n**Oxidized to CO₂** misreads the bubbles: the CO₂ comes from the bicarbonate (via H₂CO₃), and no redox occurs; acetic acid keeps both its carbons as acetate.\n**Density** decides which layer is on top, not which compound dissolves in which layer.\n**Hydrogen bonds:** the ester's oxygens do accept hydrogen bonds, and a neutral acid that can hydrogen-bond still dissolves well in the organic layer; only conversion to an ion moves it into water.",
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "id": "p_cpx2_6_q2"
   },
   {
    "q": "Partway through Trial 2, the flask contains 0.50 mol of Compound 3, 0.50 mol of Compound 1, 0.50 mol of Compound 2 and 0.10 mol of water; the other 0.40 mol of water formed is in the trap. What is the reaction quotient Q for the mixture in the flask, and in which direction does the reaction proceed?",
    "choices": [
     "Q = 0.20; toward the ester and water",
     "Q = 0.20; toward the acid and alcohol",
     "Q = 5.0; toward the acid and alcohol",
     "Q = 2.25; neither, it is at equilibrium"
    ],
    "ans": 0,
    "exp": "Q has the same form as K, using the amounts actually present in the flask (the volume cancels, since two moles appear on each side):\nQ = [ester][H₂O] ÷ ([acid][alcohol]) = (0.50 × 0.10) ÷ (0.50 × 0.50) = 0.050 ÷ 0.25 = **0.20**.\nQ < K (0.20 < 2.25), so the reaction proceeds **forward, toward the ester and water**. Because the trap keeps removing water, Q never catches up to K, which is why Trial 2 gives a much higher yield (**Le Châtelier's principle**). K itself is unchanged: **K depends only on temperature, which is unchanged**.\n\n**Q = 0.20; toward the acid and alcohol** reverses the rule: when Q < K, products are too low, so more products form.\n**Q = 5.0** inverts the expression (reactants over products).\n**Q = 2.25** assumes the mixture is always at equilibrium; water removal holds it away from equilibrium.",
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "id": "p_cpx2_6_q3"
   },
   {
    "q": "What is the role of H₂SO₄ in the formation of Compound 3?",
    "choices": [
     "It protonates the carbonyl oxygen of acetic acid, making the carbonyl carbon more electrophilic.",
     "It deprotonates isoamyl alcohol, making the alcohol a stronger nucleophile.",
     "It protonates the OH group of isoamyl alcohol, which leaves as water so that acetate can bond to the alkyl carbon.",
     "It oxidizes isoamyl alcohol to an aldehyde, which then reacts with acetic acid."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "A carboxylic acid carbonyl is a weak electrophile, and an alcohol is a weak nucleophile, so the uncatalyzed reaction is very slow. **Protonating the carbonyl oxygen** puts a positive charge on the carbonyl group, making the carbon much **more electrophilic** so the alcohol can attack. Acid also helps later by protonating an OH of the tetrahedral intermediate so it can leave as water. As a catalyst, H₂SO₄ is regenerated; it speeds the approach to equilibrium but does not change K.\n\nA strong acid cannot deprotonate an alcohol; that would take a strong base.\nMaking the alcohol the leaving group would break the alcohol's C–O bond, with a primary alkyl carbon as the electrophile. In Fischer esterification the alcohol's C–O bond stays intact; the water comes from the acid's OH.\nOxidizing the alcohol would give an aldehyde, which would not form an ester with acetic acid; the product would no longer be Compound 3.",
    "id": "p_cpx2_6_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_1",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5B",
   "5E"
  ],
  "title": "Valacyclovir and the Selective Activation of Acyclovir",
  "passage": "Herpes simplex virus (HSV) copies its DNA genome with its own DNA polymerase. The antiviral drug acyclovir (Compound 1) is a guanine nucleoside analog in which the deoxyribose ring is replaced by an open (2-hydroxyethoxy)methyl chain attached at N9 of the base. Compound 1 has no activity until its terminal OH group is phosphorylated. In infected cells, the viral enzyme thymidine kinase (TK) adds the first phosphate, and host kinases then convert the monophosphate to acyclovir triphosphate (ACV-TP). ACV-TP competes with a natural deoxynucleoside triphosphate for the viral polymerase, and once its monophosphate is incorporated into a growing strand, synthesis of that strand stops.\n\nOnly about 15% of an oral dose of Compound 1 reaches the blood. To improve absorption, Compound 1 is given as valacyclovir (Compound 2), the ester formed between its OH group and the amino acid L-valine. Compound 2 is carried across the intestinal wall by the peptide transporter PEPT1 and is then hydrolyzed by esterases in the intestine and liver (Figure 1). The oral bioavailability of Compound 1 delivered this way is about 55%.\n\nTo explain why Compound 1 is far more toxic to infected cells than to uninfected cells, researchers measured phosphorylation by purified HSV-1 TK and by human cytosolic thymidine kinase (TK1). Each assay contained 10 nM enzyme, 1.0 mM ATP and 5.0 mM Mg²⁺ in a pH 7.5 buffer at 37°C, and product formation was followed by HPLC. Rates at several substrate concentrations were fit to the Michaelis–Menten equation (Table 1). Because TK1 phosphorylated Compound 1 so slowly, its constants for Compound 1 are estimates.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Hydrolysis of Compound 2 to Compound 1 and L-valine",
    "parts": [
     "cpx3-valacyclovir",
     {
      "arrow": "H₂O, esterase"
     },
     "cpx3-acyclovir",
     "+",
     "cpx3-l-valine"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Kinetic constants for two thymidine kinases (pH 7.5, 37°C)",
   "columns": [
    "Substrate",
    "Enzyme",
    "KM (μM)",
    "kcat (s⁻¹)"
   ],
   "rows": [
    [
     "Thymidine",
     "HSV-1 TK",
     "0.50",
     "0.40"
    ],
    [
     "Thymidine",
     "Human TK1",
     "1.0",
     "4.0"
    ],
    [
     "Compound 1",
     "HSV-1 TK",
     "200",
     "0.020"
    ],
    [
     "Compound 1",
     "Human TK1",
     "2000",
     "0.0010"
    ]
   ]
  },
  "questions": [
   {
    "q": "Once acyclovir monophosphate has been added to the end of a viral DNA strand, no further nucleotide can be added to that strand. This is because the incorporated drug lacks:",
    "choices": [
     "an OH group in the position of the 3′-OH of deoxyribose, which forms the next phosphodiester bond.",
     "an OH group in the position of the 2′-OH of ribose, which forms the next phosphodiester bond.",
     "a base that can hydrogen bond to the template strand, which holds the next nucleotide in place.",
     "a 5′-triphosphate group, which supplies the energy to add the next nucleotide."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "A DNA polymerase extends a strand by having the **3′-OH of the last nucleotide** attack the α-phosphate of the incoming dNTP, forming a new phosphodiester bond. In Compound 1, the only OH (the one that corresponds to the 5′-OH) is used up when the drug is phosphorylated and linked into the strand. The open chain has no carbon that carries a 3′-OH, so the strand ends there: Compound 1 is an **obligate chain terminator**.\n\nDNA never uses a 2′-OH; deoxyribose has none, so lacking one changes nothing.\nThe guanine base is intact and pairs normally; that is why the polymerase accepts the drug in the first place.\nThe incoming nucleotide supplies the triphosphate, not the end of the strand, so the last residue in a strand never carries one.",
    "id": "p_cpx3_1_q1"
   },
   {
    "q": "What is the configuration of the stereocenter in Compound 2, and what is the configuration of the valine released when Compound 2 is hydrolyzed?",
    "choices": [
     "S in Compound 2; S in the valine released",
     "S in Compound 2; R in the valine released",
     "R in Compound 2; R in the valine released",
     "R in Compound 2; S in the valine released"
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "The stereocenter is the α-carbon of the valine piece. Rank its groups: **–NH₂ (N) > –C(=O)O– (O, O, O) > –CH(CH₃)₂ (C, C, H) > –H**. L-amino acids other than cysteine are **S**, and esterifying the carboxyl group doesn't change the ranking, because the ester carbon still carries three oxygen substituents (counting the duplicate for C=O). So Compound 2 is **S**.\n\nEster hydrolysis breaks the acyl C–O bond to the acyclovir oxygen. **No bond to the stereocenter is made or broken**, and the ranking is again N > COOH > isopropyl > H, so the valine released is still S (L-valine).\n\nThe pairs with R come from ranking the isopropyl group above the carbonyl carbon, or from assuming that L always means R. A change from S to R would require a bond to the stereocenter to break, which ester hydrolysis doesn't do.",
    "id": "p_cpx3_1_q2"
   },
   {
    "q": "Based on Table 1, by approximately what factor is the catalytic efficiency of HSV-1 TK for Compound 1 greater than that of human TK1 for Compound 1?",
    "choices": [
     "10",
     "20",
     "200",
     "2000"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "Catalytic efficiency is **kcat/KM**, so use both columns for the two Compound 1 rows.\nHSV-1 TK: 0.020 s⁻¹ ÷ 200 μM = 1.0 × 10⁻⁴ μM⁻¹·s⁻¹.\nHuman TK1: 0.0010 s⁻¹ ÷ 2000 μM = 5.0 × 10⁻⁷ μM⁻¹·s⁻¹.\nRatio = (1.0 × 10⁻⁴) ÷ (5.0 × 10⁻⁷) = **200**.\n\nThis selectivity is why the drug is activated mainly in infected cells.\n\n**10** compares only the KM values (2000 ÷ 200).\n**20** compares only the kcat values (0.020 ÷ 0.0010).\n**2000** is a power-of-ten slip in the division.\n\nThe thymidine rows are extra data and aren't needed.",
    "id": "p_cpx3_1_q3"
   },
   {
    "q": "ACV-TP competes with which natural nucleotide for the viral DNA polymerase, and which template base does the incorporated drug pair with?",
    "choices": [
     "dGTP; cytosine",
     "dGTP; thymine",
     "dATP; thymine",
     "dCTP; guanine"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "The passage calls Compound 1 a **guanine** nucleoside analog, and the drawn base in Figure 1 is guanine (a purine with a C=O at C6 and an NH₂ at C2). Its triphosphate therefore mimics **dGTP** and is inserted opposite **cytosine**, forming three hydrogen bonds.\n\nGuanine doesn't pair with thymine; A pairs with T.\ndATP would be the natural competitor only for an adenine analog.\ndCTP is the nucleotide that pairs with guanine in the template, the reverse of what ACV-TP does.",
    "id": "p_cpx3_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_2",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4B",
   "4A",
   "5A"
  ],
  "title": "Aerosol Generation in a Jet Nebulizer",
  "passage": "A jet nebulizer turns a liquid medication into an aerosol that a patient inhales through a mouthpiece. A small compressor drives air through a narrow orifice at the bottom of the nebulizer cup. The fast air jet passes across the open top of a feed tube whose lower end dips into the drug solution in the reservoir. The pressure in the jet is lower than the pressure on the liquid surface, so solution is drawn up the tube and torn into droplets by the jet. Large droplets strike a baffle and fall back into the reservoir; only small droplets leave with the air stream. Droplets with diameters of about 1–5 μm reach the small airways most effectively.\n\nEngineers compared two nebulizer designs. Design A has an orifice with a cross-sectional area of 1.0 mm², and Design B has an orifice area of 2.0 mm². In both, the top of the feed tube is 3.0 cm above the liquid surface. For each design, the mass median aerodynamic diameter (MMAD) of the aerosol was measured at several air flow rates (Figure 1). Air may be treated as incompressible, with a density of 1.2 kg/m³; the drug solution has a density of 1.0 × 10³ kg/m³. Use g = 10 m/s².\n\nA typical bronchodilator treatment uses albuterol, a β₂-adrenergic agonist. The nurse adds a measured volume of a concentrated albuterol solution to the cup and dilutes it with 0.9% NaCl to a fill volume of 2.5 mL. During nebulization, water evaporates into the dry air jet, so the solution left in the reservoir becomes cooler and slightly more concentrated as the treatment proceeds.",
  "figure": {
   "type": "line",
   "caption": "Figure 1 Aerosol MMAD as a function of air flow rate for two nebulizer designs",
   "x": {
    "label": "Air flow rate (L/min)",
    "min": 0,
    "max": 12,
    "step": 2
   },
   "y": {
    "label": "MMAD (μm)",
    "min": 0,
    "max": 8,
    "step": 1
   },
   "series": [
    {
     "name": "Design A (1.0 mm² orifice)",
     "marker": "circle",
     "line": "smooth",
     "points": [
      [
       2,
       6.0
      ],
      [
       4,
       4.2
      ],
      [
       6,
       3.0
      ],
      [
       8,
       2.4
      ],
      [
       10,
       2.0
      ]
     ]
    },
    {
     "name": "Design B (2.0 mm² orifice)",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       2,
       7.5
      ],
      [
       4,
       5.5
      ],
      [
       6,
       4.4
      ],
      [
       8,
       3.6
      ],
      [
       10,
       3.0
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "A therapist sets the air flow of Design A to produce an aerosol with an MMAD of 3.0 μm. What is the approximate speed of the air as it leaves the orifice?",
    "choices": [
     "0.10 m/s",
     "83 m/s",
     "100 m/s",
     "6.0 × 10³ m/s"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "From Figure 1, Design A gives an MMAD of 3.0 μm at **6.0 L/min**. Convert to SI units:\n6.0 L/min = 6.0 × 10⁻³ m³ ÷ 60 s = 1.0 × 10⁻⁴ m³/s.\n1.0 mm² = 1.0 × 10⁻⁶ m² (1 mm = 10⁻³ m, so 1 mm² = 10⁻⁶ m²).\nBy the **continuity equation**, Q = Av, so v = Q/A = (1.0 × 10⁻⁴ m³/s) ÷ (1.0 × 10⁻⁶ m²) = **100 m/s**.\n\n**83 m/s** comes from reading the Design B curve (3.0 μm at 10 L/min) and dividing by its 2.0 mm² orifice.\n**6.0 × 10³ m/s** comes from leaving the flow in m³ per minute instead of per second.\n**0.10 m/s** comes from converting 1 mm² to 10⁻³ m² instead of 10⁻⁶ m².",
    "id": "p_cpx3_2_q1"
   },
   {
    "q": "What is the minimum air speed across the top of the feed tube that could draw the drug solution up to the top of the tube?",
    "choices": [
     "0.77 m/s",
     "16 m/s",
     "22 m/s",
     "220 m/s"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "The liquid rises only if the pressure drop in the jet can support a liquid column 3.0 cm tall. By **Bernoulli's equation**, air moving at speed v has a pressure lower than still air by ½ρ_air v². The column needs a pressure difference of ρ_liquid gh.\nρ_liquid gh = (1.0 × 10³ kg/m³)(10 m/s²)(0.030 m) = 300 Pa.\nSet ½ρ_air v² = 300 Pa: v² = 2(300) ÷ 1.2 = 500 m²/s², so v ≈ **22 m/s**. (The 100 m/s jet in the device is well above this.)\n\n**16 m/s** drops the ½ (v² = 300 ÷ 1.2 = 250).\n**220 m/s** uses h = 3.0 m (cm not converted to m), which makes v² 100 times larger.\n**0.77 m/s** uses v = √(2gh), which ignores the large difference between the densities of air and liquid.",
    "id": "p_cpx3_2_q2"
   },
   {
    "q": "In one setting, the compressor delivers 6.0 L/min of air against a pressure difference of 1.0 × 10⁵ Pa. What is the minimum power the compressor must supply?",
    "choices": [
     "0.17 W",
     "10 W",
     "6.0 × 10² W",
     "1.0 × 10⁴ W"
    ],
    "ans": 1,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "Pushing a volume V against a pressure difference P takes work W = PV, so the power is **P × (volume flow rate)**.\nFlow rate = 6.0 L/min = 6.0 × 10⁻³ m³ ÷ 60 s = 1.0 × 10⁻⁴ m³/s.\nPower = (1.0 × 10⁵ Pa)(1.0 × 10⁻⁴ m³/s) = **10 W** (1 Pa·m³ = 1 J).\n\n**6.0 × 10² W** leaves the flow per minute instead of per second.\n**1.0 × 10⁴ W** uses 0.10 L/s without converting liters to cubic meters (1 L = 10⁻³ m³).\n**0.17 W** divides by 60 twice.",
    "id": "p_cpx3_2_q3"
   },
   {
    "q": "A nurse adds 0.50 mL of a 0.50% (w/v) albuterol solution to the cup and dilutes it to the 2.5 mL fill volume. What is the albuterol concentration in the cup before nebulization begins?",
    "choices": [
     "0.10 mg/mL",
     "1.0 mg/mL",
     "1.25 mg/mL",
     "5.0 mg/mL"
    ],
    "ans": 1,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "E",
    "subj": "gen_chem",
    "exp": "A **0.50% (w/v)** solution has 0.50 g per 100 mL = **5.0 mg/mL**.\nAlbuterol added = 0.50 mL × 5.0 mg/mL = 2.5 mg.\nAfter dilution: 2.5 mg ÷ 2.5 mL = **1.0 mg/mL** (equivalently, C₁V₁ = C₂V₂ gives 5.0 × 0.50 ÷ 2.5).\n\n**1.25 mg/mL** divides by only the 2.0 mL of saline added rather than the 2.5 mL total.\n**0.10 mg/mL** reads 0.50% as 0.50 mg/mL.\n**5.0 mg/mL** is the stock concentration, before dilution. (The passage notes the concentration rises later as water evaporates, but the question asks about the start.)",
    "id": "p_cpx3_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_3",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4D"
  ],
  "title": "Measuring Protein Concentration by Absorbance",
  "passage": "After purifying a recombinant enzyme, a laboratory must know its concentration before any kinetic work. The fastest method is to measure the absorbance of the protein at 280 nm. At this wavelength, almost all of the absorbance comes from the side chains of tryptophan and tyrosine, with a small contribution from cystine, the disulfide-linked pair of cysteine residues (Figure 1). Phenylalanine absorbs near 257 nm and contributes almost nothing at 280 nm. The molar absorptivity of a folded protein can be estimated by adding the contributions of its residues: about 5500 M⁻¹·cm⁻¹ for each Trp, 1500 M⁻¹·cm⁻¹ for each Tyr and 125 M⁻¹·cm⁻¹ for each disulfide bond.\n\nProtein X has a molar mass of 25,000 g/mol and contains 1 Trp, 3 Tyr, 7 Phe and one disulfide bond. A stock solution of Protein X was diluted 10-fold in buffer, and the diluted sample was read in a 1.0 cm quartz cuvette against a buffer blank. The diluted sample gave A₂₈₀ = 0.40 and A₂₆₀ = 0.24. Nucleic acids absorb more strongly at 260 nm than at 280 nm, so an A₂₆₀/A₂₈₀ ratio near 0.6 indicates little nucleic acid contamination.\n\nThe same stock was also analyzed by the Bradford assay. In this method, the dye Coomassie Brilliant Blue G-250 binds to proteins, mainly through ionic interactions with arginine and lysine side chains, and its absorbance maximum shifts from 465 nm to 595 nm. The A₅₉₅ of each sample is converted to a concentration using a standard curve, which is usually prepared with bovine serum albumin (BSA). BSA is rich in lysine and arginine, whereas Protein X has relatively few of these residues. The Bradford assay reported a concentration of Protein X that was 40% lower than the value from A₂₈₀.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Amino acids that absorb at 280 nm (cystine is two cysteines joined by a disulfide bond)",
    "parts": [
     "cpx3-tryptophan",
     "cpx3-tyrosine",
     "cpx3-cystine"
    ]
   }
  ],
  "questions": [
   {
    "q": "The disulfide bond that contributes to the 280 nm absorbance of Protein X forms by:",
    "choices": [
     "oxidation of two cysteine thiol groups.",
     "reduction of two cysteine thiol groups.",
     "dehydration of two cysteine thiol groups.",
     "hydrolysis of two methionine thioether groups."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Two cysteine side chains (–CH₂–SH) join as –CH₂–S–S–CH₂– by losing two hydrogen atoms (two H⁺ and two electrons): 2 R–SH → R–S–S–R + 2H⁺ + 2e⁻. Losing electrons is **oxidation**, which is why disulfides form in oxidizing compartments such as the ER and are broken by reducing agents such as DTT or β-mercaptoethanol.\n\nReduction is the reverse process, which breaks a disulfide.\nDehydration would remove H₂O, but no oxygen is involved in forming S–S.\nMethionine's sulfur is a thioether with no S–H, so it can't form a disulfide.",
    "id": "p_cpx3_3_q1"
   },
   {
    "q": "What is the concentration of Protein X in the undiluted stock?",
    "choices": [
     "0.10 mg/mL",
     "1.0 mg/mL",
     "10 mg/mL",
     "100 mg/mL"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "First estimate ε₂₈₀ from the residues. Phe doesn't count at 280 nm:\nε = 1(5500) + 3(1500) + 1(125) = 10,125 ≈ **1.0 × 10⁴ M⁻¹·cm⁻¹**.\nBy **A = εbc**: c = 0.40 ÷ (1.0 × 10⁴ M⁻¹·cm⁻¹ × 1.0 cm) = 4.0 × 10⁻⁵ M in the diluted sample.\nUndo the 10-fold dilution: stock = 4.0 × 10⁻⁴ M.\nConvert to mass: 4.0 × 10⁻⁴ mol/L × 25,000 g/mol = 10 g/L = **10 mg/mL**.\n\n**1.0 mg/mL** is the concentration of the diluted sample (the dilution was ignored).\n**0.10 mg/mL** divides by the dilution factor instead of multiplying.\n**100 mg/mL** is a power-of-ten slip, for example using ε = 1.0 × 10³.",
    "id": "p_cpx3_3_q2"
   },
   {
    "q": "What is the approximate energy of one photon used in the A₂₈₀ measurement? (hc ≈ 1240 eV·nm)",
    "choices": [
     "0.23 eV",
     "2.1 eV",
     "4.4 eV",
     "44 eV"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "physics",
    "exp": "Photon energy is **E = hf = hc/λ**. With hc ≈ 1240 eV·nm:\nE = 1240 eV·nm ÷ 280 nm ≈ **4.4 eV**, an ultraviolet photon with enough energy to excite the π electrons of the aromatic rings.\n\n**2.1 eV** is the photon energy at 595 nm (1240 ÷ 595), the Bradford wavelength.\n**0.23 eV** inverts the formula (280 ÷ 1240).\n**44 eV** is a factor-of-10 slip in the division.",
    "id": "p_cpx3_3_q3"
   },
   {
    "q": "Which change to the Bradford procedure would best make its result for Protein X agree with the true concentration?",
    "choices": [
     "Prepare the standard curve with purified Protein X whose concentration was determined from A₂₈₀",
     "Prepare the standard curve with more BSA concentrations spaced closer together",
     "Read the absorbance of the samples at 465 nm instead of 595 nm",
     "Double the dye concentration in both the standards and the samples"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "D",
    "exp": "The Bradford signal depends on **how many Arg and Lys residues** a protein has. BSA has many, so each microgram of BSA gives more color than each microgram of Protein X. Reading Protein X against a BSA curve therefore **underestimates** it, which matches the 40% lower result. The fix is a **standard of the same protein**, whose concentration is known by an independent method such as A₂₈₀.\n\nMore BSA points make the BSA curve more precise, but it is still the wrong protein, so the systematic error remains.\nAt 465 nm the free dye absorbs; that wavelength doesn't measure the protein-bound form, and the composition problem remains.\nMore dye doesn't change how strongly each protein binds it relative to BSA, so the bias stays.",
    "id": "p_cpx3_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_4",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5E",
   "5C"
  ],
  "title": "Racemization of Thalidomide in Buffer",
  "passage": "Thalidomide (Compound 1) was sold in the 1950s as a racemic sedative and caused severe birth defects. It is now used to treat multiple myeloma and leprosy complications. Its single stereocenter is C3 of the glutarimide ring, the carbon bonded to the nitrogen of the phthalimide group. Animal studies suggested that the (S)-enantiomer is mainly responsible for the birth defects, but giving pure (R)-1 does not solve the problem, because the two enantiomers interconvert in the body (Figure 1).\n\nThe hydrogen on C3 is unusually acidic for a C–H bond. Removal of this proton gives a resonance-stabilized anion, and reprotonation can occur on either face of the planar carbon. To study this process, researchers dissolved (S)-1 in phosphate buffer and measured the enantiomeric excess (ee) over time by HPLC. The loss of ee followed first-order kinetics. They also prepared Compound 2, which is (S)-1 with deuterium in place of the C3 hydrogen.\n\nAt pH 7.4 and 37°C, the half-life for loss of ee was 4.0 h for (S)-1 and 20 h for Compound 2. At pH 6.5 and 37°C, the half-life for (S)-1 increased to 16 h. Under all conditions, the glutarimide ring of Compound 1 was also slowly hydrolyzed (half-life about 10 h at pH 7.4), but the hydrolysis products were separated from Compound 1 by the HPLC method and did not affect the ee measurement. Optical rotation could not be used to follow the reaction, because the hydrolysis products are also chiral and optically active. In 1:1 phosphate buffer–methanol at 25°C, (S)-1 lost ee with a half-life of more than 60 h.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Interconversion of the enantiomers of thalidomide",
    "parts": [
     "cpx3-s-thalidomide",
     {
      "arrow": "pH 7.4, 37°C"
     },
     "cpx3-r-thalidomide"
    ]
   }
  ],
  "questions": [
   {
    "q": "Which structure is most likely the neutral intermediate through which the enantiomers of Compound 1 interconvert?",
    "choiceFigs": [
     "cpx3-thalidomide-enol",
     "cpx3-thalidomide-iminol",
     "cpx3-thalidomide-cation",
     "cpx3-phthaloylglutamine"
    ],
    "choices": [
     "The enol with a C2=C3 double bond",
     "The imidic acid tautomer of the glutarimide ring",
     "The carbocation at C3",
     "The ring-opened hydrolysis product"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "Racemization needs an intermediate in which **C3 is no longer a stereocenter**. Removing the C3 proton gives an enolate, and its neutral form is the **enol**, with a C2=C3 double bond. C3 is then sp² and planar, so adding a proton back to either face gives (S)-1 or (R)-1. This is ordinary **keto–enol tautomerism** of a carbon alpha to a carbonyl.\n\nThe imidic acid tautomer moves a proton from N to O. C3 keeps its H and stays sp³, so its configuration is unchanged.\nA C3 carbocation is also planar, but it would require losing a hydride ion, which doesn't happen in buffer. Base removes H⁺, not H⁻.\nThe hydrolysis product still has an sp³ stereocenter, and the passage says hydrolysis is a separate reaction that doesn't affect the ee.",
    "id": "p_cpx3_4_q1"
   },
   {
    "q": "A solution of pure (S)-1 is kept at pH 7.4 and 37°C for 8.0 h. Ignoring hydrolysis, what percentage of the remaining Compound 1 is the S enantiomer?",
    "choices": [
     "25%",
     "37.5%",
     "62.5%",
     "75%"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "The ee starts at 100% and falls by first-order kinetics with t½ = 4.0 h. 8.0 h is **two half-lives**: 100% → 50% → **25% ee**.\nFor a mixture, ee = %S − %R and %S + %R = 100%. So %S = (100 + 25) ÷ 2 = **62.5%**, and %R = 37.5%.\n\n**25%** is the ee itself, not the percentage of S.\n**37.5%** is the percentage of R.\n**75%** is the percentage of S after only one half-life (ee 50%).",
    "id": "p_cpx3_4_q2"
   },
   {
    "q": "To measure the ee of Compound 1 by HPLC, the researchers would most need to use:",
    "choices": [
     "a chiral stationary phase, because enantiomers interact identically with an achiral one.",
     "a more polar mobile phase, because the enantiomers differ in polarity.",
     "a longer achiral column, because the enantiomers differ slightly in molar mass.",
     "a reversed-phase column, because the S enantiomer is more hydrophobic."
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Enantiomers have **identical physical properties** (polarity, solubility, molar mass, boiling point) in an achiral environment, so no ordinary column separates them. A **chiral stationary phase** forms short-lived diastereomeric complexes with the two enantiomers. Diastereomers have different energies, so the enantiomers elute at different times and the peak areas give the ee.\n\nThe other three choices each assume a difference between enantiomers (polarity, mass or hydrophobicity) that doesn't exist. Compound 2 differs in mass, but (S)-1 and (R)-1 don't.",
    "id": "p_cpx3_4_q3"
   },
   {
    "q": "Which conclusion about the racemization of Compound 1 is best supported by the results?",
    "choices": [
     "Cleavage of the C3–H bond occurs in the rate-determining step, and the reaction is catalyzed by base.",
     "Cleavage of the C3–H bond occurs in the rate-determining step, and the reaction is catalyzed by acid.",
     "Cleavage of the C3–H bond occurs after the rate-determining step, and the reaction is catalyzed by base.",
     "Cleavage of the C3–H bond occurs after the rate-determining step, and the reaction is catalyzed by acid."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Compare the half-lives. Replacing the C3 H with D slowed racemization from t½ = 4.0 h to 20 h, so kH/kD = 20 ÷ 4.0 = **5**. A C–D bond is stronger (lower zero-point energy) than C–H, and a **primary kinetic isotope effect** this large means the C3–H bond is broken in the **rate-determining step**.\n\nLowering the pH from 7.4 to 6.5 (less OH⁻ and phosphate base, more H⁺) made racemization **4 times slower** (4.0 h → 16 h). A reaction that slows as [H⁺] rises is **base-catalyzed**, consistent with base removing the C3 proton.\n\nThe acid-catalyzed choices reverse the pH trend.\nIf C–H cleavage came after the slow step, swapping in deuterium would barely change the rate, but it changed it 5-fold.",
    "id": "p_cpx3_4_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_5",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5E",
   "4C"
  ],
  "title": "Water-Circulating Pads for Therapeutic Cooling",
  "passage": "After resuscitation from cardiac arrest, some patients are cooled to a core temperature of about 33°C for 24 h to limit brain injury, and then rewarmed slowly. One cooling system pumps chilled water through thin plastic pads attached to the skin of the torso and thighs. Heat flows from the warmer skin, through the pad wall, into the circulating water. The water then returns to a control unit, where a refrigeration circuit removes the heat. When cooling must stop or be reversed, a 600 W resistive heater operating at 120 V warms the circulating water instead. Rewarming is limited to about 0.25°C per hour, because faster rewarming can cause blood vessels in the skin to dilate and blood pressure to fall. Shivering, which generates heat, is treated with sedatives so that it does not oppose cooling.\n\nThe control unit adjusts the inlet water temperature automatically, using the patient's core temperature measured by an esophageal thermistor. The thermistor's resistance increases as its temperature decreases. The monitor passes a constant current of 10 μA through the thermistor and converts the voltage across it to a temperature reading.\n\nTable 1 shows data recorded for a 70 kg patient during the first 4 h of cooling. The water flow rate was held at 3.0 L/min. The specific heat of water is 4.2 J/(g·°C), and 1.0 L of water has a mass of 1.0 kg.",
  "figure": {
   "caption": "Table 1 Temperatures during induction of cooling (flow rate 3.0 L/min)",
   "columns": [
    "Time (h)",
    "Core temperature (°C)",
    "Water inlet (°C)",
    "Water outlet (°C)"
   ],
   "rows": [
    [
     "0",
     "37.0",
     "10.0",
     "12.0"
    ],
    [
     "1.0",
     "35.6",
     "10.0",
     "11.8"
    ],
    [
     "2.0",
     "34.4",
     "10.0",
     "11.6"
    ],
    [
     "3.0",
     "33.4",
     "14.0",
     "15.0"
    ],
    [
     "4.0",
     "33.0",
     "20.0",
     "20.6"
    ]
   ]
  },
  "questions": [
   {
    "q": "At the start of cooling (time 0), at approximately what rate was heat being carried away by the circulating water?",
    "choices": [
     "0.42 W",
     "420 W",
     "2.5 × 10³ W",
     "2.5 × 10⁴ W"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "The water warms from 10.0°C to 12.0°C, so **ΔT = 2.0°C**. Use q = mcΔT per second.\nMass flow = 3.0 L/min = 3.0 kg/min = 3000 g ÷ 60 s = 50 g/s.\nRate = (50 g/s)(4.2 J/g·°C)(2.0°C) = **420 J/s = 420 W**.\n\n**2.5 × 10⁴ W** leaves the flow per minute (3000 g/min) instead of per second.\n**2.5 × 10³ W** uses the outlet temperature (12°C) as ΔT instead of the change.\n**0.42 W** uses the mass in kilograms (0.050 kg/s) with c in J/g·°C.",
    "id": "p_cpx3_5_q1"
   },
   {
    "q": "Before a unit is used, a technician wants to confirm that its heater actually delivers about 600 W of heat to the circulating water. Which test would best do this?",
    "choices": [
     "With refrigeration off, heat a known mass of water in an insulated loop for a measured time; calculate mcΔT ÷ t.",
     "With the pads on a patient, run the heater for a measured time; calculate mcΔT ÷ t from the patient's mass and core-temperature rise.",
     "With refrigeration on, heat a known mass of water in the loop for a measured time; calculate mcΔT ÷ t.",
     "With refrigeration off, run the heater for a measured time; record the final temperature of the heating element."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 3",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Power is **energy per time**, and the heat that water absorbs is **q = mcΔT**. So the heater's output is P = mcΔT ÷ t, measured on water whose mass and specific heat are known (4.2 J/g·°C), with no other heat source or sink acting on it. Turning the refrigeration off and insulating the loop makes the heater the **only variable** that changes the water temperature. For example, 600 W for 5.0 min (300 s) puts 1.8 × 10⁵ J into the water; in 10 kg of water that is a rise of 1.8 × 10⁵ ÷ (10,000 g × 4.2 J/g·°C) ≈ 4.3°C, easy to measure.\n\nA patient adds metabolic heat, loses heat to the room and warms unevenly, and the body's specific heat is not known precisely, so the core temperature can't give the heater's output.\nWith the refrigeration on, heat is removed at the same time it is added, so the measured rise underestimates the heater's power.\nThe element's temperature alone gives no energy: it depends on how fast heat leaves the element, and no mass or specific heat enters the calculation.",
    "id": "p_cpx3_5_q2"
   },
   {
    "q": "What is the resistance of the heating element in the control unit?",
    "choices": [
     "0.20 Ω",
     "5.0 Ω",
     "24 Ω",
     "7.2 × 10⁴ Ω"
    ],
    "ans": 2,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "For a resistor, **P = V²/R**, so R = V²/P = (120 V)² ÷ 600 W = 14,400 ÷ 600 = **24 Ω**. Check: I = P/V = 5.0 A, and V/I = 120 ÷ 5.0 = 24 Ω.\n\n**5.0 Ω** is the current in amperes (5.0 A), not the resistance.\n**0.20 Ω** inverts the ratio (P/V = 5.0, then 1/5.0).\n**7.2 × 10⁴ Ω** multiplies P by V (600 × 120) instead of dividing.",
    "id": "p_cpx3_5_q3"
   },
   {
    "q": "As the patient cools from 37°C to 33°C, how does the voltage across the esophageal thermistor change?",
    "choices": [
     "It increases, because the resistance increases while the current is constant.",
     "It decreases, because the resistance increases while the current is constant.",
     "It increases, because the current increases while the resistance is constant.",
     "It does not change, because the current is held constant."
    ],
    "ans": 0,
    "cat": "4C",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "By **Ohm's law, V = IR**. The monitor holds I constant at 10 μA, and the passage says the thermistor's resistance **increases as its temperature decreases**. So as the patient cools, R rises and V = IR rises in proportion.\n\nA decreasing voltage would need R to fall, which is the opposite of what the passage states.\nThe current is held constant, so it can't be what changes.\nA constant current doesn't fix the voltage. That's exactly why measuring V reports R, and therefore the temperature.",
    "id": "p_cpx3_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx3_6",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4E",
   "5A"
  ],
  "title": "Fluorine-18 Fluoride PET Imaging of Bone",
  "passage": "Bone metastases from breast and prostate cancer cause local increases in bone turnover. One way to image them is positron emission tomography (PET) with fluorine-18 sodium fluoride (Na¹⁸F). Fluorine-18 is made in a cyclotron by bombarding water enriched in a heavy oxygen isotope with protons. It has a half-life of 110 min and decays about 97% of the time by positron (β⁺) emission, with the rest by electron capture. An older bone-scan agent, technetium-99m methylene diphosphonate (⁹⁹ᵐTc-MDP), is still widely used; ⁹⁹ᵐTc has a half-life of 6.0 h, and its bone images are usually taken 3.0 h after injection.\n\nAfter intravenous injection, fluoride ions leave the capillaries and reach the surface of bone mineral. Bone mineral is mostly hydroxyapatite, Ca₅(PO₄)₃OH. Fluoride exchanges with hydroxide ions in the crystal to form fluorapatite:\n\nCa₅(PO₄)₃OH(s) + F⁻(aq) → Ca₅(PO₄)₃F(s) + OH⁻(aq)\nReaction 1\n\nUptake is greatest where blood flow is high and new mineral is being laid down, such as at fractures, growth plates and metastases. About half of the injected fluoride is taken up by bone in the first hour; most of the rest is excreted by the kidneys.\n\nA positron emitted in tissue travels less than 1 mm before it meets an electron. The two particles annihilate, and their rest-mass energy is converted to gamma photons. A ring of detectors around the patient records only events in which two detectors on opposite sides are struck at nearly the same moment. A typical adult dose is 250 MBq, and imaging begins about 60 min after injection.\n\nBecause Na¹⁸F is prepared without added nonradioactive fluoride, the concentration of fluoride in blood remains far below the level at which CaF₂ (Ksp ≈ 4.0 × 10⁻¹¹) could precipitate. In a simple model, the plasma concentration of free Ca²⁺ is 1.0 mM.",
  "questions": [
   {
    "q": "Fluorine-18 is produced when an oxygen-18 nucleus absorbs a proton. Which other particle is released in this reaction?",
    "choices": [
     "A neutron",
     "A positron",
     "An alpha particle",
     "A gamma photon only"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "A nuclear equation must balance both **mass number, A,** and **charge, Z**:\n¹⁸₈O + ¹₁p → ¹⁸₉F + ?\nMass number: 18 + 1 = 18 + A, so A = 1.\nCharge: 8 + 1 = 9 + Z, so Z = 0.\nA particle with A = 1 and Z = 0 is a **neutron** (¹₀n). This is why the cyclotron reaction is written ¹⁸O(p,n)¹⁸F.\n\nReleasing a **positron** (A = 0, Z = +1) would leave A = 19 and Z = 8, which is ¹⁹O, not ¹⁸F.\nReleasing an **alpha particle** (A = 4, Z = 2) would leave A = 15 and Z = 7, which is ¹⁵N.\nReleasing **only a gamma photon** (A = 0, Z = 0) would leave A = 19 and Z = 9, which is ¹⁹F, stable fluorine.",
    "id": "p_cpx3_6_q1"
   },
   {
    "q": "Considering radioactive decay only, approximately what percentage of the injected ⁹⁹ᵐTc activity remains when a ⁹⁹ᵐTc-MDP bone scan begins?",
    "choices": [
     "25%",
     "50%",
     "71%",
     "75%"
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "The scan begins 3.0 h after injection, and the half-life is 6.0 h, so only 3.0 ÷ 6.0 = **one-half of a half-life** has passed. The fraction remaining is (½)^(t/t½) = (½)^0.5 = **1/√2 ≈ 1/1.41 ≈ 0.71**, or about **71%**. Check: 0.71 × 0.71 ≈ 0.50, so a second 3.0 h interval brings the activity to 50%, as one full half-life should.\n\nThe answer must lie between 100% and 50%. Decay is **exponential**: the rate is proportional to the activity present, so more activity is lost in the first 3 h (100% → 71%, a loss of 29%) than in the next 3 h (71% → 50%, a loss of 21%). That puts the value below the midpoint.\n\n**75%** assumes the activity falls linearly, losing half of the 50% in half the time.\n**50%** counts a full half-life for a 3.0 h wait.\n**25%** divides the half-life by the time (6.0 ÷ 3.0 = 2) and counts two half-lives.",
    "id": "p_cpx3_6_q2"
   },
   {
    "q": "Why does the scanner look for two photons striking detectors on opposite sides of the ring at the same time?",
    "choices": [
     "Annihilation gives two 511 keV photons that travel in opposite directions, conserving momentum.",
     "Annihilation gives two 1022 keV photons that travel in opposite directions, conserving momentum.",
     "Annihilation gives two 511 keV photons that travel in the same direction, conserving charge.",
     "Annihilation gives one 1022 keV photon that is scattered into two opposite beams by tissue."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "X",
    "subj": "physics",
    "exp": "By the time it annihilates, the positron has slowed almost to rest, so the electron–positron pair has nearly **zero total momentum**. One photon always carries momentum, so it can't conserve momentum alone. **Two photons of equal energy moving in opposite directions** (about 180° apart) have a total momentum of zero. The energy comes from the two rest masses, 2mₑc² = 2 × 511 keV = 1022 keV, shared equally: **511 keV each**. A coincidence on opposite detectors places the decay on the line joining them.\n\n**1022 keV each** double-counts the energy; 1022 keV is the total.\nPhotons traveling in the same direction would carry net momentum. Charge is conserved in either case (+1 − 1 = 0), so charge doesn't decide the geometry.\nA single photon violates momentum conservation, and tissue scattering is random, not a split into two opposite beams.",
    "id": "p_cpx3_6_q3"
   },
   {
    "q": "Using the model in the passage, what is the maximum free fluoride concentration in plasma before CaF₂ would begin to precipitate?",
    "choices": [
     "6.3 × 10⁻⁶ M",
     "4.0 × 10⁻⁸ M",
     "1.0 × 10⁻⁴ M",
     "2.0 × 10⁻⁴ M"
    ],
    "ans": 3,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "For CaF₂(s) ⇌ Ca²⁺ + 2F⁻, **Ksp = [Ca²⁺][F⁻]²**. Precipitation begins when the ion product reaches Ksp.\n[F⁻]² = Ksp ÷ [Ca²⁺] = (4.0 × 10⁻¹¹) ÷ (1.0 × 10⁻³ M) = 4.0 × 10⁻⁸.\n[F⁻] = √(4.0 × 10⁻⁸) = **2.0 × 10⁻⁴ M**.\n\n**4.0 × 10⁻⁸ M** forgets to take the square root.\n**1.0 × 10⁻⁴ M** writes Ksp as [Ca²⁺](2[F⁻])², doubling a concentration that is already measured directly.\n**6.3 × 10⁻⁶ M** uses [Ca²⁺] = 1.0 M (mM not converted), giving √(4.0 × 10⁻¹¹).",
    "id": "p_cpx3_6_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_1",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5E",
   "5B"
  ],
  "title": "ATP Competition and Resistance to an EGFR Kinase Inhibitor",
  "passage": "The epidermal growth factor receptor (EGFR) is a transmembrane receptor tyrosine kinase. When EGF binds, the intracellular kinase domain transfers the γ-phosphate of ATP to tyrosine residues on a partner receptor and on downstream signaling proteins, as shown in Reaction 1. The enzyme binds ATP as an Mg²⁺–ATP complex.\n\nProtein–Tyr–OH + ATP → Protein–Tyr–OPO₃²⁻ + ADP + H⁺\nReaction 1\n\nSome non-small-cell lung cancers carry an activating point mutation in the kinase, L858R (leucine 858 replaced by arginine). These tumors often respond to gefitinib (Compound 1, Figure 1), which occupies the ATP-binding cleft. Its quinazoline ring sits where the adenine of ATP binds, and ring nitrogen N1 interacts with the backbone N–H of Met793 in the hinge segment that joins the two lobes of the kinase. Most tumors relapse within one to two years, often because a second mutation, T790M, appears. Residue 790 is called the gatekeeper because its side chain lines the back of the ATP pocket.\n\nTo learn how T790M causes resistance, researchers purified three forms of the kinase domain and measured initial rates of peptide phosphorylation at 25°C and pH 7.5 with 10 mM MgCl₂. KM for ATP and kcat were found by varying ATP at a saturating peptide concentration. The inhibition constant (Ki) of Compound 1 was then measured; Compound 1 was competitive with ATP for all three enzymes. For a competitive inhibitor, the concentration that halves the reaction rate (IC50) depends on the ATP concentration, as given by Equation 1.\n\nIC50 = Ki(1 + [ATP]/KM)\nEquation 1\n\nThe ATP concentration inside cells is about 1 mM. The results are shown in Table 1.",
  "scheme": [
   {
    "after": 2,
    "caption": "Figure 1 Structure of Compound 1 (gefitinib)",
    "parts": [
     "cpx4-gefitinib"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Kinetic constants of EGFR kinase domains (25°C, pH 7.5)",
   "columns": [
    "Kinase",
    "KM for ATP (μM)",
    "kcat (s⁻¹)",
    "Ki of Compound 1 (nM)"
   ],
   "rows": [
    [
     "Wild type",
     "5.0",
     "0.050",
     "0.40"
    ],
    [
     "L858R",
     "100",
     "0.60",
     "2.0"
    ],
    [
     "L858R/T790M",
     "5.0",
     "1.2",
     "4.0"
    ]
   ]
  },
  "questions": [
   {
    "q": "In the T790M mutation, the gatekeeper threonine is replaced by methionine. Compared with the original side chain, the new side chain:",
    "choices": [
     "lacks a hydroxyl group and contains a thioether.",
     "lacks a hydroxyl group and contains a thiol.",
     "lacks a thiol and contains a hydroxyl group.",
     "lacks a hydroxyl group and carries a positive charge at pH 7.5."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Threonine's side chain is **–CH(OH)CH₃**, a small polar secondary alcohol. Methionine's is **–CH₂CH₂–S–CH₃**: the sulfur is bonded to two carbons, which makes it a **thioether** (sulfide), and the side chain is larger and nonpolar. So T790M removes an OH and puts a bulkier hydrophobic group at the back of the ATP pocket.\n\nA **thiol** (–SH) is cysteine's group, not methionine's.\n\"Lacks a thiol and contains a hydroxyl\" describes the reverse change (Cys → Ser/Thr).\nA **positive charge** is what the other mutation, L858R, adds (arginine); methionine is uncharged.",
    "id": "p_cpx4_1_q1"
   },
   {
    "q": "Based on Equation 1 and Table 1, approximately what concentration of Compound 1 would be needed to halve the activity of the L858R/T790M kinase inside a cell?",
    "choices": [
     "4.8 nM",
     "22 nM",
     "0.80 μM",
     "8.0 μM"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Use **Equation 1** with the double mutant's row and the cellular ATP level, putting [ATP] and KM in the same units: [ATP] = 1 mM = **1000 μM**, KM = 5.0 μM.\nIC50 = 4.0 nM × (1 + 1000/5.0) = 4.0 nM × 201 ≈ 800 nM = **0.80 μM**.\n\n**4.8 nM** comes from leaving ATP in mM: 4.0 × (1 + 1.0/5.0) = 4.8 nM.\n**22 nM** is the answer for the L858R kinase: 2.0 × (1 + 1000/100) = 22 nM, the drug-sensitive form.\n**8.0 μM** is a factor-of-10 slip in converting 800 nM to μM.\n\nThe comparison is the point of the study: in cells the drug is about 36 times less potent against the resistant kinase (800 nM vs 22 nM), although Ki rose only 2-fold.",
    "id": "p_cpx4_1_q2"
   },
   {
    "q": "Which conclusion about the T790M mutation is best supported by the data in Table 1?",
    "choices": [
     "It causes resistance mainly by raising the kinase's affinity for ATP, because KM for ATP fell 20-fold while Ki rose only 2-fold.",
     "It causes resistance mainly by preventing Compound 1 from binding, because Ki rose more than KM for ATP fell.",
     "It causes resistance mainly by speeding up catalysis, because kcat doubled while Ki was unchanged.",
     "It does not cause resistance, because Ki for Compound 1 remains in the low nanomolar range."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "Compare the L858R row with the L858R/T790M row. **KM for ATP fell from 100 to 5.0 μM (20-fold)**, so the double mutant binds ATP much more tightly. **Ki rose only from 2.0 to 4.0 nM (2-fold)**, so Compound 1 still binds well. Because Compound 1 is competitive with ATP, a lower KM means the ~1 mM ATP in cells outcompetes the drug far more effectively (Equation 1: the IC50 rises from about 22 nM to 800 nM). Restored ATP affinity is the main cause of resistance.\n\nKi changed less than KM, not more, so \"preventing binding\" contradicts the table.\nkcat did double (0.60 → 1.2 s⁻¹), but Ki was not unchanged, and for a competitive inhibitor the IC50 doesn't depend on kcat at all.\nA low-nanomolar Ki ignores ATP competition; the cellular IC50 is what matters.",
    "id": "p_cpx4_1_q3"
   },
   {
    "q": "The hinge interaction described in the passage is best classified as:",
    "choices": [
     "a hydrogen bond in which N1 of Compound 1 is the acceptor.",
     "a hydrogen bond in which N1 of Compound 1 is the donor.",
     "an ionic bond between a protonated N1 and the amide nitrogen.",
     "a covalent bond between N1 and the amide nitrogen."
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "N1 of the quinazoline ring is an aromatic, pyridine-like nitrogen: it carries **no hydrogen** but has a **lone pair** in the ring plane. The backbone N–H of Met793 has a hydrogen on an electronegative nitrogen. So the H goes from the amide N–H toward N1's lone pair: a **hydrogen bond with N1 as the acceptor**. This mimics the bond that the adenine N1 of ATP makes with the same hinge N–H.\n\nN1 can't be the donor because it has no N–H.\nAn ionic bond would need charged partners; the backbone amide nitrogen is neutral and not basic.\nA covalent bond would make the inhibitor irreversible, but Compound 1 is a competitive (reversible) inhibitor.",
    "id": "p_cpx4_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_2",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4C",
   "4E"
  ],
  "title": "Electrode Resistance and Calibration in EEG Recording",
  "passage": "An electroencephalogram (EEG) records voltages that cortical neurons produce at the scalp. The signals are small: alpha waves (8–13 Hz), which dominate when a relaxed subject closes the eyes, have amplitudes of about 20–60 μV, and the slow delta waves of deep sleep can reach 100–200 μV. Each recording electrode is a silver disk coated with silver chloride and covered with a conductive gel that contains KCl. At the disk surface, charge is carried across the boundary between the ionic gel and the metal by Reaction 1, which keeps the electrode potential steady.\n\nAgCl(s) + e⁻ ⇌ Ag(s) + Cl⁻(aq)   E° = +0.22 V\nReaction 1\n\nThe amplifier measures the voltage between each scalp electrode and a reference electrode. Its input resistance is 100 MΩ, and a 10 kΩ protective resistor is placed in series with each lead to limit the current if a fault occurs. Hair and the dry outer layer of skin can make the electrode–skin contact resistance high and uneven, and a high-resistance contact picks up interference from 60 Hz power lines. Technicians therefore abrade the skin lightly and aim for a contact resistance below 5 kΩ.\n\nBefore each recording, the system checks every electrode by passing a small 30 Hz test current of 10 nA through the electrode–skin contact and measuring the voltage across it. The amplifier is then calibrated with a known signal. A 1.0 V reference source is connected across a 200 kΩ resistor and a 10 Ω resistor in series, and the voltage across the 10 Ω resistor is fed to the amplifier input. The displayed trace is adjusted until this calibration signal has the expected height.",
  "questions": [
   {
    "q": "During the electrode check, the voltage across one electrode–skin contact was 0.20 mV. What was the contact resistance, and does the electrode meet the laboratory's standard?",
    "choices": [
     "2.0 kΩ; yes, it meets the standard",
     "20 kΩ; no, it does not meet the standard",
     "200 kΩ; no, it does not meet the standard",
     "20 Ω; yes, it meets the standard"
    ],
    "ans": 1,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "Use **Ohm's law, R = V/I**, in SI units: V = 0.20 mV = 2.0 × 10⁻⁴ V and I = 10 nA = 1.0 × 10⁻⁸ A.\nR = 2.0 × 10⁻⁴ ÷ 1.0 × 10⁻⁸ = 2.0 × 10⁴ Ω = **20 kΩ**, four times the 5 kΩ target, so the skin under this electrode should be prepared again.\n\n**2.0 kΩ** and **200 kΩ** are the same digits with the power of ten off by one, from slipping on the milli (10⁻³) or nano (10⁻⁹) prefix.\n**20 Ω** comes from treating nA as μA (10 μA = 1.0 × 10⁻⁵ A), which drops a factor of 1000: 2.0 × 10⁻⁴ ÷ 1.0 × 10⁻⁵ = 20 Ω.",
    "id": "p_cpx4_2_q1"
   },
   {
    "q": "What is the amplitude of the calibration signal delivered to the amplifier input?",
    "choices": [
     "5.0 μV",
     "50 μV",
     "0.50 mV",
     "1.0 V"
    ],
    "ans": 1,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "The two resistors in series form a **voltage divider**. The same current flows through both:\nI = 1.0 V ÷ (200,000 Ω + 10 Ω) ≈ 1.0 V ÷ 2.0 × 10⁵ Ω = 5.0 × 10⁻⁶ A.\nThe voltage across the 10 Ω resistor is V = IR = 5.0 × 10⁻⁶ A × 10 Ω = 5.0 × 10⁻⁵ V = **50 μV**, which is the size of a typical alpha wave. The 100 MΩ amplifier input sits in parallel with only 10 Ω, so it draws almost no current and doesn't change the result.\n\n**5.0 μV** and **0.50 mV** are power-of-ten slips in 10/200,000 = 5 × 10⁻⁵.\n**1.0 V** is the voltage across the 200 kΩ resistor (essentially all of the source voltage), not the 10 Ω resistor.",
    "id": "p_cpx4_2_q2"
   },
   {
    "q": "The first three ionization energies of potassium are 419, 3052 and 4420 kJ/mol. Which statement best explains why the potassium in the electrode gel is present only as K⁺?",
    "choices": [
     "The second electron would come from the filled 3p core, which is held far more tightly.",
     "The second electron would come from the 4s subshell, which holds it more tightly once K⁺ forms.",
     "K⁺ has a half-filled outer subshell, which makes it especially stable toward further ionization.",
     "The first ionization energy exceeds the second, so only one electron can be removed in solution."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "gen_chem",
    "exp": "Potassium (Z = 19) is **[Ar]4s¹**. Its first electron comes from the 4s orbital, far from the nucleus and shielded by 18 core electrons, so IE₁ is low (419 kJ/mol). K⁺ is **[Ar]** (1s²2s²2p⁶3s²3p⁶). A second electron would come from **3p, a filled inner shell** closer to the nucleus and less shielded, so IE₂ jumps to 3052 kJ/mol, about 3052 ÷ 419 ≈ **7 times** IE₁. No chemical process in the gel supplies that energy, so potassium stays K⁺.\n\nPotassium has only **one** 4s electron, so no 4s electron remains after the first ionization.\nK⁺ has a **filled** (noble-gas) configuration, not a half-filled subshell.\nThe data show IE₁ is the smallest; successive ionization energies always increase.",
    "id": "p_cpx4_2_q3"
   },
   {
    "q": "The K⁺ and Cl⁻ ions in the electrode gel each have 18 electrons. Which statement correctly compares the two ions?",
    "choices": [
     "K⁺ is smaller, because its 19 protons attract the same number of electrons more strongly than 17 protons do.",
     "K⁺ is larger, because its outermost electrons occupy a higher principal energy level.",
     "Cl⁻ is smaller, because gaining an electron completes its valence shell.",
     "The two ions are the same size, because they have the same electron configuration."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "K⁺ and Cl⁻ are **isoelectronic**: both are 1s²2s²2p⁶3s²3p⁶ (like Ar). With identical electron arrangements, size is set by **nuclear charge**. K has 19 protons and Cl has 17, so K⁺ holds the same 18 electrons more tightly and is smaller (about 138 pm vs 181 pm).\n\nK⁺ has lost its 4s electron, so its outermost electrons are in n = 3, the same level as in Cl⁻.\nCompleting an octet doesn't shrink Cl⁻; adding an electron to Cl increases repulsion and makes the anion larger than the Cl atom.\nThe same configuration doesn't mean the same size, because the nuclear charges differ.",
    "id": "p_cpx4_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_3",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5A",
   "5E",
   "5C"
  ],
  "title": "Urine pH and the Dissolution of Uric Acid Stones",
  "passage": "Uric acid (C₅H₄N₄O₃, molar mass 168 g/mol) is the end product of purine breakdown in humans, who lack the enzyme urate oxidase that most other mammals use to degrade it further. An adult excretes about 3–4 mmol of uric acid in the urine each day. Uric acid is a weak diprotic acid (pKa1 = 5.4 and pKa2 ≈ 10.3 at 37°C). The neutral acid is poorly soluble in water, but its monoanion, urate, is far more soluble, so the total amount that can stay dissolved depends strongly on pH.\n\nAbout 10% of kidney stones are made of uric acid. Most people who form them excrete a normal amount of uric acid but have persistently acidic urine, often near pH 5. Because these stones are made of the neutral acid, they can often be dissolved without surgery by giving potassium citrate, which is metabolized to bicarbonate and raises urine pH. Calcium-containing stones do not dissolve this way.\n\nTo guide therapy, researchers measured the solubility of uric acid in synthetic urine. Excess crystalline uric acid was stirred for 48 hours in buffered solutions of constant ionic strength at 25°C or 37°C, the solid was filtered off, and the total dissolved uric acid (neutral acid plus urate) was measured by HPLC. The results are shown in Figure 1.\n\nThe uric acid crystals used in these experiments were prepared from a commercial sample. The sample was dissolved in 0.1 M NaOH, and a small amount of insoluble material was removed by filtration.",
  "figure": {
   "type": "line",
   "caption": "Figure 1 Total dissolved uric acid in synthetic urine as a function of pH",
   "x": {
    "label": "pH",
    "min": 4.5,
    "max": 6.5,
    "step": 0.5
   },
   "y": {
    "label": "Total dissolved uric acid (mM)",
    "min": 0,
    "max": 6,
    "step": 1
   },
   "series": [
    {
     "name": "37°C",
     "marker": "circle",
     "line": "smooth",
     "points": [
      [
       4.5,
       0.45
      ],
      [
       5.0,
       0.56
      ],
      [
       5.5,
       0.9
      ],
      [
       5.75,
       1.3
      ],
      [
       6.0,
       2.0
      ],
      [
       6.25,
       3.2
      ],
      [
       6.5,
       5.4
      ]
     ]
    },
    {
     "name": "25°C",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       4.5,
       0.23
      ],
      [
       5.0,
       0.28
      ],
      [
       5.5,
       0.45
      ],
      [
       5.75,
       0.65
      ],
      [
       6.0,
       1.0
      ],
      [
       6.25,
       1.6
      ],
      [
       6.5,
       2.7
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "A patient's urine contains 336 mg/L of total uric acid. Based on Figure 1, what is the lowest urine pH at which all of it would remain dissolved at body temperature?",
    "choices": [
     "5.4",
     "5.75",
     "6.0",
     "6.4"
    ],
    "ans": 2,
    "cat": "5A",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "First convert to molarity: 336 mg/L ÷ 168 g/mol = 0.336 g/L ÷ 168 g/mol = **2.0 × 10⁻³ M = 2.0 mM**. On the **37°C** curve, the total solubility reaches 2.0 mM at **pH 6.0**. Below that pH the urine is supersaturated and uric acid can crystallize; at or above it, 2.0 mM stays in solution.\n\n**5.4** is the pKa, where solubility is only about 0.8 mM.\n**5.75** is where the 37°C solubility is 1.3 mM, still too low.\n**6.4** is roughly where the **25°C** curve reaches 2.0 mM, but the question asks about body temperature.",
    "id": "p_cpx4_3_q1"
   },
   {
    "q": "At pH 6.4 and 37°C, approximately what percentage of the dissolved uric acid is present as the neutral (un-ionized) acid?",
    "choices": [
     "1%",
     "9%",
     "50%",
     "91%"
    ],
    "ans": 1,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Use the **Henderson–Hasselbalch equation** with pKa1 = 5.4 (the second ionization, pKa 10.3, is negligible here):\npH − pKa = log([urate]/[uric acid]) → 6.4 − 5.4 = 1, so [urate]/[uric acid] = 10¹ = **10 : 1**.\nThe neutral acid is 1 part out of 1 + 10 = 11 parts: 1/11 ≈ 0.09 = **9%**.\n\n**1%** counts the one-unit difference as a factor of 100 (a 1 : 100 ratio), which would be true two pH units above the pKa, at pH 7.4.\n**91%** is the fraction present as urate, the opposite species.\n**50%** would be true only at pH = pKa = 5.4.",
    "id": "p_cpx4_3_q2"
   },
   {
    "q": "Which statement about the dissolution of crystalline uric acid in synthetic urine is best supported by Figure 1?",
    "choices": [
     "It is endothermic, because more uric acid dissolves at 37°C than at 25°C.",
     "It is exothermic, because more uric acid dissolves at 37°C than at 25°C.",
     "It is endothermic, because the solubility increases as the pH increases.",
     "It is exothermic, because dissolving the crystal breaks hydrogen bonds between molecules."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "At every pH the **37°C curve lies above the 25°C curve** (about twice as high). By **Le Châtelier's principle**, if raising the temperature shifts the dissolution equilibrium toward dissolved product, heat behaves like a reactant: the process is **endothermic** (ΔH > 0).\n\nAn exothermic process would dissolve **less** at higher temperature, so the same observation can't support \"exothermic.\"\nThe rise with pH reflects conversion of the acid to the more soluble urate ion (acid–base chemistry), not the sign of ΔH.\nBreaking hydrogen bonds in the crystal **absorbs** energy; that would point toward endothermic, not exothermic.",
    "id": "p_cpx4_3_q3"
   },
   {
    "q": "After the insoluble material was removed from the NaOH solution, which step would best recover purified uric acid crystals from the filtrate?",
    "choices": [
     "Add HCl to bring the pH to about 3, cool the solution to 4°C, and collect the solid by filtration.",
     "Add HCl to bring the pH to about 3, heat the solution to 80°C, and collect the solid by filtration.",
     "Add more NaOH to bring the pH to about 13, cool the solution to 4°C, and collect the solid by filtration.",
     "Extract the filtrate with hexane and evaporate the hexane layer."
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "D",
    "exp": "In 0.1 M NaOH, uric acid is present as its soluble anion. To crystallize it, convert it back to the **poorly soluble neutral acid** and lower its solubility as far as possible. Figure 1 shows both levers: solubility falls as **pH drops** below the pKa (5.4) and as **temperature drops**. Acidifying to pH ≈ 3 (more than 2 units below pKa1, so >99% neutral) and cooling gives the most crystals, which are then collected by filtration.\n\nHeating to 80°C would keep more uric acid dissolved (dissolution is endothermic), lowering the yield.\nRaising the pH keeps it as the soluble anion, so little would crystallize.\nUrate is an ion and uric acid is very polar (many N–H and C=O groups), so neither moves into hexane.",
    "id": "p_cpx4_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_4",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4D"
  ],
  "title": "Classical Carbonyl Tests for Ketone Bodies",
  "passage": "When insulin is lacking, as in untreated type 1 diabetes, the liver converts fatty acids into ketone bodies faster than other tissues can use them. The main ketone bodies are acetoacetic acid (Compound 1) and (R)-3-hydroxybutanoic acid (Compound 2), which the liver interconverts with the NAD⁺-dependent enzyme 3-hydroxybutyrate dehydrogenase. The third ketone body, acetone (Compound 3), is present at a lower concentration; it is volatile, so it is exhaled and gives the breath a fruity odor. The interconversion of Compounds 1 and 2 is shown in Figure 1. In diabetic ketoacidosis, the blood concentration of Compound 2 is typically 3 to 4 times that of Compound 1.\n\nUrine dipsticks for ketones contain sodium nitroprusside, which forms a purple product with Compound 1 in alkaline solution, reacts only weakly with Compound 3 and does not react with Compound 2. A teaching laboratory compared the dipstick with three classical tests, using 10 mM solutions of each pure compound:\n1. 2,4-dinitrophenylhydrazine (2,4-DNP) in acid forms a yellow-to-orange hydrazone precipitate with aldehydes and ketones.\n2. Tollens' reagent, Ag(NH₃)₂⁺, oxidizes aldehydes and deposits a silver mirror on the glass.\n3. The iodoform test (I₂ in NaOH) gives a yellow precipitate of CHI₃ with compounds containing a CH₃C(=O)– group, or a CH₃CH(OH)– group that the reagent first oxidizes to one.\n\nCompounds 1 and 3 each gave a precipitate with 2,4-DNP and a positive iodoform test, whereas Compound 2 gave no precipitate with 2,4-DNP. None of the three compounds produced a silver mirror. The students also recorded an infrared spectrum of each compound.\n\nFinally, the students tested urine from a patient in ketoacidosis. The dipstick showed only a weak reaction, although the patient's blood ketone level was high.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Oxidation of Compound 2 to Compound 1",
    "parts": [
     "cpx4-r-3-hydroxybutanoic-acid",
     {
      "arrow": "NAD⁺ → NADH"
     },
     "cpx4-acetoacetic-acid"
    ]
   }
  ],
  "questions": [
   {
    "q": "Compound 2 contains a C=O group but gave no precipitate with 2,4-DNP. Which statement best explains this result?",
    "choices": [
     "Its only C=O group is part of a carboxylic acid, whose carbonyl carbon is made less electrophilic by resonance with the adjacent OH oxygen.",
     "Its secondary alcohol is oxidized by 2,4-DNP, which consumes the reagent before a precipitate can form.",
     "Its C=O group is too sterically hindered by the neighboring methyl group for 2,4-DNP to attack.",
     "It has no hydrogen atoms on the carbon next to its C=O group, so it cannot form a hydrazone."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "2,4-DNP is a nucleophile that adds to the C=O carbon of **aldehydes and ketones** and then loses water to give a hydrazone. Compound 2's only C=O is in a **carboxylic acid**. The lone pair on the attached OH oxygen is delocalized into the C=O (resonance), so that carbon is much **less electrophilic**, and carboxylic acids don't form hydrazones under these conditions. Compounds 1 and 3 have ketone C=O groups and react.\n\n2,4-DNP is not an oxidizing agent; it is a condensation reagent.\nThe C=O of Compound 2 is at C1, at the far end of the chain from the methyl group, and is not hindered.\nCompound 2 does have α-hydrogens (the CH₂ at C2), and in any case hydrazone formation does not require α-hydrogens (benzaldehyde, which has none, reacts readily).",
    "id": "p_cpx4_4_q1"
   },
   {
    "q": "Based on the passage, which compound would give a positive iodoform test but no precipitate with 2,4-DNP?",
    "choices": [
     "2-Propanol",
     "Acetone",
     "1-Propanol",
     "Propanal"
    ],
    "choiceFigs": [
     "cpx4-2-propanol",
     "acetone",
     "cpx4-1-propanol",
     "cpx4-propanal"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "A positive 2,4-DNP test needs an **aldehyde or ketone C=O**; a positive iodoform test needs **CH₃C(=O)–** or **CH₃CH(OH)–**. The compound must have the second without the first.\n\n**2-Propanol, CH₃CH(OH)CH₃**, has no C=O, so 2,4-DNP gives nothing. Its CH₃CH(OH)– unit is oxidized by I₂/NaOH to acetone, which then gives CHI₃: **positive iodoform**.\n\nAcetone is positive in **both** tests (it is a methyl ketone).\n1-Propanol (CH₃CH₂CH₂OH) has no C=O and its OH carbon carries no methyl group, so it is negative in both.\nPropanal (CH₃CH₂CHO) is an aldehyde, so it is positive with 2,4-DNP; its carbonyl carbon is bonded to an ethyl group rather than a methyl, so it is iodoform-negative.",
    "id": "p_cpx4_4_q2"
   },
   {
    "q": "Which feature of the infrared spectra would distinguish Compound 3 from Compound 2?",
    "choices": [
     "Compound 3 lacks the broad absorption between 2500 and 3300 cm⁻¹ that Compound 2 shows.",
     "Compound 3 lacks the strong absorption near 1715 cm⁻¹ that Compound 2 shows.",
     "Compound 3 shows a sharp absorption near 2250 cm⁻¹ that Compound 2 lacks.",
     "Compound 3 shows a strong absorption near 1650 cm⁻¹ for its C=C bond."
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "Compound 2 has a **carboxylic acid** (and an alcohol). The hydrogen-bonded acid O–H gives a very **broad band from about 2500 to 3300 cm⁻¹**, with the alcohol O–H near 3300 cm⁻¹. Acetone (Compound 3) has **no O–H**, so that region is clear except for C–H stretches near 2900 cm⁻¹.\n\nBoth compounds have a strong **C=O stretch near 1700–1715 cm⁻¹**, so that band doesn't tell them apart.\nA sharp band near 2250 cm⁻¹ is a C≡N (nitrile) or C≡C stretch; neither compound has one.\nAcetone has no C=C bond.",
    "id": "p_cpx4_4_q3"
   },
   {
    "q": "In the conversion of Compound 2 to Compound 1 shown in Figure 1, what happens to C3, the carbon that carries the OH group in Compound 2?",
    "choices": [
     "It is oxidized, because it loses its C–H bond and forms a second bond to oxygen as the secondary alcohol becomes a ketone.",
     "It is reduced, because it accepts a hydride ion from NAD⁺ as the secondary alcohol becomes a ketone.",
     "It is oxidized, because it becomes a carboxylic acid carbon as the primary alcohol is converted to an acid.",
     "It is unchanged, because only the hydrogen of the O–H group is removed and its bonds to oxygen stay the same."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "Assign C3's oxidation state by counting bonds: +1 for each bond to O, −1 for each bond to H, 0 for bonds to C.\nIn **Compound 2**, C3 is CH(OH): one bond to O and one to H, so its oxidation state is +1 − 1 = **0**.\nIn **Compound 1**, C3 is a ketone C=O carbon: two bonds to O and none to H, so it is **+2**.\nThe rise from 0 to +2 is a loss of **2 electrons**: C3 is **oxidized**, and a secondary alcohol becomes a ketone. The two electrons (with H⁺) go to NAD⁺, which is reduced to NADH, as Figure 1 shows.\n\nNAD⁺ is the hydride **acceptor**, not the donor; C3 gives up its hydrogen to NAD⁺, so C3 is not reduced.\nThe OH in Compound 2 is on a carbon bonded to two other carbons (a **secondary** alcohol), and the carboxylic acid at C1 is already present in both compounds.\nBoth the O–H hydrogen and the C–H hydrogen of C3 are removed, and C3 gains a second bond to oxygen (C–O becomes C=O), so its oxidation state changes.",
    "id": "p_cpx4_4_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_5",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4A",
   "4B",
   "4D"
  ],
  "title": "Ball–Head Collisions During Soccer Heading",
  "passage": "Repeated heading of the ball in soccer has raised concern about cumulative brain injury. In a laboratory study, a launcher fired a 0.40 kg soccer ball at the forehead of an instrumented crash-test head and neck. The ball's speed before and after impact was measured with a 24 GHz radar gun, which detects the Doppler shift of microwaves reflected from the moving ball. An accelerometer at the head's center of mass recorded peak acceleration, and contact time was measured from high-speed video. The results are shown in Table 1.\n\nIn a perfectly elastic collision, total kinetic energy is conserved. A ball striking a fixed, rigid wall elastically would rebound with its incoming speed. A real ball rebounds more slowly, because some energy is lost as the ball deforms and as the head and neck move. The ratio of rebound speed to incoming speed, the coefficient of restitution, ranged from 0.73 to 0.80 in these trials.\n\nThe brain is surrounded by cerebrospinal fluid (CSF, density 1.00 g/mL). An adult brain has a mass of about 1.45 kg and a volume of about 1.40 L, so it is slightly denser than CSF. When the skull accelerates suddenly, the brain lags behind. During an acceleration a, the fluid-filled skull behaves like a container of fluid in a gravitational field of strength a: pressure rises on the side nearest the impact and falls on the opposite side, with a pressure difference ΔP = ρad, where d is the length of the brain along the direction of acceleration (about 0.15 m from front to back). Such pressure gradients are thought to contribute to coup–contrecoup injuries.",
  "figure": {
   "caption": "Table 1 Ball–head impacts (ball mass 0.40 kg)",
   "columns": [
    "Trial",
    "Incoming speed (m/s)",
    "Rebound speed (m/s)",
    "Contact time (ms)",
    "Peak head acceleration (g)"
   ],
   "rows": [
    [
     "1",
     "6.0",
     "4.5",
     "11",
     "12"
    ],
    [
     "2",
     "10",
     "8.0",
     "9.0",
     "24"
    ],
    [
     "3",
     "15",
     "11",
     "8.0",
     "40"
    ]
   ]
  },
  "questions": [
   {
    "q": "What was the average force exerted by the head on the ball during Trial 2?",
    "choices": [
     "0.80 N",
     "89 N",
     "440 N",
     "800 N"
    ],
    "ans": 3,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "Average force equals **impulse ÷ time**, and impulse is the change in momentum. Velocity is a vector: the ball arrives at 10 m/s and leaves at 8.0 m/s in the **opposite** direction, so Δv = 10 − (−8.0) = **18 m/s**.\nΔp = 0.40 kg × 18 m/s = 7.2 kg·m/s; Δt = 9.0 ms = 9.0 × 10⁻³ s.\nF = 7.2 ÷ 0.0090 = **800 N**.\n\n**89 N** subtracts the speeds (10 − 8.0 = 2.0 m/s), ignoring the reversal of direction.\n**440 N** uses only the incoming momentum (0.40 × 10 = 4.0 kg·m/s), as if the ball stopped dead.\n**0.80 N** divides by 9.0 instead of 0.0090 s (ms not converted).",
    "id": "p_cpx4_5_q1"
   },
   {
    "q": "Treating the brain and CSF as a fluid of density 1.0 × 10³ kg/m³, what was the approximate pressure difference across the brain at the moment of peak acceleration in Trial 3? (Use g = 10 m/s².)",
    "choices": [
     "1.5 kPa",
     "6.0 kPa",
     "60 kPa",
     "600 kPa"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Use the passage's relation **ΔP = ρad**. Table 1 gives the peak acceleration in units of g, so convert: 40 g = 40 × 10 m/s² = **400 m/s²**. With d = 0.15 m:\nΔP = (1.0 × 10³ kg/m³)(400 m/s²)(0.15 m) = 6.0 × 10⁴ Pa = **60 kPa** (about 450 mmHg).\n\n**6.0 kPa** uses 40 m/s², forgetting that the table is in multiples of g.\n**1.5 kPa** is ρgd, the ordinary hydrostatic difference with the head at rest.\n**600 kPa** uses d = 1.5 instead of 0.15 m (a cm-to-m slip).",
    "id": "p_cpx4_5_q2"
   },
   {
    "q": "CSF reduces the net downward force that gravity exerts on the brain of a person standing still. According to Archimedes' principle, the upward buoyant force on the brain is equal to the:",
    "choices": [
     "weight of the CSF displaced by the brain.",
     "weight of the brain itself.",
     "mass of the CSF displaced by the brain.",
     "pressure of the CSF multiplied by the surface area of the brain."
    ],
    "ans": 0,
    "cat": "4B",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "**Archimedes' principle**: an immersed object feels an upward buoyant force equal to the **weight of the fluid it displaces**, F = ρ(fluid)Vg. For the brain: (1.00 kg/L)(1.40 L)(10 m/s²) = 14.0 N upward, against a weight of 1.45 kg × 10 m/s² = 14.5 N. The net downward force is only about **0.5 N**, so the brain is nearly weightless and doesn't press hard on the skull base.\n\nThe buoyant force equals the brain's weight only for an object that floats in equilibrium with no support, or that has the same density as the fluid; the brain is slightly denser.\nA mass is not a force; it has to be multiplied by g.\nThe buoyant force comes from the **difference** in pressure between the lower and upper surfaces, not from the pressure times the total area, which would point in every direction and cancel.",
    "id": "p_cpx4_5_q3"
   },
   {
    "q": "In Trial 2, what was the approximate frequency shift of the radar signal reflected from the incoming ball? (The speed of light is 3.0 × 10⁸ m/s.)",
    "choices": [
     "800 Hz",
     "1.6 kHz",
     "16 kHz",
     "1.4 GHz"
    ],
    "ans": 1,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "For a wave **reflected** from a moving object, the Doppler shift happens twice: the ball receives a shifted frequency and then re-emits it as a moving source. For v much less than c, **Δf ≈ 2vf/c**.\nΔf = 2 × 10 m/s × 2.4 × 10¹⁰ Hz ÷ 3.0 × 10⁸ m/s = 4.8 × 10¹¹ ÷ 3.0 × 10⁸ = 1.6 × 10³ Hz = **1.6 kHz**. The ball is approaching, so the returned frequency is higher.\n\n**800 Hz** is vf/c, a single shift that ignores the reflection.\n**16 kHz** is a power-of-ten slip in 24 GHz = 2.4 × 10¹⁰ Hz.\n**1.4 GHz** uses the speed of sound (340 m/s) instead of the speed of light; microwaves are electromagnetic waves.",
    "id": "p_cpx4_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx4_6",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4E",
   "5E"
  ],
  "title": "Redox Cycling of Vitamin K and Its Block by Warfarin",
  "passage": "Vitamin K is required for blood clotting. Its reduced (hydroquinone) form is the cofactor of γ-glutamyl carboxylase, an enzyme of the liver endoplasmic reticulum that adds CO₂ to the γ-carbon of specific glutamate (Glu) residues in prothrombin and several other clotting factors, producing γ-carboxyglutamate (Gla). Each Gla residue carries two carboxylate groups on the same carbon. Gla-containing clotting factors bind Ca²⁺ and, through it, the negatively charged phospholipid surfaces of activated platelets, where clotting reactions take place.\n\nIn each carboxylation, the hydroquinone is oxidized to vitamin K 2,3-epoxide. The enzyme vitamin K epoxide reductase (VKOR) reduces the epoxide back to the quinone and the quinone to the hydroquinone, so a small pool of vitamin K can be reused many times. The anticoagulant warfarin acts on this cycle, and patients taking it are told to keep their intake of green leafy vegetables, the main dietary source of vitamin K, consistent from week to week.\n\nNatural vitamins K1 and K2 carry long hydrophobic side chains. Researchers who study the redox chemistry of the shared ring system often use menadione (Compound 1), which lacks the side chain. In cells, the enzyme NQO1 transfers two electrons from NADH to Compound 1, producing menadiol (Compound 2), as shown in Figure 1. Standard reduction potentials at pH 7 (E°′) for related half-reactions are listed below.\n\nCompound 1 + 2H⁺ + 2e⁻ → Compound 2   E°′ = −0.02 V\nFAD + 2H⁺ + 2e⁻ → FADH₂   E°′ = −0.22 V\nNAD⁺ + H⁺ + 2e⁻ → NADH   E°′ = −0.32 V\n\nOther enzymes add only one electron to Compound 1, forming a semiquinone radical that passes the electron to O₂ to form superoxide and regenerates Compound 1. This redox cycling is why large doses of Compound 1 are toxic to cells.",
  "scheme": [
   {
    "after": 2,
    "caption": "Figure 1 Two-electron reduction of Compound 1 by NQO1",
    "parts": [
     "cpx4-menadione",
     {
      "arrow": "NADH + H⁺ → NAD⁺"
     },
     "cpx4-menadiol"
    ]
   }
  ],
  "questions": [
   {
    "q": "Gla residues allow clotting factors to bind to activated platelet membranes mainly because the two carboxylate groups on each Gla residue:",
    "choices": [
     "chelate Ca²⁺, which bridges the protein to negatively charged phospholipid head groups.",
     "form covalent ester bonds with the head groups of membrane phospholipids.",
     "make the side chain hydrophobic enough to insert into the core of the bilayer.",
     "are positively charged at pH 7.4 and bind phosphate groups directly."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "At pH 7.4, each carboxyl group (pKa ≈ 2–4) is deprotonated, so a Gla side chain carries **two negative charges on one carbon**, like malonate. Two carboxylates held this close **chelate Ca²⁺**. The bound Ca²⁺ ions are positive and bridge to the **negatively charged phospholipids** (such as phosphatidylserine) exposed on activated platelets. This is why the passage says the factors bind membranes \"through\" Ca²⁺, and why citrate or EDTA, which remove Ca²⁺, stop blood from clotting in a tube.\n\nNo ester bond forms; the binding is noncovalent and reversible.\nCharged carboxylates make the side chain more polar, not hydrophobic.\nCarboxylates are negative, not positive, at physiological pH; negative Gla and negative phosphates would repel without Ca²⁺.",
    "id": "p_cpx4_6_q1"
   },
   {
    "q": "When Compound 1 is reduced to Compound 2, how do the oxidation states of the two ring carbons bonded to oxygen change?",
    "choices": [
     "Each is reduced, from +2 to +1.",
     "Each is oxidized, from +1 to +2.",
     "Each is reduced, from +2 to 0.",
     "Each is reduced, from +1 to −1."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Count bonds to more electronegative atoms (+1 each), bonds to H (−1 each) and ignore C–C bonds.\nIn **Compound 1**, each of these carbons is a ketone C=O carbon: two bonds to O and two bonds to C, so its oxidation state is **+2**.\nIn **Compound 2**, each is a phenol carbon: one bond to O, and its other bonds go to ring carbons, so its oxidation state is **+1**.\nEach carbon gains one electron, and the two together account for the **2 e⁻** in the half-reaction: a **reduction**.\n\n\"Oxidized, +1 to +2\" describes the reverse reaction (hydroquinone → quinone).\n**+2 to 0** would mean each carbon gained two electrons (4 e⁻ in all), twice the 2 e⁻ shown in the half-reaction.\n**+1 to −1** starts from the wrong value for a carbonyl carbon.",
    "id": "p_cpx4_6_q2"
   },
   {
    "q": "What is ΔG°′ for the reduction of Compound 1 by NADH under standard conditions at pH 7? (F = 96,500 C/mol)",
    "choices": [
     "+58 kJ/mol",
     "−29 kJ/mol",
     "−39 kJ/mol",
     "−58 kJ/mol"
    ],
    "ans": 3,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "NADH is oxidized (anode) and Compound 1 is reduced (cathode):\nE°′ = E°′(cathode) − E°′(anode) = −0.02 V − (−0.32 V) = **+0.30 V**.\nTwo electrons are transferred (n = 2), so\nΔG°′ = −nFE°′ = −2 × 96,500 C/mol × 0.30 V = −57,900 J/mol ≈ **−58 kJ/mol**. The negative value means NADH can drive this reduction, as NQO1 does.\n\n**+58 kJ/mol** has the sign reversed (positive E°′ means negative ΔG°′).\n**−29 kJ/mol** uses n = 1.\n**−39 kJ/mol** uses the FAD potential as the anode instead of NADH: −0.02 − (−0.22) = 0.20 V, and 2 × 96,500 × 0.20 ≈ 38,600 J/mol.",
    "id": "p_cpx4_6_q3"
   },
   {
    "q": "Which experiment would best show that warfarin inhibits VKOR rather than γ-glutamyl carboxylase?",
    "choices": [
     "Supply the hydroquinone form of vitamin K directly to warfarin-treated liver microsomes and measure whether Gla formation continues.",
     "Supply vitamin K 2,3-epoxide to warfarin-treated liver microsomes and measure whether Gla formation continues.",
     "Measure the clotting time of blood from patients before and after they begin taking warfarin.",
     "Add a larger amount of Glu-containing peptide substrate to warfarin-treated liver microsomes and measure Gla formation."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "X",
    "exp": "The two hypotheses make **different predictions** only if the experiment **bypasses VKOR**. The carboxylase needs only the hydroquinone. If you supply the hydroquinone directly:\n• If warfarin blocks **VKOR**, the carboxylase still has its cofactor, so **Gla formation continues**.\n• If warfarin blocks the **carboxylase**, Gla formation stays blocked.\n\nStarting from the epoxide requires VKOR to make the hydroquinone, so carboxylation would fail under **both** hypotheses.\nLonger clotting times show that warfarin works, not which enzyme it inhibits.\nAdding more Glu substrate doesn't separate the two steps either; without the reduced cofactor, carboxylation fails whichever enzyme is blocked.",
    "id": "p_cpx4_6_q4"
   }
  ]
 },
 {
  "id": "p_cpx5_1",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "4C",
   "5A"
  ],
  "title": "Hyperkalemia and the Resting Potential of Ventricular Myocytes",
  "passage": "The resting membrane potential of a ventricular myocyte is about −85 mV. It is set mainly by K⁺, which leaks out of the cell through inward-rectifier K⁺ channels that stay open at rest. The concentration gradients themselves are maintained by the Na⁺/K⁺-ATPase, which uses the energy of ATP hydrolysis to move Na⁺ and K⁺ against their gradients. For an ion that is the only one able to cross the membrane, the equilibrium (Nernst) potential at 37°C is given by Equation 1, where z is the charge of the ion.\n\nE = (61 mV / z) log([ion]out / [ion]in)\nEquation 1\n\nIn hyperkalemia, plasma [K⁺] rises above the normal range of 3.5–5.0 mM. Mild hyperkalemia depolarizes myocytes and makes them more excitable, but severe hyperkalemia (above about 7 mM) holds the membrane depolarized long enough to inactivate voltage-gated Na⁺ channels, which slows conduction and can cause fatal arrhythmias.\n\nTo study this, researchers isolated ventricular myocytes from rat hearts and recorded the resting potential with whole-cell patch-clamp electrodes at 37°C. The pipette (intracellular) solution contained 140 mM K⁺ and 10 mM Na⁺. The bath (extracellular) solution contained 140 mM Na⁺, 2.0 mM Ca²⁺ and K⁺ at 2, 4, 8, 16 or 32 mM; each higher K⁺ concentration was made by adding solid KCl to a stock bath. Figure 1 compares the measured resting potentials with the values that Equation 1 predicts for K⁺.\n\nAt the three highest K⁺ concentrations, the measured values matched the prediction within 3 mV and changed by about 60 mV for each tenfold increase in [K⁺]out.",
  "figure": {
   "type": "line",
   "caption": "Figure 1 Resting potential of rat ventricular myocytes vs extracellular K⁺ (37°C; [K⁺]in = 140 mM)",
   "x": {
    "label": "log₁₀([K⁺]out in mM)",
    "min": 0,
    "max": 2,
    "step": 0.5
   },
   "y": {
    "label": "Membrane potential (mV)",
    "min": -120,
    "max": 0,
    "step": 20
   },
   "series": [
    {
     "name": "Nernst prediction for K⁺",
     "marker": "circle-open",
     "line": "smooth",
     "points": [
      [
       0.3,
       -113
      ],
      [
       0.6,
       -94
      ],
      [
       0.9,
       -76
      ],
      [
       1.2,
       -57
      ],
      [
       1.51,
       -39
      ]
     ]
    },
    {
     "name": "Measured resting potential",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       0.3,
       -88
      ],
      [
       0.6,
       -86
      ],
      [
       0.9,
       -73
      ],
      [
       1.2,
       -56
      ],
      [
       1.51,
       -39
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "Which statement correctly describes the transporter that maintains the K⁺ gradient described in the passage?",
    "choices": [
     "It moves 3 Na⁺ out and 2 K⁺ in for each ATP hydrolyzed, so it carries net positive charge out of the cell.",
     "It moves 2 Na⁺ out and 3 K⁺ in for each ATP hydrolyzed, so it carries net positive charge into the cell.",
     "It moves Na⁺ and K⁺ down their gradients without using ATP, so it is a form of facilitated diffusion.",
     "It uses the Na⁺ gradient to drive K⁺ into the cell, so it is a form of secondary active transport."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "biochemistry",
    "exp": "The Na⁺/K⁺-ATPase is **primary active transport**: each cycle hydrolyzes one ATP and pumps **3 Na⁺ out and 2 K⁺ in**. Three positive charges leave for every two that enter, so the pump is **electrogenic** and makes the inside slightly more negative.\n\nThe 2 Na⁺/3 K⁺ version reverses the stoichiometry.\nFacilitated diffusion moves ions down their gradients; this pump moves both ions against them, which is why it needs ATP.\nSecondary active transport (such as the Na⁺/glucose cotransporter) uses an existing Na⁺ gradient instead of ATP; the Na⁺/K⁺-ATPase is what creates that gradient.",
    "id": "p_cpx5_1_q1"
   },
   {
    "q": "According to Equation 1, when [K⁺]out rises from 4 mM to 8 mM, how does the K⁺ equilibrium potential change? (Use log 2 = 0.30.)",
    "choices": [
     "It becomes about 18 mV more negative.",
     "It becomes about 9 mV less negative.",
     "It becomes about 18 mV less negative.",
     "It becomes about 42 mV less negative."
    ],
    "ans": 2,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Only [K⁺]out changes, so the change in E is (61 mV/z) × log(8/4). For K⁺, z = +1: ΔE = 61 mV × log 2 = 61 × 0.30 ≈ **+18 mV**. A positive change from a negative starting value (−94 mV → −76 mV) means E_K becomes **18 mV less negative** (depolarized). This matches Figure 1: the Nernst points at log[K⁺]out = 0.60 and 0.90 differ by 18 mV.\n\n**More negative** gets the sign backward: raising [K⁺]out shrinks the outward gradient, so less negative voltage is needed to balance it.\n**9 mV** divides by z = 2, as for Ca²⁺; K⁺ has z = +1.\n**42 mV** uses ln 2 (0.69) instead of log 2 (61 × 0.69 ≈ 42); the 61 mV factor already includes the conversion to base-10 logs.",
    "id": "p_cpx5_1_q2"
   },
   {
    "q": "In Figure 1, at [K⁺]out of 2 mM and 4 mM, the measured resting potential is less negative than the Nernst prediction for K⁺. Which explanation is best supported?",
    "choices": [
     "The membrane is slightly permeable to Na⁺, and the inward Na⁺ leak pulls the potential toward the positive Na⁺ equilibrium potential.",
     "The membrane is slightly permeable to Cl⁻, and the Cl⁻ leak pulls the potential below the K⁺ equilibrium potential.",
     "The K⁺ equilibrium potential becomes less negative as [K⁺]out decreases, so the cell follows it.",
     "The membrane is impermeable to K⁺ at every concentration tested, so the potential does not depend on [K⁺]out."
    ],
    "ans": 0,
    "cat": "4C",
    "skill": "SIRS 4",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "A real membrane potential is a weighted average of the equilibrium potentials of all the ions that can cross. With 140 mM Na⁺ outside and 10 mM inside, E_Na = 61 × log 14 ≈ **+70 mV**. A **small Na⁺ leak** pulls the potential up from E_K toward E_Na. At high [K⁺]out, K⁺ dominates and the points sit on the Nernst line; at low [K⁺]out the K⁺ term weakens, so the same Na⁺ leak shifts the potential more (−88 mV measured vs −113 mV predicted at 2 mM).\n\nA Cl⁻ leak below E_K would make the measured values **more** negative than predicted, the opposite of the data.\nThe Nernst line in Figure 1 becomes **more** negative as [K⁺]out falls, not less.\nIf the membrane were impermeable to K⁺, the measured line would be flat; instead it tracks the prediction with a slope near 60 mV per tenfold change at high [K⁺]out.",
    "id": "p_cpx5_1_q3"
   },
   {
    "q": "A technician has 500 mL of bath solution containing 4.0 mM K⁺. What mass of KCl (molar mass 74.5 g/mol) must be added to raise [K⁺] to 8.0 mM? (Assume the volume does not change.)",
    "choices": [
     "0.15 g",
     "0.30 g",
     "0.60 g",
     "1.5 g"
    ],
    "ans": 0,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Only the **increase** in concentration has to come from added KCl: 8.0 − 4.0 = 4.0 mM. Moles needed = 4.0 × 10⁻³ mol/L × 0.500 L = 2.0 × 10⁻³ mol. Mass = 2.0 × 10⁻³ mol × 74.5 g/mol = 0.149 g ≈ **0.15 g**. Each KCl gives one K⁺, so moles of KCl = moles of K⁺.\n\n**0.30 g** uses the final 8.0 mM instead of the 4.0 mM increase, ignoring the K⁺ already present.\n**0.60 g** uses 8.0 mM and also treats the volume as 1 L.\n**1.5 g** is a factor-of-10 slip in the mL → L or mM → M conversion.",
    "id": "p_cpx5_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx5_2",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4E",
   "4B",
   "4D"
  ],
  "title": "Monitoring Serum Lithium by Flame Atomic Emission",
  "passage": "Lithium carbonate is a mood stabilizer used to treat bipolar disorder, but its therapeutic window is narrow: a serum Li⁺ concentration of 0.6–1.2 mM is effective, and toxicity becomes likely above about 1.5 mM. Many hospital laboratories therefore measure serum lithium by flame atomic emission. A diluted serum sample is sprayed as a fine mist into an air–acetylene flame at about 2100°C. In the flame, the water evaporates, the salts break apart into free atoms, and collisions with hot gas molecules promote some of the atoms' valence electrons to higher energy levels.\n\nWhen an excited electron drops back to a lower level, the atom emits a photon whose energy equals the difference between the two levels. Each element therefore emits light at a few characteristic wavelengths; the strongest line of each element found in serum is listed in Table 1. Photon energy E and wavelength λ are related by E = hc/λ, where hc ≈ 1240 eV·nm. An optical filter placed in front of a photodetector passes the lithium emission, and the detector signal is proportional to the number of photons per second that reach it. Because the fraction of atoms that are excited is constant at a fixed flame temperature, the signal is proportional to the lithium concentration and is calibrated with lithium standards.\n\nThe flame temperature must be held steady. A hotter flame excites more atoms, but it also ionizes more of them, and an ion does not emit at the lines of the neutral atom. Potassium, which has the lowest ionization energy in Table 1, is the element most affected. Sodium poses a different problem: its emission is very bright, and serum contains more than 100 times as much sodium as lithium, so even a small fraction of the sodium light reaching the detector would distort the lithium result.",
  "figure": {
   "caption": "Table 1 Emission and ionization data for elements in serum",
   "columns": [
    "Element",
    "Strongest emission line (nm)",
    "First ionization energy (eV)",
    "Typical serum concentration (mM)"
   ],
   "rows": [
    [
     "Lithium",
     "671",
     "5.39",
     "0.6–1.2 (on therapy)"
    ],
    [
     "Sodium",
     "589",
     "5.14",
     "135–145"
    ],
    [
     "Potassium",
     "766",
     "4.34",
     "3.5–5.0"
    ],
    [
     "Calcium",
     "423",
     "6.11",
     "2.2–2.6"
    ]
   ]
  },
  "questions": [
   {
    "q": "A lithium atom in the flame has an electron in the excited level whose decay to the ground state produces the 671 nm line. Approximately how much more energy must this atom absorb to lose that electron?",
    "choices": [
     "1.8 eV",
     "3.5 eV",
     "5.4 eV",
     "7.2 eV"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "physics",
    "exp": "The 671 nm photon carries the energy difference between the excited level and the ground state: **E = hc/λ** = 1240 eV·nm ÷ 671 nm ≈ **1.85 eV**. So the excited electron already sits 1.85 eV above the ground state. The first ionization energy, **5.39 eV** (Table 1), is measured from the **ground state**, so the extra energy needed from the excited level is 5.39 − 1.85 ≈ **3.5 eV**.\n\n**1.8 eV** is the photon energy itself, the energy already absorbed, not the energy still needed.\n**5.4 eV** is the ground-state ionization energy; it ignores that the electron has already been raised 1.85 eV.\n**7.2 eV** adds the two energies (5.39 + 1.85) instead of subtracting.",
    "id": "p_cpx5_2_q1"
   },
   {
    "q": "Nitrogen in the air drawn into the burner, which does not react, is heated from 17°C to about 2047°C at constant atmospheric pressure. Treating the nitrogen as an ideal gas, by what factor does the volume of a given amount of it increase?",
    "choices": [
     "0.13",
     "2.8",
     "8.0",
     "120"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "For a fixed amount of ideal gas at constant pressure, PV = nRT gives **V ∝ T**, with T in **kelvins**. T₁ = 17 + 273 = 290 K and T₂ = 2047 + 273 = 2320 K, so V₂/V₁ = 2320 ÷ 290 = **8.0**.\n\n**120** divides the Celsius temperatures (2047 ÷ 17 ≈ 120); gas laws need absolute temperature.\n**0.13** inverts the ratio (290 ÷ 2320 = 1/8): heating a gas at constant pressure makes it expand, not shrink.\n**2.8** is √8, the factor by which the molecules' rms speed rises, not the volume.",
    "id": "p_cpx5_2_q2"
   },
   {
    "q": "A laboratory will measure lithium in patients whose serum sodium, potassium and calcium are normal. Which filter placed in front of the detector would best isolate the lithium signal?",
    "choices": [
     "One that transmits only photons with energies of 1.80 to 1.90 eV",
     "One that transmits only photons with energies of 2.00 to 2.20 eV",
     "One that transmits only light with wavelengths longer than 650 nm",
     "One that transmits only light with wavelengths shorter than 700 nm"
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 3",
    "diff": "X",
    "subj": "physics",
    "exp": "The filter must pass the **671 nm lithium line** and block the sodium (589 nm), potassium (766 nm) and calcium (423 nm) lines. Convert with **λ = hc/E**: a 1.80–1.90 eV window is 1240/1.90 ≈ 653 nm to 1240/1.80 ≈ 689 nm, which contains 671 nm and none of the others (sodium photons carry 1240/589 ≈ 2.1 eV, potassium photons 1240/766 ≈ 1.6 eV). This matters most for sodium, which is over 100 times as concentrated as lithium.\n\nThe **2.00–2.20 eV** window is about 564–620 nm: it passes the sodium line and blocks lithium, the opposite of what is needed.\nPassing **everything longer than 650 nm** also lets the 766 nm potassium line through, and potassium is several times as concentrated as lithium.\nPassing **everything shorter than 700 nm** lets the bright 589 nm sodium line and the 423 nm calcium line through.",
    "id": "p_cpx5_2_q3"
   },
   {
    "q": "Why does each element in the flame emit light only at a few sharp, characteristic wavelengths rather than over a continuous range?",
    "choices": [
     "Its electrons can occupy only certain energy levels, so only certain gaps exist.",
     "Its nucleus emits the light, and each kind of nucleus has one fixed energy level.",
     "The flame gives every atom the same energy, and each atom emits that energy.",
     "Its atoms absorb all other wavelengths, so only the characteristic ones escape."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Electron energies in an atom are **quantized**: electrons can occupy only certain energy levels, whose spacing depends on the element's nuclear charge and electron arrangement. An emitted photon carries exactly the energy difference between two levels, and **E = hc/λ** turns each allowed difference into one wavelength. So each element shows a set of sharp lines (a line spectrum) that serves as its fingerprint, such as 671 nm for lithium and 589 nm for sodium.\n\nThe nucleus is not involved; these lines come from **electron** transitions, and nuclear transitions give gamma rays, not visible light.\nIf the flame set a single photon energy, every element would emit the same wavelength, but the lines in Table 1 differ.\nThe atoms have no transitions at those energies, so they neither absorb nor emit them.",
    "id": "p_cpx5_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx5_3",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5A",
   "5D",
   "5C",
   "5B"
  ],
  "title": "Buffered Nicotine Lozenges and Absorption Through the Oral Mucosa",
  "passage": "Nicotine (Compound 1) is absorbed poorly from the acidic stomach, so nicotine replacement lozenges are designed to release the drug in the mouth, where it can cross the oral mucosa directly into the systemic circulation and avoid first-pass metabolism in the liver. Only the neutral (free-base) form crosses the lipid-rich epithelium efficiently. Compound 1 has two basic nitrogen atoms: the nitrogen of the N-methylpyrrolidine ring (pKa of its conjugate acid = 8.0) and the nitrogen of the pyridine ring (pKa of its conjugate acid = 3.1). Its molar mass is 162 g/mol.\n\nNicotine that reaches the liver is oxidized, mainly by cytochrome P450 2A6 (CYP2A6), to cotinine (Compound 2), as shown in Figure 1. Cotinine has a half-life of about 16 h, compared with about 2 h for nicotine, so it is measured in saliva or urine as a marker of tobacco exposure.\n\nTo test whether raising saliva pH improves absorption, researchers gave 12 adult smokers, after overnight abstinence, either a 4 mg nicotine lozenge buffered with sodium carbonate and sodium bicarbonate or an otherwise identical unbuffered lozenge, in a randomized crossover design with a 1-week washout. While the lozenge dissolved, saliva pH averaged 9.0 with the buffered lozenge and 6.5 with the unbuffered one. Peak plasma nicotine was 11 ng/mL at 30 min with the buffered lozenge and 6 ng/mL at 60 min with the unbuffered lozenge.\n\nSaliva was also collected every 5 min. Each sample was adjusted to a chosen pH, extracted with dichloromethane, and analyzed by gas chromatography to measure the nicotine that remained in the mouth.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Oxidation of nicotine (Compound 1) to cotinine (Compound 2)",
    "parts": [
     "cpx5-nicotine",
     {
      "arrow": "CYP2A6, O₂, NADPH"
     },
     "cpx5-cotinine"
    ]
   }
  ],
  "questions": [
   {
    "q": "With the buffered lozenge, approximately what percentage of the nicotine in saliva is in the neutral form?",
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
    "subj": "gen_chem",
    "exp": "Saliva pH with the buffered lozenge is 9.0. The relevant group is the pyrrolidine nitrogen (pKa 8.0); the pyridine nitrogen (pKa 3.1) is fully neutral at pH 9. By **Henderson–Hasselbalch** for a base: pH = pKa + log([B]/[BH⁺]), so 9.0 = 8.0 + log([B]/[BH⁺]) and [B]/[BH⁺] = 10. Neutral fraction = 10/(10 + 1) = 10/11 ≈ **91%**.\n\n**9%** inverts the ratio (1/11), as if the pH were 1 unit **below** the pKa.\n**50%** is the fraction only when pH = pKa.\n**99%** treats a 1-unit difference as a 100-fold ratio; 99% neutral would need pH 10.",
    "id": "p_cpx5_3_q1"
   },
   {
    "q": "Nicotine that is swallowed reaches gastric fluid at pH 2.0. Which species is the predominant form of Compound 1 there?",
    "choices": [
     "Neutral nicotine",
     "Nicotine protonated only on the pyrrolidine nitrogen",
     "Nicotine protonated only on the pyridine nitrogen",
     "Nicotine protonated on both nitrogens"
    ],
    "choiceFigs": [
     "cpx5-nicotine",
     "cpx5-nicotine-pyrrolidinium",
     "cpx5-nicotine-pyridinium",
     "cpx5-nicotine-dication"
    ],
    "ans": 3,
    "cat": "5D",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "organic_chem",
    "exp": "A basic site is mostly protonated whenever the **pH is below the pKa of its conjugate acid**. At pH 2.0, both sites qualify: the pyrrolidine nitrogen (pKa 8.0, 6 units above) is essentially fully protonated, and the pyridine nitrogen (pKa 3.1, 1.1 units above) is protonated by a ratio of about 10¹·¹ ≈ 13 : 1 (about 93%). So the major species is the **dication**, which is why nicotine is absorbed so poorly from the stomach.\n\nThe neutral form predominates only above pH 8.0.\nThe pyrrolidinium monocation is the main form between pH 3.1 and 8.0, for example in unbuffered saliva at pH 6.5, but at pH 2.0 the pyridine nitrogen is also protonated.\nThe pyridinium-only monocation is never the major form, because the pyridine nitrogen is the **weaker** base (lower pKa) and protonates last.",
    "id": "p_cpx5_3_q2"
   },
   {
    "q": "To extract the largest amount of nicotine from saliva samples into dichloromethane, to what pH should the researchers adjust each sample before extraction?",
    "choices": [
     "pH 2, so that nicotine is fully protonated and partitions into the organic layer",
     "pH 6, so that nicotine is mostly protonated and partitions into the organic layer",
     "pH 8, so that nicotine is half protonated and partitions equally between the layers",
     "pH 11, so that nicotine is mostly neutral and partitions into the organic layer"
    ],
    "ans": 3,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "In a liquid–liquid extraction, **charged species stay in water** and **neutral organic molecules move into the organic solvent**. To pull an amine into dichloromethane, make the aqueous layer **basic**, at least 2–3 units above the pKa of its conjugate acid (8.0). At pH 11, [B]/[BH⁺] = 10³, so more than 99.9% of nicotine is neutral and partitions into the organic layer.\n\nAt pH 2 and pH 6, nicotine is mostly cationic, so it stays in water; ions do not partition well into dichloromethane.\nAt pH 8, only half is neutral, so recovery would be poor; it is not true that the two forms split evenly between the layers.",
    "id": "p_cpx5_3_q3"
   },
   {
    "q": "What is the hybridization of the pyridine nitrogen in Compound 1, and where is its lone pair?",
    "choices": [
     "sp², with the lone pair in an sp² orbital in the plane of the ring, not part of the aromatic π system",
     "sp², with the lone pair in a p orbital that is part of the aromatic π system",
     "sp³, with the lone pair in an sp³ orbital, like the pyrrolidine nitrogen",
     "sp, with the lone pair in an sp orbital pointing away from the ring"
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "The pyridine nitrogen forms one double bond within the ring, so it is **sp²**. Its p orbital holds one electron that is part of the 6-electron aromatic π system, and its **lone pair sits in an sp² orbital in the plane of the ring**, pointing outward. Because that lone pair is not needed for aromaticity, it can accept a proton. It is a weaker base (pKa 3.1) than the sp³ pyrrolidine nitrogen (pKa 8.0) because an sp² orbital has more s character and holds the electrons closer to the nucleus.\n\nA lone pair in the π system describes **pyrrole**, whose nitrogen has no double bond in the ring.\nsp³ describes the pyrrolidine nitrogen, which has only single bonds.\nsp hybridization requires a triple bond or two double bonds at the atom, as in a nitrile.",
    "id": "p_cpx5_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx5_4",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5E",
   "5D",
   "5B"
  ],
  "title": "Kinetic and Thermodynamic Enolates in a Crossed Aldol Reaction",
  "passage": "Many steroid and terpene drugs contain a quaternary carbon, a carbon bonded to four other carbons. One way to build such a center is a crossed aldol reaction between an unsymmetrical ketone and an aldehyde that has no α-hydrogens. A strong base removes an α-hydrogen from the ketone to give an enolate, which then adds to the aldehyde's carbonyl carbon. When the ketone has two different α-carbons, two enolates are possible, and the product depends on which enolate is present when the aldehyde is added.\n\nResearchers treated 2-methylcyclohexanone (Compound 1) with lithium diisopropylamide (LDA), a strong, bulky base, in tetrahydrofuran at −78°C. Removing a hydrogen from C-6 gives enolate 2; removing the hydrogen on C-2, the carbon that bears the methyl group, gives enolate 3 (Figure 1). Each enolate solution was held as listed in Table 1, cooled to −78°C, where the enolates interconvert only very slowly, and treated with 1.0 equivalent of benzaldehyde, which converts enolates 2 and 3 into Compounds 4 and 5, respectively (Figures 2 and 3). The reaction was quenched with aqueous NH₄Cl after 1 min. Under these conditions each enolate adds to benzaldehyde within seconds and the aldol products do not interconvert, so the ratio of Compound 4 to Compound 5, measured by ¹H NMR spectroscopy, equals the ratio of enolate 2 to enolate 3 at the moment benzaldehyde was added.\n\nIn some trials slightly less than 1 equivalent of LDA was used, so that a little Compound 1 remained; the small shift seen in Trial 3 occurs while the enolates are forming. A ketone molecule can pass an α-hydrogen to an enolate, so traces of ketone allow one enolate to be converted into the other by way of Compound 1.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Formation of enolates 2 and 3 from Compound 1",
    "parts": [
     "cpx5-2-methylcyclohexanone",
     {
      "arrow": "LDA, THF, −78°C"
     },
     "cpx5-enolate-less-sub",
     "+",
     "cpx5-enolate-more-sub"
    ]
   },
   {
    "after": 1,
    "caption": "Figure 2 Aldol addition of enolate 2 to benzaldehyde, giving Compound 4",
    "parts": [
     "cpx5-enolate-less-sub",
     "+",
     "cpx5-benzaldehyde",
     {
      "arrow": "1. −78°C, 1 min  2. NH₄Cl, H₂O"
     },
     "cpx5-aldol-c6"
    ]
   },
   {
    "after": 1,
    "caption": "Figure 3 Aldol addition of enolate 3 to benzaldehyde, giving Compound 5",
    "parts": [
     "cpx5-enolate-more-sub",
     "+",
     "cpx5-benzaldehyde",
     {
      "arrow": "1. −78°C, 1 min  2. NH₄Cl, H₂O"
     },
     "cpx5-aldol-c2"
    ]
   }
  ],
  "questions": [
   {
    "q": "Assume the enolates reached equilibrium at 0°C in the trials whose product ratio had stopped changing. What is the equilibrium constant at 0°C for the conversion of enolate 3 into enolate 2, and what is the sign of ΔG° for this conversion?",
    "choices": [
     "0.11; positive",
     "0.10; positive",
     "0.11; negative",
     "9.0; negative"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "The ratio stops changing between Trials 5 and 6 (24 h and 48 h at 0°C), so those trials show the **equilibrium** mixture: 4 : 5 = 10 : 90, which equals enolate 2 : enolate 3. For **3 ⇌ 2**, K = [2]/[3] = 10/90 = **0.11**. Because K < 1, ln K < 0, and **ΔG° = −RT ln K is positive** (about +5 kJ/mol: RT ln 9 ≈ 2.27 kJ/mol × 2.2). The conversion of 3 into 2 is uphill; enolate 3 is the more stable enolate.\n\n**0.10; positive** divides by the total (10/100), a mole fraction, instead of dividing product by reactant (10/90).\n**0.11; negative** gets K right but the sign wrong: K < 1 always means ΔG° > 0.\n**9.0; negative** is K for the reverse direction, 2 ⇌ 3 (90/10), not for the conversion asked about.",
    "id": "p_cpx5_4_q1"
   },
   {
    "q": "How many chirality centers are in Compound 4 and in Compound 5?",
    "choices": [
     "Compound 4: three; Compound 5: two",
     "Compound 4: two; Compound 5: one",
     "Compound 4: three; Compound 5: one",
     "Compound 4: two; Compound 5: two"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "A chirality center is an sp³ carbon bonded to **four different groups**; it does not need to carry a hydrogen.\n**Compound 4** has three: ring C-2 (H, CH₃, the C=O carbon, ring CH₂), ring C-6 (H, the CH(OH)Ph group, the C=O carbon, ring CH₂) and the new **carbinol carbon** (H, OH, phenyl, ring C-6).\n**Compound 5** has two: the **quaternary** ring C-2 (CH₃, CH(OH)Ph, the C=O carbon, ring CH₂) and the carbinol carbon (H, OH, phenyl, ring C-2).\n\n**Two and one** misses the carbinol carbon that the aldol step creates in both products.\n**Three and one** skips the quaternary C-2 of Compound 5 because it has no hydrogen, but its four carbon groups are all different.\n**Two and two** misses one ring carbon of Compound 4: C-2 and C-6 each carry a different substituent, so the ring has no internal symmetry.",
    "id": "p_cpx5_4_q2"
   },
   {
    "q": "Which trials give a ratio of Compound 4 to Compound 5 that reflects the relative stabilities of enolates 2 and 3?",
    "choices": [
     "Trials 1 and 2",
     "Trials 3 and 4",
     "Trials 5 and 6",
     "Trials 4, 5 and 6"
    ],
    "ans": 2,
    "cat": "5B",
    "skill": "SIRS 4",
    "diff": "X",
    "subj": "organic_chem",
    "exp": "A ratio reflects relative **stability** only under **thermodynamic control**, when the enolates can interconvert and have reached **equilibrium**. Two conditions must hold: some Compound 1 must be present to shuttle protons (0.90 equiv LDA), and the ratio must have **stopped changing**. Trials 5 and 6 (24 h and 48 h at 0°C) both give **10 : 90**, so equilibrium has been reached and the more substituted enolate 3, with the more substituted C=C, is the more stable one.\n\n**Trials 1 and 2** used excess LDA, so no ketone was left to interconvert the enolates; even 4 h at 0°C left the ratio at 97 : 3. This is **kinetic control**: the bulky base removes the less hindered C-6 hydrogen faster, so the ratio shows which enolate **forms faster**.\n**Trials 3 and 4** are mostly kinetic (Trial 3) or still changing (Trial 4, 30 : 70).\n**Trials 4, 5 and 6** include Trial 4, whose ratio kept shifting afterward, so it had not reached equilibrium.",
    "id": "p_cpx5_4_q3"
   },
   {
    "q": "What is the relationship between Compound 4 and Compound 5?",
    "choices": [
     "They are constitutional isomers, because the new C–C bond is to a different ring carbon.",
     "They are diastereomers, because they differ in configuration at only some stereocenters.",
     "They are enantiomers, because they are nonsuperimposable mirror images of each other.",
     "They are conformers, because they interconvert by rotation about single bonds."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "Both products have the formula **C₁₄H₁₈O₂** (C₇H₁₂O from Compound 1 plus C₇H₆O from benzaldehyde, with no atoms lost). In Compound 4 the CH(OH)Ph group is bonded to ring C-6, which also carries an H; in Compound 5 it is bonded to C-2, the carbon that also carries the methyl group. Same formula, **different connectivity**: they are **constitutional isomers**.\n\nDiastereomers and enantiomers are stereoisomers, which must have the **same connectivity**; these two do not.\nConformers differ only by rotation about single bonds; turning one of these products into the other would require breaking and re-forming C–C bonds.",
    "id": "p_cpx5_4_q4"
   }
  ],
  "figure": {
   "caption": "Table 1 Aldol products from Compound 1 under different enolate conditions",
   "columns": [
    "Trial",
    "LDA (equiv)",
    "Enolate solution held at",
    "Combined yield of 4 + 5 (%)",
    "Ratio 4 : 5"
   ],
   "rows": [
    [
     "1",
     "1.05",
     "−78°C, 15 min",
     "84",
     "97 : 3"
    ],
    [
     "2",
     "1.05",
     "−78°C, 15 min, then 0°C, 4 h",
     "81",
     "97 : 3"
    ],
    [
     "3",
     "0.90",
     "−78°C, 15 min",
     "76",
     "94 : 6"
    ],
    [
     "4",
     "0.90",
     "−78°C, 15 min, then 0°C, 4 h",
     "73",
     "30 : 70"
    ],
    [
     "5",
     "0.90",
     "−78°C, 15 min, then 0°C, 24 h",
     "72",
     "10 : 90"
    ],
    [
     "6",
     "0.90",
     "−78°C, 15 min, then 0°C, 48 h",
     "71",
     "10 : 90"
    ]
   ]
  }
 },
 {
  "id": "p_cpx5_5",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4A",
   "4C",
   "4B",
   "5E"
  ],
  "title": "Radiofrequency Ablation of Small Liver Tumors",
  "passage": "Radiofrequency (RF) ablation destroys small liver tumors without open surgery. Guided by ultrasound, a needle electrode is inserted into the tumor, and grounding pads are placed on the patient's thighs. A generator drives an alternating current at about 470 kHz through the body between the electrode tip and the pads. The current density is highest in the small volume of tissue around the tip, where resistive (Joule) heating raises the temperature. Cells die within seconds above about 60°C, so the goal is to heat a sphere of tissue about 3 cm across, including a margin of normal liver, above that temperature.\n\nThe generator used in one study held its output voltage constant, and the circuit impedance at the start of each ablation was about 50 Ω. Heating is limited near 100°C. When tissue water next to the tip boils, the steam and dried tissue conduct current poorly, so the impedance rises sharply and the delivered power falls, an event called roll-off. Some electrodes are therefore cooled internally with circulating chilled saline, which keeps the tissue next to the tip below 100°C while deeper tissue continues to heat.\n\nModels of tissue heating use these values: specific heat of liver and of blood, 3.6 J/g·°C; of fat, 2.3 J/g·°C; of water, 4.2 J/g·°C; density of liver, 1.05 g/cm³; heat of vaporization of water at 100°C, 2260 J/g. Normal body temperature is 37°C.",
  "questions": [
   {
    "q": "If 36 W is delivered to 20 g of liver tissue for 30 s with no heat loss, by how much does the temperature of the tissue rise?",
    "choices": [
     "0.50°C",
     "13°C",
     "15°C",
     "23°C"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "physics",
    "exp": "Energy delivered = **power × time** = 36 J/s × 30 s = 1080 J. With no losses, all of it heats the tissue: **q = mcΔT**, so ΔT = q/(mc) = 1080 J ÷ (20 g × 3.6 J/g·°C) = 1080 ÷ 72 = **15°C** (from 37°C to 52°C).\n\n**0.50°C** uses the power (36 W) as if it were the energy and forgets to multiply by time.\n**13°C** uses the specific heat of water (4.2) instead of liver (1080 ÷ 84 ≈ 13).\n**23°C** uses the specific heat of fat (2.3) instead of liver (1080 ÷ 46 ≈ 23).",
    "id": "p_cpx5_5_q1"
   },
   {
    "q": "During roll-off, the impedance between the electrode and the pads rises from 50 Ω to 200 Ω. By what factor does the power delivered by the generator change?",
    "choices": [
     "It falls to 1/16 of its initial value.",
     "It falls to 1/4 of its initial value.",
     "It stays the same.",
     "It rises to 4 times its initial value."
    ],
    "ans": 1,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "The passage says the generator holds its **voltage constant**. Combining P = IV with Ohm's law (I = V/R) gives **P = V²/R**. With V fixed, P is inversely proportional to R: raising R from 50 Ω to 200 Ω (4 times larger) cuts the power to **1/4**. The current also falls to 1/4, which is why heating effectively stops.\n\n**1/16** squares the resistance ratio; R is not squared in V²/R.\n**4 times** uses P = I²R as if the current stayed constant, but with fixed voltage the current drops as R rises.\n**Unchanged** ignores that power depends on R at all.",
    "id": "p_cpx5_5_q2"
   },
   {
    "q": "In a heating model with no heat losses and no phase change, equal masses of liver and of fat each absorb the same amount of heat. How do their temperature rises compare?",
    "choices": [
     "Fat warms about 1.6 times as much as liver.",
     "Liver warms about 1.6 times as much as fat.",
     "Fat warms about 1.8 times as much as liver.",
     "Both warm by the same number of degrees."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "physics",
    "exp": "From **q = mcΔT**, ΔT = q/(mc). With the same q and the same m, **ΔT is inversely proportional to the specific heat c**. So ΔT(fat)/ΔT(liver) = c(liver)/c(fat) = 3.6 ÷ 2.3 ≈ **1.6**: fat, with the lower specific heat, warms more. With the 36 W for 30 s (1080 J) and 20 g used in the first question, liver rises 1080 ÷ (20 × 3.6) = 15°C and fat rises 1080 ÷ (20 × 2.3) ≈ 23°C, a ratio of about 1.6.\n\n**Liver warms 1.6 times as much** inverts the relationship: a higher specific heat means a **smaller** rise for the same heat.\n**1.8 times** uses the specific heat of water (4.2 ÷ 2.3) instead of liver's.\n**The same rise** ignores the specific heat; equal heat gives equal ΔT only when mc is the same.",
    "id": "p_cpx5_5_q3"
   },
   {
    "q": "When tissue water next to an uncooled electrode reaches 100°C, its temperature stays near 100°C for a time even though power is still being delivered. Why?",
    "choices": [
     "The energy is used to overcome hydrogen bonds as liquid water becomes vapor, rather than to raise the temperature.",
     "Boiling is exothermic, so the heat it releases balances the energy delivered by the current.",
     "Steam has a much higher specific heat than liquid water, so more energy is needed per degree.",
     "Water's heat of vaporization is smaller than its specific heat, so all of the energy is lost as steam escapes."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "gen_chem",
    "exp": "During a **phase change**, added heat goes into separating molecules, not into increasing their kinetic energy, so the **temperature stays constant** until the change is complete. For water, vaporization means breaking the **hydrogen bonds** that hold the liquid together, which is why its heat of vaporization is so large (2260 J/g, over 500 times the energy needed to warm 1 g by 1°C).\n\nVaporization is **endothermic**: it absorbs heat.\nSteam's specific heat (about 2.0 J/g·°C) is lower than liquid water's, and specific heat doesn't apply during the phase change anyway.\nThe heat of vaporization (2260 J/g) is far **larger** than the specific heat (4.2 J/g·°C), and the two have different units, so they can't be compared that way.",
    "id": "p_cpx5_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx5_6",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5E",
   "5D"
  ],
  "title": "Sulfonamide Binding to Carbonic Anhydrase II Measured by Surface Plasmon Resonance",
  "passage": "Carbonic anhydrase II (CA II) catalyzes the reversible hydration of CO₂ (CO₂ + H₂O ⇌ HCO₃⁻ + H⁺) in red blood cells, the kidney and the eye. Its active site contains a Zn²⁺ ion held by the side chains of three amino acid residues. A water molecule fills the fourth position around the metal, and binding to Zn²⁺ lowers its pKa to about 7, so at physiological pH much of it is present as zinc-bound hydroxide, the nucleophile that attacks CO₂.\n\nSulfonamide inhibitors such as acetazolamide (Compound 3) lower the production of aqueous humor in the eye and are used to treat glaucoma and altitude sickness. They bind in the deprotonated form, with the sulfonamide nitrogen (–SO₂NH⁻) taking the place of the zinc-bound hydroxide.\n\nResearchers measured the binding of Compounds 1–3 (Figure 1) to CA II by surface plasmon resonance (SPR). The enzyme was attached to a gold-coated sensor chip, and a solution of each compound in pH 7.4 buffer was flowed over the surface at 25°C, followed by buffer alone. Binding changes the refractive index next to the gold surface, so the signal rises as the compound associates and falls as it dissociates. Fitting these curves gave the association rate constant kon and the dissociation rate constant koff (Table 1). The equilibrium dissociation constant is Kd = koff/kon, and the standard free energy of binding is ΔG° = RT ln Kd, with Kd in M. At 25°C, 2.303RT = 5.7 kJ/mol.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Compounds 1, 2 and 3 (left to right)",
    "parts": [
     "cpx5-benzenesulfonamide",
     "cpx5-fluorobenzenesulfonamide",
     "cpx5-acetazolamide"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 SPR binding data for sulfonamides with CA II (pH 7.4, 25°C)",
   "columns": [
    "Compound",
    "Molar mass (g/mol)",
    "pKa of –SO₂NH₂",
    "kon (M⁻¹·s⁻¹)",
    "koff (s⁻¹)"
   ],
   "rows": [
    [
     "1",
     "157",
     "10.1",
     "2.0 × 10⁵",
     "2.4"
    ],
    [
     "2",
     "175",
     "9.7",
     "4.0 × 10⁵",
     "0.080"
    ],
    [
     "3",
     "222",
     "7.2",
     "3.0 × 10⁶",
     "0.036"
    ]
   ]
  },
  "questions": [
   {
    "q": "What is the Kd of Compound 2 for CA II?",
    "choices": [
     "2.0 × 10⁻⁸ M",
     "2.0 × 10⁻⁷ M",
     "2.0 × 10⁻⁶ M",
     "5.0 × 10⁶ M"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "**Kd = koff/kon** = (0.080 s⁻¹) ÷ (4.0 × 10⁵ M⁻¹·s⁻¹). Write 0.080 as 8.0 × 10⁻²: (8.0 ÷ 4.0) × 10⁻²⁻⁵ = **2.0 × 10⁻⁷ M** (200 nM). The s⁻¹ cancels and M⁻¹ in the denominator leaves M, as a dissociation constant should have.\n\n**2.0 × 10⁻⁸ M** and **2.0 × 10⁻⁶ M** come from writing 0.080 as 8.0 × 10⁻³ or 8.0 × 10⁻¹.\n**5.0 × 10⁶** is kon/koff, the association constant Ka, whose units are M⁻¹, not M.",
    "id": "p_cpx5_6_q1"
   },
   {
    "q": "In a solution in which the free concentration of Compound 3 is held at 36 nM, approximately what fraction of CA II active sites is occupied by Compound 3?",
    "choices": [
     "25%",
     "33%",
     "75%",
     "Nearly 100%, because the free concentration of Compound 3 exceeds its Kd"
    ],
    "ans": 2,
    "cat": "5D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "First find Kd for Compound 3: koff/kon = 0.036 ÷ (3.0 × 10⁶) = 1.2 × 10⁻⁸ M = **12 nM**. For simple one-site binding, the **fraction bound = [L]/(Kd + [L])** = 36/(12 + 36) = 36/48 = **75%**. A free ligand concentration of 3 × Kd always gives 75% occupancy.\n\n**25%** is Kd/(Kd + [L]), the fraction that is **unoccupied**.\n**33%** is Kd/[L] (12/36), which is not a fraction bound.\n**Nearly 100%** would need [L] far above Kd (about 100 × Kd gives 99%); at [L] = Kd, occupancy is only 50%.",
    "id": "p_cpx5_6_q2"
   },
   {
    "q": "Which amino acid side chain is most likely to provide the three protein ligands for the active-site Zn²⁺ of CA II?",
    "choices": [
     "Histidine, through a nitrogen of its imidazole ring",
     "Lysine, through its positively charged ε-amino group",
     "Leucine, through its branched alkyl side chain",
     "Phenylalanine, through the π electrons of its benzene ring"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "biochemistry",
    "exp": "A metal ion like Zn²⁺ is a **Lewis acid**; it is bound by side chains with an available **lone pair** (Lewis bases). The imidazole ring of **histidine** has an sp² nitrogen whose lone pair can coordinate a metal, and His is the most common Zn²⁺ ligand in enzymes. In CA II, three histidines hold the zinc.\n\nAt pH 7.4 the lysine side chain is protonated (–NH₃⁺): it has no free lone pair, and its positive charge would repel Zn²⁺.\nLeucine's alkyl side chain has no lone pairs at all.\nA benzene ring is a very poor ligand for a hard, charged ion like Zn²⁺ in water.",
    "id": "p_cpx5_6_q3"
   },
   {
    "q": "Based on Table 1, by approximately how much is ΔG° of binding for Compound 3 more negative than ΔG° of binding for Compound 1 at 25°C?",
    "choices": [
     "5.7 kJ/mol",
     "11.4 kJ/mol",
     "17.1 kJ/mol",
     "22.8 kJ/mol"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Kd for Compound 1 = 2.4 ÷ (2.0 × 10⁵) = 1.2 × 10⁻⁵ M (12 μM). Kd for Compound 3 = 0.036 ÷ (3.0 × 10⁶) = 1.2 × 10⁻⁸ M (12 nM). Compound 3 binds **1000 times more tightly**. Since ΔG° = RT ln Kd = 2.303RT log Kd, ΔΔG° = 5.7 kJ/mol × log(1.2 × 10⁻⁸ / 1.2 × 10⁻⁵) = 5.7 × log(10⁻³) = **−17.1 kJ/mol**, so Compound 3's ΔG° is 17.1 kJ/mol more negative. Each tenfold drop in Kd is worth 5.7 kJ/mol at 25°C.\n\n**5.7 kJ/mol** counts only one factor of 10.\n**11.4 kJ/mol** counts two factors of 10, as from an exponent slip in 2.4 ÷ (2.0 × 10⁵) that gives 1.2 × 10⁻⁶ M for Compound 1.\n**22.8 kJ/mol** counts four factors of 10, as from writing 12 nM as 1.2 × 10⁻⁹ M.",
    "id": "p_cpx5_6_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_1",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5A",
   "5E"
  ],
  "title": "Glycolysis in Stored Red Blood Cells",
  "passage": "Donated red blood cells (RBCs) can be stored at 4°C for up to 42 days in a sealed bag containing an additive solution that supplies glucose, adenine and phosphate. Mature RBCs have no nucleus and no mitochondria, so they cannot run the citric acid cycle or oxidative phosphorylation. All of their ATP comes from glycolysis, which converts each glucose into two pyruvate with a net gain of 2 ATP and 2 NADH. To keep glycolysis running, lactate dehydrogenase (LDH) uses the NADH to reduce each pyruvate to L-lactate (Compound 1), regenerating NAD⁺ (Figure 1). The overall process is summarized in Reaction 1.\n\nC₆H₁₂O₆ → 2 CH₃CH(OH)COO⁻ + 2 H⁺\nReaction 1\n\nRBCs also divert some 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate (2,3-BPG), which binds deoxyhemoglobin and lowers its affinity for O₂. Glucose that passes through this bypass skips the phosphoglycerate kinase step and yields no net ATP.\n\nBecause lactate and H⁺ cannot leave the bag, they accumulate during storage. Because the cells are cold, every step of glycolysis runs far more slowly than at body temperature, but it does not stop. Investigators sampled stored units on several days and measured glucose and lactate in the fluid around the cells, the pH (measured at 37°C), and the ATP and 2,3-BPG content of the cells. Mean values are shown in Table 1.\n\nLow ATP is associated with stiff, poorly deformable RBCs that are cleared quickly after transfusion. Low 2,3-BPG makes transfused cells hold O₂ more tightly until the recipient's body restores it over the next day or so.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Conversion of glucose to L-lactate (Compound 1) in red blood cells (each glucose gives two pyruvate)",
    "parts": [
     "beta-glucopyranose",
     {
      "arrow": "glycolysis (10 steps); 2 NAD⁺ → 2 NADH"
     },
     "pyruvate",
     {
      "arrow": "LDH; NADH → NAD⁺"
     },
     "cpx6-l-lactate"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Composition of stored red blood cell units (4°C)",
   "columns": [
    "Day of storage",
    "Glucose (mM)",
    "Lactate (mM)",
    "pH (37°C)",
    "ATP (μmol/g Hb)",
    "2,3-BPG (μmol/g Hb)"
   ],
   "rows": [
    [
     "0",
     "40",
     "3",
     "7.00",
     "4.5",
     "13"
    ],
    [
     "14",
     "34",
     "15",
     "6.70",
     "4.2",
     "3.0"
    ],
    [
     "28",
     "30",
     "23",
     "6.60",
     "3.6",
     "0.5"
    ],
    [
     "42",
     "27",
     "29",
     "6.50",
     "3.0",
     "0.2"
    ]
   ]
  },
  "questions": [
   {
    "q": "In the step catalyzed by LDH, which change occurs at C-2 of pyruvate?",
    "choices": [
     "A ketone is reduced to a secondary alcohol.",
     "A secondary alcohol is oxidized to a ketone.",
     "An aldehyde is reduced to a primary alcohol.",
     "A carboxylate is reduced to an aldehyde."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "Pyruvate is CH₃–CO–COO⁻. Its C-2 is a **ketone** carbon (bonded to two carbons and double-bonded to O). LDH transfers a hydride from NADH to that carbon, and the oxygen picks up H⁺, giving CH₃–CH(OH)–COO⁻. Gaining H (NADH → NAD⁺) is a **reduction**, and an OH on a carbon bonded to two other carbons is a **secondary alcohol**.\n\nOxidizing an alcohol to a ketone is the reverse reaction (lactate → pyruvate), which would use up NAD⁺ instead of regenerating it.\nPyruvate has no aldehyde group, so it can't give a primary alcohol.\nThe carboxylate (C-1) is unchanged in Figure 1.",
    "id": "p_cpx6_1_q1"
   },
   {
    "q": "How many stereocenters does Compound 1 have, and what is the configuration of L-lactate?",
    "choices": [
     "One; S",
     "One; R",
     "Two; both S",
     "None; Compound 1 is achiral"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "Only C-2 of lactate has four different groups (–OH, –COO⁻, –CH₃ and –H), so there is **one stereocenter**. Rank by atomic number: **–OH (O) > –COO⁻ (C bonded to O,O,O) > –CH₃ (C bonded to H,H,H) > –H**. With H pointing away, OH → COO⁻ → CH₃ runs counterclockwise in L-lactate, so it is **S**.\n\nR is D-lactate, the enantiomer some bacteria make; the L/D label does not tell you R/S by itself, but for lactate L = S.\nC-1 (a carboxylate) and C-3 (a CH₃) each have two or more identical groups, so neither is a stereocenter.\nThe molecule is chiral, which is why LDH makes only one enantiomer.",
    "id": "p_cpx6_1_q2"
   },
   {
    "q": "By approximately what factor did [H⁺] in the stored units change between day 0 and day 14?",
    "choices": [
     "It fell to 0.50 times its original value.",
     "It rose 1.04-fold.",
     "It rose 2.0-fold.",
     "It rose 3.0-fold."
    ],
    "ans": 2,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "pH = −log[H⁺], so a pH drop of ΔpH multiplies [H⁺] by **10^ΔpH**. The pH fell from 7.00 to 6.70, so ΔpH = 0.30 and [H⁺] rose by 10^0.30 ≈ **2.0**. (log 2 = 0.30.)\nCheck: [H⁺] went from 1.0 × 10⁻⁷ M to about 2.0 × 10⁻⁷ M.\n\n**0.50** gets the direction backward: a lower pH means more H⁺, not less.\n**1.04** divides the pH values (7.00 ÷ 6.70), but pH is a logarithm, so ratios of pH mean nothing.\n**3.0** multiplies 0.30 by 10 instead of taking 10^0.30.",
    "id": "p_cpx6_1_q3"
   },
   {
    "q": "Based on Table 1, the average rate at which lactate accumulated between day 28 and day 42 was approximately what fraction of the rate between day 0 and day 14?",
    "choices": [
     "0.21",
     "0.50",
     "0.75",
     "2.0"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "Each interval is 14 days, so compare the changes in lactate. Day 0 → 14: 15 − 3 = 12 mM, or about 0.86 mM/day. Day 28 → 42: 29 − 23 = 6 mM, or about 0.43 mM/day. The ratio is 6 ÷ 12 = **0.50**.\n\nThe glucose column shows the same slowing (6, 4, then 3 mM used per interval), and lactate formed is always **twice** the glucose used, as Reaction 1 predicts. Glycolysis slows as the bag becomes more acidic, because low pH inhibits phosphofructokinase-1.\n\n**0.75** compares the last interval with the middle one (6 ÷ 8 mM).\n**0.21** divides the last change by the final concentration (6 ÷ 29) instead of by the earlier change.\n**2.0** is the ratio upside down.",
    "id": "p_cpx6_1_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_2",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4C",
   "4A",
   "5E"
  ],
  "title": "Charging and Firing an Implantable Defibrillator",
  "passage": "An implantable cardioverter-defibrillator (ICD) is placed under the skin of the upper chest and monitors the heart through a lead whose tip sits in the right ventricle. When the device detects ventricular fibrillation, it delivers a shock between a metal coil on the lead and the device's titanium case. The current depolarizes most of the ventricular muscle at once, which allows the sinoatrial node to restart a normal rhythm. An external defibrillator must push current through the skin and chest wall, but the ICD's shock path lies inside the chest, so much less energy is needed.\n\nThe ICD's lithium battery supplies only about 3 V, far too little to defibrillate directly. A transformer circuit inside the case repeatedly draws current from the battery and stores the energy in a 100 μF capacitor until the capacitor reaches 800 V. A full charge takes about 8.0 s. Only about 80% of the energy drawn from the battery ends up in the capacitor; the rest is released as heat inside the case.\n\nTo characterize the shock, engineers connected charged devices to resistors that stood in for the combined resistance of the heart and lead. Values of 50 Ω and 100 Ω were chosen to represent the low and high ends of what is measured in patients. The capacitor voltage was recorded while it discharged through each resistor (Figure 1). In a patient, the device cuts off the pulse after a few milliseconds and then reverses its polarity, giving a biphasic shock that defibrillates with less energy than a single-polarity pulse.",
  "figure": {
   "type": "line",
   "caption": "Figure 1 Capacitor voltage during discharge into two test resistances",
   "x": {
    "label": "Time (ms)",
    "min": 0,
    "max": 20,
    "step": 5
   },
   "y": {
    "label": "Capacitor voltage (V)",
    "min": 0,
    "max": 800,
    "step": 200
   },
   "series": [
    {
     "name": "50 Ω",
     "marker": "circle",
     "line": "smooth",
     "points": [
      [
       0,
       800
      ],
      [
       2.5,
       485
      ],
      [
       5,
       294
      ],
      [
       7.5,
       179
      ],
      [
       10,
       108
      ],
      [
       12.5,
       66
      ],
      [
       15,
       40
      ],
      [
       20,
       15
      ]
     ]
    },
    {
     "name": "100 Ω",
     "marker": "square",
     "line": "smooth",
     "points": [
      [
       0,
       800
      ],
      [
       2.5,
       623
      ],
      [
       5,
       485
      ],
      [
       7.5,
       378
      ],
      [
       10,
       294
      ],
      [
       12.5,
       229
      ],
      [
       15,
       179
      ],
      [
       20,
       108
      ]
     ]
    }
   ]
  },
  "questions": [
   {
    "q": "How much energy is stored in the ICD capacitor when it is fully charged?",
    "choices": [
     "0.040 J",
     "32 J",
     "64 J",
     "3.2 × 10⁴ J"
    ],
    "ans": 1,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "Use **U = ½CV²** with C in farads: 100 μF = 1.00 × 10⁻⁴ F.\nU = ½ × (1.00 × 10⁻⁴ F) × (800 V)² = ½ × 10⁻⁴ × 6.4 × 10⁵ = **32 J**.\n\n**64 J** leaves out the ½.\n**0.040 J** uses ½CV (forgetting to square V): ½ × 10⁻⁴ × 800 = 0.04.\n**3.2 × 10⁴ J** reads μF as mF (10⁻³ instead of 10⁻⁶ per unit), which is 1000 times too big.",
    "id": "p_cpx6_2_q1"
   },
   {
    "q": "According to Figure 1, how does the time for the capacitor voltage to fall to about 300 V with the 100 Ω load compare with the time with the 50 Ω load?",
    "choices": [
     "It is about twice as long, because the time constant RC doubles.",
     "It is about half as long, because a larger resistance dissipates the stored energy faster.",
     "It is about the same, because the capacitance and starting voltage are the same.",
     "It is about four times as long, because the time constant depends on R²."
    ],
    "ans": 0,
    "cat": "4C",
    "skill": "SIRS 4",
    "diff": "D",
    "exp": "Read the graph: the 50 Ω curve reaches about 300 V at **5 ms**, and the 100 Ω curve reaches it at **10 ms**, so the time doubles.\n\nTheory agrees. A discharging capacitor follows V = V₀e^(−t/RC), and after one **time constant τ = RC** it is at 37% of V₀ (0.37 × 800 ≈ 300 V).\n50 Ω × 1.00 × 10⁻⁴ F = 5.0 × 10⁻³ s = 5 ms\n100 Ω × 1.00 × 10⁻⁴ F = 10 ms\n\nA larger R gives a smaller current (I = V/R), so charge drains more slowly, not faster.\nThe curves clearly separate, so the time isn't the same.\nτ is proportional to R, not R², so doubling R doubles τ.",
    "id": "p_cpx6_2_q2"
   },
   {
    "q": "What is the average power drawn from the battery while the capacitor charges?",
    "choices": [
     "3.2 W",
     "4.0 W",
     "5.0 W",
     "40 W"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "The capacitor ends up with 32 J (U = ½CV² = ½ × 10⁻⁴ F × (800 V)²). Only 80% of the battery's energy gets there, so the battery supplies 32 J ÷ 0.80 = **40 J**. Power is energy per time: 40 J ÷ 8.0 s = **5.0 W**.\n\n**4.0 W** is the rate energy reaches the capacitor (32 J ÷ 8.0 s), ignoring the 20% lost as heat.\n**3.2 W** multiplies by 0.80 instead of dividing, as if the battery supplied less energy than the capacitor stored.\n**40 W** is the battery's energy (in joules), not divided by the 8.0 s.",
    "id": "p_cpx6_2_q3"
   },
   {
    "q": "Suppose the heat released during one full charge is absorbed by 40 g of the case and circuitry, whose average specific heat is 0.50 J/(g·°C). By approximately how much does their temperature rise?",
    "choices": [
     "0.10 °C",
     "0.40 °C",
     "1.6 °C",
     "2.0 °C"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "First find the heat. The battery supplies 32 J ÷ 0.80 = 40 J, and the capacitor keeps 32 J, so **8.0 J** becomes heat.\nThen use **q = mcΔT**: ΔT = q ÷ (mc) = 8.0 J ÷ (40 g × 0.50 J/(g·°C)) = 8.0 ÷ 20 = **0.40 °C**.\n\n**1.6 °C** uses the 32 J stored in the capacitor as the heat.\n**2.0 °C** uses all 40 J from the battery.\n**0.10 °C** multiplies by c instead of dividing (8.0 × 0.50 ÷ 40).",
    "id": "p_cpx6_2_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_3",
  "subj": "organic_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5C",
   "5B",
   "4B",
   "5E"
  ],
  "title": "Measuring Sevoflurane Breakdown in CO₂ Absorbents",
  "passage": "In a circle breathing system, a patient's exhaled gas passes through a canister of granular absorbent that removes CO₂, so the gas and the unused anesthetic it carries can be breathed again. The absorbent is mostly calcium hydroxide, which reacts with CO₂ to form calcium carbonate and water. The reaction is exothermic, so the canister warms during use. Many absorbents also contain a few percent of NaOH or KOH, which speeds CO₂ uptake.\n\nThe inhaled anesthetic sevoflurane (Compound 1) is stable in air, but a strong base can remove the hydrogen on its central carbon together with a fluoride ion from one of the CF₃ groups. The product is the vinyl ether Compound 2, known clinically as \"Compound A,\" which damages the kidneys of rats at high exposures (Figure 1).\n\nTo measure Compound 2, researchers attached an anesthesia machine to a mechanical test lung and delivered 2% sevoflurane for 1 h under each set of conditions. A 1.0 mL gas sample was then drawn from the inspiratory limb and injected into a gas chromatograph with helium carrier gas, a nonpolar capillary column held at 40°C and a flame ionization detector. Compound 2 eluted at 3.1 min and Compound 1 at 3.6 min. Concentrations were found from calibration standards and are reported as parts per million by volume (ppm). A water jacket held the canister at a set temperature. Each sample was analyzed three times, and the mean is reported. At higher fresh gas flows, more new gas enters the circuit and less exhaled gas is rebreathed through the canister. The results are shown in Table 1.",
  "scheme": [
   {
    "after": 1,
    "caption": "Figure 1 Base-induced conversion of sevoflurane (Compound 1) to Compound 2",
    "parts": [
     "cpx6-sevoflurane",
     {
      "arrow": "NaOH or KOH in absorbent; −HF"
     },
     "cpx6-compound-a"
    ]
   }
  ],
  "figure": {
   "caption": "Table 1 Compound 2 in inspired gas after 1 h of 2% sevoflurane",
   "columns": [
    "Run",
    "Absorbent",
    "NaOH + KOH (% by mass)",
    "Canister temperature (°C)",
    "Fresh gas flow (L/min)",
    "Compound 2 (ppm)"
   ],
   "rows": [
    [
     "1",
     "Soda lime",
     "3",
     "40",
     "2",
     "20"
    ],
    [
     "2",
     "Soda lime",
     "3",
     "50",
     "2",
     "40"
    ],
    [
     "3",
     "Soda lime",
     "3",
     "50",
     "6",
     "12"
    ],
    [
     "4",
     "Ca(OH)₂ only",
     "0",
     "50",
     "2",
     "< 1"
    ],
    [
     "5",
     "Soda lime",
     "3",
     "40",
     "6",
     "6"
    ]
   ]
  },
  "questions": [
   {
    "q": "Which change to the chromatography method would most likely shorten the retention times of both Compound 1 and Compound 2?",
    "choices": [
     "Raising the column temperature",
     "Lowering the carrier gas flow rate",
     "Using a longer column with the same stationary phase",
     "Injecting a larger volume of gas sample"
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 2",
    "diff": "M",
    "exp": "In GC, a compound spends its time either dissolved in the stationary phase or moving in the carrier gas. **Raising the column temperature** raises each compound's vapor pressure, so it spends more time in the gas phase and reaches the detector sooner.\n\nLowering the carrier gas flow moves the gas more slowly, so retention times get **longer**.\nA longer column gives a longer path, so retention times also get longer (although the peaks separate better).\nInjecting more sample makes the peaks larger, but each compound still elutes at about the same time.",
    "id": "p_cpx6_3_q1"
   },
   {
    "q": "In the conversion of Compound 1 to Compound 2, the hybridization of the carbon atom that loses its hydrogen changes from:",
    "choices": [
     "sp³ to sp²",
     "sp² to sp³",
     "sp³ to sp",
     "sp² to sp"
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "E",
    "exp": "In Compound 1 the central carbon has four single bonds (to H, O and two CF₃ carbons), so it is **sp³** (tetrahedral). In Compound 2 that carbon has lost its H and forms a C=C double bond to the former CF₃ carbon, so it has three groups and is **sp²** (trigonal planar). This is an **elimination** of HF: the C–H and C–F bonds on neighboring carbons break and a π bond forms between them.\n\nsp² → sp³ is the reverse change, as in an addition across a double bond.\nsp hybridization needs a triple bond or two double bonds on the same carbon, and Compound 2 has neither.",
    "id": "p_cpx6_3_q2"
   },
   {
    "q": "In Run 2, approximately how many moles of Compound 2 are present in 24.6 L of inspired gas at 27°C and 1.0 atm? (R = 0.0821 L·atm/(mol·K))",
    "choices": [
     "4.0 × 10⁻⁸ mol",
     "4.0 × 10⁻⁵ mol",
     "4.4 × 10⁻⁴ mol",
     "4.0 × 10⁻² mol"
    ],
    "ans": 1,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "First find the total moles of gas with **PV = nRT**, using kelvins: T = 27 + 273 = 300 K.\nn = PV ÷ RT = (1.0 atm × 24.6 L) ÷ (0.0821 × 300) = 24.6 ÷ 24.6 = **1.0 mol**.\nFor gases, ppm by volume is also a mole fraction: 40 ppm = 40 × 10⁻⁶. So n(Compound 2) = 40 × 10⁻⁶ × 1.0 mol = **4.0 × 10⁻⁵ mol**.\n\n**4.4 × 10⁻⁴ mol** uses 27 instead of 300 K (24.6 ÷ 2.22 = 11 mol total).\n**4.0 × 10⁻⁸ mol** treats ppm as parts per billion (10⁻⁹).\n**4.0 × 10⁻² mol** treats ppm as parts per thousand (10⁻³).",
    "id": "p_cpx6_3_q3"
   },
   {
    "q": "Which two runs in Table 1 best isolate the effect of canister temperature on the formation of Compound 2?",
    "choices": [
     "Runs 1 and 2",
     "Runs 2 and 3",
     "Runs 2 and 4",
     "Runs 1 and 3"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 3",
    "diff": "D",
    "exp": "To isolate one variable, compare runs that differ **only** in that variable. Runs 1 and 2 use the same absorbent, base content and fresh gas flow, and differ only in temperature (40 vs 50°C). Compound 2 doubled (20 → 40 ppm), as expected when a reaction rate rises with temperature (higher T means more collisions with enough energy to reach the transition state). Runs 5 and 3 give the same comparison at 6 L/min (6 → 12 ppm).\n\nRuns 2 and 3 differ in fresh gas flow, not temperature (higher flow dilutes the product).\nRuns 2 and 4 differ in strong base content, which shows that NaOH/KOH, not Ca(OH)₂, drives the reaction.\nRuns 1 and 3 differ in both temperature and flow, so the two effects can't be separated.",
    "id": "p_cpx6_3_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_4",
  "subj": "biochemistry",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "5D",
   "5E"
  ],
  "title": "A Phage Genome That Uses 2-Aminoadenine",
  "passage": "In standard DNA, adenine (A) pairs with thymine (T) through two hydrogen bonds, and guanine (G) pairs with cytosine (C) through three. The genome of cyanophage S-2L, a virus that infects cyanobacteria, contains no adenine. In its place is 2,6-diaminopurine (Compound 1, called Z), which is adenine with an extra amino group at C-2 (Figure 1). The phage carries genes for enzymes that make the Z nucleotide and that destroy dATP, so A is kept out of newly made phage DNA.\n\nIn a Z–T pair, the 6-amino group of Z donates a hydrogen bond to the O-4 carbonyl oxygen of T, and N-1 of Z accepts a hydrogen bond from the N-3–H of T, exactly as in an A–T pair. The 2-amino group of Z donates an additional hydrogen bond to the O-2 carbonyl oxygen of T in the minor groove. Z-containing DNA also resists cutting by many of the restriction enzymes that host bacteria use to destroy invading DNA.\n\nTo compare stability, researchers made two 20-base-pair duplexes with identical sequences, except that the 8 A's in one duplex were all replaced by Z. Melting was followed by the rise in absorbance at 260 nm as the strands separated. Analysis of the melting curves gave these values for melting (duplex → single strands):\nA duplex: ΔH° = +520 kJ/mol, ΔS° = +1.60 kJ/(mol·K)\nZ duplex: ΔH° = +600 kJ/mol, ΔS° = +1.80 kJ/(mol·K)\n\nUnder the conditions used, the melting temperature, Tm, can be taken as the temperature at which ΔG° for melting equals zero.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Adenine, Compound 1 (Z) and thymine",
    "parts": [
     "adenine",
     "cpx6-diaminopurine",
     "thymine"
    ]
   }
  ],
  "questions": [
   {
    "q": "How does the number of hydrogen bonds in a Z–T base pair compare with those in the standard base pairs?",
    "choices": [
     "Two, the same number as in an A–T pair",
     "Three, the same number as in a G–C pair",
     "Three, one more than in a G–C pair",
     "Four, one more than in a G–C pair"
    ],
    "ans": 1,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "The passage lists the Z–T hydrogen bonds: 6-NH₂ → O-4, N-3–H → N-1, and the extra 2-NH₂ → O-2. That is **three**, the same as a **G–C** pair (and one more than an A–T pair, which has only the first two).\n\n**Two** ignores the extra 2-amino group, which is the whole difference between Z and A.\nA G–C pair already has three hydrogen bonds, so a Z–T pair has the same number, not one more.\n**Four** double-counts: Z gains one bond over A–T, not over G–C.",
    "id": "p_cpx6_4_q1"
   },
   {
    "q": "Compound 1 is adenine with an amino group added at C-2. Which naturally occurring purine also has an amino group at C-2?",
    "choices": [
     "Adenine",
     "Guanine",
     "Hypoxanthine",
     "Xanthine"
    ],
    "choiceFigs": [
     "adenine",
     "guanine",
     "cpx6-hypoxanthine",
     "cpx6-xanthine"
    ],
    "ans": 1,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "**Guanine** is 2-amino-6-oxopurine: it carries an –NH₂ at C-2 and a C=O at C-6. In a G–C pair, that 2-amino group donates a hydrogen bond to the O-2 of cytosine in the minor groove, which is the same job Z's 2-amino group does with the O-2 of thymine.\n\n**Adenine** has its amino group at C-6 and only H at C-2.\n**Hypoxanthine** (the base of inosine) has a C=O at C-6 and only H at C-2.\n**Xanthine** has C=O groups at both C-2 and C-6, so its C-2 is a hydrogen-bond acceptor, not a donor.",
    "id": "p_cpx6_4_q2"
   },
   {
    "q": "Based on the passage, what is the approximate Tm of the Z duplex?",
    "choices": [
     "−273 °C",
     "3.0 °C",
     "60 °C",
     "333 °C"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Use **ΔG° = ΔH° − TΔS°** and set ΔG° = 0 at Tm, so **Tm = ΔH° ÷ ΔS°**. Keep the energy units the same (both kJ):\nTm = 600 kJ/mol ÷ 1.80 kJ/(mol·K) = 333 K\n333 K − 273 = **60 °C**.\nThe same calculation for the A duplex gives 520 ÷ 1.60 = 325 K = 52 °C, so the eight Z's raise Tm by about 8 °C.\n\n**333 °C** leaves the answer in kelvins.\n**−273 °C** comes from mixing units (600 ÷ 1800 = 0.33 K, then subtracting 273).\n**3.0 °C** divides ΔS° by ΔH° and multiplies by 1000, which is the ratio upside down.",
    "id": "p_cpx6_4_q3"
   },
   {
    "q": "Researchers want to test whether the higher stability of the Z duplex comes mainly from the extra hydrogen bond to O-2 of thymine. Which experiment would best test this?",
    "choices": [
     "Compare the A and Z duplexes after replacing each T opposite them with a T analog that lacks the O-2 carbonyl oxygen",
     "Compare the A and Z duplexes at several different strand concentrations",
     "Compare the A and Z duplexes after replacing every G–C pair with a C–G pair",
     "Compare the A and Z duplexes by following absorbance at 280 nm instead of 260 nm"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "X",
    "exp": "If the extra stability comes from the 2-NH₂ → O-2 hydrogen bond, then removing the **acceptor** (O-2 of T) should remove Z's advantage. The A–T pair doesn't use O-2, so with the analog the two duplexes should melt at about the same temperature if the hypothesis is right. If Z still melts higher, something else (such as stacking) is responsible.\n\nChanging strand concentration shifts both Tm values but doesn't separate hydrogen bonding from other effects.\nFlipping G–C pairs changes both duplexes in the same way and leaves the Z–T pairs untouched.\nChanging the wavelength changes only how melting is detected, not why the duplexes differ.",
    "id": "p_cpx6_4_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_5",
  "subj": "gen_chem",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4E",
   "5D",
   "5A"
  ],
  "title": "Potassium Iodide Prophylaxis After a Reactor Accident",
  "passage": "The thyroid gland takes up iodide (I⁻) from the blood through a Na⁺/I⁻ symporter in the membranes of its follicular cells. The enzyme thyroid peroxidase then uses H₂O₂ to oxidize I⁻ to an electrophilic iodine species that substitutes onto the aromatic rings of tyrosine residues in the protein thyroglobulin. Figure 1 shows the reaction for the free amino acid tyrosine (Compound 1). Pairs of iodinated tyrosines are later coupled to form the thyroid hormones thyroxine (T₄) and triiodothyronine (T₃).\n\nA nuclear reactor accident can release iodine-131 (half-life 8.0 days), which decays by β⁻ emission. Radioiodine behaves chemically exactly like stable iodine-127, so the thyroid concentrates it in the same way. After one such accident, children who drank milk from cows grazing on contaminated pasture later developed thyroid cancer at much higher rates than unexposed children.\n\nTaking a large dose of stable potassium iodide (KI, 166 g/mol) shortly before or soon after exposure floods the symporter with ¹²⁷I⁻, so little ¹³¹I⁻ is taken up. A large iodide load also briefly shuts down iodination in the gland. One dose protects for about 24 h. KI protects only the thyroid, and it offers no protection against the other radioactive elements released in an accident. Recommended single doses are 130 mg for adults, 65 mg for children 3–12 years old, 32 mg for children 1 month to 3 years old and 16 mg for newborns. KI is available as tablets and as an oral solution that is 0.40 M KI.\n\nIn one emergency plan, local milk is withheld from sale until its ¹³¹I activity falls below 100 Bq/L.",
  "scheme": [
   {
    "after": 0,
    "caption": "Figure 1 Iodination of tyrosine (Compound 1) to 3-iodotyrosine (Compound 2)",
    "parts": [
     "tyrosine-plain",
     {
      "arrow": "thyroid peroxidase; I⁻, H₂O₂"
     },
     "cpx6-iodotyrosine"
    ]
   }
  ],
  "questions": [
   {
    "q": "A milk sample tested after the release has an ¹³¹I activity of 3200 Bq/L. If no more iodine-131 enters the milk supply, about how many days will pass before milk with this activity can be sold under the emergency plan?",
    "choices": [
     "32 days",
     "40 days",
     "48 days",
     "256 days"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "The activity must fall from 3200 to 100 Bq/L, a factor of 32 = 2⁵, so **five half-lives** are needed: 3200 → 1600 → 800 → 400 → 200 → 100 Bq/L.\n5 × 8.0 days = **40 days**.\n\n**32 days** stops after four halvings (200 Bq/L, still above the limit).\n**48 days** counts six half-lives, counting the starting value as one step.\n**256 days** multiplies the ratio by the half-life (32 × 8.0 days), as if activity fell by a fixed amount each half-life instead of halving.",
    "id": "p_cpx6_5_q1"
   },
   {
    "q": "Which nuclide is produced when iodine-131 (Z = 53) undergoes β⁻ decay?",
    "choices": [
     "Xenon-131 (Z = 54)",
     "Tellurium-131 (Z = 52)",
     "Antimony-127 (Z = 51)",
     "Iodine-130 (Z = 53)"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "exp": "In **β⁻ decay** a neutron becomes a proton and an electron (plus an antineutrino) is emitted. The mass number stays at **131** and the atomic number rises by 1, from 53 to **54**, which is xenon.\n¹³¹₅₃I → ¹³¹₅₄Xe + ⁰₋₁e\n\n**Tellurium-131** (Z down by 1) would come from β⁺ emission or electron capture.\n**Antimony-127** (A down by 4, Z down by 2) would come from α decay.\n**Iodine-130** would require losing a neutron, which is not what β⁻ decay does.",
    "id": "p_cpx6_5_q2"
   },
   {
    "q": "In Figure 1, iodine is added to the ring carbon next to the –OH group (C-3 of the phenol ring) rather than to any other ring position. Which statement best explains this regiochemistry?",
    "choices": [
     "Resonance donation from the –OH raises electron density ortho and para to it, and the para position is taken.",
     "Resonance donation from the –OH raises electron density meta to it, and C-3 is meta to the –OH group.",
     "Inductive withdrawal by the –OH lowers electron density ortho to it, so iodide attacks there as a nucleophile.",
     "The alkyl side chain is a stronger ring activator than the –OH group, and C-3 is ortho to the side chain."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "The oxygen of a phenol donates a lone pair into the ring by **resonance**, which places extra electron density (partial negative charge) on the carbons **ortho and para** to the OH. Those carbons are the most attractive to the electrophilic iodine species. In tyrosine the OH is at C-4 and the side chain at C-1, so the para position is already taken; the iodine goes **ortho to the OH, at C-3** (and a second iodine can go at C-5, giving 3,5-diiodotyrosine).\n\nResonance donation activates ortho and para positions, not meta, and C-3 is ortho to the OH, not meta.\nThe passage says the oxidized iodine species is **electrophilic**, and the ring is electron-rich; nucleophilic iodide does not attack an activated benzene ring.\nThe –OH is a much stronger activator than an alkyl group, and C-3 is **meta** to the side chain at C-1, not ortho.",
    "id": "p_cpx6_5_q3"
   },
   {
    "q": "Approximately what volume of the KI oral solution provides the recommended dose for a 6-year-old child?",
    "choices": [
     "0.10 mL",
     "1.0 mL",
     "10 mL",
     "160 mL"
    ],
    "ans": 1,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "D",
    "exp": "A 6-year-old falls in the 3–12 group: **65 mg KI**.\nMoles: 65 mg ÷ 166 g/mol = 0.39 mmol ≈ 0.40 mmol.\nVolume: 0.40 mmol ÷ 0.40 M (= 0.40 mmol/mL) = **1.0 mL**.\n\n**160 mL** divides the mass by the molarity (65 ÷ 0.40) without converting mg to moles.\n**0.10 mL** and **10 mL** are power-of-ten slips, for example treating 0.40 M as 0.40 mmol per 10 mL or mixing up mg and g.",
    "id": "p_cpx6_5_q4"
   }
  ]
 },
 {
  "id": "p_cpx6_6",
  "subj": "physics",
  "type": "passage",
  "topic": "C/P",
  "cats": [
   "4D",
   "4B",
   "4E"
  ],
  "title": "Inside a 3-Tesla MRI Scanner",
  "passage": "A clinical MRI scanner produces its main magnetic field, B₀ = 3.0 T, with a large solenoid of niobium–titanium wire. This field is about 60,000 times stronger than Earth's. The wire becomes superconducting only below about 9 K, so the coil sits in a bath of liquid helium (boiling point 4.2 K, density 0.125 g/mL, molar mass 4.0 g/mol). Once the current is established, it circulates with no power supply attached.\n\nHydrogen nuclei (protons) in tissue have a nuclear spin and act like tiny magnets. In the field B₀ they precess at the Larmor frequency f = γB₀, where γ = 42.6 MHz/T for ¹H, so f ≈ 128 MHz at 3.0 T. Pulses of radio-frequency (RF) waves at this frequency tip the spins; a pulse of higher power tips them through a larger angle. As the spins relax, they emit RF signals that are picked up by receiver coils. Tissue is mostly water, and RF waves travel through it at about one-ninth of their speed in a vacuum (3.0 × 10⁸ m/s).\n\nTo tell where each signal comes from, gradient coils add small magnetic fields that vary with position. These coils carry rapidly switched currents inside the strong field, so magnetic forces make them vibrate. The resulting knocking noise is loud enough that patients are given earplugs or headphones.\n\nIf part of the main coil warms above its critical temperature, the wire becomes resistive and the magnet \"quenches.\" The several megajoules of energy stored in the magnetic field are converted to heat, and liquid helium boils off rapidly. The helium is vented through a pipe to the outside, because the cold gas expands enormously and could displace the oxygen in the scan room.",
  "questions": [
   {
    "q": "What is the approximate wavelength, inside tissue, of the RF waves used to excite protons in this scanner?",
    "choices": [
     "0.26 m",
     "2.3 m",
     "3.8 m",
     "21 m"
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "X",
    "exp": "Use **λ = v/f** with the speed in tissue. v = (3.0 × 10⁸ m/s) ÷ 9 ≈ 3.3 × 10⁷ m/s, and f = 128 MHz = 1.28 × 10⁸ Hz.\nλ = 3.3 × 10⁷ ÷ 1.28 × 10⁸ ≈ **0.26 m**.\nThis is about the size of a human torso, which is one reason RF signal is less uniform at 3 T than at lower field strengths.\n\n**2.3 m** is the wavelength in a vacuum (3.0 × 10⁸ ÷ 1.28 × 10⁸), ignoring the slower speed in tissue.\n**21 m** multiplies by 9 instead of dividing.\n**3.8 m** is f ÷ v, the ratio upside down.",
    "id": "p_cpx6_6_q1"
   },
   {
    "q": "A 1.5 T scanner and the 3.0 T scanner each send an RF pulse of the same power, each at its own Larmor frequency. Compared with the photons in the 1.5 T pulse, the photons in the 3.0 T pulse:",
    "choices": [
     "each carry twice the energy and arrive at half the rate.",
     "each carry the same energy and arrive at the same rate.",
     "each carry twice the energy and arrive at the same rate.",
     "each carry four times the energy and arrive at one-quarter the rate."
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "physics",
    "exp": "The RF must match the **Larmor frequency, f = γB₀**. Doubling B₀ from 1.5 T to 3.0 T doubles f (about 64 MHz → 128 MHz), and with **E = hf** each photon carries **twice the energy**.\nPower is energy per second: **P = (photons per second) × hf**. The two pulses have the same power, so if each photon carries twice the energy, the photons must arrive at **half the rate**.\n\n**The same energy and rate** ignores f = γB₀: the two scanners do not use the same frequency.\n**Twice the energy at the same rate** would double the power, but the powers are equal.\n**Four times the energy** treats E as proportional to B₀², but f, and so E, is proportional to B₀.",
    "id": "p_cpx6_6_q2"
   },
   {
    "q": "During a quench, approximately what volume of gas at 27°C and 1.0 atm is produced by each 1.0 L of liquid helium that boils off and warms to room temperature? (R = 0.0821 L·atm/(mol·K))",
    "choices": [
     "11 L",
     "77 L",
     "770 L",
     "3100 L"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Mass: 1.0 L = 1000 mL × 0.125 g/mL = 125 g.\nMoles: 125 g ÷ 4.0 g/mol ≈ 31 mol.\nVolume from **PV = nRT** at 300 K: V = nRT/P = 31 × 0.0821 × 300 ÷ 1.0 ≈ 31 × 24.6 ≈ **770 L**.\nThat roughly 770-fold expansion is why the gas must be vented outside.\n\n**3100 L** skips dividing by the molar mass (uses 125 mol).\n**11 L** uses the boiling point, 4.2 K, instead of room temperature (and helium would not stay a gas that cold at 1 atm anyway).\n**77 L** is a factor-of-10 slip, such as using 0.0125 g/mL for the density.",
    "id": "p_cpx6_6_q3"
   },
   {
    "q": "The RF pulses used in MRI are not ionizing radiation. Which statement best explains why?",
    "choices": [
     "Each RF photon carries far less energy than is needed to remove an electron from a molecule.",
     "Each RF photon carries far more energy than is needed to remove an electron, so it passes through without interacting.",
     "RF waves are longitudinal pressure waves, so they do not consist of photons.",
     "The total energy delivered by the RF pulses is too small to warm tissue."
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "D",
    "exp": "Ionization depends on the energy of **each photon**, E = hf. At 128 MHz, E = (6.6 × 10⁻³⁴ J·s)(1.28 × 10⁸ Hz) ≈ 8.5 × 10⁻²⁶ J, or about 5 × 10⁻⁷ eV. Removing an electron from a molecule takes roughly 10 eV, more than ten million times as much. Only high-frequency photons (UV, X-rays, γ-rays) carry enough energy per photon to ionize.\n\nA photon with too much energy would still ionize; extra energy doesn't make it pass through harmlessly.\nRF waves are electromagnetic (transverse) waves made of photons; the gradient-coil noise is the pressure wave.\nRF pulses do warm tissue (scanners limit the absorbed power for this reason), so that statement is false, and heating is not ionization anyway.",
    "id": "p_cpx6_6_q4"
   }
  ]
 }
];
