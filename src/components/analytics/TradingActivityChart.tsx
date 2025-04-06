import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { date: '2024-03-01', buy: 120, sell: 80 },
  { date: '2024-03-02', buy: 150, sell: 100 },
  { date: '2024-03-03', buy: 180, sell: 120 },
  { date: '2024-03-04', buy: 200, sell: 150 },
  { date: '2024-03-05', buy: 220, sell: 180 },
  { date: '2024-03-06', buy: 250, sell: 200 },
  { date: '2024-03-07', buy: 280, sell: 220 },
  { date: '2024-03-08', buy: 300, sell: 250 },
  { date: '2024-03-09', buy: 320, sell: 280 },
  { date: '2024-03-10', buy: 350, sell: 300 },
];

const TradingActivityChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value: number) => [`${value} kWh`]} />
        <Legend />
        <Area
          type="monotone"
          dataKey="buy"
          name="Buy"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorBuy)"
        />
        <Area
          type="monotone"
          dataKey="sell"
          name="Sell"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#colorSell)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TradingActivityChart; 