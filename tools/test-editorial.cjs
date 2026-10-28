const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/..';
const fixtures = [
  {
    "bank": "QB_BIOCHEMISTRY",
    "index": 10,
    "tag": "Amino Acids",
    "id": "1hnicdl7mjd",
    "newStem": "Which polar amino acid has a hydroxymethyl side chain and is the most commonly phosphorylated residue?"
  },
  {
    "bank": "QB_BIOCHEMISTRY",
    "index": 335,
    "tag": "Metabolism: Fatty Acids",
    "id": "2c2etx8r72b",
    "newStem": "The first reaction in the mitochondrial fatty-acid degradation cycle is _____"
  },
  {
    "bank": "QB_BIOCHEMISTRY",
    "index": 337,
    "tag": "Metabolism: Fatty Acids",
    "id": "13agoh1nqhp",
    "newStem": "The third reaction in the mitochondrial fatty-acid degradation cycle is _____"
  },
  {
    "bank": "QB_BIOCHEMISTRY",
    "index": 470,
    "tag": "Biosignaling",
    "id": "2545tsfv8nh",
    "newStem": "A circulating catecholamine binds a G protein-coupled receptor on liver cells, activating adenylyl cyclase, raising cAMP and activating protein kinase A to promote glycogen breakdown. Which listed component is the first messenger?"
  },
  {
    "bank": "QB_CHEMISTRY",
    "index": 368,
    "tag": "Carbonyl Chemistry",
    "id": "1wj3hmx1asa",
    "newStem": "Treating a triacylglycerol with aqueous NaOH produces glycerol and carboxylate salts. This reaction is called _____"
  },
  {
    "bank": "QB_BEHAVIORAL_1",
    "index": 263,
    "tag": "Personality, Development & Disorders",
    "id": "26egjutntzr",
    "newStem": "_____ involves one or more distressing physical symptoms accompanied by excessive thoughts, feelings or behaviors about those symptoms, whether or not a medical condition explains them"
  }
];
const storedMemory=Object.fromEntries(fixtures.map(f=>[f.id,{S:2,D:5,last:Date.now(),seen:3,right:2,lapses:1}]));
const storage=new Map([['mcat2_memory',JSON.stringify(storedMemory)],['mcat2_flags',JSON.stringify(Object.fromEntries(fixtures.map(f=>[f.id,true])))]]);
const nodes=new Map();
function el(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){},focus(){},scrollIntoView(){},remove(){}});return nodes.get(id);}
const ctx=vm.createContext({console,Date,Math,Map,Set,URLSearchParams,setInterval(){return 1},clearInterval(){},setTimeout(){},confirm(){return true},alert(){},navigator:{},location:{protocol:'http:',search:''},window:{scrollTo(){}},document:{getElementById:el,querySelectorAll(){return []},addEventListener(){}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
const run=code=>vm.runInContext(code,ctx);
const index=fs.readFileSync(root+'/index.html','utf8');
for(const [,file] of index.matchAll(/<script src="([^"]+)"/g))run(fs.readFileSync(root+'/'+file,'utf8'));
assert.equal(run('QB.length'),2807);
for(const fixture of fixtures){ctx.fixture=fixture;assert(run('QB_BY_ID.has(fixture.id)'));assert.equal(run('QB_BY_ID.get(fixture.id).q'),fixture.newStem);assert.equal(run('loadMem()[fixture.id].seen'),3);assert.equal(run('flaggedIds()[fixture.id]'),true);}
assert.equal(run('[...AUTHORED.values()].reduce((n,a)=>n+a.length,0)'),run('QB_VARIANTS_1.length+QB_VARIANTS_2.length'),'All authored variants must still link');
const html=fs.readFileSync(root+'/tools/validate.html','utf8');
for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)){
 run(script.replace('  // Recall bank','  globalThis.editorialRules={keyAppearsInStem,checkQuestion,warnings};\n  // Recall bank'));
}
assert.equal(ctx.window.__validation.errors.length,0);assert.equal(ctx.window.__validation.warnings.length,0);
for(const [stem,key] of [['galactose','lactose'],['proto-oncogenes','Oncogenes'],['euchromatin or heterochromatin','Chromatin'],['type of orbital','f orbital'],['isovolumetric','volume']]){ctx.stem=stem;ctx.key=key;assert.equal(run('editorialRules.keyAppearsInStem(stem,key)'),false);}
assert(run('editorialRules.keyAppearsInStem("The answer is Serine.","Serine")'));
assert(run('editorialRules.keyAppearsInStem("A Na+ / K+ ATPase is present","Na+ / K+ ATPase")'),'Regex punctuation must be literal');
function check(q){ctx.probe=q;run('editorialRules.warnings.length=0;editorialRules.checkQuestion("fixture",probe,{cloze:true})');return [...ctx.editorialRules.warnings];}
const base={q:'The _____ fits the description.',ans:0,exp:'An explanation long enough to satisfy the content quality minimum.'};
assert(check({...base,choices:['Serine','threonine','tyrosine','cysteine']}).some(w=>w.includes('capitalized')),'Actual capitalization clues must still warn');
assert.equal(check({...base,choices:['FSH','LH','GH','Prolactin'],ans:3}).length,0,'Acronyms are capitalized choices too');
assert.equal(check({...base,choices:['Keq','1','0','1/Keq']}).length,0,'Numeric distractors have no letter case');
assert(check({...base,choices:['A substantially longer explanatory answer than the others','short','brief','tiny']}).some(w=>w.includes('longer')),'Length detector must remain active');
assert(check({...base,q:'Serine proteases contain _____',choices:['Serine','Threonine','Tyrosine','Cysteine']}).some(w=>w.includes('appears in stem')),'True answer repetition must still warn');
console.log('Editorial checks passed: zero content warnings, genuine cue detection retained, six legacy IDs/memory/flags preserved, and all authored variants linked.');
