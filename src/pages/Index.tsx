import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Sun, 
  Wind, 
  Droplet, 
  LineChart, 
  BarChart, 
  BrainCircuit, 
  Shield 
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to EnergiX</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          The next-generation energy trading platform connecting renewable energy producers and consumers
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link to="/marketplace">Start Trading</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Solar Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Trade clean solar energy from rooftop installations and solar farms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-blue-500" />
              Wind Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access wind power from onshore and offshore wind farms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-400" />
              Hydro Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Trade hydroelectric power from dams and run-of-river installations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Grid Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access traditional grid power when renewable sources are limited
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our advanced AI algorithms analyze market trends, weather patterns, and historical data to provide you with accurate price predictions and trading recommendations.
            </p>
            <Button asChild variant="outline">
              <Link to="/ai-insights">View AI Insights</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Secure Trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Trade with confidence using our secure platform. All transactions are verified and recorded on the blockchain for transparency and security.
            </p>
            <Button asChild variant="outline">
              <Link to="/marketplace">Start Trading</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-green-500" />
              Real-Time Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get the best prices with our dynamic pricing system that updates in real-time based on supply and demand.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-500" />
              Detailed Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track your energy usage, savings, and environmental impact with comprehensive analytics and reporting.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Smart Meter Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect your smart meters to automatically track and trade your energy production and consumption.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
