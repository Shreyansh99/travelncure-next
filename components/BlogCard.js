import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
    >
      {post.coverImage && (
        <div className="relative w-full h-56">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-teal-600 text-sm mb-2">{formatDate(post.date)}</p>
        <h2 className="text-xl font-bold mb-3 text-gray-800">
          <Link href={`/blogs/${post.slug}`} className="hover:text-teal-600 transition">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <Link 
          href={`/blogs/${post.slug}`}
          className="inline-block mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium
                  transition transform hover:scale-105"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}