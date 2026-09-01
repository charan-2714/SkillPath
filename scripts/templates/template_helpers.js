// scripts/templates/template_helpers.js
// Universal builder and normalization utility for SkillPath Professional Role Templates

export function buildTopic({
  id,
  order,
  title,
  description,
  priority = 'core',
  estimatedHours = 4,
  prerequisites = [],
  tags = [],
  learningObjectives = [],
  subtopics = [],
  practice = [],
  debugging = [],
  assessments = [],
  resources = [],
}) {
  const learningItems = subtopics.map((st, i) => {
    if (typeof st === 'string') {
      return {
        id: `item-${id}-${i + 1}`,
        title: st,
        type: i % 2 === 0 ? 'concept' : 'implementation',
      };
    }
    return {
      id: st.id || `item-${id}-${i + 1}`,
      title: st.title,
      type: st.type || 'concept',
    };
  });

  const finalPractice = practice.length > 0 ? practice : [
    {
      id: `prac-${id}-1`,
      title: `Hands-on Lab: ${title}`,
      description: `Implement, test, and validate core patterns of ${title} in a realistic workspace environment.`,
      difficulty: 'medium',
      type: 'coding',
      aiMode: 'ai-restricted',
    },
    {
      id: `prac-${id}-2`,
      title: `Independent Challenge: ${title}`,
      description: `Build end-to-end functionality for ${title} from scratch and verify production error handling.`,
      difficulty: 'hard',
      type: 'coding',
      aiMode: 'no-ai',
    },
  ];

  const finalDebugging = debugging.length > 0 ? debugging : [
    {
      id: `dbg-${id}-1`,
      title: `Diagnose & Resolve Production Issue in ${title}`,
      description: `Troubleshoot a scenario where ${title} throws unexpected exceptions or fails under high load / invalid payload.`,
      errorType: 'runtime',
      difficulty: 'medium',
      status: 'unsolved',
    },
  ];

  const finalAssessments = assessments.length > 0 ? assessments : [
    {
      id: `assess-${id}-1`,
      question: `Explain the fundamental architecture and best practices for ${title}. What are common architectural pitfalls?`,
      difficulty: 'medium',
      type: 'interview',
    },
    {
      id: `assess-${id}-2`,
      question: `How do you diagnose and fix performance bottlenecks or security vulnerabilities when working with ${title}?`,
      difficulty: 'hard',
      type: 'interview',
    },
  ];

  const finalResources = resources.length > 0 ? resources : [
    {
      id: `res-${id}-1`,
      title: `Official Documentation & Architecture Guide for ${title}`,
      url: 'https://help.sap.com/',
      type: 'Documentation',
    },
  ];

  return {
    id,
    order,
    title,
    description: description || `Comprehensive mastery of ${title}.`,
    priority,
    estimatedHours,
    prerequisites,
    tags,
    learningObjectives: learningObjectives.length > 0 ? learningObjectives : [
      `Understand internal architecture and core mechanics of ${title}`,
      `Implement production-grade components using industry best practices for ${title}`,
      `Diagnose runtime errors, misconfigurations, and edge cases in ${title}`,
      `Explain design trade-offs and answer senior technical interview questions on ${title}`,
    ],
    learningItems,
    practice: finalPractice,
    debugging: finalDebugging,
    assessments: finalAssessments,
    resources: finalResources,
  };
}

export function buildSubject({ id, order, title, description, topics = [] }) {
  return {
    id,
    order,
    title,
    description: description || `Core subject domain covering ${title}.`,
    topics: topics.map((t, idx) => ({ ...t, order: t.order ?? idx + 1 })),
  };
}

export function buildLevel({ id, order, title, description, estimatedDuration = '2-4 weeks', estimatedHours = 30, color = 'indigo', subjects = [] }) {
  return {
    id,
    order,
    title,
    description: description || `Progressive milestone: ${title}.`,
    estimatedDuration,
    estimatedHours,
    color,
    subjects: subjects.map((s, idx) => ({ ...s, order: s.order ?? idx + 1 })),
  };
}

export function buildTemplate({
  id,
  name,
  title,
  category,
  status = 'Production Standard', // 'Production Standard' | 'Growing' | 'Emerging' | 'Established' | 'Legacy / Migration'
  description,
  targetRoles = [],
  prerequisites = [],
  difficulty = 'Intermediate to Advanced',
  estimatedDuration = '6-9 months',
  estimatedHours = 350,
  technologies = [],
  levels = [],
  trackingModel = 'skill-development',
  skillDimensions = [
    { id: 'understanding', name: 'Conceptual Understanding', maxScore: 5 },
    { id: 'implementation', name: 'Hands-on Implementation', maxScore: 5 },
    { id: 'debugging', name: 'Debugging & Diagnostics', maxScore: 5 },
    { id: 'practice', name: 'Practice Challenges', maxScore: 5 },
    { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
  ],
  version = '1.0.0',
}) {
  return {
    id,
    name: name || title,
    title: title || name,
    category,
    status,
    description,
    targetRoles,
    prerequisites,
    difficulty,
    estimatedDuration,
    estimatedHours,
    technologies,
    trackingModel,
    skillDimensions,
    version,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
    lastReviewed: '2026-09-01',
    levels: levels.map((lvl, idx) => ({ ...lvl, order: lvl.order ?? idx })),
  };
}
