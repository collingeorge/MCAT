const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/..';
const storage=new Map(),nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){},focus(){},scrollIntoView(){},remove(){}});return nodes.get(id);}
const ctx=vm.createContext({console,Date,Math,Map,Set,URLSearchParams,setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},navigator:{},location:{protocol:'http:',search:''},window:{scrollTo(){}},document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
const run=code=>vm.runInContext(code,ctx);
// Banks the app loads on demand (BANKS in js/app.js), loaded first as the browser would have them.
for (const f of Object.values(new Function('return ' + /const BANKS = (\{[^\n]+\});/.exec(fs.readFileSync(root + '/js/app.js', 'utf8'))[1])()).flat()) run(fs.readFileSync(root + '/' + f, 'utf8'));
for(const [,file]of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^"?]+)/g))run(fs.readFileSync(root+'/'+file,'utf8'));

// (Delayed-recall retention and the weekly readiness card were removed with the recall decks.)
run('const passage=EXAM_CARS[0];const initial=beginPassageExposure(passage)');
assert.equal(run('initial'),true);assert.equal(run('beginPassageExposure(passage)'),false,'Abandoning a passage cannot restore first exposure');
run('recordPassageEvidence(passage,[{right:true,ms:1000},{right:false,ms:2000}],initial,"tutor")');
{const rows=JSON.parse(run('JSON.stringify(store.get(KEYS.passageEvidence,[]))'));assert.equal(rows.filter(r=>r.first).length,1);assert.equal(rows[0].answerMs,3000);}
run('recordPassageEvidence(passage,[{right:true,ms:800}],false,"mini")');assert.equal(run('store.get(KEYS.passageEvidence,[]).filter(r=>!r.first).length'),1);
run('store.set(KEYS.passages,{legacy:{attempts:1}})');assert.equal(run('beginPassageExposure({id:"legacy"})'),false);
run('logError({disc:"biology",type:"reasoning",src:"passage"})');assert.equal(run('store.get(KEYS.errors,[]).at(-1).type'),'reasoning');
run('showOfficialScores()');
el('official-date').value='2026-01-01';el('official-form').value='<img src=x onerror=alert(1)>';el('official-first').checked=true;el('official-timed').checked=true;
[125,126,127,128].forEach((v,i)=>el('official-'+i).value=String(v));run('saveOfficialScore()');
assert.equal(run('officialEligible().length'),1);assert.match(run('officialScoresCard()'),/506/);assert.doesNotMatch(run('officialScoresCard()'),/<img/);
run('saveOfficialScore()');assert.equal(run('officialScores().length'),1,'Duplicate results are rejected');
el('official-form').value='Untimed other exam';el('official-timed').checked=false;run('saveOfficialScore()');assert.equal(run('officialScores().length'),2);assert.equal(run('officialEligible().length'),1);
el('official-date').value='2026-02-30';el('official-form').value='Invalid date';run('saveOfficialScore()');assert.equal(run('officialScores().length'),2);
el('official-date').value='2026-01-02';el('official-0').value='133';run('saveOfficialScore()');assert.equal(run('officialScores().length'),2);
run('resetProgress()');assert.equal(run('officialScores().length'),0);assert.equal(run('store.get(KEYS.retention,[]).length'),0);
console.log('Learning-evidence checks passed: abandoned and legacy exposure, first/repeat separation, reasoning guidance, official validation/duplicates/escaping/exclusions, and reset.');
