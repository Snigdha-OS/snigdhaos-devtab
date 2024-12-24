import { createContext, useContext, useState } from 'react';
import type { UserSettings } from '../../types';
import { useSettings } from '../../hooks/useSettings';

interface SettingsContextType {
  tempSettings: UserSettings;
  updateTempSettings: (updates: Partial<UserSettings>) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const [tempSettings, setTempSettings] = useState<UserSettings>(settings);

  const updateTempSettings = (updates: Partial<UserSettings>) => {
    setTempSettings(current => {
      const newSettings = { ...current };
      
      // Handle nested updates
      Object.entries(updates).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          newSettings[key as keyof UserSettings] = {
            ...newSettings[key as keyof UserSettings],
            ...value
          };
        } else {
          newSettings[key as keyof UserSettings] = value;
        }
      });
      
      return newSettings;
    });
  };

  const saveSettings = () => {
    updateSettings(tempSettings);
  };

  return (
    <SettingsContext.Provider value={{ tempSettings, updateTempSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsPanel = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettingsPanel must be used within SettingsProvider');
  return context;
};