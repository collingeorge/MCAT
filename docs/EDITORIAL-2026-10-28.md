# Editorial follow-up — October 28, 2026

## Result

Full-bank validation now reports **0 errors and 0 warnings**. The original 35 warnings were individually reviewed. Twenty-nine originally flagged question locations received wording, choice, or explanation edits. Six were false validator matches: five partial-word/compound matches and a letter-case comparison against numeric choices. Improving acronym capitalization detection surfaced four further inconsistent-choice cases; those were edited too, for **33 revised question locations** total.

This is a clean automated editorial check, not a promise that every scientific explanation is flawless or a substitute for subject-matter peer review.

## Content changes

- Removed a direct answer mention in the serine stem, repeated pathway-word clues, and the repeated hormone name in a first-messenger question.
- Replaced the duplicate organic-chemistry saponification definition with an applied reaction question.
- Balanced technical terminology and grammatical form across answer choices without removing the length detector or adding per-question warning exceptions.
- Preserved correct proper names and acronyms while making capitalization consistent across distractors.
- Corrected the expressivity explanation: variation in a trait does not establish complete penetrance.
- Replaced a broad somatic-disorders category question with a specific somatic symptom disorder question and distinguishing symptom-related cognition/behavior. The stem no longer implies that symptoms must be medically unexplained.

## Validator changes and regression protection

Answer-in-stem detection now matches a full term rather than a character sequence inside another word or compound: “lactose” inside “galactose,” “chromatin” inside “euchromatin,” “oncogenes” inside “proto-oncogenes,” “volume” inside “isovolumetric,” and “f orbital” across the end of “of orbital” are not answer giveaways. Actual standalone answer repetition is still detected. Regular-expression punctuation in technical terms is escaped literally.

Capitalization checks count acronyms as capitalized choices and compare letter case only when all choices begin alphabetically. Numeric constants have no case. The length threshold remains unchanged, and synthetic fixtures prove that real repetition, length, and capitalization cues still warn.

The CLI content check now fails on **either errors or warnings**. The editorial regression suite runs in GitHub Actions on Windows and Linux alongside existing application tests and the Chrome smoke test.

## Saved-progress compatibility

Six revised recall stems retain the original stem in an **idStem** field. Question IDs still derive from that legacy text; taxonomy/statistics keys are unchanged. Both application and validator variant lookup recognize current and original stems. Tests seed the original six memory and flag records, confirm they remain accessible after loading the edited bank, and check that every authored variant still resolves. No recall questions were removed; the bank remains at 2,807 items.

## Reviewed scientific references

- [American Psychiatric Association: somatic symptom disorder](https://www.psychiatry.org/patients-families/somatic-symptom-disorder/what-is-somatic-symptom-disorder) — symptom-related excessive thoughts/feelings/behavior and symptoms that may have a medical explanation.
- [NCI Genetics Dictionary: variable expressivity](https://www.cancer.gov/publications/dictionaries/genetics-dictionary/def/variable-expressivity) — variation in expression of a trait.
- [OpenStax Sociology: theoretical perspectives on deviance](https://openstax.org/books/introduction-sociology-3e/pages/7-2-theoretical-perspectives-on-deviance-and-crime) — theory/author labels.
- [NCBI: pentose phosphate pathway enzymes](https://www.ncbi.nlm.nih.gov/research/cog/pathway/Pentose%20phosphate%20pathway/) — pathway enzyme nomenclature.
- [NCBI Endocrinology: cardiovascular and renal endocrinology](https://www.ncbi.nlm.nih.gov/books/NBK25/?report=reader) — natriuretic peptide and opposing volume-regulatory pathways.
- [OpenStax University Physics: electric dipoles](https://openstax.org/books/university-physics-volume-2/pages/5-7-electric-dipoles) — equal, opposite separated charges.

## Change register

Locations below use the validator's zero-based indexes.

| Location | Revision |
|---|---|
| QB_BIOCHEMISTRY[10] | Remove the answer from the protease clue. |
| QB_BIOCHEMISTRY[207] | Use comparable names for initiation-related sequence/cap distractors. |
| QB_BIOCHEMISTRY[335] | Avoid repeating the answer as part of the pathway name. |
| QB_BIOCHEMISTRY[337] | Avoid repeating the answer as part of the pathway name. |
| QB_BIOCHEMISTRY[352] | Balance enzyme names while retaining useful standard abbreviations. |
| QB_BIOCHEMISTRY[373] | Replace short unrelated enzymes with plausible pathway enzymes of comparable length. |
| QB_BIOCHEMISTRY[470] | Require identifying the extracellular signal rather than matching the repeated hormone name. |
| QB_BIOLOGY[5] | Consistent sentence capitalization while preserving the proper name. |
| QB_BIOLOGY[190] | Spell out all pituitary hormone names consistently. |
| QB_BIOLOGY[255] | Use parallel expanded conduction-system names. |
| QB_BIOLOGY[264] | Use comparable endocrine distractors without a long-key cue. |
| QB_BIOLOGY[450] | Balance explanatory choices and retain a true but non-explanatory distractor. |
| QB_BIOLOGY[489] | Use comparable muscle-cell membrane structures. |
| QB_BIOLOGY[514] | Balance genetic terms and correct the misleading claim that expressivity requires complete penetrance. |
| QB_BIOLOGY[530] | Use parallel genetic frequency concepts. |
| QB_CHEMISTRY[5] | Use comparable full names for quantum rules. |
| QB_CHEMISTRY[49] | Use consistent first-word capitalization. |
| QB_CHEMISTRY[342] | Balance carbonyl-process distractors and preserve the tautomer/resonance distinction. |
| QB_CHEMISTRY[368] | Replace the duplicate definition with an applied reaction stem. |
| QB_CHEMISTRY[502] | Use parallel quantities rather than one fully qualified long key. |
| QB_PHYSICS[54] | Balance fluid-mechanics distractors. |
| QB_PHYSICS[81] | Balance physical configurations and make the dipole definition precise. |
| QB_BEHAVIORAL_1[67] | Use comparable anatomical names and clarify the normal sound pathway. |
| QB_BEHAVIORAL_1[263] | Use the specific diagnosis and distinguishing criteria, with comparable diagnostic distractors. |
| QB_BEHAVIORAL_1[309] | Use consistent theory-and-author labels. |
| QB_BEHAVIORAL_1[344] | Replace a short generic distractor with the parallel social-behavior concept. |
| QB_BEHAVIORAL_1[375] | Balance attribution/perception distractors. |
| QB_VARIANTS_2[104] | Use parallel therapy names. |
| EXAM1_PS[0] | Balance attribution and reasoning-bias names. |
| QB_BIOCHEMISTRY[303] | Normalize capitalization for acronyms and full-word distractors identified by the stricter validator. |
| QB_BIOLOGY[143] | Normalize capitalization for acronyms and full-word distractors identified by the stricter validator. |
| QB_BIOLOGY[164] | Normalize capitalization for acronyms and full-word distractors identified by the stricter validator. |
| QB_BIOLOGY[165] | Normalize capitalization for acronyms and full-word distractors identified by the stricter validator. |
