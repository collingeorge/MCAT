// Chem/Phys daily quizzes: six original half-sections (5 passages + 10 stand-alones, 30 questions each) written
// to the AAMC C/P blueprint, for the Section Mastery end-of-day test. Not AAMC material.
const CP_POOL = [
 {
  "id": "cp_half_1",
  "title": "Chem/Phys Quiz 1",
  "order": [
   "p_cpp1_1",
   "p_cpp1_2",
   4,
   "p_cpp1_3",
   "p_cpp1_4",
   3,
   "p_cpp1_6",
   3
  ],
  "passages": [
   {
    "id": "p_cpp1_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5E",
     "5D",
     "4E"
    ],
    "title": "Xanthine Oxidase Inhibitors for Gout",
    "passage": "Gout is a painful arthritis caused by crystals of monosodium urate that form in joints when the concentration of uric acid in blood stays high, usually above about 0.40 mM (about 6.8 mg/dL). In humans, uric acid is the end product of purine breakdown. The last two steps are catalyzed by xanthine oxidase (XO), a molybdenum-containing enzyme that oxidizes hypoxanthine to xanthine and then xanthine to uric acid (Figure 1). In each step, a C–H bond of the purine ring is replaced by a C=O group, the new oxygen atom comes from water, and O₂ accepts the electrons and is reduced to H₂O₂.\n\nThe drug allopurinol (Compound 1, C₅H₄N₄O) is a pyrazolopyrimidine that resembles hypoxanthine. XO oxidizes Compound 1 to oxypurinol (Compound 2), as shown in Figure 2. Compound 2 remains bound to the reduced molybdenum center in the active site, which blocks further turnover of xanthine. A newer drug candidate, Compound 3, is not a purine analog; its binding site on XO was not known.\n\nTo compare the inhibitors, researchers measured the initial rate of uric acid formation by purified bovine XO from the increase in absorbance at 295 nm (ε of uric acid = 1.1 × 10⁴ M⁻¹·cm⁻¹). Assays contained 10 nM XO in an air-saturated pH 7.5 buffer at 25°C. Rates were measured at several xanthine concentrations with and without a fixed concentration of inhibitor, and the data were fit to the Michaelis–Menten equation to give the apparent constants in Table 1. One set of assays used hypoxanthine as the substrate instead of xanthine.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Reactions catalyzed by xanthine oxidase",
      "parts": [
       "cpp1-hypoxanthine",
       {
        "arrow": "XO, O₂, H₂O"
       },
       "cpp1-xanthine",
       {
        "arrow": "XO, O₂, H₂O"
       },
       "cpp1-uric-acid"
      ]
     },
     {
      "after": 1,
      "caption": "Figure 2 Oxidation of Compound 1 to Compound 2",
      "parts": [
       "cpp1-allopurinol",
       {
        "arrow": "XO, O₂, H₂O"
       },
       "cpp1-oxypurinol"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Apparent kinetic constants for xanthine oxidase (pH 7.5, 25°C)",
     "columns": [
      "Substrate",
      "Inhibitor",
      "KM (μM)",
      "Vmax (μM/min)"
     ],
     "rows": [
      [
       "Xanthine",
       "none",
       "5.0",
       "2.0"
      ],
      [
       "Xanthine",
       "Compound 2, 1.0 μM",
       "15",
       "2.0"
      ],
      [
       "Xanthine",
       "Compound 2, 3.0 μM",
       "35",
       "2.0"
      ],
      [
       "Xanthine",
       "Compound 3, 2.0 μM",
       "5.0",
       "1.0"
      ],
      [
       "Hypoxanthine",
       "none",
       "3.0",
       "1.6"
      ]
     ]
    },
    "questions": [
     {
      "q": "Which statement about Compound 3 is best supported by the data in Table 1?",
      "choices": [
       "It binds equally well to the free enzyme and to the enzyme–substrate complex.",
       "It binds only to the free enzyme, at the site where xanthine binds.",
       "It binds only to the enzyme–substrate complex, after xanthine has bound.",
       "It is a substrate that is oxidized by XO faster than xanthine is."
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Compare the Compound 3 row with the no-inhibitor xanthine row. **Vmax fell by half (2.0 → 1.0 μM/min) while KM stayed at 5.0 μM.** That is the signature of **noncompetitive inhibition**: the inhibitor binds the free enzyme and the enzyme–substrate complex equally well, so it removes active enzyme without changing substrate affinity. This also fits the passage, which says Compound 3 is not a purine analog.\n\nBinding only the free enzyme at the substrate site is competitive inhibition, which raises KM and leaves Vmax unchanged (that is what Compound 2 does).\nBinding only the ES complex is uncompetitive inhibition, which lowers both KM and Vmax.\nA faster substrate would not lower the rate of uric acid formation from xanthine.",
      "id": "p_cpp1_1_q1"
     },
     {
      "q": "Compound 1 and hypoxanthine (Figure 1) are best described as:",
      "choices": [
       "constitutional isomers.",
       "enantiomers.",
       "diastereomers.",
       "resonance structures of one compound."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Both compounds have the formula **C₅H₄N₄O**, but their atoms are connected differently: hypoxanthine has an imidazole ring fused to the pyrimidine ring, while Compound 1 has a pyrazole ring (two adjacent N atoms) in that position. Same formula with different connectivity means **constitutional isomers**.\n\nEnantiomers and diastereomers are stereoisomers, which have the same connectivity and differ only in 3-D arrangement; neither flat molecule even has a stereocenter.\nResonance structures differ only in the placement of electrons, not atoms. Moving a ring nitrogen to a new position is a different compound.",
      "id": "p_cpp1_1_q2"
     },
     {
      "q": "Based on Table 1, what is the inhibition constant, Ki, of Compound 2 for XO?",
      "choices": [
       "0.33 μM",
       "0.50 μM",
       "2.0 μM",
       "3.0 μM"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "Compound 2 raises KM without changing Vmax, so it is **competitive**, and **KM,app = KM(1 + [I]/Ki)**.\nWith 1.0 μM Compound 2: 15 μM = 5.0 μM × (1 + 1.0 μM/Ki)\n1 + 1.0/Ki = 3.0, so 1.0/Ki = 2.0 and **Ki = 0.50 μM**.\nCheck with the 3.0 μM row: 5.0 × (1 + 3.0/0.50) = 5.0 × 7 = 35 μM, which matches Table 1.\n\n**0.33 μM** comes from dividing [I] by the KM ratio (1.0 ÷ 3.0) and forgetting the \"1 +\" term.\n**2.0 μM** is the value of [I]/Ki, not Ki itself (inverting the last step).\n**3.0 μM** is just the factor by which KM increased.",
      "id": "p_cpp1_1_q3"
     },
     {
      "q": "A standard daily dose of Compound 1 is 300 mg. Approximately how many moles of nitrogen atoms does this dose contain?",
      "choices": [
       "5.5 × 10⁻⁴ mol",
       "2.2 × 10⁻³ mol",
       "4.4 × 10⁻³ mol",
       "8.8 × 10⁻³ mol"
      ],
      "ans": 3,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "M",
      "subj": "gen_chem",
      "exp": "First find the molar mass of C₅H₄N₄O: 5(12) + 4(1) + 4(14) + 16 = 60 + 4 + 56 + 16 = **136 g/mol**.\nMoles of Compound 1 = 0.300 g ÷ 136 g/mol ≈ 2.2 × 10⁻³ mol.\nEach molecule has **4 N atoms**, so moles of N = 4 × 2.2 × 10⁻³ ≈ **8.8 × 10⁻³ mol**.\n\n**2.2 × 10⁻³ mol** is the moles of drug, not of N atoms (forgetting the ×4).\n**4.4 × 10⁻³ mol** treats the nitrogen as N₂ molecules (×2) instead of counting N atoms.\n**5.5 × 10⁻⁴ mol** divides by 4 instead of multiplying.",
      "id": "p_cpp1_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp1_2",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4C",
     "5A"
    ],
    "title": "Calibrating a Glass pH Electrode",
    "passage": "A clinical laboratory measures the pH of body fluids with a combination glass electrode. The probe contains two silver–silver chloride (Ag/AgCl) electrodes. One sits inside a thin bulb of special glass that is filled with a solution of fixed pH. The other is a reference electrode in contact with the sample through a porous junction. Both Ag/AgCl electrodes have a constant potential, set by Half-reaction 1.\n\nAgCl(s) + e⁻ → Ag(s) + Cl⁻(aq)   E° = +0.22 V\nHalf-reaction 1\n\nThe outer surface of the glass bulb exchanges H⁺ with the sample and, to a much smaller extent, other small monovalent cations. A difference in [H⁺] between the inside and outside of the bulb creates a potential across the glass. The measured cell potential E therefore depends on the sample pH according to Equation 1, where S is the slope of the electrode response.\n\nE = S × (7.00 − pH)\nEquation 1\n\nFor an ideal electrode at 25°C, S = 2.303RT/F = 59.2 mV per pH unit, and S is proportional to absolute temperature. Real electrodes respond slightly less than ideally, so S is found by calibration. A technician calibrated an electrode at 25°C with three standard buffers and then measured four samples at the same temperature. The results are shown in Table 1. Sample D was a 0.10 M NaOH solution used as a quality-control check. Typical clinical ranges are pH 1.5–3.5 for gastric fluid, 4.5–8.0 for urine and 7.8–8.8 for pancreatic juice.",
    "figure": {
     "caption": "Table 1 Calibration and sample readings at 25°C",
     "columns": [
      "Solution",
      "Known pH",
      "Measured E (mV)"
     ],
     "rows": [
      [
       "Buffer 1",
       "4.00",
       "+174"
      ],
      [
       "Buffer 2",
       "7.00",
       "0"
      ],
      [
       "Buffer 3",
       "10.00",
       "−174"
      ],
      [
       "Sample A (gastric fluid)",
       "unknown",
       "+290"
      ],
      [
       "Sample B (urine)",
       "unknown",
       "+58"
      ],
      [
       "Sample C (pancreatic juice)",
       "unknown",
       "−87"
      ],
      [
       "Sample D (0.10 M NaOH)",
       "13.00",
       "−290"
      ]
     ]
    },
    "questions": [
     {
      "q": "Based on the calibration data in Table 1, how does the measured potential change when [H⁺] in a sample decreases by a factor of 100?",
      "choices": [
       "It decreases by 116 mV.",
       "It decreases by 58 mV.",
       "It increases by 116 mV.",
       "It decreases by 5800 mV."
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "From the buffers, the potential falls by 174 mV for each 3.00 pH units, so the electrode's slope is **S = 174 ÷ 3.00 = 58 mV per pH unit** (slightly less than the ideal 59.2 mV).\nA 100-fold decrease in [H⁺] raises the pH by log 100 = **2 units**, so by Equation 1 E changes by −58 × 2 = **−116 mV** (it decreases).\n\n**58 mV** treats a 100-fold change as one pH unit.\n**+116 mV** gets the sign backward: higher pH means a smaller (7.00 − pH) term, so E goes down, as the pH 10 buffer shows.\n**5800 mV** assumes the potential is proportional to [H⁺] itself rather than to its logarithm.",
      "id": "p_cpp1_2_q1"
     },
     {
      "q": "What is the hydrogen ion concentration in Sample C?",
      "choices": [
       "3.2 × 10⁻⁹ M",
       "3.2 × 10⁻⁸ M",
       "5.5 × 10⁻⁹ M",
       "3.2 × 10⁻⁶ M"
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "Step 1, potential → pH. With S = 58 mV (from the buffers), Equation 1 gives −87 = 58 × (7.00 − pH), so 7.00 − pH = −1.5 and **pH = 8.5**.\nStep 2, pH → [H⁺]. [H⁺] = 10⁻⁸·⁵ = 10⁰·⁵ × 10⁻⁹ ≈ 3.16 × 10⁻⁹ ≈ **3.2 × 10⁻⁹ M** (10⁰·⁵ = √10 ≈ 3.2).\n\n**3.2 × 10⁻⁸ M** splits 10⁻⁸·⁵ as 10⁰·⁵ × 10⁻⁸, which is really 10⁻⁷·⁵.\n**5.5 × 10⁻⁹ M** interpolates linearly between 10⁻⁸ and 10⁻⁹, but pH is a log scale.\n**3.2 × 10⁻⁶ M** drops the minus sign on −87 mV (pH 5.5); it is also [OH⁻] at pH 8.5, so it catches anyone who computes pOH by mistake.",
      "id": "p_cpp1_2_q2"
     },
     {
      "q": "When Half-reaction 1 proceeds as written, which species is reduced?",
      "choices": [
       "Ag⁺ in AgCl, which goes from +1 to 0",
       "Cl⁻ in AgCl, which goes from −1 to 0",
       "Ag metal, which goes from 0 to +1",
       "Cl⁻ in solution, which goes from 0 to −1"
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "In AgCl, chloride is −1, so silver is **+1**. In the products, Ag(s) is an element with oxidation state **0**. Silver gains the electron shown in the half-reaction: **reduction is gain of electrons**, and its oxidation state drops from +1 to 0.\n\nChloride is −1 in AgCl and still −1 as Cl⁻(aq), so it is neither oxidized nor reduced.\nAg going from 0 to +1 would be oxidation, which is the reverse of the half-reaction as written.",
      "id": "p_cpp1_2_q3"
     },
     {
      "q": "The electrode read pH 12.0 for Sample D, whose true pH is 13.00. The technician suspects the glass is responding to the high [Na⁺]. Which additional measurement would best test this hypothesis?",
      "choices": [
       "Measuring a 0.10 M solution of tetramethylammonium hydroxide, a strong base with no small cation",
       "Recalibrating with only the pH 4.00 and 7.00 buffers and remeasuring Sample D",
       "Measuring a 0.010 M NaOH solution, whose pH is lower",
       "Remeasuring Sample D at 37°C, where the slope S is larger"
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "A good test changes **only the suspected variable**. Tetramethylammonium hydroxide gives the same [OH⁻] (0.10 M, pH 13.00) but replaces Na⁺ with a bulky cation that cannot enter the glass surface. If the reading is now correct, the error came from **Na⁺ (the \"alkaline\" or sodium error)**: the glass mistakes some Na⁺ for H⁺ when [H⁺] is tiny, so the reading is too low.\n\nRecalibrating with acidic buffers changes the slope used but doesn't separate the effect of Na⁺ from the effect of high pH.\nDiluting NaOH lowers [Na⁺] and raises [H⁺] at the same time, so any change can't be pinned on Na⁺.\nChanging the temperature changes S for every reading; it doesn't address Na⁺ at all.",
      "id": "p_cpp1_2_q4"
     }
    ]
   },
   {
    "id": "p_cpp1_3",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4A",
     "5E",
     "4B"
    ],
    "title": "Loads on the Elbow During Strength Training",
    "passage": "A sports-medicine laboratory studied loads on the elbow in high-school pitchers who were recovering from overuse injuries. In the static model the team used, the forearm acts as a lever with its pivot at the elbow joint. The biceps tendon attaches to the forearm 4.0 cm from the elbow, the center of mass of the forearm and hand (combined weight 20 N) lies 16 cm from the elbow, and a dumbbell held in the hand is 32 cm from the elbow. When the forearm is held horizontal, the biceps is assumed to pull straight up, and the humerus exerts whatever force at the elbow is needed for equilibrium.\n\nIn the first test, each athlete held a 50 N dumbbell with the forearm horizontal for 10 s and then performed slow curls, raising the dumbbell 0.30 m per repetition. The researchers estimated metabolic cost by assuming that skeletal muscle converts about 25% of the free energy of ATP hydrolysis into mechanical work and that ΔG for ATP hydrolysis under cellular conditions is about −50 kJ/mol.\n\nIn the second test, each athlete threw a 0.15 kg ball. High-speed video showed that a typical ball left the hand at 20 m/s at an angle of 30° above the horizontal. Air resistance was neglected, and g was taken as 10 m/s².\n\nThroughout both tests, arterial blood pressure was measured with an inflatable cuff on the upper arm, positioned level with the heart. Blood has a density of about 1050 kg/m³, and 1 mmHg ≈ 133 Pa.",
    "questions": [
     {
      "id": "p_cpp1_3_q1b",
      "q": "At the highest point of its flight, what is the speed of the ball thrown in the second test?",
      "choices": [
       "0 m/s",
       "10 m/s",
       "17 m/s",
       "20 m/s"
      ],
      "ans": 2,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "With no air resistance, the **horizontal velocity stays constant**; only the vertical part is slowed by gravity. At the top the vertical velocity is zero, so the speed equals the horizontal component: 20 m/s × cos 30° ≈ 20 × 0.87 ≈ **17 m/s**.\n**0 m/s** forgets the horizontal motion.\n**10 m/s** is the starting vertical component (20 × sin 30°), which is the part that becomes zero.\n**20 m/s** is the launch speed, which would only hold if gravity did no work on the way up."
     },
     {
      "q": "For the typical throw described in the passage, how high above its release point does the ball rise?",
      "choices": [
       "5.0 m",
       "10 m",
       "15 m",
       "20 m"
      ],
      "ans": 0,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Only the **vertical** component of velocity matters for height: vy = 20 sin 30° = 20 × 0.5 = 10 m/s.\nAt the top, vy = 0, so vy² = 2gh gives h = (10 m/s)² ÷ (2 × 10 m/s²) = **5.0 m**.\n(Equivalently, the ball rises for t = 10/10 = 1.0 s at an average vertical speed of 5 m/s.)\n\n**10 m** multiplies vy by the rise time (10 × 1.0) without the ½ for average speed.\n**15 m** uses the horizontal component (20 cos 30° ≈ 17 m/s; 17² ÷ 20 ≈ 15 m).\n**20 m** uses the full 20 m/s speed as if the ball were thrown straight up.",
      "id": "p_cpp1_3_q2"
     },
     {
      "q": "Considering only the work done to raise the dumbbell, approximately how many moles of ATP must be hydrolyzed for one curl?",
      "choices": [
       "7.5 × 10⁻⁵ mol",
       "3.0 × 10⁻⁴ mol",
       "1.2 × 10⁻³ mol",
       "1.2 mol"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "biochemistry",
      "exp": "Work on the dumbbell: W = mgh = (50 N)(0.30 m) = **15 J**.\nAt 25% efficiency, the free energy needed is 15 J ÷ 0.25 = **60 J**.\nEach mole of ATP supplies about 50 kJ = 5.0 × 10⁴ J, so moles of ATP = 60 ÷ (5.0 × 10⁴) = **1.2 × 10⁻³ mol**.\n\n**3.0 × 10⁻⁴ mol** (15 ÷ 50,000) assumes 100% efficiency.\n**7.5 × 10⁻⁵ mol** multiplies by 0.25 instead of dividing, so it claims the muscle needs less energy than the work it does.\n**1.2 mol** forgets to convert kJ to J.",
      "id": "p_cpp1_3_q3"
     },
     {
      "q": "In a pilot session, pressure was measured with a wrist cuff while the athlete held the dumbbell overhead, with the wrist about 0.40 m above the heart. These readings were about 30 mmHg lower than upper-arm readings. Which change would best remove this systematic error?",
      "choices": [
       "Lowering the wrist to heart level during each reading, because pressure in a fluid column decreases with height",
       "Using a wider wrist cuff, because a larger area lowers the cuff pressure needed to stop flow",
       "Taking readings while the arm is moving upward, because faster blood flow raises the measured pressure",
       "Inflating the wrist cuff twice as fast, because slow inflation lets blood drain from the raised hand"
      ],
      "ans": 0,
      "cat": "4B",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Blood is a fluid column, so the pressure at a point above the heart is lower by **ΔP = ρgh** = (1050 kg/m³)(10 m/s²)(0.40 m) = 4200 Pa. Converting, 4200 ÷ 133 ≈ **32 mmHg**, which matches the observed difference. The fix is to measure **at the same height as the heart**, the reference level used for the upper-arm cuff.\n\nCuff width affects accuracy somewhat, but it cannot remove a 30 mmHg offset caused by height.\nBy Bernoulli's principle, faster flow lowers rather than raises static pressure, and it adds a new variable.\nInflation speed has nothing to do with the hydrostatic difference.",
      "id": "p_cpp1_3_q4"
     }
    ]
   },
   {
    "id": "p_cpp1_4",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5B",
     "5C",
     "5D"
    ],
    "title": "Resolving the Enantiomers of Naproxen",
    "passage": "Naproxen is a nonsteroidal anti-inflammatory drug (NSAID) that inhibits the cyclooxygenase enzymes that make prostaglandins. Like ibuprofen, it is a 2-arylpropanoic acid with one stereocenter on the carbon α to the carboxyl group. The S enantiomer, Compound 1, is responsible for nearly all of the anti-inflammatory activity, so naproxen is sold as the single S enantiomer. The R enantiomer, Compound 2, is much weaker against cyclooxygenase. Pure Compound 1 has a specific rotation of +66°, measured with the sodium D line, and a pKa of 4.2.\n\nIn one manufacturing route, racemic naproxen is made first and then resolved. The racemate is dissolved in warm methanol with 1 equivalent of a single enantiomer of a chiral amine, (R)-1-phenylethylamine (Compound 3). Proton transfer gives two ammonium carboxylate salts. On cooling, the less soluble salt crystallizes and is collected by filtration. Acidifying the crystals with aqueous HCl and extracting with ethyl acetate returns free naproxen, enriched in Compound 1, while Compound 3 stays in the aqueous layer as its ammonium chloride.\n\nThe naproxen left in the filtrate is enriched in Compound 2. Rather than discard it, the manufacturer heats it with a strong base, which converts it to racemic naproxen that can be fed back into the resolution.\n\nA chemist tested one batch of naproxen recovered from the crystallized salt. A solution of 1.00 g in 100 mL of chloroform in a 1.00 dm polarimeter cell gave an observed rotation of +0.528°, which corresponds to a specific rotation of +52.8°.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Compound 1, (S)-naproxen",
      "parts": [
       "cpp1-s-naproxen"
      ]
     },
     {
      "after": 1,
      "caption": "Figure 2 Compound 3, the resolving agent",
      "parts": [
       "cpp1-r-phenylethylamine"
      ]
     }
    ],
    "questions": [
     {
      "q": "Which structure is Compound 2?",
      "choices": [
       "(R)-naproxen",
       "(S)-naproxen",
       "3-(6-methoxynaphthalen-2-yl)propanoic acid",
       "(S)-O-desmethylnaproxen"
      ],
      "choiceFigs": [
       "cpp1-r-naproxen",
       "cpp1-s-naproxen",
       "cpp1-arylpropanoic-linear",
       "cpp1-s-desmethylnaproxen"
      ],
      "ans": 0,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Compound 2 is the **R enantiomer**: the same atoms and connectivity as Compound 1, with the configuration at the α carbon reversed. Rank the groups on the stereocenter: **–COOH > aryl > –CH₃ > –H** (the carboxyl carbon has three bonds to O; the ring carbon has bonds to C only). With H pointing away, the order 1 → 2 → 3 runs clockwise in the R structure.\n\nThe S structure is Compound 1 itself.\nThe 3-arylpropanoic acid has the same formula, C₁₄H₁₄O₃, but the aryl group is on the β carbon, so it is a constitutional isomer with no stereocenter.\nO-desmethylnaproxen has OH in place of OCH₃, so it is a different compound (a metabolite), and its stereocenter is still S.",
      "id": "p_cpp1_4_q1"
     },
     {
      "q": "What percentage of the naproxen in the batch tested by the chemist is Compound 1?",
      "choices": [
       "10%",
       "20%",
       "80%",
       "90%"
      ],
      "ans": 3,
      "cat": "5B",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "**Enantiomeric excess = observed rotation ÷ rotation of the pure enantiomer** = 52.8° ÷ 66° = 0.80, so ee = 80%.\nAn 80% ee means 80% of the sample is excess S and the remaining 20% is racemic (10% S + 10% R).\nCompound 1 = 80% + 10% = **90%**; Compound 2 = 10%.\n\n**80%** is the ee itself, not the fraction of S.\n**20%** is the racemic portion.\n**10%** is the fraction of Compound 2.",
      "id": "p_cpp1_4_q2"
     },
     {
      "q": "To cut costs, a chemist proposes using racemic 1-phenylethylamine in place of Compound 3. Would this change still allow naproxen to be resolved by crystallization?",
      "choices": [
       "No, because the salts would form pairs of enantiomers with identical solubilities, so the crystals would be racemic.",
       "Yes, because the salts would still be diastereomers with different solubilities.",
       "Yes, because proton transfer from a carboxylic acid to an amine does not depend on configuration.",
       "No, because a racemic amine cannot form a salt with a carboxylic acid."
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Resolution works only when the two naproxen enantiomers end up in **diastereomeric** salts. With pure (R)-amine, the salts are (S)-acid·(R)-amine and (R)-acid·(R)-amine, which are diastereomers with different solubilities. With racemic amine, four salts form: (S,R) and (R,S) are an enantiomeric pair, and so are (S,S) and (R,R). **Enantiomers have identical solubilities**, so whichever salt pair crystallizes contains equal amounts of S- and R-naproxen. No enrichment is possible.\n\nThe \"still diastereomers\" choice ignores that every salt now has an enantiomer present in equal amount.\nIt's true that proton transfer doesn't depend on configuration, but that is why salts form, not why they separate.\nAny amine, racemic or not, can accept a proton from a carboxylic acid.",
      "id": "p_cpp1_4_q3"
     },
     {
      "q": "Heating Compound 2 with a strong base converts it to racemic naproxen because the base:",
      "choices": [
       "removes the α hydrogen, giving a planar enolate that is reprotonated on either face.",
       "removes the carboxyl hydrogen, giving a carboxylate whose resonance makes the stereocenter planar.",
       "cleaves the methyl ether, giving a phenoxide that inverts the stereocenter.",
       "attacks the stereocenter by an SN2 reaction, inverting it to Compound 1."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "X",
      "exp": "The stereocenter is the **α carbon**, and its C–H is acidic because removing it gives an anion stabilized by the carbonyl (and here also by the aromatic ring). The resulting **enolate is sp² and planar**, so the original configuration is lost. Protonation from the top or bottom face is equally likely, giving a **50:50 (racemic)** mixture.\n\nThe carboxyl O–H is removed first, but the carboxylate's resonance involves only the C and two O atoms; the α carbon stays sp³ and keeps its configuration.\nThe methoxy group is far from the stereocenter, and changing it can't affect the configuration.\nSN2 at the stereocenter would need a leaving group (there is none, only H), and inversion would give pure Compound 1, not a racemate.",
      "id": "p_cpp1_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp1_6",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5A",
     "4E",
     "5D"
    ],
    "title": "pH-Dependent Solubility and Stability of Aspirin",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Structure of aspirin (Compound 1)",
      "parts": [
       "aspirin"
      ]
     }
    ],
    "passage": "Aspirin (acetylsalicylic acid, Compound 1, molar mass 180 g/mol) is a weak carboxylic acid with a pKa of 3.5. Only the neutral form crosses cell membranes readily, so the ionization state of aspirin affects both how much of a dose dissolves and how quickly it is absorbed along the digestive tract, where the pH ranges from about 1.5 in the stomach to about 6.5 in the small intestine.\n\nIn moist air, aspirin slowly hydrolyzes at its ester group, and an old tablet that smells of vinegar has partly decomposed. Pharmaceutical chemists therefore test tablet stability as well as solubility.\n\nTo study solubility, researchers stirred excess powdered Compound 1 in a series of buffers at 25°C until equilibrium was reached, filtered each mixture, and measured the dissolved aspirin by UV absorbance. Buffers below pH 2 were made from dilute HCl and KCl, and those from pH 2.5 to 5.0 from citrate; all had the same ionic strength. Each measurement was made in triplicate, and the averages are shown in Figure 2. The total solubility S at each pH follows S = S₀(1 + 10^(pH − pKa)), where S₀ is the solubility of the neutral form.",
    "figure": {
     "type": "line",
     "caption": "Figure 2 Equilibrium solubility of Compound 1 at 25°C",
     "x": {
      "label": "pH",
      "min": 1,
      "max": 5,
      "step": 0.5
     },
     "y": {
      "label": "Solubility (g/L)",
      "min": 0,
      "max": 120,
      "step": 20
     },
     "series": [
      {
       "name": "Compound 1",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         1.0,
         3.3
        ],
        [
         2.0,
         3.4
        ],
        [
         2.5,
         3.6
        ],
        [
         3.0,
         4.3
        ],
        [
         3.5,
         6.6
        ],
        [
         4.0,
         13.7
        ],
        [
         4.5,
         36.3
        ],
        [
         5.0,
         107.6
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "id": "p_cpp1_6_q1",
      "q": "What percentage of the aspirin dissolved in the small intestine (pH 6.5) is in the ionized form?",
      "choices": [
       "0.1%",
       "50%",
       "99%",
       "99.9%"
      ],
      "ans": 3,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Use **Henderson–Hasselbalch**: [A⁻]/[HA] = 10^(pH − pKa) = 10^(6.5 − 3.5) = 10³ = 1000. Out of every 1001 molecules, 1000 are ionized: 1000 ÷ 1001 ≈ **99.9%**.\n**99%** is the answer for a 2-unit difference (a ratio of 100 to 1).\n**50%** would need pH = pKa.\n**0.1%** is the fraction still neutral, not the ionized fraction."
     },
     {
      "id": "p_cpp1_6_q2",
      "q": "A standard tablet contains 325 mg of Compound 1. Approximately how many moles of aspirin is that?",
      "choices": [
       "5.5 × 10⁻⁴ mol",
       "1.8 × 10⁻³ mol",
       "0.55 mol",
       "1.8 mol"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "n = mass ÷ molar mass = 0.325 g ÷ 180 g/mol = **1.8 × 10⁻³ mol**. Convert mg to g first.\n**1.8 mol** forgets the mg → g conversion.\n**0.55 mol** and **5.5 × 10⁻⁴ mol** divide the molar mass by the mass (the ratio upside down)."
     },
     {
      "id": "p_cpp1_6_q3",
      "q": "Which products form when the ester group of Compound 1 is hydrolyzed?",
      "choices": [
       "Salicylic acid and acetic acid",
       "Salicylic acid and ethanol",
       "Phenol and acetic acid",
       "Benzoic acid and methanol"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Aspirin is the **acetyl ester** of salicylic acid's phenolic OH. Water splits the ester into the acid that carries the phenol (**salicylic acid**) and the acyl part as a carboxylic acid (**acetic acid**), which is the vinegar smell the passage mentions.\n**Ethanol** or **methanol** would come from an ethyl or methyl ester, but here the ester's alcohol part is the phenol of salicylic acid.\n**Phenol** alone would mean losing the ring's COOH group, which hydrolysis doesn't touch."
     },
     {
      "id": "p_cpp1_6_q4",
      "q": "Based on Figure 2, the solubility of Compound 1 at pH 4.5 is approximately how many times its solubility at pH 1.0?",
      "choices": [
       "4",
       "11",
       "33",
       "3200"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 4",
      "diff": "X",
      "exp": "Read the graph: about **36 g/L** at pH 4.5 and about **3.3 g/L** at pH 1.0. 36 ÷ 3.3 ≈ **11**. The passage's equation agrees: at pH 4.5, 1 + 10^(4.5 − 3.5) = 11, and at pH 1.0 nearly all aspirin is neutral, so S ≈ S₀.\n**4** is the factor at pH 4.0.\n**33** is the factor at pH 5.0.\n**3200** is 10^(4.5 − 1.0), which wrongly treats the solubility as if it scaled with the pH difference from pH 1.0 instead of with the pH above the pKa."
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "At pH 7.4, the side chain of which amino acid carries a net positive charge in most molecules?",
    "choices": [
     "Lysine",
     "Histidine",
     "Aspartate",
     "Tyrosine"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "A side chain is mostly protonated when the pH is below its pKa. **Lysine's ε-amino group has a pKa of about 10.5**, so at pH 7.4 it is almost entirely –NH₃⁺.\n\nHistidine's imidazole has a pKa of about 6.0, so at pH 7.4 only a few percent of molecules are protonated; most are neutral. This is the tempting choice, because histidine is \"basic.\"\nAspartate's carboxyl (pKa ≈ 3.9) is deprotonated and negative.\nTyrosine's phenol (pKa ≈ 10) is protonated and neutral.",
    "id": "cp_half_1_sa1"
   },
   {
    "q": "Lactase deficiency causes intolerance to lactose because the enzyme cannot hydrolyze which bond?",
    "choices": [
     "A β(1→4) glycosidic bond between galactose and glucose",
     "An α(1→4) glycosidic bond between two glucose units",
     "An α(1→2) glycosidic bond between glucose and fructose",
     "A β(1→4) glycosidic bond between two glucose units"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "Lactose, the sugar of milk, is **galactose β(1→4) glucose**: C-1 of galactose in the β configuration is linked through oxygen to C-4 of glucose. Lactase is the brush-border β-galactosidase that breaks this bond.\n\nGlucose α(1→4) glucose is maltose, digested by maltase.\nThe glucose–fructose linkage (α1↔β2) is sucrose.\nGlucose β(1→4) glucose is cellobiose, the repeating unit of cellulose, which humans can't digest at all.",
    "id": "cp_half_1_sa2"
   },
   {
    "q": "Which compound reacts fastest with water at room temperature?",
    "choices": [
     "Acetyl chloride",
     "Acetic anhydride",
     "Ethyl acetate",
     "N-Methylpropanamide"
    ],
    "choiceFigs": [
     "acetyl-chloride",
     "acetic-anhydride",
     "ethyl-acetate",
     "n-methylpropanamide"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "organic_chem",
    "exp": "Hydrolysis is a **nucleophilic acyl substitution**, and its rate depends on how good the leaving group is and how electrophilic the carbonyl is. The reactivity order is **acid chloride > anhydride > ester > amide**. Cl⁻ is the weakest base and so the best leaving group, and chlorine donates little electron density by resonance, so acetyl chloride reacts vigorously with water.\n\nAcetic anhydride reacts too, but more slowly (acetate is a poorer leaving group than Cl⁻).\nEsters need acid or base catalysis to hydrolyze at a useful rate.\nAmides are the least reactive, because nitrogen donates its lone pair strongly into the carbonyl, which is why peptide bonds are stable.",
    "id": "cp_half_1_sa3"
   },
   {
    "q": "When 4.0 g of NH₄NO₃ (molar mass 80 g/mol) dissolves in 100 g of water in a coffee-cup calorimeter, the temperature falls by 3.0°C. Assuming the solution's specific heat is 4.2 J/(g·°C) and its mass is about 100 g, what is ΔH of solution for NH₄NO₃?",
    "choices": [
     "−25 kJ/mol",
     "+1.3 kJ/mol",
     "+25 kJ/mol",
     "+250 kJ/mol"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Heat lost by the water: q = mcΔT = (100 g)(4.2 J/g·°C)(3.0°C) = **1260 J**. The water got colder, so the dissolving process **absorbed** this heat: it is **endothermic**, and ΔH is positive.\nMoles of NH₄NO₃ = 4.0 g ÷ 80 g/mol = 0.050 mol.\nΔH = +1260 J ÷ 0.050 mol = +25,200 J/mol ≈ **+25 kJ/mol**.\n\n**−25 kJ/mol** has the sign backward (a temperature drop means the solute took heat in).\n**+1.3 kJ/mol** is the total heat in kJ, not divided by moles.\n**+250 kJ/mol** is a factor-of-10 slip, such as using 0.0050 mol.",
    "id": "cp_half_1_sa4"
   },
   {
    "q": "During a long run, an athlete loses 0.30 kg of sweat that evaporates from the skin (latent heat of vaporization ≈ 2.4 × 10³ kJ/kg). If this heat had instead stayed in the athlete's 60 kg body (specific heat ≈ 4.0 kJ/(kg·°C)), by about how much would body temperature have risen?",
    "choices": [
     "0.42°C",
     "3.0°C",
     "12°C",
     "30°C"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "Heat removed by evaporation: Q = mL = (0.30 kg)(2.4 × 10³ kJ/kg) = **720 kJ**.\nIf kept in the body: ΔT = Q ÷ (mc) = 720 kJ ÷ (60 kg × 4.0 kJ/kg·°C) = 720 ÷ 240 = **3.0°C**, a dangerous rise, which is why sweating matters so much.\n\n**0.42°C** uses the latent heat of fusion (≈334 kJ/kg, so Q ≈ 100 kJ) instead of vaporization.\n**12°C** divides 720 kJ by the mass alone and forgets the specific heat.\n**30°C** is a factor-of-10 slip in the division.",
    "id": "cp_half_1_sa5"
   },
   {
    "q": "The iron in deoxyhemoglobin is Fe²⁺. What is the ground-state electron configuration of Fe²⁺ (atomic number 26)?",
    "choices": [
     "[Ar]3d⁶",
     "[Ar]4s²3d⁴",
     "[Ar]4s²3d⁶",
     "[Ar]4s¹3d⁵"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Neutral Fe (26 electrons) is [Ar]4s²3d⁶. When a transition metal forms a cation, it **loses its 4s electrons before its 3d electrons**, because once the 3d level is occupied, the 4s electrons are the outermost and highest in energy. Removing two electrons gives **[Ar]3d⁶**.\n\n[Ar]4s²3d⁴ removes the electrons from 3d, which is the common slip of reversing the filling order.\n[Ar]4s²3d⁶ is neutral iron.\n[Ar]4s¹3d⁵ has the right number of electrons (24) but keeps one 4s electron, imitating chromium's half-filled exception; Fe²⁺ has lost both 4s electrons.",
    "id": "cp_half_1_sa6"
   },
   {
    "id": "cp_half_1_sa7b",
    "q": "Which ion has the same ground-state electron configuration as neon?",
    "choices": [
     "K⁺",
     "Na⁺",
     "Cl⁻",
     "Ca²⁺"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Neon has 10 electrons (1s² 2s² 2p⁶). **Na** (11 electrons) loses one to become **Na⁺ with 10**, the same configuration.\n**K⁺**, **Cl⁻** and **Ca²⁺** each have 18 electrons, matching argon, not neon."
   },
   {
    "q": "Newborn jaundice is treated with blue light of wavelength 450 nm, which converts bilirubin into a more water-soluble isomer. What is the energy of one photon of this light? (h = 6.6 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s)",
    "choices": [
     "4.4 × 10⁻²⁸ J",
     "4.4 × 10⁻²² J",
     "4.4 × 10⁻¹⁹ J",
     "4.4 × 10⁻¹⁶ J"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "Use **E = hc/λ** with λ in meters: 450 nm = 4.5 × 10⁻⁷ m.\nhc = (6.6 × 10⁻³⁴)(3.0 × 10⁸) = 1.98 × 10⁻²⁵ J·m\nE = 1.98 × 10⁻²⁵ ÷ 4.5 × 10⁻⁷ = 0.44 × 10⁻¹⁸ = **4.4 × 10⁻¹⁹ J** (about 2.8 eV).\n\nAll the distractors have the right digits and come from unit slips in λ:\n**4.4 × 10⁻²⁸ J** uses λ = 450 (no conversion from nm).\n**4.4 × 10⁻²² J** converts nm to mm (4.5 × 10⁻⁴) instead of m.\n**4.4 × 10⁻¹⁶ J** uses 10⁻¹² m per nm (that is a picometer).",
    "id": "cp_half_1_sa8"
   },
   {
    "q": "A dentist holds a flat mouth mirror behind a patient's upper front teeth to see their back surfaces. The image of the teeth seen in the mirror is:",
    "choices": [
     "virtual, upright and the same size as the teeth.",
     "real, inverted and the same size as the teeth.",
     "virtual, upright and smaller than the teeth.",
     "virtual, upright and larger than the teeth."
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "Light from the teeth reflects off a **plane mirror** and spreads out as if it came from a point **behind** the mirror. No light actually reaches that point, so the image is **virtual**. A flat mirror has no focal point (f = ∞), so 1/do + 1/di = 0 gives di = −do: the image is as far behind the mirror as the teeth are in front of it, and the magnification is m = −di/do = **+1** (**upright, same size**).\n\n**Real, inverted and the same size** describes a concave mirror with the object at its center of curvature (2f).\n**Smaller** describes a convex mirror, such as a wide-angle security mirror.\n**Larger** describes a concave magnifying mirror with the object inside its focal point; some dental mirrors are made this way, but not a flat one.",
    "id": "cp_half_1_sa9"
   },
   {
    "q": "Blood flows steadily through a horizontal artery. At a plaque, the radius of the open channel is half its normal value. Compared with the normal segment, how do the blood speed and pressure in the narrowed segment change? (Treat blood as an ideal fluid.)",
    "choices": [
     "The speed quadruples and the pressure decreases.",
     "The speed doubles and the pressure decreases.",
     "The speed quadruples and the pressure increases.",
     "The speed falls to one-fourth and the pressure increases."
    ],
    "ans": 0,
    "cat": "4B",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "physics",
    "exp": "**Continuity (A₁v₁ = A₂v₂)**: the area of a circle is πr², so halving the radius cuts the area to **one-fourth**. The same volume per second must pass, so the speed rises **4-fold**.\n**Bernoulli's equation** for a horizontal tube: P + ½ρv² is constant, so where the speed is higher, the **pressure is lower**.\n\n\"Doubles\" scales speed with the radius instead of with the area (r²).\n\"Pressure increases\" is the intuitive but wrong idea that squeezing fluid raises its pressure.\n\"Falls to one-fourth\" inverts the continuity equation.",
    "id": "cp_half_1_sa10"
   }
  ]
 },
 {
  "id": "cp_half_2",
  "title": "Chem/Phys Quiz 2",
  "order": [
   "p_cpp2_1",
   "p_cpp2_2",
   4,
   "p_cpp2_3",
   "p_cpp2_4",
   3,
   "p_cpp2_5",
   3
  ],
  "passages": [
   {
    "id": "p_cpp2_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5B",
     "5E"
    ],
    "title": "Fatty-Acyl Chains and Bilayer Phase Transitions",
    "passage": "Biological membranes must be fluid enough for proteins to diffuse within them, yet ordered enough to act as a barrier. The balance depends largely on the fatty-acyl chains of membrane phospholipids. Saturated chains such as stearic acid (Compound 1, 18:0) are fully extended and pack tightly through London dispersion forces. Oleic acid (Compound 2) has one cis double bond between C9 and C10, which puts a rigid bend of about 30° into the chain. Elaidic acid (Compound 3) has the same formula and the same double-bond position, but its double bond is trans, so the chain is nearly straight. Elaidic acid is the main trans fat formed when vegetable oils are partially hydrogenated.\n\nTo compare how these chains affect bilayer packing, researchers prepared vesicles from five synthetic phosphatidylcholines (PCs), each carrying two identical acyl chains. Each lipid was hydrated in buffer and heated at 1°C/min in a differential scanning calorimeter (DSC), which records the extra heat the sample absorbs, relative to a buffer-only reference, as the temperature rises. At the main transition temperature (Tm), the bilayer changes from an ordered gel phase, in which the chains are fully extended, to a fluid liquid-crystalline phase, in which rotation about C–C bonds lets the chains become disordered. The area under the DSC peak gives the molar transition enthalpy (ΔH). The melting point of each free fatty acid was also measured.\n\nThe results are shown in Table 1. The researchers noted that bacteria and fish grown at low temperature raise the proportion of unsaturated chains in their membranes, a response called homeoviscous adaptation that keeps the membrane fluid in the cold.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Structures of Compounds 1–3",
      "parts": [
       "stearic-acid",
       "oleic-acid",
       "elaidic-acid"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Main transition of PC bilayers and melting points of the free fatty acids",
     "columns": [
      "Lipid",
      "Acyl chains",
      "Tm (°C)",
      "ΔH (kJ/mol)",
      "Free acid mp (°C)"
     ],
     "rows": [
      [
       "DMPC",
       "14:0",
       "24",
       "25",
       "54"
      ],
      [
       "DPPC",
       "16:0",
       "41",
       "35",
       "63"
      ],
      [
       "DSPC",
       "18:0",
       "55",
       "44",
       "69"
      ],
      [
       "DOPC",
       "18:1 cis-Δ9",
       "−17",
       "32",
       "13"
      ],
      [
       "DEPC",
       "18:1 trans-Δ9",
       "12",
       "33",
       "45"
      ]
     ]
    },
    "questions": [
     {
      "q": "According to the passage, DOPC has a much lower Tm than DSPC mainly because the cis double bonds in DOPC:",
      "choices": [
       "introduce bends that reduce van der Waals contact between neighboring chains.",
       "form hydrogen bonds with water that stabilize the fluid phase.",
       "increase the molar mass of each acyl chain.",
       "make the chains polar enough to extend into the aqueous phase."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "Both lipids have 18-carbon chains, so the difference is the **cis double bond**. The passage says it puts a rigid ~30° bend in the chain. Bent chains can't line up side by side, so there are fewer **London dispersion (van der Waals) contacts** to break, and less thermal energy is needed to melt the gel phase: Tm drops from 55°C to −17°C.\n\nA C=C bond is nonpolar and can't hydrogen bond with water.\nA double bond removes two H atoms, so it slightly lowers the molar mass, and a heavier chain would raise Tm anyway.\nThe hydrocarbon tail stays hydrophobic and buried in the bilayer.",
      "id": "p_cpp2_1_q1"
     },
     {
      "q": "Which conclusion is best supported by the data in Table 1?",
      "choices": [
       "A trans double bond lowers Tm less than a cis double bond at the same position does.",
       "Lengthening a saturated acyl chain by two carbons lowers Tm.",
       "A cis double bond increases the enthalpy of the gel-to-fluid transition.",
       "Each PC has a higher Tm than the melting point of its free fatty acid."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "M",
      "exp": "Compare the three 18-carbon lipids. Saturated DSPC melts at 55°C. The **trans** isomer DEPC melts at 12°C (43°C lower), and the **cis** isomer DOPC melts at −17°C (72°C lower). So a trans double bond lowers Tm **less** than a cis one, which fits a nearly straight trans chain packing better than a bent cis chain.\n\nLengthening the chain **raises** Tm: 24 → 41 → 55°C for 14:0 → 16:0 → 18:0.\nThe cis bond **lowers** ΔH (44 → 32 kJ/mol), since there are fewer contacts to disrupt.\nEvery PC melts **below** its free acid (for example, DPPC 41°C vs palmitic acid 63°C).",
      "id": "p_cpp2_1_q2"
     },
     {
      "q": "Compounds 2 and 3 are best described as:",
      "choices": [
       "diastereomers, because they are stereoisomers that are not mirror images.",
       "enantiomers, because they are nonsuperimposable mirror images.",
       "constitutional isomers, because their atoms are connected in a different order.",
       "conformers, because they interconvert by rotation about the C9–C10 bond."
      ],
      "ans": 0,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "organic_chem",
      "exp": "Oleic and elaidic acid have the same formula and the **same connectivity** (the double bond is between C9 and C10 in both), so they are stereoisomers. They differ only in cis/trans (Z/E) geometry, and neither molecule is the mirror image of the other (both are achiral). Cis–trans isomers are **diastereomers**.\n\nEnantiomers must be mirror images, which requires chirality; these molecules have no stereocenter.\nConstitutional isomers would differ in bonding order, such as a double bond at a different carbon.\nThe C9–C10 bond is a **double bond**, and its **π component** prevents rotation, so the two forms can't interconvert by simple rotation; that's why trans fats form only through a chemical reaction such as partial hydrogenation.",
      "id": "p_cpp2_1_q3"
     },
     {
      "q": "A DSC sample contained 1.47 mg of DPPC (molar mass 734 g/mol). Based on Table 1, how much heat did the sample absorb during its main transition?",
      "choices": [
       "0.070 mJ",
       "7.0 mJ",
       "70 mJ",
       "70 J"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "First find moles: 1.47 mg = 1.47 × 10⁻³ g, and 1.47 × 10⁻³ g ÷ 734 g/mol = **2.0 × 10⁻⁶ mol** (2.0 μmol). Then use **q = nΔH** with ΔH for DPPC from Table 1: q = 2.0 × 10⁻⁶ mol × 35 × 10³ J/mol = 0.070 J = **70 mJ**.\n\n**0.070 mJ** uses 35 J/mol, forgetting to convert kJ to J.\n**7.0 mJ** comes from a factor-of-10 slip in converting mg to g.\n**70 J** treats 1.47 mg as 1.47 g (a 10³ slip).",
      "id": "p_cpp2_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp2_2",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4D",
     "4B",
     "4A"
    ],
    "title": "Doppler Ultrasound of Carotid Blood Flow",
    "passage": "Doppler ultrasound measures the speed of blood without entering the vessel. A transducer containing a piezoelectric crystal emits sound at a fixed frequency f₀, typically 2–10 MHz. Red blood cells scatter part of the beam back toward the transducer, and because the cells are moving, the returning echo is shifted in frequency. For cells moving at speed v, the shift is given by Equation 1.\n\nΔf = 2f₀v cos θ / c\nEquation 1\n\nHere θ is the angle between the ultrasound beam and the direction of flow, and c is the speed of sound in soft tissue, taken as 1500 m/s. The factor of 2 arises because the moving cells act first as a moving receiver and then as a moving source. Δf is positive when blood moves toward the transducer, and it usually falls in the audible range, so the machine can also play it through a speaker.\n\nPulsed-wave Doppler adds depth information. The transducer emits a short burst and then listens only during a brief window that opens after a set delay. Because the round-trip time of an echo depends on how deep the reflector is, the delay selects a small sample volume at one chosen depth, such as the center of a single artery.\n\nIn one study, a 5.0 MHz transducer was held at θ = 60° to the common carotid artery of a healthy volunteer. The artery's internal diameter was 6.0 mm, its peak systolic velocity was 0.60 m/s, and its end-diastolic velocity was 0.20 m/s. The sonographer then examined a patient with a plaque in the internal carotid artery. Guidelines classify a stenosis as severe when peak systolic velocity in the narrowed segment exceeds 2.3 m/s, because blood must speed up to pass through a smaller cross section. Soft tissue attenuates ultrasound by about 0.5 dB per cm per MHz, so higher frequencies give finer resolution but penetrate less deeply.",
    "questions": [
     {
      "q": "What Doppler shift was produced by peak systolic flow in the volunteer's common carotid artery?",
      "choices": [
       "1.0 kHz",
       "2.0 kHz",
       "3.5 kHz",
       "4.0 kHz"
      ],
      "ans": 1,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Use **Equation 1** with f₀ = 5.0 × 10⁶ Hz, v = 0.60 m/s, cos 60° = 0.50 and c = 1500 m/s:\nΔf = 2(5.0 × 10⁶)(0.60)(0.50) ÷ 1500 = 3.0 × 10⁶ ÷ 1500 = 2000 Hz = **2.0 kHz**.\n\n**1.0 kHz** drops the factor of 2 (the round trip).\n**3.5 kHz** uses sin 60° (≈ 0.87) instead of cos 60°.\n**4.0 kHz** leaves out the cos θ factor, as if the beam were parallel to the flow.",
      "id": "p_cpp2_2_q1"
     },
     {
      "q": "At the patient's plaque, the internal diameter of the artery narrows to one-half of its value just upstream, where the peak velocity is 0.60 m/s. Assuming steady, incompressible flow, what is the peak velocity in the narrowed segment?",
      "choices": [
       "0.15 m/s",
       "1.2 m/s",
       "2.4 m/s",
       "9.6 m/s"
      ],
      "ans": 2,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "The **continuity equation** says volume flow is the same everywhere: A₁v₁ = A₂v₂. Area depends on the **square** of the diameter (A = πd²/4), so halving the diameter makes the area 1/4 as large, and the velocity must be 4 times larger: 4 × 0.60 m/s = **2.4 m/s**. That exceeds 2.3 m/s, so by the passage's guideline the stenosis is severe.\n\n**1.2 m/s** scales velocity with diameter instead of area.\n**0.15 m/s** applies the ratio backward (fluid speeds up, not slows, in a narrowing).\n**9.6 m/s** uses the fourth power of the diameter, which belongs to Poiseuille's law for resistance, not to continuity.",
      "id": "p_cpp2_2_q2"
     },
     {
      "q": "To center the pulsed-wave sample volume on an artery 3.0 cm below the skin, about how long after emitting a burst should the listening window open?",
      "choices": [
       "20 μs",
       "40 μs",
       "400 μs",
       "4.0 ms"
      ],
      "ans": 1,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "The echo must travel down **and back**, a total distance of 2 × 0.030 m = 0.060 m. At constant speed, t = d/v = 0.060 m ÷ 1500 m/s = 4.0 × 10⁻⁵ s = **40 μs**.\n\n**20 μs** counts only the one-way trip.\n**400 μs** comes from writing 3.0 cm as 0.30 m.\n**4.0 ms** treats 3.0 cm as 3.0 m.",
      "id": "p_cpp2_2_q3"
     },
     {
      "q": "Laboratory protocols require the angle between the beam and the vessel to be 60° or less, rather than close to 90°. Which reason best justifies this requirement?",
      "choices": [
       "Near 90°, cos θ is close to zero, so the shift is small and a small error in the measured angle causes a large error in the calculated velocity.",
       "Near 90°, the factor of 2 in Equation 1 no longer applies, because sound is not scattered back toward the transducer.",
       "Near 90°, the wavelength of the ultrasound in tissue becomes longer, so the resolution of the image is lower.",
       "Near 90°, the blood moves toward the transducer, so the measured shift changes sign and cannot be interpreted."
      ],
      "ans": 0,
      "cat": "4D",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "The machine calculates v = Δf·c ÷ (2f₀ cos θ), so the velocity depends on the **angle the operator enters**. Near 90°, cos θ is tiny and changes steeply: cos 85° ≈ 0.087 and cos 80° ≈ 0.17, so a 5° error in the angle doubles the calculated velocity. At 60°, the same 5° error changes cos θ only from 0.50 to about 0.42 or 0.57. Small angles also give a larger, easier-to-measure Δf.\n\nThe factor of 2 comes from the moving scatterer and does not depend on angle.\nWavelength (λ = c/f) depends only on c and f₀, not on θ.\nThe direction of flow relative to the probe sets the sign of Δf; at exactly 90° the flow is neither toward nor away from the probe.",
      "id": "p_cpp2_2_q4"
     }
    ]
   },
   {
    "id": "p_cpp2_3",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5E",
     "5A",
     "5D"
    ],
    "title": "CO₂ Transport and the Bohr Effect",
    "passage": "About 70% of the CO₂ produced by tissues travels to the lungs as bicarbonate. CO₂ diffuses into red blood cells, where the zinc enzyme carbonic anhydrase speeds its hydration about a million-fold (Reaction 1).\n\nCO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻\nReaction 1\n\nThe HCO₃⁻ leaves the cell in exchange for Cl⁻ (the chloride shift), and much of the H⁺ is taken up by hemoglobin. Hemoglobin binds H⁺ more tightly in its deoxygenated (T) state than in its oxygenated (R) state, mainly through side chains whose pKa values rise when the protein releases O₂. The linkage is summarized by Reaction 2.\n\nHbO₂ + H⁺ ⇌ HbH⁺ + O₂\nReaction 2\n\nThus a fall in pH in active tissue promotes O₂ release (the Bohr effect), and O₂ release in turn helps hemoglobin buffer the H⁺ made from CO₂. About 20% of CO₂ is carried a different way, bound to the N-terminal amino groups of globin chains as carbamate (–NH–COO⁻).\n\nClinically, plasma pH is related to bicarbonate and CO₂ by the Henderson–Hasselbalch equation, using an apparent pKa of 6.1 and a dissolved-CO₂ concentration equal to 0.030 mM per mmHg of pCO₂. A normal arterial sample has [HCO₃⁻] = 24 mM and pCO₂ = 40 mmHg.\n\nTo quantify the Bohr effect, researchers equilibrated suspensions of human red blood cells at 37°C and pH 7.2, 7.4, or 7.6 with gas mixtures of known pO₂ and measured the fractional O₂ saturation of hemoglobin spectrophotometrically. The pO₂ at which hemoglobin is half saturated is called P50. The results are shown in Figure 1.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Fractional O₂ saturation of hemoglobin at three pH values (37°C)",
     "x": {
      "label": "pO₂ (mmHg)",
      "min": 0,
      "max": 100,
      "step": 20
     },
     "y": {
      "label": "Fractional saturation",
      "min": 0,
      "max": 1,
      "step": 0.2
     },
     "series": [
      {
       "name": "pH 7.6",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         0
        ],
        [
         10,
         0.11
        ],
        [
         20,
         0.44
        ],
        [
         22,
         0.5
        ],
        [
         30,
         0.7
        ],
        [
         40,
         0.83
        ],
        [
         50,
         0.9
        ],
        [
         60,
         0.94
        ],
        [
         80,
         0.97
        ],
        [
         100,
         0.98
        ]
       ]
      },
      {
       "name": "pH 7.4",
       "marker": "square",
       "line": "smooth",
       "points": [
        [
         0,
         0
        ],
        [
         10,
         0.06
        ],
        [
         20,
         0.31
        ],
        [
         27,
         0.5
        ],
        [
         30,
         0.57
        ],
        [
         40,
         0.74
        ],
        [
         50,
         0.84
        ],
        [
         60,
         0.9
        ],
        [
         80,
         0.95
        ],
        [
         100,
         0.97
        ]
       ]
      },
      {
       "name": "pH 7.2",
       "marker": "triangle",
       "line": "smooth",
       "points": [
        [
         0,
         0
        ],
        [
         10,
         0.04
        ],
        [
         20,
         0.21
        ],
        [
         30,
         0.44
        ],
        [
         33,
         0.5
        ],
        [
         40,
         0.63
        ],
        [
         50,
         0.75
        ],
        [
         60,
         0.83
        ],
        [
         80,
         0.92
        ],
        [
         100,
         0.95
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "According to Figure 1, lowering the pH from 7.4 to 7.2 changes the P50 of hemoglobin by about:",
      "choices": [
       "+6 mmHg, indicating lower O₂ affinity",
       "+6 mmHg, indicating higher O₂ affinity",
       "−5 mmHg, indicating higher O₂ affinity",
       "−5 mmHg, indicating lower O₂ affinity"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Read where each curve crosses a saturation of 0.5. At pH 7.4, P50 ≈ 27 mmHg; at pH 7.2, P50 ≈ 33 mmHg. The change is **+6 mmHg**. A **higher P50 means lower affinity**: more O₂ pressure is needed to fill half the sites. The curve shifts right, which is the Bohr effect described in the passage.\n\nPairing +6 mmHg with higher affinity reverses the meaning of P50.\nThe −5 mmHg choices read the wrong curve: going from pH 7.4 to 7.6 lowers P50 from 27 to 22 mmHg, and a lower P50 means higher, not lower, affinity.",
      "id": "p_cpp2_3_q1"
     },
     {
      "q": "A patient with diabetic ketoacidosis has an arterial [HCO₃⁻] of 12 mM and a pCO₂ of 40 mmHg. What is the patient's plasma pH?",
      "choices": [
       "5.1",
       "5.6",
       "7.1",
       "7.4"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "exp": "First convert pCO₂ to a concentration, as the passage directs: [CO₂] = 0.030 mM/mmHg × 40 mmHg = **1.2 mM**. Then apply **Henderson–Hasselbalch**:\npH = pKa + log([HCO₃⁻]/[CO₂]) = 6.1 + log(12 ÷ 1.2) = 6.1 + log 10 = **7.1**.\n\n**5.1** puts the acid on top (log 0.1 = −1).\n**5.6** uses 40 (the pCO₂ in mmHg) as the concentration, without the 0.030 factor: 6.1 + log(0.30) ≈ 5.6.\n**7.4** is the normal value, which needs a ratio of 20 (24 ÷ 1.2); halving bicarbonate lowers pH by log 2 ≈ 0.3.",
      "id": "p_cpp2_3_q2"
     },
     {
      "q": "The H⁺ in Reaction 2 is bound mainly by side chains of which amino acid?",
      "choices": [
       "Histidine, because its imidazole side chain has a pKa near 6–7",
       "Lysine, because its amino side chain has a pKa near 6–7",
       "Aspartate, because its carboxylate side chain has a pKa near 6–7",
       "Tyrosine, because its phenol side chain has a pKa near 6–7"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "To take up H⁺ when O₂ is released and give it back when O₂ binds, a group must be **partly protonated near pH 7.4**, so its pKa must lie close to that pH. Only **histidine's imidazole** (pKa ≈ 6–7) qualifies, and a small rise in its pKa in the T state shifts it from mostly neutral to substantially protonated.\n\nLysine's side-chain amine has a pKa near 10.5, so it is already protonated at pH 7.4.\nAspartate's carboxyl has a pKa near 3.9, so it stays deprotonated.\nTyrosine's phenol has a pKa near 10, so it stays protonated (neutral OH).",
      "id": "p_cpp2_3_q3"
     },
     {
      "q": "An anxious patient hyperventilates, lowering arterial pCO₂. Based on Reactions 1 and 2, how will the arterial pH and the patient's O₂-binding curve change?",
      "choices": [
       "The pH rises, and the curve shifts to the left.",
       "The pH rises, and the curve shifts to the right.",
       "The pH falls, and the curve shifts to the left.",
       "The pH falls, and the curve shifts to the right."
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "exp": "Apply **Le Châtelier's principle** twice. Breathing off CO₂ removes a reactant of Reaction 1, so the equilibrium shifts left: H⁺ + HCO₃⁻ recombine and CO₂ forms, **[H⁺] falls and pH rises** (respiratory alkalosis).\n\nLower [H⁺] removes a reactant of Reaction 2, so that equilibrium also shifts left, toward HbO₂. Hemoglobin holds O₂ more tightly, **P50 falls and the curve shifts left**, as the pH 7.6 curve in Figure 1 shows.\n\nA right shift would need more H⁺ (or CO₂), the opposite of hyperventilation.\nThe \"pH falls\" choices describe CO₂ retention (hypoventilation), and a fall in pH would shift the curve right, not left.",
      "id": "p_cpp2_3_q4"
     }
    ]
   },
   {
    "id": "p_cpp2_4",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5E",
     "5C"
    ],
    "title": "An SN2 Route to the Local Anesthetic Prilocaine",
    "passage": "Prilocaine is an amide-type local anesthetic used in dentistry. Like lidocaine, it blocks voltage-gated Na⁺ channels from inside the nerve cell, which it reaches by crossing the membrane in its neutral (free-base) form. Its secondary amine has a pKa of about 7.9, so it is partly protonated at physiological pH.\n\nChemists prepared a single enantiomer of prilocaine in two steps. First, 2-methylaniline (Compound 1) was acylated with (R)-2-bromopropanoyl bromide to give the bromo amide Compound 2 (Figure 1). Under the mild conditions used, the stereocenter of Compound 2 was not affected. In the key step (Reaction 1), Compound 2 was heated at 60°C with two equivalents of propylamine in N,N-dimethylformamide (DMF), a polar aprotic solvent. The amine nitrogen attacks the carbon bearing bromine in a single concerted step, displacing bromide to give prilocaine (Compound 3).\n\nCompound 2 + 2 CH₃CH₂CH₂NH₂ → Compound 3 + CH₃CH₂CH₂NH₃⁺ Br⁻\nReaction 1\n\nTo confirm the mechanism, the chemists measured initial rates in DMF at 60°C. Doubling [Compound 2] at a fixed [propylamine] doubled the rate, and doubling [propylamine] at a fixed [Compound 2] also doubled the rate. In one run with [Compound 2] = 0.20 M and [propylamine] = 0.40 M, the initial rate was 1.6 × 10⁻⁵ M/s. When the reaction was repeated in ethanol at the same temperature, the rate fell by a factor of about 40, and a small amount of N-(2-methylphenyl)propenamide, an elimination product, was detected.\n\nAfter Reaction 1, the DMF was removed, and the residue, containing Compound 3, unreacted Compound 2, excess propylamine and propylammonium bromide, was taken up in diethyl ether. Compound 3 was then isolated and converted to its hydrochloride salt, which is water-soluble and suitable for an injectable formulation.",
    "scheme": [
     {
      "after": 1,
      "caption": "Figure 1 Synthesis of Compound 2",
      "parts": [
       "cpp2-o-toluidine",
       "+",
       "cpp2-bromopropanoyl-bromide-r",
       {
        "arrow": "pyridine, CH₂Cl₂, 0°C"
       },
       "cpp2-bromoamide-r"
      ]
     }
    ],
    "questions": [
     {
      "q": "Which structure is Compound 3?",
      "choiceFigs": [
       "cpp2-prilocaine-s",
       "cpp2-prilocaine-r",
       "cpp2-propenamide",
       "cpp2-3-propylamino-amide"
      ],
      "choices": [
       "(S)-N-(2-methylphenyl)-2-(propylamino)propanamide",
       "(R)-N-(2-methylphenyl)-2-(propylamino)propanamide",
       "N-(2-methylphenyl)propenamide",
       "N-(2-methylphenyl)-3-(propylamino)propanamide"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "The passage describes a **concerted, bimolecular** substitution at the carbon bearing Br, which is an **SN2** reaction. The nucleophile attacks from the side opposite the leaving group, so the spatial arrangement at that carbon is **inverted**.\n\nNow check the label. In Compound 2 the priorities are Br > C(=O)N > CH₃ > H, and the center is R. In Compound 3, N replaces Br, and N (atomic number 7) still outranks the carbonyl carbon, so the priority order is unchanged: NHPr > C(=O)N > CH₃ > H. With the same ranking, inverting the geometry flips the descriptor, so the product is **(S)**.\n\nThe (R) product would require retention, as in an SN1 reaction or a double inversion.\nThe propenamide is the elimination product, found only in small amounts in ethanol.\nThe 3-(propylamino) isomer puts N on the CH₃ carbon, which never carried the leaving group.",
      "id": "p_cpp2_4_q1"
     },
     {
      "q": "Based on the kinetic data in the passage, what is the rate constant for Reaction 1 in DMF at 60°C?",
      "choices": [
       "4.0 × 10⁻⁵ s⁻¹",
       "8.0 × 10⁻⁵ s⁻¹",
       "2.0 × 10⁻⁴ M⁻¹·s⁻¹",
       "5.0 × 10⁻⁴ M⁻²·s⁻¹"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "Doubling either reactant doubles the rate, so the reaction is **first order in each**: rate = k[Compound 2][propylamine], second order overall, as expected for SN2. Solve for k:\nk = rate ÷ ([2][amine]) = 1.6 × 10⁻⁵ M/s ÷ (0.20 M × 0.40 M) = 1.6 × 10⁻⁵ ÷ 0.080 = **2.0 × 10⁻⁴ M⁻¹·s⁻¹**.\n\n**4.0 × 10⁻⁵ s⁻¹** divides only by [propylamine], as if the rate were first order in amine alone.\n**8.0 × 10⁻⁵ s⁻¹** divides only by [Compound 2] (an SN1-type rate law).\n**5.0 × 10⁻⁴ M⁻²·s⁻¹** squares [propylamine], counting both equivalents in the rate law; the data show the rate is first order in amine.",
      "id": "p_cpp2_4_q2"
     },
     {
      "q": "Which procedure would best separate Compound 3 from unreacted Compound 2 in the ether solution?",
      "choices": [
       "Extract the ether solution with 1 M HCl, then make the aqueous layer basic with NaOH and extract it with fresh ether.",
       "Extract the ether solution with 1 M HCl, then evaporate the ether layer to recover Compound 3.",
       "Extract the ether solution with 1 M NaOH, then acidify the aqueous layer with HCl and extract it with fresh ether.",
       "Extract the ether solution with pure water, then evaporate the aqueous layer to recover Compound 3."
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "The two compounds differ in one key way: Compound 3 has a **basic secondary amine** (pKa of its conjugate acid ≈ 7.9), and Compound 2 has only an amide, whose nitrogen is not basic because its lone pair is delocalized into the C=O. Aqueous HCl protonates Compound 3 to an ionic ammonium salt that moves into the water, while neutral Compound 2 stays in the ether. Adding NaOH then returns Compound 3 to its neutral form, which is extracted back into fresh ether. This is a standard **acid–base extraction**.\n\nAfter the HCl wash, Compound 3 is in the aqueous layer, so evaporating the ether recovers Compound 2.\nNaOH can't deprotonate either compound appreciably (an amide N–H has a pKa near 17), so nothing useful moves into the base.\nIn neutral water, both organic compounds stay mostly in the ether; plain water mainly removes the propylammonium bromide salt.",
      "id": "p_cpp2_4_q3"
     },
     {
      "q": "The rate of Reaction 1 fell by a factor of about 40 when ethanol replaced DMF as the solvent. Which property of ethanol best explains this decrease?",
      "choices": [
       "Ethanol hydrogen bonds to the nitrogen lone pair of propylamine, making the amine a weaker nucleophile.",
       "Ethanol stabilizes a carbocation intermediate, which makes the rate-determining step slower.",
       "Ethanol is a stronger acid than DMF, so it converts all of the propylamine to its conjugate acid.",
       "Ethanol boils at a lower temperature than DMF, so the reaction mixture was cooler."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Ethanol is a **polar protic** solvent: its O–H group donates hydrogen bonds to the nucleophile's lone pair. This solvation shell stabilizes the nucleophile and must be partly stripped away before it can attack, so the SN2 rate drops. **Polar aprotic** solvents such as DMF dissolve the reactants but don't hydrogen bond to the nucleophile, leaving it more reactive.\n\nSN2 has no carbocation intermediate, and stabilizing an intermediate would speed a reaction, not slow it.\nEthanol (pKa ≈ 16) is far too weak an acid to protonate an amine whose conjugate acid has a pKa near 10.6.\nThe passage says both reactions were run at the same temperature (60°C, below ethanol's boiling point of 78°C).",
      "id": "p_cpp2_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp2_5",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "4C"
    ],
    "title": "Technetium-99m and the Dose Calibrator",
    "passage": "Most diagnostic nuclear medicine scans use technetium-99m (Tc-99m), a metastable nuclear isomer of Tc-99. Tc-99m decays to ground-state Tc-99 by isomeric transition with a half-life of 6.0 h, emitting a 140 keV gamma ray, an energy well suited to gamma cameras. Because 6 hours is too short to ship Tc-99m from a reactor, hospitals receive a generator containing its parent, molybdenum-99 (half-life 66 h), adsorbed on an alumina column as molybdate (MoO₄²⁻). Mo-99 undergoes β⁻ decay to Tc-99m, which forms pertechnetate (TcO₄⁻). Because pertechnetate carries only a single negative charge, it binds the alumina less tightly than molybdate does, and it is washed off (eluted) with 0.9% saline each morning.\n\nBefore each injection, the activity of the dose is measured in a dose calibrator, a sealed ionization chamber filled with pressurized argon. Gamma rays passing through the gas eject electrons from argon atoms, creating ion pairs (one electron and one Ar⁺ ion). A voltage across the chamber sweeps the electrons to the anode and the ions to the cathode before they can recombine, so the current in the external circuit is proportional to the rate at which ion pairs form, and therefore to the activity. Activity is reported in becquerels (1 Bq = 1 decay/s).\n\nThe radiation dose to the patient is the energy absorbed per kilogram of tissue (1 gray = 1 J/kg). It depends on the activity injected, the type and energy of the emissions, and how long the isotope stays in the body. β particles and positrons deposit their energy within a few millimeters of where they are emitted, adding dose without contributing to the image, whereas most gamma rays of 100–200 keV escape the body and reach the camera. Table 1 lists several isotopes used in nuclear medicine.",
    "figure": {
     "caption": "Table 1 Properties of selected medical isotopes",
     "columns": [
      "Isotope",
      "Half-life",
      "Decay mode",
      "Main photon energy (keV)"
     ],
     "rows": [
      [
       "Tc-99m",
       "6.0 h",
       "isomeric transition",
       "140"
      ],
      [
       "I-123",
       "13 h",
       "electron capture",
       "159"
      ],
      [
       "I-131",
       "8.0 d",
       "β⁻",
       "364"
      ],
      [
       "Ga-67",
       "78 h",
       "electron capture",
       "93, 185"
      ],
      [
       "Tl-201",
       "73 h",
       "electron capture",
       "69–80"
      ],
      [
       "F-18",
       "110 min",
       "β⁺",
       "511"
      ]
     ]
    },
    "questions": [
     {
      "q": "A generator is eluted at 6:00 AM, giving 1200 MBq of Tc-99m. If none of the eluate is used, approximately what Tc-99m activity remains at 6:00 PM the same day?",
      "choices": [
       "100 MBq",
       "150 MBq",
       "300 MBq",
       "600 MBq"
      ],
      "ans": 2,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Once eluted, the Tc-99m is separated from its Mo-99 parent, so no new Tc-99m forms and it simply decays. From 6:00 AM to 6:00 PM is 12 h, which is **two half-lives** of 6.0 h: 1200 → 600 → **300 MBq**.\n\n**600 MBq** counts only one half-life.\n**150 MBq** counts three half-lives (18 h).\n**100 MBq** divides 1200 by the 12 hours elapsed, treating decay as linear.",
      "id": "p_cpp2_5_q1"
     },
     {
      "q": "When Mo-99 decays to Tc-99m, how do the numbers of protons and neutrons in the nucleus change?",
      "choices": [
       "Protons increase by 1, and neutrons decrease by 1.",
       "Protons decrease by 1, and neutrons increase by 1.",
       "Protons increase by 1, and neutrons do not change.",
       "Neither the number of protons nor the number of neutrons changes."
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "gen_chem",
      "exp": "The passage says Mo-99 undergoes **β⁻ decay**. In β⁻ decay a neutron becomes a proton and emits an electron (and an antineutrino): n → p + e⁻. So Z rises by 1 (Mo, Z = 42 → Tc, Z = 43), **neutrons fall by 1** (57 → 56), and the mass number stays 99.\n\nProtons decreasing by 1 describes β⁺ decay or electron capture.\nAdding a proton without losing a neutron would raise the mass number to 100.\nNo change in either count describes the next step, the **isomeric transition** of Tc-99m to Tc-99, where the nucleus only releases energy as a gamma ray.",
      "id": "p_cpp2_5_q2"
     },
     {
      "q": "A tumor-imaging protocol requires scanning 72 h after injection, with a gamma camera that detects photons between 90 and 200 keV, while avoiding isotopes that emit β particles. According to Table 1, which isotope best meets these requirements?",
      "choices": [
       "Ga-67",
       "Tc-99m",
       "I-131",
       "Tl-201"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 4",
      "diff": "X",
      "exp": "Check each requirement against Table 1. **Ga-67** has a 78 h half-life, so a bit more than half of it remains at 72 h; it decays by **electron capture**, which emits no β particle; and its photons (93 and 185 keV) fall inside the camera's 90–200 keV window. It meets all three requirements.\n\n**Tc-99m**: 72 h is 12 half-lives, so only 1/4096 of the activity remains.\n**I-131** emits β⁻ particles (extra dose), and its 364 keV photon is above the window.\n**Tl-201** lasts long enough, but its 69–80 keV photons fall below the window.",
      "id": "p_cpp2_5_q3"
     },
     {
      "q": "A dose calibrator reads a steady current of 4.8 pA. How many ion pairs per second are being collected in the chamber?",
      "choices": [
       "1.5 × 10⁷",
       "3.0 × 10⁷",
       "3.0 × 10¹⁰",
       "7.7 × 10⁻³¹"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "Current is charge per time, I = (number of carriers per second) × e. Each ion pair moves **one elementary charge** through the external circuit: its electron reaches the anode and its Ar⁺ ion picks up one electron at the cathode. So the rate is I/e = 4.8 × 10⁻¹² C/s ÷ 1.6 × 10⁻¹⁹ C = **3.0 × 10⁷ ion pairs/s** (1 pA = 10⁻¹² A).\n\n**1.5 × 10⁷** counts both members of each pair as separate charges in the current, which halves the answer.\n**3.0 × 10¹⁰** treats pico as 10⁻⁹ (nano).\n**7.7 × 10⁻³¹** multiplies by e instead of dividing.",
      "id": "p_cpp2_5_q4"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "Which of the following nucleobases is a purine?",
    "choiceFigs": [
     "guanine",
     "cytosine",
     "thymine",
     "uracil"
    ],
    "choices": [
     "Guanine",
     "Cytosine",
     "Thymine",
     "Uracil"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "biochemistry",
    "exp": "**Purines** have two fused rings, a six-membered ring joined to a five-membered imidazole ring. Of these bases, only **guanine** has that fused bicyclic structure (adenine is the other purine).\n\nCytosine, thymine and uracil are **pyrimidines**: each has a single six-membered ring with two nitrogens. In DNA, each purine pairs with a pyrimidine (G with C, A with T), which keeps the double helix a constant width.",
    "id": "cp_half_2_sa1"
   },
   {
    "q": "The A and B chains of insulin are held together by covalent bonds between the side chains of which amino acid?",
    "choices": [
     "Cysteine",
     "Methionine",
     "Serine",
     "Tyrosine"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "biochemistry",
    "exp": "Covalent cross-links between protein chains are **disulfide bonds** (–S–S–), formed when the thiol (–SH) groups of two **cysteine** side chains are oxidized. Insulin has two interchain disulfides and one within its A chain.\n\nMethionine contains sulfur, but as a thioether (–S–CH₃) with no S–H, so it can't form a disulfide.\nSerine (–OH) and tyrosine (phenol –OH) form hydrogen bonds, which are noncovalent.",
    "id": "cp_half_2_sa2"
   },
   {
    "q": "For a small protein, unfolding has ΔH = +40 kJ/mol and ΔS = +125 J/(mol·K). Assuming these values do not change with temperature, under what condition is unfolding spontaneous?",
    "choices": [
     "Only above 47°C",
     "Only below 47°C",
     "Only above 320°C",
     "At all temperatures"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Unfolding is spontaneous when **ΔG = ΔH − TΔS < 0**. With ΔH and ΔS both positive, this happens only when TΔS outweighs ΔH, at high temperature. The crossover is where ΔG = 0:\nT = ΔH/ΔS = 40,000 J/mol ÷ 125 J/(mol·K) = 320 K = 320 − 273 = **47°C**. Above that, the protein unfolds spontaneously.\n\n**Below 47°C** reverses the inequality: at low T the positive ΔH dominates and ΔG > 0.\n**320°C** forgets that the result is in kelvins.\n**At all temperatures** would require ΔH < 0 and ΔS > 0.",
    "id": "cp_half_2_sa3"
   },
   {
    "q": "Which of the following ions has the smallest radius?",
    "choices": [
     "Mg²⁺",
     "Na⁺",
     "F⁻",
     "O²⁻"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "All four ions are **isoelectronic**: each has 10 electrons (the neon configuration, 1s²2s²2p⁶). With the same electrons, size depends on how strongly the nucleus pulls them in, so the ion with the **most protons** is smallest. Mg²⁺ has 12 protons, Na⁺ 11, F⁻ 9 and O²⁻ 8, so the order of size is Mg²⁺ < Na⁺ < F⁻ < O²⁻ and **Mg²⁺** is smallest.\n\nO²⁻ is the largest: only 8 protons hold 10 electrons.\nIt's tempting to pick F⁻ because fluorine is the smallest neutral atom here, but adding an electron makes the anion much larger than the atom.",
    "id": "cp_half_2_sa4"
   },
   {
    "q": "A researcher needs 200 mL of 50 mM HEPES buffer and has a 1.0 M HEPES stock solution. Which procedure gives the correct solution?",
    "choices": [
     "Pipet 10 mL of stock into a 200-mL volumetric flask and add water to the mark.",
     "Pipet 10 mL of stock into a beaker containing 200 mL of water.",
     "Pipet 100 mL of stock into a 200-mL volumetric flask and add water to the mark.",
     "Pipet 1.0 mL of stock into a 200-mL volumetric flask and add water to the mark."
    ],
    "ans": 0,
    "cat": "5A",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Use **C₁V₁ = C₂V₂** with both concentrations in the same unit: 50 mM = 0.050 M.\nV₁ = (0.050 M × 200 mL) ÷ 1.0 M = **10 mL** of stock. The **final volume** must be 200 mL, so the stock is diluted to the mark in a volumetric flask.\n\nAdding 10 mL to 200 mL of water gives 210 mL, so the buffer is about 48 mM, not 50 mM.\n**100 mL** treats 50 mM as 0.50 M.\n**1.0 mL** is a factor-of-10 slip in the other direction (it gives 5 mM).",
    "id": "cp_half_2_sa5"
   },
   {
    "q": "Fluoride from toothpaste can react with Ca²⁺ to form CaF₂, whose Ksp is 3.2 × 10⁻¹¹ at 25°C. What is the molar solubility of CaF₂ in pure water at 25°C?",
    "choices": [
     "2.0 × 10⁻⁴ M",
     "3.2 × 10⁻⁴ M",
     "4.0 × 10⁻⁴ M",
     "5.7 × 10⁻⁶ M"
    ],
    "ans": 0,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "CaF₂(s) ⇌ Ca²⁺ + 2F⁻. If s mol/L dissolves, [Ca²⁺] = s and [F⁻] = 2s, so **Ksp = s(2s)² = 4s³**.\ns³ = 3.2 × 10⁻¹¹ ÷ 4 = 8.0 × 10⁻¹², so s = **2.0 × 10⁻⁴ M** (because 2³ = 8 and (10⁻¹²)^(1/3) = 10⁻⁴).\n\n**3.2 × 10⁻⁴ M** takes the cube root of Ksp without dividing by 4 (forgetting the coefficient 2 on F⁻).\n**4.0 × 10⁻⁴ M** is [F⁻] = 2s, not the solubility of CaF₂.\n**5.7 × 10⁻⁶ M** takes the square root of Ksp, as for a 1:1 salt.",
    "id": "cp_half_2_sa6"
   },
   {
    "q": "A galvanic cell is built from a Ag⁺/Ag half-cell (E° = +0.80 V) and a Fe²⁺/Fe half-cell (E° = −0.44 V). What is the standard cell potential?",
    "choices": [
     "+1.24 V",
     "+0.36 V",
     "+2.04 V",
     "−1.24 V"
    ],
    "ans": 0,
    "cat": "4C",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "In a galvanic cell the half-reaction with the **higher reduction potential** is the cathode: Ag⁺ + e⁻ → Ag. Iron is oxidized at the anode. Then\nE°cell = E°cathode − E°anode = 0.80 − (−0.44) = **+1.24 V**, positive as it must be for a spontaneous cell.\n\n**+0.36 V** subtracts 0.44 instead of subtracting −0.44.\n**+2.04 V** doubles silver's potential because 2 Ag⁺ are needed to balance the electrons; E° is an intensive property and is never multiplied by coefficients.\n**−1.24 V** assigns the cathode and anode backward.",
    "id": "cp_half_2_sa7"
   },
   {
    "q": "During vasodilation, the radius of an arteriole increases by 10%. If the pressure difference along the vessel stays the same, by about what percentage does the volume flow rate increase?",
    "choices": [
     "10%",
     "21%",
     "33%",
     "46%"
    ],
    "ans": 3,
    "cat": "4B",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "physics",
    "exp": "**Poiseuille's law** says Q = πΔPr⁴ ÷ (8ηL), so at constant ΔP the flow rate is proportional to **r⁴**. The new radius is 1.1r, so Q rises by a factor of 1.1⁴: 1.1² = 1.21, and 1.21² ≈ 1.46. The flow increases by about **46%**.\n\n**10%** assumes flow is proportional to r.\n**21%** uses r² (proportional to cross-sectional area).\n**33%** is roughly r³.",
    "id": "cp_half_2_sa8"
   },
   {
    "q": "Which of the following amino acids has two stereocenters?",
    "choices": [
     "Serine",
     "Valine",
     "Leucine",
     "Threonine"
    ],
    "ans": 3,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "A stereocenter is a carbon bonded to **four different groups**. Every standard amino acid except glycine has one at the α carbon (H, NH₃⁺, COO⁻ and the side chain). Threonine's side chain is –CH(OH)CH₃, and its β carbon carries **H, OH, CH₃ and the α carbon**, four different groups. So threonine has **two** stereocenters (natural L-threonine is 2S,3R). Isoleucine is the only other standard amino acid with two.\n\n**Serine** (–CH₂OH) has two H atoms on its β carbon.\n**Valine** (–CH(CH₃)₂) has two identical methyl groups on its β carbon.\n**Leucine** (–CH₂CH(CH₃)₂) has two H atoms on its β carbon and two identical methyl groups on its γ carbon.",
    "id": "cp_half_2_sa9"
   },
   {
    "q": "A patient stands on a scale inside an elevator that is moving upward but slowing down. Compared with the patient's weight, the scale reading is:",
    "choices": [
     "less, because the patient's acceleration is directed downward.",
     "greater, because the patient's acceleration is directed upward.",
     "greater, because the patient's velocity is directed upward.",
     "equal, because the elevator is still moving upward."
    ],
    "ans": 0,
    "cat": "4A",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "physics",
    "exp": "The scale reads the **normal force** N. An object moving upward but slowing down has its **acceleration directed downward** (opposite its velocity). Newton's second law, taking up as positive: N − mg = ma with a negative, so **N = m(g − |a|) < mg**. The reading is less than the weight.\n\n\"Acceleration upward\" describes speeding up while rising, or slowing down while descending.\nThe direction of **velocity** doesn't determine the force; only the acceleration does.\nThe reading equals the weight only when the acceleration is zero (constant velocity), whichever way the elevator moves.",
    "id": "cp_half_2_sa10"
   }
  ]
 },
 {
  "id": "cp_half_3",
  "title": "Chem/Phys Quiz 3",
  "order": [
   "p_cpp3_1",
   "p_cpp3_2",
   4,
   "p_cpp3_3",
   "p_cpp3_4",
   3,
   "p_cpp3_5",
   3
  ],
  "passages": [
   {
    "id": "p_cpp3_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5E",
     "5B"
    ],
    "title": "Thermal Unfolding of an Engineered Binding Domain",
    "passage": "Small, very stable protein domains are used as scaffolds for engineered binding proteins in diagnostic tests, and they must stay folded at the temperatures used to ship and store test kits. Researchers studied D7, a 58-residue three-helix domain from a thermophilic bacterium. In the crystal structure of D7, the side chain of Leu34 is buried in the hydrophobic core, where it packs against the side chains of Ile8, Val15 and Phe41. On the protein surface, the side-chain carboxylate of Glu12 forms a salt bridge with the side-chain ammonium group of Lys50.\n\nUnfolding of D7 was treated as a two-state equilibrium between the folded (F) and unfolded (U) forms (Equation 1), with ΔG°unf = ΔH°unf − TΔS°unf. The melting temperature (Tm) is the temperature at which half of the molecules are unfolded.\n\nF ⇌ U     K = [U]/[F]\nEquation 1\n\nEach protein (10 μM) was dissolved in 20 mM phosphate buffer, and the circular dichroism (CD) signal at 222 nm, which reports α-helix content, was recorded while the sample was heated from 20°C to 100°C at 1°C/min. The CD signal was converted to the fraction of molecules folded. Wild-type D7 and two variants with substitutions at position 34 (L34A and L34D) were studied at pH 7.0, and wild-type D7 was also studied at pH 4.0 (Figure 1). Cooling each sample back to 20°C restored more than 95% of the original CD signal, showing that unfolding was reversible. A van 't Hoff analysis of the wild-type curve at pH 7.0 (Tm = 77°C) gave ΔH°unf = 350 kJ/mol at Tm.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Fraction of D7 folded versus temperature",
     "x": {
      "label": "Temperature (°C)",
      "min": 20,
      "max": 100,
      "step": 10
     },
     "y": {
      "label": "Fraction folded",
      "min": 0,
      "max": 1,
      "step": 0.2
     },
     "series": [
      {
       "name": "Wild type, pH 7.0",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         20,
         1.0
        ],
        [
         25,
         1.0
        ],
        [
         30,
         1.0
        ],
        [
         35,
         1.0
        ],
        [
         40,
         1.0
        ],
        [
         45,
         1.0
        ],
        [
         50,
         1.0
        ],
        [
         55,
         1.0
        ],
        [
         60,
         1.0
        ],
        [
         65,
         0.99
        ],
        [
         70,
         0.92
        ],
        [
         75,
         0.67
        ],
        [
         80,
         0.26
        ],
        [
         85,
         0.06
        ],
        [
         90,
         0.01
        ],
        [
         95,
         0.0
        ],
        [
         100,
         0.0
        ]
       ]
      },
      {
       "name": "L34A, pH 7.0",
       "marker": "square",
       "line": "smooth",
       "points": [
        [
         20,
         1.0
        ],
        [
         25,
         1.0
        ],
        [
         30,
         1.0
        ],
        [
         35,
         1.0
        ],
        [
         40,
         1.0
        ],
        [
         45,
         1.0
        ],
        [
         50,
         0.99
        ],
        [
         55,
         0.95
        ],
        [
         60,
         0.78
        ],
        [
         65,
         0.42
        ],
        [
         70,
         0.13
        ],
        [
         75,
         0.03
        ],
        [
         80,
         0.01
        ],
        [
         85,
         0.0
        ],
        [
         90,
         0.0
        ],
        [
         95,
         0.0
        ],
        [
         100,
         0.0
        ]
       ]
      },
      {
       "name": "L34D, pH 7.0",
       "marker": "triangle",
       "line": "smooth",
       "points": [
        [
         20,
         1.0
        ],
        [
         25,
         1.0
        ],
        [
         30,
         0.99
        ],
        [
         35,
         0.97
        ],
        [
         40,
         0.86
        ],
        [
         45,
         0.57
        ],
        [
         50,
         0.24
        ],
        [
         55,
         0.07
        ],
        [
         60,
         0.02
        ],
        [
         65,
         0.0
        ],
        [
         70,
         0.0
        ],
        [
         75,
         0.0
        ],
        [
         80,
         0.0
        ],
        [
         85,
         0.0
        ],
        [
         90,
         0.0
        ],
        [
         95,
         0.0
        ],
        [
         100,
         0.0
        ]
       ]
      },
      {
       "name": "Wild type, pH 4.0",
       "marker": "diamond-open",
       "line": "smooth",
       "points": [
        [
         20,
         1.0
        ],
        [
         25,
         1.0
        ],
        [
         30,
         1.0
        ],
        [
         35,
         1.0
        ],
        [
         40,
         0.99
        ],
        [
         45,
         0.97
        ],
        [
         50,
         0.87
        ],
        [
         55,
         0.58
        ],
        [
         60,
         0.23
        ],
        [
         65,
         0.06
        ],
        [
         70,
         0.02
        ],
        [
         75,
         0.0
        ],
        [
         80,
         0.0
        ],
        [
         85,
         0.0
        ],
        [
         90,
         0.0
        ],
        [
         95,
         0.0
        ],
        [
         100,
         0.0
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Which amino acid has a side chain that is a constitutional isomer of the side chain of Leu34?",
      "choices": [
       "Isoleucine",
       "Valine",
       "Methionine",
       "Alanine"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "Leucine's side chain is –CH₂CH(CH₃)₂, a **C₄H₉ group**. Isoleucine's side chain, –CH(CH₃)CH₂CH₃, is also **C₄H₉** with the atoms connected differently, so the two are constitutional isomers. That is why an L→I substitution is usually tolerated well in a hydrophobic core.\n\n**Valine** (–CH(CH₃)₂) is one carbon shorter (C₃H₇).\n**Methionine** (–CH₂CH₂SCH₃) contains sulfur, so its formula is different.\n**Alanine** (–CH₃) is the much smaller side chain in the L34A variant, which is why that variant is less stable.",
      "id": "p_cpp3_1_q1"
     },
     {
      "q": "According to Figure 1, at 60°C ΔG°unf is negative for which samples?",
      "choices": [
       "L34D only",
       "L34D and wild type at pH 4.0",
       "L34A, L34D and wild type at pH 4.0",
       "None of the samples, because every sample still contains some folded protein"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "M",
      "exp": "ΔG°unf = −RT ln K, so **ΔG°unf < 0 when K = [U]/[F] > 1**, which means the fraction folded is **below 0.5**. Read each curve at 60°C: wild type at pH 7.0 ≈ 1.0, L34A ≈ 0.78, **L34D ≈ 0.02 and wild type at pH 4.0 ≈ 0.23**. Only the last two are mostly unfolded.\n\n**L34D only** misses the pH 4.0 curve, whose Tm (about 56°C) is also below 60°C.\n**Including L34A** treats any decrease in folding as unfolding, but L34A is still about 78% folded, so K < 1 and ΔG°unf > 0.\n**None** confuses the sign of ΔG° with whether any folded protein remains; an equilibrium mixture always contains some of each form.",
      "id": "p_cpp3_1_q2"
     },
     {
      "q": "What is ΔS°unf for wild-type D7 at pH 7.0 at its melting temperature?",
      "choices": [
       "1.0 J/(mol·K)",
       "1.0 × 10³ J/(mol·K)",
       "4.5 × 10³ J/(mol·K)",
       "1.2 × 10⁸ J/(mol·K)"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "At Tm half the molecules are unfolded, so K = 1 and **ΔG°unf = 0**. Then ΔH°unf = TmΔS°unf, so ΔS°unf = ΔH°unf/Tm. Convert Tm to kelvin: 77°C + 273 = **350 K**. ΔS°unf = 350,000 J/mol ÷ 350 K = **1.0 × 10³ J/(mol·K)**. The large positive value reflects the freedom the chain gains (and the water released) on unfolding.\n\n**1.0 J/(mol·K)** divides 350 kJ by 350 K but keeps the answer in kJ while labeling it J.\n**4.5 × 10³ J/(mol·K)** uses Tm in °C (350,000 ÷ 77).\n**1.2 × 10⁸ J/(mol·K)** multiplies ΔH by Tm instead of dividing.",
      "id": "p_cpp3_1_q3"
     },
     {
      "q": "The researchers proposed that wild-type D7 is less stable at pH 4.0 mainly because the Glu12–Lys50 salt bridge is lost. Which result would most strongly support this proposal?",
      "choices": [
       "An E12Q variant has a Tm of about 56°C at pH 7.0.",
       "An E12Q variant has a Tm of about 77°C at pH 7.0.",
       "A K50R variant has a Tm of about 77°C at pH 7.0.",
       "The L34A variant has a Tm below 56°C at pH 4.0."
      ],
      "ans": 0,
      "cat": "5B",
      "skill": "SIRS 3",
      "diff": "X",
      "exp": "A salt bridge is an attraction between opposite charges. The Glu side chain has a pKa near 4.2, so at **pH 4.0 most Glu12 carboxylates are protonated and neutral**, and the salt bridge breaks. Glutamine has the same shape as glutamic acid but an **uncharged amide**, so E12Q removes the salt bridge at pH 7.0 without changing any other residue's protonation. If that variant's Tm drops to about the pH 4.0 value (56°C), the salt bridge alone accounts for the pH effect.\n\n**E12Q with Tm ≈ 77°C** would show that removing the salt bridge does not matter, which argues against the proposal.\n**K50R** keeps a positive charge (Arg) at position 50, so the salt bridge can still form; the result does not test what happens when it is lost.\n**L34A at pH 4.0** combines a core mutation with low pH; it says nothing about which interaction is lost at low pH.",
      "id": "p_cpp3_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp3_2",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4D",
     "5D",
     "4E",
     "5C"
    ],
    "title": "Identifying a Degradation Product of Benzocaine",
    "passage": "Benzocaine (Compound 1) is an ester local anesthetic used in topical gels for dental and throat pain. Because esters can be hydrolyzed, a pharmaceutical laboratory tested how a new water-based benzocaine gel changes during storage. The gel was buffered at pH 9.0 to improve its texture, and samples were held at 40°C, a standard accelerated-aging condition. Ester hydrolysis is catalyzed by both acid and base, and at pH 9.0 hydroxide ion is expected to be the main nucleophile.\n\nAfter 60 days, each sample was diluted with water, acidified to pH 3 with dilute HCl, and extracted with ethyl acetate. HPLC of the extract showed that the peak for Compound 1 had decreased and that a new, more polar compound, Unknown X, had appeared. The HPLC used a nonpolar C18 column with a water–acetonitrile mobile phase, on which Unknown X eluted at 3.1 min and Compound 1 at 7.8 min. Unknown X was isolated by preparative HPLC, and its molecular formula was found by high-resolution mass spectrometry. A volatile compound, Unknown Y, was collected by distilling a stored gel sample and was analyzed the same way. Selected IR and ¹H NMR data are listed in Table 1. Spectra of Compound 1 and Unknown X were recorded in DMSO-d₆, and the spectrum of Unknown Y was recorded in CDCl₃.\n\nSome patients who are allergic to ester local anesthetics react to a hydrolysis product rather than to the parent drug. The laboratory therefore set an upper limit of 0.5% for Unknown X in the finished product and began testing whether lowering the gel's pH to 6.0 would slow its formation.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Structure of benzocaine (Compound 1)",
      "parts": [
       "benzocaine"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Spectroscopic data (br s = broad singlet, d = doublet, q = quartet, t = triplet)",
     "columns": [
      "Compound",
      "Formula",
      "IR (cm⁻¹)",
      "¹H NMR δ (ppm)"
     ],
     "rows": [
      [
       "Compound 1",
       "C₉H₁₁NO₂",
       "3420, 3340, 1685, 1600",
       "7.65 (d, 2H), 6.57 (d, 2H), 5.95 (br s, 2H), 4.20 (q, 2H), 1.27 (t, 3H)"
      ],
      [
       "Unknown X",
       "C₇H₇NO₂",
       "3460, 3360, 2500–3300 (broad), 1665, 1600",
       "12.0 (br s, 1H), 7.62 (d, 2H), 6.55 (d, 2H), 5.85 (br s, 2H)"
      ],
      [
       "Unknown Y",
       "C₂H₆O",
       "3350 (broad), 2970",
       "3.69 (q, 2H), 2.6 (br s, 1H), 1.22 (t, 3H)"
      ]
     ]
    },
    "questions": [
     {
      "q": "Which bond is responsible for the IR absorption that appears in the spectrum of Unknown X but not in the spectrum of Compound 1?",
      "choices": [
       "The O–H bond of a carboxylic acid",
       "The N–H bonds of a primary amine",
       "The C=O bond of an ester",
       "The O–H bond of an alcohol"
      ],
      "ans": 0,
      "cat": "4D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Compare the two IR rows: the only new band in Unknown X is the **very broad absorption from 2500 to 3300 cm⁻¹**. That shape is the signature of a **carboxylic acid O–H**, broadened because the acids form strongly hydrogen-bonded dimers. It matches the 12.0 ppm (1H) NMR signal, which is typical of a COOH proton.\n\n**Primary amine N–H** gives the two sharp bands near 3400 cm⁻¹, and both compounds have them.\n**Ester C=O** belongs to Compound 1; Unknown X has lost the ethyl group (no 4.20 q or 1.27 t), so it is no longer an ester.\n**Alcohol O–H** is broad but centered near 3300–3400 cm⁻¹ without reaching down to 2500 cm⁻¹; that is the band seen for Unknown Y.",
      "id": "p_cpp3_2_q1"
     },
     {
      "q": "Which structure is consistent with all of the data in Table 1 for Unknown X?",
      "choices": [
       "4-aminobenzoic acid",
       "2-aminobenzoic acid",
       "4-hydroxybenzamide",
       "4-nitrotoluene"
      ],
      "choiceFigs": [
       "cpp3-4-aminobenzoic-acid",
       "cpp3-2-aminobenzoic-acid",
       "cpp3-4-hydroxybenzamide",
       "cpp3-4-nitrotoluene"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "All four structures are C₇H₇NO₂, so the formula alone can't decide. Use the spectra:\n• **Two aromatic doublets of 2H each** (7.62 and 6.55 ppm) mean a **para-disubstituted** ring with two pairs of equivalent H.\n• A **2H broad singlet** (5.85 ppm) and two N–H bands (3460, 3360 cm⁻¹) mean an **–NH₂** group.\n• A **1H signal at 12.0 ppm** and the 2500–3300 cm⁻¹ band mean **–COOH**.\nOnly **4-aminobenzoic acid** has all three. It is what hydrolysis of the ethyl ester in Compound 1 should give; Unknown Y (ethanol: q 2H, t 3H, OH) is the other product.\n\n**2-aminobenzoic acid** is ortho-substituted, so its four aromatic H are all different (four 1H signals).\n**4-hydroxybenzamide** is para, but it has a phenol O–H (1H) plus an amide NH₂, no COOH; it would show no 2500–3300 cm⁻¹ band.\n**4-nitrotoluene** has no N–H or O–H at all and would show a 3H methyl singlet near 2.4 ppm.",
      "id": "p_cpp3_2_q2"
     },
     {
      "q": "One stored gel sample originally contained 33 mg of Compound 1 (molar mass 165 g/mol). HPLC showed that 25% of Compound 1 had been converted to Unknown X (molar mass 137 g/mol). What mass of Unknown X had formed?",
      "choices": [
       "6.9 mg",
       "8.3 mg",
       "21 mg",
       "27 mg"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "Work in moles, because hydrolysis converts **1 mol of Compound 1 into 1 mol of Unknown X**.\nMoles of Compound 1 = 33 mg ÷ 165 mg/mmol = **0.20 mmol**.\nMoles converted = 0.25 × 0.20 mmol = **0.050 mmol**.\nMass of X = 0.050 mmol × 137 mg/mmol = **6.85 ≈ 6.9 mg**.\n\n**8.3 mg** uses the molar mass of Compound 1 (0.050 × 165), ignoring the mass lost as ethanol.\n**21 mg** uses the 75% that was not converted (0.15 × 137).\n**27 mg** forgets the 25% and converts all 0.20 mmol (0.20 × 137).",
      "id": "p_cpp3_2_q3"
     },
     {
      "q": "A chemist wants to recover unreacted Compound 1, free of Unknown X, from an ethyl acetate solution that contains both. Which step would best accomplish this?",
      "choices": [
       "Washing the solution with aqueous NaHCO₃ and keeping the ethyl acetate layer",
       "Washing the solution with 1 M HCl and keeping the aqueous layer",
       "Washing the solution with pure water and keeping the ethyl acetate layer",
       "Adding hexane and keeping the hexane layer"
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "X",
      "exp": "An extraction works when one compound can be made **ionic** while the other stays neutral. Unknown X is a **carboxylic acid** (pKa about 5); NaHCO₃ is basic enough to deprotonate it to the **carboxylate anion**, which moves into the water layer. Compound 1 is an ester with only a weakly basic aryl amine, so it stays neutral in the **ethyl acetate layer**. (The same chemistry is why the laboratory acidified the diluted gel to pH 3 before extracting it: at the gel's pH of 9.0, Unknown X is a carboxylate and would have stayed in the water.)\n\n**1 M HCl** protonates the aryl NH₂ of both compounds (each is an aniline), so both would move into the aqueous layer and nothing would be separated.\n**Pure water** leaves X mostly un-ionized, and a neutral aromatic acid stays largely in the organic layer.\n**Hexane** mixes with ethyl acetate to form one layer, so no separation occurs.",
      "id": "p_cpp3_2_q4"
     }
    ]
   },
   {
    "id": "p_cpp3_3",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5A",
     "5D"
    ],
    "title": "Calcium Oxalate Supersaturation in Kidney Stone Formers",
    "passage": "About 80% of kidney stones contain calcium, and most of these are composed largely of calcium oxalate. A stone can begin to grow only when urine is supersaturated, that is, when the ion product [Ca²⁺][C₂O₄²⁻] is greater than the solubility product of the solid (Reaction 1). Only free (uncomplexed) ions count toward the ion product. Supersaturation alone does not guarantee a stone, because crystals must also nucleate and grow large enough to be trapped in the kidney, but stone formers tend to have more highly supersaturated urine.\n\nCaC₂O₄(s) ⇌ Ca²⁺(aq) + C₂O₄²⁻(aq)     Ksp = 2.5 × 10⁻⁹ at 37°C\nReaction 1\n\nOxalate is the conjugate base of oxalic acid, H₂C₂O₄, a diprotic acid (pKa1 = 1.3, pKa2 = 4.3). Urinary citrate, the conjugate base of citric acid, protects against stones because it forms soluble complexes with Ca²⁺ and so lowers the free Ca²⁺ concentration. Patients with low urinary citrate are often treated with potassium citrate, and all stone formers are advised to drink enough fluid to produce at least 2 L of urine per day. High urinary oxalate can result from a diet rich in spinach or nuts, or from fat malabsorption, which leaves more dietary oxalate free to be absorbed in the colon.\n\nClinicians collected 24-hour urine samples from four patients with recurrent stones. Urine volume, pH and total citrate were measured directly. The free concentrations of Ca²⁺ and C₂O₄²⁻ were then calculated with a computer program that accounts for complex formation and acid–base equilibria. The results are shown in Table 1.",
    "figure": {
     "caption": "Table 1 Analysis of 24-hour urine samples",
     "columns": [
      "Patient",
      "Volume (L/day)",
      "pH",
      "Total citrate (mM)",
      "Free Ca²⁺ (mM)",
      "Free C₂O₄²⁻ (mM)"
     ],
     "rows": [
      [
       "A",
       "2.5",
       "6.2",
       "3.0",
       "0.10",
       "0.020"
      ],
      [
       "B",
       "1.0",
       "5.8",
       "1.0",
       "0.20",
       "0.025"
      ],
      [
       "C",
       "1.8",
       "6.5",
       "2.4",
       "0.050",
       "0.040"
      ],
      [
       "D",
       "0.8",
       "5.5",
       "0.6",
       "0.25",
       "0.040"
      ]
     ]
    },
    "questions": [
     {
      "q": "Given the free Ca²⁺ concentration in Patient D's urine, what is the highest free C₂O₄²⁻ concentration the urine could contain without being supersaturated with calcium oxalate?",
      "choices": [
       "1.0 μM",
       "10 μM",
       "50 μM",
       "100 μM"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "The urine is just saturated when [Ca²⁺][C₂O₄²⁻] = Ksp. Patient D's free Ca²⁺ is 0.25 mM = **2.5 × 10⁻⁴ M** (Table 1). So the maximum [C₂O₄²⁻] = 2.5 × 10⁻⁹ ÷ 2.5 × 10⁻⁴ = **1.0 × 10⁻⁵ M = 10 μM**. This is the **common-ion effect**: the Ca²⁺ already present lowers how much oxalate can stay dissolved. Patient D's actual value (40 μM) is four times higher.\n\n**50 μM** is √Ksp (5.0 × 10⁻⁵ M), the solubility in pure water, which ignores the Ca²⁺ already in the urine.\n**1.0 μM** results from converting 0.25 mM to 2.5 × 10⁻³ M (a factor-of-10 slip).\n**100 μM** results from converting 0.25 mM to 2.5 × 10⁻⁵ M.",
      "id": "p_cpp3_3_q1"
     },
     {
      "q": "If a patient's urine pH fell from 6.0 to 4.0 with no change in total calcium or total oxalate, how would the solubility of calcium oxalate change?",
      "choices": [
       "It would increase, because C₂O₄²⁻ would be protonated, lowering the free C₂O₄²⁻ concentration.",
       "It would increase, because H⁺ would form a complex with Ca²⁺, lowering the free Ca²⁺ concentration.",
       "It would decrease, because H⁺ would act as a common ion with the dissolved salt.",
       "It would decrease, because HC₂O₄⁻ would bind Ca²⁺ more tightly than C₂O₄²⁻ does."
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Oxalate is a weak base: C₂O₄²⁻ + H⁺ ⇌ HC₂O₄⁻, with pKa2 = 4.3. At pH 6.0, pH > pKa2 by 1.7 units, so almost all oxalate is C₂O₄²⁻. At pH 4.0, pH < pKa2, so **more than half is protonated** ([C₂O₄²⁻]/[HC₂O₄⁻] = 10⁻⁰·³ ≈ 0.5). Removing C₂O₄²⁻ lowers the ion product, and by **Le Châtelier's principle** more CaC₂O₄ dissolves. Salts of weak acids become more soluble in acid.\n\n**H⁺ complexing Ca²⁺** is wrong: both are cations, so they repel.\n**H⁺ as a common ion** is wrong: H⁺ does not appear in Reaction 1.\n**HC₂O₄⁻ binding Ca²⁺ more tightly** is backwards: with only one negative charge it attracts Ca²⁺ less than the dianion does.",
      "id": "p_cpp3_3_q2"
     },
     {
      "q": "Based on Table 1, which patients' urine samples were supersaturated with calcium oxalate?",
      "choices": [
       "B and D only",
       "D only",
       "A and C only",
       "A, B, C and D"
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Compute each ion product Q = [Ca²⁺][C₂O₄²⁻] in molar units and compare it with Ksp = 2.5 × 10⁻⁹:\nA: (1.0 × 10⁻⁴)(2.0 × 10⁻⁵) = 2.0 × 10⁻⁹ (below Ksp)\nB: (2.0 × 10⁻⁴)(2.5 × 10⁻⁵) = **5.0 × 10⁻⁹ (above)**\nC: (5.0 × 10⁻⁵)(4.0 × 10⁻⁵) = 2.0 × 10⁻⁹ (below)\nD: (2.5 × 10⁻⁴)(4.0 × 10⁻⁵) = **1.0 × 10⁻⁸ (above)**\nSo **B and D** are supersaturated. Both also have the lowest urine volume and citrate, which fits the passage's advice.\n\n**D only** misses B, whose Q is twice Ksp.\n**A and C only** reverses the comparison (Q < Ksp means undersaturated).\n**All four** treats every Q of order 10⁻⁹ as matching Ksp without comparing the coefficients.",
      "id": "p_cpp3_3_q3"
     },
     {
      "q": "Citrate is formed by deprotonating citric acid (shown). Which functional groups does citric acid contain?",
      "fig": "citrate",
      "choices": [
       "Three carboxylic acid groups and one tertiary alcohol",
       "Three carboxylic acid groups and one secondary alcohol",
       "Three carboxylic acid groups and one primary alcohol",
       "Two carboxylic acid groups, one ester and one tertiary alcohol"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "biochemistry",
      "exp": "Citric acid (HOOC–CH₂–C(OH)(COOH)–CH₂–COOH) has **three –COOH groups** and one –OH. The OH sits on the central carbon, which is bonded to **three other carbons** (two CH₂ groups and one COOH carbon), so it is a **tertiary alcohol**. Losing the three acidic H⁺ gives citrate, whose carboxylates bind Ca²⁺.\n\nA **secondary** alcohol carbon would be bonded to two carbons, and a **primary** one to only one carbon.\nThere is **no ester** (no C(=O)–O–C linkage); every C=O carbon bears an OH.",
      "id": "p_cpp3_3_q4"
     }
    ]
   },
   {
    "id": "p_cpp3_4",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4D",
     "4E",
     "5D"
    ],
    "title": "Imaging Cells with a Fluorescein-Labeled Antibody",
    "passage": "Immunofluorescence microscopy locates a protein inside a cell by using an antibody that carries a fluorescent dye. A common dye is fluorescein isothiocyanate (FITC, Compound 1). To label an antibody, the protein is mixed with Compound 1 in a pH 9.0 carbonate buffer for 2 hours. The isothiocyanate group (–N=C=S) reacts with free amino groups on the protein to form a stable thiourea linkage, and unreacted dye is then removed by gel filtration.\n\nIn the labeled antibody, the fluorescein group absorbs most strongly at 495 nm and emits most strongly at 520 nm, with a fluorescence quantum yield of about 0.9. Its emission drops sharply below about pH 6, because the dye's phenol group (pKa ≈ 6.4) becomes protonated. Each fluorescein group emits only a few tens of thousands of photons before it is irreversibly destroyed (photobleached), so labeled samples are kept in the dark until they are imaged.\n\nA student's microscope uses an LED centered at 495 nm for excitation and a filter that passes only light between 510 and 550 nm to the eyepiece. The objective can be treated as a single thin converging lens with a focal length of 10 mm. When the specimen is in focus, it sits 11 mm in front of the objective, which forms a real intermediate image that is viewed through a 10× eyepiece. The objective's numerical aperture is 0.65, so the smallest separation it can resolve at 520 nm is about 0.5 μm. (Use h = 6.6 × 10⁻³⁴ J·s and c = 3.0 × 10⁸ m/s.)",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Structure of fluorescein isothiocyanate (Compound 1)",
      "parts": [
       "cpp3-fitc"
      ]
     }
    ],
    "questions": [
     {
      "q": "What is the total magnification of the student's microscope when the specimen is in focus?",
      "choices": [
       "4.8×",
       "10×",
       "20×",
       "100×"
      ],
      "ans": 3,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "First find where the objective forms its image with the thin-lens equation, 1/f = 1/do + 1/di:\n1/di = 1/10 mm − 1/11 mm = (11 − 10)/110 mm = 1/110 mm, so **di = 110 mm**.\nObjective magnification: |m| = di/do = 110/11 = **10**.\nTotal magnification = objective × eyepiece = 10 × 10 = **100×** (the image is inverted).\n\n**10×** is the objective alone; the eyepiece magnifies again.\n**20×** adds the two magnifications instead of multiplying them.\n**4.8×** comes from adding 1/10 and 1/11 (di = 5.2 mm, |m| = 0.48), a sign error in the lens equation.",
      "id": "p_cpp3_4_q1"
     },
     {
      "q": "What is the energy of one photon emitted by the excitation LED?",
      "choices": [
       "4.0 × 10⁻¹⁹ J",
       "4.0 × 10⁻²⁸ J",
       "1.3 × 10⁻²⁷ J",
       "9.8 × 10⁻³² J"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Use **E = hf = hc/λ**, with λ in meters: 495 nm = 4.95 × 10⁻⁷ m.\nE = (6.6 × 10⁻³⁴ J·s)(3.0 × 10⁸ m/s) ÷ (4.95 × 10⁻⁷ m) = (1.98 × 10⁻²⁵) ÷ (4.95 × 10⁻⁷) = **4.0 × 10⁻¹⁹ J** (about 2.5 eV, typical of visible light).\n\n**4.0 × 10⁻²⁸ J** divides by 495 instead of 4.95 × 10⁻⁷ (nm not converted to m).\n**1.3 × 10⁻²⁷ J** leaves out c (h/λ).\n**9.8 × 10⁻³² J** multiplies by λ instead of dividing (treating f as cλ).",
      "id": "p_cpp3_4_q2"
     },
     {
      "q": "Why is the light emitted by the labeled antibody at a longer wavelength than the light it absorbs?",
      "choices": [
       "Part of the absorbed energy is lost as heat through vibrational relaxation before the photon is emitted.",
       "The emitted photon gains energy from collisions with solvent molecules before it leaves the dye.",
       "Emission occurs from a higher excited state than the one reached by absorption.",
       "The light slows down in the aqueous specimen, which lengthens its wavelength."
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "gen_chem",
      "exp": "Photon energy and wavelength are inversely related (E = hc/λ), so a **longer emission wavelength means each emitted photon has less energy** than the absorbed one. After absorption, the excited molecule quickly loses some energy as **heat (vibrational relaxation)** to the solvent and then emits from the lowest excited state. This energy gap is the Stokes shift (495 → 520 nm here), and it lets a filter separate the emitted light from the excitation light.\n\n**Gaining energy** from collisions would shorten the wavelength, not lengthen it.\n**Emission from a higher excited state** would also give a higher-energy, shorter-wavelength photon.\n**Slowing in water** shortens the wavelength (λ = v/f with f unchanged), and the light returns to its original wavelength in air anyway.",
      "id": "p_cpp3_4_q3"
     },
     {
      "q": "Which amino acid side chain in the antibody is most likely to form the thiourea linkage with Compound 1?",
      "choices": [
       "Lysine, because its side chain contains a primary amino group",
       "Arginine, because its side chain is the most basic of the amino acids",
       "Aspartate, because its side chain is negatively charged at pH 9.0",
       "Tryptophan, because its side chain contains a nitrogen atom in an aromatic ring"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "biochemistry",
      "exp": "The passage says –N=C=S reacts with **free amino groups**. The nitrogen lone pair attacks the central carbon of the isothiocyanate to give R–NH–C(=S)–NH–dye. **Lysine's side chain ends in a primary –NH₂** (pKa about 10.5), and the pH 9.0 buffer leaves enough of it unprotonated to act as a nucleophile. The N-terminal amino group can react the same way.\n\n**Arginine's** guanidino group (pKa about 12.5) is almost fully protonated at pH 9.0, and its positive charge is delocalized, so it is a very poor nucleophile.\n**Aspartate's** carboxylate is charged but has no amino group, so it cannot form a thiourea.\n**Tryptophan's** indole N–H lone pair is part of the aromatic π system, so it is not available to attack.",
      "id": "p_cpp3_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp3_5",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4C",
     "5B",
     "5E"
    ],
    "title": "The Cell Membrane as a Capacitor",
    "passage": "The lipid bilayer of a cell membrane is a thin insulating layer between two conducting salt solutions, the cytoplasm and the extracellular fluid. Electrically, the membrane therefore behaves like a parallel-plate capacitor, for which C = κε₀A/d. Here κ is the dielectric constant of the insulator, ε₀ = 8.85 × 10⁻¹² C²/(N·m²), A is the plate area and d is the plate separation. In a bilayer the insulator is the hydrocarbon core formed by the lipid acyl chains, which is about 3 nm thick and has κ ≈ 2. The polar head groups are hydrated and conduct almost as well as the surrounding solution.\n\nThe measured capacitance per unit area of nearly all biological membranes is close to 1.0 μF/cm², somewhat higher than the roughly 0.6 μF/cm² that this simple model predicts. A membrane potential exists when a small excess of positive charge sits on one face of the membrane and an equal excess of negative charge sits on the other, according to Q = CV. These excess ions lie within about 1 nm of the membrane surface, and the bulk solutions on both sides remain electrically neutral.\n\nResearchers modeled a spherical cell with a membrane area of 2.0 × 10⁻⁵ cm² and a resting membrane potential of −80 mV (inside relative to outside). The cytoplasm contains 140 mM K⁺ and 10 mM Na⁺, and the extracellular fluid contains 5 mM K⁺ and 145 mM Na⁺. The membrane resistance is about 1 × 10⁸ Ω, so the membrane's RC time constant is about 2 ms.\n\nWhen an ion crosses the membrane, its free energy change has a concentration term and an electrical term. The electrical term, per mole of ion, is zFΔψ, where z is the ion's charge, F = 96,500 C/mol, and Δψ is the potential of the side the ion moves to minus the potential of the side it leaves. (Use e = 1.6 × 10⁻¹⁹ C.)",
    "questions": [
     {
      "q": "In the model cell at rest, how many excess negative charges (counted as monovalent anions) line the inner face of the membrane?",
      "choices": [
       "1.0 × 10³",
       "1.0 × 10⁷",
       "1.0 × 10¹⁰",
       "5.0 × 10¹¹"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "Find the capacitance, then the charge, then divide by the charge per ion.\nC = (1.0 × 10⁻⁶ F/cm²)(2.0 × 10⁻⁵ cm²) = **2.0 × 10⁻¹¹ F** (20 pF).\nQ = CV = (2.0 × 10⁻¹¹ F)(0.080 V) = **1.6 × 10⁻¹² C**.\nNumber of ions = 1.6 × 10⁻¹² C ÷ 1.6 × 10⁻¹⁹ C = **1.0 × 10⁷**.\nThat is tiny compared with the roughly 10¹² K⁺ ions in the cytoplasm, which is why the bulk solution stays neutral.\n\n**1.0 × 10¹⁰** uses 80 V instead of 0.080 V (mV not converted).\n**5.0 × 10¹¹** uses 1.0 μF as the cell's capacitance, forgetting to multiply by the area.\n**1.0 × 10³** converts the area to m² (2.0 × 10⁻⁹ m²) but keeps the capacitance per cm².",
      "id": "p_cpp3_5_q1"
     },
     {
      "q": "Myelin wraps an axon in layers that act like about 100 cell membranes in series. What is the capacitance per unit area of a myelinated segment?",
      "choices": [
       "0.010 μF/cm²",
       "0.10 μF/cm²",
       "1.0 μF/cm²",
       "100 μF/cm²"
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "For capacitors **in series**, 1/C = 1/C₁ + 1/C₂ + …, so 100 identical membranes give 1/C = 100/(1.0 μF/cm²), and **C = 0.010 μF/cm²**. Equivalently, C = κε₀A/d, and stacking the layers makes the insulator about **100 times thicker**. Because much less charge is needed to change the voltage, myelin speeds conduction.\n\n**0.10 μF/cm²** is a factor-of-10 slip.\n**1.0 μF/cm²** assumes added layers do not matter.\n**100 μF/cm²** adds the capacitances as if the layers were **in parallel**.",
      "id": "p_cpp3_5_q2"
     },
     {
      "q": "The researchers want to test the model's prediction that the capacitance per unit area is inversely proportional to the thickness of the hydrocarbon core. Which set of artificial bilayers would best test this prediction?",
      "choices": [
       "Saturated phosphatidylcholines whose two acyl chains are 14, 16, 18 or 20 carbons long",
       "Phosphatidylcholine, phosphatidylserine and phosphatidylethanolamine, each with two saturated 16-carbon chains",
       "Phosphatidylcholines with 18-carbon chains containing 0, 1, 2 or 3 cis double bonds",
       "One saturated 16-carbon phosphatidylcholine tested in 10, 100 and 1000 mM KCl"
      ],
      "ans": 0,
      "cat": "5B",
      "skill": "SIRS 3",
      "diff": "D",
      "subj": "biochemistry",
      "exp": "The variable to change is **d, the thickness of the hydrocarbon core**, and everything else should stay the same. Lengthening **saturated** acyl chains while keeping the same head group makes the core thicker in regular steps without changing its nonpolar character (κ). The model predicts lower capacitance for longer chains.\n\n**Changing the head group** alters the polar surface, which the passage says conducts like the solution, not the core thickness.\n**Adding cis double bonds** puts kinks in the chains, which changes packing, fluidity and thickness all at once, so any effect could not be assigned to thickness alone.\n**Changing the KCl concentration** alters the conducting solutions, not the insulator.",
      "id": "p_cpp3_5_q3"
     },
     {
      "q": "What is the electrical contribution to ΔG when 1 mol of Na⁺ moves from the extracellular fluid into the model cell at rest?",
      "choices": [
       "−7.7 kJ/mol",
       "+7.7 kJ/mol",
       "−15 kJ/mol",
       "−7.7 × 10³ kJ/mol"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "Use zFΔψ, with Δψ = (inside) − (outside) because the ion moves inward. The inside is 80 mV more negative, so **Δψ = −0.080 V**. For Na⁺, z = +1:\nΔG(elec) = (+1)(96,500 C/mol)(−0.080 V) = −7,720 J/mol ≈ **−7.7 kJ/mol**.\nThe sign makes sense: a cation moving toward the negative side is moving downhill electrically. (The concentration term, 10 mM inside vs 145 mM outside, is also favorable.)\n\n**+7.7 kJ/mol** uses outside minus inside, which reverses the sign.\n**−15 kJ/mol** uses z = 2, as for Ca²⁺.\n**−7.7 × 10³ kJ/mol** uses 80 V instead of 0.080 V.",
      "id": "p_cpp3_5_q4"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "In a hydraulic lift used to raise a patient's bed, a small piston presses on enclosed oil, which in turn presses on a much larger piston. Compared with the pressure increase produced at the small piston, the pressure increase at the large piston is:",
    "choices": [
     "larger, and the force on the large piston is larger.",
     "the same, and the force on the large piston is the same.",
     "smaller, and the force on the large piston is the same.",
     "the same, and the force on the large piston is larger."
    ],
    "ans": 3,
    "cat": "4B",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "**Pascal's principle**: a pressure change applied to an enclosed, incompressible fluid is transmitted **undiminished** to every part of the fluid. So the pressure increase is the same at both pistons. Because **F = PA**, the larger piston receives a larger force in proportion to its area: F₂ = F₁(A₂/A₁). Energy is still conserved, because the large piston moves a shorter distance.\n\n**Larger pressure** confuses pressure with force; the area ratio multiplies the force, not the pressure.\n**The same force** ignores F = PA: equal pressure on a bigger area gives a bigger force.\n**Smaller pressure, same force** treats force as what the fluid transmits, but the fluid transmits pressure.",
    "id": "cp_half_3_sa1"
   },
   {
    "q": "In hydrostatic weighing used to estimate body fat, a person weighs 630 N in air and has an apparent weight of 30 N when fully submerged in water (density 1.0 × 10³ kg/m³). What is the person's average density? (Use g = 10 m/s².)",
    "choices": [
     "9.5 × 10² kg/m³",
     "1.0 × 10³ kg/m³",
     "1.05 × 10³ kg/m³",
     "2.1 × 10⁴ kg/m³"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "The loss of apparent weight equals the **buoyant force**: F_b = 630 N − 30 N = 600 N. By **Archimedes' principle**, F_b = ρ_water·V·g, so V = 600 N ÷ (1000 kg/m³ × 10 m/s²) = 0.060 m³. The mass is 630 N ÷ 10 m/s² = 63 kg, so ρ = 63 kg ÷ 0.060 m³ = **1.05 × 10³ kg/m³**. Slightly denser than water, so the person sinks.\n\n**9.5 × 10² kg/m³** inverts the ratio (600/630 × 1000); a body less dense than water would float.\n**1.0 × 10³ kg/m³** would mean exactly the density of water, which would give an apparent weight of zero, not 30 N.\n**2.1 × 10⁴ kg/m³** uses the apparent weight (30 N) as the buoyant force.",
    "id": "cp_half_3_sa2"
   },
   {
    "id": "cp_half_3_sa3b",
    "q": "A 0.20 kg sled on a lab track is pulled from rest to a speed of 3.0 m/s in 0.50 s. What average net force acted on it?",
    "choices": [
     "0.30 N",
     "0.60 N",
     "1.2 N",
     "6.0 N"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "a = Δv/Δt = 3.0 m/s ÷ 0.50 s = 6.0 m/s². **F = ma** = 0.20 kg × 6.0 m/s² = **1.2 N**.\n**0.60 N** is m × v (the momentum change) without dividing by the time.\n**0.30 N** multiplies by the time instead of dividing.\n**6.0 N** is the acceleration's value, not the force."
   },
   {
    "q": "A nurse pushes horizontally with a force of 40 N on a hospital bed whose wheels are locked, and the bed does not move. What is the static friction force exerted on the bed by the floor?",
    "choices": [
     "μs times the bed's weight, directed opposite the push",
     "More than 40 N, directed opposite the push",
     "40 N, directed opposite the push",
     "0 N, because the bed is not moving"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "The bed stays at rest, so its acceleration is zero and the **net horizontal force is zero** (Newton's first law). The only horizontal forces are the push and static friction, so friction must be **40 N, opposite the push**. Static friction adjusts to whatever is needed to prevent sliding, up to a maximum of μsN.\n\n**0 N** would leave the 40 N push unbalanced, and the bed would accelerate.\n**μs × weight** (μsN on a level floor) is the **maximum** static friction, reached only when the bed is about to slide; the actual value can be smaller.\n**More than 40 N** would give a net force opposite the push, and the bed would accelerate toward the nurse.",
    "id": "cp_half_3_sa4"
   },
   {
    "q": "A sample of gas in a cylinder is taken from the same initial state to the same final state (same pressure, volume and temperature at the start and at the end) by two different routes. In one route it is heated at constant volume and then allowed to expand; in the other it expands first and is then heated. Which quantity can differ between the two routes?",
    "choices": [
     "The heat absorbed by the gas",
     "The change in internal energy of the gas",
     "The change in enthalpy of the gas",
     "The change in entropy of the gas"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Internal energy, enthalpy and entropy are **state functions**: their changes depend only on the starting and ending states, not on how the system got there. **Heat and work are path functions.** By the first law, ΔU = q + w (w = work done on the gas). ΔU is the same for both routes, but the work is not: in the route that heats first, the gas expands against a higher pressure and does more work on its surroundings, so it must absorb **more heat** to reach the same final internal energy.\n\n**ΔU** is fixed by the two states; only how it splits into q and w changes.\n**ΔH = ΔU + Δ(PV)**, and P and V are the same at the start and at the end for both routes, so ΔH is also the same.\n**ΔS** is a state function too; it is calculated along a reversible path, but its value doesn't depend on which path the gas actually took.",
    "id": "cp_half_3_sa5"
   },
   {
    "q": "For the reaction A + 2B → C, the following initial rates were measured.\nTrial 1: [A] = 0.10 M, [B] = 0.10 M, rate = 2.0 × 10⁻⁴ M/s\nTrial 2: [A] = 0.20 M, [B] = 0.10 M, rate = 8.0 × 10⁻⁴ M/s\nTrial 3: [A] = 0.10 M, [B] = 0.30 M, rate = 6.0 × 10⁻⁴ M/s\nWhich rate law fits these data?",
    "choices": [
     "rate = k[A]²[B]",
     "rate = k[A][B]²",
     "rate = k[A]⁴[B]³",
     "rate = k[A][B]"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "Change one concentration at a time.\nTrials 1 → 2: [A] doubles with [B] fixed, and the rate goes from 2.0 to 8.0 (×4). Since 2ⁿ = 4, the reaction is **second order in A**.\nTrials 1 → 3: [B] triples with [A] fixed, and the rate goes from 2.0 to 6.0 (×3). Since 3ᵐ = 3, it is **first order in B**.\nSo **rate = k[A]²[B]**.\n\n**k[A][B]²** copies the coefficients from the balanced equation; orders must come from experiment.\n**k[A]⁴[B]³** uses the rate ratios themselves as the exponents.\n**k[A][B]** assumes first order in each without checking the data.",
    "id": "cp_half_3_sa6"
   },
   {
    "q": "Zinc and the other first-row transition metals in metalloenzymes have valence electrons in 3d orbitals. Which set of quantum numbers (n, l, ml, ms) could describe an electron in a 3d orbital?",
    "choices": [
     "n = 3, l = 2, ml = 3, ms = −½",
     "n = 3, l = 2, ml = −2, ms = +½",
     "n = 3, l = 1, ml = 0, ms = −½",
     "n = 3, l = 3, ml = 1, ms = +½"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "A 3d electron has **n = 3** (the shell) and **l = 2** (the d subshell; s = 0, p = 1, d = 2, f = 3). For l = 2, **ml** can be any whole number from −2 to +2, and **ms** is +½ or −½. So (3, 2, −2, +½) is allowed and describes a 3d electron.\n\n**l = 1** describes a p subshell, so (3, 1, 0, −½) is a 3p electron, not a 3d electron.\n**l = 3** is not allowed when n = 3, because l can only run from 0 to n − 1.\n**ml = 3** is not allowed when l = 2, because ml must lie between −l and +l.",
    "id": "cp_half_3_sa7"
   },
   {
    "q": "Complete hydrolysis of which compound gives a single organic product that contains both an amino group and a carboxylic acid group?",
    "choices": [
     "Caprolactam",
     "N-methylpropanamide",
     "ε-Caprolactone",
     "Ethyl acetate"
    ],
    "choiceFigs": [
     "caprolactam",
     "n-methylpropanamide",
     "epsilon-caprolactone",
     "ethyl-acetate"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "organic_chem",
    "exp": "Hydrolysis breaks the C(=O)–N bond of an amide or the C(=O)–O bond of an ester. In a **cyclic** compound the two pieces stay attached, so only one product forms. **Caprolactam is a cyclic amide (lactam)**, so it opens to a single molecule, 6-aminohexanoic acid, H₂N(CH₂)₅COOH, which has both groups. (Nylon-6 is made from this ring.)\n\n**N-methylpropanamide** is an amide but not cyclic: it splits into two products, propanoic acid and methylamine.\n**ε-Caprolactone** is cyclic, but it is an ester (lactone): it gives 6-hydroxyhexanoic acid, which has an OH rather than an NH₂.\n**Ethyl acetate** gives two products, acetic acid and ethanol, and neither contains nitrogen.",
    "id": "cp_half_3_sa8"
   },
   {
    "q": "Which statement best describes the C–N bond between the carbonyl carbon and the nitrogen of an amide such as N-methylpropanamide?",
    "choices": [
     "It is shorter than a typical C–N single bond, and rotation about it is restricted.",
     "It is a typical C–N single bond, and the nitrogen is sp³ hybridized.",
     "It is a full C=N double bond, and the carbonyl oxygen carries no negative charge.",
     "It is longer than a typical C–N single bond, because the nitrogen lone pair repels the carbonyl oxygen."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "The nitrogen lone pair is **delocalized into the carbonyl by resonance** (O=C–N ↔ ⁻O–C=N⁺), giving the C–N bond **partial double-bond character**. So it is shorter than a C–N single bond, the nitrogen is **sp² and planar**, and **rotation is restricted**. This is why the peptide bond in proteins is planar.\n\n**A plain single bond with sp³ N** ignores the resonance.\n**A full double bond** overstates it; the real structure is a hybrid, with partial negative charge on O.\n**Longer** is backwards; resonance shortens the bond.",
    "id": "cp_half_3_sa9"
   },
   {
    "q": "Two cysteine residues in a protein form a disulfide bond. Which statement correctly describes this reaction?",
    "choices": [
     "It is an oxidation, because each sulfur loses a hydrogen and the sulfurs bond to each other.",
     "It is a reduction, because each sulfur gains an electron from the other.",
     "It is a hydrolysis, because water is added across the two thiol groups.",
     "It is a dehydration, because water is removed from the two thiol groups."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "2 R–SH → R–S–S–R + 2H⁺ + 2e⁻. Each sulfur **loses a hydrogen (and an electron)** and forms an S–S bond, which is the definition of an **oxidation**. That is why disulfides form readily in the oxidizing environment outside cells and are broken by reducing agents such as β-mercaptoethanol or DTT.\n\n**Reduction** is the reverse reaction, which breaks the disulfide back into two thiols.\n**Hydrolysis** adds water to break a bond; no water is used here.\n**Dehydration** removes H and OH; thiols have no OH, and no water is formed (the H atoms leave as 2H⁺ + 2e⁻ to an oxidant).",
    "id": "cp_half_3_sa10"
   }
  ]
 },
 {
  "id": "cp_half_4",
  "title": "Chem/Phys Quiz 4",
  "order": [
   "p_cpp4_1",
   "p_cpp4_2",
   4,
   "p_cpp4_6",
   "p_cpp4_4",
   3,
   "p_cpp4_5",
   3
  ],
  "passages": [
   {
    "id": "p_cpp4_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5A",
     "5B"
    ],
    "title": "Trehalose in Freeze-Dried Antibody Formulations",
    "passage": "Monoclonal antibodies are often shipped as freeze-dried (lyophilized) powders, because proteins in the dry state unfold and react far more slowly than they do in solution. Drying, however, also strips away the shell of water that helps hold a folded protein together. To protect the protein, formulators add a disaccharide such as trehalose (Compound 1), a sugar made by organisms that survive almost complete dehydration. Compound 1 is built from two α-D-glucose units. Two explanations for its effect have been proposed. In the water-replacement model, the sugar takes the place of water at the protein surface. In the vitrification model, the sugar forms a rigid glass that traps the protein and slows its motion.\n\nResearchers freeze-dried an IgG antibody (0.50 mg/mL in 10 mM histidine buffer, pH 6.0) with 0.25 M of one of three sugars: Compound 1, sucrose, or maltose (Compound 2). A fourth sample contained no sugar. The powders were stored at 40°C for 6 months, then redissolved and analyzed. Aggregates, measured by size-exclusion chromatography, made up 1.2% of the antibody with Compound 1, 2.5% with sucrose, 9.8% with Compound 2, and 18% with no sugar. The glass transition temperatures of the dry sugars, above which a sugar glass softens, are about 115°C for Compound 1, 95°C for Compound 2, and 70°C for sucrose.\n\nOnly the Compound 2 powders turned yellow-brown during storage. Mass spectrometry of the recovered antibody showed that many lysine residues had gained 324 Da, the mass of Compound 2 minus one water molecule. This is the first step of the Maillard reaction, the same chemistry that browns toasted bread. No such adducts were found in the samples made with Compound 1 or sucrose.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Structures of trehalose (Compound 1) and maltose (Compound 2)",
      "parts": [
       "cpp4-trehalose",
       "cpp4-maltose"
      ]
     }
    ],
    "questions": [
     {
      "q": "The glycosidic bond that joins the two glucose units of Compound 1 is best described as:",
      "choices": [
       "α(1→1)",
       "α(1→4)",
       "β(1→4)",
       "α(1→6)"
      ],
      "ans": 0,
      "skill": "SIRS 1",
      "cat": "5D",
      "diff": "E",
      "exp": "In Figure 1, the single bridging oxygen of Compound 1 connects **C1 of one glucose to C1 of the other**. The passage says both units are α-D-glucose, so the bond is **α(1→1)** (often written α,α-1,1). Because both anomeric carbons are tied up in this bond, neither ring can open.\n\n**α(1→4)** is the bond in maltose (Compound 2), which joins C1 of one glucose to the C4 oxygen of the next.\n**β(1→4)** is the cellulose and lactose type of bond.\n**α(1→6)** is the branch-point bond of glycogen and amylopectin.",
      "id": "p_cpp4_1_q1"
     },
     {
      "q": "Which structural difference best explains why only the formulation containing Compound 2 formed lysine adducts?",
      "choices": [
       "Compound 2 has a hemiacetal carbon that can open to an aldehyde, which condenses with lysine amino groups.",
       "Compound 2 has more hydroxyl groups than Compound 1, so it hydrogen-bonds more tightly to lysine side chains.",
       "Compound 2 contains a β-glycosidic bond, which lysine side chains hydrolyze during storage.",
       "Compound 2 is a ketose, and its ketone carbonyl reacts with amines faster than an aldehyde does."
      ],
      "ans": 0,
      "skill": "SIRS 2",
      "cat": "5D",
      "diff": "D",
      "exp": "In Compound 2, C1 of the right-hand glucose still carries an OH and the ring oxygen: it is a **hemiacetal**. A hemiacetal is in equilibrium with the open-chain **aldehyde**, so maltose is a **reducing sugar**. The aldehyde condenses with the ε-NH₂ of lysine to form an imine (Schiff base), losing one H₂O. That matches the mass gain: 342 − 18 = **324 Da**. In Compound 1, both anomeric carbons are in the glycosidic bond (an acetal), so it cannot open. Sucrose is also non-reducing for the same reason.\n\nBoth sugars are C₁₂H₂₂O₁₁ with **8 OH groups each**, and hydrogen bonds would not add a covalent 324 Da mass.\nMaltose's bond is **α**(1→4), and hydrolysis would split the sugar rather than add it to the protein.\nMaltose is made of two glucoses, so it is an **aldose**, not a ketose.",
      "id": "p_cpp4_1_q2"
     },
     {
      "q": "Compound 1 is usually supplied as a crystalline dihydrate, C₁₂H₂₂O₁₁·2H₂O. What mass of the dihydrate is needed to make 200 mL of the 0.25 M trehalose solution used in the study? (Molar mass of C₁₂H₂₂O₁₁ = 342 g/mol)",
      "choices": [
       "1.89 g",
       "17.1 g",
       "18.9 g",
       "94.5 g"
      ],
      "ans": 2,
      "skill": "SIRS 2",
      "cat": "5A",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "**Moles needed:** 0.25 mol/L × 0.200 L = 0.050 mol of trehalose.\n**Molar mass of the dihydrate:** 342 + 2(18) = 378 g/mol. Each mole of crystals delivers one mole of trehalose, so you weigh out the whole hydrate.\n**Mass:** 0.050 mol × 378 g/mol = **18.9 g**.\n\n**17.1 g** uses 342 g/mol and ignores the water of crystallization.\n**94.5 g** forgets the volume (0.25 × 378), which is the mass for a full liter.\n**1.89 g** comes from converting 200 mL to 0.020 L instead of 0.200 L.",
      "id": "p_cpp4_1_q3"
     },
     {
      "q": "According to the water-replacement model, Compound 1 stabilizes the dried antibody mainly by forming which interaction with it?",
      "choices": [
       "Hydrogen bonds between the sugar's hydroxyl groups and polar groups on the protein surface",
       "Hydrophobic interactions between the sugar's ring carbons and nonpolar residues in the protein core",
       "Ionic bonds between the sugar's carboxylate groups and lysine side chains",
       "Covalent glycosidic bonds between the sugar's anomeric carbons and serine side chains"
      ],
      "ans": 0,
      "skill": "SIRS 1",
      "cat": "5B",
      "diff": "M",
      "exp": "In solution, water hydrogen-bonds to the backbone C=O and N–H groups and to polar and charged side chains on the protein surface. The water-replacement model says the sugar's many **–OH groups** take over these **hydrogen bonds** when water is removed, so the folded surface stays satisfied.\n\nThe nonpolar core is buried inside the protein and is not where water binds, so hydrophobic contacts there are not \"replacing water.\"\nTrehalose has no carboxylate groups; it is a neutral sugar.\nBoth anomeric carbons of Compound 1 are already used in its own glycosidic bond, and the passage found no sugar adducts in the trehalose samples.",
      "id": "p_cpp4_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp4_2",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4B",
     "4A"
    ],
    "title": "Catheter Size and Gravity-Fed Infusion",
    "passage": "In emergency care, intravenous (IV) saline is often given by gravity. The bag hangs above the patient, and the height of the fluid surface above the insertion site sets the driving pressure. Fluid flows through wide tubing and then through a short plastic catheter in the vein. Because the catheter is the narrowest part of the path, it usually limits the flow rate. Catheters are sized by gauge: the larger the gauge number, the narrower the catheter, so a 14-gauge catheter is wider than a 22-gauge one. For steady, laminar flow of a fluid with viscosity η through a tube of inner radius r and length L, the volume flow rate Q is given by the Poiseuille equation:\n\nQ = πr⁴ΔP/(8ηL)\nEquation 1\n\nOn a training unit, nurses measured the flow through four catheters attached in turn to the same tubing. The saline bag (density 1.0 × 10³ kg/m³) was hung so that the fluid surface was 1.0 m above the catheter tip, and the catheter drained into an open beaker at atmospheric pressure. Flow was timed with a graduated cylinder, and each value in Table 1 is the mean of three trials. All of the measured flows were lower than Equation 1 predicts for ideal Poiseuille flow, because of resistance in the tubing and pressure losses where the fluid enters the narrow catheter. Catheter 4 was then retested with donor blood (density 1.06 × 10³ kg/m³). The results are shown in Table 1.\n\nIn a patient, the catheter tip sits in a vein where the blood pressure is above atmospheric pressure, so the bag must be raised high enough to overcome this back-pressure before any fluid enters. A typical peripheral venous pressure is about 1.5 kPa (11 mmHg) above atmospheric pressure. Assume g = 10 m/s².",
    "figure": {
     "caption": "Table 1 Flow through IV catheters with the fluid surface 1.0 m above the tip",
     "columns": [
      "Catheter",
      "Inner radius (mm)",
      "Length (mm)",
      "Fluid",
      "Flow rate (mL/min)"
     ],
     "rows": [
      [
       "1",
       "0.40",
       "25",
       "saline",
       "7.5"
      ],
      [
       "2",
       "0.40",
       "50",
       "saline",
       "3.8"
      ],
      [
       "3",
       "0.80",
       "50",
       "saline",
       "60"
      ],
      [
       "4",
       "0.80",
       "25",
       "saline",
       "120"
      ],
      [
       "4",
       "0.80",
       "25",
       "blood",
       "32"
      ]
     ]
    },
    "questions": [
     {
      "q": "Which pair of trials isolates the effect of catheter radius on flow rate, and by what factor did the flow rate change when the radius doubled?",
      "choices": [
       "Catheters 2 and 3; a 16-fold increase",
       "Catheters 2 and 3; a 4-fold increase",
       "Catheters 1 and 3; an 8-fold increase",
       "Catheters 3 and 4; a 2-fold increase"
      ],
      "ans": 0,
      "skill": "SIRS 3",
      "cat": "4B",
      "diff": "M",
      "exp": "To isolate one variable, compare trials that differ **only** in that variable. Catheters 2 and 3 have the same length (50 mm) and the same fluid, and the radius doubles (0.40 → 0.80 mm). Flow rose from 3.8 to 60 mL/min: 60 ÷ 3.8 ≈ **16**. That matches Equation 1: Q ∝ r⁴, and 2⁴ = 16.\n\n**4-fold** is what you would expect if flow scaled with cross-sectional area (r²), but the data show 16.\n**Catheters 1 and 3** differ in both radius and length, so their 8-fold ratio (60 ÷ 7.5) mixes the two effects.\n**Catheters 3 and 4** differ only in length, so they isolate length, not radius.",
      "id": "p_cpp4_2_q1"
     },
     {
      "q": "What is the minimum height of the saline surface above the insertion site that would allow saline to flow into a vein at the typical venous pressure given in the passage?",
      "choices": [
       "1.5 cm",
       "11 cm",
       "15 cm",
       "1.5 m"
      ],
      "ans": 2,
      "skill": "SIRS 2",
      "cat": "4B",
      "diff": "D",
      "exp": "Flow begins when the hydrostatic pressure of the column matches the venous back-pressure: **ρgh = P**.\nh = P ÷ (ρg) = (1.5 × 10³ Pa) ÷ (1.0 × 10³ kg/m³ × 10 m/s²) = 0.15 m = **15 cm**.\n\n**11 cm** treats the 11 mmHg value as if it were 11 cm of saline. Mercury is about 13.6 times denser than saline, so 11 mm of mercury balances a much taller saline column (about 15 cm).\n**1.5 m** leaves g out of the denominator.\n**1.5 cm** is a power-of-ten slip in the kPa → Pa conversion.",
      "id": "p_cpp4_2_q2"
     },
     {
      "q": "What is the average speed of saline inside Catheter 4?",
      "choices": [
       "0.017 m/s",
       "0.25 m/s",
       "1.0 m/s",
       "60 m/s"
      ],
      "ans": 2,
      "skill": "SIRS 2",
      "cat": "4A",
      "diff": "D",
      "exp": "Average speed = volume flow rate ÷ cross-sectional area, **v = Q/A**.\n**Q:** 120 mL/min ÷ 60 s/min = 2.0 mL/s = 2.0 × 10⁻⁶ m³/s (1 mL = 10⁻⁶ m³).\n**A:** πr² = 3.14 × (8.0 × 10⁻⁴ m)² = 3.14 × 6.4 × 10⁻⁷ m² ≈ 2.0 × 10⁻⁶ m².\n**v** = (2.0 × 10⁻⁶ m³/s) ÷ (2.0 × 10⁻⁶ m²) = **1.0 m/s**.\n\n**60 m/s** skips the minutes → seconds conversion.\n**0.25 m/s** uses the diameter (1.6 mm) as the radius, which makes the area 4 times too large.\n**0.017 m/s** divides by 3600 s, as if the rate were per hour.",
      "id": "p_cpp4_2_q3"
     },
     {
      "q": "As saline flows from the bag through Catheter 4 into the open beaker, at approximately what rate is its gravitational potential energy converted to other forms?",
      "choices": [
       "0.0020 W",
       "0.020 W",
       "1.2 W",
       "20 W"
      ],
      "ans": 1,
      "skill": "SIRS 2",
      "cat": "4A",
      "diff": "X",
      "exp": "Power is energy per time. Each second, a mass m of saline drops through h = 1.0 m, so **P = (m/t)gh**.\nMass flow: 2.0 mL/s × 1.0 g/mL = 2.0 g/s = 2.0 × 10⁻³ kg/s.\nP = 2.0 × 10⁻³ kg/s × 10 m/s² × 1.0 m = **0.020 W**.\nEquivalently, P = ΔP × Q = (1.0 × 10⁴ Pa)(2.0 × 10⁻⁶ m³/s) = 0.020 W. Most of this energy is dissipated as heat by viscous friction in the catheter.\n\n**1.2 W** uses the per-minute volume (1.2 × 10⁻⁴ m³) as if it were per second.\n**20 W** treats 2.0 mL/s as 2.0 L/s, i.e., 2.0 kg/s.\n**0.0020 W** leaves out g.",
      "id": "p_cpp4_2_q4"
     }
    ]
   },
   {
    "id": "p_cpp4_6",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5E",
     "5D"
    ],
    "title": "Lactate Dehydrogenase and the Pyruvate Analog Oxamate",
    "passage": "Lactate dehydrogenase (LDH) catalyzes the last step of anaerobic glycolysis: the reduction of pyruvate (CH₃COCOO⁻) to lactate (CH₃CH(OH)COO⁻) by NADH. Regenerating NAD⁺ in this step lets glycolysis continue when oxygen is limited, and tumor cells that rely heavily on glycolysis often overexpress LDH. Oxamate, a small analog of pyruvate in which the methyl group is replaced by an amino group (–NH₂), is studied as an LDH inhibitor.\n\nIn the active site, a positively charged arginine side chain binds the carboxylate group of pyruvate, and a histidine side chain donates a proton to the carbonyl oxygen while NADH transfers a hydride ion (H⁻) to the carbonyl carbon (Figure 1). Oxamate keeps the carboxylate and the carbonyl group, so it fits the same site, but its carbonyl carbon is bonded to nitrogen and is not reduced.\n\nResearchers measured LDH activity in 1.0 cm cuvettes containing 0.20 mM NADH, buffer at pH 7.4 and 25°C, a fixed amount of purified enzyme, and pyruvate at concentrations from 0.10 to 3.2 mM. The rate of each reaction was taken from the decrease in absorbance at 340 nm (NADH absorbs there; NAD⁺ does not) during the first 30 s. The experiment was then repeated with 0.40 mM oxamate in every cuvette. The initial rates are plotted in Figure 2.",
    "figure": {
     "type": "line",
     "caption": "Figure 2 Initial rate of LDH versus pyruvate concentration",
     "x": {
      "label": "Pyruvate (mM)",
      "min": 0,
      "max": 3.2,
      "step": 0.4
     },
     "y": {
      "label": "Initial rate (μM/min)",
      "min": 0,
      "max": 140,
      "step": 20
     },
     "series": [
      {
       "name": "No inhibitor",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0.1,
         40
        ],
        [
         0.2,
         60
        ],
        [
         0.4,
         80
        ],
        [
         0.6,
         90
        ],
        [
         0.8,
         96
        ],
        [
         1.6,
         106.7
        ],
        [
         3.2,
         112.9
        ]
       ]
      },
      {
       "name": "0.40 mM oxamate",
       "marker": "square-open",
       "line": "smooth",
       "points": [
        [
         0.1,
         17.1
        ],
        [
         0.2,
         30
        ],
        [
         0.4,
         48
        ],
        [
         0.6,
         60
        ],
        [
         0.8,
         68.6
        ],
        [
         1.6,
         87.3
        ],
        [
         3.2,
         101.1
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "id": "p_cpp4_6_q1",
      "q": "Without inhibitor, the fitted Vmax was 120 μM/min. Based on Figure 2, what is the KM of LDH for pyruvate?",
      "choices": [
       "0.10 mM",
       "0.20 mM",
       "0.40 mM",
       "1.6 mM"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "M",
      "exp": "**KM is the substrate concentration that gives half of Vmax.** Half of 120 is 60 μM/min, and the no-inhibitor curve passes through 60 μM/min at **0.20 mM** pyruvate.\n**0.10 mM** gives only 40 μM/min.\n**0.40 mM** is where the curve reaches 80 μM/min (two-thirds of Vmax).\n**1.6 mM** is where the rate is close to its maximum, not half of it."
     },
     {
      "id": "p_cpp4_6_q2",
      "q": "Which type of inhibition by oxamate is most consistent with Figure 2?",
      "choices": [
       "Competitive, because the curve rises toward the same plateau",
       "Noncompetitive, because the rate is lower at every [pyruvate]",
       "Uncompetitive, because the inhibitor lowers both KM and Vmax",
       "Irreversible, because some activity is lost at every [pyruvate]"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "At high pyruvate the inhibited rate climbs toward the **same ~120 μM/min plateau** (101 μM/min at 3.2 mM and still rising), while the pyruvate needed for half the maximal rate rises from 0.20 to about **0.60 mM**. **Higher apparent KM with unchanged Vmax = competitive inhibition**, which fits oxamate being a pyruvate look-alike that competes for the active site.\nA lower rate at every concentration is true of all inhibitors; noncompetitive inhibition would also lower the plateau.\nUncompetitive inhibition lowers KM, but here the half-maximal concentration went up.\nAn irreversible inhibitor would lower Vmax no matter how much substrate is added."
     },
     {
      "id": "p_cpp4_6_q3",
      "q": "Why did the researchers measure each rate during only the first 30 s of the reaction?",
      "choices": [
       "So substrate use and product buildup had not yet changed the rate",
       "So the enzyme had enough time to reach its maximum rate",
       "So the NADH absorbance would be as large as possible",
       "So the oxamate had time to bind the enzyme irreversibly"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Michaelis–Menten analysis uses **initial rates**: early on, [pyruvate] and [NADH] are still close to their starting values and almost no lactate or NAD⁺ has formed, so the rate matches the stated substrate concentration.\nAn enzyme doesn't need time to speed up; its rate is highest at the start and falls as substrate is used.\nThe size of the absorbance doesn't depend on measuring early.\nNothing suggests oxamate binds irreversibly, and Figure 2 shows the inhibition is overcome by more substrate."
     },
     {
      "id": "p_cpp4_6_q4",
      "q": "Which structure is oxamate?",
      "choices": [
       "Oxamate (H₂N–CO–COO⁻)",
       "Glycinate (H₂N–CH₂–COO⁻)",
       "3-Aminopyruvate (H₂N–CH₂–CO–COO⁻)",
       "N-Methyloxamate (CH₃NH–CO–COO⁻)"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Start from pyruvate, CH₃–C(=O)–COO⁻, and **replace the methyl group with –NH₂**: the result is H₂N–C(=O)–COO⁻. The nitrogen is now bonded to a carbonyl carbon, so the ketone unit has become an **amide**, while the carboxylate is unchanged.\n\n**Glycinate** has lost the C=O next to the nitrogen: it is an amine, not an amide, and it no longer has pyruvate's carbonyl.\n**3-Aminopyruvate** keeps the CH₃ carbon and adds –NH₂ to it, so a carbon was substituted rather than replaced.\n**N-Methyloxamate** puts the CH₃ on the nitrogen: the methyl was kept and an N–H inserted, rather than the methyl being replaced.",
      "choiceFigs": [
       "cpp4-oxamate",
       "cpp4-glycinate",
       "cpp4-3-aminopyruvate",
       "cpp4-n-methyloxamate"
      ],
      "subj": "organic_chem"
     }
    ],
    "scheme": [
     {
      "after": 1,
      "caption": "Figure 1 Reduction of pyruvate to L-lactate by LDH",
      "parts": [
       "cpp4-pyruvate",
       {
        "arrow": "NADH + H⁺ → NAD⁺ (LDH)"
       },
       "cpp4-l-lactate"
      ]
     }
    ]
   },
   {
    "id": "p_cpp4_4",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "4C",
     "5C",
     "5D"
    ],
    "title": "Iodine Titration of Vitamin C in a Supplement",
    "passage": "Ascorbic acid (vitamin C, Compound 1, molar mass 176 g/mol) is a water-soluble antioxidant and the cofactor for prolyl hydroxylase, the enzyme that hydroxylates proline residues in collagen. Compound 1 acts by donating electrons: its enediol group gives up two electrons and two protons to form dehydroascorbic acid (Compound 2). Because Compound 1 is so easily oxidized, the vitamin C content of supplements falls during storage, and quality-control labs check it by titration with iodine (Reaction 1).\n\nC₆H₈O₆ + I₂ → C₆H₆O₆ + 2 I⁻ + 2 H⁺\nReaction 1\n\nIn one assay, a chewable multivitamin tablet was crushed and stirred in 0.1 M H₂SO₄. The acid slows air oxidation of Compound 1, which is faster at higher pH. The mixture was filtered to remove insoluble binders and diluted to 100.0 mL in a volumetric flask. A 25.0 mL aliquot was mixed with starch indicator and titrated with standardized 0.0250 M I₂ (dissolved as I₃⁻ in KI solution). While Compound 1 remains, each added I₂ is reduced to colorless I⁻. The first excess of I₂ binds to starch and gives a lasting blue-black color. The titration was run in triplicate, and the end-point volumes agreed within 0.05 mL. The tablet label claims 350 mg of vitamin C.\n\nThe tablet also contains iron as ferrous fumarate (Fe²⁺) and vitamin E (α-tocopherol), a fat-soluble phenol that can also reduce I₂. Emulsifiers in the tablet keep some vitamin E dispersed in the aqueous extract. Standard reduction potentials for several half-reactions are listed in Table 1.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Oxidation of ascorbic acid (Compound 1) to dehydroascorbic acid (Compound 2)",
      "parts": [
       "cpp4-ascorbic-acid",
       {
        "arrow": "I₂ (−2 e⁻, −2 H⁺)"
       },
       "cpp4-dehydroascorbic-acid"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Standard reduction potentials at 25°C",
     "columns": [
      "Half-reaction",
      "E° (V)"
     ],
     "rows": [
      [
       "O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O",
       "+1.23"
      ],
      [
       "Fe³⁺ + e⁻ → Fe²⁺",
       "+0.77"
      ],
      [
       "I₂ + 2 e⁻ → 2 I⁻",
       "+0.54"
      ],
      [
       "Compound 2 + 2 H⁺ + 2 e⁻ → Compound 1",
       "+0.39"
      ],
      [
       "Cu²⁺ + e⁻ → Cu⁺",
       "+0.15"
      ]
     ]
    },
    "questions": [
     {
      "q": "The 25.0 mL aliquot required 20.0 mL of the I₂ solution to reach the end point. What mass of Compound 1 was in the tablet?",
      "choices": [
       "88 mg",
       "176 mg",
       "352 mg",
       "704 mg"
      ],
      "ans": 2,
      "skill": "SIRS 2",
      "cat": "4E",
      "diff": "X",
      "exp": "**Moles of I₂:** 0.0200 L × 0.0250 mol/L = 5.00 × 10⁻⁴ mol.\n**Moles of Compound 1 in the aliquot:** Reaction 1 is **1:1**, so 5.00 × 10⁻⁴ mol.\n**Whole tablet:** the aliquot was 25.0 of the 100.0 mL, so multiply by 4: 2.00 × 10⁻³ mol.\n**Mass:** 2.00 × 10⁻³ mol × 176 g/mol = 0.352 g = **352 mg**.\n\n**88 mg** is the amount in the aliquot only (the factor of 4 is missing).\n**176 mg** assumes 2 mol of I₂ per mol of Compound 1, which halves the moles.\n**704 mg** assumes 2 mol of Compound 1 per mol of I₂.",
      "id": "p_cpp4_4_q1"
     },
     {
      "q": "Based on Table 1, does the Fe²⁺ in the tablet interfere with the titration by consuming I₂?",
      "choices": [
       "No; E°cell for oxidation of Fe²⁺ by I₂ is −0.23 V, so the reaction is not spontaneous.",
       "Yes; E°cell for oxidation of Fe²⁺ by I₂ is +0.23 V, so Fe²⁺ also consumes I₂.",
       "Yes; E°cell for oxidation of Fe²⁺ by I₂ is +1.31 V, so Fe²⁺ also consumes I₂.",
       "No; Fe²⁺ cannot be oxidized because iron is already in its highest common oxidation state."
      ],
      "ans": 0,
      "skill": "SIRS 2",
      "cat": "4C",
      "diff": "D",
      "exp": "For I₂ to oxidize Fe²⁺, I₂ must be reduced (cathode) and Fe²⁺ oxidized (anode):\n**E°cell = E°cathode − E°anode** = 0.54 V − 0.77 V = **−0.23 V**. A negative E°cell means ΔG° > 0, so the reaction is not spontaneous, and Fe²⁺ does not use up I₂. By contrast, I₂ oxidizing Compound 1 gives 0.54 − 0.39 = +0.15 V, which is spontaneous.\n\n**+0.23 V** subtracts in the wrong order.\n**+1.31 V** adds the two reduction potentials.\nIron's common higher oxidation state is +3 (Fe³⁺ appears in Table 1), so Fe²⁺ can be oxidized; it just isn't oxidized by I₂.",
      "id": "p_cpp4_4_q2"
     },
     {
      "q": "Which step, added before the titration, would best remove the dispersed vitamin E while keeping Compound 1 for analysis?",
      "choices": [
       "Shaking the aqueous extract with hexane, discarding the hexane layer, and titrating the aqueous layer",
       "Shaking the aqueous extract with hexane, discarding the aqueous layer, and titrating the hexane layer",
       "Boiling the aqueous extract to drive off vitamin E before titrating it",
       "Adding NaOH to the aqueous extract to precipitate vitamin E before titrating it"
      ],
      "ans": 0,
      "skill": "SIRS 3",
      "cat": "5C",
      "diff": "D",
      "subj": "organic_chem",
      "exp": "This is a **liquid–liquid extraction**: like dissolves like. Vitamin E is a large, mostly hydrocarbon (fat-soluble) molecule, so it moves into **hexane**. Compound 1, with several –OH groups, is very polar and stays in the **aqueous layer**, which is the layer you titrate.\n\nTitrating the hexane layer measures the wrong substance; Compound 1 would have been thrown out with the water.\nVitamin E is not volatile, and heating speeds up air oxidation of Compound 1.\nAdding base raises the pH, which the passage says speeds air oxidation of Compound 1, and it would not selectively precipitate the vitamin E.",
      "id": "p_cpp4_4_q3"
     },
     {
      "q": "Compound 2 contains all of the following functional groups EXCEPT:",
      "choices": [
       "a ketone.",
       "an ester.",
       "a primary alcohol.",
       "an alkene (C=C)."
      ],
      "ans": 3,
      "skill": "SIRS 1",
      "cat": "5D",
      "diff": "M",
      "subj": "organic_chem",
      "exp": "In the oxidation (Figure 1), the **enediol** HO–C=C–OH of Compound 1 loses 2 H⁺ and 2 e⁻ and becomes two adjacent C=O groups. So Compound 2 **no longer has a C=C double bond**.\n\nIt does contain **ketones** (the two new ring C=O groups).\nIt still has the **ester**: the five-membered ring is a lactone (a cyclic ester) and is unchanged.\nIt still has the **primary alcohol**: the terminal –CH₂OH of the side chain, along with a secondary –CHOH.",
      "id": "p_cpp4_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp4_5",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "4D"
    ],
    "title": "Radioiodine Uptake Testing of the Thyroid",
    "passage": "The thyroid gland concentrates iodide (I⁻) from the blood using the sodium–iodide symporter and builds it into thyroid hormones. A radioactive isotope of iodine is handled by the gland exactly like stable iodine-127. So the fraction of an oral dose that the gland takes up is a measure of how active it is. An overactive gland, as in Graves disease, takes up more than normal, and an underactive gland takes up less.\n\nTwo iodine isotopes are used. Iodine-123 (half-life 13 h) decays by electron capture: the nucleus absorbs an inner-shell electron, which converts a proton into a neutron. The daughter nucleus then emits a 159 keV gamma ray, which is well suited to gamma cameras. Iodine-131 (half-life 8.0 days) decays by beta-minus emission followed by a 364 keV gamma ray. Its beta particles deposit their energy within a few millimeters of tissue. Large doses of iodine-131 are therefore used to destroy overactive thyroid tissue, while small doses of iodine-123 are preferred for diagnosis.\n\nIn an uptake test, the patient swallows a capsule of Na¹²³I. At set times afterward, a shielded detector held a fixed distance from the neck counts gamma rays from the thyroid. Background counts are subtracted, and the result is compared with the counts from an identical capsule (the standard) counted in a plastic neck model in the same geometry. Normal uptake is about 10–30% at 24 h.\n\nTechnetium-99m (half-life 6.0 h; 140 keV gamma rays) is trapped by the thyroid as pertechnetate (TcO₄⁻) and is sometimes used instead for imaging.",
    "questions": [
     {
      "q": "A vial of Na¹³¹I solution had an activity of 80 mCi when it was delivered to a hospital. What is its activity 24 days later?",
      "choices": [
       "10 mCi",
       "20 mCi",
       "27 mCi",
       "40 mCi"
      ],
      "ans": 0,
      "skill": "SIRS 2",
      "cat": "4E",
      "diff": "E",
      "exp": "The half-life of iodine-131 is 8.0 days, so 24 days is **3 half-lives**. Halve three times: 80 → 40 → 20 → **10 mCi** (a factor of 1/2³ = 1/8).\n\n**20 mCi** stops after two half-lives.\n**40 mCi** is one half-life.\n**27 mCi** divides by 3, treating decay as linear instead of halving.",
      "id": "p_cpp4_5_q1"
     },
     {
      "q": "What is the daughter nucleus produced when iodine-131 (Z = 53) undergoes beta-minus decay?",
      "choices": [
       "Xenon-131 (Z = 54)",
       "Tellurium-131 (Z = 52)",
       "Iodine-130 (Z = 53)",
       "Antimony-127 (Z = 51)"
      ],
      "ans": 0,
      "skill": "SIRS 1",
      "cat": "4E",
      "diff": "M",
      "subj": "gen_chem",
      "exp": "In **beta-minus decay**, a neutron becomes a proton and an electron (plus an antineutrino) is emitted. **Z goes up by 1 and A stays the same**: ¹³¹₅₃I → ¹³¹₅₄Xe + e⁻. Element 54 is xenon.\n\n**Tellurium-131** (Z − 1, same A) is the result of electron capture or positron emission, which is how iodine-123 decays.\n**Iodine-130** would require losing a neutron, which does not change the element.\n**Antimony-127** (A − 4, Z − 2) is the result of alpha decay.",
      "id": "p_cpp4_5_q2"
     },
     {
      "skill": "SIRS 2",
      "cat": "4D",
      "diff": "D",
      "q": "The gamma ray emitted after iodine-123 decays has an energy of 159 keV. Approximately what is its frequency? (h ≈ 4.0 × 10⁻¹⁵ eV·s)",
      "choices": [
       "4.0 × 10¹⁹ Hz",
       "4.0 × 10¹⁶ Hz",
       "6.4 × 10⁻¹⁰ Hz",
       "2.5 × 10⁻²⁰ Hz"
      ],
      "ans": 0,
      "exp": "A photon's energy and frequency are related by **E = hf**, so **f = E/h**. Convert the energy to electron-volts first: 159 keV = 1.59 × 10⁵ eV ≈ 1.6 × 10⁵ eV.\nf = (1.6 × 10⁵ eV) ÷ (4.0 × 10⁻¹⁵ eV·s) = **4.0 × 10¹⁹ Hz**. Gamma rays have the highest frequencies in the electromagnetic spectrum, far above visible light (about 10¹⁴–10¹⁵ Hz).\n\n**4.0 × 10¹⁶ Hz** leaves the energy in keV (159 instead of 159,000 eV), a factor of 1000 too small.\n**6.4 × 10⁻¹⁰ Hz** multiplies E by h instead of dividing (1.6 × 10⁵ × 4.0 × 10⁻¹⁵).\n**2.5 × 10⁻²⁰ Hz** divides h by E, inverting the relation.",
      "subj": "physics",
      "id": "p_cpp4_5_q3"
     },
     {
      "q": "At 26 h after a patient swallowed the Na¹²³I capsule, background-corrected thyroid counts were 5.0% of the counts the standard gave at the time of swallowing. The standard was not recounted. What fraction of the dose did the thyroid take up?",
      "choices": [
       "1.3%",
       "5.0%",
       "10%",
       "20%"
      ],
      "ans": 3,
      "skill": "SIRS 4",
      "cat": "4E",
      "diff": "X",
      "exp": "The thyroid counts were taken 26 h later, while the reference counts were taken at time zero. Both must be compared at the same time, so the decay of iodine-123 must be corrected for. 26 h = **2 half-lives** (t½ = 13 h), so the full dose would now give only (1/2)² = **25%** of its initial counts.\nUptake = 5.0% ÷ 25% = **20%**, which is within the normal 10–30% range.\n\n**5.0%** ignores decay altogether.\n**10%** corrects for only one half-life (5.0 ÷ 0.50).\n**1.3%** multiplies by the decay factor instead of dividing (5.0 × 0.25).",
      "id": "p_cpp4_5_q4"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "Which reagent converts 1-hexanol to hexanal without significant further oxidation to hexanoic acid?",
    "choices": [
     "Pyridinium chlorochromate (PCC) in CH₂Cl₂",
     "KMnO₄ in hot aqueous base",
     "NaBH₄ in methanol",
     "Concentrated H₂SO₄ with heat"
    ],
    "ans": 0,
    "skill": "SIRS 1",
    "cat": "5D",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "**PCC** is a mild, anhydrous oxidant. It oxidizes a primary alcohol only as far as the **aldehyde**. Without water, the aldehyde cannot form the hydrate that strong oxidants convert to a carboxylic acid.\n\n**Hot KMnO₄** is a strong oxidant in water; it takes a primary alcohol all the way to the carboxylic acid.\n**NaBH₄** is a reducing agent; it turns aldehydes into alcohols, the opposite direction.\n**Hot concentrated H₂SO₄** dehydrates alcohols to alkenes or ethers; nothing is oxidized.",
    "id": "cp_half_4_sa1"
   },
   {
    "q": "In a strand of DNA, each phosphodiester linkage in the backbone joins:",
    "choices": [
     "the 3′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group.",
     "the 2′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group.",
     "the 1′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group.",
     "the base of one nucleotide to the deoxyribose of the next, through a phosphate group."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "A phosphodiester is one phosphate esterified to **two** sugar hydroxyl groups: the **3′-OH** of one nucleotide and the **5′-OH** of the next. DNA polymerase adds each new nucleotide to the free 3′-OH, so strands grow 5′ → 3′ and have a 5′-phosphate end and a 3′-OH end.\n\nDeoxyribose has **no 2′-OH** (that is what \"deoxy\" means), so no 2′ linkage is possible in DNA.\nThe **1′ carbon** holds the base through an N-glycosidic bond, not a phosphate.\nThe **bases** are not part of the backbone; they hang off C1′ and pair with the bases of the other strand.",
    "id": "cp_half_4_sa2"
   },
   {
    "q": "A protein has a lysine residue on its surface. Replacing that lysine with glutamate changes the protein's net charge at pH 7.4 by:",
    "choices": [
     "−2",
     "−1",
     "0",
     "+1"
    ],
    "ans": 0,
    "skill": "SIRS 1",
    "cat": "5D",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "At pH 7.4, a lysine side chain (pKa ≈ 10.5) is protonated, –NH₃⁺, and carries a charge of **+1**. A glutamate side chain (pKa ≈ 4.1) is deprotonated, –COO⁻, and carries a charge of **−1**. The backbone charge is the same for both. Swapping +1 for −1 changes the net charge by −1 − (+1) = **−2**.\n\n**−1** counts only the loss of the positive charge or only the gain of the negative one.\n**0** assumes both side chains are neutral at pH 7.4.\n**+1** gets the direction of the change backward.",
    "id": "cp_half_4_sa3"
   },
   {
    "q": "Use the following thermochemical equations to find ΔH° for the formation of carbon monoxide, C(s) + ½O₂(g) → CO(g).\nC(s) + O₂(g) → CO₂(g)   ΔH° = −394 kJ\n2CO(g) + O₂(g) → 2CO₂(g)   ΔH° = −566 kJ",
    "choices": [
     "+172 kJ",
     "−960 kJ",
     "−111 kJ",
     "−677 kJ"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "exp": "Use **Hess's law**: arrange the given equations so they add up to the target, and treat their ΔH values the same way.\nKeep the first equation: C + O₂ → CO₂, ΔH° = −394 kJ.\nCO must be a product, so **reverse** the second (change the sign) and **halve** it (halve ΔH): CO₂ → CO + ½O₂, ΔH° = +566 ÷ 2 = **+283 kJ**.\nAdd: CO₂ cancels, and O₂ − ½O₂ leaves ½O₂ on the left, giving C + ½O₂ → CO.\nΔH° = −394 + 283 = **−111 kJ**.\n\n**−677 kJ** halves the second equation but forgets to change its sign when reversing it (−394 − 283).\n**+172 kJ** reverses the second equation but forgets to halve it (−394 + 566).\n**−960 kJ** simply adds the two equations as written (−394 − 566).",
    "id": "cp_half_4_sa4"
   },
   {
    "q": "Adding a catalyst to a reaction mixture at equilibrium has which effect?",
    "choices": [
     "It lowers Ea for the forward and reverse reactions equally and leaves K unchanged.",
     "It lowers Ea for the forward reaction only and increases K.",
     "It makes ΔG° more negative and shifts the equilibrium toward products.",
     "It raises the energy of the products and decreases K."
    ],
    "ans": 0,
    "skill": "SIRS 1",
    "cat": "5E",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "A catalyst provides a **lower-energy transition state**. Both directions pass through the same transition state, so **forward and reverse Ea drop by the same amount** and both rates rise by the same factor. The energies of reactants and products don't change, so **ΔG° and K stay the same**; equilibrium is simply reached faster.\n\nLowering only the forward barrier would let a catalyst change K, which is impossible.\nΔG° depends only on the reactants and products, not on the path between them.\nA catalyst does not change the energies of the products.",
    "id": "cp_half_4_sa5"
   },
   {
    "q": "An intracellular phosphate buffer contains HPO₄²⁻ and H₂PO₄⁻ in a 4 : 1 ratio. If the apparent pKa of H₂PO₄⁻ under these conditions is 6.8, what is the pH? (log 4 = 0.60)",
    "choices": [
     "6.2",
     "6.8",
     "7.4",
     "10.8"
    ],
    "ans": 2,
    "skill": "SIRS 2",
    "cat": "5A",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "Use the **Henderson–Hasselbalch equation**, with the base form on top:\npH = pKa + log([HPO₄²⁻]/[H₂PO₄⁻]) = 6.8 + log 4 = 6.8 + 0.60 = **7.4**.\nThis makes sense: more base than acid puts the pH above the pKa.\n\n**6.2** inverts the ratio (log ¼ = −0.60).\n**6.8** ignores the ratio, which would be correct only at 1 : 1.\n**10.8** adds 4 instead of log 4.",
    "id": "cp_half_4_sa6"
   },
   {
    "q": "Which 0.10 M aqueous solution is basic?",
    "choices": [
     "Sodium acetate",
     "Ammonium chloride",
     "Sodium chloride",
     "Potassium nitrate"
    ],
    "ans": 0,
    "skill": "SIRS 1",
    "cat": "5A",
    "diff": "E",
    "subj": "gen_chem",
    "exp": "**Acetate** is the conjugate base of a weak acid (acetic acid, pKa 4.76). It accepts a proton from water, CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, so the solution is **basic**. Na⁺ is a spectator.\n\n**NH₄⁺** is the conjugate acid of a weak base, so ammonium chloride is acidic.\n**NaCl** and **KNO₃** contain only ions of strong acids and strong bases (Cl⁻, NO₃⁻, Na⁺, K⁺), which don't react with water, so these solutions are neutral.",
    "id": "cp_half_4_sa7"
   },
   {
    "q": "The optical fibers in a flexible endoscope have a glass core (n = 1.50) surrounded by a cladding (n = 1.20). Light traveling along the core strikes the core–cladding boundary. What is the smallest angle of incidence, measured from the normal, at which the light is totally internally reflected? (sin 12° ≈ 0.21, sin 37° ≈ 0.60, sin 42° ≈ 0.67, sin 53° ≈ 0.80)",
    "choices": [
     "12°",
     "37°",
     "42°",
     "53°"
    ],
    "ans": 3,
    "skill": "SIRS 2",
    "cat": "4D",
    "diff": "M",
    "subj": "physics",
    "exp": "Total internal reflection can happen only when light goes from a **higher** to a **lower** index of refraction, as here (core 1.50 → cladding 1.20). At the **critical angle** the refracted ray would just skim along the boundary (90°), so by Snell's law n₁ sin θc = n₂ sin 90°:\nsin θc = n₂/n₁ = 1.20 ÷ 1.50 = **0.80**, so **θc ≈ 53°**.\nAny ray that hits the boundary at more than 53° from the normal is reflected back into the core, which is how the fiber carries light around bends.\n\n**37°** is the complement of 53°: it measures the angle from the boundary surface instead of from the normal (cos 37° ≈ 0.80).\n**42°** ignores the cladding and uses a core–air boundary: sin θ = 1.00 ÷ 1.50 ≈ 0.67.\n**12°** uses the difference of the indices: (1.50 − 1.20) ÷ 1.50 = 0.20, about sin 12°.",
    "id": "cp_half_4_sa8"
   },
   {
    "q": "A 12 V battery is connected to a 3.0 Ω resistor in series with two 6.0 Ω resistors that are wired in parallel with each other. How much power is dissipated in the 3.0 Ω resistor?",
    "choices": [
     "1.9 W",
     "12 W",
     "24 W",
     "48 W"
    ],
    "ans": 1,
    "skill": "SIRS 2",
    "cat": "4C",
    "diff": "X",
    "subj": "physics",
    "exp": "**Parallel pair:** 1/R = 1/6.0 + 1/6.0, so R = 3.0 Ω.\n**Total resistance:** 3.0 Ω + 3.0 Ω = 6.0 Ω.\n**Current** (the same through the series resistor): I = V/R = 12 V ÷ 6.0 Ω = 2.0 A.\n**Power in the 3.0 Ω resistor:** P = I²R = (2.0 A)²(3.0 Ω) = **12 W**.\n\n**1.9 W** adds all three resistors in series (15 Ω, I = 0.80 A).\n**24 W** is the total power of the circuit (IV = 2.0 A × 12 V).\n**48 W** puts the full 12 V across the 3.0 Ω resistor (V²/R).",
    "id": "cp_half_4_sa9"
   },
   {
    "q": "At room temperature, iodine (I₂) is a solid, whereas chlorine (Cl₂) is a gas. Which statement best explains this difference?",
    "choices": [
     "I₂ has a larger, more polarizable electron cloud, so its London dispersion forces are stronger.",
     "I₂ molecules have a permanent dipole, so they attract one another by dipole–dipole forces.",
     "I₂ forms hydrogen bonds between molecules, whereas Cl₂ does not.",
     "The I–I covalent bond is stronger than the Cl–Cl bond, so I₂ is harder to separate."
    ],
    "ans": 0,
    "skill": "SIRS 1",
    "cat": "5B",
    "diff": "E",
    "subj": "gen_chem",
    "exp": "Both are **nonpolar** diatomic molecules, so the only attractions between molecules are **London dispersion forces**. These grow with the number of electrons and the size of the electron cloud (**polarizability**). Iodine has far more electrons than chlorine, so its dispersion forces are strong enough to hold the molecules in a solid at room temperature.\n\nA homonuclear molecule like I₂ has **no permanent dipole**.\nHydrogen bonding requires H bonded to N, O or F, and I₂ has no hydrogen.\nMelting and boiling separate molecules from each other; they don't break the covalent bond. The I–I bond is actually weaker than the Cl–Cl bond.",
    "id": "cp_half_4_sa10"
   }
  ]
 },
 {
  "id": "cp_half_5",
  "title": "Chem/Phys Quiz 5",
  "order": [
   "p_cpp5_1",
   "p_cpp5_6",
   4,
   "p_cpp5_3",
   "p_cpp5_4",
   3,
   "p_cpp5_5",
   3
  ],
  "passages": [
   {
    "id": "p_cpp5_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5E",
     "5A"
    ],
    "title": "Melting of DNA Hairpin Probes",
    "passage": "Short DNA hairpins are used as probes in clinical diagnostic assays. A hairpin is a single strand whose two ends are complementary, so the strand folds back on itself to form a double-helical stem capped by a loop of unpaired bases. Across the stem, bases pair by hydrogen bonding (guanine with cytosine and adenine with thymine), and neighboring base pairs stack on one another. Guanine and cytosine are shown in Figure 1.\n\nWhen a hairpin is heated, the stem unfolds to a random coil, as shown in Reaction 1. Stacked bases absorb less ultraviolet light than unstacked bases, so the absorbance at 260 nm (A260) rises by about 30% as the stem melts. The temperature at which half of the molecules are unfolded is the melting temperature, Tm. Because each hairpin is a single molecule, Tm does not depend on the strand concentration.\n\nFolded hairpin ⇌ Unfolded strand\nReaction 1\n\nResearchers prepared three hairpins, H1, H2 and H3, each with an 8-base-pair stem and the same loop of four thymines. The stems differed only in the number of G–C pairs: H1 had 2, H2 had 4 and H3 had 6, and A–T pairs made up the rest. Each hairpin (2 μM) was heated from 40°C to 100°C at 1°C/min in pH 7.0 phosphate buffer containing 0.10 M NaCl, and the fraction unfolded was calculated from A260. H2 was also tested in the same buffer with 0.010 M NaCl. A van 't Hoff analysis of the H2 curve in 0.10 M NaCl gave ΔH° = +272 kJ/mol for unfolding. The melting curves are shown in Figure 2.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 Guanine and cytosine",
      "parts": [
       "guanine",
       "cytosine"
      ]
     }
    ],
    "figure": {
     "type": "line",
     "caption": "Figure 2 Melting curves of hairpins H1–H3 (fraction unfolded vs temperature)",
     "x": {
      "label": "Temperature (°C)",
      "min": 40,
      "max": 100,
      "step": 10
     },
     "y": {
      "label": "Fraction unfolded",
      "min": 0,
      "max": 1,
      "step": 0.2
     },
     "series": [
      {
       "name": "H1, 0.10 M NaCl",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         40,
         0.01
        ],
        [
         43,
         0.024
        ],
        [
         46,
         0.054
        ],
        [
         49,
         0.119
        ],
        [
         52,
         0.242
        ],
        [
         55,
         0.429
        ],
        [
         58,
         0.639
        ],
        [
         61,
         0.807
        ],
        [
         64,
         0.908
        ],
        [
         67,
         0.959
        ],
        [
         70,
         0.982
        ],
        [
         73,
         0.992
        ],
        [
         76,
         0.997
        ],
        [
         79,
         0.999
        ],
        [
         82,
         0.999
        ],
        [
         85,
         1.0
        ],
        [
         88,
         1.0
        ],
        [
         91,
         1.0
        ],
        [
         94,
         1.0
        ],
        [
         97,
         1.0
        ],
        [
         100,
         1.0
        ]
       ]
      },
      {
       "name": "H2, 0.10 M NaCl",
       "marker": "square",
       "line": "smooth",
       "points": [
        [
         40,
         0.0
        ],
        [
         43,
         0.001
        ],
        [
         46,
         0.002
        ],
        [
         49,
         0.006
        ],
        [
         52,
         0.014
        ],
        [
         55,
         0.031
        ],
        [
         58,
         0.071
        ],
        [
         61,
         0.153
        ],
        [
         64,
         0.298
        ],
        [
         67,
         0.5
        ],
        [
         70,
         0.702
        ],
        [
         73,
         0.847
        ],
        [
         76,
         0.929
        ],
        [
         79,
         0.969
        ],
        [
         82,
         0.986
        ],
        [
         85,
         0.994
        ],
        [
         88,
         0.998
        ],
        [
         91,
         0.999
        ],
        [
         94,
         1.0
        ],
        [
         97,
         1.0
        ],
        [
         100,
         1.0
        ]
       ]
      },
      {
       "name": "H3, 0.10 M NaCl",
       "marker": "triangle",
       "line": "smooth",
       "points": [
        [
         40,
         0.0
        ],
        [
         43,
         0.0
        ],
        [
         46,
         0.0
        ],
        [
         49,
         0.0
        ],
        [
         52,
         0.001
        ],
        [
         55,
         0.001
        ],
        [
         58,
         0.003
        ],
        [
         61,
         0.008
        ],
        [
         64,
         0.018
        ],
        [
         67,
         0.041
        ],
        [
         70,
         0.092
        ],
        [
         73,
         0.193
        ],
        [
         76,
         0.361
        ],
        [
         79,
         0.571
        ],
        [
         82,
         0.758
        ],
        [
         85,
         0.881
        ],
        [
         88,
         0.946
        ],
        [
         91,
         0.976
        ],
        [
         94,
         0.99
        ],
        [
         97,
         0.996
        ],
        [
         100,
         0.998
        ]
       ]
      },
      {
       "name": "H2, 0.010 M NaCl",
       "marker": "square-open",
       "line": "smooth",
       "points": [
        [
         40,
         0.006
        ],
        [
         43,
         0.014
        ],
        [
         46,
         0.031
        ],
        [
         49,
         0.071
        ],
        [
         52,
         0.153
        ],
        [
         55,
         0.298
        ],
        [
         58,
         0.5
        ],
        [
         61,
         0.702
        ],
        [
         64,
         0.847
        ],
        [
         67,
         0.929
        ],
        [
         70,
         0.969
        ],
        [
         73,
         0.986
        ],
        [
         76,
         0.994
        ],
        [
         79,
         0.998
        ],
        [
         82,
         0.999
        ],
        [
         85,
         1.0
        ],
        [
         88,
         1.0
        ],
        [
         91,
         1.0
        ],
        [
         94,
         1.0
        ],
        [
         97,
         1.0
        ],
        [
         100,
         1.0
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Compared with an A–T base pair in the stem of H1, a G–C base pair in the stem of H3 is held together by:",
      "choices": [
       "three hydrogen bonds, and it pairs a purine with a pyrimidine.",
       "three hydrogen bonds, and it pairs two purines.",
       "two hydrogen bonds, and it pairs a purine with a pyrimidine.",
       "two hydrogen bonds, and it pairs two pyrimidines."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "A **G–C pair forms three hydrogen bonds** (A–T forms two). Figure 1 shows why: guanine is a **purine** (two fused rings) and cytosine is a **pyrimidine** (one ring). Every Watson–Crick pair joins one of each, which keeps the width of the helix constant.\n\nTwo purines would be too wide for the helix, and two pyrimidines too narrow.\nTwo hydrogen bonds describes an A–T pair, not a G–C pair.",
      "id": "p_cpp5_1_q1"
     },
     {
      "q": "Based on Figure 2, replacing one A–T pair in the stem with a G–C pair raises Tm by approximately:",
      "choices": [
       "2.8°C",
       "5.5°C",
       "11°C",
       "22°C"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Read Tm where each 0.10 M NaCl curve crosses a fraction unfolded of 0.5: **H1 ≈ 56°C, H2 ≈ 67°C, H3 ≈ 78°C**. Going from H1 to H3 adds 6 − 2 = 4 G–C pairs and raises Tm by 78 − 56 = 22°C, so each G–C pair adds 22 ÷ 4 = **5.5°C** (H1 → H2 gives the same: 11°C ÷ 2 pairs).\n\n**11°C** is the change between neighboring hairpins, which differ by two G–C pairs, not one.\n**22°C** is the whole H1 → H3 difference.\n**2.8°C** divides the 11°C step by 4 instead of by 2.\nThe 0.010 M NaCl curve has a different salt concentration, so it must not be used here.",
      "id": "p_cpp5_1_q2"
     },
     {
      "q": "At Tm, the folded and unfolded forms of a hairpin are present at equal concentrations. Based on the passage, what is ΔS° for the unfolding of H2 in 0.10 M NaCl?",
      "choices": [
       "+0.80 J/(mol·K)",
       "+800 J/(mol·K)",
       "−800 J/(mol·K)",
       "+4.1 × 10³ J/(mol·K)"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "exp": "At Tm, [unfolded] = [folded], so **K = 1 and ΔG° = −RT ln K = 0**. Then ΔG° = ΔH° − TΔS° = 0 gives **ΔS° = ΔH° ÷ Tm**.\nTm of H2 (Figure 2) = 67°C = 67 + 273 = 340 K.\nΔS° = (+272 kJ/mol) ÷ 340 K = +0.800 kJ/(mol·K) = **+800 J/(mol·K)**.\n\nThe sign is positive: unfolding turns an ordered stem into a flexible coil, and ΔH° and ΔS° must have the same sign for ΔG° to be zero.\n**+0.80 J/(mol·K)** forgets that ΔH° is in kJ, not J.\n**−800 J/(mol·K)** has the wrong sign.\n**+4.1 × 10³ J/(mol·K)** divides by 67 (°C) instead of 340 K.",
      "id": "p_cpp5_1_q3"
     },
     {
      "q": "H2 melted at a lower temperature in 0.010 M NaCl than in 0.10 M NaCl. Which explanation best accounts for this result?",
      "choices": [
       "Fewer Na⁺ ions are present to shield the negatively charged phosphate groups, so repulsion across the stem is greater.",
       "Fewer Na⁺ ions are present to hydrogen bond to the bases, so the base pairs are weaker.",
       "More water molecules are free to hydrate the bases, so base stacking becomes stronger.",
       "The solution has a lower boiling point, so the stem reaches its melting point sooner."
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "Each nucleotide carries a **negatively charged phosphate**. In the folded stem the two sides of the backbone are close together, so their charges repel. Cations such as Na⁺ cluster around the backbone and **screen** this repulsion. With ten times less NaCl, the screening is weaker, the folded form is less stable, and Tm drops (from about 67°C to about 58°C in Figure 2).\n\nNa⁺ has no hydrogen to donate, so it does not hydrogen bond to the bases.\nStronger base stacking would stabilize the stem and raise Tm, the opposite of what was seen.\nBoiling point has nothing to do with Tm: the solution is nowhere near boiling at 58°C, and the salt changes the boiling point by only a tiny fraction of a degree.",
      "id": "p_cpp5_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp5_6",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4D",
     "4A",
     "4C"
    ],
    "title": "How a Pulse Oximeter Measures Oxygen Saturation",
    "passage": "A pulse oximeter clipped to a fingertip estimates the fraction of hemoglobin that is carrying oxygen. Two light-emitting diodes (LEDs), one red (660 nm) and one infrared (940 nm), shine through the finger in turn, and a photodiode on the other side measures how much light gets through. Oxyhemoglobin (HbO₂) and deoxyhemoglobin (Hb) absorb the two wavelengths differently, as shown in Table 1, so the ratio of the absorbances at 660 nm and 940 nm reveals the proportion of HbO₂.\n\nOnly the part of the absorbance that rises and falls with each heartbeat is used, because it comes from arterial blood. Skin, bone and venous blood also absorb light, but their absorbance stays nearly constant from beat to beat. The pressure pulse travels along the arteries much faster than the blood itself flows. In one adult, the pulse reached the fingertip 0.15 s after the heartbeat, along an arterial path about 0.75 m long.\n\nHealthy adults at rest usually read 95–100%. A portable unit is powered by a 3.0 V lithium coin cell rated at 220 mAh. While measuring, the LEDs and electronics together draw an average current of 30 mA.",
    "figure": {
     "caption": "Table 1 Molar absorptivity of hemoglobin (cm⁻¹·M⁻¹)",
     "columns": [
      "Wavelength",
      "HbO₂",
      "Hb"
     ],
     "rows": [
      [
       "660 nm",
       "320",
       "3230"
      ],
      [
       "940 nm",
       "1210",
       "690"
      ]
     ]
    },
    "questions": [
     {
      "id": "p_cpp5_6_q1",
      "q": "Based on Table 1, which statement correctly compares the two forms of hemoglobin?",
      "choices": [
       "At 660 nm, Hb absorbs about 10 times more strongly than HbO₂.",
       "At 660 nm, HbO₂ absorbs about 10 times more strongly than Hb.",
       "At 940 nm, Hb absorbs about 2 times more strongly than HbO₂.",
       "At both wavelengths, the two forms absorb about equally."
      ],
      "ans": 0,
      "cat": "4D",
      "skill": "SIRS 4",
      "diff": "X",
      "exp": "At 660 nm: Hb 3230 vs HbO₂ 320, so Hb absorbs about **10 times** more strongly. That is why deoxygenated blood looks darker in red light.\nThe second choice reverses the 660 nm row.\nAt 940 nm the order flips: HbO₂ (1210) absorbs about 2 times more than Hb (690), so the third choice reverses that row.\nThe two forms clearly differ at both wavelengths, which is why two wavelengths are used."
     },
     {
      "id": "p_cpp5_6_q2",
      "q": "What is the energy of one photon emitted by the red LED? (hc = 1240 eV·nm)",
      "choices": [
       "0.53 eV",
       "1.3 eV",
       "1.9 eV",
       "3.8 eV"
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "**E = hc/λ** = 1240 eV·nm ÷ 660 nm ≈ **1.9 eV**.\n**1.3 eV** is the infrared (940 nm) photon.\n**0.53 eV** divides λ by hc (upside down).\n**3.8 eV** doubles the correct value."
     },
     {
      "id": "p_cpp5_6_q3",
      "q": "What was the average speed of the pressure pulse along the arterial path described in the passage?",
      "choices": [
       "0.11 m/s",
       "0.20 m/s",
       "5.0 m/s",
       "50 m/s"
      ],
      "ans": 2,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "**Average speed = distance ÷ time** = 0.75 m ÷ 0.15 s = **5.0 m/s**.\n**0.20 m/s** divides the time by the distance.\n**0.11 m/s** multiplies distance by time.\n**50 m/s** is a factor-of-10 slip in the division."
     },
     {
      "id": "p_cpp5_6_q4",
      "q": "If the unit measures continuously, about how long will a fully charged coin cell last?",
      "choices": [
       "0.14 h",
       "7.3 h",
       "22 h",
       "6600 h"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "A **mAh rating is a charge**: time = charge ÷ current = 220 mAh ÷ 30 mA = **7.3 h**.\n**0.14 h** divides the current by the capacity.\n**22 h** multiplies 7.3 h by the 3.0 V voltage, which doesn't belong in a charge-and-current calculation.\n**6600 h** multiplies the capacity by the current."
     }
    ]
   },
   {
    "id": "p_cpp5_3",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5E",
     "5D",
     "4B"
    ],
    "title": "Bomb Calorimetry of Foods",
    "passage": "Food labels list energy in Calories (1 Cal = 1 kcal = 4.184 kJ). These values trace back to measurements made by burning food. In a bomb calorimeter, a dried, weighed sample is placed in a sealed steel vessel (the bomb) with an internal volume of 0.41 L, which is filled with pure O₂ to 30 atm at 27°C. The bomb sits in an insulated bucket of water. A current through a fuse wire ignites the sample, which burns completely, and the temperature rise of the water is recorded. Because the volume is fixed, the heat measured is −ΔU of combustion, which for foods differs from ΔH by less than 1%. The combustion of sucrose is shown in Reaction 1.\n\nC₁₂H₂₂O₁₁(s) + 12 O₂(g) → 12 CO₂(g) + 11 H₂O(l)\nReaction 1\n\nA nutrition laboratory first burned 1.00 g of benzoic acid (C₆H₅COOH), a standard that releases 26.4 kJ/g. The lab then burned samples of several foods under the same conditions. The results are listed in Table 1.\n\nThe energy a person actually obtains from food is less than the bomb value. Nutrients are not absorbed completely, and the nitrogen of proteins leaves the body as urea, which can still be burned. Labels therefore use average values (Atwater factors) of 9 Cal/g for fat and 4 Cal/g for carbohydrate and protein. For egg white, which is nearly pure protein, the bomb value is about 40% higher than the energy the body can obtain from it. All samples were dried before burning, because water in a sample does not burn but does absorb heat.",
    "figure": {
     "caption": "Table 1 Bomb calorimeter results",
     "columns": [
      "Sample",
      "Main nutrient",
      "Mass burned (g)",
      "ΔT of water (°C)"
     ],
     "rows": [
      [
       "Benzoic acid",
       "standard",
       "1.00",
       "2.64"
      ],
      [
       "Olive oil",
       "fat",
       "0.500",
       "1.97"
      ],
      [
       "Sucrose",
       "carbohydrate",
       "1.00",
       "1.65"
      ],
      [
       "Egg white powder",
       "protein",
       "1.00",
       "2.36"
      ],
      [
       "Peanut butter",
       "mixed",
       "1.00",
       "2.50"
      ]
     ]
    },
    "questions": [
     {
      "q": "Based on Table 1, what is the energy content of peanut butter in Calories per gram?",
      "choices": [
       "0.60 Cal/g",
       "6.0 Cal/g",
       "25 Cal/g",
       "105 Cal/g"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "Step 1, calibrate with benzoic acid: the calorimeter's heat capacity is C = 26.4 kJ ÷ 2.64°C = **10.0 kJ/°C**.\nStep 2, peanut butter: q = CΔT = 10.0 kJ/°C × 2.50°C = **25.0 kJ** from 1.00 g.\nStep 3, convert: 25.0 kJ ÷ 4.184 kJ/Cal ≈ **6.0 Cal/g**.\n\n**25 Cal/g** skips the kJ → Cal conversion.\n**105 Cal/g** multiplies by 4.184 instead of dividing.\n**0.60 Cal/g** is a factor-of-10 slip in the heat capacity.",
      "id": "p_cpp5_3_q1"
     },
     {
      "q": "Which property of fats best explains why olive oil released more energy per gram than sucrose?",
      "choices": [
       "Their carbon atoms are more reduced, with more C–H bonds and fewer C–O bonds.",
       "Their carbon atoms are more oxidized, with more C–O bonds and fewer C–H bonds.",
       "Their ester bonds store energy that is released when the bonds are broken.",
       "Their molecules form more hydrogen bonds, which release energy as they break."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "biochemistry",
      "exp": "Olive oil gave 10.0 kJ/°C × 1.97°C ÷ 0.500 g ≈ 39 kJ/g, more than twice sucrose's 16.5 kJ/g. Fatty-acid chains are long runs of CH₂ groups, so their carbons are **highly reduced** (average oxidation state near −2). Sucrose already has an O on nearly every carbon (average oxidation state 0), so it is partly oxidized before it burns. The more reduced a carbon, the more energy is released when it is oxidized to CO₂.\n\nMore oxidized carbons would release less energy, not more.\n**Breaking bonds always costs energy**; energy is released when the stronger C=O and O–H bonds of the products form.\nFats form fewer hydrogen bonds than sugars, and breaking them would absorb energy anyway.",
      "id": "p_cpp5_3_q2"
     },
     {
      "q": "What was the main purpose of burning benzoic acid before the food samples?",
      "choices": [
       "To find how much heat the calorimeter absorbs per degree of temperature rise",
       "To provide a negative control that releases no heat when ignited",
       "To show that the samples burn completely at 30 atm of O₂",
       "To correct the food values for the energy lost in urea"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Benzoic acid is a **calibration standard**: its heat of combustion (26.4 kJ/g) is known, so dividing that heat by the measured ΔT gives the **heat capacity of the whole calorimeter** (bomb + water + bucket), 10.0 kJ/°C. Every food value is then q = CΔT.\n\nA negative control would release no heat; benzoic acid releases a known, large amount.\nOne standard burning completely says nothing about whether each food does.\nUrea matters for the body's energy yield, not for the bomb measurement; the passage handles it with the Atwater factors.",
      "id": "p_cpp5_3_q3"
     },
     {
      "q": "Approximately how many moles of O₂ are present in the bomb after it is filled?",
      "choices": [
       "0.050 mol",
       "0.50 mol",
       "5.5 mol",
       "500 mol"
      ],
      "ans": 1,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "physics",
      "exp": "Use the **ideal gas law, n = PV/RT**, with temperature in kelvins: T = 27 + 273 = 300 K.\nn = (30 atm × 0.41 L) ÷ (0.0821 L·atm/(mol·K) × 300 K) = 12.3 ÷ 24.6 ≈ **0.50 mol**.\n\n**5.5 mol** uses 27 (°C) instead of 300 K.\n**500 mol** puts the volume in mL (410) instead of L.\n**0.050 mol** is a factor-of-10 slip.",
      "id": "p_cpp5_3_q4"
     }
    ]
   },
   {
    "id": "p_cpp5_4",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5B",
     "5C"
    ],
    "title": "A Proline-Catalyzed Aldol Reaction as an Aldolase Model",
    "passage": "In gluconeogenesis, the enzyme aldolase joins dihydroxyacetone phosphate and glyceraldehyde 3-phosphate in an aldol addition, forming a new carbon–carbon bond; in glycolysis it catalyzes the reverse cleavage. Class I aldolases, found in animals, use an active-site amine that condenses with the ketone group of dihydroxyacetone phosphate to form an iminium ion. Loss of a proton gives a nucleophilic enamine, which adds to the aldehyde carbon of the other substrate.\n\nThe amino acid L-proline (Compound 4) mimics this mechanism. Its secondary amine forms an enamine with a ketone, and its carboxylic acid group hydrogen bonds to the incoming aldehyde, directing it to one face of the enamine. Researchers studied the reaction of acetone with 4-nitrobenzaldehyde (Compound 1), which gives the β-hydroxy ketone Compound 2 (Figure 1). The carbon that bears the new OH group in Compound 2 is a new stereocenter, so the product can form as either enantiomer. When heated with acid, Compound 2 loses water to give Compound 3.\n\nEach reaction used 0.50 mmol of Compound 1 in 4.0 mL of 4:1 DMSO/acetone with 20 mol% catalyst at 25°C. Progress was followed by thin-layer chromatography (TLC) on silica gel with 1:1 hexanes/ethyl acetate. The Rf values were 0.62 for Compound 1, 0.24 for Compound 2 and 0.55 for Compound 3. Without a catalyst almost no product formed, and pyrrolidine, which has the amine of proline but no carboxylic acid, gave a racemic product. Products were isolated as pale yellow solids after washing with water, and the enantiomeric excess (ee) of Compound 2 was measured by chiral HPLC. The results are given in Table 1.",
    "scheme": [
     {
      "after": 1,
      "caption": "Figure 1 Aldol reaction of Compound 1 with acetone to give Compound 2",
      "parts": [
       "cpp5-4-nitrobenzaldehyde",
       "+",
       "acetone",
       {
        "arrow": "Compound 4 (20 mol%), DMSO, 25°C"
       },
       "cpp5-aldol-r"
      ]
     },
     {
      "after": 1,
      "caption": "Compound 4 (L-proline)",
      "parts": [
       "cpp5-l-proline"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Aldol reaction of Compound 1 with acetone",
     "columns": [
      "Entry",
      "Catalyst",
      "Solvent",
      "Time (h)",
      "Yield of 2 (%)",
      "ee of 2 (%)",
      "Major enantiomer"
     ],
     "rows": [
      [
       "1",
       "L-proline",
       "DMSO",
       "4",
       "70",
       "80",
       "R"
      ],
      [
       "2",
       "D-proline",
       "DMSO",
       "4",
       "69",
       "80",
       "S"
      ],
      [
       "3",
       "none",
       "DMSO",
       "24",
       "<2",
       "—",
       "—"
      ],
      [
       "4",
       "pyrrolidine",
       "DMSO",
       "4",
       "55",
       "0",
       "—"
      ],
      [
       "5",
       "L-proline",
       "water",
       "24",
       "12",
       "10",
       "R"
      ]
     ]
    },
    "questions": [
     {
      "q": "In a class I aldolase, which amino acid side chain plays the role of the secondary amine of Compound 4?",
      "choices": [
       "Lysine, whose amino group condenses with the ketone to form an imine",
       "Serine, whose hydroxyl group adds to the ketone to form a hemiketal",
       "Aspartate, whose carboxylate group condenses with the ketone to form an ester",
       "Cysteine, whose thiol group adds to the ketone to form a thioester"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "biochemistry",
      "exp": "The passage says the enzyme uses an **active-site amine** that condenses with the ketone to form an iminium ion. The only common amino acid with a free amine on its side chain is **lysine** (its ε-NH₂). Amine + ketone → imine (a **Schiff base**) + water; protonated, this is the iminium ion, which tautomerizes to the enamine.\n\nSerine has an OH, not an amine; alcohol + ketone gives a hemiketal, not an enamine.\nA carboxylate does not form an ester with a ketone.\nA thiol + ketone gives a hemithioacetal; a thioester requires an acyl group.",
      "id": "p_cpp5_4_q1"
     },
     {
      "q": "In Entry 1, what percentage of the isolated Compound 2 was the (S) enantiomer?",
      "choices": [
       "0%",
       "10%",
       "20%",
       "80%"
      ],
      "ans": 1,
      "cat": "5B",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "**ee = %major − %minor**, and the two percentages add to 100. So %R − %S = 80 and %R + %S = 100. Adding the equations: 2(%R) = 180, %R = 90, so **%S = 10%**.\n\n**20%** assumes ee is the percentage of the major enantiomer (80% R, 20% S); that mixture would have an ee of only 60%.\n**0%** would mean an ee of 100%, but Table 1 shows 80%.\n**80%** reads the ee as the S content; Entry 1 gave mostly R (Entry 2, with D-proline, gave mostly S).",
      "id": "p_cpp5_4_q2"
     },
     {
      "q": "Which structure is most likely the major form of Compound 3?",
      "choices": [
       "(E)-4-(4-nitrophenyl)but-3-en-2-one",
       "(Z)-4-(4-nitrophenyl)but-3-en-2-one",
       "1-(4-nitrophenyl)butane-1,3-dione",
       "4-(4-nitrophenyl)butan-2-one"
      ],
      "choiceFigs": [
       "cpp5-enone-e",
       "cpp5-enone-z",
       "cpp5-diketone",
       "cpp5-sat-ketone"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Compound 2 loses **H₂O**: the OH from the β carbon and an H from the α carbon between the two functional groups. The new C=C is **conjugated** with both the C=O and the benzene ring, which makes this dehydration easy (an aldol condensation). Because the reaction is reversible under acid and heat, the more stable **(E) alkene** dominates: the aryl group and the acetyl group are on opposite sides, avoiding steric clash.\n\nThe (Z) isomer has the same formula but is less stable.\nThe 1,3-diketone would require **oxidation** of the alcohol (loss of 2 H), not loss of water.\nThe saturated ketone would require **reduction** (loss of O with gain of H), not dehydration.",
      "id": "p_cpp5_4_q3"
     },
     {
      "q": "The researchers wanted to stop an Entry 1 reaction when Compound 1 was used up but before much Compound 3 had formed. Which TLC result should signal the time to stop?",
      "choices": [
       "The spot at Rf 0.62 has disappeared, and no spot is visible at Rf 0.55.",
       "The spot at Rf 0.24 has disappeared, and a spot is visible at Rf 0.55.",
       "The spot at Rf 0.55 has become the most intense spot on the plate.",
       "Only one spot is visible, and it is at Rf 0.62."
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Match each Rf to its compound: **0.62 = Compound 1** (starting aldehyde), **0.24 = Compound 2** (aldol), **0.55 = Compound 3** (enone). The goal is no remaining Compound 1 (its spot gone) and little Compound 3 (no spot at 0.55), leaving mainly the spot at 0.24.\n\nCompound 2 has the lowest Rf because its **OH group hydrogen bonds to the polar silica**, so it moves least. Compound 3 has lost that OH, so it runs much higher.\n\nLosing the 0.24 spot and seeing 0.55 means the desired product has already dehydrated.\nA strong 0.55 spot means the reaction went too far.\nA single spot at 0.62 means the reaction hasn't started.",
      "id": "p_cpp5_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp5_5",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4C",
     "4E",
     "5A"
    ],
    "title": "Electroplating Silver onto Catheter Wires",
    "passage": "Infections are a common complication of urinary catheters. Silver ions (Ag⁺) released slowly from a thin metallic silver coating kill bacteria, in part by binding to the thiol groups of bacterial proteins. One way to apply a uniform coating is electroplating. In an electrolytic cell, a stainless-steel catheter guide wire and a bar of pure silver are immersed in aqueous AgNO₃ and connected to a DC power supply. Silver dissolves from the bar and deposits on the wire:\n\nAg(s) → Ag⁺(aq) + e⁻ (silver bar)\nAg⁺(aq) + e⁻ → Ag(s) (wire)\n\nThe amount of silver deposited depends on the charge passed, Q = It. The Faraday constant, F = 96,500 C/mol e⁻, converts charge to moles of electrons. The molar mass of Ag is 108 g/mol. If the current is too high, Ag⁺ near the wire is used up faster than it diffuses in, and water is reduced instead: 2 H₂O + 2 e⁻ → H₂(g) + 2 OH⁻. The current efficiency is the fraction of the charge that actually deposits silver.\n\nEngineers plated identical wires at four currents, passing 96.5 C in each run, and then rinsed, dried and weighed each wire (Table 1). After implantation, the coating releases Ag⁺ into urine, which contains about 0.10 M Cl⁻. The Ksp of AgCl is 1.8 × 10⁻¹⁰ at body temperature. Electron microscopy showed that the wires from runs with many bubbles had rough, porous coatings, while those from runs without bubbles were smooth and dense. Typical coatings are 1 to 2 μm thick.",
    "figure": {
     "caption": "Table 1 Silver plating runs (96.5 C passed in each run)",
     "columns": [
      "Run",
      "Current (mA)",
      "Time (s)",
      "Mass gained by wire (mg)",
      "Gas bubbles at wire"
     ],
     "rows": [
      [
       "1",
       "50",
       "1930",
       "107",
       "none"
      ],
      [
       "2",
       "100",
       "965",
       "104",
       "none"
      ],
      [
       "3",
       "250",
       "386",
       "92",
       "few"
      ],
      [
       "4",
       "500",
       "193",
       "76",
       "many"
      ]
     ]
    },
    "questions": [
     {
      "q": "A wire is plated at a constant current of 0.200 A for 965 s. What mass of silver is deposited if the current efficiency is 100%?",
      "choices": [
       "0.216 mg",
       "21.6 mg",
       "108 mg",
       "216 mg"
      ],
      "ans": 3,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "exp": "Charge: Q = It = 0.200 A × 965 s = **193 C**.\nMoles of electrons: 193 C ÷ 96,500 C/mol = **2.00 × 10⁻³ mol e⁻**.\nThe half-reaction Ag⁺ + e⁻ → Ag uses **one electron per Ag atom**, so 2.00 × 10⁻³ mol Ag × 108 g/mol = 0.216 g = **216 mg**.\n\n**108 mg** assumes two electrons per silver atom.\n**21.6 mg** is a factor-of-10 slip.\n**0.216 mg** writes 0.216 g as if it were milligrams.",
      "id": "p_cpp5_5_q1"
     },
     {
      "q": "What is the ground-state electron configuration of the ion that is reduced at the wire?",
      "choices": [
       "[Kr] 4d¹⁰",
       "[Kr] 4d⁹ 5s¹",
       "[Kr] 4d¹⁰ 5s¹",
       "[Kr] 4d⁸ 5s²"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "The ion reduced at the wire is **Ag⁺**. Neutral silver (Z = 47) is **[Kr] 4d¹⁰ 5s¹**, an exception to the filling order like copper, because a **completely filled d subshell** is especially stable. When a transition metal ionizes, it loses its **5s electron first**, so Ag⁺ is **[Kr] 4d¹⁰**.\n\n[Kr] 4d¹⁰ 5s¹ is neutral Ag, the product at the wire.\n[Kr] 4d⁹ 5s¹ removes a d electron instead of the s electron.\n[Kr] 4d⁸ 5s² is what the simple Aufbau order would predict for Ag⁺, ignoring both rules above.",
      "id": "p_cpp5_5_q2"
     },
     {
      "q": "Based on the passage, what is the highest concentration of Ag⁺ that can remain dissolved in urine without AgCl precipitating?",
      "choices": [
       "1.8 × 10⁻¹¹ M",
       "1.8 × 10⁻¹⁰ M",
       "1.8 × 10⁻⁹ M",
       "1.3 × 10⁻⁵ M"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "AgCl(s) ⇌ Ag⁺ + Cl⁻, and **Ksp = [Ag⁺][Cl⁻]**. Urine already contains 0.10 M Cl⁻ (a **common ion**), so the maximum [Ag⁺] = Ksp ÷ [Cl⁻] = 1.8 × 10⁻¹⁰ ÷ 0.10 = **1.8 × 10⁻⁹ M**.\n\n**1.3 × 10⁻⁵ M** is √Ksp, the solubility in pure water; it ignores the chloride in urine.\n**1.8 × 10⁻¹¹ M** multiplies by 0.10 instead of dividing.\n**1.8 × 10⁻¹⁰ M** treats Ksp itself as the concentration.",
      "id": "p_cpp5_5_q3"
     },
     {
      "q": "Which conclusion is best supported by the data in Table 1?",
      "choices": [
       "Current efficiency decreases as current increases, because more of the charge reduces water.",
       "Current efficiency decreases as current increases, because less charge is passed in the shorter runs.",
       "Current efficiency is the same in every run, because the same charge is passed in every run.",
       "Current efficiency increases as current increases, because more Ag⁺ is reduced each second."
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Each run passes 96.5 C = 96.5 ÷ 96,500 = 1.00 × 10⁻³ mol e⁻, enough for 1.00 × 10⁻³ mol Ag = **108 mg** at 100% efficiency. The efficiencies are therefore 107/108 ≈ 99%, 104/108 ≈ 96%, 92/108 ≈ 85% and 76/108 ≈ **70%**: efficiency **falls as current rises**. The bubbles that appear in Runs 3 and 4 are **H₂ from reduction of water**, the competing reaction described in the passage, which uses charge without depositing silver.\n\nThe charge was the same (96.5 C) in every run, so a shorter time is not the cause.\nThe masses differ, so the efficiency is not constant.\nThe masses fall, so efficiency does not rise.",
      "id": "p_cpp5_5_q4"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "A physical therapist moves a patient's hand in a horizontal circle at constant speed. How much work does the net (centripetal) force on the hand do during one full revolution?",
    "choices": [
     "Zero, because the force is always perpendicular to the hand's velocity",
     "Zero, because the hand travels zero total distance",
     "A positive amount, because the force acts throughout the motion",
     "A negative amount, because the force points toward the center"
    ],
    "ans": 0,
    "cat": "4A",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "Work is W = Fd cos θ for each small step. The centripetal force points toward the center while the velocity is tangent to the circle, so **θ = 90° at every instant and cos 90° = 0**. The force changes the direction of the velocity but not the speed, so the kinetic energy (and therefore the net work, by the work–energy theorem) does not change.\n\nThe hand travels a distance of 2πr, not zero; only its net displacement is zero. The reason the work is zero is the angle, not the distance.\nA force acting throughout the motion does no work if it is always perpendicular to it.\nPointing toward the center does not make the work negative; negative work needs a component opposite the motion.",
    "id": "cp_half_5_sa1"
   },
   {
    "q": "A diver releases a sealed, flexible bag holding 2.0 L of air at a depth of 20 m in the sea. Each 10 m of water adds about 1.0 atm of pressure, and the pressure at the surface is 1.0 atm. If the temperature stays constant, what is the volume of the bag when it reaches the surface?",
    "choices": [
     "6.0 L",
     "4.0 L",
     "0.67 L",
     "1.0 L"
    ],
    "ans": 0,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "At constant temperature, **Boyle's law** applies: P₁V₁ = P₂V₂. Use **absolute** pressures. At 20 m, P₁ = 1.0 atm (air above the water) + 2 × 1.0 atm (water) = **3.0 atm**. At the surface, P₂ = 1.0 atm.\nV₂ = P₁V₁ ÷ P₂ = (3.0 atm)(2.0 L) ÷ 1.0 atm = **6.0 L**.\nThe pressure falls by a factor of 3, so the volume triples. This is why a scuba diver must exhale while ascending.\n\n**4.0 L** uses only the water's contribution (2.0 atm, the gauge pressure) and forgets the atmosphere above the water.\n**0.67 L** inverts the ratio (2.0 L × 1/3), so the bag shrinks as the pressure falls.\n**1.0 L** makes both slips: gauge pressure and the inverted ratio (2.0 L × 1/2).",
    "id": "cp_half_5_sa2"
   },
   {
    "id": "cp_half_5_sa3b",
    "q": "Radium-226 (Z = 88) decays by α emission. What is the product nucleus?",
    "choices": [
     "Radon-222",
     "Radium-222",
     "Thorium-230",
     "Radon-226"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "An **α particle is a helium-4 nucleus**: the mass number drops by 4 (226 → 222) and Z drops by 2 (88 → 86, which is radon).\n**Radium-222** keeps Z the same.\n**Thorium-230** adds the α particle instead of removing it.\n**Radon-226** changes Z but forgets that the mass number drops by 4."
   },
   {
    "q": "Chlorine, found in the body mainly as Cl⁻, has two stable isotopes, chlorine-35 and chlorine-37. The average atomic mass of chlorine is 35.5. Which statement about natural chlorine is correct?",
    "choices": [
     "About 50% of its atoms are chlorine-35.",
     "About 95% of its atoms are chlorine-35.",
     "About 75% of its atoms are chlorine-35.",
     "About 75% of its atoms are chlorine-37."
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "The average atomic mass is the **abundance-weighted average** of the isotope masses. Let x be the fraction of chlorine-35:\n35x + 37(1 − x) = 35.5\n37 − 2x = 35.5, so x = **0.75**.\nAbout 75% of the atoms are chlorine-35 and 25% are chlorine-37. Both isotopes have 17 protons; they differ only in neutrons (18 vs 20).\n\n**75% chlorine-37** reverses the isotopes: it would give 0.25(35) + 0.75(37) = 36.5.\n**50%** would put the average halfway between the masses, at 36.0.\n**95%** would give 0.95(35) + 0.05(37) = 35.1; an average of 35.5 is closer to 35 than to 37, but not that close.",
    "id": "cp_half_5_sa4"
   },
   {
    "q": "Each of the following 0.10 M aqueous solutions has a pH of 7 or lower at 25°C EXCEPT:",
    "choices": [
     "NaF",
     "NaCl",
     "NH₄Cl",
     "KNO₃"
    ],
    "ans": 0,
    "cat": "5A",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Think about each ion's parent acid or base. **F⁻ is the conjugate base of HF, a weak acid**, so it accepts protons from water (F⁻ + H₂O ⇌ HF + OH⁻) and makes the solution **basic (pH > 7)**.\n\nNaCl and KNO₃ come from a strong acid and a strong base, so neither ion reacts with water and the pH is 7.\nNH₄⁺ is the conjugate acid of the weak base NH₃, so NH₄Cl is acidic (pH < 7).",
    "id": "cp_half_5_sa5"
   },
   {
    "q": "Use the average bond enthalpies H–H 436 kJ/mol, Cl–Cl 242 kJ/mol and H–Cl 431 kJ/mol to estimate ΔH for the reaction H₂(g) + Cl₂(g) → 2HCl(g).",
    "choices": [
     "−184 kJ",
     "+184 kJ",
     "+247 kJ",
     "−1540 kJ"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "**ΔH ≈ (bonds broken) − (bonds formed)**, because breaking bonds absorbs energy and forming bonds releases it.\nBroken: one H–H + one Cl–Cl = 436 + 242 = **678 kJ**.\nFormed: two H–Cl = 2 × 431 = **862 kJ**.\nΔH ≈ 678 − 862 = **−184 kJ**. More energy is released forming the products' bonds than is spent breaking the reactants' bonds, so the reaction is exothermic.\n\n**+184 kJ** subtracts the wrong way (formed − broken).\n**+247 kJ** counts only one H–Cl bond (678 − 431), ignoring the coefficient 2.\n**−1540 kJ** adds the broken and formed bond energies and treats them all as released (−(678 + 862)).",
    "id": "cp_half_5_sa6"
   },
   {
    "q": "A researcher suspects that a new drug is a competitive inhibitor of an enzyme. Which experiment would best test this hypothesis?",
    "choices": [
     "Measure initial rates over a range of substrate concentrations with and without the drug, then compare KM and Vmax.",
     "Measure the initial rate at one low substrate concentration with and without the drug, then compare the rates.",
     "Measure initial rates at several enzyme concentrations with the drug, then compare the rates.",
     "Measure the equilibrium constant of the reaction with and without the drug, then compare the constants."
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "Inhibitor types are told apart by **how they change KM and Vmax**, and you can only find these from rates measured over a **range of substrate concentrations**. A competitive inhibitor **raises the apparent KM and leaves Vmax unchanged**, because enough substrate outcompetes it.\n\nOne low substrate concentration shows that the drug inhibits but not how; every inhibitor type would slow the rate there.\nVarying the enzyme concentration changes Vmax in every case and says nothing about the mechanism.\nEnzymes and inhibitors don't change the equilibrium constant, only the rate.",
    "id": "cp_half_5_sa7"
   },
   {
    "q": "Sucrose is a non-reducing sugar because:",
    "choices": [
     "its glycosidic bond joins the anomeric carbons of both glucose and fructose.",
     "its glycosidic bond joins the anomeric carbon of glucose to C-4 of fructose.",
     "its glucose and fructose units are both locked in the open-chain form.",
     "its glucose and fructose units contain no free hydroxyl groups."
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "A sugar is **reducing** if a ring can open to give a free aldehyde (or a ketone that isomerizes to one), and that requires a free **anomeric carbon** (a hemiacetal or hemiketal). In sucrose, the glycosidic bond links **C-1 of glucose to C-2 of fructose** (α1→β2): both anomeric carbons are tied up as acetals, so neither ring can open.\n\nA bond from glucose C-1 to fructose C-4 would leave fructose's anomeric carbon free, so the sugar would be reducing.\nThe units are in ring (cyclic) form; an open chain would be reducing.\nSucrose has eight free OH groups, which is why it is so water-soluble.",
    "id": "cp_half_5_sa8"
   },
   {
    "q": "Which compound, when heated in aqueous NaOH, is converted into a single organic product that contains both a hydroxyl group and a carboxylate group?",
    "choices": [
     "γ-Butyrolactone",
     "Ethyl acetate",
     "Caprolactam",
     "Cyclohexanone"
    ],
    "choiceFigs": [
     "gamma-butyrolactone",
     "ethyl-acetate",
     "caprolactam",
     "cyclohexanone"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "Base hydrolysis (**saponification**) of an ester gives a carboxylate and an alcohol. In a **lactone** (a cyclic ester) both pieces are in one molecule, so opening the ring gives one product carrying both groups: γ-butyrolactone → **4-hydroxybutanoate**, HOCH₂CH₂CH₂COO⁻.\n\nEthyl acetate is an open-chain ester, so it gives **two** products: acetate and ethanol.\nCaprolactam is a cyclic **amide** (lactam); it would open to an amine and a carboxylate, not a hydroxyl.\nCyclohexanone is a ketone, which has no leaving group and is not hydrolyzed.",
    "id": "cp_half_5_sa9"
   },
   {
    "q": "Ethylene glycol (HOCH₂CH₂OH, 62 g/mol) boils at 197°C, whereas 1-propanol (CH₃CH₂CH₂OH, 60 g/mol) boils at 97°C. Which statement best explains the difference?",
    "choices": [
     "Each ethylene glycol molecule has two OH groups, so it forms more hydrogen bonds with its neighbors.",
     "Ethylene glycol has a larger molar mass, so its London dispersion forces are much stronger.",
     "Ethylene glycol has more C–H bonds, so it forms more hydrogen bonds with its neighbors.",
     "Ethylene glycol is ionic in the liquid state, so its molecules are held together by ion–ion forces."
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "X",
    "subj": "organic_chem",
    "exp": "The two compounds have nearly the same molar mass, so dispersion forces are similar. The big difference is **hydrogen bonding**: ethylene glycol has **two OH groups** per molecule, so each molecule can donate and accept about twice as many hydrogen bonds. More energy is needed to separate the molecules, giving a boiling point 100°C higher.\n\nA 2 g/mol difference cannot explain a 100°C gap in boiling point.\nC–H bonds are not polar enough to form hydrogen bonds; only H bonded to N, O or F can.\nEthylene glycol is a neutral molecular compound, not an ionic one.",
    "id": "cp_half_5_sa10"
   }
  ]
 },
 {
  "id": "cp_half_6",
  "title": "Chem/Phys Quiz 6",
  "order": [
   "p_cpp6_1",
   "p_cpp6_2",
   4,
   "p_cpp6_3",
   "p_cpp6_4",
   3,
   "p_cpp6_5",
   3
  ],
  "passages": [
   {
    "id": "p_cpp6_1",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5A"
    ],
    "title": "Histidine as the Buffer in a Cardioplegia Solution",
    "passage": "During heart surgery and organ transplantation, the heart is stopped and cooled with a cardioplegia solution. Without blood flow, heart muscle switches to anaerobic glycolysis, and the lactic acid it produces lowers intracellular pH. Some preservation solutions therefore contain a high concentration of the amino acid L-histidine (Compound 1, molar mass 155 g/mol), whose side chain can accept protons near physiological pH. Among the standard amino acids, histidine is the only one with a side-chain pKa near 6 to 7, and these solutions contain it at nearly 200 mM, far above its concentration in plasma.\n\nThe imidazole side chain of histidine is protonated and deprotonated as shown in Reaction 1.\n\nimidazolium (–C₃H₄N₂⁺) ⇌ imidazole (–C₃H₃N₂) + H⁺\nReaction 1\n\nTo characterize the buffer, a chemist dissolved histidine dihydrochloride in water to make 20.0 mL of a 0.10 M solution of the fully protonated form, H₃His²⁺, in which the carboxyl group, the α-amino group and the side chain all carry their acidic protons. The solution was titrated at 25°C with 0.10 M NaOH while the pH was recorded (Figure 2). Each of the three acidic groups loses its proton in a separate buffer region of the curve.\n\nThe chemist noted that the pKa of the imidazolium group rises by about 0.02 units for each 1°C decrease in temperature, so the solution buffers somewhat more strongly near pH 7 when the heart is cooled to 4°C. The solution also contains tryptophan and α-ketoglutarate, which were not present in the titration.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 L-Histidine (Compound 1), uncharged form",
      "parts": [
       "cpp6-histidine"
      ]
     }
    ],
    "figure": {
     "type": "line",
     "caption": "Figure 2 Titration of 20.0 mL of 0.10 M H₃His²⁺ with 0.10 M NaOH at 25°C",
     "x": {
      "label": "Volume of NaOH added (mL)",
      "min": 0,
      "max": 60,
      "step": 10
     },
     "y": {
      "label": "pH",
      "min": 0,
      "max": 12,
      "step": 2
     },
     "series": [
      {
       "name": "Histidine",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         1.5
        ],
        [
         5,
         1.6
        ],
        [
         10,
         1.8
        ],
        [
         15,
         2.3
        ],
        [
         18,
         2.9
        ],
        [
         20,
         3.9
        ],
        [
         22,
         5.0
        ],
        [
         25,
         5.5
        ],
        [
         30,
         6.0
        ],
        [
         35,
         6.5
        ],
        [
         38,
         7.0
        ],
        [
         40,
         7.6
        ],
        [
         42,
         8.2
        ],
        [
         45,
         8.7
        ],
        [
         50,
         9.2
        ],
        [
         55,
         9.7
        ],
        [
         58,
         10.3
        ],
        [
         60,
         10.8
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Based on Figure 2, what is the isoelectric point (pI) of histidine?",
      "choices": [
       "3.9",
       "5.7",
       "6.0",
       "7.6"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "M",
      "exp": "Read the three pKa values from the midpoints of the buffer regions (half-equivalence points): **1.8 at 10 mL, 6.0 at 30 mL and 9.2 at 50 mL**. The neutral (net charge 0) form exists after the side chain loses its proton (pKa 6.0) and before the α-NH₃⁺ loses its proton (pKa 9.2). The pI is the average of the two pKa values that bracket the neutral form: (6.0 + 9.2) ÷ 2 = **7.6**. On the curve this is the second equivalence point (40 mL), where all histidine has lost exactly two protons.\n\n**3.9** is the first equivalence point, (1.8 + 6.0) ÷ 2, where histidine still has a net charge of +1.\n**5.7** averages all three pKa values; the pI uses only the two that flank the neutral species.\n**6.0** is the side-chain pKa alone, where the +1 and 0 forms are present in equal amounts.",
      "id": "p_cpp6_1_q1"
     },
     {
      "q": "The preservation solution is adjusted to pH 7.0 at 25°C. Based on Figure 2, approximately what percentage of the histidine side chains are protonated at this pH?",
      "choices": [
       "1%",
       "9%",
       "50%",
       "91%"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "The side-chain pKa is the midpoint of the middle buffer region: **pKa = 6.0** (30 mL). Use Henderson–Hasselbalch:\n7.0 = 6.0 + log([imidazole]/[imidazolium])\nlog ratio = 1.0, so [imidazole] : [imidazolium] = **10 : 1**.\nProtonated fraction = 1 ÷ (10 + 1) = 1/11 ≈ **9%**.\n\n**91%** is the deprotonated fraction (the ratio inverted).\n**50%** would be true only at pH = pKa.\n**1%** comes from a ratio of 100 : 1, which would need pH 8.0 (two units above the pKa).",
      "id": "p_cpp6_1_q2"
     },
     {
      "q": "Which structure shows the predominant form of histidine in the titration flask after 20.0 mL of NaOH has been added?",
      "choices": [
       "COOH, NH₃⁺ and protonated imidazolium (net charge +2)",
       "COO⁻, NH₃⁺ and protonated imidazolium (net charge +1)",
       "COOH, NH₃⁺ and neutral imidazole (net charge +1)",
       "COO⁻, NH₃⁺ and neutral imidazole (net charge 0)"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "X",
      "choiceFigs": [
       "cpp6-his-plus2",
       "cpp6-his-plus1",
       "cpp6-his-plus1-cooh",
       "cpp6-his-zwitterion"
      ],
      "exp": "The flask started with 20.0 mL × 0.10 M = **2.0 mmol H₃His²⁺**. Adding 20.0 mL × 0.10 M = 2.0 mmol OH⁻ removes **exactly one proton** from every histidine. Protons come off in order of acidity, lowest pKa first, so the one removed is from the **carboxylic acid (pKa 1.8)**. The predominant species has COO⁻, NH₃⁺ and the still-protonated imidazolium (pKa 6.0): net charge **+1**. The pH there, 3.9, is well below 6.0 and 9.2, which confirms the side chain and amine are still protonated.\n\nThe +2 form is what was present before any base was added.\nThe structure with COOH and a neutral imidazole also has a +1 charge, but it lost the wrong proton: the imidazolium (pKa 6.0) is a weaker acid than COOH (pKa 1.8).\nThe zwitterion with net charge 0 forms only at the second equivalence point (40 mL).",
      "id": "p_cpp6_1_q3"
     },
     {
      "q": "Histidine side chains often serve as general acid–base catalysts in enzyme active sites. Which property best explains this role at physiological pH?",
      "choices": [
       "Its side-chain pKa is near physiological pH, so both protonated and unprotonated forms are present.",
       "It is the only amino acid with an aromatic side chain.",
       "Its side chain is permanently positively charged at physiological pH.",
       "Its side chain can form disulfide bonds with nearby residues."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "A general acid–base catalyst must be able to **both donate and accept a proton** during the reaction. Because the imidazole pKa (about 6, Figure 2) is close to physiological pH, a significant fraction of histidine side chains is protonated (able to donate H⁺) and a significant fraction is neutral (able to accept H⁺).\n\nPhenylalanine, tyrosine and tryptophan also have aromatic side chains.\nA permanently charged side chain (like arginine's) could not switch between forms.\nDisulfide bonds are formed by cysteine, not histidine.",
      "id": "p_cpp6_1_q4"
     }
    ]
   },
   {
    "id": "p_cpp6_2",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4A",
     "5E"
    ],
    "title": "Mechanical Efficiency During Cycle Ergometry",
    "passage": "Exercise physiologists measure how efficiently muscles convert chemical energy into mechanical work using a friction-braked cycle ergometer. A belt wrapped around the rim of a heavy flywheel presses on the rim with an adjustable friction force. Gearing is set so that the rim travels 6.0 m for each revolution of the pedals. The work done against friction in one pedal revolution therefore equals the friction force multiplied by 6.0 m.\n\nThe metabolic energy used is found by indirect calorimetry. The subject breathes through a mouthpiece connected to gas analyzers that report oxygen uptake (VO₂). For the mixture of carbohydrate and fat oxidized during exercise, about 20 kJ of energy is released for each liter of O₂ consumed. Gross mechanical efficiency is the mechanical power delivered to the flywheel divided by the metabolic power. The analyzers also report the respiratory exchange ratio (RER), the ratio of CO₂ released to O₂ consumed.\n\nMuscle contraction is powered by ATP hydrolysis. Under standard biochemical conditions ΔG°′ for ATP hydrolysis is −30.5 kJ/mol, but in working muscle ΔG is closer to −50 kJ/mol. Metabolic energy that does not become mechanical work is released as heat, which the body removes mainly by evaporating sweat (heat of vaporization of water at skin temperature ≈ 2.4 kJ/g).\n\nA healthy 70-kg volunteer completed a graded test. Each stage lasted 4 minutes, and measurements were averaged over the last minute of each stage (Table 1). Before the test, the volunteer sat quietly on the ergometer for 5 minutes, during which VO₂ was 0.30 L/min and heart rate was 68 beats/min.",
    "figure": {
     "caption": "Table 1 Graded cycle ergometer test",
     "columns": [
      "Stage",
      "Friction force (N)",
      "Cadence (rev/min)",
      "VO₂ (L/min)",
      "Heart rate (beats/min)",
      "RER"
     ],
     "rows": [
      [
       "1",
       "10",
       "60",
       "0.90",
       "105",
       "0.85"
      ],
      [
       "2",
       "20",
       "60",
       "1.50",
       "128",
       "0.90"
      ],
      [
       "3",
       "30",
       "60",
       "2.10",
       "150",
       "0.95"
      ],
      [
       "4",
       "30",
       "80",
       "2.70",
       "172",
       "1.02"
      ]
     ]
    },
    "questions": [
     {
      "q": "What mechanical power did the volunteer deliver to the flywheel during Stage 4?",
      "choices": [
       "40 W",
       "180 W",
       "240 W",
       "14,400 W"
      ],
      "ans": 2,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "M",
      "exp": "**Power = work ÷ time**. Each revolution does W = F × d = 30 N × 6.0 m = 180 J. At 80 rev/min the cadence is 80 ÷ 60 = 4/3 rev/s, so P = 180 J × 4/3 s⁻¹ = **240 W**.\n\n**180 W** is the Stage 3 value (30 N at 60 rev/min, i.e. 1 rev/s); it ignores the higher cadence.\n**40 W** leaves out the 6.0 m of rim travel per revolution (30 N × 4/3).\n**14,400 W** treats 80 rev/min as 80 rev/s (30 × 6.0 × 80).",
      "id": "p_cpp6_2_q1"
     },
     {
      "q": "Based on Table 1, the gross mechanical efficiency during Stage 2 was closest to:",
      "choices": [
       "0.4%",
       "17%",
       "24%",
       "76%"
      ],
      "ans": 2,
      "cat": "4A",
      "skill": "SIRS 4",
      "diff": "D",
      "exp": "Mechanical power in Stage 2: 20 N × 6.0 m × 1 rev/s = **120 W**.\nMetabolic power: 1.50 L/min × 20 kJ/L = 30 kJ/min = 30,000 J ÷ 60 s = **500 W**.\nEfficiency = 120 ÷ 500 = **24%**.\n\n**0.4%** divides 120 J/s by 30,000 J/min without converting minutes to seconds.\n**17%** uses the Stage 3 VO₂ (700 W) with the Stage 2 power.\n**76%** is the fraction released as heat (380 ÷ 500), not the efficiency.",
      "id": "p_cpp6_2_q2"
     },
     {
      "q": "Suppose all metabolic energy in Stage 3 that did not become mechanical work were removed by evaporating sweat. About what mass of sweat would evaporate each minute?",
      "choices": [
       "0.22 g",
       "4.5 g",
       "13 g",
       "17.5 g"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "exp": "Work per minute in Stage 3:\nMetabolic energy = 2.10 L × 20 kJ/L = **42 kJ**.\nMechanical work = 30 N × 6.0 m × 60 rev = 10,800 J = **10.8 kJ**.\nHeat = 42 − 10.8 = **31.2 kJ**.\nUse **q = mL**: m = 31.2 kJ ÷ 2.4 kJ/g = **13 g** per minute.\n\n**17.5 g** uses all 42 kJ and forgets that some energy left as work.\n**4.5 g** uses the mechanical work (10.8 kJ) instead of the heat.\n**0.22 g** uses the heat for one second (520 J) instead of one minute.",
      "id": "p_cpp6_2_q3"
     },
     {
      "q": "Which statement best explains why ΔG for ATP hydrolysis in working muscle is more negative than ΔG°′?",
      "choices": [
       "The cellular ratio [ADP][Pi]/[ATP] is far below 1, so the RT ln Q term is negative.",
       "Enzymes that hydrolyze ATP lower ΔG for the reaction in cells.",
       "Body temperature is higher than standard temperature, which makes ΔG°′ more negative.",
       "The cellular ratio [ADP][Pi]/[ATP] is far above 1, so the RT ln Q term is negative."
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "D",
      "subj": "biochemistry",
      "exp": "**ΔG = ΔG°′ + RT ln Q**, where Q = [ADP][Pi]/[ATP]. Standard conditions set every concentration to 1 M (Q = 1, ln Q = 0). In muscle, ATP is held high and ADP very low (millimolar or less), so **Q is much less than 1** and ln Q is negative. That adds a negative term, making ΔG about −50 kJ/mol instead of −30.5 kJ/mol.\n\nEnzymes speed the reaction by lowering the activation energy; they do not change ΔG.\nΔG°′ is defined at a fixed standard state; the small temperature difference does not explain a 20 kJ/mol change.\nIf Q were far above 1, ln Q would be positive and ΔG would be less negative.",
      "id": "p_cpp6_2_q4"
     }
    ]
   },
   {
    "id": "p_cpp6_3",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4B",
     "4C"
    ],
    "title": "Gas Delivery and Oxygen Sensing in a Mechanical Ventilator",
    "passage": "A patient with acute respiratory failure is supported by a ventilator in volume-control mode. On each breath the ventilator pushes a set tidal volume of 500 mL into the lungs. The volume is measured by a flow sensor inside the machine, where the gas is dry and at 27°C. In the airways the gas warms to body temperature (37°C) and becomes saturated with water vapor (47 mmHg), while the pressure stays close to the airway pressure.\n\nThe ventilator records airway pressure throughout the breath. At the end of expiration it keeps a positive end-expiratory pressure (PEEP) of 5 cm H₂O. During inspiration the peak pressure reaches 25 cm H₂O. The ventilator then holds the breath for 0.5 s with no gas flowing, and the pressure falls to a plateau of 15 cm H₂O. Respiratory system compliance, the volume change per unit change in pressure (ΔV/ΔP), is used to track lung stiffness.\n\nThe fraction of inspired O₂ (FiO₂) is checked with a galvanic oxygen sensor. O₂ diffuses through a membrane to a gold electrode, and a lead electrode sits in a KOH electrolyte. The two half-reactions are:\n\nO₂ + 2H₂O + 4e⁻ → 4OH⁻\nPb + 2OH⁻ → PbO + H₂O + 2e⁻\n\nThe electrodes are connected through a resistor, and the cell current is proportional to the partial pressure of O₂ reaching the gold. During calibration at a barometric pressure of 760 mmHg, the sensor gave 10.5 μA in room air (FiO₂ = 0.21). In the patient's circuit it read 20.0 μA, corresponding to an FiO₂ of 0.40. The lead electrode is slowly consumed, so the sensor is replaced about once a year.",
    "questions": [
     {
      "q": "Ignoring the added water vapor, what volume does one 500-mL tidal volume occupy after it warms to 37°C in the airways at the same pressure?",
      "choices": [
       "484 mL",
       "500 mL",
       "517 mL",
       "685 mL"
      ],
      "ans": 2,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "At constant pressure and moles, **Charles's law** gives V₂ = V₁ × T₂/T₁, with temperatures in **kelvin**:\nT₁ = 27 + 273 = 300 K; T₂ = 37 + 273 = 310 K.\nV₂ = 500 mL × 310/300 = **517 mL**.\n\n**685 mL** uses Celsius temperatures (500 × 37/27).\n**484 mL** inverts the ratio (500 × 300/310), as if the gas cooled.\n**500 mL** ignores the temperature change. (The added water vapor would increase the volume further.)",
      "id": "p_cpp6_3_q1"
     },
     {
      "id": "p_cpp6_3_q2b",
      "q": "The team wants to confirm that the rise from 10.5 μA to 20.0 μA reflects a higher FiO₂ and not only the higher pressure in the patient circuit. Which check is most appropriate?",
      "choices": [
       "Read room air at the circuit's pressure, since the current tracks P(O₂) = FiO₂ × total pressure",
       "Read room air at 27°C, since the current tracks only the temperature of the gas",
       "Replace the lead electrode, since the current tracks only how much lead remains",
       "Raise the tidal volume, since the current tracks the gas volume delivered per breath"
      ],
      "ans": 0,
      "cat": "4B",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "The passage says the current is proportional to the **partial pressure of O₂**. By **Dalton's law**, P(O₂) = FiO₂ × total pressure, so a higher circuit pressure alone would raise the current even at FiO₂ = 0.21. Reading room air at the same pressure shows how much of the change comes from pressure, which is the control the team needs.\nTemperature, the remaining lead and the tidal volume are not what the passage says sets the current."
     },
     {
      "q": "Which electrode is the anode of the galvanic oxygen sensor, and what happens there?",
      "choices": [
       "The lead electrode, where oxidation occurs",
       "The lead electrode, where reduction occurs",
       "The gold electrode, where oxidation occurs",
       "The gold electrode, where reduction occurs"
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "gen_chem",
      "exp": "**Oxidation always happens at the anode** (\"an ox\"), in galvanic and electrolytic cells alike. In the half-reactions, Pb goes from oxidation state 0 to +2 in PbO and releases electrons, so **lead is oxidized and is the anode**. O₂ gains electrons at the gold electrode (0 → −2 in OH⁻), so gold is the cathode where reduction happens.\n\nLead is not reduced; it gives up electrons.\nThe gold electrode is not oxidized; it is where O₂ is reduced. (The gold itself does not react, which is why the lead is the part that wears out.)",
      "id": "p_cpp6_3_q3"
     },
     {
      "q": "When the sensor current is 19.3 μA, how many moles of O₂ are reduced at the gold electrode each second? (F = 96,500 C/mol e⁻)",
      "choices": [
       "5.0 × 10⁻¹¹ mol",
       "1.0 × 10⁻¹⁰ mol",
       "2.0 × 10⁻¹⁰ mol",
       "8.0 × 10⁻¹⁰ mol"
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "exp": "Current is charge per second: 19.3 μA = 19.3 × 10⁻⁶ C/s.\nMoles of electrons per second = 19.3 × 10⁻⁶ ÷ 96,500 = **2.0 × 10⁻¹⁰ mol e⁻/s**.\nThe cathode half-reaction uses **4 e⁻ per O₂**, so O₂ reduced = 2.0 × 10⁻¹⁰ ÷ 4 = **5.0 × 10⁻¹¹ mol/s**.\n\n**2.0 × 10⁻¹⁰ mol** is the moles of electrons, not O₂.\n**1.0 × 10⁻¹⁰ mol** divides by 2, the electron count of the lead half-reaction.\n**8.0 × 10⁻¹⁰ mol** multiplies by 4 instead of dividing.",
      "id": "p_cpp6_3_q4"
     }
    ]
   },
   {
    "id": "p_cpp6_4",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5C",
     "5B",
     "5A",
     "5D"
    ],
    "title": "HPLC Monitoring of Caffeine Therapy in Preterm Infants",
    "passage": "Caffeine (Compound 1) is the standard treatment for apnea of prematurity, in which preterm infants pause breathing for 20 seconds or longer. Adults clear caffeine in about 5 hours, mainly through N-demethylation by the liver enzyme CYP1A2. Each demethylation removes one N–CH₃ group as formaldehyde (CH₂O) and leaves an N–H. The main product is paraxanthine (Compound 2); theobromine (Compound 3) and theophylline (Compound 4) are minor products (Figure 1). In preterm infants CYP1A2 is immature, the half-life of caffeine can exceed 100 hours, and serum levels are checked to keep them in the target range of 8–20 mg/L (caffeine molar mass 194 g/mol). Infants receive a loading dose of 20 mg/kg caffeine citrate, equivalent to 10 mg/kg caffeine base, followed by daily maintenance doses. Because the infant liver can also methylate theophylline back to caffeine, the pattern of metabolites in serum differs from that seen in adults.\n\nA hospital laboratory measures the four methylxanthines by reversed-phase high-performance liquid chromatography (HPLC). The column is packed with silica particles bonded to C₁₈ hydrocarbon chains. The mobile phase is 85:15 water:methanol containing 0.1% acetic acid, pumped at 1.0 mL/min, and compounds are detected by UV absorbance at 273 nm. Each run takes 10 minutes, and the column is washed with 100% methanol at the end of each batch to remove strongly retained material.\n\nA standard containing 50.0 μM of each compound and a serum sample from a 2-week-old infant were deproteinized and injected in the same way. The retention times and peak areas are shown in Table 1.",
    "scheme": [
     {
      "after": 0,
      "caption": "Figure 1 N-Demethylation of caffeine (Compound 1) to paraxanthine (Compound 2)",
      "parts": [
       "cpp6-caffeine",
       {
        "arrow": "CYP1A2, O₂, NADPH"
       },
       "cpp6-paraxanthine",
       "+",
       "cpp6-formaldehyde"
      ]
     },
     {
      "after": 0,
      "caption": "Minor metabolites: theobromine (Compound 3) and theophylline (Compound 4)",
      "parts": [
       "cpp6-theobromine",
       "cpp6-theophylline"
      ]
     }
    ],
    "figure": {
     "caption": "Table 1 Reversed-phase HPLC of methylxanthines",
     "columns": [
      "Compound",
      "Retention time (min)",
      "Peak area, 50.0 μM standard",
      "Peak area, infant serum"
     ],
     "rows": [
      [
       "Theobromine (3)",
       "3.1",
       "1.20 × 10⁵",
       "not detected"
      ],
      [
       "Paraxanthine (2)",
       "4.4",
       "1.30 × 10⁵",
       "0.10 × 10⁵"
      ],
      [
       "Theophylline (4)",
       "5.0",
       "1.25 × 10⁵",
       "0.15 × 10⁵"
      ],
      [
       "Caffeine (1)",
       "8.2",
       "1.50 × 10⁵",
       "2.40 × 10⁵"
      ]
     ]
    },
    "questions": [
     {
      "q": "The laboratory wants to add an internal standard that is well separated from all four methylxanthines and elutes after caffeine but within the 10-minute run. Which compound is the best choice?",
      "choices": [
       "Xanthine",
       "1-Methylxanthine",
       "7-(2-Hydroxyethyl)theophylline",
       "7-Ethyl-1,3-dimethylxanthine"
      ],
      "ans": 3,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "X",
      "choiceFigs": [
       "cpp6-xanthine",
       "cpp6-1-methylxanthine",
       "cpp6-etofylline",
       "cpp6-7-ethyltheophylline"
      ],
      "exp": "In **reversed-phase** HPLC the stationary phase (C₁₈ chains) is nonpolar and the mobile phase is polar, so **less polar compounds are retained longer**. Table 1 shows the trend: the compounds with one N–H elute at 3–5 min, and caffeine, with no N–H, elutes last at 8.2 min.\n\n**7-Ethyl-1,3-dimethylxanthine** is caffeine with the N7 methyl group lengthened to an ethyl group. Like caffeine it has no N–H, and the extra CH₂ adds nonpolar surface, so it binds the C₁₈ phase a little more strongly and should elute shortly **after** caffeine (around 9–9.5 min): well separated from the 8.2-min caffeine peak but still inside the 10-minute run.\n\n**Xanthine** has three N–H donors and **1-methylxanthine** has two; both are more polar than any analyte and would elute early, near the theobromine peak.\n**7-(2-Hydroxyethyl)theophylline** has no N–H, but its new OH group adds polarity, so it would not be retained more strongly than caffeine.",
      "id": "p_cpp6_4_q1"
     },
     {
      "q": "Which statement best explains why caffeine has the longest retention time in Table 1?",
      "choices": [
       "Caffeine has no N–H hydrogen-bond donor, so it is the least polar compound and interacts most strongly with the nonpolar stationary phase.",
       "Caffeine has the highest molar mass, so it moves most slowly through the column regardless of polarity.",
       "Caffeine is the most polar compound, so it adsorbs most strongly to the silica particles.",
       "Caffeine is protonated by the acetic acid in the mobile phase, so it binds the stationary phase as a cation."
      ],
      "ans": 0,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "exp": "Compare the structures in Figure 1: each dimethylxanthine (2, 3 and 4) still has **one N–H**, which can hydrogen-bond to water in the polar mobile phase. Caffeine has all three nitrogens methylated, so it has **no hydrogen-bond donor**, is the least polar, and partitions most into the nonpolar C₁₈ phase. Stronger partitioning into the stationary phase means a longer retention time.\n\nMolar mass differs by only one CH₂ (14 g/mol) and does not set retention in partition chromatography; polarity does.\n\"Most polar binds silica\" describes **normal-phase** chromatography; here the silica is covered with C₁₈ chains.\nA cation would be more polar and would elute earlier, not later; caffeine is also a very weak base and stays mostly neutral in dilute acetic acid.",
      "id": "p_cpp6_4_q2"
     },
     {
      "q": "Assuming peak area is proportional to concentration, what is the caffeine concentration in the infant's serum?",
      "choices": [
       "31 μM",
       "50 μM",
       "80 μM",
       "96 μM"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 4",
      "diff": "D",
      "subj": "gen_chem",
      "exp": "Compare the serum peak with the **caffeine** standard peak, since each compound absorbs differently:\n[caffeine] = 50.0 μM × (2.40 × 10⁵ ÷ 1.50 × 10⁵) = 50.0 × 1.6 = **80 μM**.\nAs a check, 80 × 10⁻⁶ mol/L × 194 g/mol ≈ 0.0155 g/L = 15.5 mg/L, inside the 8–20 mg/L target range.\n\n**31 μM** inverts the ratio (50.0 × 1.50/2.40).\n**96 μM** uses the theophylline standard (50.0 × 2.40/1.25).\n**50 μM** is just the standard concentration.",
      "id": "p_cpp6_4_q3"
     },
     {
      "q": "In the reaction in Figure 1, the methyl carbon removed from caffeine leaves as formaldehyde. How does the oxidation state of that carbon change?",
      "choices": [
       "It increases from −2 to 0, so the carbon is oxidized.",
       "It decreases from 0 to −2, so the carbon is reduced.",
       "It increases from −4 to −2, so the carbon is oxidized.",
       "It stays at −2, so the carbon is neither oxidized nor reduced."
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "X",
      "exp": "Assign each bond's electrons to the more electronegative atom.\nIn **N–CH₃**: three C–H bonds give carbon −1 each (−3), and the C–N bond gives +1 (N is more electronegative). Total **−2**.\nIn **H₂C=O**: two C–H bonds give −2, and the C=O double bond gives +2. Total **0**.\nThe oxidation state rises from −2 to 0, so the carbon is **oxidized**. This fits CYP1A2, an oxygenase that uses O₂ and NADPH.\n\n−4 is the oxidation state of carbon in methane, not in an N-methyl group.\nThe decrease reverses the direction of the change.\n\"No change\" ignores the C–H bonds replaced by the C=O bond.",
      "id": "p_cpp6_4_q4"
     }
    ]
   },
   {
    "id": "p_cpp6_5",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "4D"
    ],
    "title": "Flame Emission Measurement of Serum Lithium",
    "passage": "Lithium carbonate is used to treat bipolar disorder, but the therapeutic range of serum Li⁺ (0.6–1.2 mM) is narrow, and levels above about 1.5 mM cause tremor and confusion. Many clinical laboratories measure Li⁺, Na⁺ and K⁺ by flame emission photometry. Each serum sample is diluted 1:200 in deionized water and is compared with standards prepared in exactly the same way.\n\nThe diluted serum is sprayed as a fine mist into a propane–air flame at about 1900°C. The water evaporates, the salts are broken apart, and the metal ions are reduced to neutral gaseous atoms. Collisions in the hot flame promote a small fraction of these atoms to excited electronic states. When the excited atoms return to the ground state, each element emits light at its own characteristic wavelengths (Table 1). An interference filter passes only the line of the element being measured, and the emitted intensity is proportional to the number of neutral atoms in the flame. Some atoms lose an electron entirely in the flame; the resulting ions do not emit at the atomic wavelengths.\n\nThe filtered light falls on the photocathode of a phototube. Each photon with enough energy ejects one electron, and the electrons are collected to give a current. The photocathode in this instrument has a work function of 1.7 eV. Useful relationships: E = hf, c = fλ, and hc = 1240 eV·nm.\n\nTo improve accuracy, the laboratory adds the same amount of CsCl to every standard and patient sample before measurement.",
    "figure": {
     "caption": "Table 1 Properties of alkali metal atoms used in flame photometry",
     "columns": [
      "Element",
      "Strongest emission line (nm)",
      "First ionization energy (eV)",
      "Serum concentration (mM)"
     ],
     "rows": [
      [
       "Li",
       "671",
       "5.39",
       "0.6–1.2 (therapeutic)"
      ],
      [
       "Na",
       "589",
       "5.14",
       "135–145"
      ],
      [
       "K",
       "766",
       "4.34",
       "3.5–5.0"
      ],
      [
       "Cs",
       "852",
       "3.89",
       "none (added)"
      ]
     ]
    },
    "questions": [
     {
      "q": "The 671-nm light emitted by lithium in the flame is produced when:",
      "choices": [
       "an electron in an excited Li atom drops from the 2p orbital to the 2s orbital.",
       "an electron in a ground-state Li atom is promoted from the 2s orbital to the 2p orbital.",
       "a Li atom loses its 2s electron to form Li⁺.",
       "a lithium nucleus releases energy by emitting a gamma ray."
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 1",
      "diff": "E",
      "exp": "**Emission** happens when an electron falls from a higher energy level to a lower one and the energy difference leaves as a photon (ΔE = hc/λ). Lithium's ground state is 1s²2s¹; the lowest excited state puts the valence electron in 2p, and the **2p → 2s** drop gives the red 671-nm line.\n\nPromotion from 2s to 2p **absorbs** energy; it is how the atom is excited, not how it emits.\nIonization removes the electron completely; the passage notes that ions do not emit at the atomic line.\nGamma rays come from nuclear transitions and have far shorter wavelengths (picometers, not hundreds of nanometers).",
      "id": "p_cpp6_5_q1"
     },
     {
      "q": "What is the energy of one photon of the sodium emission line? (h = 6.6 × 10⁻³⁴ J·s; c = 3.0 × 10⁸ m/s)",
      "choices": [
       "3.9 × 10⁻⁴⁰ J",
       "3.4 × 10⁻²⁸ J",
       "1.1 × 10⁻²⁷ J",
       "3.4 × 10⁻¹⁹ J"
      ],
      "ans": 3,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "physics",
      "exp": "Use **E = hc/λ** with λ in meters: 589 nm = 5.89 × 10⁻⁷ m.\nE = (6.6 × 10⁻³⁴ J·s)(3.0 × 10⁸ m/s) ÷ (5.89 × 10⁻⁷ m) = 1.98 × 10⁻²⁵ ÷ 5.89 × 10⁻⁷ ≈ **3.4 × 10⁻¹⁹ J** (about 2.1 eV, matching 1240 ÷ 589).\n\n**3.4 × 10⁻²⁸ J** leaves λ in nanometers (divides by 589 instead of 5.89 × 10⁻⁷).\n**1.1 × 10⁻²⁷ J** is h/λ, the photon's momentum in kg·m/s, not its energy.\n**3.9 × 10⁻⁴⁰ J** multiplies h by λ instead of dividing hc by λ.",
      "id": "p_cpp6_5_q2"
     },
     {
      "q": "Which emission lines in Table 1 can produce a current in the instrument's phototube?",
      "choices": [
       "Na only",
       "Na and Li only",
       "Na, Li and K only",
       "Na, Li, K and Cs"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "physics",
      "exp": "In the **photoelectric effect**, a photon ejects an electron only if its energy is at least the work function, no matter how bright the light is. The threshold wavelength is λ = hc/φ = 1240 eV·nm ÷ 1.7 eV ≈ **730 nm**; only shorter wavelengths (higher energy) work.\nNa 589 nm: 1240/589 ≈ 2.1 eV → ejects.\nLi 671 nm: 1240/671 ≈ 1.85 eV → ejects.\nK 766 nm: ≈ 1.6 eV → no.\nCs 852 nm: ≈ 1.5 eV → no.\nSo **Na and Li only**.\n\n\"Na only\" sets the cutoff too short.\nIncluding K or Cs assumes that bright enough light can eject electrons below the threshold energy, or compares the work function with the ionization energies in Table 1, which describe the flame atoms, not the photocathode.",
      "id": "p_cpp6_5_q3"
     },
     {
      "q": "What is the most likely reason the laboratory adds CsCl to every standard and sample?",
      "choices": [
       "Cs ionizes easily in the flame, and the electrons it releases shift Li ⇌ Li⁺ + e⁻ toward neutral Li atoms.",
       "Cs emits at 671 nm, so it serves as an internal standard at the lithium wavelength.",
       "Cs has a high ionization energy, so it absorbs heat and keeps the flame from ionizing lithium.",
       "Cs⁺ precipitates K⁺ so that potassium cannot interfere with the lithium measurement."
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 3",
      "diff": "D",
      "exp": "Only **neutral atoms** emit at the atomic line, so any Li that ionizes in the flame lowers the signal, and by an amount that can vary between samples. Cs has the **lowest first ionization energy** in Table 1 (3.89 eV), so a large excess of Cs ionizes readily and fills the flame with free electrons. By **Le Châtelier's principle**, the extra electrons push Li ⇌ Li⁺ + e⁻ back toward Li atoms, making the lithium signal larger and more consistent. Cs is called an ionization suppressor.\n\nCs emits at 852 nm, not 671 nm, so the lithium filter would block it.\nCs has the lowest, not the highest, ionization energy in Table 1.\nCs⁺ and K⁺ are both soluble alkali cations; nothing precipitates.",
      "id": "p_cpp6_5_q4"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "Protein kinases transfer the terminal phosphate of ATP to a hydroxyl group on the side chain of a target residue. Which set of amino acids can be phosphorylated in this way?",
    "choices": [
     "Serine, threonine and tyrosine",
     "Lysine, arginine and histidine",
     "Aspartate and glutamate",
     "Cysteine and methionine"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "Kinases form a **phosphate ester** with a side-chain –OH. The three standard amino acids with hydroxyl side chains are **serine and threonine** (alcohols) and **tyrosine** (a phenol).\n\nLysine, arginine and histidine have nitrogen-containing basic side chains, not hydroxyls.\nAspartate and glutamate have carboxylates.\nCysteine has a thiol (–SH) and methionine a thioether; neither has an –OH.",
    "id": "cp_half_6_sa1"
   },
   {
    "q": "2-Butanone is reduced with NaBH₄ in methanol. The 2-butanol produced is best described as:",
    "choices": [
     "a racemic mixture, because hydride adds equally to both faces of the planar carbonyl carbon",
     "only the (R) enantiomer, because hydride adds to the less hindered face of the carbonyl",
     "only the (S) enantiomer, because the ethyl group directs hydride to one face",
     "a meso compound, because the product has an internal mirror plane"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "exp": "The carbonyl carbon of 2-butanone is **sp² and trigonal planar**, and the molecule is achiral. NaBH₄ is also achiral, so hydride attack from the top face and the bottom face is equally likely. One face gives (R)-2-butanol and the other gives (S)-2-butanol in equal amounts: a **racemic mixture** with no optical rotation.\n\nGetting a single enantiomer needs a chiral reagent, catalyst or enzyme; with an achiral reagent neither face is favored, because the two faces are mirror images of each other (enantiotopic).\nA meso compound needs at least two stereocenters; 2-butanol has only one.",
    "id": "cp_half_6_sa2"
   },
   {
    "q": "Ethyl acetate is heated with aqueous sodium hydroxide until the ester is consumed. What are the products?",
    "choices": [
     "Sodium acetate and ethanol",
     "Acetic acid and sodium ethoxide",
     "Acetaldehyde and ethanol",
     "Sodium ethoxide and acetaldehyde"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "exp": "This is **saponification** (base-promoted ester hydrolysis). Hydroxide attacks the carbonyl carbon, the tetrahedral intermediate expels ethoxide, and the acid–base step that follows is fast and irreversible: ethoxide (or hydroxide) removes the acidic proton from acetic acid. The products are the **carboxylate salt, sodium acetate, and ethanol**.\n\nAcetic acid cannot survive in excess NaOH, and ethoxide (conjugate base of an alcohol, pKa ≈ 16) would be protonated by water or acetic acid.\nAcetaldehyde would require a reduction; hydrolysis does not change oxidation states.",
    "id": "cp_half_6_sa3"
   },
   {
    "q": "An isomerase reaction has an equilibrium constant K′ of 10 at 37°C. What is ΔG°′ for the reaction? (R = 8.3 J·mol⁻¹·K⁻¹; ln 10 ≈ 2.3)",
    "choices": [
     "−0.71 kJ/mol",
     "−2.6 kJ/mol",
     "−5.9 kJ/mol",
     "+5.9 kJ/mol"
    ],
    "ans": 2,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biochemistry",
    "exp": "Use **ΔG°′ = −RT ln K′** with T in kelvin (37 + 273 = 310 K):\nRT = 8.3 × 310 ≈ 2,570 J/mol ≈ 2.6 kJ/mol.\nΔG°′ = −2.6 kJ/mol × 2.3 ≈ **−5.9 kJ/mol**. K′ > 1 means products are favored, so ΔG°′ must be negative.\n\n**+5.9 kJ/mol** drops the minus sign.\n**−2.6 kJ/mol** uses log₁₀ 10 = 1 instead of ln 10 = 2.3.\n**−0.71 kJ/mol** uses 37 instead of 310 K for the temperature.",
    "id": "cp_half_6_sa4"
   },
   {
    "q": "On the phase diagram of water, the line separating the solid and liquid regions has a slightly negative slope, so ice melts at a lower temperature when the pressure is raised. Which statement best explains this feature?",
    "choices": [
     "Ice is denser than liquid water, so higher pressure favors the solid.",
     "Melting is exothermic, so higher pressure favors the liquid.",
     "Hydrogen bonds cannot form at high pressure, so higher pressure favors the liquid.",
     "Ice is less dense than liquid water, so higher pressure favors the liquid."
    ],
    "ans": 3,
    "cat": "5E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "exp": "Along the solid–liquid line, ice and water are in equilibrium. Raising the pressure shifts that equilibrium toward the phase that takes up **less volume** (the denser phase). Ice's open, hydrogen-bonded lattice makes it **less dense** than liquid water, so pressure favors the liquid and the melting point drops as pressure rises: the line tilts to the left. For most substances the solid is denser, and the line slopes the other way.\n\n**Ice denser than water** is the reverse of the real case; it would give a positive slope, as for most substances.\n**Melting is endothermic**, not exothermic: heat must be added to break hydrogen bonds. The direction of the slope here comes from the volume change.\n**Hydrogen bonds** still form at high pressure, in liquid water and in the dense high-pressure forms of ice.",
    "id": "cp_half_6_sa5"
   },
   {
    "q": "A patient-warming device uses a 100-W heater to warm 500 g of water from 20°C to 40°C. If all of the heater's output goes into the water, about how long does this take? (Specific heat of water = 4.2 J·g⁻¹·°C⁻¹)",
    "choices": [
     "1.7 min",
     "7.0 min",
     "70 min",
     "420 min"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "physics",
    "exp": "Heat needed: **q = mcΔT** = 500 g × 4.2 J/(g·°C) × 20°C = **42,000 J**.\nTime = energy ÷ power = 42,000 J ÷ 100 J/s = 420 s = **7.0 min**.\n\n**420 min** is the answer in seconds labeled as minutes.\n**70 min** is a factor-of-10 slip in the arithmetic.\n**1.7 min** uses a specific heat of 1.0 J/(g·°C) (confusing the 1 cal/(g·°C) value with joules), giving 10,000 J and 100 s.",
    "id": "cp_half_6_sa6"
   },
   {
    "id": "cp_half_6_sa7b",
    "q": "Strontium-89, used to relieve bone pain from cancer, has a half-life of 50 days. What percentage of a dose remains 200 days after it is given?",
    "choices": [
     "25%",
     "12.5%",
     "6.25%",
     "3.1%"
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "exp": "200 days ÷ 50 days = 4 half-lives, and (½)⁴ = 1/16 = 6.25% remains.\n25% stops after 2 half-lives.\n12.5% stops after 3 half-lives.\n3.1% counts 5 half-lives."
   },
   {
    "q": "What is the pH of a 0.010 M solution of a weak acid HA with Ka = 1.0 × 10⁻⁶?",
    "choices": [
     "2.0",
     "3.0",
     "4.0",
     "6.0"
    ],
    "ans": 2,
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "exp": "For a weak acid that dissociates only slightly, **[H⁺] ≈ √(Ka × C)**:\n[H⁺] = √(1.0 × 10⁻⁶ × 1.0 × 10⁻²) = √(1.0 × 10⁻⁸) = 1.0 × 10⁻⁴ M, so **pH = 4.0**. (Only 1% of the acid dissociates, so the approximation holds.)\n\n**2.0** treats HA as a strong acid ([H⁺] = 0.010 M).\n**3.0** takes √Ka and leaves out the concentration.\n**6.0** is the pKa, the pH only when [HA] = [A⁻], as in a half-neutralized buffer.",
    "id": "cp_half_6_sa8"
   },
   {
    "q": "A histology lab projects a microscope slide onto a wall screen with a single lens (f = 10 cm) placed 15 cm from the slide. How far from the lens must the screen be, and how does the projected picture compare with the slide?",
    "choices": [
     "30 cm; inverted and twice as large",
     "30 cm; upright and twice as large",
     "6.0 cm; inverted and 0.4 times as large",
     "6.0 cm; upright and 0.4 times as large"
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "exp": "Thin-lens equation: **1/f = 1/o + 1/i**.\n1/i = 1/10 − 1/15 = 3/30 − 2/30 = 1/30, so **i = +30 cm**.\nA positive image distance means a **real** image on the far side of the lens, which is why it can be caught on a screen. Magnification m = −i/o = −30/15 = **−2**: the picture is **inverted** and twice as large.\n\n**6.0 cm** adds the reciprocals (1/10 + 1/15 = 1/6) instead of subtracting; 0.4 is then −6/15 with the sign handled loosely.\n**Upright** would need a virtual image, which a converging lens forms only when the object is inside the focal length (o < 10 cm), and a virtual image cannot be projected onto a screen.",
    "id": "cp_half_6_sa9"
   },
   {
    "q": "When a protein folds, nonpolar side chains such as those of valine and phenylalanine become buried in its core. This burial is favorable mainly because it:",
    "choices": [
     "releases ordered water molecules from around the side chains, increasing the entropy of the solvent.",
     "allows the nonpolar side chains to form hydrogen bonds with one another in the core.",
     "decreases the entropy of the polypeptide chain, which makes folding more favorable.",
     "allows the nonpolar side chains to form ionic bonds with one another in the core."
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "exp": "This is the **hydrophobic effect**. Water can't hydrogen-bond to a nonpolar surface, so the water molecules next to an exposed nonpolar side chain are held in an ordered, cage-like layer. Burying the side chains removes that surface and frees the ordered water, so the **entropy of the solvent rises**, which makes ΔG for folding more negative. Dispersion forces among the tightly packed side chains help, but the main driving force is this entropy gain.\n\nNonpolar side chains have no O–H or N–H groups, so they can't form **hydrogen bonds**.\nThe chain's own **entropy does decrease** on folding, but that opposes folding (−TΔS becomes positive); it doesn't drive it.\nNonpolar side chains carry **no charge**, so they can't form ionic bonds.",
    "id": "cp_half_6_sa10"
   }
  ]
 }
];
