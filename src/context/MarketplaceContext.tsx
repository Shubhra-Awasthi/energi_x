import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnergyPrice, Trade, MarketStats, OrderBook, Order } from '@/types/marketplace';

interface MarketplaceContextType {
  prices: EnergyPrice[];
  trades: Trade[];
  stats: MarketStats;
  orderBook: OrderBook;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  placeOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<EnergyPrice[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState<MarketStats>({
    totalVolume: 0,
    averagePrice: 0,
    activeTrades: 0,
    priceChange24h: 0,
  });
  const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      // Mock data with Indian-specific values
      const mockPrices: EnergyPrice[] = [
        { source: 'solar', price: 4.5, timestamp: new Date().toISOString(), unit: 'kWh' },
        { source: 'wind', price: 4.2, timestamp: new Date().toISOString(), unit: 'kWh' },
        { source: 'hydro', price: 3.8, timestamp: new Date().toISOString(), unit: 'kWh' },
        { source: 'biomass', price: 4.0, timestamp: new Date().toISOString(), unit: 'kWh' },
      ];
      setPrices(mockPrices);

      // Mock market stats
      setStats({
        totalVolume: 150000,
        averagePrice: 4.2,
        activeTrades: 45,
        priceChange24h: 2.5,
      });

      // Mock order book
      setOrderBook({
        bids: [
          { id: '1', userId: 'user1', type: 'bid', source: 'solar', amount: 1000, price: 4.4, timestamp: new Date().toISOString(), status: 'active' },
          { id: '2', userId: 'user2', type: 'bid', source: 'wind', amount: 2000, price: 4.3, timestamp: new Date().toISOString(), status: 'active' },
        ],
        asks: [
          { id: '3', userId: 'user3', type: 'ask', source: 'solar', amount: 1500, price: 4.6, timestamp: new Date().toISOString(), status: 'active' },
          { id: '4', userId: 'user4', type: 'ask', source: 'wind', amount: 2500, price: 4.7, timestamp: new Date().toISOString(), status: 'active' },
        ],
      });

      // Mock trades
      setTrades([
        {
          id: '1',
          sellerId: 'user3',
          buyerId: 'user1',
          source: 'solar',
          amount: 1000,
          price: 4.5,
          type: 'fixed',
          status: 'completed',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '2',
          sellerId: 'user4',
          buyerId: 'user2',
          source: 'wind',
          amount: 2000,
          price: 4.2,
          type: 'auto-match',
          status: 'completed',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ]);
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const placeOrder = async (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
    try {
      // TODO: Implement API call to place order
      console.log('Placing order:', order);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
      throw err;
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      // TODO: Implement API call to cancel order
      console.log('Cancelling order:', orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
      throw err;
    }
  };

  useEffect(() => {
    refreshData();
    // Set up WebSocket connection for real-time updates
    // TODO: Implement WebSocket connection
    return () => {
      // Cleanup WebSocket connection
    };
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        prices,
        trades,
        stats,
        orderBook,
        loading,
        error,
        refreshData,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}; 