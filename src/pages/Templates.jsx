// src/pages/Templates.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { TEMPLATES, SAP_TEMPLATES, TRENDING_TECH_TEMPLATES } from '../data/roles';
import { useJourneys } from '../hooks/useJourneys';
import { useToast } from '../context/ToastContext';

const CATEGORIES = [
  'All',
  'SAP Ecosystem',
  'AI & Machine Learning',
  'Automation & Quality',
  'Cloud & DevOps',
  'Software Development',
  'Data & Analytics',
  'Cybersecurity & Cloud',
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

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [useModal, setUseModal] = useState({ open: false, template: null, customName: '', goal: '', targetDate: '' });
  const [previewExpandedLevels, setPreviewExpandedLevels] = useState({});

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
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

      // Search query matching across title, descriptions, tech, target roles, prerequisites
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = (t.title || t.name || '').toLowerCase().includes(q);
        const matchesDesc = (t.description || '').toLowerCase().includes(q);
        const matchesCat = (t.category || '').toLowerCase().includes(q);
        const matchesTech = (t.technologies || []).some((tech) => tech.toLowerCase().includes(q));
        const matchesRoles = (t.targetRoles || []).some((role) => role.toLowerCase().includes(q));
        const matchesTags = (t.tags || []).some((tag) => tag.toLowerCase().includes(q));
        const matchesPrereq = (t.prerequisites || []).some((p) => p.toLowerCase().includes(q));

        return matchesTitle || matchesDesc || matchesCat || matchesTech || matchesRoles || matchesTags || matchesPrereq;
      }

      return true;
    });
  }, [search, categoryFilter, statusFilter]);

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
    try {
      const newJourney = createFromTemplate(
        useModal.template.id,
        useModal.customName.trim() || useModal.template.title || useModal.template.name
      );
      showToast(`Created journey "${newJourney.name}" from template!`, 'success');
      setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' });
      navigate(`/journeys/${newJourney.id}`);
    } catch (err) {
      showToast('Failed to create journey from template: ' + err.message, 'error');
    }
  };

  const togglePreviewLevel = (lvlId) => {
    setPreviewExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  return (
    <AppLayout pageTitle="Curated Role Templates">
      <PageHeader
        title="Professional Role & Technology Templates"
        subtitle="Select from complete, curated enterprise learning paths across the SAP Ecosystem, AI & GenAI, Cloud, and Modern Software Engineering."
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

      {/* Trending / Highlight Quick Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/5 to-transparent dark:from-indigo-950/40 dark:via-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Trending Technologies & Fast-Track Paths
            </span>
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            {TEMPLATES.length} Total Curated Frameworks
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: 'SAP Fiori / SAPUI5', id: 'sap-fiori-developer' },
            { label: 'SAP Integration Suite / CPI', id: 'sap-integration-developer' },
            { label: 'Agentic AI & MCP', id: 'agentic-ai-engineer' },
            { label: 'Python Automation Developer', id: 'python-automation-developer' },
            { label: 'SAP BTP Developer', id: 'sap-btp-developer' },
            { label: 'SAP CAP / RAP', id: 'sap-cap-developer' },
            { label: 'SAP MM / S/4HANA Procurement', id: 'sap-mm-consultant' },
            { label: 'MLOps Engineer', id: 'mlops-engineer' },
            { label: 'DevOps & Platform Engineering', id: 'devops-platform-engineer' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSearch(item.label);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 font-medium transition-all shadow-2xs"
            >
              #{item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search templates (e.g. CPI, Fiori, UI5, BTP, CAP, RAP, ABAP, MM, MCP, Kubernetes)..."
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

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              {cat === 'SAP Ecosystem' && '🏢 '}
              {cat === 'AI & Machine Learning' && '🧠 '}
              {cat === 'Automation & Quality' && '⚡ '}
              {cat === 'Cloud & DevOps' && '☁️ '}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => {
            const totalLevels = (template.levels || []).length;
            const totalSubjects = (template.levels || []).flatMap((l) => l.subjects || []).length;
            const totalTopics = (template.levels || []).flatMap((l) =>
              (l.subjects || []).flatMap((s) => s.topics || [])
            ).length;
            const templateStatus = template.status || 'Production Standard';
            const isSap = template.category?.includes('SAP');

            return (
              <div
                key={template.id}
                className={`card p-5 flex flex-col justify-between hover:shadow-card-md transition-all group ${
                  isSap
                    ? 'border-indigo-100 dark:border-indigo-900/40 hover:border-indigo-300 dark:hover:border-indigo-700'
                    : 'hover:border-indigo-200 dark:hover:border-indigo-800'
                }`}
              >
                <div>
                  {/* Category & Status Headers */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                    <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold text-[10px]">
                      {template.category}
                    </span>

                    <span
                      className={`badge text-[10px] font-bold border ${
                        STATUS_BADGE_STYLES[templateStatus] || STATUS_BADGE_STYLES['Production Standard']
                      }`}
                    >
                      {templateStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {template.title || template.name}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Key Technologies */}
                  {template.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {template.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {template.technologies.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 dark:bg-gray-800 text-gray-400 font-medium">
                          +{template.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Target Roles */}
                  {template.targetRoles?.length > 0 && (
                    <div className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Target Roles: </span>
                      <span>{template.targetRoles.slice(0, 2).join(', ')}</span>
                    </div>
                  )}

                  {/* Stats summary */}
                  <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 mt-4 py-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-gray-800 dark:text-gray-200">{totalLevels} Levels</span>
                    <span>•</span>
                    <span>{totalTopics} Topics</span>
                    {template.estimatedDuration && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {template.estimatedDuration}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800/60 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewTemplate(template);
                      setPreviewExpandedLevels({});
                    }}
                    className="btn-secondary text-xs flex-1 justify-center py-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Tree
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartUseTemplate(template)}
                    className="btn-primary text-xs flex-1 justify-center py-2 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Use This Path
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No matching templates found"
          description="Try clearing your search query or choosing another technology category."
          action={
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('All');
                setStatusFilter('All Statuses');
              }}
              className="btn-secondary text-xs"
            >
              Clear Filters
            </button>
          }
        />
      )}

      {/* Preview Modal: Progressive Disclosure Tree */}
      {previewTemplate && (
        <Modal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          title={`Curriculum Preview: ${previewTemplate.title || previewTemplate.name}`}
          size="lg"
        >
          <div className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 scrollbar-thin">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {previewTemplate.description}
              </p>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="badge bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold">
                  {previewTemplate.category}
                </span>
                <span
                  className={`badge font-bold border ${
                    STATUS_BADGE_STYLES[previewTemplate.status || 'Production Standard']
                  }`}
                >
                  Status: {previewTemplate.status || 'Production Standard'}
                </span>
                <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  Difficulty: {previewTemplate.difficulty}
                </span>
                {previewTemplate.estimatedDuration && (
                  <span className="badge bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    Est. Duration: {previewTemplate.estimatedDuration}
                  </span>
                )}
              </div>

              {previewTemplate.technologies?.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Core Technologies & Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {previewTemplate.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Progressive Curriculum ({(previewTemplate.levels || []).length} Levels)
                </h4>
                <span className="text-[11px] text-gray-400">Click level to expand topics</span>
              </div>

              {(previewTemplate.levels || []).map((lvl, lIdx) => {
                const isExpanded = previewExpandedLevels[lvl.id] ?? (lIdx < 2);

                return (
                  <div
                    key={lvl.id}
                    className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/80 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => togglePreviewLevel(lvl.id)}
                      className="w-full flex items-center justify-between p-3.5 text-left hover:bg-gray-100/60 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {lvl.title}
                        </div>
                        {lvl.description && (
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {lvl.description}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          {(lvl.subjects || []).length} subjects
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 space-y-2.5 border-t border-gray-100 dark:border-gray-800/80">
                        {(lvl.subjects || []).map((sub) => (
                          <div
                            key={sub.id}
                            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-1.5"
                          >
                            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                              {sub.title}
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(sub.topics || []).map((t) => (
                                <span
                                  key={t.id}
                                  className="text-[11px] px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600"
                                >
                                  {t.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn-secondary text-xs"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  handleStartUseTemplate(t);
                }}
                className="btn-primary text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Use This Path
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Use Template Modal */}
      <Modal
        isOpen={useModal.open}
        onClose={() => setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' })}
        title="Create Journey from Template"
        size="md"
      >
        <form onSubmit={handleConfirmUseTemplate} className="space-y-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            This will create a completely independent copy of the{' '}
            <strong>{useModal.template?.title || useModal.template?.name}</strong> template in your personal account.
            You can customize, add, delete, or reorder topics at any time without altering the master template.
          </p>

          <div>
            <label className="label">
              Journey Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={useModal.customName}
              onChange={(e) => setUseModal({ ...useModal, customName: e.target.value })}
              placeholder="e.g. My SAP Integration Journey"
              className="input"
              autoFocus
            />
          </div>

          <div>
            <label className="label">Primary Goal</label>
            <input
              type="text"
              value={useModal.goal}
              onChange={(e) => setUseModal({ ...useModal, goal: e.target.value })}
              placeholder="e.g. SAP Certified Development Associate, Career Transition"
              className="input"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setUseModal({ open: false, template: null, customName: '', goal: '', targetDate: '' })}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
              disabled={!useModal.customName.trim()}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Create My Journey
            </button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
