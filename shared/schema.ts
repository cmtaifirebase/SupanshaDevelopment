import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("donor"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true,
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  raised: doublePrecision("raised").notNull().default(0),
  goal: doublePrecision("goal").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  category: true,
  image: true,
  raised: true,
  goal: true,
});

// Causes (Donation Campaigns)
export const causes = pgTable("causes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  raised: doublePrecision("raised").notNull().default(0),
  goal: doublePrecision("goal").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCauseSchema = createInsertSchema(causes).pick({
  title: true,
  description: true,
  image: true,
  raised: true,
  goal: true,
});

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  image: text("image").notNull(),
  status: text("status").notNull().default("upcoming"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  date: true,
  image: true,
  status: true,
});

// Gallery
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGallerySchema = createInsertSchema(gallery).pick({
  image: true,
  caption: true,
  category: true,
});

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  audio: text("audio"),
  category: text("category").notNull(),
  author: json("author").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  excerpt: true,
  content: true,
  image: true,
  audio: true,
  category: true,
  author: true,
  date: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  quote: text("quote").notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  title: true,
  location: true,
  quote: true,
  avatar: true,
});

// Partners
export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  url: text("url").notNull(),
});

export const insertPartnerSchema = createInsertSchema(partners).pick({
  name: true,
  logo: true,
  url: true,
});

// Volunteers
export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age").notNull(),
  city: text("city").notNull(),
  interests: json("interests").notNull(),
  experience: text("experience"),
  availability: text("availability").notNull(),
  status: text("status").notNull().default("pending"),
  approvedDate: timestamp("approved_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVolunteerSchema = createInsertSchema(volunteers).pick({
  name: true,
  email: true,
  phone: true,
  age: true,
  city: true,
  interests: true,
  experience: true,
  availability: true,
});

// Donations
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  amount: doublePrecision("amount").notNull(),
  causeId: integer("cause_id").references(() => causes.id),
  message: text("message"),
  paymentId: text("payment_id").notNull(),
  status: text("status").notNull().default("pending"),
  date: timestamp("date").notNull().defaultNow(),
  receipt: text("receipt"),
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  name: true,
  email: true,
  phone: true,
  amount: true,
  causeId: true,
  message: true,
  paymentId: true,
});

// Volunteer Events
export const volunteerEvents = pgTable("volunteer_events", {
  id: serial("id").primaryKey(),
  volunteerId: integer("volunteer_id").notNull().references(() => volunteers.id),
  eventId: integer("event_id").notNull().references(() => events.id),
  status: text("status").notNull().default("registered"),
  certificateId: integer("certificate_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVolunteerEventSchema = createInsertSchema(volunteerEvents).pick({
  volunteerId: true,
  eventId: true,
  status: true,
});

// Certificates
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  volunteerId: integer("volunteer_id").notNull().references(() => volunteers.id),
  eventId: integer("event_id").notNull().references(() => events.id),
  volunteerName: text("volunteer_name").notNull(),
  eventName: text("event_name").notNull(),
  issueDate: timestamp("issue_date").notNull().defaultNow(),
  certificateUrl: text("certificate_url").notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  volunteerId: true,
  eventId: true,
  volunteerName: true,
  eventName: true,
  certificateUrl: true,
});

// Contact Submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
});

// Newsletter Subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
});

// Export types for use in application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Cause = typeof causes.$inferSelect;
export type InsertCause = z.infer<typeof insertCauseSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type GalleryItem = typeof gallery.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGallerySchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;

export type Volunteer = typeof volunteers.$inferSelect;
export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;

export type VolunteerEvent = typeof volunteerEvents.$inferSelect;
export type InsertVolunteerEvent = z.infer<typeof insertVolunteerEventSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
