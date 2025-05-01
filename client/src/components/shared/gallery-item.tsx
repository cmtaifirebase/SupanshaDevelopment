import React from 'react';
import { GalleryImage } from '@/lib/types';

interface GalleryItemProps {
  item: GalleryImage;
  onClick?: (item: GalleryImage) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  const { image, caption } = item;
  
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg group h-64 cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={image} 
        alt={caption} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-medium">{caption}</span>
      </div>
    </div>
  );
};

export default GalleryItem;
