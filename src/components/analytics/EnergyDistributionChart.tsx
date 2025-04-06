import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Solar', value: 45 },
  { name: 'Wind', value: 30 },
  { name: 'Hydro', value: 15 },
  { name: 'Grid', value: 10 },
];

const COLORS = ['#FCD34D', '#60A5FA', '#34D399', '#94A3B8'];

const EnergyDistributionChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EnergyDistributionChart; 