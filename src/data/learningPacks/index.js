// src/data/learningPacks/index.js
// Centralized Learning Packs Registry, Composition Engine & Journey Cloner

import { programmingFundamentalsPack } from './programmingFundamentals';
import { dsaProblemSolvingPack } from './dsaProblemSolving';
import { csFundamentalsPack } from './csFundamentals';
import { sqlDatabasesPack } from './sqlDatabases';
import { aptitudePack } from './aptitude';
import { logicalReasoningPack } from './logicalReasoning';
import { verbalAbilityPack } from './verbalAbility';
import { webFundamentalsPack } from './webFundamentals';
import { gitDeveloperToolsPack } from './gitDeveloperTools';
import { interviewPreparationPack } from './interviewPreparation';
import { resumeProjectsPack } from './resumeProjects';
import {
  placementFundamentalsPack,
  softwareDeveloperPlacementPack,
  backendDeveloperFoundationPack,
  fullStackDeveloperPack,
  dataAiFoundationsPack,
  cloudDevopsFoundationPack,
  cybersecurityFoundationPack,
  dataEngineeringFoundationPack,
  mlopsFoundationPack,
} from './bundles';
import { generateId, createNewJourney } from '../../models/journeySchema';

export const CORE_LEARNING_PACKS = [
  // 1. Placement Essentials & Student Bundles
  placementFundamentalsPack,
  softwareDeveloperPlacementPack,
  aptitudePack,
  logicalReasoningPack,
  verbalAbilityPack,

  // 2. Fundamental CS & Problem Solving
  programmingFundamentalsPack,
  dsaProblemSolvingPack,
  csFundamentalsPack,
  sqlDatabasesPack,

  // 3. Technical Engineering Tools & Web
  webFundamentalsPack,
  gitDeveloperToolsPack,

  // 4. Career & Projects
  interviewPreparationPack,
  resumeProjectsPack,

  // 5. Specialized Domain Foundations
  backendDeveloperFoundationPack,
  fullStackDeveloperPack,
  dataAiFoundationsPack,
  cloudDevopsFoundationPack,
  cybersecurityFoundationPack,
  dataEngineeringFoundationPack,
  mlopsFoundationPack,
];

export const LEARNING_PACKS = CORE_LEARNING_PACKS.map((pack) => ({
  ...pack,
  title: pack.title || pack.name || 'Untitled Learning Pack',
  name: pack.name || pack.title || 'Untitled Learning Pack',
  status: pack.status || 'Production Standard',
  version: pack.version || '1.0',
  technologies: Array.isArray(pack.technologies) ? pack.technologies : (pack.tags || []),
  subjectsCount: (pack.subjects || []).length,
  totalTopicsCount: (pack.subjects || []).reduce((acc, sub) => acc + (sub.topics || []).length, 0),
  totalLearningItemsCount: (pack.subjects || []).reduce(
    (acc, sub) =>
      acc + (sub.topics || []).reduce((tAcc, top) => tAcc + (top.learningItems || []).length, 0),
    0
  ),
}));

export const PACK_CATEGORIES = [
  'All',
  'Placement Preparation',
  'Foundations',
  'Technical Skills',
  'Domain Foundations',
  'Career & Interview',
];

export function getLearningPackById(id) {
  if (!id) return null;
  return LEARNING_PACKS.find((p) => p.id === id || p.slug === id) || null;
}

export function getLearningPackBySlug(slug) {
  if (!slug) return null;
  return LEARNING_PACKS.find((p) => p.slug === slug || p.id === slug) || null;
}

/**
 * Deep-clones one or more Learning Packs into an independent user journey.
 * Shared subjects are deduplicated by title to create a clean, unified curriculum.
 */
export function cloneJourneyFromPacks(packs, customParams = {}) {
  const packList = Array.isArray(packs) ? packs : [packs];
  if (packList.length === 0) return null;

  const primaryPack = packList[0];
  const journeyTitle =
    customParams.name ||
    (packList.length === 1
      ? `My ${primaryPack.title} Journey`
      : `Combined: ${packList.map((p) => p.title).join(' + ')}`);

  const combinedSubjectsMap = new Map();

  packList.forEach((pack) => {
    // If selectedSubjectIds are provided in customParams, filter them
    const allowedSubjectIds = customParams.selectedSubjectIds;
    const subjectsToProcess = (pack.subjects || []).filter((s) =>
      allowedSubjectIds ? allowedSubjectIds.includes(s.id) || allowedSubjectIds.includes(s.title) : true
    );

    subjectsToProcess.forEach((subject) => {
      const normalizedTitle = (subject.title || '').trim().toLowerCase();
      // Deduplicate shared subjects across combined packs
      if (!combinedSubjectsMap.has(normalizedTitle)) {
        combinedSubjectsMap.set(normalizedTitle, subject);
      }
    });
  });

  const dedupedSubjects = Array.from(combinedSubjectsMap.values());

  // Organize subjects into clean Milestone Levels (e.g. 3-4 subjects per milestone level)
  const LEVEL_CHUNK_SIZE = 3;
  const levels = [];
  let currentLevelIdx = 0;

  for (let i = 0; i < dedupedSubjects.length; i += LEVEL_CHUNK_SIZE) {
    const chunk = dedupedSubjects.slice(i, i + LEVEL_CHUNK_SIZE);
    const lvlId = generateId('lvl');

    const clonedSubjects = chunk.map((subj, sIdx) => {
      const subjId = generateId('subj');
      const clonedTopics = (subj.topics || []).map((topic, tIdx) => {
        const topicId = generateId('topic');

        const clonedLearningItems = (topic.learningItems || []).map((item, idx) => ({
          id: generateId('item'),
          templateId: item.id || null,
          title: item.title,
          description: item.description || '',
          type: item.type || 'concept',
          completed: false,
          notes: '',
        }));

        const clonedPractice = (topic.practice || []).map((p) => ({
          id: generateId('prac'),
          templateId: p.id || null,
          title: p.title,
          description: p.description || '',
          difficulty: p.difficulty || 'medium',
          type: p.type || 'coding',
          status: 'not-started',
          problemId: p.problemId || null,
          leetcodeUrl: p.leetcodeUrl || null,
          notes: '',
        }));

        const clonedDebugging = (topic.debugging || []).map((d) => ({
          id: generateId('dbg'),
          templateId: d.id || null,
          title: d.title,
          description: d.description || '',
          errorType: d.errorType || 'logic',
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
          completed: false,
        }));

        return {
          id: topicId,
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
        id: subjId,
        templateId: subj.id || null,
        title: subj.title,
        description: subj.description || '',
        order: sIdx + 1,
        topics: clonedTopics,
      };
    });

    const levelColors = ['slate', 'indigo', 'emerald', 'sky', 'purple', 'amber', 'rose', 'teal'];
    const color = levelColors[currentLevelIdx % levelColors.length];

    levels.push({
      id: lvlId,
      title: chunk.length === 1 ? chunk[0].title : `Milestone 0${currentLevelIdx}: ${chunk[0].title}`,
      description: `Core modules: ${chunk.map((c) => c.title).join(', ')}`,
      order: currentLevelIdx,
      color,
      subjects: clonedSubjects,
    });

    currentLevelIdx += 1;
  }

  return createNewJourney({
    name: journeyTitle,
    description:
      customParams.description ||
      (packList.length === 1
        ? primaryPack.description
        : `Unified curriculum combining: ${packList.map((p) => p.title).join(', ')}`),
    goal: customParams.goal || 'Placement & Technical Mastery',
    category: primaryPack.category || 'Placement Preparation',
    difficulty: primaryPack.difficulty || 'All Levels',
    targetDate: customParams.targetDate || '',
    templateId: primaryPack.id,
    templateVersion: primaryPack.version || 1,
    levels,
  });
}

/**
 * Injects a Learning Pack into an existing active user journey without duplicating modules.
 */
export function addPackToJourney(journey, pack, selectedSubjectIds = null) {
  if (!journey || !pack) return journey;

  const existingSubjectTitles = new Set();
  (journey.levels || []).forEach((lvl) => {
    (lvl.subjects || []).forEach((s) => {
      existingSubjectTitles.add((s.title || '').trim().toLowerCase());
    });
  });

  const subjectsToInject = (pack.subjects || []).filter((s) => {
    if (selectedSubjectIds && selectedSubjectIds.length > 0) {
      return selectedSubjectIds.includes(s.id);
    }
    return true;
  });

  if (subjectsToInject.length === 0) return journey;

  // Create a new Milestone Level containing the pack's subjects
  const newLevelId = generateId('lvl');
  const levelIndex = (journey.levels || []).length;
  const levelColors = ['indigo', 'emerald', 'sky', 'purple', 'amber', 'rose', 'teal', 'slate'];
  const color = levelColors[levelIndex % levelColors.length];

  const clonedSubjects = subjectsToInject.map((subj, sIdx) => {
    const subjId = generateId('subj');
    const clonedTopics = (subj.topics || []).map((topic) => ({
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

  const newLevel = {
    id: newLevelId,
    title: `Pack: ${pack.title}`,
    description: pack.description || '',
    order: levelIndex,
    color,
    subjects: clonedSubjects,
  };

  return {
    ...journey,
    levels: [...(journey.levels || []), newLevel],
    updatedAt: new Date().toISOString(),
  };
}
