'use client';

import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('https://medical-tourism-lqcu.onrender.com/api/patient/blogs');
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error('Invalid response from API');
        }
      
        const data = await res.json();
        // console.log('Fetched data:', data);
        setBlogPosts(data);
        console.log(blogPosts)
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Unable to load blog posts at the moment. Please try again later.');
      } finally {
        setLoading(false);
      }
      
    };

    fetchBlogPosts();
  }, [setBlogPosts]);
  
  if (loading) {
    return (
      <section className="flex-col text-center py-16 m-48">
        <h2 className="text-2xl font-bold text-teal-600">Loading blog posts...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-16 m-40">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops!</h2>
        <p className="text-gray-600">{error}</p>
      </section>
    );
  }

  if (!blogPosts.length) {
    return (
      <section className="text-center py-16 m-40">
        <h2 className="text-2xl font-bold text-teal-600">No blog posts found.</h2>
        <p className="text-gray-500 mt-2">Check back later for the latest insights.</p>
      </section>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4 m-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-3">Medical Tourism Insights</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our latest articles on medical tourism, treatments abroad, and healthcare travel tips.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post._id || post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
