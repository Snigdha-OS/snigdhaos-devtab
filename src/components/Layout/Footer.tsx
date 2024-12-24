import { DeveloperInfo } from '../Branding/DeveloperInfo';
import { branding } from '../../config/branding';

export function Footer() {
  return (
    <footer className="mt-16 py-6 border-t border-white/10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <DeveloperInfo />
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/40">v{branding.version}</span>
          <span className="text-xs text-white/40">© {new Date().getFullYear()} {branding.name}</span>
        </div>
      </div>
    </footer>
  );
}