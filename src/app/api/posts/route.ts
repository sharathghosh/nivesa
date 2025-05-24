import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Path to our JSON database
const dataPath = path.join(process.cwd(), 'src/app/api/data.json');

// Read data
function getData() {
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
}

// Write data
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

// GET all posts
export async function GET() {
  try {
    const data = getData();
    return NextResponse.json({ posts: data.posts });
  } catch (_: unknown) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const requestData = await request.json();
    
    // Validate post data
    if (!requestData.title || !requestData.content || !requestData.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Generate ID from title
    const id = requestData.id || requestData.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    const newPost = {
      id,
      title: requestData.title,
      excerpt: requestData.excerpt || '',
      content: requestData.content,
      category: requestData.category,
      date: requestData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: requestData.readTime || '5 min read',
      image: requestData.image || '/images/default.jpg',
      thumbnail: requestData.thumbnail || '/images/thumbnails/default-thumb.jpg',
      featured: requestData.featured || false,
      author: {
        name: requestData.author?.name || 'Sharath Ghosh',
        avatar: requestData.author?.avatar || 'https://media.licdn.com/dms/image/v2/D4E03AQGmlXz-2bS_Jw/profile-displayphoto-shrink_200_200/B4EZbDOJGnHkAY-/0/1747031986993?e=2147483647&v=beta&t=1Lf3ZYTFK15BvWWz4nG2Yoj1DxusGMz6y5JSdTMqODU'
      }
    };
    
    const data = getData();
    data.posts.push(newPost);
    writeData(data);
    
    return NextResponse.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
