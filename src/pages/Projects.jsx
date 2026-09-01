// src/pages/Projects.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  GitBranch,
  CheckCircle,
  Circle,
  FolderKanban,
  Copy,
  Calendar,
  Layers,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { ProgressBar } from '../components/common/ProgressBar';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { useAppState } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { PROJECT_STATUSES, generateId } from '../models/journeySchema';

const STATUS_CONFIG = {
  planning: { label: 'Planning', badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  'in-progress': { label: 'In Progress', badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
  blocked: { label: 'Blocked', badge: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
  completed: { label: 'Completed', badge: 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300' },
  archived: { label: 'Archived', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
};

function ProjectModal({ isOpen, onClose, onSave, initial = null }) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [goal, setGoal] = useState(initial?.goal || '');
  const [technologiesInput, setTechnologiesInput] = useState(
    Array.isArray(initial?.technologies) ? initial.technologies.join(', ') : ''
  );
  const [status, setStatus] = useState(initial?.status || 'planning');
  const [progress, setProgress] = useState(initial?.progress || 0);
  const [startDate, setStartDate] = useState(initial?.startDate || '');
  const [targetDate, setTargetDate] = useState(initial?.targetDate || '');
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl || '');
  const [deploymentUrl, setDeploymentUrl] = useState(initial?.deploymentUrl || '');
  const [notes, setNotes] = useState(initial?.notes || '');
  const [checklist, setChecklist] = useState(initial?.checklist || []);
  const [newCheckItem, setNewCheckItem] = useState('');

  const addCheckItem = () => {
    if (!newCheckItem.trim()) return;
    setChecklist([...checklist, { id: generateId('chk'), title: newCheckItem.trim(), completed: false }]);
    setNewCheckItem('');
  };

  const removeCheckItem = (id) => {
    setChecklist(checklist.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const technologies = technologiesInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      description: description.trim(),
      goal: goal.trim(),
      technologies,
      status,
      progress: Number(progress) || 0,
      startDate,
      targetDate,
      githubUrl: githubUrl.trim(),
      deploymentUrl: deploymentUrl.trim(),
      notes: notes.trim(),
      checklist,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. End-to-End RAG Search Engine"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description & Problem Solved</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this project do and what problem does it solve?"
            rows={2}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Primary Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Capstone portfolio project"
              className="input"
            />
          </div>
          <div>
            <label className="label">Technologies (comma-separated)</label>
            <input
              type="text"
              value={technologiesInput}
              onChange={(e) => setTechnologiesInput(e.target.value)}
              placeholder="e.g. React, Node.js, PyTorch, Docker"
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              {PROJECT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {STATUS_CONFIG[st]?.label || st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Progress: {progress}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full mt-2 accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">GitHub Repository URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="input"
            />
          </div>
          <div>
            <label className="label">Live Deployment / Demo URL</label>
            <input
              type="url"
              value={deploymentUrl}
              onChange={(e) => setDeploymentUrl(e.target.value)}
              placeholder="https://my-app.vercel.app"
              className="input"
            />
          </div>
        </div>

        {/* Milestone Checklist */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2">
          <label className="label">Milestone Checklist</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCheckItem}
              onChange={(e) => setNewCheckItem(e.target.value)}
              placeholder="Add milestone or feature..."
              className="input py-1 text-xs flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCheckItem();
                }
              }}
            />
            <button
              type="button"
              onClick={addCheckItem}
              className="btn-secondary text-xs py-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-1 pt-1">
            {checklist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/60"
              >
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() => removeCheckItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Notes & Learnings</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Lessons learned, architectural decisions, or interview talking points..."
            rows={2}
            className="input"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!name.trim()}>
            {initial ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeJourney } = useAppState();
  const { journey, addProject, updateProject, deleteProject } = useJourney(activeJourney?.id);

  const [modalState, setModalState] = useState({ open: false, initial: null });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const projects = journey?.projects || [];

  const handleSaveProject = (data) => {
    if (modalState.initial) {
      updateProject(modalState.initial.id, data);
      toast('Project updated successfully', 'success');
    } else {
      addProject(data);
      toast('Project added to journey', 'success');
    }
  };

  const handleToggleChecklist = (project, itemId) => {
    const nextChecklist = (project.checklist || []).map((c) =>
      c.id === itemId ? { ...c, completed: !c.completed } : c
    );
    const completedCount = nextChecklist.filter((c) => c.completed).length;
    const progress =
      nextChecklist.length > 0
        ? Math.round((completedCount / nextChecklist.length) * 100)
        : project.progress;

    updateProject(project.id, { checklist: nextChecklist, progress });
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="Projects">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to view and manage its projects."
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
    <AppLayout pageTitle="Projects">
      <PageHeader
        title="Portfolio Projects"
        subtitle={`Track practical capstones and demonstrated skills for ${journey.name}.`}
        actions={
          <button
            onClick={() => setModalState({ open: true, initial: null })}
            className="btn-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Project
          </button>
        }
      />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj) => {
            const statusCfg = STATUS_CONFIG[proj.status] || STATUS_CONFIG.planning;
            const checklist = proj.checklist || [];
            const completedCount = checklist.filter((c) => c.completed).length;

            return (
              <div
                key={proj.id}
                className="card p-5 flex flex-col justify-between hover:shadow-card-md transition-all space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`badge font-semibold ${statusCfg.badge}`}>
                      {statusCfg.label}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setModalState({ open: true, initial: proj })}
                        className="btn-ghost p-1 text-gray-400 hover:text-indigo-600"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(proj.id)}
                        className="btn-ghost p-1 text-gray-400 hover:text-red-500"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {proj.name}
                  </h3>

                  {proj.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  )}

                  {/* Tech stack */}
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {proj.progress}% Complete
                      </span>
                      {checklist.length > 0 && (
                        <span className="text-gray-400">
                          {completedCount} of {checklist.length} milestones
                        </span>
                      )}
                    </div>
                    <ProgressBar value={proj.progress} height="h-1.5" />
                  </div>

                  {/* Milestone checklist preview */}
                  {checklist.length > 0 && (
                    <div className="mt-3 space-y-1.5 bg-gray-50/50 dark:bg-gray-800/40 p-2.5 rounded-xl">
                      {checklist.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleToggleChecklist(proj, item.id)}
                          className="flex items-center gap-2 text-xs w-full text-left transition-colors"
                        >
                          {item.completed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                          )}
                          <span
                            className={
                              item.completed
                                ? 'line-through text-gray-400'
                                : 'text-gray-700 dark:text-gray-300 font-medium'
                            }
                          >
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Links */}
                {(proj.githubUrl || proj.deploymentUrl) && (
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                      >
                        <GitBranch className="w-3.5 h-3.5" /> Code Repo
                      </a>
                    )}
                    {proj.deploymentUrl && (
                      <a
                        href={proj.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="inbox"
          title="No projects in this journey"
          description="Add portfolio projects and milestones to track your practical application of skills."
          action={
            <button
              onClick={() => setModalState({ open: true, initial: null })}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Project
            </button>
          }
        />
      )}

      {/* Modal */}
      <ProjectModal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, initial: null })}
        onSave={handleSaveProject}
        initial={modalState.initial}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) {
            deleteProject(deleteConfirmId);
            setDeleteConfirmId(null);
            toast('Project deleted', 'info');
          }
        }}
        title="Delete Project"
        message="Are you sure you want to delete this project? This cannot be undone."
        confirmLabel="Delete"
        danger
      />
    </AppLayout>
  );
}
