// src/components/journeys/CreateJourneyModal.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, HelpCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { TRACKING_MODELS, DEFAULT_SKILL_DIMENSIONS, generateId } from '../../models/journeySchema';

const CATEGORIES = [
  'Technology',
  'Data Science & AI',
  'Software Development',
  'Cybersecurity & Cloud',
  'Design & UX',
  'Business & Management',
  'Creative Arts',
  'Language',
  'Science & Math',
  'Fitness & Health',
  'Other',
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export function CreateJourneyModal({ isOpen, onClose, onSave, initialData = null }) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [goal, setGoal] = useState(initialData?.goal || 'Career Switch');
  const [category, setCategory] = useState(initialData?.category || 'Technology');
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'All Levels');
  const [targetDate, setTargetDate] = useState(initialData?.targetDate || '');
  const [trackingModel, setTrackingModel] = useState(
    initialData?.trackingModel || TRACKING_MODELS.SKILL_DEVELOPMENT
  );
  const [enableAIDependency, setEnableAIDependency] = useState(
    initialData?.enableAIDependency ?? true
  );

  const [customDimensions, setCustomDimensions] = useState(
    initialData?.skillDimensions?.length > 0
      ? initialData.skillDimensions
      : [
          { id: 'dim-1', name: 'Theory', maxScore: 5 },
          { id: 'dim-2', name: 'Technique', maxScore: 5 },
          { id: 'dim-3', name: 'Practice', maxScore: 5 },
        ]
  );
  const [newDimName, setNewDimName] = useState('');

  const addCustomDimension = () => {
    if (!newDimName.trim()) return;
    setCustomDimensions((prev) => [
      ...prev,
      { id: generateId('dim'), name: newDimName.trim(), maxScore: 5 },
    ]);
    setNewDimName('');
  };

  const removeCustomDimension = (id) => {
    setCustomDimensions((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let skillDimensions = [];
    if (trackingModel === TRACKING_MODELS.SKILL_DEVELOPMENT) {
      skillDimensions = [...DEFAULT_SKILL_DIMENSIONS];
    } else if (trackingModel === TRACKING_MODELS.CUSTOM) {
      skillDimensions = customDimensions;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      goal,
      category,
      difficulty,
      targetDate,
      trackingModel,
      skillDimensions,
      enableAIDependency,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Learning Journey' : 'Create New Learning Journey'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Journey Name */}
        <div>
          <label className="label">
            Journey Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. AI/ML Engineer, Full Stack Developer, Spanish Fluency"
            className="input"
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of what this journey entails..."
            rows={2}
            className="input"
          />
        </div>

        {/* Goal & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Primary Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Career Switch, Certification, Mastery"
              className="input"
            />
          </div>
          <div>
            <label className="label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Difficulty & Target Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="input"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Target Completion Date (Optional)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Tracking Model */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
          <label className="label flex items-center gap-1.5">
            <span>Tracking Model</span>
            <span className="text-xs text-gray-400 font-normal">(How skills & progress are evaluated)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-1.5">
            {/* Basic */}
            <button
              type="button"
              onClick={() => setTrackingModel(TRACKING_MODELS.BASIC)}
              className={`p-3 rounded-xl border text-left transition-all ${
                trackingModel === TRACKING_MODELS.BASIC
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-600'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Basic</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Status, learning checklist, and notes. Simple & lightweight.
              </div>
            </button>

            {/* Skill Development */}
            <button
              type="button"
              onClick={() => setTrackingModel(TRACKING_MODELS.SKILL_DEVELOPMENT)}
              className={`p-3 rounded-xl border text-left transition-all ${
                trackingModel === TRACKING_MODELS.SKILL_DEVELOPMENT
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-600'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
                <span>Skill Development</span>
                <span className="text-[9px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-1.5 py-0.5 rounded font-semibold">
                  Default
                </span>
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                5 dimensions: Understanding, Implementation, Debugging, Practice, Interview.
              </div>
            </button>

            {/* Custom */}
            <button
              type="button"
              onClick={() => setTrackingModel(TRACKING_MODELS.CUSTOM)}
              className={`p-3 rounded-xl border text-left transition-all ${
                trackingModel === TRACKING_MODELS.CUSTOM
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-600'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Custom Dimensions</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Define your own custom skill dimensions (e.g., Vocabulary, Speaking).
              </div>
            </button>
          </div>
        </div>

        {/* Custom Dimensions Editor */}
        {trackingModel === TRACKING_MODELS.CUSTOM && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3.5 rounded-xl border border-gray-100 dark:border-gray-700/60 space-y-2.5">
            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              Custom Skill Dimensions (0 - 5 Scale)
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newDimName}
                onChange={(e) => setNewDimName(e.target.value)}
                placeholder="e.g. Vocabulary, Grammar, Speed..."
                className="input py-1 text-xs flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomDimension();
                  }
                }}
              />
              <button
                type="button"
                onClick={addCustomDimension}
                className="btn-secondary text-xs py-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {customDimensions.map((dim) => (
                <span
                  key={dim.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 shadow-sm"
                >
                  <span>{dim.name}</span>
                  {customDimensions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomDimension(dim.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Dependency Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
          <div>
            <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              Enable AI Dependency Tracker
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              Track independent problem solving vs AI-assisted coding for this journey.
            </div>
          </div>
          <input
            type="checkbox"
            checked={enableAIDependency}
            onChange={(e) => setEnableAIDependency(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} className="btn-secondary text-xs">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs" disabled={!name.trim()}>
            <Sparkles className="w-3.5 h-3.5" />
            {initialData ? 'Save Changes' : 'Create Journey'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
