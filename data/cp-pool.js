// Chem/Phys daily quizzes: six original half-sections in the AAMC layout (P P [4] P P P [4]: 5 passages with 22
// questions + 8 stand-alones, 30 in all), for the Section Mastery end-of-day test. Every question is a twin of one studied
// card (`twin`: the card's src). Map: tools/twin-map.json. Each question asks its AAMC question the AAMC way (same stem
// pattern and choices; only names and numbers changed), and each passage follows its AAMC passage's structure in new words.
const CP_POOL = [
  {
    "id": "cp_half_1",
    "title": "Chem/Phys Quiz 1",
    "order": [
      "p_cpq1_1",
      "p_cpq1_2",
      4,
      "p_cpq1_3",
      "p_cpq1_4",
      "p_cpq1_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq1_1",
        "figures": [{"type":"svg","caption":"Figure 1 The fibrinogen bond cleaved by thrombin","alt":"The sequence Val–Arg–Gly–Pro from N- to C-terminal side, with an arrow marking the Arg–Gly bond as the cleavage site.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 150' width='560' height='150' font-family='sans-serif' font-size='20'><text x='265' y='22' text-anchor='middle' fill='#b45309'>Cleavage site</text><path d='M265 30V56M257 48L265 58L273 48' fill='none' stroke='#b45309' stroke-width='3'/><path d='M45 85H510' stroke='#333' stroke-width='3'/><path d='M265 66V104' stroke='#b45309' stroke-width='3' stroke-dasharray='5 4'/><g fill='#fff' stroke='#333' stroke-width='2'><rect x='60' y='65' width='80' height='40' rx='8'/><rect x='170' y='65' width='80' height='40' rx='8'/><rect x='280' y='65' width='80' height='40' rx='8'/><rect x='390' y='65' width='80' height='40' rx='8'/></g><g text-anchor='middle' fill='#111'><text x='25' y='92'>…</text><text x='100' y='92'>Val</text><text x='210' y='92'>Arg</text><text x='320' y='92'>Gly</text><text x='430' y='92'>Pro</text><text x='530' y='92'>…</text></g><text x='20' y='138' font-size='18' fill='#444'>N-terminal side</text><text x='540' y='138' font-size='18' fill='#444' text-anchor='end'>C-terminal side</text></svg>"}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5E",
          "5B",
          "5A",
          "5D"
        ],
        "title": "Thrombin and a Transition-State Analog Inhibitor",
        "passage": "Thrombin is an example of a serine protease, an enzyme that uses a serine side chain to cleave a peptide bond. Because thrombin is a relatively small enzyme that can be expressed in rapidly growing cultured cells, it became a target for structure-based design of anticoagulants. The part of fibrinogen that thrombin cleaves is shown in Figure 1 (described: the sequence …–Val–Arg–Gly–Pro–…, with the bond between Arg and the Gly on its C-terminal side marked as the cleavage site). Working from models of the thrombin active site, researchers designed and made transition-state analogs. One of them is Compound 2, a potent thrombin inhibitor that has seven stereogenic carbons and no internal mirror plane (Figure 2, described: a fused ring system bearing seven stereocenters). Compound 2 has an in vivo half-life of 2.4 h and is cleared mainly by a liver cytochrome P450 enzyme. Its major metabolite forms when that enzyme removes alkyl groups from the nitrogens of its ring system (Reaction 1). Blood samples drawn for testing are kept from clotting in another way: tubes containing potassium oxalate remove free Ca²⁺ as calcium oxalate, CaC₂O₄ (Ksp = 2.3 × 10⁻⁹), because the plasma holds 1.2 × 10⁻³ M Ca²⁺ and the oxalate reaches 5.0 × 10⁻³ M. Researchers used what they knew of the thrombin active site, and of the pathways that break down Compound 2, to make derivatives with greater potency and a longer half-life.",
        "questions": [
          {
            "q": "Compound 2 is used to prevent blood clotting based on its ability to act as:",
            "choices": [
              "an agonist.",
              "an antagonist.",
              "a placebo.",
              "a catalyst."
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "sample-cp:1",
            "exp": "1. Compound 2 occupies thrombin's active site and stops fibrin from forming.\n2. It is recovered unchanged and does not activate anything: it blocks.\n3. A molecule that binds and blocks is an antagonist; an agonist activates, a placebo has no action, and a catalyst speeds a reaction.\n**Rule to reuse:** binds and blocks = antagonist; binds and activates = agonist.",
            "id": "p_cpq1_1_q1"
          },
          {
            "q": "How many stereoisomers of Compound 2 exist?",
            "choices": [
              "16",
              "32",
              "64",
              "128"
            ],
            "ans": 3,
            "cat": "5B",
            "skill": "SIRS 2",
            "diff": "M",
            "subj": "organic_chem",
            "twin": "sample-cp:2",
            "exp": "1. Compound 2 has seven stereogenic carbons and no internal mirror plane.\n2. Each stereocenter doubles the count: 2⁷ = 128.\n**Rule to reuse:** with no mirror plane, n stereocenters give 2ⁿ stereoisomers.",
            "id": "p_cpq1_1_q2"
          },
          {
            "q": "Why does solid calcium oxalate form in blood drawn into tubes treated with potassium oxalate?",
            "choices": [
              "[Ca²⁺] + [C₂O₄²⁻] > Ksp",
              "[Ca²⁺][C₂O₄²⁻] > Ksp",
              "[Ca²⁺] + [C₂O₄²⁻] < Ksp",
              "[Ca²⁺][C₂O₄²⁻] < Ksp"
            ],
            "ans": 1,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "sample-cp:3",
            "exp": "1. A salt precipitates when its ion product Q exceeds Ksp.\n2. Q = [Ca²⁺][C₂O₄²⁻] = (1.2 × 10⁻³)(5.0 × 10⁻³) = 6.0 × 10⁻⁶, far above 2.3 × 10⁻⁹.\n3. Ksp is compared with a product of concentrations, never a sum.\n**Rule to reuse:** Q = product of the ion concentrations; Q > Ksp precipitates.",
            "id": "p_cpq1_1_q3"
          },
          {
            "q": "The peptide bond between which two amino acid residues is cleaved by thrombin?",
            "choices": [
              "Arg and Ala",
              "Gly and Val",
              "Val and Ala",
              "Arg and Gly"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "sample-cp:4",
            "exp": "1. The passage says thrombin cuts on the C-terminal side of Arg, at Arg–Gly bonds in fibrinogen.\n2. The bond cleaved joins Arg and Gly.\n**Rule to reuse:** the C-terminal side of X is the bond between X and the next residue.",
            "id": "p_cpq1_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq1_2",
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4C",
          "4D",
          "4A"
        ],
        "title": "Testing an Electric Airport Shuttle",
        "passage": "A 70 kg engineer stands inside a 500 kg electric shuttle that is towed by a tractor. For tests, the engineer carries a ball, a string, a 440 nm wavelength laser, a converging lens, a 250 mF capacitor, and some 24 V, 60 W lamps; each photon from the laser carries energy E = hf = hc/λ. The ball and string can be joined to make a pendulum of mass m and length ℓ. After the tractor releases the shuttle, two systems are available to slow it. The first system connects a generator to the shuttle's wheels to charge the shuttle's 24.0 V battery. Engaging the generator at 12 m/s puts a decelerating force of 900 N on the shuttle, and the force declines linearly with speed. The generator transfers about 75% of the kinetic energy removed by this braking force to the battery. The second system lets the engineer slow the shuttle by pressing friction pads against its wheels, much like the brakes on a car. This system can supply a maximum braking force of 3000 N. Rolling friction of the wheels and friction in the axles contribute a continuous 750 N decelerating force any time the shuttle is moving. A stationary horn beside the track sounds at frequency f as the shuttle passes it. (Note: Use g = 10 m/s² and c = 3.0 × 10⁸ m/s, if needed.)",
        "questions": [
          {
            "q": "What is the total amount of charge and energy, respectively, that the capacitor will store if it is connected to the battery on the shuttle?",
            "choices": [
              "0.25 C and 144 J",
              "6.0 C and 72 J",
              "144 C and 0.25 J",
              "72 C and 6.0 J"
            ],
            "ans": 1,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe3-cp:5",
            "exp": "1. Once charged, no current flows, so the capacitor sits at the full 24.0 V.\n2. Q = CV = (0.250 F)(24.0 V) = 6.0 C.\n3. U = ½CV² = ½(0.250)(24.0)² = 72 J.\n**Rule to reuse:** Q = CV and U = ½CV², with C in farads.",
            "id": "p_cpq1_2_q1"
          },
          {
            "q": "Suppose that the shuttle passes by a horn that is emitting a sound with frequency f. Which of the following describes the frequency f′ that the microphone on the shuttle records?",
            "choices": [
              "f′ > f before passing the horn, f′ < f after passing it",
              "f′ < f before passing the horn, f′ > f after passing it",
              "f′ = f before passing the horn, f′ = f after passing it",
              "f′ > f before passing the horn, f′ > f after passing it"
            ],
            "ans": 0,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe3-cp:6",
            "exp": "1. Before passing, the shuttle closes in on the horn: f′ > f.\n2. After passing, it moves away: f′ < f.\n**Rule to reuse:** closing in raises f′; separating lowers it.",
            "id": "p_cpq1_2_q2"
          },
          {
            "q": "If no braking occurs, a total of how much power would be required to keep the shuttle moving at 12 m/s?",
            "choices": [
              "3.6 kW",
              "9.0 kW",
              "36 kW",
              "72 kW"
            ],
            "ans": 1,
            "cat": "4A",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe3-cp:7",
            "exp": "1. At constant speed the motors push with the 750 N of drag and friction.\n2. P = Fv = 750 N × 12 m/s = 9000 W = 9.0 kW.\n**Rule to reuse:** at constant speed, power = resisting force × speed.",
            "id": "p_cpq1_2_q3"
          },
          {
            "q": "If the energy of a photon is tripled, which of the following properties of the photon will also triple?",
            "choices": [
              "Amplitude",
              "Wavelength",
              "Frequency",
              "Intensity"
            ],
            "ans": 2,
            "cat": "4D",
            "skill": "SIRS 4",
            "diff": "X",
            "twin": "pe5-cp:54",
            "exp": "1. E = hf, so tripling E triples f.\n2. Wavelength drops to one-third (λ = c/f); amplitude and intensity describe a beam, not one photon's energy.\n**Rule to reuse:** photon energy is proportional to frequency and inversely proportional to wavelength.",
            "id": "p_cpq1_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq1_3",
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5E",
          "4E",
          "4B"
        ],
        "title": "Preparing Lithium Carbonate in Six Steps",
        "passage": "A chemist prepared Li₂CO₃(s) using the following steps.\n\nStep 1: The chemist placed a sample of silver carbonate, Ag₂CO₃(s), into a sealed chamber and heated it to 400 K to try to generate CO₂(g) and Ag₂O(s); no CO₂(g) formed. For this decomposition, ΔH° = +81 kJ/mol and ΔS° = +168 J/(mol·K).\n\nStep 2: The chemist added 96 g of LiOH(s) (M = 24 g/mol) to H₂O to obtain LiOH(aq).\n\nStep 3: The chemist bubbled CO₂(g) from a cylinder through the LiOH(aq) from Step 2.\n\nLiOH(aq) + CO₂(aq) → Li⁺(aq) + HCO₃⁻(aq)   Reaction 1\n\nStep 4: The chemist added more LiOH(aq), which removed the proton from each HCO₃⁻ ion.\n\nHCO₃⁻(aq) + OH⁻(aq) → CO₃²⁻(aq) + H₂O(l)   Reaction 2\n\nStep 5: The chemist warmed the solution from Step 4, and Li₂CO₃(s) precipitated. The chemist filtered the solution, set aside the filtrate, and dried the precipitate in a vacuum chamber at room temperature (20°C).\n\nStep 6: The chemist heated enough Li₂CO₃(s) from Step 5 to produce 2 mol Li₂O(s) and 2 mol of a gas (Gas X). The chemist collected Gas X for further study.",
        "questions": [
          {
            "q": "Ag₂CO₃ does NOT decompose when heated to 400 K in Step 1 because, at 400 K, ΔH is:",
            "choices": [
              "positive and less than TΔS.",
              "positive and greater than TΔS.",
              "negative and less than TΔS.",
              "negative and greater than TΔS."
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:1",
            "exp": "1. ΔH = +81 kJ/mol; TΔS = 400 × 0.168 ≈ 67 kJ/mol.\n2. ΔH is positive and greater than TΔS, so ΔG = ΔH − TΔS > 0: no decomposition.\n**Rule to reuse:** no reaction means ΔG > 0, which means ΔH > TΔS (ΔS in kJ first).",
            "id": "p_cpq1_3_q1"
          },
          {
            "q": "When silver carbonate is heated during Step 1, an equilibrium is established. Which of the following expressions is the equilibrium constant for the decomposition of Ag₂CO₃?",
            "choices": [
              "[Ag₂O]",
              "[Ag₂CO₃]",
              "[CO₂]",
              "[Ag₂O] × [Ag₂CO₃]"
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe4-cp:2",
            "exp": "1. Ag₂CO₃(s) ⇌ Ag₂O(s) + CO₂(g).\n2. Pure solids are left out of K, so only CO₂ remains: K = [CO₂].\n**Rule to reuse:** K contains only gases and dissolved species.",
            "id": "p_cpq1_3_q2"
          },
          {
            "q": "During Reaction 2, did the oxidation state of C change?",
            "choices": [
              "Yes; it changed from +4 to +3.",
              "Yes; it changed from 0 to +1.",
              "No; it remained at +4.",
              "No; it remained at +1."
            ],
            "ans": 2,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:3",
            "exp": "1. In HCO₃⁻: 1 + C − 6 = −1, so C = +4.\n2. In CO₃²⁻: C − 6 = −2, so C = +4.\n3. Only H⁺ moved, so C stayed at +4.\n**Rule to reuse:** a proton transfer changes no oxidation state.",
            "id": "p_cpq1_3_q3"
          },
          {
            "q": "If all of Gas X (from Step 6) is held in a sealed chamber at STP, what will be its approximate volume?",
            "choices": [
              "22.4 L",
              "44.8 L",
              "67.2 L",
              "89.6 L"
            ],
            "ans": 1,
            "cat": "4B",
            "skill": "SIRS 3",
            "diff": "X",
            "twin": "pe4-cp:4",
            "exp": "1. Step 6 makes Li₂O and Gas X from Li₂CO₃: Gas X is CO₂, 2 mol of it.\n2. At STP: 2 × 22.4 L = 44.8 L.\n**Rule to reuse:** V(STP) = moles of gas × 22.4 L/mol.",
            "id": "p_cpq1_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq1_4",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "4B",
          "5C",
          "5E"
        ],
        "title": "Compound 4 as an Inhibitor of Enzyme T",
        "passage": "Compound 4, a six-membered carbon ring with one external oxygen on the ring and a basic side chain, was found to be an inhibitor of Enzyme T, a tetrameric bacterial kinase. Compound 4 is made from the liquid C₆H₁₂O, whose IR spectrum shows a strong band at 1718 cm⁻¹ but no band near 2720 cm⁻¹ and none from 3200 to 3600 cm⁻¹. In one step of the synthesis, a 2 : 1 mixture of H₂(g) and O₂(g) reacts completely at 450 K (Reaction 1).\n\n2H₂(g) + O₂(g) → 2H₂O(g)   Reaction 1\n\nCompound 4 is obtained from a neutral, lipophilic precursor with log P (octanol/water) = 2.2. This precursor was isolated from the crude product through an extraction that mixed an aqueous suspension with ethyl acetate. After acid hydrolysis, Compound 4 was purified on a column containing a strongly basic stationary phase. Mass spectrometry of the product showed one major peak, attributable to a complex between Na⁺ and Compound 4. Membranes containing Enzyme T were prepared, and the specific activity of pure Enzyme T was found to be 1500 μmol phosphate·h⁻¹·(mg enzyme)⁻¹ at 37°C. The ability of Compound 4 to inhibit Enzyme T was found by measuring the specific activity of Enzyme T at various Compound 4 concentrations (Figure 1). When those inhibition data were fitted with a Hill function, the resulting coefficient was 2.3.",
        "figure": {
          "type": "line",
          "caption": "Figure 1 Activity of Enzyme T versus concentration of Compound 4",
          "x": {
            "label": "log₁₀([Compound 4] / μM)",
            "min": -1,
            "max": 2,
            "step": 0.5
          },
          "y": {
            "label": "Activity (% of uninhibited)",
            "min": 0,
            "max": 100,
            "step": 20
          },
          "series": [
            {
              "name": "Enzyme T",
              "marker": "circle",
              "line": "smooth",
              "points": [
                [
                  -1,
                  98
                ],
                [
                  -0.5,
                  94
                ],
                [
                  0,
                  83
                ],
                [
                  0.5,
                  61
                ],
                [
                  0.7,
                  50
                ],
                [
                  1,
                  33
                ],
                [
                  1.5,
                  14
                ],
                [
                  2,
                  5
                ]
              ]
            }
          ]
        },
        "questions": [
          {
            "q": "What is the name of the functional group containing the external oxygen on the ring of Compound 4?",
            "choices": [
              "Aldehyde",
              "Carboxylic acid",
              "Ester",
              "Ketone"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "subj": "organic_chem",
            "twin": "pe5-cp:36",
            "exp": "1. One O and a C=O band at 1718 cm⁻¹.\n2. No C–H band near 2720 cm⁻¹ (not an aldehyde) and no O–H (not an acid); one O can't make an ester.\n3. So the group is a ketone.\n**Rule to reuse:** C=O with no aldehyde C–H, no O–H and one O = ketone.",
            "id": "p_cpq1_4_q1"
          },
          {
            "q": "Based on Reaction 1, when 3.0 atm of the H₂/O₂ mixture completely reacts to form water at 450 K in a sealed container, what is the final pressure in the container?",
            "choices": [
              "0.0 atm",
              "1.0 atm",
              "1.5 atm",
              "2.0 atm"
            ],
            "ans": 3,
            "cat": "4B",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "pe5-cp:37",
            "exp": "1. 2 H₂ + O₂ → 2 H₂O: 3 mol gas → 2 mol gas, and water stays a gas at 450 K.\n2. P = 3.0 atm × 2/3 = 2.0 atm.\n**Rule to reuse:** at fixed V and T, P scales with the moles of gas.",
            "id": "p_cpq1_4_q2"
          },
          {
            "q": "In which phase(s) will the Compound 4 precursor be predominantly found after the extraction step? The precursor will:",
            "choices": [
              "be found in the aqueous layer.",
              "be found in the ethyl acetate layer.",
              "be distributed equally between the two layers.",
              "form a precipitate between the two layers."
            ],
            "ans": 1,
            "cat": "5C",
            "skill": "SIRS 2",
            "diff": "M",
            "subj": "organic_chem",
            "twin": "pe5-cp:38",
            "exp": "1. The precursor is neutral and lipophilic, with log P = 2.2: about 160 times more soluble in the organic phase.\n2. It will be found in the ethyl acetate layer.\n**Rule to reuse:** neutral, positive log P → organic layer; charged → aqueous layer.",
            "id": "p_cpq1_4_q3"
          },
          {
            "q": "Based on Figure 1, what is the approximate Ki of Compound 4?",
            "choices": [
              "0.7 μM",
              "5 μM",
              "7 μM",
              "50 μM"
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 3",
            "diff": "X",
            "twin": "pe5-cp:39",
            "exp": "1. Ki is read where Enzyme T's activity falls to half.\n2. On Figure 1, 50% activity sits at log₁₀([Compound 4]/μM) = 0.7, and 10⁰·⁷ ≈ 5 μM.\n**Rule to reuse:** read Ki at 50% activity, then undo the log axis.",
            "id": "p_cpq1_4_q4"
          },
          {
            "q": "Based on the reported Hill coefficient, in what way does Compound 4 affect inhibition?",
            "choices": [
              "As one molecule of Compound 4 binds to Enzyme T, it makes it easier for the others to bind, leading to inhibition.",
              "As one molecule of Compound 4 binds to Enzyme T, it makes it more difficult for the others to bind, leading to inhibition.",
              "A single molecule of Compound 4 binds to Enzyme T, leading to inhibition.",
              "Molecules of Compound 4 randomly bind to Enzyme T, leading to inhibition."
            ],
            "ans": 0,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:40",
            "exp": "1. The Hill coefficient for inhibition is 2.3, greater than 1.\n2. n > 1 means positive cooperativity: each bound inhibitor makes the next bind more easily.\n**Rule to reuse:** Hill n > 1 easier (positive), n = 1 independent, n < 1 harder (negative).",
            "id": "p_cpq1_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq1_5",
        "figures": [{"caption":"Table 1 Native gel of the labeling reaction (protein stain and UV fluorescence)","columns":["Lane","Sample","Bands (protein stain)","Fluorescent under UV"],"rows":[["1","Enzyme before reaction","Upper band","None"],["2","Crude reaction mixture","Upper (unlabeled) and middle (labeled) bands, equal stain","Middle band and dye front"],["3","First band from chromatography","Upper band only","None"],["4","Second band from chromatography","Middle band only","Middle band"]]}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5A",
          "4E"
        ],
        "title": "Attaching a Fluorescent Dye to Enzyme K",
        "passage": "Researchers wished to label Enzyme K without altering its function so that it could be followed by fluorescence spectroscopy. They chose Dye 1, which reacts with amine and sulfhydryl groups under mildly alkaline conditions to attach Dye 2 to the protein (Reaction 1). Dye 2 is orange and fluorescent (λ for excitation is 488 nm; λ for emission is 530 nm). The 50 kDa enzyme was dissolved in 0.100 M Tris buffer (Tris, 121.1 g/mol) to a final concentration of 6.0 mg/mL. Dye 1 (12 mg) was dissolved in 0.50 mL of 1.0 M aqueous sodium bicarbonate. The solutions of enzyme (2.0 mL) and Dye 1 (0.50 mL) were mixed and allowed to react for 10 minutes. The reaction was stopped by adding an excess of ethanolamine. The enzyme was purified using anion exchange chromatography. The stages of the reaction were analyzed by native gel electrophoresis, viewed under UV light and then stained for protein (Table 1: Lane 1, enzyme before reaction, one upper band, no fluorescence; Lane 2, crude reaction mixture, an upper unlabeled band and a middle labeled band that stain equally, with the middle band and the dye front fluorescent; Lane 3, first band from chromatography, upper band only; Lane 4, second band from chromatography, middle band only, fluorescent). The labeled enzyme was then verified to have retained its function.",
        "questions": [
          {
            "q": "What is the approximate amount of unreacted Enzyme K after the labeling reaction was stopped?",
            "choices": [
              "0%",
              "25%",
              "50%",
              "75%"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:33",
            "exp": "1. In Lane 2 (crude mixture), the unlabeled upper band and the labeled middle band stain equally.\n2. Equal stain means equal protein, so about 50% is unreacted.\n**Rule to reuse:** each band's share of the stain is its share of the protein.",
            "id": "p_cpq1_5_q1"
          },
          {
            "q": "Which two residues in Enzyme K are capable of the labeling reaction?",
            "choices": [
              "Asp and Glu",
              "Ser and Thr",
              "Lys and Cys",
              "Asn and Gln"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "E",
            "subj": "organic_chem",
            "twin": "pe6-cp:34",
            "exp": "1. Dye 1 reacts with amine and sulfhydryl groups.\n2. Lys carries –NH₂ and Cys carries –SH.\n**Rule to reuse:** match the reagent's target group to the side chain: amine Lys, thiol Cys, alcohol Ser/Thr.",
            "id": "p_cpq1_5_q2"
          },
          {
            "q": "What is the mass of Tris contained in 1.0 L of the labeling buffer?",
            "choices": [
              "1.2 g",
              "6.1 g",
              "12 g",
              "24 g"
            ],
            "ans": 2,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "pe6-cp:35",
            "exp": "1. 0.100 M × 1.0 L = 0.100 mol Tris.\n2. 0.100 mol × 121.1 g/mol ≈ 12 g.\n**Rule to reuse:** mass = molarity × liters × molar mass.",
            "id": "p_cpq1_5_q3"
          },
          {
            "q": "What is the total number of moles of Enzyme K used in the labeling reaction described in the passage?",
            "choices": [
              "2 mmol",
              "24 μmol",
              "0.24 μmol",
              "24 nmol"
            ],
            "ans": 2,
            "cat": "4E",
            "skill": "SIRS 3",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "pe6-cp:36",
            "exp": "1. 2.0 mL × 6.0 mg/mL = 12 mg.\n2. 12 mg ÷ 50 kDa = 0.24 μmol.\n**Rule to reuse:** moles of protein = (mg/mL × mL) ÷ kDa, in μmol.",
            "id": "p_cpq1_5_q4"
          },
          {
            "q": "Based on the passage, what is the most likely site of labeling of Enzyme K?",
            "choices": [
              "Near the active site or binding domain",
              "At the carboxyl terminus",
              "On a surface-exposed residue",
              "On an interior residue in a hydrophobic domain"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe6-cp:37",
            "exp": "1. The labeled enzyme kept its function, so the label is not near the active site or binding domain.\n2. Dye 1 reacted with the folded enzyme, so the residue it labeled is exposed to solvent.\n**Rule to reuse:** function kept and no unfolding needed = surface-exposed site.",
            "id": "p_cpq1_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "What is the net charge of the peptide Lys–Gly–Val–Ile at pH 8?",
        "choices": [
          "−1",
          "0",
          "+1",
          "+2"
        ],
        "ans": 2,
        "cat": "5D",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "biochemistry",
        "twin": "sample-cp:17",
        "exp": "1. At pH 8 the N-terminal +1 and C-terminal −1 cancel.\n2. Lys side chain (pKa ≈ 10.5) is +1; Gly, Val and Ile have none.\n3. Net +1.\n**Rule to reuse:** add the side-chain charges at the given pH; the termini cancel.",
        "id": "cp_q1_sa1"
      },
      {
        "q": "Hyperopia is a condition of the eye where the crystalline lens focuses the light rays to a position behind the retina. To correct for this condition, a thin lens is placed in front of the eye that will help to focus light on the retina. The type of lens required is:",
        "choices": [
          "cylindrical.",
          "converging.",
          "diverging.",
          "spherical."
        ],
        "ans": 1,
        "cat": "4D",
        "skill": "SIRS 1",
        "diff": "E",
        "subj": "physics",
        "twin": "sample-cp:43",
        "exp": "1. The focus falls behind the retina, so the eye needs more converging power.\n2. A converging lens moves the focus forward onto the retina.\n**Rule to reuse:** focus behind the retina → converging; in front of it → diverging.",
        "id": "cp_q1_sa2"
      },
      {
        "q": "The equilibrium AgBr(s) ⇌ Ag⁺(aq) + Br⁻(aq) exists in a saturated aqueous solution of AgBr. Dissolution of NaBr in a saturated aqueous AgBr solution would:",
        "choices": [
          "have no effect on the position of this equilibrium.",
          "shift this equilibrium left.",
          "shift this equilibrium right.",
          "shift this equilibrium first right and then left."
        ],
        "ans": 1,
        "cat": "5A",
        "skill": "SIRS 4",
        "diff": "X",
        "subj": "gen_chem",
        "twin": "pe1-cp:57",
        "exp": "1. NaBr adds Br⁻, a common ion, so Q > Ksp.\n2. The equilibrium shifts left and AgBr precipitates.\n**Rule to reuse:** adding a common ion shifts a solubility equilibrium left.",
        "id": "cp_q1_sa3"
      },
      {
        "q": "Which of the following molecules has an octahedral geometry?",
        "fig": [
          "cpd-bbr3",
          "cpd-pbr3"
        ],
        "choices": [
          "SeF₆",
          "CCl₄",
          "XeF₄",
          "ClF₃"
        ],
        "ans": 0,
        "cat": "5B",
        "skill": "SIRS 4",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "pe3-cp:57",
        "exp": "1. SeF₆: 6 bonds, 0 lone pairs → octahedral.\n2. CCl₄ is tetrahedral, XeF₄ square planar (2 lone pairs), ClF₃ T-shaped.\n**Rule to reuse:** octahedral needs 6 bonded atoms and no lone pairs on the center.",
        "id": "cp_q1_sa4"
      },
      {
        "q": "The transitions labeled 1–4 are several possible transitions between electron energy levels in a hydrogen atom: 1: n = 4→1, 2: n = 3→2, 3: n = 2→1, 4: n = 4→2. Which transition produces a photon with the longest wavelength?",
        "choices": [
          "Transition 1",
          "Transition 2",
          "Transition 3",
          "Transition 4"
        ],
        "ans": 1,
        "cat": "4E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe4-cp:28",
        "exp": "1. Gaps in hydrogen: 4→1 12.75 eV, 3→2 1.89 eV, 2→1 10.2 eV, 4→2 2.55 eV.\n2. λ = hc/ΔE, so the smallest gap (3→2) gives the longest wavelength.\n**Rule to reuse:** smallest energy gap = longest wavelength.",
        "id": "cp_q1_sa5"
      },
      {
        "q": "Of the events listed, which occurs first during action potential generation?",
        "chart": {
          "type": "line",
          "caption": "Membrane potential during one action potential",
          "x": {
            "label": "Time (ms)",
            "min": 0,
            "max": 6,
            "step": 1
          },
          "y": {
            "label": "Membrane potential (mV)",
            "min": -100,
            "max": 40,
            "step": 20
          },
          "series": [
            {
              "name": "Vm",
              "marker": "circle",
              "line": "smooth",
              "points": [
                [
                  0,
                  -65
                ],
                [
                  1,
                  -65
                ],
                [
                  2,
                  -50
                ],
                [
                  2.5,
                  35
                ],
                [
                  3,
                  -10
                ],
                [
                  3.5,
                  -70
                ],
                [
                  4,
                  -78
                ],
                [
                  5,
                  -70
                ],
                [
                  6,
                  -65
                ]
              ]
            }
          ]
        },
        "choices": [
          "Voltage-gated sodium channels open at the axon hillock.",
          "Depolarization stimulates the opening of voltage-gated potassium channels.",
          "Graded potentials propagate along the dendrites.",
          "Calcium influx triggers vesicle fusion."
        ],
        "ans": 2,
        "cat": "4C",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "biology",
        "twin": "pe4-cp:58",
        "exp": "1. Graded potentials travel along the dendrites and soma to the hillock first.\n2. Only then do Na⁺ channels open at the hillock, then K⁺ channels; Ca²⁺ influx happens later, at the terminal.\n**Rule to reuse:** graded potentials → Na⁺ in at the hillock → K⁺ out → Ca²⁺ in at the terminal.",
        "id": "cp_q1_sa6"
      },
      {
        "q": "A major obstacle to reproducing stellar fusion on Earth is reaching the very high temperatures required for fusion. The reason such high temperatures are required is to:",
        "choices": [
          "eliminate the strong nuclear force.",
          "remove electrical charge from reactants so they no longer repel one another.",
          "increase the density of the fuel.",
          "enable reactants to approach within range of the strong nuclear force."
        ],
        "ans": 3,
        "cat": "4E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe5-cp:26",
        "exp": "1. Nuclei are positive and repel; only very fast nuclei get close enough.\n2. Within about 10⁻¹⁵ m, the strong force binds them.\n3. Heat cannot remove nuclear charge or switch off the strong force.\n**Rule to reuse:** fusion needs high T so nuclei overcome Coulomb repulsion and reach the strong force's range.",
        "id": "cp_q1_sa7"
      },
      {
        "q": "Partial hydrolysis of a tripeptide yielded a mixture of 2 amino acids, valine (Val) and serine (Ser), and 2 dipeptides, Ser–Val and Val–Ser. Which of the following could be the structure of the tripeptide?",
        "choices": [
          "Val–Val–Ser",
          "Val–Ser–Ser",
          "Ser–Val–Val",
          "Ser–Val–Ser"
        ],
        "ans": 3,
        "cat": "5D",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "organic_chem",
        "twin": "pe6-cp:25",
        "exp": "1. The tripeptide must contain both Ser–Val and Val–Ser as neighbor pairs.\n2. Ser–Val–Ser gives Ser–Val and Val–Ser.\n**Rule to reuse:** overlap the dipeptides on a shared residue, keeping each written N → C.",
        "id": "cp_q1_sa8"
      }
    ]
  },
  {
    "id": "cp_half_2",
    "title": "Chem/Phys Quiz 2",
    "order": [
      "p_cpq2_1",
      "p_cpq2_2",
      4,
      "p_cpq2_3",
      "p_cpq2_4",
      "p_cpq2_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq2_1",
        "figures": [{"type":"svg","caption":"Figure 1 Circuit model of a short axon segment","alt":"Two rails of resistors stand for the fluid inside and outside the axon; each membrane patch joining them is a resistor Rm in parallel with a capacitor Cm.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 300' width='560' height='300' font-family='sans-serif' font-size='20'><g fill='none' stroke='#222' stroke-width='2.5'><path d='M20 60H230l5-10 10 20 10-20 10 20 10-20 10 20 10-20 10 20 5-10H540'/><path d='M20 240H230l5-10 10 20 10-20 10 20 10-20 10 20 10-20 10 20 5-10H540'/><path d='M140 60V100M110 100H170M110 100V115l10 5-20 10 20 10-20 10 20 10-20 10 20 10-10 5V200M170 100V145M152 145H188M152 157H188M170 157V200M110 200H170M140 200V240'/><path d='M420 60V100M390 100H450M390 100V115l10 5-20 10 20 10-20 10 20 10-20 10 20 10-10 5V200M450 100V145M432 145H468M432 157H468M450 157V200M390 200H450M420 200V240'/></g><text x='20' y='34'>Inside the axon</text><text x='270' y='38' text-anchor='middle'>r<tspan dy='5' font-size='18'>in</tspan></text><text x='270' y='222' text-anchor='middle'>r<tspan dy='5' font-size='18'>out</tspan></text><text x='95' y='158' text-anchor='end'>R<tspan dy='5' font-size='18'>m</tspan></text><text x='196' y='158'>C<tspan dy='5' font-size='18'>m</tspan></text><text x='375' y='158' text-anchor='end'>R<tspan dy='5' font-size='18'>m</tspan></text><text x='476' y='158'>C<tspan dy='5' font-size='18'>m</tspan></text><text x='285' y='155' text-anchor='middle' fill='#555'>Membrane</text><text x='20' y='288'>Outside the axon (extracellular fluid)</text></svg>"},{"type":"line","caption":"Figure 2 A typical action potential","x":{"label":"Time (ms)","min":0,"max":1.2,"step":0.2},"y":{"label":"Membrane potential (mV)","min":-100,"max":60,"step":20},"series":[{"name":"Inside of axon","points":[[0,-80],[0.1,-80],[0.2,-60],[0.3,-5],[0.4,35],[0.5,15],[0.6,-35],[0.7,-68],[0.8,-78],[0.9,-80],[1.0,-80],[1.2,-80]],"marker":"none"}]}],
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4C",
          "4E",
          "4A"
        ],
        "title": "The Electrical Properties of Peripheral Nerves",
        "passage": "The peripheral nervous system is another electrical system within the human body. Its basic electrical units are neurons, which come in three classes: sensory neurons, motor neurons, and interneurons. Every neuron has three main parts: the cell body, the axon, and the dendrites. The longest peripheral axons reach about 1.2 m, and the outer membrane of each axon is bathed in an extracellular aqueous solution of proteins and magnesium, potassium, and chloride ions. Table 1 and Figure 1 summarize the electrical properties of nonmyelinated and myelinated axons.\n\nFigure 1 models a short segment of axon as an electric circuit: resistors stand for the fluid inside and outside the axon, and each patch of membrane acts as a resistor in parallel with a capacitor.\n\nResearchers can study how neurons respond to a stimulus by inserting probes and recording the voltage change. Figure 2 shows a typical action potential: from a resting value of −80 mV, the inside of the axon rises to about +35 mV and returns to rest, the whole event lasting about 0.8 ms.\n\nA nerve conduction velocity (NCV) test uses these electrical properties to check for nerve damage. Two electrodes are placed on the patient's arm; a brief shock is delivered at one, and the nerve's response is recorded at the other. The pulse travels at a constant speed of 50 m/s.",
        "figure": {
          "caption": "Table 1 The electrical properties of axons",
          "columns": [
            "Property",
            "Nonmyelinated",
            "Myelinated"
          ],
          "rows": [
            [
              "Axon radius rA",
              "4 × 10⁻⁶ m",
              "4 × 10⁻⁶ m"
            ],
            [
              "Resistance per unit length of fluid inside and outside the axon rm",
              "5.1 × 10⁹ Ω/m",
              "5.1 × 10⁹ Ω/m"
            ],
            [
              "Conductivity per unit length of membrane σ",
              "1.1 × 10⁻⁴ (mΩ·m)⁻¹",
              "2.5 × 10⁻⁷ (mΩ·m)⁻¹"
            ],
            [
              "Capacitance per unit length Cm",
              "2.5 × 10⁻⁷ F/m",
              "7 × 10⁻¹⁰ F/m"
            ],
            [
              "Thickness of membrane or myelin t",
              "6 × 10⁻⁹ m",
              "1.5 × 10⁻⁶ m"
            ]
          ]
        },
        "questions": [
          {
            "q": "Which image best illustrates the electric field lines between the inside of an axon and the surrounding extracellular fluid?",
            "choices": [
              "Straight lines across the membrane, pointing from the axon out to the fluid",
              "Straight lines across the membrane, pointing from the fluid into the axon",
              "Lines running parallel to the membrane",
              "Lines curving out of the axon and back into it"
            ],
            "ans": 1,
            "cat": "4C",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "sample-cp:5",
            "exp": "1. Figure 2 shows the resting inside of the axon at −80 mV, negative relative to the extracellular fluid.\n2. Field lines start on positive charge and end on negative charge, running straight across the thin membrane (Figure 1 treats it as a capacitor).\n3. So they point from the fluid into the axon.\n**Rule to reuse:** field lines cross a membrane from the positive side to the negative side; at rest that is outside → inside.",
            "id": "p_cpq2_1_q1"
          },
          {
            "q": "One function of the myelin wrapping is to:",
            "choices": [
              "insulate the axon from the extracellular fluid.",
              "decrease the radius of the axon.",
              "produce Schwann cells.",
              "increase the capacitance of the axon."
            ],
            "ans": 0,
            "subj": "biology",
            "cat": "4C",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "sample-cp:6",
            "exp": "1. Table 1: myelin cuts the membrane conductivity about 400-fold and the capacitance about 350-fold.\n2. The axon radius is the same with or without myelin, and Schwann cells make myelin, not the reverse.\n3. So myelin insulates the axon.\n**Rule to reuse:** myelin insulates the axon and lowers its capacitance, so the impulse jumps between nodes.",
            "id": "p_cpq2_1_q2"
          },
          {
            "q": "Channel Y transmits only the smallest substances dissolved in the extracellular fluid through the axon membrane. Which substance does Channel Y transmit?",
            "choices": [
              "Proteins",
              "Magnesium ions",
              "Potassium ions",
              "Chloride ions"
            ],
            "ans": 1,
            "subj": "gen_chem",
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "sample-cp:7",
            "exp": "1. Proteins are macromolecules, far larger than any ion.\n2. K⁺ and Cl⁻ have three filled shells; Mg²⁺ has only two.\n3. Cl⁻ is an anion and larger still, so Mg²⁺ is the smallest.\n**Rule to reuse:** fewer shells = smaller; same electrons, more protons = smaller; anions are biggest.",
            "id": "p_cpq2_1_q3"
          },
          {
            "q": "What is the closest distance the electrodes used in an NCV test can be placed on a patient's arm in order to measure the voltage change as a response to the stimulus?",
            "choices": [
              "0.004 m",
              "0.04 m",
              "0.4 m",
              "4 m"
            ],
            "ans": 1,
            "cat": "4A",
            "skill": "SIRS 3",
            "diff": "D",
            "twin": "sample-cp:8",
            "exp": "1. The pulse travels at 50 m/s, and Figure 2 shows each action potential lasting about 0.8 ms.\n2. To see the whole voltage change arrive, the electrodes must be at least one action-potential length apart.\n3. d = v × t = 50 m/s × 0.0008 s = 0.04 m.\n**Rule to reuse:** closest spacing = conduction speed × action-potential duration, in seconds.",
            "id": "p_cpq2_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq2_2",
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4B",
          "4E",
          "4A",
          "4D"
        ],
        "title": "Blood Pressure and a Positron-Emitting Tracer",
        "passage": "Blood pressure can be measured in the femoral artery, which has a cross-sectional area of 30 mm² in a healthy adult. Figure 1 shows how the femoral blood flow rate depends on the power a person generates to move their body. A cyclist on a stationary bike kept a femoral artery blood flow rate of 1.4 L/min for 45 s. The bike's electric circuit was used to charge a parallel-plate capacitor of capacitance 2 mF.\n\nIn the patient studied, the systolic pressure Ps and the diastolic pressure Pd are 136 mmHg and 60 mmHg. The mean arterial pressure PMAP is given by PMAP = Pd + (Ps – Pd)/3 (Equation 1), and the pulse pressure Pp is defined as Pp = Ps – Pd (Equation 2).\n\nMg²⁺ ions are normally present in the blood at about 20 mg/L. The organs where the magnesium content changes can be located by placing positron-emitting isotopes such as 15O (half-life T1/2 = 2 min) into the patient's bloodstream. When a positron annihilates with an electron, it produces a pair of gamma photons, each with an energy of 511 keV, and a ring of detectors records the intensity of the gamma radiation, the energy arriving per second per unit area. The location where the gamma photons originate gives the location of the organ of interest.",
        "figure": {
          "type": "line",
          "caption": "Figure 1 Femoral artery blood flow rate versus power generated",
          "x": {
            "label": "Power (W)",
            "min": 0,
            "max": 400,
            "step": 100
          },
          "y": {
            "label": "Blood flow rate (L/min)",
            "min": 0,
            "max": 2,
            "step": 0.5
          },
          "series": [
            {
              "name": "Flow",
              "marker": "circle",
              "line": "smooth",
              "points": [
                [
                  0,
                  0.4
                ],
                [
                  100,
                  0.8
                ],
                [
                  200,
                  1.2
                ],
                [
                  300,
                  1.5
                ],
                [
                  400,
                  1.7
                ]
              ]
            }
          ]
        },
        "questions": [
          {
            "q": "What is the relationship between Pp, PMAP, and Pd?",
            "choices": [
              "Pp = PMAP + 3Pd",
              "Pp = 3PMAP + Pd",
              "Pp = 3PMAP − 3Pd",
              "Pp = PMAP − 3Pd"
            ],
            "ans": 2,
            "cat": "4B",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe1-cp:18",
            "exp": "1. Equations 1 and 2 give PMAP = Pd + Pp/3.\n2. Subtract Pd: PMAP − Pd = Pp/3.\n3. Multiply by 3: Pp = 3PMAP − 3Pd.\n**Rule to reuse:** substitute the defined quantity, then undo the outer operation first; a term moved across the equals sign changes sign.",
            "id": "p_cpq2_2_q1"
          },
          {
            "q": "What percentage of standard atmospheric pressure is the pulse pressure of the patient?",
            "choices": [
              "10%",
              "6%",
              "2%",
              "1%"
            ],
            "ans": 0,
            "subj": "gen_chem",
            "cat": "4B",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe1-cp:19",
            "exp": "1. Pp = Ps − Pd = 136 − 60 = 76 mmHg (Equation 2).\n2. Standard atmospheric pressure is 760 mmHg.\n3. 76 ÷ 760 × 100 = 10%.\n**Rule to reuse:** pulse pressure = systolic − diastolic; percent of 1 atm = mmHg ÷ 760 × 100.",
            "id": "p_cpq2_2_q2"
          },
          {
            "q": "What fraction of a 15O sample decays in 8 min?",
            "choices": [
              "1/8",
              "9/16",
              "3/4",
              "15/16"
            ],
            "ans": 3,
            "cat": "4E",
            "skill": "SIRS 3",
            "diff": "X",
            "twin": "pe1-cp:20",
            "exp": "1. The passage gives T1/2 = 2 min for oxygen-15.\n2. 8 min ÷ 2 min = 4 half-lives, so (½)⁴ = 1/16 remains.\n3. Decayed = 1 − 1/16 = 15/16.\n**Rule to reuse:** n = t ÷ t½; fraction decayed = 1 − (½)ⁿ.",
            "id": "p_cpq2_2_q3"
          },
          {
            "q": "The intensity of the gamma radiation reaching the detector ring is directly proportional to the:",
            "choices": [
              "propagation speed of the radiation.",
              "wavelength of the radiation.",
              "polarization of photons emitted.",
              "number of photons emitted."
            ],
            "ans": 3,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe1-cp:16",
            "exp": "1. Intensity is the energy arriving per second per unit area.\n2. Every annihilation photon has the same energy (511 keV), so each carries a fixed amount.\n3. Intensity therefore rises in step with the number of photons emitted; speed, wavelength and polarization don't set it.\n**Rule to reuse:** at a fixed photon energy, intensity ∝ number of photons per second.",
            "id": "p_cpq2_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq2_3",
        "subj": "organic_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4D",
          "5D",
          "5B"
        ],
        "title": "Two Routes to Compounds A and B",
        "passage": "Compound A, an oil, and Compound B (mp 71–73°C) may be prepared by the two methods shown in Figures 1 and 2.\n\nFigure 1 shows the first method. When 2-(4-methylphenyl)oxirane (Compound C) is allowed to drip slowly into a solution of 4-methylphenylmagnesium bromide (\"normal addition\"), the major product is Compound A, 2,2-bis(4-methylphenyl)ethanol. However, when the Grignard solution is allowed to drip slowly into a solution of Compound C (\"inverse addition\"), the major product is Compound B, 1,2-bis(4-methylphenyl)ethanol.\n\nFigure 2 shows the second method. The matching aldehyde or ketone is reduced by sodium borohydride: the ketone 1,2-bis(4-methylphenyl)ethanone (Compound D) gives Compound B, and the aldehyde 2,2-bis(4-methylphenyl)acetaldehyde (Compound E) gives Compound A.\n\nCompound A is a primary alcohol and Compound B is a secondary alcohol. Both have the formula C₁₆H₁₈O and a molar mass of 226 g/mol, and their ¹H NMR spectra differ in the signals of the protons on the carbons next to the hydroxyl group.",
        "figure": {
          "caption": "Figure 1 Products of Compound C with 4-methylphenylmagnesium bromide",
          "columns": [
            "Order of addition",
            "Compound A (%)",
            "Compound B (%)"
          ],
          "rows": [
            [
              "Normal addition",
              "85",
              "15"
            ],
            [
              "Inverse addition",
              "20",
              "80"
            ]
          ]
        },
        "questions": [
          {
            "q": "The formation of Compound A from Compound E is evident by the appearance of a broad band in what spectral region of the IR spectrum?",
            "choices": [
              "650–1000 cm⁻¹",
              "1000–2000 cm⁻¹",
              "2000–3000 cm⁻¹",
              "3000–4000 cm⁻¹"
            ],
            "ans": 3,
            "cat": "4D",
            "skill": "SIRS 3",
            "diff": "M",
            "twin": "pe6-cp:1",
            "exp": "1. Compound E is an aldehyde; NaBH₄ reduces it to Compound A, a primary alcohol (Figure 2).\n2. The new O–H gives a broad band near 3200–3600 cm⁻¹.\n3. That lies in the 3000–4000 cm⁻¹ region.\n**Rule to reuse:** a new alcohol shows a broad O–H band at 3200–3600 cm⁻¹; a new carbonyl shows a sharp C=O near 1700 cm⁻¹.",
            "id": "p_cpq2_3_q1"
          },
          {
            "q": "Which of the following spectroscopic techniques can a chemist use to determine the product ratios of Figure 1?",
            "choices": [
              "IR",
              "¹H NMR",
              "UV",
              "Atomic absorption"
            ],
            "ans": 1,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:2",
            "exp": "1. Compounds A and B are isomeric alcohols with the same functional groups, so their IR and UV spectra look alike.\n2. Atomic absorption measures elements, which are the same in both.\n3. Their ¹H NMR signals differ (CH₂OH and CH in A; CH(OH) and CH₂ in B), and peak integrals give the ratio.\n**Rule to reuse:** to get the ratio of isomers with the same groups, use ¹H NMR integrals.",
            "id": "p_cpq2_3_q2"
          },
          {
            "q": "To account for the production of Compound B by the reaction shown in Figure 1, researchers postulate that Compound C first undergoes a rearrangement into an intermediate. Which of the following structures can be the intermediate?",
            "choices": [
              "4-CH₃C₆H₄–CO–CH₃",
              "4-CH₃C₆H₄–CH(OH)–CH₂OH",
              "4-CH₃C₆H₄–CH=CH₂",
              "4-CH₃C₆H₄–CH₂–CHO"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe6-cp:3",
            "exp": "1. Compound B, 1,2-bis(4-methylphenyl)ethanol, has one aryl on the carbinol carbon and one on the CH₂.\n2. The Lewis acid MgBr₂ opens Compound C toward the benzylic cation; a 1,2-hydride shift turns it into the aldehyde 4-CH₃C₆H₄–CH₂–CHO.\n3. The aryl Grignard then adds to that aldehyde's C=O, giving Compound B.\n**Rule to reuse:** an epoxide can rearrange to a carbonyl through its more stable cation; a Grignard then adds to that carbonyl.",
            "id": "p_cpq2_3_q3"
          },
          {
            "q": "Is either Compound A or Compound B chiral?",
            "choices": [
              "No; neither is chiral.",
              "Yes; both are chiral.",
              "Yes; Compound A is chiral.",
              "Yes; Compound B is chiral."
            ],
            "ans": 3,
            "cat": "5B",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe6-cp:4",
            "exp": "1. Compound A, 2,2-bis(4-methylphenyl)ethanol: C2 carries two identical 4-methylphenyl groups, so it is not a chirality center.\n2. Compound B, 1,2-bis(4-methylphenyl)ethanol: C1 carries H, OH, 4-methylphenyl and CH₂(4-methylphenyl), four different groups.\n3. Only Compound B is chiral.\n**Rule to reuse:** a carbon is a chirality center only if all four groups differ; two identical groups rule it out.",
            "id": "p_cpq2_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq2_4",
        "figures": [{"type":"svg","caption":"Figure 1 Metal-binding site of the thermophilic DNA polymerase","alt":"The side-chain carboxylates of Asp410 and Asp582 both bind a divalent metal ion M²⁺, which also contacts the phosphates of the incoming dNTP.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 260' width='560' height='260' font-family='sans-serif' font-size='20'><text x='280' y='28' text-anchor='middle' font-weight='bold'>Polymerase active site</text><g fill='none' stroke='#555' stroke-width='2.5' stroke-dasharray='6 5'><path d='M200 95L252 132'/><path d='M360 95L308 132'/><path d='M280 184V205'/></g><g fill='#fff' stroke='#222' stroke-width='2'><rect x='20' y='60' width='180' height='44' rx='8'/><rect x='360' y='60' width='180' height='44' rx='8'/><rect x='130' y='205' width='300' height='44' rx='8'/></g><circle cx='280' cy='150' r='34' fill='#dbeafe' stroke='#1d4ed8' stroke-width='2.5'/><g text-anchor='middle'><text x='110' y='89'>Asp410–COO⁻</text><text x='450' y='89'>Asp582–COO⁻</text><text x='280' y='158' fill='#1d4ed8' font-weight='bold'>M²⁺</text><text x='280' y='234'>Incoming dNTP phosphates</text></g></svg>"},{"type":"svg","caption":"Figure 3 Primer–template substrate used in the assays","alt":"A ³⁵S-labeled primer paired to a template; the next template base is U (highlighted), opposite the open slot where dATP or dGTP is added.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 180' width='560' height='180' font-family='sans-serif' font-size='22'><text x='414' y='34' text-anchor='middle' font-size='18' fill='#b45309'>dATP or dGTP</text><text x='20' y='78' font-size='18' fill='#444'>Primer</text><text x='20' y='158' font-size='18' fill='#444'>Template</text><text x='140' y='78' text-anchor='middle'>5′–³⁵S–</text><text y='78' text-anchor='middle' x='190 218 246 274 302 330 358 386'>GCTAGCAC</text><rect x='400' y='54' width='28' height='30' rx='4' fill='none' stroke='#b45309' stroke-width='2' stroke-dasharray='4 3'/><text x='414' y='78' text-anchor='middle' fill='#b45309'>?</text><path d='M190 88V134M218 88V134M246 88V134M274 88V134M302 88V134M330 88V134M358 88V134M386 88V134' stroke='#999' stroke-width='2'/><path d='M414 88V134' stroke='#b45309' stroke-width='2' stroke-dasharray='4 3'/><rect x='400' y='138' width='28' height='28' rx='4' fill='#fde68a' stroke='#b45309' stroke-width='2'/><text x='150' y='158' text-anchor='middle'>3′</text><text y='158' text-anchor='middle' x='190 218 246 274 302 330 358 386 414 442 470 498'>CGATCGTGUCAG</text><text x='530' y='158' text-anchor='middle'>5′</text></svg>"}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "4E"
        ],
        "title": "Mismatches Made by a DNA Polymerase",
        "passage": "A DNA polymerase must copy DNA accurately to preserve an organism's genetic code. Its error rate is low, but an incorrect nucleotide is occasionally inserted during replication. Figure 1 shows the active site of a thermophilic DNA polymerase, in which the side-chain carboxylates of Asp410 and Asp582 bind a divalent metal ion, M²⁺.\n\nOne way an incorrect nucleotide is incorporated is through a mismatch between a base in the template strand and the base of an incoming dNTP. Such a mismatch can take on the geometry of a Watson–Crick base pair. Of the many ways bases can mispair, tautomerization or ionization of a base (Figure 2) would let the polymerase insert a mismatch with correct Watson–Crick geometry. For example, with the substrate shown in Figure 3, whose template carries a uracil, dGTP could be added in place of dATP. G•U mismatches form in two ways. In the wobble base pair, the G•U mismatch looks like an offset A•U base pair. The G•U mismatch can also mimic a G•C base pair when the enol tautomer of U is present.\n\nFigure 2 shows the keto and enol tautomers of G and U, with the pKa of each imino nitrogen. Figure 3 shows the primer–template substrate used in the assays.\n\nThe polymerase was assayed with the Figure 3 substrate and either dATP or dGTP, and Table 1 gives the results at pH 7.4 and pH 9.2. For these assays, the 5′ end of the DNA primer carried a thiophosphate group containing radioactive sulfur-35, and the conversion of reactant to product was measured over a range of dNTP concentrations. Product was detected by its β⁻ decay after purification.",
        "figure": {
          "caption": "Table 1 Kinetic parameters for dNTP incorporation",
          "columns": [
            "pH",
            "dNTP",
            "KM (μM)",
            "kcat (s⁻¹)"
          ],
          "rows": [
            [
              "7.4",
              "dATP",
              "0.4",
              "0.0210"
            ],
            [
              "7.4",
              "dGTP",
              "6.0",
              "0.0004"
            ],
            [
              "9.2",
              "dATP",
              "1.3",
              "0.0150"
            ],
            [
              "9.2",
              "dGTP",
              "1.5",
              "0.0015"
            ]
          ]
        },
        "questions": [
          {
            "q": "Which forms of guanine and uracil are favored under physiological conditions?",
            "choices": [
              "The keto form of guanine and the keto form of uracil",
              "The keto form of guanine and the enol form of uracil",
              "The enol form of guanine and the keto form of uracil",
              "The enol form of guanine and the enol form of uracil"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe4-cp:48",
            "exp": "1. Guanine, thymine and uracil exist almost entirely as keto tautomers at pH 7.4 (Figure 2).\n2. The enol forms are rare; a mismatch with Watson–Crick geometry forms only when one base briefly takes one.\n3. So both are favored in the keto form.\n**Rule to reuse:** G, T and U are normally keto; A and C are normally amino.",
            "id": "p_cpq2_4_q1"
          },
          {
            "q": "What atom remains after the β⁻ decay described in the passage?",
            "choices": [
              "P",
              "Si",
              "Cl",
              "Ar"
            ],
            "ans": 2,
            "subj": "physics",
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:49",
            "exp": "1. The primer's label is sulfur-35 (Z = 16), detected by its β⁻ decay.\n2. In β⁻ decay a neutron becomes a proton: Z rises by 1 and A stays 35.\n3. Z = 17 is chlorine.\n**Rule to reuse:** after β⁻ decay, the atom left is one place to the right (Z + 1, same A).",
            "id": "p_cpq2_4_q2"
          },
          {
            "q": "Which variant of the thermophilic DNA polymerase will most likely retain catalytic activity?",
            "choices": [
              "D410A",
              "D410E",
              "D410K",
              "D410F"
            ],
            "ans": 1,
            "cat": "5D",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe4-cp:50",
            "exp": "1. Figure 1: the carboxylates of Asp410 and Asp582 bind the M²⁺ ion.\n2. Glu also carries a carboxylate, one CH₂ longer.\n3. Ala and Phe have no charge, and Lys is positive.\n**Rule to reuse:** a conservative swap keeps the side chain's group or charge: Asp↔Glu, Lys↔Arg.",
            "id": "p_cpq2_4_q3"
          },
          {
            "q": "How many hydrogen bonds are present in the two types of G•U mismatches discussed in the passage?",
            "choices": [
              "2 in the wobble pair, 2 in the enol U mismatch",
              "3 in the wobble pair, 2 in the enol U mismatch",
              "2 in the wobble pair, 3 in the enol U mismatch",
              "3 in the wobble pair, 3 in the enol U mismatch"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe4-cp:51",
            "exp": "1. The wobble pair looks like an offset A•U pair, held by 2 hydrogen bonds.\n2. Enol U mimics cytosine, so the mismatch looks like G•C.\n3. G•C has 3 hydrogen bonds.\n**Rule to reuse:** wobble = 2; a rare tautomer that mimics C pairs with G by 3.",
            "id": "p_cpq2_4_q4"
          },
          {
            "q": "The ionic form of which metal atom is NOT likely to be found in the pocket of a catalytically active thermophilic DNA polymerase?",
            "choices": [
              "Mn",
              "Co",
              "Mg",
              "K"
            ],
            "ans": 3,
            "subj": "gen_chem",
            "cat": "4E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe4-cp:52",
            "exp": "1. Figure 1 shows a divalent metal ion, M²⁺, in the pocket.\n2. Mn, Co and Mg readily form 2+ ions.\n3. K has one valence electron and forms only K⁺.\n**Rule to reuse:** an M²⁺ site takes 2+ ions; a group 1 metal (Na, K, Rb) forms only 1+ and can't fill it.",
            "id": "p_cpq2_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq2_5",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5A",
          "5C"
        ],
        "title": "Photochemical Labeling of Trp Residues",
        "passage": "Two photochemical reactions that use ultraviolet light (hν) at 25°C can chemically modify the aromatic side chain of Trp residues in proteins and peptides (Figure 1): with CHCl3 the reaction attaches a –CHCl2 group, and with CCl3CO2H it attaches a –CCl2CO2H group. Each substitution replaces one hydrogen atom bonded to a carbon of the indole ring. Table 1 lists the percent photochemical modification of the Trp residues of a bacterial xylanase at 25°C; Buffer A is a sodium phosphate buffer, and Buffer B is made by neutralizing formic acid with ammonia.\n\nW9 and W71, which lie in the interior of xylanase, are 18% and 26% modified, respectively, by 10 mM CHCl3 in Buffer A at 75°C, a temperature that fully denatures xylanase but leaves its primary structure intact. Access to W9 in the fully folded enzyme is blocked by two His residues and one Lys residue. Like the unmodified enzyme, photochemically modified xylanase at 25°C has full enzyme activity, the hydrolysis of xylan. Native xylanase has a net charge of –3.4 at pH 8.0.",
        "figure": {
          "caption": "Table 1 Percent photochemical modification of xylanase Trp residues at 25°C",
          "columns": [
            "Reactant",
            "Buffer",
            "W9",
            "W30",
            "W71",
            "W118",
            "W153",
            "W205",
            "W262"
          ],
          "rows": [
            [
              "CHCl3",
              "A",
              "0%",
              "40%",
              "0%",
              "0%",
              "48%",
              "0%",
              "41%"
            ],
            [
              "CHCl3",
              "B",
              "0%",
              "0%",
              "0%",
              "0%",
              "0%",
              "0%",
              "58%"
            ],
            [
              "CCl3CO2H",
              "A",
              "0%",
              "70%",
              "0%",
              "100%",
              "100%",
              "0%",
              "78%"
            ]
          ]
        },
        "questions": [
          {
            "q": "Which Trp residue of xylanase can be selectively modified with CHCl3 at 25°C?",
            "choices": [
              "W30",
              "W71",
              "W153",
              "W262"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:30",
            "exp": "1. Table 1, CHCl3 in Buffer A: W30 40%, W153 48% and W262 41% are all modified, so nothing is selective there.\n2. CHCl3 in Buffer B: only W262 is modified (58%).\n3. So W262 can be modified selectively.\n**Rule to reuse:** 'selectively' means the one residue modified while every other reads 0 under some condition.",
            "id": "p_cpq2_5_q1"
          },
          {
            "q": "Which type of heterocycle is found on two amino acid residues blocking access to W9?",
            "choices": [
              "Imidazole",
              "Indole",
              "Pyrimidine",
              "Pyrrole"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe5-cp:32",
            "exp": "1. The passage says two His residues and one Lys residue block W9.\n2. Histidine's side chain is an imidazole ring; lysine's is not a ring.\n3. Indole is tryptophan's ring; pyrimidine is a nucleobase ring.\n**Rule to reuse:** His → imidazole; Trp → indole; Pro → pyrrolidine.",
            "id": "p_cpq2_5_q2"
          },
          {
            "q": "Based on the passage, what most likely causes W71 to be accessible to CHCl3 at 75°C?",
            "choices": [
              "Peptide bonds are broken, releasing W71.",
              "Reduction of disulfide bonds occurs.",
              "The protein unfolds and exposes W71 to the buffer.",
              "CHCl3 extracts W71 from the protein interior."
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe5-cp:33",
            "exp": "1. W71 lies in the interior and is 0% modified at 25°C.\n2. At 75°C the enzyme is fully denatured, but its primary structure stays intact, so no peptide bond breaks.\n3. Unfolding exposes W71 to the buffer, and it becomes 26% modified.\n**Rule to reuse:** heat denatures a protein without breaking covalent bonds, exposing buried residues.",
            "id": "p_cpq2_5_q3"
          },
          {
            "q": "What is the name of the ionic compound used to make Buffer B?",
            "choices": [
              "Ammonium formate",
              "Ammonium carbonate",
              "Ammonium bicarbonate",
              "Ammonium acetate"
            ],
            "ans": 0,
            "subj": "gen_chem",
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe5-cp:34",
            "exp": "1. Buffer B is made by neutralizing formic acid, HCOOH, with ammonia.\n2. NH₃ + H⁺ → ammonium, NH₄⁺; HCOOH − H⁺ → formate, HCOO⁻.\n3. The salt is ammonium formate.\n**Rule to reuse:** amine + acid → [alkyl]ammonium + the acid's anion (formate, acetate, bicarbonate).",
            "id": "p_cpq2_5_q4"
          },
          {
            "q": "Which chromatographic technique would most likely separate a mixture of native xylanase from xylanase photochemically modified by CCl3CO2H?",
            "choices": [
              "Anion-exchange chromatography",
              "Cation-exchange chromatography",
              "Gas-liquid chromatography",
              "Size-exclusion chromatography"
            ],
            "ans": 0,
            "cat": "5C",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe5-cp:35",
            "exp": "1. Each CCl₃CO₂H modification attaches a –CCl₂CO₂H group, which is a carboxylate at pH 8.0, so the modified enzyme is more negative than the native enzyme (−3.4).\n2. Both forms are negative and nearly the same size, and proteins aren't volatile.\n3. An anion exchanger holds the more negative, modified form longer.\n**Rule to reuse:** forms that differ by negative charge → anion exchange; by positive charge → cation exchange; by size → size exclusion.",
            "id": "p_cpq2_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "What is the concentration of Br– ions in a 0.4 M solution of magnesium bromide?",
        "choices": [
          "0.08 M",
          "0.20 M",
          "0.40 M",
          "0.80 M"
        ],
        "ans": 3,
        "subj": "gen_chem",
        "cat": "5A",
        "skill": "SIRS 2",
        "diff": "M",
        "twin": "sample-cp:15",
        "exp": "1. MgBr₂ → Mg²⁺ + 2Br⁻.\n2. [Br⁻] = 2 × 0.4 M = 0.80 M.\n**Rule to reuse:** [ion] = its count in the formula × [salt].",
        "id": "cp_q2_sa1"
      },
      {
        "q": "Which of the following statements explains why the boiling point of H2O is abnormally high when compared to the boiling points of other Group 6A hydrides?",
        "choices": [
          "The H–O bond is much less polar than the bonds between H and the other Group 6A elements.",
          "H2O has the lowest molecular mass of the Group 6A hydrides.",
          "H2O is affected by hydrogen-bonding interactions to a much greater degree than the other Group 6A hydrides.",
          "H2O has the highest vapor pressure among the Group 6A hydrides."
        ],
        "ans": 2,
        "subj": "gen_chem",
        "cat": "5B",
        "skill": "SIRS 1",
        "diff": "E",
        "twin": "sample-cp:28",
        "exp": "1. O is far more electronegative than S, Se or Te, so the H–O bond is the most polar.\n2. H on O hydrogen-bonds strongly; the other hydrides barely do.\n3. Low mass and high vapor pressure would lower a boiling point, not raise it.\n**Rule to reuse:** an abnormally high boiling point in the lightest hydride (H₂O, HF, NH₃) comes from hydrogen bonding.",
        "id": "cp_q2_sa2"
      },
      {
        "q": "When a 0.2 M HNO3 solution is added to pulverized marble, the following reaction takes place. CaCO3(s) + 2HNO3(aq) → Ca(NO3)2(aq) + CO2(g) + H2O(l). At 25°C, the reaction is spontaneous and has:",
        "choices": [
          "negative ΔG° and positive ΔS°.",
          "negative ΔG° and negative ΔS°.",
          "positive ΔG° and negative ΔS°.",
          "positive ΔG° and positive ΔS°."
        ],
        "ans": 0,
        "subj": "gen_chem",
        "cat": "5E",
        "skill": "SIRS 2",
        "diff": "M",
        "twin": "pe1-cp:47",
        "exp": "1. Spontaneous → ΔG° < 0.\n2. A gas (CO₂) forms from a solid and a solution → ΔS° > 0.\n**Rule to reuse:** take the sign of ΔG° from spontaneity and the sign of ΔS° from moles of gas made or lost.",
        "id": "cp_q2_sa3"
      },
      {
        "q": "The pH of a 2 L carbonate buffer solution was measured as 10.7, but the experimental procedure calls for a pH 10.3 buffer. Which method will adjust the solution to the proper pH? (Note: The pKa values for carbonic acid are 6.4 and 10.3.)",
        "choices": [
          "Add enough 1 M Na2CO3 to increase the carbonate anion concentration ten-fold.",
          "Add 1 M NaOH to neutralize a portion of the hydronium ions found in the solution.",
          "Alter the ratio of sodium bicarbonate/sodium carbonate added to favor the sodium bicarbonate.",
          "Add 200 mL distilled, deionized water to dilute the basicity of the buffer."
        ],
        "ans": 2,
        "subj": "gen_chem",
        "cat": "5A",
        "skill": "SIRS 4",
        "diff": "X",
        "twin": "pe3-cp:26",
        "chart": {
          "type": "line",
          "caption": "Titration of acetic acid with NaOH",
          "x": {
            "label": "Equivalents of OH⁻ added",
            "min": 0,
            "max": 1,
            "step": 0.2
          },
          "y": {
            "label": "pH",
            "min": 3,
            "max": 7,
            "step": 1
          },
          "series": [
            {
              "name": "pH",
              "marker": "circle",
              "line": "smooth",
              "points": [
                [
                  0.1,
                  3.85
                ],
                [
                  0.25,
                  4.32
                ],
                [
                  0.4,
                  4.62
                ],
                [
                  0.5,
                  4.8
                ],
                [
                  0.6,
                  4.98
                ],
                [
                  0.75,
                  5.28
                ],
                [
                  0.9,
                  5.75
                ]
              ]
            }
          ]
        },
        "exp": "1. pH 10.7 is above the pKa of 10.3, so the buffer holds too much carbonate (base form).\n2. pH = pKa needs base:acid = 1, so the bicarbonate (acid form) share must rise.\n3. More Na₂CO₃ or NaOH raises the pH further, and water doesn't change the ratio.\n**Rule to reuse:** pH above pKa → favor the acid form; pH below pKa → favor the base form; dilution does neither.",
        "id": "cp_q2_sa4"
      },
      {
        "q": "The specific heat of liquid water is 4.2 kJ/°C•kg. How much energy does it take to heat 4 kg of water from 15°C to 35°C?",
        "choices": [
          "168 kJ",
          "252 kJ",
          "336 kJ",
          "504 kJ"
        ],
        "ans": 2,
        "subj": "gen_chem",
        "cat": "5E",
        "skill": "SIRS 2",
        "diff": "X",
        "twin": "pe4-cp:59",
        "exp": "1. ΔT = 35 − 15 = 20 °C.\n2. q = mcΔT = 4 kg × 4.2 kJ/(kg·°C) × 20 °C.\n3. q = 336 kJ.\n**Rule to reuse:** q = m × c × ΔT, with ΔT = final − initial.",
        "id": "cp_q2_sa5"
      },
      {
        "q": "A block of ice at 0°C and 1 atm is heated to form steam at 100°C and 1 atm. Ignoring heat loss to the surroundings, what part of the process uses the most heat? (Note: Specific heat of water = 4.2 J/g°C. Heat of fusion = 334 J/g. Heat of vaporization = 2260 J/g.)",
        "choices": [
          "Melting the ice block",
          "Heating all the water from 0°C to 50°C",
          "Heating all the water from 50°C to 100°C",
          "Vaporizing all the water"
        ],
        "ans": 3,
        "subj": "gen_chem",
        "cat": "5E",
        "skill": "SIRS 4",
        "diff": "X",
        "twin": "pe5-cp:48",
        "chart": {
          "type": "line",
          "caption": "Heating curve for 10.0 g of ethanol",
          "x": {
            "label": "Heat added (J)",
            "min": 0,
            "max": 16000,
            "step": 2000
          },
          "y": {
            "label": "Temperature (°C)",
            "min": -120,
            "max": 120,
            "step": 40
          },
          "series": [
            {
              "name": "Ethanol",
              "marker": "circle",
              "line": "straight",
              "points": [
                [
                  0,
                  -114
                ],
                [
                  1080,
                  -114
                ],
                [
                  5760,
                  78
                ],
                [
                  14170,
                  78
                ],
                [
                  14450,
                  98
                ]
              ]
            }
          ]
        },
        "exp": "1. Per gram: melting 334 J; each 50 °C of water 4.2 × 50 = 210 J.\n2. Vaporizing takes 2260 J per gram.\n3. Vaporizing is by far the largest.\n**Rule to reuse:** compare mcΔT for each slope with mΔH for each plateau; vaporizing beats everything when it occurs.",
        "id": "cp_q2_sa6"
      },
      {
        "q": "An ester is prepared by the method of direct esterification using a lipase enzyme as a catalyst. Which of the following modifications will NOT appreciably increase the final yield of ester?",
        "choices": [
          "Using 3 times as much lipase",
          "Using 3 moles of RCOOH instead of 1 mole",
          "Using 3 moles of R′OH instead of 1 mole",
          "Removing RCOOR′ from the reaction mixture as it is formed"
        ],
        "ans": 0,
        "subj": "organic_chem",
        "cat": "5E",
        "skill": "SIRS 2",
        "diff": "X",
        "twin": "pe5-cp:58",
        "exp": "1. More acid or alcohol shifts the equilibrium toward the ester.\n2. Removing the ester as it forms also shifts it forward.\n3. A catalyst speeds both directions equally and leaves K unchanged, so more lipase doesn't raise the yield.\n**Rule to reuse:** a catalyst changes the rate, not the equilibrium yield; adding reactant or removing product raises the yield.",
        "id": "cp_q2_sa7"
      },
      {
        "q": "A pot of water boils steadily on a stove at 1 atm. As long as liquid water remains in the pot, its temperature:",
        "choices": [
          "holds at 100 °C.",
          "rises above 100 °C.",
          "falls below 100 °C.",
          "rises, then falls."
        ],
        "ans": 0,
        "subj": "physics",
        "cat": "5E",
        "skill": "SIRS 1",
        "diff": "M",
        "twin": "aamc-phys-qpack:Q23",
        "exp": "1. At 1 atm, water boils at 100 °C.\n2. While liquid and vapor coexist, added heat goes into vaporization (ΔH_vap), not into raising the temperature.\n3. So the temperature holds at 100 °C until the liquid is gone.\n**Rule to reuse:** during a phase change at fixed pressure, the temperature stays at the transition point.",
        "id": "cp_q2_sa8"
      }
    ]
  },
  {
    "id": "cp_half_3",
    "title": "Chem/Phys Quiz 3",
    "order": [
      "p_cpq3_1",
      "p_cpq3_2",
      4,
      "p_cpq3_3",
      "p_cpq3_4",
      "p_cpq3_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq3_1",
        "figures": [{"type":"line","caption":"Figure 2 Initial velocity of PtK-C versus pantetheine concentration","x":{"label":"[Pantetheine] (μM)","min":0,"max":200,"step":40},"y":{"label":"v_{0} (μM NADPH/min)","min":0,"max":12,"step":2},"series":[{"name":"Measured","marker":"circle","line":"none","points":[[10,2.5],[20,3.9],[40,6.1],[60,7.1],[80,8.1],[120,8.9],[160,9.7],[200,9.9]]},{"name":"Michaelis–Menten fit","points":[[0,0],[5,1.33],[10,2.4],[20,4.0],[40,6.0],[60,7.2],[80,8.0],[100,8.57],[120,9.0],[160,9.6],[200,10.0]],"marker":"none"}]}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5A",
          "5E",
          "5D"
        ],
        "title": "Pantetheine Kinase and a Coupled Assay",
        "passage": "Pantetheine kinases (PtK) catalyze the phosphorylation of pantetheine to form phosphopantetheine, which is then joined to AMP to give dephospho-CoA (Figure 1). This reaction uses ATP and is the first step of a salvage route to Coenzyme A that skips the pathway's opening enzymes. Three forms of PtK have been described: PtK-A, PtK-B, and PtK-C. Loss of PtK-A activity has been linked to a rare metabolic disorder in humans. PtK-B and PtK-C are found in bacteria, and bacterial PtK-C is being studied as a target for new antibiotics.\n\nFigure 1 The PtK reaction and the formation of dephospho-CoA (compounds shown non-ionized; described: pantetheine is HS–CH₂CH₂–NH–CO–CH₂CH₂–NH–CO–CH(OH)–C(CH₃)₂–CH₂OH. PtK uses ATP to put a phosphate on the end CH₂OH, giving phosphopantetheine, …–CH₂–O–PO₃H₂, and ADP. The phosphopantetheine phosphate is then joined to the phosphate of AMP, giving dephospho-CoA: HS–CH₂CH₂–NH–CO–CH₂CH₂–NH–CO–CH(OH)–C(CH₃)₂–CH₂–O–P(O)(OH)–O–P(O)(OH)–O–CH₂–adenosine, with the ribose 2′-OH and 3′-OH both free.)\n\nThe enzyme kinetic data for a bacterial PtK-C are shown in Figure 2. The reaction was followed with an assay that couples the reactions of pyruvate kinase and an NADPH-dependent lactate dehydrogenase. ADP made in the PtK-catalyzed reaction is used by pyruvate kinase to convert phosphoenolpyruvate (PEP) to pyruvate. The pyruvate is then converted to lactate by the lactate dehydrogenase, with simultaneous use of NADPH. The PtK reaction was started by adding 0.35 μM PtK-C to a buffer containing pyruvate kinase, lactate dehydrogenase, 3 mM PEP, 0.25 mM NADPH, and suitable amounts of ATP and pantetheine. The consumption of NADPH was measured spectrophotometrically at 340 nm. Figure 2 shows the initial velocity of the reaction as a function of the initial pantetheine concentration, fitted to the Michaelis–Menten equation.\n\nX-ray crystal structures have been solved for the PtK-C dimer alone, bound to its substrate, bound to its product, and bound to both ADP and pantetheine. They show that pantetheine binding is stabilized by hydrogen bonds between its C2′ and C4′ hydroxyl groups and a carboxylate group of PtK-C, and that in the ternary complex of PtK-C with pantetheine and ADP, ADP is held mainly by ionic interactions.",
        "questions": [
          {
            "q": "What is the net charge of both pantetheine and phosphopantetheine in aqueous solution at pH 7?",
            "choices": [
              "0 for pantetheine and 0 for phosphopantetheine",
              "−1 and −1",
              "0 for pantetheine and −2 for phosphopantetheine",
              "−2 and −3"
            ],
            "ans": 2,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "M",
            "subj": "gen_chem",
            "twin": "sample-cp:47",
            "exp": "1. Find the ionizable groups: pantetheine has only amides, an OH and a thiol, none charged at pH 7; phosphopantetheine adds one phosphate monoester.\n2. Charge each at pH 7: pantetheine → 0; –OPO₃H₂ → –OPO₃²⁻ = −2.\n3. −1 and −1 treats pantetheine as an acid; −2 and −3 gives the monoester a third charge it cannot carry.\n4. Answer: 0 for pantetheine and −2 for phosphopantetheine.\n\n**Rule to reuse:** at pH 7 count −1 per carboxylate and −2 per phosphate monoester; no acidic group means 0.",
            "id": "p_cpq3_1_q1"
          },
          {
            "q": "What are the components that comprise dephospho-CoA (Figure 1)?",
            "choices": [
              "β-Mercaptoethylamine, phosphopantothenate, dAMP",
              "β-Mercaptopropylamine, pantothenate, AMP with additional 5′–phosphate",
              "β-Mercaptopropylamine, phosphopantothenate, dAMP with additional 5′–phosphate",
              "β-Mercaptoethylamine, pantothenate, ADP"
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "sample-cp:48",
            "exp": "1. Dephospho-CoA is coenzyme A without the 3′-phosphate on its ribose.\n2. Read it from the thiol end: HS–CH₂CH₂–NH– = β-mercaptoethylamine (2 C) → pantothenate amide → pyrophosphate + adenosine = ADP; no 3′-phosphate.\n3. The thiol arm has two carbons, not three (mercaptopropylamine); the sugar is ribose, not deoxyribose (dAMP); the extra phosphate of the pantothenate unit is part of ADP's pyrophosphate.\n4. Answer: β-Mercaptoethylamine, pantothenate, ADP.\n\n**Rule to reuse:** CoA = β-mercaptoethylamine + pantothenate + ADP with an additional 3′-phosphate; dephospho-CoA lacks that 3′-phosphate.",
            "id": "p_cpq3_1_q2"
          },
          {
            "q": "The amino acids Glu8, Ser12, Thr13, Lys15, and Arg30 are found near the ADP binding site of PtK-C. Which two amino acids contribute to the stabilization of ADP binding described in the passage?",
            "choices": [
              "Ser12 and Thr13",
              "Lys15 and Arg30",
              "Glu8 and Arg30",
              "Glu8 and Lys15"
            ],
            "ans": 1,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "sample-cp:50",
            "exp": "1. The passage says ADP is held mainly by ionic interactions, and ADP's phosphates are negatively charged.\n2. Charge each residue at pH 7: Glu8 −; Ser12 0; Thr13 0; Lys15 +; Arg30 +.\n3. Ser and Thr are neutral; Glu would repel the phosphates, so any pair with Glu8 fails.\n4. Answer: Lys15 and Arg30.\n\n**Rule to reuse:** phosphates are held by the basic side chains Lys, Arg (and His); Asp and Glu repel them.",
            "id": "p_cpq3_1_q3"
          },
          {
            "q": "What is the fate of the NADPH used in the assay described in the passage?",
            "choices": [
              "Oxidation of NADPH to NADP⁺",
              "Reduction of NADPH to NADP⁺",
              "Oxidation of NADP⁺ to NADPH",
              "Reduction of NADP⁺ to NADPH"
            ],
            "ans": 0,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "sample-cp:51",
            "exp": "1. The last coupling enzyme reduces pyruvate with NADPH, and A₃₄₀ (NADPH) falls.\n2. Follow the electrons: NADPH gives a hydride to pyruvate → NADP⁺; losing electrons is oxidation.\n3. NADPH → NADP⁺ cannot be a reduction, and NADP⁺ → NADPH would raise A₃₄₀.\n4. Answer: oxidation of NADPH to NADP⁺.\n\n**Rule to reuse:** a cofactor that donates a hydride is oxidized (NAD(P)H → NAD(P)⁺); falling A₃₄₀ shows it.",
            "id": "p_cpq3_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq3_2",
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4E",
          "5E"
        ],
        "title": "Homogeneous and Heterogeneous Catalysts",
        "passage": "A catalyst speeds up a reaction without being used up. For example, iron is used as a catalyst to combine N₂ and H₂ in the first stage of ammonia production (reactions 1 and 2). H₂O₂ can also be decomposed with the help of a catalyst, as shown in reactions 3 and 4:\n\nReaction 1: N₂ + 2Fe → 2Fe–N\nReaction 2: 2Fe–N + 3H₂ → 2NH₃ + 2Fe\nReaction 3: H₂O₂ + Br⁻ → H₂O + BrO⁻\nReaction 4: H₂O₂ + BrO⁻ → H₂O + O₂ + Br⁻\n\nCatalysts are also used in contact-lens cases, where the 3% H₂O₂ that disinfected a lens flows over a disc coated with solid platinum. The platinum speeds the conversion of H₂O₂ to water and oxygen gas, so the lens can be placed on the eye directly from the remaining saline. Unfortunately, some cheaper cases use dissolved KBr instead, which stays in the saline after the reaction. Catalysts are classified as either homogeneous or heterogeneous. A homogeneous catalyst is in the same phase as the reactant molecules, whereas a heterogeneous catalyst is in a different phase from the reactants.",
        "questions": [
          {
            "q": "Which of the following is the overall reaction for the decomposition of H₂O₂ that is shown in reactions 3 and 4?",
            "choices": [
              "2H₂O₂(aq) + BrO⁻(aq) → 2H₂O(l) + Br⁻(aq) + O₂(g)",
              "2H₂O₂(aq) + 2Br⁻(aq) → 2H₂O(l) + Br₂(l) + O₂(g)",
              "H₂O₂(aq) → H₂O(l) + O₂(g)",
              "2H₂O₂(aq) → 2H₂O(l) + O₂(g)"
            ],
            "ans": 3,
            "cat": "4E",
            "skill": "SIRS 3",
            "diff": "X",
            "twin": "pe1-cp:48",
            "exp": "1. Add reactions 3 and 4 and cancel what appears on both sides.\n2. Sum: 2H₂O₂ + Br⁻ + BrO⁻ → 2H₂O + BrO⁻ + Br⁻ + O₂; cancel Br⁻ (catalyst) and BrO⁻ (intermediate): 2H₂O₂(aq) → 2H₂O(l) + O₂(g).\n3. Keeping BrO⁻ or Br⁻ leaves a catalyst or intermediate in the equation; H₂O₂ → H₂O + O₂ is not balanced for O.\n4. Answer: 2H₂O₂(aq) → 2H₂O(l) + O₂(g).\n\n**Rule to reuse:** add the steps, cancel catalysts and intermediates, then check that atoms balance.",
            "id": "p_cpq3_2_q1"
          },
          {
            "q": "Which of the following diagrams does NOT illustrate a function of the platinum disc in a contact-lens case?",
            "choices": [
              "Diagram: H₂O₂ adsorbing onto the Pt surface",
              "Diagram: 2H₂O₂ → 2H₂O + O₂ at the Pt surface",
              "Diagram: N₂ + O₂ → 2NO at the Pt surface",
              "Diagram: O₂ leaving the Pt surface"
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe1-cp:49",
            "exp": "1. The disc's job is to decompose H₂O₂ on its surface.\n2. List its surface steps: H₂O₂ adsorbs → 2H₂O₂ → 2H₂O + O₂ → O₂ leaves.\n3. Making NO from N₂ and O₂ is not something the disc is used for; it makes a pollutant and needs no peroxide.\n4. Answer: Diagram: N₂ + O₂ → 2NO at the Pt surface.\n\n**Rule to reuse:** a catalyst's functions are the surface steps of the reaction it is there to speed; a reaction that makes something unwanted is not one.",
            "choiceFigs": ["cp-pt-h2o2-adsorb", "cp-pt-h2o2-decomp", "cp-pt-no-form", "cp-pt-o2-leave"],
            "id": "p_cpq3_2_q2"
          },
          {
            "q": "Which of the following most likely will occur if the homogeneous KBr catalyst CANNOT be separated from the saline at the end of a reaction?",
            "choices": [
              "The catalyst will become heterogeneous.",
              "The saline will be contaminated.",
              "The reaction will not occur.",
              "The reaction rate will speed up."
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe1-cp:50",
            "exp": "1. KBr dissolves in the saline, so it is a homogeneous catalyst.\n2. A dissolved catalyst is regenerated, not consumed → Br⁻ is still in the saline at the end.\n3. A dissolved catalyst does not turn solid, and the reaction still occurs at the usual rate.\n4. Answer: the saline will be contaminated.\n\n**Rule to reuse:** a homogeneous catalyst stays mixed with the products unless it is separated; a heterogeneous one can be lifted out.",
            "id": "p_cpq3_2_q3"
          },
          {
            "q": "How will the rate of a catalyzed reaction be affected if the solid platinum catalyst is finely ground before it is added to the peroxide solution?",
            "choices": [
              "The rate will be faster because a greater mass of platinum will be present.",
              "The rate will be faster because a greater surface area of platinum will be exposed.",
              "The rate will be slower because the fine platinum particles will interfere with O₂ formation.",
              "The rate will remain the same because the mass of platinum will be the same."
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe1-cp:51",
            "exp": "1. Solid platinum works only at its surface.\n2. Grinding → many small particles → much more exposed surface, same mass → faster rate.\n3. The mass does not change, and fine particles do not block the reaction.\n4. Answer: faster, because a greater surface area of platinum is exposed.\n\n**Rule to reuse:** for a solid catalyst, rate follows exposed surface area, not mass.",
            "id": "p_cpq3_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq3_3",
        "figures": [{"type":"svg","caption":"Figure 1 Components of the portable UV disinfection unit","alt":"A voltage source holds two parallel plate electrodes at +V and −V; gas between the plates emits UV light through a quartz window in the top plate toward a surface such as a bed rail.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 260' width='560' height='260' font-family='sans-serif' font-size='20'><rect x='270' y='8' width='200' height='40' rx='6' fill='#f3f4f6' stroke='#222' stroke-width='2'/><text x='370' y='35' text-anchor='middle'>Surface (bed rail)</text><path d='M345 106V58M370 106V58M395 106V58M338 68L345 56L352 68M363 68L370 56L377 68M388 68L395 56L402 68' fill='none' stroke='#7c3aed' stroke-width='3'/><text x='412' y='92' fill='#7c3aed'>UV light</text><rect x='230' y='110' width='280' height='10' fill='#333'/><rect x='330' y='110' width='80' height='10' fill='#7fb3d5'/><text x='322' y='100' text-anchor='end' font-size='18' fill='#2b6c9e'>Quartz window</text><text x='370' y='168' text-anchor='middle'>Gas</text><rect x='230' y='200' width='280' height='10' fill='#333'/><rect x='20' y='115' width='130' height='80' rx='8' fill='#fff' stroke='#222' stroke-width='2'/><text x='85' y='150' text-anchor='middle'>Voltage</text><text x='85' y='175' text-anchor='middle'>source</text><path d='M150 135H200V115H230M150 175H200V205H230' fill='none' stroke='#222' stroke-width='2.5'/><text x='160' y='128' font-size='18'>+V</text><text x='160' y='198' font-size='18'>−V</text><text x='370' y='242' text-anchor='middle' font-size='18'>Parallel plate electrodes</text></svg>"},{"type":"line","caption":"Figure 2 Magnitude of the voltage between the plates over time","x":{"label":"Time (μs)","min":0,"max":100,"step":10},"y":{"label":"|V| (V)","min":0,"max":400,"step":100},"series":[{"name":"|V|","line":"straight","points":[[0,300],[35,300],[35,0],[50,0],[50,300],[85,300],[85,0],[100,0]],"marker":"none"}]}],
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4B",
          "4A",
          "4D",
          "4C"
        ],
        "title": "A Pulsed Ultraviolet Room Disinfection Unit",
        "passage": "Ultraviolet (UV) lamps, which emit light from a gas excited by electric discharges, are increasingly important in hospital infection control. Lamps whose gas is kept between 140 °F and 158 °F can be used to disinfect patient rooms and equipment. Figure 1 shows the overall components of a portable UV disinfection unit. The UV light can be aimed at any surface (such as a bed rail) to kill pathogens. The two flat, parallel plate electrodes are connected to the voltage source so that their electric potentials have equal magnitude and opposite sign. The voltage between the plates varies in time (Figure 2: |V| versus time, held at 300 V for 35 µs, then 0 V for 15 µs, repeating) and creates a spatially uniform electric field between the two plates. The electric field drives periodic electric discharges through the gas between the plates. These discharges excite the gas atoms, which emit UV photons that leave through a quartz window in one plate. The gas mixture can be chosen to give the wavelengths most damaging to a given pathogen. Depending on the lamp, disinfection occurs when UV photons are absorbed by a pathogen's nucleic acids, disrupting its biological functions. Ozone formed near the window also damages the outer membranes of some pathogens. The UV radiation (250–400 nm) is generated by electron transitions within the excited gas.",
        "questions": [
          {
            "q": "Which temperature range corresponds to the lamp gas used to disinfect a room?",
            "choices": [
              "413–431 K",
              "351–361 K",
              "333–343 K",
              "60–70 K"
            ],
            "ans": 2,
            "cat": "4B",
            "skill": "SIRS 2",
            "diff": "X",
            "subj": "gen_chem",
            "twin": "pe3-cp:17",
            "exp": "1. The passage gives the gas range in °F; kelvin needs two steps.\n2. (140 − 32) × 5/9 = 60 °C and (158 − 32) × 5/9 = 70 °C; add 273 → 333–343 K.\n3. 413–431 adds 273 to °F; 351–361 skips subtracting 32; 60–70 stops at Celsius.\n4. Answer: 333–343 K.\n\n**Rule to reuse:** °F → °C (subtract 32, × 5/9), then add 273.",
            "id": "p_cpq3_3_q1"
          },
          {
            "q": "What is the period of the voltage source that operates the UV lamp?",
            "choices": [
              "100 µs",
              "75 µs",
              "50 µs",
              "25 µs"
            ],
            "ans": 2,
            "cat": "4A",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe3-cp:18",
            "exp": "1. The voltage is on for 35 µs, off for 15 µs, then repeats.\n2. Period = on + off = 35 + 15 = 50 µs.\n3. 100 µs is two cycles; 75 µs and 25 µs match no part of the cycle.\n4. Answer: 50 µs.\n\n**Rule to reuse:** the period of a pulse train is on time plus off time.",
            "id": "p_cpq3_3_q2"
          },
          {
            "q": "What is the maximum energy of the UV photons generated by this lamp? (Note: Speed of light is c = 3.0 × 10⁸ m/s; Planck's constant is h = 6.63 × 10⁻³⁴ J•s.)",
            "choices": [
              "8 × 10⁻¹⁶ J",
              "5 × 10⁻¹⁷ J",
              "5 × 10⁻¹⁹ J",
              "8 × 10⁻¹⁹ J"
            ],
            "ans": 3,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe3-cp:19",
            "exp": "1. E = hc/λ, so the maximum energy comes from the shortest wavelength, 250 nm.\n2. λ = 2.5 × 10⁻⁷ m; hc ≈ 2.0 × 10⁻²⁵ J·m; E ≈ 2.0 × 10⁻²⁵ ÷ 2.5 × 10⁻⁷ = 8 × 10⁻¹⁹ J.\n3. 5 × 10⁻¹⁹ J is the 400 nm minimum; the 10⁻¹⁶ and 10⁻¹⁷ values come from slipping the nm conversion.\n4. Answer: 8 × 10⁻¹⁹ J.\n\n**Rule to reuse:** maximum photon energy = hc ÷ the shortest wavelength, λ in metres.",
            "id": "p_cpq3_3_q3"
          },
          {
            "q": "That the electric field is uniform between the plates means that the electric field lines:",
            "choices": [
              "are more closely spaced at the positive plate than at the negative one.",
              "intersect halfway between the plates.",
              "are more closely spaced at the negative plate than at the positive one.",
              "are equally spaced at both plates and between them."
            ],
            "ans": 3,
            "cat": "4C",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:20",
            "exp": "1. Uniform means the field has the same strength everywhere in the gap.\n2. Line spacing shows strength → same strength everywhere → same spacing everywhere.\n3. Closer spacing at either plate would mean a stronger field there; field lines never intersect.\n4. Answer: equally spaced at both plates and between them.\n\n**Rule to reuse:** closer lines = stronger field; a uniform field has evenly spaced, parallel lines.",
            "id": "p_cpq3_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq3_4",
        "subj": "organic_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5A",
          "5D"
        ],
        "title": "A Synthesis Built on the THIQ Ring System",
        "passage": "Table 1 describes the tetrahydroisoquinoline (THIQ) ring system, a cyclic secondary amine found in more than 2,000 natural alkaloids, and lists the atoms bonded to each nitrogen (N1–N4) of Compound 7, a THIQ-based drug candidate, with approximate pKa values. One total synthesis of Compound 7 runs in six steps. In Step 1, NaBH₄ reduces the ketone of methyl 4-oxo-4-phenylbutanoate but leaves the ester untouched. The γ-hydroxyester is not isolated but cyclizes in Step 2, with loss of methanol, to give the lactone Fragment A. In Step 3, THIQ·HCl is stirred with Et₃N in acetonitrile and an alkyl bromide is then added for an SN2 reaction that forms N4. In Step 4, this piece is coupled to the fragment carrying N1, a methyl carbamate, R₂N–C(=O)–OCH₃. The rest of the synthesis uses commonly encountered reactions. Its success hinges on Step 5, in which an intermediate carrying the lactone and an ethyl ester is heated with two equivalents of aqueous NaOH: both ester groups are hydrolyzed, but the amide half of the carbamate is not. A carbamate is both an amide and an ester; the nitrogen of the amide and the oxygen of the ester share one carbonyl group. In Step 6, the carbamate on N1 is finally removed with hot concentrated NaOH.",
        "figure": {
          "caption": "Table 1 Bonding at the nitrogens of Compound 7, and approximate pKa values",
          "columns": [
            "Item",
            "Data"
          ],
          "rows": [
            [
              "N1",
              "bonded to C=O carbon of –C(=O)OCH₃, CH₂, CH₂"
            ],
            [
              "N2",
              "bonded to CH₂, CH₂, H"
            ],
            [
              "N3",
              "double bond to =CH–; single bond to CH₃"
            ],
            [
              "N4",
              "bonded to ring CH₂, ring CH₂, chain CH₂"
            ],
            [
              "pKa of THIQ–H⁺ (R₂NH₂⁺ → R₂NH)",
              "9.4"
            ],
            [
              "pKa of Et₃NH⁺",
              "10.7"
            ],
            [
              "pKa of THIQ N–H (R₂NH → R₂N⁻)",
              "36"
            ],
            [
              "pKa of C–H on the carbon bearing Br",
              "> 45"
            ]
          ]
        },
        "questions": [
          {
            "q": "Which of the following functional groups is present in tetrahydroisoquinoline (Table 1)?",
            "choices": [
              "An amide",
              "An amine",
              "An imine",
              "A carbamate"
            ],
            "ans": 1,
            "cat": "5A",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe4-cp:29",
            "exp": "1. THIQ is described as a cyclic secondary amine.\n2. Its N has two ring carbons and one H, all single bonds, and no C=O.\n3. An amide or carbamate needs N on a C=O carbon; an imine needs C=N.\n4. Answer: an amine.\n\n**Rule to reuse:** N with only single bonds to C/H = amine; N–C=O = amide (N–C(=O)–O = carbamate); C=N = imine.",
            "id": "p_cpq3_4_q1"
          },
          {
            "q": "Fragment A is prepared from methyl 4-oxo-4-phenylbutanoate by:",
            "choices": [
              "reduction of the ketone and lactonization of the γ-hydroxyester.",
              "hydrolysis of one ester and formation of an acetal from the ketoacid.",
              "reduction of one ester and formation of an acetal from the γ-hydroxyketone.",
              "reduction of one ester and the ketone followed by dehydration to a ketoether."
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:30",
            "exp": "1. NaBH₄ reduces the ketone but not the ester; the new OH then attacks the ester carbonyl.\n2. PhCO–CH₂CH₂–CO₂CH₃ → PhCH(OH)–CH₂CH₂–CO₂CH₃ (γ-hydroxyester) → five-membered lactone + CH₃OH.\n3. NaBH₄ does not reduce or hydrolyze esters, and no acetal forms.\n4. Answer: reduction of the ketone and lactonization of the γ-hydroxyester.\n\n**Rule to reuse:** NaBH₄ reduces ketones, not esters; a γ-hydroxyester closes to a five-membered lactone.",
            "id": "p_cpq3_4_q2"
          },
          {
            "q": "Which of the following compounds is most likely the intermediate product formed in Step 5 if three equivalents of base are used?",
            "choices": [
              "The lactone with the ethyl ester hydrolyzed to a carboxylate",
              "A hydroxy carboxylate with the ethyl ester intact",
              "The unchanged lactone and ethyl ester",
              "A hydroxy dicarboxylate, with the lactone and the ethyl ester both hydrolyzed"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe4-cp:31",
            "exp": "1. The intermediate has two ester-type groups: the lactone and the ethyl ester.\n2. Excess base (3 equiv ≥ 2) → every ester-type group is hydrolyzed: lactone → –COO⁻ + –OH; ethyl ester → –COO⁻ + EtOH.\n3. With enough base neither group survives, so partial or no hydrolysis is wrong.\n4. Answer: a hydroxy dicarboxylate, with the lactone and the ethyl ester both hydrolyzed.\n\n**Rule to reuse:** count ester-type groups against equivalents of base; with excess base all are hydrolyzed.",
            "id": "p_cpq3_4_q3"
          },
          {
            "q": "The Et₃N used in Step 3 is necessary to:",
            "choices": [
              "dissolve the alkyl bromide.",
              "remove an α-hydrogen from the alkyl bromide.",
              "convert the ammonium salt THIQ·HCl to the amine.",
              "replace the chloride ion in THIQ·HCl with the bromide ion."
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe4-cp:32",
            "exp": "1. THIQ is added as its hydrochloride salt, whose N has no free lone pair.\n2. pKa Et₃NH⁺ 10.7 > THIQ–H⁺ 9.4 → Et₃N removes the H⁺ → free THIQ, which can attack the alkyl bromide.\n3. Acetonitrile is the solvent; Et₃N cannot remove a C–H (pKa > 45) and does not swap the anions.\n4. Answer: convert the ammonium salt THIQ·HCl to the amine.\n\n**Rule to reuse:** an amine salt must be freed by a stronger base before the amine can act as a nucleophile.",
            "id": "p_cpq3_4_q4"
          },
          {
            "q": "In which of the following steps is the carbamate amide group cleaved?",
            "choices": [
              "Step 2",
              "Step 3",
              "Step 5",
              "Step 6"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe4-cp:33",
            "exp": "1. N1 carries a methyl carbamate, R₂N–C(=O)–OCH₃.\n2. Only Step 6, hot concentrated NaOH, removes it: carbamate → amine + CO₂ (carbonate) + CH₃OH.\n3. Step 2 closes the lactone, Step 3 is the SN2 coupling, and Step 5 hydrolyzes the lactone and ethyl ester.\n4. Answer: Step 6.\n\n**Rule to reuse:** find the step whose reagent cleaves that bond; a carbamate falls to strong hot base (or H₂/Pd for a benzyl carbamate).",
            "id": "p_cpq3_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq3_5",
        "figures": [{"caption":"Table 1 Chemical denaturation midpoints (Cm)","columns":["Module","Cm at pH 3.0 (M)","Cm at pH 7.0 (M)"],"rows":[["CBM","1.62","2.31"],["CBM-2","2.28","2.26"],["CBM-3","2.20","2.33"]]}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5A",
          "4D",
          "4C"
        ],
        "title": "A Low-Charge Cellulose-Binding Protein",
        "passage": "Low surface charge is known to promote protein aggregation. A study changed a cellulose-binding, low-charge, wild-type cellulose-binding module (the CBM) into two variants (CBM-2 and CBM-3) with even less charge. The CBM has ionizable side chains from only K12, E40, R66, and H85 (pKa = 6), and its surface carries three times as many Ser and Thr residues as more highly charged modules. CBM-2 contains K12M, E40Q, R66M, and H85F. CBM-3 is the N-terminally acetylated form of CBM-2. In all three, residues W24, W31, and W58 are essential for cellulose binding because their side chains donate hydrogen bonds. The three bound cellulose with very similar strengths, independent of pH from pH 4 to 8. Size-exclusion chromatography showed that all three were monomers.\n\nTable 1 Chemical denaturation midpoints (Cm) at pH 3.0 and pH 7.0: CBM, 1.62 M and 2.31 M; CBM-2, 2.28 M and 2.26 M; CBM-3, 2.20 M and 2.33 M.\n\nModule structures were studied at 376 MHz with an NMR spectrometer containing a 9.40 T magnet, using ¹⁹F NMR of a 5-fluorotryptophan placed at W31. As in proton NMR, nearby positive charges increase the ¹⁹F chemical shift. Bacteria were grown in media containing (¹⁵NH₄)₂SO₄ so that ¹⁴N was replaced by ¹⁵N in the expressed CBM and CBM-2. At pH 5, the ¹⁹F chemical shift of CBM-2 was the same as at pH 8, with an N-terminal pKa of 7.8.",
        "questions": [
          {
            "q": "Which CBM variant most likely has cellulose-binding affinity similar to the CBM?",
            "choices": [
              "W24Y, W31Y, W58Y",
              "W24Y, W31Y, W58F",
              "W24Y, W31M, W58L",
              "W24T, W31S, W58A"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe6-cp:48",
            "exp": "1. Each Trp ring stacks on a glucose ring, and each indole N–H donates a hydrogen bond.\n2. A similar variant keeps a ring and a donor at all three sites: Tyr has both (ring + O–H).\n3. Phe loses the donor at 58; Met, Leu, Thr, Ser and Ala have no ring to stack.\n4. Answer: W24Y, W31Y, W58Y.\n\n**Rule to reuse:** replace each residue with one that can do every job it does: ring stacking and hydrogen-bond donation → Tyr.",
            "id": "p_cpq3_5_q1"
          },
          {
            "q": "What is the most likely role of the Ser and Thr residues on the surface of the CBM?",
            "choices": [
              "Catalyze reactions",
              "Enforce aggregation",
              "Maintain surface charge",
              "Stabilize solvation layer"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe6-cp:49",
            "exp": "1. Ser and Thr carry polar, uncharged –OH groups.\n2. Surface –OH groups hydrogen-bond with water → they build the protein's solvation layer.\n3. They are uncharged at pH 7, polar groups oppose aggregation, and the CBM has no catalytic role.\n4. Answer: stabilize solvation layer.\n\n**Rule to reuse:** polar surface groups (–OH, amides) hold the water shell; charged ones set surface charge; nonpolar ones drive aggregation.",
            "id": "p_cpq3_5_q2"
          },
          {
            "q": "What is the name of the ¹⁵N-labeled compound that the bacteria were grown on?",
            "choices": [
              "Ammonium sulfate",
              "Ammonia sulfuric acid",
              "Sulfur amide",
              "Nitrogen tetrahydrogen sulfate"
            ],
            "ans": 0,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "pe6-cp:50",
            "exp": "1. The passage gives (¹⁵NH₄)₂SO₄.\n2. Name the ions: NH₄⁺ = ammonium; SO₄²⁻ = sulfate → ammonium sulfate.\n3. Ionic salts are named by their ions, not as acid mixtures, amides or with covalent prefixes.\n4. Answer: ammonium sulfate.\n\n**Rule to reuse:** name a salt cation first, anion second: NH₄⁺ ammonium, SO₄²⁻ sulfate, Cl⁻ chloride.",
            "id": "p_cpq3_5_q3"
          },
          {
            "q": "What is the approximate average energy per photon at the frequency used by the NMR spectrometer described in the passage? (Note: h = 6.63 × 10⁻³⁴ J•s.)",
            "choices": [
              "1.5 × 10⁻²⁵ J",
              "2.5 × 10⁻²⁵ J",
              "3.5 × 10⁻²⁵ J",
              "4.5 × 10⁻²⁵ J"
            ],
            "ans": 1,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "physics",
            "twin": "pe6-cp:51",
            "exp": "1. The ¹⁹F frequency is 376 MHz = 3.76 × 10⁸ Hz.\n2. E = hf = 6.63 × 10⁻³⁴ × 3.76 × 10⁸ ≈ 2.5 × 10⁻²⁵ J.\n3. The other values do not match hf at 376 MHz.\n4. Answer: 2.5 × 10⁻²⁵ J.\n\n**Rule to reuse:** E = hf with f in Hz (MHz × 10⁶).",
            "id": "p_cpq3_5_q4"
          },
          {
            "q": "The constant γ for a nucleus analyzed by NMR can be calculated from the equation γ = 2π•f•B⁻¹, where f is the frequency (MHz) and B is the magnetic field strength (T). What is the numerical value of γ for ¹⁹F based on the passage?",
            "choices": [
              "80 × 2π MHz•T⁻¹",
              "60 × 2π",
              "40 × 2π",
              "20 × 2π"
            ],
            "ans": 2,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "physics",
            "twin": "pe6-cp:52",
            "exp": "1. ¹⁹F resonates at f = 376 MHz in B = 9.40 T.\n2. γ = 2π × 376 ÷ 9.40 = 40 × 2π MHz•T⁻¹.\n3. 80 doubles it, 20 halves it, and 60 matches no ratio of the data.\n4. Answer: 40 × 2π.\n\n**Rule to reuse:** γ/2π = f ÷ B for that nucleus.",
            "id": "p_cpq3_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "The azimuthal quantum number is a measure of which of the following?",
        "choices": [
          "Approximate radial size of an electron cloud",
          "Approximate shape of an electron cloud",
          "Number of valence electrons that orbit a nucleus",
          "Number of protons and neutrons found in the nucleus of an atom"
        ],
        "ans": 1,
        "cat": "4E",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "gen_chem",
        "twin": "sample-cp:29",
        "exp": "1. The azimuthal quantum number is l.\n2. n → size and energy; l → shape (s, p, d, f); m_l → orientation; m_s → spin.\n3. Size belongs to n; valence electrons and nucleons are not quantum numbers.\n4. Answer: approximate shape of an electron cloud.\n\n**Rule to reuse:** n sets size, l sets shape, m_l sets orientation, m_s sets spin.",
        "id": "cp_q3_sa1"
      },
      {
        "q": "During fermentation, diacetyl CH₃C(=O)C(=O)CH₃ is reduced to 2,3-butanediol CH₃CH(OH)CH(OH)CH₃ by NADH. What is the balanced reaction for this conversion?",
        "choices": [
          "Diacetyl + 2NADH → 2,3-butanediol + 2NAD⁺",
          "Diacetyl + 2NADH + 2H⁺ → 2,3-butanediol + 2NAD⁺",
          "Diacetyl + NADH + 2H⁺ → 2,3-butanediol + NAD⁺",
          "Diacetyl + NADH + H⁺ → 2,3-butanediol + NAD⁺"
        ],
        "ans": 1,
        "cat": "4E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "biochemistry",
        "twin": "sample-cp:59",
        "exp": "1. Both C=O groups become CH–OH.\n2. Each needs H⁻ (from NADH) + H⁺ → 2 carbonyls = 2NADH + 2H⁺ → 2NAD⁺; charge +2 = +2 ✓.\n3. Without H⁺ the charge fails; one NADH reduces only one carbonyl.\n4. Answer: Diacetyl + 2NADH + 2H⁺ → 2,3-butanediol + 2NAD⁺.\n\n**Rule to reuse:** one NADH + one H⁺ per C=O reduced; check atoms and charge.",
        "id": "cp_q3_sa2"
      },
      {
        "q": "A common column material used in size-exclusion chromatography is agarose, a polysaccharide of galactose. Which type of interaction most likely occurs between proteins and the agarose column material?",
        "choices": [
          "Aromatic",
          "Hydrophobic",
          "Salt bridge",
          "Hydrogen bonding"
        ],
        "ans": 3,
        "cat": "5C",
        "skill": "SIRS 3",
        "diff": "D",
        "subj": "biochemistry",
        "twin": "pe3-cp:46",
        "exp": "1. Agarose is a sugar polymer covered with –OH groups.\n2. Sugar –OH groups ↔ polar protein groups → hydrogen bonds.\n3. Agarose has no aromatic rings, no greasy chains and no charges.\n4. Answer: hydrogen bonding.\n\n**Rule to reuse:** sugar –OH → hydrogen bonding; alkyl chains → hydrophobic; charged groups → salt bridges.",
        "id": "cp_q3_sa3"
      },
      {
        "q": "A person, whose eye has a lens-to-retina distance of 2.5 cm, can only clearly see objects that are closer than 0.50 m away. What is the strength S of the person's eye lens? (Note: Use the thin lens formula.)",
        "choices": [
          "−40 D",
          "−8 D",
          "42 D",
          "48 D"
        ],
        "ans": 2,
        "cat": "4D",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe1-cp:11",
        "exp": "1. The relaxed eye focuses its far point, 0.50 m, onto the retina, 0.025 m away.\n2. S = 1/o + 1/i = 1/0.50 + 1/0.025 = 2 + 40 = 42 D.\n3. A focusing eye lens is converging, so negative values fail; 48 D adds the wrong terms.\n4. Answer: 42 D.\n\n**Rule to reuse:** S = 1/o + 1/i in metres; the far point is the object distance.",
        "id": "cp_q3_sa4"
      },
      {
        "q": "The equation for calculating mean arterial pressure (MAP) is shown. MAP = [(2 × diastolic) + systolic]/3. What is the MAP of a person whose blood pressure is 128/80 mmHg?",
        "choices": [
          "76 mmHg",
          "80 mmHg",
          "96 mmHg",
          "104 mmHg"
        ],
        "ans": 2,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "biology",
        "twin": "pe4-cp:57",
        "exp": "1. Systolic = 128 (first), diastolic = 80 (second).\n2. (2 × 80 + 128)/3 = 288/3 = 96 mmHg.\n3. 80 is the diastolic alone, 104 the plain average, and 76 lies below diastolic.\n4. Answer: 96 mmHg.\n\n**Rule to reuse:** label each value, substitute into the given formula, compute.",
        "id": "cp_q3_sa5"
      },
      {
        "q": "What is the identity of an atom that contains nine protons and ten neutrons?",
        "choices": [
          "Oxygen",
          "Fluorine",
          "Neon",
          "Potassium"
        ],
        "ans": 1,
        "cat": "4E",
        "skill": "SIRS 3",
        "diff": "D",
        "subj": "physics",
        "twin": "pe5-cp:10",
        "exp": "1. Identity is set by the proton count, Z.\n2. 9 protons → Z = 9 → fluorine (¹⁹F).\n3. Neon is Z = 10 (the neutron count), potassium Z = 19 (the mass number), oxygen Z = 8.\n4. Answer: fluorine.\n\n**Rule to reuse:** protons name the element; neutrons only change the isotope.",
        "id": "cp_q3_sa6"
      },
      {
        "q": "Which of the following substances is polar?",
        "choices": [
          "PCl₃",
          "CF₄",
          "CS₂",
          "Na₂"
        ],
        "ans": 0,
        "cat": "5B",
        "skill": "SIRS 4",
        "diff": "X",
        "subj": "gen_chem",
        "twin": "pe5-cp:11",
        "exp": "1. Polar = polar bonds in a shape that does not cancel them.\n2. PCl₃: 3 bonds + 1 lone pair → pyramidal → net dipole.\n3. CF₄ (tetrahedral) and CS₂ (linear) cancel; Na₂ has a nonpolar bond.\n4. Answer: PCl₃.\n\n**Rule to reuse:** a central lone pair (pyramidal, bent) makes a molecule polar; symmetric shapes with identical bonds are nonpolar.",
        "id": "cp_q3_sa7"
      },
      {
        "q": "In the lowest energy Lewis structure for methanimine, how many total covalent bonds exist between the C and N atoms in the molecule?",
        "choices": [
          "1",
          "2",
          "3",
          "4"
        ],
        "ans": 1,
        "cat": "5B",
        "skill": "SIRS 2",
        "diff": "X",
        "subj": "gen_chem",
        "twin": "pe6-cp:59",
        "exp": "1. CH₂NH has 4 + 5 + 3 = 12 valence electrons.\n2. Single bonds leave C short of an octet → C=N double bond + one lone pair on N → all octets.\n3. One bond leaves C with six electrons; three or four would exceed the electrons available.\n4. Answer: 2.\n\n**Rule to reuse:** count valence electrons, place single bonds, add bonds only until every atom has an octet.",
        "id": "cp_q3_sa8"
      }
    ]
  },
  {
    "id": "cp_half_4",
    "title": "Chem/Phys Quiz 4",
    "order": [
      "p_cpq4_1",
      "p_cpq4_2",
      4,
      "p_cpq4_3",
      "p_cpq4_4",
      "p_cpq4_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq4_1",
        "subj": "organic_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5C",
          "5B"
        ],
        "title": "SN1 and SN2 Reactions of Alcohols",
        "passage": "Nucleophilic substitution at a saturated carbon is one of the most widely studied reaction types in organic chemistry. Figure 1 shows a substitution that follows an SN2 mechanism, and Figure 2 shows one that follows an SN1 mechanism. In the SN2 mechanism, a nucleophile (Nu) displaces the leaving group (LG) in a single direct step. Because the nucleophile approaches the carbon from the side opposite the leaving group, the configuration at that carbon is inverted. In the SN1 mechanism, the leaving group departs first to give a carbocation intermediate. The planar carbocation can be attacked from either face, so the substituted carbon may end up with inverted or retained configuration. Figures 3 and 4 show the products of two such reactions.\n\nFigure 3 SN2 reaction of 1-hexanol: 1-hexanol reacts with HBr to give 1-bromohexane.\n\nFigure 4 Reaction of 2-methyl-2-pentanol: 2-methyl-2-pentanol reacts with HCl and HBr to give 2-chloro-2-methylpentane, 2-bromo-2-methylpentane and 2-methyl-2-pentene.\n\nThe reaction in Figure 3 speeds up when the concentration of the alcohol, the halide or H⁺ is raised. The reaction in Figure 4 speeds up when the concentration of the alcohol or H⁺ is raised, but its rate does not depend on the halide concentration.",
        "questions": [
          {
            "q": "If 2-hexanol replaces 1-hexanol in the reaction shown in Figure 3, the rate of substitution is less because:",
            "choices": [
              "the C–O bond in 2-hexanol is stronger than the C–O bond in 1-hexanol.",
              "there is a competing elimination reaction that slows the rate of substitution.",
              "there is more steric hindrance at the oxygen atom in 2-hexanol than in 1-hexanol, making protonation less likely.",
              "there is more steric hindrance at the 2-position of 2-hexanol than at the 1-position of 1-hexanol."
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 3",
            "diff": "D",
            "twin": "pe1-cp:6",
            "exp": "1. Figure 3 is SN2: the –OH is protonated, then Br⁻ pushes out water from the back side in one step.\n2. SN2 rate depends on crowding at the carbon that is attacked: 1° > 2°.\n3. C1 of 1-hexanol carries one carbon group; C2 of 2-hexanol carries two, so the back side is more crowded.\n4. C–O bond strengths are about the same, protonation of O is fast either way, and Br⁻ is too weak a base to drive elimination.\n\n**Rule to reuse:** in SN2, a more substituted carbon (1° → 2°) slows the rate by steric hindrance at that carbon.",
            "id": "p_cpq4_1_q1"
          },
          {
            "q": "If Reaction 2 (Figure 4) is repeated with HCl and 3-methyl-2-pentanol, which of the following compounds is NOT a direct product (without rearrangement)?",
            "choices": [
              "3-Chloro-3-methylpentane",
              "2-Chloro-3-methylpentane",
              "3-Methyl-2-pentene",
              "3-Methyl-1-pentene"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 3",
            "diff": "X",
            "twin": "pe1-cp:7",
            "exp": "1. 3-Methyl-2-pentanol loses water to give a secondary cation on C2, the carbon that held the –OH.\n2. Direct products keep Cl or the C=C at C2: 2-chloro-3-methylpentane, 3-methyl-2-pentene (H lost from C3) and 3-methyl-1-pentene (H lost from C1).\n3. A hydride shift from C3 gives a more stable tertiary cation on C3; only that cation puts Cl on C3.\n4. Answer: 3-chloro-3-methylpentane.\n\n**Rule to reuse:** a product with the new group on a carbon that never held the –OH needs a shifted carbocation.",
            "id": "p_cpq4_1_q2"
          },
          {
            "q": "If a solution containing the compounds shown in Figure 4 is injected into a gas-liquid chromatograph, the first peak observed in the gc trace is attributable to which compound?",
            "choices": [
              "2-Methyl-2-pentanol",
              "2-Methyl-2-pentene",
              "2-Chloro-2-methylpentane",
              "2-Bromo-2-methylpentane"
            ],
            "ans": 1,
            "cat": "5C",
            "skill": "SIRS 3",
            "diff": "M",
            "twin": "pe1-cp:8",
            "exp": "1. In gas chromatography the most volatile compound (lowest boiling point) reaches the detector first.\n2. 2-Methyl-2-pentanol hydrogen-bonds, so it boils highest.\n3. The chloride and bromide are polar and heavier than the alkene; the bromide is the heaviest.\n4. 2-Methyl-2-pentene has only London forces and the lowest mass. Answer: 2-methyl-2-pentene.\n\n**Rule to reuse:** first GC peak = most volatile: alkene before alkyl chloride before alkyl bromide before alcohol.",
            "id": "p_cpq4_1_q3"
          },
          {
            "q": "What is the product of the reaction of Compound A, (R)-1-deuterio-1-hexanol, with HBr by the pathway shown in Figure 3?",
            "choices": [
              "(R)-1-bromo-1-deuterioheptane",
              "(S)-1-bromo-1-deuterioheptane",
              "(S)-1-bromo-1-deuteriohexane",
              "(R)-1-bromo-1-deuteriohexane"
            ],
            "ans": 2,
            "cat": "5B",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe1-cp:9",
            "exp": "1. Compound A is (R)-1-deuterio-1-hexanol; Figure 3 is SN2, so Br⁻ attacks from the back and the carbon inverts.\n2. No carbon is added, so the product is a hexane, not a heptane.\n3. Priorities at C1: O (then Br) > pentyl > D > H. Br takes the –OH's top rank, so inversion turns R into S.\n4. Answer: (S)-1-bromo-1-deuteriohexane.\n\n**Rule to reuse:** SN2 inverts the stereocenter; when the nucleophile takes the leaving group's priority rank, R and S swap.",
            "id": "p_cpq4_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq4_2",
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5B",
          "5A",
          "4E"
        ],
        "title": "Methylamine and the Crushed-Can Demonstration",
        "passage": "A teacher carried out the following demonstration for a chemistry class. Eight grams of methylammonium chloride (CH₃NH₃Cl) and 8 g of strontium hydroxide (Sr(OH)₂) were placed in a side-arm flask. The flask was stoppered and warmed. Methylamine (CH₃NH₂) gas formed by the reaction in Equation 1.\n\n2CH₃NH₃Cl(s) + Sr(OH)₂(s) → 2CH₃NH₂(g) + 2H₂O(l) + SrCl₂(aq)   (Equation 1)\n\nThe CH₃NH₂ gas was led through a rubber tube into a dry, upright 16-oz aluminum drink can, filling it by upward displacement of air. The can was then sealed with plastic film and set, sealed side down, in a shallow tray holding about 2 cm of water. When the film was removed, the CH₃NH₂ dissolved rapidly in the water, and atmospheric pressure crushed the can. Like ammonia, methylamine is very soluble in water, and its molecules can both donate and accept hydrogen bonds. The can collapses because the gas dissolves faster than air can leak back in, so the pressure inside drops sharply.",
        "questions": [
          {
            "q": "The intermolecular forces that exist among the molecules of CH₃NH₂ gas are:",
            "choices": [
              "dipole–dipole forces only.",
              "London dispersion forces only.",
              "both dipole–dipole and London dispersion forces.",
              "neither dipole–dipole nor London dispersion forces."
            ],
            "ans": 2,
            "cat": "5B",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe4-cp:17",
            "exp": "1. Every molecule has London dispersion forces.\n2. CH₃NH₂ is polar (N–H and C–N bonds, a lone pair on N), so it also has dipole–dipole forces, including hydrogen bonds.\n3. Answer: both dipole–dipole and London dispersion forces.\n\n**Rule to reuse:** London forces are always present; polar molecules add dipole–dipole forces.",
            "id": "p_cpq4_2_q1"
          },
          {
            "q": "CH₃NH₂ acts as a weak base in water with Kb = 4.4 × 10⁻⁴ at 25°C. CH₃NH₂(aq) + H₂O(l) ⇌ CH₃NH₃⁺(aq) + OH⁻(aq). At 25°C, the equilibrium concentration of the CH₃NH₃⁺ ion in a 0.23 M aqueous solution of CH₃NH₂ would be closest to which of the following?",
            "choices": [
              "0.001 M",
              "0.01 M",
              "0.1 M",
              "1 M"
            ],
            "ans": 1,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe4-cp:18",
            "exp": "1. For a weak base, [CH₃NH₃⁺] = [OH⁻] = x and Kb ≈ x²/C.\n2. x ≈ √(Kb·C) = √(4.4 × 10⁻⁴ × 0.23) = √(1.0 × 10⁻⁴) = 0.01 M.\n3. Answer: 0.01 M.\n\n**Rule to reuse:** for a weak base, [BH⁺] ≈ √(Kb·C).",
            "id": "p_cpq4_2_q2"
          },
          {
            "q": "If ethane (C₂H₆) were substituted for CH₃NH₂ in the aluminum can, the crushing of the can would:",
            "choices": [
              "occur because C₂H₆, being polar, would dissolve in the water in the tray.",
              "occur because C₂H₆, being nonpolar, would dissolve in the water.",
              "not occur because C₂H₆, being polar, would not dissolve in the water in the tray.",
              "not occur because C₂H₆, being nonpolar, would not dissolve in the water."
            ],
            "ans": 3,
            "cat": "5A",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe4-cp:19",
            "exp": "1. The can is crushed only if the gas dissolves in the water, leaving low pressure inside.\n2. C₂H₆ has only C–C and C–H bonds: it is nonpolar.\n3. Like dissolves like, so nonpolar C₂H₆ barely dissolves in water; the pressure inside stays up.\n4. Answer: not occur, because C₂H₆, being nonpolar, would not dissolve.\n\n**Rule to reuse:** polar gases dissolve in water; nonpolar gases stay in the gas phase.",
            "id": "p_cpq4_2_q3"
          },
          {
            "q": "Sr(OH)₂ and SrCl₂ in the reaction shown in Equation 1 are best described as compounds of:",
            "choices": [
              "an alkali metal.",
              "an alkaline earth metal.",
              "a metalloid.",
              "a transition metal."
            ],
            "ans": 1,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:20",
            "exp": "1. Strontium is in group 2 of the periodic table.\n2. Group 2 metals are the alkaline earth metals; they form 2+ ions, as in Sr(OH)₂ and SrCl₂.\n3. Answer: an alkaline earth metal.\n\n**Rule to reuse:** group 1 = alkali metals (1+); group 2 = alkaline earth metals (2+).",
            "id": "p_cpq4_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq4_3",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5E",
          "5D"
        ],
        "title": "Sulfur Compounds and the Flavor of Leeks",
        "passage": "Sulfur compounds give leeks their characteristic flavor and properties. Compound A is the precursor of most of these flavor compounds and is converted to Compound B by the enzyme alliinase (Reaction 1, unbalanced). Alliinase depends on the cofactor pyridoxal phosphate (PLP, vitamin B6). PLP is a flat molecule containing a six-membered ring, a hydroxyl group, an aldehyde group and a phosphate group. PLP is bound covalently to alliinase as an aldimine with the side chain of the residue at position 248. During catalysis, this aldimine is exchanged for one formed with the substrate, which enables Reaction 1. Compound B is a highly reactive sulfenic acid whose pKa is estimated at 12.3. Compound B condenses rapidly and spontaneously to give Compound C, one of the main flavor compounds of leeks (Reaction 2). When a leek is cut, the cell contents mix and Compound B meets the enzyme lachrymatory factor synthase (LFS). LFS catalyzes Reaction 3, which forms Compound D, a strong lachrymator (tearing agent). Researchers hope to use these findings to produce flavorful leeks that do not cause tearing when they are cut.\n\nReaction 1 (unbalanced): Compound A, CH₃CH₂CH₂S(O)CH₂CH(NH₃⁺)COO⁻ → Compound B, CH₃CH₂CH₂SOH + CH₃COCOO⁻ (pyruvate)\n\nReaction 2: 2 Compound B → Compound C + H₂O\n\nReaction 3: Compound B → Compound D (catalyzed by LFS)",
        "questions": [
          {
            "q": "Based on the passage, which type of inhibitor will provide a flavorful leek that does not cause tearing? An inhibitor of:",
            "choices": [
              "Compound A synthesis",
              "alliinase",
              "Reaction 2",
              "LFS"
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:41",
            "exp": "1. Alliinase makes the sulfenic acid from Compound A; Reaction 2 turns sulfenic acid into the flavor; LFS turns it into the tearing factor.\n2. Blocking Compound A synthesis or alliinase stops the sulfenic acid, so no flavor forms.\n3. Blocking Reaction 2 removes the flavor itself.\n4. Blocking LFS keeps the flavor branch and stops the tearing factor. Answer: LFS.\n\n**Rule to reuse:** to keep one product and stop another, block the enzyme on the unwanted branch only.",
            "id": "p_cpq4_3_q1"
          },
          {
            "q": "When the covalent attachment to alliinase is broken, PLP is still held rigidly in the active site by a salt bridge and a π-stacking interaction. These interactions are most likely provided by the side chains of which amino acids? (Note: The salt bridging amino acid is listed first.)",
            "choices": [
              "Asp and Trp",
              "Glu and Ser",
              "Arg and Trp",
              "Lys and Ser"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:42",
            "exp": "1. PLP's phosphate is negative, so its salt-bridge partner must be positive: Arg or Lys.\n2. π-Stacking with PLP's pyridine ring needs an aromatic side chain: Trp (or Phe, Tyr).\n3. Asp and Glu are negative; Ser has no ring.\n4. Answer: Arg and Trp.\n\n**Rule to reuse:** salt bridge = opposite charges; π-stacking = aromatic ring.",
            "id": "p_cpq4_3_q2"
          },
          {
            "q": "Which reactant and product (one equivalent each) are necessary to balance Reaction 1?",
            "choices": [
              "Reactant = H₂O, product = NO₃⁻",
              "Reactant = H₂O, product = NH₄⁺",
              "Reactant = O₂, product = NO₃⁻",
              "Reactant = O₂, product = NH₄⁺"
            ],
            "ans": 1,
            "cat": "5E",
            "skill": "SIRS 2",
            "diff": "M",
            "twin": "pe5-cp:43",
            "exp": "1. Count atoms: the products shown (sulfenic acid and pyruvate) need one more O and two more H than Compound A supplies, and the N is not yet in a product.\n2. Water supplies the O and H.\n3. The leftover N with four H and a + charge is NH₄⁺; this balances pyruvate's − charge.\n4. Answer: reactant H₂O, product NH₄⁺.\n\n**Rule to reuse:** balance each element, add water for missing O and H, then check the charges.",
            "id": "p_cpq4_3_q3"
          },
          {
            "q": "Which energy features characterize the energy profile of Reaction 2?",
            "choices": [
              "High Ea and ΔG > 0",
              "High Ea and ΔG < 0",
              "Low Ea and ΔG > 0",
              "Low Ea and ΔG < 0"
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 4",
            "diff": "X",
            "subj": "gen_chem",
            "twin": "pe5-cp:44",
            "exp": "1. The passage says Reaction 2 happens quickly and on its own.\n2. Fast means a low activation energy.\n3. Spontaneous means ΔG < 0.\n4. Answer: low Ea and ΔG < 0.\n\n**Rule to reuse:** fast → low Ea; spontaneous → ΔG < 0.",
            "id": "p_cpq4_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq4_4",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5E",
          "5D"
        ],
        "title": "Epigenetic Modification and i-Motif Stability",
        "passage": "Quadruplexes are DNA secondary structures that can form in G-rich or C-rich sequences, either from four separate single strands or by the folding of one single strand. C-rich i-motifs (iMs) form when hemiprotonated C–C⁺ base pairs intercalate and stabilize the structure. In mammalian cells, iMs can carry two epigenetic modifications: methylation and hydroxymethylation. The presence of 5-methylcytosine (5mC) or 5-hydroxymethylcytosine (5hmC) in a C-rich sequence may therefore change iM stability. To test this, researchers subjected three 24-nucleotide sequences to pH and thermal denaturation. The wild-type (WT) sequence was 5′–TACCCTTCCCTACCCCTTCCCTAT–3′, and the modified sequences carried either a 5mC (5mC-WT) or a 5hmC (5hmC-WT) at position four. The pH-dependent unfolding of each oligonucleotide was followed by circular dichroism (CD) spectroscopy. The CD signal was recorded at 288 nm, and the DNA concentration was 4 μM. Figure 1 gives the results as the transition pH (pK) and the slope of the transition for each oligonucleotide: WT, pK 6.6 and slope 3.2; 5mC-WT, pK 6.2 and slope 2.1; 5hmC-WT, pK 6.0 and slope 1.8. Thermal denaturation was also followed at 288 nm. The midpoints of denaturation for WT, 5mC-WT and 5hmC-WT were 44.0 °C, 41.2 °C and 39.8 °C, respectively.",
        "figure": {
          "caption": "Figure 1 pH-dependent unfolding of the three oligonucleotides (CD at 288 nm)",
          "columns": ["Oligonucleotide", "Transition pH (pK)", "Slope of the transition"],
          "rows": [["WT", "6.6", "3.2"], ["5mC-WT", "6.2", "2.1"], ["5hmC-WT", "6.0", "1.8"]]
        },
        "questions": [
          {
            "q": "Which two classes of enzymes are needed in the two-step conversion of cytosine to 5-hydroxymethylcytosine (5hmC)?",
            "choices": [
              "Transferase and oxidoreductase",
              "Hydrolase and ligase",
              "Oxidoreductase and hydrolase",
              "Transferase and ligase"
            ],
            "ans": 0,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:40",
            "exp": "1. Step 1: a methyl group is moved from a donor (SAM) to C5, giving 5mC: a transferase.\n2. Step 2: the methyl is oxidized to –CH₂OH with O₂, giving 5hmC: an oxidoreductase.\n3. No water splits a bond (not a hydrolase) and no ATP-driven joining (not a ligase).\n4. Answer: transferase and oxidoreductase.\n\n**Rule to reuse:** group moved from a donor → transferase; oxidation → oxidoreductase; water splits a bond → hydrolase; ATP-driven joining → ligase.",
            "id": "p_cpq4_4_q1"
          },
          {
            "q": "What is the correct expression for the ΔG′° for the transition observed in the experiments described in the passage?",
            "choices": [
              "ΔG′° = –RTe([native]/[unfolded])",
              "ΔG′° = –RTe([unfolded]/[native])",
              "ΔG′° = –RTln([native]/[unfolded])",
              "ΔG′° = –RTln([unfolded]/[native])"
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe3-cp:41",
            "exp": "1. ΔG′° = –RT ln K, so the e forms are out.\n2. The transition observed is unfolding, native → unfolded, so K = [unfolded]/[native].\n3. Answer: ΔG′° = –RTln([unfolded]/[native]).\n\n**Rule to reuse:** ΔG° = –RT ln K, with K = products over reactants for the transition named.",
            "id": "p_cpq4_4_q2"
          },
          {
            "q": "Which statement about the unfolding cooperativity and pK of the oligonucleotides is consistent with the data in Figure 1?",
            "choices": [
              "The oligonucleotide with the highest pK displays the highest unfolding cooperativity.",
              "The oligonucleotide with the lowest pK displays the highest unfolding cooperativity.",
              "The second highest pK displays the highest cooperativity.",
              "The second highest pK displays the lowest cooperativity."
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 4",
            "diff": "X",
            "twin": "pe3-cp:42",
            "exp": "1. Cooperativity is the steepness of the unfolding curve; pK is its midpoint.\n2. In Figure 1 the steepest curve belongs to the oligonucleotide with the highest pK.\n3. Answer: the oligonucleotide with the highest pK displays the highest unfolding cooperativity.\n\n**Rule to reuse:** read steepness for cooperativity and the midpoint for pK, then match them.",
            "id": "p_cpq4_4_q3"
          },
          {
            "q": "Based on the information in the passage and in Figure 1, what effect does epigenetic modification have on iM pH-dependent denaturation?",
            "choices": [
              "Both methylation and hydroxymethylation result in significantly decreased stability because cytosine is more readily deprotonated.",
              "Both methylation and hydroxymethylation result in significantly decreased stability because cytosine is more readily protonated.",
              "Only hydroxymethylation results in significantly decreased stability because cytosine is more readily deprotonated.",
              "Only hydroxymethylation results in significantly decreased stability because cytosine is more readily protonated."
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:43",
            "exp": "1. The iM needs protonated cytosine (C⁺); losing that proton unfolds it.\n2. In Figure 1, both the 5mC and the 5hmC versions have a clearly lower pK than WT, so both unfold at a lower pH.\n3. A lower pK means cytosine gives up its proton more readily: it is more readily deprotonated.\n4. Answer: both modifications decrease stability because cytosine is more readily deprotonated.\n\n**Rule to reuse:** when a structure needs a protonated base, a lower pK means easier deprotonation and less stability.",
            "id": "p_cpq4_4_q4"
          },
          {
            "q": "The complement to the WT sequence does NOT contain which nucleoside?",
            "choices": [
              "Deoxyadenosine",
              "Deoxycytidine",
              "Deoxyguanosine",
              "Deoxythymidine"
            ],
            "ans": 1,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "biology",
            "twin": "pe3-cp:44",
            "exp": "1. The WT sequence contains no G.\n2. In the complement, each C pairs with G and each G with C; with no G in WT, no C appears in the complement.\n3. Answer: deoxycytidine.\n\n**Rule to reuse:** the complement lacks the partner of the base the template lacks.",
            "id": "p_cpq4_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq4_5",
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5A",
          "4E",
          "4C",
          "5D"
        ],
        "title": "Virus-Built Wires for a Battery Electrode",
        "passage": "Researchers used the biosynthetic machinery of viruses to build nanometer-scale wires and showed that they work in small lithium ion batteries. Lithium ion batteries of this type run at about 4.1 V according to Reaction 1.\n\nLiC₆ + MnO₂ → C₆ + LiMnO₂   (Reaction 1)\n\nViruses were engineered to make altered copies of an envelope protein that sits on the outside of the virus and shields its DNA. The altered protein carried four glutamate residues at its N-terminus. The engineered virus particles were treated with 2.0 mL of 4.0 mM MnCl₂(aq), which causes the cation to bind. Reduction to the metal followed by oxidation in air coated the viruses with Mn₃O₄, according to chemical analysis. The coated viruses were 80% Mn₃O₄ by mass. A battery was built with Li(s) as one electrode and, as the other, a carbon rod covered with 15.0 mg of Mn₃O₄-coated viruses. Between the two electrodes was a compartment of LiBF₄ dissolved in ethylene carbonate. After 25 charge–discharge cycles, the battery held a maximum charge per unit mass of coating of 550 mAh/g. A peptide with the sequence SVSVGMKPSPRP was found to bind strongly to colloidal silver particles. The virus was then altered so that it made envelope proteins with the N-terminal EEEE sequence as well as a smaller fraction carrying the silver-binding motif. Treatment with colloidal silver (4 × 10¹³ particles/mL) and MnCl₂ (4.0 mM), followed by reduction and air oxidation, gave hybrid virus particles covered with both silver and Mn₃O₄. A battery built the same way, but with 5.0 mg of hybrid virus particles, held a maximum charge per unit mass of coating of 750 mAh/g.",
        "questions": [
          {
            "q": "The solution used to treat the engineered virus particles contained a total of how many moles of MnCl₂?",
            "choices": [
              "8 μmol",
              "80 μmol",
              "160 μmol",
              "1.6 mmol"
            ],
            "ans": 0,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:38",
            "exp": "1. n = M × V; mM × mL = μmol.\n2. 4.0 mM × 2.0 mL = 8 μmol of MnCl₂.\n3. Answer: 8 μmol.\n\n**Rule to reuse:** n = M × V with matched prefixes (mM × mL = μmol).",
            "id": "p_cpq4_5_q1"
          },
          {
            "q": "Which expression gives the mass of Mn ions (in mg units) in the battery experiment involving the Mn₃O₄ (MM = 228.8 g/mol) coated virus particles?",
            "choices": [
              "15.0 × 0.80 × 54.94/228.8",
              "15.0 × 0.80 × 228.8/(3 × 54.94)",
              "15.0 × 0.80 × 3 × 54.94/228.8",
              "15.0 × 0.80 × 3 × 228.8/54.94"
            ],
            "ans": 2,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:39",
            "exp": "1. The battery used 15.0 mg of coated viruses that were 80% Mn₃O₄: 15.0 × 0.80 = 12.0 mg of Mn₃O₄.\n2. Each Mn₃O₄ holds three Mn, so the Mn fraction is 3 × 54.94/228.8.\n3. m(Mn) = 15.0 × 0.80 × 3 × 54.94/228.8 ≈ 8.6 mg; the other expressions drop the 3 or flip the ratio.\n4. Answer: 15.0 × 0.80 × 3 × 54.94/228.8.\n\n**Rule to reuse:** element mass = sample mass × (atoms × atomic mass / formula mass).",
            "id": "p_cpq4_5_q2"
          },
          {
            "q": "E°red for the half-reaction shown is 1.2 V. MnO₂(s) + e⁻ + Li⁺ → LiMnO₂(s). What is the value of the reduction potential E°red for C₆(s) + Li⁺ + e⁻ → LiC₆(s)?",
            "choices": [
              "4.1 V",
              "0.3 V",
              "−1.2 V",
              "−2.9 V"
            ],
            "ans": 3,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:41",
            "exp": "1. E°cell = E°cathode – E°anode; the passage gives E°cell = 4.1 V.\n2. E°anode = 1.2 – 4.1 = −2.9 V.\n3. Answer: −2.9 V.\n\n**Rule to reuse:** E°anode = E°cathode – E°cell.",
            "id": "p_cpq4_5_q3"
          },
          {
            "q": "Based on the passage, which functional group has a high affinity for the Mn(II) ion?",
            "choices": [
              "Amide",
              "Carboxylate",
              "Imidazole",
              "Hydroxyl"
            ],
            "ans": 1,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "X",
            "subj": "organic_chem",
            "twin": "pe6-cp:42",
            "exp": "1. The passage says the glutamate-rich peptides bind Mn(II).\n2. Glutamate's side chain is –COO⁻, a carboxylate; its negative oxygens attract the cation.\n3. Answer: carboxylate.\n\n**Rule to reuse:** find the residue that binds the metal, then name its group: Asp/Glu → carboxylate, His → imidazole.",
            "id": "p_cpq4_5_q4"
          },
          {
            "q": "What was the role of the LiBF₄ solution in the experiment described in the passage?",
            "choices": [
              "Anode",
              "Oxidizing agent",
              "Electrolyte",
              "Cathode"
            ],
            "ans": 2,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:43",
            "exp": "1. The LiBF₄ solution sits between the electrodes.\n2. Its Li⁺ and BF₄⁻ ions carry charge between anode and cathode; it is not oxidized or reduced.\n3. Answer: electrolyte.\n\n**Rule to reuse:** anode = oxidized, cathode = reduced, electrolyte = the ion-carrying solution between them.",
            "id": "p_cpq4_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "An ultrasound examination could show the motion of a heart valve. In order to image this motion, the ultrasound examination device requires what minimal information?",
        "choices": [
          "The speeds of the sound and of the moving object.",
          "The speed of the sound, and the frequencies of the sound waves emitted and observed.",
          "The speeds of the sound and of the moving object, and the frequencies emitted and observed.",
          "The speeds of the sound and of the moving object, and the frequencies and wavelengths emitted and observed."
        ],
        "ans": 1,
        "cat": "4D",
        "skill": "SIRS 1",
        "diff": "E",
        "subj": "physics",
        "twin": "sample-cp:27",
        "exp": "1. Doppler imaging finds the valve's speed from the shift between emitted and observed frequencies.\n2. Turning that shift into a speed needs the speed of sound.\n3. The valve's speed is the unknown, so it is not an input; wavelengths add nothing new.\n4. Answer: the speed of the sound and the emitted and observed frequencies.\n\n**Rule to reuse:** Doppler speed needs both frequencies and the wave speed.",
        "id": "cp_q4_sa1"
      },
      {
        "q": "Which measurement unit CANNOT be used to express power?",
        "choices": [
          "kg·m²·s²",
          "J·s⁻¹",
          "cal·s⁻¹",
          "W"
        ],
        "ans": 0,
        "cat": "4A",
        "skill": "SIRS 1",
        "diff": "E",
        "subj": "physics",
        "twin": "pe1-cp:59",
        "exp": "1. Power = energy per time: W = J/s = kg·m²·s⁻³.\n2. J·s⁻¹ and cal·s⁻¹ are energy per second; W is the watt.\n3. kg·m²·s² has s to the +2 power: not power.\n4. Answer: kg·m²·s².\n\n**Rule to reuse:** power reduces to kg·m²·s⁻³ (J/s).",
        "id": "cp_q4_sa2"
      },
      {
        "q": "A tall tube is evacuated, and its stopcock closed. The open end of the tube is immersed into a container of oil (density 0.8 × 10³ kg/m³) that is open to the atmosphere (pressure 10⁵ N/m²). When the stopcock is opened, how far up the tube will the oil rise?",
        "choices": [
          "1.25 m",
          "6.25 m",
          "12.5 m",
          "25 m"
        ],
        "ans": 2,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe3-cp:58",
        "exp": "1. The oil rises until ρgh equals atmospheric pressure.\n2. h = P/(ρg) = 10⁵/(0.8 × 10³ × 10) = 12.5 m.\n3. Answer: 12.5 m.\n\n**Rule to reuse:** h = P/(ρg); a less dense liquid rises higher.",
        "id": "cp_q4_sa3"
      },
      {
        "q": "Which of the following is a third period element that is a covalent network solid in its standard state?",
        "choices": [
          "Silicon",
          "Arsenic",
          "Sulfur",
          "Bromine"
        ],
        "ans": 0,
        "cat": "4E",
        "skill": "SIRS 1",
        "diff": "E",
        "subj": "gen_chem",
        "twin": "pe3-cp:59",
        "exp": "1. Covalent network elements include B, C and Si.\n2. Arsenic and bromine are not in period 3; sulfur is molecular (S₈).\n3. Answer: silicon.\n\n**Rule to reuse:** network solids: B, C, Si; check the period asked.",
        "id": "cp_q4_sa4"
      },
      {
        "q": "If a thin wire is placed between a screen and a bright source of light, a pattern of parallel dark and bright fringes appears on the screen. The phenomenon best explaining the formation of this pattern is:",
        "choices": [
          "refraction.",
          "polarization.",
          "diffraction.",
          "reflection."
        ],
        "ans": 2,
        "cat": "4D",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe4-cp:46",
        "exp": "1. Light bending around the edges of a thin obstacle spreads and interferes.\n2. That produces parallel bright and dark fringes.\n3. Answer: diffraction.\n\n**Rule to reuse:** fringes from edges, slits or thin obstacles → diffraction.",
        "id": "cp_q4_sa5"
      },
      {
        "q": "Two open beakers I and II contain different volumes of the same liquid. Suppose that the pressure is measured at a point 20 cm below the surface of the liquid in each container. How will the pressures compare?",
        "choices": [
          "The pressures will be equal.",
          "Pressure in beaker I will be less.",
          "Pressure in beaker II will be less.",
          "The pressures cannot be compared from the information given."
        ],
        "ans": 0,
        "cat": "4B",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "physics",
        "twin": "pe5-cp:9",
        "exp": "1. P = P_atm + ρgh.\n2. Same liquid (same ρ), same depth, both open: the same pressure.\n3. Volume and container shape do not enter.\n4. Answer: the pressures will be equal.\n\n**Rule to reuse:** pressure at a depth depends only on ρ, g and depth.",
        "id": "cp_q4_sa6"
      },
      {
        "q": "An object O is at a distance of four focal lengths from the center of a convex lens. What is the ratio of the height of the image to the height of the object?",
        "choices": [
          "1/4",
          "1/3",
          "3/4",
          "4/3"
        ],
        "ans": 1,
        "cat": "4D",
        "skill": "SIRS 2",
        "diff": "X",
        "subj": "physics",
        "twin": "pe1-cp:45",
        "exp": "1. 1/i = 1/f – 1/(4f) = 3/(4f), so i = 4f/3.\n2. Ratio = i/o = (4f/3)/(4f) = 1/3.\n3. Answer: 1/3.\n\n**Rule to reuse:** solve 1/f = 1/o + 1/i for i, then the height ratio is i/o.",
        "id": "cp_q4_sa7"
      },
      {
        "q": "Many antistatic brushes use the α-emitter ²¹⁰Po. Which of the following atoms is initially left behind by this decay?",
        "choices": [
          "²⁰⁶Rn",
          "²⁰⁶Pb",
          "²⁰⁸At",
          "²⁰⁸Bi"
        ],
        "ans": 1,
        "cat": "4E",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "physics",
        "twin": "pe6-cp:58",
        "exp": "1. α emission: A – 4, Z – 2.\n2. Po (Z = 84) → Z = 82, A = 206: lead.\n3. Answer: ²⁰⁶Pb.\n\n**Rule to reuse:** α decay: A – 4, Z – 2.",
        "id": "cp_q4_sa8"
      }
    ]
  },
  {
    "id": "cp_half_5",
    "title": "Chem/Phys Quiz 5",
    "order": [
      "p_cpq5_1",
      "p_cpq5_2",
      4,
      "p_cpq5_3",
      "p_cpq5_4",
      "p_cpq5_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq5_1",
        "figures": [{"type":"svg","caption":"Figure 1 The ¹⁸⁸W/¹⁸⁸Re generator","alt":"Saline enters the top of a glass tube, flows over an aluminum oxide column holding ¹⁸⁸W, and leaves at the bottom as eluate containing Na¹⁸⁸ReO₄.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 360' width='560' height='360' font-family='sans-serif' font-size='20'><path d='M240 8V50M232 40L240 52L248 40' fill='none' stroke='#1d4ed8' stroke-width='3'/><text x='260' y='34'>Saline in</text><rect x='200' y='60' width='80' height='230' rx='10' fill='#f8fafc' stroke='#222' stroke-width='2.5'/><rect x='232' y='290' width='16' height='20' fill='#f8fafc' stroke='#222' stroke-width='2'/><rect x='206' y='130' width='68' height='110' fill='#d6c08a' stroke='#7a6a3a' stroke-width='2'/><path d='M274 185H310M200 95H172' stroke='#222' stroke-width='2'/><text x='316' y='180'>Al₂O₃ column</text><text x='316' y='206'>with ¹⁸⁸W bound</text><text x='166' y='101' text-anchor='end'>Glass tube</text><path d='M240 314V346M232 336L240 348L248 336' fill='none' stroke='#1d4ed8' stroke-width='3'/><text x='260' y='338'>Eluate out: Na¹⁸⁸ReO₄</text></svg>"}],
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4E",
          "4D",
          "4A"
        ],
        "title": "A Rhenium-188 Generator for Heart Imaging",
        "passage": "A hospital uses radioactive rhenium-188 (¹⁸⁸Re) for the nuclear angiography of a patient's heart, after Doppler ultrasound indicates that a lesion constricts the artery leading out of the left ventricle. The ¹⁸⁸Re necessary for the procedure is generated by a tungsten-188/rhenium-188 (¹⁸⁸W/¹⁸⁸Re) generator. In the generator, the radioactive ¹⁸⁸W adheres to an aluminum oxide column placed inside a glass tube. The ¹⁸⁸W decays to ¹⁸⁸Re, releasing a beta particle β⁻ and an antineutrino. To extract the ¹⁸⁸Re, a saline solution is passed through the glass tube and over the aluminum oxide column, as shown in Figure 1, a schematic in which saline enters at the top of the tube, flows over the column and leaves at the bottom as the eluate. The resulting eluate is sodium perrhenate (Na¹⁸⁸ReO₄).\n\nIn order for the perrhenate to be used as a tag for red blood cells, the hospital combines it with a stannous solution (such as stannous chloride), and Reaction 1 occurs: 2ReO₄⁻ + 3Sn²⁺ + 16H⁺ → 2Re⁴⁺ + 3Sn⁴⁺ + 8H₂O. This solution is introduced into a patient prior to a test that involves observing the heart at rest and during exercise on a stationary bicycle with a load of 25 W. ¹⁸⁸Re decays to ¹⁸⁸Os, emitting 155-keV gamma photons detected by a suitable camera. The resulting image of blood flow around and through the heart allows an accurate diagnosis of the patient's circulatory system. The radioactivity of ¹⁸⁸Re is shown in Table 1.",
        "figure": {
          "caption": "Table 1 Radioactivity of ¹⁸⁸Re",
          "columns": [
            "Time (h)",
            "Activity (MBq)"
          ],
          "rows": [
            [
              "0",
              "800"
            ],
            [
              "17",
              "400"
            ],
            [
              "34",
              "200"
            ],
            [
              "51",
              "100"
            ],
            [
              "68",
              "50"
            ]
          ]
        },
        "questions": [
          {
            "q": "Based on the information in Table 1, what is the half-life of ¹⁸⁸Re?",
            "choices": [
              "17 h",
              "34 h",
              "51 h",
              "68 h"
            ],
            "ans": 0,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "sample-cp:53",
            "exp": "1. Find when the activity is half its starting value.\n2. It halves every 17 h (and falls to a quarter by 34 h).\n3. 34, 51 and 68 h are two, three and four half-lives.\n**Rule to reuse:** half-life is the time for any reading to fall to half.",
            "id": "p_cpq5_1_q1"
          },
          {
            "q": "The electrically charged particle emitted during the decay of ¹⁸⁸W is:",
            "choices": [
              "a photon.",
              "a neutrino.",
              "an electron.",
              "a positron."
            ],
            "ans": 2,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "M",
            "twin": "sample-cp:54",
            "exp": "1. ¹⁸⁸W (Z = 74) decays to ¹⁸⁸Re (Z = 75): A stays the same and Z rises by 1.\n2. That is β⁻ decay: a neutron becomes a proton and an electron and an antineutrino leave.\n3. The photon and the (anti)neutrino carry no charge; a positron would lower Z.\n**Rule to reuse:** Z up by 1 = β⁻ (electron); Z down by 1 = β⁺ (positron).",
            "id": "p_cpq5_1_q2"
          },
          {
            "q": "The advantage of the Doppler ultrasound technique over the standard ultrasound technique is that it also allows:",
            "choices": [
              "distinguishing between fluids and tissue.",
              "measuring the blood flow.",
              "measuring the tissue density.",
              "measuring the artery wall thickness."
            ],
            "ans": 1,
            "cat": "4D",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "sample-cp:55",
            "exp": "1. Standard (pulse-echo) ultrasound times echoes, so it shows boundaries, depths and thicknesses and tells fluid from tissue.\n2. Doppler adds the frequency shift from a moving reflector, which gives its speed.\n3. Moving red blood cells shift the echo, so Doppler measures blood flow.\n**Rule to reuse:** pulse-echo shows where things are; Doppler adds how fast they move.",
            "id": "p_cpq5_1_q3"
          },
          {
            "q": "What is the work done by the patient during a 4-minute exercise on the bicycle?",
            "choices": [
              "6000 J",
              "100 J",
              "9.6 J",
              "0.10 J"
            ],
            "ans": 0,
            "cat": "4A",
            "skill": "SIRS 2",
            "diff": "M",
            "twin": "sample-cp:56",
            "exp": "1. The passage gives the power: 25 W.\n2. Time in seconds: 4 min × 60 = 240 s.\n3. W = P × t = 25 W × 240 s = 6000 J.\n4. 100 J keeps minutes; 9.6 J and 0.10 J divide instead of multiply.\n**Rule to reuse:** work = power (W) × time (s).",
            "id": "p_cpq5_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq5_2",
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4E",
          "5E",
          "5B"
        ],
        "title": "An Uncompetitive Inhibitor of HIV-2 Protease",
        "passage": "Human immunodeficiency virus 2 (HIV-2) protease inhibitors have been successful at lowering HIV-2 levels and slowing the onset of acquired immune deficiency syndrome (AIDS). However, because HIV-2 mutants are developing resistance to current protease inhibitors, new inhibitors such as Compound A (molar mass: 362 g•mol⁻¹) are being tested. Compound A contains a benzene ring, a C=O group, an N–N=N unit in a triazole ring, and an N–H group. Compound A has been shown to inhibit HIV-2 protease with Ki = 40.0 μM (Table 1). Ki is the dissociation constant for the enzyme-bound inhibitor, which is either EA or ESA, depending on the type of inhibitor. The peptide substrate for HIV-2 protease is KARVLFEAM. HIV-2 protease hydrolyzes only the peptide bond after leucine and before phenylalanine.\n\nNote: HIV-2 protease follows Michaelis–Menten kinetics. A Lineweaver–Burk plot of Vo⁻¹ versus [S]⁻¹, both without Compound A and with different concentrations of Compound A, generates a set of parallel straight lines with positive slopes.",
        "figure": {
          "caption": "Table 1 Kinetic parameters of HIV-2 protease with and without Compound A",
          "columns": [
            "Compound A (μM)",
            "KM (mM)",
            "kcat (s⁻¹)",
            "kcat/KM (mM⁻¹ s⁻¹)",
            "Ki (μM)"
          ],
          "rows": [
            [
              "0",
              "2.10",
              "0.252",
              "0.120",
              "—"
            ],
            [
              "40.0",
              "1.05",
              "0.126",
              "0.120",
              "40.0"
            ],
            [
              "80.0",
              "0.70",
              "0.084",
              "0.120",
              "40.0"
            ]
          ]
        },
        "questions": [
          {
            "q": "What quantity of Compound A must be provided to prepare 100.00 mL of solution with a concentration equal to Ki?",
            "choices": [
              "36.2 mg",
              "18.1 mg",
              "2.90 mg",
              "1.45 mg"
            ],
            "ans": 3,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe5-cp:1",
            "exp": "1. Ki = 40.0 μM = 4.00 × 10⁻⁵ M; V = 0.10000 L.\n2. Moles = 4.00 × 10⁻⁵ × 0.1000 = 4.00 × 10⁻⁶ mol.\n3. Mass = 4.00 × 10⁻⁶ mol × 362 g/mol = 1.45 × 10⁻³ g = 1.45 mg.\n**Rule to reuse:** mass = M × V (L) × molar mass; convert μM and mL first.",
            "id": "p_cpq5_2_q1"
          },
          {
            "q": "If only [A] is increased, then [ESA] or [EA] increases. This is an example of:",
            "choices": [
              "the Bose–Einstein Principle.",
              "the Heisenberg Uncertainty Principle.",
              "the Le Châtelier's Principle.",
              "the Pauli Exclusion Principle."
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:2",
            "exp": "1. E + A ⇌ EA and ES + A ⇌ ESA are equilibria.\n2. Adding A, a reactant, shifts both toward the complexes until Q = K again.\n3. A shift that offsets an added species is Le Châtelier's principle; the other three describe particles and electrons, not equilibria.\n**Rule to reuse:** an equilibrium shifting after a species is added or removed = Le Châtelier's principle.",
            "id": "p_cpq5_2_q2"
          },
          {
            "q": "Which structural change to Compound A would make it more water soluble?",
            "choices": [
              "Replacing benzene CH with N in the ring",
              "Replacing the C=O group with C=CH₂",
              "Replacing the N–N=N group with CH–CH=CH",
              "Replacing the ring NH with NCH₃"
            ],
            "ans": 0,
            "cat": "5B",
            "skill": "SIRS 4",
            "diff": "X",
            "twin": "pe5-cp:3",
            "exp": "1. Water dissolves what it can hydrogen bond to.\n2. A ring N (pyridine-type) adds an H-bond acceptor, so solubility rises.\n3. C=CH₂ and CH–CH=CH remove polar atoms, and NCH₃ removes an N–H donor: all lower solubility.\n**Rule to reuse:** adding N, O or an N–H/O–H raises water solubility; swapping them for carbon lowers it.",
            "id": "p_cpq5_2_q3"
          },
          {
            "q": "In M⁻¹•s⁻¹ and μM, what should the approximate values of kcat/KM and Ki be, respectively, when [A] = 150 μM?",
            "choices": [
              "30 and 10.0",
              "60 and 20.0",
              "120 and 40.0",
              "240 and 80.0"
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe5-cp:4",
            "exp": "1. kcat/KM and Ki are constants of the enzyme and inhibitor at fixed temperature and pH.\n2. Raising [A] changes how much enzyme is inhibited, not the constants.\n3. So they keep the passage values: 120 M⁻¹•s⁻¹ (0.120 mM⁻¹ s⁻¹) and 40.0 μM.\n**Rule to reuse:** Ki and kcat/KM do not change with [I]; read them from the passage.",
            "id": "p_cpq5_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq5_3",
        "figures": [{"type":"line","caption":"Figure 1 Average displacement of the 12 DNA molecules (±1 SD)","x":{"label":"Time (s)","min":0,"max":20,"step":4},"y":{"label":"Displacement (μm)","min":0,"max":40,"step":10},"series":[{"name":"Mean","marker":"circle","points":[[0,0],[2,2],[4,5],[6,8.2],[8,11],[10,14.2],[12,17.1],[14,20],[16,23.2],[18,26],[20,29]]},{"name":"Mean + 1 SD","marker":"plus","line":"none","points":[[0,0],[2,2.8],[4,6.5],[6,10.2],[8,13.5],[10,17.2],[12,20.6],[14,24],[16,27.7],[18,31],[20,34.5]]},{"name":"Mean − 1 SD","marker":"plus","line":"none","points":[[0,0],[2,1.2],[4,3.5],[6,6.2],[8,8.5],[10,11.2],[12,13.6],[14,16],[16,18.7],[18,21],[20,23.5]]}]},{"type":"line","caption":"Figure 2 Average velocity of the DNA molecules (from Figure 1)","x":{"label":"Time (s)","min":0,"max":20,"step":4},"y":{"label":"Velocity (μm/s)","min":0,"max":2,"step":0.5},"series":[{"name":"Mean velocity","marker":"circle","line":"straight","points":[[0,0],[1,1.0],[3,1.5],[5,1.6],[7,1.4],[9,1.6],[11,1.45],[13,1.45],[15,1.6],[17,1.4],[19,1.5]]}]}],
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4A",
          "4C",
          "5A",
          "4D"
        ],
        "title": "Velocity Fluctuations of DNA in a Gel",
        "passage": "Researchers studied the fluctuations in the velocity of individual DNA molecules extracted from a 48 kb chain using the agarose gel electrophoresis technique. Molecules were extracted after dilution with buffer to 0.8 μg/mL, heated for 10 min to 65°C, and then cooled to 4°C. The pH = 8.5 buffer contained 30 mM of Compound 1, a tris-type amine buffer, and 30 mM of boric acid. Researchers separated 12 molecules and studied their images with a microscope of 60× magnification, lit by a hydrogen lamp whose visible emission lines lie at 410, 434, 486 and 656 nm.\n\nThe application of a uniform electric field E = 4.0 ± 0.1 V/cm caused the increase in time of the displacement of the center of mass of the molecules. Each molecule underwent a different displacement. After 20 s of motion, the maximum displacement was 40 μm. The average displacement for all 12 molecules is shown in Figure 1, a plot of displacement against time with error bars of ±1 SD, and their average velocity is shown in Figure 2, which is derived from Figure 1. Positive values of data correspond to motion in the direction of the electric field that was applied at t = 0.",
        "questions": [
          {
            "q": "If the wavelength of a light beam were halved, its frequency would be:",
            "choices": [
              "quartered.",
              "halved.",
              "doubled.",
              "quadrupled."
            ],
            "ans": 2,
            "cat": "4D",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe5-cp:53",
            "exp": "1. c = fλ, and c is fixed in one medium.\n2. So f ∝ 1/λ: halving λ doubles f.\n3. Quartered or quadrupled would need f ∝ 1/λ², which is wrong.\n**Rule to reuse:** multiply λ by k, and f is multiplied by 1/k.",
            "id": "p_cpq5_3_q1"
          },
          {
            "q": "What feature of the DNA molecules used in the experiment enables them to interact with the applied electric field?",
            "choices": [
              "Molecules have net electric charge.",
              "Molecules were obtained from a chain structure.",
              "Molecules have a length of 48 kb.",
              "Molecules have deoxyribose sugar components."
            ],
            "ans": 0,
            "cat": "4C",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe6-cp:6",
            "exp": "1. An electric field exerts a force on a net charge (F = qE).\n2. DNA's phosphate backbone carries one negative charge per nucleotide.\n3. Its origin, length and sugars do not by themselves make it respond to the field.\n**Rule to reuse:** a field pulls on net charge; DNA is negative and moves toward +.",
            "id": "p_cpq5_3_q2"
          },
          {
            "q": "According to the passage, the buffer used to dilute the intact chain was:",
            "subj": "gen_chem",
            "choices": [
              "weakly acidic.",
              "weakly basic.",
              "strongly acidic.",
              "strongly basic."
            ],
            "ans": 1,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe6-cp:7",
            "exp": "1. The passage gives the buffer's pH as 8.5.\n2. A pH a little above 7 is weakly basic; strongly basic would be near 13–14.\n**Rule to reuse:** pH just above 7 = weakly basic; just below 7 = weakly acidic.",
            "id": "p_cpq5_3_q3"
          },
          {
            "q": "The first pKa of boric acid is 9.2. What is the ratio of the concentrations of [B(OH)₄]⁻ (the basic form) to B(OH)₃ (the acid form) in the solutions used in the experiment?",
            "subj": "gen_chem",
            "choices": [
              "5",
              "2",
              "0.2",
              "0.1"
            ],
            "ans": 2,
            "cat": "5A",
            "skill": "SIRS 4",
            "diff": "X",
            "twin": "pe6-cp:8",
            "exp": "1. The solutions are at pH 8.5.\n2. [base]/[acid] = 10^(pH − pKa) = 10^(8.5 − 9.2) = 10^(−0.7).\n3. 10^(−0.7) ≈ 0.2.\n4. 5 inverts the ratio; 0.1 uses a full unit of pH.\n**Rule to reuse:** base:acid = 10^(pH − pKa); below the pKa, the acid form dominates.",
            "id": "p_cpq5_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq5_4",
        "figures": [{"type":"svg","caption":"Figure 2 Autoradiography of leaf-extract products","alt":"In both the ¹⁴C and ³³P images, the WT lane without α-amylase has a strong band and the SSKO lane a faint one; with α-amylase neither lane has a band.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 300' width='560' height='300' font-family='sans-serif' font-size='18'><g font-size='20' font-weight='bold' text-anchor='middle'><text x='145' y='30'>¹⁴C image</text><text x='415' y='30'>³³P image</text></g><g fill='#eef0f2' stroke='#222' stroke-width='2'><rect x='20' y='45' width='250' height='150'/><rect x='290' y='45' width='250' height='150'/></g><g fill='none' stroke='#666' stroke-width='2'><rect x='32' y='52' width='40' height='8'/><rect x='94' y='52' width='40' height='8'/><rect x='156' y='52' width='40' height='8'/><rect x='218' y='52' width='40' height='8'/><rect x='302' y='52' width='40' height='8'/><rect x='364' y='52' width='40' height='8'/><rect x='426' y='52' width='40' height='8'/><rect x='488' y='52' width='40' height='8'/></g><g fill='#111'><rect x='30' y='105' width='44' height='14'/><rect x='92' y='105' width='44' height='14' fill-opacity='0.18'/><rect x='300' y='105' width='44' height='14'/><rect x='362' y='105' width='44' height='14' fill-opacity='0.18'/></g><g text-anchor='middle'><text x='52' y='222'>WT</text><text x='114' y='222'>SSKO</text><text x='176' y='222'>WT</text><text x='238' y='222'>SSKO</text><text x='322' y='222'>WT</text><text x='384' y='222'>SSKO</text><text x='446' y='222'>WT</text><text x='508' y='222'>SSKO</text><g font-size='22'><text x='52' y='252'>−</text><text x='114' y='252'>−</text><text x='176' y='252'>+</text><text x='238' y='252'>+</text><text x='322' y='252'>−</text><text x='384' y='252'>−</text><text x='446' y='252'>+</text><text x='508' y='252'>+</text></g><text x='280' y='288'>α-amylase: − without, + with</text></g></svg>"}],
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5E",
          "4E"
        ],
        "title": "Starch Synthase and Starch Phosphorylation",
        "passage": "Starch synthase catalyzes the lengthening of starch polymers through the addition of glucose. The reaction consists of transferring a glucosyl moiety from adenosine diphosphate glucose (ADP-glucose, Figure 1) to the nonreducing end of the starch molecule along with the release of ADP. ADP-glucose is formed from the enzymatically-catalyzed reaction between glucose 1-phosphate and ATP. It was discovered that approximately one out of every 300–800 glucose molecules in leaf starch contains phosphate groups covalently linked to the C3 and C6 positions as monoesters. It is hypothesized that starch synthase is responsible for the phosphorylation. Figure 1 shows ADP-glucose: glucose bonded through its C1 oxygen to the terminal phosphate of ADP.\n\nStarch excess 4 (sex4) is a plant disorder that is characterized by the formation of deposits of sparsely branched, insoluble starch-like polymers in the leaves. These deposits contain a much larger amount of covalently-linked phosphate compared to normal starch. The abundance of phosphate has been linked to a mutation in the gene for SEX4, a phosphatase specific to carbohydrates.\n\nIn order to test if starch synthase is responsible for starch phosphorylation, both ADP-[U-¹⁴C]glucose and [β-³³P]ADP-glucose were incubated with leaf extracts from wild-type (WT) plants and plants lacking leaf starch synthase (SSKO). The reaction products were separated by SDS-PAGE and visualized by autoradiography that detects the products of β⁻ decay (Figure 2). The data were normalized to account for the different decay rates. The samples were also treated with α-amylase, an enzyme that breaks down starch, and assayed in the same manner. Figure 2 shows the bands from the leaf extracts visualized with either ¹⁴C or ³³P decay, in lanes run with (+) and without (–) α-amylase (described: without α-amylase, both the ¹⁴C and the ³³P images show a strong band for WT and only a faint band for SSKO; with α-amylase, the bands are gone in both images).",
        "questions": [
          {
            "q": "Which structure represents a phosphorylated subunit of starch as described in the passage?",
            "choices": [
              "Glucose with phosphate on C1",
              "Glucose with phosphate on C2",
              "Glucose with phosphate on C4",
              "Glucose with phosphate on C6"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe1-cp:38",
            "exp": "1. The passage says starch glucose units carry phosphate monoesters at C3 and C6.\n2. Of the choices, only the C6 phosphate matches.\n3. C1 is the anomeric carbon used in the chain link; C2 and C4 are not named.\n**Rule to reuse:** use the carbon numbers the passage states, counting from the anomeric C1.",
            "id": "p_cpq5_4_q1"
          },
          {
            "q": "Which type of bond is formed by starch synthase upon release of ADP?",
            "choices": [
              "α-1,4-Glycosidic bond",
              "α-1,6-Glycosidic bond",
              "β-1,4-Glycosidic bond",
              "β-1,6-Glycosidic bond"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe1-cp:39",
            "exp": "1. Starch synthase adds glucose from ADP-glucose to the end of a chain.\n2. Starch chains are α-1,4 linked; the α-1,6 bonds are made by the branching enzyme.\n3. β links belong to cellulose, not starch.\n**Rule to reuse:** synthase → α-1,4 chain bonds; branching enzyme → α-1,6 branch points.",
            "id": "p_cpq5_4_q2"
          },
          {
            "q": "In addition to glucose, what other monosaccharide is part of the ADP-glucose structure?",
            "choices": [
              "Xylose",
              "Fructose",
              "Ribose",
              "Arabinose"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 3",
            "diff": "D",
            "twin": "pe1-cp:40",
            "exp": "1. ADP-glucose is adenosine diphosphate bonded to glucose.\n2. Adenosine = adenine + ribose.\n3. So the other sugar is ribose.\n**Rule to reuse:** nucleotides without a d (ADP, UDP, GDP) carry ribose.",
            "id": "p_cpq5_4_q3"
          },
          {
            "q": "Addition of SEX4 to the reaction mixtures used to generate the data in Figure 2 will result in:",
            "choices": [
              "a decrease in the intensity of the band representing WT without α-amylase when visualized with ¹⁴C decay.",
              "an increase in the intensity of the band representing WT without α-amylase when visualized with ¹⁴C decay.",
              "a decrease in the intensity of the band representing WT without α-amylase when visualized with ³³P decay.",
              "an increase in the intensity of the band representing WT without α-amylase when visualized with ³³P decay."
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe1-cp:41",
            "exp": "1. SEX4 is a phosphatase specific to carbohydrates.\n2. It removes the ³³P-labeled phosphate from the starch, so the ³³P band weakens.\n3. The ¹⁴C is in the glucose backbone, which SEX4 leaves in place.\n**Rule to reuse:** a phosphatase lowers only the phosphate label.",
            "id": "p_cpq5_4_q4"
          },
          {
            "q": "The radioactive decay described in the passage results in the formation of which two atoms?",
            "subj": "physics",
            "choices": [
              "N and S",
              "B and Si",
              "B and S",
              "N and Si"
            ],
            "ans": 0,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe1-cp:42",
            "exp": "1. ¹⁴C and ³³P are β⁻ emitters: Z rises by 1 and A stays.\n2. ¹⁴C (Z = 6) → ¹⁴N (Z = 7).\n3. ³³P (Z = 15) → ³³S (Z = 16).\n4. B and Si would need Z to fall (β⁺).\n**Rule to reuse:** β⁻ gives the next element up in the periodic table.",
            "id": "p_cpq5_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq5_5",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5E",
          "5D",
          "4C"
        ],
        "title": "Making Polyaniline with Soybean Peroxidase",
        "passage": "Conducting polymers have great potential for use in electronics applications because of their wide range of electrical, electrochemical, and optical properties. An example of such a polymer is polyaniline (PANI), which is synthesized by oxidizing aniline (Compound 1, Figure 1, which shows aniline, C₆H₅NH₂, and the PANI chain built from para-linked aniline units). Because of various limitations in the synthetic production of PANI, there is interest in producing PANI enzymatically.\n\nSoybean peroxidase (SBP) is a 37 kDa monomeric protein that contains a single iron(III) heme cofactor and two calcium ions. The heme iron is coordinated by a single histidine residue, and the calcium ions are coordinated by various Asp, Ser, Thr, Glu, Gly, and Asn residues through both side chain and backbone interactions. The substrate binding site of SBP interacts with aromatic rings of incoming substrates. SBP catalyzes the oxidation of aromatic amines and phenols. The oxidation occurs at the ring substituent. The proposed catalytic mechanism involves the formation of a porphyrin-based cation radical through reaction with hydrogen peroxide (Reaction 1). The aniline free radicals generated in the oxidation reactions undergo coupling to produce the dimer, and subsequent oxidation and coupling reactions produce the polymer.\n\nPolyanionic molecules can be used as templates in the SBP-catalyzed synthesis of PANI to ensure only the desired polymeric structure is obtained. The negative charge of the sulfate groups (pKa = 1.0) in dextran sulfate (DS) interacts with the incoming aniline molecules (pKa = 4.6) and forces them into a conformation that results in a linear polymer. The best-performing PANI had a maximum conductivity of 4.0 × 10⁻³ (Ω•cm)⁻¹.",
        "questions": [
          {
            "q": "The structure of 4-hydroxybenzenesulfonate is HO–C₆H₄–SO₃⁻. Based on the passage, what is the structure of the product of the reaction between 4-hydroxybenzenesulfonate and SBP?",
            "choices": [
              "•O–C₆H₄–SO₃⁻ (phenoxyl radical)",
              "HO–C₆H₃(•)–SO₃⁻ (ring radical)",
              "⁻O–C₆H₄–SO₃⁻ (phenolate)",
              "HO–C₆H₄–SO₃• (sulfonyl radical)"
            ],
            "ans": 0,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe3-cp:35",
            "exp": "1. SBP oxidizes phenols at the ring substituent, making free radicals.\n2. Removing H• from the O–H leaves a phenoxyl radical, •O–C₆H₄–SO₃⁻.\n3. The ring and the sulfonate are not oxidized, and losing only H⁺ gives a phenolate, which is not an oxidation.\n**Rule to reuse:** peroxidase oxidation of a phenol removes H• from the O–H, giving Ar–O•.",
            "id": "p_cpq5_5_q1"
          },
          {
            "q": "The side chain of which amino acid is most likely to be a substrate for SBP?",
            "subj": "organic_chem",
            "choices": [
              "Lys",
              "Leu",
              "Tyr",
              "Gln"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:36",
            "exp": "1. The passage says the peroxidase oxidizes phenols.\n2. Tyrosine is the only amino acid with a phenol side chain.\n3. Lys is an amine, Leu an alkyl and Gln an amide.\n**Rule to reuse:** match the group the enzyme acts on to the side chain that carries it.",
            "id": "p_cpq5_5_q2"
          },
          {
            "q": "Which atom is most likely involved in the coordination of calcium ions found in SBP?",
            "choices": [
              "Hydrogen",
              "Carbon",
              "Nitrogen",
              "Oxygen"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:37",
            "exp": "1. Ca²⁺ is a hard cation that binds lone pairs on oxygen.\n2. In proteins it is held by carboxylate O (Asp, Glu), carbonyl O and water.\n3. H and C have no lone pairs; N donors favor softer ions such as Zn²⁺.\n**Rule to reuse:** Ca²⁺ binds O; Zn²⁺ binds N and S.",
            "id": "p_cpq5_5_q3"
          },
          {
            "q": "Which structure represents a component of the SBP cofactor?",
            "choices": [
              "A porphyrin (tetrapyrrole) ring",
              "A flavin (isoalloxazine) ring",
              "A nicotinamide ring",
              "A pyridoxal ring"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe3-cp:38",
            "exp": "1. The passage says SBP contains an iron(III) heme cofactor.\n2. Heme is iron held in a porphyrin: four pyrroles joined by =CH– bridges.\n3. A flavin belongs to FAD, nicotinamide to NAD, pyridoxal to vitamin B₆.\n**Rule to reuse:** heme = Fe + porphyrin (four pyrroles).",
            "id": "p_cpq5_5_q4"
          },
          {
            "q": "What is the resistivity of the best-performing PANI described in the passage?",
            "subj": "physics",
            "choices": [
              "0.004 Ω•cm",
              "25 Ω•cm",
              "250 Ω•cm",
              "400 Ω•cm"
            ],
            "ans": 2,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe3-cp:39",
            "exp": "1. Resistivity is the reciprocal of conductivity: ρ = 1/σ.\n2. ρ = 1/(4.0 × 10⁻³ (Ω•cm)⁻¹) = 250 Ω•cm.\n3. 0.004 Ω•cm skips the reciprocal; 25 and 400 slip a power of ten or the digits.\n**Rule to reuse:** resistivity = 1/conductivity, and the units flip.",
            "id": "p_cpq5_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "The term \"ideal gas\" refers to a gas for which certain simplifying assumptions have been made. Which of the following is such an assumption?",
        "choices": [
          "The law PV² = nRT is strictly obeyed.",
          "Intermolecular forces are infinitely large.",
          "Individual molecular volume and intermolecular forces are negligible.",
          "One gram-mole occupies a volume of 24.5 L at 0°C and one atmosphere pressure."
        ],
        "ans": 2,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "pe1-cp:29",
        "exp": "1. An ideal gas is modeled as point particles with no intermolecular forces.\n2. So individual molecular volume and intermolecular forces are negligible.\n3. The law is PV = nRT (no squares), and 24.5 L/mol is the 25 °C value; at 0 °C and 1 atm it is 22.4 L.\n**Rule to reuse:** ideal = no molecular volume and no attractions; 22.4 L/mol only at 0 °C and 1 atm.",
        "id": "cp_q5_sa1"
      },
      {
        "q": "Tritium (³H)-labeled adenine is used to measure the rates of processes that bind or incorporate it. In adenine, hydrogen I is on C8, hydrogen II on N9, and hydrogens III and IV on the 6-amino N. With water as the solvent, what is the best site for tritium labeling?",
        "choices": [
          "I",
          "II",
          "III",
          "IV"
        ],
        "ans": 0,
        "cat": "5D",
        "skill": "SIRS 3",
        "diff": "M",
        "subj": "organic_chem",
        "twin": "pe3-cp:10",
        "exp": "1. H on N exchanges with water, so tritium at II, III or IV washes into the solvent.\n2. H on carbon does not exchange.\n3. Site I, the C8–H, keeps the label.\n**Rule to reuse:** in water, label a C–H, never an O–H or N–H.",
        "id": "cp_q5_sa2"
      },
      {
        "q": "Which of the following reasons best explains why it is possible to separate a 1:1 mixture of 1-chloropentane and 1-pentanol by fractional distillation?",
        "choices": [
          "Both are polar.",
          "Both are nonpolar.",
          "The boiling point of 1-chloropentane is substantially higher than that of 1-pentanol.",
          "The boiling point of 1-chloropentane is substantially lower than that of 1-pentanol."
        ],
        "ans": 3,
        "cat": "5C",
        "skill": "SIRS 3",
        "diff": "X",
        "subj": "organic_chem",
        "twin": "pe4-cp:9",
        "exp": "1. Fractional distillation separates liquids by boiling point.\n2. 1-Pentanol hydrogen-bonds through its O–H; 1-chloropentane cannot.\n3. So 1-chloropentane boils substantially lower (108 °C vs 138 °C) and distills first.\n**Rule to reuse:** an alcohol boils well above an alkyl halide of similar size.",
        "id": "cp_q5_sa3"
      },
      {
        "q": "An imine group contains what type of bonding interaction(s) between the C and N atoms?",
        "choices": [
          "One σ only",
          "One σ and one π only",
          "One π only",
          "One σ and two π only"
        ],
        "ans": 1,
        "cat": "5B",
        "skill": "SIRS 2",
        "diff": "M",
        "subj": "organic_chem",
        "twin": "pe4-cp:25",
        "exp": "1. An imine has a C=N double bond.\n2. A double bond is one σ (head-on overlap) plus one π (side-by-side p overlap).\n3. No bond is π alone; σ + 2π is a triple bond.\n**Rule to reuse:** single = σ, double = σ + π, triple = σ + 2π.",
        "id": "cp_q5_sa4"
      },
      {
        "q": "If all else is held constant, which of the following changes would NOT triple the volume of a gas?",
        "choices": [
          "Tripling the pressure",
          "Tripling the absolute temperature",
          "Reducing the pressure to one-third",
          "Tripling the number of gas molecules"
        ],
        "ans": 0,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "X",
        "subj": "gen_chem",
        "twin": "pe5-cp:12",
        "exp": "1. From PV = nRT, V ∝ nT/P.\n2. Tripling n or the absolute T triples V; cutting P to one-third triples V.\n3. Tripling P cuts V to one-third.\n**Rule to reuse:** V rises with n and absolute T and falls as P rises.",
        "id": "cp_q5_sa5"
      },
      {
        "q": "Consider fully protonated aspartic acid, with group I its α-COOH, group II its side-chain COOH, group III its α-NH₃⁺ and group IV its α-C–H. As the pH of a solution of this amino acid is raised, which group deprotonates first?",
        "choices": [
          "I",
          "II",
          "III",
          "IV"
        ],
        "ans": 0,
        "cat": "5A",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "gen_chem",
        "twin": "pe5-cp:45",
        "exp": "1. Groups lose H⁺ in order of increasing pKa.\n2. α-COOH ≈ 2.0, side-chain COOH ≈ 3.9, α-NH₃⁺ ≈ 9.9; a C–H does not ionize in water.\n3. So group I, the α-COOH, goes first.\n**Rule to reuse:** in a fully protonated amino acid, the α-COOH (pKa ≈ 2) loses H⁺ first.",
        "id": "cp_q5_sa6"
      },
      {
        "q": "A chemical reaction occurs spontaneously at 35°C. Which of the following conditions must hold at this temperature?",
        "choices": [
          "ΔG < 0 and ΔS < 0",
          "ΔG < 0 and ΔH < 0",
          "ΔH < 0 only",
          "ΔG < 0 only"
        ],
        "ans": 3,
        "cat": "5E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "pe6-cp:9",
        "exp": "1. Spontaneous means ΔG < 0 at that temperature.\n2. ΔH and ΔS can each have either sign, as long as ΔH − TΔS < 0.\n3. So only ΔG < 0 must hold.\n**Rule to reuse:** spontaneity requires only ΔG < 0.",
        "id": "cp_q5_sa7"
      },
      {
        "q": "Which of the following alcohols shows a doublet in its ¹H NMR spectrum?",
        "choices": [
          "Methanol",
          "2-Butanol",
          "2-Methyl-2-propanol",
          "1-Pentanol"
        ],
        "ans": 1,
        "cat": "4D",
        "skill": "SIRS 1",
        "diff": "D",
        "subj": "organic_chem",
        "twin": "pe6-cp:27",
        "exp": "1. A doublet means one H on the neighboring carbon (n + 1 = 2).\n2. In 2-butanol, CH₃–CH(OH)–CH₂CH₃, the C1 methyl sits next to a CH: a doublet.\n3. Methanol and 2-methyl-2-propanol give singlets; 1-pentanol's CH₃ and CH₂ groups give triplets and multiplets.\n**Rule to reuse:** a doublet points to a CH next door.",
        "id": "cp_q5_sa8"
      }
    ]
  },
  {
    "id": "cp_half_6",
    "title": "Chem/Phys Quiz 6",
    "order": [
      "p_cpq6_1",
      "p_cpq6_2",
      4,
      "p_cpq6_3",
      "p_cpq6_4",
      "p_cpq6_5",
      4
    ],
    "passages": [
      {
        "id": "p_cpq6_1",
        "figures": [{"type":"bar","caption":"Figure 2 Arrestin binding to Opsin G Loop A variants: (A) phosphorylated (kinase + ATP); (B) kinase without ATP","x":{"label":"Opsin G variant (Loop A)"},"y":{"label":"Arrestin binding (% of WT)","min":0,"max":120,"step":20},"categories":["WT","R68A","K70A","R68A/K70A","D72A"],"series":[{"name":"(A) Kinase + ATP","values":[100,62,55,18,96],"errors":[6,5,6,3,7]},{"name":"(B) Kinase, no ATP","values":[15,12,10,8,14],"errors":[3,2,2,2,3]}]},{"type":"bar","caption":"Figure 3 Arrestin binding to Opsin G Loop B variants: (A) phosphorylated (kinase + ATP); (B) kinase without ATP","x":{"label":"Opsin G variant (Loop B)"},"y":{"label":"Arrestin binding (% of WT)","min":0,"max":120,"step":20},"categories":["WT","K231A","R234A","K231A/R234A","E239A"],"series":[{"name":"(A) Kinase + ATP","values":[100,88,41,30,102],"errors":[6,7,5,4,8]},{"name":"(B) Kinase, no ATP","values":[15,14,9,7,16],"errors":[3,3,2,2,3]}]}],
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4D",
          "5B",
          "5E"
        ],
        "title": "Opsin G and Arrestin Binding",
        "passage": "Opsin G is a G protein-coupled receptor (GPCR) present in the green-sensitive cone cells of the zebrafish retina. Opsin G is made up of an opsin, one of a family of proteins with seven transmembrane helices, and a covalently bound coenzyme, retinal, which sits among the helices. Retinal is made from all-trans-retinol, also called vitamin A (Figure 1). When Opsin G absorbs light, its 11-cis-retinal is converted to all-trans-retinal. The structural changes that follow in Opsin G let it bind and activate transducin, a G protein inside the cell. The signal is shut off when opsin kinase phosphorylates Opsin G and the protein arrestin then binds to Opsin G. Opsin G absorbs most strongly at 510 nm. Other opsin-based receptors are made in the fish's other cone cells, and when reconstituted with 11-cis-retinal they absorb most strongly at 360 nm, 415 nm, and 565 nm.\n\n[Figure 1 Structures of all-trans-retinol and 11-cis-retinal: each is a six-membered carbon ring joined to a chain of conjugated C=C bonds, built only of carbon and hydrogen except for the –CH₂OH of retinol and the –CHO of retinal.]\n\nEarlier studies showed that several cytoplasmic loops of Opsin G are important for binding arrestin. To find which amino acids within the loops matter most for arrestin binding, researchers made Opsin G variants carrying one or more amino acid substitutions and measured how well each bound arrestin. They concentrated on two loops, Loop A (Figure 2) and Loop B (Figure 3). Before arrestin binding was tested, wild-type or variant Opsin G was reconstituted with 11-cis-retinal and phosphorylated by opsin kinase in the presence of ATP. Without phosphorylation, arrestin binding to wild-type Opsin G fell by 85%.\n\n[Figures 2 and 3 Arrestin binding to Opsin G variants with substitutions in Loop A (Figure 2) or Loop B (Figure 3), as a percent of wild type: (A) phosphorylated variants; (B) variants incubated with opsin kinase with or without ATP.]\n\nTo calibrate their light source, the researchers also used Compound 1, hex-4-en-1-yne (HC≡C–CH₂–CH=CH–CH₃, carbons numbered C1 to C6 from the alkyne end), whose trans isomer is converted into its cis isomer by ultraviolet light.",
        "questions": [
          {
            "q": "The production of a variety of opsins functions to:",
            "choices": [
              "increase sensitivity to low light.",
              "enable the detection of different colors.",
              "ensure fast recovery of 11-cis-retinal after exposure.",
              "increase refractive index of the eye lens."
            ],
            "ans": 1,
            "cat": "4D",
            "skill": "SIRS 4",
            "diff": "X",
            "subj": "organic_chem",
            "twin": "pe1-cp:30",
            "exp": "1. Each cone signals only how many photons its opsin absorbs, so one opsin cannot tell wavelengths apart.\n2. Opsins with different absorbance peaks (510, 360, 415 and 565 nm) respond differently to each wavelength; comparing them gives color.\n3. Dim-light sensitivity is a rod job, retinal recovery is not done by opsins, and the lens sets refractive index.\n**Rule to reuse:** two or more pigments with different peaks are needed for color vision.",
            "id": "p_cpq6_1_q1"
          },
          {
            "q": "The environment of the retinal binding site is most likely:",
            "choices": [
              "hydrophilic.",
              "positively charged.",
              "negatively charged.",
              "hydrophobic."
            ],
            "ans": 3,
            "cat": "5B",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe1-cp:31",
            "exp": "1. Retinal sits among the transmembrane helices, inside the membrane.\n2. Figure 1: apart from one oxygen, retinal is a ring and chain of only carbon and hydrogen.\n3. A hydrocarbon guest is held by nonpolar side chains: the site is hydrophobic.\n**Rule to reuse:** a nonpolar ligand in a water-free pocket means a hydrophobic binding site.",
            "id": "p_cpq6_1_q2"
          },
          {
            "q": "The source of the phosphate groups that are added to Opsin G is:",
            "choices": [
              "arrestin.",
              "opsin kinase.",
              "ATP.",
              "all-trans-retinol."
            ],
            "ans": 2,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "M",
            "subj": "biochemistry",
            "twin": "pe1-cp:32",
            "exp": "1. Opsin kinase phosphorylates serine and threonine residues on the opsin's tail.\n2. A kinase is only the catalyst; it moves the γ phosphate of ATP onto the protein.\n3. Arrestin only binds, and retinol carries no phosphate.\n**Rule to reuse:** the source of an added group is the molecule that loses it; for a kinase, that is ATP.",
            "id": "p_cpq6_1_q3"
          },
          {
            "q": "What are the hybridization states of the carbon atoms involved in the conversion of trans to cis Compound 1?",
            "choices": [
              "sp",
              "sp²",
              "sp³",
              "sp³d"
            ],
            "ans": 1,
            "cat": "5B",
            "skill": "SIRS 4",
            "diff": "X",
            "twin": "pe1-cp:33",
            "exp": "1. Trans and cis Compound 1 differ at the C4=C5 double bond.\n2. Each carbon of a C=C has three electron domains: sp², trigonal planar.\n3. sp belongs to the C≡C carbons, sp³ to CH₂/CH₃ carbons, and carbon has no d-orbital hybrids.\n**Rule to reuse:** cis/trans isomers come from a C=C, whose carbons are sp².",
            "id": "p_cpq6_1_q4"
          }
        ]
      },
      {
        "id": "p_cpq6_2",
        "figures": [{"caption":"Table 1 Standard reduction potentials at 25°C","columns":["Half-reaction","E° (V)"],"rows":[["Br₂ + 2e⁻ → 2Br⁻","+1.07"],["Co²⁺ + 2e⁻ → Co","−0.28"],["Cr²⁺ + 2e⁻ → Cr","−0.91"],["Mn²⁺ + 2e⁻ → Mn","−1.18"]]}],
        "subj": "gen_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4E",
          "5E"
        ],
        "title": "The Stoichiometry of Manganese and Bromine",
        "passage": "Bromine and manganese are the reactants in an experiment to determine the stoichiometry of a reaction. Gray, powdered manganese metal (3.0 g) and dark red-brown liquid bromine (3.0 g) are added to an Erlenmeyer flask holding 30 mL of acetonitrile (CH₃CN). The bromine dissolves in the acetonitrile, giving an orange-red solution. After 20 min of stirring, the solution is pale pink, and some gray powder remains at the bottom of the flask. The liquid is poured off into a beaker. The leftover powder is washed several times with acetonitrile, and each washing is added to the beaker. The acetonitrile is then evaporated, leaving a solid, pale pink bromide of manganese as the product. The dry product is weighed. The unreacted manganese powder is also dried and weighed. The product consistently contains 2 mol of bromine atoms for every 1 mol of manganese atoms. The mass of bromine plus the mass of manganese that reacted equals the mass of the product. Table 1 lists the standard reduction potentials of manganese, bromine, and two other substances.\n\nTable 1 Standard Reduction Potentials at 25°C\nBr₂ + 2e⁻ → 2Br⁻   +1.07 V\nCo²⁺ + 2e⁻ → Co   −0.28 V\nCr²⁺ + 2e⁻ → Cr   −0.91 V\nMn²⁺ + 2e⁻ → Mn   −1.18 V",
        "questions": [
          {
            "q": "The limiting reagent in the experiments described in the passage is:",
            "choices": [
              "bromine.",
              "manganese.",
              "acetonitrile.",
              "bromide."
            ],
            "ans": 0,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe3-cp:13",
            "exp": "1. Moles: Mn = 3.0 g ÷ 54.9 g/mol = 0.055 mol; Br₂ = 3.0 g ÷ 159.8 g/mol = 0.019 mol.\n2. The ratio is 1:1, so bromine runs out first.\n3. The passage agrees: unreacted manganese was left behind.\n4. Acetonitrile is the solvent and bromide is part of the product.\n**Rule to reuse:** the reactant with the fewest moles per coefficient limits; leftover reactant was in excess.",
            "id": "p_cpq6_2_q1"
          },
          {
            "q": "The energy of activation for the reaction described in the passage is given by the energy of:",
            "choices": [
              "the reactants minus the energy of the products.",
              "the products minus the energy of the reactants.",
              "the activated complex minus the energy of the products.",
              "the activated complex minus the energy of the reactants."
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 4",
            "diff": "D",
            "twin": "pe3-cp:14",
            "exp": "1. The activation energy is the climb from the starting level to the peak.\n2. For the forward reaction: activated complex − reactants.\n3. Activated complex − products is the reverse Ea; the other two differences are ±ΔH.\n**Rule to reuse:** Ea = E(activated complex) − E(reactants); ΔH = E(products) − E(reactants).",
            "id": "p_cpq6_2_q2"
          },
          {
            "q": "In its lowest-energy electron configuration, manganese has a:",
            "choices": [
              "filled 3d energy level and a filled 4s energy level.",
              "half-filled 3d and a filled 4s.",
              "filled 3d and a half-filled 4s.",
              "half-filled 3d and a half-filled 4s."
            ],
            "ans": 1,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe3-cp:15",
            "exp": "1. Mn (Z = 25) has 25 − 18 = 7 electrons past [Ar].\n2. Fill 4s first (2), then 3d (5): [Ar]3d⁵4s².\n3. 3d⁵ is half-filled and 4s² is filled.\n**Rule to reuse:** count electrons past the core, fill 4s then 3d; d⁵ is half-filled, s² is filled.",
            "id": "p_cpq6_2_q3"
          },
          {
            "q": "What type of reaction is occurring between Br₂ and Mn?",
            "choices": [
              "Acid–base (neutralization)",
              "Precipitate formation",
              "Oxidation–reduction",
              "Chelate formation"
            ],
            "ans": 2,
            "cat": "4E",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe3-cp:16",
            "exp": "1. Mn goes from 0 in the metal to +2 in MnBr₂: oxidized.\n2. Br goes from 0 in Br₂ to −1 in MnBr₂: reduced.\n3. Oxidation states change, so it is a redox reaction; no H⁺ moves, nothing precipitates and no chelate forms.\n**Rule to reuse:** a metal reacting with an element to give a salt changes oxidation states: oxidation–reduction.",
            "id": "p_cpq6_2_q4"
          }
        ]
      },
      {
        "id": "p_cpq6_3",
        "subj": "physics",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "4A",
          "4C",
          "4D"
        ],
        "title": "A Cordless Electric Nail Driver",
        "passage": "When a builder drives nails by hand into dense hardwood, the work goes slowly. In such a job, the hammer blows do not land in a consistent way, and the nail can bend before it is fully driven. Builders often drive these nails instead with a single powered blow, during which a current is passed through a motor in a relatively short time (a few milliseconds). Such a blow can sink the nail fully in one stroke. The goal is that the nail head will then sit flush with the board. Occasionally, a builder must strike the same nail more than once. The tool builders use to deliver these blows is called a nail driver. Cordless nail drivers are carried in tool belts and are used by framers at job sites that have no power outlet. A cordless nail driver works by storing electric energy in a capacitor. A trigger is mounted on the handle, and current can be passed from the capacitor through the motor once the builder pulls the trigger. The nail driver must be built to allow repeated firing with a minimal time delay (less than a second) between nails. Suppose a 250-μF capacitor in a cordless nail driver needs to store 45 J at 600 V. Suppose further that half that energy is actually delivered to the nail in a time of 2.0 ms. A violet alignment laser on the tool's nose also projects a line of 400-nm light onto the board.",
        "questions": [
          {
            "q": "Roughly to what height would a 1.5 kg stone need to be raised in order to have the same stored energy as the energy stored in the nail driver's capacitor?",
            "choices": [
              "1.5 m",
              "3 m",
              "6 m",
              "12 m"
            ],
            "ans": 1,
            "cat": "4A",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe4-cp:53",
            "exp": "1. U = ½CV² = ½ × (2.5 × 10⁻⁴ F) × (600 V)² = 45 J.\n2. Set U = mgh: h = 45 J ÷ (1.5 kg × 10 m/s²) = 3 m.\n3. Dropping the ½ gives 6 m.\n**Rule to reuse:** convert μF to F, compute U = ½CV², then h = U/(mg).",
            "id": "p_cpq6_3_q1"
          },
          {
            "q": "One company sells a nail driver for home use that uses an 18-volt DC battery. The battery is rated at 2.5 A•hr (amp•hour). Roughly how much charge can the battery deliver?",
            "choices": [
              "2.5 C",
              "45 C",
              "9,000 C",
              "162,000 C"
            ],
            "ans": 2,
            "cat": "4C",
            "skill": "SIRS 2",
            "diff": "D",
            "twin": "pe4-cp:54",
            "exp": "1. A•hr is current × time, which is a charge.\n2. 1 A•hr = 1 A × 3600 s = 3600 C.\n3. Q = 2.5 × 3600 = 9,000 C.\n4. Multiplying by 18 V gives energy (45 or 162,000), not charge.\n**Rule to reuse:** Q = It, with 1 A•hr = 3600 C; voltage only matters for energy.",
            "id": "p_cpq6_3_q2"
          },
          {
            "q": "If the violet alignment laser light has a wavelength of 400 nm, which of the following is closest to its frequency?",
            "choices": [
              "7.5 × 10¹⁴ Hz",
              "7.5 × 10⁻¹⁴ Hz",
              "1.3 × 10¹⁵ Hz",
              "1.3 × 10⁻¹⁵ Hz"
            ],
            "ans": 0,
            "cat": "4D",
            "skill": "SIRS 2",
            "diff": "X",
            "twin": "pe5-cp:55",
            "exp": "1. f = c/λ, with λ in metres: 400 nm = 4.0 × 10⁻⁷ m.\n2. f = (3.0 × 10⁸ m/s) ÷ (4.0 × 10⁻⁷ m) = 7.5 × 10¹⁴ Hz.\n3. Light frequencies are huge, so negative exponents are out; 1.3 × 10¹⁵ is the reciprocal of the right number.\n**Rule to reuse:** f = c/λ with λ in metres; visible light lands near 4–7.5 × 10¹⁴ Hz.",
            "id": "p_cpq6_3_q3"
          },
          {
            "q": "The electric field inside each of the conductors that forms the capacitor in the nail driver is zero. Which of the following reasons best explains why this is true?",
            "choices": [
              "All of the electrons in the conductor are bound to atoms, and thus there is no way for an external electric field to penetrate atoms with no net charge.",
              "Free electrons in the conductor arrange themselves on the surface so that the electric field they produce inside the conductor exactly cancels any external electric field.",
              "Free electrons arrange themselves on the surface and throughout the interior so that the electric field they produce inside the conductor exactly cancels any external electric field.",
              "All electrons, both free and bound, arrange themselves on the surface so that the electric field they produce inside the conductor exactly cancels any external electric field."
            ],
            "ans": 1,
            "cat": "4C",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "pe4-cp:56",
            "exp": "1. A conductor has free electrons that move whenever a field acts on them.\n2. They move to the surface until their own field cancels the external field inside; then they stop (electrostatic equilibrium).\n3. Bound electrons cannot leave their atoms, and excess charge does not sit in the interior.\n**Rule to reuse:** in a conductor at equilibrium, free electrons on the surface cancel any field inside, so E = 0.",
            "id": "p_cpq6_3_q4"
          }
        ]
      },
      {
        "id": "p_cpq6_4",
        "figures": [{"type":"svg","caption":"Figure 1 Three ways two acetyl units can be joined","alt":"Each acetyl unit has a methyl tail (CH₃) and a carbonyl head (C=O); head-to-tail joins C=O to CH₃, head-to-head joins C=O to C=O, and tail-to-tail joins CH₃ to CH₃.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 260' width='560' height='260' font-family='sans-serif' font-size='20'><g stroke='#222' stroke-width='2'><g fill='#e5e7eb'><rect x='180' y='20' width='70' height='46'/><rect x='360' y='20' width='70' height='46'/><rect x='180' y='100' width='70' height='46'/><rect x='430' y='100' width='70' height='46'/><rect x='250' y='180' width='70' height='46'/><rect x='360' y='180' width='70' height='46'/></g><g fill='#fff'><rect x='250' y='20' width='70' height='46'/><rect x='430' y='20' width='70' height='46'/><rect x='250' y='100' width='70' height='46'/><rect x='360' y='100' width='70' height='46'/><rect x='180' y='180' width='70' height='46'/><rect x='430' y='180' width='70' height='46'/></g></g><path d='M320 43H360M320 123H360M320 203H360' stroke='#b45309' stroke-width='5'/><text x='10' y='50'>Head-to-tail</text><text x='10' y='130'>Head-to-head</text><text x='10' y='210'>Tail-to-tail</text><g text-anchor='middle'><text x='215' y='50'>CH₃</text><text x='285' y='50'>C=O</text><text x='395' y='50'>CH₃</text><text x='465' y='50'>C=O</text><text x='215' y='130'>CH₃</text><text x='285' y='130'>C=O</text><text x='395' y='130'>C=O</text><text x='465' y='130'>CH₃</text><text x='215' y='210'>C=O</text><text x='285' y='210'>CH₃</text><text x='395' y='210'>CH₃</text><text x='465' y='210'>C=O</text><text x='280' y='252' font-size='18' fill='#444'>C=O = head (carbonyl C); CH₃ = tail (methyl C)</text></g></svg>"}],
        "subj": "organic_chem",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "4D",
          "5E"
        ],
        "title": "Labeling a Lactone Pathway with Carbon-14",
        "passage": "Fatty acids make up a class of saponifiable lipids whose carbon chains are built from two-carbon acetyl units. According to the acetate rule, neighboring acetyl units in a fatty acid chain are joined between the carbonyl carbon of one unit and the methyl carbon of the next (head-to-tail, Figure 1). Head-to-head and tail-to-tail joins, when they appear, are exceptions to this rule.\n\n[Figure 1 Three ways two acetyl units can be joined: head-to-tail (carbonyl carbon to methyl carbon), head-to-head (carbonyl carbon to carbonyl carbon), and tail-to-tail (methyl carbon to methyl carbon).]\n\nIn human metabolism, lanosterol, a C30 terpene (Compound 1, Figure 2), is used as a precursor for the synthesis of many lipids. 4-Hydroxydecanoic acid (Compound 2, Reaction 3) is a key intermediate in the biosynthesis of γ-decalactone (Compound 3), the lactone that gives peaches much of their aroma. The pathway by which optically active Compound 2 is made in yeast from acetate has been worked out by using acetyl-CoA made from acetate labeled with ¹³C at the carboxyl carbon (CH₃–¹³COO⁻).\n\n[Figure 2 Structure of lanosterol (Compound 1): four fused rings (6-6-6-5) with an –OH group on C3 and a branched eight-carbon side chain.]\n\nReaction 1 (chain elongation): 5 acetyl-CoA → 4-oxodecanoyl-CoA, the units joined head-to-tail, with the methyl carbon of the first acetyl unit becoming C10\nReaction 2 (4-oxoacyl-CoA reductase): 4-oxodecanoyl-CoA + NADPH + H⁺ → (R)-4-hydroxydecanoyl-CoA + NADP⁺\nReaction 3 (thioesterase): (R)-4-hydroxydecanoyl-CoA + H₂O → Compound 2 + CoA–SH",
        "questions": [
          {
            "q": "Carbon-13 labeled 4-hydroxydecanoic acid (Compound 2) produced from ¹³C-labeled acetyl-CoA (Reactions 1–3) is converted in vivo into γ-decalactone (Compound 3). What is the expected ¹³C labeling pattern found in γ-decalactone produced this way? Labeled carbon atoms should be found at:",
            "choices": [
              "C1, C3, C5, C7, and C9.",
              "C1, C4, C7, and C10.",
              "C2, C4, C6, C8, and C10.",
              "C2, C5, C8, and C10."
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "E",
            "twin": "sample-cp:38",
            "exp": "1. The chain grows two carbons per acetyl unit; the first unit's methyl carbon becomes C10.\n2. So methyl carbons fill the even positions and carboxyl carbons the odd ones.\n3. The fed acetate is labeled at its carboxyl carbon, and lactone formation keeps the numbering: C1, C3, C5, C7 and C9.\n**Rule to reuse:** in a fatty-acid chain, acetate's carboxyl carbon becomes the odd carbons and its methyl carbon the even ones.",
            "id": "p_cpq6_4_q1"
          },
          {
            "q": "4-Hydroxydecanoate exists in equilibrium with Compound X in aqueous solution. What is the structure of Compound X?",
            "choices": [
              "A five-membered lactone",
              "A six-membered lactone",
              "A keto acid",
              "A cyclic hemiacetal"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "M",
            "twin": "sample-cp:39",
            "exp": "1. The C4 hydroxyl oxygen can attack the carboxyl carbon of the same molecule (intramolecular esterification).\n2. The ring holds C1–C4 and the ring oxygen: five atoms, a γ-lactone (γ-decalactone).\n3. No oxidation (keto acid), no aldehyde (hemiacetal) and no C5–OH (six-membered lactone) is involved.\n**Rule to reuse:** a 4-hydroxy acid ⇌ its five-membered (γ) lactone; a 5-hydroxy acid ⇌ its six-membered (δ) lactone.",
            "id": "p_cpq6_4_q2"
          },
          {
            "q": "Consider three infrared regions: I. 3200–3500 cm⁻¹; II. 1700–1750 cm⁻¹; III. 1580–1610 cm⁻¹. 4-Hydroxydecanoic acid (Compound 2, Reaction 3) is expected to display prominent absorption in which region(s)?",
            "choices": [
              "II only",
              "I and II only",
              "II and III only",
              "I, II, and III"
            ],
            "ans": 1,
            "cat": "4D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "sample-cp:40",
            "exp": "1. The O–H groups (alcohol and acid) give a broad band in region I.\n2. The carboxylic acid C=O gives a strong band in region II.\n3. There is no aromatic ring or conjugated C=C, so nothing strong in region III.\n**Rule to reuse:** broad 3200–3500 = O–H, sharp 1700–1750 = C=O, 1580–1610 = aromatic/conjugated C=C.",
            "id": "p_cpq6_4_q3"
          },
          {
            "q": "What factor explains how a single stereoisomer is formed in Reaction 2?",
            "choices": [
              "One of the reactants is chiral.",
              "Both reactants are chiral.",
              "The solvent medium is chiral.",
              "The enzyme is chiral."
            ],
            "ans": 3,
            "cat": "5E",
            "skill": "SIRS 1",
            "diff": "E",
            "subj": "biochemistry",
            "twin": "sample-cp:41",
            "exp": "1. The 4-oxodecanoyl group in Reaction 2 is achiral, and the solvent is water.\n2. The reductase's chiral active site delivers hydride to only one face of the C=O.\n3. So only the (R) alcohol forms.\n**Rule to reuse:** an achiral reactant gives one stereoisomer only when a chiral catalyst (an enzyme) picks the face.",
            "id": "p_cpq6_4_q4"
          },
          {
            "q": "Which substance is NOT a product of lanosterol metabolism?",
            "choices": [
              "Glucose",
              "Testosterone",
              "Cholesterol",
              "Cortisone"
            ],
            "ans": 0,
            "cat": "5D",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "biochemistry",
            "twin": "sample-cp:42",
            "exp": "1. Lanosterol is the first four-ring sterol on the way to cholesterol.\n2. Cholesterol gives the steroid hormones, such as testosterone and cortisone.\n3. Glucose is a sugar made by gluconeogenesis, not from a sterol.\n**Rule to reuse:** sterol products keep the 6-6-6-5 ring core; sugars never come from sterols.",
            "id": "p_cpq6_4_q5"
          }
        ]
      },
      {
        "id": "p_cpq6_5",
        "subj": "biochemistry",
        "type": "passage",
        "topic": "C/P",
        "cats": [
          "5D",
          "5C",
          "5A"
        ],
        "title": "Purifying a Membrane-Bound Steroid Hydroxylase",
        "passage": "The steroid progesterone has an important role in the adrenal cortex, where it is a precursor of cortisol and aldosterone. Researchers interested in studying the cytochrome P450 enzymes that act on steroids developed a method to produce and purify one of them in active form. First, the researchers devised a way to prepare a specific P450, known as CYP21A2, which adds an –OH group at C21 of its substrate, progesterone, using the machinery of E. coli cells. To make purification and detection easier in later studies, they engineered the cells so that two different tags were attached to the C-terminal end of the protein. The first tag, Compound 1, is the FLAG peptide, a short sequence that acts as an epitope recognized by a specific antibody: Asp–Tyr–Lys–Asp–Asp–Asp–Asp–Lys (Compound 1). The second sequence was made of eight consecutive histidine residues, (His)8. This sequence binds tightly to Co²⁺ cations. In chromatography, proteins carrying the (His)8 tag can be released from Co²⁺-loaded columns by adding to the eluent a small molecule that resembles the side chain of histidine. After preparing CYP21A2, the researchers ran a binding assay that used carbon-14 labeled [4-¹⁴C]-progesterone to measure the Kd of the enzyme while it was still in the membranes of the E. coli cells. CYP21A2 was then extracted from the membranes using n-dodecyl-β-D-maltoside, Compound 2.\n\n[Structure of Compound 2: a straight twelve-carbon alkyl chain joined through a β-glycosidic bond to maltose, a two-glucose head.]\n\nThe researchers purified CYP21A2 with two successive rounds of chromatography, each using one of the tags. The buffers used to elute the protein contained 400 mM imidazole, 20 mM KH₂PO₄ (pKa = 7.2), and varying amounts of KOH (MM = 56 g/mol). During the first chromatography step, a specific chemical agent was immobilized on the stationary phase to bind the Compound 1 tag. After the second chromatography step, which used the (His)8 tag, the researchers ran the same binding assay and found that Kd was similar to the value for membrane-bound CYP21A2.",
        "questions": [
          {
            "q": "The substrate of CYP21A2 is derived from which compound?",
            "choices": [
              "Glucose",
              "Phenylalanine",
              "Glycerol",
              "Cholesterol"
            ],
            "ans": 3,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "subj": "organic_chem",
            "twin": "pe5-cp:21",
            "exp": "1. The substrate is progesterone, a steroid.\n2. Every steroid hormone is made from cholesterol, which already has the four fused rings.\n3. Glucose, phenylalanine and glycerol do not make the steroid core.\n**Rule to reuse:** steroid hormones come from cholesterol.",
            "id": "p_cpq6_5_q1"
          },
          {
            "q": "The second purification step is which type of chromatographic separation?",
            "choices": [
              "Affinity",
              "Size exclusion",
              "Cation exchange",
              "Anion exchange"
            ],
            "ans": 0,
            "cat": "5C",
            "skill": "SIRS 3",
            "diff": "M",
            "twin": "pe5-cp:22",
            "exp": "1. In the second step, the His tag binds immobilized Co²⁺ on the resin.\n2. Imidazole, the histidine side-chain ring, competes for the Co²⁺ and releases the enzyme.\n3. A specific tag–ligand bond eluted by a competitor is affinity chromatography.\n**Rule to reuse:** tag + competitor = affinity; charge + salt = ion exchange; porous beads, no binding = size exclusion.",
            "id": "p_cpq6_5_q2"
          },
          {
            "q": "The structure of Compound 2 is shown. What structural feature(s) is(are) most important to the functioning of this compound as described in the passage?",
            "choices": [
              "Specific configuration of numerous chirality centers",
              "Multiple hydrolysable linkages",
              "Combination of large hydrophobic and hydrophilic regions",
              "Presence of a reducing sugar"
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "D",
            "twin": "pe5-cp:23",
            "exp": "1. Compound 2 pulls CYP21A2 out of the membrane and keeps it in water.\n2. That takes a detergent: a long hydrophobic tail to coat the protein's oily surface and a hydrophilic head to face water.\n3. Chirality, hydrolysable bonds and a reducing sugar play no part in that job.\n**Rule to reuse:** a detergent works by being amphipathic: large hydrophobic and hydrophilic regions on one molecule.",
            "id": "p_cpq6_5_q3"
          },
          {
            "q": "How many moles of imidazole were contained in 250 mL of the buffer solution used to elute CYP21A2?",
            "choices": [
              "5.0 × 10⁻³",
              "2.0 × 10⁻³",
              "2.0 × 10⁻²",
              "1.0 × 10⁻¹"
            ],
            "ans": 3,
            "cat": "5A",
            "skill": "SIRS 2",
            "diff": "D",
            "subj": "gen_chem",
            "twin": "pe5-cp:24",
            "exp": "1. 400 mM = 0.400 M; 250 mL = 0.250 L.\n2. n = M × V = 0.400 × 0.250 = 0.100 mol = 1.0 × 10⁻¹.\n3. The other choices slip a power of ten or mix up the volume.\n**Rule to reuse:** n = M × V with M in mol/L and V in L (mM ÷ 1000, mL ÷ 1000).",
            "id": "p_cpq6_5_q4"
          },
          {
            "q": "Which experimental evidence suggests that the purified CYP21A2 obtained by the researchers was in its native state? The CYP21A2 that was obtained:",
            "choices": [
              "retained both the FLAG and (His)8 tags.",
              "was purified by two separate chromatography steps.",
              "exhibited a binding affinity for progesterone that was similar to that exhibited by native CYP21A2.",
              "had a nearly identical molecular weight to CYP21A2 obtained elsewhere."
            ],
            "ans": 2,
            "cat": "5D",
            "skill": "SIRS 1",
            "diff": "M",
            "twin": "pe5-cp:25",
            "exp": "1. Ask of each result: would an unfolded enzyme give the same answer?\n2. Tags, the number of columns and the molecular weight are the same for folded and unfolded chains.\n3. Binding progesterone like the native enzyme needs a correctly folded binding site.\n**Rule to reuse:** only native-like function (the same ligand affinity or activity) shows the fold; mass, tags and purity do not.",
            "id": "p_cpq6_5_q5"
          }
        ]
      }
    ],
    "standalones": [
      {
        "q": "When choosing a buffer to use for an experiment conducted at pH 10.5, it would be best to choose one with a pKa of:",
        "choices": [
          "7.3.",
          "9.9.",
          "11.7.",
          "12.2."
        ],
        "ans": 1,
        "cat": "5A",
        "skill": "SIRS 3",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "sample-cp:57",
        "exp": "1. A buffer works best within about 1 pH unit of its pKa.\n2. 9.9 is 0.6 unit from 10.5; 11.7 is 1.2, 12.2 is 1.7 and 7.3 is 3.2 units away.\n**Rule to reuse:** choose the buffer whose pKa is closest to the target pH.",
        "id": "cp_q6_sa1"
      },
      {
        "q": "An object with a mass of 0.2 kg absorbs 900 J of heat while changing temperature from 15°C to 20°C. What is the specific heat of the object?",
        "choices": [
          "225 J/(kg·°C)",
          "450 J/(kg·°C)",
          "675 J/(kg·°C)",
          "900 J/(kg·°C)"
        ],
        "ans": 3,
        "cat": "5E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "sample-cp:58",
        "exp": "1. q = mcΔT, so c = q/(mΔT).\n2. ΔT = 20 − 15 = 5 °C.\n3. c = 900 ÷ (0.2 × 5) = 900 ÷ 1.0 = 900 J/(kg·°C).\n**Rule to reuse:** c = q/(mΔT), with ΔT the change in temperature.",
        "id": "cp_q6_sa2"
      },
      {
        "q": "Gamma decay occurs when a nucleus emits:",
        "choices": [
          "a photon.",
          "a positron.",
          "a neutron.",
          "an electron."
        ],
        "ans": 0,
        "cat": "4E",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe1-cp:46",
        "exp": "1. In gamma decay an excited nucleus drops to a lower energy state.\n2. The energy leaves as a gamma ray, a high-energy photon; A and Z do not change.\n3. A positron is β⁺ decay, an electron is β⁻ decay, and neutron emission lowers A.\n**Rule to reuse:** α = helium nucleus, β⁻ = electron, β⁺ = positron, γ = photon.",
        "id": "cp_q6_sa3"
      },
      {
        "q": "What volume of a 0.150 M CaBr₂ solution would contain 0.045 mol of the solute?",
        "choices": [
          "70.0 mL",
          "30.0 mL",
          "700 mL",
          "300 mL"
        ],
        "ans": 3,
        "cat": "5A",
        "skill": "SIRS 3",
        "diff": "D",
        "subj": "gen_chem",
        "twin": "pe1-cp:58",
        "exp": "1. V = n ÷ M = 0.045 mol ÷ 0.150 mol/L = 0.300 L.\n2. 0.300 L × 1000 = 300 mL.\n3. 30.0 mL slips a decimal; 70.0 and 700 mL subtract from 1 instead of dividing.\n**Rule to reuse:** V = n/M gives litres; convert to mL at the end.",
        "id": "cp_q6_sa4"
      },
      {
        "q": "Which molecule most likely binds to a steroid hormone receptor?",
        "choices": [
          "Retinoic acid",
          "Serotonin",
          "Linoleic acid",
          "Estradiol"
        ],
        "ans": 3,
        "cat": "5D",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "biochemistry",
        "twin": "pe3-cp:25",
        "exp": "1. A steroid hormone receptor binds molecules with the steroid core: four fused rings, 6-6-6-5.\n2. Estradiol has that core.\n3. Retinoic acid has one ring and a chain, serotonin is an indole amine, and linoleic acid is an open-chain fatty acid.\n**Rule to reuse:** look for the four fused 6-6-6-5 rings to find a steroid.",
        "id": "cp_q6_sa5"
      },
      {
        "q": "The pressure–temperature phase diagram of compound X is shown. Point A in this diagram, on the line between the solid and gas regions, is best described as which of the following?",
        "choices": [
          "Boiling point",
          "Critical point",
          "Melting point",
          "Sublimation point"
        ],
        "ans": 3,
        "cat": "5E",
        "skill": "SIRS 1",
        "diff": "M",
        "subj": "physics",
        "twin": "pe4-cp:27",
        "exp": "1. Point A lies on the solid–gas line, where solid and gas coexist.\n2. Crossing that line goes straight from solid to gas: sublimation.\n3. Boiling points lie on the liquid–gas line, melting points on the solid–liquid line, and the critical point ends the liquid–gas line.\n**Rule to reuse:** name a point by the line it sits on: solid–gas = sublimation, solid–liquid = melting, liquid–gas = boiling.",
        "chart": {"type":"svg","caption":"Phase diagram of compound X","alt":"Pressure–temperature phase diagram with solid, liquid and gas regions; point A lies on the line between the solid and gas regions, below the triple point.","svg":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 370' width='560' height='370' font-family='sans-serif' font-size='20'><path d='M70 20V320H540' fill='none' stroke='#222' stroke-width='2.5'/><path d='M90 310Q170 290 230 220M230 220L265 30M230 220Q340 150 450 110' fill='none' stroke='#222' stroke-width='3'/><circle cx='230' cy='220' r='5' fill='#222'/><circle cx='450' cy='110' r='5' fill='#222'/><circle cx='165' cy='282.5' r='7' fill='#b45309'/><text x='158' y='268' text-anchor='end' fill='#b45309' font-weight='bold'>A</text><text x='140' y='150' text-anchor='middle'>Solid</text><text x='345' y='80' text-anchor='middle'>Liquid</text><text x='420' y='255' text-anchor='middle'>Gas</text><text x='305' y='355' text-anchor='middle'>Temperature</text><text x='34' y='175' text-anchor='middle' transform='rotate(-90 34 175)'>Pressure</text></svg>"},
        "id": "cp_q6_sa6"
      },
      {
        "q": "An aerometer uses a solid cylindrical rod that always floats vertically in a fluid and can never tip over. The rod is marked in units equal to 1/12 of its length, and in water (density 1.0 g/cm3), it floats three-quarters submerged. What is the range of the densities of fluids that can be measured with this aerometer?",
        "choices": [
          "0.75 to 6.0 g/cm3",
          "0.75 to 9.0 g/cm3",
          "1.0 to 9.0 g/cm3",
          "1.0 to 12 g/cm3"
        ],
        "ans": 1,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "D",
        "subj": "physics",
        "twin": "pe6-cp:28",
        "exp": "1. Fraction submerged = ρ_rod ÷ ρ_fluid, so ρ_rod = 0.75 × 1.0 = 0.75 g/cm3.\n2. Least dense fluid: the rod fully submerged → 0.75 g/cm3.\n3. Densest fluid: only one mark (1/12) submerged → 0.75 ÷ (1/12) = 9.0 g/cm3.\n**Rule to reuse:** the range runs from ρ_object (fully under) to ρ_object ÷ (smallest readable fraction).",
        "id": "cp_q6_sa7"
      },
      {
        "q": "Which of the following lines of evidence best explains why muscle mass of the left ventricle of the heart is generally greater than that of the right ventricle?",
        "choices": [
          "Blood ejected from the left ventricle travels to the lungs, increasing the partial pressure of oxygen.",
          "Blood returning from systemic circulation through the vena cava fills the left ventricle first.",
          "The left ventricle pumps blood into systemic circulation to reach capillary beds throughout the body.",
          "Contraction of the left ventricle pumps blood directly into the left atrium before entering pulmonary circulation."
        ],
        "ans": 2,
        "cat": "4B",
        "skill": "SIRS 2",
        "diff": "M",
        "subj": "biology",
        "twin": "pe6-cp:46",
        "exp": "1. Wall muscle matches the pressure a chamber must generate.\n2. The left ventricle drives blood through the whole systemic circuit (about 120 mmHg); the right only pumps to the lungs (about 25 mmHg).\n3. The other choices misstate the blood's path.\n**Rule to reuse:** a heart chamber's wall is as thick as the pressure it must generate against the resistance ahead of it.",
        "id": "cp_q6_sa8"
      }
    ]
  }
];
