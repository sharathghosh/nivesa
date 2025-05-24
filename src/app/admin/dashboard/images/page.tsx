'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
// Removed unused imports
// import { useRouter } from 'next/navigation';
// import fs from 'fs';
// import path from 'path';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  timestamp: string;
  size: string;
  dimensions: string;
  type: string;
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Removed unused variable
  // const router = useRouter();

  const [dragActive, setDragActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('upload');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // This would normally fetch images from a backend API
    // For now, we'll just simulate this functionality
    async function fetchImages() {
      const mockImages = [
        {
          id: '1',
          name: 'parag-parikh-fund.jpg',
          url: '/images/parag-parikh-fund.jpg',
          timestamp: 'May 23, 2025',
          size: '245 KB',
          dimensions: '1200 x 800',
          type: 'jpg'
        },
        {
          id: '2',
          name: 'credit-card-rewards.jpg',
          url: '/images/credit-card-rewards.jpg',
          timestamp: 'May 23, 2025',
          size: '186 KB',
          dimensions: '1200 x 800',
          type: 'jpg'
        },
        {
          id: '3',
          name: 'interactive-brokers.jpg',
          url: '/images/interactive-brokers.jpg',
          timestamp: 'May 23, 2025',
          size: '210 KB',
          dimensions: '1200 x 800',
          type: 'jpg'
        },
        {
          id: '4',
          name: 'nri-investment.jpg',
          url: '/images/nri-investment.jpg',
          timestamp: 'May 20, 2025',
          size: '195 KB',
          dimensions: '1200 x 800',
          type: 'jpg'
        },
        {
          id: '5',
          name: 'mutual-funds.jpg',
          url: '/images/mutual-funds.jpg',
          timestamp: 'May 19, 2025',
          size: '230 KB',
          dimensions: '1200 x 800',
          type: 'jpg'
        }
      ];
      
      setImages(mockImages);
    }
    
    fetchImages();
  }, []);
  
  const handleFileUpload = async (files: File[]) => {
    setUploadingImage(true);
    setUploadError(null);
    
    try {
      for (const file of files) {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          throw new Error('Invalid file type. Only images are allowed.');
        }

        // Check file size - limit to 5MB
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('File too large. Maximum size is 5MB.');
        }

        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        
        const data = await response.json();
        
        // Add the new image to the list
        const newImage = {
          id: Date.now().toString(),
          name: file.name,
          url: data.path,
          timestamp: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: 'Unknown', // We'd need additional processing to get this
          type: file.type.split('/')[1]
        };
        
        setImages((prevImages) => [newImage, ...prevImages]);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setUploadError((err as Error).message || 'An error occurred while uploading the image');
    } finally {
      setUploadingImage(false);
    }
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(Array.from(e.target.files));
    }
  };
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Filtering images based on search
  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add a toast notification here
    alert('Image URL copied to clipboard!');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Manage Images</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 mr-2 ${
            selectedTab === 'upload'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
          }`}
          onClick={() => setSelectedTab('upload')}
        >
          Upload
        </button>
        <button
          className={`py-2 px-4 mr-2 ${
            selectedTab === 'library'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-medium'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
          }`}
          onClick={() => setSelectedTab('library')}
        >
          Image Library
        </button>
      </div>
      
      {selectedTab === 'upload' && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Upload Images
            </h3>
            
            {uploadError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{uploadError}</p>
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-700'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleFileDrop}
            >
              <div className="space-y-2">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {uploadingImage ? 'Uploading...' : 'Drag and drop images here, or'}
                </p>
                <div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileInput}
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {uploadingImage ? 'Uploading...' : 'Browse Files'}
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, WEBP, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedTab === 'library' && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Image Library
              </h3>
              
              {/* Search field */}
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Search images..."
                  className="w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {filteredImages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No images found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map((image) => (
                  <div key={image.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-900 aspect-w-16 aspect-h-9">
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate" title={image.name}>
                        {image.name}
                      </h4>
                      <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{image.timestamp}</span>
                        <span>{image.size}</span>
                      </div>
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          Copy URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
