// src/components/common/EmptyState.jsx
import React from 'react';
import { BookOpen, Inbox, Search, BarChart2, Star } from 'lucide-react';

const ICONS = {
  book: BookOpen,
  inbox: Inbox,
  search: Search,
  chart: BarChart2,
  star: Star,
};

export function EmptyState({ icon = 'inbox', title, description, action, className = '' }) {
  const Icon = ICONS[icon] || Inbox;
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', description, retry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-base font-semibold text-red-700 dark:text-red-400 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-4">{description}</p>}
      {retry && (
        <button onClick={retry} className="btn-secondary text-sm">Try again</button>
      )}
    </div>
  );
}
