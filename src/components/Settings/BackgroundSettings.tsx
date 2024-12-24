import React, { useRef } from 'react';
import { Image, Upload, Link, X } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_BACKGROUNDS = [
  {
    name: 'Purple Night',
    value: 'from-gray-900 via-purple-900 to-violet-900',
    preview: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
  },
  {
    name: 'Ocean Deep',
    value: 'from-blue-900 via-blue-800 to-blue-950',
    preview: 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950',
  },
  {
    name: 'Forest',
    value: 'from-green-900 via-emerald-900 to-teal-900',
    preview: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
  },
];

export function BackgroundSettings() {
  const { settings, updateSettings } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({
          theme: {
            ...settings.theme,
            customBackground: reader.result as string,
            background: '',
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearBackground = () => {
    updateSettings({
      theme: {
        ...settings.theme,
        customBackground: '',
        background: PRESET_BACKGROUNDS[0].value,
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Image className="w-5 h-5 text-white/70" />
        <h3 className="text-lg font-semibold text-white">Background</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {PRESET_BACKGROUNDS.map((bg) => (
            <button
              key={bg.value}
              onClick={() => updateSettings({
                theme: {
                  ...settings.theme,
                  background: bg.value,
                  customBackground: '',
                }
              })}
              className={`h-20 rounded-lg ${bg.preview} transition-all duration-300
                       hover:scale-105 ${settings.theme.background === bg.value ? 
                       'ring-2 ring-purple-400' : ''}`}
            >
              <span className="sr-only">{bg.name}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                       bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white text-sm">Image URL</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={settings.theme.customBackground || ''}
                  onChange={(e) => updateSettings({
                    theme: {
                      ...settings.theme,
                      customBackground: e.target.value,
                      background: '',
                    }
                  })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-9 pr-3 py-2 bg-white/10 rounded-lg text-white 
                           placeholder-white/50 focus:outline-none focus:ring-2 
                           focus:ring-purple-400/50"
                />
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>
              {settings.theme.customBackground && (
                <button
                  onClick={clearBackground}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 
                           transition-colors text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}