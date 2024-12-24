import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Weather } from '../types';

export function Weather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<string>('');  // To store location name

  const openCageAPIKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API Key

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude); // Fetch weather based on coordinates
            reverseGeocode(latitude, longitude); // Get location name
          },
          () => {
            setLocation('Unable to retrieve location');
            setLoading(false);
          }
        );
      } else {
        setLocation('Geolocation not supported');
        setLoading(false);
      }
    };

    const fetchWeather = async (latitude: number, longitude: number) => {
      // Open-Meteo API URL (no API key required)
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather({
          temp: data.current_weather.temperature,
          condition: data.current_weather.weathercode === 1 ? 'Sunny' : data.current_weather.weathercode === 2 ? 'Cloudy' : 'Rainy',
          icon: data.current_weather.weathercode === 1 ? 'sun' : data.current_weather.weathercode === 2 ? 'cloud' : 'rain',
          location: 'Current Location'
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLocation('Failed to fetch weather');
        setLoading(false);
      }
    };

    const reverseGeocode = async (latitude: number, longitude: number) => {
      // OpenCage Geocoding API URL
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageAPIKey}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        const results = data.results[0]?.components;
        
        if (results) {
          const city = results.city || results.town || results.village || results.state || results.country;
          setLocation(city || 'Unknown Location');  // Display the best available location
        } else {
          setLocation('Location not found');
        }
      } catch (error) {
        console.error('Error reverse geocoding:', error);
        setLocation('Failed to get location name');
      }
    };

    getLocation(); // Trigger the geolocation fetch

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
        <p className="text-sm opacity-80">{location || 'Loading location...'}</p>
      </div>
    </motion.div>
  );
}
