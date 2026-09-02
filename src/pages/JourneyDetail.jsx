// src/pages/JourneyDetail.jsx
// Premium, high-level roadmap: Levels expand to show Modules; clicking a module smartly resumes the next uncompleted topic

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FolderTree,
  Play,
  BarChart3,
  ChevronDown,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowLeft,
  Check,
  Zap,
  BookOpen,
  Code2,
  ArrowUpRight,
  Boxes,
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

// Curated vibrant color themes for distinct milestone levels
const LEVEL_COLOR_PALETTES = [
  {
    name: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    headerBg: 'bg-gradient-to-r from-sky-50/80 via-blue-50/30 to-transparent dark:from-sky-950/40 dark:via-blue-950/20',
    badge: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25',
    pill: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    pillActive: 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/30',
    border: 'border-sky-200/80 dark:border-sky-800/80 hover:border-sky-400',
    accentBar: 'from-sky-500 to-blue-600',
    iconBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300',
    progressColor: 'bg-sky-500',
    textAccent: 'text-sky-600 dark:text-sky-400',
    tag: '⚡ Foundations & Setup',
  },
  {
    name: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    headerBg: 'bg-gradient-to-r from-violet-50/80 via-purple-50/30 to-transparent dark:from-violet-950/40 dark:via-purple-950/20',
    badge: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25',
    pill: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    pillActive: 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-600/30',
    border: 'border-violet-200/80 dark:border-violet-800/80 hover:border-violet-400',
    accentBar: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300',
    progressColor: 'bg-violet-500',
    textAccent: 'text-violet-600 dark:text-violet-400',
    tag: '🧠 Core Mechanics',
  },
  {
    name: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    headerBg: 'bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-transparent dark:from-emerald-950/40 dark:via-teal-950/20',
    badge: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25',
    pill: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    pillActive: 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30',
    border: 'border-emerald-200/80 dark:border-emerald-800/80 hover:border-emerald-400',
    accentBar: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
    progressColor: 'bg-emerald-500',
    textAccent: 'text-emerald-600 dark:text-emerald-400',
    tag: '🌿 Data & Architecture',
  },
  {
    name: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    headerBg: 'bg-gradient-to-r from-amber-50/80 via-orange-50/30 to-transparent dark:from-amber-950/40 dark:via-orange-950/20',
    badge: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25',
    pill: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    pillActive: 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30',
    border: 'border-amber-200/80 dark:border-amber-800/80 hover:border-amber-400',
    accentBar: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
    progressColor: 'bg-amber-500',
    textAccent: 'text-amber-600 dark:text-amber-400',
    tag: '☀️ Integration & Cloud',
  },
  {
    name: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    headerBg: 'bg-gradient-to-r from-rose-50/80 via-pink-50/30 to-transparent dark:from-rose-950/40 dark:via-pink-950/20',
    badge: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25',
    pill: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    pillActive: 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/30',
    border: 'border-rose-200/80 dark:border-rose-800/80 hover:border-rose-400',
    accentBar: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300',
    progressColor: 'bg-rose-500',
    textAccent: 'text-rose-600 dark:text-rose-400',
    tag: '🔮 Advanced Specialization',
  },
  {
    name: 'cyan',
    gradient: 'from-cyan-500 to-teal-600',
    headerBg: 'bg-gradient-to-r from-cyan-50/80 via-teal-50/30 to-transparent dark:from-cyan-950/40 dark:via-teal-950/20',
    badge: 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-md shadow-cyan-500/25',
    pill: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    pillActive: 'bg-cyan-600 text-white border-cyan-600 shadow-sm shadow-cyan-600/30',
    border: 'border-cyan-200/80 dark:border-cyan-800/80 hover:border-cyan-400',
    accentBar: 'from-cyan-500 to-teal-600',
    iconBg: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300',
    progressColor: 'bg-cyan-500',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    tag: '🛡️ Production & Security',
  },
];

// Robust level numbering and theme resolver
function getLevelOrder(lvl, fallbackIdx = 0) {
  if (!lvl) return fallbackIdx;
  const m = (lvl.title || '').match(/^(?:Level|L)\s*(\d+)/i);
  if (m) return parseInt(m[1], 10);
  if (lvl.order !== undefined && typeof lvl.order === 'number') return lvl.order;
  const idM = (lvl.id || '').match(/(?:level|l)[-_]?(\d+)$/i);
  if (idM) return parseInt(idM[1], 10);
  return fallbackIdx;
}

function getLevelInfo(level, index) {
  const num = level.order !== undefined && typeof level.order === 'number' ? level.order : index;
  const label = `L${num < 10 ? `0${num}` : num}`;
  const theme = LEVEL_COLOR_PALETTES[num % LEVEL_COLOR_PALETTES.length];
  return { num, label, theme };
}

// Smart helper to find the active or next uncompleted topic in a subject
function getActiveTopicForSubject(subject, trackingModel, skillDimensions) {
  const topics = subject.topics || [];
  if (topics.length === 0) return null;

  // 1. Topic in progress (status: learning or practicing)
  const inProgressTopic = topics.find(
    (t) => t.status === 'learning' || t.status === 'practicing'
  );
  if (inProgressTopic) return inProgressTopic;

  // 2. First topic with partial progress
  const partialTopic = topics.find((t) => {
    const p = calculateTopicProgress(t, trackingModel, skillDimensions);
    return p > 0 && p < 100 && t.status !== 'completed';
  });
  if (partialTopic) return partialTopic;

  // 3. First topic that is not completed
  const uncompletedTopic = topics.find((t) => {
    const p = calculateTopicProgress(t, trackingModel, skillDimensions);
    return t.status !== 'completed' && p < 100;
  });
  if (uncompletedTopic) return uncompletedTopic;

  // 4. Fallback to first topic
  return topics[0];
}

// Renders a high-level Subject / Module card inside the level
function SubjectRow({ subject, level, journey, levelTheme, onClick }) {
  const subjectProgress = calculateSubjectProgress(
    subject,
    journey.trackingModel,
    journey.skillDimensions
  );
  const topics = subject.topics || [];
  const activeTopic = getActiveTopicForSubject(subject, journey.trackingModel, journey.skillDimensions);
  const totalConcepts = topics.flatMap((t) => t.learningItems || t.subtopics || []).length;
  const isSubjectDone = subjectProgress >= 100;
  const isSubjectActive = subjectProgress > 0 && subjectProgress < 100;
  const completedTopicsCount = topics.filter(
    (t) => t.status === 'completed' || calculateTopicProgress(t, journey.trackingModel, journey.skillDimensions) >= 100
  ).length;

  return (
    <div
      onClick={() => onClick(activeTopic?.id)}
      role="button"
      tabIndex={0}
      title={activeTopic ? `Open ${activeTopic.title}` : `Open ${subject.title}`}
      className={`group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-150 cursor-pointer border ${
        isSubjectDone
          ? 'bg-emerald-50/25 dark:bg-emerald-950/15 border-emerald-200/60 dark:border-emerald-900/30 hover:border-emerald-400'
          : isSubjectActive
          ? 'bg-gradient-to-r from-sky-50/70 via-blue-50/30 to-transparent dark:from-sky-950/40 dark:via-blue-950/20 dark:to-gray-900 border-sky-300/80 dark:border-sky-700/80 shadow-2xs hover:border-sky-500'
          : 'bg-white dark:bg-gray-850/90 border-gray-200/90 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-gray-50/60 dark:hover:bg-gray-800'
      }`}
    >
      {/* Active Indicator Bar */}
      {isSubjectActive && (
        <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b ${levelTheme.accentBar}`} />
      )}

      <div className="flex items-center gap-3.5 min-w-0 flex-1 pl-1">
        {/* Module Icon Node */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
            isSubjectDone
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xs'
              : isSubjectActive
              ? `bg-gradient-to-tr ${levelTheme.gradient} text-white shadow-2xs`
              : `${levelTheme.iconBg} group-hover:scale-105`
          }`}
        >
          {isSubjectDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Boxes className="w-4 h-4" />}
        </div>

        {/* Title & Metadata */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
              {subject.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex-wrap">
            <span className="font-semibold text-gray-600 dark:text-gray-400">
              {completedTopicsCount}/{topics.length} Topics Mastered
            </span>
            {activeTopic && !isSubjectDone && (
              <span className="text-sky-600 dark:text-sky-400 font-medium truncate max-w-sm">
                • Active: <strong>{activeTopic.title}</strong>
              </span>
            )}
            {isSubjectDone && (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                • All topics completed ✓
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Progress & Action Arrow */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 ml-3">
        <div className="text-right">
          <span className="text-xs font-black text-gray-700 dark:text-gray-300 font-mono">
            {subjectProgress}%
          </span>
          <div className="w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden mt-1">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isSubjectDone ? 'bg-emerald-500' : levelTheme.progressColor
              }`}
              style={{ width: `${subjectProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 hidden sm:flex">
          <span>{isSubjectDone ? 'Review' : isSubjectActive ? 'Resume' : 'Start'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function JourneyDetail() {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const { journey, stats } = useJourney(journeyId);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedLevels, setExpandedLevels] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

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

  // Sorted and filtered levels
  const sortedAndFilteredLevels = useMemo(() => {
    const rawLevels = journey.levels || [];

    // 2. Filter subjects based on search & status
    return rawLevels
      .map((lvl) => {
        const filteredSubs = (lvl.subjects || []).filter((sub) => {
          const subProgress = calculateSubjectProgress(
            sub,
            journey.trackingModel,
            journey.skillDimensions
          );
          if (statusFilter === 'completed' && subProgress < 100) return false;
          if (statusFilter === 'in-progress' && (subProgress === 0 || subProgress >= 100)) return false;
          if (statusFilter === 'not-started' && subProgress > 0) return false;

          if (search.trim()) {
            const q = search.toLowerCase();
            const inSub = (sub.title || '').toLowerCase().includes(q);
            const inDesc = (sub.description || '').toLowerCase().includes(q);
            const inTopics = (sub.topics || []).some(
              (t) => (t.title || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
            );
            const inLvl = (lvl.title || '').toLowerCase().includes(q);
            return inSub || inDesc || inTopics || inLvl;
          }

          return true;
        });

        return {
          ...lvl,
          subjects: filteredSubs,
        };
      })
      .filter((lvl) => lvl.subjects.length > 0);
  }, [journey.levels, search, statusFilter]);

  const toggleLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !Boolean(prev[lvlId]) }));
  };

  const toggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const lvlMap = {};
    (journey.levels || []).forEach((lvl) => {
      lvlMap[lvl.id] = nextState;
    });
    setExpandedLevels(lvlMap);
  };

  const scrollToLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: true }));
    const el = document.getElementById(`level-${lvlId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AppLayout pageTitle={journey.name}>
      <Breadcrumbs
        items={[
          { label: 'My Journeys', to: '/journeys' },
          { label: journey.name },
        ]}
      />

      {/* 1. HERO HEADER BANNER */}
      <div className="card p-6 sm:p-7 mb-6 bg-gradient-to-r from-sky-900/15 via-blue-900/10 to-transparent dark:from-sky-950/50 dark:via-blue-950/30 dark:to-gray-900 border-sky-200/70 dark:border-sky-800/60 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-xs">
                {journey.category || 'Roadmap'}
              </span>
              <span className="badge bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {journey.difficulty || 'All Levels'}
              </span>
              {journey.goal && (
                <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  🎯 {journey.goal}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              {journey.name}
            </h1>

            {journey.description && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {journey.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 pt-1 flex-wrap font-medium">
              <span>{stats.totalLevels} Milestone Levels</span>
              <span>•</span>
              <span>{stats.totalSubjects} Modules</span>
              <span>•</span>
              <span>{stats.totalTopics} Topics</span>
              <span>•</span>
              <span className="font-bold text-sky-600 dark:text-sky-400">
                {stats.completedTopics} Completed ({stats.overallProgress}%)
              </span>
            </div>
          </div>

          {/* Progress Dial & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <CircularProgress
              value={stats.overallProgress}
              size={88}
              color="#0ea5e9"
              label={`${stats.overallProgress}%`}
              sublabel="Mastery"
            />

            <div className="flex flex-row sm:flex-col gap-2.5 w-full sm:w-auto">
              {stats.currentTopic && (
                <button
                  onClick={() =>
                    navigate(`/journeys/${journey.id}/topics/${stats.currentTopic.id}`)
                  }
                  className="btn-primary text-xs flex-1 sm:flex-initial justify-center py-2.5 px-4 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Resume Learning
                </button>
              )}

              <button
                onClick={() => navigate(`/journeys/${journey.id}/manage`)}
                className="btn-secondary text-xs flex-1 sm:flex-initial justify-center py-2.5 px-4 font-semibold"
              >
                <FolderTree className="w-3.5 h-3.5" />
                Curriculum Builder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MULTI-COLOR QUICK LEVEL JUMPER PILLS */}
      {(journey.levels || []).length > 1 && (
        <div className="mb-5 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider mr-1">
              Milestones:
            </span>
            {(journey.levels || []).map((lvl, idx) => {
                const { label, theme } = getLevelInfo(lvl, idx);
                const lvlProgress = calculateLevelProgress(lvl, journey.trackingModel, journey.skillDimensions);
                const isLvlComplete = lvlProgress >= 100;
                const isLvlActive = lvlProgress > 0 && lvlProgress < 100;

                return (
                  <button
                    key={lvl.id}
                    onClick={() => scrollToLevel(lvl.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
                      isLvlComplete
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : isLvlActive
                        ? theme.pillActive
                        : `${theme.pill} hover:scale-[1.03]`
                    }`}
                  >
                    <span>{label}</span>
                    {isLvlComplete && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-300 stroke-[3]" />}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* 3. SEARCH & STATUS FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5 w-full sm:max-w-xl flex-wrap">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search modules or concepts..."
            className="flex-1"
          />

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {['all', 'in-progress', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-2xs'
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {st === 'all' ? 'All' : st.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={toggleAll}
          className="btn-secondary text-xs self-end sm:self-center whitespace-nowrap font-bold"
        >
          {allExpanded ? 'Collapse All Levels' : 'Expand All Levels'}
        </button>
      </div>

      {/* 4. CURRICULUM LEVELS BREAKDOWN */}
      {sortedAndFilteredLevels.length > 0 ? (
        <div className="relative space-y-5">
          {/* Timeline track guide line */}
          <div className="hidden md:block absolute left-9 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-800 z-0" />

          {sortedAndFilteredLevels.map((level, lvlIdx) => {
            const { label: levelBadgeLabel, theme: levelTheme } = getLevelInfo(level, lvlIdx);
            const levelProgress = calculateLevelProgress(
              level,
              journey.trackingModel,
              journey.skillDimensions
            );
            const isLvlExpanded = Boolean(expandedLevels[level.id]);
            const isLevelDone = levelProgress >= 100;
            const isLevelActive = levelProgress > 0 && levelProgress < 100;

            return (
              <div
                key={level.id}
                id={`level-${level.id}`}
                className={`relative z-10 card overflow-hidden scroll-mt-20 border transition-all duration-200 ${
                  isLevelDone
                    ? 'border-emerald-200/90 dark:border-emerald-900/50 shadow-xs'
                    : isLevelActive
                    ? `${levelTheme.border} shadow-md`
                    : `${levelTheme.border} shadow-xs`
                }`}
              >
                {/* Milestone Level Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleLevel(level.id)}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 text-left transition-colors ${
                    isLevelDone
                      ? 'bg-gradient-to-r from-emerald-50/60 via-teal-50/20 to-transparent dark:from-emerald-950/30 dark:via-teal-950/10'
                      : isLevelActive
                      ? levelTheme.headerBg
                      : 'bg-gray-50/80 dark:bg-gray-850 hover:bg-gray-100/70 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Distinct Level Badge */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-all ${
                        isLevelDone
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                          : levelTheme.badge
                      }`}
                    >
                      {isLevelDone ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        levelBadgeLabel
                      )}
                    </div>

                    {/* Level Title & Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-gray-900 dark:text-gray-100 truncate">
                          {level.title}
                        </h3>

                        {/* Distinct Level Phase Tag */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelTheme.pill}`}>
                          {levelTheme.tag}
                        </span>

                        {isLevelActive && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 animate-pulse">
                            Active Focus
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                        <span>{(level.subjects || []).length} Modules</span>
                      </div>
                    </div>
                  </div>

                  {/* Level Right Progress Meter */}
                  <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center justify-end gap-1 text-xs font-black text-gray-800 dark:text-gray-200 font-mono">
                        <span>{levelProgress}%</span>
                      </div>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLevelDone
                              ? 'bg-emerald-500'
                              : levelProgress > 0
                              ? `bg-gradient-to-r ${levelTheme.gradient}`
                              : 'bg-gray-400'
                          }`}
                          style={{ width: `${levelProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-xl bg-white/80 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-2xs transition-transform duration-200 ${
                      isLvlExpanded ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Level Content: ONLY MAIN MODULES SHOWN */}
                {isLvlExpanded && (
                  <div className="p-3 sm:p-4 border-t border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2.5">
                    {(level.subjects || []).length > 0 ? (
                      level.subjects.map((subj) => (
                        <SubjectRow
                          key={subj.id}
                          subject={subj}
                          level={level}
                          journey={journey}
                          levelTheme={levelTheme}
                          onClick={(targetTopicId) =>
                            navigate(`/journeys/${journey.id}/topics/${targetTopicId || subj.topics?.[0]?.id}`)
                          }
                        />
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-400">
                        No modules in this level yet.
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
          title="No modules match your filter"
          description={`No modules found matching "${search || statusFilter}".`}
          action={
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="btn-secondary text-xs"
            >
              Reset Filters
            </button>
          }
        />
      )}
    </AppLayout>
  );
}
