import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Bookmark } from '../../types';
import { BookmarkForm } from './BookmarkForm';
import { BookmarkItem } from './BookmarkItem';
import { useBookmarks } from '../../hooks/useBookmarks';

export function Bookmarks() {
  const { bookmarks, addBookmark, updateBookmark, deleteBookmark } = useBookmarks();
  const [showForm, setShowForm] = useState(false);

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
          <AnimatePresence>
            {bookmarks.map((bookmark) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                onEdit={updateBookmark}
                onDelete={deleteBookmark}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <BookmarkForm
            onSubmit={(bookmark) => {
              addBookmark(bookmark);
              setShowForm(false);
            }}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}