// src/pages/Dashboard.jsx
// Professional Dashboard: Active Roadmap Hero, Unified Stat KPIs, Study Queue & DSA Practice Hub

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Play,
  Sparkles,
  Target,
  Flame,
  CheckCircle2,
  Code2,
  FolderTree,
  ArrowRight,
  ChevronRight,
  Compass,
  Zap,
  Binary,
  RotateCcw,
  BookOpen,
  Layers,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { ProgressBar } from '../components/common/ProgressBar';
import { CreateJourneyModal } from '../components/journeys/CreateJourneyModal';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useJourneys } from '../hooks/useJourneys';
import { useDSA } from '../context/DSAContext';
import { getJourneyStats, calculateTopicProgress } from '../utils/calculations';
import { TEMPLATES } from '../data/templates';

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    activeJourneys,
    activeJourney,
    createJourney,
    createFromTemplate,
  } = useJourneys();

  const dsaContext = useDSA();
  const dsaStats = dsaContext?.overallStats || dsaContext?.stats || {
    solved: 0,
    total: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  };
  const revisionQueue = dsaContext?.revisionQueue || [];

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const stats = useMemo(() => getJourneyStats(activeJourney), [activeJourney]);
  const streak = state.analytics?.streakDays || 0;
  const userName = user?.displayName || state.settings?.userName || 'Learner';

  // Next topics queue in active journey
  const nextTopics = useMemo(() => {
    if (!activeJourney || !activeJourney.levels) return [];
    const queue = [];
    for (const lvl of activeJourney.levels) {
      for (const sub of (lvl.subjects || [])) {
        for (const top of (sub.topics || [])) {
          const p = calculateTopicProgress(top, activeJourney.trackingModel, activeJourney.skillDimensions);
          if (top.status !== 'completed' && p < 100) {
            queue.push({
              topic: top,
              level: lvl,
              subject: sub,
              progress: p,
            });
            if (queue.length >= 3) return queue;
          }
        }
      }
    }
    return queue;
  }, [activeJourney]);

  const handleStartTemplate = (templateId) => {
    const journey = createFromTemplate(templateId);
    navigate(`/journeys/${journey.id}`);
  };

  const handleSwitchJourney = (jId, shouldNavigate = false) => {
    if (jId === 'create') {
      navigate('/templates');
    } else if (jId) {
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: jId });
      if (shouldNavigate) {
        navigate(`/journeys/${jId}`);
      }
    }
  };

  // FIRST RUN ONBOARDING (0 Journeys)
  if (!state.journeys || state.journeys.length === 0) {
    return (
      <AppLayout pageTitle="Welcome to SkillPath">
        <div className="max-w-4xl mx-auto py-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Welcome to SkillPath
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Build your learning journey. Track algorithmic problems. Master your engineering skills with structured curriculum templates.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn-primary text-sm px-5 py-2.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create Custom Journey
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="btn-secondary text-sm px-5 py-2.5"
              >
                <Compass className="w-4 h-4" />
                Explore 30+ Role Templates
              </button>
            </div>
          </div>

          {/* Quick Starter Templates */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-1">
              Popular Starter Templates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEMPLATES.slice(0, 6).map((template) => (
                <div
                  key={template.id}
                  className="card p-5 flex flex-col justify-between hover:shadow-card-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-medium">
                        {template.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {template.levels?.length} levels
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {template.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleStartTemplate(template.id)}
                    className="btn-primary text-xs w-full justify-center mt-4"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CreateJourneyModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSave={createJourney}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout pageTitle="Dashboard">
      {/* 1. HERO BANNER: Active Learning Roadmap */}
      {activeJourney && (
        <div className="card p-6 mb-6 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-600 text-white shadow-xs">
                  Active Roadmap
                </span>
                {stats.currentLevel && (
                  <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                    {stats.currentLevel.title}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {activeJourney.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{stats.completedTopics} of {stats.totalTopics} topics completed</span>
                <span>•</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{stats.overallProgress}% mastered</span>
              </div>

              <ProgressBar value={stats.overallProgress} height="h-2" className="max-w-md" />
            </div>

            <div className="flex items-center gap-3 flex-wrap md:flex-col md:items-end">
              {stats.currentTopic ? (
                <button
                  onClick={() =>
                    navigate(`/journeys/${activeJourney.id}/topics/${stats.currentTopic.id}`)
                  }
                  className="btn-primary text-xs px-5 py-2.5 shadow-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Resume: {stats.currentTopic.title.slice(0, 22)}...
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/journeys/${activeJourney.id}`)}
                  className="btn-primary text-xs px-5 py-2.5 shadow-sm"
                >
                  Open Full Roadmap
                </button>
              )}

              {/* Journey Switcher Dropdown */}
              {activeJourneys.length > 1 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">Switch:</span>
                  <select
                    value={activeJourney.id}
                    onChange={(e) => handleSwitchJourney(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs py-1 px-2 text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none"
                  >
                    {activeJourneys.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. THREE KEY METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Roadmap Progress */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-400 font-medium">Curriculum Progress</div>
            <div className="text-xl font-black text-gray-900 dark:text-gray-100">
              {stats.overallProgress}%
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              {stats.completedTopics} / {stats.totalTopics} Topics
            </div>
          </div>
        </div>

        {/* DSA Problems Solved */}
        <div
          onClick={() => navigate('/dsa')}
          className="card p-4 flex items-center gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Binary className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-400 font-medium">DSA Problems Solved</div>
            <div className="text-xl font-black text-gray-900 dark:text-gray-100">
              {dsaStats.solved} <span className="text-xs font-normal text-gray-400">/ {dsaStats.total}</span>
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
              {dsaStats.easySolved}E • {dsaStats.mediumSolved}M • {dsaStats.hardSolved}H
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-gray-400 font-medium">Daily Streak</div>
            <div className="text-xl font-black text-orange-600 dark:text-orange-400">
              {streak} Days
            </div>
            <div className="text-[11px] text-gray-500">
              {streak > 0 ? 'Consistent learning!' : 'Study today to build streak'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TWO BALANCED ACTIVITY COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* COLUMN 1: Active Roadmap Study Queue */}
        <div className="card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Roadmap Study Queue
                </h2>
              </div>
              {activeJourney && (
                <button
                  onClick={() => navigate(`/journeys/${activeJourney.id}`)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                >
                  View full tree <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Current Focus Highlight */}
            {stats.currentTopic && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    Current Focus
                  </span>
                  <span className="text-[10px] text-indigo-600 font-mono">
                    {stats.currentTopic.levelTitle}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {stats.currentTopic.title}
                </h3>
                {stats.currentTopic.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {stats.currentTopic.description}
                  </p>
                )}
                <button
                  onClick={() =>
                    navigate(`/journeys/${activeJourney.id}/topics/${stats.currentTopic.id}`)
                  }
                  className="btn-primary text-xs py-1.5 px-3 w-full justify-center mt-2"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Continue Topic
                </button>
              </div>
            )}

            {/* Next in Queue */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Up Next in Line
              </h4>
              {nextTopics.length > 0 ? (
                nextTopics.map((item, idx) => (
                  <button
                    key={item.topic.id}
                    onClick={() =>
                      navigate(`/journeys/${activeJourney.id}/topics/${item.topic.id}`)
                    }
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-white dark:bg-gray-700 text-[10px] font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-indigo-600">
                          {item.topic.title}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate">
                          {item.level.title}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-gray-400">
                  All queued topics completed! ✨
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 2: DSA & Problem Solving Studio */}
        <div className="card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-purple-600" />
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  DSA Problem Solving Studio
                </h2>
              </div>
              <button
                onClick={() => navigate('/dsa')}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5"
              >
                Open Studio <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Spaced Repetition Due Today or Mock Screen CTA */}
            <div className="mt-4">
              {revisionQueue && revisionQueue.length > 0 ? (
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <RotateCcw className="w-3 h-3" />
                      {revisionQueue.length} Problems Due for Revision
                    </span>
                    <span className="text-[10px] text-purple-600">Spaced Repetition</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Strengthen neural recall by re-attempting problems scheduled for review today.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {revisionQueue.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => navigate(`/dsa/problems/${p.id}`)}
                        className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between text-xs cursor-pointer hover:border-purple-400"
                      >
                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">{p.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded capitalize font-medium bg-gray-100 dark:bg-gray-700">{p.difficulty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/60 to-indigo-50/40 dark:from-purple-950/30 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      30-Min Timed Mock Screen
                    </span>
                    <span className="text-[10px] text-purple-600">Interview Mode</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Test your pattern recognition under realistic constraints with AI-free timed problem solving.
                  </p>
                  <button
                    onClick={() => navigate('/dsa')}
                    className="btn-secondary text-xs py-1.5 w-full justify-center mt-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50"
                  >
                    Start Mock Screen
                  </button>
                </div>
              )}
            </div>

            {/* Quick Difficulty Breakdown */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Curated LeetCode Coverage</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {dsaStats.solved} / {dsaStats.total} Solved
                </span>
              </div>
              <ProgressBar
                value={dsaStats.total > 0 ? (dsaStats.solved / dsaStats.total) * 100 : 0}
                color="purple"
                height="h-2"
              />
            </div>
          </div>

          <button
            onClick={() => navigate('/dsa')}
            className="btn-primary text-xs w-full justify-center mt-2"
          >
            <Binary className="w-3.5 h-3.5" />
            Explore 60+ LeetCode Patterns
          </button>
        </div>
      </div>

      {/* 4. SWITCH LEARNING JOURNEY OR EXPLORE TEMPLATES */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              My Active Roadmaps ({activeJourneys.length})
            </h3>
            <p className="text-xs text-gray-400">
              Quickly jump between your custom learning tracks or adopt a new technology role.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/templates')}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Explore Templates
            </button>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              New Journey
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeJourneys.map((j) => {
            const isSelected = activeJourney?.id === j.id;
            const jStats = getJourneyStats(j);

            return (
              <div
                key={j.id}
                onClick={() => handleSwitchJourney(j.id, true)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-indigo-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {j.category || 'Engineering'}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {jStats.overallProgress}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                    {j.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {jStats.completedTopics} of {jStats.totalTopics} topics
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-750 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-indigo-600 font-bold' : 'text-gray-400'}>
                    {isSelected ? '● Currently Active' : 'Click to Switch'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <CreateJourneyModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={createJourney}
      />
    </AppLayout>
  );
}
