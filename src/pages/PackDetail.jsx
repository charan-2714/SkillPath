// src/pages/PackDetail.jsx
// Dedicated Learning Pack Detail view with syllabus inspection, customization, and journey creation

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Package,
  Sparkles,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Code2,
  Flame,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Plus,
  Terminal,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { getLearningPackById, LEARNING_PACKS, cloneJourneyFromPacks, addPackToJourney } from '../data/learningPacks';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export default function PackDetail() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, activeJourney } = useAppState();
  const { showToast } = useToast();

  const pack = useMemo(() => getLearningPackById(packId), [packId]);

  // Selected language if language support exists
  const [selectedLanguage, setSelectedLanguage] = useState(pack?.defaultLanguage || 'Python');
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [journeyName, setJourneyName] = useState('');
  const [addToExisting, setAddToExisting] = useState(false);

  // Initialize selected subjects
  React.useEffect(() => {
    if (pack) {
      setSelectedSubjectIds((pack.subjects || []).map((s) => s.id));
      setJourneyName(`My ${pack.title} Journey`);
      if (pack.defaultLanguage) setSelectedLanguage(pack.defaultLanguage);
    }
  }, [pack]);

  if (!pack) {
    return (
      <AppLayout pageTitle="Learning Pack Not Found">
        <EmptyState
          icon="book"
          title="Learning Pack Not Found"
          description="The requested learning pack could not be located in the curriculum registry."
          action={
            <button onClick={() => navigate('/templates')} className="btn-primary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Library
            </button>
          }
        />
      </AppLayout>
    );
  }

  const toggleSubject = (subjId) => {
    setExpandedSubjects((prev) => ({ ...prev, [subjId]: !Boolean(prev[subjId]) }));
  };

  const toggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const map = {};
    (pack.subjects || []).forEach((s) => {
      map[s.id] = nextState;
    });
    setExpandedSubjects(map);
  };

  const handleToggleSubjectSelect = (subjId) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(subjId) ? prev.filter((id) => id !== subjId) : [...prev, subjId]
    );
  };

  const handleCreateJourney = (e) => {
    e?.preventDefault();
    if (!journeyName.trim()) return;

    if (addToExisting && activeJourney) {
      // Add pack subjects to active journey
      const updatedJourney = addPackToJourney(activeJourney, pack, selectedSubjectIds);
      dispatch({ type: ACTIONS.UPDATE_JOURNEY, payload: updatedJourney });
      showToast(`Added ${pack.title} modules to ${activeJourney.name}!`, 'success');
      navigate(`/journeys/${activeJourney.id}`);
      return;
    }

    // Create a new standalone journey from pack
    const newJourney = cloneJourneyFromPacks(pack, {
      name: journeyName.trim(),
      selectedSubjectIds,
    });

    if (newJourney) {
      dispatch({ type: ACTIONS.CREATE_JOURNEY, payload: newJourney });
      dispatch({ type: ACTIONS.SET_ACTIVE_JOURNEY, payload: newJourney.id });
      showToast(`Successfully created "${newJourney.name}"!`, 'success');
      setCreateModalOpen(false);
      setCustomizeModalOpen(false);
      navigate(`/journeys/${newJourney.id}`);
    }
  };

  const totalTopics = (pack.subjects || []).reduce((acc, s) => acc + (s.topics || []).length, 0);
  const totalLearningItems = (pack.subjects || []).reduce(
    (acc, s) => acc + (s.topics || []).reduce((tAcc, t) => tAcc + (t.learningItems || []).length, 0),
    0
  );

  return (
    <AppLayout pageTitle={pack.title}>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <Link to="/templates" className="hover:text-sky-500 transition-colors">
          Learning Library
        </Link>
        <span>/</span>
        <span className="text-gray-400">Learning Packs</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-semibold">{pack.title}</span>
      </div>

      {/* Hero Header Card */}
      <div className="card p-6 sm:p-8 bg-gradient-to-br from-white via-sky-50/20 to-indigo-50/20 dark:from-gray-900 dark:via-sky-950/10 dark:to-indigo-950/10 border-sky-200/60 dark:border-sky-800/40 shadow-md mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                Learning Pack
              </span>
              <span className="badge bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800 text-xs font-semibold">
                {pack.category}
              </span>
              <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                {pack.difficulty}
              </span>
              <span className="text-[11px] text-gray-400">
                v{pack.version} • Reviewed {pack.lastReviewed}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              {pack.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {pack.description}
            </p>

            {/* Language Selector if supported */}
            {pack.languageSupport && pack.languageSupport.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Primary Language:
                </span>
                <div className="flex items-center gap-1.5">
                  {pack.languageSupport.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all border ${
                        selectedLanguage === lang
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-sky-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => {
                setAddToExisting(false);
                setCreateModalOpen(true);
              }}
              className="btn-primary text-sm px-5 py-3 shadow-md hover:shadow-lg justify-center"
            >
              <Sparkles className="w-4 h-4" />
              Create Journey from Pack
            </button>

            <button
              onClick={() => setCustomizeModalOpen(true)}
              className="btn-secondary text-sm px-4 py-2.5 justify-center"
            >
              <Layers className="w-4 h-4" />
              Customize & Add ({selectedSubjectIds.length} Modules)
            </button>

            {pack.hasDsaTrackerIntegration && (
              <button
                onClick={() => navigate('/dsa')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold text-xs hover:bg-amber-500/20 transition-all"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                Open DSA Tracker
              </button>
            )}
          </div>
        </div>

        {/* Metric Badges Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200/60 dark:border-gray-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Modules</div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100">
                {(pack.subjects || []).length} Subjects
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Topics & Tasks</div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100">
                {totalTopics} Topics ({totalLearningItems} Items)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Estimated Time</div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100">
                ~{pack.estimatedHours} Hours
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium">Career Role</div>
              <div className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">
                {pack.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Syllabus (Left) vs Outcomes & Prerequisites (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Syllabus Explorer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500" />
              Complete Syllabus Breakdown
            </h2>
            <button onClick={toggleAll} className="btn-ghost text-xs text-sky-600 dark:text-sky-400 font-bold">
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          <div className="space-y-3">
            {(pack.subjects || []).map((subject, sIdx) => {
              const isSubOpen = Boolean(expandedSubjects[subject.id]);
              const topics = subject.topics || [];

              return (
                <div
                  key={subject.id || sIdx}
                  className="card overflow-hidden border border-gray-200/90 dark:border-gray-800 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleSubject(subject.id)}
                    className="w-full flex items-center justify-between p-4 text-left bg-gray-50/70 dark:bg-gray-850/60 hover:bg-gray-100/60 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-black text-xs flex items-center justify-center flex-shrink-0">
                        {sIdx + 1}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                          {subject.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {subject.description || `${topics.length} core learning topics`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
                      <span className="badge bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-[11px]">
                        {topics.length} {topics.length === 1 ? 'Topic' : 'Topics'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Topics Tree */}
                  {isSubOpen && (
                    <div className="p-4 border-t border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
                      {topics.map((topic, tIdx) => (
                        <div
                          key={topic.id || tIdx}
                          className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-850/50 border border-gray-200/70 dark:border-gray-800 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                              {topic.title}
                            </h4>
                            <span className="text-[10px] font-semibold text-gray-400">
                              ~{topic.estimatedHours || 3}h
                            </span>
                          </div>

                          {topic.description && (
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              {topic.description}
                            </p>
                          )}

                          {/* Learning Items Pill list */}
                          {topic.learningItems && topic.learningItems.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                Key Concepts:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {topic.learningItems.map((item, iIdx) => (
                                  <div
                                    key={item.id || iIdx}
                                    className="flex items-start gap-1.5 text-[11px] text-gray-700 dark:text-gray-300"
                                  >
                                    <Check className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>{item.title}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Practice / LeetCode link */}
                          {topic.practice && topic.practice.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {topic.practice.map((p, pIdx) => (
                                <span
                                  key={p.id || pIdx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 font-medium"
                                >
                                  <Flame className="w-2.5 h-2.5" />
                                  {p.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Outcomes, Audience & Career Relevance */}
        <div className="space-y-6">
          {/* Target Audience Card */}
          <div className="card p-5 border-gray-200/90 dark:border-gray-800 space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Who is this for?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {pack.targetUsers || 'Engineers and students wanting to master this domain systematically.'}
            </p>

            {pack.prerequisites && pack.prerequisites.length > 0 && (
              <div className="pt-2 border-t border-gray-150 dark:border-gray-800">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Prerequisites:
                </span>
                <ul className="space-y-1">
                  {pack.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Learning Outcomes Card */}
          {pack.learningOutcomes && pack.learningOutcomes.length > 0 && (
            <div className="card p-5 border-gray-200/90 dark:border-gray-800 space-y-3">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Learning Outcomes
              </h3>
              <div className="space-y-2">
                {pack.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Relevance */}
          {pack.careerRelevance && (
            <div className="card p-5 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
              <h3 className="text-sm font-black text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Career Relevance
              </h3>
              <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
                {pack.careerRelevance}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="card p-4 border-gray-200/90 dark:border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Skills & Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(pack.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="badge bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE STANDALONE JOURNEY MODAL */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title={`Create Journey from ${pack.title}`}
      >
        <form onSubmit={handleCreateJourney} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Journey Name
            </label>
            <input
              type="text"
              value={journeyName}
              onChange={(e) => setJourneyName(e.target.value)}
              className="input text-sm w-full"
              placeholder="e.g. My Placement Mastery Journey"
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <div className="font-bold text-gray-900 dark:text-gray-100">
              Included Content:
            </div>
            <div>• {(pack.subjects || []).length} Subject Modules</div>
            <div>• {totalTopics} Deep-Dive Topics</div>
            <div>• ~{pack.estimatedHours} Estimated Study Hours</div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Start Learning Journey
            </button>
          </div>
        </form>
      </Modal>

      {/* CUSTOMIZE BEFORE ADDING MODAL */}
      <Modal
        isOpen={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
        title={`Customize ${pack.title} Modules`}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select the specific modules you wish to include in your personalized journey:
          </p>

          <div className="space-y-2">
            {(pack.subjects || []).map((subject) => {
              const isChecked = selectedSubjectIds.includes(subject.id);
              return (
                <div
                  key={subject.id}
                  onClick={() => handleToggleSubjectSelect(subject.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800'
                      : 'bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleSubjectSelect(subject.id)}
                    className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {subject.title}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                      {(subject.topics || []).length} Topics • {subject.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-xs font-bold text-gray-600 dark:text-gray-300">
              {selectedSubjectIds.length} of {(pack.subjects || []).length} Modules Selected
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCustomizeModalOpen(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedSubjectIds.length === 0}
                onClick={() => {
                  setCustomizeModalOpen(false);
                  setCreateModalOpen(true);
                }}
                className="btn-primary text-xs"
              >
                Continue ({selectedSubjectIds.length})
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
