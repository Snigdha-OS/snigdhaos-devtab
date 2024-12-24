import React from 'react';
import { DeveloperInfo } from '../Branding/DeveloperInfo';
import { branding } from '../../config/branding';

export function Footer() {
  return (
    <footer className="fixed bottom-4 left-4 flex items-center gap-4">
      <DeveloperInfo />
      <span className="text-xs text-white/40">v{branding.version}</span>
    </footer>
  );
}