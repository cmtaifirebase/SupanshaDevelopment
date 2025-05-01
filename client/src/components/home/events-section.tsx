import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Event } from '@/lib/types';
import EventCard from '@/components/shared/event-card';

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('past');

  const { data: upcomingEvents, isLoading: upcomingLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/upcoming'],
  });

  const { data: pastEvents, isLoading: pastLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/past'],
  });

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  const isLoading = activeTab === 'upcoming' ? upcomingLoading : pastLoading;

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Shared Moments</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Events that united communities — from awareness to workshops and cultural exchanges.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              type="button" 
              className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                activeTab === 'upcoming' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
            <button 
              type="button" 
              className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                activeTab === 'past' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-700">
              {activeTab === 'upcoming' 
                ? 'No upcoming events at the moment. Check back soon!' 
                : 'No past events to display.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
