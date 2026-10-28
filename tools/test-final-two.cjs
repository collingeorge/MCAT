const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(__dirname + '/../js/app.js', 'utf8');
new vm.Script(source);
function extract(name) {
 const start = source.indexOf('function ' + name + '(');
 const end = source.indexOf('\nfunction ', start + 1);
 return source.slice(start, end < 0 ? source.length : end);
}
const nodes = new Map();
const node = id => nodes.get(id) || (nodes.set(id, {innerHTML:'', classList:{toggle(){}}}), nodes.get(id));
const view = {q:{id:'a'}, choices:['alpha','beta','gamma','delta'], ans:1};
const saved=[];
const ctx = vm.createContext({console, Date, Number, LETTERS:['A','B','C','D'], esc:String, fmt:String,
 $:node, quiz:{answered:false,idx:0,items:[view],qStart:Date.now()-500}, pq:{answered:false,idx:0,views:[view],qStart:Date.now()-500},
 stopSpeedTimer(){}, finishPick(...args){saved.push(args)}, finishPassageAnswer(...args){saved.push(args)},
 confusionCard(){return null}, meaningOf(){return ''}, KEYS:{finalTwo:'two'}, store:{get(){return []},set(k,v){ctx.log=v}}});
vm.runInContext('let finalTwo=null;'+['runnerUpPrompt','setRunnerUp','stageAnswer','confirmFinalTwo','finalTwoFeedback','recordFinalTwo'].map(extract).join('\n'),ctx);
vm.runInContext("stageAnswer('recall',0)",ctx);
assert.equal(saved.length,0,'Answer must not be graded before confirmation');
assert.match(node('nxt-area').innerHTML,/Which other answer/);
assert.doesNotMatch(node('nxt-area').innerHTML, /value="0"|Correct|Incorrect/);
vm.runInContext("setRunnerUp('1'); confirmFinalTwo(); confirmFinalTwo()",ctx);
assert.equal(saved.length,1,'Double submit must not duplicate scoring');
assert.equal(saved[0][0],0); assert.equal(saved[0][1],1); assert(saved[0][2]>=500);
vm.runInContext("stageAnswer('passage',2); confirmFinalTwo()",ctx);
assert.equal(saved[1][1],null,'Skipping runner-up must work');
ctx.view=view;
assert.match(vm.runInContext('finalTwoFeedback(view,0,1)',ctx),/correct answer was in your final two/);
assert.match(vm.runInContext('finalTwoFeedback(view,0,2)',ctx),/outside your final two/);
assert.match(vm.runInContext('finalTwoFeedback(view,1,2)',ctx),/You chose correctly/);
assert.equal(vm.runInContext('finalTwoFeedback(view,1,null)',ctx),'');
vm.runInContext('recordFinalTwo(view,0,1)',ctx);
assert.equal(ctx.log[0].included,true); assert.equal(ctx.log[0].right,false);
assert(source.includes('alternatives: exam.alternatives'),'Exam runner-ups must survive completed-attempt storage');
assert(source.includes('exam.alternatives ||= exam.answers.map'),'Old saved exams must migrate');
console.log('Final-two flow, feedback, timing, skip, persistence and syntax checks passed');
