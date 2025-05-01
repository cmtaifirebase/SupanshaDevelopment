import React from 'react';

const Careers: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Career Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Join our team and be part of creating lasting positive change in communities across India.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Openings</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Project Manager - Rural Development</h3>
                <p className="text-gray-600 mb-3">Full-time · Delhi/Remote · 5+ years experience</p>
                <p className="mb-4">Lead our rural development initiatives, coordinating with local communities and stakeholders to implement sustainable solutions.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Community Outreach Coordinator</h3>
                <p className="text-gray-600 mb-3">Full-time · Multiple Locations · 3+ years experience</p>
                <p className="mb-4">Build relationships with communities, understand their needs, and connect them with our programs and resources.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Grant Writer</h3>
                <p className="text-gray-600 mb-3">Part-time · Remote · 2+ years experience</p>
                <p className="mb-4">Research and develop compelling grant proposals to secure funding for our programs and initiatives.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Work With Us</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Make a tangible impact on communities in need</li>
              <li>Collaborative and supportive work environment</li>
              <li>Opportunities for professional growth and development</li>
              <li>Competitive compensation and benefits</li>
              <li>Flexible work arrangements for many positions</li>
              <li>Be part of a passionate team dedicated to social change</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;