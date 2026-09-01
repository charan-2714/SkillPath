// src/pages/AdminTemplateEditor.jsx
// Visual master role template & curriculum editor for administrators

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  Download,
  Save,
  Layers,
  BookOpen,
  CheckCircle,
  HelpCircle,
  FileText,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Sparkles,
  Tag,
  Code,
  Bug,
  BrainCircuit,
  X,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Modal } from '../components/common/Modal';
import { useAppState } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { generateId, TOPIC_PRIORITIES } from '../models/journeySchema';

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

export default function AdminTemplateEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { masterTemplates, updateMasterTemplate, softDeleteMasterTemplateItem } = useAppState();
  const { isAdmin } = useAuth();
  const { showToast } = useToast();

  const template = masterTemplates.find((t) => t.id === templateId);

  const [expandedLevels, setExpandedLevels] = useState({});
  const [levelModal, setLevelModal] = useState({ open: false, isEdit: false, level: null });
  const [subjectModal, setSubjectModal] = useState({ open: false, isEdit: false, levelId: null, subject: null });
  const [topicModal, setTopicModal] = useState({ open: false, isEdit: false, levelId: null, subjectId: null, topic: null });
  const [versionModal, setVersionModal] = useState({ open: false, version: '', notes: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (!isAdmin) {
    return (
      <AppLayout pageTitle="Admin Required">
        <div className="card p-8 text-center max-w-md mx-auto mt-8">
          <p className="text-sm text-gray-600">Admin authorization required to edit master templates.</p>
          <button onClick={() => navigate('/templates')} className="btn-primary text-xs mt-4">
            View Templates Catalog
          </button>
        </div>
      </AppLayout>
    );
  }

  if (!template) {
    return (
      <AppLayout pageTitle="Template Not Found">
        <div className="card p-8 text-center max-w-md mx-auto mt-8">
          <p className="text-sm text-gray-600">Template "{templateId}" could not be found.</p>
          <button onClick={() => navigate('/admin')} className="btn-secondary text-xs mt-4">
            Back to Admin Portal
          </button>
        </div>
      </AppLayout>
    );
  }

  const toggleLevel = (lvlId) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(template, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${template.id}.json schema!`, 'success');
  };

  const handleSaveVersion = (e) => {
    e.preventDefault();
    if (!versionModal.version.trim()) return;
    updateMasterTemplate(template.id, (t) => ({
      ...t,
      version: versionModal.version.trim(),
      updatedAt: new Date().toISOString(),
    }));
    showToast(`Template updated to version ${versionModal.version.trim()}`, 'success');
    setVersionModal({ open: false, version: '', notes: '' });
  };

  // Reorder helper
  const handleReorder = (type, parentLevelId, parentSubjectId, itemId, direction) => {
    updateMasterTemplate(template.id, (t) => {
      if (type === 'level') {
        const levels = [...(t.levels || [])];
        const idx = levels.findIndex((l) => l.id === itemId);
        if (idx === -1) return t;
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= levels.length) return t;
        const [moved] = levels.splice(idx, 1);
        levels.splice(targetIdx, 0, moved);
        levels.forEach((l, i) => { l.order = i + 1; });
        return { ...t, levels };
      }

      if (type === 'subject') {
        const levels = (t.levels || []).map((lvl) => {
          if (lvl.id !== parentLevelId) return lvl;
          const subjects = [...(lvl.subjects || [])];
          const idx = subjects.findIndex((s) => s.id === itemId);
          if (idx === -1) return lvl;
          const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (targetIdx < 0 || targetIdx >= subjects.length) return lvl;
          const [moved] = subjects.splice(idx, 1);
          subjects.splice(targetIdx, 0, moved);
          subjects.forEach((s, i) => { s.order = i + 1; });
          return { ...lvl, subjects };
        });
        return { ...t, levels };
      }

      if (type === 'topic') {
        const levels = (t.levels || []).map((lvl) => {
          if (lvl.id !== parentLevelId) return lvl;
          const subjects = (lvl.subjects || []).map((sub) => {
            if (sub.id !== parentSubjectId) return sub;
            const topics = [...(sub.topics || [])];
            const idx = topics.findIndex((top) => top.id === itemId);
            if (idx === -1) return sub;
            const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= topics.length) return sub;
            const [moved] = topics.splice(idx, 1);
            topics.splice(targetIdx, 0, moved);
            return { ...sub, topics };
          });
          return { ...lvl, subjects };
        });
        return { ...t, levels };
      }

      return t;
    });
  };

  // Level Save Handler
  const handleSaveLevel = (levelData) => {
    updateMasterTemplate(template.id, (t) => {
      if (levelModal.isEdit && levelModal.level) {
        return {
          ...t,
          levels: (t.levels || []).map((l) =>
            l.id === levelModal.level.id ? { ...l, ...levelData } : l
          ),
        };
      }
      const newLvl = {
        id: `lvl-${Date.now()}`,
        order: (t.levels?.length || 0) + 1,
        subjects: [],
        ...levelData,
      };
      return { ...t, levels: [...(t.levels || []), newLvl] };
    });
    showToast(levelModal.isEdit ? 'Updated Level details' : 'Added Level to master template', 'success');
    setLevelModal({ open: false, isEdit: false, level: null });
  };

  // Subject Save Handler
  const handleSaveSubject = (subjectData) => {
    updateMasterTemplate(template.id, (t) => ({
      ...t,
      levels: (t.levels || []).map((lvl) => {
        if (lvl.id !== subjectModal.levelId) return lvl;
        if (subjectModal.isEdit && subjectModal.subject) {
          return {
            ...lvl,
            subjects: (lvl.subjects || []).map((s) =>
              s.id === subjectModal.subject.id ? { ...s, ...subjectData } : s
            ),
          };
        }
        const newSub = {
          id: generateId('subj'),
          order: (lvl.subjects?.length || 0) + 1,
          topics: [],
          ...subjectData,
        };
        return { ...lvl, subjects: [...(lvl.subjects || []), newSub] };
      }),
    }));
    showToast(subjectModal.isEdit ? 'Updated Subject' : 'Added Subject to level', 'success');
    setSubjectModal({ open: false, isEdit: false, levelId: null, subject: null });
  };

  // Topic Save Handler
  const handleSaveTopic = (topicData) => {
    updateMasterTemplate(template.id, (t) => ({
      ...t,
      levels: (t.levels || []).map((lvl) => {
        if (lvl.id !== topicModal.levelId) return lvl;
        return {
          ...lvl,
          subjects: (lvl.subjects || []).map((sub) => {
            if (sub.id !== topicModal.subjectId) return sub;
            if (topicModal.isEdit && topicModal.topic) {
              return {
                ...sub,
                topics: (sub.topics || []).map((top) =>
                  top.id === topicModal.topic.id ? { ...top, ...topicData } : top
                ),
              };
            }
            const newTop = {
              id: generateId('topic'),
              order: (sub.topics?.length || 0) + 1,
              ...topicData,
            };
            return { ...sub, topics: [...(sub.topics || []), newTop] };
          }),
        };
      }),
    }));
    showToast(topicModal.isEdit ? 'Updated Topic' : 'Added Topic to subject', 'success');
    setTopicModal({ open: false, isEdit: false, levelId: null, subjectId: null, topic: null });
  };

  // Delete Handlers with Soft Delete to Admin Recycle Bin
  const handleDeleteItem = () => {
    if (!deleteConfirm) return;
    const { type, item, levelId, subjectId } = deleteConfirm;

    softDeleteMasterTemplateItem(template.id, type, item, { levelId, subjectId });

    updateMasterTemplate(template.id, (t) => {
      if (type === 'level') {
        return { ...t, levels: (t.levels || []).filter((l) => l.id !== item.id) };
      }
      if (type === 'subject') {
        return {
          ...t,
          levels: (t.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            return { ...lvl, subjects: (lvl.subjects || []).filter((s) => s.id !== item.id) };
          }),
        };
      }
      if (type === 'topic') {
        return {
          ...t,
          levels: (t.levels || []).map((lvl) => {
            if (lvl.id !== levelId) return lvl;
            return {
              ...lvl,
              subjects: (lvl.subjects || []).map((sub) => {
                if (sub.id !== subjectId) return sub;
                return { ...sub, topics: (sub.topics || []).filter((top) => top.id !== item.id) };
              }),
            };
          }),
        };
      }
      return t;
    });

    setDeleteConfirm(null);
    showToast(`Soft-deleted ${type} to Master Recycle Bin`, 'info');
  };

  return (
    <AppLayout pageTitle={`Admin: ${template.title || template.name}`}>
      <Breadcrumbs
        items={[
          { label: 'Admin Portal', to: '/admin' },
          { label: template.title || template.name },
        ]}
      />
      <PageHeader
        title={`Master Curriculum: ${template.title || template.name}`}
        subtitle={`Version ${template.version || '1.0.0'} • ${template.levels?.length || 0} Levels • Managed Master Content`}
        actions={
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <button onClick={() => navigate('/admin')} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              Admin Portal
            </button>
            <button
              onClick={() => setVersionModal({ open: true, version: String(template.version || '1.0.0'), notes: '' })}
              className="btn-secondary text-xs"
            >
              Set Version ({template.version || '1.0.0'})
            </button>
            <button onClick={handleExportJSON} className="btn-primary text-xs flex items-center gap-1.5 shadow-xs">
              <Download className="w-3.5 h-3.5" />
              Export JSON Schema
            </button>
          </div>
        }
      />

      {/* Curriculum Levels Tree */}
      <div className="space-y-4">
        {(template.levels || []).map((lvl, lIdx) => {
          const isExpanded = !!expandedLevels[lvl.id];

          return (
            <div key={lvl.id} className="card overflow-hidden border border-gray-200 dark:border-gray-700/80">
              {/* Level Header */}
              <div className="p-3.5 sm:p-4 bg-gray-50/70 dark:bg-gray-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <button
                    onClick={() => toggleLevel(lvl.id)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <span className="badge bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-mono text-xs">
                    {lvl.id}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{lvl.title}</h3>
                  <span className="text-xs text-gray-400">({lvl.subjects?.length || 0} subjects)</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleReorder('level', null, null, lvl.id, 'up')}
                    disabled={lIdx === 0}
                    className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleReorder('level', null, null, lvl.id, 'down')}
                    disabled={lIdx === (template.levels || []).length - 1}
                    className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLevelModal({ open: true, isEdit: true, level: lvl })}
                    className="btn-secondary text-[11px] py-1 px-2.5"
                    title="Edit Level"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setSubjectModal({ open: true, isEdit: false, levelId: lvl.id, subject: null })}
                    className="btn-secondary text-[11px] py-1 px-2.5"
                  >
                    <Plus className="w-3 h-3" />
                    Subject
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ type: 'level', item: lvl })}
                    className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Delete Level"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subjects & Topics List */}
              {isExpanded && (
                <div className="p-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
                  {(lvl.subjects || []).map((sub, sIdx) => (
                    <div key={sub.id} className="rounded-xl border border-gray-200 dark:border-gray-700/80 p-4 space-y-3 bg-white dark:bg-gray-800/40">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{sub.title}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleReorder('subject', lvl.id, null, sub.id, 'up')}
                            disabled={sIdx === 0}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30"
                          >
                            <MoveUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleReorder('subject', lvl.id, null, sub.id, 'down')}
                            disabled={sIdx === (lvl.subjects || []).length - 1}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30"
                          >
                            <MoveDown className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setSubjectModal({ open: true, isEdit: true, levelId: lvl.id, subject: sub })}
                            className="btn-secondary text-[10px] py-1 px-2"
                            title="Edit Subject"
                          >
                            <Edit2 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => setTopicModal({ open: true, isEdit: false, levelId: lvl.id, subjectId: sub.id, topic: null })}
                            className="btn-secondary text-[10px] py-1 px-2"
                          >
                            <Plus className="w-3 h-3" />
                            Topic
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'subject', item: sub, levelId: lvl.id })}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="space-y-2 pl-3 border-l-2 border-indigo-100 dark:border-indigo-900/40">
                        {(sub.topics || []).map((topic, tIdx) => (
                          <div
                            key={topic.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 text-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                              <div className="min-w-0">
                                <div className="font-bold text-gray-900 dark:text-gray-100 truncate">
                                  {topic.title}
                                </div>
                                <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                                  <span className="badge text-[9px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                    {topic.priority || 'core'}
                                  </span>
                                  <span>{topic.learningItems?.length || topic.subtopics?.length || 0} subtopics</span>
                                  <span>•</span>
                                  <span>{topic.practice?.length || 0} practice</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleReorder('topic', lvl.id, sub.id, topic.id, 'up')}
                                disabled={tIdx === 0}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleReorder('topic', lvl.id, sub.id, topic.id, 'down')}
                                disabled={tIdx === (sub.topics || []).length - 1}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setTopicModal({ open: true, isEdit: true, levelId: lvl.id, subjectId: sub.id, topic })}
                                className="btn-secondary text-[10px] py-1 px-2"
                                title="Edit Topic Details"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'topic', item: topic, levelId: lvl.id, subjectId: sub.id })}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={() => setLevelModal({ open: true, isEdit: false, level: null })}
          className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Master Curriculum Level
        </button>
      </div>

      {/* Level Modal */}
      {levelModal.open && (
        <LevelModal
          isOpen={levelModal.open}
          onClose={() => setLevelModal({ open: false, isEdit: false, level: null })}
          onSave={handleSaveLevel}
          initial={levelModal.level}
        />
      )}

      {/* Subject Modal */}
      {subjectModal.open && (
        <SubjectModal
          isOpen={subjectModal.open}
          onClose={() => setSubjectModal({ open: false, isEdit: false, levelId: null, subject: null })}
          onSave={handleSaveSubject}
          initial={subjectModal.subject}
        />
      )}

      {/* Topic Modal */}
      {topicModal.open && (
        <TopicModal
          isOpen={topicModal.open}
          onClose={() => setTopicModal({ open: false, isEdit: false, levelId: null, subjectId: null, topic: null })}
          onSave={handleSaveTopic}
          initial={topicModal.topic}
        />
      )}

      {/* Version Modal */}
      {versionModal.open && (
        <Modal
          isOpen={versionModal.open}
          onClose={() => setVersionModal({ open: false, version: '', notes: '' })}
          title="Update Master Template Version"
          size="sm"
        >
          <form onSubmit={handleSaveVersion} className="space-y-4">
            <div>
              <label className="label">
                Semantic Version <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={versionModal.version}
                onChange={(e) => setVersionModal({ ...versionModal, version: e.target.value })}
                placeholder="e.g. 1.1.0, 2.0.0"
                className="input"
                autoFocus
              />
            </div>

            <div>
              <label className="label">Changelog Summary (Optional)</label>
              <textarea
                value={versionModal.notes}
                onChange={(e) => setVersionModal({ ...versionModal, notes: e.target.value })}
                placeholder="e.g. Added SAP Event Mesh deep dive, upgraded OData V4 modules..."
                rows={3}
                className="input"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setVersionModal({ open: false, version: '', notes: '' })}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs" disabled={!versionModal.version.trim()}>
                Save Version
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card p-6 max-w-md w-full shadow-2xl border-red-100 dark:border-red-900/30 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Delete Master {deleteConfirm.type}?
                </h3>
                <p className="text-xs text-gray-500">Will be moved to Master Content Recycle Bin.</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              Are you sure you want to delete <span className="font-bold">"{deleteConfirm.item?.title}"</span> from the master template? Existing user journeys will NOT be affected.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Soft-Delete to Recycle Bin
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function LevelModal({ isOpen, onClose, onSave, initial = null }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [estimatedHours, setEstimatedHours] = useState(initial?.estimatedHours || 20);
  const [color, setColor] = useState(initial?.color || 'indigo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      estimatedHours: Number(estimatedHours) || 20,
      color,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Master Level' : 'Add Master Level'}
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
            placeholder="e.g. Level 1 — Core Enterprise Architecture"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Level summary and objectives..."
            rows={2}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Estimated Hours</label>
            <input
              type="number"
              min="1"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="label">Color Accent</label>
            <div className="flex gap-2 flex-wrap pt-1">
              {LEVEL_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={`w-6 h-6 rounded-full ${c.bg} flex items-center justify-center transition-all ${
                    color === c.id ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
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
            placeholder="e.g. Message Transformation & Mappings"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Subject domain overview..."
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

  // Subtopics / Learning Items
  const rawSubtopics = (initial?.learningItems && initial.learningItems.length > 0)
    ? initial.learningItems.map((i) => i.title || i)
    : (initial?.subtopics || []);
  const [subtopicsText, setSubtopicsText] = useState(rawSubtopics.join('\n'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedSubtopics = subtopicsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((stTitle, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        title: stTitle,
        type: idx % 2 === 0 ? 'concept' : 'implementation',
      }));

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      estimatedHours: Number(estimatedHours) || 4,
      tags,
      learningItems: parsedSubtopics.length > 0 ? parsedSubtopics : [
        { id: `item-${Date.now()}-1`, title: 'Core Conceptual Overview', type: 'concept' }
      ],
      subtopics: parsedSubtopics.map((i) => i.title),
      practice: initial?.practice || [
        { id: generateId('prac'), title: `Hands-on Lab: ${title.trim()}`, difficulty: 'medium', type: 'coding', aiMode: 'ai-restricted' }
      ],
      debugging: initial?.debugging || [
        { id: generateId('dbg'), title: `Troubleshoot Edge Case in ${title.trim()}`, errorType: 'runtime', difficulty: 'medium' }
      ],
      assessments: initial?.assessments || [
        { id: generateId('assess'), question: `Explain core principles and best practices for ${title.trim()}.`, difficulty: 'medium', type: 'interview' }
      ],
      resources: initial?.resources || [],
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? 'Edit Master Topic' : 'Add Master Topic'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div>
          <label className="label">
            Topic Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Graphical Message Mapping & Context Queues"
            className="input"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed learning objectives and topic context..."
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
              className="select capitalize"
            >
              {TOPIC_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Estimated Study Hours</label>
            <input
              type="number"
              min="1"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Technologies & Tags (comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. CPI, Groovy, XML, XSLT"
            className="input"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label mb-0">Detailed Subtopics (1 per line)</label>
            <span className="text-[11px] text-gray-400">
              {subtopicsText.split('\n').filter((s) => s.trim()).length} subtopics
            </span>
          </div>
          <textarea
            value={subtopicsText}
            onChange={(e) => setSubtopicsText(e.target.value)}
            placeholder="Enter each concept or subtopic on a new line:&#10;Understanding Context Queues&#10;Node Functions (createIf, removeContexts)&#10;User-Defined Functions (UDFs) in Groovy"
            rows={5}
            className="input font-mono text-xs leading-relaxed"
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
