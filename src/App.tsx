import { Header } from './components/Layout/Header';
import { MainContent } from './components/Layout/MainContent';
import { Footer } from './components/Layout/Footer';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { useSettings } from './hooks/useSettings';

function App() {
  const { settings } = useSettings();
  
  const backgroundStyle = settings.theme.customBackground
    ? { backgroundImage: `url(${settings.theme.customBackground})`, backgroundSize: 'cover' }
    : {};

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8"
      style={backgroundStyle}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />
        <MainContent />
        <Footer />
      </div>
      <SettingsPanel />
    </div>
  );
}

export default App;