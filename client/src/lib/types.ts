// Shared Types

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  raised: number;
  goal: number;
  progress: number;
}

export interface Cause {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  progress: number;
  category?: string; // Add optional category property
}

export interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  video?: string;
  status: 'upcoming' | 'completed';
}

export interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  audio?: string | null;
  category: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  date: string;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  url: string;
}

export interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  causeId?: number;
  message?: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  interests: string[];
  experience?: string;
  availability: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'volunteer' | 'donor';
}

export interface Volunteer {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  interests: string[];
  experience: string;
  availability: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedDate?: string;
}

export interface Donation {
  id: number;
  userId?: number;
  name: string;
  email: string;
  phone: string;
  amount: number;
  causeId?: number;
  message?: string;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  receipt?: string;
}

export interface VolunteerEvent {
  volunteerId: number;
  eventId: number;
  status: 'registered' | 'attended' | 'completed';
  certificateId?: number;
}

export interface Certificate {
  id: number;
  volunteerId: number;
  eventId: number;
  volunteerName: string;
  eventName: string;
  issueDate: string;
  certificateUrl: string;
}
