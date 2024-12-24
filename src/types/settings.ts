export interface UserSettings {
  theme: {
    background: string;
    accentColor: string;
    customBackground?: string;
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
  search: {
    engine: string;
  };
}