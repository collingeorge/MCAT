[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
![Version](https://img.shields.io/badge/Version-2.18-blue.svg)
![Last Updated](https://img.shields.io/badge/Updated-Nov_2026-purple.svg)

# MCAT Study App
*TODAY · AAMC Prep · Passages · Full-length exams · Collin B. George*

## → [Launch App](https://mcat.collinbgeorge.com/)

A free MCAT practice app that runs in the browser with no build step. Guest study works without an account; optional email/password accounts save progress to the cloud for recovery on other devices. After the first visit, study content works offline and the app can be installed from the browser menu. Offline changes sync after reconnection.

---

## What's inside

Only four kinds of content, all tied to the AAMC materials:

| Content | What it is |
|---|---|
| **AAMC Prep · QBank cards** | Original questions written from the concepts tested in the AAMC question packs and question bank (Biology, Chemistry, Physics, CARS, the Independent Question Bank), plus the Universal Rules cards and the 33 AAMC test-concept chemistry cards. No AAMC text. |
| **AAMC Prep · Practice Exam cards** | 354 guided cards, one per concept tested on the AAMC C/P Sample Test and practice exams (Practice Exams 1, 3, 4, 5, 6), each with a step-by-step lesson. Original wording. |
| **Chem/Phys passages** | Original passages written to the AAMC C/P blueprint: a 59-question Chem/Phys Diagnostic, six 30-question daily quizzes, and 36 practice passages (144 questions) for the Passages tab. |
| **Full-length** | 2 timed exams, each 230 questions: C/P 59 · CARS 53 · B/B 59 · P/S 59, with real section times and breaks. |

The app's earlier recall decks (Anki-derived), their generated variants and the app-written practice passages were removed in November 2026. Saved progress from them stays in storage (ignored, never wiped).

## TODAY › Section mastery

The first card on the home page is the day's routine, one MCAT section at a time (C/P first, then B/B, then P/S):

First, once per section: the **diagnostic**, a full C/P section (59 questions, 95 minutes, exam order). Retake it any time. Then every day, exactly three steps:

1. **50 flashcards**: AAMC QBank cards only, split exactly by AAMC content-category weight (5D 12, 5E 8, 4E 7, 5A 5, 4D 4, 4C 4, 4B 3, 5B 3, 4A 2, 5C 2), in the AAMC discipline mix over the whole day.
2. **50 guided Practice Exam cards**, each with its step-by-step lesson, in the same exact split.
3. **30-question quiz** from the six daily sets: half a C/P section in exam order, unseen sets first. It unlocks when steps 1 and 2 are done.

After the quiz: **done for today** at the goal (128 by default), otherwise **work on what you missed**: flashcards and guided cards on the quiz's weak categories, missed and due cards first.

Reaching the goal on two separate days in a row moves the path to the next section. Scaled scores use the app's raw-to-scaled table: an estimate, not an AAMC score. A collapsible **Test date & full-length calendar** schedules the full-length exams.

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
  - `connect-src` allows only this app's Supabase project and `https://api.pwnedpasswords.com` (for the breached-password check). The Cloudflare Worker `mcat-security-headers` adds `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and HSTS on `mcat.collinbgeorge.com`; a meta-tag CSP cannot block framing, and GitHub Pages cannot send headers. See `deploy/README.md` for the deployment, the yearly certificate check and rollback.
  - Score and exam records from synced data are type-checked when read, so planted markup renders as nothing.
  - Styles are `style-src 'self'` as well. Computed bar widths, score-marker positions and score colors use `data-css`, applied by `js/data-css.js` through the CSSOM. Only `width`/`left` percentages and `background`/`color` theme variables are accepted, so injected markup cannot cover or restyle the page.
- Shared computers: **Sign out and remove from this device** deletes the account's cached copy, but only after everything has synced.
- Breached passwords: new passwords are checked against HaveIBeenPwned before an account is created or a password is changed. Only a 5-character hash prefix leaves the browser (k-anonymity). Known-breached passwords are refused, and an existing breached password triggers a warning after sign-in. This is an app-side check: it protects people using the app, but the Supabase API itself does not enforce it, so someone calling Supabase directly could skip it.
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
js/app.js             Card quizzes, passages, exams, stats and score report
js/mastery.js         TODAY › Section mastery: the daily plan (pure masteryPlan) and its card
js/study-path.js      Timed test runner shared by the diagnostic and quizzes
js/daily-plan.js      Test date and full-length calendar
                      Large banks (Practice Exam cards, the C/P diagnostic and quiz sets, passage guides) load on
                      demand: BANKS / ensureBank in js/app.js; the service worker caches them for offline use
js/actions.js         Delegated, allowlisted UI actions (strict CSP: no inline handlers)
js/data-css.js        Allowlisted computed styles (strict CSP: no inline styles)
js/account.js         Optional Supabase account and cloud progress sync
vendor/               Self-hosted, SRI-pinned third-party code (Supabase SDK)
data/                 Question data, one file per subject or exam section
  qb-aamc-*.js        AAMC Prep cards: QBank packs, Universal Rules, Practice Exam cards (qb-aamc-fl.js)
  cp-diagnostic.js, cp-pool.js, cp-practice.js   Chem/Phys Diagnostic, daily quizzes, practice passages
  passages-cars.js    The full-length exams' CARS passages
  structures.js       RDKit drawings (generated by tools/draw-structures.py; ~1.7 MB, loaded only when a drawing is shown)
  exam1.js, exam2-*.js, exams.js   Full-length exam sections and definitions
sw.js, manifest.webmanifest, icon.svg   Offline support / installable app
tools/validate.html   Data checker (structure, duplicate choices, broken cloze keys, letter references, giveaways)
tools/serve.ps1       Tiny local web server for development
```

### Testing study progression

Run `node tools/test-mastery.cjs`, `node tools/test-study-path.cjs` (TODAY's passage step in the real app code), `node tools/test-cp-diagnostic.cjs`, `node tools/test-final-two.cjs`, `node tools/test-audit.cjs`, `node tools/test-editorial.cjs`, `node tools/test-learning-guide.cjs`, and `node tools/check-content.cjs`. GitHub Actions runs these on Windows and Linux. A Linux Chrome smoke test (`node tools/test-browser.cjs`, Node 22+ and Chrome required) also checks actual page loading and interactions. The integration tests load the real data with a simulated DOM. They do not replace browser visual testing.

Run every suite with `for f in tools/test-*.cjs tools/check-content.cjs; do node "$f" || break; done`. Beyond the feature tests:

- **`test-fuzz.cjs`**: seeded fuzzing that writes malformed values (wrong types, nulls, markup, prototype keys) into every synced storage key and renders 16 screens per round. A failure prints the seed; reproduce it with `FUZZ_SEED=<n> node tools/test-fuzz.cjs`.
- **`test-plan-properties.cjs`**: hundreds of random calendars and student behaviors (`PLAN_SEED`, `PLAN_CASES`) must keep the planner's rules: step order, integer counts, at most 6 well-spaced full-lengths ending 7 days out, passage targets and carry-over limits. Every calendar shape with a content phase finishes the bank before the final 21 days when followed exactly.
- **`test-actions.cjs`**: strict CSP (no inline script or style), the action and style allowlists, SRI on the vendored SDK, and a repository secret scan.
- **`test-browser.cjs`** (real Chrome): clicks under the strict CSP with zero policy violations, the double-tap guard, lazy SDK loading, and offline use after the service worker has cached the app.
- **`test-daily-plan.cjs`**: also enforces an efficiency budget. One home render parses the large memory record at most once, and a repeat render not at all.

### Editing questions
1. Edit the relevant file in `data/`. When revising an existing card stem, retain its original text in `idStem` so saved memory and flags keep their identity; do not change an existing `idStem`. Keep the `s:` tag (it drives the topic selector). `ans` is the 0-based index of the correct choice; order doesn't matter, because choices are shuffled when shown.
2. Don't refer to choices by letter in explanations, since the letters change.
3. Run a local server and open the validator:
   ```
   pwsh -File tools/serve.ps1
   ```
   Then open http://localhost:8080/tools/validate.html and fix anything listed under **Errors**.
4. When you deploy, bump `CACHE` in `sw.js` so returning visitors get the update.

---

## Source material
All questions, passages and exam items are original to this app. The AAMC Prep cards and the Chem/Phys passages are written from the concepts the AAMC practice materials test; no AAMC passages, questions or answer choices are reproduced.

## Privacy
Guest progress stays on this browser. Optional accounts use Supabase Auth for email/password authentication, and signed-in progress is stored with Supabase. The app does not store passwords in study data. When you create an account or set a new password, and once after each sign-in, the first 5 characters of the password's SHA-1 hash are sent to HaveIBeenPwned (`api.pwnedpasswords.com`, served by Cloudflare) to check for known breaches; the password and its full hash never leave the device, and nothing else is sent. There are no analytics, ads or tracking cookies. **Reset all progress** clears the active copy and queues the cleared copy for cloud sync; clearing browser storage alone does not remove cloud data. Account deletion is self-service: signed-in users choose **Delete my account and cloud data** in the account panel and type DELETE to confirm. This permanently removes the Supabase account and its synced progress (`delete_my_account()` in `supabase/schema.sql`) along with this device's copy. Never put passwords or private study records in a public GitHub issue. The site is hosted on GitHub Pages, which may keep standard server logs under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Visits to mcat.collinbgeorge.com pass through Cloudflare, which adds the security headers, before reaching GitHub Pages. Cloudflare keeps its own standard request logs, such as IP address and requested URL. "Report a problem" opens a **public** GitHub issue.

## Disclaimers
For MCAT study only. This is not medical, clinical or psychological advice. Content is provided as is, and errors are possible. Score estimates are study aids, not predictions of official scores. The full text is on the app's **About & disclaimers** page.

## License
The app's code and original content are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to share and adapt with attribution, but not for commercial use.

## Citation
George, C. B. (2026). *MCAT Study App* (Version 2.6). https://github.com/collingeorge/MCAT

---
*For MCAT practice only. MCAT® is a registered trademark of the Association of American Medical Colleges (AAMC), which does not endorse this project. Not affiliated with the AAMC.*

## Learning evidence and weekly readiness

The home page and score report separate first-exposure passage performance from repeated practice and show three next actions. Error labels distinguish knowledge gaps, confused concepts, passage interpretation, misreading, calculation, and timing; the summary offers specific repair advice. Recommendations also consider recent delayed-recall misses without treating sparse data as established weakness.

Delayed recall is measured only when at least 72 hours have passed since the previous exposure. Immediate retries remain practice. The recall mastery count now requires model stability of at least 21 days and two consecutive successful delayed checks; an incorrect response resets this streak. Guessed correct responses do not advance it. The 72-hour, two-check, and stability thresholds are transparent product heuristics, not validated MCAT readiness cutoffs or measured retention probabilities. Earlier records are not retroactively credited with delayed checks.

Passage exposure is saved when a passage or mini test starts, including abandoned work. Older completed passages are treated as previously exposed. First-exposure results describe completed passage sets; repeated work stays useful for practice. Tutor answer time excludes feedback review and is not interchangeable with uninterrupted exam timing. No statistical comparison or improvement claim is inferred from small samples or different passage difficulty.

Students may record AAMC scored practice exam dates and four section scores. The benchmark shows the latest three timed, first-attempt results (average, observed range, and lowest section average), while retaining retakes and untimed results separately. Data are self-reported; signed-in users can sync them to their private account. Unscored sample percentages must not be converted into official scores. App recall estimates are never silently adjusted to these results; there is no validated score calibration model or guaranteed test-day prediction. Duplicate first attempts are rejected. All official results can be cleared independently, or with Reset all progress.

Research supports retrieval practice and delayed assessment in general; it does not validate this app or prove faster learning or increased intelligence: [Roediger & Karpicke, 2006, original study](https://pubmed.ncbi.nlm.nih.gov/16507066/). MCAT raw-to-scaled conversions depend on test-form equating: [AAMC scoring explanation](https://students-residents.aamc.org/mcat-scores/how-mcat-exam-scored). Use [official AAMC practice products](https://students-residents.aamc.org/prepare-mcat-exam/practice-mcat-exam-official-low-cost-products) alongside this app.

Run `node tools/test-learning-evidence.cjs` for the delayed-retention, exposure, official-result validation, escaping, duplicate, exclusion, and reset regressions.

## Linked study pages

Use `passages.html`, `exams.html`, `aamc.html`, `score-report.html`, and `about.html` for direct links. Old `recall.html` links still work and open Overview. The persistent MCAT menu supports normal links, opening new tabs, and browser Back/Forward. Passage selection uses a validated public passage ID in the URL. Answers never go in URLs; guest data remain browser-local and signed-in data can sync privately. Active sessions and results have distinct URLs, but reloading a transient recall/passage session returns to setup rather than silently starting a new attempt. Exam attempts remain resumable through the existing saved-progress flow; completed exam review links work only where the attempt is saved.

After editing `index.html`, run `node tools/generate-pages.cjs` to refresh the ten static entry pages. Run `node tools/test-pages.cjs` to verify route behavior.

## Visible study timer and breaks

A steady timer bar shows today’s visible study time, time per subject, the current study block, and time until a suggested break. Choose a 25-, 45- or 60-minute block. These are adjustable planning suggestions, not validated optimal study durations. Recall and passage explanations count; home/configuration pages, hidden tabs, browser sleep, and explicit breaks do not. Time is attributed to the current question’s subject, including mixed science sessions. Totals are browser-local and reset each local calendar day; refresh retains accrued time, without crediting time while the page was closed. Multiple tabs are not combined into a cross-device time record.

When a block is due, finish the recall set, passage, or mini test before resting. Full-length exam guidance points to the existing scheduled section break; the tracker never pauses or changes assessment clocks. At a stopping point, choose a 5- or 10-minute break; the countdown remains visible and study time stays paused until Resume or a new question begins. The timer is a visible-page activity estimate, not a measurement of attention. Reset all progress also clears timer totals.

## Email/password accounts and cloud recovery

Supabase Auth handles credentials, email confirmation, PKCE callbacks, session renewal and password recovery. `js/cloud-config.js` contains only the browser-safe project URL and publishable key. The Supabase JavaScript SDK (2.118.0) is self-hosted in `vendor/` and loaded from the app's own origin, pinned by an SRI hash (see `vendor/README.md`); no CDN is involved. Supabase receives ordinary connection metadata. Never add a database password, SMTP password, secret API key or service-role key to this repository.

Apply `supabase/schema.sql` to install owner-only row-level reads and the authenticated save function. Anonymous clients have no progress-table permissions. The save function uses `auth.uid()` and a revision compare-and-swap under a transaction lock; the client cannot choose another student's owner ID. Configure only exact production auth redirects, require email confirmation, set a strong password policy, and use a verified custom SMTP sender. Supabase's default mailer is limited to team addresses and is not sufficient for public student signups.

Each account has a separate device cache. Signing in does not automatically upload guest work from a shared browser. A student explicitly chooses cloud restore, the account's device copy, or guest import. Counters are not naively merged across devices. If another device has saved a newer revision, automatic upload stops and asks which copy to keep. Previous account cache snapshots are backed up locally before import. Shared devices should be signed out and site data cleared when appropriate; browser caches are not encrypted by this app.

Study changes save locally first and queue a cloud snapshot about 45 seconds after the last change (exam progress and the study timer are uploaded when the page is hidden or closed and at the end of each section or session). The visible save status distinguishes device-only, pending, saving, saved and conflict states. Offline work stays on the device and retries on reconnect or Sync now. A normal shutdown should preserve browser storage, but browser clearing, private browsing, device loss and unsynced changes can still cause loss. Only successfully confirmed cloud saves can be restored on another device. Full-length state remains resumable; transient recall and tutor-passage positions are not promised to resume.

The cloud snapshot includes study history, memory scheduling, flags, preferences, study plans, official practice results, estimates and timers; it excludes auth session tokens and passwords. Snapshots are limited to 2 MB; oversized or failed uploads retain the device copy and show a failure. Resetting signed-in study progress queues a cleared snapshot; account/auth deletion remains a project-owner operation in Supabase and cascades to the progress row. Keep server backups and review provider quotas before promising availability.

Verification: `node tools/test-account.cjs` covers explicit guest import, account isolation, offline recovery, revision conflicts, cloud restore, sign-out and credential exclusion. Live signup, email verification, recovery and a second-device restore must also be checked against the configured project before claiming the service is fully operational. See [Supabase password authentication](https://supabase.com/docs/guides/auth/passwords), [row-level security](https://supabase.com/docs/guides/database/secure-data), [publishable keys](https://supabase.com/docs/guides/getting-started/api-keys), and [SMTP requirements](https://supabase.com/docs/guides/auth/auth-smtp).
