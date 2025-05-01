import React from 'react';
import { Link } from 'wouter';
import { Event } from '@/lib/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, location, date, description, image, video, status } = event;
  
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {video ? (
        <div className="h-48 relative">
          <video 
            className="w-full h-full object-cover"
            poster={image}
            controls
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            Video
          </div>
        </div>
      ) : (
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-montserrat font-semibold text-xl">{title}</h3>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
          <span className={`
            text-xs font-semibold px-2.5 py-0.5 rounded
            ${status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          `}>
            {status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        <div className="flex items-center mb-4 text-sm text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link 
          href={`/event-details/${id}`} 
          className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
