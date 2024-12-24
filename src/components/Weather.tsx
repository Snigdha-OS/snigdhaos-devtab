import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Loader, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../hooks/useSettings';

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="w-8 h-8" />;
    case 'clouds':
      return <Cloud className="w-8 h-8" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain className="w-8 h-8" />;
    case 'thunderstorm':
      return <CloudLightning className="w-8 h-8" />;
    case 'snow':
      return <CloudSnow className="w-8 h-8" />;
    default:
      return <Cloud className="w-8 h-8" />;
  }
};

export function Weather() {
  const { weather, loading, error } = useWeather();
  const { settings } = useSettings();

  if (!settings.layout.showWeather) return null;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-white/80"
      >
        <Loader className="w-5 h-5 animate-spin" />
        <span>Fetching weather...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-red-400"
      >
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </motion.div>
    );
  }

  if (!weather) return null;

  const temp = settings.weather.unit === 'fahrenheit' 
    ? Math.round(weather.temp * 9/5 + 32) 
    : weather.temp;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
    >
      <div className="text-white">
        <WeatherIcon condition={weather.condition} />
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{temp}°</span>
          <span className="text-white/60">{settings.weather.unit === 'fahrenheit' ? 'F' : 'C'}</span>
        </div>
        <p className="text-sm text-white/80 capitalize">{weather.description}</p>
        <p className="text-xs text-white/60">{weather.location}</p>
      </div>
    </motion.div>
  );
}