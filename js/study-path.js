// Subject progression uses transparent study heuristics, not validated MCAT cutoffs.
function miniAnswer(chosen, other, ms) {
  if (pq.answered) return;
  pq.answered = true;
  const view = pq.views[pq.idx];
  pq.results.push({ view, chosen, other, right: chosen === view.ans, ms });
  view.choices.forEach((_, i) => { $('pc-' + i).disabled = true; });
  $('pp-next').innerHTML = '<p class="muted-note">Answer recorded. Feedback follows the complete mini test.</p><button class="next-btn" id="pp-next-btn" data-click="nextPassageQ()">' + (pq.idx + 1 === pq.views.length ? 'Finish mini test' : 'Next question →') + '</button>';
  $('pp-next-btn').focus({ preventScroll: true });
}
function logStudyWork(subj, kind, correct, total) {
  const history = store.get(KEYS.studyPath, []);
  history.push({ t: Date.now(), day: localDay(), subj, kind, correct, total });
  store.set(KEYS.studyPath, history.slice(-500));
}
function finishSubjectMini() {
  setTimeout(() => window.McatAccount?.flush?.(), 0);
  const mini = pq.mini;
  if (!mini || mini.completed) return;
  mini.completed = true;
  stopPassageTimer(); 
  if (typeof document !== 'undefined' && document.body) document.body.classList.remove('exam-mode');
  // A timed-out test includes all unattempted items as misses, once.
  for (let i = pq.results.length; i < pq.views.length; i++) pq.results.push({ view: pq.views[i], chosen: null, other: null, right: false, ms: 0 });
  store.batch(() => {
  const ps = store.get(KEYS.passages, {});
  pq.results.forEach((r, i) => {
    const item = mini.items[i];
    countAnswerToday();
    // Keep this as passage/recall evidence, not a validated full-length score.
    if (item.passage) {
      recordEvidence('passage', disciplineOfPassage(item.passage, r.view.q), r.right);
      if (r.view.q.skill) recordEvidence('skill', r.view.q.skill, r.right);
    } else {
      // Test-only stand-alones (the C/P diagnostic and quizzes) have no flashcard behind them: no recall stats or memory.
      if (r.view.q.key) {
      const stats = store.get(KEYS.stats, {}), q = r.view.q, row = stats[q.key] || { c: 0, t: 0 };
      row.t++; if (r.right) row.c++; stats[q.key] = row; store.set(KEYS.stats, stats);
      if(r.chosen!=null)updateMemory(q, r.right, r.other == null ? null : 'unsure', r.ms);
      }
    }
    if (!r.right) logError({ id: r.view.q.id || 'mini_' + mini.subj + '#' + i, disc: mini.mastery ? (item.passage ? disciplineOfPassage(item.passage, r.view.q) : disciplineOfRecall(r.view.q)) : mini.subj, key: item.passage ? null : r.view.q.key, type: 'unlabeled', chosen: r.chosen == null ? '(unanswered)' : r.view.choices[r.chosen], answer: r.view.choices[r.view.ans], src: 'mini' });
  });
  mini.passages.forEach(p => {
    const results = pq.results.filter((_, i) => mini.items[i].passage?.id === p.id);
    recordPassageEvidence(p, results, mini.firstExposures[p.id], 'mini');
    const score = pct(results.filter(r => r.right).length, results.length), prev = ps[p.id] || { attempts: 0, best: 0 };
    ps[p.id] = { attempts: prev.attempts + 1, last: score, best: Math.max(prev.best, score), lastAt: Date.now() };
  });
  store.set(KEYS.passages, ps);
  });
  const correct = pq.results.filter(r => r.right).length, total = pq.results.length;
  logStudyWork(mini.subj, 'mini', correct, total);
  $('pp-fill').style.width = '100%'; $('pp-passage-box').innerHTML = '';
  $('pp-score').textContent = '✓ ' + correct + '/' + total;
  const reviewHtml = pq.results.map((r, i) => { const source = mini.items[i].passage; return (source && (i === 0 || mini.items[i - 1].passage?.id !== source.id) ? '<details class="results-card"><summary>Review passage: ' + esc(source.title) + '</summary>' + passageCard(source.topic || '', source.title, source.passage, source.figure, source.scheme) + '</details>' : '') + reviewItem({ stem: r.view.q.q, choices: r.view.choices, ans: r.view.ans, chosen: r.chosen, other: r.other, exp: r.view.q.exp, otherHandler: 'setMiniReviewAlternative.bind(null,'+i+')', otherId: 'mini-other-'+i, tag: 'Q' + (i + 1), passageTitle: mini.items[i].passage?.title, twin: r.view.q.twin }); }).join('');
  if (mini.mastery) { $('pp-question-box').innerHTML = masteryFinishTest(mini, pq.results) + '<div class="results-card"><div class="section-label">Review every question</div></div>' + reviewHtml; snapshotEstimate(); return; }
  $('pp-question-box').innerHTML = '<div class="results-hero"><div class="r-label">Subject mini test complete</div><div class="score-pct">' + pct(correct, total) + '%</div><div class="score-sub">' + correct + '/' + total + ' · ' + esc(DISCIPLINES[mini.subj]) + ' · ' + fmtTime(Date.now() - pq.startedAt) + '</div></div><div class="results-card"><p>Review the explanations, then drill recall in this subject before the next passage. This mini test is practice, not a scaled MCAT score.</p><div class="btn-row">' + (mini.subj === 'cars' ? '' : '<button class="new-quiz-btn" data-click="leaveMiniForRecall()">Reinforce this subject</button>') + '<button class="new-quiz-btn secondary" data-click="goHome()">Home</button></div></div>' + reviewHtml;
  snapshotEstimate();
}
function leaveMiniForRecall() {
  if (!pq.mini?.completed) return;
  const subj = pq.mini.subj;
  const missed = pq.results.filter((r, i) => !r.right && !pq.mini.items[i].passage).map(r => r.view.q);
  const unique = [...new Map(missed.map(q => [q.baseId || q.id, q])).values()];
  const ids = new Set(unique.map(q => q.baseId || q.id));
  const extra = pickQuestions(QB.filter(q => disciplineOfRecall(q) === subj && !ids.has(q.id)), Math.max(0, 10 - unique.length));
  pq.mini = null;
  if (subj !== 'cars' && unique.length + extra.length) beginQuiz([...unique, ...extra], DISCIPLINES[subj] + ' · reinforce mini test');
}


