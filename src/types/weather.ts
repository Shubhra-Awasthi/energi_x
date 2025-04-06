export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  clouds: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  timestamp: number;
}

export interface WeatherForecast {
  current: WeatherData;
  hourly: Array<WeatherData & { precipitation: number }>;
  daily: Array<{
    date: string;
    minTemp: number;
    maxTemp: number;
    description: string;
    icon: string;
    precipitation: number;
  }>;
} 