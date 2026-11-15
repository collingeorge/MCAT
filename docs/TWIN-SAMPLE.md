# Approval sample: twin passage and stand-alones

Diagnostic passage 1 and stand-alones 1–3 of the rebuilt Chem/Phys diagnostic, from `tools/twin-sample.json` (approved; SA1–SA3 revised in review; rule lines adapted to each question). Each question names its twin card; the twin card's stem is quoted (first ~80 characters) so the method can be compared. Answers are bold. Explanations follow the twin card's walkthrough step by step and end with its Rule to reuse.

## Passage: β-Lactoglobulin as a Carrier for a Cationic Drug

β-Lactoglobulin (BLG), the most abundant whey protein in cow's milk, belongs to the lipocalin family. Eight antiparallel β-strands fold into a barrel whose interior forms a cup-shaped cavity called the calyx. The calyx is lined with nonpolar side chains, and lysine side chains sit at its entrance, so it binds molecules that combine a long nonpolar chain with one negative charge. Because folded BLG resists digestion by pepsin, food scientists have proposed using it to carry poorly soluble drugs through the stomach to the intestine.

Researchers tested BLG as a carrier for Compound 1, a drug that has a fused three-ring aromatic system and carries a charge of +1 at pH 7.0. In Experiment 1, the binding constant (Kb) of Compound 1 for BLG was measured by fluorescence titration at 25°C in pH 7.0 buffer alone and with 5.0 mM CaCl₂ or 5.0 mM KCl added. In Experiment 2, Kb was measured again with one of two site markers present at a concentration high enough to fill its site: Probe P, which binds only in the calyx, or Probe Q, which binds only at a shallow groove on the outer surface of the barrel.

Each measurement was repeated three times, and the mean values are shown in Table 1. A smaller Kb means that, at the same total concentration, more of the drug is free in solution rather than bound to BLG.

| Experiment | Added to the buffer | Kb (M⁻¹) | Kb ÷ Kb with no marker |
|---|---|---|---|
| 1 | nothing | 8.0 × 10⁵ | — |
| 1 | 5.0 mM CaCl₂ | 2.4 × 10⁵ | — |
| 1 | 5.0 mM KCl | 7.7 × 10⁵ | — |
| 2 | Probe P (calyx) | — | 0.85 |
| 2 | Probe Q (surface groove) | — | 0.20 |

Table 1 Binding of Compound 1 to BLG at 25°C, pH 7.0

### Q1 · twin `sample-cp:30` · 5D · biochemistry · SIRS 3 · M

> **Method from:** Binding constants of a drug to serum albumin were measured: drug alone, 2.0 × 10…

Based on Experiment 1, which added ion substantially weakens the binding of Compound 1 to BLG, and by about how much?

- **Ca²⁺, by about 70%**
- Ca²⁺, by about 30%
- K⁺, by about 70%
- K⁺, by about 30%

**Explanation**

1. Take the control value: buffer alone, Kb = **8.0 × 10⁵ M⁻¹**.
2. Compare each ion with the control: Ca²⁺: 2.4 ÷ 8.0 = **0.30** → a **70%** drop; K⁺: 7.7 ÷ 8.0 ≈ **0.96** → about a 4% drop.
3. Both values are below the control, and Ca²⁺, not K⁺, has the large effect, so neither K⁺ choice fits.
4. 0.30 is the fraction of binding that remains, not the drop: 1 − 0.30 = 0.70, so "about 30%" reports the ratio as the change.
5. Answer: Ca²⁺, by about 70%.

**Rule to reuse:** judge an effect by its ratio to the control: divide, then turn 1 − ratio into a percent change.

### Q2 · twin `sample-cp:31` · 5D · biochemistry · SIRS 1 · E

> **Method from:** A binding pocket on a plasma protein accepts ligands that have a long hydrophobi…

Based on the passage, which molecule found in milk would bind most tightly in the calyx of BLG?

- **Palmitate**
- Citrate
- Lactose
- Alanine

**Explanation**

1. The calyx sets two requirements, a long nonpolar chain and one negative charge, and a ligand must meet both.
2. Score each molecule on the two requirements: palmitate (C₁₅H₃₁COO⁻): long C–H chain ✓, one –COO⁻ (−1) ✓; citrate: no chain, about −3 at pH 7.0 ✗✗; lactose: no chain, polar and uncharged ✗✗; alanine: small zwitterion, net charge 0 ✗✗.
3. Lactose is polar and uncharged, and alanine is small and zwitterionic; neither has a nonpolar chain.
4. Citrate is negatively charged, but it carries about −3, not −1, and it has no hydrocarbon chain.
5. Answer: palmitate, a fatty acid anion with a long nonpolar tail and one carboxylate.

**Rule to reuse:** match a binding site requirement by requirement. A long nonpolar region plus one negative charge describes a fatty acid anion.

### Q3 · twin `sample-cp:32` · 5D · biochemistry · SIRS 3 · M

> **Method from:** Marker X binds only at site A of a protein, and marker Y binds only at site B. A…

According to Experiment 2, where on BLG does Compound 1 mainly bind?

- **The surface groove**
- The calyx
- The calyx and groove equally
- Neither marked site

**Explanation**

1. Probe P binds only in the calyx and Probe Q only at the surface groove, so each marker tests one site.
2. Read how much each marker lowers Kb: Probe P (calyx): 1.00 → **0.85**, a 15% drop; Probe Q (groove): 1.00 → **0.20**, an **80%** drop.
3. Probe P barely changes binding, so Compound 1 does not depend on the calyx. The two sites are not equal, and "neither marked site" cannot explain the large effect of Probe Q.
4. Answer: the surface groove, the site Probe Q competes for.

**Rule to reuse:** the marker that displaces a drug most marks the drug's binding site; a value near the control means a different site.

### Q4 · twin `sample-cp:33` · 5D · biochemistry · SIRS 1 · M

> **Method from:** A protein pocket binds a negatively charged ligand that also has a large aromati…

Which two residues lining the surface groove would best hold Compound 1 by both its charge and its ring system?

- **Glu and Trp**
- Lys and Arg
- Ser and Asn
- Lys and Ala

**Explanation**

1. Compound 1 has two features to match: a +1 charge and a fused aromatic ring system.
2. Match each feature with a side chain: Compound 1 (+) ↔ Glu (–COO⁻): salt bridge; aromatic rings ↔ Trp (indole ring): hydrophobic and π-stacking contact.
3. Lys and Arg are both positive and would repel the cation; Lys and Ala adds a repelling charge and no ring.
4. Ser and Asn are polar and uncharged: no salt bridge and no ring.
5. Answer: Glu and Trp.

**Rule to reuse:** line a pocket with complements of the ligand: − residues (Asp, Glu) for cations, aromatic residues (Phe, Tyr, Trp) for rings.

## Stand-alones

### SA1 · twin `sample-cp:14` · 5D · organic_chem · SIRS 1 · D

> **Method from:** Cholesterol and the steroid hormones share a fused four-ring skeleton. The body …

In the liver, lanosterol, the first molecule with the fused four-ring sterol core, is made by folding and cyclizing one long open-chain terpene. Which molecule is that open-chain precursor?

- **Squalene**
- Isoprene
- Palmitic acid
- Phosphatidylcholine

**Explanation**

1. Identify the target: the fused four-ring core, first formed in lanosterol.
2. Trace the terpene pathway to that ring system: isoprene units (C₅) → **squalene (C₃₀)** → cyclization → lanosterol → cholesterol → steroid hormones.
3. Isoprene is the C₅ building block; six of them make squalene, so isoprene itself is not the chain that cyclizes. Palmitic acid is a fatty acid, and phosphatidylcholine is a membrane lipid built on a glycerol backbone; neither supplies a ring skeleton.
4. Answer: squalene.

**Rule to reuse:** the steroid ring skeleton comes from the terpene pathway, isoprene → squalene (C₃₀) → lanosterol → cholesterol.

### SA2 · twin `sample-cp:16` · 5D · organic_chem · SIRS 1 · M

> **Method from:** Maltose and lactose reduce Ag⁺ to a silver mirror (a positive Tollens' test), bu…

Cellobiose reduces Ag⁺ in Tollens' test, but trehalose, two glucose units joined by an α,α-1,1-glycosidic bond, does not. Why is trehalose a nonreducing sugar?

- **It has no free hemiacetal.**
- Its α geometry prevents ring opening.
- Its ring oxygens cannot be oxidized.
- Glucose is a ketose sugar.

**Explanation**

1. Note the observation to explain: trehalose fails Tollens' test, while cellobiose passes.
2. Check trehalose's anomeric carbons: the glycosidic bond joins glucose C1 to glucose C1, so both anomeric carbons are used → **no free hemiacetal** → no ring can open to an aldehyde.
3. The ring oxygens are not what Tollens' reagent oxidizes, and cellobiose's own glycosidic bond does not stop it from reacting; the problem is the anomeric carbons, not ring oxygens, and α geometry does not stop a free hemiacetal from opening.
4. Glucose is an aldose (its open chain has an aldehyde), not a ketose.
5. Answer: it has no free hemiacetal.

**Rule to reuse:** a sugar is reducing if it has a free hemiacetal (anomeric carbon not in a glycosidic bond); trehalose links both anomeric carbons, so it is non-reducing.

### SA3 · twin `sample-cp:44` · 5D · organic_chem · SIRS 1 · E

> **Method from:** Why does freeze-drying preserve a protein sample better than boiling the water o…

Water's triple point is at 0.61 kPa and 0.01 °C. A food plant dries frozen strawberry slices without heating them enough to damage their flavor. Under which conditions does the ice change directly into water vapor?

- **Below 0.61 kPa, with gentle warming**
- Above 0.61 kPa, with gentle warming
- Below 0.61 kPa, with rapid cooling
- Above 101 kPa, with strong heating

**Explanation**

1. Two routes for the water are compared: ice → vapor directly (sublimation), or ice → liquid → vapor (melting, then boiling).
2. Follow each route on the phase diagram: below the triple-point pressure (**0.61 kPa**) no liquid can exist, so gently warmed ice goes straight to vapor and the slices stay cold; above it, warming melts the ice first, and boiling at 101 kPa needs 100 °C, enough heat to damage flavor compounds.
3. Above 0.61 kPa the ice melts before it evaporates. Sublimation absorbs heat, so cooling cannot drive it. Strong heating at 101 kPa is ordinary boiling, the heat the process avoids.
4. Answer: below 0.61 kPa, with gentle warming.

**Rule to reuse:** below the triple-point pressure a solid sublimes; freeze-drying removes water without heat, protecting heat-sensitive flavor compounds.
