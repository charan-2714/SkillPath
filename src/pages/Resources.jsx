// src/pages/Resources.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Library,
  ExternalLink,
  Plus,
  CheckCircle,
  Circle,
  Trash2,
  Edit2,
  BookOpen,
  Filter,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useJourney } from '../hooks/useJourney';
import { useAppState } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { RESOURCE_TYPES } from '../models/journeySchema';

const TYPE_COLORS = {
  Documentation: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
  Video: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
  Course: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
  Article: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  Book: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  GitHub: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
  Practice: 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

export default function Resources() {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeJourney } = useAppState();
  const { journey, addResource, updateResource, deleteResource } = useJourney(activeJourney?.id);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'completed', 'uncompleted'

  const [resourceModal, setResourceModal] = useState({
    open: false,
    initial: null,
    topicId: '',
    title: '',
    url: '',
    type: 'Documentation',
    description: '',
  });

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, topicId: '', resourceId: '' });

  // Gather all topics in active journey for topic selector
  const topicsList = useMemo(() => {
    if (!journey || !journey.levels) return [];
    return journey.levels.flatMap((lvl) =>
      (lvl.subjects || []).flatMap((sub) =>
        (sub.topics || []).map((top) => ({
          id: top.id,
          title: top.title,
          levelTitle: lvl.title,
        }))
      )
    );
  }, [journey]);

  // Gather all resources across active journey
  const allResources = useMemo(() => {
    if (!journey || !journey.levels) return [];
    const items = [];
    journey.levels.forEach((lvl) => {
      (lvl.subjects || []).forEach((sub) => {
        (sub.topics || []).forEach((top) => {
          (top.resources || []).forEach((r) => {
            items.push({
              ...r,
              topicId: top.id,
              topicTitle: top.title,
              levelTitle: lvl.title,
              subjectTitle: sub.title,
            });
          });
        });
      });
    });
    return items;
  }, [journey]);

  const filteredResources = useMemo(() => {
    return allResources.filter((r) => {
      if (typeFilter !== 'All' && r.type !== typeFilter) return false;
      if (statusFilter === 'completed' && !r.completed) return false;
      if (statusFilter === 'uncompleted' && r.completed) return false;

      if (search) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.url?.toLowerCase().includes(q) ||
          r.topicTitle?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allResources, typeFilter, statusFilter, search]);

  const completedCount = allResources.filter((r) => r.completed).length;

  const handleSaveResource = (e) => {
    e.preventDefault();
    if (!resourceModal.title.trim() || !resourceModal.url.trim()) return;

    const targetTopicId = resourceModal.topicId || topicsList[0]?.id;
    if (!targetTopicId) {
      toast('Please create at least one topic first', 'error');
      return;
    }

    if (resourceModal.initial) {
      updateResource(resourceModal.initial.topicId, resourceModal.initial.id, {
        title: resourceModal.title.trim(),
        url: resourceModal.url.trim(),
        type: resourceModal.type,
        description: resourceModal.description.trim(),
      });
      toast('Resource updated', 'success');
    } else {
      addResource(targetTopicId, {
        title: resourceModal.title.trim(),
        url: resourceModal.url.trim(),
        type: resourceModal.type,
        description: resourceModal.description.trim(),
        completed: false,
      });
      toast('Resource added', 'success');
    }

    setResourceModal({ open: false, initial: null, topicId: '', title: '', url: '', type: 'Documentation', description: '' });
  };

  const handleToggleCompleted = (topicId, resourceId, current) => {
    updateResource(topicId, resourceId, { completed: !current });
  };

  if (!journey) {
    return (
      <AppLayout pageTitle="Resources">
        <EmptyState
          icon="inbox"
          title="No Active Journey Selected"
          description="Create or choose a learning journey to view and manage its resource links."
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
    <AppLayout pageTitle="Resources">
      <PageHeader
        title="Learning Resources & Documentation"
        subtitle={`Curated articles, courses, documentation, and videos for ${journey.name}. (${completedCount} of ${allResources.length} completed)`}
        actions={
          <button
            onClick={() =>
              setResourceModal({
                open: true,
                initial: null,
                topicId: topicsList[0]?.id || '',
                title: '',
                url: '',
                type: 'Documentation',
                description: '',
              })
            }
            className="btn-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Resource
          </button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search resources by title, url, or topic..."
          className="flex-1"
        />

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input text-xs w-full sm:w-auto"
          >
            <option value="All">All Types</option>
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input text-xs w-full sm:w-auto"
          >
            <option value="All">All Status</option>
            <option value="uncompleted">To Read / Watch</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => {
            const badgeClass = TYPE_COLORS[res.type] || TYPE_COLORS.Other;

            return (
              <div
                key={res.id}
                className="card p-4 flex items-start justify-between gap-3 hover:shadow-card-md transition-all"
              >
                <button
                  type="button"
                  onClick={() => handleToggleCompleted(res.topicId, res.id, res.completed)}
                  className="mt-1 flex-shrink-0"
                  aria-label={res.completed ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {res.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-indigo-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`badge text-[10px] font-semibold ${badgeClass}`}>
                      {res.type}
                    </span>
                    <button
                      onClick={() =>
                        navigate(`/journeys/${journey.id}/topics/${res.topicId}`)
                      }
                      className="text-[11px] text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[200px]"
                    >
                      {res.topicTitle}
                    </button>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-bold flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 truncate ${
                      res.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <span className="truncate">{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                  </a>

                  {res.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {res.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() =>
                      setResourceModal({
                        open: true,
                        initial: res,
                        topicId: res.topicId,
                        title: res.title,
                        url: res.url,
                        type: res.type || 'Documentation',
                        description: res.description || '',
                      })
                    }
                    className="btn-ghost p-1.5 text-gray-400 hover:text-indigo-600"
                    title="Edit Resource"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteConfirm({
                        open: true,
                        topicId: res.topicId,
                        resourceId: res.id,
                      })
                    }
                    className="btn-ghost p-1.5 text-gray-400 hover:text-red-500"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="book"
          title={allResources.length === 0 ? 'No resources saved yet' : 'No matching resources'}
          description={
            allResources.length === 0
              ? 'Save documentation, courses, articles, or videos to reference during your learning.'
              : 'Try changing your search query or type filter.'
          }
          action={
            allResources.length === 0 ? (
              <button
                onClick={() =>
                  setResourceModal({
                    open: true,
                    initial: null,
                    topicId: topicsList[0]?.id || '',
                    title: '',
                    url: '',
                    type: 'Documentation',
                    description: '',
                  })
                }
                className="btn-primary text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Resource
              </button>
            ) : (
              <button
                onClick={() => {
                  setSearch('');
                  setTypeFilter('All');
                  setStatusFilter('All');
                }}
                className="btn-secondary text-xs"
              >
                Clear Filters
              </button>
            )
          }
        />
      )}

      {/* Add / Edit Resource Modal */}
      <Modal
        isOpen={resourceModal.open}
        onClose={() => setResourceModal({ ...resourceModal, open: false })}
        title={resourceModal.initial ? 'Edit Resource' : 'Add New Resource'}
        size="md"
      >
        <form onSubmit={handleSaveResource} className="space-y-4">
          <div>
            <label className="label">
              Associated Topic <span className="text-red-500">*</span>
            </label>
            <select
              value={resourceModal.topicId}
              onChange={(e) => setResourceModal({ ...resourceModal, topicId: e.target.value })}
              className="input"
              required
            >
              {topicsList.map((top) => (
                <option key={top.id} value={top.id}>
                  {top.levelTitle} → {top.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={resourceModal.title}
              onChange={(e) => setResourceModal({ ...resourceModal, title: e.target.value })}
              placeholder="e.g. Official Documentation Guide"
              className="input"
              autoFocus
            />
          </div>

          <div>
            <label className="label">
              URL Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={resourceModal.url}
              onChange={(e) => setResourceModal({ ...resourceModal, url: e.target.value })}
              placeholder="https://..."
              className="input"
            />
          </div>

          <div>
            <label className="label">Type</label>
            <select
              value={resourceModal.type}
              onChange={(e) => setResourceModal({ ...resourceModal, type: e.target.value })}
              className="input"
            >
              {RESOURCE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Description (Optional)</label>
            <input
              type="text"
              value={resourceModal.description}
              onChange={(e) => setResourceModal({ ...resourceModal, description: e.target.value })}
              placeholder="Key takeaways or summary..."
              className="input"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setResourceModal({ ...resourceModal, open: false })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs" disabled={!resourceModal.title.trim()}>
              Save Resource
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, topicId: '', resourceId: '' })}
        onConfirm={() => {
          if (deleteConfirm.topicId && deleteConfirm.resourceId) {
            deleteResource(deleteConfirm.topicId, deleteConfirm.resourceId);
            setDeleteConfirm({ open: false, topicId: '', resourceId: '' });
            toast('Resource deleted', 'info');
          }
        }}
        title="Delete Resource"
        message="Are you sure you want to remove this resource link?"
        confirmLabel="Delete"
        danger
      />
    </AppLayout>
  );
}
