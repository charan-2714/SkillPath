// src/pages/dsa/DSAProblemDetail.jsx
// Detailed Problem Studio: Solution Notebook, Multi-Version History, Complexity Tracking, Blind Reattempt, Spaced Repetition & AI Prompts

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
  History,
  BrainCircuit,
  Lightbulb,
  AlertTriangle,
  FileCode,
  Save,
  Check,
  Eye,
  EyeOff,
  Flame,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../../components/layout/AppLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { DSACodeEditor } from '../../components/dsa/DSACodeEditor';
import { DSAAiPromptModal } from '../../components/dsa/DSAAiPromptModal';
import { useDSA } from '../../context/DSAContext';
import { useToast } from '../../context/ToastContext';
import {
  DSA_STATUSES,
  AI_USAGE_MODES,
  TIME_COMPLEXITY_OPTIONS,
  SPACE_COMPLEXITY_OPTIONS,
  PROGRAMMING_LANGUAGES,
} from '../../models/dsaSchema';

const DIFFICULTY_STYLES = {
  Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
};

export default function DSAProblemDetail() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    problems,
    getProblemUserProgress,
    saveProblemSolution,
    restoreSolutionVersion,
    updateProblemStatus,
    updateProblemDetails,
    toggleFavorite,
    scheduleRevision,
    completeRevision,
  } = useDSA();

  const problem = problems.find((p) => p.id === problemId);
  const userProgress = getProblemUserProgress(problemId);

  // Local form state
  const [code, setCode] = useState(userProgress.activeSolution || '');
  const [language, setLanguage] = useState(userProgress.language || 'python');
  const [approach, setApproach] = useState(userProgress.approach || '');
  const [timeComplexity, setTimeComplexity] = useState(userProgress.timeComplexity || 'O(n)');
  const [spaceComplexity, setSpaceComplexity] = useState(userProgress.spaceComplexity || 'O(1)');
  const [keyInsights, setKeyInsights] = useState(userProgress.keyInsights || '');
  const [mistakesLessons, setMistakesLessons] = useState(userProgress.mistakesLessons || '');
  const [aiUsage, setAiUsage] = useState(userProgress.aiUsage || 'independent');
  const [independenceScore, setIndependenceScore] = useState(userProgress.independenceScore ?? 5);

  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [revisionDays, setRevisionDays] = useState(7);

  // Sync state if userProgress updates externally
  useEffect(() => {
    if (userProgress) {
      if (!code && userProgress.activeSolution) setCode(userProgress.activeSolution);
      if (userProgress.language) setLanguage(userProgress.language);
      if (userProgress.approach && !approach) setApproach(userProgress.approach);
      if (userProgress.timeComplexity) setTimeComplexity(userProgress.timeComplexity);
      if (userProgress.spaceComplexity) setSpaceComplexity(userProgress.spaceComplexity);
      if (userProgress.mistakesLessons && !mistakesLessons) setMistakesLessons(userProgress.mistakesLessons);
      if (userProgress.aiUsage) setAiUsage(userProgress.aiUsage);
      if (userProgress.independenceScore !== undefined) setIndependenceScore(userProgress.independenceScore);
    }
  }, [userProgress.problemId]);

  if (!problem) {
    return (
      <AppLayout pageTitle="Problem Not Found">
        <div className="card p-12 text-center max-w-md mx-auto mt-12 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Problem "{problemId}" could not be found.</p>
          <button onClick={() => navigate('/dsa')} className="btn-primary text-xs mx-auto">
            Back to DSA Hub
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleSaveSolution = (e) => {
    e?.preventDefault();
    saveProblemSolution(problem.id, {
      code,
      language,
      notes: `Saved solution (${language})`,
    });
    // Auto-mark as solved if not already solved
    if (userProgress.status === 'not-started' || userProgress.status === 'attempted') {
      updateProblemStatus(problem.id, 'solved');
    }
  };

  const handleSaveNotes = (e) => {
    e?.preventDefault();
    updateProblemDetails(problem.id, {
      approach,
      timeComplexity,
      spaceComplexity,
      keyInsights,
      mistakesLessons,
      aiUsage,
      independenceScore,
    });
    showToast('Approach notes and complexity metrics saved!', 'success');
  };

  const handleRestoreVersion = (verNum) => {
    restoreSolutionVersion(problem.id, verNum);
    const target = (userProgress.solutionHistory || []).find((h) => h.version === verNum);
    if (target) {
      setCode(target.code);
      setLanguage(target.language || language);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // If no code currently, populate with default snippet for this language
    if (!code.trim()) {
      const defaultSnippet = PROGRAMMING_LANGUAGES.find((l) => l.id === newLang)?.defaultSnippet || '';
      setCode(defaultSnippet);
    }
  };

  const difficulty = problem.difficulty || 'Medium';

  return (
    <AppLayout pageTitle={`DSA: ${problem.title}`}>
      <Breadcrumbs
        items={[
          { label: 'DSA & LeetCode Hub', to: '/dsa' },
          { label: problem.title },
        ]}
      />

      {/* Problem Top Header Banner */}
      <div className="card p-5 space-y-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge text-xs font-bold border ${DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.Medium}`}>
                {difficulty}
              </span>

              {(problem.topics || []).map((topic) => (
                <span key={topic} className="text-xs px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  {topic}
                </span>
              ))}

              {(problem.patterns || []).map((pat) => (
                <span key={pat} className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                  #{pat}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
                {problem.recommendedOrder ? `${problem.recommendedOrder}. ` : ''}
                {problem.title}
              </h2>

              <button
                type="button"
                onClick={() => toggleFavorite(problem.id)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={userProgress.favorite ? 'Remove Favorite' : 'Add Favorite'}
              >
                <Star className={`w-5 h-5 ${userProgress.favorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs flex items-center gap-1.5 text-orange-600 dark:text-orange-400 hover:border-orange-300 shadow-2xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open on LeetCode ↗
              </a>
            )}

            <button
              type="button"
              onClick={() => setBlindMode(!blindMode)}
              className={`btn-secondary text-xs flex items-center gap-1.5 font-bold transition-all ${
                blindMode ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300' : ''
              }`}
            >
              {blindMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {blindMode ? 'Show Notes' : 'Blind Reattempt'}
            </button>

            <button
              type="button"
              onClick={() => setAiModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5 shadow-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Study Prompt
            </button>
          </div>
        </div>

        {/* Problem Description & Interview Relevance */}
        <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 space-y-2">
          <p className="leading-relaxed">{problem.description}</p>

          <div className="flex items-center gap-4 flex-wrap text-[11px] pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
            {problem.interviewRelevance && (
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-gray-100">Interview Context: </span>
                <span>{problem.interviewRelevance}</span>
              </div>
            )}

            {problem.companyTags?.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700 dark:text-gray-300">Companies: </span>
                {problem.companyTags.map((c) => (
                  <span key={c} className="px-1.5 py-0.2 rounded bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-mono text-[10px] border border-gray-200 dark:border-gray-600">
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status & Revision Controls */}
        <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Status:</span>
            <select
              value={userProgress.status || 'not-started'}
              onChange={(e) => updateProblemStatus(problem.id, e.target.value)}
              className="select text-xs py-1 px-3 font-bold"
            >
              {DSA_STATUSES.map((st) => (
                <option key={st.id} value={st.id}>{st.label}</option>
              ))}
            </select>
          </div>

          {/* Spaced repetition schedule shortcut */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange-500" />
              Schedule Revision:
            </span>
            {[1, 3, 7, 14, 30].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => scheduleRevision(problem.id, days)}
                className="text-[11px] px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 text-gray-700 dark:text-gray-300 font-medium"
              >
                +{days}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blind Reattempt Active Warning */}
      {blindMode && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-200 text-xs">
            <EyeOff className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Blind Reattempt Mode is Active:</strong> Previous notes, solutions, and approach details are hidden so you can test unassisted recall.
            </span>
          </div>
          <button
            onClick={() => setBlindMode(false)}
            className="btn-secondary text-xs py-1 px-2.5 text-amber-900 dark:text-amber-200 border-amber-300"
          >
            Reveal Notes
          </button>
        </div>
      )}

      {/* Main Studio Grid: Code Editor & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Code Editor & Version History */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-500" />
                My Solution Notebook
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVersionDrawerOpen(!versionDrawerOpen)}
                  className="btn-secondary text-xs py-1 px-2.5 flex items-center gap-1 font-semibold"
                >
                  <History className="w-3.5 h-3.5" />
                  Version History ({(userProgress.solutionHistory || []).length})
                </button>
                <button
                  type="button"
                  onClick={handleSaveSolution}
                  className="btn-primary text-xs py-1 px-3 flex items-center gap-1 shadow-xs font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Solution
                </button>
              </div>
            </div>

            {/* Version History Drawer */}
            {versionDrawerOpen && (
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2 animate-fade-in">
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Saved Solution Versions:
                </div>
                {(userProgress.solutionHistory || []).length > 0 ? (
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {(userProgress.solutionHistory || []).map((hist) => (
                      <div
                        key={hist.version}
                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            Version {hist.version} ({hist.language})
                          </span>
                          <span className="text-[10px] text-gray-400 ml-2">
                            {new Date(hist.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRestoreVersion(hist.version)}
                          className="btn-secondary text-[11px] py-0.5 px-2"
                        >
                          Restore
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No previous solution versions recorded yet.</p>
                )}
              </div>
            )}

            {/* Code Editor */}
            <DSACodeEditor
              code={blindMode ? '' : code}
              onChange={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
              placeholder={blindMode ? 'Code your blind reattempt here...' : 'Write and save your solution code...'}
            />
          </div>
        </div>

        {/* Right Column (5 cols): Approach, Complexity & AI Independence */}
        <div className="lg:col-span-5 space-y-4">
          {!blindMode ? (
            <div className="card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-purple-500" />
                  Approach & Complexity
                </h3>

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="btn-primary text-xs py-1 px-3 shadow-xs font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Notes
                </button>
              </div>

              {/* Approach text */}
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Core Strategy / Invariant
                </label>
                <textarea
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  placeholder="e.g. Use a hash map to record seen elements; check complement target - num in O(1)..."
                  rows={3}
                  className="input text-xs leading-relaxed"
                />
              </div>

              {/* Complexity Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Time Complexity
                  </label>
                  <select
                    value={timeComplexity}
                    onChange={(e) => setTimeComplexity(e.target.value)}
                    className="select text-xs font-mono font-bold"
                  >
                    {TIME_COMPLEXITY_OPTIONS.map((tc) => (
                      <option key={tc} value={tc}>{tc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Space Complexity
                  </label>
                  <select
                    value={spaceComplexity}
                    onChange={(e) => setSpaceComplexity(e.target.value)}
                    className="select text-xs font-mono font-bold"
                  >
                    {SPACE_COMPLEXITY_OPTIONS.map((sc) => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mistakes & Lessons */}
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Mistakes & Key Takeaways
                </label>
                <textarea
                  value={mistakesLessons}
                  onChange={(e) => setMistakesLessons(e.target.value)}
                  placeholder="e.g. Initially tried nested loops O(n²); forgot to handle duplicate numbers..."
                  rows={2}
                  className="input text-xs leading-relaxed"
                />
              </div>

              {/* AI Independence Rating */}
              <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                    AI Independence Rating:
                  </span>
                  <span className="text-xs font-black text-purple-700 dark:text-purple-300 font-mono">
                    ★ {independenceScore} / 5
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => {
                        setIndependenceScore(score);
                        if (score >= 4) setAiUsage('independent');
                        else if (score === 3) setAiUsage('with-hint');
                        else if (score === 2) setAiUsage('with-ai');
                        else if (score === 1) setAiUsage('copied-solution');
                        else setAiUsage('unable-to-solve');
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        independenceScore === score
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs scale-105'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                      }`}
                    >
                      {score}★
                    </button>
                  ))}
                </div>

                <select
                  value={aiUsage}
                  onChange={(e) => setAiUsage(e.target.value)}
                  className="select text-xs font-semibold w-full mt-1"
                >
                  {AI_USAGE_MODES.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center space-y-3">
              <EyeOff className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Blind Attempt in Progress
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Code your solution on the left without looking at previous notes. When finished, click below to review your solution and rate your independence.
              </p>
              <button
                onClick={() => setBlindMode(false)}
                className="btn-primary text-xs mx-auto"
              >
                Complete Blind Attempt & Reveal Notes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Prompt Modal */}
      {aiModalOpen && (
        <DSAAiPromptModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          problem={problem}
          userProgress={{ ...userProgress, activeSolution: code, approach, language, timeComplexity, spaceComplexity, mistakesLessons }}
        />
      )}
    </AppLayout>
  );
}
