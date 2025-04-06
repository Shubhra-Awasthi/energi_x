import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useEnergy } from '@/context/EnergyContext';
import TradingActivityChart from '@/components/analytics/TradingActivityChart';
import EnergyDistributionChart from '@/components/analytics/EnergyDistributionChart';

const Analytics: React.FC = () => {
  const { walletBalance } = useEnergy();

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trading">Trading History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <TradingActivityChart />
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

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Energy Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>Buy</TableCell>
                    <TableCell>Solar</TableCell>
                    <TableCell>100 kWh</TableCell>
                    <TableCell>$0.25/kWh</TableCell>
                    <TableCell>$25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-14</TableCell>
                    <TableCell>Sell</TableCell>
                    <TableCell>Wind</TableCell>
                    <TableCell>50 kWh</TableCell>
                    <TableCell>$0.30/kWh</TableCell>
                    <TableCell>$15.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-13</TableCell>
                    <TableCell>Buy</TableCell>
                    <TableCell>Hydro</TableCell>
                    <TableCell>75 kWh</TableCell>
                    <TableCell>$0.22/kWh</TableCell>
                    <TableCell>$16.50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Energy Traded</h3>
                  <p className="text-2xl font-bold">1,250 kWh</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Average Price</h3>
                  <p className="text-2xl font-bold">$0.28/kWh</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground">Trading Volume</h3>
                  <p className="text-2xl font-bold">$350.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
