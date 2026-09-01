// src/services/firestoreService.js
// Cloud Firestore persistence layer with real-time listeners and CRUD operations

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

/**
 * Subscribe to a user's journeys in real-time.
 */
export function subscribeToUserJourneys(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const colRef = collection(db, 'users', uid, 'journeys');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const journeys = [];
        snapshot.forEach((docSnap) => {
          journeys.push(docSnap.data());
        });
        onData(journeys);
      },
      (err) => {
        console.error('[Firestore] Error subscribing to journeys:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Journey subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save / update a journey document in Firestore.
 */
export async function saveJourneyDoc(uid, journey) {
  if (!isFirebaseConfigured || !db || !uid || !journey?.id) return;
  try {
    const docRef = doc(db, 'users', uid, 'journeys', journey.id);
    await setDoc(docRef, { ...journey, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.error('[Firestore] Failed to save journey doc:', err);
    throw err;
  }
}

/**
 * Delete a journey document from Firestore.
 */
export async function deleteJourneyDoc(uid, journeyId) {
  if (!isFirebaseConfigured || !db || !uid || !journeyId) return;
  try {
    const docRef = doc(db, 'users', uid, 'journeys', journeyId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('[Firestore] Failed to delete journey doc:', err);
    throw err;
  }
}

/**
 * Subscribe to a user's study learning logs in real-time.
 */
export function subscribeToUserLearningLogs(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const colRef = collection(db, 'users', uid, 'learningLogs');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const logs = [];
        snapshot.forEach((docSnap) => {
          logs.push(docSnap.data());
        });
        onData(logs);
      },
      (err) => {
        console.error('[Firestore] Error subscribing to learning logs:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Learning logs subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save a study learning log document in Firestore.
 */
export async function saveLearningLogDoc(uid, log) {
  if (!isFirebaseConfigured || !db || !uid || !log?.id) return;
  try {
    const docRef = doc(db, 'users', uid, 'learningLogs', log.id);
    await setDoc(docRef, log, { merge: true });
  } catch (err) {
    console.error('[Firestore] Failed to save learning log doc:', err);
    throw err;
  }
}

/**
 * Delete a study learning log document in Firestore.
 */
export async function deleteLearningLogDoc(uid, logId) {
  if (!isFirebaseConfigured || !db || !uid || !logId) return;
  try {
    const docRef = doc(db, 'users', uid, 'learningLogs', logId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('[Firestore] Failed to delete learning log doc:', err);
    throw err;
  }
}

/**
 * Subscribe to a user's Recycle Bin items in real-time.
 */
export function subscribeToUserRecycleBin(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const colRef = collection(db, 'users', uid, 'recycleBin');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data());
        });
        onData(items);
      },
      (err) => {
        console.error('[Firestore] Error subscribing to recycle bin:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Recycle bin subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save a soft-deleted item to the user's Recycle Bin in Firestore.
 */
export async function saveRecycleBinItem(uid, item) {
  if (!isFirebaseConfigured || !db || !uid || !item?.id) return;
  try {
    const docRef = doc(db, 'users', uid, 'recycleBin', item.id);
    await setDoc(docRef, { ...item, deletedAt: item.deletedAt || new Date().toISOString() });
  } catch (err) {
    console.error('[Firestore] Failed to save recycle bin item:', err);
    throw err;
  }
}

/**
 * Delete an item permanently from the Recycle Bin in Firestore.
 */
export async function deleteRecycleBinItem(uid, itemId) {
  if (!isFirebaseConfigured || !db || !uid || !itemId) return;
  try {
    const docRef = doc(db, 'users', uid, 'recycleBin', itemId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('[Firestore] Failed to delete recycle bin item:', err);
    throw err;
  }
}

/**
 * Subscribe to user preferences & settings in real-time.
 */
export function subscribeToUserSettings(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const docRef = doc(db, 'users', uid, 'settings', 'preferences');
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onData(snapshot.data());
        }
      },
      (err) => {
        console.error('[Firestore] Error subscribing to settings:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Settings subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save user settings to Firestore.
 */
export async function saveSettingsDoc(uid, settings) {
  if (!isFirebaseConfigured || !db || !uid) return;
  try {
    const docRef = doc(db, 'users', uid, 'settings', 'preferences');
    await setDoc(docRef, settings, { merge: true });
  } catch (err) {
    console.error('[Firestore] Failed to save settings doc:', err);
  }
}

/**
 * Subscribe to user analytics (streak, study metrics) in real-time.
 */
export function subscribeToUserAnalytics(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const docRef = doc(db, 'users', uid, 'settings', 'analytics');
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onData(snapshot.data());
        }
      },
      (err) => {
        console.error('[Firestore] Error subscribing to analytics:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Analytics subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save user analytics (streak, study minutes, lastActiveDate) to Firestore.
 */
export async function saveAnalyticsDoc(uid, analytics) {
  if (!isFirebaseConfigured || !db || !uid) return;
  try {
    const docRef = doc(db, 'users', uid, 'settings', 'analytics');
    await setDoc(docRef, analytics, { merge: true });
  } catch (err) {
    console.error('[Firestore] Failed to save analytics doc:', err);
  }
}

/**
 * Subscribe to user's DSA problem solving progress in real-time.
 */
export function subscribeToUserDSAProgress(uid, onData, onError) {
  if (!isFirebaseConfigured || !db || !uid) return () => {};

  try {
    const colRef = collection(db, 'users', uid, 'dsaProgress');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const progressMap = {};
        snapshot.forEach((docSnap) => {
          progressMap[docSnap.id] = docSnap.data();
        });
        onData(progressMap);
      },
      (err) => {
        console.error('[Firestore] Error subscribing to DSA progress:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('[Firestore] DSA progress subscription skipped:', err);
    return () => {};
  }
}

/**
 * Save / update a user's DSA problem record in Firestore.
 */
export async function saveUserDSAProblemDoc(uid, problemId, problemData) {
  if (!isFirebaseConfigured || !db || !uid || !problemId) return;
  try {
    const docRef = doc(db, 'users', uid, 'dsaProgress', problemId);
    await setDoc(docRef, { ...problemData, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.error('[Firestore] Failed to save DSA problem doc:', err);
  }
}

/**
 * Delete a user's DSA problem record from Firestore.
 */
export async function deleteUserDSAProblemDoc(uid, problemId) {
  if (!isFirebaseConfigured || !db || !uid || !problemId) return;
  try {
    const docRef = doc(db, 'users', uid, 'dsaProgress', problemId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('[Firestore] Failed to delete DSA problem doc:', err);
  }
}

