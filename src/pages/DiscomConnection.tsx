import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Upload,
  MapPin,
  Search,
  Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  discom: z.string().min(1, 'DISCOM name is required'),
  account: z.string().min(1, 'Account number is required'),
  address: z.string().min(1, 'Connection address is required'),
  documents: z.array(z.any()).min(1, 'At least one document is required'),
});

const discoms = [
  'Tata Power',
  'Adani Electricity',
  'BEST',
  'MSEDCL',
  'BESCOM',
  'TSSPDCL',
  'APSPDCL',
];

const DiscomConnection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedDocs(Array.from(files));
      setValue('documents', Array.from(files));
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setProgress(30);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProgress(100);
      toast.success('Connection request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit connection request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">DISCOM Connection</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Connect your energy meters to the grid and start trading renewable energy
        </p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Started</span>
          <span>Documents Uploaded</span>
          <span>Under Review</span>
          <span>Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Connection Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discom">DISCOM Name</Label>
                <Select onValueChange={(value) => setValue('discom', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your DISCOM" />
                  </SelectTrigger>
                  <SelectContent>
                    {discoms.map((discom) => (
                      <SelectItem key={discom} value={discom}>
                        {discom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.discom && (
                  <p className="text-sm text-red-500">{errors.discom.message?.toString()}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Account Number</Label>
                <Input 
                  id="account" 
                  placeholder="Enter your account number"
                  {...register('account')}
                />
                {errors.account && (
                  <p className="text-sm text-red-500">{errors.account.message?.toString()}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Connection Address</Label>
                <div className="relative">
                  <Input 
                    id="address" 
                    placeholder="Enter your connection address"
                    {...register('address')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message?.toString()}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="documents"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="documents"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                  </label>
                </div>
                {uploadedDocs.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {uploadedDocs.map((file, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.documents && (
                  <p className="text-sm text-red-500">{errors.documents.message?.toString()}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Connection Request'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Property Ownership Proof</h3>
                  <p className="text-muted-foreground">Valid documents proving ownership of the property</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Identity Proof</h3>
                  <p className="text-muted-foreground">Government-issued ID proof</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Technical Specifications</h3>
                  <p className="text-muted-foreground">Details of your energy generation/consumption setup</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Connection requests typically take 5-7 business days to process</li>
              <li>• Site inspection may be required before approval</li>
              <li>• Additional documents may be requested based on your setup</li>
              <li>• Technical compliance with grid standards is mandatory</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                After submitting your connection request, our team will review your application and contact you for further steps.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscomConnection;
