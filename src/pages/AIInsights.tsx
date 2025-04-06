import React from 'react';
import AIEnergyPredictions from '@/components/ai-insights/AIEnergyPredictions';
import HistoricalPriceChart from '@/components/ai-insights/HistoricalPriceChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BrainCircuit,
  Cloud, 
  Cpu, 
  LineChart, 
  BarChart, 
  Zap, 
  AlertCircle 
} from 'lucide-react';

const AIInsights: React.FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
      <p className="text-muted-foreground mb-6">
        Predictive analytics and AI-powered recommendations for energy trading
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AIEnergyPredictions />
        <HistoricalPriceChart />
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <CardTitle>Smart Energy Predictions</CardTitle>
          </div>
          <CardDescription>
            Our AI analyzes multiple factors to forecast energy trends and provide personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Weather Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI monitors weather patterns to predict solar and wind energy production fluctuations.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Demand Forecasting</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We predict grid demand based on historical usage patterns, seasons, and special events.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Price Trend Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Historical price data and market conditions are analyzed to predict future price movements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <CardTitle>Recommendations & Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="buy">Buy Recommendations</TabsTrigger>
              <TabsTrigger value="sell">Sell Recommendations</TabsTrigger>
              <TabsTrigger value="alerts">Market Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-green-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Buy Solar Energy Now</h3>
                    <Badge variant="outline" className="text-xs">High Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Solar energy prices are predicted to increase by 8% within the next 48 hours due to approaching cloudy weather. 
                    Buying now could save you approximately $0.28/kWh.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-green-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Consider Wind Energy Subscription</h3>
                    <Badge variant="outline" className="text-xs">Medium Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Wind energy prices show unusual stability in the next quarter. 
                    A 3-month subscription at current rates may protect against predicted grid price increases of 5-7%.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sell" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-blue-500">
                  <LineChart className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Sell Excess Solar Production</h3>
                    <Badge variant="outline" className="text-xs">High Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current market demand for solar is high with prices 12% above monthly average. 
                    Selling your excess capacity now is likely to yield better returns than waiting.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-blue-500">
                  <LineChart className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Consider Fixed-Price Contracts</h3>
                    <Badge variant="outline" className="text-xs">Medium Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Market volatility indicators suggest price fluctuations in the coming weeks. 
                    Securing fixed-price contracts now may provide more stability than spot market sales.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-amber-500">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Grid Demand Spike Expected</h3>
                    <Badge variant="outline" className="text-xs">Alert</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unusually high temperatures forecast for next week may drive cooling demand up by 30%. 
                    Energy prices are expected to surge between 2-5 PM daily.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-amber-500">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Policy Change Alert</h3>
                    <Badge variant="outline" className="text-xs">Alert</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    New renewable energy incentives announced may increase market participation by 20% within 30 days. 
                    This could lead to higher supply and potentially lower prices.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
