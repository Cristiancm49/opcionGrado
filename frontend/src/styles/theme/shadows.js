// ===========================================
// SISTEMA DE SOMBRAS CENTRALIZADO
// ===========================================

export const shadows = {
  // Sombras base de Tailwind
  none: 'shadow-none',
  sm: 'shadow-sm',      // 0 1px 2px 0 rgb(0 0 0 / 0.05)
  base: 'shadow',       // 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
  md: 'shadow-md',      // 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
  lg: 'shadow-lg',      // 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
  xl: 'shadow-xl',      // 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
  '2xl': 'shadow-2xl',  // 0 25px 50px -12px rgb(0 0 0 / 0.25)
  inner: 'shadow-inner' // inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
};

// ===========================================
// SOMBRAS SEMÁNTICAS
// ===========================================

export const semanticShadows = {
  // Sombras para componentes
  component: {
    none: 'shadow-none',
    subtle: 'shadow-sm',
    default: 'shadow',
    elevated: 'shadow-md',
    prominent: 'shadow-lg',
    floating: 'shadow-xl'
  },

  // Sombras para estados
  state: {
    focus: 'shadow-md ring-2 ring-blue-500 ring-opacity-50',
    hover: 'shadow-lg',
    active: 'shadow-inner',
    disabled: 'shadow-none'
  },

  // Sombras para capas
  layer: {
    base: 'shadow-sm',
    overlay: 'shadow-lg',
    modal: 'shadow-2xl',
    dropdown: 'shadow-md',
    tooltip: 'shadow-lg'
  }
};

// ===========================================
// SOMBRAS CON COLORES
// ===========================================

export const coloredShadows = {
  primary: {
    sm: 'shadow-sm shadow-blue-500/20',
    md: 'shadow-md shadow-blue-500/25',
    lg: 'shadow-lg shadow-blue-500/30',
    xl: 'shadow-xl shadow-blue-500/35'
  },
  
  success: {
    sm: 'shadow-sm shadow-green-500/20',
    md: 'shadow-md shadow-green-500/25',
    lg: 'shadow-lg shadow-green-500/30',
    xl: 'shadow-xl shadow-green-500/35'
  },
  
  warning: {
    sm: 'shadow-sm shadow-yellow-500/20',
    md: 'shadow-md shadow-yellow-500/25',
    lg: 'shadow-lg shadow-yellow-500/30',
    xl: 'shadow-xl shadow-yellow-500/35'
  },
  
  error: {
    sm: 'shadow-sm shadow-red-500/20',
    md: 'shadow-md shadow-red-500/25',
    lg: 'shadow-lg shadow-red-500/30',
    xl: 'shadow-xl shadow-red-500/35'
  }
};

// ===========================================
// FUNCIONES DE UTILIDAD
// ===========================================

export const getShadow = (type, size = 'md') => {
  const shadowMap = {
    component: semanticShadows.component,
    state: semanticShadows.state,
    layer: semanticShadows.layer,
    colored: coloredShadows
  };

  const shadowType = shadowMap[type];
  return shadowType?.[size] || shadows.md;
};

export const combineShadows = (...shadowClasses) => {
  return shadowClasses.filter(Boolean).join(' ');
};

// ===========================================
// CLASES PARA COMPONENTES ESPECÍFICOS
// ===========================================

export const componentShadows = {
  // Cards
  card: {
    default: 'shadow-sm',
    hover: 'hover:shadow-md',
    elevated: 'shadow-md',
    floating: 'shadow-lg'
  },

  // Botones
  button: {
    default: 'shadow-sm',
    hover: 'hover:shadow-md',
    active: 'active:shadow-inner',
    focus: 'focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
  },

  // Formularios
  input: {
    default: 'shadow-sm',
    focus: 'focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    error: 'shadow-sm ring-2 ring-red-500 ring-opacity-50'
  },

  // Modales
  modal: {
    backdrop: 'shadow-2xl',
    content: 'shadow-xl'
  },

  // Dropdowns
  dropdown: {
    default: 'shadow-md',
    hover: 'hover:shadow-lg'
  },

  // Tooltips
  tooltip: {
    default: 'shadow-lg'
  },

  // Navegación
  nav: {
    default: 'shadow-sm',
    sticky: 'shadow-md'
  }
};
