PE6 Chem/Phys: what each question needs
What this is: the spec for the step-1 flashcards built from AAMC Practice Exam 6, Chem/Phys section.
How I checked it:

* I checked each of the 59 questions against the real AAMC question in the AAMC review on 2026-11-15, one by one.
* Everything below is in my own words. No AAMC wording, numbers or answer choices are copied.

Codes on each line:

* Category: the AAMC content category, e.g. 4D.
* Discipline: OCH organic chemistry, GCH general chemistry, BCH biochemistry, PHY physics, BIO biology.
* Skill: S1–S4 are the AAMC scientific-reasoning skills 1–4.
* Difficulty: AAMC's own label: Easy, Moderate, Difficult or Expert.

Card match: whether the existing `pe6-cp:N` card in `qb-aamc-fl.js` teaches what the real question needs.

* ✓ = the card teaches the same idea and asks it the same way.
* Partial = the card's answer is right, but the real question needs a fact or step the card doesn't teach. The flashcards for that question must add the items listed.

Each question gets one flashcard per item in its "Needs" list.
Passage 1 (Q1–4): a reaction making an alcohol; IR, NMR, rearrangement, chirality

* Q1 · 4D OCH S2 Difficult · Partial
   * Asked: which IR region shows that an alcohol has formed.
   * Needs:
      * IR regions:
         * O–H is a broad band at about 3200–3600 cm⁻¹, inside 3000–4000;
         * N–H is 3300–3500;
         * C–H is about 2850–3100;
         * C=O is a sharp band at about 1700;
         * C=C is about 1650;
      * a product that gains an –OH shows a new broad band above 3000.
* Q2 · 4D OCH S3 Moderate · ✓
   * Asked: the technique for measuring the ratio of two isomers.
   * Needs:
      * ¹H NMR integration is proportional to the number of protons, so it gives the ratio;
      * IR only identifies functional groups, and isomers share them.
* Q3 · 5D OCH S2 Difficult · Partial
   * Asked: the intermediate formed when an epoxide rearranges under Lewis acid.
   * Needs:
      * a Lewis acid coordinates the epoxide O, and the ring opens to the more stable carbocation;
      * a hydride or alkyl shift then gives a carbonyl compound (an aldehyde or ketone);
      * pick the intermediate that leads to the product described.
* Q4 · 5B OCH S1 Moderate · ✓
   * Asked: whether each compound is chiral.
   * Needs:
      * a chirality center is a carbon with four different groups;
      * a molecule with one chirality center and no mirror plane is chiral.

Passage 2 (Q5–8): stretching and pulling single DNA molecules; a borate buffer

* Q5 · 4A PHY S1 Moderate · ✓
   * Asked: how one figure's data come from another's.
   * Needs:
      * the slope of a position–time graph is velocity, and the slope of a velocity–time graph is acceleration;
      * the area under velocity–time is displacement.
* Q6 · 4C PHY S1 Easy · Partial
   * Asked: why DNA responds to an electric field.
   * Needs:
      * DNA's phosphate backbone is negatively charged, so it carries a net charge;
      * it moves toward the + electrode (anode);
      * in a gel, shorter fragments move farther.
* Q7 · 5A GCH S1 Easy · ✓
   * Asked: how acidic or basic a buffer of about pH 8 is.
   * Needs:
      * pH just above 7 is weakly basic;
      * each pH unit is a factor of 10 in [H⁺].
* Q8 · 5A GCH S2 Difficult · ✓
   * Asked: the base:acid ratio from pH and pKa.
   * Needs:
      * pH = pKa + log(base/acid);
      * so the ratio = 10^(pH − pKa), and a pH 1 below pKa gives 0.1.

Stand-alones Q9–12

* Q9 · 5E GCH S1 Difficult · ✓
   * Asked: what must be true for a reaction to be spontaneous.
   * Needs:
      * only ΔG < 0 is required;
      * ΔH and ΔS can each have either sign, as long as ΔG = ΔH − TΔS is negative.
* Q10 · 5D BCH S1 Easy · ✓
   * Asked: which residue can't be phosphorylated.
   * Needs:
      * kinases phosphorylate an –OH on Ser, Thr or Tyr;
      * Phe has no OH.
* Q11 · 4A PHY S4 Expert · ✓
   * Asked: the relationship between two quantities, from a table.
   * Needs:
      * test whether y/x is constant (y ∝ x) or y/x² is constant (y ∝ x²);
      * doubling x doubles y means linear.
* Q12 · 5B OCH S1 Expert · ✓
   * Asked: which compound has a methyl group axial in its favored chair.
   * Needs:
      * big groups go equatorial;
      * in cis-1,3 and trans-1,2 or 1,4 patterns, both groups can be equatorial;
      * otherwise one must be axial, and it is the smaller group.

Passage 3 (Q13–16): glycogen phosphorylase: the PLP Schiff base, activators and caffeine

* Q13 · 5B GCH S1 Easy · ✓
   * Asked: the hybridization of the carbon in a Schiff-base link.
   * Needs:
      * a Schiff base is an imine (C=N);
      * the double-bonded carbon is sp², with about 120° angles.
* Q14 · 5E BCH S4 Easy · ✓
   * Asked: which rate-versus-[S] graph matches a table where Vmax changes and KM doesn't.
   * Needs:
      * Vmax sets the height of the plateau;
      * KM is the [S] at half the plateau;
      * same KM means the half-plateau sits at the same [S].
* Q15 · 5E BCH S4 Expert · ✓
   * Asked: the inhibitor type from tabulated KM and Vmax.
   * Needs:
      * competitive: KM up, Vmax the same;
      * noncompetitive: Vmax down, KM the same;
      * uncompetitive: both down by the same factor;
      * mixed: Vmax down and KM changed.
* Q16 · 5E BCH S3 Moderate · ✓
   * Asked: the conditions that give the most product fastest.
   * Needs: a high allosteric activator (AMP) plus a high substrate (Pi) give the highest rate.

Passage 4 (Q17–20): a photon detector; heat to melt a metal; a PET sugar tracer and ¹⁸F

* Q17 · 4C PHY S1 Expert · ✓
   * Asked: the type of conduction in the detector's wires.
   * Needs:
      * in metals, free electrons carry the current (metallic conduction);
      * in solutions, ions carry it (electrolytic).
* Q18 · 5E PHY S2 Moderate · ✓
   * Asked: the heat to melt a solid already at its melting point.
   * Needs:
      * q = m × L_fusion, with no ΔT term;
      * g → kg.
* Q19 · 4E GCH S1 Moderate · ✓
   * Asked: the molar mass of a sugar with one –OH swapped for ¹⁸F.
   * Needs:
      * start from the sugar's molar mass;
      * subtract OH (17) and add ¹⁸F (18), a net of +1.
* Q20 · 4E PHY S1 Moderate · ✓
   * Asked: how ¹⁸F differs from stable ¹⁹F.
   * Needs:
      * same Z (9 protons), one fewer neutron;
      * positron emission turns a proton into a neutron.

Passage 5 (Q21–24): pyruvate carboxylase and biotin

* Q21 · 5D OCH S1 Difficult · ✓
   * Asked: identify the residues in a binding pocket from their side chains.
   * Needs:
      * side-chain structures: Arg is a guanidinium, Lys an –NH₃⁺ at the end of a chain;
      * Asn is –CH₂–C(=O)NH₂ and Gln has one more CH₂;
      * Asp and Glu are the carboxylates.
* Q22 · 5E BCH S2 Difficult · ✓
   * Asked: the roles of a cofactor in two steps.
   * Needs:
      * attacking an electrophile with a lone pair makes it a nucleophile;
      * removing a proton makes it a general base;
      * giving a proton makes it a general acid.
* Q23 · 5B GCH S1 Difficult · ✓
   * Asked: how pyruvate is held in its pocket.
   * Needs: C=O and carboxylate oxygens have lone pairs but no O–H, so they are H-bond acceptors.
* Q24 · 5E BCH S2 Moderate · ✓
   * Asked: the role of a residue that gains and then gives up a proton.
   * Needs: a residue that accepts a proton from one group and passes it to another is a proton shuttle.

Stand-alones Q25–28

* Q25 · 5D OCH S2 Easy · ✓
   * Asked: the tripeptide sequence from its hydrolysis fragments.
   * Needs:
      * the dipeptides show which neighbors touch;
      * assemble a sequence that contains both;
      * check it against the amino-acid counts.
* Q26 · 4B GCH S2 Expert · ✓
   * Asked: the O₂ volume at STP to burn a hydrocarbon.
   * Needs:
      * balance the combustion (CₓHᵧ + O₂ → CO₂ + H₂O);
      * mol O₂ × 22.4 L.
* Q27 · 4D OCH S2 Expert · Partial
   * Asked: which alcohol shows a doublet in ¹H NMR.
   * Needs:
      * the n + 1 rule: a signal is split by n H's on neighboring carbons;
      * a doublet means 1 neighbor H. In 2-propanol, the two CH₃ groups sit next to one CH, so they appear as a doublet;
      * a tert-butyl group is a singlet;
      * the OH usually isn't split.
* Q28 · 4B PHY S3 Moderate · ✓
   * Asked: the range of densities a floating rod can measure.
   * Needs:
      * fraction submerged = ρ_object/ρ_fluid;
      * fully submerged gives the lowest density, and the smallest marked fraction gives the highest.

Passage 6 (Q29–32): a protein damaged by oxygen radicals; a gamma emitter

* Q29 · 5D BCH S1 Difficult · ✓
   * Asked: the protein's net charge at the experiment's pH.
   * Needs: at pH = pI the net charge is 0. Below pI it's +, above pI it's −.
* Q30 · 5D BCH S2 Difficult · ✓
   * Asked: which cross-link joins the protein's aggregates covalently.
   * Needs:
      * radicals oxidize Tyr's phenol ring, and two Tyr can join (dityrosine);
      * a disulfide needs Cys thiols.
* Q31 · 5D BCH S3 Moderate · ✓
   * Asked: under which treatment hydrophobic side chains are most exposed.
   * Needs: the most unfolded (denatured) condition in the data exposes the core most.
* Q32 · 4E PHY S1 Moderate · ✓
   * Asked: what an excited nucleus emits as it relaxes.
   * Needs: a gamma photon, with no change in A or Z.

Passage 7 (Q33–37): fluorescent labeling of a protein

* Q33 · 5C BCH S4 Expert · ✓
   * Asked: how much protein went unlabeled, from a gel.
   * Needs:
      * compare the lanes;
      * no band at the unlabeled protein's position means about 0% is unlabeled;
      * a free dye band is not protein.
* Q34 · 5D OCH S1 Moderate · Partial
   * Asked: which two residues can do the labeling reaction.
   * Needs:
      * nucleophilic side chains: Lys (–NH₂) and Cys (–SH);
      * amine- or thiol-reactive dyes target these;
      * Asp, Glu, Ser, Thr, Asn and Gln are poor nucleophiles at pH 7.
* Q35 · 5A GCH S2 Moderate · ✓
   * Asked: the mass of NaCl in saline.
   * Needs:
      * normal saline is 0.15 M (0.9%);
      * mass = M × V × 58.5.
* Q36 · 4E GCH S2 Expert · ✓
   * Asked: the moles of a protein.
   * Needs:
      * mass = concentration × volume;
      * mol = mass ÷ molar mass, where kDa → g/mol × 1000.
* Q37 · 5D BCH S4 Expert · ✓
   * Asked: where a label sits if activity is unchanged.
   * Needs: on the surface, away from the active site. A label in the active site or the core would disrupt function.

Passage 8 (Q38–43): a virus-templated battery

* Q38 · 5A GCH S2 Expert · ✓
   * Asked: the moles of a salt in a solution.
   * Needs: mol = M × V, keeping the units straight (mM × mL = μmol).
* Q39 · 4E GCH S2 Expert · ✓
   * Asked: the mass of metal in an oxide.
   * Needs:
      * mass fraction of the metal = (number of metal atoms × atomic mass) ÷ formula mass;
      * × the mass of the oxide.
* Q40 · 4C PHY S2 Expert · ✓
   * Asked: the charge from a capacity rating.
   * Needs:
      * charge = capacity per gram × mass;
      * 1 mAh = 3.6 C.
* Q41 · 4C GCH S2 Expert · ✓
   * Asked: the anode's reduction potential from E°cell.
   * Needs: E°cell = E°cathode − E°anode, so E°anode = E°cathode − E°cell.
* Q42 · 5D OCH S1 Expert · ✓
   * Asked: which group binds a metal ion.
   * Needs:
      * carboxylates (–COO⁻) bind metal ions;
      * lowering the pH protonates them, which releases the metal.
* Q43 · 4C GCH S3 Difficult · ✓
   * Asked: the role of a lithium salt solution between the electrodes.
   * Needs:
      * it is the electrolyte: it carries ions between the electrodes;
      * electrons travel through the external wire.

Stand-alones Q44–47

* Q44 · 5D BCH S1 Difficult · Partial
   * Asked: which lipids are NOT membrane lipids.
   * Needs:
      * membrane lipids are glycerophospholipids, sphingolipids and sterols (cholesterol);
      * triacylglycerols are storage fat, not membrane lipids;
      * phospholipids form bilayers.
* Q45 · 5D BCH S1 Expert · Partial
   * Asked: count the carbons in a deoxynucleotide.
   * Needs:
      * sugar (deoxyribose) has 5 C;
      * adenine has 5 C (and 5 N);
      * phosphate has no C;
      * so dAMP has 10 C.
* Q46 · 4B BIO S2 Easy · ✓
   * Asked: why the left ventricle is more muscular.
   * Needs: it pumps into the systemic circulation, which needs much higher pressure. The right ventricle pumps only to the lungs.
* Q47 · 4E PHY S2 Expert · ✓
   * Asked: the total electron spin of ground-state He.
   * Needs:
      * two electrons in 1s must have opposite spins (Pauli), so the total is 0;
      * that makes He diamagnetic.

Passage 9 (Q48–52): a cellulose-binding protein studied by NMR

* Q48 · 5D BCH S2 Difficult · ✓
   * Asked: which variant keeps binding similar to the original.
   * Needs: a conservative substitution keeps the needed features: aromatic ring stacking plus H-bonding (Trp ↔ Tyr).
* Q49 · 5D BCH S2 Expert · ✓
   * Asked: the role of surface Ser and Thr.
   * Needs: polar –OH groups hydrogen-bond with water, which stabilizes the solvation layer and keeps the protein soluble.
* Q50 · 5A GCH S1 Easy · ✓
   * Asked: name NH₄Cl.
   * Needs:
      * ammonium chloride;
      * the ammonium ion is a weak acid, so its solution is slightly acidic.
* Q51 · 4D PHY S2 Difficult · ✓
   * Asked: the photon energy at an NMR frequency.
   * Needs:
      * E = hf, with MHz = 10⁶ Hz;
      * radio photons are about 10⁻²⁵ J.
* Q52 · 4C PHY S1 Difficult · ✓
   * Asked: compute γ from a given formula.
   * Needs: plug the frequency and field from the passage into γ = 2πf/B, keeping 2π symbolic.

Passage 10 (Q53–56): ammonium nitrate decomposition

* Q53 · 4B GCH S1 Difficult · ✓
   * Asked: why less gas volume forms at a lower temperature.
   * Needs: at constant P, V ∝ T (Charles), so the same moles take up less volume.
* Q54 · 5E GCH S4 Difficult · ✓
   * Asked: name a transition on a phase diagram.
   * Needs:
      * crossing the solid–gas line is sublimation;
      * read which regions the path joins.
* Q55 · 5E GCH S2 Difficult · ✓
   * Asked: the energy profile of a stable but explosive solid.
   * Needs:
      * it releases energy, so it is exothermic;
      * it doesn't react until triggered, so it has a high activation energy;
      * read the energy diagram the same way: products versus reactants, and the height of the peak.
* Q56 · 4E GCH S1 Expert · ✓
   * Asked: the fraction of the gaseous products that is water.
   * Needs:
      * mole fraction = moles of H₂O ÷ total gas moles, from the coefficients;
      * count gases only.

Stand-alones Q57–59

* Q57 · 4E PHY S2 Moderate · ✓
   * Asked: the activity after several half-lives.
   * Needs:
      * n = time ÷ half-life;
      * A = A₀ × (1/2)ⁿ.
* Q58 · 4E PHY S2 Difficult · ✓
   * Asked: the daughter of alpha decay.
   * Needs: α decay lowers A by 4 and Z by 2. Find the new element from Z.
* Q59 · 5B GCH S2 Expert · ✓
   * Asked: the bonds between C and O in CO.
   * Needs:
      * CO has a triple bond, so both atoms have octets;
      * formal charges: C −1, O +1.

Summary

* Answers: all 59 PE6 cards have correct answers.
* Matches: 52 teach exactly what the real question needs.
* Partial: 7 (Q1, 3, 6, 27, 34, 44, 45) have correct answers, but the real question needs a fact or step the card doesn't teach. Those facts are listed above, and the step-1 flashcards for these questions must include them.
