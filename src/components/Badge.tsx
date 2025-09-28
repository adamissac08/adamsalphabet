"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'popular' | 'featured' | 'custom';
  className?: string;
  onClick?: () => void;
}

export default function Badge({ 
  children, 
  variant = 'custom',
  className = '',
  onClick 
}: BadgeProps) {
  const baseClasses = 'badge inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200';
  
  const variantClasses = {
    new: 'badge-new bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl',
    popular: 'badge-popular bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl',
    featured: 'badge-featured bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl',
    custom: 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
  };

  const clickableClasses = onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : '';

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
