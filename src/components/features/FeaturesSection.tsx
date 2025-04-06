
import React from 'react';
import { 
  BarChart, 
  CircleDollarSign, 
  Cpu, 
  FileCheck, 
  Map, 
  Wallet 
} from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
      <div className="relative flex flex-col h-full p-6 border rounded-lg hover:border-primary/50 transition-colors">
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-lg mb-4" 
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart size={24} />,
      title: "Energy Marketplace",
      description: "Buy and sell renewable energy directly from producers at competitive prices on our transparent marketplace.",
      color: "#3B82F6"
    },
    {
      icon: <Cpu size={24} />,
      title: "AI Engine",
      description: "Our AI predicts energy prices and recommends the best times to buy or sell based on market trends.",
      color: "#10B981"
    },
    {
      icon: <FileCheck size={24} />,
      title: "Smart Contracts",
      description: "Secure digital agreements ensure transparent and reliable energy trading between parties.",
      color: "#FBBF24"
    },
    {
      icon: <Wallet size={24} />,
      title: "Energy Wallet",
      description: "Manage your energy assets, track transactions, and store funds securely in one place.",
      color: "#EC4899"
    },
    {
      icon: <BarChart size={24} />,
      title: "Analytics Dashboard",
      description: "Visualize your energy usage, carbon offset, and savings with detailed analytics and reports.",
      color: "#06B6D4"
    },
    {
      icon: <Map size={24} />,
      title: "Grid Integration",
      description: "Seamless integration with existing power grids ensures reliable delivery of purchased energy.",
      color: "#8B5CF6"
    }
  ];
  
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powering the Clean Energy Economy</h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Our platform uses cutting-edge technology to connect energy producers and consumers in a transparent marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
