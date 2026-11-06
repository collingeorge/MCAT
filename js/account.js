/* Email/password authentication uses Supabase Auth. Passwords never enter app storage. */
(() => {
  'use strict';
  const OWNER='mcat_cloud_owner', PREFIX='mcat_cloud_meta_', UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  // Self-hosted SDK (vendor/README.md) so the CSP can stay script-src 'self'; SRI pins the exact file.
  const SDK_SRC='vendor/supabase-js-2.118.0.umd.js', SDK_SRI='sha384-TcHRA3zBbn+Lexh5n+Oil4guNPOS3rjNDpGRAN46u/s/mB2IZ50ceC6TYDU2yvgK';
  function loadSdk(){
    if(window.supabase?.createClient)return Promise.resolve(window.supabase);
    return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=SDK_SRC;s.integrity=SDK_SRI;s.crossOrigin='anonymous';s.addEventListener('load',()=>window.supabase?.createClient?resolve(window.supabase):reject(Error('Cloud SDK unavailable')));s.addEventListener('error',()=>reject(Error('Cloud SDK failed to load')));document.head.appendChild(s);});
  }
  // Capture synchronously: the static-page router normalizes the URL before SDK loading finishes.
  const callbackCode=new URLSearchParams(location.search||'').get('code');
  let client=null,user=null,timer=null,busy=false,choice=null,recovering=false,notice='Saved on this browser only',generation=0;
  const read=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))??fallback;}catch{return fallback;}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const owner=()=>{const id=read(OWNER,null);return typeof id==='string'&&UUID.test(id)?id:null;};
  const scope=(key,id=owner())=>id?'mcat_user_'+id+':'+key:key;
  const keys=()=>Object.values(KEYS).filter(x=>typeof x==='string').concat(STUDY_TIMER_KEY,FULL_EXAMS.flatMap(e=>[KEYS.examProgress(e.id),KEYS.examLast(e.id)]));
  const meta=(id=owner())=>read(PREFIX+id,{revision:0,dirty:false});
  function snapshot(id=owner()) {
    const values={};
    keys().forEach(k=>{const v=localStorage.getItem(scope(k,id));if(v!=null)values[k]=JSON.parse(v);});
    return {schema:1,values};
  }
  function validate(payload) {
    if(!payload||payload.schema!==1||!payload.values||typeof payload.values!=='object'||Array.isArray(payload.values)||JSON.stringify(payload).length>2000000)throw Error('The saved progress format is invalid or too large.');
    const allowed=new Set(keys());
    if(Object.keys(payload.values).some(k=>!allowed.has(k)))throw Error('The saved progress contains unsupported fields.');
    return payload;
  }
  function apply(payload,id) {
    validate(payload);
    // Only this user's study keys are replaced; guest and other-account caches remain separate.
    keys().forEach(k=>localStorage.removeItem(scope(k,id)));
    Object.entries(payload.values).forEach(([k,v])=>write(scope(k,id),v));
  }
  function status(message){notice=message;const el=document.getElementById('account-status');if(el)el.textContent=message;}
  function changed() {
    const id=owner();if(!id)return;
    try{const m=meta(id);m.dirty=true;m.change=(m.change||0)+1;write(PREFIX+id,m);status('Saved on this device · cloud sync pending');}catch{status('Local storage failed · progress is not safely saved');return;}
    // One answer writes ~10 keys; batch them into one cloud save. Hidden pages flush immediately.
    clearTimeout(timer);timer=setTimeout(()=>sync().catch(()=>{}),1500);
  }
  async function remote() {
    const {data,error}=await client.from('mcat_progress').select('revision,payload,updated_at').eq('user_id',user.id).maybeSingle();
    if(error)throw Error('Cloud progress could not be read. Your device copy is unchanged.');
    if(data)validate(data.payload);return data;
  }
  let inFlight=null;
  function sync(){
    if(inFlight)return inFlight;
    inFlight=performSync().finally(()=>{inFlight=null;});
    return inFlight;
  }
  async function performSync() {
    if(choice?.empty&&user&&!busy){
      // The user explicitly pressed Sync now for an empty account: preserve the
      // progress currently displayed, including work done during initial setup.
      const id=user.id,claimed=read('mcat_guest_claim',null);
      const payload=validate(snapshot((owner()&&owner()!==id)||(!owner()&&claimed&&claimed!==id)?id:owner()));
      if(!owner()&&!claimed)write('mcat_guest_claim',id);
      write('mcat_cloud_backup_'+id,snapshot(id));
      apply(payload,id);write(PREFIX+id,{revision:0,dirty:true,change:1});write(OWNER,id);choice=null;
      render();
    }
    if(busy||!client||!user||owner()!==user.id||choice)return;
    const id=user.id,m=meta(id);if(!m.dirty){
      if(typeof activeScreen==='undefined'||activeScreen==='screen-home')await prepareSession({user});
      else status('Cloud connected · all device changes saved');
      return;
    }
    const token=generation;busy=true;status('Saving to cloud…');
    try {
      const payload=validate(snapshot(id));
      const {data,error}=await client.rpc('save_mcat_progress',{p_expected_revision:m.revision,p_payload:payload});
      if(token!==generation)return;
      if(error)throw Error('Cloud save failed. Device progress is retained; reconnect and choose Sync now.');
      if(data?.conflict){choice=await remote()||{revision:0,payload:{schema:1,values:{}},empty:true};status('Another device has newer progress · choose which copy to keep');render();return;}
      if(!Number.isInteger(data?.revision))throw Error('Cloud did not confirm the save.');
      const current=meta(id);write(PREFIX+id,{...current,revision:data.revision,dirty:current.change!==m.change});
      status(current.change!==m.change?'New changes waiting to sync':'Saved to cloud · '+new Date().toLocaleTimeString());
      if(current.change!==m.change){clearTimeout(timer);timer=setTimeout(()=>sync().catch(()=>{}),0);}
    } catch(e){status(e.message||'Cloud unavailable · device progress retained');}
    finally{busy=false;}
  }
  async function prepareSession(session) {
    generation++;user=session?.user||null;choice=null;
    if(!user){status('Signed out · guest progress stays on this browser');if(owner()){localStorage.removeItem(OWNER);location.reload();}render();return;}
    const cloud=await remote(),m=meta(user.id);
    // Restore clean account copies automatically after logout or on another device.
    // Unsent local changes still require conflict review before replacement.
    if(cloud&&!m.dirty){
      const switched=owner()!==user.id||cloud.revision!==m.revision;
      if(switched){apply(cloud.payload,user.id);write(PREFIX+user.id,{revision:cloud.revision,dirty:false,change:0});write(OWNER,user.id);location.reload();return;}
    }
    if(owner()===user.id && !m.dirty && cloud?.revision===m.revision){status('Cloud connected · progress saved');render();return;}
    if(owner()===user.id && m.dirty && (cloud?.revision||0)===m.revision){await sync();render();return;}
    choice=cloud||{revision:0,payload:{schema:1,values:{}},empty:true};
    if(choice.empty){await sync();if(!meta(user.id).dirty)location.reload();return;}
    status('Signed in · choose your progress copy to finish setup');render();
  }
  async function choose(source) {
    if(!user||!choice||busy)return;
    if(!['cloud','device','guest'].includes(source))return;
    try {
    if(source!=='cloud'&&!confirm('Use this device copy for your account? This replaces the cloud study copy. Other devices may have newer work.'))return;
    const id=user.id,revision=choice.revision;
    const payload=source==='cloud'?choice.payload:snapshot(source==='guest'?null:id);
    validate(payload);
    // Back up the previous cache before replacing it. The backup is never uploaded automatically.
    write('mcat_cloud_backup_'+id,snapshot(id));
    apply(payload,id);write(PREFIX+id,{revision,dirty:source!=='cloud',change:1});write(OWNER,id);choice=null;
    if(source!=='cloud')await sync();
    location.reload();
    }catch{status('Could not switch progress copies. Your previous account cache is backed up on this device; free browser storage and retry.');}
  }
  // Breached-password check (HaveIBeenPwned range API, k-anonymity): only the first 5 hex characters of
  // the password's SHA-1 leave the browser; the full hash and password never do, and the match runs
  // here. Add-Padding hides the response size. Returns the number of breaches the password appears in.
  const PWNED='https://api.pwnedpasswords.com/range/',BREACH_NOTICE='mcat_breach_notice';
  async function breachCount(password){
    const bytes=new Uint8Array(await crypto.subtle.digest('SHA-1',new TextEncoder().encode(password)));
    const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
    const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),8000);
    try{
      const res=await fetch(PWNED+hex.slice(0,5),{headers:{'Add-Padding':'true'},signal:ctrl.signal,credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store'});
      if(!res.ok)throw Error('Breach check unavailable');
      const suffix=hex.slice(5);
      for(const line of (await res.text()).split('\n')){const [s,c]=line.trim().split(':');if(s===suffix)return Number(c)||0;}
      return 0;
    }finally{clearTimeout(timer);}
  }
  const breachNotice=on=>{try{on?sessionStorage.setItem(BREACH_NOTICE,'1'):sessionStorage.removeItem(BREACH_NOTICE);}catch{}};
  const breachNoticeShown=()=>{try{return sessionStorage.getItem(BREACH_NOTICE)==='1';}catch{return false;}};
  async function action(mode) {
    const email=document.getElementById('account-email')?.value.trim(),field=document.getElementById(mode==='password'?'account-new-password':'account-password'),password=field?.value||'';
    if(!client&&configured()&&!busy)await connect();
    if(!client){status('Cloud accounts are awaiting backend configuration. Device study still works.');return;}
    if(busy)return;busy=true;
    try {
      if(!['login','signup','reset','password'].includes(mode))return;
      if(mode!=='password'&&(!email||!email.includes('@')))throw Error('Enter your email address.');
      if(['signup','password'].includes(mode)&&password.length<12)throw Error('Use a password of at least 12 characters.');
      // New passwords must not be known-breached. If the check cannot run, refuse rather than accept an unchecked password.
      if(['signup','password'].includes(mode)){
        let n;
        try{n=await breachCount(password);}catch{throw Error('Could not check this password against known data breaches. Check your connection and try again.');}
        if(n>0)throw Error('This password appears in '+n.toLocaleString()+' known data breaches. Choose a different password you have not used elsewhere.');
      }
      let result;
      const redirect=new URL('index.html',location.href).href;
      if(mode==='login')result=await client.auth.signInWithPassword({email,password});
      if(mode==='signup')result=await client.auth.signUp({email,password,options:{emailRedirectTo:redirect}});
      if(mode==='reset')result=await client.auth.resetPasswordForEmail(email,{redirectTo:redirect});
      if(mode==='password'){if(!recovering)throw Error('Open a valid password recovery link first.');result=await client.auth.updateUser({password});}
      if(field)field.value='';
      if(result.error)throw Error(mode==='login'?'Sign-in failed. Check your credentials and email verification.':'Request failed. Please retry later or contact support.');
      if(mode==='reset'||mode==='signup')status('Check your email for the next step, if the request is eligible.');
      if(mode==='password'){recovering=false;breachNotice(false);render();status('Password updated.');}
      // Existing passwords: warn (never block sign-in) if this one has since appeared in a breach.
      if(mode==='login'&&result.data?.session){busy=false;breachNotice(await breachCount(password).then(n=>n>0,()=>false));render();await prepareSession(result.data.session);}
    }catch(e){if(field)field.value='';status(e.message||'Account request failed.');}
    finally{busy=false;}
  }
  async function logout() {
    if(busy)return;
    await sync();
    if(meta().dirty&&!confirm('Cloud saving is still pending. Sign out and leave the pending copy on this device?'))return;
    const {error}=await client.auth.signOut({scope:'local'});
    if(error){status('Sign-out failed. Please retry.');return;}
    generation++;user=null;choice=null;localStorage.removeItem(OWNER);location.reload();
  }
  // Shared computers: sign out and delete this account's cached copy, only once the cloud has it all.
  async function logoutAndForget() {
    if(!user)return;
    const id=user.id;await sync();
    if(busy)return;
    if(meta(id).dirty){status('Cloud saving is still pending. Sync before removing this device copy.');return;}
    if(!confirm('Sign out and remove this account\u2019s study data from this browser? Your cloud copy is kept.'))return;
    const {error}=await client.auth.signOut({scope:'local'});
    if(error){status('Sign-out failed. Please retry.');return;}
    keys().forEach(k=>localStorage.removeItem(scope(k,id)));
    [PREFIX+id,'mcat_cloud_backup_'+id].forEach(k=>localStorage.removeItem(k));
    // The guest-claim marker stays: guest progress was already copied into this account once.
    generation++;user=null;choice=null;localStorage.removeItem(OWNER);location.reload();
  }
  function render() {
    const panel=document.getElementById('account-panel');if(!panel)return;
    const description=user?'Signed in as '+user.email:'Optional account · guest study remains available';
    panel.innerHTML='<p id="account-status" role="status"></p>'+(user&&breachNoticeShown()?'<p class="advice" id="account-breach" role="alert"><b>Your password appears in known data breaches.</b> Change it: sign out, choose <b>Forgot password?</b>, and set a new one you have not used elsewhere.</p>':'')+'<details id="account-details"><summary>Account & cloud progress</summary><p id="account-identity"></p>'+
      (user?'<button class="micro-btn" data-click="McatAccount.sync()">Sync now</button> <button class="micro-btn" data-click="McatAccount.logout()">Sign out</button> <button class="micro-btn" data-click="McatAccount.logoutAndForget()">Sign out and remove from this device</button> <button class="micro-btn" data-click="showProgress()">My score report</button>':'<label>Email <input id="account-email" type="email" autocomplete="email"></label><label>Password <input id="account-password" type="password" autocomplete="current-password" minlength="12"></label><div class="btn-row"><button class="micro-btn" data-click="McatAccount.action(\'login\')">Sign in</button><button class="micro-btn" data-click="McatAccount.action(\'signup\')">Create account</button><button class="text-btn" data-click="McatAccount.action(\'reset\')">Forgot password?</button></div>')+
      (recovering?'<label>New password <input id="account-new-password" type="password" autocomplete="new-password" minlength="12"></label><button class="micro-btn" data-click="McatAccount.action(\'password\')">Set new password</button>':'')+
      (choice?'<p>Copies are not automatically combined: doing so could duplicate scores and study counts. Restore the cloud copy, keep this account’s device copy, or explicitly copy the guest work on this browser.</p><button class="micro-btn" data-click="McatAccount.choose(\'cloud\')">Restore cloud progress'+(choice.empty?' (empty account)':'')+'</button> <button class="micro-btn" data-click="McatAccount.choose(\'device\')">Keep account device copy</button> <button class="micro-btn" data-click="McatAccount.choose(\'guest\')">Copy guest progress into my account</button>':'')+
      '<p class="muted-note">Signed-in progress is stored with Supabase. Passwords are handled by Supabase Auth. Cloud saves require a connection; check the save status before closing. Guest and account copies are separate.</p></details>';
    document.getElementById('account-identity').textContent=description;status(notice);
    document.getElementById('account-details').open=!user||!!choice||recovering;
    const loginButton=document.getElementById('account-login-btn');if(loginButton)loginButton.textContent=user?'My account':'Sign in / Create account';
  }
  // Guests with no account on this browser never load the 218 KB SDK until they choose to sign in.
  const sessionHint=()=>!!owner()||!!callbackCode||Object.keys(localStorage).some(k=>/^sb-.+-auth-token$/.test(k));
  function configured(){const c=window.MCAT_CLOUD_CONFIG;return !!c?.url&&!!c?.publishableKey&&/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(c.url)&&c.publishableKey.startsWith('sb_publishable_');}
  async function init() {
    render();const config=window.MCAT_CLOUD_CONFIG;
    if(!config?.url||!config?.publishableKey){status('Cloud setup pending · saved on this browser only');return;}
    if(!configured()){status('Cloud configuration is invalid');return;}
    if(!client&&!sessionHint()){status('Signed out · guest progress stays on this browser');return;}
    await connect();
  }
  let connecting=null;
  function connect(){if(client)return Promise.resolve();return connecting||(connecting=openClient().finally(()=>{connecting=null;}));}
  async function openClient() {
    const config=window.MCAT_CLOUD_CONFIG;
    try {
      const sdk=await loadSdk();
      client=sdk.createClient(config.url,config.publishableKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
      client.auth.onAuthStateChange((event,session)=>{if(event==='PASSWORD_RECOVERY'){setTimeout(()=>recovery(),0);}else if(event==='SIGNED_OUT'){setTimeout(()=>prepareSession(session).catch(e=>status(e.message)),0);}});
      const {data,error}=callbackCode ? await client.auth.exchangeCodeForSession(callbackCode) : await client.auth.getSession();
      if(error)throw error;await prepareSession(data.session);
    }catch{status(callbackCode?'Email verification or recovery link could not be completed. Request a new link in this browser.':'Cloud connection unavailable · device progress retained');}
  }
  // Register before SDK loading so a cold offline start can reconnect too.
  if(typeof window.addEventListener==='function'){
    const reconnect=()=>{if(!client)init();else sync().catch(()=>status('Cloud unavailable · device progress retained'));};
    window.addEventListener('online',reconnect);
    window.addEventListener('focus',reconnect);
    document.addEventListener?.('visibilitychange',()=>{if(document.visibilityState==='hidden'&&client){clearTimeout(timer);sync().catch(()=>{});}});
  }
  function recovery(){recovering=true;render();}
  function clearBackup(){const id=owner();if(id)localStorage.removeItem('mcat_cloud_backup_'+id);}
  function open(){if(!goHome())return;document.getElementById('account-details').open=true;document.getElementById('account-panel').scrollIntoView({block:'center',behavior:'smooth'});}
  window.McatAccount={storageKey:scope,changed,init,action,sync,logout,logoutAndForget,choose,snapshot,validate,clearBackup,open};
})();
