import axios from 'axios';
import { WeatherData, WeatherForecast } from '@/types/weather';

export class WeatherService {
  private static instance: WeatherService;
  private readonly API_KEY = '73899b9afe047b55a1eca59804b40859';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: this.API_KEY,
          units: 'metric'
        }
      });

      return {
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        windDirection: response.data.wind.deg,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        clouds: response.data.clouds.all,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        timestamp: response.data.dt
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  public async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast> {
    try {
      const response = await axios.get(`${this.BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.API_KEY,
          units: 'metric'
        }
      });

      const hourlyForecast = response.data.list.map((item: any) => ({
        timestamp: item.dt,
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        windDirection: item.wind.deg,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        clouds: item.clouds.all,
        pressure: item.main.pressure,
        visibility: item.visibility,
        precipitation: item.pop * 100 // Probability of precipitation
      }));

      // Group by day for daily forecast
      const dailyForecast = this.groupForecastByDay(hourlyForecast);

      return {
        current: await this.getCurrentWeather(lat, lon),
        hourly: hourlyForecast,
        daily: dailyForecast
      };
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }

  private groupForecastByDay(hourlyForecast: any[]): any[] {
    const dailyMap = new Map();
    
    hourlyForecast.forEach(forecast => {
      const date = new Date(forecast.timestamp * 1000).toLocaleDateString();
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          minTemp: forecast.temperature,
          maxTemp: forecast.temperature,
          description: forecast.description,
          icon: forecast.icon,
          precipitation: forecast.precipitation
        });
      } else {
        const dayForecast = dailyMap.get(date);
        dayForecast.minTemp = Math.min(dayForecast.minTemp, forecast.temperature);
        dayForecast.maxTemp = Math.max(dayForecast.maxTemp, forecast.temperature);
        dayForecast.precipitation = Math.max(dayForecast.precipitation, forecast.precipitation);
      }
    });

    return Array.from(dailyMap.values());
  }

  public calculateGenerationPotential(
    weatherData: WeatherData,
    sourceType: 'solar' | 'wind' | 'hydro'
  ): number {
    switch (sourceType) {
      case 'solar':
        return this.calculateSolarPotential(weatherData);
      case 'wind':
        return this.calculateWindPotential(weatherData);
      case 'hydro':
        return this.calculateHydroPotential(weatherData);
      default:
        return 0;
    }
  }

  private calculateSolarPotential(weatherData: WeatherData): number {
    const cloudFactor = 1 - (weatherData.clouds / 100);
    const timeOfDay = this.getTimeOfDayFactor(weatherData.timestamp, weatherData.sunrise, weatherData.sunset);
    return Math.round(cloudFactor * timeOfDay * 100);
  }

  private calculateWindPotential(weatherData: WeatherData): number {
    // Wind speed in m/s, typical wind turbine cut-in speed is 3-4 m/s
    const minWindSpeed = 3;
    const maxWindSpeed = 25; // Typical cut-out speed
    const windSpeed = Math.min(Math.max(weatherData.windSpeed, minWindSpeed), maxWindSpeed);
    return Math.round(((windSpeed - minWindSpeed) / (maxWindSpeed - minWindSpeed)) * 100);
  }

  private calculateHydroPotential(weatherData: WeatherData): number {
    // Simplified calculation based on precipitation probability
    // In a real system, this would consider river flow rates, reservoir levels, etc.
    return Math.round(weatherData.humidity * 0.8); // 80% of humidity as a proxy for water availability
  }

  private getTimeOfDayFactor(timestamp: number, sunrise: number, sunset: number): number {
    const currentHour = new Date(timestamp * 1000).getHours();
    const sunriseHour = new Date(sunrise * 1000).getHours();
    const sunsetHour = new Date(sunset * 1000).getHours();

    if (currentHour < sunriseHour || currentHour > sunsetHour) {
      return 0;
    }

    // Peak solar hours are typically between 10 AM and 2 PM
    if (currentHour >= 10 && currentHour <= 14) {
      return 1;
    }

    // Gradual increase/decrease during morning/evening
    if (currentHour < 10) {
      return (currentHour - sunriseHour) / (10 - sunriseHour);
    } else {
      return (sunsetHour - currentHour) / (sunsetHour - 14);
    }
  }
}

export const weatherService = WeatherService.getInstance(); 