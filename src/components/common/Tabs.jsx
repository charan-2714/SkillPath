// src/components/common/Tabs.jsx
// Horizontally scrollable and responsive navigation tabs

import React from 'react';

export function Tabs({ tabs, activeTab, onChange, onTabChange, className = '' }) {
  const handleTabClick = (tabId) => {
    if (onChange) onChange(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  return (
    <div
      className={`flex border-b border-gray-200 dark:border-gray-700 gap-1 overflow-x-auto scrollbar-thin py-0.5 ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap flex-shrink-0 ${
            activeTab === tab.id ? 'tab-active' : 'tab-inactive'
          }`}
        >
          {tab.icon && <span className="mr-1.5 flex-shrink-0">{tab.icon}</span>}
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
