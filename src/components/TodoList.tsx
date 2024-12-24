import { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import type { Todo } from '../types';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="widget-base"
    >
      <h2 className="text-xl font-bold text-white mb-4">Todo List</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder-white/50 
                   focus:outline-none focus:ring-2 focus:ring-[#6495ED]/50"
        />
        <Button type="submit" size="sm">
          <Plus className="w-5 h-5" />
        </Button>
      </form>
      {/* Rest of the component remains the same */}
    </motion.div>
  );
}