import Link from 'next/link';
import BlogImage from '../../components/BlogImage';

// Sample mutual funds related posts
const mutualFundPosts = [
  {
    id: 'parag-parikh-flexi-cap-fund',
    title: 'Parag Parikh Flexi Cap Fund: A Decade of Stable Performance',
    excerpt: 'Analysis of Parag Parikh Flexi Cap Fund Direct Plan and its impressive 10-year CAGR performance of approximately 17-18%, significantly outperforming both its benchmark and category average.',
    category: 'Investments',
    date: 'May 23, 2025',
    readTime: '9 min read',
    image: '/images/mutual-funds.jpg',
    featured: true
  },
  {
    id: 'best-mutual-funds-2025',
    title: 'Top 10 Mutual Funds for Indian Investors in 2025',
    excerpt: 'Discover the best performing mutual funds for long-term wealth creation in the current market scenario.',
    category: 'Investments',
    date: 'May 20, 2025',
    readTime: '8 min read',
    image: '/images/mutual-funds.jpg',
  },
  {
    id: 'equity-vs-hybrid-funds',
    title: 'Equity vs. Hybrid Funds: What\'s Right for You?',
    excerpt: 'A comparative analysis of equity and hybrid mutual funds to help you make the best investment choice.',
    category: 'Investments',
    date: 'April 28, 2025',
    readTime: '9 min read',
    image: '/images/equity-hybrid.jpg'
  },
  {
    id: 'elss-tax-saving',
    title: 'ELSS Funds: The Best Tax-Saving Investment Option?',
    excerpt: 'An in-depth look at Equity Linked Savings Schemes, their benefits, and how they compare to other tax-saving instruments.',
    category: 'Investments',
    date: 'April 20, 2025', 
    readTime: '10 min read',
    image: '/images/elss-tax-saving.jpg'
  },
  {
    id: 'mutual-funds-beginners-guide',
    title: 'A Beginner\'s Guide to Investing in Mutual Funds',
    excerpt: 'Everything you need to know before making your first mutual fund investment in India.',
    category: 'Investments',
    date: 'April 15, 2025',
    readTime: '12 min read',
    image: '/images/beginners-guide.jpg'
  }
];

export default function InvestmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Investments</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore the best investment strategies and insights to grow your wealth.
        </p>
      </div>
      
      {/* Featured Article */}
      <div className="mb-16">
        {mutualFundPosts.filter(post => post.featured).slice(0, 1).map(post => (
          <div key={post.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <Link href={post.id === 'parag-parikh-flexi-cap-fund' ? `/blog/parag-parikh-flexi-cap-fund` : `/blog/${post.id}`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    type="featured"
                    fallbackKey={post.id}
                  />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{post.date}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">{post.readTime}</span>
                    <span className="text-blue-700 dark:text-blue-400 font-medium">Read Full Analysis →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Latest Articles */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mutualFundPosts.filter(post => !post.featured).slice(0, 3).map(post => (
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
      
      {/* All Mutual Fund Articles */}
      <div>
        <h2 className="text-2xl font-bold mb-8">All Mutual Fund Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mutualFundPosts.filter(post => !post.featured).slice(3).map(post => (
            <div key={post.id} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="sm:w-1/3 relative">
                <BlogImage
                  src={post.image}
                  alt={post.title}
                  type="thumbnail"
                  fallbackKey={post.id}
                />
              </div>
              <div className="sm:w-2/3">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-blue-700 dark:hover:text-blue-400">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-500">{post.readTime}</span>
                  <Link href={`/blog/${post.id}`} className="text-blue-700 dark:text-blue-400 font-medium hover:underline">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
