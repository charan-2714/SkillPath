// src/context/AppContext.jsx
// Centralized state management for SkillPath with Firestore sync, Recycle Bin, and Admin curriculum management

import React, { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';
import {
  loadAppData,
  saveAppData,
  createInitialState,
  setupFirestoreSync,
  syncActionToFirestore,
} from '../services/storageService';
import { generateId, createNewJourney, createNewRecycleItem } from '../models/journeySchema';
import { ROLE_TEMPLATES } from '../data/roles';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

export const ACTIONS = {
  SET_ACTIVE_JOURNEY: 'SET_ACTIVE_JOURNEY',
  CREATE_JOURNEY: 'CREATE_JOURNEY',
  UPDATE_JOURNEY: 'UPDATE_JOURNEY',
  DELETE_JOURNEY: 'DELETE_JOURNEY',
  DUPLICATE_JOURNEY: 'DUPLICATE_JOURNEY',
  ARCHIVE_JOURNEY: 'ARCHIVE_JOURNEY',

  // Levels
  ADD_LEVEL: 'ADD_LEVEL',
  UPDATE_LEVEL: 'UPDATE_LEVEL',
  DELETE_LEVEL: 'DELETE_LEVEL',
  REORDER_LEVEL: 'REORDER_LEVEL',

  // Subjects
  ADD_SUBJECT: 'ADD_SUBJECT',
  UPDATE_SUBJECT: 'UPDATE_SUBJECT',
  DELETE_SUBJECT: 'DELETE_SUBJECT',
  REORDER_SUBJECT: 'REORDER_SUBJECT',

  // Topics
  ADD_TOPIC: 'ADD_TOPIC',
  UPDATE_TOPIC: 'UPDATE_TOPIC',
  DELETE_TOPIC: 'DELETE_TOPIC',
  REORDER_TOPIC: 'REORDER_TOPIC',

  // Topic Details
  TOGGLE_LEARNING_ITEM: 'TOGGLE_LEARNING_ITEM',
  ADD_LEARNING_ITEM: 'ADD_LEARNING_ITEM',
  UPDATE_LEARNING_ITEM: 'UPDATE_LEARNING_ITEM',
  DELETE_LEARNING_ITEM: 'DELETE_LEARNING_ITEM',
  UPDATE_TOPIC_SKILL: 'UPDATE_TOPIC_SKILL',
  UPDATE_PRACTICE_ITEM: 'UPDATE_PRACTICE_ITEM',
  UPDATE_DEBUGGING_ITEM: 'UPDATE_DEBUGGING_ITEM',
  UPDATE_ASSESSMENT_ITEM: 'UPDATE_ASSESSMENT_ITEM',
  UPDATE_INDEPENDENCE_CHECK: 'UPDATE_INDEPENDENCE_CHECK',
  ADD_RESOURCE_ITEM: 'ADD_RESOURCE_ITEM',
  UPDATE_RESOURCE_ITEM: 'UPDATE_RESOURCE_ITEM',
  DELETE_RESOURCE_ITEM: 'DELETE_RESOURCE_ITEM',

  // Projects
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',

  // Learning Logs
  ADD_LEARNING_LOG: 'ADD_LEARNING_LOG',
  DELETE_LEARNING_LOG: 'DELETE_LEARNING_LOG',

  // AI Dependency
  ADD_AI_DEPENDENCY: 'ADD_AI_DEPENDENCY',
  DELETE_AI_DEPENDENCY: 'DELETE_AI_DEPENDENCY',

  // Notes
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',

  // Recycle Bin (Soft Delete & Restore)
  SOFT_DELETE_ITEM: 'SOFT_DELETE_ITEM',
  RESTORE_ITEM: 'RESTORE_ITEM',
  PERMANENT_DELETE_ITEM: 'PERMANENT_DELETE_ITEM',
  EMPTY_RECYCLE_BIN: 'EMPTY_RECYCLE_BIN',

  // Real-time Firestore Sync Actions
  SYNC_FIRESTORE_JOURNEYS: 'SYNC_FIRESTORE_JOURNEYS',
  SYNC_FIRESTORE_LOGS: 'SYNC_FIRESTORE_LOGS',
  SYNC_FIRESTORE_RECYCLE_BIN: 'SYNC_FIRESTORE_RECYCLE_BIN',

  // App Level
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  UPDATE_ANALYTICS: 'UPDATE_ANALYTICS',
  IMPORT_STATE: 'IMPORT_STATE',
  RESET_STATE: 'RESET_STATE',
};

function duplicateJourneyObject(original) {
  const newJId = generateId('journey');
  const clonedLevels = (original.levels || []).map((lvl, lIdx) => ({
    ...lvl,
    id: generateId('lvl'),
    order: lIdx + 1,
    subjects: (lvl.subjects || []).map((sub, sIdx) => ({
      ...sub,
      id: generateId('subj'),
      order: sIdx + 1,
      topics: (sub.topics || []).map((top) => ({
        ...top,
        id: generateId('topic'),
        learningItems: (top.learningItems || []).map((i) => ({ ...i, id: generateId('item') })),
        practice: (top.practice || []).map((p) => ({ ...p, id: generateId('prac') })),
        debugging: (top.debugging || []).map((d) => ({ ...d, id: generateId('dbg') })),
        assessments: (top.assessments || []).map((a) => ({ ...a, id: generateId('assess') })),
        resources: (top.resources || []).map((r) => ({ ...r, id: generateId('res') })),
      })),
    })),
  }));

  return {
    ...original,
    id: newJId,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    levels: clonedLevels,
    projects: (original.projects || []).map((p) => ({ ...p, id: generateId('proj') })),
    notes: (original.notes || []).map((n) => ({ ...n, id: generateId('note') })),
    learningLogs: [],
    aiDependency: [],
  };
}

function updateTopicInJourney(journey, topicId, updater) {
  return {
    ...journey,
    updatedAt: new Date().toISOString(),
    levels: (journey.levels || []).map((lvl) => ({
      ...lvl,
      subjects: (lvl.subjects || []).map((sub) => ({
        ...sub,
        topics: (sub.topics || []).map((top) => {
          if (String(top.id) === String(topicId)) {
            return updater(top);
          }
          return top;
        }),
      })),
    })),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_JOURNEY:
      return { ...state, activeJourneyId: action.payload };

    case ACTIONS.CREATE_JOURNEY: {
      const newJourney = action.payload;
      return {
        ...state,
        journeys: [newJourney, ...state.journeys],
        activeJourneyId: newJourney.id,
      };
    }

    case ACTIONS.UPDATE_JOURNEY: {
      const { journeyId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === journeyId ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j
        ),
      };
    }

    case ACTIONS.DELETE_JOURNEY: {
      const remaining = state.journeys.filter((j) => j.id !== action.payload);
      return {
        ...state,
        journeys: remaining,
        activeJourneyId: state.activeJourneyId === action.payload ? (remaining[0]?.id || null) : state.activeJourneyId,
      };
    }

    case ACTIONS.DUPLICATE_JOURNEY: {
      const target = state.journeys.find((j) => j.id === action.payload);
      if (!target) return state;
      const dup = duplicateJourneyObject(target);
      return {
        ...state,
        journeys: [dup, ...state.journeys],
        activeJourneyId: dup.id,
      };
    }

    case ACTIONS.ARCHIVE_JOURNEY: {
      const { journeyId, isArchived } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === journeyId ? { ...j, isArchived, updatedAt: new Date().toISOString() } : j
        ),
      };
    }

    // Level Management
    case ACTIONS.ADD_LEVEL: {
      const { journeyId, level } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = [...(j.levels || []), { ...level, order: (j.levels || []).length + 1 }];
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.UPDATE_LEVEL: {
      const { journeyId, levelId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) =>
            lvl.id === levelId ? { ...lvl, ...updates } : lvl
          );
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.DELETE_LEVEL: {
      const { journeyId, levelId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).filter((lvl) => lvl.id !== levelId);
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.REORDER_LEVEL: {
      const { journeyId, levelId, direction } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = [...(j.levels || [])];
          const idx = levels.findIndex((l) => l.id === levelId);
          if (idx === -1) return j;
          const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (targetIdx < 0 || targetIdx >= levels.length) return j;
          const [moved] = levels.splice(idx, 1);
          levels.splice(targetIdx, 0, moved);
          levels.forEach((l, i) => { l.order = i + 1; });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    // Subject Management
    case ACTIONS.ADD_SUBJECT: {
      const { journeyId, levelId, subject } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = [...(lvl.subjects || []), { ...subject, order: (lvl.subjects || []).length + 1 }];
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.UPDATE_SUBJECT: {
      const { journeyId, levelId, subjectId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = (lvl.subjects || []).map((sub) =>
              sub.id === subjectId ? { ...sub, ...updates } : sub
            );
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.DELETE_SUBJECT: {
      const { journeyId, levelId, subjectId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = (lvl.subjects || []).filter((sub) => sub.id !== subjectId);
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.REORDER_SUBJECT: {
      const { journeyId, levelId, subjectId, direction } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = [...(lvl.subjects || [])];
            const idx = subjects.findIndex((s) => s.id === subjectId);
            if (idx === -1) return lvl;
            const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= subjects.length) return lvl;
            const [moved] = subjects.splice(idx, 1);
            subjects.splice(targetIdx, 0, moved);
            subjects.forEach((s, i) => { s.order = i + 1; });
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    // Topic Management
    case ACTIONS.ADD_TOPIC: {
      const { journeyId, levelId, subjectId, topic } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = (lvl.subjects || []).map((sub) => {
              if (sub.id !== subjectId) return sub;
              return { ...sub, topics: [...(sub.topics || []), topic] };
            });
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.UPDATE_TOPIC: {
      const { journeyId, topicId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            ...updates,
            lastReviewed: new Date().toISOString(),
          }));
        }),
      };
    }

    case ACTIONS.DELETE_TOPIC: {
      const { journeyId, levelId, subjectId, topicId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (levelId && lvl.id !== levelId) return lvl;
            const subjects = (lvl.subjects || []).map((sub) => {
              if (subjectId && sub.id !== subjectId) return sub;
              return { ...sub, topics: (sub.topics || []).filter((t) => t.id !== topicId) };
            });
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.REORDER_TOPIC: {
      const { journeyId, levelId, subjectId, topicId, direction } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          const levels = (j.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            const subjects = (lvl.subjects || []).map((sub) => {
              if (sub.id !== subjectId) return sub;
              const topics = [...(sub.topics || [])];
              const idx = topics.findIndex((t) => t.id === topicId);
              if (idx === -1) return sub;
              const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
              if (targetIdx < 0 || targetIdx >= topics.length) return sub;
              const [moved] = topics.splice(idx, 1);
              topics.splice(targetIdx, 0, moved);
              return { ...sub, topics };
            });
            return { ...lvl, subjects };
          });
          return { ...j, levels, updatedAt: new Date().toISOString() };
        }),
      };
    }

    // Topic Details
    case ACTIONS.TOGGLE_LEARNING_ITEM: {
      const { journeyId, topicId, itemId, completed } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            learningItems: (top.learningItems || []).map((item) =>
              item.id === itemId ? { ...item, completed } : item
            ),
          }));
        }),
      };
    }

    case ACTIONS.ADD_LEARNING_ITEM: {
      const { journeyId, topicId, item } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            learningItems: [...(top.learningItems || []), item],
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_LEARNING_ITEM: {
      const { journeyId, topicId, itemId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            learningItems: (top.learningItems || []).map((item) =>
              item.id === itemId ? { ...item, ...updates } : item
            ),
          }));
        }),
      };
    }

    case ACTIONS.DELETE_LEARNING_ITEM: {
      const { journeyId, topicId, itemId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            learningItems: (top.learningItems || []).filter((item) => item.id !== itemId),
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_TOPIC_SKILL: {
      const { journeyId, topicId, dimensionId, score } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            skillScores: { ...(top.skillScores || {}), [dimensionId]: score },
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_PRACTICE_ITEM: {
      const { journeyId, topicId, practiceId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            practice: (top.practice || []).map((p) =>
              p.id === practiceId ? { ...p, ...updates } : p
            ),
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_DEBUGGING_ITEM: {
      const { journeyId, topicId, debuggingId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            debugging: (top.debugging || []).map((d) =>
              d.id === debuggingId ? { ...d, ...updates } : d
            ),
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_ASSESSMENT_ITEM: {
      const { journeyId, topicId, assessmentId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            assessments: (top.assessments || []).map((a) =>
              a.id === assessmentId ? { ...a, ...updates } : a
            ),
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_INDEPENDENCE_CHECK: {
      const { journeyId, topicId, key, value } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            lastReviewed: new Date().toISOString(),
            independenceCheck: { ...(top.independenceCheck || {}), [key]: value },
          }));
        }),
      };
    }

    case ACTIONS.ADD_RESOURCE_ITEM: {
      const { journeyId, topicId, resource } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            resources: [...(top.resources || []), resource],
          }));
        }),
      };
    }

    case ACTIONS.UPDATE_RESOURCE_ITEM: {
      const { journeyId, topicId, resourceId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            resources: (top.resources || []).map((r) =>
              r.id === resourceId ? { ...r, ...updates } : r
            ),
          }));
        }),
      };
    }

    case ACTIONS.DELETE_RESOURCE_ITEM: {
      const { journeyId, topicId, resourceId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return updateTopicInJourney(j, topicId, (top) => ({
            ...top,
            resources: (top.resources || []).filter((r) => r.id !== resourceId),
          }));
        }),
      };
    }

    // Projects
    case ACTIONS.ADD_PROJECT: {
      const { journeyId, project } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return { ...j, projects: [...(j.projects || []), project], updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.UPDATE_PROJECT: {
      const { journeyId, projectId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return {
            ...j,
            projects: (j.projects || []).map((p) => (p.id === projectId ? { ...p, ...updates } : p)),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case ACTIONS.DELETE_PROJECT: {
      const { journeyId, projectId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return {
            ...j,
            projects: (j.projects || []).filter((p) => p.id !== projectId),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    // Learning Logs
    case ACTIONS.ADD_LEARNING_LOG: {
      const { journeyId, log } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return { ...j, learningLogs: [log, ...(j.learningLogs || [])], updatedAt: new Date().toISOString() };
        }),
        learningLogs: [log, ...(state.learningLogs || [])],
      };
    }

    case ACTIONS.DELETE_LEARNING_LOG: {
      const { journeyId, logId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return {
            ...j,
            learningLogs: (j.learningLogs || []).filter((l) => l.id !== logId),
            updatedAt: new Date().toISOString(),
          };
        }),
        learningLogs: (state.learningLogs || []).filter((l) => l.id !== logId),
      };
    }

    // AI Dependency
    case ACTIONS.ADD_AI_DEPENDENCY: {
      const { journeyId, log } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return { ...j, aiDependency: [log, ...(j.aiDependency || [])], updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.DELETE_AI_DEPENDENCY: {
      const { journeyId, logId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return {
            ...j,
            aiDependency: (j.aiDependency || []).filter((l) => l.id !== logId),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    // Notes
    case ACTIONS.ADD_NOTE: {
      const { journeyId, note } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return { ...j, notes: [note, ...(j.notes || [])], updatedAt: new Date().toISOString() };
        }),
      };
    }

    case ACTIONS.UPDATE_NOTE: {
      const { journeyId, noteId, updates } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return {
            ...j,
            notes: (j.notes || []).map((n) => (n.id === noteId ? { ...n, ...updates } : n)),
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    case ACTIONS.DELETE_NOTE: {
      const { journeyId, noteId } = action.payload;
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== journeyId) return j;
          return { ...j, notes: (j.notes || []).filter((n) => n.id !== noteId), updatedAt: new Date().toISOString() };
        }),
      };
    }

    // Recycle Bin Actions
    case ACTIONS.SOFT_DELETE_ITEM: {
      const recycleItem = action.payload;
      return {
        ...state,
        recycleBin: [recycleItem, ...(state.recycleBin || [])],
      };
    }

    case ACTIONS.RESTORE_ITEM: {
      const { itemId } = action.payload;
      const targetItem = (state.recycleBin || []).find((i) => i.id === itemId);
      if (!targetItem) return state;

      const remainingRecycle = (state.recycleBin || []).filter((i) => i.id !== itemId);
      const { itemType, data, originalJourneyId, originalLevelId, originalSubjectId } = targetItem;

      if (itemType === 'journey') {
        return {
          ...state,
          journeys: [data, ...state.journeys],
          recycleBin: remainingRecycle,
          activeJourneyId: data.id,
        };
      }

      const updatedJourneys = state.journeys.map((j) => {
        if (j.id !== originalJourneyId) return j;

        if (itemType === 'level') {
          return { ...j, levels: [...(j.levels || []), data], updatedAt: new Date().toISOString() };
        }

        if (itemType === 'subject') {
          return {
            ...j,
            levels: (j.levels || []).map((lvl) =>
              lvl.id === originalLevelId ? { ...lvl, subjects: [...(lvl.subjects || []), data] } : lvl
            ),
            updatedAt: new Date().toISOString(),
          };
        }

        if (itemType === 'topic') {
          return {
            ...j,
            levels: (j.levels || []).map((lvl) => {
              if (originalLevelId && lvl.id !== originalLevelId) return lvl;
              return {
                ...lvl,
                subjects: (lvl.subjects || []).map((sub) => {
                  if (originalSubjectId && sub.id !== originalSubjectId) return sub;
                  return { ...sub, topics: [...(sub.topics || []), data] };
                }),
              };
            }),
            updatedAt: new Date().toISOString(),
          };
        }

        if (itemType === 'project') {
          return { ...j, projects: [...(j.projects || []), data], updatedAt: new Date().toISOString() };
        }

        return j;
      });

      return {
        ...state,
        journeys: updatedJourneys,
        recycleBin: remainingRecycle,
      };
    }

    case ACTIONS.PERMANENT_DELETE_ITEM: {
      return {
        ...state,
        recycleBin: (state.recycleBin || []).filter((i) => i.id !== action.payload),
      };
    }

    case ACTIONS.EMPTY_RECYCLE_BIN: {
      return {
        ...state,
        recycleBin: [],
      };
    }

    // Firestore Sync
    case ACTIONS.SYNC_FIRESTORE_JOURNEYS: {
      if (!action.payload || action.payload.length === 0) return state;
      return {
        ...state,
        journeys: action.payload,
        activeJourneyId: state.activeJourneyId || action.payload[0]?.id,
      };
    }

    case ACTIONS.SYNC_FIRESTORE_LOGS: {
      return {
        ...state,
        learningLogs: action.payload || [],
      };
    }

    case ACTIONS.SYNC_FIRESTORE_RECYCLE_BIN: {
      return {
        ...state,
        recycleBin: action.payload || [],
      };
    }

    // App Settings & Analytics
    case ACTIONS.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case ACTIONS.UPDATE_ANALYTICS:
      return { ...state, analytics: { ...state.analytics, ...action.payload } };

    case ACTIONS.IMPORT_STATE:
      return { ...action.payload };

    case ACTIONS.RESET_STATE:
      return action.payload;

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, null, () => loadAppData());

  // Master Templates in-memory state for Admin Curriculum Management
  const [masterTemplates, setMasterTemplates] = useState(() => {
    try {
      const cached = localStorage.getItem('skillpath_master_templates');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p) => p.id));
          const newSysTemplates = ROLE_TEMPLATES.filter((t) => !existingIds.has(t.id));
          return [...parsed, ...newSysTemplates];
        }
      }
    } catch (e) {
      console.warn('Failed to load cached master templates:', e);
    }
    return ROLE_TEMPLATES;
  });

  const [adminRecycleBin, setAdminRecycleBin] = useState(() => {
    try {
      const cached = localStorage.getItem('skillpath_admin_recycle_bin');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  // Auto-save master templates and admin recycle bin
  useEffect(() => {
    try {
      localStorage.setItem('skillpath_master_templates', JSON.stringify(masterTemplates));
    } catch (e) {
      console.warn('Failed to save master templates:', e);
    }
  }, [masterTemplates]);

  useEffect(() => {
    try {
      localStorage.setItem('skillpath_admin_recycle_bin', JSON.stringify(adminRecycleBin));
    } catch (e) {
      console.warn('Failed to save admin recycle bin:', e);
    }
  }, [adminRecycleBin]);

  // Auto-save on every state change to local cache
  useEffect(() => {
    saveAppData(state);
  }, [state]);

  // Real-time Firestore sync when authenticated
  useEffect(() => {
    if (user?.uid) {
      const cleanup = setupFirestoreSync(user.uid, dispatch);
      return cleanup;
    }
  }, [user?.uid]);

  // Wrapper dispatch that pushes persistent actions to Firestore in background
  const syncedDispatch = (action) => {
    const nextState = reducer(state, action);
    dispatch(action);
    if (user?.uid) {
      syncActionToFirestore(user.uid, action, nextState);
    }
  };

  // Update study streak on mount & when user authenticates
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastActive = state.analytics?.lastActiveDate;
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const prevStreak = Number(state.analytics?.streakDays) || 0;
      const streak = lastActive === yesterday ? prevStreak + 1 : 1;
      syncedDispatch({
        type: ACTIONS.UPDATE_ANALYTICS,
        payload: { lastActiveDate: today, streakDays: streak },
      });
    }
  }, [user?.uid, state.analytics?.lastActiveDate]);

  // Compute active journey
  const activeJourney = useMemo(() => {
    if (!state.journeys || state.journeys.length === 0) return null;
    const found = state.journeys.find((j) => j.id === state.activeJourneyId);
    return found || state.journeys[0] || null;
  }, [state.journeys, state.activeJourneyId]);

  // Helper to soft-delete an item
  const softDeleteItem = (itemType, itemData, contextInfo = {}) => {
    const recycleItem = createNewRecycleItem({
      itemType,
      title: itemData.title || itemData.name || 'Untitled Item',
      description: itemData.description || '',
      originalJourneyId: contextInfo.journeyId || activeJourney?.id,
      originalJourneyName: contextInfo.journeyName || activeJourney?.name,
      originalLevelId: contextInfo.levelId,
      originalLevelTitle: contextInfo.levelTitle,
      originalSubjectId: contextInfo.subjectId,
      originalSubjectTitle: contextInfo.subjectTitle,
      originalTopicId: contextInfo.topicId,
      originalTopicTitle: contextInfo.topicTitle,
      data: itemData,
    });

    syncedDispatch({
      type: ACTIONS.SOFT_DELETE_ITEM,
      payload: recycleItem,
    });

    // Execute tree deletion
    if (itemType === 'journey') {
      syncedDispatch({ type: ACTIONS.DELETE_JOURNEY, payload: itemData.id });
    } else if (itemType === 'level') {
      syncedDispatch({
        type: ACTIONS.DELETE_LEVEL,
        payload: { journeyId: contextInfo.journeyId, levelId: itemData.id },
      });
    } else if (itemType === 'subject') {
      syncedDispatch({
        type: ACTIONS.DELETE_SUBJECT,
        payload: { journeyId: contextInfo.journeyId, levelId: contextInfo.levelId, subjectId: itemData.id },
      });
    } else if (itemType === 'topic') {
      syncedDispatch({
        type: ACTIONS.DELETE_TOPIC,
        payload: {
          journeyId: contextInfo.journeyId,
          levelId: contextInfo.levelId,
          subjectId: contextInfo.subjectId,
          topicId: itemData.id,
        },
      });
    } else if (itemType === 'project') {
      syncedDispatch({
        type: ACTIONS.DELETE_PROJECT,
        payload: { journeyId: contextInfo.journeyId, projectId: itemData.id },
      });
    }
  };

  // Helper to find topic location
  const getTopicLocation = useMemo(() => {
    return (topicId, specificJourneyId = null) => {
      const targetJourney = specificJourneyId
        ? state.journeys.find((j) => j.id === specificJourneyId)
        : activeJourney;

      if (!targetJourney || !targetJourney.levels) return null;

      for (const level of targetJourney.levels) {
        for (const subject of (level.subjects || [])) {
          for (const topic of (subject.topics || [])) {
            if (topic.id === topicId) {
              return { journey: targetJourney, level, subject, topic };
            }
          }
        }
      }
      return null;
    };
  }, [state.journeys, activeJourney]);

  // Admin Master Template Helper Actions
  const updateMasterTemplate = (templateId, updater) => {
    setMasterTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? updater(t) : t))
    );
  };

  const softDeleteMasterTemplateItem = (templateId, itemType, itemData, pathInfo) => {
    const deletedRecycle = {
      id: generateId('adm-recycle'),
      templateId,
      itemType,
      title: itemData.title || itemData.name || 'Untitled Item',
      deletedAt: new Date().toISOString(),
      pathInfo,
      data: itemData,
    };
    setAdminRecycleBin((prev) => [deletedRecycle, ...prev]);
  };

  const restoreMasterTemplateItem = (recycleId) => {
    const item = adminRecycleBin.find((i) => i.id === recycleId);
    if (!item) return;
    setAdminRecycleBin((prev) => prev.filter((i) => i.id !== recycleId));
    // Re-insert into master template
    updateMasterTemplate(item.templateId, (template) => {
      if (item.itemType === 'level') {
        return { ...template, levels: [...(template.levels || []), item.data] };
      }
      return template;
    });
  };

  const permanentDeleteMasterTemplateItem = (recycleId) => {
    setAdminRecycleBin((prev) => prev.filter((i) => i.id !== recycleId));
  };

  const value = {
    state,
    dispatch: syncedDispatch,
    activeJourney,
    getTopicLocation,
    softDeleteItem,
    // Admin state
    masterTemplates,
    adminRecycleBin,
    updateMasterTemplate,
    softDeleteMasterTemplateItem,
    restoreMasterTemplateItem,
    permanentDeleteMasterTemplateItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
