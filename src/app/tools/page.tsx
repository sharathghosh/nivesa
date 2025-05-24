import Link from 'next/link';
import BlogImage from '@/components/BlogImage';

const toolsPosts = [
	{
		id: 'hdfc-ergo-optima-super-secure',
		title: 'HDFC Ergo Optima Super Secure: Best Health Insurance for Indians',
		excerpt: 'A detailed review of HDFC Ergo Optima Super Secure, highlighting its comprehensive coverage and benefits.',
		category: 'Health Insurance',
		date: 'May 23, 2025',
		readTime: '8 min read',
		image: '/images/health-insurance.jpg',
		featured: false,
	},
	{
		id: 'interactive-brokers-review',
		title: 'Interactive Brokers: The Best Broker for NRIs',
		excerpt: 'Interactive Brokers offers unbeatable fees, a wide range of investment instruments, and excellent security, making it the top choice for NRIs worldwide.',
		category: 'Brokerage',
		date: 'May 23, 2025',
		readTime: '10 min read',
		image: '/images/interactive-brokers.jpg',
		featured: true,
	},
	{
		id: 'kuvera-best-sip-platform',
		title: 'Kuvera: Best Mutual Fund Platform for SIPs',
		excerpt: 'An in-depth look at Kuvera, the best platform for managing SIPs and mutual fund investments.',
		category: 'Mutual Funds',
		date: 'May 23, 2025',
		readTime: '7 min read',
		image: '/images/sip-investment.jpg',
		featured: false,
	},
];

export default function ToolsPage() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold mb-4">Tools</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
					Explore the best tools and platforms for investments, insurance, and
					financial management.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{toolsPosts.map((post) => (
					<div
						key={post.id}
						className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
					>
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
									<span className="text-xs text-gray-600 dark:text-gray-400">
										{post.date}
									</span>
								</div>
								<h3 className="text-xl font-bold mb-3">{post.title}</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
									{post.excerpt}
								</p>
								<div className="flex justify-between items-center">
									<span className="text-sm text-gray-500 dark:text-gray-500">
										{post.readTime}
									</span>
									<span className="text-blue-700 dark:text-blue-400 font-medium">
										Read More →
									</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
