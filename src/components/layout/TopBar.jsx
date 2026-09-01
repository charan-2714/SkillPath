// src/components/layout/TopBar.jsx
// Navigation header with breadcrumb, active journey indicator, theme switch, and user profile menu

import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Sparkles,
  Route,
  User,
  LogOut,
  Settings,
  Trash2,
  ShieldCheck,
  Download,
  BookOpen,
  BarChart2,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppState, ACTIONS } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function TopBar({ onMenuToggle, pageTitle, sidebarCollapsed }) {
  const { state, dispatch, activeJourney } = useAppState();
  const { user, userProfile, isAdmin, signOut, toggleAdminRole } = useAuth();
  const isDark = state.settings?.theme === 'dark';
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: { theme: newTheme } });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setProfileOpen(false);
    await signOut();
    navigate('/login');
  };

  const displayName = userProfile?.displayName || user?.displayName || 'Learner';
  const photoURL = userProfile?.photoURL || user?.photoURL;

  return (
    <header
      className={`fixed top-0 right-0 left-0 ${
        sidebarCollapsed ? 'md:left-16' : 'md:left-[230px]'
      } h-14 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-20 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 transition-all duration-200`}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb / Title display */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="font-black text-indigo-600 dark:text-indigo-400">SkillPath</span>
          {activeJourney && (
            <>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <button
                onClick={() => navigate(`/journeys/${activeJourney.id}`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors truncate max-w-[200px] lg:max-w-[320px]"
              >
                <Route className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{activeJourney.name}</span>
              </button>
            </>
          )}
        </div>

        {pageTitle && (
          <div className="md:hidden truncate font-semibold text-sm text-gray-900 dark:text-gray-100">
            {pageTitle}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <button
          onClick={() => navigate('/templates')}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2.5 py-1.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        {/* User Profile Menu Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30 flex-shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-200 max-w-[100px] lg:max-w-[140px] truncate">
              {displayName}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 card py-2 shadow-2xl border-gray-200 dark:border-gray-800 z-50 animate-fade-in divide-y divide-gray-100 dark:divide-gray-800">
              <div className="px-4 py-2.5">
                <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">{displayName}</p>
                <p className="text-[11px] text-gray-400 truncate">{user?.email || 'Guest Mode'}</p>
                {isAdmin && (
                  <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] mt-1">
                    Admin
                  </span>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setProfileOpen(false); navigate('/dashboard'); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
                  Dashboard
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/journeys'); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <Route className="w-3.5 h-3.5 text-indigo-500" />
                  My Journeys
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/recycle-bin'); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5 text-amber-500" />
                  Recycle Bin ({state.recycleBin?.length || 0})
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/export'); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  Export / Import
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                  className="w-full px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-500" />
                  Settings
                </button>
              </div>

              {/* Admin Portal link (Only visible to verified Administrators) */}
              {isAdmin && (
                <div className="py-1">
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/admin'); }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Curriculum Portal
                  </button>
                </div>
              )}

              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
