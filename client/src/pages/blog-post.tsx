import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/types';

const BlogPostPage: React.FC = () => {
  const [, params] = useRoute('/blog/:id');
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${id}`],
    enabled: !!id,
  });

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    select: (data) => data.filter(p => p.id !== id && p.category === post?.category).slice(0, 3),
    enabled: !!post,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-montserrat font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you are looking for does not exist or has been removed.</p>
        <Link href="/blog" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Supansha Development Foundation</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center mt-6">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover" 
              />
              <div className="text-left">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-300">
                  {post.author.title} • {format(new Date(post.date), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto rounded-lg shadow-lg" 
              />
            </div>

            {post.audio && (
              <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Listen to this article
                </h3>
                <audio 
                  controls 
                  className="w-full"
                  src={post.audio}
                >
                  Your browser does not support the audio element.
                </audio>
                <p className="text-xs text-gray-500 mt-2">
                  You can listen to this article while browsing other content or on-the-go.
                </p>
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              {/* This would typically be populated by a rich text editor content or markdown */}
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Author Bio */}
            <div className="bg-light rounded-lg p-8 mb-12">
              <div className="flex items-start">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-16 h-16 rounded-full mr-6 object-cover" 
                />
                <div>
                  <h3 className="font-montserrat font-semibold text-xl mb-2">About {post.author.name}</h3>
                  <p className="text-gray-600 mb-2">{post.author.title}</p>
                  <p className="text-gray-700">
                    {post.author.name} is a passionate advocate for social change and has been working in the field of {post.category.toLowerCase()} for several years. Their expertise and dedication have contributed significantly to Supansha's mission.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="mb-12">
              <h3 className="text-lg font-montserrat font-semibold mb-4">Share This Article</h3>
              <div className="flex space-x-4">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`} className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-montserrat font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                      <div 
                        className="h-48 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${relatedPost.image})` }}
                      ></div>
                      <div className="p-4">
                        <h4 className="font-montserrat font-semibold text-lg mb-2">{relatedPost.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                        <Link href={`/blog/${relatedPost.id}`} className="text-primary font-medium hover:underline">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Inspired to Take Action?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join us in our mission to create sustainable change in communities across India. 
            Your support can help transform lives and build a better future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/donate" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Support Our Work
            </a>
            <a href="/volunteer" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
