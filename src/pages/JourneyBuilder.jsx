// src/pages/JourneyBuilder.jsx
// Dedicated hierarchy manager for Levels, Subjects, and Topics

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  FolderTree,
  BookOpen,
  Layers,
  Sparkles,
  ExternalLink,
  MoveUp,
  MoveDown,
  Tags,
  Clock,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { TOPIC_PRIORITIES } from '../models/journeySchema';

const LEVEL_COLORS = [
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-500' },
  { id: 'blue', label: 'Blue', bg: 'bg-blue-500' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-500' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
  { id: 'teal', label: 'Teal', bg: 'bg-teal-500' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-500' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-500' },
  { id: 'slate', label: 'Slate', bg: 'bg-slate-500' },
];

function LevelModal({ isOpen, onClose, onSave, initial = null, defaultOrder = 1 }) {
  const [title, setTitle] = useState(initial?.title || `Level ${defaultOrder}`);
  const [description, setDescription] = useState(initial?.description || '');
  const [estimatedDuration, setEstimatedDuration] = useState(initial?.estimatedDuration || '');
  const [color, setColor] = useState(initial?.color || 'indigo');
  const [targetDate, setTargetDate] = useState(initial?.targetDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      estimatedDuration: estimatedDuration.trim(),
      color,
      targetDate,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Level' : 'Add New Level'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            Level Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. L0 — Engineering Foundations, Beginner, Advanced"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this level cover?"
            rows={2}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Estimated Duration</label>
            <input
              type="text"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              placeholder="e.g. 2-3 weeks, 1 month"
              className="input"
            />
          </div>
          <div>
            <label className="label">Target Date (Optional)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Accent Color</label>
          <div className="flex gap-2 flex-wrap">
            {LEVEL_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center transition-all ${
                  color === c.id ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110' : 'opacity-80 hover:opacity-100'
                }`}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!title.trim()}>
            {initial ? 'Save Changes' : 'Add Level'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SubjectModal({ isOpen, onClose, onSave, initial = null, defaultOrder = 1 }) {
  const [title, setTitle] = useState(initial?.title || `Subject ${defaultOrder}`);
  const [description, setDescription] = useState(initial?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Subject' : 'Add New Subject'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            Subject Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Python Fundamentals, Frontend Architecture, SQL"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Subject overview..."
            rows={2}
            className="input"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!title.trim()}>
            {initial ? 'Save Changes' : 'Add Subject'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function TopicModal({ isOpen, onClose, onSave, initial = null }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'core');
  const [estimatedHours, setEstimatedHours] = useState(initial?.estimatedHours || 4);
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(initial?.tags) ? initial.tags.join(', ') : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      estimatedHours: Number(estimatedHours) || 4,
      tags,
      source: initial?.source || 'custom',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Topic' : 'Add New Topic'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            Topic Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Decorators, Transformers, Async/Await"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key concepts, goals, or prerequisites..."
            rows={2}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input"
            >
              {TOPIC_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Est. Learning Hours</label>
            <input
              type="number"
              min="1"
              max="200"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Tags (comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. python, closures, advanced"
            className="input"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!title.trim()}>
            {initial ? 'Save Changes' : 'Add Topic'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function JourneyBuilder() {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const {
    journey,
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
  } = useJourney(journeyId);

  // Modal States
  const [levelModal, setLevelModal] = useState({ open: false, initial: null });
  const [subjectModal, setSubjectModal] = useState({ open: false, levelId: null, initial: null });
  const [topicModal, setTopicModal] = useState({
    open: false,
    levelId: null,
    subjectId: null,
    initial: null,
  });

  // Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: null,
    levelId: null,
    subjectId: null,
    topicId: null,
    title: '',
    message: '',
  });

  if (!journey) {
    return (
      <AppLayout pageTitle="Journey Builder">
        <EmptyState
          icon="book"
          title="Journey Not Found"
          description="Could not find the journey to build."
          action={
            <button onClick={() => navigate('/journeys')} className="btn-primary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Journeys
            </button>
          }
        />
      </AppLayout>
    );
  }

  const levels = journey.levels || [];

  const handleConfirmDelete = () => {
    if (deleteConfirm.type === 'level') {
      deleteLevel(deleteConfirm.levelId);
    } else if (deleteConfirm.type === 'subject') {
      deleteSubject(deleteConfirm.levelId, deleteConfirm.subjectId);
    } else if (deleteConfirm.type === 'topic') {
      deleteTopic(deleteConfirm.levelId, deleteConfirm.subjectId, deleteConfirm.topicId);
    }
    setDeleteConfirm({ open: false, type: null, levelId: null, subjectId: null, topicId: null });
  };

  return (
    <AppLayout pageTitle="Journey Builder">
      <Breadcrumbs
        items={[
          { label: 'My Journeys', to: '/journeys' },
          { label: journey.name, to: `/journeys/${journey.id}` },
          { label: 'Journey Builder' },
        ]}
      />

      <PageHeader
        title="Journey Hierarchy Builder"
        subtitle={`Construct and customize ${journey.name} levels, subjects, and topics.`}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/journeys/${journey.id}`)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View Roadmap
            </button>
            <button
              onClick={() => setLevelModal({ open: true, initial: null })}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Level
            </button>
          </div>
        }
      />

      {/* Levels Tree */}
      {levels.length > 0 ? (
        <div className="space-y-6">
          {levels.map((level, lIdx) => {
            const subjects = level.subjects || [];

            return (
              <div
                key={level.id}
                className="card p-5 border-l-4 border-l-indigo-500 space-y-4 shadow-sm"
              >
                {/* Level Controls Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {level.order || lIdx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                          {level.title}
                        </h2>
                        {level.estimatedDuration && (
                          <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px]">
                            {level.estimatedDuration}
                          </span>
                        )}
                      </div>
                      {level.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {level.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {/* Reorder Buttons */}
                    <button
                      disabled={lIdx === 0}
                      onClick={() => reorderLevel(level.id, 'up')}
                      className="btn-ghost p-1.5 text-gray-500 disabled:opacity-30"
                      title="Move Level Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={lIdx === levels.length - 1}
                      onClick={() => reorderLevel(level.id, 'down')}
                      className="btn-ghost p-1.5 text-gray-500 disabled:opacity-30"
                      title="Move Level Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setLevelModal({ open: true, initial: level })}
                      className="btn-ghost p-1.5 text-gray-600 hover:text-indigo-600"
                      title="Edit Level"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() =>
                        setDeleteConfirm({
                          open: true,
                          type: 'level',
                          levelId: level.id,
                          title: `Delete Level: ${level.title}?`,
                          message:
                            'This will delete this level along with all of its nested subjects and topics. This cannot be undone.',
                        })
                      }
                      className="btn-ghost p-1.5 text-gray-400 hover:text-red-600"
                      title="Delete Level"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() =>
                        setSubjectModal({ open: true, levelId: level.id, initial: null })
                      }
                      className="btn-secondary text-xs px-2.5 py-1 ml-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Subject
                    </button>
                  </div>
                </div>

                {/* Subjects under this level */}
                <div className="space-y-3 pl-2 sm:pl-4">
                  {subjects.length > 0 ? (
                    subjects.map((subject, sIdx) => {
                      const topics = subject.topics || [];

                      return (
                        <div
                          key={subject.id}
                          className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 space-y-3"
                        >
                          {/* Subject Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-400" />
                              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {subject.title}
                              </h3>
                              <span className="text-xs text-gray-400">
                                ({topics.length} topics)
                              </span>
                            </div>

                            <div className="flex items-center gap-1 self-end sm:self-auto">
                              <button
                                disabled={sIdx === 0}
                                onClick={() => reorderSubject(level.id, subject.id, 'up')}
                                className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                title="Move Subject Up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={sIdx === subjects.length - 1}
                                onClick={() => reorderSubject(level.id, subject.id, 'down')}
                                className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                title="Move Subject Down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() =>
                                  setSubjectModal({
                                    open: true,
                                    levelId: level.id,
                                    initial: subject,
                                  })
                                }
                                className="btn-ghost p-1 text-gray-500 hover:text-indigo-600"
                                title="Edit Subject"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    open: true,
                                    type: 'subject',
                                    levelId: level.id,
                                    subjectId: subject.id,
                                    title: `Delete Subject: ${subject.title}?`,
                                    message:
                                      'This will remove this subject and all its topics. This cannot be undone.',
                                  })
                                }
                                className="btn-ghost p-1 text-gray-400 hover:text-red-500"
                                title="Delete Subject"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() =>
                                  setTopicModal({
                                    open: true,
                                    levelId: level.id,
                                    subjectId: subject.id,
                                    initial: null,
                                  })
                                }
                                className="btn-secondary text-[11px] px-2 py-0.5 ml-1"
                              >
                                <Plus className="w-3 h-3" /> Topic
                              </button>
                            </div>
                          </div>

                          {/* Topics List under Subject */}
                          <div className="space-y-1.5 pl-2 sm:pl-3 border-l-2 border-indigo-100 dark:border-indigo-900/40">
                            {topics.length > 0 ? (
                              topics.map((topic, tIdx) => (
                                <div
                                  key={topic.id}
                                  className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span
                                      className={`badge text-[10px] ${
                                        topic.priority === 'core'
                                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      {topic.priority}
                                    </span>

                                    {topic.source === 'template' ? (
                                      <span className="badge bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 text-[10px] font-medium">
                                        Recommended
                                      </span>
                                    ) : (
                                      <span className="badge bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300 text-[10px] font-medium">
                                        Custom
                                      </span>
                                    )}

                                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                                      {topic.title}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <button
                                      disabled={tIdx === 0}
                                      onClick={() =>
                                        reorderTopic(level.id, subject.id, topic.id, 'up')
                                      }
                                      className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                      title="Move Topic Up"
                                    >
                                      <ChevronUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      disabled={tIdx === topics.length - 1}
                                      onClick={() =>
                                        reorderTopic(level.id, subject.id, topic.id, 'down')
                                      }
                                      className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                      title="Move Topic Down"
                                    >
                                      <ChevronDown className="w-3 h-3" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        setTopicModal({
                                          open: true,
                                          levelId: level.id,
                                          subjectId: subject.id,
                                          initial: topic,
                                        })
                                      }
                                      className="btn-ghost p-1 text-gray-500 hover:text-indigo-600"
                                      title="Edit Topic"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/journeys/${journey.id}/topics/${topic.id}`
                                        )
                                      }
                                      className="btn-ghost p-1 text-gray-500 hover:text-indigo-600"
                                      title="Open Topic Workspace"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        setDeleteConfirm({
                                          open: true,
                                          type: 'topic',
                                          levelId: level.id,
                                          subjectId: subject.id,
                                          topicId: topic.id,
                                          title: `Delete Topic: ${topic.title}?`,
                                          message:
                                            'This will remove this topic and all its learning tasks. This cannot be undone.',
                                        })
                                      }
                                      className="btn-ghost p-1 text-gray-400 hover:text-red-500"
                                      title="Delete Topic"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="py-2 text-center text-xs text-gray-400 italic">
                                No topics in this subject. Click "+ Topic" above.
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-3 text-center text-xs text-gray-400 italic bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                      No subjects in this level. Click "+ Add Subject" above.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="book"
          title="No Levels in this Journey"
          description="Start constructing your learning roadmap by adding your first level."
          action={
            <button
              onClick={() => setLevelModal({ open: true, initial: null })}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Level
            </button>
          }
        />
      )}

      {/* Level Modal */}
      <LevelModal
        isOpen={levelModal.open}
        onClose={() => setLevelModal({ open: false, initial: null })}
        initial={levelModal.initial}
        defaultOrder={levels.length + 1}
        onSave={(data) => {
          if (levelModal.initial) {
            updateLevel(levelModal.initial.id, data);
          } else {
            addLevel(data);
          }
        }}
      />

      {/* Subject Modal */}
      <SubjectModal
        isOpen={subjectModal.open}
        onClose={() => setSubjectModal({ open: false, levelId: null, initial: null })}
        initial={subjectModal.initial}
        onSave={(data) => {
          if (subjectModal.initial) {
            updateSubject(subjectModal.levelId, subjectModal.initial.id, data);
          } else {
            addSubject(subjectModal.levelId, data);
          }
        }}
      />

      {/* Topic Modal */}
      <TopicModal
        isOpen={topicModal.open}
        onClose={() =>
          setTopicModal({ open: false, levelId: null, subjectId: null, initial: null })
        }
        initial={topicModal.initial}
        onSave={(data) => {
          if (topicModal.initial) {
            updateTopic(topicModal.initial.id, data);
          } else {
            addTopic(topicModal.levelId, topicModal.subjectId, data);
          }
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() =>
          setDeleteConfirm({ open: false, type: null, levelId: null, subjectId: null, topicId: null })
        }
        onConfirm={handleConfirmDelete}
        title={deleteConfirm.title || 'Delete Item'}
        message={deleteConfirm.message || 'Are you sure? This cannot be undone.'}
        confirmLabel="Delete"
        danger
      />
    </AppLayout>
  );
}
