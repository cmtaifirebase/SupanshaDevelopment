import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import DonationForm from '@/components/forms/donation-form';
import { Cause } from '@/lib/types';

const Donate: React.FC = () => {
  const [location] = useLocation();
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  const causeIdParam = queryParams.get('cause');
  const [selectedCauseId, setSelectedCauseId] = useState<number | null>(
    causeIdParam ? parseInt(causeIdParam) : null
  );

  const { data: causes, isLoading } = useQuery<Cause[]>({
    queryKey: ['/api/causes'],
  });

  const selectedCause = causes?.find(cause => cause.id === selectedCauseId);

  return (
    <>
      <Helmet>
        <title>Donate - Supansha Development Foundation</title>
        <meta name="description" content="Support our initiatives by donating. Your contribution helps us create sustainable change in underserved communities." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Make a Donation</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Your generosity powers our mission. Support our work and help build a more equitable, sustainable world.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-montserrat font-bold mb-6">
                  {selectedCause 
                    ? `Donate to: ${selectedCause.title}` 
                    : "Select a cause or make a general donation"}
                </h2>

                {!selectedCause && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose a cause to support (optional)
                    </label>
                    <div className="relative">
                      {isLoading ? (
                        <div className="flex justify-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <select 
                          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                          value={selectedCauseId || ""}
                          onChange={(e) => setSelectedCauseId(e.target.value ? parseInt(e.target.value) : null)}
                        >
                          <option value="">General Donation</option>
                          {causes?.map(cause => (
                            <option key={cause.id} value={cause.id}>
                              {cause.title}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                )}

                {selectedCause && (
                  <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{selectedCause.title}</h3>
                        <p className="text-sm text-gray-600">{selectedCause.description}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedCauseId(null)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Change
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div 
                          className="absolute h-full rounded-full bg-secondary"
                          style={{ width: `${Math.min(100, (selectedCause.raised / selectedCause.goal) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Raised: ₹{selectedCause.raised.toLocaleString()}</span>
                        <span>Goal: ₹{selectedCause.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <DonationForm selectedCauseId={selectedCauseId} />
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Why Donate to Supansha?</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">100% of your donation goes to your chosen cause</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Tax benefits under 80G of Income Tax Act</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Regular updates on how your donation is making impact</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Transparent reporting and utilization</span>
                  </li>
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Support ISO 9001:2015 certified organization</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Other Ways to Support</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-secondary h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Corporate Partnerships</h4>
                      <p className="text-sm text-gray-300">CSR collaborations for sustained impact</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-secondary h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Volunteer Your Time</h4>
                      <p className="text-sm text-gray-300">Join our team in making a difference</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-secondary h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Monthly Giving Program</h4>
                      <p className="text-sm text-gray-300">Create sustainable impact with recurring donations</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <a 
                    href="/contact" 
                    className="block text-center bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
