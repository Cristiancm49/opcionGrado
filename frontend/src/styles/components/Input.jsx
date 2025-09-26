import React, { forwardRef } from 'react';
import { cn } from '../utils';
import { textStyles, THEME_CONSTANTS } from '../theme';

const Input = forwardRef(({ 
  type = 'text',
  variant = 'default',
  size = 'md',
  label,
  helper,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';
  
  const variants = {
    default: 'bg-white text-gray-900 border-gray-300 focus:ring-primary-500 focus:border-primary-500',
    error: 'bg-white text-gray-900 border-error-500 focus:ring-error-500 focus:border-error-500',
    success: 'bg-white text-gray-900 border-success-500 focus:ring-success-500 focus:border-success-500',
    disabled: 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  
  const finalClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const inputElement = (
    <input
      ref={ref}
      type={type}
      className={finalClasses}
      disabled={variant === 'disabled'}
      {...props}
    />
  );

  if (icon) {
    const iconElement = (
      <div className="absolute inset-y-0 flex items-center pointer-events-none">
        {icon}
      </div>
    );

    return (
      <div className="space-y-1">
        {label && (
          <label className={textStyles.label}>
            {label}
          </label>
        )}
        <div className="relative">
          {iconPosition === 'left' && iconElement}
          <input
            ref={ref}
            type={type}
            className={cn(
              finalClasses,
              iconPosition === 'left' ? 'pl-10' : 'pr-10'
            )}
            disabled={variant === 'disabled'}
            {...props}
          />
          {iconPosition === 'right' && iconElement}
        </div>
        {helper && !error && (
          <p className={textStyles.helper}>
            {helper}
          </p>
        )}
        {error && (
          <p className={textStyles.error}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className={textStyles.label}>
          {label}
        </label>
      )}
      {inputElement}
      {helper && !error && (
        <p className={textStyles.helper}>
          {helper}
        </p>
      )}
      {error && (
        <p className={textStyles.error}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
