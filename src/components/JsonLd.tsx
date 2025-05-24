'use client';

import { useEffect } from 'react';

interface JsonLdProps {
  type: 'BlogPosting' | 'Article' | 'WebSite' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    });
    
    // Add the script to the head
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  // This component doesn't render anything visible
  return null;
}
