import {
  User, InsertUser, users,
  Project, InsertProject, projects,
  Cause, InsertCause, causes,
  Event, InsertEvent, events,
  GalleryItem, InsertGalleryItem, gallery,
  BlogPost, InsertBlogPost, blogPosts,
  Testimonial, InsertTestimonial, testimonials,
  Partner, InsertPartner, partners,
  Volunteer, InsertVolunteer, volunteers,
  Donation, InsertDonation, donations,
  VolunteerEvent, InsertVolunteerEvent, volunteerEvents,
  Certificate, InsertCertificate, certificates,
  Contact, InsertContact, contacts,
  Subscriber, InsertSubscriber, subscribers
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, data: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Cause operations
  getCauses(): Promise<Cause[]>;
  getCauseById(id: number): Promise<Cause | undefined>;
  createCause(cause: InsertCause): Promise<Cause>;
  updateCause(id: number, data: Partial<InsertCause>): Promise<Cause | undefined>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getPastEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Gallery operations
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Partner operations
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  
  // Volunteer operations
  getVolunteers(): Promise<Volunteer[]>;
  getVolunteerById(id: number): Promise<Volunteer | undefined>;
  getVolunteerByEmail(email: string): Promise<Volunteer | undefined>;
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  updateVolunteerStatus(id: number, status: string): Promise<Volunteer | undefined>;
  
  // Donation operations
  getDonations(): Promise<Donation[]>;
  getDonationById(id: number): Promise<Donation | undefined>;
  getDonationsByEmail(email: string): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: number, status: string, receipt?: string): Promise<Donation | undefined>;
  
  // Volunteer Event operations
  registerVolunteerForEvent(data: InsertVolunteerEvent): Promise<VolunteerEvent>;
  getVolunteerEvents(volunteerId: number): Promise<VolunteerEvent[]>;
  updateVolunteerEventStatus(volunteerId: number, eventId: number, status: string): Promise<VolunteerEvent | undefined>;
  
  // Certificate operations
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  getCertificateById(id: number): Promise<Certificate | undefined>;
  getCertificatesByVolunteer(volunteerId: number): Promise<Certificate[]>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Newsletter operations
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private causes: Map<number, Cause>;
  private events: Map<number, Event>;
  private galleryItems: Map<number, GalleryItem>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  private partners: Map<number, Partner>;
  private volunteers: Map<number, Volunteer>;
  private donations: Map<number, Donation>;
  private volunteerEvents: Map<string, VolunteerEvent>;
  private certificates: Map<number, Certificate>;
  private contacts: Map<number, Contact>;
  private subscribers: Map<number, Subscriber>;

  private userIdCounter: number = 1;
  private projectIdCounter: number = 1;
  private causeIdCounter: number = 1;
  private eventIdCounter: number = 1;
  private galleryIdCounter: number = 1;
  private blogIdCounter: number = 1;
  private testimonialIdCounter: number = 1;
  private partnerIdCounter: number = 1;
  private volunteerIdCounter: number = 1;
  private donationIdCounter: number = 1;
  private certificateIdCounter: number = 1;
  private contactIdCounter: number = 1;
  private subscriberIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.causes = new Map();
    this.events = new Map();
    this.galleryItems = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.partners = new Map();
    this.volunteers = new Map();
    this.donations = new Map();
    this.volunteerEvents = new Map();
    this.certificates = new Map();
    this.contacts = new Map();
    this.subscribers = new Map();
    
    // Initialize some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample projects (Strategic Spheres)
    const projectsData: InsertProject[] = [
      {
        title: "Rural Health Initiative",
        description: "Bringing essential healthcare services to underserved rural communities through mobile clinics and health camps.",
        category: "Health",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 65000,
        goal: 100000,
      },
      {
        title: "Digital Learning Centers",
        description: "Bridging the digital divide by establishing tech-enabled learning centers in rural schools and communities.",
        category: "Education",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 160000,
        goal: 200000,
      },
      {
        title: "Sustainable Farming",
        description: "Training farmers in organic methods and sustainable practices to improve yields and protect the environment.",
        category: "Ecocare",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 90000,
        goal: 200000,
      },
      {
        title: "Data-Led Governance",
        description: "Enhancing local governance through data collection, analysis, and evidence-based decision making processes.",
        category: "Research",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 45000,
        goal: 150000,
      }
    ];

    // Sample causes for donation
    const causesData: InsertCause[] = [
      {
        title: "Education for All",
        description: "Help us provide quality education to underprivileged children in rural communities through our mobile learning centers.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 280000,
        goal: 400000,
      },
      {
        title: "Women's Empowerment",
        description: "Support our empowering initiatives to train rural women in vocational skills, financial literacy, and entrepreneurship.",
        image: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 165000,
        goal: 300000,
      },
      
      {
        title: "Clean Water Project",
        description: "Help us install water purification systems and provide clean drinking water to communities facing water contamination.",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        raised: 120000,
        goal: 300000,
      }
    ];

    // Sample events
    const eventsData: InsertEvent[] = [
      {
        title: "Rural Health Camp",
        description: "A comprehensive health check-up camp organized for over 500 villagers, providing free consultations and medicines.",
        location: "Mehrauli, New Delhi",
        date: new Date("2023-04-15"),
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: "completed",
      },
      {
        title: "Digital Literacy Workshop",
        description: "A 3-day workshop to help rural women learn basic computer skills, internet usage, and digital financial literacy.",
        location: "Alwar, Rajasthan",
        date: new Date("2023-06-10"),
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: "upcoming",
      },
      {
        title: "Tree Planting Drive",
        description: "Join us for a community tree planting initiative where we aim to plant over 1,000 native species with local school children.",
        location: "Gurgaon, Haryana",
        date: new Date("2023-07-05"),
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: "upcoming",
      }
    ];

    // Sample gallery images
    const galleryData: InsertGalleryItem[] = [
      {
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Education Center",
        category: "Education",
      },
      {
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Health Camp",
        category: "Health",
      },
      {
        image: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Women's Empowerment",
        category: "Empowerment",
      },
      {
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Community Meeting",
        category: "Community",
      },
      {
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Organic Farming",
        category: "Ecocare",
      },
      {
        image: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Rural Education",
        category: "Education",
      },
      {
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Clean Water Project",
        category: "Water",
      },
      {
        image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Community Festival",
        category: "Community",
      }
    ];

    // Sample blog posts
    const blogPostsData: InsertBlogPost[] = [
      {
        title: "Transforming Rural Education Through Technology",
        excerpt: "How digital learning tools are bridging educational gaps in remote communities and opening new opportunities for rural children.",
        content: "Full article content about transforming rural education through technology...",
        image: "https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Education",
        author: {
          name: "Priya Sharma",
          title: "Education Specialist",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        date: new Date("2023-05-12"),
      },
      {
        title: "Community Health Workers: The Unsung Heroes",
        excerpt: "How local health workers are revolutionizing healthcare delivery in underserved areas through innovative approaches.",
        content: "Full article content about community health workers...",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Health",
        author: {
          name: "Dr. Amit Kumar",
          title: "Healthcare Consultant",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        date: new Date("2023-04-28"),
      },
      {
        title: "Rural Women Entrepreneurs Leading Change",
        excerpt: "Stories of resilience and innovation from women who are transforming their communities through small businesses.",
        content: "Full article content about rural women entrepreneurs...",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Women's Empowerment",
        author: {
          name: "Neha Gupta",
          title: "Rural Development Expert",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        date: new Date("2023-04-15"),
      }
    ];

    // Sample testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        name: "Meena Devi",
        title: "Village Health Worker",
        location: "Alwar, Rajasthan",
        quote: "The training I received from Supansha has changed not just my life but the entire village. I can now provide basic healthcare and education to women who previously had no access to such services.",
        avatar: "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        name: "Rakesh Kumar",
        title: "Farmer",
        location: "Sonipat, Haryana",
        quote: "Thanks to the sustainable farming techniques I learned, my crop yield has increased by 40% while using less water and no chemical fertilizers. My income has improved, and my soil is healthier.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        name: "Sunita Sharma",
        title: "Self-Help Group Leader",
        location: "Varanasi, UP",
        quote: "With microcredit support and business training from Supansha, our women's collective now runs a successful handicraft enterprise. We've gone from struggling to make ends meet to employing 25 women from our village.",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      }
    ];

    // Add sample data to storage
    projectsData.forEach(project => this.createProject(project));
    causesData.forEach(cause => this.createCause(cause));
    eventsData.forEach(event => this.createEvent(event));
    galleryData.forEach(item => this.createGalleryItem(item));
    blogPostsData.forEach(post => this.createBlogPost(post));
    testimonialsData.forEach(testimonial => this.createTestimonial(testimonial));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    // Ensure role is set with a default value if not provided
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      role: insertUser.role || "donor" // Default to "donor" if role is not provided
    };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category,
    );
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const createdAt = new Date();
    const updatedAt = new Date();
    // Ensure raised has a default value of 0 if not provided
    const newProject: Project = { 
      ...project, 
      raised: project.raised ?? 0, 
      id, 
      createdAt, 
      updatedAt 
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, data: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = {
      ...project,
      ...data,
      updatedAt: new Date(),
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Cause methods
  async getCauses(): Promise<Cause[]> {
    return Array.from(this.causes.values());
  }

  async getCauseById(id: number): Promise<Cause | undefined> {
    return this.causes.get(id);
  }

  async createCause(cause: InsertCause): Promise<Cause> {
    const id = this.causeIdCounter++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const newCause: Cause = { 
      ...cause, 
      id, 
      createdAt, 
      updatedAt,
      raised: cause.raised ?? 0 // Ensure raised is always a number
    };
    this.causes.set(id, newCause);
    return newCause;
  }

  async updateCause(id: number, data: Partial<InsertCause>): Promise<Cause | undefined> {
    const cause = this.causes.get(id);
    if (!cause) return undefined;
    
    const updatedCause: Cause = {
      ...cause,
      ...data,
      updatedAt: new Date(),
    };
    
    this.causes.set(id, updatedCause);
    return updatedCause;
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.status === "upcoming",
    );
  }

  async getPastEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.status === "completed",
    );
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const createdAt = new Date();
    const newEvent: Event = { 
      ...event, 
      id, 
      createdAt,
      status: event.status ?? "upcoming" // Ensure status is always defined
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  // Gallery methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(
      (item) => item.category === category,
    );
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.galleryIdCounter++;
    const createdAt = new Date();
    const newItem: GalleryItem = { ...item, id, createdAt };
    this.galleryItems.set(id, newItem);
    return newItem;
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(
      (post) => post.category === category,
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogIdCounter++;
    const createdAt = new Date();
    const newPost: BlogPost = { 
      ...post, 
      id, 
      createdAt,
      audio: post.audio ?? null, // Ensure audio is always string | null
      date: post.date ?? new Date() // Ensure date is always defined
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const createdAt = new Date();
    const newTestimonial: Testimonial = { ...testimonial, id, createdAt };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Partner methods
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const id = this.partnerIdCounter++;
    const newPartner: Partner = { ...partner, id };
    this.partners.set(id, newPartner);
    return newPartner;
  }

  // Volunteer methods
  async getVolunteers(): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values());
  }

  async getVolunteerById(id: number): Promise<Volunteer | undefined> {
    return this.volunteers.get(id);
  }

  async getVolunteerByEmail(email: string): Promise<Volunteer | undefined> {
    return Array.from(this.volunteers.values()).find(
      (volunteer) => volunteer.email === email,
    );
  }

  async createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer> {
    const id = this.volunteerIdCounter++;
    const createdAt = new Date();
    const newVolunteer: Volunteer = {
      ...volunteer,
      id,
      userId: null,
      status: "pending",
      createdAt,
      approvedDate: null, // Add the missing approvedDate property
      experience: volunteer.experience ?? null // Ensure experience is string | null
    };
    this.volunteers.set(id, newVolunteer);
    return newVolunteer;
  }

  async updateVolunteerStatus(id: number, status: string): Promise<Volunteer | undefined> {
    const volunteer = this.volunteers.get(id);
    if (!volunteer) return undefined;
    
    const updatedVolunteer: Volunteer = {
      ...volunteer,
      status,
      approvedDate: status === "approved" ? new Date() : null, // Use null instead of undefined
    };
    
    this.volunteers.set(id, updatedVolunteer);
    return updatedVolunteer;
  }

  // Donation methods
  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async getDonationById(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async getDonationsByEmail(email: string): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      (donation) => donation.email === email,
    );
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.donationIdCounter++;
    const date = new Date();
    const newDonation: Donation = {
      ...donation,
      id,
      date,
      userId: null,
      status: "pending",
      receipt: null, // Add the missing receipt property
      message: donation.message ?? null, // Ensure message is string | null
      causeId: donation.causeId ?? null // Ensure causeId is number | null
    };
    this.donations.set(id, newDonation);
    return newDonation;
  }

  async updateDonationStatus(id: number, status: string, receipt?: string): Promise<Donation | undefined> {
    const donation = this.donations.get(id);
    if (!donation) return undefined;
    
    const updatedDonation: Donation = {
      ...donation,
      status,
      receipt: receipt ?? null, // Use null instead of undefined
    };
    
    this.donations.set(id, updatedDonation);
    return updatedDonation;
  }

  // Volunteer Event methods
  async registerVolunteerForEvent(data: InsertVolunteerEvent): Promise<VolunteerEvent> {
    const id = `${data.volunteerId}-${data.eventId}`;
    const createdAt = new Date();
    
    const volunteerEvent: VolunteerEvent = {
      ...data,
      id: 0, // This is placeholder, composite key is used for storage
      status: "registered",
      certificateId: null,
      createdAt,
    };
    
    this.volunteerEvents.set(id, volunteerEvent);
    return volunteerEvent;
  }

  async getVolunteerEvents(volunteerId: number): Promise<VolunteerEvent[]> {
    return Array.from(this.volunteerEvents.values()).filter(
      (event) => event.volunteerId === volunteerId,
    );
  }

  async updateVolunteerEventStatus(volunteerId: number, eventId: number, status: string): Promise<VolunteerEvent | undefined> {
    const id = `${volunteerId}-${eventId}`;
    const volunteerEvent = this.volunteerEvents.get(id);
    if (!volunteerEvent) return undefined;
    
    const updatedEvent: VolunteerEvent = {
      ...volunteerEvent,
      status,
    };
    
    this.volunteerEvents.set(id, updatedEvent);
    return updatedEvent;
  }

  // Certificate methods
  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const id = this.certificateIdCounter++;
    const issueDate = new Date();
    
    const newCertificate: Certificate = {
      ...certificate,
      id,
      issueDate,
    };
    
    this.certificates.set(id, newCertificate);
    
    // Update the volunteer event with certificate id
    const volunteerEventKey = `${certificate.volunteerId}-${certificate.eventId}`;
    const volunteerEvent = this.volunteerEvents.get(volunteerEventKey);
    
    if (volunteerEvent) {
      volunteerEvent.certificateId = id;
      this.volunteerEvents.set(volunteerEventKey, volunteerEvent);
    }
    
    return newCertificate;
  }

  async getCertificateById(id: number): Promise<Certificate | undefined> {
    return this.certificates.get(id);
  }

  async getCertificatesByVolunteer(volunteerId: number): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).filter(
      (certificate) => certificate.volunteerId === volunteerId,
    );
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const createdAt = new Date();
    
    const newContact: Contact = {
      ...contact,
      id,
      createdAt,
      phone: contact.phone ?? null // Ensure phone is string | null
    };
    
    this.contacts.set(id, newContact);
    return newContact;
  }

  // Newsletter methods
  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberIdCounter++;
    const createdAt = new Date();
    
    const newSubscriber: Subscriber = {
      ...subscriber,
      id,
      createdAt,
    };
    
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
}

// Export the storage instance
export const storage = new MemStorage();
