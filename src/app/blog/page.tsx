import Link from 'next/link';
import BlogImage from '@/components/BlogImage';
import { readFileSync } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { generateSEO } from '@/utils/seo';
import ClientJsonLd from '@/components/ClientJsonLd';

// Define TypeScript interface for blog posts
interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  thumbnail: string;
  featured: boolean;
  author: {
    name: string;
    avatar: string;
  };
}

// Define metadata for blog index page
export const metadata: Metadata = generateSEO({
  title: 'Blog | Investment Insights, Rewards & Financial Advice',
  description: 'Discover expert insights on investments, reward programs, credit cards, and financial strategies for Indians and NRIs.',
  keywords: ['investment blog', 'financial advice blog', 'NRI investments', 'reward programs india', 'credit card reviews'],
  canonical: '/blog',
  type: 'website'
});

// Get posts from our JSON data source
async function getPosts(): Promise<Post[]> {
  const dataPath = path.join(process.cwd(), 'src/app/api/data.json');
  const jsonData = readFileSync(dataPath, 'utf8');
  const data = JSON.parse(jsonData);
  return data.posts;
}

export default async function BlogPage() {
  const allPosts = await getPosts();
  
  // Create a set of unique categories
  const categories = Array.from(new Set(allPosts.map((post: Post) => post.category)));
  
  // Base URL for structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nivesa.com';
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Add structured data for blog page */}
      <ClientJsonLd 
        type="WebSite"
        data={{
          name: 'नiveśा Blog',
          url: `${baseUrl}/blog`,
          description: 'Insights and strategies to help you make informed investment decisions in India.',
          publisher: {
            '@type': 'Organization',
            name: 'नiveśा',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/favicon.svg`,
            }
          }
        }} 
      />
      
      {/* Add breadcrumb structured data */}
      <ClientJsonLd 
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${baseUrl}/blog`,
            },
          ],
        }}
      />
      
      <div className="pb-12">
        <h1 className="text-4xl font-bold mb-4">The नiveśा Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Insights and strategies to help you make informed investment decisions in India.
        </p>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/blog" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700">
          All Posts
        </Link>
        {categories.map((category) => (
          <Link 
            key={category} 
            href={`/${category.toLowerCase().replace(/\s+/g, '-')}`} 
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {category}
          </Link>
        ))}
      </div>
      
      {/* Featured Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {allPosts
            .filter((post: Post) => post.featured)
            .slice(0, 2)
            .map((post: Post) => (
              <div key={post.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                <Link href={`/blog/${post.id}`}>
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    type="featured"
                    fallbackKey={post.id}
                    priority={true} // Added priority to fix LCP warning
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
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
      
      {/* All Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-8">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post: Post) => (
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
    </div>
  );
}
