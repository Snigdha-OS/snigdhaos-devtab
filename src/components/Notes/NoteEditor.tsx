import React from 'react';
import { Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Note } from '../../types';

interface NoteEditorProps {
  note: Partial<Note>;
  onSave: (note: Omit<Note, 'id'>) => void;
  onClose: () => void;
}

export function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [title, setTitle] = React.useState(note.title || '');
  const [content, setContent] = React.useState(note.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSave({ title, content, createdAt: note.createdAt || new Date().toISOString() });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="bg-transparent text-xl font-bold text-white placeholder-white/50 
                       focus:outline-none flex-1"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={10}
            className="w-full bg-white/5 rounded-lg p-4 text-white placeholder-white/50 
                     focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
          />
        </form>
      </div>
    </motion.div>
  );
}