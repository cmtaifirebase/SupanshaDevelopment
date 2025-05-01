import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@/lib/types';
import BlogCard from '@/components/shared/blog-card';

const BlogSection: React.FC = () => {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    select: (data) => data.slice(0, 3), // Take only the first 3 items
  });

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Social Thoughts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Reflections and voices from the field — blogs by experts, doers, and rural change-makers.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts?.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link 
            href="/blog" 
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
