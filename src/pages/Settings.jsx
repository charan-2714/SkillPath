// src/pages/Settings.jsx
// Unified Settings Hub: Appearance, Recycle Bin, Data Backup / Restore, and System Information

import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Settings as SettingsIcon,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Database,
  Layers,
  BookOpen,
  Folder,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { ConfirmDialog, Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { exportBackup, importBackup, resetAllData } from '../services/storageService';

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

function SettingRow({ label, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div>
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</div>
        {description && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { state, dispatch } = useAppState();
  const { showToast } = useToast();
  const settings = state.settings || {};

  const [activeTab, setActiveTab] = useState('appearance'); // 'appearance' | 'recycle-bin' | 'backup' | 'about'
  const [resetOpen, setResetOpen] = useState(false);
  const [importError, setImportError] = useState('');
  const [recycleFilter, setRecycleFilter] = useState('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [emptyRecycleOpen, setEmptyRecycleOpen] = useState(false);

  const recycleItems = state.recycleBin || [];

  const filteredRecycleItems = recycleItems.filter((item) => {
    if (recycleFilter === 'All') return true;
    return item.itemType === recycleFilter;
  });

  const updateSetting = (key, value) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: { [key]: value } });
    if (key === 'theme') {
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
    showToast('Preferences updated', 'success');
  };

  const handleExport = () => {
    exportBackup(state);
    showToast('Backup downloaded (skillpath-backup.json)', 'success');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importBackup(ev.target.result);
      if (result.success) {
        dispatch({ type: ACTIONS.IMPORT_STATE, payload: result.data });
        showToast('Data imported successfully!', 'success');
        setImportError('');
      } else {
        setImportError(result.error);
        showToast('Import failed: ' + result.error, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    const fresh = resetAllData();
    dispatch({ type: ACTIONS.RESET_STATE, payload: fresh });
    showToast('All local data reset to defaults', 'info');
    document.documentElement.classList.remove('dark');
    setResetOpen(false);
  };

  const handleRestoreRecycle = (item) => {
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
    setConfirmDeleteId(null);
    showToast('Item permanently deleted.', 'info');
  };

  const handleEmptyRecycleBin = () => {
    dispatch({
      type: ACTIONS.EMPTY_RECYCLE_BIN,
    });
    setEmptyRecycleOpen(false);
    showToast('Recycle bin emptied.', 'info');
  };

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <AppLayout pageTitle="Settings">
      <PageHeader
        title="Settings & Data Management"
        subtitle="Manage theme preferences, recover soft-deleted items, and export/import JSON backups."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'appearance'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          Preferences & Theme
        </button>

        <button
          onClick={() => setActiveTab('recycle-bin')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'recycle-bin'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Recycle Bin ({recycleItems.length})
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'backup'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Data Backup & Portability
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'about'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 hover:text-indigo-600 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          About SkillPath
        </button>
      </div>

      {/* TAB 1: APPEARANCE & PREFERENCES */}
      {activeTab === 'appearance' && (
        <div className="card p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Interface Appearance
          </h3>

          <SettingRow label="Theme" description="Switch between Light and Dark display mode">
            <div className="flex gap-2">
              {themes.map((t) => {
                const Icon = t.icon;
                const isSelected = settings.theme === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => updateSetting('theme', t.value)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </SettingRow>

          <SettingRow
            label="Auto-Save Solutions"
            description="Automatically save DSA notebook code drafts to local storage"
          >
            <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs">
              Always Enabled
            </span>
          </SettingRow>
        </div>
      )}

      {/* TAB 2: RECYCLE BIN */}
      {activeTab === 'recycle-bin' && (
        <div className="space-y-4">
          <div className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Soft-Deleted Items
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Items deleted from your roadmaps are preserved here. You can restore them to their original hierarchy or remove them permanently.
              </p>
            </div>

            {recycleItems.length > 0 && (
              <button
                type="button"
                onClick={() => setEmptyRecycleOpen(true)}
                className="btn-secondary text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Empty Recycle Bin
              </button>
            )}
          </div>

          {recycleItems.length > 0 ? (
            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {['All', 'journey', 'level', 'subject', 'topic', 'project'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setRecycleFilter(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      recycleFilter === t
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredRecycleItems.map((item) => {
                  const Icon = TYPE_ICONS[item.itemType] || Folder;
                  const colorStyle = TYPE_COLORS[item.itemType] || TYPE_COLORS.topic;

                  return (
                    <div
                      key={item.id}
                      className="card p-4 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${colorStyle}`}>
                            {item.itemType}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(item.deletedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-gray-500" />
                          {item.title}
                        </h4>

                        {item.parentPath && (
                          <p className="text-[10px] text-gray-400 mt-1 truncate">
                            Location: {item.parentPath}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <button
                          type="button"
                          onClick={() => handleRestoreRecycle(item)}
                          className="btn-primary text-xs py-1 px-2.5 flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500"
                          title="Permanently Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center text-gray-400 text-xs">
              Recycle bin is empty. Soft-deleted roadmaps and topics will appear here.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DATA BACKUP & PORTABILITY */}
      {activeTab === 'backup' && (
        <div className="space-y-4">
          <div className="card p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Data Backup & Portability
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Export your complete user profile, customized roadmaps, notes, and study logs into a single portable JSON backup file.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-gray-100">
                  <Download className="w-4 h-4 text-indigo-500" />
                  Export Complete Backup
                </div>
                <p className="text-[11px] text-gray-500">
                  Downloads a comprehensive `skillpath-backup.json` containing all your journeys, notes, ratings, and logs.
                </p>
                <button
                  type="button"
                  onClick={handleExport}
                  className="btn-primary text-xs w-full justify-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Backup JSON
                </button>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-gray-100">
                  <Upload className="w-4 h-4 text-emerald-500" />
                  Restore from Backup
                </div>
                <p className="text-[11px] text-gray-500">
                  Restore previously exported SkillPath data. Replaces current workspace records after schema validation.
                </p>
                <label className="btn-secondary text-xs w-full justify-center cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  Select Backup File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {importError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs">
                {importError}
              </div>
            )}
          </div>

          <div className="card p-6 border-red-100 dark:border-red-950/40 space-y-3">
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400">
              Reset Local Workspace
            </h3>
            <p className="text-xs text-gray-500">
              Clears all local journey progress, study logs, and custom topics, resetting your workspace to initial templates.
            </p>
            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className="btn-secondary text-xs text-red-600 hover:bg-red-50 border-red-200"
            >
              Reset All Local Data
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ABOUT */}
      {activeTab === 'about' && (
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">
              SP
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                SkillPath Learning Engine
              </h3>
              <p className="text-xs text-gray-400 font-mono">v1.2.0 • Production Build</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            SkillPath is an engineering roadmap, algorithmic problem solving, and technical mastery platform. It features deep-cloned role templates, DSA/LeetCode multi-version notebooks, and real-time Cloud Firestore synchronization.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Framework</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">React 19 + Vite</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Database</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">Cloud Firestore</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Auth Provider</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">Firebase Google Auth</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Curriculum Roles</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">30+ Master Templates</span>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDeleteId && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={() => handlePermanentDelete(confirmDeleteId)}
          title="Permanently Delete Item"
          message="Are you sure you want to permanently delete this item? This action cannot be undone."
          confirmLabel="Delete Permanently"
          danger
        />
      )}

      {/* Confirm Empty Recycle Bin */}
      {emptyRecycleOpen && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setEmptyRecycleOpen(false)}
          onConfirm={handleEmptyRecycleBin}
          title="Empty Recycle Bin"
          message="Are you sure you want to permanently delete all items currently in the recycle bin?"
          confirmLabel="Empty Everything"
          danger
        />
      )}

      {/* Reset State Dialog */}
      {resetOpen && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setResetOpen(false)}
          onConfirm={handleReset}
          title="Reset All Data"
          message="Are you sure you want to reset all data? All custom journeys, topics, and DSA progress will be lost."
          confirmLabel="Reset Everything"
          danger
        />
      )}
    </AppLayout>
  );
}
