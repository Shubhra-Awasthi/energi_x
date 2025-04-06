
import React from 'react';
import { SmartMeter } from '@/types/energy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SmartMeterSelectorProps {
  meters: SmartMeter[];
  selectedMeter: SmartMeter | null;
  onMeterSelect: (meterId: string) => void;
  isLoading: boolean;
}

const SmartMeterSelector: React.FC<SmartMeterSelectorProps> = ({
  meters,
  selectedMeter,
  onMeterSelect,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Your Smart Meters
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meters.map((meter) => (
              <div
                key={meter.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMeter?.id === meter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={() => onMeterSelect(meter.id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{meter.manufacturer} {meter.model}</h3>
                    <p className="text-sm opacity-90">{meter.location.address}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    meter.status === 'online'
                      ? 'bg-green-100 text-green-800'
                      : meter.status === 'offline'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meter.status}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <p>ID: {meter.deviceId}</p>
                  <p>Type: {meter.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartMeterSelector;
