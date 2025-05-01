import React from 'react';
import { Link } from 'wouter';

const AboutMini: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-montserrat font-bold text-3xl mb-4">About SUPANSHA®</h2>
            <p className="text-gray-700 mb-4">
              At Supansha Development Foundation, we stand for more than just service delivery—we stand for transformation. 
              Every initiative we design and implement is guided by our mission of <span className="font-semibold">Delivering Sustainable Choices</span>, 
              empowering individuals and communities to shape their own future with dignity, opportunity, and self-reliance.
            </p>
            <p className="text-gray-700 mb-6">
              Our name, SUPANSHA, is inspired by the Sanskrit words "सु" (Su) meaning good or noble, 
              and "पंशा" (Pansha) meaning support or encouragement. Together, they symbolize "Noble Support", 
              the essence of what we offer: upliftment, strength, and hope for a better tomorrow.
            </p>
            <Link 
              href="/about" 
              className="inline-block bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-md font-medium transition-colors"
            >
              Read More
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Supansha team and community activity" 
              className="rounded-lg shadow-lg w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMini;
