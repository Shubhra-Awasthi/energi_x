import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EnergyProvider } from '@/context/EnergyContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { WeatherProvider } from '@/context/WeatherContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AIInsights from "./pages/AIInsights";
import Analytics from "./pages/Analytics";
import SmartMeterDashboard from "./pages/SmartMeterDashboard";
import DiscomConnection from "./pages/DiscomConnection";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <EnergyProvider>
        <MarketplaceProvider>
          <WeatherProvider>
            <TooltipProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/ai-insights" element={<AIInsights />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/smart-meters" element={<SmartMeterDashboard />} />
                    <Route path="/discom-connection" element={<DiscomConnection />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster />
            </TooltipProvider>
          </WeatherProvider>
        </MarketplaceProvider>
      </EnergyProvider>
    </Router>
  );
}

export default App;
