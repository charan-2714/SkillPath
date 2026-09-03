// src/pages/Journeys.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, Search, Compass, Archive, Layers } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { JourneyCard } from '../components/journeys/JourneyCard';
import { CreateJourneyModal } from '../components/journeys/CreateJourneyModal';
import { SearchBar } from '../components/common/SearchBar';
import { Tabs } from '../components/common/Tabs';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/Modal';
import { useJourneys } from '../hooks/useJourneys';
import { useToast } from '../context/ToastContext';

const CATEGORY_FILTERS = ['All', 'Technology', 'Creative Arts', 'Language', 'Science & Math', 'Other'];

export default function Journeys() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    activeJourneys,
    archivedJourneys,
    activeJourney,
    createJourney,
    updateJourney,
    deleteJourney,
    duplicateJourney,
    archiveJourney,
  } = useJourneys();

  const [activeTab, setActiveTab] = useState('active');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editJourneyData, setEditJourneyData] = useState(null);
  const [deleteJourneyId, setDeleteJourneyId] = useState(null);

  const tabs = [
    { id: 'active', label: 'Active Journeys', count: activeJourneys.length },
    { id: 'archived', label: 'Archived', count: archivedJourneys.length },
  ];

  const currentList = activeTab === 'active' ? activeJourneys : archivedJourneys;

  const filteredJourneys = useMemo(() => {
    return currentList.filter((j) => {
      if (categoryFilter !== 'All' && j.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          j.name.toLowerCase().includes(q) ||
          j.description?.toLowerCase().includes(q) ||
          j.category?.toLowerCase().includes(q) ||
          j.goal?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [currentList, search, categoryFilter]);

  const handleSaveJourney = (data) => {
    if (editJourneyData) {
      updateJourney(editJourneyData.id, data);
      setEditJourneyData(null);
    } else {
      createJourney(data);
    }
  };

  return (
    <AppLayout pageTitle="My Journeys">
      <PageHeader
        title="My Learning Journeys"
        subtitle="Manage and track all your custom learning goals and roadmaps."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/templates')}
              className="btn-secondary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Browse Templates
            </button>
            <button
              onClick={() => {
                setEditJourneyData(null);
                setCreateModalOpen(true);
              }}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              New Journey
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-5" />

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search journeys by name, category, or goal..."
          className="flex-1"
        />

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-colors font-medium ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Journey Cards Grid */}
      {filteredJourneys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJourneys.map((j) => (
            <JourneyCard
              key={j.id}
              journey={j}
              isSelected={activeJourney?.id === j.id}
              onEdit={(journey) => {
                setEditJourneyData(journey);
                setCreateModalOpen(true);
              }}
              onDuplicate={duplicateJourney}
              onArchive={archiveJourney}
              onDelete={(id) => setDeleteJourneyId(id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="book"
          title={
            activeTab === 'archived'
              ? 'No archived journeys'
              : currentList.length === 0
              ? 'No learning journeys created yet'
              : 'No journeys match your filters'
          }
          description={
            activeTab === 'archived'
              ? 'Journeys you archive will appear here for safe keeping.'
              : currentList.length === 0
              ? 'Start building your personalized learning journey from scratch or choose a template.'
              : 'Try clearing your search query or changing category filters.'
          }
          action={
            currentList.length === 0 ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditJourneyData(null);
                    setCreateModalOpen(true);
                  }}
                  className="btn-primary text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Journey
                </button>
                <button
                  onClick={() => navigate('/templates')}
                  className="btn-secondary text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Browse Templates
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('All');
                }}
                className="btn-secondary text-xs"
              >
                Clear Filters
              </button>
            )
          }
        />
      )}

      {/* Create / Edit Journey Modal */}
      <CreateJourneyModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditJourneyData(null);
        }}
        onSave={handleSaveJourney}
        initialData={editJourneyData}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteJourneyId)}
        onClose={() => setDeleteJourneyId(null)}
        onConfirm={() => {
          if (deleteJourneyId) {
            deleteJourney(deleteJourneyId);
            setDeleteJourneyId(null);
            showToast('Journey moved to Recycle Bin.', 'info');
          }
        }}
        title="Move Journey to Recycle Bin"
        message="Are you sure you want to delete this journey? It will be moved to your Recycle Bin where you can restore it anytime or delete it permanently."
        confirmLabel="Move to Recycle Bin"
        danger
      />
    </AppLayout>
  );
}
