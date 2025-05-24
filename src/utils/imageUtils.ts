// src/utils/imageUtils.ts
// No need for StaticImageData as we're using string paths

// Define fallback image paths for each category (using local images)
const fallbackImages: { [key: string]: string } = {
  'parag-parikh-fund': '/images/parag-parikh-fund.jpg',
  'mutual-funds': '/images/mutual-funds.jpg',
  'nri-investment': '/images/nri-investment.jpg',
  'credit-card-rewards': '/images/credit-card-rewards.jpg',
  'airline-miles': '/images/airline-miles.jpg',
  'debt-funds': '/images/debt-funds.jpg',
  'hotel-loyalty': '/images/hotel-loyalty.jpg',
  'sip-investment': '/images/sip-investment.jpg',
  'nri-tax': '/images/nri-tax.jpg',
  'equity-hybrid': '/images/equity-hybrid.jpg',
  'travel-cards': '/images/travel-cards.jpg',
  'elss-tax-saving': '/images/elss-tax-saving.jpg',
  'beginners-guide': '/images/beginners-guide.jpg',
  'default': '/images/mutual-funds.jpg',
  'interactive-brokers': '/images/interactive-brokers.jpg',
  'parag-parikh-flexi-cap': '/images/parag-parikh-fund.jpg',
  'hdfc-infinia': '/images/credit-card-rewards.jpg',
};

// For author images
const authorImages: { [key: string]: string } = {
  'aditya': '/images/authors/aditya.jpg',
  'default': '/images/authors/aditya.jpg'
};

// Function to determine the best image source
export function getImageSrc(key: string, type: 'post' | 'author' = 'post'): string {
  try {
    const imageKey = key.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const imageMap = type === 'author' ? authorImages : fallbackImages;
    
    // Return the image for the specific key or use the default
    return imageMap[imageKey] || imageMap.default;
  } catch (error) {
    console.error('Error loading image:', error);
    return type === 'author' ? authorImages.default : fallbackImages.default;
  }
}

// Define image sizes
export const imageSizes = {
  featured: 'w-full h-96 md:h-[500px] object-cover rounded-lg',
  card: 'w-full h-64 object-cover rounded-t-lg',
  thumbnail: 'w-full h-32 object-cover rounded-lg',
  author: 'w-10 h-10 rounded-full object-cover',
  authorLarge: 'w-20 h-20 rounded-full object-cover',
};

// Helper for generating a color based on a string (useful for fallback backgrounds)
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
}
