[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
![Version](https://img.shields.io/badge/Version-2.17-blue.svg)
![Last Updated](https://img.shields.io/badge/Updated-Nov_2026-purple.svg)

# MCAT Study App
*Recall · Passages · Full-length exams · Collin B. George*

## → [Launch App](https://mcat.collinbgeorge.com/)

A free MCAT practice app that runs in the browser with no build step. Guest study works without an account; optional email/password accounts save progress to the cloud for recovery on other devices. After the first visit, study content works offline and the app can be installed from the browser menu. Offline changes sync after reconnection.

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

## TODAY › Start here: one ordered daily checklist

The first card on the home page, directly under the account bar, is the day's routine. It is recomputed every day from your calendar (test date, study days per week, daily time). The cards that used to share the home page (priorities, weekly readiness, the recall → passage → mini-test path, Smart Session) remain below it as reference.

**Every study day, in this order.** Each step shows a count, estimated minutes, a Start button and a ✓ when done.

1. **Yesterday's missed recall.** Facts answered wrong on your previous *study* day (not calendar day), grouped by subject, shown regardless of the spaced-review schedule. Misses that were never revisited carry forward for up to 14 days.
2. **Yesterday's missed passage questions.** Review mode: reread the passage and explanation and write one line on why the answer is right (saved to the mistake log's "Explain it" note). Not scored and not counted as a first exposure.
3. **Due reviews.** Everything the memory model says is due.
4. **New facts.** Today's quota, weak topics first, then weighted by the app's MCAT content shares.
5. **New passages.** About 3 a day (1 CARS + 2 science), preferring the subject of your top weak topic. Use **I did an external passage** (subject, source, questions, correct) for AAMC Section Bank/Question Packs, UWorld and others; first exposures count toward the target and repeats do not.
6. **Close-out.** X vs. Y comparisons for the day's mix-ups.

**Pacing rules** (planning heuristics, not validated readiness thresholds):

| Rule | How it is computed |
|---|---|
| New facts | `ceil(unseen facts / remaining new-fact days)`. Remaining new-fact days are study days before the final 21-day window, excluding rest, full-length and review days. |
| App passages | `ceil(unseen app passages / remaining passage days)`. The six non-exam CARS passages are spaced at one every `floor(days / unseen CARS)` study days so they last. Daily target = max(3, app passages); the shortfall is external. |
| Full-lengths | Six, capped: **AAMC Sample Test** as the baseline diagnostic at the end of week 2, **this app's Full-Length 1** halfway to the final month, then **AAMC Practice Exams 1–4** weekly in the final month, the last one 7 days before the test. Long plans stretch the early gaps instead of adding exams; the app's Full-Length 2 is listed as an optional extra. The card lists every date. AAMC exams are taken on aamc.org and marked done when you record their scores under Official results. A full-length day replaces the checklist; the next day is a review day (that exam's misses, then due reviews). A missed full-length rolls forward to your next non-rest day until the next slot's window opens. |
| Final 21 days | No new facts unless bank coverage is incomplete; 4 timed passages a day (5 with a 3-hour budget); a weekly full-length. |
| Missed days | Remaining work is redistributed over the remaining days. An unfinished quota from the last planned day is shown as **Carried over** and added to today. |
| Over budget | Steps 1–3 stay intact and steps 4–5 stay at the pace that finishes on time. The card shows **Behind pace: +X min/day needed, or move your test date** instead of shrinking the quotas. |

The 18 passages used in the app's two full-length exams are not scheduled as daily practice, so those exams stay unseen. Completion state and external passage logs sync with your account like other progress. The pacing function is `computeDailyPlan()` in `js/daily-plan.js`; `node tools/test-daily-plan.cjs` checks 90- and 120-day calendars, the six-exam full-length line-up, missed days and carry-over.

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
| Alternative-answer reflection | After an incorrect answer, optionally asks which other answer you considered. | Supports comparison with the correct answer; this retrospective response is not a validated closeness measure. |
| Concept comparison | When a submitted wrong answer or another option considered after a mistake matches another recall concept, provides its definition and can add a related recall question. | Helps you identify the distinction between concepts you confuse. Matching definitions are available only where the question bank supports them. |
| Uncertain-correct reinforcement | Rechecks correct recall answers with guesses, uncertainty, or slow responses, subject to session limits. | A correct selection can still hide uncertainty. |
| Different question forms | Uses applied scenarios, reverse definitions, and individual blanks where available. | Practices the underlying idea across wording and contexts. |
| Mixed-topic practice | Interleaves topics and prioritizes due facts and weak areas. | Makes you choose the relevant concept instead of relying on a block of identical problems. |
| Confidence and mistake review | Tracks confidence, mistake types, and confused pairs; supports short self-explanations. | Helps you choose whether to review content, reasoning, reading, calculations, or pacing. |
| Speed drills and passages | Times learned facts and passage practice. | Builds retrieval fluency and makes pacing problems visible. |

### Reflecting after an incorrect answer

1. Select an answer to submit it immediately.
2. Correct answers proceed directly to normal confidence/review controls, without an alternative-answer prompt or closeness analysis.
3. After an incorrect recall or tutor-passage answer, optionally answer **Which other answer were you considering?** below the feedback. Compare it with the explanation.
4. Timed mini tests and full-lengths show the prompt only for incorrect submitted answers during post-test review.

The dashboard counts retrospective mistake reflections and how often the recorded alternative was correct. It does not award partial credit or claim to measure scientific closeness. Changing or clearing a reflection updates that attempt rather than adding duplicates. Older before-feedback records are retained but excluded from this new reflection metric; correct-answer alternatives are not analyzed.

### Getting this update

Open or refresh the [live app](https://mcat.collinbgeorge.com/) while online. The service worker fetches current files and keeps an offline copy; this release also changes the cache version so older cached assets are replaced. If an already-open tab still shows the previous flow, close and reopen it, or use **Ctrl+Shift+R** (Windows) / **Cmd+Shift+R** (Mac). Previously cached offline copies need an online visit to receive the update. Refreshing preserves browser progress. Clearing site data removes local copies; confirmed cloud progress can be restored by signing in.

---

## Personalized next steps and honest progress

Home now combines demonstrated weak topics, missing practice evidence, and recent mix-ups. It provides direct actions for targeted recall, concept comparison, a CARS baseline, and underrepresented science subjects. Passage recommendations modestly prefer matching topic metadata when available, while still protecting full-length passages and allowing broad practice. The daily passage assignment stays stable and is completed only by matching work in that subject; another subject's passage cannot complete CARS.

New facts and review attempts are counted separately. Repeating a fact does not add new coverage. Existing answers are retained, but earlier attempts cannot be retroactively classified into the new daily split. Once both daily recall goals are met, another Smart Session is labeled optional. Content-coverage pace does not establish exam readiness. Smart Sessions reserve room for sparse subjects as well as due and weak material.

No full-length diagnostic recorded here? The plan adds a baseline within the next week, when time allows, rather than postponing all diagnostics to the final six weeks. Review the result to adjust study priorities, consistent with [AAMC study-plan guidance](https://students-residents.aamc.org/prepare-mcat-exam/creating-your-mcat-exam-study-plan). Thresholds and rankings remain study heuristics, not score guarantees.

## Features

- **Always-visible Home navigation.** Every page away from Home has a top-left **← Home** button that stays visible while scrolling. It uses the normal exit behavior: active full-length exam progress is saved, and an unfinished mini test asks before being discarded.

- **Incorrect-answer reflection.** Selecting an answer submits immediately. Only after a mistake, optionally record the other answer you considered and compare it with the explanation. Timed tests defer this to review; correct answers skip this process.

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
  - recommends an early baseline diagnostic if none is recorded, followed by later full-length milestones and selected official practice exams. An external diagnostic can be marked reviewed without entering a score.
- **AAMC content categories.** Every psychology and sociology question is tagged individually to its AAMC content category (6A–10A); science questions use their topic's primary category (1A–5E, plus scientific reasoning skills). The map shows coverage, mastery and a one-click drill per category, and lists categories that recall questions don't cover.
- **Study your exam mistakes.** Full-length exams don't adapt while you take them, just like the real MCAT. Afterward, one click builds a reinforcement session from the subjects you missed, weighted by how many you missed in each.
- **Topic mastery map.** Every subtopic is rated as weak, building, solid or mastered, with the next recommended focus. Ratings weigh harder questions more and recent answers most.
- **Shuffled answers.** Choice order is randomized every time, so you learn the content, not the letter position.
- **Teaching explanations.** Each explanation says why the answer is right and usually why the tempting wrong answer is wrong.
- **Topic selector.** Pick a subject, a topic, or any mix of the 82 subtopics, with live question counts.
- **Flagging.** Flag any question (F key) and review all flagged questions later from the home screen.
- **Drill weak topics.** One click drills every weak topic. Every feature uses the same definition: at least 5 attempts and under 80% correct, ranked by how far below 80% and by MCAT content yield.
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

A section estimate needs at least 15 answers in each eligible subject, with those subjects representing at least 70% of the section weighting. This is an evidence threshold, not 70% syllabus completion.

Percentile ranks are the [AAMC tables in effect May 1, 2026 – April 30, 2027](https://www.aamc.org/services/mcat-admissions-officers/resources/percentile-ranks). All scaled scores are **estimates**: the AAMC equates each test form separately, so use them to track progress, not to predict a test-day score.

---

## Address

The app is served from its own subdomain, **https://mcat.collinbgeorge.com/**. Old `collinbgeorge.com/study/mcat/…` and `collingeorge.github.io/MCAT/…` links redirect there. A separate origin keeps this app's study data and login session isolated from every other site on the same domain. Progress saved to your account restores when you sign in at the new address; guest progress saved only in a browser stays on the old address. See `deploy/README.md` for the cut-over steps.

## Security, reliability, and learning review

The October 28, 2026 review fixed HTML rendering, saved-data warnings, final-review scheduling, expired-exam resumes, recall-speed measurement, immediate-repeat memory inflation, mini-test review, and offline-cache handling. See [the audit report](docs/AUDIT-2026-10-28.md) for scope, checks, and limitations. A subsequent [editorial follow-up](docs/EDITORIAL-2026-10-28.md) resolved all 35 warnings: the full-bank validator now reports **0 errors and 0 warnings**. CI rejects new warnings, and tests verify that real answer cues are still detected.

- Text is escaped before supported bold/cloze formatting. The content security policy is `script-src 'self'`: no inline script, no `eval`, and no third-party script origin.
  - Buttons and inputs carry `data-click` / `data-input` / `data-change` / `data-submit` / `data-enter` actions instead of inline handlers. `js/actions.js` runs only allowlisted functions with literal arguments, so injected markup cannot run code.
  - The Supabase SDK is self-hosted in `vendor/`, pinned by an SRI hash and precached (see `vendor/README.md`); the app loads no script from a CDN.
  - `connect-src` is pinned to this app's Supabase project. The custom-domain proxy also sends `frame-ancestors 'none'`, `X-Frame-Options: DENY` and `nosniff`; a meta-tag CSP cannot block framing, and GitHub Pages cannot send these headers.
  - Score and exam records from synced data are type-checked when read, so planted markup renders as nothing.
  - Styles are `style-src 'self'` as well. Computed bar widths, score-marker positions and score colors use `data-css`, applied by `js/data-css.js` through the CSSOM. Only `width`/`left` percentages and `background`/`color` theme variables are accepted, so injected markup cannot cover or restyle the page.
- Shared computers: **Sign out and remove from this device** deletes the account's cached copy, but only after everything has synced.
- Speed: the parsed memory record and the daily plan are cached until storage changes, subject recommendations are scored once per subject, cloud saves are batched (and flushed when the tab is hidden), and guests do not download the Supabase SDK until they sign in.
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
js/daily-plan.js      TODAY checklist: pure pacing (computeDailyPlan) and its card
js/actions.js         Delegated, allowlisted UI actions (strict CSP: no inline handlers)
js/data-css.js        Allowlisted computed styles (strict CSP: no inline styles)
js/account.js         Optional Supabase account and cloud progress sync
vendor/               Self-hosted, SRI-pinned third-party code (Supabase SDK)
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

Run `node tools/test-study-path.cjs`, `node tools/test-final-two.cjs`, `node tools/test-audit.cjs`, `node tools/test-editorial.cjs`, `node tools/test-learning-guide.cjs`, and `node tools/check-content.cjs`. GitHub Actions runs these on Windows and Linux. A Linux Chrome smoke test (`node tools/test-browser.cjs`, Node 22+ and Chrome required) also checks actual page loading and interactions. The progression integration test loads the real question and passage data with a simulated DOM and checks readiness, subject matching, time budgets, deferred feedback, timeout scoring, persistence, and repeat-completion guards. It does not replace browser visual testing.

Run every suite with `for f in tools/test-*.cjs tools/check-content.cjs; do node "$f" || break; done`. Beyond the feature tests:

- **`test-fuzz.cjs`**: seeded fuzzing that writes malformed values (wrong types, nulls, markup, prototype keys) into every synced storage key and renders 16 screens per round. A failure prints the seed; reproduce it with `FUZZ_SEED=<n> node tools/test-fuzz.cjs`.
- **`test-plan-properties.cjs`**: hundreds of random calendars and student behaviors (`PLAN_SEED`, `PLAN_CASES`) must keep the planner's rules: step order, integer counts, at most 6 well-spaced full-lengths ending 7 days out, passage targets and carry-over limits. Every calendar shape with a content phase finishes the bank before the final 21 days when followed exactly.
- **`test-actions.cjs`**: strict CSP (no inline script or style), the action and style allowlists, SRI on the vendored SDK, and a repository secret scan.
- **`test-browser.cjs`** (real Chrome): clicks under the strict CSP with zero policy violations, the double-tap guard, lazy SDK loading, and offline use after the service worker has cached the app.
- **`test-daily-plan.cjs`**: also enforces an efficiency budget. One home render parses the large memory record at most once, and a repeat render not at all.

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
Guest progress stays on this browser. Optional accounts use Supabase Auth for email/password authentication, and signed-in progress is stored with Supabase. The app does not store passwords in study data. There are no analytics, ads or tracking cookies. **Reset all progress** clears the active copy and queues the cleared copy for cloud sync; clearing browser storage alone does not remove cloud data. Account deletion requests must go to the project owner through a private channel, not a public GitHub issue. The site is hosted on GitHub Pages, which may keep standard server logs under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). "Report a problem" opens a **public** GitHub issue.

## Disclaimers
For MCAT study only. This is not medical, clinical or psychological advice. Content is provided as is, and errors are possible. Score estimates are study aids, not predictions of official scores. The full text is on the app's **About & disclaimers** page.

## License
The app's code and original content are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to share and adapt with attribution, but not for commercial use. Third-party material, including the original MileDown cards, remains subject to its owners' terms.

## Citation
George, C. B. (2026). *MCAT Study App* (Version 2.6). https://github.com/collingeorge/MCAT

---
*For MCAT practice only. MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC), which does not endorse this project. Not affiliated with the AAMC or MileDown.*

## Learning evidence and weekly readiness

The home page and score report separate first-exposure passage performance from repeated practice and show three next actions. Error labels distinguish knowledge gaps, confused concepts, passage interpretation, misreading, calculation, and timing; the summary offers specific repair advice. Recommendations also consider recent delayed-recall misses without treating sparse data as established weakness.

Delayed recall is measured only when at least 72 hours have passed since the previous exposure. Immediate retries remain practice. The recall mastery count now requires model stability of at least 21 days and two consecutive successful delayed checks; an incorrect response resets this streak. Guessed correct responses do not advance it. The 72-hour, two-check, and stability thresholds are transparent product heuristics, not validated MCAT readiness cutoffs or measured retention probabilities. Earlier records are not retroactively credited with delayed checks.

Passage exposure is saved when a passage or mini test starts, including abandoned work. Older completed passages are treated as previously exposed. First-exposure results describe completed passage sets; repeated work stays useful for practice. Tutor answer time excludes feedback review and is not interchangeable with uninterrupted exam timing. No statistical comparison or improvement claim is inferred from small samples or different passage difficulty.

Students may record AAMC scored practice exam dates and four section scores. The benchmark shows the latest three timed, first-attempt results (average, observed range, and lowest section average), while retaining retakes and untimed results separately. Data are self-reported; signed-in users can sync them to their private account. Unscored sample percentages must not be converted into official scores. App recall estimates are never silently adjusted to these results; there is no validated score calibration model or guaranteed test-day prediction. Duplicate first attempts are rejected. All official results can be cleared independently, or with Reset all progress.

Research supports retrieval practice and delayed assessment in general; it does not validate this app or prove faster learning or increased intelligence: [Roediger & Karpicke, 2006, original study](https://pubmed.ncbi.nlm.nih.gov/16507066/). MCAT raw-to-scaled conversions depend on test-form equating: [AAMC scoring explanation](https://students-residents.aamc.org/mcat-scores/how-mcat-exam-scored). Use [official AAMC practice products](https://students-residents.aamc.org/prepare-mcat-exam/practice-mcat-exam-official-low-cost-products) alongside this app.

Run `node tools/test-learning-evidence.cjs` for the delayed-retention, exposure, official-result validation, escaping, duplicate, exclusion, and reset regressions.

## Linked study pages

Use `recall.html`, `passages.html`, `exams.html`, `score-report.html`, and `about.html` for direct links. The persistent MCAT menu supports normal links, opening new tabs, and browser Back/Forward. Passage selection uses a validated public passage ID in the URL. Answers never go in URLs; guest data remain browser-local and signed-in data can sync privately. Active sessions and results have distinct URLs, but reloading a transient recall/passage session returns to setup rather than silently starting a new attempt. Exam attempts remain resumable through the existing saved-progress flow; completed exam review links work only where the attempt is saved.

After editing `index.html`, run `node tools/generate-pages.cjs` to refresh the ten static entry pages. Run `node tools/test-pages.cjs` to verify route behavior.

## Visible study timer and breaks

A steady timer bar shows today’s visible study time, time per subject, the current study block, and time until a suggested break. Choose a 25-, 45- or 60-minute block. These are adjustable planning suggestions, not validated optimal study durations. Recall and passage explanations count; home/configuration pages, hidden tabs, browser sleep, and explicit breaks do not. Time is attributed to the current question’s subject, including mixed science sessions. Totals are browser-local and reset each local calendar day; refresh retains accrued time, without crediting time while the page was closed. Multiple tabs are not combined into a cross-device time record.

When a block is due, finish the recall set, passage, or mini test before resting. Full-length exam guidance points to the existing scheduled section break; the tracker never pauses or changes assessment clocks. At a stopping point, choose a 5- or 10-minute break; the countdown remains visible and study time stays paused until Resume or a new question begins. The timer is a visible-page activity estimate, not a measurement of attention. Reset all progress also clears timer totals.

## Email/password accounts and cloud recovery

Supabase Auth handles credentials, email confirmation, PKCE callbacks, session renewal and password recovery. `js/cloud-config.js` contains only the browser-safe project URL and publishable key. The pinned Supabase JavaScript SDK is loaded over HTTPS from jsDelivr; it and Supabase receive ordinary connection metadata. Never add a database password, SMTP password, secret API key or service-role key to this repository.

Apply `supabase/schema.sql` to install owner-only row-level reads and the authenticated save function. Anonymous clients have no progress-table permissions. The save function uses `auth.uid()` and a revision compare-and-swap under a transaction lock; the client cannot choose another student's owner ID. Configure only exact production auth redirects, require email confirmation, set a strong password policy, and use a verified custom SMTP sender. Supabase's default mailer is limited to team addresses and is not sufficient for public student signups.

Each account has a separate device cache. Signing in does not automatically upload guest work from a shared browser. A student explicitly chooses cloud restore, the account's device copy, or guest import. Counters are not naively merged across devices. If another device has saved a newer revision, automatic upload stops and asks which copy to keep. Previous account cache snapshots are backed up locally before import. Shared devices should be signed out and site data cleared when appropriate; browser caches are not encrypted by this app.

Study changes save locally first and queue a cloud snapshot after a short debounce. The visible save status distinguishes device-only, pending, saving, saved and conflict states. Offline work stays on the device and retries on reconnect or Sync now. A normal shutdown should preserve browser storage, but browser clearing, private browsing, device loss and unsynced changes can still cause loss. Only successfully confirmed cloud saves can be restored on another device. Full-length state remains resumable; transient recall and tutor-passage positions are not promised to resume.

The cloud snapshot includes study history, memory scheduling, flags, preferences, study plans, official practice results, estimates and timers; it excludes auth session tokens and passwords. Snapshots are limited to 2 MB; oversized or failed uploads retain the device copy and show a failure. Resetting signed-in study progress queues a cleared snapshot; account/auth deletion remains a project-owner operation in Supabase and cascades to the progress row. Keep server backups and review provider quotas before promising availability.

Verification: `node tools/test-account.cjs` covers explicit guest import, account isolation, offline recovery, revision conflicts, cloud restore, sign-out and credential exclusion. Live signup, email verification, recovery and a second-device restore must also be checked against the configured project before claiming the service is fully operational. See [Supabase password authentication](https://supabase.com/docs/guides/auth/passwords), [row-level security](https://supabase.com/docs/guides/database/secure-data), [publishable keys](https://supabase.com/docs/guides/getting-started/api-keys), and [SMTP requirements](https://supabase.com/docs/guides/auth/auth-smtp).
