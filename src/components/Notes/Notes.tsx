import { useState } from 'react';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([
        {
          id: Date.now().toString(),
          title: newNote.title,
          content: newNote.content,
          createdAt: new Date(),
        },
        ...notes,
      ]);
      setNewNote({ title: '', content: '' });
    }
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
    setEditingId(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
      
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Note title..."
          className="w-full bg-white/5 rounded-lg px-4 py-2 text-white placeholder-white/50"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Note content..."
          className="w-full bg-white/5 rounded-lg px-4 py-2 text-white placeholder-white/50 h-24"
        />
        <button
          onClick={addNote}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/50 hover:bg-purple-500/70 rounded-lg text-white"
        >
          <Plus size={18} />
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 rounded-lg p-4"
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => updateNote(note.id, { title: e.target.value })}
                    className="w-full bg-white/10 rounded px-3 py-1 text-white"
                  />
                  <textarea
                    value={note.content}
                    onChange={(e) => updateNote(note.id, { content: e.target.value })}
                    className="w-full bg-white/10 rounded px-3 py-1 text-white h-24"
                  />
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-2 text-white/80 hover:text-white"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(note.id)}
                        className="text-white/50 hover:text-white"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-white/50 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 whitespace-pre-wrap">{note.content}</p>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}