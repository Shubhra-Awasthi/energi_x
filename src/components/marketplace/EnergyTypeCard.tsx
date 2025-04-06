import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplet, Flame, Leaf, Sun, Wind } from 'lucide-react';
import { WeatherInfo } from './WeatherInfo';
import { cn } from '@/lib/utils';

interface EnergyTypeCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  currentPrice: number;
  priceChange: number;
  availability: number;
  latitude?: number;
  longitude?: number;
  sourceType?: 'solar' | 'wind' | 'hydro';
}

export const EnergyTypeCard: React.FC<EnergyTypeCardProps> = ({
  name,
  icon,
  color,
  gradient,
  currentPrice,
  priceChange,
  availability,
  latitude,
  longitude,
  sourceType
}) => {
  // Choose icon based on name
  const renderIcon = () => {
    switch(name) {
      case 'sun':
        return <Sun size={24} />;
      case 'wind':
        return <Wind size={24} />;
      case 'droplet':
        return <Droplet size={24} />;
      case 'leaf':
        return <Leaf size={24} />;
      case 'flame':
        return <Flame size={24} />;
      default:
        return <Sun size={24} />;
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };

  return (
    <Card className={cn('overflow-hidden', gradient)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white">
          {icon}
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-white">
            {formatPrice(currentPrice)}
          </div>
          <div className={cn(
            'text-sm font-medium',
            priceChange >= 0 ? 'text-green-400' : 'text-red-400'
          )}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange)}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-white/80">Availability</div>
          <div className="text-lg font-semibold text-white">
            {formatPercentage(availability)}
          </div>
          <Progress value={availability} className="h-2" />
        </div>

        {latitude && longitude && sourceType && (
          <div className="pt-4 border-t border-white/20">
            <WeatherInfo
              latitude={latitude}
              longitude={longitude}
              sourceType={sourceType}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
