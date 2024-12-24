import React from 'react';
import { Code2 } from 'lucide-react';
import { branding } from '../../config/branding';

export function DeveloperInfo() {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <Code2 className="w-4 h-4" />
      <span>
        Developed by <span className="font-medium text-purple-400">{branding.developer.name}</span>
      </span>
    </div>
  );
}