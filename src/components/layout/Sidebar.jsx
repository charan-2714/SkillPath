// src/components/layout/Sidebar.jsx
// Sidebar navigation with active journey selector, Recycle Bin, and conditional Admin link

import React, { useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  BarChart3,
  Settings,
  Flame,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Binary,
  Route,
} from 'lucide-react';
import { useAppState, ACTIONS } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ collapsed, onToggle }) {
  const { state, dispatch, activeJourney } = useAppState();
  const { isAdmin } = useAuth();
  const streak = state.analytics?.streakDays || 0;
  const location = useLocation();
  const navigate = useNavigate();

  const activeJourneys = useMemo(() => {
    return (state.journeys || []).filter((j) => !j.isArchived);
  }, [state.journeys]);

  const navSections = useMemo(() => {
    const mainItems = [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/journeys', icon: Compass, label: 'My Journeys' },
      { to: '/dsa', icon: Binary, label: 'DSA & LeetCode' },
      { to: '/templates', icon: Sparkles, label: 'Templates' },
      { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    ];

    const systemItems = [
      { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    if (isAdmin) {
      systemItems.unshift({ to: '/admin', icon: ShieldCheck, label: 'Admin Portal' });
    }

    return [
      { title: 'Navigation', items: mainItems },
      { title: 'System', items: systemItems },
    ];
  }, [isAdmin]);

  const isActive = (to) => {
    if (to === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) return true;
    return location.pathname === to || (to !== '/' && to !== '/dashboard' && location.pathname.startsWith(to));
  };

  const handleJourneySwitch = (e) => {
    const jId = e.target.value;
    if (jId === 'create') {
      navigate('/templates');
    } else if (jId) {
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: jId });
      navigate(`/journeys/${jId}`);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-30 flex flex-col transition-all duration-200 ${
        collapsed ? 'w-[64px]' : 'w-[230px]'
      }`}
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Route className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none whitespace-nowrap">
              SkillPath
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 whitespace-nowrap font-medium">
              Learning Journey
            </div>
          </div>
        )}
      </div>

      {/* Active Journey Selector */}
      {!collapsed && activeJourneys.length > 0 && (
        <div className="px-3 pt-3 pb-1 border-b border-gray-50 dark:border-gray-800 flex-shrink-0">
          <label className="text-[10px] font-semibold uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-1 block px-1">
            Active Journey
          </label>
          <div className="relative">
            <select
              value={activeJourney?.id || ''}
              onChange={handleJourneySwitch}
              className="w-full text-xs font-medium bg-gray-50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl py-1.5 px-2.5 pr-7 truncate focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {activeJourneys.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
              <option value="create">+ New Journey...</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-thin">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="px-2 mb-1">
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {section.title}
                </span>
              </div>
            )}
            <ul className="space-y-0.5" role="list">
              {section.items.map((item) => {
                const active = isActive(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      title={collapsed ? item.label : undefined}
                      className={`sidebar-link ${
                        active
                          ? 'active font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                      } ${collapsed ? 'justify-center px-2' : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          active ? 'text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                      />
                      {!collapsed && <span className="truncate text-xs">{item.label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Streak Card */}
      {!collapsed && streak > 0 && (
        <div className="mx-3 mb-3 p-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/30">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-orange-800 dark:text-orange-300">Daily Streak</div>
              <div className="text-base font-black text-orange-600 dark:text-orange-400 leading-none">
                {streak} Days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm hover:shadow-md transition-all z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
