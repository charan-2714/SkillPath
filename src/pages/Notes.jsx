// src/pages/Notes.jsx
import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Tag, X } from 'lucide-react';
import { AppLayout, PageHeader } from '../components/layout/AppLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Modal, ConfirmDialog } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useAppState, ACTIONS } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function NoteCard({ note, onEdit, onDelete }) {
  const colors = [
    'border-indigo-200 dark:border-indigo-800',
    'border-blue-200 dark:border-blue-800',
    'border-green-200 dark:border-green-800',
    'border-amber-200 dark:border-amber-800',
    'border-purple-200 dark:border-purple-800',
  ];
  const colorIdx = note.id.charCodeAt(note.id.length - 1) % colors.length;

  return (
    <div className={`card p-4 border-l-4 ${colors[colorIdx]} hover:shadow-card-md transition-all`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{note.title}</h3>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => onEdit(note)} className="btn-ghost p-1.5" aria-label="Edit note"><Edit2 className="w-3.5 h-3.5" /></button>
          <button onClick={() => onDelete(note.id)} className="btn-ghost p-1.5 hover:text-red-500" aria-label="Delete note"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-4 whitespace-pre-wrap mb-3">{note.content}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {note.tags?.map(tag => (
          <span key={tag} className="badge bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">#{tag}</span>
        ))}
      </div>
      <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">{formatDate(note.updatedAt || note.createdAt)}</div>
    </div>
  );
}

function NoteForm({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(initial?.tags || []);

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '');
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), content, tags });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Title *</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" autoFocus />
      </div>
      <div>
        <label className="label">Content</label>
        <textarea
          className="input font-mono text-sm"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          placeholder="Write your notes here..."
        />
      </div>
      <div>
        <label className="label">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            className="input flex-1"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            placeholder="e.g. python, decorators"
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
          />
          <button onClick={addTag} className="btn-secondary">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="badge bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 flex items-center gap-1">
              #{tag}
              <button onClick={() => removeTag(tag)} aria-label={`Remove tag ${tag}`}><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={handleSave} className="btn-primary" disabled={!title.trim()}>Save Note</button>
      </div>
    </div>
  );
}

export default function Notes() {
  const { state, dispatch } = useAppState();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const notes = state.notes || [];

  const allTags = useMemo(() => [...new Set(notes.flatMap(n => n.tags || []))], [notes]);

  const filtered = useMemo(() => {
    return notes.filter(n => {
      if (tagFilter && !n.tags?.includes(tagFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q) || n.tags?.some(t => t.includes(q));
      }
      return true;
    });
  }, [notes, search, tagFilter]);

  const handleSave = (data) => {
    if (editNote) {
      dispatch({ type: ACTIONS.UPDATE_NOTE, payload: { ...editNote, ...data, updatedAt: new Date().toISOString() } });
      toast('Note updated', 'success');
    } else {
      dispatch({
        type: ACTIONS.ADD_NOTE,
        payload: { ...data, id: `note-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      });
      toast('Note created', 'success');
    }
    setModalOpen(false);
    setEditNote(null);
  };

  const handleEdit = (note) => { setEditNote(note); setModalOpen(true); };
  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: deleteId });
    toast('Note deleted', 'info');
    setDeleteId(null);
  };

  return (
    <AppLayout pageTitle="Notes">
      <PageHeader
        title="Notes"
        subtitle="Your personal learning notebook."
        actions={
          <button onClick={() => { setEditNote(null); setModalOpen(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> New Note
          </button>
        }
      />

      {/* Search + Tag filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notes..." className="flex-1" />
        {allTags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setTagFilter('')}
              className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap ${!tagFilter ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
            >All</button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
                className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap ${tagFilter === tag ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
              >#{tag}</button>
            ))}
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map(note => (
            <div key={note.id} className="break-inside-avoid">
              <NoteCard note={note} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="book"
          title={notes.length === 0 ? "No notes yet" : "No matching notes"}
          description={notes.length === 0 ? "Create your first note to capture your learning." : "Try a different search or tag."}
          action={
            notes.length === 0
              ? <button onClick={() => setModalOpen(true)} className="btn-primary"><Plus className="w-4 h-4" /> Create Note</button>
              : <button onClick={() => { setSearch(''); setTagFilter(''); }} className="btn-secondary">Clear filters</button>
          }
        />
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditNote(null); }} title={editNote ? 'Edit Note' : 'New Note'} size="md">
        <NoteForm initial={editNote} onSave={handleSave} onClose={() => { setModalOpen(false); setEditNote(null); }} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} title="Delete Note" message="Are you sure you want to delete this note?" confirmLabel="Delete" danger />
    </AppLayout>
  );
}
