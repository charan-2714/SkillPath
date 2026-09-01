// src/pages/JourneyDetail.jsx
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FolderTree,
  Play,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { ProgressBar, CircularProgress } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchBar } from '../components/common/SearchBar';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useJourney } from '../hooks/useJourney';
import {
  calculateLevelProgress,
  calculateSubjectProgress,
  calculateTopicProgress,
} from '../utils/calculations';

function TopicRow({ topic, journey, onClick }) {
  const progress = calculateTopicProgress(topic, journey.trackingModel, journey.skillDimensions);
  const subtopicsCount = (topic.learningItems || topic.subtopics || []).length;
  const practiceCount = (topic.practice || []).length;
  const debugCount = (topic.debugging || []).length;
  const assessCount = (topic.assessments || []).length;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 text-left transition-colors group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/40"
    >
      <div
        className={`w-2 h-2 rounded-full flex-shrink-0 ${
          progress >= 80 || topic.status === 'completed'
            ? 'bg-green-500'
            : progress > 0 || topic.status !== 'not-started'
            ? 'bg-amber-400'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate block">
            {topic.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
          {subtopicsCount > 0 && (
            <span className="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.2 rounded">
              {subtopicsCount} subtopics
            </span>
          )}
          {practiceCount > 0 && <span>• {practiceCount} practice</span>}
          {debugCount > 0 && <span>• {debugCount} debug</span>}
          {assessCount > 0 && <span>• {assessCount} questions</span>}
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        <StatusBadge status={topic.status || 'not-started'} />
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-8 text-right">
          {progress}%
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
      </div>
    </button>
  );
}

function SubjectCard({ subject, level, journey, expanded, onToggle, onTopicClick }) {
  const subjectProgress = calculateSubjectProgress(
    subject,
    journey.trackingModel,
    journey.skillDimensions
  );

  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden mb-2.5 bg-white dark:bg-gray-800/60">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100/70 dark:hover:bg-gray-800 text-left transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {subject.title}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            {(subject.topics || []).length} topics
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <ProgressBar value={subjectProgress} height="h-1.5" className="w-16 hidden sm:block" />
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 w-8 text-right">
            {subjectProgress}%
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="p-2 space-y-0.5 border-t border-gray-50 dark:border-gray-800/60">
          {(subject.topics || []).length > 0 ? (
            subject.topics.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                journey={journey}
                onClick={() => onTopicClick(topic.id)}
              />
            ))
          ) : (
            <div className="p-3 text-center text-xs text-gray-400">
              No topics in this subject yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function JourneyDetail() {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const { journey, stats } = useJourney(journeyId);

  const [search, setSearch] = useState('');
  const [expandedLevels, setExpandedLevels] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [allExpanded, setAllExpanded] = useState(true);

  if (!journey) {
    return (
      <AppLayout pageTitle="Journey Not Found">
        <EmptyState
          icon="book"
          title="Learning Journey Not Found"
          description="The requested learning journey does not exist or was deleted."
          action={
            <button onClick={() => navigate('/journeys')} className="btn-primary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Journeys
            </button>
          }
        />
      </AppLayout>
    );
  }

  const filteredLevels = useMemo(() => {
    if (!search.trim()) return journey.levels || [];
    const q = search.toLowerCase();
    return (journey.levels || [])
      .map((lvl) => {
        const filteredSubs = (lvl.subjects || [])
          .map((sub) => ({
            ...sub,
            topics: (sub.topics || []).filter((t) => {
              const inTitle = t.title.toLowerCase().includes(q);
              const inDesc = t.description?.toLowerCase().includes(q);
              const inTags = t.tags?.some((tag) => tag.toLowerCase().includes(q));
              const inObjectives = (t.learningObjectives || []).some((obj) => obj.toLowerCase().includes(q));
              const inItems = (t.learningItems || []).some((item) => (item.title || '').toLowerCase().includes(q));
              const inPractice = (t.practice || []).some((p) => (p.title || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
              const inDebugging = (t.debugging || []).some((d) => (d.title || '').toLowerCase().includes(q) || (d.description || '').toLowerCase().includes(q) || (d.errorType || '').toLowerCase().includes(q));
              const inAssessments = (t.assessments || []).some((a) => (a.question || '').toLowerCase().includes(q) || (a.notes || '').toLowerCase().includes(q));
              const inResources = (t.resources || []).some((r) => (r.title || '').toLowerCase().includes(q) || (r.url || '').toLowerCase().includes(q));
              const inSubTitle = (sub.title || '').toLowerCase().includes(q);
              const inLvlTitle = (lvl.title || '').toLowerCase().includes(q);

              return inTitle || inDesc || inTags || inObjectives || inItems || inPractice || inDebugging || inAssessments || inResources || inSubTitle || inLvlTitle;
            }),
          }))
          .filter((sub) => sub.topics.length > 0);

        return {
          ...lvl,
          subjects: filteredSubs,
        };
      })
      .filter((lvl) => lvl.subjects.length > 0 || lvl.title.toLowerCase().includes(q));
  }, [journey.levels, search]);

  const toggleLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleSubject = (subId) => {
    setExpandedSubjects((prev) => ({ ...prev, [subId]: !prev[subId] }));
  };

  const toggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const lvlMap = {};
    const subMap = {};
    (journey.levels || []).forEach((lvl) => {
      lvlMap[lvl.id] = nextState;
      (lvl.subjects || []).forEach((sub) => {
        subMap[sub.id] = nextState;
      });
    });
    setExpandedLevels(lvlMap);
    setExpandedSubjects(subMap);
  };

  // Auto-scroll and expand level if hash exists in URL
  React.useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setExpandedLevels((prev) => ({ ...prev, [hash]: true }));
      setTimeout(() => {
        const el = document.getElementById(`level-${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [journey?.id]);

  return (
    <AppLayout pageTitle={journey.name}>
      <Breadcrumbs
        items={[
          { label: 'My Journeys', to: '/journeys' },
          { label: journey.name },
        ]}
      />

      {/* Header Banner */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold">
                {journey.category || 'General'}
              </span>
              <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {journey.difficulty || 'All Levels'}
              </span>
              {journey.goal && (
                <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  🎯 {journey.goal}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-1.5">
              {journey.name}
            </h1>

            {journey.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                {journey.description}
              </p>
            )}

            {/* Quick stats row */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-4 flex-wrap">
              <span>{stats.totalLevels} Levels</span>
              <span>•</span>
              <span>{stats.totalSubjects} Subjects</span>
              <span>•</span>
              <span>{stats.totalTopics} Topics</span>
              <span>•</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {stats.completedTopics} Completed
              </span>
            </div>
          </div>

          {/* Progress & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <CircularProgress
              value={stats.overallProgress}
              size={84}
              color="#6366f1"
              label={`${stats.overallProgress}%`}
              sublabel="Complete"
            />

            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
              {stats.currentTopic && (
                <button
                  onClick={() =>
                    navigate(`/journeys/${journey.id}/topics/${stats.currentTopic.id}`)
                  }
                  className="btn-primary text-xs flex-1 sm:flex-initial justify-center py-2 px-4 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Continue Learning
                </button>
              )}

              <button
                onClick={() => navigate(`/journeys/${journey.id}/manage`)}
                className="btn-secondary text-xs flex-1 sm:flex-initial justify-center py-2 px-4"
              >
                <FolderTree className="w-3.5 h-3.5" />
                Journey Builder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Level Expansion Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search topics in this journey..."
          className="w-full sm:max-w-md"
        />

        <button onClick={toggleAll} className="btn-secondary text-xs flex-shrink-0">
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Levels Breakdown */}
      {filteredLevels.length > 0 ? (
        <div className="space-y-4">
          {filteredLevels.map((level) => {
            const levelProgress = calculateLevelProgress(
              level,
              journey.trackingModel,
              journey.skillDimensions
            );
            const isLvlExpanded = expandedLevels[level.id] ?? true;

            return (
              <div key={level.id} id={`level-${level.id}`} className="card overflow-hidden scroll-mt-20">
                {/* Level Header Bar */}
                <button
                  onClick={() => toggleLevel(level.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 text-left transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0 text-indigo-700 dark:text-indigo-400 font-black text-sm">
                    {level.order || '•'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {level.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {(level.subjects || []).length} subjects
                      </span>
                    </div>
                    {level.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {level.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {levelProgress}%
                      </div>
                      <ProgressBar value={levelProgress} height="h-1.5" className="w-20 mt-1" />
                    </div>
                    {isLvlExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Level Content (Subjects) */}
                {isLvlExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-50 dark:border-gray-800/80 space-y-2">
                    {(level.subjects || []).length > 0 ? (
                      level.subjects.map((subj) => (
                        <SubjectCard
                          key={subj.id}
                          subject={subj}
                          level={level}
                          journey={journey}
                          expanded={expandedSubjects[subj.id] ?? true}
                          onToggle={() => toggleSubject(subj.id)}
                          onTopicClick={(topicId) =>
                            navigate(`/journeys/${journey.id}/topics/${topicId}`)
                          }
                        />
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-400">
                        No subjects in this level yet. Open Journey Builder to add subjects.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No topics match your search"
          description={`No topics found matching "${search}".`}
          action={
            <button onClick={() => setSearch('')} className="btn-secondary text-xs">
              Clear Search
            </button>
          }
        />
      )}
    </AppLayout>
  );
}
