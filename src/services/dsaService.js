// src/services/dsaService.js
// Client storage and synchronization service for DSA user problem data

import { saveUserDSAProblemDoc, deleteUserDSAProblemDoc } from './firestoreService';
import { isFirebaseConfigured } from './firebase';

const DSA_PROGRESS_KEY = 'skillpath_dsa_progress';

export function loadLocalDSAProgress() {
  try {
    const raw = localStorage.getItem(DSA_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('[dsaService] Failed to load local DSA progress:', err);
    return {};
  }
}

export function saveLocalDSAProgress(progressMap) {
  try {
    localStorage.setItem(DSA_PROGRESS_KEY, JSON.stringify(progressMap));
  } catch (err) {
    console.warn('[dsaService] Failed to save local DSA progress:', err);
  }
}

export async function syncProblemToFirestore(uid, problemId, problemData) {
  if (isFirebaseConfigured && uid && problemId) {
    try {
      await saveUserDSAProblemDoc(uid, problemId, problemData);
    } catch (err) {
      console.warn('[dsaService] Failed to sync problem to Firestore:', err);
    }
  }
}

export async function deleteProblemFromFirestore(uid, problemId) {
  if (isFirebaseConfigured && uid && problemId) {
    try {
      await deleteUserDSAProblemDoc(uid, problemId);
    } catch (err) {
      console.warn('[dsaService] Failed to delete problem from Firestore:', err);
    }
  }
}
