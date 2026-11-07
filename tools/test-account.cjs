const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/..',data=new Map(),nodes=new Map();let reloads=0,cloud=null,offline=false,rpcCalls=0,deleteCalls=[],deleteFails=false;const otherUsersRows=new Map();
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222';
let loginUser={id:A,email:'student@example.test'},session=null,exchangedCode=null;
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',open:false});return nodes.get(id);}
const client={auth:{onAuthStateChange(){},async exchangeCodeForSession(code){exchangedCode=code;return {data:{session}};},async getSession(){return {data:{session}};},async signInWithPassword(){session={user:loginUser};return {data:{session}};},async signUp(){return {data:{}};},async resetPasswordForEmail(){return {data:{}};},async updateUser(){return {data:{}};},async signOut(){session=null;return {}; }},from(){return {select(){return this;},eq(){return this;},async maybeSingle(){return offline?{error:{message:'offline'}}:{data:cloud};}};},async rpc(name,args){if(name==='delete_my_account'){deleteCalls.push({args,caller:session?.user?.id||null});if(deleteFails)return {error:{message:'offline'}};if(!session)return {error:{message:'Authentication required'}};otherUsersRows.delete(session.user.id);cloud=null;return {data:null};}rpcCalls++;if(offline)return {error:{message:'offline'}};assert.equal(name,'save_mcat_progress');if((cloud?.revision||0)!==args.p_expected_revision)return {data:{conflict:true,revision:cloud.revision}};cloud={revision:(cloud?.revision||0)+1,payload:JSON.parse(JSON.stringify(args.p_payload))};return {data:{revision:cloud.revision}};}};
const ctx=vm.createContext({console,Date,Math,Set,URL,clearTimeout(){},setTimeout(){return 1;},confirm(){return true;},KEYS:{stats:'mcat2_stats',mem:'mcat2_memory',dailyPlan:'mcat2_daily_plan',externalPassages:'mcat2_external_passages'},STUDY_TIMER_KEY:'mcat2_study_timer',FULL_EXAMS:[],showProgress(){},mockSdk:{createClient(){return client;}},window:{MCAT_CLOUD_CONFIG:{url:'https://test.supabase.co',publishableKey:'sb_publishable_test'}},document:{getElementById:el},location:{href:'https://example.test/index.html',reload(){reloads++;}},localStorage:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)}});
// Breach-check service double: records each request and answers from a fixed set of "breached" passwords.
const crypto=require('node:crypto'),pwned=new Map(),pwnedCalls=[];let pwnedDown=false;
const sha1=t=>crypto.createHash('sha1').update(t).digest('hex').toUpperCase();
Object.assign(ctx,{crypto:globalThis.crypto,TextEncoder,AbortController,sessionStorage:{store:new Map(),getItem(k){return this.store.get(k)??null},setItem(k,v){this.store.set(k,String(v))},removeItem(k){this.store.delete(k)}},
  fetch:async(url,opts)=>{pwnedCalls.push({url,opts});if(pwnedDown)throw Error('offline');const prefix=url.split('/').pop();
    const lines=[...pwned].filter(([h])=>h.startsWith(prefix)).map(([h,n])=>h.slice(5)+':'+n).concat(['0000000000000000000000000000000000A:0']);
    return {ok:true,text:async()=>lines.join('\r\n')};}});
const run=s=>vm.runInContext(s,ctx);
ctx.URLSearchParams=URLSearchParams;
run('location.search="?code=verification-test-code"');
run(fs.readFileSync(root+'/js/account.js','utf8').replace('await loadSdk()','mockSdk'));
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

 // Opt-in removal on shared computers: refused while unsynced, then deletes only this account's copy.
 el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
 const scoped=api.storageKey('mcat2_stats');assert(scoped.includes(A));
 offline=true;data.set(scoped,JSON.stringify({biology:{c:13,t:15}}));api.changed();await api.logoutAndForget();
 assert(data.has(scoped),'unsynced copy is never deleted');assert.match(el('account-status').textContent,/still pending/);
 offline=false;await api.sync();await api.logoutAndForget();
 assert(!data.has(scoped),'synced account copy removed');assert(!data.has('mcat_cloud_meta_'+A)&&!data.has('mcat_cloud_backup_'+A));
 assert.equal(JSON.parse(data.get('mcat2_stats')).biology.c,4,'guest progress untouched');
 el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
 assert.equal(JSON.parse(data.get(api.storageKey('mcat2_stats'))).biology.c,13,'signing back in restores it from the cloud');
 await api.logout();
 loginUser={id:B,email:'second@example.test'};cloud=null;el('account-email').value=loginUser.email;el('account-password').value='another-test-password';await api.action('login');await api.choose('cloud');
 assert(api.storageKey('mcat2_stats').includes(B));assert.equal(data.get(api.storageKey('mcat2_stats')),undefined,'A second account does not inherit the first account cache');
 assert(!JSON.stringify([...data.values()]).includes('test-only-password'));assert(rpcCalls>=4);
 const sql=fs.readFileSync(root+'/supabase/schema.sql','utf8');assert.match(sql,/revoke execute on function public\.rls_auto_enable\(\) from public, anon, authenticated;/);assert.match(sql,/exception when undefined_function then null;/);assert.match(sql,/enable row level security/);assert.match(sql,/auth.uid\(\)/);assert.match(sql,/current_revision <> p_expected_revision/);assert.match(sql,/revoke all.*from public, anon/);
 // Breached-password check: k-anonymity request, refusal of breached or unchecked new passwords, login warning.
 {
  await api.logout();
  const signUps=[];const realSignUp=client.auth.signUp;client.auth.signUp=async(...a)=>{signUps.push(a);return realSignUp(...a);};
  pwned.set(sha1('correct horse battery'),123456);
  el('account-email').value='new@example.test';el('account-password').value='correct horse battery';pwnedCalls.length=0;
  await api.action('signup');
  assert.equal(signUps.length,0,'breached password is refused before reaching Supabase');
  assert.match(el('account-status').textContent,/appears in 123,456 known data breaches/);
  assert.equal(el('account-password').value,'','field cleared');
  assert.equal(pwnedCalls.length,1);const call=pwnedCalls[0];
  assert.equal(call.url,'https://api.pwnedpasswords.com/range/'+sha1('correct horse battery').slice(0,5),'only the 5-character hash prefix is sent');
  assert(!call.url.includes(sha1('correct horse battery').slice(5))&&!call.url.includes('horse'),'no password or full hash in the request');
  assert.equal(call.opts.headers['Add-Padding'],'true');assert.equal(call.opts.credentials,'omit');assert.equal(call.opts.referrerPolicy,'no-referrer');
  el('account-password').value='a fresh unique passphrase 2026';await api.action('signup');
  assert.equal(signUps.length,1,'an unbreached password proceeds');
  pwnedDown=true;el('account-password').value='another unique passphrase 2026';await api.action('signup');
  assert.equal(signUps.length,1,'if the check cannot run, the new password is refused (fail closed)');
  assert.match(el('account-status').textContent,/Could not check this password/);
  pwnedDown=false;client.auth.signUp=realSignUp;
  // Sign-in is never blocked; a breached current password shows a warning in the account panel.
  pwned.set(sha1('test-only-password'),42);loginUser={id:A,email:'student@example.test'};
  el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
  assert(api.storageKey('mcat2_stats').includes(A),'breached password still signs in');
  assert.equal(ctx.sessionStorage.getItem('mcat_breach_notice'),'1','warning flag survives the post-sign-in reload');
  await api.init();assert.match(el('account-panel').innerHTML,/Your password appears in known data breaches/,'warning shown on the reloaded panel');
  await api.logout();pwnedDown=true;
  el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
  assert(api.storageKey('mcat2_stats').includes(A),'sign-in works when the breach service is unreachable');
  assert.equal(ctx.sessionStorage.getItem('mcat_breach_notice'),null,'no warning without a positive check');await api.init();assert.doesNotMatch(el('account-panel').innerHTML,/known data breaches/);
  pwnedDown=false;pwned.clear();
 }
 // Self-service deletion: signed-out cannot call it, it needs typed confirmation, and it deletes only the caller.
 {
  await api.logout();await api.init();
  el('account-delete-confirm').value='DELETE';await api.deleteAccount();
  assert.equal(deleteCalls.length,0,'signed out: deletion is never requested');assert.match(el('account-status').textContent,/Sign in first/);
  assert.doesNotMatch(el('account-panel').innerHTML,/Delete my account and cloud data/,'no delete control when signed out');
  loginUser={id:A,email:'student@example.test'};el('account-email').value=loginUser.email;el('account-password').value='test-only-password';await api.action('login');
  await api.init();assert.match(el('account-panel').innerHTML,/Delete my account and cloud data/);assert.match(el('account-panel').innerHTML,/cannot be undone/);
  const scoped=api.storageKey('mcat2_stats');data.set(scoped,JSON.stringify({biology:{c:1,t:2}}));
  otherUsersRows.set(A,'row A');otherUsersRows.set(B,'row B');
  for(const typed of ['','delete','Delete','DELETE ']){el('account-delete-confirm').value=typed;await api.deleteAccount();}
  assert.equal(deleteCalls.length,0,'nothing is deleted without exactly DELETE');assert.match(el('account-status').textContent,/Type DELETE/);assert(data.has(scoped));
  deleteFails=true;el('account-delete-confirm').value='DELETE';await api.deleteAccount();
  assert.equal(deleteCalls.length,1);assert.match(el('account-status').textContent,/deletion failed/);assert(data.has(scoped),'a failed deletion keeps the device copy');
  deleteFails=false;const before=reloads;el('account-delete-confirm').value='DELETE';await api.deleteAccount();
  assert.equal(deleteCalls.length,2);assert.equal(deleteCalls[1].args,undefined,'no user id is sent; the server uses auth.uid()');assert.equal(deleteCalls[1].caller,A);
  assert(!otherUsersRows.has(A)&&otherUsersRows.get(B)==='row B','only the caller\'s row is deleted');
  assert(!data.has(scoped)&&!data.has('mcat_cloud_meta_'+A)&&!data.has('mcat_cloud_backup_'+A),'this device\'s account copy is removed');
  assert.equal(JSON.parse(data.get('mcat2_stats')).biology.c,4,'guest progress untouched');assert.equal(reloads,before+1);
  // Server side: no arguments, acts only on auth.uid(), refuses anonymous callers, executable by authenticated only.
  const sql=fs.readFileSync(root+'/supabase/schema.sql','utf8'),fn=sql.slice(sql.indexOf('create or replace function public.delete_my_account()'));
  assert.match(fn,/^create or replace function public\.delete_my_account\(\)\s*\n?returns void language plpgsql security definer set search_path = '' as \$\$/);
  assert.match(fn,/caller uuid := auth\.uid\(\);/);assert.match(fn,/if caller is null then raise exception/);
  assert.match(fn,/delete from public\.mcat_progress where user_id = caller;\s*\n\s*delete from auth\.users where id = caller;/);
  assert.equal((fn.split('end $$;')[0].match(/delete from/g)||[]).length,2,'no other deletes');
  assert.match(fn,/revoke all on function public\.delete_my_account\(\) from public, anon;/);assert.match(fn,/grant execute on function public\.delete_my_account\(\) to authenticated;/);
  assert.doesNotMatch(fn,/grant execute on function public\.delete_my_account\(\) to (anon|public)/);
 }
 console.log('Account tests passed: no password/token backup, explicit guest import, per-user isolation, offline queue, conflict protection, cloud restore, sign-out and RLS schema guards.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
