import Link from "next/link";
import BlogImage from "@/components/BlogImage";
import NivesaLogo from "@/components/NivesaLogo";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

// Added 'Interactive Brokers: The Best Broker for NRIs' to Featured and Recent Articles
const featuredPosts: BlogPost[] = [
  {
    id: 'parag-parikh-flexi-cap-fund',
    title: 'Parag Parikh Flexi Cap Fund: A Decade of Stable Performance',
    excerpt: 'Analysis of Parag Parikh Flexi Cap Fund Direct Plan and its impressive 10-year CAGR performance of approximately 17-18%, significantly outperforming both its benchmark and category average.',
    category: 'Mutual Funds',
    date: 'May 23, 2025',
    readTime: '9 min read',
    image: '/images/parag-parikh-fund.jpg',
    featured: true
  },
  {
    id: 'interactive-brokers-review',
    title: 'Interactive Brokers: The Best Broker for NRIs',
    excerpt: 'Discover why Interactive Brokers is the top choice for NRIs looking to invest globally with low fees and excellent tools.',
    category: 'Investments',
    date: 'May 24, 2025',
    readTime: '8 min read',
    image: '/images/interactive-brokers.jpg',
    featured: true
  },
  {
    id: 'hdfc-infinia-credit-card-review',
    title: 'HDFC Infinia Credit Card Review: The Ultimate Premium Card',
    excerpt: 'A comprehensive review of HDFC Bank&apos;s most prestigious Infinia Credit Card, its exceptional benefits, and how its annual fee can be easily recovered through rewards and perks.',
    category: 'Reward Programs',
    date: 'May 23, 2025',
    readTime: '10 min read',
    image: '/images/credit-card-rewards.jpg',
    featured: true
  }
];

// Added a Recent Articles section to the homepage
const recentPosts: BlogPost[] = [
  {
    id: 'parag-parikh-flexi-cap-fund',
    title: 'Parag Parikh Flexi Cap Fund: A Decade of Stable Performance',
    excerpt: 'Analysis of Parag Parikh Flexi Cap Fund Direct Plan and its impressive 10-year CAGR performance of approximately 17-18%, significantly outperforming both its benchmark and category average.',
    category: 'Mutual Funds',
    date: 'May 23, 2025',
    readTime: '9 min read',
    image: '/images/parag-parikh-fund.jpg'
  },
  {
    id: 'interactive-brokers-review',
    title: 'Interactive Brokers: The Best Broker for NRIs',
    excerpt: 'Discover why Interactive Brokers is the top choice for NRIs looking to invest globally with low fees and excellent tools.',
    category: 'Investments',
    date: 'May 24, 2025',
    readTime: '8 min read',
    image: '/images/interactive-brokers.jpg'
  },
  {
    id: 'hdfc-infinia-credit-card-review',
    title: 'HDFC Infinia Credit Card Review: The Ultimate Premium Card',
    excerpt: 'A comprehensive review of HDFC Bank\'s most prestigious Infinia Credit Card, its exceptional benefits, and how its annual fee can be easily recovered through rewards and perks.',
    category: 'Reward Programs',
    date: 'May 23, 2025',
    readTime: '10 min read',
    image: '/images/credit-card-rewards.jpg'
  }
];

export default function Home() {
  return (
    <div className="font-inter">
      {/* Hero Section */}
      <div className="relative bg-gray-900 dark:bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Smart Investments for Indians & NRIs
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Expert insights on Indian mutual funds, International funds/ETFs, investment platforms, health insurance, credit cards, airline & hotel loyalty programs to help you make informed financial decisions.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-50"></div>
      </div>

      {/* Featured Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Link href="/blog" className="text-blue-500 hover:underline text-lg font-medium">
              View All Articles →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <div key={post.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <Link href={`/blog/${post.id}`}>
                  <BlogImage 
                    src={post.image}
                    alt={post.title}
                    type="card"
                    fallbackKey={post.id}
                    priority={index === 0} // Add priority only to the first image
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
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
      </section>
      
      {/* Recent Articles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <Link href="/blog" className="text-blue-500 hover:underline text-lg font-medium">
              View All Articles →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="border rounded-lg overflow-hidden shadow-md">
                <BlogImage 
                  src={post.image}
                  alt={post.title}
                  type="card"
                  priority={index === 0} // Add priority to first image
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                  <p className="text-xs text-gray-500">{post.date} • {post.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with <NivesaLogo className="text-blue-800 dark:text-blue-400 inline" /></h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Get the latest investment advice, financial tips, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </section>
    </div>
  );
}
