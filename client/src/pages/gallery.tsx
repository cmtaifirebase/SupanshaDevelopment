import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { GalleryImage } from '@/lib/types';
import GalleryItem from '@/components/shared/gallery-item';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const { data: galleryItems, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
  });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'Health', name: 'Health' },
    { id: 'Education', name: 'Education' },
    { id: 'Community', name: 'Community' },
    { id: 'Empowerment', name: 'Empowerment' },
    { id: 'Ecocare', name: 'Ecocare' },
    { id: 'Water', name: 'Water' },
  ];

  const filteredGallery = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems?.filter(item => item.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Supansha Development Foundation</title>
        <meta name="description" content="View images from our events, projects, and initiatives. A visual journey of our impact across communities." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Scenes of Change</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            A visual journal of impact — snapshots of action, energy, and transformation on ground.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredGallery && filteredGallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGallery.map(item => (
                    <GalleryItem 
                      key={item.id} 
                      item={item} 
                      onClick={openLightbox}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">No Images Found</h2>
                  <p className="text-gray-600">
                    No images found in this category. Please try another category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="sm:max-w-3xl bg-black/90">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedImage?.caption}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex items-center justify-center">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.caption} 
                className="max-h-[70vh] w-auto" 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Our Impact */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-10 text-center">Our Impact in Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-700">Villages</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">12,500+</div>
              <div className="text-gray-700">Lives Touched</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">40+</div>
              <div className="text-gray-700">Events</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-700">States</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Be Part of the Change</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our work is made possible by volunteers and donors who believe in our mission. 
            Join us in creating sustainable impact and transforming lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/donate" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Donate Now
            </a>
            <a href="/volunteer" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
