import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { geminiService } from '@/services/ai/geminiService';
import { WeatherData } from '@/types/weather';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AIInsightsProps {
  weatherData: WeatherData;
  energyType: string;
  price: number;
  marketData?: any;
  userPreferences?: any;
}

export function AIInsights({
  weatherData,
  energyType,
  price,
  marketData,
  userPreferences
}: AIInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const marketInsights = await geminiService.getMarketInsights(
        weatherData,
        energyType,
        price
      );
      setInsights(marketInsights);
      
      // Check if the response contains our fallback data markers
      if (marketInsights.includes('## Market Trend Analysis') && 
          marketInsights.includes('## Price Impact of Current Weather')) {
        setUsingFallback(true);
      } else {
        setUsingFallback(false);
      }
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [weatherData, energyType, price]);

  const formatInsights = (text: string) => {
    // Split by markdown headers and format
    const sections = text.split(/(?=## )/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const [title, ...content] = section.split('\n');
      const cleanTitle = title.replace('## ', '');
      
      return (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-lg mb-2">{cleanTitle}</h3>
          <div className="pl-2">
            {content.map((line, i) => {
              if (line.startsWith('- ')) {
                return (
                  <div key={i} className="flex items-start mb-1">
                    <span className="mr-2">•</span>
                    <span>{line.substring(2)}</span>
                  </div>
                );
              }
              return <p key={i} className="mb-1">{line}</p>;
            })}
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Generating AI insights...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {usingFallback && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Using Estimated Data</AlertTitle>
            <AlertDescription>
              Real-time AI insights are currently unavailable. Showing estimated insights based on historical data.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          {formatInsights(insights)}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full"
          onClick={fetchInsights}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Refresh Insights
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 