import blogPostsData from '@/data/blogs';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

export default function BlogPost({ params }) {
  const { slug } = params;
  const post = blogPostsData.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't locate the article you're looking for.</p>
        <Link 
          href="/blogs" 
          className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
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
    <div className="bg-gray-50 min-h-screen">
      {post.coverImage && (
        <div className="relative w-full h-96 mb-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blogs
          </Link>
          
          <h1 className="text-3xl font-bold mb-3 text-gray-800">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-8 border-b border-gray-200 pb-4">{formatDate(post.date)}</p>
          
          <div className="blog-content prose prose-lg max-w-none prose-headings:text-teal-700 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-img:rounded-lg prose-strong:text-teal-700">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}