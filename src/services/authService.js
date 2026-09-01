// src/services/authService.js
// Authentication service supporting Google Sign-In, profile management, and guest mode

import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from './firebase';

const LOCAL_USER_KEY = 'skillpath_local_user';

export async function signInWithGoogle() {
  if (isFirebaseConfigured && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profile = await syncUserProfile(user);
      return { success: true, user, profile };
    } catch (err) {
      console.error('[AuthService] Google Sign-In error:', err);
      let message = 'Failed to sign in with Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        message = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Network error during sign-in. Please check your internet connection.';
      } else if (err.code === 'auth/unauthorized-domain') {
        message = `Domain "${window.location.hostname}" is not authorized in Firebase. Add it in Firebase Console -> Authentication -> Settings -> Authorized domains.`;
      } else if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/configuration-not-found') {
        message = 'Google Sign-In is disabled. Enable Google under Firebase Console -> Authentication -> Sign-in method.';
      } else if (err.message) {
        message = `Sign-in error (${err.code || 'unknown'}): ${err.message}`;
      }
      return { success: false, error: message };
    }
  }

  // Fallback guest / local developer sign-in when Firebase is not configured
  const mockUser = {
    uid: 'local-dev-user',
    displayName: 'Learner (Local Session)',
    email: 'learner@skillpath.dev',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isAnonymous: false,
    role: 'user',
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
  return { success: true, user: mockUser, profile: mockUser };
}

export async function signInAsGuest() {
  const guestUser = {
    uid: `guest-${Date.now().toString(36)}`,
    displayName: 'Guest Learner',
    email: 'guest@skillpath.local',
    photoURL: null,
    isAnonymous: true,
    role: 'user',
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(guestUser));
  return { success: true, user: guestUser, profile: guestUser };
}

export async function signOutUser() {
  if (isFirebaseConfigured && auth) {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.warn('[AuthService] Firebase signOut error:', err);
    }
  }
  localStorage.removeItem(LOCAL_USER_KEY);
  return { success: true };
}

export function subscribeToAuthState(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        callback({
          user: firebaseUser,
          profile: profile || {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Learner',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role: 'user',
          },
          loading: false,
        });
      } else {
        // Check for local fallback user
        const localRaw = localStorage.getItem(LOCAL_USER_KEY);
        const localUser = localRaw ? JSON.parse(localRaw) : null;
        callback({ user: localUser, profile: localUser, loading: false });
      }
    });
  }

  // Local / unconfigured mode
  const localRaw = localStorage.getItem(LOCAL_USER_KEY);
  const localUser = localRaw ? JSON.parse(localRaw) : null;
  callback({ user: localUser, profile: localUser, loading: false });
  return () => {};
}

export async function getUserProfile(uid) {
  if (!isFirebaseConfigured || !db || !uid) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('[AuthService] Error fetching user profile:', err);
    return null;
  }
}

export async function syncUserProfile(user, extra = {}) {
  if (!isFirebaseConfigured || !db || !user?.uid) return null;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    let profileData;

    if (!snap.exists()) {
      profileData = {
        uid: user.uid,
        displayName: user.displayName || 'Learner',
        email: user.email || '',
        photoURL: user.photoURL || null,
        role: extra.role || 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...extra,
      };
      await setDoc(userRef, profileData);
    } else {
      profileData = snap.data();
      await setDoc(
        userRef,
        {
          displayName: user.displayName || profileData.displayName,
          photoURL: user.photoURL || profileData.photoURL,
          updatedAt: serverTimestamp(),
          ...extra,
        },
        { merge: true }
      );
    }
    return profileData;
  } catch (err) {
    console.warn('[AuthService] Error syncing user profile:', err);
    return null;
  }
}
