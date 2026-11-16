PE4 Chem/Phys: what each question needs
What this is: the spec for the step-1 flashcards built from AAMC Practice Exam 4, Chem/Phys section.
How I checked it:

* I checked each of the 59 questions against the real AAMC question in the AAMC review on 2026-11-15, one by one.
* Everything below is in my own words. No AAMC wording, numbers or answer choices are copied.

Codes on each line:

* Category: the AAMC content category, e.g. 5E.
* Discipline: OCH organic chemistry, GCH general chemistry, BCH biochemistry, PHY physics, BIO biology.
* Skill: S1–S4 are the AAMC scientific-reasoning skills 1–4.
* Difficulty: AAMC's own label: Easy, Moderate, Difficult or Expert.

Card match: whether the existing `pe4-cp:N` card in `qb-aamc-fl.js` teaches what the real question needs.

* ✓ = the card teaches the same idea and asks it the same way.
* Partial = the card's answer is right, but the real question needs a fact or step the card doesn't teach. The flashcards for that question must add the items listed.

Each question gets one flashcard per item in its "Needs" list.
Passage 1 (Q1–4): an industrial process from limestone; NH₃ and NH₄Cl; gas volume at STP

* Q1 · 5E GCH S1 Moderate · ✓
   * Asked: why an endothermic decomposition doesn't happen at a given temperature.
   * Needs:
      * ΔG = ΔH − TΔS;
      * the reaction is non-spontaneous when ΔH (positive) is greater than TΔS;
      * it becomes spontaneous above T = ΔH/ΔS.
* Q2 · 5E GCH S1 Moderate · ✓
   * Asked: the K expression for a solid that gives off a gas.
   * Needs:
      * pure solids and liquids are left out of K, so K = [CO₂] (or P_CO₂);
      * adding more solid doesn't shift the equilibrium.
* Q3 · 4E GCH S1 Difficult · ✓
   * Asked: whether N's oxidation state changes when NH₃ becomes NH₄⁺.
   * Needs:
      * assign oxidation states: N is −3 in both;
      * only H⁺ is transferred, so it is acid–base, not redox.
* Q4 · 4B GCH S2 Moderate · ✓
   * Asked: the volume of a gas product at STP.
   * Needs:
      * moles of product from the reaction ratios;
      * × 22.4 L/mol, which holds at STP only.

Passage 2 (Q5–8): a glucose assay by absorbance; standards and dilution

* Q5 · 4D GCH S3 Easy · ✓
   * Asked: why the cuvettes must be optically identical.
   * Needs:
      * the reference and the sample must differ only in the substance being measured, so their spectra can be compared;
      * a cuvette's own absorbance would otherwise add to the reading.
* Q6 · 4D PHY S2 Moderate · ✓
   * Asked: the photon energy in eV at the absorbed wavelength.
   * Needs:
      * E = hc/λ in J;
      * ÷ 1.6 × 10⁻¹⁹ to get eV;
      * shortcut: E(eV) ≈ 1240/λ(nm).
* Q7 · 5A GCH S4 Difficult · ✓
   * Asked: the original concentration from a standards table and a dilution.
   * Needs:
      * read the diluted concentration from the absorbance using the linear standards (A ∝ c);
      * multiply by the dilution factor.
* Q8 · 5A GCH S3 Difficult · ✓
   * Asked: what to do when a sample reads above the highest standard.
   * Needs:
      * dilute the sample into the standard range (interpolate, don't extrapolate);
      * then multiply back by the dilution factor.

Stand-alones Q9–12

* Q9 · 5C OCH S2 Moderate · ✓
   * Asked: why fractional distillation separates two liquids.
   * Needs:
      * it separates by boiling point;
      * an alcohol hydrogen-bonds, so it boils higher than an alkyl halide or ether of similar mass;
      * the lower-boiling liquid distills first.
* Q10 · 5D OCH S1 Easy · ✓
   * Asked: which oxidation can't happen.
   * Needs:
      * a tertiary alcohol has no H on its carbinol carbon, so it isn't oxidized;
      * 1° → aldehyde → acid;
      * 2° → ketone.
* Q11 · 5B OCH S2 Moderate · Partial
   * Asked: the IUPAC name of an alkene with E/Z.
   * Needs:
      * choose the longest chain that contains the C=C, and number from the end nearer the C=C;
      * name the substituents;
      * at each double-bond carbon, rank the two groups by CIP priority (higher atomic number first);
      * Z = the higher-priority groups are on the same side, E = opposite sides.
* Q12 · 4A PHY S2 Moderate · ✓
   * Asked: which magnitude a sum of two vectors can't have.
   * Needs: the resultant ranges from |A − B| (at 180°) to A + B (at 0°). Anything outside that range is impossible.

Passage 3 (Q13–16): laser eye surgery (PRK): cornea shape, field in the laser tube, pulse rate, pulsed heating

* Q13 · 4D PHY S3 Expert · ✓
   * Asked: what PRK changes to correct nearsightedness.
   * Needs:
      * flattening the cornea increases its radius of curvature;
      * that lengthens the focal length (less converging), which moves the focus back onto the retina.
* Q14 · 4C PHY S2 Moderate · ✓
   * Asked: the field between electrodes.
   * Needs: E = V/d, with d in metres and kV = 10³ V.
* Q15 · 4A PHY S1 Difficult · ✓
   * Asked: the pulse frequency.
   * Needs:
      * f = 1/T, where T is the time from one pulse's start to the next;
      * ms = 10⁻³ s.
* Q16 · 5E PHY S1 Moderate · ✓
   * Asked: why pulsed light is used instead of continuous.
   * Needs: heat dissipates between pulses, so the tissue stays at a lower average temperature.

Passage 4 (Q17–20): an ammonia can-crush demonstration; NH₃ as a weak base; calcium compounds

* Q17 · 5B GCH S1 Moderate · Partial
   * Asked: the intermolecular forces among NH₃ molecules.
   * Needs:
      * every molecule has London dispersion forces;
      * polar molecules also have dipole–dipole forces;
      * hydrogen bonding (H on N, O or F) is an especially strong dipole–dipole force;
      * so NH₃ has both dipole–dipole and London forces.
* Q18 · 5A GCH S2 Expert · ✓
   * Asked: [NH₄⁺] in a concentrated NH₃ solution.
   * Needs:
      * Kb = x²/C, so x = √(Kb·C);
      * estimate the square root of the powers of ten.
* Q19 · 5A GCH S2 Easy · ✓
   * Asked: what happens if a nonpolar gas replaces NH₃.
   * Needs:
      * a nonpolar gas like CH₄ barely dissolves in water (like dissolves like);
      * so the gas pressure doesn't drop, and the can doesn't collapse.
* Q20 · 4E GCH S1 Easy · Partial
   * Asked: the group that calcium compounds belong to.
   * Needs:
      * Ca is an alkaline earth metal (group 2);
      * the group names: alkali metals (1), alkaline earth metals (2), transition metals, metalloids, halogens (17);
      * group 2 forms 2+ ions.

Passage 5 (Q21–24): a compound that sensitizes cancer cells to a chemotherapy drug

* Q21 · 5D BCH S4 Moderate · ✓
   * Asked: the conclusion from the dose data, with and without the sensitizer.
   * Needs:
      * compare the dose needed with and without the sensitizer, for cancer cells versus normal cells;
      * "selective" means the dose falls only for the cancer cells;
      * reject claims the data don't test.
* Q22 · 4E GCH S1 Difficult · ✓
   * Asked: convert a concentration to μM.
   * Needs:
      * the metric prefixes: nM = 10⁻⁹, μM = 10⁻⁶;
      * nM → μM: divide by 1000.
* Q23 · 5D BCH S4 Difficult · ✓
   * Asked: which cell line is enhanced most.
   * Needs:
      * the enhancement = dose alone ÷ dose with the sensitizer, a ratio and not a difference;
      * compute it for each line and pick the largest.
* Q24 · 5D BCH S3 Expert · ✓
   * Asked: the best dosing order given the proposed mechanism.
   * Needs:
      * give the sensitizer first so it has time to act;
      * then give the drug that depends on the blocked pathway.

Stand-alones Q25–28

* Q25 · 5B OCH S2 Easy · ✓
   * Asked: the bonding in a carbonyl group.
   * Needs:
      * C=O is one σ bond plus one π bond;
      * a triple bond would be one σ plus two π;
      * a double bond is shorter than a single bond.
* Q26 · 4E GCH S2 Moderate · ✓
   * Asked: which atom gains an electron most readily.
   * Needs:
      * a halogen is one electron short of a filled p subshell, so it has the most favorable electron affinity;
      * noble gases and metals don't gain electrons readily.
* Q27 · 5E PHY S4 Easy · ✓
   * Asked: name a point on a phase diagram.
   * Needs:
      * a point on the solid–gas line is sublimation;
      * solid–liquid is melting;
      * liquid–gas is boiling;
      * the triple point and critical point are special points.
* Q28 · 4E PHY S4 Moderate · ✓
   * Asked: which transition emits the longest wavelength.
   * Needs: λ = hc/ΔE, so the smallest energy gap gives the longest wavelength.

Passage 6 (Q29–33): synthesis of an alkaloid: amines, lactones, esters, carbamates

* Q29 · 5A GCH S1 Moderate · ✓
   * Asked: the functional group in a nitrogen ring.
   * Needs:
      * an N with only C and H neighbors (no C=O) is an amine;
      * classify it as 1°, 2° or 3° by the number of C attached;
      * amide = N–C=O; imine = C=N; carbamate = N–C(=O)–O.
* Q30 · 5D OCH S1 Expert · ✓
   * Asked: the reaction steps from a keto ester to a lactone.
   * Needs:
      * NaBH₄ reduces the ketone to an alcohol and leaves the ester;
      * a γ- or δ-hydroxy ester then cyclizes to a lactone, releasing the alcohol.
* Q31 · 5D OCH S2 Expert · ✓
   * Asked: the product with excess base.
   * Needs: excess hydroxide hydrolyzes every ester and lactone into carboxylates (saponification).
* Q32 · 5D OCH S1 Expert · ✓
   * Asked: why a base is added to an amine salt before an SN2 step.
   * Needs:
      * the base removes H⁺ from the ammonium salt, freeing the amine;
      * only the free amine has a lone pair, so only it is nucleophilic.
* Q33 · 5D OCH S1 Expert · ✓
   * Asked: in which step a carbamate is cleaved.
   * Needs:
      * a carbamate is broken by hydrolysis, which needs strong base or acid and heat;
      * find the step with those conditions.

Passage 7 (Q34–37): HIV reverse-transcriptase inhibitors: kinetics, binding order, interactions, π bonds

* Q34 · 5E BCH S2 Moderate · ✓
   * Asked: the inhibitor type from kinetic data.
   * Needs:
      * competitive: Vmax is unchanged and KM rises;
      * noncompetitive: Vmax falls and KM is unchanged;
      * mixed: Vmax falls and KM changes;
      * uncompetitive: both fall;
      * read the Lineweaver–Burk intercepts.
* Q35 · 5E BCH S2 Expert · ✓
   * Asked: the substrate-binding mechanism from a scheme.
   * Needs:
      * ordered = one substrate must bind first;
      * random = either can bind first;
      * ping-pong = a product leaves before the second substrate binds.
* Q36 · 5D BCH S2 Difficult · ✓
   * Asked: the main interaction with a nonpolar drug in a pocket.
   * Needs:
      * a nonpolar part in a water-free pocket makes hydrophobic contacts;
      * the pocket is lined with Leu, Ile, Val and Phe.
* Q37 · 5B GCH S1 Moderate · ✓
   * Asked: count π bonds.
   * Needs:
      * a double bond has 1 π and a triple bond has 2;
      * a benzene ring has 3;
      * C≡N and C≡C each have 2;
      * add them all up.

Passage 8 (Q38–43): an enzyme that cleaves a phosphate ester, studied by absorbance at several pH values

* Q38 · 4D GCH S1 Difficult · ✓
   * Asked: the concentration from an absorbance.
   * Needs:
      * A = εbc, so c = A/(εb);
      * use the ε at the wavelength being measured.
* Q39 · 4D GCH S3 Difficult · ✓
   * Asked: how to cope with a detector that can't read high absorbances.
   * Needs: lower A by diluting the sample or using a shorter path length, both from A = εbc.
* Q40 · 5A GCH S1 Difficult · ✓
   * Asked: for which pH values a buffer is acceptable.
   * Needs: a buffer works within pKa ± 1, so check each pH against that window.
* Q41 · 5E BCH S2 Expert · ✓
   * Asked: the enzyme–substrate covalent intermediate.
   * Needs:
      * the nucleophile (an Asp O or a His N) attacks the electrophilic phosphorus, not an oxygen;
      * the phosphate is transferred to the enzyme.
* Q42 · 5A GCH S2 Difficult · ✓
   * Asked: [H₃O⁺] at a given pH, in μM.
   * Needs:
      * [H₃O⁺] = 10^−pH M;
      * M → μM: × 10⁶.
* Q43 · 5E BCH S4 Difficult · ✓
   * Asked: the effect of pH on catalytic efficiency and Vmax, from a table.
   * Needs:
      * catalytic efficiency = kcat/KM;
      * Vmax = kcat[E]total;
      * read how each value changes as the pH rises.

Stand-alones Q44–47

* Q44 · 4B PHY S1 Easy · ✓
   * Asked: what lets insects stand on water.
   * Needs: surface tension, from cohesion between water molecules at the surface.
* Q45 · 4E PHY S2 Moderate · ✓
   * Asked: the original amount from what remains after several half-lives.
   * Needs:
      * n = time ÷ half-life;
      * original = remaining × 2ⁿ.
* Q46 · 4D PHY S1 Moderate · ✓
   * Asked: why a thin thread makes bright and dark fringes.
   * Needs: diffraction, as light bends around an obstacle about the size of its wavelength.
* Q47 · 5D OCH S2 Easy · ✓
   * Asked: which saturated fatty acid is most soluble in water.
   * Needs: the shortest hydrocarbon chain is the least hydrophobic, so it is the most soluble.

Passage 9 (Q48–52): DNA polymerase, base tautomers, mismatches and metal ions

* Q48 · 5D BCH S1 Difficult · ✓
   * Asked: which tautomer of the bases is favored.
   * Needs:
      * under physiological conditions, G, T and U exist mainly in their keto forms;
      * the rare enol forms cause mispairing.
* Q49 · 4E PHY S1 Difficult · ✓
   * Asked: the daughter atom after β⁻ decay of ³²P.
   * Needs:
      * β⁻ decay raises Z by 1 and keeps A, so P (15) → S (16);
      * one neutron turns into a proton.
* Q50 · 5D BCH S2 Moderate · ✓
   * Asked: which substitution for an active-site Asp keeps activity.
   * Needs:
      * a conservative swap keeps the activity: Asp → Glu, since both have a carboxylate;
      * swapping to A, K or F loses the negative charge.
* Q51 · 5D BCH S2 Difficult · Partial
   * Asked: count the hydrogen bonds in two mismatched base pairs described in the passage.
   * Needs:
      * normal pairs: G·C has 3 H-bonds and A·T has 2;
      * count donors and acceptors in a drawn pair: an H on N or O facing a lone-pair N or O is one H-bond;
      * an enol tautomer changes which atoms are donors and which are acceptors, which changes the count.
* Q52 · 4E GCH S1 Moderate · ✓
   * Asked: which ion can't replace a divalent metal.
   * Needs: Na only forms 1+. Mg, Zn and Fe can form 2+.

Passage 10 (Q53–56): a defibrillator: capacitor energy, battery charge, force on blood, fields in conductors

* Q53 · 4A PHY S2 Difficult · ✓
   * Asked: the height a mass must be lifted to store the same energy as a capacitor.
   * Needs:
      * U = ½CV²;
      * set it equal to mgh and solve for h;
      * μF = 10⁻⁶ and kV = 10³.
* Q54 · 4C PHY S2 Difficult · ✓
   * Asked: the charge from an amp-hour rating.
   * Needs:
      * Q = I·t;
      * 1 A·h = 3600 C;
      * the voltage doesn't matter.
* Q55 · 4A PHY S2 Expert · ✓
   * Asked: the average force on blood speeding up.
   * Needs:
      * F = mΔv/Δt;
      * convert g → kg and cm/s → m/s.
* Q56 · 4C PHY S1 Expert · ✓
   * Asked: why E = 0 inside a conductor.
   * Needs: free electrons move to the surface until their field cancels any field inside, which is electrostatic equilibrium.

Stand-alones Q57–59

* Q57 · 4B BIO S2 Moderate · ✓
   * Asked: mean arterial pressure from a given formula.
   * Needs: plug the systolic and diastolic values into the formula given. Diastolic is the lower number.
* Q58 · 4C BIO S1 Difficult · Partial
   * Asked: which event comes first when an action potential starts.
   * Needs:
      * the order of events:
         1. graded potentials reach threshold at the axon hillock;
         2. voltage-gated Na⁺ channels open and Na⁺ rushes in (depolarization);
         3. voltage-gated K⁺ channels open and K⁺ flows out (repolarization);
         4. hyperpolarization;
      * Ca²⁺ influx and neurotransmitter release happen later, at the axon terminal.
* Q59 · 5E GCH S2 Moderate · ✓
   * Asked: the heat needed to warm water.
   * Needs:
      * q = mcΔT, matching the units (kJ/(kg·°C) with kg);
      * for a time, use t = q/P.

Summary

* Answers: all 59 PE4 cards have correct answers.
* Matches: 54 teach exactly what the real question needs.
* Partial: 5 (Q11, 17, 20, 51, 58) have correct answers, but the real question needs a fact or step the card doesn't teach. Those facts are listed above, and the step-1 flashcards for these questions must include them.
* Biggest gap: Q58. The card teaches what happens at one point on the action-potential trace, but the real question asks for the order of events.
