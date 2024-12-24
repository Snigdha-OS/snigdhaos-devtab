import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { NoteEditor } from './NoteEditor';
import { useNotes } from '../../hooks/useNotes';
import type { Note } from '../../types';

export function Notes() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedNote, setSelectedNote] = React.useState<Partial<Note> | null>(null);

  const handleSave = (note: Omit<Note, 'id'>) => {
    if (selectedNote?.id) {
      updateNote(selectedNote.id, note);
    } else {
      addNote(note);
    }
    setSelectedNote(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Notes</h2>
          <button
            onClick={() => setSelectedNote({})}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus className="text-white" />
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layoutId={note.id}
              className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 
                       transition-colors group"
              onClick={() => setSelectedNote(note)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white group-hover:text-purple-300 
                           transition-colors line-clamp-1">
                  {note.title}
                </h3>
                <FileText className="w-4 h-4 text-white/50 group-hover:text-purple-300 
                                 transition-colors" />
              </div>
              <p className="text-white/70 text-sm line-clamp-3 mb-2">{note.content}</p>
              <time className="text-xs text-white/50">
                {format(new Date(note.createdAt), 'MMM d, yyyy')}
              </time>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedNote !== null && (
          <NoteEditor
            note={selectedNote}
            onSave={handleSave}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}