// Visible-page study time. This tracker never controls assessment clocks.
const STUDY_TIMER_KEY = 'mcat2_study_timer';
let visibleStudyTimer = null;
let studyTimerInterval = null;
function studyTimerState(now = Date.now()) {
  if (!visibleStudyTimer) {
    const saved = store.get(STUDY_TIMER_KEY, {});
    const valid = n => Number.isFinite(n) && n >= 0;
    const sameDay = saved.day === localDay(new Date(now));
    visibleStudyTimer = { day: localDay(new Date(now)), total: sameDay && valid(saved.total) ? saved.total : 0,
      block: sameDay && valid(saved.block) ? saved.block : 0,
      subjects: sameDay && saved.subjects && typeof saved.subjects === 'object' ? Object.fromEntries(Object.entries(saved.subjects).filter(([k,v]) => Object.hasOwn(DISCIPLINES,k) && valid(v))) : {},
      goal: [25,45,60].includes(saved.goal) ? saved.goal : 45, subject: null, last: now,
      breakUntil: sameDay && valid(saved.breakUntil) ? saved.breakUntil : 0, savedAt: now };
  }
  return visibleStudyTimer;
}
function studyTimerActive() {
  if (document.hidden) return false;
  if (activeScreen === 'screen-quiz') return !!quiz.items.length;
  if (activeScreen === 'screen-passage') return !!pq.views.length && !pq.completed && !pq.mini?.completed;
  if (activeScreen === 'screen-exam') return !!exam && ['question','review'].includes(exam.phase);
  // Explanation and score review count, while home/configuration screens do not.
  return ['screen-results','screen-exam-results'].includes(activeScreen) && !!studyTimerState().subject;
}
function studyTimerBoundary() {
  if (activeScreen === 'screen-quiz') return 'Finish this recall set, then take a 5–10 minute break.';
  if (activeScreen === 'screen-passage' && !pq.completed && !pq.mini?.completed) return pq.mini ? 'Finish this mini test, then take a 5–10 minute break.' : 'Finish this passage, then take a 5–10 minute break.';
  if (activeScreen === 'screen-exam' && exam && ['question','review'].includes(exam.phase)) return 'Use the scheduled break after this section. The exam clock continues normally.';
  return 'This is a good stopping point. Take a 5–10 minute break: stand up and look away from the screen.';
}
function canStartStudyBreak() {
  return !['screen-quiz','screen-passage','screen-exam'].includes(activeScreen);
}
function saveStudyTimer() {
  const s = studyTimerState();
  store.set(STUDY_TIMER_KEY, {day:s.day,total:s.total,block:s.block,subjects:s.subjects,goal:s.goal,breakUntil:s.breakUntil});
  s.savedAt = Date.now();
}
function tickStudyTimer(now = Date.now()) {
  const s = studyTimerState(now);
  if (s.day !== localDay(new Date(now))) {
    Object.assign(s,{day:localDay(new Date(now)),total:0,block:0,subjects:{},breakUntil:0,last:now});
  }
  const delta = now - s.last;
  // Ignore suspended tabs, sleep, reload gaps and clock changes rather than inventing study time.
  if (delta > 0 && delta <= 5000 && !s.breakUntil && studyTimerActive()) {
    s.total += delta; s.block += delta;
    if (s.subject && Object.hasOwn(DISCIPLINES,s.subject)) s.subjects[s.subject] = (s.subjects[s.subject] || 0) + delta;
  }
  s.last = now;
  renderStudyTimer(now);
  if (now - s.savedAt >= 15000) saveStudyTimer();
}
function setStudyTimerSubject(subject) {
  tickStudyTimer();
  if (studyTimerState().breakUntil) resumeStudyTimer();
  studyTimerState().subject = Object.hasOwn(DISCIPLINES,subject) ? subject : null;
  saveStudyTimer(); renderStudyTimer();
}
function setStudyTimerGoal(value) {
  if (![25,45,60].includes(Number(value))) return;
  tickStudyTimer(); studyTimerState().goal = Number(value); saveStudyTimer(); renderStudyTimer();
}
function startStudyBreak(minutes = 5) {
  if (!canStartStudyBreak() || ![5,10].includes(minutes)) return;
  tickStudyTimer(); studyTimerState().breakUntil = Date.now() + minutes * 60000;
  saveStudyTimer(); renderStudyTimer();
}
function resumeStudyTimer() {
  const s = studyTimerState();
  if (!s.breakUntil) return;
  s.breakUntil = 0; s.block = 0; s.last = Date.now(); saveStudyTimer(); renderStudyTimer();
}
function renderStudyTimer(now = Date.now()) {
  const host = $('study-timer');
  if (!host) return;
  const s = studyTimerState(now), due = s.block >= s.goal * 60000;
  if (!$('study-total-time')) host.innerHTML = '<div class="wrap study-timer-inner"><div class="study-time-values"><b>Study timer</b> <span>Today <strong id="study-total-time"></strong></span><span id="study-subject-time"></span><span>Block <strong id="study-block-time"></strong></span><label>Study block <select id="study-block-goal" onchange="setStudyTimerGoal(this.value)"><option value="25">25 min</option><option value="45">45 min</option><option value="60">60 min</option></select></label><details><summary>Time by subject</summary><div id="study-subject-totals"></div></details></div><div id="study-break-message"></div><div id="study-break-actions"><button class="micro-btn" onclick="startStudyBreak(5)">5 min break</button> <button class="micro-btn" onclick="startStudyBreak(10)">10 min break</button></div><button class="micro-btn" id="study-resume" onclick="resumeStudyTimer()" hidden>Resume studying</button></div>';
  $('study-total-time').textContent = fmtTime(s.total);
  $('study-block-time').textContent = fmtTime(s.block);
  $('study-subject-time').textContent = s.subject ? DISCIPLINES[s.subject] + ' ' + fmtTime(s.subjects[s.subject] || 0) : 'Choose a study activity';
  $('study-block-goal').value = String(s.goal);
  $('study-subject-totals').innerHTML = Object.entries(s.subjects).map(([k,v])=>'<div>'+esc(DISCIPLINES[k])+': '+fmtTime(v)+'</div>').join('') || 'No subject time recorded today.';
  const message = s.breakUntil ? (s.breakUntil > now ? '☕ Break: '+fmtTime(s.breakUntil-now)+' remaining. Study time is paused.' : '☕ Break complete. Resume when you are ready.') : due ? '☕ You’ve studied for '+Math.floor(s.block/60000)+' minutes this block. '+studyTimerBoundary() : fmtTime(s.goal*60000-s.block)+' until your suggested break · '+(studyTimerActive()?'counting visible study time':'paused outside study activities');
  const node = $('study-break-message');
  if (node.textContent !== message) node.textContent = message;
  host.classList.toggle('break-due',due && !s.breakUntil);
  $('study-break-actions').hidden = !!s.breakUntil || !canStartStudyBreak();
  $('study-resume').hidden = !s.breakUntil;
}
function initStudyTimer() {
  renderStudyTimer();
  if (!studyTimerInterval) studyTimerInterval = setInterval(tickStudyTimer,1000);
  document.addEventListener('visibilitychange',()=>{ studyTimerState().last=Date.now(); saveStudyTimer(); renderStudyTimer(); });
  if (typeof window.addEventListener === 'function') window.addEventListener('pagehide',saveStudyTimer);
}
