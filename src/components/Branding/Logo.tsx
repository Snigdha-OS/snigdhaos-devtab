import React from 'react';
import { Command } from 'lucide-react';
import { branding } from '../../config/branding';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Command className="w-6 h-6 text-purple-400" />
      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
        {branding.name}
      </span>
    </div>
  );
}