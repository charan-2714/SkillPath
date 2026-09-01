// src/pages/Practice.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  CheckCircle,
  Clock,
  BookOpen,
  Filter,
  ExternalLink,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { useAppState } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { PRACTICE_TYPES, PRACTICE_STATUSES } from '../models/journeySchema';

const STATUS_TABS = [
  { id: 'all', label: 'All Tasks' },
  { id: 'solved', label: 'Solved' },
  { id: 'attempted', label: 'In Progress' },
  { id: 'not-started', label: 'Not Started' },
];

export default function Practice() {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeJourney } = useAppState();
  const { journey, updatePracticeItem } = useJourney(activeJourney?.id);

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Collect all practice tasks across the active journey
  const allTasks = useMemo(() => {
    if (!journey || !journey.levels) return [];
    const tasks = [];
    journey.levels.forEach((lvl) => {
      (lvl.subjects || []).forEach((sub) => {
        (sub.topics || []).forEach((top) => {
          (top.practice || []).forEach((p) => {
            tasks.push({
              ...p,
              topicId: top.id,
              topicTitle: top.title,
              levelTitle: lvl.title,
              subjectTitle: sub.title,
            });
          });
        });
      });
    });
    return tasks;
  }, [journey]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((t) => {
      if (activeTab === 'solved' && t.status !== 'solved' && t.status !== 'completed') return false;
      if (activeTab === 'attempted' && t.status !== 'attempted' && t.status !== 'needs-review')
        return false;
      if (activeTab === 'not-started' && t.status !== 'not-started' && t.status) return false;

      if (typeFilter !== 'All' && t.type !== typeFilter) return false;
      if (difficultyFilter !== 'All' && t.difficulty !== difficultyFilter) return false;

      if (search) {
        const q = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.topicTitle?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allTasks, activeTab, typeFilter, difficultyFilter, search]);

  const solvedCount = allTasks.filter(
    (t) => t.status === 'solved' || t.status === 'completed'
  ).length;

  const handleStatusUpdate = (topicId, practiceId, newStatus) => {
    updatePracticeItem(topicId, practiceId, { status: newStatus });
    toast(`Practice status updated to ${newStatus}`, 'success');
  };

  const handleNotesUpdate = (topicId, practiceId, notes) => {
    updatePracticeItem(topicId, practiceId, { notes });
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="Practice">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to view its practice tasks."
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
    <AppLayout pageTitle="Practice Tasks">
      <PageHeader
        title="Practice Tasks & Challenges"
        subtitle={`Hands-on exercises and coding challenges for ${journey.name}. (${solvedCount} of ${allTasks.length} solved)`}
      />

      <Tabs tabs={STATUS_TABS} activeTab={activeTab} onTabChange={setActiveTab} className="mb-5" />

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search practice tasks by title or topic..."
          className="flex-1"
        />

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input text-xs w-full sm:w-auto"
          >
            <option value="All">All Types</option>
            {PRACTICE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input text-xs w-auto"
          >
            <option value="All">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => {
            const isSolved = task.status === 'solved' || task.status === 'completed';

            return (
              <div
                key={task.id}
                className="card p-5 flex flex-col justify-between hover:shadow-card-md transition-all space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {task.type}
                      </span>
                      <span
                        className={`badge ${
                          task.difficulty === 'easy'
                            ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300'
                            : task.difficulty === 'hard'
                            ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                        }`}
                      >
                        {task.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/journeys/${journey.id}/topics/${task.topicId}`)
                      }
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 flex-shrink-0"
                    >
                      <span>{task.topicTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Status & Notes */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-semibold text-gray-500">Status:</label>
                    <select
                      value={task.status || 'not-started'}
                      onChange={(e) =>
                        handleStatusUpdate(task.topicId, task.id, e.target.value)
                      }
                      className="input text-xs py-1 w-auto"
                    >
                      {PRACTICE_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st
                            .split('-')
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    value={task.notes || ''}
                    onChange={(e) => handleNotesUpdate(task.topicId, task.id, e.target.value)}
                    placeholder="Solution notes, approach, or key learnings..."
                    className="input text-xs font-mono"
                    rows={2}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="inbox"
          title={allTasks.length === 0 ? 'No practice tasks found' : 'No matching tasks'}
          description={
            allTasks.length === 0
              ? 'Add practice tasks to your topics inside the Topic Workspace to see them here.'
              : 'Try changing your search query or filter options.'
          }
          action={
            allTasks.length === 0 ? (
              <button
                onClick={() => navigate(`/journeys/${journey.id}`)}
                className="btn-primary text-xs"
              >
                Browse Topics in {journey.name}
              </button>
            ) : (
              <button
                onClick={() => {
                  setSearch('');
                  setTypeFilter('All');
                  setDifficultyFilter('All');
                  setActiveTab('all');
                }}
                className="btn-secondary text-xs"
              >
                Clear Filters
              </button>
            )
          }
        />
      )}
    </AppLayout>
  );
}
