import React, { useState } from 'react';

// Mock forum data
const forumCategories = [
  { id: 1, name: 'Sustainable Agriculture', icon: '🌱', count: 42 },
  { id: 2, name: 'Traditional Crafts', icon: '🧶', count: 28 },
  { id: 3, name: 'Rural Technology', icon: '⚙️', count: 35 },
  { id: 4, name: 'Community Development', icon: '🏘️', count: 23 },
  { id: 5, name: 'Education & Skills', icon: '📚', count: 31 },
  { id: 6, name: 'Health & Wellness', icon: '🌿', count: 19 },
];

const forumDiscussions = [
  {
    id: 1,
    title: 'Best practices for water conservation in drought-prone areas',
    author: 'Ramesh Kumar',
    category: 'Sustainable Agriculture',
    date: '2 days ago',
    replies: 24,
    views: 156,
    isPopular: true,
  },
  {
    id: 2,
    title: 'Reviving traditional weaving techniques for modern markets',
    author: 'Sita Devi',
    category: 'Traditional Crafts',
    date: '1 week ago',
    replies: 18,
    views: 97,
    isPopular: true,
  },
  {
    id: 3,
    title: 'Low-cost solar solutions for rural households',
    author: 'Ajay Patil',
    category: 'Rural Technology',
    date: '3 days ago',
    replies: 31,
    views: 210,
    isPopular: true,
  },
  {
    id: 4,
    title: 'Community-led watershed management success stories',
    author: 'Vikram Singh',
    category: 'Community Development',
    date: '5 days ago',
    replies: 12,
    views: 88,
    isPopular: false,
  },
  {
    id: 5,
    title: 'Digital learning tools for rural schools with limited connectivity',
    author: 'Priya Sharma',
    category: 'Education & Skills',
    date: '1 day ago',
    replies: 16,
    views: 105,
    isPopular: false,
  },
  {
    id: 6,
    title: 'Traditional herbal remedies for common ailments',
    author: 'Dr. Anand Gupta',
    category: 'Health & Wellness',
    date: '1 week ago',
    replies: 29,
    views: 187,
    isPopular: true,
  },
  {
    id: 7,
    title: 'Natural pest management for organic farming',
    author: 'Lakshmi Narayan',
    category: 'Sustainable Agriculture',
    date: '4 days ago',
    replies: 14,
    views: 92,
    isPopular: false,
  },
  {
    id: 8,
    title: 'Bamboo construction techniques for eco-friendly housing',
    author: 'Mohan Rao',
    category: 'Rural Technology',
    date: '2 weeks ago',
    replies: 21,
    views: 134,
    isPopular: false,
  },
];

const ForumCategoryCard: React.FC<{ category: any, onSelect: (name: string) => void }> = ({ category, onSelect }) => {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(category.name)}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{category.icon}</span>
        <div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-gray-500 text-sm">{category.count} discussions</p>
        </div>
      </div>
    </div>
  );
};

const ForumDiscussionRow: React.FC<{ discussion: any }> = ({ discussion }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg hover:text-primary transition-colors cursor-pointer">
            {discussion.title}
            {discussion.isPopular && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </h3>
          <p className="text-gray-500 text-sm">
            Started by <span className="text-gray-700 font-medium">{discussion.author}</span> • {discussion.date}
          </p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <div>{discussion.replies} replies</div>
          <div>{discussion.views} views</div>
        </div>
      </div>
      <div className="mt-2">
        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
          {discussion.category}
        </span>
      </div>
    </div>
  );
};

const CommunityForum: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter discussions based on selected category and search query
  const filteredDiscussions = forumDiscussions.filter(discussion => {
    const categoryMatch = !selectedCategory || discussion.category === selectedCategory;
    const searchMatch = !searchQuery || 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Skill Store: Community Forum</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect, share knowledge, and learn from a community dedicated to sustainable rural development and traditional skills.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-3">
                <div 
                  className={`p-2 rounded-md cursor-pointer ${!selectedCategory ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <span className="font-medium">All Discussions</span>
                  </div>
                </div>
                {forumCategories.map(category => (
                  <div 
                    key={category.id}
                    className={`p-2 rounded-md cursor-pointer ${selectedCategory === category.name ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Community Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members:</span>
                  <span className="font-medium">1,248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discussions:</span>
                  <span className="font-medium">178</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments:</span>
                  <span className="font-medium">2,547</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today:</span>
                  <span className="font-medium">124</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white p-5 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedCategory ? `Discussions in ${selectedCategory}` : 'All Discussions'}
                </h2>
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  New Discussion
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {filteredDiscussions.length > 0 ? (
                <div className="space-y-4">
                  {filteredDiscussions.map(discussion => (
                    <ForumDiscussionRow key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                  <p className="text-gray-600">Try changing your search criteria or start a new discussion.</p>
                </div>
              )}
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forumCategories.map(category => (
                  <ForumCategoryCard 
                    key={category.id} 
                    category={category}
                    onSelect={(name) => setSelectedCategory(name)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;