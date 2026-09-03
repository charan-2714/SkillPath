// src/data/learningPacks/verbalAbility.js
// Canonical Learning Pack: Verbal Ability & English Communication

export const verbalAbilityPack = {
  id: 'pack-verbal-ability',
  slug: 'verbal-ability',
  title: 'Verbal Ability & English',
  category: 'Placement Preparation',
  difficulty: 'Beginner to Intermediate',
  priority: 'High',
  estimatedHours: 30,
  version: '1.2',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Grammar rules, sentence correction, reading comprehension, vocabulary, para jumbles, error spotting, idioms, and verbal reasoning tested in campus placement English rounds.',
  targetUsers: 'Students preparing for campus recruitment verbal screening and English proficiency tests (TCS NQT, Infosys, Accenture, Cognizant, Wipro, AMCAT).',
  prerequisites: ['Basic English reading ability'],
  tags: ['verbal-ability', 'english', 'grammar', 'reading-comprehension', 'vocabulary', 'para-jumbles', 'placements'],
  relatedPacks: ['pack-quantitative-aptitude', 'pack-logical-reasoning', 'pack-interview-prep'],
  relatedTemplates: ['software-developer-placement'],
  careerRelevance: 'Mandatory section in campus selection tests and essential for professional business communication.',
  learningOutcomes: [
    'Spot grammatical errors in Subject-Verb Agreement, Tenses, Modifiers, and Prepositions instantly',
    'Reorder scrambled sentences (Para Jumbles) accurately using pronoun and connector linkage clues',
    'Extract tone, main ideas, and inferences from dense Reading Comprehension passages in < 4 minutes',
    'Expand professional vocabulary with root words, prefixes, synonyms, antonyms, and idioms',
  ],
  subjects: [
    {
      id: 'va-s1-grammar-error-spotting',
      title: 'Grammar Mastery & Error Detection',
      description: 'Subject-Verb Agreement, Tenses, Pronouns, Modifiers, Parallelism, Prepositions, and Articles.',
      order: 1,
      topics: [
        {
          id: 'va-t1-core-grammar-rules',
          title: 'The 15 Golden Rules of English Grammar',
          description: 'Subject-Verb Agreement, singular/plural collective nouns, misplaced modifiers, and parallel structure.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['grammar', 'subject-verb-agreement', 'error-spotting'],
          learningItems: [
            { id: 'va-li-1', title: 'Subject-Verb Agreement rules (singular subjects joined by "and", "either...or", "neither...nor", "as well as", "along with")', type: 'concept' },
            { id: 'va-li-2', title: 'Tenses and consistency: Past Perfect (had + V3) vs Simple Past in sequential past events', type: 'concept' },
            { id: 'va-li-3', title: 'Dangling & Misplaced Modifiers and how to restructure sentences correctly', type: 'implementation' },
            { id: 'va-li-4', title: 'Parallelism in lists and correlative conjunctions ("not only...but also", "both...and")', type: 'concept' },
            { id: 'va-li-5', title: 'Prepositions and Phrasal Verbs commonly confused in placement tests', type: 'implementation' },
          ],
          practice: [
            { id: 'va-pr-1', title: '30-Sentence Error Spotting Sprint', description: 'Identify grammatical error zones in 30 placement exam sentences.', difficulty: 'easy', type: 'quiz' },
          ],
          assessments: [
            { id: 'va-as-1', question: 'Find the error: "Each of the employees were awarded a certificate of appreciation by the manager."', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'va-s2-vocabulary-parajumbles',
      title: 'Vocabulary, Para Jumbles & Sentence Completion',
      description: 'Synonyms, Antonyms, Root words, Idioms, Sentence arrangement, and Cloze tests.',
      order: 2,
      topics: [
        {
          id: 'va-t2-vocabulary-idioms',
          title: 'High-Frequency Vocabulary, Roots & Idioms',
          description: 'Etymology, Greek/Latin roots, contextual word usage, tone recognition, and business idioms.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['vocabulary', 'root-words', 'idioms', 'synonyms'],
          learningItems: [
            { id: 'va-li-6', title: 'Root Word method for decoding unfamiliar words (e.g. "bene" = good, "mal" = bad, "chron" = time, "omni" = all)', type: 'concept' },
            { id: 'va-li-7', title: 'Top 200 high-frequency placement synonyms, antonyms, and homophones', type: 'concept' },
            { id: 'va-li-8', title: 'Common idioms and phrases used in corporate communications and interviews', type: 'implementation' },
          ],
          practice: [
            { id: 'va-pr-2', title: 'Vocabulary Flashcards & Cloze Test Drill', description: 'Fill contextual blanks with appropriate vocabulary in 10 passages.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'va-as-2', question: 'What is the closest antonym of the word "EPHEMERAL"? (A) Transient (B) Permanent (C) Fleeting (D) Elusive', difficulty: 'easy', type: 'quiz' },
          ],
        },
        {
          id: 'va-t3-parajumbles-cloze',
          title: 'Para Jumbles & Sentence Rearrangement',
          description: 'Chronological sequences, noun-pronoun pairings, transition connectors (however, therefore), and opening sentences.',
          priority: 'core',
          estimatedHours: 3,
          tags: ['parajumbles', 'sentence-rearrangement', 'cohesion'],
          learningItems: [
            { id: 'va-li-9', title: 'Identifying the mandatory opening independent sentence', type: 'concept' },
            { id: 'va-li-10', title: 'Mandatory Pairs strategy: Noun -> Pronoun reference, Full form -> Abbreviation, Cause -> Effect', type: 'concept' },
            { id: 'va-li-11', title: 'Transition signals: Contrast (However, But, Although) vs Addition (Furthermore, In addition) vs Conclusion (Therefore, Thus)', type: 'implementation' },
          ],
          practice: [
            { id: 'va-pr-3', title: 'Para Jumble Deciphering Challenge', description: 'Reorder 15 scrambled paragraph sets into coherent text.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'va-as-3', question: 'How do pronoun references (e.g., "This issue", "They") help identify which sentence cannot be the opening statement?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
    {
      id: 'va-s3-reading-comprehension',
      title: 'Reading Comprehension (RC)',
      description: 'Skimming, scanning, main idea identification, tone analysis, inference extraction, and speed reading.',
      order: 3,
      topics: [
        {
          id: 'va-t4-reading-comprehension',
          title: 'Reading Comprehension Strategies & Inferences',
          description: 'Active reading, identifying author\'s central thesis, distinguishing direct facts from inferences, and question-first scanning.',
          priority: 'core',
          estimatedHours: 4,
          tags: ['reading-comprehension', 'inferences', 'speed-reading'],
          learningItems: [
            { id: 'va-li-12', title: 'The Question-First Scanning Technique to save time on factual questions', type: 'concept' },
            { id: 'va-li-13', title: 'Author\'s Tone analysis (Objective, Critical, Sarcastic, Laudatory, Analytical, Cynical)', type: 'concept' },
            { id: 'va-li-14', title: 'Direct vs Inferential questions: finding unstated logical consequences grounded in the text', type: 'implementation' },
          ],
          practice: [
            { id: 'va-pr-4', title: 'Timed Reading Comprehension Drills', description: 'Complete 4 full-length technical/business passages with 20 questions under strict time limits.', difficulty: 'medium', type: 'quiz' },
          ],
          assessments: [
            { id: 'va-as-4', question: 'What is the key difference between a factual detail question and an inference question in Reading Comprehension?', difficulty: 'easy', type: 'quiz' },
          ],
        },
      ],
    },
  ],
};
