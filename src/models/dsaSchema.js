// src/models/dsaSchema.js
// Schema, status constants, and calculation helpers for DSA & LeetCode tracking

export const DSA_STATUSES = [
  { id: 'not-started', label: 'Not Started', color: 'gray' },
  { id: 'attempted', label: 'Attempted', color: 'amber' },
  { id: 'solved', label: 'Solved', color: 'emerald' },
  { id: 'needs-revision', label: 'Needs Revision', color: 'orange' },
  { id: 'mastered', label: 'Mastered', color: 'indigo' },
];

export const AI_USAGE_MODES = [
  { id: 'independent', label: 'Solved Independently', score: 5, description: 'Solved completely without external hints or AI.' },
  { id: 'with-hint', label: 'Solved With Hint', score: 3, description: 'Understood approach after a small algorithmic hint.' },
  { id: 'with-ai', label: 'Solved With AI', score: 2, description: 'Used AI for debugging, pseudo-code, or syntax support.' },
  { id: 'copied-solution', label: 'Copied / Studied Solution', score: 1, description: 'Read full editorial solution before implementing.' },
  { id: 'unable-to-solve', label: 'Unable To Solve', score: 0, description: 'Stuck on problem without reaching solution.' },
];

export const TIME_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2ⁿ)',
  'O(n!)',
  'O(k log n)',
  'O(V + E)',
  'O(V * E)',
  'O(m * n)',
];

export const SPACE_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n²)',
  'O(k)',
  'O(V + E)',
  'O(m * n)',
  'O(h) - Tree Height',
];

export const PROGRAMMING_LANGUAGES = [
  { id: 'python', name: 'Python', defaultSnippet: 'class Solution:\n    def solve(self, *args):\n        # Write your optimal approach here\n        pass\n' },
  { id: 'javascript', name: 'JavaScript', defaultSnippet: '/**\n * @param {any} args\n * @return {any}\n */\nfunction solve(...args) {\n    // Write your optimal approach here\n}\n' },
  { id: 'typescript', name: 'TypeScript', defaultSnippet: 'function solve(...args: any[]): any {\n    // Write your optimal approach here\n}\n' },
  { id: 'java', name: 'Java', defaultSnippet: 'class Solution {\n    public void solve() {\n        // Write your optimal approach here\n    }\n}\n' },
  { id: 'cpp', name: 'C++', defaultSnippet: 'class Solution {\npublic:\n    void solve() {\n        // Write your optimal approach here\n    }\n};\n' },
  { id: 'go', name: 'Go', defaultSnippet: 'package main\n\nfunc solve() {\n    // Write your optimal approach here\n}\n' },
];

export function createInitialUserProblemState(problemId) {
  return {
    problemId,
    status: 'not-started', // 'not-started' | 'attempted' | 'solved' | 'needs-revision' | 'mastered'
    attempts: 0,
    activeSolution: '',
    language: 'python',
    currentVersion: 1,
    solutionHistory: [], // [{ version: 1, language: 'python', code: '...', createdAt: '...', notes: '...' }]
    approach: '',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    keyInsights: '',
    mistakesLessons: '',
    aiUsage: 'independent', // 'independent' | 'with-hint' | 'with-ai' | 'copied-solution' | 'unable-to-solve'
    independenceScore: 5, // 0 to 5
    mastery: 'unseen', // 'unseen' | 'learning' | 'practicing' | 'solved' | 'independent' | 'mastered'
    favorite: false,
    revisionDate: null, // ISO string or null
    lastAttemptedAt: null,
    lastSolvedAt: null,
    blindReattemptCount: 0,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Compute the mastery level of a problem dynamically based on attempts,
 * independence score, and revision status.
 */
export function computeProblemMastery(userProblem) {
  if (!userProblem || userProblem.status === 'not-started') {
    return 'unseen';
  }
  if (userProblem.status === 'attempted' || userProblem.independenceScore === 0) {
    return 'learning';
  }
  if (userProblem.status === 'needs-revision') {
    return 'practicing';
  }
  if (userProblem.status === 'solved') {
    if (userProblem.independenceScore >= 4 && userProblem.attempts >= 2) {
      return 'mastered';
    }
    if (userProblem.independenceScore >= 4) {
      return 'independent';
    }
    return 'solved';
  }
  if (userProblem.status === 'mastered') {
    return 'mastered';
  }
  return 'practicing';
}

/**
 * Calculate revision date based on preset intervals (1d, 3d, 7d, 14d, 30d) or custom days.
 */
export function calculateNextRevisionDate(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() + Number(days));
  return d.toISOString();
}

/**
 * Aggregates pattern mastery stats across all canonical problems.
 */
export function calculatePatternMasteryStats(patterns, problems, userProgressMap = {}) {
  return patterns.map((pat) => {
    // Find all problems with this pattern
    const patternProblems = problems.filter((p) => (p.patterns || []).includes(pat.id));
    const totalCount = patternProblems.length;

    let solvedCount = 0;
    let independentCount = 0;
    let attemptedCount = 0;
    let needsRevisionCount = 0;

    patternProblems.forEach((p) => {
      const up = userProgressMap[p.id];
      if (up) {
        if (up.status === 'solved' || up.status === 'mastered') {
          solvedCount++;
          if (up.independenceScore >= 4) {
            independentCount++;
          }
        } else if (up.status === 'attempted') {
          attemptedCount++;
        }
        if (up.status === 'needs-revision') {
          needsRevisionCount++;
        }
      }
    });

    const completionRate = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
    const independenceRate = totalCount > 0 ? Math.round((independentCount / totalCount) * 100) : 0;

    let tier = 'weak';
    if (independenceRate >= 70 || (completionRate >= 80 && independenceRate >= 50)) {
      tier = 'strong';
    } else if (completionRate >= 35 || attemptedCount > 0) {
      tier = 'developing';
    }

    return {
      ...pat,
      totalProblems: totalCount,
      solvedCount,
      independentCount,
      attemptedCount,
      needsRevisionCount,
      completionRate,
      independenceRate,
      tier, // 'strong' | 'developing' | 'weak'
    };
  });
}
