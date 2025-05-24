// download-images-axios.js
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const imagesDir = path.join(__dirname, 'public', 'images');
const authorsDir = path.join(imagesDir, 'authors');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

if (!fs.existsSync(authorsDir)) {
  fs.mkdirSync(authorsDir, { recursive: true });
  console.log(`Created directory: ${authorsDir}`);
}

// Image URLs and their destination filenames
const images = [
  {
    name: 'parag-parikh-fund.jpg',
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Parag Parikh Flexi Cap Fund'
  },
  {
    name: 'mutual-funds.jpg',
    url: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Mutual Funds'
  },
  {
    name: 'nri-investment.jpg',
    url: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'NRI Investment'
  },
  {
    name: 'credit-card-rewards.jpg',
    url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Credit Card Rewards'
  },
  {
    name: 'airline-miles.jpg',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Airline Miles'
  },
  {
    name: 'debt-funds.jpg',
    url: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Debt Funds'
  },
  {
    name: 'hotel-loyalty.jpg',
    url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Hotel Loyalty Programs'
  },
  {
    name: 'sip-investment.jpg',
    url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'SIP Investment'
  },
  {
    name: 'nri-tax.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'NRI Tax'
  },
  {
    name: 'equity-hybrid.jpg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Equity vs Hybrid Funds'
  },
  {
    name: 'travel-cards.jpg',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Travel Credit Cards'
  },
  {
    name: 'elss-tax-saving.jpg',
    url: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'ELSS Tax Saving'
  },
  {
    name: 'beginners-guide.jpg',
    url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    description: 'Beginners Guide'
  },
  {
    name: path.join('authors', 'aditya.jpg'),
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    description: 'Author - Aditya'
  }
];

// Function to download an image using axios
async function downloadImage(imageObj) {
  const filePath = path.join(imagesDir, imageObj.name);
  console.log(`Downloading ${imageObj.description} to ${filePath}...`);
  
  try {
    const response = await axios({
      method: 'GET',
      url: imageObj.url,
      responseType: 'stream'
    });
    
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Downloaded: ${imageObj.description}`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error(`Error writing file for ${imageObj.description}: ${err.message}`);
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Error downloading ${imageObj.description}: ${error.message}`);
    throw error;
  }
}

// Download all images with a delay between each to avoid rate limiting
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const image of images) {
    try {
      await downloadImage(image);
      // Wait 1 second between downloads to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to download ${image.description}`);
    }
  }
  
  console.log('All images downloaded successfully!');
}

// Start downloading
downloadAllImages();
