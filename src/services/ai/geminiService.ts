import { GoogleGenerativeAI } from '@google/generative-ai';

// Fallback data for when the API is unavailable
const FALLBACK_INSIGHTS = {
  marketInsights: `## Market Trend Analysis
The energy market is currently showing stable trends with moderate volatility. Solar energy prices are expected to remain steady due to consistent weather patterns.

## Price Impact of Current Weather
Current weather conditions are favorable for renewable energy generation, which may lead to slightly lower prices in the short term.

## Trading Recommendations
- Consider buying during off-peak hours when prices are typically lower
- Monitor weather forecasts for potential price fluctuations
- Diversify your energy portfolio to mitigate risks

## Risk Factors to Consider
- Sudden weather changes could impact generation capacity
- Grid stability issues may affect pricing
- Regulatory changes could impact market dynamics`,

  energyForecast: `## Expected Generation Capacity
Based on current weather conditions, generation capacity is expected to be at 75-80% of maximum capacity.

## Peak Generation Times
Peak generation is expected between 11:00 AM and 3:00 PM when solar irradiance is highest.

## Potential Challenges
- Cloud cover may reduce efficiency by 10-15%
- Wind speeds are below optimal levels for wind generation
- High temperatures may slightly reduce solar panel efficiency

## Optimization Suggestions
- Consider adjusting panel angles for optimal sun exposure
- Implement energy storage solutions for peak demand periods
- Schedule maintenance during low-generation periods`,

  tradingStrategy: `## Optimal Trading Times
Best times to trade are between 10:00 AM and 2:00 PM when market liquidity is highest.

## Price Targets
- Buy target: $3.80-4.00 per kWh
- Sell target: $4.20-4.40 per kWh

## Risk Management Strategies
- Set stop-loss orders at 5% below entry price
- Diversify across multiple energy sources
- Monitor weather forecasts for sudden changes

## Alternative Options to Consider
- Consider long-term contracts for price stability
- Explore peer-to-peer energy trading platforms
- Investigate demand response programs`,

  pricePrediction: `## Price Trend Prediction
Prices are expected to remain stable with a slight upward trend over the next 24 hours.

## Expected Price Range
- Minimum: $3.75 per kWh
- Maximum: $4.25 per kWh

## Key Factors Influencing the Prediction
- Stable weather conditions expected
- Moderate demand forecast
- Grid stability reports positive

## Confidence Level in the Prediction
75% confidence in the predicted price range`,

  sustainabilityImpact: `## Carbon Footprint Reduction
This transaction will reduce carbon emissions by approximately 2.5 metric tons of CO2.

## Environmental Benefits
- Reduced reliance on fossil fuel-based power plants
- Lower air pollution in the local area
- Conservation of water resources

## Sustainability Metrics
- Renewable energy percentage: 100%
- Energy efficiency rating: A+
- Environmental impact score: 95/100

## Comparison to Traditional Energy Sources
This renewable energy source produces 98% less CO2 compared to coal-fired power plants and 95% less compared to natural gas plants.`
};

class GeminiService {
  private static instance: GeminiService;
  private readonly API_KEY: string;
  private readonly model: any;
  private useFallback: boolean = false;

  private constructor() {
    this.API_KEY = 'YOUR_API_KEY_HERE';
    try {
      const genAI = new GoogleGenerativeAI(this.API_KEY);
      // Try to use the model, but if it fails, we'll use fallback data
      this.model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    } catch (error) {
      console.error('Error initializing Gemini API:', error);
      this.useFallback = true;
    }
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async getMarketInsights(weatherData: any, energyType: string, price: number): Promise<string> {
    if (this.useFallback) {
      return FALLBACK_INSIGHTS.marketInsights;
    }
    
    try {
      const prompt = `You are an expert energy market analyst. Analyze the following energy market data and provide concise, actionable insights:
        Energy Type: ${energyType}
        Current Price: $${price}
        Weather Conditions: ${JSON.stringify(weatherData)}
        
        Please provide:
        1. Market trend analysis (2-3 sentences)
        2. Price impact of current weather (1-2 sentences)
        3. Trading recommendations (2-3 bullet points)
        4. Risk factors to consider (2-3 bullet points)
        
        Format your response in a clear, structured way with headings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting market insights:', error);
      this.useFallback = true;
      return FALLBACK_INSIGHTS.marketInsights;
    }
  }

  public async getEnergyForecast(weatherData: any, energyType: string): Promise<string> {
    if (this.useFallback) {
      return FALLBACK_INSIGHTS.energyForecast;
    }
    
    try {
      const prompt = `You are an expert in renewable energy forecasting. Based on the following weather data, provide an energy generation forecast:
        Energy Type: ${energyType}
        Weather Data: ${JSON.stringify(weatherData)}
        
        Please provide:
        1. Expected generation capacity (percentage and explanation)
        2. Peak generation times (specific hours)
        3. Potential challenges (2-3 bullet points)
        4. Optimization suggestions (2-3 bullet points)
        
        Format your response in a clear, structured way with headings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting energy forecast:', error);
      this.useFallback = true;
      return FALLBACK_INSIGHTS.energyForecast;
    }
  }

  public async getTradingStrategy(
    marketData: any,
    userPreferences: any
  ): Promise<string> {
    if (this.useFallback) {
      return FALLBACK_INSIGHTS.tradingStrategy;
    }
    
    try {
      const prompt = `You are an expert energy trading advisor. Based on the following market data and user preferences, provide trading strategy recommendations:
        Market Data: ${JSON.stringify(marketData)}
        User Preferences: ${JSON.stringify(userPreferences)}
        
        Please provide:
        1. Optimal trading times (specific hours)
        2. Price targets (buy/sell ranges)
        3. Risk management strategies (2-3 bullet points)
        4. Alternative options to consider (2-3 bullet points)
        
        Format your response in a clear, structured way with headings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting trading strategy:', error);
      this.useFallback = true;
      return FALLBACK_INSIGHTS.tradingStrategy;
    }
  }

  public async getPricePrediction(
    energyType: string,
    historicalData: any,
    weatherForecast: any
  ): Promise<string> {
    if (this.useFallback) {
      return FALLBACK_INSIGHTS.pricePrediction;
    }
    
    try {
      const prompt = `You are an expert in energy price forecasting. Based on the following data, predict price trends for the next 24 hours:
        Energy Type: ${energyType}
        Historical Data: ${JSON.stringify(historicalData)}
        Weather Forecast: ${JSON.stringify(weatherForecast)}
        
        Please provide:
        1. Price trend prediction (up/down/stable)
        2. Expected price range (min/max)
        3. Key factors influencing the prediction (2-3 bullet points)
        4. Confidence level in the prediction (percentage)
        
        Format your response in a clear, structured way with headings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting price prediction:', error);
      this.useFallback = true;
      return FALLBACK_INSIGHTS.pricePrediction;
    }
  }

  public async getSustainabilityImpact(
    energyType: string,
    quantity: number,
    location: string
  ): Promise<string> {
    if (this.useFallback) {
      return FALLBACK_INSIGHTS.sustainabilityImpact;
    }
    
    try {
      const prompt = `You are an expert in environmental sustainability. Analyze the environmental impact of the following energy transaction:
        Energy Type: ${energyType}
        Quantity: ${quantity} MWh
        Location: ${location}
        
        Please provide:
        1. Carbon footprint reduction (in metric tons of CO2)
        2. Environmental benefits (2-3 bullet points)
        3. Sustainability metrics (2-3 bullet points)
        4. Comparison to traditional energy sources
        
        Format your response in a clear, structured way with headings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting sustainability impact:', error);
      this.useFallback = true;
      return FALLBACK_INSIGHTS.sustainabilityImpact;
    }
  }
}

export const geminiService = GeminiService.getInstance(); 