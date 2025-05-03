import React, { useState, useEffect } from 'react';
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
import { API_BASE_URL } from '@/config';

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  interests: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  hours: number;
  skills: string;
  events: {
    eventName: string;
    location: string;
    date: string;
    hours: number;
    status: 'Completed' | 'Upcoming';
  }[];
  notes: string;
}

const AdminVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  
  // Fetch volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/volunteers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch volunteers');
        
        const data = await response.json();
        setVolunteers(data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load volunteers",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVolunteers();
  }, [toast]);
  
  // Filter volunteers based on search term and active tab
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = 
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && volunteer.status === 'Active';
    if (activeTab === 'inactive') return matchesSearch && volunteer.status === 'Inactive';
    if (activeTab === 'pending') return matchesSearch && volunteer.status === 'Pending';
    
    return matchesSearch;
  });
  
  const handleViewDetails = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setNotes(volunteer.notes || '');
    setIsDetailsDialogOpen(true);
  };
  
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/volunteers/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      const updatedVolunteer = await response.json();
      setVolunteers(volunteers.map(v => 
        v._id === id ? updatedVolunteer.data : v
      ));
      
      if (selectedVolunteer?._id === id) {
        setSelectedVolunteer(updatedVolunteer.data);
      }
    
    toast({
      title: "Status Updated",
      description: `Volunteer status has been updated to ${newStatus}`,
    });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update volunteer status",
        variant: "destructive"
      });
    }
  };
  
  const handleSaveNotes = async () => {
    if (!selectedVolunteer) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/volunteers/${selectedVolunteer._id}/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ notes })
      });
      
      if (!response.ok) throw new Error('Failed to save notes');
      
      const updatedVolunteer = await response.json();
      setVolunteers(volunteers.map(v => 
        v._id === selectedVolunteer._id ? updatedVolunteer.data : v
      ));
      setSelectedVolunteer(updatedVolunteer.data);
      
      toast({
        title: "Notes Saved",
        description: "Volunteer notes have been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

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
                <TableRow key={volunteer._id}>
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
                        onValueChange={(value) => handleUpdateStatus(volunteer._id, value)}
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
                    <p><span className="font-medium">Join Date:</span> {new Date(selectedVolunteer.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills & Interests</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Skills:</span> {selectedVolunteer.skills}</p>
                    <div>
                      <p className="text-sm font-medium mb-1">Areas of Interest:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedVolunteer.interests.map((interest, index) => (
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
                      <p className="text-2xl font-bold">{selectedVolunteer.events.length}</p>
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
                      {selectedVolunteer.events.map((event, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{event.eventName}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
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
                      {selectedVolunteer.events.length === 0 && (
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
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" onClick={handleSaveNotes}>Save Notes</Button>
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