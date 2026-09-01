// src/data/roadmap/levels/L9_pandas.js
export const pandasDataLevel = {
  id: 'L9',
  title: 'Pandas & Data Processing',
  shortTitle: 'Pandas & Data',
  description: 'Data manipulation and analysis with Pandas.',
  domain: 'Foundation',
  color: 'amber',
  colorClass: 'bg-amber-500',
  textClass: 'text-amber-700',
  bgClass: 'bg-amber-50',
  borderClass: 'border-amber-200',
  subjects: [
    {
      id: 'pandas-core',
      title: 'Pandas Core',
      description: 'DataFrames, Series, and data operations',
      topics: [
        {
          id: 'pandas-dataframes',
          title: 'DataFrames & Series',
          description: 'Core Pandas data structures and operations',
          priority: 'core',
          tags: ['pandas', 'data', 'python'],
          estimatedHours: 10,
          whatToLearn: [
            { id: 'c1', title: 'Creating DataFrames from CSV, JSON, dict' },
            { id: 'c2', title: 'Indexing: loc vs iloc' },
            { id: 'c3', title: 'Boolean filtering and masking' },
            { id: 'c4', title: 'GroupBy and aggregation' },
            { id: 'c5', title: 'Merge, join, concat' },
            { id: 'c6', title: 'Handling missing values' },
            { id: 'c7', title: 'apply() and vectorized operations' },
          ],
          practice: [
            { id: 'p1', title: 'Data cleaning pipeline', description: 'Clean a messy CSV dataset with Pandas', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is the difference between loc and iloc?', difficulty: 'easy' },
            { id: 'iq2', question: 'How do you handle missing values in Pandas?', difficulty: 'easy' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
