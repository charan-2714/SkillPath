// src/components/layout/AppLayout.jsx
// Main application layout supporting dynamic responsive sidebar, top bar, and mobile navigation

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileBottomNav, MobileDrawer } from './MobileNav';
import { useAppState } from '../../context/AppContext';

export function AppLayout({ children, pageTitle }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useAppState();

  // Apply theme class on mount and on change
  useEffect(() => {
    const theme = state.settings?.theme || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.settings?.theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* TopBar */}
      <TopBar
        onMenuToggle={() => setMobileMenuOpen(true)}
        pageTitle={pageTitle}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main content */}
      <main
        className={`pt-14 pb-24 md:pb-8 transition-all duration-200 ml-0 ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-[230px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
}

export function PageHeader({ title, subtitle, actions, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 ${className}`}>
      <div className="min-w-0">
        <h1 className="page-title text-xl sm:text-2xl font-bold tracking-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
