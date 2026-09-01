// src/data/templates/languageLearning.js
export const languageLearningTemplate = {
  id: 'template-language-learning',
  name: 'Spanish Language Mastery (CEFR A1 to B2)',
  description: 'Structured path to conversational fluency in Spanish: core vocabulary, grammar rules, listening comprehension, and speaking practice.',
  goal: 'Conversational Fluency',
  category: 'Language',
  difficulty: 'Beginner to Intermediate',
  trackingModel: 'custom',
  skillDimensions: [
    { id: 'vocabulary', name: 'Vocabulary & Idioms', maxScore: 5 },
    { id: 'grammar', name: 'Grammar & Syntax', maxScore: 5 },
    { id: 'speaking', name: 'Speaking & Pronunciation', maxScore: 5 },
    { id: 'listening', name: 'Listening Comprehension', maxScore: 5 },
    { id: 'writing', name: 'Writing & Reading', maxScore: 5 },
  ],
  enableAIDependency: false,
  levels: [
    {
      id: 'A1',
      title: 'A1 — Beginner Spanish Foundations',
      description: 'Greetings, personal introductions, present tense verbs (Ser/Estar, regular verbs), and numbers.',
      order: 0,
      color: 'yellow',
      subjects: [
        {
          id: 'LANG-A1-S1',
          title: 'Essential Grammar & Conversation',
          order: 1,
          topics: [
            {
              id: 'LANG-T1',
              title: 'Ser vs. Estar & Present Tense',
              description: 'Understanding permanent characteristics (Ser) vs temporary states/locations (Estar).',
              priority: 'core',
              tags: ['grammar', 'verbs'],
              learningItems: [
                { id: 'l-1', title: 'Conjugate Ser in all singular and plural forms' },
                { id: 'l-2', title: 'Conjugate Estar and use for locations and emotions' },
                { id: 'l-3', title: 'Practice 20 sample sentences distinguishing DOCTOR vs PLACE acronyms' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'A2',
      title: 'A2 — Elementary Spanish & Past Tenses',
      description: 'Preterite vs Imperfect past tenses, object pronouns, and daily routine descriptions.',
      order: 1,
      color: 'orange',
      subjects: [
        {
          id: 'LANG-A2-S1',
          title: 'Past Tenses',
          order: 1,
          topics: [
            { id: 'LANG-T2', title: 'Pretérito Indefinido vs Imperfecto', description: 'Narrating completed past actions vs ongoing background descriptions.', priority: 'core', tags: ['grammar', 'past-tense'] },
          ],
        },
      ],
    },
  ],
  projects: [],
};
