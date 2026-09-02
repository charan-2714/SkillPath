// src/pages/Analytics.jsx
// Unified Analytics & Study Logging Hub: Progress metrics, level charts, weak areas, and study session logs

import React, { useState, useMemo } from 'react';
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
  BookOpenCheck,
  Plus,
  Clock,
  Calendar,
  Trash2,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { CircularProgress, ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useJourney } from '../hooks/useJourney';
import { useToast } from '../context/ToastContext';
import {
  getJourneyStats,
  calculateLevelProgress,
  calculateSkillAverages,
  calculateWeakAreas,
  calculateTopicProgress,
} from '../utils/calculations';

export default function Analytics() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { activeJourney, state, dispatch } = useAppState();
  const { journey, stats, weakAreas, skillAverages, addLearningLog, deleteLearningLog } = useJourney(activeJourney?.id);

  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'logs'
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    durationMinutes: 45,
    topicId: '',
    topicTitle: '',
    whatLearned: '',
    whatPracticed: '',
    whatConfused: '',
    nextAction: '',
  });

  const topicsList = useMemo(() => {
    if (!journey || !journey.levels) return [];
    return journey.levels.flatMap((lvl) =>
      (lvl.subjects || []).flatMap((sub) =>
        (sub.topics || []).map((top) => ({
          id: top.id,
          title: top.title,
          levelTitle: lvl.title,
          subjectTitle: sub.title,
        }))
      )
    );
  }, [journey]);

  const logs = journey?.learningLogs || [];

  const totalLogMinutes = useMemo(() => {
    return logs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0);
  }, [logs]);

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

  const handleSaveLog = (e) => {
    e.preventDefault();
    if (!form.whatLearned.trim()) return;

    const matchedTopic = topicsList.find((t) => t.id === form.topicId);

    addLearningLog({
      ...form,
      topicTitle: matchedTopic ? matchedTopic.title : form.topicTitle,
    });

    dispatch({
      type: ACTIONS.UPDATE_ANALYTICS,
      payload: {
        totalStudyMinutes: (journey?.learningLogs?.length || 0) * 45 + Number(form.durationMinutes),
      },
    });

    showToast('Learning session logged!', 'success');
    setLogModalOpen(false);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      durationMinutes: 45,
      topicId: '',
      topicTitle: '',
      whatLearned: '',
      whatPracticed: '',
      whatConfused: '',
      nextAction: '',
    });
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="Analytics & Insights">
        <EmptyState
          icon="chart"
          title="No Active Journey Selected"
          description="Create or select a journey to view its progress analytics and log study sessions."
          action={
            <button onClick={() => navigate('/journeys')} className="btn-primary text-xs">
              Go to My Journeys
            </button>
          }
        />
      </AppLayout>
    );
  }

  const hasActivity = stats.completedTopics > 0 || stats.inProgressTopics > 0 || logs.length > 0;

  return (
    <AppLayout pageTitle="Analytics & Study Logs">
      <PageHeader
        title={`${journey.name} — Progress & Insights`}
        subtitle="Visual analytics, mastery breakdown, weak areas, and daily study logs."
        actions={
          activeTab === 'logs' ? (
            <button
              onClick={() => setLogModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Study Session
            </button>
          ) : null
        }
      />

      {/* Top Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'metrics'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Progress & Mastery
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'logs'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <BookOpenCheck className="w-3.5 h-3.5" />
          Study Session Logs ({logs.length})
        </button>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
            {Math.round(totalLogMinutes / 60)}h {totalLogMinutes % 60}m
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Logged Study Time
          </div>
          <div className="text-[11px] text-gray-400">{logs.length} sessions recorded</div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-3xl font-black text-orange-600 dark:text-orange-400">
            {state.analytics?.streakDays || 0}d
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
            Daily Streak
          </div>
          <div className="text-[11px] text-gray-400">Learning consistency</div>
        </div>
      </div>

      {/* TAB 1: PROGRESS & MASTERY CHARTS */}
      {activeTab === 'metrics' && (
        <>
          {!hasActivity ? (
            <div className="card p-8">
              <EmptyState
                icon="chart"
                title="No Learning Activity Recorded Yet"
                description="Start completing topic subtopics, practicing challenges, and scoring your skills to see live visualizations."
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
        </>
      )}

      {/* TAB 2: STUDY SESSION LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Study History ({logs.length} Sessions)
            </h3>
            <button
              onClick={() => setLogModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Session
            </button>
          </div>

          {logs.length > 0 ? (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {log.topicTitle || 'General Study'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">
                        {log.durationMinutes || 45} mins
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {log.date}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {log.whatLearned}
                    </p>

                    {log.whatPracticed && (
                      <p className="text-[11px] text-gray-500">
                        <strong>Practiced:</strong> {log.whatPracticed}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(log.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 transition-colors self-end sm:self-center"
                    title="Delete log entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center text-gray-400 text-xs">
              No study sessions logged yet. Click "Log Study Session" above to track your daily time and takeaways!
            </div>
          )}
        </div>
      )}

      {/* Log Session Modal */}
      <Modal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        title="Log Learning Session"
        size="md"
      >
        <form onSubmit={handleSaveLog} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Date *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Duration (minutes) *</label>
              <input
                type="number"
                min={5}
                max={480}
                required
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="label">Topic Studied</label>
            <select
              value={form.topicId}
              onChange={(e) => setForm({ ...form, topicId: e.target.value })}
              className="input"
            >
              <option value="">General / Self-Directed</option>
              {topicsList.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.levelTitle})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">What did you learn today? *</label>
            <textarea
              required
              rows={3}
              placeholder="Key concepts, architecture patterns, insights..."
              value={form.whatLearned}
              onChange={(e) => setForm({ ...form, whatLearned: e.target.value })}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="label">What did you practice / code?</label>
            <input
              type="text"
              placeholder="Built mini-project, solved 2 challenges..."
              value={form.whatPracticed}
              onChange={(e) => setForm({ ...form, whatPracticed: e.target.value })}
              className="input text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setLogModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Save Session Log
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Log Confirmation */}
      {deleteConfirmId && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setDeleteConfirmId(null)}
          onConfirm={() => {
            deleteLearningLog(deleteConfirmId);
            setDeleteConfirmId(null);
            showToast('Log entry removed', 'info');
          }}
          title="Delete Study Log"
          message="Are you sure you want to delete this study log entry?"
          confirmLabel="Delete"
          danger
        />
      )}
    </AppLayout>
  );
}
