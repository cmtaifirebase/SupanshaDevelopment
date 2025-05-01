import React from 'react';

const ListingGuide: React.FC = () => {
  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Skill Store: Listing Guide</h1>
            <p className="text-lg text-gray-600">
              Learn how to effectively list your products or services on our platform to maximize visibility and success.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-6">Why List on Supansha Skill Store?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-light p-5 rounded-lg">
                <div className="text-3xl text-primary mb-3">🛒</div>
                <h3 className="font-semibold text-lg mb-2">Expand Your Market</h3>
                <p className="text-gray-600">
                  Reach a wider audience interested in sustainable, artisanal products and services from rural communities.
                </p>
              </div>
              
              <div className="bg-light p-5 rounded-lg">
                <div className="text-3xl text-primary mb-3">💰</div>
                <h3 className="font-semibold text-lg mb-2">Fair Compensation</h3>
                <p className="text-gray-600">
                  Set your own prices and receive fair payment for your skills, products, and time.
                </p>
              </div>
              
              <div className="bg-light p-5 rounded-lg">
                <div className="text-3xl text-primary mb-3">🔄</div>
                <h3 className="font-semibold text-lg mb-2">Sustainable Livelihoods</h3>
                <p className="text-gray-600">
                  Create a reliable income stream through the platform while preserving traditional knowledge and skills.
                </p>
              </div>
              
              <div className="bg-light p-5 rounded-lg">
                <div className="text-3xl text-primary mb-3">🌱</div>
                <h3 className="font-semibold text-lg mb-2">Community Growth</h3>
                <p className="text-gray-600">
                  Connect with like-minded individuals and organizations to foster collaboration and knowledge sharing.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-6">Getting Started: Step-by-Step Guide</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create Your Account</h3>
                  <p className="text-gray-600 mb-3">
                    Register for a Supansha Skills Store account by providing your basic information and verifying your email.
                  </p>
                  <div className="bg-light p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">Required Information:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Location (village/district/state)</li>
                      <li>ID proof (for verification)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Complete Your Profile</h3>
                  <p className="text-gray-600 mb-3">
                    Create a comprehensive profile that showcases your skills, experience, and background to build trust with potential buyers.
                  </p>
                  <div className="bg-light p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">Profile Elements:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Professional photo</li>
                      <li>Bio/description</li>
                      <li>Skills and areas of expertise</li>
                      <li>Years of experience</li>
                      <li>Languages spoken</li>
                      <li>Certifications or training (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create Your Listings</h3>
                  <p className="text-gray-600 mb-3">
                    Add detailed listings for your products or services, including clear descriptions, high-quality images, and pricing information.
                  </p>
                  <div className="bg-light p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">For Products:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                      <li>Clear product title</li>
                      <li>Detailed description</li>
                      <li>Multiple high-quality images</li>
                      <li>Materials used</li>
                      <li>Dimensions/specifications</li>
                      <li>Traditional significance (if applicable)</li>
                      <li>Pricing and availability</li>
                    </ul>
                    <p className="font-medium mb-1">For Services:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Service title and category</li>
                      <li>Detailed description of what you offer</li>
                      <li>Service packages and pricing</li>
                      <li>Delivery timeline</li>
                      <li>Examples of previous work (images or case studies)</li>
                      <li>Areas of specialization</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Set Up Payment Information</h3>
                  <p className="text-gray-600 mb-3">
                    Add your bank account or payment details to receive payments securely through our platform.
                  </p>
                  <div className="bg-light p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">Payment Options:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Direct bank transfer</li>
                      <li>UPI payment</li>
                      <li>Mobile payment platforms</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Manage Your Listings</h3>
                  <p className="text-gray-600 mb-3">
                    Keep your listings up-to-date, respond promptly to inquiries, and maintain a positive relationship with customers.
                  </p>
                  <div className="bg-light p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">Best Practices:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Check messages daily</li>
                      <li>Update inventory regularly</li>
                      <li>Honor commitments and deadlines</li>
                      <li>Request reviews from satisfied customers</li>
                      <li>Update pricing as needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Support and Resources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Training Workshops</h3>
                <p className="text-gray-600">
                  We regularly conduct workshops on digital skills, product photography, pricing strategies, and more to help you succeed on our platform.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">One-on-One Assistance</h3>
                <p className="text-gray-600">
                  Our field coordinators can visit your location to help you set up your account, take product photos, and create compelling listings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Connect with other sellers on our platform through the Community Forum to share experiences and best practices.
                </p>
              </div>
              
              <div className="pt-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Register as a Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingGuide;