
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useEnergy } from '@/context/EnergyContext';
import { Activity, TrendingDown, TrendingUp, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AIEnergyPredictions: React.FC = () => {
  const { predictions } = useEnergy();
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const chartData = predictions.map((pred, index) => {
    const hour = pred.timestamp.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return {
      name: `${hour12} ${ampm}`,
      price: pred.predictedPrice,
      confidence: pred.confidence * 100,
      recommendation: pred.recommendation,
      index,
    };
  });

  const handleMouseMove = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setSelectedHour(data.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setSelectedHour(null);
  };

  const currentPrediction = selectedHour !== null ? predictions[selectedHour] : null;
  const currentAvgPrice = 3.5; // Current market average price

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between gap-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            AI Price Predictions
          </CardTitle>
        </div>
        {currentPrediction && (
          <div className="flex flex-col items-end">
            <Badge variant={
              currentPrediction.recommendation === 'buy' ? "default" :
              currentPrediction.recommendation === 'sell' ? "destructive" :
              "outline"
            }>
              {currentPrediction.recommendation === 'buy' && <TrendingDown className="mr-1 h-3 w-3" />}
              {currentPrediction.recommendation === 'sell' && <TrendingUp className="mr-1 h-3 w-3" />}
              {currentPrediction.recommendation === 'hold' && <Activity className="mr-1 h-3 w-3" />}
              Recommendation: {currentPrediction.recommendation.toUpperCase()}
            </Badge>
            <div className="text-sm text-muted-foreground mt-1">
              Confidence: {currentPrediction.confidence.toFixed(0)}%
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 10,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: any) => [`$${value}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <ReferenceLine 
              y={currentAvgPrice} 
              stroke="#ff0000" 
              strokeDasharray="3 3"
              label={{ value: 'Current Avg', position: 'left', fill: '#ff0000', fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, fill: "#10B981", stroke: "#10B981" }}
              activeDot={{ r: 8, fill: "#10B981", stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="px-6 pb-6">
        <div className="bg-muted p-4 rounded-md">
          <h4 className="font-medium mb-2">AI Insight</h4>
          <p className="text-sm text-muted-foreground">
            {currentPrediction ? (
              <>
                {currentPrediction.recommendation === 'buy' && (
                  <>
                    Energy prices are expected to <span className="font-medium text-green-600">drop to ${currentPrediction.predictedPrice.toFixed(2)}</span> at {chartData[selectedHour!].name}. 
                    This is a good opportunity to buy energy at a lower price than the current average of ${currentAvgPrice.toFixed(2)}.
                  </>
                )}
                {currentPrediction.recommendation === 'sell' && (
                  <>
                    Energy prices are expected to <span className="font-medium text-red-600">rise to ${currentPrediction.predictedPrice.toFixed(2)}</span> at {chartData[selectedHour!].name}. 
                    Consider selling your energy now to take advantage of higher prices.
                  </>
                )}
                {currentPrediction.recommendation === 'hold' && (
                  <>
                    Energy prices are expected to remain <span className="font-medium">stable around ${currentPrediction.predictedPrice.toFixed(2)}</span> at {chartData[selectedHour!].name}. 
                    The market is currently balanced, so no urgent action is needed.
                  </>
                )}
              </>
            ) : (
              <>
                Hover over the chart to see AI price predictions and recommendations for different times of the day. 
                Our AI analyzes weather patterns, grid demand, and historical trends to provide accurate forecasts.
              </>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AIEnergyPredictions;
