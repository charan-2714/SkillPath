// src/context/DSAContext.jsx
// Centralized state management for DSA Problem Tracking, Solutions, Revision, and Pattern Mastery

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { DSA_PROBLEMS } from '../data/dsa/dsaProblems';
import { DSA_PATTERNS } from '../data/dsa/dsaPatterns';
import { DSA_LEARNING_PATH } from '../data/dsa/dsaLearningPath';
import {
  createInitialUserProblemState,
  computeProblemMastery,
  calculateNextRevisionDate,
  calculatePatternMasteryStats,
} from '../models/dsaSchema';
import {
  loadLocalDSAProgress,
  saveLocalDSAProgress,
  syncProblemToFirestore,
} from '../services/dsaService';
import { subscribeToUserDSAProgress } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const DSAContext = createContext(null);

export function DSAProvider({ children }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [userProgress, setUserProgress] = useState(() => loadLocalDSAProgress());

  // Auto-save to local storage
  useEffect(() => {
    saveLocalDSAProgress(userProgress);
  }, [userProgress]);

  // Real-time Firestore synchronization when signed in
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribeToUserDSAProgress(
        user.uid,
        (remoteProgressMap) => {
          if (remoteProgressMap && typeof remoteProgressMap === 'object') {
            setUserProgress((prev) => {
              const merged = { ...prev, ...remoteProgressMap };
              saveLocalDSAProgress(merged);
              return merged;
            });
          }
        },
        (err) => {
          console.warn('[DSAContext] Firestore sync error:', err);
        }
      );
      return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    }
  }, [user?.uid]);

  const getProblemUserProgress = useCallback(
    (problemId) => {
      return userProgress[problemId] || createInitialUserProblemState(problemId);
    },
    [userProgress]
  );

  const saveProblemSolution = useCallback(
    (problemId, { code, language = 'python', notes = '' }) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const nextVersion = (current.solutionHistory?.length || 0) + 1;
        const newHistoryItem = {
          version: nextVersion,
          language,
          code,
          createdAt: new Date().toISOString(),
          notes: notes || `Version ${nextVersion}`,
        };

        const updated = {
          ...current,
          activeSolution: code,
          language,
          currentVersion: nextVersion,
          solutionHistory: [newHistoryItem, ...(current.solutionHistory || [])],
          attempts: (current.attempts || 0) + 1,
          lastAttemptedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        updated.mastery = computeProblemMastery(updated);

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
      showToast('Solution and version history saved!', 'success');
    },
    [user?.uid, showToast]
  );

  const restoreSolutionVersion = useCallback(
    (problemId, versionNum) => {
      setUserProgress((prev) => {
        const current = prev[problemId];
        if (!current) return prev;

        const target = (current.solutionHistory || []).find((h) => h.version === versionNum);
        if (!target) return prev;

        const updated = {
          ...current,
          activeSolution: target.code,
          language: target.language || current.language,
          updatedAt: new Date().toISOString(),
        };

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
      showToast(`Restored Solution Version ${versionNum}`, 'info');
    },
    [user?.uid, showToast]
  );

  const updateProblemStatus = useCallback(
    (problemId, status) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const updated = {
          ...current,
          status,
          lastSolvedAt: (status === 'solved' || status === 'mastered') ? new Date().toISOString() : current.lastSolvedAt,
          updatedAt: new Date().toISOString(),
        };
        updated.mastery = computeProblemMastery(updated);

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
    },
    [user?.uid]
  );

  const updateProblemDetails = useCallback(
    (problemId, patch) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const updated = {
          ...current,
          ...patch,
          updatedAt: new Date().toISOString(),
        };
        updated.mastery = computeProblemMastery(updated);

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
    },
    [user?.uid]
  );

  const toggleFavorite = useCallback(
    (problemId) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const nextFav = !current.favorite;
        const updated = {
          ...current,
          favorite: nextFav,
          updatedAt: new Date().toISOString(),
        };

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
    },
    [user?.uid]
  );

  const scheduleRevision = useCallback(
    (problemId, daysOrDate) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        let revIso;
        if (typeof daysOrDate === 'number' || !isNaN(Number(daysOrDate))) {
          revIso = calculateNextRevisionDate(daysOrDate);
        } else {
          revIso = new Date(daysOrDate).toISOString();
        }

        const updated = {
          ...current,
          revisionDate: revIso,
          updatedAt: new Date().toISOString(),
        };

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
      showToast('Scheduled revision reminder', 'success');
    },
    [user?.uid, showToast]
  );

  const completeRevision = useCallback(
    (problemId, nextIntervalDays = null) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const nextRev = nextIntervalDays ? calculateNextRevisionDate(nextIntervalDays) : null;
        const updated = {
          ...current,
          revisionDate: nextRev,
          status: 'solved',
          updatedAt: new Date().toISOString(),
        };
        updated.mastery = computeProblemMastery(updated);

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
      showToast('Revision marked complete!', 'success');
    },
    [user?.uid, showToast]
  );

  const blindReattempt = useCallback(
    (problemId) => {
      setUserProgress((prev) => {
        const current = prev[problemId] || createInitialUserProblemState(problemId);
        const updated = {
          ...current,
          blindReattemptCount: (current.blindReattemptCount || 0) + 1,
          status: 'attempted',
          attempts: (current.attempts || 0) + 1,
          lastAttemptedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        if (user?.uid) {
          syncProblemToFirestore(user.uid, problemId, updated);
        }
        return { ...prev, [problemId]: updated };
      });
      showToast('Blind reattempt mode enabled! Previous notes hidden.', 'info');
    },
    [user?.uid, showToast]
  );

  // Pattern mastery statistics
  const patternStats = useMemo(() => {
    return calculatePatternMasteryStats(DSA_PATTERNS, DSA_PROBLEMS, userProgress);
  }, [userProgress]);

  // Revision queue (Due today, upcoming, overdue)
  const revisionQueue = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const dueToday = [];
    const upcoming = [];
    const overdue = [];

    DSA_PROBLEMS.forEach((problem) => {
      const up = userProgress[problem.id];
      if (up && up.revisionDate) {
        const revDate = new Date(up.revisionDate);
        const revDateStr = revDate.toISOString().split('T')[0];

        const item = { problem, userProgress: up };
        if (revDateStr === todayStr) {
          dueToday.push(item);
        } else if (revDate < today) {
          overdue.push(item);
        } else {
          upcoming.push(item);
        }
      }
    });

    return { dueToday, upcoming, overdue };
  }, [userProgress]);

  // Overall analytics metrics
  const overallStats = useMemo(() => {
    const total = DSA_PROBLEMS.length;
    let solved = 0;
    let attempted = 0;
    let mastered = 0;
    let needsRevision = 0;
    let notStarted = 0;

    let independentCount = 0;
    let withHintCount = 0;
    let withAiCount = 0;
    let copiedCount = 0;

    let easyTotal = 0;
    let easySolved = 0;
    let mediumTotal = 0;
    let mediumSolved = 0;
    let hardTotal = 0;
    let hardSolved = 0;

    DSA_PROBLEMS.forEach((p) => {
      const diff = p.difficulty || 'Medium';
      if (diff === 'Easy') easyTotal++;
      else if (diff === 'Medium') mediumTotal++;
      else if (diff === 'Hard') hardTotal++;

      const up = userProgress[p.id];
      if (!up || up.status === 'not-started') {
        notStarted++;
        return;
      }

      if (up.status === 'solved' || up.status === 'mastered') {
        solved++;
        if (diff === 'Easy') easySolved++;
        else if (diff === 'Medium') mediumSolved++;
        else if (diff === 'Hard') hardSolved++;

        if (up.status === 'mastered') mastered++;
      } else if (up.status === 'attempted') {
        attempted++;
      } else if (up.status === 'needs-revision') {
        needsRevision++;
      }

      if (up.aiUsage === 'independent' || up.independenceScore >= 4) {
        independentCount++;
      } else if (up.aiUsage === 'with-hint' || up.independenceScore === 3) {
        withHintCount++;
      } else if (up.aiUsage === 'with-ai' || up.independenceScore === 2) {
        withAiCount++;
      } else if (up.aiUsage === 'copied-solution' || up.independenceScore === 1) {
        copiedCount++;
      }
    });

    const solvedPercentage = total > 0 ? Math.round((solved / total) * 100) : 0;

    return {
      total,
      solved,
      attempted,
      mastered,
      needsRevision,
      notStarted,
      solvedPercentage,
      independentCount,
      withHintCount,
      withAiCount,
      copiedCount,
      easyTotal,
      easySolved,
      mediumTotal,
      mediumSolved,
      hardTotal,
      hardSolved,
    };
  }, [userProgress]);

  const value = {
    problems: DSA_PROBLEMS,
    patterns: DSA_PATTERNS,
    learningPath: DSA_LEARNING_PATH,
    userProgress,
    getProblemUserProgress,
    saveProblemSolution,
    restoreSolutionVersion,
    updateProblemStatus,
    updateProblemDetails,
    toggleFavorite,
    scheduleRevision,
    completeRevision,
    blindReattempt,
    patternStats,
    revisionQueue,
    overallStats,
  };

  return <DSAContext.Provider value={value}>{children}</DSAContext.Provider>;
}

export function useDSA() {
  const ctx = useContext(DSAContext);
  if (!ctx) {
    throw new Error('useDSA must be used within a DSAProvider');
  }
  return ctx;
}
