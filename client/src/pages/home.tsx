import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/home/hero-section';
import OngoingProjects from '@/components/home/ongoing-projects';
import AboutMini from '@/components/home/about-mini';
import DonateCauses from '@/components/home/donate-causes';
import EventsSection from '@/components/home/events-section';
import GallerySection from '@/components/home/gallery-section';
import BlogSection from '@/components/home/blog-section';
import Testimonials from '@/components/home/testimonials';
import Partners from '@/components/home/partners';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Supansha Development Foundation - Delivering Sustainable Choices</title>
        <meta name="description" content="We stand for transformation, empowering individuals and communities to shape their own future with dignity, opportunity, and self-reliance." />
      </Helmet>

      <div>
        <HeroSection />
        <OngoingProjects />
        <AboutMini />
        <DonateCauses />
        <EventsSection />
        <GallerySection />
        <BlogSection />
        <Testimonials />
        <Partners />
      </div>
    </>
  );
};

export default Home;
