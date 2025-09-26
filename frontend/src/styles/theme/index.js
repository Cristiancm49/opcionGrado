// ===========================================
// SISTEMA DE TEMA CENTRALIZADO
// ===========================================

// Exportar todos los módulos del tema
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';

// ===========================================
// CONFIGURACIÓN DEL TEMA
// ===========================================

export const theme = {
  // Configuración general
  name: 'Chaira Theme',
  version: '1.0.0',
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Configuración de componentes
  components: {
    // Botones
    button: {
      base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg'
      },
      variants: {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
        secondary: 'bg-slate-500 hover:bg-slate-600 text-white focus:ring-slate-500',
        success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
        error: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
        outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500',
        ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
      }
    },

    // Cards
    card: {
      base: 'bg-white rounded-lg border border-gray-200 overflow-hidden',
      variants: {
        default: 'shadow-sm',
        elevated: 'shadow-md',
        floating: 'shadow-lg'
      }
    },

    // Inputs
    input: {
      base: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
      variants: {
        default: 'bg-white text-gray-900 placeholder-gray-500',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-500 focus:ring-green-500 focus:border-green-500'
      }
    },

    // Badges
    badge: {
      base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants: {
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-slate-100 text-slate-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-sky-100 text-sky-800'
      }
    }
  }
};

// ===========================================
// FUNCIONES DE UTILIDAD GLOBALES
// ===========================================

export const createComponentClasses = (component, variant, size) => {
  const componentConfig = theme.components[component];
  if (!componentConfig) return '';

  const baseClasses = componentConfig.base || '';
  const variantClasses = componentConfig.variants?.[variant] || '';
  const sizeClasses = componentConfig.sizes?.[size] || '';

  return [baseClasses, variantClasses, sizeClasses].filter(Boolean).join(' ');
};

export const getThemeValue = (path) => {
  const keys = path.split('.');
  let value = theme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  
  return value;
};

// ===========================================
// HOOKS PARA REACT
// ===========================================

export const useTheme = () => {
  return {
    theme,
    createComponentClasses,
    getThemeValue
  };
};

// ===========================================
// CONSTANTES DE TEMA
// ===========================================

export const THEME_CONSTANTS = {
  // Colores principales
  PRIMARY_COLOR: 'blue-500',
  SECONDARY_COLOR: 'slate-500',
  SUCCESS_COLOR: 'green-500',
  WARNING_COLOR: 'yellow-500',
  ERROR_COLOR: 'red-500',
  INFO_COLOR: 'sky-500',

  // Espaciado
  CONTAINER_PADDING: 'px-4 sm:px-6 lg:px-8',
  SECTION_PADDING: 'py-8 lg:py-12',
  COMPONENT_PADDING: 'p-6',

  // Sombras
  CARD_SHADOW: 'shadow-sm',
  BUTTON_SHADOW: 'shadow-sm hover:shadow-md',
  MODAL_SHADOW: 'shadow-2xl',

  // Bordes
  BORDER_RADIUS: 'rounded-lg',
  BORDER_COLOR: 'border-gray-200',

  // Transiciones
  TRANSITION: 'transition-all duration-200',
  TRANSITION_FAST: 'transition-all duration-150',
  TRANSITION_SLOW: 'transition-all duration-300'
};
