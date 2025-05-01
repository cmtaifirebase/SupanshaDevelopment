import React, { useState } from 'react';

// Mock service providers data
const serviceProviders = [
  {
    id: 1,
    name: 'Raj Kumar',
    skills: ['Organic Farming', 'Permaculture', 'Seed Preservation'],
    location: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    projects: 24,
    hourlyRate: 400,
    description: 'Experienced organic farmer with expertise in permaculture design and implementation. Specializes in sustainable farming techniques for mountainous regions.'
  },
  {
    id: 2,
    name: 'Meena Devi',
    skills: ['Handicrafts', 'Textile Design', 'Natural Dyeing'],
    location: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    projects: 37,
    hourlyRate: 350,
    description: 'Master artisan specializing in traditional textile designs and natural dyeing techniques. Has trained over 200 women in rural communities.'
  },
  {
    id: 3,
    name: 'Amrit Singh',
    skills: ['Solar Installation', 'Rainwater Harvesting', 'Rural Engineering'],
    location: 'Punjab',
    image: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    projects: 42,
    hourlyRate: 500,
    description: 'Rural engineer with over 15 years of experience in sustainable technology implementation including solar power systems and water conservation.'
  },
  {
    id: 4,
    name: 'Lakshmi Narayan',
    skills: ['Traditional Construction', 'Earth Building', 'Bamboo Architecture'],
    location: 'Kerala',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    projects: 18,
    hourlyRate: 450,
    description: 'Expert in traditional and sustainable construction techniques. Specializes in eco-friendly building materials and methods adapted to local climates.'
  },
  {
    id: 5,
    name: 'Priya Sharma',
    skills: ['Community Health', 'Nutrition Planning', 'Preventive Healthcare'],
    location: 'Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    projects: 31,
    hourlyRate: 380,
    description: 'Community health worker with expertise in rural nutrition planning and preventive health education. Developed several successful health intervention programs.'
  },
  {
    id: 6,
    name: 'Vikram Patel',
    skills: ['Watershed Management', 'Soil Conservation', 'Sustainable Agriculture'],
    location: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    projects: 26,
    hourlyRate: 420,
    description: 'Agricultural expert specializing in watershed management and soil conservation techniques for arid regions. Focuses on water-efficient farming methods.'
  },
];

const skillCategories = [
  'All Skills', 
  'Agriculture', 
  'Crafts & Artisanal', 
  'Sustainable Technology', 
  'Construction', 
  'Health & Nutrition',
  'Water Management'
];

const SkillProviderCard: React.FC<{ provider: any }> = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <img 
            src={provider.image} 
            alt={provider.name} 
            className="rounded-full w-20 h-20 md:w-24 md:h-24 object-cover mx-auto"
          />
          <div className="text-center mt-2">
            <div className="flex items-center justify-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{provider.rating}</span>
            </div>
            <p className="text-gray-500 text-sm">{provider.projects} projects</p>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <h3 className="font-semibold text-lg">{provider.name}</h3>
          <p className="text-gray-700 text-sm mb-2">
            <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-1">
              {provider.location}
            </span>
            <span className="font-medium">₹{provider.hourlyRate}/hr</span>
          </p>
          
          <p className="text-gray-600 mb-3">{provider.description}</p>
          
          <div className="mb-3">
            <h4 className="font-medium text-sm text-gray-700 mb-1">Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map(skill => (
                <span 
                  key={skill} 
                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HireSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Skills');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter service providers based on selected category and search query
  const filteredProviders = serviceProviders.filter(provider => {
    // Filter by category
    const categoryMatch = selectedCategory === 'All Skills' || 
      provider.skills.some(skill => {
        if (selectedCategory === 'Agriculture') 
          return ['Organic Farming', 'Permaculture', 'Seed Preservation', 'Sustainable Agriculture'].includes(skill);
        if (selectedCategory === 'Crafts & Artisanal') 
          return ['Handicrafts', 'Textile Design', 'Natural Dyeing'].includes(skill);
        if (selectedCategory === 'Sustainable Technology') 
          return ['Solar Installation', 'Rainwater Harvesting', 'Rural Engineering'].includes(skill);
        if (selectedCategory === 'Construction') 
          return ['Traditional Construction', 'Earth Building', 'Bamboo Architecture'].includes(skill);
        if (selectedCategory === 'Health & Nutrition') 
          return ['Community Health', 'Nutrition Planning', 'Preventive Healthcare'].includes(skill);
        if (selectedCategory === 'Water Management') 
          return ['Watershed Management', 'Rainwater Harvesting'].includes(skill);
        return false;
      });
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Skill Store: Hire Skilled Professionals</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with skilled rural professionals for your projects. Support sustainable livelihoods while accessing traditional knowledge and expertise.
          </p>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search skills or location..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredProviders.length > 0 ? (
          <div className="space-y-4">
            {filteredProviders.map(provider => (
              <SkillProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium mb-2">No service providers found</h3>
            <p className="text-gray-600">Try changing your search criteria or category selection.</p>
          </div>
        )}
        
        <div className="mt-12 bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Browse Profiles</h3>
              <p className="text-gray-600">Explore profiles of skilled professionals from rural communities and learn about their expertise and experience.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Contact & Discuss</h3>
              <p className="text-gray-600">Reach out to the service provider, discuss your project requirements, and agree on terms and expectations.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Collaborate & Pay</h3>
              <p className="text-gray-600">Work with the professional on your project and make secure payments through our platform, with fair rates assured.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireSkills;