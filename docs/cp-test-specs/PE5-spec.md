PE5 Chem/Phys: what each question needs
What this is: the spec for the step-1 flashcards built from AAMC Practice Exam 5 (the free scored sample test), Chem/Phys section.
How I checked it:

* I checked each of the 59 questions against the real AAMC question in the AAMC review on 2026-11-15, one by one.
* Everything below is in my own words. No AAMC wording, numbers or answer choices are copied.

Codes on each line:

* Category: the AAMC content category, e.g. 4E.
* Discipline: OCH organic chemistry, GCH general chemistry, BCH biochemistry, PHY physics.
* Skill: S1–S4 are the AAMC scientific-reasoning skills 1–4.
* Difficulty: AAMC's own label: Easy, Moderate, Difficult or Expert.

Card match: whether the existing `pe5-cp:N` card in `qb-aamc-fl.js` teaches what the real question needs.

* ✓ = the card teaches the same idea and asks it the same way.
* Partial = the card's answer is right, but the real question needs a fact or step the card doesn't teach. The flashcards for that question must add the items listed.

Each question gets one flashcard per item in its "Needs" list.
Passage 1 (Q1–4): an enzyme inhibitor: making a solution, binding equilibria, solubility, kinetic constants

* Q1 · 4E GCH S2 Difficult · ✓
   * Asked: the mass of compound needed for a solution at a stated concentration.
   * Needs:
      * mass = M × V × molar mass;
      * μM = 10⁻⁶ M and mL = 10⁻³ L;
      * g → mg.
* Q2 · 5E GCH S1 Easy · Partial
   * Asked: name the principle behind "add more I and more complex forms".
   * Needs:
      * adding a reactant shifts the equilibrium toward the products, which is Le Châtelier's principle;
      * know what the other named principles say, so they can be ruled out: Pauli exclusion (no two electrons in an atom share all four quantum numbers), Heisenberg uncertainty (position and momentum can't both be known exactly).
* Q3 · 5B GCH S3 Easy · ✓
   * Asked: which change makes a drug more water-soluble.
   * Needs:
      * adding a polar atom that can accept H-bonds, such as a ring CH → N, raises solubility;
      * swapping polar groups for C–H, or adding methyls, lowers it.
* Q4 · 5E GCH S4 Easy · ✓
   * Asked: the values of kcat/KM and Ki at a higher inhibitor concentration.
   * Needs:
      * Ki and kcat/KM are constants of the enzyme and inhibitor, so they don't change with [I];
      * read them from the table.

Passage 2 (Q5–8): a sodium-pumping respiratory enzyme with flavin cofactors

* Q5 · 5D BCH S1 Difficult · ✓
   * Asked: the functional-group change when a ketone is reduced.
   * Needs: a ketone (R–C(=O)–R) gains 2 e⁻ + 2 H⁺ to become a secondary alcohol (R–CH(OH)–R).
* Q6 · 5D BCH S1 Difficult · Partial
   * Asked: pick the ring system shared by most of the enzyme's cofactors.
   * Needs:
      * flavin (the isoalloxazine ring) is the shared part of riboflavin, FMN and FAD;
      * recognize it: three fused rings with four nitrogens;
      * adenine is only in FAD;
      * ubiquinone is a quinone ring with a long tail.
* Q7 · 4E GCH S1 Difficult · ✓
   * Asked: the ratio of cation to enzyme.
   * Needs: convert both to the same units, then divide (mM ÷ mM).
* Q8 · 4C GCH S2 Difficult · ✓
   * Asked: why an exergonic electron transfer releases little heat in the cell.
   * Needs: the free energy is coupled to pumping ions (Na⁺ or H⁺) across a membrane, so it is stored rather than released as heat.

Stand-alones Q9–12

* Q9 · 4B PHY S2 Difficult · ✓
   * Asked: compare the pressure at the same depth in two open containers.
   * Needs:
      * P = P_atm + ρgh;
      * it depends only on depth and density, not on the volume or shape of the container.
* Q10 · 4E PHY S1 Easy · ✓
   * Asked: identify the element from its protons and neutrons.
   * Needs:
      * the number of protons (Z) identifies the element;
      * mass number = protons + neutrons.
* Q11 · 5B GCH S1 Easy · ✓
   * Asked: which molecule is polar.
   * Needs:
      * find the shape from VSEPR;
      * symmetric shapes cancel their bond dipoles (CO₂, CCl₄);
      * a lone pair on the central atom, as in NF₃, makes the molecule polar.
* Q12 · 4B GCH S1 Easy · ✓
   * Asked: which change would NOT double a gas's volume.
   * Needs:
      * V ∝ nT/P;
      * doubling P halves V;
      * T must be in kelvin.

Passage 3 (Q13–16): a krypton laser and fluorescence

* Q13 · 4E PHY S2 Moderate · ✓
   * Asked: the number of neutrons in a stated isotope.
   * Needs: neutrons = mass number − atomic number. Get Z from the periodic table.
* Q14 · 5D BCH S2 Moderate · Partial
   * Asked: the molecular formula of pyrrole.
   * Needs:
      * pyrrole is a five-membered aromatic ring with one N–H: C₄H₅N;
      * imidazole has two N: C₃H₄N₂;
      * pyridine is a six-membered ring with one N: C₅H₅N;
      * count the H by giving every ring atom its full set of bonds.
* Q15 · 4B GCH S1 Expert · ✓
   * Asked: the moles of gas in a small tube at 0 °C and 1 atm.
   * Needs:
      * n = PV/RT, or V ÷ 22.4 L at STP;
      * cm³ = mL = 10⁻³ L.
* Q16 · 4D PHY S3 Difficult · ✓
   * Asked: why a longer wavelength can't produce a given fluorescence.
   * Needs:
      * fluorescence emits less energy than was absorbed;
      * so the absorbed photon must have more energy (a shorter λ) than the emitted one.

Passage 4 (Q17–20): a methyltransferase enzyme and a disease variant

* Q17 · 5D OCH S1 Moderate · ✓
   * Asked: the source of a protein's circular-dichroism (CD) signal.
   * Needs: CD needs chirality, and in amino acids that is the chiral α-carbon. Glycine is the exception.
* Q18 · 5D BCH S2 Moderate · ✓
   * Asked: which property doesn't change with an amino-acid substitution.
   * Needs:
      * compare the two side chains for mass, hydrophobicity, H-bonding and charge;
      * two uncharged side chains keep the same net charge.
* Q19 · 5C BCH S3 Difficult · ✓
   * Asked: the expected gel over a cleavage time course.
   * Needs:
      * SDS-PAGE separates by size, with smaller fragments running farther;
      * over time, the full-length band fades and smaller bands appear.
* Q20 · 5E BCH S2 Difficult · ✓
   * Asked: the net mass change across a group-transfer reaction.
   * Needs:
      * mass is conserved: the group just moves;
      * so (substrate + cofactor) = (product + used cofactor), a net change of 0.

Passage 5 (Q21–25): purifying a membrane progesterone receptor

* Q21 · 5D OCH S1 Moderate · ✓
   * Asked: what a steroid ligand is made from.
   * Needs: steroid hormones such as progesterone are made from cholesterol, which already has the four-ring skeleton.
* Q22 · 5C BCH S1 Difficult · ✓
   * Asked: the type of a His-tag / Ni²⁺ column step.
   * Needs:
      * binding a specific tag is affinity chromatography;
      * imidazole elutes the protein by competing for the Ni²⁺.
* Q23 · 5D OCH S3 Difficult · ✓
   * Asked: what feature makes a detergent work.
   * Needs: a large hydrophobic part plus a hydrophilic head (amphipathic), so it pulls membrane proteins out of the bilayer.
* Q24 · 5A GCH S2 Moderate · ✓
   * Asked: the moles of salt in a buffer.
   * Needs: mol = M × V in litres, with mM → M.
* Q25 · 5D BCH S4 Moderate · ✓
   * Asked: the evidence that a purified protein is still natively folded.
   * Needs:
      * function matching the native protein, such as the same ligand affinity, shows the fold;
      * mass, tags or the number of purification steps don't.

Stand-alones Q26–29

* Q26 · 4E PHY S3 Moderate · ✓
   * Asked: why fusion needs very high temperatures.
   * Needs:
      * nuclei repel (Coulomb), so they need large kinetic energy to get close enough;
      * then the short-range strong force takes over.
* Q27 · 5B OCH S1 Moderate · ✓
   * Asked: which property differs between enantiomers.
   * Needs:
      * enantiomers share bp, density and IR;
      * they differ in optical rotation (sign) and in how they interact with chiral things, such as smell receptors.
* Q28 · 4B PHY S2 Expert · ✓
   * Asked: the speed in a narrower tube.
   * Needs:
      * A₁v₁ = A₂v₂, and A ∝ d²;
      * halving the diameter gives 4× the speed.
* Q29 · 4E GCH S1 Easy · ✓
   * Asked: which species has a noble-gas configuration.
   * Needs: count its electrons. Ca²⁺ has 18, matching Ar.

Passage 6 (Q30–35): tryptophan labeling in carbonic anhydrase

* Q30 · 5D BCH S4 Moderate · ✓
   * Asked: which residue can be modified selectively, read from a table.
   * Needs: "selective" means only that residue reacts under the condition. Read the table row by row.
* Q31 · 5D OCH S2 Difficult · Partial
   * Asked: how to classify a residue after a carboxylic acid is added to it.
   * Needs:
      * an added –COOH (pKa ≈ 4) is ionized at pH 7, so the side chain becomes acidic;
      * an added amine (pKa ≈ 9–10) would be protonated, making it basic;
      * in general, compare the new group's pKa with the pH.
* Q32 · 5D BCH S1 Difficult · Partial
   * Asked: the ring type on two residues.
   * Needs:
      * His has an imidazole ring, Trp an indole and Pro a pyrrolidine;
      * pyrimidines (C, T, U) are bases, not side chains;
      * His's side-chain pKa is about 6.
* Q33 · 5D BCH S1 Easy · ✓
   * Asked: why heating exposes a buried residue.
   * Needs: heat unfolds the protein (denaturation) without breaking any covalent bonds.
* Q34 · 5A GCH S1 Difficult · ✓
   * Asked: name the salt formed from acetic acid and ammonia.
   * Needs:
      * acid + base gives a salt: NH₄⁺ + CH₃COO⁻ is ammonium acetate;
      * know formate, carbonate and bicarbonate apart.
* Q35 · 5C BCH S3 Expert · ✓
   * Asked: how to separate a protein from its more negative modified form.
   * Needs:
      * they differ in charge, so use ion exchange;
      * the more negative form binds an anion exchanger more tightly.

Passage 7 (Q36–40): a natural carbon-oxide oligomer inhibiting an ATPase

* Q36 · 5D OCH S1 Moderate · ✓
   * Asked: name a functional group from a structure.
   * Needs:
      * a C=O with carbon on both sides is a ketone;
      * with H, it's an aldehyde;
      * with OH, a carboxylic acid;
      * with OR, an ester.
* Q37 · 4B GCH S2 Expert · ✓
   * Asked: the final pressure after a gas reaction in a sealed container.
   * Needs:
      * at constant V and T, P ∝ total moles of gas;
      * use the coefficients to find the gas moles after the reaction.
* Q38 · 5C OCH S1 Expert · ✓
   * Asked: which layer a nonpolar compound goes to in an extraction.
   * Needs:
      * like dissolves like: a nonpolar compound goes to the organic (ether) layer;
      * ionized species go to water.
* Q39 · 5D BCH S4 Difficult · ✓
   * Asked: read Ki from an inhibition curve.
   * Needs:
      * find 50% activity on the log-scale curve and read down;
      * mind the axis units.
* Q40 · 5E BCH S1 Difficult · Partial
   * Asked: what a Hill coefficient says about binding.
   * Needs:
      * Hill coefficient > 1 means positive cooperativity: one bound makes the next easier;
      * < 1 means negative cooperativity;
      * = 1 means no cooperativity;
      * a sigmoidal curve means positive cooperativity.

Passage 8 (Q41–44): onion enzymes: flavor versus tearing; the PLP cofactor

* Q41 · 5E BCH S2 Moderate · ✓
   * Asked: which enzyme to inhibit to keep the flavor but stop the irritant.
   * Needs: block the step after the desired product. Blocking earlier steps loses the flavor too.
* Q42 · 5D BCH S2 Expert · ✓
   * Asked: which residues make a salt bridge and π-stacking with a phosphate-bearing ring.
   * Needs:
      * a salt bridge with phosphate (−) needs a + residue (Arg or Lys);
      * π-stacking needs an aromatic residue (Tyr, Phe or Trp);
      * match both.
* Q43 · 4E GCH S2 Moderate · ✓
   * Asked: balance a reaction by adding a reactant and a product.
   * Needs:
      * count the atoms on each side;
      * water supplies O and H;
      * the leftover N and H with a + charge is NH₄⁺;
      * check that the charge balances.
* Q44 · 5E GCH S1 Moderate · ✓
   * Asked: the energy features of a fast, spontaneous reaction.
   * Needs:
      * fast means low Ea;
      * spontaneous means ΔG < 0;
      * read both from the profile, or infer them from the passage.

Stand-alones Q45–48

* Q45 · 5A GCH S2 Expert · ✓
   * Asked: which group of a fully protonated amino acid loses its proton first.
   * Needs:
      * the lowest-pKa group deprotonates first, which is usually the α-COOH (about 2);
      * then side-chain acids, then the α-NH₃⁺, then a basic side chain.
* Q46 · 5E GCH S4 Moderate · ✓
   * Asked: the activation energy from labeled energy levels.
   * Needs:
      * Ea = transition-state energy − reactant energy;
      * ΔH = products − reactants.
* Q47 · 4A PHY S2 Difficult · ✓
   * Asked: the acceleration of two masses over a pulley (an Atwood machine).
   * Needs:
      * a = (m₂ − m₁)g/(m₁ + m₂);
      * net force ÷ total mass.
* Q48 · 5E GCH S2 Moderate · ✓
   * Asked: which step of turning ice into steam takes the most heat.
   * Needs:
      * compare mL_fusion, mcΔT and mL_vaporization;
      * vaporization is by far the largest.

Passage 9 (Q49–52): a defibrillator: paddle pressure, discharge current, capacitor charge

* Q49 · 4A PHY S2 Difficult · ✓
   * Asked: the pressure from a force on a paddle.
   * Needs:
      * P = F/A;
      * convert cm² → m² (1 cm² = 10⁻⁴ m²);
      * take F from the passage.
* Q50 · 4C PHY S2 Expert · ✓
   * Asked: the average current when a capacitor discharges.
   * Needs:
      * Q = CV;
      * I = Q/t, with μF = 10⁻⁶ and ms = 10⁻³.
* Q51 · 4C PHY S2 Moderate · ✓
   * Asked: how to raise the charge on a capacitor.
   * Needs:
      * Q = CV and C = κε₀A/d;
      * more area, less separation, a dielectric or a higher V all raise Q.
* Q52 · 4C PHY S2 Expert · ✓
   * Asked: the voltage that gives the same charge on a different capacitor.
   * Needs: C₁V₁ = C₂V₂, so V₂ = C₁V₁/C₂.

Passage 10 (Q53–56): light, photons and hydrogen spectral lines

* Q53 · 4A PHY S1 Easy · ✓
   * Asked: the frequency if the wavelength doubles.
   * Needs: c = fλ is fixed, so doubling λ halves f.
* Q54 · 4D PHY S1 Moderate · ✓
   * Asked: what doubles when a photon's energy doubles.
   * Needs:
      * E = hf, so the frequency doubles;
      * the wavelength halves;
      * amplitude and intensity are not single-photon properties.
* Q55 · 4D PHY S2 Expert · ✓
   * Asked: the frequency from a wavelength.
   * Needs:
      * f = c/λ with λ in metres;
      * visible light is about 10¹⁴–10¹⁵ Hz.
* Q56 · 4D PHY S1 Difficult · ✓
   * Asked: the wavelength of a photon from its energy in eV.
   * Needs: λ(nm) ≈ 1240/E(eV).

Stand-alones Q57–59

* Q57 · 5A GCH S2 Moderate · ✓
   * Asked: Kb of a conjugate base from the acid's pKa.
   * Needs:
      * pKa + pKb = 14;
      * Kb = 10^−pKb;
      * Ka·Kb = Kw.
* Q58 · 5D OCH S2 Moderate · ✓
   * Asked: which change would NOT raise the ester yield.
   * Needs:
      * a catalyst (enzyme) speeds up reaching equilibrium but doesn't change the yield;
      * adding a reactant or removing a product raises the yield (Le Châtelier).
* Q59 · 4A PHY S4 Difficult · ✓
   * Asked: the work done by a force that changes, read from a graph.
   * Needs:
      * work = the area under the force-versus-position graph;
      * split it into rectangles and triangles.

Summary

* Answers: all 59 PE5 cards have correct answers.
* Matches: 53 teach exactly what the real question needs.
* Partial: 6 (Q2, 6, 14, 31, 32, 40) have correct answers, but the real question needs a fact or step the card doesn't teach. Those facts are listed above, and the step-1 flashcards for these questions must include them.
* Pattern: half of the gaps are ring identification:
   * flavin (Q6);
   * pyrrole (Q14);
   * imidazole on His (Q32).
PE3 Q38 needs pyrrole and heme too, so one set of "know your heterocycles" cards should cover all of them.
