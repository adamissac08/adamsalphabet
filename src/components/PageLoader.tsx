"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'bounce' | 'skeleton';
}

export default function PageLoader({ 
  isLoading, 
  children, 
  loadingText = "Loading...",
  type = 'spinner'
}: PageLoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      // Add a small delay before hiding loader for smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showLoader) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner 
          type={type} 
          size="lg" 
          text={loadingText}
          color="primary"
        />
        <div className="mt-6">
          <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
