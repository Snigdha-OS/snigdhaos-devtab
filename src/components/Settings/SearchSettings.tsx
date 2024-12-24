import { searchEngines } from '../Search/SearchEngines';
import { useSettings } from '../../hooks/useSettings';

export function SearchSettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Search Engine</h3>
      <div className="grid grid-cols-2 gap-2">
        {searchEngines.map((engine) => (
          <button
            key={engine.id}
            onClick={() => updateSettings({ 
              search: { ...settings.search, engine: engine.id } 
            })}
            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
              ${settings.search?.engine === engine.id 
                ? 'bg-purple-500/50' 
                : 'bg-white/5 hover:bg-white/10'}`}
          >
            <engine.icon className="w-4 h-4 text-white" />
            <span className="text-white">{engine.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}