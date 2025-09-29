// ===========================================
// CONFIGURACIÓN DE ESPACIADO - TAILWIND CSS
// ===========================================
// Este archivo define todos los espaciados utilizados en la aplicación
// Basado en la auditoría realizada de todos los módulos

export const spacing = {
  // ===========================================
  // ESPACIADO BASE
  // ===========================================
  // Espaciado base de Tailwind (0.25rem = 4px)
  base: {
    0: '0',           // 0px
    1: '0.25rem',     // 4px
    2: '0.5rem',      // 8px
    3: '0.75rem',     // 12px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem'       // 384px
  },

  // ===========================================
  // ESPACIADO PERSONALIZADO
  // ===========================================
  // Espaciados específicos para la aplicación
  custom: {
    '18': '4.5rem',   // 72px - Para elementos grandes
    '88': '22rem',    // 352px - Para contenedores grandes
    '128': '32rem'    // 512px - Para contenedores muy grandes
  },

  // ===========================================
  // PADDING ESPECÍFICO
  // ===========================================
  // Padding específico para diferentes componentes
  padding: {
    // Padding para cards
    card: {
      sm: 'p-3',      // 12px - Cards pequeñas
      md: 'p-4',      // 16px - Cards medianas
      lg: 'p-6',      // 24px - Cards grandes
      xl: 'p-8'       // 32px - Cards extra grandes
    },
    
    // Padding para botones
    button: {
      sm: 'px-3 py-1.5',    // 12px horizontal, 6px vertical
      md: 'px-4 py-2',      // 16px horizontal, 8px vertical
      lg: 'px-6 py-3',      // 24px horizontal, 12px vertical
      xl: 'px-8 py-4'       // 32px horizontal, 16px vertical
    },
    
    // Padding para inputs
    input: {
      sm: 'px-3 py-2',      // 12px horizontal, 8px vertical
      md: 'px-4 py-2',      // 16px horizontal, 8px vertical
      lg: 'px-4 py-3'       // 16px horizontal, 12px vertical
    },
    
    // Padding para contenedores
    container: {
      sm: 'p-4',            // 16px - Contenedores pequeños
      md: 'p-6',            // 24px - Contenedores medianos
      lg: 'p-8',            // 32px - Contenedores grandes
      xl: 'p-12'            // 48px - Contenedores extra grandes
    }
  },

  // ===========================================
  // MARGIN ESPECÍFICO
  // ===========================================
  // Margin específico para diferentes elementos
  margin: {
    // Margin para secciones
    section: {
      sm: 'mb-4',           // 16px - Secciones pequeñas
      md: 'mb-6',           // 24px - Secciones medianas
      lg: 'mb-8',           // 32px - Secciones grandes
      xl: 'mb-12'           // 48px - Secciones extra grandes
    },
    
    // Margin para elementos
    element: {
      sm: 'mb-2',           // 8px - Elementos pequeños
      md: 'mb-4',           // 16px - Elementos medianos
      lg: 'mb-6'            // 24px - Elementos grandes
    },
    
    // Margin para grids
    grid: {
      sm: 'gap-2',          // 8px - Grids pequeños
      md: 'gap-4',          // 16px - Grids medianos
      lg: 'gap-6',          // 24px - Grids grandes
      xl: 'gap-8'           // 32px - Grids extra grandes
    }
  },

  // ===========================================
  // ESPACIADO RESPONSIVO
  // ===========================================
  // Espaciado que cambia según el tamaño de pantalla
  responsive: {
    // Padding responsivo
    padding: {
      mobile: 'p-4',        // 16px en móvil
      tablet: 'md:p-6',     // 24px en tablet
      desktop: 'lg:p-8'     // 32px en desktop
    },
    
    // Margin responsivo
    margin: {
      mobile: 'mb-4',       // 16px en móvil
      tablet: 'md:mb-6',    // 24px en tablet
      desktop: 'lg:mb-8'    // 32px en desktop
    },
    
    // Gap responsivo
    gap: {
      mobile: 'gap-2',      // 8px en móvil
      tablet: 'md:gap-4',   // 16px en tablet
      desktop: 'lg:gap-6'   // 24px en desktop
    }
  }
};

// ===========================================
// CLASES DE ESPACIADO PREDEFINIDAS
// ===========================================
// Clases predefinidas para componentes comunes
export const spacingClasses = {
  // Contenedores
  container: {
    sm: 'p-4',              // Padding pequeño
    md: 'p-6',              // Padding mediano
    lg: 'p-8',              // Padding grande
    xl: 'p-12'              // Padding extra grande
  },
  
  // Cards
  card: {
    sm: 'p-3',              // Padding pequeño
    md: 'p-4',              // Padding mediano
    lg: 'p-6',              // Padding grande
    xl: 'p-8'               // Padding extra grande
  },
  
  // Botones
  button: {
    sm: 'px-3 py-1.5',      // Padding pequeño
    md: 'px-4 py-2',        // Padding mediano
    lg: 'px-6 py-3',        // Padding grande
    xl: 'px-8 py-4'         // Padding extra grande
  },
  
  // Inputs
  input: {
    sm: 'px-3 py-2',        // Padding pequeño
    md: 'px-4 py-2',        // Padding mediano
    lg: 'px-4 py-3'         // Padding grande
  },
  
  // Secciones
  section: {
    sm: 'mb-4',             // Margin pequeño
    md: 'mb-6',             // Margin mediano
    lg: 'mb-8',             // Margin grande
    xl: 'mb-12'             // Margin extra grande
  },
  
  // Grids
  grid: {
    sm: 'gap-2',            // Gap pequeño
    md: 'gap-4',            // Gap mediano
    lg: 'gap-6',            // Gap grande
    xl: 'gap-8'             // Gap extra grande
  }
};
