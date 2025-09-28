"use client";

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loadingText?: string;
}

export default function LoadingButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loadingText
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = disabled || loading || isLoading;
  const showLoading = loading || isLoading;

  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 glow-border",
    secondary: "bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-500 hover:to-purple-700 glow-border",
    accent: "bg-gradient-to-r from-emerald-600 to-emerald-800 text-white hover:from-emerald-500 hover:to-emerald-700 glow-border",
    outline: "border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white"
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner 
            type="dots" 
            size="sm" 
            color="primary"
          />
          <span>{loadingText || "Loading..."}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
