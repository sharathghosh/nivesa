import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  try {
    // Path to SVG file
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    
    // Generate various sizes for favicon
    const sizes = [16, 32, 192, 512];
    
    for (const size of sizes) {
      await sharp(svgPath)
        .resize(size, size)
        .toFormat('png')
        .toFile(path.join(__dirname, 'public', `favicon-${size}x${size}.png`));
      
      console.log(`Generated ${size}x${size} favicon`);
    }

    // Generate Apple touch icon (180x180)
    await sharp(svgPath)
      .resize(180, 180)
      .toFormat('png')
      .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
    
    console.log(`Generated 180x180 Apple touch icon`);
      
    console.log('All favicon sizes generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Function to generate OpenGraph images for better social sharing
async function generateOgImages() {
  try {
    // Create directory for og-images if it doesn't exist
    const ogImageDir = path.join(__dirname, 'public', 'og-images');
    if (!fs.existsSync(ogImageDir)) {
      fs.mkdirSync(ogImageDir);
      console.log('Created directory for OpenGraph images');
    }

    // Create a default OpenGraph image with branding
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    const logoBuffer = await fs.promises.readFile(svgPath);

    // Create default OG image (1200x630 is the recommended size for OpenGraph)
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 30, g: 64, b: 175, alpha: 1 } // Blue background
      }
    })
    .composite([
      {
        input: logoBuffer,
        top: 165,
        left: 450,
        width: 300,
        height: 300
      }
    ])
    .toFormat('png')
    .toFile(path.join(ogImageDir, 'default.png'));

    console.log('Generated default OpenGraph image');

  } catch (error) {
    console.error('Error generating OpenGraph images:', error);
  }
}

// Execute both functions
async function generateAll() {
  await generateIcons();
  await generateOgImages();
  console.log('All assets generated successfully!');
}

generateAll();

generateIcons();
