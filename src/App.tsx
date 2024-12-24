import React, { useEffect } from 'react';
import { Clock } from './components/Clock';
import { Weather } from './components/Weather';
import { Bookmarks } from './components/Bookmarks/Bookmarks';
import { TodoList } from './components/TodoList';
import { SearchBar } from './components/Search/SearchBar';
import { Welcome } from './components/Welcome/Welcome';
import { Calendar } from './components/Calendar/Calendar';
import { DevToFeed } from './components/DevTo/DevToFeed';
import { Notes } from './components/Notes/Notes';
import { Footer } from './components/Layout/Footer';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { BrandingHeader } from './components/Branding/BrandingHeader';
import { useSettings } from './hooks/useSettings';

function App() {
  const { settings } = useSettings();
  
  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', settings.typography.fontFamily);
    document.documentElement.style.setProperty('--base-font-size', `${settings.typography.fontSize}px`);
  }, [settings.typography]);

  const backgroundStyle = settings.theme.customBackground
    ? { backgroundImage: `url(${settings.theme.customBackground})`, backgroundSize: 'cover' }
    : {};

  return (
    <div 
      className={`min-h-screen ${!settings.theme.customBackground ? `bg-gradient-to-br ${settings.theme.background}` : ''} p-8`}
      style={backgroundStyle}
    >
      <BrandingHeader />
      
      <div className="max-w-7xl mx-auto space-y-8 pt-16">
        {settings.layout.showWeather && <Weather />}
        {settings.layout.showClock && <Clock />}
        {settings.layout.showSearch && <SearchBar />}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {settings.layout.showBookmarks && (
            <div className="md:col-span-2">
              <Bookmarks />
            </div>
          )}
          {settings.layout.showCalendar && (
            <div>
              <Calendar />
            </div>
          )}
        </div>
        
        {settings.layout.showTodos && <TodoList />}
        {settings.layout.showNotes && <Notes />}
        <DevToFeed />
      </div>
      
      <Footer />
      <SettingsPanel />
    </div>
  );
}

export default App;