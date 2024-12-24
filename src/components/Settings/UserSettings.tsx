import React from 'react';
import { User } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export function UserSettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-white/70" />
        <h3 className="text-lg font-semibold text-white">Personalization</h3>
      </div>
      
      <div className="space-y-2">
        <label className="block text-white text-sm">Your Name</label>
        <input
          type="text"
          value={settings.user.name}
          onChange={(e) => updateSettings({
            user: { ...settings.user, name: e.target.value }
          })}
          placeholder="Enter your name"
          className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 
                   focus:outline-none focus:ring-2 focus:ring-purple-400/50"
        />
      </div>
    </div>
  );
}