import { useState, useRef } from 'react';
import { Settings as SettingsIcon, X, Save } from 'lucide-react';
import { SearchSettings } from './SearchSettings';
import { BackgroundSettings } from './BackgroundSettings';
import { WidgetVisibility } from './WidgetVisibility';
import { SettingsSection } from './SettingsSection';
import { SettingsProvider, useSettingsPanel } from './SettingsContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Toast } from '../Toast/Toast';
import { AnimatePresence } from 'framer-motion';

function SettingsPanelContent({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { saveSettings } = useSettingsPanel();
  const [showToast, setShowToast] = useState(false);
  
  useClickOutside(panelRef, onClose);

  const handleSave = () => {
    saveSettings();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div 
        ref={panelRef}
        className="fixed right-0 top-0 h-full w-96 glass-effect p-6 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button 
            onClick={onClose} 
            className="text-white/50 hover:text-white"
          >
            <X />
          </button>
        </div>

        <div className="space-y-8">
          <SettingsSection title="Background">
            <BackgroundSettings />
          </SettingsSection>

          <SettingsSection title="Widgets">
            <WidgetVisibility />
          </SettingsSection>

          <SettingsSection title="Search">
            <SearchSettings />
          </SettingsSection>
        </div>

        <div className="fixed bottom-0 right-0 w-96 p-4 glass-effect border-t border-white/10">
          <button
            onClick={handleSave}
            className="w-full py-2 bg-cornflower-500 hover:bg-cornflower-600 
                     rounded-lg text-white font-medium flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <Toast
            message="Settings saved successfully!"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 glass-effect rounded-full 
                 hover:bg-cornflower-500/20"
      >
        <SettingsIcon className="text-white" />
      </button>

      {isOpen && (
        <SettingsProvider>
          <SettingsPanelContent onClose={() => setIsOpen(false)} />
        </SettingsProvider>
      )}
    </>
  );
}