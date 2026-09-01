// src/pages/AdminRecycleBin.jsx
// Master Content Recycle Bin for administrator template deletions

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, RotateCcw, ArrowLeft, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminRecycleBin() {
  const { adminRecycleBin, restoreMasterTemplateItem, permanentDeleteMasterTemplateItem } = useAppState();
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (!isAdmin) {
    return (
      <AppLayout pageTitle="Admin Required">
        <div className="card p-8 text-center max-w-md mx-auto mt-8">
          <p className="text-sm text-gray-600">Admin authorization required.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary text-xs mt-4">
            Dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleRestore = (item) => {
    restoreMasterTemplateItem(item.id);
    showToast(`Restored master ${item.itemType} "${item.title}"`, 'success');
  };

  const handlePermanentDelete = (itemId) => {
    permanentDeleteMasterTemplateItem(itemId);
    setDeleteConfirm(null);
    showToast('Master item permanently deleted.', 'info');
  };

  return (
    <AppLayout pageTitle="Master Content Recycle Bin">
      <Breadcrumbs
        items={[
          { label: 'Admin Portal', to: '/admin' },
          { label: 'Master Content Recycle Bin' },
        ]}
      />
      <PageHeader
        title="Master Content Recycle Bin"
        subtitle="Soft-deleted master role levels, subjects, and topics. Restoring re-integrates them into master templates."
        actions={
          <button onClick={() => navigate('/admin')} className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Admin Portal
          </button>
        }
      />

      {adminRecycleBin.length > 0 ? (
        <div className="card divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden shadow-sm">
          {adminRecycleBin.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] uppercase font-bold">
                    {item.itemType}
                  </span>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                    Template: {item.templateId}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deleted at {new Date(item.deletedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleRestore(item)}
                  className="btn-secondary text-xs text-indigo-600 dark:text-indigo-400"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore
                </button>
                <button
                  onClick={() => setDeleteConfirm(item)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-12">
          <EmptyState
            icon="trash"
            title="Master Content Recycle Bin is Empty"
            description="No deleted curriculum items in the master recycle bin."
          />
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card p-6 max-w-md w-full shadow-2xl border-red-100 dark:border-red-900/30 space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Permanently Delete Master Content?</h3>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              Permanently delete "{deleteConfirm.title}" from the master archive?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button
                onClick={() => handlePermanentDelete(deleteConfirm.id)}
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
