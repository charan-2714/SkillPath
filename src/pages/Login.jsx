// src/pages/Login.jsx
// Professional landing & authentication portal focused on tracking and learning mastery

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  Clock,
  TrendingUp,
  FolderTree,
  Code2,
  AlertCircle,
  ArrowRight,
  Target,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle, signInAsGuest, error: authError } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-center relative overflow-hidden py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-sky-400/10 dark:bg-sky-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        
        {/* 1. HERO HEADER: First on Mobile (Order 1) & Top-Left on Desktop */}
        <div className="order-1 lg:order-1 lg:col-span-7 space-y-3.5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-bold shadow-xs">
            <Target className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Personal Learning & Mastery Tracker</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
              Track, Structure & Master{' '}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 dark:from-sky-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                What You Learn.
              </span>
            </h1>
            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Your personal engineering tracker. Organize self-study milestones, log daily coding hours, keep structured problem-solving journals, and measure your real technical growth.
            </p>
          </div>
        </div>

        {/* 2. AUTHENTICATION BOX: Second on Mobile (Order 2) & Right Column on Desktop */}
        <div className="order-2 lg:order-2 lg:col-span-5 lg:row-span-2 w-full self-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl relative overflow-hidden">
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500" />

            <div className="text-center space-y-1.5 mb-5 sm:mb-6">
              <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 mb-1.5">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                SkillPath Workspace
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign in to sync your roadmaps and progress
              </p>
            </div>

            {/* Error Banner */}
            {(localError || authError) && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 flex items-start gap-2.5 text-red-700 dark:text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-semibold">Sign in notice</p>
                  <p className="mt-0.5">{localError || authError}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-100 font-bold shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-50 text-xs sm:text-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="flex-shrink mx-3 text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                  or
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              </div>

              <button
                onClick={handleGuestSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Explore as Guest (Offline Mode)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-gray-400" />
              </button>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                🔒 Private workspace with automatic cloud & offline synchronization.
              </p>
            </div>
          </div>
        </div>

        {/* 3. 4 FEATURE CARDS: Third on Mobile (Order 3) & Bottom-Left on Desktop */}
        <div className="order-3 lg:order-3 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left max-w-lg mx-auto lg:mx-0">
          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <FolderTree className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Milestone Progress</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                  Track completion across custom levels, modules & topics
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Study Logs & Streaks</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                  Log daily study sessions and maintain active learning streaks
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">DSA Practice Journal</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                  Record code solutions, time complexities & reattempts
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Growth Analytics</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                  Visualize study velocity, weak spots & retention
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
