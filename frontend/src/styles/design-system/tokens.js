// ===========================================
// DESIGN TOKENS - SISTEMA DE DISEÑO
// ===========================================
// Tokens centralizados para todo el proyecto
// Basado en el análisis de uso real de la aplicación

// ===========================================
// COLORES
// ===========================================
export const colors = {
  // Colores primarios
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',   // Principal
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Estados
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',   // Principal
    600: '#16a34a',
    800: '#166534',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',   // Principal
    600: '#d97706',
    800: '#92400e',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',   // Principal
    600: '#dc2626',
    800: '#991b1b',
  },

  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',   // Principal
    600: '#0284c7',
    800: '#075985',
  },

  // Grises
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// ===========================================
// ESPACIADO
// ===========================================
export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// ===========================================
// TIPOGRAFÍA
// ===========================================
export const typography = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

// ===========================================
// EFECTOS
// ===========================================
export const effects = {
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },

  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  },

  transition: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
};

// ===========================================
// Z-INDEX
// ===========================================
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};

// ===========================================
// BREAKPOINTS
// ===========================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ===========================================
// EXPORTACIÓN
// ===========================================
export const tokens = {
  colors,
  spacing,
  typography,
  effects,
  zIndex,
  breakpoints,
};

export default tokens;

