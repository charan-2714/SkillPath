// src/pages/Templates.jsx
// Complete Learning Library containing Role Templates, Technology Templates, and Reusable Learning Packs

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Eye,
  Plus,
  Compass,
  Layers,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen,
  Filter,
  Flame,
  Search,
  Building2,
  Cpu,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  Package,
  Code2,
  Check,
  Zap,
  GraduationCap,
  Briefcase,
  Terminal,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import {
  TEMPLATES,
  SAP_TEMPLATES,
  TRENDING_TECH_TEMPLATES,
  ROLE_TEMPLATES,
  TECHNOLOGY_TEMPLATES,
  LEARNING_PACKS,
  cloneJourneyFromPacks,
  addPackToJourney,
} from '../data/roles';
import { useJourneys } from '../hooks/useJourneys';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

const MAIN_LIBRARY_TABS = [
  { id: 'all', label: 'All Curriculums', icon: Layers },
  { id: 'roles', label: 'Role Templates', icon: Briefcase },
  { id: 'packs', label: 'Learning Packs', icon: Package },
  { id: 'technology', label: 'Technology Templates', icon: Cpu },
];

const PACK_CATEGORIES = [
  'All',
  'Placement Preparation',
  'Foundations',
  'Technical Skills',
  'Domain Foundations',
  'Career & Interview',
];

const ROLE_CATEGORIES = [
  'All',
  'AI & Machine Learning',
  'Automation & Quality',
  'Cloud & DevOps',
  'Software Development',
  'Data & Analytics',
  'SAP Ecosystem',
];

const STATUS_FILTERS = [
  'All Statuses',
  'Production Standard',
  'Growing',
  'Emerging',
  'Established',
  'Legacy / Migration',
];

const STATUS_BADGE_STYLES = {
  'Production Standard': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  'Growing': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Emerging': 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'Established': 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800',
  'Legacy / Migration': 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700/80',
};

export default function Templates() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { createFromTemplate } = useJourneys();
  const { state, dispatch, activeJourney } = useAppState();

  // State
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'roles' | 'packs' | 'technology'
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Preview & Creation Modals
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewPack, setPreviewPack] = useState(null);
  const [useModal, setUseModal] = useState({ open: false, template: null, customName: '', goal: '', targetDate: '' });
  const [previewExpandedLevels, setPreviewExpandedLevels] = useState({});

  // Pack Customization State
  const [packCustomizeModal, setPackCustomizeModal] = useState({
    open: false,
    pack: null,
    selectedSubjectIds: [],
    journeyName: '',
  });

  // Filtered Lists
  const filteredPacks = useMemo(() => {
    return LEARNING_PACKS.filter((pack) => {
      if (categoryFilter !== 'All' && pack.category !== categoryFilter) {
        return false;
      }
      if (statusFilter !== 'All Statuses' && (pack.status || 'Production Standard') !== statusFilter) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const inTitle = (pack.title || '').toLowerCase().includes(q);
        const inDesc = (pack.description || '').toLowerCase().includes(q);
        const inCat = (pack.category || '').toLowerCase().includes(q);
        const inTags = (pack.tags || []).some((t) => t.toLowerCase().includes(q));
        const inSubjects = (pack.subjects || []).some((s) => (s.title || '').toLowerCase().includes(q));
        return inTitle || inDesc || inCat || inTags || inSubjects;
      }
      return true;
    });
  }, [categoryFilter, statusFilter, search]);

  const filteredTemplates = useMemo(() => {
    const list = activeTab === 'technology' ? TECHNOLOGY_TEMPLATES : TEMPLATES;
    return list.filter((t) => {
      // Category filter matching
      if (categoryFilter === 'SAP Ecosystem') {
        if (!t.category?.includes('SAP')) return false;
      } else if (categoryFilter === 'AI & Machine Learning') {
        if (!t.category?.includes('AI') && !t.category?.includes('Machine Learning') && !t.category?.includes('Data Science')) return false;
      } else if (categoryFilter === 'Automation & Quality') {
        if (!t.category?.includes('Automation') && !t.category?.includes('Quality')) return false;
      } else if (categoryFilter === 'Cloud & DevOps') {
        if (!t.category?.includes('Cloud') && !t.category?.includes('DevOps')) return false;
      } else if (categoryFilter === 'Software Development') {
        if (!t.category?.includes('Software') && !t.category?.includes('Frontend') && !t.category?.includes('Backend') && !t.category?.includes('Full Stack')) return false;
      } else if (categoryFilter === 'Data & Analytics') {
        if (!t.category?.includes('Data') && !t.category?.includes('Analytics')) return false;
      } else if (categoryFilter !== 'All' && t.category !== categoryFilter) {
        return false;
      }

      // Status filter matching
      if (statusFilter !== 'All Statuses') {
        const tplStatus = t.status || 'Production Standard';
        if (tplStatus !== statusFilter) return false;
      }

      // Search query matching
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = (t.title || t.name || '').toLowerCase().includes(q);
        const matchesDesc = (t.description || '').toLowerCase().includes(q);
        const matchesCat = (t.category || '').toLowerCase().includes(q);
        const matchesTech = (t.technologies || []).some((tech) => tech.toLowerCase().includes(q));
        const matchesRoles = (t.targetRoles || []).some((role) => role.toLowerCase().includes(q));
        const matchesTags = (t.tags || []).some((tag) => tag.toLowerCase().includes(q));
        const matchesPrereq = (t.prerequisites || []).some((p) => p.toLowerCase().includes(q));
        const matchesLevels = (t.levels || []).some((l) => (l.title || '').toLowerCase().includes(q));

        return matchesTitle || matchesDesc || matchesCat || matchesTech || matchesRoles || matchesTags || matchesPrereq || matchesLevels;
      }

      return true;
    });
  }, [activeTab, search, categoryFilter, statusFilter]);

  const handleStartUseTemplate = (template) => {
    setUseModal({
      open: true,
      template,
      customName: `My ${template.title || template.name} Journey`,
      goal: template.category?.includes('SAP')
        ? 'SAP Enterprise Mastery & Certification'
        : template.category?.includes('AI')
        ? 'AI/ML Engineering Mastery'
        : 'Career Switch / Mastery',
      targetDate: '',
    });
  };

  const handleConfirmUseTemplate = (e) => {
    e.preventDefault();
    if (!useModal.template) return;
    const template = useModal.template;
    const customTitle = useModal.customName.trim() || template.title || template.name;

    try {
      const newJourney = createFromTemplate(template, customTitle);
      showToast(`Created journey "${newJourney.name}" from template!`, 'success');
      setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' });
      navigate(`/journeys/${newJourney.id}`);
    } catch (err) {
      console.error('Error creating journey from template:', err);
      // Fallback: directly clone and dispatch
      try {
        const fallbackJourney = cloneJourneyFromTemplate(template, customTitle);
        if (fallbackJourney) {
          dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: fallbackJourney });
          dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: fallbackJourney.id });
          showToast(`Created journey "${fallbackJourney.name}"!`, 'success');
          setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' });
          navigate(`/journeys/${fallbackJourney.id}`);
          return;
        }
      } catch (fallbackErr) {
        showToast('Failed to create journey: ' + fallbackErr.message, 'error');
      }
      setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' });
    }
  };

  const handleOpenPackCustomize = (pack) => {
    setPackCustomizeModal({
      open: true,
      pack,
      selectedSubjectIds: (pack.subjects || []).map((s) => s.id),
      journeyName: `My ${pack.title} Journey`,
    });
  };

  const handleTogglePackSubject = (subjId) => {
    setPackCustomizeModal((prev) => ({
      ...prev,
      selectedSubjectIds: prev.selectedSubjectIds.includes(subjId)
        ? prev.selectedSubjectIds.filter((id) => id !== subjId)
        : [...prev.selectedSubjectIds, subjId],
    }));
  };

  const handleConfirmCreatePackJourney = (e) => {
    e.preventDefault();
    const { pack, selectedSubjectIds, journeyName } = packCustomizeModal;
    if (!pack || !journeyName.trim()) return;

    const newJourney = cloneJourneyFromPacks(pack, {
      name: journeyName.trim(),
      selectedSubjectIds,
    });

    if (newJourney) {
      dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: newJourney });
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: newJourney.id });
      showToast(`Successfully created "${newJourney.name}"!`, 'success');
      setPackCustomizeModal({ open: false, pack: null, selectedSubjectIds: [], journeyName: '' });
      navigate(`/journeys/${newJourney.id}`);
    }
  };

  const togglePreviewLevel = (lvlId) => {
    setPreviewExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  return (
    <AppLayout pageTitle="Learning Library">
      <PageHeader
        title="Learning Library & Curriculum Registry"
        subtitle="Explore role career paths, specialized technology frameworks, and reusable Learning Packs designed for placement preparation and skill mastery."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/builder')}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Custom Journey Builder
            </button>
            <button
              onClick={() => navigate('/journeys')}
              className="btn-primary text-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              My Active Journeys
            </button>
          </div>
        }
      />

      {/* Main Top Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-3 overflow-x-auto scrollbar-thin">
        {MAIN_LIBRARY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          let count = 0;
          if (tab.id === 'all') count = TEMPLATES.length + LEARNING_PACKS.length;
          else if (tab.id === 'roles') count = ROLE_TEMPLATES.length;
          else if (tab.id === 'packs') count = LEARNING_PACKS.length;
          else if (tab.id === 'technology') count = TECHNOLOGY_TEMPLATES.length;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCategoryFilter('All');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-850 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-750 hover:border-sky-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search library (e.g. Placement, DSA, CS Fundamentals, SQL, AI/ML, Fiori, CPI, Python, AWS)..."
            className="flex-1"
          />

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select text-xs py-2 px-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 font-medium"
            >
              {STATUS_FILTERS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {(activeTab === 'packs' ? PACK_CATEGORIES : activeTab === 'roles' ? ROLE_CATEGORIES : ['All', 'Placement Preparation', 'Foundations', 'Technical Skills', 'SAP Ecosystem', 'AI & Machine Learning', 'Cloud & DevOps', 'Software Development']).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${
                categoryFilter === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-sky-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 1. LEARNING PACKS SECTION (When Tab is 'packs' or 'all') */}
      {(activeTab === 'packs' || activeTab === 'all') && (
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">
                Reusable Learning Packs
              </h2>
              <span className="badge bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800 text-xs font-bold">
                {filteredPacks.length} Packs
              </span>
            </div>
            {activeTab === 'all' && (
              <button
                onClick={() => setActiveTab('packs')}
                className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline"
              >
                View All Learning Packs →
              </button>
            )}
          </div>

          {filteredPacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPacks.map((pack) => {
                const subjectTitles = (pack.subjects || []).map((s) => s.title);
                return (
                  <div
                    key={pack.id}
                    className="card p-5 border border-sky-100 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between bg-gradient-to-b from-white to-sky-50/20 dark:from-gray-900 dark:to-gray-850"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="badge bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {pack.category}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400">
                          ~{pack.estimatedHours}h
                        </span>
                      </div>

                      <h3 className="text-base font-black text-gray-900 dark:text-gray-100 line-clamp-1">
                        {pack.title}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {pack.description}
                      </p>

                      {/* Included Modules Summary */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Included Modules:</span>
                          <span className="text-sky-600 dark:text-sky-400 font-black">
                            {(pack.subjects || []).length} Modules
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {subjectTitles.slice(0, 3).map((subTitle, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium truncate max-w-[140px]"
                            >
                              {subTitle}
                            </span>
                          ))}
                          {subjectTitles.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-300 font-bold">
                              +{subjectTitles.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-800 flex items-center justify-between gap-2">
                      <Link
                        to={`/packs/${pack.id}`}
                        className="btn-ghost text-xs text-sky-600 dark:text-sky-400 font-bold p-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenPackCustomize(pack)}
                          className="btn-secondary text-xs px-2.5 py-1.5"
                          title="Customize modules before creating journey"
                        >
                          Customize
                        </button>
                        <button
                          onClick={() => handleOpenPackCustomize(pack)}
                          className="btn-primary text-xs px-3 py-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No Learning Packs match your criteria"
              description="Try adjusting your search terms or category filters."
            />
          )}
        </div>
      )}

      {/* 2. ROLE & TECHNOLOGY TEMPLATES SECTION (When Tab is 'roles', 'technology', or 'all') */}
      {(activeTab === 'roles' || activeTab === 'technology' || activeTab === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">
                {activeTab === 'technology' ? 'Specialized Technology Frameworks' : 'Career Role Templates'}
              </h2>
              <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-xs font-bold">
                {filteredTemplates.length} Templates
              </span>
            </div>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTemplates.map((template) => {
                const totalHours = (template.levels || []).reduce(
                  (acc, lvl) => acc + (lvl.estimatedHours || 15),
                  0
                );
                return (
                  <div
                    key={template.id}
                    className="card p-5 border-gray-200/90 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-[10px] font-bold">
                          {template.category}
                        </span>
                        <span
                          className={`badge text-[10px] font-bold ${
                            STATUS_BADGE_STYLES[template.status] || STATUS_BADGE_STYLES['Production Standard']
                          }`}
                        >
                          {template.status || 'Production Standard'}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-gray-900 dark:text-gray-100 line-clamp-1">
                        {template.title || template.name}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-gray-400" />
                          <span>{(template.levels || []).length} Milestones</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>~{totalHours} Hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setPreviewTemplate(template);
                          setPreviewExpandedLevels({});
                        }}
                        className="btn-ghost text-xs text-indigo-600 dark:text-indigo-400 font-bold p-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>

                      <button
                        onClick={() => handleStartUseTemplate(template)}
                        className="btn-primary text-xs px-3.5 py-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Use Template
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No templates match your criteria"
              description="Try adjusting your search terms or category filters."
            />
          )}
        </div>
      )}

      {/* PACK CUSTOMIZATION & CREATION MODAL */}
      <Modal
        isOpen={packCustomizeModal.open}
        onClose={() => setPackCustomizeModal({ open: false, pack: null, selectedSubjectIds: [], journeyName: '' })}
        title={packCustomizeModal.pack ? `Add ${packCustomizeModal.pack.title}` : 'Customize Learning Pack'}
      >
        {packCustomizeModal.pack && (
          <form onSubmit={handleConfirmCreatePackJourney} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Journey Name
              </label>
              <input
                type="text"
                value={packCustomizeModal.journeyName}
                onChange={(e) =>
                  setPackCustomizeModal((prev) => ({ ...prev, journeyName: e.target.value }))
                }
                className="input text-sm w-full"
                placeholder="e.g. My Placement Fundamentals Journey"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Select Modules to Include ({packCustomizeModal.selectedSubjectIds.length} of{' '}
                  {(packCustomizeModal.pack.subjects || []).length}):
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPackCustomizeModal((prev) => ({
                      ...prev,
                      selectedSubjectIds:
                        prev.selectedSubjectIds.length === (prev.pack.subjects || []).length
                          ? []
                          : (prev.pack.subjects || []).map((s) => s.id),
                    }))
                  }
                  className="text-[11px] text-sky-600 dark:text-sky-400 font-bold hover:underline"
                >
                  {packCustomizeModal.selectedSubjectIds.length ===
                  (packCustomizeModal.pack.subjects || []).length
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {(packCustomizeModal.pack.subjects || []).map((subject) => {
                  const isChecked = packCustomizeModal.selectedSubjectIds.includes(subject.id);
                  return (
                    <div
                      key={subject.id}
                      onClick={() => handleTogglePackSubject(subject.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800'
                          : 'bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-800 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePackSubject(subject.id)}
                        className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {subject.title}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                          {(subject.topics || []).length} Topics • {subject.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setPackCustomizeModal({ open: false, pack: null, selectedSubjectIds: [], journeyName: '' })
                }
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={packCustomizeModal.selectedSubjectIds.length === 0}
                className="btn-primary text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" /> Start Learning Journey
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* USE TEMPLATE CONFIRM MODAL */}
      <Modal
        isOpen={useModal.open}
        onClose={() => setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' })}
        title={`Create Journey from ${useModal.template?.title || useModal.template?.name || 'Template'}`}
      >
        {useModal.template && (
          <form onSubmit={handleConfirmUseTemplate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Journey Name
              </label>
              <input
                type="text"
                value={useModal.customName}
                onChange={(e) => setUseModal((prev) => ({ ...prev, customName: e.target.value }))}
                className="input text-sm w-full"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Target Completion Date (Optional)
              </label>
              <input
                type="date"
                value={useModal.targetDate}
                onChange={(e) => setUseModal((prev) => ({ ...prev, targetDate: e.target.value }))}
                className="input text-xs w-full"
              />
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <div className="font-bold text-gray-900 dark:text-gray-100">
                Template Overview:
              </div>
              <div>• {(useModal.template.levels || []).length} Structured Milestones</div>
              <div>• {useModal.template.category} Track</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' })}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Start Learning Journey
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* TEMPLATE PREVIEW MODAL */}
      <Modal
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate ? previewTemplate.title || previewTemplate.name : 'Template Preview'}
      >
        {previewTemplate && (
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {previewTemplate.description}
            </p>

            <div className="space-y-2">
              {(previewTemplate.levels || []).map((lvl, lIdx) => {
                const isExpanded = previewExpandedLevels[lvl.id] ?? false;
                return (
                  <div
                    key={lvl.id || lIdx}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => togglePreviewLevel(lvl.id)}
                      className="w-full flex items-center justify-between p-3 text-left bg-gray-50 dark:bg-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-bold text-xs text-gray-900 dark:text-gray-100">
                        {lvl.title}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-150 dark:border-gray-800 space-y-1.5">
                        {(lvl.subjects || []).map((sub, sIdx) => (
                          <div
                            key={sub.id || sIdx}
                            className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  handleStartUseTemplate(tpl);
                }}
                className="btn-primary text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" /> Use This Template
              </button>
            </div>
          </div>
        )}
      </Modal>
    </AppLayout>
  );
}
