import type { FontFamily } from '../config/fonts';

export interface UserSettings {
  theme: {
    background: string;
    accentColor: string;
    customBackground?: string;
  };
  typography: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  user: {
    name: string;
  };
  devto: {
    username: string;
    enabled: boolean;
    maxArticles: number;
  };
  layout: {
    showWeather: boolean;
    showClock: boolean;
    showCalendar: boolean;
    showTodos: boolean;
    showSearch: boolean;
    showBookmarks: boolean;
    showNotes: boolean;
  };
  clock: {
    format24h: boolean;
  };
  weather: {
    unit: 'celsius' | 'fahrenheit';
  };
  bookmarks: {
    showIcons: boolean;
    columns: number;
  };
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}