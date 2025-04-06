
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnergy } from '@/context/EnergyContext';
import { CircleDollarSign, ZapOff, BarChart, Zap } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}> = ({ title, value, icon, description, trend, trendValue }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
          }`}>
            {trend === 'up' && <span className="mr-1">↑</span>}
            {trend === 'down' && <span className="mr-1">↓</span>}
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const EnergyStatsCard: React.FC = () => {
  const { userStats, walletBalance } = useEnergy();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Energy Traded"
        value={`${(userStats.energyBought + userStats.energySold).toLocaleString()} kWh`}
        icon={<Zap />}
        description="Lifetime energy traded"
      />
      <StatCard
        title="CO₂ Offset"
        value={`${userStats.co2Offset.toLocaleString()} kg`}
        icon={<ZapOff />}
        description="Total carbon emissions avoided"
        trend="up"
        trendValue="12.5% from last month"
      />
      <StatCard
        title="Wallet Balance"
        value={`$${walletBalance.available.toLocaleString()}`}
        icon={<CircleDollarSign />}
        description="Available for trading"
      />
      <StatCard
        title="Savings to Date"
        value={`$${userStats.savingsToDate.toLocaleString()}`}
        icon={<BarChart />}
        description="Compared to grid power"
        trend="up"
        trendValue="8.3% from last month"
      />
    </div>
  );
};

export default EnergyStatsCard;
