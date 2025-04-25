import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Unknown Date';
    }
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col 
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
    >
      {post.coverImage && (
        <div className="relative w-full h-56">
          <Image 
            src={post.coverImage} 
            alt={`Cover image for blog: ${post.metaTitle || post.title || 'Blog Post'}`} 
            layout="fill" 
            objectFit="cover" 
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-teal-600 text-sm mb-2">{formatDate(post.createdAt)}</p>
        <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
          <Link href={`/blogs/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link 
          href={`/blogs/${post.slug}`}
          className="inline-block mt-auto px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium
                     transition transform hover:scale-105"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
