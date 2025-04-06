
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEnergy } from '@/context/EnergyContext';
import { Droplet, Flame, Leaf, Loader2, MapPin, Sun, Wind } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { EnergyListing } from '@/types/energy';

const MarketListings: React.FC = () => {
  const { listings, isLoading, buyEnergy } = useEnergy();
  const [selectedListing, setSelectedListing] = useState<EnergyListing | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(0);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const handleOpenPurchaseDialog = (listing: EnergyListing) => {
    setSelectedListing(listing);
    setPurchaseQuantity(Math.min(100, listing.quantity)); // Default to 100 kWh or max available
  };

  const handleClosePurchaseDialog = () => {
    setSelectedListing(null);
    setPurchaseQuantity(0);
  };

  const handlePurchase = async () => {
    if (!selectedListing) return;
    
    setIsPurchasing(true);
    const success = await buyEnergy(selectedListing.id, purchaseQuantity);
    setIsPurchasing(false);
    
    if (success) {
      handleClosePurchaseDialog();
    }
  };

  const getEnergyIcon = (source: string) => {
    switch (source) {
      case 'solar':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-blue-500" />;
      case 'hydro':
        return <Droplet className="h-5 w-5 text-cyan-500" />;
      case 'biomass':
        return <Leaf className="h-5 w-5 text-green-500" />;
      case 'geothermal':
        return <Flame className="h-5 w-5 text-pink-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Available Energy</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Price ($/kWh)</TableHead>
                    <TableHead className="text-right">Available (kWh)</TableHead>
                    <TableHead className="text-right">CO₂ Offset (kg)</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getEnergyIcon(listing.source)}
                          <span className="capitalize">{listing.source}</span>
                        </div>
                      </TableCell>
                      <TableCell>{listing.sellerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{listing.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${listing.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{listing.quantity}</TableCell>
                      <TableCell className="text-right">{listing.co2Offset.toFixed(1)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleOpenPurchaseDialog(listing)}
                        >
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purchase dialog */}
      <Dialog open={!!selectedListing} onOpenChange={(open) => !open && handleClosePurchaseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Clean Energy</DialogTitle>
            <DialogDescription>
              You are about to purchase {selectedListing?.source} energy from {selectedListing?.sellerName}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity (kWh)
              </Label>
              <Input
                id="quantity"
                type="number"
                className="col-span-3"
                value={purchaseQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value <= 0) {
                    setPurchaseQuantity(0);
                  } else if (selectedListing && value > selectedListing.quantity) {
                    setPurchaseQuantity(selectedListing.quantity);
                    toast({
                      title: "Maximum quantity reached",
                      description: `Only ${selectedListing.quantity} kWh available from this seller`,
                      variant: "destructive"
                    });
                  } else {
                    setPurchaseQuantity(value);
                  }
                }}
                min={1}
                max={selectedListing?.quantity}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Price</Label>
              <div className="col-span-3">
                ${selectedListing?.price.toFixed(2)}/kWh
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total Cost</Label>
              <div className="col-span-3 font-bold">
                ${((selectedListing?.price || 0) * purchaseQuantity).toFixed(2)}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">CO₂ Offset</Label>
              <div className="col-span-3 text-green-600">
                {selectedListing ? (
                  (selectedListing.co2Offset / selectedListing.quantity * purchaseQuantity).toFixed(1)
                ) : 0} kg
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleClosePurchaseDialog}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={purchaseQuantity <= 0 || isPurchasing}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Purchase'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketListings;
