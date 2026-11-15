# AAMC length and format — 2026-11-15

Checked by `tools/test-aamc-format.cjs` (run `node tools/test-aamc-format.cjs --list` for every finding).
Each cell is **median / 90th percentile (min–max)**, in words. Bands:

| Measure | Allowed | AAMC median (middle half; range) |
|---|---|---|
| Passage words | 150–400; file median 220–290 | 251 (214–303; 131–405) |
| Passage-question stem | 6–50; file median 15–22 | 18 (14–24; 6–54) |
| Stand-alone or flashcard stem | 7–57 | 23 (13–33; 7–57) |
| Answer choice | file median ≤ 4; 90th percentile ≤ 12 | 2 (1–5; 90% ≤ 9) |
| Key length | key ≤ 1.5× the next-longest choice (or < 3 words longer) | — |

data/qb-aamc-fl.js (Practice Exam and Sample Test cards) is reported, not enforced: those stems carry the passage context.

## Before → after, per file

| File | Passage | Passage-question stem | Stand-alone / flashcard stem | Choice | Failures |
|---|---|---|---|---|---|
| cp-practice.js | 266.5 / 296 (200–341) | 21 / 35 (9–58) → **21 / 35 (9–47)** | – | 4 / 16 (1–25) → **4 / 12 (1–24)** | 8 → 0 |
| cp-pool.js | 257.5 / 292 (191–319) | 18 / 31 (4–45) → **18 / 31 (7–45)** | 26 / 44 (6–68) → **26 / 44 (7–56)** | 4 / 15 (1–29) → **4 / 12 (1–29)** | 16 → 0 |
| cp-diagnostic.js | 263 / 280 (246–306) | 20 / 33 (7–50) | 23 / 45 (10–47) | 7 / 14 (1–29) → **4 / 12 (1–17)** | 6 → 0 |
| qb-aamc-chem.js | – | – | 16 / 33 (2–73) → **17 / 33 (7–57)** | 3 / 9 (1–15) | 171 → 0 |
| qb-aamc-phys.js | – | – | 22 / 37 (7–59) → **22 / 37 (7–57)** | 2 / 6 (1–13) | 153 → 0 |
| qb-aamc-biochem.js | – | – | 31 / 50 (11–57) | 5 / 10 (1–13) → **4 / 10 (1–13)** | 9 → 0 |
| qb-aamc-iqb.js | – | – | 16.5 / 34 (9–34) | 2 / 6 (1–6) | 3 → 0 |
| qb-aamc-fl.js (report only) | – | – | 35.5 / 49 (11–65) → **33 / 47 (8–76)** | 4 / 10 (1–17) → **4 / 10 (1–20)** | 68 → 120 |

Failures by check, before → after:

- **cp-practice.js**: pqStem 2 → 0, parallelNumeric 1 → 0, completePeriod 4 → 0, choiceP90 1 → 0
- **cp-pool.js**: pqStem 3 → 0, parallelNumeric 1 → 0, saStem 5 → 0, stemEnd 2 → 0, completePeriod 4 → 0, choiceP90 1 → 0
- **cp-diagnostic.js**: completePeriod 4 → 0, choiceMedian 1 → 0, choiceP90 1 → 0
- **qb-aamc-chem.js**: completePeriod 146 → 0, saStem 18 → 0, stemEnd 1 → 0, parallelNumeric 1 → 0, frame 4 → 0, negation 1 → 0
- **qb-aamc-phys.js**: completePeriod 147 → 0, parallelNumeric 3 → 0, frame 1 → 0, saStem 2 → 0
- **qb-aamc-biochem.js**: completePeriod 5 → 0, frame 2 → 0, parallelNumeric 1 → 0, choiceMedian 1 → 0
- **qb-aamc-iqb.js**: completePeriod 3 → 0
- **qb-aamc-fl.js**: frame 2 → 2, stemEnd 2 → 2, completePeriod 56 → 101, letters 1 → 1, units 1 → 1, saStem 2 → 3, parallelNumeric 3 → 4, parallelCase 1 → 1, keyLength 0 → 5

qb-aamc-fl.js rose from 266 to 354 cards in this change, so its before and after counts cover different card sets.

## Every edit (673 field edits)

Trimming and reformatting only: no key (`ans`), id or src changed, and no new facts. 22 QBank stems changed; each keeps its old
stem as `idStem`, so saved progress stays linked.

### cp-practice.js (23 items, 83 edits)

| Item | Field | Before | After |
|---|---|---|---|
| p_cpx6_6_q2 | choices[0] | each carry twice the energy and arrive at half the rate | each carry twice the energy and arrive at half the rate. |
| p_cpx6_6_q2 | choices[1] | each carry the same energy and arrive at the same rate | each carry the same energy and arrive at the same rate. |
| p_cpx6_6_q2 | choices[2] | each carry twice the energy and arrive at the same rate | each carry twice the energy and arrive at the same rate. |
| p_cpx6_6_q2 | choices[3] | each carry four times the energy and arrive at one-quarter the rate | each carry four times the energy and arrive at one-quarter the rate. |
| p_cpx2_3_q4 | q | For the 2.0 m light guide, the team wants the fiber that traps light over the widest range of angles of incidence at the core–cladding boundary. Which fiber in Table 1 is best, and how does the speed of light in its core compare with the speed in the core of Fiber 3? | For the 2.0 m light guide, which fiber in Table 1 traps light over the widest range of angles of incidence at the core–cladding boundary, and how does the speed of light in its core compare with that in Fiber 3? |
| p_cpx2_6_q3 | q | Partway through Trial 2, the flask contains 0.50 mol of Compound 3, 0.50 mol of Compound 1, 0.50 mol of Compound 2 and 0.10 mol of water; the other 0.40 mol of water formed is in the trap. What is the reaction quotient Q for the mixture in the flask, and in which direction does the reaction proceed? | Partway through Trial 2, the flask holds 0.50 mol each of Compounds 3, 1 and 2 and 0.10 mol of water; the other 0.40 mol of water is in the trap. What is the reaction quotient Q for the flask, and which way does the reaction proceed? |
| p_cpx5_6_q2 | choices[3] | Nearly 100%, because the free concentration of Compound 3 exceeds its Kd | ≈100% |
| p_cpx5_6_q2 | exp | First find Kd for Compound 3: koff/kon = 0.036 ÷ (3.0 × 10⁶) = 1.2 × 10⁻⁸ M = **12 nM**. For simple one-site binding, the **fraction bound = [L]/(Kd + [L])** = 36/(12 + 36) = 36/48 = **75%**. A free ligand concentration of 3 × Kd always gives 75% occupancy.  **25%** is Kd/(Kd + [L]), the fraction that is **unoccupied**. **33%** is Kd/[L] (12/36), which is not a fraction bound. **Nearly 100%** would need [L] far above Kd (about 100 × Kd gives 99%); at [L] = Kd, occupancy is only 50%. | First find Kd for Compound 3: koff/kon = 0.036 ÷ (3.0 × 10⁶) = 1.2 × 10⁻⁸ M = **12 nM**. For simple one-site binding, the **fraction bound = [L]/(Kd + [L])** = 36/(12 + 36) = 36/48 = **75%**. A free ligand concentration of 3 × Kd always gives 75% occupancy.  **25%** is Kd/(Kd + [L]), the fraction that is **unoccupied**. **33%** is Kd/[L] (12/36), which is not a fraction bound. **≈100%** would need [L] far above Kd (about 100 × Kd gives 99%); at [L] = Kd, occupancy is only 50%. |
| p_cpx1_1_q2 | choices[0] | Donation of the nitrogen lone pair into the C=O group makes the carbonyl carbon less electrophilic. | Nitrogen lone-pair donation into C=O makes the carbonyl carbon less electrophilic. |
| p_cpx1_1_q2 | choices[1] | Withdrawal of electron density by the nitrogen atom makes the carbonyl carbon more electrophilic. | Electron withdrawal by nitrogen makes the carbonyl carbon more electrophilic. |
| p_cpx1_1_q2 | choices[2] | The carbonyl carbon of the carbamoyl group is sp³ hybridized, so water cannot attack it. | The carbamoyl carbonyl carbon is sp³ hybridized, so water cannot attack it. |
| p_cpx1_1_q2 | choices[3] | The dimethylcarbamoyl group carries a positive charge that repels the attacking water molecule. | The dimethylcarbamoyl group is positively charged and repels the attacking water. |
| p_cpx1_4_q3 | choices[0] | The spot of Compound 5 is gone, and one new spot appears at a lower Rf. | Compound 5 is gone; one new spot appears at lower Rf. |
| p_cpx1_4_q3 | choices[1] | The spot of Compound 5 is gone, and one new spot appears at a higher Rf. | Compound 5 is gone; one new spot appears at higher Rf. |
| p_cpx1_4_q3 | choices[2] | The spot of Compound 5 remains, and one new spot appears at a lower Rf. | Compound 5 remains; one new spot appears at lower Rf. |
| p_cpx1_4_q3 | choices[3] | The spot of Compound 5 remains, and one new spot appears with the Rf of biphenyl. | Compound 5 remains; one new spot appears at the Rf of biphenyl. |
| p_cpx2_3_q2 | choices[0] | is totally reflected, because 60° is greater than the critical angle of 53°. | is totally reflected, because 60° exceeds the critical angle of 53°. |
| p_cpx2_3_q2 | choices[1] | is totally reflected, because 60° is greater than the critical angle of 42°. | is totally reflected, because 60° exceeds the critical angle of 42°. |
| p_cpx2_3_q2 | choices[2] | is totally reflected, because 60° is greater than the critical angle of 26°. | is totally reflected, because 60° exceeds the critical angle of 26°. |
| p_cpx2_3_q2 | choices[3] | is partly transmitted into the fluid, because 60° is less than the critical angle of 64°. | is partly transmitted, because 60° is below the critical angle of 64°. |
| p_cpx3_6_q3 | choices[0] | Annihilation gives two 511 keV photons that travel in opposite directions, conserving momentum. | Annihilation gives two 511 keV photons in opposite directions, conserving momentum. |
| p_cpx3_6_q3 | choices[1] | Annihilation gives two 1022 keV photons that travel in opposite directions, conserving momentum. | Annihilation gives two 1022 keV photons in opposite directions, conserving momentum. |
| p_cpx3_6_q3 | choices[2] | Annihilation gives two 511 keV photons that travel in the same direction, conserving charge. | Annihilation gives two 511 keV photons in the same direction, conserving charge. |
| p_cpx3_6_q3 | choices[3] | Annihilation gives one 1022 keV photon that is scattered into two opposite beams by tissue. | Annihilation gives one 1022 keV photon that tissue splits into opposite beams. |
| p_cpx4_2_q3 | choices[0] | The second electron would come from the filled 3p core, which is held far more tightly. | A second electron would come from the tightly held, filled 3p core. |
| p_cpx4_2_q3 | choices[1] | The second electron would come from the 4s subshell, which holds it more tightly once K⁺ forms. | A second 4s electron would be held more tightly once K⁺ forms. |
| p_cpx4_2_q3 | choices[2] | K⁺ has a half-filled outer subshell, which makes it especially stable toward further ionization. | K⁺ has a half-filled outer subshell, making it especially stable toward ionization. |
| p_cpx4_2_q3 | choices[3] | The first ionization energy exceeds the second, so only one electron can be removed in solution. | IE₁ exceeds IE₂, so only one electron can be removed in solution. |
| p_cpx4_4_q3 | choices[0] | Compound 3 lacks the broad absorption between 2500 and 3300 cm⁻¹ that Compound 2 shows. | Compound 3 lacks Compound 2's broad absorption at 2500–3300 cm⁻¹. |
| p_cpx4_4_q3 | choices[1] | Compound 3 lacks the strong absorption near 1715 cm⁻¹ that Compound 2 shows. | Compound 3 lacks Compound 2's strong absorption near 1715 cm⁻¹. |
| p_cpx4_4_q3 | choices[2] | Compound 3 shows a sharp absorption near 2250 cm⁻¹ that Compound 2 lacks. | Compound 3 has a sharp absorption near 2250 cm⁻¹, unlike Compound 2. |
| p_cpx4_4_q3 | choices[3] | Compound 3 shows a strong absorption near 1650 cm⁻¹ for its C=C bond. | Compound 3 has a strong C=C absorption near 1650 cm⁻¹. |
| p_cpx4_6_q4 | choices[0] | Supply the hydroquinone form of vitamin K directly to warfarin-treated liver microsomes and measure whether Gla formation continues. | Give warfarin-treated microsomes vitamin K hydroquinone and test whether Gla formation continues. |
| p_cpx4_6_q4 | choices[1] | Supply vitamin K 2,3-epoxide to warfarin-treated liver microsomes and measure whether Gla formation continues. | Give warfarin-treated microsomes vitamin K 2,3-epoxide and test whether Gla formation continues. |
| p_cpx4_6_q4 | choices[2] | Measure the clotting time of blood from patients before and after they begin taking warfarin. | Compare patients' clotting times before and after they start warfarin. |
| p_cpx4_6_q4 | choices[3] | Add a larger amount of Glu-containing peptide substrate to warfarin-treated liver microsomes and measure Gla formation. | Give warfarin-treated microsomes more Glu peptide substrate and measure Gla formation. |
| p_cpx5_3_q3 | choices[0] | pH 2, so that nicotine is fully protonated and partitions into the organic layer | pH 2, so nicotine is fully protonated and enters the organic layer |
| p_cpx5_3_q3 | choices[1] | pH 6, so that nicotine is mostly protonated and partitions into the organic layer | pH 6, so nicotine is mostly protonated and enters the organic layer |
| p_cpx5_3_q3 | choices[2] | pH 8, so that nicotine is half protonated and partitions equally between the layers | pH 8, so nicotine is half protonated and splits equally between layers |
| p_cpx5_3_q3 | choices[3] | pH 11, so that nicotine is mostly neutral and partitions into the organic layer | pH 11, so nicotine is mostly neutral and enters the organic layer |
| p_cpx6_6_q4 | choices[0] | Each RF photon carries far less energy than is needed to remove an electron from a molecule. | Each RF photon has far too little energy to remove an electron. |
| p_cpx6_6_q4 | choices[1] | Each RF photon carries far more energy than is needed to remove an electron, so it passes through without interacting. | Each RF photon has far more than ionizing energy, so it passes through. |
| p_cpx6_6_q4 | choices[2] | RF waves are longitudinal pressure waves, so they do not consist of photons. | RF waves are longitudinal pressure waves, not photons. |
| p_cpx6_6_q4 | choices[3] | The total energy delivered by the RF pulses is too small to warm tissue. | The total RF energy delivered is too small to warm tissue. |
| p_cpx1_2_q4 | choices[1] | The density of the solution, to determine how much solute is still dissolved | Solution density, to determine how much solute remains dissolved |
| p_cpx1_2_q4 | choices[2] | The UV absorbance of the imidazole ring, to determine how much ring remains | UV absorbance of the imidazole ring, to determine how much remains |
| p_cpx1_2_q4 | choices[3] | The optical rotation of the solution, to determine whether it is still chiral | Optical rotation of the solution, to determine whether it is still chiral |
| p_cpx2_1_q4 | choices[0] | Esterification replaces the O–H group with an ester, so Compound 2 has no hydrogen-bond donor and is too nonpolar to stay at the water interface. | Esterification removes the O–H, leaving Compound 2 too nonpolar for the surface. |
| p_cpx2_1_q4 | choices[1] | Esterification gives Compound 2 a negative charge, so it is repelled by the phosphate groups at the surface. | Esterification gives Compound 2 a negative charge, repelled by the surface phosphates. |
| p_cpx2_1_q4 | choices[2] | Esterification removes the C5=C6 double bond, so the ring system becomes flexible enough to pack in the core. | Esterification removes the C5=C6 double bond, making the rings flexible. |
| p_cpx2_1_q4 | choices[3] | Esterification makes Compound 2 smaller than Compound 1, so it fits between the triacylglycerols of the core. | Esterification makes Compound 2 smaller, so it fits between core triacylglycerols. |
| p_cpx3_4_q4 | choices[0] | Cleavage of the C3–H bond occurs in the rate-determining step, and the reaction is catalyzed by base. | C3–H cleavage is in the rate-determining step; the reaction is base-catalyzed. |
| p_cpx3_4_q4 | choices[1] | Cleavage of the C3–H bond occurs in the rate-determining step, and the reaction is catalyzed by acid. | C3–H cleavage is in the rate-determining step; the reaction is acid-catalyzed. |
| p_cpx3_4_q4 | choices[2] | Cleavage of the C3–H bond occurs after the rate-determining step, and the reaction is catalyzed by base. | C3–H cleavage follows the rate-determining step; the reaction is base-catalyzed. |
| p_cpx3_4_q4 | choices[3] | Cleavage of the C3–H bond occurs after the rate-determining step, and the reaction is catalyzed by acid. | C3–H cleavage follows the rate-determining step; the reaction is acid-catalyzed. |
| p_cpx4_1_q3 | choices[0] | It causes resistance mainly by raising the kinase's affinity for ATP, because KM for ATP fell 20-fold while Ki rose only 2-fold. | It raises ATP affinity: KM fell 20-fold while Ki rose only 2-fold. |
| p_cpx4_1_q3 | choices[1] | It causes resistance mainly by preventing Compound 1 from binding, because Ki rose more than KM for ATP fell. | It blocks Compound 1 binding: Ki rose more than KM fell. |
| p_cpx4_1_q3 | choices[2] | It causes resistance mainly by speeding up catalysis, because kcat doubled while Ki was unchanged. | It speeds catalysis: kcat doubled while Ki was unchanged. |
| p_cpx4_1_q3 | choices[3] | It does not cause resistance, because Ki for Compound 1 remains in the low nanomolar range. | It causes no resistance: Ki remains in the low nanomolar range. |
| p_cpx4_1_q3 | exp | Compare the L858R row with the L858R/T790M row. **KM for ATP fell from 100 to 5.0 μM (20-fold)**, so the double mutant binds ATP much more tightly. **Ki rose only from 2.0 to 4.0 nM (2-fold)**, so Compound 1 still binds well. Because Compound 1 is competitive with ATP, a lower KM means the ~1 mM ATP in cells outcompetes the drug far more effectively (Equation 1: the IC50 rises from about 22 nM to 800 nM). Restored ATP affinity is the main cause of resistance.  Ki changed less than KM, not more, so "preventing binding" contradicts the table. kcat did double (0.60 → 1.2 s⁻¹), but Ki was not unchanged, and for a competitive inhibitor the IC50 doesn't depend on kcat at all. A low-nanomolar Ki ignores ATP competition; the cellular IC50 is what matters. | Compare the L858R row with the L858R/T790M row. **KM for ATP fell from 100 to 5.0 μM (20-fold)**, so the double mutant binds ATP much more tightly. **Ki rose only from 2.0 to 4.0 nM (2-fold)**, so Compound 1 still binds well. Because Compound 1 is competitive with ATP, a lower KM means the ~1 mM ATP in cells outcompetes the drug far more effectively (Equation 1: the IC50 rises from about 22 nM to 800 nM). Restored ATP affinity is the main cause of resistance.  Ki changed less than KM, not more, so "blocks Compound 1 binding" contradicts the table. kcat did double (0.60 → 1.2 s⁻¹), but Ki was not unchanged, and for a competitive inhibitor the IC50 doesn't depend on kcat at all. A low-nanomolar Ki ignores ATP competition; the cellular IC50 is what matters. |
| p_cpx4_4_q1 | choices[0] | Its only C=O group is part of a carboxylic acid, whose carbonyl carbon is made less electrophilic by resonance with the adjacent OH oxygen. | Its only C=O, in a carboxylic acid, is less electrophilic by resonance. |
| p_cpx4_4_q1 | choices[1] | Its secondary alcohol is oxidized by 2,4-DNP, which consumes the reagent before a precipitate can form. | Its secondary alcohol is oxidized by 2,4-DNP, consuming the reagent. |
| p_cpx4_4_q1 | choices[2] | Its C=O group is too sterically hindered by the neighboring methyl group for 2,4-DNP to attack. | Its C=O is too hindered by the neighboring methyl group for attack. |
| p_cpx4_4_q1 | choices[3] | It has no hydrogen atoms on the carbon next to its C=O group, so it cannot form a hydrazone. | It has no α-hydrogens, so it cannot form a hydrazone. |
| p_cpx5_1_q3 | choices[0] | The membrane is slightly permeable to Na⁺, and the inward Na⁺ leak pulls the potential toward the positive Na⁺ equilibrium potential. | A slight Na⁺ leak pulls the potential toward the Na⁺ equilibrium potential. |
| p_cpx5_1_q3 | choices[1] | The membrane is slightly permeable to Cl⁻, and the Cl⁻ leak pulls the potential below the K⁺ equilibrium potential. | A slight Cl⁻ leak pulls the potential below the K⁺ equilibrium potential. |
| p_cpx5_1_q3 | choices[2] | The K⁺ equilibrium potential becomes less negative as [K⁺]out decreases, so the cell follows it. | The K⁺ equilibrium potential becomes less negative as [K⁺]out falls. |
| p_cpx5_1_q3 | choices[3] | The membrane is impermeable to K⁺ at every concentration tested, so the potential does not depend on [K⁺]out. | The membrane is K⁺-impermeable, so the potential does not depend on [K⁺]out. |
| p_cpx5_2_q4 | choices[0] | Its electrons can occupy only certain energy levels, so only certain gaps exist. | Its electrons occupy only certain energy levels, so only certain gaps exist. |
| p_cpx5_2_q4 | choices[1] | Its nucleus emits the light, and each kind of nucleus has one fixed energy level. | Its nucleus emits the light from one fixed energy level. |
| p_cpx5_2_q4 | choices[2] | The flame gives every atom the same energy, and each atom emits that energy. | The flame gives every atom the same energy, which each atom emits. |
| p_cpx5_3_q4 | choices[0] | sp², with the lone pair in an sp² orbital in the plane of the ring, not part of the aromatic π system | sp², lone pair in an in-plane sp² orbital, outside the π system |
| p_cpx5_3_q4 | choices[1] | sp², with the lone pair in a p orbital that is part of the aromatic π system | sp², lone pair in a p orbital, part of the aromatic π system |
| p_cpx5_3_q4 | choices[2] | sp³, with the lone pair in an sp³ orbital, like the pyrrolidine nitrogen | sp³, lone pair in an sp³ orbital, like the pyrrolidine nitrogen |
| p_cpx5_3_q4 | choices[3] | sp, with the lone pair in an sp orbital pointing away from the ring | sp, lone pair in an sp orbital pointing away from the ring |
| p_cpx5_5_q4 | choices[0] | The energy is used to overcome hydrogen bonds as liquid water becomes vapor, rather than to raise the temperature. | The energy breaks hydrogen bonds as water vaporizes instead of raising temperature. |
| p_cpx5_5_q4 | choices[1] | Boiling is exothermic, so the heat it releases balances the energy delivered by the current. | Boiling is exothermic, and its heat balances the energy delivered. |
| p_cpx5_5_q4 | choices[2] | Steam has a much higher specific heat than liquid water, so more energy is needed per degree. | Steam has a much higher specific heat than liquid water. |
| p_cpx5_5_q4 | choices[3] | Water's heat of vaporization is smaller than its specific heat, so all of the energy is lost as steam escapes. | Heat of vaporization is less than specific heat, so energy escapes as steam. |
| p_cpx6_5_q3 | choices[0] | Resonance donation from the –OH raises electron density ortho and para to it, and the para position is taken. | –OH resonance enriches the ortho and para positions, and para is taken. |
| p_cpx6_5_q3 | choices[1] | Resonance donation from the –OH raises electron density meta to it, and C-3 is meta to the –OH group. | –OH resonance enriches the meta positions, and C-3 is meta to –OH. |
| p_cpx6_5_q3 | choices[2] | Inductive withdrawal by the –OH lowers electron density ortho to it, so iodide attacks there as a nucleophile. | –OH induction depletes ortho carbons, so nucleophilic iodide attacks there. |
| p_cpx6_5_q3 | choices[3] | The alkyl side chain is a stronger ring activator than the –OH group, and C-3 is ortho to the side chain. | The side chain is the stronger activator, and C-3 is ortho to it. |

### cp-pool.js (25 items, 69 edits)

| Item | Field | Before | After |
|---|---|---|---|
| cp_half_6_sa2 | choices[0] | a racemic mixture, because hydride adds equally to both faces of the planar carbonyl carbon | a racemic mixture, because hydride attacks both planar faces equally. |
| cp_half_6_sa2 | choices[1] | only the (R) enantiomer, because hydride adds to the less hindered face of the carbonyl | only the (R) enantiomer, because hydride adds to the less hindered face. |
| cp_half_6_sa2 | choices[2] | only the (S) enantiomer, because the ethyl group directs hydride to one face | only the (S) enantiomer, because the ethyl group directs the hydride. |
| cp_half_6_sa2 | choices[3] | a meso compound, because the product has an internal mirror plane | a meso compound, because the product has an internal mirror plane. |
| p_cpp1_4_q1 | q | Which structure is Compound 2? | Which of the following structures is Compound 2? |
| p_cpp2_4_q1 | q | Which structure is Compound 3? | Which of the following structures is Compound 3? |
| p_cpp4_6_q4 | q | Which structure is oxamate? | Which of the following structures is oxamate? |
| cp_half_5_sa8 | q | Sucrose is a non-reducing sugar because: | Sucrose is classified as a non-reducing sugar because: |
| cp_half_4_sa4 | q | Use the following thermochemical equations to find ΔH° for the formation of carbon monoxide, C(s) + ½O₂(g) → CO(g). C(s) + O₂(g) → CO₂(g)   ΔH° = −394 kJ 2CO(g) + O₂(g) → 2CO₂(g)   ΔH° = −566 kJ | What is ΔH° for the formation of carbon monoxide, C(s) + ½O₂(g) → CO(g), from the following thermochemical equations? C(s) + O₂(g) → CO₂(g)   ΔH° = −394 kJ 2CO(g) + O₂(g) → 2CO₂(g)   ΔH° = −566 kJ |
| cp_half_5_sa6 | q | Use the average bond enthalpies H–H 436 kJ/mol, Cl–Cl 242 kJ/mol and H–Cl 431 kJ/mol to estimate ΔH for the reaction H₂(g) + Cl₂(g) → 2HCl(g). | Based on the average bond enthalpies H–H 436 kJ/mol, Cl–Cl 242 kJ/mol and H–Cl 431 kJ/mol, what is the estimated ΔH for the reaction H₂(g) + Cl₂(g) → 2HCl(g)? |
| cp_half_3_sa5 | q | A sample of gas in a cylinder is taken from the same initial state to the same final state (same pressure, volume and temperature at the start and at the end) by two different routes. In one route it is heated at constant volume and then allowed to expand; in the other it expands first and is then heated. Which quantity can differ between the two routes? | A gas in a cylinder goes from the same initial state to the same final state (same P, V and T at start and end) by two routes. In one, it is heated at constant volume, then expands; in the other, it expands, then is heated. Which quantity can differ between the routes? |
| cp_half_4_sa8 | q | The optical fibers in a flexible endoscope have a glass core (n = 1.50) surrounded by a cladding (n = 1.20). Light traveling along the core strikes the core–cladding boundary. What is the smallest angle of incidence, measured from the normal, at which the light is totally internally reflected? (sin 12° ≈ 0.21, sin 37° ≈ 0.60, sin 42° ≈ 0.67, sin 53° ≈ 0.80) | Endoscope optical fibers have a glass core (n = 1.50) surrounded by cladding (n = 1.20). Light in the core strikes the core–cladding boundary. What is the smallest angle of incidence, from the normal, that gives total internal reflection? (sin 12° ≈ 0.21, sin 37° ≈ 0.60, sin 42° ≈ 0.67, sin 53° ≈ 0.80) |
| cp_half_5_sa2 | q | A diver releases a sealed, flexible bag holding 2.0 L of air at a depth of 20 m in the sea. Each 10 m of water adds about 1.0 atm of pressure, and the pressure at the surface is 1.0 atm. If the temperature stays constant, what is the volume of the bag when it reaches the surface? | A diver releases a sealed, flexible bag holding 2.0 L of air at a depth of 20 m. Each 10 m of water adds about 1.0 atm, and the pressure at the surface is 1.0 atm. At constant temperature, what is the bag's volume at the surface? |
| cp_half_3_sa6 | q | For the reaction A + 2B → C, the following initial rates were measured. Trial 1: [A] = 0.10 M, [B] = 0.10 M, rate = 2.0 × 10⁻⁴ M/s Trial 2: [A] = 0.20 M, [B] = 0.10 M, rate = 8.0 × 10⁻⁴ M/s Trial 3: [A] = 0.10 M, [B] = 0.30 M, rate = 6.0 × 10⁻⁴ M/s Which rate law fits these data? | For the reaction A + 2B → C, the following initial rates were measured. Trial 1: 0.10 M A, 0.10 M B, 2.0 × 10⁻⁴ M/s Trial 2: 0.20 M A, 0.10 M B, 8.0 × 10⁻⁴ M/s Trial 3: 0.10 M A, 0.30 M B, 6.0 × 10⁻⁴ M/s Which rate law fits these data? |
| cp_half_3_sa4 | choices[2] | 40 N, directed opposite the push | Exactly 40 N, directed opposite the push |
| cp_half_3_sa4 | choices[3] | 0 N, because the bed is not moving | Zero, because the bed is not moving |
| cp_half_3_sa4 | exp | The bed stays at rest, so its acceleration is zero and the **net horizontal force is zero** (Newton's first law). The only horizontal forces are the push and static friction, so friction must be **40 N, opposite the push**. Static friction adjusts to whatever is needed to prevent sliding, up to a maximum of μsN.  **0 N** would leave the 40 N push unbalanced, and the bed would accelerate. **μs × weight** (μsN on a level floor) is the **maximum** static friction, reached only when the bed is about to slide; the actual value can be smaller. **More than 40 N** would give a net force opposite the push, and the bed would accelerate toward the nurse. | The bed stays at rest, so its acceleration is zero and the **net horizontal force is zero** (Newton's first law). The only horizontal forces are the push and static friction, so friction must be **40 N, opposite the push**. Static friction adjusts to whatever is needed to prevent sliding, up to a maximum of μsN.  **Zero** would leave the 40 N push unbalanced, and the bed would accelerate. **μs × weight** (μsN on a level floor) is the **maximum** static friction, reached only when the bed is about to slide; the actual value can be smaller. **More than 40 N** would give a net force opposite the push, and the bed would accelerate toward the nurse. |
| cp_half_2_sa5 | choices[0] | Pipet 10 mL of stock into a 200-mL volumetric flask and add water to the mark. | Dilute 10 mL of stock to 200 mL in a volumetric flask. |
| cp_half_2_sa5 | choices[1] | Pipet 10 mL of stock into a beaker containing 200 mL of water. | Add 10 mL of stock to a beaker with 200 mL of water. |
| cp_half_2_sa5 | choices[2] | Pipet 100 mL of stock into a 200-mL volumetric flask and add water to the mark. | Dilute 100 mL of stock to 200 mL in a volumetric flask. |
| cp_half_2_sa5 | choices[3] | Pipet 1.0 mL of stock into a 200-mL volumetric flask and add water to the mark. | Dilute 1.0 mL of stock to 200 mL in a volumetric flask. |
| p_cpp3_3_q2 | choices[0] | It would increase, because C₂O₄²⁻ would be protonated, lowering the free C₂O₄²⁻ concentration. | It would increase, because protonation lowers the free C₂O₄²⁻ concentration. |
| p_cpp3_3_q2 | choices[1] | It would increase, because H⁺ would form a complex with Ca²⁺, lowering the free Ca²⁺ concentration. | It would increase, because H⁺ complexes Ca²⁺, lowering free Ca²⁺. |
| p_cpp3_3_q2 | choices[2] | It would decrease, because H⁺ would act as a common ion with the dissolved salt. | It would decrease, because H⁺ acts as a common ion. |
| p_cpp3_3_q2 | choices[3] | It would decrease, because HC₂O₄⁻ would bind Ca²⁺ more tightly than C₂O₄²⁻ does. | It would decrease, because HC₂O₄⁻ binds Ca²⁺ more tightly than C₂O₄²⁻. |
| cp_half_3_sa9 | choices[0] | It is shorter than a typical C–N single bond, and rotation about it is restricted. | It is shorter than a C–N single bond, with restricted rotation. |
| cp_half_3_sa9 | choices[1] | It is a typical C–N single bond, and the nitrogen is sp³ hybridized. | It is a typical C–N single bond, with an sp³ nitrogen. |
| cp_half_3_sa9 | choices[2] | It is a full C=N double bond, and the carbonyl oxygen carries no negative charge. | It is a full C=N double bond, with an uncharged oxygen. |
| cp_half_3_sa9 | choices[3] | It is longer than a typical C–N single bond, because the nitrogen lone pair repels the carbonyl oxygen. | It is longer than a C–N single bond, from lone pair–oxygen repulsion. |
| cp_half_3_sa10 | choices[0] | It is an oxidation, because each sulfur loses a hydrogen and the sulfurs bond to each other. | An oxidation, because each sulfur loses H and the sulfurs bond. |
| cp_half_3_sa10 | choices[1] | It is a reduction, because each sulfur gains an electron from the other. | A reduction, because each sulfur gains an electron from the other. |
| cp_half_3_sa10 | choices[2] | It is a hydrolysis, because water is added across the two thiol groups. | A hydrolysis, because water is added across the two thiols. |
| cp_half_3_sa10 | choices[3] | It is a dehydration, because water is removed from the two thiol groups. | A dehydration, because water is removed from the two thiols. |
| p_cpp5_5_q4 | choices[0] | Current efficiency decreases as current increases, because more of the charge reduces water. | Current efficiency falls as current rises, because more charge reduces water. |
| p_cpp5_5_q4 | choices[1] | Current efficiency decreases as current increases, because less charge is passed in the shorter runs. | Current efficiency falls as current rises, because shorter runs pass less charge. |
| p_cpp5_5_q4 | choices[2] | Current efficiency is the same in every run, because the same charge is passed in every run. | Current efficiency is constant, because every run passes the same charge. |
| p_cpp5_5_q4 | choices[3] | Current efficiency increases as current increases, because more Ag⁺ is reduced each second. | Current efficiency rises with current, because more Ag⁺ is reduced each second. |
| cp_half_5_sa10 | choices[0] | Each ethylene glycol molecule has two OH groups, so it forms more hydrogen bonds with its neighbors. | Ethylene glycol has two OH groups, so it forms more hydrogen bonds. |
| cp_half_5_sa10 | choices[1] | Ethylene glycol has a larger molar mass, so its London dispersion forces are much stronger. | Ethylene glycol is heavier, so its London dispersion forces are much stronger. |
| cp_half_5_sa10 | choices[2] | Ethylene glycol has more C–H bonds, so it forms more hydrogen bonds with its neighbors. | Ethylene glycol has more C–H bonds, so it forms more hydrogen bonds. |
| cp_half_5_sa10 | choices[3] | Ethylene glycol is ionic in the liquid state, so its molecules are held together by ion–ion forces. | Ethylene glycol is ionic as a liquid, held together by ion–ion forces. |
| p_cpp6_3_q2b | choices[0] | Read room air at the circuit's pressure, since the current tracks P(O₂) = FiO₂ × total pressure | Read room air at circuit pressure, since current tracks O₂ partial pressure |
| p_cpp6_3_q2b | choices[1] | Read room air at 27°C, since the current tracks only the temperature of the gas | Read room air at 27°C, since current tracks only gas temperature |
| p_cpp6_3_q2b | choices[2] | Replace the lead electrode, since the current tracks only how much lead remains | Replace the lead electrode, since current tracks only remaining lead |
| p_cpp6_3_q2b | choices[3] | Raise the tidal volume, since the current tracks the gas volume delivered per breath | Raise the tidal volume, since current tracks gas volume per breath |
| p_cpp1_1_q1 | choices[0] | It binds equally well to the free enzyme and to the enzyme–substrate complex. | It binds the free enzyme and the enzyme–substrate complex equally well. |
| p_cpp1_1_q1 | choices[1] | It binds only to the free enzyme, at the site where xanthine binds. | It binds only the free enzyme, at the xanthine site. |
| p_cpp1_1_q1 | choices[2] | It binds only to the enzyme–substrate complex, after xanthine has bound. | It binds only the enzyme–substrate complex, after xanthine binds. |
| p_cpp1_1_q1 | choices[3] | It is a substrate that is oxidized by XO faster than xanthine is. | It is a substrate that XO oxidizes faster than xanthine. |
| p_cpp4_1_q2 | choices[0] | Compound 2 has a hemiacetal carbon that can open to an aldehyde, which condenses with lysine amino groups. | Compound 2's hemiacetal opens to an aldehyde that condenses with lysine. |
| p_cpp4_1_q2 | choices[1] | Compound 2 has more hydroxyl groups than Compound 1, so it hydrogen-bonds more tightly to lysine side chains. | Compound 2 has more OH groups, so it hydrogen-bonds lysine more tightly. |
| p_cpp4_1_q2 | choices[2] | Compound 2 contains a β-glycosidic bond, which lysine side chains hydrolyze during storage. | Compound 2's β-glycosidic bond is hydrolyzed by lysine side chains in storage. |
| p_cpp4_1_q2 | choices[3] | Compound 2 is a ketose, and its ketone carbonyl reacts with amines faster than an aldehyde does. | Compound 2's ketone reacts with amines faster than an aldehyde would. |
| p_cpp4_4_q2 | choices[0] | No; E°cell for oxidation of Fe²⁺ by I₂ is −0.23 V, so the reaction is not spontaneous. | No; E°cell for I₂ oxidizing Fe²⁺ is −0.23 V (nonspontaneous). |
| p_cpp4_4_q2 | choices[1] | Yes; E°cell for oxidation of Fe²⁺ by I₂ is +0.23 V, so Fe²⁺ also consumes I₂. | Yes; E°cell for I₂ oxidizing Fe²⁺ is +0.23 V (spontaneous). |
| p_cpp4_4_q2 | choices[2] | Yes; E°cell for oxidation of Fe²⁺ by I₂ is +1.31 V, so Fe²⁺ also consumes I₂. | Yes; E°cell for I₂ oxidizing Fe²⁺ is +1.31 V (spontaneous). |
| p_cpp4_4_q2 | choices[3] | No; Fe²⁺ cannot be oxidized because iron is already in its highest common oxidation state. | No; Fe²⁺ is already in iron's highest common oxidation state. |
| cp_half_4_sa2 | choices[0] | the 3′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group. | the 3′ carbon of one deoxyribose to the 5′ carbon of the next. |
| cp_half_4_sa2 | choices[1] | the 2′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group. | the 2′ carbon of one deoxyribose to the 5′ carbon of the next. |
| cp_half_4_sa2 | choices[2] | the 1′ carbon of one deoxyribose to the 5′ carbon of the next, through a phosphate group. | the 1′ carbon of one deoxyribose to the 5′ carbon of the next. |
| cp_half_4_sa2 | choices[3] | the base of one nucleotide to the deoxyribose of the next, through a phosphate group. | the base of one nucleotide to the deoxyribose of the next. |
| p_cpp5_1_q4 | choices[0] | Fewer Na⁺ ions are present to shield the negatively charged phosphate groups, so repulsion across the stem is greater. | Fewer Na⁺ ions shield the negative phosphates, increasing repulsion across the stem. |
| p_cpp5_1_q4 | choices[1] | Fewer Na⁺ ions are present to hydrogen bond to the bases, so the base pairs are weaker. | Fewer Na⁺ ions hydrogen-bond to the bases, so base pairs are weaker. |
| p_cpp5_1_q4 | choices[2] | More water molecules are free to hydrate the bases, so base stacking becomes stronger. | More free water hydrates the bases, so base stacking becomes stronger. |
| p_cpp5_1_q4 | choices[3] | The solution has a lower boiling point, so the stem reaches its melting point sooner. | The solution boils at a lower temperature, so the stem melts sooner. |
| cp_half_5_sa7 | choices[0] | Measure initial rates over a range of substrate concentrations with and without the drug, then compare KM and Vmax. | Vary [S] with and without the drug, then compare KM and Vmax. |
| cp_half_5_sa7 | choices[1] | Measure the initial rate at one low substrate concentration with and without the drug, then compare the rates. | Use one low [S] with and without the drug, then compare rates. |
| cp_half_5_sa7 | choices[2] | Measure initial rates at several enzyme concentrations with the drug, then compare the rates. | Vary enzyme concentration with the drug, then compare the rates. |
| cp_half_5_sa7 | choices[3] | Measure the equilibrium constant of the reaction with and without the drug, then compare the constants. | Measure Keq with and without the drug, then compare the constants. |

### cp-diagnostic.js (16 items, 59 edits)

| Item | Field | Before | After |
|---|---|---|---|
| p_cpd_7_q5 | choices[0] | sp² hybridized, and a weaker base than the nitrogen in Compound 1 | sp² hybridized, and a weaker base than the nitrogen in Compound 1. |
| p_cpd_7_q5 | choices[1] | sp² hybridized, and a stronger base than the nitrogen in Compound 1 | sp² hybridized, and a stronger base than the nitrogen in Compound 1. |
| p_cpd_7_q5 | choices[2] | sp³ hybridized, and a weaker base than the nitrogen in Compound 1 | sp³ hybridized, and a weaker base than the nitrogen in Compound 1. |
| p_cpd_7_q5 | choices[3] | sp³ hybridized, and a stronger base than the nitrogen in Compound 1 | sp³ hybridized, and a stronger base than the nitrogen in Compound 1. |
| p_cpd_2_q5 | choices[0] | Grow cells with glucose in which all six carbons are ¹³C, and use mass spectrometry to find the fraction of serine that is 3 mass units heavier than normal | Feed fully ¹³C-labeled glucose; find the serine fraction 3 mass units heavier. |
| p_cpd_2_q5 | choices[1] | Grow cells with glucose in which all six carbons are ¹³C, and use mass spectrometry to find the fraction of serine that is 6 mass units heavier than normal | Feed fully ¹³C-labeled glucose; find the serine fraction 6 mass units heavier. |
| p_cpd_2_q5 | choices[2] | Grow cells with ¹³C-labeled serine, and use mass spectrometry to find the fraction of Compound 1 that carries the label | Feed ¹³C-labeled serine; find the fraction of Compound 1 that is labeled. |
| p_cpd_2_q5 | choices[3] | Grow cells with ¹⁴C-labeled glucose, and measure the total radioactivity of the cells | Feed ¹⁴C-labeled glucose; measure the total radioactivity of the cells. |
| p_cpd_3_q4 | choices[0] | The WE43 stent acts as the anode and corrodes faster than it would alone. | WE43 acts as the anode and corrodes faster than it would alone. |
| p_cpd_3_q4 | choices[1] | The steel stent acts as the anode and corrodes faster than it would alone. | Steel acts as the anode and corrodes faster than it would alone. |
| p_cpd_3_q4 | choices[2] | The WE43 stent corrodes more slowly, because the steel supplies it with electrons. | WE43 corrodes more slowly, because the steel supplies it with electrons. |
| p_cpd_3_q4 | choices[3] | Neither corrosion rate changes, because both stents are metals in the same fluid. | Neither corrosion rate changes, because both are metals in the same fluid. |
| p_cpd_4_q4 | choices[0] | Repeat the titration at several temperatures and compare the pH at the half-equivalence point. | Titrate at several temperatures; compare the pH at half-equivalence. |
| p_cpd_4_q4 | choices[1] | Repeat the titration with several concentrations of Compound 1 and compare the pH at the half-equivalence point. | Titrate several concentrations of Compound 1; compare the pH at half-equivalence. |
| p_cpd_4_q4 | choices[2] | Repeat the titration at several temperatures and compare the volume of NaOH needed to reach the equivalence point. | Titrate at several temperatures; compare the NaOH volume needed for equivalence. |
| p_cpd_4_q4 | choices[3] | Repeat the titration with 0.20 M NaOH and compare the pH at the equivalence point. | Titrate with 0.20 M NaOH; compare the pH at equivalence. |
| p_cpd_7_q3 | choices[0] | NaOH is a strong enough base to convert unreacted Compound 2 into a water-soluble ion, and NaHCO₃ is not. | NaOH, unlike NaHCO₃, converts unreacted Compound 2 to a water-soluble ion. |
| p_cpd_7_q3 | choices[1] | NaOH is a strong enough base to convert Compound 3 into a water-soluble ion, and NaHCO₃ is not. | NaOH, unlike NaHCO₃, converts Compound 3 to a water-soluble ion. |
| p_cpd_7_q3 | choices[2] | NaHCO₃ would convert unreacted Compound 2 into a water-soluble ion, but it would also hydrolyze Compound 3. | NaHCO₃ would ionize unreacted Compound 2 but also hydrolyze Compound 3. |
| p_cpd_7_q3 | choices[3] | NaHCO₃ would react with leftover bromoethane, but NaOH removes K₂CO₃ that remains in the organic layer. | NaHCO₃ would react with bromoethane, and NaOH removes leftover K₂CO₃. |
| p_cpd_9_q1 | choices[0] | Fluorine is less polarizable than chlorine, so Compound 1 has weaker London dispersion forces. | F is less polarizable than Cl, so London dispersion forces are weaker. |
| p_cpd_9_q1 | choices[1] | Fluorine is less electronegative than chlorine, so Compound 1 forms weaker hydrogen bonds. | F is less electronegative than Cl, so hydrogen bonds are weaker. |
| p_cpd_9_q1 | choices[2] | The C–F bond is stronger than the C–Cl bond, so Compound 1 molecules separate more easily. | The C–F bond is stronger, so the molecules separate more easily. |
| p_cpd_9_q1 | choices[3] | Fluorine is more electronegative than chlorine, so Compound 1 has stronger dipole–dipole forces. | F is more electronegative than Cl, so dipole–dipole forces are stronger. |
| p_cpd_9_q4 | choices[0] | Surrounding the vaporizing chamber with a thick block of metal with a high specific heat and thermal conductivity | Encasing the chamber in thick metal of high specific heat and conductivity |
| p_cpd_9_q4 | choices[1] | Surrounding the vaporizing chamber with thermal insulation to block heat exchange with the room | Surrounding the chamber with insulation to block heat exchange with the room |
| p_cpd_9_q4 | choices[2] | Sealing the vaporizing chamber so that it stays at a higher total pressure | Sealing the chamber so that it stays at a higher total pressure |
| p_cpd_9_q4 | choices[3] | Increasing the fraction of the fresh gas flow that passes through the vaporizing chamber | Passing a larger fraction of the fresh gas flow through the chamber |
| cp_diag_sa4 | choices[0] | 1.5 m from the lens, on the side opposite the object; real and inverted | 1.5 m, on the side opposite the object; real and inverted |
| cp_diag_sa4 | choices[1] | 0.30 m from the lens, on the side opposite the object; real and inverted | 0.30 m, on the side opposite the object; real and inverted |
| cp_diag_sa4 | choices[2] | 1.5 m from the lens, on the same side as the object; virtual and upright | 1.5 m, on the same side as the object; virtual and upright |
| cp_diag_sa4 | choices[3] | 0.25 m from the lens, on the side opposite the object; real and inverted | 0.25 m, on the side opposite the object; real and inverted |
| p_cpd_3_q1 | choices[0] | has lost both of its 3s electrons, so its outermost electrons are in the n = 2 shell. | has lost its 3s electrons, leaving its outermost electrons in n = 2. |
| p_cpd_3_q1 | choices[1] | has gained two protons, which pull the electron cloud closer to the nucleus. | has gained two protons, which pull the electrons closer to the nucleus. |
| p_cpd_3_q1 | choices[2] | has two more electrons than Mg, which increases the attraction to the nucleus. | has two more electrons than Mg, increasing their attraction to the nucleus. |
| p_cpd_6_q4 | choices[0] | can return to more than one vibrational level of the ground electronic state. | can return to more than one vibrational level of the ground state. |
| p_cpd_6_q4 | choices[1] | can be raised to two different excited electronic states by the same photon. | can be raised to two excited electronic states by the same photon. |
| p_cpd_6_q4 | choices[2] | loses part of each 635 nm photon's energy when that photon refracts in tissue. | loses part of each 635 nm photon's energy by refraction in tissue. |
| p_cpd_s1_q6 | choices[0] | binds ADH much more tightly, so it outcompetes methanol for the active site. | binds ADH more tightly, so it outcompetes methanol for the active site. |
| p_cpd_s1_q6 | choices[2] | is converted to product more slowly than methanol, so it occupies ADH longer. | is turned over more slowly than methanol, so it occupies ADH longer. |
| p_cpd_s1_q6 | choices[3] | lowers the KM of ADH for methanol, so less formic acid is produced. | lowers the KM of ADH for methanol, so less formic acid forms. |
| p_cpd_s1_q6 | exp | Ethanol and methanol compete for the same active site. Ethanol's **KM is 40 times lower** (0.50 vs 20 mM), so at similar concentrations ADH is mostly occupied by ethanol. Methanol is oxidized only slowly, giving the body time to excrete it unchanged.  Ethanol's kcat (3.0 s⁻¹) is actually *higher* than methanol's (0.60 s⁻¹), so "converted more slowly" contradicts the table. Nothing in the data shows ethanol changing methanol's own constants. Making methanol clear faster through ADH would make the poisoning worse, not better. | Ethanol and methanol compete for the same active site. Ethanol's **KM is 40 times lower** (0.50 vs 20 mM), so at similar concentrations ADH is mostly occupied by ethanol. Methanol is oxidized only slowly, giving the body time to excrete it unchanged.  Ethanol's kcat (3.0 s⁻¹) is actually *higher* than methanol's (0.60 s⁻¹), so "turned over more slowly" contradicts the table. Nothing in the data shows ethanol changing methanol's own constants. Making methanol clear faster through ADH would make the poisoning worse, not better. |
| cp_diag_sa15 | choices[0] | The ring opens to the open-chain aldehyde and recloses, forming some β-D-glucopyranose, a diastereomer with a different specific rotation. | Ring opening and closing forms β-D-glucopyranose, which has a different specific rotation. |
| cp_diag_sa15 | choices[1] | The glucose slowly racemizes to L-glucose, its enantiomer, which rotates light in the opposite direction. | Glucose slowly racemizes to L-glucose, which rotates light the opposite way. |
| cp_diag_sa15 | choices[2] | Water hydrolyzes the glycosidic bond, releasing free glucose with a different specific rotation. | Water hydrolyzes a glycosidic bond, releasing glucose with a different specific rotation. |
| cp_diag_sa3 | choices[0] | The average kinetic energy of the molecules | Average molecular kinetic energy |
| cp_diag_sa3 | choices[1] | The root-mean-square speed of the molecules | Root-mean-square molecular speed |
| cp_diag_sa3 | choices[2] | The number of moles of gas in the container | Moles of gas |
| cp_diag_sa3 | choices[3] | The density of the gas in the container | Gas density |
| cp_diag_sa13 | choices[0] | five atoms, one of which is oxygen. | five atoms, one oxygen. |
| cp_diag_sa13 | choices[1] | four atoms, one of which is oxygen. | four atoms, one oxygen. |
| cp_diag_sa13 | choices[2] | six atoms, two of which are oxygen. | six atoms, two oxygens. |
| cp_diag_sa13 | choices[3] | five atoms, two of which are oxygen. | five atoms, two oxygens. |
| p_cpd_5_q4 | choices[0] | It would increase by a factor of 4. | It increases 4-fold. |
| p_cpd_5_q4 | choices[1] | It would increase by a factor of 16. | It increases 16-fold. |
| p_cpd_5_q4 | choices[2] | It would decrease by a factor of 4. | It decreases 4-fold. |
| p_cpd_5_q4 | choices[3] | It would decrease by a factor of 16. | It decreases 16-fold. |
| p_cpd_7_q2 | choices[2] | Replacing acetone with ethanol as the solvent | Using ethanol as solvent |
| p_cpd_7_q2 | choices[3] | Running the reaction at 25°C instead of at reflux | Cooling to 25°C from reflux |

### qb-aamc-chem.js (62 items, 209 edits)

| Item | Field | Before | After |
|---|---|---|---|
| aamc-chem-qpack:Q1b | choices[0] | its linear shape makes the two bond dipoles cancel | its linear shape makes the two bond dipoles cancel. |
| aamc-chem-qpack:Q1b | choices[1] | carbon and oxygen have nearly equal electronegativities | carbon and oxygen have nearly equal electronegativities. |
| aamc-chem-qpack:Q1b | choices[2] | its bent shape makes the two bond dipoles cancel | its bent shape makes the two bond dipoles cancel. |
| aamc-chem-qpack:Q1b | choices[3] | its central carbon carries two lone pairs | its central carbon carries two lone pairs. |
| aamc-chem-qpack:Q4b | choices[0] | loses electrons and is oxidized | loses electrons and is oxidized. |
| aamc-chem-qpack:Q4b | choices[1] | gains electrons and is reduced | gains electrons and is reduced. |
| aamc-chem-qpack:Q4b | choices[2] | gains electrons and is oxidized | gains electrons and is oxidized. |
| aamc-chem-qpack:Q4b | choices[3] | loses electrons and is reduced | loses electrons and is reduced. |
| aamc-chem-qpack:Q8b | choices[0] | boiling points | boiling points. |
| aamc-chem-qpack:Q8b | choices[1] | direction of optical rotation | direction of optical rotation. |
| aamc-chem-qpack:Q8b | choices[2] | molecular formulas | molecular formulas. |
| aamc-chem-qpack:Q8b | choices[3] | solubility in water | solubility in water. |
| aamc-chem-qpack:Q9 | choices[0] | decrease, because molecules escape the liquid more easily | decrease, because molecules escape the liquid more easily. |
| aamc-chem-qpack:Q9 | choices[1] | stay the same, because boiling point is an intrinsic property | stay the same, because boiling point is an intrinsic property. |
| aamc-chem-qpack:Q9 | choices[2] | increase, because a higher vapor pressure is now needed to boil | increase, because a higher vapor pressure is now needed to boil. |
| aamc-chem-qpack:Q9 | choices[3] | decrease, because vapor is removed from the flask more quickly | decrease, because vapor is removed from the flask more quickly. |
| aamc-chem-qpack:Q9b | choices[0] | has a high boiling point and decomposes near it at 1 atm | has a high boiling point and decomposes near it at 1 atm. |
| aamc-chem-qpack:Q9b | choices[1] | boils within a few degrees of a contaminant | boils within a few degrees of a contaminant. |
| aamc-chem-qpack:Q9b | choices[2] | forms a separate layer from water | forms a separate layer from water. |
| aamc-chem-qpack:Q9b | choices[3] | boils well below room temperature at 1 atm | boils well below room temperature at 1 atm. |
| aamc-chem-qpack:Q11 | choices[0] | sodium ions react with water to form NaOH | sodium ions react with water to form NaOH. |
| aamc-chem-qpack:Q11 | choices[1] | carbonate decomposes to release CO₂ gas | carbonate decomposes to release CO₂ gas. |
| aamc-chem-qpack:Q11 | choices[2] | sodium ions accept protons from water | sodium ions accept protons from water. |
| aamc-chem-qpack:Q11 | choices[3] | carbonate accepts a proton from water, forming OH⁻ | carbonate accepts a proton from water, forming OH⁻. |
| aamc-chem-qpack:Q14b | choices[0] | NH₃ forms the soluble complex ion [Cu(NH₃)₄]²⁺ | NH₃ forms the soluble complex ion [Cu(NH₃)₄]²⁺. |
| aamc-chem-qpack:Q14b | choices[1] | NH₃ lowers the pH enough to dissolve the hydroxide | NH₃ lowers the pH enough to dissolve the hydroxide. |
| aamc-chem-qpack:Q14b | choices[2] | NH₃ oxidizes Cu²⁺ to a more soluble ion | NH₃ oxidizes Cu²⁺ to a more soluble ion. |
| aamc-chem-qpack:Q14b | choices[3] | NH₃ raises the Ksp of Cu(OH)₂ | NH₃ raises the Ksp of Cu(OH)₂. |
| aamc-chem-qpack:Q15 | choices[0] | the hydroxyl proton is the one that ionizes first | the hydroxyl proton is the one that ionizes first. |
| aamc-chem-qpack:Q15 | choices[1] | the carboxylate is stabilized by an intramolecular hydrogen bond to the adjacent OH | the carboxylate is stabilized by an intramolecular hydrogen bond to the adjacent OH. |
| aamc-chem-qpack:Q15 | choices[2] | the un-ionized acid is stabilized by hydrogen bonding to the ring | the un-ionized acid is stabilized by hydrogen bonding to the ring. |
| aamc-chem-qpack:Q15 | choices[3] | the ring is more electron-rich than in the 4-isomer | the ring is more electron-rich than in the 4-isomer. |
| aamc-chem-qpack:Q16 | choices[0] | S, because one swap inverts the configuration | S, because one swap inverts the configuration. |
| aamc-chem-qpack:Q16 | choices[1] | R, because the same four groups are present | R, because the same four groups are present. |
| aamc-chem-qpack:Q16 | choices[2] | an achiral center, because symmetry is created | an achiral center, because symmetry is created. |
| aamc-chem-qpack:Q16 | choices[3] | a meso form, because a mirror plane appears | a meso form, because a mirror plane appears. |
| aamc-chem-qpack:Q17 | choices[0] | glycerol and one fatty acid salt | glycerol and one fatty acid salt. |
| aamc-chem-qpack:Q17 | choices[1] | ethylene glycol and two fatty acid salts | ethylene glycol and two fatty acid salts. |
| aamc-chem-qpack:Q17 | choices[2] | glycerol and three fatty acid salts | glycerol and three fatty acid salts. |
| aamc-chem-qpack:Q17 | choices[3] | three alcohols and one glycerate salt | three alcohols and one glycerate salt. |
| aamc-chem-qpack:Q17b | choices[0] | acetaldehyde and ethanol | acetaldehyde and ethanol. |
| aamc-chem-qpack:Q17b | choices[1] | acetic acid and ethene | acetic acid and ethene. |
| aamc-chem-qpack:Q17b | choices[2] | formic acid and propanol | formic acid and propanol. |
| aamc-chem-qpack:Q17b | choices[3] | acetic acid and ethanol | acetic acid and ethanol. |
| aamc-chem-qpack:Q18b | choices[0] | has no lone pair on nitrogen | has no lone pair on nitrogen. |
| aamc-chem-qpack:Q18b | choices[1] | is ionized in the pure liquid | is ionized in the pure liquid. |
| aamc-chem-qpack:Q18b | choices[2] | has stronger London dispersion forces | has stronger London dispersion forces. |
| aamc-chem-qpack:Q18b | choices[3] | has no N–H bond to donate hydrogen bonds | has no N–H bond to donate hydrogen bonds. |
| aamc-chem-qpack:Q19 | choices[0] | a lower Rf, because it binds the polar silica more strongly | a lower Rf, because it binds the polar silica more strongly. |
| aamc-chem-qpack:Q19 | choices[1] | a higher Rf, because it is more polar | a higher Rf, because it is more polar. |
| aamc-chem-qpack:Q19 | choices[2] | the same Rf, because their molar masses are nearly equal | the same Rf, because their molar masses are nearly equal. |
| aamc-chem-qpack:Q19 | choices[3] | a lower Rf, because it is less polar | a lower Rf, because it is less polar. |
| aamc-chem-qpack:Q24b | choices[0] | at least 2 units above the pKa | at least 2 units above the pKa. |
| aamc-chem-qpack:Q24b | choices[1] | within about 1 unit of the pKa | within about 1 unit of the pKa. |
| aamc-chem-qpack:Q24b | choices[2] | exactly 7, regardless of the pKa | exactly 7, regardless of the pKa. |
| aamc-chem-qpack:Q24b | choices[3] | equal to the pKb of the conjugate base | equal to the pKb of the conjugate base. |
| aamc-chem-qpack:Q25b | choices[0] | ethyl acetate and methanol | ethyl acetate and methanol. |
| aamc-chem-qpack:Q25b | choices[1] | acetic acid and dimethyl ether | acetic acid and dimethyl ether. |
| aamc-chem-qpack:Q25b | choices[2] | ethyl methyl ether and acetic acid | ethyl methyl ether and acetic acid. |
| aamc-chem-qpack:Q25b | choices[3] | acetaldehyde and methanol | acetaldehyde and methanol. |
| aamc-chem-qpack:Q28 | choices[0] | has a more branched carbon skeleton | has a more branched carbon skeleton. |
| aamc-chem-qpack:Q28 | choices[1] | forms more hydrogen bonds per molecule | forms more hydrogen bonds per molecule. |
| aamc-chem-qpack:Q28 | choices[2] | is ionized in the liquid state | is ionized in the liquid state. |
| aamc-chem-qpack:Q28 | choices[3] | has weaker London dispersion forces | has weaker London dispersion forces. |
| aamc-chem-qpack:Q29b | choices[0] | electrons are added to new, lower-energy shells | electrons are added to new, lower-energy shells. |
| aamc-chem-qpack:Q29b | choices[1] | shielding by inner electrons increases sharply | shielding by inner electrons increases sharply. |
| aamc-chem-qpack:Q29b | choices[2] | effective nuclear charge increases while shielding stays similar | effective nuclear charge increases while shielding stays similar. |
| aamc-chem-qpack:Q29b | choices[3] | the number of neutrons decreases | the number of neutrons decreases. |
| aamc-chem-qpack:Q31b | choices[0] | number of protons | number of protons. |
| aamc-chem-qpack:Q31b | choices[1] | number of electrons | number of electrons. |
| aamc-chem-qpack:Q31b | choices[2] | number of valence electrons | number of valence electrons. |
| aamc-chem-qpack:Q31b | choices[3] | number of neutrons | number of neutrons. |
| aamc-chem-qpack:Q33 | choices[0] | three six-membered rings and one five-membered ring | three six-membered rings and one five-membered ring. |
| aamc-chem-qpack:Q33 | choices[1] | four six-membered rings | four six-membered rings. |
| aamc-chem-qpack:Q33 | choices[2] | two six-membered rings and two five-membered rings | two six-membered rings and two five-membered rings. |
| aamc-chem-qpack:Q33 | choices[3] | three five-membered rings and one six-membered ring | three five-membered rings and one six-membered ring. |
| aamc-chem-qpack:Q33b | choices[0] | an axial position, to avoid 1,3-diaxial strain | an axial position, to avoid 1,3-diaxial strain. |
| aamc-chem-qpack:Q33b | choices[1] | an equatorial position, to avoid 1,3-diaxial strain | an equatorial position, to avoid 1,3-diaxial strain. |
| aamc-chem-qpack:Q33b | choices[2] | an axial position, to minimize ring strain | an axial position, to minimize ring strain. |
| aamc-chem-qpack:Q33b | choices[3] | an equatorial position, to maximize torsional strain | an equatorial position, to maximize torsional strain. |
| aamc-chem-qpack:Q35b | choices[0] | a carbonyl C=O stretch | a carbonyl C=O stretch. |
| aamc-chem-qpack:Q35b | choices[1] | an alcohol O–H stretch | an alcohol O–H stretch. |
| aamc-chem-qpack:Q35b | choices[2] | a nitrile C≡N stretch | a nitrile C≡N stretch. |
| aamc-chem-qpack:Q35b | choices[3] | an alkene C=C stretch | an alkene C=C stretch. |
| aamc-chem-qpack:Q38 | choices[0] | an ionic compound | an ionic compound. |
| aamc-chem-qpack:Q38 | choices[1] | a network covalent solid | a network covalent solid. |
| aamc-chem-qpack:Q38 | choices[2] | a covalent molecular compound | a covalent molecular compound. |
| aamc-chem-qpack:Q38 | choices[3] | a metallic compound | a metallic compound. |
| aamc-chem-qpack:Q41b | choices[0] | increases across a period and decreases down a group | increases across a period and decreases down a group. |
| aamc-chem-qpack:Q41b | choices[1] | decreases across a period and increases down a group | decreases across a period and increases down a group. |
| aamc-chem-qpack:Q41b | choices[2] | increases across a period and down a group | increases across a period and down a group. |
| aamc-chem-qpack:Q41b | choices[3] | decreases across a period and down a group | decreases across a period and down a group. |
| aamc-chem-qpack:Q43b | choices[0] | atomic radius | atomic radius. |
| aamc-chem-qpack:Q43b | choices[1] | number of valence electrons | number of valence electrons. |
| aamc-chem-qpack:Q43b | choices[2] | number of electron shells | number of electron shells. |
| aamc-chem-qpack:Q43b | choices[3] | mass number | mass number. |
| aamc-chem-qpack:Q44 | choices[0] | hydrogen bonds between molecules | hydrogen bonds between molecules. |
| aamc-chem-qpack:Q44 | choices[1] | London forces between molecules | London forces between molecules. |
| aamc-chem-qpack:Q44 | choices[2] | covalent bonds throughout the lattice | covalent bonds throughout the lattice. |
| aamc-chem-qpack:Q44 | choices[3] | ionic bonds between ions | ionic bonds between ions. |
| aamc-chem-qpack:Q46b | choices[0] | attractions between gas molecules | attractions between gas molecules. |
| aamc-chem-qpack:Q46b | choices[1] | elastic collisions with the walls | elastic collisions with the walls. |
| aamc-chem-qpack:Q46b | choices[2] | the finite volume of gas molecules | the finite volume of gas molecules. |
| aamc-chem-qpack:Q46b | choices[3] | differences in molar mass | differences in molar mass. |
| aamc-chem-qpack:Q48 | choices[0] | slightly basic, because NO₃⁻ accepts H⁺ from water | slightly basic, because NO₃⁻ accepts H⁺ from water. |
| aamc-chem-qpack:Q48 | choices[1] | neutral, because both ions are spectators | neutral, because both ions are spectators. |
| aamc-chem-qpack:Q48 | choices[2] | slightly acidic, because NH₄⁺ donates H⁺ to water | slightly acidic, because NH₄⁺ donates H⁺ to water. |
| aamc-chem-qpack:Q48 | choices[3] | strongly acidic, because HNO₃ re-forms | strongly acidic, because HNO₃ re-forms. |
| aamc-chem-qpack:Q49b | choices[0] | [HA] and [A⁻] are both high and roughly equal | [HA] and [A⁻] are both high and roughly equal. |
| aamc-chem-qpack:Q49b | choices[1] | [HA] is high and [A⁻] is very low | [HA] is high and [A⁻] is very low. |
| aamc-chem-qpack:Q49b | choices[2] | [HA] and [A⁻] are both very low | [HA] and [A⁻] are both very low. |
| aamc-chem-qpack:Q49b | choices[3] | [A⁻] is high and [HA] is very low | [A⁻] is high and [HA] is very low. |
| aamc-chem-qpack:Q51b | choices[0] | the C=O bond is stronger than the C=C bond | the C=O bond is stronger than the C=C bond. |
| aamc-chem-qpack:Q51b | choices[1] | the enol form is aromatic | the enol form is aromatic. |
| aamc-chem-qpack:Q51b | choices[2] | the enol form cannot hydrogen-bond | the enol form cannot hydrogen-bond. |
| aamc-chem-qpack:Q51b | choices[3] | the keto form has more hydrogens | the keto form has more hydrogens. |
| aamc-chem-qpack:Q52 | choices[0] | forms covalent dimers through its amino groups | forms covalent dimers through its amino groups. |
| aamc-chem-qpack:Q52 | choices[1] | exists as a zwitterion with strong ionic attractions | exists as a zwitterion with strong ionic attractions. |
| aamc-chem-qpack:Q52 | choices[2] | contains a nonpolar side chain that packs tightly | contains a nonpolar side chain that packs tightly. |
| aamc-chem-qpack:Q52 | choices[3] | is a network covalent solid like quartz | is a network covalent solid like quartz. |
| aamc-chem-qpack:Q53b | choices[0] | oxidation of the aldehyde group to a carboxylic acid | oxidation of the aldehyde group to a carboxylic acid. |
| aamc-chem-qpack:Q53b | choices[1] | conversion of a D-sugar into an L-sugar | conversion of a D-sugar into an L-sugar. |
| aamc-chem-qpack:Q53b | choices[2] | isomerization of an aldose into a ketose | isomerization of an aldose into a ketose. |
| aamc-chem-qpack:Q53b | choices[3] | interconversion of α and β anomers through the open-chain form | interconversion of α and β anomers through the open-chain form. |
| aamc-chem-qpack:Q58 | choices[0] | more collisions exceed the activation energy | more collisions exceed the activation energy. |
| aamc-chem-qpack:Q58 | choices[1] | the activation energy itself decreases | the activation energy itself decreases. |
| aamc-chem-qpack:Q58 | choices[2] | the reactant concentrations increase | the reactant concentrations increase. |
| aamc-chem-qpack:Q58 | choices[3] | the reaction becomes more exothermic | the reaction becomes more exothermic. |
| aamc-chem-qpack:Q58b | choices[0] | temperature decreases or Ea increases | temperature decreases or Ea increases. |
| aamc-chem-qpack:Q58b | choices[1] | temperature increases or Ea increases | temperature increases or Ea increases. |
| aamc-chem-qpack:Q58b | choices[2] | temperature increases or Ea decreases | temperature increases or Ea decreases. |
| aamc-chem-qpack:Q58b | choices[3] | temperature decreases or Ea decreases | temperature decreases or Ea decreases. |
| aamc-chem-qpack:Q59b | choices[0] | the balanced overall equation | the balanced overall equation. |
| aamc-chem-qpack:Q59b | choices[1] | the fastest elementary step | the fastest elementary step. |
| aamc-chem-qpack:Q59b | choices[2] | the final step of the mechanism | the final step of the mechanism. |
| aamc-chem-qpack:Q59b | choices[3] | the slowest elementary step | the slowest elementary step. |
| aamc-chem-qpack:Q60b | choices[0] | is present in the smallest mass | is present in the smallest mass. |
| aamc-chem-qpack:Q60b | choices[1] | is consumed first and caps the product yield | is consumed first and caps the product yield. |
| aamc-chem-qpack:Q60b | choices[2] | has the smallest stoichiometric coefficient | has the smallest stoichiometric coefficient. |
| aamc-chem-qpack:Q60b | choices[3] | remains after the reaction is complete | remains after the reaction is complete. |
| aamc-chem-qpack:Q65 | choices[0] | the sodium salt of a long-chain carboxylic acid | the sodium salt of a long-chain carboxylic acid. |
| aamc-chem-qpack:Q65 | choices[1] | the sodium salt of a long-chain sulfonic acid | the sodium salt of a long-chain sulfonic acid. |
| aamc-chem-qpack:Q65 | choices[2] | an ester of glycerol and a long-chain acid | an ester of glycerol and a long-chain acid. |
| aamc-chem-qpack:Q65 | choices[3] | a long-chain primary alcohol | a long-chain primary alcohol. |
| aamc-chem-qpack:Q66b | choices[0] | a lower melting point, because its chain is kinked | a lower melting point, because its chain is kinked. |
| aamc-chem-qpack:Q66b | choices[1] | a higher melting point, because its chains pack more tightly | a higher melting point, because its chains pack more tightly. |
| aamc-chem-qpack:Q66b | choices[2] | the same melting point, because the formulas are identical | the same melting point, because the formulas are identical. |
| aamc-chem-qpack:Q66b | choices[3] | a lower melting point, because it forms weaker ionic bonds | a lower melting point, because it forms weaker ionic bonds. |
| aamc-chem-qpack:Q90b | choices[0] | a solid at any higher pressure | a solid at any higher pressure. |
| aamc-chem-qpack:Q90b | choices[1] | a supercritical fluid | a supercritical fluid. |
| aamc-chem-qpack:Q90b | choices[2] | three phases in equilibrium | three phases in equilibrium. |
| aamc-chem-qpack:Q90b | choices[3] | a liquid that cannot vaporize | a liquid that cannot vaporize. |
| aamc-chem-qpack:Q112b | choices[0] | accurate but not precise | accurate but not precise. |
| aamc-chem-qpack:Q112b | choices[1] | both accurate and precise | both accurate and precise. |
| aamc-chem-qpack:Q112b | choices[2] | precise but not accurate | precise but not accurate. |
| aamc-chem-qpack:Q112b | choices[3] | neither accurate nor precise | neither accurate nor precise. |
| aamc-test-concepts:ST23 | choices[0] | higher, by the weight of the water column | higher, by the weight of the water column. |
| aamc-test-concepts:ST23 | choices[1] | the same, because the tube is open below | the same, because the tube is open below. |
| aamc-test-concepts:ST23 | choices[2] | higher, because the gas is warm and expands | higher, because the gas is warm and expands. |
| aamc-test-concepts:ST23 | choices[3] | lower, by the extra column of water | lower, by the extra column of water. |
| aamc-chem-qpack:Q8 | q | Which compound contains a chiral carbon? | Which of the following compounds contains a chiral carbon? |
| aamc-chem-qpack:Q15b | q | Which carboxylic acid is the strongest? | Which of the following carboxylic acids is the strongest? |
| aamc-chem-qpack:Q17b | q | Acid-catalyzed hydrolysis of ethyl acetate produces: | The products of acid-catalyzed hydrolysis of ethyl acetate are: |
| aamc-chem-qpack:Q33 | q | The steroid ring system consists of: | The core ring system of a steroid consists of: |
| aamc-chem-qpack:Q34b | q | Which reagent converts 1-butanol into 1-chlorobutane? | Which of the following reagents converts 1-butanol into 1-chlorobutane? |
| aamc-chem-qpack:Q39b | q | Which element is a metalloid? | Which of the following elements is a metalloid? |
| aamc-chem-qpack:Q40 | q | Which compound is ionic? | Which of the following compounds is ionic? |
| aamc-chem-qpack:Q41b | q | Electronegativity generally: | Moving through the periodic table, electronegativity generally: |
| aamc-chem-qpack:Q68b | q | Which molecule is amphipathic? | Which of the following molecules is amphipathic? |
| aamc-chem-qpack:Q73b | q | Which ion is isoelectronic with neon? | Which of the following ions is isoelectronic with neon? |
| aamc-chem-qpack:Q81b | q | Which mixture reacts spontaneously? | Which of the following mixtures undergoes a spontaneous redox reaction? |
| aamc-chem-qpack:Q85b | q | Which carbon–carbon bond is the shortest? | Which of the following carbon–carbon bonds is the shortest? |
| aamc-chem-qpack:Q95b | q | Which compound is insoluble in water? | Which of the following compounds is insoluble in water? |
| aamc-chem-qpack:Q16b | q | Rank these groups on a stereocenter by Cahn–Ingold–Prelog priority, highest first: –COOH, –OH, –CH₂OH, –H. | What is the Cahn–Ingold–Prelog priority order, highest first, of the groups –COOH, –OH, –CH₂OH and –H on a stereocenter? |
| aamc-chem-qpack:Q102b | q | Which concentration unit does not change when a solution is heated? | Which concentration unit does NOT change when a solution is heated? |
| aamc-chem-qpack:Q56 | q | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate is also present and reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns the solution blue-black once free I₂ builds up. What does the fast step do? | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns blue-black once free I₂ builds up. What does the fast step do? |
| aamc-chem-qpack:Q56b | q | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate is also present and reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns the solution blue-black once free I₂ builds up. Which change would NOT alter the time until the blue-black color appears? | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns blue-black with free I₂. Which change would NOT alter the time until the color appears? |
| aamc-chem-qpack:Q61 | q | Two Maxwell–Boltzmann curves are recorded for the same gas at two temperatures. Curve 1 is tall and narrow, with its peak at low energy. Curve 2 is lower and broader, with its peak at higher energy and a longer high-energy tail. The activation energy Ea lies on the tail, beyond both peaks. Which curve is at the higher temperature, and which has the larger fraction of molecules with energy at or above Ea? | Two Maxwell–Boltzmann curves show one gas at two temperatures. Curve 1 is tall and narrow, peaking at low energy. Curve 2 is lower and broader, peaking at higher energy with a longer tail. Ea lies on the tail, beyond both peaks. Which curve is hotter, and which has the larger fraction of molecules at or above Ea? |
| aamc-chem-qpack:Q99 | q | A clear solution contains either F⁻ or Cl⁻ at 1.0 × 10⁻³ M. A reagent is added so that its metal cation is also 1.0 × 10⁻³ M. Ksp values at 25 °C: CaF₂, 4 × 10⁻¹¹; BaF₂, 1 × 10⁻⁶; PbF₂, 3 × 10⁻⁸; PbCl₂, 2 × 10⁻⁵. CaCl₂, BaCl₂ and all sodium salts are very soluble. Which reagent tells the two anions apart? | A clear solution contains F⁻ or Cl⁻ at 1.0 × 10⁻³ M. Adding a reagent gives 1.0 × 10⁻³ M of its metal cation. Ksp at 25 °C: CaF₂, 4 × 10⁻¹¹; BaF₂, 1 × 10⁻⁶; PbF₂, 3 × 10⁻⁸; PbCl₂, 2 × 10⁻⁵. CaCl₂, BaCl₂ and sodium salts are very soluble. Which reagent distinguishes the anions? |
| cp-gap-chem:G9 | q | Three alcohols, P, Q and R, are each warmed with excess aqueous acidic Na₂Cr₂O₇. IR spectra of the recovered organic products: P, very broad band 2500–3300 cm⁻¹ and strong band at 1710 cm⁻¹; Q, strong sharp band at 1715 cm⁻¹ and nothing above 3100 cm⁻¹; R, broad band at 3350 cm⁻¹ and nothing near 1700 cm⁻¹. Which classification fits? | Three alcohols, P, Q and R, are warmed with excess aqueous acidic Na₂Cr₂O₇. IR spectra of the products: P, very broad band 2500–3300 cm⁻¹ and strong band at 1710 cm⁻¹; Q, strong sharp band at 1715 cm⁻¹ and nothing above 3100 cm⁻¹; R, broad band at 3350 cm⁻¹ and nothing near 1700 cm⁻¹. Which classification fits? |
| aamc-chem-qpack:Q98b | choices[2] | Neither; their molar solubilities are equal | Neither, because their molar solubilities are equal |
| aamc-test-concepts:ST3 | choices[0] | Nothing happens; both ions stay in solution | Both ions stay in solution |
| aamc-test-concepts:IQB9 | choices[0] | Volume rises; pressure stays the same | Pressure stays the same; volume rises |
| aamc-test-concepts:IQB9 | choices[2] | Both volume and pressure stay the same | Pressure stays the same; volume stays the same |
| aamc-test-concepts:IQB9 | choices[3] | Volume falls as the molecules speed up | Pressure stays the same; volume falls |
| aamc-test-concepts:IQB14 | choices[0] | Radius grows; ionization energy falls sharply | Radius grows; ionization energy falls |
| aamc-test-concepts:IQB14 | choices[1] | Both grow | Radius grows; ionization energy rises |
| aamc-test-concepts:IQB14 | choices[3] | Both shrink | Radius shrinks; ionization energy falls |
| aamc-chem-qpack:Q60 | choices[3] | No reactant remains | 0 mol of either reactant |
| aamc-chem-qpack:Q8 | idStem | null | Which compound contains a chiral carbon? |
| aamc-chem-qpack:Q15b | idStem | null | Which carboxylic acid is the strongest? |
| aamc-chem-qpack:Q17b | idStem | null | Acid-catalyzed hydrolysis of ethyl acetate produces: |
| aamc-chem-qpack:Q33 | idStem | null | The steroid ring system consists of: |
| aamc-chem-qpack:Q34b | idStem | null | Which reagent converts 1-butanol into 1-chlorobutane? |
| aamc-chem-qpack:Q39b | idStem | null | Which element is a metalloid? |
| aamc-chem-qpack:Q40 | idStem | null | Which compound is ionic? |
| aamc-chem-qpack:Q41b | idStem | null | Electronegativity generally: |
| aamc-chem-qpack:Q68b | idStem | null | Which molecule is amphipathic? |
| aamc-chem-qpack:Q73b | idStem | null | Which ion is isoelectronic with neon? |
| aamc-chem-qpack:Q81b | idStem | null | Which mixture reacts spontaneously? |
| aamc-chem-qpack:Q85b | idStem | null | Which carbon–carbon bond is the shortest? |
| aamc-chem-qpack:Q95b | idStem | null | Which compound is insoluble in water? |
| aamc-chem-qpack:Q16b | idStem | null | Rank these groups on a stereocenter by Cahn–Ingold–Prelog priority, highest first: –COOH, –OH, –CH₂OH, –H. |
| aamc-chem-qpack:Q102b | idStem | null | Which concentration unit does not change when a solution is heated? |
| aamc-chem-qpack:Q56 | idStem | null | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate is also present and reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns the solution blue-black once free I₂ builds up. What does the fast step do? |
| aamc-chem-qpack:Q56b | idStem | null | In an iodine clock reaction, a slow step forms iodine: S₂O₈²⁻ + 2 I⁻ → 2 SO₄²⁻ + I₂. A small, fixed amount of thiosulfate is also present and reacts in a fast step: I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻. Starch turns the solution blue-black once free I₂ builds up. Which change would NOT alter the time until the blue-black color appears? |
| aamc-chem-qpack:Q61 | idStem | null | Two Maxwell–Boltzmann curves are recorded for the same gas at two temperatures. Curve 1 is tall and narrow, with its peak at low energy. Curve 2 is lower and broader, with its peak at higher energy and a longer high-energy tail. The activation energy Ea lies on the tail, beyond both peaks. Which curve is at the higher temperature, and which has the larger fraction of molecules with energy at or above Ea? |
| aamc-chem-qpack:Q99 | idStem | null | A clear solution contains either F⁻ or Cl⁻ at 1.0 × 10⁻³ M. A reagent is added so that its metal cation is also 1.0 × 10⁻³ M. Ksp values at 25 °C: CaF₂, 4 × 10⁻¹¹; BaF₂, 1 × 10⁻⁶; PbF₂, 3 × 10⁻⁸; PbCl₂, 2 × 10⁻⁵. CaCl₂, BaCl₂ and all sodium salts are very soluble. Which reagent tells the two anions apart? |
| cp-gap-chem:G9 | idStem | null | Three alcohols, P, Q and R, are each warmed with excess aqueous acidic Na₂Cr₂O₇. IR spectra of the recovered organic products: P, very broad band 2500–3300 cm⁻¹ and strong band at 1710 cm⁻¹; Q, strong sharp band at 1715 cm⁻¹ and nothing above 3100 cm⁻¹; R, broad band at 3350 cm⁻¹ and nothing near 1700 cm⁻¹. Which classification fits? |

### qb-aamc-phys.js (53 items, 203 edits)

| Item | Field | Before | After |
|---|---|---|---|
| aamc-phys-qpack:Q7 | choices[0] | a period one-third as long | a period one-third as long. |
| aamc-phys-qpack:Q7 | choices[1] | a period three times as long | a period three times as long. |
| aamc-phys-qpack:Q7 | choices[2] | the same period | the same period. |
| aamc-phys-qpack:Q7 | choices[3] | a period one-ninth as long | a period one-ninth as long. |
| aamc-phys-qpack:Q12b | choices[0] | the product of the individual displacements | the product of the individual displacements. |
| aamc-phys-qpack:Q12b | choices[1] | the larger of the two displacements | the larger of the two displacements. |
| aamc-phys-qpack:Q12b | choices[2] | the average of the two displacements | the average of the two displacements. |
| aamc-phys-qpack:Q12b | choices[3] | the sum of the individual displacements | the sum of the individual displacements. |
| aamc-phys-qpack:Q13b | choices[0] | a lower frequency | a lower frequency. |
| aamc-phys-qpack:Q13b | choices[1] | a higher frequency | a higher frequency. |
| aamc-phys-qpack:Q13b | choices[2] | the same frequency, louder | the same frequency, louder. |
| aamc-phys-qpack:Q13b | choices[3] | the same frequency, faster | the same frequency, faster. |
| aamc-phys-qpack:Q15 | choices[0] | shorter wavelength and higher frequency | shorter wavelength and higher frequency. |
| aamc-phys-qpack:Q15 | choices[1] | longer wavelength and higher frequency | longer wavelength and higher frequency. |
| aamc-phys-qpack:Q15 | choices[2] | shorter wavelength and lower frequency | shorter wavelength and lower frequency. |
| aamc-phys-qpack:Q15 | choices[3] | longer wavelength and lower frequency | longer wavelength and lower frequency. |
| aamc-phys-qpack:Q17 | choices[0] | equal to the transmitted frequency | equal to the transmitted frequency. |
| aamc-phys-qpack:Q17 | choices[1] | higher than the transmitted frequency | higher than the transmitted frequency. |
| aamc-phys-qpack:Q17 | choices[2] | lower than the transmitted frequency | lower than the transmitted frequency. |
| aamc-phys-qpack:Q17 | choices[3] | dependent on the aircraft speed | dependent on the aircraft speed. |
| aamc-phys-qpack:Q17b | choices[0] | a constant, unshifted frequency | a constant, unshifted frequency. |
| aamc-phys-qpack:Q17b | choices[1] | a frequency alternating higher and lower | a frequency alternating higher and lower. |
| aamc-phys-qpack:Q17b | choices[2] | a constant, higher frequency | a constant, higher frequency. |
| aamc-phys-qpack:Q17b | choices[3] | a constant, lower frequency | a constant, lower frequency. |
| aamc-phys-qpack:Q20 | choices[0] | rises by less than 2× | rises by less than 2×. |
| aamc-phys-qpack:Q20 | choices[1] | doubles exactly | doubles exactly. |
| aamc-phys-qpack:Q20 | choices[2] | stays the same | stays the same. |
| aamc-phys-qpack:Q20 | choices[3] | rises by 4× | rises by 4×. |
| aamc-phys-qpack:Q22b | choices[0] | the age of the sample | the age of the sample. |
| aamc-phys-qpack:Q22b | choices[1] | the temperature of the sample | the temperature of the sample. |
| aamc-phys-qpack:Q22b | choices[2] | the number of undecayed nuclei | the number of undecayed nuclei. |
| aamc-phys-qpack:Q22b | choices[3] | the half-life of the isotope | the half-life of the isotope. |
| aamc-phys-qpack:Q23 | choices[0] | stays at 0 °C | stays at 0 °C. |
| aamc-phys-qpack:Q23 | choices[1] | rises steadily | rises steadily. |
| aamc-phys-qpack:Q23 | choices[2] | drops slightly | drops slightly. |
| aamc-phys-qpack:Q23 | choices[3] | rises, then levels off | rises, then levels off. |
| aamc-phys-qpack:Q26 | choices[0] | doubles the number of electrons ejected per second | doubles the number of electrons ejected per second. |
| aamc-phys-qpack:Q26 | choices[1] | doubles the maximum kinetic energy of electrons | doubles the maximum kinetic energy of electrons. |
| aamc-phys-qpack:Q26 | choices[2] | raises the threshold frequency of the metal | raises the threshold frequency of the metal. |
| aamc-phys-qpack:Q26 | choices[3] | has no effect on the photocurrent | has no effect on the photocurrent. |
| aamc-phys-qpack:Q26b | choices[0] | the frequency of the incident light | the frequency of the incident light. |
| aamc-phys-qpack:Q26b | choices[1] | the work function of the metal | the work function of the metal. |
| aamc-phys-qpack:Q26b | choices[2] | the wavelength of the incident light | the wavelength of the incident light. |
| aamc-phys-qpack:Q26b | choices[3] | the number of incident photons per second | the number of incident photons per second. |
| aamc-phys-qpack:Q27 | choices[0] | accelerate uniformly toward the negative plate | accelerate uniformly toward the negative plate. |
| aamc-phys-qpack:Q27 | choices[1] | move at constant velocity toward the positive plate | move at constant velocity toward the positive plate. |
| aamc-phys-qpack:Q27 | choices[2] | remain at rest between the plates | remain at rest between the plates. |
| aamc-phys-qpack:Q27 | choices[3] | accelerate uniformly toward the positive plate | accelerate uniformly toward the positive plate. |
| aamc-phys-qpack:Q27b | choices[0] | a positive test charge | a positive test charge. |
| aamc-phys-qpack:Q27b | choices[1] | a negative test charge | a negative test charge. |
| aamc-phys-qpack:Q27b | choices[2] | an electron at rest | an electron at rest. |
| aamc-phys-qpack:Q27b | choices[3] | a moving magnetic dipole | a moving magnetic dipole. |
| aamc-phys-qpack:Q28 | choices[0] | photons carry charge across the gap to the anode | photons carry charge across the gap to the anode. |
| aamc-phys-qpack:Q28 | choices[1] | light raises the battery's emf above its rating | light raises the battery's emf above its rating. |
| aamc-phys-qpack:Q28 | choices[2] | ejected electrons cross the gap and complete the circuit | ejected electrons cross the gap and complete the circuit. |
| aamc-phys-qpack:Q28 | choices[3] | the vacuum becomes ionized and conducts like a wire | the vacuum becomes ionized and conducts like a wire. |
| aamc-phys-qpack:Q28b | choices[0] | in the same direction as electron flow | in the same direction as electron flow. |
| aamc-phys-qpack:Q28b | choices[1] | opposite to the direction of electron flow | opposite to the direction of electron flow. |
| aamc-phys-qpack:Q28b | choices[2] | from the negative terminal through the load | from the negative terminal through the load. |
| aamc-phys-qpack:Q28b | choices[3] | perpendicular to the direction of electron flow | perpendicular to the direction of electron flow. |
| aamc-phys-qpack:Q32b | choices[0] | equal accelerations, unequal force magnitudes | equal accelerations, unequal force magnitudes. |
| aamc-phys-qpack:Q32b | choices[1] | equal force magnitudes, unequal accelerations | equal force magnitudes, unequal accelerations. |
| aamc-phys-qpack:Q32b | choices[2] | equal force magnitudes and equal accelerations | equal force magnitudes and equal accelerations. |
| aamc-phys-qpack:Q32b | choices[3] | unequal force magnitudes and unequal accelerations | unequal force magnitudes and unequal accelerations. |
| aamc-phys-qpack:Q34 | choices[0] | downward, toward the negative plate | downward, toward the negative plate. |
| aamc-phys-qpack:Q34 | choices[1] | upward, toward the negative plate | upward, toward the negative plate. |
| aamc-phys-qpack:Q34 | choices[2] | horizontally, parallel to the plates | horizontally, parallel to the plates. |
| aamc-phys-qpack:Q34 | choices[3] | upward, toward the positive plate | upward, toward the positive plate. |
| aamc-phys-qpack:Q36 | choices[0] | at the equilibrium position | at the equilibrium position. |
| aamc-phys-qpack:Q36 | choices[1] | at maximum displacement | at maximum displacement. |
| aamc-phys-qpack:Q36 | choices[2] | halfway to maximum displacement | halfway to maximum displacement. |
| aamc-phys-qpack:Q36 | choices[3] | when the speed is maximum | when the speed is maximum. |
| aamc-phys-qpack:Q36b | choices[0] | doubles the period | doubles the period. |
| aamc-phys-qpack:Q36b | choices[1] | quadruples the period | quadruples the period. |
| aamc-phys-qpack:Q36b | choices[2] | halves the period | halves the period. |
| aamc-phys-qpack:Q36b | choices[3] | leaves the period unchanged | leaves the period unchanged. |
| aamc-phys-qpack:Q38b | choices[0] | decreases, frequency unchanged | decreases, frequency unchanged. |
| aamc-phys-qpack:Q38b | choices[1] | is unchanged, frequency increases | is unchanged, frequency increases. |
| aamc-phys-qpack:Q38b | choices[2] | increases, frequency unchanged | increases, frequency unchanged. |
| aamc-phys-qpack:Q38b | choices[3] | increases, frequency increases | increases, frequency increases. |
| aamc-phys-qpack:Q39 | choices[0] | kinetic energy converts to potential energy | kinetic energy converts to potential energy. |
| aamc-phys-qpack:Q39 | choices[1] | potential energy converts to kinetic energy | potential energy converts to kinetic energy. |
| aamc-phys-qpack:Q39 | choices[2] | total mechanical energy increases | total mechanical energy increases. |
| aamc-phys-qpack:Q39 | choices[3] | both kinetic and potential energy increase | both kinetic and potential energy increase. |
| aamc-phys-qpack:Q40 | choices[0] | a lower frequency | a lower frequency. |
| aamc-phys-qpack:Q40 | choices[1] | a higher frequency | a higher frequency. |
| aamc-phys-qpack:Q40 | choices[2] | the same frequency | the same frequency. |
| aamc-phys-qpack:Q40 | choices[3] | a steadily rising frequency | a steadily rising frequency. |
| aamc-phys-qpack:Q43 | choices[1] | zero in both cases | 0 kJ, then 0 kJ |
| aamc-phys-qpack:Q44 | choices[0] | points away from the positive charge and decreases | points away from the positive charge and decreases. |
| aamc-phys-qpack:Q44 | choices[1] | points toward the positive charge and increases | points toward the positive charge and increases. |
| aamc-phys-qpack:Q44 | choices[2] | points toward the positive charge and stays constant | points toward the positive charge and stays constant. |
| aamc-phys-qpack:Q44 | choices[3] | points away from the positive charge and increases | points away from the positive charge and increases. |
| aamc-phys-qpack:Q46b | choices[0] | doubles | doubles. |
| aamc-phys-qpack:Q46b | choices[1] | quadruples | quadruples. |
| aamc-phys-qpack:Q46b | choices[2] | increases by a factor of √2 | increases by a factor of √2. |
| aamc-phys-qpack:Q46b | choices[3] | stays the same | stays the same. |
| aamc-phys-qpack:Q48 | choices[0] | lower rising, equal at the top, higher falling | lower rising, equal at the top, higher falling. |
| aamc-phys-qpack:Q48 | choices[1] | higher rising, equal at the top, lower falling | higher rising, equal at the top, lower falling. |
| aamc-phys-qpack:Q48 | choices[2] | lower throughout the entire flight | lower throughout the entire flight. |
| aamc-phys-qpack:Q48 | choices[3] | higher throughout the entire flight | higher throughout the entire flight. |
| aamc-phys-qpack:Q49b | choices[0] | decreases by a factor of n | decreases by a factor of n. |
| aamc-phys-qpack:Q49b | choices[1] | increases by a factor of n | increases by a factor of n. |
| aamc-phys-qpack:Q49b | choices[2] | is unchanged | is unchanged. |
| aamc-phys-qpack:Q49b | choices[3] | reverses sign | reverses sign. |
| aamc-phys-qpack:Q51 | choices[0] | converge to a real focal point beyond the lens | converge to a real focal point beyond the lens. |
| aamc-phys-qpack:Q51 | choices[1] | spread apart as if from a virtual focal point | spread apart as if from a virtual focal point. |
| aamc-phys-qpack:Q51 | choices[2] | emerge parallel to their original direction | emerge parallel to their original direction. |
| aamc-phys-qpack:Q51 | choices[3] | converge and then cross the optical axis | converge and then cross the optical axis. |
| aamc-phys-qpack:Q53 | choices[0] | its charge equals the battery's charge | its charge equals the battery's charge. |
| aamc-phys-qpack:Q53 | choices[1] | the resistor has absorbed all the energy | the resistor has absorbed all the energy. |
| aamc-phys-qpack:Q53 | choices[2] | its plates run out of free electrons | its plates run out of free electrons. |
| aamc-phys-qpack:Q53 | choices[3] | its voltage equals the battery voltage | its voltage equals the battery voltage. |
| aamc-phys-qpack:Q63 | choices[0] | toward the normal | toward the normal. |
| aamc-phys-qpack:Q63 | choices[1] | away from the normal | away from the normal. |
| aamc-phys-qpack:Q63 | choices[2] | parallel to the surface | parallel to the surface. |
| aamc-phys-qpack:Q63 | choices[3] | straight through, unbent | straight through, unbent. |
| aamc-phys-qpack:Q63b | choices[0] | from lower n to higher n beyond the critical angle | from lower n to higher n beyond the critical angle. |
| aamc-phys-qpack:Q63b | choices[1] | from higher n to lower n beyond the critical angle | from higher n to lower n beyond the critical angle. |
| aamc-phys-qpack:Q63b | choices[2] | from higher n to lower n below the critical angle | from higher n to lower n below the critical angle. |
| aamc-phys-qpack:Q63b | choices[3] | from lower n to higher n at normal incidence | from lower n to higher n at normal incidence. |
| aamc-phys-qpack:Q64 | choices[0] | bent permanently toward the normal | bent permanently toward the normal. |
| aamc-phys-qpack:Q64 | choices[1] | reflected back toward the source | reflected back toward the source. |
| aamc-phys-qpack:Q64 | choices[2] | parallel to it but shifted sideways | parallel to it but shifted sideways. |
| aamc-phys-qpack:Q64 | choices[3] | unchanged in path and position | unchanged in path and position. |
| aamc-phys-qpack:Q70 | choices[0] | less than the liquid's density | less than the liquid's density. |
| aamc-phys-qpack:Q70 | choices[1] | greater than the liquid's density | greater than the liquid's density. |
| aamc-phys-qpack:Q70 | choices[2] | equal to the liquid's density | equal to the liquid's density. |
| aamc-phys-qpack:Q70 | choices[3] | unrelated to the liquid's density | unrelated to the liquid's density. |
| aamc-phys-qpack:Q73b | choices[0] | the area of the hole | the area of the hole. |
| aamc-phys-qpack:Q73b | choices[1] | the depth of the hole | the depth of the hole. |
| aamc-phys-qpack:Q73b | choices[2] | the density of the liquid | the density of the liquid. |
| aamc-phys-qpack:Q73b | choices[3] | the volume of the tank | the volume of the tank. |
| aamc-phys-qpack:Q77 | choices[0] | the incidence and refraction angles | the incidence and refraction angles. |
| aamc-phys-qpack:Q77 | choices[1] | the incidence and reflection angles | the incidence and reflection angles. |
| aamc-phys-qpack:Q77 | choices[2] | the reflection angle and frequency | the reflection angle and frequency. |
| aamc-phys-qpack:Q77 | choices[3] | the wavelength and beam intensity | the wavelength and beam intensity. |
| aamc-phys-qpack:Q77b | choices[0] | the surface itself | the surface itself. |
| aamc-phys-qpack:Q77b | choices[1] | the normal to the surface | the normal to the surface. |
| aamc-phys-qpack:Q77b | choices[2] | the incident beam | the incident beam. |
| aamc-phys-qpack:Q77b | choices[3] | the horizontal | the horizontal. |
| aamc-phys-qpack:Q82 | choices[0] | increases | increases. |
| aamc-phys-qpack:Q82 | choices[1] | stays the same | stays the same. |
| aamc-phys-qpack:Q82 | choices[2] | decreases | decreases. |
| aamc-phys-qpack:Q82 | choices[3] | becomes equal to mg | becomes equal to mg. |
| aamc-phys-qpack:Q83b | choices[0] | higher speed and higher pressure | higher speed and higher pressure. |
| aamc-phys-qpack:Q83b | choices[1] | higher speed and lower pressure | higher speed and lower pressure. |
| aamc-phys-qpack:Q83b | choices[2] | lower speed and lower pressure | lower speed and lower pressure. |
| aamc-phys-qpack:Q83b | choices[3] | lower speed and higher pressure | lower speed and higher pressure. |
| aamc-phys-qpack:Q87 | choices[0] | the hanging mass's gravitational PE | the hanging mass's gravitational PE. |
| aamc-phys-qpack:Q87 | choices[1] | the table's normal force on the block | the table's normal force on the block. |
| aamc-phys-qpack:Q87 | choices[2] | the block's own gravitational PE | the block's own gravitational PE. |
| aamc-phys-qpack:Q87 | choices[3] | the pulley's rotational energy | the pulley's rotational energy. |
| aamc-phys-qpack:Q89 | choices[0] | increases linearly with time | increases linearly with time. |
| aamc-phys-qpack:Q89 | choices[1] | increases with time squared | increases with time squared. |
| aamc-phys-qpack:Q89 | choices[2] | stays constant over time | stays constant over time. |
| aamc-phys-qpack:Q89 | choices[3] | decreases linearly with time | decreases linearly with time. |
| aamc-phys-qpack:Q93 | choices[0] | energy is reflected and absorbed at the wall | energy is reflected and absorbed at the wall. |
| aamc-phys-qpack:Q93 | choices[1] | the wall lowers the sound's frequency | the wall lowers the sound's frequency. |
| aamc-phys-qpack:Q93 | choices[2] | the wave speed drops in the air beyond | the wave speed drops in the air beyond. |
| aamc-phys-qpack:Q93 | choices[3] | the wall shortens the sound's wavelength | the wall shortens the sound's wavelength. |
| aamc-phys-qpack:Q94 | choices[0] | a liquid boils at its boiling point | a liquid boils at its boiling point. |
| aamc-phys-qpack:Q94 | choices[1] | a liquid warms below its boiling point | a liquid warms below its boiling point. |
| aamc-phys-qpack:Q94 | choices[2] | a solid melts at its melting point | a solid melts at its melting point. |
| aamc-phys-qpack:Q94 | choices[3] | a vapor condenses at its boiling point | a vapor condenses at its boiling point. |
| aamc-phys-qpack:Q97 | choices[0] | lower, since wave speed drops | lower, since wave speed drops. |
| aamc-phys-qpack:Q97 | choices[1] | higher, since wave speed rises | higher, since wave speed rises. |
| aamc-phys-qpack:Q97 | choices[2] | unchanged, since length sets it | unchanged, since length sets it. |
| aamc-phys-qpack:Q97 | choices[3] | higher, since wavelength shrinks | higher, since wavelength shrinks. |
| aamc-phys-qpack:Q100b | choices[0] | lower binding energy per nucleon | lower binding energy per nucleon. |
| aamc-phys-qpack:Q100b | choices[1] | greater total mass | greater total mass. |
| aamc-phys-qpack:Q100b | choices[2] | more total protons | more total protons. |
| aamc-phys-qpack:Q100b | choices[3] | greater binding energy per nucleon | greater binding energy per nucleon. |
| aamc-phys-qpack:Q111 | choices[0] | one-half as large | one-half as large. |
| aamc-phys-qpack:Q111 | choices[1] | one-quarter as large | one-quarter as large. |
| aamc-phys-qpack:Q111 | choices[2] | one-sixteenth as large | one-sixteenth as large. |
| aamc-phys-qpack:Q111 | choices[3] | the same as before | the same as before. |
| aamc-phys-qpack:Q113 | choices[0] | two identical waves moving in opposite directions | two identical waves moving in opposite directions. |
| aamc-phys-qpack:Q113 | choices[1] | two identical waves moving in the same direction | two identical waves moving in the same direction. |
| aamc-phys-qpack:Q113 | choices[2] | two waves with slightly different frequencies | two waves with slightly different frequencies. |
| aamc-phys-qpack:Q113 | choices[3] | one wave passing into a denser medium | one wave passing into a denser medium. |
| aamc-phys-qpack:Q117 | choices[0] | one-half as large | one-half as large. |
| aamc-phys-qpack:Q117 | choices[1] | twice as large | twice as large. |
| aamc-phys-qpack:Q117 | choices[2] | one-quarter as large | one-quarter as large. |
| aamc-phys-qpack:Q117 | choices[3] | the same as before | the same as before. |
| cp-gap-phys:P11 | choices[0] | one-fourth as large | one-fourth as large. |
| cp-gap-phys:P11 | choices[1] | one-half as large | one-half as large. |
| cp-gap-phys:P11 | choices[2] | four times as large | four times as large. |
| cp-gap-phys:P11 | choices[3] | the same | the same. |
| cp-gap-phys:P5 | q | A force sensor records the push on a 2.0 kg cart, initially at rest on a frictionless track. On the force–time graph, the force rises in a straight line from 0 to 400 N over the first 0.010 s and falls in a straight line back to 0 at 0.020 s. What is the cart's speed after the push? | A force sensor records the push on a 2.0 kg cart, initially at rest on a frictionless track. On the force–time graph, the force rises linearly from 0 to 400 N over the first 0.010 s and falls linearly back to 0 at 0.020 s. What is the cart's speed after the push? |
| cp-gap-phys:P6 | q | A cart's velocity–time graph has three straight segments: v rises from 0 to 6 m/s between t = 0 and 3 s, stays at 6 m/s until t = 7 s, then falls to 0 at t = 9 s. Which gives the cart's displacement from 0 to 9 s and its acceleration during the first 3 s? | A cart's velocity–time graph has three straight segments: v rises from 0 to 6 m/s between t = 0 and 3 s, stays constant until t = 7 s, then falls to 0 at t = 9 s. Which gives the displacement from 0 to 9 s and the acceleration during the first 3 s? |
| aamc-phys-qpack:Q102 | choices[0] | The strong force is long-range; proton repulsion is short-range | The strong force is long-range, but proton repulsion is short-range |
| aamc-phys-qpack:Q102 | choices[2] | The strong force is short-range; proton repulsion is long-range | The strong force is short-range, but proton repulsion is long-range |
| aamc-phys-qpack:Q43 | choices[0] | +9.8 kJ, then zero | +9.8 kJ, then 0 kJ |
| aamc-phys-qpack:Q92 | choices[2] | 4 times as long | four times as long. |
| aamc-phys-qpack:Q101 | choices[1] | 3 times larger on the lighter | three times larger on the lighter |
| aamc-phys-qpack:Q101 | choices[2] | 3 times larger on the heavier | three times larger on the heavier |
| aamc-phys-qpack:Q101 | choices[3] | 9 times larger on the lighter | nine times larger on the lighter |
| cp-gap-phys:P5 | idStem | null | A force sensor records the push on a 2.0 kg cart, initially at rest on a frictionless track. On the force–time graph, the force rises in a straight line from 0 to 400 N over the first 0.010 s and falls in a straight line back to 0 at 0.020 s. What is the cart's speed after the push? |
| cp-gap-phys:P6 | idStem | null | A cart's velocity–time graph has three straight segments: v rises from 0 to 6 m/s between t = 0 and 3 s, stays at 6 m/s until t = 7 s, then falls to 0 at t = 9 s. Which gives the cart's displacement from 0 to 9 s and its acceleration during the first 3 s? |
| aamc-phys-qpack:Q92 | choices[0] | twice as long | twice as long. |
| aamc-phys-qpack:Q92 | choices[1] | the same | the same. |
| aamc-phys-qpack:Q92 | choices[3] | one-fourth as long | one-fourth as long. |

### qb-aamc-biochem.js (12 items, 46 edits)

| Item | Field | Before | After |
|---|---|---|---|
| cp-gap-bch:A31 | choices[0] | the alkyl side chains form strong hydrogen bonds with each other | the alkyl side chains form strong hydrogen bonds with each other. |
| cp-gap-bch:A31 | choices[1] | water around the side chains becomes more ordered | water around the side chains becomes more ordered. |
| cp-gap-bch:A31 | choices[2] | water released from ordered shells around them gains entropy | water released from ordered shells around them gains entropy. |
| cp-gap-bch:A31 | choices[3] | covalent bonds form between the buried alkyl side chains | covalent bonds form between the buried alkyl side chains. |
| cp-gap-bch:B14 | choices[3] | a value below 50 μM/min set by the inhibitor concentration | <50 μM/min, since the inhibitor concentration caps the rate |
| cp-gap-bch:A32 | choices[1] | Urea broke noncovalent bonds; the sequence guides refolding | Urea broke noncovalent bonds, and the sequence guided refolding |
| cp-gap-bch:B10 | choices[0] | Lowers Vmax to 10 μM/min; Km stays at 5 μM | Vmax falls to 10 μM/min; Km stays at 5 μM |
| cp-gap-bch:B10 | choices[1] | Lowers Vmax to 10 μM/min and Km to 2.5 μM | Vmax falls to 10 μM/min; Km falls to 2.5 μM |
| cp-gap-bch:B10 | choices[2] | Raises Km to 10 μM; Vmax stays at 20 μM/min | Vmax stays at 20 μM/min; Km rises to 10 μM |
| cp-gap-bch:B10 | choices[3] | Lowers Vmax to 10 μM/min; raises Km to 10 μM | Vmax falls to 10 μM/min; Km rises to 10 μM |
| cp-gap-bch:B4 | choices[0] | A about 98%; B about 50% | A 98%; B 50% |
| cp-gap-bch:B4 | choices[1] | A about 50%; B about 50% | A 50%; B 50% |
| cp-gap-bch:B4 | choices[2] | A about 33%; B about 98% | A 33%; B 98% |
| cp-gap-bch:B4 | choices[3] | A about 98%; B about 33% | A 98%; B 33% |
| cp-gap-bch:C8 | choices[0] | Lipid 4 forms a micelle | Lipid 4, micelle |
| cp-gap-bch:C8 | choices[1] | Lipid 2 forms a bilayer | Lipid 2, bilayer |
| cp-gap-bch:C8 | choices[2] | Lipid 3 forms an oil droplet | Lipid 3, oil droplet |
| cp-gap-bch:C8 | choices[3] | Lipid 1 forms a bilayer | Lipid 1, bilayer |
| cp-gap-bch:C8 | exp | Shape decides the assembly. **One polar head + two tails** is roughly cylindrical and packs into a **bilayer** (Lipid 1). **One head + one tail** is cone-shaped and packs into a **micelle**. **No head** gives an **oil droplet**.  Lipid 2 forms a bilayer: a single-tailed lysophospholipid is cone-shaped and forms micelles. Lipid 3 forms an oil droplet: its charged sulfate head makes it a detergent that forms micelles. Lipid 4 forms a micelle: with no polar head it cannot face water, so it forms oil droplets. | Shape decides the assembly. **One polar head + two tails** is roughly cylindrical and packs into a **bilayer** (Lipid 1). **One head + one tail** is cone-shaped and packs into a **micelle**. **No head** gives an **oil droplet**.  Lipid 2, bilayer: a single-tailed lysophospholipid is cone-shaped and forms micelles. Lipid 3, oil droplet: its charged sulfate head makes it a detergent that forms micelles. Lipid 4, micelle: with no polar head it cannot face water, so it forms oil droplets. |
| cp-gap-bch:A6 | choices[0] | pI 3.0; toward the anode | pI 3.0; anode |
| cp-gap-bch:A6 | choices[1] | pI 6.5; toward the anode | pI 6.5; anode |
| cp-gap-bch:A6 | choices[2] | pI 6.5; toward the cathode | pI 6.5; cathode |
| cp-gap-bch:A6 | choices[3] | pI 8.0; it does not move | pI 8.0; no movement |
| cp-gap-bch:B26 | choices[0] | Hydrolase, since ATP is split by water | Hydrolase |
| cp-gap-bch:B26 | choices[1] | Transferase, since a phosphate leaves ATP | Transferase |
| cp-gap-bch:B26 | choices[2] | Lyase, since two molecules become one | Lyase |
| cp-gap-bch:B26 | choices[3] | Ligase, since ATP powers the joining | Ligase |
| cp-gap-bch:B32 | choices[0] | Oxidizing agent; FADH₂ is oxidized to FAD | Oxidant; FADH₂ → FAD |
| cp-gap-bch:B32 | choices[1] | Oxidizing agent; FAD is reduced to FADH₂ | Oxidant; FAD → FADH₂ |
| cp-gap-bch:B32 | choices[2] | Reducing agent; FAD is reduced to FADH₂ | Reductant; FAD → FADH₂ |
| cp-gap-bch:B32 | choices[3] | Reducing agent; FADH₂ is oxidized to FAD | Reductant; FADH₂ → FAD |
| cp-gap-bch:B32 | exp | Fumarate **gains two H atoms** (2 H⁺ + 2 e⁻) to become succinate, so it is **reduced**. The flavin supplies them, so it must start loaded as **FADH₂** and end as **FAD**: it is **oxidized**, and a species oxidized while reducing another is the **reducing agent**. The chain then reloads FAD to FADH₂.  Oxidizing agent, FAD → FADH₂: the succinate dehydrogenase direction, in which the substrate loses H. Reducing agent, FAD → FADH₂: gaining H is reduction, and a reducing agent is itself oxidized. Oxidizing agent, FADH₂ → FAD: the right flavin change, but the species that is oxidized acts as the reducing agent. | Fumarate **gains two H atoms** (2 H⁺ + 2 e⁻) to become succinate, so it is **reduced**. The flavin supplies them, so it must start loaded as **FADH₂** and end as **FAD**: it is **oxidized**, and a species oxidized while reducing another is the **reducing agent**. The chain then reloads FAD to FADH₂.  Oxidant, FAD → FADH₂: the succinate dehydrogenase direction, in which the substrate loses H. Reductant, FAD → FADH₂: gaining H is reduction, and a reducing agent is itself oxidized. Oxidant, FADH₂ → FAD: the right flavin change, but the species that is oxidized acts as the reducing agent. |
| cp-gap-bch:A10 | choices[0] | Lysine, side-chain pKa near 10.5 | Lysine (pKa ≈ 10.5) |
| cp-gap-bch:A10 | choices[1] | Glutamate, side-chain pKa near 4.1 | Glutamate (pKa ≈ 4.1) |
| cp-gap-bch:A10 | choices[2] | Histidine, side-chain pKa near 6.0 | Histidine (pKa ≈ 6.0) |
| cp-gap-bch:A10 | choices[3] | Cysteine, side-chain pKa near 8.3 | Cysteine (pKa ≈ 8.3) |
| cp-gap-bch:B20 | choices[0] | K, by about 8 times | K, about 8-fold |
| cp-gap-bch:B20 | choices[1] | N, by about 2.5 times | N, about 2.5-fold |
| cp-gap-bch:B20 | choices[2] | K, by about 2.5 times | K, about 2.5-fold |
| cp-gap-bch:B20 | choices[3] | Neither, since both have the same half-saturation | Neither (same half-saturation) |
| cp-gap-bch:B20 | exp | Release = drop in fractional saturation. K: 0.8 − 0.1 = **0.7**. N: 0.6 − 0.33 ≈ **0.27**. 0.7 / 0.27 ≈ **2.5**: the steep middle of a **sigmoidal** curve lets a cooperative carrier unload far more over a small range of [L], as hemoglobin does.  N releasing more swaps the two curves. 8 times divides K's high value by its low value (0.8/0.1) instead of comparing the two proteins. A shared half-saturation point says nothing about how steeply each curve changes around it. | Release = drop in fractional saturation. K: 0.8 − 0.1 = **0.7**. N: 0.6 − 0.33 ≈ **0.27**. 0.7 / 0.27 ≈ **2.5**: the steep middle of a **sigmoidal** curve lets a cooperative carrier unload far more over a small range of [L], as hemoglobin does.  N releasing more swaps the two curves. 8-fold divides K's high value by its low value (0.8/0.1) instead of comparing the two proteins. A shared half-saturation point says nothing about how steeply each curve changes around it. |
| cp-gap-bch:A27 | choices[0] | Cys and Met: covalent disulfide bond | Cys–Met: disulfide bond |
| cp-gap-bch:A27 | choices[1] | Phe and Lys: ionic salt bridge | Phe–Lys: salt bridge |
| cp-gap-bch:A27 | choices[2] | Leu and Val: hydrophobic contact | Leu–Val: hydrophobic contact |
| cp-gap-bch:A27 | choices[3] | Asp and Glu: ionic salt bridge | Asp–Glu: salt bridge |
| cp-gap-bch:A27 | exp | **Leucine and valine** are both nonpolar alkyl side chains, held together by **hydrophobic contacts** (dispersion forces plus the exclusion of water).  Asp and Glu: both are −1 at pH 7.4; like charges repel, so no salt bridge. Cys and Met: a disulfide needs two cysteine thiols; methionine has no S–H. Phe and Lys: phenylalanine is uncharged, so there is no ion pair. | **Leucine and valine** are both nonpolar alkyl side chains, held together by **hydrophobic contacts** (dispersion forces plus the exclusion of water).  Asp–Glu: both are −1 at pH 7.4; like charges repel, so no salt bridge. Cys–Met: a disulfide needs two cysteine thiols; methionine has no S–H. Phe–Lys: phenylalanine is uncharged, so there is no ion pair. |

### qb-aamc-iqb.js (1 items, 4 edits)

| Item | Field | Before | After |
|---|---|---|---|
| aamc-iqb:B19b | choices[0] | increasing the salt concentration | increasing the salt concentration. |
| aamc-iqb:B19b | choices[1] | decreasing the salt concentration | decreasing the salt concentration. |
| aamc-iqb:B19b | choices[2] | adding a reducing agent | adding a reducing agent. |
| aamc-iqb:B19b | choices[3] | lowering the temperature | lowering the temperature. |

