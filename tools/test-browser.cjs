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
 const chrome = spawn(process.env.CHROME_BIN || 'google-chrome',['--headless=new','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore','ignore','pipe']});
 let socket;
 try {
  const endpoint = await new Promise((resolve,reject) => {
   let log=''; const timer=setTimeout(()=>reject(Error('Chrome did not start: '+log.slice(-1500))),15000);
   chrome.once('error',e=>{clearTimeout(timer);reject(e)});
   chrome.stderr.on('data',chunk=>{log+=chunk; const hit=log.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(hit){clearTimeout(timer);resolve(hit[1])}});
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
  let nextId=0; const pending=new Map(), errors=[];
  socket.addEventListener('message',event=>{const data=JSON.parse(event.data); if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails);const task=pending.get(data.id);if(task){pending.delete(data.id);clearTimeout(task.timer);data.error?task.reject(Error(JSON.stringify(data.error))):task.resolve(data.result)}});
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++nextId;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method))},15000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}))});
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const command=(method,params)=>send(method,params,sessionId);
  await command('Runtime.enable'); await command('Page.enable'); await command('Page.navigate',{url:origin});
  const evaluate=async expression=>{const result=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value};
  const until=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await sleep(100)}throw Error('Browser condition failed: '+expression)};
  await until('document.querySelector("#home-actions")?.textContent.includes("Smart Session")');
  assert(await evaluate('document.body.textContent.includes("Recall → passage → subject mini test")'));
  await evaluate('document.querySelector(".action-btn.smart").click()');
  await until('document.querySelector("#cb-0")!==null');
  await evaluate('document.querySelector("#cb-0").click()');
  assert(await evaluate('document.querySelector("#runner-up")!==null'));
  assert.equal(await evaluate('document.querySelector("#exp-area").textContent'), '');
  await evaluate('const select=document.querySelector("#runner-up");select.value=select.options[1].value;select.dispatchEvent(new Event("change",{bubbles:true}));document.querySelector("#nxt-area .next-btn").click()');
  await until('document.querySelector("#exp-area").textContent.includes("Answer:")');
  assert(await evaluate('document.querySelector("#exp-area").textContent.includes("Your final two:")'));
  await evaluate('endQuiz();startSubjectWork("biology","mini")');
  await until('document.querySelector("#pc-0")!==null');
  await evaluate('document.querySelector("#pc-0").click();document.querySelector("#pp-next .next-btn").click()');
  assert.equal(await evaluate('document.querySelector("#pp-exp").textContent'), '');
  assert(await evaluate('document.querySelector("#pp-next").textContent.includes("Feedback follows")'));
  await evaluate('pq.startedAt=Date.now()-pq.targetMs-1;updatePassageTimer()');
  await until('document.querySelector("#pp-question-box").textContent.includes("Subject mini test complete")');
  assert(await evaluate('document.querySelector("#pp-question-box").textContent.includes("Review passage:")'));
  await evaluate('goHome();document.querySelector(".plan-strip").click()');
  await evaluate('document.querySelector("#plan-date").value=localDay(new Date(Date.now()+60*DAY));savePlan()');
  assert(await evaluate('document.querySelector("#results-body").textContent.includes("Passage practice: next 7 days")'));
  assert(await evaluate('const probe=document.createElement("div");probe.innerHTML=fmt("<img src=x onerror=alert(1)>");probe.querySelector("img")===null'));
  assert.equal(errors.length,0,JSON.stringify(errors));
  console.log('Chrome smoke passed: actual script loading, CSP-compatible clicks, runner-up reflection, delayed mini feedback, timeout review, study calendar, HTML escaping, and no runtime exceptions.');
 } finally {
  if(socket)socket.close();
  chrome.kill();
  await new Promise(resolve=>{if(chrome.exitCode!==null)return resolve();chrome.once('exit',resolve);setTimeout(resolve,3000)});
  await new Promise(resolve=>server.close(resolve));
  assert(profile.startsWith(path.resolve(os.tmpdir())+path.sep) && path.basename(profile).startsWith('mcat-browser-'));
  await fs.rm(profile,{recursive:true,force:true});
 }
}
main().catch(error=>{console.error(error);process.exitCode=1});
