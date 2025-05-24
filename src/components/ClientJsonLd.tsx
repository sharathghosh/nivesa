'use client';

import dynamic from 'next/dynamic';

// Import JsonLd component with dynamic loading
const JsonLd = dynamic(() => import('./JsonLd'), { ssr: false });

interface ClientJsonLdProps {
  type: 'BlogPosting' | 'Article' | 'WebSite' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

export default function ClientJsonLd({ type, data }: ClientJsonLdProps) {
  return <JsonLd type={type} data={data} />;
}
