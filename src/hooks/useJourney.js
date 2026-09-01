// src/hooks/useJourney.js
// Custom hook providing journey operations, stats, and Recycle Bin soft-deletion

import { useMemo, useCallback } from 'react';
import { useAppState, ACTIONS } from '../context/AppContext';
import { getJourneyStats, calculateWeakAreas, calculateSkillAverages } from '../utils/calculations';
import {
  createNewLevel,
  createNewSubject,
  createNewTopic,
  createNewLearningItem,
  createNewPractice,
  createNewDebugging,
  createNewAssessment,
  createNewResource,
  createNewProject,
  createNewLearningLog,
} from '../models/journeySchema';

export function useJourney(journeyId) {
  const { state, dispatch, activeJourney, softDeleteItem } = useAppState();

  const journey = useMemo(() => {
    if (!journeyId) return activeJourney;
    return (state.journeys || []).find((j) => j.id === journeyId) || null;
  }, [state.journeys, journeyId, activeJourney]);

  const stats = useMemo(() => getJourneyStats(journey), [journey]);
  const weakAreas = useMemo(() => calculateWeakAreas(journey), [journey]);
  const skillAverages = useMemo(() => calculateSkillAverages(journey), [journey]);

  // Level operations
  const addLevel = useCallback((params = {}) => {
    if (!journey) return;
    const lvl = createNewLevel(params, (journey.levels || []).length + 1);
    dispatch({ type: ACTIONS.ADD_LEVEL, payload: { journeyId: journey.id, level: lvl } });
    return lvl;
  }, [journey, dispatch]);

  const updateLevel = useCallback((levelId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_LEVEL, payload: { journeyId: journey.id, levelId, updates } });
  }, [journey, dispatch]);

  const deleteLevel = useCallback((levelId) => {
    if (!journey) return;
    const targetLevel = (journey.levels || []).find((l) => l.id === levelId);
    if (targetLevel) {
      softDeleteItem('level', targetLevel, { journeyId: journey.id, journeyName: journey.name });
    }
  }, [journey, softDeleteItem]);

  const reorderLevel = useCallback((levelId, direction) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.REORDER_LEVEL, payload: { journeyId: journey.id, levelId, direction } });
  }, [journey, dispatch]);

  // Subject operations
  const addSubject = useCallback((levelId, params = {}) => {
    if (!journey) return;
    const targetLevel = (journey.levels || []).find((l) => l.id === levelId);
    const order = (targetLevel?.subjects || []).length + 1;
    const subj = createNewSubject(params, order);
    dispatch({ type: ACTIONS.ADD_SUBJECT, payload: { journeyId: journey.id, levelId, subject: subj } });
    return subj;
  }, [journey, dispatch]);

  const updateSubject = useCallback((levelId, subjectId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_SUBJECT, payload: { journeyId: journey.id, levelId, subjectId, updates } });
  }, [journey, dispatch]);

  const deleteSubject = useCallback((levelId, subjectId) => {
    if (!journey) return;
    const targetLevel = (journey.levels || []).find((l) => l.id === levelId);
    const targetSubject = (targetLevel?.subjects || []).find((s) => s.id === subjectId);
    if (targetSubject) {
      softDeleteItem('subject', targetSubject, {
        journeyId: journey.id,
        journeyName: journey.name,
        levelId,
        levelTitle: targetLevel?.title,
      });
    }
  }, [journey, softDeleteItem]);

  const reorderSubject = useCallback((levelId, subjectId, direction) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.REORDER_SUBJECT, payload: { journeyId: journey.id, levelId, subjectId, direction } });
  }, [journey, dispatch]);

  // Topic operations
  const addTopic = useCallback((levelId, subjectId, params = {}) => {
    if (!journey) return;
    const topic = createNewTopic(params);
    dispatch({ type: ACTIONS.ADD_TOPIC, payload: { journeyId: journey.id, levelId, subjectId, topic } });
    return topic;
  }, [journey, dispatch]);

  const updateTopic = useCallback((topicId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_TOPIC, payload: { journeyId: journey.id, topicId, updates } });
  }, [journey, dispatch]);

  const deleteTopic = useCallback((levelId, subjectId, topicId) => {
    if (!journey) return;
    const targetLevel = (journey.levels || []).find((l) => l.id === levelId);
    const targetSubject = (targetLevel?.subjects || []).find((s) => s.id === subjectId);
    const targetTopic = (targetSubject?.topics || []).find((t) => t.id === topicId);
    if (targetTopic) {
      softDeleteItem('topic', targetTopic, {
        journeyId: journey.id,
        journeyName: journey.name,
        levelId,
        levelTitle: targetLevel?.title,
        subjectId,
        subjectTitle: targetSubject?.title,
      });
    }
  }, [journey, softDeleteItem]);

  const reorderTopic = useCallback((levelId, subjectId, topicId, direction) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.REORDER_TOPIC, payload: { journeyId: journey.id, levelId, subjectId, topicId, direction } });
  }, [journey, dispatch]);

  // Sub-item operations
  const toggleLearningItem = useCallback((topicId, itemId, completed) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.TOGGLE_LEARNING_ITEM, payload: { journeyId: journey.id, topicId, itemId, completed } });
  }, [journey, dispatch]);

  const addLearningItem = useCallback((topicId, itemData) => {
    if (!journey) return;
    const item = createNewLearningItem(itemData);
    dispatch({ type: ACTIONS.ADD_LEARNING_ITEM, payload: { journeyId: journey.id, topicId, item } });
    return item;
  }, [journey, dispatch]);

  const updateLearningItem = useCallback((topicId, itemId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_LEARNING_ITEM, payload: { journeyId: journey.id, topicId, itemId, updates } });
  }, [journey, dispatch]);

  const deleteLearningItem = useCallback((topicId, itemId) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.DELETE_LEARNING_ITEM, payload: { journeyId: journey.id, topicId, itemId } });
  }, [journey, dispatch]);

  const updateTopicSkill = useCallback((topicId, dimensionId, score) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_TOPIC_SKILL, payload: { journeyId: journey.id, topicId, dimensionId, score } });
  }, [journey, dispatch]);

  const updatePracticeItem = useCallback((topicId, practiceId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_PRACTICE_ITEM, payload: { journeyId: journey.id, topicId, practiceId, updates } });
  }, [journey, dispatch]);

  const updateDebuggingItem = useCallback((topicId, debuggingId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_DEBUGGING_ITEM, payload: { journeyId: journey.id, topicId, debuggingId, updates } });
  }, [journey, dispatch]);

  const updateAssessmentItem = useCallback((topicId, assessmentId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_ASSESSMENT_ITEM, payload: { journeyId: journey.id, topicId, assessmentId, updates } });
  }, [journey, dispatch]);

  const updateIndependenceCheck = useCallback((topicId, key, value) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_INDEPENDENCE_CHECK, payload: { journeyId: journey.id, topicId, key, value } });
  }, [journey, dispatch]);

  const addResource = useCallback((topicId, resourceData) => {
    if (!journey) return;
    const res = createNewResource(resourceData);
    dispatch({ type: ACTIONS.ADD_RESOURCE_ITEM, payload: { journeyId: journey.id, topicId, resource: res } });
    return res;
  }, [journey, dispatch]);

  const updateResource = useCallback((topicId, resourceId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_RESOURCE_ITEM, payload: { journeyId: journey.id, topicId, resourceId, updates } });
  }, [journey, dispatch]);

  const deleteResource = useCallback((topicId, resourceId) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.DELETE_RESOURCE_ITEM, payload: { journeyId: journey.id, topicId, resourceId } });
  }, [journey, dispatch]);

  // Projects
  const addProject = useCallback((projectData) => {
    if (!journey) return;
    const p = createNewProject(projectData);
    dispatch({ type: ACTIONS.ADD_PROJECT, payload: { journeyId: journey.id, project: p } });
    return p;
  }, [journey, dispatch]);

  const updateProject = useCallback((projectId, updates) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.UPDATE_PROJECT, payload: { journeyId: journey.id, projectId, updates } });
  }, [journey, dispatch]);

  const deleteProject = useCallback((projectId) => {
    if (!journey) return;
    const targetProj = (journey.projects || []).find((p) => p.id === projectId);
    if (targetProj) {
      softDeleteItem('project', targetProj, { journeyId: journey.id, journeyName: journey.name });
    }
  }, [journey, softDeleteItem]);

  // Learning logs
  const addLearningLog = useCallback((logData) => {
    if (!journey) return;
    const log = createNewLearningLog(logData);
    dispatch({ type: ACTIONS.ADD_LEARNING_LOG, payload: { journeyId: journey.id, log } });
    return log;
  }, [journey, dispatch]);

  const deleteLearningLog = useCallback((logId) => {
    if (!journey) return;
    dispatch({ type: ACTIONS.DELETE_LEARNING_LOG, payload: { journeyId: journey.id, logId } });
  }, [journey, dispatch]);

  return {
    journey,
    stats,
    weakAreas,
    skillAverages,
    addLevel,
    updateLevel,
    deleteLevel,
    reorderLevel,
    addSubject,
    updateSubject,
    deleteSubject,
    reorderSubject,
    addTopic,
    updateTopic,
    deleteTopic,
    reorderTopic,
    toggleLearningItem,
    updateTopicSkill,
    updatePracticeItem,
    updateDebuggingItem,
    updateAssessmentItem,
    updateIndependenceCheck,
    addResource,
    updateResource,
    deleteResource,
    addProject,
    updateProject,
    deleteProject,
    addLearningLog,
    deleteLearningLog,
  };
}
