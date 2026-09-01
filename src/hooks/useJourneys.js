// src/hooks/useJourneys.js
import { useMemo } from 'react';
import { useAppState, ACTIONS } from '../context/AppContext';
import { cloneJourneyFromTemplate, getTemplateById } from '../data/templates';
import { createNewJourney } from '../models/journeySchema';

export function useJourneys() {
  const { state, dispatch, activeJourney } = useAppState();

  const activeJourneys = useMemo(() => {
    return (state.journeys || []).filter((j) => !j.isArchived);
  }, [state.journeys]);

  const archivedJourneys = useMemo(() => {
    return (state.journeys || []).filter((j) => j.isArchived);
  }, [state.journeys]);

  const createJourney = (params) => {
    const journey = createNewJourney(params);
    dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: journey });
    return journey;
  };

  const createFromTemplate = (templateId, customName = null) => {
    const template = getTemplateById(templateId);
    if (!template) throw new Error(`Template not found: ${templateId}`);
    const journey = cloneJourneyFromTemplate(template, customName);
    dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: journey });
    return journey;
  };

  const updateJourney = (journeyId, updates) => {
    dispatch({ type: ACTIONS.UPDATE_JOURNEY, payload: { journeyId, updates } });
  };

  const deleteJourney = (journeyId) => {
    dispatch({ type: ACTIONS.DELETE_JOURNEY, payload: journeyId });
  };

  const duplicateJourney = (journeyId) => {
    dispatch({ type: ACTIONS.DUPLICATE_JOURNEY, payload: journeyId });
  };

  const archiveJourney = (journeyId, isArchived = true) => {
    dispatch({ type: ACTIONS.ARCHIVE_JOURNEY, payload: { journeyId, isArchived } });
  };

  const setActiveJourney = (journeyId) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: journeyId });
  };

  return {
    journeys: state.journeys || [],
    activeJourneys,
    archivedJourneys,
    activeJourney,
    createJourney,
    createFromTemplate,
    updateJourney,
    deleteJourney,
    duplicateJourney,
    archiveJourney,
    setActiveJourney,
  };
}
