import { useState, useEffect } from 'react';
import type { UserSettings } from '../types';
import { FONT_OPTIONS } from '../config/fonts';

const DEFAULT_SETTINGS: UserSettings = {
  theme: {
    background: 'from-gray-900 via-purple-900 to-violet-900',
    accentColor: 'white',
    customBackground: '',
  },
  typography: {
    fontFamily: FONT_OPTIONS[0].value,
    fontSize: 16,
  },
  user: {
    name: 'Guest',
  },
  devto: {
    username: 'snigdhaos',
    enabled: true,
    maxArticles: 5,
  },
  layout: {
    showWeather: true,
    showClock: true,
    showCalendar: true,
    showTodos: true,
    showSearch: true,
    showBookmarks: true,
    showNotes: true,
  },
  clock: {
    format24h: false,
  },
  weather: {
    unit: 'celsius',
  },
  bookmarks: {
    showIcons: true,
    columns: 4,
  },
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('user-settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('user-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(current => ({ ...current, ...updates }));
  };

  return { settings, updateSettings };
}