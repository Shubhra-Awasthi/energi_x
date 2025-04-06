
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEnergy } from '@/context/EnergyContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  source: z.enum(['solar', 'wind', 'hydro', 'biomass', 'geothermal']),
  quantity: z.coerce.number().positive().min(10, "Minimum 10 kWh required"),
  price: z.coerce.number().positive().min(0.1, "Price must be at least $0.10/kWh"),
  location: z.string().min(5, "Please provide a valid location")
});

type FormData = z.infer<typeof formSchema>;

const SellEnergyForm: React.FC = () => {
  const { sellEnergy, isLoading } = useEnergy();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: 'solar',
      quantity: 100,
      price: 3.25,
      location: 'Mumbai, Maharashtra'
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const success = await sellEnergy({
      source: data.source,
      quantity: data.quantity,
      price: data.price,
      location: data.location
    });
    
    if (success) {
      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sell Your Clean Energy</CardTitle>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your energy listing has been published to the marketplace.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Source</FormLabel>
                  <Select 
                    disabled={isLoading || isSubmitting} 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select energy source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="solar">Solar</SelectItem>
                      <SelectItem value="wind">Wind</SelectItem>
                      <SelectItem value="hydro">Hydro</SelectItem>
                      <SelectItem value="biomass">Biomass</SelectItem>
                      <SelectItem value="geothermal">Geothermal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of renewable energy you're selling.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (kWh)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="100" 
                        {...field} 
                        disabled={isLoading || isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      How much energy you want to sell.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per kWh ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="3.25" 
                        {...field} 
                        disabled={isLoading || isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Competitive prices sell faster.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City, State" 
                      {...field} 
                      disabled={isLoading || isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Where your energy is generated.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                'List for Sale'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SellEnergyForm;
