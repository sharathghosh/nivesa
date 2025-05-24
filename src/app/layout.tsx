import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
import NivesaLogo from "@/components/NivesaLogo";
import AuthProvider from "./providers";
import { generateSEO } from "@/utils/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Use the SEO utility for consistent metadata
export const metadata: Metadata = generateSEO({
  title: "Investment Advice for Indians & NRIs",
  description: "Expert advice on investments and reward programs for Indians and NRIs across the world",
  keywords: ["investment advice", "investments", "reward programs", "NRI investments", "Indian investors"],
});

export const viewport: Viewport = {
  themeColor: '#1E40AF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* SEO verification tags */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_ID" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_ID" />
        
        {/* Social Media Profiles for search engine knowledge graphs */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "नiveśа",
              "url": "https://nivesa.com",
              "logo": "https://nivesa.com/favicon.svg",
              "sameAs": [
                "https://twitter.com/nivesa_official",
                "https://www.facebook.com/nivesa.official",
                "https://www.linkedin.com/company/nivesa"
              ]
            })
          }}
        />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
      </head>
      <body
        className="antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <NivesaLogo className="text-blue-800 dark:text-blue-400" />
                    </Link>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <Link href="/investments" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Investments</Link>
                    <Link href="/reward-programs" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Reward Programs</Link>
                    <Link href="/tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Tools</Link>
                    <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">About</Link>
                    <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">Blog</Link>
                  </nav>
                  <MobileNav />
                </div>
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="bg-white dark:bg-gray-800 mt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categories</h3>
                    <ul className="mt-4 space-y-2">
                      <li><Link href="/investments" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Investments</Link></li>
                      <li><Link href="/reward-programs" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Reward Programs</Link></li>
                      <li><Link href="/loyalty-programs" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Loyalty Programs</Link></li>
                      <li><Link href="/tools" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Tools</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</h3>
                    <ul className="mt-4 space-y-2">
                      <li><Link href="/about" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">About</Link></li>
                      <li><Link href="/blog" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Blog</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legal</h3>
                    <ul className="mt-4 space-y-2">
                      <li><Link href="/disclaimer" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Disclaimer</Link></li>
                      <li><Link href="/privacy-policy" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Privacy Policy</Link></li>
                      <li><Link href="/terms" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Terms of Use</Link></li>
                    </ul>
                  </div>                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connect</h3>
                  <ul className="mt-4 space-y-2">
                    <li><Link href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Twitter</Link></li>
                    <li><Link href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">LinkedIn</Link></li>
                    <li><Link href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Email</Link></li>
                    <li><Link href="/admin/login" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400">Admin</Link></li>
                  </ul>
                </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-base text-gray-500 dark:text-gray-400">© 2025 <NivesaLogo size="text-base" className="text-gray-500 dark:text-gray-400 inline-block" />. All rights reserved.</p>
                  <p className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
                    Designed and developed for Indian investors worldwide.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
