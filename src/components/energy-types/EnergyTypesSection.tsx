
import React from 'react';
import { useEnergy } from '@/context/EnergyContext';
import EnergyTypeCard from '@/components/marketplace/EnergyTypeCard';
import { ArrowRight } from 'lucide-react';

const EnergyTypesSection: React.FC = () => {
  const { energyTypes } = useEnergy();
  
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Energy Sources</h2>
            <p className="text-muted-foreground mt-2">Choose from a variety of renewable energy sources</p>
          </div>
          <a href="/marketplace" className="flex items-center text-primary hover:underline">
            <span className="mr-1">View all sources</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {energyTypes.map((type, index) => (
            <EnergyTypeCard
              key={index}
              name={type.name}
              icon={type.icon}
              color={type.color}
              gradient={type.gradient}
              currentPrice={type.currentPrice}
              priceChange={type.priceChange}
              availability={type.availability}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyTypesSection;
