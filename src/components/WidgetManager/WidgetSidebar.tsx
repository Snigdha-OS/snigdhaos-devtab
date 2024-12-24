import { useState, useRef, useEffect } from 'react';
import { X, Plus, Settings, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWidgets } from './WidgetContext';

export function WidgetSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { widgets, availableWidgets, addWidget, deleteWidget } = useWidgets();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 glass-effect rounded-lg hover:bg-white/20 text-white"
      >
        <Settings className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-80 glass-effect p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Manage Widgets</h2>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-white/70 mb-2">Available Widgets</h3>
              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <button
                    key={widget.type}
                    onClick={() => addWidget(widget.type)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 
                             hover:bg-white/10 text-white"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{widget.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/70 mb-2">Active Widgets</h3>
              <div className="space-y-2">
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5"
                  >
                    <GripVertical className="w-4 h-4 text-white/50" />
                    <span className="flex-1 text-white">{widget.title}</span>
                    <button
                      onClick={() => deleteWidget(widget.id)}
                      className="text-white/50 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}