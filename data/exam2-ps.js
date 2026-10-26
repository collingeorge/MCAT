// Full-Length Practice Exam 2 — Psychological, Social & Biological Foundations (P/S)

const EXAM2_PS_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 1: Motivation & Self-Determination Theory
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_1',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Intrinsic Motivation, Self-Determination Theory, and Patient Behavior Change',
  passage:`Self-Determination Theory (SDT, Deci & Ryan) proposes that human motivation exists on a continuum from amotivation through extrinsic motivation to intrinsic motivation. Intrinsic motivation — engaging in an activity for its inherent satisfaction — is associated with greater persistence, creativity, and well-being than extrinsic motivation (engaging for external rewards or to avoid punishment). SDT identifies three basic psychological needs whose satisfaction supports intrinsic motivation: autonomy (sense of volition and self-endorsement of behavior), competence (feeling effective and capable), and relatedness (feeling connected to others).

Cognitive Evaluation Theory (CET), a sub-theory of SDT, predicts that external events (rewards, deadlines, surveillance) affect intrinsic motivation through their perceived impact on autonomy and competence. Controlling events (contingent tangible rewards, threats) undermine intrinsic motivation; informational events (unexpected positive feedback, choice) support it. The overjustification effect: providing an expected external reward for an intrinsically motivated behavior reduces subsequent intrinsic motivation — the individual attributes their behavior to the reward rather than their own interest.

Researchers studied medication adherence in patients with type 2 diabetes. Group A received physician-directed treatment with specific instructions and scheduled monitoring (controlling condition). Group B participated in collaborative goal-setting with their provider, chose from multiple treatment options, and received autonomy-supportive communication. At 6 months, Group B showed superior HbA1c reduction (8.4% → 7.1% vs. 8.3% → 7.8%) and better medication adherence.

A third group (Group C) received cash incentives for attending appointments and achieving HbA1c targets. Short-term adherence improved, but at 12 months (after incentives ended), adherence fell below baseline in Group C.`,
  questions:[
    {
      q:"Group C's adherence falling below baseline after incentives ended best illustrates which psychological phenomenon?",
      choices:[
        "Extinction — the rewarded behavior faded once reinforcement was withdrawn",
        "Overjustification — expected rewards displaced patients' own reasons to adhere",
        "Habituation — repeated appointments lowered the perceived importance of care",
        "Negative reinforcement — removing the cash reward functioned as a punisher"
      ],
      ans:1,
      exp:"In the **overjustification effect** (Lepper, Greene & Nisbett, 1973), an expected, contingent tangible reward leads people to attribute their behavior to the reward instead of their own values, so when the cash stopped, the intrinsic motivation that had supported baseline adherence was already undermined. Extinction is the tempting distractor, but it predicts a return toward baseline, not a drop below it. Removing a reward is negative punishment, not negative reinforcement."
    },
    {
      q:"Group B's superior outcomes are attributed to autonomy-supportive communication. According to SDT, which specific need was most directly satisfied by collaborative goal-setting and treatment choice?",
      choices:[
        "Relatedness — the collaboration strengthened the patient-provider relationship",
        "Competence — choosing their own goals made patients feel more capable",
        "Autonomy — choice and shared goal-setting made the behavior feel self-endorsed",
        "Beneficence — patients trusted that the provider was acting in their interest"
      ],
      ans:2,
      exp:"**Autonomy** in SDT is the experience of one's actions as volitional and self-endorsed; offering treatment options and setting goals together makes the regimen feel self-chosen, which promotes internalization (from 'my doctor told me to' toward 'this matters to me'). Relatedness is the tempting answer because the relationship was collaborative, but the manipulated feature was choice, not warmth or connection. Beneficence is a bioethics principle, not one of SDT's three needs."
    },
    {
      q:"The CET component of SDT predicts that unexpected positive feedback supports intrinsic motivation while expected tangible rewards undermine it. What is the key distinction that determines whether feedback is 'informational' vs. 'controlling'?",
      choices:[
        "Whether the feedback is verbal praise or a monetary or material reward",
        "Whether the recipient perceives it as conveying competence or as pressure to comply",
        "Whether the feedback comes from a peer or from a person in a position of authority",
        "Whether the feedback is positive in tone or negative and critical in tone"
      ],
      ans:1,
      exp:"CET holds that an event's **functional significance**, how the recipient perceives it, determines its effect: perceived as information about competence, it supports intrinsic motivation; perceived as an attempt to control behavior, it shifts the perceived locus of causality outward and undermines autonomy. The same 'great job' can be informational or controlling depending on framing, which is why the verbal-versus-monetary distinction is tempting but wrong; money can be informational and praise can be controlling."
    },
    {
      q:"A physician wants to support intrinsic motivation for exercise in a sedentary patient. According to SDT, which approach would be most effective?",
      choices:[
        "Prescribing a fixed regimen with mandatory weekly check-ins and penalties for lapses",
        "Offering the patient a cash payment for each week of documented exercise",
        "Exploring the patient's values and choosing enjoyable, achievable activities together",
        "Stressing the serious health consequences of inactivity to create a sense of urgency"
      ],
      ans:2,
      exp:"An SDT approach supports all three needs: exploring the patient's own values and offering choice supports **autonomy**, achievable starting targets build **competence**, and a collaborative, non-judgmental stance supports **relatedness**. Mandatory check-ins with penalties are controlling, and cash payments risk overjustification. Fear appeals are the tempting choice, but they build pressure rather than self-endorsed motivation and can provoke reactance in ambivalent patients."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 2: Consciousness & Sleep
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_2',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Sleep Architecture, Memory Consolidation, and Sleep Disorders',
  passage:`Sleep is organized into cycles of approximately 90 minutes, each containing NREM (non-rapid eye movement) and REM (rapid eye movement) stages. NREM stages progress from N1 (light sleep, theta waves) through N2 (sleep spindles, K-complexes) to N3 (slow-wave sleep, SWS; delta waves). Earlier sleep cycles contain more N3; later cycles contain more REM. Total sleep time: approximately 75-80% NREM, 20-25% REM.

The two-process model of sleep (Borbély) describes sleep pressure as the interaction of: Process C (circadian rhythm, driven by the suprachiasmatic nucleus, SCN, using light input via the retinohypothalamic tract) and Process S (homeostatic sleep pressure, adenosine accumulates in the basal forebrain during wakefulness, cleared during sleep). The wake-promoting systems (histamine from the tuberomammillary nucleus, orexin/hypocretin from the lateral hypothalamus, NE from the locus coeruleus, 5-HT from the raphe nuclei) are inhibited during sleep by the ventrolateral preoptic nucleus (VLPO).

Memory consolidation occurs during specific sleep stages: declarative/explicit memories (hippocampal-dependent) are consolidated during SWS through hippocampal sharp-wave ripples that replay experiences to the neocortex; procedural/motor memories are consolidated during REM. Sleep deprivation impairs memory consolidation and increases adenosine → excessive daytime sleepiness.

Narcolepsy type 1: loss of orexin-producing neurons (autoimmune destruction) → loss of wake stability → sleep attacks, cataplexy (sudden muscle weakness triggered by emotion), hypnagogic hallucinations, sleep paralysis.`,
  questions:[
    {
      q:"Adenosine accumulates during wakefulness and promotes sleep. At typical dietary doses, caffeine reduces sleepiness primarily through which mechanism?",
      choices:[
        "Directly stimulating locus coeruleus neurons so they release more norepinephrine",
        "Blocking adenosine receptors so accumulated adenosine cannot signal sleep pressure",
        "Inhibiting phosphodiesterase, which raises cAMP levels in wake-promoting neurons",
        "Phase-advancing the SCN circadian clock toward its daytime wake-promoting phase"
      ],
      ans:1,
      exp:"Caffeine is a competitive **adenosine receptor antagonist** (A1 and A2A): adenosine keeps accumulating during wakefulness (Process S), but it cannot bind its receptors, so the sleep-pressure signal is masked rather than cleared. Phosphodiesterase inhibition is the tempting distractor because it is a real caffeine action, but it requires concentrations far above normal intake. When caffeine wears off, the built-up adenosine binds freely, producing the familiar crash."
    },
    {
      q:"In narcolepsy type 1, orexin-producing neurons are destroyed by autoimmune mechanisms. Why does orexin loss specifically cause cataplexy (sudden muscle weakness triggered by strong emotion)?",
      choices:[
        "Orexin normally inhibits motor cortex, so its loss causes disorganized motor output",
        "Without orexin, emotion can trigger the REM atonia circuit while the person is awake",
        "Orexin normally sustains acetylcholine release at the neuromuscular junction",
        "Orexin normally supports cerebellar coordination, so its loss impairs postural control"
      ],
      ans:1,
      exp:"Orexin stabilizes wakefulness and suppresses the brainstem circuit (sublaterodorsal nucleus) that produces **REM muscle atonia**; without it, strong emotion such as laughter can intrude that atonia into wakefulness, so tone is lost while consciousness is preserved. The same intrusion of REM features explains sleep paralysis and hypnagogic hallucinations. Neuromuscular junction failure is the tempting distractor, but that describes myasthenia gravis, a peripheral disorder unrelated to orexin."
    },
    {
      q:"The two-process model predicts that a night-shift worker who sleeps from 8 AM to 4 PM is fighting which component of sleep regulation?",
      choices:[
        "Process S — they have not been awake long enough to build up adenosine",
        "Process C — the light-entrained SCN is promoting wakefulness during the daytime",
        "VLPO activity — the sleep-promoting nucleus cannot function in daylight hours",
        "Orexin deficiency — night work suppresses lateral hypothalamic orexin release"
      ],
      ans:1,
      exp:"After a night shift, homeostatic pressure (**Process S**) is high and favors sleep, but the SCN, still entrained to daylight, sends a wake-promoting circadian signal (**Process C**) during the worker's daytime sleep, producing short, fragmented sleep. The Process S choice is tempting but backwards: the worker has been awake for many hours, so adenosine is high. Timed bright light, darkness during daytime sleep, and melatonin can help shift the circadian phase."
    },
    {
      q:"Declarative memories are consolidated during slow-wave sleep through hippocampal sharp-wave ripples. A medical student who stays up all night studying for an exam and then sleeps after the exam will have impaired consolidation of what they studied. Which mechanism explains this?",
      choices:[
        "Sleep loss permanently destroys hippocampal neurons that store the studied material",
        "Labile new traces decay or suffer interference before slow-wave sleep replay can stabilize them",
        "Recovery sleep after an all-nighter is REM-dominated, so it contains almost no slow-wave sleep",
        "Taking the exam retroactively erases the studied material before sleep can consolidate it"
      ],
      ans:1,
      exp:"Newly encoded hippocampal memories are fragile until **slow-wave sleep** replays them (sharp-wave ripples) to the neocortex; a long stretch of wakefulness after learning exposes the traces to decay and interference first, and sleep deprivation also impairs hippocampal encoding. The REM-dominated choice is tempting but wrong: SWS tracks homeostatic pressure, so recovery sleep after an all-nighter is actually SWS-rich (SWS rebound). Sleep loss impairs memory function without destroying neurons."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 3: Prejudice, Discrimination & Stigma
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_3',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Stigma, Stereotype Threat, and Health Disparities',
  passage:`Stigma — the process by which a person is labeled, linked to negative stereotypes, and separated from the 'normal' social category — affects health through multiple pathways. Goffman described three types of stigma — abominations of the body (e.g., physical disability), blemishes of individual character (e.g., mental illness, addiction), and tribal stigma (transmitted through lineage, e.g., race) — and separately distinguished discredited stigma (visible or already known) from discreditable stigma (concealable but potentially knowable, e.g., mental illness, HIV status). Link and Phelan's model proposes that stigma operates through labeling, stereotyping, separation, status loss, and discrimination. Link's earlier modified labeling theory adds that people absorb cultural stereotypes about mental illness long before they are ever diagnosed.

Stereotype threat (Steele & Aronson, 1995) occurs when individuals perform in a domain in which their group is negatively stereotyped and experience the additional burden of confirming that stereotype. In a classic study, African American students who were told a test was a measure of intellectual ability performed significantly worse than those told it was a non-diagnostic laboratory problem-solving task. White students showed no significant difference across conditions. The performance decrement occurred even in high-achieving students who cared deeply about academic performance.

In healthcare, stigma operates at multiple levels: structural (laws, policies, institutional practices excluding stigmatized groups), interpersonal (discriminatory treatment by providers), and internalized (individuals accept negative societal beliefs about themselves). A study of patients with opioid use disorder (OUD) found that stigmatizing language (e.g., 'addict,' 'substance abuser') in medical records was associated with providers recommending less pain medication and viewing patients as less deserving of treatment, compared to patients described with non-stigmatizing language ('person with OUD,' 'patient').`,
  questions:[
    {
      q:"Stereotype threat impairs performance even in high-achieving students who are highly motivated. Which cognitive mechanism best explains this counterintuitive finding?",
      choices:[
        "Highly motivated students overprepare and become fatigued before the test begins",
        "Monitoring for and suppressing stereotype-related worry uses up working memory capacity",
        "Sympathetic arousal from the threat nonspecifically impairs every cognitive function",
        "High achievers lower their effort to protect self-esteem if they happen to do poorly"
      ],
      ans:1,
      exp:"The **working memory** account (Schmader & Johns) holds that vigilance for confirming the stereotype, suppressing intrusive thoughts and managing anxiety consume the executive resources the task needs; students who care most about the domain are more vigilant, so they lose the most capacity. Reduced effort (self-handicapping) is the tempting alternative, but it contradicts the passage's point that these students cared deeply and tried hard. Values affirmation and identity-safe settings reduce the effect."
    },
    {
      q:"The language study showed that stigmatizing terms ('addict') led to worse treatment recommendations. Using the passage's three levels, this finding is best described as stigma operating at which level?",
      choices:[
        "Structural — stigma embedded in institutional policies and laws",
        "Internalized — the patient's acceptance of negative beliefs about the self",
        "Interpersonal — providers' biased judgments during individual clinical care",
        "Community — neighborhood norms that shape how residents view drug use"
      ],
      ans:2,
      exp:"**Interpersonal** stigma acts in individual encounters: the stigmatizing label activated stereotypes (drug-seeking, undeserving) that shifted providers' clinical judgments even though the clinical facts were identical. Structural is the tempting distractor because the language appeared in medical records, but the outcome measured was individual providers' decisions, not a policy (such as an insurer refusing to cover medication for OUD). Internalized stigma would concern the patient's own self-view."
    },
    {
      q:"Discreditable stigma (concealable conditions like mental illness or HIV) creates a different set of challenges than discredited stigma (visible conditions). Which challenge is unique to discreditable stigma?",
      choices:[
        "Facing no discrimination at all, because others never learn of the condition",
        "Continually deciding whether, when and to whom to disclose the hidden condition",
        "Facing uniformly worse health outcomes than people with visible conditions",
        "Being unable to internalize stigma, because they are never visibly labeled"
      ],
      ans:1,
      exp:"Goffman noted that the discredited must manage tension in interactions, whereas the discreditable must manage **information**: deciding whether, when, how and to whom to disclose. Concealment avoids immediate discrimination but costs sustained vigilance, limits support and fuels fear of discovery, a stressor in Meyer's minority stress model. People with concealable conditions still encounter discrimination and can still internalize stigma, which rules out those distractors."
    },
    {
      q:"Modified labeling theory proposes that awareness of cultural stereotypes about mental illness shapes how people behave before and after diagnosis. How does this awareness most likely affect help-seeking?",
      choices:[
        "It has no effect, because clinical need alone determines who seeks treatment",
        "It delays treatment-seeking to avoid the label, then prompts withdrawal once labeled",
        "It increases treatment-seeking, because people are motivated to disprove stereotypes",
        "It affects help-seeking only for psychotic disorders, not for depression or anxiety"
      ],
      ans:1,
      exp:"In **modified labeling theory** (Link and colleagues, 1989), people learn cultural beliefs that those with mental illness are devalued and rejected; before diagnosis this anticipated stigma deters help-seeking, and after diagnosis it leads to secrecy and withdrawal that shrink social networks. The 'disprove the stereotype' choice is tempting but runs opposite to the evidence: stigma is among the most commonly cited barriers to mental health care, for common as well as severe disorders."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 4: Cognitive Biases & Heuristics
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_4',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Cognitive Heuristics and Diagnostic Errors in Clinical Medicine',
  passage:`Heuristics are mental shortcuts that enable fast, efficient decision-making. Kahneman's dual-process theory distinguishes System 1 thinking (fast, automatic, pattern-recognition-based, intuitive) from System 2 thinking (slow, deliberate, analytical, effortful). Most clinical decisions involve System 1; diagnostic errors often occur when System 1 short-circuits appropriate System 2 analysis.

Three heuristics are particularly relevant in clinical diagnosis. The availability heuristic: estimating the probability of an event based on how easily examples come to mind. The representativeness heuristic: judging probability based on how closely something resembles a prototype (base rate neglect). Anchoring and adjustment: over-relying on the first piece of information encountered, making insufficient adjustments when new information arrives.

A study of emergency physicians found that those who had recently managed a case of meningitis were more likely to perform lumbar punctures in the next month (availability heuristic). Physicians who first received information that a patient 'doesn't look sick' were less likely to diagnose serious illness even when subsequent test results suggested otherwise (anchoring).

Premature closure — accepting a diagnosis before adequately considering alternatives — is the single most frequent cognitive error in studies of diagnostic error, in which cognitive factors contributed to roughly three-quarters of cases. It is facilitated by System 1 pattern recognition and inhibited by explicit diagnostic checklists and differential diagnosis generation.`,
  questions:[
    {
      q:"A physician recently managed a severe pulmonary embolism and subsequently over-orders CT pulmonary angiography for all patients with any dyspnea. This illustrates which heuristic, and why does it lead to diagnostic error?",
      choices:[
        "Representativeness — each dyspneic patient closely resembles a classic PE prototype",
        "Availability — a vivid recent case inflates the judged probability of PE",
        "Anchoring — the first PE case fixes the starting point for every later diagnosis",
        "Framing — the wording of the triage note casts dyspnea as a sign of emergency"
      ],
      ans:1,
      exp:"The **availability heuristic** (Tversky & Kahneman) estimates probability by how easily examples come to mind, so a recent, vivid PE inflates the physician's subjective pretest probability and drives overtesting of low-risk patients. Representativeness is tempting, but it concerns resemblance to a prototype, and the stem stresses the memorable recent case rather than how typical the patients look. Anchoring describes failing to adjust from initial information about the same patient. Structured pretest tools such as the Wells criteria counter this bias."
    },
    {
      q:"A 55-year-old man presents with chest pain. The physician notes he 'doesn't look sick' and initially considers musculoskeletal pain. EKG shows subtle ST changes, but the physician attributes them to poor lead placement. The patient is later found to have an acute MI. Which cognitive error most directly contributed?",
      choices:[
        "Availability — MI did not come readily to mind because none had been seen recently",
        "Anchoring — the first impression persisted and the ST changes were explained away",
        "Representativeness — the patient did not resemble the typical prototype of MI",
        "Framing — the referral note described the patient's presentation as low risk"
      ],
      ans:1,
      exp:"**Anchoring** is insufficient adjustment from initial information: the 'doesn't look sick' impression set the frame, and the disconfirming ST changes were rationalized as lead artifact instead of prompting revision, which then produced premature closure on a benign diagnosis. Representativeness is tempting, but the error described is the failure to update on new data, not a mismatch with a prototype, and the stem gives no recent case or referral note to support availability or framing. Treat ECG changes in chest pain as real until proven otherwise."
    },
    {
      q:"A physician tells a patient 'Your tests came back fine' (framing as absence of disease), versus 'We didn't find what we were looking for, but there are still possibilities we haven't excluded' (same information, different framing). How does framing affect patient decision-making?",
      choices:[
        "It has no effect, because the underlying clinical information is identical",
        "The reassuring frame makes patients less likely to pursue follow-up or report symptoms",
        "It has no effect, because patients evaluate test results independently of wording",
        "The uncertain frame makes patients less likely to return, because it erodes their trust"
      ],
      ans:1,
      exp:"The **framing effect** (Tversky & Kahneman) is the finding that logically equivalent information presented differently yields different decisions; 'your tests came back fine' invites the patient to close the issue, whereas the uncertainty frame keeps follow-up and symptom reporting active. The classic example: patients choose surgery more often when told of a 90% survival rate than of a 10% mortality rate. The claim that uncertainty erodes trust is tempting but is not what framing research predicts about follow-up."
    },
    {
      q:"Premature closure is the most common cognitive contributor to diagnostic error. Which strategy most effectively counteracts premature closure?",
      choices:[
        "Relying on experience, since seasoned physicians are immune to premature closure",
        "A diagnostic time-out that asks 'what else could this be?' before committing",
        "Abandoning System 1 entirely and reasoning analytically about every patient",
        "Heightening fear of malpractice liability so physicians become more cautious"
      ],
      ans:1,
      exp:"A **diagnostic time-out** is a cognitive forcing strategy: at a set point the clinician deliberately engages System 2, generates a differential and asks what else could explain the findings, interrupting System 1 pattern-matching before closure. Abandoning System 1 is tempting but impossible and inefficient, since pattern recognition is usually right and fast. Experience does not confer immunity, and fear of litigation drives defensive testing rather than better reasoning."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 5: Social Mobility & Health
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_5',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Social Mobility, Relative Deprivation, and Health Outcomes',
  passage:`Social mobility refers to movement between positions in a social stratification system. Intergenerational mobility compares children's social position to their parents'. Intragenerational (career) mobility tracks individuals across their own lifespan. Mobility can be upward (improvement in status), downward, or horizontal.

Relative deprivation theory (Runciman, 1966) proposes that individuals' well-being is determined not by absolute resources but by comparison with reference groups. Upward social comparison (comparing oneself to those better off) generates relative deprivation — a sense of unfairness about unmet expectations — which predicts worse health outcomes through chronic stress pathways. In highly unequal societies, even those in the middle class make upward comparisons to the wealthy, generating sustained physiological stress.

The Whitehall II study found that the relationship between job control (a measure of autonomy and decision latitude) and cardiovascular disease risk was partially mediated by cortisol patterns — workers with less job control showed altered daily cortisol patterns, including a dysregulated cortisol awakening response, a marker of chronic stress and HPA dysregulation.

In a study of upwardly mobile individuals (working-class origin, professional occupation), those who attributed their success to individual effort ('I made it through hard work') showed more system-justifying beliefs and less support for redistributive policies, but higher personal well-being, compared to those who attributed success to structural advantage ('I was lucky to have opportunities'). The researchers noted that this individual benefit may carry a collective cost: reduced support, among those who 'made it,' for policies that would help the communities they left behind.`,
  questions:[
    {
      q:"The Whitehall II finding that lower job control predicts cardiovascular disease risk — even among employed, non-poor workers — most directly supports which sociological explanation for health disparities?",
      choices:[
        "Material pathway — lower-grade workers lack the resources needed to stay healthy",
        "Psychosocial pathway — low control causes chronic stress and HPA dysregulation",
        "Behavioral pathway — lower-grade workers smoke and exercise less than others",
        "Access pathway — lower-grade workers have less access to preventive medical care"
      ],
      ans:1,
      exp:"Whitehall II studied British civil servants who were all employed and all covered by the NHS, yet low job control (Karasek's job demand-control model, tested in Marmot's cohort) predicted heart disease and tracked with altered cortisol rhythms, pointing to a **psychosocial** stress pathway that operates independent of material resources. The behavioral pathway is the tempting distractor, but the passage links risk to cortisol and HPA dysregulation, and in Whitehall conventional risk behaviors explained only part of the gradient. Universal coverage argues against access."
    },
    {
      q:"Upwardly mobile individuals who attribute success to individual effort show higher personal well-being but support redistributive policies less. This pattern illustrates which psychological concept?",
      choices:[
        "Fundamental attribution error — overusing dispositions to explain others' behavior",
        "System justification — seeing the existing social order as fair and legitimate",
        "Cognitive dissonance — tension between personal self-interest and social values",
        "Downward comparison — feeling better by comparing oneself to those worse off"
      ],
      ans:1,
      exp:"**System justification theory** (Jost & Banaji) describes a motivated tendency to see existing arrangements as fair; believing 'I made it through hard work' legitimizes the system, which soothes (raising well-being) but lowers support for redistribution. The fundamental attribution error is tempting because effort is a dispositional attribution, but that bias concerns explaining others' behavior, and taking credit for one's own success is self-serving bias, which would not by itself explain the policy views. This is the individual-benefit, collective-cost tension of system justification."
    },
    {
      q:"Relative deprivation theory predicts that even middle-class individuals in highly unequal societies suffer health consequences from upward social comparisons. What physiological mechanism mediates this relationship?",
      choices:[
        "Material deficit — middle-class people in unequal societies lack adequate food and shelter",
        "Status stress — repeated upward comparison drives HPA activation and allostatic load",
        "Overwork — upward comparison motivates longer hours that cause physical exhaustion",
        "Infection — inequality directly raises pathogen exposure in middle-class neighborhoods"
      ],
      ans:1,
      exp:"Chronic status threat from repeated upward comparison activates the HPA axis and sympathetic system, and over time this wear (**allostatic load**) raises cardiovascular, metabolic and immune risk even without material deprivation. This helps explain the Wilkinson and Pickett observation that more unequal countries have worse health at every income level. The material-deficit choice is tempting but contradicts the premise: the passage stresses comparison with others, not absolute shortage."
    },
    {
      q:"Absolute intergenerational mobility in the United States (the share of children out-earning their parents) has fallen over recent decades. Which structural factor most directly limits upward mobility?",
      choices:[
        "Inborn differences in cognitive ability between social classes",
        "Unequal access to quality schooling and early childhood education",
        "Class differences in the cultural value placed on a strong work ethic",
        "Immigration that raises competition for low-skill jobs in cities"
      ],
      ans:1,
      exp:"Education is the main channel of intergenerational mobility, and children from low-SES families face lower-resource schools, less early childhood education and fewer enrichment opportunities, so **unequal educational opportunity** is a structural barrier. Opportunity Insights (Chetty) data show mobility varies sharply by area, tracking school quality, segregation and inequality. Work ethic and inborn ability are individual-level explanations, not structural ones, and do not fit the strong environmental effects seen in natural experiments."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 6: Personality Disorders & Assessment
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_6',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Personality Traits, the Five-Factor Model, and Personality Disorders',
  passage:`The Five-Factor Model (FFM, Big Five) describes personality in five broad dimensions: Openness to experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN). These traits are considered relatively stable across the lifespan (though conscientiousness and agreeableness tend to increase with age), moderately heritable (~40-60%), and consistent across cultures. Neuroticism (emotional instability, anxiety proneness) is the trait most strongly associated with mental health vulnerability; Conscientiousness is the strongest personality predictor of job performance and longevity.

Personality disorders (PD) represent extreme, inflexible, and maladaptive variants of normal personality traits that cause significant impairment. DSM-5-TR organizes PDs into three clusters: Cluster A ('odd/eccentric' — paranoid, schizoid, schizotypal — associated with psychosis spectrum); Cluster B ('dramatic/emotional' — antisocial, borderline, histrionic, narcissistic — associated with impulsivity and emotional dysregulation); Cluster C ('anxious/fearful' — avoidant, dependent, obsessive-compulsive — associated with anxiety disorders).

Antisocial personality disorder (ASPD) requires: age ≥18, evidence of conduct disorder before age 15, and a pervasive pattern of disregard for others' rights. Key features: deceitfulness, impulsivity, irritability, recklessness, consistent irresponsibility, lack of remorse. Prevalence: ~3% males, ~1% females. Psychopathy (as measured by Hare PCL-R) is a more severe subtype characterized additionally by shallow affect and grandiosity.

In clinical settings, personality assessment must account for state vs. trait distinction: acute psychiatric illness (depression, psychosis) can produce personality-like symptoms that resolve with treatment — permanent characterological diagnoses should be reserved for presentations consistent across contexts and time.`,
  questions:[
    {
      q:"A patient with borderline personality disorder (BPD) exhibits intense fear of abandonment, unstable relationships, impulsivity, and chronic feelings of emptiness. In terms of the Five-Factor Model, which trait profile is most consistent with BPD?",
      choices:[
        "High conscientiousness, high openness, low neuroticism",
        "High neuroticism, low agreeableness, low conscientiousness",
        "High extraversion, low openness, average conscientiousness",
        "Low neuroticism, high agreeableness, low openness"
      ],
      ans:1,
      exp:"BPD maps onto extreme **high neuroticism** (intense negative affect, fear of abandonment, emptiness), low agreeableness (mistrust, conflict, idealization and devaluation) and low conscientiousness (impulsivity, self-harm, reckless behavior). Low neuroticism in any profile is incompatible with BPD's emotional instability. The DSM-5-TR Section III Alternative Model for Personality Disorders frames PDs this way, as extreme trait profiles rather than discrete categories."
    },
    {
      q:"Antisocial personality disorder cannot be diagnosed before age 18, and requires evidence of conduct disorder before age 15. What is the clinical rationale for this developmental requirement?",
      choices:[
        "Antisocial acts before age 18 are regarded as normal developmental variation",
        "It confirms a pattern rooted in childhood while avoiding mislabeling teens",
        "Conduct disorder and ASPD are the same diagnosis applied at different ages",
        "Personality disorders cannot legally be diagnosed in anyone under 18 years old"
      ],
      ans:1,
      exp:"A personality disorder must be an **enduring, pervasive pattern**: requiring conduct disorder before 15 shows the antisocial pattern began early rather than arising from adult circumstances, while the age-18 floor avoids giving a still-developing adolescent a label implying permanence. The two diagnoses are not identical, since many youths with conduct disorder (roughly half or more) never develop ASPD. Antisocial acts in youth are not dismissed as normal; they are diagnosed as conduct disorder."
    },
    {
      q:"A psychiatrist is asked to determine whether a patient's manipulative, grandiose, and emotionally shallow presentation represents narcissistic personality disorder or a manic episode. Which clinical feature most reliably distinguishes a personality disorder from an episodic state condition?",
      choices:[
        "Severity — personality disorders always cause more impairment than mood episodes",
        "Longitudinal pattern — the traits reflect a stable baseline, not a discrete change",
        "Ego-syntonicity — personality traits feel consistent with the person's self-concept",
        "Age of onset — personality disorders begin in childhood, mood disorders in adulthood"
      ],
      ans:1,
      exp:"A personality disorder is an enduring pattern present across contexts and time, confirmed by history and collateral informants, whereas a **manic episode** is a discrete change from baseline that remits; the **longitudinal pattern** is therefore the discriminator. Ego-syntonicity is the tempting distractor, but it cannot separate these two conditions because grandiose manic symptoms are typically ego-syntonic during the episode too. Severity varies in both, and bipolar disorder often begins in adolescence."
    },
    {
      q:"Research consistently shows that Conscientiousness is the strongest Big Five predictor of longevity. Which mechanism most plausibly explains this relationship?",
      choices:[
        "Conscientious people have higher intelligence, enabling better medical decisions",
        "Conscientious people practice healthier habits and avoid risky behaviors",
        "Conscientiousness directly lowers cortisol through a neuroendocrine pathway",
        "Conscientious people visit doctors far more often, so disease is caught earlier"
      ],
      ans:1,
      exp:"Conscientiousness (self-discipline, orderliness, prudence) predicts **health behaviors**: medication adherence, exercise, avoiding smoking and heavy drinking, and fewer accidents. Controlling for these behaviors substantially attenuates the trait-longevity link (Friedman; Bogg & Roberts meta-analysis), with better occupational and social outcomes adding smaller pathways. A direct cortisol pathway is the tempting distractor, but neuroendocrine effects have weak support compared with behavior, and conscientiousness is largely independent of intelligence."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 7: Epidemiology & Population Health
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_7',
  subj:'research',
  type:'passage',
  topic:'P/S',
  title:'Epidemiological Measures and Screening Program Design',
  passage:`Epidemiological measures quantify disease frequency and association. Incidence: new cases per person-time (e.g., 5 per 1,000 person-years). Prevalence: total existing cases at a point in time (= incidence × average disease duration). Relative risk (RR) = incidence in exposed / incidence in unexposed, used in cohort studies. Odds ratio (OR) = (a/b)/(c/d) from a 2×2 table, approximates RR when disease is rare (rare disease assumption). Attributable risk (AR) = incidence_exposed − incidence_unexposed; population attributable risk (PAR) = proportion of disease in the total population attributable to the exposure.

Screening programs aim to detect disease in asymptomatic individuals early enough to improve outcomes. Criteria for effective screening (Wilson-Jungner): important health problem, acceptable treatment available, recognizable latent stage, reliable/valid test, acceptable test to population, natural history understood, agreed policy on who to treat, facilities available, cost justified.

A city health department proposes a new screening program for lung cancer using low-dose CT (LDCT) in smokers aged 50-80 with ≥20 pack-year history. The department presents data: LDCT sensitivity 93%, specificity 76%; lung cancer prevalence in the target population = 1.5%; lung cancer incidence in this population = 1.2/1,000/year.

Potential harms of screening: false positives causing anxiety and unnecessary procedures, overdiagnosis (detecting cancers that would never cause symptoms or death), radiation exposure (~1 mSv per LDCT), and incidental findings requiring additional workup.`,
  questions:[
    {
      q:"Using the screening data (sensitivity 93%, specificity 76%, prevalence 1.5%), calculate the positive predictive value (PPV) of LDCT in this population:",
      choices:[
        "About 5.6%",
        "About 93%",
        "About 1.1%",
        "About 99.9%"
      ],
      ans:0,
      exp:"PPV = TP/(TP + FP); per 1,000 screened, 15 have cancer and about 14 test positive (0.93 × 15), while 24% of the 985 without cancer, about 236, are false positives, so PPV ≈ 14/250 ≈ **5.6%**. Low prevalence plus modest specificity means about 94% of positive scans are false alarms. The 93% choice confuses PPV with sensitivity, 1.1% is specificity × prevalence, and 99.9% is the NPV (about 749 true negatives among about 750 negative scans)."
    },
    {
      q:"Overdiagnosis is a harm of cancer screening that is distinct from false positives. How does overdiagnosis differ from a false positive?",
      choices:[
        "Overdiagnosis is any cancer found before symptoms appear, whether or not it would progress",
        "Overdiagnosis finds a real cancer that would never have caused symptoms or death",
        "Overdiagnosis and false positive are synonyms for an incorrect cancer detection",
        "Overdiagnosis occurs only with biopsy-based diagnosis, never with imaging tests"
      ],
      ans:1,
      exp:"A false positive is a positive test in someone without disease, which follow-up rules out; **overdiagnosis** is a true, pathologically confirmed cancer that is indolent and would never have harmed the patient, so treating it adds only harm. Detecting cancer before symptoms is the tempting distractor, but that is the goal of all screening (early detection), and most such cancers are not overdiagnosed. PSA screening for prostate cancer is the classic overdiagnosis example."
    },
    {
      q:"The city proposes to lower the screening eligibility threshold from ≥20 pack-years to ≥10 pack-years to detect more cancers. What effect would this change have on the screening program's performance?",
      choices:[
        "The test's sensitivity would rise, so PPV would increase as well",
        "Prevalence in the screened group would fall, so PPV would decrease",
        "PPV would be unchanged, because sensitivity and specificity are unchanged",
        "Prevalence in the screened group would fall, so NPV would decrease"
      ],
      ans:1,
      exp:"Adding lower-risk smokers lowers the **prevalence** of lung cancer in the screened group, and PPV falls with prevalence even though sensitivity and specificity stay fixed; at 0.5% prevalence, PPV = (0.93 × 0.005)/[(0.93 × 0.005) + (0.24 × 0.995)] ≈ 1.9%. The 'unchanged PPV' choice is the classic trap: sensitivity and specificity are test properties, but predictive values depend on who is tested. NPV moves the opposite way, rising as prevalence falls. This is why guidelines restrict LDCT to high-risk groups."
    },
    {
      q:"The population attributable risk (PAR) for smoking in lung cancer is estimated at 85%. What does this mean for public health policy?",
      choices:[
        "About 85% of all smokers will eventually develop lung cancer",
        "Eliminating smoking would prevent about 85% of lung cancer cases",
        "Smokers have an 85% higher relative risk of lung cancer than nonsmokers",
        "About 85% of all smokers who develop lung cancer die from the disease"
      ],
      ans:1,
      exp:"**Population attributable risk** is the fraction of all cases in the population that would disappear if the exposure were removed: PAR% = (incidence in total population − incidence in unexposed)/incidence in total population. A high RR alone is not enough; smoking has both a large RR (about 15–25) and a common exposure, so its PAR is very high and tobacco control outweighs screening for prevention. The relative-risk choice confuses PAR with an excess-risk measure in smokers."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 8: Emotion Regulation & Psychopathology
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_8',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Emotion Regulation Strategies and Their Neurobiological Substrates',
  passage:`Emotion regulation encompasses all strategies used to influence the type, intensity, and timing of emotional experiences. Gross's process model identifies regulatory strategies according to where in the emotion-generative process they act. Antecedent-focused strategies (acting before the emotion is fully generated): situation selection, situation modification, attentional deployment (distraction vs. rumination), and cognitive reappraisal (changing the meaning of a situation). Response-focused strategies (acting after emotion is generated): expressive suppression.

Cognitive reappraisal and expressive suppression are the most studied strategies. Reappraisal: changing one's interpretation of an emotion-eliciting event ('This setback is an opportunity for growth'). Suppression: inhibiting the outward expression of an experienced emotion. Research shows: reappraisal reduces subjective emotional experience AND reduces physiological arousal; suppression reduces expressive behavior but INCREASES physiological arousal and cognitive load. Chronic use of suppression predicts worse social relationships, memory impairment (working memory consumed by suppression), and psychopathology.

Rumination — repetitive, passive focus on distress and its causes without moving toward solutions — is the most robust predictor of depression onset and maintenance. Rumination is associated with reduced activity in dorsolateral prefrontal cortex (DLPFC, regulatory control) and increased activity in subgenual anterior cingulate cortex (sgACC) and amygdala.

Researchers compared emotion regulation strategies in 200 adults: high reappraisers vs. high suppressors vs. high ruminators. High reappraisers showed better social functioning, lower depression/anxiety, and lower salivary cortisol. High suppressors showed normal social interaction quality to observers but self-reported lower authenticity and relationship satisfaction. High ruminators showed the highest depression scores and longest cortisol recovery times after stress.`,
  questions:[
    {
      q:"Expressive suppression reduces emotional expression but increases physiological arousal. What mechanism explains this paradox?",
      choices:[
        "Suppression signals the hypothalamus to release cortisol in place of the expression",
        "The emotion is already generated, and effortful inhibition adds sympathetic arousal",
        "Suppression activates the vagus nerve, which paradoxically speeds the heart rate",
        "The unexpressed emotion is stored and later rebounds at twice its original intensity"
      ],
      ans:1,
      exp:"Suppression is **response-focused**: it acts after the emotion has been generated, so the physiological response continues, and the effortful, ongoing monitoring and inhibition of expression adds sympathetic activation of its own. Reappraisal acts earlier, before the full response, and needs little sustained effort. The vagus choice is wrong because vagal (parasympathetic) activity slows the heart."
    },
    {
      q:"Rumination predicts depression onset and maintenance. The neuroimaging finding of reduced DLPFC and increased sgACC activity in ruminators reflects which regulatory failure?",
      choices:[
        "Ruminators form stronger emotional memories, which prolongs their focus on loss",
        "Weak prefrontal top-down control fails to dampen hyperactive limbic self-focus",
        "The sgACC is the main memory-encoding region and overencodes negative events",
        "Ruminators deliberately suppress emotions, which exhausts their prefrontal cortex"
      ],
      ans:1,
      exp:"The **DLPFC** exerts top-down control over limbic regions such as the amygdala and the subgenual ACC (Brodmann area 25); when it is underactive, the hyperactive sgACC's negative, self-referential processing goes unchecked, producing the self-sustaining loop of rumination. The sgACC is a deep brain stimulation target in treatment-resistant depression (Mayberg). Memory encoding is the hippocampus's job, not the sgACC's, and rumination is passive repetitive thought, not active suppression."
    },
    {
      q:"High reappraisers showed lower salivary cortisol following stress. Which regulatory mechanism best explains this faster physiological recovery?",
      choices:[
        "Reappraisal directly inhibits the adrenal cortex through descending cortical nerves",
        "Reinterpreting the stressor as less threatening shrinks the HPA response it triggers",
        "Reappraisers inherit low cortisol reactivity that is unrelated to their strategy",
        "Reappraisal works mainly by slowing breathing, which raises parasympathetic tone"
      ],
      ans:1,
      exp:"The HPA response is triggered by appraising an event as threatening and beyond one's coping resources; **reappraisal** changes that meaning early, before full mobilization, so less CRH, ACTH and cortisol are released and recovery is faster (prefrontal regions dampen amygdala drive to the hypothalamus). The genetic explanation is tempting because the study is correlational, but the question asks what regulatory mechanism explains the pattern. The adrenal cortex is controlled hormonally by ACTH, not by direct cortical nerves."
    },
    {
      q:"A therapist uses cognitive behavioral therapy (CBT) to treat a patient with generalized anxiety disorder who ruminates excessively. CBT techniques specifically targeting rumination include behavioral activation and 'worry time' scheduling. What psychological mechanism do these techniques exploit?",
      choices:[
        "Expressive suppression — keeping busy helps the patient hide anxious feelings",
        "Attentional deployment — absorbing tasks and set worry periods redirect attention",
        "Classical conditioning — relaxation is paired with previously anxiety-provoking cues",
        "Pharmacological change — activity raises serotonin, which directly halts worry"
      ],
      ans:1,
      exp:"Both techniques are **antecedent-focused**: behavioral activation fills time with goal-directed, absorbing activities that compete for the attention rumination needs (attentional deployment), and scheduled worry time (Borkovec's stimulus control) postpones worry to a set period, showing the patient that worry can be controlled. Suppression is the tempting distractor, but these techniques redirect attention rather than hiding emotional expression, and the passage links suppression to worse outcomes. Pairing relaxation with feared cues is counterconditioning, a different technique."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 9: Race, Ethnicity & Health
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_9',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Racial Health Disparities, Weathering, and the Biology of Racism',
  passage:`Health disparities between racial groups in the United States persist even after controlling for income, education, and healthcare access, suggesting that race itself — as a social experience — exerts biological effects. Geronimus's 'weathering hypothesis' proposes that African Americans experience accelerated biological aging due to chronic stress from structural racism, cumulative adversity, and high-effort coping. Evidence includes earlier cellular aging (shorter telomere length), elevated allostatic load biomarkers, and higher rates of preterm birth even in college-educated Black women compared to white women without a college degree.

The National Survey of American Life found that perceived racial discrimination was associated with lifetime DSM-IV disorder rates, including major depression, generalized anxiety disorder, and posttraumatic stress disorder. Each unit increase in perceived discrimination independently predicted increased odds of psychiatric disorders after controlling for income, age, and SES.

Internalized racism — accepting negative societal beliefs about one's own racial group — predicts worse health outcomes through mechanisms including reduced self-efficacy for health behaviors, increased cortisol reactivity, and elevated inflammatory markers (IL-6, CRP).

Epigenetic research has documented differential methylation patterns in stress-responsive genes (FKBP5, NR3C1/glucocorticoid receptor, SLC6A4/serotonin transporter) in individuals with high adversity exposure — suggesting that the social experience of racism may leave molecular biological imprints that affect gene expression and health across the life course.`,
  questions:[
    {
      q:"The weathering hypothesis proposes that Black women's preterm birth risk is higher than white women's even after accounting for individual SES. What mechanism does weathering propose for this racial disparity?",
      choices:[
        "Inherited differences in uterine physiology between racial groups raise preterm risk",
        "Cumulative stress from racism ages the body early, regardless of a woman's own SES",
        "High-SES Black women tend to choose providers who deliver lower-quality prenatal care",
        "Weathering applies only to cardiovascular disease, so it cannot explain birth outcomes"
      ],
      ans:1,
      exp:"**Weathering** (Geronimus) proposes that lifelong exposure to racism, discrimination and high-effort coping causes allostatic overload, with shorter telomeres, inflammation and HPA dysregulation, so the body ages faster and pregnancy outcomes worsen. Because this exposure is not removed by individual education or income, the disparity persists even at high SES. The genetic explanation is tempting but is contradicted by evidence that Black immigrant women have better birth outcomes than US-born Black women, a pattern that points to social exposure."
    },
    {
      q:"Perceived racial discrimination is associated with psychiatric disorder rates even after controlling for SES. What psychological process mediates this relationship?",
      choices:[
        "Discrimination directly damages prefrontal tissue through neuroinflammation",
        "Chronic threat appraisal produces hypervigilance and sustained stress reactivity",
        "Poverty fully explains the link, so discrimination itself has no independent effect",
        "Increased substance use is the sole pathway linking discrimination to disorders"
      ],
      ans:1,
      exp:"Discrimination is a chronic **psychosocial stressor**: repeated experiences and the expectation of more produce threat appraisal, hypervigilance and sustained HPA and amygdala reactivity, which raise risk for anxiety, depression and PTSD (Meyer's minority stress model). The poverty choice is ruled out directly by the passage, since the association held after controlling for income and SES. Substance use can contribute, but it is not the sole pathway."
    },
    {
      q:"Epigenetic methylation changes in glucocorticoid receptor (NR3C1) have been documented in individuals with high adversity exposure. What is the physiological consequence of hypermethylation of the NR3C1 promoter?",
      choices:[
        "More GR expression, so cortisol feedback becomes stronger and stress responses shorter",
        "Less GR expression, so HPA negative feedback weakens and cortisol stays high longer",
        "No change in GR expression, because promoter methylation alters only the protein's shape",
        "Less serotonin transporter expression, because NR3C1 encodes a serotonin transporter"
      ],
      ans:1,
      exp:"Promoter **hypermethylation** silences transcription, so fewer glucocorticoid receptors in the hippocampus and hypothalamus means weaker negative feedback and prolonged cortisol elevation after stress. This was first shown in rats raised by low licking-and-grooming mothers (Weaver, Meaney & Szyf, 2004) and later in human hippocampus from suicide victims with childhood abuse (McGowan et al., 2009). Increased expression is the tempting reversal; remember that methylated promoters are silenced. The serotonin transporter gene is SLC6A4, not NR3C1."
    },
    {
      subj:'research',
      q:"A researcher wants to test whether a structural intervention (eliminating discriminatory lending practices in one city) reduces weathering biomarkers (telomere length, allostatic load) in Black residents compared to a matched control city. Which study design would provide the strongest causal evidence?",
      choices:[
        "A cross-sectional survey of discrimination perceptions and biomarkers at one time point",
        "A retrospective comparison of biomarkers in cities with and without past lending bias",
        "A difference-in-differences comparison of biomarker change before and after the policy",
        "A randomized trial assigning individuals to experience discrimination or no discrimination"
      ],
      ans:2,
      exp:"**Difference-in-differences** compares the before-to-after change in the intervention city with the change in the control city over the same period, which removes stable differences between the cities and shared time trends (assuming parallel trends without the policy). Randomizing people to experience discrimination is unethical, and cross-sectional or retrospective comparisons cannot separate the policy's effect from preexisting differences between cities. The ACA Medicaid expansion studies used this design."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 P/S PASSAGE 10: Socialization & Identity
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2ps_10',
  subj:'psych_soc',
  type:'passage',
  topic:'P/S',
  title:'Social Identity Theory, Intergroup Conflict, and Reducing Prejudice',
  passage:`Social Identity Theory (SIT, Tajfel & Turner, 1979) proposes that individuals derive part of their self-concept from membership in social groups (social identity). People are motivated to maintain positive social identity by favorably comparing their in-group to relevant out-groups. SIT explains in-group favoritism (preferential treatment of in-group members) and out-group derogation even when group membership is based on arbitrary criteria (minimal group paradigm: assigning people to groups based on trivial distinctions produces immediate in-group favoritism).

Self-categorization theory (Turner, 1987) extends SIT: when a social category becomes salient, individuals depersonalize — they see themselves and others as instances of their group category rather than as unique individuals. Depersonalization increases conformity to group norms and accentuates perceived differences between groups.

The contact hypothesis (Allport, 1954) proposes that intergroup prejudice is reduced by contact between groups under four optimal conditions: equal status, common goals, intergroup cooperation (not competition), and support of authorities or institutions. Later researchers added acquaintance potential (contact deep enough to individuate out-group members). Meta-analyses confirm the contact hypothesis: positive intergroup contact reduces prejudice across hundreds of studies.

In healthcare, demographic concordance (patient-provider racial/ethnic match) is associated with better communication quality, higher patient satisfaction, increased trust, and greater adherence in some studies, particularly for Black and Hispanic patients. However, increasing provider diversity requires structural changes in medical training pipelines.`,
  questions:[
    {
      q:"The minimal group paradigm shows that arbitrary group assignments produce immediate in-group favoritism. What does this reveal about the roots of prejudice?",
      choices:[
        "Prejudice requires a history of real competition or conflict between groups",
        "Mere categorization into groups is enough to produce in-group favoritism",
        "Prejudice arises only between groups that differ in their cultural practices",
        "Favoritism in these studies reflects rational pursuit of personal monetary gain"
      ],
      ans:1,
      exp:"In Tajfel's **minimal group** studies, people sorted by trivial criteria (such as preferring Klee or Kandinsky) favored anonymous in-group members even though they had no history, no contact and nothing personal to gain, and they often chose to maximize the difference between in-group and out-group rewards even at the cost of a lower absolute reward for their own group. Categorization alone is therefore sufficient, which challenges realistic conflict theory as a complete account. Personal gain cannot explain allocations that never benefited the allocator."
    },
    {
      q:"A hospital-sponsored workshop brings physicians and community members together as equal participants and tells them they share the goal of improving neighborhood health. However, the two groups spend the afternoon listening to lectures with no joint task, and prejudice does not decline. Which of Allport's conditions was unmet?",
      choices:[
        "Equal status between the two groups",
        "Common goals shared by both groups",
        "Intergroup cooperation on a joint task",
        "Support from authorities or institutions"
      ],
      ans:2,
      exp:"Allport's four conditions are equal status, common goals, **intergroup cooperation** and institutional support; here the hospital sponsored the event, participants met as equals and a shared goal was stated, but nobody worked interdependently with the other group. Common goals is the tempting distractor, but a goal announced without joint work to pursue it is not cooperation, which is why Sherif's Robbers Cave groups needed superordinate tasks they could only complete together. Passive, unstructured contact can leave stereotypes intact."
    },
    {
      q:"Demographic concordance (patient-provider racial match) improves health outcomes for some minority patients. From a social identity theory perspective, why might concordance improve the clinical encounter?",
      choices:[
        "Matched providers are more technically skilled at treating patients of their own race",
        "Patients see a matched provider as an in-group member, raising trust and openness",
        "Matched providers and patients share identical cultural practices and health beliefs",
        "Minority providers exert more effort with minority patients than other providers do"
      ],
      ans:1,
      exp:"Under social identity theory, a patient who categorizes the provider as an **in-group** member extends more trust, worries less about being stereotyped, and discloses more openly, which improves communication and adherence. The benefit lies in the patient's psychological experience, not provider skill or effort, and members of a racial group do not share identical practices. Cross-racial providers who practice cultural humility can achieve much of the same trust."
    },
    {
      q:"Self-categorization theory predicts that when a social identity becomes salient, individuals conform more strongly to in-group norms. How does this principle explain behavior in medical teams during high-stakes situations?",
      choices:[
        "High stakes make social identities irrelevant, so pure rational analysis takes over",
        "Salient rank identities increase deference, so juniors hesitate to voice concerns",
        "Self-categorization applies only to racial and gender identities, not professional roles",
        "High stress eliminates self-categorization, because deliberate System 2 thinking dominates"
      ],
      ans:1,
      exp:"Under stress, professional rank becomes a **salient category**, and depersonalized team members conform to its norms: trainees defer to seniors and hesitate to speak up about errors (the authority gradient). Self-categorization applies to any salient group, including professional roles, so the race-and-gender-only choice is wrong. Crew Resource Management and TeamSTEPPS counter this by making a superordinate identity salient ('we are all this patient's safety team')."
    }
  ]
}

]; // end EXAM2_PS_PASSAGES


const EXAM2_PS_DISCRETES = [
  {
    subj:'psych_soc', id:'e2ps_d_1', type:'discrete', topic:'P/S',
    q:"According to Freud's structural model of the mind, the superego develops through which process, and what is its primary function?",
    choices:[
      "It forms through operant conditioning in infancy and operates on the pleasure principle",
      "It forms by internalizing parental morals in the phallic stage and acts as the conscience",
      "It is present at birth and serves as the primary source of aggressive instinctual drives",
      "It forms by mediating id and reality in toddlerhood and operates on the reality principle"
    ],
    ans:1,
    exp:"The **superego** forms as the Oedipal conflict resolves in the phallic stage (about ages 3–6), when the child identifies with the same-sex parent and internalizes parental and societal standards; it acts as the conscience (producing guilt) and the ego ideal (aspirations). The pleasure principle and inborn drives belong to the id. The reality-principle choice describes the ego, the most tempting confusion."
  },
  {
    subj:'psych_soc', id:'e2ps_d_2', type:'discrete', topic:'P/S',
    q:"The social readjustment rating scale (SRRS, Holmes & Rahe) assigns stress points to major life events. Death of a spouse scores highest (100 points). Which theoretical limitation of the SRRS is most important?",
    choices:[
      "It counts positive events such as marriage, which cannot generate any stress",
      "It assigns fixed weights to events, ignoring each person's cognitive appraisal",
      "It assumes life events can cause illness, which research has entirely disproven",
      "It is too long and complex to be administered to patients in clinical settings"
    ],
    ans:1,
    exp:"The SRRS treats stressfulness as a fixed property of each event, but Lazarus's **transactional model** holds that stress depends on appraisal: whether the event is threatening (primary) and whether one can cope (secondary). The death of a spouse might be devastating for one person and a relief for another in an abusive marriage. Counting positive events is a deliberate design choice, since change itself demands adjustment; the scale's other limitations include ignoring daily hassles and chronic stressors."
  },
  {
    subj:'psych_soc', id:'e2ps_d_3', type:'discrete', topic:'P/S',
    q:"In Skinner's operant conditioning framework, negative reinforcement differs from punishment. Which correctly distinguishes them?",
    choices:[
      "Negative reinforcement decreases a behavior, whereas punishment increases it",
      "Negative reinforcement removes an aversive stimulus to increase a behavior",
      "Negative reinforcement and punishment both add an aversive stimulus to reduce behavior",
      "Punishment always involves physical pain, while negative reinforcement is social"
    ],
    ans:1,
    exp:"**Reinforcement** always increases a behavior and **punishment** always decreases it; 'negative' means a stimulus is removed, not that something bad happens. Taking ibuprofen to remove a headache is negative reinforcement (ibuprofen use increases), whereas a speeding ticket is positive punishment and losing screen time is negative punishment. Treating negative reinforcement as a form of punishment is the classic error."
  },
  {
    subj:'psych_soc', id:'e2ps_d_4', type:'discrete', topic:'P/S',
    q:"The biopsychosocial model of illness was proposed by Engel as an alternative to the biomedical model. Which statement best describes the core difference?",
    choices:[
      "It replaces biological causes of illness with psychological explanations",
      "It explains illness through interacting biological, psychological and social factors",
      "It applies only to psychiatric illness, leaving physical disease to the biomedical model",
      "It was developed specifically to explain chronic pain that lacks a biological cause"
    ],
    ans:1,
    exp:"Engel (1977) argued that the biomedical model's reduction of disease to biological dysfunction is incomplete; the **biopsychosocial model** adds psychological factors (beliefs, mood, behavior) and social factors (family, culture, SES) that interact with biology in every illness. For example, type 2 diabetes involves insulin resistance, depression that undermines self-management, and food access. The model includes biology rather than rejecting it, and it applies to all illness, not just psychiatric conditions."
  },
  {
    subj:'psych_soc', id:'e2ps_d_5', type:'discrete', topic:'P/S',
    q:"Sensory adaptation is a universal perceptual phenomenon. Which statement correctly describes its mechanism and an example in clinical medicine?",
    choices:[
      "Receptor sensitivity rises with constant stimulation; clinicians grow more alert to faint signs",
      "Receptor firing declines with constant stimulation; a nurse stops noticing a ward's odor",
      "It occurs only for painful stimuli; constant pain fades through endogenous opioid release",
      "It reflects receptor damage; prolonged loud monitor alarms cause lasting hearing loss"
    ],
    ans:1,
    exp:"**Sensory adaptation** is a decline in receptor (and early neural) responsiveness to a constant, unchanging stimulus, so a persistent odor or the feel of clothing fades from awareness within minutes. It is normal and reversible, and nociceptors adapt little, so it is not limited to pain. Alarm fatigue is often cited as an example but is better described as **habituation**, a learned central decrease in responding to repeated, non-consequential stimuli, rather than receptor-level adaptation."
  },
  {
    subj:'psych_soc', id:'e2ps_d_6', type:'discrete', topic:'P/S',
    q:"During a clinical trial, patients in the control group who receive a placebo show significant symptom improvement. This response is mediated by which mechanisms?",
    choices:[
      "Regression to the mean alone, with no genuine change in the patients' physiology",
      "Expectation and conditioning that trigger endogenous opioid and dopamine release",
      "Reporting bias alone, because placebos cannot change any objective biological measure",
      "The patient-provider relationship alone, with no measurable neurobiological correlate"
    ],
    ans:1,
    exp:"Placebo responses involve real neurobiology: expectation releases **endogenous opioids** (naloxone blocks placebo analgesia; Levine, 1978) and dopamine (seen in Parkinson's patients given placebo), and prior effective treatment can classically condition physiological responses. Regression to the mean is tempting because it does inflate apparent improvement in control groups, but it cannot account for opioid-dependent effects that an antagonist blocks. Nocebo effects (expecting harm) have their own mechanisms."
  },
  {
    subj:'psych_soc', id:'e2ps_d_7', type:'discrete', topic:'P/S',
    q:"Sociologist Émile Durkheim classified suicide by levels of social integration and moral regulation. Which set correctly pairs three of his types with their structural causes?",
    choices:[
      "Egoistic with excessive regulation; anomic with excessive integration; fatalistic with weak integration",
      "Egoistic with weak integration; anomic with weak regulation; altruistic with excessive integration",
      "Egoistic with excessive integration; altruistic with weak regulation; anomic with excessive regulation",
      "Altruistic with weak integration; fatalistic with weak regulation; anomic with excessive integration"
    ],
    ans:1,
    exp:"Durkheim tied suicide rates to two social forces, **integration** and **regulation**: weak integration produces egoistic suicide (isolated individuals), excessive integration produces altruistic suicide (self-sacrifice for the group), weak regulation produces anomic suicide (normlessness during economic or social upheaval), and excessive regulation produces fatalistic suicide (oppressive control). The distractors swap these pairings. Remember egoistic = too little belonging and anomic = too few norms."
  },
  {
    subj:'research', id:'e2ps_d_8', type:'discrete', topic:'P/S',
    q:"A researcher finds that children who watch more violent television are more likely to engage in aggressive behavior. However, a critic points out that aggressive children may self-select violent television. What methodological approach would best address this alternative explanation?",
    choices:[
      "Increase the sample size so that random sampling error is reduced",
      "Randomly assign children to violent or nonviolent programs, then measure aggression",
      "Statistically adjust for family income and parenting style in cross-sectional data",
      "Compare the past viewing habits of aggressive and nonaggressive children"
    ],
    ans:1,
    exp:"**Random assignment** breaks any link between children's preexisting aggressiveness and what they watch, so later differences in aggression can be attributed to the programs, as in Bandura's Bobo doll studies. A larger sample reduces random error but not this systematic selection bias, and adjusting for other covariates cannot rule out reverse causation. Comparing past habits of aggressive and nonaggressive children is a case-control design that looks backward, so it cannot show which came first."
  },
  {
    subj:'psych_soc', id:'e2ps_d_9', type:'discrete', topic:'P/S',
    q:"George Herbert Mead's symbolic interactionism proposes that the self develops through social interaction. His concept of 'taking the role of the other' refers to:",
    choices:[
      "Imitating other people's behaviors in order to learn social norms",
      "Viewing oneself from others' perspectives, eventually the generalized other",
      "Sharing the emotions that another person is experiencing in the moment",
      "Evaluating one's own abilities relative to members of a reference group"
    ],
    ans:1,
    exp:"For Mead, the social self (the 'me') develops through **role-taking**: imagining how others see us, first specific others in the play stage, then several roles at once in the game stage, and finally the **generalized other**, society's internalized expectations. Imitation is the tempting distractor, but it is the preparatory stage before true role-taking begins. Cooley's looking-glass self is a closely related idea."
  },
  {
    subj:'psych_soc', id:'e2ps_d_10', type:'discrete', topic:'P/S',
    q:"A physician notices that when she uses the term 'cancer survivor' with patients, they report feeling more empowered and proactive about follow-up care, compared to when she uses 'cancer patient.' This phenomenon is best explained by:",
    choices:[
      "Recency effect — the last word heard was the most salient part of the visit",
      "Labeling — the term activates a self-schema of agency and resilience",
      "Operant conditioning — the word reinforces the patients' follow-up behavior",
      "Halo effect — positive wording creates a global positive view of the physician"
    ],
    ans:1,
    exp:"Labels shape self-concept: 'survivor' activates a **schema** of agency, resilience and life beyond the disease, raising self-efficacy, whereas 'patient' implies ongoing illness and dependence, which is why person-first, nonpathologizing language is recommended. Operant conditioning is tempting, but reinforcement must follow a behavior, and here the word came before the behavior change. The halo effect would change patients' views of the physician, not their own proactivity."
  },
  {
    subj:'research', id:'e2ps_d_11', type:'discrete', topic:'P/S',
    q:"Which correctly describes the difference between incidence and prevalence, and how they relate to each other?",
    choices:[
      "Incidence counts existing cases, while prevalence counts only new cases",
      "Incidence is the rate of new cases; prevalence ≈ incidence × average duration",
      "Incidence and prevalence are equal whenever disease duration stays constant",
      "Prevalence is always higher than incidence for every disease in a population"
    ],
    ans:1,
    exp:"**Incidence** is new cases per person-time at risk, and **prevalence** is the proportion with the condition at a point in time; in a steady state, prevalence ≈ incidence × average duration. Antiretroviral therapy illustrates this: HIV prevalence rose as survival lengthened even with stable incidence, whereas influenza has high incidence but low point prevalence because it is brief. Swapping the two definitions is the most common error."
  },
  {
    subj:'psych_soc', id:'e2ps_d_12', type:'discrete', topic:'P/S',
    q:"Kohlberg's theory of moral development proposes three levels of moral reasoning. A person who refuses to jaywalk even when alone because 'rules exist for everyone's safety' is best described as reasoning at which level?",
    choices:[
      "Preconventional, stage 1 — avoiding the punishment of a jaywalking ticket",
      "Conventional, stage 4 — upholding rules because they maintain social order",
      "Postconventional, stage 6 — applying self-chosen universal ethical principles",
      "Preconventional, stage 2 — following rules only when it serves self-interest"
    ],
    ans:1,
    exp:"Valuing a rule because it protects everyone and keeps society orderly, even with no one watching, is **stage 4 (law and order)** at the conventional level. Postconventional reasoning is tempting, but it treats laws as changeable social contracts (stage 5) or subordinates them to universal principles that can justify breaking them (stage 6); this person is simply upholding the rule. Preconventional reasoning would cite punishment or personal gain."
  },
  {
    subj:'psych_soc', id:'e2ps_d_13', type:'discrete', topic:'P/S',
    q:"In classical conditioning, what is the difference between extinction and spontaneous recovery?",
    choices:[
      "Extinction permanently erases the CS-US association, so recovery cannot occur",
      "Extinction suppresses the CR through new learning; recovery shows it was not erased",
      "Extinction requires pairing the CS with the US; recovery requires the US alone",
      "Spontaneous recovery is a form of extinction that occurs without any intervention"
    ],
    ans:1,
    exp:"**Extinction** is the decline of the CR when the CS is repeatedly presented without the US; it creates new inhibitory learning rather than erasing the original association, so after a rest the CR returns (**spontaneous recovery**), and it can also return through renewal or reinstatement. Permanent erasure is the tempting misconception. Clinically, this is why fears can relapse after exposure therapy and why booster sessions help."
  },
  {
    subj:'psych_soc', id:'e2ps_d_14', type:'discrete', topic:'P/S',
    q:"A study finds that patients with higher health literacy show better medication adherence, fewer ER visits, and better chronic disease control. Health literacy is best defined as:",
    choices:[
      "Reading and writing at an adult level, enough to understand prescription labels",
      "Capacity to obtain, understand and use health information to make decisions",
      "Formal educational attainment, so that college graduates are health literate",
      "Compliance, meaning how closely a patient follows the physician's instructions"
    ],
    ans:1,
    exp:"**Health literacy** is the capacity to obtain, process, understand and use health information and services, including numeracy and navigating the health system, not just reading. The reading-only definition is tempting but too narrow, and highly educated people can still struggle with risk statistics. Low health literacy (roughly a third of US adults) independently predicts worse outcomes; teach-back and plain language help."
  },
  {
    subj:'research', id:'e2ps_d_15', type:'discrete', topic:'P/S',
    q:"Which research design allows researchers to establish temporal sequence (exposure precedes outcome) without the ethical constraints of experimental manipulation?",
    choices:[
      "Cross-sectional study — exposure and outcome are measured at the same time",
      "Case-control study — subjects chosen by outcome, then past exposure recalled",
      "Prospective cohort study — exposure measured at baseline, outcomes tracked",
      "Ecological study — exposures and outcomes compared across whole populations"
    ],
    ans:2,
    exp:"A **prospective cohort** measures exposure before outcomes occur and follows participants forward, establishing temporal sequence without assigning anyone a harmful exposure. Case-control studies are tempting because they examine exposure history, but they start from the outcome and rely on recall, which weakens temporal inference. Cross-sectional designs measure both at once, and ecological designs risk the ecological fallacy."
  },
  {
    subj:'psych_soc', id:'e2ps_d_16', type:'discrete', topic:'P/S',
    q:"A patient experiencing a panic attack believes they are dying of a heart attack. Their catastrophic interpretation of normal physiological symptoms amplifies the panic response. This positive feedback loop between cognition and physiology is best explained by which model?",
    choices:[
      "Behavioral model — avoiding feared situations negatively reinforces the fear",
      "Cognitive model — catastrophic misreading of sensations escalates arousal",
      "Conditioning model — internal bodily cues become conditioned fear stimuli",
      "Biological model — locus coeruleus overactivity acts without any cognition"
    ],
    ans:1,
    exp:"In Clark's **cognitive model of panic**, benign bodily sensations are catastrophically misinterpreted ('I'm having a heart attack'), which raises anxiety and arousal, intensifying the sensations and seeming to confirm the belief, a positive feedback loop. Interoceptive conditioning is tempting, but it bypasses the interpretation the stem emphasizes, and avoidance explains how panic disorder is maintained over time, not the escalation within an attack. CBT with interoceptive exposure and cognitive restructuring targets this loop."
  },
  {
    subj:'psych_soc', id:'e2ps_d_17', type:'discrete', topic:'P/S',
    q:"In Weber's sociological theory, bureaucracies are characterized by formal hierarchy, written rules, impersonal norms, and specialized division of labor. Weber argued that bureaucracy is the most efficient organizational form, but also identified its 'iron cage' problem. What did he mean by 'iron cage'?",
    choices:[
      "Bureaucracies physically confine workers through constant surveillance systems",
      "Rationalization traps people in efficient rules that strip work of meaning",
      "Bureaucracies concentrate economic power in management, creating class conflict",
      "Charismatic leaders bind followers so tightly that they cannot leave the group"
    ],
    ans:1,
    exp:"Weber's **iron cage** describes how formal rationalization, the drive for efficiency, calculability and rule-following, traps people in impersonal systems that subordinate meaning and individual values (disenchantment). Surveillance-based control is closer to Foucault's panopticon, and class conflict over economic power is Marx's emphasis. In medicine, documentation and authorization burdens that contribute to burnout are often cited as examples."
  }
]; // end EXAM2_PS_DISCRETES



const EXAM2_PS_EXTRA = [
  {
    subj:'psych_soc', id:'e2ps_d_18', type:'discrete', topic:'P/S',
    q:"A patient starts a new medication without knowing that it causes tachycardia. While waiting for a biopsy result, she notices her racing heart and concludes she must be anxious about the result. When her physician explains the side effect, her anxiety fades even though her heart rate stays elevated. Which theory of emotion best explains this sequence?",
    choices:[
      "James-Lange — the emotion is simply the perception of the bodily arousal itself",
      "Cannon-Bard — arousal and emotion arise simultaneously and independently",
      "Schachter-Singer — arousal plus a cognitive label from context yields emotion",
      "Lazarus — appraisal of the situation occurs first and then triggers arousal"
    ],
    ans:2,
    exp:"The **Schachter-Singer two-factor theory** holds that emotion requires both physiological arousal and a cognitive label; the unexplained arousal was attributed to the biopsy and labeled anxiety, and once a nonemotional cause (the drug) was supplied, the anxiety faded while the arousal persisted, mirroring the classic epinephrine misattribution experiments. James-Lange is tempting because arousal came first, but it predicts the emotion should last as long as the arousal does. In Lazarus's theory, appraisal precedes arousal, the reverse of this sequence."
  },
  {
    subj:'psych_soc', id:'e2ps_d_19', type:'discrete', topic:'P/S',
    q:"To reduce childhood obesity, a school district revises its own cafeteria policies to improve the nutritional content of school lunches. This intervention operates at which level of McLeroy's social ecological model?",
    choices:[
      "Intrapersonal — changing individual children's nutrition knowledge and attitudes",
      "Interpersonal — changing family food practices and peer influences on eating",
      "Institutional — changing school policies that shape the food all students receive",
      "Community — changing food availability across the surrounding neighborhood"
    ],
    ans:2,
    exp:"McLeroy's **social ecological model** nests influences as intrapersonal, interpersonal, institutional/organizational, community and public policy; changing a school's own lunch rules alters an organization's environment for every child in it, an **institutional** intervention. Community level is tempting, but it concerns relationships among organizations and neighborhood-wide resources, not one institution's internal policies. Structural changes like this reach children regardless of individual motivation."
  }
];


function buildExam2PS_Section() {
  const questions = [];
  const p = EXAM2_PS_PASSAGES;
  const d = EXAM2_PS_DISCRETES;
  const e = EXAM2_PS_EXTRA;

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
  questions.push(d[13], d[14], d[15], d[16], e[0], e[1]);

  return questions;
}
const EXAM2_PS_QUESTIONS = buildExam2PS_Section();
