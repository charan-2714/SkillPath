// src/components/layout/MobileNav.jsx
// Mobile navigation drawer and bottom navigation bar

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FolderTree,
  Sparkles,
  Code2,
  FolderKanban,
  CheckCircle2,
  Library,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Settings,
  Download,
  Info,
  X,
  Route,
  Flame,
  Trash2,
  ShieldCheck,
  Binary,
} from 'lucide-react';
import { useAppState } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function MobileBottomNav() {
  const location = useLocation();
  const { activeJourney } = useAppState();

  const bottomItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/journeys', icon: Compass, label: 'Journeys' },
    {
      to: activeJourney ? `/journeys/${activeJourney.id}/manage` : '/templates',
      icon: activeJourney ? FolderTree : Sparkles,
      label: activeJourney ? 'Builder' : 'Templates',
    },
    { to: '/practice', icon: Code2, label: 'Practice' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const isActive = (to) => {
    if (to === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) return true;
    return location.pathname === to || (to !== '/' && to !== '/dashboard' && location.pathname.startsWith(to));
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-30 md:hidden">
      <div className="flex items-center justify-around px-1 py-1">
        {bottomItems.map((item) => {
          const active = isActive(item.to);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors flex-1 text-center ${
                active
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileDrawer({ isOpen, onClose }) {
  const { state, activeJourney } = useAppState();
  const { isAdmin } = useAuth();
  const streak = state.analytics?.streakDays || 0;
  const location = useLocation();

  const showAIDependency = (state.journeys || []).some((j) => j.enableAIDependency);

  const allNav = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/journeys', icon: Compass, label: 'My Journeys' },
    ...(activeJourney
      ? [{ to: `/journeys/${activeJourney.id}/manage`, icon: FolderTree, label: 'Journey Builder' }]
      : []),
    { to: '/templates', icon: Sparkles, label: 'Templates' },
    { to: '/dsa', icon: Binary, label: 'DSA / LeetCode' },
    { to: '/practice', icon: Code2, label: 'Practice Tasks' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/assessments', icon: CheckCircle2, label: 'Assessments' },
    { to: '/resources', icon: Library, label: 'Resources' },
    { to: '/analytics', icon: BarChart3, label: 'Progress Analytics' },
    { to: '/learning-log', icon: BookOpenCheck, label: 'Learning Log' },
    ...(showAIDependency
      ? [{ to: '/ai-dependency', icon: BrainCircuit, label: 'AI Independence' }]
      : []),
    { to: '/recycle-bin', icon: Trash2, label: `Recycle Bin (${state.recycleBin?.length || 0})` },
    ...(isAdmin ? [{ to: '/admin', icon: ShieldCheck, label: 'Admin Portal' }] : []),
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/export', icon: Download, label: 'Export / Import' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  const isActive = (to) => {
    if (to === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) return true;
    return location.pathname === to || (to !== '/' && to !== '/dashboard' && location.pathname.startsWith(to));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white dark:bg-gray-900 z-50 flex flex-col transform transition-transform duration-200 md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
              <Route className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100">SkillPath</div>
              <div className="text-[10px] text-gray-400 font-medium">Learning Journey</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-thin">
          {allNav.map((item) => {
            const active = isActive(item.to);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`sidebar-link ${
                  active
                    ? 'active font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {streak > 0 && (
          <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-xs font-bold text-orange-800 dark:text-orange-300">Daily Streak</div>
                <div className="text-base font-black text-orange-600 dark:text-orange-400">{streak} Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
