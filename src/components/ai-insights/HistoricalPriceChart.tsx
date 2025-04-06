
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { 
  generateHistoricalPriceData, 
  timeframeOptions, 
  ChartTimeframe 
} from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart } from 'lucide-react';

const HistoricalPriceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('30d');
  const data = generateHistoricalPriceData(30);

  const handleTabChange = (value: string) => {
    setTimeframe(value as ChartTimeframe);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Historical Energy Prices
          </CardTitle>
          <Tabs value={timeframe} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-5 h-8">
              {timeframeOptions.map((option) => (
                <TabsTrigger 
                  key={option.value} 
                  value={option.value}
                  className="text-xs h-7"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data[0].data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="x" 
              stroke="#888888" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#888888' }}
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#888888' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: any) => [`$${value}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <defs>
              <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="hydroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke="#FBBF24"
              fill="url(#solarGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalPriceChart;
