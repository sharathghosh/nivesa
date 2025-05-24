import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

/**
 * Generates standardized metadata for SEO
 * @param props SEO properties
 * @returns Next.js Metadata object
 */
export function generateSEO(props: SEOProps): Metadata {
  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nivesa.com';
  
  // Default meta description
  const defaultDescription = 'Expert advice on investments and reward programs for Indians and NRIs across the world';
  
  // Default keywords
  const defaultKeywords = [
    'investment advice', 
    'investments', 
    'reward programs', 
    'NRI investments', 
    'Indian investors', 
    'credit cards',
    'mutual funds'
  ];
  
  // Construct the page title
  const pageTitle = props.title 
    ? `${props.title} - नiveśа` 
    : 'नiveśа - Investment Advice for Indians & NRIs';
  
  // Prepare the image URL
  const imageUrl = props.ogImage 
    ? (props.ogImage.startsWith('http') ? props.ogImage : `${baseUrl}${props.ogImage}`)
    : `${baseUrl}/og-images/default.png`;

  // Construct the canonical URL
  const canonicalUrl = props.canonical 
    ? (props.canonical.startsWith('http') ? props.canonical : `${baseUrl}${props.canonical}`)
    : baseUrl;
  
  // Create the metadata object
  const metadata: Metadata = {
    title: pageTitle,
    description: props.description || defaultDescription,
    keywords: [...(props.keywords || []), ...defaultKeywords],
    openGraph: {
      title: props.title || 'नiveśа',
      description: props.description || defaultDescription,
      url: canonicalUrl,
      siteName: 'नiveśа',
      locale: 'en_US',
      type: props.type || 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: props.title || 'नiveśа',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title || 'नiveśा',
      description: props.description || defaultDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    }
  };
  
  // Add article specific metadata if type is article
  if (props.type === 'article' && props.publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime: props.publishedTime,
    };
    
    if (props.author) {
      metadata.openGraph = {
        ...metadata.openGraph,
        authors: [props.author],
      };
      
      metadata.authors = [{ name: props.author }];
    }
  }
  
  return metadata;
}
