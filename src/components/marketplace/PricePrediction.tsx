import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { geminiService } from '@/services/ai/geminiService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PricePredictionProps {
  energyType: string;
  currentPrice: number;
  historicalData?: any;
  weatherForecast?: any;
}

export function PricePrediction({
  energyType,
  currentPrice,
  historicalData,
  weatherForecast
}: PricePredictionProps) {
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const pricePrediction = await geminiService.getPricePrediction(
        energyType,
        historicalData || [],
        weatherForecast || {}
      );
      setPrediction(pricePrediction);
      
      // Check if the response contains our fallback data markers
      if (pricePrediction.includes('## Price Trend Prediction') && 
          pricePrediction.includes('## Expected Price Range')) {
        setUsingFallback(true);
      } else {
        setUsingFallback(false);
      }
    } catch (err) {
      console.error('Error fetching price prediction:', err);
      setError('Failed to generate price prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, [energyType, currentPrice, historicalData, weatherForecast]);

  const formatPrediction = (text: string) => {
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
          <p>Generating price prediction...</p>
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
          <TrendingUp className="h-5 w-5 text-green-500" />
          24-Hour Price Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        {usingFallback && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Using Estimated Data</AlertTitle>
            <AlertDescription>
              Real-time AI predictions are currently unavailable. Showing estimated predictions based on historical data.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          {formatPrediction(prediction)}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 w-full"
          onClick={fetchPrediction}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-4 w-4" />
              Refresh Prediction
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 