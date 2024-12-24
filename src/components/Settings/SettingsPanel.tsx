import React, { useRef, useEffect } from 'react';
import { Settings as SettingsIcon, X, Save } from 'lucide-react'; // Save icon from lucide-react
import { motion, AnimatePresence } from 'framer-motion';
import { UserSettings } from './UserSettings';
import { BackgroundSettings } from './BackgroundSettings';
import { FontSettings } from './FontSettings';
import { useSettings } from '../../hooks/useSettings';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

interface SettingsSectionProps {
  title?: string;
  children: React.ReactNode;
}

function SettingsSection({ children }: SettingsSectionProps) {
  return (
    <div className="mb-8 pb-8 border-b border-white/10">
      {children}
    </div>
  );
}

export function SettingsPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { settings, updateSettings } = useSettings(); // Assuming this hook is for managing settings
  const panelRef = useRef<HTMLDivElement | null>(null); // Explicitly typing the panelRef

  // Close the settings panel if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Function to handle saving settings and updating UI
  const handleSaveSettings = () => {
    // Save settings logic
    updateSettings(settings); // This will update the state and trigger a UI re-render
    console.log('Settings saved:', settings); // You can log this for debugging

    // Show success toast notification
    toast.success('Settings have been saved successfully!');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-white/10 rounded-full 
                 hover:bg-white/20 transition-colors"
      >
        <SettingsIcon className="text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              ref={panelRef}
              className="fixed right-0 top-0 h-full w-96 bg-gray-900 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-8">
                <SettingsSection>
                  <UserSettings />
                </SettingsSection>

                <SettingsSection>
                  <BackgroundSettings />
                </SettingsSection>

                <SettingsSection>
                  <FontSettings />
                </SettingsSection>
              </div>

              {/* Save Settings Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" /> {/* Save icon from lucide-react */}
                  <span>Save Settings</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </>
  );
}
