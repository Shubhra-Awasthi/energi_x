
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 energy-grid -z-10 opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur-sm mb-4">
            <Zap className="h-4 w-4 mr-2 text-primary animate-pulse" />
            <span className="text-sm font-medium">Democratizing Clean Energy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            The <span className="text-primary">Amazon for Clean Energy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Buy, sell, and trade renewable energy in real-time. Powered by AI and connected to the grid.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 md:gap-12 mt-12 max-w-3xl">
            <div className="flex flex-col items-center">
              <div className="font-bold text-2xl md:text-4xl text-primary">95%</div>
              <div className="text-sm text-muted-foreground text-center">Clean Energy Sources</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-2xl md:text-4xl text-primary">15k+</div>
              <div className="text-sm text-muted-foreground text-center">Energy Producers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-2xl md:text-4xl text-primary">20%</div>
              <div className="text-sm text-muted-foreground text-center">Average Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
