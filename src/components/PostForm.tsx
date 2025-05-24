'use client';

import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';

export default function PostForm({ post = null }) {
  const isEditMode = !!post;
  const router = useRouter();
  const editorRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    category: post?.category || '',
    content: post?.content || '',
    featured: post?.featured || false,
    readTime: post?.readTime || '5 min read',
    date: post?.date || new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    darkMode: false, // Added darkMode property
  });
  
  const [featuredImage, setFeaturedImage] = useState({
    file: null,
    preview: post?.image || null
  });
  
  const [thumbnailImage, setThumbnailImage] = useState({
    file: null,
    preview: post?.thumbnail || null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch existing categories (for the dropdown)
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.posts.map((p) => p.category))
        );
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };
  
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Get content from TinyMCE
      const content = editorRef.current.getContent();
      
      // Upload images if needed
      let featuredImagePath = post?.image || '';
      let thumbnailPath = post?.thumbnail || '';
      
      if (featuredImage.file) {
        featuredImagePath = await uploadImage(featuredImage.file);
      }
      
      if (thumbnailImage.file) {
        thumbnailPath = await uploadImage(thumbnailImage.file, true);
      }
      
      // Prepare the post data
      const postData = {
        ...formData,
        content,
        image: featuredImagePath,
        thumbnail: thumbnailPath
      };
      
      // Send to API
      const url = isEditMode 
        ? `/api/posts/${post.id}`
        : '/api/posts';
        
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save post');
      }
      
      // Redirect back to posts list
      router.push('/admin/dashboard/posts');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'An error occurred while saving the post');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const uploadImage = async (file, isThumbnail = false) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (isThumbnail) {
      formData.append('type', 'thumbnail');
    }
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.path;
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>
      
      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Excerpt *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          value={formData.excerpt}
          onChange={handleInputChange}
          rows={2}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        ></textarea>
      </div>
      
      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category *
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            list="categories"
            type="text"
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleInputChange}
            className="flex-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter or select a category"
          />
          <datalist id="categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Read Time */}
      <div>
        <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Read Time
        </label>
        <input
          type="text"
          id="readTime"
          name="readTime"
          value={formData.readTime}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="e.g., 5 min read"
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Publication Date
        </label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="May 24, 2025"
        />
      </div>
      
      {/* Featured */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Feature this post
        </label>
      </div>
      
      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Featured Image
        </label>
        <div className="mt-1 flex items-center">
          {featuredImage.preview && (
            <div className="relative mr-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage.preview}
                alt="Featured image preview"
                className="h-24 w-32 object-cover rounded"
                // Using img instead of Image due to dynamic local URL preview
              />
              <button
                type="button"
                onClick={() => setFeaturedImage({ file: null, preview: null })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <input
            type="file"
            id="featuredImage"
            onChange={handleFeaturedImageChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="featuredImage"
            className="cursor-pointer py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {featuredImage.preview ? 'Change Image' : 'Upload Image'}
          </label>
        </div>
      </div>
      
      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Thumbnail Image
        </label>
        <div className="mt-1 flex items-center">
          {thumbnailImage.preview && (
            <div className="relative mr-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailImage.preview}
                alt="Thumbnail preview"
                className="h-16 w-16 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => setThumbnailImage({ file: null, preview: null })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="thumbnail"
            className="cursor-pointer py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {thumbnailImage.preview ? 'Change Thumbnail' : 'Upload Thumbnail'}
          </label>
        </div>
      </div>
      
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content *
        </label>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={post?.content || ''}
          apiKey='no-api-key'
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | link image | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            skin: formData.darkMode ? 'oxide-dark' : 'oxide',
            content_css: formData.darkMode ? 'dark' : 'default',
          }}
        />
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
