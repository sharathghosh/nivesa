'use client';

import PostForm from '@/components/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Create New Post</h1>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <PostForm />
      </div>
    </div>
  );
}
