import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search');
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query.toString())}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search Google..."
          className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-lg rounded-lg 
                   text-white placeholder-white/50 focus:outline-none focus:ring-2 
                   focus:ring-white/20 transition-all"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
      </form>
    </motion.div>
  );
}