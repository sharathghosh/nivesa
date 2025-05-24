'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Author {
  name: string;
  avatar: string;
}

interface Reply {
  id: string;
  content: string;
  author: Author;
  timestamp: string;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  timestamp: string;
  replies?: Reply[];
}

interface Post {
  id: string;
  title: string;
  comments?: Comment[];
}

export default function CommentsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data.posts || []);
        
        if (data.posts && data.posts.length > 0) {
          setSelectedPostId(data.posts[0].id);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  useEffect(() => {
    if (selectedPostId) {
      fetchComments(selectedPostId);
    }
  }, [selectedPostId]);
  
  const fetchComments = async (postId) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteComment = async (commentId: string, replyId?: string) => {
    if (!window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }
    
    try {
      let url = `/api/comments?postId=${selectedPostId}&commentId=${commentId}`;
      
      if (replyId) {
        url += `&replyId=${replyId}`;
      }
      
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Refresh comments after deletion
        fetchComments(selectedPostId);
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Manage Comments</h1>
      
      {/* Filter by Post */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Post
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
          >
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Comments
          </h3>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {comments && comments.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {comments.map((comment) => (
                  <li key={comment.id} className="p-4 sm:px-6">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative overflow-hidden rounded-full">
                          <Image
                            className="h-10 w-10 rounded-full object-cover"
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {comment.author.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {comment.timestamp}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                          Replies
                        </h4>
                        <ul className="space-y-4">
                          {comment.replies.map((reply) => (
                            <li key={reply.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 relative overflow-hidden rounded-full">
                                    <Image
                                      className="h-8 w-8 rounded-full object-cover"
                                      src={reply.author.avatar}
                                      alt={reply.author.name}
                                      width={32}
                                      height={32}
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {reply.author.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {reply.timestamp}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteComment(comment.id, reply.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                {reply.content}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                No comments found for this post.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
