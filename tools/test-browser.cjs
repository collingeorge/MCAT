// Real Chrome smoke test for CI; no browser automation dependency is shipped to the app.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function main() {
 const server = http.createServer(async (req, res) => {
  try {
   let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
   if (name === '/') name = '/index.html';
   const file = path.resolve(root, '.' + name);
   if (!file.startsWith(root + path.sep)) throw Error('Outside fixture');
   const body = await fs.readFile(file);
   res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'})[path.extname(file)] || 'application/octet-stream');
   res.end(body);
  } catch { res.writeHead(404); res.end(); }
 });
 await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
 const origin = 'http://127.0.0.1:' + server.address().port;
 const profile = await fs.mkdtemp(path.join(os.tmpdir(),'mcat-browser-'));
 const chrome = spawn(process.env.CHROME_BIN || 'google-chrome',['--headless=new','--no-first-run','--no-default-browser-check','--disable-background-networking','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore','ignore','pipe']});
 let socket;
 try {
  const endpoint = await new Promise((resolve,reject) => {
   let log=''; const timer=setTimeout(()=>reject(Error('Chrome did not start: '+log.slice(-1500))),45000);
   chrome.once('error',e=>{clearTimeout(timer);reject(e)});
   chrome.once('exit',code=>{clearTimeout(timer);reject(Error('Chrome exited before debug connection, code '+code+': '+log.slice(-1500)))});
   chrome.stderr.on('data',chunk=>{log+=chunk; const hit=log.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(hit){clearTimeout(timer);resolve(hit[1])}});
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
  let nextId=0; const pending=new Map(), errors=[], consoleErrors=[];
  socket.addEventListener('message',event=>{const data=JSON.parse(event.data); if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);if(data.method==='Runtime.consoleAPICalled'&&data.params.type==='error')consoleErrors.push(data.params.args.map(x=>x.value??x.description).join(' '));const task=pending.get(data.id);if(task){pending.delete(data.id);clearTimeout(task.timer);data.error?task.reject(Error(JSON.stringify(data.error))):task.resolve(data.result)}});
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++nextId;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method))},30000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}))});
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const command=(method,params)=>send(method,params,sessionId);
  await command('Runtime.enable'); await command('Page.enable');
  // Record CSP violations and blocked UI actions from the first script onward.
  await command('Page.addScriptToEvaluateOnNewDocument',{source:"window.__violations=[];document.addEventListener('securitypolicyviolation',e=>__violations.push(e.violatedDirective+' '+e.blockedURI));const ce=console.error;console.error=(...a)=>{if(/UI action/.test(String(a[0])))__violations.push(a.join(' '));ce.apply(console,a)}"});
  await command('Page.navigate',{url:origin});
  const evaluate=async expression=>{const result=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value};
  const until=async expression=>{for(let i=0;i<300;i++){if(await evaluate(expression))return;await sleep(100)}throw Error('Browser condition failed: '+expression)};
  await until('document.querySelector("#today-plan .today-head")!==null && document.querySelector("#home-actions")?.textContent.includes("Score report")');
  // Home is TODAY plus the score report: no Recall tab, Smart Session or other recall-deck tools.
  assert.equal(await evaluate('document.querySelector("#btn-recall")===null && !document.querySelector("#home-actions").textContent.includes("Smart Session")'),true);
  // Guests do not download the cloud SDK until they choose to sign in.
  assert.equal(await evaluate('performance.getEntriesByType("resource").some(r=>r.name.includes("vendor/supabase"))'),false,'guest boot skips the SDK');
  // The second click of a double-click/tap never answers the next question.
  await evaluate('beginQuiz(AQB_QBANK.slice(0,3),"Double tap",{adaptive:false});document.querySelector("#cb-0").click()');
  await evaluate('const b=document.querySelector("#next-btn");b.dispatchEvent(new MouseEvent("click",{bubbles:true,detail:1}));document.querySelector("#cb-1").dispatchEvent(new MouseEvent("click",{bubbles:true,detail:2}))');
  assert.equal(await evaluate('quiz.idx'),1);assert.equal(await evaluate('quiz.results.length'),1,'double-tap did not answer question 2');
  await evaluate('goHome()');
  // A wrong answer on a QBank card asks which other answer was considered.
  await evaluate('beginQuiz(AQB_QBANK.slice(0,3),"Runner-up",{adaptive:false})');
  await until('document.querySelector("#cb-0")!==null');
  await evaluate('document.querySelector("#cb-"+((quiz.items[quiz.idx].ans+1)%4)).click()');
  assert(await evaluate('document.querySelector("#runner-up")!==null'));
  assert(await evaluate('document.querySelector("#exp-area").textContent.includes("Answer:")')); 
  await evaluate('const select=document.querySelector("#runner-up");select.value=select.options[1].value;select.dispatchEvent(new Event("change",{bubbles:true}))');
  await until('document.querySelector("#exp-area").textContent.includes("Answer:")');
  assert(await evaluate('document.querySelector("#alternative-feedback-recall").textContent.includes("Other answer considered:")'));
  await evaluate('endQuiz();beginQuiz([AQB_QBANK[0]],"Correct answer check",{adaptive:false});document.querySelector("#cb-"+quiz.items[0].ans).click()');
  assert.equal(await evaluate('document.querySelector("#runner-up")===null'),true);
  // The C/P diagnostic gives feedback only at the end; running out of time scores it.
  await evaluate('endQuiz();goHome();startMasteryTest("diagnostic")');
  await until('document.querySelector("#pc-0")!==null');
  assert.equal(await evaluate('document.body.classList.contains("exam-mode")'),true,'the test runs in exam layout');
  await evaluate('document.querySelector("#pc-0").click()');
  assert.equal(await evaluate('document.querySelector("#pp-exp").textContent'), '');
  assert(await evaluate('document.querySelector("#pp-next").textContent.includes("Feedback follows")'));
  await evaluate('pq.startedAt=Date.now()-pq.targetMs-1;updatePassageTimer()');
  await until('document.querySelector("#pp-question-box").textContent.includes("diagnostic")');
  assert(await evaluate('document.querySelector("#pp-question-box").textContent.includes("Topics, weakest first")'));
  // TODAY after the diagnostic: the diagnostic (retake), then exactly 3 daily steps numbered 1–3: 50 flashcards,
  // 50 guided Practice Exam cards, the quiz, which stays locked until the flashcards are done.
  await evaluate('goHome()');
  assert.deepEqual(await evaluate('[...document.querySelectorAll("#today-plan .today-step .today-title > b")].map(b=>b.textContent)'),['Diagnostic','Rules warm-up','Flashcards','Guided Practice Exam cards with walkthroughs','30-question quiz']);
  assert.deepEqual(await evaluate('[...document.querySelectorAll("#today-plan .today-step .today-num")].map(n=>n.textContent)'),['✓','1','2','3','4']);
  assert.equal(await evaluate('document.querySelector("#today-plan [data-click=\'startMasteryPassages()\']")'),null,'no passage step');
  // The rules warm-up: its Start button runs today's rule cards as multiple-choice questions; the rule shows after
  // answering, at 16 px or more.
  assert(await evaluate('document.querySelector("#today-plan").textContent.includes("Unlocks when the rules warm-up is done")'),'the flashcards wait for the rules warm-up');
  await evaluate('document.querySelector("#today-plan [data-click=\'startMasteryRules()\']").click()');
  await until('quiz.mastery==="rules" && !!document.querySelector("#cb-0")');
  assert.equal(await evaluate('document.querySelectorAll("#choices-area .choice-btn").length'),4,'a rule card has 4 choices');
  await evaluate('document.querySelector("#cb-"+quiz.items[0].ans).click()');
  assert.match(await evaluate('document.querySelector("#exp-area").textContent'),/Rule:/,'the rule shows after answering');
  await evaluate('goHome()');
  assert.equal(await evaluate('[...document.querySelectorAll("#today-plan [data-click]")].some(b=>b.dataset.click.includes("daily"))'),false,'the quiz is locked');
  assert(await evaluate('document.querySelector("#today-plan").textContent.includes("Unlocks when the flashcards are done")'));
  await evaluate('goHome();showPlan()');
  await evaluate('document.querySelector("#plan-date").value=localDay(new Date(Date.now()+60*DAY));savePlan()');
  assert(await evaluate('const probe=document.createElement("div");probe.innerHTML=fmt("<img src=x onerror=alert(1)>");probe.querySelector("img")===null'));
  assert.equal(await evaluate('document.querySelector("#app-nav").hidden'),false);
  await evaluate('window.scrollTo(0,document.body.scrollHeight)');
  assert(await evaluate('document.querySelector("#home-back-btn").getBoundingClientRect().top>=0 && document.querySelector("#home-back-btn").getBoundingClientRect().bottom<=innerHeight'));
  await evaluate('document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('activeScreen'), 'screen-home');
  assert.equal(await evaluate('document.querySelector("#app-nav").hidden'),true);
  // Review 4.9: moving between questions on one exam passage keeps the passage pane (and its scroll position).
  await evaluate('startExam(0);beginSection();const qs=curQuestions();exam.qi=qs.findIndex((q,i)=>q.passageId&&qs[i+1]&&qs[i+1].passageId===q.passageId);renderExamQuestion();const p=document.querySelector("#ex-passage");p.style.maxHeight="200px";p.style.overflow="auto";p.scrollTop=120;window.__pane=p;true');
  const before=await evaluate('document.querySelector("#ex-passage").scrollTop');
  await evaluate('examNav(1)');
  assert.equal(await evaluate('document.querySelector("#ex-passage")===window.__pane'),true,'same passage pane after Next');
  assert.equal(await evaluate('document.querySelector("#ex-passage").scrollTop'),before,'scroll kept');
  await evaluate('goHome()');
  await evaluate('startExam(0);beginSection();exam.elapsed[exam.si]=12345;document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('store.get(KEYS.examProgress(FULL_EXAMS[0].id),null).elapsed[0]'),12345);
  await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate('showPlan();window.scrollTo(0,document.body.scrollHeight)');
  assert(await evaluate('document.querySelector("#home-back-btn").getBoundingClientRect().top>=0 && document.querySelector("#home-back-btn").getBoundingClientRect().right<=innerWidth'));
  await evaluate('document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('activeScreen'), 'screen-home');
  await evaluate('goHome()');
  assert(await evaluate('document.querySelector("#today-plan").textContent.includes("Test date")'));
  await evaluate('showOfficialScores()');
  await evaluate('document.querySelector("#official-form").value="Scored Practice Exam 1";[125,126,127,128].forEach((n,i)=>document.querySelector("#official-"+i).value=n);document.querySelector("#official-first").checked=true;document.querySelector("#official-timed").checked=true;document.querySelector("form button[type=submit]").click()');
  assert(await evaluate('officialEligible().length===1 && document.querySelector("#results-body").textContent.includes("506")'));
  await evaluate('goHome();showProgress()');
  assert(await evaluate('document.querySelector("#results-body").textContent.includes("Official practice benchmark")'));
  await evaluate('goHome();beginQuiz([AQB_QBANK[0]],"Visible timer",{adaptive:false});studyTimerState().last=Date.now()-2000;tickStudyTimer()');
  assert(await evaluate('document.querySelector("#study-total-time").textContent!=="0:00"'));
  await evaluate('studyTimerState().block=48*60000;renderStudyTimer()');
  assert(await evaluate('document.querySelector("#study-break-message").textContent.includes("Finish this card set")'));
  await evaluate('window.scrollTo(0,document.body.scrollHeight)');
  assert(await evaluate('document.querySelector("#study-timer").getBoundingClientRect().top>=0 && document.querySelector("#study-timer").getBoundingClientRect().right<=innerWidth'));
  await evaluate('goHome();document.querySelector("#study-break-actions button").click()');
  assert(await evaluate('document.querySelector("#study-break-message").textContent.includes("Study time is paused")'));
  await evaluate('document.querySelector("#study-resume").click()');
  assert.equal(await evaluate('studyTimerState().block'),0);
  await evaluate('goHome();document.querySelector("#account-login-btn").click()');
  assert(await evaluate('document.querySelector("#account-details").open'));
  assert(await evaluate('document.querySelector("#account-login-btn").textContent.includes("Sign in")'));
  await until('document.querySelector("#account-status").textContent.includes("Signed out")');
  assert(await evaluate('document.querySelector("#account-panel").textContent.includes("Account & cloud progress")'));
  assert(await evaluate('document.querySelector("#account-password").type==="password"'));
  await evaluate('document.querySelector("#account-email").value="invalid";McatAccount.action("login")');
  assert(await evaluate('document.querySelector("#account-status").textContent.length>0'));
  await until('performance.getEntriesByType("resource").some(r=>r.name.includes("vendor/supabase"))&&typeof window.supabase?.createClient==="function"');
  // Real clicks through delegated actions under script-src 'self' (no inline handlers).
  assert.equal(await evaluate('document.querySelector("#btn-passage")'),null,'no Passages tab');
  await evaluate('goHome();document.querySelector("#btn-exam").click()');
  assert.equal(await evaluate('prefs.mode'),'exam');
  await evaluate('document.querySelector("#btn-aamc").click()');
  assert.equal(await evaluate('["aamc","flprep"].includes(prefs.mode)'),true);
  // A change action reads this.value: the path's goal select.
  await evaluate('goHome();const g=document.querySelector("[data-change^=\\"setMasteryGoal\\"]");g.value="129";g.dispatchEvent(new Event("change",{bubbles:true}))');
  assert.equal(await evaluate('masteryLoad().goal'),129,'change action reads this.value');
  await evaluate('setMasteryGoal(128)');
  await evaluate('document.querySelector("[data-click^=\\"showPlan\\"]")?.click()||showPlan()');
  assert.equal(await evaluate('activeScreen'),'screen-results');
  await evaluate('goHome()');
  // One study type scale: question text, choices and passage text compute to the same font-size on every
  // screen at a given width (normal and exam mode); passage and figure tables share their own size.
  const fontScreens=[
   ['flashcard','beginQuiz(AQB_QBANK.slice(0,3),"Font flashcards",{adaptive:false});if(document.querySelector("#reveal-btn"))revealChoices();true','activeScreen==="screen-quiz" && !!document.querySelector("#quiz-body .choice-btn")',false],
   ['guided card','startMasteryGuided(true);true','quiz.mastery==="guided" && activeScreen==="screen-quiz" && !!document.querySelector("#quiz-body .choice-btn") && !!document.querySelector("#quiz-body .teach-box")',false],
   ['single passage','startPassage(EXAM_CARS[0]);true','activeScreen==="screen-passage" && !pq.mini && !!document.querySelector("#pp-passage-box .passage-text") && !!document.querySelector("#pp-question-box .choice-btn")',true],
   ['daily quiz','(()=>{const m=masteryLoad(),r=masteryDayRow(m,"cp"),p=masteryPlanNow(m);for(const s of p.steps)if(s.topics)r[s.id==="flashcards"?"flashT":"guidedT"]=Object.fromEntries(s.topics.map(t=>[t.code,t.need]));r.lessonsN=50;masterySave(m)})();startMasteryTest("quiz");true','activeScreen==="screen-passage" && pq.mini && pq.mini.mastery==="daily" && !!document.querySelector("#pp-question-box .choice-btn")',true],
   ['diagnostic','startMasteryTest("diagnostic");true','activeScreen==="screen-passage" && pq.mini && pq.mini.mastery==="diagnostic" && !!document.querySelector("#pp-question-box .choice-btn")',true],
   ['full-length exam','startExam(0);beginSection();exam.qi=Math.max(0,curQuestions().findIndex(q=>q.passageTitle));renderExamQuestion();true','activeScreen==="screen-exam" && !!document.querySelector("#ex-passage .passage-text") && !!document.querySelector("#exam-body .choice-btn")',true]];
  // Leaving an unfinished timed set asks to confirm; drop the set first so no dialog blocks the page.
  const leave='if(pq.mini){stopPassageTimer();pq.mini=null}goHome();';
  // A timed set may open on a stand-alone: move to its first question with a passage.
  const toPassage='if(activeScreen==="screen-passage"&&pq.mini&&!document.querySelector("#pp-passage-box .passage-text")){const i=pq.mini.items.findIndex(x=>x.passage);if(i>=0){pq.idx=i;renderPassageQuestion()}}true';
  const readFonts='(()=>{const s=document.getElementById(activeScreen),f=sel=>{const e=s.querySelector(sel);return e?getComputedStyle(e).fontSize:null};return {question:f(".question-text"),choice:f(".choice-btn"),choiceText:f(".choice-btn .choice-text"),passage:f(".passage-text"),passageP:f(".passage-text p"),table:f(".passage-text table, .data-figure table"),examMode:document.body.classList.contains("exam-mode")}})()';
  for(const width of [1280,390]){
   await command('Emulation.setDeviceMetricsOverride',{width,height:width>500?900:844,deviceScaleFactor:1,mobile:width<=500});
   const rows=[];
   for(const [name,start,ready,hasPassage] of fontScreens){
    await evaluate(leave+start);
    await until(ready);
    await evaluate(toPassage);
    if(hasPassage)await until('!!document.getElementById(activeScreen).querySelector(".passage-text")');
    const got=await evaluate(readFonts);
    rows.push({screen:name,...got});
    assert(got.question&&got.choice,width+'px '+name+': question and choices rendered');
    assert.equal(got.choice,got.question,width+'px '+name+': choice = question');
    assert.equal(got.choiceText,got.question,width+'px '+name+': choice text = question');
    if(hasPassage){assert.equal(got.passage,got.question,width+'px '+name+': passage = question');assert.equal(got.passageP,got.question,width+'px '+name+': passage paragraphs = question')}
   }
   await evaluate(leave);
   assert(rows.some(r=>r.examMode)&&rows.some(r=>!r.examMode),'both normal and exam mode measured');
   for(const role of ['question','choice','passage','table']){const sizes=[...new Set(rows.map(r=>r[role]).filter(Boolean))];assert(sizes.length<=1,width+'px '+role+' sizes differ across screens: '+JSON.stringify(rows.map(r=>[r.screen,r[role]])))}
   assert(rows.some(r=>r.table),width+'px: at least one table measured');
   console.log('Study font sizes at '+width+'px:');
   console.table(rows.map(r=>({screen:r.screen,mode:r.examMode?'exam':'normal',question:r.question,choice:r.choice,passage:r.passage||'-',table:r.table||'-'})));
  }
  // Text is 16 px or larger everywhere the student studies, at desktop and phone width: every visible text node and
  // form control on the page (header, study status, TODAY card, flashcard, guided and quiz screens; SVG text at its
  // drawn size), including after a wrong flashcard answer, when the lesson opens by itself under the verdict.
  // The page never scrolls sideways.
  const smallText='(()=>{const bad=[],seen=new Set();const add=(el,px,t)=>{const k=(el.className&&typeof el.className==="string"?el.className.split(" ")[0]:el.tagName)+" "+px;if(!seen.has(k)){seen.add(k);bad.push(k+"px \u201c"+t.slice(0,30)+"\u201d")}};'+
   'const shown=el=>{const cs=getComputedStyle(el),r=el.getBoundingClientRect();return cs.visibility!=="hidden"&&cs.display!=="none"&&r.width>1&&r.height>1&&!el.closest("[hidden]")};'+
   'const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);for(let n;(n=tw.nextNode());){const t=n.textContent.trim();if(!t)continue;const el=n.parentElement;if(!el||!shown(el)||el.closest("script,style,noscript,option"))continue;'+
   'let px=parseFloat(getComputedStyle(el).fontSize);const svg=el.closest("svg");if(svg&&svg.viewBox&&svg.viewBox.baseVal&&svg.viewBox.baseVal.width)px=px*svg.getBoundingClientRect().width/svg.viewBox.baseVal.width;if(px<15.95)add(el,Math.round(px*10)/10,t)}'+
   'for(const el of document.querySelectorAll("select,input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea,button"))if(shown(el)){const px=parseFloat(getComputedStyle(el).fontSize);if(px<15.95)add(el,px,el.value||el.textContent||el.tagName)}'+
   'return {bad,hscroll:document.documentElement.scrollWidth>window.innerWidth+1}})()';
  const wrongPick='(()=>{const v=quiz.items[quiz.idx];document.querySelector("#cb-"+((v.ans+1)%4)).click();return true})()';
  const studyStates=[
   ['TODAY','goHome();true','activeScreen==="screen-home" && !!document.querySelector("#today-plan .today-head")'],
   ['flashcard','startMasteryFlashcards(true);true','quiz.mastery==="flashcards" && activeScreen==="screen-quiz" && !!document.querySelector("#quiz-body .choice-btn")'],
   ['flashcard after a wrong answer','startMasteryFlashcards(true);true','quiz.mastery==="flashcards" && activeScreen==="screen-quiz" && !!document.querySelector("#cb-0")',wrongPick,'!!document.querySelector("#lesson-slot .lesson-box")'],
   ['guided card',fontScreens[1][1],fontScreens[1][2]],
   ['guided card answered',fontScreens[1][1],fontScreens[1][2],wrongPick,'!!document.querySelector("#exp-area .explanation-box")'],
   ['daily quiz',fontScreens[3][1],fontScreens[3][2]],
   ['diagnostic',fontScreens[4][1],fontScreens[4][2]],
   ['single passage',fontScreens[2][1],fontScreens[2][2]],
   ['full-length exam',fontScreens[5][1],fontScreens[5][2]],
   ['full-length exam review',fontScreens[5][1],fontScreens[5][2],'finishExam();true','activeScreen==="screen-exam-results"'],
   ['quiz results and review',fontScreens[0][1],fontScreens[0][2],'(()=>{const v=quiz.items[quiz.idx];document.querySelector("#cb-"+((v.ans+1)%4)).click();endQuiz();return true})()','activeScreen==="screen-results"'],
   ['score report','showProgress();true','activeScreen==="screen-results" && !!document.querySelector("#results-body").textContent.trim()']];
  for(const width of [1280,375]){
   await command('Emulation.setDeviceMetricsOverride',{width,height:width>500?900:812,deviceScaleFactor:1,mobile:width<=500});
   for(const [name,start,ready,act,after] of studyStates){
    await evaluate(leave+start);
    await until(ready);
    if(act){await evaluate(act);await until(after)}
    // After a wrong flashcard answer the lesson opens by itself, under the verdict, at step 1, with Back and Next,
    // the question's words highlighted; it is the card's own worked method ending with its Rule to reuse.
    if(name==='flashcard after a wrong answer'){
     assert.equal(await evaluate('(()=>{const s=document.querySelector("#lesson-slot"),v=document.querySelector("#exp-area .exp-verdict");return !!(v&&s&&(v.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_FOLLOWING))})()'),true,'the lesson sits under the verdict');
     assert.match(await evaluate('document.querySelector("#lesson-slot .lesson-title").textContent'),/^Here's how to solve it — step 1 of \d+$/,'opened by itself at step 1');
     assert.equal(await evaluate('!!document.querySelector("#lesson-slot [data-click=\'howStep(-1)\']") && !!document.querySelector("#how-next")'),true,'Back and Next');
     await evaluate('(()=>{const n=stepperSteps().length;for(let i=1;i<n;i++)howStep(1);return true})()');
     assert.match(await evaluate('document.querySelector("#lesson-slot .lesson-rule").textContent'),/Rule to reuse:/,'the lesson ends with the Rule to reuse');
     assert.equal(await evaluate('[...document.querySelectorAll("#choices-area .choice-btn")].filter(b=>b.classList.contains("struck")).length'),3,'every wrong choice is crossed out by the end');
    }
    const got=await evaluate(smallText);
    assert.deepEqual(got.bad,[],width+'px '+name+': text below 16 px');
    assert.equal(got.hscroll,false,width+'px '+name+': no horizontal scroll');
    // Explanation and step-by-step (teach) text reads at the question's size, 17 px, at both widths.
    const readSizes=await evaluate('[...document.querySelectorAll(".exp-text p,.exp-text,.teach-box p,.how-box .step-text")].filter(e=>e.getBoundingClientRect().height>1&&e.textContent.trim()).map(e=>e.className+" "+getComputedStyle(e).fontSize)');
    for(const s of readSizes)assert.match(s,/ 17px$/,width+'px '+name+': explanation/lesson text is 17 px ('+s+')');
   }
   await evaluate(leave);
   console.log('Text floor at '+width+'px: '+studyStates.map(x=>x[0]).join(', ')+': every visible text ≥ 16 px, no sideways scroll');
  }
  // A right answer on a flashcard shows "Show me how", which opens the same lesson at step 1.
  await evaluate('startMasteryFlashcards(true)');
  await until('quiz.mastery==="flashcards" && !!document.querySelector("#cb-0")');
  await evaluate('document.querySelector("#cb-"+quiz.items[quiz.idx].ans).click()');
  assert.equal(await evaluate('!!document.querySelector("#show-how-btn") && !document.querySelector("#lesson-slot .lesson-box")'),true,'right answer: the lesson waits behind "Show me how"');
  await evaluate('document.querySelector("#show-how-btn").click()');
  assert.match(await evaluate('document.querySelector("#lesson-slot .lesson-title").textContent'),/step 1 of/,'"Show me how" replays the lesson');
  // "💡 Show me how" is there at any time, on every flashcard and every guided card: before answering (it
  // opens the lesson and answering still works), after a right answer and after a wrong one (it opens the solution).
  const helpBtn='(document.querySelector("#hint-btn")?.textContent||"")';
  for(const [label,start,ready,opened] of [
   ['flashcard','startMasteryFlashcards(true);true','quiz.mastery==="flashcards" && !!document.querySelector("#cb-0")','!!document.querySelector("#lesson-slot .lesson-box")'],
   ['guided card','startMasteryGuided(true);true','quiz.mastery==="guided" && !!document.querySelector("#cb-0")','!!document.querySelector("#how-box")']]){
   for(const right of [true,false]){
    await evaluate(leave+start); await until(ready);
    assert.match(await evaluate(helpBtn),/Show me how/,label+': the button is there before answering');
    await evaluate('document.querySelector("#hint-btn").click()');
    assert.equal(await evaluate('!!document.querySelector("#hint-area .teach-box")'),true,label+': before answering it opens the lesson');
    assert.match(await evaluate(helpBtn),/Show me how/,label+': the button stays while the lesson is open');
    await evaluate('document.querySelector("#cb-"+(('+(right?'0':'1')+'+quiz.items[quiz.idx].ans)%4)).click()');
    assert.equal(await evaluate('quiz.answered && quiz.results.length===1'),true,label+': answering still works after opening the lesson');
    assert.match(await evaluate(helpBtn),/Show me how/,label+': the button is there after a '+(right?'right':'wrong')+' answer');
    await evaluate('document.querySelector("#lesson-slot")&&(document.querySelector("#lesson-slot").innerHTML="");document.querySelector("#how-box")?.remove();document.querySelector("#hint-btn").click()');
    assert.equal(await evaluate(opened),true,label+': after a '+(right?'right':'wrong')+' answer it opens the worked solution');
   }
  }
  // "✂ Rule out" (the six glance rules): the toolbar has exactly two buttons, ✂ Rule out and 💡 Show me how. Before
  // answering it strikes the choices the card's rules cut, shows one line per rule (its name, then the letters), and
  // nothing else (no reasons, tables, How?, shortcut or 3-second rule); the choice left is not marked; the answer tap
  // still works. "Tap an answer to go on" sits under the choices, then a large "Next card →"; the lesson's buttons are
  // "◀ Step" / "Step ▶".
  for(const [kind,pick] of [['flashcard','CPTQ.find(q=>q.cut&&q.cut.reduce((n,e)=>n+e.c.length,0)>=2&&q.teach)'],['guided card','FLQ.find(q=>q.cut&&q.cut.reduce((n,e)=>n+e.c.length,0)>=2&&q.teach)']]){
  await evaluate(leave+"withBank('fl',()=>withBank('cpt',()=>{window.__c="+pick+";beginQuiz([window.__c],'Rule out test')}));true"); await until('!!window.__c&&!!document.querySelector("#cb-0")');
  const bar=JSON.parse(await evaluate('JSON.stringify([...document.querySelectorAll("#hint-area > button")].map(b=>b.textContent.trim()))'));
  assert.deepEqual(bar,['💡 Show me how','✂ Rule out'],kind+' · the toolbar has two buttons: '+JSON.stringify(bar));
  assert.match(await evaluate('document.querySelector("#choices-area + #go-on")?.textContent||""'),/Tap an answer to go on/,kind+' · "Tap an answer to go on" under the choices');
  await evaluate('document.querySelector("#elim-btn").click()');
  const r=JSON.parse(await evaluate('JSON.stringify((()=>{const v=quiz.items[quiz.idx],btns=[...document.querySelectorAll("#choices-area .choice-btn")],out=btns.filter(b=>b.classList.contains("elim-out")),key=document.querySelector("#cb-"+v.ans);return{answered:quiz.answered,n:out.length,want:v.q.cut.reduce((n,e)=>n+e.c.length,0),key:out.includes(key),keyClass:key.className,whys:document.querySelectorAll(".elim-why").length,lines:[...document.querySelectorAll("#elim-rule .cut-line")].map(l=>l.textContent.trim()),rules:v.q.cut.length,px:parseFloat(getComputedStyle(document.querySelector("#elim-rule .cut-line")).fontSize),extra:!!document.querySelector("#elim-how,#fast-btn,#fast-box,#elim-how-btn"),ruleText:/3-second|Impossible|Shortcut/.test(document.querySelector("#elim-rule").textContent)}})())'));
  assert.equal(r.answered,false,kind+' · Rule out works before answering');
  assert.equal(r.n,r.want,kind+' · it strikes exactly the cut choices');
  assert.equal(r.key,false,kind+' · never the key'); assert.equal(r.keyClass.trim(),'choice-btn',kind+' · the choice left is not marked');
  assert.equal(r.lines.length,r.rules,kind+' · one line per rule used');
  for(const l of r.lines)assert.match(l,/^(Opposites|Match the passage|Way off in size|Starting number|Solid, catalyst or pure liquid|Formula has ½) → ✂ [A-D](, [A-D])*$/,kind+' · a rule line: '+l);
  assert(!r.whys&&!r.extra&&!r.ruleText,kind+' · only the rule lines: no reasons, tables, How?, shortcut or 3-second rule');
  assert(r.px>=16,kind+' · rule lines at least 16 px');
  await evaluate('document.querySelector("#cb-"+quiz.items[quiz.idx].ans).click()');
  assert.equal(await evaluate('quiz.answered&&quiz.results.length===1&&quiz.results[0].right'),true,kind+' · the answer tap is accepted');
  const nx=JSON.parse(await evaluate('JSON.stringify({t:document.querySelector("#go-on #next-card-btn")?.textContent||"",px:parseFloat(getComputedStyle(document.querySelector("#go-on #next-card-btn")).fontSize)})'));
  assert(/See results →|Next card →/.test(nx.t)&&nx.px>=18,kind+' · a large "Next card →" under the choices ('+nx.t+', '+nx.px+' px)');
  await evaluate('document.querySelector("#hint-btn").click()');
  await until('!!document.querySelector("#how-next,#how-play")||!!document.querySelector(".step-controls")');
  const steps=await evaluate('[...document.querySelectorAll(".step-controls button")].map(b=>b.textContent.trim()).join("|")');
  assert(/Step ▶/.test(steps)&&/◀ Step/.test(steps)&&!/Next ▶|◀ Back/.test(steps),kind+' · the lesson buttons read ◀ Step / Step ▶ ('+steps+')');
  }
  console.log('✂ Rule out (flashcards and guided cards): two toolbar buttons; strikes only the cut choices with one rule line each, never the key; "Tap an answer to go on", then a large "Next card →"; lesson buttons ◀ Step / Step ▶');
  // Same ask, same setup: a flashcard that twins a passage question shows its short twin passage above the stem (16 px
  // or more), and a lesson step that quotes the passage lights that text up in it.
  { const id=await evaluate('CPTQ.find(q=>q.passage&&q.teach.some(t=>(t.marks||[]).some(m=>q.passage.includes(m.t)))).id');
    await evaluate(leave+'beginQuiz([CPTQ_BY_ID.get("'+id+'")],"Passage card");true'); await until('!!document.querySelector("#quiz-body .card-passage-text")');
    const p=JSON.parse(await evaluate('JSON.stringify({text:document.querySelector("#quiz-body .card-passage-text").textContent,px:parseFloat(getComputedStyle(document.querySelector("#quiz-body .card-passage-text")).fontSize),label:document.querySelector("#quiz-body .card-passage-label").textContent,before:!!document.querySelector("#quiz-body .card-passage + .question-text")})'));
    assert(p.text.length>100 && p.px>=16 && /Passage/i.test(p.label) && p.before, id+': the twin passage shows above the stem at 16 px or more');
    const i=await evaluate('CPTQ_BY_ID.get("'+id+'").teach.findIndex(t=>(t.marks||[]).some(m=>CPTQ_BY_ID.get("'+id+'").passage.includes(m.t)))');
    for(let k=0;k<=i;k++) await evaluate('teachStep(1);true');
    assert(await evaluate('!!document.querySelector("#quiz-body .card-passage-text mark.step-hl")'), id+': the lesson step lights up its words in the passage');
    console.log('Passage cards: '+id+' shows its twin passage above the stem; the lesson highlights the passage'); }
  await evaluate(leave);
  await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  // Offline resilience: once the service worker has cached the app, a reload with no network still works.
  // Local http skips registration by design (app.js); register as the deployed https site does.
  await evaluate('navigator.serviceWorker.register("sw.js").then(()=>navigator.serviceWorker.ready).then(()=>true)');
  await until('!!navigator.serviceWorker.controller');
  await until('caches.keys().then(k=>Promise.all(k.map(n=>caches.open(n).then(c=>c.keys())))).then(l=>l.flat().length>=30)');
  await command('Network.enable');
  await command('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  await command('Page.reload',{ignoreCache:false});
  await until('document.querySelector("#today-plan .today-head")!==null && typeof AQB_QBANK!=="undefined" && AQB_QBANK.length>1000');
  // Banks that load on demand come from the offline cache too.
  assert.equal(await evaluate('typeof CP_POOL'),'undefined','the quiz sets are not loaded at startup');
  assert.equal(await evaluate('Promise.all(Object.keys(BANKS).map(ensureBank)).then(()=>(typeof CP_PRACTICE)+"/"+FLQ.length+"/"+EXAM_CARS.length+"/"+CP_POOL.length+"/"+AAMC_PREP.length)'),'undefined/354/18/6/3','approved content, including the on-demand banks, available offline');
  assert.equal(await evaluate('fetch("/not-cached-"+Date.now()).then(()=>false,()=>true)'),true,'the network really is offline');
  await evaluate('beginQuiz(AQB_QBANK.slice(0,2),"Offline",{adaptive:false});document.querySelector("#cb-0").click()');
  assert.equal(await evaluate('quiz.results.length'),1,'studying works offline');
  await evaluate('goHome()');
  await command('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  // Every static page, with an empty profile and with a seeded profile: no exceptions, no console errors.
  await command('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  const pages=['index','passages','aamc','flprep','exams','score-report','about','recall-session','passage-session','exam-session','results','exam-results'];
  const seed='(()=>{const D=n=>localDay(new Date(Date.now()+n*DAY));store.set(KEYS.plan,{date:D(83),start:D(-7),days:6,minutes:120});const m={};AQB_QBANK.slice(0,300).forEach((q,i)=>m[q.id]={S:i<40?0.3:9,D:5,last:Date.now()-2*DAY,seen:1,right:1,lapses:0});store.set(KEYS.mem,m);store.set(KEYS.daily,{[D(-2)]:40});store.set(KEYS.subjectPath,{tests:[{subj:"cp",day:D(-1),t:1,kind:"diagnostic",correct:30,total:59,pct:51,scaled:122,version:"cp_diag",cats:{"5D":{c:2,t:14}}}]});store.set(KEYS.errors,AQB_QBANK.slice(0,6).map((q,i)=>({t:Date.now()-2*DAY+i,id:q.id,src:"recall",type:i?"knowledge":"confused",chosen:"a",answer:"b"})));store.set(KEYS.examHistory,[{examId:FULL_EXAMS[0].id,date:Date.now()-DAY,total:503,sections:[]}]);return true})()';
  for(const profile of ['empty','seeded']){
    // Seed before the loop so every page, the home page included, is loaded with the seeded profile.
    if(profile==='seeded'){await command('Page.navigate',{url:origin+'/index.html'});await until('typeof store!=="undefined" && typeof AQB_QBANK!=="undefined"');await evaluate(seed);}
    for(const page of pages){
      if(profile==='empty')await evaluate('localStorage.clear();sessionStorage.clear();true');
      const before=errors.length, beforeConsole=consoleErrors.length;
      await command('Page.navigate',{url:origin+'/'+page+'.html'});
      await until('typeof activeScreen!=="undefined" && document.readyState==="complete" && document.querySelector("#today-plan .today-head")!==null');
      if(profile==='seeded')assert(await evaluate('!!store.get(KEYS.plan,null) && Object.keys(loadMem()).length>=300'),'seeded profile present on '+page+'.html');
      await sleep(150);
      assert.equal(errors.length,before,profile+' '+page+'.html threw: '+JSON.stringify(errors.slice(before)));
      assert.deepEqual(consoleErrors.slice(beforeConsole),[],profile+' '+page+'.html logged console errors');
      assert.deepEqual(await evaluate('window.__violations||[]'),[],profile+' '+page+'.html CSP violations');
    }
  }
  await command('Page.navigate',{url:origin});await until('typeof goHome==="function"');
  // The CSP allows the breached-password range API (the request itself may fail offline in CI sandboxes).
  await evaluate('fetch("https://api.pwnedpasswords.com/range/21BD1",{headers:{"Add-Padding":"true"},credentials:"omit"}).then(()=>true,()=>true)');
  await sleep(300);
  assert.deepEqual(await evaluate('window.__violations'),[],'no CSP violations or blocked actions');
  assert.equal(await evaluate('[...document.querySelectorAll("*")].some(e=>[...e.attributes].some(a=>/^on/.test(a.name)))'),false,'no inline handler attributes in the DOM');
  assert.equal(errors.length,0,JSON.stringify(errors));
  console.log('Chrome smoke passed: actual script loading, strict-CSP clicks, offline reload, runner-up reflection, TODAY 3 steps with the quiz locked, delayed diagnostic feedback, timeout scoring, study calendar, HTML escaping, one study font size on all study screens at 1280 and 390 px, a 16 px text floor at 1280 and 375 px, the flashcard lesson opening by itself after a wrong answer, and no runtime exceptions.');
 } finally {
  if(socket)socket.close();
  chrome.kill();
  await new Promise(resolve=>{if(chrome.exitCode!==null)return resolve();chrome.once('exit',resolve);setTimeout(resolve,3000)});
  await new Promise(resolve=>server.close(resolve));
  assert(profile.startsWith(path.resolve(os.tmpdir())+path.sep) && path.basename(profile).startsWith('mcat-browser-'));
  await fs.rm(profile,{recursive:true,force:true,maxRetries:20,retryDelay:100});
 }
}
main().catch(error=>{console.error(error);process.exitCode=1});
