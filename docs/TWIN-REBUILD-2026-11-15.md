# Twin rebuild of the Chem/Phys tests — step 1 report (2026-11-15)

Goal: every question of the C/P diagnostic, the six daily quizzes and the 36 practice passages becomes a **twin** of one
studied card: the same concept, method, thing asked and kinds of traps, with new numbers, compound or device, and wording.

This step adds the plan and one sample only. **No app data, page or card changed.**

| File | What it is |
|---|---|
| `tools/twin-clusters.json` | Which Practice Exam / Sample Test questions shared an AAMC passage (inferred, with confidence), plus 44 secondary topic clusters |
| `tools/twin-sources.cjs` | Loads the twin-source cards and clusters; gives each card its skill options and a difficulty score |
| `tools/solve-twin-map.py` | Exact assignment (OR-Tools CP-SAT, a planning tool only; the app does not need it) |
| `tools/twin-map.json` | The map: 383 question slots → twin card, category, discipline, skill, difficulty |
| `docs/TWIN-MAP.md` | The full mapping table, rendered by `tools/render-twin-map.cjs` |
| `tools/twin-sample.json`, `docs/TWIN-SAMPLE.md` | The finished sample: diagnostic passage 1 and stand-alones 1–3 |
| `tools/test-twins.cjs` | The new twin test (also added to CI) |

## The map

- **383 slots, 383 different twins**: diagnostic 59, quizzes 6 × 30, practice 36 × 4 = 144. No card is twinned twice.
- **Every AAMC passage is used once**: the 60 Sample Test / PE1/3/4/5/6 passage clusters go 10 to the diagnostic, 30 to
  the quizzes (5 per quiz) and 20 to practice. Every passage question twins a card from its own cluster; every
  stand-alone twins a stand-alone card.
- **Exact mixes**: categories, skills and difficulty are exact in every set. Disciplines are exact in the diagnostic
  (GCH 19, BCH 15, PHY 15, OCH 9, BIO 1) and in quizzes 1–5 (GCH 10, BCH 7, PHY 7, OCH 5, BIO 1).
- **Even draw**: each exam supplies 5 quiz passages and 10 quiz stand-alones in total; in the diagnostic, 1–2 passages
  and 2–3 stand-alones per exam; within a quiz, at most 1 passage and 2 stand-alones per exam.

## Decisions for you

1. **Passage boundaries are inferred.** The cards record the AAMC question number but not which passage it belonged
   to. I grouped each exam's run by shared scenario under the AAMC shape (10 passages, 44 questions, 15 stand-alones).
   Confidence: 29 clusters **H** (one clear scenario), 22 **M**, 9 **L** (the count fits but the shared scenario is
   unclear; mostly PE6 and the Sample Test's Q1–4). The L clusters are kept out of the diagnostic. If you can check
   the ranges in `tools/twin-clusters.json` against your AAMC score reports, I will re-solve before building.
2. **There are not enough AAMC passages.** The sets need 76 passages (10 + 30 + 36); the six exams have 60. The map
   fills the other **16 practice passages from secondary topic clusters** (neighboring cards of one Question Pack or
   biochemistry deck on one topic, such as Doppler, RC circuits, Michaelis–Menten kinetics). These are not AAMC
   passages. Alternatives: cut practice to 20 passages, or allow a card to be twinned twice (breaks the
   "at most once" rule). I recommend the secondary clusters.
3. **Biology runs out.** Only 6 biology cards exist. The diagnostic and quizzes 1–5 get one each; quiz 6 has OCH 6
   instead of 5 (within the ±1 the blueprint test allows), and practice has BIO 0 instead of 3 (GCH, BCH and PHY
   each +1).
4. **Skill and difficulty are judged.** The cards carry neither. Skill options come from each card's task (a calculation
   is SIRS 2; one or two steps can be SIRS 1; a card with a figure or several values can be SIRS 4, since its numbers
   can move into the passage's table; an experiment, control or separation task can be SIRS 3); 289 of 383 slots use
   the card's first option. Difficulty is ranked from each card's steps, calculations and figure, then set to the exact
   mix; I will re-check each label by hand as I write the question, since the twin's numbers set its difficulty.
5. **Walkthroughs.** All 354 primary cards have a `how` walkthrough; 39 of them have no "Rule to reuse" line. For
   those, the explanation will end with the walkthrough's key relation (its first "know" line) labeled "Rule to reuse".
   The 64 secondary twins have no walkthrough: their explanations will follow the card's `exp` reasoning in order,
   and a missed one sends its card to the front of the flashcards (no guided step exists for it).

## The sample (`docs/TWIN-SAMPLE.md`)

- **Passage**: β-lactoglobulin as a carrier for a cationic drug (232 words, one table), twinning Sample Test Q30–33
  (serum albumin binding). Same reasoning in a new scenario: a ratio-to-control effect of two ions, a pocket matched
  requirement by requirement, a site-marker displacement experiment, and complementary side chains (here for a
  cation, so the answer pair changes).
- **Stand-alones**: steroid hormones from cholesterol (twin of Q14), trehalose as a nonreducing sugar (Q16),
  freeze-drying probiotic bacteria (Q44).
- Stems 12–34 words; choices 1–8 words (passage median 3); every number was checked by hand (2.4/8.0 = 0.30,
  7.7/8.0 ≈ 0.96, 1 − 0.85 = 0.15, 1 − 0.20 = 0.80). No structures are drawn, so there is nothing for RDKit.
- Each explanation follows its twin card's walkthrough in the same step order, with the twin's numbers, and ends
  with that card's Rule to reuse.

## Checks (`tools/test-twins.cjs`)

- every twin resolves to a card, with the card's category and discipline; no card twinned twice;
- no number from the card's stem or choices appears in the twin's choices; no shared choice; no 6-word run shared
  between the card's stem and the twin's stem or passage;
- no question uses one of 27 topics no card teaches (Nernst, Raoult, Poiseuille, induction, Diels–Alder, …); the test
  fails if a card ever starts teaching a blocklisted topic;
- the map hits every set's exact mix and uses every AAMC passage cluster once.

Planted errors (a card's number in a choice, a card's choice, a blocklisted word) each fail the test. Until the data
files are rebuilt, the test checks the map and the sample; after the rebuild it will require a twin on every question.

## Next, after approval

Diagnostic (new version id), then the six quizzes, then the 36 practice passages; the "Method from" line and
"Study this card" button on the review screen; missed twins to the front of the next day's guided step or
flashcards; `STRICT_QUIZ_MIX` on; format test tightened to choice median ≤ 3 and 90th percentile ≤ 9; CACHE bump.

## Step 2 update (after review)

- The daily plan dropped practice passages: the map now covers the diagnostic (59) and six quizzes in the AAMC
  half-section layout, P P [4] P P P [4] (passages of 4, 4, 4, 5, 5 = 22 questions, plus 8 stand-alones): **239 slots,
  239 distinct twins**.
- **Passage ranges are verified**: `tools/twin-clusters.json` now holds the ranges read from each exam's AAMC review
  screen (question numbers only). The inferred ranges were right for the Sample Test, PE1 and PE4 and wrong for PE3,
  PE5 and PE6; the confidence labels are gone. Every passage twins the cards of one range.
- **Every set is exact** in categories, skills and difficulty; disciplines are exact except quiz 5 (BIO 0, PHY 8).
  Secondary cards are used only as stand-alones (2 of 63).
- Secondary topic clusters and the practice set were removed from the map, solver, test and docs.
- Sample: SA1–SA3 revised in review. Two SA2 distractors were reworded again because the approved paraphrase check
  flagged them ("Its α geometry prevents ring opening.", "Glucose is a ketose sugar.").

## Step 3: the rebuild

- `data/cp-diagnostic.js` (id **cp_diag2**, so earlier results show as "earlier version") and `data/cp-pool.js`
  (six quizzes, P P [4] P P P [4]) are rebuilt: all 239 questions carry a `twin`, written from `tools/twin-build/*.json`
  by `tools/assemble-twins.cjs`. Each set passed `tools/check-twin-set.cjs` (layout, map labels, near-copy and
  paraphrase checks, AAMC length and format) and an independent answer-and-number review of every question; the
  review found no wrong key or number and its wording and accuracy fixes are applied.
- 10 new structures (RDKit-checked by `tools/draw-structures.py`).
- Review screen: "Method from:" with the twin card's stem and a "Study this card" button. TODAY: a missed question's
  twin leads the next day's guided step (Practice Exam card) or flashcards (QBank card), in its own category's slot.
- Tests: `STRICT_QUIZ_MIX` on; the quiz layout and diagnostic version checked; `test-twins` requires a twin on every
  question and the approved sample unchanged; the rebuilt files meet choice median ≤ 3 and 90th percentile ≤ 9
  (`tools/check-twin-set.cjs`; the shared format test keeps ≤ 4 / ≤ 12 because existing flashcards, which may not be
  reworded, exceed the new limits).
- Explanations end with the twin card's Rule to reuse, word for word except where it named the card's own example
  (33 lines, for instance NO and NO₂ → I⁻ and IO⁻, sucrose → trehalose, "each drawing" → "each choice"), now replaced with the question's own example or a general term.
