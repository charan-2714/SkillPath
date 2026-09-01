// src/components/common/ProgressBar.jsx
import React from 'react';

const COLOR_MAP = {
  indigo: 'bg-indigo-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
  rose: 'bg-rose-500',
  pink: 'bg-pink-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  lime: 'bg-lime-500',
  fuchsia: 'bg-fuchsia-500',
  slate: 'bg-slate-500',
};

function getColorByPercent(percent) {
  if (percent >= 80) return 'bg-green-500';
  if (percent >= 50) return 'bg-blue-500';
  if (percent >= 25) return 'bg-amber-500';
  return 'bg-red-400';
}

export function ProgressBar({ value = 0, max = 100, color, height = 'h-2', showLabel = false, className = '' }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const fillColor = color ? (COLOR_MAP[color] || color) : getColorByPercent(percent);

  return (
    <div className={`progress-bar ${height} ${className}`}>
      <div
        className={`progress-fill ${fillColor} ${height}`}
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

export function ProgressCircle({ value = 0, size = 80, strokeWidth = 8, color = '#6366f1', label, sublabel }) {
  const percent = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-100 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center pointer-events-none">
        {label && <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">{label}</span>}
        {sublabel && <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}

export function CircularProgress({ value = 0, size = 80, strokeWidth = 8, color = '#6366f1', label, sublabel }) {
  const percent = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-gray-100 dark:text-gray-700" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        {label && <span className="font-bold text-gray-900 dark:text-gray-100 leading-none" style={{ fontSize: size * 0.18 }}>{label}</span>}
        {sublabel && <span className="text-gray-500 dark:text-gray-400 leading-none mt-0.5" style={{ fontSize: size * 0.13 }}>{sublabel}</span>}
      </div>
    </div>
  );
}
