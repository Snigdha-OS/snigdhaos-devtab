import { BookOpen, Clock } from 'lucide-react';
import { useDevToFeed } from '../../hooks/useDevToFeed';
import { useSettings } from '../../hooks/useSettings';

export function DevToFeed() {
  const { settings } = useSettings();
  const { articles, loading, error } = useDevToFeed(settings.devto.username);

  if (!settings.devto.enabled) return null;
  if (loading) return <div className="text-white/60">Loading articles...</div>;
  if (error) return <div className="text-red-400">Failed to load articles</div>;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Latest from Dev.to</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.slice(0, settings.devto.maxArticles).map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all hover:transform hover:scale-105"
          >
            <h3 className="text-white font-medium mb-2 line-clamp-2">{article.title}</h3>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.reading_time_minutes} min</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span className="truncate">{article.user.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}