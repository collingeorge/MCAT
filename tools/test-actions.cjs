// Strict-CSP UI actions: every rendered data-* action parses, is allowlisted and resolves
// to a real function; the parser rejects anything that is not a plain literal call.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const storage = new Map(), nodes = new Map();
const el = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '', value: '', style: {}, dataset: {}, classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, focus() {}, scrollIntoView() {}, remove() {}, querySelectorAll() { return []; } }); return nodes.get(id); };
const ctx = vm.createContext({ console, Date, Math, Map, Set, URLSearchParams, setInterval() { return 1; }, clearInterval() {}, setTimeout() {}, confirm() { return true; }, alert() {}, navigator: {}, location: { protocol: 'http:', search: '' }, document: { getElementById: el, querySelectorAll() { return []; }, addEventListener() {} }, localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) } });
ctx.window = ctx; ctx.window.scrollTo = () => {};
const run = code => vm.runInContext(code, ctx);
const index = fs.readFileSync(root + '/index.html', 'utf8');
for (const [, file] of index.matchAll(/<script src="([^"]+)"/g)) if (!/account|cloud-config|pages/.test(file)) run(fs.readFileSync(root + '/' + file, 'utf8'));
const { ACTIONS, parse } = run('McatActions');

// CSP: no inline script anywhere and no third-party script origin.
const csp = /Content-Security-Policy" content="([^"]+)"/.exec(index)[1];
assert.match(csp, /script-src 'self';/); assert.doesNotMatch(csp, /script-src[^;]*unsafe/);
assert.doesNotMatch(csp, /jsdelivr|unsafe-eval/);
assert.doesNotMatch(index, /<script(?![^>]*\ssrc=)[^>]*>/, 'no inline <script> blocks');
const sources = ['index.html', ...fs.readdirSync(root + '/js').map(f => 'js/' + f)].map(f => [f, fs.readFileSync(root + '/' + f, 'utf8')]);
for (const [f, src] of sources) assert.doesNotMatch(src, /\son(click|input|change|submit|keydown|keyup|load|error|focus|blur|mouse\w+)=["'\\]/, f + ' has an inline event handler');

// The self-hosted SDK is pinned by SRI and precached for offline starts.
const sri = /SDK_SRI='(sha384-[^']+)'/.exec(fs.readFileSync(root + '/js/account.js', 'utf8'))[1];
const sdkFile = /SDK_SRC='([^']+)'/.exec(fs.readFileSync(root + '/js/account.js', 'utf8'))[1];
assert.equal(sri, 'sha384-' + require('node:crypto').createHash('sha384').update(fs.readFileSync(root + '/' + sdkFile)).digest('base64'), 'SRI matches the vendored SDK');
assert.match(fs.readFileSync(root + '/sw.js', 'utf8'), new RegExp("'" + sdkFile.replace(/\./g, '\\.') + "'"));
assert.match(fs.readFileSync(root + '/sw.js', 'utf8'), /'js\/actions\.js'/);
// connect-src is pinned to this app's Supabase project, not every *.supabase.co project.
const projectUrl = /url: '([^']+)'/.exec(fs.readFileSync(root + '/js/cloud-config.js', 'utf8'))[1];
assert.match(csp, new RegExp("connect-src 'self' " + projectUrl.replace(/\./g, '\\.') + ';'));
assert.doesNotMatch(csp, /\*\.supabase/);
// No inline styles either: style-src 'self', and computed styles go through the data-css allowlist.
assert.match(csp, /style-src 'self';/); assert.doesNotMatch(csp, /style-src[^;]*unsafe/);
for (const [f, src] of sources) assert.doesNotMatch(src, /\sstyle=\\?["']|<style[\s>]/, f + ' has an inline style');
{
  const { apply } = run('McatDataCss');
  const set = []; const fake = css => ({ getAttribute: () => css, style: { setProperty: (k, v) => set.push(k + ':' + v) } });
  apply(fake('width:42.5%;background:var(--green);color:var(--slate);left:-3%'));
  assert.deepEqual(set.splice(0), ['width:42.5%', 'background:var(--green)', 'color:var(--slate)', 'left:-3%']);
  apply(fake('position:fixed;inset:0;width:100vw;background:url(https://evil.example/x);color:red;z-index:9;opacity:0;left:calc(1px)'));
  assert.deepEqual(set, [], 'data-css rejects every property or value outside the allowlist');
}
// Parser accepts the forms the app uses and nothing else.
assert.equal(parse("startSubjectWork('cars',\"passage\")")[0].args.map(a => a.value).join(), 'cars,passage');
assert.equal(parse('event.stopPropagation();setSubjectKeys(2,false,1)').length, 2);
assert.equal(parse('setStudyTimerGoal(this.value)')[0].args[0].prop, 'value');
assert.equal(parse('showAbout();return false')[1].prevent, true);
for (const bad of ['alert(1)', 'goHome(document.cookie)', 'goHome();fetch("x")', 'eval("1")', 'window.goHome()', "goHome('x')+1", 'constructor.constructor("x")()', 'goHome(1);(', 'McatAccount.__proto__()']) assert.throws(() => parse(bad), bad);

// Every allowlisted action is a real function in the loaded app (account actions live in account.js).
const account = fs.readFileSync(root + '/js/account.js', 'utf8');
for (const name of ACTIONS) {
  if (name.startsWith('McatAccount.')) assert.match(account, new RegExp('window\\.McatAccount=\\{[^}]*\\b' + name.split('.')[1] + '\\b'), name);
  else assert.equal(run('typeof ' + name), 'function', name + ' is allowlisted but not defined');
}

// Render the main screens and parse every action that actually appears in the markup.
const seen = new Set();
function harvest() {
  for (const node of nodes.values()) for (const m of String(node.innerHTML).matchAll(/data-(click|input|change|submit|enter)="([^"]*)"/g)) {
    const text = m[2].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    parse(text).forEach(st => st.name && seen.add(st.name));
  }
}
const day = n => run('localDay(new Date(Date.now()+(' + n + ')*DAY))');
run(`store.set(KEYS.plan,{date:'${day(83)}',start:'${day(-7)}',days:6,minutes:120});const ids=QB.slice(0,4).map(q=>q.id);const m={};ids.forEach(id=>m[id]={S:0.3,D:5,last:Date.now()-2*DAY,seen:1,right:0,lapses:1});store.set(KEYS.mem,m);
  const p=ALL_PASSAGES.find(p=>!EXAM_PASSAGE_IDS.has(p.id));store.set(KEYS.errors,[...ids.map((id,i)=>({t:Date.now()-2*DAY+i,id,src:'recall',type:i?'knowledge':'confused',chosen:'a',answer:'b'})),{t:Date.now()-2*DAY+9,id:p.id+'#0',src:'passage',type:'reasoning',chosen:'a',answer:'b'}]);store.set(KEYS.daily,{['${day(-2)}']:5})`);
const screens = ['renderHome()', "setMode('passage')", "setMode('exam')", "setMode('recall');openSubjects.add(0);renderSubjectGrid()", 'showPlan()', 'showProgress()', 'showOfficialScores()', 'showAbout()', 'startPassageMissReview()', 'showConfusionReview()',
  'startDueReview();pick((quiz.items[0].ans+1)%4);renderNextArea()', 'endQuiz()', "selectedPassageId=ALL_PASSAGES[0].id;startPassage();answerPassage((pq.views[0].ans+1)%4)", 'goHome();startSubjectWork("biology","mini")', 'goHome();startExam(0)', 'beginSection()', 'openSectionReview()', 'renderStudyTimer()'];
for (const code of screens) { run(code); harvest(); }
for (const name of seen) assert(ACTIONS.has(name), name + ' rendered but not allowlisted');
assert(seen.size >= 45, 'harvested ' + seen.size + ' distinct actions');
// Markup planted in synced score logs renders as nothing, not as elements or actions.
const payload = '<div data-click="resetProgress()" style="position:fixed;inset:0">x</div><meta http-equiv="refresh" content="0;url=https://evil.example">';
storage.set('mcat2_exam_history', JSON.stringify([{ examId: run('FULL_EXAMS[0].id'), date: Date.now(), total: payload, sections: [{ id: 'cp', scaled: payload, pct: 50 }] }, { examId: run('FULL_EXAMS[0].id'), date: Date.now(), total: 501, sections: [] }]));
storage.set('mcat2_score_history', JSON.stringify([{ day: payload, total: 500 }, { day: '2026-11-01', total: payload }, { day: '2026-11-02', total: 501 }, { day: '2026-11-03', total: 503 }]));
run('showProgress()');
assert.doesNotMatch(el('results-body').innerHTML, /evil\.example|position:fixed|data-click="resetProgress\(\)" style/, 'score report ignores planted markup');
assert.match(el('results-body').innerHTML, /501/);
run('renderExamList()'); assert.doesNotMatch(el('exam-list').innerHTML, /evil\.example/);
assert.equal(run("validExamAttempt({ei:0,results:[{correct:1,total:2,pct:50,scaled:'<b>'}],answers:[],orders:[]})"), null);
storage.delete('mcat2_exam_history'); storage.delete('mcat2_score_history');
// Secret scan: no server-side keys, private keys or service tokens anywhere in the repository.
{
  const { execSync } = require('node:child_process');
  const files = execSync('git ls-files', { cwd: root, encoding: 'utf8' }).split('\n').filter(f => f && !/\.(png|jpg|ico|webp)$/.test(f));
  for (const f of files) {
    const text = fs.readFileSync(root + '/' + f, 'utf8');
    assert.doesNotMatch(text, /sb_secret_[A-Za-z0-9]|service_role["']?\s*[:=]\s*["']ey|-----BEGIN [A-Z ]*PRIVATE KEY-----|\bAKIA[0-9A-Z]{16}\b|\bghp_[A-Za-z0-9]{30,}|\bsk-[A-Za-z0-9]{32,}/, f + ' contains a secret');
  }
  assert.match(fs.readFileSync(root + '/js/cloud-config.js', 'utf8'), /publishableKey: 'sb_publishable_/, 'only the public publishable key is configured');
}
console.log('UI actions passed: strict CSP (script-src and style-src self), no inline handlers, literal-only parser, ' + ACTIONS.size + ' allowlisted functions defined, ' + seen.size + ' rendered actions verified.');
