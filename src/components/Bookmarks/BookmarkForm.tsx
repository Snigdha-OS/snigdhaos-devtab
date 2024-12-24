import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Bookmark } from '../../types';

interface BookmarkFormProps {
  bookmark?: Bookmark;
  onSubmit: (bookmark: Omit<Bookmark, 'id'>) => void;
  onClose: () => void;
}

export function BookmarkForm({ bookmark, onSubmit, onClose }: BookmarkFormProps) {
  const [title, setTitle] = useState(bookmark?.title || '');
  const [url, setUrl] = useState(bookmark?.url || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onSubmit({ title, url });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="glass-effect rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            {bookmark ? 'Edit Bookmark' : 'Add Bookmark'}
          </h3>
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
            className="w-full py-2 bg-purple-500/50 hover:bg-purple-500/70 rounded-lg text-white 
                     font-medium transition-colors"
          >
            {bookmark ? 'Save Changes' : 'Add Bookmark'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}