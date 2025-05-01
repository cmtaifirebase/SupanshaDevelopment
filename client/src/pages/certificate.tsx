import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Certificate } from '@/lib/types';

const CertificatePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [volunteerId, setVolunteerId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // This will be enabled only after volunteerId is set
  const { data: certificates, isLoading: certificatesLoading } = useQuery<Certificate[]>({
    queryKey: ['/api/volunteer/' + volunteerId + '/certificates'],
    enabled: volunteerId !== null,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSearching(true);
    try {
      // In a real application, this would be an API call to find the volunteer by email
      const res = await fetch(`/api/volunteer?email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        throw new Error('Volunteer not found');
      }
      const data = await res.json();
      setVolunteerId(data.id);
    } catch (error) {
      toast({
        title: 'Volunteer Not Found',
        description: 'We couldn\'t find a volunteer with that email address. Please check and try again.',
        variant: 'destructive',
      });
      setVolunteerId(null);
    } finally {
      setIsSearching(false);
    }
  };

  const downloadCertificate = (certificate: Certificate) => {
    // In a real application, this would download the PDF
    toast({
      title: 'Certificate Downloaded',
      description: `Certificate for ${certificate.eventName} has been downloaded.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Volunteer Certificate - Supansha Development Foundation</title>
        <meta name="description" content="Download your volunteer participation certificate. Recognize your contribution to community development and social change." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Volunteer Certificate</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Download your certificate for participating in our events and activities. Thank you for your dedication and service!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-montserrat font-bold mb-6">Access Your Certificates</h2>
              
              {!volunteerId ? (
                <>
                  <p className="text-gray-700 mb-6">
                    Enter the email address you used for volunteer registration to access your certificates.
                  </p>
                  
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSearching}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition-colors flex justify-center items-center"
                    >
                      {isSearching ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching...
                        </>
                      ) : (
                        'Search for Certificates'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-xl font-montserrat font-semibold">Your Certificates</h3>
                    <button 
                      onClick={() => setVolunteerId(null)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Search Different Email
                    </button>
                  </div>
                  
                  {certificatesLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : certificates && certificates.length > 0 ? (
                    <div className="space-y-4">
                      {certificates.map(certificate => (
                        <div key={certificate.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-lg">{certificate.eventName}</h4>
                            <p className="text-gray-600">
                              Issued on: {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <button 
                            onClick={() => downloadCertificate(certificate)}
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-gray-200 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="text-xl font-medium text-gray-800 mb-2">No Certificates Found</h4>
                      <p className="text-gray-600 max-w-md mx-auto">
                        You haven't received any certificates yet. Participate in events and activities to earn your certificates.
                      </p>
                      <div className="mt-6">
                        <a 
                          href="/events" 
                          className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          View Upcoming Events
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-montserrat font-bold mb-6">How to Get Your Certificate</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">1. Register as a Volunteer</h3>
                  <p className="text-gray-600">Complete the volunteer registration process and get approved.</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">2. Participate in Events</h3>
                  <p className="text-gray-600">Attend events, activities, or contribute to ongoing projects.</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">3. Receive Your Certificate</h3>
                  <p className="text-gray-600">After participating, your certificate becomes available for download.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="bg-light rounded-lg p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">When will my certificate be available?</h3>
                <p className="text-gray-700">
                  Certificates are typically issued within 7 days after your participation in an event or activity. 
                  For longer-term projects, certificates are issued upon completion of the project.
                </p>
              </div>
              
              <div className="bg-light rounded-lg p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">What format is the certificate in?</h3>
                <p className="text-gray-700">
                  All certificates are provided in PDF format, which can be easily downloaded, printed, or shared digitally.
                </p>
              </div>
              
              <div className="bg-light rounded-lg p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Can I get a physical copy of my certificate?</h3>
                <p className="text-gray-700">
                  While certificates are primarily issued digitally, you can request a physical copy by contacting our 
                  volunteer coordinator. Please note that there may be a small fee for printing and shipping.
                </p>
              </div>
              
              <div className="bg-light rounded-lg p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">I participated in an event but don't see my certificate.</h3>
                <p className="text-gray-700">
                  If you don't see your certificate after 7 days of participation, please contact us at 
                  volunteers@supansha.org with your details and the event information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
