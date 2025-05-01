import React from 'react';

const Forums: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Community Forums</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Join conversations that matter and contribute your voice to creating positive change.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Forums</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Rural Development Dialogue</h3>
                <p className="text-gray-600 mb-3">May 25, 2025 · Virtual · 10:00 AM - 12:00 PM IST</p>
                <p className="mb-4">Join experts, community leaders, and practitioners to discuss innovative approaches to sustainable rural development in India.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Register Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Climate Action & Communities</h3>
                <p className="text-gray-600 mb-3">June 10, 2025 · Hybrid (Delhi & Virtual) · 2:00 PM - 4:30 PM IST</p>
                <p className="mb-4">Explore the intersection of climate change and community resilience, with a focus on local solutions and indigenous knowledge.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Register Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Digital Inclusion Forum</h3>
                <p className="text-gray-600 mb-3">July 5, 2025 · Virtual · 11:00 AM - 1:30 PM IST</p>
                <p className="mb-4">Discuss strategies for bridging the digital divide and ensuring equitable access to technology and digital resources.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Past Forums</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Women's Empowerment Roundtable</h3>
                <p className="text-gray-600 mb-3">March 8, 2025 · Delhi</p>
                <p className="mb-4">A discussion on challenges and opportunities for women's economic empowerment in rural and urban contexts.</p>
                <div className="flex space-x-4">
                  <button className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium transition-colors">
                    View Summary
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium transition-colors">
                    Watch Recording
                  </button>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Education Innovation Summit</h3>
                <p className="text-gray-600 mb-3">February 15, 2025 · Virtual</p>
                <p className="mb-4">Exploring new approaches to quality education in underserved areas through technology and community involvement.</p>
                <div className="flex space-x-4">
                  <button className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium transition-colors">
                    View Summary
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium transition-colors">
                    Watch Recording
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Propose a Forum</h2>
            <p className="mb-6">Have an idea for a forum topic? We welcome suggestions for meaningful discussions that address important social issues.</p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Proposed Topic</label>
                <input 
                  type="text" 
                  id="topic" 
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Forum topic"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  id="description" 
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Briefly describe the forum topic and why it's important"
                ></textarea>
              </div>
              
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;