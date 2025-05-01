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

// Mock volunteers data
const initialVolunteers = [
  { 
    id: 1, 
    name: 'Anil Kumar', 
    email: 'anil.kumar@example.com', 
    phone: '+91 98765 43210',
    location: 'Raipur',
    interests: ['Education', 'Community Development'],
    status: 'Active',
    joinDate: '2025-01-15',
    hours: 48,
    skills: 'Teaching, Coordination',
  },
  { 
    id: 2, 
    name: 'Sunita Devi', 
    email: 'sunita.devi@example.com', 
    phone: '+91 87654 32109',
    location: 'Bhilai',
    interests: ['Healthcare', 'Women Empowerment'],
    status: 'Active',
    joinDate: '2025-02-10',
    hours: 36,
    skills: 'Medical Aid, Counseling',
  },
  { 
    id: 3, 
    name: 'Ramesh Patel', 
    email: 'ramesh.patel@example.com', 
    phone: '+91 76543 21098',
    location: 'Durg',
    interests: ['Environment', 'Rural Development'],
    status: 'Inactive',
    joinDate: '2024-11-05',
    hours: 24,
    skills: 'Agriculture, Water Conservation',
  },
  { 
    id: 4, 
    name: 'Priya Sharma', 
    email: 'priya.sharma@example.com', 
    phone: '+91 65432 10987',
    location: 'Korba',
    interests: ['Education', 'Digital Literacy'],
    status: 'Pending',
    joinDate: '2025-04-02',
    hours: 12,
    skills: 'Computer Training, Content Creation',
  },
  { 
    id: 5, 
    name: 'Vikram Singh', 
    email: 'vikram.singh@example.com', 
    phone: '+91 54321 09876',
    location: 'Bilaspur',
    interests: ['Youth Development', 'Sports'],
    status: 'Active',
    joinDate: '2025-02-28',
    hours: 32,
    skills: 'Sports Coaching, Event Management',
  },
];

// Mock volunteer events data
const volunteerEvents = [
  {
    id: 1,
    volunteerId: 1,
    eventName: 'Digital Literacy Workshop',
    location: 'Raipur',
    date: '2025-03-15',
    hours: 8,
    status: 'Completed',
  },
  {
    id: 2,
    volunteerId: 1,
    eventName: 'Community Health Camp',
    location: 'Dhamtari',
    date: '2025-02-20',
    hours: 6,
    status: 'Completed',
  },
  {
    id: 3,
    volunteerId: 2,
    eventName: 'Women Empowerment Seminar',
    location: 'Bhilai',
    date: '2025-03-08',
    hours: 4,
    status: 'Completed',
  },
  {
    id: 4,
    volunteerId: 3,
    eventName: 'Organic Farming Training',
    location: 'Durg',
    date: '2025-01-25',
    hours: 8,
    status: 'Completed',
  },
  {
    id: 5,
    volunteerId: 4,
    eventName: 'School Supply Distribution',
    location: 'Korba',
    date: '2025-04-10',
    hours: 6,
    status: 'Upcoming',
  },
  {
    id: 6,
    volunteerId: 5,
    eventName: 'Sports Day for Rural Youth',
    location: 'Bilaspur',
    date: '2025-03-20',
    hours: 8,
    status: 'Completed',
  },
];

const AdminVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter volunteers based on search term and active tab
  const filteredVolunteers = volunteers.filter(volunteer => {
    // Filter by search term
    const matchesSearch = 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && volunteer.status === 'Active';
    if (activeTab === 'inactive') return matchesSearch && volunteer.status === 'Inactive';
    if (activeTab === 'pending') return matchesSearch && volunteer.status === 'Pending';
    
    return matchesSearch;
  });
  
  const handleViewDetails = (volunteer: any) => {
    setSelectedVolunteer(volunteer);
    setIsDetailsDialogOpen(true);
  };
  
  const handleUpdateStatus = (id: number, newStatus: string) => {
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === id 
        ? { ...volunteer, status: newStatus } 
        : volunteer
    ));
    
    toast({
      title: "Status Updated",
      description: `Volunteer status has been updated to ${newStatus}`,
    });
    
    // Update selected volunteer if details dialog is open
    if (selectedVolunteer && selectedVolunteer.id === id) {
      setSelectedVolunteer({...selectedVolunteer, status: newStatus});
    }
  };
  
  // Get volunteer events for the selected volunteer
  const getVolunteerEvents = (volunteerId: number) => {
    return volunteerEvents.filter(event => event.volunteerId === volunteerId);
  };
  
  // Calculate total volunteer hours
  const getTotalHours = (volunteerId: number) => {
    return getVolunteerEvents(volunteerId)
      .filter(event => event.status === 'Completed')
      .reduce((total, event) => total + event.hours, 0);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Volunteer Management</h1>
        <p className="text-gray-600">Track, manage, and coordinate volunteer activities and engagements</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Volunteers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search volunteers..."
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
          <CardTitle>Volunteer Directory</CardTitle>
          <CardDescription>
            Browse and manage volunteers and their activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        volunteer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : volunteer.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </TableCell>
                  <TableCell>{volunteer.hours}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(volunteer)}
                      >
                        Details
                      </Button>
                      <Select
                        defaultValue={volunteer.status}
                        onValueChange={(value) => handleUpdateStatus(volunteer.id, value)}
                      >
                        <SelectTrigger className="w-[110px] h-8 text-xs">
                          <SelectValue placeholder="Set Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Set Active</SelectItem>
                          <SelectItem value="Pending">Set Pending</SelectItem>
                          <SelectItem value="Inactive">Set Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVolunteers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No volunteers found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Volunteer Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Volunteer Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about the volunteer and their activities.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVolunteer && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedVolunteer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedVolunteer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedVolunteer.phone}</p>
                    <p><span className="font-medium">Location:</span> {selectedVolunteer.location}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          selectedVolunteer.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : selectedVolunteer.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedVolunteer.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Join Date:</span> {selectedVolunteer.joinDate}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills & Interests</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Skills:</span> {selectedVolunteer.skills}</p>
                    <div>
                      <p className="text-sm font-medium mb-1">Areas of Interest:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedVolunteer.interests.map((interest: string, index: number) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Volunteer Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="text-2xl font-bold">{selectedVolunteer.hours}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Events</p>
                      <p className="text-2xl font-bold">{getVolunteerEvents(selectedVolunteer.id).length}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Volunteer Activities</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getVolunteerEvents(selectedVolunteer.id).map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.eventName}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.hours}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                event.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {event.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {getVolunteerEvents(selectedVolunteer.id).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                            No activities recorded for this volunteer.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Notes & Feedback</h3>
                  <Textarea 
                    placeholder="Add notes or feedback about this volunteer..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Save Notes</Button>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline">
                    Generate Certificate
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: "A message has been sent to the volunteer",
                        });
                      }}
                    >
                      Contact Volunteer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVolunteers;