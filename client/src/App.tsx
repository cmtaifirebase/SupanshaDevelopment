import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/authContext";

// Public Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Causes from "@/pages/causes";
import Donate from "@/pages/donate";
import Volunteer from "@/pages/volunteer";
import Certificate from "@/pages/certificate";
import Gallery from "@/pages/gallery";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contact from "@/pages/contact";
import FAQ from "@/pages/faq";
import NotFound from "@/pages/not-found";

// Shape the Future
import Careers from "@/pages/careers";
import Partnerships from "@/pages/partnerships";
import Internships from "@/pages/internships";
import Forums from "@/pages/forums";

// Skill Store
import ShopProducts from "@/pages/skill-store/shop-products";
import HireSkills from "@/pages/skill-store/hire-skills";
import CommunityForum from "@/pages/skill-store/community-forum";
import ListingGuide from "@/pages/skill-store/listing-guide";

// Admin Panel Pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminVolunteers from "@/pages/admin/volunteers";
import AdminDonations from "@/pages/admin/donations";
import AdminCertificates from "@/pages/admin/certificates";

// Admin new pages
import AdminReports from "@/pages/admin/reports";
import AdminFormats from "@/pages/admin/formats";
import AdminEvents from "@/pages/admin/events";
import AdminJobs from "@/pages/admin/jobs";
import AdminBlogs from "@/pages/admin/blogs";
import AdminCauses from "@/pages/admin/causes";
import AdminCrowdFunding from "@/pages/admin/crowdFunding";
import AdminForum from "@/pages/admin/forum";
import AdminShop from "@/pages/admin/shop";
import Profile from "@/pages/admin/Profile";

// Admin Layout
import AdminLayout from "@/layouts/AdminLayout";


function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
        <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <PublicLayout>
          <Home />
        </PublicLayout>
      </Route>
      <Route path="/about">
        <PublicLayout>
          <About />
        </PublicLayout>
      </Route>
      <Route path="/causes">
        <PublicLayout>
          <Causes />
        </PublicLayout>
      </Route>
      <Route path="/donate">
        <PublicLayout>
          <Donate />
        </PublicLayout>
      </Route>
      <Route path="/volunteer">
        <PublicLayout>
          <Volunteer />
        </PublicLayout>
      </Route>
      <Route path="/certificate">
        <PublicLayout>
          <Certificate />
        </PublicLayout>
      </Route>
      <Route path="/gallery">
        <PublicLayout>
          <Gallery />
        </PublicLayout>
      </Route>
      <Route path="/blog">
        <PublicLayout>
          <Blog />
        </PublicLayout>
      </Route>
      <Route path="/blog/:id">
        <PublicLayout>
          <BlogPost />
        </PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout>
          <Contact />
        </PublicLayout>
      </Route>
      <Route path="/faq">
        <PublicLayout>
          <FAQ />
        </PublicLayout>
      </Route>
      <Route path="/pages/admin/login">
        <PublicLayout>
          <Login />
        </PublicLayout>
      </Route>
      <Route path="/pages/admin/signup">
        <PublicLayout>
          <Signup />
        </PublicLayout>
      </Route>

      {/* Shape the Future Routes */}
      <Route path="/careers">
        <PublicLayout>
          <Careers />
        </PublicLayout>
      </Route>
      <Route path="/partnerships">
        <PublicLayout>
          <Partnerships />
        </PublicLayout>
      </Route>
      <Route path="/internships">
        <PublicLayout>
          <Internships />
        </PublicLayout>
      </Route>
      <Route path="/forums">
        <PublicLayout>
          <Forums />
        </PublicLayout>
      </Route>

      {/* Skill Store Routes */}
      <Route path="/skill-store/shop-products">
        <PublicLayout>
          <ShopProducts />
        </PublicLayout>
      </Route>
      <Route path="/skill-store/hire-skills">
        <PublicLayout>
          <HireSkills />
        </PublicLayout>
      </Route>
      <Route path="/skill-store/community-forum">
        <PublicLayout>
          <CommunityForum />
        </PublicLayout>
      </Route>
      <Route path="/skill-store/listing-guide">
        <PublicLayout>
          <ListingGuide />
        </PublicLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      
      <Route path="/admin/dashboard">
        <PrivateRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/users">
        <PrivateRoute>
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/volunteers">
        <PrivateRoute>
          <AdminLayout>
            <AdminVolunteers />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/donations">
        <PrivateRoute>
          <AdminLayout>
            <AdminDonations />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/certificates">
        <PrivateRoute>
          <AdminLayout>
            <AdminCertificates />
          </AdminLayout>
        </PrivateRoute>
      </Route>

      {/* Admin new routes */}
      <Route path="/admin/reports">
        <PrivateRoute>
          <AdminLayout>
            <AdminReports />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/formats">
        <PrivateRoute>
          <AdminLayout>
            <AdminFormats />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/events">
        <PrivateRoute>
          <AdminLayout>
            <AdminEvents />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/jobs">
        <PrivateRoute>
          <AdminLayout>
            <AdminJobs />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/blogs">
        <PrivateRoute>
          <AdminLayout>
            <AdminBlogs />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/causes">
        <PrivateRoute>
          <AdminLayout>
            <AdminCauses />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/crowd-funding">
        <PrivateRoute>
          <AdminLayout>
            <AdminCrowdFunding />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/forum">
        <PrivateRoute>
          <AdminLayout>
            <AdminForum />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/shop">
        <PrivateRoute>
          <AdminLayout>
            <AdminShop />
          </AdminLayout>
        </PrivateRoute>
      </Route>
      <Route path="/admin/profile">
        <AdminLayout>
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
        </AdminLayout>
      </Route>

      {/* Catch-all */}
      <Route>
        <PublicLayout>
          <NotFound />
        </PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;