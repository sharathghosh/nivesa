import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Define interfaces for type checking
interface Author {
  name: string;
  avatar: string;
}

interface Reply {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  thumbnail?: string;
  author: Author;
  featured?: boolean;
}

interface Data {
  posts: Post[];
  comments: Comment[];
}

// Path to our JSON database
const dataPath = path.join(process.cwd(), 'src/app/api/data.json');

// Read data
function getData(): Data {
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
}

// Write data
function writeData(data: Data): void {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

// GET comments for a specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const data = getData();
    
    // Initialize comments if they don't exist
    if (!data.comments) {
      data.comments = [];
    }
    
    // Filter comments by postId
    const postComments = data.comments.filter(comment => comment.postId === postId);
    
    return NextResponse.json({ comments: postComments || [] });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST a new comment
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { postId, author, content } = requestData;
    
    if (!postId || !author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const data = getData();
    
    // Initialize comments array if it doesn't exist
    if (!data.comments) {
      data.comments = [];
    }
    
    // Create a new comment
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      author,
      content,
      timestamp: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      replies: []
    };
    
    // Add the comment to the data
    data.comments.push(newComment);
    
    // Save the data
    writeData(data);
    
    return NextResponse.json({ comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

// DELETE a comment (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Type assertion for authOptions is required due to NextAuth typings
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated as admin
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('id');
    
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    
    const data = getData();
    
    // Find and remove the comment
    if (data.comments) {
      const commentIndex = data.comments.findIndex(comment => comment.id === commentId);
      
      if (commentIndex !== -1) {
        data.comments.splice(commentIndex, 1);
        writeData(data);
        
        return NextResponse.json({ success: true });
      }
      
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'No comments found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
