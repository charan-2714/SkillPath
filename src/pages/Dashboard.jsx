// src/pages/Dashboard.jsx
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
  AlertTriangle,
  FolderTree,
  ArrowRight,
  ChevronRight,
  BrainCircuit,
  Compass,
  Zap,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { CircularProgress, ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import { JourneyCard } from '../components/journeys/JourneyCard';
import { CreateJourneyModal } from '../components/journeys/CreateJourneyModal';
import { ConfirmDialog } from '../components/common/Modal';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useJourneys } from '../hooks/useJourneys';
import { useJourney } from '../hooks/useJourney';
import { getJourneyStats, calculateLevelProgress, calculateTopicProgress } from '../utils/calculations';
import { TEMPLATES } from '../data/templates';

function StatCard({ icon, label, value, sub, color = 'indigo', progress }) {
  const colorMap = {
    indigo: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
    blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    orange: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="card p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl ${colorMap[color]} flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</span>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {value}
        </div>
        {sub && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</div>}
      </div>
      {progress !== undefined && (
        <ProgressBar value={progress} color={color} height="h-1.5" className="mt-2.5" />
      )}
    </div>
  );
}

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const {
    activeJourneys,
    activeJourney,
    createJourney,
    createFromTemplate,
    deleteJourney,
    duplicateJourney,
    archiveJourney,
  } = useJourneys();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteJourneyId, setDeleteJourneyId] = useState(null);

  const stats = useMemo(() => getJourneyStats(activeJourney), [activeJourney]);
  const streak = state.analytics?.streakDays || 0;
  const userName = state.settings?.userName || 'Learner';

  const { weakAreas } = useJourney(activeJourney?.id);

  // Motivational message
  const motivationalMsg = useMemo(() => {
    if (!activeJourney) return 'Start or select a journey to begin tracking your growth.';
    if (stats.overallProgress === 0) return `Ready to begin ${activeJourney.name}? Every journey begins with a step!`;
    if (stats.overallProgress < 25) return 'Great start! Consistency is the key to deep mastery.';
    if (stats.overallProgress < 60) return `Solid progress in ${activeJourney.name}! You are building real ability.`;
    if (stats.overallProgress < 90) return 'Impressive momentum! You are approaching advanced mastery.';
    return `Incredible achievement! You have mastered almost all topics in ${activeJourney.name}.`;
  }, [activeJourney, stats.overallProgress]);

  // Next topics queue
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
              Build your learning journey. Track your progress. Master your skills.
              Create your own curriculum from scratch or start with a battle-tested template.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn-primary text-sm px-5 py-2.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create Journey From Scratch
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="btn-secondary text-sm px-5 py-2.5"
              >
                <Compass className="w-4 h-4" />
                Explore All Templates
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
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            👋 Welcome back, {userName}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{motivationalMsg}</p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {activeJourney && stats.currentTopic && (
            <button
              onClick={() =>
                navigate(`/journeys/${activeJourney.id}/topics/${stats.currentTopic.id}`)
              }
              className="btn-primary text-xs px-4 py-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Continue Focus
            </button>
          )}

          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn-secondary text-xs px-3.5 py-2"
          >
            <Plus className="w-3.5 h-3.5" />
            New Journey
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex flex-col items-center justify-center col-span-1">
          <CircularProgress
            value={stats.overallProgress}
            size={76}
            color="#6366f1"
            label={`${stats.overallProgress}%`}
            sublabel="Overall"
          />
          <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-2 text-center truncate max-w-[140px]">
            {activeJourney?.name || 'Overall Progress'}
          </div>
          <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
            {stats.completedTopics} / {stats.totalTopics} topics
          </div>
        </div>

        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Current Level"
          value={stats.currentLevel ? stats.currentLevel.title : 'None'}
          sub={stats.currentLevel ? `${stats.currentLevel.subjects?.length || 0} subjects` : 'All complete'}
          color="blue"
          progress={
            stats.currentLevel
              ? calculateLevelProgress(
                  stats.currentLevel,
                  activeJourney?.trackingModel,
                  activeJourney?.skillDimensions
                )
              : 100
          }
        />

        <StatCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="Practice & Tasks"
          value={`${stats.practiceSolved} / ${stats.totalPractice}`}
          sub={stats.totalPractice > 0 ? `${Math.round((stats.practiceSolved / stats.totalPractice) * 100)}% solved` : 'No practice tasks'}
          color="green"
          progress={stats.totalPractice > 0 ? (stats.practiceSolved / stats.totalPractice) * 100 : 0}
        />

        <StatCard
          icon={<Flame className="w-5 h-5" />}
          label="Daily Streak"
          value={`${streak} Days`}
          sub={streak > 0 ? '🔥 Keep it rolling!' : 'Start studying today!'}
          color={streak > 0 ? 'orange' : 'amber'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Current Focus Card */}
        <div className="card p-5 lg:col-span-1 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100 dark:border-indigo-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Current Focus
              </span>
              <Zap className="w-4 h-4 text-indigo-500" />
            </div>

            {stats.currentTopic ? (
              <>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                  {stats.currentTopic.levelTitle} / {stats.currentTopic.subjectTitle}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {stats.currentTopic.title}
                </h3>
                {stats.currentTopic.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {stats.currentTopic.description}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-gray-500 py-4">
                No active topic in progress. You have finished your current topics or can pick a new focus!
              </p>
            )}
          </div>

          {activeJourney && stats.currentTopic && (
            <button
              onClick={() =>
                navigate(`/journeys/${activeJourney.id}/topics/${stats.currentTopic.id}`)
              }
              className="btn-primary text-xs w-full justify-center py-2 mt-3"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Open Topic
            </button>
          )}
        </div>

        {/* Next Up Queue */}
        <div className="card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title text-sm">Next in Queue</h2>
              {activeJourney && (
                <button
                  onClick={() => navigate(`/journeys/${activeJourney.id}`)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                >
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {nextTopics.length > 0 ? (
              <div className="space-y-2">
                {nextTopics.map((item, idx) => (
                  <button
                    key={item.topic.id}
                    onClick={() =>
                      navigate(`/journeys/${activeJourney.id}/topics/${item.topic.id}`)
                    }
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 text-left transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {item.topic.title}
                      </div>
                      <div className="text-[11px] text-gray-400 truncate">
                        {item.level.title}
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-gray-400">
                All topics in queue are completed! 🎉
              </div>
            )}
          </div>

          {activeJourney && (
            <button
              onClick={() => navigate(`/journeys/${activeJourney.id}/manage`)}
              className="btn-secondary text-xs w-full justify-center mt-3"
            >
              <FolderTree className="w-3.5 h-3.5" />
              Open Journey Builder
            </button>
          )}
        </div>

        {/* Weak Areas Quick Glance */}
        <div className="card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Needs Review</span>
              </h2>
              {activeJourney && (
                <button
                  onClick={() => navigate('/analytics')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Analytics
                </button>
              )}
            </div>

            {weakAreas && weakAreas.length > 0 ? (
              <div className="space-y-2.5">
                {weakAreas.slice(0, 3).map((item) => (
                  <div
                    key={item.topicId}
                    onClick={() =>
                      navigate(`/journeys/${activeJourney.id}/topics/${item.topicId}`)
                    }
                    className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {item.topicTitle}
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-2">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 truncate mb-1.5">
                      {item.reasons[0] || 'In progress'}
                    </div>
                    <ProgressBar value={item.progress} height="h-1" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-gray-400">
                No weak areas detected in {activeJourney?.name || 'active journey'}! ✨
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/practice')}
            className="btn-secondary text-xs w-full justify-center mt-3"
          >
            <Code2 className="w-3.5 h-3.5" />
            Practice Challenges
          </button>
        </div>
      </div>

      {/* All My Learning Journeys Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              My Learning Journeys
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Switch between your independent learning roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/templates')}
              className="btn-secondary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Templates
            </button>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Journey
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeJourneys.map((j) => (
            <JourneyCard
              key={j.id}
              journey={j}
              isSelected={activeJourney?.id === j.id}
              onDuplicate={duplicateJourney}
              onArchive={archiveJourney}
              onDelete={(id) => setDeleteJourneyId(id)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <CreateJourneyModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={createJourney}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteJourneyId)}
        onClose={() => setDeleteJourneyId(null)}
        onConfirm={() => {
          if (deleteJourneyId) {
            deleteJourney(deleteJourneyId);
            setDeleteJourneyId(null);
          }
        }}
        title="Delete Learning Journey"
        message="Are you sure you want to delete this journey? All of its levels, subjects, topics, and progress will be permanently removed. This cannot be undone."
        confirmLabel="Delete Journey"
        danger
      />
    </AppLayout>
  );
}
