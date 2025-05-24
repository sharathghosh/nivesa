import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Check file size - limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // Generate file name and path
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Determine if it's a thumbnail or regular image
    const isThumbnail = formData.get('type') === 'thumbnail';
    
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const relativePath = isThumbnail
      ? `/images/thumbnails/${fileName}`
      : `/images/${fileName}`;
    
    const filePath = path.join(process.cwd(), 'public', relativePath);
    
    // Write the file
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      path: relativePath
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
