// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Sun, Moon, Monitor, Download, Upload, RefreshCw, Sparkles, Database } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { ConfirmDialog } from '../components/common/Modal';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { exportBackup, importBackup, resetAllData } from '../services/storageService';

function SettingRow({ label, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div>
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</div>
        {description && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { state, dispatch } = useAppState();
  const toast = useToast();
  const settings = state.settings || {};
  const [resetOpen, setResetOpen] = useState(false);
  const [importError, setImportError] = useState('');

  const updateSetting = (key, value) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: { [key]: value } });
    if (key === 'theme') {
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
    toast('Settings updated', 'success');
  };

  const handleExport = () => {
    exportBackup(state);
    toast('Backup downloaded (skillpath-backup.json)', 'success');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importBackup(ev.target.result);
      if (result.success) {
        dispatch({ type: ACTIONS.IMPORT_STATE, payload: result.data });
        toast('Data imported successfully!', 'success');
        setImportError('');
      } else {
        setImportError(result.error);
        toast('Import failed: ' + result.error, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    const fresh = resetAllData();
    dispatch({ type: ACTIONS.RESET_STATE, payload: fresh });
    toast('All data reset to defaults', 'info');
    document.documentElement.classList.remove('dark');
  };

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <AppLayout pageTitle="Settings">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Customize your learning environment and manage local backups."
      />

      {/* Appearance */}
      <div className="card p-5 mb-5">
        <h2 className="section-title text-sm mb-1">Appearance</h2>
        <p className="text-xs text-gray-400 mb-4">Choose how SkillPath looks on your display.</p>

        <SettingRow label="Theme" description="Switch between Light and Dark themes">
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

        <SettingRow label="Compact Mode" description="Reduce whitespace for higher data density">
          <button
            onClick={() => updateSetting('compact', !settings.compact)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.compact ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            role="switch"
            aria-checked={settings.compact}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                settings.compact ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </SettingRow>
      </div>

      {/* Learning Preferences */}
      <div className="card p-5 mb-5">
        <h2 className="section-title text-sm mb-1">Learning Preferences</h2>
        <p className="text-xs text-gray-400 mb-4">Set your defaults for newly created journeys.</p>

        <SettingRow label="Learner Name" description="Used in personalized dashboard welcomes">
          <input
            className="input w-48 text-xs py-1.5"
            value={settings.userName || ''}
            onChange={(e) =>
              dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: { userName: e.target.value } })
            }
            onBlur={() => toast('Name updated', 'success')}
            placeholder="e.g. Engineer"
          />
        </SettingRow>

        <SettingRow label="Daily Study Goal" description="Your target study time per day">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="5"
              max="480"
              className="input w-24 text-xs py-1.5"
              value={settings.dailyStudyTarget || 60}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.UPDATE_SETTINGS,
                  payload: { dailyStudyTarget: Number(e.target.value) },
                })
              }
            />
            <span className="text-xs text-gray-500">minutes/day</span>
          </div>
        </SettingRow>
      </div>

      {/* Data Management & Export / Import */}
      <div className="card p-5 mb-5">
        <h2 className="section-title text-sm mb-1">Data Storage & Backups</h2>
        <p className="text-xs text-gray-400 mb-4">
          All journeys and progress are stored entirely in your browser. Export regularly to create backups.
        </p>

        <SettingRow
          label="Export Complete Backup"
          description="Download all journeys, topics, notes, and progress as a JSON backup file"
        >
          <button onClick={handleExport} className="btn-primary text-xs">
            <Download className="w-3.5 h-3.5" /> Export Backup
          </button>
        </SettingRow>

        <SettingRow
          label="Import Backup File"
          description="Restore journeys and progress from a previously exported backup file"
        >
          <label className="btn-secondary text-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Select Backup File
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </SettingRow>

        {importError && (
          <div className="text-xs text-red-600 dark:text-red-400 p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl">
            Import error: {importError}
          </div>
        )}

        <SettingRow
          label="Reset Everything"
          description="Permanently delete all journeys, roadmaps, notes, and study logs"
        >
          <button onClick={() => setResetOpen(true)} className="btn-danger text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Reset All Data
          </button>
        </SettingRow>
      </div>

      {/* Storage Architecture Info */}
      <div className="card p-5 bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">
            About Browser Storage
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          SkillPath stores 100% of your data locally in your browser's localStorage. No account or
          server upload is required. To move your data between devices (e.g. laptop to desktop), use
          the <strong>Export Backup</strong> and <strong>Import Backup</strong> options.
        </p>
      </div>

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
        title="Reset All SkillPath Data"
        message="This will permanently delete ALL journeys, levels, topics, notes, and settings. This cannot be undone. Are you sure you want to reset everything?"
        confirmLabel="Yes, Reset Everything"
        danger
      />
    </AppLayout>
  );
}
