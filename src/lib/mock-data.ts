import { 
  EnergyListing, 
  Transaction, 
  EnergyPrediction, 
  ChartDataPoint, 
  ChartSeries,
  SmartMeter,
  SmartMeterReading,
  DiscomInfo,
  GridConnection,
  EnergySettlement
} from "@/types/energy";

// Generate random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate random date within the last 7 days
const generateRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 7));
  return date;
};

// Generate future date for predictions
const generateFutureDate = (hoursAhead: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursAhead);
  return date;
};

// Energy sources with weights
const energySources = [
  { source: 'solar', weight: 0.5 },
  { source: 'wind', weight: 0.3 },
  { source: 'hydro', weight: 0.1 },
  { source: 'biomass', weight: 0.05 },
  { source: 'geothermal', weight: 0.05 }
];

// Get weighted random energy source
const getRandomEnergySource = () => {
  const rand = Math.random();
  let sum = 0;
  for (const item of energySources) {
    sum += item.weight;
    if (rand < sum) return item.source;
  }
  return energySources[0].source;
};

// Sample seller names
const sellerNames = [
  "SolarTech Industries",
  "WindPower Solutions",
  "GreenEnergy Co.",
  "EcoElectric",
  "SunHarvest Power",
  "WindFlow Energy",
  "HydroGen Systems",
  "BioMass Innovations",
  "GeoTherm Solutions",
  "CleanCurrent Energy"
];

// Sample locations
const locations = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Surat, Gujarat",
  "Kolkata, West Bengal"
];

// Generate mock energy listings
export const generateMockListings = (count: number): EnergyListing[] => {
  return Array.from({ length: count }, () => {
    const source = getRandomEnergySource();
    const quantity = Math.floor(Math.random() * 1000) + 100; // Between 100 and 1100 kWh
    const basePrice = source === 'solar' ? 3.2 : 
                     source === 'wind' ? 3.5 :
                     source === 'hydro' ? 4.0 :
                     source === 'biomass' ? 4.2 : 4.5; // Geothermal
    
    // Apply small random variation to base price
    const price = +(basePrice + (Math.random() - 0.5)).toFixed(2);
    
    return {
      id: generateId(),
      sellerId: generateId(),
      sellerName: sellerNames[Math.floor(Math.random() * sellerNames.length)],
      source: source as any,
      quantity,
      unit: 'kWh',
      price,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: generateRecentDate(),
      co2Offset: quantity * (source === 'solar' ? 0.5 : 0.4)
    };
  });
};

// Generate mock transactions
export const generateMockTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, () => {
    const quantity = Math.floor(Math.random() * 500) + 50;
    const unitPrice = +(Math.random() * 2 + 2).toFixed(2);
    const totalPrice = +(quantity * unitPrice).toFixed(2);
    
    return {
      id: generateId(),
      buyerId: generateId(),
      sellerId: generateId(),
      listingId: generateId(),
      quantity,
      unitPrice,
      totalPrice,
      timestamp: generateRecentDate(),
      status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'failed')
    };
  });
};

// Generate mock energy price predictions
export const generateMockPredictions = (hoursAhead: number): EnergyPrediction[] => {
  const basePrice = 3.5;
  return Array.from({ length: hoursAhead }, (_, i) => {
    // Create small price variations with some trend
    const hourOfDay = (new Date().getHours() + i) % 24;
    
    // Prices tend to be higher during peak hours (morning and evening)
    let timeOfDayFactor = 1;
    if (hourOfDay >= 7 && hourOfDay <= 10) timeOfDayFactor = 1.2; // Morning peak
    if (hourOfDay >= 18 && hourOfDay <= 22) timeOfDayFactor = 1.3; // Evening peak
    if (hourOfDay >= 0 && hourOfDay <= 5) timeOfDayFactor = 0.8;  // Night low
    
    const randomVariation = (Math.random() - 0.5) * 0.4;
    const predictedPrice = +(basePrice * timeOfDayFactor + randomVariation).toFixed(2);
    
    // Higher confidence for near-term predictions
    const confidence = Math.max(0.5, 0.95 - (i / hoursAhead) * 0.45);
    
    // Simple recommendation logic
    let recommendation: 'buy' | 'sell' | 'hold';
    if (predictedPrice < basePrice * 0.95) recommendation = 'buy';
    else if (predictedPrice > basePrice * 1.05) recommendation = 'sell';
    else recommendation = 'hold';
    
    return {
      timestamp: generateFutureDate(i + 1),
      predictedPrice,
      confidence,
      recommendation
    };
  });
};

// Generate historical price data for charts
export const generateHistoricalPriceData = (days: number): ChartSeries[] => {
  const solarData = [];
  const windData = [];
  const hydroData = [];
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Base prices with small random variations
    const solarBasePrice = 3.2;
    const windBasePrice = 3.5;
    const hydroBasePrice = 4.0;
    
    // Add some randomness but maintain a general downward trend for renewables
    const trendFactor = 1 - (i / (days * 2)); // Slight downward trend
    const randomFactor = (Math.random() - 0.5) * 0.3;
    
    solarData.push({
      x: dateStr,
      y: +(solarBasePrice * trendFactor + randomFactor).toFixed(2)
    });
    
    windData.push({
      x: dateStr,
      y: +(windBasePrice * trendFactor + randomFactor).toFixed(2)
    });
    
    hydroData.push({
      x: dateStr,
      y: +(hydroBasePrice * trendFactor + randomFactor).toFixed(2)
    });
  }
  
  return [
    { name: "Solar", data: solarData },
    { name: "Wind", data: windData },
    { name: "Hydro", data: hydroData }
  ];
};

// Generate user chart data
export interface UserChartData {
  dailyConsumption: ChartSeries[];
  energySources: { name: string; value: number }[];
  savingsHistory: ChartSeries[];
}

export const generateUserChartData = (): UserChartData => {
  // Daily consumption for last 30 days
  const consumptionData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      x: date.toISOString().split('T')[0],
      y: Math.floor(Math.random() * 15) + 5 // 5-20 kWh per day
    };
  });
  
  // Energy sources breakdown
  const energySources = [
    { name: "Solar", value: 45 },
    { name: "Wind", value: 30 },
    { name: "Hydro", value: 15 },
    { name: "Biomass", value: 7 },
    { name: "Geothermal", value: 3 }
  ];
  
  // Savings history for last 6 months
  const savingsData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthName = date.toLocaleString('default', { month: 'short' });
    return {
      x: monthName,
      y: Math.floor(Math.random() * 500) + 300 // $300-800 savings per month
    };
  });
  
  return {
    dailyConsumption: [{ name: "Consumption", data: consumptionData }],
    energySources,
    savingsHistory: [{ name: "Savings", data: savingsData }]
  };
};

// Mock data for different energy source types
export interface EnergyTypeData {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  currentPrice: number;
  priceChange: number; // percentage
  availability: number; // percentage
  description: string;
}

export const energyTypeData: EnergyTypeData[] = [
  {
    name: "Solar",
    icon: "sun",
    color: "#FBBF24",
    gradient: "from-yellow-400 to-orange-500",
    currentPrice: 3.24,
    priceChange: -2.1,
    availability: 85,
    description: "Energy harnessed from the sun using photovoltaic panels."
  },
  {
    name: "Wind",
    icon: "wind",
    color: "#3B82F6",
    gradient: "from-blue-400 to-blue-600",
    currentPrice: 3.45,
    priceChange: -1.5,
    availability: 78,
    description: "Clean energy generated by wind turbines converting kinetic energy."
  },
  {
    name: "Hydro",
    icon: "droplet",
    color: "#06B6D4",
    gradient: "from-cyan-400 to-cyan-600",
    currentPrice: 3.89,
    priceChange: -0.8,
    availability: 92,
    description: "Renewable energy from flowing water in rivers and reservoirs."
  },
  {
    name: "Biomass",
    icon: "leaf",
    color: "#10B981",
    gradient: "from-green-400 to-green-600",
    currentPrice: 4.12,
    priceChange: 0.3,
    availability: 65,
    description: "Energy from organic materials like plants and agricultural waste."
  },
  {
    name: "Geothermal",
    icon: "flame",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-500",
    currentPrice: 4.50,
    priceChange: -0.5,
    availability: 70,
    description: "Heat energy generated and stored beneath the Earth's surface."
  }
];

// Types for price history
export type ChartTimeframe = '24h' | '7d' | '30d' | '90d' | '1y';
export interface TimeframeOption {
  label: string;
  value: ChartTimeframe;
}

export const timeframeOptions: TimeframeOption[] = [
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: '1y', value: '1y' }
];

// Mock price history data
export const generatePriceHistoryData = (timeframe: ChartTimeframe): ChartDataPoint[] => {
  let dataPoints: number;
  let basePrice: number;
  let volatility: number;
  let trend: number;

  switch(timeframe) {
    case '24h':
      dataPoints = 24;
      basePrice = 3.45;
      volatility = 0.1;
      trend = -0.005; // Slight downward trend
      break;
    case '7d':
      dataPoints = 7;
      basePrice = 3.55;
      volatility = 0.15;
      trend = -0.01;
      break;
    case '30d':
      dataPoints = 30;
      basePrice = 3.75;
      volatility = 0.2;
      trend = -0.015;
      break;
    case '90d':
      dataPoints = 90;
      basePrice = 3.95;
      volatility = 0.25;
      trend = -0.02;
      break;
    case '1y':
      dataPoints = 12; // Monthly data
      basePrice = 4.25;
      volatility = 0.3;
      trend = -0.03;
      break;
    default:
      dataPoints = 24;
      basePrice = 3.45;
      volatility = 0.1;
      trend = -0.005;
  }

  // Generate data points with trend and volatility
  return Array.from({ length: dataPoints }, (_, i) => {
    const trendImpact = trend * i;
    const randomVariation = (Math.random() - 0.5) * volatility;
    return {
      x: i,
      y: +(basePrice + trendImpact + randomVariation).toFixed(2)
    };
  });
};

// Phase 2: Smart Meter Mock Data

// Sample manufacturers and models
const meterManufacturers = [
  { name: "SmartGrid Solutions", models: ["SG-100", "SG-200", "SG-300"] },
  { name: "EnergyMetrix", models: ["EM-Basic", "EM-Advanced", "EM-Pro"] },
  { name: "PowerTrack Systems", models: ["PT1000", "PT2000", "PT3000"] },
  { name: "VoltWise", models: ["VW-Residential", "VW-Commercial", "VW-Industrial"] }
];

// Generate mock smart meters
export const generateMockSmartMeters = (count: number): SmartMeter[] => {
  return Array.from({ length: count }, () => {
    const manufacturer = meterManufacturers[Math.floor(Math.random() * meterManufacturers.length)];
    const model = manufacturer.models[Math.floor(Math.random() * manufacturer.models.length)];
    
    // Generate installation date within the past 3 years
    const installDate = new Date();
    installDate.setFullYear(installDate.getFullYear() - Math.floor(Math.random() * 3));
    
    return {
      id: generateId(),
      userId: "current-user", // Assuming for the logged-in user
      deviceId: `${manufacturer.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 10000)}`,
      manufacturer: manufacturer.name,
      model: model,
      installationDate: installDate,
      lastReading: null, // Will be populated separately
      status: Math.random() > 0.1 ? 'online' : (Math.random() > 0.5 ? 'offline' : 'maintenance'),
      location: {
        address: locations[Math.floor(Math.random() * locations.length)],
        coordinates: {
          latitude: 18.52 + (Math.random() * 10),
          longitude: 73.85 + (Math.random() * 10)
        }
      },
      type: Math.random() > 0.7 ? 'residential' : (Math.random() > 0.5 ? 'commercial' : 'industrial')
    };
  });
};

// Generate mock smart meter readings
export const generateMockMeterReadings = (meterId: string, daysOfData: number): SmartMeterReading[] => {
  const readings: SmartMeterReading[] = [];
  const now = new Date();
  
  for (let i = 0; i < daysOfData; i++) {
    // Create 24 readings per day (hourly)
    for (let hour = 0; hour < 24; hour++) {
      const readingDate = new Date();
      readingDate.setDate(now.getDate() - i);
      readingDate.setHours(hour, 0, 0, 0);
      
      // Generation is higher during daylight hours for solar
      const isDaylight = hour >= 6 && hour <= 18;
      const baseGeneration = isDaylight ? 2.5 : 0.2;
      const generation = +(baseGeneration * (isDaylight ? (1 - Math.abs(12 - hour) / 10) : 1) * (1 + Math.random() * 0.3)).toFixed(2);
      
      // Consumption is higher during morning and evening
      const isPeak = (hour >= 7 && hour <= 10) || (hour >= 18 && hour <= 22);
      const baseConsumption = isPeak ? 3.5 : 1.2;
      const consumption = +(baseConsumption * (1 + Math.random() * 0.3)).toFixed(2);
      
      readings.push({
        id: generateId(),
        meterId,
        timestamp: readingDate,
        consumption,
        generation,
        netUsage: +(consumption - generation).toFixed(2),
        unit: 'kWh',
        peakDemand: isPeak ? +(baseConsumption * 1.2).toFixed(2) : +(baseConsumption).toFixed(2),
        voltage: Math.floor(220 + Math.random() * 10),
        gridStatus: Math.random() > 0.05 ? 'connected' : 'island-mode'
      });
    }
  }
  
  // Sort by timestamp in descending order (newest first)
  return readings.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Phase 2: DISCOM Mock Data

// Sample DISCOMs
const discomList = [
  { 
    name: "Maharashtra State Electricity Distribution Co. Ltd.", 
    code: "MSEDCL", 
    region: "Maharashtra",
    areas: ["Mumbai", "Pune", "Nagpur", "Aurangabad"]
  },
  { 
    name: "Tata Power Delhi Distribution Ltd.", 
    code: "TPDDL", 
    region: "Delhi",
    areas: ["North Delhi", "Northwest Delhi"]
  },
  { 
    name: "BSES Rajdhani Power Ltd.", 
    code: "BRPL", 
    region: "Delhi",
    areas: ["South Delhi", "West Delhi"]
  },
  { 
    name: "BSES Yamuna Power Ltd.", 
    code: "BYPL", 
    region: "Delhi",
    areas: ["East Delhi", "Central Delhi"]
  },
  { 
    name: "Bangalore Electricity Supply Company", 
    code: "BESCOM", 
    region: "Karnataka",
    areas: ["Bangalore Urban", "Bangalore Rural", "Chikkaballapura", "Kolar"]
  }
];

// Generate mock DISCOM info
export const generateMockDiscomInfo = (): DiscomInfo[] => {
  return discomList.map(discom => ({
    id: generateId(),
    name: discom.name,
    code: discom.code,
    region: discom.region,
    contactEmail: `contact@${discom.code.toLowerCase()}.in`,
    contactPhone: `1800${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}`,
    servingAreas: discom.areas,
    connectionStatus: Math.random() > 0.8 ? 'pending' : 'active'
  }));
};

// Generate mock grid connections
export const generateMockGridConnections = (meterId: string, discomId: string): GridConnection => {
  const applicationDate = new Date();
  applicationDate.setMonth(applicationDate.getMonth() - Math.floor(Math.random() * 12));
  
  const approvalStatus = Math.random() > 0.3 ? 'approved' : (Math.random() > 0.5 ? 'pending' : 'rejected');
  
  let approvalDate, contractEndDate;
  if (approvalStatus === 'approved') {
    approvalDate = new Date(applicationDate);
    approvalDate.setDate(approvalDate.getDate() + Math.floor(Math.random() * 30) + 15);
    
    contractEndDate = new Date(approvalDate);
    contractEndDate.setFullYear(contractEndDate.getFullYear() + 5); // 5-year contract
  }
  
  return {
    id: generateId(),
    userId: "current-user", // Assuming for the logged-in user
    meterId,
    discomId,
    connectionType: Math.random() > 0.6 ? 'net-metering' : (Math.random() > 0.5 ? 'gross-metering' : 'virtual-net-metering'),
    approvalStatus,
    maxExportCapacity: Math.floor(Math.random() * 10) + 5, // 5-15 kW
    applicationDate,
    approvalDate,
    contractEndDate,
    monthlyFees: +(Math.random() * 50 + 100).toFixed(2)
  };
};

// Generate mock energy settlements (billing)
export const generateMockSettlements = (gridConnectionId: string, count: number): EnergySettlement[] => {
  const settlements: EnergySettlement[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const periodEnd = new Date(now);
    periodEnd.setMonth(now.getMonth() - i);
    periodEnd.setDate(28); // End of billing cycle
    
    const periodStart = new Date(periodEnd);
    periodStart.setMonth(periodEnd.getMonth() - 1);
    periodStart.setDate(29); // Start of billing cycle
    
    const energyImported = Math.floor(Math.random() * 300) + 100; // 100-400 kWh
    const energyExported = Math.floor(Math.random() * 250) + 50; // 50-300 kWh
    const netEnergy = energyImported - energyExported;
    
    const importRate = +(Math.random() * 2 + 6).toFixed(2); // Rs 6-8/kWh
    const exportRate = +(Math.random() * 1 + 3).toFixed(2); // Rs 3-4/kWh
    
    const netAmount = +(netEnergy > 0 
      ? netEnergy * importRate 
      : netEnergy * exportRate).toFixed(2);
    
    const isPaid = i > 0; // All past bills are paid except current one
    
    const dueDate = new Date(periodEnd);
    dueDate.setDate(dueDate.getDate() + 21); // Due in 3 weeks
    
    let paymentDate;
    if (isPaid) {
      paymentDate = new Date(dueDate);
      paymentDate.setDate(dueDate.getDate() - Math.floor(Math.random() * 20)); // Paid 0-20 days before due
    }
    
    settlements.push({
      id: generateId(),
      gridConnectionId,
      billingPeriodStart: periodStart,
      billingPeriodEnd: periodEnd,
      energyImported,
      energyExported,
      netEnergy,
      importRate,
      exportRate,
      netAmount,
      currency: "INR",
      status: isPaid ? 'paid' : (i === 0 ? 'calculated' : 'invoiced'),
      paymentDueDate: dueDate,
      paymentCompletedDate: paymentDate
    });
  }
  
  return settlements;
};
