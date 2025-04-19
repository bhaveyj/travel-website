import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Blog.css';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Bali",
    author: "Sarah Johnson",
    date: "April 15, 2023",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover the lesser-known spots in Bali that most tourists miss. From secret waterfalls to local markets, this guide will help you experience the authentic side of the island.",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "10 Essential Items for Your Backpacking Adventure",
    author: "Michael Chen",
    date: "March 28, 2023",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Packing for a backpacking trip can be overwhelming. Here's a comprehensive list of essential items you shouldn't forget for your next adventure.",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "A Foodie's Guide to Tokyo",
    author: "Emma Rodriguez",
    date: "March 10, 2023",
    category: "Food & Culture",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "From street food to Michelin-starred restaurants, explore the diverse culinary landscape of Tokyo with this comprehensive food guide.",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Sustainable Travel: How to Reduce Your Carbon Footprint",
    author: "David Wilson",
    date: "February 22, 2023",
    category: "Sustainable Travel",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn how to travel more sustainably with these practical tips on reducing your environmental impact while exploring the world.",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "The Ultimate Road Trip Through the American Southwest",
    author: "Jessica Lee",
    date: "February 5, 2023",
    category: "Road Trips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Plan the perfect road trip through the stunning landscapes of the American Southwest, from the Grand Canyon to Zion National Park.",
    readTime: "12 min read"
  },
  {
    id: 6,
    title: "Photography Tips for Capturing Your Travel Memories",
    author: "Alex Thompson",
    date: "January 18, 2023",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn professional photography techniques to capture stunning travel photos that will preserve your memories for years to come.",
    readTime: "9 min read"
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from blog posts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter blog posts based on selected category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReadMore = (postId) => {
    // In a real app, this would navigate to a detailed blog post page
    // For now, we'll just show an alert
    const post = blogPosts.find(post => post.id === postId);
    alert(`Reading more about: ${post.title}\n\nIn a real application, this would navigate to a detailed blog post page.`);
  };

  return (
    <div className="blog-page">
      <nav className="navbar">
        <h1 className="brand">Bon Voyage</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate('/home')}>Home</button>
          <button className="btn" onClick={() => navigate('/about')}>About</button>
          <button className="btn" onClick={() => navigate('/blog')}>Blog</button>
          <button className="btn" onClick={() => navigate('/flights')}>Flights</button>
        </div>
      </nav>

      <div className="blog-container">
        <div className="blog-header">
          <h1>Travel Blog</h1>
          <p>Discover travel stories, tips, and inspiration from around the world</p>
        </div>

        <div className="blog-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-posts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="blog-post-card">
                <div className="post-image" style={{ backgroundImage: `url(${post.image})` }}></div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-footer">
                    <span className="post-author">By {post.author}</span>
                    <button className="read-more-btn" onClick={() => handleReadMore(post.id)}>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog; 