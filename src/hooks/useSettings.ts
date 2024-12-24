import { useLocalStorage } from './useLocalStorage';
import type { UserSettings } from '../types';

const DEFAULT_SETTINGS: UserSettings = {
  theme: {
    background: 'from-gray-900 via-cornflower-900 to-blue-900',
    accentColor: 'cornflower',
    customBackground: '',
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
  search: {
    engine: 'google',
  },
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('user-settings', DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings(current => {
      const newSettings = { ...current };
      
      // Deep merge the updates
      Object.entries(updates).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          newSettings[key as keyof UserSettings] = {
            ...newSettings[key as keyof UserSettings],
            ...value
          };
        } else {
          newSettings[key as keyof UserSettings] = value;
        }
      });
      
      return newSettings;
    });
  };

  return { settings, updateSettings };
}