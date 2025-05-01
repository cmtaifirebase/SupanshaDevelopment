import React from 'react';
import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, title, location, quote, avatar } = testimonial;
  
  return (
    <div className="bg-light rounded-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-montserrat font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{title} | {location}</p>
        </div>
      </div>
      <blockquote className="text-gray-700 italic font-lora relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200 absolute -top-4 -left-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="relative z-10">{quote}</p>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
