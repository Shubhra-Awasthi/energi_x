export type EnergySource = 'solar' | 'wind' | 'hydro' | 'biomass';

export type TradeType = 'fixed' | 'auto-match' | 'subscription';

export interface EnergyPrice {
  source: EnergySource;
  price: number;
  timestamp: string;
  unit: 'kWh';
}

export interface Trade {
  id: string;
  sellerId: string;
  buyerId?: string;
  source: EnergySource;
  amount: number;
  price: number;
  type: TradeType;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface MarketStats {
  totalVolume: number;
  averagePrice: number;
  activeTrades: number;
  priceChange24h: number;
}

export interface OrderBook {
  bids: Order[];
  asks: Order[];
}

export interface Order {
  id: string;
  userId: string;
  type: 'bid' | 'ask';
  source: EnergySource;
  amount: number;
  price: number;
  timestamp: string;
  status: 'active' | 'filled' | 'cancelled';
} 