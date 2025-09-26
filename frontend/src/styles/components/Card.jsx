import React from 'react';
import { createComponentClasses } from '../theme';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  padding = 'p-6',
  hover = false,
  ...props 
}) => {
  const baseClasses = createComponentClasses('card', variant);
  
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  const finalClasses = [
    baseClasses,
    padding,
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
};

// Subcomponentes de Card
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

// Asignar subcomponentes
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
