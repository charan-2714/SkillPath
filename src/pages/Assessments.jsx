// src/pages/Assessments.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  HelpCircle,
  Star,
  ExternalLink,
  Filter,
  CheckCircle,
  Circle,
  Layers,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { CircularProgress, ProgressBar } from '../components/common/ProgressBar';
import { useJourney } from '../hooks/useJourney';
import { useAppState } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { ASSESSMENT_TYPES, ASSESSMENT_STATUSES } from '../models/journeySchema';

const STATUS_CONFIG = {
  'not-attempted': { label: 'Not Attempted', badge: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  attempted: { label: 'Attempted', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
  confident: { label: 'Confident', badge: 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300' },
  'needs-review': { label: 'Needs Review', badge: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
};

export default function Assessments() {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeJourney } = useAppState();
  const { journey, updateAssessmentItem } = useJourney(activeJourney?.id);

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Collect all assessments across the active journey
  const allAssessments = useMemo(() => {
    if (!journey || !journey.levels) return [];
    const items = [];
    journey.levels.forEach((lvl) => {
      (lvl.subjects || []).forEach((sub) => {
        (sub.topics || []).forEach((top) => {
          (top.assessments || []).forEach((a) => {
            items.push({
              ...a,
              topicId: top.id,
              topicTitle: top.title,
              levelTitle: lvl.title,
              subjectTitle: sub.title,
            });
          });
        });
      });
    });
    return items;
  }, [journey]);

  const filteredAssessments = useMemo(() => {
    return allAssessments.filter((a) => {
      if (activeTab === 'confident' && a.status !== 'confident') return false;
      if (activeTab === 'needs-review' && a.status !== 'needs-review') return false;
      if (activeTab === 'attempted' && (a.status === 'confident' || a.status === 'not-attempted'))
        return false;

      if (typeFilter !== 'All' && a.type !== typeFilter) return false;
      if (difficultyFilter !== 'All' && a.difficulty !== difficultyFilter) return false;

      if (search) {
        const q = search.toLowerCase();
        return (
          a.question.toLowerCase().includes(q) ||
          a.topicTitle?.toLowerCase().includes(q) ||
          a.notes?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allAssessments, activeTab, typeFilter, difficultyFilter, search]);

  const confidentCount = allAssessments.filter((a) => a.status === 'confident').length;
  const readiness =
    allAssessments.length > 0
      ? Math.round((confidentCount / allAssessments.length) * 100)
      : 0;

  const handleStatusChange = (topicId, assessmentId, status) => {
    updateAssessmentItem(topicId, assessmentId, { status });
    toast(`Assessment updated to ${status}`, 'success');
  };

  const handleNotesChange = (topicId, assessmentId, notes) => {
    updateAssessmentItem(topicId, assessmentId, { notes });
  };

  const tabs = [
    { id: 'all', label: 'All Questions', count: allAssessments.length },
    { id: 'confident', label: 'Confident', count: confidentCount },
    {
      id: 'needs-review',
      label: 'Needs Review',
      count: allAssessments.filter((a) => a.status === 'needs-review').length,
    },
  ];

  if (!journey) {
    return (
      <AppLayout pageTitle="Assessments">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to view its assessments and interview questions."
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
    <AppLayout pageTitle="Assessments">
      <PageHeader
        title="Assessments & Interview Prep"
        subtitle={`Evaluate your conceptual understanding and interview readiness for ${journey.name}.`}
      />

      {/* Top Readiness Summary */}
      <div className="card p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <CircularProgress
              value={readiness}
              size={76}
              color="#6366f1"
              label={`${readiness}%`}
              sublabel="Ready"
            />
            <div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                Assessment Readiness
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {confidentCount} of {allAssessments.length} questions mastered confidently
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {allAssessments.length}
              </div>
              <div className="text-[10px] text-gray-400">Total Questions</div>
            </div>
            <div className="text-center px-4 py-2 bg-green-50 dark:bg-green-950/40 rounded-xl">
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {confidentCount}
              </div>
              <div className="text-[10px] text-green-700 dark:text-green-300 font-medium">
                Confident
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-5" />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search assessment questions..."
          className="flex-1"
        />

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input text-xs w-full sm:w-auto"
          >
            <option value="All">All Types</option>
            {ASSESSMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input text-xs w-full sm:w-auto"
          >
            <option value="All">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Assessment Questions Grid */}
      {filteredAssessments.length > 0 ? (
        <div className="space-y-3">
          {filteredAssessments.map((item) => {
            const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG['not-attempted'];

            return (
              <div
                key={item.id}
                className="card p-5 hover:shadow-card-md transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-[10px]">
                        {item.type}
                      </span>
                      <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px]">
                        {item.difficulty}
                      </span>
                      <button
                        onClick={() =>
                          navigate(`/journeys/${journey.id}/topics/${item.topicId}`)
                        }
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 ml-auto sm:ml-2"
                      >
                        <span>{item.topicTitle}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                      {item.question}
                    </h3>
                  </div>

                  <select
                    value={item.status || 'not-attempted'}
                    onChange={(e) =>
                      handleStatusChange(item.topicId, item.id, e.target.value)
                    }
                    className="input text-xs py-1 w-auto self-start"
                  >
                    {ASSESSMENT_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {STATUS_CONFIG[st]?.label || st}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={item.notes || ''}
                  onChange={(e) => handleNotesChange(item.topicId, item.id, e.target.value)}
                  placeholder="Your answer notes, talking points, or key definitions..."
                  className="input text-xs"
                  rows={2}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="star"
          title={allAssessments.length === 0 ? 'No assessment questions yet' : 'No matching questions'}
          description={
            allAssessments.length === 0
              ? 'Add assessment or interview questions to your topics to test your recall and understanding.'
              : 'Try clearing your search query or changing filter settings.'
          }
          action={
            allAssessments.length === 0 ? (
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
