// src/pages/JourneyBuilder.jsx
// Premium, state-of-the-art curriculum builder: Collapsible milestone levels, organized subjects, topic cards, and reordering controls

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
  Boxes,
  Check,
  Zap,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { TOPIC_PRIORITIES } from '../models/journeySchema';

const LEVEL_COLOR_PALETTES = [
  {
    gradient: 'from-sky-500 to-blue-600',
    badge: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25',
    border: 'border-sky-200/80 dark:border-sky-800/80',
    headerBg: 'bg-gradient-to-r from-sky-50/80 via-blue-50/30 to-transparent dark:from-sky-950/40 dark:via-blue-950/20',
  },
  {
    gradient: 'from-violet-500 to-purple-600',
    badge: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25',
    border: 'border-violet-200/80 dark:border-violet-800/80',
    headerBg: 'bg-gradient-to-r from-violet-50/80 via-purple-50/30 to-transparent dark:from-violet-950/40 dark:via-purple-950/20',
  },
  {
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25',
    border: 'border-emerald-200/80 dark:border-emerald-800/80',
    headerBg: 'bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-transparent dark:from-emerald-950/40 dark:via-teal-950/20',
  },
  {
    gradient: 'from-amber-500 to-orange-600',
    badge: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25',
    border: 'border-amber-200/80 dark:border-amber-800/80',
    headerBg: 'bg-gradient-to-r from-amber-50/80 via-orange-50/30 to-transparent dark:from-amber-950/40 dark:via-orange-950/20',
  },
  {
    gradient: 'from-rose-500 to-pink-600',
    badge: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25',
    border: 'border-rose-200/80 dark:border-rose-800/80',
    headerBg: 'bg-gradient-to-r from-rose-50/80 via-pink-50/30 to-transparent dark:from-rose-950/40 dark:via-pink-950/20',
  },
  {
    gradient: 'from-cyan-500 to-teal-600',
    badge: 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-md shadow-cyan-500/25',
    border: 'border-cyan-200/80 dark:border-cyan-800/80',
    headerBg: 'bg-gradient-to-r from-cyan-50/80 via-teal-50/30 to-transparent dark:from-cyan-950/40 dark:via-teal-950/20',
  },
];

function getLevelTheme(index) {
  return LEVEL_COLOR_PALETTES[index % LEVEL_COLOR_PALETTES.length];
}

function getLevelBadgeLabel(level, index) {
  return `L${index < 10 ? `0${index}` : index}`;
}

function LevelModal({ isOpen, onClose, onSave, initial = null, defaultOrder = 1 }) {
  const [title, setTitle] = useState(initial?.title || `Level ${defaultOrder}`);
  const [description, setDescription] = useState(initial?.description || '');
  const [estimatedDuration, setEstimatedDuration] = useState(initial?.estimatedDuration || '');
  const [targetDate, setTargetDate] = useState(initial?.targetDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      estimatedDuration: estimatedDuration.trim(),
      targetDate,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Milestone Level' : 'Add New Milestone Level'}
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
            placeholder="e.g. L0 — Engineering Foundations, Core Mechanics"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What concepts and engineering outcomes does this level cover?"
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

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!title.trim()}>
            {initial ? 'Save Changes' : 'Create Level'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SubjectModal({ isOpen, onClose, onSave, initial = null }) {
  const [title, setTitle] = useState(initial?.title || '');
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
      title={initial ? 'Edit Module' : 'Add New Module / Subject'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            Module Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Computer Architecture, Message Transformations"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Overview of this module domain..."
            rows={2}
            className="input"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!title.trim()}>
            {initial ? 'Save Changes' : 'Add Module'}
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
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(', '));

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
            placeholder="e.g. CPU & Memory Hierarchy, Decorators, Async/Await"
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
            placeholder="e.g. hardware, memory, async"
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

  // Collapsible state for levels and subjects (collapsed by default)
  const [expandedLevels, setExpandedLevels] = useState({});
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

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
      <AppLayout pageTitle="Curriculum Builder">
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

  const toggleLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !Boolean(prev[lvlId]) }));
  };

  const toggleSubject = (subId) => {
    setExpandedSubjects((prev) => ({ ...prev, [subId]: !Boolean(prev[subId]) }));
  };

  const toggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const lvlMap = {};
    const subMap = {};
    levels.forEach((lvl) => {
      lvlMap[lvl.id] = nextState;
      (lvl.subjects || []).forEach((sub) => {
        subMap[sub.id] = nextState;
      });
    });
    setExpandedLevels(lvlMap);
    setExpandedSubjects(subMap);
  };

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
    <AppLayout pageTitle="Curriculum Builder">
      <Breadcrumbs
        items={[
          { label: 'My Journeys', to: '/journeys' },
          { label: journey.name, to: `/journeys/${journey.id}` },
          { label: 'Curriculum Builder' },
        ]}
      />

      <PageHeader
        title="Curriculum & Hierarchy Builder"
        subtitle={`Organize and edit milestone levels, modules, and topics for ${journey.name}.`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={toggleAll} className="btn-secondary text-xs">
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
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
            const levelTheme = getLevelTheme(lIdx);
            const levelBadge = getLevelBadgeLabel(level, lIdx);
            const isLvlOpen = Boolean(expandedLevels[level.id]);

            return (
              <div
                key={level.id}
                className={`card overflow-hidden border transition-all ${levelTheme.border} shadow-sm`}
              >
                {/* Level Controls Header */}
                <div
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${levelTheme.headerBg}`}
                >
                  <div
                    onClick={() => toggleLevel(level.id)}
                    className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs flex-shrink-0 ${levelTheme.badge}`}
                    >
                      {levelBadge}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-black text-gray-900 dark:text-gray-100 truncate">
                          {level.title}
                        </h2>
                        {level.estimatedDuration && (
                          <span className="badge bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-[10px]">
                            {level.estimatedDuration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {level.description || `${subjects.length} Modules in this level`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto flex-shrink-0">
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
                      className="btn-ghost p-1.5 text-gray-600 hover:text-sky-600"
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
                            'This will delete this milestone level along with all its modules and topics. This cannot be undone.',
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
                      className="btn-primary text-xs px-3 py-1.5 ml-1.5"
                    >
                      <Plus className="w-3 h-3" />
                      Add Module
                    </button>

                    <button
                      onClick={() => toggleLevel(level.id)}
                      className="btn-ghost p-1.5 text-gray-400"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isLvlOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Subjects (Modules) Container */}
                {isLvlOpen && (
                  <div className="p-4 sm:p-5 border-t border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4">
                    {subjects.length > 0 ? (
                      subjects.map((subject, sIdx) => {
                        const topics = subject.topics || [];
                        const isSubOpen = Boolean(expandedSubjects[subject.id]);

                        return (
                          <div
                            key={subject.id}
                            className="rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/50 overflow-hidden shadow-2xs"
                          >
                            {/* Subject Header */}
                            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-gray-100/60 dark:bg-gray-800/60 border-b border-gray-200/70 dark:border-gray-750">
                              <div
                                onClick={() => toggleSubject(subject.id)}
                                className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                              >
                                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center flex-shrink-0">
                                  <Boxes className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                                    {subject.title}
                                  </h3>
                                  <span className="text-[11px] text-gray-400">
                                    {topics.length} {topics.length === 1 ? 'Topic' : 'Topics'}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 self-end sm:self-auto flex-shrink-0">
                                <button
                                  disabled={sIdx === 0}
                                  onClick={() => reorderSubject(level.id, subject.id, 'up')}
                                  className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                  title="Move Module Up"
                                >
                                  <MoveUp className="w-3 h-3" />
                                </button>
                                <button
                                  disabled={sIdx === subjects.length - 1}
                                  onClick={() => reorderSubject(level.id, subject.id, 'down')}
                                  className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                  title="Move Module Down"
                                >
                                  <MoveDown className="w-3 h-3" />
                                </button>

                                <button
                                  onClick={() =>
                                    setSubjectModal({
                                      open: true,
                                      levelId: level.id,
                                      initial: subject,
                                    })
                                  }
                                  className="btn-ghost p-1 text-gray-600 hover:text-sky-600"
                                  title="Edit Module"
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
                                      title: `Delete Module: ${subject.title}?`,
                                      message:
                                        'This will delete this module and all nested topics. This cannot be undone.',
                                    })
                                  }
                                  className="btn-ghost p-1 text-gray-400 hover:text-red-600"
                                  title="Delete Module"
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
                                  className="btn-secondary text-xs py-1 px-2 ml-1 font-bold"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add Topic
                                </button>

                                <button
                                  onClick={() => toggleSubject(subject.id)}
                                  className="btn-ghost p-1 text-gray-400"
                                >
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                      isSubOpen ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Topics List under Subject */}
                            {isSubOpen && (
                              <div className="p-3 space-y-2 bg-white dark:bg-gray-900/40">
                                {topics.length > 0 ? (
                                  topics.map((topic, tIdx) => (
                                    <div
                                      key={topic.id}
                                      className="p-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-850 flex items-center justify-between gap-3 hover:border-sky-300 dark:hover:border-sky-700 transition-all"
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <div className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                                              {topic.title}
                                            </span>
                                            {topic.priority === 'core' && (
                                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                                Core
                                              </span>
                                            )}
                                            {topic.estimatedHours && (
                                              <span className="text-[10px] text-gray-400">
                                                ~{topic.estimatedHours}h
                                              </span>
                                            )}
                                          </div>
                                          {topic.description && (
                                            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                                              {topic.description}
                                            </p>
                                          )}
                                        </div>
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
                                          <MoveUp className="w-3 h-3" />
                                        </button>
                                        <button
                                          disabled={tIdx === topics.length - 1}
                                          onClick={() =>
                                            reorderTopic(level.id, subject.id, topic.id, 'down')
                                          }
                                          className="btn-ghost p-1 text-gray-400 disabled:opacity-30"
                                          title="Move Topic Down"
                                        >
                                          <MoveDown className="w-3 h-3" />
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
                                          className="btn-ghost p-1 text-gray-600 hover:text-sky-600"
                                          title="Edit Topic"
                                        >
                                          <Edit2 className="w-3 h-3" />
                                        </button>

                                        <button
                                          onClick={() =>
                                            navigate(`/journeys/${journey.id}/topics/${topic.id}`)
                                          }
                                          className="btn-ghost p-1 text-sky-600 hover:text-sky-700"
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
                                                'This will delete this topic and all of its progress. This cannot be undone.',
                                            })
                                          }
                                          className="btn-ghost p-1 text-gray-400 hover:text-red-600"
                                          title="Delete Topic"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-3 text-center text-xs text-gray-400">
                                    No topics in this module yet. Click "+ Add Topic" above.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-400">
                        No modules in this level yet. Click "+ Add Module" above.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="layers"
          title="No Levels in this Journey"
          description="Click '+ Add Level' to begin building your curriculum."
          action={
            <button
              onClick={() => setLevelModal({ open: true, initial: null })}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Level
            </button>
          }
        />
      )}

      {/* Modals */}
      {levelModal.open && (
        <LevelModal
          isOpen={levelModal.open}
          onClose={() => setLevelModal({ open: false, initial: null })}
          onSave={(data) => {
            if (levelModal.initial) {
              updateLevel(levelModal.initial.id, data);
            } else {
              addLevel(data);
            }
          }}
          initial={levelModal.initial}
          defaultOrder={levels.length}
        />
      )}

      {subjectModal.open && (
        <SubjectModal
          isOpen={subjectModal.open}
          onClose={() => setSubjectModal({ open: false, levelId: null, initial: null })}
          onSave={(data) => {
            if (subjectModal.initial) {
              updateSubject(subjectModal.levelId, subjectModal.initial.id, data);
            } else {
              addSubject(subjectModal.levelId, data);
            }
          }}
          initial={subjectModal.initial}
        />
      )}

      {topicModal.open && (
        <TopicModal
          isOpen={topicModal.open}
          onClose={() =>
            setTopicModal({
              open: false,
              levelId: null,
              subjectId: null,
              initial: null,
            })
          }
          onSave={(data) => {
            if (topicModal.initial) {
              updateTopic(topicModal.levelId, topicModal.subjectId, topicModal.initial.id, data);
            } else {
              addTopic(topicModal.levelId, topicModal.subjectId, data);
            }
          }}
          initial={topicModal.initial}
        />
      )}

      {deleteConfirm.open && (
        <ConfirmDialog
          isOpen={deleteConfirm.open}
          onClose={() =>
            setDeleteConfirm({
              open: false,
              type: null,
              levelId: null,
              subjectId: null,
              topicId: null,
            })
          }
          onConfirm={handleConfirmDelete}
          title={deleteConfirm.title}
          message={deleteConfirm.message}
          confirmLabel="Delete"
          danger
        />
      )}
    </AppLayout>
  );
}
