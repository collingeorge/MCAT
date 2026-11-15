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
  // TODAY after the diagnostic, in order: diagnostic (retake), 50 flashcards, 50 Practice Exam cards, 50 passage questions, the quiz.
  await evaluate('goHome()');
  assert.deepEqual(await evaluate('[...document.querySelectorAll("#today-plan .today-step .today-title > b")].map(b=>b.textContent)'),['Diagnostic','Flashcards','Guided Practice Exam cards with walkthroughs','Passage questions','30-question quiz']);
  await evaluate('document.querySelector("#today-plan [data-click=\'startMasteryPassages()\']").click()');
  await until('document.querySelector("#pc-0")!==null && pq.masteryPractice==="step"');
  await evaluate('document.querySelector("#pc-"+pq.views[0].ans).click()');
  assert.equal(await evaluate('masteryPlanNow().steps.find(s=>s.id==="passages").progress'),1,'a passage answer counts toward the step');
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
  await evaluate('goHome();document.querySelector("#btn-passage").click()');
  assert.equal(await evaluate('prefs.mode'),'passage');
  await evaluate('document.querySelector("#btn-aamc").click()');
  assert.equal(await evaluate('["aamc","flprep"].includes(prefs.mode)'),true);
  await evaluate('goHome();document.querySelector("#btn-passage").click()');
  assert(await evaluate('document.querySelector("#passage-selector").textContent.includes("Chem/Phys")'));
  // A change action reads this.value: the path's goal select.
  await evaluate('goHome();const g=document.querySelector("[data-change^=\\"setMasteryGoal\\"]");g.value="129";g.dispatchEvent(new Event("change",{bubbles:true}))');
  assert.equal(await evaluate('masteryLoad().goal'),129,'change action reads this.value');
  await evaluate('setMasteryGoal(128)');
  await evaluate('document.querySelector("[data-click^=\\"showPlan\\"]")?.click()||showPlan()');
  assert.equal(await evaluate('activeScreen'),'screen-results');
  await evaluate('goHome()');
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
  assert.equal(await evaluate('Promise.all(Object.keys(BANKS).map(ensureBank)).then(()=>LISTED_PASSAGES.length+"/"+FLQ.length+"/"+EXAM_CARS.length+"/"+CP_POOL.length+"/"+AAMC_PREP.length)'),'36/354/18/6/3','approved content, including the on-demand banks, available offline');
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
  console.log('Chrome smoke passed: actual script loading, strict-CSP clicks, offline reload, runner-up reflection, TODAY order and passage step, delayed diagnostic feedback, timeout scoring, study calendar, HTML escaping, and no runtime exceptions.');
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
