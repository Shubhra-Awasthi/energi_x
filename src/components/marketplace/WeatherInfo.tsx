import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { weatherService } from '@/services/weather/weatherService';
import { WeatherData } from '@/types/weather';
import { Cloud, Droplets, Sun, Wind } from 'lucide-react';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
  sourceType: 'solar' | 'wind' | 'hydro';
}

export function WeatherInfo({ latitude, longitude, sourceType }: WeatherInfoProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [generationPotential, setGenerationPotential] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await weatherService.getCurrentWeather(latitude, longitude);
        setWeatherData(data);
        const potential = weatherService.calculateGenerationPotential(data, sourceType);
        setGenerationPotential(potential);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [latitude, longitude, sourceType]);

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card>
        <CardContent className="p-4">
          <p>Loading weather data...</p>
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = () => {
    switch (sourceType) {
      case 'solar':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'wind':
        return <Wind className="h-6 w-6 text-blue-500" />;
      case 'hydro':
        return <Droplets className="h-6 w-6 text-blue-300" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <h3 className="font-semibold capitalize">{sourceType} Generation</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{generationPotential}%</p>
            <p className="text-sm text-gray-500">Generation Potential</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="font-medium">{weatherData.temperature}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="font-medium">{weatherData.feelsLike}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-medium">{weatherData.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-medium">{weatherData.windSpeed} m/s</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cloud Cover</p>
            <p className="font-medium">{weatherData.clouds}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="font-medium">{weatherData.pressure} hPa</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Conditions</p>
          <p className="font-medium capitalize">{weatherData.description}</p>
        </div>
      </CardContent>
    </Card>
  );
} 