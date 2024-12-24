import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Bookmark } from '../../types';
import { BookmarkIcon } from './BookmarkIcon';
import { BookmarkForm } from './BookmarkForm';

export function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const addBookmark = (newBookmark: Omit<Bookmark, 'id'>) => {
    setBookmarks([...bookmarks, { ...newBookmark, id: Date.now().toString() }]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Bookmarks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus className="text-white" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {bookmarks.map((bookmark) => (
            <motion.a
              key={bookmark.id}
              href={bookmark.url}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 
                       transition-colors group"
            >
              <BookmarkIcon url={bookmark.url} />
              <span className="text-white truncate group-hover:text-white/90">
                {bookmark.title}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <BookmarkForm onAdd={addBookmark} onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </>
  );
}