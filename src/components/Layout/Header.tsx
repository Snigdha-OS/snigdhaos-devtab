import { Logo } from '../Branding/Logo';
import { Weather } from '../Weather';

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <Logo />
      <Weather />
    </div>
  );
}