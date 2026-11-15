// Learning evidence is descriptive; thresholds are study heuristics, not validated cutoffs.
const LEARNING_DELAY = 3 * 86400000;
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
  store.set(KEYS.passageEvidence,rows.slice(-500));
}
// Synced rows are untrusted: keep only well-formed records with four integer section scores.
function officialScores() { return store.get(KEYS.official,[]).filter(x=>x&&typeof x==='object'&&typeof x.date==='string'&&typeof x.form==='string'&&Array.isArray(x.scores)&&x.scores.length===4&&x.scores.every(n=>Number.isInteger(n)&&n>=118&&n<=132)).sort((a,b)=>a.date.localeCompare(b.date)||(a.t||0)-(b.t||0)); }
function officialEligible() { return officialScores().filter(x=>x.first&&x.timed).slice(-3); }
function officialScoresCard() {
  const all=officialScores(), rows=officialEligible(), mean=rows.length?Math.round(rows.reduce((s,x)=>s+x.scores.reduce((a,b)=>a+b,0),0)/rows.length):null;
  const totals=rows.map(x=>x.scores.reduce((a,b)=>a+b,0));
  return '<div class="results-card"><div class="section-label">Official practice benchmark</div><p>'+(mean==null?'No first-attempt, timed official scored exams recorded.':'Recent timed first-attempt average: <b>'+mean+'</b> across '+rows.length+' exam(s); range '+Math.min(...totals)+'–'+Math.max(...totals)+'.')+'</p>'+(rows.length?'<p>Lowest recent section average: <b>'+['C/P','CARS','B/B','P/S'][[0,1,2,3].sort((a,b)=>rows.reduce((s,x)=>s+x.scores[a]-x.scores[b],0))[0]]+'</b>. Review those errors before scheduling the next exam.</p>':'')+'<p class="muted-note">Self-reported AAMC scored practice results, kept separate from app estimates. Retakes and untimed attempts remain in history but are excluded from this benchmark. No score offset or test-day prediction is inferred.</p><button class="micro-btn" data-click="showOfficialScores()">Record / manage official results</button>'+(all.length?'<ul>'+all.map(x=>'<li>'+esc(x.date)+' · '+esc(x.form)+' · '+x.scores.join(' / ')+' = '+x.scores.reduce((a,b)=>a+b,0)+(x.first?' · first attempt':' · retake')+(x.timed?' · timed':' · untimed')+'</li>').join('')+'</ul>':'')+'</div>';
}
function showOfficialScores() {
  show('screen-results');
  $('results-body').innerHTML='<div class="results-hero"><div class="r-label">Official scored practice results</div></div>'+officialScoresCard()+'<form class="results-card" data-submit="saveOfficialScore()"><p>Enter the four section scores reported by an AAMC scored practice exam. Do not convert an unscored sample percentage.</p><label>Exam date <input id="official-date" type="date" max="'+localDay()+'" value="'+localDay()+'" required></label><label>Exam identifier <input id="official-form" maxlength="60" required placeholder="e.g. Scored Practice Exam 1"></label><p>'+['C/P','CARS','B/B','P/S'].map((s,i)=>'<label>'+s+' <input id="official-'+i+'" type="number" min="118" max="132" step="1" required></label>').join(' ')+'</p><label><input id="official-first" type="checkbox"> First attempt at this exam</label><br><label><input id="official-timed" type="checkbox"> Standard timing, without pauses or outside help</label><p id="official-error" role="alert"></p><button class="new-quiz-btn" type="submit">Save result</button></form><button class="text-btn danger" data-click="clearOfficialScores()">Clear official results</button><button class="new-quiz-btn secondary" data-click="goHome()">Home</button>';
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
