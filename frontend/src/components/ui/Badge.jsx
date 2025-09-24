import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

// Función helper para obtener el variant según el estado
export const getBadgeVariant = (estado) => {
  const estadoLower = estado?.toLowerCase() || '';
  
  if (estadoLower.includes('activo') || estadoLower.includes('disponible')) {
    return 'success';
  }
  if (estadoLower.includes('inactivo') || estadoLower.includes('agotado')) {
    return 'danger';
  }
  if (estadoLower.includes('mantenimiento') || estadoLower.includes('bajo')) {
    return 'warning';
  }
  if (estadoLower.includes('pendiente')) {
    return 'info';
  }
  
  return 'default';
};

export default Badge;
