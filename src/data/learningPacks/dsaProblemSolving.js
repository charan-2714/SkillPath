// src/data/learningPacks/dsaProblemSolving.js
// Canonical Learning Pack: DSA & Problem Solving (Directly integrated with DSA Tracker)

import { DSA_LEARNING_PATH } from '../dsa/dsaLearningPath';
import { DSA_PROBLEMS } from '../dsa/dsaProblems';

export const dsaProblemSolvingPack = {
  id: 'pack-dsa-problem-solving',
  slug: 'dsa-problem-solving',
  title: 'DSA & Problem Solving',
  category: 'Placement Preparation',
  difficulty: 'Intermediate',
  priority: 'High',
  estimatedHours: 90,
  version: '2.0',
  status: 'Production Standard',
  createdAt: '2025-01-10',
  updatedAt: '2026-03-01',
  lastReviewed: '2026-08-25',
  description: 'Comprehensive algorithmic problem solving and data structures mastery across 22 core patterns with direct deep-integration to the LeetCode problem tracker.',
  targetUsers: 'Students targeting software engineering campus placements, off-campus hiring, FAANG/MANG coding rounds.',
  prerequisites: ['Programming Fundamentals in one language (Python, Java, C++, JS)'],
  tags: ['dsa', 'algorithms', 'data-structures', 'leetcode', 'patterns', 'placements', 'faang'],
  defaultLanguage: 'All Languages',
  relatedPacks: ['pack-programming-fundamentals', 'pack-cs-fundamentals', 'pack-interview-prep'],
  relatedTemplates: ['dsa-interview-prep', 'software-developer-placement', 'ai-ml-engineer'],
  hasDsaTrackerIntegration: true,
  careerRelevance: 'The primary technical filtering mechanism used by top tech companies, product startups, and campus placements.',
  learningOutcomes: [
    'Master 22 algorithmic patterns from Two Pointers and Sliding Window to Dynamic Programming and Graphs',
    'Solve 150+ curated industry-standard coding problems with optimal time and space complexity',
    'Gain immediate pattern recognition to categorize unseen problems in 45-minute live interviews',
    'Directly track coding submissions, confidence levels, and revision intervals in the built-in DSA Tracker',
  ],
  // Dynamically constructed subjects from canonical DSA_LEARNING_PATH
  subjects: DSA_LEARNING_PATH.map((lvl, lIdx) => ({
    id: `dsa-pack-${lvl.id}`,
    title: lvl.title.replace(/^L\d+\s*—\s*/, ''),
    description: lvl.description,
    order: lIdx + 1,
    topics: (lvl.topics || []).map((t, tIdx) => {
      const linkedProblems = (t.problemIds || []).map((pId) => DSA_PROBLEMS.find((p) => p.id === pId)).filter(Boolean);
      return {
        id: `dsa-pack-topic-${t.id}`,
        title: t.title,
        description: t.description,
        priority: 'core',
        estimatedHours: 4,
        tags: ['dsa', 'patterns', lvl.color || 'indigo'],
        learningItems: (t.subtopics || []).map((sub, sIdx) => ({
          id: `dsa-item-${t.id}-${sIdx}`,
          title: sub,
          type: 'concept',
        })),
        practice: linkedProblems.map((prob) => ({
          id: `dsa-prac-${prob.id}`,
          title: `${prob.title} (${prob.difficulty})`,
          description: prob.description || `Solve ${prob.title} on LeetCode with optimal complexity.`,
          difficulty: prob.difficulty.toLowerCase(),
          type: 'coding',
          problemId: prob.id,
          leetcodeUrl: prob.url,
        })),
        assessments: [
          {
            id: `dsa-assess-${t.id}`,
            question: `Explain the algorithmic pattern and optimal complexity for ${t.title}. ${t.interviewRelevance || ''}`,
            difficulty: 'medium',
            type: 'interview',
          },
        ],
      };
    }),
  })),
};
