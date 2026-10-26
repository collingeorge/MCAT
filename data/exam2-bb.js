// Full-Length Practice Exam 2 — Biological & Biochemical Foundations (B/B)

const EXAM2_BB_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 1: Protein Synthesis & Antibiotics
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_1',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Prokaryotic Translation and Antibiotic Mechanisms',
  passage:`Prokaryotic ribosomes (70S = 50S + 30S) differ sufficiently from eukaryotic ribosomes (80S = 60S + 40S) to serve as selective antibiotic targets. Translation initiation in bacteria requires the Shine-Dalgarno sequence (complementary to 16S rRNA of the 30S subunit) upstream of the AUG start codon, and the initiator tRNA carries N-formylmethionine (fMet).

Elongation involves three ribosomal sites: A (aminoacyl), P (peptidyl), and E (exit). EF-Tu delivers aminoacyl-tRNA to the A site; EF-G catalyzes translocation (moving peptidyl-tRNA from A to P, A vacant, and deacylated tRNA from P to E). Peptide bond formation is catalyzed by the peptidyl transferase activity of 23S rRNA (ribozyme).

Antibiotics exploit bacterial-specific features: tetracyclines block aminoacyl-tRNA binding to the A site (30S); chloramphenicol inhibits peptidyl transferase activity (50S); aminoglycosides (gentamicin) cause misreading by stabilizing incorrect aminoacyl-tRNA in the A site (30S); erythromycin (macrolide) blocks translocation by binding the 50S exit tunnel; linezolid binds 23S rRNA at the peptidyl transferase center of the 50S subunit and prevents formation of a functional 70S initiation complex.

Researchers tested four bacterial isolates against these antibiotics. Isolate A showed resistance to tetracycline via efflux pump upregulation. Isolate B had a 23S rRNA methylation at A2058 (adenine → N6-methyladenine), conferring resistance to erythromycin. Isolate C had a 16S rRNA methylation. Isolate D had acquired a gene encoding chloramphenicol acetyltransferase (CAT).`,
  questions:[
    {
      q:"Chloramphenicol acetyltransferase (CAT) inactivates chloramphenicol by acetylating its hydroxyl groups using acetyl-CoA. This resistance mechanism is best classified as:",
      choices:[
        "Target modification, because the ribosome is altered to lower drug binding",
        "Enzymatic drug inactivation, because the acetylated drug can no longer bind",
        "Reduced permeability, because CAT blocks the drug from entering the cell",
        "Active efflux, because CAT pumps the drug back out of the cell"
      ],
      ans:1,
      exp:"Three major resistance mechanisms: (1) Target modification (e.g., 23S rRNA methylation for erythromycin); (2) Drug inactivation (enzymatic degradation or modification, e.g., β-lactamases hydrolyze penicillin, CAT acetylates chloramphenicol, aminoglycoside-modifying enzymes); (3) Reduced influx/increased efflux (e.g., tetracycline efflux pumps). CAT catalyzes: chloramphenicol-OH + acetyl-CoA → chloramphenicol-O-acetyl + CoA. Acetylation of the hydroxyl groups destroys the structural features required for ribosome binding → drug inactivation. This is analogous to β-lactamase β-ring hydrolysis of penicillin."
    },
    {
      q:"23S rRNA methylation at A2058 (adenine → N6-methyladenine) confers erythromycin resistance. This modification is catalyzed by erm genes. Why does this specifically confer macrolide resistance?",
      choices:[
        "Methylating A2058 prevents the 50S and 30S subunits from assembling",
        "A2058 lines the macrolide site in the exit tunnel; the methyl group blocks binding",
        "N6-methyladenine mispairs with 16S rRNA, destabilizing every ribosome",
        "Methylated A2058 recruits an efflux pump that exports erythromycin"
      ],
      ans:1,
      exp:"The exit tunnel of the 50S ribosome is the pathway through which the growing polypeptide chain emerges. Macrolides (erythromycin, azithromycin, clarithromycin) bind the tunnel just beyond the peptidyl transferase center, blocking elongation after 2-3 peptide bonds form. A2058 is a critical contact point for macrolide binding. N6-methylation adds a methyl group to the exocyclic amino group of adenine, creating steric clash with the macrolide binding site → drug cannot bind. The erm (erythromycin resistance methylase) gene product performs this modification. MLSB resistance: erm methylation also confers cross-resistance to lincosamides (clindamycin) and streptogramins B — all bind overlapping sites in the exit tunnel."
    },
    {
      q:"Aminoglycosides cause misreading by stabilizing incorrect aminoacyl-tRNAs in the A site. Which step of the codon recognition process is disrupted?",
      choices:[
        "Pairing of the Shine-Dalgarno sequence with 16S rRNA during initiation",
        "16S rRNA proofreading: A1492/A1493 are locked in the 'match' state for wrong tRNAs",
        "EF-Tu binding of aminoacyl-tRNAs, so no tRNA reaches the A site",
        "EF-G–driven movement of peptidyl-tRNA from the A site to the P site"
      ],
      ans:1,
      exp:"Aminoglycoside mechanism (A-site decoding fidelity): During normal decoding, the 30S ribosome monitors codon-anticodon geometry: A1492 and A1493 of 16S rRNA flip out to interact with the minor groove of the codon-anticodon duplex only when correct base pairing occurs → GTPase activation of EF-Tu → GTP hydrolysis → tRNA accommodation. Incorrect tRNAs: poor codon-anticodon geometry → A1492/A1493 don't flip → no GTPase activation → rapid dissociation. Aminoglycosides bind the A site of 16S rRNA and lock A1492/A1493 in the flipped-out conformation constitutively → near-cognate tRNAs are accepted → amino acid misincorporation → aberrant proteins → bactericidal. This is why aminoglycosides cause misreading, not complete translation arrest."
    },
    {
      q:"Linezolid prevents formation of the 70S initiation complex. Which specific event does it block?",
      choices:[
        "Base pairing of the Shine-Dalgarno sequence with 16S rRNA on the 30S subunit",
        "Assembly of a functional 70S initiation complex with correctly positioned fMet-tRNA",
        "EF-G–driven translocation of peptidyl-tRNA from the A site to the P site",
        "EF-Tu delivery of the first elongator aminoacyl-tRNA to the 70S ribosome"
      ],
      ans:1,
      exp:"Linezolid (oxazolidinone class) mechanism: Binds 23S rRNA at the A-site pocket of the peptidyl transferase center on the 50S subunit. It interferes with correct positioning of fMet-tRNA and aminoacyl-tRNA as the 30S initiation complex (mRNA, fMet-tRNA, IF2) joins the 50S subunit, so a functional 70S initiation complex cannot form. (This initiation-complex account is the classic pharmacology-textbook model and the one review sources test; ribosome crystal structures refine it, showing that the drug's occupancy of the A-site pocket chiefly prevents proper placement of the incoming aminoacyl-tRNA, so the first peptide bonds cannot form.) This early blockade means no elongation can begin; because linezolid acts on the 50S subunit, Shine-Dalgarno pairing on the 30S subunit is unaffected. Linezolid is active against MRSA and VRE. Like other 50S-targeting agents such as chloramphenicol and erythromycin, linezolid is bacteriostatic against most organisms (staphylococci, enterococci), though bactericidal against most streptococci. Resistance: 23S rRNA mutations at the binding site, or cfr methyltransferase (methylates C8 of A2503)."
    },
    {
      q:"Tetracycline resistance in Isolate A involves upregulation of an efflux pump that exports tetracycline from the cell. This resistance mechanism is different from the others described. Which statement best compares efflux-based resistance to enzymatic inactivation?",
      choices:[
        "Efflux is always weaker than inactivation, whatever the drug or pump",
        "Efflux spends energy and leaves drug intact; enzymes destroy drug catalytically",
        "Efflux and enzymatic inactivation always give identical resistance levels",
        "Efflux pumps work only against hydrophobic drugs that cross membranes freely"
      ],
      ans:1,
      exp:"Mechanistic comparison: Efflux: active export using energy (MFS, RND, ABC transporters); reduces [drug]_intracellular below inhibitory threshold; drug is intact (not destroyed); resistance level limited by pump capacity vs. drug influx rate; often confers multi-drug resistance (broad substrate specificity of RND pumps like AcrAB-TolC). Enzymatic inactivation: permanently destroys drug; catalytic (each enzyme molecule can inactivate many drug molecules); periplasmic β-lactamase protects the producing cell, and enzyme secreted or released into the surroundings can also protect neighboring cells (important in biofilms and mixed infections); provides complete resistance when enzyme is abundant. β-lactamases are the most clinically important resistance enzymes; their evolution to extended-spectrum (ESBL) and carbapenem-hydrolyzing forms (KPC, NDM) drives clinical crises."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 2: Endocrine — Glucocorticoids & HPA Axis
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_2',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Glucocorticoid Receptor Signaling and Cushing\'s Syndrome',
  passage:`Glucocorticoids (GCs, primarily cortisol) regulate metabolism, immune function, and stress responses. Cortisol is synthesized in the adrenal cortex (zona fasciculata) from cholesterol via the steroidogenic pathway, stimulated by ACTH from the anterior pituitary, which is driven by CRH from the hypothalamus. Negative feedback: cortisol suppresses both CRH and ACTH secretion.

The glucocorticoid receptor (GR, NR3C1) is a nuclear receptor belonging to the steroid hormone receptor superfamily. Unliganded GR resides in the cytoplasm complexed with HSP90 and other chaperones. Cortisol (lipophilic) diffuses through the cell membrane, binds GR, causing conformational change and dissociation from HSP90. The ligand-GR complex dimerizes, translocates to the nucleus, and binds glucocorticoid response elements (GREs) in promoter regions to activate transcription of metabolic targets (PEPCK, G6Pase for gluconeogenesis) or repress inflammatory genes (by interfering with NF-κB and AP-1 transcription factors).

Cushing's syndrome results from chronic excess cortisol: ACTH-secreting pituitary adenoma (Cushing's disease, 70%), ectopic ACTH (e.g., small cell lung cancer, 15%), or adrenal adenoma/carcinoma (15%). Diagnostic tests: overnight dexamethasone suppression test (1 mg dexamethasone at 11 PM; normal: 8 AM cortisol <1.8 μg/dL); 24-hour urinary free cortisol; late-night salivary cortisol.

A patient has Cushing's syndrome confirmed biochemically. Inferior petrosal sinus sampling (IPSS) after CRH stimulation shows central-to-peripheral ACTH ratio >3, confirming pituitary source.`,
  questions:[
    {
      q:"The glucocorticoid receptor is classified as a nuclear receptor. Which property of cortisol allows it to reach and activate GR?",
      choices:[
        "It binds a cell-surface GPCR, and cAMP-activated PKA then phosphorylates GR",
        "It is a lipophilic steroid that diffuses across the membrane to cytoplasmic GR",
        "It enters the cytoplasm by receptor-mediated endocytosis of its carrier protein",
        "It must first be made water-soluble by the liver before it can reach GR"
      ],
      ans:1,
      exp:"Steroid hormones (cortisol, estrogen, testosterone, aldosterone, vitamin D) are all derived from cholesterol → highly lipophilic → diffuse directly across the phospholipid bilayer. This property distinguishes them from peptide/protein hormones (insulin, GH, glucagon), which are water-soluble → cannot cross membranes → bind cell-surface receptors → signal transduction cascades. Nuclear receptor mechanism: ligand → cytoplasmic receptor → nucleus → direct gene regulation. Cortisol in blood is ~90% bound to cortisol-binding globulin (CBG, transcortin) and albumin; only free cortisol crosses membranes. HSP90 maintains GR in an inactive but ligand-competent conformation until cortisol arrives."
    },
    {
      q:"Dexamethasone suppresses ACTH in the dexamethasone suppression test by activating GR in pituitary corticotrophs. Why does a corticotroph adenoma fail to suppress on the standard low-dose test?",
      choices:[
        "Adenoma corticotrophs have lost their glucocorticoid receptors entirely",
        "Adenoma corticotrophs keep GR but have a raised feedback set-point",
        "Adenoma corticotrophs metabolize dexamethasone before it reaches GR",
        "Adenoma corticotrophs ignore glucocorticoids at every dose given"
      ],
      ans:1,
      exp:"Cortisol and dexamethasone normally act through GR to suppress POMC transcription and thus ACTH. A corticotroph adenoma still expresses GR, but its set-point for feedback is raised, so the 1 mg overnight dose that drops normal 8 AM cortisol below 1.8 μg/dL leaves adenoma ACTH unsuppressed. That raised set-point is why high-dose (8 mg) dexamethasone still suppresses a pituitary adenoma by >50% while an ectopic ACTH tumor does not suppress at all — if GR were absent, no dose would ever work."
    },
    {
      q:"Chronic cortisol excess in Cushing's syndrome produces specific metabolic effects. Which combination is most consistent with chronic GR overactivation?",
      choices:[
        "Hypoglycemia, central obesity, muscle hypertrophy, and osteoporosis",
        "Hyperglycemia, central obesity, proximal muscle wasting, and osteoporosis",
        "Hypoglycemia, peripheral fat gain, muscle hypertrophy, and dense bone",
        "Hyperglycemia, generalized fat loss, muscle wasting, and brisk immunity"
      ],
      ans:1,
      exp:"Ligand-bound GR induces PEPCK and glucose-6-phosphatase (gluconeogenesis → hyperglycemia and 'steroid diabetes'), drives proteolysis in skeletal muscle to supply gluconeogenic amino acids (proximal myopathy), redistributes fat centrally (truncal obesity, buffalo hump, moon facies) while extremity fat wastes, and inhibits osteoblasts while cutting Ca²⁺ absorption (osteoporosis). High cortisol also spills onto mineralocorticoid receptors (hypertension) and blocks NF-κB, so immunity is suppressed rather than hyperactive. Hypoglycemia points the other way — toward cortisol deficiency in Addison disease."
    },
    {
      q:"IPSS showing a central-to-peripheral ACTH ratio >3 after CRH confirms pituitary Cushing's. Which mechanism explains the elevated ratio?",
      choices:[
        "The pituitary makes three times more cortisol than the adrenal glands",
        "Petrosal sinuses drain the pituitary, concentrating ACTH near its source",
        "CRH stimulates ACTH release only from ectopic, non-pituitary tumors",
        "A ratio above 3 reflects bilateral adrenal hyperplasia, not a tumor"
      ],
      ans:1,
      exp:"Venous blood from the anterior pituitary leaves through the inferior petrosal sinuses before mixing with the systemic circulation, so pituitary-derived ACTH is far more concentrated there than in an arm vein. A central-to-peripheral ratio ≥2 at baseline or ≥3 after CRH therefore localizes the source to the pituitary; CRH amplifies the gradient because adenoma corticotrophs still respond to CRH while ectopic tumors generally do not. An ectopic source enters the systemic circulation uniformly and gives a ratio near 1, and adrenal causes are excluded before IPSS because they suppress ACTH entirely. Note the pituitary secretes ACTH, not cortisol."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 3: Immunology — Complement System
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_3',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Complement Activation Pathways and Deficiency Syndromes',
  passage:`The complement system comprises ~30 serum proteins that provide innate immune defense through three activation pathways: Classical (triggered by antigen-antibody complexes via C1q), Lectin (triggered by mannose-binding lectin binding microbial carbohydrates), and Alternative (spontaneous C3 hydrolysis, amplified on microbial surfaces). All three converge at C3 convertase, which cleaves C3 into C3a (anaphylatoxin) and C3b (opsonin).

C3b deposits on microbial surfaces and binds complement receptors (CR1, CR3) on phagocytes, enhancing phagocytosis (opsonization). The terminal complement pathway (C5b-9, membrane attack complex, MAC) directly lyses pathogens by forming pores in membranes.

Regulation is critical to prevent self-attack: Factor H and Factor I degrade C3b on host surfaces; DAF (CD55) and CD59 on host cell membranes accelerate decay of the C3 and C5 convertases and block MAC assembly, respectively.

Deficiency syndromes reveal pathway functions: C1q/C2/C4 deficiency → susceptibility to encapsulated bacteria (Streptococcus pneumoniae, Haemophilus influenzae) and SLE (autoimmune disease, because C1q normally clears apoptotic debris); C3 deficiency → severe susceptibility to all opsonization-dependent infections; C5-C9 deficiency → selective susceptibility to Neisseria species (meningitidis, gonorrhoeae), because defense against Neisseria is unusually MAC-dependent; Factor H deficiency → uncontrolled alternative pathway activation → C3 depletion → recurrent infections.

Paroxysmal nocturnal hemoglobinuria (PNH): somatic mutation in PIG-A gene → impaired GPI-anchor synthesis → loss of GPI-anchored proteins (CD55, CD59) from RBCs → complement attacks RBCs → hemolytic anemia, thrombosis.`,
  questions:[
    {
      q:"Patients with C5-C9 deficiency are specifically susceptible to Neisseria species but not to most other bacteria. What feature of Neisseria makes defense against them MAC-dependent?",
      choices:[
        "A thick peptidoglycan wall that blocks C3b-mediated opsonization",
        "An outer membrane that MAC lyses readily, plus antiphagocytic surfaces",
        "They are the only bacteria whose surfaces cannot bind C3b at all",
        "They replicate only inside phagocytes, where MAC cannot reach them"
      ],
      ans:1,
      exp:"Neisseria meningitidis and gonorrhoeae are gram-negative diplococci whose thin outer membrane is readily perforated by the MAC pore, while their capsule, porins and IgA1 protease make opsonophagocytosis inefficient — so serum bactericidal (MAC-mediated) killing is the dominant defense in blood. C5–C9 deficiency therefore produces recurrent meningococcal bacteremia and meningitis, and such patients (like those on eculizumab) need meningococcal vaccination. A thick peptidoglycan wall is a gram-positive feature that actually protects against MAC rather than requiring it."
    },
    {
      q:"Factor H deficiency leads to uncontrolled alternative pathway activation and C3 depletion. Why does Factor H specifically protect host cells from alternative pathway activation?",
      choices:[
        "It binds fluid-phase C3 and prevents spontaneous tick-over hydrolysis",
        "It binds host sialic acid and lets Factor I cleave C3b deposited there",
        "It is made only by host cells and digests the microbial C3 convertase",
        "It outcompetes microbial surfaces for free C3b by simple mass action"
      ],
      ans:1,
      exp:"The alternative pathway runs continuously at low level (C3 tick-over), and nascent C3b lands on whatever surface is nearest. Host membranes display polyanions — sialic acid on RBCs, heparan sulfate on endothelium — that recruit Factor H, which both accelerates decay of the C3bBb convertase and serves as cofactor for Factor I to cleave C3b to inactive iC3b. Microbial surfaces lack those polyanions, so C3b there binds Factor B and amplifies. Factor H is abundant in plasma, so the discrimination is positional, not a matter of mass action; losing it causes atypical HUS, C3 glomerulopathy and C3 consumption."
    },
    {
      q:"In PNH, loss of CD55 and CD59 from RBCs causes complement-mediated hemolysis. Which explanation has classically been given for why PNH was named 'nocturnal' (dark hemoglobinuria most obvious in the first morning urine)?",
      choices:[
        "Circadian peaks in hepatic C3 synthesis make complement stronger at night",
        "Sleep hypoventilation lowers pH slightly, and overnight urine is concentrated",
        "Platelet activation during sleep triggers the classical pathway on red cells",
        "CD59 is re-expressed on red cells by day and lost again each night"
      ],
      ans:1,
      exp:"Mild hypoventilation during sleep retains CO₂ and nudges pH down (≈7.40 → ≈7.35), and the slightly acidic environment favors complement activation — the same principle behind the historical Ham acidified-serum test. Red cells lacking the GPI-anchored regulators CD55 and CD59 cannot stop MAC assembly, so they lyse, and the free hemoglobin appears in a concentrated first-morning void as cola-colored urine. In reality hemolysis in PNH is continuous and the nocturnal pattern largely reflects urine concentration; CD55/CD59 loss is a permanent consequence of the PIG-A mutation, not a day-night cycle. Free hemoglobin also scavenges nitric oxide, which drives the thrombosis (including Budd-Chiari) that eculizumab helps prevent."
    },
    {
      q:"C1q deficiency is strongly associated with systemic lupus erythematosus (SLE). Which mechanism explains this unexpected connection between complement deficiency and autoimmunity?",
      choices:[
        "Unchecked complement activation destroys the cells that enforce tolerance",
        "C1q normally tags apoptotic debris for silent clearance by macrophages",
        "Loss of C1q hyperactivates B cells by an entirely unknown mechanism",
        "Losing C1q removes a direct negative feedback signal on IgG synthesis"
      ],
      ans:1,
      exp:"Beyond binding IgG/IgM, C1q binds apoptotic blebs that display phosphatidylserine and nuclear antigens, and that tagging directs macrophages to clear them silently. Without C1q, nucleosomes, dsDNA and histones persist in tissue, are presented to the adaptive immune system, and tolerance to nuclear self-antigens breaks down → ANA, anti-dsDNA, anti-Sm and an SLE phenotype. C1q deficiency causes too little complement activity, not too much, so the uncontrolled-activation explanation is backwards; C2 and C4 deficiencies raise SLE risk more weakly through impaired immune-complex clearance."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 4: Molecular Biology — Gene Editing
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_4',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'CRISPR-Cas9 Mechanism and Applications in Genetic Disease',
  passage:`CRISPR-Cas9 (Clustered Regularly Interspaced Short Palindromic Repeats) is a prokaryotic adaptive immune system repurposed as a genome editing tool. The Cas9 nuclease is directed to a specific genomic locus by a single guide RNA (sgRNA) composed of a ~20-nucleotide sequence complementary to the target DNA (protospacer) fused to a scaffold sequence that recruits Cas9.

DNA targeting requires a protospacer adjacent motif (PAM) sequence immediately downstream of the target: for Streptococcus pyogenes Cas9 (SpCas9), the PAM is NGG. Cas9 unwinds the DNA double helix, checks base-pairing between the guide RNA and the target strand (the strand complementary to the guide) while displacing the PAM-containing non-target strand, and creates a blunt-ended double-strand break (DSB) 3 bp upstream of the PAM.

DSB repair occurs through two main pathways: Non-homologous end joining (NHEJ): error-prone, creates insertions/deletions (indels) that often cause frameshift mutations and gene knockout. Homology-directed repair (HDR): precise, requires a repair template with homology arms — used when a specific sequence correction is desired, but is inefficient in non-dividing cells.

Researchers used CRISPR-Cas9 to correct the sickle cell mutation (HBB, E6V: GAG→GTG) in patient-derived hematopoietic stem cells (HSCs). They designed an sgRNA targeting the HBB locus 5 bp from the mutation site, along with an ssDNA repair template containing the corrected sequence. Editing efficiency: 60% indels (NHEJ), 25% HDR (correction), 15% unedited. They also investigated reactivating HbF expression by editing the BCL11A enhancer (a repressor of γ-globin) using NHEJ to disrupt BCL11A binding, increasing γ-globin expression from 5% to 35% of β-like globin chains.`,
  questions:[
    {
      q:"Why does CRISPR-Cas9 require the PAM sequence (NGG for SpCas9) to be present in the target DNA?",
      choices:[
        "The guide RNA, not the Cas9 protein, base-pairs with the PAM sequence",
        "Cas9's PAM-interacting domain must bind PAM before the DNA can unwind",
        "The PAM adds hydrogen bonds that stabilize the guide RNA-DNA hybrid",
        "NGG triplets near the cut site are needed to recruit NHEJ repair factors"
      ],
      ans:1,
      exp:"Cas9 carries a PAM-interacting domain that contacts the NGG directly on the non-target strand, and that protein-DNA contact is the first committed step: it triggers local melting so the guide RNA can invade and interrogate the target strand. With no PAM, Cas9 samples the DNA and lets go without unwinding, so no R-loop and no cut form. The PAM requirement is also how the bacterium avoids cutting the spacer stored in its own CRISPR array. Different orthologs read different PAMs (SaCas9 NNGRRT, Cas12a TTTV), which is how the targetable sequence space is expanded."
    },
    {
      q:"In the sickle cell correction experiment, NHEJ produces 60% indels (gene knockout) while HDR produces 25% correction. Why is HDR less efficient, and why does NHEJ predominance limit therapeutic application?",
      choices:[
        "HDR is inefficient because homology arms are hard to design for HBB",
        "HDR works mainly in S/G2, and quiescent HSCs instead knock out HBB",
        "NHEJ simply outruns HDR because it skips any sequence homology check",
        "HDR is inefficient because Cas9 occupies the break and blocks the template"
      ],
      ans:1,
      exp:"HDR needs a template plus the CDK-dependent machinery available in S/G2, whereas hematopoietic stem cells sit in G0, so NHEJ dominates in exactly the cells being edited. That matters therapeutically because a frameshift indel in HBB abolishes β-globin from the edited allele — a β-thalassemia-like lesion stacked on the remaining sickle allele, which is worse than the starting genotype rather than merely unhelpful. Workarounds include cell-cycle synchronization, transient NHEJ inhibition, and DSB-free editors: an adenine base editor acting on the opposite strand converts the sickle GTG to GCG (Val→Ala, the benign Hb Makassar variant), while prime editing can restore GAG outright. Note that A→G editors cannot recreate the normal GAG codon, since the needed change is T→A."
    },
    {
      q:"The BCL11A enhancer editing strategy disrupts a repressor of γ-globin, increasing HbF from 5% to 35%. Which principle does this exploit?",
      choices:[
        "The enhancer cut lowers BCL11A in every tissue, removing it globally",
        "The enhancer drives BCL11A only in erythroid cells, so repression lifts there",
        "Cutting BCL11A returns adult erythroid cells to a fully fetal program",
        "Cutting the enhancer creates a new activator site in the γ-globin promoter"
      ],
      ans:1,
      exp:"BCL11A is the transcription factor that silences γ-globin during the fetal-to-adult switch, and a GATA1-dependent enhancer in its intron drives BCL11A expression specifically in erythroid precursors. Disrupting that enhancer by NHEJ lowers BCL11A in red cell precursors only, derepressing γ-globin (HbF rises from ~5% to ~35%) while sparing BCL11A in B cells and brain, where it is required. Common natural variants in this same enhancer are associated with higher HbF and milder sickle disease — note that deletional HPFH instead involves the β-globin locus on chromosome 11, not this enhancer on chromosome 2. Exagamglogene autotemcel (Casgevy) uses this strategy and was approved in 2023."
    },
    {
      q:"Off-target editing (Cas9 cleavage at unintended genomic sites) is a safety concern. Which feature of sgRNA design most directly minimizes off-target effects?",
      choices:[
        "Extending the guide to 25-30 nt so more base pairs must match",
        "Choosing a guide whose near-matches differ in the PAM-proximal seed",
        "Raising Cas9 concentration so on-target cutting finishes very quickly",
        "Restricting targets to exons so that intronic off-target cuts are silent"
      ],
      ans:1,
      exp:"Cas9 checks complementarity most stringently in the ~8-12 nucleotides next to the PAM (the seed), so one to three mismatches there sharply reduce cleavage. The best single design lever is therefore to pick a 20-nt protospacer whose genome-wide near-matches carry seed-region mismatches, keeping the on-target site the only perfectly paired one. Lengthening the guide beyond 20 nt does not help, because the extra bases are not engaged by Cas9 — if anything, truncated 17-18-nt guides lower off-target activity. More Cas9 and longer exposure increase off-target cutting, and off-target breaks in introns or regulatory DNA are not harmless. Complementary approaches: high-fidelity variants (SpCas9-HF1, eSpCas9), short-lived RNP delivery, and DSB-free base or prime editing."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 5: Respiratory Physiology
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_5',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Oxygen-Hemoglobin Dissociation and Tissue Oxygen Delivery',
  passage:`The oxygen-hemoglobin dissociation curve (OHDC) relates hemoglobin oxygen saturation (SaO₂) to partial pressure of O₂ (PO₂). The sigmoid shape reflects cooperative binding: binding of O₂ to one heme group increases affinity of the remaining subunits (T-state → R-state transition). The P₅₀ (PO₂ at 50% saturation) is normally 26 mmHg. The Hill coefficient (n ≈ 2.7) quantifies cooperativity.

Factors shifting the OHDC: rightward shift (decreased O₂ affinity, increased P₅₀) — increased temperature, pCO₂, [H⁺] (Bohr effect), 2,3-BPG; leftward shift (increased O₂ affinity, decreased P₅₀) — decreased temperature, CO₂, [H⁺], 2,3-BPG; fetal Hb (HbF, weaker 2,3-BPG binding).

Oxygen delivery (DO₂) = CO × CaO₂, where CaO₂ = (Hb × 1.34 × SaO₂) + (PaO₂ × 0.003). Oxygen consumption (VO₂) = CO × (CaO₂ − CvO₂), where CvO₂ = mixed venous O₂ content.

A 68-year-old man in septic shock: CO = 8 L/min (hyperdynamic), Hb = 7 g/dL, SaO₂ = 94%, PaO₂ = 68 mmHg, mixed venous O₂ saturation (SvO₂) = 82%, temperature = 39.2°C, pH = 7.28.

A second patient has carbon monoxide poisoning (COHb = 45%) with SpO₂ 98% by standard pulse oximetry.`,
  questions:[
    {
      q:"The septic patient has a fever (39.2°C) and acidosis (pH 7.28). How do these factors affect the OHDC and O₂ delivery to tissues?",
      choices:[
        "Both shift the curve leftward, raising affinity and easing tissue unloading",
        "Both shift the curve rightward, lowering affinity and easing tissue unloading",
        "Fever shifts it leftward and acidosis rightward, so the two effects cancel",
        "Neither shifts the curve, because compensation holds the P₅₀ at 26 mmHg"
      ],
      ans:1,
      exp:"A leftward shift means tighter O₂ binding and poorer unloading, so claiming a leftward shift eases unloading is self-contradictory. Bohr effect: acidosis (↓pH, ↑pCO₂) promotes O₂ release from Hb at the tissue level (rightward OHDC shift, ↑P₅₀). Temperature: fever (↑T) directly weakens O₂-Hb binding → also a rightward shift, so the effects add rather than cancel. Both are adaptive in metabolically demanding states: tissues consuming O₂ produce CO₂ and H⁺ → locally rightward-shifted curve → better O₂ unloading at the tissue-blood interface. In the lung (normal pH, lower T, lower CO₂): curve is more leftward → better O₂ loading. This spatial O₂ affinity modulation (Bohr effect + temperature effect) is physiologically elegant — Hb picks up O₂ efficiently in the lung and releases it efficiently in metabolically active tissues."
    },
    {
      q:"Calculate the arterial O₂ content (CaO₂) for the septic patient (Hb = 7 g/dL, SaO₂ = 0.94, PaO₂ = 68 mmHg):",
      choices:[
        "9.02 mL O₂/dL",
        "9.38 mL O₂/dL",
        "6.58 mL O₂/dL",
        "0.20 mL O₂/dL"
      ],
      ans:0,
      exp:"CaO₂ = (Hb × 1.34 mL O₂/g × SaO₂) + (PaO₂ × 0.003 mL O₂/mmHg/dL) = (7 × 1.34 × 0.94) + (68 × 0.003) = 8.82 + 0.20 = **9.02 mL O₂/dL**. Forgetting the saturation term gives 9.38 (the full carrying capacity if Hb were 100% saturated), dropping the 1.34 mL/g binding capacity gives 6.58, and the dissolved term alone gives 0.20 — which is why dissolved O₂ is negligible at normal PaO₂. Normal CaO₂ ≈ 20 mL/dL, so this patient's content is halved mostly by anemia. DO₂ = CO × CaO₂ = 8 L/min × 90.2 mL/L ≈ 720 mL O₂/min, the hyperdynamic cardiac output partly offsetting the low content."
    },
    {
      q:"The CO-poisoned patient has SpO₂ 98% but COHb = 45%. Explain why standard pulse oximetry overestimates true O₂ saturation:",
      choices:[
        "Two-wavelength oximetry resolves every hemoglobin species, COHb included",
        "At 660 nm COHb absorbs much like OxyHb, so the device counts it as OxyHb",
        "Carbon monoxide damages the probe's light-emitting diodes and detector",
        "COHb absorbs strongly at 940 nm, so the reading falls below true saturation"
      ],
      ans:1,
      exp:"A standard oximeter shines only 660 nm and 940 nm light and solves a two-species problem (OxyHb vs DeoxyHb). Carboxyhemoglobin absorbs at 660 nm almost like oxyhemoglobin, so the device assigns it to the oxygenated pool and reports 95-100% even though that hemoglobin carries no O₂; the reading is falsely high, not low. With COHb 45%, fractional oxyhemoglobin is only about 53%, which multi-wavelength co-oximetry (or a measured SaO₂) reveals. Hence CO poisoning presents without cyanosis and with a reassuring SpO₂ — treat with 100% O₂, which shortens CO's elimination half-life from ~4-5 hours on room air to ~1 hour, and hyperbaric O₂ for severe cases."
    },
    {
      q:"The septic patient's SvO₂ = 82% (normal 65-70%). What does the elevated SvO₂ indicate about O₂ extraction and tissue perfusion?",
      choices:[
        "Tissues are extracting more O₂ than normal, signalling high metabolic demand",
        "Tissues are extracting too little O₂ despite high delivery — impaired utilization",
        "High SvO₂ is an expected, benign finding whenever cardiac output is elevated",
        "The patient is over-ventilated, and respiratory alkalosis raises venous saturation"
      ],
      ans:1,
      exp:"SvO₂ interpretation: O₂ extraction ratio (O₂ER) = (SaO₂ − SvO₂)/SaO₂. Normal SvO₂ 65-70% → O₂ER ≈ 25-30%. This patient: SvO₂ = 82% → O₂ER = (94-82)/94 = 12.8% — very low. Tissues are extracting only 12.8% of delivered O₂ despite presumably high demand. Pathophysiology in sepsis: (1) Maldistribution: blood shunted through non-metabolic arteriovenous anastomoses → bypasses metabolic tissue; (2) Cytopathic hypoxia: endotoxin impairs mitochondrial electron transport → cells cannot utilize O₂ even when present; (3) High CO in hyperdynamic sepsis → O₂ delivery remains high. Paradox: high DO₂ (hyperdynamic CO) + high SvO₂ (poor extraction) = tissues in metabolic crisis despite adequate macrovascular O₂ delivery. This explains why simply increasing CO (fluids, vasopressors) may not fix septic organ dysfunction. Note the direction of the relationship: greater extraction would **lower** SvO₂ (as in cardiogenic shock, where SvO₂ falls below 60%), so a high value can never mean increased extraction, and it is a marker of pathology rather than a benign consequence of high output."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 6: Genetics — Chromosomal & Mendelian
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_6',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Genetic Imprinting and Uniparental Disomy',
  passage:`Genomic imprinting is an epigenetic phenomenon in which genes are expressed from only one parental allele, determined by the sex of the parent from which the allele was inherited. Imprinting is mediated by differential DNA methylation established in the germline at imprinting control regions (ICRs). Methylation marks (imprints) are maintained through somatic cell division by DNMT1 but are erased in the germline and re-established according to the sex of the transmitting parent.

Two classic imprinting disorders arise from abnormalities of chromosome 15q11-q13: Prader-Willi syndrome (PWS) and Angelman syndrome (AS). In this region, SNRPN (and associated snoRNAs) is expressed only from the paternal allele; UBE3A is expressed only from the maternal allele in neurons.

PWS results from loss of paternal 15q11-q13 expression: deletion of the paternal chromosome (~70%), maternal uniparental disomy (UPD) for chromosome 15 (~25%), imprinting defect (~3%). AS results from loss of maternal 15q11-q13 expression: deletion of the maternal chromosome (~70%), UBE3A mutation (~10%), paternal UPD (~2-7%), imprinting defect (~3-5%); roughly 10% of cases remain molecularly unexplained.

UPD occurs when both copies of a chromosome are inherited from one parent. UPD can arise from: trisomy rescue (a trisomy is corrected by loss of one chromosome — if the correct chromosome is lost, UPD results); monosomy rescue (mitotic duplication of the remaining chromosome); or gamete complementation.`,
  questions:[
    {
      q:"A child inherits two copies of chromosome 15 from the mother (maternal UPD 15) and no paternal copy. Which syndrome results, and why?",
      choices:[
        "Angelman syndrome — maternal copies cannot express UBE3A in neurons",
        "Prader-Willi syndrome — no copy expresses the paternally expressed genes",
        "Both syndromes at once — extra maternal genes plus absent paternal genes",
        "Neither syndrome — two copies of the region restore the normal gene dosage"
      ],
      ans:1,
      exp:"Maternal UPD 15: two copies of chromosome 15 from mother. Both copies have maternal imprinting marks: SNRPN and associated snoRNAs are methylated/silenced on both copies (maternal imprint silences paternal-expressed genes). UBE3A is expressed on both copies (maternal expression). Result: no paternal gene expression (SNRPN, snoRNAs absent) → PWS. UBE3A is expressed normally (from both maternal copies). PWS features: neonatal hypotonia, feeding difficulty, then hyperphagia/obesity, hypogonadism, intellectual disability, behavioral issues. AS features (loss of maternal expression): happy demeanor, seizures, absent speech, ataxic gait, intellectual disability. Key: same chromosomal region, opposite parental origin → completely different disorders."
    },
    {
      q:"Imprinting marks are erased and re-established in the germline. Why must imprinting marks be erased each generation rather than maintained?",
      choices:[
        "Erasure and re-establishment cost less energy than lifelong maintenance",
        "Grandparental marks must be cleared so each gamete carries its own sex's",
        "Methylation marks decay spontaneously and need restoring before fertilization",
        "Erasure prevents imprinting errors from accumulating over many generations"
      ],
      ans:1,
      exp:"Every person inherits one chromosome 15 bearing paternal imprints and one bearing maternal imprints. If a woman's oocyte transmitted her father's chromosome with its paternal marks intact, the embryo would read that chromosome as paternal and gene expression would be wrong — which is exactly what imprinting-defect PWS and AS look like. So in primordial germ cells all imprints are stripped (TET-mediated active demethylation plus passive, replication-dependent loss), making the alleles equivalent, and then re-established by the de novo methyltransferases DNMT3A/3B with DNMT3L according to the sex of the gamete-producing individual. Note that DNMT3A/3B **establish** imprints rather than erase them, and maintenance through somatic divisions is DNMT1's job — the marks do not simply decay."
    },
    {
      q:"A child with Angelman syndrome has a de novo deletion of 15q11-q13 on the maternal chromosome. The deletion is detected by cytogenetics but the parental origin is determined by methylation analysis. Why does methylation analysis distinguish the two syndromes when the deletion size is identical?",
      choices:[
        "Methylation sizes the deletion more precisely than cytogenetic analysis does",
        "The SNRPN imprinting region is methylated maternally but not paternally",
        "The deleted interval in Angelman contains different genes than in Prader-Willi",
        "Methylation detects uniparental disomy but cannot be interpreted in deletions"
      ],
      ans:1,
      exp:"At the SNRPN promoter the maternal allele is methylated and the paternal allele is unmethylated, so a normal sample shows both patterns. Delete the maternal chromosome (AS) and only the unmethylated paternal pattern remains; delete the paternal chromosome (PWS) and only the methylated maternal pattern remains — the same assay reports which parental allele is missing even when the two deletions are cytogenetically identical. Methylation testing detects >99% of PWS (deletion, maternal UPD and imprinting defect all give the maternal-only pattern) and ~80% of AS, missing the ~10% caused by UBE3A point mutations, which need sequencing. It cannot distinguish deletion from UPD from imprinting defect — that takes microarray/FISH plus microsatellite studies — so it is a first-line test, not a sizing test."
    },
    {
      q:"A fetus has trisomy 15 arising from maternal meiosis I nondisjunction (two maternal copies plus one paternal copy). If one chromosome 15 is lost at random to restore disomy, what is the probability that the result is maternal UPD 15?",
      choices:[
        "1/3",
        "1/2",
        "2/3",
        "1/4"
      ],
      ans:0,
      exp:"The trisomic cell carries M₁, M₂ and P. Losing M₁ or M₂ (2/3 of events) leaves one maternal and one paternal copy — ordinary biparental disomy. Only losing P (1/3 of events) leaves M₁ + M₂, which is maternal UPD 15 and therefore Prader-Willi syndrome, since no chromosome expresses the paternally expressed genes. Note the 1/3 comes from counting chromosomes, not parents: the two maternal copies make maternal loss twice as likely as paternal loss, which is why 1/2 is wrong. Trisomy rescue of this kind is why ~25% of PWS cases are maternal UPD, detectable as homozygosity for maternal microsatellite alleles."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 7: Biochem — Amino Acid Catabolism
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_7',
  subj:'biochemistry',
  type:'passage',
  topic:'B/B',
  title:'Phenylalanine Catabolism and Inborn Errors of Metabolism',
  passage:`Phenylalanine (Phe) is an essential amino acid catabolized primarily to tyrosine by phenylalanine hydroxylase (PAH), which requires tetrahydrobiopterin (BH4) as a cofactor. Tyrosine is further catabolized through a series of reactions: tyrosine aminotransferase → p-hydroxyphenylpyruvate → homogentisate (via homogentisate oxidase) → maleylacetoacetate → fumarylacetoacetate → fumarate + acetoacetate. Tyrosine is also a precursor for melanin (via tyrosinase), catecholamines (via tyrosine hydroxylase), and thyroid hormones.

Phenylketonuria (PKU): PAH deficiency → Phe accumulates → Phe crosses BBB via large neutral amino acid (LNAA) transporter, competing with other amino acids → reduced brain levels of tyrosine, tryptophan → reduced dopamine, serotonin → intellectual disability, seizures, musty/mousy body odor (from phenylacetate; phenylpyruvate and other phenylketones also appear in urine), hypopigmentation (reduced melanin). Neonatal screening (Guthrie test → tandem mass spectrometry) detects elevated Phe by day 2-3 of life. Treatment: Phe-restricted diet + tyrosine supplementation.

Malignant hyperphenylalaninemia: 2% of PKU cases are due to BH4 deficiency (GTP cyclohydrolase, 6-pyruvoyltetrahydropterin synthase, or dihydropteridine reductase deficiency) rather than PAH deficiency; BH4 is required for PAH, tyrosine hydroxylase, and tryptophan hydroxylase — so even with dietary Phe restriction, neurotransmitter deficiency persists.

Alkaptonuria: deficiency of homogentisate oxidase → homogentisic acid accumulates → excreted in urine (turns black on air exposure), deposits in connective tissue (ochronosis), causing progressive arthritis.`,
  questions:[
    {
      q:"In classic PKU, Phe accumulation competitively inhibits the LNAA transporter, reducing brain levels of tyrosine and tryptophan. What neurotransmitter deficiencies result, and why do they cause intellectual disability?",
      choices:[
        "Acetylcholine and GABA fall, depriving the developing cortex of signalling",
        "Dopamine, norepinephrine and serotonin fall during critical growth windows",
        "Phenylalanine itself bonds covalently to synaptic proteins and kills neurons",
        "Blocked transport starves neurons of glucose, causing energy deprivation"
      ],
      ans:1,
      exp:"PKU neurotoxicity: Multiple mechanisms, but reduced neurotransmitter precursors are central. The LNAA transporter (SLC7A5) is a shared carrier for Phe, Tyr, Trp, Leu, Ile, Val, Met. High plasma Phe competitively inhibits transport of all other LNAAs including Tyr and Trp → brain deficiency of these amino acids despite normal plasma levels. Tyr → catecholamines (dopamine → motivation, reward, motor control; norepinephrine → attention); Trp → serotonin (mood, sleep, synaptic plasticity). During brain development, these monoamines have trophic roles — stimulating dendritic arborization, myelination, and synaptic pruning. The critical period: early postnatal brain is most vulnerable. Newborn screening and immediate dietary intervention (by day 10-14 of life) prevents intellectual disability."
    },
    {
      q:"Malignant hyperphenylalaninemia (BH4 deficiency) is more severe than classic PKU even when Phe is controlled. Why?",
      choices:[
        "BH4 serves only PAH, so its deficiency is equivalent to classic PKU",
        "BH4 also serves tyrosine and tryptophan hydroxylase, which diet cannot fix",
        "BH4 deficiency additionally causes structural brain malformations in utero",
        "BH4 is needed for myelin synthesis, producing a demyelinating neuropathy"
      ],
      ans:1,
      exp:"BH4 as pleiotropic cofactor: BH4 (tetrahydrobiopterin) is required for: (1) PAH (Phe hydroxylation); (2) Tyrosine hydroxylase (TH: Tyr → L-DOPA, rate-limiting step in catecholamine synthesis); (3) Tryptophan hydroxylase (TPH: Trp → 5-HTP, rate-limiting step in serotonin synthesis); (4) Nitric oxide synthase (NO production). In BH4 deficiency: even if Phe is controlled by diet, TH and TPH cannot function → no dopamine, NE, serotonin synthesis despite adequate amino acid precursors. Treatment requires: Phe restriction + BH4 supplementation (if residual enzyme) + L-DOPA/carbidopa + 5-HTP + folate (dihydropteridine reductase deficiency depletes folate). Sapropterin (synthetic BH4) is FDA-approved for PAH-variant PKU and some BH4 deficiencies."
    },
    {
      subj:'organic_chem',
      q:"Alkaptonuria is caused by homogentisate oxidase deficiency. Homogentisic acid (HGA) deposits in connective tissue (ochronosis) and polymerizes to form a dark pigment. What chemical property of HGA enables this polymerization?",
      choices:[
        "It carries amino groups and polymerizes by forming peptide bonds",
        "Its two ring hydroxyls oxidize to a quinone that cross-links readily",
        "It is a reducing sugar that undergoes Maillard reactions with collagen",
        "It polymerizes by forming disulfide bonds with collagen cysteines"
      ],
      ans:1,
      exp:"HGA chemistry: Homogentisic acid (2,5-dihydroxyphenylacetic acid) is a polyphenol. Polyphenols are readily oxidized by atmospheric O₂ or peroxidases to quinones (ortho-quinones). Quinones are electrophilic and react with nucleophilic amino groups (lysine, collagen N-termini) and other aromatic compounds in non-enzymatic reactions, forming high-molecular-weight polymers (similar to melanin biosynthesis). In alkaptonuria: HGA accumulates in plasma and tissues → oxidizes → quinone formation → pyomelanin deposition in collagen-rich tissues (cartilage, sclera, tendon) → characteristic blue-black discoloration of ears, sclera, urine → cartilage damage from polymer incorporation → ochronotic arthritis. The black urine on standing (oxidation of HGA) is pathognomonic. Treatment: nitisinone (HPPD inhibitor, blocks HGA production) is now approved."
    },
    {
      q:"Tyrosine is the precursor for both catecholamines and melanin. Which enzyme converts tyrosine to melanin in melanocytes, and what happens to melanin production in PKU?",
      choices:[
        "Tyrosine hydroxylase makes melanin in every cell type, and PKU raises it",
        "Tyrosinase makes melanin in melanocytes, and PKU reduces its output",
        "Phenylalanine is the direct melanin precursor, so PAH loss blocks pigment",
        "Tyrosinase is induced in PKU, giving paradoxical skin hyperpigmentation"
      ],
      ans:1,
      exp:"Tyrosinase, a copper metalloenzyme encoded by TYR, catalyzes Tyr → DOPA → DOPAquinone in melanocytes; DOPAquinone then polymerizes to eumelanin or pheomelanin. Untreated PKU reduces pigment two ways: tyrosine becomes a limiting substrate (PAH deficiency makes it conditionally essential, and high Phe competes for the same transporters), and excess Phe directly inhibits tyrosinase. The result is hypopigmentation — fair skin, light hair and blue eyes relative to unaffected siblings — never hyperpigmentation. Tyrosine hydroxylase is a distinct, neuron-restricted enzyme that starts catecholamine synthesis, and complete tyrosinase mutations cause oculocutaneous albinism."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 8: Reproductive Biology
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_8',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Meiosis, Gametogenesis, and Chromosomal Nondisjunction',
  passage:`Meiosis produces haploid gametes from diploid germ cells through two sequential divisions. Meiosis I (reductional division): homologous chromosomes separate. Meiosis II (equational division): sister chromatids separate. Key events of meiosis I: synapsis of homologous chromosomes (forming bivalents), crossing over (at chiasmata), independent assortment of homologous pairs at the metaphase I plate.

In oogenesis, meiosis I is initiated in fetal life and arrested at prophase I (diplotene stage) until ovulation, when the primary oocyte completes meiosis I. Meiosis II is arrested at metaphase II until fertilization. The first and second polar bodies are formed at these arrest releases. In spermatogenesis, meiosis proceeds continuously after puberty with no arrest.

Nondisjunction — failure of chromosomes or chromatids to separate — produces aneuploid gametes. Trisomy 21 (Down syndrome) is caused by meiotic nondisjunction in 95% of cases (80% from maternal meiosis I, 20% maternal meiosis II, rare paternal). Advanced maternal age strongly increases risk: age 25 → 1/1,400; age 35 → 1/350; age 45 → 1/25.

The maternal age effect reflects the extended meiotic arrest: oocytes arrested in prophase I for decades have progressively weakening cohesin complexes (which hold bivalents together during the arrest), increasing the risk of premature separation of homologs and nondisjunction when meiosis resumes at ovulation.`,
  questions:[
    {
      q:"A primary oocyte undergoes nondisjunction at meiosis I for chromosome 21. What are the chromosome 21 contents of the resulting ovum and polar bodies?",
      choices:[
        "First polar body 2 copies; ovum 1 copy; second polar body 1 copy",
        "First polar body 0 copies; ovum 2 copies; second polar body 2 copies",
        "First polar body 0 copies; ovum 2 copies; second polar body 0 copies",
        "All products carry 1 copy, because meiosis II corrects the earlier error"
      ],
      ans:1,
      exp:"At meiosis I both chromosome 21 homologs (each still two sister chromatids) move into the secondary oocyte, so the first polar body receives none. At meiosis II the sister chromatids of each homolog separate normally, which splits those two chromosomes between the ovum and the second polar body — each therefore ends up with two chromatid-derived copies of chromosome 21. Fertilization of the n+1 ovum by a normal sperm gives trisomy 21 carrying two **different** maternal homologs, i.e. heterodisomy near the centromere, the molecular signature that distinguishes an MI error from an MII error. Meiosis II cannot repair an MI missegregation; it only separates whatever chromatids are present."
    },
    {
      q:"The maternal age effect on nondisjunction is attributed to weakening of cohesin complexes during the extended meiotic arrest. What is the molecular function of cohesin in maintaining bivalent structure during meiotic arrest?",
      choices:[
        "It polymerizes into the spindle fibers that pull chromosomes to the poles",
        "It is a ring that encircles sister chromatids and holds the bivalent together",
        "It methylates centromeric DNA to block premature replication during arrest",
        "It recruits recombinases that hold crossover sites until meiosis I resumes"
      ],
      ans:1,
      exp:"Cohesin function in meiosis: SMC (structural maintenance of chromosomes) cohesin complex forms a ring that encircles sister chromatids. In meiosis I: cohesin at chromosome arms is cleaved by separase to allow homolog separation; but centromeric cohesin is protected by shugoshin (SGO1/2) → sister chromatids remain together → each homolog is dragged to the same pole as a unit. In meiosis II: centromeric cohesin is then cleaved → sister chromatids separate. Maternal age effect: Cohesin is loaded in fetal life and cannot be replaced during the decades-long arrest (unlike in somatic cells where cohesin is reloaded each cell cycle). Over time, cohesin gradually falls off chromosomes → weakened bivalent cohesion → susceptibility to premature homolog separation at ovulation → nondisjunction. STAG3 (meiosis-specific cohesin subunit) mutations cause premature ovarian insufficiency and elevated aneuploidy."
    },
    {
      q:"A couple discovers that their fetus has trisomy 18 (Edwards syndrome). Genetic testing shows the extra chromosome 18 has maternal origin. Which meiotic event most likely caused this trisomy?",
      choices:[
        "Paternal meiosis II nondisjunction, the usual origin of trisomy 18",
        "Maternal meiosis II nondisjunction, with sister chromatids failing to part",
        "Mitotic nondisjunction after fertilization, producing somatic mosaicism",
        "Maternal meiosis I nondisjunction, since homologs must separate first"
      ],
      ans:1,
      exp:"Trisomy 18 is unusual among the viable autosomal trisomies: whereas trisomy 21 arises mostly from maternal meiosis I errors, roughly two-thirds of maternal chromosome 18 errors occur at meiosis II, so maternal MII nondisjunction is the most likely mechanism for a maternally derived extra chromosome 18. The two are distinguished with microsatellite markers near the centromere — MII failure keeps sister chromatids of one homolog together, giving a single maternal allele (homozygosity/isodisomy), while MI failure delivers both homologs, giving two different maternal alleles (heterodisomy). Paternal origin is excluded by the stated testing, and mitotic nondisjunction would typically produce mosaicism rather than uniform trisomy."
    },
    {
      q:"In spermatogenesis, continuous meiosis occurs after puberty without the prolonged arrest seen in oogenesis. Which consequence does this have for sperm quality with increasing paternal age?",
      choices:[
        "Paternal age is irrelevant, because continuous meiosis avoids any arrest",
        "Continuous divisions accumulate replication errors as de novo point mutations",
        "Paternal age raises nondisjunction risk as steeply as maternal age does",
        "Continuous division protects the lineage, since damaged cells are culled"
      ],
      ans:1,
      exp:"Spermatogonial stem cells keep dividing after puberty (roughly 23 divisions per year), and each replication adds a few copying errors. Kong et al. (2012, Iceland) measured the result: offspring gain about **2 extra de novo single-nucleotide variants per year of paternal age**, so a 40-year-old father transmits ~40 more than a 20-year-old, and ~80% of a child's de novo SNVs are paternal. These are point mutations, in contrast to the whole-chromosome errors that drive the maternal age effect, so nondisjunction risk does not rise comparably with paternal age. Associated conditions include autism spectrum disorder, schizophrenia, achondroplasia (FGFR3) and MEN2 (RET). Apoptosis culls damaged cells but does not prevent mutations from being fixed in the stem cell pool."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 9: Physiology — Gastrointestinal
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_9',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Gastric Acid Secretion and Peptic Ulcer Disease',
  passage:`Gastric acid (HCl) is secreted by parietal cells of the gastric corpus via the H⁺/K⁺-ATPase (proton pump), which exchanges cytoplasmic H⁺ for luminal K⁺. The pump is a P-type ATPase driven directly by ATP hydrolysis; K⁺ taken up in the exchange is recycled back to the lumen through apical K⁺ channels, which sustains the exchange. The proton pump achieves a 10⁶-fold concentration gradient (intracellular pH ~7.2; gastric lumen pH ~1).

Three pathways stimulate acid secretion: (1) Histamine (from enterochromaffin-like cells) binds H₂ receptors on parietal cells → Gs → cAMP → PKA → activates H⁺/K⁺-ATPase; (2) Gastrin (from G cells of antrum) binds CCK-B receptors → Gq → IP₃/DAG → Ca²⁺ → acid secretion; (3) Acetylcholine (vagal M3 receptors on parietal cells) → Gq → Ca²⁺. These three pathways converge on phosphorylation and trafficking of H⁺/K⁺-ATPase to the apical canalicular membrane.

Peptic ulcer disease (PUD) results from imbalance between acid/pepsin (aggressive factors) and mucosal defense (mucus, bicarbonate, prostaglandins, blood flow). H. pylori (gram-negative spiral, urease+) colonizes the gastric mucosa and disrupts mucosal defense. NSAIDs inhibit COX-1 → reduced prostaglandin E₂ → impaired mucus and bicarbonate secretion.

A 45-year-old man with NSAID-induced gastric ulcer is treated with a proton pump inhibitor (PPI, omeprazole). PPIs are prodrugs — activated by gastric acid to a sulfenamide that covalently binds the cysteine residues of the H⁺/K⁺-ATPase, irreversibly inhibiting it.`,
  questions:[
    {
      q:"Histamine stimulates parietal cells via H₂ receptors coupled to Gs proteins. How does cAMP generated by Gs signaling activate the H⁺/K⁺-ATPase?",
      choices:[
        "cAMP binds an allosteric site on the pump and opens it directly",
        "cAMP activates PKA, which traffics pumps to the apical canaliculus",
        "cAMP feeds back on adenylyl cyclase, briefly terminating the signal",
        "cAMP activates phospholipase C to generate IP₃ and release Ca²⁺"
      ],
      ans:1,
      exp:"Parietal cell activation: H₂R → Gs → adenylyl cyclase → cAMP → PKA. PKA (1) phosphorylates the H⁺/K⁺-ATPase α-subunit, activating it; (2) stimulates trafficking of tubulovesicles (which contain inactive H⁺/K⁺-ATPase) from cytoplasm to the apical canalicular membrane — this membrane recruitment dramatically increases the surface area and pump density at the apical face. Activated parietal cells undergo morphological change: smooth ER (tubulovesicular system) transforms to apical canalicular network with >90% of H⁺/K⁺-ATPase now surface-exposed. PKA does not generate IP₃; the separate gastrin/ACh pathway (Gq → PLC → IP₃/DAG → Ca²⁺/PKC) converges with cAMP/PKA to produce additive stimulation. This convergence explains why PPIs (which inhibit the final common effector pump) are more effective than H₂ blockers (which block only one stimulatory pathway)."
    },
    {
      q:"Omeprazole is a PPI that must be activated by gastric acid. Why is this prodrug design clinically important?",
      choices:[
        "Acid activation limits the drug's effect to patients with high acid output",
        "Only the parietal cell canaliculus is acidic enough to trap and activate it",
        "Acid activation blocks systemic absorption, which limits adverse effects",
        "The prodrug design lets omeprazole be given orally without enteric coating"
      ],
      ans:1,
      exp:"PPI mechanism: Omeprazole (weak base, pKa ~4) is absorbed systemically, reaches the parietal cell from the blood, diffuses into the acidic secretory canaliculus (pH <2). At pH <2, omeprazole is protonated and undergoes acid-catalyzed conversion to the tetracyclic sulfenamide (active form). The sulfenamide is membrane-impermeant (charged) and is trapped in the canaliculus. It reacts covalently with Cys813 and Cys892 of the H⁺/K⁺-ATPase α-subunit via disulfide bonds, irreversibly blocking the pump. The irreversibility means acid suppression persists until new pump protein is synthesized (~18 hours). Because only the secretory canaliculus reaches pH <2, no other compartment activates the drug, which is what makes a covalent, irreversible inhibitor safe to give systemically. Note that omeprazole is in fact absorbed systemically (it needs enteric coating to survive the stomach lumen), so acid activation is about targeting, not about blocking absorption. PPIs must be taken before meals (when proton pumps are being actively recruited to the membrane) for maximum efficacy."
    },
    {
      q:"H. pylori urease converts urea to NH₃ + CO₂. How does this enzymatic activity help H. pylori survive in the gastric environment and how is it used diagnostically?",
      choices:[
        "Ammonia buffers acid around the organism; labeled CO₂ is breath-detected",
        "Bicarbonate is exported to the lumen and neutralizes gastric acid overall",
        "The CO₂ released is fixed by the bacterium as its main carbon source",
        "The reaction yields ATP by substrate-level phosphorylation for motility"
      ],
      ans:0,
      exp:"H. pylori survival strategy: Urea (from plasma ultrafiltration into gastric juice) + urease → 2 NH₃ + CO₂. NH₃ (ammonia, pKb ~4.7) buffers H⁺: NH₃ + H⁺ → NH₄⁺. This local pH neutralization creates a protective ammonia 'cloud' around H. pylori (maintains periplasmic pH ~6.1 while gastric lumen is pH 1-2). The urease is both extracellular and periplasmic. Diagnostic uses: (1) Urea breath test (UBT): patient drinks ¹³C-urea → H. pylori urease → ¹³CO₂ → exhaled → isotope ratio mass spectrometry detects ¹³CO₂:¹²CO₂ ratio above baseline → positive test; (2) Rapid urease test (CLO test): biopsy in urea-containing medium → H. pylori urease → NH₃ → pH indicator turns pink; (3) Stool antigen test; (4) Serology (IgG, indicates past or current infection). UBT is the preferred non-invasive test for confirming H. pylori eradication."
    },
    {
      q:"NSAIDs cause gastric ulcers by inhibiting COX-1, reducing prostaglandin E₂ (PGE₂). What is PGE₂'s role in gastric mucosal defense?",
      choices:[
        "It acts on parietal cell H₂ receptors to shut down acid secretion",
        "It drives mucus and bicarbonate secretion and sustains mucosal blood flow",
        "It activates the proton pump so that acid itself can kill H. pylori",
        "It triggers parietal cell apoptosis, shrinking the acid-secreting mass"
      ],
      ans:1,
      exp:"PGE₂ cytoprotection (Vane's prostaglandin hypothesis): Arachidonic acid → COX-1 → PGE₂ + PGI₂. PGE₂ effects on gastric mucosa: (1) Stimulates mucous cell mucus and HCO₃⁻ secretion (pH gradient protection); (2) Maintains mucosal blood flow (vasodilatory via EP2/EP4 → ensures adequate oxygenation and bicarbonate delivery); (3) Inhibits parietal cell acid secretion (EP3 → Gi → reduced cAMP → reduced PKA → less H⁺/K⁺-ATPase activation); (4) Promotes mucosal cell repair/proliferation. COX-1 is constitutively expressed in gastric mucosa → constitutive PGE₂ → continuous protection. NSAID COX-1 inhibition → PGE₂ deficiency → all four protective mechanisms impaired → mucosal injury → ulceration. This occurs even with parenteral or rectal NSAID administration, proving the injury is prostaglandin-mediated rather than simple topical irritation. PGE₂ does inhibit acid secretion, but through parietal cell EP3 receptors (Gi → less cAMP), not through H₂ receptors, which are the histamine receptors that stimulate secretion. COX-2-selective NSAIDs (celecoxib) spare gastric COX-1 → reduced GI toxicity but increased cardiovascular risk."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 B/B PASSAGE 10: Neuroscience — Pain & Neurotransmission
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2bb_10',
  subj:'biology',
  type:'passage',
  topic:'B/B',
  title:'Opioid Receptor Signaling and Analgesic Tolerance',
  passage:`Opioid receptors (μ, κ, δ) are Gi/Go-coupled GPCRs expressed in the central and peripheral nervous system. Endogenous opioid ligands include endorphins (μ-receptor), dynorphins (κ), and enkephalins (δ/μ). Opioid receptor activation: Gi inhibits adenylyl cyclase → reduced cAMP → decreased PKA activity; Go activates K⁺ channels (hyperpolarization) and inhibits voltage-gated Ca²⁺ channels (reduced neurotransmitter release). Net effect: reduced neuronal excitability and reduced neurotransmitter release at pain synapses.

Opioid receptors are concentrated in the periaqueductal gray (PAG), rostral ventromedial medulla (RVM), and dorsal horn of the spinal cord, forming a descending pain modulatory system. Activation of PAG neurons → release of serotonin and NE in the dorsal horn → inhibition of nociceptive transmission.

Morphine (μ-agonist) is the prototype opioid analgesic. Tolerance — requiring increasing doses for the same analgesic effect — develops through: (1) Receptor desensitization (GRK phosphorylation of the receptor → β-arrestin recruitment → uncoupling from Gi); (2) Receptor internalization (β-arrestin-mediated endocytosis → reduced surface receptor density); (3) Compensatory upregulation of adenylyl cyclase (cAMP superactivation upon opioid withdrawal → hyperalgesia, withdrawal symptoms).

A clinical trial compared standard morphine to a biased agonist that preferentially activates the Gi pathway over the β-arrestin pathway. The biased agonist showed equivalent analgesia with reduced tolerance development and reduced constipation/respiratory depression.`,
  questions:[
    {
      q:"Opioid receptor activation by μ-agonists reduces cAMP via Gi and activates K⁺ channels via Go. How do these two mechanisms together reduce neuronal pain signaling?",
      choices:[
        "Less cAMP raises PKA activity while K⁺ efflux hyperpolarizes, so they cancel",
        "Less PKA, hyperpolarization and less Ca²⁺ entry all reduce pain transmission",
        "Less cAMP activates phosphodiesterase, which further damps pain signalling",
        "K⁺ channel opening depolarizes the neuron into a prolonged refractory state"
      ],
      ans:1,
      exp:"Three converging mechanisms of opioid analgesia: (1) Reduced cAMP (Gi → adenylyl cyclase inhibition) → less PKA → less phosphorylation of HCN channels (reduces Ih current), reduced CREB phosphorylation → reduced c-fos/proenkephalin gene expression in pain neurons → reduced excitability; (2) K⁺ channel opening (Go → GIRK1/2 channels) → K⁺ efflux → hyperpolarization (Vm more negative → farther from threshold → higher stimulus required for AP generation); (3) Ca²⁺ channel inhibition (Go → VGCC inhibition) → reduced presynaptic Ca²⁺ → reduced exocytosis → less substance P and glutamate released at dorsal horn synapses. All three mechanisms converge to suppress ascending nociceptive transmission. K⁺ channel activation always hyperpolarizes (opposite of depolarization)."
    },
    {
      q:"GRK (G protein-coupled receptor kinase) phosphorylation of the μ-opioid receptor leads to β-arrestin recruitment and receptor desensitization. Why does β-arrestin recruitment cause tolerance?",
      choices:[
        "β-arrestin itself activates the receptor, amplifying opioid signalling",
        "β-arrestin blocks Gi coupling and then pulls the receptor off the surface",
        "β-arrestin stimulates adenylyl cyclase, offsetting the Gi-mediated inhibition",
        "Phosphorylation raises morphine affinity, producing paradoxical hypersensitivity"
      ],
      ans:1,
      exp:"β-arrestin dual role in tolerance: (1) Desensitization: β-arrestin (β-arr1/2) binds GRK-phosphorylated GPCR at the same intracellular region that Gi uses for coupling → steric blockade → receptor cannot activate Gi despite agonist being bound → 'uncoupled receptor' = desensitized. (2) Internalization: β-arrestin recruits clathrin and AP2 → receptor endocytosed → surface receptor density decreases → fewer available receptors per unit morphine dose → reduced effect = tolerance. Internalized receptors can be either recycled (resensitization) or degraded in lysosomes (downregulation). Long-term opioid use: balance shifts toward degradation → permanent receptor loss → profound tolerance and dependence. The biased agonist design: Gi-biased agonists activate analgesia (Gi) while minimizing β-arrestin recruitment → reduced tolerance, reduced constipation (GI opioid receptors) and respiratory depression (brainstem opioid receptors)."
    },
    {
      q:"Opioid withdrawal is characterized by hyperalgesia (increased pain sensitivity) and symptoms opposite to opioid effects (diarrhea, anxiety, tachycardia). This is best explained by which mechanism?",
      choices:[
        "Chronic use destroys opioid receptors, abolishing endogenous pain modulation",
        "Compensatory adenylyl cyclase upregulation produces a cAMP surge on withdrawal",
        "Withdrawal activates inflammatory pathways that sensitize peripheral nociceptors",
        "Withdrawal kills GABAergic interneurons, disinhibiting ascending pain pathways"
      ],
      ans:1,
      exp:"cAMP superactivation model of opioid withdrawal (Nestler et al.): Chronic opioid → persistent Gi activation → cAMP suppressed → homeostatic upregulation of adenylyl cyclase, PKA, CREB, and ΔFosB in neurons → these neurons become hyperresponsive to cAMP elevation. Abrupt withdrawal: opioid removed → Gi no longer active → hyperactivated AC runs uninhibited → cAMP surge → PKA hyperactivation → neuronal hyperexcitability. In the locus coeruleus (LC, the main noradrenergic nucleus): opioids suppress LC firing (via K⁺ channel opening); withdrawal → LC hyperactivation → NE storm → sympathomimetic withdrawal signs (tachycardia, hypertension, diaphoresis, anxiety, piloerection). In pain pathways: hyperactivated nociceptive neurons → hyperalgesia. Clonidine (α₂ agonist, mimics opioid-like K⁺ channel opening in LC) treats withdrawal by suppressing the LC NE storm."
    },
    {
      q:"The biased agonist in the clinical trial showed equivalent analgesia with reduced tolerance and reduced side effects (constipation, respiratory depression). This suggests that analgesia is primarily mediated by which signaling arm?",
      choices:[
        "β-arrestin signalling carries analgesia, while Gi signalling carries side effects",
        "Gi/Go signalling carries analgesia, while β-arrestin drives tolerance and side effects",
        "Biased agonists act on a different opioid receptor subtype than morphine does",
        "Gi signalling drives respiratory depression, while β-arrestin carries analgesia"
      ],
      ans:1,
      exp:"Biased agonism proof-of-concept: Classic opioids (morphine, fentanyl) activate both Gi (analgesia) and β-arrestin (tolerance, constipation, respiratory depression). The observation that Gi-biased agonists maintain analgesia while reducing β-arrestin-mediated effects suggests: analgesia = primarily Gi/Go (K⁺ channel, Ca²⁺ channel, cAMP); respiratory depression and constipation = substantially β-arrestin-mediated (through downstream gene expression, internalization, and non-Gi effectors). Oliceridine (TRV130) — FDA-approved in 2020 — is a Gi-biased μ-opioid agonist with reduced respiratory depression. However, subsequent studies have challenged this clean separation: some respiratory depression and constipation remain, and tolerance may involve both Gi and β-arrestin pathways. The biased agonist concept remains therapeutically promising but more complex than initially proposed."
    }
  ]
}

]; // end EXAM2_BB_PASSAGES


const EXAM2_BB_DISCRETES = [
  {
    subj:'biology', id:'e2bb_d_1', type:'discrete', topic:'B/B',
    q:"A patient with chronic kidney disease has serum phosphate = 7.8 mg/dL (elevated) and calcium = 7.2 mg/dL (low). Which hormonal axis explains these findings?",
    choices:[
      "Primary hyperparathyroidism, with PTH excess raising phosphate and lowering calcium",
      "Failing 1α-hydroxylation and phosphate retention, driving secondary hyperparathyroidism",
      "Aldosterone excess, causing renal phosphate retention and urinary calcium wasting",
      "Growth hormone deficiency, impairing bone mineralization and mineral handling"
    ],
    ans:1,
    exp:"CKD mineral-bone disorder (CKD-MBD): (1) Reduced GFR → phosphate retention → hyperphosphatemia; (2) Reduced functional renal mass → less 1α-hydroxylase → less 1,25-(OH)₂D₃ (calcitriol) synthesis → impaired intestinal Ca²⁺ and PO₄³⁻ absorption → hypocalcemia; (3) Hyperphosphatemia + hypocalcemia → PTH secretion (secondary hyperparathyroidism) → PTH acts on bone (resorption) and kidney (minimal effect in CKD). Contrast primary hyperparathyroidism, where PTH is the initiating lesion and produces **high** calcium with **low** phosphate — the opposite pattern to this patient's. Elevated FGF23 (fibroblast growth factor 23, phosphaturic hormone) also contributes by inhibiting 1α-hydroxylase. Treatment: phosphate binders, calcitriol supplementation, calcimimetics (cinacalcet, activates Ca-sensing receptor to suppress PTH secretion)."
  },
  {
    subj:'biochemistry', id:'e2bb_d_2', type:'discrete', topic:'B/B',
    q:"In the polymerase chain reaction (PCR), what is the purpose of the denaturation step, and at what approximate temperature is it performed?",
    choices:[
      "About 95°C, to break the hydrogen bonds and give single-stranded templates",
      "About 60°C, to let the primers base-pair with their complementary sequences",
      "About 72°C, the temperature at which Taq polymerase extends most efficiently",
      "About 37°C, the temperature at which restriction enzymes cut the template"
    ],
    ans:0,
    exp:"PCR three-step cycle: (1) Denaturation (~95°C): thermal energy breaks hydrogen bonds and hydrophobic stacking interactions holding the DNA duplex together → single-stranded templates. 95°C is needed because the G-C base pairs (3 H-bonds) require more energy to denature than A-T (2 H-bonds). (2) Annealing (55-65°C, primer-Tm dependent): primers (short ssDNA oligonucleotides complementary to target sequence flanks) bind their complementary sequences on the ssDNA template by H-bonding; temperature selected to balance specificity (too low = non-specific binding; too high = poor annealing). (3) Extension (72°C): Taq DNA polymerase (thermostable, from Thermus aquaticus) synthesizes new DNA strand from 3' end of primer, reading template 3'→5', synthesizing 5'→3'. Cycle repeats ~30-40 times → exponential amplification."
  },
  {
    subj:'biochemistry', id:'e2bb_d_3', type:'discrete', topic:'B/B',
    q:"During anaerobic glycolysis, lactate dehydrogenase (LDH) converts pyruvate to lactate using NADH. What is the essential physiological function of this reaction in anaerobic conditions?",
    choices:[
      "Exporting lactate to the liver is what sustains the working muscle's own ATP",
      "Regenerating NAD⁺ is what lets glycolysis keep running without oxygen",
      "The pyruvate-to-lactate step itself yields additional ATP for the cell",
      "Accumulating lactate is what signals mitochondria to resume respiration"
    ],
    ans:1,
    exp:"LDH function in anaerobic glycolysis: The critical constraint is NAD⁺ availability. Glycolysis step 6 (glyceraldehyde-3-phosphate dehydrogenase): G3P + NAD⁺ + Pi → 1,3-BPG + NADH. If NADH accumulates (no O₂ for ETC to reoxidize it), NAD⁺ is depleted → step 6 halts → glycolysis stops → no ATP production. LDH: pyruvate + NADH → lactate + NAD⁺. This NADH → NAD⁺ conversion regenerates the oxidized cofactor needed for glycolysis to continue. Net: glycolysis produces 2 ATP/glucose; LDH makes this sustainable anaerobically. The reaction makes no ATP of its own, and exported lactate does feed hepatic gluconeogenesis (the Cori cycle) but that recycling happens elsewhere and later — it is not what keeps the sprinting myocyte's glycolysis going. Lactate is a metabolic product, not a signal that restores respiration — only restored O₂ delivery does that."
  },
  {
    subj:'biology', id:'e2bb_d_4', type:'discrete', topic:'B/B',
    q:"Which statement correctly describes the difference between innate and adaptive immunity in terms of specificity and memory?",
    choices:[
      "Innate receptors are epitope-specific and form memory; adaptive ones do not",
      "Innate receptors are germline-encoded and memoryless; adaptive ones are somatic",
      "Both arms generate equally durable immunological memory after an exposure",
      "Innate responses depend on MHC presentation, whereas adaptive ones do not"
    ],
    ans:1,
    exp:"Innate vs. adaptive immune comparison: Innate: PRRs (pattern recognition receptors) are germline-encoded, recognizing conserved PAMPs (lipopolysaccharide, flagellin, CpG DNA, β-glucan). Broad specificity — detects classes of pathogens. No memory (same response on re-exposure). Rapid (minutes-hours). Effectors: neutrophils, macrophages, NK cells, complement, interferons. Adaptive: BCR/TCR are generated by somatic V(D)J recombination → enormous diversity (~10¹⁵ TCR clonotypes) → specific for individual epitopes. Memory formation: long-lived memory B cells (faster Ab production) and memory T cells (rapid effector response) on re-exposure — basis of vaccine immunity. Slower primary response (days-weeks). Innate immunity activates and instructs adaptive immunity (via DCs, cytokines). It is the adaptive arm, not the innate arm, that depends on MHC presentation to T cells. (Trained innate immunity and NK 'memory-like' cells exist, but they are not equivalent to the antigen-specific memory of B and T cells.)"
  },
  {
    subj:'biochemistry', id:'e2bb_d_5', type:'discrete', topic:'B/B',
    q:"The purine nucleotide AMP can be regenerated by two routes: (1) directly from ADP via myokinase (2 ADP → AMP + ATP), or (2) via de novo purine synthesis. Which route is more energy-efficient for rapid ATP regeneration during muscle contraction?",
    choices:[
      "De novo synthesis, because building new purines maximizes the adenine pool",
      "The myokinase reaction, because it is near-equilibrium and costs no new energy",
      "Neither, because the two routes supply ATP at essentially identical rates",
      "The salvage route from adenine and PRPP, because it bypasses the long pathway"
    ],
    ans:1,
    exp:"Adenylate kinase (myokinase): 2 ADP ⇌ AMP + ATP. This near-equilibrium reaction is extremely fast (cytoplasmic enzyme, no gene expression required) and serves two functions: (1) Regenerates ATP from ADP accumulation during intense exercise; (2) Produces AMP, which allosterically activates AMP-activated protein kinase (AMPK) → activates catabolism, glucose uptake, fatty acid oxidation. De novo purine synthesis: 10 enzymatic steps, consumes 6 ATP equivalents per purine ring built → expensive. Salvage pathway (HGPRT, APRT): recycles hypoxanthine/guanine/adenine + PRPP → IMP/GMP/AMP; more efficient than de novo but slower than myokinase. Lesch-Nyhan syndrome: HGPRT deficiency → cannot salvage hypoxanthine/guanine → overproduction of uric acid (de novo synthesis runs unchecked) → gout, neurological dysfunction (dopamine neurotransmission impaired in basal ganglia)."
  },
  {
    subj:'biology', id:'e2bb_d_6', type:'discrete', topic:'B/B',
    q:"A liver biopsy from a patient with suspected Wilson's disease (ATP7B copper transporter deficiency) shows elevated copper and characteristic histological changes. ATP7B normally functions to:",
    choices:[
      "Import copper from the portal blood into hepatocytes for storage",
      "Load copper onto ceruloplasmin and excrete surplus copper into bile",
      "Reduce Cu²⁺ to Cu⁺ for insertion into mitochondrial cytochrome c oxidase",
      "Shuttle copper out of mitochondria into the cytosol for metalloenzymes"
    ],
    ans:1,
    exp:"Wilson's disease (hepatolenticular degeneration): Autosomal recessive, ATP7B mutation. ATP7B is a P-type ATPase copper transporter in hepatocyte trans-Golgi network. Normal functions: (1) Loads Cu into ceruloplasmin (secreted into blood) — most circulating copper is ceruloplasmin-bound; (2) Excretes excess Cu into bile for elimination. ATP7B deficiency: Cu cannot be incorporated into ceruloplasmin (low serum ceruloplasmin AND low serum total copper) AND Cu cannot be excreted in bile → hepatocyte Cu accumulation → oxidative damage, hepatitis, cirrhosis. Overflow into blood → Cu deposits in cornea (Kayser-Fleischer rings, pathognomonic), basal ganglia/lenticular nucleus (neuropsychiatric), kidneys. Treatment: penicillamine (Cu chelator), zinc (blocks intestinal Cu absorption), liver transplant. Menkes disease: ATP7A deficiency → impaired Cu absorption from intestine → systemic Cu deficiency (kinky hair, neurodegeneration) — opposite phenotype."
  },
  {
    subj:'biology', id:'e2bb_d_7', type:'discrete', topic:'B/B',
    q:"Which statement correctly describes the mechanism of contact inhibition in normal cells and how it is lost in cancer?",
    choices:[
      "Gap junctions pass a diffusible inhibitory signal between neighbouring cells",
      "E-cadherin engagement activates Hippo signalling, sequestering YAP and TAZ",
      "Physical compression of crowded cells activates p53 and arrests the cycle",
      "Crowded cells simply exhaust the growth factors available in the medium"
    ],
    ans:1,
    exp:"Contact inhibition of proliferation (CIP): Normal mechanism: cell density → E-cadherin engagement → mechanical signals → Hippo pathway activation (MST1/2 → LATS1/2 → phosphorylate YAP/TAZ → bind 14-3-3 proteins → cytoplasmic retention → cannot coactivate TEAD transcription factors → CTGF, CYR61, other proliferative genes suppressed). Low density or ECM detachment → YAP/TAZ nuclear → proliferation. Cancer: E-cadherin loss (CDH1 mutation/methylation in lobular breast cancer) → loss of upstream Hippo activation; LATS1/2 mutations → YAP/TAZ constitutively nuclear → uncontrolled proliferation (anchorage-independent growth, loss of contact inhibition). Additionally, receptor tyrosine kinases (EGFR, ErbB2 amplification) can override Hippo via PI3K/Akt/mTOR. Merlin (encoded by NF2) is another upstream Hippo activator, lost in neurofibromatosis type 2. Note that contact inhibition is an active signalling response to adhesion, not passive growth-factor exhaustion, and gap junctions mediate metabolic and electrical coupling rather than this arrest."
  },
  {
    subj:'biochemistry', id:'e2bb_d_8', type:'discrete', topic:'B/B',
    q:"During a sprint, muscle ATP is depleted and creatine phosphate (CP) buffers ATP concentration. The creatine kinase reaction is: CP + ADP ⇌ Creatine + ATP. Which statement about this system is correct?",
    choices:[
      "Stored creatine phosphate can fuel two to three hours of maximal exercise",
      "The reaction is near-equilibrium and buffers ATP for only ~8-10 seconds",
      "Creatine phosphate is made only in the liver and delivered to muscle in blood",
      "The system sustains maximal effort for one to two minutes before glycolysis"
    ],
    ans:1,
    exp:"Phosphagen (immediate) energy system: Creatine phosphate (CP, also called phosphocreatine, PCr): highest energy phosphate buffer in muscle. Creatine kinase reaction: CP + ADP → Cr + ATP (forward reaction during exercise); ATP + Cr → CP + ADP (reverse reaction during recovery). Characteristics: (1) Extremely fast — near-equilibrium, no allosteric regulation needed; (2) Duration: ~8-10 seconds of maximal intensity (sprint start, jump, throw); (3) Capacity: ~20-25 mmol CP/kg wet muscle × ~50 kJ/mol → ~1-1.25 kJ/kg; (4) No oxygen required; (5) Recovery: CP resynthesis requires oxidative phosphorylation → t₁/₂ of CP recovery ~30-90 sec; full resynthesis ~3-5 min rest. Creatine supplementation (creatine monohydrate) increases muscle CP stores ~10-20% → modestly improves high-intensity, short-duration performance. Creatine itself is synthesized in liver and kidney from glycine, arginine and methionine and taken up by muscle, but the phosphorylation to creatine phosphate happens inside the myocyte by creatine kinase."
  },
  {
    subj:'biology', id:'e2bb_d_9', type:'discrete', topic:'B/B',
    q:"Which of the following correctly describes the function of the nuclear pore complex (NPC) in the transport of a newly synthesized mRNA from nucleus to cytoplasm?",
    choices:[
      "Mature mRNA simply diffuses through the open central channel of the pore",
      "Export receptors carry processed mRNA past FG-nucleoporins, then are stripped off",
      "mRNA is packaged into vesicles that bud from and fuse with the nuclear envelope",
      "mRNA is copied to cDNA for export and transcribed again in the cytoplasm"
    ],
    ans:1,
    exp:"mRNA nuclear export: Only properly processed mRNAs are exported (quality control step). The exon junction complex (EJC, deposited at splice junctions) marks properly spliced mRNAs. The TREX (transcription-export) complex binds the 5' cap and recruits NXF1 (TAP)/NXT1 (p15) — the main mRNA export receptor. NXF1 interacts with FG-nucleoporins (phenylalanine-glycine repeat proteins that create a selective filter in the NPC channel). Directionality: TREX loaded in nucleus → mRNP translocates through NPC → Dbp5 RNA helicase (at cytoplasmic face, activated by Gle1+IP6) removes NXF1 from mRNA → NXF1 can no longer interact with nuclear FG-nups → cannot re-enter nucleus → unidirectional export. After export: cap-binding protein eIF4F initiates translation in cytoplasm. Small molecules (<~40 kDa) do diffuse through the pore, but an mRNP is far too large and requires this receptor-mediated, energy-consuming route — and nothing crosses the envelope in vesicles."
  },
  {
    subj:'biochemistry', id:'e2bb_d_10', type:'discrete', topic:'B/B',
    q:"A pregnant woman at 10 weeks gestation has been taking methotrexate (MTX, a dihydrofolate reductase inhibitor) for rheumatoid arthritis. Fetal exposure is a major concern because MTX is teratogenic. Which biological process does MTX most directly impair that makes rapidly dividing fetal cells particularly vulnerable?",
    choices:[
      "It blocks mitochondrial ATP synthesis, on which dividing cells depend most",
      "It depletes tetrahydrofolate, starving thymidylate and purine synthesis",
      "It alkylates fetal DNA directly, creating cross-links that block replication",
      "It blocks intestinal folate absorption, causing maternal folate deficiency"
    ],
    ans:1,
    exp:"MTX mechanism and teratogenicity: MTX competitively inhibits DHFR → DHF cannot be reduced to THF → THF pool depleted. THF is essential as a one-carbon carrier for: (1) dTMP synthesis: thymidylate synthase uses 5,10-methylene-THF → oxidized to DHF → must be recycled by DHFR; (2) De novo purine synthesis: 10-formyl-THF donates formyl groups at steps 3 and 9 of the purine biosynthetic pathway. Without THF: no dTMP, no purines → no DNA synthesis → cell division halts. Rapidly dividing cells (early embryo: 24-36 hour division time; trophoblast; neural tube closure) are most vulnerable. MTX teratogenicity: spontaneous abortion, neural tube defects, craniofacial malformations, limb defects ('aminopterin syndrome'). MTX must be discontinued ≥3 months before conception. Folinic acid (leucovorin, 5-formyl-THF) rescues MTX toxicity by bypassing DHFR."
  },
  {
    subj:'biology', id:'e2bb_d_11', type:'discrete', topic:'B/B',
    q:"Gap junctions allow direct cell-to-cell communication. Which molecules can pass through gap junctions, and which cannot?",
    choices:[
      "Anything cytoplasmic passes, including proteins, nucleic acids and organelles",
      "Molecules below roughly 1,000 Da pass; proteins and nucleic acids do not",
      "Only inorganic ions pass; metabolites and second messengers are excluded",
      "Molecules of any size pass, but only while ATP hydrolysis powers the channel"
    ],
    ans:1,
    exp:"Gap junction structure: Connexin proteins form hemichannels (connexons); two hemichannels from adjacent cells align → gap junction channel (~1.5 nm pore diameter). Size cutoff: ~1,000-1,200 Da. Passed: ions → electrical coupling (cardiac and smooth muscle synchronization); second messengers (IP₃, cAMP, cADP-ribose) → coordinated signaling; metabolites (glucose, glutamate, glutathione). Cannot pass: proteins (MW typically >10,000 Da), DNA/RNA, organelles. Functions: cardiac synchronization (loss of connexin 43 → arrhythmias), lens nutrition (avascular → gap junction metabolite supply), astrocyte networks, cancer (tumor suppressor role — reduced gap junction communication is a cancer hallmark). Connexin mutations: Charcot-Marie-Tooth disease (Cx32), cataracts (Cx46/50), deafness (Cx26/30 — GJB2 mutations, most common genetic deafness). Note that passage is passive, down the concentration gradient: gap junctions are channels, not pumps, and need no ATP."
  },
  {
    subj:'biochemistry', id:'e2bb_d_12', type:'discrete', topic:'B/B',
    q:"In the citric acid cycle, succinyl-CoA synthetase catalyzes: Succinyl-CoA + GDP + Pi → Succinate + CoA + GTP. What type of reaction is this, and why is it significant?",
    choices:[
      "An oxidation — succinyl-CoA loses electrons as it becomes succinate",
      "A substrate-level phosphorylation — a thioester bond drives GDP to GTP",
      "A decarboxylation — CO₂ is removed from the succinyl-CoA backbone",
      "An isomerization — succinyl-CoA is rearranged into a structural isomer"
    ],
    ans:1,
    exp:"Succinyl-CoA synthetase: The thioester bond in succinyl-CoA (similar in energy to ATP's phosphoanhydride bond) is hydrolyzed. The released energy drives phosphorylation of GDP → GTP (or ADP → ATP in cardiac/skeletal muscle, which express different isoforms). This is substrate-level phosphorylation — phosphate transfer occurs directly from substrate to nucleotide without the proton gradient or electron transport chain. Context in TCA: Per acetyl-CoA cycle: 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂. GTP → ATP via nucleoside diphosphate kinase (GTP + ADP → GDP + ATP). Total ATP yield from acetyl-CoA (including ETC): ~10 ATP. The succinyl-CoA synthetase step is analogous to the substrate-level phosphorylations in glycolysis (phosphoglycerate kinase and pyruvate kinase). Carbon count and oxidation state are unchanged here — the two TCA decarboxylations happen upstream (isocitrate dehydrogenase and the α-ketoglutarate dehydrogenase complex), and the cycle's oxidations are the NAD⁺/FAD-linked steps."
  },
  {
    subj:'research', id:'e2bb_d_13', type:'discrete', topic:'B/B',
    q:"A researcher is designing a study to test whether a new anti-inflammatory drug reduces CRP levels in patients with rheumatoid arthritis. She plans to measure CRP at baseline and after 12 weeks of treatment in 40 patients. Which statistical test is most appropriate for comparing baseline to 12-week CRP levels?",
    choices:[
      "Independent-samples t-test, which compares two separate groups of patients",
      "Paired t-test, which compares the same patients at two time points",
      "Chi-square test, which compares proportions in a contingency table",
      "One-way ANOVA, which compares means across three or more groups"
    ],
    ans:1,
    exp:"Paired t-test: appropriate when the same subjects are measured twice (before-after design, crossover trial, matched pairs). Each patient serves as their own control → between-patient variability (which would inflate the denominator in an independent t-test) is eliminated. The test compares the mean of the within-patient differences (d̄) to zero: t = d̄/(sd/√n). More statistically powerful than independent t-test for same sample size because σ_within < σ_between in most biomedical outcomes. Prerequisites: differences should be approximately normally distributed. Alternative: Wilcoxon signed-rank test if differences are not normal (especially with small n). Independent t-test: different groups (not matched). Chi-square: categorical outcomes (not continuous CRP). ANOVA: >2 groups or time points."
  },
  {
    subj:'biology', id:'e2bb_d_14', type:'discrete', topic:'B/B',
    q:"The SRY gene on the Y chromosome directs testicular development. In the absence of SRY (46,XX individuals or 46,XY individuals with SRY deletion), what is the default developmental pathway of the gonad?",
    choices:[
      "The bipotential gonad involutes by apoptosis, leaving no gonadal tissue",
      "The gonad becomes an ovary, as WNT4/RSPO1-β-catenin signalling prevails",
      "Testes still form, because Leydig cells do not depend on SRY at all",
      "The gonad becomes adrenal tissue, which explains adrenal hyperplasia"
    ],
    ans:1,
    exp:"Sex determination: Bipotential gonad → Sertoli cells require SRY → SOX9 activation → testis-determining cascade. Without SRY: WNT4 and RSPO1 stabilize β-catenin in gonadal cells → activates FOXL2 → granulosa cell fate → ovary. SRY actively suppresses WNT4/β-catenin in XY; in XX, SRY absent → default ovarian pathway proceeds. 46,XY complete gonadal dysgenesis (Swyer syndrome): SRY absent or mutated → streak gonads (failed testicular determination) → phenotypic female with infantile Müllerian structures. 46,XX testicular DSD: SRY translocated to X chromosome → SRY positive XX → testis formation → phenotypically male (de la Chapelle syndrome). The 'ovary as default' concept: more nuanced in modern understanding — active ovary-determining factors exist (not purely passive), but the net effect of SRY absence is ovarian development."
  },
  {
    subj:'biology', id:'e2bb_d_15', type:'discrete', topic:'B/B',
    q:"Which correctly describes the function of the enzyme telomerase and its RNA template component (TERC)?",
    choices:[
      "TERC is the mRNA from which the TERT protein subunit is translated",
      "TERC is the 3'-AAUCCC-5' template TERT copies to add TTAGGG repeats",
      "TERC is a ribozyme that cleaves and re-ligates telomeric DNA directly",
      "TERC recruits the shelterin proteins that cap and protect chromosome ends"
    ],
    ans:1,
    exp:"Telomerase structure and function: TERT: reverse transcriptase catalytic subunit (protein, ~130 kDa). TERC (TR/TER): integral RNA component (~450 nt in humans) whose template region reads 3'-AAUCCC-5' (written 5'→3' it is CCCUAA), antiparallel and complementary to the telomere repeat 5'-TTAGGG-3'. Mechanism: (1) TERC aligns with the 3' G-overhang of the telomere; (2) TERT extends that 3' end by copying the 3'-AAUCCC-5' template → adding TTAGGG repeats (RNA→DNA, reverse transcription); (3) Telomerase translocates and repeats; (4) DNA primase + DNA pol alpha extend the complementary C-strand. Telomere extension counteracts end-replication problem (lagging strand cannot replicate the very end → lose ~50-200 bp per division). Active in germline, stem cells, activated lymphocytes. Dyskeratosis congenita: TERC or dyskerin mutations → short telomeres → aplastic anemia, pulmonary fibrosis, cancer predisposition."
  },
  {
    subj:'biology', id:'e2bb_d_16', type:'discrete', topic:'B/B',
    q:"A 6-year-old child has recurrent sinopulmonary infections, absent tonsils, markedly reduced lymph nodes, and undetectable serum IgG, IgA, IgM. Flow cytometry shows absent CD19+ cells but normal CD3+ cells. What is the most likely diagnosis and underlying defect?",
    choices:[
      "DiGeorge syndrome — thymic aplasia from a 22q11 deletion blocks T cell output",
      "Common variable immunodeficiency — B cells are present but fail to make antibody",
      "X-linked agammaglobulinemia — a BTK mutation arrests B cells at the pro-B stage",
      "Severe combined immunodeficiency — both B and T cell compartments are absent"
    ],
    ans:2,
    exp:"XLA (Bruton's agammaglobulinemia): X-linked, males. BTK (Bruton's tyrosine kinase) mutation: BTK is essential for signaling through the pre-B cell receptor (pre-BCR), which is required for differentiation from pro-B to pre-B to immature B cell. Without BTK signaling: B cell development arrested at pro-B/large pre-B cell stage → no circulating B cells (CD19-). T cells: completely normal (BTK not required for T cell development). Clinical: infections begin at 6 months (maternal IgG half-life ~23 days; near-zero maternal IgG at 3-6 months). Recurrent infections with encapsulated organisms (S. pneumoniae, H. influenzae, N. meningitidis, Giardia). Absent/rudimentary tonsils and lymph nodes (no B cell follicles). Treatment: monthly IVIG infusions. Differentiate from CVID (older onset, B cells present) and SCID (T cells also absent)."
  },
  {
    subj:'biochemistry', id:'e2bb_d_17', type:'discrete', topic:'B/B',
    q:"In the liver, the enzyme glucose-6-phosphatase removes the phosphate from glucose-6-phosphate to release free glucose into the blood. Which metabolic processes depend on this enzyme, and why is it absent in muscle?",
    choices:[
      "It is a glycolytic enzyme in liver, and muscle substitutes a different one",
      "It ends both glycogenolysis and gluconeogenesis; muscle keeps its glucose",
      "It serves glycogenolysis only, since gluconeogenesis ends by another route",
      "It is present in every tissue but is regulated differently in muscle cells"
    ],
    ans:1,
    exp:"Tissue-specific expression of glucose-6-phosphatase: Present: liver, kidney cortex, small intestine. Absent: muscle, brain, most other tissues. Function: G6P → glucose + Pi (final step of glycogenolysis and gluconeogenesis → releases free glucose into blood → maintains blood glucose). Why absent in muscle: Muscle glycogen is used exclusively for local energy needs (ATP for contraction). If muscle expressed G6Pase, glucose would be released into blood during glycogenolysis rather than entering glycolysis for ATP generation. The 'glucose trap' concept: all cells take up glucose and phosphorylate it (glucose → G6P via hexokinase/glucokinase) → G6P cannot exit cells (no transporter for phosphorylated glucose) → unless dephosphorylated by G6Pase → only liver/kidney can release glucose back to blood. Von Gierke disease (G6Pase deficiency): glycogen accumulates in liver and kidney → severe fasting hypoglycemia, lactic acidosis, hyperuricemia, hyperlipidemia."
  }
]; // end EXAM2_BB_DISCRETES



const EXAM2_BB_EXTRA = [
  {
    subj:'biology', id:'e2bb_d_18', type:'discrete', topic:'B/B',
    q:"During embryonic development, Hox genes specify positional identity along the anterior-posterior axis. Which statement correctly describes Hox gene organization and colinearity?",
    choices:[
      "They are scattered through the genome, so position says nothing about expression",
      "They sit in clusters where 3' genes act earlier and more anteriorly than 5' genes",
      "They sit in four clusters that are expressed identically and fully redundantly",
      "They encode structural proteins that are assembled into the vertebral column"
    ],
    ans:1,
    exp:"Hox gene colinearity (temporal and spatial): Homeotic genes were defined in Drosophila by Lewis, Nüsslein-Volhard and Wieschaus (Nobel Prize 1995). Vertebrate Hox clusters: 4 clusters (HoxA-D) on 4 chromosomes, each with 9-11 genes numbered 1-13. Colinearity rule: 3' genes (Hox1-4) → expressed in anterior structures (hindbrain, cervical vertebrae); 5' genes (Hox9-13) → expressed in posterior structures (lumbar/sacral vertebrae, limb regions). Earlier expression temporally corresponds to 3' genes. Mechanistic basis: chromatin opening progresses along the cluster from 3'→5', correlating with timing and AP position. Clinical: HOXA13 mutations → hand-foot-genital syndrome; HOXD13 mutations → synpolydactyly. Hox genes encode homeodomain transcription factors, not structural proteins. Loss of Hox function typically produces an **anterior** homeotic transformation — a segment takes on the identity of a more anterior one (loss of the Hox10 paralogs, for example, gives lumbar vertebrae ribs like thoracic vertebrae) — while ectopic or gain-of-function expression shifts identity posteriorly."
  }
];


function buildExam2BB_Section() {
  const questions = [];
  const p = EXAM2_BB_PASSAGES;
  const d = EXAM2_BB_DISCRETES;
  const e = EXAM2_BB_EXTRA;

  p[0].questions.forEach(q => questions.push({...q, passageText:p[0].passage, passageTitle:p[0].title, passageId:p[0].id}));
  p[1].questions.forEach(q => questions.push({...q, passageText:p[1].passage, passageTitle:p[1].title, passageId:p[1].id}));
  questions.push(d[0], d[1], d[2]);

  p[2].questions.forEach(q => questions.push({...q, passageText:p[2].passage, passageTitle:p[2].title, passageId:p[2].id}));
  p[3].questions.forEach(q => questions.push({...q, passageText:p[3].passage, passageTitle:p[3].title, passageId:p[3].id}));
  p[4].questions.forEach(q => questions.push({...q, passageText:p[4].passage, passageTitle:p[4].title, passageId:p[4].id}));
  questions.push(d[3], d[4], d[5], d[6], d[7]);

  p[5].questions.forEach(q => questions.push({...q, passageText:p[5].passage, passageTitle:p[5].title, passageId:p[5].id}));
  p[6].questions.forEach(q => questions.push({...q, passageText:p[6].passage, passageTitle:p[6].title, passageId:p[6].id}));
  p[7].questions.forEach(q => questions.push({...q, passageText:p[7].passage, passageTitle:p[7].title, passageId:p[7].id}));
  questions.push(d[8], d[9], d[10], d[11], d[12]);

  p[8].questions.forEach(q => questions.push({...q, passageText:p[8].passage, passageTitle:p[8].title, passageId:p[8].id}));
  p[9].questions.forEach(q => questions.push({...q, passageText:p[9].passage, passageTitle:p[9].title, passageId:p[9].id}));
  questions.push(d[13], d[14], d[15], d[16], e[0]);

  return questions;
}
const EXAM2_BB_QUESTIONS = buildExam2BB_Section();
