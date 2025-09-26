import React from 'react';
import { createComponentClasses } from '../theme';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  icon,
  removable = false,
  onRemove,
  ...props 
}) => {
  const baseClasses = createComponentClasses('badge', variant);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };
  
  const finalClasses = [
    baseClasses,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.(e);
  };

  return (
    <span className={finalClasses} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-150"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
