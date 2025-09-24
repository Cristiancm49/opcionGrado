import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md',
  hover = false,
  gradient = false,
  border = true,
  rounded = 'lg',
  ...props 
}) => {
  const baseClasses = 'bg-white transition-all duration-200';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };

  const borderClasses = border ? 'border border-gray-200' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : '';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  const classes = `${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${roundedClasses[rounded]} ${borderClasses} ${gradientClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', divider = true, ...props }) => (
  <div className={`${divider ? 'border-b border-gray-200 pb-3 mb-4' : 'pb-2 mb-2'} ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', size = 'lg', ...props }) => {
  const sizes = {
    sm: 'text-sm font-medium',
    md: 'text-base font-medium',
    lg: 'text-lg font-semibold',
    xl: 'text-xl font-semibold',
    '2xl': 'text-2xl font-bold'
  };

  return (
    <h3 className={`${sizes[size]} text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', divider = true, ...props }) => (
  <div className={`${divider ? 'border-t border-gray-200 pt-3 mt-4' : 'pt-2 mt-2'} ${className}`} {...props}>
    {children}
  </div>
);

const CardImage = ({ src, alt, className = '', ...props }) => (
  <div className={`overflow-hidden ${className}`} {...props}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" 
    />
  </div>
);

const CardActions = ({ children, className = '', align = 'right', ...props }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`flex items-center space-x-2 ${alignClasses[align]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card especializada para estadísticas
const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'blue',
  trend,
  className = '',
  ...props 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    pink: 'bg-pink-500 text-white',
    indigo: 'bg-indigo-500 text-white',
    gray: 'bg-gray-500 text-white'
  };

  const iconBgClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  return (
    <Card className={`relative overflow-hidden ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">{trend.period}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconBgClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

// Card especializada para alertas
const AlertCard = ({ 
  type = 'info',
  title,
  children,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const iconClasses = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  };

  return (
    <Card className={`border-2 ${typeClasses[type]} ${className}`} {...props}>
      <div className="flex items-start space-x-3">
        {Icon && (
          <div className={`flex-shrink-0 ${iconClasses[type]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </Card>
  );
};

// Asignar subcomponentes
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Actions = CardActions;
Card.Stat = StatCard;
Card.Alert = AlertCard;

export default Card;