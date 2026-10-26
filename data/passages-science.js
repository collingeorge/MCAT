// Science passages for Passage mode
const PASSAGES = [

// ══════════════════════════════════════════════════════════════
// PASSAGE 1: AMINO ACIDS & PROTEINS
// Topic: PKU, phenylalanine metabolism, protein structure
// ══════════════════════════════════════════════════════════════
{
  id:'p_aa_1',
  topic:'Amino Acids & Proteins',
  title:'Phenylketonuria and Aromatic Amino Acid Metabolism',
  passage:`A 3-week-old infant is referred for evaluation after newborn screening returns an elevated phenylalanine level of 28 mg/dL (reference <2 mg/dL). The infant is feeding normally and appears clinically well. Genetic testing confirms compound heterozygous mutations in the PAH gene encoding phenylalanine hydroxylase (PAH), which normally catalyzes the hydroxylation of phenylalanine to tyrosine using tetrahydrobiopterin (BH4) as a cofactor. Without treatment, excess phenylalanine is transaminated to phenylpyruvate, which accumulates in the CNS. The infant is started on a phenylalanine-restricted diet with tyrosine supplementation.

PAH requires BH4 as an electron donor. A minority of PKU cases result not from PAH mutations but from defects in BH4 synthesis or regeneration. These patients do not respond to phenylalanine restriction alone because BH4 is also required by tyrosine hydroxylase and tryptophan hydroxylase.`,
  questions:[
    {
      q:"The attending physician explains that tyrosine must be supplemented in this infant's diet. Which of the following best explains why tyrosine becomes conditionally essential in PKU?",
      choices:[
        "Tyrosine is normally synthesized from tryptophan, which is also depleted in PKU",
        "PAH deficiency blocks the conversion of phenylalanine to tyrosine",
        "The restricted diet removes all dietary protein, including tyrosine",
        "Excess phenylalanine accelerates the breakdown of tyrosine in the liver"
      ],
      ans:1,
      exp:"Tyrosine is nonessential only because PAH makes it from phenylalanine; with PAH deficient (and phenylalanine intake restricted), the body's only source of tyrosine is the diet, so it becomes **conditionally essential**. Tyrosine is not made from tryptophan, which is the precursor of serotonin and niacin."
    },
    {
      q:"A patient with BH4 synthesis deficiency is placed on phenylalanine restriction but continues to deteriorate neurologically despite normal phenylalanine levels. Which neurotransmitters are most likely deficient in this patient?",
      choices:[
        "Glutamate, GABA, and glycine",
        "Acetylcholine, histamine, and GABA",
        "Dopamine, norepinephrine, and serotonin",
        "Glycine, aspartate, and acetylcholine"
      ],
      ans:2,
      exp:"BH4 is the cofactor for **tyrosine hydroxylase** (tyrosine → L-DOPA, rate-limiting for dopamine, norepinephrine and epinephrine) and **tryptophan hydroxylase** (tryptophan → 5-HTP, rate-limiting for serotonin), so BH4 deficiency depletes catecholamines and serotonin even when phenylalanine is controlled. Amino acid transmitters, acetylcholine and histamine are made without BH4-dependent hydroxylases."
    },
    {
      q:"Phenylpyruvate accumulates in untreated PKU via transamination of phenylalanine. Which enzyme class catalyzes this reaction?",
      choices:[
        "Oxidoreductase",
        "Hydrolase",
        "Transferase",
        "Lyase"
      ],
      ans:2,
      exp:"Transamination moves an amino group from phenylalanine to α-ketoglutarate, giving phenylpyruvate and glutamate; this group-transfer reaction is catalyzed by a PLP (vitamin B6)-dependent aminotransferase, a **transferase**. Oxidoreductase is tempting because PAH itself (a hydroxylase) is one, but no electrons are transferred in transamination."
    },
    {
      q:"Phenylalanine is classified as an aromatic, nonpolar amino acid. Which of the following amino acids shares the property of containing an aromatic ring and also serves as a direct precursor to a monoamine neurotransmitter?",
      choices:[
        "Leucine",
        "Glutamate",
        "Tryptophan",
        "Methionine"
      ],
      ans:2,
      exp:"**Tryptophan** has an aromatic indole ring and is hydroxylated by tryptophan hydroxylase to 5-HTP, then decarboxylated to serotonin (5-HT), a monoamine. Glutamate is a neurotransmitter precursor (of GABA), but it is not aromatic and GABA is an amino acid transmitter, not a monoamine; leucine and methionine are aliphatic."
    },
    {
      q:"On SDS-PAGE run with 2-mercaptoethanol, PAH migrates as a single band at approximately 52 kDa, the size of one subunit. A researcher repeats the gel without 2-mercaptoethanol. Under which circumstance would the band pattern change?",
      choices:[
        "If the PAH subunits were joined by interchain disulfide bonds",
        "If the PAH subunits were held together only by hydrophobic contacts",
        "If 2-mercaptoethanol normally hydrolyzed peptide bonds within PAH",
        "If SDS could bind PAH only in the presence of 2-mercaptoethanol"
      ],
      ans:0,
      exp:"2-Mercaptoethanol reduces **disulfide bonds**; SDS alone already disrupts noncovalent subunit contacts. Only subunits linked by interchain disulfides would run as a higher-MW band without 2-ME. Native PAH is a homotetramer held together noncovalently, so it runs at ~52 kDa with or without 2-ME; 2-ME does not cleave peptide bonds."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// PASSAGE 2: ENZYMOLOGY
// Topic: Enzyme kinetics, inhibition, regulation
// ══════════════════════════════════════════════════════════════
{
  id:'p_enz_1',
  topic:'Enzymology',
  title:'Methotrexate, Dihydrofolate Reductase, and Enzyme Inhibition',
  passage:`Methotrexate (MTX) is a chemotherapeutic and immunosuppressive agent that functions as a structural analog of dihydrofolate (DHF). It binds dihydrofolate reductase (DHFR) with approximately 1000-fold greater affinity than the natural substrate DHF. DHFR catalyzes the NADPH-dependent reduction of DHF to tetrahydrofolate (THF), which is required for synthesis of thymidylate and purines. Inhibition of DHFR depletes THF, halting DNA synthesis in rapidly dividing cells.

In kinetic studies, addition of MTX increases the apparent Km of DHFR for DHF from 5 μM to 120 μM while Vmax remains unchanged at high DHF concentrations. Leucovorin (folinic acid), a pre-reduced folate that bypasses DHFR, is administered as a "rescue" agent after high-dose MTX therapy to restore THF pools in normal tissues without reactivating the inhibited enzyme.`,
  questions:[
    {
      q:"Based on the kinetic data described, methotrexate acts as which type of inhibitor of DHFR?",
      choices:[
        "Noncompetitive inhibitor: Vmax decreases, Km unchanged",
        "Uncompetitive inhibitor: Vmax and Km both decrease",
        "Competitive inhibitor: Vmax unchanged, apparent Km increases",
        "Mixed inhibitor: Vmax decreases, apparent Km increases"
      ],
      ans:2,
      exp:"An unchanged Vmax with a higher apparent Km (5 → 120 μM) is the signature of **competitive inhibition**: the inhibitor occupies the active site, so more substrate is needed for half-maximal velocity, but enough substrate outcompetes it. A mixed inhibitor would also raise Km but would lower Vmax, which the data rule out."
    },
    {
      q:"On a Lineweaver-Burk (double-reciprocal) plot, how would the addition of methotrexate change the appearance of the DHFR kinetic line?",
      choices:[
        "The lines are parallel, with the inhibited line shifted upward",
        "The lines meet on the y-axis, with the inhibited line steeper",
        "The lines meet on the x-axis, with the inhibited line steeper",
        "The lines meet on the y-axis, with the inhibited line flatter"
      ],
      ans:1,
      exp:"Competitive inhibition leaves 1/Vmax (the y-intercept) unchanged but raises the slope (Km/Vmax), so the lines **intersect on the y-axis** and the x-intercept (−1/Km) moves toward zero. Intersection on the x-axis is the pattern for pure noncompetitive inhibition (same Km, lower Vmax); parallel lines indicate uncompetitive inhibition."
    },
    {
      q:"Leucovorin rescue is administered 24 hours after high-dose MTX. It restores THF pools in normal tissues but does not reverse MTX inhibition of DHFR. Which of the following best explains why leucovorin is effective despite not displacing MTX from DHFR?",
      choices:[
        "It competes MTX off the DHFR active site and reactivates the enzyme",
        "It is a reduced folate that supplies THF downstream of the blocked step",
        "It induces an MTX-resistant DHFR isoform in normal tissues",
        "It binds MTX in the plasma and lowers its free concentration"
      ],
      ans:1,
      exp:"Leucovorin (5-formyl-THF) is already fully reduced, so it is converted to active THF cofactors **without needing DHFR**, restoring one-carbon donors for thymidylate and purine synthesis. Displacing MTX is not plausible: MTX binds DHFR far more tightly than folates, and the stem states the inhibition is not reversed."
    },
    {
      q:"DHFR requires NADPH as a cofactor. NADPH is primarily produced by which metabolic pathway, and at which enzyme is this pathway regulated?",
      choices:[
        "Glycolysis; phosphofructokinase-1 (PFK-1)",
        "TCA cycle; mitochondrial isocitrate dehydrogenase",
        "Pentose phosphate pathway; G6P dehydrogenase (G6PD)",
        "Beta-oxidation; carnitine palmitoyltransferase I (CPT-I)"
      ],
      ans:2,
      exp:"The oxidative **pentose phosphate pathway** is the main source of cytosolic NADPH, and its rate-limiting enzyme is **G6PD** (stimulated by NADP⁺, inhibited by NADPH). The mitochondrial TCA-cycle isocitrate dehydrogenase produces NADH, not NADPH; G6PD deficiency explains oxidant-induced hemolysis because red cells depend on this pathway for NADPH."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// PASSAGE 3: METABOLISM & BIOENERGETICS
// Topic: TCA, ETC, substrate-level vs oxidative phosphorylation
// ══════════════════════════════════════════════════════════════
{
  id:'p_met_1',
  topic:'Metabolism & Bioenergetics',
  title:'Cyanide Poisoning and Mitochondrial Energy Production',
  passage:`A 34-year-old laboratory worker presents to the emergency department with sudden-onset headache, confusion, seizures, and lactic acidosis (serum lactate 18 mmol/L, reference <2). Coworkers report a chemical spill involving hydrogen cyanide (HCN) approximately 30 minutes prior. Cyanide binds with high affinity to the ferric (Fe³⁺) form of cytochrome a₃ in Complex IV of the electron transport chain, preventing electron transfer to molecular oxygen.

Treatment is initiated with hydroxocobalamin, which binds cyanide to form cyanocobalamin (vitamin B12), and sodium thiosulfate. The patient is also given 100% oxygen. Despite complex IV being completely inhibited, the patient's cardiac myocytes continue to produce small amounts of ATP for approximately 12 minutes after cyanide exposure.`,
  questions:[
    {
      q:"Which of the following best explains the severe lactic acidosis observed in this patient?",
      choices:[
        "Cyanide directly activates lactate dehydrogenase in the cytosol",
        "Halted electron transport raises NADH/NAD⁺, so pyruvate is reduced to lactate",
        "Cyanide directly inhibits pyruvate dehydrogenase in the mitochondria",
        "Cyanide binds hemoglobin and prevents oxygen delivery to tissues"
      ],
      ans:1,
      exp:"With Complex IV blocked, NADH cannot be reoxidized by the ETC, so NADH accumulates and NAD⁺ falls; **lactate dehydrogenase** reduces pyruvate to lactate to regenerate the NAD⁺ that glycolysis needs. Cyanide does not impair O₂ delivery by hemoglobin; it causes histotoxic hypoxia, in which tissues cannot use the oxygen delivered (venous O₂ stays high)."
    },
    {
      q:"The passage states cardiac myocytes continue producing ATP for ~12 minutes after complete Complex IV inhibition. Which mechanism accounts for this continued ATP production?",
      choices:[
        "Oxidative phosphorylation using O₂ remaining in the matrix",
        "Substrate-level phosphorylation in glycolysis, with NAD⁺ restored by LDH",
        "Import of ATP from neighboring cells through gap junctions",
        "Reverse electron flow through Complex II that rebuilds the H⁺ gradient"
      ],
      ans:1,
      exp:"**Substrate-level phosphorylation** (phosphoglycerate kinase and pyruvate kinase in glycolysis) does not need the ETC, and it can continue as long as lactate dehydrogenase regenerates NAD⁺. Oxidative phosphorylation stops as soon as Complex IV is blocked, because electrons can no longer reach O₂ and the proton gradient collapses, regardless of how much O₂ is present."
    },
    {
      q:"A researcher measures the P/O ratio (ATP produced per oxygen atom consumed) in isolated mitochondria oxidizing an NADH-linked substrate, before and after partial Complex I inhibition with rotenone. Which result would be expected?",
      choices:[
        "It increases, because less O₂ is consumed per ATP made",
        "It is unchanged, because each electron pair that gets through pumps the same H⁺",
        "It decreases, because inhibited Complex I pumps fewer H⁺ per electron pair",
        "It increases, because electrons are rerouted through Complex II as FADH₂"
      ],
      ans:1,
      exp:"P/O is a **ratio**: partial inhibition lowers the rate of electron flow, so O₂ consumption and ATP synthesis both fall, but every electron pair that still passes through Complexes I, III and IV pumps ~10 H⁺, so ATP per O stays ~2.5. It is tempting to think fewer protons are pumped per pair, but inhibition removes whole electron pairs rather than weakening the pumping by each one; the ratio would fall only with uncoupling or more entry at Complex II (P/O ~1.5)."
    },
    {
      q:"Which TCA cycle enzyme is directly inhibited by the accumulated NADH that results from ETC blockade, and what is the consequence for the cycle?",
      choices:[
        "Citrate synthase; oxaloacetate accumulates as acetyl-CoA is depleted",
        "Isocitrate dehydrogenase; the cycle slows and upstream intermediates build up",
        "Fumarase; fumarate accumulates and disrupts the urea cycle",
        "Succinyl-CoA synthetase; GTP production stops but the cycle runs normally"
      ],
      ans:1,
      exp:"**Isocitrate dehydrogenase**, the rate-limiting TCA enzyme, is inhibited by NADH (and ATP) and activated by ADP and Ca²⁺, so a high NADH/NAD⁺ ratio slows the cycle and citrate/isocitrate back up (α-ketoglutarate dehydrogenase is also inhibited). Oxaloacetate does not accumulate: high NADH shifts the malate dehydrogenase equilibrium toward malate, depleting oxaloacetate."
    },
    {
      q:"Hydroxocobalamin (a form of vitamin B12) is used as an antidote because it has a cobalt center that binds cyanide with high affinity. Which of the following statements about vitamin B12 is correct in the context of normal metabolism?",
      choices:[
        "It is a cofactor for methionine synthase and methylmalonyl-CoA mutase",
        "It is a cofactor for pyruvate dehydrogenase and α-KG dehydrogenase",
        "Its deficiency causes pellagra by impairing niacin synthesis",
        "It carries electrons from Complex I to Complex III in the ETC"
      ],
      ans:0,
      exp:"B12 is the cofactor for **methionine synthase** (homocysteine → methionine, with folate) and **methylmalonyl-CoA mutase** (methylmalonyl-CoA → succinyl-CoA), so deficiency raises both homocysteine and methylmalonic acid and causes megaloblastic anemia and subacute combined degeneration. The dehydrogenase complexes use thiamine (B1), pellagra is niacin (B3) deficiency, and coenzyme Q carries electrons from Complex I to III."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// PASSAGE 4: NUCLEIC ACIDS & MOLECULAR BIOLOGY
// Topic: DNA replication, repair, mutations, gene regulation
// ══════════════════════════════════════════════════════════════
{
  id:'p_nuc_1',
  topic:'Nucleic Acids & Molecular Biology',
  title:'Lynch Syndrome and DNA Mismatch Repair',
  passage:`A 38-year-old woman is diagnosed with colorectal cancer. Her family history reveals that her father died of colorectal cancer at age 42 and her paternal aunt had endometrial cancer at age 45. Genetic testing identifies a germline pathogenic variant in the MLH1 gene. The patient is diagnosed with Lynch syndrome (hereditary nonpolyposis colorectal cancer, HNPCC), an autosomal dominant condition caused by heterozygous loss-of-function mutations in mismatch repair (MMR) genes including MLH1, MSH2, MSH6, and PMS2.

Immunohistochemistry of the tumor shows absent MLH1 and PMS2 protein expression, consistent with loss of the wild-type allele in the tumor (two-hit hypothesis). The tumor displays microsatellite instability (MSI-high), a molecular phenotype resulting from defective MMR. MMR normally corrects single base-pair mismatches and small insertions/deletions that arise during DNA replication (S phase); it acts on newly replicated DNA during S phase and into G2. MLH1 promoter hypermethylation accounts for the majority of sporadic (non-hereditary) MSI-high colorectal cancers.`,
  questions:[
    {
      q:"Mismatch repair corrects errors introduced during DNA replication. In which phase of the cell cycle does MMR primarily operate, and how does the system distinguish the newly synthesized (error-containing) strand from the template strand?",
      choices:[
        "S phase; the new strand is recognized by its higher GC content",
        "S phase; in bacteria, the new strand is the transiently unmethylated one",
        "G1 phase; the template strand is recognized by its bound nucleosomes",
        "G2 phase; the template strand is recognized by its unmethylated GATC sites"
      ],
      ans:1,
      exp:"MMR is coupled to replication, acting on new DNA in **S phase** (continuing into G2). In E. coli, Dam methylase marks GATC adenines on the parental strand, so for a short time only the template is methylated; MutH nicks the **unmethylated daughter strand** for repair. It is the template, not the new strand, that carries the methyl marks; in humans, nicks and Okazaki fragment ends mark the new strand instead."
    },
    {
      q:"The tumor shows loss of both MLH1 and PMS2 protein on immunohistochemistry, but the patient only has a germline MLH1 mutation. Why is PMS2 also absent?",
      choices:[
        "PMS2 lies next to MLH1 on the same chromosome and is co-deleted",
        "PMS2 forms a heterodimer with MLH1 and is degraded without it",
        "The tumor acquired a somatic PMS2 mutation as its second hit",
        "MLH1 protein is the transcription factor that drives PMS2 expression"
      ],
      ans:1,
      exp:"MLH1 and PMS2 form the **MutLα heterodimer**; MLH1 is the obligate partner, so PMS2 is unstable and degraded by the proteasome when MLH1 is lost. A separate somatic PMS2 hit is unnecessary to explain the pattern, and isolated PMS2 loss (with MLH1 retained) is what points to a PMS2 mutation."
    },
    {
      q:"In an MSI-high tumor, a single-nucleotide deletion within a microsatellite in a tumor suppressor gene alters every downstream codon and creates a premature stop codon several codons later. How is this mutation best classified?",
      choices:[
        "Missense mutation that changes one amino acid",
        "Nonsense mutation caused by a single base substitution",
        "Frameshift mutation that creates a downstream stop codon",
        "In-frame deletion that removes one amino acid"
      ],
      ans:2,
      exp:"Deleting a number of nucleotides that is not a multiple of three shifts the reading frame, so every downstream codon changes and a stop codon is soon encountered: a **frameshift** producing a truncated protein. A primary nonsense mutation is a single base substitution that directly creates a stop codon; an in-frame deletion requires loss of three nucleotides."
    },
    {
      q:"MLH1 promoter hypermethylation causes the majority of sporadic MSI-high colorectal cancers. DNA methylation at CpG islands in promoters silences gene expression by which mechanism?",
      choices:[
        "Methylated DNA directs cleavage of MLH1 mRNA, blocking translation",
        "Methyl-CpG–binding proteins recruit histone deacetylases that compact chromatin",
        "Methylation of adenine in GATC sites blocks RNA polymerase binding",
        "Promoter methylation causes splicing to a nonfunctional MLH1 isoform"
      ],
      ans:1,
      exp:"5-Methylcytosine at CpG islands is bound by **methyl-CpG–binding proteins**, which recruit **HDACs**; deacetylated lysines are positively charged and bind DNA tightly, forming silent heterochromatin that excludes the transcription machinery. Adenine methylation at GATC is the bacterial strand-marking system, not the mechanism of promoter silencing in human cells."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// PASSAGE 5: CARBOHYDRATES & LIPIDS
// Topic: Lipid transport, ketogenesis, metabolic state
// ══════════════════════════════════════════════════════════════
{
  id:'p_lip_1',
  topic:'Carbohydrates & Lipids',
  title:'Diabetic Ketoacidosis: Lipid Metabolism and Acid-Base Physiology',
  passage:`A 19-year-old man with type 1 diabetes mellitus presents with a 2-day history of polyuria, polydipsia, nausea, and vomiting. He ran out of insulin 3 days ago. Vital signs: HR 118, BP 94/60, RR 28 (Kussmaul respirations). Labs: glucose 620 mg/dL, pH 7.08, bicarbonate 6 mEq/L, anion gap 32, beta-hydroxybutyrate 8.4 mmol/L (reference <0.5), insulin undetectable, glucagon markedly elevated.

In the absence of insulin, adipose tissue lipoprotein lipase is suppressed and hormone-sensitive lipase (HSL) is activated, releasing free fatty acids (FFAs) into the circulation. FFAs are taken up by the liver, where they undergo beta-oxidation generating excess acetyl-CoA. Because oxaloacetate is depleted by gluconeogenesis, acetyl-CoA cannot enter the TCA cycle and is diverted to ketogenesis via HMG-CoA in the mitochondria.`,
  questions:[
    {
      q:"The passage states that oxaloacetate depletion forces acetyl-CoA into ketogenesis. Why is oxaloacetate depleted during the fasting/diabetic state?",
      choices:[
        "It is consumed by the TCA cycle faster than malate can regenerate it",
        "It is drawn off for gluconeogenesis, where PEPCK converts it to PEP",
        "Without insulin, pyruvate carboxylase can no longer synthesize it",
        "Glucagon directly inhibits malate dehydrogenase, blocking its formation"
      ],
      ans:1,
      exp:"Glucagon drives hepatic **gluconeogenesis**, which pulls oxaloacetate out of the TCA cycle (exported as malate and converted to PEP by **PEPCK**), and the high NADH/NAD⁺ ratio from β-oxidation further shifts oxaloacetate to malate. With little oxaloacetate for citrate synthase, acetyl-CoA goes to HMG-CoA and ketone bodies. Pyruvate carboxylase is not insulin-dependent; it is actually activated by the abundant acetyl-CoA."
    },
    {
      q:"Beta-hydroxybutyrate is the predominant ketone body in severe DKA (BHB:acetoacetate ratio up to ~10:1, vs ~1:1 normally). Which of the following best explains this shift?",
      choices:[
        "Acetoacetate is preferentially excreted in the urine, leaving BHB behind",
        "A high NADH/NAD⁺ ratio drives the reduction of acetoacetate to BHB",
        "Glucagon induces a separate BHB synthesis pathway in the liver",
        "Acidosis directly activates BHB dehydrogenase by protonating it"
      ],
      ans:1,
      exp:"β-Hydroxybutyrate dehydrogenase catalyzes acetoacetate + NADH ⇌ BHB + NAD⁺; massive β-oxidation raises hepatic **NADH/NAD⁺**, pushing the equilibrium toward BHB. Clinically, nitroprusside urine tests detect acetoacetate (and acetone) but not BHB, so they underestimate ketosis in DKA and can paradoxically rise during treatment as BHB is reoxidized to acetoacetate."
    },
    {
      q:"Lipoprotein lipase (LPL) on capillary endothelium is induced by insulin and is required for triglyceride hydrolysis from chylomicrons and VLDL. Which apolipoprotein serves as the required cofactor that activates LPL?",
      choices:[
        "ApoB-100",
        "ApoE",
        "ApoC-II",
        "ApoA-I"
      ],
      ans:2,
      exp:"**ApoC-II** on chylomicrons and VLDL activates LPL; its deficiency (like LPL deficiency) causes familial hyperchylomicronemia (type I). ApoE is tempting because it is also on chylomicrons, but it mediates hepatic uptake of remnants; ApoB-100 binds the LDL receptor and ApoA-I activates LCAT."
    },
    {
      q:"The patient's respiratory rate is 28 with deep, labored breaths (Kussmaul respirations). This is a compensatory response to metabolic acidosis. Which of the following correctly describes the mechanism?",
      choices:[
        "Acidosis triggers aldosterone release, which stimulates ventilation",
        "Chemoreceptors sense low pH and drive hyperventilation that lowers PCO₂",
        "Hyperventilation raises O₂ delivery, speeding ketone body oxidation",
        "Deep breathing increases venous return, diluting the acidic blood"
      ],
      ans:1,
      exp:"Low arterial pH stimulates mainly the **peripheral chemoreceptors** (carotid bodies), with central chemoreceptors following, and the resulting hyperventilation blows off CO₂, shifting CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ to the left and raising pH. Winter's formula gives the expected PaCO₂: 1.5 × 6 + 8 = 17 ± 2 mmHg. This compensation is partial and is not driven by aldosterone, which acts on renal Na⁺/K⁺ handling."
    },
    {
      q:"As this patient is treated with insulin and IV fluids, his glucose begins to fall and ketone bodies are cleared. Ketone bodies are oxidized in peripheral tissues via ketolysis. Which of the following tissues CANNOT perform ketolysis and why?",
      choices:[
        "Cardiac muscle, because it lacks enough mitochondria for ketone oxidation",
        "Skeletal muscle, because it lacks transporters for ketone body uptake",
        "The liver, because it lacks the CoA transferase (SCOT) that activates acetoacetate",
        "The brain, because the blood–brain barrier blocks ketone body entry"
      ],
      ans:2,
      exp:"Ketolysis requires **succinyl-CoA:3-oxoacid CoA transferase (SCOT/thiophorase)**, which converts acetoacetate to acetoacetyl-CoA for thiolase cleavage to acetyl-CoA; the liver lacks SCOT, so it exports ketones instead of burning them. The brain is the tempting distractor, but ketones cross the blood–brain barrier via monocarboxylate transporters, and the brain uses them heavily in prolonged fasting."
    }
  ]
}

]; // end PASSAGES

// ══════════════════════════════════════════════════════════
// BIOLOGY & GEN CHEM PASSAGE DATA
// ══════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// BIOLOGY PASSAGES — 5 passages, 21 questions
// ═══════════════════════════════════════════════════════════════════

const BIO_PASSAGES = [

// ══════════════════════════════════════════════════
// PASSAGE B1: Cardiovascular & Respiratory Systems
// ══════════════════════════════════════════════════
{
  id:'p_bio_1',
  topic:'Cardiovascular & Respiratory Systems',
  title:'High-Altitude Acclimatization and Oxygen Transport',
  passage:`A 28-year-old mountaineer ascends to 5,400 meters over 10 days. At baseline (sea level), her hemoglobin is 13.8 g/dL, hematocrit 41%, SpO2 99%, and resting respiratory rate 14 breaths/min. At altitude, barometric pressure falls to approximately 380 mmHg (half of sea level), reducing the partial pressure of inspired oxygen (PiO2) proportionally.

Within hours of arrival, her respiratory rate increases to 22 breaths/min and arterial PCO2 drops from 40 to 28 mmHg, raising arterial pH from 7.40 to 7.52. Over 10 days, her kidneys excrete bicarbonate, her reticulocyte count rises, erythropoietin (EPO) levels peak at day 3, and red blood cell 2,3-BPG concentrations increase by 30%. By day 10, her hemoglobin has risen to 16.2 g/dL and SpO2 stabilized at 85%.

Fetal hemoglobin (HbF) binds 2,3-BPG less avidly than adult hemoglobin (HbA) because its gamma subunits have a neutral serine at position 143 in place of the positively charged histidine (His-143) that helps coordinate 2,3-BPG in beta subunits.`,
  questions:[
    {
      q:"The mountaineer's respiratory rate increases acutely at altitude. Which chemoreceptors primarily drive this hyperventilation response to hypoxia?",
      choices:[
        "Central chemoreceptors in the medulla, which sense falling PaO₂",
        "Peripheral chemoreceptors in the carotid bodies, which sense falling PaO₂",
        "Pulmonary stretch receptors, which sense reduced lung inflation",
        "Central chemoreceptors in the medulla, which sense falling PaCO₂"
      ],
      ans:1,
      exp:"The **carotid bodies** (and, less so, aortic bodies) are the only chemoreceptors that respond directly to low PaO₂, firing strongly once PaO₂ drops below ~60 mmHg. Central medullary chemoreceptors respond to CSF H⁺ (driven by PaCO₂), not to O₂, and the falling PaCO₂ at altitude actually reduces their drive."
    },
    {
      q:"The 30% increase in erythrocyte 2,3-BPG at altitude shifts the hemoglobin-oxygen dissociation curve. What is the physiological consequence of this shift at the tissue level?",
      choices:[
        "A leftward shift that raises O₂ affinity and loading in the lungs",
        "A rightward shift that eases O₂ unloading to hypoxic tissues",
        "A rightward shift that increases O₂ loading in pulmonary capillaries",
        "No net shift, because the Bohr effect already offsets the change"
      ],
      ans:1,
      exp:"2,3-BPG binds the central cavity of deoxyhemoglobin and stabilizes the **T state**, raising P50 and shifting the curve **right**, which favors O₂ release in tissues. A right shift slightly reduces, rather than increases, O₂ loading at the low alveolar PO₂ of altitude; the respiratory alkalosis pushes the curve left, partly opposing the 2,3-BPG effect."
    },
    {
      q:"Fetal hemoglobin (HbF) has higher O2 affinity than adult hemoglobin (HbA). Based on the passage, which structural feature most directly explains HbF's weak binding of 2,3-BPG?",
      choices:[
        "HbF has two subunits instead of four, so it has fewer allosteric sites",
        "Its γ chains carry serine where β chains carry His-143, losing a positive charge",
        "Its heme iron is held exclusively in the Fe²⁺ state, unlike that of HbA",
        "Its central cavity is too small to accommodate a 2,3-BPG molecule"
      ],
      ans:1,
      exp:"HbF (α2γ2) has **serine at position 143** of the γ chain instead of the positively charged His-143 of the β chain, so its central cavity binds the negatively charged 2,3-BPG less well; HbF stays more in the high-affinity R state, which lets the fetus pull O₂ from maternal HbA across the placenta. HbF is still a tetramer, and the iron in functional HbA is also Fe²⁺."
    },
    {
      q:"By day 10, the arterial pH has returned toward 7.40 despite continued hyperventilation and low PCO2. Which renal mechanism mediates this compensation?",
      choices:[
        "Increased proximal H⁺ secretion that generates new bicarbonate",
        "Reduced bicarbonate reabsorption, increasing urinary HCO₃⁻ loss",
        "Aldosterone-driven reabsorption of sodium bicarbonate",
        "Increased ammoniagenesis that raises urinary acid excretion"
      ],
      ans:1,
      exp:"Chronic respiratory alkalosis is compensated by **reduced HCO₃⁻ reabsorption and bicarbonaturia**, lowering plasma HCO₃⁻ by about 4–5 mEq/L per 10 mmHg fall in PaCO₂ (here to ~18–19 mEq/L) over 2–5 days. Increased H⁺ secretion and ammoniagenesis generate new bicarbonate, which is the compensation for acidosis, not alkalosis; acetazolamide speeds this bicarbonaturia in altitude sickness."
    },
    {
      q:"The medulla oblongata contains the central chemoreceptors. If a drug selectively blocked all central chemoreceptor activity, the ventilatory response to which blood gas change would be most severely blunted?",
      choices:[
        "A fall in PaO₂ from 99 to 60 mmHg",
        "A rise in PaCO₂ from 40 to 55 mmHg",
        "A fall in arterial pH from 7.40 to 7.32",
        "A fall in PaO₂ from 60 to 45 mmHg"
      ],
      ans:1,
      exp:"Central chemoreceptors respond to the H⁺ formed when CO₂ crosses the blood–brain barrier into CSF, and they account for most (~70–80%) of the **hypercapnic** ventilatory response. Hypoxemia is sensed peripherally, and an arterial (metabolic) pH change is detected mainly by the carotid bodies because H⁺ crosses the blood–brain barrier poorly."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE B2: Nervous System & Muscle Physiology
// ══════════════════════════════════════════════════
{
  id:'p_bio_2',
  topic:'Nervous System & Muscle Physiology',
  title:'Myasthenia Gravis and the Neuromuscular Junction',
  passage:`Myasthenia gravis (MG) is an autoimmune disorder in which IgG antibodies target nicotinic acetylcholine receptors (nAChRs) at the neuromuscular junction (NMJ). Antibody binding leads to receptor internalization, complement-mediated destruction, and functional blockade. The hallmark is fatigable muscle weakness — weakness that worsens with repeated use — affecting extraocular muscles (ptosis, diplopia), proximal limb muscles, and respiratory muscles.

A 34-year-old woman presents with ptosis and diplopia worsening through the day. Edrophonium (Tensilon), a short-acting acetylcholinesterase inhibitor, temporarily reverses her symptoms. She is started on pyridostigmine, a longer-acting acetylcholinesterase inhibitor. Nerve conduction studies show a characteristic decremental response on repetitive nerve stimulation — amplitude of the compound muscle action potential (CMAP) decreases progressively with each successive stimulus.

At the NMJ, an action potential in the motor neuron triggers Ca2+ influx through voltage-gated calcium channels, causing ACh-containing synaptic vesicles to fuse with the presynaptic membrane and release ACh into the synaptic cleft. ACh binds nAChRs, opens ion channels, and depolarizes the postsynaptic membrane.`,
  questions:[
    {
      q:"Edrophonium rapidly reverses myasthenic weakness by which mechanism?",
      choices:[
        "It binds the nAChRs directly and acts as a receptor agonist",
        "It inhibits acetylcholinesterase, prolonging ACh in the cleft",
        "It stimulates synthesis of new nAChRs on the motor end plate",
        "It competitively blocks autoantibody binding to the nAChRs"
      ],
      ans:1,
      exp:"Edrophonium (like pyridostigmine) inhibits **acetylcholinesterase**, so ACh persists longer in the cleft and can activate more of the reduced number of functional receptors, transiently restoring transmission. It is not a receptor agonist and does not affect the antibodies, which is why the effect lasts only minutes."
    },
    {
      q:"The decremental CMAP response on repetitive nerve stimulation in MG results from which physiological mechanism?",
      choices:[
        "Progressive conduction failure along the motor nerve axon",
        "Falling ACh release per impulse, which too few receptors cannot buffer",
        "Ca²⁺ buildup in the nerve terminal that blocks vesicle fusion",
        "Cl⁻ influx through nAChRs that hyperpolarizes the end plate"
      ],
      ans:1,
      exp:"ACh release normally declines over the first few stimuli of a train, but the **safety factor** (excess receptors) keeps every end-plate potential above threshold. In MG the safety factor is lost, so as release falls more fibers fail to fire and the CMAP shrinks. In Lambert-Eaton syndrome (presynaptic Ca²⁺ channel antibodies) repetitive stimulation instead increases the response."
    },
    {
      q:"Skeletal muscle contraction requires Ca2+ binding to troponin. In the normal neuromuscular sequence, from where is the Ca2+ released that initiates contraction?",
      choices:[
        "Mitochondria within the muscle fiber",
        "Extracellular fluid through sarcolemmal Ca²⁺ channels",
        "The sarcoplasmic reticulum via ryanodine receptors",
        "Synaptic vesicles of the motor nerve terminal"
      ],
      ans:2,
      exp:"The action potential travels down **T-tubules**, where dihydropyridine receptors (voltage sensors) are mechanically coupled to **ryanodine receptors (RyR1)** on the sarcoplasmic reticulum, releasing stored Ca²⁺ that binds troponin C. Extracellular Ca²⁺ entry is the tempting answer because it is required in cardiac muscle (Ca²⁺-induced Ca²⁺ release), but skeletal muscle does not need it."
    },
    {
      q:"A patient with MG develops respiratory failure requiring intubation. Which respiratory muscle is most critical for generating the negative intrathoracic pressure needed for inspiration?",
      choices:[
        "External intercostal muscles",
        "Internal intercostal muscles",
        "The diaphragm",
        "Sternocleidomastoid muscles"
      ],
      ans:2,
      exp:"Contraction of the **diaphragm** (phrenic nerve, C3–C5) enlarges the thorax vertically and generates most of the negative pressure for quiet inspiration (~70% of tidal volume). External intercostals assist; internal intercostals aid forced expiration, and the sternocleidomastoids are accessory muscles recruited in distress."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE B3: Endocrine & Metabolism
// ══════════════════════════════════════════════════
{
  id:'p_bio_3',
  topic:'Endocrine System',
  title:'Type 1 Diabetes and the Hypothalamic-Pituitary-Adrenal Axis',
  passage:`A 17-year-old male with Type 1 diabetes mellitus (T1DM) presents following a motor vehicle collision. He is found to have a blood glucose of 42 mg/dL (hypoglycemia) after his insulin pump malfunctioned and delivered an unintended large insulin bolus. His cortisol level is 48 μg/dL (reference 7–28), and serum epinephrine is markedly elevated. He is confused, diaphoretic, and tachycardic.

T1DM results from autoimmune destruction of beta-islet cells in the pancreas. The counterregulatory response to hypoglycemia involves glucagon from alpha-islet cells, epinephrine from the adrenal medulla, cortisol from the adrenal cortex, and growth hormone from the anterior pituitary — all acting to raise blood glucose.

Cortisol secretion is governed by the hypothalamic-pituitary-adrenal (HPA) axis: the hypothalamus releases CRH, stimulating the anterior pituitary to release ACTH, which stimulates the adrenal cortex to produce cortisol. Cortisol then feeds back to inhibit both CRH and ACTH (negative feedback). The adrenal medulla secretes catecholamines (epinephrine and norepinephrine) via direct sympathetic neural innervation, independent of the HPA axis.`,
  questions:[
    {
      q:"This patient has T1DM with absent beta-islet cell function. Which counterregulatory response to hypoglycemia is most impaired compared to a non-diabetic patient?",
      choices:[
        "Epinephrine secretion from the adrenal medulla",
        "Cortisol secretion from the adrenal cortex",
        "Glucagon secretion from pancreatic alpha cells",
        "Growth hormone secretion from the anterior pituitary"
      ],
      ans:2,
      exp:"In established T1DM the **glucagon** response to hypoglycemia is lost early, because alpha cells normally depend on the fall in insulin from neighboring beta cells as a signal to secrete. Epinephrine then becomes the main defense, which is why recurrent hypoglycemia (which blunts it, causing hypoglycemia unawareness) and nonselective beta-blockers (which mask its warning symptoms) are dangerous."
    },
    {
      q:"The patient's elevated cortisol results from HPA axis activation. Which statement correctly describes cortisol's mechanism of counterregulatory action?",
      choices:[
        "It directly activates hepatic glucokinase to stimulate glycogenolysis",
        "It acts via nuclear receptors to induce gluconeogenic enzymes such as PEPCK",
        "It binds membrane receptors and raises cAMP to activate glycogen phosphorylase",
        "It stimulates insulin secretion to limit the counterregulatory response"
      ],
      ans:1,
      exp:"Cortisol is a lipophilic steroid that binds the intracellular **glucocorticoid receptor**, which acts as a transcription factor to induce PEPCK and glucose-6-phosphatase and to promote muscle proteolysis that supplies gluconeogenic amino acids. These genomic effects take hours; the membrane-receptor/cAMP route describes glucagon and epinephrine, which act within minutes."
    },
    {
      q:"The adrenal medulla secretes epinephrine via direct sympathetic innervation rather than through the HPA axis. Epinephrine is classified as which type of hormone, and it exerts its effects via which receptor type?",
      choices:[
        "Steroid hormone derived from cholesterol; nuclear receptors",
        "Peptide hormone cleaved from a prohormone; receptor tyrosine kinases",
        "Amine hormone derived from tyrosine; G protein–coupled receptors",
        "Amine hormone derived from tryptophan; serotonin receptors"
      ],
      ans:2,
      exp:"Epinephrine is a **catecholamine** made from tyrosine (tyrosine → DOPA → dopamine → norepinephrine → epinephrine, the last step by PNMT in the adrenal medulla); being water-soluble, it acts on cell-surface **adrenergic GPCRs** (β receptors via Gs/cAMP). Tryptophan-derived amines are serotonin and melatonin; note that thyroid hormone is also tyrosine-derived but acts through nuclear receptors."
    },
    {
      q:"After glucose administration, the patient recovers. His blood glucose rises to 180 mg/dL and insulin is resumed via his pump. Insulin promotes glucose uptake in skeletal muscle and adipose tissue. Which downstream signaling pathway does insulin primarily activate to promote this uptake?",
      choices:[
        "cAMP–PKA pathway, promoting GLUT4 translocation",
        "PI3K–Akt pathway, promoting GLUT4 translocation",
        "MAPK pathway, promoting GLUT2 expression",
        "JAK–STAT pathway, promoting glycogen synthase activation"
      ],
      ans:1,
      exp:"The insulin receptor tyrosine kinase phosphorylates IRS proteins, activating **PI3K → PIP3 → Akt**, which triggers insertion of GLUT4 vesicles into the plasma membrane of muscle and fat cells. The MAPK branch mediates insulin's growth effects, and GLUT2 (liver, beta cells) is not insulin-regulated; cAMP–PKA is the glucagon/epinephrine pathway that insulin opposes."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE B4: Immunology & Genetics
// ══════════════════════════════════════════════════
{
  id:'p_bio_4',
  topic:'Immunology & Genetics',
  title:'Sickle Cell Disease: Genetics, Immunity, and Natural Selection',
  passage:`Sickle cell disease (SCD) is caused by a single nucleotide transversion in the HBB gene on chromosome 11, converting the sixth codon from GAG (glutamate) to GTG (valine). The resulting HbS polymerizes under low-oxygen conditions, distorting red blood cells into a sickle shape. SCD follows autosomal recessive inheritance: heterozygotes (HbAS, sickle cell trait) are largely asymptomatic carriers, while homozygotes (HbSS) have disease.

Sickle cell trait reaches carrier frequencies of 10–40% in parts of sub-Saharan Africa because heterozygous carriers have a survival advantage against severe Plasmodium falciparum malaria — a classic example of balancing selection (heterozygote advantage). Falciparum parasites require normal red blood cell physiology for optimal replication; the altered intracellular environment of HbAS red cells impairs parasite development.

Patients with SCD are functionally asplenic due to repeated splenic infarction from sickling, impairing opsonization-dependent clearance of encapsulated bacteria. They require prophylactic penicillin and vaccination against Streptococcus pneumoniae, Haemophilus influenzae type b, and Neisseria meningitidis.`,
  questions:[
    {
      q:"The HBB mutation (GAG→GTG) substitutes valine for glutamate at position 6 of the beta-globin chain. What type of mutation is this, and why does it have such profound structural consequences?",
      choices:[
        "Nonsense mutation; a premature stop codon truncates β-globin",
        "Frameshift mutation; every downstream amino acid is altered",
        "Missense mutation; a hydrophobic valine replaces a charged glutamate",
        "Conservative missense mutation; valine and glutamate are chemically alike"
      ],
      ans:2,
      exp:"One base change that swaps one amino acid is a **missense** mutation, and this one is nonconservative: charged, hydrophilic glutamate becomes hydrophobic valine. In deoxy-HbS, Val6 sticks into a hydrophobic pocket on a neighboring HbS molecule, nucleating long polymers that sickle the cell; a conservative substitution would have little effect."
    },
    {
      q:"Two parents are both carriers of sickle cell trait (HbAS). Using Mendelian genetics, what is the probability that their child will have sickle cell disease (HbSS)?",
      choices:[
        "0%, because carriers cannot have affected children",
        "25%, because each child has a 1/4 chance of two S alleles",
        "50%, because half of all children will be homozygous",
        "75%, because three in four children carry an S allele"
      ],
      ans:1,
      exp:"An AS × AS cross gives **1/4 AA, 1/2 AS, 1/4 SS**, so each pregnancy has a 25% chance of HbSS. The 75% figure is the chance of inheriting at least one S allele (AS or SS), which includes unaffected carriers."
    },
    {
      q:"The high frequency of the HbS allele in malaria-endemic regions represents which type of natural selection?",
      choices:[
        "Directional selection favoring the HbS allele in everyone",
        "Stabilizing selection favoring the most common phenotype, HbAA",
        "Balancing selection through heterozygote advantage",
        "Disruptive selection favoring both homozygotes, HbAA and HbSS"
      ],
      ans:2,
      exp:"Where falciparum malaria is common, **HbAS heterozygotes** have the highest fitness (malaria protection without sickle disease), while HbAA (malaria-susceptible) and HbSS (sickle disease) are both disadvantaged. This heterozygote advantage is a form of **balancing selection** that keeps both alleles in the population; directional selection would drive HbS toward fixation."
    },
    {
      q:"Functional asplenia in SCD impairs clearance of encapsulated bacteria. The spleen normally destroys opsonized bacteria via which immune cell and mechanism?",
      choices:[
        "Natural killer cells, through perforin-mediated lysis",
        "Cytotoxic T cells recognizing MHC I–presented bacterial antigens",
        "Macrophages that phagocytose bacteria opsonized by IgG and C3b",
        "Marginal-zone B cells whose secreted IgM directly lyses bacteria"
      ],
      ans:2,
      exp:"Splenic **macrophages** carry Fc receptors (for IgG) and complement receptors (for C3b), so they efficiently phagocytose opsonized bacteria; polysaccharide capsules resist phagocytosis unless opsonized, which is why asplenic patients are vulnerable to S. pneumoniae, H. influenzae type b and N. meningitidis. Marginal-zone B cells make anti-capsule IgM, but IgM works by activating complement, not by lysing bacteria itself."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE B5: Renal Physiology & Digestion
// ══════════════════════════════════════════════════
{
  id:'p_bio_5',
  topic:'Renal Physiology & Digestion',
  title:'Nephrotic Syndrome and Gastrointestinal Absorption',
  passage:`A 45-year-old man presents with bilateral lower extremity edema, frothy urine, and a serum albumin of 1.8 g/dL (reference 3.5–5.0). Urinalysis shows 4+ proteinuria. A 24-hour urine collection reveals protein excretion of 6.8 g/day (nephrotic range: >3.5 g/day). Serum cholesterol is 340 mg/dL. He is diagnosed with nephrotic syndrome secondary to focal segmental glomerulosclerosis (FSGS).

The glomerulus normally acts as a size- and charge-selective filter. Podocyte effacement in nephrotic syndrome disrupts the slit diaphragm, allowing large proteins (particularly albumin) to pass into the filtrate and overwhelm tubular reabsorption. The liver responds to hypoalbuminemia with compensatory lipoprotein synthesis, causing hyperlipidemia.

The patient also reports chronic steatorrhea. Investigation reveals pancreatic exocrine insufficiency — absent secretion of pancreatic lipase, phospholipase A2, and co-lipase. Fat-soluble vitamin levels (A, D, E, K) are deficient. He is started on oral pancreatic enzyme replacement and fat-soluble vitamin supplementation.`,
  questions:[
    {
      q:"The patient has bilateral lower extremity edema despite normal cardiac and hepatic function. Which mechanism best explains the edema in nephrotic syndrome?",
      choices:[
        "Lymphatic obstruction by lipid deposits in regional lymph nodes",
        "Reduced plasma oncotic pressure from urinary albumin loss",
        "Increased capillary permeability from cytokines released by glomeruli",
        "Increased interstitial oncotic pressure as albumin leaks into tissues"
      ],
      ans:1,
      exp:"Albumin generates most of the **plasma oncotic pressure** that holds fluid in capillaries; when it is lost in the urine, the Starling balance favors filtration and fluid accumulates in the interstitium. Renal Na⁺ retention contributes, but leaked albumin goes into the urine, not the tissues, so interstitial oncotic pressure does not rise."
    },
    {
      q:"Fat-soluble vitamins A, D, E, and K are deficient because fat digestion has failed. These vitamins require which process for intestinal absorption?",
      choices:[
        "Na⁺-dependent active transport across the duodenal brush border",
        "Receptor-mediated uptake in the ileum after binding intrinsic factor",
        "Incorporation into bile salt micelles that deliver them to enterocytes",
        "Paracellular diffusion through tight junctions between enterocytes"
      ],
      ans:2,
      exp:"Fat-soluble vitamins dissolve in dietary fat and are carried to the brush border in **bile salt micelles**, which form only after lipase digests triglycerides; inside the enterocyte they are packaged into chylomicrons and leave via lacteals. Intrinsic factor–mediated ileal uptake is specific to vitamin B12."
    },
    {
      q:"The proximal convoluted tubule (PCT) is the site of bulk reabsorption of glucose, amino acids, and water. If serum glucose rises to 400 mg/dL in this patient (who later develops steroid-induced diabetes), glucose would appear in the urine. This occurs because:",
      choices:[
        "Glucose is actively secreted into the tubule when plasma levels are high",
        "The filtered load exceeds the transport maximum of the PCT SGLT carriers",
        "Urinary albumin binds filtered glucose and prevents its reabsorption",
        "The loop of Henle, which normally reabsorbs glucose, is overwhelmed"
      ],
      ans:1,
      exp:"Filtered glucose is reabsorbed entirely in the PCT by SGLT2 (~90%) and SGLT1 (~10%); when filtered load (GFR × plasma glucose) exceeds the **transport maximum**, glucosuria appears, starting around a plasma glucose of ~180–200 mg/dL (the renal threshold). Glucose is not secreted, and the loop of Henle does not reabsorb glucose."
    },
    {
      q:"Trypsin is a key enzyme activated in the duodenum that breaks down proteins. It is secreted as the inactive zymogen trypsinogen. Which enzyme activates trypsinogen, and where is this activation enzyme located?",
      choices:[
        "Pepsin, secreted by gastric chief cells",
        "Enteropeptidase, on the duodenal brush border",
        "Pancreatic lipase, co-secreted with trypsinogen",
        "Cholecystokinin, acting directly as a protease"
      ],
      ans:1,
      exp:"**Enteropeptidase (enterokinase)**, a brush-border enzyme of the duodenum, cleaves trypsinogen to trypsin, which then activates more trypsinogen and the other pancreatic zymogens; confining activation to the gut lumen protects the pancreas from autodigestion. CCK stimulates enzyme secretion but is a hormone, not a protease."
    }
  ]
},

]; // end BIO_PASSAGES


// ═══════════════════════════════════════════════════════════════════
// GENERAL CHEMISTRY PASSAGES — 5 passages, 20 questions
// ═══════════════════════════════════════════════════════════════════

const GCHEM_PASSAGES = [

// ══════════════════════════════════════════════════
// PASSAGE G1: Acid-Base & Buffers
// ══════════════════════════════════════════════════
{
  id:'p_gchem_1',
  topic:'Acids, Bases & Buffers',
  title:'Bicarbonate Buffering and Arterial Blood Gas Interpretation',
  passage:`The bicarbonate buffer system is the most important extracellular buffer in human blood, maintaining arterial pH between 7.35 and 7.45. It operates through the equilibrium: CO2(g) + H2O ⇌ H2CO3 ⇌ H+ + HCO3−. The Henderson-Hasselbalch equation describes this: pH = pKa + log([HCO3−]/[H2CO3]). For the bicarbonate system, pKa = 6.1, and [H2CO3] is directly proportional to PCO2 (dissolved CO2 in mmol/L ≈ 0.03 × PCO2 in mmHg).

A 55-year-old man with COPD presents with worsening dyspnea. His arterial blood gas (ABG) shows: pH 7.31, PaCO2 58 mmHg (reference 35–45), PaO2 54 mmHg, HCO3− 28 mEq/L (reference 22–26). His serum chloride is low at 92 mEq/L (reference 98–106).

In the bicarbonate buffer system, the kidneys regulate [HCO3−] on a timescale of hours to days, while the lungs regulate PCO2 within seconds to minutes. An acidic urine pH in this patient confirms active renal compensation.`,
  questions:[
    {
      q:"Based on the ABG values, what is the primary acid-base disorder, and what evidence shows that renal compensation is occurring?",
      choices:[
        "Metabolic acidosis with respiratory compensation, shown by low HCO₃⁻",
        "Respiratory acidosis with renal compensation, shown by high HCO₃⁻",
        "Respiratory alkalosis with renal compensation, shown by high HCO₃⁻",
        "Mixed respiratory and metabolic acidosis, shown by high PaCO₂ and HCO₃⁻"
      ],
      ans:1,
      exp:"The pH is low (7.31) and PaCO₂ is high (58 mmHg), so the primary disorder is **respiratory acidosis** from COPD hypoventilation; HCO₃⁻ of 28 mEq/L is above normal because the kidneys are retaining bicarbonate. A metabolic acidosis would require a low HCO₃⁻, so this is not a mixed acidosis; the elevated HCO₃⁻ is compensation, which moves pH toward but not back to normal."
    },
    {
      q:"The Henderson-Hasselbalch equation for the bicarbonate system is pH = 6.1 + log([HCO3−]/[H2CO3]). If this patient's HCO3− rose to 30 mEq/L while PaCO2 were 50 mmHg (H2CO3 = 0.03 × 50 = 1.5 mmol/L), what would the calculated pH be?",
      choices:[
        "7.40",
        "7.30",
        "6.40",
        "4.80"
      ],
      ans:0,
      exp:"pH = 6.1 + log(30/1.5) = 6.1 + log 20 = 6.1 + 1.30 = **7.40**; whenever [HCO₃⁻]/[H₂CO₃] is 20:1 the pH is 7.40, whatever the absolute values. Inverting the ratio gives 6.1 − 1.30 = 4.80. (At this patient's actual PaCO₂ of 58 mmHg, H₂CO₃ = 1.74 mmol/L and the same HCO₃⁻ would give pH ≈ 7.34, because compensation is usually incomplete.)"
    },
    {
      q:"The patient's low serum chloride (92 mEq/L) in the setting of elevated bicarbonate reflects renal compensation. Which statement correctly describes this phenomenon?",
      choices:[
        "Cl⁻ enters red blood cells to balance the charge of the excess H⁺",
        "The kidney excretes Cl⁻ while retaining HCO₃⁻, keeping plasma neutral",
        "Cl⁻ is consumed in the reaction CO₂ + H₂O → H⁺ + HCO₃⁻ in plasma",
        "Cl⁻ shifts into cells to offset the hyperkalemia caused by acidosis"
      ],
      ans:1,
      exp:"Plasma must stay electrically neutral, so when the kidneys retain the anion HCO₃⁻ to compensate for chronic respiratory acidosis, they excrete more **Cl⁻**, and plasma Cl⁻ falls as HCO₃⁻ rises. The red-cell process is the separate 'chloride shift' (HCO₃⁻/Cl⁻ exchange via band 3), which swaps one anion for another rather than balancing H⁺."
    },
    {
      q:"A buffer has maximum buffering capacity when pH = pKa. Why is the bicarbonate buffer (pKa 6.1) so effective at physiological pH 7.4, despite being 1.3 pH units from its pKa?",
      choices:[
        "It is not effective; phosphate (pKa 6.8) is the main blood buffer",
        "It is an open system: the lungs adjust CO₂ independently of the reaction",
        "Albumin and hemoglobin act as cofactors that boost its capacity",
        "Its in vivo pKa is 7.4 once corrected for body temperature"
      ],
      ans:1,
      exp:"In a closed system a buffer 1.3 units from its pKa would be weak, but bicarbonate is an **open system**: ventilation keeps PCO₂ (and so H₂CO₃) set independently, so added H⁺ is converted to CO₂ and exhaled, while the kidneys adjust HCO₃⁻; its high concentration (~24 mEq/L) also helps. Phosphate has a pKa closer to 7.4 but is present at far too low a concentration in plasma to be the main buffer."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE G2: Thermochemistry & Gibbs Free Energy
// ══════════════════════════════════════════════════
{
  id:'p_gchem_2',
  topic:'Thermochemistry & Gibbs Free Energy',
  title:'ATP Hydrolysis and Biological Thermodynamics',
  passage:`Adenosine triphosphate (ATP) is the primary energy currency of the cell. Hydrolysis of the terminal phosphoanhydride bond releases approximately 30.5 kJ/mol under standard conditions (ΔG°' = −30.5 kJ/mol). Under physiological conditions, cells keep the [ATP]/([ADP][Pi]) ratio far higher than at standard 1 M concentrations, so the actual ΔG of hydrolysis is closer to −50 to −60 kJ/mol.

ATP hydrolysis is coupled to thermodynamically unfavorable (endergonic) reactions to drive them forward. The Gibbs free energy relationship is: ΔG = ΔH − TΔS. A reaction is spontaneous (favored) when ΔG < 0. The relationship between ΔG° and the equilibrium constant Keq is: ΔG° = −RT ln(Keq).

Muscle contraction provides a biological example: the myosin ATPase cycle requires ATP hydrolysis to release myosin from actin and re-cock the myosin head. In the absence of ATP (rigor mortis), myosin remains tightly bound to actin in a rigor complex. Body temperature is 37°C; the gas constant R = 8.314 J/(mol·K).`,
  questions:[
    {
      q:"The hydrolysis of ATP under standard conditions has ΔG° = −30.5 kJ/mol. What does this negative ΔG° indicate about the reaction?",
      choices:[
        "It is endothermic, so heat must be supplied to drive it",
        "It favors products at equilibrium under standard conditions",
        "It proceeds rapidly, because ΔG° determines reaction rate",
        "It is at equilibrium when all species are at 1 M"
      ],
      ans:1,
      exp:"A negative ΔG° means the reaction is **exergonic**: starting from standard concentrations it proceeds toward products, and Keq > 1. ΔG° says nothing about rate, which depends on activation energy; ATP is kinetically stable in water and hydrolyzes quickly only when an enzyme lowers Ea."
    },
    {
      q:"Muscle contraction couples ATP hydrolysis (ΔG = −50 kJ/mol under physiological conditions) to mechanical work. If a particular conformational change in myosin requires +35 kJ/mol of energy input, will the coupled reaction be spontaneous?",
      choices:[
        "No, because the +35 kJ/mol step needs more than ATP can supply",
        "Yes, because the coupled ΔG is −50 + 35 = −15 kJ/mol",
        "Only above 37 °C, where the TΔS term becomes favorable",
        "No, because ATP can drive only steps needing less than 30.5 kJ/mol"
      ],
      ans:1,
      exp:"ΔG values of coupled reactions **add**: −50 + 35 = −15 kJ/mol, which is negative, so the coupled process is spontaneous. The 30.5 kJ/mol limit is a trap: it is the standard ΔG°', but in cells the actual ΔG of ATP hydrolysis (~−50 kJ/mol) is what determines how much work can be driven."
    },
    {
      q:"Using ΔG° = −RT ln(Keq) and ΔG° = −30.5 kJ/mol for ATP hydrolysis at 37°C (310 K), the Keq is approximately 10^5. What does this large Keq indicate?",
      choices:[
        "The reaction is very slow, since a large Keq means kinetic stability",
        "At equilibrium, [ADP][Pi]/[ATP] ≈ 10⁵, so products dominate",
        "The reaction needs a catalyst, since a large Keq signals enzyme dependence",
        "The reaction is endothermic, since a large Keq implies ΔH > 0"
      ],
      ans:1,
      exp:"ln Keq = 30,500 / (8.314 × 310) ≈ 11.8, so Keq ≈ 1.4 × 10⁵: at **equilibrium** products overwhelmingly predominate. Cells keep ATP far from this equilibrium by continuous resynthesis, which is what makes the actual ΔG more negative than ΔG°. Keq is a thermodynamic quantity and says nothing about speed or the sign of ΔH."
    },
    {
      q:"Rigor mortis occurs when ATP production ceases after death, causing myosin to remain bound to actin. This demonstrates that ATP binding to myosin is required to release it from actin. Based on Gibbs free energy, which statement correctly describes the rigor state?",
      choices:[
        "The rigor complex is higher in free energy than free actin and myosin",
        "The rigor complex is a low-free-energy state that ATP binding must disrupt",
        "Rigor results from postmortem cooling, so free energy is irrelevant",
        "Actin–myosin binding is endergonic and requires ATP to occur"
      ],
      ans:1,
      exp:"Actin–myosin binding is exergonic, so the rigor complex is a stable, **low-free-energy** state; ATP **binding** (not hydrolysis) lowers myosin's affinity for actin and releases it, and hydrolysis then re-cocks the head. Without ATP the cross-bridges stay locked, which is rigor mortis; binding is spontaneous, so it is not endergonic."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE G3: Electrochemistry & REDOX
// ══════════════════════════════════════════════════
{
  id:'p_gchem_3',
  topic:'Electrochemistry & REDOX',
  title:'Electrochemical Cells and Biological Electron Transport',
  passage:`The electron transport chain (ETC) in mitochondria can be modeled as a series of electrochemical half-reactions with defined reduction potentials. NADH is oxidized at Complex I (E°' = −0.32 V), and molecular oxygen is reduced at Complex IV (E°' = +0.82 V). The overall cell potential under standard biochemical conditions is E°'cell = E°'cathode − E°'anode = +0.82 − (−0.32) = +1.14 V.

The relationship between standard cell potential and Gibbs free energy is: ΔG° = −nFE°cell, where n is the number of electrons transferred and F is the Faraday constant (96,485 C/mol). For each NADH oxidized, 2 electrons are transferred.

In galvanic cells, oxidation occurs at the anode and reduction at the cathode. Electrons flow spontaneously from anode to cathode through the external circuit. The Nernst equation E = E° − (RT/nF)ln(Q) describes how cell potential varies with concentration.`,
  questions:[
    {
      q:"In the ETC, NADH is oxidized at Complex I and O2 is reduced at Complex IV. In electrochemical terms, which component is the anode and which is the cathode?",
      choices:[
        "Complex I is the cathode (NADH reduced); Complex IV is the anode (O₂ oxidized)",
        "Complex I is the anode (NADH oxidized); Complex IV is the cathode (O₂ reduced)",
        "Both are cathodes, because electrons flow only toward oxygen",
        "Neither; the ETC is electrolytic, so the terms do not apply"
      ],
      ans:1,
      exp:"Oxidation occurs at the **anode** and reduction at the **cathode** ('an ox, red cat'): NADH is oxidized at Complex I and O₂ is reduced to water at Complex IV. Electrons flow spontaneously from the low (−0.32 V) to the high (+0.82 V) reduction potential, so the chain behaves like a galvanic, not an electrolytic, cell."
    },
    {
      q:"Using ΔG° = −nFE°cell with n = 2 electrons and E°cell = +1.14 V for NADH → O2, what is the calculated ΔG°?",
      choices:[
        "−220 kJ/mol",
        "+220 kJ/mol",
        "−110 kJ/mol",
        "−0.22 kJ/mol"
      ],
      ans:0,
      exp:"ΔG° = −(2)(96,485 C/mol)(1.14 V) ≈ −220,000 J/mol = **−220 kJ/mol** (≈ −52.6 kcal/mol). Dropping the minus sign gives +220, using n = 1 gives −110, and dividing by 1000 twice gives −0.22; the large negative value is the energy captured as the proton-motive force."
    },
    {
      q:"The Nernst equation shows that cell potential varies with reactant/product concentrations. If the [NADH]/[NAD+] ratio in a mitochondrion decreases (more NADH is oxidized than produced), what happens to the reduction potential of the NAD+/NADH couple at Complex I?",
      choices:[
        "It becomes more negative, so NADH becomes a stronger reductant",
        "It becomes less negative, narrowing the gap to the O₂/H₂O couple",
        "It is unchanged, since only temperature changes E in the Nernst equation",
        "It is unchanged, but the potential at Complex IV rises to compensate"
      ],
      ans:1,
      exp:"For NAD⁺ + H⁺ + 2e⁻ → NADH, E = E°' − (RT/nF) ln([NADH]/[NAD⁺]); lowering [NADH]/[NAD⁺] makes the log term negative, so E becomes **less negative** (more positive) and the driving force for electron flow to O₂ shrinks. The opposite case, a high NADH/NAD⁺ ratio (as with ETC inhibition), makes the couple more negative."
    },
    {
      q:"An electrolytic cell requires external electrical energy to drive a non-spontaneous reaction. Which statement about electrolytic vs. galvanic cells is correct?",
      choices:[
        "Electrolytic cells have E°cell > 0 and ΔG° < 0; galvanic cells the reverse",
        "In both cell types, oxidation occurs at the cathode",
        "Galvanic cells have E°cell > 0 and ΔG° < 0; electrolytic cells the reverse",
        "Both cell types differ only in the direction of ion flow in the salt bridge"
      ],
      ans:2,
      exp:"**Galvanic** cells run a spontaneous reaction (E°cell > 0, ΔG° < 0) and produce electrical work; **electrolytic** cells run a non-spontaneous reaction (E°cell < 0, ΔG° > 0) and need an applied voltage. In both, oxidation is at the anode and reduction at the cathode; only the electrode charges differ (anode negative in galvanic, positive in electrolytic)."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE G4: Kinetics & Equilibrium
// ══════════════════════════════════════════════════
{
  id:'p_gchem_4',
  topic:'Chemical Kinetics & Equilibrium',
  title:'Enzyme Kinetics as a Model for Chemical Rate Laws',
  passage:`Enzyme-catalyzed reactions follow principles of chemical kinetics. At low substrate concentrations, enzymatic reactions are first-order (rate proportional to [S]). At saturating substrate, reactions are zero-order (rate = Vmax, independent of [S]). The Michaelis-Menten equation V = Vmax[S]/(Km + [S]) describes this transition.

The Arrhenius equation describes how temperature affects rate constants: k = Ae^(−Ea/RT), where Ea is activation energy, R is the gas constant, and T is absolute temperature. Enzymes lower activation energy without altering ΔG° of the reaction. At body temperature (310 K), a 10°C increase approximately doubles reaction rates for simple chemical reactions (Q10 ≈ 2).

Competitive inhibitors increase apparent Km without changing Vmax. Le Châtelier's Principle governs how equilibria shift in response to stress: adding product drives the reaction leftward, while removing product drives it rightward. The equilibrium constant Keq = [products]/[reactants] at equilibrium, and ΔG° = −RT ln(Keq).`,
  questions:[
    {
      q:"An enzyme has Km = 2 mM and Vmax = 100 μmol/min. At [S] = 2 mM, what fraction of Vmax is the reaction velocity?",
      choices:[
        "25% of Vmax",
        "50% of Vmax",
        "75% of Vmax",
        "100% of Vmax"
      ],
      ans:1,
      exp:"V = Vmax[S]/(Km + [S]) = 100 × 2/(2 + 2) = 50 μmol/min, which is **50%** of Vmax; by definition Km is the [S] giving half-maximal velocity. The enzyme is far from saturated at [S] = Km; reaching ~90% of Vmax takes [S] ≈ 9 × Km."
    },
    {
      q:"A researcher adds an inhibitor at 2 mM, and the apparent Km rises from 2 mM to 10 mM (consistent with Km,app = Km(1 + [I]/Ki) for Ki = 0.5 mM). Which experiment would most directly confirm that the inhibition is competitive rather than noncompetitive?",
      choices:[
        "Measuring how pH alters inhibitor binding",
        "Raising [S] to saturation and checking whether Vmax is restored",
        "Lowering the temperature to slow the catalyzed reaction",
        "Running SDS-PAGE to check whether the inhibitor denatures the enzyme"
      ],
      ans:1,
      exp:"A competitive inhibitor is outcompeted by excess substrate, so at saturating [S] the **original Vmax is reached**; a noncompetitive inhibitor lowers Vmax no matter how much substrate is added. The numbers fit competitive inhibition: Km,app = 2 × (1 + 2/0.5) = 10 mM. On a Lineweaver-Burk plot, competitive lines share a y-intercept; noncompetitive lines share an x-intercept."
    },
    {
      q:"A reaction has ΔG° = +15 kJ/mol and Keq ≈ 2.4 × 10^-3 at 25°C. Le Châtelier's Principle states that adding more reactant will shift equilibrium toward products. Which additional manipulation would most increase the conversion of reactant to product?",
      choices:[
        "Adding a catalyst, which lowers Ea and shifts the equilibrium",
        "Continuously removing product, which keeps Q below Keq",
        "Lowering the temperature, since a positive ΔG° means cooling favors products",
        "Raising the pressure, which favors products in any reaction"
      ],
      ans:1,
      exp:"Removing product keeps **Q < Keq**, so the reaction keeps running forward and conversion keeps rising; this is how cells pull reactions with unfavorable ΔG° forward. A catalyst speeds the approach to equilibrium but does not move it, and a positive ΔG° does not reveal the sign of ΔH (endergonic is not the same as endothermic), so the effect of temperature cannot be predicted here."
    },
    {
      q:"The Arrhenius equation shows that increasing temperature increases rate constant k. An enzyme-catalyzed reaction doubles in rate for every 10°C increase up to 37°C, but the rate falls sharply above 42°C. What causes the decrease above 42°C?",
      choices:[
        "Keq falls at higher temperature, making the reaction less favorable",
        "The enzyme denatures as heat disrupts its noncovalent interactions",
        "The substrate decomposes because it is thermolabile above 42 °C",
        "Product inhibition becomes stronger at higher temperature"
      ],
      ans:1,
      exp:"Above its optimum, thermal energy breaks the hydrogen bonds, hydrophobic and ionic interactions that hold the enzyme's secondary and tertiary structure, so the active site loses its shape: **denaturation**. Covalent peptide bonds stay intact. A change in Keq would alter the equilibrium position, not cause a sudden drop in rate."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE G5: Solutions, Bonding & Atomic Structure
// ══════════════════════════════════════════════════
{
  id:'p_gchem_5',
  topic:'Solutions, Bonding & Atomic Structure',
  title:'Osmolarity, Colligative Properties, and Molecular Geometry',
  passage:`Intravenous fluid therapy requires precise understanding of colligative properties. Normal saline (0.9% NaCl) is isotonic because its osmolarity (~308 mOsm/L) matches blood plasma osmolarity (~290–310 mOsm/L). NaCl dissociates completely in water: NaCl → Na+ + Cl−, contributing 2 moles of particles per mole of solute (van't Hoff factor i = 2). Osmolarity = molarity × i.

Raoult's law states that vapor pressure of a solution equals the mole fraction of solvent times the vapor pressure of pure solvent (P_solution = χ_solvent × P°_solvent). Adding nonvolatile solutes reduces vapor pressure, which in turn elevates boiling point and decreases freezing point — colligative properties that depend on solute particle concentration, not identity.

Water (H2O) has a bent molecular geometry (bond angle ~104.5°) due to two lone pairs on oxygen repelling the O-H bonds. This geometry makes water highly polar, explaining its high surface tension, high specific heat capacity, and excellent solvent properties for ionic and polar molecules.`,
  questions:[
    {
      q:"A 1.0 M glucose solution and a 0.5 M NaCl solution are separated by a membrane permeable only to water. In which direction will water flow by osmosis?",
      choices:[
        "From glucose to NaCl, because glucose molecules are larger",
        "No net flow, because both solutions are 1.0 Osm/L",
        "From NaCl to glucose, because glucose has the higher molarity",
        "From glucose to NaCl, because NaCl dissociates into more particles"
      ],
      ans:1,
      exp:"Osmolarity = molarity × i: glucose is 1.0 M × 1 = 1.0 Osm/L and NaCl is 0.5 M × 2 = 1.0 Osm/L, so the solutions are **isosmotic** and there is no net water movement. Counting dissociation is the key step; comparing molarities alone (or assuming NaCl 'wins' because it dissociates) gives the wrong direction."
    },
    {
      q:"Adding 1 mole of CaCl2 (which dissociates to Ca²⁺ + 2Cl⁻, i = 3) to 1 kg of water depresses the freezing point more than adding 1 mole of NaCl (i = 2). If the freezing point depression constant for water Kf = 1.86°C/m, what is the freezing point of a 1 molal CaCl2 solution?",
      choices:[
        "−5.58 °C",
        "−3.72 °C",
        "−1.86 °C",
        "−11.16 °C"
      ],
      ans:0,
      exp:"ΔTf = i·Kf·m = 3 × 1.86 °C/m × 1 m = 5.58 °C, so the solution freezes at **−5.58 °C**. Using i = 2 (as for NaCl) gives −3.72 °C and ignoring dissociation gives −1.86 °C; real values are slightly smaller because of ion pairing."
    },
    {
      q:"Water has a bent geometry with a bond angle of ~104.5° rather than the tetrahedral 109.5°. Which theory explains why the lone pairs compress the bond angle below 109.5°?",
      choices:[
        "Lone pairs in p orbitals perpendicular to the O–H bonds push them together",
        "VSEPR: lone pairs repel more strongly than bonding pairs, closing the angle",
        "sp³ hybridization gives 90° angles that hydrogen bonding widens to 104.5°",
        "An O–H bond order below 1 lets the bond angle flex inward"
      ],
      ans:1,
      exp:"In **VSEPR** theory, repulsion falls in the order lone pair–lone pair > lone pair–bonding pair > bonding pair–bonding pair, so oxygen's two lone pairs squeeze the H–O–H angle from 109.5° to ~104.5° (compare NH₃, one lone pair, ~107°). sp³ hybridization implies ~109.5°, not 90°, and the O–H bond order is 1."
    },
    {
      q:"Raoult's law predicts that vapor pressure of a solution decreases when nonvolatile solutes are added. Which property follows most directly from this vapor pressure lowering?",
      choices:[
        "Higher osmotic pressure, because lower vapor pressure pulls water across membranes",
        "Boiling point elevation, because more heat is needed to reach 1 atm vapor pressure",
        "Lower surface tension, because fewer solvent molecules reach the surface",
        "Higher viscosity, because solute particles slow solvent movement"
      ],
      ans:1,
      exp:"A liquid boils when its vapor pressure equals the external pressure; with solute present the vapor pressure is lower at every temperature, so the solution must be heated further to reach 1 atm: **boiling point elevation** (ΔTb = i·Kb·m). Osmotic pressure is also colligative, but it arises from the solvent's lowered chemical potential, not from vapor pressure acting across a membrane; viscosity and surface tension are not colligative."
    }
  ]
},

]; // end GCHEM_PASSAGES


const OCHEM_PASSAGES = [

// ══════════════════════════════════════════════════
// PASSAGE OC1: SN1/SN2 & Stereochemistry
// ══════════════════════════════════════════════════
{
  id:'p_oc_1',
  topic:'Reactions & Mechanisms',
  title:'Nucleophilic Substitution and Stereochemical Outcomes',
  passage:`A medicinal chemist is synthesizing enantiomerically pure drug candidates. Starting from (R)-2-bromobutane, she performs two reactions under different conditions. Reaction A uses sodium hydroxide (NaOH) in DMSO (a polar aprotic solvent) at room temperature. Reaction B uses water as the solvent (polar protic) with heat.

In Reaction A, a single stereochemical outcome is observed. The product is isolated in high yield with complete inversion of configuration — (S)-2-butanol. In Reaction B, a mixture of (R)- and (S)-2-butanol is obtained in roughly equal amounts.

The chemist notes that –OH is a poor leaving group directly, but after protonation to –OH₂⁺ (using H₂SO₄), the substrate undergoes rapid substitution. She also observes that increasing the nucleophile concentration in Reaction A increases the rate proportionally, while Reaction B's rate depends only on substrate concentration.

A 1° alkyl halide (n-butyl bromide) is also tested. In DMSO with NaOH it reacts rapidly via backside attack. When treated with a strong bulky base (t-BuOK) instead, the major product shifts to an alkene.`,
  questions:[
    {
      q:"Reaction A produces exclusively (S)-2-butanol from (R)-2-bromobutane. Which mechanism is operating, and what feature of DMSO favors this pathway?",
      choices:[
        "SN1; DMSO stabilizes the carbocation by donating hydrogen bonds",
        "SN2; DMSO leaves the anionic nucleophile unsolvated and reactive",
        "E2; DMSO is a polar aprotic solvent that favors elimination",
        "SN1; DMSO stabilizes the transition state through resonance"
      ],
      ans:1,
      exp:"Complete inversion and a rate that depends on [OH⁻] identify **SN2** (one-step backside attack, Walden inversion). DMSO is polar **aprotic**: it solvates Na⁺ but cannot hydrogen-bond to OH⁻, leaving the nucleophile highly reactive. DMSO has no O–H or N–H, so it cannot donate hydrogen bonds to stabilize anything, and an E2 product would be an alkene, not an alcohol."
    },
    {
      q:"Reaction B produces a racemic mixture. Which mechanism is operating, and why does it produce both stereoisomers?",
      choices:[
        "SN2; both faces of the carbon are equally open to backside attack",
        "E2; the alkene formed re-adds water equally to both faces",
        "SN1; a planar carbocation is attacked equally from either face",
        "SN2; the protic solvent reverses the inversion at each step"
      ],
      ans:2,
      exp:"A secondary substrate in a polar protic solvent with heat, and a rate law of k[substrate], indicate **SN1**: Br⁻ leaves first to give a planar sp² carbocation, which water attacks from either face, giving roughly equal (R) and (S) alcohol. SN2 always occurs from the back side only, so it cannot give both configurations from one enantiomer."
    },
    {
      q:"The chemist converts –OH to –OH₂⁺ with H₂SO₄ to improve substitution. Why does protonation convert a bad leaving group to a good one?",
      choices:[
        "It makes oxygen more electronegative, strengthening the C–O bond",
        "It changes the departing group from OH⁻, a strong base, to H₂O, a weak base",
        "It adds steric bulk that forces the reaction through an SN1 pathway",
        "H₂SO₄ oxidizes the carbon and changes its oxidation state"
      ],
      ans:1,
      exp:"Good leaving groups are **weak bases** that are stable on their own. Without protonation the group would leave as hydroxide (conjugate base of water, pKa ~15.7), a strong base; after protonation it leaves as neutral water (conjugate base of H₃O⁺, pKa ≈ −1.7). The same logic explains why Br⁻, I⁻ and tosylate leave easily while OH⁻ and NH₂⁻ do not."
    },
    {
      q:"When n-butyl bromide is treated with t-BuOK instead of NaOH in DMSO, the major product is 1-butene rather than the substitution product. What drives this change in product selectivity?",
      choices:[
        "t-BuO⁻ is a weak base that cannot reach the electrophilic carbon",
        "t-BuO⁻ is a strong, bulky base that removes a β-hydrogen (E2)",
        "t-BuOK is a reducing agent that converts the halide to butane",
        "t-BuOK promotes SN1 ionization of the primary bromide"
      ],
      ans:1,
      exp:"tert-Butoxide is a **strong but sterically hindered base**: its three methyl groups block backside approach to carbon, but it can still pull off an accessible β-hydrogen, so even a primary halide undergoes **E2** to give 1-butene (the less substituted, Hofmann-type product). It is a strong base, not a weak one, and primary carbocations are too unstable for SN1."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE OC2: Carbonyl Chemistry
// ══════════════════════════════════════════════════
{
  id:'p_oc_2',
  topic:'Carbonyl Chemistry',
  title:'Aldehyde and Ketone Reactivity in Biochemical Context',
  passage:`Carbonyl-containing compounds are central to metabolism. Pyruvate (an alpha-ketoacid), glyceraldehyde-3-phosphate (an aldehyde), and acetoacetate (a beta-ketoacid) all undergo carbonyl-dependent reactions in metabolic pathways.

In the laboratory, a chemist studies keto-enol tautomerism using acetylacetone (2,4-pentanedione), a beta-diketone. Unlike acetone (far less than 0.01% enol at equilibrium — on the order of 10⁻⁶ %), acetylacetone exists approximately 80% in the enol form due to intramolecular hydrogen bonding and extended conjugation stabilizing the enol tautomer.

The chemist also performs an aldol condensation, reacting two equivalents of acetaldehyde (ethanal) under basic conditions. The reaction proceeds through enolate formation (deprotonation of the alpha-carbon), nucleophilic attack on a second carbonyl (aldol addition), then dehydration to give an alpha,beta-unsaturated aldehyde (crotonaldehyde). She notes that beta-keto acids (and beta-dicarboxylic acids such as malonic acid) readily undergo decarboxylation upon heating via a cyclic six-membered transition state.`,
  questions:[
    {
      q:"Acetylacetone exists predominantly in the enol form (~80%), while acetone is essentially entirely in the keto form (>99.99%). What structural features of acetylacetone stabilize its enol tautomer?",
      choices:[
        "Its higher molecular weight thermodynamically favors the enol",
        "An internal H-bond and C=C–C=O conjugation stabilize the enol",
        "Its enol is kinetically trapped and cannot revert to the keto form",
        "It has more α-hydrogens, so enolization is statistically favored"
      ],
      ans:1,
      exp:"In the enol of a β-diketone, the O–H hydrogen-bonds to the other carbonyl oxygen in a six-membered ring, and the C=C is **conjugated** with the remaining C=O; acetone, with one carbonyl, has neither. Tautomers interconvert rapidly, so the ratio reflects thermodynamic stability, not a kinetic trap or a count of α-hydrogens."
    },
    {
      q:"In the aldol condensation of acetaldehyde under basic conditions, what is the role of the alpha-carbon, and what nucleophile is formed?",
      choices:[
        "The α-carbon becomes a carbocation that attacks the second carbonyl",
        "Base removes an α-hydrogen to form a resonance-stabilized enolate",
        "The α-carbon forms a radical that couples with a second molecule",
        "Base deprotonates the carbonyl oxygen to form an alkoxide nucleophile"
      ],
      ans:1,
      exp:"α-Hydrogens are unusually acidic (pKa ~17 for aldehydes, ~19–20 for ketones) because the resulting **enolate** spreads its negative charge onto oxygen; the enolate carbon then attacks the electrophilic carbonyl carbon of a second acetaldehyde, and dehydration gives the α,β-unsaturated aldehyde. The α-carbon acts as a nucleophile, not as an electrophilic carbocation."
    },
    {
      q:"Beta-keto acids (like acetoacetate) readily decarboxylate upon heating via a cyclic transition state. What feature of a beta-keto acid enables this unusually easy decarboxylation?",
      choices:[
        "The β-carbonyl accepts electrons through a six-membered cyclic transition state",
        "Electrostatic repulsion between two carboxylate groups weakens the C–C bond",
        "Heating converts it to an acid chloride that spontaneously loses CO",
        "A metal cofactor is required, so the reaction cannot occur thermally"
      ],
      ans:0,
      exp:"In the **six-membered cyclic transition state**, the carboxyl O–H proton transfers to the β-carbonyl oxygen while the C–C bond breaks, so the β-carbonyl acts as an electron sink; CO₂ leaves and the enol tautomerizes to a ketone. A β-keto acid has only one carboxyl group, so carboxylate repulsion is not the reason; α-keto acids such as pyruvate lack this geometry and need an enzyme with TPP as the electron sink."
    },
    {
      q:"A chemist wants to reduce the aldehyde group of a molecule that also contains a carboxylic acid, without reducing the acid. Which reducing agent should she use?",
      choices:[
        "LiAlH₄, which reduces aldehydes, ketones, esters, and acids",
        "NaBH₄, which reduces aldehydes and ketones but not carboxylic acids",
        "PCC, which selectively converts aldehydes to primary alcohols",
        "H₂ with Lindlar's catalyst, which reduces only aldehyde C=O bonds"
      ],
      ans:1,
      exp:"**NaBH₄** is a mild hydride donor that reduces aldehydes and ketones to alcohols but leaves carboxylic acids, esters and amides untouched, so it is chemoselective here. LiAlH₄ would also reduce the acid to a primary alcohol, PCC is an oxidant, and Lindlar's catalyst is used to reduce alkynes to cis-alkenes."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE OC3: Stereochemistry & Isomers
// ══════════════════════════════════════════════════
{
  id:'p_oc_3',
  topic:'Bonding & Structure',
  title:'Stereoisomerism in Drug Development and Amino Acid Chemistry',
  passage:`Stereochemistry is clinically critical: the (R)- and (S)-enantiomers of a drug often have dramatically different pharmacological activities. Thalidomide is the canonical example — the (R)-enantiomer was sedative while the (S)-enantiomer caused teratogenic effects. Unfortunately, thalidomide racemizes in vivo, making chiral separation clinically irrelevant in this case.

Ibuprofen provides a better model: the (S)-enantiomer is the active COX inhibitor; the (R)-form is largely inactive but is converted in vivo to (S)-ibuprofen by an isomerase. Pharmaceutical manufacturers nonetheless sell enantiopure (S)-ibuprofen as dexibuprofen.

In amino acid chemistry, all 20 standard amino acids (except glycine) are L-configuration at the alpha-carbon. This corresponds to the (S) absolute configuration by the CIP (Cahn-Ingold-Prelog) priority rules for all amino acids except cysteine, which is (R) due to the high atomic priority of sulfur in its R-group.

A compound is identified as a meso compound when it contains chiral centers but has an internal plane of symmetry, rendering it optically inactive.`,
  questions:[
    {
      q:"Glycine is the only standard amino acid that is not chiral. What structural feature makes glycine achiral while all other amino acids are chiral?",
      choices:[
        "It lacks a carboxyl group, so its α-carbon has no ionizable groups",
        "Its α-carbon bears two hydrogens, so it lacks four different groups",
        "It has the R configuration, which is achiral by convention",
        "Its cyclic side chain creates an internal plane of symmetry"
      ],
      ans:1,
      exp:"A stereocenter needs **four different substituents**; glycine's α-carbon carries NH₂, COOH and two H atoms, so its mirror image is superimposable. Glycine does have a carboxyl group, and the cyclic side chain belongs to proline, which is chiral."
    },
    {
      q:"Cysteine is an L-amino acid like the others, yet its alpha-carbon is (R) by CIP rules while the other chiral L-amino acids are (S). What causes this difference?",
      choices:[
        "Cysteine is actually a D-amino acid, so both systems agree",
        "Sulfur makes –CH₂SH outrank –COOH, flipping the CIP descriptor",
        "Cysteine racemizes spontaneously, so it exists as both R and S",
        "Its α-carbon has the opposite spatial arrangement from other L-amino acids"
      ],
      ans:1,
      exp:"CIP priority is decided at the first point of difference: the side-chain carbon of cysteine bears (S, H, H) while the carboxyl carbon bears (O, O, O), and S (Z = 16) beats O (Z = 8), so the order becomes NH₂ > CH₂SH > COOH > H. The **3D arrangement is the same L arrangement** as other amino acids; only the priority ranking, and therefore the R/S label, changes."
    },
    {
      q:"A molecule with two chiral centers and an internal plane of symmetry is classified as a meso compound. What is the optical rotation of a meso compound?",
      choices:[
        "Strongly positive, because the two stereocenters act additively",
        "Strongly negative, because meso compounds are levorotatory",
        "Zero, because the internal mirror plane makes the molecule achiral",
        "Unpredictable without each stereocenter's specific rotation"
      ],
      ans:2,
      exp:"A meso compound is superimposable on its mirror image, so despite its stereocenters it is **achiral** and has zero optical rotation (the two halves are mirror images and their effects cancel internally). A racemic mixture is also optically inactive, but it is a 50:50 mixture of two chiral enantiomers, not a single achiral compound."
    },
    {
      q:"Using the CIP priority rules, if four substituents on a chiral carbon have the priority order 1 > 2 > 3 > 4, and when oriented with group 4 pointing away, the order 1→2→3 is clockwise, what is the configuration?",
      choices:[
        "S, because clockwise with the lowest priority in back is S",
        "R, because clockwise with the lowest priority in back is R",
        "E, because the E/Z system applies to sp³ stereocenters",
        "L, because the D/L system is used for CIP assignments"
      ],
      ans:1,
      exp:"With the lowest-priority group pointing away, a **clockwise** 1→2→3 path is **R** (rectus) and counterclockwise is S (sinister). If the lowest-priority group points toward the viewer, the observed direction must be reversed; E/Z describes double bonds, and D/L is a separate Fischer-projection convention."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE OC4: Spectroscopy
// ══════════════════════════════════════════════════
{
  id:'p_oc_4',
  topic:'Spectroscopy',
  title:'Spectroscopic Identification of Unknown Organic Compounds',
  passage:`A forensic chemist receives an unknown liquid (compound X) and uses multiple spectroscopic techniques to determine its structure.

IR spectroscopy: A very broad absorption spanning roughly 2500–3300 cm⁻¹, a strong absorption at 1710 cm⁻¹, and C-H stretches near 2900 cm⁻¹. No sharp N-H peak near 3300 cm⁻¹.

Mass spectrometry: The molecular ion peak appears at m/z = 88. The M+1 peak is 4.4% relative to M, and there is no significant M+2 peak beyond natural background.

¹H NMR: Three signals. Signal A integrates for 6H and appears at δ 1.2 ppm (doublet). Signal B integrates for 1H and appears at δ 2.6 ppm (septet). Signal C integrates for 1H and appears at δ 12.1 ppm (broad singlet).

The chemist also receives compound Y, which shows a sharp IR peak at 1740 cm⁻¹, no O-H broad absorption, and a ¹H NMR spectrum with signals at δ 3.7 ppm (singlet, 3H) and δ 2.1 ppm (singlet, 3H), consistent with methyl acetate.`,
  questions:[
    {
      q:"Using the mass spectrum of compound X, how many carbon atoms does the molecule contain?",
      choices:[
        "2 carbons",
        "4 carbons",
        "6 carbons",
        "7 carbons"
      ],
      ans:1,
      exp:"Each carbon has a 1.1% chance of being ¹³C, so the M+1 intensity ≈ 1.1% × (number of C): 4.4 / 1.1 = **4 carbons**. Dividing the molecular weight by 12 (88/12 ≈ 7) ignores the mass of hydrogens and oxygens; here 4 C (48) + 8 H (8) + 2 O (32) = 88, i.e., C₄H₈O₂."
    },
    {
      q:"The IR spectrum of compound X shows a very broad absorption from about 2500 to 3300 cm⁻¹ and a strong absorption at 1710 cm⁻¹. Which functional group is most consistent with both absorptions?",
      choices:[
        "Primary amine: N–H stretch near 3300 and C=N near 1650 cm⁻¹",
        "Alcohol: O–H stretch near 3300 and C–O stretch near 1050 cm⁻¹",
        "Carboxylic acid: broad O–H at 2500–3300 and C=O near 1710 cm⁻¹",
        "Ketone: C=O near 1715 cm⁻¹ and no O–H absorption at all"
      ],
      ans:2,
      exp:"A **carboxylic acid** shows a very broad O–H band (2500–3300 cm⁻¹, from hydrogen-bonded dimers) overlapping the C–H stretches, plus a C=O near 1710 cm⁻¹. An alcohol's O–H (3200–3550 cm⁻¹) is narrower and there would be no carbonyl; a ketone has the C=O but no O–H band."
    },
    {
      q:"The ¹H NMR of compound X shows Signal A as a doublet at δ 1.2 ppm (6H), Signal B as a septet at δ 2.6 ppm (1H), and Signal C as a broad singlet at δ 12.1 ppm (1H). What does the doublet splitting pattern of Signal A indicate?",
      choices:[
        "Signal A has two equivalent neighboring protons",
        "Signal A has one neighboring proton",
        "Signal A is split by long-range coupling to the carbonyl carbon",
        "Signal A is an exchangeable proton split by restricted rotation"
      ],
      ans:1,
      exp:"By the **n + 1 rule**, a doublet (2 peaks) means n = 1 neighboring H. Signal A is two equivalent CH₃ groups on one CH, and that CH (Signal B) is split by six neighbors into a septet (6 + 1 = 7); Signal C at 12.1 ppm is the COOH proton, giving (CH₃)₂CH–COOH, isobutyric acid (C₄H₈O₂, MW 88). Two neighbors would give a triplet."
    },
    {
      q:"Compound Y shows an IR carbonyl at 1740 cm⁻¹ (vs. 1710 cm⁻¹ for compound X) and no broad O-H absorption. What functional group does compound Y contain, and why is its carbonyl frequency higher than that of compound X?",
      choices:[
        "Ketone; with no oxygen donor, a ketone C=O absorbs near 1740 cm⁻¹",
        "Ester; acid C=O is lowered by H-bonded dimers, which esters cannot form",
        "Aldehyde; with no O–H band, an acid is excluded and an aldehyde remains",
        "Amide; nitrogen donation raises an amide C=O to about 1740 cm⁻¹"
      ],
      ans:1,
      exp:"**Ester** C=O stretches appear at ~1735–1750 cm⁻¹. Carboxylic acids exist as **hydrogen-bonded dimers**, and H-bonding to the carbonyl oxygen weakens the C=O and lowers it to ~1710 cm⁻¹ (a free monomeric acid absorbs near 1760 cm⁻¹); esters have no O–H, so they lack both the broad band and the H-bond lowering. The NMR singlets at 3.7 ppm (OCH₃) and 2.1 ppm (CH₃C=O) fit methyl acetate; amide resonance lowers, not raises, the C=O frequency (~1650–1690 cm⁻¹)."
    }
  ]
},

// ══════════════════════════════════════════════════
// PASSAGE OC5: Separations & Carboxylic Acids
// ══════════════════════════════════════════════════
{
  id:'p_oc_5',
  topic:'Separations & Lab Techniques',
  title:'Purification Strategies and Carboxylic Acid Reactivity',
  passage:`A pharmaceutical synthesis produces a crude mixture containing: (1) the desired product, methyl benzoate (an ester, nonpolar, MW 136), (2) an unreacted carboxylic acid starting material, benzoic acid (polar, MW 122, pKa 4.2), and (3) an aniline byproduct (an amine, MW 93, pKb 9.4, pKa of conjugate acid = 4.6).

The chemist uses a liquid-liquid extraction strategy. She dissolves the mixture in diethyl ether (organic layer) and performs three successive washes: Wash 1 uses aqueous NaHCO₃ (pH ~8.3); Wash 2 uses aqueous HCl (pH ~1); Wash 3 uses water.

After each wash, the aqueous layer is drained off separately. The compounds are recovered by adjusting the pH of each aqueous wash: the NaHCO₃ wash is acidified to precipitate the carboxylic acid, and the HCl wash is basified to free the amine.

On a separate day, the chemist uses thin-layer chromatography (TLC) with a silica gel plate and hexane/ethyl acetate (4:1) as mobile phase to monitor the reaction progress, calculating retention factors for each component.`,
  questions:[
    {
      q:"In Wash 1 (aqueous NaHCO₃, pH ~8.3), which compound is selectively extracted into the aqueous layer, and why?",
      choices:[
        "Methyl benzoate, because its ester oxygens make it water-soluble",
        "Aniline, because bicarbonate converts it into a water-soluble salt",
        "Benzoic acid, because at pH 8.3 it is ionized to water-soluble benzoate",
        "All three, because bicarbonate ionizes every functional group present"
      ],
      ans:2,
      exp:"At pH 8.3, about four units above its pKa of 4.2, benzoic acid is >99.9% deprotonated to **benzoate**, an ion that partitions into water. Aniline stays neutral at pH 8.3 (anilinium pKa ≈ 4.6, so the free base predominates) and remains in the ether with the neutral ester; bicarbonate is too weak a base to deprotonate phenols or alcohols either."
    },
    {
      q:"After Wash 1 removes benzoic acid, Wash 2 uses aqueous HCl (pH ~1). Which compound is now extracted into the aqueous layer?",
      choices:[
        "Methyl benzoate, because esters hydrolyze at once in cold dilute acid",
        "Aniline, because at pH 1 it is protonated to water-soluble anilinium",
        "Residual benzoic acid, because HCl completes the acid extraction",
        "Neither, because both remaining compounds stay neutral at pH 1"
      ],
      ans:1,
      exp:"Aniline is a weak base (pKb 9.4; anilinium pKa 4.6). At pH 1, more than 3 units below 4.6, it is essentially fully protonated to **PhNH₃⁺**, which is ionic and moves into the aqueous layer, while the neutral ester stays in ether. Ester hydrolysis is slow without heat, and protonating benzoic acid would make it less, not more, water-soluble."
    },
    {
      q:"The crude mixture is spotted on a TLC plate (silica gel, hexane/ethyl acetate 4:1 mobile phase). Which component would have the highest Rf value?",
      choices:[
        "Benzoic acid, because it interacts most strongly with the mobile phase",
        "Methyl benzoate, because it is least polar and binds silica most weakly",
        "Aniline, because amines are the least polar of the three compounds",
        "All three equally, because their molecular weights are similar"
      ],
      ans:1,
      exp:"Silica is a **polar stationary phase**, so the least polar compound spends the most time in the nonpolar eluent and travels farthest (highest Rf = spot distance ÷ solvent-front distance). Polarity here runs benzoic acid (H-bond donor and acceptor) > aniline (N–H donor) > methyl benzoate (acceptor only), so the ester runs highest and the acid lowest."
    },
    {
      q:"Fischer esterification converts benzoic acid to methyl benzoate using methanol and an acid catalyst. The reaction is reversible. Which strategy best drives the equilibrium toward product formation?",
      choices:[
        "Use a strong base to deprotonate the acid and boost its reactivity",
        "Use excess methanol or remove water as it forms",
        "Use LiAlH₄ to convert the carboxylic acid directly into the ester",
        "Run the reaction at very low temperature to slow the reverse reaction"
      ],
      ans:1,
      exp:"RCOOH + CH₃OH ⇌ RCOOCH₃ + H₂O; by **Le Châtelier's principle**, a large excess of methanol (often the solvent) or removal of water (Dean-Stark trap, molecular sieves) shifts the equilibrium toward ester. Base would convert the acid to the unreactive carboxylate anion, and the acid catalyst speeds both directions without changing the equilibrium position."
    }
  ]
},

]; // end OCHEM_PASSAGES


// Merge all passages into unified array
const PHYSICS_PASSAGES = [

// ══════════════════════════════════════════════
// PASSAGE PH1: Fluids & Cardiovascular Hemodynamics
// ══════════════════════════════════════════════
{
  id:'p_ph_1',
  topic:'Fluids',
  title:'Hemodynamics and Fluid Mechanics in the Cardiovascular System',
  passage:`The cardiovascular system is a closed fluid circuit governed by the same physical principles as any hydraulic system. Blood flows from high pressure (aorta, ~120 mmHg systolic) to low pressure (right atrium, ~5 mmHg), driven by the pressure gradient generated by left ventricular contraction.

The circulatory system branches from the aorta into progressively smaller arteries, arterioles, and eventually ~10 billion capillaries. Although each individual capillary has a tiny cross-sectional area, the total cross-sectional area of all capillaries combined is enormous — approximately 4,500 cm² compared to ~4 cm² for the aorta. As a consequence of the continuity equation, blood velocity slows dramatically in the capillary bed (~0.04 cm/s vs ~40 cm/s in the aorta), which is essential for gas and nutrient exchange.

Atherosclerotic plaques reduce arterial lumen diameter. According to Poiseuille's law, flow rate Q = (πr⁴ΔP)/(8ηL). A 50% reduction in radius reduces flow rate by a factor of 16, explaining why moderate stenosis causes profound flow limitation. The body compensates by increasing the pressure gradient (elevating BP), but this further stresses vessel walls.

Blood viscosity (approximately 3–4× that of water) is primarily determined by hematocrit. In severe anemia (low hematocrit), viscosity decreases and cardiac output must increase to maintain oxygen delivery.`,
  questions:[
    {
      q:"Blood velocity is ~40 cm/s in the aorta but only ~0.04 cm/s in capillaries, despite the same total flow rate (cardiac output). Which principle explains this?",
      choices:[
        "Bernoulli's equation: lower capillary pressure slows the flow",
        "The continuity equation: total area rises, so velocity falls",
        "Poiseuille's law: each capillary's small radius raises resistance",
        "Pascal's principle: pressure is transmitted equally throughout"
      ],
      ans:1,
      exp:"By **continuity**, Q = A₁v₁ = A₂v₂: the same cardiac output passes through a total capillary area (~4,500 cm²) about 1,100 times that of the aorta (~4 cm²), so velocity falls to about 40/1,100 ≈ 0.04 cm/s, giving time for exchange. Poiseuille's law relates flow to pressure and resistance; it does not set velocity from cross-sectional area."
    },
    {
      q:"A 50% reduction in arterial radius reduces blood flow rate by a factor of 16. Which mathematical relationship in Poiseuille's law produces this non-intuitive result?",
      choices:[
        "Q ∝ 1/r",
        "Q ∝ r²",
        "Q ∝ r⁴",
        "Q ∝ √r"
      ],
      ans:2,
      exp:"In Q = πr⁴ΔP/(8ηL), flow scales with the **fourth power of radius**, so halving r gives (1/2)⁴ = 1/16 of the flow at the same ΔP. A Q ∝ r² dependence would give only a 4-fold drop; the r⁴ term is also why small changes in arteriolar tone control resistance so powerfully."
    },
    {
      q:"In severe anemia, hematocrit drops from 45% to 20%, reducing blood viscosity by approximately half. How does this affect the Poiseuille flow rate, assuming a constant pressure gradient?",
      choices:[
        "It halves, because lower viscosity impairs flow",
        "It doubles, because η is in the denominator",
        "It is unchanged, because η is not in Poiseuille's law",
        "It rises 16-fold, because η enters to the fourth power"
      ],
      ans:1,
      exp:"Viscosity appears to the first power in the **denominator** of Q = πr⁴ΔP/(8ηL), so halving η doubles Q for the same ΔP. Only the radius is raised to the fourth power. The faster flow helps offset, but cannot fully replace, the lower O₂ content per liter of anemic blood."
    },
    {
      q:"The venturi effect describes what happens to pressure when blood flows through a coronary stenosis. A partially occluded artery acts like a venturi tube. What happens to blood velocity and lateral pressure at the stenosis?",
      choices:[
        "Velocity falls and lateral pressure rises",
        "Velocity rises and lateral pressure falls",
        "Velocity and lateral pressure both rise",
        "Velocity and lateral pressure both fall"
      ],
      ans:1,
      exp:"Continuity forces velocity up where the area narrows, and by **Bernoulli's equation** (P + ½ρv² + ρgh = constant) the rise in kinetic energy per volume must come from a fall in static (lateral) pressure. Pressure and velocity therefore change in opposite directions at a constriction; the low lateral pressure can even cause partial collapse of a stenotic segment."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE PH2: Electricity, Circuits & Cardiac Physiology
// ══════════════════════════════════════════════
{
  id:'p_ph_2',
  topic:'Electricity & Magnetism',
  title:'Electrical Principles and Cardiac Electrophysiology',
  passage:`The heart's electrical conduction system mirrors many principles of classical circuit theory. The sinoatrial (SA) node acts as the primary voltage source, spontaneously generating action potentials that propagate through the myocardium. Cardiac muscle cells are electrically connected via gap junctions, allowing current to flow from cell to cell.

The electrocardiogram (ECG) measures the potential difference (voltage) between surface electrodes. Normal sinus rhythm produces characteristic P, QRS, and T waves corresponding to atrial depolarization, ventricular depolarization, and ventricular repolarization.

In a clinical electrophysiology lab, a cardiologist places a catheter with multiple electrodes along the His bundle and measures conduction velocity (approximately 2–4 m/s in the His-Purkinje system, compared to ~0.05 m/s in the AV node). The AV node's slow conduction acts analogously to a resistor in a circuit, providing the PR interval delay that allows ventricular filling before contraction.

Implantable cardioverter-defibrillators (ICDs) store electrical energy in a capacitor (typically up to 30–40 joules) and discharge it across the heart to terminate ventricular fibrillation. The energy stored in a capacitor is given by U = ½CV².`,
  questions:[
    {
      q:"An ICD capacitor stores 35 J of energy and charges to a voltage of 750 V. What capacitance is required? (U = ½CV²)",
      choices:[
        "62 μF",
        "124 μF",
        "1.24 mF",
        "93 mF"
      ],
      ans:1,
      exp:"C = 2U/V² = 2(35 J)/(750 V)² = 70/562,500 ≈ 1.24 × 10⁻⁴ F = **124 μF**, typical of ICD capacitors. Forgetting the factor of 2 gives 62 μF, and dividing by V instead of V² gives 93 mF."
    },
    {
      q:"The AV node slows conduction velocity to ~0.05 m/s compared to ~2–4 m/s in the His-Purkinje system. Which circuit analogy best describes the AV node's function?",
      choices:[
        "A capacitor that stores charge and releases it in a burst",
        "A voltage source that fires independently of the SA node",
        "A series resistor that slows conduction, producing the PR delay",
        "A parallel branch that lets conduction bypass the SA node"
      ],
      ans:2,
      exp:"The AV node sits **in series** between atria and ventricles, and its slow conduction (few gap junctions, Ca²⁺-dependent upstroke) acts like a high-resistance element that produces the PR interval (normally 120–200 ms), giving the atria time to finish filling the ventricles. First-degree AV block (PR > 200 ms) is like a larger series resistance; the AV node can act as a backup pacemaker, but that is not its role in normal conduction."
    },
    {
      q:"Cardiac ventricular cells at rest maintain a membrane potential of approximately -90 mV (inside negative). This represents which electrical quantity?",
      choices:[
        "A current of negative charge flowing outward",
        "A resistance to charge movement across the membrane",
        "A voltage arising from charge separated across the membrane",
        "A capacitance, the membrane's ability to store charge"
      ],
      ans:2,
      exp:"The resting membrane potential is a **voltage** (potential difference) created by a tiny separation of charge across the membrane, set mainly by K⁺ leaking out down its gradient toward E_K (~−90 to −95 mV). The membrane does behave as a capacitor that holds this separated charge, but −90 mV is the potential difference, not the capacitance."
    },
    {
      q:"In the ECG circuit, leads I, II, and III are arranged according to Einthoven's triangle. Lead II voltage = Lead I voltage + Lead III voltage (Einthoven's law). Which circuit law does this exemplify?",
      choices:[
        "Coulomb's law, relating force between point charges",
        "Ohm's law, relating voltage to current and resistance",
        "Kirchhoff's voltage law, summing potentials around a loop",
        "Kirchhoff's current law, conserving charge at a junction"
      ],
      ans:2,
      exp:"The three limb leads form a closed loop, and **Kirchhoff's voltage law** says the potential changes around a closed loop sum to zero: with I = V_LA − V_RA, II = V_LL − V_RA and III = V_LL − V_LA, I + III = II. The current (junction) law expresses conservation of charge at a node, which is not what lead voltages describe."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE PH3: Waves, Sound & Medical Imaging
// ══════════════════════════════════════════════
{
  id:'p_ph_3',
  topic:'Waves, Sound & Light',
  title:'Wave Physics in Diagnostic Imaging',
  passage:`Modern diagnostic imaging exploits wave properties across the electromagnetic and acoustic spectrum. Ultrasound uses longitudinal pressure waves at frequencies of 1–20 MHz (above human hearing range of 20 Hz–20 kHz). Higher frequency ultrasound provides better spatial resolution but less tissue penetration, explaining why superficial structures (thyroid, vascular access) use 7–15 MHz probes while abdominal imaging uses 2–5 MHz.

The Doppler ultrasound effect allows velocity measurement of moving structures (e.g., blood flow). When an ultrasound probe emits at frequency f₀ and blood moves toward the probe at velocity v, the reflected signal is received at a higher frequency f_detected = f₀(c+v)/(c-v), where c is the speed of sound in tissue (~1540 m/s). For v << c, the shift is approximately Δf ≈ 2f₀v/c.

In ophthalmology, the eye's optical system involves refraction at the cornea (accounts for ~2/3 of total refracting power) and lens. Myopia (nearsightedness) results from the focal point falling in front of the retina; corrected with a diverging (concave) lens. Hyperopia uses a converging (convex) lens.

MRI uses radiofrequency electromagnetic waves (~42–300 MHz, in the radiofrequency range) to excite nuclear spins, while CT uses X-rays (~10¹⁸ Hz, ionizing radiation). Both create cross-sectional images but use fundamentally different wave phenomena.`,
  questions:[
    {
      q:"A vascular sonographer uses Doppler ultrasound to detect blood flow. The probe emits at 5.000 MHz and detects a return frequency of 5.002 MHz. What does this indicate?",
      choices:[
        "Blood is moving away from the probe, compressing the returning waves",
        "Blood is moving toward the probe, compressing the returning waves",
        "The probe is faulty, because echoes return at the emitted frequency",
        "Blood viscosity has risen, shifting the echoes to higher frequency"
      ],
      ans:1,
      exp:"A reflector moving **toward** the probe compresses the wavefronts, so the echo returns at a higher frequency (motion away lowers it), just as an approaching siren sounds higher. Here Δf = 2 kHz, so v ≈ cΔf/(2f₀) = (1540 × 2000)/(2 × 5 × 10⁶) ≈ 0.3 m/s, a normal arterial velocity; frequency shifts come from motion, not viscosity."
    },
    {
      q:"A 15 MHz ultrasound probe gives excellent images of a superficial lymph node but cannot image abdominal organs. A 3.5 MHz probe images the abdomen well but cannot resolve small structures. What wave property accounts for this tradeoff?",
      choices:[
        "Higher frequency gives shorter wavelength: finer resolution, more attenuation",
        "Higher frequency waves travel faster in tissue, leaving less imaging time",
        "Lower frequency waves are transverse and penetrate better than longitudinal ones",
        "Frequency sets only the pitch of sound, not resolution or penetration"
      ],
      ans:0,
      exp:"Since λ = v/f and v in tissue is fixed (~1540 m/s), 15 MHz gives λ ≈ 0.1 mm (fine **resolution**) while 3.5 MHz gives λ ≈ 0.44 mm; but attenuation in soft tissue rises roughly in proportion to frequency, so high-frequency beams lose energy within a few centimeters. Wave speed depends on the medium, not on frequency, and ultrasound in soft tissue is longitudinal at every frequency."
    },
    {
      q:"A patient with myopia has an eye whose optical power is too strong for its length, so a diverging (concave) lens is prescribed. Where does a diverging lens form its image of a distant object?",
      choices:[
        "Real and inverted, at the focal point beyond the lens",
        "At infinity, because diverging lenses do not bend parallel rays",
        "Virtual and upright, at the focal point on the object's side",
        "Real and inverted, on the same side of the lens as the object"
      ],
      ans:2,
      exp:"For an object at infinity, 1/f = 1/dₒ + 1/dᵢ gives dᵢ = f, and for a diverging lens f < 0, so the image is **virtual and upright** at the focal point on the object's side. The eye then sees light that seems to come from this nearer point, which moves the myopic focus back onto the retina; a single diverging lens never forms a real image of a real object."
    },
    {
      q:"Young's double-slit experiment demonstrates that light exhibits wave behavior. In the experiment, if the slit separation is halved (d → d/2), what happens to the fringe spacing (the distance between bright fringes)?",
      choices:[
        "It halves, because closer slits crowd the fringes together",
        "It doubles, because fringe spacing equals λL/d",
        "It is unchanged, because spacing depends only on wavelength",
        "The pattern vanishes, because closer slits cannot interfere"
      ],
      ans:1,
      exp:"For small angles, bright-fringe spacing is **Δy = λL/d**, so halving d doubles the spacing: with closer slits the path difference grows more slowly with angle. The intuition that closer slits crowd the fringes is backward; this same inverse relation is why gratings with very small d spread colors widely."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE PH4: Nuclear Physics & Radiation in Medicine
// ══════════════════════════════════════════════
{
  id:'p_ph_4',
  topic:'Nuclear & Atomic Physics',
  title:'Radioactive Decay and Clinical Applications of Nuclear Medicine',
  passage:`Nuclear medicine uses radioactive isotopes to image physiological processes and treat disease. PET scanning uses positron-emitting isotopes (β⁺ decay); SPECT uses gamma-emitting isotopes. Technetium-99m (⁹⁹ᵐTc), the most widely used nuclear medicine agent, decays by gamma emission with a half-life of 6 hours, ideal for same-day imaging with acceptable radiation dose.

Iodine-131 (¹³¹I, t₁/₂ = 8 days) undergoes β⁻ decay followed by gamma emission. It concentrates in thyroid tissue via the sodium-iodide symporter, allowing both diagnostic imaging and ablative therapy for thyroid cancer and hyperthyroidism.

Radiation dose is measured in Gray (Gy, J/kg of tissue) for absorbed dose and Sievert (Sv) for biologically weighted dose. Different radiation types have different relative biological effectiveness (RBE): alpha particles have RBE = 20 (most damaging per unit energy, due to dense ionization), beta particles RBE ≈ 1, and gamma/X-rays RBE = 1.

Radioactive decay follows first-order kinetics: N(t) = N₀e^(-λt), where λ = ln(2)/t₁/₂. After n half-lives, the fraction remaining = (1/2)ⁿ.`,
  questions:[
    {
      q:"A patient receives ⁹⁹ᵐTc for a bone scan at 8:00 AM. The hospital radiation safety protocol requires activity to fall below 1/16 of the administered activity before the patient can return to close contact with young children. When can the patient resume normal contact? (t₁/₂ of ⁹⁹ᵐTc = 6 hours; consider physical decay only)",
      choices:[
        "After 12 hours (8:00 PM the same day)",
        "After 18 hours (2:00 AM the next day)",
        "After 24 hours (8:00 AM the next day)",
        "After 48 hours (8:00 AM two days later)"
      ],
      ans:2,
      exp:"1/16 = (1/2)⁴, so **4 half-lives** × 6 h = 24 h, i.e., 8:00 AM the next day. After 12 h (2 half-lives) 1/4 remains and after 18 h (3 half-lives) 1/8 remains; in practice urinary excretion makes the effective half-life even shorter than the physical one."
    },
    {
      q:"¹³¹I treats hyperthyroidism via β⁻ decay. In β⁻ decay, a neutron converts to a proton with emission of an electron and antineutrino. What happens to the atomic number (Z) of iodine (Z=53) after β⁻ decay?",
      choices:[
        "Z decreases by 1, giving tellurium-131",
        "Z increases by 1, giving xenon-131",
        "Z is unchanged, and only the mass number changes",
        "Z decreases by 2, giving antimony-127"
      ],
      ans:1,
      exp:"In β⁻ decay n → p + e⁻ + ν̄, so **Z rises by 1** while A is unchanged: ¹³¹I (Z = 53) → ¹³¹Xe (Z = 54). A decrease of 1 in Z describes β⁺ decay or electron capture, and loss of 2 protons with A − 4 describes alpha decay; the short-range β⁻ particles (up to ~2 mm in tissue) deposit their energy within the thyroid."
    },
    {
      q:"An alpha particle and a beta particle are each absorbed by thyroid tissue, delivering 1 mGy of absorbed dose each. Which delivers the greater biological damage, and why?",
      choices:[
        "Neither, because equal absorbed dose in gray means equal effect",
        "The beta particle, because electrons penetrate deeper into tissue",
        "The alpha particle, because a weighting of 20 gives 20 mSv vs 1 mSv",
        "Neither can be judged without knowing the photon energy"
      ],
      ans:2,
      exp:"Equivalent dose (Sv) = absorbed dose (Gy) × radiation weighting factor (RBE): 1 mGy × 20 = **20 mSv for alpha** vs 1 mGy × 1 = 1 mSv for beta. Alpha particles deposit their energy densely along a ~50 μm track, causing hard-to-repair double-strand DNA breaks; deeper penetration spreads beta energy more thinly, so it does not mean more damage per gray."
    },
    {
      q:"A researcher measures the activity of a radioactive sample over time and plots the data. The decay curve is exponential. If the researcher takes the natural log of activity vs time, what graph shape results, and what does the slope equal?",
      choices:[
        "A curve, since the log of an exponential remains curved",
        "A straight line with slope equal to −λ",
        "A straight line with slope equal to +λ",
        "A parabola, since radioactive decay is second order"
      ],
      ans:1,
      exp:"Taking logs of N = N₀e^(−λt) gives ln N = ln N₀ − λt, a **straight line** with slope **−λ** and intercept ln N₀; then t₁/₂ = ln 2/|slope|. The slope is negative because activity falls with time, and a curved semi-log plot would suggest a mixture of isotopes."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE PH5: Research Methods & Clinical Study Design
// ══════════════════════════════════════════════
{
  id:'p_ph_5',
  topic:'Research Methods & Statistics',
  title:'Clinical Trial Design and Statistical Interpretation',
  passage:`A pharmaceutical company conducts a randomized controlled trial (RCT) of a new antihypertensive drug. 500 patients with stage 1 hypertension (SBP 130–139 mmHg) are randomized 1:1 to the new drug or placebo. The primary endpoint is reduction in SBP at 12 weeks.

Results: Drug group mean SBP decrease = 12 mmHg (SD = 26 mmHg); Placebo group mean decrease = 5 mmHg (SD = 26 mmHg). The difference of 7 mmHg has a p-value of 0.003 and a 95% confidence interval of [2.4, 11.6 mmHg].

A second analysis examines whether the drug effect varies by baseline BMI. In patients with BMI < 30, the drug reduces SBP by 9 mmHg relative to placebo; in patients with BMI ≥ 30, the reduction is 4 mmHg. The investigators label BMI as a moderating variable.

Critics of the trial note: (1) patients and physicians were not blinded to treatment allocation ("open-label"), introducing potential bias; (2) the study excluded patients with chronic kidney disease, raising concerns about generalizability; and (3) the company's statistician performed 12 secondary outcome analyses, finding 2 statistically significant results.`,
  questions:[
    {
      q:"The 7 mmHg difference in SBP reduction has a p-value of 0.003. What does this p-value mean?",
      choices:[
        "There is a 0.3% probability that the drug has no real effect",
        "There is a 99.7% probability that the drug truly lowers SBP",
        "If H₀ were true, a difference this large would occur 0.3% of the time",
        "The true reduction is exactly 7 mmHg with 99.7% certainty"
      ],
      ans:2,
      exp:"A p-value is the probability of a result **at least this extreme if the null hypothesis is true**; here a ≥7 mmHg difference would arise by chance only 0.3% of the time with no real effect, so H₀ is rejected at α = 0.05. It is not the probability that the drug works, and it says nothing about effect size, which the confidence interval (2.4–11.6 mmHg) describes."
    },
    {
      q:"The open-label design (patients and physicians knew who received the drug) introduces which type of bias?",
      choices:[
        "Selection bias, from unequal randomization into the two arms",
        "Performance and detection bias, from knowing the assigned treatment",
        "Confounding bias, from an unmeasured variable linked to treatment",
        "Attrition bias, from differential loss to follow-up between arms"
      ],
      ans:1,
      exp:"Without blinding, clinicians may treat or counsel the groups differently (**performance bias**) and outcome assessors may measure or record results differently (**detection bias**), and patients' expectations can also change what they report. Selection bias concerns how patients are allocated, which randomization protects against even in an open-label trial; blinding is the remedy for performance and detection bias."
    },
    {
      q:"BMI is identified as a moderating variable — the drug effect is larger in patients with BMI < 30 (9 mmHg) than in patients with BMI ≥ 30 (4 mmHg). How does a moderating variable differ from a confounding variable?",
      choices:[
        "A moderator causes the outcome directly; a confounder never does",
        "A moderator changes the size of the effect; a confounder distorts the association",
        "A moderator is removed by randomization; a confounder can never be removed",
        "They are the same concept known by different names in different fields"
      ],
      ans:1,
      exp:"A **moderator** (effect modifier) changes the strength or direction of the treatment–outcome relationship across its levels, as BMI does here; a **confounder** is associated with both exposure and outcome and creates or distorts an apparent association. Randomization balances confounders between arms, but it does not remove effect modification, which is a real feature of how the drug works in different patients."
    },
    {
      q:"The company performed 12 secondary outcome analyses and found 2 statistically significant results at p < 0.05. A biostatistician argues these results may be false positives. What statistical concept explains this concern?",
      choices:[
        "Type II error, because the secondary analyses were underpowered",
        "Multiple comparisons, giving a ~46% chance of at least one false positive",
        "Regression to the mean across repeated blood pressure measurements",
        "Limited external validity, because CKD patients were excluded"
      ],
      ans:1,
      exp:"With 12 independent tests at α = 0.05, P(at least one false positive) = 1 − 0.95¹² ≈ 0.46, so 2 'hits' are easily produced by chance: the **multiple comparisons** problem. A Bonferroni correction would require p < 0.05/12 ≈ 0.004 for each test. A type II error is a missed true effect, the opposite problem."
    }
  ]
},

]; // end PHYSICS_PASSAGES

const BEHAVIORAL_PASSAGES = [

// ══════════════════════════════════════════════
// PASSAGE BS1: Neurotransmitters & Psychopharmacology
// ══════════════════════════════════════════════
{
  id:'p_bs_1',
  topic:'Biological Bases of Behavior',
  title:'Neurotransmitter Systems and Psychopharmacology',
  passage:`The monoamine hypothesis of depression proposes that major depressive disorder (MDD) results from deficient activity of monoamine neurotransmitters — particularly serotonin, norepinephrine, and dopamine — in the limbic system and prefrontal cortex. First-line pharmacotherapy targets these systems: selective serotonin reuptake inhibitors (SSRIs) block the serotonin transporter, increasing synaptic serotonin; SNRIs block both serotonin and norepinephrine reuptake.

The dopaminergic reward pathway (ventral tegmental area → nucleus accumbens) underlies reinforcement learning and is implicated in addiction. Drugs of abuse — cocaine (blocks dopamine reuptake), amphetamines (force dopamine release), and opioids (disinhibit VTA dopamine neurons by inhibiting GABAergic interneurons) — flood the nucleus accumbens with dopamine, producing intense reinforcement. With repeated use, the system undergoes neuroadaptation: receptor downregulation decreases baseline dopamine signaling, producing tolerance and withdrawal.

GABAergic interneurons provide inhibitory tone throughout the CNS. Benzodiazepines potentiate GABA-A receptor activity, producing anxiolysis, sedation, and anticonvulsant effects. Alcohol also enhances GABA-A receptor activity. Glutamate is the primary excitatory neurotransmitter; NMDA receptor antagonists (ketamine, PCP) produce dissociative states, and ketamine at subanesthetic doses has rapid antidepressant effects.`,
  questions:[
    {
      q:"A patient is prescribed an SSRI for MDD. The mechanism of action is blockade of the serotonin reuptake transporter (SERT). Which neurotransmission concept explains why SSRIs take 2–4 weeks to produce clinical antidepressant effects despite immediately increasing synaptic serotonin?",
      choices:[
        "SSRIs have poor oral bioavailability and take weeks to reach plasma levels",
        "Inhibitory 5-HT1A autoreceptors must desensitize before firing recovers",
        "SSRIs need several weeks to cross the blood–brain barrier",
        "Serotonin stores must be rebuilt by de novo synthesis over weeks"
      ],
      ans:1,
      exp:"Acutely, extra serotonin stimulates somatodendritic **5-HT1A autoreceptors** on raphe neurons, which reduce their firing and blunt the SSRI effect; over weeks these autoreceptors desensitize, firing recovers and serotonergic transmission rises (slower changes such as increased BDNF also contribute). SSRIs are well absorbed and enter the brain within hours, so pharmacokinetics do not explain the lag."
    },
    {
      q:"Cocaine and amphetamines both increase dopamine in the nucleus accumbens but via different mechanisms. Cocaine blocks dopamine reuptake transporters (DAT); amphetamines cause carrier-mediated dopamine efflux (run the transporter in reverse). What behavioral consequence follows from repeated amphetamine use, based on dopaminergic neuroadaptation?",
      choices:[
        "A lasting rise in baseline dopamine as D2 receptors upregulate",
        "Tolerance and anhedonia as D2 receptors are downregulated",
        "Stronger responses to natural rewards as reward circuits strengthen",
        "Selective destruction of serotonergic neurons, causing depression"
      ],
      ans:1,
      exp:"Repeated dopamine surges lead to **D2 receptor downregulation** and reduced baseline dopamine release, so the same dose produces less effect (tolerance) and natural rewards feel flat (anhedonia); the user increasingly takes the drug to escape this state (negative reinforcement). Natural rewards become less, not more, reinforcing, as PET studies of D2 availability in stimulant users show."
    },
    {
      q:"Benzodiazepines potentiate GABA-A receptor activity. GABA-A is a ligand-gated chloride channel. When GABA binds, chloride ions flow into the neuron. What is the net effect on neuronal excitability?",
      choices:[
        "Depolarization and more firing, as Cl⁻ influx raises the membrane potential",
        "Hyperpolarization and less firing, as Cl⁻ influx moves Vm away from threshold",
        "No change, because Cl⁻ movement does not influence membrane potential",
        "Brief hyperpolarization followed by rebound excitation and more firing"
      ],
      ans:1,
      exp:"In mature neurons, KCC2 keeps intracellular Cl⁻ low, so E_Cl (~−70 mV or below) is at or under the resting potential; opening GABA-A channels lets Cl⁻ in and **hyperpolarizes or clamps** the membrane away from threshold, producing an IPSP. Benzodiazepines increase the **frequency** of channel opening and barbiturates the **duration** ('frenzodiazepines, barbidurates'); entry of negative ions cannot depolarize these cells."
    },
    {
      q:"Ketamine produces rapid antidepressant effects within hours in treatment-resistant depression. Its mechanism is NMDA receptor antagonism. The NMDA receptor requires both glutamate binding AND membrane depolarization (to remove Mg²⁺ block) to conduct. What type of receptor is the NMDA receptor?",
      choices:[
        "A G protein–coupled receptor that acts through second messengers",
        "A ligand-gated ion channel that also needs depolarization to expel Mg²⁺",
        "A purely voltage-gated channel that opens without any neurotransmitter",
        "A metabotropic receptor that alters Ca²⁺ without conducting ions"
      ],
      ans:1,
      exp:"The NMDA receptor is an **ionotropic, ligand-gated** channel (glutamate plus a glycine/D-serine co-agonist) that is also **voltage-dependent**, because Mg²⁺ plugs the pore until the membrane depolarizes. Requiring both presynaptic release and postsynaptic depolarization makes it a coincidence detector for LTP; it conducts Ca²⁺ directly, so it is not metabotropic."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE BS2: Learning, Memory & Conditioning
// ══════════════════════════════════════════════
{
  id:'p_bs_2',
  topic:'Cognition, Learning & Memory',
  title:'Classical Conditioning, Operant Learning, and Memory Consolidation',
  passage:`Ivan Pavlov's work with dogs established the principles of classical (Pavlovian) conditioning: a neutral stimulus (bell) paired repeatedly with an unconditioned stimulus (food) acquires the ability to elicit a conditioned response (salivation) independently. John Watson extended this to human fear conditioning in the "Little Albert" experiment. Extinction occurs when the CS is repeatedly presented without the UCS, but it represents new inhibitory learning rather than erasure of the original association — spontaneous recovery demonstrates this.

B.F. Skinner's operant conditioning framework describes how consequences shape voluntary behavior. Positive reinforcement (adding a reward) and negative reinforcement (removing an aversive stimulus) both increase behavior frequency. Punishment decreases behavior. Schedules of reinforcement profoundly affect behavior: variable ratio schedules produce the highest and most resistant-to-extinction response rates (the mechanism underlying gambling addiction).

Memory consolidation involves transfer from hippocampus-dependent short-term traces to distributed neocortical long-term storage. During slow-wave (N3) sleep, hippocampal sharp-wave ripples reactivate recent memories, driving synaptic consolidation. The amnesic patient H.M., who underwent bilateral medial temporal lobe resection (removing most of both hippocampi and amygdalae), could not form new declarative memories (anterograde amnesia) but retained the ability to learn new motor skills and showed intact eyeblink conditioning — demonstrating that different memory systems are anatomically distinct.`,
  questions:[
    {
      q:"After Little Albert was conditioned to fear a white rat, he also showed fear responses to a white rabbit, a Santa Claus mask, and a fur coat. Which conditioning principle does this illustrate?",
      choices:[
        "Extinction, as the conditioned response weakens and spreads",
        "Stimulus generalization to stimuli resembling the original CS",
        "Second-order conditioning, with the rabbit serving as a new UCS",
        "Spontaneous recovery of the fear response after a rest period"
      ],
      ans:1,
      exp:"In **stimulus generalization**, stimuli similar to the conditioned stimulus (white, furry objects) elicit the conditioned response without separate training, more strongly the more similar they are. Second-order conditioning would require pairing a new neutral stimulus with an already-conditioned CS; the opposite of generalization is discrimination, learned through differential reinforcement."
    },
    {
      q:"A slot machine pays out on a variable ratio schedule. A patient who gambles compulsively would be best described as exhibiting behavior maintained by which reinforcement property of variable ratio schedules?",
      choices:[
        "Predictable reward timing that lets the gambler pace each bet",
        "Unpredictable payoffs that sustain high rates and resist extinction",
        "Continuous reinforcement, which yields the most persistent responding",
        "A known payout ratio that keeps the gambler betting until it is met"
      ],
      ans:1,
      exp:"On a **variable ratio** schedule, reinforcement follows an unpredictable number of responses, producing the highest steady response rates and the greatest **resistance to extinction**, because a long dry spell looks like any other gap before the next payout. Continuous reinforcement produces fast learning but the fastest extinction; a known ratio describes a fixed-ratio schedule."
    },
    {
      q:"H.M. lost the ability to form new declarative memories after bilateral medial temporal lobe resection but could still learn new motor skills (mirror tracing) and showed intact classical eyeblink conditioning. What does this dissociation demonstrate about memory systems?",
      choices:[
        "All memory depends on the hippocampus; his motor learning was not true memory",
        "Declarative memory needs medial temporal structures; procedural memory does not",
        "His resection was incomplete, which explains his preserved motor skills",
        "Procedural memory is stored in the hippocampus but resists damage better"
      ],
      ans:1,
      exp:"H.M. showed that **declarative** (explicit: episodic and semantic) memory depends on the hippocampus and medial temporal lobe, whereas **nondeclarative** memory uses other structures: motor skills rely on the basal ganglia and cerebellum, and eyeblink conditioning on the cerebellum, all intact in H.M. His surgery also removed much of both amygdalae, so fear conditioning is not the right example of what was spared."
    },
    {
      q:"During slow-wave (N3) sleep, memory consolidation occurs via hippocampal sharp-wave ripples. A student who pulls an all-nighter before an exam is impairing which memory process?",
      choices:[
        "Encoding, by blocking the formation of new memories during the exam",
        "Retrieval, because sleep is required to access any stored memory",
        "Consolidation, by preventing sleep-dependent stabilization of studied material",
        "Working memory, by selectively disabling the phonological loop"
      ],
      ans:2,
      exp:"Material studied before sleep is already **encoded**, but it stays labile and hippocampus-dependent until N3 sleep, when sharp-wave ripples and spindles replay it to neocortex; skipping sleep impairs this **consolidation**. Sleep loss also dulls attention, but retrieval does not require sleep in general."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE BS3: Social Psychology
// ══════════════════════════════════════════════
{
  id:'p_bs_3',
  topic:'Social Psychology & Society',
  title:'Social Influence, Conformity, and Group Dynamics',
  passage:`Stanley Milgram's obedience studies (1960s) demonstrated that ordinary people would administer what they believed to be lethal electric shocks to an innocent person when instructed by an authority figure. Approximately 65% of participants delivered the maximum 450-volt shock. Situational factors — proximity of the authority, proximity of the victim, presence of disobedient peers — dramatically modulated compliance rates.

Solomon Asch's conformity experiments used line-matching tasks in which confederates unanimously gave obviously wrong answers. Approximately 75% of participants conformed at least once. Normative social influence (desire to fit in) and informational social influence (uncertainty leading individuals to use others as information sources) are the two mechanisms driving conformity.

Philip Zimbardo's Stanford Prison Experiment reported rapid adoption of assigned social roles (guard vs. prisoner) within a simulated prison, although its methods have since been widely criticized. Such studies are often cited to show how situational factors can override individual dispositions. The fundamental attribution error is the tendency to overestimate dispositional factors while underestimating situational ones when explaining others' behavior.

Groupthink — the tendency for cohesive groups to prioritize consensus over critical evaluation — contributed to historical catastrophes including the Bay of Pigs invasion. Symptoms include illusion of invulnerability, collective rationalization, and pressure on dissenters. The bystander effect shows that the presence of others decreases individual likelihood of helping, due to diffusion of responsibility and pluralistic ignorance.`,
  questions:[
    {
      q:"In Milgram's experiment, obedience rates dropped sharply when the learner was in the same room as the participant (compared to an adjacent room). Which social psychological principle explains this modulation?",
      choices:[
        "Normative social influence, as participants matched others in the room",
        "Victim proximity, which made the harm vivid and responsibility personal",
        "Informational social influence, from better data about the learner",
        "Diffusion of responsibility across the extra people in the room"
      ],
      ans:1,
      exp:"Full obedience fell from about 65% when the learner was in another room to about 40% when he was in the same room, and to about 30% when participants had to press his hand onto the shock plate: **victim proximity** makes suffering vivid and responsibility hard to deny. Diffusion of responsibility predicts less action as more people share responsibility, which does not fit a change in where the single victim sits."
    },
    {
      q:"In Asch's conformity studies, some participants conformed because they genuinely believed the majority was correct; others conformed to avoid social rejection while privately knowing the correct answer. These represent which two distinct mechanisms?",
      choices:[
        "Classical conditioning and operant conditioning",
        "Informational and normative social influence",
        "Obedience and compliance",
        "Deindividuation and social loafing"
      ],
      ans:1,
      exp:"**Informational** influence (accepting others' answers as evidence about reality) produces private acceptance, while **normative** influence (going along to avoid rejection) produces public compliance without private acceptance (Deutsch and Gerard, 1955). Obedience requires an authority's command, which Asch's peer confederates did not give."
    },
    {
      q:"A hospital code team of 8 clinicians responds to a cardiac arrest. Despite many bystanders, nobody initiates CPR for 45 seconds. Which social psychology phenomenon best explains this delay?",
      choices:[
        "Groupthink",
        "Social facilitation",
        "Bystander effect",
        "Fundamental attribution error"
      ],
      ans:2,
      exp:"In the **bystander effect** (Darley and Latané), diffusion of responsibility (each assumes someone else will act) and pluralistic ignorance (each reads the others' inaction as a cue) delay helping, and both grow with group size; this is why resuscitation teams assign roles explicitly. Groupthink concerns flawed consensus decisions in cohesive groups, not failure to start an action."
    },
    {
      q:"The fundamental attribution error (FAE) describes the tendency to attribute others' behavior to dispositional factors while underestimating situational influences. The Milgram and Zimbardo experiments are frequently cited in discussions of the FAE. Why are these studies relevant to the FAE?",
      choices:[
        "They show behavior is mostly dispositional, since kind people refused to harm",
        "They show strong situational forces that observers underweight when they judge",
        "They support dispositional views, since obedient people were authoritarian",
        "They are irrelevant, since the FAE applies only to judgments of strangers"
      ],
      ans:1,
      exp:"Ordinary people obeyed or took on abusive roles because of **situational pressures** (an authority, gradual escalation, assigned roles), yet observers predicted almost no one would obey and blamed character instead, which is the FAE. Personality traits only weakly predicted who obeyed, so the studies argue against, not for, a purely dispositional account."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE BS4: Developmental Psychology
// ══════════════════════════════════════════════
{
  id:'p_bs_4',
  topic:'Personality, Development & Disorders',
  title:'Cognitive and Psychosocial Development Across the Lifespan',
  passage:`Jean Piaget proposed that cognitive development proceeds through four invariant, qualitatively distinct stages driven by the complementary processes of assimilation (fitting new information into existing schemas) and accommodation (modifying schemas in response to discrepant information). Object permanence emerges in the sensorimotor stage (~8 months); conservation of number and volume in the concrete operational stage (~7–11 years).

Erik Erikson's psychosocial theory describes eight lifespan stages, each defined by a central conflict whose resolution produces either a virtue or a maladaptive outcome. Industry vs. inferiority (school age, 6–12 years) develops competence; Identity vs. role confusion (adolescence) develops a coherent sense of self; Integrity vs. despair (late adulthood) produces wisdom when resolved successfully.

Lawrence Kohlberg extended moral development into stages: preconventional (self-interest and avoiding punishment), conventional (conformity to rules and social order), and postconventional (abstract principles and social contracts). Carol Gilligan criticized Kohlberg's model for gender bias — his stages were derived from male samples and prioritize justice reasoning over care-based moral reasoning.

Lev Vygotsky emphasized the social context of cognitive development. The zone of proximal development (ZPD) describes the gap between what a child can accomplish independently and what they can achieve with guidance from a more competent other. Scaffolding — temporary support matched to the child's current level — facilitates development through the ZPD.`,
  questions:[
    {
      q:"A 4-year-old child watches a researcher pour water from a short, wide beaker into a tall, narrow one. The child insists there is now 'more water' in the tall glass. Which Piagetian concept is the child failing to demonstrate, and what stage are they in?",
      choices:[
        "Object permanence; sensorimotor stage",
        "Conservation; preoperational stage",
        "Conservation; concrete operational stage",
        "Hypothetical reasoning; formal operational stage"
      ],
      ans:1,
      exp:"**Conservation**, the understanding that quantity is unchanged by a change in shape, is absent in the **preoperational** stage (about 2–7 years) because of centration (attending only to the height of the water) and lack of reversibility. It is acquired in the concrete operational stage, so a child who fails the task is not yet in that stage."
    },
    {
      q:"An 18-year-old college freshman is struggling to answer 'Who am I?' and experimenting with different majors, relationships, and ideologies. According to Erikson, what stage and conflict is this person navigating?",
      choices:[
        "Industry vs. inferiority",
        "Intimacy vs. isolation",
        "Identity vs. role confusion",
        "Autonomy vs. shame and doubt"
      ],
      ans:2,
      exp:"Exploring 'Who am I?' across careers, relationships and beliefs is Erikson's **identity vs. role confusion** (adolescence), whose virtue is fidelity; in Marcia's terms this student is in moratorium (exploring without commitment yet). Intimacy vs. isolation (young adulthood) centers on forming committed close relationships, which follows a settled identity."
    },
    {
      q:"Vygotsky proposed that a child can solve a problem independently up to difficulty level 6, but can solve up to level 9 with teacher guidance. What is the zone of proximal development in this scenario, and what does it represent?",
      choices:[
        "Level 6, the ceiling of independent performance",
        "Level 9, the most the child can ever achieve",
        "Levels 7–9, between independent and guided performance",
        "The gap between this child and an average peer"
      ],
      ans:2,
      exp:"The **ZPD** is the range between what the child does alone (level 6) and what the child can do with guidance (level 9), so levels 7–9 are skills that are maturing and that **scaffolding** can develop. Level 6 is the child's actual developmental level, not the zone, and the ZPD compares a child with their own potential, not with peers."
    },
    {
      q:"Kohlberg presented the Heinz dilemma: a man steals a drug to save his dying wife because he cannot afford it. A person reasons: 'He should steal it because human life is more valuable than property rights — there is a higher moral law that supersedes legal norms.' What level of moral reasoning does this represent?",
      choices:[
        "Preconventional, based on self-interest in keeping his wife alive",
        "Conventional, based on social rules about property and theft",
        "Postconventional, based on universal principles above specific laws",
        "Conventional, based on being seen as a good and caring husband"
      ],
      ans:2,
      exp:"Appealing to a principle (the value of life) that can override the law is **postconventional** reasoning (stages 5–6). Conventional reasoning justifies acts by social approval (stage 3, 'a good husband would') or by maintaining law and order (stage 4), and preconventional reasoning by punishment or personal gain."
    }
  ]
},

// ══════════════════════════════════════════════
// PASSAGE BS5: Sensation, Perception & Attention
// ══════════════════════════════════════════════
{
  id:'p_bs_5',
  topic:'Sensation & Perception',
  title:'Sensory Processing, Signal Detection, and Perceptual Organization',
  passage:`The visual system transduces electromagnetic radiation (380–700 nm) into neural signals via photoreceptors in the retina. Rods (120 million per eye) handle achromatic, dim-light vision; cones (6 million, concentrated in the fovea) mediate color and high-acuity vision. The trichromatic theory (Young-Helmholtz) proposes three cone types (L, M, S — tuned to long, medium, short wavelengths); opponent-process theory (Hering) explains afterimages and color opponency at the retinal ganglion and lateral geniculate levels.

Signal detection theory (SDT) posits that stimulus detection involves both sensory sensitivity (d') and decision criterion (β). A radiologist reading mammograms must balance false positives (calling benign lesions malignant — unnecessary biopsies) against false negatives (missing malignancies). SDT predicts that shifting the criterion (β) toward conservatism increases misses; toward liberalism increases false alarms. Sensitivity (d') is independent of criterion and reflects true discriminability.

Gestalt psychologists identified organizational principles governing perception: figure-ground segregation, proximity, similarity, continuity, closure, and common fate. These principles reflect the visual system's tendency to organize elements into the simplest, most regular, stable percept (Prägnanz/good gestalt).

The gate control theory of pain (Melzack and Wall, 1965) proposes that non-painful input (touch, pressure) can close the 'gate' to painful stimuli by activating inhibitory interneurons in the dorsal horn of the spinal cord — the neurobiological basis for rubbing an injured area.`,
  questions:[
    {
      q:"A radiologist notices that after staring at a red tumor on a scan for a prolonged period, she sees a green afterimage when she looks at a white wall. Which theory of color vision explains this phenomenon?",
      choices:[
        "Trichromatic theory, as all three cone types fatigue equally",
        "Opponent-process theory, as the fatigued red channel lets green rebound",
        "Feature detection theory, as red-detecting cortical neurons habituate",
        "Signal detection theory, as the response criterion shifts toward green"
      ],
      ans:1,
      exp:"In **opponent-process** theory, red–green, blue–yellow and black–white are coded by paired channels; prolonged red adapts the red side, so a neutral white field then drives the green side relatively more, producing a green afterimage. Trichromatic theory explains color detection by three cone types but not why afterimages appear in the complementary color."
    },
    {
      q:"A hospital implements a new protocol for sepsis screening. Nurses are told that missing sepsis is catastrophic, so they should err on the side of over-diagnosing. According to signal detection theory, what happens to false alarm rate and miss rate under this liberal criterion?",
      choices:[
        "Both rates fall, because the protocol improves sensitivity",
        "False alarms rise and misses fall, with d′ unchanged",
        "Misses rise and false alarms fall, with d′ unchanged",
        "Only d′ changes, because criterion shifts do not affect error rates"
      ],
      ans:1,
      exp:"A **liberal criterion** lowers the threshold for saying 'sepsis', so hits rise and misses fall, but more non-septic patients are flagged (more false alarms); sensitivity (d′), the underlying ability to discriminate, is unchanged. Lowering both error rates at once would require higher d′ (a better test), not a criterion shift."
    },
    {
      q:"A student sees a group of dots arranged like this: ●●● ●●● ●●● and perceives three groups of three dots rather than nine individual dots or one group of nine. Which Gestalt principle accounts for this?",
      choices:[
        "Similarity, since all the dots share the same size and color",
        "Closure, since the mind completes each cluster into a shape",
        "Proximity, since dots that are close together are grouped",
        "Continuity, since the dots seem to follow one smooth line"
      ],
      ans:2,
      exp:"**Proximity**: elements close to one another are perceived as a group, so the larger gaps split the row into three clusters. Similarity cannot explain the split here, because every dot looks the same and similarity alone would group all nine together."
    },
    {
      q:"Gate control theory explains why rubbing an injured ankle reduces pain. Which spinal cord mechanism underlies this effect?",
      choices:[
        "Rubbing releases endorphins that bind opioid receptors in the brain",
        "Aβ touch fibers excite dorsal horn interneurons that inhibit pain relay",
        "Rubbing diverts cortical attention away from the original pain signal",
        "Rubbing increases blood flow that washes away inflammatory mediators"
      ],
      ans:1,
      exp:"In **gate control theory**, large-diameter **Aβ** touch fibers activate inhibitory interneurons in the substantia gelatinosa of the dorsal horn, which suppress transmission from small Aδ and C pain fibers to projection neurons ('closing the gate'); this is also the basis of TENS. Endorphin release and attention do modulate pain, but they are descending (brain-level) mechanisms, not the spinal gate the question asks about."
    }
  ]
},

]; // end BEHAVIORAL_PASSAGES
