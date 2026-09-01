// src/components/common/Breadcrumbs.jsx
// Interactive navigation breadcrumbs with clickable links and accessible separators

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav
      className={`flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4 overflow-x-auto py-1 scrollbar-thin ${className}`}
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex-shrink-0 font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>SkillPath</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            {isLast ? (
              <span className="font-bold text-gray-900 dark:text-gray-100 truncate max-w-[240px]">
                {item.label}
              </span>
            ) : item.to ? (
              <Link
                to={item.to}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors truncate max-w-[200px] font-medium"
              >
                {item.label}
              </Link>
            ) : item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors truncate max-w-[200px] font-medium text-left"
              >
                {item.label}
              </button>
            ) : (
              <span className="truncate max-w-[200px] text-gray-600 dark:text-gray-300 font-medium">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
