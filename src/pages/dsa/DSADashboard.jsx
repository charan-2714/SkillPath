// src/pages/dsa/DSADashboard.jsx
// Main DSA & LeetCode Problem Hub: Analytics, 22-Level Learning Path, Problem Tracker, Revision Queue & Interview Mode

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Binary,
  BookOpen,
  Code2,
  Sparkles,
  RotateCcw,
  Timer,
  CheckCircle2,
  AlertCircle,
  Star,
  Search,
  Filter,
  BarChart3,
  Layers,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  ExternalLink,
  Flame,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../../components/layout/AppLayout';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { useDSA } from '../../context/DSAContext';
import { DSAProblemCard } from '../../components/dsa/DSAProblemCard';
import { DSAInterviewModal } from '../../components/dsa/DSAInterviewModal';
import { DSA_STATUSES, AI_USAGE_MODES } from '../../models/dsaSchema';

const TABS = [
  { id: 'tracker', label: 'Problem Tracker', icon: Code2 },
  { id: 'learning-path', label: '22-Level Learning Path', icon: Layers },
  { id: 'analytics', label: 'Pattern Mastery & Stats', icon: BarChart3 },
  { id: 'revision', label: 'Revision Queue', icon: RotateCcw },
];

const DIFFICULTY_OPTIONS = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

const COMPANY_OPTIONS = ['All Companies', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Uber', 'Bloomberg'];

export default function DSADashboard() {
  const navigate = useNavigate();
  const {
    problems,
    patterns,
    learningPath,
    userProgress,
    overallStats,
    patternStats,
    revisionQueue,
    scheduleRevision,
    completeRevision,
  } = useDSA();

  const [activeTab, setActiveTab] = useState('tracker');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [patternFilter, setPatternFilter] = useState('All Patterns');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [companyFilter, setCompanyFilter] = useState('All Companies');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState({ 'dsa-l1': true, 'dsa-l2': true });
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);

  // Extract all unique topics
  const allTopics = useMemo(() => {
    const set = new Set();
    problems.forEach((p) => {
      (p.topics || []).forEach((t) => set.add(t));
    });
    return ['All Topics', ...Array.from(set).sort()];
  }, [problems]);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const up = userProgress[p.id] || {};

      // Difficulty filter
      if (difficultyFilter !== 'All Difficulties' && p.difficulty !== difficultyFilter) return false;

      // Topic filter
      if (topicFilter !== 'All Topics' && !(p.topics || []).includes(topicFilter)) return false;

      // Pattern filter
      if (patternFilter !== 'All Patterns' && !(p.patterns || []).includes(patternFilter)) return false;

      // Status filter
      if (statusFilter !== 'All Statuses') {
        const curStatus = up.status || 'not-started';
        if (curStatus !== statusFilter) return false;
      }

      // Company filter
      if (companyFilter !== 'All Companies' && !(p.companyTags || []).includes(companyFilter)) return false;

      // Favorites only
      if (favoritesOnly && !up.favorite) return false;

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = (p.title || '').toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        const matchesTopics = (p.topics || []).some((t) => t.toLowerCase().includes(q));
        const matchesPatterns = (p.patterns || []).some((pat) => pat.toLowerCase().includes(q));
        const matchesCompany = (p.companyTags || []).some((c) => c.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesTopics || matchesPatterns || matchesCompany;
      }

      return true;
    });
  }, [problems, userProgress, search, difficultyFilter, topicFilter, patternFilter, statusFilter, companyFilter, favoritesOnly]);

  const toggleLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  return (
    <AppLayout pageTitle="DSA & LeetCode Tracker">
      <PageHeader
        title="DSA & Problem-Solving Studio"
        subtitle="Master the 22 core algorithmic patterns, track LeetCode solutions, manage spaced-repetition revision, and evaluate AI independence."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInterviewModalOpen(true)}
              className="btn-secondary text-xs flex items-center gap-1.5 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold"
            >
              <Timer className="w-3.5 h-3.5" />
              Mock Interview Mode
            </button>
          </div>
        }
      />

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="card p-3.5 border-l-4 border-indigo-500">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Curated</div>
          <div className="text-xl font-black text-gray-900 dark:text-gray-100 mt-1">{overallStats.total}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">{patterns.length} Patterns</div>
        </div>

        <div className="card p-3.5 border-l-4 border-emerald-500">
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Solved</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{overallStats.solved}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">{overallStats.solvedPercentage}% Completed</div>
        </div>

        <div className="card p-3.5 border-l-4 border-amber-500">
          <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Attempted</div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">{overallStats.attempted}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">In Progress</div>
        </div>

        <div className="card p-3.5 border-l-4 border-purple-500">
          <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Independent</div>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">{overallStats.independentCount}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Unassisted (4-5★)</div>
        </div>

        <div className="card p-3.5 border-l-4 border-orange-500">
          <div className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Revision Due</div>
          <div className="text-xl font-black text-orange-600 dark:text-orange-400 mt-1">
            {revisionQueue.dueToday.length + revisionQueue.overdue.length}
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">Spaced Repetition</div>
        </div>

        <div className="card p-3.5 border-l-4 border-blue-500">
          <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Mastered</div>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">{overallStats.mastered}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Retained Invariants</div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 mb-6 overflow-x-auto scrollbar-thin">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.id === 'revision' && (revisionQueue.dueToday.length + revisionQueue.overdue.length > 0) && (
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROBLEM TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          {/* Search & Multi-Filter Controls */}
          <div className="card p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search LeetCode problems, patterns, topics, or companies..."
                className="flex-1"
              />

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="select text-xs py-2 px-3 font-medium"
                >
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select text-xs py-2 px-3 font-medium"
                >
                  <option value="All Statuses">All Statuses</option>
                  {DSA_STATUSES.map((st) => (
                    <option key={st.id} value={st.id}>{st.label}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    favoritesOnly
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-700 dark:text-amber-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                  title="Show Favorites Only"
                >
                  <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                  Favorites
                </button>
              </div>
            </div>

            {/* Secondary filters: Topics & Patterns */}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100 dark:border-gray-800/80">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="select text-xs py-1.5 px-2.5 font-medium max-w-[200px]"
              >
                {allTopics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={patternFilter}
                onChange={(e) => setPatternFilter(e.target.value)}
                className="select text-xs py-1.5 px-2.5 font-medium max-w-[220px]"
              >
                <option value="All Patterns">All Patterns</option>
                {patterns.map((pat) => (
                  <option key={pat.id} value={pat.id}>{pat.name}</option>
                ))}
              </select>

              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="select text-xs py-1.5 px-2.5 font-medium max-w-[180px]"
              >
                {COMPANY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {(search || difficultyFilter !== 'All Difficulties' || topicFilter !== 'All Topics' || patternFilter !== 'All Patterns' || statusFilter !== 'All Statuses' || companyFilter !== 'All Companies' || favoritesOnly) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setDifficultyFilter('All Difficulties');
                    setTopicFilter('All Topics');
                    setPatternFilter('All Patterns');
                    setStatusFilter('All Statuses');
                    setCompanyFilter('All Companies');
                    setFavoritesOnly(false);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline px-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Problem Cards Grid */}
          {filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((problem) => (
                <DSAProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No matching problems found"
              description="Try adjusting your filter options or search term."
              action={
                <button
                  onClick={() => {
                    setSearch('');
                    setDifficultyFilter('All Difficulties');
                    setTopicFilter('All Topics');
                    setPatternFilter('All Patterns');
                    setStatusFilter('All Statuses');
                    setCompanyFilter('All Companies');
                    setFavoritesOnly(false);
                  }}
                  className="btn-secondary text-xs"
                >
                  Clear Filters
                </button>
              }
            />
          )}
        </div>
      )}

      {/* TAB 2: 22-LEVEL LEARNING PATH */}
      {activeTab === 'learning-path' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Structured 22-Level Algorithmic Curriculum:</strong> Progressive mastery from Big-O complexity through Trees, Backtracking, Graphs, and Advanced Multi-Pattern Dynamic Programming. Click any level to view core concepts and direct practice problems.
          </div>

          {learningPath.map((lvl) => {
            const isExpanded = !!expandedLevels[lvl.id];
            const lvlProblemIds = (lvl.topics || []).flatMap((t) => t.problemIds || []);
            const lvlProblems = problems.filter((p) => lvlProblemIds.includes(p.id));
            const solvedCount = lvlProblems.filter((p) => {
              const up = userProgress[p.id];
              return up && (up.status === 'solved' || up.status === 'mastered');
            }).length;
            const progressPct = lvlProblems.length > 0 ? Math.round((solvedCount / lvlProblems.length) * 100) : 0;

            return (
              <div
                key={lvl.id}
                className="card overflow-hidden border border-gray-200 dark:border-gray-800 transition-all"
              >
                {/* Level Header */}
                <button
                  type="button"
                  onClick={() => toggleLevel(lvl.id)}
                  className="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      L{lvl.level}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {lvl.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {lvl.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {solvedCount} / {lvlProblems.length} Solved
                      </div>
                      <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Level Details */}
                {isExpanded && (
                  <div className="p-4 space-y-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-850/40">
                    {(lvl.topics || []).map((topic) => (
                      <div key={topic.id} className="space-y-3">
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                            {topic.title}
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            {topic.description}
                          </p>
                        </div>

                        {/* Subtopics */}
                        {topic.subtopics?.length > 0 && (
                          <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-1.5">
                            <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                              Core Concepts & Patterns:
                            </div>
                            <ul className="space-y-1">
                              {topic.subtopics.map((st, idx) => (
                                <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                                  <span>{st}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Linked Practice Problems */}
                        {lvlProblems.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                              Curated Practice Problems ({lvlProblems.length})
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {lvlProblems.map((p) => (
                                <DSAProblemCard key={p.id} problem={p} compact />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: PATTERN MASTERY & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Difficulty & AI Independence Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Difficulty Breakdown */}
            <div className="card p-5 space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Difficulty Breakdown
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400">Easy</span>
                    <span>{overallStats.easySolved} / {overallStats.easyTotal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${overallStats.easyTotal > 0 ? (overallStats.easySolved / overallStats.easyTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-600 dark:text-amber-400">Medium</span>
                    <span>{overallStats.mediumSolved} / {overallStats.mediumTotal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${overallStats.mediumTotal > 0 ? (overallStats.mediumSolved / overallStats.mediumTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-600 dark:text-rose-400">Hard</span>
                    <span>{overallStats.hardSolved} / {overallStats.hardTotal}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${overallStats.hardTotal > 0 ? (overallStats.hardSolved / overallStats.hardTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Independence Breakdown */}
            <div className="card p-5 space-y-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-500" />
                AI Independence Distribution
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
                  <span className="font-bold text-purple-900 dark:text-purple-200">★ 5/5 Solved Independently</span>
                  <span className="font-mono font-black text-purple-700 dark:text-purple-300">{overallStats.independentCount}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                  <span className="font-bold text-blue-900 dark:text-blue-200">★ 3/5 Solved With Hint</span>
                  <span className="font-mono font-black text-blue-700 dark:text-blue-300">{overallStats.withHintCount}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                  <span className="font-bold text-amber-900 dark:text-amber-200">★ 2/5 Solved With AI Assistance</span>
                  <span className="font-mono font-black text-amber-700 dark:text-amber-300">{overallStats.withAiCount}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-gray-700 dark:text-gray-300">★ 1/5 Copied / Editorial Studied</span>
                  <span className="font-mono font-black text-gray-600 dark:text-gray-400">{overallStats.copiedCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pattern Mastery Grid */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Algorithmic Pattern Mastery
              </h4>
              <span className="text-xs text-gray-400">
                Calculated from unassisted solving & repetition
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {patternStats.map((pat) => (
                <div
                  key={pat.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                    pat.tier === 'strong'
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40'
                      : pat.tier === 'developing'
                      ? 'bg-amber-50/40 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40'
                      : 'bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                        {pat.name}
                      </span>
                      <span
                        className={`badge text-[9px] font-bold ${
                          pat.tier === 'strong'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : pat.tier === 'developing'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {pat.tier.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-2">
                      <span>{pat.solvedCount} / {pat.totalProblems} Solved</span>
                      <span className="font-bold">{pat.completionRate}%</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pat.tier === 'strong'
                            ? 'bg-emerald-500'
                            : pat.tier === 'developing'
                            ? 'bg-amber-500'
                            : 'bg-indigo-500'
                        }`}
                        style={{ width: `${pat.completionRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-400 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>{pat.independentCount} Independent</span>
                    <button
                      onClick={() => {
                        setPatternFilter(pat.id);
                        setActiveTab('tracker');
                      }}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      View Problems →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REVISION QUEUE */}
      {activeTab === 'revision' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-900/10 via-amber-900/10 to-transparent dark:from-orange-950/30 dark:via-amber-950/20 border border-orange-200 dark:border-orange-900/50">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-orange-500" />
              Spaced Repetition Problem Queue
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Revise solved problems after 1, 3, 7, 14, or 30 days to build permanent pattern retention.
            </p>
          </div>

          {/* Due Today & Overdue */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Due for Revision ({revisionQueue.dueToday.length + revisionQueue.overdue.length})
            </h4>

            {revisionQueue.dueToday.length + revisionQueue.overdue.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...revisionQueue.overdue, ...revisionQueue.dueToday].map(({ problem }) => (
                  <DSAProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center text-gray-500 text-xs">
                🎉 No revisions due today! You are all caught up on your spaced repetition queue.
              </div>
            )}
          </div>

          {/* Upcoming Revisions */}
          {revisionQueue.upcoming.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Upcoming Revisions ({revisionQueue.upcoming.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {revisionQueue.upcoming.map(({ problem }) => (
                  <DSAProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mock Interview Modal */}
      {interviewModalOpen && (
        <DSAInterviewModal
          isOpen={interviewModalOpen}
          onClose={() => setInterviewModalOpen(false)}
        />
      )}
    </AppLayout>
  );
}
