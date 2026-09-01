// src/components/dsa/DSAProblemCard.jsx
// Reusable, compact problem card for DSA problem lists and search results

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  BrainCircuit,
  RotateCcw,
} from 'lucide-react';
import { useDSA } from '../../context/DSAContext';
import { DSA_STATUSES } from '../../models/dsaSchema';

const DIFFICULTY_STYLES = {
  Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/80',
  Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/80',
};

const STATUS_BADGE_STYLES = {
  'not-started': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  'attempted': 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  'solved': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  'needs-revision': 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
  'mastered': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
};

export function DSAProblemCard({ problem, compact = false }) {
  const navigate = useNavigate();
  const { getProblemUserProgress, updateProblemStatus, toggleFavorite } = useDSA();

  const userProgress = getProblemUserProgress(problem.id);
  const status = userProgress.status || 'not-started';
  const difficulty = problem.difficulty || 'Medium';

  return (
    <div
      className={`card p-4 flex flex-col justify-between hover:shadow-card-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group ${
        userProgress.favorite ? 'border-amber-200 dark:border-amber-900/40 bg-amber-50/10' : ''
      }`}
    >
      <div>
        {/* Top Header: Difficulty, Topic Pills, Favorite */}
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`badge text-[10px] font-bold border px-2 py-0.5 ${
                DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.Medium
              }`}
            >
              {difficulty}
            </span>

            {(problem.topics || []).slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(problem.id);
            }}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={userProgress.favorite ? 'Remove Favorite' : 'Add to Favorites'}
          >
            <Star
              className={`w-4 h-4 ${
                userProgress.favorite
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'
              }`}
            />
          </button>
        </div>

        {/* Problem Title & LeetCode Link */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <h4
            onClick={() => navigate(`/dsa/problems/${problem.id}`)}
            className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer leading-snug"
          >
            {problem.recommendedOrder ? `${problem.recommendedOrder}. ` : ''}
            {problem.title}
          </h4>

          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded-md text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-colors flex-shrink-0"
              title="Open Official Problem on LeetCode ↗"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {!compact && problem.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
            {problem.description}
          </p>
        )}

        {/* Pattern Pills */}
        {problem.patterns?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {problem.patterns.map((pat) => (
              <span
                key={pat}
                className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium"
              >
                #{pat}
              </span>
            ))}
          </div>
        )}

        {/* Company Tags */}
        {problem.companyTags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {problem.companyTags.slice(0, 3).map((comp) => (
              <span
                key={comp}
                className="text-[9px] px-1.5 py-0.2 rounded bg-gray-50 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 font-mono"
              >
                {comp}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Status Selector & View Action */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-800/80 mt-3">
        {/* Quick status selector */}
        <select
          value={status}
          onChange={(e) => updateProblemStatus(problem.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`text-[11px] font-bold py-1 px-2 rounded-lg border-0 cursor-pointer focus:ring-1 focus:ring-indigo-500 ${
            STATUS_BADGE_STYLES[status] || STATUS_BADGE_STYLES['not-started']
          }`}
        >
          {DSA_STATUSES.map((st) => (
            <option key={st.id} value={st.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              {st.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          {userProgress.independenceScore !== undefined && userProgress.status === 'solved' && (
            <span
              className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded flex items-center gap-0.5"
              title="AI Independence Score"
            >
              ★ {userProgress.independenceScore}/5
            </span>
          )}

          <button
            type="button"
            onClick={() => navigate(`/dsa/problems/${problem.id}`)}
            className="btn-primary text-xs py-1 px-2.5 shadow-2xs"
          >
            Notebook
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
