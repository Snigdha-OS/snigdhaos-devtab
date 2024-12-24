import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchEngines } from './SearchEngines';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export function SearchBar() {
  const { settings, updateSettings } = useSettings();
  const [showEngines, setShowEngines] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const currentEngine = searchEngines.find(engine => 
    engine.id === settings.search?.engine
  ) || searchEngines[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search');
    if (query) {
      window.location.href = `${currentEngine.url}${encodeURIComponent(query.toString())}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto relative"
    >
      <form onSubmit={handleSubmit} className="relative group">
        <motion.div
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative rounded-xl overflow-hidden transition-all duration-300",
            isFocused && "ring-2 ring-primary/50 shadow-[0_0_15px_rgba(100,149,237,0.3)]"
          )}
        >
          <input
            type="text"
            name="search"
            placeholder={`Search ${currentEngine.name}...`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-lg text-white 
                     placeholder-white/50 outline-none transition-all duration-300
                     border border-white/10 hover:border-primary/30"
          />
        </motion.div>

        <button
          type="button"
          onClick={() => setShowEngines(!showEngines)}
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300",
            isFocused ? "text-primary" : "text-white/50 group-hover:text-primary/70"
          )}
        >
          <currentEngine.icon className="w-5 h-5" />
        </button>
      </form>

      <AnimatePresence>
        {showEngines && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-2 widget-base py-2 z-10"
          >
            {searchEngines.map(engine => (
              <button
                key={engine.id}
                onClick={() => {
                  updateSettings({ search: { ...settings.search, engine: engine.id } });
                  setShowEngines(false);
                }}
                className={cn(
                  "w-full px-4 py-2 flex items-center gap-3 transition-colors duration-200",
                  engine.id === currentEngine.id 
                    ? "text-primary bg-primary/10" 
                    : "text-white/70 hover:bg-primary/10 hover:text-primary"
                )}
              >
                <engine.icon className="w-4 h-4" />
                {engine.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}