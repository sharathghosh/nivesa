import Link from 'next/link';
import BlogImage from '@/components/BlogImage';

// Sample loyalty program related posts
const loyaltyProgramPosts = [
  {
    id: 'hdfc-infinia-credit-card-review',
    title: 'HDFC Infinia Credit Card Review: The Ultimate Premium Card',
    excerpt: 'A comprehensive review of HDFC Bank\'s most prestigious Infinia Credit Card, its exceptional benefits, and how its annual fee can be easily recovered through rewards and perks.',
    category: 'Credit Cards',
    date: 'May 23, 2025',
    readTime: '10 min read',
    image: '/images/credit-card-rewards.jpg',
    featured: true
  },
  {
    id: 'airline-miles-optimization',
    title: 'How to Maximize Your Airline Miles with Indian Credit Cards',
    excerpt: 'Strategic approaches to earn and redeem airline miles effectively using Indian credit cards.',
    category: 'Loyalty Programs',
    date: 'May 18, 2025',
    readTime: '7 min read',
    image: '/images/airline-miles.jpg'
  },
  // More posts would be added here
];

export default function LoyaltyProgramsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Reward Programs</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Maximize your airline miles and hotel points with our expert guidance
        </p>
      </div>
      
      {/* Featured Content - Coming Soon Banner */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">More Loyalty Program Content Coming Soon!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          We're working on comprehensive guides for airline miles, hotel points, and other loyalty programs popular among Indian travelers.
          Subscribe to get notified when new content is available.
        </p>
        <Link href="/blog" className="btn btn-primary">
          Check Our Latest Articles
        </Link>
      </div>
      
      {/* Available Loyalty Program Articles */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Available Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loyaltyProgramPosts.filter(post => !['airline-miles-optimization', 'debt-funds-explained', 'sip-investment-strategy'].includes(post.id)).map(post => (
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
    </div>
  );
}
