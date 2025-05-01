import React from 'react';
import { Link } from 'wouter';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[600px] sm:h-[550px] lg:h-[650px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
            Creating empowered communities through sustainable choices
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200">
            We stand for transformation, empowering individuals and communities to shape their own future with dignity, opportunity, and self-reliance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="bg-[#F14B05] hover:bg-[#F14B05]/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Read More
            </Link>
            <Link href="/donate" className="bg-[#E94E77] hover:bg-[#E94E77]/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Donate Now
            </Link>
            <Link href="/volunteer" className="bg-white hover:bg-gray-100 text-dark px-6 py-3 rounded-md font-medium transition-colors">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
