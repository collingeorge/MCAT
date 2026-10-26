// Full-Length Practice Exam 1 — science sections
const EXAM1_CP_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 1: Enzyme Kinetics & Inhibition (Biochem/OChem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_1',
  subj:'biochemistry',
  type:'passage',
  topic:'C/P',
  title:'Carbonic Anhydrase Kinetics and Sulfonamide Inhibition',
  passage:`Carbonic anhydrase (CA) catalyzes the reversible hydration of CO₂: CO₂ + H₂O ⇌ H⁺ + HCO₃⁻. The enzyme contains a Zn²⁺ cofactor in its active site coordinated by three histidine residues. CA is critical for red blood cell CO₂ transport, renal acid-base regulation, and aqueous humor production in the eye.

Researchers investigated the kinetics of bovine CA II using p-nitrophenyl acetate (NPA) as a chromogenic substrate. At pH 7.4 and 25°C, they measured initial velocities at varying [NPA] and found Km = 4.2 mM and kcat = 1.4 × 10⁴ s⁻¹. They then tested acetazolamide, a sulfonamide drug used to treat glaucoma. With 100 nM acetazolamide present, apparent Km increased to 21.0 mM while Vmax was unchanged.

A second inhibitor, dorzolamide, was tested. At 50 nM dorzolamide, both apparent Km and apparent Vmax changed: new Km = 5.1 mM, new Vmax = 0.6 × Vmax. Analysis of a Lineweaver-Burk plot showed the lines intersected to the left of the y-axis, above the x-axis.

The sulfonamide –SO₂NH₂ group coordinates directly to the active site Zn²⁺, displacing the zinc-bound water molecule required for catalysis. Electron-withdrawing substituents on the benzene ring increase the acidity of the sulfonamide NH, enhancing binding affinity to Zn²⁺.`,
  questions:[
    {
      q:"Based on the kinetic data, acetazolamide acts as which type of inhibitor?",
      choices:[
        "Noncompetitive — Vmax decreases while Km is unchanged",
        "Competitive — Km increases while Vmax is unchanged",
        "Uncompetitive — Km and Vmax both decrease by the same factor",
        "Irreversible — enzyme is permanently inactivated, lowering Vmax"
      ],
      ans:1,
      exp:"A **competitive** inhibitor binds the free enzyme's active site reversibly, so enough substrate can outcompete it: Vmax is unchanged while apparent Km rises (here 4.2 → 21.0 mM, a 5-fold increase). This fits the sulfonamide binding the active-site Zn²⁺. A noncompetitive inhibitor would do the opposite (lower Vmax, same Km)."
    },
    {
      q:"Dorzolamide's Lineweaver-Burk intersection pattern (left of y-axis, above x-axis) is diagnostic of which inhibition type?",
      choices:[
        "Competitive — inhibitor binds only the free enzyme",
        "Uncompetitive — inhibitor binds only the ES complex",
        "Mixed — inhibitor binds both free enzyme and the ES complex",
        "Pure noncompetitive — inhibitor binds E and ES with equal affinity"
      ],
      ans:2,
      exp:"On a Lineweaver-Burk plot, competitive lines meet on the y-axis (same Vmax), pure noncompetitive lines meet on the x-axis (same Km), uncompetitive lines are parallel, and **mixed** inhibition lines meet off both axes. Dorzolamide lowers Vmax (0.6×) and raises Km slightly (4.2 → 5.1 mM), so it binds both E and ES, with somewhat higher affinity for free enzyme (which places the intersection above the x-axis)."
    },
    {
      q:"The kcat/Km ratio for CA II acting on NPA is best described as a measure of:",
      choices:[
        "The number of substrate molecules converted per second at saturating substrate",
        "Catalytic efficiency — the rate constant for conversion of substrate at low [S]",
        "The dissociation constant of the enzyme-substrate complex",
        "The substrate concentration that gives half-maximal velocity"
      ],
      ans:1,
      exp:"kcat/Km is **catalytic efficiency**, the apparent second-order rate constant when [S] << Km: v ≈ (kcat/Km)[E][S]. For CA II with NPA, 1.4 × 10⁴ s⁻¹ ÷ 4.2 × 10⁻³ M ≈ 3.3 × 10⁶ M⁻¹s⁻¹. The tempting distractor describes kcat alone (the turnover number at saturation); Km alone is the [S] at half-maximal velocity."
    },
    {
      subj:'organic_chem',
      q:"Electron-withdrawing substituents on the sulfonamide benzene ring increase inhibitor potency by enhancing binding to Zn²⁺. What is the most likely mechanism?",
      choices:[
        "They raise the NH pKa, so more neutral sulfonamide is available to bind Zn²⁺",
        "They lower the NH pKa, so more of the drug is the –SO₂NH⁻ anion that binds Zn²⁺",
        "They increase lipophilicity, so more drug crosses membranes to reach the enzyme",
        "They block oxidative metabolism of the ring, so the drug persists longer"
      ],
      ans:1,
      exp:"Electron-withdrawing groups stabilize the conjugate base (–SO₂NH⁻) by induction and resonance, which **lowers the pKa**. At pH 7.4 a larger fraction is then deprotonated, and the anionic nitrogen coordinates the Lewis-acidic Zn²⁺ more strongly. The distractor reverses the effect: electron-withdrawing groups make an acid stronger, not weaker."
    },
    {
      q:"A researcher adds a sulfonamide with Ki = 0.5 nM and also adds excess CO₂ substrate. Which outcome is most likely?",
      choices:[
        "Inhibition vanishes at any [CO₂] because the Ki is lower than the Km",
        "Inhibition decreases as [CO₂] rises, and velocity approaches the uninhibited Vmax",
        "Inhibition is unchanged because the inhibitor permanently inactivates the enzyme",
        "Vmax falls in proportion to [I] because the inhibitor is noncompetitive"
      ],
      ans:1,
      exp:"For a **competitive** inhibitor, v = Vmax[S]/(Km(1 + [I]/Ki) + [S]); as [S] becomes very large, v approaches Vmax whatever [I] is. A very small Ki means tight but still reversible binding, so it raises the substrate needed but does not make inhibition insurmountable. A small Ki does not mean the inhibitor is displaced easily; it means the opposite."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 2: Fluid Mechanics & Cardiovascular (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_2',
  subj:'physics',
  type:'passage',
  topic:'C/P',
  title:'Stenotic Coronary Artery and Hemodynamic Consequences',
  passage:`A 58-year-old man with hypercholesterolemia has a 70% occlusion (by diameter) of his left anterior descending (LAD) coronary artery due to an atherosclerotic plaque. Coronary angiography reveals the normal LAD diameter of 3.5 mm is reduced to 1.05 mm at the stenosis. At rest, coronary flow velocity in the normal segment is 0.18 m/s.

In the cardiac catheterization lab, the cardiologist measures pressures proximal and distal to the stenosis. Proximal pressure is 95 mmHg; distal pressure is 62 mmHg. The patient undergoes fractional flow reserve (FFR) measurement using adenosine-induced maximal hyperemia, giving FFR = 0.65 (abnormal threshold: <0.80).

The cardiologist explains that the high-velocity jet emerging from the stenosis becomes disturbed and turbulent just downstream of the narrowing, audible as a bruit. The Reynolds number for blood (density 1060 kg/m³, viscosity 3.5 × 10⁻³ Pa·s) in the stenotic segment is calculated to assess flow character. At the stenosis, flow is assumed to be incompressible and conservation of mass applies.

Percutaneous coronary intervention (PCI) with stent placement restores the LAD diameter to 3.2 mm. Post-procedure, flow velocity in the stented segment is measured and the pressure gradient across the previously stenotic region normalizes.`,
  questions:[
    {
      q:"Using the continuity equation, what is the approximate flow velocity at the stenosis?",
      choices:[
        "0.18 m/s — velocity is unchanged because flow rate is conserved",
        "0.60 m/s — velocity rises in proportion to the diameter ratio",
        "2.0 m/s — velocity rises in proportion to the area ratio",
        "6.7 m/s — velocity rises with the cube of the diameter ratio"
      ],
      ans:2,
      exp:"**Continuity**: A₁v₁ = A₂v₂, and area ∝ d². The area ratio is (3.5/1.05)² = (3.33)² ≈ 11.1, so v₂ = 0.18 × 11.1 ≈ 2.0 m/s. The common error is scaling velocity by the diameter ratio (3.33×, giving 0.60 m/s) instead of by its square."
    },
    {
      q:"According to Poiseuille's law, by what factor does the resistance to flow increase as a result of the 70% diameter reduction?",
      choices:[
        "~3-fold — resistance scales with 1/r",
        "~11-fold — resistance scales with 1/r²",
        "~37-fold — resistance scales with 1/r³",
        "~123-fold — resistance scales with 1/r⁴"
      ],
      ans:3,
      exp:"**Poiseuille's law**: R = 8ηL/πr⁴, so resistance ∝ 1/r⁴. The radius ratio r_normal/r_stenosis = 1.75/0.525 = 3.33 (a 70% reduction in radius, the same as the diameter), and (3.33)⁴ ≈ 123. Because of the fourth-power dependence, a 70% narrowing raises segmental resistance more than 100-fold; scaling by area (1/r²) gives only ~11-fold."
    },
    {
      q:"The FFR value of 0.65 means that at maximal hyperemia, the myocardium distal to the stenosis receives what fraction of the flow it would receive without the stenosis?",
      choices:[
        "65% of the maximal flow it would receive without the stenosis",
        "35% of the maximal flow it would receive without the stenosis",
        "65% of the flow it receives at rest, before adenosine",
        "35% of the flow it receives at rest, before adenosine"
      ],
      ans:0,
      exp:"**FFR** = Pd/Pa measured at maximal hyperemia; with microvascular resistance minimized and fixed, flow is proportional to driving pressure, so FFR equals the fraction of normal maximal flow the territory receives. Here 62/95 ≈ 0.65, so 65% of normal maximal flow, below the 0.80 threshold for a hemodynamically significant lesion. A 35% figure is the reduction, not the fraction delivered, and FFR compares maximal flows, not resting flow."
    },
    {
      q:"Post-PCI, the LAD diameter increases from 1.05 mm to 3.2 mm. Assuming Poiseuille flow, by approximately what factor does flow rate increase?",
      choices:[
        "~3× — flow scales with r",
        "~9× — flow scales with r²",
        "~28× — flow scales with r³",
        "~86× — flow scales with r⁴"
      ],
      ans:3,
      exp:"**Poiseuille**: Q = πΔPr⁴/8ηL, so at constant pressure gradient Q ∝ r⁴. The radius ratio is 1.6/0.525 = 3.05 (the same as the diameter ratio 3.2/1.05), and (3.05)⁴ ≈ 86. The ratio is identical whether radii or diameters are used, but forgetting the fourth power (using r²) gives only ~9×."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 3: Electrochemistry & Metabolism (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_3',
  subj:'gen_chem',
  type:'passage',
  topic:'C/P',
  title:'The Electron Transport Chain as an Electrochemical System',
  passage:`The mitochondrial electron transport chain (ETC) can be analyzed as a series of coupled electrochemical half-reactions. Electrons flow from NADH (E°' = −0.32 V) through Complexes I, III, and IV to molecular oxygen (E°' = +0.82 V). The overall reaction is: NADH + ½O₂ + H⁺ → NAD⁺ + H₂O.

The standard free energy change (ΔG°') is related to cell potential by ΔG°' = −nFE°'cell, where n = electrons transferred, F = 96,485 C/mol, and E°'cell = E°'cathode − E°'anode.

Complex IV (cytochrome c oxidase) catalyzes the terminal step: 4 cytochrome c²⁺ + O₂ + 4H⁺ → 4 cytochrome c³⁺ + 2H₂O. This complex pumps 4 protons across the inner mitochondrial membrane per O₂ reduced. The resulting proton gradient (approximately 200 mV, outside positive) drives ATP synthase (Complex V), which produces approximately 2.5 ATP per NADH oxidized.

Researchers treated isolated mitochondria with cyanide (CN⁻), which binds with high affinity to the Fe³⁺ form of cytochrome a₃ in Complex IV, blocking electron transfer to O₂. They observed immediate cessation of oxygen consumption and complete collapse of the proton gradient within minutes. Uncouplers such as 2,4-dinitrophenol (DNP) dissipate the proton gradient by carrying H⁺ across the inner membrane, resulting in heat generation without ATP synthesis.`,
  questions:[
    {
      q:"Calculate the standard cell potential (E°'cell) for the overall NADH oxidation by O₂:",
      choices:[
        "+0.50 V",
        "+1.14 V",
        "−1.14 V",
        "+0.32 V"
      ],
      ans:1,
      exp:"E°'cell = E°'cathode − E°'anode. O₂ accepts electrons (cathode, +0.82 V) and NADH donates them (anode, −0.32 V), so E°'cell = +0.82 − (−0.32) = **+1.14 V**. Simply adding the two numbers as written gives the tempting +0.50 V; reversing cathode and anode gives −1.14 V, which would wrongly imply a non-spontaneous reaction."
    },
    {
      q:"Using ΔG°' = −nFE°'cell with n = 2 electrons per NADH, calculate the standard free energy change for NADH oxidation:",
      choices:[
        "−96 kJ/mol",
        "−110 kJ/mol",
        "−220 kJ/mol",
        "+220 kJ/mol"
      ],
      ans:2,
      exp:"ΔG°' = −nFE°'cell = −(2)(96,485 C/mol)(1.14 V) ≈ −220,000 J/mol = **−220 kJ/mol**. Using n = 1 gives −110 kJ/mol, and dropping the negative sign gives +220 kJ/mol. Since ATP synthesis needs about +30 kJ/mol, this is enough for ~7 ATP in principle, though only ~2.5 ATP per NADH are made in practice."
    },
    {
      subj:'biochemistry',
      q:"Cyanide inhibits Complex IV by binding Fe³⁺ in cytochrome a₃. What is the immediate downstream consequence for the proton gradient?",
      choices:[
        "It increases, because protons accumulate in the matrix",
        "It dissipates, because pumping stops while proton re-entry continues",
        "It is fully maintained, because ATP synthase reverses to pump protons",
        "It is unaffected, because Complexes I and III keep pumping"
      ],
      ans:1,
      exp:"Electron flow and proton pumping are coupled. When cyanide blocks Complex IV, electrons back up and Complexes I and III also stop, so **all pumping ceases**, while protons keep re-entering the matrix through ATP synthase and leak pathways. The gradient therefore collapses, as the passage reports. Complexes I and III cannot keep pumping because their electrons have nowhere to go."
    },
    {
      subj:'biochemistry',
      q:"DNP acts as a protonophore, dissipating the proton gradient without blocking the ETC. Which observation would best confirm DNP's mechanism?",
      choices:[
        "Decreased O₂ consumption with decreased ATP synthesis",
        "Increased O₂ consumption and heat with decreased ATP synthesis",
        "Increased O₂ consumption with increased ATP synthesis",
        "Unchanged O₂ consumption with decreased ATP synthesis"
      ],
      ans:1,
      exp:"An **uncoupler** lets protons bypass ATP synthase. With no back-pressure from the gradient, the ETC runs faster (O₂ consumption rises), but the energy is released as heat instead of being captured as ATP. Decreased O₂ consumption with low ATP is the pattern of an ETC inhibitor (like cyanide) or an ATP synthase inhibitor (like oligomycin), not an uncoupler."
    },
    {
      q:"If the proton gradient across the inner mitochondrial membrane is approximately 200 mV (outside positive), and ATP synthesis requires proton translocation, what is the minimum number of protons that must pass through ATP synthase to provide enough energy to synthesize one ATP (ΔG = +30 kJ/mol under cellular conditions)?",
      choices:[
        "1 proton, since each mole of protons supplies about 30 kJ",
        "2 protons, since each mole of protons supplies about 19 kJ",
        "3 protons, since each mole of protons supplies about 10 kJ",
        "10 protons, since each mole of protons supplies about 3 kJ"
      ],
      ans:1,
      exp:"Energy per mole of protons crossing 200 mV: FΔψ = 96,485 × 0.200 ≈ **19.3 kJ/mol**. One proton (19.3 kJ/mol) falls short of 30 kJ/mol, but two (≈ 38.6 kJ/mol) are enough, so the thermodynamic minimum is 2. The real enzyme uses more (about 2.7 H⁺ per ATP with the mammalian c8 ring, plus ~1 H⁺ for ADP/Pi transport), but the question asks only for the minimum implied by the given values."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 4: Acid-Base & Buffer (Gen Chem/Biochem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_4',
  subj:'gen_chem',
  type:'passage',
  topic:'C/P',
  title:'Arterial Blood Gas Analysis in a Critically Ill Patient',
  passage:`A 72-year-old woman with long-standing COPD and chronic CO₂ retention is admitted to the ICU with worsening respiratory failure. Arterial blood gas (ABG) analysis reveals: pH 7.29, PaCO₂ 72 mmHg, HCO₃⁻ 34 mEq/L, PaO₂ 48 mmHg on room air. The laboratory notes that the bicarbonate buffer system (H₂CO₃/HCO₃⁻) is the principal extracellular buffer, with pKa = 6.1.

The Henderson-Hasselbalch equation for this system is: pH = 6.1 + log([HCO₃⁻]/[H₂CO₃]). The dissolved CO₂ concentration is related to PaCO₂ by: [H₂CO₃] ≈ [CO₂(dissolved)] = 0.0307 × PaCO₂ (mmHg), giving units of mEq/L.

The patient is placed on mechanical ventilation. Over the next 4 hours, PaCO₂ decreases to 45 mmHg. The ICU team anticipates that rapid CO₂ correction will cause post-hypercapnic metabolic alkalosis because the kidneys had been retaining bicarbonate to compensate for the chronic hypercapnia, and this compensation cannot be immediately reversed.

A second patient has diabetic ketoacidosis with HCO₃⁻ 8 mEq/L. This patient's respiratory compensation (Kussmaul breathing) lowers PaCO₂ to 24 mmHg to partially restore pH toward normal.`,
  questions:[
    {
      q:"Using the Henderson-Hasselbalch equation, calculate [H₂CO₃] for the first patient, then determine the HCO₃⁻/H₂CO₃ ratio:",
      choices:[
        "[H₂CO₃] = 2.21 mEq/L; ratio = 0.065",
        "[H₂CO₃] = 2.21 mEq/L; ratio = 15.4",
        "[H₂CO₃] = 2.21 mEq/L; ratio = 20",
        "[H₂CO₃] = 1.38 mEq/L; ratio = 24.6"
      ],
      ans:1,
      exp:"[H₂CO₃] = 0.0307 × 72 = 2.21 mEq/L, and [HCO₃⁻]/[H₂CO₃] = 34/2.21 ≈ **15.4**. Check: pH = 6.1 + log(15.4) = 6.1 + 1.19 = 7.29, matching the ABG. The normal ratio is 20:1 (pH 7.40); inverting the ratio (2.21/34) is a common slip, and 1.38 mEq/L would correspond to a PaCO₂ of 45, not 72."
    },
    {
      q:"The first patient's acid-base disorder is best classified as:",
      choices:[
        "Primary metabolic acidosis with respiratory compensation",
        "Primary respiratory acidosis with renal (metabolic) compensation",
        "Combined respiratory and metabolic acidosis",
        "Primary metabolic alkalosis with respiratory compensation"
      ],
      ans:1,
      exp:"pH is low and PaCO₂ is high (72 vs. normal 35–45 mmHg), so the primary disorder is **respiratory acidosis**. HCO₃⁻ is elevated, not low, which rules out a metabolic acidosis and reflects renal bicarbonate retention. In chronic respiratory acidosis HCO₃⁻ rises ~3.5 mEq/L per 10 mmHg PaCO₂: 24 + 3.5 × 3.2 ≈ 35 mEq/L, close to the measured 34, so this is a compensated chronic process (acute buffering alone would give only ~27)."
    },
    {
      q:"After rapid correction of PaCO₂ from 72 to 45 mmHg, with HCO₃⁻ remaining at 34 mEq/L, what is the new blood pH?",
      choices:[
        "About 7.20 — lowering CO₂ is acidifying",
        "About 7.29 — pH is unchanged because HCO₃⁻ falls in parallel",
        "About 7.40 — pH returns exactly to normal",
        "About 7.49 — the retained HCO₃⁻ now causes alkalemia"
      ],
      ans:3,
      exp:"[H₂CO₃] = 0.0307 × 45 = 1.38 mEq/L; ratio = 34/1.38 ≈ 24.6; pH = 6.1 + log(24.6) = 6.1 + 1.39 ≈ **7.49**. The bicarbonate the kidneys retained to offset chronic hypercapnia is now unopposed, producing the **post-hypercapnic metabolic alkalosis** the team anticipated. HCO₃⁻ cannot fall in parallel because the kidneys need 24–48 hours to excrete the excess."
    },
    {
      q:"In the DKA patient, Kussmaul breathing reduces PaCO₂ to 24 mmHg as respiratory compensation. Using pH = 6.1 + log([HCO₃⁻]/(0.0307 × PaCO₂)), what is the compensated pH?",
      choices:[
        "pH 7.00",
        "pH 7.14",
        "pH 7.26",
        "pH 7.40"
      ],
      ans:1,
      exp:"[H₂CO₃] = 0.0307 × 24 = 0.737 mEq/L; ratio = 8/0.737 ≈ 10.9; pH = 6.1 + log(10.9) ≈ 6.1 + 1.04 = **7.14**. Compensation for metabolic acidosis is never complete, because the stimulus to hyperventilate (acidemia sensed by peripheral and central chemoreceptors) wanes as pH approaches normal, so 7.40 is not reached. **Winter's formula** predicts PaCO₂ = 1.5 × 8 + 8 ± 2 = 18–22 mmHg; the measured 24 mmHg is slightly above this range, suggesting incomplete compensation or a mild coexisting respiratory acidosis."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 5: Light & Optics (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_5',
  subj:'physics',
  type:'passage',
  topic:'C/P',
  title:'Fiber Optic Bronchoscopy and Total Internal Reflection',
  passage:`Flexible bronchoscopy uses fiber optic cables to visualize the tracheobronchial tree. Each optical fiber consists of a high-refractive-index glass core (n_core = 1.62) surrounded by a lower-refractive-index cladding (n_clad = 1.52). Light undergoes total internal reflection at the core-cladding interface, allowing transmission around bends with minimal loss.

The critical angle (θ_c) for total internal reflection is given by: sin(θ_c) = n_clad/n_core. Light rays incident on the core-cladding interface at angles greater than θ_c are totally internally reflected and transmitted through the fiber.

The bronchoscope also incorporates a working channel for bronchoalveolar lavage (BAL) and biopsy forceps. A xenon light source (λ = 400-700 nm, visible spectrum) transmits through the fiber bundle. The glass used in these fibers absorbs strongly at wavelengths shorter than about 300 nm. Tissue fluorescence can be detected by switching to a narrow-band UV source; dysplastic bronchial tissue shows reduced autofluorescence at 480 nm compared to normal tissue.

During the procedure, the bronchoscopist notices that when a laser pointer (λ = 632 nm) is shone directly through the working channel at a shallow angle relative to the fiber axis, the beam undergoes total internal reflection and is successfully transmitted. However, a beam directed at a steep angle (nearly perpendicular to the fiber axis) partially escapes through the cladding.`,
  questions:[
    {
      q:"Calculate the critical angle for total internal reflection at the core-cladding interface:",
      choices:[
        "θ_c = sin⁻¹(1.52/1.62) ≈ 70°",
        "θ_c = cos⁻¹(1.52/1.62) ≈ 20°",
        "θ_c = tan⁻¹(1.52/1.62) ≈ 43°",
        "θ_c = sin⁻¹(1.52/1.62) ≈ 20°"
      ],
      ans:0,
      exp:"sin θ_c = n_clad/n_core = 1.52/1.62 = 0.938, so θ_c = sin⁻¹(0.938) ≈ **70°** (69.7°), measured from the normal to the interface. Rays striking the interface at more than 70° from the normal are totally reflected. The 20° value is the complement, which is the angle from the interface surface rather than from the normal."
    },
    {
      q:"A light ray travels in the core and strikes the interface at 75°. What happens?",
      choices:[
        "It is fully refracted into the cladding",
        "It is totally internally reflected and stays in the core",
        "It travels along the interface at 90° to the normal",
        "It is partly reflected and partly refracted into the cladding"
      ],
      ans:1,
      exp:"**Total internal reflection** requires light going from higher to lower n (core 1.62 → cladding 1.52) at an incidence angle greater than θ_c. Since 75° > 69.7°, all the light is reflected back into the core. Partial reflection with partial refraction happens only below the critical angle, and the refracted ray grazes the interface only at exactly θ_c."
    },
    {
      q:"The bronchoscope detects reduced autofluorescence at 480 nm in dysplastic tissue. The emitted fluorescence has a longer wavelength than the excitation UV source. This Stokes shift occurs because:",
      choices:[
        "Excited fluorophores lose some energy as heat before emitting a lower-energy photon",
        "Tissue reflects longer wavelengths more strongly than it reflects shorter ones",
        "Excited fluorophores absorb a second photon before emitting a higher-energy photon",
        "Longer-wavelength photons penetrate deeper and so are detected preferentially"
      ],
      ans:0,
      exp:"In fluorescence, absorption of a UV photon promotes an electron to an excited state; rapid **non-radiative vibrational relaxation** dissipates part of that energy as heat before emission. The emitted photon therefore has less energy and, by E = hc/λ, a longer wavelength (the **Stokes shift**). Tissue fluorophores such as NADH, FAD and collagen give the ~480 nm signal; reflection does not change a photon's wavelength, so it cannot explain the shift."
    },
    {
      q:"If the xenon light source were replaced with one emitting only λ = 200 nm (deep UV), what would happen to the fiber transmission?",
      choices:[
        "It would improve, because shorter wavelengths reflect internally more efficiently",
        "It would fall sharply, because the fiber glass absorbs light below about 300 nm",
        "It would be unchanged, because total internal reflection is wavelength-independent",
        "It would improve, because shorter wavelengths travel faster in glass"
      ],
      ans:1,
      exp:"Total internal reflection geometry is nearly wavelength-independent, but transmission also depends on **material absorption**. As the passage states, the fiber glass absorbs strongly below ~300 nm, so a 200 nm photon (E = hc/λ ≈ 6.2 eV) would be absorbed and could photodegrade the core. That is why the tempting unchanged answer is wrong; deep-UV delivery requires special high-purity fused-silica fibers."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 6: Reaction Mechanisms & Organic Chemistry
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_6',
  subj:'organic_chem',
  type:'passage',
  topic:'C/P',
  title:'Aspirin Synthesis and Hydrolysis Kinetics',
  passage:`Aspirin (acetylsalicylic acid) is synthesized by acetylation of salicylic acid with acetic anhydride, catalyzed by phosphoric acid. The reaction proceeds via nucleophilic acyl substitution: the phenolic –OH of salicylic acid attacks the electrophilic carbonyl carbon of acetic anhydride, forming a tetrahedral intermediate that collapses to release acetate.

The crude product is purified by recrystallization from ethanol/water. The melting point of pure aspirin is 135°C; impure samples melt at lower temperatures with a broader range.

Aspirin undergoes hydrolysis in aqueous solution via two pathways. At low pH, acid-catalyzed hydrolysis proceeds slowly. At pH > 9, base-catalyzed hydrolysis becomes the dominant pathway: the acetyl group is cleaved to regenerate salicylate and acetate. The rate of base-catalyzed hydrolysis follows: rate = k[aspirin][OH⁻], where k = 1.5 × 10⁻² L/mol·s at 37°C.

Pharmacologically, aspirin irreversibly acetylates the serine-530 residue of cyclooxygenase (COX), blocking arachidonic acid binding and prostaglandin synthesis. Unlike most NSAIDs that reversibly inhibit COX, aspirin's covalent modification means antiplatelet effects persist for the platelet's lifetime (~10 days), since platelets lack nuclei and cannot synthesize new COX.`,
  questions:[
    {
      q:"In the synthesis of aspirin, acetic anhydride reacts with the phenolic –OH of salicylic acid. What is the role of the phenolic oxygen in this reaction?",
      choices:[
        "Electrophile — it accepts an electron pair from the anhydride carbonyl",
        "Nucleophile — its lone pair attacks the anhydride carbonyl carbon",
        "Leaving group — it departs from the tetrahedral intermediate",
        "Acid catalyst — it protonates the anhydride to activate it"
      ],
      ans:1,
      exp:"In **nucleophilic acyl substitution**, the phenolic oxygen uses a lone pair to attack the electrophilic carbonyl carbon of acetic anhydride, forming a tetrahedral intermediate. That intermediate collapses and expels acetate (the leaving group), giving aspirin and acetic acid. Phosphoric acid, not the phenol, is the acid catalyst."
    },
    {
      q:"A student synthesizes aspirin and obtains a melting point of 120-128°C. What does this indicate?",
      choices:[
        "The product is pure aspirin within normal experimental error",
        "The product is impure aspirin, likely containing unreacted salicylic acid",
        "The product has been completely hydrolyzed to salicylic acid",
        "The product is pure aspirin in a lower-melting crystal form"
      ],
      ans:1,
      exp:"Pure compounds melt sharply over ≤ 2°C. **Impurities** disrupt the crystal lattice, so the mixture melts lower and over a broader range (melting point depression, analogous to freezing point depression). A 120–128°C range, well below 135°C, signals an impure product, most likely with unreacted salicylic acid. Complete hydrolysis would give salicylic acid itself, which melts higher (~159°C), not lower."
    },
    {
      subj:'gen_chem',
      q:"At pH 9.0, [OH⁻] = 10⁻⁵ M. Using rate = k[aspirin][OH⁻], if [aspirin] = 0.01 M, what is the initial rate of hydrolysis?",
      choices:[
        "1.5 × 10⁻⁷ mol/L·s",
        "1.5 × 10⁻⁹ mol/L·s",
        "1.5 × 10⁻⁵ mol/L·s",
        "1.5 × 10⁻¹¹ mol/L·s"
      ],
      ans:1,
      exp:"rate = k[aspirin][OH⁻] = (1.5 × 10⁻² M⁻¹s⁻¹)(1 × 10⁻² M)(1 × 10⁻⁵ M) = **1.5 × 10⁻⁹ M/s**. The reaction is second order overall (first order in each reactant). Omitting [aspirin] gives 1.5 × 10⁻⁷; at pH 7.4, [OH⁻] ≈ 2.5 × 10⁻⁷ M, so base-catalyzed hydrolysis would be ~40× slower than at pH 9."
    },
    {
      subj:'biochemistry',
      q:"Aspirin irreversibly acetylates COX at Ser-530. Which amino acid property makes serine an effective target for aspirin's acyl transfer?",
      choices:[
        "Its side-chain carboxyl group acts as a nucleophile",
        "Its side-chain hydroxyl group acts as a nucleophile",
        "Its positively charged side chain attracts aspirin",
        "Its side-chain thiol group acts as a nucleophile"
      ],
      ans:1,
      exp:"Serine's side chain is a primary **–OH**, a nucleophile like the phenol in aspirin synthesis. Ser-530 attacks aspirin's ester carbonyl, the acetyl group transfers to the serine oxygen (forming an ester), and salicylate is released. The acetylated serine blocks arachidonic acid access, and because the ester is stable, inhibition lasts until new COX is made. Serine has no carboxyl, thiol (that is cysteine) or charged side chain."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 7: Thermodynamics & Protein Folding (Gen Chem/Biochem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_7',
  subj:'gen_chem',
  type:'passage',
  topic:'C/P',
  title:'Thermodynamics of Protein Denaturation',
  passage:`Protein folding is governed by thermodynamic principles. The Gibbs free energy change for folding, ΔG_fold = ΔH_fold − TΔS_fold, determines whether the native state is thermodynamically favored. For a typical globular protein like lysozyme, ΔH_fold ≈ −400 kJ/mol (favorable, due to hydrogen bonds and van der Waals interactions) and ΔS_fold ≈ −1.2 kJ/mol·K at 310 K (unfavorable, because the chain's loss of conformational freedom outweighs the entropy gained when ordered water is released from buried hydrophobic surfaces).

Differential scanning calorimetry (DSC) measures heat capacity (Cp) as a function of temperature. A DSC thermogram of lysozyme in phosphate buffer (pH 7.0) shows a sharp endothermic peak at Tm = 72°C. The area under the peak gives ΔH_cal = 510 kJ/mol. At Tm, ΔG_unfold = 0 (equilibrium between folded and unfolded states), so ΔS_unfold = ΔH_unfold/Tm. Because unfolding raises the protein's heat capacity, ΔH and ΔS both vary with temperature, so the values at Tm differ from those at 310 K.

Researchers examined the effect of chemical denaturants. Guanidinium chloride (GdmCl) at 6 M completely unfolds lysozyme at 25°C. Urea at 8 M achieves similar unfolding. Both compounds disrupt hydrophobic interactions and hydrogen bonds with water. The m-value (cooperativity parameter) for GdmCl denaturation is 6.8 kJ/mol·M.

A mutant lysozyme with a disulfide bond between residues 3 and 97 (wild-type lacks this bond) shows Tm = 88°C.`,
  questions:[
    {
      q:"At 37°C (310 K), calculate ΔG_fold for lysozyme using the given values:",
      choices:[
        "−772 kJ/mol; folding is very strongly favored",
        "−28 kJ/mol; folding is favored but only marginally",
        "+28 kJ/mol; unfolding is favored",
        "+772 kJ/mol; unfolding is strongly favored"
      ],
      ans:1,
      exp:"ΔG = ΔH − TΔS = −400 − (310)(−1.2) = −400 + 372 = **−28 kJ/mol**, so folding is spontaneous but only marginally. The large unfavorable −TΔS term (from the chain's loss of conformational freedom) nearly cancels the favorable enthalpy from hydrogen bonds and van der Waals contacts. Treating ΔS as +1.2 gives −772 kJ/mol, the most common sign error. This small margin is why modest heat or denaturant can unfold proteins."
    },
    {
      q:"At Tm = 72°C (345 K), ΔG_unfold = 0. Calculate ΔS_unfold using ΔH_cal = 510 kJ/mol:",
      choices:[
        "1.48 kJ/mol·K",
        "0.68 kJ/mol·K",
        "7.08 kJ/mol·K",
        "−1.48 kJ/mol·K"
      ],
      ans:0,
      exp:"At Tm, ΔG = ΔH − TΔS = 0, so ΔS_unfold = ΔH/Tm = 510 kJ/mol ÷ 345 K = **1.48 kJ/mol·K**. Inverting the ratio gives 0.68, and using 72 instead of 345 K gives 7.08 (always use kelvin). The value is positive because unfolding frees the chain's conformations, which is why high temperature (large TΔS) eventually favors the unfolded state."
    },
    {
      q:"The mutant lysozyme with an engineered disulfide bond has Tm = 88°C vs. 72°C for wild-type. Which thermodynamic parameter is most directly responsible?",
      choices:[
        "A larger ΔH_unfold, because the S–S bond must be broken during unfolding",
        "A smaller ΔS_unfold, because the cross-link restricts the unfolded chain",
        "A larger ΔS_unfold, because the cross-link releases more ordered water",
        "A smaller ΔH_unfold, because the cross-link strains the native structure"
      ],
      ans:1,
      exp:"Thermal unfolding does not break the S–S bond, so its main effect is on the unfolded state: the cross-linked chain can adopt far fewer conformations, which **lowers ΔS_unfold**. Because Tm = ΔH_unfold/ΔS_unfold, a smaller entropy gain raises Tm. The tempting enthalpic answer is wrong because the covalent bond remains intact in both states; disulfide stabilization is mainly entropic."
    },
    {
      q:"The m-value of 6.8 kJ/mol·M for GdmCl means that each molar unit of GdmCl destabilizes lysozyme by 6.8 kJ/mol. If ΔG_fold in the absence of denaturant at 25°C is −30 kJ/mol, at what [GdmCl] is the midpoint concentration Cm (ΔG = 0)?",
      choices:[
        "0.23 M",
        "4.4 M",
        "6.0 M",
        "8.8 M"
      ],
      ans:1,
      exp:"Linear extrapolation model: ΔG_unfold([GdmCl]) = ΔG_unfold(water) − m[GdmCl] = 30 − 6.8[GdmCl] (equivalently ΔG_fold = −30 + 6.8[GdmCl]). At the midpoint ΔG = 0, so Cm = 30/6.8 ≈ **4.4 M**, where the protein is 50% folded. Inverting the ratio gives 0.23 M; 6.0 M is where the passage reports essentially complete unfolding, which lies beyond the midpoint."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 8: Atomic Structure & Spectroscopy (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_8',
  subj:'gen_chem',
  type:'passage',
  topic:'C/P',
  title:'X-ray Fluorescence in Clinical Chemistry and Toxicology',
  passage:`X-ray fluorescence (XRF) is used clinically to measure heavy metal concentrations in bone and blood. When a high-energy X-ray photon is absorbed by an atom, it ejects an inner-shell electron (photoelectric effect), creating a core hole. An outer-shell electron fills the vacancy, emitting a characteristic X-ray photon whose energy equals the difference between the two electronic energy levels.

For lead (Pb, Z = 82), the Kα emission (L→K transition) occurs at 72.8 keV, making XRF highly selective for Pb. In the K-XRF method used in occupational lead exposure assessment, the 109Cd source irradiates the tibia, and the detector measures the Pb Kα peak intensity, which is proportional to bone lead concentration.

A 52-year-old former smelter worker undergoes bone XRF. His tibial lead concentration is 58 μg Pb/g bone mineral (reference < 10 μg/g). Blood lead level is 22 μg/dL. The clinician explains that bone lead represents cumulative lifetime exposure (half-life in cortical bone: roughly 10–30 years; 10 years is used for this patient's estimates) while blood lead reflects recent exposure.

A separate study used XRF to detect zinc (Zn, Z = 30) in metallothionein-bound protein fractions. Zinc's Kα emission energy is 8.6 keV — much lower than Pb's because zinc's smaller nuclear charge (Z = 30 vs. 82) binds its inner-shell electrons far less tightly, giving a smaller K–L energy gap.`,
  questions:[
    {
      q:"In XRF, after a K-shell electron is ejected, an L-shell electron fills the vacancy. The emitted Kα X-ray photon has energy equal to:",
      choices:[
        "The K-shell binding energy alone",
        "The incident photon energy minus the K-shell binding energy",
        "The K-shell binding energy minus the L-shell binding energy",
        "The sum of the K-shell and L-shell binding energies"
      ],
      ans:2,
      exp:"K electrons are bound more tightly than L electrons. When an L electron drops into the K vacancy, it loses exactly the **difference in binding energies** (E_K − E_L), emitted as the Kα photon (72.8 keV for Pb). The incident energy minus the K binding energy is the kinetic energy of the ejected photoelectron, not the fluorescent photon."
    },
    {
      q:"Why is the Kα emission energy of zinc (8.6 keV) much lower than that of lead (72.8 keV)?",
      choices:[
        "Zinc's lower nuclear charge binds its inner electrons less tightly",
        "Zinc has fewer electron shells, so its orbitals are closer together",
        "Zinc's K-shell electrons occupy a higher principal quantum number",
        "Zinc's outer electrons shield its K shell more than lead's do"
      ],
      ans:0,
      exp:"By **Moseley's law**, Kα frequency scales with (Z − 1)². Lead's 82 protons hold its K and L electrons far more tightly than zinc's 30, so the K–L gap is much larger: 8.6 × (81/29)² ≈ 67 keV, close to the observed 72.8 keV. The number of shells is not the cause; the K–L gap is set mainly by nuclear charge, and the K shell is always n = 1."
    },
    {
      subj:'physics',
      q:"The patient's tibial bone lead is 58 μg/g with a half-life of 10 years. Approximately how many years ago did his peak exposure occur if bone lead stores have been decreasing for 2 half-lives since peak exposure?",
      choices:[
        "5 years ago",
        "10 years ago",
        "20 years ago",
        "40 years ago"
      ],
      ans:2,
      exp:"Elapsed time = number of half-lives × half-life = 2 × 10 years = **20 years**. After two half-lives the concentration is (½)² = ¼ of the peak, so the peak was about 4 × 58 ≈ 232 μg/g. Choosing 40 years confuses the quarter-remaining fraction with four half-lives."
    },
    {
      q:"XRF is described as highly selective for lead because Pb Kα emission is at 72.8 keV. Which property of this emission energy provides selectivity?",
      choices:[
        "The energy is high enough that all detectors register it with no background",
        "The energy is fixed by lead's nuclear charge, far from other elements' lines",
        "The photon penetrates soft tissue but is fully absorbed by bone",
        "The high energy makes the measurement immune to bone-mineral matrix effects"
      ],
      ans:1,
      exp:"Characteristic X-ray energies are set by atomic number, so each element's lines are a fingerprint. Major bone elements (Ca, Z = 20; P, Z = 15) emit Kα photons below 4 keV, far from Pb's 72.8 keV, so the **lead peak is spectrally isolated** and can be quantified in a complex matrix. High energy helps the photons escape bone but does not by itself eliminate background or matrix corrections."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 9: Circuits & Bioelectricity (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_9',
  subj:'physics',
  type:'passage',
  topic:'C/P',
  title:'Cardiac Pacemakers and Electrical Circuit Principles',
  passage:`A permanent cardiac pacemaker consists of a pulse generator (battery + circuitry) connected to one or more leads with electrode tips in cardiac chambers. The device delivers a defined voltage pulse (typically 0.5–5.0 V, 0.4–1.5 ms duration) to depolarize myocardial tissue when intrinsic cardiac activity is absent.

The pacemaker circuit can be modeled as a simplified RC circuit: the battery (V = 3.2 V, internal resistance r = 100 Ω) drives current through the lead resistance (R_lead = 500 Ω) and the electrode-tissue interface, which acts as a capacitor (C = 1.0 μF) in parallel with a resistance representing ion conduction through tissue (R_tissue = 1000 Ω).

Modern pacemakers operate at a nominal rate of 60 ppm. Battery longevity is proportional to battery capacity ÷ (energy per pulse × pulse rate). A typical battery contains 1.0 Ah of charge at 3.2 V. The pacing threshold (minimum pulse energy to reliably capture the myocardium) is 1.5 μJ per pulse.

A patient's pacing threshold increases due to fibrosis at the lead tip. The device automatically increases output voltage from 2.5 V to 5.0 V to maintain reliable pacing, which reduces battery longevity. The device stores an interrogation log showing impedance trends over time.`,
  questions:[
    {
      q:"In the simplified circuit, the total series resistance is R_lead + r = 600 Ω with R_tissue in parallel with C. At the beginning of a pulse (capacitor uncharged), what is the initial current from the battery?",
      choices:[
        "32 mA — only the battery's internal resistance limits the current",
        "2.0 mA — all three resistances act in series",
        "5.3 mA — the uncharged capacitor bypasses R_tissue",
        "3.2 mA — only R_tissue limits the current"
      ],
      ans:2,
      exp:"At t = 0 an **uncharged capacitor acts as a short circuit** (no voltage across it), so it bypasses the parallel R_tissue. The only resistance left is r + R_lead = 100 + 500 = 600 Ω, giving I = 3.2/600 ≈ 5.3 mA. Treating all resistors as in series (2.0 mA) describes the steady state after the capacitor has charged, not the first instant."
    },
    {
      q:"At steady state (capacitor fully charged), what current flows through the R_tissue branch?",
      choices:[
        "2.0 mA — all three resistances now act in series",
        "5.3 mA — the current stays at its initial value",
        "3.2 mA — the current is set by R_tissue alone",
        "0 mA — a fully charged capacitor blocks all current in the circuit"
      ],
      ans:0,
      exp:"Once the capacitor is fully charged it passes no DC current, but it sits in **parallel** with R_tissue, so current still flows through the tissue branch. The circuit is then r + R_lead + R_tissue = 1600 Ω in series: I = 3.2/1600 = 2.0 mA, and the capacitor holds V = 2.0 mA × 1000 Ω = 2.0 V. The 0 mA answer would be true only if the capacitor were in series with the whole circuit."
    },
    {
      q:"The pacing threshold is 1.5 μJ per pulse at 60 ppm. Doubling output voltage from 2.5 V to 5.0 V to overcome fibrosis increases pulse energy by what factor?",
      choices:[
        "2×, because energy is proportional to voltage",
        "4×, because energy is proportional to voltage squared",
        "8×, because energy is proportional to voltage cubed",
        "1×, because energy depends only on pulse duration"
      ],
      ans:1,
      exp:"For a fixed load and pulse width, energy delivered is E = V²t/R (and a capacitor stores ½CV²), so **E ∝ V²**. Doubling voltage from 2.5 to 5.0 V quadruples energy per pulse, which by the passage's longevity relationship cuts pacing-related battery life to about a quarter. Assuming energy ∝ V (2×) overlooks that current also doubles."
    },
    {
      q:"A pacemaker battery holds 1.0 Ah at 3.2 V. If pacing pulses alone (2.0 μJ per pulse at 60 ppm) drained the battery, approximately how long would it last?",
      choices:[
        "~1.8 years",
        "~18 years",
        "~180 years",
        "~1,800 years"
      ],
      ans:2,
      exp:"Battery energy = 1.0 Ah × 3.2 V = 3.2 Wh = 3.2 × 3600 J = 11,520 J. Pulses per year = 60/min × 525,600 min ≈ 3.15 × 10⁷, so pacing uses 3.15 × 10⁷ × 2 × 10⁻⁶ J ≈ 63 J/yr, and 11,520/63 ≈ **183 years**. Real devices last ~7–12 years because sensing circuitry, telemetry and conversion losses use most of the battery's energy, which is why the realistic-sounding ~18 years is not what these numbers give."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// C/P PASSAGE 10: Nuclear Decay & Radiation (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cp_10',
  subj:'physics',
  type:'passage',
  topic:'C/P',
  title:'PET Scanning and Positron-Electron Annihilation',
  passage:`Positron emission tomography (PET) exploits β⁺ decay of isotopes such as ¹⁸F (t₁/₂ = 109.8 min). ¹⁸F is incorporated into fluorodeoxyglucose (FDG), which accumulates in metabolically active tissues. The ¹⁸F nucleus undergoes β⁺ decay: ¹⁸F → ¹⁸O + e⁺ + ν_e. The positron (e⁺) travels a few millimeters in tissue before annihilating with an electron, producing two 511 keV gamma rays emitted in exactly opposite directions (180°).

The PET scanner uses coincidence detection: only events where two detectors fire simultaneously (~nanosecond window) are recorded. The line between the two fired detectors defines the line of response (LOR), and filtered back-projection reconstructs the 3D distribution of ¹⁸F-FDG.

A patient receives 370 MBq of ¹⁸F-FDG (10 mCi). Imaging begins 60 minutes post-injection to allow FDG uptake. The radiation dose from this activity is approximately 7 mSv. The oncologist uses PET to detect a hypermetabolic lung nodule with standardized uptake value (SUV) of 8.2 (malignant threshold: >2.5).

The annihilation photons have energy 511 keV because the rest mass of an electron equals 0.511 MeV (Einstein's mass-energy equivalence: E = mc²). Each annihilation converts two electron rest masses (e⁺ and e⁻) entirely into electromagnetic energy.`,
  questions:[
    {
      q:"After 60 minutes post-injection, how much ¹⁸F activity (MBq) remains in the patient, given t₁/₂ = 109.8 min?",
      choices:[
        "185 MBq — half the activity remains",
        "296 MBq — activity falls by a fixed 20% per hour",
        "253 MBq — about 68% of the activity remains",
        "370 MBq — no decay occurs within one half-life"
      ],
      ans:2,
      exp:"A = A₀(½)^(t/t½) = 370 × (½)^(60/109.8) = 370 × (½)^0.546 ≈ 370 × 0.685 ≈ **253 MBq**. Sixty minutes is about 0.55 half-lives, so somewhat more than half remains; 185 MBq would require a full 109.8 minutes. Decay is exponential and continuous, so activity is never unchanged over any interval."
    },
    {
      q:"Why are the two annihilation gamma rays emitted at exactly 180° to each other?",
      choices:[
        "Conservation of charge — the photons carry opposite charges",
        "Conservation of momentum — the pair has nearly zero net momentum",
        "Conservation of energy — each photon must carry 511 keV",
        "Electrostatic repulsion between the two photons"
      ],
      ans:1,
      exp:"The positron slows to near-thermal energy before annihilating, so the e⁺e⁻ pair has almost **zero net momentum**. Two photons can sum to zero momentum only if they are equal in magnitude and opposite in direction, hence 180°. Energy conservation fixes each photon at 511 keV but not their directions; photons are uncharged and do not repel. Small residual momentum gives ~0.5° acollinearity, which slightly blurs PET resolution."
    },
    {
      q:"Calculate the energy of each annihilation photon using E = mc², given that electron rest mass = 9.11 × 10⁻³¹ kg:",
      choices:[
        "256 keV",
        "511 keV",
        "1022 keV",
        "2044 keV"
      ],
      ans:1,
      exp:"E = mc² = (9.11 × 10⁻³¹ kg)(3 × 10⁸ m/s)² = 8.2 × 10⁻¹⁴ J; dividing by 1.6 × 10⁻¹⁶ J/keV gives ≈ **511 keV**. The pair's total rest energy is 2 × 511 = 1022 keV, shared equally between two photons, so each photon carries 511 keV. Choosing 1022 keV gives one photon the energy of both."
    },
    {
      subj:'biochemistry',
      q:"The SUV of 8.2 in the lung nodule indicates high metabolic activity. Which statement best explains why FDG-avid tumors have elevated SUV?",
      choices:[
        "High GLUT1 and hexokinase activity trap FDG as FDG-6-phosphate",
        "High tumor blood flow delivers more FDG per unit time",
        "A tumor-specific surface receptor binds FDG on dividing cells",
        "Poor lymphatic drainage slows FDG clearance from tumors"
      ],
      ans:0,
      exp:"Through the **Warburg effect**, tumor cells rely on glycolysis even with oxygen present and upregulate GLUT1 and hexokinase. FDG enters like glucose and is phosphorylated to FDG-6-phosphate, which cannot proceed through glycolysis and is not dephosphorylated in most tissues, so it is **metabolically trapped** in proportion to glucose uptake. Blood flow alone would raise delivery but not retention, which is what SUV at 60 minutes reflects."
    }
  ]
},

]; // end EXAM1_CP_PASSAGES


const EXAM1_CP_DISCRETES = [
  {
    subj:'gen_chem', id:'cp_d_1', type:'discrete', topic:'C/P',
    q:"A buffer is prepared with 0.10 M acetic acid and 0.10 M sodium acetate (pKa = 4.74). What is the pH of this buffer, and what happens to the pH when a small amount of HCl is added?",
    choices:[
      "pH = 4.74; the pH falls slightly as acetate consumes the added H⁺",
      "pH = 7.00; the pH does not change because the buffer is neutral",
      "pH = 4.74; the pH falls sharply because acetic acid is a weak acid",
      "pH = 9.26; the pH falls slightly as acetate consumes the added H⁺"
    ],
    ans:0,
    exp:"**Henderson-Hasselbalch**: pH = pKa + log([A⁻]/[HA]) = 4.74 + log(1) = 4.74. Added H⁺ is consumed by acetate (CH₃COO⁻ + H⁺ → CH₃COOH), so [A⁻]/[HA] drops slightly and the pH falls only a little; that resistance is buffer action. 9.26 is the pKb-based value (14 − 4.74), a common mix-up."
  },
  {
    subj:'gen_chem', id:'cp_d_2', type:'discrete', topic:'C/P',
    q:"An electron in a hydrogen atom transitions from n=4 to n=2. Which series does this emission belong to, and is the emitted photon in the visible spectrum?",
    choices:[
      "Lyman series; ultraviolet",
      "Balmer series; visible",
      "Paschen series; infrared",
      "Balmer series; ultraviolet"
    ],
    ans:1,
    exp:"Transitions ending at n = 2 form the **Balmer series**. The photon energy is 13.6 eV × (1/4 − 1/16) = 2.55 eV, so λ = hc/E ≈ 1240 eV·nm/2.55 eV ≈ 486 nm (the blue-green Hβ line), within the visible 400–700 nm range. Lyman lines end at n = 1 (UV) and Paschen lines at n = 3 (IR)."
  },
  {
    subj:'gen_chem', id:'cp_d_3', type:'discrete', topic:'C/P',
    q:"Which of the following pairs of molecules can form hydrogen bonds with each other?",
    choices:[
      "CH₄ and CH₄",
      "CCl₄ and H₂O",
      "HF and NH₃",
      "N₂ and O₂"
    ],
    ans:2,
    exp:"A **hydrogen bond** needs an H on N, O or F (donor) and a lone pair on N, O or F (acceptor). HF's H can donate to the nitrogen lone pair of NH₃ (and NH₃'s H can donate to F). In CCl₄ + H₂O, water could donate, but CCl₄'s chlorine is not an effective H-bond acceptor, so only dipole–induced dipole forces act. CH₄, N₂ and O₂ lack N/O/F–H bonds."
  },
  {
    subj:'physics', id:'cp_d_4', type:'discrete', topic:'C/P',
    q:"A ball of mass 2 kg is dropped from a height of 5 m. Just before impact with the ground, what is its kinetic energy? (g = 10 m/s²)",
    choices:[
      "50 J",
      "100 J",
      "10 J",
      "200 J"
    ],
    ans:1,
    exp:"With air resistance neglected (the MCAT default unless stated), **mechanical energy is conserved**: all the initial PE = mgh = 2 × 10 × 5 = 100 J becomes KE at impact. Check: v = √(2gh) = 10 m/s, and ½mv² = ½(2)(10²) = 100 J. Using ½mgh gives the tempting 50 J."
  },
  {
    subj:'gen_chem', id:'cp_d_5', type:'discrete', topic:'C/P',
    q:"Which intermolecular force is primarily responsible for the unexpectedly high boiling point of water (100°C) compared to H₂S (−60°C), despite water having a lower molecular weight?",
    choices:[
      "London dispersion forces",
      "Dipole–dipole interactions",
      "Hydrogen bonding",
      "Ion–ion interactions"
    ],
    ans:2,
    exp:"Each water molecule can donate two and accept two **hydrogen bonds** through its O–H bonds and lone pairs, forming an extensive network that must be broken to vaporize (ΔH_vap ≈ 41 vs. ≈ 19 kJ/mol for H₂S). Sulfur is not electronegative enough for S–H to hydrogen bond, so H₂S relies on weaker dipole–dipole and dispersion forces. Dispersion forces actually favor H₂S, the heavier and more polarizable molecule, so they cannot explain water's higher boiling point."
  },
  {
    subj:'gen_chem', id:'cp_d_6', type:'discrete', topic:'C/P',
    q:"An ideal gas occupies 2.0 L at 300 K and 1.0 atm. It is heated at constant pressure to 600 K. What is the new volume?",
    choices:[
      "1.0 L",
      "4.0 L",
      "2.0 L",
      "8.0 L"
    ],
    ans:1,
    exp:"**Charles's law** (constant P and n): V₁/T₁ = V₂/T₂, using kelvin. V₂ = 2.0 L × (600 K/300 K) = 4.0 L; doubling absolute temperature doubles volume. Faster molecules would raise pressure, so the gas expands until pressure is back to 1.0 atm. Getting 1.0 L comes from inverting the ratio."
  },
  {
    subj:'organic_chem', id:'cp_d_7', type:'discrete', topic:'C/P',
    q:"A compound has the molecular formula C₄H₈O and shows a strong IR absorption at ~1715 cm⁻¹ and no broad O-H stretch. Which functional group is most consistent with these data?",
    choices:[
      "Alcohol",
      "Carboxylic acid",
      "Ketone",
      "Ether"
    ],
    ans:2,
    exp:"A strong peak near **1715 cm⁻¹** is a C=O stretch, and with no broad O–H band (3200–3550 cm⁻¹ for alcohols, 2500–3300 cm⁻¹ for acids) the compound is a **ketone**, e.g., 2-butanone (CH₃COCH₂CH₃, C₄H₈O). A carboxylic acid would need two oxygens and would show a broad O–H; an ether has no carbonyl. An aldehyde (butanal) is also C₄H₈O but absorbs nearer 1725 cm⁻¹ and shows C–H stretches at ~2720/2820 cm⁻¹."
  },
  {
    subj:'biochemistry', id:'cp_d_8', type:'discrete', topic:'C/P',
    q:"In gel electrophoresis of proteins under denaturing (SDS-PAGE) conditions, which property determines migration distance?",
    choices:[
      "Native charge — more negative proteins migrate farther",
      "Native shape — globular proteins migrate farther than elongated ones",
      "Molecular weight — smaller proteins migrate farther",
      "Isoelectric point — proteins stop migrating at their pI"
    ],
    ans:2,
    exp:"SDS is an anionic detergent that denatures proteins and binds them at a roughly constant ratio (~1.4 g SDS per g protein), giving every protein about the **same charge-to-mass ratio** and a similar rod-like shape. Separation through the gel's pores then depends only on size, so smaller proteins travel farther. Native charge and shape matter in native PAGE, and pI is the basis of isoelectric focusing."
  },
  {
    subj:'gen_chem', id:'cp_d_9', type:'discrete', topic:'C/P',
    q:"The rate constant for a first-order reaction is k = 0.0693 min⁻¹. What is the half-life of this reaction?",
    choices:[
      "10 min",
      "0.1 min",
      "14.4 min",
      "7.2 min"
    ],
    ans:0,
    exp:"For a **first-order** reaction, t½ = ln 2/k = 0.693/0.0693 min⁻¹ = 10 min, independent of starting concentration (unlike a second-order reaction, where t½ = 1/(k[A]₀)). 14.4 min is 1/k, the mean lifetime rather than the half-life, and 0.1 min comes from inverting the formula."
  },
  {
    subj:'biochemistry', id:'cp_d_10', type:'discrete', topic:'C/P',
    q:"Which statement about enzyme active sites is correct?",
    choices:[
      "It is rigid and exactly complementary to the substrate before binding",
      "It changes conformation as substrate binds, improving the fit",
      "It always contains a metal cofactor that is required for catalysis",
      "It binds substrate only through ionic interactions"
    ],
    ans:1,
    exp:"The **induced-fit model** (Koshland) holds that substrate binding triggers a conformational change that positions catalytic groups, excludes water, and stabilizes the transition state. The rigid lock-and-key picture is the older model and cannot explain these conformational effects. Many enzymes need no metal cofactor, and substrate binding uses a mix of hydrogen bonds, hydrophobic, van der Waals and ionic interactions."
  },
  {
    subj:'physics', id:'cp_d_11', type:'discrete', topic:'C/P',
    q:"A sound wave travels from air (v = 343 m/s) into water (v = 1,482 m/s). What happens to its frequency and wavelength?",
    choices:[
      "Frequency increases; wavelength is unchanged",
      "Frequency is unchanged; wavelength increases",
      "Frequency and wavelength both increase",
      "Frequency is unchanged; wavelength decreases"
    ],
    ans:1,
    exp:"**Frequency is set by the source** and does not change at a boundary. Since v = fλ, when v rises from 343 to 1,482 m/s (~4.3×) at constant f, λ increases by the same factor, just as light keeps its frequency while its wavelength changes on refraction. Because wavelength in tissue is long for a given frequency and resolution is limited by wavelength, medical ultrasound uses MHz frequencies to reach millimeter resolution."
  },
  {
    subj:'gen_chem', id:'cp_d_12', type:'discrete', topic:'C/P',
    q:"Which of the following correctly describes the relationship between Gibbs free energy (ΔG°') and the equilibrium constant (Keq) for a biochemical reaction?",
    choices:[
      "ΔG°' = RT ln Keq, so Keq > 1 gives ΔG°' > 0",
      "ΔG°' = −RT ln Keq, so Keq > 1 gives ΔG°' < 0",
      "ΔG°' = −RT ln Keq, so Keq = 1 gives ΔG°' < 0",
      "Keq = e^(ΔG°'/RT), so a larger ΔG°' gives a larger Keq"
    ],
    ans:1,
    exp:"**ΔG°' = −RT ln Keq**, so Keq = e^(−ΔG°'/RT). If Keq > 1, ln Keq > 0 and ΔG°' < 0 (products favored at standard conditions); if Keq = 1, ln 1 = 0 and ΔG°' = 0. Dropping the minus sign is the classic error that reverses every conclusion. Under nonstandard conditions use ΔG = ΔG°' + RT ln Q."
  },
  {
    subj:'physics', id:'cp_d_13', type:'discrete', topic:'C/P',
    q:"In which situation is the work done by a gas on its surroundings equal to zero?",
    choices:[
      "Isothermal expansion against constant external pressure",
      "Adiabatic expansion of an ideal gas",
      "Isovolumetric (isochoric) heating of a gas",
      "Isobaric compression of a gas"
    ],
    ans:2,
    exp:"Pressure–volume work by a gas is W = ∫P dV, so if **ΔV = 0** (isochoric) no work is done whatever happens to P or T, and the first law reduces to ΔU = q. Isothermal and adiabatic expansions both involve ΔV > 0 (positive work by the gas; in the adiabatic case at the expense of internal energy), and isobaric compression has ΔV < 0 (work done on the gas)."
  },
  {
    subj:'physics', id:'cp_d_14', type:'discrete', topic:'C/P',
    q:"An object is placed 30 cm in front of a concave mirror with focal length 10 cm. Where is the image formed, and what are its characteristics?",
    choices:[
      "15 cm behind the mirror; virtual, upright, reduced",
      "15 cm in front of the mirror; real, inverted, reduced",
      "30 cm in front of the mirror; real, inverted, same size",
      "7.5 cm in front of the mirror; real, inverted, reduced"
    ],
    ans:1,
    exp:"**Mirror equation**: 1/f = 1/do + 1/di → 1/di = 1/10 − 1/30 = 2/30, so di = +15 cm (in front of the mirror, real). Magnification m = −di/do = −15/30 = −0.5: inverted and half-size. An object beyond 2f of a concave mirror always gives a real, inverted, reduced image between f and 2f; a virtual upright image requires the object inside f."
  },
  {
    subj:'biology', id:'cp_d_15', type:'discrete', topic:'C/P',
    q:"Warfarin inhibits vitamin K epoxide reductase, preventing regeneration of reduced vitamin K needed for γ-carboxylation of clotting factors II, VII, IX, and X. Which statement best explains why warfarin's anticoagulant effect is delayed 2-3 days after initiating therapy?",
    choices:[
      "Warfarin is absorbed slowly and takes 2–3 days to reach therapeutic levels",
      "Warfarin is a prodrug that the liver activates over 2–3 days",
      "Already-circulating functional clotting factors must first be cleared",
      "Vitamin K epoxide reductase is upregulated during the first 2–3 days"
    ],
    ans:2,
    exp:"Warfarin blocks regeneration of reduced vitamin K, so **newly made** factors II, VII, IX and X lack γ-carboxylation, but factors already in the blood keep working until they are cleared. Their half-lives range from ~6 h (factor VII) to ~60–72 h (prothrombin), so full anticoagulation takes days; factor VII's fast fall explains the early INR rise. Warfarin is well absorbed and active as given, so absorption and activation are not the cause."
  }

  ,{
    subj:'physics', id:'cp_d_16', type:'discrete', topic:'C/P',
    q:"A proton (mass = 1.67 × 10⁻²⁷ kg, charge = 1.6 × 10⁻¹⁹ C) moves perpendicular to a 0.5 T magnetic field at 2 × 10⁶ m/s. What is the radius of its circular path?",
    choices:[
      "0.042 m",
      "0.021 m",
      "0.084 m",
      "0.21 m"
    ],
    ans:0,
    exp:"The magnetic force supplies the centripetal force: qvB = mv²/r, so **r = mv/qB** = (1.67 × 10⁻²⁷ × 2 × 10⁶)/(1.6 × 10⁻¹⁹ × 0.5) = 3.34 × 10⁻²¹/8 × 10⁻²⁰ ≈ 0.042 m. Leaving B out of the denominator gives 0.021 m, and using B = 0.25 T gives 0.084 m. The same relation underlies mass spectrometry, where different m/q give different radii."
  },
  {
    subj:'biochemistry', id:'cp_d_17', type:'discrete', topic:'C/P',
    q:"Which amino acid substitution in an enzyme active site would most likely abolish acid-base catalysis?",
    choices:[
      "Glycine → Alanine",
      "Leucine → Isoleucine",
      "Histidine → Alanine",
      "Phenylalanine → Tyrosine"
    ],
    ans:2,
    exp:"Histidine's imidazole (pKa ≈ 6) is partly protonated near physiological pH, so it can **donate or accept a proton** during catalysis; it is the classic general acid–base residue (e.g., the serine protease catalytic triad). Replacing it with alanine's non-ionizable methyl removes that function. Gly→Ala and Leu→Ile are conservative nonpolar swaps, and Phe→Tyr adds a hydroxyl rather than removing a catalytic group."
  }
]; // end EXAM1_CP_DISCRETES


// C/P SECTION — ordered as AAMC format: passages interleaved with discretes
function buildCP_Section() {
  const questions = [];
  const p = EXAM1_CP_PASSAGES;
  const d = EXAM1_CP_DISCRETES;

  // Block 1: passages 0,1 then 3 discretes
  p[0].questions.forEach(q => questions.push({...q, passageText:p[0].passage, passageTitle:p[0].title, passageId:p[0].id}));
  p[1].questions.forEach(q => questions.push({...q, passageText:p[1].passage, passageTitle:p[1].title, passageId:p[1].id}));
  questions.push(d[0], d[1], d[2]);

  // Block 2: passages 2,3,4 then 5 discretes
  p[2].questions.forEach(q => questions.push({...q, passageText:p[2].passage, passageTitle:p[2].title, passageId:p[2].id}));
  p[3].questions.forEach(q => questions.push({...q, passageText:p[3].passage, passageTitle:p[3].title, passageId:p[3].id}));
  p[4].questions.forEach(q => questions.push({...q, passageText:p[4].passage, passageTitle:p[4].title, passageId:p[4].id}));
  questions.push(d[3], d[4], d[5], d[6], d[7]);

  // Block 3: passages 5,6,7 then 5 discretes
  p[5].questions.forEach(q => questions.push({...q, passageText:p[5].passage, passageTitle:p[5].title, passageId:p[5].id}));
  p[6].questions.forEach(q => questions.push({...q, passageText:p[6].passage, passageTitle:p[6].title, passageId:p[6].id}));
  p[7].questions.forEach(q => questions.push({...q, passageText:p[7].passage, passageTitle:p[7].title, passageId:p[7].id}));
  questions.push(d[8], d[9], d[10], d[11], d[12]);

  // Block 4: passages 8,9 then 4 discretes
  p[8].questions.forEach(q => questions.push({...q, passageText:p[8].passage, passageTitle:p[8].title, passageId:p[8].id}));
  p[9].questions.forEach(q => questions.push({...q, passageText:p[9].passage, passageTitle:p[9].title, passageId:p[9].id}));
  questions.push(d[13], d[14], d[15], d[16]);

  return questions;
}
const EXAM1_CP_QUESTIONS = buildCP_Section();


const EXAM1_BB_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 1: DNA Repair & Cancer (Biochem/Molecular Bio)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_1',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Nucleotide Excision Repair and Xeroderma Pigmentosum',
  passage:`Nucleotide excision repair (NER) corrects bulky DNA lesions including UV-induced cyclobutane pyrimidine dimers (CPDs) and 6-4 photoproducts. The pathway involves ~30 proteins working sequentially: damage recognition by XPC-RAD23B, verification by TFIIH helicase subunits XPB and XPD, dual incision by XPF-ERCC1 (5') and XPG (3') creating a ~30-nucleotide excision fragment, gap filling by DNA polymerase δ/ε using the complementary strand as template, and ligation by DNA ligase I.

Xeroderma pigmentosum (XP) is an autosomal recessive disorder caused by loss-of-function mutations in any of eight XP complementation groups (XP-A through XP-G, plus XP-V). Patients have a 2,000-fold increased risk of UV-induced skin cancers, and some develop progressive neurological degeneration. XP-V patients have functional NER but carry mutations in DNA polymerase η (pol η), which normally bypasses CPDs by inserting two adenines opposite the dimer — an error-free translesion synthesis mechanism.

Researchers studied two XP patient cell lines: XP-A (null for XPA) and XP-V. They exposed cells to UV radiation (254 nm, 20 J/m²) and measured DNA repair synthesis by ³H-thymidine incorporation. XP-A cells showed 2% of normal repair synthesis; XP-V cells showed 98% of normal. Both cell lines showed elevated UV-induced mutation frequency compared to wild-type.

In a complementation assay, fusion of XP-A and XP-C cells restored normal NER activity, confirming that the two lines carry mutations in different genes.`,
  questions:[
    {
      q:"XP-V patients have normal NER but still show elevated UV-induced mutation rates. Which mechanism best explains this?",
      choices:[
        "Pol η is required for damage recognition, so NER cannot begin",
        "Unrepaired CPDs reaching S phase are bypassed by error-prone polymerases",
        "Base excision repair is defective, leaving oxidative lesions unrepaired",
        "Pol η is required for gap filling, so NER cannot be completed"
      ],
      ans:1,
      exp:"XP-V cells show 98% of normal repair synthesis, so NER works; the defect is in **translesion synthesis**. Some CPDs always persist into S phase, where replicative polymerases stall; pol η normally bypasses them accurately (inserting AA opposite a TT dimer). Without it, error-prone polymerases (e.g., pol ζ, Rev1) take over and introduce C→T and CC→TT mutations at dipyrimidine sites. The normal repair synthesis rules out answers that place pol η inside NER itself."
    },
    {
      q:"The complementation assay shows that fusing XP-A and XP-C cells restores NER. What does this result demonstrate?",
      choices:[
        "The two lines carry mutations in the same gene",
        "The two lines carry mutations in different genes",
        "Cell fusion restores DNA repair whatever the mutations are",
        "XPC protein can substitute for XPA protein in NER"
      ],
      ans:1,
      exp:"In a **complementation test**, two recessive mutants with the same phenotype are combined; rescue means each supplies the wild-type product the other lacks, so the mutations are in **different genes**. In the fused cell (a heterokaryon), XP-A nuclei supply XPC and XP-C nuclei supply XPA, restoring NER. Mutations in the same gene could not rescue each other, because neither line could provide the missing protein."
    },
    {
      q:"UV radiation at 254 nm preferentially induces CPDs between adjacent pyrimidines. Which DNA bases are most commonly involved, and why?",
      choices:[
        "Adjacent purines on the same strand, joined across their imidazole rings",
        "Adjacent thymines on the same strand, joined across their C5–C6 bonds",
        "A guanine and cytosine on opposite strands, joined across the base pair",
        "An adenine and thymine on opposite strands, joined across the base pair"
      ],
      ans:1,
      exp:"A **cyclobutane pyrimidine dimer** forms by a [2+2] cycloaddition between the C5–C6 double bonds of two adjacent pyrimidines on the **same strand**; TT dimers are most frequent, with TC, CT and CC also occurring. Purines do not form CPDs, and the reaction links stacked neighbors, not base-paired partners on opposite strands. Error-prone bypass of these lesions produces the UV signature of C→T and CC→TT mutations at dipyrimidine sites."
    },
    {
      q:"After NER creates a ~30-nucleotide gap, DNA polymerase δ fills the gap using the complementary strand as template. Which property of DNA polymerase is being exploited?",
      choices:[
        "5'→3' exonuclease activity that removes the damaged strand",
        "Template-directed 5'→3' synthesis that copies the intact strand",
        "3'→5' exonuclease proofreading of the new sequence",
        "Strand-displacement synthesis that peels away downstream DNA"
      ],
      ans:1,
      exp:"The question describes the polymerase reading the intact complementary strand and adding nucleotides 5'→3' to restore the excised ~30-nt sequence, which is **template-directed polymerase activity**. Proofreading improves fidelity but is not what fills the gap, and in NER the damaged oligonucleotide has already been removed by XPF-ERCC1 and XPG incisions, not by polymerase exonuclease activity. Because the sequence is copied from the undamaged strand, NER is essentially error-free."
    },
    {
      q:"A researcher wants to determine if a new compound inhibits NER. Which assay result would most directly confirm NER inhibition?",
      choices:[
        "Decreased ³H-thymidine incorporation into total DNA after UV",
        "Increased UV-induced sister chromatid exchanges",
        "Decreased UV-induced ³H-thymidine incorporation in non-S-phase cells",
        "Reduced cell survival after UV exposure"
      ],
      ans:2,
      exp:"**Unscheduled DNA synthesis (UDS)**, ³H-thymidine incorporation in cells outside S phase after UV, measures only NER gap-filling because no replicative synthesis is occurring; a drop in UDS directly shows impaired NER. Total incorporation is dominated by S-phase replication, which an inhibitor could reduce for unrelated reasons. Sister chromatid exchanges reflect recombination, and reduced survival is a nonspecific downstream effect."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 2: Signal Transduction (Biochem/Cell Biology)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_2',
  subj:'biochemistry',
  type:'passage',
  topic:'B/B',
  title:'Insulin Receptor Signaling and Type 2 Diabetes',
  passage:`Insulin signaling begins when insulin binds its receptor (IR), a receptor tyrosine kinase (RTK) consisting of two α and two β subunits linked by disulfide bonds. Insulin binding to the α subunits induces conformational change in the β subunits, activating their intrinsic tyrosine kinase activity. The β subunits trans-autophosphorylate, creating phosphotyrosine docking sites for IRS-1 (insulin receptor substrate-1).

Phosphorylated IRS-1 recruits PI3K, which phosphorylates PIP₂ to PIP₃. PIP₃ recruits PDK1 and Akt (PKB) to the membrane. PDK1 phosphorylates Akt at Thr-308; mTORC2 phosphorylates Akt at Ser-473. Fully active Akt phosphorylates AS160 (TBC1D4), releasing its inhibition of RAB-GTPases and allowing GLUT4-containing vesicles to translocate to the plasma membrane, increasing glucose uptake.

In type 2 diabetes (T2DM), chronic hyperinsulinemia induces a serine phosphorylation cascade (via IKKβ, JNK, mTORC1/S6K1) that phosphorylates IRS-1 on inhibitory serine residues, converting IRS-1 from an activating substrate to an inhibitor of the IR — insulin resistance.

Researchers measured GLUT4 translocation in adipocytes from healthy controls versus T2DM patients. Maximal insulin (100 nM) caused 6.8-fold GLUT4 translocation in controls but only 2.1-fold in T2DM adipocytes. When T2DM adipocytes were treated with a JNK inhibitor before insulin stimulation, GLUT4 translocation increased to 4.3-fold.`,
  questions:[
    {
      q:"The insulin receptor is classified as a receptor tyrosine kinase. Which feature distinguishes RTKs from G-protein coupled receptors?",
      choices:[
        "RTKs occur only on adipocytes and muscle, while GPCRs are ubiquitous",
        "RTKs have intrinsic kinase activity, while GPCRs act through G proteins",
        "RTKs require cAMP as a second messenger, while GPCRs do not",
        "RTKs bind lipid-soluble ligands inside the cell, while GPCRs bind at the surface"
      ],
      ans:1,
      exp:"An RTK **is itself an enzyme**: ligand binding activates its cytoplasmic tyrosine kinase, which autophosphorylates and then phosphorylates substrates such as IRS-1. A GPCR is a seven-pass receptor with no catalytic domain; it activates a heterotrimeric G protein, which then regulates effectors like adenylyl cyclase or phospholipase C. cAMP is a typical GPCR (Gs) second messenger, so the cAMP choice has the relationship backwards."
    },
    {
      q:"Serine phosphorylation of IRS-1 in T2DM converts it from an activating substrate to an inhibitor of the insulin receptor. This is best described as which type of regulation?",
      choices:[
        "Allosteric regulation by a small molecule binding a non-catalytic site",
        "Competitive inhibition, with phospho-IRS-1 occupying insulin's binding site",
        "Negative feedback through covalent modification by downstream kinases",
        "Proteolytic processing of IRS-1 into an inhibitory fragment"
      ],
      ans:2,
      exp:"Kinases activated downstream of insulin and nutrient excess (S6K1, IKKβ, JNK) phosphorylate IRS-1 on inhibitory serines, so the pathway dampens its own early step: **negative feedback by covalent (reversible) modification**. Serine-phosphorylated IRS-1 is poorly tyrosine-phosphorylated by the receptor. It is not allosteric regulation, because a phosphate group is covalently attached rather than a ligand binding noncovalently."
    },
    {
      q:"The JNK inhibitor restored GLUT4 translocation from 2.1-fold to 4.3-fold in T2DM adipocytes. What does this result suggest about JNK's role in insulin resistance?",
      choices:[
        "JNK directly promotes GLUT4 vesicle fusion with the membrane",
        "JNK is the sole cause of insulin resistance in these adipocytes",
        "JNK contributes to insulin resistance alongside other pathways",
        "JNK has no role, and the inhibitor acted through off-target effects"
      ],
      ans:2,
      exp:"Blocking JNK raised GLUT4 translocation from 2.1- to 4.3-fold, a real but **partial rescue** (controls reach 6.8-fold). So JNK contributes to insulin resistance, but other serine kinases named in the passage (IKKβ, mTORC1/S6K1) must account for the remainder. If JNK were the sole cause, inhibiting it would have restored the full 6.8-fold response; if it promoted GLUT4 fusion, inhibiting it would have lowered translocation."
    },
    {
      q:"PIP₃ recruits Akt to the plasma membrane by binding Akt's pleckstrin homology (PH) domain. PTEN is a phosphatase that converts PIP₃ back to PIP₂. What effect would PTEN loss-of-function have on insulin signaling?",
      choices:[
        "Decreased Akt activation, because PTEN is needed to make PIP₃",
        "Increased, sustained Akt activation, because PIP₃ accumulates",
        "No change, because PTEN acts only in inflammatory signaling",
        "Decreased glucose uptake, because PTEN drives GLUT4 translocation"
      ],
      ans:1,
      exp:"PTEN is a **lipid phosphatase** that converts PIP₃ back to PIP₂, terminating the PI3K signal. Without PTEN, PIP₃ accumulates and keeps recruiting PDK1 and Akt, so Akt signaling (including GLUT4 translocation, growth and survival) stays elevated. That growth-promoting effect is why PTEN is a frequently mutated tumor suppressor. PI3K, not PTEN, makes PIP₃."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 3: Protein Structure & Function (Biochem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_3',
  subj:'biochemistry',
  type:'passage',
  topic:'B/B',
  title:'Sickle Cell Hemoglobin: Structure, Polymerization, and Therapy',
  passage:`Normal adult hemoglobin (HbA, α₂β₂) carries oxygen cooperatively due to heme-heme interactions and allosteric regulation by 2,3-BPG. Sickle cell hemoglobin (HbS) differs from HbA by a single point mutation in the β-globin gene: glutamate (Glu, charged, hydrophilic) at position 6 is replaced by valine (Val, nonpolar, hydrophobic). This substitution creates a hydrophobic patch on the surface of deoxygenated HbS.

In the deoxygenated state, the hydrophobic Val-6 fits into a hydrophobic pocket on the β-chain of an adjacent HbS molecule. This intermolecular interaction drives polymerization: HbS monomers stack into protofilaments that associate laterally into fibers, distorting red blood cells into the characteristic sickle shape. Polymerization is highly concentration-dependent and occurs only below a critical oxygen tension.

Researchers tested hydroxyurea (HU) therapy in sickle cell patients. HU induces fetal hemoglobin (HbF, α₂γ₂) production. HbF γ-chains contain Gln at position 87 (β-chains have Thr-87), a substitution that disrupts a lateral contact needed for a tetramer to join the HbS polymer. In treated patients, HbF fraction increased from 3% to 25%. Sickling under deoxygenation decreased from 78% to 31% of red cells.

The researchers also measured oxygen affinity: HbF has a higher O₂ affinity (P₅₀ = 18 mmHg) than HbA (P₅₀ = 26 mmHg), partly because HbF binds 2,3-BPG weakly (the γ-chain has Ser-143 in place of the β-chain's His-143 in the BPG-binding pocket).`,
  questions:[
    {
      q:"The Glu→Val substitution at β6 causes HbS polymerization in the deoxygenated state but not the oxygenated state. What structural explanation accounts for the oxygen-dependence of polymerization?",
      choices:[
        "Oxygen binding to the α-chains buries Val-6 inside the tetramer",
        "Only the deoxy T state exposes the acceptor pocket that binds Val-6",
        "Bound O₂ molecules physically occupy the acceptor pocket",
        "Oxygenation lowers body temperature, which slows polymerization"
      ],
      ans:1,
      exp:"Hemoglobin shifts between the **T (deoxy) and R (oxy) states**. The mutant βVal6 lies on the surface in both, but the hydrophobic acceptor pocket formed by βPhe85 and βLeu88 on a neighboring tetramer is accessible only in the T conformation. On deoxygenation, Val6 of one HbS molecule inserts into another's pocket and polymers nucleate; reoxygenation shifts HbS to R, closing the pocket. O₂ binds the heme iron, not the pocket, which is why sickling occurs in oxygen-depleted microvasculature."
    },
    {
      q:"HbF γ-chains contain Gln-87 instead of the Thr-87 found in β-chains. What is the principal mechanism by which HbF in a red cell reduces sickling?",
      choices:[
        "HbF binds HbS directly and covers its Val-6 hydrophobic patch",
        "Hybrid α₂βSγ tetramers join fibers poorly and interrupt polymer growth",
        "HbF raises red-cell 2,3-BPG, stabilizing all hemoglobin in the R state",
        "HbF activates proteases that degrade HbS polymers"
      ],
      ans:1,
      exp:"HbF acts as a **copolymerization inhibitor**. In cells containing both, mixed α₂βSγ hybrid tetramers form; because the γ-chain lacks Val6 and has Gln87 instead of Thr87, hybrids incorporate poorly and interrupt fiber growth, while pure HbF is excluded from the polymer. This dilution raises the HbS concentration needed to polymerize and lengthens the delay before polymers form. 2,3-BPG stabilizes the T state, so raising it would promote, not prevent, sickling; HbF's higher O₂ affinity helps only modestly."
    },
    {
      q:"HbF has P₅₀ = 18 mmHg vs. HbA P₅₀ = 26 mmHg. Which statement correctly interprets this difference in the context of fetal oxygen delivery?",
      choices:[
        "HbF has lower O₂ affinity, so it unloads O₂ more readily to fetal tissues",
        "HbF has higher O₂ affinity, so it loads O₂ from maternal HbA in the placenta",
        "HbF and HbA have the same affinity, so the P₅₀ difference is irrelevant",
        "HbF has less cooperativity, so its saturation curve is hyperbolic"
      ],
      ans:1,
      exp:"P₅₀ is the PO₂ at 50% saturation, so a **lower P₅₀ means higher O₂ affinity**. At a placental PO₂ of ~35 mmHg, maternal HbA (P₅₀ 26) is only ~70% saturated while fetal HbF (P₅₀ 18) is ~85% saturated, so O₂ moves from maternal to fetal blood. The higher affinity comes from weak 2,3-BPG binding by the γ-chains. Reading a lower P₅₀ as lower affinity is the classic reversal."
    },
    {
      q:"Hydroxyurea is thought to induce HbF by generating nitric oxide (NO) and activating soluble guanylate cyclase, leading to γ-globin gene derepression. If this mechanism is correct, which finding would support it?",
      choices:[
        "HU raises HbF even in patients lacking the γ-globin promoter",
        "An NO scavenger or guanylate cyclase inhibitor blocks HU's induction of HbF",
        "HU raises HbA₂ (α₂δ₂) in proportion to HbF",
        "HU directly methylates the γ-globin promoter"
      ],
      ans:1,
      exp:"To support a proposed pathway (HU → NO → soluble guanylate cyclase → γ-globin expression), show that **blocking an intermediate step abolishes the effect**: if an NO scavenger or guanylate cyclase inhibitor prevents HU from raising HbF, the pathway is implicated. HbF induction without a γ-globin promoter is implausible and says nothing about NO; a parallel HbA₂ rise suggests a nonspecific effect; direct promoter methylation is a different mechanism (and methylation usually silences genes)."
    },
    {
      q:"A patient homozygous for HbS (HbSS) also has hereditary persistence of fetal hemoglobin (HPFH), maintaining 30% HbF throughout adult life. Compared to a typical HbSS patient, this patient would most likely have:",
      choices:[
        "More severe anemia, because HbF's high O₂ affinity impairs delivery",
        "Unchanged severity, because HbF does not affect sickling",
        "Milder disease, because HbF dilutes HbS and inhibits polymerization",
        "More vaso-occlusive crises, because HbF raises blood viscosity"
      ],
      ans:2,
      exp:"With 30% HbF in every red cell, the HbS concentration falls and hybrid tetramers **inhibit polymer formation**, so fewer cells sickle. The passage shows the same effect with hydroxyurea (HbF 3% → 25%; sickling 78% → 31%), and HbSS patients with HPFH indeed have milder anemia and fewer crises; this observation motivated HbF-inducing therapy. HbF's higher O₂ affinity is not enough to impair tissue delivery meaningfully."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 4: Cell Cycle & Apoptosis (Cell Biology)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_4',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'p53 Tumor Suppressor and the DNA Damage Response',
  passage:`p53 is activated by DNA damage, oncogene activation, and hypoxia. In unstressed cells, p53 is maintained at low levels by MDM2, an E3 ubiquitin ligase that binds p53's transactivation domain and targets it for proteasomal degradation. DNA damage activates ATM/ATR kinases, which phosphorylate p53 at Ser-15 and Ser-20, disrupting MDM2 binding and stabilizing p53.

Stabilized p53 tetramerizes and transcriptionally activates target genes including: CDKN1A (p21, CDK inhibitor), MDM2 (negative feedback), PUMA and NOXA (pro-apoptotic BH3-only proteins), and GADD45 (DNA repair). p21 inhibits cyclin E-CDK2 and cyclin D-CDK4/6 complexes, maintaining Rb in its hypophosphorylated (active) form, blocking E2F transcription factors, and arresting cells in G1.

Researchers compared p53 responses in two colon cancer cell lines: HCT116 (p53 wild-type) and an isogenic HCT116 derivative engineered to carry a heterozygous p53 R248W hotspot mutation. After γ-irradiation (8 Gy), HCT116 cells showed G1 arrest and subsequent apoptosis. The R248W cells showed no G1 arrest and continued proliferating, though with reduced viability after 72 hours.

The R248W mutation changes arginine to tryptophan at a DNA contact residue, preventing p53 from binding its target DNA sequences. The mutant protein accumulates to high levels (MDM2 cannot be upregulated) and acts as a dominant negative by forming tetramers with wild-type p53 from the other allele.`,
  questions:[
    {
      q:"After DNA damage, ATM phosphorylates p53 at Ser-15/20, preventing MDM2 binding. What type of regulatory mechanism does this represent?",
      choices:[
        "Allosteric regulation, with a ligand binding p53 noncovalently",
        "Control of protein stability through covalent modification",
        "Transcriptional regulation, with more TP53 mRNA being made",
        "Feedback inhibition, with p53 phosphorylating and inhibiting ATM"
      ],
      ans:1,
      exp:"Phosphorylation of Ser-15/Ser-20 in p53's transactivation domain weakens MDM2 binding, so the E3 ligase can no longer ubiquitinate p53 for proteasomal degradation, and p53 accumulates. This is **post-translational control of protein stability** by covalent modification. p53 rises without any change in TP53 transcription, and a covalently attached phosphate is not allosteric ligand binding."
    },
    {
      q:"p21 maintains Rb in its hypophosphorylated active form. How does hypophosphorylated Rb cause G1 arrest?",
      choices:[
        "It binds E2F and blocks transcription of S-phase genes",
        "It binds replication origins and blocks helicase loading",
        "It activates CDK2, which then halts the cell in G1",
        "It is degraded by the proteasome, which halts the cell in G1"
      ],
      ans:0,
      exp:"In G1, cyclin D–CDK4/6 and cyclin E–CDK2 phosphorylate Rb, releasing **E2F** to transcribe S-phase genes (cyclin E, DHFR, DNA polymerase subunits). p21 inhibits these CDKs, so Rb stays hypophosphorylated, keeps E2F bound and repressed, and the cell cannot pass the restriction point. Rb acts on transcription, not directly at replication origins, and active CDK2 would push the cell into S phase rather than arrest it."
    },
    {
      q:"The R248W mutation acts as a dominant negative. Which mechanism best explains this?",
      choices:[
        "It produces a truncated protein that cannot form tetramers",
        "Mutant subunits join wild-type p53 in tetramers that cannot bind DNA",
        "It binds MDM2 more tightly, causing wild-type p53 to be degraded",
        "It outcompetes wild-type p53 for phosphorylation by ATM"
      ],
      ans:1,
      exp:"p53 binds DNA as a tetramer. R248W alters a DNA-contact residue but leaves the tetramerization domain intact, so mutant subunits co-assemble with wild-type subunits from the other allele, and **mixed tetramers fail to bind target sites**; the mutant poisons the wild-type protein (a dominant-negative effect). A truncated protein that cannot tetramerize would instead cause simple loss of function, and the passage notes the mutant accumulates because it cannot induce MDM2."
    },
    {
      q:"PUMA and NOXA are BH3-only proteins upregulated by p53 that trigger apoptosis. They act by binding and inhibiting anti-apoptotic Bcl-2 family members (Bcl-2, Bcl-xL). What is the downstream consequence of neutralizing Bcl-2/Bcl-xL?",
      choices:[
        "Caspase-8 activation through the extrinsic death-receptor pathway",
        "Bax/Bak pore formation, cytochrome c release, and caspase-9 activation",
        "Direct caspase-3 activation without cytochrome c release",
        "mTOR inhibition, shifting the cell toward autophagy"
      ],
      ans:1,
      exp:"Bcl-2 and Bcl-xL normally restrain pro-apoptotic **Bax and Bak**. When BH3-only proteins neutralize them, Bax/Bak oligomerize in the outer mitochondrial membrane and release cytochrome c, which joins Apaf-1 to form the apoptosome, activating caspase-9 and then executioner caspases-3/7: the **intrinsic pathway**. Caspase-8 initiates the separate extrinsic (death-receptor) pathway."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 5: Metabolism — Fatty Acid Oxidation (Biochem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_5',
  subj:'biochemistry',
  type:'passage',
  topic:'B/B',
  title:'Fatty Acid Oxidation in Fasting and Medium-Chain Acyl-CoA Dehydrogenase Deficiency',
  passage:`During prolonged fasting, adipose tissue lipolysis releases free fatty acids (FFAs) into circulation. In the liver, FFAs are activated to fatty acyl-CoA by acyl-CoA synthetase, transported into the mitochondrial matrix by the carnitine shuttle (carnitine palmitoyltransferase I/II, CPT-I/II), and oxidized through repeated β-oxidation cycles. Each cycle cleaves a 2-carbon acetyl-CoA unit, producing NADH, FADH₂, and an acyl-CoA shortened by two carbons.

Medium-chain acyl-CoA dehydrogenase (MCAD) catalyzes the first step of β-oxidation for C6-C12 fatty acids: FAD-dependent oxidation of acyl-CoA to trans-2-enoyl-CoA. The most common MCAD deficiency mutation is K304E, reducing protein stability and causing misfolding. Affected patients cannot oxidize medium-chain fatty acids during fasting, presenting with hypoketotic hypoglycemia, lethargy, hepatic steatosis, and risk of sudden death.

Researchers analyzed urine from an MCAD-deficient patient and found elevated levels of octanoylcarnitine (C8-carnitine) and hexanoylcarnitine (C6-carnitine). Plasma acylcarnitine profiling (C8:0/C10:0 ratio elevated) is now used for newborn screening. A healthy adult fasting for 72 hours showed elevated plasma β-hydroxybutyrate (3.5 mM) and acetoacetate (0.8 mM), with blood glucose maintained at 72 mg/dL.

Treatment consists of avoiding fasting >8 hours, high carbohydrate intake during illness, and L-carnitine supplementation.`,
  questions:[
    {
      q:"A 16-carbon palmitoyl-CoA undergoes complete β-oxidation. How many NADH, FADH₂, and acetyl-CoA molecules are produced?",
      choices:[
        "7 NADH, 7 FADH₂, 8 acetyl-CoA",
        "8 NADH, 8 FADH₂, 8 acetyl-CoA",
        "7 NADH, 7 FADH₂, 7 acetyl-CoA",
        "14 NADH, 14 FADH₂, 8 acetyl-CoA"
      ],
      ans:0,
      exp:"A C16 chain gives 16/2 = 8 acetyl-CoA but needs only **7 cycles**, because the last cycle splits a C4 unit into two acetyl-CoA. Each cycle yields 1 FADH₂ (acyl-CoA dehydrogenase) and 1 NADH (3-hydroxyacyl-CoA dehydrogenase), so 7 of each. Net ATP ≈ 7(2.5) + 7(1.5) + 8(10) − 2 for activation = 106. Assuming 8 cycles is the common fencepost error."
    },
    {
      q:"Why does MCAD deficiency specifically cause problems during fasting rather than during fed states?",
      choices:[
        "Fasting lowers insulin, which is needed to induce MCAD expression",
        "Fasting makes fatty acid oxidation a main fuel, and it stalls at medium chains",
        "MCAD deficiency blocks glycogenolysis, which operates only in fasting",
        "Fasting activates fatty acid synthesis, which overwhelms MCAD"
      ],
      ans:1,
      exp:"When fed, insulin suppresses lipolysis and raises malonyl-CoA (inhibiting CPT-I), so little fat is oxidized and the MCAD defect is silent. During fasting, insulin falls and the liver relies on **β-oxidation** for ATP and acetyl-CoA; in MCAD deficiency oxidation stalls at C6–C12, so ketogenesis and the ATP that supports gluconeogenesis fall, producing **hypoketotic hypoglycemia** while medium-chain acylcarnitines accumulate. Fasting suppresses, rather than activates, fatty acid synthesis."
    },
    {
      q:"The healthy fasting adult has β-hydroxybutyrate = 3.5 mM and acetoacetate = 0.8 mM. What is the β-hydroxybutyrate:acetoacetate ratio, and what does this indicate about hepatic mitochondrial redox state?",
      choices:[
        "4.4; a high mitochondrial NADH/NAD⁺ ratio",
        "0.23; a low mitochondrial NADH/NAD⁺ ratio",
        "4.4; a low mitochondrial NADH/NAD⁺ ratio",
        "0.23; a high mitochondrial NADH/NAD⁺ ratio"
      ],
      ans:0,
      exp:"Ratio = 3.5/0.8 ≈ **4.4**. β-Hydroxybutyrate dehydrogenase interconverts the two ketone bodies (acetoacetate + NADH + H⁺ ⇌ β-hydroxybutyrate + NAD⁺) near equilibrium, so a high β-OHB:AcAc ratio means a **reduced mitochondrial state** (high NADH/NAD⁺), as produced by brisk β-oxidation during fasting. The ratio rises further in alcoholic ketoacidosis, where ethanol metabolism adds more NADH. 0.23 is the inverted ratio."
    },
    {
      q:"The carnitine shuttle is required for long-chain fatty acid entry into mitochondria. Malonyl-CoA inhibits CPT-I. What is the physiological significance of this inhibition?",
      choices:[
        "It prevents newly made fatty acids from being oxidized right away",
        "It speeds fatty acid oxidation whenever lipogenesis is active",
        "It routes medium-chain fatty acids to MCAD instead of CPT-II",
        "It prevents carnitine depletion during active lipogenesis"
      ],
      ans:0,
      exp:"Malonyl-CoA, made by acetyl-CoA carboxylase, is the committed intermediate of fatty acid synthesis and is high in the fed, insulin-dominant state. By inhibiting CPT-I it keeps fatty acids out of the mitochondria, **preventing a futile cycle** of simultaneous synthesis and oxidation. In fasting, malonyl-CoA falls, CPT-I is released and β-oxidation proceeds. Medium-chain fatty acids can enter mitochondria without the carnitine shuttle, so CPT-I regulation does not route them."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 6: Genetics & Molecular Biology
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_6',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Gene Regulation: The lac Operon and Catabolite Repression',
  passage:`The lac operon encodes proteins for lactose catabolism: lacZ (β-galactosidase), lacY (lactose permease), and lacA (thiogalactoside transacetylase). Expression is controlled by two regulatory mechanisms: negative control by the lac repressor (LacI) and positive control by catabolite activator protein (CAP).

In the absence of lactose, LacI binds the operator (O1 and pseudo-operators O2/O3), forming a DNA loop that sterically blocks RNA polymerase. Allolactose (a lactose metabolite) is the true inducer — it binds LacI, causing conformational change and dissociation from the operator.

CAP (also called CRP) is a dimeric protein that binds cAMP. When glucose is absent, adenylyl cyclase produces cAMP, which binds CAP. The CAP-cAMP complex binds the CAP binding site upstream of the lac promoter, making contacts with RNA polymerase α-subunit and recruiting it to the weak lac promoter. When glucose is present, adenylyl cyclase is inhibited (via PTS-mediated inhibition), cAMP falls, CAP-cAMP dissociates, and transcription is about 20-fold lower.

Researchers measured lac operon expression under four conditions and obtained relative β-galactosidase activities: glucose+/lactose- (1×), glucose+/lactose+ (50×), glucose-/lactose- (2×), glucose-/lactose+ (1000×). They also analyzed a mutant with a constitutively active LacI that cannot bind allolactose.`,
  questions:[
    {
      q:"Under glucose+/lactose- conditions, lac operon expression is minimal (1×). Which molecular events explain this low baseline?",
      choices:[
        "LacI is off the operator, and CAP-cAMP is not bound",
        "LacI is on the operator, and CAP-cAMP is not bound",
        "LacI is on the operator, and CAP-cAMP is bound",
        "LacI is off the operator, and CAP-cAMP is bound"
      ],
      ans:1,
      exp:"With no lactose there is no allolactose, so **LacI stays on the operator** (negative control on). With glucose present, cAMP is low, so **CAP-cAMP is not bound** and RNA polymerase is not recruited (positive control off). Both controls oppose transcription, giving the minimal 1× (leaky) level. LacI bound with CAP-cAMP bound is the glucose−/lactose− condition (2×)."
    },
    {
      q:"Why is β-galactosidase activity highest (1000×) under glucose-/lactose+ conditions?",
      choices:[
        "Lack of glucose speeds lactose import, which degrades LacI",
        "Allolactose releases LacI, and high cAMP lets CAP-cAMP recruit RNA polymerase",
        "Lack of glucose induces all sugar-catabolism genes constitutively",
        "Allolactose binds CAP directly and converts it into an activator"
      ],
      ans:1,
      exp:"Maximal expression requires both controls to favor transcription: lactose yields **allolactose**, which binds LacI and releases it from the operator, and the absence of glucose raises **cAMP**, so CAP-cAMP binds upstream and recruits RNA polymerase to the weak lac promoter. With glucose present, CAP-cAMP is lost and expression is only 50×, showing the two effects multiply. Allolactose acts on LacI, not CAP, and LacI is released, not degraded."
    },
    {
      q:"A mutant LacI cannot bind allolactose. Assuming this mutant is expressed from the chromosomal lacI gene in an otherwise wild-type cell, what phenotype would result?",
      choices:[
        "Normal induction by lactose, but loss of catabolite repression",
        "Permanent repression, even when lactose is present",
        "Constitutive expression, because LacI falls off the operator",
        "Normal regulation, because the operator is unaffected"
      ],
      ans:1,
      exp:"Wild-type LacI leaves the operator only when allolactose binds it. A LacI that **cannot bind the inducer** stays on the operator whatever the lactose level, so the operon is never induced (a **superrepressor**, lacIˢ) and the cell cannot use lactose as its sole carbon source. Because the repressor acts in trans, this mutation is dominant even over a wild-type lacI copy. Constitutive expression would instead result from a LacI that cannot bind DNA or an operator mutation."
    },
    {
      q:"In the glucose-/lactose- condition, expression is only 2× (not 1000×). What accounts for the 2-fold increase over baseline?",
      choices:[
        "A cryptic promoter becomes active when glucose is absent",
        "CAP-cAMP is bound, but LacI still occupies the operator",
        "Absence of glucose increases transcription of all E. coli genes",
        "Absence of glucose increases translation of lac mRNA"
      ],
      ans:1,
      exp:"Without lactose there is no allolactose, so LacI stays on the operator (strong repression); without glucose, cAMP is high and **CAP-cAMP binds** and recruits RNA polymerase. CAP-cAMP raises expression only slightly (2× vs. 1×) because LacI still blocks transcription, about 0.2% of the fully induced 1000× level. CAP-cAMP cannot override repression without inducer; the two controls act multiplicatively."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 7: Cardiovascular Physiology (Bio)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_7',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Frank-Starling Mechanism and Heart Failure',
  passage:`The Frank-Starling law states that stroke volume increases with increasing preload (end-diastolic volume, EDV) up to an optimal sarcomere length. The mechanism involves stretch-dependent increase in myofilament Ca²⁺ sensitivity and optimal overlap between actin and myosin filaments. Normal sarcomere length in resting myocardium is 1.9-2.2 μm; at shorter lengths, actin filaments overlap and impair cross-bridge formation; at longer lengths (>2.4 μm), overlap decreases.

In a cardiac catheterization lab, a cardiologist measures hemodynamics in a healthy volunteer and a patient with dilated cardiomyopathy (DCM). The volunteer: EDV = 130 mL, end-systolic volume (ESV) = 50 mL, stroke volume (SV) = 80 mL, heart rate (HR) = 70 bpm, mean arterial pressure (MAP) = 90 mmHg. The DCM patient: EDV = 240 mL, ESV = 190 mL, SV = 50 mL, HR = 95 bpm, MAP = 78 mmHg.

The cardiologist administers dobutamine (β₁-adrenergic agonist, positive inotrope) to the DCM patient. After infusion: EDV = 220 mL, ESV = 150 mL, SV = 70 mL, HR = 105 bpm, MAP = 85 mmHg.

Cardiac output (CO) = SV × HR. Ejection fraction (EF) = SV/EDV × 100%.`,
  questions:[
    {
      q:"Calculate and compare the ejection fractions and cardiac outputs for the healthy volunteer and DCM patient (before dobutamine):",
      choices:[
        "Volunteer: EF = 62%, CO = 5.6 L/min; DCM: EF = 21%, CO = 4.75 L/min",
        "Volunteer: EF = 80%, CO = 5.6 L/min; DCM: EF = 50%, CO = 4.75 L/min",
        "Volunteer: EF = 38%, CO = 5.6 L/min; DCM: EF = 79%, CO = 4.75 L/min",
        "Volunteer: EF = 62%, CO = 11.2 L/min; DCM: EF = 42%, CO = 9.5 L/min"
      ],
      ans:0,
      exp:"**EF = SV/EDV**: volunteer 80/130 ≈ 62%, DCM 50/240 ≈ 21%. **CO = SV × HR**: volunteer 80 × 70 = 5.6 L/min, DCM 50 × 95 = 4.75 L/min. Normal EF is ~55–70%, and EF ≤ 40% indicates systolic failure; the DCM patient props up CO with a faster heart rate and a dilated ventricle. Using SV in mL as if it were a percentage gives the tempting 80% and 50% values."
    },
    {
      q:"The DCM patient's EDV is 240 mL (vs 130 mL in the volunteer). According to the Frank-Starling mechanism, why doesn't this greater preload fully compensate for the reduced contractility?",
      choices:[
        "Greater EDV activates stretch receptors that reflexly inhibit contractility",
        "Depressed contractility flattens the Frank-Starling curve, so extra preload adds little",
        "Greater EDV lowers coronary perfusion pressure, causing global ischemia",
        "Greater EDV reduces venous return by raising right atrial pressure"
      ],
      ans:1,
      exp:"Preload raises stroke volume along a **Frank-Starling curve whose height is set by contractility**. In DCM, myocyte loss and dysfunction depress contractility and flatten the curve, so a large EDV increase (130 → 240 mL) yields only 50 mL SV (EF ~21%). Dilation occurs mainly by adding sarcomeres in series, not by overstretching them onto a descending limb. The larger radius also raises wall stress (Laplace: T ∝ Pr/h), increasing O₂ demand and worsening function."
    },
    {
      q:"After dobutamine, SV increased from 50 to 70 mL while EDV decreased from 240 to 220 mL. What does this demonstrate about dobutamine's mechanism?",
      choices:[
        "It mainly increases preload, moving the heart up its existing curve",
        "It increases contractility, shifting the Frank-Starling curve upward",
        "It mainly dilates arterioles, lowering afterload and arterial pressure",
        "It mainly raises heart rate, which increases stroke volume directly"
      ],
      ans:1,
      exp:"With preload alone, a lower EDV (240 → 220 mL) would lower stroke volume; instead SV rose from 50 to 70 mL, the signature of **increased contractility** (a positive inotropic effect). β₁ stimulation raises cAMP and PKA, which phosphorylates L-type Ca²⁺ channels and phospholamban, enlarging the systolic Ca²⁺ transient. Afterload reduction is not the main effect here, because MAP rose (78 → 85 mmHg), and preload actually fell."
    },
    {
      q:"The DCM patient's MAP is 78 mmHg with CO = 4.75 L/min. Using MAP ≈ CO × SVR (in dyn·s/cm⁵, SVR = 80 × MAP/CO), and taking a typical SVR as 900 dyn·s/cm⁵, what has most likely happened to SVR in this patient?",
      choices:[
        "SVR has decreased, as arterioles dilate to unload the failing ventricle",
        "SVR has increased, as sympathetic and RAAS activation constrict arterioles",
        "SVR is unchanged, so the MAP simply tracks the low CO",
        "SVR has decreased, as natriuretic peptides from the dilated heart prevail"
      ],
      ans:1,
      exp:"SVR = 80 × MAP/CO = 80 × 78/4.75 ≈ 1,310 dyn·s/cm⁵, well above 900; with a typical SVR this CO would give a MAP of only ~53 mmHg. Low CO in heart failure activates the **sympathetic nervous system, RAAS and ADH**, which constrict arterioles and retain fluid to defend MAP. Natriuretic peptides do rise but are overridden; over time the extra afterload and neurohormones worsen remodeling, which is why ACE inhibitors and β-blockers help."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 8: Immune System (Bio)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_8',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'MHC Restriction, T Cell Activation, and Autoimmunity',
  passage:`T cell recognition requires presentation of peptide antigens by MHC molecules. CD8⁺ cytotoxic T cells recognize peptides (8-10 amino acids) bound to MHC class I molecules, expressed on all nucleated cells. CD4⁺ helper T cells recognize peptides (13-25 amino acids) from exogenously processed antigens bound to MHC class II, expressed constitutively on professional antigen-presenting cells (APCs: dendritic cells, macrophages, B cells).

Full T cell activation requires two signals: Signal 1 (TCR-pMHC engagement) and Signal 2 (CD28 on T cell binds B7.1/B7.2 on APC). Without Signal 2, T cells become anergic — antigen-specific unresponsiveness. Activated CD4⁺ T cells differentiate into Th1 (IFN-γ, cell-mediated immunity), Th2 (IL-4/5/13, humoral/allergic immunity), Th17 (IL-17, mucosal defense), or Treg (FoxP3, immune tolerance).

In type 1 diabetes mellitus (T1DM), autoreactive CD8⁺ T cells recognize peptides from pancreatic β-cell antigens (insulin, GAD65, IA-2) presented on HLA-A2 (MHC class I). These cells destroy β cells via perforin-granzyme B and Fas-FasL pathways.

Researchers designed a tolerogenic nanoparticle (TNP) carrying β-cell peptide + anti-CD3 antibody (partial T cell signal) to induce anergy in autoreactive T cells. In NOD mice (T1DM model), TNP treatment prevented diabetes onset in 68% of pre-diabetic animals.`,
  questions:[
    {
      q:"Cytotoxic T cells destroy virally infected cells by recognizing viral peptides on MHC class I. Which cells would be invisible to CD8⁺ T cell surveillance?",
      choices:[
        "Hepatocytes infected with hepatitis B virus",
        "Mature red blood cells infected with a parasite",
        "Neurons infected with a neurotropic virus",
        "Fibroblasts infected with herpes simplex virus"
      ],
      ans:1,
      exp:"MHC class I presents cytosolic peptides (proteasome → TAP → ER → surface) on **nucleated cells**. Mature red cells have no nucleus or ribosomes, make no new proteins and display essentially no MHC I, so CD8⁺ T cells cannot detect intracellular pathogens in them; malaria parasites in red cells exploit this. Neurons express MHC I at low levels, which reduces but does not abolish CD8⁺ surveillance, while hepatocytes and fibroblasts express it normally."
    },
    {
      q:"Regulatory T cells (Tregs, FoxP3⁺) suppress autoreactive T cells and prevent autoimmunity. Which mechanism best describes how a deficiency in Tregs leads to autoimmunity?",
      choices:[
        "Thymic negative selection fails, so more autoreactive T cells are produced",
        "Autoreactive T cells that escaped the thymus go unsuppressed in the periphery",
        "B cells cannot class-switch, so protective IgG is lost",
        "Autoreactive T cells are no longer killed by Treg-derived perforin"
      ],
      ans:1,
      exp:"Thymic negative selection removes most self-reactive T cells but not all; the escapees are held in check by **peripheral tolerance**, chiefly FoxP3⁺ Tregs. Tregs suppress through IL-10 and TGF-β, CTLA-4 (which strips B7 from APCs), and IL-2 consumption, not by perforin killing. Losing Tregs (as in IPEX syndrome, from FOXP3 mutations) releases these cells and causes multi-organ autoimmunity even though thymic selection still works."
    },
    {
      q:"The tolerogenic nanoparticle carries β-cell peptide + partial T cell signal (anti-CD3 without B7 co-stimulation). Why would this induce anergy rather than activation in autoreactive T cells?",
      choices:[
        "Anti-CD3 delivers a signal strong enough to exhaust the T cells",
        "The T cells receive Signal 1 through the TCR but no CD28 co-stimulation",
        "Anti-CD3 sterically blocks the TCR without delivering any signal",
        "The nanoparticle delivers apoptotic signals directly to the T cells"
      ],
      ans:1,
      exp:"In the **two-signal model**, TCR engagement (Signal 1) without B7–CD28 co-stimulation (Signal 2) produces **anergy**. Signal 1 alone activates NFAT through Ca²⁺/calcineurin but without AP-1, so anergy genes (e.g., the E3 ligases Cbl-b and GRAIL) are expressed instead of IL-2. The nanoparticle supplies peptide and a partial TCR signal but no co-stimulation, so autoreactive cells are silenced rather than activated or killed."
    },
    {
      q:"T1DM autoreactive T cells recognize insulin peptides on HLA-A2. Which patients would be completely resistant to this autoimmune attack by this particular T cell clone?",
      choices:[
        "Patients who receive exogenous insulin injections",
        "Patients who do not express HLA-A2",
        "Patients with low serum insulin levels",
        "Patients with higher-than-average Treg numbers"
      ],
      ans:1,
      exp:"**MHC restriction**: a TCR recognizes a peptide only when it is bound to a particular MHC allele. This clone sees the insulin peptide on HLA-A2, so in a person lacking HLA-A2 the peptide is presented (if at all) on different class I molecules with different grooves, and the clone cannot recognize it. Insulin levels do not matter because the clone targets peptides processed inside β cells, and more Tregs would dampen but not abolish the response."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 9: Renal Physiology & Acid-Base (Bio)
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_9',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Renal Tubular Acidosis and Bicarbonate Handling',
  passage:`The kidneys maintain acid-base balance by excreting H⁺ and reclaiming HCO₃⁻. In the proximal tubule, ~85% of filtered HCO₃⁻ is reabsorbed: luminal H⁺ secretion (via Na⁺/H⁺ exchanger NHE3) combines with HCO₃⁻ to form H₂CO₃, which carbonic anhydrase IV (CAIV, luminal) converts to CO₂ + H₂O. CO₂ enters cells, CAII (cytoplasmic) regenerates H₂CO₃ → HCO₃⁻, which exits the basolateral membrane via NBC1 cotransporter.

In the distal nephron (collecting duct), α-intercalated cells use V-type H⁺-ATPase to secrete H⁺ against a large gradient (urine pH can reach 4.5), excreting titratable acid and ammonium. β-intercalated cells secrete HCO₃⁻ via pendrin (Cl⁻/HCO₃⁻ exchanger).

Renal tubular acidosis (RTA) results from defects in tubular acid-base handling. Type 1 RTA (distal): defective H⁺ secretion by α-intercalated cells → urine pH cannot fall below 5.5 despite systemic acidosis → hyperchloremic normal-anion-gap metabolic acidosis, hypokalemia, nephrocalcinosis. Type 2 RTA (proximal): defective HCO₃⁻ reabsorption → HCO₃⁻ lost in urine when plasma [HCO₃⁻] exceeds the lowered threshold (~15 mEq/L).

A 28-year-old woman with Sjögren syndrome (autoimmune exocrinopathy) presents with weakness and pH 7.28, HCO₃⁻ 14 mEq/L, K⁺ 2.8 mEq/L, Cl⁻ 115 mEq/L, Na⁺ 140 mEq/L, urine pH 6.8 despite systemic acidosis.`,
  questions:[
    {
      q:"Calculate the anion gap for this patient: Na⁺ = 140, Cl⁻ = 115, HCO₃⁻ = 14 mEq/L:",
      choices:[
        "11 mEq/L — Na⁺ − (Cl⁻ + HCO₃⁻)",
        "25 mEq/L — Na⁺ − Cl⁻",
        "39 mEq/L — Na⁺ − Cl⁻ + HCO₃⁻",
        "−11 mEq/L — (Cl⁻ + HCO₃⁻) − Na⁺"
      ],
      ans:0,
      exp:"**Anion gap** = Na⁺ − (Cl⁻ + HCO₃⁻) = 140 − (115 + 14) = 11 mEq/L, within the normal ~8–12 range. This is a **normal-anion-gap (hyperchloremic) metabolic acidosis**: as HCO₃⁻ is lost (RTA, diarrhea), Cl⁻ rises to maintain electroneutrality. A high gap would instead signal unmeasured anions such as lactate or ketoacids (MUDPILES)."
    },
    {
      q:"The urine pH is 6.8 despite systemic pH of 7.28 (acidosis). Which type of RTA does this indicate and why?",
      choices:[
        "Type 2 (proximal), because bicarbonate wasting alkalinizes the urine",
        "Type 1 (distal), because α-intercalated cells cannot secrete H⁺",
        "Type 4, because hypoaldosteronism limits NH₄⁺ excretion",
        "No RTA, because a respiratory alkalosis is superimposed"
      ],
      ans:1,
      exp:"Acidemia should drive the collecting duct to acidify urine to pH ≤ 5.5; a urine pH of 6.8 despite systemic pH 7.28 means **distal H⁺ secretion has failed**, the hallmark of type 1 RTA, and Sjögren syndrome is a classic cause. In proximal RTA, once plasma HCO₃⁻ falls below the lowered threshold the distal nephron can still acidify urine, and type 4 RTA causes hyperkalemia, not this patient's K⁺ of 2.8. Nephrocalcinosis in distal RTA reflects hypercalciuria, hypocitraturia and calcium phosphate precipitation in alkaline urine."
    },
    {
      q:"Carbonic anhydrase II (CAII) in proximal tubule cells converts CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. Acetazolamide inhibits CAII. What is the direct effect on bicarbonate reabsorption?",
      choices:[
        "Reabsorption increases, because less luminal HCO₃⁻ is broken down",
        "Reabsorption decreases, causing bicarbonate loss in urine and acidosis",
        "Reabsorption is unchanged, because CAII is needed only for H⁺ secretion",
        "Reabsorption increases, because H⁺ secretion is enhanced"
      ],
      ans:1,
      exp:"Proximal HCO₃⁻ reclamation depends on carbonic anhydrase at both ends: luminal CAIV converts H₂CO₃ to CO₂, and cytosolic CAII regenerates H⁺ (for NHE3) and HCO₃⁻ (for basolateral export). **Acetazolamide** blocks both, so less H⁺ is secreted, filtered HCO₃⁻ is not reclaimed, and it is lost in urine, creating a proximal-RTA-like metabolic acidosis. That is the basis of its mild diuretic effect and of its use in altitude sickness, where the acidosis stimulates breathing."
    },
    {
      q:"The patient's hypokalemia (K⁺ 2.8 mEq/L) in Type 1 RTA is related to urinary K⁺ wasting. Which mechanism best explains K⁺ loss?",
      choices:[
        "Acidosis shifts K⁺ into cells in exchange for H⁺",
        "With distal H⁺ secretion failed, principal cells secrete more K⁺",
        "Alkaline urine precipitates potassium phosphate in the tubules",
        "Sjögren syndrome directly damages proximal tubule K⁺ channels"
      ],
      ans:1,
      exp:"Na⁺ reabsorption by principal cells creates a lumen-negative potential that must be balanced by cation secretion. When α-intercalated cells cannot secrete H⁺, **more K⁺ is secreted** instead, and volume depletion from salt and bicarbonate loss raises aldosterone, which increases K⁺ secretion further. Acidosis actually shifts K⁺ out of cells, not in, and type 4 RTA (low aldosterone effect) causes hyperkalemia for the same reason in reverse."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// B/B PASSAGE 10: Neuroscience — Action Potential & Synaptic Trans
// ══════════════════════════════════════════════════════════════
{
  id:'p_bb_10',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Voltage-Gated Ion Channels and Local Anesthetic Mechanisms',
  passage:`The action potential (AP) in neurons is generated by sequential opening of voltage-gated Na⁺ channels (VGSCs) and K⁺ channels. At resting potential (−70 mV), VGSCs are closed. Depolarization to threshold (−55 mV) opens VGSCs, allowing Na⁺ influx (E_Na = +60 mV) → rapid depolarization to +30 mV. VGSCs rapidly inactivate (ball-and-chain mechanism: intracellular inactivation domain occludes the channel pore within milliseconds). Simultaneously, voltage-gated K⁺ channels open (slower kinetics), allowing K⁺ efflux (E_K = −90 mV) → repolarization and hyperpolarization (afterhyperpolarization). The Na⁺/K⁺-ATPase restores resting gradients.

Local anesthetics (LAs) such as lidocaine are weak bases (pKa ≈ 7.9). At physiological pH (7.4), only about one-quarter is uncharged (membrane-permeant form); the remainder is protonated (charged, membrane-impermeant). The uncharged form crosses the membrane; inside the cell (pH 7.2, slightly more acidic due to metabolic CO₂), equilibrium shifts toward the charged form, which enters and blocks the VGSC pore from the intracellular side.

LAs exhibit use-dependent block: the more frequently an axon fires, the greater the block. This occurs because LAs preferentially bind the open/inactivated states of VGSCs (which exist only during AP firing) rather than the resting/closed state. Recovery from inactivated-state binding is slow.

Nerve fibers differ in diameter, myelination, and firing frequency: C fibers (unmyelinated, pain/temperature, high firing frequency) are blocked at lower LA concentrations than Aα fibers (large, myelinated, motor).`,
  questions:[
    {
      q:"During the AP upstroke, Na⁺ flows into the cell. Using the Nernst equation concept, what drives Na⁺ influx?",
      choices:[
        "The membrane potential exceeds E_Na, so the electrical gradient pulls Na⁺ in",
        "Both the Na⁺ concentration gradient and the negative interior favor entry",
        "The Na⁺/K⁺-ATPase pumps Na⁺ inward during the upstroke",
        "Osmotic pressure differences pull Na⁺ across the membrane"
      ],
      ans:1,
      exp:"The driving force on Na⁺ is V_m − E_Na: (−70) − (+60) = −130 mV at rest and −115 mV at threshold, both strongly inward. **Both gradients point inward**: Na⁺ is ~145 mM outside vs. ~12 mM inside, and the interior is negative. Influx slows as V_m approaches E_Na (+60 mV); V_m never exceeds E_Na during the AP. The Na⁺/K⁺-ATPase runs continuously but pumps Na⁺ outward and moves negligible charge during a single AP."
    },
    {
      subj:'gen_chem',
      q:"Lidocaine has pKa = 7.9. At tissue pH 7.4, what fraction is in the uncharged (membrane-permeant) form?",
      choices:[
        "About 24%",
        "About 50%",
        "About 76%",
        "About 32%"
      ],
      ans:0,
      exp:"**Henderson-Hasselbalch** for a weak base: pH = pKa + log([B]/[BH⁺]), so [B]/[BH⁺] = 10^(7.4 − 7.9) = 10^−0.5 ≈ 0.32. The uncharged fraction is 0.32/(1 + 0.32) ≈ 0.24, or **24%**; 76% is the charged fraction, and 32% is the ratio mistaken for a fraction. Because pH is below the pKa, most of the drug is protonated, and in acidic infected tissue even less is uncharged, which is why local anesthetics work poorly there."
    },
    {
      q:"Use-dependent block explains why C fibers are more sensitive to LAs than Aα fibers. Which factor primarily accounts for this differential sensitivity?",
      choices:[
        "C fibers have a higher Na⁺ channel density, offering more binding sites",
        "Pain signals chemically enhance LA binding to the channel",
        "Sustained C-fiber firing keeps channels in the open/inactivated states LAs bind",
        "C fibers lack myelin, so any drug penetrates them instantly"
      ],
      ans:2,
      exp:"In **use-dependent block**, LAs bind open and inactivated Na⁺ channels much better than resting ones and unbind slowly. The passage describes C fibers as firing at high frequency, so their channels spend more time in the high-affinity states and block accumulates; motor fibers firing in brief volleys with rests allow more recovery. This favors blocking pain over motor function at suitable doses. Pain itself does not alter the drug chemically."
    },
    {
      q:"After an AP, the Na⁺/K⁺-ATPase restores resting ion gradients. How many ATP molecules are consumed per pump cycle, and what is the net ion movement?",
      choices:[
        "1 ATP per cycle; 2 Na⁺ out and 3 K⁺ in",
        "1 ATP per cycle; 3 Na⁺ out and 2 K⁺ in",
        "2 ATP per cycle; 2 Na⁺ out and 2 K⁺ in",
        "1 ATP per cycle; 3 K⁺ out and 2 Na⁺ in"
      ],
      ans:1,
      exp:"The **Na⁺/K⁺-ATPase** hydrolyzes one ATP per cycle to move 3 Na⁺ out and 2 K⁺ in, a net export of one positive charge, so it is electrogenic and adds a few millivolts of negativity to the resting potential. Its main job is maintaining the gradients: high outside Na⁺ for the upstroke and high inside K⁺ for repolarization. Remember 3 Na⁺ out, 2 K⁺ in: more sodium leaves."
    }
  ]
},

]; // end EXAM1_BB_PASSAGES


const EXAM1_BB_DISCRETES = [
  {
    subj:'biology', id:'bb_d_1', type:'discrete', topic:'B/B',
    q:"During translation, the ribosome catalyzes peptide bond formation between the growing polypeptide chain and the incoming aminoacyl-tRNA. Which ribosomal component has peptidyl transferase activity?",
    choices:[
      "The small-subunit rRNA (16S/18S)",
      "A ribosomal protein of the large subunit",
      "The large-subunit rRNA (23S/28S)",
      "Elongation factor EF-Tu (EF-1α)"
    ],
    ans:2,
    exp:"Peptidyl transferase activity resides in the **large-subunit rRNA** (23S in bacteria, 28S in eukaryotes), making the ribosome a ribozyme; no protein lies close enough to the active site to catalyze the reaction. The small subunit decodes mRNA, and EF-Tu only delivers aminoacyl-tRNA to the A site. Antibiotics such as chloramphenicol bind the bacterial peptidyl transferase center."
  },
  {
    subj:'biology', id:'bb_d_2', type:'discrete', topic:'B/B',
    q:"A patient with familial hypercholesterolemia has mutations in the LDL receptor gene. LDL levels are markedly elevated. Which intracellular process is most directly impaired?",
    choices:[
      "Cholesterol synthesis via the mevalonate pathway",
      "Receptor-mediated endocytosis of LDL particles",
      "Secretion of VLDL from the liver",
      "Lipoprotein lipase activity in peripheral capillaries"
    ],
    ans:1,
    exp:"The LDL receptor binds apoB-100 on LDL in clathrin-coated pits; the complex is internalized, the endosome acidifies and releases LDL, the receptor recycles, and LDL goes to lysosomes where cholesteryl esters are hydrolyzed. Without functional receptors, **receptor-mediated endocytosis** fails and plasma LDL rises sharply. Statins inhibit HMG-CoA reductase; the resulting fall in hepatocyte cholesterol activates SREBP-2, which upregulates LDLR (and PCSK9, which is why PCSK9 inhibitors are additive). Familial hypercholesterolemia affects ~1 in 250–500 people."
  },
  {
    subj:'biology', id:'bb_d_3', type:'discrete', topic:'B/B',
    q:"Which of the following correctly describes the inheritance pattern of mitochondrial DNA disorders?",
    choices:[
      "Autosomal dominant — one affected allele is sufficient to cause disease",
      "X-linked recessive — mitochondrial DNA is located on the X chromosome",
      "Maternal — passed from mothers to their children, but not from fathers",
      "Autosomal recessive — both mitochondrial DNA copies must be mutated"
    ],
    ans:2,
    exp:"Mitochondria come almost entirely from the oocyte, and the few sperm mitochondria are destroyed after fertilization, so mtDNA disorders show **maternal inheritance**: an affected mother can pass the mutation to all her children, but an affected father passes it to none. **Heteroplasmy** (a mix of mutant and normal mtDNA) makes severity variable even among siblings. Examples include MELAS, MERRF and Leber hereditary optic neuropathy; cells carry many mtDNA copies, not two, so the recessive model does not apply."
  },
  {
    subj:'biochemistry', id:'bb_d_4', type:'discrete', topic:'B/B',
    q:"Glucokinase (hexokinase IV) in hepatocytes differs from hexokinase I in peripheral tissues in which key property?",
    choices:[
      "Glucokinase is inhibited by glucose-6-phosphate, while hexokinase I is not",
      "Glucokinase has a high Km and is not saturated at normal blood glucose",
      "Glucokinase requires ATP, while hexokinase I does not",
      "Glucokinase has a low Km and is saturated at normal blood glucose"
    ],
    ans:1,
    exp:"**Glucokinase** (liver, pancreatic β cells) has a high Km (~8–10 mM), so its rate rises as blood glucose rises, letting it act as a glucose sensor. **Hexokinase I** has a Km of ~0.1 mM and is saturated at a normal 5 mM glucose. The G6P choice is reversed: hexokinase I is inhibited by G6P and glucokinase is not. Inactivating glucokinase mutations cause MODY2."
  },
  {
    subj:'biology', id:'bb_d_5', type:'discrete', topic:'B/B',
    q:"A researcher disrupts the gene encoding signal recognition particle (SRP). Which cellular process would be most directly impaired?",
    choices:[
      "Translation of cytoplasmic proteins",
      "Transcription of membrane protein genes",
      "Co-translational targeting of proteins to the ER",
      "Nuclear import of transcription factors"
    ],
    ans:2,
    exp:"**SRP** binds the hydrophobic signal sequence as it emerges from the ribosome, pauses translation, and docks the complex at the SRP receptor on the ER, where the chain is threaded through the Sec61 translocon. Without SRP, secretory and membrane proteins are mistargeted, while cytoplasmic proteins (no signal sequence) are made normally. Nuclear import uses nuclear localization signals and importins, not SRP."
  },
  {
    subj:'biology', id:'bb_d_6', type:'discrete', topic:'B/B',
    q:"During a nerve conduction study, a patient shows slowed conduction velocity in peripheral motor nerves. Nerve biopsy reveals loss of myelin sheaths. How does demyelination slow conduction velocity?",
    choices:[
      "It destroys the Na⁺ channels that are concentrated in the myelin sheath",
      "It lets current leak out between nodes, abolishing saltatory conduction",
      "It hyperpolarizes the axon by increasing membrane capacitance",
      "It exposes K⁺ channels that keep the axon permanently hyperpolarized"
    ],
    ans:1,
    exp:"Myelin raises membrane resistance and lowers capacitance between nodes, so current from one node of Ranvier flows **inside the axon** to the next node with little loss, and the AP jumps from node to node (**saltatory conduction**). After demyelination, current leaks across the exposed internode and charges its larger capacitance, so the next node may reach threshold slowly or not at all; conduction slows or blocks, as in multiple sclerosis or Guillain-Barré. Na⁺ channels are clustered at the nodes, not in the myelin itself."
  },
  {
    subj:'biology', id:'bb_d_7', type:'discrete', topic:'B/B',
    q:"Which statement correctly describes the relationship between DNA methylation and gene expression in mammals?",
    choices:[
      "Promoter CpG-island methylation generally activates transcription",
      "Promoter CpG-island methylation generally silences transcription",
      "Methylation regulates only imprinted genes, not other somatic genes",
      "Adenine methylation is the main epigenetic DNA mark in mammals"
    ],
    ans:1,
    exp:"In mammals, DNMTs add methyl groups to **cytosine in CpG dinucleotides**. Methylated promoter CpG islands recruit methyl-binding proteins (e.g., MeCP2) and histone deacetylases, compacting chromatin and **silencing** the gene, whereas active promoters are typically unmethylated. Methylation also underlies imprinting and X inactivation, but it is widespread in somatic regulation; cancers silence tumor suppressors such as MLH1 and p16 by promoter hypermethylation."
  },
  {
    subj:'biology', id:'bb_d_8', type:'discrete', topic:'B/B',
    q:"A muscle fiber is maximally activated by a motor neuron. At the molecular level, which event directly precedes cross-bridge formation between myosin and actin?",
    choices:[
      "Hydrolysis of ATP by the resting myosin head",
      "Ca²⁺ binding to troponin C, shifting tropomyosin off actin's binding sites",
      "Phosphorylation of myosin light chains by myosin light chain kinase",
      "Release of ATP from myosin to trigger the power stroke"
    ],
    ans:1,
    exp:"At rest, tropomyosin covers myosin-binding sites on actin, held there by troponin I. An AP opens RyR1 and releases SR Ca²⁺; **Ca²⁺ binds troponin C**, which binds TnI more tightly and pulls TnI's inhibitory region off actin, so tropomyosin shifts and exposes the sites. The myosin head, already cocked by earlier ATP hydrolysis (ADP + Pi bound), then binds actin. Myosin light chain kinase regulates smooth muscle, not skeletal muscle."
  },
  {
    subj:'biology', id:'bb_d_9', type:'discrete', topic:'B/B',
    q:"A patient has a mutation causing loss of α-1-antitrypsin (AAT). The primary consequence in the lung is:",
    choices:[
      "Reduced surfactant production, causing respiratory distress syndrome",
      "Unopposed neutrophil elastase destroying alveolar walls (emphysema)",
      "Autoimmune destruction of type II pneumocytes",
      "Accumulation of AAT aggregates within alveolar spaces"
    ],
    ans:1,
    exp:"α1-Antitrypsin is a **serpin** that inhibits neutrophil elastase. Without it, elastase degrades alveolar elastin, causing panacinar, lower-lobe-predominant **emphysema**; smoking makes it worse by oxidizing AAT's active-site Met-358. Misfolded AAT aggregates accumulate in hepatocytes (causing liver disease), not in the alveoli, and surfactant deficiency is the cause of neonatal respiratory distress syndrome."
  },
  {
    subj:'biochemistry', id:'bb_d_10', type:'discrete', topic:'B/B',
    q:"In the urea cycle, carbamoyl phosphate synthetase I (CPS-I) is the rate-limiting enzyme. Which allosteric activator is required for CPS-I activity, and what is its physiological significance?",
    choices:[
      "ATP — a high energy charge signals capacity to run the cycle",
      "N-acetylglutamate — it rises when amino acid breakdown is high",
      "AMP — a low energy charge signals need for gluconeogenesis",
      "Carbamoyl phosphate — its own product provides positive feedback"
    ],
    ans:1,
    exp:"Mitochondrial CPS-I (NH₃ + HCO₃⁻ + 2 ATP → carbamoyl phosphate) is essentially inactive without its allosteric activator **N-acetylglutamate (NAG)**. NAG synthase makes NAG from acetyl-CoA and glutamate and is stimulated by arginine, so heavy protein catabolism (more glutamate and arginine) raises NAG and urea-cycle flux. ATP is a substrate of CPS-I, not its regulator, and NAG synthase deficiency causes hyperammonemia even when the cycle enzymes are intact."
  },
  {
    subj:'biology', id:'bb_d_11', type:'discrete', topic:'B/B',
    q:"Which characteristic best defines a tight junction (zonula occludens) and distinguishes it from a desmosome?",
    choices:[
      "Tight junctions use cadherins, while desmosomes use claudins and occludin",
      "Tight junctions seal the paracellular space, while desmosomes anchor cells mechanically",
      "Tight junctions occur only in cardiac muscle, while desmosomes occur in epithelia",
      "Tight junctions link to intermediate filaments, while desmosomes link to actin"
    ],
    ans:1,
    exp:"**Tight junctions** (claudins, occludin) form a continuous apical seal that blocks paracellular diffusion and separates apical from basolateral membrane domains. **Desmosomes** are spot welds of desmosomal cadherins (desmoglein, desmocollin) anchored to intermediate filaments, giving mechanical strength but no seal; pemphigus vulgaris targets desmoglein-3. The protein and filament pairings in the distractors are swapped; actin anchors adherens junctions."
  },
  {
    subj:'biochemistry', id:'bb_d_12', type:'discrete', topic:'B/B',
    q:"During glycolysis, phosphofructokinase-1 (PFK-1) is the primary rate-limiting enzyme. Which combination of molecules allosterically inhibits PFK-1 to reduce glycolytic flux?",
    choices:[
      "AMP and fructose-2,6-bisphosphate",
      "ATP and citrate",
      "Glucose-6-phosphate and NAD⁺",
      "ADP and fructose-1,6-bisphosphate"
    ],
    ans:1,
    exp:"**ATP and citrate** inhibit PFK-1: abundant ATP and a backed-up TCA cycle (citrate) signal that the cell does not need more glycolytic flux; H⁺ also inhibits. AMP, ADP and fructose-2,6-bisphosphate (the most potent activator, made by PFK-2 under insulin) are activators, so the AMP/F2,6BP choice lists activators. Fructose-1,6-bisphosphate is PFK-1's product and feed-forward activates pyruvate kinase."
  },
  {
    subj:'biochemistry', id:'bb_d_13', type:'discrete', topic:'B/B',
    q:"Mature red blood cells (RBCs) generate ATP exclusively through anaerobic glycolysis. Which metabolic pathway is also uniquely important in RBCs to prevent oxidative damage to hemoglobin?",
    choices:[
      "The TCA cycle, which supplies NADH to reduce glutathione",
      "The pentose phosphate pathway, which supplies NADPH to reduce glutathione",
      "Fatty acid oxidation, which supplies acetyl-CoA for heme synthesis",
      "Gluconeogenesis, which supplies glucose for glycolysis"
    ],
    ans:1,
    exp:"The oxidative **pentose phosphate pathway** (via G6PD) makes NADPH, which glutathione reductase uses to keep glutathione reduced (GSH); glutathione peroxidase then uses GSH to destroy H₂O₂ before it oxidizes hemoglobin into Heinz bodies. Red cells lack mitochondria, so the TCA cycle and fatty acid oxidation are absent, and they cannot perform gluconeogenesis. G6PD deficiency (X-linked) causes hemolysis after oxidant stress such as primaquine, dapsone or fava beans."
  },
  {
    subj:'biology', id:'bb_d_14', type:'discrete', topic:'B/B',
    q:"A researcher studying embryonic development notes that certain developmental genes are expressed in precise spatial patterns. She discovers that a transcription factor forms a concentration gradient along the anterior-posterior axis, activating different target genes at different concentration thresholds. This molecule is best described as:",
    choices:[
      "A cytokine that coordinates immune cell development",
      "A morphogen that specifies cell fates by concentration thresholds",
      "A transcriptional coactivator that cannot bind DNA on its own",
      "A receptor tyrosine kinase that relays signals at the membrane"
    ],
    ans:1,
    exp:"A **morphogen** forms a concentration gradient, and cells adopt different fates depending on the local concentration crossing different thresholds (Wolpert's French flag model). Bicoid in the Drosophila embryo is a transcription-factor morphogen that activates targets such as hunchback in the anterior; Sonic hedgehog in the neural tube and BMPs are secreted morphogens. A coactivator would not itself form a DNA-binding gradient, and cytokines and RTKs do not by definition encode position."
  },
  {
    subj:'biology', id:'bb_d_15', type:'discrete', topic:'B/B',
    q:"Which statement correctly describes the mechanism by which acetylcholine (ACh) terminates its own signal at the neuromuscular junction?",
    choices:[
      "Intact ACh is taken back into the nerve terminal by a reuptake transporter",
      "ACh simply diffuses out of the cleft into extracellular fluid",
      "Acetylcholinesterase in the cleft hydrolyzes ACh, and choline is recycled",
      "Monoamine oxidase in the nerve terminal degrades ACh"
    ],
    ans:2,
    exp:"Unlike monoamines, which are cleared mainly by reuptake, ACh is inactivated by **hydrolysis**: acetylcholinesterase in the synaptic basal lamina splits it into acetate and choline within milliseconds. Choline is then taken up by the high-affinity choline transporter and reused by choline acetyltransferase. AChE inhibitors (neostigmine for myasthenia gravis; organophosphates in poisoning) prolong ACh action, and MAO acts on monoamines, not ACh."
  },
  {
    subj:'biology', id:'bb_d_16', type:'discrete', topic:'B/B',
    q:"A child presents with recurrent bacterial infections, particularly encapsulated organisms (Streptococcus pneumoniae, Haemophilus influenzae, Neisseria meningitidis). Laboratory studies reveal absent serum immunoglobulins and absent B cells but normal T cell numbers and function. What is the most likely diagnosis?",
    choices:[
      "DiGeorge syndrome — thymic aplasia with absent T cells",
      "Severe combined immunodeficiency — absent B and T cells",
      "X-linked agammaglobulinemia — BTK mutation blocks B-cell maturation",
      "Common variable immunodeficiency — B cells fail to become plasma cells"
    ],
    ans:2,
    exp:"X-linked agammaglobulinemia (XLA): BTK (Bruton's tyrosine kinase) mutation → pre-B cell receptor signaling fails → B cell maturation arrests at pro-B/pre-B stage → no mature B cells → no immunoglobulins. Presentation: boys, age 6-12 months (after maternal IgG decays), recurrent infections with polysaccharide-encapsulated bacteria (require opsonization by IgG for phagocytosis) — S. pneumoniae, H. influenzae, N. meningitidis. T cells: normal number and function. Treatment: IVIG replacement. Contrast: DiGeorge (T cell deficiency, viral/fungal infections), SCID (both B and T cells absent), CVID (B cells present but low Ig, adult onset), hyper-IgM (CD40L mutation, normal B cells but cannot class-switch)."
  },
  {
    subj:'biology', id:'bb_d_17', type:'discrete', topic:'B/B',
    q:"Which of the following correctly describes the role of telomerase in normal physiology and cancer?",
    choices:[
      "It is active in all somatic cells, so their telomeres never shorten",
      "It is active mainly in germ and stem cells, and most cancers reactivate it",
      "It is a DNA repair enzyme that joins double-strand breaks at chromosome ends",
      "It is switched on in every cell type once telomeres become short"
    ],
    ans:1,
    exp:"Telomerase is a **reverse transcriptase** (TERT) carrying its own RNA template (TERC) that adds TTAGGG repeats, offsetting the end-replication problem of the lagging strand. It is active in germ cells, stem cells and activated lymphocytes but not in most somatic cells, whose telomeres shorten until senescence (the Hayflick limit). About 85–90% of cancers reactivate telomerase (the rest use recombination-based ALT) to divide indefinitely; inherited telomerase defects cause dyskeratosis congenita."
  }
]; // end EXAM1_BB_DISCRETES


function buildBB_Section() {
  const questions = [];
  const p = EXAM1_BB_PASSAGES;
  const d = EXAM1_BB_DISCRETES;

  // Block 1: passages 0,1 then 3 discretes
  p[0].questions.forEach(q => questions.push({...q, passageText:p[0].passage, passageTitle:p[0].title, passageId:p[0].id}));
  p[1].questions.forEach(q => questions.push({...q, passageText:p[1].passage, passageTitle:p[1].title, passageId:p[1].id}));
  questions.push(d[0], d[1], d[2]);

  // Block 2: passages 2,3,4 then 5 discretes
  p[2].questions.forEach(q => questions.push({...q, passageText:p[2].passage, passageTitle:p[2].title, passageId:p[2].id}));
  p[3].questions.forEach(q => questions.push({...q, passageText:p[3].passage, passageTitle:p[3].title, passageId:p[3].id}));
  p[4].questions.forEach(q => questions.push({...q, passageText:p[4].passage, passageTitle:p[4].title, passageId:p[4].id}));
  questions.push(d[3], d[4], d[5], d[6], d[7]);

  // Block 3: passages 5,6,7 then 5 discretes
  p[5].questions.forEach(q => questions.push({...q, passageText:p[5].passage, passageTitle:p[5].title, passageId:p[5].id}));
  p[6].questions.forEach(q => questions.push({...q, passageText:p[6].passage, passageTitle:p[6].title, passageId:p[6].id}));
  p[7].questions.forEach(q => questions.push({...q, passageText:p[7].passage, passageTitle:p[7].title, passageId:p[7].id}));
  questions.push(d[8], d[9], d[10], d[11], d[12]);

  // Block 4: passages 8,9 then 4 discretes
  p[8].questions.forEach(q => questions.push({...q, passageText:p[8].passage, passageTitle:p[8].title, passageId:p[8].id}));
  p[9].questions.forEach(q => questions.push({...q, passageText:p[9].passage, passageTitle:p[9].title, passageId:p[9].id}));
  questions.push(d[13], d[14], d[15], d[16]);

  return questions;
}
const EXAM1_BB_QUESTIONS = buildBB_Section();


const EXAM1_PS_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 1: Social Cognition & Bias
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_1',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Attribution Theory and Fundamental Attribution Error in Clinical Settings',
  passage:`Attribution theory examines how people explain the causes of behavior. Heider's foundational work distinguished dispositional attributions (explaining behavior by internal factors — personality, ability, character) from situational attributions (explaining behavior by external factors — context, circumstance, environment). Kelley's covariation model proposed that attributions depend on three dimensions: consensus (do others behave similarly?), consistency (does the person always behave this way?), and distinctiveness (is the behavior specific to this situation?).

The fundamental attribution error (FAE), described by Ross (1977), refers to the systematic tendency to overestimate dispositional causes and underestimate situational causes when explaining others' behavior, while doing the reverse for one's own behavior (the actor-observer asymmetry). The FAE appears robust across contexts but is modulated by culture: individualistic cultures show stronger FAE than collectivistic cultures.

In a study of medical students' judgments of standardized patients, researchers presented vignettes of patients who were non-adherent to medication regimens. Group A received only information about the non-adherence. Group B received the same information plus context (patient worked two jobs, lacked transportation, could not afford copayments). Group A attributed non-adherence primarily to the patient's character (lazy, uncaring about health); Group B showed significantly more situational attributions. Both groups rated adherence counseling as more appropriate than addressing social determinants.

In a follow-up experiment, when medical students themselves missed a scheduled training session, they listed significantly more situational explanations than when judging peers who missed the same session.`,
  questions:[
    {
      q:"The finding that Group A made more dispositional attributions than Group B demonstrates which psychological phenomenon?",
      choices:[
        "The self-serving bias",
        "The fundamental attribution error",
        "The halo effect",
        "Confirmation bias"
      ],
      ans:1,
      exp:"The **fundamental attribution error** is observers' tendency to overweight dispositional causes of others' behavior. Without context, Group A blamed character (lazy, uncaring); supplying situational information (two jobs, no transport, unaffordable copays) shifted Group B toward situational explanations. The self-serving bias concerns explanations of one's own successes and failures, and confirmation bias concerns seeking evidence that fits existing beliefs."
    },
    {
      q:"Medical students attributed their own missed sessions more to situational factors than peers' missed sessions. This illustrates:",
      choices:[
        "The fundamental attribution error applied to oneself",
        "The actor-observer asymmetry",
        "Social desirability bias",
        "The availability heuristic"
      ],
      ans:1,
      exp:"In the **actor-observer asymmetry**, people explain their own behavior situationally (they know about the traffic or the sick child) but explain the same behavior in others dispositionally, because observers see the person, not the circumstances. Applying the FAE to oneself would mean blaming one's own character, the opposite of what the students did. Social desirability bias could add to it, but it does not explain the self-versus-peer contrast."
    },
    {
      q:"According to Kelley's covariation model, if a patient is non-adherent only to this specific medication (high distinctiveness), has not been non-adherent before (low consistency), and most other patients on the same medication are also non-adherent (high consensus), what attribution is most appropriate?",
      choices:[
        "Dispositional — a trait of the patient explains the non-adherence",
        "Situational — something about this medication explains the non-adherence",
        "Interactional — patient traits and the medication contribute equally",
        "Indeterminate — the three dimensions conflict, so no attribution follows"
      ],
      ans:1,
      exp:"In **Kelley's covariation model**, high consensus (most patients do it) plus high distinctiveness (only with this drug) points to the stimulus, a situational attribution; low consistency further suggests a circumstance-specific cause. Side effects, cost or dosing complexity of this medication are the likely explanation. A dispositional attribution would need low consensus, low distinctiveness and high consistency."
    },
    {
      q:"Both groups recommended adherence counseling over addressing social determinants, despite Group B recognizing situational barriers. This finding best illustrates:",
      choices:[
        "The just-world hypothesis, since students judged the patients deserving of illness",
        "A gap between attribution and intervention, since cause and remedy did not match",
        "Cognitive dissonance, since students changed their attributions to fit the remedy",
        "Self-serving bias, since students credited themselves for patients' adherence"
      ],
      ans:1,
      exp:"Group B recognized situational causes yet, like Group A, still preferred individual-level counseling: **attribution and intervention were dissociated**. Recognizing structural barriers did not translate into structurally targeted solutions, a pattern often traced to individual-focused clinical training. The passage gives no evidence that students judged patients as deserving illness or revised their attributions, so the just-world and dissonance explanations go beyond the data."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 2: Learning & Memory
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_2',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Long-Term Potentiation and the Neurobiology of Memory Consolidation',
  passage:`Long-term potentiation (LTP) in the hippocampus is considered a leading cellular mechanism underlying explicit memory formation. LTP is induced when a synapse receives repeated high-frequency stimulation. At baseline, glutamate released from the presynaptic neuron binds both AMPA receptors (allowing Na⁺ influx, producing EPSP) and NMDA receptors (blocked by Mg²⁺ at resting potential).

During strong stimulation, AMPA-mediated depolarization displaces the Mg²⁺ block, allowing NMDA receptors to pass Ca²⁺. Ca²⁺ influx activates CaMKII, which phosphorylates AMPA receptors (increasing their conductance) and stimulates insertion of additional AMPA receptors into the postsynaptic membrane. Sustained LTP requires gene transcription and new protein synthesis — CREB (cAMP response element binding protein) is a key transcription factor.

Memory consolidation occurs in two phases: synaptic consolidation (hours, requiring protein synthesis) and systems consolidation (weeks to years, involving hippocampal-neocortical dialogue during sleep). In anterograde amnesia (e.g., bilateral hippocampal damage, as in patient H.M.), new explicit memories cannot be formed, but remote memories and implicit/procedural memories are preserved.

Researchers tested memory consolidation using a fear conditioning paradigm in mice. Mice received tone-shock pairings (CS-US association). Injecting a protein synthesis inhibitor into the hippocampus immediately after training impaired 24-hour long-term memory while leaving 1-hour short-term memory intact. Injecting the inhibitor 6 hours after training had no effect on 24-hour memory.`,
  questions:[
    {
      q:"NMDA receptors require both ligand binding (glutamate) and membrane depolarization to open. This property makes them function as:",
      choices:[
        "Inhibitory receptors that hyperpolarize the postsynaptic membrane",
        "Coincidence detectors of pre- and postsynaptic activity",
        "Metabotropic receptors that act through G proteins",
        "Voltage-gated channels that do not require a ligand"
      ],
      ans:1,
      exp:"NMDA receptors open only when glutamate is bound **and** the postsynaptic membrane is depolarized enough to expel the Mg²⁺ block, so they signal the coincidence of presynaptic release and postsynaptic activity. That is the cellular basis of Hebb's rule (cells that fire together wire together). They are excitatory ligand-gated ion channels (ionotropic), not G-protein-coupled, and they do require glutamate (plus glycine as co-agonist)."
    },
    {
      q:"The protein synthesis inhibitor impaired 24-hour memory when given immediately but not 6 hours after training. What does this result reveal about memory consolidation?",
      choices:[
        "Short-term memory requires new protein synthesis, but long-term memory does not",
        "Consolidation requires protein synthesis only during a limited window after learning",
        "The hippocampus does not participate in consolidating this memory",
        "Protein synthesis is required to retrieve the memory at 24 hours"
      ],
      ans:1,
      exp:"Blocking protein synthesis right after training impaired 24-hour memory, but blocking it 6 hours later did not, so **synaptic consolidation** needs new proteins only during a limited early window; once consolidated, the memory no longer depends on them. 1-hour memory was intact, so short-term memory does not need new proteins. If retrieval required protein synthesis, the 6-hour injection would also have impaired 24-hour recall, and the hippocampal injection's effect shows the hippocampus is involved."
    },
    {
      q:"Patient H.M. (bilateral hippocampal resection) had severe anterograde amnesia but could still learn new motor skills (e.g., mirror drawing) despite not remembering the learning sessions. This finding demonstrates:",
      choices:[
        "The hippocampus is not required for any form of learning",
        "Explicit and procedural memory depend on separate brain systems",
        "H.M.'s motor cortex took over the hippocampus's memory functions",
        "Mirror drawing improves with practice without forming any memory"
      ],
      ans:1,
      exp:"H.M. showed that memory is not unitary: his mirror-drawing skill improved across sessions although he did not remember practicing. **Explicit (declarative) memory** requires the hippocampus and medial temporal lobe, which were removed bilaterally (along with most of the amygdala), whereas **procedural skill learning** relies on the basal ganglia and cerebellum, which were intact. Improvement across sessions is itself a memory, just a nondeclarative one, and his failure to form new declarative memories shows the hippocampus was required for those."
    },
    {
      q:"CREB activation is required for late-phase LTP. What type of memory process does this implicate CREB in?",
      choices:[
        "Working memory, the brief maintenance of information for current use",
        "Consolidation into long-term memory, which requires new gene expression",
        "Implicit memory only, independent of the hippocampus",
        "Retrieval, the reactivation of a stored memory during recall"
      ],
      ans:1,
      exp:"**CREB** is a transcription factor activated by Ca²⁺-dependent kinases and PKA; it drives genes (e.g., BDNF, Arc) whose products stabilize synaptic changes in late-phase LTP. Because late LTP and **long-term memory consolidation** both need new transcription and protein synthesis, CREB is implicated in converting short-term into long-term memory; disrupting CREB impairs long-term but not short-term memory. Working memory and retrieval rely on existing proteins and do not need new transcription."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 3: Research Methods & Statistics
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_3',
  subj:'research',
  type:'passage',
  topic:'P/S',
  title:'Study Design and Statistical Analysis in Clinical Research',
  passage:`A research team investigated whether a new cognitive-behavioral therapy (CBT) protocol reduces depression scores in patients with major depressive disorder (MDD). They enrolled 200 patients with MDD diagnosed by DSM-5-TR criteria (and PHQ-9 score ≥ 10) and randomized them 1:1 to CBT (n=100) or treatment as usual (TAU, n=100). Assessors were blinded to treatment assignment. The primary outcome was change in PHQ-9 score from baseline to 12 weeks.

Results: CBT group showed mean PHQ-9 reduction of 7.2 points (SD = 4.1); TAU group showed mean reduction of 4.8 points (SD = 4.3). The researchers conducted a two-sample t-test: t = 4.04, p = 0.0001, 95% CI for the difference: [1.2, 3.6]. Effect size (Cohen's d) = 0.57.

A secondary analysis found a significant interaction between baseline depression severity and treatment response: patients with PHQ-9 ≥ 18 (severe MDD) showed mean reductions of 11.2 points with CBT vs. 6.0 points with TAU (p < 0.001); patients with PHQ-9 10-17 (moderate MDD) showed no significant difference (CBT: 4.1 vs. TAU: 3.9, p = 0.82).

The researchers noted 15% dropout in the CBT group vs. 8% in TAU. They conducted intention-to-treat (ITT) analysis as the primary analysis.`,
  questions:[
    {
      q:"The p-value of 0.0001 means that:",
      choices:[
        "There is a 0.01% probability that the null hypothesis is true",
        "If the groups truly did not differ, a gap this large would occur 0.01% of the time",
        "There is a 99.99% probability that CBT is more effective than TAU",
        "CBT reduces PHQ-9 scores by 0.01% more than TAU"
      ],
      ans:1,
      exp:"A **p-value** is the probability of data at least as extreme as those observed, assuming the null hypothesis is true. Here, if CBT and TAU were equivalent, a difference ≥ 2.4 points would occur only ~0.01% of the time, strong evidence against the null. It is not the probability that the null (or the alternative) is true; that inversion is the most common misreading. The 95% CI [1.2, 3.6] gives the plausible size of the true difference."
    },
    {
      q:"The researchers used intention-to-treat (ITT) analysis. What is the primary advantage of ITT over per-protocol analysis?",
      choices:[
        "It increases statistical power by keeping more patients in the analysis",
        "It preserves randomization by analyzing everyone in the assigned group",
        "It removes the need to check for baseline differences between groups",
        "It estimates the effect in patients who fully adhered to treatment"
      ],
      ans:1,
      exp:"**Intention-to-treat** analyzes every randomized patient in the group to which they were assigned, regardless of adherence or dropout. This keeps the groups comparable, as randomization made them, and avoids the selection bias of a per-protocol (completers-only) analysis; with 15% CBT dropout vs. 8% TAU, dropouts are unlikely to be random. The effect in fully adherent patients is what per-protocol analysis estimates; ITT gives a conservative, real-world estimate."
    },
    {
      q:"Cohen's d = 0.57 for the CBT vs. TAU comparison. How should this effect size be interpreted?",
      choices:[
        "57% of CBT patients improved, compared with none receiving TAU",
        "A medium effect: mean improvement differed by about 0.57 standard deviations",
        "CBT is 57% more effective than TAU on an absolute scale",
        "The result is statistically significant because d exceeds 0.5"
      ],
      ans:1,
      exp:"**Cohen's d** = (M₁ − M₂)/pooled SD = (7.2 − 4.8)/~4.2 ≈ 0.57, so mean improvement with CBT exceeded TAU by about 0.57 SD. By Cohen's benchmarks (0.2 small, 0.5 medium, 0.8 large) this is a medium effect. Effect size measures magnitude independently of sample size; significance comes from the p-value, not from d crossing 0.5. The 2.4-point mean difference is below the commonly cited ~5-point minimal clinically important difference for the PHQ-9, so the overall clinical benefit may be modest."
    },
    {
      q:"The interaction analysis shows CBT is highly effective for severe MDD (PHQ-9 ≥ 18) but not for moderate MDD (PHQ-9 10-17). What is the most important caveat about this secondary analysis?",
      choices:[
        "Secondary analyses are always invalid and should be disregarded",
        "Subgroup effects are only valid when the overall effect is not significant",
        "Subgroup analyses raise the risk of chance (Type I) findings and need replication",
        "Subgroup analyses always underestimate the true treatment effect"
      ],
      ans:2,
      exp:"Every extra test adds a chance of a **false positive**: with 20 subgroup tests at α = 0.05, about one would be significant by chance alone, and subgroups chosen after seeing the data are especially suspect. A secondary interaction like this should be reported as hypothesis-generating and confirmed in a trial designed (and powered) to test it. Secondary analyses are not worthless; they simply carry less evidential weight than the pre-specified primary outcome."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 4: Social Stratification & Health Disparities
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_4',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Social Determinants of Health and the Social Gradient',
  passage:`Epidemiological evidence consistently demonstrates a social gradient in health: morbidity and mortality increase stepwise across the full spectrum of socioeconomic status (SES), not just at the extreme of poverty. This pattern, documented by the Whitehall studies of British civil servants, shows that even those in the second-highest occupational grade have worse health than those at the top — an observation that cannot be explained solely by absolute deprivation.

SES is measured through education, income, and occupational prestige. These dimensions do not perfectly correlate: a nurse with a college education may have high educational attainment but moderate income; a tradesperson may have high income but lower occupational prestige. Each dimension contributes independently to health outcomes.

Mechanisms linking SES to health include: (1) material pathways (access to healthcare, nutrition, safe housing); (2) psychosocial pathways (chronic stress from low control and social threat, which activates the HPA axis → chronic cortisol elevation → immunosuppression, cardiovascular disease); (3) behavioral pathways (smoking, diet, physical activity — partly mediated by stress and structural constraints); and (4) lifecourse effects (adverse childhood experiences, ACEs, have lasting biological effects through epigenetic modification and developmental programming).

A study of 8,000 adults found that ACE score was strongly associated with adult health outcomes: adults with ≥4 ACEs had 4× higher risk of depression, 2.5× higher risk of ischemic heart disease, and 12× higher risk of attempted suicide compared to those with 0 ACEs, after adjustment for current SES.`,
  questions:[
    {
      q:"The social gradient in health (documented in the Whitehall studies) is most inconsistent with which explanation of health disparities?",
      choices:[
        "Psychosocial stress arising from relative social position",
        "Absolute deprivation affecting only people living in poverty",
        "Reduced autonomy and control at lower occupational levels",
        "Lifecourse effects of early socioeconomic conditions"
      ],
      ans:1,
      exp:"Whitehall's key finding is a **gradient**: health worsens at every step down the hierarchy, so even well-paid civil servants in the second-highest grade fare worse than those at the top. An explanation based only on **absolute deprivation** cannot account for differences among people none of whom are poor. Relative position, control at work and lifecourse effects can all vary continuously across grades, so they are consistent with the gradient."
    },
    {
      q:"Chronic psychosocial stress in lower-SES individuals activates the HPA axis. Which physiological mechanism most directly links chronic HPA activation to cardiovascular disease risk?",
      choices:[
        "Cortisol directly stimulates insulin secretion, causing hypoglycemia",
        "Cortisol promotes visceral fat, insulin resistance, hypertension and dyslipidemia",
        "Cortisol suppresses glucagon, causing hypoglycemic heart injury",
        "Cortisol directly kills cardiac myocytes through glucocorticoid receptors"
      ],
      ans:1,
      exp:"Chronically elevated cortisol promotes **visceral fat deposition and insulin resistance**, which lead to dyslipidemia and hyperglycemia, and it raises blood pressure (partly via mineralocorticoid-receptor effects and sympathetic activity); together this is the **metabolic syndrome** cluster that drives atherosclerosis. Cortisol is a counter-regulatory hormone that raises, not lowers, blood glucose. These cumulative effects are part of what McEwen calls allostatic load."
    },
    {
      subj:'research',
      q:"The ACE study found a 12-fold increased suicide attempt risk with ≥4 ACEs after adjusting for current SES. What does this adjustment indicate about the relationship between ACEs and suicide risk?",
      choices:[
        "Current SES fully explains the link between ACEs and suicide attempts",
        "The link persists independently of current SES, through other pathways",
        "Adjusting for current SES artificially inflates the effect of ACEs",
        "Current depression fully explains the link between ACEs and suicide attempts"
      ],
      ans:1,
      exp:"Adjusting for a covariate removes the part of the association it explains. Because the ACE–suicide-attempt association remained about 12-fold **after adjustment for current SES**, SES cannot be the main pathway; other routes, such as altered stress physiology, attachment disruption and psychiatric illness, must carry much of the effect. If SES fully mediated the link, adjustment would have shrunk the association toward 1. The passage did not adjust for depression, so it cannot show that depression explains everything."
    },
    {
      q:"A public health researcher argues that addressing behavioral risk factors (smoking cessation, diet improvement) is sufficient to close the health gap between SES groups. Based on the passage, which argument most directly challenges this position?",
      choices:[
        "Behavioral interventions never work in low-SES populations",
        "Health behaviors are themselves shaped by stress and structural constraints",
        "High-SES people also behave unhealthily, so behavior is irrelevant",
        "Medications are always more effective than behavior change"
      ],
      ans:1,
      exp:"The passage lists behavior as only one of four pathways and says it is **partly mediated by stress and structural constraints**: smoking as coping, limited food access, little time for exercise. Targeting behaviors while leaving upstream material, psychosocial and lifecourse causes untouched would leave much of the gradient in place. The absolute claims (never effective, irrelevant, always more effective) go far beyond the passage."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 5: Psychological Disorders & Treatment
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_5',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'The Biopsychosocial Model of Schizophrenia',
  passage:`Schizophrenia has a lifetime prevalence of roughly 0.3–0.7% (often rounded to 1%) and is characterized by positive symptoms (hallucinations, delusions, disorganized thinking), negative symptoms (diminished emotional expression, alogia, avolition, anhedonia), and cognitive symptoms (impaired working memory, attention, executive function). DSM-5-TR requires two or more characteristic symptoms (at least one being delusions, hallucinations, or disorganized speech) for a significant portion of at least 1 month, with continuous signs of disturbance for at least 6 months.

The dopamine hypothesis posits that positive symptoms result from hyperactivation of mesolimbic dopamine pathways (VTA → nucleus accumbens), while negative and cognitive symptoms reflect hypodopaminergia in the mesocortical pathway (VTA → prefrontal cortex). All effective antipsychotics block D2 receptors; their clinical potency correlates with D2 binding affinity. Second-generation (atypical) antipsychotics additionally block serotonin 5-HT2A receptors, which may reduce extrapyramidal side effects and improve negative symptoms.

Genetic studies show heritability of ~80% for schizophrenia, but identical twin concordance is only 48% — indicating both genetic and environmental contributions. Risk genes include those involved in glutamate signaling (NMDA receptor subunits), synaptic organization (DISC1, CNTNAP2), and immune function. Cannabis use (particularly high-THC strains) increases schizophrenia risk 2-fold in those with genetic vulnerability.

Diathesis-stress model: individuals with genetic vulnerability (diathesis) develop schizophrenia only when exposed to sufficient environmental stressors (prenatal infection, birth complications, urban upbringing, psychosocial trauma). This model explains why not all genetically vulnerable individuals develop illness.`,
  questions:[
    {
      q:"Identical twin concordance of 48% for schizophrenia, compared to theoretical 100% for a purely genetic disorder, demonstrates which principle?",
      choices:[
        "Schizophrenia is not heritable; environment explains all cases",
        "Genes contribute strongly but are not sufficient; environment also matters",
        "Exactly 48% of cases are genetic and 52% are environmental",
        "Epigenetic differences cannot matter, because the twins share a genome"
      ],
      ans:1,
      exp:"Identical twins share essentially all their DNA, so a purely genetic disorder would show near-100% concordance. A 48% rate, far above the under-1% population risk, shows a **strong genetic contribution**, but because about half of co-twins stay unaffected, **genes are not sufficient**: nongenetic influences such as prenatal infection, obstetric complications, cannabis and epigenetic differences also matter, consistent with the diathesis-stress model. Concordance is not a percentage split of cases into genetic and environmental."
    },
    {
      q:"Second-generation antipsychotics block both D2 and 5-HT2A receptors. The D2 blockade in which pathway is thought to cause the therapeutic reduction of positive symptoms?",
      choices:[
        "Nigrostriatal pathway (substantia nigra → striatum)",
        "Mesolimbic pathway (VTA → nucleus accumbens)",
        "Tuberoinfundibular pathway (hypothalamus → pituitary)",
        "Mesocortical pathway (VTA → prefrontal cortex)"
      ],
      ans:1,
      exp:"Per the passage, positive symptoms reflect **mesolimbic** hyperactivity, so D2 blockade there is therapeutic. Blockade elsewhere causes problems: nigrostriatal → extrapyramidal effects (dystonia, akathisia, parkinsonism, tardive dyskinesia); tuberoinfundibular → hyperprolactinemia; mesocortical, already hypoactive → may worsen negative and cognitive symptoms."
    },
    {
      subj:'research',
      q:"The diathesis-stress model predicts that cannabis use increases schizophrenia risk 2-fold specifically in genetically vulnerable individuals. Which study design would most directly test this interaction?",
      choices:[
        "A cross-sectional survey of current cannabis use and diagnoses",
        "A case-control study comparing past cannabis use in cases and controls",
        "A prospective cohort comparing cannabis effects across genetic-risk groups",
        "A randomized trial assigning cannabis to genetically at-risk people"
      ],
      ans:2,
      exp:"A **gene–environment interaction** asks whether the effect of cannabis differs by genetic risk. A prospective cohort that measures genetic liability and cannabis use at baseline, then compares schizophrenia incidence in users vs. non-users within high- and low-risk groups, tests this while establishing that exposure preceded onset. Cross-sectional and case-control designs cannot establish temporal order as well and are prone to recall bias, and deliberately giving a suspected risk factor to vulnerable people would be unethical."
    },
    {
      q:"A patient with schizophrenia on haloperidol (first-generation antipsychotic) develops involuntary rhythmic tongue movements and lip smacking. Which adverse effect is this, and what is its mechanism?",
      choices:[
        "Acute dystonia — sustained spasms within days of starting D2 blockade",
        "Neuroleptic malignant syndrome — fever, rigidity and autonomic instability",
        "Tardive dyskinesia — striatal D2 supersensitivity after chronic blockade",
        "Akathisia — inner restlessness and an inability to sit still"
      ],
      ans:2,
      exp:"Involuntary repetitive orofacial movements (lip smacking, tongue movements) after long-term antipsychotic use define **tardive dyskinesia**. Chronic D2 blockade in the nigrostriatal pathway is thought to cause compensatory receptor upregulation (**supersensitivity**), producing hyperkinetic movements; it can be permanent and is treated with VMAT2 inhibitors (valbenazine, deutetrabenazine) or a switch to clozapine. Acute dystonia appears within hours to days, akathisia is subjective restlessness, and NMS is a febrile emergency with rigidity."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 6: Perception & Sensation
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_6',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Signal Detection Theory and Perceptual Decision-Making',
  passage:`Signal detection theory (SDT) provides a framework for understanding how observers distinguish signals from noise under uncertainty. In medical diagnostics, a radiologist deciding whether a mammogram shows malignancy is performing a detection task: the signal is the true lesion; noise is normal tissue variation. SDT decomposes performance into two independent measures: sensitivity (d', or "d-prime"), reflecting the observer's ability to discriminate signal from noise, and criterion (β), reflecting the observer's decision threshold or response bias.

The criterion is influenced by the relative costs of errors. A hit (correctly detecting a present signal), miss (failing to detect a present signal), false alarm (reporting signal when absent), and correct rejection (correctly reporting signal absent) have different consequences in medical contexts: a miss in cancer screening has severe consequences (delayed diagnosis), while a false alarm has moderate consequences (unnecessary biopsy). Lowering the criterion (liberal bias) increases hits but also false alarms; raising it (conservative bias) reduces both.

Researchers measured radiologist performance on digital mammography using 400 cases (200 true positives, 200 true negatives). Radiologist A achieved 94% sensitivity and 72% specificity. Radiologist B achieved 78% sensitivity and 92% specificity. Receiver operating characteristic (ROC) curves were plotted; the area under the curve (AUC) was 0.88 for Radiologist A and 0.89 for Radiologist B.

Adaptation effects were also studied: after viewing 50 normal mammograms, radiologists' false alarm rate decreased — they raised their criterion, tending to rate ambiguous cases as normal.`,
  questions:[
    {
      q:"Radiologist A has higher sensitivity but lower specificity than Radiologist B. In SDT terms, what does this suggest about their decision criteria?",
      choices:[
        "Radiologist A has a higher d' than Radiologist B",
        "Radiologist A uses a more liberal criterion than Radiologist B",
        "Radiologist A uses a more conservative criterion than Radiologist B",
        "Radiologist A has a lower d' than Radiologist B"
      ],
      ans:1,
      exp:"For a fixed ability to discriminate (d'), moving the criterion **trades sensitivity against specificity**. Radiologist A calls positives readily: more hits (94% sensitivity) but more false alarms (72% specificity), a **liberal** (low) criterion; B is more conservative. Their nearly equal AUCs (0.88 vs. 0.89) show similar discrimination, so the difference lies in the decision threshold, not in skill."
    },
    {
      q:"The AUC (area under the ROC curve) for both radiologists is approximately 0.88-0.89. What does the AUC measure, and what does this value indicate?",
      choices:[
        "The proportion of cancers detected, so 88% of cancers are found",
        "Criterion-free discrimination: an 88% chance a cancer case outranks a normal one",
        "The radiologist's specificity at the chosen criterion, which is 88%",
        "The test-retest reliability of the radiologist's readings"
      ],
      ans:1,
      exp:"The ROC curve plots sensitivity against 1 − specificity across every possible criterion, and its **area summarizes discrimination independent of criterion**. AUC equals the probability that a randomly chosen positive case is rated more suspicious than a randomly chosen negative case: 0.5 is chance, 1.0 is perfect, so 0.88–0.89 is good to excellent. It is not the sensitivity or specificity at any one threshold; those values (94%/72% and 78%/92%) are single points on each curve."
    },
    {
      q:"After viewing 50 normal mammograms, radiologists raised their criterion and decreased false alarm rate. This adaptation effect is most analogous to which sensory phenomenon?",
      choices:[
        "Absolute threshold — the minimum intensity detectable 50% of the time",
        "Weber's law — a just-noticeable difference is a constant fraction of the stimulus",
        "Sensory adaptation — repeated exposure reduces responsiveness to a stimulus",
        "Perceptual constancy — perceived properties stay stable as input changes"
      ],
      ans:2,
      exp:"In **sensory adaptation**, continued or repeated exposure lowers responsiveness, so more stimulation is needed to evoke the same response (e.g., no longer noticing a smell). After a run of normal mammograms, readers likewise shifted toward requiring more evidence before calling a case abnormal, a context-driven rise in criterion. Weber's law concerns discrimination between intensities, and perceptual constancy concerns stable perception of objects despite changing input, not reduced response to repetition."
    },
    {
      q:"In cancer screening, missing a cancer (false negative) carries much greater consequence than a false alarm (false positive requiring biopsy). How should this asymmetric cost structure affect the optimal decision criterion?",
      choices:[
        "Raise the criterion, reducing false alarms at the cost of more misses",
        "Lower the criterion, increasing hits at the cost of more false alarms",
        "Set the criterion midway so sensitivity and specificity are equal",
        "Leave it unchanged, since costs affect d' rather than the criterion"
      ],
      ans:1,
      exp:"In SDT the optimal criterion depends on signal prevalence and on the **relative costs of misses and false alarms**. When a miss (delayed cancer diagnosis) is far costlier than a false alarm (an extra biopsy), the criterion should move in the **liberal** direction to maximize hits, which is why screening tests favor sensitivity. Costs change where the criterion is set, not d', which reflects perceptual discrimination; confirmatory tests, where false positives are costly, favor specificity instead."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 7: Groups, Norms & Social Influence
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_7',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Conformity, Obedience, and Authority in Medical Decision-Making',
  passage:`Social influence on individual behavior operates through multiple mechanisms. Conformity (Asch's line experiments) occurs when individuals change behavior to match group norms even when the group is clearly wrong — driven by normative influence (desire for social acceptance) and informational influence (assuming the group has better information). Normative influence predominates when answers are observable; informational influence predominates in ambiguous situations.

Obedience to authority (Milgram's experiments) demonstrated that 65% of participants administered what they believed to be potentially lethal electric shocks when instructed by an authority figure. Factors increasing obedience: physical proximity of authority figure, perceived legitimacy of institution, increased physical/psychological distance from the victim, lack of prior social support for defiance. Factors decreasing obedience: presence of a dissenting peer, more personal responsibility attribution, physical proximity to victim.

In medical settings, research has documented hierarchy effects: nurses and residents frequently defer to attending physicians even when the physician is making an apparent error. In a classic field study (Hofling, 1966), 21 of 22 nurses (95%) prepared to give twice the labeled maximum dose of an unfamiliar drug when telephoned by an unfamiliar "physician" (a confederate), despite hospital policy prohibiting telephone medication orders.

Groupthink (Janis) occurs in highly cohesive groups under pressure: overestimation of the group's invulnerability, collective rationalization, illusion of unanimity, self-censorship of dissenting views, and emergence of 'mind guards' who protect the group from contrary information.`,
  questions:[
    {
      q:"In the nurse medication study, 95% compliance with an unusual medication order from an unfamiliar physician best demonstrates:",
      choices:[
        "Conformity through normative influence from fellow nurses",
        "Obedience to a perceived authority figure",
        "Groupthink within the nursing team",
        "Social facilitation from the physician's presence"
      ],
      ans:1,
      exp:"Each nurse acted alone on a direct order from someone in a higher-status role, overriding policy and her own judgment: **obedience to authority**, as in Milgram's studies. Conformity requires a peer group whose behavior is matched, groupthink requires a cohesive deliberating group, and social facilitation concerns performance in others' presence (the caller was not even present). Findings like this motivated speaking-up and structured-communication training (e.g., SBAR, TeamSTEPPS)."
    },
    {
      q:"A resident notices what appears to be an error in an attending's surgical plan but stays silent in a room with other residents who also say nothing. This is most consistent with which phenomenon?",
      choices:[
        "Deindividuation from anonymity within the surgical group",
        "Pluralistic ignorance and diffusion of responsibility",
        "Social loafing on a shared group task",
        "Obedience to a direct order from the attending"
      ],
      ans:1,
      exp:"Each resident reads the others' silence as a sign that nothing is wrong (**pluralistic ignorance**) and feels less personally obliged to speak because others could (**diffusion of responsibility**); together these are the bystander effect. The attending gave no order to stay silent, so this is not obedience, and the residents are neither anonymous (deindividuation) nor slacking on a pooled task (social loafing). Crew resource management training targets exactly these dynamics."
    },
    {
      q:"Groupthink in a medical committee would be most effectively countered by which intervention?",
      choices:[
        "Increasing group cohesion to build trust among members",
        "Legitimizing dissent with a devil's advocate and outside experts",
        "Having the leader state a preferred option at the outset",
        "Selecting more similar members to reduce conflict"
      ],
      ans:1,
      exp:"Janis recommended **structurally legitimizing dissent**: assigning a devil's advocate, inviting outside experts, having the leader withhold an initial preference, and holding a second-chance meeting before finalizing. High cohesion and homogeneity are preconditions for groupthink, so increasing them makes it worse, and a leader who states a preference early encourages self-censorship. Reducing time pressure can help but does not directly counter the suppression of dissent."
    },
    {
      q:"In Asch's conformity experiments, conformity rates dropped substantially when even one other participant gave the correct answer. What mechanism explains this effect?",
      choices:[
        "The dissenter proved that the group's answer was wrong",
        "The dissenter broke the majority's unanimity, lowering the social cost of dissent",
        "The dissenter supplied new information about the line lengths",
        "The dissenter created cognitive dissonance that forced reconsideration"
      ],
      ans:1,
      exp:"Asch found that any break in **unanimity**, even a confederate giving a different wrong answer, sharply reduced conformity. Because that dissenter added no correct information, the effect is mainly **normative**: once a person is not the lone deviant, the social cost of disagreeing falls. The lines were unambiguous, so new information was not needed, which is why speaking-up training emphasizes that one supportive colleague makes dissent far easier."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 8: Stress, Coping & Health
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_8',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Stress, Coping Mechanisms, and Allostatic Load in Chronic Disease',
  passage:`Lazarus and Folkman's transactional model of stress defines stress as a transaction between the person and the environment in which the demands exceed the person's perceived resources. Two cognitive appraisals determine the stress response: primary appraisal (is this situation harmful, threatening, or challenging?) and secondary appraisal (what can I do about it?). Coping strategies are broadly categorized as problem-focused (addressing the stressor directly) or emotion-focused (managing the emotional response).

McEwen's concept of allostatic load describes the cumulative physiological cost of adapting to chronic stressors. Repeated activation of the stress response (HPA axis, sympathetic nervous system) leads to allostatic overload: chronically elevated cortisol causes hippocampal atrophy (impaired learning and memory), immunosuppression (decreased NK cell activity, IgA secretion), visceral fat accumulation, and cardiovascular remodeling. High allostatic load is measured by composite biomarkers: cortisol, epinephrine, IL-6, CRP, waist-hip ratio, systolic BP, HDL/LDL ratio, HbA1c.

In a longitudinal study of 1,200 adults in a high-poverty urban neighborhood, allostatic load was measured at baseline and 10 years later. High allostatic load at baseline predicted cardiovascular disease (HR 2.4, 95% CI 1.7-3.4), cognitive decline (HR 1.9), and all-cause mortality (HR 1.6). Dispositional optimism (measured by the LOT-R scale) was negatively associated with allostatic load progression (β = -0.31, p < 0.001), even after controlling for income, age, and baseline health.`,
  questions:[
    {
      q:"A patient with chronic back pain begins an exercise program to strengthen core muscles (primary appraisal: challenging) and practices mindfulness meditation when pain flares (emotion-focused). This represents:",
      choices:[
        "Exclusively problem-focused coping",
        "Both problem-focused and emotion-focused coping",
        "Avoidance coping through denial of the pain",
        "Exclusively emotion-focused coping"
      ],
      ans:1,
      exp:"Exercise to strengthen the back targets the stressor itself (**problem-focused**), while mindfulness during flares manages the distress it causes (**emotion-focused**). Lazarus and Folkman held that adaptive coping often mixes both, matched to how controllable each part of the stressor is. Mindfulness involves nonjudgmental attention to the pain, the opposite of avoidance or denial."
    },
    {
      q:"Allostatic load includes hippocampal atrophy as a biological consequence of chronic stress. What mechanism links chronic cortisol to hippocampal damage?",
      choices:[
        "Cortisol triggers immediate apoptosis of all hippocampal neurons",
        "Cortisol enhances glutamate toxicity, lowers BDNF and causes dendritic retraction",
        "Cortisol raises blood pressure, which reduces hippocampal perfusion",
        "Cortisol blocks neuronal glucose uptake, starving the hippocampus"
      ],
      ans:1,
      exp:"The hippocampus is rich in glucocorticoid receptors. Chronic cortisol **amplifies glutamate excitotoxicity**, suppresses **BDNF** and adult neurogenesis, and causes **dendritic retraction** in CA3 neurons, shrinking hippocampal volume (seen in Cushing syndrome, depression and PTSD). Because the hippocampus normally inhibits the HPA axis, the damage weakens feedback and sustains high cortisol, a vicious cycle. The effect is gradual remodeling, not wholesale immediate cell death."
    },
    {
      q:"Dispositional optimism predicted lower allostatic load progression (β = -0.31) after controlling for income, age, and baseline health. Which mechanism most directly explains this protective effect?",
      choices:[
        "Optimists rarely encounter stressors in the first place",
        "Optimists cope more actively and show smaller physiological stress responses",
        "Optimists carry a gene that directly lowers cortisol",
        "Optimists under-report their allostatic load on questionnaires"
      ],
      ans:1,
      exp:"**Dispositional optimism** (a generalized expectation of good outcomes) is linked to active, problem-focused coping, better health behaviors and smaller, shorter cortisol and cardiovascular responses to stress, all of which slow the accumulation of allostatic load. Response bias cannot explain the result, because allostatic load here is a composite of measured biomarkers (cortisol, CRP, BP, HbA1c), not self-report. Adjustment for income shows the effect is not simply that optimists have easier lives."
    },
    {
      subj:'research',
      q:"The hazard ratio (HR) for cardiovascular disease associated with high allostatic load is 2.4 (95% CI 1.7-3.4). How should this be interpreted?",
      choices:[
        "People with high allostatic load have a 240% absolute risk of CVD",
        "The CVD rate is 2.4 times higher, a statistically significant association",
        "24% of people with high allostatic load develop CVD",
        "The association is not significant because the CI spans more than 1.0"
      ],
      ans:1,
      exp:"A **hazard ratio** compares event rates over follow-up: HR 2.4 means people with high allostatic load developed CVD at 2.4 times the rate of those with low load. The 95% CI (1.7–3.4) is the range of hazard ratios compatible with the data at 95% confidence, and because it **excludes 1.0** (no difference) the association is statistically significant. An HR is a relative measure, not an absolute risk or a percentage, and an observational HR does not by itself show causation."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 9: Development & Personality
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_9',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Erikson\'s Psychosocial Development and Attachment Theory',
  passage:`Erik Erikson's psychosocial theory proposes eight stages of development across the lifespan, each defined by a central conflict whose resolution shapes personality. Key stages include: Trust vs. Mistrust (infancy, 0-18 months) — dependent on caregiver consistency; Autonomy vs. Shame and Doubt (toddler, 18 months-3 years); Initiative vs. Guilt (preschool, 3-6 years); Industry vs. Inferiority (school age, 6-12 years); Identity vs. Role Confusion (adolescence, 12-18 years); Intimacy vs. Isolation (young adult); Generativity vs. Stagnation (middle adult); Integrity vs. Despair (late adult).

John Bowlby's attachment theory proposes that infants form emotional bonds (attachments) with caregivers based on responsive caregiving. Ainsworth's Strange Situation paradigm (with the fourth category added later by Main and Solomon) distinguishes four attachment styles: Secure (caregiver as safe base; distress at separation, comfort at reunion); Anxious-Ambivalent (inconsistent caregiving → preoccupied attachment, intense distress, difficulty being comforted); Avoidant (emotionally unavailable caregiving → suppressed attachment behavior, minimal distress at separation); Disorganized (frightening caregiving, often associated with trauma → no coherent strategy).

A longitudinal study followed 450 children from age 1 to 25. Secure attachment at 12 months predicted better peer relationships at age 10, lower anxiety disorder rates at age 15, and higher relationship satisfaction at age 25. Disorganized attachment was the strongest predictor of borderline personality disorder at age 25 (OR = 4.3).`,
  questions:[
    {
      q:"A 68-year-old retired physician reviews his life and regrets that he chose career advancement over relationships, feels he contributed little of lasting value, and is afraid of death. According to Erikson, this person is most likely experiencing:",
      choices:[
        "Stagnation, the unfavorable outcome of middle adulthood",
        "Despair, the unfavorable outcome of late adulthood",
        "Role confusion, the unfavorable outcome of adolescence",
        "Isolation, the unfavorable outcome of young adulthood"
      ],
      ans:1,
      exp:"Erikson's final stage, **integrity vs. despair**, involves reviewing one's life. Integrity means accepting it as meaningful; **despair** means regret, a sense that life was wasted and time is too short to start over, and fear of death, exactly this retiree's picture. His feeling that he contributed little sounds like stagnation, but at 68 and looking back over a whole life, the late-adulthood conflict is the one at stake."
    },
    {
      q:"In Ainsworth's Strange Situation, an 18-month-old shows minimal distress when her mother leaves, does not seek contact when she returns, and is as easily comforted by the stranger as by the mother. This best describes:",
      choices:[
        "Secure attachment — confident use of the mother as a safe base",
        "Anxious-ambivalent attachment — intense distress and difficulty being soothed",
        "Avoidant attachment — suppressed attachment behavior toward the mother",
        "Disorganized attachment — contradictory, fearful or frozen behavior"
      ],
      ans:2,
      exp:"Minimal distress at separation, ignoring the mother at reunion, and treating the stranger much like the mother are the hallmarks of **avoidant attachment**, linked to emotionally unavailable caregiving. Such infants suppress outward attachment behavior even though their heart rate and cortisol rise during separation. A securely attached child typically shows some distress at separation and seeks comfort from the mother at reunion."
    },
    {
      q:"Disorganized attachment at 12 months predicted borderline personality disorder (OR = 4.3) at age 25. Which mechanism best explains this association?",
      choices:[
        "Shared temperament genes fully account for both conditions",
        "Frightening caregiving impairs affect regulation and coherent models of relationships",
        "High infant cortisol permanently destroys the prefrontal cortex",
        "BPD is diagnosed from childhood attachment style, so the link is circular"
      ],
      ans:1,
      exp:"**Disorganized attachment** arises when the caregiver is both the source of comfort and of fear, leaving the infant no coherent strategy. This undermines development of affect regulation, mentalizing (understanding one's own and others' mental states) and coherent internal working models of relationships, which are core difficulties in borderline personality disorder. An OR of 4.3 is a strong but probabilistic association; genes may contribute, but nothing in the study shows they fully explain it, and BPD is diagnosed from adult symptoms, not infant attachment."
    },
    {
      q:"A 15-year-old is experimenting with different social groups, styles, and values, trying different roles without committing to any. According to Erikson, this is best described as:",
      choices:[
        "Role confusion — failure to form any coherent identity",
        "Identity foreclosure — commitment without exploration",
        "Psychosocial moratorium — active exploration before commitment",
        "Identity achievement — commitment after exploration"
      ],
      ans:2,
      exp:"Erikson called adolescence a **psychosocial moratorium**, a socially sanctioned time to try on roles before committing; Marcia's identity statuses formalize this. **Moratorium** is exploration without commitment (this teen), foreclosure is commitment without exploration, achievement is commitment after exploration, and diffusion is neither. Exploring roles at 15 is normal and healthy, not the role confusion that marks an unresolved stage."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// P/S PASSAGE 10: Socialization, Culture & Health Behavior
// ══════════════════════════════════════════════════════════════
{
  id:'p_ps_10',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Health Belief Model and Culturally Competent Care',
  passage:`The Health Belief Model (HBM, Rosenstock 1966) identifies six constructs that influence health behavior: perceived susceptibility (does the person believe they can get the condition?), perceived severity (how serious do they think it would be?), perceived benefits (do they believe the recommended action will work?), perceived barriers (what obstacles prevent action?), cues to action (events that trigger behavior), and self-efficacy (belief in one's ability to perform the action).

Cultural factors systematically influence all HBM constructs. A study of breast cancer screening utilization among Chinese-American women found lower mammography rates compared to non-Hispanic white women, despite similar insurance coverage. Focus groups identified culturally specific barriers: (1) fatalism (illness as predetermined destiny, reducing perceived benefit of screening); (2) stigma of cancer diagnosis within the community (social consequences exceeding the physical threat); (3) modesty norms affecting willingness to undergo examination; (4) mistrust of the medical system based on immigration status concerns; and (5) collectivistic decision-making (health decisions require family consultation, which delays individual action).

The researcher then implemented a culturally tailored intervention involving Chinese-speaking patient navigators, community education sessions at Chinese Cultural Centers, and family engagement in health discussions. At 12-month follow-up, mammography rates in the intervention group increased from 41% to 68% (compared to 43% in the control group).`,
  questions:[
    {
      q:"Fatalism (belief that cancer outcome is predetermined) primarily affects which HBM construct to reduce screening behavior?",
      choices:[
        "Perceived susceptibility, by changing one's estimated chance of cancer",
        "Perceived benefits, by implying that screening cannot change the outcome",
        "Perceived barriers, by adding practical obstacles to getting screened",
        "Self-efficacy, by reducing confidence in one's ability to get screened"
      ],
      ans:1,
      exp:"In the HBM, **perceived benefits** is the belief that the recommended action will reduce the threat. If the outcome of cancer is predetermined, early detection cannot help, so the perceived benefit of screening disappears; the passage itself describes fatalism as reducing perceived benefit. Barriers are practical or psychological costs of acting, and self-efficacy is confidence in one's ability to act, neither of which fatalism directly targets."
    },
    {
      q:"The collectivistic decision-making pattern (requiring family consultation) most directly illustrates which sociological concept?",
      choices:[
        "Social capital — resources available through social networks",
        "Collectivism — cultural norms that place decisions within the family group",
        "Authoritarian family structure — control of decisions by a single patriarch",
        "Social desirability bias — reporting behavior that will be viewed favorably"
      ],
      ans:1,
      exp:"**Collectivistic cultures** define the self through relationships and expect important decisions, including health decisions, to be made with the family rather than individually; in an individualistic framework this can look like delay. Social capital refers to resources gained through networks, which could actually help screening, and nothing in the passage indicates a single patriarch decides or that reports were biased. Culturally competent care involves family in decisions rather than treating consultation as an obstacle."
    },
    {
      q:"The intervention increased mammography from 41% to 68% in the intervention group vs. 43% in controls. Which component of the intervention most directly addresses the 'cues to action' HBM construct?",
      choices:[
        "Chinese-speaking patient navigators who reduce language barriers",
        "Family engagement that brings relatives into health decisions",
        "Community education sessions that prompt women to get screened",
        "Insurance coverage that removes the cost of mammography"
      ],
      ans:2,
      exp:"**Cues to action** are internal or external triggers that prompt a decision to act, such as a reminder, a physician's recommendation, or seeing peers get screened. Community education sessions at trusted cultural centers supply exactly these prompts, along with peer examples. Navigators mainly lower barriers (language, logistics), family engagement addresses collectivistic decision-making, and insurance was already similar between groups and is not part of the intervention."
    },
    {
      q:"Mistrust of the medical system based on immigration status concerns represents which type of barrier in the HBM, and how should it be addressed in clinical practice?",
      choices:[
        "Perceived severity, addressed by explaining how serious breast cancer is",
        "Perceived barriers, addressed by confidentiality assurances and trusted community staff",
        "Cues to action, addressed by sending more screening reminders",
        "Self-efficacy, addressed by teaching patients to schedule appointments"
      ],
      ans:1,
      exp:"Fear that seeking care could expose immigration status is a cost of acting, so it is a **perceived barrier**, and it reflects real structural risks rather than mere misinformation. It is best addressed by lowering that cost: clear confidentiality policies, care settings that serve patients regardless of status, language access, and community health workers who build trust over time. Emphasizing severity or sending reminders does nothing to remove the fear that keeps patients away."
    }
  ]
},

]; // end EXAM1_PS_PASSAGES


const EXAM1_PS_DISCRETES = [
  {
    subj:'psych_soc', id:'ps_d_1', type:'discrete', topic:'P/S',
    q:"According to Piaget's theory of cognitive development, a 4-year-old child watches an experimenter pour water from a short, wide glass into a tall, narrow glass. The child says the tall glass has 'more water.' This demonstrates which cognitive limitation?",
    choices:[
      "Lack of object permanence",
      "Lack of conservation",
      "Egocentrism",
      "Animism"
    ],
    ans:1,
    exp:"**Conservation** is understanding that quantity stays the same despite changes in appearance. Preoperational children (about 2–7 years) fail because of **centration** (attending only to the taller water level) and **irreversibility** (not mentally pouring it back). Egocentrism is also preoperational but concerns failing to take another's viewpoint (three-mountain task), and object permanence is mastered in the sensorimotor stage."
  },
  {
    subj:'psych_soc', id:'ps_d_2', type:'discrete', topic:'P/S',
    q:"A medical student watches a surgeon perform a technically difficult procedure and thinks 'I could never do that.' Six months later, after watching videos and practicing on a simulator, she successfully performs the procedure. This progression best illustrates Bandura's concept of:",
    choices:[
      "Classical conditioning of surgical cues",
      "Operant shaping of correct movements",
      "Observational learning and growing self-efficacy",
      "Systematic desensitization of surgical anxiety"
    ],
    ans:2,
    exp:"Bandura's **observational learning** (modeling) explains learning by watching the surgeon and the videos, and **self-efficacy**, belief in one's ability to perform a specific task, grew through mastery experiences on the simulator, the strongest source of efficacy. Her initial thought (I could never do that) reflects low self-efficacy that practice reversed. Bandura is not associated with classical conditioning or systematic desensitization, and operant shaping alone ignores the modeling component."
  },
  {
    subj:'research', id:'ps_d_3', type:'discrete', topic:'P/S',
    q:"The prevalence of a disease in a population is 1%. A diagnostic test has sensitivity 95% and specificity 90%. A patient tests positive. What is the positive predictive value (approximate)?",
    choices:[
      "About 95%",
      "About 9%",
      "About 50%",
      "About 90%"
    ],
    ans:1,
    exp:"Take 10,000 people: 100 have the disease, so true positives = 0.95 × 100 = 95; of 9,900 without it, false positives = 0.10 × 9,900 = 990. **PPV** = 95/(95 + 990) ≈ 8.8%, about 9%. With a low prevalence, false positives from the large healthy group swamp the true positives (the base-rate effect). 95% is the sensitivity and 90% the specificity, neither of which is the PPV."
  },
  {
    subj:'research', id:'ps_d_4', type:'discrete', topic:'P/S',
    q:"A researcher measures the correlation between median household income and age-adjusted mortality rate across 50 states. The correlation coefficient r = -0.72. Which interpretation is correct?",
    choices:[
      "Lower income causes higher mortality, as the negative correlation proves",
      "States with lower income tend to have higher mortality, but causation is not shown",
      "Income explains 72% of the variance in mortality across states",
      "The p-value for this correlation is 0.72"
    ],
    ans:1,
    exp:"r = −0.72 is a fairly strong **inverse** association: as median income falls, mortality tends to rise. Correlation does not establish causation, since confounders such as education, healthcare access or diet could drive both. The variance explained is r² ≈ 0.52 (52%), not 72%, and r is not a p-value. Because the data are state-level, applying them to individuals risks the ecological fallacy."
  },
  {
    subj:'psych_soc', id:'ps_d_5', type:'discrete', topic:'P/S',
    q:"Kübler-Ross described five stages of grief. A patient recently diagnosed with terminal cancer says to her oncologist, 'I'll do anything — I'll join every clinical trial, I'll donate to research — just give me 5 more years to see my grandchildren graduate.' Which stage does this best represent?",
    choices:[
      "Denial",
      "Anger",
      "Bargaining",
      "Depression"
    ],
    ans:2,
    exp:"**Bargaining** is an attempt to postpone death or change the outcome through a deal (if I do X, give me Y): here, promising trial participation and donations in exchange for five more years. Denial rejects the diagnosis (this can't be happening), and she has clearly accepted that she is ill. Kübler-Ross's stages are not a fixed sequence; people may skip, repeat or overlap them."
  },
  {
    subj:'psych_soc', id:'ps_d_6', type:'discrete', topic:'P/S',
    q:"Vygotsky's 'Zone of Proximal Development' (ZPD) refers to:",
    choices:[
      "The critical period during which language is most easily acquired",
      "The gap between what a child can do alone and with skilled guidance",
      "The physical closeness between teacher and student needed for learning",
      "The transition period between concrete and formal operational thought"
    ],
    ans:1,
    exp:"Vygotsky's **zone of proximal development** spans tasks a child cannot yet do alone but can do with help from a more knowledgeable other. Learning is most effective there, supported by **scaffolding** that is withdrawn as competence grows. Unlike Piaget's stage-based view, Vygotsky stressed that social interaction drives development; the critical-period and concrete-to-formal choices borrow terms from other theories."
  },
  {
    subj:'psych_soc', id:'ps_d_7', type:'discrete', topic:'P/S',
    q:"Which of the following neurotransmitter-function pairings is INCORRECT?",
    choices:[
      "Dopamine — reward and motor control; mesocortical underactivity linked to negative symptoms",
      "GABA — main inhibitory transmitter; benzodiazepines enhance GABA-A receptor function",
      "Serotonin — mood, sleep and appetite; SSRIs block the serotonin reuptake transporter",
      "Acetylcholine — only excitatory in the CNS; all muscarinic receptors are ionotropic"
    ],
    ans:3,
    exp:"Acetylcholine is not exclusively excitatory, and **muscarinic receptors are metabotropic** (G-protein-coupled); nicotinic receptors are the ionotropic ones. M1/M3/M5 couple to Gq (excitatory) and M2/M4 to Gi (inhibitory), e.g., cardiac M2 receptors slow the heart. The other pairings are correct: mesocortical dopamine underactivity is linked to negative symptoms, GABA is the main inhibitory transmitter enhanced by benzodiazepines, and SSRIs block serotonin reuptake."
  },
  {
    subj:'psych_soc', id:'ps_d_8', type:'discrete', topic:'P/S',
    q:"A public health campaign shows graphic images of smoking-related lung cancer to deter smoking. According to the Elaboration Likelihood Model (ELM), which processing route would be most likely in a motivated, health-conscious individual who carefully considers the evidence?",
    choices:[
      "The peripheral route, driven by cues such as the spokesperson's appeal",
      "The central route, driven by careful evaluation of the arguments",
      "The peripheral route, driven by mental shortcuts about scary images",
      "Social comparison, driven by comparing oneself with the smokers shown"
    ],
    ans:1,
    exp:"In the **Elaboration Likelihood Model** (Petty and Cacioppo), people with high motivation and ability take the **central route**, scrutinizing argument quality and evidence, and the resulting attitude change is more durable. Low motivation or ability leads to the peripheral route, in which superficial cues (attractiveness, emotional intensity, mental shortcuts) drive persuasion. Social comparison is not one of the ELM's two routes."
  },
  {
    subj:'psych_soc', id:'ps_d_9', type:'discrete', topic:'P/S',
    q:"Which statement correctly describes the relationship between the limbic system and emotional processing?",
    choices:[
      "Emotion arises entirely in the limbic system, with no prefrontal role",
      "The amygdala tags emotional salience, and the prefrontal cortex regulates it",
      "The hypothalamus creates conscious feelings, and the amygdala only drives autonomic output",
      "The limbic system handles only negative emotions, and the basal ganglia positive ones"
    ],
    ans:1,
    exp:"The **amygdala** detects threat and emotional salience and strengthens hippocampal consolidation of emotional events (which is why they are remembered well). The **prefrontal cortex** regulates these responses top-down: ventromedial PFC integrates emotional value into decisions and helps extinguish fear, and dorsolateral PFC supports reappraisal. Weak prefrontal control of the amygdala is implicated in PTSD and depression, which rules out the no-prefrontal-role choice; the amygdala also handles positive salience."
  },
  {
    subj:'research', id:'ps_d_10', type:'discrete', topic:'P/S',
    q:"In a randomized controlled trial, a new antidepressant reduces Hamilton Depression Rating Scale (HDRS) scores by 4 points more than placebo (p < 0.001). The minimum clinically important difference for HDRS is 7 points. What is the most appropriate conclusion?",
    choices:[
      "The drug is highly effective, because p < 0.001",
      "The effect is statistically significant but below clinical importance",
      "Any statistically significant improvement is clinically meaningful",
      "The study was underpowered, so its result is unreliable"
    ],
    ans:1,
    exp:"A small p-value shows the 4-point difference is unlikely to be due to chance, not that it matters to patients; with a large sample even trivial differences reach significance. Because 4 points is below the stated **minimum clinically important difference** of 7, the average benefit is statistically real but **clinically small**. An underpowered study would tend to miss effects, not find p < 0.001; if anything this trial may have been large enough to detect a trivial one."
  },
  {
    subj:'psych_soc', id:'ps_d_11', type:'discrete', topic:'P/S',
    q:"Individuals in a crowd behave more aggressively and impulsively than they would alone. They feel anonymous and less personally accountable. This is best described as:",
    choices:[
      "Social facilitation",
      "Groupthink",
      "Deindividuation",
      "Social loafing"
    ],
    ans:2,
    exp:"**Deindividuation** occurs when anonymity and immersion in a group reduce self-awareness and personal accountability, loosening internal restraints so behavior follows situational and group cues, as in riots or online harassment. Social facilitation is improved performance on easy tasks in others' presence, groupthink is faulty decision-making in cohesive groups, and social loafing is reduced effort on pooled tasks; none involves anonymity-driven disinhibition."
  },
  {
    subj:'psych_soc', id:'ps_d_12', type:'discrete', topic:'P/S',
    q:"A researcher studying health disparities finds that African Americans in her study had a higher rate of uncontrolled hypertension than white Americans, but this difference was eliminated after controlling for healthcare access, income, and implicit physician bias. This finding suggests that:",
    choices:[
      "Race is a biological determinant of hypertension control",
      "The disparity is explained by social and structural factors in this study",
      "Controlling for these variables necessarily biases the results",
      "Hypertension has no genetic component in any population"
    ],
    ans:1,
    exp:"When a gap disappears after adjusting for healthcare access, income and physician bias, those **social and structural factors account for the disparity** in this sample, rather than an inherent biological difference by race. Race in such research functions largely as a social category that tracks exposure to discrimination and disadvantage (including the physiological wear described by the weathering hypothesis). The finding concerns this disparity; it does not show that hypertension lacks any genetic component."
  },
  {
    subj:'psych_soc', id:'ps_d_13', type:'discrete', topic:'P/S',
    q:"Which of the following correctly pairs a defense mechanism with its psychological description?",
    choices:[
      "Reaction formation: unconsciously pushing distressing thoughts out of awareness into the unconscious",
      "Rationalization: replacing an unacceptable impulse with its opposite to manage anxiety — e.g., someone who is unconsciously attracted to a person acts hostile toward them",
      "Projection: attributing one's own unacceptable thoughts or feelings to another person — e.g., an angry person perceives others as hostile",
      "Repression: justifying unacceptable behavior with seemingly logical reasons to avoid recognizing its true motivation"
    ],
    ans:2,
    exp:"**Projection** is attributing one's own unacceptable feelings to others, so the angry person who sees others as hostile is correctly matched. The other descriptions are shuffled: pushing thoughts out of awareness is repression (not reaction formation); acting opposite to an unacceptable impulse is reaction formation (not rationalization); and justifying behavior with acceptable-sounding reasons is rationalization (not repression)."
  },
  {
    subj:'psych_soc', id:'ps_d_14', type:'discrete', topic:'P/S',
    q:"The halo effect most directly refers to:",
    choices:[
      "Attributing others' behavior to character rather than circumstances",
      "Performing better on simple tasks when others are watching",
      "Letting a positive impression in one domain color judgments in others",
      "Crediting one's successes to luck and failures to one's own flaws"
    ],
    ans:2,
    exp:"In the **halo effect** (Thorndike), one positive trait spreads to unrelated judgments; for example, attractive people are rated as more intelligent and honest. The reverse (one negative trait tainting everything) is the horn effect. Overweighting character in explaining others' behavior is the fundamental attribution error, and better performance when observed is social facilitation."
  },
  {
    subj:'psych_soc', id:'ps_d_15', type:'discrete', topic:'P/S',
    q:"According to the DSM-5-TR, which statement correctly describes the relationship between major depressive disorder (MDD) and bereavement?",
    choices:[
      "MDD cannot be diagnosed within 2 months of a loss",
      "MDD can be diagnosed during bereavement if full criteria are met",
      "Bereavement always produces MDD in biologically vulnerable people",
      "Prolonged grief disorder and MDD share identical criteria"
    ],
    ans:1,
    exp:"DSM-IV excluded an MDD diagnosis within 2 months of a loss; DSM-5 **removed the bereavement exclusion**, and DSM-5-TR keeps it removed, so MDD can be diagnosed during grief if full criteria are met for ≥ 2 weeks. Clinicians still distinguish grief (waves of sadness tied to the deceased, preserved self-esteem) from MDD (pervasive low mood, worthlessness, anhedonia). **Prolonged grief disorder**, added in DSM-5-TR, is a separate diagnosis with its own criteria."
  },
  {
    subj:'psych_soc', id:'ps_d_16', type:'discrete', topic:'P/S',
    q:"A physician notices that she tends to order more tests for patients who are similar in background to herself (educated professionals) and fewer for working-class patients with limited health literacy, even when clinical presentation is identical. This is most directly an example of:",
    choices:[
      "Statistical discrimination based on group-level risk estimates",
      "Confirmation bias toward existing beliefs about patients",
      "Implicit bias operating outside the physician's awareness",
      "Explicit bias that the physician consciously endorses"
    ],
    ans:2,
    exp:"**Implicit bias** consists of automatic associations between social groups and attributes that shape behavior without awareness; the physician only notices the pattern after the fact, and presentations were identical, so no clinical reason justifies the difference. Explicit bias would be a consciously held belief. Statistical discrimination deliberately uses group averages as a risk estimate, and confirmation bias concerns seeking evidence for an existing belief; neither fits an unnoticed difference in test ordering. Structured protocols and decision support can reduce such variation."
  },
  {
    subj:'psych_soc', id:'ps_d_17', type:'discrete', topic:'P/S',
    q:"James-Lange, Cannon-Bard, and Schachter-Singer provide competing theories of emotion. A person who witnesses a car accident begins trembling and then notices their trembling and concludes 'I must be frightened.' Which theory does this sequence support?",
    choices:[
      "Cannon-Bard — arousal and emotion occur simultaneously and independently",
      "Schachter-Singer — arousal plus a cognitive label of its cause yields emotion",
      "James-Lange — emotion results from perceiving one's own bodily response",
      "Lazarus — an appraisal of the situation comes before arousal and emotion"
    ],
    ans:2,
    exp:"In **James-Lange** theory the sequence is stimulus → bodily response → perception of that response → emotion: we are afraid because we notice ourselves trembling. Cannon-Bard holds that arousal and emotion occur together and independently, and Lazarus puts appraisal first. Schachter-Singer is the closest distractor, but it emphasizes labeling arousal by appraising the situation's cause, whereas this person infers fear directly from the trembling itself."
  }
]; // end EXAM1_PS_DISCRETES

// Extra 2 to reach 59 total
const EXAM1_PS_EXTRA = [
  {
    subj:'research', id:'ps_d_18', type:'discrete', topic:'P/S',
    q:"A study finds that neighborhoods with more green space have lower rates of depression. Residents report using parks for exercise and social interaction. Which research design would best establish that green space causes lower depression rates (rather than reverse causation or confounding)?",
    choices:[
      "A cross-sectional survey measuring green space and depression simultaneously",
      "A retrospective cohort study asking depressed patients how much green space they had growing up",
      "A before-and-after comparison of neighborhoods randomly chosen to receive new parks",
      "A case-control study comparing green space in neighborhoods of depressed vs. non-depressed individuals"
    ],
    ans:2,
    exp:"To rule out reverse causation (depressed people moving to less green areas) and confounding (e.g., SES driving both), exposure must vary independently of residents' characteristics. **Random (or as-if random) assignment of new parks**, with depression measured before and after in parks and comparison neighborhoods (a difference-in-differences analysis), approximates a randomized trial. Cross-sectional data cannot establish time order, recall-based retrospective reports are biased, and case-control studies remain open to selection bias and confounding."
  },
  {
    subj:'psych_soc', id:'ps_d_19', type:'discrete', topic:'P/S',
    q:"Émile Durkheim's sociological theory identified four types of suicide based on social integration and moral regulation. A soldier who sacrifices himself for his unit (high social integration, subordinates self to group) is best classified as which type?",
    choices:[
      "Egoistic — too little social integration",
      "Anomic — too little moral regulation",
      "Altruistic — too much social integration",
      "Fatalistic — too much moral regulation"
    ],
    ans:2,
    exp:"Durkheim classified suicide along two axes: integration (egoistic when too low, **altruistic** when too high) and regulation (anomic when too low, fatalistic when too high). A soldier who dies for his unit is so absorbed in the group that self-sacrifice becomes a duty: altruistic suicide. Fatalistic suicide involves oppressive over-regulation, such as among prisoners or slaves, not devotion to a group."
  }
];


function buildPS_Section() {
  const questions = [];
  const p = EXAM1_PS_PASSAGES;
  const d = EXAM1_PS_DISCRETES;
  const e = EXAM1_PS_EXTRA;

  p[0].questions.forEach(q => questions.push({...q, passageText:p[0].passage, passageTitle:p[0].title, passageId:p[0].id}));
  p[1].questions.forEach(q => questions.push({...q, passageText:p[1].passage, passageTitle:p[1].title, passageId:p[1].id}));
  questions.push(d[0], d[1], d[2]);

  p[2].questions.forEach(q => questions.push({...q, passageText:p[2].passage, passageTitle:p[2].title, passageId:p[2].id}));
  p[3].questions.forEach(q => questions.push({...q, passageText:p[3].passage, passageTitle:p[3].title, passageId:p[3].id}));
  p[4].questions.forEach(q => questions.push({...q, passageText:p[4].passage, passageTitle:p[4].title, passageId:p[4].id}));
  questions.push(d[3], d[4], d[5], d[6], d[7]);

  p[5].questions.forEach(q => questions.push({...q, passageText:p[5].passage, passageTitle:p[5].title, passageId:p[5].id}));
  p[6].questions.forEach(q => questions.push({...q, passageText:p[6].passage, passageTitle:p[6].title, passageId:p[6].id}));
  p[7].questions.forEach(q => questions.push({...q, passageText:p[7].passage, passageTitle:p[7].title, passageId:p[7].id}));
  questions.push(d[8], d[9], d[10], d[11], d[12]);

  p[8].questions.forEach(q => questions.push({...q, passageText:p[8].passage, passageTitle:p[8].title, passageId:p[8].id}));
  p[9].questions.forEach(q => questions.push({...q, passageText:p[9].passage, passageTitle:p[9].title, passageId:p[9].id}));
  questions.push(d[13], d[14], d[15], d[16], e[0], e[1]);

  return questions;
}
const EXAM1_PS_QUESTIONS = buildPS_Section();
