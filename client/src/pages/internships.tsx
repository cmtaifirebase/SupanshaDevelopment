import React from 'react';

const Internships: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Internship Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Gain valuable experience while contributing to meaningful social impact initiatives.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Internship Openings</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Program Development Intern</h3>
                <p className="text-gray-600 mb-3">3-6 months · Delhi/Remote · Stipend provided</p>
                <p className="mb-4">Support the design and implementation of community development programs, assist with monitoring and evaluation, and contribute to impact assessment.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Communications & Media Intern</h3>
                <p className="text-gray-600 mb-3">3-6 months · Remote · Stipend provided</p>
                <p className="mb-4">Create compelling content for social media, website, and other platforms to showcase our work and impact to diverse audiences.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-2">Research & Advocacy Intern</h3>
                <p className="text-gray-600 mb-3">3-6 months · Remote · Stipend provided</p>
                <p className="mb-4">Conduct research on social issues, assist with policy analysis, and support advocacy initiatives to influence systemic change.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Intern With Us</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Gain hands-on experience in the development sector</li>
              <li>Work directly with communities and stakeholders</li>
              <li>Develop professional skills in a supportive environment</li>
              <li>Receive mentorship from experienced professionals</li>
              <li>Build a network in the social impact space</li>
              <li>Make a tangible contribution to social change</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Application Process</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <h3 className="font-medium">Submit Your Application</h3>
                <p>Complete the online application form with your resume, cover letter, and relevant work samples.</p>
              </li>
              <li>
                <h3 className="font-medium">Initial Screening</h3>
                <p>Our team will review your application and reach out to selected candidates for an interview.</p>
              </li>
              <li>
                <h3 className="font-medium">Interview</h3>
                <p>Virtual interview with the team supervisor to discuss your background, interests, and fit for the role.</p>
              </li>
              <li>
                <h3 className="font-medium">Assignment</h3>
                <p>Complete a small task related to the internship to demonstrate your skills and approach.</p>
              </li>
              <li>
                <h3 className="font-medium">Final Selection</h3>
                <p>Selected candidates will receive an offer letter with detailed information about the internship.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internships;