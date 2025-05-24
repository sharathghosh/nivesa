import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSvgToIco() {
  try {
    // Path to SVG file
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    
    // Convert SVG to PNG (32x32)
    await sharp(svgPath)
      .resize(32, 32)
      .toFormat('png')
      .toFile(path.join(__dirname, 'public', 'favicon-32x32.png'));
    
    // Convert SVG to PNG (16x16)
    await sharp(svgPath)
      .resize(16, 16)
      .toFormat('png')
      .toFile(path.join(__dirname, 'public', 'favicon-16x16.png'));
      
    console.log('Favicon PNG files generated successfully');
  } catch (error) {
    console.error('Error converting SVG to ICO:', error);
  }
}

convertSvgToIco();
