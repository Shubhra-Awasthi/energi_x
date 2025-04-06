import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Sun, 
  Wind, 
  Droplet, 
  LineChart, 
  BarChart, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { useEnergy } from '@/context/EnergyContext';
import PowerConsumptionChart from '@/components/smart-meter/PowerConsumptionChart';
import EnergyDistributionChart from '@/components/analytics/EnergyDistributionChart';

const SmartMeterDashboard: React.FC = () => {
  const { walletBalance } = useEnergy();

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Smart Meter Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/discom-connection">Connect DISCOM</Link>
          </Button>
          <Button>View Analytics</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Power Consumption Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PowerConsumptionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <EnergyDistributionChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.5 kW</div>
            <p className="text-sm text-muted-foreground">Real-time power draw</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45 kWh</div>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,250 kWh</div>
            <p className="text-sm text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartMeterDashboard;
