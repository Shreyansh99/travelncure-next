'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Head from 'next/head';
import BlogCard from '@/components/BlogCard';

export default function BlogPost() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPostData = async () => {
      try {
        const res = await fetch(`https://medical-tourism-lqcu.onrender.com/api/patient/blogs/${slug}`);
        const postData = await res.json();
        setPost(postData);
        console.log(postData)
        const relatedRes = await fetch('https://medical-tourism-lqcu.onrender.com/api/patient/blogs');
        const relatedData = await relatedRes.json();
        setRelatedPosts(relatedData.filter((p) => p.slug !== slug));
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-12 m-48">
        <h2 className="text-2xl font-bold text-teal-600">Loading...</h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't locate the article you're looking for.</p>
        <Link href="/blogs" className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
          Return to Blogs
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen m-40">
      <Head>
        <title>{post.title} | Medical Tourism Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:url" content={`https://medical-tourism-lqcu.onrender.com/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
      </Head>

      {post.coverImage && (
        <div className="relative w-full h-96 mb-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blogs
          </Link>

          <h1 className="text-3xl font-bold mb-3 text-gray-800">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-8 border-b border-gray-200 pb-4">{formatDate(post.createdAt)}</p>

          <div className="blog-content prose prose-lg max-w-none prose-headings:text-teal-700 prose-a:text-blue-600 prose-img:rounded-lg">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-teal-600 mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <BlogCard key={relatedPost.slug} post={relatedPost} />
          ))}
        </div>
      </div>
    </div>
  );
}
