// src/pages/AdminDashboard.jsx
// Admin overview for Master Role Templates, curriculum statistics, and content lifecycle

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, BookOpen, Layers, GitBranch, Trash2, ArrowRight, Sparkles, Download, CheckCircle } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { useAppState } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { masterTemplates, adminRecycleBin } = useAppState();
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <AppLayout pageTitle="Admin Access Required">
        <div className="card p-12 text-center max-w-lg mx-auto mt-12 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Administrator Access Required</h2>
          <p className="text-sm text-gray-500">
            You are signed in as <span className="font-semibold">{user?.email || 'User'}</span>, which does not have administrator privileges for master curriculum editing.
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary text-xs mx-auto">
            Return to Learning Dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  // Calculate master curriculum statistics
  const totalLevels = masterTemplates.reduce((acc, t) => acc + (t.levels?.length || 0), 0);
  const totalTopics = masterTemplates.reduce(
    (acc, t) =>
      acc +
      (t.levels || []).reduce(
        (lAcc, lvl) => lAcc + (lvl.subjects || []).reduce((sAcc, sub) => sAcc + (sub.topics?.length || 0), 0),
        0
      ),
    0
  );

  return (
    <AppLayout pageTitle="Admin Portal">
      <PageHeader
        title="Curriculum Management & Admin Portal"
        subtitle="Manage master role templates, edit versioned curricula, review master deletions, and export updated schemas."
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/admin/recycle-bin')}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Master Recycle Bin ({adminRecycleBin.length})
            </button>
          </div>
        }
      />

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="card p-5 border-l-4 border-indigo-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">{masterTemplates.length}</div>
            <div className="text-xs text-gray-500 font-medium">Master Templates</div>
          </div>
        </div>

        <div className="card p-5 border-l-4 border-violet-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">{totalLevels}</div>
            <div className="text-xs text-gray-500 font-medium">Curriculum Levels</div>
          </div>
        </div>

        <div className="card p-5 border-l-4 border-blue-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">{totalTopics}</div>
            <div className="text-xs text-gray-500 font-medium">Curated Topics</div>
          </div>
        </div>

        <div className="card p-5 border-l-4 border-amber-500 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">{adminRecycleBin.length}</div>
            <div className="text-xs text-gray-500 font-medium">Recycled Items</div>
          </div>
        </div>
      </div>

      {/* Templates Catalog Table */}
      <div className="card overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Master Role Templates</h2>
            <p className="text-xs text-gray-500">Edit curriculum structure, add levels/topics, or export updated JSON schemas.</p>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {masterTemplates.map((template) => {
            const levelCount = template.levels?.length || 0;
            const topicCount = (template.levels || []).reduce(
              (acc, lvl) => acc + (lvl.subjects || []).reduce((sAcc, sub) => sAcc + (sub.topics?.length || 0), 0),
              0
            );

            return (
              <div
                key={template.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{template.name}</h3>
                    <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-[10px] font-mono">
                      v{template.version || 1}
                    </span>
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-[10px]">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{template.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <span>{levelCount} Levels</span>
                    <span>•</span>
                    <span>{topicCount} Topics</span>
                    <span>•</span>
                    <span>Est. {template.estimatedDuration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/admin/templates/${template.id}`)}
                    className="btn-primary text-xs"
                  >
                    Edit Curriculum
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
