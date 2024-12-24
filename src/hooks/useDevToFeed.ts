import { useState, useEffect } from 'react';
import type { DevToArticle } from '../types';

export function useDevToFeed(username: string) {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          `https://dev.to/api/articles?username=${username}`
        );
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchArticles();
    }
  }, [username]);

  return { articles, loading, error };
}