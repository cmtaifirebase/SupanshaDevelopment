import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertUserSchema,
  insertProjectSchema,
  insertCauseSchema,
  insertEventSchema,
  insertGallerySchema,
  insertBlogPostSchema,
  insertTestimonialSchema,
  insertPartnerSchema,
  insertVolunteerSchema,
  insertDonationSchema,
  insertVolunteerEventSchema,
  insertCertificateSchema,
  insertContactSchema,
  insertSubscriberSchema,
} from "@shared/schema";
import { ZodError } from "zod";

// Validate request body against schema
function validateRequest<T>(schema: z.ZodType<T>, req: Request, res: Response): T | null {
  try {
    return schema.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors 
      });
    } else {
      res.status(400).json({ message: "Invalid request data" });
    }
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - All routes are prefixed with /api
  
  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Projects API
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.get("/api/projects/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const projects = await storage.getProjectsByCategory(category);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects by category" });
    }
  });

  // Causes API
  app.get("/api/causes", async (_req, res) => {
    try {
      const causes = await storage.getCauses();
      res.json(causes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch causes" });
    }
  });

  app.get("/api/causes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cause = await storage.getCauseById(id);
      
      if (!cause) {
        return res.status(404).json({ message: "Cause not found" });
      }
      
      res.json(cause);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cause" });
    }
  });

  // Events API
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/upcoming", async (_req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  app.get("/api/events/past", async (_req, res) => {
    try {
      const events = await storage.getPastEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch past events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEventById(id);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  // Gallery API
  app.get("/api/gallery", async (_req, res) => {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const galleryItems = await storage.getGalleryItemsByCategory(category);
      res.json(galleryItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items by category" });
    }
  });

  // Blog API
  app.get("/api/blog", async (_req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blogPost = await storage.getBlogPostById(id);
      
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/blog/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const blogPosts = await storage.getBlogPostsByCategory(category);
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts by category" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Partners API
  app.get("/api/partners", async (_req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  // Volunteer API
  app.post("/api/volunteer/register", async (req, res) => {
    const data = validateRequest(insertVolunteerSchema, req, res);
    if (!data) return;
    
    try {
      // Check if volunteer with this email already exists
      const existingVolunteer = await storage.getVolunteerByEmail(data.email);
      
      if (existingVolunteer) {
        return res.status(400).json({ message: "Volunteer with this email already exists" });
      }
      
      const volunteer = await storage.createVolunteer(data);
      res.status(201).json({ 
        message: "Volunteer registration successful. Your application is under review.", 
        volunteer 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to register volunteer" });
    }
  });

  app.get("/api/volunteer/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await storage.getVolunteerById(id);
      
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      
      res.json(volunteer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch volunteer" });
    }
  });

  app.post("/api/volunteer/:id/approve", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await storage.updateVolunteerStatus(id, "approved");
      
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      
      res.json({ message: "Volunteer approved successfully", volunteer });
    } catch (error) {
      res.status(500).json({ message: "Failed to approve volunteer" });
    }
  });

  app.post("/api/volunteer/:id/reject", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const volunteer = await storage.updateVolunteerStatus(id, "rejected");
      
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      
      res.json({ message: "Volunteer rejected", volunteer });
    } catch (error) {
      res.status(500).json({ message: "Failed to reject volunteer" });
    }
  });

  // Volunteer Event Registration API
  app.post("/api/volunteer/event/register", async (req, res) => {
    const data = validateRequest(insertVolunteerEventSchema, req, res);
    if (!data) return;
    
    try {
      // Check if volunteer exists
      const volunteer = await storage.getVolunteerById(data.volunteerId);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      
      // Check if volunteer is approved
      if (volunteer.status !== "approved") {
        return res.status(400).json({ message: "Volunteer is not approved yet" });
      }
      
      // Check if event exists
      const event = await storage.getEventById(data.eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      const volunteerEvent = await storage.registerVolunteerForEvent(data);
      res.status(201).json({ 
        message: "Registered for event successfully", 
        volunteerEvent 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to register for event" });
    }
  });

  app.get("/api/volunteer/:id/events", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const events = await storage.getVolunteerEvents(id);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch volunteer events" });
    }
  });

  // Certificate API
  app.post("/api/certificate/generate", async (req, res) => {
    const data = validateRequest(insertCertificateSchema, req, res);
    if (!data) return;
    
    try {
      // Check if volunteer exists
      const volunteer = await storage.getVolunteerById(data.volunteerId);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      
      // Check if event exists
      const event = await storage.getEventById(data.eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      // Generate certificate URL (in a real app, this would generate a PDF)
      const certificateUrl = `/certificates/${data.volunteerId}-${data.eventId}.pdf`;
      
      const certificate = await storage.createCertificate({
        ...data,
        certificateUrl
      });
      
      res.status(201).json({ 
        message: "Certificate generated successfully", 
        certificate 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate certificate" });
    }
  });

  app.get("/api/certificate/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const certificate = await storage.getCertificateById(id);
      
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch certificate" });
    }
  });

  app.get("/api/volunteer/:id/certificates", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const certificates = await storage.getCertificatesByVolunteer(id);
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch volunteer certificates" });
    }
  });

  // Donation API
  app.post("/api/donate", async (req, res) => {
    const data = validateRequest(insertDonationSchema, req, res);
    if (!data) return;
    
    try {
      // In a real application, this would integrate with Razorpay API
      // For now, we'll simulate a successful payment
      const paymentId = `pay_${Math.random().toString(36).substring(2, 15)}`;
      
      const donation = await storage.createDonation({
        ...data,
        paymentId
      });
      
      // Update the cause's raised amount if causeId is provided
      if (donation.causeId) {
        const cause = await storage.getCauseById(donation.causeId);
        if (cause) {
          await storage.updateCause(cause.id, {
            raised: cause.raised + donation.amount
          });
        }
      }
      
      // Generate receipt URL (in a real app, this would generate a PDF)
      const receiptUrl = `/receipts/${donation.id}.pdf`;
      
      // Update donation status to completed and add receipt
      const updatedDonation = await storage.updateDonationStatus(
        donation.id, 
        "completed", 
        receiptUrl
      );
      
      res.status(201).json({ 
        message: "Donation successful", 
        donation: updatedDonation 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process donation" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    const data = validateRequest(insertContactSchema, req, res);
    if (!data) return;
    
    try {
      const contact = await storage.createContact(data);
      res.status(201).json({ 
        message: "Message sent successfully. We'll get back to you soon!", 
        contact 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Newsletter API
  app.post("/api/newsletter/subscribe", async (req, res) => {
    const data = validateRequest(insertSubscriberSchema, req, res);
    if (!data) return;
    
    try {
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(data.email);
      
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      const subscriber = await storage.addSubscriber(data);
      res.status(201).json({ 
        message: "Subscribed to newsletter successfully", 
        subscriber 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
