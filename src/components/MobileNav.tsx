'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close the menu when pressing escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </button>
      
      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Mobile menu panel */}
      <div 
        className={`
          fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-lora text-xl font-bold text-blue-800 dark:text-blue-400">नiveśa</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="px-4 py-6 space-y-3">
          <Link 
            href="/"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/mutual-funds"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Investments
          </Link>
          <Link 
            href="/credit-cards"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Credit Cards
          </Link>
          <Link 
            href="/loyalty-programs"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Loyalty Programs
          </Link>
          <Link 
            href="/nri-corner"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            NRI Corner
          </Link>
          <Link 
            href="/blog"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/about"
            className="block py-3 px-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </nav>
        
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Legal
            </h3>
            <Link 
              href="/disclaimer"
              className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Disclaimer
            </Link>
            <Link 
              href="/privacy-policy"
              className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
