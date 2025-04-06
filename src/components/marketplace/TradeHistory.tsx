import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TradeHistory: React.FC = () => {
  const { trades } = useMarketplace();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.slice(0, 10).map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>{formatDate(trade.createdAt)}</TableCell>
                <TableCell className="capitalize">{trade.source}</TableCell>
                <TableCell className="capitalize">{trade.type}</TableCell>
                <TableCell>{formatAmount(trade.amount)} kWh</TableCell>
                <TableCell>{formatPrice(trade.price)}</TableCell>
                <TableCell>{formatPrice(trade.price * trade.amount)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    trade.status === 'completed' ? 'bg-green-100 text-green-800' :
                    trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {trade.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TradeHistory; 