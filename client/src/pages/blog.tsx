import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@/lib/types';
import BlogCard from '@/components/shared/blog-card';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'Health', name: 'Health' },
    { id: 'Education', name: 'Education' },
    { id: 'Women\'s Empowerment', name: 'Women\'s Empowerment' },
    { id: 'Environment', name: 'Environment' },
    { id: 'success-stories', name: 'Success Stories' }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts?.filter(post => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Blog - Social Thoughts | Supansha Development Foundation</title>
        <meta name="description" content="Insights, stories, and reflections from our work in communities. Read about our impact, challenges, and learnings." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Social Thoughts</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Reflections and voices from the field — blogs by experts, doers, and rural change-makers.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredPosts && filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">No Blog Posts Found</h2>
                  <p className="text-gray-600">
                    No blog posts found in this category. Please try another category or check back later.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter to receive the latest updates, stories, and insights directly in your inbox.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 w-full text-gray-900 focus:ring-primary focus:border-primary rounded-l-md" 
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Ready to Make a Difference */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join us in our mission to create empowered communities through sustainable choices. 
            Your support can help transform lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/donate" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Donate Now
            </a>
            <a href="/volunteer" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
