import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

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

// GET a specific post
export async function GET(request: NextRequest, { params }) {
  try {
    const postId = params.id;
    const data = getData();
    const post = data.posts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ post });
  } catch (_: unknown) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// UPDATE a post
export async function PUT(request: NextRequest, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const postId = params.id;
    const requestData = await request.json();
    
    // Validate post data
    if (!requestData.title || !requestData.content || !requestData.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const data = getData();
    const postIndex = data.posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Update post
    data.posts[postIndex] = {
      ...data.posts[postIndex],
      title: requestData.title,
      excerpt: requestData.excerpt || data.posts[postIndex].excerpt,
      content: requestData.content,
      category: requestData.category,
      date: requestData.date || data.posts[postIndex].date,
      readTime: requestData.readTime || data.posts[postIndex].readTime,
      image: requestData.image || data.posts[postIndex].image,
      thumbnail: requestData.thumbnail || data.posts[postIndex].thumbnail,
      featured: requestData.featured !== undefined ? requestData.featured : data.posts[postIndex].featured,
      author: {
        name: requestData.author?.name || data.posts[postIndex].author.name,
        avatar: requestData.author?.avatar || data.posts[postIndex].author.avatar
      }
    };
    
    writeData(data);
    
    return NextResponse.json({ message: 'Post updated successfully', post: data.posts[postIndex] });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE a post
export async function DELETE(request: NextRequest, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const postId = params.id;
    const data = getData();
    const postIndex = data.posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Remove post
    data.posts.splice(postIndex, 1);
    
    // Also remove comments for this post
    data.comments = data.comments.filter(c => c.postId !== postId);
    
    writeData(data);
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
