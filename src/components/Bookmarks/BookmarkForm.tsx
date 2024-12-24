import { useState, useEffect } from 'react';
import { X, Trash } from 'lucide-react'; // Import Trash icon for delete
import { motion } from 'framer-motion';
import type { Bookmark } from '../../types';

interface BookmarkFormProps {
  onAdd: (bookmark: Omit<Bookmark, 'id'>) => void;
  onUpdate: (bookmark: Bookmark) => void;
  onClose: () => void;
  existingBookmark?: Bookmark | null; // Allowing null as a valid value
  onDelete?: (id: string) => void; // Add onDelete as an optional prop
}

export function BookmarkForm({
  onAdd,
  onUpdate,
  onClose,
  existingBookmark,
  onDelete,
}: BookmarkFormProps) {
  const [title, setTitle] = useState(existingBookmark?.title || '');
  const [url, setUrl] = useState(existingBookmark?.url || '');

  useEffect(() => {
    // If there's an existing bookmark, set its title and URL
    if (existingBookmark) {
      setTitle(existingBookmark.title);
      setUrl(existingBookmark.url);
    }
  }, [existingBookmark]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      if (existingBookmark) {
        // If editing an existing bookmark, update the bookmark
        onUpdate({ ...existingBookmark, title, url });
      } else {
        // Otherwise, add a new bookmark
        onAdd({ title, url });
      }
      onClose();
    }
  };

  const handleDelete = () => {
    if (existingBookmark && onDelete) {
      onDelete(existingBookmark.id); // Delete the existing bookmark
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
          <h3 className="text-xl font-bold text-white">{existingBookmark ? 'Edit Bookmark' : 'Add Bookmark'}</h3>
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
            {existingBookmark ? 'Save Changes' : 'Add Bookmark'}
          </button>
        </form>
        {existingBookmark && onDelete && (
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white 
                     font-medium mt-4 transition-colors"
          >
            <Trash className="inline mr-2" /> Delete Bookmark
          </button>
        )}
      </div>
    </motion.div>
  );
}
