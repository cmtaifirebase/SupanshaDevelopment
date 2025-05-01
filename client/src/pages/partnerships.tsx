import React from 'react';

const Partnerships: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Partnership Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Collaborate with Supansha Development Foundation to create meaningful impact through strategic alliances.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Partnerships</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Corporate Partnerships</h3>
                <p className="mb-4">Engage your company in meaningful CSR initiatives that align with your values and make a tangible difference in communities.</p>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Employee volunteer programs</li>
                  <li>Project sponsorships</li>
                  <li>Skill-based volunteering</li>
                  <li>Cause-related marketing</li>
                </ul>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Explore Corporate Partnerships
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">NGO & Institutional Partnerships</h3>
                <p className="mb-4">Collaborate with other organizations to leverage complementary strengths and expand impact through joint initiatives.</p>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Knowledge sharing</li>
                  <li>Joint program implementation</li>
                  <li>Research collaboration</li>
                  <li>Resource pooling</li>
                </ul>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Partner With Us
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Government Partnerships</h3>
                <p className="mb-4">Work with government agencies to scale solutions and create systemic change through policy influence and implementation support.</p>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Policy advocacy</li>
                  <li>Program implementation</li>
                  <li>Technical assistance</li>
                  <li>Capacity building</li>
                </ul>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Connect With Us
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Current Partnership Opportunities</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Rural Digital Literacy Initiative</h3>
                <p className="mb-4">Seeking technology partners to help bridge the digital divide in rural communities through education and infrastructure.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Community Health Outreach</h3>
                <p className="mb-4">Looking for healthcare organizations to collaborate on preventative health education and services in underserved areas.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Sustainable Livelihood Program</h3>
                <p className="mb-4">Seeking partners with expertise in sustainable agriculture and market access to support rural entrepreneurship.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;