// src/models/journeySchema.js
// Schema definition, data types, and helper factory functions for SkillPath

export const TRACKING_MODELS = {
  BASIC: 'basic',
  SKILL_DEVELOPMENT: 'skill-development',
  CUSTOM: 'custom',
};

export const DEFAULT_SKILL_DIMENSIONS = [
  { id: 'understanding', name: 'Understanding', maxScore: 5 },
  { id: 'implementation', name: 'Implementation', maxScore: 5 },
  { id: 'debugging', name: 'Debugging', maxScore: 5 },
  { id: 'practice', name: 'Practice', maxScore: 5 },
  { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
];

export const TOPIC_STATUSES = [
  'not-started',
  'learning',
  'practicing',
  'review',
  'mastered',
  'completed',
  'skipped',
];

export const TOPIC_PRIORITIES = ['core', 'important', 'optional'];

export const PRACTICE_TYPES = [
  'exercise',
  'coding',
  'coding-challenge',
  'hands-on',
  'project-task',
  'quiz',
  'reading',
  'other',
];

export const PRACTICE_STATUSES = [
  'not-started',
  'attempted',
  'solved',
  'needs-review',
  'completed',
];

export const DEBUGGING_ERROR_TYPES = [
  'syntax',
  'runtime',
  'logic',
  'HTTP',
  'database',
  'model-inference',
  'concurrency',
  'security',
  'memory-leak',
  'other',
];

export const DEBUGGING_STATUSES = [
  'unsolved',
  'attempted',
  'solved',
];

export const ASSESSMENT_TYPES = [
  'interview',
  'quiz',
  'self-assessment',
  'exam',
  'review',
];

export const ASSESSMENT_STATUSES = [
  'not-attempted',
  'attempted',
  'confident',
  'needs-review',
];

export const RESOURCE_TYPES = [
  'Documentation',
  'Video',
  'Article',
  'Course',
  'Book',
  'Repository',
  'GitHub',
  'Practice',
  'Other',
];

export const PROJECT_STATUSES = [
  'idea',
  'planning',
  'in-progress',
  'completed',
  'paused',
  'archived',
];

export const RECYCLE_ITEM_TYPES = [
  'journey',
  'level',
  'subject',
  'topic',
  'learning-item',
  'practice',
  'debugging',
  'assessment',
  'resource',
  'project',
];

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
}

export function createNewJourney(params = {}) {
  const trackingModel = params.trackingModel || TRACKING_MODELS.SKILL_DEVELOPMENT;
  let skillDimensions = [];

  if (trackingModel === TRACKING_MODELS.SKILL_DEVELOPMENT) {
    skillDimensions = [...DEFAULT_SKILL_DIMENSIONS];
  } else if (trackingModel === TRACKING_MODELS.CUSTOM && Array.isArray(params.skillDimensions)) {
    skillDimensions = params.skillDimensions;
  }

  return {
    id: params.id || generateId('journey'),
    templateId: params.templateId || null,
    templateVersion: params.templateVersion || 1,
    name: params.name || 'New Learning Journey',
    description: params.description || '',
    goal: params.goal || 'Skill Mastery',
    category: params.category || 'Technology',
    difficulty: params.difficulty || 'All Levels',
    targetDate: params.targetDate || '',
    trackingModel,
    skillDimensions,
    isArchived: false,
    features: {
      projects: params.features?.projects ?? true,
      interviews: params.features?.interviews ?? true,
      aiIndependence: params.features?.aiIndependence ?? (params.category === 'Technology' || params.category === 'Data Science & AI'),
    },
    enableAIDependency: params.enableAIDependency ?? (params.category === 'Technology' || params.category === 'Data Science & AI'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    levels: params.levels || [],
    projects: params.projects || [],
    learningLogs: params.learningLogs || [],
    aiDependency: params.aiDependency || [],
    notes: params.notes || [],
  };
}

export function createNewLevel(params = {}, order = 1) {
  return {
    id: params.id || generateId('lvl'),
    templateId: params.templateId || null,
    title: params.title || `Level ${order}`,
    description: params.description || '',
    estimatedDuration: params.estimatedDuration || '',
    estimatedHours: params.estimatedHours || 20,
    order: params.order ?? order,
    color: params.color || 'indigo',
    targetDate: params.targetDate || '',
    subjects: params.subjects || [],
  };
}

export function createNewSubject(params = {}, order = 1) {
  return {
    id: params.id || generateId('subj'),
    templateId: params.templateId || null,
    title: params.title || `Subject ${order}`,
    description: params.description || '',
    order: params.order ?? order,
    icon: params.icon || '',
    color: params.color || '',
    topics: params.topics || [],
  };
}

export function createNewTopic(params = {}) {
  return {
    id: params.id || generateId('topic'),
    templateId: params.templateId || null,
    source: params.source || 'custom', // 'template' | 'custom'
    title: params.title || 'New Topic',
    description: params.description || '',
    priority: params.priority || 'core',
    tags: Array.isArray(params.tags) ? params.tags : [],
    estimatedHours: params.estimatedHours || 4,
    prerequisites: Array.isArray(params.prerequisites) ? params.prerequisites : [],
    learningObjectives: Array.isArray(params.learningObjectives) ? params.learningObjectives : [],
    status: params.status || 'not-started',
    progress: params.progress || 0,
    skillScores: params.skillScores || {},
    learningItems: params.learningItems || [],
    practice: params.practice || [],
    debugging: params.debugging || [],
    assessments: params.assessments || [],
    resources: params.resources || [],
    notes: params.notes || '',
    lastReviewed: params.lastReviewed || null,
    independenceCheck: params.independenceCheck || {
      canExplain: false,
      canImplement: false,
      canModify: false,
      canDebug: false,
      canImplementWithoutAI: false,
      canExplainInterview: false,
    },
  };
}

export function createNewLearningItem(params = {}) {
  return {
    id: params.id || generateId('item'),
    templateId: params.templateId || null,
    title: params.title || 'Learning Item',
    description: params.description || '',
    type: params.type || 'concept',
    completed: Boolean(params.completed),
    notes: params.notes || '',
  };
}

export function createNewPractice(params = {}) {
  return {
    id: params.id || generateId('prac'),
    templateId: params.templateId || null,
    title: params.title || 'Practice Task',
    description: params.description || '',
    difficulty: params.difficulty || 'medium',
    type: params.type || 'coding',
    status: params.status || 'not-started',
    notes: params.notes || '',
  };
}

export function createNewDebugging(params = {}) {
  return {
    id: params.id || generateId('dbg'),
    templateId: params.templateId || null,
    title: params.title || 'Debugging Exercise',
    description: params.description || '',
    errorType: params.errorType || 'runtime',
    brokenSnippet: params.brokenSnippet || '',
    fixedSnippet: params.fixedSnippet || '',
    difficulty: params.difficulty || 'medium',
    status: params.status || 'unsolved',
    notes: params.notes || '',
  };
}

export function createNewAssessment(params = {}) {
  return {
    id: params.id || generateId('assess'),
    templateId: params.templateId || null,
    question: params.question || 'Assessment Question',
    difficulty: params.difficulty || 'medium',
    type: params.type || 'interview',
    status: params.status || 'not-attempted',
    confidence: params.confidence || 0,
    notes: params.notes || '',
  };
}

export function createNewResource(params = {}) {
  return {
    id: params.id || generateId('res'),
    templateId: params.templateId || null,
    title: params.title || 'Resource Title',
    url: params.url || '',
    type: params.type || 'Documentation',
    description: params.description || '',
    tags: Array.isArray(params.tags) ? params.tags : [],
    completed: Boolean(params.completed),
  };
}

export function createNewProject(params = {}) {
  return {
    id: params.id || generateId('proj'),
    name: params.name || 'New Project',
    description: params.description || '',
    goal: params.goal || '',
    technologies: Array.isArray(params.technologies) ? params.technologies : [],
    status: params.status || 'planning',
    progress: params.progress || 0,
    startDate: params.startDate || '',
    targetDate: params.targetDate || '',
    githubUrl: params.githubUrl || '',
    deploymentUrl: params.deploymentUrl || '',
    skillsDemonstrated: Array.isArray(params.skillsDemonstrated) ? params.skillsDemonstrated : [],
    knownIssues: params.knownIssues || '',
    lessonsLearned: params.lessonsLearned || '',
    interviewExplanation: params.interviewExplanation || '',
    notes: params.notes || '',
    checklist: params.checklist || [],
    createdAt: new Date().toISOString(),
  };
}

export function createNewLearningLog(params = {}) {
  return {
    id: params.id || generateId('log'),
    date: params.date || new Date().toISOString().slice(0, 10),
    durationMinutes: Number(params.durationMinutes) || 30,
    levelId: params.levelId || '',
    subjectId: params.subjectId || '',
    topicId: params.topicId || '',
    topicTitle: params.topicTitle || '',
    whatLearned: params.whatLearned || '',
    whatPracticed: params.whatPracticed || '',
    whatConfused: params.whatConfused || '',
    aiUsed: Boolean(params.aiUsed),
    canDoIndependently: params.canDoIndependently || '',
    nextAction: params.nextAction || '',
    createdAt: new Date().toISOString(),
  };
}

export function createNewRecycleItem(params = {}) {
  return {
    id: params.id || generateId('recycle'),
    itemType: params.itemType || 'topic', // journey, level, subject, topic, learning-item, practice, debugging, assessment, resource, project
    title: params.title || 'Untitled Item',
    description: params.description || '',
    originalJourneyId: params.originalJourneyId || null,
    originalJourneyName: params.originalJourneyName || '',
    originalLevelId: params.originalLevelId || null,
    originalLevelTitle: params.originalLevelTitle || '',
    originalSubjectId: params.originalSubjectId || null,
    originalSubjectTitle: params.originalSubjectTitle || '',
    originalTopicId: params.originalTopicId || null,
    originalTopicTitle: params.originalTopicTitle || '',
    deletedAt: new Date().toISOString(),
    data: params.data || {},
  };
}
