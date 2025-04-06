import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { EnergySource } from '@/types/marketplace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface TradeFormProps {
  type: 'buy' | 'sell';
}

const TradeForm: React.FC<TradeFormProps> = ({ type }) => {
  const { placeOrder } = useMarketplace();
  const [source, setSource] = useState<EnergySource>('solar');
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateAmount = (value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    if (numValue > 1000000) { // 1 MW limit
      setError('Amount cannot exceed 1,000,000 kWh');
      return false;
    }
    return true;
  };

  const validatePrice = (value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    if (numValue > 100) { // ₹100 per kWh limit
      setError('Price cannot exceed ₹100 per kWh');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateAmount(amount) || !validatePrice(price)) {
      return;
    }

    try {
      await placeOrder({
        type: type === 'buy' ? 'bid' : 'ask',
        source,
        amount: parseFloat(amount),
        price: parseFloat(price),
        userId: 'current-user-id', // TODO: Get from auth context
      });

      // Reset form
      setAmount('');
      setPrice('');
      setError('');
    } catch (error) {
      console.error('Failed to place order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="source">Energy Source</Label>
        <Select value={source} onValueChange={(value: EnergySource) => setSource(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select energy source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solar">Solar</SelectItem>
            <SelectItem value="wind">Wind</SelectItem>
            <SelectItem value="hydro">Hydro</SelectItem>
            <SelectItem value="biomass">Biomass</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (kWh)</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            validateAmount(e.target.value);
          }}
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price per kWh (₹)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            validatePrice(e.target.value);
          }}
          placeholder="Enter price"
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button type="submit" className="w-full">
        {type === 'buy' ? 'Buy Energy' : 'Sell Energy'}
      </Button>
    </form>
  );
};

export default TradeForm; 