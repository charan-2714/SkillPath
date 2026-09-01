// src/components/common/StatusBadge.jsx
import React from 'react';

const STATUS_CONFIG = {
  'not-started': { label: 'Not Started', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  'learning': { label: 'Learning', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  'practicing': { label: 'Practicing', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'confident': { label: 'Confident', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  'interview-ready': { label: 'Interview Ready', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  'completed': { label: 'Completed', className: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
  'skipped': { label: 'Skipped', className: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500' },
};

export const STATUSES = Object.keys(STATUS_CONFIG);

export function StatusBadge({ status, className = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['not-started'];
  return (
    <span className={`badge ${config.className} ${className}`}>
      {config.label}
    </span>
  );
}

export function StatusDot({ status }) {
  const colors = {
    'not-started': 'bg-gray-300',
    'learning': 'bg-amber-400',
    'practicing': 'bg-blue-400',
    'confident': 'bg-green-400',
    'interview-ready': 'bg-purple-400',
    'completed': 'bg-teal-400',
    'skipped': 'bg-gray-300',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-gray-300'}`} />;
}

export function getStatusConfig(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG['not-started'];
}
