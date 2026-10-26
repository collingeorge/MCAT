// Full-Length Practice Exam 2 — Chemical & Physical Foundations (C/P)
const EXAM2_CP_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 1: Osmosis & Colligative Properties (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_1',
  type:'passage',
  topic:'C/P',
  title:'Osmotic Pressure and Intravenous Fluid Therapy',
  passage:`Osmotic pressure (π) is a colligative property governed by the van't Hoff equation: π = iMRT, where i is the van't Hoff factor (number of particles per formula unit), M is molar concentration, R = 0.0821 L·atm/mol·K, and T is temperature in Kelvin. For electrolytes, i = number of ions produced per formula unit (NaCl: i = 2; CaCl₂: i = 3; glucose: i = 1).

Normal plasma osmolality is 285-295 mOsm/kg, maintained primarily by Na⁺, Cl⁻, and glucose. Plasma osmolality can be estimated: Posm ≈ 2[Na⁺] + [glucose]/18 + [BUN]/2.8 (all in mg/dL for glucose/BUN, mEq/L for Na⁺).

In clinical practice, intravenous fluids are classified by tonicity relative to plasma. Normal saline (0.9% NaCl = 154 mEq/L Na⁺ and Cl⁻, i = 2) is isotonic. Half-normal saline (0.45% NaCl) is hypotonic. Hypertonic saline (3% NaCl = 513 mEq/L) is hypertonic. Lactated Ringer's solution contains Na⁺ 130 mEq/L, Cl⁻ 109 mEq/L, K⁺ 4 mEq/L, Ca²⁺ 3 mEq/L, and lactate 28 mEq/L.

A patient with severe hyponatremia (Na⁺ = 118 mEq/L) is given 3% saline at a controlled rate. Overly rapid correction risks osmotic demyelination syndrome (ODS) — demyelination of brainstem neurons due to rapid osmotic shifts.`,
  questions:[
    {
      q:"Calculate the osmolarity of 0.9% normal saline (NaCl, MW = 58.5 g/mol, i = 2) at 37°C:",
      choices:[
        "154 mOsm/L — 0.154 mol/L NaCl, counting each formula unit once",
        "308 mOsm/L — 0.154 mol/L NaCl × 2 particles per formula unit",
        "462 mOsm/L — 0.154 mol/L NaCl × 3 particles per formula unit",
        "77 mOsm/L — 0.154 mol/L NaCl shared between its 2 ions"
      ],
      ans:1,
      exp:"0.9% NaCl = 9 g/L; 9 ÷ 58.5 g/mol = 0.154 mol/L, and each NaCl gives 2 particles (Na⁺ + Cl⁻), so osmolarity = 2 × 154 = 308 mOsm/L. Answering 154 mOsm/L forgets the van't Hoff factor. The ideal value of 308 is slightly above plasma (285–295 mOsm/kg) because NaCl's osmotic coefficient is <1 (effective ≈ 286 mOsm/kg), which is why normal saline is still classified as isotonic."
    },
    {
      q:"Using the plasma osmolality formula, calculate Posm for a patient with Na⁺ = 140 mEq/L, glucose = 90 mg/dL, BUN = 14 mg/dL:",
      choices:[
        "Posm = 2(140) + 90/18 + 14/2.8 = 280 + 5 + 5 = 290 mOsm/kg",
        "Posm = 140 + 90 + 14 = 244 mOsm/kg",
        "Posm = 2(140) + 90 + 14 = 384 mOsm/kg",
        "Posm = 140/2 + 90/18 + 14/2.8 = 80 mOsm/kg"
      ],
      ans:0,
      exp:"Posm = 2[Na⁺] + glucose/18 + BUN/2.8 = 2(140) + 90/18 + 14/2.8 = 280 + 5 + 5 = 290 mOsm/kg. Normal range 285-295 → this patient is normal. The factor 18 converts glucose from mg/dL to mOsm (MW of glucose = 180 g/mol; 90 mg/dL ÷ 18 = 5 mOsm/kg). The factor 2.8 converts BUN to mOsm (MW of urea = 28 g/mol; 14 mg/dL ÷ 2.8 = 5 mOsm/kg). Forgetting to double Na⁺ (it stands in for its accompanying anions) is the most common error. In hyperglycemia, each 100 mg/dL rise in glucose adds ~5.5 mOsm/kg and draws water out of cells, lowering measured Na⁺ by ~1.6 mEq/L (translocational hyponatremia)."
    },
    {
      q:"Why does rapid correction of hyponatremia with hypertonic saline cause osmotic demyelination syndrome?",
      choices:[
        "Concentrated Na⁺ in hypertonic saline is chemically toxic to myelin on direct contact",
        "Brain cells that shed organic osmolytes during chronic hyponatremia cannot regain them quickly, so they shrink",
        "Rising plasma Na⁺ draws water into brain cells, causing cerebral edema that compresses the pons",
        "Overshoot hypernatremia triggers complement-mediated destruction of oligodendrocytes"
      ],
      ans:1,
      exp:"In chronic hyponatremia (>48 h), brain cells export organic osmolytes (glutamine, taurine, myo-inositol) to avoid swelling; when plasma osmolality is raised quickly, they cannot re-accumulate these osmolytes fast enough, so water leaves the cells and they shrink, injuring oligodendrocytes and myelin, especially in the pons (central pontine myelinolysis). The cerebral edema choice describes the opposite water shift, which is the danger of untreated hyponatremia or of correcting hypernatremia too fast. This is why chronic hyponatremia is corrected by no more than ~8–10 mEq/L per 24 h."
    },
    {
      q:"Lactated Ringer's solution contains lactate 28 mEq/L. What is the fate of lactate after IV infusion, and why is this clinically relevant?",
      choices:[
        "It is excreted unchanged in urine, so it has no net effect on acid-base balance",
        "The liver metabolizes it, consuming H⁺ and generating HCO₃⁻; it can accumulate in liver failure",
        "It buffers H⁺ directly in plasma, so its alkalinizing effect does not depend on the liver",
        "The liver converts it to glucose, so LR is a primary treatment for hypoglycemia"
      ],
      ans:1,
      exp:"Infused lactate is taken up mainly by the liver and oxidized or used for gluconeogenesis; each lactate⁻ metabolized consumes one H⁺, which is equivalent to generating one HCO₃⁻, so LR is mildly alkalinizing. Lactate itself is a very weak base (pKa of lactic acid 3.9) and does not buffer plasma directly, so the effect depends on hepatic metabolism and is lost in severe liver failure or shock, when lactate accumulates. This is also why LR causes less hyperchloremic acidosis than large volumes of normal saline."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 2: Nuclear Magnetic Resonance (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_2',
  type:'passage',
  topic:'C/P',
  title:'MRI Physics and Proton Relaxation',
  passage:`Magnetic resonance imaging (MRI) exploits the magnetic properties of hydrogen nuclei (protons). In a static magnetic field B₀, protons precess around the field axis at the Larmor frequency: ω₀ = γB₀, where γ (gyromagnetic ratio for ¹H) = 42.58 MHz/T. A 3.0 T MRI scanner has a Larmor frequency of 127.7 MHz.

A radiofrequency (RF) pulse at the Larmor frequency tips protons from their equilibrium alignment with B₀. After the pulse, protons return to equilibrium through two independent relaxation processes: T1 relaxation (longitudinal, spin-lattice): regrowth of magnetization along B₀ due to energy transfer to the surrounding lattice; T2 relaxation (transverse, spin-spin): decay of transverse magnetization due to dephasing from spin-spin interactions.

Different tissues have characteristic T1 and T2 values. At 3T: gray matter (T1 = 1,600 ms, T2 = 80 ms), white matter (T1 = 830 ms, T2 = 70 ms), CSF (T1 = 4,000 ms, T2 = 2,000 ms), fat (T1 = 380 ms, T2 = 100 ms). T1-weighted images (short TR, short TE) highlight fat (bright) and CSF (dark). T2-weighted images (long TR, long TE) highlight CSF and edema (bright) and fat (moderate).

Gadolinium contrast agents shorten T1 of adjacent protons by providing magnetic fluctuations at the Larmor frequency, enhancing signal on T1-weighted images. Gadolinium accumulates in regions of blood-brain barrier breakdown.`,
  questions:[
    {
      q:"A 1.5 T MRI scanner is upgraded to 3.0 T. What happens to the Larmor frequency of protons?",
      choices:[
        "It is unchanged, because the Larmor frequency depends on tissue type rather than field strength",
        "It doubles, from about 63.9 MHz to about 127.7 MHz",
        "It rises by a factor of √2, from about 63.9 MHz to about 90.3 MHz",
        "It halves, because a stronger field slows proton precession"
      ],
      ans:1,
      exp:"Larmor frequency ω₀ = γB₀. Since γ is a physical constant for ¹H (42.58 MHz/T), ω₀ is directly proportional to B₀. 1.5T: ω₀ = 42.58 × 1.5 = 63.87 MHz. 3.0T: ω₀ = 42.58 × 3.0 = 127.74 MHz. Doubling B₀ doubles ω₀. This has important consequences: (1) Higher SNR at higher field (more protons align, stronger signal); (2) The RF pulse must be tuned to the new Larmor frequency; (3) Specific absorption rate (tissue heating from RF) increases with B₀²; (4) Susceptibility artifacts worsen at higher field."
    },
    {
      q:"A T2-weighted brain MRI shows a bright lesion in the white matter of a patient with multiple sclerosis. What does T2 signal brightness indicate about this lesion?",
      choices:[
        "A shorter T2 than normal white matter, from more tightly packed myelin",
        "A longer T2 than normal white matter, from increased free water in the plaque",
        "Accumulated gadolinium, which brightens lesions on T2-weighted images",
        "Calcification, which raises proton density and therefore T2 signal"
      ],
      ans:1,
      exp:"T2-weighted images: tissues with long T2 appear bright. Normal white matter has relatively short T2 (~70 ms at 3T) because myelin creates a structured, restricted water environment (promotes rapid dephasing). MS plaques: (1) Demyelination removes the hydrophobic myelin sheath → more free water in the lesion; (2) Inflammation brings additional extracellular water; (3) Free water has longer T2 → appears bright on T2-WI. This is why T2-WI is the primary sequence for detecting MS plaques, cerebral edema, and most white matter pathology — water content is the dominant contrast mechanism. T1 hypointensity ('black holes') reflects irreversible axonal damage in chronic lesions."
    },
    {
      q:"Gadolinium contrast enhances signal on T1-weighted MRI by shortening T1 of adjacent protons. A patient with a brain tumor shows ring enhancement after gadolinium injection. What does this indicate?",
      choices:[
        "Gadolinium spreads evenly through the tumor, so the whole mass is actively enhancing",
        "The rim has an intact blood-brain barrier, which keeps gadolinium out of the tumor core",
        "The rim is leaky, BBB-disrupted active tumor; the dark center is unperfused necrosis",
        "Gadolinium binds necrotic tissue, outlining the dead zone around viable tumor"
      ],
      ans:2,
      exp:"Gadolinium chelates are normally kept out of brain parenchyma by the blood-brain barrier; at the actively growing rim of a high-grade tumor such as glioblastoma, leaky new vessels let gadolinium escape and shorten local T1 (bright ring), while the necrotic center has no perfusion and stays dark. An intact BBB would produce no enhancement at all, which is the usual appearance of low-grade gliomas. Abscesses and metastases can also ring-enhance, so the pattern is suggestive rather than diagnostic."
    },
    {
      q:"CSF has T1 = 4,000 ms and T2 = 2,000 ms, much longer than brain parenchyma. What accounts for the long relaxation times of CSF?",
      choices:[
        "Dissolved paramagnetic ions in CSF prolong relaxation through magnetic interactions",
        "CSF is nearly pure, freely tumbling water, which relaxes inefficiently in both T1 and T2",
        "CSF has a low proton density, which makes its relaxation times appear long",
        "The choroid plexus secretes paramagnetic solutes into CSF that slow relaxation"
      ],
      ans:1,
      exp:"Paramagnetic species shorten, not lengthen, relaxation times (that is how gadolinium works). Relaxation time determinants:T1 and T2 depend critically on molecular motion. Bulk water (CSF, free water): molecules tumble very rapidly → motional narrowing → T1 is long (rapid tumbling is inefficient at Larmor frequency for energy transfer to lattice) AND T2 is long (rapid tumbling averages out local field variations → slow dephasing). Structured water (bound to macromolecules, myelin): restricted motion → T1 shorter, T2 very short. Intermediate: brain parenchyma with mixed free and structured water → intermediate T1, T2. This is why CSF is the brightest structure on T2-WI, darkest on T1-WI (very long T1 means slow recovery → less signal with short TR). FLAIR (Fluid Attenuated Inversion Recovery) nulls CSF signal to reveal periventricular lesions."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 3: Stereochemistry & Drug Development
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_3',
  type:'passage',
  topic:'C/P',
  title:'Chirality, Enantiomers, and Pharmacological Activity',
  passage:`Many pharmaceuticals contain stereocenters — carbon atoms bonded to four different substituents — producing non-superimposable mirror image molecules called enantiomers. A racemic mixture contains equal amounts of both enantiomers. Enantiomers have identical physical properties (melting point, solubility, boiling point) in achiral environments but differ in optical activity (direction of plane-polarized light rotation) and biological activity (interaction with chiral biological targets).

Thalidomide, developed in the 1950s, illustrates the consequences of chirality in drug development. The R-enantiomer is a sedative; the S-enantiomer is teratogenic (causes limb malformations). However, both enantiomers are clinically useless in isolation because thalidomide undergoes rapid in vivo racemization — interconversion between R and S forms via enolization of the chiral center.

Ibuprofen exists as R and S enantiomers. The S-enantiomer (S-ibuprofen) is pharmacologically active (COX inhibitor), while R-ibuprofen is inactive but is largely converted to S-ibuprofen in vivo by hepatic enzymes acting through an acyl-CoA thioester intermediate (unidirectional chiral inversion). Naproxen, by contrast, is sold only as the S-enantiomer because the R-enantiomer is a liver toxin and racemization does not occur in vivo.

Chiral separation techniques (chiral HPLC, asymmetric synthesis) and chiral switches (reformulating racemic drugs as single enantiomers) have become standard in pharmaceutical development. The FDA's 1992 policy statement encouraged chiral switches.`,
  questions:[
    {
      q:"The R and S designations for stereoisomers are assigned using the Cahn-Ingold-Prelog (CIP) priority system. The central principle of this system is:",
      choices:[
        "Substituents are ranked alphabetically by name, with earlier letters given higher priority",
        "Substituents are ranked by atomic number of the attached atom, moving outward to break ties",
        "Substituents are ranked by how many bonds they form to the stereocenter",
        "Substituents are ranked by the total molecular weight of each whole group"
      ],
      ans:1,
      exp:"CIP rules rank substituents by the atomic number of the atom bonded directly to the stereocenter; ties are broken by moving outward and comparing the sets of attached atoms at the first point of difference, with multiply bonded atoms duplicated (C=O counts as C bonded to two O's). With priority 4 pointing away, 1→2→3 clockwise = R and counterclockwise = S. For example, at the α-carbon of L-alanine the order is –NH₂ > –COOH > –CH₃ > –H, which makes L-alanine S; ranking by whole-group mass is a common error, because only the first point of difference in atomic number matters."
    },
    {
      q:"Why is selling pure S-ibuprofen rather than the racemate unlikely to improve clinical outcomes?",
      choices:[
        "The R-enantiomer adds its own COX inhibition, so removing it would lower efficacy",
        "Most R-ibuprofen is inverted to the active S form in vivo, so the racemate already supplies it",
        "Single enantiomers are chemically unstable and would racemize before absorption",
        "Pure S-ibuprofen is absorbed more slowly than the racemate, delaying pain relief"
      ],
      ans:1,
      exp:"The R→S in vivo conversion (unidirectional chiral inversion via an acyl-CoA thioester) means that racemic ibuprofen is a prodrug for S-ibuprofen: you administer 50% S (immediately active) + 50% R (converted to S in liver) → effective S-ibuprofen concentration is nearly as high from the racemate as from pure S-ibuprofen. Unlike naproxen (where R-enantiomer is toxic and no racemization occurs, making chiral switch clinically necessary), the ibuprofen R-enantiomer is non-toxic and is pharmacologically converted to the active form. The chiral switch to S-ibuprofen (dexibuprofen) is commercially available but provides minimal clinical advantage. This contrasts with drugs where the 'wrong' enantiomer is toxic and does not racemize."
    },
    {
      q:"Thalidomide undergoes in vivo racemization via enolization. Giving only the R-enantiomer to pregnant women would not prevent teratogenicity because of this racemization. What structural feature enables thalidomide's chiral center to racemize under physiological conditions?",
      choices:[
        "A tertiary amine next to the stereocenter provides intramolecular nucleophilic catalysis",
        "Its acidic α-C–H (beside a C=O and the imide N) is removed to give a planar enolate",
        "A disulfide bond near the stereocenter undergoes rapid thiol–disulfide exchange",
        "An adjacent aromatic ring stabilizes a planar carbocation formed at the stereocenter"
      ],
      ans:1,
      exp:"Thalidomide's chiral center is C3 of the glutarimide ring: it is α to a glutarimide C=O and bonded to the electron-withdrawing phthalimide nitrogen, so its C–H is unusually acidic. At physiological pH, removal of this proton gives a planar sp² enolate that is reprotonated equally from either face, producing the racemate; amino-acid α-carbons racemize by the same deprotonation route. A carbocation route is implausible because loss of hydride is not favorable, and because thalidomide racemizes quickly, giving a single enantiomer offers no therapeutic benefit."
    },
    {
      q:"Two enantiomers have identical melting points and solubilities. A pharmacologist claims she can distinguish them without using polarimetry. Which method could accomplish this?",
      choices:[
        "Mass spectrometry, because enantiomers give different fragmentation patterns",
        "IR spectroscopy, because enantiomers have different bond vibration frequencies",
        "Chiral HPLC, because each enantiomer interacts differently with a chiral stationary phase",
        "¹H NMR in an achiral solvent, because enantiomers give different chemical shifts"
      ],
      ans:2,
      exp:"Enantiomers have identical properties in achiral environments (melting point, solubility, IR, UV, mass spectrum, and NMR in an achiral solvent), so only a chiral probe can tell them apart. A chiral HPLC column forms transient diastereomeric complexes with each enantiomer, giving different retention times; NMR also works only after adding a chiral shift reagent or derivatizing agent, which converts the pair into diastereomers. Polarimetry, chiral HPLC, and chiral NMR reagents are therefore the standard tools, while plain MS, IR, and achiral NMR cannot distinguish enantiomers."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 4: Kinetics & Reaction Mechanisms (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_4',
  type:'passage',
  topic:'C/P',
  title:'Enzyme Inhibition Kinetics and Drug Resistance',
  passage:`Dihydrofolate reductase (DHFR) catalyzes the reduction of dihydrofolate (DHF) to tetrahydrofolate (THF) using NADPH. THF is essential for nucleotide biosynthesis, particularly thymidylate synthesis. DHFR is inhibited by methotrexate (MTX), a competitive inhibitor (Ki = 0.01 nM) that mimics DHF and binds the active site with ~500,000-fold higher affinity than the natural substrate (Ki 0.01 nM vs. Km 5 μM).

Researchers studied two cancer cell lines: wild-type and MTX-resistant. The wild-type cells showed Km = 5.0 μM and Vmax = 120 nmol/min/mg. When cells were exposed to 1 nM MTX in the culture medium, the apparent Km of intracellular DHFR increased to 65 μM while Vmax was unchanged.

The MTX-resistant line was analyzed and found to overexpress DHFR by 20-fold (gene amplification) with an identical Km and Vmax per enzyme molecule. A second resistant line carried a point mutation in the DHFR active site (Phe31→Ile), reducing MTX binding affinity by 500-fold (Ki_mutant = 5 nM) while increasing Km for DHF to 12 μM.

A third resistance mechanism involved downregulation of the reduced folate carrier (RFC), the transporter that imports MTX into cells, reducing intracellular [MTX] by 10-fold.`,
  questions:[
    {
      q:"In the presence of MTX the apparent Km rose from 5.0 μM to 65 μM. Using apparent Km = Km(1 + [I]/Ki) with Ki = 0.01 nM, what effective intracellular [MTX] does this imply?",
      choices:[
        "About 0.12 nM, since [I]/Ki = 12, far below the 1 nM applied to the medium",
        "1 nM, the applied concentration, since MTX equilibrates fully across the membrane",
        "About 0.13 nM, since [I]/Ki = 13, slightly below the 1 nM applied to the medium",
        "0.01 nM, since an inhibitor present at [I] = Ki raises the apparent Km 13-fold"
      ],
      ans:0,
      exp:"65 = 5.0(1 + [I]/Ki) → 1 + [I]/Ki = 13 → [I]/Ki = 12 → [I] = 12 × 0.01 nM = 0.12 nM. With the full 1 nM inside the cell the formula would predict 5.0 × 101 = 505 μM, far above what was observed, so uptake must limit the intracellular concentration; choosing 0.13 nM is the common error of forgetting to subtract the 1. Because Ki is so small, even sub-nanomolar intracellular MTX raises the apparent Km more than 10-fold (an inhibitor at [I] = Ki only doubles Km)."
    },
    {
      q:"The DHFR-overexpressing resistant cell line (20-fold amplification) has the same Km and Vmax per enzyme molecule. How does overexpression confer MTX resistance?",
      choices:[
        "Each amplified DHFR molecule has a higher Vmax, so catalysis outpaces inhibition",
        "With 20× more enzyme, the fraction left uninhibited still supplies enough THF",
        "Overexpressed DHFR folds into a variant with a lower affinity for MTX",
        "Excess DHFR diverts MTX away from thymidylate synthase, its main lethal target"
      ],
      ans:1,
      exp:"Resistance by gene amplification: Total Vmax = 20 × Vmax_per_molecule. MTX at a given concentration inhibits a fixed fraction of all DHFR molecules. If MTX inhibits 95% of DHFR → 5% remains active → total active enzyme = 0.05 × 20 × Vmax = 1 × Vmax (same as uninhibited wild-type). The cell therefore maintains approximately wild-type DHFR activity despite near-saturating MTX. This is a quantitative resistance mechanism: more enzyme molecules means more MTX required for equivalent inhibition (and because MTX binds so tightly, the extra enzyme also binds up much of the intracellular drug). The passage states that Km and Vmax per molecule are unchanged, which rules out altered kinetics. DHFR amplification is a well-documented clinical resistance mechanism in MTX-treated cancers (especially ALL and osteosarcoma), detectable by FISH or comparative genomic hybridization."
    },
    {
      q:"The Phe31→Ile DHFR mutation reduces MTX affinity 500-fold (Ki_mutant = 5 nM) but increases Km for DHF from 5.0 to 12 μM. This trade-off illustrates which principle?",
      choices:[
        "Directed evolution: random active-site mutations reliably improve substrate specificity",
        "Shared contacts: one residue binds both MTX and DHF, so losing it costs substrate affinity too",
        "Allosteric regulation: a change at a distant site indirectly alters both MTX and DHF binding",
        "Competitive exclusion: Ile fills the active site more tightly and blocks both ligands"
      ],
      ans:1,
      exp:"This is a classic structure-activity trade-off. Phe31 makes van der Waals contact with the pteridine ring of BOTH MTX and DHF (they share structural similarity — MTX is a DHF analog). Mutating Phe31→Ile (smaller, less aromatic) disrupts these hydrophobic contacts: (1) MTX binding drops 500-fold (Ki 0.01→5 nM) — resistance; (2) DHF affinity also decreases (Km 5→12 μM) — fitness cost. The mutant enzyme is resistant but less catalytically efficient. This explains why resistance mutations in drug targets are often 'costly' and may revert when drug pressure is removed. The trade-off between drug resistance and enzymatic fitness is a fundamental concept in evolutionary pharmacology."
    },
    {
      q:"The third resistance mechanism involves downregulation of RFC, the MTX importer, reducing intracellular [MTX] 10-fold. If intracellular [MTX] drops from 0.12 nM to 0.012 nM, what is the new apparent Km (Ki = 0.01 nM, Km = 5.0 μM)?",
      choices:[
        "Apparent Km = 5.0(1 + 0.012/0.01) = 5.0(2.2) = 11 μM",
        "Apparent Km = 5.0(1 + 0.12/0.01) = 65 μM — unchanged",
        "Apparent Km = 0.012/0.01 × 5.0 = 6 μM",
        "Apparent Km = 5.0/10 = 0.5 μM — reduced by same factor as [MTX]"
      ],
      ans:0,
      exp:"Apparent Km = Km(1 + [I]/Ki) = 5.0(1 + 0.012/0.01) = 5.0(1 + 1.2) = 5.0 × 2.2 = 11 μM. Compare to 65 μM with [I] = 0.12 nM. Reducing intracellular [MTX] 10-fold dramatically reduces apparent Km (11 vs 65 μM) → DHFR function is much less impaired → THF production restored → resistance. Simply dividing Km by 10 is wrong because [I] enters the formula inside (1 + [I]/Ki). This shows that pharmacokinetic resistance (less drug reaching the target) can confer resistance even when the drug-target interaction is unchanged. Reduced RFC-mediated uptake is a well-documented MTX resistance mechanism; upregulated ABC efflux pumps (MRPs, BCRP) lower intracellular MTX by the same principle."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 5: Gas Laws & Pulmonary Physiology (Physics/Biochem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_5',
  type:'passage',
  topic:'C/P',
  title:'Gas Exchange and the Alveolar Gas Equation',
  passage:`Gas exchange in the lung is governed by partial pressure gradients. The alveolar gas equation defines the partial pressure of alveolar oxygen: PAO₂ = FiO₂(Patm - PH₂O) - PaCO₂/RQ, where FiO₂ = fraction of inspired O₂, Patm = atmospheric pressure (760 mmHg at sea level), PH₂O = water vapor pressure at body temperature (47 mmHg at 37°C), PaCO₂ = arterial CO₂ tension, and RQ = respiratory quotient (~0.8 for mixed diet).

At sea level on room air: PAO₂ = 0.21(760 - 47) - 40/0.8 = 0.21(713) - 50 = 149.7 - 50 = 99.7 mmHg. Normal arterial PaO₂ is ~100 mmHg. The A-a gradient (PAO₂ - PaO₂) is normally <15 mmHg in young adults, increasing with age.

A 45-year-old woman at sea level on room air has ABG: PaO₂ = 62 mmHg, PaCO₂ = 52 mmHg, pH = 7.30, HCO₃⁻ = 25 mEq/L. She is placed on supplemental O₂ (FiO₂ = 0.40). Her repeat ABG shows PaO₂ = 88 mmHg, PaCO₂ = 54 mmHg.

At high altitude (Denver, 1,600 m, Patm = 630 mmHg), healthy individuals have PAO₂ = 0.21(630-47) - 40/0.8 = 0.21(583) - 50 = 122.4 - 50 = 72.4 mmHg — explaining why altitude causes hypoxia even in healthy subjects.`,
  questions:[
    {
      q:"Calculate the A-a gradient for the patient on room air (PaO₂ = 62 mmHg, PaCO₂ = 52 mmHg):",
      choices:[
        "37.7 mmHg, using the textbook PAO₂ of 99.7 mmHg minus the patient's PaO₂",
        "22.7 mmHg, from a PAO₂ of 0.21(713) − 52/0.8 = 84.7 mmHg",
        "12 mmHg, the difference between the patient's PaCO₂ and a normal PaCO₂",
        "45.6 mmHg, from a PAO₂ of 0.21(760) − 52 = 107.6 mmHg"
      ],
      ans:1,
      exp:"Must use the patient's actual PaCO₂ to calculate their PAO₂: PAO₂ = FiO₂(Patm−PH₂O) − PaCO₂/RQ = 0.21(760−47) − 52/0.8 = 0.21(713) − 65 = 149.7 − 65 = 84.7 mmHg. A-a gradient = PAO₂ − PaO₂ = 84.7 − 62 = 22.7 mmHg. This is elevated (normal <15 mmHg for a 45-year-old), indicating an intrinsic lung problem (V/Q mismatch, diffusion impairment, shunt) rather than pure hypoventilation. If A-a gradient were normal, hypoxia would be explained by hypoventilation alone (elevated PaCO₂ displacing O₂ in alveoli)."
    },
    {
      q:"The patient's ABG shows pH 7.30, PaCO₂ 52 mmHg, HCO₃⁻ 25 mEq/L. What acid-base disorder does this represent?",
      choices:[
        "Metabolic acidosis, because the pH is low and HCO₃⁻ is below the expected value",
        "Acute respiratory acidosis, with HCO₃⁻ close to the predicted 25.2 mEq/L",
        "Combined metabolic and respiratory acidosis, because HCO₃⁻ is not elevated",
        "Compensated respiratory alkalosis, because HCO₃⁻ is within the normal range"
      ],
      ans:1,
      exp:"Primary disorder: pH 7.30 (acidosis); PaCO₂ = 52 mmHg (elevated) → respiratory acidosis. Compensation check: Acute respiratory acidosis: HCO₃⁻ rises 1 mEq/L per 10 mmHg rise in PaCO₂. ΔPaCO₂ = 52 − 40 = 12 mmHg → expected ΔHCO₃⁻ = 1.2 mEq/L → expected HCO₃⁻ = 24 + 1.2 = 25.2 mEq/L. Actual = 25 mEq/L ✓ → appropriate acute compensation. If chronic: expected ΔHCO₃⁻ = 3.5 × 1.2 = 4.2 → HCO₃⁻ ≈ 28 mEq/L. The near-normal HCO₃⁻ confirms this is acute respiratory acidosis, not chronic. Combined with the elevated A-a gradient, this suggests acute cardiopulmonary pathology (e.g., acute exacerbation of COPD, pneumonia)."
    },
    {
      q:"At Denver altitude (Patm = 630 mmHg), a healthy person's PAO₂ is ~72 mmHg. Over 6 weeks at altitude, the person's red cell mass and hemoglobin rise (14 → 17 g/dL). Which physiological principle best explains this adaptation?",
      choices:[
        "Air at altitude has a higher nitrogen fraction, which stimulates erythropoietin release",
        "Hypoxemia stabilizes HIF in renal cells, raising erythropoietin and red cell production",
        "Dehydration concentrates the blood, fully accounting for the rise without new red cells",
        "Cold exposure stimulates marrow erythropoiesis through thermoreceptor signaling"
      ],
      ans:1,
      exp:"Altitude acclimatization — erythropoietic response: Reduced PaO₂ → reduced renal oxygen delivery → HIF (mainly HIF-2α) is stabilized in renal peritubular interstitial cells (it is normally hydroxylated by prolyl hydroxylases and degraded when O₂ is adequate) → HIF transactivates the EPO gene → EPO binds receptors on erythroid progenitors in bone marrow → increased RBC production. The fraction of N₂ and O₂ in air is the same at altitude; only total pressure falls. Early plasma-volume loss raises hemoglobin concentration within days, but a sustained rise in red cell mass over weeks requires EPO. This is the same pathway exploited by EPO doping in athletes. Additional acclimatization mechanisms: increased 2,3-BPG (rightward shift of O₂-Hb curve → better O₂ unloading), hyperventilation (increases PAO₂), pulmonary vascular remodeling."
    },
    {
      q:"On FiO₂ = 0.40, the patient's PaO₂ improves to 88 mmHg. Calculate the new PAO₂ (PaCO₂ = 54 mmHg) and A-a gradient:",
      choices:[
        "PAO₂ = 0.40(713) − 54/0.8 = 285.2 − 67.5 = 217.7 mmHg; A-a gradient = 129.7 mmHg",
        "PAO₂ = 0.40(760) − 54 = 250 mmHg; A-a gradient = 250 − 88 = 162 mmHg",
        "PAO₂ = 0.40(760) − 54/0.8 = 236.5 mmHg; A-a gradient = 236.5 − 88 = 148.5 mmHg",
        "PAO₂ = 0.40 × 100 = 40 mmHg, because FiO₂ directly sets PAO₂"
      ],
      ans:0,
      exp:"PAO₂ = FiO₂(Patm − PH₂O) − PaCO₂/RQ = 0.40(713) − 54/0.8 = 285.2 − 67.5 = 217.7 mmHg, and the A-a gradient = 217.7 − 88 = 129.7 mmHg; the 236.5 choice forgets to subtract water vapor pressure before multiplying by FiO₂. The A-a gradient rises with FiO₂ even in healthy lungs, so 129.7 cannot be compared directly with the room-air 22.7; a FiO₂-independent index such as PaO₂/FiO₂ (88/0.40 = 220, abnormal) shows the impaired gas exchange more clearly. The good PaO₂ response to O₂ (62 → 88 mmHg) fits V/Q mismatch rather than true shunt, which responds poorly to supplemental O₂."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 6: Thermochemistry & Calorimetry
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_6',
  type:'passage',
  topic:'C/P',
  title:'Calorimetry and the Thermodynamics of Combustion',
  passage:`Bomb calorimetry measures the heat of combustion (ΔHcomb) of compounds under constant volume conditions. A weighed sample is placed in a sealed steel bomb, ignited electrically in excess O₂, and the heat released raises the temperature of a surrounding water bath. The heat released is calculated: q = mcΔT, where m = mass of water, c = specific heat of water (4.184 J/g·°C), and ΔT = temperature change.

The constant-volume heat of combustion (qv) is related to the constant-pressure enthalpy change (ΔH) by: ΔH = qv + ΔngRT, where Δng = change in moles of gas and R = 8.314 J/mol·K.

Researchers used bomb calorimetry to compare energy content of macronutrients. The calorimeter contained 2,500 g of water. Combustion of 1.000 g of glucose (MW = 180 g/mol) raised water temperature from 24.00°C to 25.39°C. Combustion of 1.000 g of tripalmitin (a saturated fat, MW = 807 g/mol, C₅₁H₉₈O₆) raised temperature from 24.00°C to 27.75°C.

The combustion of glucose: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O.
The combustion of tripalmitin: C₅₁H₉₈O₆ + 72.5O₂ → 51CO₂ + 49H₂O.`,
  questions:[
    {
      q:"Calculate the heat released per gram of glucose combustion (water mass = 2,500 g, c = 4.184 J/g·°C, ΔT = 1.39°C):",
      choices:[
        "q = 2,500 × 4.184 × 1.39 = 14,539 J/g = 14.5 kJ/g",
        "q = 2,500 × 4.184 × 1.39 / 180 = 80.8 J per mole",
        "q = 2,500 × 1.39 = 3,475 J/g",
        "q = 4.184 × 1.39 = 5.82 J/g"
      ],
      ans:0,
      exp:"q = mcΔT = 2,500 g × 4.184 J/g·°C × 1.39°C = 2,500 × 5.816 = 14,539 J = 14.54 kJ per gram of glucose. This is close to the known value of ~15.6 kJ/g for glucose (4 kcal/g using the Atwater factor, but bomb calorimetry gives gross energy before accounting for metabolic losses). The Atwater system assigns: carbohydrates = 4 kcal/g, protein = 4 kcal/g, fat = 9 kcal/g — these are metabolizable energy values, slightly lower than gross combustion values because of urinary losses (especially for protein where urea nitrogen represents incompletely oxidized nitrogen)."
    },
    {
      q:"Calculate the heat released per gram of tripalmitin (ΔT = 3.75°C) and compare to glucose:",
      choices:[
        "q = 2,500 × 4.184 × 3.75 = 39.2 kJ/g, about 2.7 times glucose",
        "q = 2,500 × 4.184 × 3.75 / 807 = 48.6 J/g, far less than glucose",
        "q = 2,500 × 3.75 = 9.4 kJ/g, about 0.65 times glucose",
        "q = 4.184 × 3.75 = 15.7 J/g, about 0.001 times glucose"
      ],
      ans:0,
      exp:"q_fat = mcΔT = 2,500 × 4.184 × 3.75 = 39,225 J per gram = 39.2 kJ/g, and 39.2/14.5 ≈ 2.7 times glucose; dividing by the molar mass is wrong because the sample was already 1.000 g. Fat yields more energy per gram because it is highly reduced (mostly C–H bonds) and carries little oxygen, while carbohydrate is already partly oxidized (C–OH). The Atwater factors (9 vs 4 kcal/g, ratio 2.25) reflect the same difference after digestive and metabolic losses."
    },
    {
      q:"For glucose combustion (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O), calculate Δng (change in moles of gas):",
      choices:[
        "Δng = +6, counting the 6 mol of H₂O as a gaseous product",
        "Δng = 0, since 6 mol CO₂ form, 6 mol O₂ are consumed, and H₂O is liquid",
        "Δng = +12, counting all 12 mol of products as gas",
        "Δng = −6, counting only the 6 mol of O₂ consumed"
      ],
      ans:1,
      exp:"Δng = moles of gaseous products − moles of gaseous reactants. Glucose: solid, not gas. O₂: 6 moles gas (reactant). CO₂: 6 moles gas (product). H₂O: liquid at standard conditions (298 K, 1 atm), not counted as gas. Δng = 6(CO₂) − 6(O₂) = 0. Therefore ΔH = qv + 0 × RT = qv for glucose combustion. This simplifies the correction between bomb calorimetry (constant volume) and standard enthalpy (constant pressure). For tripalmitin: Δng = 51(CO₂) − 72.5(O₂) = −21.5 → ΔH = qv + (−21.5)RT — a measurable correction."
    },
    {
      q:"A clinical dietitian uses Atwater factors (carbohydrate = 4 kcal/g, fat = 9 kcal/g, protein = 4 kcal/g) rather than bomb calorimetry values. Why do metabolizable energy values differ from gross combustion values?",
      choices:[
        "Atwater factors are rough estimates that were never based on experimental data",
        "Absorption is incomplete, and protein nitrogen leaves as urea rather than fully oxidized",
        "The body extracts more energy than combustion because enzymes are more efficient",
        "The constant-volume to constant-pressure correction greatly changes caloric values"
      ],
      ans:1,
      exp:"Atwater metabolizable energy is lower than gross combustion energy; the ΔngRT correction between qv and ΔH is negligible (zero for glucose, about −53 kJ/mol out of ~31,600 kJ/mol for tripalmitin), so it cannot explain the gap. The real reasons are: (1) Incomplete digestion/absorption — dietary fiber (carbohydrate) is not digested → actual absorbed carbohydrate energy is less than gross value; (2) Protein incompletely oxidized — protein contains N, which in the body is excreted as urea (CO(NH₂)₂) and creatinine, not fully oxidized to N₂ as in bomb calorimetry; the N-containing bonds represent 'unburned' energy; (3) Fecal and urinary losses. Atwater values (4-9-4 for C-F-P) are empirically derived averages. For specific foods, the digestible energy can differ substantially (e.g., nuts have lower effective caloric density than Atwater would predict due to incomplete lipid absorption)."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 7: Sound & Doppler Effect (Physics)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_7',
  type:'passage',
  topic:'C/P',
  title:'Doppler Ultrasound in Vascular Diagnosis',
  passage:`Doppler ultrasound measures blood flow velocity using the Doppler effect. When an ultrasound transducer emits sound waves at frequency f₀ toward moving blood cells, the frequency of the reflected wave is shifted: f_reflected = f₀ × (v_sound + v_blood cosθ)/(v_sound − v_blood cosθ), where v_sound = 1,540 m/s in soft tissue, v_blood = blood cell velocity, and θ = angle between ultrasound beam and blood flow direction. For small velocities, the Doppler shift simplifies to: Δf ≈ 2f₀v_blood cosθ/v_sound.

A vascular technologist examines the carotid artery of a patient with suspected stenosis. The transducer frequency is 7.5 MHz. At the stenotic segment, peak systolic velocity (PSV) = 3.4 m/s (normal <1.25 m/s), angle θ = 60°.

Color Doppler imaging assigns colors to flow velocities: flow toward the transducer is typically red; flow away is blue. Aliasing (wraparound artifact) occurs when the Doppler shift exceeds the Nyquist limit (half the pulse repetition frequency), causing high velocities to appear as the opposite color.

The degree of carotid stenosis is estimated from PSV: PSV 125-230 cm/s = 50-69% stenosis; PSV ≥ 230 cm/s = ≥70% stenosis. The patient's PSV of 340 cm/s indicates ≥70% stenosis, warranting carotid endarterectomy or stenting.`,
  questions:[
    {
      q:"Calculate the Doppler frequency shift for blood moving at 3.4 m/s toward the transducer (f₀ = 7.5 MHz, θ = 60°, v_sound = 1,540 m/s):",
      choices:[
        "Δf = 2(7.5×10⁶)(3.4)(0.5)/1,540 ≈ 16.6 kHz",
        "Δf = 2(7.5×10⁶)(3.4)/1,540 ≈ 33.1 kHz",
        "Δf = (7.5×10⁶)(3.4)(0.5)/1,540 ≈ 8.3 kHz",
        "Δf = 2(7.5)(3.4)(0.5) = 25.5 Hz"
      ],
      ans:0,
      exp:"Omitting cos θ gives 33.1 kHz, and omitting the factor of 2 (the shift occurs once on reception by the moving cells and again on reflection) gives 8.3 kHz.Δf = 2f₀v_blood cosθ/v_sound = 2 × (7.5 × 10⁶ Hz) × (3.4 m/s) × cos60° / 1,540 m/s. cos60° = 0.5. Δf = 2 × 7.5×10⁶ × 3.4 × 0.5 / 1,540 = (7.5×10⁶ × 3.4) / 1,540 = 25,500,000/1,540 = 16,558 Hz ≈ 16.6 kHz. This is within audible/electronic detection range. The Doppler shift is proportional to flow velocity — higher PSV at stenosis → larger Δf → detectable velocity increase. The cos θ factor explains why θ = 0° (parallel) gives maximum sensitivity, while θ = 90° (perpendicular) gives Δf = 0 (no detectable Doppler shift)."
    },
    {
      q:"If the Doppler examination were performed with θ = 90° (beam perpendicular to vessel), what Doppler shift would be measured?",
      choices:[
        "The maximum shift, because a perpendicular beam samples the full velocity",
        "Zero shift, because cos 90° = 0 and no velocity component lies along the beam",
        "Half the shift measured at θ = 0°, because the beam samples half the flow",
        "A negative shift, because perpendicular flow registers as flow away"
      ],
      ans:1,
      exp:"Δf = 2f₀v cosθ/v_sound. At θ = 90°: cos90° = 0 → Δf = 0. No Doppler shift is detected even if blood is flowing rapidly, because all blood motion is perpendicular to the ultrasound beam — no component of velocity is directed toward or away from the transducer. This is why Doppler examination standards require angles <60° (ideally 45-60°) between the ultrasound beam and vessel: at large angles, velocity is progressively underestimated. The Doppler equation includes cosθ to project velocity onto the beam axis — only the axial component (toward/away from transducer) creates Doppler shift."
    },
    {
      q:"Aliasing in color Doppler occurs when Doppler shift exceeds the Nyquist limit. At a stenosis, the blood velocity increases dramatically. What does aliasing look like on color Doppler, and how should the technologist respond?",
      choices:[
        "Acoustic shadowing behind the jet; increase the gain to remove it",
        "Color wraparound to the opposite hue; raise the PRF or velocity scale",
        "Increased speckle noise in the jet; switch to B-mode imaging",
        "Loss of color signal in the jet; switch to a higher-frequency transducer"
      ],
      ans:1,
      exp:"Nyquist theorem for pulsed Doppler: maximum measurable frequency = PRF/2 (Nyquist limit). If Doppler shift > Nyquist limit → aliasing: high velocities are undersampled and 'wrap around' to the opposite end of the velocity scale, appearing as the wrong direction/color. On color Doppler: a high-velocity stenotic jet that should appear red (toward transducer) aliases to show blue in the center (exceeds scale, wraps to negative/blue). Fix: (1) Increase PRF (raises Nyquist limit); (2) Increase velocity scale; (3) Use continuous-wave (CW) Doppler (no PRF limitation, but loses depth resolution); (4) Lower transducer frequency (reduces absolute Doppler shift). Aliasing is not an artifact of pathology — it is a sampling artifact."
    },
    {
      q:"Sound travels faster in bone (v ≈ 3,500 m/s) than in soft tissue (v ≈ 1,540 m/s). When an ultrasound beam crosses from soft tissue into bone, which statement correctly describes refraction?",
      choices:[
        "It bends toward the normal, because bone has the higher wave speed",
        "It does not bend, because the frequency is unchanged at the interface",
        "It bends toward the normal, because bone is the denser medium",
        "It bends away from the normal, because sin θ₂ = (v₂/v₁) sin θ₁ > sin θ₁"
      ],
      ans:3,
      exp:"Snell's law applies to any wave at an interface: sin(θ₁)/v₁ = sin(θ₂)/v₂ → sin(θ₂) = sin(θ₁) × v₂/v₁. For soft tissue → bone: v₂/v₁ = 3,500/1,540 = 2.27. sin(θ₂) = 2.27 × sin(θ₁) > sin(θ₁) → θ₂ > θ₁. The beam bends AWAY from the normal when entering a faster medium (bone). This is the opposite of light entering glass (slower medium, bends toward normal). In addition to refraction, significant reflection occurs at soft tissue-bone interfaces due to acoustic impedance mismatch — bone reflects most ultrasound, which is why bones appear as bright reflective surfaces with acoustic shadowing in ultrasound imaging."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 8: Oxidation States & Redox (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_8',
  type:'passage',
  topic:'C/P',
  title:'Redox Chemistry in Hemoglobin and Methemoglobinemia',
  passage:`Hemoglobin transports oxygen by reversible binding of O₂ to ferrous iron (Fe²⁺) in the heme group. The iron must remain in the Fe²⁺ (ferrous) state to bind O₂; Fe³⁺ (ferric) hemoglobin is called methemoglobin (MetHb) and cannot carry O₂. Normally, ~1-3% of hemoglobin exists as MetHb, reduced back to functional Hb by cytochrome b5 reductase (NADH-dependent) and, to a lesser extent, by glutathione and ascorbate.

Methemoglobinemia occurs when MetHb exceeds 1-3% due to exposure to oxidizing agents. Nitrites and nitrates (amyl nitrite, nitroglycerin), dapsone, benzocaine, and nitrate-contaminated well water are common oxidants. Symptoms correlate with MetHb%: 10-20% = cyanosis (skin appears grayish-blue); 20-50% = headache, fatigue, dyspnea; >50% = altered consciousness, seizures; >70% = death.

Methylene blue (MB, oxidized form MW = 373 g/mol) treats methemoglobinemia by accepting electrons from NADPH (generated by G6PD in the pentose phosphate pathway): NADPH + MB(oxidized) → NADP⁺ + MBH₂ (leucomethylene blue, reduced). MBH₂ then reduces MetHb (Fe³⁺) back to Hb (Fe²⁺). In G6PD-deficient patients, NADPH is unavailable and methylene blue is ineffective.

A firefighter exposed to smoke (containing CO and NO₂) is brought to the ED. Pulse oximetry reads SpO₂ 86% and does not improve with supplemental O₂; the patient appears cyanotic with chocolate-brown blood. PaO₂ is 95 mmHg. Co-oximetry reveals MetHb 32%.`,
  questions:[
    {
      q:"Nitrite (NO₂⁻) oxidizes hemoglobin Fe²⁺ to Fe³⁺. Write the oxidation state of iron in each form and identify what happens to nitrogen:",
      choices:[
        "Fe goes +2 → +3 (oxidized); N goes +3 → +2 as NO₂⁻ is reduced to NO",
        "Fe goes +2 → +3 (reduced); N goes +3 → +5 as NO₂⁻ is oxidized to NO₃⁻",
        "Fe stays +2; the oxygen atoms of NO₂⁻ are reduced instead of nitrogen",
        "Fe goes +3 → +2 (reduced); N goes +3 → +5 as NO₂⁻ is oxidized to NO₃⁻"
      ],
      ans:0,
      exp:"Redox reaction: Fe²⁺ → Fe³⁺ = oxidation (loss of 1 electron, increase in oxidation state). The electron must go somewhere (conservation of charge) — NO₂⁻ is reduced: NO₂⁻ (+3 nitrogen) + e⁻ → NO (+2 nitrogen). Nitrogen goes from +3 (in NO₂⁻) to +2 (in NO): reduction of nitrogen. Overall: Fe²⁺ (reducing agent, gets oxidized) donates electron to NO₂⁻ (oxidizing agent, gets reduced). This is the definition of oxidation-reduction: substance that increases in oxidation state = oxidized (reducing agent); substance that decreases = reduced (oxidizing agent). MetHb Fe³⁺ cannot bind O₂ because Fe³⁺ lacks the electron needed to form the O₂ coordination bond."
    },
    {
      q:"Pulse oximetry reads ~86% while co-oximetry reveals MetHb 32% (functional O₂ saturation ~65%). Why does standard pulse oximetry misrepresent oxygenation in methemoglobinemia?",
      choices:[
        "It measures every hemoglobin species accurately, so 86% is the true saturation",
        "Its two wavelengths cannot resolve MetHb, which drives the red/IR ratio toward 1 (~85%)",
        "It relies on light rather than chemical analysis, so it is inherently imprecise",
        "MetHb absorbs exactly like oxyhemoglobin at both wavelengths, so SpO₂ reads high"
      ],
      ans:1,
      exp:"A pulse oximeter uses 2 wavelengths (660 nm, 940 nm), so it can distinguish only 2 species (OxyHb and DeoxyHb). MetHb absorbs strongly and almost equally at both wavelengths, driving the absorbance ratio toward 1, which the calibration curve maps to ~85% SpO₂; at 32% MetHb the functional saturation is ~65%, so the mid-80s reading is falsely reassuring and does not respond to O₂, while PaO₂ stays normal because dissolved O₂ is unaffected. Co-oximetry (multiple wavelengths) measures OxyHb, DeoxyHb, COHb, and MetHb separately and is required whenever MetHb or CO poisoning is suspected; co-oximetry also uses light, so the light-versus-chemistry choice misses the point."
    },
    {
      q:"Methylene blue (MB, blue) is reduced by NADPH (2e⁻ + 2H⁺) to leucomethylene blue (LMB, colorless), which then reduces Fe³⁺ to Fe²⁺. Why does this reduction abolish MB's color?",
      choices:[
        "Reduction adds a heavy atom that shifts MB's absorption into the infrared",
        "Reduction interrupts the extended π conjugation, widening the HOMO–LUMO gap",
        "Reduction converts the central sulfur into a colorless sulfone group",
        "Reduced LMB precipitates out of solution, which removes the color"
      ],
      ans:1,
      exp:"MB's blue color comes from an extended conjugated π system across its cationic phenothiazinium rings (it absorbs ~665 nm); two-electron reduction adds H to the central ring nitrogen, breaking the continuous conjugation, so the HOMO–LUMO gap widens and absorption moves into the UV. A sulfone would require oxidation, not reduction, and no heavy atom is added. LMB then donates its electrons to MetHb (Fe³⁺ → Fe²⁺), regenerating MB, which therefore acts catalytically at low doses (1–2 mg/kg)."
    },
    {
      q:"A G6PD-deficient patient develops methemoglobinemia from dapsone. Why is methylene blue contraindicated, and what alternative treatment exists?",
      choices:[
        "MB competes with G6PD for glucose-6-phosphate; IV glucose is the preferred alternative",
        "Without NADPH, MB stays oxidized and adds oxidant stress; ascorbic acid is an alternative",
        "G6PD deficiency blocks NADH production, leaving MB inert; N-acetylcysteine is the alternative",
        "MB is safe but slow in G6PD deficiency; continuing dapsone at a lower dose is the alternative"
      ],
      ans:1,
      exp:"G6PD deficiency: PPP produces insufficient NADPH. MB treatment depends on NADPH (NADPH + MB → NADP⁺ + LMB). Without adequate NADPH, MB cannot be reduced to LMB. Worse: unreduced MB is an oxidizing agent — it can oxidize hemoglobin and other cell components, worsening MetHb and, because G6PD-deficient RBCs already have little reduced glutathione, precipitating hemolysis. G6PD makes NADPH, not NADH (NADH comes from glycolysis and drives cytochrome b5 reductase). Alternative: (1) Ascorbic acid — reduces MetHb directly via a NADPH-independent pathway, but slower than MB; (2) Hyperbaric oxygen — increases dissolved O₂ to compensate for reduced O₂ carrying capacity; (3) Exchange transfusion in severe cases. This is a classic MCAT-relevant pharmacogenomics example."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 9: Electromagnetic Spectrum & Radiation
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_9',
  type:'passage',
  topic:'C/P',
  title:'Ionizing Radiation in Medicine: Mechanisms and Dosimetry',
  passage:`Ionizing radiation deposits energy in biological tissue, measured in gray (Gy, J/kg absorbed dose). Biological effectiveness varies by radiation type: the equivalent dose in sievert (Sv) = Gy × radiation weighting factor (wR). For X-rays and gamma rays, wR = 1; for neutrons, wR = 5-20; for alpha particles, wR = 20. Effective dose accounts for tissue sensitivity: gonads, bone marrow, and lung have weighting factors (wT) of 0.08, 0.12, and 0.12, respectively.

Ionizing radiation causes DNA damage through direct ionization of DNA atoms and indirect damage via water radiolysis. Radiolysis of water produces reactive oxygen species (ROS): H₂O + radiation → H₂O⁺ + e⁻; H₂O⁺ → H⁺ + ·OH; e⁻ + H₂O → e⁻(aq) (a hydrated electron), which can react further to give H· + OH⁻. The hydroxyl radical (·OH) accounts for approximately 70% of radiation-induced DNA damage.

A CT scan of the chest delivers approximately 7 mGy to the chest, with effective dose ~7 mSv. A chest X-ray delivers ~0.1 mSv. Background radiation in the US averages ~3 mSv/year. Linear no-threshold (LNT) model assumes cancer risk is proportional to dose with no safe threshold; critics argue for a threshold below which radiation is harmless or possibly beneficial (hormesis).

A radiation worker receives annual occupational exposure of 18 mSv. The regulatory limit is 50 mSv/year (equivalent to ~16× background).`,
  questions:[
    {
      q:"A patient receives both X-ray radiation (2 Gy absorbed dose, wR = 1) and alpha particle irradiation (0.05 Gy absorbed dose, wR = 20) to the same tissue. What is the total equivalent dose in Sv?",
      choices:[
        "Total = 2 × 1 + 0.05 × 20 = 2 + 1 = 3 Sv",
        "Total = (2 + 0.05) × 1 = 2.05 Sv",
        "Total = 2 × 20 + 0.05 × 1 = 40.05 Sv",
        "Total = 0.05 × 20 = 1 Sv (alpha dominates due to high LET)"
      ],
      ans:0,
      exp:"Equivalent dose (Sv) = Absorbed dose (Gy) × wR for each radiation type, then sum. X-ray: 2 Gy × 1 = 2 Sv. Alpha: 0.05 Gy × 20 = 1 Sv. Total = 2 + 1 = 3 Sv. The wR accounts for linear energy transfer (LET) — alpha particles deposit energy densely along a short track (high LET), causing clustered DNA damage that is more difficult to repair than the sparsely ionizing X-rays (low LET). 0.05 Gy of alpha = 0.05 × 20 = 1 Sv biological effectiveness equivalent to 1 Gy of X-rays — despite smaller absorbed dose, the alpha particles cause comparable biological damage due to high LET."
    },
    {
      q:"Hydroxyl radicals (·OH) cause most indirect radiation-induced DNA damage. Why are actively dividing cells (especially in G2/M) more radiosensitive than resting cells?",
      choices:[
        "Dividing cells contain more water, so irradiation produces more ·OH",
        "Damage in cycling cells is replicated or segregated before it can be repaired",
        "Resting cells express more antioxidant enzymes that neutralize ·OH",
        "Dividing cells consume more O₂, which boosts radical yield from radiation"
      ],
      ans:1,
      exp:"Cell-cycle radiosensitivity: G2/M is the most sensitive phase, because condensed chromosomes and little time before segregation turn unrepaired double-strand breaks into lethal chromosome breaks and missegregation; late S is the most resistant (homologous recombination with a sister chromatid is available), and G1 is intermediate. Water content is similar across cells, and the oxygen enhancement effect depends on tissue O₂ tension (fixing radical damage), not on how much O₂ a cell consumes. Clinically: radiation therapy targets rapidly dividing tumor cells; normal tissue toxicity comes from radiosensitive proliferating cells (gut epithelium, bone marrow, hair follicles). The G2/M checkpoint normally prevents damaged cells from entering mitosis, but repair time is limited in rapidly cycling cells."
    },
    {
      q:"The LNT model extrapolates cancer risk linearly to zero dose. A patient is anxious about getting a CT scan (7 mSv). Which statement best contextualizes this risk?",
      choices:[
        "It is definitely safe, since medical-dose radiation has never been linked to cancer",
        "It equals ~2.3 years of background; LNT adds ~0.035% risk, usually outweighed by benefit",
        "Its 7 mSv exceeds the annual occupational limit, so the scan should not be performed",
        "Medical radiation differs categorically from other radiation and carries no risk"
      ],
      ans:1,
      exp:"Risk communication: LNT model: 5% excess cancer risk per Sv (BEIR VII report). 7 mSv = 0.007 Sv → excess cancer risk ≈ 0.007 × 5% = 0.035%. For comparison, baseline lifetime cancer risk is ~40%. A 0.035% incremental risk is very small relative to baseline. Background radiation is 3 mSv/year; CT delivers ~2.3 years of background equivalent in one exam. Occupational limit (50 mSv/year) is far above 7 mSv. The key principle: risk-benefit analysis. For a patient with suspected pulmonary embolism, pneumonia, or aortic dissection, the diagnostic benefit far outweighs 0.035% incremental cancer risk. Avoiding necessary CT due to radiation anxiety can cause greater harm than the radiation itself."
    },
    {
      q:"Alpha radiation (wR = 20) is more biologically damaging than X-rays (wR = 1) at the same absorbed dose. However, alpha particles cannot penetrate skin. Why is ingested or inhaled alpha-emitting material (e.g., radon gas, polonium-210) more dangerous than equivalent external alpha radiation?",
      choices:[
        "Inside the body, alpha emitters generate penetrating X-rays by bremsstrahlung",
        "External alphas stop in dead skin; internal ones deposit all their energy in living cells",
        "Once inside the body, alpha emitters switch to beta decay, which penetrates further",
        "Internal alpha damage escapes immune detection, while external damage triggers repair"
      ],
      ans:1,
      exp:"Alpha particles have very short range (~3-7 cm in air, ~40-60 μm in tissue, stopped by a sheet of paper). External alpha: stopped by dead skin keratinocytes → no exposure to living, radiosensitive cells → relatively harmless externally. Internal alpha: deposited directly in radiosensitive tissue (lung epithelium for radon, blood cells for Po-210). The high LET (dense ionization track) + proximity to living cells = very high biological damage. Radon (#2 cause of lung cancer after smoking): decays to alpha-emitting daughters that deposit in bronchial epithelium. Po-210 (used to assassinate Alexander Litvinenko): alpha emitter in blood → irradiates bone marrow and GI tract → radiation syndrome. The distinction external vs. internal is critical in radiation protection."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 C/P PASSAGE 10: Solubility & Equilibria (Gen Chem)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cp_10',
  type:'passage',
  topic:'C/P',
  title:'Kidney Stones: Solubility Equilibria and Prevention',
  passage:`Kidney stones form when urine becomes supersaturated with stone-forming solutes. The most common type, calcium oxalate monohydrate (CaOx), has a solubility product Ksp = 2.7 × 10⁻⁹ mol²/L² at 37°C. Precipitation occurs when the ion product Q = [Ca²⁺][Ox²⁻] > Ksp.

Normal urine contains natural inhibitors (citrate, magnesium, nephrocalcin) that lower free ion concentrations and slow crystal nucleation and growth (Ksp itself is unchanged). Citrate forms soluble complexes with Ca²⁺: Ca²⁺ + Cit³⁻ ⇌ CaCit⁻ (K_f = 10³ L/mol), reducing free [Ca²⁺].

A stone-former has 24-hour urine: Ca²⁺ = 8.2 mM, oxalate = 0.7 mM. A control subject has Ca²⁺ = 3.0 mM, oxalate = 0.3 mM.

Uric acid stones (~5-10% of kidney stones) form in acidic urine. Uric acid (HA, pKa = 5.4) is poorly soluble in its protonated form but its urate anion (A⁻) is more soluble. At urine pH 5.0: fraction as urate = 10^(5.0−5.4)/(1+10^(5.0−5.4)) ≈ 28.5% urate, 71.5% uric acid. At pH 7.0: fraction as urate ≈ 98%.

Treatment: increased fluid intake (dilutes urine), potassium citrate (provides citrate inhibitor, alkalinizes urine), dietary calcium restriction (counterintuitively often worsens oxalate stones by reducing gut Ca²⁺-oxalate binding).`,
  questions:[
    {
      q:"Calculate the ion product Q for the stone-former's urine (Ca²⁺ = 8.2 × 10⁻³ M, oxalate = 7.0 × 10⁻⁴ M) and determine if CaOx precipitation will occur:",
      choices:[
        "Q = (8.2×10⁻³)(7.0×10⁻⁴) = 5.7×10⁻⁶; Q > Ksp, so precipitation is favored",
        "Q = 8.2×10⁻³ + 7.0×10⁻⁴ = 8.9×10⁻³; Q > Ksp, so precipitation is favored",
        "Q = √[(8.2×10⁻³)(7.0×10⁻⁴)] = 2.4×10⁻³; Q > Ksp, so precipitation is favored",
        "Q = (8.2×10⁻³)(7.0×10⁻⁴)² = 4.0×10⁻⁹; Q ≈ Ksp, so the urine is near saturation"
      ],
      ans:0,
      exp:"Q = [Ca²⁺][Ox²⁻] = (8.2 × 10⁻³)(7.0 × 10⁻⁴) = 5.74 × 10⁻⁶; for a 1:1 salt both ions appear to the first power, so squaring oxalate or adding the concentrations is wrong. Q/Ksp = 5.74×10⁻⁶ / 2.7×10⁻⁹ ≈ 2,100: the urine is highly supersaturated and precipitation is thermodynamically favorable. The control gives Q = (3.0×10⁻³)(3.0×10⁻⁴) = 9×10⁻⁷, also above Ksp (~330×) but far less supersaturated; normal urine is usually supersaturated with CaOx, and stones do not form in everyone because nucleation is a kinetic barrier, inhibitors (citrate, Mg²⁺, urinary proteins) complex Ca²⁺ and block crystal growth, and free-ion activities are lower than total concentrations."
    },
    {
      q:"Citrate (Cit³⁻) forms a complex with Ca²⁺ with formation constant K_f = 10³ L/mol. If the free [Cit³⁻] in urine is held at 2.0 mM, what fraction of total calcium is complexed as CaCit⁻?",
      choices:[
        "K_f[Cit³⁻]/(1 + K_f[Cit³⁻]) = 2/3, so about 67% is complexed",
        "[Cit³⁻]/Ksp = 7.4×10⁵, so essentially all calcium is complexed",
        "1/(1 + K_f[Cit³⁻]) = 1/3, so about 33% is complexed",
        "It cannot be found without knowing the total calcium concentration"
      ],
      ans:0,
      exp:"For the equilibrium Ca²⁺ + Cit³⁻ ⇌ CaCit⁻, K_f = [CaCit⁻]/([Ca²⁺][Cit³⁻]). Define α = fraction of Ca as CaCit⁻. [CaCit⁻] = αCa_total; [Ca²⁺] = (1-α)Ca_total. K_f = α / [(1-α)[Cit³⁻]]. K_f[Cit³⁻] = α/(1-α) = 10³ × 2×10⁻³ = 2. α/(1-α) = 2 → α = 2/3 = 0.67. 67% of Ca²⁺ is complexed as CaCit⁻, leaving only 33% as free Ca²⁺. This dramatically reduces the effective [Ca²⁺] available for CaOx precipitation — explaining why potassium citrate reduces stone formation. The 33% value is the free (uncomplexed) fraction, and the answer is independent of total calcium because the ratio [CaCit⁻]/[Ca²⁺] = K_f[Cit³⁻]. Citrate also adsorbs to crystal surfaces to inhibit growth and aggregation, and potassium citrate alkalinizes the urine."
    },
    {
      q:"At urine pH 5.0, approximately 71.5% of uric acid exists in the protonated (HA) form. Why does this promote uric acid stone formation?",
      choices:[
        "Protonated uric acid is more soluble, yet it paradoxically drives crystallization",
        "Neutral uric acid is far less soluble than urate, so it exceeds its solubility limit",
        "Acidic urine activates crystallization enzymes in the renal tubule",
        "At pH 5.0, urate's negative charge repels water, making urate insoluble"
      ],
      ans:1,
      exp:"Solubility and ionization: The anionic form (A⁻, urate) is much more soluble than the neutral protonated form (HA, uric acid). Reasons: (1) Charged species interact strongly with polar water → high solubility; (2) Neutral HA molecules can form hydrogen bonds with each other and pack into crystal lattices → low solubility. At pH 5.0: pKa = 5.4 → pH < pKa → majority is HA (71.5%) → approaches/exceeds solubility limit → stone formation. At pH 7.0: 98% urate (A⁻) → highly soluble → far below solubility limit → no stone formation. Treatment: potassium citrate alkalinizes urine → shifts equilibrium toward urate → dramatically increases solubility → prevents and even dissolves uric acid stones (unlike CaOx stones which cannot be dissolved pharmacologically)."
    },
    {
      q:"Dietary calcium restriction is counterintuitively contraindicated for most calcium oxalate stone formers. What is the mechanism?",
      choices:[
        "Low dietary calcium suppresses PTH, which raises urinary calcium excretion",
        "Gut calcium binds dietary oxalate; restricting it raises oxalate absorption",
        "Calcium restriction causes vitamin D deficiency, raising renal calcium reabsorption",
        "Low-calcium diets are high in protein, raising purine load and uric acid risk"
      ],
      ans:1,
      exp:"The calcium-oxalate paradox: Oxalate is absorbed from the intestinal lumen. When dietary calcium is adequate, Ca²⁺ in the gut lumen binds oxalate (forming insoluble CaC₂O₄ → excreted in stool → NOT absorbed). Low dietary calcium → insufficient intraluminal Ca²⁺ → more free oxalate available for absorption → absorbed oxalate enters blood → excreted by kidneys → high urine [oxalate] → supersaturation. Since Ksp involves both Ca²⁺ and Ox²⁻, and oxalate concentrations in supersaturated urine are often the limiting factor, reducing urine oxalate has a proportionally greater effect on reducing Q than the small increase in Ca²⁺. Meta-analyses confirm normal dietary calcium with low oxalate diet reduces recurrence better than calcium restriction."
    }
  ]
}

]; // end EXAM2_CP_PASSAGES


const EXAM2_CP_DISCRETES = [
  {
    id:'e2cp_d_1', type:'discrete', topic:'C/P',
    q:"A reaction has ΔG° = +12 kJ/mol. Which statement correctly describes this reaction under standard conditions?",
    choices:[
      "It is spontaneous, because a ΔG° of only +12 kJ/mol is small",
      "Keq < 1, but at cellular concentrations ΔG can still be negative",
      "It cannot proceed under any set of conditions",
      "It absorbs exactly 12 kJ of heat per mole of reaction"
    ],
    ans:1,
    exp:"ΔG° > 0 → Keq = e^(−ΔG°/RT) < 1 → at standard conditions (1M all species, 25°C), products are thermodynamically disfavored. However, ΔG (actual free energy) = ΔG° + RT ln(Q). If Q << Keq (reactants abundant, products scarce), ΔG can be negative even when ΔG° > 0 → reaction proceeds. This is fundamental to cellular metabolism: many individually unfavorable reactions are coupled to ATP hydrolysis or driven by substrate supply/product removal. ΔG° is a thermodynamic constant; actual spontaneity depends on concentrations. ΔG° is not directly equal to heat (that's ΔH°, enthalpy change)."
  },
  {
    id:'e2cp_d_2', type:'discrete', topic:'C/P',
    q:"An electron is traveling at 1% of the speed of light (v = 3 × 10⁶ m/s). What is its de Broglie wavelength? (m_e = 9.11 × 10⁻³¹ kg, h = 6.626 × 10⁻³⁴ J·s)",
    choices:[
      "λ = h/mv = 6.626×10⁻³⁴/2.733×10⁻²⁴ ≈ 2.4×10⁻¹⁰ m",
      "λ = mv/h = 2.733×10⁻²⁴/6.626×10⁻³⁴ ≈ 4.1×10⁹ m",
      "λ = h/v = 6.626×10⁻³⁴/3×10⁶ ≈ 2.2×10⁻⁴⁰ m",
      "λ = h/m = 6.626×10⁻³⁴/9.11×10⁻³¹ ≈ 7.3×10⁻⁴ m"
    ],
    ans:0,
    exp:"de Broglie wavelength: λ = h/(mv) = h/p. λ = 6.626×10⁻³⁴ / (9.11×10⁻³¹ × 3×10⁶) = 6.626×10⁻³⁴ / 2.733×10⁻²⁴ = 2.42×10⁻¹⁰ m = 0.242 nm. This is in the X-ray wavelength range — explaining why electron diffraction can reveal molecular structure (electron beam wavelength ~ atomic bond lengths). The wave-particle duality described by de Broglie applies to all matter; larger objects have immeasurably small wavelengths (λ for a baseball ≈ 10⁻³⁴ m), explaining why quantum effects are negligible in macroscopic objects."
  },
  {
    id:'e2cp_d_3', type:'discrete', topic:'C/P',
    q:"NADH is oxidized by complex I of the ETC with ΔG°' = −69.5 kJ/mol. How many moles of ATP (ΔG°'_ATP = +30.5 kJ/mol under standard conditions) could theoretically be synthesized from this energy?",
    choices:[
      "About 1 ATP, since each NADH oxidized always yields exactly one ATP",
      "About 2.28 ATP, from 69.5 ÷ 30.5 under standard conditions",
      "About 10 ATP, since NADH oxidation pumps 10 protons in the full chain",
      "About 69.5 ATP, assuming each ATP costs 1 kJ/mol"
    ],
    ans:1,
    exp:"Theoretical maximum = |ΔG°'_rxn| / ΔG°'_ATP = 69.5/30.5 ≈ 2.28 ATP for the NADH → CoQ step under standard conditions. Under cellular conditions ATP synthesis costs ~50–60 kJ/mol, so the real ceiling for this step is lower (~1.2–1.4). The familiar P/O ratio of ~2.5 refers to the entire chain (NADH → O₂, ΔG°' ≈ −220 kJ/mol): ~10 H⁺ are pumped per NADH and ~4 H⁺ are used per ATP (synthesis plus transport), so 10/4 = 2.5; complex I alone pumps 4 of those 10 protons, enough for about 1 ATP."
  },
  {
    id:'e2cp_d_4', type:'discrete', topic:'C/P',
    q:"A ball is thrown horizontally from a cliff at 20 m/s. It takes 4 seconds to reach the ground. Ignoring air resistance, what is the horizontal distance traveled? (g = 10 m/s²)",
    choices:[
      "80 m, because x = v_x·t and v_x stays constant at 20 m/s",
      "40 m, because the 80 m fall is split evenly with horizontal travel",
      "160 m, because x = ½·g·t² must be doubled for horizontal launch",
      "20 m, because horizontal travel only occurs during the first second"
    ],
    ans:0,
    exp:"Projectile motion: horizontal and vertical components are independent. Horizontal: no acceleration (ignoring air resistance) → v_x = constant = 20 m/s. x = v_x × t = 20 × 4 = 80 m. Vertical: a_y = −g = −10 m/s². Height: h = ½gt² = ½ × 10 × 16 = 80 m (cliff height). Vertical velocity at impact: v_y = gt = 10 × 4 = 40 m/s. Speed at impact: v = √(20² + 40²) = √(400+1600) = √2000 ≈ 44.7 m/s. The independence of x and y components (Galilean independence) is fundamental to projectile motion problems."
  },
  {
    id:'e2cp_d_5', type:'discrete', topic:'C/P',
    q:"Which molecule would be expected to have the highest boiling point, and why?",
    choices:[
      "CH₃CH₃ (ethane, MW 30), because its small size lets it pack efficiently",
      "CH₃OH (methanol, MW 32), because its O–H groups hydrogen-bond to each other",
      "CH₃F (fluoromethane, MW 34), because its strong C–F bond resists boiling",
      "Ne (neon, MW 20), because its filled electron shell makes it very stable"
    ],
    ans:1,
    exp:"Boiling point depends on intermolecular forces. Methanol (CH₃OH): O-H bond → can donate and accept hydrogen bonds → very strong IMFs. Ethane (CH₃CH₃): only London dispersion → very weak IMFs. Fluoromethane (CH₃F): C-F is polar but F has no H → cannot donate H-bonds, only dipole-dipole. Neon: only London dispersion, very small and polarizable. Ranking by BP: CH₃OH (65°C) >> CH₃F (-78°C) > CH₃CH₃ (-89°C) >> Ne (-246°C). Boiling breaks intermolecular forces, not covalent bonds, so C–F bond strength is irrelevant; with similar molar masses (30–34), hydrogen bonding makes the difference — this illustrates that chemical identity (functional groups) determines IMFs more than molecular weight does."
  },
  {
    id:'e2cp_d_6', type:'discrete', topic:'C/P',
    q:"A physician orders a serum electrolyte panel. The 'anion gap' is calculated. Which electrolytes are measured, and what does an elevated anion gap indicate?",
    choices:[
      "AG = Na⁺ − (Cl⁻ + HCO₃⁻); a high AG signals unmeasured anions such as lactate",
      "AG = (Na⁺ + K⁺) − Cl⁻; a high AG signals potassium released from lysed cells",
      "AG = Na⁺ − Cl⁻; a high AG signals a primary metabolic alkalosis",
      "AG = HCO₃⁻ − Cl⁻; a high AG signals an acute respiratory acidosis"
    ],
    ans:0,
    exp:"AG = Na⁺ − (Cl⁻ + HCO₃⁻). Normal = 8-12 mEq/L (represents unmeasured anions: albumin ~12, phosphate ~2, sulfate ~1). Elevated AG metabolic acidosis (MUDPILES mnemonic): Methanol, Uremia, DKA, Propylene glycol, INH/Iron, Lactic acidosis, Ethylene glycol, Salicylates. Mechanism: unmeasured anions (lactate, ketoacids, formate) replace HCO₃⁻ in the blood → HCO₃⁻ falls → AG rises while Cl⁻ stays the same. Non-AG (normal AG, hyperchloremic) metabolic acidosis: HCO₃⁻ is replaced by Cl⁻ → AG unchanged; causes: diarrhea, RTA, saline administration."
  },
  {
    id:'e2cp_d_7', type:'discrete', topic:'C/P',
    q:"In thin-layer chromatography (TLC), compound A has an Rf = 0.75 and compound B has an Rf = 0.30. Which compound is more polar, and which travels farther up the TLC plate?",
    choices:[
      "Compound A is more polar, and compound A travels farther",
      "Compound B is more polar, and compound A travels farther",
      "Compound A is more polar, and compound B travels farther",
      "Compound B is more polar, and compound B travels farther"
    ],
    ans:1,
    exp:"TLC with silica stationary phase (polar) and nonpolar mobile phase: More polar compounds have stronger interaction with polar silica → stay near origin → lower Rf. Less polar compounds have weaker silica interaction → partition into mobile phase → travel further → higher Rf. Compound A (Rf = 0.75) = less polar (travels farther). Compound B (Rf = 0.30) = more polar (stays near origin, higher affinity for polar silica). This is the basis for polarity-based separation in normal phase chromatography. In reverse phase HPLC (nonpolar stationary phase), the relationship reverses: more polar compounds elute first (lower retention time)."
  },
  {
    id:'e2cp_d_8', type:'discrete', topic:'C/P',
    q:"A 70 kg patient requires a loading dose of a drug to achieve a target plasma concentration of 5 mg/L immediately. The drug has a volume of distribution (Vd) of 40 L. What loading dose should be administered?",
    choices:[
      "Loading dose = Cp_target × Vd = 5 mg/L × 40 L = 200 mg",
      "Loading dose = Cp_target / Vd = 5/40 = 0.125 mg",
      "Loading dose = Vd / Cp_target = 40/5 = 8 mg",
      "Loading dose = Cp_target × 70 kg = 350 mg — based on body weight"
    ],
    ans:0,
    exp:"Loading dose = target concentration × volume of distribution. LD = Cp × Vd = 5 mg/L × 40 L = 200 mg. Vd is an apparent volume — it reflects how extensively a drug distributes into tissues. Low Vd (3-5 L, plasma volume): drug stays in blood (e.g., warfarin, heparin). High Vd (>40 L): drug extensively distributes into tissues (e.g., amiodarone Vd ~5,000 L; chloroquine ~500 L). The loading dose formula is one of the most clinically important PK calculations. Maintenance dose = Cl × Cp_target, where Cl = clearance. Weight-based dosing is used for some drugs but not when Vd is given directly."
  },
  {
    id:'e2cp_d_9', type:'discrete', topic:'C/P',
    q:"Resonance structures of benzene indicate that all C-C bonds are equivalent. The actual carbon-carbon bond length in benzene (140 pm) is between single C-C (154 pm) and double C=C (134 pm) bonds. This is best explained by:",
    choices:[
      "Benzene flips rapidly between two Kekulé structures, averaging the bond lengths",
      "Its π electrons are delocalized around the ring, giving each C–C bond order 1.5",
      "Aromaticity equalizes the bond strengths but leaves alternating bond lengths",
      "Repulsion between adjacent π bonds stretches each double bond to a middle length"
    ],
    ans:1,
    exp:"The six carbon p orbitals combine into 6 π molecular orbitals (3 bonding, 3 antibonding), and all 6 π electrons fill the bonding MOs, so bond order per C–C = (6 σ bonds + 3 π bonds)/6 bonds = 1.5, giving a length between single and double bonds. Benzene does not flip between Kekulé structures; it has a single ground-state structure, the resonance hybrid, whose delocalization energy is ~36 kcal/mol (~150 kJ/mol) relative to three isolated C=C bonds (from hydrogenation enthalpies). Hückel's rule: aromatic systems have 4n+2 π electrons in a cyclic, planar, fully conjugated ring."
  },
  {
    id:'e2cp_d_10', type:'discrete', topic:'C/P',
    q:"A patient with Graves' disease (hyperthyroidism) has elevated T3 and T4 levels, which are synthesized from tyrosine residues of thyroglobulin by iodination and coupling. Propylthiouracil (PTU) and methimazole reduce thyroid hormone synthesis by inhibiting which step?",
    choices:[
      "Iodide uptake into follicular cells by the Na⁺/I⁻ symporter",
      "Thyroid peroxidase–catalyzed iodination and coupling of tyrosines",
      "Proteolytic release of T3 and T4 from stored thyroglobulin",
      "Endocytosis of thyroglobulin-containing colloid by follicular cells"
    ],
    ans:1,
    exp:"Thyroid hormone synthesis runs: (1) I⁻ uptake by the Na⁺/I⁻ symporter (NIS), blocked by perchlorate and thiocyanate; (2) organification, in which thyroid peroxidase (TPO) oxidizes I⁻ and iodinates thyroglobulin tyrosines → MIT and DIT; (3) TPO-catalyzed coupling (DIT + DIT → T4, MIT + DIT → T3); (4) endocytosis and proteolysis of thyroglobulin to release T3/T4. PTU and methimazole inhibit TPO, blocking both organification and coupling; PTU also inhibits peripheral 5'-deiodinase (T4 → T3), and in Graves' disease TSH-receptor-stimulating antibodies drive the whole pathway."
  },
  {
    id:'e2cp_d_11', type:'discrete', topic:'C/P',
    q:"Two resistors (R₁ = 4Ω, R₂ = 12Ω) are connected in parallel across a 12V battery. What is the total current drawn from the battery?",
    choices:[
      "I_total = V/R₁ + V/R₂ = 12/4 + 12/12 = 3 + 1 = 4 A",
      "I_total = V/(R₁+R₂) = 12/16 = 0.75 A",
      "I_total = 12/R₁ × 12/R₂ = 3 A",
      "I_total = 12/(1/R₁ + 1/R₂) = 12/(0.25+0.083) = 12/0.333 = 36 A"
    ],
    ans:0,
    exp:"Parallel circuit: voltage is the same across each resistor. Current through R₁: I₁ = V/R₁ = 12/4 = 3 A. Current through R₂: I₂ = V/R₂ = 12/12 = 1 A. Total current: I_total = I₁ + I₂ = 3 + 1 = 4 A. Alternatively: R_parallel = 1/(1/R₁ + 1/R₂) = 1/(0.25+0.083) = 1/0.333 = 3 Ω. I = V/R_total = 12/3 = 4 A ✓. Key: in parallel, equivalent resistance is less than either individual resistance; total current is higher than through either branch alone. In series: R_total = R₁+R₂ = 16 Ω; I = 0.75 A (same through both)."
  },
  {
    id:'e2cp_d_12', type:'discrete', topic:'C/P',
    q:"In mass spectrometry, a molecule produces a molecular ion (M⁺) at m/z = 88, and a base peak at m/z = 59. A fragment at m/z = 29 is also observed. The base peak at m/z = 59 is consistent with loss of which group from M⁺?",
    choices:[
      "An ethyl or formyl fragment (29 mass units)",
      "A methoxy fragment (31 mass units)",
      "A propyl or acetyl fragment (43 mass units)",
      "A methyl fragment (15 mass units)"
    ],
    ans:0,
    exp:"The mass lost is M⁺ − fragment = 88 − 59 = 29, which matches C₂H₅ (ethyl) or CHO (formyl); the complementary m/z 29 peak is the same piece carrying the charge. For example, methyl propanoate (CH₃CH₂COOCH₃, MW 88) undergoes α-cleavage next to the carbonyl, losing the ethyl group to give the acylium ion CH₃O–C≡O⁺ at m/z 59. Loss of methoxy (31) would instead give m/z 57, a common competing fragment for methyl esters."
  },
  {
    id:'e2cp_d_13', type:'discrete', topic:'C/P',
    q:"Phosphatidylcholine (a major membrane phospholipid) has a choline headgroup, glycerol backbone, a saturated fatty acid (palmitate, C16:0) at sn-1, and an unsaturated fatty acid (oleate, C18:1) at sn-2. Which statement about this phospholipid and membrane fluidity is correct?",
    choices:[
      "The saturated palmitate chain raises fluidity by preventing tight packing",
      "The cis double bond in oleate kinks the chain, hindering packing and raising fluidity",
      "Replacing oleate with a second saturated chain would make the lipid more fluid",
      "The glycerol backbone sets fluidity regardless of fatty acid composition"
    ],
    ans:1,
    exp:"Membrane fluidity determinants: (1) Degree of unsaturation: cis double bonds create kinks in fatty acid chains → cannot pack tightly → more fluid. Trans double bonds (less common in biological membranes) pack more like saturated chains. (2) Chain length: shorter chains → more fluid; (3) Cholesterol: at physiological temperature, reduces fluidity of fluid membranes (fills spaces between kinked chains) and increases fluidity of gel-phase membranes. The cis configuration of oleate's double bond at C9 creates a ~30° bend → reduced van der Waals contact area → less cohesion → lower melting temperature (more fluid at body temperature). Fully saturated membranes (e.g., dipalmitoyl-PC, DPPC) are gel-phase at 37°C — much less fluid. Cells regulate membrane composition to maintain appropriate fluidity (homeoviscous adaptation)."
  },
  {
    id:'e2cp_d_14', type:'discrete', topic:'C/P',
    q:"A radioactive isotope has a half-life of 6 hours. A sample initially contains 800 mg. How much remains after 24 hours?",
    choices:[
      "50 mg, after 4 half-lives",
      "100 mg, after 3 half-lives",
      "200 mg, after 2 half-lives",
      "400 mg, after 1 half-life"
    ],
    ans:0,
    exp:"Number of half-lives = 24 hr ÷ 6 hr/half-life = 4 half-lives. Remaining = N₀ × (1/2)^n = 800 × (1/2)⁴ = 800 × 1/16 = 50 mg. This is the basis for: radioisotope dosing in nuclear medicine (¹⁸F t₁/₂ = 110 min, ⁹⁹ᵐTc t₁/₂ = 6 h), radiation safety planning, and pharmacokinetics (drug half-life determines dosing intervals). After 4 half-lives: 50% → 25% → 12.5% → 6.25% of original = 50/800 = 6.25% remaining = 50 mg ✓. Clinical rule of thumb: after 4-5 half-lives, ~94-97% eliminated (or decayed), considered 'complete' for practical purposes."
  },
  {
    id:'e2cp_d_15', type:'discrete', topic:'C/P',
    q:"Which amino acid has a side chain pKa of ~6 and is uniquely suited to act as a general acid-base catalyst in enzyme active sites at physiological pH?",
    choices:[
      "Aspartate",
      "Lysine",
      "Histidine",
      "Tyrosine"
    ],
    ans:2,
    exp:"Histidine's imidazole side chain has a pKa of ~6.0 (5–8 in proteins), so at pH 7.4 it is ~96% neutral yet readily protonated, letting the same residue act as a general base (accepting H⁺) or general acid (donating H⁺); examples include the Asp-His-Ser triad of serine proteases, the His64 proton shuttle of carbonic anhydrase, and His12/His119 of ribonuclease A. Aspartate (pKa ~3.9) is almost fully deprotonated, while lysine (~10.5) and tyrosine (~10.1) are almost fully protonated at pH 7.4, so none can shuttle protons as readily."
  },
  {
    id:'e2cp_d_16', type:'discrete', topic:'C/P',
    q:"A weak acid drug has pKa = 9.0. Using the Henderson-Hasselbalch equation, what is its ionization state at physiological pH (7.4), and how does this affect renal excretion?",
    choices:[
      "Mostly ionized (A⁻), so it is trapped in the tubular lumen and excreted rapidly",
      "About 97.5% un-ionized (HA), so it is reabsorbed and excreted slowly",
      "Exactly 50% ionized, so its excretion is unaffected by urine pH",
      "Ionization is irrelevant, because only molecular weight governs excretion"
    ],
    ans:1,
    exp:"pH < pKa means the weak acid is predominantly in the protonated (un-ionized, HA) form. At pH 7.4, pKa 9.0: [A⁻]/[HA] = 10^(7.4-9.0) = 10^(-1.6) = 0.025. Fraction HA = 1/(1+0.025) = 0.975 = 97.5% un-ionized. Un-ionized HA is lipophilic → crosses membranes → reabsorbed from renal tubule back into blood → slow excretion. To accelerate excretion: alkalinize urine (pH → 8-9) → shifts equilibrium toward A⁻ (ionized) → trapped in tubular lumen → excreted. This is 'ion trapping' — the pharmacokinetic principle used to treat aspirin overdose (sodium bicarbonate alkalinizes urine → ionizes salicylate → excretion)."
  },
  {
    id:'e2cp_d_17', type:'discrete', topic:'C/P',
    q:"Which of the following correctly describes the role of entropy in the hydrophobic effect — the tendency of nonpolar molecules to cluster together in aqueous solution?",
    choices:[
      "Nonpolar molecules attract one another through strong London dispersion forces",
      "Clustering frees ordered water from solvation cages, raising the system's entropy",
      "Water's hydrogen bonds create a pressure that pushes nonpolar molecules together",
      "Van der Waals contacts between nonpolar molecules release heat, so it is enthalpy-driven"
    ],
    ans:1,
    exp:"Hydrophobic effect is entropy-driven. When a nonpolar solute is dissolved in water, surrounding water molecules form highly ordered structures (cage/clathrate), reducing water entropy significantly. ΔH ≈ 0 (water-water H-bonds broken = water-solute LDF formed), but ΔS is very negative (ordered water → ΔG = ΔH - TΔS > 0 → unfavorable). When nonpolar molecules aggregate, water molecules are released from cage structures → increase in water entropy → ΔS_total > 0 → ΔG < 0 → spontaneous aggregation. This is why: (1) Proteins fold to bury hydrophobic residues (releasing water entropy); (2) Lipid bilayers self-assemble; (3) Oil and water don't mix. The thermodynamic sign convention: ΔH is small, TΔS_water is large and positive → aggregation is spontaneous despite weak solute-solute interactions."
  }
]; // end EXAM2_CP_DISCRETES



const EXAM2_CP_EXTRA = [
  {
    id:'e2cp_d_18', type:'discrete', topic:'C/P',
    q:"A student is asked to draw the product of reacting 1-butene with HBr in the presence of peroxides. Which product is formed and why?",
    choices:[
      "2-Bromobutane, because Br adds to the more substituted carbon (Markovnikov)",
      "1-Bromobutane, because Br• adds to C1 to give the more stable C2 radical",
      "No product, because HBr does not add to alkenes without a metal catalyst",
      "2-Bromobutane, because peroxides do not change the regioselectivity of HBr"
    ],
    ans:1,
    exp:"Peroxides initiate a radical chain (ROOR → 2 RO•; RO• + HBr → ROH + Br•); Br• adds to the terminal CH₂ of 1-butene so that the more stable secondary radical forms at C2, which then abstracts H from HBr to give 1-bromobutane (anti-Markovnikov, the Kharasch peroxide effect). Without peroxides the ionic mechanism gives Markovnikov 2-bromobutane via the secondary carbocation. The effect works only with HBr: with HCl the H-abstraction step is too endothermic, and with HI the addition of I• to the alkene is endothermic; note that a symmetric alkene such as 2-butene would give 2-bromobutane by either mechanism."
  },
  {
    id:'e2cp_d_19', type:'discrete', topic:'C/P',
    q:"Boyle's law states that at constant temperature, pressure and volume are inversely related for an ideal gas. A gas occupies 3.0 L at 2.0 atm. What pressure is required to compress it to 1.0 L?",
    choices:[
      "P₂ = P₁V₁/V₂ = (2.0 atm × 3.0 L)/1.0 L = 6.0 atm",
      "P₂ = P₁ × V₂/V₁ = 2.0 × (1.0/3.0) = 0.67 atm",
      "P₂ = P₁ + V₁/V₂ = 2.0 + 3.0 = 5.0 atm",
      "P₂ = 2.0 atm, because pressure is unchanged at constant temperature"
    ],
    ans:0,
    exp:"Boyle's law: P₁V₁ = P₂V₂ (constant T and n). P₂ = P₁V₁/V₂ = (2.0 atm × 3.0 L) / 1.0 L = 6.0/1.0 = 6.0 atm. Volume decreases by factor of 3 → pressure increases by factor of 3. This is inverse proportionality: P ∝ 1/V. Clinical application: lung compliance (the change in volume per change in pressure, C = ΔV/ΔP) — stiffer lungs (lower compliance) require greater pressure change for same volume change. Normal lung compliance = 0.1-0.2 L/cmH₂O. ARDS reduces compliance dramatically, requiring higher PEEP on mechanical ventilation."
  }
];


function buildExam2CP_Section() {
  const questions = [];
  const p = EXAM2_CP_PASSAGES;
  const d = EXAM2_CP_DISCRETES;
  const e = EXAM2_CP_EXTRA;

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
const EXAM2_CP_QUESTIONS = buildExam2CP_Section();
