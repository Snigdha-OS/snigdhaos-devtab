import { motion } from 'framer-motion';
import { branding } from '../../config/branding';
import { SnigdhaLogo } from './SnigdhaLogo';

export function Logo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="text-primary"
      >
        <SnigdhaLogo className="w-10 h-10 animate-float" />
      </motion.div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          {branding.name}
        </h1>
        <p className="text-xs text-white/60">Version {branding.version}</p>
      </div>
    </motion.div>
  );
}