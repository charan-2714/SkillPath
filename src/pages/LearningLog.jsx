// src/pages/LearningLog.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpenCheck,
  Plus,
  Clock,
  Calendar,
  Sparkles,
  Trash2,
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export default function LearningLog() {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeJourney, dispatch } = useAppState();
  const { journey, addLearningLog, deleteLearningLog } = useJourney(activeJourney?.id);

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
    aiUsed: false,
    canDoIndependently: '',
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

  const totalMinutes = useMemo(() => {
    return logs.reduce((sum, l) => sum + (Number(l.durationMinutes) || 0), 0);
  }, [logs]);

  const handleSaveLog = (e) => {
    e.preventDefault();
    if (!form.whatLearned.trim()) return;

    const matchedTopic = topicsList.find((t) => t.id === form.topicId);

    addLearningLog({
      ...form,
      topicTitle: matchedTopic ? matchedTopic.title : form.topicTitle,
    });

    // Also update total study minutes in analytics
    dispatch({
      type: ACTIONS.UPDATE_ANALYTICS,
      payload: {
        totalStudyMinutes: (journey?.learningLogs?.length || 0) * 45 + Number(form.durationMinutes),
      },
    });

    toast('Learning session logged!', 'success');
    setLogModalOpen(false);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      durationMinutes: 45,
      topicId: '',
      topicTitle: '',
      whatLearned: '',
      whatPracticed: '',
      whatConfused: '',
      aiUsed: false,
      canDoIndependently: '',
      nextAction: '',
    });
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="Learning Log">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to view and record study logs."
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
    <AppLayout pageTitle="Learning Log">
      <PageHeader
        title="Learning Log & Study Journal"
        subtitle={`Reflect on daily sessions and record milestones for ${journey.name}.`}
        actions={
          <button onClick={() => setLogModalOpen(true)} className="btn-primary text-xs">
            <Plus className="w-3.5 h-3.5" /> Log Session
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {logs.length}
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
            Total Sessions Logged
          </div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {Math.round(totalMinutes / 60)} hrs {totalMinutes % 60} min
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
            Time Invested
          </div>
        </div>

        <div className="card p-4 text-center">
          <div className="text-2xl font-black text-green-600 dark:text-green-400">
            {logs.filter((l) => !l.aiUsed).length}
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
            100% Independent Sessions
          </div>
        </div>
      </div>

      {/* Logs Timeline */}
      {logs.length > 0 ? (
        <div className="space-y-4">
          {logs.map((item) => (
            <div key={item.id} className="card p-5 space-y-3 hover:shadow-card-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-100">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.durationMinutes} minutes</span>
                  </div>
                  {item.aiUsed ? (
                    <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-[10px]">
                      AI Assisted
                    </span>
                  ) : (
                    <span className="badge bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300 text-[10px]">
                      Independent
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.topicTitle && (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.topicTitle}
                    </span>
                  )}
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="btn-ghost p-1 text-gray-400 hover:text-red-500"
                    title="Delete log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    What I Learned:{' '}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{item.whatLearned}</span>
                </div>

                {item.whatPracticed && (
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      What I Practiced:{' '}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{item.whatPracticed}</span>
                  </div>
                )}

                {item.whatConfused && (
                  <div className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-xs">
                    <span className="font-bold">What Confused Me: </span>
                    <span>{item.whatConfused}</span>
                  </div>
                )}

                {item.canDoIndependently && (
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Now Independent In:{' '}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{item.canDoIndependently}</span>
                  </div>
                )}

                {item.nextAction && (
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    → Next Action: {item.nextAction}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="book"
          title="No study logs recorded yet"
          description="Log your study sessions to track your hours, key learnings, and daily consistency."
          action={
            <button onClick={() => setLogModalOpen(true)} className="btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" /> Log First Session
            </button>
          }
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        title="Log Study Session"
        size="lg"
      >
        <form onSubmit={handleSaveLog} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              <label className="label">Duration (Minutes) *</label>
              <input
                type="number"
                min="5"
                max="600"
                required
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Associated Topic</label>
              <select
                value={form.topicId}
                onChange={(e) => setForm({ ...form, topicId: e.target.value })}
                className="input"
              >
                <option value="">(Optional) Select Topic</option>
                {topicsList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              What did you learn today? <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={form.whatLearned}
              onChange={(e) => setForm({ ...form, whatLearned: e.target.value })}
              placeholder="Concepts understood, definitions, or architectural insights..."
              rows={2}
              className="input"
            />
          </div>

          <div>
            <label className="label">What did you practice / code?</label>
            <textarea
              value={form.whatPracticed}
              onChange={(e) => setForm({ ...form, whatPracticed: e.target.value })}
              placeholder="Hands-on exercises, scripts written, or challenges attempted..."
              rows={2}
              className="input"
            />
          </div>

          <div>
            <label className="label">What confused you or needs review?</label>
            <input
              type="text"
              value={form.whatConfused}
              onChange={(e) => setForm({ ...form, whatConfused: e.target.value })}
              placeholder="Sticky bugs, unclear theory, or tricky edge cases..."
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="label">What can you now do independently?</label>
              <input
                type="text"
                value={form.canDoIndependently}
                onChange={(e) => setForm({ ...form, canDoIndependently: e.target.value })}
                placeholder="e.g. Write a decorator from scratch"
                className="input"
              />
            </div>
            <div>
              <label className="label">Next Action</label>
              <input
                type="text"
                value={form.nextAction}
                onChange={(e) => setForm({ ...form, nextAction: e.target.value })}
                placeholder="e.g. Build unit tests tomorrow"
                className="input"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40">
            <input
              type="checkbox"
              id="aiUsedCheck"
              checked={form.aiUsed}
              onChange={(e) => setForm({ ...form, aiUsed: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="aiUsedCheck" className="text-xs text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
              I used AI assistant (ChatGPT, Claude, etc.) during this session
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setLogModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
              disabled={!form.whatLearned.trim()}
            >
              Save Session Log
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteLearningLog(deleteConfirmId);
            setDeleteConfirmId(null);
            toast('Session log deleted', 'info');
          }
        }}
        title="Delete Session Log"
        message="Are you sure you want to delete this study log entry?"
        confirmLabel="Delete"
        danger
      />
    </AppLayout>
  );
}
