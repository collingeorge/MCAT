PE3 Chem/Phys: what each question needs
What this is: the spec for the step-1 flashcards built from AAMC Practice Exam 3, Chem/Phys section.
How I checked it:

* I checked each of the 59 questions against the real AAMC question in the AAMC review on 2026-11-15, one by one.
* Everything below is in my own words. No AAMC wording, numbers or answer choices are copied.

Codes on each line:

* Category: the AAMC content category, e.g. 5D.
* Discipline: OCH organic chemistry, GCH general chemistry, BCH biochemistry, PHY physics, BIO biology.
* Skill: S1–S4 are the AAMC scientific-reasoning skills 1–4.
* Difficulty: AAMC's own label: Easy, Moderate, Difficult or Expert.

Card match: whether the existing `pe3-cp:N` card in `qb-aamc-fl.js` teaches what the real question needs.

* ✓ = the card teaches the same idea and asks it the same way.
* Partial = the card's answer is right, but the real question needs a fact or step the card doesn't teach. The flashcards for that question must add the items listed.

Each question gets one flashcard per item in its "Needs" list.
Passage 1 (Q1–4): a multistep synthesis: Michael addition, then intramolecular aldol condensation and dehydration

* Q1 · 5D OCH S2 Easy · Partial
   * Asked: which carbon in the starting compound becomes a marked carbon in the ring product.
   * Needs:
      * in an aldol, an α-carbon (the nucleophile, as its enolate) bonds to the other carbonyl carbon;
      * after dehydration, the C=C sits between the former α-carbon and the former carbonyl carbon, conjugated with C=O;
      * number the chain, then track each carbon by its neighbors, such as the carbon next to a quaternary carbon.
* Q2 · 5B OCH S2 Moderate · ✓
   * Asked: what a thermodynamic product mixture says about relative stability.
   * Needs: under equilibrium (thermodynamic) conditions, the major product is the more stable one. Under kinetic conditions, the major product is the one that forms faster.
* Q3 · 5D OCH S2 Difficult · ✓
   * Asked: the aldol product when no dehydration follows.
   * Needs:
      * aldol addition gives a β-hydroxy carbonyl compound;
      * dehydration would give the α,β-unsaturated carbonyl instead.
* Q4 · 5D OCH S2 Difficult · Partial
   * Asked: the product if one starting material carries an extra substituent.
   * Needs:
      * Michael addition puts the enolate onto the β-carbon of an α,β-unsaturated carbonyl;
      * an intramolecular aldol and dehydration then close a six-membered ring;
      * an added group that doesn't react rides along unchanged, so find where it ends up in the ring.

Passage 2 (Q5–8): a railcar: charging a capacitor, the Doppler effect, power, generator braking

* Q5 · 4C PHY S2 Difficult · ✓
   * Asked: the charge and energy on a charged capacitor.
   * Needs:
      * Q = CV;
      * U = ½CV² = ½QV;
      * when fully charged, no current flows, so internal resistance doesn't matter;
      * mF = 10⁻³ F.
* Q6 · 4D PHY S1 Moderate · ✓
   * Asked: the Doppler effect for a listener moving past a still source.
   * Needs: moving toward the source raises the heard frequency, and moving away lowers it.
* Q7 · 4A PHY S2 Expert · ✓
   * Asked: the power needed at constant speed against a resisting force.
   * Needs:
      * at constant speed, the driving force equals the resistance;
      * P = F·v.
* Q8 · 4A PHY S4 Expert · ✓
   * Asked: the shape of a speed-versus-time graph under generator (eddy-current) braking.
   * Needs:
      * the braking force is proportional to speed, so the slowing is exponential: steep at first, then flattening;
      * a constant force would give a straight line.

Stand-alones Q9–12

* Q9 · 5B OCH S3 Expert · ✓
   * Asked: what data show the relative stability of isomers.
   * Needs:
      * heats of combustion: the isomer that releases less heat is more stable;
      * boiling points, UV spectra and mass-spec patterns don't measure stability.
* Q10 · 5D OCH S3 Expert · ✓
   * Asked: where a tritium label survives in water.
   * Needs:
      * H on N or O exchanges with solvent water;
      * H on carbon, such as an aromatic C–H, doesn't exchange, so it keeps the label.
* Q11 · 4B GCH S2 Moderate · ✓
   * Asked: an expression for the number of gas particles.
   * Needs:
      * n = PV/RT;
      * particles = n × N_A;
      * T must be in kelvin.
* Q12 · 5A GCH S4 Moderate · ✓
   * Asked: whether an amphoteric ion acts as an acid or a base, from a table.
   * Needs:
      * Kb = Kw/Ka of its conjugate acid;
      * compare the ion's Ka with its Kb: whichever is larger wins.

Passage 3 (Q13–16): zinc reacting with iodine

* Q13 · 4E GCH S1 Moderate · ✓
   * Asked: the limiting reagent.
   * Needs:
      * convert each reactant to moles;
      * divide by its coefficient: the smallest value is limiting;
      * reactant left over at the end shows that it was in excess.
* Q14 · 5E GCH S1 Difficult · ✓
   * Asked: the definition of activation energy.
   * Needs:
      * Ea = energy of the transition state (activated complex) − energy of the reactants;
      * ΔH = products − reactants.
* Q15 · 4E GCH S2 Moderate · Partial
   * Asked: the ground-state configuration of neutral zinc.
   * Needs:
      * Zn is [Ar]3d¹⁰4s²: filled 3d and filled 4s;
      * Zn²⁺ loses the 4s electrons first, giving [Ar]3d¹⁰;
      * "half-filled" would mean d⁵ or s¹.
* Q16 · 4E GCH S1 Difficult · ✓
   * Asked: the type of reaction.
   * Needs: the oxidation states change (Zn 0 → +2, I 0 → −1), so it is redox.

Passage 4 (Q17–20): a cold-plasma pen: temperature, pulsed voltage, UV photons, uniform field

* Q17 · 4B GCH S1 Easy · ✓
   * Asked: convert a temperature range to kelvin.
   * Needs:
      * K = °C + 273;
      * °F → °C: subtract 32, then × 5/9.
* Q18 · 4A PHY S4 Difficult · ✓
   * Asked: the period of a pulsed voltage, read from a graph.
   * Needs:
      * one period = one full repeat, the on time plus the off time;
      * f = 1/T.
* Q19 · 4D PHY S2 Expert · ✓
   * Asked: the maximum photon energy from a wavelength range.
   * Needs:
      * E = hc/λ;
      * the shortest λ gives the largest E;
      * nm = 10⁻⁹ m.
* Q20 · 4C PHY S1 Moderate · ✓
   * Asked: what a uniform field looks like.
   * Needs:
      * field lines are parallel and evenly spaced everywhere between the plates;
      * they point from + to −.

Passage 5 (Q21–24): a glucose meter: glucose oxidase, FAD, electrons

* Q21 · 5A GCH S2 Moderate · ✓
   * Asked: the mass of solute in a small volume.
   * Needs:
      * mass = concentration (g/L) × volume (L);
      * μL = 10⁻⁶ L;
      * if the concentration is in M, convert through the molar mass.
* Q22 · 5E BCH S1 Easy · Partial
   * Asked: the class of the glucose-meter enzyme.
   * Needs:
      * glucose oxidase oxidizes glucose, so it is an oxidoreductase;
      * the six enzyme classes, and what each one does (oxidoreductase, transferase, hydrolase, lyase, isomerase, ligase).
* Q23 · 4C GCH S2 Difficult · ✓
   * Asked: the mass of glucose from the electrons measured.
   * Needs:
      * mol glucose = mol e⁻ ÷ 2 (2 e⁻ per glucose);
      * × molar mass;
      * if charge is given, mol e⁻ = Q/F first.
* Q24 · 5E BCH S1 Difficult · ✓
   * Asked: the cofactor the reaction needs.
   * Needs:
      * glucose oxidase uses bound FAD;
      * FAD accepts 2 H and becomes FADH₂.

Stand-alones Q25–28

* Q25 · 5D BCH S1 Moderate · ✓
   * Asked: which molecule binds a steroid receptor.
   * Needs:
      * steroids have four fused rings (three six-membered and one five-membered);
      * pick out that skeleton among the drawn structures.
* Q26 · 5A GCH S3 Expert · ✓
   * Asked: how to lower a phosphate buffer's pH to its pKa.
   * Needs:
      * pH = pKa + log([base]/[acid]);
      * to lower the pH, raise the share of the acid form (H₂PO₄⁻, the monosodium salt);
      * the buffer is best at pH = pKa.
* Q27 · 5D OCH S2 Difficult · Partial
   * Asked: the byproduct mass of forming a peptide bond.
   * Needs:
      * forming a peptide bond releases one H₂O (condensation), 18 amu;
      * the dipeptide's mass = the sum of the amino acids − 18;
      * the new bond links the carbonyl C of one amino acid to the N of the next.
* Q28 · 5E BCH S3 Difficult · Partial
   * Asked: which condition is NOT needed for valid Michaelis–Menten data.
   * Needs:
      * measure initial rates under steady state;
      * keep the pH constant;
      * keep [E] much less than [S];
      * letting the reaction reach equilibrium is not wanted, because rates must be initial.

Passage 6 (Q29–34): a flavin hydroxylase; productive versus wasteful reactions; its amino-acid substrates

* Q29 · 5E BCH S2 Difficult · ✓
   * Asked: the balanced net equation of a two-step cycle.
   * Needs:
      * add the steps;
      * cancel the enzyme-bound FAD/FADH₂, which is regenerated;
      * check atoms and charge.
* Q30 · 5D OCH S2 Expert · ✓
   * Asked: the general structure of a hydroxamic acid.
   * Needs: R–C(=O)–N(OH)–R′, an amide whose N carries an OH.
* Q31 · 5E BCH S2 Difficult · ✓
   * Asked: the relative rate of two reactions from tabulated rate constants.
   * Needs: with equal availability, the ratio of rates = the ratio of rate constants at that pH.
* Q32 · 4E GCH S1 Expert · ✓
   * Asked: which species is reduced overall.
   * Needs:
      * the species that gains electrons is reduced;
      * O₂ → H₂O₂ or H₂O lowers O's oxidation state from 0 to −1 or −2;
      * cofactors that are regenerated are not net changed.

(Q33–34 continue passage 6.)

* Q33 · 5D OCH S1 Moderate · Partial
   * Asked: how to classify Lys and Arg-type amino acids.
   * Needs:
      * Lys, Arg and His are basic and hydrophilic;
      * Asp and Glu are acidic;
      * Leu, Ile, Val and Phe are nonpolar;
      * Arg's side chain is +1 at pH 7.4.
* Q34 · 5A GCH S2 Difficult · ✓
   * Asked: [OH⁻] at a given pH.
   * Needs: pOH = 14 − pH, and [OH⁻] = 10^−pOH.

Passage 7 (Q35–39): horseradish peroxidase: oxidizing phenols, calcium binding, the heme cofactor; a conductive polymer

* Q35 · 5E BCH S2 Difficult · ✓
   * Asked: the product when a peroxidase oxidizes a phenol.
   * Needs: removing H• (H⁺ + e⁻) from Ar–OH gives a phenoxyl radical, Ar–O•.
* Q36 · 5D OCH S1 Moderate · Partial
   * Asked: which amino-acid side chain a peroxidase would act on.
   * Needs:
      * a peroxidase acts on phenols;
      * Tyr has a phenol side chain;
      * Lys is an amine, Leu an alkyl, Gln an amide.
* Q37 · 5D BCH S2 Difficult · ✓
   * Asked: which atom coordinates Ca²⁺.
   * Needs: Ca²⁺ binds the oxygen atoms of carboxylates (Asp, Glu) and of carbonyls.
* Q38 · 5D BCH S1 Moderate · Partial
   * Asked: pick a component of HRP's cofactor.
   * Needs:
      * HRP's cofactor is heme, whose porphyrin ring is built from four pyrrole rings (five-membered, with one N each);
      * imidazole (two N) is His's side chain, which binds the heme iron;
      * tell pyrrole, imidazole and pyridine apart by ring size and N count.
* Q39 · 4C PHY S2 Expert · ✓
   * Asked: resistivity from conductivity.
   * Needs: ρ = 1/σ, with units Ω·cm ↔ (Ω·cm)⁻¹. Pick the right value from the passage.

Passage 8 (Q40–44): epigenetic cytosine changes; i-motif DNA folding, stability, pKa, base pairing

* Q40 · 5E BCH S1 Difficult · ✓
   * Asked: the enzyme classes for adding a methyl group and then oxidizing it.
   * Needs:
      * moving a methyl group onto a molecule is a transferase;
      * oxidizing CH₃ → CH₂OH with O₂ is an oxidoreductase.
* Q41 · 5D BCH S2 Moderate · ✓
   * Asked: the ΔG°′ expression for unfolding.
   * Needs:
      * K = [unfolded]/[native] for native → unfolded;
      * ΔG°′ = −RT ln K;
      * use ln, not e.
* Q42 · 5D BCH S4 Difficult · ✓
   * Asked: relate unfolding cooperativity to pK, from curves.
   * Needs:
      * a steeper, narrower transition means more cooperative;
      * read each curve's steepness and match it to that molecule's pK.
* Q43 · 5D BCH S4 Difficult · ✓
   * Asked: the effect of a modification on a structure that needs protonated cytosines.
   * Needs: a lower pKa means the cytosine is protonated less readily, so the structure is less stable at a given pH. Read which modification lowered the pK.
* Q44 · 5D BIO S1 Moderate · ✓
   * Asked: which nucleoside is absent from the complementary strand.
   * Needs:
      * pair each base (A↔T, G↔C);
      * a base absent from the template means its partner is absent from the complement.

Stand-alones Q45–48

* Q45 · 5C BCH S3 Difficult · ✓
   * Asked: at which pH a cation-exchange column binds a given number of proteins.
   * Needs:
      * a protein is positive when pH < pI and negative when pH > pI;
      * a cation exchanger (negative beads) binds the positive proteins;
      * an anion exchanger binds the negative ones.
* Q46 · 5C BCH S2 Moderate · ✓
   * Asked: the interaction between proteins and a sugar-based column material.
   * Needs: a polysaccharide is full of –OH groups, so the interaction is hydrogen bonding.
* Q47 · 4E GCH S1 Easy · ✓
   * Asked: the halogen with the highest first ionization energy.
   * Needs: ionization energy rises up a group and across a period; F is highest, because it is the smallest atom.
* Q48 · 4A PHY S4 Moderate · ✓
   * Asked: the relationship between d and t from a curve.
   * Needs:
      * from rest with constant acceleration, d = ½at², so d ∝ t² (a parabola);
      * a constant velocity gives a straight line.

Passage 9 (Q49–52): ultrasound and microbubbles in tissue; capillary flow

* Q49 · 4D PHY S1 Expert · ✓
   * Asked: which wave property stays the same in a new medium.
   * Needs: frequency is fixed by the source and doesn't change. Speed, wavelength and amplitude can change.
* Q50 · 4B PHY S2 Difficult · ✓
   * Asked: the volume flow rate through an opening.
   * Needs:
      * Q = A × v;
      * get the area from the passage (πr² if the diameter is given);
      * convert mm/s to μm/s.
* Q51 · 4D PHY S2 Expert · ✓
   * Asked: the wavelength from speed and frequency.
   * Needs: λ = v/f, using the frequency from the passage. MHz = 10⁶ Hz.
* Q52 · 4B PHY S2 Difficult · ✓
   * Asked: the speed in a capillary bed from continuity.
   * Needs:
      * Av = n·a·u, so u = Av/(na);
      * the total area is larger, so the speed is smaller.

Passage 10 (Q53–56): hard water, calcium carbonate, ion-exchange softening

* Q53 · 5A GCH S2 Moderate · ✓
   * Asked: the Ksp expression for CaCO₃.
   * Needs:
      * Ksp = [Ca²⁺][CO₃²⁻];
      * solids are left out;
      * each concentration is raised to the power of its coefficient (1 here).
* Q54 · 4E GCH S1 Easy · Partial
   * Asked: the periodic group of Ca and Mg.
   * Needs:
      * the group names: alkali metals (group 1), alkaline earth metals (group 2), halogens (17), noble gases (18), metalloids;
      * group 2 forms 2+ ions, and its big jump in ionization energy comes after the 2nd electron.
* Q55 · 5E GCH S1 Moderate · ✓
   * Asked: the value of K for a spontaneous reaction.
   * Needs: ΔG° = −RT ln K; ΔG° < 0 means K > 1.
* Q56 · 5E GCH S2 Easy · ✓
   * Asked: what shifts an ion-exchange equilibrium left.
   * Needs:
      * Le Châtelier: adding a product (Na⁺) shifts the equilibrium left;
      * solids such as the resin don't shift it.

Stand-alones Q57–59

* Q57 · 5B GCH S1 Easy · Partial
   * Asked: which molecule is octahedral.
   * Needs:
      * count the electron domains on the central atom;
      * 6 bonds and 0 lone pairs is octahedral (SF₆);
      * 4 bonds + 2 lone pairs is square planar (XeF₄);
      * 3 bonds + 2 lone pairs is T-shaped (BrF₃);
      * 4 bonds is tetrahedral (CBr₄).
* Q58 · 4B PHY S2 Difficult · ✓
   * Asked: how high atmospheric pressure pushes water up an evacuated tube.
   * Needs: P = ρgh, so h = P/(ρg), about 10 m for water at 1 atm.
* Q59 · 4E GCH S1 Moderate · ✓
   * Asked: which period-2 element is a covalent network solid.
   * Needs:
      * carbon (diamond, graphite) bonds covalently to several neighbors in a network;
      * N₂ and O₂ are molecules;
      * P and I are not in period 2.

Summary

* Answers: all 59 PE3 cards have correct answers.
* Matches: 48 teach exactly what the real question needs.
* Partial: 11 (Q1, 4, 15, 22, 27, 28, 33, 36, 38, 54, 57) have correct answers, but the real question needs a fact or step the card doesn't teach. Those facts are listed above, and the step-1 flashcards for these questions must include them.
* Most important gap: Q38. The card teaches imidazole, but the real question needs heme = a porphyrin made of four pyrrole rings.
