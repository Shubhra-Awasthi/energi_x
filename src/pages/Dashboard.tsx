import React from 'react';
import EnergyStatsCard from '@/components/dashboard/EnergyStatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useEnergy } from '@/context/EnergyContext';
import PowerConsumptionChart from '@/components/smart-meter/PowerConsumptionChart';
import EnergyDistributionChart from '@/components/analytics/EnergyDistributionChart';

const Dashboard: React.FC = () => {
  const { walletBalance } = useEnergy();

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="mb-6">
        <EnergyStatsCard />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Generation</CardTitle>
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
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Solar Generation</h3>
                  <p className="text-2xl font-bold">1.8 kW</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Wind Generation</h3>
                  <p className="text-2xl font-bold">0.5 kW</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Hydro Generation</h3>
                  <p className="text-2xl font-bold">0.2 kW</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consumption Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Consumption</h3>
                  <p className="text-2xl font-bold">2.5 kW</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Daily Usage</h3>
                  <p className="text-2xl font-bold">45 kWh</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Usage</h3>
                  <p className="text-2xl font-bold">1,250 kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
