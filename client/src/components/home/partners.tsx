import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Partner } from '@/lib/types';

const Partners: React.FC = () => {
  const { data: partners, isLoading } = useQuery<Partner[]>({
    queryKey: ['/api/partners'],
  });

  return (
    <section className="py-12 bg-light border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl">Our Partners</h2>
          <p className="text-gray-600">Organizations that collaborate with us to create lasting change</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : partners && partners.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map(partner => (
              <a 
                key={partner.id} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="grayscale hover:grayscale-0 transition-all duration-300 w-32 h-16 flex items-center justify-center"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full" 
                />
              </a>
            ))}
          </div>
        ) : (
          // If no partners are available, display placeholder boxes
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i}
                className="bg-gray-300 w-32 h-12 rounded flex items-center justify-center text-gray-600"
              >
                Partner {i}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
