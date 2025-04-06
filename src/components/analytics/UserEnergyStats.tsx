
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart as BarChartIcon,
  CircleDollarSign,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useEnergy } from '@/context/EnergyContext';
import { energyTypeData } from '@/lib/mock-data';

const COLORS = ['#FBBF24', '#3B82F6', '#06B6D4', '#10B981', '#EC4899'];

const UserEnergyStats: React.FC = () => {
  const { userChartData } = useEnergy();

  const renderEnergySourcesPieChart = () => (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={userChartData.energySources}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {userChartData.energySources.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value}%`, 'Percentage']}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderSavingsChart = () => (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={userChartData.savingsHistory[0].data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value: any) => [`$${value}`, 'Savings']} />
        <Bar dataKey="y" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Energy Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderEnergySourcesPieChart()}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5" />
            Monthly Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderSavingsChart()}
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5" />
            Daily Energy Consumption
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={userChartData.dailyConsumption[0].data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis tickFormatter={(value) => `${value} kWh`} />
              <Tooltip formatter={(value: any) => [`${value} kWh`, 'Consumption']} />
              <Bar dataKey="y" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEnergyStats;
