// src/pages/Topics.jsx
// Journey-scoped Topics list & search

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ChevronRight, BookOpen } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { SearchBar } from '../components/common/SearchBar';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState } from '../context/AppContext';
import { calculateTopicProgress } from '../utils/calculations';

const PRIORITY_COLORS = {
  core: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  important: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  optional: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function Topics() {
  const { activeJourney } = useAppState();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const allTopics = useMemo(() => {
    if (!activeJourney || !activeJourney.levels) return [];
    return activeJourney.levels.flatMap((lvl) =>
      (lvl.subjects || []).flatMap((sub) =>
        (sub.topics || []).map((t) => ({
          ...t,
          levelTitle: lvl.title,
          subjectTitle: sub.title,
          progress: calculateTopicProgress(
            t,
            activeJourney.trackingModel,
            activeJourney.skillDimensions
          ),
        }))
      )
    );
  }, [activeJourney]);

  const filtered = useMemo(() => {
    return allTopics.filter((t) => {
      if (statusFilter !== 'All' && (t.status || 'not-started') !== statusFilter) return false;
      if (priorityFilter !== 'All' && (t.priority || 'core') !== priorityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.levelTitle?.toLowerCase().includes(q) ||
          t.subjectTitle?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allTopics, search, statusFilter, priorityFilter]);

  if (!activeJourney) {
    return (
      <AppLayout pageTitle="Topics">
        <EmptyState
          icon="book"
          title="No Active Journey Selected"
          description="Create or select a journey to explore topics."
          action={
            <button onClick={() => navigate('/journeys')} className="btn-primary text-xs">
              Go to My Journeys
            </button>
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout pageTitle="Topics">
      <PageHeader
        title={`Topics (${activeJourney.name})`}
        subtitle={`${filtered.length} topics across ${activeJourney.levels?.length || 0} levels.`}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search topics by title, tags, or description..."
          className="flex-1"
        />

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input text-xs py-1.5 w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="not-started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="practicing">Practicing</option>
            <option value="confident">Confident</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="input text-xs py-1.5 w-auto"
          >
            <option value="All">All Priorities</option>
            <option value="core">Core</option>
            <option value="important">Important</option>
            <option value="optional">Optional</option>
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="card divide-y divide-gray-50 dark:divide-gray-800">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/journeys/${activeJourney.id}/topics/${t.id}`)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors group"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge text-[10px] ${PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.optional}`}>
                    {t.priority}
                  </span>
                  {t.source === 'template' ? (
                    <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-[10px]">
                      Recommended
                    </span>
                  ) : (
                    <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 text-[10px]">
                      Custom
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {t.levelTitle} / {t.subjectTitle}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {t.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-gray-800 dark:text-gray-200">{t.progress}%</div>
                  <ProgressBar value={t.progress} height="h-1" className="w-16 mt-1" />
                </div>
                <StatusBadge status={t.status || 'not-started'} />
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No topics found"
          description="Try clearing filters or search terms."
          action={
            <button
              className="btn-secondary text-xs"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setPriorityFilter('All');
              }}
            >
              Clear Filters
            </button>
          }
        />
      )}
    </AppLayout>
  );
}
