import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogImage from '@/components/BlogImage';
import Comments from '@/components/Comments';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { generateSEO } from '@/utils/seo';
import ClientJsonLd from '@/components/ClientJsonLd';

// Type definition for blog post
interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

// Helper function to get all posts (for related posts)
async function getAllPosts(): Promise<Post[]> {
  try {
    // Read from data.json directly on the server
    const dataPath = path.join(process.cwd(), 'src/app/api/data.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);
    return data.posts || [];
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    return [];
  }
}

// Helper function to get a single post by slug
async function getPost(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.id === slug) || null;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return generateSEO({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      canonical: '/blog'
    });
  }
  
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'investment advice', 'financial insights', post.title.toLowerCase()],
    ogImage: post.image,
    canonical: `/blog/${post.id}`,
    type: 'article',
    publishedTime: post.date,
    author: post.author.name
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }

  // Get related posts (same category, different ID)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
    .slice(0, 3);
    
  // Base URL for canonical and structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nivesa.com';
  
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Add structured data for blog post */}
      <ClientJsonLd 
        type="BlogPosting"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: post.author.name,
            url: `${baseUrl}/authors/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'नiveśа',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/favicon.svg`,
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.id}`,
          },
          keywords: [post.category, 'investment advice', 'financial insights'],
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
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: `${baseUrl}/blog/${post.id}`,
            },
          ],
        }}
      />
      
      {/* Breadcrumbs */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800 dark:text-gray-200">{post.title}</span>
        </div>
      </div>
      
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="mx-3 text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{post.date}</span>
          <span className="mx-3 text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{post.excerpt}</p>
      </header>
      
      {/* Author */}
      <div className="flex items-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="h-12 w-12 relative overflow-hidden rounded-full mr-4">
          <BlogImage 
            src={post.author.avatar}
            alt={post.author.name}
            type="author"
            imageType="author"
            fallbackKey={post.author.name}
          />
        </div>
        <div>
          <h3 className="font-medium">{post.author.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="mb-8">
        <BlogImage 
          src={post.image}
          alt={post.title}
          type="featured"
          fallbackKey={post.id}
          priority={true}
        />
      </div>
      
      {/* Content */}
      <div 
        className="blog-content prose prose-lg lg:prose-xl dark:prose-invert max-w-none mb-12" 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Tags */}
      <div className="mb-12">
        <h4 className="text-lg font-medium mb-4">Related Topics</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
            {post.category}
          </span>
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
            Investments
          </span>
          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
            Finance
          </span>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-8 text-center mb-12">
        <h3 className="text-2xl font-bold mb-4">Want more investment insights?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Subscribe to our newsletter to get the latest updates on mutual funds, credit cards, and loyalty programs.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
            Subscribe
          </button>
        </form>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg my-8 border-l-4 border-amber-500">
        <h4 className="text-lg font-bold mb-2">Disclaimer</h4>
        <p className="text-sm m-0">
          This article is for informational purposes only and does not constitute investment or financial advice. Please conduct your own research before making any investment decisions.
        </p>
      </div>
      
      {/* Article Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-medium mb-2">Share this article</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="sr-only">Share on Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="sr-only">Share on Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="sr-only">Share on LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="sr-only">Share via Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <Link href="/blog" className="text-blue-700 dark:text-blue-400 font-medium hover:underline">
            ← Back to all articles
          </Link>
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <Link href={`/blog/${relatedPost.id}`}>
                  <BlogImage
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    type="card"
                    fallbackKey={relatedPost.id}
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                        {relatedPost.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{relatedPost.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2">{relatedPost.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-500">{relatedPost.readTime}</span>
                      <span className="text-blue-700 dark:text-blue-400 font-medium">Read More →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Comments section */}
      <div className="mt-12">
        <Comments postTitle={post.title} postId={post.id} />
      </div>
    </article>
  );
}

// Generate static params for all posts to optimize performance
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.id,
  }));
}
