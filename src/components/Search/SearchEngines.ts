import { Chrome, Globe, Youtube, Github, Search } from 'lucide-react';

export const searchEngines = [
  {
    id: 'google',
    name: 'Google',
    icon: Chrome,
    url: 'https://www.google.com/search?q=',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: Globe,
    url: 'https://duckduckgo.com/?q=',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/results?search_query=',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/search?q=',
  },
];