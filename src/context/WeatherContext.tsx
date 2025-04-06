import React, { createContext, useContext, useState, useEffect } from 'react';
import { weatherService } from '@/services/weather/weatherService';
import { WeatherData, WeatherForecast } from '@/types/weather';

interface WeatherContextType {
  weatherData: WeatherForecast | null;
  currentWeather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: (latitude: number, longitude: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshWeather = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const [forecast, current] = await Promise.all([
        weatherService.getWeatherForecast(latitude, longitude),
        weatherService.getCurrentWeather(latitude, longitude)
      ]);

      setWeatherData(forecast);
      setCurrentWeather(current);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        currentWeather,
        loading,
        error,
        refreshWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 