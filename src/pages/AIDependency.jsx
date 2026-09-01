// src/pages/AIDependency.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BrainCircuit, TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { ProgressBar, CircularProgress } from '../components/common/ProgressBar';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useJourney } from '../hooks/useJourney';
import { useToast } from '../context/ToastContext';
import { calculateAIDependencyScore, getAIDependencyLabel } from '../utils/calculations';
import { generateId } from '../models/journeySchema';

const DIMENSIONS = [
  { key: 'attemptedFirst', label: 'Attempted independently first', weight: 25 },
  { key: 'couldExplain', label: 'Can explain the generated solution', weight: 20 },
  { key: 'couldModify', label: 'Can modify / extend it without help', weight: 20 },
  { key: 'couldDebug', label: 'Can debug issues without AI', weight: 20 },
  { key: 'couldImplementFromScratch', label: 'Can implement from scratch independently', weight: 15 },
];

function LogForm({ onSave, onClose }) {
  const [form, setForm] = useState({
    topic: '',
    usedAI: true,
    attemptedFirst: false,
    couldExplain: false,
    couldModify: false,
    couldDebug: false,
    couldImplementFromScratch: false,
    notes: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.topic.trim()) return;
    onSave({ ...form, id: generateId('aid') });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Topic / Problem Statement *</label>
        <input
          className="input"
          value={form.topic}
          onChange={(e) => set('topic', e.target.value)}
          placeholder="e.g. Implement custom LRU Cache"
          autoFocus
        />
      </div>
      <div>
        <label className="label">Date</label>
        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) => set('date', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="usedAI"
            checked={form.usedAI}
            onChange={(e) => set('usedAI', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <label htmlFor="usedAI" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            I used AI assistance (ChatGPT, Claude, Copilot, etc.)
          </label>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Independence Evaluation:
          </div>
          {DIMENSIONS.map((d) => (
            <div key={d.key} className="flex items-center gap-3 py-1.5">
              <input
                type="checkbox"
                id={d.key}
                checked={form[d.key]}
                onChange={(e) => set(d.key, e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label htmlFor={d.key} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                {d.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Notes & Reflection</label>
        <textarea
          className="input text-xs"
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={2}
          placeholder="Key takeaways or areas to practice independently next time..."
        />
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
        <button onClick={onClose} className="btn-secondary text-xs">
          Cancel
        </button>
        <button onClick={handleSave} className="btn-primary text-xs" disabled={!form.topic.trim()}>
          Log Session
        </button>
      </div>
    </div>
  );
}

export default function AIDependency() {
  const navigate = useNavigate();
  const { activeJourney, dispatch } = useAppState();
  const toast = useToast();
  const { journey } = useJourney(activeJourney?.id);
  const [modalOpen, setModalOpen] = useState(false);

  const entries = journey?.aiDependency || [];
  const score = useMemo(() => calculateAIDependencyScore(entries), [entries]);
  const label = getAIDependencyLabel(score);

  const dimAverages = useMemo(() => {
    if (entries.length === 0) return {};
    return DIMENSIONS.reduce((acc, d) => {
      const pct = Math.round((entries.filter((e) => e[d.key]).length / entries.length) * 100);
      acc[d.key] = pct;
      return acc;
    }, {});
  }, [entries]);

  const chartData = useMemo(() => {
    return entries.slice(-10).map((e, i) => {
      const entryScore =
        (e.usedAI ? 30 : 0) +
        (!e.attemptedFirst ? 25 : 0) +
        (!e.couldExplain ? 15 : 0) +
        (!e.couldModify ? 15 : 0) +
        (!e.couldDebug ? 10 : 0) +
        (!e.couldImplementFromScratch ? 5 : 0);
      return { session: `#${i + 1}`, score: entryScore, topic: e.topic };
    });
  }, [entries]);

  const handleLog = (data) => {
    if (!journey) return;
    dispatch({
      type: ACTIONS.ADD_AI_DEPENDENCY,
      payload: { journeyId: journey.id, log: data },
    });
    toast('AI session logged!', 'success');
    setModalOpen(false);
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="AI Dependency">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to track AI dependency."
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
    <AppLayout pageTitle="AI Dependency">
      <PageHeader
        title="AI Dependency Tracker"
        subtitle={`Measure and reduce reliance on AI assistants in ${journey.name}.`}
        actions={
          <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
            <Plus className="w-3.5 h-3.5" /> Log Session
          </button>
        }
      />

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 flex items-center gap-4">
          <CircularProgress
            value={score}
            size={76}
            color={score >= 70 ? '#ef4444' : score >= 40 ? '#f59e0b' : '#10b981'}
            label={`${score}`}
            sublabel="/ 100"
          />
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Dependency Score
            </div>
            <span className={`badge mt-1 font-bold ${label.bg} ${label.color}`}>
              {label.label}
            </span>
            <div className="text-[11px] text-gray-400 mt-1">Lower is better (more independent)</div>
          </div>
        </div>

        <div className="card p-5 text-center">
          <div className="text-3xl font-black text-gray-900 dark:text-gray-100">
            {entries.length}
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
            Sessions Logged
          </div>
        </div>

        <div className="card p-5 text-center">
          <div className="text-3xl font-black text-green-600 dark:text-green-400">
            {entries.length > 0
              ? Math.round((entries.filter((e) => !e.usedAI).length / entries.length) * 100)
              : 0}
            %
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
            100% Independent Sessions
          </div>
        </div>
      </div>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {/* Independence Dimensions */}
          <div className="card p-5">
            <h2 className="section-title text-sm mb-4">Independence Dimensions</h2>
            <div className="space-y-3">
              {DIMENSIONS.map((d) => (
                <div key={d.key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {d.label}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {dimAverages[d.key] || 0}%
                    </span>
                  </div>
                  <ProgressBar value={dimAverages[d.key] || 0} color="green" height="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="card p-5">
            <h2 className="section-title text-sm mb-4">Dependency Trend (Recent Sessions)</h2>
            {chartData.length >= 2 ? (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" />
                    <XAxis dataKey="session" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => [`${v}`, 'Score']} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-gray-400">
                Log at least 2 sessions to see your dependency curve.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card p-8">
          <EmptyState
            icon="chart"
            title="No AI Dependency Sessions Logged"
            description="Log your coding and learning sessions to track when you used AI, whether you attempted it first, and if you can explain it independently."
            action={
              <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
                <Plus className="w-3.5 h-3.5" /> Log First Session
              </button>
            }
          />
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Log Coding Session with AI"
        size="md"
      >
        <LogForm onSave={handleLog} onClose={() => setModalOpen(false)} />
      </Modal>
    </AppLayout>
  );
}
