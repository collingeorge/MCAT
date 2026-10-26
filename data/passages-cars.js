// CARS passages (Passage mode and full-length exam CARS sections)
const CARS_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 1: Philosophy — Free Will and Moral Responsibility
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_1',
  topic:'CARS',
  title:'Determinism and the Conditions for Moral Blame',
  passage:`The compatibility of determinism with moral responsibility has occupied philosophers for centuries, and the debate has acquired new urgency with the rise of neuroscience. If every mental event is the product of prior physical causes — neural firings determined by genetics and experience — then it is tempting to conclude, as some neuroscientists have, that the concept of moral responsibility is a fiction we would do well to abandon.

This conclusion moves too quickly. The compatibilist tradition, running from Hume through Frankfurt, argues that what matters for responsibility is not the absence of causal determination but the nature of the causal chain. A person acts freely, on this view, when her action flows from her own desires and values rather than from compulsion, manipulation, or incapacity. The kleptomaniac who steals against her own better judgment is unfree not because her action was caused but because it was caused by an impulse that bypassed her reflective agency. The person who donates to charity because she genuinely values generosity acts freely even if neuroscience could, in principle, trace every step of her deliberation to antecedent neural states.

Critics of compatibilism counter that this merely relocates the problem. If the desires and values that constitute a person's "reflective agency" are themselves products of unchosen genetics and socialization, then the compatibilist's freedom amounts to acting in accordance with a self one did not choose to be. This line of argument, associated with Galen Strawson, holds that genuine moral responsibility requires what he calls "ultimate origination" — the ability to be the ultimate cause of one's own character. Since no one satisfies this requirement, robust moral responsibility is impossible.

Yet Strawson's argument may prove too much. The demand for ultimate origination sets a standard that, on reflection, we have no independent reason to accept. We do not require that a river's flow be uncaused in order to distinguish a healthy river from a dammed one; we do not require that a calculation be uncaused in order to distinguish a correct calculation from an incorrect one. The relevant question is not whether a process has antecedent causes but what kind of process it is. Similarly, the relevant question for moral responsibility is not whether a person's character has causes but whether her deliberative capacities are functioning — whether she is responsive to reasons, capable of recognizing the moral dimensions of her situation, and able to act accordingly.

The practical stakes of this debate are considerable. If we abandon moral responsibility, we must reconceive punishment, praise, and blame entirely as forward-looking instruments of behavior modification rather than backward-looking responses to what a person deserves. Some find this reconception liberating; others find it impoverished. What is clear is that the neuroscientific argument against responsibility, while superficially compelling, rests on a philosophical assumption — that causation precludes freedom — that has been contested for centuries and remains far from established.`,
  questions:[
    {
      q:"The author's primary purpose in this passage is to:",
      choices:[
        "Prove that compatibilism is the correct and final theory of free will",
        "Show that neuroscience has settled the free will debate in favor of determinism",
        "Defend a compatibilist view of responsibility against neuroscientific and Strawsonian objections",
        "Survey competing theories of punishment and argue for a purely rehabilitative model"
      ],
      ans:2,
      exp:"The author rebuts the neuroscientific inference ('This conclusion moves too quickly') and then Strawson's demand for ultimate origination ('may prove too much'), defending the view that functioning deliberative capacities ground responsibility. The author never calls compatibilism proven, says the anti-responsibility argument 'remains far from established' rather than settled, and mentions forward-looking punishment only as one stake of the debate."
    },
    {
      q:"According to the passage, the compatibilist distinguishes free action from unfree action based on whether the action:",
      choices:[
        "Had no prior neural causes that neuroscience could, in principle, trace step by step",
        "Flows from the agent's own desires and values rather than from compulsion",
        "Had consequences that the agent was able to predict accurately beforehand",
        "Came from a character the agent chose rather than one produced by genetics"
      ],
      ans:1,
      exp:"Compatibilists hold that a person acts freely 'when her action flows from her own desires and values rather than from compulsion, manipulation, or incapacity.' The charitable donor acts freely even though neuroscience could trace her deliberation to neural states, so the absence of prior causes is exactly what compatibilism does not require. A chosen character is Strawson's demand, not the compatibilist's."
    },
    {
      q:"The author uses the river analogy in paragraph four primarily to:",
      choices:[
        "Suggest that natural processes and human deliberation are alike in every important respect",
        "Challenge Strawson by showing that caused processes can still be meaningfully evaluated",
        "Support the hard determinist claim that human choices are as mechanical as flowing water",
        "Argue that moral responsibility should be studied empirically, like any natural process"
      ],
      ans:1,
      exp:"We distinguish a healthy river from a dammed one without requiring that its flow be uncaused, so 'the relevant question is not whether a process has antecedent causes but what kind of process it is.' The analogy targets Strawson's ultimate-origination standard. It compares only how we evaluate processes; it does not equate deliberation with natural events or endorse hard determinism."
    },
    {
      q:"In paragraph two the author says that one conclusion 'moves too quickly.' Which conclusion is this?",
      choices:[
        "That compatibilism fails because it cannot satisfy the demand for ultimate origination",
        "That responsibility requires only that a person's deliberative capacities are functioning",
        "That the neural causation of mental events shows moral responsibility to be a fiction",
        "That punishment should be reconceived as a forward-looking tool for modifying behavior"
      ],
      ans:2,
      exp:"'This conclusion' refers back to paragraph one: that because mental events are caused by prior physical events, moral responsibility is 'a fiction we would do well to abandon.' The final paragraph explains why the inference is hasty: it assumes causation precludes freedom. The functioning-capacities view is the author's own position, Strawson's objection is answered separately, and forward-looking punishment is presented neutrally."
    },
    {
      q:"The passage implies that if Strawson's demand for ultimate origination were accepted, it would:",
      choices:[
        "Vindicate compatibilism by showing that reflective agency is sufficient for responsibility",
        "Support neuroscientific reductionism while leaving the concept of desert fully intact",
        "Call into question evaluative distinctions we routinely draw among other caused processes",
        "Require that punishment be abolished outright rather than reformed to look forward"
      ],
      ans:2,
      exp:"Saying an argument 'may prove too much' means its standard would also condemn cases where we clearly make sound distinctions. Since rivers and calculations have causes, a rule that caused processes cannot be meaningfully evaluated would undo those distinctions too. Strawson's view denies rather than vindicates compatibilism, and the passage says nothing about abolishing punishment."
    },
    {
      q:"Based on the passage, the author would most likely judge that which person is NOT morally responsible for what she does?",
      choices:[
        "A woman whose generous character was shaped largely by her upbringing and her genes",
        "A woman whose capacity to recognize and respond to moral reasons has been destroyed by injury",
        "A woman whose decision to lie could be traced by neuroscientists to earlier neural states",
        "A woman who steals after careful reflection because she values wealth more than honesty"
      ],
      ans:1,
      exp:"For the author, the question is 'whether her deliberative capacities are functioning': whether she is 'responsive to reasons' and 'capable of recognizing the moral dimensions of her situation.' Injury that destroys those capacities removes responsibility. An unchosen upbringing or a traceable neural cause does not, and the reflective thief acts from her own values, so she is responsible even though she acts badly."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 2: History — The Myth of Scientific Revolution
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_2',
  topic:'CARS',
  title:'Continuity and Rupture in the History of Science',
  passage:`The concept of scientific revolution, popularized by Thomas Kuhn's 1962 work, has become so embedded in how we narrate the history of science that it is worth pausing to ask whether it distorts as much as it illuminates. The standard story runs as follows: normal science proceeds by puzzle-solving within an accepted paradigm; anomalies accumulate until a crisis point is reached; a revolutionary new paradigm displaces the old one in a relatively sudden and total fashion. Kuhn's own examples — Copernicus displacing Ptolemy, Lavoisier displacing phlogiston theory, Einstein displacing Newtonian mechanics — have become canonical.

The problem with this narrative is that it is, in significant respects, retrospectively constructed. Historians who have examined the actual archives tell a messier story. The Copernican revolution, for instance, took over a century to consolidate. Copernicus himself retained circular orbits and epicycles; the full heliocentric system required Kepler's ellipses, Galileo's telescopic observations, and Newton's gravitational mechanics to achieve anything like explanatory dominance. The "revolution" was not a moment but a process, and many natural philosophers continued working productively within geocentric frameworks well into the seventeenth century.

The phlogiston case is similarly instructive. Lavoisier did not simply discover that phlogiston was wrong and oxygen was right. He conducted a prolonged, contested campaign to reinterpret a large body of experimental results, many of which had already been obtained by phlogiston theorists. Joseph Priestley, who first isolated what Lavoisier would call oxygen, interpreted it within the phlogiston framework until his death. The persistence of committed and capable scientists in the old paradigm is not, as Kuhn's narrative might suggest, mere irrationality or conservatism; it reflects the genuine difficulty of adjudicating between frameworks that, for a considerable time, are comparably successful at organizing experience.

None of this is to deny that science changes, sometimes radically. It is rather to suggest that the revolution metaphor, with its connotations of sudden, complete, and violent displacement, is a poor guide to how such change actually occurs. Scientific change more often resembles the gradual transformation of a tradition — concepts are stretched, refined, and reinterpreted; what once seemed a fundamental commitment is quietly renegotiated; the new and the old coexist in productive tension for generations. The revolution metaphor encourages us to ask the wrong questions: when did the old paradigm fall? Who was on the right side of history? These are dramatic questions but not necessarily illuminating ones.

What is at stake is not merely historiographical accuracy but our self-understanding as a scientific culture. A culture that understands its past as a series of revolutionary ruptures will have different expectations about how knowledge advances — and different tolerances for uncertainty, coexistence of frameworks, and incremental progress — than one that understands change as gradual and contested. The former risks a kind of temporal arrogance: the assumption that we, standing after the last revolution, are in a uniquely privileged epistemic position. The latter fosters a more productive humility.`,
  questions:[
    {
      q:"The author's central claim in this passage is best described as:",
      choices:[
        "Kuhn's paradigm model accurately describes every major episode of change in the history of science",
        "The revolution metaphor misrepresents scientific change, which is usually gradual and contested",
        "Science never undergoes fundamental change; it merely reinterprets data it already possesses",
        "Archival historians have shown that the Copernican and chemical revolutions were not real advances"
      ],
      ans:1,
      exp:"The author argues that the revolution metaphor 'is a poor guide to how such change actually occurs' because change is usually a gradual, contested transformation of a tradition. The author explicitly grants that 'science changes, sometimes radically,' and never denies that Copernicus or Lavoisier marked real advances; the archival point is only that the changes took longer and were messier than the story suggests."
    },
    {
      q:"The author mentions Priestley's continued use of the phlogiston framework primarily to:",
      choices:[
        "Suggest that Priestley was a less capable experimenter than his rival Lavoisier",
        "Show that loyalty to an old framework can reflect real difficulty in choosing between rivals",
        "Show that committed theorists will ignore experimental results that conflict with their theory",
        "Support Kuhn's claim that a new paradigm wins by converting the whole community at once"
      ],
      ans:1,
      exp:"The author says the persistence of 'committed and capable scientists' in the old paradigm 'is not... mere irrationality or conservatism' but reflects 'the genuine difficulty of adjudicating between frameworks' that are for a time comparably successful. Priestley is called capable, not inferior, and his case is used against Kuhn's tidy narrative, not in support of it."
    },
    {
      q:"According to the passage, which questions does the revolution metaphor encourage that the author considers dramatic but not illuminating?",
      choices:[
        "What conceptual resources did scientists in the older framework use to organize experience?",
        "How do new and old frameworks coexist and interact during long periods of transition?",
        "When did the old paradigm fall, and who was on the right side of history?",
        "What role does the slow, incremental refinement of concepts play in scientific advance?"
      ],
      ans:2,
      exp:"Paragraph four names these questions directly: 'when did the old paradigm fall? Who was on the right side of history? These are dramatic questions but not necessarily illuminating ones.' Questions about coexistence of frameworks, gradual refinement and how old frameworks organized experience are the kind the author's gradualist picture would encourage."
    },
    {
      q:"The author's attitude toward Kuhn's work can best be described as:",
      choices:[
        "Uncritical acceptance: the model is presented as essentially correct in its main outlines",
        "Complete rejection: Kuhn's work is portrayed as having no value for understanding science",
        "Critical engagement: it grants the model's influence but faults its historical accuracy",
        "Ambivalence: the author cannot decide whether the model is useful or harmful overall"
      ],
      ans:2,
      exp:"The author acknowledges that Kuhn's concept is 'embedded in how we narrate the history of science' but asks whether it 'distorts as much as it illuminates' and calls the revolution metaphor 'a poor guide' to how change occurs. That is critical engagement. The author takes a clear position, so the attitude is not ambivalence, and granting that the model illuminates something rules out complete rejection."
    },
    {
      q:"The final paragraph shifts the argument by:",
      choices:[
        "Introducing a new historical case that cuts against the author's earlier claims about Copernicus",
        "Conceding that the revolution metaphor is ultimately more accurate than its alternative",
        "Broadening the stakes from historical accuracy to how science understands its own progress",
        "Proposing that the revolution metaphor be replaced by a biological metaphor of evolution"
      ],
      ans:2,
      exp:"The paragraph opens: 'What is at stake is not merely historiographical accuracy but our self-understanding as a scientific culture,' and then contrasts temporal arrogance with productive humility. No new historical case appears, nothing is conceded to the revolution metaphor, and although the author favors gradual change, no biological metaphor is proposed."
    },
    {
      q:"Which of the following findings, if true, would most WEAKEN the author's argument?",
      choices:[
        "Archival evidence that most major theory changes were complete within a decade, with few holdouts",
        "Evidence that some geocentric astronomers did productive work well into the seventeenth century",
        "Evidence that Kepler and Galileo disagreed about the shape of the planets' orbits",
        "Evidence that Kuhn's book is still widely assigned in courses on the history of science"
      ],
      ans:0,
      exp:"The author's case rests on archival evidence that change was slow and that capable scientists kept working in old frameworks, so that 'the new and the old coexist in productive tension for generations.' Evidence that major changes were quick and nearly unanimous would fit the revolution metaphor instead. Productive geocentrists support the author, disagreement between Kepler and Galileo shows the gradual assembly the author describes, and the book's popularity only confirms its influence, which the author already grants."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 3: Ethics — Obligations to Future Generations
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_3',
  topic:'CARS',
  title:'The Non-Identity Problem and Environmental Ethics',
  passage:`Among the most vexing problems in moral philosophy is what Derek Parfit called the non-identity problem, which arises whenever our choices affect not only the welfare of future people but the very identities of those people. Consider a policy that depletes natural resources and degrades the environment for the next three centuries, after which the world recovers. The people who will inhabit that degraded world are not the same people who would have existed under a conservation policy — they owe their very existence to the chain of events set in motion by depletion. If those future people are born into a life still worth living, it seems we cannot say we have harmed them; their only alternative was not to exist.

This conclusion strikes most people as clearly wrong. Surely a policy of deliberate resource depletion that condemns future generations to poverty and environmental degradation is morally impermissible, even if we cannot identify a specific person who was made worse off by it. The challenge for moral philosophy is to explain why our intuition is correct without relying on the standard harm principle, which requires a comparison between a person's actual state and some counterfactual condition. Since the relevant future people would not have existed under the alternative policy, they have no counterfactual to appeal to.

Several strategies have been proposed. One is to move from person-affecting principles, which evaluate outcomes solely in terms of their effects on identifiable individuals, to impersonal principles, which evaluate outcomes in terms of total or average welfare. On an impersonal view, a world with more happiness and less suffering is better than one with less, regardless of whether the individuals are the same. This approach handles the non-identity problem neatly but at a cost: it generates counterintuitive conclusions in other cases, including the so-called Repugnant Conclusion, in which a world with a vast population of barely-worth-living lives is ranked higher than a smaller population of very happy people.

Another strategy is to argue that we have obligations not merely to individuals but to types of people — to the category of future persons, or to humanity as a collective entity extended through time. On this view, harming the prospects of future generations is wrong because it violates our obligations to humanity, even if no specific future person can claim to have been wronged. This approach preserves the intuition that resource depletion is wrong but requires developing a coherent account of what it means to wrong a type or category rather than an individual.

A third strategy, less radical than either of the above, is to question whether the harm principle is as central to morality as is commonly assumed. Even if we cannot say that future people are harmed by our policies, we might still say that those policies are wrong because they express vicious character, violate duties of stewardship, or constitute failures of practical wisdom. On this virtue-theoretic approach, the wrongness of destroying the environment is not reducible to harm but is instead a matter of what kind of agents we are and what our relationship to the natural world ought to be.`,
  questions:[
    {
      q:"The non-identity problem, as described in the passage, arises specifically because:",
      choices:[
        "Future generations cannot consent to the policies whose effects they will have to live with",
        "Our choices determine who will exist, so future people have no better-off alternative self",
        "Environmental harms to future people cannot be measured in monetary or welfare terms",
        "The harm principle cannot be applied to collective harms spread across many people"
      ],
      ans:1,
      exp:"The problem arises because our choices affect 'the very identities' of future people: those born after depletion 'owe their very existence' to it, so 'their only alternative was not to exist.' Without a counterfactual in which the same people are better off, the standard harm comparison fails. Consent, measurability and the collective nature of the harm are not what the passage identifies as the source of the problem."
    },
    {
      q:"According to the passage, the impersonal principles approach handles the non-identity problem but creates a different difficulty. What is it?",
      choices:[
        "It requires identifying the specific individuals who will be harmed by resource depletion",
        "It cannot explain why consent should matter in collective decisions about the environment",
        "It ranks a huge population of barely worthwhile lives above a smaller, very happy one",
        "It makes environmental policy depend on uncertain empirical forecasts of future welfare"
      ],
      ans:2,
      exp:"The impersonal view works 'but at a cost': it generates the Repugnant Conclusion, 'in which a world with a vast population of barely-worth-living lives is ranked higher than a smaller population of very happy people.' Identifying specific victims is a feature of person-affecting principles, which the impersonal approach abandons, and consent and forecasting are never raised."
    },
    {
      q:"The author's presentation of the three strategies (impersonal principles, obligations to types, virtue theory) suggests that the author views them as:",
      choices:[
        "Equally valid: any of the three adequately resolves the non-identity problem",
        "Possible responses, none of which the author endorses as a complete solution",
        "Progressively worse: the author clearly favors the impersonal principles approach",
        "All misguided: the author implies the harm principle should simply be abandoned"
      ],
      ans:1,
      exp:"The author sets out the three strategies without endorsing any of them. The impersonal approach works 'but at a cost' and the types approach 'requires developing a coherent account' of wronging a category; the virtue approach is called 'less radical' but is described, not endorsed. The author does not rank the impersonal approach highest, and the third strategy only questions how central the harm principle is."
    },
    {
      q:"Which of the following, if true of the depletion scenario, would most directly remove the difficulty that the non-identity problem poses?",
      choices:[
        "Future generations will develop technologies that reverse much of the environmental damage",
        "Depletion would leave future people with lives that are not worth living at all",
        "Most contemporary moral philosophers have rejected the harm principle as a basis for ethics",
        "Future people will care more about environmental quality than people alive today do"
      ],
      ans:1,
      exp:"The problem depends on the premise that future people are 'born into a life still worth living,' so existence is not worse for them than nonexistence. If their lives were not worth living, existing would itself be a harm, and the ordinary comparison would show they were wronged. Recovery technology and stronger preferences leave the identity problem untouched, and rejecting the harm principle is one response to the problem, not a way of removing it."
    },
    {
      q:"The virtue-theoretic strategy described in paragraph five differs from the other two strategies primarily in that it:",
      choices:[
        "Accepts the harm principle as central but broadens what counts as harm to future people",
        "Relies on impersonal welfare totals to decide whether an environmental policy is wrong",
        "Locates the wrong in the agent's character and relation to nature rather than in harm",
        "Holds that future people have rights that can be violated even when they are not harmed"
      ],
      ans:2,
      exp:"On the virtue approach, wrongness 'is not reducible to harm but is instead a matter of what kind of agents we are and what our relationship to the natural world ought to be.' It questions whether harm is 'as central to morality as is commonly assumed' rather than redefining harm. Welfare totals belong to the impersonal approach, and wronging people without harming them is closest to the obligations-to-types approach."
    },
    {
      q:"A policymaker argues that depleting resources is wrong because it shows contempt for the natural world, whoever ends up living in it. This argument most closely resembles which strategy discussed in the passage?",
      choices:[
        "The impersonal approach, which compares total or average welfare across possible outcomes",
        "The approach that grounds our obligations in duties owed to humanity as a collective",
        "The virtue-theoretic approach, which ties wrongness to what kind of agents we are",
        "The person-affecting approach, which judges outcomes by effects on identifiable people"
      ],
      ans:2,
      exp:"The policymaker locates the wrong in the attitude the policy expresses ('contempt') and in our relationship to nature, which matches the virtue approach's appeal to 'vicious character' and 'duties of stewardship.' The argument makes no welfare comparison, mentions no duty to humanity as a category, and explicitly sets aside who the affected individuals will be."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 4: Social Science — The Concept of Race
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_4',
  topic:'CARS',
  title:'Race as Social Construction and Biological Category',
  passage:`Few concepts have generated more confusion in both science and public discourse than race. The consensus position in contemporary biology holds that race, as traditionally conceived — as a set of discrete, heritable biological categories corresponding to continental ancestry — does not map onto human genetic variation in the way the concept implies. Human genetic diversity is clinal rather than categorical: it varies continuously across geography, with neighboring populations sharing more genetic variants than distant ones. The sharp divisions that folk taxonomy imposes on this continuous variation are products of history, migration, and social practice, not natural joints in the biological world.

This does not mean, however, that the word "race" has no legitimate scientific uses. Population geneticists routinely use ancestry-based categories for tracking disease risk, understanding pharmacogenomics, and reconstructing demographic history. When researchers note that BRCA1 mutations occur at higher frequencies in Ashkenazi Jewish populations, or that certain drug metabolism pathways vary systematically across ancestral groups, they are making claims that are empirically well-grounded even if they do not vindicate the folk taxonomy of race. The key distinction is between using ancestral categories as heuristics for understanding the population-level distribution of genetic variants and treating those categories as fixed biological essences.

The social constructionist position, associated with scholars like Ian Hacking and Michael Omi, holds that race is primarily a social and political category — a way of organizing and maintaining hierarchical relationships among groups that has been retrospectively rationalized by appeals to biology. This view does not deny that people have different ancestries or that ancestry correlates with genetic variation; it denies that these biological facts determine or justify the social categories we call races. Race, on this view, is real in the sense that it has real effects — on life outcomes, health, and social experience — but it is real as a social fact, not a natural kind.

The practical implications of this debate are significant for medicine. Studies consistently show that self-identified race correlates with health disparities in ways that cannot be fully explained by socioeconomic factors. African Americans have higher rates of hypertension, preterm birth, and certain cancers than white Americans even after controlling for income and education. Some researchers attribute this to genetic differences; others argue that the chronic physiological stress of experiencing racism — what scholars have called "weathering" — produces measurable biological effects. The former interpretation risks reifying race as a biological category; the latter integrates social and biological causation in ways that better account for the data.

What is clear is that neither a naive biological essentialism nor a social constructionism that dismisses biology altogether does justice to the complexity of the evidence. Race is simultaneously a social construction with real biological consequences and a biological variable that is shot through with social meaning. Any adequate account must hold both truths in tension.`,
  questions:[
    {
      q:"The author's main argument about race in this passage is best described as:",
      choices:[
        "Race is a purely biological category that social scientists have wrongly made political",
        "Race is purely a social construction with no legitimate use in biology or medicine",
        "Race is a social construction with biological effects and a biological variable with social meaning",
        "The concept of race should be abandoned entirely in both scientific research and public debate"
      ],
      ans:2,
      exp:"The conclusion states that race 'is simultaneously a social construction with real biological consequences and a biological variable that is shot through with social meaning,' and that 'any adequate account must hold both truths in tension.' The author explicitly rejects both 'naive biological essentialism' and a constructionism that 'dismisses biology altogether,' and defends some scientific uses of ancestry rather than calling for abandonment."
    },
    {
      q:"According to the passage, what distinguishes a legitimate scientific use of ancestry-based categories from a problematic one?",
      choices:[
        "Relying on self-identified race versus relying on direct genetic testing of patients",
        "Treating categories as heuristics for variant frequencies versus as fixed biological essences",
        "Studying disease risk alone versus extending the research to pharmacogenomics and history",
        "Avoiding any mention of continental ancestry versus explicitly invoking continental ancestry"
      ],
      ans:1,
      exp:"Paragraph two states: 'The key distinction is between using ancestral categories as heuristics for understanding the population-level distribution of genetic variants and treating those categories as fixed biological essences.' Disease risk, pharmacogenomics and demographic history are all listed as legitimate uses, and the examples given do invoke ancestry; self-identification versus testing is never discussed."
    },
    {
      q:"The 'weathering' hypothesis mentioned in paragraph four is presented as an alternative to genetic explanations primarily because it:",
      choices:[
        "Shows that African Americans and white Americans have no genetic differences of any kind",
        "Attributes all health disparities to differences in income and education rather than biology",
        "Ties the disparities to the bodily effects of racism without treating race as genetic",
        "Shows that self-identified race predicts health outcomes better than genetic ancestry does"
      ],
      ans:2,
      exp:"Weathering holds that 'the chronic physiological stress of experiencing racism' has 'measurable biological effects,' so it 'integrates social and biological causation' while avoiding the genetic reading that 'risks reifying race as a biological category.' The disparities persist 'even after controlling for income and education,' so weathering is not a purely socioeconomic account, and it makes no claim that genetic differences are absent."
    },
    {
      q:"The social constructionist view holds that race is 'real as a social fact.' This claim most directly implies that:",
      choices:[
        "Social facts matter more than biological facts in every domain of scientific inquiry",
        "Race has no empirical content and should be treated as a purely ideological notion",
        "Race has genuine effects on people's lives even though it is not a natural kind",
        "A person's racial identity is fixed by social assignment rather than by self-perception"
      ],
      ans:2,
      exp:"Race is 'real in the sense that it has real effects' on life outcomes, health and social experience, but it is 'real as a social fact, not a natural kind.' Having real effects is the opposite of having no empirical content. The passage makes no general ranking of social over biological facts and says nothing about how individual identities are assigned."
    },
    {
      q:"The author states that human genetic diversity is 'clinal rather than categorical.' This claim is most relevant to which part of the author's argument?",
      choices:[
        "The claim that ancestry-based categories are useful heuristics in medical and genetic research",
        "The claim that folk racial categories do not match natural divisions in genetic variation",
        "The claim that racial health disparities are caused by racism rather than by genetic differences",
        "The claim that some versions of social constructionism wrongly dismiss biology altogether"
      ],
      ans:1,
      exp:"Because variation changes 'continuously across geography,' the 'sharp divisions that folk taxonomy imposes' are 'not natural joints in the biological world.' That is the basis for rejecting race as discrete biological categories. The heuristic uses of ancestry are defended in paragraph two despite clinal variation, and the clinal point says nothing about what causes health disparities."
    },
    {
      q:"Which of the following findings would best support the author's view that the weathering interpretation better accounts for the data?",
      choices:[
        "Among African Americans, hypertension risk rises with the years of reported exposure to discrimination",
        "Racial differences in hypertension vanish entirely once income and education are controlled for",
        "A single gene variant common in West African ancestry fully explains higher hypertension rates",
        "Rates of preterm birth vary widely across neighborhoods that have similar average incomes"
      ],
      ans:0,
      exp:"Weathering predicts that the biological toll accumulates with chronic exposure to racism, so risk rising with years of discrimination is direct support. A purely genetic explanation would support the rival view, and disparities that vanish after socioeconomic controls would contradict the passage's own data and favor a socioeconomic account. Neighborhood variation in preterm birth does not single out discrimination as the cause."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 5: Literary Criticism — The Unreliable Narrator
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_5',
  topic:'CARS',
  title:'Unreliability, Irony, and the Reader\'s Position in Modern Fiction',
  passage:`Wayne Booth's 1961 introduction of the term "unreliable narrator" gave critics a vocabulary for something readers had long felt but struggled to articulate: that the person telling a story may be systematically misleading us, not merely through conscious deception but through self-deception, limited understanding, or moral blindness of which the narrator is unaware. The concept proved enormously generative. In the decades that followed, critics identified unreliable narrators in works ranging from Henry James's governess in The Turn of the Screw to Nabokov's Humbert Humbert to Kazuo Ishiguro's Stevens in The Remains of the Day.

The mechanics of unreliability vary considerably. In some cases, the narrator lies outright; in others, the gap between what the narrator reports and what a careful reader can infer is a product of selective attention, motivated reasoning, or genuine cognitive limitation. Stevens, Ishiguro's repressed English butler, is unreliable not because he fabricates events but because his rigid adherence to professional dignity prevents him from acknowledging his own emotional life or the political compromises he has made. The reader who attends carefully to what Stevens fails to say — to the elisions and evasions — comes to understand him better than he understands himself.

This structure creates a peculiar double consciousness in the reader. We occupy the narrator's perspective closely enough to feel its pull, while simultaneously maintaining sufficient critical distance to perceive its distortions. The pleasure of reading an unreliable narrator is partly the pleasure of detection — of catching the narrator in a revealing inconsistency — but it is also, more troublingly, the pleasure of complicity. For a time, we share the narrator's world, accept its premises, and feel its logic. The discomfort that attends recognition of unreliability is partly discomfort at our own prior acceptance.

Critics have disagreed about whether unreliability is a property of the text or of the reading. A strong textualist position holds that unreliability is encoded in structural signals — ironic juxtapositions, discrepancies between the narrator's self-presentation and the behavior she reports — that competent readers will recognize. On this view, the author constructs the unreliable narrator with the intention that readers will see through the narration. A more reader-centered view holds that unreliability is not a fixed property but an interpretive achievement: the product of a negotiation between the text's affordances and the reader's cultural assumptions, moral sensibilities, and reading protocols.

The latter view has more to recommend it than is commonly acknowledged. Different historical periods, different cultures, and different reading communities have found different narrators unreliable — and have drawn different inferences from the same gaps and inconsistencies. Readers who share Stevens's investment in professional dignity may find him more sympathetic and less self-deceived than readers who do not. What counts as a "revealing inconsistency" is never fully determinate in the text itself; it depends on what the reader brings. This does not collapse unreliability into pure subjectivity — some readings are clearly more defensible than others — but it does suggest that the concept cannot be fully divorced from the historically situated reader.`,
  questions:[
    {
      q:"According to the passage, what distinguishes unreliability caused by self-deception from unreliability caused by conscious deception?",
      choices:[
        "A failing typical of first-person narrators versus one typical of third-person narrators",
        "A gap the narrator is unaware of versus a deliberate falsification of events",
        "A recent modernist technique versus a device characteristic of earlier literary periods",
        "A narrator who wins the reader's sympathy versus one who is more morally complex"
      ],
      ans:1,
      exp:"Booth's narrators mislead 'not merely through conscious deception but through self-deception, limited understanding, or moral blindness of which the narrator is unaware.' Stevens is unreliable 'not because he fabricates events' but because he cannot acknowledge his own emotional life. The passage draws no contrast between first- and third-person narration, between literary periods, or between degrees of sympathy."
    },
    {
      q:"The author describes the reader's experience of unreliable narration as involving a 'double consciousness.' This phrase most nearly refers to:",
      choices:[
        "Reading a primary text and the secondary criticism about it at one and the same time",
        "Holding two equally valid but incompatible interpretations of the same text in mind at the same time",
        "Feeling the pull of the narrator's view while staying distant enough to see its distortions",
        "The division between a reader's conscious and unconscious responses to a narrative"
      ],
      ans:2,
      exp:"Paragraph three explains the phrase directly: 'We occupy the narrator's perspective closely enough to feel its pull, while simultaneously maintaining sufficient critical distance to perceive its distortions.' The tension is between immersion and critical distance, not between two texts, two valid readings, or conscious and unconscious responses."
    },
    {
      q:"The author's discussion of the 'pleasure of complicity' in paragraph three primarily serves to:",
      choices:[
        "Argue that unreliable narrators are morally risky and should be used sparingly by novelists",
        "Suggest that readers who enjoy unreliable narrators have deficient critical faculties",
        "Add that readers first share the narrator's distorted outlook before they recognize it",
        "Support the textualist claim that unreliability is encoded in a text's structural signals"
      ],
      ans:2,
      exp:"Beyond the 'pleasure of detection,' the author notes that 'for a time, we share the narrator's world, accept its premises, and feel its logic,' so recognizing unreliability brings 'discomfort at our own prior acceptance.' This deepens the account of reading; it neither criticizes readers nor warns writers. The textualist position is introduced only in the next paragraph, and complicity is not offered as evidence for it."
    },
    {
      q:"The author ultimately favors which view of unreliability, and on what grounds?",
      choices:[
        "Textualist, because structural signals are objectively present in the text whoever happens to read it",
        "Neither, because the debate cannot be resolved and both views are equally defensible",
        "Reader-centered, though some readings remain more defensible than others",
        "Reader-centered, because all interpretations are equally valid and unreliability is subjective"
      ],
      ans:2,
      exp:"The reader-centered view 'has more to recommend it than is commonly acknowledged,' since what counts as a revealing inconsistency 'depends on what the reader brings.' But the author adds that this 'does not collapse unreliability into pure subjectivity — some readings are clearly more defensible than others.' That qualification rules out the pure-subjectivity version, and the stated preference rules out a neutral stance."
    },
    {
      q:"Which of the following, if true, would most challenge the reader-centered view of unreliability described in the passage?",
      choices:[
        "Readers from different cultures find the same narrator unreliable but for different reasons",
        "Readers who share a narrator's values judge her less unreliable than readers who do not",
        "Certain textual signals produce recognition of unreliability in every culture and reading community",
        "Unreliable narrators appear more often in literary fiction than in popular genre fiction"
      ],
      ans:2,
      exp:"The reader-centered view treats unreliability as 'an interpretive achievement' that varies with readers' 'cultural assumptions, moral sensibilities, and reading protocols.' If particular textual signals worked the same way for every community, unreliability would look like a fixed property of the text, as textualists claim. Cultural and value-based variation in readers' judgments supports the reader-centered view, and the genre comparison is irrelevant."
    },
    {
      q:"The author's discussion of Stevens in paragraph two primarily serves to:",
      choices:[
        "Show that Ishiguro's novel is the most important example of unreliable narration",
        "Illustrate unreliability that comes from what a narrator cannot admit rather than from lying",
        "Argue that professional dignity is a virtue that modern readers no longer appreciate",
        "Demonstrate that unreliable narrators always fabricate the events they report to readers"
      ],
      ans:1,
      exp:"Paragraph two contrasts narrators who 'lie outright' with those whose unreliability comes from 'selective attention, motivated reasoning, or genuine cognitive limitation.' Stevens illustrates the second kind: he does not fabricate events, but his devotion to dignity keeps him from acknowledging his emotions and compromises. The passage makes no ranking of Ishiguro's novel and does not praise or condemn professional dignity."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 6: Political Theory — Civil Disobedience
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_6',
  topic:'CARS',
  title:'The Justification and Limits of Civil Disobedience',
  passage:`Civil disobedience — the deliberate, public, nonviolent violation of law in order to protest injustice — occupies a contested space in liberal political theory. On one hand, liberal theory holds that in a just society, citizens have an obligation to obey the law; legitimate grievances should be addressed through legal channels — voting, petition, litigation, legislative advocacy. On the other hand, liberal theory recognizes that no actual society is fully just, that legal channels are sometimes exhausted or foreclosed, and that history's most admired moral exemplars — Gandhi, King, Mandela — deliberately broke the law.

John Rawls, in his influential account, held that civil disobedience is justified when it addresses "substantial and clear injustice," when legal channels have been exhausted without success, and when the disobedient is prepared to accept the legal consequences. The acceptance of punishment, on Rawls's view, is not merely a practical concession but an expression of the disobedient's respect for the rule of law. By accepting punishment, the disobedient acknowledges the general validity of the legal system while maintaining that a specific law or policy is unjust. This position distinguishes civil disobedience from ordinary lawbreaking and from revolution.

Critics have pressed Rawls on the requirement to accept punishment. Howard Zinn argued that this requirement privileges the comfort of the majority and the stability of institutions over the urgency of the injustice being protested. If a law is genuinely unjust, why should its victims be obligated to suffer its penalties in order to make a philosophical point about respect for legal institutions? The requirement of punishment acceptance, on this view, imposes a double burden on those who are already disadvantaged: they must endure both the original injustice and additional legal punishment for protesting it.

The question of what counts as "substantial" injustice creates further difficulties. Rawls assumed a background of a "nearly just" society in which gross injustice is the exception. But critics, particularly from traditions of critical legal studies and critical race theory, have argued that the injustices embedded in American law are not exceptional but systemic — that the legal system itself is a mechanism for maintaining racial and class hierarchy. On this view, the exhaustion-of-legal-channels requirement is not a reasonable procedural condition but a demand to work within a system designed to frustrate certain claims. The Rawlsian framework may be adequate for a society that deviates occasionally from its own just principles; it is less clearly adequate for a society in which the injustice is baked into the principles themselves.

The tension between the obligation to obey law and the obligation to resist injustice is not resolvable by any formula. What civil disobedience cases demand, finally, is moral judgment: the ability to weigh the severity of the injustice, the availability of alternatives, the likely consequences of action and inaction, and the costs imposed on others. Rawls's conditions provide useful heuristics but not an algorithm. The irreducibility of this judgment to rule is, for some, a mark of the concept's genuine moral seriousness.`,
  questions:[
    {
      q:"According to the passage, Rawls's requirement that the civil disobedient accept punishment serves which function?",
      choices:[
        "It makes civil disobedience more effective as a strategy for winning public sympathy",
        "It signals respect for the legal system while protesting one specific law or policy",
        "It protects the majority from the disruption that minority grievances would otherwise cause",
        "It guarantees that only people with genuine grievances will be willing to break the law"
      ],
      ans:1,
      exp:"For Rawls, accepting punishment is 'an expression of the disobedient's respect for the rule of law': it 'acknowledges the general validity of the legal system while maintaining that a specific law or policy is unjust,' which separates civil disobedience from ordinary lawbreaking and revolution. Protecting the majority's comfort is how Zinn characterizes the requirement's effect, not Rawls's rationale, and neither effectiveness nor screening out false grievances is mentioned."
    },
    {
      q:"Howard Zinn's critique of the punishment-acceptance requirement, as described in the passage, is best summarized as:",
      choices:[
        "Civil disobedience is never justified, because any act of lawbreaking undermines the rule of law itself",
        "Accepting punishment is strategically counterproductive because it lends legitimacy to unjust laws",
        "It burdens the already disadvantaged twice, favoring institutional stability over urgent injustice",
        "Revolution rather than civil disobedience is the proper response once legal channels are exhausted"
      ],
      ans:2,
      exp:"Zinn argues that the requirement 'privileges the comfort of the majority and the stability of institutions over the urgency of the injustice' and 'imposes a double burden' on people who must endure both the injustice and punishment for protesting it. Zinn criticizes one condition of civil disobedience rather than civil disobedience itself, and his objection is about fairness to victims, not strategy or revolution."
    },
    {
      q:"The passage suggests that the Rawlsian framework is most vulnerable to criticism when applied to societies in which:",
      choices:[
        "Voting rights are fully protected and legal representation is available to all citizens",
        "Injustice is occasional and exceptional rather than built into the legal order",
        "Injustice is systemic, so legal channels themselves are designed to frustrate claims",
        "Past acts of civil disobedience have usually succeeded in changing the laws they targeted"
      ],
      ans:2,
      exp:"The framework 'may be adequate for a society that deviates occasionally from its own just principles; it is less clearly adequate for a society in which the injustice is baked into the principles themselves,' where exhausting legal channels becomes 'a demand to work within a system designed to frustrate certain claims.' Occasional injustice and fully protected rights describe the 'nearly just' society Rawls assumed, and past effectiveness is irrelevant to the critique."
    },
    {
      q:"The author's tone in the final paragraph is best described as:",
      choices:[
        "Dogmatic: it asserts a definitive resolution to the conflict between obedience and resistance",
        "Measured: it denies that any formula exists yet credits Rawls's conditions as useful guides",
        "Dismissive: it suggests that Rawls's conditions offer no real help in difficult cases",
        "Pessimistic: it implies that no act of civil disobedience could ever be justified"
      ],
      ans:1,
      exp:"The paragraph says the tension 'is not resolvable by any formula' but that 'Rawls's conditions provide useful heuristics but not an algorithm,' and it treats the need for judgment as a sign of 'genuine moral seriousness.' Denying a formula rules out dogmatism, calling the conditions useful rules out dismissiveness, and nothing suggests civil disobedience is never justified."
    },
    {
      q:"Which of the following best describes the logical structure of paragraph four?",
      choices:[
        "It restates Rawls's position and then endorses it without qualification or reservation",
        "It raises a second objection, about systemic injustice, that extends the critique of Rawls",
        "It uses historical evidence to refute the specific objection that Zinn raised in paragraph three",
        "It concedes that Rawls's framework adequately handles every case of civil disobedience"
      ],
      ans:1,
      exp:"Paragraph three challenged the punishment requirement; paragraph four, noting that the 'substantial' requirement 'creates further difficulties,' challenges the 'substantial injustice' and exhaustion-of-channels conditions by questioning Rawls's assumption of a 'nearly just' society. It adds to the critique rather than endorsing Rawls, and it does not respond to Zinn at all."
    },
    {
      q:"Based on the passage, which act would Rawls's account most clearly NOT count as justified civil disobedience?",
      choices:[
        "After petitions and lawsuits fail, activists openly defy a clearly unjust law and accept arrest",
        "Protesters publicly and nonviolently break an unjust law, then flee to avoid prosecution",
        "After the legislature ignores appeals, a citizen refuses to obey a discriminatory statute and pleads guilty",
        "After court challenges fail, activists stage a peaceful public sit-in against segregation and serve their sentences"
      ],
      ans:1,
      exp:"Rawls requires that the disobedient be 'prepared to accept the legal consequences,' which expresses respect for the rule of law. Fleeing prosecution fails that condition even though the act is public and nonviolent. The other cases involve clear injustice, failed legal remedies, and acceptance of arrest or punishment, so they meet all three conditions."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 7: Anthropology — The Concept of Culture
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_7',
  topic:'CARS',
  title:'Culture, Agency, and the Problem of Cultural Determinism',
  passage:`The concept of culture has been central to anthropology since its inception, but it has also been a persistent source of theoretical embarrassment. Early anthropological uses of the term — associated with Tylor's 1871 definition of culture as "that complex whole which includes knowledge, belief, art, morals, law, custom, and any other capabilities and habits acquired by man as a member of society" — treated culture as an integrated, bounded system that explained the behavior of those within it. This explanatory ambition was powerful: culture provided a secular, non-biological alternative to racial determinism, explaining human diversity as a product of learned tradition rather than innate nature.

The costs of this explanatory ambition, however, became increasingly apparent over the twentieth century. If culture explains behavior, then individuals within a culture appear as its passive bearers — conduits through which cultural patterns are transmitted and reproduced rather than agents who reflect on, contest, and transform those patterns. The Boasian tradition's emphasis on culture as an autonomous force capable of explaining almost anything came at the cost of the individual human being as a locus of genuine agency. Moreover, the treatment of cultures as bounded wholes obscured the internal diversity, contestation, and power asymmetries within them: the culture of a society is never simply the culture — it is always the culture of some groups imposed on or negotiated against the cultures of others.

Clifford Geertz's semiotic approach offered a partial corrective. For Geertz, culture is not a causal force that produces behavior from the outside but a "web of significance" that provides meaning and context for behavior from the inside. Human beings, on this view, are "animals suspended in webs of significance they themselves have spun." To understand culture is not to identify the laws that govern behavior but to interpret the meanings that actors themselves employ. This move from explanation to interpretation, from cause to meaning, was enormously influential in the humanities and parts of the social sciences.

But Geertz's approach, for all its attractions, replicated some problems of its predecessors. The "web of significance" metaphor, like the integrated-culture concept, implies a coherence and boundedness that actual cultural practices rarely exhibit. Geertz's interpretive method focused on shared public symbols and their meanings but struggled to account for disagreement, coercion, and the role of power in determining whose symbolic interpretations become authoritative. A web of significance woven by whom, maintained by what mechanisms, and contested by whom?

Contemporary approaches increasingly treat culture not as a thing possessed by groups but as a process of ongoing negotiation, contestation, and reproduction. Culture is what people do with symbols, practices, and meanings in specific situations of interest, constraint, and conflict. This processual approach preserves human agency — people are not merely bearers of culture but active interpreters and transformers of it — while avoiding the idealist tendency to treat meaning as floating free of material conditions and power relations.`,
  questions:[
    {
      q:"According to the passage, what was the primary theoretical value of the early anthropological concept of culture?",
      choices:[
        "It provided a reliable empirical method for measuring behavioral differences across human societies",
        "It explained human diversity through learned tradition rather than innate racial nature",
        "It emphasized the role of individual agency in creating and revising social norms",
        "It showed that all human cultures pass through the same universal stages of development"
      ],
      ans:1,
      exp:"The early concept 'provided a secular, non-biological alternative to racial determinism, explaining human diversity as a product of learned tradition rather than innate nature.' Individual agency is precisely what paragraph two says this concept obscured, and the passage mentions neither measurement methods nor universal developmental stages."
    },
    {
      q:"The author argues that treating cultures as 'bounded wholes' created which specific problem?",
      choices:[
        "It made systematic comparison between different cultures impossible for working anthropologists",
        "It hid internal disagreement and power differences behind the idea of one shared culture",
        "It overstated the role of biological inheritance in explaining cultural variation",
        "It prevented anthropologists from doing fieldwork in large and complex societies"
      ],
      ans:1,
      exp:"Treating cultures as bounded wholes 'obscured the internal diversity, contestation, and power asymmetries within them,' since a society's culture 'is always the culture of some groups imposed on or negotiated against the cultures of others.' Biology is what the culture concept was meant to replace, and comparison and fieldwork are never discussed."
    },
    {
      q:"Geertz's concept of culture as a 'web of significance' is described as a partial corrective to the earlier approach primarily because it:",
      choices:[
        "Restores the emphasis on biological determinism that the Boasian tradition had set aside",
        "Shows that cultures are not bounded systems but open networks of global exchange",
        "Treats culture as meanings actors use from the inside, not a force acting from outside",
        "Supplies quantitative methods for measuring the rate of cultural change over time"
      ],
      ans:2,
      exp:"For Geertz, culture is 'not a causal force that produces behavior from the outside but a web of significance that provides meaning and context for behavior from the inside,' a move 'from explanation to interpretation, from cause to meaning.' The passage later says Geertz's web still implies boundedness, so it did not recast cultures as open networks, and no biological or quantitative turn is mentioned."
    },
    {
      q:"The rhetorical question at the end of paragraph four ('A web of significance woven by whom, maintained by what mechanisms, and contested by whom?') primarily functions to:",
      choices:[
        "Endorse Geertz's framework by showing that it generates productive research questions",
        "Underscore that Geertz's framework neglects power, coercion, and whose meanings prevail",
        "Present the processual approach as the replacement the author has already argued for",
        "Suggest that the concept of culture is theoretically incoherent and should be abandoned altogether"
      ],
      ans:1,
      exp:"The question caps a paragraph saying Geertz 'struggled to account for disagreement, coercion, and the role of power in determining whose symbolic interpretations become authoritative.' It presses that criticism home. The processual approach is not introduced until paragraph five, and the author goes on to refine rather than abandon the concept of culture."
    },
    {
      q:"The contemporary 'processual approach' described in the final paragraph is presented as superior to earlier approaches primarily because it:",
      choices:[
        "Returns to Tylor's definition of culture as an integrated and bounded complex whole",
        "Eliminates the concept of culture in favor of explanations drawn from individual psychology",
        "Focuses exclusively on symbols and meanings, setting aside economic and material factors",
        "Keeps people as active agents while tying meaning to material conditions and power"
      ],
      ans:3,
      exp:"The processual approach 'preserves human agency' (people are 'active interpreters and transformers' of culture) 'while avoiding the idealist tendency to treat meaning as floating free of material conditions and power relations.' Ignoring material factors is the idealist error it avoids, and it redefines culture as a process rather than eliminating it or returning to Tylor's bounded whole."
    },
    {
      q:"According to the passage, the early integrated-culture concept and Geertz's 'web of significance' share which weakness?",
      choices:[
        "Both treat culture as a causal force that produces behavior from outside the actor",
        "Both imply a coherence and boundedness that actual cultural practices rarely show",
        "Both rest on biological assumptions about the origins of human differences",
        "Both reject interpretation in favor of discovering the laws that govern behavior"
      ],
      ans:1,
      exp:"Paragraph four says the web metaphor, 'like the integrated-culture concept, implies a coherence and boundedness that actual cultural practices rarely exhibit.' Treating culture as an outside causal force and seeking laws of behavior describe only the earlier approach, which Geertz rejected, and neither approach is described as biological."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 8: Philosophy of Science — Explanation and Prediction
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_8',
  topic:'CARS',
  title:'The Asymmetry of Explanation and Prediction in Science',
  passage:`One of the most elegant proposals in twentieth-century philosophy of science was Carl Hempel's deductive-nomological model of explanation. On Hempel's account, to explain a phenomenon is to show that it follows deductively from a set of general laws together with statements of initial conditions. The model's elegance derived from its symmetry thesis: explanation and prediction are, at the logical level, structurally identical. A prediction is a prospective explanation — it says that given these laws and conditions, this phenomenon will occur. An explanation is a retrospective prediction — it says that given these laws and conditions, this phenomenon had to occur. Scientific understanding, on this view, is the understanding afforded by subsumption under law.

Critics identified several problems with this account, the most telling of which was the problem of asymmetries between explanation and prediction. Sylvain Bromberger's flagpole example became canonical: given the height of a flagpole, the angle of the sun, and the laws of optics, we can predict and explain the length of the shadow cast by the pole. But given the length of the shadow, the angle of the sun, and the laws of optics, we can equally well predict and explain the height of the flagpole — despite the fact that the shadow does not explain the height of the flagpole; it is explained by it. The deductive relationships are symmetric; the explanatory relationships are not.

The asymmetry problem suggests that explanation is not simply a matter of logical deduction from laws and conditions but involves a further element — often glossed as "causal direction," "mechanism," or "asymmetric dependence." We explain the shadow by the pole rather than the pole by the shadow because the pole is causally prior; the shadow counterfactually depends on the pole in a way the pole does not depend on the shadow. Removing or shortening the pole would shorten the shadow; removing the shadow — by, say, clouding over — would not affect the height of the pole.

The causal response to the asymmetry problem has its own difficulties. Causation is notoriously difficult to analyze, and there are scientific explanations — in thermodynamics and quantum mechanics, for instance — that appear to be genuinely non-causal. Thermodynamic explanations of why gases expand to fill their containers appeal to statistical regularities and entropic considerations, not to a specific cause of the expansion. Mathematical explanations in biology — why hexagonal cells minimize wax expenditure in honeycombs — seem to explain by citing a mathematical fact rather than a physical cause. If explanation can be non-causal, then causation cannot be the whole story.

Contemporary philosophy of science has largely moved away from the search for a single, unified model of scientific explanation toward a pluralism that acknowledges different types of explanation — causal, statistical, mathematical, unificationist — appropriate to different contexts and disciplines. This pluralism is intellectually modest but may be more accurate: the diversity of scientific practice may simply resist reduction to a single logical form.`,
  questions:[
    {
      q:"Hempel's symmetry thesis, as described in the passage, holds that:",
      choices:[
        "Scientific laws are symmetric and apply in the same way in every spatial direction",
        "Every scientific explanation can ultimately be reduced to a mathematical formalism",
        "Explaining and predicting share one logical form and differ only in time direction",
        "Prediction is more reliable than explanation because it can be tested against the future"
      ],
      ans:2,
      exp:"The thesis is that 'explanation and prediction are, at the logical level, structurally identical': a prediction is 'a prospective explanation' and an explanation 'a retrospective prediction.' It concerns the logical form of the two activities, not the symmetry of laws, mathematical reduction, or any ranking of prediction above explanation."
    },
    {
      q:"The flagpole example is introduced in the passage primarily to:",
      choices:[
        "Show that the deductive-nomological model handles ordinary scientific reasoning correctly",
        "Show that deduction can run both ways while explanation runs only one way",
        "Argue that the laws of optics are insufficient on their own to explain any shadow",
        "Illustrate the importance of precise initial conditions in making accurate predictions"
      ],
      ans:1,
      exp:"From pole height we can deduce shadow length and from shadow length we can deduce pole height, yet 'the shadow does not explain the height of the flagpole.' As the passage puts it, 'the deductive relationships are symmetric; the explanatory relationships are not,' which challenges Hempel's model rather than supporting it. The example does not fault optics or stress initial conditions."
    },
    {
      q:"According to the passage, how does the causal response explain why we explain the shadow by the pole rather than the reverse?",
      choices:[
        "The pole is physically larger than its shadow and is therefore causally dominant",
        "The laws of optics specify that light sources cause shadows rather than the reverse",
        "The pole is causally prior: removing it alters the shadow, but not the other way round",
        "The deduction from pole to shadow is logically stronger than that from shadow to pole"
      ],
      ans:2,
      exp:"The causal response says 'the pole is causally prior; the shadow counterfactually depends on the pole': shortening the pole shortens the shadow, while removing the shadow by clouding over leaves the pole unchanged. The deductions are equally strong in both directions, which is the whole problem, and size is never the criterion."
    },
    {
      q:"The author mentions thermodynamic and mathematical explanations in paragraph four primarily to:",
      choices:[
        "Show that physics is a more advanced science than biology in its explanatory methods",
        "Argue that statistical reasoning is generally superior to causal reasoning in the natural sciences",
        "Support Hempel's model by showing that laws figure in every scientific explanation",
        "Show that causation cannot be the whole story, since some explanations seem non-causal"
      ],
      ans:3,
      exp:"Paragraph four opens by saying 'the causal response to the asymmetry problem has its own difficulties' and ends: 'If explanation can be non-causal, then causation cannot be the whole story.' The gas and honeycomb examples serve that point. They do not rank the sciences, favor statistics in general, or rescue Hempel's model."
    },
    {
      q:"The author describes the move toward pluralism about explanation as 'intellectually modest.' This phrase implies that:",
      choices:[
        "Pluralism is inadequate and should eventually be replaced with a single unified theory",
        "Contemporary philosophers of science are less rigorous than Hempel's generation was",
        "Pluralism gives up the hope of one unified account, though it may be more accurate",
        "Pluralism is the most ambitious theoretical position now available in the field"
      ],
      ans:2,
      exp:"Pluralism is 'intellectually modest but may be more accurate': it abandons 'the search for a single, unified model' in exchange for fidelity to 'the diversity of scientific practice.' Calling it possibly more accurate shows the author does not think it inadequate, 'modest' is the opposite of 'ambitious,' and no one's rigor is criticized."
    },
    {
      q:"Which of the following, if true, would most strengthen the author's suggestion that no single model of explanation is adequate?",
      choices:[
        "A new causal theory is shown to account for every thermodynamic and mathematical explanation",
        "Bromberger's flagpole example is now taught in most introductory philosophy of science courses",
        "Physicists, biologists, and mathematicians each accept explanations that cannot be recast in one form",
        "Hempel later added a statistical version of his model alongside the deductive version"
      ],
      ans:2,
      exp:"The author suggests that 'the diversity of scientific practice may simply resist reduction to a single logical form.' Evidence that different fields rely on explanations that cannot be translated into one form supports that directly. A causal theory covering every case would undercut pluralism, the popularity of the flagpole example is irrelevant, and a revision of Hempel's model says nothing about whether one form can cover all explanation."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 9: Economics/Social — The Limits of Meritocracy
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_9',
  topic:'CARS',
  title:'Meritocracy, Luck, and the Moral Limits of Market Outcomes',
  passage:`The meritocratic ideal — that social positions and rewards should be allocated according to talent and effort rather than birth, connection, or fortune — has become the dominant legitimating ideology of contemporary liberal democracies. Its appeal is obvious: meritocracy seems to honor the moral intuition that people should be rewarded for what they do rather than for circumstances they did not choose. And in contrast to the hereditary aristocracies it replaced, meritocracy at least gestures toward equality of opportunity.

The philosophical difficulty with meritocracy is that the distinction between what we "do" and the circumstances we did not choose is less clean than it appears. Natural talent — the cognitive and physical endowments that enable high performance — is not chosen; it is allocated by a genetic lottery. The family into which one is born, the education one receives, the social networks one inherits — all of these shape the development and expression of whatever talents one has. If we follow this reasoning, meritocratic outcomes begin to look less like the fruits of desert and more like the fruits of luck: the luck of good genes, good parents, and a favorable social position.

John Rawls drew the implication directly: no one deserves their natural talents in the morally robust sense because no one chose them. The intuitive appeal of merit-based reward rests on an illusion — the illusion that talent is the product of the self rather than the precipitate of unchosen circumstances. On Rawls's view, the natural distribution of talents is "neither just nor unjust" — it is simply a fact about the world. What justice requires is that this morally arbitrary distribution not translate into drastically unequal life outcomes. The difference principle — that inequalities are just only if they benefit the least advantaged members of society — is Rawls's response to this arbitrariness.

Critics of this line of argument — including Michael Walzer and Michael Sandel — worry that it is corrosive of the social meanings that attach to achievement. If high performance is reducible to genetic luck and favorable circumstance, then excellence ceases to be genuinely admirable; we would no more admire a great athlete for her performance than we admire a person for being tall. This "corrosiveness objection" captures a real tension: the Rawlsian argument, taken to its logical conclusion, seems to dissolve the category of desert entirely, leaving us with a world in which people are compensated for their contributions not because they deserve them but because incentives are necessary to elicit socially useful behavior.

The resolution, if there is one, lies in distinguishing different senses of desert. We can acknowledge that no one deserves their natural talents in the sense of having earned them through prior choices, while maintaining that people can still deserve the fruits of their effort given their talents. The runner who trains obsessively deserves to win — in the effort sense — even if she did not deserve the natural speed that made such training productive. Retaining this weaker sense of desert preserves space for genuine admiration and achievement while acknowledging the role of unchosen circumstances in producing them.`,
  questions:[
    {
      q:"The author describes meritocracy as 'the dominant legitimating ideology of contemporary liberal democracies.' In context, 'legitimating' most nearly means:",
      choices:[
        "Making an arrangement legally permissible through legislation or court decisions",
        "Supplying a moral justification that makes social arrangements seem valid",
        "Ensuring that democratic elections are conducted fairly and transparently",
        "Measuring social outcomes against an objective and quantifiable standard of merit"
      ],
      ans:1,
      exp:"The author goes on to explain why meritocracy is persuasive: it 'seems to honor the moral intuition that people should be rewarded for what they do,' which is what makes unequal rewards appear justified. A legitimating ideology supplies that moral justification. Legal permission is a narrower sense the passage does not use, and elections and measurement are unrelated to the argument."
    },
    {
      q:"According to the passage, Rawls regarded the natural distribution of talents as morally arbitrary because:",
      choices:[
        "Talents are distributed unequally across racial and gender groups in most societies",
        "Talents cannot be measured objectively and so cannot support claims of desert",
        "No one chooses their talents, so talents cannot ground desert in the robust sense",
        "Talents have become largely irrelevant to productivity in a modern market economy"
      ],
      ans:2,
      exp:"Rawls holds that 'no one deserves their natural talents in the morally robust sense because no one chose them'; they come from a 'genetic lottery,' so their distribution is 'neither just nor unjust.' The argument turns on talents being unchosen, not on group differences, measurability, or economic relevance."
    },
    {
      q:"The 'corrosiveness objection' raised by Walzer and Sandel holds that the Rawlsian argument:",
      choices:[
        "Is politically dangerous because it could be used to justify redistributive taxation",
        "Is logically incoherent because it both affirms and denies the value of natural talent",
        "Reduces excellence to luck and so leaves no room for genuinely admiring achievement",
        "Ignores the role that individual effort plays in producing high performance"
      ],
      ans:2,
      exp:"If performance is 'reducible to genetic luck and favorable circumstance,' then 'excellence ceases to be genuinely admirable,' and we would admire an athlete no more than a tall person. The objection concerns the 'social meanings that attach to achievement.' Effort enters only in the author's own proposed resolution, and taxation and logical incoherence are not mentioned."
    },
    {
      q:"The author's proposed resolution in paragraph five distinguishes between two senses of desert. Which of the following best captures this distinction?",
      choices:[
        "Deserving talents through prior choices versus deserving outcomes regardless of any effort",
        "Deserving one's endowments versus deserving what one's effort achieves with them",
        "Individual desert of persons versus collective desert of the groups they belong to",
        "Deserving monetary rewards in the market versus deserving honor and social recognition"
      ],
      ans:1,
      exp:"No one deserves natural talents 'in the sense of having earned them through prior choices,' but people 'can still deserve the fruits of their effort given their talents.' The runner did not deserve her speed but deserves her win. Deserving outcomes 'regardless of any effort' drops the effort condition the author relies on, and the passage draws no group or money-versus-honor distinction."
    },
    {
      q:"Which of the following would most strengthen the argument in paragraphs two and three that meritocratic outcomes reflect luck more than desert?",
      choices:[
        "High-income individuals on average work considerably longer hours than low-income individuals do",
        "Self-made billionaires attribute their success primarily to their own hard work",
        "Parental income, birthplace, and genes explain much of the variation in lifetime earnings",
        "Years of education completed is the single strongest predictor of lifetime earnings"
      ],
      ans:2,
      exp:"The argument is that outcomes reflect 'the luck of good genes, good parents, and a favorable social position.' Evidence that these unchosen factors explain much of the variation in earnings supports it directly. Longer hours and self-reports of hard work point toward effort instead, and education is ambiguous because it may reflect either effort or inherited advantage."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 10: Art History — Authenticity and Forgery
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_10',
  topic:'CARS',
  title:'The Aesthetics of Authenticity: What Art Forgery Reveals',
  passage:`In 1937, Han van Meegeren completed a painting he titled The Supper at Emmaus, in a style he had spent years perfecting — that of the seventeenth-century Dutch master Johannes Vermeer. The painting was authenticated by the leading Vermeer scholar of the day, Abraham Bredius, and sold for a price equivalent to several million dollars in current terms. It hung in a museum for years, admired by visitors and critics as a major discovery. When van Meegeren confessed to the forgery in 1945, the Emmaus was overnight transformed from a masterwork to a curiosity. Nothing about the physical object had changed; what changed was its history.

This case raises a question that has fascinated aestheticians ever since: does authenticity matter to aesthetic value, or is it a kind of snobbery — a preference for provenance over perception? Nelson Goodman argued that in some art forms, authenticity is aesthetically relevant even if the perceiver cannot currently detect the difference between original and forgery. His argument turned on the concept of a "symptom of the aesthetic": if two objects are perceptually identical now but differ in their history, that difference may make them perceptually distinguishable in principle, as techniques of analysis improve. Moreover, for Goodman, every aesthetic experience involves learning to perceive correctly, and knowing a work is a forgery changes the way we should look at it — attending to what we know about how it was made and what it expresses.

Alfred Lessing took a more deflationary view. For Lessing, the value of authentic works derives not from their perceptual properties but from their art-historical significance — their position in the development of an artist's oeuvre, their influence on subsequent work, their role in the history of ideas. The forgery, however technically accomplished, occupies no position in this history; it contributes nothing to our understanding of how Vermeer developed as an artist or influenced his contemporaries, because Vermeer did not paint it. On this view, the aesthetic demotion of the Emmaus is not irrational; we are not merely revising our estimate of the painting's financial value — we are recognizing that it cannot do what we thought it could do.

A more radical response questions whether authenticity-based valuation reflects a broader cultural ideology rather than a genuine aesthetic principle. Denis Dutton has argued that the concept of the authentic artwork is historically specific — it emerged with the Romantic cult of individual genius, which tied the value of an art object to the expressive history of its production by a singular creative mind. Pre-modern cultures valued skill and tradition over originality; Islamic geometric art, medieval icon painting, and Aboriginal sand paintings are not degraded by being reproduced or collectively produced. The insistence that only the original object has full aesthetic standing may say more about the cultural values of modern Western art institutions than about the intrinsic properties of art objects.

The van Meegeren case continues to generate productive discomfort because it forces us to articulate what we think art is for. If art is for providing a certain kind of perceptual or emotional experience, then a perfect forgery serves that purpose as well as the original. If art is for connecting us to a particular human history — the mind and hand of a specific artist, working in a specific moment — then the forgery fails on its most important dimension. Our response to forgery may be the most honest test of which of these we actually believe.`,
  questions:[
    {
      q:"The primary purpose of the van Meegeren anecdote in the opening paragraph is to:",
      choices:[
        "Argue that art experts are systematically incompetent at authenticating old paintings",
        "Establish that a work's value can change with its history while the object stays the same",
        "Show that forgery harms no one and should therefore not be criminally prosecuted",
        "Demonstrate that Vermeer's style was so distinctive that only a genius could ever imitate it"
      ],
      ans:1,
      exp:"The anecdote ends: 'Nothing about the physical object had changed; what changed was its history.' That sets up the passage's question of whether authenticity matters to aesthetic value. One mistaken authentication does not show that experts are systematically incompetent, and the passage raises neither the legal status of forgery nor the difficulty of imitating Vermeer."
    },
    {
      q:"Goodman's argument that authenticity is aesthetically relevant even when a forgery cannot currently be told apart from the original rests on which claim?",
      choices:[
        "Forged works always contain technical errors that a trained observer can eventually spot",
        "Present indistinguishability does not rule out later detection, and knowledge alters how we look",
        "An authentic work's market price depends on provenance, which in turn fixes its aesthetic value",
        "Authentic works are produced with greater intentionality and care than any forgery could be"
      ],
      ans:1,
      exp:"Goodman argues that a difference in history between objects that look identical now 'may make them perceptually distinguishable in principle, as techniques of analysis improve,' and that 'knowing a work is a forgery changes the way we should look at it.' He does not claim every forgery contains detectable errors; his argument starts from cases where none can yet be seen. Market price and the forger's intentionality play no part in his argument."
    },
    {
      q:"Lessing's position, as described in the passage, implies that the aesthetic demotion of the Emmaus after van Meegeren's confession was:",
      choices:[
        "Irrational, since nothing about the painting's perceptual properties had changed",
        "Rational, since the forgery cannot illuminate Vermeer's development or influence",
        "Economically motivated rather than a genuine change in aesthetic judgment",
        "A temporary overreaction that will fade once the forgery gains its own art-historical standing"
      ],
      ans:1,
      exp:"For Lessing, the demotion 'is not irrational' because the forgery 'contributes nothing to our understanding of how Vermeer developed as an artist or influenced his contemporaries.' He explicitly says we are 'not merely revising our estimate of the painting's financial value,' and nothing suggests the judgment is temporary."
    },
    {
      q:"Denis Dutton's argument is described as 'more radical' than the other positions because it:",
      choices:[
        "Claims that skilled forgeries should be valued equally with authentic works in every context",
        "Treats valuing authenticity as a product of Romantic ideology, not a universal principle",
        "Proposes that museums disclose the authentication history of every work they display",
        "Suggests that non-Western art traditions are aesthetically superior to Western ones"
      ],
      ans:1,
      exp:"Dutton traces the authentic-artwork concept to 'the Romantic cult of individual genius' and suggests that valuing originals 'may say more about the cultural values of modern Western art institutions than about the intrinsic properties of art objects.' That questions the premise Goodman and Lessing share. He uses non-Western traditions as contrasts, not as superior art, and makes no claim that forgeries are always equal or about museum policy."
    },
    {
      q:"The final paragraph says the van Meegeren case 'forces us to articulate what we think art is for.' This framing suggests that the author views the forgery debate as:",
      choices:[
        "Primarily a legal question about intellectual property and the rights of artists' estates",
        "A puzzle that better authentication technology will eventually resolve for good",
        "A test of whether we value art for the experience it gives or for its human history",
        "An argument for the superiority of Lessing's position over Goodman's position"
      ],
      ans:2,
      exp:"The author sets out two answers (art as 'a certain kind of perceptual or emotional experience' versus art as connection to 'a particular human history') and calls our response to forgery 'the most honest test of which of these we actually believe.' The debate is framed as revealing our assumptions, not as a legal or technical problem, and the author does not rank Lessing above Goodman."
    }
  ]
},

]; // end CARS_PASSAGES

const CARS_EXTRA = [

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 11: Architecture & Cultural Memory
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_11',
  topic:'CARS',
  title:'Demolition, Preservation, and the Politics of Urban Memory',
  passage:`In 1963, New York City demolished Pennsylvania Station. The original structure, completed in 1910, was a Beaux-Arts monument modeled on the Baths of Caracalla: a vast hall of travertine columns, coffered ceilings, and natural light flooding through iron-and-glass vaults. Passengers descended into the city through a space that announced arrival as a civic occasion. The replacement — a low-ceilinged warren of corridors beneath Madison Square Garden, opened in 1968 — announced nothing except the imperative to move. The architectural critic Ada Louise Huxtable wrote at the time that one entered the old Penn Station like a god and one now scurried in like a rat.

The demolition provoked outrage that directly precipitated New York's Landmarks Preservation Law of 1965, and similar legislation followed in cities across the country. The preservationist movement that emerged from Penn Station's rubble was not simply nostalgic. Its practitioners made a serious claim: that buildings are not merely containers for activity but are themselves carriers of collective memory and civic meaning. To demolish a significant building is not simply to remove a structure but to excise a form of shared experience — a physical record of how a community once understood its aspirations.

This claim has been contested from several directions. Developers and city planners have argued that the preservationist impulse, taken too far, calcifies cities into museums of themselves, preventing the adaptive reuse and densification that urban vitality requires. Jane Jacobs, whose influence on urban planning has been enormous, was ambivalent about historic preservation precisely because she recognized that what makes cities live is not the preservation of individual buildings but the maintenance of mixed use, human scale, and the fine grain of street life — conditions that can be destroyed by over-regulated preservation districts as surely as by demolition.

A more pointed critique targets the selectivity of preservation. What gets preserved is rarely a neutral sample of the built environment: it tends to be the monumental, the expensive, and the architecturally celebrated — the buildings of commerce, government, and cultural elites. The vernacular architecture of working-class neighborhoods, immigrant communities, and industrial districts is routinely demolished without protest while landmark status is vigorously defended for structures that never served those communities' needs. Critics from traditions of urban social history have argued that preservation, in practice, often functions as a mechanism of gentrification: stabilizing property values and neighborhood character in ways that benefit new, wealthier residents at the expense of those who actually inhabited the preserved spaces.

The tension between preservation and change is, at its core, a dispute about whose memory counts and whose future matters. A city that preserves only its most celebrated buildings enshrines a particular version of its history. A city that demolishes freely forfeits the physical evidence through which alternative histories might be recovered. Neither extreme serves the full range of interests that a democratic city ought to represent. What is required is not a formula but a politics — a process of negotiation among competing claims on space, memory, and future possibility that is accountable to the full diversity of those who inhabit urban places.`,
  questions:[
    {
      q:"The author opens with the Pennsylvania Station example primarily in order to:",
      choices:[
        "Argue that Beaux-Arts architecture is aesthetically superior to all modernist design",
        "Show that city governments consistently make poor decisions about urban development",
        "Ground in a concrete case the loss of civic meaning that demolition can cause",
        "Demonstrate that public outrage is an effective tool for changing preservation policy"
      ],
      ans:2,
      exp:"The contrast between entering 'like a god' and scurrying in 'like a rat' dramatizes the claim in paragraph two that demolishing a significant building excises 'a form of shared experience.' The passage then analyzes preservation in general, not architectural styles or government competence, and the 1965 law is a consequence of the episode rather than the point of it."
    },
    {
      q:"Jane Jacobs's ambivalence about historic preservation, as described in the passage, stemmed from her view that:",
      choices:[
        "Individual landmark buildings matter more than street-level activity to a city's life",
        "Preservation districts can destroy mixed use and street life as surely as demolition can",
        "The preservation movement was driven mainly by nostalgia rather than by civic concern",
        "Developers are better placed than preservationists to decide what a growing city should build"
      ],
      ans:1,
      exp:"Jacobs held that what makes cities live is 'mixed use, human scale, and the fine grain of street life,' conditions 'that can be destroyed by over-regulated preservation districts as surely as by demolition.' She ranked street life above individual buildings, not the reverse. The passage itself says the movement 'was not simply nostalgic,' and Jacobs is not described as siding with developers."
    },
    {
      q:"The critique of preservation's 'selectivity,' as described in paragraph four, implies that current preservation practice:",
      choices:[
        "Protects too many buildings overall and so slows urban development unnecessarily",
        "Is controlled by architectural historians who are not accountable to city residents",
        "Favors elite landmarks over vernacular buildings and can aid gentrification",
        "Fails to apply consistent aesthetic standards across different types of buildings"
      ],
      ans:2,
      exp:"Preservation favors 'the monumental, the expensive, and the architecturally celebrated' while working-class and immigrant vernacular buildings are 'routinely demolished without protest,' and it 'often functions as a mechanism of gentrification.' The critique concerns whose buildings are protected, not how many, who controls the process, or aesthetic consistency."
    },
    {
      q:"The author's proposed resolution in the final paragraph is best described as:",
      choices:[
        "A clear formula that weighs a building's age against its architectural significance",
        "An accountable political process for negotiating competing claims on urban space",
        "Federal legislation to standardize preservation criteria across American cities",
        "A rule that community memory should always take precedence over economic development"
      ],
      ans:1,
      exp:"The author says 'what is required is not a formula but a politics,' a negotiation 'accountable to the full diversity of those who inhabit urban places.' That rules out any fixed formula or rule of precedence, and the passage proposes no federal legislation."
    },
    {
      q:"Which of the following would the author most likely consider an example of preservation functioning as gentrification?",
      choices:[
        "A landmarked factory district draws affluent newcomers while its former workers are priced out",
        "A city demolishes a celebrated Beaux-Arts train station in order to build a sports arena",
        "Residents campaign successfully to restore the historic architecture of their own neighborhood",
        "A city requires new buildings to match the scale and materials of nearby historic structures"
      ],
      ans:0,
      exp:"Preservation becomes gentrification when it stabilizes 'property values and neighborhood character in ways that benefit new, wealthier residents at the expense of those who actually inhabited the preserved spaces.' The factory district fits exactly. Demolition is the opposite of preservation, residents restoring their own neighborhood serve the people who live there, and a design-matching rule involves no displacement."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// CARS PASSAGE 12: Natural Sciences for Non-Scientists
// (History of science with strong authorial voice — no science knowledge needed)
// ══════════════════════════════════════════════════════════════
{
  id:'p_cars_12',
  topic:'CARS',
  title:'The Social Life of Scientific Instruments',
  passage:`We tend to think of scientific instruments as transparent windows onto nature — neutral devices that simply reveal what is already there. The history of science suggests otherwise. Instruments do not merely detect; they constitute. The phenomena that scientists study are, in important ways, artifacts of the tools used to study them. Understanding this does not undermine science; it deepens our appreciation of what scientific knowledge actually is and how it is achieved.

Consider the microscope. When Antonie van Leeuwenhoek first observed microorganisms in the 1670s, he did not simply discover a pre-existing world of tiny creatures that had been waiting, invisibly, for someone to look. He produced a new kind of object — the microscopical animalcule — that existed, as a scientific object, only in relation to the instrument, the technique, the trained eye, and the community of practitioners who could recognize and reproduce the observation. The claim is not the absurd one that microorganisms did not exist before Leeuwenhoek; it is the more careful one that "microorganism" as a scientific object — as something that can be described, classified, argued about, and built upon — came into existence through a specific conjunction of material, social, and conceptual resources.

This view, associated with the philosopher Ian Hacking's concept of "representing and intervening," implies that scientific instruments do not stand passively between the observer and nature. They actively shape what can be seen, what counts as evidence, and what questions can be posed. The design of an instrument embodies theoretical assumptions: a telescope built on the assumption that light travels in straight lines will fail to detect phenomena that require a different optics. Instruments are, in this sense, materialized theories — and they carry the commitments of their makers into every observation made with them.

The social dimensions of instrumentation are equally significant. Access to expensive instruments has never been uniformly distributed. The history of colonial science is, in part, a history of instrument ownership: the ability to conduct systematic astronomical observation, geological survey, or biological classification was concentrated in metropolitan centers and extended to the periphery in ways that shaped what was known about whom. Indigenous knowledge of local flora, fauna, and astronomical phenomena was routinely appropriated without credit, filtered through European instruments and classificatory schemes, and returned as "science" — a process that simultaneously produced knowledge and effaced its sources.

None of this means that scientific knowledge is merely a social construction in the dismissive sense — that it is no more reliable than folklore or that it cannot tell us genuine truths about the world. What it means is that scientific knowledge is achieved knowledge: the product of specific people, in specific places, using specific tools, operating within specific communities of practice. Acknowledging this does not relativize science; it historicizes it. And history, in this case, is not a threat to science but a resource for understanding both its remarkable achievements and its genuine limitations.`,
  questions:[
    {
      q:"The author's central claim about scientific instruments is best summarized as:",
      choices:[
        "Instruments introduce systematic errors into observation that scientists must correct for",
        "Instruments are not neutral windows but help shape what can be observed and known",
        "The invention of better instruments is the primary driver of all scientific progress",
        "Instruments are reliable only when operated by trained scientists in established communities"
      ],
      ans:1,
      exp:"The author states that 'instruments do not merely detect; they constitute' and that they 'actively shape what can be seen, what counts as evidence, and what questions can be posed.' Systematic error is never discussed, the passage makes no claim about what drives progress, and trained practitioners appear as part of how scientific objects arise, not as a condition of reliability."
    },
    {
      q:"The author's claim about Leeuwenhoek is specifically that:",
      choices:[
        "Leeuwenhoek fabricated many of his reported observations of tiny living creatures",
        "Microorganisms did not exist in nature before Leeuwenhoek first built his microscope",
        "'Microorganism' as a scientific object arose from instrument, technique, and community",
        "Others could not reproduce Leeuwenhoek's observations, so they were not truly scientific"
      ],
      ans:2,
      exp:"The author calls the claim that microorganisms did not exist before Leeuwenhoek 'the absurd one' and endorses 'the more careful one': that 'microorganism' as a scientific object 'came into existence through a specific conjunction of material, social, and conceptual resources.' The passage stresses that the observation was recognized and reproduced by a community, so fabrication and non-reproducibility are the opposite of its point."
    },
    {
      q:"The author describes instruments as 'materialized theories.' This phrase most nearly means that:",
      choices:[
        "Scientific theories can ultimately be reduced to the instruments used to test them",
        "Theory is less valuable than experiment because theories cannot be tested without tools",
        "An instrument's design embeds its makers' theoretical assumptions in each observation",
        "Instruments become outdated whenever theories change and so must be regularly replaced"
      ],
      ans:2,
      exp:"Just before the phrase, the author says 'the design of an instrument embodies theoretical assumptions,' and just after, that instruments 'carry the commitments of their makers into every observation made with them.' The phrase says theory is built into instruments, not that theory reduces to them, that experiment outranks theory, or that instruments go out of date."
    },
    {
      q:"The passage's discussion of colonial science serves primarily to:",
      choices:[
        "Argue that European science produced knowledge inferior to that of indigenous traditions",
        "Show how unequal access to instruments shaped what was known and who received credit",
        "Show that scientific classification schemes are inherently biased and should be abandoned",
        "Provide an example of instruments introducing systematic measurement errors into data"
      ],
      ans:1,
      exp:"The paragraph illustrates 'the social dimensions of instrumentation': access to instruments 'has never been uniformly distributed,' which 'shaped what was known about whom,' and indigenous knowledge was 'appropriated without credit.' The author criticizes how credit was assigned without ranking the two traditions, does not call for abandoning classification, and does not discuss measurement error."
    },
    {
      q:"In the final paragraph, the author distinguishes science as 'merely a social construction' from science as 'achieved knowledge.' The purpose of this distinction is to:",
      choices:[
        "Concede that the author's earlier arguments were overstated and that instruments are in fact neutral",
        "Argue that social constructionism is a more accurate account of science than realism",
        "Preempt the objection that recognizing science's social dimensions reduces it to unreliable opinion",
        "Demonstrate that scientific knowledge is more reliable than other forms of knowledge"
      ],
      ans:2,
      exp:"The author denies that science is 'no more reliable than folklore' and says that acknowledging its history 'does not relativize science; it historicizes it.' This heads off a likely objection to the earlier argument. It retracts nothing (instruments are still said to constitute their objects), does not side with constructionism against realism, and does not compare science with other forms of knowledge."
    }
  ]
},

]; // end CARS_EXTRA

const EXAM2_CARS_PASSAGES = [

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 1: Philosophy — The Trolley Problem & Moral Intuition
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_1',
  type:'passage',
  topic:'CARS',
  title:'Trolley Problems and the Evidential Weight of Moral Intuitions',
  passage:`Judith Jarvis Thomson's trolley problem has become the most discussed thought experiment in contemporary ethics, generating more philosophical literature than perhaps any other single scenario. In its original formulation, a runaway trolley is headed toward five people who will be killed unless a bystander diverts it onto a side track, where it will kill one person. Most people judge that diverting the trolley is permissible. But in the "footbridge" variant — where saving the five requires pushing a large person off a bridge to stop the trolley — most people judge that pushing is impermissible, even though the arithmetic of deaths is identical.

This divergence has been used to argue against utilitarian ethics, which would seem to require the same judgment in both cases: one death is better than five. Defenders of deontological ethics point to the footbridge case as evidence that there are moral constraints — prohibitions on using persons as mere means — that cannot be overridden by good consequences. The "doctrine of double effect" attempts to systematize the intuition: it is permissible to bring about a foreseen bad effect as a side effect of a good effect, but impermissible to bring it about as a means to the good effect.

Thomson herself complicated the picture with further variants. In the "loop" case, the side track curves back to rejoin the main line, so that the trolley would circle around and kill the five anyway were it not stopped by the body of the one person on the side track. Diverting the trolley now seems to use that person as a means, yet a substantial number of people still judge diversion permissible. If the doctrine of double effect cannot accommodate this response, either the doctrine or the response is mistaken. Cases of this kind have made philosophers uneasy about treating any single principle as the hidden rationale behind our reactions; the reactions seem sensitive to features that no tidy principle captures, such as whether the harm is inflicted by one's own hands.

The more unsettling possibility, raised by Joshua Greene and colleagues using neuroimaging, is that the footbridge intuition reflects not a moral principle but a psychological artifact. Brain regions associated with emotional processing are more active when subjects contemplate the footbridge case; regions associated with deliberative reasoning are more active in the trolley case. Greene argues that the emotional response in the footbridge case is an evolutionary residue — a disgust response to personal violence that was adaptive in ancestral environments but is not a reliable guide to moral truth in novel scenarios like trolley problems.

Greene's account also offers a diagnosis of why principles like double effect seemed plausible in the first place. On his view, such principles are after-the-fact rationalizations, constructed to systematize emotional reactions that were never responses to the distinction between means and side effects at all. If so, the long search for the principle behind the footbridge intuition may have been an effort to justify a reflex.

This argument has profound implications: if our strongest moral intuitions are explained by evolutionary psychology rather than moral reality, should those intuitions carry evidential weight in ethical reasoning? The question bears on whether intuitions can serve as data against which ethical theories are tested, or whether they are merely psychological facts about how we happen to feel. Nor is the question confined to the seminar room. Those who draft rules for triage in overwhelmed hospitals, or for how automated vehicles should behave in unavoidable collisions, routinely test their proposals against what people find acceptable.`,
  questions:[
    {
      q:"The author presents Greene's neuroscientific argument primarily to:",
      choices:[
        "Endorse utilitarianism as the correct theory of what makes actions right or wrong",
        "Raise the possibility that the footbridge intuition is a psychological artifact, not evidence",
        "Argue that neuroscience has definitively resolved the trolley problem in favor of pushing",
        "Defend the doctrine of double effect against the objections of its utilitarian critics"
      ],
      ans:1,
      exp:"Greene's work is introduced as 'the more unsettling possibility' that the footbridge intuition 'reflects not a moral principle but a psychological artifact,' which would weaken its standing as evidence for deontological constraints. The author never endorses utilitarianism, ends with an open question rather than a resolution, and reports Greene's view that double effect may be a rationalization rather than defending it."
    },
    {
      q:"In the original trolley case and the footbridge case, the doctrine of double effect as described in the passage would most likely classify which action as permissible?",
      choices:[
        "Pushing the large person, because that death is a foreseen side effect of saving the five",
        "Diverting the trolley, because the one death is a side effect rather than a means",
        "Neither action, because the doctrine forbids any act that results in a person's death",
        "Both actions, because the doctrine permits any act that saves the greater number of lives"
      ],
      ans:1,
      exp:"The doctrine permits 'a foreseen bad effect as a side effect of a good effect' but forbids bringing it about 'as a means.' In the original case the one person's death is a by-product of turning the trolley; in the footbridge case the person's body is the means of stopping it. The doctrine therefore separates the two cases rather than forbidding or permitting both."
    },
    {
      q:"The question of whether intuitions 'can serve as data against which ethical theories are tested' reflects a debate about:",
      choices:[
        "Whether psychology should eventually replace moral philosophy as the main discipline that studies ethics",
        "Whether intuitions with non-moral origins can count as evidence about ethical theories",
        "Whether trolley problems are realistic enough to generate genuine moral insight",
        "Whether neuroscience is a reliable enough method for studying how people judge morally"
      ],
      ans:1,
      exp:"The passage asks whether intuitions 'can serve as data against which ethical theories are tested, or whether they are merely psychological facts about how we happen to feel,' a question about the evidential (epistemological) standing of intuitions raised by Greene's claim that the footbridge response is an evolutionary residue. The passage does not propose replacing ethics with psychology, question the realism of trolley cases, or assess the reliability of neuroscience."
    },
    {
      q:"Which of the following, if true, would most directly support Greene's claim that the footbridge intuition is an evolutionary artifact?",
      choices:[
        "People in many different cultures show the same split between the trolley and footbridge cases",
        "The footbridge intuition fades when people are given time to deliberate carefully",
        "Neuroscientists have located a single brain region responsible for all moral judgments",
        "Philosophers have failed to reach consensus on the trolley problem after decades of debate"
      ],
      ans:1,
      exp:"Greene contrasts emotional processing in the footbridge case with deliberative reasoning in the trolley case. If the intuition disappears once people deliberate, it behaves like a fast, automatic emotional response rather than a considered principle, which supports his account. Cross-cultural agreement fits an evolved response but fits a universal moral truth equally well, so it does not favor Greene; a single 'moral region' and philosophers' disagreement are irrelevant to his claim."
    },
    {
      q:"A philosopher responds to Greene: 'Even if the footbridge intuition has an evolutionary explanation, this does not show that the intuition is incorrect; evolution may have calibrated our emotions to track moral truths.' This response challenges Greene's argument by:",
      choices:[
        "Accepting Greene's conclusion but arguing that utilitarianism is also an evolutionary artifact",
        "Distinguishing the causal origin of an intuition from whether that intuition is reliable",
        "Arguing that neuroscience cannot study the content of people's moral beliefs",
        "Claiming that evolutionary psychology has not found a clear mechanism for the footbridge response"
      ],
      ans:1,
      exp:"Greene moves from 'this intuition has an evolutionary origin' to 'this intuition is not a reliable guide to moral truth.' The philosopher grants the origin but denies that it settles reliability, just as evolved perception can still be accurate. The reply does not accept Greene's conclusion, says nothing about the limits of neuroscience, and does not dispute the evolutionary mechanism."
    },
    {
      q:"The author discusses Thomson's 'loop' case primarily to:",
      choices:[
        "Suggest that the doctrine of double effect may not capture what drives people's judgments",
        "Show that most people reason about trolley cases in a consistently utilitarian way",
        "Demonstrate that the loop case and the footbridge case produce identical judgments",
        "Provide evidence that emotional processing drives people's response to the loop case"
      ],
      ans:0,
      exp:"In the loop case diversion seems to use the one person 'as a means,' yet many still judge it permissible, so 'either the doctrine or the response is mistaken,' and philosophers grow uneasy about any 'single principle' behind our reactions. People still reject pushing in the footbridge case, so they are not consistently utilitarian, and the loop case is contrasted with, not equated to, the footbridge case. The neuroimaging evidence concerns the footbridge and trolley cases only."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 2: Social Science — The Concept of Medicalization
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_2',
  type:'passage',
  topic:'CARS',
  title:'Medicalization, Biomedicalization, and the Expansion of Medical Jurisdiction',
  passage:`The sociologist Peter Conrad defines medicalization as the process by which non-medical problems become defined and treated as medical problems, usually in terms of illness or disorders. The concept does not require that medicalization is intentional or conspiratorial; it describes a structural transformation in how human experience is categorized, explained, and managed. Attention deficit disorder, menopause, shyness, and grief have all been, at various points, subject to medicalization debates.

Medicalization is not simply the same as the discovery of a disease. When a previously misunderstood biological condition gains a medical name and effective treatment, as with type 1 diabetes, the medical involvement is unambiguously appropriate — the condition preceded the diagnosis. Medicalization, as critics use the term, typically refers to conditions where the classification itself is contested: where what is being classified may be a natural variation in human biology, a social problem, or a response to adverse circumstances rather than a disease process in any biologically meaningful sense.

The expansion of the Diagnostic and Statistical Manual (DSM) from 106 conditions in 1952 to over 300 in its most recent editions has served as a flashpoint for medicalization debates. Critics argue that the expansion reflects pharmaceutical industry influence, the professional interests of psychiatry, and the cultural preference for individual biological explanations over structural social ones, rather than genuine discoveries of new disease entities. Defenders argue that better diagnostic precision reduces stigma and enables targeted treatment; expanding the DSM reflects greater understanding, not overreach.

Medicalization is rarely a matter of loss alone. A diagnosis can confer legitimacy on suffering that was previously dismissed as weakness or malingering, open access to treatment and insurance coverage, and relieve individuals of blame for conditions they did not choose. Parents of children diagnosed with attention deficit disorder, for instance, have often welcomed a label that replaced accusations of bad parenting. The costs are subtler. When a problem is located in an individual body or brain, attention is drawn away from the schools, workplaces, and social arrangements that may have produced it; a public problem is converted into a private one, to be managed by prescription rather than addressed by collective action.

Conrad himself later observed that the forces driving medicalization had shifted. In its classic form, the expansion of medical jurisdiction was led by physicians and their professional organizations. More recently, the leading engines have been biotechnology firms, managed-care insurers, and patients themselves, who increasingly arrive in clinics as informed consumers requesting particular diagnoses and treatments.

Clarke and colleagues have proposed the concept of "biomedicalization" to describe a further transformation: the shift from external medical control of bodies (medicalization) to the internalization of medical norms, the use of molecular-level interventions, and the imperative of health optimization rather than merely illness treatment. Where medicalization positioned patients as passive recipients of medical authority, biomedicalization recruits them as active participants in the continuous surveillance and management of their own risk factors and biological processes. On this account, the line between being healthy and being a patient becomes less a boundary than a continuum along which everyone is placed.`,
  questions:[
    {
      q:"According to the passage, what distinguishes medicalization from the discovery of a genuine disease?",
      choices:[
        "Medicalization always involves pharmaceutical influence, while true disease discovery never does",
        "In discovery the condition precedes the diagnosis; in medicalization the classification is contested",
        "Medicalization applies only to psychiatric conditions, while physical diseases are always truly medical",
        "Genuine discovery requires genetic evidence, whereas medicalization occurs when genetic causes are absent"
      ],
      ans:1,
      exp:"Paragraph two draws the distinction: type 1 diabetes is not medicalization because 'the condition preceded the diagnosis' and has effective treatment. Medicalization, as critics use the term, applies where 'the classification itself is contested': where the condition may be natural variation, a social problem, or a response to adverse circumstances. Pharmaceutical influence is one critique of DSM expansion, not a definition, and the passage neither limits medicalization to psychiatry nor uses genetic evidence as the test."
    },
    {
      q:"Defenders of DSM expansion argue that 'better diagnostic precision reduces stigma and enables targeted treatment.' How does their position differ from the critics' position on the same expansion?",
      choices:[
        "Defenders and critics agree on the facts but disagree about which values should guide psychiatry",
        "Defenders read the expansion as scientific progress; critics attribute it to non-scientific influences",
        "Defenders base their position on neuroscience; critics base theirs on sociology",
        "Critics accept that new diagnoses reduce stigma but argue the cost in overdiagnosis is too high"
      ],
      ans:1,
      exp:"Both sides explain the same fact, the growth from 106 to over 300 conditions. Defenders say it 'reflects greater understanding, not overreach'; critics attribute it to 'pharmaceutical industry influence, the professional interests of psychiatry,' and cultural preferences 'rather than genuine discoveries.' The dispute is about what caused the expansion, which is a factual question, not merely a clash of values; the passage does not say critics grant the stigma point or assign either side a discipline."
    },
    {
      q:"Clarke's concept of 'biomedicalization' describes a shift from 'external medical control' to 'internalization of medical norms.' Which of the following would best exemplify biomedicalization rather than medicalization?",
      choices:[
        "A physician prescribes antibiotics to a patient who has a confirmed bacterial infection",
        "A person without diabetes tracks her blood glucose daily to optimize her metabolism",
        "A drug company markets a new antidepressant directly to primary care physicians",
        "A hospital requires all of its staff members to be vaccinated against influenza each year"
      ],
      ans:1,
      exp:"Biomedicalization involves 'the imperative of health optimization rather than merely illness treatment' and patients as 'active participants in the continuous surveillance and management of their own risk factors and biological processes.' A healthy person monitoring her own glucose to optimize her metabolism fits on every count. Treating a diagnosed infection is ordinary treatment, and marketing to physicians or a hospital mandate are forms of external authority rather than internalized norms."
    },
    {
      q:"The author notes that the concept of medicalization 'does not require that medicalization is intentional or conspiratorial.' The point of this remark is that:",
      choices:[
        "The author is defending pharmaceutical companies and professional organizations from criticism",
        "Medicalization is a broad shift in how experience is categorized, not any group's deliberate plan",
        "Medicalization can properly be studied only by sociologists, not by clinicians or by patients themselves",
        "Structural explanations are always more accurate than intentional ones in the social sciences"
      ],
      ans:1,
      exp:"The sentence continues: 'it describes a structural transformation in how human experience is categorized, explained, and managed.' The point is that medicalization is a change in categories and practices, not the product of a plot. The author defends no particular party, makes no claim about which discipline can study it, and makes no general claim that structural explanations always beat intentional ones."
    },
    {
      q:"The author mentions parents of children diagnosed with attention deficit disorder primarily in order to:",
      choices:[
        "Show that attention deficit disorder is a clear case of genuine disease discovery",
        "Illustrate one way a diagnosis can benefit those affected, by lifting a burden of blame",
        "Argue that parents have been the main force behind the expansion of the DSM",
        "Suggest that most diagnoses of attention deficit disorder are made in error"
      ],
      ans:1,
      exp:"The example appears in the paragraph on benefits: a diagnosis can 'relieve individuals of blame,' and parents welcomed 'a label that replaced accusations of bad parenting.' Attention deficit disorder is listed earlier as a subject of medicalization debates, so the passage does not call it a clear discovery, and nothing is said about parents driving DSM expansion or about diagnostic error rates."
    },
    {
      q:"Based on the passage, which development would best illustrate the shift Conrad later observed in the forces driving medicalization?",
      choices:[
        "A physicians' association defines a common behavior as a treatable disorder for the first time",
        "Patients ask their doctors for a specific diagnosis after reading about it in online advertisements",
        "A researcher identifies the bacterium responsible for a previously unexplained illness",
        "A government agency restricts the advertising of prescription drugs to the general public"
      ],
      ans:1,
      exp:"Conrad observed that leadership passed from physicians to 'biotechnology firms, managed-care insurers, and patients themselves,' who arrive 'as informed consumers requesting particular diagnoses.' Patients requesting a diagnosis they saw advertised shows the new engines at work. A physicians' association defining a disorder is the classic form, identifying a bacterium is disease discovery, and restricting advertising works against the shift rather than illustrating it."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 3: History — The Enlightenment & Its Critics
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_3',
  type:'passage',
  topic:'CARS',
  title:'The Enlightenment Project and Its Twentieth-Century Discontents',
  passage:`The Enlightenment of the seventeenth and eighteenth centuries is conventionally understood as the moment when European culture committed itself to reason, science, and progress as the foundations of human betterment. Thinkers from Locke to Kant argued that human beings, by exercising their rational faculties, could free themselves from superstition, tyranny, and ignorance. Kant's motto for the age, "dare to know," captured the spirit of the project: maturity meant thinking for oneself rather than deferring to the authority of church, crown, or custom. The political corollaries were liberal democracy, natural rights, and the separation of church and state. The intellectual corollaries were the scientific method, the idea of universal laws of nature, and the optimistic belief that knowledge accumulates toward truth.

By the mid-twentieth century, this project had acquired a more complicated reputation. Max Horkheimer and Theodor Adorno, writing in the aftermath of the Holocaust, argued in the "Dialectic of Enlightenment" that reason had not liberated human beings but had become a tool of domination. The same drive to master nature that produced scientific medicine also produced industrial warfare, totalitarian rationalization, and the administered extermination of millions. The problem was not that the Enlightenment had failed but that it had succeeded — it had produced the efficient, disenchanted, technically capable societies that made twentieth-century atrocities possible. At the center of the analysis was what Horkheimer elsewhere called instrumental reason: a rationality concerned only with finding the most efficient means to given ends, and therefore unable to ask whether those ends deserve to be pursued. Reason of this kind could organize a railway timetable or a deportation with equal competence.

Postcolonial critics added a different objection: the Enlightenment's claimed universalism concealed a particularism. The 'universal reason' of the philosophes was, in practice, the reason of educated European men; the 'universal rights' of man excluded women, enslaved persons, and colonized peoples, not by oversight but by design. The supposedly neutral standpoint of rational inquiry was embedded in specific social positions and served specific social interests. John Locke, whose defense of natural rights shaped liberal constitutions, was also an investor in the Royal African Company, which trafficked enslaved Africans; for these critics, such facts are not embarrassing footnotes but evidence of how the universal was defined from the start.

Neither of these critiques amounts to a simple rejection of reason or science. Horkheimer and Adorno were themselves working in the rationalist tradition. Postcolonial critics typically demand more inclusive and genuinely universal standards of evidence and argument, not their abandonment. The target is not Enlightenment ideals as such but the gap between their universal claims and their historically exclusionary practice.

Some defenders of the Enlightenment have welcomed this reading. Jürgen Habermas, for instance, described modernity as an unfinished project: the remedy for the failures of reason, on his view, is not less reason but a fuller realization of it, in which claims are tested through open argument among all who are affected by them. Whether that remedy is adequate remains contested, but it suggests that the critics and the defenders may share more ground than their polemics imply.`,
  questions:[
    {
      q:"Horkheimer and Adorno's argument, as described in the passage, is most precisely characterized as:",
      choices:[
        "A rejection of science and rationalism in favor of a return to traditional values",
        "A claim that the Enlightenment failed to achieve its own goals of liberation and progress",
        "A claim that reason's very success at mastering nature enabled modern atrocities",
        "A critique of the way Enlightenment universalism excluded colonized and non-European peoples"
      ],
      ans:2,
      exp:"The passage says 'the problem was not that the Enlightenment had failed but that it had succeeded,' producing the 'technically capable societies that made twentieth-century atrocities possible.' That directly rules out the failure reading. The exclusion of colonized peoples is the postcolonial critique, and the fourth paragraph notes that Horkheimer and Adorno 'were themselves working in the rationalist tradition.'"
    },
    {
      q:"The passage says the postcolonial critique holds that Enlightenment universalism 'concealed a particularism.' This phrase means that:",
      choices:[
        "Enlightenment thinkers were simply unaware of the cultural biases that shaped their own views",
        "Supposedly universal standards in fact reflected and served the interests of a narrow group",
        "Universal ideals became particular only later, through accidents of historical circumstance",
        "Particularism and universalism are always in tension within any philosophical system"
      ],
      ans:1,
      exp:"'Universal reason' was 'the reason of educated European men,' and 'universal rights' excluded women, enslaved persons and colonized peoples 'not by oversight but by design,' serving 'specific social interests.' 'Not by oversight' rules out simple unawareness, 'by design' rules out later historical accident, and the critique is about the Enlightenment specifically, not every philosophical system."
    },
    {
      q:"The fourth paragraph argues that neither critique amounts to 'a simple rejection of reason or science.' What is the logical function of this paragraph?",
      choices:[
        "It refutes both critiques by showing that each one contradicts its own premises",
        "It clarifies that both critiques target the gap between ideals and practice, not reason",
        "It defends the Enlightenment by showing that its critics still rely on its methods",
        "It introduces a new critique aimed at both Horkheimer and Adorno and postcolonial theory"
      ],
      ans:1,
      exp:"The paragraph concludes: 'The target is not Enlightenment ideals as such but the gap between their universal claims and their historically exclusionary practice.' It heads off a misreading of the critiques as anti-rational. Noting that the critics work within the rationalist tradition clarifies what they are attacking; it is not used to refute them or to acquit the Enlightenment, and no new critique is introduced."
    },
    {
      q:"A philosopher argues: 'If postcolonial critics use rational argument and evidence to make their case, they implicitly endorse Enlightenment standards and cannot consistently criticize Enlightenment reason.' Based on the passage, how would the critics most likely respond?",
      choices:[
        "They would abandon rational argument in favor of purely experiential or narrative critique",
        "They would concede the point and give up their critique of Enlightenment reason entirely",
        "They would use reason's own standards to expose where those standards were applied selectively",
        "They would deny that any universal standards exist, since cultures' ways of knowing are incommensurable"
      ],
      ans:2,
      exp:"The critics 'demand more inclusive and genuinely universal standards of evidence and argument, not their abandonment.' So using rational argument is consistent with their aim: they object to how universal claims were applied, not to reason itself. Abandoning argument or denying universal standards contradicts that demand, and conceding would mean dropping the critique the passage describes them as making."
    },
    {
      q:"The passage presents the belief that 'knowledge accumulates toward truth' as:",
      choices:[
        "One of the intellectual corollaries of the Enlightenment's commitment to reason",
        "The specific belief that Horkheimer and Adorno singled out as the source of domination",
        "A view the author personally defends against the objections of the postcolonial critics",
        "A political corollary of the doctrine of natural rights, alongside liberal democracy"
      ],
      ans:0,
      exp:"Paragraph one lists 'the optimistic belief that knowledge accumulates toward truth' among the Enlightenment's 'intellectual corollaries,' alongside the scientific method and universal laws of nature. Horkheimer and Adorno target reason as a tool of domination (instrumental reason), not this belief specifically. The author reports the belief without defending it, and the political corollaries are listed separately."
    },
    {
      q:"The author's discussion of Habermas in the final paragraph suggests that:",
      choices:[
        "Habermas decisively refuted Horkheimer and Adorno's account of instrumental reason",
        "Critics and defenders of the Enlightenment may agree more than their polemics indicate",
        "The Enlightenment project has been completed in contemporary liberal democracies",
        "Habermas rejected the idea that claims should be tested through open argument among all"
      ],
      ans:1,
      exp:"Habermas's remedy, 'not less reason but a fuller realization of it,' echoes the critics' demand for 'genuinely universal standards,' and the author concludes that the two sides 'may share more ground than their polemics imply.' The author says the adequacy of the remedy 'remains contested,' so nothing is decisively refuted; calling modernity 'unfinished' contradicts the claim of completion, and Habermas endorses open argument rather than rejecting it."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 4: Ethics — Informed Consent & Autonomy
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_4',
  type:'passage',
  topic:'CARS',
  title:'The Limits of Informed Consent as a Bioethical Paradigm',
  passage:`Informed consent has become the cornerstone of contemporary biomedical ethics, representing a shift from the paternalistic medicine of earlier decades toward a model that centers patient autonomy. The term itself entered American law only in 1957, and the doctrine gained much of its force in the years after revelations of research abuses such as the Tuskegee syphilis study. The basic requirements are well established: disclosure of relevant information, patient comprehension, voluntariness of agreement, and decision-making capacity. The doctrine has deep roots in both law and moral philosophy — Kant's prohibition on using persons as mere means, Mill's harm principle, and the intuition that what happens to one's body should ultimately be one's own decision.

The practical implementation of informed consent faces a series of well-documented problems. Research in decision psychology has consistently found that patients understand and retain only a fraction of the information disclosed to them, that comprehension declines with complexity and anxiety, and that framing effects powerfully influence treatment choices. Patients told that an operation has a 90 percent survival rate, for example, choose it more often than patients told that it has a 10 percent mortality rate, although the two statements convey identical information. If a patient's decision is significantly determined by how their physician presents options — which framing is used, what order information is presented in, what the physician's own demeanor suggests — it becomes difficult to maintain that the decision is fully autonomous in the morally relevant sense.

Institutional practice compounds these difficulties. Consent forms have grown longer and more legalistic, written as much to protect institutions from liability as to inform patients, and they are often presented minutes before a procedure, when a patient's capacity to weigh alternatives is at its lowest. Studies of surgical consent have found that many patients cannot recall the principal risks of their operation only days after signing. A signature obtained under such conditions satisfies the letter of the doctrine while leaving its purpose unmet.

A deeper challenge comes from the social embeddedness of patients' values. Preferences expressed in a clinical encounter do not emerge from nowhere; they are shaped by cultural frameworks, family expectations, media representations of illness, prior healthcare experiences, and the immediate context of vulnerability and fear in which clinical encounters occur. Some feminist and communitarian theorists have argued that the liberal conception of autonomy underlying informed consent — which imagines a self-sufficient individual deliberating from fixed, pre-social preferences — is a philosophical fiction that captures neither how preferences actually form nor what genuine self-determination requires.

These critiques do not require abandoning informed consent; they point toward a more demanding standard that researchers have called "relational autonomy." On this view, genuine autonomous decision-making requires not just information provision but attention to whether the conditions for effective deliberation are present — whether the patient is free from undue institutional pressure, has access to trusted relationships and social support, and inhabits a social context that supports rather than constrains meaningful choice. Consent, on this model, is less a single event recorded on a form than a process that unfolds over the course of a relationship.`,
  questions:[
    {
      q:"The author's primary purpose in this passage is best described as:",
      choices:[
        "Arguing that informed consent should be abolished because it rarely works in clinical practice",
        "Defending the traditional model of informed consent against its feminist and communitarian critics",
        "Exposing practical and theoretical limits of informed consent and pointing to a richer standard",
        "Tracing the historical development of informed consent within American law and medicine"
      ],
      ans:2,
      exp:"The passage moves from the established doctrine to its practical problems (comprehension, framing, consent forms), then to a theoretical problem (socially formed preferences), and ends with relational autonomy as 'a more demanding standard.' The author says these critiques 'do not require abandoning informed consent' and sustains the criticism rather than defending the traditional model; the history appears only in two sentences of context."
    },
    {
      q:"The passage states that framing effects make it 'difficult to maintain that the decision is fully autonomous in the morally relevant sense.' What does 'autonomous in the morally relevant sense' mean here?",
      choices:[
        "The patient signed a legally valid consent form before the treatment was begun",
        "The choice expresses the patient's own values rather than the way options were framed",
        "The decision was made entirely free of any outside influence whatsoever",
        "The patient chose what a fully informed and perfectly rational person would choose"
      ],
      ans:1,
      exp:"The worry is that a decision 'significantly determined by how their physician presents options' may not reflect the patient's own deliberation, even if consent is formally given. A signed form is exactly the formal compliance the passage says can leave the doctrine's 'purpose unmet.' Freedom from all influence is too strong, since the relational view accepts that preferences are socially shaped, and matching an ideal chooser substitutes an outside standard for the patient's own."
    },
    {
      q:"Feminist and communitarian theorists are cited as arguing that the liberal conception of autonomy is 'a philosophical fiction.' What specifically do they claim is fictional?",
      choices:[
        "The assumption that patients have any real preferences about their own medical treatment",
        "The idea that patients should take part in decisions about their medical care at all",
        "The image of a self-sufficient chooser deliberating from fixed, pre-social preferences",
        "The belief that any decision can be voluntary given the power gap between patient and doctor"
      ],
      ans:2,
      exp:"The fiction is the liberal picture that 'imagines a self-sufficient individual deliberating from fixed, pre-social preferences,' when in fact preferences are shaped by culture, family, media, past experience and the clinical setting. The theorists do not deny that patients have preferences or should participate, and the power gap between patient and physician is not the argument the passage attributes to them."
    },
    {
      q:"Relational autonomy, as described in the final paragraph, differs from traditional informed consent primarily by:",
      choices:[
        "Requiring patients to consult their family members before making any medical decision",
        "Attending to the conditions for deliberation, not only to the information disclosed",
        "Replacing individual consent with decision-making by the patient's wider community",
        "Dropping the comprehension requirement in favor of a patient's simple verbal agreement"
      ],
      ans:1,
      exp:"Relational autonomy requires 'not just information provision but attention to whether the conditions for effective deliberation are present': freedom from institutional pressure, trusted relationships and support, and an enabling social context. Access to trusted relationships is not a duty to consult family, the decision remains the patient's, and the standard is described as 'more demanding,' not less."
    },
    {
      q:"Which of the following would a proponent of the traditional informed consent model most likely use to challenge the relational autonomy critique?",
      choices:[
        "Informed consent is now settled in law, so philosophical objections to it carry no weight",
        "The relational standard is so demanding that few real decisions could count as autonomous",
        "Most patients would rather leave medical decisions to their physicians than make them",
        "Framing effects influence only patients with little formal education, not typical patients"
      ],
      ans:1,
      exp:"Relational autonomy is explicitly 'a more demanding standard,' so the natural reply is that it sets the bar so high that ideal deliberative conditions are almost never met. Appealing to settled law ignores the philosophical argument, a preference for physician decision-making would undercut the autonomy both sides value, and limiting framing effects to one group is unsupported by the research the passage cites."
    },
    {
      q:"The author's remark that a signature obtained minutes before a procedure 'satisfies the letter of the doctrine while leaving its purpose unmet' suggests that:",
      choices:[
        "Consent forms should be abolished and replaced with purely verbal agreements",
        "Formal compliance with consent procedures does not ensure an autonomous decision",
        "Hospitals deliberately deceive patients about the risks of surgical procedures",
        "The legal requirements for consent are stricter than the ethical requirements"
      ],
      ans:1,
      exp:"The doctrine's purpose is autonomous decision-making; a signature obtained when 'a patient's capacity to weigh alternatives is at its lowest' meets the formal requirement without achieving that purpose. The author criticizes how forms are used, not their existence, says forms protect against liability rather than that they deceive, and implies the legal letter is weaker than the ethical aim, not stricter."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 5: Literary Criticism — The Biographical Fallacy
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_5',
  type:'passage',
  topic:'CARS',
  title:'The Death of the Author and the Limits of Biographical Reading',
  passage:`In 1967, Roland Barthes published an essay declaring "the death of the Author" that has shaped literary criticism ever since. Barthes argued that the traditional practice of explaining a text by reference to its author's biography, psychology, and intentions is both intellectually confused and politically suspect. A text, once written, acquires an independence from its maker; the meanings that readers find in it are not retrievable facts about the author's mind but emerge from the encounter between the text's language and the reader's cultural competencies. To "explain" a text by recovering authorial intention is to close it down — to reduce the polyphony of possible meanings to a single authorized reading. The essay's closing claim, that the birth of the reader must be paid for by the death of the Author, made the stakes explicit: the authority withdrawn from the writer was to be transferred to the reader.

Barthes was not the first to attack biographical criticism. Two decades earlier, the American critics W. K. Wimsatt and Monroe Beardsley had named the "intentional fallacy": the error of judging a poem by what its author meant to do rather than by what the poem itself achieves. But where Wimsatt and Beardsley sought to make the text a stable, public object of analysis, Barthes sought to dissolve that stability altogether. The two attacks on the author thus pointed in opposite directions, one toward greater rigor and the other toward greater freedom.

E.D. Hirsch responded that rejecting authorial intention as irrelevant makes textual interpretation arbitrary. If the author's meaning is abandoned as a criterion, what determines whether one interpretation is better than another? Hirsch distinguished "meaning" (what the author meant, stable and reproducible) from "significance" (what the text means to a particular reader at a particular time, variable). Without a stable authorial meaning as an anchor, significance cannot be distinguished from mere subjective reaction, and the discipline of literary criticism is reduced to competing confessions of personal response. For Hirsch, the alternative to authorial meaning was not freedom but anarchy.

The debate maps onto a broader tension in interpretation theory. Stanley Fish's reader-response theory holds that texts have no meaning independent of interpretive communities — meaning is always constructed by reading practices that vary across communities and historical periods. Where Hirsch sees authorial intention as the bedrock of valid interpretation, Fish sees it as itself a product of interpretive assumptions — authors can only mean things that the conventions of their community make available.

The practical consequences extend beyond literary theory. In law, the debate over whether to interpret constitutional text according to original intent (Hirsch's analog) or according to the evolving standards and needs of contemporary society (Fish's analog) has been one of the defining controversies of constitutional jurisprudence for decades. Judges face the dilemma in an especially acute form, because a legal interpretation does not remain on the page: it determines who may vote, whom one may marry, and who may be punished. The literary quarrel over the author thus reappears wherever a community must decide what an authoritative text requires of it.`,
  questions:[
    {
      q:"Barthes' argument that recovering authorial intention 'closes down' the text most directly means:",
      choices:[
        "Authors should refrain from publicly discussing the meanings of their own works",
        "Fixing meaning by the author's intent shuts out the other meanings readers can find",
        "A text can no longer have any meaning once its author has actually died",
        "An author's intentions are always inaccessible and so can never guide interpretation"
      ],
      ans:1,
      exp:"To close down a text is 'to reduce the polyphony of possible meanings to a single authorized reading.' The objection is to making the author's intent the criterion of correctness, not a claim that intentions cannot be known or that authors should stay silent. 'Death of the Author' is a metaphor for withdrawing the author's authority, not a claim about the author's literal death."
    },
    {
      q:"Hirsch's distinction between 'meaning' and 'significance' is designed to accomplish which goal?",
      choices:[
        "To show that different readers usually find the same significance in a given text",
        "To let readers' responses vary while keeping a stable standard of correct interpretation",
        "To demonstrate that significance matters more than meaning in the study of literature",
        "To show that only trained literary scholars are able to determine what a text means"
      ],
      ans:1,
      exp:"Significance is 'variable,' while meaning, anchored in what the author meant, is 'stable and reproducible.' Without that anchor, Hirsch says, significance 'cannot be distinguished from mere subjective reaction.' The distinction concedes that readers differ, which rules out uniform significance, and it ranks meaning as the foundation, not significance; expertise is never his criterion."
    },
    {
      q:"Fish's claim that authorial intention is 'itself a product of interpretive assumptions' is most directly a response to which aspect of Hirsch's position?",
      choices:[
        "Hirsch's claim that texts cannot have any meaning apart from their authors",
        "Hirsch's treatment of authorial intention as the foundation of valid interpretation",
        "Hirsch's distinction between a text's stable meaning and its variable significance",
        "Hirsch's claim that literary criticism is a discipline rather than personal response"
      ],
      ans:1,
      exp:"The passage sets the two views side by side: 'Where Hirsch sees authorial intention as the bedrock of valid interpretation, Fish sees it as itself a product of interpretive assumptions.' Fish attacks the foundation itself: if intention is shaped by community conventions, it cannot serve as a neutral anchor. The meaning/significance distinction and the disciplinary claim depend on that foundation but are not what Fish's claim targets."
    },
    {
      q:"The passage compares the constitutional interpretation debate to the literary debate. Which mapping does the passage state?",
      choices:[
        "Hirsch corresponds to original intent; Fish corresponds to evolving contemporary standards",
        "Barthes corresponds to original intent; Fish corresponds to evolving contemporary standards",
        "Hirsch corresponds to evolving standards, since he allows a text's significance to vary",
        "Neither corresponds, since the author treats law and literature as wholly unrelated fields"
      ],
      ans:0,
      exp:"The final paragraph labels original intent 'Hirsch's analog' and evolving contemporary standards 'Fish's analog.' Barthes, who rejects authorial intention, would be the opposite of originalism; Hirsch subordinates variable significance to stable meaning; and the author explicitly says 'the practical consequences extend beyond literary theory' into law."
    },
    {
      q:"The author contrasts Wimsatt and Beardsley with Barthes primarily to show that:",
      choices:[
        "Barthes borrowed his account of the reader directly from the two American critics",
        "Rejecting authorial intention can serve opposite aims: textual rigor or interpretive freedom",
        "Biographical criticism was abandoned by all critics once the intentional fallacy was named",
        "Wimsatt and Beardsley agreed with Hirsch that the author's intention fixes the meaning of a text"
      ],
      ans:1,
      exp:"Both rejected judging a work by its author's intentions, but Wimsatt and Beardsley wanted the text to be 'a stable, public object of analysis' while Barthes wanted to 'dissolve that stability,' so the two attacks 'pointed in opposite directions.' Naming the intentional fallacy is the opposite of Hirsch's view, and the passage claims neither borrowing nor a universal abandonment of biographical criticism."
    },
    {
      q:"A critic argues that a nineteenth-century novel now 'means' something new because today's readers see in it a warning about climate change. Hirsch would most likely say the critic has:",
      choices:[
        "Shown that the novel's meaning was never really fixed by its author's intention",
        "Described a change in the novel's significance rather than a change in its meaning",
        "Uncovered the author's true but unconscious intention in writing the novel",
        "Confused the novel's value as literature with its value as a historical document"
      ],
      ans:1,
      exp:"For Hirsch, meaning is 'what the author meant, stable and reproducible,' while significance is 'what the text means to a particular reader at a particular time.' A new relevance for modern readers is a change in significance, which leaves the author's meaning untouched. Saying meaning was never fixed is Fish's or Barthes's position, and the critic makes no claim about unconscious intent or historical value."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 6: Social Science — Technology & Society
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_6',
  type:'passage',
  topic:'CARS',
  title:'Technological Determinism and the Social Construction of Technology',
  passage:`Few questions in the study of technology are more contested than whether technology shapes society or society shapes technology. Technological determinism holds that the development and deployment of technology follows an autonomous inner logic, independent of social interests, that then imposes its consequences on society. On the strongest version of this view, technologies are inherently value-laden — the automobile is not merely an instrument but a system that restructures space, family life, and politics in determinate ways regardless of who uses it or in what context.

Jacques Ellul's sweeping account of technique argued that modern industrial societies had become entirely subject to a self-propagating "technological system" that subordinated all values — political, aesthetic, spiritual — to the criterion of efficiency. Technique, in Ellul's account, is not a tool that society deploys but a force that colonizes all social domains, transforming ends into means in every sphere of life.

A more modest version of the claim appears in Langdon Winner's question of whether artifacts have politics. Winner pointed to the low overpasses on parkways built under Robert Moses on Long Island, which he argued were designed to keep out buses and, with them, the poorer residents who depended on public transit. Once poured in concrete, such a design goes on enforcing its effects long after the intentions behind it have been forgotten. For Winner, the point was not that technology escapes human choice, but that choices built into artifacts can outlast, and outweigh, the choices of later users.

The Social Construction of Technology (SCOT) school, associated with Bijker, Hughes, and Pinch, pushed back sharply. Technologies do not have fixed meanings or determinate effects, they argued; their meaning and use are negotiated among relevant social groups — engineers, users, regulators, and others — during the development process. The same technical artifact can have different meanings for different groups, and these interpretive differences influence how the technology is ultimately designed. The classic example is the bicycle: early designs were radically different for different social groups (sporting young men preferred the dangerous high-wheeled "ordinary"; women and older riders preferred safer designs), and the "safety bicycle" that became standard emerged from this social negotiation. SCOT scholars described the early period of a technology as one of "interpretive flexibility," when competing designs remain open, and the later period as one of "closure," when a single design stabilizes and the alternatives come to seem as though they had never been serious possibilities.

Critics soon noted a blind spot in this approach. By focusing on the relevant social groups who visibly took part in design controversies, SCOT could overlook those who had no voice in the process at all: people affected by a technology who were never consulted, and whose absence left no trace in the record of debate.

Contemporary science and technology studies has largely moved past the determinism-construction binary toward more nuanced accounts that trace how technical artifacts and social structures co-evolve — neither purely determined by technology nor purely constructed by social interests, but shaped by the ongoing interaction between material constraints and social choices.`,
  questions:[
    {
      q:"Ellul's account of 'technique' differs from the version of technological determinism in the first paragraph primarily because Ellul:",
      choices:[
        "Treats technology as value-neutral, whereas determinists regard it as value-laden",
        "Describes a total system subordinating all values to efficiency, not particular technologies",
        "Denies that technology has any significant effect on the way a society is organized",
        "Includes communication and culture, whereas determinism covers only industrial machinery"
      ],
      ans:1,
      exp:"The first paragraph illustrates determinism with a particular technology, the automobile; Ellul describes a 'self-propagating technological system' that 'colonizes all social domains' and subordinates 'all values' to efficiency. Ellul's technique is the opposite of value-neutral and has sweeping effects on society, and the passage never limits determinism to industrial machinery."
    },
    {
      q:"The SCOT school's use of the bicycle example primarily serves to demonstrate that:",
      choices:[
        "Bicycles mattered more than automobiles as a technology in the late nineteenth century",
        "The design that became standard emerged from negotiation among groups with different needs",
        "Male engineers ignored the transportation needs of women when designing early bicycles",
        "Consumer preference alone ultimately determines which technology succeeds in a competitive market"
      ],
      ans:1,
      exp:"Different groups preferred different designs (the high-wheeled 'ordinary' versus safer designs), and 'the safety bicycle that became standard emerged from this social negotiation.' The example shows design shaped by social groups, not technical necessity. Women's preferences in fact shaped the outcome, and the groups include engineers and regulators as well as consumers."
    },
    {
      q:"The contemporary position described in the final paragraph rejects the 'determinism-construction binary.' What alternative does it propose?",
      choices:[
        "Technology is determined by economic forces, leaving no role for social values or meanings",
        "Every technology has fixed social effects once deployed, whatever the context of its use",
        "Artifacts and social structures co-evolve through material constraints and social choices",
        "Social construction is correct but should be studied by economists rather than sociologists"
      ],
      ans:2,
      exp:"Technology and society are 'neither purely determined by technology nor purely constructed by social interests, but shaped by the ongoing interaction between material constraints and social choices.' Fixed effects regardless of context is the determinist pole being rejected, and the passage proposes neither economic determinism nor a change of discipline."
    },
    {
      q:"A technological determinist would most likely respond to the SCOT bicycle example by arguing that:",
      choices:[
        "The bicycle was too minor a technology to serve as a fair test of the theory",
        "Material facts, such as the high-wheeler's danger, made the safety bicycle's victory inevitable",
        "SCOT's research is methodologically flawed because it relies on individual case studies",
        "The safety bicycle design was culturally imposed on engineers by social pressure"
      ],
      ans:1,
      exp:"Determinism holds that technology follows 'an autonomous inner logic, independent of social interests.' The natural determinist reply grants that negotiation occurred but claims material facts fixed the outcome anyway. A design 'culturally imposed' by social pressure is SCOT's view, not the determinist's, and dismissing the bicycle or case studies would not engage the example."
    },
    {
      q:"The example of the Long Island parkway overpasses is used in the passage to suggest that:",
      choices:[
        "Technology develops according to an autonomous logic that is independent of human choice",
        "Choices built into an artifact can keep shaping social life after they are forgotten",
        "Public transit was a more important technology than the automobile in that period",
        "Designers' stated intentions are the only reliable guide to a technology's social effects"
      ],
      ans:1,
      exp:"Winner's point is that 'choices built into artifacts can outlast, and outweigh, the choices of later users,' since a design in concrete keeps 'enforcing its effects long after the intentions behind it have been forgotten.' The passage says explicitly that his point 'was not that technology escapes human choice,' and the overpasses show effects persisting beyond intentions, not intentions as the guide."
    },
    {
      q:"Which of the following would the critics of SCOT described in the passage most likely cite as an example of its blind spot?",
      choices:[
        "Engineers who disagreed among themselves about the best design for a new dam",
        "Residents displaced by a new dam whose views were never sought during its design",
        "Regulators who imposed safety standards that changed the final design of a dam",
        "Users whose complaints led a manufacturer to alter the design of its product"
      ],
      ans:1,
      exp:"The critics say SCOT could overlook 'people affected by a technology who were never consulted, and whose absence left no trace in the record of debate.' Displaced residents who were never asked fit exactly. Engineers, regulators and complaining users all took visible part in design, so they are the 'relevant social groups' SCOT already studies."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 7: Philosophy — Personal Identity
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_7',
  type:'passage',
  topic:'CARS',
  title:'Personal Identity, Continuity, and the Ethics of Future Selves',
  passage:`What makes a person at one time the same person at a later time? The question seems trivial until one examines it carefully. The cells of the body are largely replaced within a decade; memories are reconstructed rather than reproduced; personality changes with age and experience. The psychological and biological materials of the self at age seventy are largely different from those at age twenty. What continuity, if any, persists?

John Locke's answer focused on memory: personal identity consists in the continuity of consciousness, specifically the capacity to extend one's consciousness backward to earlier experiences through memory. One is the same person as the child one can remember being. Derek Parfit, updating and radicalizing Locke, argued that personal identity consists in psychological continuity more broadly — chains of overlapping connections of memory, intention, belief, and desire — without requiring strict numerical identity of a persistent self. On Parfit's view, personal identity is not all-or-nothing; it admits of degrees.

This has radical implications. If personal identity admits of degrees and depends on psychological continuity that diminishes over time, the relationship between my current self and my self in forty years may be more like the relationship between me and my cousin than between me and my self of last week. Parfit concluded that personal identity is "not what matters" — what matters for rational self-interest and ethical concern is the preservation of psychological continuity and connectedness, not the persistence of some further metaphysical entity called the self.

Parfit's strongest support came from a thought experiment about division. Suppose each half of my brain were transplanted into a different body, and each resulting person had my memories, character, and intentions. Both cannot be me, since they are two people; yet it seems arbitrary to say that I am one rather than the other, and strange to say that I have simply died, since my relation to each is as close as my ordinary relation to myself tomorrow. Parfit concluded that identity and what matters can come apart: I would have everything worth caring about in survival, even though no one afterward would be strictly me.

The implications for ethics are significant. If my future self is psychologically discontinuous with my present self — as may be the case for a person who undergoes radical personality change, perhaps through religious conversion or severe illness — it is not obvious that I have the same strong prudential reason to make sacrifices for that future self as I do for my more connected near-future self. Some philosophers have argued that this has implications for how we think about retirement savings, long-term health commitments, and the obligations of former selves to the people their choices affected.

Parfit himself found the view consoling rather than troubling. Once he ceased to believe that some deep further fact was at stake in his own persistence, he wrote, he cared less about his own death and more about the lives of others. Critics reply that this equanimity comes at a high price, since the view seems to dissolve the special concern each of us has for our own future, the very concern on which prudence depends.`,
  questions:[
    {
      q:"Parfit's view differs from Locke's account of personal identity primarily in that:",
      choices:[
        "Parfit rejects memory as irrelevant to identity, whereas Locke treats memory as essential",
        "Parfit widens memory to psychological continuity generally and lets identity come in degrees",
        "Locke considers identity irrelevant to ethics, whereas Parfit applies it to ethical questions",
        "Parfit restricts identity to biological continuity, whereas Locke focuses on psychology"
      ],
      ans:1,
      exp:"Parfit, 'updating and radicalizing Locke,' extends Locke's memory criterion to 'chains of overlapping connections of memory, intention, belief, and desire' and holds that identity 'is not all-or-nothing; it admits of degrees.' Memory remains one of Parfit's connections, his view is psychological rather than biological, and the passage says nothing about Locke's views on ethics."
    },
    {
      q:"Parfit's conclusion that personal identity is 'not what matters' most directly means:",
      choices:[
        "Personal identity does not exist at all and is merely a philosophical illusion",
        "What matters for concern is psychological continuity, not the persistence of a further self",
        "Future selves have no moral standing and should be given no weight in present decisions",
        "Personal identity bears on legal questions but has no bearing on moral ones"
      ],
      ans:1,
      exp:"Parfit holds that 'what matters for rational self-interest and ethical concern is the preservation of psychological continuity and connectedness, not the persistence of some further metaphysical entity called the self.' He redescribes identity in terms of degrees rather than denying it exists, and the passage discusses how much concern future selves deserve, not whether they deserve none. Law is never raised."
    },
    {
      q:"The passage questions whether 'I have the same strong prudential reason to make sacrifices for that future self' when that self is psychologically discontinuous with me. In this context, 'prudential reason' most nearly means:",
      choices:[
        "A legal obligation to plan responsibly for one's own future",
        "A self-interested reason grounded in concern for one's own future good",
        "A moral duty owed to other people who depend on one's choices",
        "Practical skill in planning for retirement and other long-term goals"
      ],
      ans:1,
      exp:"The passage contrasts the reason I have to sacrifice for a distant, psychologically discontinuous future self with the reason I have for my 'more connected near-future self.' Both are reasons grounded in concern for one's own future good, so 'prudential' means self-interested. Legal obligation and duties to others are different kinds of reasons, and retirement planning is only one example the passage gives of where the question applies."
    },
    {
      q:"Which of the following would most challenge Parfit's view that identity admits of degrees?",
      choices:[
        "Personality traits are more stable over a lifetime than Parfit's view seems to assume",
        "There is a further fact about identity, beyond psychological continuity, that is all-or-nothing",
        "Most people fail to save enough money during their working years to fund their retirement",
        "Religious conversion often produces major and lasting changes in a person's personality"
      ],
      ans:1,
      exp:"Parfit's view rests on identity consisting in psychological continuity without any 'further metaphysical entity.' An argument that such a further, all-or-nothing fact exists attacks that foundation. More stable personalities would mean greater continuity but leave the framework intact, saving behavior is irrelevant, and personality change through conversion is an example the passage itself uses."
    },
    {
      q:"The thought experiment in which each half of a brain is transplanted into a different body is presented as support for which claim?",
      choices:[
        "Personal identity consists in the continuity of a single physical brain",
        "What matters in survival can be present even when strict identity is absent",
        "A person who undergoes division simply dies and is replaced by two strangers",
        "Memory alone, without character or intention, is sufficient for personal identity"
      ],
      ans:1,
      exp:"Neither resulting person can strictly be me, yet my relation to each is 'as close as my ordinary relation to myself tomorrow,' so 'identity and what matters can come apart.' The case splits a single brain, so it cannot show that identity is continuity of one brain; the passage calls simple death a 'strange' description of the case, and the transplanted persons inherit character and intentions as well as memories."
    },
    {
      q:"The critics mentioned in the final paragraph would most likely object that Parfit's view:",
      choices:[
        "Places too much weight on the biological continuity of the human body",
        "Undermines the special concern for one's own future on which prudence rests",
        "Makes people care more about their own deaths than about the lives of others",
        "Relies on a memory criterion that Locke had already shown to be inadequate"
      ],
      ans:1,
      exp:"The critics say Parfit's equanimity comes 'at a high price, since the view seems to dissolve the special concern each of us has for our own future, the very concern on which prudence depends.' Parfit's view is psychological rather than biological, he reported caring less about his own death, not more, and the passage nowhere says Locke rejected the memory criterion."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 8: Concrete — Music Criticism & Cultural Value
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_8',
  type:'passage',
  topic:'CARS',
  title:'The High-Low Culture Divide and the Sociology of Aesthetic Judgment',
  passage:`The distinction between high culture and popular culture has organized Western cultural life for centuries, but its conceptual foundations have been under sustained challenge for the past half-century. The traditional view — inherited from nineteenth-century aestheticism and elaborated by figures like Matthew Arnold — held that 'culture' in its fullest sense consisted of the best that had been thought and said, represented by the canonical works of Western art, music, and literature. Popular entertainment, on this view, served different and lesser functions: pleasure and distraction, not cultivation and edification.

Pierre Bourdieu's sociology of taste challenged this hierarchy not by reversing it but by explaining it. Aesthetic preferences, Bourdieu argued, are not the product of pure sensibility responding to objective aesthetic values; they are learned dispositions that reflect social class and its associated forms of capital. The cultivation that enables one to enjoy Baroque counterpoint or to read Henry James with pleasure is the product of specific educational and familial experiences that track socioeconomic privilege. 'Good taste' functions primarily as a mechanism of social distinction — a way of marking and reproducing class boundaries — rather than as a response to genuine aesthetic superiority. In Distinction, drawing on extensive surveys of French households, Bourdieu found that preferences in music, painting, food, and furnishings mapped closely onto education and occupation, and that those richest in cultural capital favored works demanding detachment and attention to form over works offering immediate pleasure.

Later research complicated this picture without overturning it. Studies by the sociologist Richard Peterson suggested that high-status Americans in the late twentieth century had become cultural "omnivores," consuming opera and country music alike, while lower-status groups tended to have narrower tastes. Distinction, on this account, had shifted from what one consumes to the breadth and manner of one's consumption, a change that, if anything, extends Bourdieu's point that taste serves to mark social boundaries.

Bourdieu's argument raises the question of whether all aesthetic evaluations are reducible to social positioning. Critics of Bourdieu point out that his account does not explain why certain works have commanded sustained appreciation across radically different social positions and historical periods, or why aesthetic judgments have a normative force that mere expressions of preference lack. If I say that a film is simply bad, I am making a different kind of claim than if I say that I dislike it — the former invites a response, the latter is merely a report. Kant made a related observation more than two centuries ago: a judgment of beauty, he argued, speaks as if with a universal voice, demanding the agreement of others in a way that a report of mere liking does not.

The most sophisticated contemporary position in aesthetics probably lies between naive realism (aesthetic values are objective properties of works independent of any perceiver) and pure relativism (aesthetic judgments merely report subjective preferences). Aesthetic value may be real and criticism may be genuinely truth-apt while remaining responsive to social and historical context — not arbitrary, but not independent of perceiving subjects either. On such a view, the critic who calls a film bad can be mistaken, but her judgment answers to the experience of other attentive viewers rather than to a fact that exists apart from all of them.`,
  questions:[
    {
      q:"Bourdieu, according to the passage, challenged the high-low culture hierarchy 'not by reversing it but by explaining it.' This means that he:",
      choices:[
        "Argued that popular culture is in fact aesthetically superior to high culture",
        "Accounted for the hierarchy as a social mechanism rather than ranking either side higher",
        "Defended the distinction as reflecting genuine differences in aesthetic quality",
        "Held that high culture is better because it demands more sophisticated appreciation"
      ],
      ans:1,
      exp:"Bourdieu treats 'good taste' as 'a mechanism of social distinction' rather than 'a response to genuine aesthetic superiority.' He explains why the hierarchy exists instead of endorsing it or turning it upside down. Calling popular culture superior would be reversal, and the other two choices simply reaffirm the hierarchy he challenged."
    },
    {
      q:"The passage states that saying a film 'is simply bad' is a different kind of claim than saying 'I dislike it.' What distinction is being drawn?",
      choices:[
        "An honest statement of opinion versus an evasive refusal to commit to a view",
        "A claim suited to professional critics versus a claim suited to ordinary viewers",
        "A judgment that invites dispute versus a report of personal preference",
        "Two claims that mean the same thing but are phrased in different ways"
      ],
      ans:2,
      exp:"'The former invites a response, the latter is merely a report.' Calling a film bad makes a claim about the work that others can contest; reporting dislike describes only the speaker. The passage explicitly calls them different kinds of claims and says nothing about honesty or who is entitled to make them."
    },
    {
      q:"The position described in the final paragraph lies between 'naive realism' and 'pure relativism.' What combination does it propose?",
      choices:[
        "Aesthetic value is objective but can be known only by trained and experienced experts",
        "All aesthetic disagreements can be resolved once the parties share the same information",
        "Aesthetic judgments can be true or false yet remain responsive to social and historical context",
        "Works of popular culture are sometimes the aesthetic equals of works of high culture"
      ],
      ans:2,
      exp:"'Aesthetic value may be real and criticism may be genuinely truth-apt while remaining responsive to social and historical context — not arbitrary, but not independent of perceiving subjects either.' Objective value independent of perceivers is naive realism, which this view rejects, and the passage makes no claim about expert access, guaranteed agreement, or the relative standing of popular works."
    },
    {
      q:"Critics of Bourdieu point to works that have 'commanded sustained appreciation across radically different social positions and historical periods.' How does this observation challenge Bourdieu?",
      choices:[
        "It shows that aesthetic preferences are innate rather than socially learned",
        "If taste merely tracked class, such works would not be admired across classes and eras",
        "It shows that Bourdieu's sociology has been less influential than he himself had believed",
        "It shows that access to education is more evenly distributed than Bourdieu admits"
      ],
      ans:1,
      exp:"If appreciation were only a learned marker of class, it should vary with class position; admiration that persists across very different positions and periods is hard to explain that way. The critics need only show that taste is not merely social, not that it is innate. Bourdieu's influence and the distribution of education are beside the point."
    },
    {
      q:"According to the passage, the research on cultural 'omnivores' bears on Bourdieu's account by:",
      choices:[
        "Refuting his claim that taste is connected to social class and cultural capital",
        "Showing a new form of distinction that is consistent with his central claim",
        "Showing that high culture has lost all of its prestige among educated groups",
        "Proving that aesthetic preferences are innate rather than learned in the family"
      ],
      ans:1,
      exp:"The research 'complicated this picture without overturning it': status came to be marked by 'the breadth and manner of one's consumption,' which 'if anything, extends Bourdieu's point that taste serves to mark social boundaries.' Omnivores still consume opera, so high culture keeps its standing, and the research concerns learned status markers, not innate taste."
    },
    {
      q:"The author's reference to Kant serves mainly to:",
      choices:[
        "Show that Kant anticipated and endorsed Bourdieu's sociology of taste",
        "Lend support to the claim that aesthetic judgments carry a normative force",
        "Argue that judgments of beauty are merely reports of personal liking",
        "Establish that naive realism is the most defensible theory of aesthetic value"
      ],
      ans:1,
      exp:"Kant's view that a judgment of beauty 'speaks as if with a universal voice, demanding the agreement of others' reinforces the critics' point that aesthetic judgments have 'a normative force that mere expressions of preference lack.' Kant is cited against a purely sociological reduction, not for it; he contrasts beauty with 'mere liking'; and the author favors a middle position over naive realism."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 9: Natural Sciences for Non-Scientists
// (Evolutionary biology written for non-specialists)
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_9',
  type:'passage',
  topic:'CARS',
  title:'The Selfish Gene Metaphor and Its Discontents',
  passage:`Richard Dawkins's formulation of the "selfish gene" in 1976 transformed how many biologists and educated laypeople thought about evolution. The argument was conceptually elegant: natural selection operates primarily at the level of genes, not organisms or groups. From the gene's "perspective," organisms are temporary vehicles — survival machines built by genes to ensure their own replication. Altruism between related organisms is explained as "kin selection" — genes promote behaviors that favor copies of themselves in relatives, even at cost to the individual organism carrying them. A gene's apparent altruism toward its host is an illusion; its only "goal" is its own perpetuation. Dawkins insisted that the language of selfishness was a figure of speech: genes have no motives, and to call them selfish is only to say that those which promote their own replication become more common.

The metaphor of the "selfish gene" has been extraordinarily productive as a heuristic device, clarifying the logic of kin selection, reciprocal altruism, and the arms races between organisms and their parasites. But many biologists and philosophers of biology have argued that the metaphor is also misleading in important ways. Genes do not act individually; they act in the context of complex developmental and ecological systems in which the effects of any single gene depend on the other genes present, the organism's developmental history, and the environment. The genome is less like a collection of independent agents than like a regulatory network in which each element's contribution is defined by its relationships.

Eva Jablonka and Marion Lamb have pressed the point further, arguing that the "gene's eye view" neglects the inheritance systems that operate at the organismal and cultural levels — epigenetic inheritance (transmission of gene-expression patterns through cell division), behavioral inheritance (learned behaviors transmitted to offspring), and symbolic inheritance (cultural transmission). Natural selection can act on variation transmitted through any of these systems, not just genetic variation. On this view, evolution is a multi-level process that cannot be adequately described by any single-level account. Their examples range widely. In the toadflax plant, a heritable change in flower shape results from a change in how a gene is expressed rather than in its DNA sequence. In rats, the amount of grooming a mother gives her pups shapes their responses to stress, and the pups, once grown, tend to groom their own offspring in the same way.

Defenders of the gene's eye view reply that such phenomena, however interesting, are either too unstable to matter over evolutionary time or are themselves ultimately under genetic control. An expression pattern that persists for a few generations and then fades, they argue, cannot sustain the slow, cumulative change that builds complex adaptations; only the high fidelity of DNA copying can do that.

The debate has methodological as well as empirical dimensions. The selfish gene framework is a powerful analytical tool for generating hypotheses and explaining behavioral adaptations. The multi-level critics argue that its explanatory successes come at the cost of a reductionist distortion that systematically obscures the causal role of higher-level organization. Both camps are working with the same empirical record; their disagreement is partly about how to represent biological complexity.`,
  questions:[
    {
      q:"The author describes the 'selfish gene' metaphor as 'extraordinarily productive as a heuristic device' but also 'misleading in important ways.' This characterization most directly implies that:",
      choices:[
        "The selfish gene theory is false and should be abandoned by working biologists",
        "It is a useful tool for generating explanations even if not a literally accurate picture",
        "Dawkins's theory is entirely correct but has been poorly communicated to the public",
        "The framework is useful for explaining altruism but not for any other evolutionary phenomena"
      ],
      ans:1,
      exp:"A heuristic is valued for what it helps us discover and explain; the metaphor clarified kin selection, reciprocal altruism and parasite arms races, yet misleads because 'genes do not act individually.' The author credits its productivity, so it is not to be abandoned, treats the problem as conceptual rather than one of communication, and lists uses well beyond altruism."
    },
    {
      q:"Jablonka and Lamb's argument most directly challenges which assumption of the selfish gene framework?",
      choices:[
        "That kin selection is a valid mechanism for explaining altruism among related organisms",
        "That organisms rather than genes are the primary units on which selection operates",
        "That genetic variation is the only heritable variation on which selection can act",
        "That natural selection works through the differential survival and reproduction of variants"
      ],
      ans:2,
      exp:"They argue that 'natural selection can act on variation transmitted through any of these systems' (epigenetic, behavioral and symbolic), 'not just genetic variation.' They do not dispute kin selection or the basic mechanism of selection, and the view that organisms are the primary unit is not something the gene-centered framework assumes."
    },
    {
      q:"The debate described in the final paragraph is characterized as having 'methodological as well as empirical dimensions.' This means that:",
      choices:[
        "One camp relies on quantitative methods and the other on qualitative interpretation",
        "Both sides share the evidence but disagree over how to represent biological complexity",
        "Empirical questions belong to genetics, whereas methodological ones belong to philosophy",
        "One camp conducts field research while the other conducts experiments in laboratories"
      ],
      ans:1,
      exp:"'Both camps are working with the same empirical record; their disagreement is partly about how to represent biological complexity,' that is, about which framework best captures causation. The passage does not divide the camps by research technique or setting, and it assigns both dimensions to the biological debate rather than splitting them between disciplines."
    },
    {
      q:"The passage describes organisms as 'survival machines built by genes.' A critic argues that this metaphor implies the organism has no independent causal role in evolution. How would the multi-level critics respond to this implication?",
      choices:[
        "By arguing that organisms do not have phenotypes in the traditional sense",
        "By arguing that higher-level organization, such as development, has its own causal role",
        "By accepting the survival machine metaphor but adding that machines can also be creative",
        "By arguing that genes are causally inert and that only organisms have real causal powers"
      ],
      ans:1,
      exp:"The critics say the gene-centered view 'systematically obscures the causal role of higher-level organization,' including development, learned behavior and culture. They give that organization a causal role of its own while still treating genes as causes, so calling genes inert overcorrects. Denying phenotypes or keeping the machine metaphor does not address the implication."
    },
    {
      q:"The defenders of the gene's eye view described in the passage would most likely dismiss the rat grooming example on the grounds that:",
      choices:[
        "Rats are not a suitable species from which to draw conclusions about evolution",
        "Such non-genetic transmission is too short-lived to build complex adaptations",
        "Maternal grooming has no measurable effect on the stress responses of offspring",
        "Behavioral inheritance outweighs genetic inheritance over long periods of time"
      ],
      ans:1,
      exp:"The defenders hold that such phenomena are 'too unstable to matter over evolutionary time,' since a pattern that 'persists for a few generations and then fades' cannot sustain 'the slow, cumulative change that builds complex adaptations.' They grant the phenomena are real ('however interesting'), say nothing against rats as subjects, and would deny, not assert, that behavioral inheritance outweighs genetic inheritance."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 10: Political Philosophy — Justice & Reparations
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_10',
  type:'passage',
  topic:'CARS',
  title:'Reparative Justice, Historical Injustice, and the Problem of Non-Identity',
  passage:`The moral case for reparations for historical injustice faces a philosophical puzzle that has received little attention in public debates: the non-identity problem as it applies to historical wrongs. When the descendants of enslaved people demand reparations, they are not claiming that they personally were enslaved — they were not. They are claiming that they are worse off as a result of the historical injustice than they would otherwise have been. But if the injustice had not occurred — if the slave trade had never happened — the very people now making the claim would not exist. Their ancestors would have had different lives, met different partners, and produced different descendants.

This is a philosophically significant but politically dangerous point. Some have used it to argue that historical injustice can never ground reparative claims because the claimants would not exist but for the injustice: their existence depends on the very chain of events that they claim wronged them. If they were not wronged — if their counterfactual alternative is non-existence — it is unclear in what sense they are victims.

Jeremy Waldron, engaging with this argument, contends that it proves too much. The same logic would immunize any historical injustice from reparative claims, regardless of how recent or how severe. Moreover, Waldron argues, the wrong that grounds reparative claims is not primarily a wrong to the current claimants but a wrong to the original victims — the enslaved people themselves — whose claims survive, in a morally significant sense, through their descendants and communities. The demand for reparations is the community's demand for rectification of a wrong done to its past members, not solely a claim based on current disadvantage.

Contemporary reparations advocates have largely moved away from backward-looking rectificatory arguments and toward forward-looking distributive justice arguments: reparations are justified not primarily because of what was done to ancestors but because of the ongoing structural disadvantages — in wealth, housing, education, and political power — that are causally traceable to historical injustice. On this view, reparations address present inequalities, and the historical argument provides the causal story that distinguishes these inequalities from inequalities due to other causes.`,
  questions:[
    {
      q:"The non-identity problem as applied to reparations claims is that:",
      choices:[
        "Descendants cannot prove a direct genealogical link to particular enslaved individuals",
        "Without the injustice the claimants would not exist, so their being harmed is unclear",
        "Historical injustices are too remote in time to support legal claims in the present",
        "The responsible institutions have changed so much that no current party can be held liable"
      ],
      ans:1,
      exp:"If the injustice had not occurred, 'the very people now making the claim would not exist,' so their alternative is non-existence and 'it is unclear in what sense they are victims.' The problem concerns identity and counterfactual comparison, not proof of descent, the passage of time, or which institutions bear liability."
    },
    {
      q:"Waldron's response that the non-identity argument 'proves too much' means:",
      choices:[
        "The argument contains an internal logical contradiction that invalidates it",
        "Accepting it would bar reparative claims for every injustice, however recent or severe",
        "Waldron has more arguments for reparations than the argument's proponents are willing to acknowledge",
        "The non-identity problem applies to too many cases to be practically relevant"
      ],
      ans:1,
      exp:"Waldron says 'the same logic would immunize any historical injustice from reparative claims, regardless of how recent or how severe,' a conclusion implausible enough to cast doubt on the argument. That is an objection from unacceptable consequences, not a charge of internal contradiction, and it does not say the problem is too widespread to matter."
    },
    {
      q:"The forward-looking argument for reparations described in the final paragraph differs from Waldron's backward-looking approach primarily in that it:",
      choices:[
        "Requires no historical evidence that an injustice occurred in the first place",
        "Grounds reparations in present inequalities that history explains, not in past wrongs",
        "Is more likely than Waldron's approach to succeed in American courts of law",
        "Focuses on communities, whereas Waldron's approach focuses on individual victims"
      ],
      ans:1,
      exp:"Forward-looking arguments justify reparations by 'ongoing structural disadvantages' that are 'causally traceable to historical injustice,' with history supplying 'the causal story.' Waldron instead grounds the claim in the wrong done to the original victims. History is still needed as causal evidence, courts are never mentioned, and it is Waldron who stresses the community's claim."
    },
    {
      q:"The author describes the non-identity argument against reparations as 'philosophically significant but politically dangerous.' In context, 'politically dangerous' refers to the fact that:",
      choices:[
        "It could incite political violence if it were stated openly in public forums",
        "It can be used to argue that historical injustice can never ground reparative claims",
        "Politicians who raise it publicly risk serious consequences at the next election",
        "It is too complex for public debate and should be confined to academic journals"
      ],
      ans:1,
      exp:"The next sentence explains the danger: 'Some have used it to argue that historical injustice can never ground reparative claims.' The concern is how the argument is deployed against reparations, not violence, electoral risk, or its complexity."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 11: Concrete — Music & Identity
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_11',
  type:'passage',
  topic:'CARS',
  title:'Jazz, Improvisation, and the Epistemology of Embodied Knowledge',
  passage:`The experienced jazz musician knows something that is difficult to articulate but unmistakable in performance. When a seasoned pianist responds to a chord change with a phrase that fits — harmonically appropriate, rhythmically surprising, emotionally continuous with what preceded it — they are drawing on a form of knowledge that differs in important ways from the propositional knowledge expressible in music theory. The musician knows which notes "fit" not because they can articulate the rules but because their hands know where to go.

Michael Polanyi called this dimension of knowledge "tacit knowledge" — the kind we demonstrate rather than state, the knowing-how that underlies and exceeds knowing-that. A physician recognizes the face of someone in pain without consulting a checklist; a master potter shapes clay through a feedback loop between hands and material that no instruction manual captures. Polanyi's observation — "we can know more than we can tell" — captures the asymmetry between performance and verbalization.

The philosophical tradition has often been uncomfortable with tacit knowledge. Plato's Meno poses the challenge of learning: if you already know something, you do not need to learn it; if you do not know it, you cannot recognize the answer when you find it. The resolution has typically been to privilege explicit, propositional knowledge — what can be stated in the form of principles — as the genuine form of knowledge, with practical skill relegated to a lesser cognitive category. The analogy in education has been the tendency to privilege theory over practice and textbook knowledge over clinical experience.

Feminist and pragmatist philosophers of knowledge have argued that this hierarchy is not epistemically justified but reflects social biases that devalue forms of knowledge associated with manual work, women, and non-Western traditions. They argue for a "symmetrical" epistemology that gives equal standing to propositional and embodied knowledge, recognizes the labor involved in developing tacit expertise, and does not treat skill as merely the application of theory.`,
  questions:[
    {
      q:"Polanyi's phrase 'we can know more than we can tell' is most precisely illustrated by which example?",
      choices:[
        "A student who can explain the rules of music theory but cannot play any instrument at all",
        "A pianist who plays fitting phrases without being able to state the rules behind them",
        "A music teacher who can both play a passage and explain exactly what she is doing",
        "A composer who sets out the rules of harmony in a widely used theory textbook"
      ],
      ans:1,
      exp:"The phrase names an asymmetry in which performance exceeds verbalization, like the musician who knows which notes fit 'not because they can articulate the rules but because their hands know where to go.' The theory student shows the reverse gap, the teacher shows no gap at all, and the textbook author displays only statable knowledge."
    },
    {
      q:"The author describes the philosophical tradition as 'uncomfortable with tacit knowledge.' What reason does the passage give for this discomfort?",
      choices:[
        "Tacit knowledge is harder than explicit knowledge to teach in university courses",
        "Responses to the Meno's puzzle treated statable knowledge as the genuine kind",
        "Tacit knowledge leads practitioners into more errors than explicit rules do",
        "Explicit knowledge is more reliable because it can be verified by others"
      ],
      ans:1,
      exp:"The passage traces the discomfort to Plato's Meno: the resolution of its puzzle about learning 'has typically been to privilege explicit, propositional knowledge,' leaving practical skill in 'a lesser cognitive category.' The preference for theory in education is presented as an analogy, not the cause, and error rates and verifiability are never mentioned."
    },
    {
      q:"Feminist and pragmatist philosophers argue that the hierarchy of propositional over tacit knowledge 'reflects social biases.' What biases does the passage identify?",
      choices:[
        "A preference among academic philosophers for written over oral forms of communication",
        "A bias in favor of mathematical knowledge over verbal or literary forms of knowledge",
        "Devaluing knowledge tied to manual work, women, and non-Western traditions",
        "The dismissal of practical expertise by philosophers trained at elite universities"
      ],
      ans:2,
      exp:"The passage says the hierarchy reflects 'social biases that devalue forms of knowledge associated with manual work, women, and non-Western traditions.' Writing versus speech, mathematics versus language, and elite training are not the biases named."
    },
    {
      q:"A defender of the traditional hierarchy argues: 'A physician's clinical intuition is really implicit pattern-matching based on propositional rules learned in training.' How would the symmetrical epistemology view respond?",
      choices:[
        "By arguing that propositional knowledge plays no role at all in clinical expertise",
        "By arguing that skilled performance is a distinct achievement, not an implicit use of rules",
        "By accepting the reduction but insisting that tacit knowledge deserves more social recognition",
        "By arguing that clinical intuition is faster than explicit reasoning but less accurate"
      ],
      ans:1,
      exp:"Symmetrical epistemology 'does not treat skill as merely the application of theory' and gives embodied knowledge 'equal standing.' The potter's feedback loop, which 'no instruction manual captures,' illustrates skill that rules cannot replace. The view grants propositional knowledge equal standing rather than denying it a role, rejects the reduction instead of accepting it, and makes no claim about speed or accuracy."
    }
  ]
},

// ══════════════════════════════════════════════════════════════
// EXAM 2 CARS PASSAGE 12: Social Science — Narrative & Identity
// ══════════════════════════════════════════════════════════════
{
  id:'p_e2cars_12',
  type:'passage',
  topic:'CARS',
  title:'Narrative Identity and the Stories We Tell About Ourselves',
  passage:`The philosopher Paul Ricoeur proposed that human identity is fundamentally narrative — we understand who we are through the stories we construct about our lives. This is not merely a metaphor: the temporal structure of narrative (beginning, middle, end; character, action, consequence) maps onto the temporal structure of human experience in ways that make narrative the primary medium for self-understanding. We do not simply have experiences; we retrospectively organize them into stories that give them meaning, connect them to our values and goals, and integrate them into an ongoing account of who we are.

This narrative self-understanding is never purely individual. The stories we tell about ourselves are always told within traditions of narrative — cultural templates for what kinds of stories are tellable, what counts as a meaningful life, what kinds of character arcs are available. A life narrative is always, as Ricoeur put it, "ensnared in stories of others." The immigrant success narrative, the redemption arc, the tragic hero — these cultural story forms provide the resources and the constraints within which individual lives are narrated.

The clinical implications of narrative identity are significant. Illness disrupts narrative continuity — it introduces a rupture between the past life story and a future that is suddenly uncertain. Frank's typology of illness narratives describes three dominant forms: the restitution narrative (illness as temporary disruption that will be overcome, the expected narrative in optimistic medical culture); the chaos narrative (overwhelming illness that cannot be integrated into meaning); and the quest narrative (illness as transformative journey that produces new wisdom). The quest narrative is associated with better adjustment outcomes but may impose an unrealistic cultural expectation on those who cannot find redemption in their illness.

The limits of narrative identity theory are acknowledged even by its defenders. Not all human experience is easily narrativized — trauma may resist narrative integration; intense sensory experience has a present-tense immediacy that defies retrospective organization. And the therapeutic imperative to narrate can itself become coercive when patients are expected to produce coherent illness stories on a timeline set by medical culture rather than their own recovery.`,
  questions:[
    {
      q:"Ricoeur's claim that identity is 'fundamentally narrative' most precisely means:",
      choices:[
        "People invent fictional stories about themselves that have no basis in their actual daily lives",
        "Narrative is the main form through which people make their experience over time meaningful",
        "Written autobiography is the most authentic and reliable form of self-knowledge",
        "Identity is fixed by the cultural stories one has heard rather than by lived experience"
      ],
      ans:1,
      exp:"Narrative's temporal structure makes it 'the primary medium for self-understanding': 'we retrospectively organize' experiences 'into stories that give them meaning.' The stories organize real experience rather than inventing it, nothing privileges written autobiography, and cultural templates shape how lives are told without replacing the lived experience being told."
    },
    {
      q:"The claim that life narratives are 'always told within traditions of narrative' most directly implies that:",
      choices:[
        "Individual life stories are merely fictional imitations of a few cultural archetypes",
        "People in different cultures experience the passage of time in fundamentally different ways",
        "Cultural story forms both make self-narration possible and limit the forms it can take",
        "Narrative identity is possible only in cultures that have written literary traditions"
      ],
      ans:2,
      exp:"Cultural story forms 'provide the resources and the constraints within which individual lives are narrated': they enable and limit at once. The passage does not reduce personal stories to imitation, claim that cultures experience time differently, or tie narrative identity to written literature."
    },
    {
      q:"The passage states that the quest narrative 'may impose an unrealistic cultural expectation on those who cannot find redemption in their illness.' What tension does this observation identify?",
      choices:[
        "Medical culture values the quest narrative because it reduces the costs of treatment",
        "The quest narrative may aid adjustment, yet demanding it of every patient can burden them",
        "The quest narrative is empirically less effective than the restitution narrative for most patients",
        "Most patients prefer the restitution narrative because it holds out a hope of full recovery"
      ],
      ans:1,
      exp:"The quest narrative 'is associated with better adjustment outcomes' but may become an unrealistic expectation, echoing the final paragraph's warning that 'the therapeutic imperative to narrate can itself become coercive.' The passage says the quest form is linked to better adjustment, not worse, and it mentions neither treatment costs nor patients' preferences among the narrative types."
    },
    {
      q:"The final paragraph acknowledges that 'not all human experience is easily narrativized.' How does this acknowledgment relate to the passage's overall argument?",
      choices:[
        "It refutes Ricoeur's theory by showing that narrative identity is simply false",
        "It supports the claim that any illness narrative can be turned into a quest narrative",
        "It limits the theory's scope without abandoning its central claim",
        "It suggests cultural templates matter more than lived experience in forming identity"
      ],
      ans:2,
      exp:"The limits 'are acknowledged even by its defenders': trauma and present-tense sensory experience resist narrative, which marks where the theory applies without rejecting it. A concession by the theory's defenders is not a refutation, and resistance to narrative cuts against the idea that every illness can become a quest story."
    }
  ]
}

]; // end EXAM2_CARS_PASSAGES
