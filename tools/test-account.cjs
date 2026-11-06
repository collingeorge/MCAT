const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/..',data=new Map(),nodes=new Map();let reloads=0,cloud=null,offline=false,rpcCalls=0;
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222';
let loginUser={id:A,email:'student@example.test'},session=null,exchangedCode=null;
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',open:false});return nodes.get(id);}
const client={auth:{onAuthStateChange(){},async exchangeCodeForSession(code){exchangedCode=code;return {data:{session}};},async getSession(){return {data:{session}};},async signInWithPassword(){session={user:loginUser};return {data:{session}};},async signUp(){return {data:{}};},async resetPasswordForEmail(){return {data:{}};},async updateUser(){return {data:{}};},async signOut(){session=null;return {}; }},from(){return {select(){return this;},eq(){return this;},async maybeSingle(){return offline?{error:{message:'offline'}}:{data:cloud};}};},async rpc(name,args){rpcCalls++;if(offline)return {error:{message:'offline'}};assert.equal(name,'save_mcat_progress');if((cloud?.revision||0)!==args.p_expected_revision)return {data:{conflict:true,revision:cloud.revision}};cloud={revision:(cloud?.revision||0)+1,payload:JSON.parse(JSON.stringify(args.p_payload))};return {data:{revision:cloud.revision}};}};
const ctx=vm.createContext({console,Date,Math,Set,URL,clearTimeout(){},setTimeout(){return 1;},confirm(){return true;},KEYS:{stats:'mcat2_stats',mem:'mcat2_memory',dailyPlan:'mcat2_daily_plan',externalPassages:'mcat2_external_passages'},STUDY_TIMER_KEY:'mcat2_study_timer',FULL_EXAMS:[],showProgress(){},mockSdk:{createClient(){return client;}},window:{MCAT_CLOUD_CONFIG:{url:'https://test.supabase.co',publishableKey:'sb_publishable_test'}},document:{getElementById:el},location:{href:'https://example.test/index.html',reload(){reloads++;}},localStorage:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)}});
const run=s=>vm.runInContext(s,ctx);
ctx.URLSearchParams=URLSearchParams;
run('location.search="?code=verification-test-code"');
run(fs.readFileSync(root+'/js/account.js','utf8').replace('await import(SDK)','mockSdk'));
run('location.search=""'); // Simulate pages.js normalizing the URL before async initialization.
const api=run('window.McatAccount');
async function main(){
 await api.init();assert.match(el('account-status').textContent,/Signed out/);assert.equal(exchangedCode,'verification-test-code');
 data.set('mcat2_stats',JSON.stringify({biology:{c:4,t:5}}));data.set('sb-project-auth-token','PRIVATE_TOKEN');
 assert.equal(api.storageKey('mcat2_stats'),'mcat2_stats');
 assert(!JSON.stringify(api.snapshot()).includes('PRIVATE_TOKEN'));
 assert.throws(()=>api.validate({schema:1,values:{'sb-project-auth-token':'bad'}}));
 assert.match(fs.readFileSync(root+'/js/app.js','utf8'),/dailyPlan: 'mcat2_daily_plan'[\s\S]*externalPassages: 'mcat2_external_passages'/,'Real KEYS register the TODAY-plan keys for sync');
 // TODAY-plan completion state and external passage logs sync like other progress keys.
 data.set('mcat2_daily_plan',JSON.stringify({days:{'2026-11-05':{type:'study',newQuota:40,newDone:12,done:{closeout:true}}}}));data.set('mcat2_external_passages',JSON.stringify([{t:1,day:'2026-11-05',subj:'cars',source:'uworld',n:6,correct:4,first:true}]));
 assert.equal(api.snapshot().values.mcat2_daily_plan.days['2026-11-05'].newDone,12);assert.equal(api.snapshot().values.mcat2_external_passages[0].subj,'cars');
 assert.doesNotThrow(()=>api.validate(api.snapshot()));assert.doesNotThrow(()=>api.validate({schema:1,values:{}}),'A fresh account without plan keys is valid');
 data.delete('mcat2_daily_plan');data.delete('mcat2_external_passages');
 el('account-email').value='student@example.test';el('account-password').value='test-only-password';
 await api.action('login');assert.equal(el('account-password').value,'');
 assert(api.storageKey('mcat2_stats').includes(A),'An empty cloud account adopts displayed progress and enables automatic saving');
 await api.choose('guest');assert.equal(cloud.revision,1);assert.equal(cloud.payload.values.mcat2_stats.biology.c,4);assert.equal(reloads,1);
 assert(api.storageKey('mcat2_stats').includes(A));
 data.set(api.storageKey('mcat2_stats'),JSON.stringify({biology:{c:5,t:6}}));api.changed();await api.sync();assert.equal(cloud.revision,2);assert.equal(cloud.payload.values.mcat2_stats.biology.c,5);
 offline=true;data.set(api.storageKey('mcat2_stats'),JSON.stringify({biology:{c:6,t:7}}));api.changed();await api.sync();assert.match(el('account-status').textContent,/Device progress is retained/);assert.equal(cloud.revision,2);
 offline=false;await api.sync();assert.equal(cloud.revision,3);
 cloud={revision:4,payload:{schema:1,values:{mcat2_stats:{biology:{c:9,t:10}}}}};
 data.set(api.storageKey('mcat2_stats'),JSON.stringify({biology:{c:7,t:8}}));api.changed();await api.sync();assert.equal(cloud.revision,4,'A newer remote snapshot cannot be silently overwritten');assert.match(el('account-status').textContent,/Another device/);
 await api.choose('cloud');assert.equal(JSON.parse(data.get(api.storageKey('mcat2_stats'))).biology.c,9);
 await api.logout();assert.equal(api.storageKey('mcat2_stats'),'mcat2_stats');assert.equal(JSON.parse(data.get('mcat2_stats')).biology.c,4,'Guest progress is preserved');
 el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
 assert(api.storageKey('mcat2_stats').includes(A),'Signing back in automatically restores the account scope');
 cloud={revision:5,payload:{schema:1,values:{mcat2_stats:{biology:{c:12,t:14}}}}};
 await api.sync();assert.equal(JSON.parse(data.get(api.storageKey('mcat2_stats'))).biology.c,12,'A clean device pulls newer cloud work');
 await api.logout();
 data.delete('mcat_cloud_meta_'+A);data.delete('mcat_user_'+A+':mcat2_stats');
 el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
 assert.equal(JSON.parse(data.get(api.storageKey('mcat2_stats'))).biology.c,12,'A fresh device restores cloud work without a manual choice');
 await api.logout();
 loginUser={id:B,email:'second@example.test'};cloud=null;el('account-email').value=loginUser.email;el('account-password').value='another-test-password';await api.action('login');await api.choose('cloud');
 assert(api.storageKey('mcat2_stats').includes(B));assert.equal(data.get(api.storageKey('mcat2_stats')),undefined,'A second account does not inherit the first account cache');
 assert(!JSON.stringify([...data.values()]).includes('test-only-password'));assert(rpcCalls>=4);
 const sql=fs.readFileSync(root+'/supabase/schema.sql','utf8');assert.match(sql,/enable row level security/);assert.match(sql,/auth.uid\(\)/);assert.match(sql,/current_revision <> p_expected_revision/);assert.match(sql,/revoke all.*from public, anon/);
 console.log('Account tests passed: no password/token backup, explicit guest import, per-user isolation, offline queue, conflict protection, cloud restore, sign-out and RLS schema guards.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
