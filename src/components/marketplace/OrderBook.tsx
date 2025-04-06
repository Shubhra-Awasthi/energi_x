import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrderBook: React.FC = () => {
  const { orderBook } = useMarketplace();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Sell Orders</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.asks.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-red-500">{formatPrice(order.price)}</TableCell>
                    <TableCell>{formatAmount(order.amount)} kWh</TableCell>
                    <TableCell>{formatPrice(order.price * order.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Buy Orders</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBook.bids.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-green-500">{formatPrice(order.price)}</TableCell>
                    <TableCell>{formatAmount(order.amount)} kWh</TableCell>
                    <TableCell>{formatPrice(order.price * order.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook; 