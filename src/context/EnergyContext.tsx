import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EnergyListing, 
  Transaction, 
  WalletBalance, 
  UserStats, 
  EnergyPrediction,
  SmartMeter,
  SmartMeterReading,
  DiscomInfo,
  GridConnection,
  EnergySettlement
} from '@/types/energy';
import { 
  generateMockListings, 
  generateMockTransactions, 
  generateMockPredictions, 
  energyTypeData,
  generateUserChartData,
  generateMockSmartMeters,
  generateMockMeterReadings,
  generateMockDiscomInfo,
  generateMockGridConnections,
  generateMockSettlements
} from '@/lib/mock-data';
import { toast } from "@/components/ui/use-toast";
import { Sun, Wind, Droplet, Flame, Leaf } from 'lucide-react';

interface EnergyType {
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

type EnergyContextType = {
  listings: EnergyListing[];
  transactions: Transaction[];
  walletBalance: WalletBalance;
  userStats: UserStats;
  predictions: EnergyPrediction[];
  isLoading: boolean;
  buyEnergy: (listingId: string, quantity: number) => Promise<boolean>;
  sellEnergy: (listing: Partial<EnergyListing>) => Promise<boolean>;
  refreshMarketData: () => void;
  energyTypes: EnergyType[];
  userChartData: ReturnType<typeof generateUserChartData>;
  
  smartMeters: SmartMeter[];
  selectedMeter: SmartMeter | null;
  meterReadings: SmartMeterReading[];
  discomInfo: DiscomInfo[];
  gridConnections: GridConnection[];
  energySettlements: EnergySettlement[];
  
  selectSmartMeter: (meterId: string) => void;
  fetchMeterReadings: (meterId: string, days: number) => void;
  applyForGridConnection: (meterId: string, discomId: string) => Promise<boolean>;
  refreshSmartMeterData: () => void;
  error: string | null;
};

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};

export const EnergyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<EnergyListing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletBalance, setWalletBalance] = useState<WalletBalance>({
    available: 5000,
    pending: 0,
    currency: 'USD'
  });
  const [userStats, setUserStats] = useState<UserStats>({
    energyBought: 2450,
    energySold: 1200,
    co2Offset: 1850,
    savingsToDate: 320.50,
    transactions: 15
  });
  const [predictions, setPredictions] = useState<EnergyPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userChartData, setUserChartData] = useState(generateUserChartData());
  const [error, setError] = useState<string | null>(null);
  
  const [smartMeters, setSmartMeters] = useState<SmartMeter[]>([]);
  const [selectedMeter, setSelectedMeter] = useState<SmartMeter | null>(null);
  const [meterReadings, setMeterReadings] = useState<SmartMeterReading[]>([]);
  const [discomInfo, setDiscomInfo] = useState<DiscomInfo[]>([]);
  const [gridConnections, setGridConnections] = useState<GridConnection[]>([]);
  const [energySettlements, setEnergySettlements] = useState<EnergySettlement[]>([]);

  const energyTypes: EnergyType[] = [
    {
      name: 'Solar',
      icon: <Sun className="h-6 w-6" />,
      color: '#FFB800',
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      currentPrice: 4.50,
      priceChange: 2.5,
      availability: 85,
      latitude: 28.6139,  // Delhi coordinates
      longitude: 77.2090,
      sourceType: 'solar'
    },
    {
      name: 'Wind',
      icon: <Wind className="h-6 w-6" />,
      color: '#00B8D9',
      gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      currentPrice: 5.20,
      priceChange: -1.2,
      availability: 65,
      latitude: 19.0760,  // Mumbai coordinates
      longitude: 72.8777,
      sourceType: 'wind'
    },
    {
      name: 'Hydro',
      icon: <Droplet className="h-6 w-6" />,
      color: '#0066CC',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      currentPrice: 3.80,
      priceChange: 0.8,
      availability: 90,
      latitude: 12.9716,  // Bangalore coordinates
      longitude: 77.5946,
      sourceType: 'hydro'
    },
    {
      name: 'Biomass',
      icon: <Leaf className="h-6 w-6" />,
      color: '#00C853',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      currentPrice: 4.20,
      priceChange: 1.5,
      availability: 75,
      latitude: 22.5726,  // Kolkata coordinates
      longitude: 88.3639,
      sourceType: 'solar'  // Using solar as default for biomass
    },
    {
      name: 'Natural Gas',
      icon: <Flame className="h-6 w-6" />,
      color: '#FF5252',
      gradient: 'bg-gradient-to-br from-red-500 to-pink-600',
      currentPrice: 6.50,
      priceChange: -0.5,
      availability: 95,
      latitude: 13.0827,  // Chennai coordinates
      longitude: 80.2707,
      sourceType: 'solar'  // Using solar as default for natural gas
    }
  ];

  useEffect(() => {
    refreshMarketData();
    refreshSmartMeterData();
  }, []);

  const refreshMarketData = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    setTimeout(() => {
      setListings(generateMockListings(20));
      setTransactions(generateMockTransactions(10));
      setPredictions(generateMockPredictions(24));
      setUserChartData(generateUserChartData());
      setIsLoading(false);
    }, 800);
  };

  const buyEnergy = async (listingId: string, quantity: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const listing = listings.find(l => l.id === listingId);
      if (!listing) throw new Error("Listing not found");
      
      if (listing.quantity < quantity) {
        throw new Error("Not enough energy available");
      }
      
      const totalCost = listing.price * quantity;
      
      if (walletBalance.available < totalCost) {
        throw new Error("Insufficient funds in wallet");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update balances
      setWalletBalance(prev => ({
        ...prev,
        available: +(prev.available - totalCost).toFixed(2)
      }));
      
      // Create new transaction
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substring(2, 15),
        buyerId: "current-user",
        sellerId: listing.sellerId,
        listingId: listing.id,
        quantity: quantity,
        unitPrice: listing.price,
        totalPrice: totalCost,
        timestamp: new Date(),
        status: 'completed'
      };
      
      // Update listings
      setListings(prevListings =>
        prevListings.map(l => {
          if (l.id === listingId) {
            return {
              ...l,
              quantity: l.quantity - quantity
            };
          }
          return l;
        }).filter(l => l.quantity > 0)
      );
      
      // Add transaction
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update user stats
      setUserStats(prev => ({
        ...prev,
        energyBought: prev.energyBought + quantity,
        co2Offset: prev.co2Offset + (listing.co2Offset / listing.quantity) * quantity,
        savingsToDate: +(prev.savingsToDate + totalCost * 0.1).toFixed(2),
        transactions: prev.transactions + 1
      }));
      
      toast({
        title: "Purchase Successful",
        description: `You purchased ${quantity} kWh of ${listing.source} energy for $${totalCost.toFixed(2)}`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const sellEnergy = async (listingData: Partial<EnergyListing>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      if (!listingData.quantity || !listingData.price || !listingData.source) {
        throw new Error("Missing required listing data");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newListing: EnergyListing = {
        id: Math.random().toString(36).substring(2, 15),
        sellerId: "current-user",
        sellerName: "You",
        source: listingData.source,
        quantity: listingData.quantity,
        unit: 'kWh',
        price: listingData.price,
        location: listingData.location || "Your Location",
        timestamp: new Date(),
        co2Offset: listingData.quantity * 0.5
      };
      
      // Add to listings
      setListings(prev => [newListing, ...prev]);
      
      // Update user stats
      setUserStats(prev => ({
        ...prev,
        energySold: prev.energySold + listingData.quantity!,
      }));
      
      toast({
        title: "Listing Created",
        description: `You've listed ${listingData.quantity} kWh of ${listingData.source} energy at $${listingData.price}/kWh`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Listing Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const refreshSmartMeterData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const meters = generateMockSmartMeters(3);
      setSmartMeters(meters);
      
      if (meters.length > 0) {
        const defaultMeter = meters[0];
        setSelectedMeter(defaultMeter);
        
        const readings = generateMockMeterReadings(defaultMeter.id, 7);
        setMeterReadings(readings);
        
        if (readings.length > 0) {
          defaultMeter.lastReading = readings[0];
        }
      }
      
      const discomData = generateMockDiscomInfo();
      setDiscomInfo(discomData);
      
      if (meters.length > 0 && discomData.length > 0) {
        const connection = generateMockGridConnections(meters[0].id, discomData[0].id);
        setGridConnections([connection]);
        
        const settlements = generateMockSettlements(connection.id, 6);
        setEnergySettlements(settlements);
      }
      
      setIsLoading(false);
    }, 800);
  };

  const selectSmartMeter = (meterId: string) => {
    const meter = smartMeters.find(m => m.id === meterId);
    if (!meter) {
      toast({
        title: "Error",
        description: "Smart meter not found",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedMeter(meter);
    fetchMeterReadings(meterId, 7);
    
    const meterConnections = gridConnections.filter(conn => conn.meterId === meterId);
    
    if (meterConnections.length > 0) {
      const connectionSettlements = generateMockSettlements(meterConnections[0].id, 6);
      setEnergySettlements(connectionSettlements);
    } else {
      setEnergySettlements([]);
    }
  };

  const fetchMeterReadings = (meterId: string, days: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const readings = generateMockMeterReadings(meterId, days);
      setMeterReadings(readings);
      
      if (selectedMeter && readings.length > 0) {
        setSelectedMeter({
          ...selectedMeter,
          lastReading: readings[0]
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  const applyForGridConnection = async (meterId: string, discomId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const existingConnection = gridConnections.find(
        conn => conn.meterId === meterId && conn.discomId === discomId
      );
      
      if (existingConnection) {
        throw new Error("A connection request already exists for this meter and DISCOM");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConnection = generateMockGridConnections(meterId, discomId);
      newConnection.approvalStatus = 'pending';
      
      setGridConnections(prev => [...prev, newConnection]);
      
      toast({
        title: "Application Submitted",
        description: `Your grid connection application has been submitted to the DISCOM for review.`,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Application Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <EnergyContext.Provider 
      value={{
        listings,
        transactions,
        walletBalance,
        userStats,
        predictions,
        isLoading,
        buyEnergy,
        sellEnergy,
        refreshMarketData,
        energyTypes,
        userChartData,
        
        smartMeters,
        selectedMeter,
        meterReadings,
        discomInfo,
        gridConnections,
        energySettlements,
        
        selectSmartMeter,
        fetchMeterReadings,
        applyForGridConnection,
        refreshSmartMeterData,
        error
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};
