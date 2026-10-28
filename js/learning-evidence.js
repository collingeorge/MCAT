// Learning evidence is descriptive; thresholds are study heuristics, not validated cutoffs.
const LEARNING_DELAY = 3 * 86400000;
function recordDelayedRecall(q, right, previous, now) {
  if (!previous?.seen || !Number.isFinite(previous.last) || now - previous.last < LEARNING_DELAY) return;
  const rows = store.get(KEYS.retention, []);
  rows.push({t:now,id:q.baseId||q.id,key:q.key,disc:disciplineOfRecall(q),right:!!right,gap:now-previous.last});
  store.set(KEYS.retention, rows.slice(-2000));
}
function retainedFact(m) { return !!m && m.S >= 21 && (m.delayedCorrect || 0) >= 2; }
function beginPassageExposure(p) {
  const exposures=store.get(KEYS.exposures,{}), legacy=store.get(KEYS.passages,{});
  const first=!exposures[p.id] && !legacy[p.id]?.attempts;
  exposures[p.id]={firstAt:exposures[p.id]?.firstAt || Date.now(), starts:(exposures[p.id]?.starts||0)+1};
  store.set(KEYS.exposures,exposures);
  return first;
}
function recordPassageEvidence(p, results, first, mode) {
  const rows=store.get(KEYS.passageEvidence,[]);
  rows.push({t:Date.now(),id:p.id,disc:disciplineOfPassage(p),first:!!first,mode,correct:results.filter(r=>r.right).length,total:results.length,answerMs:results.reduce((n,r)=>n+(Number.isFinite(r.ms)?Math.max(0,r.ms):0),0)});
  store.set(KEYS.passageEvidence,rows.slice(-1000));
}
function readinessData(now=Date.now()) {
  const recent=x=>Number.isFinite(x.t)&&x.t<=now&&now-x.t<7*DAY;
  const retention=store.get(KEYS.retention,[]).filter(recent);
  const passages=store.get(KEYS.passageEvidence,[]).filter(recent);
  const errors=store.get(KEYS.errors,[]).filter(recent);
  const types={};errors.forEach(e=>{if(ERROR_TYPES.some(x=>x[0]===e.type))types[e.type]=(types[e.type]||0)+1;});
  const top=Object.entries(types).sort((a,b)=>b[1]-a[1])[0];
  return {retention,passages,errors,top,first:passages.filter(x=>x.first),repeated:passages.filter(x=>!x.first)};
}
function startRetentionRepair() {
  const rows=store.get(KEYS.retention,[]).filter(x=>Date.now()-x.t<7*DAY), latest=new Map();
  rows.forEach(x=>latest.set(x.id,x));
  const pool=[...latest.values()].filter(x=>!x.right).map(x=>QB_BY_ID.get(x.id)).filter(Boolean);
  if(pool.length)beginQuiz(pool.slice(0,10),'Repair delayed recall');else startDueReview();
}
function weeklyReadinessCard() {
  const d=readinessData(), needs=learningNeeds();
  const ratio=rows=>{const n=rows.reduce((s,x)=>s+x.total,0),c=rows.reduce((s,x)=>s+x.correct,0);return n?pct(c,n)+'% ('+c+'/'+n+' questions; '+rows.length+' passages)':'No completed passages recorded';};
  const choices=[];
  if(d.retention.some(x=>!x.right))choices.push('<button class="micro-btn" onclick="startRetentionRepair()">Repair delayed recall misses</button>');
  else choices.push('<button class="micro-btn" onclick="startDueReview()">Review due facts</button>');
  if(needs.weak.length)choices.push('<button class="micro-btn" onclick="startWeakTopic()">Repair '+esc(KEY_LABEL[needs.weak[0].k]||needs.weak[0].k)+'</button>');
  const work=pathRecommendation();
  if(work)choices.push('<button class="micro-btn" onclick="startSubjectWork(&quot;'+work.subj+'&quot;,&quot;passage&quot;)">Apply learning in '+esc(DISCIPLINES[work.subj])+'</button>');
  if(choices.length<3)choices.push('<button class="micro-btn" onclick="showOfficialScores()">Review official practice results</button>');
  return '<div class="results-card"><div class="section-label">Weekly readiness · last 7 days</div><p><b>Delayed recall (3+ days):</b> '+(d.retention.length?pct(d.retention.filter(x=>x.right).length,d.retention.length)+'% correct across '+d.retention.length+' checks':'Not enough history yet; immediate retries do not count')+'.</p><p><b>First-exposure passages:</b> '+ratio(d.first)+'.<br><b>Repeated passages:</b> '+ratio(d.repeated)+'.</p>'+(d.first.length?'<p class="muted-note">First-exposure answer time: '+fmtTime(d.first.reduce((s,x)=>s+x.answerMs,0))+'. Tutor feedback and review time are excluded; this is not an exam pace score.</p>':'')+(d.top?'<p><b>Most reported error:</b> '+esc(ERROR_TYPES.find(x=>x[0]===d.top[0])[1])+' ('+d.top[1]+' of '+d.errors.length+' misses). '+ERROR_ADVICE[d.top[0]]+'</p>':'<p class="muted-note">Label misses to distinguish content, reasoning, calculation, reading and timing needs.</p>')+'<div class="sw-head">Three next actions</div><div class="btn-row">'+choices.slice(0,3).join('')+'</div><p class="muted-note">Practice indicators, not a readiness certification. Started or abandoned passages count as exposed; older records cannot establish first exposure.</p></div>';
}
function officialScores() { return store.get(KEYS.official,[]).slice().sort((a,b)=>a.date.localeCompare(b.date)||a.t-b.t); }
function officialEligible() { return officialScores().filter(x=>x.first&&x.timed).slice(-3); }
function officialScoresCard() {
  const all=officialScores(), rows=officialEligible(), mean=rows.length?Math.round(rows.reduce((s,x)=>s+x.scores.reduce((a,b)=>a+b,0),0)/rows.length):null;
  const totals=rows.map(x=>x.scores.reduce((a,b)=>a+b,0));
  return '<div class="results-card"><div class="section-label">Official practice benchmark</div><p>'+(mean==null?'No first-attempt, timed official scored exams recorded.':'Recent timed first-attempt average: <b>'+mean+'</b> across '+rows.length+' exam(s); range '+Math.min(...totals)+'–'+Math.max(...totals)+'.')+'</p>'+(rows.length?'<p>Lowest recent section average: <b>'+['C/P','CARS','B/B','P/S'][[0,1,2,3].sort((a,b)=>rows.reduce((s,x)=>s+x.scores[a]-x.scores[b],0))[0]]+'</b>. Review those errors before scheduling the next exam.</p>':'')+'<p class="muted-note">Self-reported AAMC scored practice results, kept separate from app estimates. Retakes and untimed attempts remain in history but are excluded from this benchmark. No score offset or test-day prediction is inferred.</p><button class="micro-btn" onclick="showOfficialScores()">Record / manage official results</button>'+(all.length?'<ul>'+all.map(x=>'<li>'+esc(x.date)+' · '+esc(x.form)+' · '+x.scores.join(' / ')+' = '+x.scores.reduce((a,b)=>a+b,0)+(x.first?' · first attempt':' · retake')+(x.timed?' · timed':' · untimed')+'</li>').join('')+'</ul>':'')+'</div>';
}
function showOfficialScores() {
  show('screen-results');
  $('results-body').innerHTML='<div class="results-hero"><div class="r-label">Official scored practice results</div></div>'+officialScoresCard()+'<form class="results-card" onsubmit="event.preventDefault();saveOfficialScore()"><p>Enter the four section scores reported by an AAMC scored practice exam. Do not convert an unscored sample percentage.</p><label>Exam date <input id="official-date" type="date" max="'+localDay()+'" value="'+localDay()+'" required></label><label>Exam identifier <input id="official-form" maxlength="60" required placeholder="e.g. Scored Practice Exam 1"></label><p>'+['C/P','CARS','B/B','P/S'].map((s,i)=>'<label>'+s+' <input id="official-'+i+'" type="number" min="118" max="132" step="1" required></label>').join(' ')+'</p><label><input id="official-first" type="checkbox"> First attempt at this exam</label><br><label><input id="official-timed" type="checkbox"> Standard timing, without pauses or outside help</label><p id="official-error" role="alert"></p><button class="new-quiz-btn" type="submit">Save result</button></form><button class="text-btn danger" onclick="clearOfficialScores()">Clear official results</button><button class="new-quiz-btn secondary" onclick="goHome()">Home</button>';
}
function saveOfficialScore() {
  const date=$('official-date').value, form=$('official-form').value.trim(), scores=[0,1,2,3].map(i=>Number($('official-'+i).value));
  const validDate=/^\d{4}-\d{2}-\d{2}$/.test(date)&&Number.isFinite(new Date(date+'T12:00:00').getTime())&&localDay(new Date(date+'T12:00:00'))===date&&date<=localDay();
  if(!validDate||!form||form.length>60||scores.some(x=>!Number.isInteger(x)||x<118||x>132)){$('official-error').textContent='Enter a valid date, exam identifier, and four whole-number scores from 118 to 132.';return;}
  const rows=officialScores(), first=$('official-first').checked, timed=$('official-timed').checked;
  if(rows.some(x=>x.date===date&&normTerm(x.form)===normTerm(form)) || (first&&rows.some(x=>x.first&&normTerm(x.form)===normTerm(form)))){$('official-error').textContent='This exam already has that date or a recorded first attempt. Clear an incorrect entry before replacing it.';return;}
  rows.push({t:Date.now(),date,form,scores,first,timed});store.set(KEYS.official,rows.slice(-100));showOfficialScores();
}
function clearOfficialScores(){if(confirm('Erase the official practice results recorded on this device?')){store.del(KEYS.official);showOfficialScores();}}
