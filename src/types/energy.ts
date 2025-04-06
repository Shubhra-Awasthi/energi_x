
export type EnergySource = 'solar' | 'wind' | 'hydro' | 'biomass' | 'geothermal';

export type EnergyUnit = 'kWh';

export interface EnergyPrice {
  value: number;
  currency: string;
  trend: 'up' | 'down' | 'stable';
  percentChange: number;
}

export interface EnergyListing {
  id: string;
  sellerId: string;
  sellerName: string;
  source: EnergySource;
  quantity: number;
  unit: EnergyUnit;
  price: number;
  location: string;
  timestamp: Date;
  co2Offset: number;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletBalance {
  available: number;
  pending: number;
  currency: string;
}

export interface UserStats {
  energyBought: number;
  energySold: number;
  co2Offset: number;
  savingsToDate: number;
  transactions: number;
}

export interface EnergyPrediction {
  timestamp: Date;
  predictedPrice: number;
  confidence: number;
  recommendation: 'buy' | 'sell' | 'hold';
}

export interface ChartDataPoint {
  x: string | number;
  y: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
}

// Phase 2: Smart Meter Integration

export interface SmartMeter {
  id: string;
  userId: string;
  deviceId: string;
  manufacturer: string;
  model: string;
  installationDate: Date;
  lastReading: SmartMeterReading | null;
  status: 'online' | 'offline' | 'maintenance';
  location: {
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  type: 'residential' | 'commercial' | 'industrial';
}

export interface SmartMeterReading {
  id: string;
  meterId: string;
  timestamp: Date;
  consumption: number;
  generation: number;
  netUsage: number;
  unit: EnergyUnit;
  peakDemand: number;
  voltage: number;
  gridStatus: 'connected' | 'island-mode';
}

// Phase 2: DISCOM Integration

export interface DiscomInfo {
  id: string;
  name: string;
  code: string;
  region: string;
  contactEmail: string;
  contactPhone: string;
  servingAreas: string[];
  connectionStatus: 'active' | 'pending' | 'inactive';
}

export interface GridConnection {
  id: string;
  userId: string;
  meterId: string;
  discomId: string;
  connectionType: 'net-metering' | 'gross-metering' | 'virtual-net-metering';
  approvalStatus: 'approved' | 'pending' | 'rejected';
  maxExportCapacity: number;
  applicationDate: Date;
  approvalDate?: Date;
  contractEndDate?: Date;
  monthlyFees: number;
}

export interface EnergySettlement {
  id: string;
  gridConnectionId: string;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  energyImported: number;
  energyExported: number;
  netEnergy: number;
  importRate: number;
  exportRate: number;
  netAmount: number;
  currency: string;
  status: 'calculated' | 'invoiced' | 'paid';
  paymentDueDate?: Date;
  paymentCompletedDate?: Date;
}
