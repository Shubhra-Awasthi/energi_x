import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEnergy } from '@/context/EnergyContext';
import { 
  CircleDollarSign, 
  User, 
  Menu, 
  Bell,
  Activity,
  ZapOff
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { walletBalance } = useEnergy();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <span className="font-bold text-xl">EnergiX</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-primary' : 'hover:text-primary'}`}>
            Dashboard
          </Link>
          <Link to="/marketplace" className={`text-sm font-medium transition-colors ${isActive('/marketplace') ? 'text-primary' : 'hover:text-primary'}`}>
            Marketplace
          </Link>
          <Link to="/ai-insights" className={`text-sm font-medium transition-colors ${isActive('/ai-insights') ? 'text-primary' : 'hover:text-primary'}`}>
            AI Insights
          </Link>
          <Link to="/analytics" className={`text-sm font-medium transition-colors ${isActive('/analytics') ? 'text-primary' : 'hover:text-primary'}`}>
            Analytics
          </Link>
          <Link to="/smart-meters" className={`text-sm font-medium transition-colors ${isActive('/smart-meters') ? 'text-primary' : 'hover:text-primary'}`}>
            Smart Meters
          </Link>
          <Link to="/discom-connection" className={`text-sm font-medium transition-colors ${isActive('/discom-connection') ? 'text-primary' : 'hover:text-primary'}`}>
            DISCOM Connection
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {/* Wallet balance */}
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4" />
            <span>${walletBalance.available.toFixed(2)}</span>
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  <span>Wallet</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Smart Meters</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ZapOff className="mr-2 h-4 w-4" />
                  <span>DISCOM Connection</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
