import { useState, useEffect } from 'react';
import type { Note } from '../types';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Omit<Note, 'id'>) => {
    setNotes(current => [...current, { ...note, id: Date.now().toString() }]);
  };

  const updateNote = (id: string, updates: Omit<Note, 'id'>) => {
    setNotes(current =>
      current.map(note => (note.id === id ? { ...updates, id } : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes(current => current.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
}