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
  BookOpen,
  Filter,
  Upload,
  FileUp,
  Film,
  Download,
  File,
  Video,
  Check,
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
    mode: 'url', // 'url' | 'upload'
    initial: null,
    topicId: '',
    title: '',
    url: '',
    fileName: '',
    fileSize: '',
    fileType: '',
    fileData: '',
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
    if (!resourceModal.title.trim()) {
      toast('Please enter a title', 'error');
      return;
    }

    const finalUrl = resourceModal.mode === 'upload' ? resourceModal.fileData : resourceModal.url.trim();

    const targetTopicId = resourceModal.topicId || topicsList[0]?.id;
    if (!targetTopicId) {
      toast('Please create at least one topic first', 'error');
      return;
    }

    if (resourceModal.initial) {
      updateResource(resourceModal.initial.topicId, resourceModal.initial.id, {
        title: resourceModal.title.trim(),
        url: finalUrl || '',
        type: resourceModal.type,
        description: resourceModal.description.trim(),
        fileName: resourceModal.fileName || '',
        fileSize: resourceModal.fileSize || '',
        isFileUpload: resourceModal.mode === 'upload' && Boolean(resourceModal.fileData),
      });
      toast('Resource updated', 'success');
    } else {
      addResource(targetTopicId, {
        title: resourceModal.title.trim(),
        url: finalUrl || '',
        type: resourceModal.type,
        description: resourceModal.description.trim(),
        fileName: resourceModal.fileName || '',
        fileSize: resourceModal.fileSize || '',
        isFileUpload: resourceModal.mode === 'upload' && Boolean(resourceModal.fileData),
        completed: false,
      });
      toast('Resource added', 'success');
    }

    setResourceModal({
      open: false,
      mode: 'url',
      initial: null,
      topicId: '',
      title: '',
      url: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      fileData: '',
      type: 'Documentation',
      description: '',
    });
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
                mode: 'url',
                initial: null,
                topicId: topicsList[0]?.id || '',
                title: '',
                url: '',
                fileName: '',
                fileSize: '',
                fileType: '',
                fileData: '',
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
            const isUploaded = Boolean(res.isFileUpload || res.fileData || (res.url && res.url.startsWith('data:')));
            const isVideo = res.type === 'Video' || (res.url && (res.url.includes('youtube.com') || res.url.includes('youtu.be') || res.url.includes('vimeo') || res.url.endsWith('.mp4')));

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
                    {isUploaded && (
                      <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-[10px] font-semibold flex items-center gap-1">
                        <FileUp className="w-2.5 h-2.5" /> Uploaded File
                      </span>
                    )}
                    {isVideo && (
                      <span className="badge bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-[10px] font-semibold flex items-center gap-1">
                        <Film className="w-2.5 h-2.5" /> Video
                      </span>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/journeys/${journey.id}/topics/${res.topicId}`)
                      }
                      className="text-[11px] text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[200px]"
                    >
                      {res.topicTitle}
                    </button>
                    {res.fileSize && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        ({res.fileSize})
                      </span>
                    )}
                  </div>

                  {isUploaded ? (
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                        <File className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{res.title}</span>
                      </h4>
                      {res.fileName && (
                        <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-0.5 truncate">
                          📎 {res.fileName}
                        </p>
                      )}
                    </div>
                  ) : (
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
                  )}

                  {res.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {res.description}
                    </p>
                  )}

                  {isUploaded && (
                    <div className="flex items-center gap-3 pt-2 mt-1">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Preview File</span>
                      </a>
                      <a
                        href={res.url}
                        download={res.fileName || `${res.title}.pdf`}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
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
                    mode: 'url',
                    initial: null,
                    topicId: topicsList[0]?.id || '',
                    title: '',
                    url: '',
                    fileName: '',
                    fileSize: '',
                    fileType: '',
                    fileData: '',
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
        {(() => {
          const isUpload = resourceModal.mode === 'upload';
          const isUrl = !isUpload;

          return (
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

              {/* Mode Switch Tabs with clear high-contrast active styling */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1.5 border border-gray-200 dark:border-gray-700 gap-1.5">
                <button
                  type="button"
                  onClick={() => setResourceModal((prev) => ({ ...prev, mode: 'url' }))}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isUrl
                      ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-400/40'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Web Link or Video URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResourceModal((prev) => ({ ...prev, mode: 'upload' }))}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isUpload
                      ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/40'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/60'
                  }`}
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Upload Document / Video / PDF</span>
                </button>
              </div>

              {isUpload ? (
            <div>
              <label className="label">Choose File (PDF, Video, Cheatsheet, Code, Image) *</label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-gray-900/40 relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,.json,.py,.js,.jsx,.ts,.tsx,.zip,.png,.jpg,.jpeg,.gif,.svg,.mp4,.webm,.mov"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
                    const sizeText = file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;

                    let detectedType = 'Documentation';
                    if (file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
                      detectedType = 'Video';
                    } else if (file.name.endsWith('.pdf')) {
                      detectedType = 'Documentation';
                    } else if (file.type.includes('image')) {
                      detectedType = 'Other';
                    } else if (file.name.endsWith('.zip') || file.name.endsWith('.py') || file.name.endsWith('.js')) {
                      detectedType = 'Practice';
                    }

                    const reader = new FileReader();
                    reader.onload = (uploadEvt) => {
                      const base64Data = uploadEvt.target?.result;
                      setResourceModal((prev) => ({
                        ...prev,
                        title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, ''),
                        fileName: file.name,
                        fileSize: sizeText,
                        fileType: file.type || 'application/octet-stream',
                        fileData: base64Data,
                        type: detectedType,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  {resourceModal.fileName ? (
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate max-w-[280px]">
                        {resourceModal.fileName}
                      </p>
                      <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                        {resourceModal.fileSize} • Ready to save
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Click to browse or drag & drop file
                      </p>
                      <p className="text-[10px] text-gray-400">
                        PDFs, Video clips (MP4), Cheatsheets, Code, Diagrams
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="label">Web URL or Video Link (Optional)</label>
              <input
                type="url"
                value={resourceModal.url}
                onChange={(e) => {
                  const val = e.target.value;
                  let autoType = resourceModal.type;
                  if (val.includes('youtube.com') || val.includes('youtu.be') || val.includes('vimeo')) {
                    autoType = 'Video';
                  } else if (val.includes('github.com')) {
                    autoType = 'GitHub';
                  }
                  setResourceModal({ ...resourceModal, url: val, type: autoType });
                }}
                placeholder="https://docs.python.org/... or https://youtube.com/..."
                className="input"
              />
            </div>
          )}

          <div>
            <label className="label">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={resourceModal.title}
              onChange={(e) => setResourceModal({ ...resourceModal, title: e.target.value })}
              placeholder={resourceModal.mode === 'upload' ? 'e.g. Chapter 3 Summary Notes PDF' : 'e.g. Official Documentation Guide, Book Title'}
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
            <button type="submit" className="btn-primary text-xs flex items-center gap-1.5" disabled={!resourceModal.title.trim()}>
              <Check className="w-3.5 h-3.5" /> Save Resource
            </button>
          </div>
        </form>
      );
    })()}
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
