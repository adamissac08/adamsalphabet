"use client";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export default function Tooltip({ 
  children, 
  text, 
  position = 'top',
  className = '' 
}: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-black/90 border-t-4 border-x-4 border-x-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-black/90 border-b-4 border-x-4 border-x-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-black/90 border-l-4 border-y-4 border-y-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-black/90 border-r-4 border-y-4 border-y-transparent'
  };

  return (
    <div className={`tooltip relative inline-block ${className}`}>
      {children}
      <div className={`tooltiptext absolute z-50 invisible opacity-0 transition-opacity duration-300 ${positionClasses[position]}`}>
        {text}
        <div className={`absolute w-0 h-0 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
}
