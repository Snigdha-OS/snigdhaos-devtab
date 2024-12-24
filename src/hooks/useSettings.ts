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
    name: 'Snigdha OS User',
  },
  devto: {
    username: 'snigdhaos',
    enabled: true,
    maxArticles: 9,
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
  // Lazy initialization of state to get initial settings from localStorage or fallback to defaults
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('user-settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  // Effect to save settings to localStorage whenever they change
  useEffect(() => {
    // Avoid saving to localStorage if the settings haven't changed
    const savedSettings = localStorage.getItem('user-settings');
    const settingsChanged = JSON.stringify(settings) !== savedSettings;
    if (settingsChanged) {
      localStorage.setItem('user-settings', JSON.stringify(settings));
    }
  }, [settings]);

  // Function to update settings and persist to localStorage
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(current => {
      const newSettings = { ...current, ...updates };
      return newSettings;  // Return updated settings to trigger UI re-render
    });
  };

  return { settings, updateSettings };
}
