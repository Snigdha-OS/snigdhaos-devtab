import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BookmarkIconProps {
  url: string;
  size?: number;
}

export function BookmarkIcon({ url, size = 16 }: BookmarkIconProps) {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const domain = new URL(url).hostname;
      setIconUrl(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
    } catch (e) {
      setIconUrl(null);
    }
  }, [url]);

  if (!iconUrl) {
    return <Globe size={size} className="text-white" />;
  }

  return (
    <img 
      src={iconUrl} 
      alt="" 
      className="w-4 h-4 object-contain"
      onError={() => setIconUrl(null)}
    />
  );
}