import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Weather } from '../types';

export function Weather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data
    setTimeout(() => {
      setWeather({
        temp: 22,
        condition: 'Sunny',
        icon: 'sun',
        location: 'New York'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader className="animate-spin text-white" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-white flex items-center gap-4"
    >
      {weather?.condition === 'Sunny' && <Sun className="w-8 h-8" />}
      {weather?.condition === 'Cloudy' && <Cloud className="w-8 h-8" />}
      {weather?.condition === 'Rainy' && <CloudRain className="w-8 h-8" />}
      <div>
        <p className="text-2xl font-bold">{weather?.temp}°C</p>
        <p className="text-sm opacity-80">{weather?.location}</p>
      </div>
    </motion.div>
  );
}