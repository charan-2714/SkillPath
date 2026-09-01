// src/pages/Analytics.jsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { CircularProgress, ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState } from '../context/AppContext';
import { useJourney } from '../hooks/useJourney';
import {
  getJourneyStats,
  calculateLevelProgress,
  calculateSkillAverages,
  calculateWeakAreas,
  calculateTopicProgress,
} from '../utils/calculations';

export default function Analytics() {
  const navigate = useNavigate();
  const { activeJourney, state } = useAppState();
  const { journey, stats, weakAreas, skillAverages } = useJourney(activeJourney?.id);

  // Level progress chart data
  const levelChartData = useMemo(() => {
    if (!journey || !journey.levels) return [];
    return journey.levels.map((lvl) => {
      const progress = calculateLevelProgress(
        lvl,
        journey.trackingModel,
        journey.skillDimensions
      );
      return {
        name: lvl.title.length > 18 ? lvl.title.slice(0, 16) + '…' : lvl.title,
        fullTitle: lvl.title,
        progress,
        topics: (lvl.subjects || []).flatMap((s) => s.topics || []).length,
      };
    });
  }, [journey]);

  // Topic Status breakdown data
  const statusPieData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Completed', value: stats.completedTopics, color: '#10b981' },
      { name: 'In Progress', value: stats.inProgressTopics, color: '#6366f1' },
      { name: 'Not Started', value: stats.notStartedTopics, color: '#e5e7eb' },
    ].filter((d) => d.value > 0);
  }, [stats]);

  // Top strengths (topics with highest score)
  const strengths = useMemo(() => {
    if (!journey || !journey.levels) return [];
    const topics = journey.levels.flatMap((l) =>
      (l.subjects || []).flatMap((s) =>
        (s.topics || []).map((t) => ({
          ...t,
          levelTitle: l.title,
          progress: calculateTopicProgress(t, journey.trackingModel, journey.skillDimensions),
        }))
      )
    );
    return topics
      .filter((t) => t.progress > 0)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5);
  }, [journey]);

  if (!journey) {
    return (
      <AppLayout pageTitle="Analytics">
        <EmptyState
          icon="chart"
          title="No Active Journey Selected"
          description="Create or select a journey to view its progress analytics."
          action={
            <button onClick={() => navigate('/journeys')} className="btn-primary text-xs">
              Go to My Journeys
            </button>
          }
        />
      </AppLayout>
    );
  }

  const hasActivity = stats.completedTopics > 0 || stats.inProgressTopics > 0 || stats.practiceSolved > 0;

  return (
    <AppLayout pageTitle="Analytics">
      <PageHeader
        title="Progress Analytics"
        subtitle={`Detailed breakdown of your learning velocity and mastery in ${journey.name}.`}
      />

      {/* Top Stat Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 text-center">
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.overallProgress}%
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Overall Completion
          </div>
          <div className="text-[11px] text-gray-400">
            {stats.completedTopics} of {stats.totalTopics} topics
          </div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
            {stats.practiceSolved} / {stats.totalPractice}
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Practice Challenges
          </div>
          <div className="text-[11px] text-gray-400">
            {stats.totalPractice > 0
              ? `${Math.round((stats.practiceSolved / stats.totalPractice) * 100)}% solved`
              : 'None defined'}
          </div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
            {stats.assessmentConfident} / {stats.totalAssessments}
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Verified Assessments
          </div>
          <div className="text-[11px] text-gray-400">
            {stats.totalAssessments > 0
              ? `${Math.round((stats.assessmentConfident / stats.totalAssessments) * 100)}% confident`
              : 'None defined'}
          </div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-3xl font-black text-orange-600 dark:text-orange-400">
            {state.analytics?.streakDays || 0}d
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Learning Streak
          </div>
          <div className="text-[11px] text-gray-400">Daily consistency</div>
        </div>
      </div>

      {!hasActivity ? (
        <div className="card p-8">
          <EmptyState
            icon="chart"
            title="No Learning Activity Recorded Yet"
            description="Start marking topic checklists, scoring your skills, and solving practice challenges to see live insights and visualizations."
            action={
              <button
                onClick={() => navigate(`/journeys/${journey.id}`)}
                className="btn-primary text-xs"
              >
                Start Learning in {journey.name}
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {/* Level Progress Bar Chart */}
          <div className="card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title text-sm">Progress by Level (%)</h2>
              <span className="text-xs text-gray-400">{journey.levels?.length || 0} levels</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Progress']}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.fullTitle || ''}
                  />
                  <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {levelChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.progress >= 80 ? '#10b981' : entry.progress > 0 ? '#6366f1' : '#cbd5e1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Dimensions Breakdown */}
          {skillAverages.length > 0 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title text-sm">Skill Dimensions Mastery</h2>
                <span className="text-xs text-gray-400">Configured Dimensions</span>
              </div>

              <div className="space-y-3.5">
                {skillAverages.map((dim) => (
                  <div key={dim.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {dim.name}
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {dim.avgScore} / {dim.maxScore} ({dim.percent}%)
                      </span>
                    </div>
                    <ProgressBar value={dim.percent} height="h-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Breakdown Pie */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title text-sm">Topic Status Distribution</h2>
              <span className="text-xs text-gray-400">{stats.totalTopics} total topics</span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={56}
                      paddingAngle={4}
                    >
                      {statusPieData.map((entry, idx) => (
                        <Cell key={`pie-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Completed: <strong>{stats.completedTopics}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span>In Progress: <strong>{stats.inProgressTopics}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <span>Not Started: <strong>{stats.notStartedTopics}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Strengths */}
          <div className="card p-5">
            <h2 className="section-title text-sm flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Top Strengths</span>
            </h2>

            {strengths.length > 0 ? (
              <div className="space-y-2.5">
                {strengths.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => navigate(`/journeys/${journey.id}/topics/${t.id}`)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="truncate">{t.title}</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">{t.progress}%</span>
                    </div>
                    <ProgressBar value={t.progress} color="green" height="h-1" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-4 text-center">No completed topics yet.</p>
            )}
          </div>

          {/* Weak Areas Ranking */}
          <div className="card p-5">
            <h2 className="section-title text-sm flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Weak Areas & Priorities</span>
            </h2>

            {weakAreas.length > 0 ? (
              <div className="space-y-2.5">
                {weakAreas.slice(0, 5).map((w) => (
                  <div
                    key={w.topicId}
                    onClick={() => navigate(`/journeys/${journey.id}/topics/${w.topicId}`)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-amber-50/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="truncate">{w.topicTitle}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{w.progress}%</span>
                    </div>
                    <div className="text-[11px] text-gray-400 truncate mb-1">
                      {w.reasons[0] || 'In progress'}
                    </div>
                    <ProgressBar value={w.progress} color="amber" height="h-1" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-4 text-center">No weak areas identified! ✨</p>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
