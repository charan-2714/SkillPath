// src/components/journeys/CreateJourneyModal.jsx
// Multi-mode Journey Creation modal supporting Role Templates, Technology Templates, Learning Packs, and From-Scratch builders

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Package,
  Cpu,
  Plus,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Flame,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import {
  ROLE_TEMPLATES,
  TECHNOLOGY_TEMPLATES,
  LEARNING_PACKS,
  cloneJourneyFromTemplate,
  cloneJourneyFromPacks,
  combineMultipleTemplatesIntoNewJourney,
} from '../../data/roles';
import { TRACKING_MODELS, DEFAULT_SKILL_DIMENSIONS, generateId } from '../../models/journeySchema';
import { useAppState, ACTIONS } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export function CreateJourneyModal({ isOpen, onClose, onSave, initialData = null }) {
  const navigate = useNavigate();
  const { dispatch } = useAppState();
  const { showToast } = useToast();

  // If editing an existing journey, default to 'custom' edit mode
  const [mode, setMode] = useState(initialData ? 'custom' : 'select-mode'); // 'select-mode' | 'combine' | 'role' | 'packs' | 'technology' | 'custom'

  // Universal Combiner State
  const [combinerTab, setCombinerTab] = useState('packs'); // 'packs' | 'roles' | 'technology'
  const [combinerSearch, setCombinerSearch] = useState('');
  const [selectedCombinerIds, setSelectedCombinerIds] = useState([]);
  const [customCombinedName, setCustomCombinedName] = useState('');

  // Custom Form Fields
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [goal, setGoal] = useState(initialData?.goal || 'Placement & Skill Mastery');
  const [category, setCategory] = useState(initialData?.category || 'Technology');
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'All Levels');
  const [targetDate, setTargetDate] = useState(initialData?.targetDate || '');
  const [trackingModel, setTrackingModel] = useState(
    initialData?.trackingModel || TRACKING_MODELS.SKILL_DEVELOPMENT
  );

  // Toggle selection for universal multi-combiner
  const handleToggleCombinerItem = (itemId) => {
    setSelectedCombinerIds((prev) => {
      const next = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      if (next.length > 0) {
        const allKnown = [...LEARNING_PACKS, ...ROLE_TEMPLATES, ...TECHNOLOGY_TEMPLATES];
        const titles = next
          .map((id) => allKnown.find((p) => p.id === id)?.title || allKnown.find((p) => p.id === id)?.name)
          .filter(Boolean);
        setCustomCombinedName(
          `My ${titles.slice(0, 2).join(' + ')}${titles.length > 2 ? ` (+${titles.length - 2} more)` : ''} Roadmap`
        );
      } else {
        setCustomCombinedName('');
      }
      return next;
    });
  };

  // Create combined journey from selected templates and packs
  const handleCreateCombinedRoadmap = () => {
    if (selectedCombinerIds.length === 0) return;
    const allKnown = [...LEARNING_PACKS, ...ROLE_TEMPLATES, ...TECHNOLOGY_TEMPLATES];
    const selectedTemplates = selectedCombinerIds
      .map((id) => allKnown.find((p) => p.id === id))
      .filter(Boolean);

    const newJourney = combineMultipleTemplatesIntoNewJourney(selectedTemplates, {
      name: customCombinedName.trim() || `My Combined Career Roadmap`,
      goal: 'Placement, Enterprise & Career Mastery',
    });

    if (newJourney) {
      dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: newJourney });
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: newJourney.id });
      showToast(`Created roadmap combining ${selectedTemplates.length} curriculum(s)!`, 'success');
      onClose();
      navigate(`/journeys/${newJourney.id}`);
    }
  };

  // Create journey from single template
  const handleCreateFromTemplate = (template) => {
    const newJourney = cloneJourneyFromTemplate(template);
    if (newJourney) {
      dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: newJourney });
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: newJourney.id });
      showToast(`Created journey from "${template.title || template.name}"!`, 'success');
      onClose();
      navigate(`/journeys/${newJourney.id}`);
    }
  };

  // Create journey from scratch form
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onClose();

    if (initialData) {
      onSave({
        name: name.trim(),
        description: description.trim(),
        goal,
        category,
        difficulty,
        targetDate,
        trackingModel,
        skillDimensions:
          trackingModel === TRACKING_MODELS.SKILL_DEVELOPMENT ? [...DEFAULT_SKILL_DIMENSIONS] : [],
      });
    } else {
      const newJourney = {
        id: generateId('journey'),
        name: name.trim(),
        description: description.trim(),
        goal,
        category,
        difficulty,
        targetDate,
        trackingModel,
        skillDimensions:
          trackingModel === TRACKING_MODELS.SKILL_DEVELOPMENT ? [...DEFAULT_SKILL_DIMENSIONS] : [],
        levels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: newJourney });
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: newJourney.id });
      showToast(`Created journey "${newJourney.name}"!`, 'success');
      navigate(`/journeys/${newJourney.id}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        initialData
          ? 'Edit Learning Journey'
          : mode === 'select-mode'
          ? 'Create Your Learning Journey'
          : mode === 'role'
          ? 'Choose Role Career Template'
          : mode === 'packs'
          ? 'Combine Roadmaps & Learning Packs'
          : mode === 'technology'
          ? 'Choose Technology Template'
          : 'Build Custom Journey From Scratch'
      }
      size="lg"
    >
      {/* 1. STARTING POINT SELECTION */}
      {mode === 'select-mode' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Choose how you would like to start your learning roadmap:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Option A: Universal Multi-Combiner */}
            <div
              onClick={() => setMode('packs')}
              className="p-4 rounded-2xl border border-sky-200/80 dark:border-sky-800/60 bg-gradient-to-br from-sky-50/40 via-white to-white dark:from-sky-950/20 dark:via-gray-900 dark:to-gray-900 hover:border-sky-400 dark:hover:border-sky-600 cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 flex items-center justify-center font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center justify-between">
                  Combine Multiple Curriculums
                  <span className="badge bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 text-[10px] font-bold">
                    Popular
                  </span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Combine any mix of Career Roles, Technology Tracks, and Reusable Learning Packs into one unified master roadmap.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 pt-3 group-hover:translate-x-0.5 transition-transform">
                Combine Curriculums <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Option B: Role Template */}
            <div
              onClick={() => setMode('role')}
              className="p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50/40 via-white to-white dark:from-indigo-950/20 dark:via-gray-900 dark:to-gray-900 hover:border-indigo-400 dark:hover:border-indigo-600 cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Role Career Templates
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Complete 0-to-Hero career roadmaps: AI/ML Engineer, Python Automation, Full Stack, Backend, Data Engineer.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-3 group-hover:translate-x-0.5 transition-transform">
                Choose Role <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Option C: Technology Template */}
            <div
              onClick={() => setMode('technology')}
              className="p-4 rounded-2xl border border-teal-200/80 dark:border-teal-800/60 bg-gradient-to-br from-teal-50/40 via-white to-white dark:from-teal-950/20 dark:via-gray-900 dark:to-gray-900 hover:border-teal-400 dark:hover:border-teal-600 cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-300 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Technology Frameworks
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Specialized domain roadmaps: SAP Ecosystem (Fiori, Integration Suite, CPI, MM, CAP, RAP) & Cloud.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 pt-3 group-hover:translate-x-0.5 transition-transform">
                Explore Tech <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Option D: Build From Scratch */}
            <div
              onClick={() => setMode('custom')}
              className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/50 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Build From Scratch
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Design a fully customized empty roadmap with your own milestone levels, subjects, and topics.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 pt-3 group-hover:translate-x-0.5 transition-transform">
                Start Empty Builder <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UNIVERSAL MULTI-CURRICULUM COMBINER MODE */}
      {mode === 'packs' && (
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMode('select-mode')}
              className="btn-ghost text-xs text-gray-500 flex items-center gap-1 p-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
              {selectedCombinerIds.length} Curriculums Selected
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Combined Master Roadmap Name
            </label>
            <input
              type="text"
              value={customCombinedName}
              onChange={(e) => setCustomCombinedName(e.target.value)}
              placeholder="e.g. My AI & Full Stack Career Master Roadmap"
              className="input text-sm w-full"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setCombinerTab('packs')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold transition-all ${
                combinerTab === 'packs'
                  ? 'bg-white dark:bg-gray-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Learning Packs ({LEARNING_PACKS.length})
            </button>
            <button
              type="button"
              onClick={() => setCombinerTab('roles')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold transition-all ${
                combinerTab === 'roles'
                  ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Role Templates ({ROLE_TEMPLATES.length})
            </button>
            <button
              type="button"
              onClick={() => setCombinerTab('technology')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-bold transition-all ${
                combinerTab === 'technology'
                  ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Technology Tracks ({TECHNOLOGY_TEMPLATES.length})
            </button>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Filter curriculums by name, skills, category..."
            value={combinerSearch}
            onChange={(e) => setCombinerSearch(e.target.value)}
            className="input text-xs py-1.5"
          />

          {/* Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {(() => {
              const activeList =
                combinerTab === 'packs'
                  ? LEARNING_PACKS
                  : combinerTab === 'roles'
                  ? ROLE_TEMPLATES
                  : TECHNOLOGY_TEMPLATES;
              const q = combinerSearch.toLowerCase().trim();
              const filtered = activeList.filter((item) => {
                if (!q) return true;
                return (
                  (item.title || item.name || '').toLowerCase().includes(q) ||
                  (item.description || '').toLowerCase().includes(q) ||
                  (item.category || '').toLowerCase().includes(q)
                );
              });

              if (filtered.length === 0) {
                return (
                  <div className="col-span-2 py-6 text-center text-xs text-gray-400">
                    No curriculums found matching your search.
                  </div>
                );
              }

              return filtered.map((item) => {
                const isSelected = selectedCombinerIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCombinerItem(item.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-sky-50/80 dark:bg-sky-950/50 border-sky-400 dark:border-sky-700 shadow-xs'
                        : 'bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-800 hover:border-sky-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleCombinerItem(item.id)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
                        <span className="truncate">{item.title || item.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono ml-1">
                          {item.subjects ? `${item.subjects.length}m` : `${(item.levels || []).length}L`}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {item.category} • {item.description}
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button
              disabled={selectedCombinerIds.length === 0}
              onClick={handleCreateCombinedRoadmap}
              className="btn-primary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Create Unified Master Roadmap ({selectedCombinerIds.length})
            </button>
          </div>
        </div>
      )}

      {/* 3. ROLE TEMPLATE SELECTION MODE */}
      {mode === 'role' && (
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <button
            onClick={() => setMode('select-mode')}
            className="btn-ghost text-xs text-gray-500 flex items-center gap-1 p-0 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="space-y-2.5">
            {ROLE_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleCreateFromTemplate(tpl)}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {tpl.title || tpl.name}
                    <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                    {tpl.description}
                  </p>
                </div>
                <button className="btn-primary text-xs px-3 py-1.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TECHNOLOGY TEMPLATE SELECTION MODE */}
      {mode === 'technology' && (
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <button
            onClick={() => setMode('select-mode')}
            className="btn-ghost text-xs text-gray-500 flex items-center gap-1 p-0 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <div className="space-y-2.5">
            {TECHNOLOGY_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleCreateFromTemplate(tpl)}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50/20 dark:hover:bg-teal-950/20 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {tpl.title || tpl.name}
                    <span className="badge bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 text-[10px]">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                    {tpl.description}
                  </p>
                </div>
                <button className="btn-primary text-xs px-3 py-1.5 flex-shrink-0 group-hover:scale-105 transition-transform">
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CUSTOM FROM SCRATCH MODE */}
      {mode === 'custom' && (
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          {!initialData && (
            <button
              type="button"
              onClick={() => setMode('select-mode')}
              className="btn-ghost text-xs text-gray-500 flex items-center gap-1 p-0 mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to choices
            </button>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Journey Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Custom Cloud Engineering Roadmap"
              className="input text-sm w-full"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of what this learning journey entails..."
              rows={2}
              className="input text-xs w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Primary Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Placement, Certification, Mastery"
                className="input text-xs w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select text-xs w-full"
              >
                {['Technology', 'Placement Preparation', 'Foundations', 'Data Science & AI', 'Software Development', 'Cybersecurity & Cloud', 'Other'].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              {initialData ? 'Save Changes' : 'Create & Open Builder'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
