import { useState, useEffect } from 'react';
import type { WeatherData } from '../types/weather';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free API key for demo

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          location: data.name,
          icon: data.weather[0].icon,
          description: data.weather[0].description
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      setError('Unable to get location. Please enable location services.');
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        handleError,
        { timeout: 10000 }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, []);

  return { weather, loading, error };
}