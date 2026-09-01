// src/components/dsa/DSAInterviewModal.jsx
// Timed 30-minute mock interview simulator focusing on weak patterns and target difficulties

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useDSA } from '../../context/DSAContext';
import { DSAProblemCard } from './DSAProblemCard';

export function DSAInterviewModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { problems, patternStats, userProgress, blindReattempt } = useDSA();

  const [sessionStarted, setSessionStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60); // 30 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('standard'); // 'standard' (1E, 2M) | 'hard' (2M, 1H)

  // Identify weak patterns
  const weakPatternIds = useMemo(() => {
    const weak = patternStats
      .filter((p) => p.tier === 'weak' || p.tier === 'developing')
      .map((p) => p.id);
    return weak.length > 0 ? weak : ['two-pointers', 'sliding-window', 'trees', 'dynamic-programming-1d'];
  }, [patternStats]);

  // Select 3 problems based on weak patterns and target difficulty
  const interviewProblems = useMemo(() => {
    const pool = [...problems].sort(() => 0.5 - Math.random());

    let easyP = pool.find((p) => p.difficulty === 'Easy' && p.patterns?.some((pat) => weakPatternIds.includes(pat)))
      || pool.find((p) => p.difficulty === 'Easy');

    let medP1 = pool.find((p) => p.difficulty === 'Medium' && p.id !== easyP?.id && p.patterns?.some((pat) => weakPatternIds.includes(pat)))
      || pool.find((p) => p.difficulty === 'Medium' && p.id !== easyP?.id);

    let thirdP;
    if (selectedDifficulty === 'hard') {
      thirdP = pool.find((p) => p.difficulty === 'Hard' && p.id !== easyP?.id && p.id !== medP1?.id)
        || pool.find((p) => p.difficulty === 'Hard');
    } else {
      thirdP = pool.find((p) => p.difficulty === 'Medium' && p.id !== easyP?.id && p.id !== medP1?.id)
        || pool.find((p) => p.difficulty === 'Medium');
    }

    return [easyP, medP1, thirdP].filter(Boolean);
  }, [problems, weakPatternIds, selectedDifficulty, isOpen]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainderSecs).padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setTimerRunning(true);
    setSecondsLeft(30 * 60);
    // Trigger blind reattempt mode on all selected problems
    interviewProblems.forEach((p) => {
      blindReattempt(p.id);
    });
  };

  const handleReset = () => {
    setSessionStarted(false);
    setTimerRunning(false);
    setSecondsLeft(30 * 60);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="DSA Mock Interview Simulator"
      size="lg"
    >
      <div className="space-y-5 max-h-[78vh] overflow-y-auto pr-1">
        {/* Timer & Session Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
                30-Minute Timed Challenge
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Simulates a live technical screen. Previous notes and solutions will be hidden.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`font-mono text-2xl font-black px-4 py-2 rounded-xl border ${
                secondsLeft <= 300
                  ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 border-red-200 animate-pulse'
                  : 'bg-white dark:bg-gray-850 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700'
              }`}
            >
              {formatTime(secondsLeft)}
            </div>

            {sessionStarted ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-indigo-600 shadow-2xs"
                  title={timerRunning ? 'Pause Timer' : 'Resume Timer'}
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-red-500 shadow-2xs"
                  title="Reset Session"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartStartSession ? handleStartSession : handleStartSession}
                className="btn-primary text-xs px-4 py-2.5 shadow-md flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Start 30m Session
              </button>
            )}
          </div>
        </div>

        {/* Configuration when not started */}
        {!sessionStarted && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-3">
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Interview Difficulty Profile:
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="diff"
                  value="standard"
                  checked={selectedDifficulty === 'standard'}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Standard Technical Screen (1 Easy + 2 Medium)
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="diff"
                  value="hard"
                  checked={selectedDifficulty === 'hard'}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Advanced Onsite (2 Medium + 1 Hard)
              </label>
            </div>
          </div>
        )}

        {/* Selected Interview Problems */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Assigned Problems ({interviewProblems.length})
            </h4>
            <span className="text-[11px] text-gray-400">
              Targeting: {weakPatternIds.slice(0, 3).join(', ')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {interviewProblems.map((prob, idx) => (
              <div
                key={prob.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="badge text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      Problem #{idx + 1}
                    </span>
                    <span
                      className={`badge text-[10px] font-bold ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {prob.title}
                  </h5>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {prob.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  {prob.leetcodeUrl && (
                    <a
                      href={prob.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-[11px] py-1.5 flex-1 justify-center"
                    >
                      LeetCode ↗
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/dsa/problems/${prob.id}`);
                    }}
                    className="btn-primary text-[11px] py-1.5 flex-1 justify-center shadow-2xs"
                  >
                    Solve
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
