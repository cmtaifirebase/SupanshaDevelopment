import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock donations data
const initialDonations = [
  { 
    id: 1, 
    donor: 'Rahul Sharma', 
    email: 'rahul.sharma@example.com', 
    phone: '+91 98765 43210',
    amount: 5000,
    currency: 'INR',
    project: 'Education Projects',
    status: 'Completed',
    date: '2025-04-15',
    paymentMethod: 'Credit Card',
    isRecurring: false,
    receiptIssued: true,
  },
  { 
    id: 2, 
    donor: 'Meera Joshi', 
    email: 'meera.joshi@example.com', 
    phone: '+91 87654 32109',
    amount: 2500,
    currency: 'INR',
    project: 'Healthcare Initiatives',
    status: 'Completed',
    date: '2025-04-14',
    paymentMethod: 'UPI',
    isRecurring: false,
    receiptIssued: true,
  },
  { 
    id: 3, 
    donor: 'Vivek Gupta', 
    email: 'vivek.gupta@example.com', 
    phone: '+91 76543 21098',
    amount: 10000,
    currency: 'INR',
    project: 'Sustainable Agriculture',
    status: 'Processing',
    date: '2025-04-12',
    paymentMethod: 'Bank Transfer',
    isRecurring: false,
    receiptIssued: false,
  },
  { 
    id: 4, 
    donor: 'Anjali Singh', 
    email: 'anjali.singh@example.com', 
    phone: '+91 65432 10987',
    amount: 1000,
    currency: 'INR',
    project: 'General Fund',
    status: 'Failed',
    date: '2025-04-10',
    paymentMethod: 'Credit Card',
    isRecurring: false,
    receiptIssued: false,
  },
  { 
    id: 5, 
    donor: 'Arjun Mehta', 
    email: 'arjun.mehta@example.com', 
    phone: '+91 54321 09876',
    amount: 3000,
    currency: 'INR',
    project: 'Women Empowerment',
    status: 'Completed',
    date: '2025-04-08',
    paymentMethod: 'UPI',
    isRecurring: true,
    receiptIssued: true,
  },
  { 
    id: 6, 
    donor: 'Neha Kapoor', 
    email: 'neha.kapoor@example.com', 
    phone: '+91 43210 98765',
    amount: 5000,
    currency: 'INR',
    project: 'Education Projects',
    status: 'Completed',
    date: '2025-04-05',
    paymentMethod: 'Credit Card',
    isRecurring: true,
    receiptIssued: true,
  },
  { 
    id: 7, 
    donor: 'Sameer Jain', 
    email: 'sameer.jain@example.com', 
    phone: '+91 32109 87654',
    amount: 7500,
    currency: 'INR',
    project: 'Rural Development',
    status: 'Completed',
    date: '2025-04-02',
    paymentMethod: 'Bank Transfer',
    isRecurring: false,
    receiptIssued: true,
  },
];

// Project options for donation allocation
const projectOptions = [
  'Education Projects',
  'Healthcare Initiatives',
  'Sustainable Agriculture',
  'Women Empowerment',
  'Rural Development',
  'Clean Water Access',
  'General Fund',
];

const AdminDonations: React.FC = () => {
  const [donations, setDonations] = useState(initialDonations);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Calculate donation statistics
  const totalDonations = donations.filter(d => d.status === 'Completed').reduce((sum, d) => sum + d.amount, 0);
  const donationCount = donations.filter(d => d.status === 'Completed').length;
  const averageDonation = donationCount > 0 ? totalDonations / donationCount : 0;
  const recurringDonors = new Set(donations.filter(d => d.isRecurring && d.status === 'Completed').map(d => d.email)).size;
  
  // Filter donations based on search term and active tab
  const filteredDonations = donations.filter(donation => {
    // Filter by search term
    const matchesSearch = 
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) || 
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && donation.status === 'Completed';
    if (activeTab === 'processing') return matchesSearch && donation.status === 'Processing';
    if (activeTab === 'failed') return matchesSearch && donation.status === 'Failed';
    if (activeTab === 'recurring') return matchesSearch && donation.isRecurring;
    
    return matchesSearch;
  });
  
  const handleViewDetails = (donation: any) => {
    setSelectedDonation(donation);
    setIsDetailsDialogOpen(true);
  };
  
  const handleGenerateReceipt = (donation: any) => {
    setSelectedDonation(donation);
    setIsReceiptDialogOpen(true);
  };
  
  const handleUpdateStatus = (id: number, newStatus: string) => {
    setDonations(donations.map(donation => 
      donation.id === id 
        ? { ...donation, status: newStatus } 
        : donation
    ));
    
    toast({
      title: "Status Updated",
      description: `Donation status has been updated to ${newStatus}`,
    });
    
    // Update selected donation if details dialog is open
    if (selectedDonation && selectedDonation.id === id) {
      setSelectedDonation({...selectedDonation, status: newStatus});
    }
  };
  
  const handleIssueReceipt = () => {
    setDonations(donations.map(donation => 
      donation.id === selectedDonation.id 
        ? { ...donation, receiptIssued: true } 
        : donation
    ));
    
    setSelectedDonation({...selectedDonation, receiptIssued: true});
    setIsReceiptDialogOpen(false);
    
    toast({
      title: "Receipt Issued",
      description: "Donation receipt has been generated and sent to the donor.",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Donation Management</h1>
        <p className="text-gray-600">Track, process, and manage incoming donations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <h3 className="text-2xl font-bold">₹{totalDonations.toLocaleString()}</h3>
              <p className="text-xs text-gray-500 mt-1">{donationCount} donations received</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Average Donation</p>
              <h3 className="text-2xl font-bold">₹{averageDonation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
              <p className="text-xs text-gray-500 mt-1">Per donation</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Recurring Donors</p>
              <h3 className="text-2xl font-bold">{recurringDonors}</h3>
              <p className="text-xs text-gray-500 mt-1">Monthly supporters</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Pending Receipts</p>
              <h3 className="text-2xl font-bold">{donations.filter(d => d.status === 'Completed' && !d.receiptIssued).length}</h3>
              <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Donations</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
          <CardDescription>
            Track and manage all donation transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.donor}
                    {donation.isRecurring && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        Recurring
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                  <TableCell>{donation.project}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        donation.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : donation.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {donation.receiptIssued ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Issued
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(donation)}
                      >
                        Details
                      </Button>
                      {donation.status === 'Completed' && !donation.receiptIssued && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateReceipt(donation)}
                        >
                          Issue Receipt
                        </Button>
                      )}
                      {donation.status === 'Processing' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleUpdateStatus(donation.id, 'Completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredDonations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No donations found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Donation Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>
              Complete information about this donation.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDonation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Donor Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedDonation.donor}</p>
                    <p><span className="font-medium">Email:</span> {selectedDonation.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedDonation.phone}</p>
                    <p>
                      <span className="font-medium">Donation Type:</span>{' '}
                      {selectedDonation.isRecurring ? 'Recurring (Monthly)' : 'One-time'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedDonation.date}</p>
                    <p><span className="font-medium">Amount:</span> ₹{selectedDonation.amount.toLocaleString()} {selectedDonation.currency}</p>
                    <p><span className="font-medium">Payment Method:</span> {selectedDonation.paymentMethod}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          selectedDonation.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : selectedDonation.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedDonation.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Receipt:</span>{' '}
                      {selectedDonation.receiptIssued ? 'Issued' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Donation Allocation</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Project:</span> {selectedDonation.project}</p>
                    
                    {selectedDonation.status === 'Completed' && (
                      <div className="mt-4">
                        <Label htmlFor="project">Reallocate to Different Project</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Select defaultValue={selectedDonation.project}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectOptions.map((project) => (
                                <SelectItem key={project} value={project}>
                                  {project}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Allocation Updated",
                                description: "The donation has been reallocated to the selected project",
                              });
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Actions</h3>
                  <div className="space-y-3">
                    {selectedDonation.status === 'Processing' && (
                      <Button 
                        className="w-full"
                        onClick={() => {
                          handleUpdateStatus(selectedDonation.id, 'Completed');
                          setIsDetailsDialogOpen(false);
                        }}
                      >
                        Mark as Completed
                      </Button>
                    )}
                    
                    {selectedDonation.status === 'Completed' && !selectedDonation.receiptIssued && (
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setIsDetailsDialogOpen(false);
                          handleGenerateReceipt(selectedDonation);
                        }}
                      >
                        Generate Receipt
                      </Button>
                    )}
                    
                    {selectedDonation.status === 'Completed' && selectedDonation.receiptIssued && (
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Receipt Sent",
                            description: "The receipt has been resent to the donor's email",
                          });
                        }}
                      >
                        Resend Receipt
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: "Thank you message has been sent to the donor",
                        });
                      }}
                    >
                      Send Thank You Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Receipt Generation Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Donation Receipt</DialogTitle>
            <DialogDescription>
              Create and send an official donation receipt to the donor.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDonation && (
            <div className="py-4">
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Donation Receipt</h3>
                    <p className="text-sm text-gray-500">Receipt No: SDF-{selectedDonation.id.toString().padStart(6, '0')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Date: {selectedDonation.date}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Donor Information</h4>
                  <p className="font-medium">{selectedDonation.donor}</p>
                  <p>{selectedDonation.email}</p>
                  <p>{selectedDonation.phone}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Donation Details</h4>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Donation Amount:</span>
                    <span className="font-medium">₹{selectedDonation.amount.toLocaleString()} {selectedDonation.currency}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Project:</span>
                    <span>{selectedDonation.project}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Payment Method:</span>
                    <span>{selectedDonation.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Donation Type:</span>
                    <span>{selectedDonation.isRecurring ? 'Recurring (Monthly)' : 'One-time'}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  <p>Supansha Development Foundation</p>
                  <p>PAN: AAASD1234F</p>
                  <p>80G Registration: 80G/1234/2023-24</p>
                  <p>Email: donations@supansha.org</p>
                </div>
                
                <div className="text-center text-sm border-t border-gray-200 pt-4">
                  <p className="font-medium">Thank you for your generous support!</p>
                  <p className="text-gray-600">Your contribution helps us create lasting positive change in communities.</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Receipt Downloaded",
                      description: "The receipt has been downloaded as a PDF",
                    });
                  }}
                >
                  Download PDF
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsReceiptDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleIssueReceipt}>
                    Send to Donor
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDonations;