// src/context/AuthContext.jsx
// Centralized authentication context provider for Firebase Google Auth and local guest mode

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithGoogle as authSignInWithGoogle,
  signInAsGuest as authSignInAsGuest,
  signOutUser as authSignOutUser,
  subscribeToAuthState,
  syncUserProfile,
} from '../services/authService';
import { isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(({ user: authUser, profile, loading: authLoading }) => {
      setUser(authUser);
      setUserProfile(profile);
      setLoading(authLoading);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    const res = await authSignInWithGoogle();
    if (res.success) {
      setUser(res.user);
      setUserProfile(res.profile);
      setLoading(false);
      return { success: true };
    } else {
      setError(res.error);
      setLoading(false);
      return { success: false, error: res.error };
    }
  };

  const signInAsGuest = async () => {
    setError(null);
    setLoading(true);
    const res = await authSignInAsGuest();
    setUser(res.user);
    setUserProfile(res.profile);
    setLoading(false);
    return { success: true };
  };

  const signOut = async () => {
    setLoading(true);
    await authSignOutUser();
    setUser(null);
    setUserProfile(null);
    setLoading(false);
  };

  const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || '';
  const adminEmailList = adminEmailsEnv
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // Strict Admin Gate:
  // Requires user's email to be explicitly listed in VITE_ADMIN_EMAILS.
  // If VITE_ADMIN_EMAILS is empty or user is not in the list, isAdmin is strictly false.
  const isAdmin = Boolean(
    user?.email &&
    adminEmailList.length > 0 &&
    adminEmailList.includes(user.email.toLowerCase())
  );

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    error,
    isFirebaseConfigured,
    signInWithGoogle,
    signInAsGuest,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
