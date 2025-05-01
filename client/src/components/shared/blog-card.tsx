import React from 'react';
import { Link } from 'wouter';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { id, title, excerpt, image, audio, category, author, date } = post;
  
  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${image})` }}
      >
        {audio && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Audio
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
        </div>
        <h3 className="font-montserrat font-semibold text-xl mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <div className="flex items-center">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-10 h-10 rounded-full mr-3 object-cover" 
          />
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-gray-500">{author.title}</p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Link href={`/blog/${id}`} className="text-primary font-medium hover:underline">
          Read More →
        </Link>
        {audio && (
          <span className="ml-4 text-gray-600 text-sm flex items-center inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Listen
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
