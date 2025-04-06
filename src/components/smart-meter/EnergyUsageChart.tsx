
import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface EnergyDataPoint {
  date: string;
  consumption: number;
  generation: number;
  netUsage: number;
}

interface EnergyUsageChartProps {
  data: EnergyDataPoint[];
  isLoading: boolean;
  title: string;
}

const EnergyUsageChart: React.FC<EnergyUsageChartProps> = ({ data, isLoading, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: number) => [value.toFixed(2) + ' kWh']} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                name="Consumption"
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorConsumption)" 
              />
              <Area 
                type="monotone" 
                dataKey="generation" 
                name="Generation" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorGeneration)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyUsageChart;
