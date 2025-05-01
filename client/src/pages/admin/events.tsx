import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { fetchEvents, createEvent, updateEvent, deleteEvent, Event, CreateEventRequest, UpdateEventRequest } from '@/lib/api';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

type ApprovalStatus = 'Draft' | 'Pending' | 'Approved';

type FormData = Omit<CreateEventRequest, 'targetAudience' | 'sponsorLogos' | 'sponsorLogoOrder' | 'eventDocuments'> & {
  targetAudience: string;
  sponsorLogos: string;
  sponsorLogoOrder: string;
  eventDocuments: string;
};

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Form states
  const [formData, setFormData] = useState<FormData>({
    organizerName: '',
    eventTitle: '',
    targetAudience: '',
    startDateTime: '',
    endDateTime: '',
    isFreeEvent: true,
    autoAttendanceRequired: false,
    needVolunteers: false,
    sponsorLogos: '',
    sponsorLogoOrder: '',
    certificateSettings: {
      enableCertificate: false,
      signatories: []
    },
    eventDocuments: '',
    approvalStatus: 'Pending',
    displayOnWebsite: false,
  });

  // Fetch events
  const { data: events, isLoading, refetch: refetchEvents } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  // Create event mutation
  const createEventMutation = useMutation<{ success: boolean; event: Event }, Error, CreateEventRequest>({
    mutationFn: createEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsCreateDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Event created successfully',
      });
      setFormData({
        organizerName: '',
        eventTitle: '',
        targetAudience: '',
        startDateTime: '',
        endDateTime: '',
        isFreeEvent: true,
        autoAttendanceRequired: false,
        needVolunteers: false,
        sponsorLogos: '',
        sponsorLogoOrder: '',
        certificateSettings: {
          enableCertificate: false,
          signatories: []
        },
        eventDocuments: '',
        approvalStatus: 'Pending',
        displayOnWebsite: false,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation<{ success: boolean; event: Event }, Error, { id: string; data: UpdateEventRequest }>({
    mutationFn: ({ id, data }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsEditDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation<{ success: boolean }, Error, string>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Filter events based on search term
  const filteredEvents = events?.events?.filter((event) =>
    event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: CreateEventRequest = {
      ...formData,
      targetAudience: formData.targetAudience.split(',').map(item => item.trim()).filter(Boolean),
      sponsorLogos: formData.sponsorLogos.split(',').map(item => item.trim()).filter(Boolean),
      sponsorLogoOrder: formData.sponsorLogoOrder.split(',').map(item => item.trim()).filter(Boolean),
      eventDocuments: formData.eventDocuments.split(',').map(item => item.trim()).filter(Boolean),
      approvalStatus: formData.approvalStatus as ApprovalStatus,
    };

    if (selectedEvent) {
      updateEventMutation.mutate({
        id: selectedEvent._id,
        data: submitData
      });
    } else {
      createEventMutation.mutate(submitData);
    }
  };

  // Handle edit
  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      organizerName: event.organizerName,
      eventTitle: event.eventTitle,
      targetAudience: event.targetAudience.join(', '),
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime || '',
      isFreeEvent: event.isFreeEvent,
      autoAttendanceRequired: event.autoAttendanceRequired,
      needVolunteers: event.needVolunteers,
      sponsorLogos: event.sponsorLogos.join(', '),
      sponsorLogoOrder: event.sponsorLogoOrder.join(', '),
      certificateSettings: {
        enableCertificate: event.certificateSettings.enableCertificate,
        signatories: event.certificateSettings.signatories
      },
      eventDocuments: event.eventDocuments.join(', '),
      approvalStatus: event.approvalStatus,
      displayOnWebsite: event.displayOnWebsite,
    });
    setIsEditDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEventMutation.mutate(eventId);
    }
  };

  // Handle update event
  const handleUpdateEvent = (eventId: string, data: Partial<UpdateEventRequest>) => {
    updateEventMutation.mutate({
      id: eventId,
      data
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => refetchEvents()}>
            Refresh
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create Event
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents?.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.eventTitle}</TableCell>
                <TableCell>{event.organizerName}</TableCell>
                <TableCell>{format(new Date(event.startDateTime), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Select
                    value={event.approvalStatus}
                    onValueChange={(value) => handleUpdateEvent(event._id, { approvalStatus: value as ApprovalStatus })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new event.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="organizerName">Organizer Name</Label>
                <Input
                  id="organizerName"
                  value={formData.organizerName}
                  onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience (comma-separated)</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="startDateTime">Start Date & Time</Label>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDateTime">End Date & Time</Label>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sponsorLogos">Sponsor Logos (comma-separated URLs)</Label>
                <Input
                  id="sponsorLogos"
                  value={formData.sponsorLogos}
                  onChange={(e) => setFormData({ ...formData, sponsorLogos: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sponsorLogoOrder">Sponsor Logo Order (comma-separated)</Label>
                <Input
                  id="sponsorLogoOrder"
                  value={formData.sponsorLogoOrder}
                  onChange={(e) => setFormData({ ...formData, sponsorLogoOrder: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="eventDocuments">Event Documents (comma-separated URLs)</Label>
                <Input
                  id="eventDocuments"
                  value={formData.eventDocuments}
                  onChange={(e) => setFormData({ ...formData, eventDocuments: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFreeEvent"
                  checked={formData.isFreeEvent}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFreeEvent: checked as boolean })}
                />
                <Label htmlFor="isFreeEvent">Free Event</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoAttendanceRequired"
                  checked={formData.autoAttendanceRequired}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoAttendanceRequired: checked as boolean })}
                />
                <Label htmlFor="autoAttendanceRequired">Auto Attendance Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needVolunteers"
                  checked={formData.needVolunteers}
                  onCheckedChange={(checked) => setFormData({ ...formData, needVolunteers: checked as boolean })}
                />
                <Label htmlFor="needVolunteers">Need Volunteers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="displayOnWebsite"
                  checked={formData.displayOnWebsite}
                  onCheckedChange={(checked) => setFormData({ ...formData, displayOnWebsite: checked as boolean })}
                />
                <Label htmlFor="displayOnWebsite">Display on Website</Label>
              </div>
              <div>
                <Label htmlFor="approvalStatus">Approval Status</Label>
                <Select
                  value={formData.approvalStatus}
                  onValueChange={(value) => setFormData({ ...formData, approvalStatus: value as ApprovalStatus })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableCertificate"
                  checked={formData.certificateSettings.enableCertificate}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    certificateSettings: {
                      ...formData.certificateSettings,
                      enableCertificate: checked as boolean
                    }
                  })}
                />
                <Label htmlFor="enableCertificate">Enable Certificate</Label>
              </div>
            </div>
            <DialogFooter className="sticky bottom-0 bg-background pt-4">
              <Button type="submit">
                {selectedEvent ? 'Update' : 'Create'} Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the event details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="organizerName">Organizer Name</Label>
                <Input
                  id="organizerName"
                  value={formData.organizerName}
                  onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience (comma-separated)</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="startDateTime">Start Date & Time</Label>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDateTime">End Date & Time</Label>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sponsorLogos">Sponsor Logos (comma-separated URLs)</Label>
                <Input
                  id="sponsorLogos"
                  value={formData.sponsorLogos}
                  onChange={(e) => setFormData({ ...formData, sponsorLogos: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="sponsorLogoOrder">Sponsor Logo Order (comma-separated)</Label>
                <Input
                  id="sponsorLogoOrder"
                  value={formData.sponsorLogoOrder}
                  onChange={(e) => setFormData({ ...formData, sponsorLogoOrder: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="eventDocuments">Event Documents (comma-separated URLs)</Label>
                <Input
                  id="eventDocuments"
                  value={formData.eventDocuments}
                  onChange={(e) => setFormData({ ...formData, eventDocuments: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFreeEvent"
                  checked={formData.isFreeEvent}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFreeEvent: checked as boolean })}
                />
                <Label htmlFor="isFreeEvent">Free Event</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoAttendanceRequired"
                  checked={formData.autoAttendanceRequired}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoAttendanceRequired: checked as boolean })}
                />
                <Label htmlFor="autoAttendanceRequired">Auto Attendance Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needVolunteers"
                  checked={formData.needVolunteers}
                  onCheckedChange={(checked) => setFormData({ ...formData, needVolunteers: checked as boolean })}
                />
                <Label htmlFor="needVolunteers">Need Volunteers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="displayOnWebsite"
                  checked={formData.displayOnWebsite}
                  onCheckedChange={(checked) => setFormData({ ...formData, displayOnWebsite: checked as boolean })}
                />
                <Label htmlFor="displayOnWebsite">Display on Website</Label>
              </div>
              <div>
                <Label htmlFor="approvalStatus">Approval Status</Label>
                <Select
                  value={formData.approvalStatus}
                  onValueChange={(value) => setFormData({ ...formData, approvalStatus: value as ApprovalStatus })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableCertificate"
                  checked={formData.certificateSettings.enableCertificate}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    certificateSettings: {
                      ...formData.certificateSettings,
                      enableCertificate: checked as boolean
                    }
                  })}
                />
                <Label htmlFor="enableCertificate">Enable Certificate</Label>
              </div>
            </div>
            <DialogFooter className="sticky bottom-0 bg-background pt-4">
              <Button type="submit">
                Update Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}