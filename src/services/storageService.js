// src/services/storageService.js
// Unified persistence layer coordinating Firestore real-time synchronization, local cache fallback, and export/import helpers

import { cloneJourneyFromTemplate, ROLE_TEMPLATES } from '../data/roles';
import {
  subscribeToUserJourneys,
  saveJourneyDoc,
  deleteJourneyDoc,
  subscribeToUserLearningLogs,
  saveLearningLogDoc,
  deleteLearningLogDoc,
  subscribeToUserRecycleBin,
  saveRecycleBinItem,
  deleteRecycleBinItem,
  subscribeToUserSettings,
  saveSettingsDoc,
  subscribeToUserAnalytics,
  saveAnalyticsDoc,
} from './firestoreService';
import { isFirebaseConfigured } from './firebase';

const STORAGE_KEY = 'skillpath_v2';

export function createInitialState() {
  return {
    version: 6,
    activeJourneyId: null,
    journeys: [],
    recycleBin: [],
    learningLogs: [],
    settings: {
      theme: 'light',
      dailyGoalMinutes: 45,
      notifications: true,
      compactView: false,
      aiIndependenceMode: true,
    },
    analytics: {
      streakDays: 0,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      totalStudyMinutes: 0,
    },
  };
}

export function loadAppData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialState();
      saveAppData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.journeys || !Array.isArray(parsed.journeys)) {
      return createInitialState();
    }
    // Ensure recycleBin exists in cache
    if (!parsed.recycleBin) {
      parsed.recycleBin = [];
    }

    // Sanitize and filter out legacy removed journeys (Spanish, Photography, and default auto-seeded AI/ML journey)
    parsed.journeys = (parsed.journeys || []).filter((j) => {
      const name = (j?.name || '').toLowerCase();
      const cat = (j?.category || '').toLowerCase();
      const isLegacyRemoved = name.includes('spanish') || name.includes('photography') || cat.includes('language');
      const isAutoDefault =
        (j.templateId === 'ai-ml-engineer' || j.id?.includes('ai-ml')) &&
        (j.name === 'My AI/ML Engineer Journey' || j.name === 'AI/ML Engineer') &&
        (j.completedTopics === 0 || !j.completedTopics);
      return !isLegacyRemoved && !isAutoDefault;
    });

    if (parsed.journeys.length === 0) {
      parsed.activeJourneyId = null;
    } else if (!parsed.journeys.some((j) => j.id === parsed.activeJourneyId)) {
      parsed.activeJourneyId = parsed.journeys[0]?.id || null;
    }

    parsed.version = 6;
    saveAppData(parsed);

    return parsed;
  } catch (err) {
    console.error('[StorageService] Error loading cached data:', err);
    return createInitialState();
  }
}

export function saveAppData(state) {
  try {
    if (!state) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[StorageService] Error caching state:', err);
  }
}

/**
 * Setup real-time Firestore listeners for an authenticated user.
 * Dispatches updates to AppContext so changes on Device A immediately reflect on Device B.
 */
export function setupFirestoreSync(uid, dispatch) {
  if (!isFirebaseConfigured || !uid) return () => {};

  const unsubJourneys = subscribeToUserJourneys(uid, (journeys) => {
    if (Array.isArray(journeys)) {
      if (journeys.length === 0) {
        // Automatically seed the Master AI/ML Engineer roadmap for new users in Firestore
        const defaultTemplate = ROLE_TEMPLATES.find((t) => t.id === 'ai-ml-engineer') || ROLE_TEMPLATES[0];
        if (defaultTemplate) {
          const initialJourney = cloneJourneyFromTemplate(defaultTemplate, 'My AI/ML Engineer Journey');
          saveJourneyDoc(uid, initialJourney);
          dispatch({ type: 'SYNC_FIRESTORE_JOURNEYS', payload: [initialJourney] });
        }
      } else {
        dispatch({ type: 'SYNC_FIRESTORE_JOURNEYS', payload: journeys });
      }
    }
  });

  const unsubLogs = subscribeToUserLearningLogs(uid, (logs) => {
    if (Array.isArray(logs)) {
      dispatch({ type: 'SYNC_FIRESTORE_LOGS', payload: logs });
    }
  });

  const unsubRecycle = subscribeToUserRecycleBin(uid, (items) => {
    if (Array.isArray(items)) {
      dispatch({ type: 'SYNC_FIRESTORE_RECYCLE_BIN', payload: items });
    }
  });

  const unsubSettings = subscribeToUserSettings(uid, (settings) => {
    if (settings) {
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    }
  });

  const unsubAnalytics = subscribeToUserAnalytics(uid, (analytics) => {
    if (analytics) {
      dispatch({ type: 'UPDATE_ANALYTICS', payload: analytics });
    }
  });

  return () => {
    unsubJourneys();
    unsubLogs();
    unsubRecycle();
    unsubSettings();
    unsubAnalytics();
  };
}

/**
 * Persist user action to Firestore in the background when authenticated.
 */
export async function syncActionToFirestore(uid, action, state) {
  if (!isFirebaseConfigured || !uid) return;

  try {
    switch (action.type) {
      case 'CREATE_JOURNEY':
      case 'UPDATE_JOURNEY':
      case 'ADD_LEVEL':
      case 'UPDATE_LEVEL':
      case 'DELETE_LEVEL':
      case 'REORDER_LEVEL':
      case 'ADD_SUBJECT':
      case 'UPDATE_SUBJECT':
      case 'DELETE_SUBJECT':
      case 'REORDER_SUBJECT':
      case 'ADD_TOPIC':
      case 'UPDATE_TOPIC':
      case 'DELETE_TOPIC':
      case 'REORDER_TOPIC':
      case 'TOGGLE_LEARNING_ITEM':
      case 'ADD_LEARNING_ITEM':
      case 'UPDATE_LEARNING_ITEM':
      case 'DELETE_LEARNING_ITEM':
      case 'UPDATE_TOPIC_SKILL':
      case 'UPDATE_PRACTICE_ITEM':
      case 'UPDATE_DEBUGGING_ITEM':
      case 'UPDATE_ASSESSMENT_ITEM':
      case 'UPDATE_INDEPENDENCE_CHECK':
      case 'ADD_RESOURCE_ITEM':
      case 'UPDATE_RESOURCE_ITEM':
      case 'DELETE_RESOURCE_ITEM':
      case 'ADD_PROJECT':
      case 'UPDATE_PROJECT':
      case 'DELETE_PROJECT':
      case 'ADD_NOTE':
      case 'UPDATE_NOTE':
      case 'DELETE_NOTE': {
        const journeyId = action.payload?.journeyId || action.payload?.id;
        if (journeyId) {
          const journey = state.journeys.find((j) => j.id === journeyId);
          if (journey) {
            await saveJourneyDoc(uid, journey);
          }
        }
        break;
      }

      case 'DELETE_JOURNEY': {
        const journeyId =
          typeof action.payload === 'object' && action.payload !== null
            ? action.payload.journeyId || action.payload.id
            : action.payload;
        if (journeyId) {
          await deleteJourneyDoc(uid, journeyId);
          const recycleItem = (state.recycleBin || []).find(
            (i) => i.originalJourneyId === journeyId || i.data?.id === journeyId
          );
          if (recycleItem) {
            await saveRecycleBinItem(uid, recycleItem);
          }
        }
        break;
      }

      case 'SOFT_DELETE_ITEM': {
        const recycleItem = action.payload;
        if (recycleItem) {
          await saveRecycleBinItem(uid, recycleItem);
        }
        break;
      }

      case 'PERMANENT_DELETE_ITEM': {
        const itemId = action.payload;
        if (itemId) {
          await deleteRecycleBinItem(uid, itemId);
        }
        break;
      }

      case 'ADD_LEARNING_LOG': {
        const log = action.payload?.log;
        if (log) {
          await saveLearningLogDoc(uid, log);
        }
        break;
      }

      case 'DELETE_LEARNING_LOG': {
        const logId = action.payload?.logId;
        if (logId) {
          await deleteLearningLogDoc(uid, logId);
        }
        break;
      }

      case 'UPDATE_SETTINGS': {
        await saveSettingsDoc(uid, action.payload);
        break;
      }

      case 'UPDATE_ANALYTICS': {
        await saveAnalyticsDoc(uid, action.payload || state.analytics);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.warn('[StorageService] Firestore background sync notice:', err.message);
  }
}

/**
 * Validate imported data structure.
 */
export function validateImportData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Uploaded file is not a valid JSON object.' };
  }
  if (!data.version) {
    return { valid: false, error: 'Missing export schema version.' };
  }
  if (!Array.isArray(data.journeys)) {
    return { valid: false, error: 'Missing journeys collection in export file.' };
  }

  for (const j of data.journeys) {
    if (!j.id || !j.name || !Array.isArray(j.levels)) {
      return { valid: false, error: `Invalid journey structure for "${j?.name || 'Unknown'}"` };
    }
  }

  return { valid: true };
}

/**
 * Export only user state (journeys, logs, recycle bin, settings), omitting master templates.
 */
export function exportAppData(state) {
  const exportPayload = {
    app: 'SkillPath',
    exportedAt: new Date().toISOString(),
    version: state.version || 1,
    journeys: state.journeys || [],
    recycleBin: state.recycleBin || [],
    learningLogs: state.learningLogs || [],
    settings: state.settings || {},
    analytics: state.analytics || {},
  };

  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Convenience export helper matching legacy signature
 */
export function exportBackup(state) {
  const jsonStr = exportAppData(state);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `skillpath-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Convenience import helper matching legacy signature
 */
export function importBackup(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const validation = validateImportData(data);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Malformed JSON file' };
  }
}

/**
 * Reset all local storage data and return fresh initial state
 */
export function resetAllData() {
  localStorage.removeItem(STORAGE_KEY);
  const fresh = createInitialState();
  saveAppData(fresh);
  return fresh;
}
