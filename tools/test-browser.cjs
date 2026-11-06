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
  let nextId=0; const pending=new Map(), errors=[];
  socket.addEventListener('message',event=>{const data=JSON.parse(event.data); if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);const task=pending.get(data.id);if(task){pending.delete(data.id);clearTimeout(task.timer);data.error?task.reject(Error(JSON.stringify(data.error))):task.resolve(data.result)}});
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
  await until('document.querySelector("#home-actions")?.textContent.includes("Smart Session")');
  // Guests do not download the cloud SDK until they choose to sign in.
  assert.equal(await evaluate('performance.getEntriesByType("resource").some(r=>r.name.includes("vendor/supabase"))'),false,'guest boot skips the SDK');
  // The second click of a double-click/tap never answers the next question.
  await evaluate('beginQuiz(QB.slice(0,3),"Double tap",{adaptive:false});document.querySelector("#cb-0").click()');
  await evaluate('const b=document.querySelector("#next-btn");b.dispatchEvent(new MouseEvent("click",{bubbles:true,detail:1}));document.querySelector("#cb-1").dispatchEvent(new MouseEvent("click",{bubbles:true,detail:2}))');
  assert.equal(await evaluate('quiz.idx'),1);assert.equal(await evaluate('quiz.results.length'),1,'double-tap did not answer question 2');
  await evaluate('goHome()');
  assert(await evaluate('document.body.textContent.includes("Recall → passage → subject mini test")'));
  await evaluate('document.querySelector(".action-btn.smart").click()');
  await until('document.querySelector("#cb-0")!==null');
  await evaluate('document.querySelector("#cb-"+((quiz.items[quiz.idx].ans+1)%4)).click()');
  assert(await evaluate('document.querySelector("#runner-up")!==null'));
  assert(await evaluate('document.querySelector("#exp-area").textContent.includes("Answer:")')); 
  await evaluate('const select=document.querySelector("#runner-up");select.value=select.options[1].value;select.dispatchEvent(new Event("change",{bubbles:true}))');
  await until('document.querySelector("#exp-area").textContent.includes("Answer:")');
  assert(await evaluate('document.querySelector("#alternative-feedback-recall").textContent.includes("Other answer considered:")'));
  await evaluate('endQuiz();beginQuiz([QB[0]],"Correct answer check",{adaptive:false});document.querySelector("#cb-"+quiz.items[0].ans).click()');
  assert.equal(await evaluate('document.querySelector("#runner-up")===null'),true);
  await evaluate('endQuiz();startSubjectWork("biology","mini")');
  await until('document.querySelector("#pc-0")!==null');
  await evaluate('document.querySelector("#pc-0").click()');
  assert.equal(await evaluate('document.querySelector("#pp-exp").textContent'), '');
  assert(await evaluate('document.querySelector("#pp-next").textContent.includes("Feedback follows")'));
  await evaluate('pq.startedAt=Date.now()-pq.targetMs-1;updatePassageTimer()');
  await until('document.querySelector("#pp-question-box").textContent.includes("Subject mini test complete")');
  assert(await evaluate('document.querySelector("#pp-question-box").textContent.includes("Review passage:")'));
  await evaluate('goHome();document.querySelector(".plan-strip").click()');
  await evaluate('document.querySelector("#plan-date").value=localDay(new Date(Date.now()+60*DAY));savePlan()');
  assert(await evaluate('document.querySelector("#results-body").textContent.includes("Passage practice: next 7 days")'));
  assert(await evaluate('const probe=document.createElement("div");probe.innerHTML=fmt("<img src=x onerror=alert(1)>");probe.querySelector("img")===null'));
  assert.equal(await evaluate('document.querySelector("#app-nav").hidden'),false);
  await evaluate('window.scrollTo(0,document.body.scrollHeight)');
  assert(await evaluate('document.querySelector("#home-back-btn").getBoundingClientRect().top>=0 && document.querySelector("#home-back-btn").getBoundingClientRect().bottom<=innerHeight'));
  await evaluate('document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('activeScreen'), 'screen-home');
  assert.equal(await evaluate('document.querySelector("#app-nav").hidden'),true);
  await evaluate('startExam(0);beginSection();exam.elapsed[exam.si]=12345;document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('store.get(KEYS.examProgress(FULL_EXAMS[0].id),null).elapsed[0]'),12345);
  await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate('showPlan();window.scrollTo(0,document.body.scrollHeight)');
  assert(await evaluate('document.querySelector("#home-back-btn").getBoundingClientRect().top>=0 && document.querySelector("#home-back-btn").getBoundingClientRect().right<=innerWidth'));
  await evaluate('document.querySelector("#home-back-btn").click()');
  assert.equal(await evaluate('activeScreen'), 'screen-home');
  await evaluate('goHome()');
  assert(await evaluate('document.querySelector("#home-score").textContent.includes("Weekly readiness")'));
  await evaluate('showOfficialScores()');
  await evaluate('document.querySelector("#official-form").value="Scored Practice Exam 1";[125,126,127,128].forEach((n,i)=>document.querySelector("#official-"+i).value=n);document.querySelector("#official-first").checked=true;document.querySelector("#official-timed").checked=true;document.querySelector("form button[type=submit]").click()');
  assert(await evaluate('officialEligible().length===1 && document.querySelector("#results-body").textContent.includes("506")'));
  await evaluate('goHome();showProgress()');
  assert(await evaluate('document.querySelector("#results-body").textContent.includes("Official practice benchmark")'));
  await evaluate('goHome();beginQuiz([QB[0]],"Visible timer",{adaptive:false});studyTimerState().last=Date.now()-2000;tickStudyTimer()');
  assert(await evaluate('document.querySelector("#study-total-time").textContent!=="0:00"'));
  await evaluate('studyTimerState().block=48*60000;renderStudyTimer()');
  assert(await evaluate('document.querySelector("#study-break-message").textContent.includes("Finish this recall set")'));
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
  await evaluate('document.querySelector("#btn-recall").click()');
  await evaluate('document.querySelector(".sg-subject-row").click()');
  assert(await evaluate('document.querySelector(".sg-topics.open")!==null'),'row click opens the subject');
  const before=await evaluate('selectedKeys.size');
  await evaluate('document.querySelector(".sg-select-all").click()');
  assert(await evaluate('selectedKeys.size')!==before,'All/None toggles keys');
  assert(await evaluate('document.querySelector(".sg-topics.open")!==null'),'stopPropagation keeps the row open');
  await evaluate('document.querySelector(".sg-subject-row").dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}))');
  assert(await evaluate('document.querySelector(".sg-topics.open")===null'),'Enter toggles the row');
  await evaluate('document.querySelector("#recall-first-toggle").click()');
  assert.equal(await evaluate('!!prefs.recallFirst'),true,'change action reads this.checked');
  await evaluate('document.querySelector("#recall-first-toggle").click()');
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
  await until('document.querySelector("#today-plan .today-head")!==null && typeof QB!=="undefined" && QB.length===2807');
  assert.equal(await evaluate('ALL_PASSAGES.length'),78,'full bank available offline');
  assert.equal(await evaluate('fetch("/not-cached-"+Date.now()).then(()=>false,()=>true)'),true,'the network really is offline');
  await evaluate('beginQuiz(QB.slice(0,2),"Offline",{adaptive:false});document.querySelector("#cb-0").click()');
  assert.equal(await evaluate('quiz.results.length'),1,'studying works offline');
  await evaluate('goHome()');
  await command('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  assert.deepEqual(await evaluate('window.__violations'),[],'no CSP violations or blocked actions');
  assert.equal(await evaluate('[...document.querySelectorAll("*")].some(e=>[...e.attributes].some(a=>/^on/.test(a.name)))'),false,'no inline handler attributes in the DOM');
  assert.equal(errors.length,0,JSON.stringify(errors));
  console.log('Chrome smoke passed: actual script loading, strict-CSP clicks, offline reload, runner-up reflection, delayed mini feedback, timeout review, study calendar, HTML escaping, and no runtime exceptions.');
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
