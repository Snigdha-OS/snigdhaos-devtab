import React from 'react';
import { Type } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { FONT_OPTIONS } from '../../config/fonts';

export function FontSettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5 text-white/70" />
        <h3 className="text-lg font-semibold text-white">Typography</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm mb-2">Font Family</label>
          <select
            value={settings.typography.fontFamily}
            onChange={(e) => updateSettings({
              typography: { ...settings.typography, fontFamily: e.target.value }
            })}
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          >
            {FONT_OPTIONS.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Base Font Size</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="14"
              max="20"
              value={settings.typography.fontSize}
              onChange={(e) => updateSettings({
                typography: { ...settings.typography, fontSize: Number(e.target.value) }
              })}
              className="flex-1"
            />
            <span className="text-white min-w-[3ch]">{settings.typography.fontSize}px</span>
          </div>
        </div>
      </div>
    </div>
  );
}