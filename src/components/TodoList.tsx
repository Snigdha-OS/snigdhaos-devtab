import { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-white mb-4">Todo List</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          type="submit"
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Plus className="text-white" />
        </button>
      </form>
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 py-2"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className="text-white hover:text-white/80 transition-colors"
            >
              {todo.completed ? <CheckCircle /> : <Circle />}
            </button>
            <span className={`flex-1 text-white ${todo.completed ? 'line-through opacity-50' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}