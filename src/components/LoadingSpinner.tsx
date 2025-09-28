"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'bounce' | 'skeleton';
  text?: string;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export default function LoadingSpinner({ 
  size = 'md', 
  type = 'spinner',
  text,
  className = '',
  color = 'primary'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const borderSizes = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
    xl: 'border-6'
  };

  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-purple-500 border-t-transparent',
    accent: 'border-emerald-500 border-t-transparent'
  };

  if (type === 'dots') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {text && (
          <p className="text-gray-300 text-sm animate-pulse">{text}</p>
        )}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className={`loading-pulse ${sizeClasses[size]} ${colorClasses[color]}`}></div>
        {text && (
          <p className="text-gray-300 text-sm animate-pulse">{text}</p>
        )}
      </div>
    );
  }

  if (type === 'wave') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="loading-wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {text && (
          <p className="text-gray-300 text-sm animate-pulse">{text}</p>
        )}
      </div>
    );
  }

  if (type === 'bounce') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="loading-bounce">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {text && (
          <p className="text-gray-300 text-sm animate-pulse">{text}</p>
        )}
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300/20 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300/20 rounded w-5/6"></div>
        </div>
        {text && (
          <p className="text-gray-300 text-sm mt-2">{text}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div 
        className={`loading-spinner ${sizeClasses[size]} ${borderSizes[size]} ${colorClasses[color]}`}
      ></div>
      {text && (
        <p className="text-gray-300 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}
