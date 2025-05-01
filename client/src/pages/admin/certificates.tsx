import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock certificate templates data
const certificateTemplates = [
  {
    id: 1,
    name: 'Volunteer Appreciation',
    description: 'Certificate of appreciation for volunteers',
    previewImage: 'https://images.unsplash.com/photo-1574238808583-22d85375c5c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Project Completion',
    description: 'Certificate for completing a project or program',
    previewImage: 'https://images.unsplash.com/photo-1569937756667-8afd0fbdec04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Training Participation',
    description: 'Certificate for attending training programs',
    previewImage: 'https://images.unsplash.com/photo-1579166136012-cb2b220e58b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Community Leadership',
    description: 'Certificate recognizing community leadership',
    previewImage: 'https://images.unsplash.com/photo-1590087995418-b918dad5be8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
];

// Mock issued certificates data
const initialCertificates = [
  { 
    id: 1, 
    recipientName: 'Anil Kumar', 
    recipientEmail: 'anil.kumar@example.com', 
    certificateType: 'Volunteer Appreciation',
    program: 'Health Camp Volunteer',
    issuedOn: '2025-03-18',
    templateId: 1,
    status: 'Issued',
  },
  { 
    id: 2, 
    recipientName: 'Sunita Devi', 
    recipientEmail: 'sunita.devi@example.com', 
    certificateType: 'Training Participation',
    program: 'Community Health Worker Training',
    issuedOn: '2025-03-10',
    templateId: 3,
    status: 'Issued',
  },
  { 
    id: 3, 
    recipientName: 'Ramesh Patel', 
    recipientEmail: 'ramesh.patel@example.com', 
    certificateType: 'Project Completion',
    program: 'Water Conservation Project',
    issuedOn: '2025-02-22',
    templateId: 2,
    status: 'Issued',
  },
  { 
    id: 4, 
    recipientName: 'Priya Sharma', 
    recipientEmail: 'priya.sharma@example.com', 
    certificateType: 'Community Leadership',
    program: 'Digital Literacy Initiative',
    issuedOn: '2025-04-05',
    templateId: 4,
    status: 'Issued',
  },
  { 
    id: 5, 
    recipientName: 'Vikram Singh', 
    recipientEmail: 'vikram.singh@example.com', 
    certificateType: 'Volunteer Appreciation',
    program: 'Youth Sports Program',
    issuedOn: '2025-03-25',
    templateId: 1,
    status: 'Issued',
  },
];

// Mock volunteers data for certificate creation
const volunteers = [
  { id: 1, name: 'Anil Kumar', email: 'anil.kumar@example.com' },
  { id: 2, name: 'Sunita Devi', email: 'sunita.devi@example.com' },
  { id: 3, name: 'Ramesh Patel', email: 'ramesh.patel@example.com' },
  { id: 4, name: 'Priya Sharma', email: 'priya.sharma@example.com' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com' },
  { id: 6, name: 'Anita Gupta', email: 'anita.gupta@example.com' },
  { id: 7, name: 'Raj Kumar', email: 'raj.kumar@example.com' },
  { id: 8, name: 'Meera Joshi', email: 'meera.joshi@example.com' },
];

const AdminCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCertificateDialogOpen, setIsCreateCertificateDialogOpen] = useState(false);
  const [isViewCertificateDialogOpen, setIsViewCertificateDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [newCertificate, setNewCertificate] = useState({
    recipientId: '',
    templateId: '',
    program: '',
    message: '',
  });
  const { toast } = useToast();
  
  // Filter certificates based on search term
  const filteredCertificates = certificates.filter(certificate => 
    certificate.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    certificate.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificate.certificateType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsViewCertificateDialogOpen(true);
  };
  
  const handleCreateCertificate = () => {
    // Validate form fields
    if (!newCertificate.recipientId || !newCertificate.templateId || !newCertificate.program) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Get volunteer and template info
    const selectedVolunteer = volunteers.find(v => v.id.toString() === newCertificate.recipientId);
    const selectedTemplate = certificateTemplates.find(t => t.id.toString() === newCertificate.templateId);
    
    if (!selectedVolunteer || !selectedTemplate) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid recipient and template",
        variant: "destructive",
      });
      return;
    }
    
    // Create new certificate
    const newId = certificates.length > 0 ? Math.max(...certificates.map(c => c.id)) + 1 : 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newCertificateObj = {
      id: newId,
      recipientName: selectedVolunteer.name,
      recipientEmail: selectedVolunteer.email,
      certificateType: selectedTemplate.name,
      program: newCertificate.program,
      issuedOn: currentDate,
      templateId: parseInt(newCertificate.templateId),
      status: 'Issued',
    };
    
    setCertificates([...certificates, newCertificateObj]);
    
    // Reset form and close dialog
    setNewCertificate({
      recipientId: '',
      templateId: '',
      program: '',
      message: '',
    });
    
    setIsCreateCertificateDialogOpen(false);
    
    toast({
      title: "Certificate Created",
      description: "Certificate has been successfully created and sent to the recipient",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Certificate Management</h1>
        <p className="text-gray-600">Create, manage, and issue certificates for volunteers and participants</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <Dialog open={isCreateCertificateDialogOpen} onOpenChange={setIsCreateCertificateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Certificate</DialogTitle>
              <DialogDescription>
                Generate and issue a certificate for a volunteer or participant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipient
                </Label>
                <div className="col-span-3">
                  <Select
                    value={newCertificate.recipientId}
                    onValueChange={(value) => setNewCertificate({ ...newCertificate, recipientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {volunteers.map((volunteer) => (
                        <SelectItem key={volunteer.id} value={volunteer.id.toString()}>
                          {volunteer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template" className="text-right">
                  Template
                </Label>
                <div className="col-span-3">
                  <Select
                    value={newCertificate.templateId}
                    onValueChange={(value) => setNewCertificate({ ...newCertificate, templateId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select certificate template" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="program" className="text-right">
                  Program/Activity
                </Label>
                <Input
                  id="program"
                  value={newCertificate.program}
                  onChange={(e) => setNewCertificate({ ...newCertificate, program: e.target.value })}
                  placeholder="e.g., Health Camp Volunteer, Leadership Training"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right pt-2">
                  Custom Message
                </Label>
                <Textarea
                  id="message"
                  value={newCertificate.message}
                  onChange={(e) => setNewCertificate({ ...newCertificate, message: e.target.value })}
                  placeholder="Optional personal message to include on the certificate"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              
              {newCertificate.templateId && (
                <div className="grid grid-cols-4 items-start gap-4 mt-2">
                  <div className="text-right pt-2">
                    <Label>Preview</Label>
                  </div>
                  <div className="col-span-3 rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={certificateTemplates.find(t => t.id.toString() === newCertificate.templateId)?.previewImage} 
                      alt="Certificate Template Preview" 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateCertificateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCertificate}>Create Certificate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search certificates..."
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Templates</CardTitle>
            <CardDescription>
              Available certificate templates for different purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificateTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={template.previewImage} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                Manage Templates
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Certificate Statistics</CardTitle>
            <CardDescription>
              Overview of certificate issuance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Certificates</p>
                <p className="text-3xl font-bold">{certificates.length}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold">
                  {certificates.filter(c => {
                    const thisMonth = new Date().getMonth();
                    const thisYear = new Date().getFullYear();
                    const certDate = new Date(c.issuedOn);
                    return certDate.getMonth() === thisMonth && certDate.getFullYear() === thisYear;
                  }).length}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Certificates by Type</h3>
              <div className="space-y-3">
                {certificateTemplates.map((template) => {
                  const count = certificates.filter(c => c.certificateType === template.name).length;
                  const percentage = Math.round((count / certificates.length) * 100) || 0;
                  
                  return (
                    <div key={template.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{template.name}</span>
                        <span>{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Issued Certificates</CardTitle>
          <CardDescription>
            List of all certificates issued to volunteers and participants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Program/Activity</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="font-medium">CERT-{certificate.id.toString().padStart(4, '0')}</TableCell>
                  <TableCell>{certificate.recipientName}</TableCell>
                  <TableCell>{certificate.certificateType}</TableCell>
                  <TableCell>{certificate.program}</TableCell>
                  <TableCell>{certificate.issuedOn}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCertificate(certificate)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Certificate Sent",
                            description: "Certificate has been resent to the recipient's email",
                          });
                        }}
                      >
                        Resend
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCertificates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No certificates found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* View Certificate Dialog */}
      <Dialog open={isViewCertificateDialogOpen} onOpenChange={setIsViewCertificateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate Details</DialogTitle>
            <DialogDescription>
              View and download certificate.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="py-4">
              <div className="mb-6 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="relative h-80 bg-blue-50">
                  <img 
                    src={certificateTemplates.find(t => t.id === selectedCertificate.templateId)?.previewImage} 
                    alt="Certificate Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-800 mb-1">Supansha Development Foundation</h2>
                      <p className="text-lg text-gray-600 mb-6">Certificate of {selectedCertificate.certificateType}</p>
                      <div className="w-full max-w-md mx-auto h-px bg-gray-300 mb-6"></div>
                      <p className="text-gray-600 mb-3">This certifies that</p>
                      <p className="text-2xl font-bold text-gray-800 mb-3">{selectedCertificate.recipientName}</p>
                      <p className="text-gray-600 mb-3">has successfully participated in</p>
                      <p className="text-xl font-semibold text-gray-800 mb-6">{selectedCertificate.program}</p>
                      <div className="text-sm text-gray-600">
                        <p>Date: {selectedCertificate.issuedOn}</p>
                        <p>Certificate ID: CERT-{selectedCertificate.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Recipient Information</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedCertificate.recipientName}</p>
                    <p><span className="font-medium">Email:</span> {selectedCertificate.recipientEmail}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Certificate Information</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Type:</span> {selectedCertificate.certificateType}</p>
                    <p><span className="font-medium">Issued On:</span> {selectedCertificate.issuedOn}</p>
                    <p><span className="font-medium">Certificate ID:</span> CERT-{selectedCertificate.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Certificate Downloaded",
                      description: "The certificate has been downloaded as a PDF",
                    });
                  }}
                >
                  Download PDF
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsViewCertificateDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Certificate Sent",
                        description: "Certificate has been sent to the recipient's email",
                      });
                    }}
                  >
                    Send to Recipient
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

export default AdminCertificates;