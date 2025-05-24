// src/components/BlogImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageSrc, stringToColor, imageSizes } from '@/utils/imageUtils';

interface BlogImageProps {
  src?: string;
  alt: string;
  type?: 'featured' | 'card' | 'thumbnail' | 'author' | 'authorLarge';
  className?: string;
  fallbackKey?: string;
  imageType?: 'post' | 'author';
  priority?: boolean; // Added priority prop
}

export default function BlogImage({ 
  src, 
  alt, 
  type = 'card',
  className = '',
  fallbackKey,
  imageType = 'post',
  priority = false
}: BlogImageProps) {
  const [error, setError] = useState(false);
  
  // Use the provided src or get one using our utility
  // If src is a relative path, use it as is; otherwise use our utility to get a fallback
  const imageSrc = error || !src
    ? getImageSrc(fallbackKey || alt, imageType)
    : src === '/images/authors/aditya.jpg'
    ? 'https://media.licdn.com/dms/image/v2/D4E03AQGmlXz-2bS_Jw/profile-displayphoto-shrink_200_200/B4EZbDOJGnHkAY-/0/1747031986993?e=2147483647&v=beta&t=1Lf3ZYTFK15BvWWz4nG2Yoj1DxusGMz6y5JSdTMqODU'
    : src;
    
  // Generate a fallback color based on the alt text
  const fallbackColor = stringToColor(alt);
  
  const sizeClasses = imageSizes[type] || imageSizes.card;
  const heightClasses = {
    featured: 'h-96',
    card: 'h-64',
    thumbnail: 'h-32',
    author: 'h-16',
    authorLarge: 'h-24',
  }[type] || 'h-64';

  return (
    <div className={`relative overflow-hidden ${sizeClasses} ${heightClasses} ${className}`} 
         style={{ backgroundColor: fallbackColor }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-opacity duration-300"
        onError={() => setError(true)}
        sizes={
          type === 'featured' ? '100vw' :
          type === 'card' ? '(max-width: 768px) 100vw, 33vw' :
          type === 'thumbnail' ? '(max-width: 768px) 50vw, 25vw' :
          '100px'
        }
      />
    </div>
  );
}
