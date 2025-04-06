import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Activity, DollarSign } from 'lucide-react';

const MarketOverview: React.FC = () => {
  const { stats, prices } = useMarketplace();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-IN', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(volume);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Average Price</p>
                <p className="text-lg font-semibold">{formatPrice(stats.averagePrice)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">24h Volume</p>
                <p className="text-lg font-semibold">{formatVolume(stats.totalVolume)} kWh</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Active Trades</p>
                <p className="text-lg font-semibold">{stats.activeTrades}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {stats.priceChange24h >= 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <div>
                <p className="text-sm text-gray-500">24h Change</p>
                <p className={`text-lg font-semibold ${stats.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.priceChange24h >= 0 ? '+' : ''}{stats.priceChange24h}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MarketOverview; 