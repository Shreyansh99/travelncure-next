import BlogCard from '@/components/BlogCard';
import blogPostsData from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const sortedBlogPosts = [...blogPostsData].sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Medical Tourism Insights</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our latest articles on medical tourism, treatments abroad, and healthcare travel tips.
        </p>
      </div>

      {sortedBlogPosts.length > 0 && (
        <div className="mb-16">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1 rounded-xl shadow-lg">
            <div className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image 
                  src={sortedBlogPosts[0].coverImage} 
                  alt={sortedBlogPosts[0].title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
                  Featured Post
                </span>
                <h2 className="text-2xl font-bold mb-4">
                  <Link href={`/blogs/${sortedBlogPosts[0].slug}`} className="hover:text-teal-600 transition">
                    {sortedBlogPosts[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6">
                  {sortedBlogPosts[0].excerpt}
                </p>
                <Link 
                  href={`/blogs/${sortedBlogPosts[0].slug}`}
                  className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium transition transform hover:scale-105"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedBlogPosts.slice(1).map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}