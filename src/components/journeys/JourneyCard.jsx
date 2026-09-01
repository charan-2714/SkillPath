// src/components/journeys/JourneyCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  FolderTree,
  MoreVertical,
  Copy,
  Archive,
  Trash2,
  Edit2,
  Calendar,
  Layers,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ProgressBar, CircularProgress } from '../common/ProgressBar';
import { getJourneyStats } from '../../utils/calculations';
import { useAppState, ACTIONS } from '../../context/AppContext';

export function JourneyCard({
  journey,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  isSelected = false,
  className = '',
}) {
  const navigate = useNavigate();
  const { dispatch } = useAppState();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const stats = getJourneyStats(journey);

  const handleSelect = (e) => {
    e.stopPropagation();
    dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: journey.id });
    navigate(`/journeys/${journey.id}`);
  };

  const handleManage = (e) => {
    e.stopPropagation();
    dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: journey.id });
    navigate(`/journeys/${journey.id}/manage`);
  };

  const trackingModelLabels = {
    basic: 'Basic',
    'skill-development': 'Skill Dev',
    custom: 'Custom Skills',
  };

  return (
    <div
      className={`card relative p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-card-md group ${
        isSelected
          ? 'ring-2 ring-indigo-500/80 bg-indigo-50/10 dark:bg-indigo-950/20'
          : ''
      } ${className}`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-medium">
                {journey.category || 'General'}
              </span>
              <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {trackingModelLabels[journey.trackingModel] || 'Skills'}
              </span>
              {journey.isArchived && (
                <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                  Archived
                </span>
              )}
            </div>

            <h3
              onClick={handleSelect}
              className="text-base font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer truncate"
            >
              {journey.name}
            </h3>

            {journey.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                {journey.description}
              </p>
            )}
          </div>

          {/* Action Menu Toggle */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Journey actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-8 z-30 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 text-xs animate-scale-in">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit?.(journey);
                    }}
                    className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDuplicate?.(journey.id);
                    }}
                    className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Copy className="w-3.5 h-3.5" /> Duplicate
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onArchive?.(journey.id, !journey.isArchived);
                    }}
                    className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    {journey.isArchived ? 'Unarchive' : 'Archive'}
                  </button>
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete?.(journey.id);
                    }}
                    className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Journey
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar & Details */}
        <div className="my-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {stats.overallProgress}% Complete
            </span>
            <span className="text-gray-400 dark:text-gray-500">
              {stats.completedTopics} of {stats.totalTopics} topics
            </span>
          </div>
          <ProgressBar value={stats.overallProgress} height="h-2" />
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 text-center py-2.5 my-2 border-y border-gray-50 dark:border-gray-800/80">
          <div>
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {stats.totalLevels}
            </div>
            <div className="text-[10px] text-gray-400">Levels</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {stats.totalTopics}
            </div>
            <div className="text-[10px] text-gray-400">Topics</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              {stats.practiceSolved}/{stats.totalPractice}
            </div>
            <div className="text-[10px] text-gray-400">Practice</div>
          </div>
        </div>

        {/* Current Focus */}
        {stats.currentTopic && (
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
            <span className="font-medium text-gray-700 dark:text-gray-300">Focus: </span>
            <span>{stats.currentTopic.title}</span>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={handleSelect}
          className="btn-primary text-xs flex-1 justify-center py-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Continue
        </button>

        <button
          onClick={handleManage}
          className="btn-secondary text-xs px-3 py-2"
          title="Open Journey Builder"
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Manage</span>
        </button>
      </div>
    </div>
  );
}
