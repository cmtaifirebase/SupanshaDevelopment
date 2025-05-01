import React from 'react';
import { Helmet } from 'react-helmet';
import VolunteerForm from '@/components/forms/volunteer-form';
import { useQuery } from '@tanstack/react-query';

const Volunteer: React.FC = () => {
  const { data: upcomingEvents } = useQuery({
    queryKey: ['/api/events/upcoming'],
  });

  return (
    <>
      <Helmet>
        <title>Become a Volunteer - Supansha Development Foundation</title>
        <meta name="description" content="Join our team of volunteers and contribute your skills to create sustainable change in communities. Apply now to become part of our network of change-makers." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Become a Volunteer</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Join our network of committed individuals who are driving change at the grassroots level. Your skills and time can make a significant impact.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-montserrat font-bold mb-2">Volunteer Application Form</h2>
                <p className="text-gray-600 mb-6">Complete the form below to join our volunteer network. Once submitted, our team will review your application and reach out within 3-5 business days.</p>
                
                <VolunteerForm />
              </div>
            </div>

            <div className="space-y-8">
              {/* Why Volunteer */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Why Volunteer With Us?</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Make a meaningful impact in underserved communities</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Develop new skills and gain field experience</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Network with like-minded individuals and professionals</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Receive formal recognition and certification</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Be part of creating sustainable, long-term change</span>
                  </li>
                </ul>
              </div>

              {/* Volunteer Opportunities */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Upcoming Volunteer Opportunities</h3>
                
                {upcomingEvents && upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event: any) => (
                      <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <a href={`/events/${event.id}`} className="text-primary hover:text-primary/80 text-sm font-medium">
                          View Details →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Check back soon for upcoming volunteer opportunities.</p>
                )}

                <div className="mt-4">
                  <a 
                    href="/events" 
                    className="text-primary hover:text-primary/80 font-medium flex items-center"
                  >
                    View All Events
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Volunteer Testimonial</h3>
                <blockquote className="italic relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700 absolute -top-4 -left-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="relative z-10 mb-4">
                    Volunteering with Supansha has been the most rewarding experience of my life. The team is supportive, the work is meaningful, and the impact on communities is tangible. I've grown both personally and professionally through this journey.
                  </p>
                  <footer className="text-gray-300">
                    <div className="font-semibold">Rahul Sharma</div>
                    <div className="text-sm">Volunteer since 2021</div>
                  </footer>
                </blockquote>
              </div>

              {/* Already a Volunteer? */}
              <div className="bg-secondary bg-opacity-10 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4 text-secondary">Already a Volunteer?</h3>
                <p className="text-gray-700 mb-4">
                  If you've already registered and participated in our events, you can download your volunteer certificate.
                </p>
                <a 
                  href="/certificate" 
                  className="block text-center bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-md text-sm font-medium transition-colors"
                >
                  Get Your Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Process */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Apply</h3>
              <p className="text-gray-600">Fill out the volunteer application form with your details and areas of interest</p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-primary" style={{ width: 'calc(100% - 3.5rem)', left: '3.5rem' }}></div>
            </div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Approval</h3>
              <p className="text-gray-600">Our team reviews your application and approves your volunteer status</p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-primary" style={{ width: 'calc(100% - 3.5rem)', left: '3.5rem' }}></div>
            </div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Participation</h3>
              <p className="text-gray-600">Join events and activities based on your skills and availability</p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-primary" style={{ width: 'calc(100% - 3.5rem)', left: '3.5rem' }}></div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">Certification</h3>
              <p className="text-gray-600">Receive your volunteer certificate after successful event participation</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">What skills are you looking for in volunteers?</h3>
                <p className="text-gray-700">
                  We welcome volunteers with diverse skills - from teaching, healthcare, and IT to photography, 
                  content writing, and event management. Everyone has something valuable to contribute!
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">How much time do I need to commit?</h3>
                <p className="text-gray-700">
                  We offer flexible volunteering options. You can participate in one-time events, commit to 
                  regular weekly or monthly volunteering, or even volunteer remotely. We work around your schedule.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Do I need prior experience to volunteer?</h3>
                <p className="text-gray-700">
                  No prior experience is required for most volunteer roles. We provide necessary training and 
                  orientation. Your enthusiasm and commitment are the most important qualifications.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">When will I receive my volunteer certificate?</h3>
                <p className="text-gray-700">
                  Certificates are issued after you've completed participation in at least one event or 
                  contributed a minimum of 10 hours to our projects. You can download your certificate 
                  from your volunteer dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Volunteer;
