import React, { useState } from 'react';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Hand-woven Cotton Bag',
    price: 399,
    image: 'https://images.unsplash.com/photo-1605480418746-844a6fbc85f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Accessories',
    artisan: 'Women Weavers Collective, Rajasthan',
    description: 'Handcrafted cotton bag made by rural women artisans using traditional weaving techniques. Perfect for shopping and everyday use.',
  },
  {
    id: 2,
    name: 'Organic Honey',
    price: 249,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Food',
    artisan: 'Himalayan Bee Cooperative',
    description: 'Wild, organic honey collected by tribal communities from pristine forest regions. Pure, natural, and sustainably harvested.',
  },
  {
    id: 3,
    name: 'Handmade Clay Pottery',
    price: 599,
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Home Decor',
    artisan: 'Terracotta Artisans Guild, Uttar Pradesh',
    description: 'Traditional clay pottery crafted by skilled artisans using techniques passed down through generations. Each piece is unique.',
  },
  {
    id: 4,
    name: 'Bamboo Stationery Set',
    price: 349,
    image: 'https://images.unsplash.com/photo-1544239265-ee5eedde5469?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Stationery',
    artisan: 'Eco Crafters Collective, Northeast India',
    description: 'Sustainable stationery made from locally sourced bamboo by indigenous artisans. Includes pen, pencil, and notebook holder.',
  },
  {
    id: 5,
    name: 'Block-printed Cotton Scarf',
    price: 499,
    image: 'https://images.unsplash.com/photo-1574511671535-3a63c699deda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Clothing',
    artisan: 'Traditional Print Artisans, Gujarat',
    description: 'Handcrafted cotton scarf with traditional block prints made with natural dyes. Perfect for all seasons.',
  },
  {
    id: 6,
    name: 'Tribal Art Canvas',
    price: 899,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'Art',
    artisan: 'Indigenous Art Collective, Madhya Pradesh',
    description: 'Original tribal art painted on canvas by indigenous artists preserving traditional motifs and storytelling.',
  },
];

const categories = ['All', 'Accessories', 'Food', 'Home Decor', 'Stationery', 'Clothing', 'Art'];

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.artisan}</p>
        <p className="font-medium text-lg mb-3">₹{product.price}</p>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-gray-100 px-3 py-1 text-xs text-gray-700 rounded-full">
            {product.category}
          </span>
          <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md text-sm transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.artisan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Skill Store: Shop Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support artisans and rural entrepreneurs by purchasing their handcrafted products. Every purchase helps sustain livelihoods and preserve traditional crafts.
          </p>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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
              placeholder="Search products..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600">Try changing your search criteria or category selection.</p>
          </div>
        )}
        
        <div className="mt-12 bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">About Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Artisan-Made</h3>
              <p className="text-gray-600">All products are handcrafted by skilled artisans and entrepreneurs from rural and underserved communities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Fair Trade</h3>
              <p className="text-gray-600">We ensure fair prices for the makers, transparent supply chains, and ethical production practices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Sustainable</h3>
              <p className="text-gray-600">Most products use eco-friendly materials, traditional techniques, and sustainable production methods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;