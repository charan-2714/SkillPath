// src/utils/calculations.js
// Universal calculation utilities for SkillPath journeys

/**
 * Calculate progress for a single topic (0 - 100%).
 */
export function calculateTopicProgress(topic, trackingModel = 'skill-development', skillDimensions = []) {
  if (!topic) return 0;
  if (topic.status === 'completed') return 100;
  if (topic.status === 'skipped') return 0;

  const learningItems = topic.learningItems || [];
  const completedItems = learningItems.filter((i) => i.completed).length;
  const checklistRatio = learningItems.length > 0 ? completedItems / learningItems.length : null;

  if (trackingModel === 'basic') {
    if (checklistRatio !== null) {
      const baseStatusBonus = topic.status !== 'not-started' ? 10 : 0;
      return Math.min(100, Math.round(checklistRatio * 90 + baseStatusBonus));
    }
    const statusMap = {
      'not-started': 0,
      learning: 30,
      practicing: 60,
      confident: 85,
      'interview-ready': 95,
      completed: 100,
    };
    return statusMap[topic.status] || 0;
  }

  // Skill Development or Custom tracking model
  const dimensions = skillDimensions.length > 0 ? skillDimensions : [
    { id: 'understanding', maxScore: 5 },
    { id: 'implementation', maxScore: 5 },
    { id: 'debugging', maxScore: 5 },
    { id: 'practice', maxScore: 5 },
    { id: 'interview', maxScore: 5 },
  ];

  const scores = topic.skillScores || {};
  let totalSkillPercent = 0;
  let scoredCount = 0;

  dimensions.forEach((dim) => {
    const val = Number(scores[dim.id]) || 0;
    const max = Number(dim.maxScore) || 5;
    totalSkillPercent += (val / max);
    if (val > 0) scoredCount++;
  });

  const avgSkillRatio = dimensions.length > 0 ? totalSkillPercent / dimensions.length : 0;

  if (checklistRatio !== null && dimensions.length > 0) {
    // 40% checklist + 60% skills
    const progress = Math.round(checklistRatio * 40 + avgSkillRatio * 60);
    return Math.min(100, Math.max(0, progress));
  } else if (dimensions.length > 0 && scoredCount > 0) {
    return Math.min(100, Math.max(0, Math.round(avgSkillRatio * 100)));
  } else if (checklistRatio !== null) {
    return Math.min(100, Math.max(0, Math.round(checklistRatio * 100)));
  }

  const fallbackMap = {
    'not-started': 0,
    learning: 25,
    practicing: 50,
    confident: 75,
    'interview-ready': 90,
    completed: 100,
  };
  return fallbackMap[topic.status] || 0;
}

/**
 * Calculate subject progress (average of topics).
 */
export function calculateSubjectProgress(subject, trackingModel, skillDimensions) {
  if (!subject || !subject.topics || subject.topics.length === 0) return 0;
  const total = subject.topics.reduce((acc, t) => {
    return acc + calculateTopicProgress(t, trackingModel, skillDimensions);
  }, 0);
  return Math.round(total / subject.topics.length);
}

/**
 * Calculate level progress (average of subjects/topics).
 */
export function calculateLevelProgress(level, trackingModel, skillDimensions) {
  if (!level || !level.subjects || level.subjects.length === 0) return 0;
  const allTopics = level.subjects.flatMap((s) => s.topics || []);
  if (allTopics.length === 0) return 0;
  const total = allTopics.reduce((acc, t) => {
    return acc + calculateTopicProgress(t, trackingModel, skillDimensions);
  }, 0);
  return Math.round(total / allTopics.length);
}

/**
 * Calculate overall journey progress (0 - 100%).
 */
export function calculateJourneyProgress(journey) {
  if (!journey || !journey.levels || journey.levels.length === 0) return 0;
  const allTopics = journey.levels.flatMap((l) =>
    (l.subjects || []).flatMap((s) => s.topics || [])
  );
  if (allTopics.length === 0) return 0;
  const total = allTopics.reduce((acc, t) => {
    return acc + calculateTopicProgress(t, journey.trackingModel, journey.skillDimensions);
  }, 0);
  return Math.round(total / allTopics.length);
}

/**
 * Calculate journey-level comprehensive stats.
 */
export function getJourneyStats(journey) {
  if (!journey) {
    return {
      overallProgress: 0,
      totalLevels: 0,
      totalSubjects: 0,
      totalTopics: 0,
      completedTopics: 0,
      inProgressTopics: 0,
      notStartedTopics: 0,
      totalPractice: 0,
      practiceSolved: 0,
      totalAssessments: 0,
      assessmentConfident: 0,
      currentLevel: null,
      currentTopic: null,
    };
  }

  const levels = journey.levels || [];
  const subjects = levels.flatMap((l) => l.subjects || []);
  const topics = subjects.flatMap((s) => s.topics || []);

  let completedTopics = 0;
  let inProgressTopics = 0;
  let notStartedTopics = 0;
  let totalPractice = 0;
  let practiceSolved = 0;
  let totalAssessments = 0;
  let assessmentConfident = 0;

  topics.forEach((t) => {
    const prog = calculateTopicProgress(t, journey.trackingModel, journey.skillDimensions);
    if (t.status === 'completed' || prog >= 80) {
      completedTopics++;
    } else if (prog > 0 || t.status !== 'not-started') {
      inProgressTopics++;
    } else {
      notStartedTopics++;
    }

    (t.practice || []).forEach((p) => {
      totalPractice++;
      if (p.status === 'solved' || p.status === 'completed') practiceSolved++;
    });

    (t.assessments || []).forEach((a) => {
      totalAssessments++;
      if (a.status === 'confident') assessmentConfident++;
    });
  });

  const overallProgress = calculateJourneyProgress(journey);

  // Identify current level (first level that is not 100%)
  const currentLevel = levels.find((l) =>
    calculateLevelProgress(l, journey.trackingModel, journey.skillDimensions) < 100
  ) || levels[0] || null;

  // Identify current topic (first in-progress or not-started topic)
  let currentTopic = null;
  for (const lvl of levels) {
    for (const sub of (lvl.subjects || [])) {
      for (const top of (sub.topics || [])) {
        const p = calculateTopicProgress(top, journey.trackingModel, journey.skillDimensions);
        if (top.status !== 'completed' && p < 100) {
          currentTopic = { ...top, levelId: lvl.id, levelTitle: lvl.title, subjectId: sub.id, subjectTitle: sub.title };
          break;
        }
      }
      if (currentTopic) break;
    }
    if (currentTopic) break;
  }

  return {
    overallProgress,
    totalLevels: levels.length,
    totalSubjects: subjects.length,
    totalTopics: topics.length,
    completedTopics,
    inProgressTopics,
    notStartedTopics,
    totalPractice,
    practiceSolved,
    totalAssessments,
    assessmentConfident,
    currentLevel,
    currentTopic,
  };
}

/**
 * Calculate weak areas across a journey.
 */
export function calculateWeakAreas(journey, limit = 10) {
  if (!journey || !journey.levels) return [];

  const items = [];
  const trackingModel = journey.trackingModel || 'skill-development';
  const dimensions = journey.skillDimensions || [];

  (journey.levels || []).forEach((level) => {
    (level.subjects || []).forEach((subject) => {
      (subject.topics || []).forEach((topic) => {
        const progress = calculateTopicProgress(topic, trackingModel, dimensions);
        if (topic.status === 'completed' || progress >= 85) return;

        const weaknessScore = 100 - progress;
        const reasons = [];

        if (topic.status === 'not-started') {
          reasons.push('Topic not yet started');
        }

        const scores = topic.skillScores || {};
        dimensions.forEach((dim) => {
          const score = scores[dim.id] || 0;
          if (score < 2 && topic.status !== 'not-started') {
            reasons.push(`Low ${dim.name}`);
          }
        });

        const practices = topic.practice || [];
        const unsolvedPrac = practices.filter((p) => p.status !== 'solved' && p.status !== 'completed');
        if (unsolvedPrac.length > 0) {
          reasons.push(`${unsolvedPrac.length} uncompleted practice task(s)`);
        }

        const assessments = topic.assessments || [];
        const unconfidentAssess = assessments.filter((a) => a.status !== 'confident');
        if (unconfidentAssess.length > 0) {
          reasons.push(`${unconfidentAssess.length} unverified assessment(s)`);
        }

        if (weaknessScore > 20) {
          items.push({
            topicId: topic.id,
            topicTitle: topic.title,
            subjectId: subject.id,
            subjectTitle: subject.title,
            levelId: level.id,
            levelTitle: level.title,
            progress,
            weaknessScore,
            status: topic.status,
            reasons: reasons.length > 0 ? reasons : ['In progress'],
            skillScores: scores,
            topic,
          });
        }
      });
    });
  });

  return items.sort((a, b) => b.weaknessScore - a.weaknessScore).slice(0, limit);
}

/**
 * Calculate aggregated average for each configured skill dimension.
 */
export function calculateSkillAverages(journey) {
  if (!journey || !journey.skillDimensions || journey.skillDimensions.length === 0) return [];
  const topics = (journey.levels || []).flatMap((l) => (l.subjects || []).flatMap((s) => s.topics || []));
  if (topics.length === 0) return [];

  return journey.skillDimensions.map((dim) => {
    const totalScore = topics.reduce((acc, t) => acc + (Number(t.skillScores?.[dim.id]) || 0), 0);
    const maxScore = Number(dim.maxScore) || 5;
    const avgScore = Number((totalScore / topics.length).toFixed(1));
    const percent = Math.min(100, Math.round((avgScore / maxScore) * 100));

    return {
      id: dim.id,
      name: dim.name,
      avgScore,
      maxScore,
      percent,
    };
  });
}

/**
 * Calculate AI Dependency score (0-100, lower is better).
 */
export function calculateAIDependencyScore(aiLogs) {
  if (!aiLogs || aiLogs.length === 0) return 0;
  const recent = aiLogs.slice(-20);
  const total = recent.reduce((acc, entry) => {
    let score = 0;
    if (entry.usedAI) score += 30;
    if (!entry.attemptedFirst) score += 25;
    if (!entry.couldExplain) score += 15;
    if (!entry.couldModify) score += 15;
    if (!entry.couldDebug) score += 10;
    if (!entry.couldImplementFromScratch) score += 5;
    return acc + score;
  }, 0);
  return Math.round(total / recent.length);
}

export function getAIDependencyLabel(score) {
  if (score >= 70) return { label: 'High', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30' };
  if (score >= 40) return { label: 'Moderate', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30' };
  return { label: 'Low (Independent)', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' };
}
