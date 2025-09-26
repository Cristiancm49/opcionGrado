// ===========================================
// SISTEMA DE ESPACIADO CENTRALIZADO
// ===========================================

export const spacing = {
  // Espaciado base (Tailwind)
  px: 'px-0',     // 0px
  '0.5': 'px-0.5', // 2px
  '1': 'px-1',    // 4px
  '1.5': 'px-1.5', // 6px
  '2': 'px-2',    // 8px
  '2.5': 'px-2.5', // 10px
  '3': 'px-3',    // 12px
  '3.5': 'px-3.5', // 14px
  '4': 'px-4',    // 16px
  '5': 'px-5',    // 20px
  '6': 'px-6',    // 24px
  '7': 'px-7',    // 28px
  '8': 'px-8',    // 32px
  '9': 'px-9',    // 36px
  '10': 'px-10',  // 40px
  '11': 'px-11',  // 44px
  '12': 'px-12',  // 48px
  '14': 'px-14',  // 56px
  '16': 'px-16',  // 64px
  '20': 'px-20',  // 80px
  '24': 'px-24',  // 96px
  '28': 'px-28',  // 112px
  '32': 'px-32',  // 128px
  '36': 'px-36',  // 144px
  '40': 'px-40',  // 160px
  '44': 'px-44',  // 176px
  '48': 'px-48',  // 192px
  '52': 'px-52',  // 208px
  '56': 'px-56',  // 224px
  '60': 'px-60',  // 240px
  '64': 'px-64',  // 256px
  '72': 'px-72',  // 288px
  '80': 'px-80',  // 320px
  '96': 'px-96'   // 384px
};

// ===========================================
// ESPACIADO SEMÁNTICO
// ===========================================

export const semanticSpacing = {
  // Espaciado para componentes
  component: {
    xs: 'p-2',      // 8px
    sm: 'p-3',      // 12px
    md: 'p-4',      // 16px
    lg: 'p-6',      // 24px
    xl: 'p-8'       // 32px
  },

  // Espaciado para secciones
  section: {
    xs: 'py-4',     // 16px vertical
    sm: 'py-6',     // 24px vertical
    md: 'py-8',     // 32px vertical
    lg: 'py-12',    // 48px vertical
    xl: 'py-16'     // 64px vertical
  },

  // Espaciado para contenedores
  container: {
    xs: 'px-4',     // 16px horizontal
    sm: 'px-6',     // 24px horizontal
    md: 'px-8',     // 32px horizontal
    lg: 'px-12',    // 48px horizontal
    xl: 'px-16'     // 64px horizontal
  },

  // Espaciado para grids
  grid: {
    xs: 'gap-2',    // 8px
    sm: 'gap-3',    // 12px
    md: 'gap-4',    // 16px
    lg: 'gap-6',    // 24px
    xl: 'gap-8'     // 32px
  }
};

// ===========================================
// MARGENES Y PADDINGS PREDEFINIDOS
// ===========================================

export const layoutSpacing = {
  // Márgenes
  margin: {
    none: 'm-0',
    xs: 'm-2',      // 8px
    sm: 'm-4',      // 16px
    md: 'm-6',      // 24px
    lg: 'm-8',      // 32px
    xl: 'm-12'      // 48px
  },

  // Padding
  padding: {
    none: 'p-0',
    xs: 'p-2',      // 8px
    sm: 'p-4',      // 16px
    md: 'p-6',      // 24px
    lg: 'p-8',      // 32px
    xl: 'p-12'      // 48px
  },

  // Márgenes verticales
  marginY: {
    none: 'my-0',
    xs: 'my-2',     // 8px
    sm: 'my-4',     // 16px
    md: 'my-6',     // 24px
    lg: 'my-8',     // 32px
    xl: 'my-12'     // 48px
  },

  // Márgenes horizontales
  marginX: {
    none: 'mx-0',
    xs: 'mx-2',     // 8px
    sm: 'mx-4',     // 16px
    md: 'mx-6',     // 24px
    lg: 'mx-8',     // 32px
    xl: 'mx-12'     // 48px
  },

  // Padding vertical
  paddingY: {
    none: 'py-0',
    xs: 'py-2',     // 8px
    sm: 'py-4',     // 16px
    md: 'py-6',     // 24px
    lg: 'py-8',     // 32px
    xl: 'py-12'     // 48px
  },

  // Padding horizontal
  paddingX: {
    none: 'px-0',
    xs: 'px-2',     // 8px
    sm: 'px-4',     // 16px
    md: 'px-6',     // 24px
    lg: 'px-8',     // 32px
    xl: 'px-12'     // 48px
  }
};

// ===========================================
// FUNCIONES DE UTILIDAD
// ===========================================

export const getSpacing = (size, type = 'padding') => {
  const spacingMap = {
    padding: semanticSpacing.component,
    margin: layoutSpacing.margin,
    section: semanticSpacing.section,
    container: semanticSpacing.container,
    grid: semanticSpacing.grid
  };

  const spacingType = spacingMap[type];
  return spacingType?.[size] || spacingType?.md || 'p-4';
};

export const combineSpacing = (...spacings) => {
  return spacings.filter(Boolean).join(' ');
};

// ===========================================
// CLASES PARA COMPONENTES ESPECÍFICOS
// ===========================================

export const componentSpacing = {
  // Cards
  card: {
    padding: 'p-6',
    margin: 'mb-6',
    gap: 'gap-4'
  },

  // Botones
  button: {
    padding: 'px-4 py-2',
    margin: 'mx-1',
    gap: 'gap-2'
  },

  // Formularios
  form: {
    padding: 'p-6',
    margin: 'mb-4',
    gap: 'gap-4'
  },

  // Tablas
  table: {
    padding: 'px-6 py-4',
    margin: 'mb-6',
    gap: 'gap-4'
  },

  // Modales
  modal: {
    padding: 'p-6',
    margin: 'mx-4',
    gap: 'gap-4'
  },

  // Navegación
  nav: {
    padding: 'px-6 py-4',
    margin: 'mb-6',
    gap: 'gap-4'
  }
};
