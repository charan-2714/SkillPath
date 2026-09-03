// src/data/roles/index.js
// Centralized role/template registry importing immutable JSON curriculum content

// Core & Existing AI/ML Templates
import aiMlEngineer from './ai-ml-engineer.json' with { type: 'json' };
import machineLearningEngineer from './machine-learning-engineer.json' with { type: 'json' };
import dataScientist from './data-scientist.json' with { type: 'json' };
import dataAnalyst from './data-analyst.json' with { type: 'json' };
import fullStackDeveloper from './full-stack-developer.json' with { type: 'json' };
import frontendDeveloper from './frontend-developer.json' with { type: 'json' };
import backendDeveloper from './backend-developer.json' with { type: 'json' };
import devopsEngineer from './devops-engineer.json' with { type: 'json' };
import cloudEngineer from './cloud-engineer.json' with { type: 'json' };
import cybersecurityEngineer from './cybersecurity-engineer.json' with { type: 'json' };
import qaAutomationEngineer from './qa-automation-engineer.json' with { type: 'json' };
import dataEngineer from './data-engineer.json' with { type: 'json' };

// Trending Technologies & Modern Roles
import pythonAutomationDeveloper from './python-automation-developer.json' with { type: 'json' };
import agenticAiEngineer from './agentic-ai-engineer.json' with { type: 'json' };
import mlopsEngineer from './mlops-engineer.json' with { type: 'json' };
import devopsPlatformEngineer from './devops-platform-engineer.json' with { type: 'json' };
import dsaInterviewPrep from './dsa-interview-prep.json' with { type: 'json' };

// SAP Ecosystem Family
import sapFioriDeveloper from './sap-fiori-developer.json' with { type: 'json' };
import sapIntegrationDeveloper from './sap-integration-developer.json' with { type: 'json' };
import sapPiPoDeveloper from './sap-pi-po-developer.json' with { type: 'json' };
import sapMmConsultant from './sap-mm-consultant.json' with { type: 'json' };
import sapS4HanaConsultant from './sap-s4hana-consultant.json' with { type: 'json' };
import sapBtpDeveloper from './sap-btp-developer.json' with { type: 'json' };
import sapCapDeveloper from './sap-cap-developer.json' with { type: 'json' };
import sapRapDeveloper from './sap-rap-developer.json' with { type: 'json' };
import sapAbapDeveloper from './sap-abap-developer.json' with { type: 'json' };
import sapHanaDeveloper from './sap-hana-developer.json' with { type: 'json' };
import sapODataDeveloper from './sap-odata-developer.json' with { type: 'json' };
import sapEventDrivenArchitecture from './sap-event-driven-architecture.json' with { type: 'json' };
import sapAnalyticsCloud from './sap-analytics-cloud.json' with { type: 'json' };
import sapAribaConsultant from './sap-ariba-consultant.json' with { type: 'json' };
import sapSuccessFactorsConsultant from './sap-successfactors-consultant.json' with { type: 'json' };
import sapBuildDeveloper from './sap-build-developer.json' with { type: 'json' };
import sapBasDeveloper from './sap-bas-developer.json' with { type: 'json' };

import { generateId } from '../../models/journeySchema.js';

export const SAP_TEMPLATES = [
  sapFioriDeveloper,
  sapIntegrationDeveloper,
  sapPiPoDeveloper,
  sapMmConsultant,
  sapS4HanaConsultant,
  sapBtpDeveloper,
  sapCapDeveloper,
  sapRapDeveloper,
  sapAbapDeveloper,
  sapHanaDeveloper,
  sapODataDeveloper,
  sapEventDrivenArchitecture,
  sapAnalyticsCloud,
  sapAribaConsultant,
  sapSuccessFactorsConsultant,
  sapBuildDeveloper,
  sapBasDeveloper,
];

export const TRENDING_TECH_TEMPLATES = [
  dsaInterviewPrep,
  agenticAiEngineer,
  pythonAutomationDeveloper,
  mlopsEngineer,
  devopsPlatformEngineer,
  aiMlEngineer,
  fullStackDeveloper,
  dataEngineer,
  cybersecurityEngineer,
];

export const ROLE_TEMPLATES = [
  // Problem Solving & DSA
  dsaInterviewPrep,

  // Primary AI/ML Engineer
  aiMlEngineer,
  pythonAutomationDeveloper,
  agenticAiEngineer,
  mlopsEngineer,
  machineLearningEngineer,

  // SAP Ecosystem Family
  ...SAP_TEMPLATES,

  // Cloud, DevOps & Platform
  devopsPlatformEngineer,
  devopsEngineer,
  cloudEngineer,
  cybersecurityEngineer,

  // Software Development
  fullStackDeveloper,
  frontendDeveloper,
  backendDeveloper,

  // Data & Analytics
  dataEngineer,
  dataScientist,
  dataAnalyst,

  // Quality & Additional
  qaAutomationEngineer,
].map((t) => ({
  ...t,
  title: t.title || t.name || 'Untitled Template',
  name: t.name || t.title || 'Untitled Template',
  templateType: 'role',
  status: t.status || 'Production Standard',
  technologies: Array.isArray(t.technologies) ? t.technologies : (t.tags || []),
  targetRoles: Array.isArray(t.targetRoles) ? t.targetRoles : [t.title || t.name],
  prerequisites: Array.isArray(t.prerequisites) ? t.prerequisites : [],
}));

export const TECHNOLOGY_TEMPLATES = [
  ...SAP_TEMPLATES,
  agenticAiEngineer,
  devopsPlatformEngineer,
  mlopsEngineer,
  dsaInterviewPrep,
].map((t) => ({
  ...t,
  title: t.title || t.name || 'Untitled Technology Template',
  name: t.name || t.title || 'Untitled Technology Template',
  templateType: 'technology',
  status: t.status || 'Production Standard',
  technologies: Array.isArray(t.technologies) ? t.technologies : (t.tags || []),
  targetRoles: Array.isArray(t.targetRoles) ? t.targetRoles : [t.title || t.name],
  prerequisites: Array.isArray(t.prerequisites) ? t.prerequisites : [],
}));

export { LEARNING_PACKS, getLearningPackById, cloneJourneyFromPacks, addPackToJourney } from '../learningPacks';

export const TEMPLATES = ROLE_TEMPLATES;

export function getRoleTemplateById(id) {
  return ROLE_TEMPLATES.find((t) => t.id === id) || null;
}

export function getTemplateById(id) {
  return getRoleTemplateById(id) || getLearningPackById(id);
}

/**
 * Deep-clone a master template into an independent user journey with fresh IDs.
 * The JSON template remains immutable and unchanged.
 */
export function cloneJourneyFromTemplate(template, customName = null) {
  const newJourneyId = generateId('journey');

  const clonedLevels = (template.levels || []).map((level, lIdx) => {
    const newLevelId = generateId('lvl');

    const clonedSubjects = (level.subjects || []).map((subject, sIdx) => {
      const newSubjectId = generateId('subj');

      const clonedTopics = (subject.topics || []).map((topic, tIdx) => {
        const newTopicId = generateId('topic');

        const rawItems = (topic.learningItems && topic.learningItems.length > 0)
          ? topic.learningItems
          : (topic.subtopics || []);

        const clonedLearningItems = rawItems.map((item, idx) => {
          if (typeof item === 'string') {
            return {
              id: generateId('item'),
              templateId: null,
              title: item,
              description: '',
              type: idx % 2 === 0 ? 'concept' : 'implementation',
              completed: false,
              notes: '',
            };
          }
          return {
            id: generateId('item'),
            templateId: item.id || null,
            title: item.title,
            description: item.description || '',
            type: item.type || 'concept',
            completed: Boolean(item.completed),
            notes: item.notes || '',
          };
        });

        const clonedPractice = (topic.practice || []).map((p) => ({
          id: generateId('prac'),
          templateId: p.id || null,
          title: p.title,
          description: p.description || '',
          difficulty: p.difficulty || 'medium',
          type: p.type || 'coding',
          status: 'not-started',
          notes: '',
        }));

        const clonedDebugging = (topic.debugging || []).map((d) => ({
          id: generateId('dbg'),
          templateId: d.id || null,
          title: d.title,
          description: d.description || '',
          errorType: d.errorType || 'runtime',
          brokenSnippet: d.brokenSnippet || '',
          fixedSnippet: d.fixedSnippet || '',
          difficulty: d.difficulty || 'medium',
          status: 'unsolved',
          notes: '',
        }));

        const clonedAssessments = (topic.assessments || []).map((a) => ({
          id: generateId('assess'),
          templateId: a.id || null,
          question: a.question,
          difficulty: a.difficulty || 'medium',
          type: a.type || 'interview',
          status: 'not-attempted',
          confidence: 0,
          notes: '',
        }));

        const clonedResources = (topic.resources || []).map((r) => ({
          id: generateId('res'),
          templateId: r.id || null,
          title: r.title,
          url: r.url || '',
          type: r.type || 'Documentation',
          description: r.description || '',
          tags: Array.isArray(r.tags) ? [...r.tags] : [],
          completed: false,
        }));

        return {
          id: newTopicId,
          templateId: topic.id || null,
          source: 'template', // 'template' | 'custom'
          title: topic.title,
          description: topic.description || '',
          priority: topic.priority || 'core',
          tags: Array.isArray(topic.tags) ? [...topic.tags] : [],
          estimatedHours: topic.estimatedHours || 4,
          prerequisites: Array.isArray(topic.prerequisites) ? [...topic.prerequisites] : [],
          learningObjectives: Array.isArray(topic.learningObjectives) ? [...topic.learningObjectives] : [],
          status: 'not-started',
          progress: 0,
          skillScores: {},
          learningItems: clonedLearningItems,
          practice: clonedPractice,
          debugging: clonedDebugging,
          assessments: clonedAssessments,
          resources: clonedResources,
          notes: '',
          lastReviewed: null,
          independenceCheck: {
            canExplain: false,
            canImplement: false,
            canModify: false,
            canDebug: false,
            canImplementWithoutAI: false,
            canExplainInterview: false,
          },
        };
      });

      return {
        id: newSubjectId,
        templateId: subject.id || null,
        title: subject.title,
        description: subject.description || '',
        order: subject.order ?? sIdx + 1,
        topics: clonedTopics,
      };
    });

    return {
      id: newLevelId,
      templateId: level.id || null,
      title: level.title,
      description: level.description || '',
      estimatedDuration: level.estimatedDuration || '',
      estimatedHours: level.estimatedHours || 20,
      order: level.order ?? lIdx + 1,
      color: level.color || 'indigo',
      targetDate: '',
      subjects: clonedSubjects,
    };
  });

  const templateName = template.title || template.name || 'Custom Learning Journey';

  return {
    id: newJourneyId,
    templateId: template.id,
    templateVersion: template.version || 1,
    name: customName || `My ${templateName} Journey`,
    description: template.description || '',
    goal: template.category?.includes('SAP')
      ? 'SAP Enterprise Mastery & Certification'
      : template.category?.includes('AI')
      ? 'AI/ML Engineering Mastery'
      : 'Career Switch / Mastery',
    category: template.category || 'Technology',
    difficulty: template.difficulty || 'All Levels',
    targetDate: '',
    trackingModel: template.trackingModel || 'skill-development',
    skillDimensions: (template.skillDimensions || [
      { id: 'understanding', name: 'Conceptual Understanding', maxScore: 5 },
      { id: 'implementation', name: 'Hands-on Implementation', maxScore: 5 },
      { id: 'debugging', name: 'Debugging & Diagnostics', maxScore: 5 },
      { id: 'practice', name: 'Practice Challenges', maxScore: 5 },
      { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
    ]).map((d) => ({ ...d })),
    features: {
      projects: template.features?.projects ?? true,
      interviews: template.features?.interviews ?? true,
      aiIndependence: template.features?.aiIndependence ?? true,
    },
    isArchived: false,
    enableAIDependency: template.enableAIDependency ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    levels: clonedLevels,
    projects: [],
    learningLogs: [],
    aiDependency: [],
    notes: [],
  };
}

/**
 * Clones all levels/subjects/topics from any template (Role Template, Tech Template, or Learning Pack).
 */
export function cloneLevelsFromAnyTemplate(template, startingLevelOrder = 1) {
  if (!template) return [];

  // 1. If template has explicit levels (Role Templates & Tech Templates)
  if (Array.isArray(template.levels) && template.levels.length > 0) {
    return template.levels.map((level, lIdx) => {
      const newLevelId = generateId('lvl');

      const clonedSubjects = (level.subjects || []).map((subject, sIdx) => {
        const newSubjectId = generateId('subj');

        const clonedTopics = (subject.topics || []).map((topic, tIdx) => {
          const newTopicId = generateId('topic');

          const rawItems = (topic.learningItems && topic.learningItems.length > 0)
            ? topic.learningItems
            : (topic.subtopics || []);

          const clonedLearningItems = rawItems.map((item, idx) => {
            if (typeof item === 'string') {
              return {
                id: generateId('item'),
                templateId: null,
                title: item,
                description: '',
                type: idx % 2 === 0 ? 'concept' : 'implementation',
                completed: false,
                notes: '',
              };
            }
            return {
              id: generateId('item'),
              templateId: item.id || null,
              title: item.title,
              description: item.description || '',
              type: item.type || 'concept',
              completed: Boolean(item.completed),
              notes: item.notes || '',
            };
          });

          const clonedPractice = (topic.practice || []).map((p) => ({
            id: generateId('prac'),
            templateId: p.id || null,
            title: p.title,
            description: p.description || '',
            difficulty: p.difficulty || 'medium',
            type: p.type || 'coding',
            status: 'not-started',
          }));

          const clonedDebugging = (topic.debugging || []).map((d) => ({
            id: generateId('dbg'),
            templateId: d.id || null,
            title: d.title,
            problemStatement: d.problemStatement || '',
            starterCode: d.starterCode || '',
            bugHint: d.bugHint || '',
            expectedOutcome: d.expectedOutcome || '',
            status: 'unsolved',
          }));

          const clonedAssessments = (topic.assessments || []).map((a) => ({
            id: generateId('assess'),
            templateId: a.id || null,
            question: a.question,
            options: a.options || [],
            correctOptionIndex: a.correctOptionIndex ?? 0,
            explanation: a.explanation || '',
            difficulty: a.difficulty || 'medium',
            status: 'not-attempted',
          }));

          return {
            id: newTopicId,
            templateId: topic.id || null,
            title: topic.title,
            description: topic.description || '',
            priority: topic.priority || 'core',
            tags: Array.isArray(topic.tags) ? [...topic.tags] : [],
            estimatedHours: topic.estimatedHours || 6,
            status: 'not-started',
            progress: 0,
            skillScores: {},
            learningItems: clonedLearningItems,
            practice: clonedPractice,
            debugging: clonedDebugging,
            assessments: clonedAssessments,
            resources: [],
            notes: '',
            lastReviewed: null,
            order: topic.order ?? tIdx + 1,
            independenceCheck: {
              canExplain: false,
              canImplement: false,
              canModify: false,
              canDebug: false,
              canImplementWithoutAI: false,
              canExplainInterview: false,
            },
          };
        });

        return {
          id: newSubjectId,
          templateId: subject.id || null,
          title: subject.title,
          description: subject.description || '',
          order: subject.order ?? sIdx + 1,
          topics: clonedTopics,
        };
      });

      return {
        id: newLevelId,
        templateId: level.id || null,
        title: level.title,
        description: level.description || '',
        estimatedDuration: level.estimatedDuration || '',
        estimatedHours: level.estimatedHours || 20,
        order: startingLevelOrder + lIdx,
        color: level.color || 'indigo',
        targetDate: '',
        subjects: clonedSubjects,
      };
    });
  }

  // 2. If template is a Learning Pack (has subjects directly)
  if (Array.isArray(template.subjects) && template.subjects.length > 0) {
    const newLevelId = generateId('lvl');
    const levelColors = ['indigo', 'emerald', 'sky', 'purple', 'amber', 'rose', 'teal', 'slate'];
    const color = levelColors[startingLevelOrder % levelColors.length];

    const clonedSubjects = template.subjects.map((subj, sIdx) => {
      const subjId = generateId('subj');
      const clonedTopics = (subj.topics || []).map((topic, tIdx) => ({
        id: generateId('topic'),
        templateId: topic.id || null,
        source: 'pack',
        title: topic.title,
        description: topic.description || '',
        priority: topic.priority || 'core',
        tags: Array.isArray(topic.tags) ? [...topic.tags] : [],
        estimatedHours: topic.estimatedHours || 4,
        status: 'not-started',
        progress: 0,
        skillScores: {},
        order: topic.order ?? tIdx + 1,
        learningItems: (topic.learningItems || []).map((item) => ({
          id: generateId('item'),
          title: item.title,
          type: item.type || 'concept',
          completed: false,
        })),
        practice: (topic.practice || []).map((p) => ({
          id: generateId('prac'),
          title: p.title,
          description: p.description || '',
          difficulty: p.difficulty || 'medium',
          type: p.type || 'coding',
          status: 'not-started',
        })),
        debugging: (topic.debugging || []).map((d) => ({
          id: generateId('dbg'),
          title: d.title,
          status: 'unsolved',
        })),
        assessments: (topic.assessments || []).map((a) => ({
          id: generateId('assess'),
          question: a.question,
          difficulty: a.difficulty || 'medium',
          status: 'not-attempted',
        })),
        resources: [],
        notes: '',
        lastReviewed: null,
        independenceCheck: {
          canExplain: false,
          canImplement: false,
          canModify: false,
          canDebug: false,
          canImplementWithoutAI: false,
          canExplainInterview: false,
        },
      }));

      return {
        id: subjId,
        templateId: subj.id || null,
        title: subj.title,
        description: subj.description || '',
        order: sIdx + 1,
        topics: clonedTopics,
      };
    });

    return [
      {
        id: newLevelId,
        title: template.title || template.name || 'Pack Module',
        description: template.description || '',
        order: startingLevelOrder,
        color,
        subjects: clonedSubjects,
      },
    ];
  }

  return [];
}

/**
 * Append one or multiple templates/packs (Core Role, Technology, or Learning Pack) into an existing journey.
 */
export function addTemplatesToJourney(journey, templatesInput) {
  if (!journey) return journey;
  const templates = Array.isArray(templatesInput) ? templatesInput : [templatesInput];
  if (templates.length === 0) return journey;

  let currentLevelOrder = (journey.levels || []).length + 1;
  const allNewLevels = [];

  templates.forEach((tpl) => {
    if (!tpl) return;
    const cloned = cloneLevelsFromAnyTemplate(tpl, currentLevelOrder);
    allNewLevels.push(...cloned);
    currentLevelOrder += cloned.length;
  });

  return {
    ...journey,
    levels: [...(journey.levels || []), ...allNewLevels],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Combine multiple templates/packs (Core, Tech, or Learning Packs) into a single new journey.
 */
export function combineMultipleTemplatesIntoNewJourney(templatesList, journeyOptions = {}) {
  const templates = (templatesList || []).filter(Boolean);
  if (templates.length === 0) return null;

  const newJourneyId = generateId('journey');
  let currentLevelOrder = 1;
  const combinedLevels = [];

  templates.forEach((tpl) => {
    const cloned = cloneLevelsFromAnyTemplate(tpl, currentLevelOrder);
    combinedLevels.push(...cloned);
    currentLevelOrder += cloned.length;
  });

  const primaryTitle = templates.map((t) => t.title || t.name).join(' + ');

  return {
    id: newJourneyId,
    templateId: templates[0]?.id || 'composite-journey',
    templateVersion: 1,
    name: journeyOptions.name || `My ${primaryTitle} Journey`,
    description: journeyOptions.description || `Comprehensive multi-curriculum journey combining ${templates.length} templates.`,
    goal: journeyOptions.goal || 'Career & Technical Mastery',
    category: journeyOptions.category || templates[0]?.category || 'Engineering',
    difficulty: journeyOptions.difficulty || 'All Levels',
    targetDate: journeyOptions.targetDate || '',
    trackingModel: journeyOptions.trackingModel || 'skill-development',
    skillDimensions: [
      { id: 'understanding', name: 'Conceptual Understanding', maxScore: 5 },
      { id: 'implementation', name: 'Hands-on Implementation', maxScore: 5 },
      { id: 'debugging', name: 'Debugging & Diagnostics', maxScore: 5 },
      { id: 'practice', name: 'Practice Challenges', maxScore: 5 },
      { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
    ],
    features: {
      projects: true,
      interviews: true,
      aiIndependence: true,
    },
    isArchived: false,
    enableAIDependency: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    levels: combinedLevels,
    projects: [],
    learningLogs: [],
    aiDependency: [],
    notes: [],
  };
}
