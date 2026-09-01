// src/pages/Login.jsx
// Professional authentication page with Google Sign-In and guest mode

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Shield, Compass, Brain, CheckCircle2, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle, signInAsGuest, error: authError, isFirebaseConfigured } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setLocalError(null);
      const res = await signInWithGoogle();
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setLocalError(res.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setLoading(true);
      setLocalError(null);
      await signInAsGuest();
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError('Failed to start guest session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/20 mb-4">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
          SkillPath
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Professional Learning Journey & Skill Mastery Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="card p-8 shadow-2xl border-gray-100 dark:border-gray-800 backdrop-blur-xl">
          {/* Error Banner */}
          {(localError || authError) && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-3 text-red-700 dark:text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Sign in notice</p>
                <p className="mt-0.5">{localError || authError}</p>
              </div>
            </div>
          )}

          {/* Config Notice if offline/unconfigured */}
          {!isFirebaseConfigured && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-amber-800 dark:text-amber-300 text-xs">
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <span className="font-semibold">Local Session Mode:</span> Real Firebase credentials are not yet added to .env. Signing in will create a local testing session with admin capabilities.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
              <span className="flex-shrink mx-3 text-gray-400 text-xs font-medium uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
            </div>

            <button
              onClick={handleGuestSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium transition-colors"
            >
              <Compass className="w-4 h-4 text-gray-500" />
              <span>Explore as Guest (Offline Mode)</span>
            </button>
          </div>

          {/* Features Highlights */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Real-time cross-device sync powered by Firestore</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Independent user journeys cloned from master templates</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Soft-delete Recycle Bin with full restore capability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
