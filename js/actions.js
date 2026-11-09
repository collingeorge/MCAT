/* Delegated UI actions. The Content-Security-Policy forbids inline script, so markup names
   an action instead of carrying code: data-click / data-input / data-change / data-submit /
   data-enter="fn(1,'a')". Only allowlisted functions run, with literal arguments (numbers,
   quoted strings, true/false/null) or this.value / this.checked. Nothing is evaluated. */
(() => {
  'use strict';
  const ACTIONS = new Set([
    // navigation and sessions
    'goHome', 'setMode', 'startSession', 'showAbout', 'showPlan', 'savePlan', 'clearPlan', 'showProgress', 'resetProgress', 'exportMissed',
    'startSmartSession', 'startDueReview', 'startFlagged', 'drillWeak', 'startSpeedDrill', 'retryMissed', 'drillCategory',
    'setCount', 'setMix', 'setRecallFirst', 'toggleSubjectOpen', 'setSubjectKeys', 'sgSelectAll', 'sgClearAll',
    // AAMC Question Bank Flashcards section
    'setAamcCount', 'setAamcChip', 'aamcSelectAll',
    // recall quiz
    'pick', 'revealChoices', 'setConfidence', 'setErrType', 'setPendingNote', 'setWrongAlternative', 'nextQ', 'endQuiz', 'flagCurrent',
    // passages and mini tests
    'selectPassage', 'startPassage', 'answerPassage', 'nextPassageQ', 'nextPassage', 'setPassageErr', 'setMiniReviewAlternative', 'leaveMiniForRecall',
    'startSubjectWork', 'startSubjectRecall', 'startWeakTopic', 'startMissingSubject', 'startRetentionRepair', 'showConfusionReview', 'startConfusionDrill',
    // full-length exams
    'startExam', 'abandonExam', 'beginSection', 'examPick', 'examNav', 'jumpTo', 'toggleMark', 'openSectionReview', 'confirmEndSection', 'continueAfterBreak',
    'openLastExamReview', 'setExamReview', 'setExamReviewAlternative', 'studyExamMistakes', 'recordExternalDiagnostic',
    // official scores and study timer
    'showOfficialScores', 'saveOfficialScore', 'clearOfficialScores', 'setStudyTimerGoal', 'startStudyBreak', 'resumeStudyTimer',
    // TODAY plan
    'startYesterdayMisses', 'startPassageMissReview', 'savePassageMissNote', 'startDailyNewFacts', 'startDailyPassage', 'logExternalPassage',
    'startDailyCloseout', 'startPlannedFullLength', 'logExternalFullLength', 'deferFullLength', 'startFullLengthReview', 'completeFullLengthReview',
    // account
    'McatAccount.action', 'McatAccount.choose', 'McatAccount.sync', 'McatAccount.logout', 'McatAccount.logoutAndForget', 'McatAccount.deleteAccount', 'McatAccount.open',
  ]);
  const NAME = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?$/;
  // Split on a separator outside quoted strings.
  function split(text, sep) {
    const out = []; let cur = '', quote = null;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quote) { cur += ch; if (ch === '\\') cur += text[++i] ?? ''; else if (ch === quote) quote = null; }
      else if (ch === '"' || ch === "'") { quote = ch; cur += ch; }
      else if (ch === sep) { out.push(cur); cur = ''; }
      else cur += ch;
    }
    if (quote) throw Error('Unterminated string');
    out.push(cur);
    return out.map(s => s.trim());
  }
  function parseArg(raw) {
    if (/^-?\d+(\.\d+)?$/.test(raw)) return { value: Number(raw) };
    if (raw === 'true' || raw === 'false') return { value: raw === 'true' };
    if (raw === 'null') return { value: null };
    if (raw === 'this.value' || raw === 'this.checked') return { prop: raw.slice(5) };
    const q = /^(['"])([\s\S]*)\1$/.exec(raw);
    if (q) return { value: q[2].replace(/\\(.)/g, '$1') };
    throw Error('Unsupported argument: ' + raw);
  }
  const cache = new Map();
  function parse(text) {
    if (cache.has(text)) return cache.get(text);
    const steps = split(text, ';').filter(Boolean).map(st => {
      if (st === 'return false' || st === 'event.preventDefault()') return { prevent: true };
      if (st === 'event.stopPropagation()') return { stop: true };
      const m = /^([^()]+)\(([\s\S]*)\)$/.exec(st);
      if (!m || !NAME.test(m[1].trim()) || !ACTIONS.has(m[1].trim())) throw Error('Action not allowed: ' + st);
      return { name: m[1].trim(), args: m[2].trim() ? split(m[2], ',').map(parseArg) : [] };
    });
    cache.set(text, steps);
    return steps;
  }
  // Runs one element's action; returns whether propagation to outer actions should stop.
  function run(el, attr, event) {
    let steps;
    try { steps = parse(el.getAttribute(attr)); } catch (e) { console.error('Blocked UI action', e.message); return true; }
    let stop = false;
    for (const st of steps) {
      if (st.prevent) { event.preventDefault(); continue; }
      if (st.stop) { stop = true; continue; }
      const fn = st.name.split('.').reduce((o, k) => (o == null ? undefined : o[k]), window);
      if (typeof fn !== 'function') { console.error('Unknown UI action', st.name); return true; }
      const owner = st.name.includes('.') ? window[st.name.split('.')[0]] : window;
      fn.apply(owner, st.args.map(a => ('prop' in a ? el[a.prop] : a.value)));
    }
    return stop;
  }
  const disabled = el => el.matches(':disabled') || !!el.closest('[aria-disabled="true"]');
  document.addEventListener('click', event => {
    // A double-click/tap is one intent: its second click would land on the next question's choices.
    if (event.detail > 1) return;
    let el = event.target instanceof Element ? event.target.closest('[data-click]') : null;
    // Nested actions bubble like the old inline handlers unless one calls event.stopPropagation().
    while (el) {
      if (!disabled(el) && run(el, 'data-click', event)) break;
      el = el.parentElement ? el.parentElement.closest('[data-click]') : null;
    }
  });
  for (const type of ['input', 'change']) {
    document.addEventListener(type, event => {
      const el = event.target instanceof Element ? event.target.closest('[data-' + type + ']') : null;
      if (el && !disabled(el)) run(el, 'data-' + type, event);
    });
  }
  document.addEventListener('submit', event => {
    const form = event.target instanceof Element ? event.target.closest('[data-submit]') : null;
    if (form) { event.preventDefault(); run(form, 'data-submit', event); }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const el = event.target instanceof Element ? event.target.closest('[data-enter]') : null;
    if (el) run(el, 'data-enter', event);
  });
  window.McatActions = { ACTIONS, parse };
})();
