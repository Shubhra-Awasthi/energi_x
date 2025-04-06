import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { time: '00:00', consumption: 1.2, generation: 0 },
  { time: '03:00', consumption: 1.0, generation: 0 },
  { time: '06:00', consumption: 1.5, generation: 0.2 },
  { time: '09:00', consumption: 2.2, generation: 1.8 },
  { time: '12:00', consumption: 2.5, generation: 2.2 },
  { time: '15:00', consumption: 2.3, generation: 1.9 },
  { time: '18:00', consumption: 2.8, generation: 0.5 },
  { time: '21:00', consumption: 2.0, generation: 0 },
];

const PowerConsumptionChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value: number) => [`${value} kW`]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="consumption"
          name="Consumption"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="generation"
          name="Generation"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PowerConsumptionChart; 