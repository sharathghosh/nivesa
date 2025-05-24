import Link from 'next/link';
import BlogImage from '@/components/BlogImage';

const investmentPosts = [
  {
    id: 'parag-parikh-flexi-cap-fund',
    title: 'Parag Parikh Flexi Cap Fund: A Decade of Stable Performance',
    excerpt: 'Analysis of Parag Parikh Flexi Cap Fund Direct Plan and its impressive 10-year CAGR performance of approximately 17-18%, significantly outperforming both its benchmark and category average.',
    category: 'Investments',
    date: 'May 23, 2025',
    readTime: '9 min read',
    image: '/images/parag-parikh-fund.jpg',
    featured: true
  }
];

export default function InvestmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Investments</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore the best investment strategies and insights to grow your wealth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {investmentPosts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <Link href={`/blog/${post.id}`}>
              <BlogImage
                src={post.image}
                alt={post.title}
                type="card"
                fallbackKey={post.id}
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-500">{post.readTime}</span>
                  <span className="text-blue-700 dark:text-blue-400 font-medium">Read More →</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
