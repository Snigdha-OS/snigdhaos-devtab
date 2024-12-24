import React from 'react';
import { Command } from 'lucide-react';
import { motion } from 'framer-motion';
import { branding } from '../../config/branding';
import { useSettings } from '../../hooks/useSettings';

export function BrandingHeader() {
  const { settings } = useSettings();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 flex items-center gap-3"
    >
      <div className="flex items-center gap-2">
        <Command className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 
                      bg-clip-text text-transparent">
            {branding.name}
          </h1>
          <p className="text-xs text-white/60">v{branding.version}</p>
        </div>
      </div>
      <div className="h-8 w-px bg-white/20" />
      <div className="text-sm text-white/80">
        Welcome back, <span className="text-purple-400">{settings.user.name}</span>
      </div>
    </motion.div>
  );
}