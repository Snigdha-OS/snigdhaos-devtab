import { useSettingsPanel } from './SettingsContext';
import { Eye, EyeOff } from 'lucide-react';

export function WidgetVisibility() {
  const { tempSettings, updateTempSettings } = useSettingsPanel();

  const widgets = [
    { key: 'showWeather', label: 'Weather' },
    { key: 'showClock', label: 'Clock' },
    { key: 'showCalendar', label: 'Calendar' },
    { key: 'showTodos', label: 'Todo List' },
    { key: 'showSearch', label: 'Search Bar' },
    { key: 'showBookmarks', label: 'Bookmarks' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {widgets.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => updateTempSettings({
              layout: { 
                ...tempSettings.layout, 
                [key]: !tempSettings.layout[key] 
              }
            })}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors
              ${tempSettings.layout[key] 
                ? 'bg-cornflower-500/50 hover:bg-cornflower-500/70' 
                : 'bg-white/5 hover:bg-white/10'}`}
          >
            <span className="text-white">{label}</span>
            {tempSettings.layout[key] ? (
              <Eye className="w-4 h-4 text-white" />
            ) : (
              <EyeOff className="w-4 h-4 text-white/50" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}