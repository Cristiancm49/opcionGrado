// ===========================================
// UTILIDADES DEL SISTEMA DE DISEÑO
// ===========================================
// Funciones helper para trabajar con el sistema de diseño

import { colors } from './tokens';

// ===========================================
// COMBINAR CLASES
// ===========================================
/**
 * Combina múltiples clases CSS, filtrando valores falsy
 * @param {...string} classes - Clases a combinar
 * @returns {string} Clases combinadas
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Alias para compatibilidad
export const combineClasses = cn;

// ===========================================
// COLORES DE TEXTO
// ===========================================
/**
 * Obtiene la clase de color de texto según el tipo
 * @param {string} type - Tipo de color (primary, success, error, etc.)
 * @returns {string} Clase de Tailwind
 */
export const getTextColor = (type = 'primary') => {
  const textColors = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  };
  return textColors[type] || textColors.primary;
};

// Alias para compatibilidad
export const getTextColorClass = getTextColor;

// ===========================================
// COLORES DE FONDO
// ===========================================
/**
 * Obtiene la clase de color de fondo según el tipo
 * @param {string} type - Tipo de color
 * @param {string} shade - Tono del color (50-900)
 * @returns {string} Clase de Tailwind
 */
export const getBgColor = (type = 'primary', shade = '500') => {
  const colorMap = {
    primary: 'blue',
    secondary: 'gray',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'sky',
  };
  const color = colorMap[type] || 'gray';
  return `bg-${color}-${shade}`;
};

// Alias para compatibilidad
export const getBackgroundColorClass = getBgColor;

// ===========================================
// VARIANTES DE BADGE
// ===========================================
/**
 * Obtiene las clases para un badge según su variante
 * @param {string} variant - Variante del badge
 * @returns {string} Clases de Tailwind
 */
export const getBadgeVariant = (variant = 'primary') => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-sky-100 text-sky-800 border-sky-200',
  };
  return variants[variant] || variants.primary;
};

// ===========================================
// VARIANTES DE BOTÓN
// ===========================================
/**
 * Obtiene las clases para un botón según su variante
 * @param {string} variant - Variante del botón
 * @param {string} size - Tamaño del botón
 * @returns {string} Clases de Tailwind
 */
export const getButtonVariant = (variant = 'primary', size = 'md') => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return cn(base, variants[variant], sizes[size]);
};

// ===========================================
// VARIANTES DE CARD
// ===========================================
/**
 * Obtiene las clases para una card según su variante
 * @param {string} variant - Variante de la card
 * @param {string} padding - Padding de la card
 * @returns {string} Clases de Tailwind
 */
export const getCardVariant = (variant = 'default', padding = 'md') => {
  const variants = {
    default: 'bg-white border-gray-200 shadow-sm',
    elevated: 'bg-white border-gray-200 shadow-lg',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const base = 'rounded-lg border transition-all duration-200';

  return cn(base, variants[variant], paddings[padding]);
};

// ===========================================
// CREAR CLASE DE COMPONENTE (Legacy)
// ===========================================
/**
 * Función legacy para compatibilidad con código existente
 * @param {string} component - Tipo de componente
 * @param {string} variant - Variante
 * @param {string} size - Tamaño
 * @param {string} additional - Clases adicionales
 * @returns {string} Clases de Tailwind
 */
export const createComponentClass = (component, variant, size, additional = '') => {
  switch (component) {
    case 'button':
      return cn(getButtonVariant(variant, size), additional);
    case 'card':
      return cn(getCardVariant(variant, size), additional);
    case 'badge':
      return cn(getBadgeVariant(variant), additional);
    case 'table':
      return cn('min-w-full divide-y divide-gray-200', additional);
    default:
      return additional;
  }
};

// ===========================================
// GRADIENTES
// ===========================================
/**
 * Obtiene la clase de gradiente según el tipo
 * @param {string} type - Tipo de gradiente
 * @returns {string} Clase de Tailwind
 */
export const getGradient = (type = 'primary') => {
  const gradients = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-sky-500 to-sky-600',
  };
  return gradients[type] || gradients.primary;
};

// Alias para compatibilidad
export const getGradientClass = getGradient;

// ===========================================
// CONSTANTES (Legacy)
// ===========================================
export const STYLE_CONSTANTS = {
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  Z_INDEX: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  TRANSITIONS: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
  SHADOWS: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  BORDERS: {
    none: 'border-0',
    sm: 'border',
    md: 'border-2',
    lg: 'border-4',
  },
  RADIUS: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  },
};

// ===========================================
// EXPORTACIONES
// ===========================================
export default {
  cn,
  combineClasses,
  getTextColor,
  getTextColorClass,
  getBgColor,
  getBackgroundColorClass,
  getBadgeVariant,
  getButtonVariant,
  getCardVariant,
  createComponentClass,
  getGradient,
  getGradientClass,
  STYLE_CONSTANTS,
};

