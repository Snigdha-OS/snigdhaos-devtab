import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useSettingsPanel } from './SettingsContext';

const PRESET_BACKGROUNDS = [
  {
    name: 'Cornflower Night',
    value: 'from-gray-900 via-cornflower-900 to-blue-900',
  },
  {
    name: 'Ocean Deep',
    value: 'from-blue-900 via-blue-800 to-blue-950',
  },
  {
    name: 'Forest',
    value: 'from-green-900 via-emerald-900 to-teal-900',
  },
];

export function BackgroundSettings() {
  const { tempSettings, updateTempSettings } = useSettingsPanel();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateTempSettings({
          theme: {
            ...tempSettings.theme,
            customBackground: reader.result as string,
            background: ''
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomBackground = () => {
    updateTempSettings({
      theme: {
        ...tempSettings.theme,
        customBackground: '',
        background: PRESET_BACKGROUNDS[0].value
      }
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {PRESET_BACKGROUNDS.map((bg) => (
          <button
            key={bg.value}
            onClick={() => updateTempSettings({
              theme: {
                ...tempSettings.theme,
                background: bg.value,
                customBackground: ''
              }
            })}
            className={`h-20 rounded-lg ${bg.value} transition-all
              ${tempSettings.theme.background === bg.value ? 'ring-2 ring-white scale-105' : 'hover:scale-105'}`}
          >
            <span className="sr-only">{bg.name}</span>
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Custom Background</label>
        
        <div className="relative">
          {tempSettings.theme.customBackground && (
            <div 
              className="h-32 w-full rounded-lg bg-cover bg-center mb-2"
              style={{ backgroundImage: `url(${tempSettings.theme.customBackground})` }}
            >
              <button
                onClick={clearCustomBackground}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 
                         hover:bg-black/70 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                       bg-white/10 hover:bg-white/20 rounded-lg text-white 
                       transition-colors"
            >
              <Upload className="w-4 h-4" />
              {tempSettings.theme.customBackground ? 'Change Background' : 'Upload Background'}
            </button>
          </div>
        </div>

        <p className="text-xs text-white/60">
          Recommended: 1920x1080 or larger. Supports JPG, PNG, WebP.
        </p>
      </div>
    </div>
  );
}