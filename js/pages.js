/* Static HTML page routes. No answers or personal study data are put in URLs. */
(() => {
  'use strict';
  if (typeof history === 'undefined' || !location.pathname) return;
  const titles = {index:'Overview',recall:'Recall',passages:'Passages',exams:'Full-length exams','score-report':'Score report',about:'About & sources','recall-session':'Recall session','passage-session':'Passage session','exam-session':'Exam session',results:'Session results','exam-results':'Exam results'};
  const modes = {recall:'recall',passages:'passage',exams:'exam'};
  let applying = false;
  let current = 'index';
  const pageFromURL = () => location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  function context(page) {
    const params = new URLSearchParams();
    if (['passages','passage-session'].includes(page) && PASSAGE_BY_ID.has(selectedPassageId)) params.set('passage', selectedPassageId);
    if (['exam-session','exam-results'].includes(page) && exam) params.set('exam', FULL_EXAMS[exam.ei].id);
    return params.size ? '?' + params.toString() : '';
  }
  function paint(page) {
    current = page;
    const focused = ['recall','passages','exams'].includes(page);
    $('home-score').hidden = focused;
    $('home-actions').hidden = focused;
    const heading = document.querySelector('.hero-title');
    heading.textContent = focused ? {recall:'Recall practice',passages:'Passage practice',exams:'Full-length exams'}[page] : 'MCAT Study App';
    document.title = titles[page] + ' | MCAT Study App';
    const parent = {'recall-session':'recall','passage-session':'passages','exam-session':'exams',results:'score-report','exam-results':'exams'}[page] || page;
    document.querySelectorAll('[data-study-page]').forEach(a => {
      if (a.dataset.studyPage === parent) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    const skip = document.querySelector('.study-skip');
    if (skip) skip.href = '#' + activeScreen;
  }
  function write(page, replace = false) {
    if (applying || !titles[page]) return;
    $('page-notice').hidden = true;
    const href = page + '.html' + context(page);
    if (location.pathname.split('/').pop() !== page + '.html' || location.search !== context(page)) {
      history[replace ? 'replaceState' : 'pushState']({mcatPage:page}, '', href);
    }
    paint(page);
  }
  function screen(id, page) {
    const mapped = {'screen-home':'index','screen-quiz':'recall-session','screen-passage':'passage-session','screen-exam':'exam-session','screen-results':'results','screen-exam-results':'exam-results','screen-about':'about'};
    write(page || mapped[id]);
  }
  function apply(page, fromHistory = false) {
    const priorURL = current + '.html' + context(current);
    const params = new URLSearchParams(location.search);
    const passage = params.get('passage');
    const examId = params.get('exam');
    applying = true;
    if (!goHome()) {
      applying = false;
      if (fromHistory) history.pushState({mcatPage:current}, '', priorURL);
      return;
    }
    let actual = titles[page] ? page : 'index';
    let notice = '';
    if (['recall-session','passage-session','exam-session','results','exam-results'].includes(actual)) {
      if (actual === 'exam-results') {
        const ei = FULL_EXAMS.findIndex(e => e.id === examId);
        const saved = ei >= 0 && store.get(KEYS.examLast(examId), null);
        if (saved) { openLastExamReview(ei); actual = 'exam-results'; }
        else { actual = 'exams'; notice = 'No completed exam for this link is saved in this browser. Choose an exam below.'; }
      } else {
        const fallback = {'recall-session':'recall','passage-session':'passages','exam-session':'exams',results:'score-report'};
        actual = fallback[actual];
        notice = 'Session links do not contain answers or a live attempt. Choose or resume practice below; saved progress stays in this browser.';
      }
    }
    if (modes[actual]) {
      setMode(modes[actual], false);
      if (actual === 'passages' && passage && PASSAGE_BY_ID.has(passage)) { selectedPassageId = passage; renderPassageSelector(); }
    } else if (actual === 'score-report') showProgress();
    else if (actual === 'about') showAbout();
    applying = false;
    $('page-notice').textContent = notice;
    $('page-notice').hidden = !notice;
    if (fromHistory || actual !== page) history.replaceState({mcatPage:actual}, '', actual + '.html' + context(actual));
    paint(actual);
    const main = $(activeScreen);
    main.setAttribute('tabindex','-1');
    main.focus({preventScroll:true});
  }
  window.McatPages = {screen, mode:(mode, replace = false) => write({recall:'recall',passage:'passages',exam:'exams'}[mode],replace)};
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-study-page]');
    if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const target = link.dataset.studyPage;
    // Resolve before changing history so a cancelled mini test leaves the URL intact.
    const previous = current;
    apply(target);
    if (current === target) {
      if (previous !== target) history.pushState({mcatPage:target}, '', target + '.html' + context(target));
      else history.replaceState({mcatPage:target}, '', target + '.html' + context(target));
    }
  });
  window.addEventListener('popstate', () => apply(pageFromURL(), true));
  const initial = pageFromURL();
  apply(initial, true);
})();
