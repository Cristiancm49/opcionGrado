// ===========================================
// CONFIGURACIÓN DE TIPOGRAFÍA - TAILWIND CSS
// ===========================================
// Este archivo define todos los estilos tipográficos utilizados en la aplicación
// Basado en la auditoría realizada de todos los módulos

export const typography = {
  // ===========================================
  // TAMAÑOS DE FUENTE
  // ===========================================
  // Tamaños de fuente base de Tailwind
  fontSize: {
    xs: '0.75rem',      // 12px - Texto muy pequeño
    sm: '0.875rem',     // 14px - Texto pequeño
    base: '1rem',       // 16px - Texto base
    lg: '1.125rem',     // 18px - Texto grande
    xl: '1.25rem',      // 20px - Texto extra grande
    '2xl': '1.5rem',    // 24px - Títulos pequeños
    '3xl': '1.875rem',  // 30px - Títulos medianos
    '4xl': '2.25rem',   // 36px - Títulos grandes
    '5xl': '3rem',      // 48px - Títulos extra grandes
    '6xl': '3.75rem',   // 60px - Títulos muy grandes
    '7xl': '4.5rem',    // 72px - Títulos enormes
    '8xl': '6rem',      // 96px - Títulos gigantes
    '9xl': '8rem'       // 128px - Títulos masivos
  },

  // ===========================================
  // PESOS DE FUENTE
  // ===========================================
  // Pesos de fuente disponibles
  fontWeight: {
    thin: '100',        // Muy delgado
    extralight: '200',  // Extra delgado
    light: '300',       // Delgado
    normal: '400',      // Normal
    medium: '500',      // Mediano
    semibold: '600',    // Semi negrita
    bold: '700',        // Negrita
    extrabold: '800',   // Extra negrita
    black: '900'        // Muy negrita
  },

  // ===========================================
  // ALTURAS DE LÍNEA
  // ===========================================
  // Alturas de línea para diferentes tamaños de texto
  lineHeight: {
    none: '1',          // Sin altura de línea
    tight: '1.25',      // Apretado
    snug: '1.375',      // Cómodo
    normal: '1.5',      // Normal
    relaxed: '1.625',   // Relajado
    loose: '2'          // Suelto
  },

  // ===========================================
  // ESTILOS TIPOGRÁFICOS PREDEFINIDOS
  // ===========================================
  // Estilos predefinidos para diferentes elementos
  styles: {
    // Títulos principales
    h1: {
      fontSize: 'text-3xl',      // 30px
      fontWeight: 'font-bold',   // Negrita
      lineHeight: 'leading-tight', // Apretado
      margin: 'mb-2'             // Margin inferior
    },
    
    h2: {
      fontSize: 'text-2xl',      // 24px
      fontWeight: 'font-bold',   // Negrita
      lineHeight: 'leading-tight', // Apretado
      margin: 'mb-2'             // Margin inferior
    },
    
    h3: {
      fontSize: 'text-xl',       // 20px
      fontWeight: 'font-semibold', // Semi negrita
      lineHeight: 'leading-snug', // Cómodo
      margin: 'mb-2'             // Margin inferior
    },
    
    h4: {
      fontSize: 'text-lg',       // 18px
      fontWeight: 'font-semibold', // Semi negrita
      lineHeight: 'leading-snug', // Cómodo
      margin: 'mb-1'             // Margin inferior pequeño
    },
    
    h5: {
      fontSize: 'text-base',     // 16px
      fontWeight: 'font-medium', // Mediano
      lineHeight: 'leading-normal', // Normal
      margin: 'mb-1'             // Margin inferior pequeño
    },
    
    h6: {
      fontSize: 'text-sm',       // 14px
      fontWeight: 'font-medium', // Mediano
      lineHeight: 'leading-normal', // Normal
      margin: 'mb-1'             // Margin inferior pequeño
    },
    
    // Texto de párrafo
    paragraph: {
      fontSize: 'text-base',     // 16px
      fontWeight: 'font-normal', // Normal
      lineHeight: 'leading-relaxed', // Relajado
      margin: 'mb-4'             // Margin inferior
    },
    
    // Texto pequeño
    small: {
      fontSize: 'text-sm',       // 14px
      fontWeight: 'font-normal', // Normal
      lineHeight: 'leading-normal', // Normal
      margin: 'mb-2'             // Margin inferior pequeño
    },
    
    // Texto muy pequeño
    caption: {
      fontSize: 'text-xs',       // 12px
      fontWeight: 'font-normal', // Normal
      lineHeight: 'leading-normal', // Normal
      margin: 'mb-1'             // Margin inferior muy pequeño
    },
    
    // Texto de etiqueta
    label: {
      fontSize: 'text-sm',       // 14px
      fontWeight: 'font-medium', // Mediano
      lineHeight: 'leading-normal', // Normal
      margin: 'mb-1'             // Margin inferior pequeño
    }
  },

  // ===========================================
  // COLORES DE TEXTO
  // ===========================================
  // Colores específicos para texto
  textColors: {
    // Texto principal
    primary: 'text-gray-900',    // Texto principal oscuro
    secondary: 'text-gray-600',  // Texto secundario
    muted: 'text-gray-500',      // Texto atenuado
    disabled: 'text-gray-400',   // Texto deshabilitado
    
    // Texto de estado
    success: 'text-green-600',   // Texto de éxito
    warning: 'text-yellow-600',  // Texto de advertencia
    error: 'text-red-600',       // Texto de error
    info: 'text-blue-600',       // Texto de información
    
    // Texto especial
    link: 'text-blue-600',       // Texto de enlace
    linkHover: 'text-blue-800',  // Texto de enlace hover
    white: 'text-white',         // Texto blanco
    black: 'text-black'          // Texto negro
  },

  // ===========================================
  // CLASES TIPOGRÁFICAS PREDEFINIDAS
  // ===========================================
  // Clases predefinidas para diferentes elementos
  classes: {
    // Títulos
    title: {
      main: 'text-3xl font-bold text-gray-900 mb-2',
      section: 'text-2xl font-bold text-gray-900 mb-2',
      subsection: 'text-xl font-semibold text-gray-900 mb-2',
      card: 'text-lg font-semibold text-gray-900 mb-1'
    },
    
    // Texto de contenido
    content: {
      primary: 'text-base text-gray-900 leading-relaxed mb-4',
      secondary: 'text-sm text-gray-600 leading-normal mb-2',
      caption: 'text-xs text-gray-500 leading-normal mb-1',
      muted: 'text-sm text-gray-500 leading-normal'
    },
    
    // Texto de estado
    status: {
      success: 'text-sm font-medium text-green-600',
      warning: 'text-sm font-medium text-yellow-600',
      error: 'text-sm font-medium text-red-600',
      info: 'text-sm font-medium text-blue-600'
    },
    
    // Texto de etiqueta
    label: {
      primary: 'text-sm font-medium text-gray-700 mb-1',
      secondary: 'text-xs font-medium text-gray-600 mb-1',
      required: 'text-sm font-medium text-gray-700 mb-1 after:content-["*"] after:text-red-500 after:ml-1'
    },
    
    // Texto de enlace
    link: {
      primary: 'text-blue-600 hover:text-blue-800 font-medium',
      secondary: 'text-gray-600 hover:text-gray-800',
      muted: 'text-gray-500 hover:text-gray-700'
    }
  }
};

// ===========================================
// UTILIDADES TIPOGRÁFICAS
// ===========================================
// Funciones de utilidad para tipografía
export const typographyUtils = {
  // Crear clase tipográfica personalizada
  createClass: (size, weight, color, spacing) => {
    return `${size} ${weight} ${color} ${spacing}`;
  },
  
  // Obtener clase de título
  getTitleClass: (level) => {
    const levels = {
      1: 'text-3xl font-bold text-gray-900 mb-2',
      2: 'text-2xl font-bold text-gray-900 mb-2',
      3: 'text-xl font-semibold text-gray-900 mb-2',
      4: 'text-lg font-semibold text-gray-900 mb-1',
      5: 'text-base font-medium text-gray-900 mb-1',
      6: 'text-sm font-medium text-gray-900 mb-1'
    };
    return levels[level] || levels[1];
  },
  
  // Obtener clase de texto
  getTextClass: (type) => {
    const types = {
      primary: 'text-base text-gray-900 leading-relaxed mb-4',
      secondary: 'text-sm text-gray-600 leading-normal mb-2',
      caption: 'text-xs text-gray-500 leading-normal mb-1',
      muted: 'text-sm text-gray-500 leading-normal'
    };
    return types[type] || types.primary;
  },
  
  // Obtener clase de estado
  getStatusClass: (status) => {
    const statuses = {
      success: 'text-sm font-medium text-green-600',
      warning: 'text-sm font-medium text-yellow-600',
      error: 'text-sm font-medium text-red-600',
      info: 'text-sm font-medium text-blue-600'
    };
    return statuses[status] || statuses.info;
  }
};
