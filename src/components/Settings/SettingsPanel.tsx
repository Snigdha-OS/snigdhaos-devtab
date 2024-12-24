import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserSettings } from './UserSettings';
import { BackgroundSettings } from './BackgroundSettings';
import { FontSettings } from './FontSettings';
import { useSettings } from '../../hooks/useSettings';

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}