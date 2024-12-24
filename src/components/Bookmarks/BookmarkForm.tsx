import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Bookmark } from '../../types';

interface BookmarkFormProps {
  onAdd: (bookmark: Omit<Bookmark, 'id'>) => void;
  onClose: () => void;
}

export function BookmarkForm({ onAdd, onClose }: BookmarkFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAdd({ title, url });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add Bookmark</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 bg-white/5 rounded-lg text-white placeholder-white/50 
                       focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL"
              className="w-full px-4 py-2 bg-white/5 rounded-lg text-white placeholder-white/50 
                       focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white 
                     font-medium transition-colors"
          >
            Add Bookmark
          </button>
        </form>
      </div>
    </motion.div>
  );
}