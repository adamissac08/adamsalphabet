"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ContentLoaderProps {
  children: React.ReactNode;
  loadingText?: string;
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'bounce' | 'skeleton';
  className?: string;
  delay?: number; // Delay before showing loader
}

export default function ContentLoader({ 
  children, 
  loadingText = "Loading content...",
  type = 'skeleton',
  className = '',
  delay = 0
}: ContentLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Show loader after delay
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    // Simulate content loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000 + delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, [delay]);

  if (isLoading && showLoader) {
    return (
      <div className={`relative ${className}`}>
        {type === 'skeleton' ? (
          <div className="animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-300/20 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
              <div className="h-32 bg-gray-300/20 rounded"></div>
              <div className="h-4 bg-gray-300/20 rounded w-5/6"></div>
            </div>
            <div className="mt-4 text-center">
              <LoadingSpinner 
                type="dots" 
                size="sm" 
                text={loadingText}
                color="accent"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner 
              type={type} 
              size="md" 
              text={loadingText}
              color="accent"
            />
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
