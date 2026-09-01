// src/pages/WeakAreas.jsx
// Journey-scoped Weak Areas view

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Target, ArrowLeft } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState } from '../context/AppContext';
import { useJourney } from '../hooks/useJourney';

export default function WeakAreas() {
  const { activeJourney } = useAppState();
  const navigate = useNavigate();
  const { weakAreas } = useJourney(activeJourney?.id);

  if (!activeJourney) {
    return (
      <AppLayout pageTitle="Weak Areas">
        <EmptyState
          icon="star"
          title="No Active Journey Selected"
          description="Create or select a journey to track weak areas."
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
    <AppLayout pageTitle="Weak Areas">
      <PageHeader
        title={`Weak Areas (${activeJourney.name})`}
        subtitle="Topics needing focused review based on skill scores and incomplete tasks."
      />

      {weakAreas.length === 0 ? (
        <div className="card p-8">
          <EmptyState
            icon="star"
            title="No weak areas detected"
            description="You're on track! As you study and rate skill dimensions, topics needing review will appear here."
            action={
              <button onClick={() => navigate(`/journeys/${activeJourney.id}`)} className="btn-primary text-xs">
                Continue Learning Roadmap
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weakAreas.map((item) => (
            <div key={item.topicId} className="card p-5 border-l-4 border-l-amber-500 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {item.levelTitle} / {item.subjectTitle}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {item.topicTitle}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">{item.progress}%</div>
                  <div className="text-[10px] text-gray-400 uppercase">Progress</div>
                </div>
              </div>

              <ProgressBar value={item.progress} height="h-1.5" color="amber" />

              {item.reasons?.length > 0 && (
                <ul className="text-xs text-gray-500 space-y-1 pt-1">
                  {item.reasons.map((r, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => navigate(`/journeys/${activeJourney.id}/topics/${item.topicId}`)}
                className="btn-primary text-xs w-full justify-center mt-2"
              >
                <Target className="w-3.5 h-3.5" />
                Study Topic Workspace
              </button>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
