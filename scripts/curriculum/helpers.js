// scripts/curriculum/helpers.js
// Factory functions and helpers for generating the detailed AI/ML Engineer Master Curriculum

let itemIdCounter = 1;
let pracIdCounter = 1;
let dbgIdCounter = 1;
let assessIdCounter = 1;
let resIdCounter = 1;

export function resetCounters() {
  itemIdCounter = 1;
  pracIdCounter = 1;
  dbgIdCounter = 1;
  assessIdCounter = 1;
  resIdCounter = 1;
}

export function createTopic({
  id,
  order,
  title,
  description,
  priority = 'core',
  estimatedHours = 6,
  prerequisites = [],
  tags = [],
  learningObjectives = [],
  subtopics = [],
  learningItems = [],
  practice = [],
  debugging = [],
  assessments = [],
  resources = [],
}) {
  const items = learningItems.length > 0
    ? learningItems
    : subtopics.map((st, i) => ({
        id: `item-${itemIdCounter++}`,
        title: typeof st === 'string' ? st : st.title,
        type: typeof st === 'object' && st.type ? st.type : (i % 2 === 0 ? 'concept' : 'implementation'),
      }));

  const finalPractice = practice.length > 0 ? practice : [
    {
      id: `prac-${pracIdCounter++}`,
      title: `Hands-on Implementation: ${title}`,
      description: `Build a functional, tested implementation applying the core concepts of ${title} in a practical project environment.`,
      difficulty: 'medium',
      type: 'coding',
      aiMode: 'ai-restricted',
    },
    {
      id: `prac-${pracIdCounter++}`,
      title: `100% No-AI Challenge: ${title}`,
      description: `Implement and test the core logic of ${title} from scratch in an empty buffer without any AI assistance.`,
      difficulty: 'hard',
      type: 'coding',
      aiMode: 'no-ai',
    }
  ];

  const finalDebugging = debugging.length > 0 ? debugging : [
    {
      id: `dbg-${dbgIdCounter++}`,
      title: `Diagnose & Fix Edge Case Bug in ${title}`,
      description: `Investigate a realistic scenario where ${title} fails with an unexpected exception or subtle silent logic error under edge case conditions.`,
      errorType: 'logic',
      difficulty: 'medium',
      status: 'unsolved',
    }
  ];

  const finalAssessments = assessments.length > 0 ? assessments : [
    {
      id: `assess-${assessIdCounter++}`,
      question: `Explain the fundamental architecture and working principles of ${title}. What problem does it solve and what are the key trade-offs?`,
      difficulty: 'medium',
      type: 'interview',
    },
    {
      id: `assess-${assessIdCounter++}`,
      question: `How would you diagnose and resolve a critical failure or performance bottleneck when using ${title} in production?`,
      difficulty: 'hard',
      type: 'interview',
    }
  ];

  const finalResources = resources.length > 0 ? resources : [
    {
      id: `res-${resIdCounter++}`,
      title: `Official Documentation & Best Practice Guides for ${title}`,
      url: 'https://docs.python.org/3/',
      type: 'Documentation',
    }
  ];

  return {
    id,
    order,
    title,
    description,
    priority,
    estimatedHours,
    prerequisites,
    tags,
    learningObjectives: learningObjectives.length > 0 ? learningObjectives : [
      `Master the core architectural and implementation principles of ${title}`,
      `Apply ${title} to solve practical real-world engineering problems`,
      `Systematically debug errors and edge cases related to ${title}`,
      `Explain and defend ${title} trade-offs and design choices in technical interviews`
    ],
    learningItems: items,
    practice: finalPractice.map((p, idx) => ({
      id: p.id || `prac-${pracIdCounter++}`,
      title: p.title,
      description: p.description,
      difficulty: p.difficulty || (idx === 0 ? 'easy' : idx === 1 ? 'medium' : 'hard'),
      type: p.type || 'coding',
      aiMode: p.aiMode || (idx === 0 ? 'ai-allowed' : idx === 1 ? 'ai-restricted' : 'no-ai'),
    })),
    debugging: finalDebugging.map((d, idx) => ({
      id: d.id || `dbg-${dbgIdCounter++}`,
      title: d.title,
      description: d.description,
      errorType: d.errorType || (idx % 2 === 0 ? 'runtime' : 'logic'),
      difficulty: d.difficulty || 'medium',
      status: 'unsolved',
    })),
    assessments: finalAssessments.map((a, idx) => ({
      id: a.id || `assess-${assessIdCounter++}`,
      question: typeof a === 'string' ? a : a.question,
      difficulty: typeof a === 'object' && a.difficulty ? a.difficulty : 'medium',
      type: typeof a === 'object' && a.type ? a.type : 'interview',
    })),
    resources: finalResources.map((r) => ({
      id: r.id || `res-${resIdCounter++}`,
      title: typeof r === 'string' ? r : r.title,
      url: typeof r === 'object' && r.url ? r.url : 'https://docs.python.org/3/',
      type: typeof r === 'object' && r.type ? r.type : 'Documentation',
    })),
  };
}
