import { useLocalStorage } from './useLocalStorage';
import type { Bookmark } from '../types';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', []);

  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    setBookmarks([...bookmarks, { ...bookmark, id: Date.now().toString() }]);
  };

  const updateBookmark = (id: string, updates: Partial<Bookmark>) => {
    setBookmarks(bookmarks.map(bookmark =>
      bookmark.id === id ? { ...bookmark, ...updates } : bookmark
    ));
  };

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return {
    bookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
  };
}