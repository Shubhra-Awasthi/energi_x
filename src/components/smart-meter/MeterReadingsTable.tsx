
import React from 'react';
import { format } from 'date-fns';
import { SmartMeterReading } from '@/types/energy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface MeterReadingsTableProps {
  readings: SmartMeterReading[];
  isLoading: boolean;
  limit?: number;
}

const MeterReadingsTable: React.FC<MeterReadingsTableProps> = ({ 
  readings, 
  isLoading,
  limit = 10
}) => {
  const displayReadings = readings.slice(0, limit);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Readings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Generation</TableHead>
                  <TableHead>Net Usage</TableHead>
                  <TableHead>Voltage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayReadings.map((reading) => (
                  <TableRow key={reading.id}>
                    <TableCell>
                      {format(new Date(reading.timestamp), 'yyyy-MM-dd HH:mm')}
                    </TableCell>
                    <TableCell>{reading.consumption.toFixed(2)} kWh</TableCell>
                    <TableCell>{reading.generation.toFixed(2)} kWh</TableCell>
                    <TableCell>{reading.netUsage.toFixed(2)} kWh</TableCell>
                    <TableCell>{reading.voltage} V</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        reading.gridStatus === 'connected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {reading.gridStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeterReadingsTable;
