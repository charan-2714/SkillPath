// src/pages/ExportImport.jsx
// Export and import page with strict schema validation and Recycle Bin preservation

import React, { useState } from 'react';
import { Download, Upload, CheckCircle2, AlertTriangle, Database, Trash2, Folder, Layers } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { exportAppData, validateImportData } from '../services/storageService';

export default function ExportImport() {
  const { state, dispatch } = useAppState();
  const { showToast } = useToast();
  const [importResult, setImportResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleExport = () => {
    const jsonStr = exportAppData(state);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skillpath-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded successfully!', 'success');
  };

  const processImport = (text) => {
    try {
      const parsed = JSON.parse(text);
      const validation = validateImportData(parsed);

      if (validation.valid) {
        dispatch({ type: ACTIONS.IMPORT_STATE, payload: parsed });
        setImportResult({ success: true, message: 'All user journeys, logs, and recycle bin restored successfully!' });
        showToast('Backup imported successfully!', 'success');
      } else {
        setImportResult({ success: false, message: validation.error });
        showToast('Import validation failed: ' + validation.error, 'error');
      }
    } catch (err) {
      setImportResult({ success: false, message: 'Invalid JSON file format.' });
      showToast('Import failed: Invalid JSON file', 'error');
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => processImport(ev.target.result);
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => processImport(ev.target.result);
      reader.readAsText(file);
    }
  };

  const totalJourneys = (state.journeys || []).length;
  const totalLevels = (state.journeys || []).flatMap((j) => j.levels || []).length;
  const totalTopics = (state.journeys || []).flatMap((j) =>
    (j.levels || []).flatMap((l) => (l.subjects || []).flatMap((s) => s.topics || []))
  ).length;
  const totalRecycled = (state.recycleBin || []).length;

  return (
    <AppLayout pageTitle="Export & Import">
      <PageHeader
        title="Backup & Data Portability"
        subtitle="Export and restore your independent journeys, skill confidence scores, learning logs, and recycle bin."
      />

      <div className="max-w-3xl mx-auto space-y-5">
        {/* Current State Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card p-3.5 text-center">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {totalJourneys}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">User Journeys</div>
          </div>
          <div className="card p-3.5 text-center">
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {totalLevels}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">Curriculum Levels</div>
          </div>
          <div className="card p-3.5 text-center">
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {totalTopics}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">Topics Tracked</div>
          </div>
          <div className="card p-3.5 text-center">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {totalRecycled}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">Recycled Items</div>
          </div>
        </div>

        {/* Export Card */}
        <div className="card p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Export User Data Backup
              </h2>
              <p className="text-xs text-gray-500">
                Downloads your independent learning progress as clean JSON (omitting static role templates).
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The backup file contains your personalized journeys, skill confidence ratings, practice solutions, debugging notes, learning session logs, and soft-deleted items.
          </p>

          <button onClick={handleExport} className="btn-primary text-xs w-full justify-center py-2.5 shadow-sm">
            <Download className="w-4 h-4" /> Download Backup (JSON)
          </button>
        </div>

        {/* Import Card */}
        <div className="card p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Restore From Backup File
              </h2>
              <p className="text-xs text-gray-500">Validate and load previously exported learning journeys.</p>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragOver
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Drag and drop your backup JSON file here, or click to browse
            </p>
            <label className="btn-secondary text-xs cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Select Backup File
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          {importResult && (
            <div
              className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
                importResult.success
                  ? 'bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                  : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300'
              }`}
            >
              {importResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{importResult.message}</span>
            </div>
          )}

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            ⚠️ <strong>Data Safety:</strong> Restoring replaces current user data.
            If you want to keep your current progress, export a backup first.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
