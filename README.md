[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
![Version](https://img.shields.io/badge/Version-2.2-blue.svg)
![Last Updated](https://img.shields.io/badge/Updated-Oct_2026-purple.svg)

# MCAT Study App
*Recall · Passages · Full-length exams · Collin B. George*

## → [Launch App](https://collingeorge.github.io/MCAT/)

A free MCAT practice app that runs in the browser: no login, no API key, no build step. After the first visit it works offline and can be installed as an app from the browser menu. Progress is saved on your device.

It sits between Anki (pure recall) and UWorld (full exam simulation). You get fast recall questions with spaced repetition, AAMC-style passage sets with explanations, and timed full-length practice exams.

---

## What's inside

| Mode | Content |
|---|---|
| **Recall** | 2,549 questions derived from the [MCAT Milesdown](https://ankiweb.net/shared/info/178384887) Anki deck, rewritten as 4-option multiple choice with explanations |
| **Passages** | 54 passages / 257 questions: 30 science passages and 24 original CARS passages |
| **Full-length** | 2 timed exams, each 230 questions: C/P 59 · CARS 53 · B/B 59 · P/S 59, with real section times and breaks |

### Recall bank by subject
| Subject | Questions |
|---|---|
| Biochemistry | 465 |
| Biology | 569 |
| General Chemistry | 209 |
| Organic Chemistry | 235 |
| Physics & Math (incl. research methods & statistics) | 258 |
| Psychology & Sociology | 813 |

---

## Features

- **Spaced repetition.** Every answer updates a Leitner-style schedule (review after 0 → 1 → 3 → 7 → 16 → 35 days). Sessions show due reviews first, then questions you haven't seen. The home screen shows how many are due.
- **Shuffled answers.** Choice order is randomized every time, so you learn the content, not the letter position.
- **Teaching explanations.** Each explanation says why the answer is right and usually why the tempting wrong answer is wrong.
- **Topic selector.** Pick a subject, a topic, or any mix of the 80 subtopics, with live question counts.
- **Flagging.** Flag any question (F key) and review all flagged questions later from the home screen.
- **Drill weak topics.** One click drills every topic where you're below 70% after at least 5 attempts.
- **Progress dashboard.** Shows all-time accuracy, questions seen, questions mastered, accuracy by subject, your weakest and strongest topics, and your exam history.
- **Full-length exams that behave like test day:**
  - Section timers that submit automatically at 0:00, plus optional 10/30/10-minute breaks.
  - Passage on the left and question on the right on wide screens.
  - "Mark for review", plus a navigator grid of answered, unanswered and marked questions before you end a section.
  - No feedback until you finish. Then you get section scores and an estimated total, AAMC percentile ranks, and a full answer review you can filter to incorrect or marked questions.
  - Progress is saved, so you can leave and resume (the timer pauses).
- **Keyboard shortcuts:** `1–4` / `A–D` to answer, `Enter` for the next question, `F` to flag. In exams, `←/→` to move between questions and `M` to mark.
- **Report a problem.** Every explanation has a link that opens a pre-filled GitHub issue.

### MCAT score report
The **Score report** (home screen) estimates your MCAT the way the AAMC builds it:

- **Section scores (118–132) and total (472–528)** with a ± range and AAMC percentile ranks.
- **Section estimates follow the AAMC's published content shares:**

  | Section | Content |
  |---|---|
  | C/P | 30% general chemistry, 25% physics, 25% biochemistry, 15% organic chemistry, 5% biology |
  | B/B | 65% biology, 25% biochemistry, 5% general chemistry, 5% organic chemistry |
  | P/S | 65% psychology, 30% sociology, 5% biology |
  | CARS | Reading and reasoning only |

- **Score by subject.** Every discipline gets an MCAT-equivalent score (118–132) from all your answers. Full-length questions count 3×, passage questions 2×, and recall questions 1× on a stricter curve, because single-fact recall is easier than MCAT items. Research methods and statistics are shown as a separate skill.
- **Full-length results** break each section down by subject, by passage vs. standalone questions, and by pace against AAMC timing.
- **Trend chart** of your estimated total over time.
- **Section-weighted practice.** The C/P, B/B, P/S and All-sciences mixes draw recall questions in real section proportions. With "All", a session is 59 questions, like a real section.

A section needs at least 15 answers in each subject it counts, and at least 70% of its content covered, before it gets a score.

Percentile ranks are the [AAMC tables in effect May 1, 2026 – April 30, 2027](https://www.aamc.org/services/mcat-admissions-officers/resources/percentile-ranks). All scaled scores are **estimates**: the AAMC equates each test form separately, so use them to track progress, not to predict a test-day score.

---

## Content quality

In October 2026 the full bank (every recall question, passage and exam item) was audited against the current AAMC content outline, DSM-5-TR and current physiology. The audit led to these changes:
- **Factual errors and wrong keys fixed** across all modes. Examples: ADH lowers plasma osmolarity; oxytocin causes milk ejection while prolactin drives production; standard conditions are 298 K; pH = pKa at half-equivalence.
- **Multi-blank cards completed** (about 360): the key now fills every blank.
- **Distractors rebuilt** so all four choices are plausible and from the same topic, without capitalization or length giveaways.
- **Explanations rewritten** for every recall question.
- **CARS:** both exams use 9 passages and 53 questions, as on the real test. Answer keys are no longer the longest choice by default.
- Sleep staging uses N1/N2/N3/REM, and psychiatric terms follow DSM-5-TR.

Found something that still looks wrong? Use **Report a problem** under the explanation, or [open an issue](https://github.com/collingeorge/MCAT/issues).

---

## Project structure

```
index.html            App shell
css/styles.css        Styles
js/app.js             All app logic (quiz, passages, exams, spaced repetition, stats)
data/                 Question data, one file per subject or exam section
  qb-*.js             Recall questions  {s: tag, q, choices[4], ans, exp}
  passages-*.js       Passage-mode passages  {id, title, topic, passage, questions[]}
  exam1.js, exam2-*.js, exams.js   Full-length exam sections and definitions
sw.js, manifest.webmanifest, icon.svg   Offline support / installable app
tools/validate.html   Data checker (structure, duplicate choices, broken cloze keys, letter references, giveaways)
tools/serve.ps1       Tiny local web server for development
```

### Editing questions
1. Edit the relevant file in `data/`. Keep the `s:` tag (it drives the topic selector). `ans` is the 0-based index of the correct choice; order doesn't matter, because choices are shuffled when shown.
2. Don't refer to choices by letter in explanations, since the letters change.
3. Run a local server and open the validator:
   ```
   pwsh -File tools/serve.ps1
   ```
   Then open http://localhost:8080/tools/validate.html and fix anything listed under **Errors**.
4. When you deploy, bump `CACHE` in `sw.js` so returning visitors get the update.

---

## Source material
The recall questions are derived from the [**MCAT Milesdown** Anki deck by MileDown](https://ankiweb.net/shared/info/178384887) (AnkiWeb shared deck 178384887, 2,884 cloze notes, last updated May 2020). They were converted to multiple choice and substantially edited for accuracy. Credit for the original cards belongs to their creator, and MileDown is not affiliated with this project. All passages, CARS passages and full-length exam items are original.

## Privacy
The app collects no personal information. There are no accounts and no analytics, ads or tracking cookies. Progress is stored only in your browser's local storage on your own device, and you can erase it from **Score report → Reset all progress**. The site is hosted on GitHub Pages, which may keep standard server logs under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). "Report a problem" opens a **public** GitHub issue.

## Disclaimers
For MCAT study only. This is not medical, clinical or psychological advice. Content is provided as is, and errors are possible. Score estimates are study aids, not predictions of official scores. The full text is on the app's **About & disclaimers** page.

## License
The app's code and original content are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to share and adapt with attribution, but not for commercial use. Third-party material, including the original MileDown cards, remains subject to its owners' terms.

## Citation
George, C. B. (2026). *MCAT Study App* (Version 2.2). https://github.com/collingeorge/MCAT

---
*For MCAT practice only. MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC), which does not endorse this project. Not affiliated with the AAMC or MileDown.*
