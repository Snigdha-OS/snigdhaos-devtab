import { useState } from 'react';
import { Edit2, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Bookmark } from '../../types';
import { BookmarkIcon } from './BookmarkIcon';
import { BookmarkForm } from './BookmarkForm';

interface BookmarkItemProps {
  bookmark: Bookmark;
  onEdit: (id: string, updates: Partial<Bookmark>) => void;
  onDelete: (id: string) => void;
}

export function BookmarkItem({ bookmark, onEdit, onDelete }: BookmarkItemProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 p-3 bg-white/5 rounded-lg 
                 hover:bg-white/10 transition-colors"
      >
        <a 
          href={bookmark.url}
          className="flex items-center gap-2 flex-1"
          onClick={(e) => e.stopPropagation()}
        >
          <BookmarkIcon url={bookmark.url} />
          <span className="text-white truncate group-hover:text-white/90">
            {bookmark.title}
          </span>
        </a>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowEditForm(true)}
            className="p-1 text-white/50 hover:text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(bookmark.id)}
            className="p-1 text-white/50 hover:text-white transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {showEditForm && (
        <BookmarkForm
          bookmark={bookmark}
          onSubmit={(updates) => {
            onEdit(bookmark.id, updates);
            setShowEditForm(false);
          }}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}