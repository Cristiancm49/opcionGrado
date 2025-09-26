// ===========================================
// SISTEMA DE TIPOGRAFÍA CENTRALIZADO
// ===========================================

export const typography = {
  // Tamaños de fuente
  fontSize: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl'   // 60px
  },

  // Pesos de fuente
  fontWeight: {
    thin: 'font-thin',       // 100
    extralight: 'font-extralight', // 200
    light: 'font-light',     // 300
    normal: 'font-normal',   // 400
    medium: 'font-medium',   // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',       // 700
    extrabold: 'font-extrabold', // 800
    black: 'font-black'      // 900
  },

  // Alturas de línea
  lineHeight: {
    none: 'leading-none',    // 1
    tight: 'leading-tight',  // 1.25
    snug: 'leading-snug',    // 1.375
    normal: 'leading-normal', // 1.5
    relaxed: 'leading-relaxed', // 1.625
    loose: 'leading-loose'   // 2
  },

  // Espaciado de letras
  letterSpacing: {
    tighter: 'tracking-tighter', // -0.05em
    tight: 'tracking-tight',     // -0.025em
    normal: 'tracking-normal',   // 0em
    wide: 'tracking-wide',       // 0.025em
    wider: 'tracking-wider',     // 0.05em
    widest: 'tracking-widest'    // 0.1em
  }
};

// ===========================================
// ESTILOS DE TEXTO PREDEFINIDOS
// ===========================================

export const textStyles = {
  // Títulos
  h1: 'text-4xl font-bold text-gray-900 leading-tight',
  h2: 'text-3xl font-semibold text-gray-900 leading-tight',
  h3: 'text-2xl font-semibold text-gray-900 leading-snug',
  h4: 'text-xl font-medium text-gray-900 leading-snug',
  h5: 'text-lg font-medium text-gray-900 leading-normal',
  h6: 'text-base font-medium text-gray-900 leading-normal',

  // Subtítulos
  subtitle1: 'text-lg font-normal text-gray-600 leading-relaxed',
  subtitle2: 'text-base font-normal text-gray-600 leading-normal',

  // Cuerpo de texto
  body1: 'text-base font-normal text-gray-900 leading-relaxed',
  body2: 'text-sm font-normal text-gray-700 leading-normal',

  // Texto pequeño
  caption: 'text-xs font-normal text-gray-500 leading-normal',
  overline: 'text-xs font-medium text-gray-500 uppercase tracking-wide',

  // Enlaces
  link: 'text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200',
  linkPrimary: 'text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200',

  // Estados de texto
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  muted: 'text-gray-500',
  disabled: 'text-gray-400'
};

// ===========================================
// FUNCIONES DE UTILIDAD
// ===========================================

export const getTextStyle = (styleName) => {
  return textStyles[styleName] || textStyles.body1;
};

export const combineTextStyles = (...styles) => {
  return styles.filter(Boolean).join(' ');
};

// ===========================================
// CLASES PARA COMPONENTES ESPECÍFICOS
// ===========================================

export const componentTextStyles = {
  // Botones
  button: {
    primary: 'text-sm font-medium text-white',
    secondary: 'text-sm font-medium text-gray-700',
    outline: 'text-sm font-medium text-blue-600',
    ghost: 'text-sm font-medium text-gray-600'
  },

  // Formularios
  label: 'text-sm font-medium text-gray-700 mb-1',
  input: 'text-sm text-gray-900 placeholder-gray-500',
  helper: 'text-xs text-gray-500 mt-1',
  error: 'text-xs text-red-600 mt-1',

  // Tablas
  tableHeader: 'text-xs font-medium text-gray-500 uppercase tracking-wider',
  tableCell: 'text-sm text-gray-900',
  tableCellSecondary: 'text-sm text-gray-500',

  // Cards
  cardTitle: 'text-lg font-semibold text-gray-900',
  cardSubtitle: 'text-sm text-gray-600',
  cardBody: 'text-sm text-gray-700',

  // Badges
  badge: 'text-xs font-medium',
  badgePrimary: 'text-xs font-medium text-blue-800',
  badgeSuccess: 'text-xs font-medium text-green-800',
  badgeWarning: 'text-xs font-medium text-yellow-800',
  badgeError: 'text-xs font-medium text-red-800',

  // Navegación
  navItem: 'text-sm font-medium text-gray-700 hover:text-gray-900',
  navItemActive: 'text-sm font-medium text-blue-600',
  breadcrumb: 'text-sm text-gray-500 hover:text-gray-700'
};
