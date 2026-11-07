// Sign-in error messages: each way the self-hosted Supabase SDK can fail to load gets the
// "sign-in library couldn't load" message and a console.warn with the specific reason (never user
// data); "awaiting backend configuration" is reserved for a missing or empty MCAT_CLOUD_CONFIG.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const source = fs.readFileSync(root + '/js/account.js', 'utf8');
const sdkBytes = fs.readFileSync(root + '/vendor/supabase-js-2.118.0.umd.js');
const EMAIL = 'student-private@example.test';
const SDK_MSG = 'The sign-in library couldn’t load. Device study still works; try again later.';
const CONFIG_MSG = 'Cloud accounts are awaiting backend configuration. Device study still works.';

// scenario: { config, script: 'load' | 'load-empty' | 'error', fetch: 'http403' | 'tampered' | 'intact' | 'network' }
async function attempt(scenario) {
  const nodes = new Map(), warns = [], requests = [];
  const el = id => { if (!nodes.has(id)) nodes.set(id, { innerHTML: '', textContent: '', value: '', open: false }); return nodes.get(id); };
  let created = 0;
  const client = { auth: { onAuthStateChange() {}, async getSession() { return { data: { session: null } }; }, async signInWithPassword() { return { data: {}, error: { message: 'bad' } }; } } };
  const ctx = vm.createContext({
    console: { log() {}, error() {}, warn: (...a) => warns.push(a.join(' ')) },
    Date, Math, Set, Map, URL, URLSearchParams, JSON, Promise, Uint8Array, String, Error, Object, Array, Number,
    TextEncoder, AbortController, btoa, crypto: globalThis.crypto, setTimeout, clearTimeout,
    KEYS: { stats: 'mcat2_stats' }, STUDY_TIMER_KEY: 'mcat2_study_timer', FULL_EXAMS: [], confirm: () => true,
    location: { search: '', href: 'https://mcat.collinbgeorge.com/index.html', reload() {} },
    localStorage: { store: new Map(), getItem(k) { return this.store.get(k) ?? null; }, setItem(k, v) { this.store.set(k, String(v)); }, removeItem(k) { this.store.delete(k); } },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    fetch: async url => {
      requests.push(String(url));
      if (scenario.fetch === 'network') throw new TypeError('Failed to fetch');
      if (scenario.fetch === 'http403') return { ok: false, status: 403 };
      const body = scenario.fetch === 'tampered' ? Buffer.from('/* edited by a proxy */' + sdkBytes) : sdkBytes;
      return { ok: true, status: 200, arrayBuffer: async () => body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) };
    },
    document: {
      getElementById: el,
      createElement: () => { const handlers = {}; return { addEventListener: (t, f) => { handlers[t] = f; }, remove() {}, handlers }; },
      head: { appendChild(s) {
        setTimeout(() => {
          if (scenario.script === 'load') { ctx.supabase = { createClient: () => { created++; return client; } }; s.handlers.load(); }
          else if (scenario.script === 'load-empty') s.handlers.load();
          else s.handlers.error();
        }, 0);
      } },
    },
  });
  ctx.window = ctx;
  if (scenario.config !== 'missing') ctx.MCAT_CLOUD_CONFIG = scenario.config === 'empty' ? { url: '', publishableKey: '' } : { url: 'https://vcinakjskwmehhoatpnr.supabase.co', publishableKey: 'sb_publishable_test' };
  vm.runInContext(source, ctx);
  el('account-email').value = EMAIL; el('account-password').value = 'a long test password';
  await ctx.McatAccount.action('login');
  return { status: el('account-status').textContent, warns, requests, created };
}

async function main() {
  // Real missing/empty configuration: the configuration message, and the SDK is never requested.
  for (const config of ['missing', 'empty']) {
    const r = await attempt({ config, script: 'load' });
    assert.equal(r.status, CONFIG_MSG, config + ' config');
    assert.equal(r.created, 0); assert.deepEqual(r.warns, []);
  }
  // Each SDK failure: the library message plus one specific console.warn.
  const cases = [
    [{ script: 'error', fetch: 'http403' }, 'Supabase SDK failed to load: HTTP 403'],
    [{ script: 'error', fetch: 'tampered' }, 'Supabase SDK failed to load: SRI mismatch'],
    [{ script: 'error', fetch: 'network' }, 'Supabase SDK failed to load: network error'],
    [{ script: 'load-empty' }, 'Supabase SDK failed to load: window.supabase missing'],
    [{ script: 'error', fetch: 'intact' }, 'Supabase SDK failed to load: script error (file intact; blocked or failed to run)'],
  ];
  for (const [scenario, warning] of cases) {
    const r = await attempt({ config: 'ok', ...scenario });
    assert.equal(r.status, SDK_MSG, warning);
    assert.notEqual(r.status, CONFIG_MSG);
    assert.deepEqual(r.warns, [warning]);
    assert(r.warns.every(w => !w.includes(EMAIL) && !w.includes('password')), 'no user data in the console');
    if (scenario.fetch) assert.deepEqual(r.requests, ['vendor/supabase-js-2.118.0.umd.js'], 'one same-origin diagnostic request, to the SDK file only');
  }
  // Success: the client is created and no failure message or warning appears.
  const ok = await attempt({ config: 'ok', script: 'load' });
  assert.equal(ok.created, 1); assert.deepEqual(ok.warns, []);
  assert.notEqual(ok.status, SDK_MSG); assert.notEqual(ok.status, CONFIG_MSG);
  console.log('SDK load messages passed: missing/empty config keeps "awaiting backend configuration"; HTTP 403, SRI mismatch, network error, window.supabase missing and blocked-script cases show "sign-in library couldn\'t load" with one specific console.warn and no user data; success shows neither.');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
