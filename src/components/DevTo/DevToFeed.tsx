import React from 'react';
import { Clock, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDevToFeed } from '../../hooks/useDevToFeed';
import { useSettings } from '../../hooks/useSettings';

export function DevToFeed() {
  const { settings } = useSettings();
  const { articles, loading, error } = useDevToFeed(settings.devto.username);

  if (!settings.devto.enabled) return null;
  if (loading) return <div className="text-white/60">Loading articles...</div>;
  if (error) return <div className="text-red-400">Failed to load articles</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Latest from Dev.to</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, settings.devto.maxArticles).map((article) => (
          <motion.a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
            whileHover={{ y: -5 }}
          >
            <div className="p-4">
              <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.reading_time_minutes} min read</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{article.public_reactions_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.comments_count || 0}</span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
