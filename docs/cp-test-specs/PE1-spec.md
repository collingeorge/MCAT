PE1 Chem/Phys: what each question needs
What this is: the spec for the step-1 flashcards built from AAMC Practice Exam 1, Chem/Phys section.
How I checked it:

* I checked each of the 59 questions against the real AAMC question in the AAMC review on 2026-11-15, one by one.
* Everything below is in my own words. No AAMC wording, numbers or answer choices are copied.

Codes on each line:

* Category: the AAMC content category, e.g. 5C.
* Discipline: OCH organic chemistry, GCH general chemistry, BCH biochemistry, PHY physics, BIO biology.
* Skill: S1–S4 are the AAMC scientific-reasoning skills 1–4.
* Difficulty: AAMC's own label: Easy, Moderate, Difficult or Expert.

Card match: whether the existing `pe1-cp:N` card in `qb-aamc-fl.js` teaches what the real question needs.

* ✓ = the card teaches the same idea and asks it the same way.
* Partial = the card's answer is right, but the real question needs a fact or step the card doesn't teach. The flashcards for that question must add the items listed.

Each question gets one flashcard per item in its "Needs" list.
Passage 1 (Q1–5): making an amino acid under early-Earth conditions; paper chromatography

* Q1 · 5C OCH S2 Easy · ✓
   * Asked: what controls how far a compound moves in paper chromatography when water bound to cellulose is the stationary phase.
   * Needs: a polar stationary phase holds compounds that hydrogen-bond more strongly; those move less. Spot size depends on concentration, not on how far a compound moves.
* Q2 · 5C OCH S3 Moderate · ✓
   * Asked: the hidden assumption behind "this lab route explains how the molecule formed on early Earth".
   * Needs: the claim requires the starting materials to have existed under those conditions. Distinguish a needed assumption from statements that are true but irrelevant.
* Q3 · 5C OCH S4 Easy · ✓
   * Asked: read an Rf from a drawn plate.
   * Needs: Rf = spot distance ÷ solvent-front distance, both measured from the baseline. Rf is always between 0 and 1, so any answer above 1 is impossible.
* Q4 · 5C OCH S4 Difficult · Partial
   * Asked: which statement about acid-catalyzed alcohol dehydration is false.
   * Needs:
      * the reaction is E1 and goes through a carbocation;
      * tertiary alcohols dehydrate most easily;
      * one water molecule is lost;
      * because the carbocation is planar, both cis and trans alkenes form, so the reaction is not stereospecific.
* Q5 · 5C OCH S1 Moderate · ✓
   * Asked: the functional group formed by a peptide bond.
   * Needs: a peptide bond is an amide, C(=O)–N.

Passage 2 (Q6–9): alcohols reacting with HX by SN1 and SN2; gas chromatography. Q10 (Fischer esterification) is the first stand-alone.

* Q6 · 5D OCH S2 Moderate · ✓
   * Asked: why a secondary alcohol substitutes more slowly than a primary one by SN2.
   * Needs: SN2 slows with steric crowding at the carbon being attacked, not at the oxygen. The order is methyl > 1° > 2°, and 3° doesn't react by SN2.
* Q7 · 5D OCH S2 Moderate · ✓
   * Asked: which product can form only through a carbocation rearrangement.
   * Needs:
      * a hydride or methyl shift moves the + charge to a more substituted carbon;
      * products with X on the original carbon are "direct";
      * X on the neighboring, more substituted carbon means a rearrangement happened.
* Q8 · 5C OCH S2 Difficult · ✓
   * Asked: which compound gives the first gas-chromatography peak.
   * Needs:
      * the most volatile compound comes out first;
      * volatility is set by weak intermolecular forces and low mass;
      * an alkene beats an alkyl halide, and an alcohol (which hydrogen-bonds) comes out last.
* Q9 · 5B OCH S2 Difficult · ✓
   * Asked: the product of SN2 at a stereocenter.
   * Needs:
      * SN2 inverts the configuration;
      * re-check whether the R/S label flips, since the priorities can change when the new group goes on;
      * count the carbon chain length of the product.
* Q10 · 5D OCH S3 Expert · ✓
   * Asked: which isotope label shows which reactant loses its –OH in esterification.
   * Needs:
      * label the alcohol oxygen with ¹⁸O;
      * if the label stays in the ester, the acid lost the OH;
      * labeling a hydrogen with D tells you nothing, because acidic H exchange.

Stand-alones Q11–13 (Q10 is listed above)

* Q11 · 4D PHY S1 Moderate · ✓
   * Asked: the power of an eye lens from the object and image distances.
   * Needs:
      * 1/f = 1/o + 1/i, with distances in metres;
      * power in diopters = 1/f in metres;
      * the image distance is the lens-to-retina distance.
* Q12 · 5E BCH S1 Moderate · Partial
   * Asked: how an enzyme speeds a reaction.
   * Needs:
      * an enzyme stabilizes the transition state, which lowers Ea;
      * it doesn't change ΔG or the equilibrium;
      * binding the substrate too tightly doesn't lower Ea.
* Q13 · 5A GCH S2 Difficult · ✓
   * Asked: what lowers the percent ionization of a weak acid.
   * Needs:
      * adding a strong acid adds H⁺ and shifts the equilibrium left (the common-ion effect);
      * dilution raises percent ionization;
      * an electron-withdrawing Cl makes the acid stronger;
      * a basic indicator drop has no real effect.

Passage 3 (Q14–17): a micro-robot circuit; light in the eye; oxygen-sensor LED

* Q14 · 4C PHY S2 Easy · ✓
   * Asked: what happens to V when I rises at constant R.
   * Needs: V = IR, so V is proportional to I when R is fixed.
* Q15 · 4D PHY S2 Difficult · ✓
   * Asked: the index of refraction from the speed of light in a medium.
   * Needs: n = c/v, and n ≥ 1 always.
* Q16 · 4D PHY S1 Expert · ✓
   * Asked: what light intensity is proportional to.
   * Needs: at a fixed color, intensity is proportional to the number of photons per second. Speed, wavelength and polarization don't set it.
* Q17 · 4D PHY S2 Difficult · ✓
   * Asked: the energy of one photon from its frequency.
   * Needs: E = hf. THz = 10¹² Hz. Multiply the powers of ten carefully.

Passage 4 (Q18–21): blood pressure; flow and power graph; a positron tracer

* Q18 · 4B PHY S1 Moderate · ✓
   * Asked: rearrange a given pressure equation for another variable.
   * Needs: substitute one definition into the other, then isolate the variable. Multiply through by the fraction's denominator.
* Q19 · 4B GCH S1 Moderate · ✓
   * Asked: pulse pressure as a percentage of 1 atm.
   * Needs:
      * a typical healthy adult is about 120/80 mmHg;
      * pulse pressure = systolic − diastolic;
      * 1 atm = 760 mmHg;
      * % = value ÷ 760 × 100.
* Q20 · 4E PHY S2 Moderate · ✓
   * Asked: the fraction of a sample decayed after a given time.
   * Needs:
      * n = time ÷ half-life;
      * remaining = (1/2)ⁿ;
      * decayed = 1 − remaining.
* Q21 · 4A PHY S4 Expert · Partial
   * Asked: the work done over a time, where the power must be read from a graph.
   * Needs:
      * turn the volume and time into a flow rate in the graph's units;
      * read the power at that flow from the graph;
      * W = P × t, with t in seconds.

Passage 5 (Q22–25): a peptide amphiphile for building bone; disulfide cross-links; pH-driven assembly

* Q22 · 5D BCH S2 Expert · ✓
   * Asked: what makes the oxidized material rigid.
   * Needs:
      * oxidizing Cys thiols forms disulfide bonds, which are covalent;
      * bonds between different molecules are intermolecular;
      * a reducing agent breaks them.
* Q23 · 5D BCH S2 Expert · Partial
   * Asked: which residues in a labeled region give cells something to stick to.
   * Needs:
      * charged side chains (Asp −, Glu −, Lys +, Arg +, His) can bind electrostatically;
      * Gly has no side chain;
      * Cys belongs to the cross-linking region, so match each residue to its labeled region.
* Q24 · 5D BCH S2 Difficult · Partial
   * Asked: which residue is the phosphorylation (attachment) site.
   * Needs:
      * side-chain identities: Ser is a primary alcohol, Thr a secondary alcohol, Tyr a phenol, Ala a methyl;
      * phosphorylation goes on an –OH;
      * read the passage's description of the residue (a primary alcohol).
* Q25 · 5D BCH S3 Moderate · ✓
   * Asked: what makes self-assembly depend on pH.
   * Needs:
      * side chains whose charge changes with pH;
      * charged chains repel each other, and neutral ones can pack together;
      * compare the pH with each side chain's pKa.

Stand-alones Q26–29

* Q26 · 4B BIO S1 Moderate · ✓
   * Asked: why blood is slowest in the capillaries.
   * Needs: flow Q = A·v is the same at every level, and the capillaries have the largest total cross-sectional area, so v is smallest there.
* Q27 · 4E GCH S4 Moderate · ✓
   * Asked: read a potential–pH (Pourbaix) diagram.
   * Needs:
      * a horizontal boundary means the equilibrium doesn't depend on pH;
      * a vertical boundary means no electrons are transferred;
      * going higher on the diagram means more oxidized.
* Q28 · 5B GCH S1 Moderate · ✓
   * Asked: the hybridization in an octahedral complex.
   * Needs: 6 bonding domains → d²sp³ (equivalently sp³d²). 4 → sp³, 5 → sp³d.
* Q29 · 4B GCH S1 Difficult · ✓
   * Asked: the assumptions of an ideal gas.
   * Needs:
      * particle volume is negligible and there are no intermolecular forces;
      * 22.4 L/mol holds at STP (0 °C), not 25 °C.

Passage 6 (Q30–33): rhodopsin, retinal and color vision

* Q30 · 4D OCH S2 Difficult · ✓
   * Asked: why the eye has several opsins.
   * Needs: pigments with different absorption peaks let the brain compare their responses, which is how it detects different colors.
* Q31 · 5B GCH S2 Difficult · ✓
   * Asked: the environment of a pocket that binds a nonpolar molecule.
   * Needs:
      * a nonpolar ligand needs a hydrophobic pocket lined with Leu, Ile, Val and Phe;
      * charged or polar linings don't fit.
* Q32 · 5E BCH S1 Moderate · ✓
   * Asked: where the phosphate a kinase adds comes from.
   * Needs:
      * the kinase transfers the γ (terminal) phosphate of ATP;
      * the kinase is the enzyme, not the source.
* Q33 · 5B GCH S1 Easy · ✓
   * Asked: the hybridization of the carbons in a cis/trans isomerization.
   * Needs:
      * the C=C carbons are sp² and trigonal planar;
      * cis/trans isomers exist because a double bond can't rotate.

Passage 7 (Q34–37): a lipase, its variants, and heat stability

* Q34 · 5E BCH S1 Moderate · ✓
   * Asked: the reaction a lipase catalyzes.
   * Needs:
      * lipases hydrolyze the ester bonds of triacylglycerols, giving fatty acids;
      * pancreatic lipase cuts at positions 1 and 3, leaving a 2-monoacylglycerol.
* Q35 · 5D BCH S2 Expert · ✓
   * Asked: the change in net charge from substitutions at pH 7.
   * Needs:
      * charge of each side chain at pH 7: Arg/Lys +1, Asp/Glu −1, His ~0, the others 0;
      * add up (new − old) over all the substitutions.
* Q36 · 5D BCH S4 Easy · ✓
   * Asked: the conclusion shown by graphs of activity after heating.
   * Needs:
      * compare the activity each variant keeps with the wild type's;
      * reject claims the data don't show, such as "all activity is lost".
* Q37 · 5A GCH S2 Difficult · ✓
   * Asked: the factor by which [H⁺] changes between two pH values.
   * Needs: a change of Δ pH units is a factor of 10^Δ in [H⁺]. Lower pH means more H⁺.

Passage 8 (Q38–43): glycogen phosphorylation, laforin and Lafora bodies

* Q38 · 5D BCH S1 Difficult · Partial
   * Asked: pick the glucose structure phosphorylated at the carbons the passage names.
   * Needs:
      * number the glucose ring: C1 is anomeric, C2–C4 are in the ring, C5 is bonded to the ring O, and C6 is the CH₂OH;
      * find a phosphate by its carbon number;
      * always use the positions the passage states, not the familiar C6.
* Q39 · 5D BCH S1 Difficult · Partial
   * Asked: the bond that glycogen synthase forms.
   * Needs:
      * glycogen synthase makes α-1,4 links;
      * the branching enzyme makes α-1,6;
      * telling α from β: on a Haworth projection, see whether the C1 bond is on the same face as CH₂OH (β) or opposite it (α).
* Q40 · 5D BCH S1 Moderate · Partial
   * Asked: the second sugar in a UDP-sugar.
   * Needs:
      * UDP is uridine diphosphate, and uridine contains ribose;
      * deoxyribose is found in DNA nucleotides such as dTTP.
* Q41 · 5E BCH S3 Expert · ✓
   * Asked: the effect of adding a phosphatase on radioactive signals.
   * Needs:
      * a phosphatase removes phosphate, so the ³²P signal drops;
      * the ¹⁴C in the sugar backbone stays.
* Q42 · 4E PHY S2 Difficult · ✓
   * Asked: the daughter nuclei after β⁻ decay.
   * Needs:
      * β⁻ decay keeps A the same and raises Z by 1;
      * ¹⁴C → ¹⁴N and ³²P → ³²S.
* Q43 · 5D BCH S1 Expert · ✓
   * Asked: which bond is reduced in less-branched glycogen.
   * Needs: branch points are α-1,6 bonds. Fewer branches means fewer α-1,6 bonds.

Stand-alones Q44–47

* Q44 · 5A GCH S2 Difficult · Partial
   * Asked: which acid dissociation happens least.
   * Needs:
      * HCl and H₂SO₄ (first proton) are strong acids;
      * each successive Ka of a polyprotic acid is much smaller, since it is harder to remove H⁺ from a more negative ion;
      * so HPO₄²⁻ is the weakest acid.
* Q45 · 4D PHY S2 Expert · ✓
   * Asked: the image-to-object height ratio for a convex lens.
   * Needs:
      * 1/f = 1/o + 1/i, then m = −i/o;
      * with the object at 3f, the image is at 1.5f, so |m| = 1/2 and the image is inverted.
* Q46 · 4E PHY S1 Moderate · ✓
   * Asked: what is emitted in gamma decay.
   * Needs: a photon, with no change in A or Z. α is ⁴He, β⁻ is an electron, β⁺ is a positron.
* Q47 · 5E GCH S1 Moderate · ✓
   * Asked: the signs of ΔG and ΔS for a spontaneous reaction that makes a gas.
   * Needs:
      * spontaneous means ΔG < 0;
      * a gas forming from a solid or solution means ΔS > 0;
      * check against ΔG = ΔH − TΔS.

Passage 9 (Q48–51): catalysis; peroxide decomposition steps; catalytic converter; heterogeneous catalysts

* Q48 · 4E GCH S1 Moderate · Partial
   * Asked: the overall reaction from mechanism steps.
   * Needs:
      * add the steps, then cancel species that appear on both sides (catalysts and intermediates);
      * check that atoms and charge balance;
      * a catalyst is used and then regenerated, while an intermediate is made and then used up.
* Q49 · 5E GCH S2 Moderate · ✓
   * Asked: which of the drawn processes is NOT something a catalytic converter does.
   * Needs:
      * a converter is a heterogeneous solid catalyst;
      * it oxidizes CO → CO₂ and unburned hydrocarbons → CO₂ + H₂O;
      * it reduces NOₓ → N₂.
* Q50 · 5E GCH S3 Moderate · ✓
   * Asked: what happens if a homogeneous catalyst can't be separated from the products.
   * Needs: it's in the same phase as the product, so the product is contaminated. Catalysts don't shift equilibrium.
* Q51 · 5E GCH S3 Moderate · ✓
   * Asked: the effect of grinding a solid catalyst.
   * Needs:
      * more exposed surface area means a faster rate;
      * the mass is unchanged;
      * when a cube is split into smaller cubes, the surface area grows by the ratio of the edge lengths.

Passage 10 (Q52–56): a galvanic cell lighting a bulb

* Q52 · 4C PHY S3 Moderate · ✓
   * Asked: the best way to increase the current.
   * Needs:
      * I = V/R, so lower the resistance;
      * a thinner or longer wire, or a hotter metal, raises R;
      * lower ion concentrations lower the cell voltage.
* Q53 · 4C GCH S2 Difficult · ✓
   * Asked: whether a metal more active than zinc releases H₂ from acid.
   * Needs: if the metal is oxidized more easily than H₂ (E° < 0), it is oxidized and H⁺ is reduced to H₂.
* Q54 · 4E GCH S2 Difficult · ✓
   * Asked: the balanced reaction for Al and Cu²⁺.
   * Needs:
      * the metal with the lower E° is oxidized;
      * balance the electrons: Al gives 3e⁻ and Cu²⁺ takes 2e⁻, so the coefficients are 2 Al and 3 Cu²⁺.
* Q55 · 4C GCH S2 Expert · ✓
   * Asked: E°cell and whether the reaction is spontaneous.
   * Needs:
      * E°cell = E°cathode − E°anode;
      * the cathode is the electrode with the higher reduction potential;
      * positive means spontaneous.
* Q56 · 4C PHY S2 Expert · ✓
   * Asked: the current through a bulb from V and R.
   * Needs: I = V/R. Take R from the passage, and convert mΩ.

Stand-alones Q57–59

* Q57 · 5A GCH S2 Moderate · ✓
   * Asked: the effect of adding a common ion to a saturated salt.
   * Needs:
      * adding the common ion raises Q above Ksp;
      * the equilibrium shifts left and the salt precipitates;
      * Ksp itself doesn't change.
* Q58 · 5A GCH S2 Difficult · ✓
   * Asked: the volume of solution that holds a given number of moles.
   * Needs: V = n ÷ M, in litres. Convert to mL, and convert grams to moles first if needed.
* Q59 · 4A PHY S1 Expert · ✓
   * Asked: which unit can't be a unit of power.
   * Needs:
      * W = J/s = kg·m²·s⁻³;
      * kg·m²·s⁻² is energy (J), not power;
      * force × distance ÷ time is power.

Summary

* Answers: all 59 PE1 cards have correct answers.
* Matches: 49 teach exactly what the real question needs.
* Partial: 10 (Q4, 12, 21, 23, 24, 38, 39, 40, 44, 48) have correct answers, but the real question needs a fact or step the card doesn't teach. Those facts are listed above, and the step-1 flashcards for these questions must include them.
* Card wording: no card needs its wording changed. The gaps are filled by the new flashcards.
