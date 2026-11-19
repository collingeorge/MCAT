// Chem/Phys daily quizzes: six original half-sections in the AAMC layout (P P [4] P P P [4]: 5 passages with 22
// questions + 8 stand-alones, 30 in all), for the Section Mastery end-of-day test. Every question is a twin of one studied
// card (`twin`: the card's src). Map: tools/twin-map.json. Not AAMC material.
const CP_POOL =
[
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
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5E",
     "5B",
     "5A",
     "5D"
    ],
    "title": "Blocking Thrombin and Removing Calcium",
    "passage": "Thrombin is a serine protease that converts soluble fibrinogen into fibrin, the protein that forms the mesh of a blood clot. Thrombin hydrolyzes peptide bonds on the C-terminal side of arginine residues. Its cuts at Arg–Gly bonds near the N-termini of two fibrinogen chains release short fibrinopeptides and expose the sites that let fibrin monomers polymerize. Several steps of the clotting cascade that generate thrombin also require free Ca²⁺. Inhibiting thrombin or removing Ca²⁺ therefore prevents clotting, and both strategies are used in medicine and in the laboratory.\n\nCompound 2 is an experimental anticoagulant designed to resemble the tetrahedral intermediate of peptide-bond hydrolysis. The molecule contains six stereogenic carbons and lacks any internal mirror plane, and only one of its stereoisomers is active. In assays with purified thrombin, Compound 2 occupied the active site with a dissociation constant below 1 nM, and no fibrin formed at the fibrinogen concentration found in plasma. Mass spectrometry showed that Compound 2 was recovered unchanged at the end of each assay.\n\nClinical laboratories prevent clotting in a different way. Blood drawn into tubes that contain potassium oxalate loses its free Ca²⁺, because calcium oxalate (CaC₂O₄, Ksp = 2.3 × 10⁻⁹ at 25°C) is poorly soluble. In a typical tube, the plasma contains 1.2 × 10⁻³ M free Ca²⁺, and the oxalate concentration reaches 5.0 × 10⁻³ M as the salt dissolves, before any solid has formed.",
    "questions": [
     {
      "q": "With respect to the catalytic function of thrombin, Compound 2 acts as:",
      "choices": [
       "an agonist of thrombin's activity.",
       "a substrate that thrombin hydrolyzes.",
       "an antagonist of thrombin's activity.",
       "a catalyst of fibrinogen cleavage."
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "sample-cp:1",
      "exp": "1. Find what Compound 2 does to thrombin: it occupies the active site, no fibrin forms, and Compound 2 itself is recovered unchanged.\n2. Classify that effect: activity goes **down** (no fibrinogen is cut) → blocks function → **antagonist** (inhibitor).\n3. An agonist would raise thrombin's activity, and a catalyst would speed fibrinogen cleavage. Both are the opposite of stopping it.\n4. A substrate is cut, but Compound 2 stops the cutting and is recovered intact, so it is not hydrolyzed.\n5. Answer: an antagonist of thrombin's activity (an inhibitor).\n\n**Rule to reuse:** a molecule that binds a target and blocks its function is an antagonist (inhibitor); one that increases activity is an activator or agonist.",
      "id": "p_cpq1_1_q1"
     },
     {
      "q": "What is the maximum number of stereoisomers possible for Compound 2?",
      "choices": [
       "6",
       "12",
       "64",
       "128"
      ],
      "ans": 2,
      "cat": "5B",
      "skill": "SIRS 2",
      "diff": "M",
      "subj": "organic_chem",
      "twin": "sample-cp:2",
      "exp": "1. Read off n and check for symmetry: Compound 2 has n = 6 chirality centers and no internal plane of symmetry, so there are no meso forms to lower the count.\n2. Each center can be R or S, so the count doubles for each one: 2ⁿ = 2⁶ = 2 × 2 × 2 × 2 × 2 × 2 = **64**.\n3. 6 is just n, and 12 is 2 × 6 (adding two per center instead of doubling). 128 is 2⁷ (seven centers).\n4. Answer: 64 stereoisomers.\n\n**Rule to reuse:** maximum stereoisomers = 2ⁿ for n chirality centers; subtract only when meso forms (a plane of symmetry) exist.",
      "id": "p_cpq1_1_q2"
     },
     {
      "q": "As the oxalate dissolves in the plasma of a typical tube, what happens to the calcium, and why?",
      "choices": [
       "CaC₂O₄ stays dissolved, because Q < Ksp",
       "CaC₂O₄ precipitates, because Q > Ksp",
       "CaC₂O₄ precipitates, because [Ca²⁺] + [C₂O₄²⁻] > Ksp",
       "CaC₂O₄ stays dissolved, because Q = Ksp"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "sample-cp:3",
      "exp": "1. Take both ion concentrations from the passage: [Ca²⁺] = 1.2 × 10⁻³ M and [C₂O₄²⁻] = 5.0 × 10⁻³ M.\n2. Multiply them to get Q, then compare with Ksp: Q = [Ca²⁺][C₂O₄²⁻] = (1.2 × 10⁻³)(5.0 × 10⁻³) = **6.0 × 10⁻⁶**; 6.0 × 10⁻⁶ > 2.3 × 10⁻⁹ → **Q > Ksp**.\n3. Adding the concentrations (1.2 × 10⁻³ + 5.0 × 10⁻³ = 6.2 × 10⁻³) is not a valid Q. And 6.0 × 10⁻⁶ is larger than 2.3 × 10⁻⁹, not smaller, so the solution is neither below nor at equilibrium: \"Q < Ksp\" and \"Q = Ksp\" both fail.\n4. Answer: CaC₂O₄ precipitates, because Q > Ksp. CaC₂O₄ precipitates until Q falls to Ksp, which strips out the free Ca²⁺ that clotting needs.\n\n**Rule to reuse:** Q uses the same product formula as Ksp. Q > Ksp → solid precipitates; Q < Ksp → stays dissolved; Q = Ksp → equilibrium.",
      "id": "p_cpq1_1_q3"
     },
     {
      "q": "Thrombin is incubated with the synthetic peptide Val–Arg–Gly–Phe. Which two products does it release?",
      "choices": [
       "Val and Arg–Gly–Phe",
       "Val–Arg–Gly and Phe",
       "Val–Gly and Arg–Phe",
       "Val–Arg and Gly–Phe"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "sample-cp:4",
      "exp": "1. Locate the cut site: the passage says thrombin cuts on the C-terminal side of Arg, so the bond that breaks is Arg–Gly.\n2. Number the residues from the left (the N-terminus) and cut: Val(1)–Arg(2)–Gly(3)–Phe(4); cut the Arg–Gly bond → **Val–Arg** + **Gly–Phe**.\n3. Cutting between residues 1 and 2 (the N-terminal side of Arg) gives Val + Arg–Gly–Phe; cutting between residues 3 and 4 gives Val–Arg–Gly + Phe.\n4. Hydrolysis does not rearrange residues; Val–Gly and Arg–Phe were never bonded to each other.\n5. Answer: Val–Arg and Gly–Phe.\n\n**Rule to reuse:** number residues from the N-terminus (left), break only the named peptide bond, and keep each fragment's residues in their original order.",
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
    "passage": "Engineers tested a small electric shuttle, designed to carry passengers between airport terminals, on a straight, level test track before approving it for service. Each phase was repeated five times, and the mean values are reported. Each run had three phases: a cruise at constant speed, a pass by a trackside signal, and a stop in a braking section. Before each run, a 300-mF capacitor that powers the shuttle's door actuators is charged from the shuttle's 12.0-V battery, whose internal resistance is 0.15 Ω.\n\nDuring the cruise phase, the 500-kg shuttle travels at a constant 12 m/s. Force sensors show that air drag and rolling friction together exert 750 N opposing the motion. Midway along the track, a stationary warning bell beside the rails rings at a steady frequency f, and a microphone riding in the shuttle records the tone as the shuttle approaches the bell and then moves away from it. Sound travels at 343 m/s in the air around the track.\n\nThe shuttle carried no passengers during these runs. At the end of the track, the motors are switched off and the shuttle enters a hydraulic braking section. The track there is still level, and rolling friction in this section is negligible compared with the braking force. The speed of the shuttle in the braking section, recorded once per second, is shown in Figure 1. The trackside signal shows a red lamp of wavelength 660 nm when the track ahead is occupied and a blue lamp of wavelength 440 nm when it is clear.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Speed of the shuttle in the braking section",
     "x": {
      "label": "Time (s)",
      "min": 0,
      "max": 5,
      "step": 1
     },
     "y": {
      "label": "Speed (m/s)",
      "min": 0,
      "max": 12,
      "step": 2
     },
     "series": [
      {
       "name": "Shuttle",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         12
        ],
        [
         1,
         7.2
        ],
        [
         2,
         4.3
        ],
        [
         3,
         2.6
        ],
        [
         4,
         1.6
        ],
        [
         5,
         0.93
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Once the door-actuator capacitor is fully charged, what charge does it hold and how much energy does it store?",
      "choices": [
       "0.025 C and 21.6 J",
       "3.6 C and 21.6 J",
       "3.6 C and 43.2 J",
       "3600 C and 21,600 J"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe3-cp:5",
      "exp": "1. Convert the capacitance to farads first: 300 mF = 300 × 10⁻³ F = **0.300 F**.\n2. The internal resistance only sets how fast the capacitor charges: τ = rC = 0.15 Ω × 0.300 F = **0.045 s**. Once it is fully charged, I = 0, so V_r = Ir = **0** and the full **12.0 V** sits on C.\n3. Charge: Q = CV = **0.300 F** × **12.0 V** = **3.6 C**. \"0.025 C\" divides C by V (0.300 ÷ 12.0), and \"3600 C\" leaves C in millifarads (300 × 12.0).\n4. Energy: U = ½CV² = ½ × 0.300 × **12.0²** = ½ × 0.300 × **144** = **21.6 J**; check: ½QV = ½ × 3.6 × 12.0 = 21.6 J. \"43.2 J\" drops the ½.\n5. Answer: 3.6 C and 21.6 J.\n\n**Rule to reuse:** for a fully charged capacitor, Q = CV and U = ½CV², using the full battery voltage. Convert mF/μF to F first; resistance only changes how fast it charges.",
      "id": "p_cpq1_2_q1"
     },
     {
      "q": "Which describes the frequency f′ that the microphone records, compared with f, as the shuttle approaches and then recedes from the bell?",
      "choices": [
       "f > f′ approaching; f′ > f receding",
       "f′ = f approaching; f′ = f receding",
       "f′ > f approaching; f′ < f receding",
       "f′ > f approaching; f′ > f receding"
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe3-cp:6",
      "exp": "1. Identify who moves: the bell is stationary, and the microphone (the observer) moves at 12 m/s. For a moving observer, f′ = f(v ± v_o)/v, with + when moving toward the source.\n2. Approaching: use the + sign. f′ = f(343 + **12**)/343 = f × 355/343 ≈ **1.035f** > f.\n3. Receding: use the − sign. f′ = f(343 − **12**)/343 = f × 331/343 ≈ **0.965f** < f.\n4. The speed is constant, so the pitch is steady on each side and drops as the shuttle passes the bell. The choice with f′ below f approaching and above f receding reverses the signs, f′ = f both times ignores the moving observer, and f′ above f both times forgets that the shift flips once the shuttle moves away.\n5. Answer: f′ is above f approaching and below f receding, about 1.035f and then 0.965f.\n\n**Rule to reuse:** getting closer → higher pitch; getting farther → lower pitch, whether the listener or the source moves. Moving listener: f′ = f(v ± v_o)/v.",
      "id": "p_cpq1_2_q2"
     },
     {
      "q": "During the cruise phase, what power must the motors deliver to the wheels?",
      "choices": [
       "62.5 W",
       "6.0 kW",
       "9.0 kW",
       "36 kW"
      ],
      "ans": 2,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe3-cp:7",
      "exp": "1. Constant speed means zero acceleration, so the forces balance: F_net = F_drive − 750 N = ma = **0**, so F_drive = **750 N**.\n2. Power delivered at constant speed is force × velocity: P = Fv = **750 N** × **12 m/s** = **9000 W** = **9.0 kW**.\n3. The mass is a distractor: 500 × 12 = 6000 → \"6.0 kW\" (mass used as force); 750 ÷ 12 = 62.5 → \"62.5 W\" (divided); ½ × 500 × 12² = 36,000 J → \"36 kW\" is kinetic energy, not power.\n4. Answer: 9.0 kW, since P = Fv with F equal to the 750 N resistive force.\n\n**Rule to reuse:** constant speed → driving force = total resistance; then P = Fv. Mass only matters when the speed changes.",
      "id": "p_cpq1_2_q3"
     },
     {
      "q": "How do the energy and frequency of a photon from the signal's blue lamp compare with those of a photon from its red lamp?",
      "choices": [
       "1.5 times the energy and 1.5 times the frequency",
       "1.5 times the energy and 0.67 times the frequency",
       "0.67 times the energy and 1.5 times the frequency",
       "0.67 times the energy and 0.67 times the frequency"
      ],
      "ans": 0,
      "cat": "4D",
      "skill": "SIRS 4",
      "diff": "X",
      "twin": "pe5-cp:54",
      "exp": "1. Photon energy and frequency both scale as 1/λ: **E = hf = hc/λ**, so E and f always change by the same factor.\n2. Wavelength ratio, red ÷ blue: 660 nm ÷ 440 nm = **1.5**. The blue photon has the shorter wavelength, so it has the larger energy and frequency.\n3. Blue ÷ red: E and f are each **1.5 times** as large.\n4. \"0.67 times the energy and 0.67 times the frequency\" treats E and f as proportional to λ. The two mixed choices split E and f, which is impossible because E = hf ties them together.\n5. Answer: 1.5 times the energy and 1.5 times the frequency.\n\n**Rule to reuse:** E ∝ f ∝ 1/λ. Find the wavelength ratio, then flip it for both energy and frequency.",
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
    "title": "Removing Carbon Dioxide from a Spacecraft Cabin",
    "passage": "Each astronaut exhales about 1 kg of CO₂ per day, and in a sealed cabin the gas must be removed before its partial pressure becomes harmful. Early spacecraft used canisters of lithium hydroxide granules, which absorb CO₂ irreversibly:\n\n2 LiOH(s) + CO₂(g) → Li₂CO₃(s) + H₂O(g)   Reaction 1\n\nInside the moist granules the absorption happens in steps. Dissolved CO₂ first combines with a hydroxide ion to give hydrogen carbonate, and a second hydroxide ion then removes the proton from HCO₃⁻:\n\nHCO₃⁻(aq) + OH⁻(aq) → CO₃²⁻(aq) + H₂O(l)   Reaction 2\n\nBecause a spent LiOH canister must be discarded, later spacesuits used a regenerable silver-based sorbent that captures CO₂ as silver carbonate:\n\nAg₂O(s) + CO₂(g) ⇌ Ag₂CO₃(s)   Reaction 3\n\nThe sorbent is regenerated by heating the spent cartridge in an oven to drive the reverse of Reaction 3, the decomposition of Ag₂CO₃. For that decomposition, ΔH° = +81 kJ/mol and ΔS° = +168 J/(mol·K). In one test, a spent cartridge held at 400 K under standard conditions released no CO₂ at all, so engineers had to redesign the oven. Mission planners also needed to know how much CO₂ a given mass of each sorbent can hold, because every kilogram launched into orbit is expensive. Both sorbents must work reliably on missions lasting many days, so their capacity and regeneration were tested on the ground first.",
    "questions": [
     {
      "q": "At 400 K in the test, the decomposition of Ag₂CO₃ is best described as:",
      "choices": [
       "Spontaneous; entropy dominates",
       "Spontaneous; enthalpy dominates",
       "Nonspontaneous; entropy dominates",
       "Nonspontaneous; enthalpy dominates"
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:1",
      "exp": "1. Translate: \"released no CO₂\" means the decomposition is not spontaneous at 400 K, so ΔG must be positive. Find which term, ΔH or TΔS, is bigger.\n2. Put ΔS in kJ before combining it with ΔH, then compute TΔS: ΔS = 168 J/(mol·K) ÷ 1000 = **0.168 kJ/(mol·K)**; TΔS = **400 K** × 0.168 kJ/(mol·K) = **67.2 kJ/mol**.\n3. Apply ΔG = ΔH − TΔS = **81** − **67.2** kJ/mol ≈ **+13.8 kJ/mol** > 0, so neither \"spontaneous\" choice fits.\n4. Plot ΔG against T: the line is still above zero at 400 K and crosses zero only near 482 K (81 ÷ 0.168), so the oven must run hotter than that.\n5. ΔH (81) is larger than TΔS (67.2), so the enthalpy term dominates. \"Entropy dominates\" only appears if you skip the J → kJ conversion (400 × 168 = 67,200, which looks bigger than 81).\n6. Answer: nonspontaneous; enthalpy dominates, which matches the cartridge releasing no CO₂ at 400 K.\n\n**Rule to reuse:** ΔG = ΔH − TΔS. Put ΔS in kJ, T in K, compare ΔH with TΔS: the bigger one wins. \"Nothing happens\" means ΔG > 0.",
      "id": "p_cpq1_3_q1"
     },
     {
      "q": "A sealed cartridge contains Ag₂O(s), Ag₂CO₃(s) and CO₂(g) at equilibrium (Reaction 3). If more Ag₂CO₃(s) is added at constant temperature, which expression for K applies, and how does P_CO₂ respond?",
      "choices": [
       "K = [Ag₂CO₃]/([Ag₂O]P_CO₂); P_CO₂ increases",
       "K = [Ag₂CO₃]/P_CO₂; P_CO₂ is unchanged",
       "K = 1/P_CO₂; P_CO₂ increases",
       "K = 1/P_CO₂; P_CO₂ is unchanged"
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe4-cp:2",
      "exp": "1. Label each species' phase: Ag₂O and Ag₂CO₃ are solids; CO₂ is the only gas.\n2. Pure solids have activity 1 and drop out of K: K = a_Ag₂CO₃ ÷ (a_Ag₂O × P_CO₂) = **1** ÷ (**1** × P_CO₂) = **1/P_CO₂**. Both expressions that keep a bracketed solid are wrong.\n3. Adding solid Ag₂CO₃ does not change any term in K, so Q still equals K and nothing shifts; P_CO₂ does not rise.\n4. Answer: K = 1/P_CO₂; P_CO₂ is unchanged at constant temperature; only a temperature change could alter it.\n\n**Rule to reuse:** leave pure solids and liquids out of K. Adding or removing a solid never shifts the equilibrium; only gases, solutes and temperature matter.",
      "id": "p_cpq1_3_q2"
     },
     {
      "q": "In Reaction 2, what happens to the oxidation state of the carbon atom?",
      "choices": [
       "It increases, since the ion loses H",
       "It decreases, since the ion gains charge",
       "It is unchanged, since only H⁺ moves",
       "It is unchanged, since C stays negative"
      ],
      "ans": 2,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:3",
      "exp": "1. Translate: assign carbon's oxidation state before and after, then decide whether Reaction 2 is redox or acid–base.\n2. Oxidation state in HCO₃⁻: O is −2, H is +1, and the ion's charge is −1: C + 1 + 3(−2) = −1 → C = **+4**.\n3. Oxidation state in CO₃²⁻: same rule, but the charge is −2: C + 3(−2) = −2 → C = **+4**. Carbon neither rises nor falls.\n4. Nothing changed at carbon: an H⁺ moved from HCO₃⁻ to OH⁻. A proton transfer is acid–base, not redox. A negative value has the wrong sign for a carbon bonded only to the more electronegative O.\n5. Answer: it is unchanged; carbon stays +4, since only H⁺ moves.\n\n**Rule to reuse:** to test for redox, compute oxidation states before and after (H = +1, sum = charge). Moving only H⁺ is acid–base, never redox.",
      "id": "p_cpq1_3_q3"
     },
     {
      "q": "A canister holds 96 g of LiOH (M = 24 g/mol). According to Reaction 1, what volume of CO₂, measured at STP, can it absorb?",
      "choices": [
       "22.4 L",
       "44.8 L",
       "89.6 L",
       "179.2 L"
      ],
      "ans": 1,
      "cat": "4B",
      "skill": "SIRS 3",
      "diff": "X",
      "twin": "pe4-cp:4",
      "exp": "1. Translate: grams of LiOH → moles → mole ratio → moles of CO₂ → liters at STP.\n2. Convert mass to moles: n = m ÷ M = **96 g** ÷ **24 g/mol** = **4.0 mol LiOH**.\n3. Use the coefficients: 2 LiOH absorb 1 CO₂, so n(CO₂) = 4.0 mol × (1 CO₂ ÷ 2 LiOH) = **2.0 mol**. That rules out \"89.6 L\" (no ratio) and \"179.2 L\" (ratio flipped).\n4. At STP, 1 mol of ideal gas occupies 22.4 liters: V = **2.0 mol** × 22.4 L/mol = **44.8 L**. \"22.4 L\" applies the 1 : 2 ratio twice (4.0 ÷ 2 ÷ 2 = 1.0 mol).\n5. Answer: 44.8 L.\n\n**Rule to reuse:** grams → moles (÷ molar mass) → mole ratio from coefficients → liters (× 22.4 liters/mol at STP).",
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
    "title": "An Inhibitor for a Bacterial Tetrameric Kinase",
    "passage": "Enzyme T, a kinase from a pathogenic bacterium, is a tetramer, whereas the related human Enzyme H is a monomer. Selective inhibitors of bacterial enzymes are sought because they can stop a pathogen without harming the host. In binding studies, both enzymes were half-saturated at 15 μM substrate. The fractional saturation of Enzyme T was 0.04, 0.50 and 0.80 at 3, 15 and 30 μM substrate, while that of Enzyme H was 0.17, 0.50 and 0.67 at the same concentrations.\n\nTo find a drug that blocks Enzyme T but spares Enzyme H, chemists prepared Compound 4 in several steps. The starting material was an unknown liquid with the formula C₆H₁₂O. One step used hydrogen gas over a metal catalyst; before the rigid steel reactor was opened, the leftover H₂ was removed by admitting O₂, giving a 2 : 1 H₂ : O₂ mixture whose total pressure was 3.0 atm at 450 K, and then sparking it. The reactor was held at 450 K, so all of the water formed stayed in the gas phase.\n\nCompound 4 is neutral at physiological pH and has log P (octanol/water) = 2.2. During the final workup it was partitioned between equal volumes of ethyl acetate and water. Its effect on Enzyme T was then measured at 15 μM substrate, and the results are shown in Figure 1. Each measurement was repeated three times, and mean values are shown.",
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
      "q": "The starting material's IR spectrum has one strong, sharp peak at 1718 cm⁻¹, and the regions 3200–3600 cm⁻¹ and 2700–2850 cm⁻¹ are empty. Which compound is it?",
      "choices": [
       "3-Hexanone",
       "Hexanal",
       "Cyclohexanol",
       "Cyclopentyl methyl ether"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "subj": "organic_chem",
      "twin": "pe5-cp:36",
      "exp": "1. A strong, sharp band near 1718 cm⁻¹ is a C=O stretch. Only hexanal and 3-hexanone contain C=O.\n2. The alcohol and the ether have no C=O, and the alcohol's O–H band is also missing: cyclohexanol would show a broad O–H band at **3200–3550** cm⁻¹; cyclopentyl methyl ether shows only a C–O stretch at **1050–1150** cm⁻¹.\n3. An aldehyde's H on the C=O carbon gives a pair of weak bands near 2720 and 2820 cm⁻¹. That region is empty, so the C=O carbon bears no H, which rules out hexanal.\n4. In 3-hexanone (CH₃CH₂–CO–CH₂CH₂CH₃) the carbonyl carbon is bonded to two carbons: a ketone, C₆H₁₂O.\n5. Answer: 3-hexanone. 1718 = C=O; an aldehyde would add the 2720/2820 pair, and a ketone adds nothing extra.\n\n**Rule to reuse:** **IR spectroscopy** detects bond vibrations; each bond type absorbs in a typical range of wavenumbers (cm⁻¹).",
      "id": "p_cpq1_4_q1"
     },
     {
      "q": "After the H₂ and O₂ in the reactor react completely at 450 K, what is the final pressure?",
      "choices": [
       "1.3 atm",
       "2.0 atm",
       "3.0 atm",
       "4.5 atm"
      ],
      "ans": 1,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "pe5-cp:37",
      "exp": "1. Rigid reactor: V fixed. Held at 450 K: T fixed. Then P = nRT/V, so P is proportional to the moles of gas.\n2. Count moles of gas before and after, from 2 H₂(g) + O₂(g) → 2 H₂O(g). The 2 : 1 ratio matches the equation, so nothing is left over: start: 2 H₂ + 1 O₂ = **3 mol gas**; end: 2 H₂O(g) = **2 mol gas** (the water stays a gas at 450 K).\n3. The gas count falls to two-thirds.\n4. Scale the pressure: P₂ = P₁ × n₂/n₁ = 3.0 atm × **2/3** = **2.0 atm**. \"4.5 atm\" flips the ratio (3/2), \"3.0 atm\" ignores the change in moles, and \"1.3 atm\" applies 2/3 twice. Answer: 2.0 atm.\n\n**Rule to reuse:** fixed volume and temperature → pressure is proportional to moles of gas. Count gas coefficients on each side and scale the pressure by after ÷ before.",
      "id": "p_cpq1_4_q2"
     },
     {
      "q": "During the final workup, most of Compound 4 will be found:",
      "choices": [
       "in ethyl acetate, because Compound 4 is lipophilic.",
       "in water, because positive log P means polar.",
       "in water, because it is the lower layer.",
       "in both equally, because the volumes match."
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 2",
      "diff": "M",
      "subj": "organic_chem",
      "twin": "pe5-cp:38",
      "exp": "1. P is the ratio of concentrations, organic over water: P = [Compound 4]organic / [Compound 4]water; log P = 2.2 → P = 10^2.2 ≈ **1.6 × 10²**.\n2. log P > 0 means the organic phase wins. \"positive log P means polar\" flips the definition.\n3. Compound 4 is neutral, so pH cannot pull it into water as an ion. Ethyl acetate, like octanol, is an organic solvent that does not mix with water.\n4. With equal volumes, fraction in ethyl acetate ≈ P/(P + 1) = 160/161 ≈ **99.4%**. Density only decides which layer is on top (water is denser, so it is the lower layer), and equal volumes do not mean equal amounts. Answer: in ethyl acetate, because Compound 4 is lipophilic.\n\n**Rule to reuse:** log P > 0 → prefers the oily (organic) layer; log P < 0 → prefers water. Each +1 in log P = 10× more in the oily layer.",
      "id": "p_cpq1_4_q3"
     },
     {
      "q": "Based on Figure 1, what concentration of Compound 4 reduces the activity of Enzyme T to half of its maximum?",
      "choices": [
       "About 0.7 μM",
       "About 5 μM",
       "About 7 μM",
       "About 50 μM"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 3",
      "diff": "X",
      "twin": "pe5-cp:39",
      "exp": "1. The x-axis of Figure 1 is a logarithm, so every number on it is an exponent.\n2. Go across from 50% to the curve, then straight down: maximum ≈ 100% → half = **50%**; the curve crosses 50% at log[I] = **0.7**.\n3. Undo the logarithm: [I] = 10^0.7 μM = 10¹ ÷ 10^0.3 = 10 ÷ **2.0** ≈ **5 μM**.\n4. Check the neighbors: at 1 μM (log 0) activity is still 83%, and at 10 μM (log 1) it is 33%. \"About 0.7 μM\" reads the log value as a concentration, \"About 7 μM\" treats 10^0.7 as 0.7 × 10, and \"About 50 μM\" is a ×10 slip.\n5. Answer: about 5 μM. On a log axis, read the x-value at 50%, then raise 10 to that power.\n\n**Rule to reuse:** on a log x axis, read the x value, then raise 10 to it (10^x). Half-maximal = 50% of the top plateau; read across, then down.",
      "id": "p_cpq1_4_q4"
     },
     {
      "q": "Based on the binding data in the passage, which description best fits substrate binding by Enzyme T?",
      "choices": [
       "Negative cooperativity, since it binds weakly at low [S]",
       "No cooperativity, since both enzymes saturate fully",
       "Positive cooperativity, since its saturation curve is sigmoidal",
       "Positive cooperativity, since its affinity is higher at every [S]"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:40",
      "exp": "1. Enzyme T has four subunits, so cooperativity is possible. Compare its data with those of the monomeric Enzyme H.\n2. Enzyme H rises steeply at first and then levels off, the hyperbolic, noncooperative shape: 3 μM: **0.17**; 15 μM: **0.50**; 30 μM: **0.67**.\n3. Enzyme T starts flat and then climbs steeply around 15 μM, an S-shaped curve: 3 μM: **0.04**; 15 μM: **0.50**; 30 μM: **0.80**.\n4. Every curve saturates eventually, so that says nothing about cooperativity. And T binds less than H below 15 μM, so its affinity is not higher at all [S].\n5. A weak start followed by a steep rise means later substrate molecules bind more tightly: the opposite of negative cooperativity.\n6. Answer: positive cooperativity, since its saturation curve is sigmoidal. Hyperbola = independent sites; sigmoid = positive cooperativity.\n\n**Rule to reuse:** hyperbola = noncooperative; sigmoid (S-shaped) = positive cooperativity. Reaching full saturation says nothing about cooperativity; the shape does.",
      "id": "p_cpq1_4_q5"
     }
    ]
   },
   {
    "id": "p_cpq1_5",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5A",
     "4E"
    ],
    "title": "Attaching a Fluorescent Dye to Enzyme K",
    "passage": "Fluorescent labels are widely used because they let changes in protein shape be followed in real time. To follow conformational changes of Enzyme K, a 50-kDa enzyme, by fluorescence, researchers attached a dye through an iodoacetamide group, which at pH 7.5 alkylates only sulfhydryl (–SH) groups. Enzyme K has a single such side chain. The protein (2.0 mL of a 6.0 mg/mL solution) was mixed with excess dye in a labeling buffer of 0.200 M Tris (molar mass 121.1 g/mol) and kept for 2 h at 4°C.\n\nThe product was analyzed by native gel electrophoresis, which separates proteins by charge as well as by size. Because the dye carries two negative charges, labeled Enzyme K migrates farther toward the positive electrode than unlabeled Enzyme K. An unlabeled control sample was run in lane 1 and the labeling product in lane 2. The gel was first viewed under UV light and then stained for protein, and the bands are summarized in Table 1. Gels were run in duplicate, and the duplicate gels gave identical bands.\n\nLabeling efficiency matters because unlabeled molecules are invisible in fluorescence experiments, while free dye raises the background signal. Finally, the specific activity of the protein in the labeling product (activity per milligram of Enzyme K) was found to equal that of unlabeled Enzyme K within experimental error.",
    "figure": {
     "caption": "Table 1 Native gel of the labeling reaction",
     "columns": [
      "Lane",
      "Band position",
      "Protein stain",
      "UV fluorescence"
     ],
     "rows": [
      [
       "1 (control)",
       "Upper",
       "Strong",
       "None"
      ],
      [
       "2 (product)",
       "Upper",
       "Moderate",
       "None"
      ],
      [
       "2 (product)",
       "Middle",
       "Moderate, equal to upper",
       "Strong"
      ],
      [
       "2 (product)",
       "Dye front",
       "None",
       "Strong"
      ]
     ]
    },
    "questions": [
     {
      "q": "Based on Table 1, about how much of the Enzyme K in the labeling product remained unlabeled?",
      "choices": [
       "Essentially none",
       "Roughly half",
       "Almost all",
       "Cannot be determined"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:33",
      "exp": "1. The middle band in lane 2 stains for protein and also fluoresces, so that protein carries dye: stain ✓, UV ✓ → **labeled Enzyme K**.\n2. The band at the dye front fluoresces but has no protein: stain ✗, UV ✓ → **free, unreacted dye**.\n3. Unlabeled protein runs at its own position, the upper band of the control lane, and lane 2 has a band there that stains but does not fluoresce, with the same intensity as the labeled band: upper band: stain ✓, UV ✗ → **≈ 50% unlabeled**. So \"essentially none\" and \"almost all\" do not fit, and the two stain intensities do let the fraction be estimated.\n4. Answer: roughly half of the protein is unlabeled.\n\n**Rule to reuse:** on a gel, combine a protein stain with a label signal: a band with both is labeled protein, a band with only the label is free label, and a band with only the protein stain at the unlabeled position is unlabeled protein.",
      "id": "p_cpq1_5_q1"
     },
     {
      "q": "Which amino acid side chain of Enzyme K does the iodoacetamide group of the dye modify?",
      "choices": [
       "Cys, –CH₂SH",
       "Met, –CH₂CH₂SCH₃",
       "Thr, –CH(OH)CH₃",
       "Tyr, –CH₂C₆H₄OH"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "subj": "organic_chem",
      "twin": "pe6-cp:34",
      "exp": "1. The reagent needs an S–H: a sulfur bonded to hydrogen.\n2. Find the atom at the end of each side chain and what it is bonded to: Cys: –CH₂–**S–H**; Met: –CH₂CH₂–**S–CH₃**, no H on S; Thr: –CH(**O–H**)CH₃; Tyr: –CH₂–C₆H₄–**O–H**.\n3. Methionine has sulfur, but it is a thioether with no H on S.\n4. Threonine and tyrosine have O–H groups, not S–H.\n5. Answer: Cys, –CH₂SH. S with an H = thiol = cysteine; S between two carbons = methionine.\n\n**Rule to reuse:** **Thiol:** R–S–H. **Thioether (sulfide):** R–S–R, no H on S. **Alcohol:** R–O–H. **Primary amine:** R–NH₂.",
      "id": "p_cpq1_5_q2"
     },
     {
      "q": "Approximately how many grams of Tris are needed to prepare 250 mL of the labeling buffer?",
      "choices": [
       "0.05 g",
       "3.0 g",
       "6.1 g",
       "24 g"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "pe6-cp:35",
      "exp": "1. Collect the data and convert the volume to liters: V = 250 mL = **0.250 L**; the buffer is 0.200 M Tris, 121.1 g/mol.\n2. Moles from molarity, then grams from molar mass: n = 0.200 mol/L × 0.250 L = **0.0500 mol**; m = 0.0500 mol × 121.1 g/mol = **6.06 g ≈ 6.1 g**.\n3. \"24 g\" is the mass for a full liter (0.200 × 121.1 = 24.2 g), \"0.05 g\" is the number of moles, not grams, and \"3.0 g\" halves the correct mass (6.06 ÷ 2).\n4. Answer: about 6.1 g of Tris.\n\n**Rule to reuse:** grams from a solution = M × V (in liters) × molar mass. Always turn mL into L first.",
      "id": "p_cpq1_5_q3"
     },
     {
      "q": "How many moles of Enzyme K were used in the labeling reaction?",
      "choices": [
       "0.12 μmol",
       "0.24 μmol",
       "0.24 mmol",
       "0.24 mol"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 3",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "pe6-cp:36",
      "exp": "1. Mass used = volume × concentration: m = 2.0 mL × 6.0 mg/mL = **12 mg** = **0.012 g**.\n2. Translate the molecular weight: 1 Da = 1 g/mol, so 50 kDa = **50,000 g/mol**.\n3. Divide grams by g/mol: n = 0.012 g ÷ 50,000 g/mol = **2.4 × 10⁻⁷ mol** = **0.24 μmol** (240 nmol).\n4. The others are slips: \"0.24 mmol\" reads 50 kDa as 50 g/mol (or keeps mg as g), \"0.24 mol\" makes both slips, and \"0.12 μmol\" skips the volume (6.0 mg only).\n5. Answer: 0.24 μmol of Enzyme K.\n\n**Rule to reuse:** mass = volume × concentration; kDa × 1000 = g/mol; moles = grams ÷ g/mol. Keep every unit in grams.",
      "id": "p_cpq1_5_q4"
     },
     {
      "q": "Because labeling did not change the specific activity of Enzyme K, which best describes the location of its labeled cysteine?",
      "choices": [
       "Within the catalytic pocket",
       "In the nonpolar interior of the fold",
       "Solvent-exposed, distant from the catalytic pocket",
       "At a site where partner proteins dock"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe6-cp:37",
      "exp": "1. Two clues: the dye reagent is dissolved in water, and the labeled enzyme keeps its full specific activity.\n2. The dye attaches to the cysteine thiol, and a bulky dye there would block anything nearby.\n3. Full activity rules out a label within the catalytic pocket.\n4. A water-soluble reagent reaches exposed residues first; the nonpolar interior of the fold and a docking site covered by a partner protein are hidden from solvent.\n5. Answer: solvent-exposed, distant from the catalytic pocket, where the dye can reach the cysteine without disturbing catalysis.\n\n**Rule to reuse:** a reagent in water labels exposed surface residues; if activity is unchanged, the label is away from the active site.",
      "id": "p_cpq1_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "At pH 7, approximately what net charge does the peptide Asp–Glu–Lys–Asp–Arg–Glu–Asp carry?",
    "choices": [
     "−5",
     "−4",
     "−3",
     "+3"
    ],
    "ans": 2,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "twin": "sample-cp:17",
    "exp": "1. List the residues and the pH: seven residues at pH 7, with five acidic (Asp, Glu, Asp, Glu, Asp) and two basic (Lys, Arg) side chains.\n2. Add up every charge: termini: +1 (–NH₃⁺) − 1 (–COO⁻) = 0; side chains: Asp −1, Glu −1, Lys +1, Asp −1, Arg +1, Glu −1, Asp −1; net = 0 + 2 − 5 = **−3**.\n3. \"−5\" forgets the +1 side chains of Lys and Arg; \"−4\" forgets one of them (or counts the C-terminal −1 without the N-terminal +1); \"+3\" flips the signs.\n4. Answer: −3.\n\n**Rule to reuse:** at pH 7, termini cancel (+1, −1); add +1 for each Lys/Arg and −1 for each Asp/Glu side chain.",
    "id": "cp_q1_sa1"
   },
   {
    "q": "A child's eyeball is slightly too short, so light from a nearby page comes to a focus behind the retina. What kind of corrective lens is needed?",
    "choices": [
     "A converging lens",
     "A diverging lens",
     "A prism",
     "A plain glass plate"
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "twin": "sample-cp:43",
    "exp": "1. The image lands behind the retina.\n2. Reason from where the focus is: focus behind the retina → the eye bends light too little → it needs more bending → a convex (converging, positive-power) lens, which moves the focus forward onto the retina.\n3. A concave (diverging) lens would push the focus farther back; it corrects nearsightedness. A prism only redirects light, and plain window glass adds no converging power.\n4. Answer: a converging lens.\n\n**Rule to reuse:** focus behind the retina (farsighted) needs a converging lens; focus in front (nearsighted) needs a diverging lens.",
    "id": "cp_q1_sa2"
   },
   {
    "q": "Data at 25°C: AgBr, Ksp = 5.0 × 10⁻¹³; NaBr is very soluble. Solid NaBr is dissolved in a saturated AgBr solution until [Br⁻] = 0.020 M. Once the NaBr has dissolved, the expected outcome is that:",
    "choices": [
     "AgBr precipitates, because Ksp decreases.",
     "more AgBr dissolves, because Q < Ksp.",
     "nothing happens, because Ksp stays constant.",
     "AgBr precipitates, because Q > Ksp."
    ],
    "ans": 3,
    "cat": "5A",
    "skill": "SIRS 4",
    "diff": "X",
    "subj": "gen_chem",
    "twin": "pe1-cp:57",
    "exp": "1. Find [Ag⁺] in the saturated solution before anything is added: Ksp = [Ag⁺][Br⁻] = s²; s = √(5.0 × 10⁻¹³) ≈ **7.1 × 10⁻⁷ M**.\n2. Add the common ion and compute Q: Q = [Ag⁺][Br⁻] = (7.1 × 10⁻⁷)(0.020) = **1.4 × 10⁻⁸**.\n3. Compare Q with Ksp: 1.4 × 10⁻⁸ > 5.0 × 10⁻¹³ → **Q > Ksp** (about 28,000 times larger), so the solution is supersaturated and solid forms until [Ag⁺] = 5.0 × 10⁻¹³ ÷ 0.020 = 2.5 × 10⁻¹¹ M. More AgBr cannot dissolve, and something does happen.\n4. Ksp depends only on temperature, so it did not fall; Q rose instead.\n5. Answer: AgBr precipitates, because Q > Ksp (the common-ion effect).\n\n**Rule to reuse:** compute Q with current ion concentrations. Q > Ksp → precipitate; Q < Ksp → more dissolves; Q = Ksp → saturated. Ksp changes only with T.",
    "id": "cp_q1_sa3"
   },
   {
    "q": "In both drawings below, three Br atoms are singly bonded to the central atom, and no lone pairs are shown. Which comparison of the molecular geometries is correct?",
    "fig": [
     "cpd-bbr3",
     "cpd-pbr3"
    ],
    "choices": [
     "BBr₃ trigonal planar; PBr₃ trigonal pyramidal",
     "BBr₃ trigonal planar; PBr₃ trigonal planar",
     "BBr₃ trigonal pyramidal; PBr₃ trigonal planar",
     "BBr₃ tetrahedral; PBr₃ tetrahedral"
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 4",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "pe3-cp:57",
    "exp": "1. Both drawings show three bonds; what differs is what the central atom has left over.\n2. Add the missing lone pairs by counting valence electrons: B: 3 valence − 3 in bonds = **0** → 0 lone pairs; P: 5 valence − 3 in bonds = **2** → 1 lone pair; domains: BBr₃ = **3**, PBr₃ = **4**.\n3. Boron has no lone pair and only three domains, so BBr₃ is neither pyramidal nor tetrahedral.\n4. The lone pair on P makes four domains: tetrahedral electron geometry, but with only three atoms the shape is a pyramid. PBr₃ is not planar, so \"BBr₃ trigonal planar; PBr₃ trigonal planar\" fails.\n5. Answer: BBr₃ trigonal planar; PBr₃ trigonal pyramidal. Add the lone pairs before naming a shape; molecular shape counts atoms only.\n\n**Rule to reuse:** Skeletal drawings often leave out lone pairs. Add them: **lone-pair electrons on the central atom = valence electrons − electrons used in bonds** (one per single bond from that atom).",
    "id": "cp_q1_sa4"
   },
   {
    "q": "An ion has energy levels at −8.0 eV, −5.5 eV, −2.0 eV and −1.2 eV. For which downward jump is the emitted photon's wavelength longest?",
    "choices": [
     "−1.2 eV → −8.0 eV",
     "−1.2 eV → −2.0 eV",
     "−2.0 eV → −8.0 eV",
     "−5.5 eV → −8.0 eV"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe4-cp:28",
    "exp": "1. Translate: the longest wavelength means the smallest photon energy, because E = hc/λ.\n2. Compute each transition's energy gap: −1.2 → −8.0: ΔE = **6.8 eV**; −1.2 → −2.0: ΔE = **0.8 eV**; −2.0 → −8.0: ΔE = **6.0 eV**; −5.5 → −8.0: ΔE = **2.5 eV**.\n3. Compare the gaps: λ ∝ 1/ΔE, so the smallest gap, 0.8 eV, gives the longest wavelength; the 6.8, 6.0 and 2.5 eV jumps all give shorter wavelengths.\n4. Answer: −1.2 eV → −2.0 eV, the smallest gap. The 6.8 eV jump gives the shortest wavelength, not the longest.\n\n**Rule to reuse:** photon energy = gap between levels, and λ = hc/E. Longest wavelength ↔ smallest gap; shortest wavelength ↔ biggest gap.",
    "id": "cp_q1_sa5"
   },
   {
    "q": "The membrane potential recorded at an axon hillock during one action potential is plotted below. Which ion movement mainly causes the potential to change as it does at 3.0 ms?",
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
     "Na⁺ influx",
     "K⁺ influx",
     "ATP-driven ion pumping",
     "K⁺ efflux"
    ],
    "ans": 3,
    "cat": "4C",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biology",
    "twin": "pe4-cp:58",
    "exp": "1. The question asks about one moment on the trace, 3.0 ms.\n2. Read the trace: the peak is +35 mV at 2.5 ms, and at 3.0 ms the potential has already fallen to −10 mV, so it is falling: repolarization.\n3. A falling potential is not the Na⁺ upstroke, which happens between 2.0 and 2.5 ms, so Na⁺ influx is out.\n4. K⁺ is high inside the cell, so open voltage-gated K⁺ channels let it out, not in; ATP-driven ion pumping by the Na⁺/K⁺ pump is too slow to shape a millisecond spike.\n5. Answer: K⁺ efflux. Rising = Na⁺ in, falling = K⁺ out, dip below rest = K⁺ channels slow to close.\n\n**Rule to reuse:** on a spike trace: rising = Na⁺ in, falling = K⁺ out, dip below rest = K⁺ channels slow to close. The pump only keeps the gradients.",
    "id": "cp_q1_sa6"
   },
   {
    "q": "In a fusion reactor, deuterium and tritium nuclei must come within about 3 × 10⁻¹⁵ m of each other to fuse. The fuel must be heated to about 10⁸ K because:",
    "choices": [
     "heating turns off the repulsive strong force.",
     "heating removes the positive charge of the nuclei.",
     "heating lowers the plasma density, softening collisions.",
     "only fast nuclei overcome their Coulomb repulsion."
    ],
    "ans": 3,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe5-cp:26",
    "exp": "1. Each nucleus contains one proton (deuterium: 1 p + 1 n; tritium: 1 p + 2 n), so each carries +1e and the two repel.\n2. Compute the repulsive energy at the fusion distance: U = kq₁q₂/r = (9.0 × 10⁹)(1.6 × 10⁻¹⁹)² / (**3 × 10⁻¹⁵ m**) ≈ **7.7 × 10⁻¹⁴ J** ≈ 0.48 MeV.\n3. The repulsive energy climbs steeply as r shrinks, so the nuclei must arrive with enough kinetic energy to climb this hill.\n4. Temperature sets the kinetic energy: KE_avg = (3/2)kT = 1.5 × 1.38 × 10⁻²³ × **10⁸ K** ≈ **2.1 × 10⁻¹⁵ J**. Even this is below the barrier, so only the fastest nuclei, helped by quantum tunneling, fuse; that is why T must be so high.\n5. The strong force attracts nucleons and is not a repulsion to switch off; heat strips electrons, not nuclear charge; a thinner plasma means fewer collisions. Answer: only fast nuclei overcome their Coulomb repulsion.\n\n**Rule to reuse:** fusion needs extreme temperature because positive nuclei repel (Coulomb); only very high kinetic energy gets them close enough for the strong force to bind them.",
    "id": "cp_q1_sa7"
   },
   {
    "q": "Complete hydrolysis of a tripeptide gives Val and Ser in a 2:1 ratio, and partial hydrolysis gives free Val and Ser plus the dipeptides Ser–Val and Val–Val. What is the tripeptide's sequence?",
    "choices": [
     "Val–Ser–Val",
     "Val–Val–Ser",
     "Ser–Val–Val",
     "Ser–Val–Ser"
    ],
    "ans": 2,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "organic_chem",
    "twin": "pe6-cp:25",
    "exp": "1. Composition first: a 2:1 ratio in a tripeptide means two Val and one Ser, which rules out Ser–Val–Ser.\n2. List each candidate with two Val and one Ser, and the dipeptides it can release: Val–Ser–Val → Val–Ser and Ser–Val; Val–Val–Ser → **Val–Val** and **Val–Ser**; Ser–Val–Val → **Ser–Val** and **Val–Val**.\n3. The observed fragments are Ser–Val and Val–Val, with no Val–Ser, which rules out Val–Ser–Val and Val–Val–Ser.\n4. Check: Ser sits at the N-terminus, followed by two Val residues.\n5. Answer: Ser–Val–Val, the only sequence that gives both observed dipeptides.\n\n**Rule to reuse:** count units from complete hydrolysis, then overlap the partial pieces like puzzle pieces; the order must explain every fragment.",
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
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4C",
     "4E",
     "4A"
    ],
    "title": "Conduction in a Demyelinated Nerve",
    "passage": "Peripheral axons are wrapped by Schwann cells, which lay down many layers of lipid-rich membrane called myelin. The myelin is interrupted about every millimeter at nodes of Ranvier, where voltage-gated Na⁺ channels cluster. In each internode, the stretch between two nodes, the axon behaves like a leaky capacitor: the cytoplasm and the extracellular fluid are the two conductors, and the axon membrane together with its myelin wrapping is the insulator between them. At rest the inside of the axon sits about −80 mV below the extracellular fluid, and at the peak of an action potential it reaches about +35 mV.\n\nTo model a demyelinating disease, researchers injected lysolecithin, a detergent-like lipid, into one segment of the rat sciatic nerve. Over several days the lipid strips myelin from the internodes while leaving the axons themselves intact and of unchanged radius. The nerve was then stimulated at one end, and the impulse was picked up by two recording electrodes placed farther along the nerve. Conduction velocity was found by dividing the distance between the recording electrodes by the delay between the signals they detected. The amplifier cannot resolve delays shorter than 0.8 ms, so the electrodes must be far enough apart to give a longer delay.\n\nTable 1 shows the mean results for untreated nerves and for treated nerves 7 days after injection, with six rats in each group.",
    "figure": {
     "caption": "Table 1 Conduction in untreated and lysolecithin-treated rat sciatic nerves",
     "columns": [
      "Nerve",
      "Conduction velocity (m/s)",
      "Signal amplitude (mV)"
     ],
     "rows": [
      [
       "Untreated",
       "45",
       "8.2"
      ],
      [
       "Treated, day 7",
       "14",
       "5.1"
      ]
     ]
    },
    "questions": [
     {
      "q": "At the peak of an action potential, the electric field within the axon membrane points:",
      "choices": [
       "inward, toward the cytoplasm.",
       "outward, toward the extracellular fluid.",
       "along the length of the axon.",
       "nowhere, since the field there is zero."
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "sample-cp:5",
      "exp": "1. Read the potential difference across the membrane at the peak: the interior is at +35 mV relative to the outside fluid.\n2. Rank the two sides and point the field from high to low: outside = 0 mV (reference); inside = +35 mV; high → low: **inside → outside**.\n3. Pointing \"inward, toward the cytoplasm\" runs from low to high potential, the reverse of the field direction.\n4. A potential difference across the membrane means a field across it, not along it and not zero, so \"along the length of the axon\" and \"nowhere, since the field there is zero\" are out.\n5. Answer: outward, toward the extracellular fluid. (At rest, with the interior at −80 mV, the same rule gives an inward field.)\n\n**Rule to reuse:** electric field always points from higher to lower potential; a positive interior means an outward-pointing field across the membrane.",
      "id": "p_cpq2_1_q1"
     },
     {
      "q": "Compared with the same internode before treatment, a demyelinated internode of equal radius has membrane capacitance and membrane resistance that are, respectively:",
      "choices": [
       "lower and higher.",
       "both lower.",
       "higher and lower.",
       "both unchanged."
      ],
      "ans": 2,
      "subj": "biology",
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "sample-cp:6",
      "exp": "1. Identify what changes: the lysolecithin strips the myelin from the internode, while the radius stays the same.\n2. Removing myelin thins the insulating layer between the inner and outer conductors: thickness ↓ → C ∝ 1/thickness → **C ↑**; insulator ↓ → ion leak ↑ → **R ↓**.\n3. \"Lower and higher\" is the effect of adding insulation, not removing it; \"both lower\" gets resistance right but sends capacitance the wrong way.\n4. The comparison is at the same radius, and losing myelin does change C and R, so \"both unchanged\" is out.\n5. Answer: higher and lower, which is why conduction slows after demyelination.\n\n**Rule to reuse:** myelin, an insulator, lowers membrane capacitance (C ∝ 1/thickness) and raises membrane resistance, which speeds conduction.",
      "id": "p_cpq2_1_q2"
     },
     {
      "q": "Of these ions, which one has the largest radius?",
      "choices": [
       "Al³⁺",
       "F⁻",
       "Ca²⁺",
       "S²⁻"
      ],
      "ans": 3,
      "subj": "gen_chem",
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "sample-cp:7",
      "exp": "1. Count electrons for each ion: Al³⁺: 13 − 3 = 10 e⁻; F⁻: 9 + 1 = 10 e⁻; Ca²⁺: 20 − 2 = 18 e⁻; S²⁻: 16 + 2 = 18 e⁻.\n2. Al³⁺ and F⁻ have only 10 electrons, one shell fewer than the 18-electron ions, so neither can be the largest.\n3. Ca²⁺ and S²⁻ both have 18 electrons, but S²⁻ has only 16 protons pulling on them versus 20: same 18 e⁻; 16 p⁺ < 20 p⁺ → **S²⁻ larger**. S²⁻ also has extra electron repulsion.\n4. Answer: S²⁻ has the largest radius.\n\n**Rule to reuse:** compare ion size by number of shells first; among isoelectronic ions, the one with more protons is smaller.",
      "id": "p_cpq2_1_q3"
     },
     {
      "q": "For untreated nerves, what is the smallest distance between the two recording electrodes that gives a delay the amplifier can resolve?",
      "choices": [
       "0.0036 m",
       "0.036 m",
       "0.36 m",
       "56 m"
      ],
      "ans": 1,
      "cat": "4A",
      "skill": "SIRS 3",
      "diff": "D",
      "twin": "sample-cp:8",
      "exp": "1. Take the shortest delay the amplifier can resolve, 0.8 ms, and the untreated conduction velocity from Table 1, 45 m/s.\n2. Convert to seconds and multiply by the speed: t = 0.8 ms = 0.8 × 10⁻³ s; d = v × t = 45 × 0.8 × 10⁻³ = **0.036 m** (3.6 cm).\n3. 56 m comes from 45 ÷ 0.8 (dividing, with no ms → s conversion). 0.0036 m and 0.36 m are the right digits off by a factor of 10.\n4. Answer: 0.036 m. Electrodes any closer give a delay under 0.8 ms, which cannot be resolved.\n\n**Rule to reuse:** d = v × t with time in seconds; convert ms → s (× 10⁻³) before multiplying.",
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
    "title": "Pressure and Radiation in Eye Care",
    "passage": "The fluid inside the eye is held at an intraocular pressure (IOP), reported as a gauge pressure: the amount by which it exceeds atmospheric pressure. Normal IOP is about 10–21 mmHg. Blood flowing to the retina and optic nerve must push against this pressure, so clinicians estimate the mean ocular perfusion pressure (OPP) from the mean arterial pressure (MAP) measured at the arm:\n\nOPP = (2/3)MAP − IOP\n\nThe factor 2/3 corrects for the height of the eye above the heart. An OPP that stays below about 50 mmHg is linked to optic nerve damage in glaucoma, so lowering IOP with eye drops or surgery is the main treatment.\n\nTumors inside the eye are often treated with a small gold plaque that holds seeds of iodine-125 and is sewn to the outside of the eyeball. ¹²⁵I decays by electron capture and emits low-energy photons that are absorbed within a few centimeters of tissue, so the tumor receives a large dose while distant tissue is spared. Because the seeds lose activity, the time the plaque stays in place is set from the activity on the day of surgery. Figure 1 shows the activity of one batch of seeds, measured at intervals after calibration.\n\nSmall tumors can instead be heated with an infrared laser aimed through the pupil. The beam is focused to a spot a few millimeters across and delivers a steady power for a few minutes, raising the temperature of the tumor by about 10 °C. The laser emits light of wavelength 810 nm. Some clinics instead use a 1064-nm laser run at the same steady power.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Activity of a batch of ¹²⁵I seeds after calibration",
     "x": {
      "label": "Time after calibration (days)",
      "min": 0,
      "max": 300,
      "step": 60
     },
     "y": {
      "label": "Activity (MBq)",
      "min": 0,
      "max": 1000,
      "step": 200
     },
     "series": [
      {
       "name": "Activity",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         960
        ],
        [
         30,
         679
        ],
        [
         60,
         480
        ],
        [
         90,
         339
        ],
        [
         120,
         240
        ],
        [
         150,
         170
        ],
        [
         180,
         120
        ],
        [
         210,
         85
        ],
        [
         240,
         60
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "According to the passage formula, which equation gives a patient’s MAP from the OPP and the IOP?",
      "choices": [
       "MAP = (2/3)(OPP + IOP)",
       "MAP = (3/2)(OPP − IOP)",
       "MAP = (3/2)(OPP + IOP)",
       "MAP = (2/3)OPP + IOP"
      ],
      "ans": 2,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe1-cp:18",
      "exp": "1. The formula is given; the unknown is MAP, so undo the operations in reverse order.\n2. Add IOP to both sides: OPP + IOP = (2/3)MAP.\n3. Multiply both sides by 3/2: **MAP = (3/2)(OPP + IOP)**. Check with OPP = 50 mmHg and IOP = 20 mmHg: MAP = 105 mmHg, and (2/3)(105) − 20 = 50 ✓.\n4. (3/2)(OPP − IOP) subtracts IOP instead of adding it back; (2/3)(OPP + IOP) multiplies by 2/3 again instead of undoing it; (2/3)OPP + IOP only moves IOP across and leaves MAP unsolved.\n5. Answer: MAP = (3/2)(OPP + IOP).\n\n**Rule to reuse:** to solve a given formula for one variable, undo the operations in reverse order (add back what was subtracted, then divide by the factor), and check with simple numbers.",
      "id": "p_cpq2_2_q1"
     },
     {
      "q": "After treatment with eye drops, a patient’s IOP falls from 34 mmHg to 15 mmHg. Using 760 mmHg = 101 kPa = 1 atm, about what percent of 1 atm is this decrease?",
      "choices": [
       "2.0%",
       "2.5%",
       "4.5%",
       "19%"
      ],
      "ans": 1,
      "subj": "gen_chem",
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe1-cp:19",
      "exp": "1. Find the decrease from the two readings: 34 − 15 = **19 mmHg**.\n2. Compare in matching units: use 760 mmHg for 1 atm (no kPa needed): 19 mmHg ÷ 760 mmHg = 0.025; 0.025 × 100% = **2.5%**.\n3. See the sizes on one scale: the change in eye pressure is a small fraction of the pressure of the atmosphere.\n4. Eliminate the slips: 4.5% = 34 ÷ 760 (the starting IOP, not the decrease); 2.0% = 15 ÷ 760 (the final IOP); 19% = 19 ÷ 101 (mmHg divided by kPa).\n5. Answer: about 2.5%.\n\n**Rule to reuse:** IOP decrease = starting IOP − final IOP. To compare two pressures, put them in the same unit first, then part ÷ whole × 100.",
      "id": "p_cpq2_2_q2"
     },
     {
      "q": "If the trend in Figure 1 continues, what percentage of the ¹²⁵I nuclei present at calibration will have decayed by day 300, and what activity will the seeds then have?",
      "choices": [
       "3% decayed; 30 MBq",
       "6% decayed; 60 MBq",
       "94% decayed; 60 MBq",
       "97% decayed; 30 MBq"
      ],
      "ans": 3,
      "cat": "4E",
      "skill": "SIRS 3",
      "diff": "X",
      "twin": "pe1-cp:20",
      "exp": "1. Read the half-life off the curve: start at 960 MBq and find when the activity reaches 480 MBq: 960 → 480 MBq at t = **60 days**; t½ = **60 days**.\n2. Check with a second halving: 480 → 240 MBq should take another 60 days: 240 MBq at 120 days ✓ (two half-lives).\n3. Count half-lives to day 300 and apply (½)ⁿ: n = 300 ÷ 60 = **5**; remaining = (½)⁵ = **1/32** ≈ 3%; decayed = 1 − 1/32 = **31/32** ≈ **97%**; activity = 960 × 1/32 = **30 MBq**.\n4. 3% is what remains, not what decayed; 4 half-lives would be only day 240, where the data stop (94% decayed, 60 MBq), and 6% is what remains then.\n5. Answer: 97% decayed; 30 MBq.\n\n**Rule to reuse:** read t½ where the curve hits half its start. n = time ÷ t½; remaining = (½)ⁿ; decayed = 1 − (½)ⁿ; activity scales with what remains.",
      "id": "p_cpq2_2_q3"
     },
     {
      "q": "Compared with the 810-nm laser, the 1064-nm laser delivers:",
      "choices": [
       "fewer photons per second, each with more energy.",
       "fewer photons per second, each with less energy.",
       "more photons per second, each with less energy.",
       "more photons per second, each with more energy."
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe1-cp:16",
      "exp": "1. Beam power = (energy per photon) × (photons per second). The two lasers are set to the same power.\n2. Energy per photon depends only on wavelength: **E = hc/λ**. The 1064-nm wavelength is longer, so each photon carries **less energy**.\n3. To keep the same power with smaller photons, the 1064-nm laser must emit **more photons per second**.\n4. \"More energy\" choices reverse E = hc/λ. \"Fewer photons per second, each with less energy\" would lower the power, which contradicts the equal setting.\n5. Answer: more photons per second, each with less energy.\n\n**Rule to reuse:** power = photon energy × photon rate. Wavelength fixes the photon energy; at fixed power, lower-energy photons mean more photons per second.",
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
    "title": "Making and Checking Fragrance Alcohols",
    "passage": "Many fragrance ingredients are small alcohols, aldehydes and ketones whose odors depend on their exact structures, so even closely related isomers can smell quite different. A student prepared one fragrance compound in two steps and analyzed a commercial sample of another. Each product was purified by column chromatography before any spectrum was recorded.\n\nIn Step 1, 3-phenyl-1-propanol was treated with pyridinium chlorochromate (PCC) in dry dichloromethane, a mild oxidant that works in the absence of water. After workup, the product was a colorless oil with a strong floral odor, and its IR spectrum is shown in Figure 1. In Step 2, the product of Step 1 was treated with ethylmagnesium bromide (CH₃CH₂MgBr) in dry ether, followed by aqueous acid, to give a new compound with a milder odor.\n\nIn a separate analysis, the student examined a commercial sample of crude dihydromyrcenol (2,6-dimethyloct-7-en-2-ol), a citrus-scented alcohol widely used in soaps and detergents because it is stable in base. It is made industrially by adding water across a C=C bond of a diene in the presence of acid. The crude material contained a second compound, 2,6-dimethyloct-6-en-2-ol, in which the C=C sits at a different position in the chain. Both compounds have one tertiary O–H group and one C=C bond, and neither has a conjugated π system. Because the two smell different, the producer must know how much of each is present.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 IR spectrum of the product of Step 1",
     "x": {
      "label": "Wavenumber (cm⁻¹)",
      "min": 500,
      "max": 4000,
      "step": 500
     },
     "y": {
      "label": "Transmittance (%)",
      "min": 0,
      "max": 100,
      "step": 20
     },
     "series": [
      {
       "name": "Product",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         500,
         84
        ],
        [
         600,
         80
        ],
        [
         700,
         30
        ],
        [
         750,
         38
        ],
        [
         850,
         80
        ],
        [
         1000,
         76
        ],
        [
         1100,
         74
        ],
        [
         1200,
         72
        ],
        [
         1300,
         70
        ],
        [
         1450,
         50
        ],
        [
         1500,
         58
        ],
        [
         1600,
         72
        ],
        [
         1660,
         88
        ],
        [
         1725,
         8
        ],
        [
         1790,
         90
        ],
        [
         2000,
         93
        ],
        [
         2400,
         93
        ],
        [
         2650,
         90
        ],
        [
         2720,
         62
        ],
        [
         2770,
         84
        ],
        [
         2820,
         58
        ],
        [
         2930,
         42
        ],
        [
         3030,
         66
        ],
        [
         3100,
         88
        ],
        [
         3300,
         92
        ],
        [
         3600,
         94
        ],
        [
         4000,
         95
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Which region of Figure 1 shows the bands that distinguish the Step 1 product from a ketone?",
      "choices": [
       "1000–1300 cm⁻¹",
       "1700–1750 cm⁻¹",
       "2700–2850 cm⁻¹",
       "3200–3600 cm⁻¹"
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 3",
      "diff": "M",
      "twin": "pe6-cp:1",
      "exp": "1. PCC oxidizes the primary alcohol 3-phenyl-1-propanol to an aldehyde, 3-phenylpropanal.\n2. Aldehydes and ketones both show a strong C=O dip near 1725 cm⁻¹ (here **8%** transmittance), so the 1700–1750 cm⁻¹ region cannot tell them apart.\n3. Only an aldehyde has an H on the carbonyl carbon. Its C–H stretch gives two weaker dips at about **2720 and 2820 cm⁻¹**, inside 2700–2850 cm⁻¹; a ketone has none.\n4. At 3300 cm⁻¹ the trace stays near the top (about 92%): there is no O–H band at all. The 1000–1300 cm⁻¹ region holds C–C and C–O bands that many compounds share, so it does not single out a CHO group.\n5. Answer: 2700–2850 cm⁻¹.\n\n**Rule to reuse:** C=O near 1700 cm⁻¹ says aldehyde or ketone; the pair of CHO C–H dips near 2720 and 2820 cm⁻¹ says aldehyde. O–H ≈ 3200–3600 cm⁻¹, broad; sp³ C–H ≈ 2850–3000 cm⁻¹.",
      "id": "p_cpq2_3_q1"
     },
     {
      "q": "Suppose the two alcohols in the commercial sample gave fully overlapping ¹H NMR peaks but boiled 15 °C apart. Which method would best determine their mole ratio?",
      "choices": [
       "IR band positions",
       "UV absorbance",
       "Proton NMR integrals",
       "GC peak areas"
      ],
      "ans": 3,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:2",
      "exp": "1. Translate: the question asks for amounts, a ratio, not for identity, and the stem takes away NMR's usual edge: the peaks overlap.\n2. With every ¹H NMR peak overlapping, each integral is the sum of both isomers, so the integrals can no longer be split between them.\n3. The two alcohols share their functional groups (one O–H, one C=C), so their IR bands overlap; neither is conjugated, so UV absorbance gives no handle either.\n4. Rule: gas chromatography separates compounds by volatility. Boiling points 15 °C apart give two separate peaks, and for two isomers each peak's area is proportional to the amount of that isomer.\n5. Divide each area by the total: for areas of 3.0 and 1.0: 3.0 ÷ 4.0 = **75%**; 1.0 ÷ 4.0 = **25%**; ratio = **3 : 1**.\n6. Answer: GC peak areas, because the isomers separate on the column and each area measures how much of that isomer is present.\n\n**Rule to reuse:** \"how much of each\" in a mixture → a method that gives each compound its own signal with area ∝ amount: ¹H NMR integrals when peaks are distinct, GC peak areas when the compounds separate by volatility.",
      "id": "p_cpq2_3_q2"
     },
     {
      "q": "Which compound is the product of Step 2 (Ph = phenyl)?",
      "choices": [
       "PhCH₂CH₂CH(OH)CH₂CH₃",
       "PhCH₂CH₂CH₂CH₂CH₂OH",
       "PhCH₂CH₂COCH₂CH₃",
       "PhCH₂CH₂COOH"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe6-cp:3",
      "exp": "1. Start from the aldehyde made in Step 1: PhCH₂CH₂–CHO + CH₃CH₂⁻ (from CH₃CH₂MgBr) → PhCH₂CH₂–CH(O⁻)–CH₂CH₃; H₃O⁺ → **PhCH₂CH₂–CH(OH)–CH₂CH₃**.\n2. Name it: five-carbon chain, OH on C3, phenyl on C1; the OH carbon has two carbon neighbors → secondary: **1-phenyl-3-pentanol**. PhCH₂CH₂CH₂CH₂CH₂OH, a primary alcohol, would need the ethyl group to add at the end of the chain instead of at the carbonyl carbon.\n3. A Grignard reagent is a nucleophile, not an oxidant, so it cannot give the ketone PhCH₂CH₂COCH₂CH₃ or the acid PhCH₂CH₂COOH.\n4. Answer: PhCH₂CH₂CH(OH)CH₂CH₃, a secondary alcohol.\n\n**Rule to reuse:** a Grignard adds its carbon to the carbonyl carbon; formaldehyde → 1°, other aldehydes → 2°, ketones → 3° alcohols, with no oxidation.",
      "id": "p_cpq2_3_q3"
     },
     {
      "q": "Which carbon of the main chain in dihydromyrcenol, 2,6-dimethyloct-7-en-2-ol, is a chirality center?",
      "choices": [
       "C2",
       "C3",
       "C6",
       "C7"
      ],
      "ans": 2,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe6-cp:4",
      "exp": "1. You need a carbon with four different groups. Write the chain from the name: CH₃(C1)–C(OH)(CH₃)(C2)–CH₂(C3)–CH₂(C4)–CH₂(C5)–CH(CH₃)(C6)–CH(C7)=CH₂(C8).\n2. C3 is a CH₂, with two identical H atoms. C7 is an sp² alkene carbon with only three neighbors.\n3. C2: list its groups: OH, **CH₃** (C1), **CH₃** (the 2-methyl group), CH₂–chain; two identical groups → not a chirality center.\n4. C6: list its groups: H, CH₃, CH=CH₂, CH₂–chain; **four different** → chirality center.\n5. Answer: C6. Rule: skip CH₂, CH₃ and sp² carbons, then check the rest for two matching branches.\n\n**Rule to reuse:** **Chirality center (stereocenter):** a carbon with four different groups attached; it makes the molecule non-superimposable on its mirror image.",
      "id": "p_cpq2_3_q4"
     }
    ]
   },
   {
    "id": "p_cpq2_4",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "4E"
    ],
    "title": "Metal Ions in a DNA-Cutting Enzyme",
    "passage": "Restriction endonucleases cut double-stranded DNA at short recognition sequences. Most require a divalent metal cation, usually Mg²⁺, which binds to the carboxylate side chains of acidic residues in the active site and positions a water molecule to attack a backbone phosphate. Recognition depends on hydrogen bonds between the enzyme and the edges of the bases in the major groove, so the bases must be in their normal tautomeric forms for the enzyme to find its site.\n\nResearchers studied a restriction enzyme from a soil bacterium. In its active site, the side-chain carboxylate of Asp45 binds Mg²⁺, and replacing Asp45 with alanine abolishes cleavage. To test other replacements, the team planned four mutants; the side chains they would place at position 45 are listed in Table 1. They also tested whether other metal ions could replace Mg²⁺.\n\nActivity was measured at 37 °C with a synthetic 60-base-pair DNA duplex containing one recognition site. One strand was made with phosphorothioate linkages, in which a sulfur atom replaces one nonbridging oxygen of a phosphate; the enzyme cuts such DNA at nearly its normal rate, and the sulfur was the radioactive isotope sulfur-35, a β⁻ emitter. After the reaction, the DNA was separated on a gel, and the cut and uncut strands were detected by their radioactivity.",
    "figure": {
     "caption": "Table 1 Side chains at position 45 (pH 7)",
     "columns": [
      "Residue",
      "Side chain"
     ],
     "rows": [
      [
       "Asp (wild type)",
       "–CH₂–COO⁻"
      ],
      [
       "Glu",
       "–CH₂–CH₂–COO⁻"
      ],
      [
       "Asn",
       "–CH₂–CONH₂"
      ],
      [
       "Lys",
       "–(CH₂)₄–NH₃⁺"
      ],
      [
       "Leu",
       "–CH₂–CH(CH₃)₂"
      ]
     ]
    },
    "questions": [
     {
      "q": "Which thymine tautomer is the main form in DNA at pH 7.4, the one that pairs correctly with adenine?",
      "choices": [
       "O4-enol form",
       "O2-enol form",
       "Diketo (lactam) form",
       "O2,O4-dienol form"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe4-cp:48",
      "exp": "1. You want the common form in DNA, the one that pairs with A.\n2. Spot the keto form: both oxygens as C=O and the ring nitrogens as N–H (in DNA, N1 bears the sugar, so N3–H is the one that shows). Only the diketo (lactam) form has that.\n3. Check the face that meets adenine: thymine keto face: N3–H = **D**, C4=O = **A**; adenine face: N1 = **A**, N6–H = **D**; D↔A and A↔D: **match**.\n4. An enol at O4 turns that face into O–H donor and N3 acceptor, the guanine-pairing pattern; the O2-enol and the dienol are rare forms that do not predominate.\n5. Answer: the diketo (lactam) form. Rule: nucleobases in DNA and RNA are drawn as keto/amino tautomers; enol or imino forms mean mispairing.\n\n**Rule to reuse:** normal DNA/RNA bases are **keto** (C=O + ring N–H). For each tautomer ask: are both O's C=O, and do both ring N's carry an H?",
      "id": "p_cpq2_4_q1"
     },
     {
      "q": "When a ³⁵S nucleus in the labeled strand undergoes β⁻ decay, what nucleus forms, and how many neutrons does it have?",
      "choices": [
       "³⁴S, 18 neutrons",
       "³⁵Cl, 18 neutrons",
       "³⁵Cl, 20 neutrons",
       "³⁵P, 20 neutrons"
      ],
      "ans": 1,
      "subj": "physics",
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:49",
      "exp": "1. Translate: β⁻ emission means a neutron in the nucleus turns into a proton and an electron: n → p + e⁻ + ν̄.\n2. Balance the nuclear equation: ³⁵₁₆S → ᴬ_ZX + ⁰₋₁e + ν̄; A: 35 = A + 0 → A = **35**; Z: 16 = Z − 1 → Z = **17** = chlorine. That rules out ³⁵P (Z down by 1, as in β⁺ decay) and ³⁴S (same element, one nucleon lost).\n3. Count neutrons before and after: ³⁵S: N = 35 − 16 = **19**; ³⁵Cl: N = 35 − 17 = **18** → **one fewer** neutron, so \"³⁵Cl, 20 neutrons\" is out.\n4. Compare the nucleon counts side by side: 16 p + 19 n → 17 p + 18 n; the total stays 35.\n5. Answer: ³⁵Cl, 18 neutrons.\n\n**Rule to reuse:** β⁻: Z + 1, A same (one neutron → proton). β⁺: Z − 1, A same. α: Z − 2, A − 4. Neutrons = A − Z.",
      "id": "p_cpq2_4_q2"
     },
     {
      "q": "Based on Table 1, which replacement for Asp45 is most likely to preserve Mg²⁺ binding and cleavage?",
      "choices": [
       "Glutamate",
       "Asparagine",
       "Lysine",
       "Leucine"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe4-cp:50",
      "exp": "1. The job of the Asp45 side chain is to coordinate a 2+ metal through its carboxylate.\n2. Read the end group of each side chain in Table 1: glutamate: –CH₂–CH₂–COO⁻ → **charge −1**; asparagine: –CH₂–CONH₂ → **charge 0**; lysine: –(CH₂)₄–NH₃⁺ → **charge +1**; leucine: –CH₂–CH(CH₃)₂ → **no O or N**.\n3. A positive side chain repels Mg²⁺, and a C/H-only side chain has nothing to bind it, so lysine and leucine are out.\n4. Asparagine matches the size of aspartate but not the charge: its amide is neutral.\n5. Glutamate keeps the carboxylate, only one CH₂ longer. Answer: glutamate. Rule: preserve the functional group that does the job; length is secondary.\n\n**Rule to reuse:** keep the side chain's working group; length is secondary. In each Table 1 side chain, read the end and ask: will it be negative at pH 7?",
      "id": "p_cpq2_4_q3"
     },
     {
      "q": "In the 60-bp substrate duplex, cytosine makes up 30% of all the bases. If every base is Watson–Crick paired, how many hydrogen bonds join the bases of the two strands?",
      "choices": [
       "138",
       "144",
       "156",
       "180"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe4-cp:51",
      "exp": "1. Translate: the percentage is of bases, not base pairs. A 60-bp duplex has 120 bases.\n2. Use Chargaff's rule C = G to count G–C pairs: bases = 2 × 60 = **120**; C = 30% × 120 = **36**; each C pairs with one G → **36 G–C pairs**; A–T pairs = 60 − 36 = **24**. Taking 30% of the 60 pairs instead gives 18 G–C and 42 A–T pairs: 18 × 3 + 42 × 2 = 138, so 138 is out.\n3. Count hydrogen bonds per pair: G–C has 3, A–T has 2: G–C: 36 × **3** = 108; A–T: 24 × **2** = 48; total = **156**.\n4. Swapping the counts gives 144, and giving every pair 3 bonds gives 180: swapped: 24 × 3 + 36 × 2 = 144; all G–C: 60 × 3 = 180.\n5. Answer: 156 hydrogen bonds.\n\n**Rule to reuse:** n base pairs = 2n bases; %G = %C; G–C pairs = #G; H-bonds = 3 × (G–C pairs) + 2 × (A–T pairs).",
      "id": "p_cpq2_4_q4"
     },
     {
      "q": "Valence configurations: Mn, [Ar]3d⁵4s²; Co, [Ar]3d⁷4s²; Ca, [Ar]4s²; K, [Ar]4s¹. Which of these metals cannot readily form a 2+ ion, and why?",
      "choices": [
       "Ca, because it has no d electrons",
       "Co, because it also forms Co³⁺",
       "Mn, because its d subshell is half-filled",
       "K, because it forms only K⁺"
      ],
      "ans": 3,
      "subj": "gen_chem",
      "cat": "4E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe4-cp:52",
      "exp": "1. Translate: the enzyme needs a 2+ cation. Find which metal cannot lose two electrons easily.\n2. Read the valence configurations: Mn, Co and Ca each have two outer 4s electrons to lose. Having no d electrons, a half-filled d subshell or a 3+ option does not prevent a 2+ ion.\n3. K has one valence electron; the second would come from the [Ar] core. The second ionization energies show the cost.\n4. Quantify the jump: K: IE₂ ÷ IE₁ = 3052 ÷ 419 ≈ **7.3**; Ca: IE₂ ÷ IE₁ = 1145 ÷ 590 ≈ **1.9** (kJ/mol).\n5. Answer: K, because it forms only K⁺.\n\n**Rule to reuse:** count the outer s electrons: ns² → 2+ ion easily; ns¹ (group 1) → 1+ only, because the next electron is in the core.",
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
    "title": "Probing the Active Site of a Xylanase",
    "passage": "Xylanases break down xylan, a major polysaccharide of plant cell walls, and are used in paper bleaching and animal feed. In one common family, two side chains in a cleft on the enzyme surface carry out catalysis: one donates a proton to the departing sugar, and the other, which must be deprotonated, attacks the sugar carbon at the cut site.\n\nTo identify the group that must be deprotonated, researchers measured the initial rate of xylan hydrolysis at 30 °C in buffers from pH 2 to pH 7 (Figure 1). Over this range, the change in activity reflects the ionization of that one group, and replacing it with alanine abolished activity at every pH. The team also treated the enzyme with a water-soluble carbodiimide and a fluorescent amine, which together label exposed carboxylate side chains, and used mass spectrometry to find which Asp and Glu residues were labeled and to what extent.\n\nThe enzyme purified from E. coli is a mixture of two forms of nearly the same mass: the native protein and a form in which two lysine side chains carry acetyl groups. Before mass spectrometry, every sample was exchanged into a volatile buffer made by neutralizing formic acid, HCOOH, with triethylamine, (C₂H₅)₃N. This buffer evaporates in the ion source and leaves no salt deposits.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Activity of the xylanase versus pH",
     "x": {
      "label": "pH",
      "min": 2,
      "max": 7,
      "step": 1
     },
     "y": {
      "label": "Relative activity (%)",
      "min": 0,
      "max": 100,
      "step": 20
     },
     "series": [
      {
       "name": "Activity",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         2,
         1
        ],
        [
         2.5,
         2
        ],
        [
         3,
         6
        ],
        [
         3.2,
         9
        ],
        [
         3.5,
         17
        ],
        [
         4,
         39
        ],
        [
         4.2,
         50
        ],
        [
         4.5,
         67
        ],
        [
         5,
         86
        ],
        [
         5.2,
         91
        ],
        [
         5.5,
         95
        ],
        [
         6,
         98
        ],
        [
         7,
         100
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Percent labeling at pH 4.5 was E86 25%, E172 0%, D37 30%; at pH 6.0 it was E86 0%, E172 0%, D37 55%. Which residue can be labeled selectively, and at which pH?",
      "choices": [
       "D37, at pH 4.5",
       "E86, at pH 4.5",
       "E172, at either pH",
       "D37, at pH 6.0"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:30",
      "exp": "1. pH 4.5: two residues are labeled: E86 25%, D37 30% → **two** labeled → not selective, so \"D37, at pH 4.5\" and \"E86, at pH 4.5\" are out.\n2. pH 6.0: only one residue is labeled: E86 0%, E172 0%, D37 **55%** → selective for D37.\n3. E172 is 0% at both pH values: it is never labeled, so \"E172, at either pH\" is out.\n4. Answer: D37, at pH 6.0.\n\n**Rule to reuse:** for \"selective\" questions, scan for a condition where the target is above 0% and every other site is exactly 0%; the highest percentage alone does not make it selective.",
      "id": "p_cpq2_5_q1"
     },
     {
      "q": "Based on Figure 1, which residue is most likely the catalytic group that must be deprotonated?",
      "choices": [
       "Glutamate",
       "Histidine",
       "Cysteine",
       "Lysine"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe5-cp:32",
      "exp": "1. Activity rises as the residue loses its proton, so the curve is a titration curve of that one group.\n2. Find half of the maximum on the y-axis, go across to the curve, then down to the pH axis: maximum activity ≈ **100%** → half = **50%**; curve crosses 50% at pH **4.2** → pKa ≈ **4.2**.\n3. Check: one pH unit on either side should give about 9% and 91% for a single group with pKa 4.2: pH 3.2: 1 / (1 + 10¹) ≈ **9%**; pH 5.2: 1 / (1 + 10⁻¹) ≈ **91%** ✓.\n4. A pKa near 6 (histidine) would center the curve at pH 6; a pKa near 8.3 (cysteine) or 10.5 (lysine) would keep the enzyme nearly inactive across the whole range.\n5. Answer: glutamate, whose side-chain carboxyl group (pKa ≈ 4.1) matches. Rule: the pH at half-maximal activity reads out the pKa of the catalytic group.\n\n**Rule to reuse:** for a pH–activity curve, the pH at half-maximal activity is the pKa of the catalytic group. pKa ≈ 6 → histidine; ≈ 4 → Asp/Glu; ≈ 10 → Tyr/Lys.",
      "id": "p_cpq2_5_q2"
     },
     {
      "q": "E172 is never labeled at 25 °C. After the enzyme is heated to 80 °C in buffer with no protease, E172 is labeled, and the heated, unlabeled enzyme keeps its original mass. What best explains this?",
      "choices": [
       "Heating cleaved the backbone",
       "A protease nicked the chain",
       "Heating unfolded the chain, exposing E172",
       "The reagent penetrated the intact fold"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe5-cp:33",
      "exp": "1. No labeling at 25 °C means the carboxylate is hidden from the reagent, not missing.\n2. Backbone hydrolysis adds water and breaks the chain, which would change the mass: each hydrolyzed peptide bond: + H₂O = **+18 Da**; observed Δmass = **0**, so \"Heating cleaved the backbone\" is out.\n3. Nicking requires a protease to catalyze the hydrolysis, and none was present (it would also add 18 Da per cut), so \"A protease nicked the chain\" is out.\n4. Heat breaks noncovalent interactions, so the chain unfolds and the buried carboxylate becomes exposed; covalent structure is untouched. A folded core has no pores for the reagent to pass through. Answer: heating unfolded the chain, exposing E172.\n\n**Rule to reuse:** heat denatures by breaking noncovalent bonds; covalent structure and mass stay the same. Buried groups become reachable once the protein unfolds.",
      "id": "p_cpq2_5_q3"
     },
     {
      "q": "Using molar masses N 14, O 16, C 12, H 1 g/mol, which salt is in the volatile buffer described in the passage, and what is its molar mass?",
      "choices": [
       "(C₂H₅)₂NH₂HCO₂, 119 g/mol",
       "(C₂H₅)₃NHHCO₂, 147 g/mol",
       "(C₂H₅)₃NHCH₃CO₂, 161 g/mol",
       "(C₂H₅)₃NHHCO₃, 163 g/mol"
      ],
      "ans": 1,
      "subj": "gen_chem",
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe5-cp:34",
      "exp": "1. Neutralization transfers H⁺ from the acid to the amine: HCOOH + (C₂H₅)₃N → **(C₂H₅)₃NH⁺** + **HCO₂⁻**.\n2. The salt is cation + anion: (C₂H₅)₃NHHCO₂, triethylammonium formate.\n3. Add up the molar mass: N: 1 × 14 = 14; H: 17 × 1 = **17**; C: 7 × 12 = **84**; O: 2 × 16 = 32; total = **147 g/mol**.\n4. (C₂H₅)₃NHCH₃CO₂ is triethylammonium acetate, from a two-carbon acid; (C₂H₅)₃NHHCO₃ is triethylammonium bicarbonate; (C₂H₅)₂NH₂HCO₂ is diethylammonium formate, from a different amine. Answer: (C₂H₅)₃NHHCO₂, 147 g/mol.\n\n**Rule to reuse:** acid + base → the acid loses H⁺ (its anion) and the base gains H⁺ (its cation); the salt is the two ions together. Then add atom masses carefully.",
      "id": "p_cpq2_5_q4"
     },
     {
      "q": "At pH 5.0, the net charge is +5 on the native enzyme and +3 on the acetylated form. Which column type resolves the two forms, and which form comes off last as the salt gradient rises?",
      "choices": [
       "Anion exchanger; native form",
       "Cation exchanger; native form",
       "Cation exchanger; acetylated form",
       "Gel filtration; acetylated form"
      ],
      "ans": 1,
      "cat": "5C",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe5-cp:35",
      "exp": "1. Both forms are positive at pH 5.0, so they stick to a negatively charged cation-exchange resin. An anion exchanger would bind neither, so \"Anion exchanger; native form\" is out.\n2. Gel filtration separates by size, and two acetyl groups (2 × 42 = 84 Da) change the mass by far less than 1%, so \"Gel filtration; acetylated form\" is out.\n3. The more charge, the tighter the binding: binding strength ∝ |net charge|; |+5| > |+3|; native form binds **tighter** → needs **more salt**.\n4. Salt cations compete for the resin's − sites: the +3 form comes off first, the +5 form later, so \"Cation exchanger; acetylated form\" is out. Answer: cation exchanger; native form.\n\n**Rule to reuse:** negative protein → anion exchange (+ beads); positive → cation exchange. The more charge, the tighter it binds and the later it elutes as salt rises.",
      "id": "p_cpq2_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "Assuming complete dissociation, what is the concentration of Fe³⁺ ions in a 0.080 M aqueous solution of iron(III) sulfate, Fe₂(SO₄)₃?",
    "choices": [
     "0.080 M",
     "0.16 M",
     "0.24 M",
     "0.40 M"
    ],
    "ans": 1,
    "subj": "gen_chem",
    "cat": "5A",
    "skill": "SIRS 2",
    "diff": "M",
    "twin": "sample-cp:15",
    "exp": "1. Read the salt concentration: 0.080 M Fe₂(SO₄)₃.\n2. Dissociate and multiply by the iron subscript: Fe₂(SO₄)₃ → 2 Fe³⁺ + 3 SO₄²⁻; [Fe³⁺] = 2 × 0.080 M = **0.16 M**.\n3. 0.24 M is the SO₄²⁻ concentration (3 × 0.080); 0.40 M is all ions together (5 × 0.080); 0.080 M ignores the subscript.\n4. Answer: 0.16 M.\n\n**Rule to reuse:** ion concentration = (number of that ion per formula unit) × salt concentration, assuming complete dissociation.",
    "id": "cp_q2_sa1"
   },
   {
    "q": "Hydrogen fluoride (HF, 20 g/mol) boils at 19.5 °C, but hydrogen chloride (HCl, 36.5 g/mol), a heavier molecule with a similar structure, boils at −85 °C. Which factor best accounts for this difference?",
    "choices": [
     "HCl has the lower molar mass",
     "London dispersion forces are stronger in HF",
     "HF forms hydrogen bonds, but HCl does not",
     "The H–F bond is less polar than H–Cl"
    ],
    "ans": 2,
    "subj": "gen_chem",
    "cat": "5B",
    "skill": "SIRS 1",
    "diff": "E",
    "twin": "sample-cp:28",
    "exp": "1. Note the puzzle: the heavier molecule boils lower.\n2. Compare the atoms bonded to H and the masses: F: small, very electronegative → **H-bonds**; Cl: larger, less electronegative → no significant H-bonds; mass: HCl 36.5 > HF 20 g/mol.\n3. HCl is heavier, not lighter, so dispersion favors HCl, not HF. And the H–F bond is more polar, not less.\n4. Answer: HF forms hydrogen bonds, but HCl does not.\n\n**Rule to reuse:** when a lighter molecule boils far higher than a heavier analog, look for hydrogen bonding (H on N, O or F).",
    "id": "cp_q2_sa2"
   },
   {
    "q": "In a closed flask, ammonia gas and hydrogen chloride gas meet and at once form a white smoke of solid ammonium chloride: NH₃(g) + HCl(g) → NH₄Cl(s); ΔH° ≈ −176 kJ. Under standard conditions, the signs of ΔG° and ΔS° for this reaction are most likely:",
    "choices": [
     "ΔG° negative, ΔS° positive.",
     "ΔG° negative, ΔS° negative.",
     "ΔG° positive, ΔS° positive.",
     "ΔG° positive, ΔS° negative."
    ],
    "ans": 1,
    "subj": "gen_chem",
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "M",
    "twin": "pe1-cp:47",
    "exp": "1. The gases react on their own, at once, to form the solid → spontaneous → **ΔG° < 0**. Both \"ΔG° positive\" choices are out.\n2. Count gas moles on each side: two gases combine into one solid, so disorder falls: gas moles: reactants **2** → products **0**; Δn(gas) = −2 → **ΔS° < 0**, so \"ΔG° negative, ΔS° positive.\" is out.\n3. Check consistency with ΔG° = ΔH° − TΔS°: ΔH° < 0 (−176 kJ); −TΔS° > 0 (since ΔS° < 0); ΔG° stays negative only while |ΔH°| > T|ΔS°|, which holds at room temperature ✓: the reaction is enthalpy-driven.\n4. Answer: ΔG° negative, ΔS° negative.\n\n**Rule to reuse:** happens on its own → ΔG < 0. Gases turning into a solid or liquid (fewer gas moles) → ΔS < 0, so a large negative ΔH must be what makes ΔG negative. Confirm with ΔG = ΔH − TΔS.",
    "id": "cp_q2_sa3"
   },
   {
    "q": "The titration curve shown is for acetic acid with NaOH. An acetic acid–sodium acetate buffer reads pH 5.1. To shift it to the pH of greatest buffer capacity, what should be added, and why?",
    "choices": [
     "NaOH, since base:acid must fall from 2.0 to 1",
     "CH₃COONa, since base:acid must fall from 2.0 to 1",
     "CH₃COOH, since base:acid must rise from 0.50 to 1",
     "CH₃COOH, since base:acid must fall from 2.0 to 1"
    ],
    "ans": 3,
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
    "exp": "1. Find the point of greatest capacity: the flattest part of the curve, at half-equivalence. Its pH is the pKa: half-equivalence: [CH₃COO⁻] = [CH₃COOH]; pH = pKa = **4.8**.\n2. Locate the buffer as it is now, at pH 5.1, and get its ratio: 5.1 = 4.8 + log(base/acid); log(base/acid) = **+0.3**; base/acid = 10⁰·³ = **2.0**.\n3. The ratio is 2.0, not 0.50, and it must fall to 1, not rise, so \"CH₃COOH, since base:acid must rise from 0.50 to 1\" is out.\n4. Lowering the ratio needs more acid form. Adding CH₃COONa, the base form, or NaOH raises the ratio instead, so both are out.\n5. Answer: add CH₃COOH, moving the buffer left along the curve to the flat center at pH 4.8. Rule: below the pKa, add the base form; above it, add the acid form.\n\n**Rule to reuse:** best buffer = pH = pKa (ratio 1). Below pKa, add the base form; above pKa, add the acid form. base/acid = 10^(pH − pKa).",
    "id": "cp_q2_sa4"
   },
   {
    "q": "Water has a specific heat of 4.2 J/(g·°C). An electric kettle rated at 1.4 kW heats 0.60 kg of water from 15 °C to 85 °C. If all the electrical energy goes into the water, about how long does this take?",
    "choices": [
     "0.13 s",
     "0.45 min",
     "2.1 min",
     "2.6 min"
    ],
    "ans": 2,
    "subj": "gen_chem",
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "twin": "pe4-cp:59",
    "exp": "1. Translate: heat needed q = mcΔT, then time = q ÷ power.\n2. Match units: c is per gram, so convert kg to g; use the temperature change: m = 0.60 kg = **600 g**; ΔT = 85 − 15 = **70 °C**. Leaving the mass in kilograms gives 0.60 × 4.2 × 70 = 176 J and 176 ÷ 1400 = 0.13 s, so 0.13 s is out.\n3. Compute the heat absorbed: q = m c ΔT; q = 600 × 4.2 × 70; q = **1.764 × 10⁵ J**. Using the final temperature instead of the change gives 600 × 4.2 × 85 = 214,200 J and 153 s ≈ 2.6 min, so 2.6 min is out.\n4. Divide by power: 1.4 kW = 1400 J each second: t = q ÷ P = 1.764 × 10⁵ J ÷ 1.4 × 10³ J/s; t = **126 s** = **2.1 min**.\n5. 0.45 min uses the start temperature (15 °C) as ΔT: 600 × 4.2 × 15 = 37,800 J and 37,800 ÷ 1400 = 27 s = 0.45 min.\n6. Answer: about 2.1 min.\n\n**Rule to reuse:** q = mcΔT (units of m must match c; ΔT = final − initial), then time = q ÷ power, with 1 W = 1 J/s.",
    "id": "cp_q2_sa5"
   },
   {
    "q": "Heat was supplied at a steady rate to 10.0 g of solid ethanol at its melting point, −114 °C, giving the heating curve shown. Which step absorbs the most heat?",
    "choices": [
     "Melting the solid, 1100 J",
     "Heating the liquid, 4700 J",
     "Boiling the liquid, 8400 J",
     "Heating the vapor, 14,000 J"
    ],
    "ans": 2,
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
    "exp": "1. Heat is on the x-axis, so the heat for a step is the width of its segment.\n2. Read where each of the first two segments starts and ends: melting plateau: 1080 − 0 = **1080 J**; liquid warming: 5760 − 1080 = **4680 J**.\n3. The 78 °C plateau is by far the widest: boiling plateau: 14,170 − 5760 = **8410 J**; check: 10.0 g × 841 J/g (ethanol’s heat of vaporization) = **8410 J**.\n4. Melting and warming the liquid are shorter. The vapor segment is tiny; 14,000 J is where it starts, not how wide it is: vapor warming: 14,450 − 14,170 = **280 J**.\n5. Answer: boiling the liquid, about 8400 J. Rule: on a heating curve, heat for a step = segment width; the boiling plateau is the widest.\n\n**Rule to reuse:** on a heating curve, heat for a step = the width of its segment on the x axis. Flat = phase change (q = m·ΔH); sloped = warming (q = m·c·ΔT). Vaporizing usually wins.",
    "id": "cp_q2_sa6"
   },
   {
    "q": "In a flask at 60 °C, H₂SO₄ catalyzes the transesterification CH₃CH₂COOCH₃ + C₄H₉OH ⇌ CH₃CH₂COOC₄H₉ + CH₃OH, for which K = 1.0. Which change would leave the equilibrium amount of butyl propanoate unchanged?",
    "choices": [
     "Adding more 1-butanol",
     "Adding more methyl propanoate",
     "Distilling off methanol",
     "Adding more H₂SO₄"
    ],
    "ans": 3,
    "subj": "organic_chem",
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "X",
    "twin": "pe5-cp:58",
    "exp": "1. Set up the equilibrium yield, assuming 1.0 M methyl propanoate and 1.0 M butanol: K = [butyl propanoate][CH₃OH] / ([methyl propanoate][butanol]) = 1.0; x² / (1 − x)² = 1.0 → x / (1 − x) = 1; x = **0.50 M** butyl propanoate.\n2. Add a reactant: the equilibrium shifts toward product: 2.0 M butanol: x² / ((1 − x)(2 − x)) = 1.0; x² = 2 − 3x + x² → x = **0.67 M** ↑. Adding more 1-butanol or more methyl propanoate therefore increases the product.\n3. Methanol is a product, so distilling it off also pulls the reaction toward butyl propanoate.\n4. A catalyst lowers Ea equally for both directions, so equilibrium arrives sooner but at the same position. Answer: adding more H₂SO₄.\n\n**Rule to reuse:** catalysts and enzymes change only the speed, never K or the equilibrium amounts. Adding reactant or removing product shifts toward product.",
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
    "exp": "1. Boiling is a **phase change**: the added heat supplies the latent heat of vaporization, pulling molecules apart into vapor rather than raising their kinetic energy.\n2. So while liquid and vapor coexist at 1 atm, the temperature stays at the boiling point, 100 °C; a hotter burner only makes the water boil away faster.\n3. The temperature could rise above 100 °C only after all the liquid is gone, and it does not fall, or rise and then fall, while heat keeps flowing in.\n4. Answer: holds at 100 °C.\n\n**Rule to reuse:** during a phase change, added heat supplies the latent heat rather than raising kinetic energy, so the temperature stays constant until the change is complete.",
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
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5A",
     "5E",
     "5D"
    ],
    "title": "Acetyl-CoA Synthetase and a Bisphosphate Inhibitor",
    "passage": "Acetyl-CoA synthetase (ACS) allows many bacteria to grow on acetate. The enzyme works in two half-reactions. First, acetate attacks ATP, forming acetyl-AMP and releasing pyrophosphate; then the acetyl group is transferred from acetyl-AMP to coenzyme A (CoA), releasing AMP. The product, acetyl-CoA, is a high-energy thioester that feeds both the citric acid cycle and fatty acid synthesis. In a crystal structure of ACS from a soil bacterium, five side chains lie within 4 Å of the triphosphate of bound ATP: Arg217, Thr221, Lys228, Asp230 and Gln262.\n\nTo measure ACS activity, researchers used a coupled assay. Adenylate kinase converted the AMP made by ACS to ADP, pyruvate kinase used that ADP to convert phosphoenolpyruvate to pyruvate, and lactate dehydrogenase then converted the pyruvate to lactate with NADH as the cofactor. Of the assay components, only NADH absorbs light at 340 nm, so each reaction was followed by recording the absorbance at 340 nm (A₃₄₀) every 15 s. All three coupling enzymes were present in large excess, so the rate at which A₃₄₀ changed reported the rate of the ACS reaction.\n\nThe team also tested Inhibitor B, a designed analog of acetyl-AMP that carries two carboxylic acid groups and two phosphate monoester groups. In assays run at pH 7.0 and 30°C without inhibitor, A₃₄₀ fell at a steady rate for the first 6 min. With 20 µM Inhibitor B present, the rate of change of A₃₄₀ was 85% lower.",
    "questions": [
     {
      "q": "What is the approximate net charge of Inhibitor B under the conditions of the assays?",
      "choices": [
       "−4",
       "−5",
       "−6",
       "−7"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "M",
      "subj": "gen_chem",
      "twin": "sample-cp:47",
      "exp": "1. Two kinds of acidic group are named: two carboxylic acids and two phosphate monoesters.\n2. Charge each group at pH 7.0, then add: each –COOH → –COO⁻: −1, so 2 × (−1) = −2; each –OPO₃H₂ → –OPO₃²⁻: −2, so 2 × (−2) = −4; net = −2 + (−4) = **−6**.\n3. −4 counts only the two phosphates (or gives each phosphate only one charge: −1 −1 −1 −1); −5 lets one phosphate lose only one proton; −7 gives one phosphate monoester a third negative charge, but it has only two acidic protons.\n4. Answer: about −6.\n\n**Rule to reuse:** at pH 7 count −1 for each carboxylate and −2 for each phosphate monoester, then sum.",
      "id": "p_cpq3_1_q1"
     },
     {
      "q": "In the acetyl-CoA formed by ACS, the acetyl carbonyl carbon is bonded to which part of CoA?",
      "choices": [
       "An adenine nitrogen",
       "A phosphate oxygen",
       "A ribose oxygen",
       "The cysteamine sulfur"
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "sample-cp:48",
      "exp": "1. Acetyl-CoA is a thioester, so sulfur must be involved.\n2. Find the atom that bonds to the acetyl carbon: thioester = CH₃–C(=O)–**S**–CoA; the only sulfur-containing part of CoA is the terminal –SH of its cysteamine (β-mercaptoethylamine) unit; CH₃–C(=O)– + HS–CoA → CH₃–C(=O)–S–CoA.\n3. An adenine nitrogen would give an amide, and a phosphate oxygen or a ribose oxygen would give an ordinary (oxygen) ester; none of them contains sulfur.\n4. Answer: the cysteamine sulfur.\n\n**Rule to reuse:** thioesters form through a thiol (–SH); in CoA that is the terminal β-mercaptoethylamine –SH.",
      "id": "p_cpq3_1_q2"
     },
     {
      "q": "Which pair of residues near the ATP triphosphate could hold it most strongly by ionic attraction?",
      "choices": [
       "Thr221 and Gln262",
       "Arg217 and Lys228",
       "Asp230 and Arg217",
       "Thr221 and Asp230"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "sample-cp:50",
      "exp": "1. The question asks for ionic interactions with a triphosphate, which carries several negative charges.\n2. Charge each listed residue at pH 7.0: Arg217: + ✓; Thr221: 0 (–OH); Lys228: + ✓; Asp230: − (repels); Gln262: 0 (amide).\n3. Thr and Gln can only hydrogen-bond, and Asp would repel the phosphates, so any pair containing Thr221, Gln262 or Asp230 fails.\n4. Answer: Arg217 and Lys228.\n\n**Rule to reuse:** phosphates are held by salt bridges to Lys and Arg; Thr and Gln only hydrogen-bond, and Asp/Glu repel.",
      "id": "p_cpq3_1_q3"
     },
     {
      "q": "In the assays without inhibitor, what process does the steady fall in A₃₄₀ report?",
      "choices": [
       "Reduction of NAD⁺",
       "Oxidation of NADH",
       "Conversion of NADH to NADPH",
       "Binding of NADH to ACS"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "sample-cp:51",
      "exp": "1. Among the assay components, A₃₄₀ tracks NADH only.\n2. Reason from the signal: A₃₄₀ ↓ → [NADH] ↓; lactate dehydrogenase passes a hydride from NADH to pyruvate: NADH → NAD⁺; NADH loses electrons, so it is **oxidized**.\n3. Reducing NAD⁺ would make NADH and raise A₃₄₀. NADPH also absorbs at 340 nm, so converting NADH to it would not lower the signal, and nothing in the assay indicates NADH binding to ACS.\n4. Answer: oxidation of NADH.\n\n**Rule to reuse:** a falling A₃₄₀ means NADH is being oxidized to NAD⁺; a rising A₃₄₀ means NAD⁺ is being reduced to NADH.",
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
    "title": "Catalysts for Neutralizing Lens Disinfectant",
    "passage": "Contact lenses can be disinfected by soaking them for several hours in 3% aqueous hydrogen peroxide, but the peroxide must be destroyed before the lens is placed on the eye: 2H₂O₂(aq) → 2H₂O(l) + O₂(g). On its own this reaction is slow, so lens cases contain a catalyst. Most cases hold a small disc coated with solid platinum. Bubbles of O₂ escape as the peroxide is consumed, leaving a saline solution in which the lens is stored and from which it is later placed directly on the eye.\n\nChemists compared the platinum disc with two other catalysts. The first was potassium iodide, which dissolves completely in the saline and is thought to act in two steps:\n\nStep 1: H₂O₂ + I⁻ → H₂O + IO⁻\nStep 2: H₂O₂ + IO⁻ → H₂O + O₂ + I⁻\n\nFigure 1 shows the concentrations of I⁻ and IO⁻, and the amount of O₂ released per liter, during a model run started with 6.0 mM H₂O₂ and 1.5 mM KI.\n\nThe second catalyst was manganese dioxide, MnO₂, an insoluble black solid. In one trial, a single MnO₂ cube, 0.80 cm on each side, was dropped into a peroxide solution. In a second trial, an identical cube was first ground, with no loss of mass, into identical cubic particles 0.0020 cm on each side. For this solid catalyst, the O₂ formation rate scales directly with the MnO₂ surface area in contact with the solution.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Species in the iodide-catalyzed run",
     "x": {
      "label": "Time (min)",
      "min": 0,
      "max": 10,
      "step": 2
     },
     "y": {
      "label": "Concentration (mM)",
      "min": 0,
      "max": 3.5,
      "step": 0.5
     },
     "series": [
      {
       "name": "I⁻",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         1.5
        ],
        [
         1,
         1
        ],
        [
         2,
         0.9
        ],
        [
         4,
         1
        ],
        [
         6,
         1.2
        ],
        [
         8,
         1.4
        ],
        [
         10,
         1.5
        ]
       ]
      },
      {
       "name": "IO⁻",
       "marker": "square-open",
       "line": "smooth",
       "points": [
        [
         0,
         0
        ],
        [
         1,
         0.5
        ],
        [
         2,
         0.6
        ],
        [
         4,
         0.5
        ],
        [
         6,
         0.3
        ],
        [
         8,
         0.1
        ],
        [
         10,
         0
        ]
       ]
      },
      {
       "name": "O₂ released",
       "marker": "triangle",
       "line": "smooth",
       "points": [
        [
         0,
         0
        ],
        [
         1,
         0.6
        ],
        [
         2,
         1.2
        ],
        [
         4,
         2
        ],
        [
         6,
         2.5
        ],
        [
         8,
         2.8
        ],
        [
         10,
         3
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Based on the two steps and Figure 1, what are the roles of I⁻ and IO⁻, respectively?",
      "choices": [
       "Intermediate and catalyst",
       "Both intermediates",
       "Catalyst and intermediate",
       "Reactant and product"
      ],
      "ans": 2,
      "cat": "4E",
      "skill": "SIRS 3",
      "diff": "X",
      "twin": "pe1-cp:48",
      "exp": "1. Add the steps; each runs once, and the shared species cancel: H₂O₂ + I⁻ → H₂O + IO⁻; H₂O₂ + IO⁻ → H₂O + O₂ + I⁻; sum: **2H₂O₂ → 2H₂O + O₂** (I⁻ and IO⁻ cancel).\n2. Trace I⁻ in Figure 1: present at the start (1.5 mM), dips to 0.9 mM, and returns to the same 1.5 mM. Used, then given back → catalyst.\n3. Trace IO⁻: zero at the start, peaks at 0.6 mM, back to zero at the end. Made, then used → intermediate. Check: I⁻ + IO⁻ = 1.5 mM at every time (1.0 + 0.5, 0.9 + 0.6, 1.2 + 0.3): the iodine just cycles.\n4. O₂ is the true product: it rises and levels off at 3.0 mM. IO⁻ is not a final product and I⁻ is not used up, so I⁻ cannot be a reactant or an intermediate, and IO⁻ cannot be the catalyst.\n5. Answer: catalyst and intermediate.\n\n**Rule to reuse:** same amount at start and end = catalyst; zero at both ends = intermediate. Now find the choice that says this about I⁻ and IO⁻.",
      "id": "p_cpq3_2_q1"
     },
     {
      "q": "How is the platinum on the disc in a lens case best classified?",
      "choices": [
       "A homogeneous catalyst that is not consumed",
       "A heterogeneous catalyst that is consumed",
       "A heterogeneous catalyst that is not consumed",
       "A homogeneous catalyst that is consumed"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe1-cp:49",
      "exp": "1. Read the phases: catalyst: Pt **(s)**; reactant: H₂O₂ **(aq)**; different phases → **heterogeneous**.\n2. \"Homogeneous\" means the same phase as the reactants, which a solid in a solution is not, so both homogeneous labels fail.\n3. Catalysts are not used up, so \"consumed\" is false even with the right label.\n4. Answer: a heterogeneous catalyst that is not consumed.\n\n**Rule to reuse:** a catalyst in a different phase from the reactants is heterogeneous, in the same phase homogeneous, and in either case it is not consumed.",
      "id": "p_cpq3_2_q2"
     },
     {
      "q": "If dissolved KI replaced the platinum disc in a lens case, which outcome would be most likely?",
      "choices": [
       "Iodide would remain in the saline",
       "Less H₂O₂ would decompose",
       "The saline would be iodide-free",
       "The reaction would run in reverse"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe1-cp:50",
      "exp": "1. Classify the catalyst by phase: KI is dissolved in the same saline as the peroxide and water → catalyst phase = solution; product phase = solution; same phase → **homogeneous**.\n2. Catalysts speed both directions equally; they do not shift the equilibrium (so no less H₂O₂ decomposes) or make the reaction run backward, so those outcomes fail.\n3. Not being consumed does not make the catalyst leave the solution. A dissolved catalyst cannot be filtered off the way a disc is lifted out, so the iodide remains dissolved in the saline, and the saline is not iodide-free.\n4. Answer: iodide would remain in the saline that touches the lens.\n\n**Rule to reuse:** homogeneous catalyst (same phase) → hard to separate, may contaminate product. Heterogeneous (solid in liquid/gas) → filter it off. No catalyst changes K or yield.",
      "id": "p_cpq3_2_q3"
     },
     {
      "q": "If the KI in the model run were ground to a fine powder before being added, how would the rate of O₂ formation change?",
      "choices": [
       "It increases, because more KI surface is exposed.",
       "It decreases, because less KI surface is exposed.",
       "It stays the same, because KI fully dissolves.",
       "It increases, because the KI dissolves more quickly."
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe1-cp:51",
      "exp": "1. The passage says KI dissolves completely in the saline, so it acts as a dissolved catalyst: its I⁻ ions are spread through the solution.\n2. Once dissolved, the rate depends on [I⁻] and [H₂O₂], not on the size of the crystals that were added.\n3. The same 1.5 mM KI gives the same [I⁻], so the rate of O₂ formation **stays the same**.\n4. Surface area matters only for a catalyst that stays solid, like the MnO₂: grinding its 0.80-cm cube into 0.0020-cm particles raises the area, and the rate, 400-fold. That rules out both surface-area choices for KI.\n5. Faster dissolving changes only how soon the KI is in solution, not how much is there, so the rate during the run does not rise.\n6. Answer: it stays the same, because KI fully dissolves.\n\n**Rule to reuse:** grinding speeds a reaction only when the catalyst stays solid; a catalyst that dissolves completely acts through its concentration, which grinding does not change.",
      "id": "p_cpq3_2_q4"
     }
    ]
   },
   {
    "id": "p_cpq3_3",
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
    "passage": "Hospitals use portable ultraviolet (UV) units to disinfect patient rooms between admissions. UV photons are absorbed by the nucleic acids of bacteria and viruses, and the more energetic the photons, the more efficiently they damage these molecules.\n\nIn one design, a sealed gas-filled lamp gives off light at every wavelength between 250 nm and 400 nm. To protect the lamp's quartz envelope, the gas inside must stay at or below 104 °F during operation, and engineers apply PV = nRT, the ideal gas equation, to predict the pressure in the envelope at this temperature. The lamp is powered by a driver that delivers square voltage pulses: the voltage is held at 300 V for 30 µs, then drops to 0 V for 20 µs, and this pattern repeats as long as the unit is switched on.\n\nBecause airborne dust scatters UV light and shields microbes, a fan draws room air through the unit, where it passes between two large parallel metal plates 3.0 mm apart. One plate is held at +900 V and the other is grounded (0 V). Except close to the plate edges, the field has one constant magnitude, 3.0 × 10⁵ V/m, throughout the gap. Dust particles that pick up a charge as they enter are pulled out of the airstream onto the plates, and the cleaned air leaves through a vent at the top of the unit.",
    "questions": [
     {
      "q": "If the envelope's limit were raised to 167 °F, what T must be entered to predict the envelope pressure with PV = nRT at that temperature?",
      "choices": [
       "440 K",
       "408 K",
       "348 K",
       "75 K"
      ],
      "ans": 2,
      "cat": "4B",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "gen_chem",
      "twin": "pe3-cp:17",
      "exp": "1. The given value is in Fahrenheit, and the gas law needs kelvin. Two conversions are needed, in order.\n2. Fahrenheit → Celsius: subtract 32, then scale by 5/9: °C = (167 − 32) × 5/9 = 135 × 5/9 = **75 °C**. Skipping × 5/9 gives 135 + 273 = 408 K ✗.\n3. Celsius → kelvin: add 273: K = 75 + 273 = **348 K**. Stopping at 75 K leaves the value in Celsius, and 167 + 273 = 440 K adds the Celsius offset to a Fahrenheit number ✗.\n4. Check on the conversion line: 167 °F sits between freezing (32 °F, 273 K) and boiling (212 °F, 373 K), three quarters of the way up: (167 − 32) ÷ 180 = 0.75, and 273 + 0.75 × 100 = 348 K.\n5. Answer: 348 K.\n\n**Rule to reuse:** °F → °C: (°F − 32) × 5/9; °C → K: + 273. Gas-law temperatures are ALWAYS in kelvin.",
      "id": "p_cpq3_3_q1"
     },
     {
      "q": "What period and frequency describe the voltage pulses that power the lamp?",
      "choices": [
       "30 µs; 33 kHz",
       "50 µs; 20 kHz",
       "50 µs; 20 MHz",
       "100 µs; 10 kHz"
      ],
      "ans": 1,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe3-cp:18",
      "exp": "1. Picture the waveform: 300 V for 30 µs, then 0 V for 20 µs.\n2. One period is one full on + off cycle, not just the pulse width: T = 30 µs + 20 µs = **50 µs**. 30 µs is the on-time only, and 100 µs spans two cycles.\n3. Convert to seconds, then invert: T = 50 × 10⁻⁶ s = **5.0 × 10⁻⁵ s**; f = 1/T = 1/(5.0 × 10⁻⁵ s) = **2.0 × 10⁴ Hz = 20 kHz**. 20 MHz treats microseconds as nanoseconds when inverting.\n4. Answer: 50 µs and 20 kHz. The 300 V height is extra data.\n\n**Rule to reuse:** period = one full repeat (on + off); f = 1/T with T in seconds. Prefixes: n = 10⁻⁹, μ = 10⁻⁶, k = 10³, M = 10⁶.",
      "id": "p_cpq3_3_q2"
     },
     {
      "q": "Using hc ≈ 1.24 × 10⁻⁶ eV·m, what is the highest energy carried by a single lamp photon, and at which wavelength?",
      "choices": [
       "0.20 eV, at 250 nm",
       "0.50 eV, at 250 nm",
       "3.1 eV, at 400 nm",
       "5.0 eV, at 250 nm"
      ],
      "ans": 3,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe3-cp:19",
      "exp": "1. E = hc/λ: energy is inversely proportional to wavelength, so the MAXIMUM energy is at the SHORTEST wavelength, 250 nm. 3.1 eV is the correct value for the wrong end (1.24 × 10⁻⁶ ÷ 4.0 × 10⁻⁷ = 3.1 eV).\n2. Convert nanometers to meters before dividing: 250 nm = 250 × 10⁻⁹ m = **2.5 × 10⁻⁷ m**.\n3. Divide hc by λ: E = 1.24 × 10⁻⁶ eV·m ÷ 2.5 × 10⁻⁷ m = 4.96 eV ≈ **5.0 eV**.\n4. The other 250 nm answers come from a power-of-ten slip in the conversion or from dividing the wrong way: 1.24 × 10⁻⁶ ÷ 2.5 × 10⁻⁶ ≈ 0.50 ✗; 2.5 × 10⁻⁷ ÷ 1.24 × 10⁻⁶ ≈ 0.20 ✗.\n5. Answer: 5.0 eV, at 250 nm.\n\n**Rule to reuse:** E = hc/λ, so photon energy goes UP as wavelength goes DOWN. Convert nm to m (× 10⁻⁹) before dividing.",
      "id": "p_cpq3_3_q3"
     },
     {
      "q": "In the gap between the dust-collecting plates, the electric field lines are:",
      "choices": [
       "evenly spaced, pointing toward the grounded plate.",
       "evenly spaced, pointing toward the +900 V plate.",
       "crowded near the +900 V plate.",
       "crowded near the grounded plate."
      ],
      "ans": 0,
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:20",
      "exp": "1. Check that the numbers fit a uniform field: E = ΔV/d = 900 V ÷ 0.0030 m = **3.0 × 10⁵ V/m** ✓.\n2. Same magnitude everywhere → uniform field → field lines evenly spaced and parallel. Lines denser near either plate would mean a stronger field there.\n3. Direction: E points 'downhill' in potential, from high V to low V, so the lines leave the +900 V plate and end on the grounded plate, not the reverse.\n4. Answer: evenly spaced, pointing toward the grounded plate.\n\n**Rule to reuse:** field lines point from high V to low V; equal spacing = uniform field; between parallel plates E = ΔV/d.",
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
    "title": "Assembling a Drug Candidate from Three Fragments",
    "passage": "Compound 7, a candidate drug for chronic pain, contains four nitrogen atoms, labeled N1 through N4. Table 1 lists the atoms bonded to each of them, together with approximate pKa values used in planning the synthesis. Compound 7 was assembled from three fragments.\n\nFragment A was made from methyl 4-oxo-4-phenylbutanoate. Sodium borohydride (NaBH₄) converted the ketone into a secondary alcohol but left the ester untouched, and the new hydroxyl group then attacked the ester carbonyl carbon of the same molecule, releasing methanol and closing a lactone ring. Later in the route, an intermediate that carried both this lactone ring and a tert-butyl ester was heated with 1 equivalent of aqueous NaOH.\n\nFragment B, tetrahydroisoquinoline (THIQ), is a cyclic secondary amine that is sold as its hydrochloride salt, THIQ·HCl. The salt was first stirred with triethylamine (Et₃N) in acetonitrile, and an alkyl bromide fragment was then added; an SN2 reaction joined the two pieces and formed N4 of Compound 7.\n\nThe third fragment carries N1, which is protected as a methyl carbamate, R₂N–C(=O)–OCH₃, and remains so in Compound 7. In a related analog, the chemists removed this group at the end of the route by complete hydrolysis in hot aqueous base.",
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
      "q": "According to Table 1, which labeled nitrogen of Compound 7 belongs to a tertiary amine?",
      "choices": [
       "N1",
       "N2",
       "N3",
       "N4"
      ],
      "ans": 3,
      "cat": "5A",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe4-cp:29",
      "exp": "1. You need an N with three carbons and no carbonyl next door.\n2. Read each labeled N in Table 1: N1: C=O carbon + CH₂ + CH₂ → **3 C, one is C=O**; N2: CH₂ + CH₂ + H → **2 C**; N3: C=N double bond → **imine**; N4: CH₂ + CH₂ + CH₂ → **3 C, no C=O**.\n3. N1 sits on a carbonyl carbon, so it is part of a carbamate (an amide-type N), and N3 has a double bond to C, so it is an imine.\n4. N2 carries an H and only two carbons: a secondary amine.\n5. N4 has three plain carbon neighbors and no H. Answer: N4.\n\n**Rule to reuse:** for each N, check for C=N (imine), then a C=O neighbor (amide), then count carbons. Ask of each labeled N: three plain carbons, no H?",
      "id": "p_cpq3_4_q1"
     },
     {
      "q": "When Fragment A is made from methyl 4-oxo-4-phenylbutanoate, the product that forms is:",
      "choices": [
       "a four-membered lactone",
       "a five-membered lactone",
       "a six-membered lactone",
       "an open-chain diol"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:30",
      "exp": "1. Only the ketone is reduced; the ester stays to be attacked.\n2. So the ester is not reduced, and both carbonyls cannot become alcohols: no diol forms.\n3. After reduction, trace the ring that forms: from the ester carbon (C1) along the chain to the new OH oxygen on C4.\n4. Count ring atoms: carbons C1, C2, C3, C4 = **4**; ring oxygen = **1**; ring size = 4 + 1 = **5**. A four-membered ring forgets the ring O, and a six-membered ring counts one atom too many.\n5. Answer: the five-membered lactone (a γ-lactone), with the phenyl on the carbon beside the ring O.\n6. Rule: ring size = carbonyl carbon through OH carbon, plus one for the ring O.\n\n**Rule to reuse:** ring size = carbonyl carbon through the OH carbon, **plus 1 for the ring O**. For each choice, count ring atoms, find the CH₃, and ask: is the ester C=O still there?",
      "id": "p_cpq3_4_q2"
     },
     {
      "q": "When the intermediate bearing the lactone ring and the tert-butyl ester is heated with the aqueous NaOH, what happens?",
      "choices": [
       "Only the tert-butyl ester is hydrolyzed",
       "Both esters are hydrolyzed",
       "Only the lactone ring opens",
       "Neither ester reacts"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe4-cp:31",
      "exp": "1. Both groups are esters: the lactone is a cyclic ester, and the tert-butyl ester has a bulky (CH₃)₃C group on its O.\n2. Count the base: each saponification uses up one OH⁻, so **1 equivalent** can hydrolyze only one of the two groups. That rules out \"Both esters are hydrolyzed\", and hot hydroxide does react, which rules out \"Neither ester reacts\".\n3. OH⁻ must add to the C=O. The tert-butyl group crowds its C=O, so tert-butyl esters resist basic hydrolysis (they are cleaved with acid): \"Only the tert-butyl ester is hydrolyzed\" is out.\n4. The unhindered lactone C=O is attacked, and the ring opens to a hydroxy carboxylate.\n5. Answer: only the lactone ring opens.\n\n**Rule to reuse:** count the equivalents of base first; when they run short, the least hindered ester (or lactone) reacts and a tert-butyl ester survives.",
      "id": "p_cpq3_4_q3"
     },
     {
      "q": "Based on Table 1, after THIQ·HCl is stirred with Et₃N, the species that attacks the alkyl bromide is:",
      "choices": [
       "Protonated THIQ",
       "Neutral THIQ",
       "THIQ amide anion",
       "Alkyl bromide carbanion"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe4-cp:32",
      "exp": "1. The comparison number is in Table 1: the base's conjugate acid, Et₃NH⁺, has pKa 10.7.\n2. Compare every proton Et₃N might try to remove: THIQ–H⁺ N–H: pKa ≈ **9.4** < 10.7 → removed; THIQ N–H: pKa ≈ **36** > 10.7 → not removed; C–H on the carbon bearing Br: pKa > **45** → not removed.\n3. So Et₃N stops after one proton: no amide anion and no carbanion.\n4. The salt itself has four bonds on N and no lone pair, so protonated THIQ cannot attack.\n5. Neutral THIQ has its lone pair back on N, ready to attack the carbon bearing Br.\n6. Answer: neutral THIQ.\n\n**Rule to reuse:** N attacks only with a **free lone pair**; a base removes only an H⁺ with lower pKa. For each choice ask: does Et₃N make it, and is its N lone pair free?",
      "id": "p_cpq3_4_q4"
     },
     {
      "q": "Which products form on complete hydrolysis of the methyl carbamate on N1 in hot aqueous base?",
      "choices": [
       "A carbamic acid and methane",
       "An amide and methanol",
       "The free amine, carbonate and methanol",
       "The free amine and methyl acetate"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe4-cp:33",
      "exp": "1. The carbonyl carbon has two bonds to break: ester side: C–OCH₃ → **CH₃OH**; left: R₂N–COOH (carbamic acid); R₂N–COOH → **R₂NH + CO₂** (→ carbonate in base).\n2. \"Complete hydrolysis\" cleaves both bonds, so a remaining amide or carbamic acid is not the end, and hydrolysis gives methanol, not methane.\n3. Methyl acetate would need an acetyl (CH₃C=O) group, which the carbamate does not have.\n4. Answer: the free amine, carbonate and methanol.\n\n**Rule to reuse:** complete hydrolysis of a carbamate cleaves both bonds to its carbonyl, giving the amine, the alcohol and CO₂ (carbonate in base).",
      "id": "p_cpq3_4_q5"
     }
    ]
   },
   {
    "id": "p_cpq3_5",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5A",
     "4D",
     "4C"
    ],
    "title": "A Cellulose-Binding Module Studied by ¹⁹F NMR",
    "passage": "Fungal cellulases attach to insoluble cellulose through a small cellulose-binding module (CBM) of about 40 residues. Three aromatic side chains, Trp24, Tyr31 and Tyr32, lie in a row on one flat face of the module. Each ring stacks against a glucose ring of a cellulose chain through CH–π contacts, and the indole N–H of Trp24 also donates a hydrogen bond to the O6 hydroxyl of one glucose unit. Most of the remaining surface of the module is covered with asparagine and glutamine side chains.\n\nTo follow binding, researchers replaced Tyr31 with 3-fluorotyrosine by genetic code expansion, a method that can place either a natural or an unnatural amino acid at any chosen position in a protein. The labeled CBM was purified by precipitation with a white salt whose solution contains NH₄⁺ and SO₄²⁻ ions in a 2:1 ratio, and it was then redissolved in a pH 7.0 phosphate buffer.\n\nSpectra were recorded on a spectrometer with a 9.40 T magnet, in which ¹⁹F nuclei absorb radio-frequency photons at 376 MHz. Adding short cellulose fragments shifted the ¹⁹F signal, and the size of the shift at each fragment concentration was used to calculate a binding constant. For any nucleus, γ = 2πf/B relates its gyromagnetic ratio γ to its resonance frequency f in a field of strength B. Because γ is fixed for each isotope, researchers often report γ/2π.",
    "questions": [
     {
      "q": "Which replacement for Trp24 would most likely keep both its stacking and its hydrogen bond to cellulose?",
      "choices": [
       "Isoleucine",
       "O-Methyltyrosine",
       "Threonine",
       "Tyrosine"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe6-cp:48",
      "exp": "1. List what Trp24 does: it stacks (needs a ring) and donates a hydrogen bond (needs an H on N or O): feature 1: flat **aromatic ring**; feature 2: **X–H** donor, X = N or O.\n2. O-Methyltyrosine keeps the ring, but its O is capped with CH₃, so it has no X–H; threonine has an O–H but no ring.\n3. Isoleucine is a plain branched hydrocarbon with neither feature.\n4. Tyrosine's phenol ring is flat and aromatic, and its O–H is a donor.\n5. Answer: tyrosine. Rule: list the features the residue uses, then keep every one; Tyr = ring + O–H donor.\n\n**Rule to reuse:** **Stacking (CH–π) with sugars** needs a flat aromatic ring: Phe, Tyr, Trp, His.",
      "id": "p_cpq3_5_q1"
     },
     {
      "q": "To which property of the module do the many asparagine and glutamine residues on its surface most likely contribute?",
      "choices": [
       "Binding of cellulose",
       "Rate of aggregation",
       "Overall anionic charge",
       "Solubility in water"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe6-cp:49",
      "exp": "1. Look at the side chains: Asn –CH₂C(=O)NH₂ and Gln –CH₂CH₂C(=O)NH₂ are polar amides.\n2. Amides are neither acidic nor basic in water (amide N–H pKa ≈ 17), so they are uncharged at pH 7.0 and add no negative charge: fraction ionized = 10^(7.0 − 17) ≈ **1 × 10⁻¹⁰** → essentially **neutral**.\n3. Polar amide groups hydrogen bond with water, which opposes aggregation; cellulose binding depends on the aromatic face, not the whole surface.\n4. Answer: solubility in water, because surface amides hydrogen bond with water.\n\n**Rule to reuse:** polar, uncharged surface residues (Ser, Thr, Asn, Gln) hydrogen bond with water and raise solubility.",
      "id": "p_cpq3_5_q2"
     },
     {
      "q": "A 0.20 M solution of the precipitating salt has a pH of about 4.8. What is the salt's name, and which ion makes the solution acidic?",
      "choices": [
       "Ammonium sulfate; the cation",
       "Ammonium sulfate; the anion",
       "Ammonium sulfide; the cation",
       "Nitrogen tetrahydride sulfate; the cation"
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "pe6-cp:50",
      "exp": "1. Name the ions: NH₄⁺ is the polyatomic cation ammonium; SO₄²⁻ is sulfate (sulfide is S²⁻). Ionic names are cation then anion, with no Greek prefixes, so \"ammonium sulfide\" and \"nitrogen tetrahydride sulfate\" fail.\n2. Find the acid: SO₄²⁻ is the conjugate base of HSO₄⁻ (Ka ≈ 10⁻²), so its Kb ≈ 10⁻¹², negligible next to NH₄⁺; NH₄⁺ is the conjugate acid of the weak base NH₃: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺; Ka = Kw/Kb = 1.0 × 10⁻¹⁴ ÷ 1.8 × 10⁻⁵ = **5.6 × 10⁻¹⁰**.\n3. Check the pH in the stem: [NH₄⁺] = 2 × 0.20 = 0.40 M; [H⁺] = √(Ka·C) = √(5.6 × 10⁻¹⁰ × 0.40) = √(2.2 × 10⁻¹⁰) = **1.5 × 10⁻⁵ M**; pH = **4.8**.\n4. Sulfate has no proton to donate, and if it accepted a proton from water it would make OH⁻ and a basic solution, the opposite of what is seen, so the anion is not the cause.\n5. Answer: ammonium sulfate; the cation (NH₄⁺) donates a proton to water.\n\n**Rule to reuse:** ionic name = cation + anion (SO₄²⁻ = sulfate, not sulfide). The conjugate acid of a weak base (NH₄⁺) lowers pH; the anion of a strong acid (SO₄²⁻) has almost no effect.",
      "id": "p_cpq3_5_q3"
     },
     {
      "q": "Taking h = 4.14 × 10⁻¹⁵ eV·s, how much energy does a single photon absorbed by the ¹⁹F nuclei carry?",
      "choices": [
       "1.6 neV",
       "16 neV",
       "1.6 µeV",
       "1.6 meV"
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "physics",
      "twin": "pe6-cp:51",
      "exp": "1. Translate: the frequency is given (376 MHz); photon energy uses E = hf.\n2. Convert MHz to Hz: 376 MHz = 376 × 10⁶ Hz = **3.76 × 10⁸ Hz**.\n3. Multiply: E = 4.14 × 10⁻¹⁵ eV·s × 3.76 × 10⁸ s⁻¹ = 15.6 × 10⁻⁷ eV ≈ **1.6 × 10⁻⁶ eV = 1.6 µeV**.\n4. Check the exponent: 10⁻¹⁵ × 10⁸ = 10⁻⁷, and 15.6 × 10⁻⁷ = 1.56 × 10⁻⁶. Wrong powers of ten give the other choices: MHz read as kHz gives 1.6 neV, 376 MHz written as 3.76 × 10⁶ Hz gives 16 neV, and MHz read as GHz gives 1.6 meV.\n5. Answer: 1.6 µeV, a radio photon about a million times weaker than a visible photon (about 2 eV).\n\n**Rule to reuse:** E = hf. Convert MHz → Hz (× 10⁶) first, multiply the front numbers, add the exponents.",
      "id": "p_cpq3_5_q4"
     },
     {
      "q": "Using the spectrometer data, what is γ/2π for ¹⁹F?",
      "choices": [
       "0.025 MHz/T",
       "40 MHz/T",
       "251 MHz/T",
       "3530 MHz/T"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "physics",
      "twin": "pe6-cp:52",
      "exp": "1. Use the equation given: γ = 2πf/B, so γ/2π = f/B; the 2π is already divided out of the quantity asked for.\n2. Plug in f and B: γ/2π = 376 MHz ÷ 9.40 T = **40.0 MHz/T**.\n3. 251 multiplies by 2π again (2π × 40 ≈ 251), counting it twice; 3530 multiplies f × B (376 × 9.40 ≈ 3530); 0.025 divides B by f (9.40 ÷ 376). Check: 40.0 × 9.40 = **376** ✓.\n4. Answer: 40 MHz/T, the known value for fluorine-19.\n\n**Rule to reuse:** when the MCAT hands you an unfamiliar formula, match each symbol to a number, keep any factor the choices keep (like 2π), and do the algebra.",
      "id": "p_cpq3_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "An electron in a hydrogen atom is excited from a 3s orbital to a 5s orbital. Which property of the orbital it occupies changes the most?",
    "choices": [
     "Its shape",
     "Its size and energy",
     "Its electron capacity",
     "Its orientation"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "twin": "sample-cp:29",
    "exp": "1. Read the change: 3s → 5s.\n2. Split each label into quantum numbers: 3s: n = 3, l = 0; 5s: n = 5, l = 0; only **n** changes → size and energy (average distance from the nucleus).\n3. Shape is set by l (both are s), orientation by mₗ (an s orbital has only one), and each orbital still holds 2 electrons.\n4. Answer: its size and energy.\n\n**Rule to reuse:** the number in an orbital label (n) sets size and energy; the letter (l) sets shape; mₗ sets orientation; each orbital holds 2 electrons.",
    "id": "cp_q3_sa1"
   },
   {
    "q": "Bacteria reduce diacetyl to 2,3-butanediol in two NADH-dependent steps; overall: CH₃COCOCH₃ + 2 NADH + __H⁺ → CH₃CH(OH)CH(OH)CH₃ + 2 NAD⁺. What coefficient on H⁺ balances this equation?",
    "choices": [
     "1",
     "2",
     "3",
     "4"
    ],
    "ans": 1,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biochemistry",
    "twin": "sample-cp:59",
    "exp": "1. The coefficient on H⁺ is the unknown.\n2. Count hydrogens that end up in the diol: CH₃COCOCH₃: 6 H; CH₃CH(OH)CH(OH)CH₃: 10 H; need 10 − 6 = 4 H; 2 NADH → 2 H⁻: 2 H; from solution: **2 H⁺**.\n3. Check the charge: left: 2 NADH (0) + 2 H⁺ (+2) = +2; right: 2 NAD⁺ = +2 ✓.\n4. One leaves the diol one H short and the charges unequal; three or four would put extra positive charge on the left. Four assumes all the new hydrogens come from solution.\n5. Answer: two H⁺.\n\n**Rule to reuse:** NAD(P)H reductions add H⁻ from the cofactor plus one H⁺ from solution; balance both atoms and charge.",
    "id": "cp_q3_sa2"
   },
   {
    "q": "A size-exclusion resin is made of polystyrene, a carbon chain bearing a phenyl ring on every other carbon, cross-linked by divinylbenzene. Some small peptides rich in phenylalanine and tryptophan leave the column later than expected for their size. Which weak interaction with the resin is most likely responsible?",
    "choices": [
     "Ionic attraction to sulfonate groups",
     "Hydrogen bonding with hydroxyl groups",
     "π-stacking with phenyl rings",
     "Hydrophobic interaction with octyl chains"
    ],
    "ans": 2,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "biochemistry",
    "twin": "pe3-cp:46",
    "exp": "1. The resin attracts the peptides weakly: look for a weak, noncovalent interaction the polymer can make.\n2. Inventory the structure: charges: **none**; O–H or N–H groups: **none** (only C and H); chains: a C–C backbone, **no octyl tail**; rings: **a phenyl on every other carbon**.\n3. No charges means no ionic pairing (there are no sulfonate groups), and no O–H groups means no hydrogen bonding with hydroxyls.\n4. The backbone carries a ring on every other carbon, so there is no free eight-carbon tail such as an octyl chain.\n5. The slowed peptides are the ones with aromatic side chains (Phe, Trp), whose rings stack face to face on the resin's phenyl rings. Answer: π-stacking with phenyl rings.\n6. Rule: on a structure question about interactions, only count groups that are present: N–H/O–H and C=O → H-bonds; charges → ionic; rings → π; long C–H chains → hydrophobic.\n\n**Rule to reuse:** To predict what a surface can do, list its functional groups from its description, then match them to the peptides that are slowed.",
    "id": "cp_q3_sa3"
   },
   {
    "q": "A capsule endoscope's camera lens is mounted 2.0 cm from its image sensor. What lens power brings a polyp 10 cm from the lens into sharp focus on the sensor?",
    "choices": [
     "+0.60 D",
     "+10 D",
     "+40 D",
     "+60 D"
    ],
    "ans": 3,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe1-cp:11",
    "exp": "1. Lens power in diopters is **P = 1/f with f in meters**, so convert both distances first: o = **0.10 m**, i = **0.020 m**.\n2. Thin lens: 1/f = 1/0.10 + 1/0.020 = 10 + 50 = **60 m⁻¹**, so P = **+60 D**. The sharp image forms on the sensor, a real image, so the lens is converging (positive).\n3. \"+0.60 D\" uses centimeters (1/10 + 1/2 = 0.60 cm⁻¹). \"+10 D\" uses only the object distance. \"+40 D\" subtracts the terms instead of adding them.\n4. Answer: +60 D.\n\n**Rule to reuse:** P = 1/o + 1/i with distances in meters; a real image on a screen or sensor needs a positive (converging) lens.",
    "id": "cp_q3_sa4"
   },
   {
    "q": "A runner's blood pressure is 118/76 mmHg and her pulse is 72 beats/min. Using MAP ≈ (P_s + 2P_d)/3, with P_s the systolic and P_d the diastolic pressure, what is her mean arterial pressure?",
    "choices": [
     "104 mmHg",
     "97 mmHg",
     "90 mmHg",
     "76 mmHg"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "biology",
    "twin": "pe4-cp:57",
    "exp": "1. Translate: read systolic (top) and diastolic (bottom) pressures; the pulse is extra data.\n2. Plug into the given formula, weighting diastolic twice: P_s = **118**, P_d = **76** mmHg; MAP = (118 + 2 × 76) ÷ 3 = (118 + 152) ÷ 3 = 270 ÷ 3 = **90 mmHg**.\n3. The MAP sits closer to diastolic because the heart spends about two-thirds of each cycle in diastole.\n4. Swapping P_d and P_s gives (2 × 118 + 76) ÷ 3 = 104; 76 is diastolic alone; 97 is the simple average, (118 + 76) ÷ 2.\n5. Answer: 90 mmHg.\n\n**Rule to reuse:** BP = systolic/diastolic. MAP = (2 × diastolic + systolic) ÷ 3, closer to diastolic. Use only the numbers the formula needs.",
    "id": "cp_q3_sa5"
   },
   {
    "q": "Every nucleus in a gas sample has 40 nucleons, 22 of them neutrons. A student labels the gas calcium, since ⁴⁰Ca is calcium's most common isotope. How should the student's label be judged?",
    "choices": [
     "Correct; A = 40 matches calcium",
     "Incorrect; Z = 22, titanium",
     "Incorrect; Z = 18, argon",
     "Incorrect; Z = 40, zirconium"
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "physics",
    "twin": "pe5-cp:10",
    "exp": "1. Mass number A counts nucleons: protons plus neutrons. The stem gives A and N, not Z.\n2. Solve for the proton count: A = Z + N; Z = A − N = 40 − 22 = **18**.\n3. The proton count Z, not A, names the element. Z = 18 is argon, so the student's label fails.\n4. Titanium has 22 protons and zirconium has 40; each of those uses the neutron count or the nucleon count as Z.\n5. Compare with the nucleus the student had in mind: ⁴⁰Ar: Z = 18, N = 22; ⁴⁰Ca: Z = **20**, N = **20**; same A, different Z → **different elements**. Answer: incorrect; Z = 18, argon.\n\n**Rule to reuse:** the element is set by protons (Z) only. Z = A − N. Equal mass numbers do not mean the same element.",
    "id": "cp_q3_sa6"
   },
   {
    "q": "Consider Lewis structures of CCl₄, CO₂, BF₃ and NF₃ written with bonds only, with every lone pair omitted. Which of the four molecules has a net dipole moment?",
    "choices": [
     "Nitrogen trifluoride",
     "Carbon tetrachloride",
     "Boron trifluoride",
     "Carbon dioxide"
    ],
    "ans": 0,
    "cat": "5B",
    "skill": "SIRS 4",
    "diff": "X",
    "subj": "gen_chem",
    "twin": "pe5-cp:11",
    "exp": "1. A net dipole needs polar bonds that do not cancel. All four have polar bonds, so the shape decides.\n2. The structures show bonds only, so count the central atom's lone pairs from its valence electrons: C in CCl₄: 4 e⁻, 4 bonds → **0** lone pairs; C in CO₂: 4 e⁻, two double bonds → **0**; B: 3 e⁻, 3 bonds → **0**; N: 5 e⁻, 3 bonds → 2 left = **1** lone pair.\n3. Turn domains into shapes: CCl₄: 4 domains, 0 lone → tetrahedral, cancels; CO₂: 2 domains → linear, cancels; BF₃: 3 domains → trigonal planar, cancels; NF₃: 4 domains, 1 lone → **pyramidal**, does not cancel.\n4. Symmetric shapes with no lone pair on the center cancel their bond dipoles, which rules out carbon tetrachloride, carbon dioxide and boron trifluoride.\n5. Answer: NF₃. A lone pair that makes the shape asymmetric (pyramidal or bent) leaves the bond dipoles uncancelled.\n\n**Rule to reuse:** **Dipole moment:** a molecule has one when its bond dipoles (arrows from δ+ to δ−) do not add to zero.",
    "id": "cp_q3_sa7"
   },
   {
    "q": "Methanimine, CH₂NH, is drawn so that every atom has a full valence shell. How many bonds join its carbon and nitrogen atoms?",
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
    "exp": "1. Count valence electrons: C 4 + N 5 + 3 H × 1 = **12** e⁻.\n2. Connect the atoms: two C–H, one N–H and one C–N single bond use 8 e⁻, leaving 4.\n3. Put the 4 on N as two lone pairs; carbon then has only 6 e⁻, so turn one N lone pair into a second C–N bond: C=N. Now C has 4 bonds (8 e⁻) and N has 3 bonds plus one lone pair (8 e⁻); total 2 + 2 + 2 + 4 + 2 = 12 ✓.\n4. Formal charges are all 0, so this is the best structure: **2 bonds** (one σ, one π) join C and N. A single bond leaves carbon short of an octet; a triple bond would give carbon five bonds.\n5. Answer: 2.\n\n**Rule to reuse:** count valence e⁻, connect the atoms with single bonds, then turn lone pairs into multiple bonds until every atom has an octet (H: 2 e⁻); the number of bonds between two atoms is the bond count.",
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
    "title": "Three Reactions of Alkyl Halides",
    "passage": "Alkyl halides are usually made from alcohols, and they are then converted into other functional groups by nucleophilic substitution. An undergraduate research group studied three reactions of this kind.\n\nIn Reaction 1, 3-methyl-2-pentanol was heated under reflux with concentrated hydrobromic acid. After workup, four products were isolated and identified by NMR spectroscopy: Product W, 2-bromo-3-methylpentane; Product X, 3-bromo-3-methylpentane; Product Y, 3-methyl-1-pentene; and Product Z, 3-methyl-2-pentene. Before purification, a sample of the crude organic layer, which still held some unreacted alcohol, was analyzed by gas chromatography (GC) on a nonpolar column kept at 110 °C, with helium as the carrier gas.\n\nIn Reaction 2, several alkyl bromides were tested separately with a 15% sodium iodide solution in acetone at 40 °C. Sodium iodide dissolves in acetone but sodium bromide does not, so the time until a cloudy precipitate appeared served as a measure of how fast each bromide reacted.\n\nIn Reaction 3, enantiomerically pure (R)-3-bromohexane was stirred with sodium azide, NaN₃, in dimethyl sulfoxide (DMSO), a polar aprotic solvent. Kinetic runs at several starting concentrations showed that the rate was first order in the alkyl bromide and first order in azide ion. Azide ion is a strong nucleophile but a weak base, and the group isolated a single major organic product.",
    "questions": [
     {
      "q": "Under the conditions of Reaction 2, the alkyl bromide that reacts fastest is:",
      "choices": [
       "3-Bromo-3-methylpentane",
       "Bromocyclohexane",
       "Bromoethane",
       "3-(Bromomethyl)-3-methylpentane"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 3",
      "diff": "D",
      "twin": "pe1-cp:6",
      "exp": "1. Name the mechanism from the conditions: iodide, a strong nucleophile, in acetone, a polar aprotic solvent → SN2. R–Br + I⁻ → R–I + Br⁻ in one step; rate = k[R–Br][I⁻]; NaBr is insoluble in acetone, so the **precipitate** marks the reaction.\n2. In SN2, I⁻ must reach the back of the C–Br carbon. Count the carbons attached to that carbon: 3-bromo-3-methylpentane: **3** C → 3°, no SN2; bromocyclohexane: **2** C → 2°, slow; bromoethane: **1** C → 1°; 3-(bromomethyl)-3-methylpentane: **1** C → 1°, but that carbon carries a CH₃ and two ethyl groups.\n3. Tertiary and secondary carbons are crowded at the back side, so \"3-Bromo-3-methylpentane\" and \"Bromocyclohexane\" are slow.\n4. Compare the two primary bromides. In 3-(bromomethyl)-3-methylpentane the neighboring carbon is quaternary, like the one in neopentyl bromide, and its three alkyl groups sit right where I⁻ must enter, so it reacts extremely slowly. Bromoethane's neighbor is only a CH₃.\n5. Answer: bromoethane.\n\n**Rule to reuse:** SN2 is fastest when the C–X carbon and its neighbor are least crowded (1° > 2° ≫ 3°). For each choice, count carbons on and next to the C–Br carbon.",
      "id": "p_cpq4_1_q1"
     },
     {
      "q": "Which product of Reaction 1 could NOT have formed unless a hydrogen or methyl group first moved within the carbocation intermediate?",
      "choices": [
       "Product W",
       "Product Y",
       "Product Z",
       "Product X"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 3",
      "diff": "X",
      "twin": "pe1-cp:7",
      "exp": "1. Hot HBr with a 2° alcohol: –OH is protonated, water leaves C2, and a 2° cation forms there. Its neighbor C3 carries one H (plus a CH₃ and an ethyl group). CH₃–CH(OH)–CH(CH₃)–CH₂CH₃ + H⁺ → CH₃–CH(OH₂⁺)–CH(CH₃)–CH₂CH₃ → CH₃–**C⁺H**–CH(CH₃)–CH₂CH₃ + H₂O (2° at C2).\n2. List what the C2 cation gives directly: Br⁻ at C2 → 2-bromo-3-methylpentane (Product W); loss of H⁺ from C1 → C1=C2 → 3-methyl-1-pentene (Product Y); loss of H⁺ from C3 → C2=C3 → **3-methyl-2-pentene** (Product Z). So \"Product W\", \"Product Y\" and \"Product Z\" all have a direct route.\n3. Product X, 3-bromo-3-methylpentane, has Br on C3, a carbon that never held the OH. That needs the C3 hydrogen to shift to C2 first: 2° C⁺ at C2 → 1,2-H shift → **3° C⁺** at C3; 3° C⁺ + Br⁻ → 3-bromo-3-methylpentane. (Product Z can also form from this 3° cation, but it has a direct route as well.)\n4. Answer: Product X.\n\n**Rule to reuse:** a new group on the OH carbon, or a C=C touching it, forms directly; on any other carbon, something moved first. Check each product.",
      "id": "p_cpq4_1_q2"
     },
     {
      "q": "In the GC analysis of the crude product from Reaction 1, which component reaches the detector first, and why?",
      "choices": [
       "The alcohol, since it is the most polar",
       "A bromide, since it has the largest mass",
       "An alkene, since it has the lowest boiling point",
       "A bromide, since it is the least polar"
      ],
      "ans": 2,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "M",
      "twin": "pe1-cp:8",
      "exp": "1. In GC the mobile phase is a gas. A component that boils easily spends more time in the gas and reaches the detector first.\n2. Rank the intermolecular forces: unreacted 3-methyl-2-pentanol (102 g/mol): hydrogen bonding + dipole + London; the bromides W and X (165 g/mol): dipole + large London forces from the heavy, polarizable Br; the alkenes Y and Z (84 g/mol): **London forces only, smallest mass**.\n3. Weakest forces → lowest boiling point → most volatile. The boiling points agree: the alkenes boil between about 54 and 70 °C, while the alcohol boils near 134 °C.\n4. Polarity and mass both RAISE the boiling point, so \"The alcohol, since it is the most polar\" and \"A bromide, since it has the largest mass\" describe components that come out late, not first.\n5. The bromide is not the least polar component; the alkenes are, so \"A bromide, since it is the least polar\" is false. Answer: an alkene, since it has the lowest boiling point.\n\n**Rule to reuse:** in GC, order of exit = order of boiling point. Weakest intermolecular forces (no H-bonding, small mass) → most volatile → reaches the detector first.",
      "id": "p_cpq4_1_q3"
     },
     {
      "q": "What is the major organic product of Reaction 3?",
      "choices": [
       "(R)-3-Azidohexane",
       "(S)-3-Azidohexane",
       "Hexyl azide",
       "(E)-3-Hexene"
      ],
      "ans": 1,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe1-cp:9",
      "exp": "1. Read the rate law: first order in each reactant → bimolecular, one step → **SN2**. One step means no carbocation, so no racemization and no shifts.\n2. Find the stereocenter: C3 carries Br, an ethyl group, a propyl group and H. N₃⁻ enters from the side opposite Br, and the arrangement inverts.\n3. Check whether the priority order changes when N₃ replaces Br. Before: **Br** (Z = 35) > propyl > ethyl > H. After: **N₃** (Z = 7) > propyl > ethyl > H (propyl beats ethyl at the second carbon, C versus H). Same rank order + inverted arrangement → R becomes **S**.\n4. Retention, \"(R)-3-Azidohexane\", would need attack from the Br side. \"Hexyl azide\" puts N₃ on the wrong carbon, and \"(E)-3-Hexene\" is an elimination product, which a strong but weakly basic nucleophile with an SN2 rate law does not give.\n5. Answer: (S)-3-azidohexane.\n\n**Rule to reuse:** SN2 = same carbon, inverted; if the new group keeps the old rank, R/S flips. For each choice, check N₃'s carbon, any C=C, and the R/S label.",
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
    "title": "Methylamine and the Fountain Experiment",
    "passage": "Methylamine, CH₃NH₂, is a colorless gas with a fishy odor. It is the simplest primary amine and, like ammonia, is very soluble in water, where it acts as a weak base: CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻, Kb = 4.4 × 10⁻⁴. Its conjugate acid, CH₃NH₃⁺, has Ka = 2.3 × 10⁻¹¹. Aqueous methylamine is sold at several concentrations, and a 0.50 M stock is common in teaching laboratories.\n\nIn one classroom demonstration, methylamine gas is generated by gently heating methylammonium chloride with the solid hydroxide of a metal X. Metal X has successive ionization energies, first through fourth, of 590, 1145, 4912, and 6491 kJ/mol. The gas is collected in a dry, inverted flask, which is then closed with a stopper that holds a dropper of water and a glass tube. The lower end of the tube dips into a beaker of water containing phenolphthalein. When a few drops of water are squeezed into the flask, beaker water sprays up through the tube into the flask as a pink fountain.\n\nThe instructor then filled the same apparatus with other gases, listed with methylamine in Table 1, to show students how molecular structure affects behavior in water. Only some of these gases produced a fountain, and the students were asked to explain the difference.",
    "figure": {
     "caption": "Table 1 Gases used in the fountain apparatus",
     "columns": [
      "Gas",
      "Condensed formula",
      "Molar mass (g/mol)",
      "Boiling point (°C)"
     ],
     "rows": [
      [
       "Methylamine",
       "CH₃NH₂",
       "31",
       "−6"
      ],
      [
       "Trimethylamine",
       "(CH₃)₃N",
       "59",
       "3"
      ],
      [
       "Dimethyl ether",
       "CH₃OCH₃",
       "46",
       "−24"
      ],
      [
       "Fluoromethane",
       "CH₃F",
       "34",
       "−78"
      ]
     ]
    },
    "questions": [
     {
      "q": "Based on Table 1, the compound that, as a pure liquid, has hydrogen bonds between its own molecules is:",
      "choices": [
       "Trimethylamine",
       "Fluoromethane",
       "Dimethyl ether",
       "Methylamine"
      ],
      "ans": 3,
      "cat": "5B",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe4-cp:17",
      "exp": "1. The question asks about hydrogen bonds between identical molecules, so each molecule must both donate and accept.\n2. Check each heteroatom in Table 1 for an attached H: trimethylamine, (CH₃)₃N: H on N = **0**; fluoromethane, CH₃F: H on F = **0** (all three H are on C); dimethyl ether, CH₃OCH₃: H on O = **0**; methylamine, CH₃NH₂: H on N = **2**.\n3. No donor H means no self-hydrogen-bonding, even with a lone pair present, so \"Trimethylamine\", \"Fluoromethane\" and \"Dimethyl ether\" are out.\n4. Methylamine's N–H donates to the lone pair on a neighbor's N. The table agrees: methylamine (31 g/mol) boils at −6 °C, above the heavier dimethyl ether (46 g/mol, −24 °C).\n5. Answer: methylamine.\n\n**Rule to reuse:** self hydrogen bonding needs an **H directly on N, O or F**. In each formula, find every N and O and ask: is an H attached?",
      "id": "p_cpq4_2_q1"
     },
     {
      "q": "Approximately what is [CH₃NH₃⁺] at equilibrium in the 0.50 M methylamine stock described in the passage?",
      "choices": [
       "3.4 × 10⁻⁶ M",
       "2.2 × 10⁻⁴ M",
       "1.5 × 10⁻² M",
       "2.1 × 10⁻² M"
      ],
      "ans": 2,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe4-cp:18",
      "exp": "1. Translate: methylamine is a weak base; [CH₃NH₃⁺] equals the x formed by CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻.\n2. Pick the right constant: the reaction uses CH₃NH₂ as a base, so use Kb. The Ka of CH₃NH₃⁺ is extra data.\n3. Set up the weak-base approximation: Kb = x² ÷ (C − x) ≈ x² ÷ C; x² = **4.4 × 10⁻⁴** × **0.50** = **2.2 × 10⁻⁴**; x = √(2.2 × 10⁻⁴) ≈ **1.5 × 10⁻² M**.\n4. The wrong choices come from forgetting the square root, using Ka, or leaving out C: x² = 2.2 × 10⁻⁴ M = \"2.2 × 10⁻⁴ M\"; √(Ka × C) = √(1.15 × 10⁻¹¹) ≈ 3.4 × 10⁻⁶ M = \"3.4 × 10⁻⁶ M\"; √Kb = √(4.4 × 10⁻⁴) ≈ 2.1 × 10⁻² M = \"2.1 × 10⁻² M\".\n5. Check the approximation: 0.015 M ÷ 0.50 M = 3% ionized, under 5%, so dropping x from C − x was valid.\n6. Answer: [CH₃NH₃⁺] ≈ 1.5 × 10⁻² M.\n\n**Rule to reuse:** weak base of concentration C: [OH⁻] = [BH⁺] ≈ √(Kb × C). Use the constant of the species you start with; for a weak acid, √(Ka × C).",
      "id": "p_cpq4_2_q2"
     },
     {
      "q": "If the flask were filled with ethane, CH₃CH₃, instead of methylamine, the most likely result is that:",
      "choices": [
       "a fountain forms, since ethane dissolves as readily.",
       "no fountain forms, since nonpolar ethane is poorly soluble.",
       "a fountain forms, since ethane reacts with water.",
       "no fountain forms, since polar ethane stays a gas."
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe4-cp:19",
      "exp": "1. Translate the demonstration: the fountain forms because methylamine leaves the gas phase by dissolving in the few drops of water, so the pressure inside the flask drops below the outside air pressure.\n2. Link moles of gas to pressure at fixed V and T: PV = nRT → P ∝ n; methylamine dissolves: n(gas) ↓ → **P(inside) ↓**; P(outside) > P(inside) → air pressure on the beaker pushes water up the tube.\n3. Now judge ethane: its C–C and C–H bonds are nearly nonpolar and the molecule is symmetric, so ethane is nonpolar and barely dissolves in water. It is not polar and does not react with water, so \"a fountain forms, since ethane reacts with water.\" and \"no fountain forms, since polar ethane stays a gas.\" fail.\n4. Little ethane dissolves, so n(gas) and the pressure stay almost constant: **P(inside) ≈ P(outside)** → no fountain. \"a fountain forms, since ethane dissolves as readily.\" is wrong.\n5. Answer: no fountain forms, since nonpolar ethane is poorly soluble.\n\n**Rule to reuse:** a sealed container collapses only if its gas disappears (dissolves or reacts). Polar/H-bonding gases dissolve in water; nonpolar gases do not.",
      "id": "p_cpq4_2_q3"
     },
     {
      "q": "According to the passage, the ionization energies of metal X indicate its group and the ion it most likely forms:",
      "choices": [
       "Group 1; X⁺",
       "Group 2; X²⁺",
       "Group 13; X³⁺",
       "Group 14; X⁴⁺"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:20",
      "exp": "1. The passage gives four successive ionization energies; find where they break.\n2. Look at the 3rd and 4th values: both are far larger than the first two.\n3. Compare each step as a ratio: IE2 ÷ IE1 = 1145 ÷ 590 ≈ **1.9**; IE3 ÷ IE2 = 4912 ÷ 1145 ≈ **4.3** ← biggest break; IE4 ÷ IE3 = 6491 ÷ 4912 ≈ **1.3**.\n4. Two electrons come off before the break, so X has two valence electrons. One, three or four valence electrons do not fit, so \"Group 1; X⁺\", \"Group 13; X³⁺\" and \"Group 14; X⁴⁺\" are out.\n5. Answer: Group 2; X²⁺. These are calcium's values, and Ca(OH)₂ is a common base for releasing an amine from its salt.\n\n**Rule to reuse:** in successive ionization energies, count the electrons removed before the giant jump: that is the number of valence electrons and the ion's charge.",
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
    "title": "Engineering Bacteria to Make Indole",
    "passage": "Indole, a bicyclic aromatic compound that contributes to the scent of jasmine, is used in perfumes. A biotechnology group engineered Escherichia coli to make indole from glucose. In the engineered strain, a short linear pathway is active: enzyme TrpS converts a precursor into tryptophan, tryptophanase (TnaA) cleaves tryptophan to release indole, and a flavin monooxygenase (FmoA) oxidizes indole to indoxyl. Indoxyl reacts with O₂ from the air and dimerizes to indigo, a blue dye that stains both the culture and the product.\n\nTnaA requires the cofactor pyridoxal phosphate (PLP), whose aldehyde group forms an imine with the amino group of the substrate. To guide the design of a more active enzyme, the group solved a crystal structure of TnaA with a bound inhibitor. The inhibitor's protonated amino group, which carries a charge of +1 at pH 7, lies 2.9 Å from the side chain of one active-site residue, where the two form a salt bridge, while the inhibitor's indole ring is stacked parallel to the ring of a second residue at a distance of 3.6 Å.\n\nBecause the blue color appears quickly in cultures, the group also studied the nonenzymatic air oxidation of indoxyl. Figure 1 shows the free-energy profile they obtained for this step, from indoxyl and O₂ on the left, through the transition state, to the oxidized product on the right. Steps whose activation energy is under roughly 45 kJ/mol occur rapidly at 310 K.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Free energy along the reaction coordinate for the air oxidation of indoxyl",
     "x": {
      "label": "Reaction progress",
      "min": 0,
      "max": 10,
      "step": 2
     },
     "y": {
      "label": "Free energy (kJ/mol)",
      "min": 0,
      "max": 70,
      "step": 10
     },
     "series": [
      {
       "name": "Indoxyl oxidation",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         25
        ],
        [
         1,
         25
        ],
        [
         2,
         29
        ],
        [
         3,
         40
        ],
        [
         4,
         53
        ],
        [
         5,
         60
        ],
        [
         6,
         52
        ],
        [
         7,
         33
        ],
        [
         8,
         15
        ],
        [
         9,
         6
        ],
        [
         10,
         5
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "To accumulate indole in the engineered strain while eliminating the blue stain, researchers should knock out:",
      "choices": [
       "TnaA",
       "TrpS",
       "TrpS and FmoA",
       "FmoA"
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:41",
      "exp": "1. Write the pathway and the goal: precursor —TrpS→ tryptophan —TnaA→ **indole** —FmoA→ indoxyl → indigo; goal: keep **indole**, lose indoxyl and the blue indigo.\n2. Knocking out TrpS stops everything after the precursor: no tryptophan, indole or indoxyl. Losing the stain is good, but losing indole fails the goal, so \"TrpS\" and \"TrpS and FmoA\" are out.\n3. Knocking out TnaA stops indole itself from being made, so \"TnaA\" is out.\n4. Block the step right after the desired product. Indole is still made and has nowhere to go, so it builds up while indoxyl and indigo disappear. Answer: FmoA.\n\n**Rule to reuse:** to build up a compound in a chain, block the enzyme right after it. To remove a compound, block any step before it.",
      "id": "p_cpq4_3_q1"
     },
     {
      "q": "Which pair of residues is most consistent with the two inhibitor contacts seen in the TnaA crystal structure?",
      "choices": [
       "Lysine and phenylalanine",
       "Aspartate and phenylalanine",
       "Glutamate and asparagine",
       "Arginine and tryptophan"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:42",
      "exp": "1. A salt bridge pairs opposite charges. The inhibitor's +1 ammonium group needs a negative side chain: Asp or Glu.\n2. Lys and Arg are positive at pH 7, so they would repel the ammonium group; \"Lysine and phenylalanine\" and \"Arginine and tryptophan\" are out.\n3. Parallel stacking needs an aromatic ring: Phe, Tyr or Trp. Asn has none, so \"Glutamate and asparagine\" is out.\n4. Asp's carboxylate (−1) bridges the ammonium group, and Phe's benzene ring stacks with the indole ring. Answer: aspartate and phenylalanine.\n\n**Rule to reuse:** salt bridge to a negative group → Lys or Arg; to a positive group → Asp or Glu. Parallel ring stacking → Phe, Tyr or Trp.",
      "id": "p_cpq4_3_q2"
     },
     {
      "q": "TnaA catalyzes C₁₁H₁₂N₂O₂ (tryptophan, as a zwitterion) + H₂O → C₃H₃O₃⁻ (pyruvate) + NH₄⁺ + ___. What is the missing product?",
      "choices": [
       "C₈H₆N⁻",
       "C₈H₇N",
       "C₈H₈N⁺",
       "C₈H₉NO"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "M",
      "twin": "pe5-cp:43",
      "exp": "1. Count the reactants. Tryptophan zwitterion C₁₁H₁₂N₂O₂ (NH₃⁺ and COO⁻, charge 0) + H₂O: C: 11; H: 12 + 2 = 14; N: 2; O: 2 + 1 = 3; charge: **0**.\n2. Count the known products and subtract. C₃H₃O₃⁻ + NH₄⁺: C 3, H 3 + 4 = 7, N 1, O 3, charge −1 + 1 = 0. Missing = C 11 − 3 = 8; H 14 − 7 = 7; N 2 − 1 = 1; O 3 − 3 = 0; charge 0 − 0 = 0 → **C₈H₇N** (indole).\n3. No oxygen is left over, so \"C₈H₉NO\" (indole plus a water) cannot balance it. No charge is left over either: \"C₈H₆N⁻\" treats pyruvate as neutral pyruvic acid, C₃H₄O₃, and \"C₈H₈N⁺\" treats ammonium as neutral NH₃.\n4. Answer: C₈H₇N.\n\n**Rule to reuse:** to find a missing product, count every atom and the net charge on both sides; the difference is the missing species.",
      "id": "p_cpq4_3_q3"
     },
     {
      "q": "According to Figure 1 and the passage, how is the air oxidation of indoxyl best described?",
      "choices": [
       "Fast and spontaneous",
       "Slow and spontaneous",
       "Fast and nonspontaneous",
       "Slow and nonspontaneous"
      ],
      "ans": 0,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "X",
      "subj": "gen_chem",
      "twin": "pe5-cp:44",
      "exp": "1. Read the three key heights in Figure 1: reactants **25 kJ/mol**; transition state **60 kJ/mol**; products **5 kJ/mol**.\n2. Ea is the climb from the reactants to the peak. Compare it with the cutoff: Ea = 60 − 25 = **35 kJ/mol**; 35 < 45 → **fast**.\n3. Ea is low, so drop both slow choices, \"Slow and spontaneous\" and \"Slow and nonspontaneous\" (Reading Ea as the peak height itself, 60 kJ/mol, would wrongly make the step look slow.)\n4. The products end below the reactants: downhill overall. ΔG = 5 − 25 = **−20 kJ/mol**; ΔG < 0 → **spontaneous**, so \"Fast and nonspontaneous\" is out.\n5. Answer: fast and spontaneous, which fits the quick appearance of the blue color.\n\n**Rule to reuse:** Ea = peak − reactants (small Ea = fast). ΔG = products − reactants (negative = spontaneous). Always measure from the reactant level, never from zero.",
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
    "title": "Cytosine Protonation and DNA Triplexes",
    "passage": "A DNA triplex forms when a third strand made of pyrimidines lies in the major groove of a double helix and pairs with the purine strand through Hoogsteen hydrogen bonds. Thymine in the third strand pairs with the A of an A–T pair, but cytosine can pair with the G of a G–C pair only when its N3 is protonated (C⁺·G–C). The N3 pKa of free deoxycytidine is about 4.3; inside a triplex the apparent pKa is near 5.5, because nearby phosphate groups stabilize the cation. Methylation of cytosine at C5 raises the apparent pKa further, to about 6.0.\n\nCells also remove methylated cytosines from DNA. TET enzymes use O₂ to oxidize 5-methylcytosine to 5-hydroxymethylcytosine and then to 5-formylcytosine, and a DNA glycosylase then cuts the modified base away from its deoxyribose.\n\nIn Experiment 1, researchers followed the unfolding of two intramolecular triplexes, each a single strand that folds back on itself twice, by UV absorbance at pH 6.0. In Strand A the fifteen triplets form one continuous stack; in Strand B the same triplets are split into three stacks by additional flexible loops. Figure 1 plots the fraction of molecules folded against temperature.\n\nIn Experiment 2, a third intramolecular triplex, Strand C, was held at pH 7.0 and 25 °C, where few of its cytosines are protonated. At equilibrium, 80% of the Strand C molecules were unfolded.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Unfolding of Strands A and B at pH 6.0",
     "x": {
      "label": "Temperature (°C)",
      "min": 30,
      "max": 75,
      "step": 5
     },
     "y": {
      "label": "Fraction folded",
      "min": 0,
      "max": 1,
      "step": 0.2
     },
     "series": [
      {
       "name": "Strand A",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         30,
         1
        ],
        [
         40,
         1
        ],
        [
         45,
         0.99
        ],
        [
         48,
         0.97
        ],
        [
         50,
         0.9
        ],
        [
         51,
         0.75
        ],
        [
         52,
         0.5
        ],
        [
         53,
         0.25
        ],
        [
         54,
         0.1
        ],
        [
         56,
         0.02
        ],
        [
         60,
         0
        ],
        [
         75,
         0
        ]
       ]
      },
      {
       "name": "Strand B",
       "marker": "square",
       "line": "smooth",
       "points": [
        [
         30,
         0.99
        ],
        [
         35,
         0.96
        ],
        [
         39,
         0.9
        ],
        [
         44,
         0.77
        ],
        [
         48,
         0.64
        ],
        [
         52,
         0.5
        ],
        [
         56,
         0.36
        ],
        [
         60,
         0.23
        ],
        [
         65,
         0.1
        ],
        [
         70,
         0.03
        ],
        [
         75,
         0.01
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Enzyme 1 converts 5-hydroxymethylcytosine (–CH₂OH at C5) into 5-formylcytosine (–CHO) using O₂, and enzyme 2 uses water to release that base from deoxyribose. To which enzyme classes do enzymes 1 and 2 belong, respectively?",
      "choices": [
       "Hydrolase; oxidoreductase",
       "Oxidoreductase; ligase",
       "Oxidoreductase; hydrolase",
       "Transferase; ligase"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:40",
      "exp": "1. Compare the base before and after enzyme 1. The only change is at C5: –CH₂OH becomes –CHO. C₅H₇N₃O₂ → C₅H₅N₃O₂; change: **−2 H**; that carbon's oxidation state goes from −1 to **+1**, so it is oxidized, with O₂ as the oxidant → **oxidoreductase**.\n2. Nothing was moved from a donor and no water was added in step 1, so enzyme 1 is not a transferase or a hydrolase: \"Hydrolase; oxidoreductase\" and \"Transferase; ligase\" are out.\n3. Look at enzyme 2: 5-formyl-deoxycytidine in DNA + H₂O → free 5-formylcytosine + a sugar left on the backbone. One molecule becomes two, and water is consumed.\n4. A ligase joins two molecules using ATP; here a bond is broken by water, so \"Oxidoreductase; ligase\" is out. Enzyme 2 is a **hydrolase** (a glycosylase).\n5. Answer: oxidoreductase; hydrolase.\n\n**Rule to reuse:** spot the change between two structures, then name it: a group moved from a donor = transferase; C gains O or loses H (often with O₂, NAD⁺ or FAD) = oxidoreductase; water splits one molecule into two = hydrolase; two molecules joined using ATP = ligase.",
      "id": "p_cpq4_4_q1"
     },
     {
      "q": "For the unfolding of Strand C in Experiment 2 (F ⇌ U, where F is folded and U is unfolded), which expression gives ΔG°′, and what is its sign?",
      "choices": [
       "−RT ln([F]/[U]); positive",
       "−RT ln([U]/[F]); positive",
       "−RT ln([U]/[F]); negative",
       "+RT ln([U]/[F]); negative"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe3-cp:41",
      "exp": "1. Write K for the process as written, products over reactants: F ⇌ U; K = **[U]/[F]**; ΔG°′ = −RT ln K = −RT ln([U]/[F]). \"−RT ln([F]/[U]); positive\" builds K for folding, the reverse direction.\n2. Plug in the measured fractions: K = 80/20 = **4.0**; ln 4.0 = **+1.39**.\n3. Compute ΔG°′: −RT × (positive number) is negative. RT = 8.314 × 298 = **2478 J/mol**; ΔG°′ = −(2478)(1.39) ≈ **−3.4 kJ/mol**. So \"−RT ln([U]/[F]); positive\" has the wrong sign, and \"+RT ln([U]/[F]); negative\" drops the minus sign, which would make the value positive, not negative.\n4. Answer: −RT ln([U]/[F]); negative. More than half unfolded means K > 1 and ΔG°′ < 0: at pH 7.0, with few protonated cytosines, the unfolded form is favored.\n\n**Rule to reuse:** ΔG° = −RT ln K, with K = products/reactants as written. K < 1 → ΔG° positive (reactants favored); K > 1 → negative.",
      "id": "p_cpq4_4_q2"
     },
     {
      "q": "Based on Figure 1, which strand unfolds more cooperatively, and why?",
      "choices": [
       "Strand B, since it melts over a wider range",
       "Both equally, since they share the same Tm",
       "Strand B, since it begins melting at a lower temperature",
       "Strand A, since it melts over a narrower range"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 4",
      "diff": "X",
      "twin": "pe3-cp:42",
      "exp": "1. Read the midpoint of each curve, where fraction folded = 0.5: Tm of Strand A = **52 °C**; Tm of Strand B = **52 °C**. Same midpoint → same stability, not same cooperativity.\n2. Sharing a midpoint says nothing about how sharp each transition is, so \"Both equally, since they share the same Tm\" is out.\n3. Measure the width of Strand A's transition, from 0.9 to 0.1 folded: 0.90 at 50 °C → 0.10 at 54 °C; width ≈ **4 °C**.\n4. Measure Strand B's width the same way: 0.90 at 39 °C → 0.10 at 65 °C; width ≈ **26 °C**.\n5. A wide, gradual transition is the less cooperative one; starting earlier is not itself a measure of cooperativity, so both Strand B choices are out. The loops in Strand B let its three segments unfold separately.\n6. Answer: Strand A, since it melts over a narrower range.\n\n**Rule to reuse:** on an unfolding curve, the midpoint (Tm, 0.5) = stability; the steepness (narrow 0.9 → 0.1 width) = cooperativity. Read them separately.",
      "id": "p_cpq4_4_q3"
     },
     {
      "q": "At pH 6.5, how does a triplex whose third-strand cytosines are all 5-methylcytosine compare in stability with one whose third-strand cytosines are unmodified?",
      "choices": [
       "Less stable, because fewer of its cytosines are protonated",
       "More stable, because more of its cytosines are protonated",
       "Less stable, because more of its cytosines are protonated",
       "Unchanged, because pKa does not affect its stability"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:43",
      "exp": "1. The triplex depends on protonated cytosines (C⁺·G–C).\n2. Compare pH with each apparent pKa: unmodified: pH − pKa = 6.5 − 5.5 = 1.0; methylated: pH − pKa = 6.5 − 6.0 = **0.5** → closer to its pKa → **more protonated**. Fraction protonated = 1 ÷ (1 + 10^(pH − pKa)): 1 ÷ 11 ≈ 0.09 versus 1 ÷ 4.2 ≈ 0.24.\n3. A higher pKa means more readily protonated, so the \"fewer of its cytosines are protonated\" choice is backwards; \"Less stable, because more of its cytosines are protonated\" pairs the right protonation with the wrong outcome; and protonation is exactly what this structure needs, so \"Unchanged, because pKa does not affect its stability\" fails.\n4. Answer: more stable, because more of its cytosines are protonated.\n\n**Rule to reuse:** lowering a group's pKa makes it less protonated at a given pH; if a structure needs that protonated form, it becomes less stable.",
      "id": "p_cpq4_4_q4"
     },
     {
      "q": "A single-stranded DNA used to build a triplex target has the base composition A 38%, G 47%, C 15%, T 0%. After its complementary strand is made, which nucleoside is absent from the new strand, and what percentage of it is deoxycytidine?",
      "choices": [
       "Deoxythymidine; 15%",
       "Deoxyadenosine; 15%",
       "Deoxyguanosine; 38%",
       "Deoxyadenosine; 47%"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "biology",
      "twin": "pe3-cp:44",
      "exp": "1. This is ONE strand, so Chargaff's A = T, G = C does not apply within it. Use base pairing to build the other strand.\n2. Each template base dictates its partner in the new strand: template A **38%** → complement T **38%**; template G **47%** → complement C **47%**; template C **15%** → complement G **15%**; template T **0%** → complement A **0%**.\n3. Read the complement: C is 47% and A is absent. \"Deoxythymidine; 15%\" copies the template's missing base instead of pairing it, \"Deoxyadenosine; 15%\" copies the template's C value, and \"Deoxyguanosine; 38%\" pairs the wrong bases.\n4. The missing base is adenine (its nucleoside is deoxyadenosine), and deoxycytidine is 47%.\n5. Answer: deoxyadenosine is absent; deoxycytidine is 47%.\n\n**Rule to reuse:** to build the partner strand, swap A↔T and G↔C: partner %G = template %C, partner %T = template %A, and so on.",
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
    "title": "Rechargeable Aqueous Zinc Batteries",
    "passage": "Rechargeable aqueous zinc batteries are being developed as a safer, nonflammable alternative to lithium-ion cells for storing electricity on the power grid. A typical cell has a zinc-metal anode, a cathode of manganese dioxide (MnO₂) coated on carbon paper, and an aqueous solution of zinc chloride between the electrodes. During discharge, zinc is oxidized at the anode (Zn → Zn²⁺ + 2e⁻) and MnO₂ is reduced at the cathode. The cathode half-reaction has a standard reduction potential of +1.23 V, and the cell has a standard potential of 1.99 V.\n\nFor dilute test solutions, a research group used a 6.0 mM ZnCl₂ stock solution. Each cathode carried a 6.00 mg coating that was 75% MnO₂ (86.94 g/mol; Mn, 54.94 g/mol; O, 16.00 g/mol) by mass, the rest being carbon black and a polymer binder.\n\nA known problem with zinc anodes is the growth of needle-like zinc deposits during charging, which can pierce the separator and short the cell. The group tested the amino acid histidine as an electrolyte additive, because the imidazole side chain binds Zn²⁺ through the lone pair on a ring nitrogen and helps zinc deposit smoothly. Histidine's pKa values are 1.8 (α-COOH), 6.0 (imidazolium side chain), and 9.2 (α-NH₃⁺). The additive worked well in near-neutral electrolyte, but it stopped binding Zn²⁺ when the electrolyte became acidic, near pH 5.0.",
    "questions": [
     {
      "q": "How many moles of chloride ions are present in a 2.5 mL aliquot of the ZnCl₂ stock solution?",
      "choices": [
       "15 μmol",
       "30 μmol",
       "300 μmol",
       "30 mmol"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:38",
      "exp": "1. Convert both quantities to SI units: 6.0 mM = **6.0 × 10⁻³ mol/L**; 2.5 mL = **2.5 × 10⁻³ L**.\n2. Multiply concentration by volume: n(ZnCl₂) = 6.0 × 10⁻³ × 2.5 × 10⁻³ = **1.5 × 10⁻⁵ mol** = **15 μmol**.\n3. Each ZnCl₂ gives two Cl⁻ ions: 2 × 15 μmol = **30 μmol**. \"15 μmol\" counts the formula units (or the Zn²⁺ ions), not the chloride ions.\n4. \"300 μmol\" and \"30 mmol\" come from slipping a factor of 10 or skipping the mL → L conversion (6.0 × 10⁻³ × 2.5 × 2 = 0.030 mol).\n5. Answer: 30 μmol of Cl⁻.\n\n**Rule to reuse:** moles = M × V with M in mol/L and V in L; then multiply by how many of that ion one formula unit gives.",
      "id": "p_cpq4_5_q1"
     },
     {
      "q": "About what mass of manganese does one cathode coating contain?",
      "choices": [
       "2.84 mg",
       "3.49 mg",
       "3.79 mg",
       "4.50 mg"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:39",
      "exp": "1. Find the oxide mass: 0.75 × 6.00 mg = **4.50 mg** MnO₂.\n2. Find manganese's share of MnO₂: one Mn per formula unit: 54.94 ÷ 86.94 ≈ **0.632**.\n3. Multiply: 4.50 mg × 0.632 ≈ **2.84 mg** Mn.\n4. \"3.79 mg\" skips the 75% (6.00 × 0.632); \"4.50 mg\" is the oxide, not the manganese; \"3.49 mg\" counts only one O atom (54.94 ÷ 70.94 ≈ 0.774; 4.50 × 0.774 ≈ 3.49).\n5. Answer: about 2.84 mg of manganese.\n\n**Rule to reuse:** mass of an element = sample mass × fraction that is the compound × (atoms × atomic mass ÷ molar mass); apply every fraction in turn.",
      "id": "p_cpq4_5_q2"
     },
     {
      "q": "Based on the passage, what is the standard reduction potential of the anode half-reaction in the zinc cell?",
      "choices": [
       "+1.99 V",
       "+0.76 V",
       "−0.76 V",
       "−1.23 V"
      ],
      "ans": 2,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:41",
      "exp": "1. Write the rule: E°cell = E°cathode − E°anode, both as reduction potentials.\n2. Substitute and solve: 1.99 = 1.23 − E°anode; E°anode = 1.23 − 1.99 = **−0.76 V**.\n3. Picture it: the anode sits 1.99 V below the cathode on the reduction-potential scale.\n4. \"+1.99 V\" is the cell value; \"+0.76 V\" subtracts the cathode from the cell value (1.99 − 1.23); \"−1.23 V\" just flips the cathode sign.\n5. Answer: −0.76 V, the standard reduction potential of Zn²⁺/Zn.\n\n**Rule to reuse:** E°cell = E°cathode − E°anode, using reduction potentials for both. Never flip a sign yourself.",
      "id": "p_cpq4_5_q3"
     },
     {
      "q": "Which form of free histidine predominates in the electrolyte at pH 5.0, where its Zn²⁺ binding is lost?",
      "choices": [
       "All groups protonated, net +2",
       "Protonated imidazole, net +1",
       "Uncharged imidazole, net 0",
       "Free NH₂ group, net −1"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "X",
      "subj": "organic_chem",
      "twin": "pe6-cp:42",
      "exp": "1. Use the pKa list and compare 5.0 with each value: α-COOH: 5.0 > 1.8 → **COO⁻**; imidazolium: 5.0 < 6.0 → **protonated ring (+)**; α-NH₃⁺: 5.0 < 9.2 → **NH₃⁺**; net charge: −1 + 1 + 1 = **+1**.\n2. The matching form has one COO⁻, a protonated imidazolium side chain and NH₃⁺.\n3. An uncharged imidazole with net 0 is the form above pH 6.0, the one that binds Zn²⁺; all groups protonated (net +2) needs pH below 1.8. So \"Uncharged imidazole, net 0\" and \"All groups protonated, net +2\" are out.\n4. A free NH₂ needs pH above 9.2, so \"Free NH₂ group, net −1\" is out.\n5. Answer: protonated imidazole, net +1. The protonated ring nitrogen has no free lone pair, which is why Zn²⁺ is released.\n\n**Rule to reuse:** pH below pKa → the group keeps its H⁺ (protonated form); pH above pKa → it has lost the H⁺.",
      "id": "p_cpq4_5_q4"
     },
     {
      "q": "What is the function of the aqueous ZnCl₂ solution between the two electrodes?",
      "choices": [
       "It is oxidized at the zinc anode",
       "It is reduced at the MnO₂ cathode",
       "It carries Zn²⁺ ions within the cell",
       "It carries electrons within the cell"
      ],
      "ans": 2,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:43",
      "exp": "1. Translate: a salt dissolved in water between the electrodes is an electrolyte, a medium of mobile ions (Zn²⁺ and Cl⁻).\n2. Electrons cannot travel through an ionic solution; they go through the external wire, so \"It carries electrons within the cell\" is out.\n3. Oxidation and reduction happen to the electrode materials, zinc metal and MnO₂, not to the dissolved salt, so \"It is oxidized at the zinc anode\" and \"It is reduced at the MnO₂ cathode\" are out.\n4. Charge balance: the charge passing through the wire is matched by ions moving in the electrolyte (Zn²⁺ toward the cathode, Cl⁻ toward the anode). For example, 0.50 A for 1.0 h moves 1800 C, about **0.019 mol** of electrons through the wire and the same charge carried by ions inside.\n5. Answer: it carries Zn²⁺ ions inside the cell, completing the circuit between the electrodes.\n\n**Rule to reuse:** a dissolved salt between electrodes is the electrolyte; it carries ions, never electrons, and is not itself oxidized or reduced.",
      "id": "p_cpq4_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "A stationary sonar buoy pings a whale swimming directly away from it and uses the Doppler shift of the echo to find the whale's speed. Which quantities must be known or measured?",
    "choices": [
     "The sent and echo frequencies and the speed of sound in seawater",
     "The sent frequency and the whale's distance",
     "The whale's speed, the speed of sound, and its distance",
     "The wavelength in air and the pulse energy"
    ],
    "ans": 0,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "twin": "sample-cp:27",
    "exp": "1. Identify the unknown: the whale's speed.\n2. List what the Doppler shift depends on: inputs: f(sent), f(echo), v(sound in seawater); unknown: v(whale).\n3. The whale's speed is the answer, not an input. Its distance and the pulse energy do not enter the Doppler shift, and the sound travels in seawater, not air. So \"The whale's speed, the speed of sound, and its distance\", \"The sent frequency and the whale's distance\" and \"The wavelength in air and the pulse energy\" are out.\n4. Answer: both frequencies (sent and received) and the speed of sound in seawater.\n\n**Rule to reuse:** to get an object's speed from a Doppler shift, you need the emitted and received frequencies and the wave speed in the medium; the object's speed is the output.",
    "id": "cp_q4_sa1"
   },
   {
    "q": "A biomedical engineer reports a dialysis pump's mechanical output in several unit expressions. Which unit expression can NOT be a unit of power?",
    "choices": [
     "J/s",
     "Pa·L/min",
     "kW·h",
     "cal/s"
    ],
    "ans": 2,
    "cat": "4A",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "physics",
    "twin": "pe1-cp:59",
    "exp": "1. Power = energy ÷ time = J/s, and a joule in base units is kg·m²·s⁻². J = N·m = kg·m·s⁻² × m = **kg·m²·s⁻²**; W = J/s = **kg·m²·s⁻³**.\n2. Test each choice: J/s → power ✓; cal/s = energy ÷ time → power ✓; Pa·L = pressure × volume = energy → per minute = power ✓; kW·h = (J/s) × s = **J** → energy only ✗. So \"J/s\", \"Pa·L/min\" and \"cal/s\" are all power units.\n3. The odd one out has no 'per time'. Answer: kW·h, a unit of energy (1 kW·h = 3.6 × 10⁶ J).\n\n**Rule to reuse:** reduce units to kg, m, s. Energy = kg·m²·s⁻²; power = kg·m²·s⁻³ (one more ÷ s). Pressure × volume = energy.",
    "id": "cp_q4_sa2"
   },
   {
    "q": "In a mountain town where air pressure is 9.0 × 10⁴ Pa, a pipe closed at the top stands with its open end in a brine pond (ρ = 1250 kg/m³), and the air inside is pumped out. Fresh water has ρ = 1000 kg/m³; g = 10 m/s². To what maximum height can the brine rise?",
    "choices": [
     "0.14 m",
     "7.2 m",
     "9.0 m",
     "72 m"
    ],
    "ans": 1,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe3-cp:58",
    "exp": "1. With vacuum above the brine, nothing pushes down from the top. The column rises until its own pressure at the base equals the air pressure: P_top = **0**; ρ_brine g h = P_atm.\n2. Solve for h: h = P_atm ÷ (ρg) = 9.0 × 10⁴ Pa ÷ (**1250** kg/m³ × **10** m/s²) = 9.0 × 10⁴ ÷ 1.25 × 10⁴ = **7.2 m**. Forgetting g gives 9.0 × 10⁴ ÷ 1250 = \"72 m\"; flipping the ratio gives 1.25 × 10⁴ ÷ 9.0 × 10⁴ ≈ \"0.14 m\".\n3. The fresh-water density is for a different fluid: 9.0 × 10⁴ ÷ (1000 × 10) = **9.0 m**, the height a fresh-water column would reach, not the brine. So \"9.0 m\" is out.\n4. Answer: 7.2 m.\n\n**Rule to reuse:** a liquid column rises until ρgh = the pressure pushing it, so h = P/(ρg). One atmosphere holds up about 10 m of water.",
    "id": "cp_q4_sa3"
   },
   {
    "q": "Five period-3 elements melt at these temperatures: Na 98 °C; Al 660 °C; Si 1414 °C; S 115 °C; Cl₂ −102 °C. Which element is a covalent network solid in its standard state, and why?",
    "choices": [
     "Sulfur, since its S₈ rings are strongly bonded",
     "Aluminum, since it melts above 600 °C",
     "Silicon, since covalent bonds link every atom",
     "Chlorine, since Cl–Cl bonds join its atoms"
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "E",
    "subj": "gen_chem",
    "twin": "pe3-cp:59",
    "exp": "1. Compare the melting points: silicon, at 1414 °C, is far above everything else.\n2. Sulfur (S₈ rings) and chlorine (Cl₂) are small discrete molecules. Melting breaks only weak London forces between molecules, not the strong S–S or Cl–Cl bonds inside each one, so \"Sulfur, since its S₈ rings are strongly bonded\" and \"Chlorine, since Cl–Cl bonds join its atoms\" are out.\n3. Na and Al are metals: their atoms are held by delocalized electrons (metallic bonding), not directional covalent bonds, so a fairly high melting point does not make aluminum a network solid. \"Aluminum, since it melts above 600 °C\" is out.\n4. Answer: silicon, since covalent bonds link every atom: each Si atom is covalently bonded to four neighbors in a diamond-like lattice, so melting means breaking covalent bonds.\n\n**Rule to reuse:** very high melting point + nonmetal (C, Si, SiO₂) → covalent network. Strong bonds inside small molecules (S₈, Cl₂) don't raise the melting point.",
    "id": "cp_q4_sa4"
   },
   {
    "q": "Green laser light (λ = 532 nm) strikes a flat glass plate (n = 1.5) at 56° from the normal. As the laser is turned about its own beam axis, the spot it reflects onto a screen 1.5 m away fades almost to dark twice per turn. The fading is primarily caused by:",
    "choices": [
     "Diffraction",
     "Refraction",
     "Polarization",
     "Reflection"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe4-cp:46",
    "exp": "1. Translate: the spot's brightness depends on how the laser is turned about its own beam, not on where the light lands. That points to the orientation of the light's electric field.\n2. Check the angle: tan θ = n gives the Brewster angle, tan⁻¹(1.5) ≈ **56°**, the angle given.\n3. At the Brewster angle, light whose field lies in the plane of incidence is not reflected at all. Laser light is linearly polarized, so twice per turn its field lines up with that plane and the reflected spot nearly vanishes.\n4. Reflection makes the spot but does not by itself make it fade as the laser turns; refraction only bends the transmitted beam; diffraction needs a gap or edge close to λ in size. So \"Reflection\", \"Refraction\" and \"Diffraction\" are out.\n5. Answer: polarization of the laser light, reflected at the Brewster angle.\n\n**Rule to reuse:** brightness that changes as a source or filter is rotated about the beam = polarization. Brewster angle: tan θ_B = n₂/n₁; light reflected there is fully polarized.",
    "id": "cp_q4_sa5"
   },
   {
    "q": "A narrow glass tube 1.0 cm across and an aquarium 80 cm across are both open to the air and filled with seawater to well over 30 cm. How does the absolute pressure 30 cm below the surface in the aquarium compare with that in the tube?",
    "choices": [
     "Equal, since both are open to the air",
     "Greater in the aquarium, since more water lies above the point",
     "Greater in the tube, since the weight acts on a smaller area",
     "Equal, since the liquid and depth are the same"
    ],
    "ans": 3,
    "cat": "4B",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "physics",
    "twin": "pe5-cp:9",
    "exp": "1. In a fluid at rest, pressure depends on how deep the point is below the open surface, not on how much fluid the container holds.\n2. Compute the pressure 30 cm down in either container: P = P_atm + ρgh; ρgh = 1025 × 9.8 × **0.30 m** ≈ **3.0 kPa**; P ≈ 101.3 + 3.0 ≈ **104.3 kPa** in both.\n3. Both points fall on the same pressure–depth line, whatever the container's width or volume.\n4. Volume and width do not appear in ρgh. The aquarium holds more water, but its weight is spread over a proportionally larger area, so \"Greater in the aquarium, since more water lies above the point\" and \"Greater in the tube, since the weight acts on a smaller area\" are out.\n5. Being open to the air is needed but not enough: open containers at different depths still differ, so \"Equal, since both are open to the air\" gives an incomplete reason. Answer: equal, since the liquid and depth are the same.\n\n**Rule to reuse:** pressure in a still liquid depends only on ρ, g and depth h (P = P_atm + ρgh). Tank shape, width and total volume never change it.",
    "id": "cp_q4_sa6"
   },
   {
    "q": "A jeweler holds a gemstone 4.0 cm from a converging magnifier whose focal length is 5.0 cm. What is the ratio of image height to object height, and how is the image oriented?",
    "choices": [
     "1:5, upright",
     "5:9, inverted",
     "5:1, inverted",
     "5:1, upright"
    ],
    "ans": 3,
    "cat": "4D",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "physics",
    "twin": "pe1-cp:45",
    "exp": "1. Find the image distance: 1/i = 1/f − 1/o = 1/5.0 − 1/4.0 = (4 − 5)/20 = −1/20, so **i = −20 cm**. The negative sign means a virtual image on the gem's side of the lens.\n2. Magnification: m = −i/o = −(−20)/4.0 = **+5.0**. The size is 5.0 times the gem's, and the positive sign means **upright**.\n3. \"5:1, inverted\" drops the sign of i. \"1:5, upright\" divides o by i. \"5:9, inverted\" adds 1/f and 1/o (i ≈ 2.2 cm).\n4. Answer: 5:1, upright. An object inside the focal length of a converging lens always gives an enlarged, upright, virtual image.\n\n**Rule to reuse:** object inside f → i negative → m positive and greater than 1: a magnifier's image is virtual, upright and enlarged.",
    "id": "cp_q4_sa7"
   },
   {
    "q": "Polonium-210 (Z = 84), found in trace amounts in tobacco smoke, decays by alpha emission. What is the daughter nucleus?",
    "choices": [
     "²⁰⁶Pb",
     "²⁰⁶Rn",
     "²⁰⁸At",
     "²⁰⁸Bi"
    ],
    "ans": 0,
    "cat": "4E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "physics",
    "twin": "pe6-cp:58",
    "exp": "1. Write what an alpha particle removes: a ⁴He nucleus, 2 protons and 2 neutrons.\n2. Balance mass number and atomic number: ²¹⁰₈₄Po → ⁴₂He + ᴬ_Z X; A = 210 − 4 = **206**; Z = 84 − 2 = **82** → **Pb**.\n3. Mass number 208 subtracts only 2; Rn (Z 86) adds protons instead of removing them; At (Z 85) and Bi (Z 83) change Z by only 1. So \"²⁰⁶Rn\", \"²⁰⁸At\" and \"²⁰⁸Bi\" are out.\n4. Answer: ²⁰⁶Pb.\n\n**Rule to reuse:** alpha decay → mass number − 4 and Z − 2; beta-minus → Z + 1 with mass unchanged. Then read the element from Z.",
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
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "4D",
     "4A"
    ],
    "title": "Measuring Thigh Blood Flow During Cycling with Oxygen-15 Water",
    "passage": "Oxygen-15 is a short-lived radionuclide made in a cyclotron. It decays by β⁺ emission to nitrogen-15. The charged particle released in each decay travels only a few millimeters through tissue before it is annihilated, producing two gamma photons that leave in opposite directions, and a ring of detectors in a positron emission tomography (PET) scanner records these photon pairs. Water labeled with oxygen-15 crosses capillary walls freely, so the rate at which it accumulates in a muscle reports how much blood flows through that muscle.\n\nResearchers measured blood flow in the thigh muscles of healthy volunteers at rest and during cycling. Each volunteer pedaled a stationary ergometer against a constant load, and the ergometer displayed the mechanical power delivered to the pedals. A dose of oxygen-15 water was then injected into an arm vein. Because the isotope decays so quickly, each dose was drawn from the production line and checked in a calibrated well counter just before use. Table 1 shows readings of one dose taken at intervals after it was drawn.\n\nUltrasound was used during the same sessions. Pulse-echo images located the femoral artery and the tissue layers above it, and a separate probe measured how fast red blood cells moved through the artery. Together with the PET data, these measurements let the researchers compare the flow arriving in the thigh with the flow taken up by each muscle.",
    "figure": {
     "caption": "Table 1 Activity of one dose of oxygen-15 water after it was drawn",
     "columns": [
      "Time after drawing (min)",
      "Activity (MBq)"
     ],
     "rows": [
      [
       "0",
       "960"
      ],
      [
       "2",
       "480"
      ],
      [
       "4",
       "240"
      ],
      [
       "6",
       "120"
      ],
      [
       "8",
       "60"
      ]
     ]
    },
    "questions": [
     {
      "q": "Based on Table 1, what is the half-life of oxygen-15?",
      "choices": [
       "1 min",
       "2 min",
       "4 min",
       "8 min"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "sample-cp:53",
      "exp": "1. Read the first halving: 960 → 480 MBq takes 0 → 2 min, so t½ = **2 min**.\n2. Check that every 2 min halves it again: 480 → 240 MBq (2 → 4 min), 240 → 120 MBq (4 → 6 min) and 120 → 60 MBq (6 → 8 min) each take **2 min**.\n3. 4 min is two half-lives (25% left), 8 min is four (about 6% left), and 1 min is shorter than any halving step in the data, so \"4 min\", \"8 min\" and \"1 min\" are out.\n4. Answer: 2 min.\n\n**Rule to reuse:** the half-life is the time between any value and half that value; constant halving intervals confirm it.",
      "id": "p_cpq5_1_q1"
     },
     {
      "q": "In the decay of oxygen-15 described in the passage, which emitted particle carries an electric charge?",
      "choices": [
       "Electron, e⁻",
       "Neutrino, ν",
       "Positron, e⁺",
       "Photon, γ"
      ],
      "ans": 2,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "M",
      "twin": "sample-cp:54",
      "exp": "1. The passage says oxygen-15 decays by β⁺ emission, and the question asks for the charged particle it emits.\n2. Write the decay and balance the charge: ¹⁵O → ¹⁵N + e⁺ + ν, which inside the nucleus is p → n + e⁺ + ν; charge: +1 → 0 + (+1) + 0, so the charged product is **e⁺, a positron**.\n3. An electron is emitted in β⁻ decay, not β⁺. Neutrinos and gamma photons carry no charge, so \"Electron, e⁻\", \"Neutrino, ν\" and \"Photon, γ\" are out.\n4. Answer: Positron, e⁺.\n\n**Rule to reuse:** the sign in β± is the sign of the emitted particle: β⁺ emits a positron, β⁻ emits an electron.",
      "id": "p_cpq5_1_q2"
     },
     {
      "q": "Which quantity measured during cycling required the Doppler ultrasound probe rather than pulse-echo imaging?",
      "choices": [
       "Artery diameter",
       "Artery depth",
       "Thigh fat thickness",
       "Red-cell velocity"
      ],
      "ans": 3,
      "cat": "4D",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "sample-cp:55",
      "exp": "1. Find the measurement that ordinary pulse-echo imaging cannot make.\n2. Classify each measurement: artery diameter → echo timing; artery depth → echo timing; thigh fat thickness → echo timing; red-cell velocity → motion → **Doppler frequency shift**.\n3. Diameter, depth and thickness are all distances mapped from echo timing, so \"Artery diameter\", \"Artery depth\" and \"Thigh fat thickness\" are out.\n4. Answer: red-cell velocity.\n\n**Rule to reuse:** echo timing maps where things are; the Doppler frequency shift measures how fast they move.",
      "id": "p_cpq5_1_q3"
     },
     {
      "q": "One volunteer pedaled at a steady 90 W for 5.0 minutes before an injection. How much work did the volunteer do on the pedals?",
      "choices": [
       "27,000 J",
       "450 J",
       "18 J",
       "0.30 J"
      ],
      "ans": 0,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "M",
      "twin": "sample-cp:56",
      "exp": "1. Convert the time to seconds: 5.0 min × 60 s/min = **300 s**.\n2. Multiply power by time: W = P × t = 90 J/s × 300 s = **27,000 J**.\n3. 450 J uses 5.0 instead of 300 s. 0.30 J divides 90 by 300, and 18 J divides 90 by 5.0.\n4. Answer: 27,000 J.\n\n**Rule to reuse:** W = P × t with t in seconds; convert minutes to seconds before multiplying.",
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
    "title": "A Competitive Inhibitor of a Fungal Protease",
    "passage": "Compound L (molar mass 360 g/mol) is a reversible inhibitor of a protease secreted by a pathogenic fungus. L contains a benzene ring and a primary alcohol group, –CH₂OH. It binds only the free enzyme, in its active site, in a single step: E + L ⇌ EL. The dissociation constant of this complex, Kd = [E][L]/[EL], is therefore also the inhibition constant Ki of a competitive inhibitor; at 25 °C and pH 7.4 it is 20 μM.\n\nIn Experiment 1, a fixed amount of enzyme was titrated with L at 25 °C, and the share of the enzyme bound as EL was measured after each addition. The bound fraction rose from 0.20 at 5 μM L to 0.83 at 100 μM L, while the Kd calculated from every point was 20 ± 1 μM. In Experiment 2, the initial rate of the enzyme was measured with its substrate at [S] = Km, both without L and with L at several concentrations.\n\nL dissolves poorly in water, which limits the dose that can be given. Chemists therefore prepared four analogs, each differing from L by a single change (Table 1), and planned to compare their solubilities in pH 7.4 buffer with that of L.",
    "figure": {
     "caption": "Table 1 Compound L and four analogs",
     "columns": [
      "Compound",
      "Change from L",
      "Molar mass (g/mol)"
     ],
     "rows": [
      [
       "L",
       "—",
       "360"
      ],
      [
       "Analog A",
       "ring C–H → C–Br",
       "439"
      ],
      [
       "Analog B",
       "–CH₂OH → –CH₂OCH₂CH₃",
       "388"
      ],
      [
       "Analog C",
       "ring C–H → ring N",
       "361"
      ],
      [
       "Analog D",
       "ring C–H → C–CH₂CH₃",
       "388"
      ]
     ]
    },
    "questions": [
     {
      "q": "A stock for Experiment 2 needs 200.0 mL of 25 μM Compound L in a buffer of density 1.01 g/mL. About what mass of L should be weighed out?",
      "choices": [
       "0.18 mg",
       "1.8 mg",
       "9.0 mg",
       "1.8 g"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe5-cp:1",
      "exp": "1. Translate: you need the moles of L in the final volume, then the mass. Molarity counts moles per liter of solution.\n2. Convert both units before multiplying: 25 μM = 25 × 10⁻⁶ mol/L = **2.5 × 10⁻⁵ M**; 200.0 mL ÷ 1000 = **0.2000 L**.\n3. Moles = molarity × volume in liters: n = 2.5 × 10⁻⁵ mol/L × 0.2000 L = **5.0 × 10⁻⁶ mol**.\n4. Mass = moles × molar mass (Table 1): m = 5.0 × 10⁻⁶ mol × 360 g/mol = **1.8 × 10⁻³ g = 1.8 mg**.\n5. Eliminate the unit slips: 9.0 mg uses 1 L instead of 0.2000 L (2.5 × 10⁻⁵ × 360 = 9.0 × 10⁻³ g), 0.18 mg drops a factor of 10, and 1.8 g reads μM as mM.\n6. Answer: 1.8 mg. The density is a distractor; molarity already gives moles per liter of solution.\n\n**Rule to reuse:** mass to weigh = molarity (mol/L) × volume (L) × molar mass (g/mol). Convert μ, m and mL to plain units first; ignore the solvent's density.",
      "id": "p_cpq5_2_q1"
     },
     {
      "q": "In Experiment 1, adding L raised the fraction of enzyme bound while Kd stayed the same. Consistent with this result, when L is added, the binding equilibrium:",
      "choices": [
       "shifts toward free E, and Kd rises.",
       "shifts toward EL, and Kd falls.",
       "does not shift, since Kd is fixed.",
       "shifts toward EL, and Kd is unchanged."
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:2",
      "exp": "1. Two observations: more enzyme ends up as EL, and Kd does not change. The right answer must fit both.\n2. Write the equilibrium and compare Q with Kd right after L is added: E + L ⇌ EL; Kd = [E][L]/[EL]; adding L makes Q = [E][**L↑**]/[EL] > Kd; to restore Kd, E + L → EL, a **shift toward EL**.\n3. The data show the bound fraction climbing from 0.20 at 5 μM L to 0.83 at 100 μM L while Kd stays at 20 μM: the composition changes, the constant does not.\n4. Eliminate choices that contradict the data: Kd did not fall, and the bound fraction did change, so \"shifts toward EL, and Kd falls.\" and \"does not shift, since Kd is fixed.\" are out.\n5. Answer: the equilibrium shifts toward EL, and Kd is unchanged, because added L is a stress the system partly uses up (Le Châtelier). \"shifts toward free E, and Kd rises.\" has the wrong direction.\n\n**Rule to reuse:** adding a reactant shifts an equilibrium toward products (Le Châtelier), but K itself stays put unless the temperature changes.",
      "id": "p_cpq5_2_q2"
     },
     {
      "q": "Based on Table 1, which analog is most likely to be more soluble in water than Compound L?",
      "choices": [
       "Analog A",
       "Analog B",
       "Analog C",
       "Analog D"
      ],
      "ans": 2,
      "cat": "5B",
      "skill": "SIRS 4",
      "diff": "X",
      "twin": "pe5-cp:3",
      "exp": "1. Every analog is compared with L, so first find in Table 1 what changed in each.\n2. Score each change by the H-bond sites it adds or removes: Analog A, ring C–H → C–Br: **0**, more nonpolar surface; Analog B, –CH₂OH → –CH₂OCH₂CH₃: **−1 donor**, plus two carbons; Analog C, ring C–H → ring N: **+1 acceptor**; Analog D, ring C–H → C–CH₂CH₃: **0**, more nonpolar surface.\n3. A ring Br or ethyl group adds nonpolar surface and no H-bond sites, so Analog A and Analog D are less soluble than L.\n4. Turning the O–H into an ethyl ether removes the only H-bond donor L had, so Analog B is out.\n5. The ring N of Analog C has a lone pair in the plane of the ring that accepts an H bond from water.\n6. Answer: Analog C. More N/O lone pairs and N–H/O–H groups mean more water solubility; capping an O–H or adding carbon lowers it.\n\n**Rule to reuse:** **Hydrogen bond:** an H on N, O or F (the donor) attracted to a lone pair on N, O or F (the acceptor). Water both donates and accepts.",
      "id": "p_cpq5_2_q3"
     },
     {
      "q": "In Experiment 2, [L] was raised from 20 μM to 80 μM at constant temperature and pH. What percentage of the enzyme’s activity is inhibited in the 80 μM trial?",
      "choices": [
       "33%",
       "50%",
       "67%",
       "80%"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe5-cp:4",
      "exp": "1. Ki is an equilibrium constant, so with T and pH unchanged it is still **20 μM** at both [L].\n2. Use the competitive-inhibition rate law: v_I/v₀ = (Km + [S]) / (Km(1 + [L]/Ki) + [S]). With [S] = Km this becomes v_I/v₀ = 2 / (2 + [L]/Ki).\n3. At [L] = 80 μM: [L]/Ki = **4**, so v_I/v₀ = 2 / 6 = 0.33; the activity left is 33%, and **67%** is inhibited.\n4. 33% is the inhibition at 20 μM (2 / 3 of activity left) or the activity left at 80 μM. 80% is [L]/([L] + Ki), the share of free enzyme bound with no substrate present, which ignores the competing substrate. 50% would need [L]/Ki = 2.\n5. Answer: 67%.\n\n**Rule to reuse:** for a competitive inhibitor at [S] = Km, the fraction of activity left is 2 / (2 + [I]/Ki); Ki stays fixed when only [I] changes.",
      "id": "p_cpq5_2_q4"
     }
    ]
   },
   {
    "id": "p_cpq5_3",
    "subj": "physics",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4A",
     "4C",
     "5A",
     "4D"
    ],
    "title": "An Automated Workstation for DNA Gel Analysis",
    "passage": "In an automated workstation for DNA analysis, a carriage carrying a pipette head runs along a level rail between a sample rack and an agarose gel. For each transfer, a motor starts the carriage from rest, brings it to a cruising speed, and then brakes it to a stop above the gel, and a position sensor logs where the carriage is once every second. The same motor profile is used for every transfer, so the log from one transfer is used to tune the speed and braking of all of them.\n\nThe gel is cast and run in TBE buffer at pH 8.3 and 25 °C. Samples are loaded into wells at the negative electrode, and a DNA ladder of known fragment lengths is run in a neighboring lane. In one run, the ladder bands of 200, 400, 600, 1000, 1500 and 3000 bp traveled 6.0, 4.6, 3.8, 2.9, 2.2 and 1.2 cm from the wells, respectively. After the run, the gel is stained so that each band can be located and its distance measured.\n\nBefore loading, each sample is mixed with a loading buffer that must hold pH 7.4. The buffer is made from a weak acid, HB, and its conjugate base, B⁻. To find the pKa of HB, a technician titrated 40.0 mL of 0.050 M HB with 0.10 M NaOH at 25 °C and recorded the pH after each addition (Figure 1). To locate the bands, the stain is excited with 480-nm blue light, and it then emits 600-nm orange light. Both wavelengths are measured in air, where all colors of light travel at essentially the same speed c.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Titration of 40.0 mL of 0.050 M HB with 0.10 M NaOH",
     "x": {
      "label": "Volume of NaOH added (mL)",
      "min": 0,
      "max": 30,
      "step": 5
     },
     "y": {
      "label": "pH",
      "min": 0,
      "max": 14,
      "step": 2
     },
     "series": [
      {
       "name": "HB titration",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         4.05
        ],
        [
         2,
         5.85
        ],
        [
         4,
         6.2
        ],
        [
         6,
         6.43
        ],
        [
         8,
         6.62
        ],
        [
         10,
         6.8
        ],
        [
         12,
         6.98
        ],
        [
         14,
         7.17
        ],
        [
         16,
         7.4
        ],
        [
         18,
         7.75
        ],
        [
         19,
         8.08
        ],
        [
         20,
         9.66
        ],
        [
         21,
         11.21
        ],
        [
         22,
         11.51
        ],
        [
         24,
         11.8
        ],
        [
         28,
         12.07
        ],
        [
         30,
         12.15
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "Compared with the frequency of the excitation light, the frequency of the light emitted by the stained bands is:",
      "choices": [
       "about two-thirds as high.",
       "four-fifths as high.",
       "unchanged.",
       "five-fourths as high."
      ],
      "ans": 1,
      "cat": "4D",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe5-cp:53",
      "exp": "1. In air, light of every color travels at the same speed c, and **c = fλ**, so frequency is inversely proportional to wavelength.\n2. Wavelength ratio, emitted ÷ excitation: 600 nm ÷ 480 nm = **5/4**. The emitted light has the longer wavelength.\n3. Frequency ratio is the inverse: f(emitted) ÷ f(excitation) = **4/5**, so the emitted frequency is four-fifths as high.\n4. \"Five-fourths as high\" treats f as proportional to λ; \"about two-thirds\" squares the ratio (16/25 ≈ 0.64); \"unchanged\" forgets that c = fλ ties f to λ when c is fixed.\n5. Answer: four-fifths as high.\n\n**Rule to reuse:** at a fixed wave speed, f ∝ 1/λ. A wavelength longer by some factor means a frequency lower by the same factor.",
      "id": "p_cpq5_3_q1"
     },
     {
      "q": "About how long is a PCR product that ran 2.9 cm from its well in the same gel?",
      "choices": [
       "About 3000 bp",
       "About 2000 bp",
       "About 1000 bp",
       "About 600 bp"
      ],
      "ans": 2,
      "cat": "4C",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe6-cp:6",
      "exp": "1. DNA's phosphates are negative, so every fragment runs away from the wells at the negative electrode toward the positive electrode; the gel slows long fragments the most.\n2. Find 2.9 cm among the ladder distances: the band that traveled **2.9 cm** is the 1000-bp band, so the PCR product is **≈ 1000 bp**.\n3. The ends of the range are far from 2.9 cm: the 600-bp band ran 3.8 cm and the 3000-bp band only 1.2 cm, so \"About 600 bp\" and \"About 3000 bp\" are out.\n4. A straight-line shortcut between the end bands gives the wrong size: 200 + (6.0 − 2.9) ÷ (6.0 − 1.2) × 2800 = 200 + 3.1 ÷ 4.8 × 2800 ≈ **2000 bp**, but the ladder itself puts 2.9 cm at **1000 bp**, so \"About 2000 bp\" is out.\n5. Answer: about 1000 bp. Read size off the ladder itself; longer DNA travels less, and not in proportion.\n\n**Rule to reuse:** to size DNA, go across from its distance to the ladder curve and read down. Longer DNA runs less, and not in a straight-line way.",
      "id": "p_cpq5_3_q2"
     },
     {
      "q": "In the TBE running buffer, compared with pure water at 25 °C:",
      "subj": "gen_chem",
      "choices": [
       "[H⁺] is about 1.3 times lower and [OH⁻] about 1.3 times higher.",
       "[H⁺] is about 20 times higher and [OH⁻] about 20 times lower.",
       "[H⁺] is about 20 times lower and [OH⁻] is unchanged.",
       "[H⁺] is about 20 times lower and [OH⁻] about 20 times higher."
      ],
      "ans": 3,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe6-cp:7",
      "exp": "1. Translate: compare each concentration with water, where [H⁺] = [OH⁻] = 10⁻⁷ M.\n2. Rule: pH = −log[H⁺] and pH + pOH = 14. The buffer has pH 8.3, so pOH = 5.7.\n3. Convert each log difference to a factor: [H⁺] = 10⁻⁸·³ = **5.0 × 10⁻⁹ M**; 10⁻⁷ ÷ 5.0 × 10⁻⁹ = 10¹·³ ≈ **20× lower**; [OH⁻] = 10⁻⁵·⁷ = **2.0 × 10⁻⁶ M**; 2.0 × 10⁻⁶ ÷ 10⁻⁷ = **20× higher**.\n4. A 1.3-unit pH change is a factor of 10¹·³, not 1.3; a higher pH means less H⁺, not more; and Kw fixes [OH⁻] once [H⁺] drops. So \"[H⁺] is about 1.3 times lower and [OH⁻] about 1.3 times higher.\", \"[H⁺] is about 20 times higher and [OH⁻] about 20 times lower.\" and \"[H⁺] is about 20 times lower and [OH⁻] is unchanged.\" are out.\n5. Answer: [H⁺] is about 20 times lower and [OH⁻] about 20 times higher than in water, a weakly basic buffer.\n\n**Rule to reuse:** a pH difference of d units = a factor of 10ᵈ in [H⁺]. [OH⁻] changes by the same factor the other way (Kw = 10⁻¹⁴ at 25 °C).",
      "id": "p_cpq5_3_q3"
     },
     {
      "q": "Based on Figure 1, what ratio of B⁻ to HB is needed for the pH 7.4 loading buffer?",
      "subj": "gen_chem",
      "choices": [
       "4:1",
       "9:5",
       "3:5",
       "1:4"
      ],
      "ans": 0,
      "cat": "5A",
      "skill": "SIRS 4",
      "diff": "X",
      "twin": "pe6-cp:8",
      "exp": "1. Find the equivalence point, the steep jump, at 20 mL: 40.0 mL × 0.050 M = 2.0 mmol HB; 2.0 mmol ÷ 0.10 M NaOH = **20 mL**.\n2. Half of 20 mL is 10 mL, and the pH there is the pKa: half-equivalence = 20 ÷ 2 = **10 mL**; pH at 10 mL = pKa = **6.8**.\n3. Put the target pH into Henderson–Hasselbalch: 7.4 = 6.8 + log([B⁻]/[HB]); log([B⁻]/[HB]) = **0.6**; [B⁻]/[HB] = 10⁰·⁶ ≈ **4.0**. The curve agrees: at 16 mL, B⁻ : HB = 16 : 4 = 4, and the pH is 7.4.\n4. 3:5 (0.60) uses the log itself as the ratio; 9:5 (1.8) takes e⁰·⁶ instead of 10⁰·⁶; 1:4 is the flipped ratio, which would give pH 6.8 − 0.6 = 6.2.\n5. Answer: 4:1. Read the pKa at half the equivalence volume; a pH above the pKa means more B⁻ than HB.\n\n**Rule to reuse:** pKa = pH at half the equivalence volume. Each pH unit above the pKa = 10× more A⁻ than HA; each unit below = 10× more HA.",
      "id": "p_cpq5_3_q4"
     }
    ]
   },
   {
    "id": "p_cpq5_4",
    "subj": "biochemistry",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "5E",
     "4E"
    ],
    "title": "Cordycepin and the Cordyceps Fungus",
    "passage": "Fungi of the genus Cordyceps make cordycepin, a nucleoside identical to adenosine except that its sugar has no –OH group on the 3′ carbon. The fungus builds cordycepin from adenosine, whose sugar comes from ribose 5-phosphate, a product of the pentose phosphate pathway. In human cells, kinases add phosphate groups to the 5′ carbon of cordycepin to give cordycepin triphosphate. RNA polymerase can add this nucleotide to a growing RNA chain, but synthesis then stops, because the next phosphodiester bond requires the missing 3′ –OH.\n\nThe cell wall of the fungus is built largely from a branched glucan, a polymer made only of glucose. When the wall glucan is partly digested by an enzyme that cuts the main-chain links but leaves the branch-point links intact, a single glucose disaccharide, Disaccharide X, which contains the branch-point link, is released.\n\nResearchers also asked whether cordycepin changes the phosphorylation of AMP-activated protein kinase (AMPK) in cultured liver cells. Cells were first grown with ³⁵S-methionine, so the label entered the polypeptide chain of every newly made protein, and were then incubated with ³³P-labeled phosphate, which kinases transfer onto serine and threonine side chains. AMPK was isolated from treated and untreated cells, and both radioactive signals were counted by liquid scintillation. Both isotopes are β⁻ emitters with half-lives of several weeks, so the two signals can be separated by the energies of their particles.",
    "questions": [
     {
      "q": "In ribose 5-phosphate (furanose form), the phosphate group is attached to which carbon?",
      "choices": [
       "C1",
       "C2",
       "C4",
       "C5"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe1-cp:38",
      "exp": "1. The number in the name is the carbon that carries the phosphate: ribose 5-phosphate → phosphate on **C5**.\n2. Number the furanose ring from the anomeric carbon: C1 = anomeric carbon (bonded to two O atoms); C4 = bonded to the ring O; C5 = the –CH₂OH outside the ring.\n3. C1, C2 and C4 are ring carbons with other numbers; the name says 5, so \"C1\", \"C2\" and \"C4\" are out.\n4. Answer: C5, the –CH₂OH carbon outside the ring.\n\n**Rule to reuse:** number a sugar from the anomeric carbon (C1); in ribofuranose, C4 holds the ring O and C5 is the –CH₂OH outside the ring.",
      "id": "p_cpq5_4_q1"
     },
     {
      "q": "In Disaccharide X, the bridging O joins C1 of one glucose to the CH₂OH carbon of the other, on the same Haworth face as the first glucose's CH₂OH. Which disaccharide is X?",
      "choices": [
       "Gentiobiose",
       "Isomaltose",
       "Cellobiose",
       "Maltose"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe1-cp:39",
      "exp": "1. Find the anomeric carbon of the linking residue, C1: the ring carbon bonded to two oxygens, the ring O and the bridging O.\n2. Number the other glucose from its own anomeric carbon: C1 → C5 lie in the ring, and the CH₂OH carbon outside it is C6. The bridging O sits on C6: C1 – O – **C6′** ⇒ **1,6**. Maltose (α-1,4) and cellobiose (β-1,4) are 1,4 links, so \"Maltose\" and \"Cellobiose\" are out.\n3. Now the anomer. The stem says the C1 bond points to the same face as the CH₂OH.\n4. Rule for D-sugars: same face as CH₂OH → **β**; opposite face → α. So X is β-1,6, and isomaltose, the α-1,6 dimer, is out.\n5. Answer: gentiobiose, the β-1,6 glucose dimer. Name the link by the two carbon numbers, then α/β by comparing C1's bond with the CH₂OH.\n\n**Rule to reuse:** find C1 (two O's), count to the partner carbon, then compare C1's bond with CH₂OH: same side β, opposite α. Apply both parts to each option.",
      "id": "p_cpq5_4_q2"
     },
     {
      "q": "Cordycepin is fully hydrolyzed, and its sugar, with formula C₅H₁₀O₄, is isolated. Which sugar is it?",
      "choices": [
       "Pentose lacking the C2 –OH",
       "Pentose lacking the C3 –OH",
       "Pentose with all four –OH",
       "Hexose lacking the C6 –OH"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 3",
      "diff": "D",
      "twin": "pe1-cp:40",
      "exp": "1. Use the formula first: count C and O. Pentose with all four –OH (ribose): 5 C, **5 O** → C₅H₁₀O₅ ✗; hexose lacking the C6 –OH: **6 C** → C₆H₁₂O₅ ✗; the two deoxypentoses: 5 C, 4 O → C₅H₁₀O₄ ✓. So \"Pentose with all four –OH\" and \"Hexose lacking the C6 –OH\" are out.\n2. Two isomers remain. The passage gives the clue: cordycepin is adenosine whose sugar has no –OH on the 3′ carbon.\n3. Number the ring: C1′ is the carbon bonded to two oxygens (the ring O and the base); the next carbons are C2′ and then C3′, and in cordycepin C3′ is a bare CH₂.\n4. The DNA sugar has its CH₂ one carbon earlier, at C2′, and keeps the 3′ –OH, so \"Pentose lacking the C2 –OH\" is out. Cordycepin stops RNA synthesis precisely because the 3′ –OH is missing.\n5. Answer: the pentose lacking the C3 –OH (3-deoxyribose). Check the formula, then number from C1′ to find which carbon lost its –OH.\n\n**Rule to reuse:** count carbons, then oxygens, then find which carbon lacks its OH; in cordycepin it's C3′, not DNA's C2′. For each choice, check which carbon is a plain CH₂.",
      "id": "p_cpq5_4_q3"
     },
     {
      "q": "If the isolated AMPK is treated with a phosphatase, then, of the radioactive signals from the protein:",
      "choices": [
       "³⁵S decreases and ³³P is unchanged.",
       "Neither changes.",
       "³³P decreases and ³⁵S is unchanged.",
       "Both decrease."
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe1-cp:41",
      "exp": "1. Locate each label: ³⁵S → methionine in the polypeptide chain; ³³P → phosphate groups on serine and threonine side chains.\n2. The enzyme cuts off phosphate only: phosphate leaves → ³³P **decreases**; the chain stays → ³⁵S **unchanged**.\n3. The polypeptide, with its ³⁵S, stays intact, so ³⁵S cannot drop, and ³³P must drop: \"³⁵S decreases and ³³P is unchanged.\", \"Both decrease.\" and \"Neither changes.\" are out.\n4. Answer: ³³P decreases and ³⁵S is unchanged.\n\n**Rule to reuse:** to predict which label is lost, match each isotope to the group it sits on, then ask which group the enzyme removes.",
      "id": "p_cpq5_4_q4"
     },
     {
      "q": "Each decaying ³³P or ³⁵S nucleus ejects an electron and an antineutrino. Which daughter nuclides form?",
      "subj": "physics",
      "choices": [
       "Silicon-33 and phosphorus-35",
       "Sulfur-33 and chlorine-35",
       "Sulfur-33 and phosphorus-35",
       "Aluminum-29 and silicon-31"
      ],
      "ans": 1,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe1-cp:42",
      "exp": "1. An electron leaving the nucleus means a neutron turned into a proton: β⁻ decay. n → p + e⁻ + ν̄, so Z goes up by 1 and A stays the same.\n2. Apply it to phosphorus-33 (Z = 15): ³³₁₅P → ³³₁₆S + ⁰₋₁e + ν̄; Z: 15 = 16 + (−1) ✓; A: 33 = 33 + 0 ✓.\n3. Apply it to sulfur-35 (Z = 16): ³⁵₁₆S → ³⁵₁₇Cl + ⁰₋₁e + ν̄; Z: 16 = 17 + (−1) ✓; A: 35 = 35 ✓.\n4. Eliminate: silicon-33 and phosphorus-35 lower Z (positron emission); aluminum-29 and silicon-31 lose 4 mass units (alpha decay); \"Sulfur-33 and phosphorus-35\" has one right and one wrong, which is still wrong.\n5. Answer: sulfur-33 and chlorine-35.\n\n**Rule to reuse:** β⁻ (electron out of nucleus) → Z + 1, A same. β⁺ → Z − 1, A same. α → Z − 2, A − 4. Then look up the new element by Z.",
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
    "title": "Ovoperoxidase and the Sea Urchin Fertilization Envelope",
    "passage": "When a sperm fuses with a sea urchin egg, the egg plasma membrane depolarizes within seconds. This electrical \"fast block\" keeps other sperm from fusing while slower defenses are put in place. Within minutes, cortical granules release proteins that assemble into a fertilization envelope around the egg. The envelope is then hardened by ovoperoxidase, a heme enzyme that uses H₂O₂ to oxidize tyrosine side chains. In each catalytic step the enzyme strips a hydrogen atom, a proton plus an electron, off the phenol –OH of a tyrosine, and two of the resulting species then couple to form a dityrosine cross-link between envelope proteins. Eggs whose envelope fails to harden are often entered by more than one sperm and rarely develop normally. Ovoperoxidase is active only when Ca²⁺ is bound in a loop of the protein, where a glutamate side chain helps hold the ion.\n\nIn Experiment 1, the activity of purified ovoperoxidase was assayed with tyrosol, HO–C₆H₄–CH₂CH₂OH, a small phenol that has no amino acid backbone. In Experiment 2, researchers modeled the current that flows during the fast block. Because that current passes through the seawater around the egg and through the egg cytoplasm, they measured the electrical conductivity of both media (Table 1). Both media conduct by the movement of dissolved ions, chiefly Na⁺, K⁺ and Cl⁻.",
    "figure": {
     "caption": "Table 1 Electrical conductivity at 20 °C",
     "columns": [
      "Medium",
      "Conductivity (S/m)"
     ],
     "rows": [
      [
       "Artificial seawater",
       "4.8"
      ],
      [
       "Egg cytoplasm",
       "0.80"
      ]
     ]
    },
    "questions": [
     {
      "q": "What species does one catalytic step of ovoperoxidase produce from a tyrosine side chain?",
      "choices": [
       "A tyrosinate anion",
       "A tyrosyl radical",
       "An ortho-quinone",
       "An aryl carbocation"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe3-cp:35",
      "exp": "1. A whole H atom leaves, not just a proton: Tyr–O–H − H⁺ → Tyr–O⁻; Tyr–O⁻ − e⁻ → **Tyr–O•**; net, losing H• gives a tyrosyl (phenoxyl) radical.\n2. Removing only H⁺ would give the tyrosinate anion; here an electron is removed too, so \"A tyrosinate anion\" is out.\n3. An ortho-quinone needs further oxidation, and an aryl carbocation would mean losing the whole –OH, not one H atom, so both are out.\n4. Answer: a tyrosyl radical.\n\n**Rule to reuse:** remove H⁺ → anion; remove H⁺ + e⁻ (an H atom) → radical; each further oxidation removes more electrons.",
      "id": "p_cpq5_5_q1"
     },
     {
      "q": "In Experiment 1, ovoperoxidase removes H⁺ and one electron from the most acidic X–H bond of tyrosol. On which atom is the unpaired electron left?",
      "subj": "organic_chem",
      "choices": [
       "The alcohol O",
       "The CH₂ bonded to the ring",
       "The CH₂ bonded to OH",
       "The phenol O"
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:36",
      "exp": "1. The question tells you exactly what is removed: one electron and one proton, from the most acidic X–H.\n2. List every X–H in tyrosol and how acidic it is: phenol O–H: pKa ≈ **10**; alcohol O–H: pKa ≈ **16**; CH₂ C–H: pKa > **40**.\n3. The phenol O–H is by far the most acidic, so H⁺ + e⁻ leave from there: the unpaired electron goes on the phenol oxygen.\n4. The other choices put it where no acidic H was removed: on the alcohol O or on either CH₂ carbon.\n5. Answer: the phenol O, giving a phenoxyl radical stabilized by the ring.\n\n**Rule to reuse:** **H⁺ + e⁻ together = one hydrogen atom.** Taking both from X–H leaves X• — a radical: one unpaired electron, drawn as a dot on that atom.",
      "id": "p_cpq5_5_q2"
     },
     {
      "q": "Which atom of the glutamate residue in the calcium-binding loop most likely contacts Ca²⁺ directly?",
      "choices": [
       "A carboxylate O",
       "The backbone N",
       "The α-carbon",
       "The carboxylate C"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:37",
      "exp": "1. The partner is Ca²⁺, a positive ion: look for a negative atom with lone pairs.\n2. Name the element and charge of each atom: carboxylate **O⁻**: lone pairs, negative; backbone amide **N–H**: lone pair tied up in resonance; α-**C**: sp³, no lone pair; carboxylate **C**: δ+.\n3. Carbon atoms have no lone pair to offer, and the carboxylate carbon is electron-poor, so \"The α-carbon\" and \"The carboxylate C\" are out.\n4. The amide N shares its lone pair with the C=O and carries a δ+ H that would point toward the cation, so \"The backbone N\" is out.\n5. The carboxylate oxygens carry the negative charge and the lone pairs. Answer: a carboxylate O.\n6. Cations bind O⁻ and C=O oxygens; never a carbon, and rarely an amide N.\n\n**Rule to reuse:** Metal cations bind **Lewis bases**: atoms with lone pairs, best if negatively charged.",
      "id": "p_cpq5_5_q3"
     },
     {
      "q": "The heme iron of ovoperoxidase is held from below by a side chain whose five-atom aromatic ring has two nitrogens: an N–H, and an N that donates its lone pair to Fe. Which residue is it?",
      "choices": [
       "Proline",
       "Tryptophan",
       "Histidine",
       "Phenylalanine"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe3-cp:38",
      "exp": "1. Two features to match: a five-atom aromatic ring, with two nitrogens.\n2. Count ring atoms and nitrogens in each side chain: proline: **5** atoms, **1** N, not aromatic; tryptophan (indole): five-atom ring with **1** N, fused to a benzene ring; histidine (imidazole): **5** atoms, **2** N; phenylalanine: **6** atoms, **0** N.\n3. Phenylalanine has a six-atom ring and no nitrogen, so it is out.\n4. Proline's single ring N is a backbone amide N with no free lone pair, and tryptophan's five-atom ring has only one N, an N–H whose lone pair is part of the aromatic system; neither can bind iron, so both are out.\n5. Histidine's imidazole has an N–H and an =N– whose lone pair binds the iron. Answer: histidine.\n6. Count ring atoms, then heteroatoms: 5 + one N = pyrrole-type; 5 + two N = imidazole; 6 + one N = pyridine; 6 + none = benzene.\n\n**Rule to reuse:** Aromatic rings to recognize on sight: pyrrole (5 atoms, 1 N–H), imidazole (5 atoms, 2 N; the side chain of histidine), furan (5 atoms, 1 O), pyridine (6 atoms, 1 N).",
      "id": "p_cpq5_5_q4"
     },
     {
      "q": "Based on Table 1, what is the resistivity of the artificial seawater?",
      "subj": "physics",
      "choices": [
       "0.021 Ω·m",
       "0.21 Ω·m",
       "1.25 Ω·m",
       "4.8 Ω·m"
      ],
      "ans": 1,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe3-cp:39",
      "exp": "1. The data are conductivities σ, in S/m = (Ω·m)⁻¹. Resistivity is the reciprocal, so the unit flips to Ω·m.\n2. Take the reciprocal of seawater's σ: ρ = 1/σ = 1 ÷ **4.8** (Ω·m)⁻¹ = **0.21 Ω·m**. \"4.8 Ω·m\" copies the number without inverting it, and \"0.021 Ω·m\" slips a factor of 10.\n3. The cytoplasm value belongs to the other row: ρ = 1 ÷ 0.80 = **1.25 Ω·m**, so \"1.25 Ω·m\" is out.\n4. Answer: 0.21 Ω·m. Seawater, rich in ions, conducts far better than cytoplasm.\n\n**Rule to reuse:** resistivity ρ = 1/conductivity σ. A unit with ⁻¹, like S/m = (Ω·m)⁻¹, tells you to take the reciprocal.",
      "id": "p_cpq5_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "A 0.500-mol sample of argon at 37 °C and 1.00 atm is compared with the ideal-gas model, with R = 8.21 × 10⁻² L·atm/(mol·K). Which pair gives an assumption of the ideal-gas model and the volume it predicts for the sample?",
    "choices": [
     "Particles occupy no volume; 11.2 L",
     "Particles occupy no volume; 12.7 L",
     "Particles attract weakly; 11.2 L",
     "Particles attract weakly; 12.7 L"
    ],
    "ans": 1,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "pe1-cp:29",
    "exp": "1. Model half: an ideal gas has particles with no volume and NO attractions. \"Particles attract weakly\" describes a real gas, so both \"Particles attract weakly\" choices are out.\n2. Volume half: convert the temperature to kelvin: T = 37 + 273 = **310 K**.\n3. Solve PV = nRT for V: V = nRT ÷ P = (0.500 mol)(0.0821 L·atm·mol⁻¹·K⁻¹)(310 K) ÷ 1.00 atm = **12.7 L**.\n4. 11.2 L is 0.500 × 22.4 L, the molar volume at 273 K; at 310 K the volume is larger by 310/273: 11.2 L × 310/273 = **12.7 L**. So \"Particles occupy no volume; 11.2 L\" is out.\n5. Answer: particles occupy no volume; 12.7 L.\n\n**Rule to reuse:** ideal gas = no particle volume + no attractions. V = nRT/P with T in kelvin; 22.4 L/mol only at 0 °C and 1 atm.",
    "id": "cp_q5_sa1"
   },
   {
    "q": "Tritium-labeled serotonin is used to follow uptake by brain-tissue slices kept in aqueous buffer for 24 hours. Which tritium position would best retain the label throughout the experiment?",
    "choices": [
     "The indole N–H",
     "The amine N–H",
     "The phenol O–H",
     "A ring C–H"
    ],
    "ans": 3,
    "cat": "5D",
    "skill": "SIRS 3",
    "diff": "M",
    "subj": "organic_chem",
    "twin": "pe3-cp:10",
    "exp": "1. Find the condition that matters: the molecule spends a long time in water.\n2. Look at the atom each position is on. The indole N–H and the phenol O–H are hydrogens on N and O: they exchange with water, so \"The indole N–H\" and \"The phenol O–H\" are out.\n3. The amine (–NH₃⁺/–NH₂) hydrogens are also on nitrogen, so they exchange too, and very quickly: \"The amine N–H\" is out.\n4. A ring C–H is a hydrogen on carbon. It does not exchange, so the ³H stays.\n5. Answer: a ring C–H. Put isotope labels on C–H, never on N–H or O–H, when the experiment runs in water.\n\n**Rule to reuse:** **Exchangeable hydrogens:** H on N, O or S is acidic or basic enough to swap with the solvent's H within seconds to minutes. (That is why N–H and O–H peaks disappear when D₂O is added in NMR.)",
    "id": "cp_q5_sa2"
   },
   {
    "q": "Fractional distillation at atmospheric pressure is used to separate a mixture of four liquids whose molar masses are all about 86–88 g/mol. Which liquid collects first in the receiving flask?",
    "choices": [
     "Ethyl propyl ether",
     "Pentanal",
     "Pentyl alcohol",
     "Butanoic acid"
    ],
    "ans": 0,
    "cat": "5C",
    "skill": "SIRS 3",
    "diff": "X",
    "subj": "organic_chem",
    "twin": "pe4-cp:9",
    "exp": "1. The masses are nearly equal, so dispersion forces are a tie; the boiling order comes from the polar groups.\n2. Look for an O–H. Butanoic acid and pentyl alcohol (1-pentanol) have one, so they hydrogen bond with themselves and boil high: both are out.\n3. Compare the two without O–H: pentanal has a C=O, a strong dipole; the ether O has two weaker C–O dipoles and no H to donate. Ethyl propyl ether: no H bond, weak dipole → bp ≈ **64 °C**; pentanal: C=O dipole → bp ≈ **103 °C**; pentyl alcohol: O–H → bp ≈ **138 °C**; butanoic acid: O–H + C=O → bp ≈ **164 °C**. So \"Pentanal\" is out.\n4. The lowest-boiling liquid distills first.\n5. Answer: ethyl propyl ether. At equal mass, rank boiling points by O–H > C=O > ether O > hydrocarbon.\n\n**Rule to reuse:** at equal size, O–H > C=O > O between carbons > only C, H. For each choice find the O and ask: H on it? double-bonded to C? Least sticky distills first.",
    "id": "cp_q5_sa3"
   },
   {
    "q": "In acetonitrile, CH₃C≡N, the carbon–nitrogen bond is 116 pm long, compared with 147 pm for the C–N bond in methylamine. Which bonding description best accounts for the shorter bond in acetonitrile?",
    "choices": [
     "Three σ bonds between C and N",
     "One σ bond and one π bond between C and N",
     "One σ bond and two π bonds between C and N",
     "Two σ bonds and one π bond between C and N"
    ],
    "ans": 2,
    "cat": "5B",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "organic_chem",
    "twin": "pe4-cp:25",
    "exp": "1. Translate: the C–N link in acetonitrile is shorter than a C–N single bond; find the bonding that makes it shorter.\n2. Draw both: acetonitrile has a C≡N triple bond, while methylamine, CH₃NH₂, has a C–N single bond.\n3. Rule: the first bond between two atoms is σ; each additional bond is π. Bond order 3 = **1 σ** + **2 π**; bond order ↑ → bond length ↓. Two atoms share only one head-on σ overlap, so \"Three σ bonds between C and N\" and \"Two σ bonds and one π bond between C and N\" are impossible.\n4. One σ plus one π is a double bond, as in an imine, which acetonitrile does not have: \"One σ bond and one π bond between C and N\" is out.\n5. Answer: one σ bond and two π bonds between C and N.\n\n**Rule to reuse:** single = 1σ; double = 1σ + 1π; triple = 1σ + 2π. More bonds → shorter and stronger.",
    "id": "cp_q5_sa4"
   },
   {
    "q": "A gas sample sealed under a freely sliding piston holds 0.40 mol of ideal gas at 77 °C and 3.0 atm. Holding everything else constant, which single change would NOT double the volume of the gas?",
    "choices": [
     "Raising the temperature from 77 °C to 427 °C",
     "Raising the pressure from 3.0 atm to 6.0 atm",
     "Lowering the pressure from 3.0 atm to 1.5 atm",
     "Adding 0.40 mol of the same gas"
    ],
    "ans": 1,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "X",
    "subj": "gen_chem",
    "twin": "pe5-cp:12",
    "exp": "1. Solve the ideal gas law for V and note how it depends on each variable: PV = nRT → V = nRT/P; V ∝ n, V ∝ T in kelvin, V ∝ 1/P.\n2. Temperature must be in kelvin: 77 °C + 273 = **350 K**; 427 °C + 273 = **700 K**; T × 2 → V × 2, so \"Raising the temperature from 77 °C to 427 °C\" doubles V and is out.\n3. Halving P or doubling n each doubles V: P 3.0 → 1.5 atm → V × **2**; n 0.40 → 0.80 mol → V × **2**. So \"Lowering the pressure from 3.0 atm to 1.5 atm\" and \"Adding 0.40 mol of the same gas\" are out.\n4. Doubling P does the opposite: P 3.0 → 6.0 atm → V × **½**. Answer: raising the pressure from 3.0 atm to 6.0 atm does not double V.\n\n**Rule to reuse:** V = nRT/P. V follows n and kelvin T up, and goes opposite to P. Always convert °C to K before comparing temperatures.",
    "id": "cp_q5_sa5"
   },
   {
    "q": "A compound carries four acidic groups: –NH₃⁺, –CH₂OH, –CH₂CH₂COOH and –CCl₂COOH. Starting in strong acid, it is titrated with NaOH. Which group gives up its proton first?",
    "choices": [
     "–NH₃⁺",
     "–CH₂OH",
     "–CH₂CH₂COOH",
     "–CCl₂COOH"
    ],
    "ans": 3,
    "cat": "5A",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "gen_chem",
    "twin": "pe5-cp:45",
    "exp": "1. First off = strongest acid = lowest pKa. Rank the four groups.\n2. Identify each group and recall its typical pKa: –NH₃⁺ (alkylammonium): pKa ≈ **10**; –CCl₂COOH: pKa ≈ **1.3**; –CH₂CH₂COOH: pKa ≈ **4.8**; –CH₂OH: pKa ≈ **16**.\n3. The ammonium and the alcohol are far weaker acids than either –COOH, so \"–NH₃⁺\" and \"–CH₂OH\" are out.\n4. The two Cl atoms sit on the carbon next to the carboxyl of –CCl₂COOH. They pull electron density away and stabilize its anion, so it is the stronger acid; –CH₂CH₂COOH has no nearby electronegative atoms and is out.\n5. Answer: –CCl₂COOH. Electronegative atoms one carbon away from an acid lower its pKa; the effect fades with each added carbon.\n\n**Rule to reuse:** During a titration with base, protons come off in order of **increasing pKa**: the strongest acid first.",
    "id": "cp_q5_sa6"
   },
   {
    "q": "Urea dissolves spontaneously in water at 25 °C, and the solution becomes colder as it dissolves. Which statement about the dissolution at 25 °C is correct?",
    "choices": [
     "Endothermic; TΔS exceeds ΔH",
     "Endothermic; ΔH exceeds TΔS",
     "Exothermic; ΔS is negative",
     "Exothermic; TΔS exceeds ΔH"
    ],
    "ans": 0,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "pe6-cp:9",
    "exp": "1. Translate the observation: the solution cools, so the process absorbs heat from its surroundings. Dissolution is endothermic, ΔH > 0, so both \"Exothermic\" choices are out.\n2. Translate \"spontaneous\": ΔG < 0. Rearrange ΔG = ΔH − TΔS < 0 → **TΔS > ΔH**.\n3. Example: with ΔH = +15 kJ/mol, ΔS must be large enough that TΔS beats ΔH at 298 K: ΔS > 15,000 J ÷ 298 K ≈ **50 J/mol·K**; with ΔS = 70 J/mol·K, ΔG = 15 − 298 × 0.070 = 15 − 20.9 = **−5.9 kJ/mol**.\n4. If ΔH exceeded TΔS, ΔG would be positive and the process nonspontaneous, so \"Endothermic; ΔH exceeds TΔS\" is out.\n5. Answer: endothermic, with TΔS exceeding ΔH; an endothermic dissolution is spontaneous only because the entropy term outweighs it.\n\n**Rule to reuse:** gets colder = endothermic (ΔH > 0). Endothermic + spontaneous only works if entropy wins: ΔS > 0 and TΔS > ΔH.",
    "id": "cp_q5_sa7"
   },
   {
    "q": "An unknown with formula C₅H₁₂O shows exactly two ¹H NMR signals, both singlets: one integrating to 9H and one to 3H. Which compound fits the spectrum?",
    "choices": [
     "2,2-Dimethyl-1-propanol",
     "2-Methyl-2-butanol",
     "Methyl tert-butyl ether",
     "Butyl methyl ether"
    ],
    "ans": 2,
    "cat": "4D",
    "skill": "SIRS 1",
    "diff": "D",
    "subj": "organic_chem",
    "twin": "pe6-cp:27",
    "exp": "1. The key signal: 9H, all equivalent, and not split.\n2. Translate it into a group: 9H = **3 × CH₃**, all equivalent; singlet → the neighboring carbon has **0 H**; → (CH₃)₃C– on a carbon with no H. The 3H singlet is one CH₃ with no H neighbors.\n3. Methyl tert-butyl ether, (CH₃)₃C–O–CH₃, has exactly that: a tert-butyl group and a CH₃, each bonded to the O, giving two singlets, 9H and 3H.\n4. 2,2-Dimethyl-1-propanol (neopentyl alcohol), (CH₃)₃C–CH₂OH, has a 9H singlet but three signals (9H, 2H, 1H); 2-methyl-2-butanol gives a 6H singlet, a 2H quartet, a 3H triplet and a 1H O–H; butyl methyl ether has a 3H singlet but split CH₂ and CH₃ signals and no 9H group. All three are out.\n5. Answer: methyl tert-butyl ether. A 9H singlet means a tert-butyl group on an atom with no H.\n\n**Rule to reuse:** **Number of signals** = number of sets of equivalent H.",
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
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4D",
     "5B",
     "5E"
    ],
    "title": "Two Cone Opsins in a Reef Damselfish",
    "passage": "Many reef fish see color with only two classes of cone. In one damselfish species, short cones contain Opsin B and long cones contain Opsin G. Each opsin is a seven-helix membrane protein that holds the chromophore retinal in a pocket buried among its helices, away from water. Retinal is attached through a Schiff base to a lysine at one end of the pocket; the rest of the chromophore, a ring and a chain of conjugated C=C bonds, is made only of carbon and hydrogen. Absorbing a photon isomerizes one C=C bond of the chromophore, and the opsin changes shape. The light-activated opsin is later switched off when opsin kinase phosphorylates serine and threonine residues on its cytoplasmic tail, using ATP as the phosphate donor.\n\nResearchers expressed both opsins in cultured cells, rebuilt them with retinal, and recorded their absorbance spectra (Figure 1). Each cone signals only the number of photons its opsin absorbs. To study the switch-off step, the team incubated light-activated Opsin G with opsin kinase and one of four labeled ATPs: ³²P at the α, β or γ phosphorus, or ¹⁴C at C8 of the adenine ring. Radioactivity in the opsin was then measured.\n\nTo calibrate their photoisomerization assay, the team also used Compound 1, hex-4-en-1-yne, HC≡C–CH₂–CH=CH–CH₃, with its carbons numbered C1 to C6 starting from the alkyne end. Compound 1 has two geometric isomers, which stay separate for weeks at 25°C.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Relative absorbance of the damselfish cone opsins",
     "x": {
      "label": "Wavelength (nm)",
      "min": 400,
      "max": 650,
      "step": 50
     },
     "y": {
      "label": "Relative absorbance",
      "min": 0,
      "max": 1,
      "step": 0.2
     },
     "series": [
      {
       "name": "Opsin B",
       "marker": "triangle",
       "line": "smooth",
       "points": [
        [
         400,
         0.45
        ],
        [
         420,
         0.7
        ],
        [
         440,
         0.92
        ],
        [
         460,
         1
        ],
        [
         480,
         0.85
        ],
        [
         490,
         0.72
        ],
        [
         500,
         0.55
        ],
        [
         520,
         0.28
        ],
        [
         540,
         0.12
        ],
        [
         560,
         0.04
        ],
        [
         570,
         0.02
        ],
        [
         580,
         0.01
        ],
        [
         600,
         0
        ],
        [
         650,
         0
        ]
       ]
      },
      {
       "name": "Opsin G",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         400,
         0.05
        ],
        [
         420,
         0.08
        ],
        [
         440,
         0.15
        ],
        [
         460,
         0.25
        ],
        [
         480,
         0.42
        ],
        [
         490,
         0.52
        ],
        [
         500,
         0.62
        ],
        [
         520,
         0.85
        ],
        [
         540,
         1
        ],
        [
         560,
         0.9
        ],
        [
         570,
         0.78
        ],
        [
         580,
         0.62
        ],
        [
         600,
         0.32
        ],
        [
         620,
         0.12
        ],
        [
         640,
         0.04
        ],
        [
         650,
         0.02
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "A 490-nm light and a 570-nm light are adjusted so that Opsin G absorbs equal numbers of photons from each. The fish can still tell the two lights apart because:",
      "choices": [
       "Opsin G cones signal more strongly at 570 nm.",
       "the ratio of Opsin B to Opsin G absorption differs.",
       "neither light excites both opsins.",
       "Opsin B absorbs mostly the 570-nm light."
      ],
      "ans": 1,
      "cat": "4D",
      "skill": "SIRS 4",
      "diff": "X",
      "subj": "organic_chem",
      "twin": "pe1-cp:30",
      "exp": "1. Lock in the condition: Opsin G absorbs the same number of photons from both lights, so the G cones send identical signals. That rules out \"Opsin G cones signal more strongly at 570 nm.\".\n2. Read every opsin at 490 nm: G ≈ **0.52**, B ≈ **0.72**; B/G ≈ 0.72 ÷ 0.52 ≈ **1.4**.\n3. Now read them at 570 nm: G ≈ **0.78**, B ≈ **0.02**; B/G ≈ 0.02 ÷ 0.78 ≈ **0.03**.\n4. The curves overlap: at 490 nm both opsins absorb strongly, so \"neither light excites both opsins.\" is false, and Opsin B absorbs almost nothing at 570 nm, so \"Opsin B absorbs mostly the 570-nm light.\" is false too.\n5. Answer: the ratio of Opsin B to Opsin G absorption differs (about 1.4 versus 0.03), and the brain reads color from that comparison.\n\n**Rule to reuse:** one receptor type can't report color (it can't separate color from brightness); color comes from the ratio of responses across overlapping receptors.",
      "id": "p_cpq6_1_q1"
     },
     {
      "q": "The amino acid that would most likely make up most of the opsin pocket's lining around retinal's ring and chain is:",
      "choices": [
       "Glutamate",
       "Arginine",
       "Valine",
       "Threonine"
      ],
      "ans": 2,
      "cat": "5B",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe1-cp:31",
      "exp": "1. Scan the ligand: retinal is one six-membered ring plus a conjugated chain. Free retinal is C₂₀H₂₈O: **20 C**, 28 H, **1 O**; 20 ÷ 21 ≈ **95%** of its heavy atoms are carbon → **hydrophobic**.\n2. The pocket is buried among the helices, away from water, so most of its lining must match a hydrocarbon surface.\n3. Look at each side chain. Glutamate ends in –COO⁻ and arginine in a positively charged guanidinium group at pH 7.4: charges that want water. That rules out glutamate and arginine.\n4. Threonine's side chain carries a polar –OH. Valine's isopropyl side chain is all C and H: it packs against retinal's ring and chain through London dispersion forces. That rules out threonine.\n5. Answer: valine. One charged residue may sit near the Schiff-base end, but it cannot set the character of most of the lining.\n\n**Rule to reuse:** to line a pocket for a nonpolar molecule, pick side chains of only C and H. For each choice, check the side chain for O, N or a charge.",
      "id": "p_cpq6_1_q2"
     },
     {
      "q": "The labeled ATP that would make the phosphorylated Opsin G radioactive is:",
      "choices": [
       "[8-¹⁴C]ATP",
       "[α-³²P]ATP",
       "[β-³²P]ATP",
       "[γ-³²P]ATP"
      ],
      "ans": 3,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "M",
      "subj": "biochemistry",
      "twin": "pe1-cp:32",
      "exp": "1. The radioactivity must end up in the opsin, so the label must ride on the group the kinase moves: ATP + opsin–Ser–OH → ADP + opsin–Ser–O–**PO₃²⁻**; the moved group is the **terminal (γ)** phosphoryl.\n2. Name the labeled positions by walking out from the ribose: the α phosphorus is bonded through O to C5′ of ribose, β is in the middle, and γ is at the end of the chain. C8 is a carbon of the adenine ring.\n3. The α and β phosphates stay behind as ADP, and the adenine ring never leaves ADP. That rules out [α-³²P]ATP, [β-³²P]ATP and [8-¹⁴C]ATP.\n4. The γ-phosphoryl group is what opsin kinase hands to the serine and threonine residues of the opsin tail.\n5. Answer: [γ-³²P]ATP.\n\n**Rule to reuse:** a tag goes wherever its atom goes, and kinases move only ATP's γ (end) phosphate. For each label, ask: is it in the last phosphate?",
      "id": "p_cpq6_1_q3"
     },
     {
      "q": "Based on the formula of Compound 1, which carbon is trigonal planar and belongs to the bond that cannot rotate?",
      "choices": [
       "C2",
       "C3",
       "C5",
       "C6"
      ],
      "ans": 2,
      "cat": "5B",
      "skill": "SIRS 4",
      "diff": "X",
      "twin": "pe1-cp:33",
      "exp": "1. Geometric isomers that do not interconvert point to a C=C, here C4=C5: rotation there would break the π bond.\n2. Count domains for each candidate carbon in HC≡C–CH₂–CH=CH–CH₃: C2 (≡C–, bonded to C1 and C3): 2 atoms → **sp**; C3 (CH₂): 4 atoms → **sp³**; C5 (=CH–): 3 atoms, 0 lone pairs → **sp²**; C6 (CH₃): 4 atoms → **sp³**.\n3. sp³ carbons have only single bonds, which rotate freely. That rules out C3 and C6.\n4. C2 is an alkyne carbon, sp and linear; its π bonds cannot make cis/trans forms. That rules out C2.\n5. The two alkene carbons, C4 and C5, are sp². Each has one unhybridized p orbital, and the two overlap side by side as the π bond that locks the geometry; C4 carries H and CH₂, and C5 carries H and CH₃, so cis and trans forms exist.\n6. Answer: C5.\n\n**Rule to reuse:** neighbors + lone pairs → 4 tetrahedral, 3 trigonal planar, 2 linear; only a C=C locks rotation. Count for each labeled carbon.",
      "id": "p_cpq6_1_q4"
     }
    ]
   },
   {
    "id": "p_cpq6_2",
    "subj": "gen_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "4E",
     "5E"
    ],
    "title": "Direct Synthesis of Nickel(II) Bromide",
    "passage": "Nickel(II) bromide is used as a catalyst precursor in organic synthesis, and it can be prepared directly from the elements:\n\nNi(s) + Br₂ → NiBr₂\n\nA student placed 3.0 g of fine nickel powder in a flask of dry acetonitrile and slowly added 3.0 g of liquid bromine (molar masses: Ni 58.7 g/mol, Br 79.9 g/mol, NiBr₂ 218.5 g/mol). The red-brown color of the bromine faded as the metal was consumed, and the solution turned green. A conductivity probe in the flask recorded a steady rise in electrical conductivity until the reaction stopped. Because bromine is toxic and volatile, the addition was done in a fume hood, and the flask was cooled in a water bath because the mixture warmed noticeably. Gray, unreacted nickel powder remained at the bottom of the flask and was filtered off, and evaporating the filtrate left the solid product.\n\nNickel (Z = 28) can show several oxidation states, but only one nickel ion is present in this product. Magnetic measurements on the dried solid showed that it is paramagnetic, with two unpaired electrons per nickel ion.\n\nTo discuss the energetics of the reaction with a classmate, the student treated it as a single elementary step. Figure 1 shows the energy of the system along the reaction coordinate for this simplified model.",
    "figure": {
     "type": "line",
     "caption": "Figure 1 Energy diagram for the one-step model of Ni + Br₂ → NiBr₂",
     "x": {
      "label": "Reaction coordinate",
      "min": 0,
      "max": 10,
      "step": 2
     },
     "y": {
      "label": "Energy (kJ/mol)",
      "min": 0,
      "max": 180,
      "step": 20
     },
     "series": [
      {
       "name": "Ni + Br₂ → NiBr₂",
       "marker": "circle",
       "line": "smooth",
       "points": [
        [
         0,
         60
        ],
        [
         2,
         60
        ],
        [
         5,
         160
        ],
        [
         8,
         20
        ],
        [
         10,
         20
        ]
       ]
      }
     ]
    },
    "questions": [
     {
      "q": "The reactant that limited the student's synthesis, and the theoretical yield of NiBr₂, are:",
      "choices": [
       "Br₂; 4.1 g",
       "Br₂; 8.2 g",
       "Ni; 4.1 g",
       "Ni; 11 g"
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe3-cp:13",
      "exp": "1. Convert both masses to moles; equal grams do not mean equal moles. Ni: 3.0 g ÷ 58.7 g/mol = **0.0511 mol**.\n2. Bromine is diatomic, so use 2 × 79.9: M(Br₂) = **159.8 g/mol**; Br₂: 3.0 g ÷ 159.8 g/mol = **0.0188 mol**.\n3. The reaction is 1 : 1, so the smaller amount, Br₂, runs out first. The leftover nickel powder confirms it. That rules out \"Ni; 4.1 g\" and \"Ni; 11 g\".\n4. Yield comes from the limiting reagent: n(NiBr₂) = n(Br₂) = **0.0188 mol**; m = 0.0188 mol × 218.5 g/mol = **4.1 g** (0.0511 × 218.5 = 11 g would wrongly use Ni). \"Br₂; 8.2 g\" uses 79.9 g/mol for Br₂: 3.0 ÷ 79.9 = 0.0375 mol, × 218.5 = 8.2 g.\n5. Answer: Br₂ is limiting, and the theoretical yield is 4.1 g of NiBr₂.\n\n**Rule to reuse:** convert every reactant to MOLES, divide by its coefficient, and the smallest is limiting. Yield = limiting moles × ratio × product molar mass. Diatomics (Br₂, O₂…) use 2 × atomic mass.",
      "id": "p_cpq6_2_q1"
     },
     {
      "q": "In Figure 1, E_R, E_TS and E_P are the energies of the reactants, the transition state and the products. The activation energy of the reverse reaction equals:",
      "choices": [
       "E_TS − E_R",
       "E_TS − E_P",
       "E_R − E_P",
       "E_P − E_R"
      ],
      "ans": 1,
      "cat": "5E",
      "skill": "SIRS 4",
      "diff": "D",
      "twin": "pe3-cp:14",
      "exp": "1. Reverse means starting from NiBr₂, the right plateau (E_P), and climbing back over the same transition state.\n2. Activation energy is always the peak minus the starting plateau: Ea(reverse) = **E_TS − E_P**. In Figure 1: 160 − 20 = 140 kJ/mol.\n3. E_TS − E_R is the forward barrier (160 − 60 = 100 kJ/mol), measured from the reactants. That rules out \"E_TS − E_R\".\n4. E_P − E_R is the forward ΔH (20 − 60 = −40 kJ/mol) and E_R − E_P the reverse ΔH (+40 kJ/mol); neither uses the peak. That rules out both.\n5. Answer: E_TS − E_P.\n\n**Rule to reuse:** forward Ea = peak − reactant level; reverse Ea = peak − product level; ΔH = products − reactants. Always measure from a plateau, never from the axis.",
      "id": "p_cpq6_2_q2"
     },
     {
      "q": "The ground-state electron configuration of the nickel ion in the product is:",
      "choices": [
       "[Ar]3d⁶4s²",
       "[Ar]3d⁷4s¹",
       "[Ar]3d⁸",
       "[Ar]3d⁸4s²"
      ],
      "ans": 2,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe3-cp:15",
      "exp": "1. Count electrons in the neutral atom and fill past [Ar]: 28 − 18 = **10** electrons beyond [Ar]; 4s takes **2** → 8 left; 3d takes **8** → Ni = **[Ar]3d⁸4s²**.\n2. Ni²⁺ has two fewer electrons: 28 − 2 = **26** = 18 + **8**. \"[Ar]3d⁸4s²\" holds 28 electrons, so it is the neutral atom, not the ion.\n3. Ionization removes the outermost electrons first: 4s (n = 4) before 3d (n = 3), even though 4s filled first: [Ar]3d⁸**4s²** → [Ar]3d⁸ + 2 e⁻.\n4. Check with the data: d⁸ puts five electrons in the five 3d orbitals and pairs three, leaving **2 unpaired**, as measured. \"[Ar]3d⁶4s²\" has 4 unpaired d electrons, and \"[Ar]3d⁷4s¹\" has 3 + 1 = 4 unpaired, so neither fits.\n5. Answer: [Ar]3d⁸, since the 4s electrons are lost before any 3d electrons.\n\n**Rule to reuse:** transition-metal ions lose 4s electrons BEFORE 3d. Write the neutral atom first, then remove from the highest n.",
      "id": "p_cpq6_2_q3"
     },
     {
      "q": "Suppose the student then added aqueous sodium carbonate to the green NiBr₂ solution and a pale green solid, NiCO₃, settled out. Based on these observations, how is this second reaction best categorized?",
      "choices": [
       "precipitation, since NiCO₃ comes out of solution.",
       "redox, since Ni is reduced.",
       "acid–base, since CO₃²⁻ accepts a proton.",
       "redox, since Ni is oxidized."
      ],
      "ans": 0,
      "cat": "4E",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe3-cp:16",
      "exp": "1. Observations: mixing two ionic solutions gives a solid that settles out. Assign oxidation states before and after.\n2. Ni stays **+2** (Ni²⁺ in NiBr₂ and in NiCO₃); in carbonate, C stays **+4** and O stays **−2**. No element changes, so it is not redox. That rules out both redox choices.\n3. Carbonate can act as a base, but here no proton is transferred: Ni²⁺ and CO₃²⁻ simply combine into an insoluble salt. That rules out \"acid–base, since CO₃²⁻ accepts a proton.\"\n4. Net ionic equation: Ni²⁺(aq) + CO₃²⁻(aq) → **NiCO₃(s)**; Na⁺ and Br⁻ are spectator ions.\n5. Answer: precipitation, since NiCO₃ comes out of solution.\n\n**Rule to reuse:** assign oxidation states before and after; if none change and two dissolved ions form a solid, it is precipitation. Most carbonates (except those of Group 1 and NH₄⁺) are insoluble.",
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
    "passage": "Cordless nail drivers store energy from a rechargeable battery and release it in a fraction of a second. In one design, an 18-V lithium-ion battery pack labeled 2.5 A·h charges a 250-μF capacitor to 600 V through a voltage-boosting circuit. When the trigger is pulled, the capacitor discharges through a motor that drives a steel piston against the head of the nail. The piston then returns to its starting position and the capacitor recharges, ready for the next nail.\n\nEngineers characterized the tool in several bench tests. In a low-power test firing, a high-speed camera tracked a lighter 80-g test piston; its speed rose from 150 cm/s to 450 cm/s in 0.020 s, and the net force on it was nearly constant during that time. To give users a sense of scale, the engineers also compared the energy stored in the charged capacitor with the energy needed to lift familiar objects.\n\nThe control circuit board is mounted inside a closed aluminum housing. On job sites, the tool is often used near generators and heavy cables, where strong external electric fields can be present, but sensitive parts on the board must be kept free of such fields. The engineers modeled the housing as a hollow conductor that has reached electrostatic equilibrium in a uniform external field of 3.0 × 10³ N/C. A red laser diode on the tool's nose projects an alignment line, emitting 650-nm light, which travels at 3.0 × 10⁸ m/s in air. The beam leaves the tool through a thin fluoropolymer window whose index of refraction is 1.3.",
    "questions": [
     {
      "q": "To store the energy of the charged capacitor as gravitational potential energy, a 1.5-kg toolbox would have to be raised how high? (g ≈ 10 m/s²)",
      "choices": [
       "0.30 m",
       "3.0 m",
       "6.0 m",
       "30 m"
      ],
      "ans": 1,
      "cat": "4A",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe4-cp:53",
      "exp": "1. Translate: find the capacitor's stored energy, then the height h at which mgh equals it.\n2. Convert to SI units: C = 250 μF = **2.5 × 10⁻⁴ F**; V = 600 V = **6.0 × 10² V**.\n3. Energy stored in a capacitor: U = ½CV² = ½ × 2.5 × 10⁻⁴ × (6.0 × 10²)² = ½ × 2.5 × 10⁻⁴ × **3.6 × 10⁵** = **45 J**.\n4. Set mgh = U and solve: h = U ÷ (mg) = 45 J ÷ (1.5 kg × 10 m/s²) = 45 ÷ 15 = **3.0 m**.\n5. Dropping the ½ gives 90 J and 6.0 m, and 0.30 m or 30 m come from a factor-of-10 slip in the powers of ten.\n6. Answer: 3.0 m.\n\n**Rule to reuse:** capacitor energy U = ½CV² (SI units: F, V); lifting energy PE = mgh. Set the energies equal and solve for the unknown.",
      "id": "p_cpq6_3_q1"
     },
     {
      "q": "Approximately how much charge can the fully charged battery pack deliver on a full discharge?",
      "choices": [
       "2.5 C",
       "1.5 × 10² C",
       "9.0 × 10³ C",
       "1.6 × 10⁵ C"
      ],
      "ans": 2,
      "cat": "4C",
      "skill": "SIRS 2",
      "diff": "D",
      "twin": "pe4-cp:54",
      "exp": "1. Translate: an amp-hour is current × time, which is charge. The 18-V rating is not needed for charge.\n2. Convert hours to seconds: Q = I × t = 2.5 A × 1 h; 1 h = **3600 s**; Q = 2.5 × 3600 = **9.0 × 10³ C**. \"2.5 C\" leaves the hour unconverted, and \"1.5 × 10² C\" converts it to minutes (2.5 × 60).\n3. Multiplying by 18 V would give energy in joules, a different quantity: E = QV = 9.0 × 10³ C × 18 V ≈ 1.6 × 10⁵ J (energy, not charge). That rules out \"1.6 × 10⁵ C\".\n4. Answer: about 9.0 × 10³ C.\n\n**Rule to reuse:** A·h × 3600 = coulombs (Q = It, t in seconds). Multiplying by voltage gives energy in joules, not charge.",
      "id": "p_cpq6_3_q2"
     },
     {
      "q": "If the guide laser were replaced by a 405-nm laser, what would be the frequency and the wavelength of its beam inside the window?",
      "choices": [
       "5.7 × 10¹⁴ Hz and 312 nm",
       "5.7 × 10¹⁴ Hz and 405 nm",
       "7.4 × 10¹⁴ Hz and 312 nm",
       "7.4 × 10¹⁴ Hz and 527 nm"
      ],
      "ans": 2,
      "cat": "4D",
      "skill": "SIRS 2",
      "diff": "X",
      "twin": "pe5-cp:55",
      "exp": "1. Frequency comes from the source: f = c/λ = (3.0 × 10⁸ m/s) ÷ (4.05 × 10⁻⁷ m) ≈ **7.4 × 10¹⁴ Hz**. It **does not change** when the light enters the window.\n2. In the window the speed drops to c/n, and with f fixed, the wavelength drops by the same factor: λ = 405 nm ÷ 1.3 ≈ **312 nm**.\n3. \"5.7 × 10¹⁴ Hz\" choices wrongly divide the frequency by n; \"405 nm\" also keeps the air wavelength. \"527 nm\" multiplies by n, but a slower wave has a shorter wavelength.\n4. Answer: 7.4 × 10¹⁴ Hz and 312 nm.\n\n**Rule to reuse:** at a boundary, frequency stays the same; speed and wavelength both divide by n.",
      "id": "p_cpq6_3_q3"
     },
     {
      "q": "In the engineers' model, how strong is the electric field at the circuit board inside the housing?",
      "choices": [
       "Unchanged, because aluminum lets fields cross freely",
       "Reduced, because aluminum absorbs part of the field",
       "Zero, because mobile charges shift to the surface",
       "Zero, because aluminum holds no free electrons"
      ],
      "ans": 2,
      "cat": "4C",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "pe4-cp:56",
      "exp": "1. Translate: the closed aluminum housing is a conductor at electrostatic equilibrium; ask what its free charges do.\n2. The external field pushes free electrons to one face of the housing, leaving the opposite face positive. Metal does not absorb field, and aluminum is full of free electrons. That rules out \"Reduced, because aluminum absorbs part of the field\" and \"Zero, because aluminum holds no free electrons\"\n3. The surface charges make a field opposite the external 3.0 × 10³ N/C field, and they keep moving until the two cancel inside. That rules out \"Unchanged, because aluminum lets fields cross freely\"\n4. Answer: zero, because mobile charges shift to the surface, the principle of a Faraday cage.\n\n**Rule to reuse:** inside a conductor at electrostatic equilibrium, E = 0; charge sits on the surface. A closed metal shell shields its inside (Faraday cage).",
      "id": "p_cpq6_3_q4"
     }
    ]
   },
   {
    "id": "p_cpq6_4",
    "subj": "organic_chem",
    "type": "passage",
    "topic": "C/P",
    "cats": [
     "5D",
     "4D",
     "5E"
    ],
    "title": "Yeast Production of a Peach Lactone",
    "passage": "γ-Decalactone gives peaches much of their aroma and is produced commercially by fermentation. Its precursor is 4-hydroxydecanoic acid, which closes into the lactone, a cyclic ester, when the oxygen of its hydroxyl group attacks the carboxyl carbon in acidic solution. Like all fatty acids, the ten-carbon chain of the precursor is assembled from acetyl-CoA, a thioester formed when acetate is joined to the sulfur atom of coenzyme A. In yeast, the same acetyl-CoA pool also supplies the pathway that makes sterols.\n\nA biotechnology group engineered a yeast strain to make the lactone from glucose. To trace the flow of carbon, they fed the cells sodium [1-¹³C]acetate, in which only the carboxyl carbon carries the label, and analyzed the products by NMR spectroscopy and mass spectrometry. Because ¹³C has a nuclear spin and ¹²C does not, the labeled positions could be identified directly in the ¹³C NMR spectrum of each product.\n\nIn the engineered pathway, a reductase converts 4-oxodecanoic acid, an achiral keto acid, into the hydroxy acid. Chiral chromatography showed that only (R)-4-hydroxydecanoic acid formed, and the lactone isolated after acidification was more than 99% (R). Because the lactone in peaches is mainly the (R) enantiomer, the product matched the natural flavor. The purified lactone, a colorless oil, was also characterized by infrared spectroscopy before it was sent for sensory testing.",
    "questions": [
     {
      "q": "In the feeding experiment, where is the ¹³C label in the acetyl-CoA formed from the labeled acetate?",
      "choices": [
       "The CH₃ carbon",
       "The thioester C=O carbon",
       "The CoA sulfur",
       "Both carbons equally"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "E",
      "twin": "sample-cp:38",
      "exp": "1. The label is on the carboxyl carbon only (C1 of acetate).\n2. Follow each carbon through the bonds that change: CH₃–¹³COO⁻ → CH₃–¹³C(=O)–S–CoA. The carboxyl C has its O⁻ replaced by S and becomes the thioester C=O, keeping the label; the methyl C changes no bonds.\n3. The CH₃ carbon came from the unlabeled methyl group, carbon labels do not move to sulfur, and nothing scrambles the two carbons. That rules out \"The CH₃ carbon\", \"The CoA sulfur\" and \"Both carbons equally\".\n4. Answer: the thioester C=O carbon.\n\n**Rule to reuse:** track a labeled atom by following each carbon through only the bonds that actually change; untouched carbons keep their labels.",
      "id": "p_cpq6_4_q1"
     },
     {
      "q": "How many atoms are in the ring of γ-decalactone?",
      "choices": [
       "4",
       "5",
       "6",
       "10"
      ],
      "ans": 1,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "M",
      "twin": "sample-cp:39",
      "exp": "1. Number the chain: C1 is the COOH carbon, C4 carries the –OH, and the chain runs to C10: HOOC1–C2H₂–C3H₂–C4H(OH)–C5…C10.\n2. The C4 –OH oxygen attacks C1. Count the ring: C1, C2, C3, C4 + O; 4 + 1 = **5** atoms.\n3. \"4\" counts only the ring carbons and forgets the ring O; \"6\" miscounts the chain, and \"10\" counts every carbon, including the six-carbon tail outside the ring.\n4. Answer: five atoms in the lactone ring.\n\n**Rule to reuse:** a lactone ring holds the carbons from C1 to the OH carbon plus the ring O; an OH on C4 gives a 5-membered ring.",
      "id": "p_cpq6_4_q2"
     },
     {
      "q": "What does the infrared spectrum of the purified lactone show?",
      "choices": [
       "A strong band near 1770 cm⁻¹ and no broad O–H band",
       "A strong band near 1770 cm⁻¹ and a broad O–H band",
       "Only a broad O–H band",
       "Aromatic C=C bands and a strong band near 1770 cm⁻¹"
      ],
      "ans": 0,
      "cat": "4D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "sample-cp:40",
      "exp": "1. Read the structure: γ-decalactone is a cyclic ester with only alkyl groups; the –OH of the precursor was used up in closing the ring.\n2. List what it has and lacks: C=O, yes → strong band near **1770 cm⁻¹** (ring strain raises a five-membered lactone above the 1735–1750 cm⁻¹ of open-chain esters); O–H, no → no broad 3200–3500 cm⁻¹ band; benzene ring, no → no aromatic C=C near 1600 cm⁻¹.\n3. Any choice with a broad O–H band needs an O–H, which the lactone lacks, and there is no ring for aromatic bands. That rules out \"A strong band near 1770 cm⁻¹ and a broad O–H band\", \"Only a broad O–H band\" and \"Aromatic C=C bands and a strong band near 1770 cm⁻¹\".\n4. Answer: a strong band near 1770 cm⁻¹ and no broad O–H band.\n\n**Rule to reuse:** list the groups a molecule has and lacks, then match each to its band; an ester shows C=O near 1740 cm⁻¹ without the broad O–H.",
      "id": "p_cpq6_4_q3"
     },
     {
      "q": "What best explains why the reductase forms only (R)-4-hydroxydecanoic acid?",
      "choices": [
       "The keto acid is chiral",
       "The (R) product is more stable",
       "The enzyme exposes one carbonyl face",
       "The aqueous medium favors (R)"
      ],
      "ans": 2,
      "cat": "5E",
      "skill": "SIRS 1",
      "diff": "E",
      "subj": "biochemistry",
      "twin": "sample-cp:41",
      "exp": "1. The starting keto acid is achiral (C4 is a planar C=O), yet only the (R) alcohol forms.\n2. Check each candidate source of selectivity: keto acid, achiral (given) ✗; water, achiral ✗; (R) vs (S), enantiomers of equal stability ✗; enzyme active site, chiral ✓.\n3. The keto acid is stated to be achiral, water is not chiral, and enantiomers are equally stable. That rules out \"The keto acid is chiral\", \"The aqueous medium favors (R)\" and \"The (R) product is more stable\".\n4. Answer: the enzyme exposes one carbonyl face: its chiral active site holds the keto acid so hydride adds to one face, making one transition state lower in energy.\n\n**Rule to reuse:** an achiral reactant gives one enantiomer only in a chiral environment, such as an enzyme active site; enantiomers themselves are equally stable.",
      "id": "p_cpq6_4_q4"
     },
     {
      "q": "Yeast acetyl-CoA also feeds the synthesis of sterols, and in animals cholesterol gives rise to steroid hormones. Which of the following is NOT a steroid?",
      "choices": [
       "Progesterone",
       "Testosterone",
       "Leukotriene B₄",
       "Cortisone"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "biochemistry",
      "twin": "sample-cp:42",
      "exp": "1. The question asks for the one that is NOT a steroid.\n2. Sort each molecule by its parent: progesterone, cholesterol → 4 fused rings; testosterone, cholesterol → 4 fused rings; cortisone, cholesterol → 4 fused rings; leukotriene B₄, arachidonic acid (20 C) → an open chain with no rings.\n3. Progesterone, testosterone and cortisone are steroid hormones made from cholesterol. That rules them out.\n4. Answer: leukotriene B₄, an eicosanoid.\n\n**Rule to reuse:** steroid = four fused rings from cholesterol; eicosanoids (leukotrienes) come from arachidonic acid and are lipids but not steroids.",
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
    "passage": "Steroid 21-hydroxylase (CYP21A2) is a heme enzyme anchored in the endoplasmic reticulum membrane of adrenal cortex cells. It adds an –OH group at carbon 21 of progesterone, a step on the pathways to cortisol and aldosterone. Mutations in CYP21A2 cause congenital adrenal hyperplasia, so researchers want pure, active enzyme for structural studies.\n\nA research team expressed human CYP21A2 in E. coli with eight histidines added to its C-terminus. Because the enzyme is held in the membrane by a stretch of hydrophobic residues, the bacterial membranes were first treated with a solubilizing additive. The extract, in a pH 7.8 buffer, was loaded onto a resin carrying immobilized Co²⁺ ions. Contaminating proteins washed through, and the enzyme was then released with a buffer containing 400 mM imidazole (68.1 g/mol). A gel-filtration column was used as a final step.\n\nThree kinds of results were reported. SDS-PAGE showed a single band at 56 kDa, the expected mass of the tagged enzyme, and the His tag was still attached. The enzyme eluted as one symmetric peak from both columns. When reconstituted with its electron-donating reductase partner, the purified enzyme converted progesterone to 11-deoxycorticosterone with Km = 2.3 μM, close to the 2.1 μM measured for the enzyme in adrenal microsomes.",
    "questions": [
     {
      "q": "Progesterone is made in one step from a 21-carbon precursor whose four fused rings are already in place. Which compound is it?",
      "choices": [
       "Squalene",
       "Arachidonic acid",
       "Pregnenolone",
       "Ceramide"
      ],
      "ans": 2,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "subj": "organic_chem",
      "twin": "pe5-cp:21",
      "exp": "1. The clue is structural: find the compound that already has progesterone's ring system.\n2. Read the core of the product: rings, **3** six-membered + **1** five-membered, all fused; carbons, **21**.\n3. Squalene (a C₃₀ hydrocarbon chain), arachidonic acid (a C₂₀ fatty acid) and ceramide (sphingosine joined to a fatty acid) are open chains with no rings. That rules them out.\n4. Pregnenolone has the identical four rings: it is cholesterol with its side chain shortened, **27** C − a **6**-carbon piece = **21** C, as in progesterone.\n5. Answer: pregnenolone. Every steroid hormone is cholesterol with its side chain trimmed.\n\n**Rule to reuse:** **Steroids** share one core: four fused rings, three of six carbons and one of five.",
      "id": "p_cpq6_5_q1"
     },
     {
      "q": "If the extract were instead loaded onto a resin carrying negatively charged sulfonate groups, and the bound enzyme were released by raising the NaCl concentration, how would that step best be categorized?",
      "choices": [
       "Cation-exchange chromatography",
       "Affinity chromatography",
       "Anion-exchange chromatography",
       "Size-exclusion chromatography"
      ],
      "ans": 0,
      "cat": "5C",
      "skill": "SIRS 3",
      "diff": "M",
      "twin": "pe5-cp:22",
      "exp": "1. The new resin carries fixed **negative** charges (sulfonate, –SO₃⁻), so it holds proteins by their **positive** groups.\n2. Release by raising NaCl means Na⁺ ions compete for the –SO₃⁻ sites and displace the enzyme: binding was by charge, not by a specific partner.\n3. A negatively charged resin that holds cations is a **cation exchanger**. That rules out \"Anion-exchange chromatography\", which uses a positively charged resin to hold anions.\n4. No metal and no competitor such as imidazole is involved, which rules out \"Affinity chromatography\"; the enzyme binds and is then eluted, which rules out \"Size-exclusion chromatography\". Answer: cation-exchange chromatography.\n\n**Rule to reuse:** name an ion exchanger by the ion it holds: a negative resin holds cations (cation exchange), a positive resin holds anions. Release by salt = ion exchange; release by a competitor = affinity; no binding = size exclusion.",
      "id": "p_cpq6_5_q2"
     },
     {
      "q": "Which additive would best release CYP21A2 from the membranes and hold it in aqueous solution?",
      "choices": [
       "Dodecyl maltoside",
       "Maltose",
       "Dodecane",
       "Tristearin"
      ],
      "ans": 0,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "D",
      "twin": "pe5-cp:23",
      "exp": "1. Two jobs: reach into the nonpolar bilayer and stay in water. That needs a molecule with both kinds of region.\n2. Sort each additive into nonpolar tail and polar head: dodecyl maltoside, tail **C₁₂**, head **7 O–H**; maltose, tail **none**, head **8 O–H**; dodecane, tail **C₁₂**, head **none**; tristearin, **3** C₁₇ tails, head with **no O–H** (only ester groups).\n3. Maltose is all head: it dissolves in water but cannot cover the enzyme's nonpolar membrane anchor. That rules out maltose.\n4. Dodecane and tristearin are all tail: they dissolve in the bilayer, not in water. That rules them out.\n5. Answer: dodecyl maltoside. Its C₁₂ chain coats the hydrophobic anchor, and its sugar head faces the water.\n\n**Rule to reuse:** **Amphipathic:** one molecule with a hydrophobic part (C–C and C–H chains) and a hydrophilic part (O–H groups, charged groups).",
      "id": "p_cpq6_5_q3"
     },
     {
      "q": "To make 250 mL of the elution buffer, what amount of imidazole is required, in moles and in grams?",
      "choices": [
       "0.010 mol; 0.68 g",
       "0.10 mol; 6.8 g",
       "1.0 mol; 68 g",
       "1.6 mol; 110 g"
      ],
      "ans": 1,
      "cat": "5A",
      "skill": "SIRS 2",
      "diff": "D",
      "subj": "gen_chem",
      "twin": "pe5-cp:24",
      "exp": "1. Convert to mol/L and liters first: 400 mM = **0.400 M**; 250 mL = **0.250 L**.\n2. Moles = molarity × volume: n = 0.400 mol/L × 0.250 L = **0.100 mol**.\n3. Mass = moles × molar mass: m = 0.100 mol × 68.1 g/mol ≈ **6.8 g**.\n4. 0.010 and 1.0 mol are factor-of-10 slips; 1.6 mol divides M by V (0.400 ÷ 0.250) instead of multiplying, and 1.6 × 68.1 ≈ 110 g. Answer: 0.10 mol; 6.8 g.\n\n**Rule to reuse:** moles = molarity (mol/L) × volume (L); grams = moles × molar mass. Convert mM → M and mL → L first.",
      "id": "p_cpq6_5_q4"
     },
     {
      "q": "That the purified CYP21A2 is in its native fold is most strongly supported by:",
      "choices": [
       "a single 56-kDa band.",
       "retention of the C-terminal tag.",
       "one symmetric peak per column.",
       "a Km matching adrenal microsomes."
      ],
      "ans": 3,
      "cat": "5D",
      "skill": "SIRS 1",
      "diff": "M",
      "twin": "pe5-cp:25",
      "exp": "1. Native fold means the correct 3-D structure. Look for an observation that would fail if the enzyme were unfolded.\n2. SDS unfolds every protein before it runs, so folded and unfolded enzyme give the same 56-kDa band. That rules out \"a single 56-kDa band.\".\n3. The tag stays on and the enzyme elutes as one peak whether or not it is folded correctly; these report identity and purity, not structure. That rules out \"retention of the C-terminal tag.\" and \"one symmetric peak per column.\".\n4. Turning over progesterone needs a correctly formed active site, and the Km values agree: 2.3 ÷ 2.1 ≈ **1.1**. Answer: a Km matching adrenal microsomes.\n\n**Rule to reuse:** to prove a protein is folded, use a test of function (binding, activity). Mass, tags and purity look the same for unfolded protein.",
      "id": "p_cpq6_5_q5"
     }
    ]
   }
  ],
  "standalones": [
   {
    "q": "An enzyme assay must be held at pH 10.5. Which buffer pKa would be the best choice for this experiment?",
    "choices": [
     "6.1",
     "8.1",
     "10.3",
     "12.4"
    ],
    "ans": 2,
    "cat": "5A",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "sample-cp:57",
    "exp": "1. The target is pH 10.5.\n2. Find each pKa's distance from 10.5: |6.1 − 10.5| = 4.4; |8.1 − 10.5| = 2.4; |10.3 − 10.5| = **0.2** ✓; |12.4 − 10.5| = 1.9.\n3. The pKa values 6.1, 8.1 and 12.4 are more than 1 unit from 10.5, so one form of the buffer would dominate. That rules them out.\n4. Answer: pKa 10.3.\n\n**Rule to reuse:** pick the buffer with pKa within about 1 unit of the target pH, as close as possible.",
    "id": "cp_q6_sa1"
   },
   {
    "q": "A 0.50-kg iron skillet takes in 2700 J while its temperature rises from 20 °C to 32 °C. What is the specific heat of the iron?",
    "choices": [
     "5,400 J/(kg·°C)",
     "450 J/(kg·°C)",
     "225 J/(kg·°C)",
     "104 J/(kg·°C)"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "sample-cp:58",
    "exp": "1. Find ΔT: ΔT = 32 − 20 = **12 °C**.\n2. Solve q = mcΔT for c: c = q ÷ (m × ΔT) = 2700 ÷ (0.50 × 12) = 2700 ÷ 6.0 = **450 J/(kg·°C)**.\n3. \"5,400\" leaves out ΔT (2700 ÷ 0.50). \"104\" divides by 52 °C, the sum of the temperatures, not the change (2700 ÷ 26 ≈ 104), and \"225\" doubles ΔT: 2700 ÷ (0.50 × 24) = 225.\n4. Answer: 450 J/(kg·°C).\n\n**Rule to reuse:** c = q/(mΔT); divide by both the mass and the temperature change.",
    "id": "cp_q6_sa2"
   },
   {
    "q": "Barium-137m, made in a classroom isotope generator, gives off radiation and turns into barium-137; neither its mass number nor its atomic number changes. An electric field does not bend the radiation's path. The emission is best categorized as:",
    "choices": [
     "an alpha particle, with charge +2.",
     "a beta particle, with charge −1.",
     "a gamma ray, with no charge or mass.",
     "a neutron, with one mass unit."
    ],
    "ans": 2,
    "cat": "4E",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe1-cp:46",
    "exp": "1. An electric field does not bend the path → the radiation has no charge. That rules out \"an alpha particle, with charge +2.\" and \"a beta particle, with charge −1.\"\n2. Balance the nuclear equation with A and Z unchanged: ¹³⁷ᵐ₅₆Ba → ¹³⁷₅₆Ba + ?; A: 137 = 137 + **0**; Z: 56 = 56 + **0**; the emission has A = 0, Z = 0 → a γ photon.\n3. A neutron has A = 1; emitting one would give ¹³⁶Ba (¹³⁷Ba → ¹³⁶Ba + ¹₀n, not observed). That rules out \"a neutron, with one mass unit.\"\n4. The 'm' means metastable: an excited nucleus drops to its ground state by releasing a high-energy photon. Answer: a gamma ray, with no charge or mass.\n\n**Rule to reuse:** A and Z both unchanged + no deflection → gamma (photon) from an excited nucleus. Deflected → charged (α, β⁻, β⁺); A drops → α or neutron.",
    "id": "cp_q6_sa3"
   },
   {
    "q": "A cell-culture protocol calls for 2.7 g of urea (M = 60.0 g/mol), added from a 0.150 M urea stock. What volume of the stock solution is needed?",
    "choices": [
     "3.3 L",
     "300 mL",
     "30 mL",
     "6.8 mL"
    ],
    "ans": 1,
    "cat": "5A",
    "skill": "SIRS 3",
    "diff": "D",
    "subj": "gen_chem",
    "twin": "pe1-cp:58",
    "exp": "1. Convert grams to moles: n = 2.7 g ÷ 60.0 g/mol = **0.0450 mol**.\n2. Use molarity = moles ÷ liters, solved for volume: V = n ÷ M = 0.0450 mol ÷ 0.150 mol/L = **0.300 L**.\n3. Convert to mL: 0.300 L × 1000 mL/L = **300 mL**.\n4. Eliminate: \"30 mL\" is off by a factor of 10 in the last conversion; \"3.3 L\" flips the ratio (0.150 ÷ 0.0450 ≈ 3.3), and \"6.8 mL\" multiplies moles × molarity (0.0450 × 0.150 = 0.00675 L). Carry units through every line: g → mol → L → mL.\n5. Answer: 300 mL.\n\n**Rule to reuse:** mass → moles (÷ molar mass) → volume (÷ molarity) → convert units. Write the units every line so a flipped ratio shows itself.",
    "id": "cp_q6_sa4"
   },
   {
    "q": "A lipid-soluble hormone crosses the plasma membrane, binds a receptor inside the cell, and the complex then changes gene transcription. If this messenger is a steroid, which of the following could it be?",
    "choices": [
     "Testosterone",
     "Thyroxine",
     "Epinephrine",
     "Linoleic acid"
    ],
    "ans": 0,
    "cat": "5D",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "biochemistry",
    "twin": "pe3-cp:25",
    "exp": "1. The question fixes the class: a steroid. Look for the steroid ring pattern, not just lipid solubility.\n2. The steroid nucleus is four fused rings, three six-membered and one five-membered. Count the rings in each: steroid core, **6-6-6-5**, four fused rings; thyroxine, **2** benzene rings joined through an O, not fused; epinephrine, **1** benzene ring + amine; linoleic acid, **0** rings.\n3. Epinephrine is a catecholamine: one aromatic ring and an amine, water-soluble. That rules it out.\n4. Linoleic acid is a fatty acid, a long chain ending in COOH with no rings, and thyroxine has two separate rings linked by an ether O. That rules them out.\n5. Testosterone shows the 6-6-6-5 fused core, with a C=O on ring A and an OH on ring D.\n6. Answer: testosterone. Four fused rings, three of six and one of five, means steroid.\n\n**Rule to reuse:** **Steroid nucleus:** four fused rings in a 6-6-6-5 pattern, called A, B, C, D, usually with methyl groups at two ring junctions and an O on ring A.",
    "id": "cp_q6_sa5"
   },
   {
    "q": "Carbon dioxide has its triple point at 5.1 atm and −57 °C. Dry ice in a sealed vessel held at 10 atm is warmed until it reaches −56 °C, where two phases are in equilibrium. Which process occurs at this point?",
    "choices": [
     "Sublimation",
     "Melting",
     "Boiling",
     "Condensation"
    ],
    "ans": 1,
    "cat": "5E",
    "skill": "SIRS 1",
    "diff": "M",
    "subj": "physics",
    "twin": "pe4-cp:27",
    "exp": "1. Note the conditions to locate on the phase diagram: a solid at 10 atm, warmed to −56 °C.\n2. Compare the pressure with the triple point: 10 atm > **5.1 atm**, so the path runs above the triple point, where a warmed solid reaches the solid–liquid line before any other border.\n3. The solid–liquid line rises almost straight up from the triple point (−57 °C), so at 10 atm it is crossed at about −56 °C: solid and liquid coexist there.\n4. Sublimation needs a pressure below 5.1 atm, and boiling and condensation need a liquid on the liquid–gas line, which the solid has not yet reached. That rules out \"Sublimation\", \"Boiling\" and \"Condensation\".\n5. Answer: melting, on the solid–liquid line.\n\n**Rule to reuse:** find the point (T across, P up), see which line it sits on, and name that border. Above the triple-point pressure, a warmed solid melts first; below it, the solid sublimes.",
    "id": "cp_q6_sa6"
   },
   {
    "q": "A plastic cube floats in fresh water (1.0 g/cm³) with three-quarters of its volume submerged. In a second liquid, the same cube floats with exactly half of its volume below the surface. What density must the second liquid have?",
    "choices": [
     "0.38 g/cm³",
     "0.67 g/cm³",
     "0.75 g/cm³",
     "1.5 g/cm³"
    ],
    "ans": 3,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "D",
    "subj": "physics",
    "twin": "pe6-cp:28",
    "exp": "1. Rule for a floating object: fraction submerged = ρ_object ÷ ρ_fluid. In water: 0.75 = ρ_cube ÷ 1.0 g/cm³ → ρ_cube = **0.75 g/cm³**.\n2. Translate the second observation: half submerged means fraction = 0.50.\n3. Apply the same rule in the new liquid: 0.50 = 0.75 g/cm³ ÷ ρ_liquid → ρ_liquid = 0.75 ÷ 0.50 = **1.5 g/cm³**.\n4. In a liquid of 0.75 g/cm³ (equal to the cube's density) the cube would float just fully submerged (fraction 1), not half; \"0.38 g/cm³\" (0.75 × 0.50) and \"0.67 g/cm³\" (0.50 ÷ 0.75) are less dense than the cube, which would sink. That rules them out.\n5. Answer: 1.5 g/cm³. The cube rides higher than in water, so the liquid must be denser than water.\n\n**Rule to reuse:** fraction submerged = ρ_object ÷ ρ_fluid. Floating just fully submerged means the two densities are equal.",
    "id": "cp_q6_sa7"
   },
   {
    "q": "A giraffe's brain sits about 2 m above its heart. Why is the wall of its left ventricle far thicker than that of its right ventricle?",
    "choices": [
     "The left ventricle ejects more blood with each beat than the right",
     "The left ventricle receives blood returning from the head",
     "The left ventricle must generate a far higher pressure",
     "The left ventricle pumps blood that is poor in O₂"
    ],
    "ans": 2,
    "cat": "4B",
    "skill": "SIRS 2",
    "diff": "M",
    "subj": "biology",
    "twin": "pe6-cp:46",
    "exp": "1. Rule: both ventricles eject the same stroke volume each beat, or blood would pile up in one circuit. That rules out \"The left ventricle ejects more blood with each beat than the right\"\n2. Blood returning from the head enters the right atrium through the venae cavae, and the left ventricle pumps oxygenated blood. That rules out \"The left ventricle receives blood returning from the head\" and \"The left ventricle pumps blood that is poor in O₂\"\n3. Compare the pressures each ventricle must reach. Just lifting blood 2 m to the brain takes ρgh = 1050 kg/m³ × 10 m/s² × 2.0 m = **21,000 Pa** ≈ 21,000 ÷ 133 ≈ **160 mmHg**; a giraffe's systemic pressure (≈ 280 mmHg) is about 280 ÷ 30 ≈ **9×** its pulmonary pressure. Wall stress ∝ P·r/h, so higher P needs a thicker wall h.\n4. Answer: the left ventricle must generate a far higher pressure, so it has more muscle.\n\n**Rule to reuse:** heart wall thickness follows the pressure the chamber must generate, not the volume it pumps.",
    "id": "cp_q6_sa8"
   }
  ]
 }
];
