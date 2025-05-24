'use client';

import { useState, useEffect } from 'react';
import BlogImage from './BlogImage';

interface CommentsProps {
  postTitle?: string;
  postId?: string;
}

// Types of sorting methods
type SortMethod = 'newest' | 'oldest' | 'popular';

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

export default function Comments({ postTitle = 'this article', postId = 'default' }: CommentsProps) {
  // User state simulation (in a real app, this would come from an auth system)
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
  });
  
  // Sort method state
  const [sortMethod, setSortMethod] = useState<SortMethod>('newest');
  
  // Comments and loading state
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New comment state
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reply state
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  
  // Initialize likes from localStorage if available
  const [likes, setLikes] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const savedLikes = localStorage.getItem('blogLikes');
      return savedLikes ? JSON.parse(savedLikes) : {};
    }
    return {};
  });
  
  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginName, setLoginName] = useState('');
  
  // Notification state for new comments
  const [hasNewComments] = useState(false); // Using this in future features
  
  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId || postId === 'default') {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/comments?postId=${postId}`);
        
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
    
    // Check for user login status
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('nivesaUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [postId]);
  
  const handleLike = (commentId: string) => {
    const newLikes = {
      ...likes,
      [commentId]: !likes[commentId]
    };
    setLikes(newLikes);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('blogLikes', JSON.stringify(newLikes));
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    // Check if user is logged in
    if (!user.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    if (!postId || postId === 'default') return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          author: {
            name: user.name,
            avatar: user.avatar
          },
          content: newComment
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setComments(prevComments => [data.comment, ...prevComments]);
        setNewComment('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReply = (commentId: string) => {
    if (!user.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent('');
  };
  
  // Handle login
  const handleLogin = () => {
    if (!loginName.trim()) return;
    
    setUser({
      isLoggedIn: true,
      name: loginName,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    });
    
    setShowLoginModal(false);
    setLoginName('');
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('nivesaUser', JSON.stringify({
        isLoggedIn: true,
        name: loginName,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      }));
    }
  };
  
  const submitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;
    
    // Check if user is logged in
    if (!user.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    // In a real app, we'd have an API endpoint for replies
    // For now, we'll just update the local state
    const newReply: Reply = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      content: replyContent,
      timestamp: new Date().toLocaleDateString()
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent('');
  };
  
  // Sort comments based on selected method
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortMethod) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'popular':
        // Sort by number of replies
        return b.replies.length - a.replies.length;
      default:
        return 0;
    }
  });
  
  return (
    <section className="mt-8 border-t pt-4" data-testid="blog-comments">
      {/* User info and sort controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <button className="text-blue-500 hover:underline text-lg font-medium">
            👍 Likes ({Object.values(likes).filter(Boolean).length})
          </button>
          <div className="relative">
            <button className="text-blue-500 hover:underline text-lg font-medium flex items-center">
              💬 Comments ({comments.length})
              {hasNewComments && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 hidden sm:block">
            Discussing {postTitle}
          </div>
          
          <select 
            className="text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1"
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value as SortMethod)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most replies</option>
          </select>
        </div>
      </div>
      
      {/* User login status */}
      <div className="mb-4 flex justify-between items-center">
        {user.isLoggedIn ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <BlogImage
                src={user.avatar}
                alt={user.name}
                type="author"
                imageType="author"
                fallbackKey={user.name}
              />
            </div>
            <span>Commenting as <span className="font-medium">{user.name}</span></span>
            <button 
              className="text-sm text-red-500 hover:underline ml-2"
              onClick={() => {
                setUser({ isLoggedIn: false, name: '', avatar: '' });
                localStorage.removeItem('nivesaUser');
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button 
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setShowLoginModal(true)}
          >
            Sign in to comment
          </button>
        )}
      </div>

      {/* Comment Input Field */}
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          placeholder="Write a comment..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button 
          className={`mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleAddComment}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      {/* Comments Display */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading comments...</p>
          </div>
        ) : sortedComments.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 mb-2">No comments yet</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Be the first to share your thoughts!</p>
          </div>
        ) : (
          sortedComments.map(comment => (
            <div key={comment.id} className="border dark:border-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 mr-2 relative overflow-hidden rounded-full">
                  <BlogImage 
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    type="author"
                    imageType="author"
                    fallbackKey={comment.author.name}
                  />
                </div>
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
              <div className="flex space-x-4">
                <button 
                  className={`text-sm flex items-center gap-1 transition-all duration-200 ${
                    likes[comment.id] 
                      ? 'text-pink-600 dark:text-pink-500' 
                      : 'text-blue-500 hover:underline'
                  }`}
                  onClick={() => handleLike(comment.id)}
                >
                  <span className={`transform ${likes[comment.id] ? 'scale-125' : ''} transition-transform duration-300`}>
                    {likes[comment.id] ? '❤️' : '👍'}
                  </span>
                  <span>{likes[comment.id] ? 'Liked' : 'Like'}</span>
                </button>
                <button 
                  className="text-blue-500 hover:underline text-sm"
                  onClick={() => handleReply(comment.id)}
                >
                  Reply
                </button>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-3 space-y-3">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="border-l-2 pl-4 border-gray-300 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 mr-2 relative overflow-hidden rounded-full">
                          <BlogImage 
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            type="author"
                            imageType="author"
                            fallbackKey={reply.author.name}
                          />
                        </div>
                        <span className="font-medium">{reply.author.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{reply.timestamp}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="mt-3 ml-8">
                  <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800"
                    placeholder="Write a reply..."
                    rows={2}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button 
                      className="px-3 py-1 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      onClick={() => submitReply(comment.id)}
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Sign in to comment</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Enter your name to continue. This is a simulation - no real account is created.
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleLogin}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
