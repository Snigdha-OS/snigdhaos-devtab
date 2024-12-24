import { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Bookmark } from '../../types';
import { BookmarkIcon } from './BookmarkIcon';
import { BookmarkForm } from './BookmarkForm';

export function Bookmarks() {
  // Default bookmarks to be used if localStorage is empty
  const defaultBookmarks: Bookmark[] = [
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { id: '4', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    { id: '5', title: 'Twitter', url: 'https://twitter.com' },
  ];

  // Load bookmarks from localStorage or initialize with default bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      console.log("Loaded bookmarks from localStorage");
      return JSON.parse(savedBookmarks);
    }
    console.log("No bookmarks in localStorage, using default bookmarks");
    return defaultBookmarks;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (bookmarks.length > 0) {
      console.log("Saving bookmarks to localStorage", bookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const addBookmark = (newBookmark: Omit<Bookmark, 'id'>) => {
    const newBookmarkWithId = { ...newBookmark, id: Date.now().toString() };
    setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmarkWithId]);
  };

  const updateBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setShowForm(true);
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
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <motion.div
                key={bookmark.id}
                className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <BookmarkIcon url={bookmark.url} />
                <span className="text-white truncate group-hover:text-white/90">
                  {bookmark.title}
                </span>
                <button
                  onClick={() => handleEdit(bookmark)}
                  className="text-yellow-500 hover:text-yellow-400 ml-2"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-400 ml-2"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-white text-center">No bookmarks available.</p>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <BookmarkForm
            onAdd={addBookmark}
            onUpdate={updateBookmark}
            onDelete={deleteBookmark} // Pass delete function here
            onClose={() => {
              setShowForm(false);
              setEditingBookmark(null);
            }}
            existingBookmark={editingBookmark}
          />
        )}
      </AnimatePresence>
    </>
  );
}
