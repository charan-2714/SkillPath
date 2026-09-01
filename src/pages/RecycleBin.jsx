// src/pages/RecycleBin.jsx
// User Recycle Bin for soft-deleted items with restoration and permanent deletion

import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, Filter, Clock, Folder, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

const TYPE_ICONS = {
  journey: Folder,
  level: Layers,
  subject: BookOpen,
  topic: BookOpen,
  project: CheckCircle,
};

const TYPE_COLORS = {
  journey: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  level: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  subject: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  topic: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  project: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function RecycleBin() {
  const { state, dispatch } = useAppState();
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState('All');
  const [confirmModal, setConfirmModal] = useState(null);

  const items = state.recycleBin || [];

  const filteredItems = items.filter((item) => {
    if (filterType === 'All') return true;
    return item.itemType === filterType;
  });

  const handleRestore = (item) => {
    dispatch({
      type: ACTIONS.RESTORE_ITEM,
      payload: { itemId: item.id },
    });
    showToast(`Restored "${item.title}" successfully!`, 'success');
  };

  const handlePermanentDelete = (itemId) => {
    dispatch({
      type: ACTIONS.PERMANENT_DELETE_ITEM,
      payload: itemId,
    });
    setConfirmModal(null);
    showToast('Item permanently deleted.', 'info');
  };

  const handleEmptyRecycleBin = () => {
    dispatch({
      type: ACTIONS.EMPTY_RECYCLE_BIN,
    });
    setConfirmModal(null);
    showToast('Recycle bin emptied.', 'info');
  };

  return (
    <AppLayout pageTitle="Recycle Bin">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Recycle Bin' },
        ]}
      />
      <PageHeader
        title="Recycle Bin"
        subtitle="Soft-deleted journeys, levels, topics, and projects. Restore items back to their original hierarchy or delete them permanently."
        actions={
          items.length > 0 && (
            <button
              onClick={() => setConfirmModal({ type: 'empty' })}
              className="btn-secondary text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Empty Recycle Bin
            </button>
          )
        }
      />

      {/* Filter Tabs */}
      {items.length > 0 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {['All', 'journey', 'level', 'subject', 'topic', 'project'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterType === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              {t === 'All' ? 'All Items' : `${t}s`}
            </button>
          ))}
        </div>
      )}

      {/* Items List */}
      {filteredItems.length > 0 ? (
        <div className="card divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden shadow-sm">
          {filteredItems.map((item) => {
            const Icon = TYPE_ICONS[item.itemType] || BookOpen;
            const colorClass = TYPE_COLORS[item.itemType] || 'bg-gray-100 text-gray-700';

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge text-[10px] font-bold uppercase tracking-wider ${colorClass}`}>
                        {item.itemType}
                      </span>
                      {item.originalJourneyName && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Journey: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.originalJourneyName}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400 dark:text-gray-500 mt-1 flex-wrap">
                      {item.originalLevelTitle && (
                        <span className="truncate max-w-[200px]">Path: {item.originalLevelTitle} {item.originalSubjectTitle ? `› ${item.originalSubjectTitle}` : ''}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        Deleted {new Date(item.deletedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleRestore(item)}
                    className="btn-secondary text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    title="Restore to original hierarchy"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restore
                  </button>

                  <button
                    onClick={() => setConfirmModal({ type: 'single', item })}
                    className="p-2 rounded-lg border border-transparent text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-12">
          <EmptyState
            icon="trash"
            title="Recycle Bin is Empty"
            description="When you delete journeys, levels, topics, or projects, they safely move here instead of being lost permanently."
          />
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card p-6 max-w-md w-full shadow-2xl border-red-100 dark:border-red-900/30 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {confirmModal.type === 'empty' ? 'Empty Recycle Bin?' : 'Delete Permanently?'}
                </h3>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              {confirmModal.type === 'empty'
                ? 'All items currently in the Recycle Bin will be permanently removed from your account and cloud storage.'
                : `Are you sure you want to permanently delete "${confirmModal.item?.title}"?`}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setConfirmModal(null)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button
                onClick={() =>
                  confirmModal.type === 'empty'
                    ? handleEmptyRecycleBin()
                    : handlePermanentDelete(confirmModal.item?.id)
                }
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
