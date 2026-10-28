[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
![Version](https://img.shields.io/badge/Version-2.6-blue.svg)
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
| **Recall** | 2,807 questions derived from the [MCAT Milesdown](https://ankiweb.net/shared/info/178384887) Anki deck, rewritten as 4-option multiple choice with explanations, including 105 Essential Equations, constants and units |
| **Passages** | 78 passages / 353 questions: 30 science passages, 24 data & reasoning sets with tables, and 24 original CARS passages |
| **Full-length** | 2 timed exams, each 230 questions: C/P 59 · CARS 53 · B/B 59 · P/S 59, with real section times and breaks |

### Recall bank by subject
| Subject | Questions |
|---|---|
| Biochemistry | 509 |
| Biology | 581 |
| General Chemistry | 228 |
| Organic Chemistry | 277 |
| Physics & Math (incl. research methods & statistics) | 284 |
| Essential Equations, constants & units | 105 |
| Psychology & Sociology | 823 |

---

## Daily recall, passages, and subject mini tests

The study plan now schedules passage work alongside recall, instead of listing only full-length exams. Home, the plan, and recall results show a recommended subject and launch buttons. The plan lists suggested passage dates for the next seven days and reserves time for the passage block and its review before setting the remaining recall budget.

1. **Build and apply together.** Start with 10 recall questions, then one existing passage in the same subject. Passage practice is available from the beginning; you do not have to master the entire bank first.
2. **Progress to a subject mini test.** The recommendation uses 20 distinct recall facts seen with at least 70% cumulative subject accuracy, plus two distinct completed passages averaging at least 70% on their latest attempts. CARS uses the passage criterion only. These are adjustable code heuristics, not validated readiness cutoffs.
3. **Simulate a short test.** A mini test combines two existing passages with up to five recall-bank discrete questions in that subject (CARS has no recall discretes). Timing follows the app's passage pace. Feedback and explanations appear at the end; the timer finishes the block automatically and counts unanswered items as misses.
4. **Reinforce and rotate.** Review explanations and use the same-subject recall button, which prioritizes review through the existing question picker. Unseen passages come first, followed by the least recently completed ones. The plan rotates subjects so strong areas do not crowd out weaker areas or CARS. A completed mini test has a seven-day recommendation cooldown.
5. **Keep the daily budget realistic.** If a mini test plus recall would exceed the selected time budget, the plan recommends one passage instead. Completed passage work is tracked separately from the recall target. The final two days schedule light review rather than a new passage block.

Mini tests reuse the existing question bank and passage sets; they do not generate new passages. Passages assigned to full-length exams are excluded from this progression to preserve those exams. Discretes remain recall evidence and passage items remain passage evidence, without claiming a scaled mini-MCAT score. Subject-level reinforcement does not imply an exact topic match between every discrete and passage.

Completed blocks and passage recency are stored on this device. An unfinished mini test is not saved; exiting asks before discarding it. The next-seven-day dates spread work across your selected number of study days; they are suggestions rather than fixed weekday appointments and update as you practice.

## How reinforcement helps you learn

The app uses adaptive practice and spaced repetition to help you retain content, distinguish similar concepts, and retrieve facts more quickly. Here, “reinforcement” means targeted study and feedback; it is not a machine-learning reinforcement-learning model or a guarantee of a higher MCAT score.

| Feature | What it does | Why it is included |
|---|---|---|
| Missed-fact loop | Re-asks a missed fact later, in another form when available, aiming for two consecutive correct answers within session limits. | Gives you another retrieval attempt after feedback instead of stopping at reading the explanation. |
| Delayed review | Schedules facts using estimated memory strength, confidence, correctness, and answer time. | Checks retention beyond the current session; two immediate successes do not establish long-term mastery. |
| Final-two practice | Before feedback, asks which other answer you considered. Shows whether the correct answer was in your final two. | Separates eliminating the correct answer too early from choosing the wrong option after narrowing it down. |
| Concept comparison | When a selected wrong answer or runner-up matches another recall concept, provides its definition and can add a related recall question. | Helps you identify the distinction between concepts you confuse. Matching definitions are available only where the question bank supports them. |
| Uncertain-correct reinforcement | Rechecks correct recall answers with a runner-up, guesses, uncertainty, or slow responses, subject to session limits. | A correct selection can still hide uncertainty. |
| Different question forms | Uses applied scenarios, reverse definitions, and individual blanks where available. | Practices the underlying idea across wording and contexts. |
| Mixed-topic practice | Interleaves topics and prioritizes due facts and weak areas. | Makes you choose the relevant concept instead of relying on a block of identical problems. |
| Confidence and mistake review | Tracks confidence, mistake types, and confused pairs; supports short self-explanations. | Helps you choose whether to review content, reasoning, reading, calculations, or pacing. |
| Speed drills and passages | Times learned facts and passage practice. | Builds retrieval fluency and makes pacing problems visible. |

### Using the final-two prompt

1. Select your main answer.
2. At the bottom of the question, optionally select the other answer you seriously considered, or leave **No other answer / skip**.
3. In recall and passage practice, select **Submit answer** to reveal feedback.
4. Compare your two choices with the explanation. In full-length exams, feedback waits until post-exam review.

Progress shows **correct answer shortlisted** and **correct choice when shortlisted** for the most recent 1,000 recall and passage attempts that include a runner-up. Full-length runner-ups are saved with the exam for review. Recording a runner-up does not award partial credit or change the score.

The app checks whether the correct answer is among your choices; it does not automatically rate every distractor's scientific closeness. Two choices can both sound plausible while only one satisfies the question.

### Getting this update

Open or refresh the [live app](https://collingeorge.github.io/MCAT/) while online. The service worker fetches current files and keeps an offline copy; this release also changes the cache version so older cached assets are replaced. If an already-open tab still shows the previous flow, close and reopen it, or use **Ctrl+Shift+R** (Windows) / **Cmd+Shift+R** (Mac). Previously cached offline copies need an online visit to receive the update. Refreshing preserves progress stored in the same browser; clearing site data erases it.

---

## Features

- **Final-two practice.** Select your answer, optionally record the other option you considered, then submit before feedback appears. Review whether the correct answer made your shortlist and compare the two concepts. Recall sessions reinforce uncertain correct answers and matching alternative concepts. Progress tracks shortlisting and choosing correctly separately, without changing scores. Full-length exams save runner-ups for post-exam review; older saved exams remain compatible.

- **Smart Session (adaptive).** One button builds a session around you:
  - questions you're about to forget, with confident mistakes first;
  - your weakest high-yield topics;
  - new material, weighted by how much of the MCAT each subject covers.

  Questions are pitched near 80% predicted success: easier when you're struggling, harder when you're cruising. Topics are mixed so the same one never runs back to back. If you miss a question, a related question from the same topic follows shortly after, and the missed fact comes back a few questions later, asked a different way when possible. Each question says why it was chosen.
- **Memory model.** This is a simplified FSRS-style model that replaced the old fixed intervals. Each question's memory strength and difficulty update from whether you were right, how sure you were, and how long you took. Each card comes back when your chance of recalling it drops to about 90%.
- **Confidence ratings.** After each answer, tap Guessed, Unsure or Knew it (keys G / U / K). A lucky guess isn't counted as mastery, and a wrong answer you were sure of is prioritized.
- **Drill until it sticks (mastery loop).** In every study session, a question you miss keeps coming back a few questions later until you answer it correctly twice in a row. It's asked in a different form each time when one exists. Facts that are still shaky at the end of a session become top priority for your next review.
- **Repeat shaky answers.** If you got it right but guessed, weren't sure, or took a long time, the question comes back once later in the session to confirm it stuck.
- **Learn from your wrong choice.** If the answer you picked is the answer to a different question (for example, picking *transformation* when the answer was *transduction*), the explanation tells you what your choice actually means. That other question then comes up next, so you learn to tell the two apart.
- **Asked a different way.** There are 3,957 ways to ask the 2,807 facts:
  - 327 high-yield facts have a hand-written **applied** version: a clinical or lab scenario, a prediction ("what happens if…"), or a NOT/EXCEPT question. Recalling a definition is not the same as using it, and the MCAT asks you to use it;
  - 565 definition questions can be reversed: the app shows the term and asks which description fits, with wrong answers drawn from definitions in the same topic;
  - multi-blank questions can be asked one blank at a time, with the other blanks filled in.

  Facts you've missed before come back in a different form when they're due, so you can't pass by recognizing the wording.
- **Data & reasoning sets.** 24 original experiments with data tables (4 per science discipline, plus psychology and sociology) test the AAMC's scientific reasoning skills: predicting from data (Skill 2), research design, controls and confounds (Skill 3), and reading trends, calculations and statistics (Skill 4). Each question shows the skill it tests.
- **Pacing.** Passage mode shows your time against the AAMC pace (about 95 seconds per science question and 102 per CARS question), and the results show whether you were on pace and which questions ran long.
- **⚡ Speed drill.** 20 facts you've already learned, 20 seconds each. A timeout counts as a miss, so slow facts come back for review. The Score report shows your median recall time per subject: fast recall leaves more time for passage reasoning.
- **Explain it.** After a miss you can write one sentence on why the right answer is right. Self-explanation turns a mistake into understanding, and your notes appear in the mistake log for review before an exam.
- **Study-habit nudges.** A break reminder after 45 minutes of continuous study, and an evidence-based study tip on each results screen.
- **Recall first (optional).** Hide the answer choices until you've thought of the answer (Space to reveal). Producing an answer from memory builds stronger retention than recognizing it in a list.
- **Mistake log.** After a miss, tap why: didn't know it, mixed it up, misread, calculation slip, or ran out of time. The Score report shows your patterns overall and by subject, your most-confused pairs (for example transduction ↔ transformation), and targeted advice. Passage mode is included.
- **Confidence calibration.** Shows how often your "Knew it", "Unsure" and "Guessed" answers are actually right in each subject, and flags where you're overconfident (the costliest pattern) or underconfident.
- **Study plan to your test date.** Enter your MCAT date, study days per week, and daily time. The app then:
  - spreads unseen material over your study days up to a final review phase;
  - sets a daily question target (new plus due), and sizes the Smart Session to what's left for today;
  - tracks whether you're on pace;
  - schedules full-length exams: this app's two first, then the AAMC's four official exams weekly in the final month, always at least 3 days apart.
- **AAMC content categories.** Every psychology and sociology question is tagged individually to its AAMC content category (6A–10A); science questions use their topic's primary category (1A–5E, plus scientific reasoning skills). The map shows coverage, mastery and a one-click drill per category, and lists categories that recall questions don't cover.
- **Study your exam mistakes.** Full-length exams don't adapt while you take them, just like the real MCAT. Afterward, one click builds a reinforcement session from the subjects you missed, weighted by how many you missed in each.
- **Topic mastery map.** Every subtopic is rated as weak, building, solid or mastered, with the next recommended focus. Ratings weigh harder questions more and recent answers most.
- **Shuffled answers.** Choice order is randomized every time, so you learn the content, not the letter position.
- **Teaching explanations.** Each explanation says why the answer is right and usually why the tempting wrong answer is wrong.
- **Topic selector.** Pick a subject, a topic, or any mix of the 82 subtopics, with live question counts.
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

## Security, reliability, and learning review

The October 28, 2026 review fixed HTML rendering, saved-data warnings, final-review scheduling, expired-exam resumes, recall-speed measurement, immediate-repeat memory inflation, mini-test review, and offline-cache handling. See [the audit report](docs/AUDIT-2026-10-28.md) for scope, checks, and limitations. A subsequent [editorial follow-up](docs/EDITORIAL-2026-10-28.md) resolved all 35 warnings: the full-bank validator now reports **0 errors and 0 warnings**. CI rejects new warnings, and tests verify that real answer cues are still detected.

- Text is escaped before supported bold/cloze formatting. The page limits resource loading with a content security policy; inline event handlers still require an inline-script allowance.
- Browser storage failures now produce a visible warning. Saved preferences are normalized, and invalid top-level saved-data shapes fall back safely. This is not exhaustive validation of every nested saved record.
- A plan's final-review window stays anchored to its original start date. Calendar calculations use civil dates rather than elapsed 24-hour periods across daylight-saving changes.
- Within-day repeats increase estimated memory stability by at most 10% per correct repetition. This conservative heuristic avoids treating immediate familiarity as delayed retention; it is not a clinically or psychometrically calibrated model.
- Mini-test review includes the passage and any figure. Missed discrete questions lead the next reinforcement session, supplemented with same-subject practice.
- Offline updates are restricted to known app assets. Cache cleanup preserves unrelated app caches, and cache-write failures do not discard an available network response.

The MCAT assesses scientific knowledge, problem solving, and reasoning before medical school; this app is not a clinical competency assessment. Retrieval and distributed practice have research support, but this app's exact thresholds, timing rules, and score estimates have not been validated as a package. Repeated-item accuracy can overstate transfer; use fresh passages and official full-lengths as additional evidence.

## Content quality

In October 2026 the full bank (every recall question, passage and exam item) was audited against the current AAMC content outline, DSM-5-TR and current physiology. The audit led to these changes:
- **Factual errors and wrong keys fixed** across all modes. Examples: ADH lowers plasma osmolarity; oxytocin causes milk ejection while prolactin drives production; standard conditions are 298 K; pH = pKa at half-equivalence.
- **Multi-blank cards completed** (about 360): the key now fills every blank.
- **Distractors rebuilt** so all four choices are plausible and from the same topic, without capitalization or length giveaways.
- **Explanations rewritten** for every recall question.
- **CARS:** both exams use 9 passages and 53 questions, as on the real test. Answer keys are no longer the longest choice by default.
- Sleep staging uses N1/N2/N3/REM, and psychiatric terms follow DSM-5-TR.
- **Follow-up review (v2.6):** every item flagged for a subject-matter check was resolved against references (Lehninger, Kaplan, the AAMC outline, primary literature). 15 were corrected, for example the PNH "nocturnal" stem, oxide solubility exceptions, and mismatch-repair timing. Where the standard MCAT-prep answer simplifies the science, the explanation now says so.

Found something that still looks wrong? Use **Report a problem** under the explanation, or [open an issue](https://github.com/collingeorge/MCAT/issues).

---

## Project structure

```
index.html            App shell
css/styles.css        Styles
js/app.js             Quiz, passages, exams, spaced repetition, stats and plan integration
js/study-path.js      Subject progression, passage scheduling and timed mini tests
data/                 Question data, one file per subject or exam section
  qb-*.js             Recall questions  {s: tag, aamc?, q, choices[4], ans, exp}
  qb-variants-*.js    Applied variants, linked to a recall question by its exact tag + stem  {ofTag, of, kind, q, choices, ans, exp}
  passages-*.js       Passage-mode passages  {id, title, topic, passage, figure?, questions[]}  (data sets: questions carry skill: 'SIRS 2'–'SIRS 4')
  exam1.js, exam2-*.js, exams.js   Full-length exam sections and definitions
sw.js, manifest.webmanifest, icon.svg   Offline support / installable app
tools/validate.html   Data checker (structure, duplicate choices, broken cloze keys, letter references, giveaways)
tools/serve.ps1       Tiny local web server for development
```

### Testing study progression

Run `node tools/test-study-path.cjs`, `node tools/test-final-two.cjs`, `node tools/test-audit.cjs`, `node tools/test-editorial.cjs`, and `node tools/check-content.cjs`. GitHub Actions runs these on Windows and Linux. A Linux Chrome smoke test (`node tools/test-browser.cjs`, Node 22+ and Chrome required) also checks actual page loading and interactions. The progression integration test loads the real question and passage data with a simulated DOM and checks readiness, subject matching, time budgets, deferred feedback, timeout scoring, persistence, and repeat-completion guards. It does not replace browser visual testing.

### Editing questions
1. Edit the relevant file in `data/`. When revising an existing recall stem, retain its original text in `idStem` so saved memory, flags, and exact-stem variant links keep their identity; do not change an existing `idStem`. Keep the `s:` tag (it drives the topic selector). `ans` is the 0-based index of the correct choice; order doesn't matter, because choices are shuffled when shown.
2. Don't refer to choices by letter in explanations, since the letters change.
3. Run a local server and open the validator:
   ```
   pwsh -File tools/serve.ps1
   ```
   Then open http://localhost:8080/tools/validate.html and fix anything listed under **Errors**.
4. When you deploy, bump `CACHE` in `sw.js` so returning visitors get the update.

---

## Source material
The recall questions are derived from the [**MCAT Milesdown** Anki deck by MileDown](https://ankiweb.net/shared/info/178384887) (AnkiWeb shared deck 178384887, 2,884 cloze notes, last updated May 2020). They were converted to multiple choice and substantially edited for accuracy. Credit for the original cards belongs to their creator, and MileDown is not affiliated with this project. All passages, CARS passages, data sets (fictional studies), applied variants and full-length exam items are original.

## Privacy
The app collects no personal information. There are no accounts and no analytics, ads or tracking cookies. Progress is stored only in your browser's local storage on your own device, and you can erase it from **Score report → Reset all progress**. The site is hosted on GitHub Pages, which may keep standard server logs under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). "Report a problem" opens a **public** GitHub issue.

## Disclaimers
For MCAT study only. This is not medical, clinical or psychological advice. Content is provided as is, and errors are possible. Score estimates are study aids, not predictions of official scores. The full text is on the app's **About & disclaimers** page.

## License
The app's code and original content are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to share and adapt with attribution, but not for commercial use. Third-party material, including the original MileDown cards, remains subject to its owners' terms.

## Citation
George, C. B. (2026). *MCAT Study App* (Version 2.6). https://github.com/collingeorge/MCAT

---
*For MCAT practice only. MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC), which does not endorse this project. Not affiliated with the AAMC or MileDown.*
