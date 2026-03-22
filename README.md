[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
![Version](https://img.shields.io/badge/Version-Active_Development-blue.svg)
![Last Updated](https://img.shields.io/badge/Updated-Mar_2026-purple.svg)
![Status](https://img.shields.io/badge/Status-Active_Study_Project-green.svg)

# MCAT Study App
*Clinical Mastery Quiz System · Collin B. George*

---

## → [Launch App](https://collingeorge.github.io/MCAT/)

A standalone, offline-capable MCAT quiz app covering all six test sections. No login. No API key. No dependencies. Works offline after first load.

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

### Passage Mode — 124 Questions across 30 Passages

AAMC-style clinical passage sets with 4 questions each. Five passages per subject, covering high-yield integrative reasoning topics.

| Subject | Passages | Sample Topics |
|---------|----------|---------------|
| Biochemistry | 5 | PKU & Amino Acid Metabolism · Methotrexate & DHFR Kinetics · Cyanide Poisoning & ETC · Lynch Syndrome & DNA Repair · Diabetic Ketoacidosis |
| Biology | 5 | High-Altitude Acclimatization · Myasthenia Gravis & NMJ · T1DM & HPA Axis · Sickle Cell Disease · Nephrotic Syndrome |
| General Chemistry | 5 | Bicarbonate Buffer & ABGs · ATP & Thermodynamics · ETC as Electrochemical Cell · Enzyme Kinetics & Equilibrium · Osmolarity & VSEPR |
| Organic Chemistry | 5 | SN1/SN2 & Stereochemistry · Carbonyl Chemistry · Stereoisomerism in Drug Development · Spectroscopic Identification · Separations & Carboxylic Acids |
| Physics & Math | 5 | Hemodynamics & Poiseuille Flow · Cardiac Electrophysiology & Circuits · Wave Physics in Diagnostic Imaging · Radioactive Decay & Nuclear Medicine · Clinical Trial Design & Statistics |
| Behavioral Science | 5 | Neurotransmitter Systems & Psychopharmacology · Conditioning & Memory Consolidation · Social Influence & Obedience · Cognitive & Psychosocial Development · Sensory Processing & Signal Detection |

---

## App Features

### Subject Selector
Three-level accordion in recall mode: Subject → Topic → Subtopic chips with live question counts. Select any combination of subjects before starting a session. Physics & Math topics and flat Organic Chemistry topics render as direct ON/OFF toggles.

### Session Modes
- **Recall Mode** — 4-option MCQ from flashcard source material. Select 10, 20, 30, 50, or ALL questions per session.
- **Passage Mode** — Full clinical passage with 4 associated questions, grouped by subject with completion tracking and score percentage per passage.

### Stats Dashboard
Five panels rendered after every session:

1. **MCAT Scaled Score** — Estimated 118–132 score mapped from raw % using AAMC B/B section piecewise linear distribution, with percentile ranking and visual score bar
2. **Cumulative Performance** — Running MCAT estimate across all sessions, total questions answered, overall accuracy (persists via localStorage)
3. **Subject Breakdown** — Every subject with accuracy bar and STRONG / FAIR / WEAK badge
4. **Strengths & Improvement Areas** — Top 5 strong subjects (≥80%, ≥3 questions seen) and top 5 weak subjects (<70%)
5. **Missed Questions** — Subject label, correct answer, and your answer for every miss this session

### Drill Weak Areas
One-click mode that auto-filters the next session to your lowest-scoring subjects only.

---

## Technical

- Single `index.html` file — no framework, no build step, no dependencies
- Offline-capable after first load
- localStorage persistence for cumulative stats and passage completion
- Deployed via GitHub Pages

### Source Material
MileDown MCAT flashcard decks (tab-separated cloze-deletion `.txt` format), 5 files per subject × 6 subjects = 30 source files. Cards parsed, de-duplicated, and converted to MCQ format with subject-specific distractors.

---

## License

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Citation

George, C. B. (2026). *MCAT Study App.*  
https://github.com/collingeorge/MCAT

---
*For MCAT prep use only. Not affiliated with AAMC or MileDown.*
