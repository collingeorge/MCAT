[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
![Version](https://img.shields.io/badge/Version-Active_Development-blue.svg)
![Last Updated](https://img.shields.io/badge/Updated-Mar_2026-purple.svg)
![Status](https://img.shields.io/badge/Status-Active_Study_Project-green.svg)

# MCAT Study App
*Clinical Mastery Quiz System · Collin B. George*

---

## → [Launch App](https://collingeorge.github.io/MCAT/)

A standalone, offline-capable MCAT quiz app covering all seven test sections including CARS. No login. No API key. No dependencies. Works offline after first load.

Built to fill the gap between Anki (pure recall) and UWorld (full exam simulation) — fast flashcard-style MCQs and AAMC-style passage sets in one place.

---

## Question Bank

### Recall Mode — 2,549 Questions

All questions converted from the complete MileDown MCAT flashcard decks into 4-option MCQs with subject-specific distractors and explanations.

| Subject | Questions | Topics |
|---------|-----------|--------|
| Biochemistry | 465 | Amino Acids & Proteins · Enzymes · Metabolism & Regulation · Nucleotides & Nucleic Acids · Biological Membranes |
| Biology | 569 | Cell Biology & Genetics · Nervous System · Musculoskeletal · Cardiovascular & Respiratory · Endocrine & Metabolism · Immune System & Digestion |
| General Chemistry | 209 | Atomic Structure & Bonding · Thermochemistry & Equilibrium · Solutions & Acid-Base |
| Organic Chemistry | 235 | Bonding & Structure · Stereochemistry · Reactions & Mechanisms · Carbonyl Chemistry · Spectroscopy · Separations |
| Physics & Math | 258 | Motion, Forces & Energy · Fluids · Electricity & Magnetism · Waves, Sound & Light · Nuclear & Atomic Physics · Research Methods & Statistics |
| Behavioral Science | 813 | Biological Bases of Behavior · Sensation & Perception · Cognition, Learning & Memory · Emotion, Motivation & Stress · Personality, Development & Disorders · Social Psychology & Society |
| **Total** | **2,549** | |

### Passage Mode — 184 Questions across 37 Passages

AAMC-style passages with 4–5 questions each. Five passages per science subject, twelve original passages for CARS.

| Subject | Passages | Sample Topics |
|---------|----------|---------------|
| Biochemistry | 5 | PKU & Amino Acid Metabolism · Methotrexate & DHFR Kinetics · Cyanide Poisoning & ETC · Lynch Syndrome & DNA Repair · Diabetic Ketoacidosis |
| Biology | 5 | High-Altitude Acclimatization · Myasthenia Gravis & NMJ · T1DM & HPA Axis · Sickle Cell Disease · Nephrotic Syndrome |
| General Chemistry | 5 | Bicarbonate Buffer & ABGs · ATP & Thermodynamics · ETC as Electrochemical Cell · Enzyme Kinetics & Equilibrium · Osmolarity & VSEPR |
| Organic Chemistry | 5 | SN1/SN2 & Stereochemistry · Carbonyl Chemistry · Stereoisomerism in Drug Development · Spectroscopic Identification · Separations & Carboxylic Acids |
| Physics & Math | 5 | Hemodynamics & Poiseuille Flow · Cardiac Electrophysiology & Circuits · Wave Physics in Diagnostic Imaging · Radioactive Decay & Nuclear Medicine · Clinical Trial Design & Statistics |
| Behavioral Science | 5 | Neurotransmitter Systems & Psychopharmacology · Conditioning & Memory Consolidation · Social Influence & Obedience · Cognitive & Psychosocial Development · Sensory Processing & Signal Detection |
| CARS | 12 | Philosophy · History of Science · Ethics · Social Science · Literary Criticism · Political Theory · Anthropology · Philosophy of Science · Economics · Art History · Architecture · History of Scientific Instruments |

#### CARS Passages
All 12 CARS passages are original, written to AAMC difficulty. No factual knowledge required — all answers are inferrable from the passage text alone. Question types mirror the real MCAT: main idea, author's purpose, function of evidence, inference, strengthen/weaken, and structural analysis.

| # | Domain | Title |
|---|--------|-------|
| 1 | Philosophy | Determinism and the Conditions for Moral Blame |
| 2 | History of Science | Continuity and Rupture in the History of Science |
| 3 | Ethics | The Non-Identity Problem and Environmental Ethics |
| 4 | Social Science | Race as Social Construction and Biological Category |
| 5 | Literary Criticism | Unreliability, Irony, and the Reader's Position in Modern Fiction |
| 6 | Political Theory | The Justification and Limits of Civil Disobedience |
| 7 | Anthropology | Culture, Agency, and the Problem of Cultural Determinism |
| 8 | Philosophy of Science | The Asymmetry of Explanation and Prediction |
| 9 | Economics/Ethics | Meritocracy, Luck, and the Moral Limits of Market Outcomes |
| 10 | Art History | The Aesthetics of Authenticity: What Art Forgery Reveals |
| 11 | Architecture | Demolition, Preservation, and the Politics of Urban Memory |
| 12 | History of Science | The Social Life of Scientific Instruments |

---

## App Features

### Subject Selector
Accordion UI in recall mode: Subject → Topic → Subtopic with live question counts. Select any combination before starting a session. All 2,549 questions are accessible — tags are sourced directly from the question bank.

### Session Modes
- **Recall Mode** — 4-option MCQ from flashcard source material. Select 10, 20, 30, 50, or ALL questions per session.
- **Passage Mode** — Full passage with 4–5 associated questions, grouped by subject. CARS passages appear as their own group with completion tracking and score percentage per passage.

### Stats Dashboard
Five panels rendered after every session:

1. **MCAT Scaled Score** — Estimated 118–132 score with percentile, visual score bar, session time, and average seconds per question with MCAT pace indicator (1:35/q)
2. **Cumulative Performance** — Running MCAT estimate across all sessions, total questions answered, overall accuracy (persists via localStorage)
3. **Subject Breakdown** — Every subject with accuracy bar, STRONG/FAIR/WEAK badge, and sparkline trend over last 8 sessions
4. **Strengths & Improvement Areas** — Top 5 strong subjects (≥80%, ≥3 questions seen) and top 5 weak subjects (<70%)
5. **Missed Questions** — Correct answer, your answer, explanation, and time spent per miss

### Additional Features
- **Spaced repetition** — Missed questions weighted to appear more frequently in future sessions; intervals double on correct answers (capped at 30 days)
- **Question flagging** — Flag any question mid-session (F key or 🏳 icon); flagged questions reviewed in results and available as a separate drill session
- **Drill Weak Areas** — One-click mode filtering next session to lowest-scoring subjects
- **Export Missed Questions** — Downloads .txt file with all misses, explanations, and time spent
- **Keyboard shortcuts** — 1–4 to answer, Enter/Space to advance, F to flag, Escape to return home
- **Live progress bar** — Color reflects current session accuracy in real time
- **SRS due badge** — Home screen shows how many questions are due for spaced repetition review

---

## Technical

- Single `index.html` file — no framework, no build step, no dependencies
- Offline-capable after first load
- localStorage persistence for cumulative stats and passage completion
- Deployed via GitHub Pages

### Source Material
MileDown MCAT flashcard decks (tab-separated cloze-deletion `.txt` format), 5 files per subject × 6 subjects = 30 source files. Cards parsed, de-duplicated, and converted to MCQ format with subject-specific distractors. CARS passages are original content written to AAMC difficulty standards — no external source material.

---

## License

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Citation

George, C. B. (2026). *MCAT Study App.*  
https://github.com/collingeorge/MCAT

---
*For MCAT prep use only. Not affiliated with AAMC or MileDown.*
