// ===========================================
// CONFIGURACIÓN PRINCIPAL DE ESTILOS - TAILWIND CSS
// ===========================================
// Este archivo es el punto de entrada principal para todos los estilos
// Exporta todas las configuraciones de colores, espaciado, tipografía y componentes

// ===========================================
// IMPORTACIONES
// ===========================================
// Importar todas las configuraciones de estilos
import { colors, gradients, componentColors } from './colors';
import { spacing, spacingClasses } from './spacing';
import { typography, typographyUtils } from './typography';
import { components, componentUtils } from './components';

// ===========================================
// CONFIGURACIÓN PRINCIPAL
// ===========================================
// Configuración principal que combina todos los estilos
export const tailwindConfig = {
  // Colores
  colors,
  gradients,
  componentColors,
  
  // Espaciado
  spacing,
  spacingClasses,
  
  // Tipografía
  typography,
  typographyUtils,
  
  // Componentes
  components,
  componentUtils
};

// ===========================================
// EXPORTACIONES INDIVIDUALES
// ===========================================
// Exportar cada módulo por separado para uso específico

// Colores
export { colors, gradients, componentColors } from './colors';

// Espaciado
export { spacing, spacingClasses } from './spacing';

// Tipografía
export { typography, typographyUtils } from './typography';

// Componentes
export { components, componentUtils } from './components';

// ===========================================
// UTILIDADES GLOBALES
// ===========================================
// Funciones de utilidad que combinan múltiples módulos

/**
 * Crear una clase CSS completa para un componente
 * @param {string} component - Tipo de componente (button, card, input, etc.)
 * @param {string} variant - Variante del componente
 * @param {string} size - Tamaño del componente
 * @param {string} additionalClasses - Clases adicionales
 * @returns {string} Clase CSS completa
 */
export const createComponentClass = (component, variant, size, additionalClasses = '') => {
  switch (component) {
    case 'button':
      return componentUtils.createButtonClass(variant, size, additionalClasses);
    case 'card':
      return componentUtils.createCardClass(variant, size, additionalClasses);
    case 'input':
      return componentUtils.createInputClass(variant, size, additionalClasses);
    case 'badge':
      return componentUtils.createBadgeClass(variant, additionalClasses);
    default:
      return additionalClasses;
  }
};

/**
 * Obtener colores de un gradiente
 * @param {string} gradientName - Nombre del gradiente
 * @returns {string} Clase CSS del gradiente
 */
export const getGradientClass = (gradientName) => {
  return `bg-gradient-to-r ${gradients[gradientName] || gradients.primary}`;
};

/**
 * Obtener clase de color de texto
 * @param {string} colorType - Tipo de color (primary, secondary, success, etc.)
 * @returns {string} Clase CSS del color de texto
 */
export const getTextColorClass = (colorType) => {
  const textColors = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600'
  };
  return textColors[colorType] || textColors.primary;
};

/**
 * Obtener clase de color de fondo
 * @param {string} colorType - Tipo de color (primary, secondary, success, etc.)
 * @param {string} shade - Tono del color (50, 100, 200, etc.)
 * @returns {string} Clase CSS del color de fondo
 */
export const getBackgroundColorClass = (colorType, shade = '500') => {
  const colorMap = {
    primary: 'blue',
    secondary: 'gray',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'sky'
  };
  const color = colorMap[colorType] || 'gray';
  return `bg-${color}-${shade}`;
};

/**
 * Combinar múltiples clases CSS
 * @param {...string} classes - Clases CSS a combinar
 * @returns {string} Clases CSS combinadas
 */
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// ===========================================
// CONSTANTES GLOBALES
// ===========================================
// Constantes útiles para toda la aplicación

export const STYLE_CONSTANTS = {
  // Breakpoints
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-index
  Z_INDEX: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  },
  
  // Transiciones
  TRANSITIONS: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300'
  },
  
  // Sombras
  SHADOWS: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  },
  
  // Bordes
  BORDERS: {
    none: 'border-0',
    sm: 'border',
    md: 'border-2',
    lg: 'border-4'
  },
  
  // Radios
  RADIUS: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  }
};

// ===========================================
// EXPORTACIÓN POR DEFECTO
// ===========================================
// Exportar la configuración principal por defecto
export default tailwindConfig;
