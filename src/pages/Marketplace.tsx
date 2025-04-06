import React, { useEffect, useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useEnergy } from '@/context/EnergyContext';
import { MarketOverview, OrderBook, TradeForm, TradeHistory } from '@/components/marketplace';
import MarketListings from '@/components/marketplace/MarketListings';
import SellEnergyForm from '@/components/marketplace/SellEnergyForm';
import { EnergyTypeCard } from '@/components/marketplace/EnergyTypeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { weatherService } from '@/services/weather/weatherService';
import { WeatherData } from '@/types/weather';
import { Droplet, Flame, Leaf, Sun, Wind } from 'lucide-react';

const Marketplace: React.FC = () => {
  const { loading: marketLoading, error: marketError, refreshData } = useMarketplace();
  const { energyTypes, refreshMarketData, isLoading: energyLoading } = useEnergy();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Using Delhi coordinates as an example
        const data = await weatherService.getCurrentWeather(28.6139, 77.2090);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (marketLoading || energyLoading) {
    return (
      <div className="container py-8">
        <div>Loading marketplace data...</div>
      </div>
    );
  }

  if (marketError) {
    return (
      <div className="container py-8">
        <div>Error: {marketError}</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Energy Marketplace</h1>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={refreshMarketData}
            disabled={energyLoading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Market Data
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={refreshData}
            disabled={marketLoading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Trading Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trading" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trading">Trading Platform</TabsTrigger>
          <TabsTrigger value="listings">Energy Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketOverview />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trade Energy</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy">
                    <TabsList>
                      <TabsTrigger value="buy">Buy</TabsTrigger>
                      <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy">
                      <TradeForm type="buy" />
                    </TabsContent>
                    <TabsContent value="sell">
                      <TradeForm type="sell" />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <OrderBook />
            </div>
          </div>

          <div>
            <TradeHistory />
          </div>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Energy Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EnergyTypeCard
                  name="Solar Energy"
                  icon={<Sun className="h-6 w-6" />}
                  color="text-yellow-500"
                  gradient="bg-gradient-to-br from-yellow-500 to-orange-500"
                  currentPrice={4.25}
                  priceChange={2.5}
                  availability={85}
                  latitude={28.6139}
                  longitude={77.2090}
                  sourceType="solar"
                />
                <EnergyTypeCard
                  name="Wind Energy"
                  icon={<Wind className="h-6 w-6" />}
                  color="text-blue-500"
                  gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                  currentPrice={3.75}
                  priceChange={-1.2}
                  availability={65}
                  latitude={28.6139}
                  longitude={77.2090}
                  sourceType="wind"
                />
                <EnergyTypeCard
                  name="Hydro Energy"
                  icon={<Droplet className="h-6 w-6" />}
                  color="text-blue-400"
                  gradient="bg-gradient-to-br from-blue-400 to-indigo-500"
                  currentPrice={3.50}
                  priceChange={0.8}
                  availability={90}
                  latitude={28.6139}
                  longitude={77.2090}
                  sourceType="hydro"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
              <SellEnergyForm />
            </div>
            <div className="lg:col-span-2">
              <MarketListings />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;
