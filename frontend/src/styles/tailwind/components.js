// ===========================================
// CONFIGURACIÓN DE COMPONENTES - TAILWIND CSS
// ===========================================
// Este archivo define todos los estilos de componentes utilizados en la aplicación
// Basado en la auditoría realizada de todos los módulos

export const components = {
  // ===========================================
  // BOTONES
  // ===========================================
  // Estilos para botones de diferentes tipos y tamaños
  button: {
    // Estilos base para todos los botones
    base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Variantes de botones
    variants: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
      error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      info: 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      link: 'text-blue-600 hover:text-blue-800 underline focus:ring-blue-500'
    },
    
    // Tamaños de botones
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    },
    
    // Clases predefinidas
    classes: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500',
      success: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500',
      error: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500'
    }
  },

  // ===========================================
  // CARDS
  // ===========================================
  // Estilos para tarjetas de diferentes tipos
  card: {
    // Estilos base para todas las tarjetas
    base: 'bg-white rounded-lg border border-gray-200 transition-all duration-200',
    
    // Variantes de tarjetas
    variants: {
      default: 'bg-white border-gray-200',
      elevated: 'bg-white border-gray-200 shadow-lg',
      primary: 'bg-blue-50 border-blue-200',
      success: 'bg-green-50 border-green-200',
      warning: 'bg-yellow-50 border-yellow-200',
      error: 'bg-red-50 border-red-200',
      info: 'bg-sky-50 border-sky-200'
    },
    
    // Tamaños de padding
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8'
    },
    
    // Clases predefinidas
    classes: {
      default: 'bg-white rounded-lg border border-gray-200 p-6 shadow-sm',
      elevated: 'bg-white rounded-lg border border-gray-200 p-6 shadow-lg',
      primary: 'bg-blue-50 rounded-lg border border-blue-200 p-6',
      success: 'bg-green-50 rounded-lg border border-green-200 p-6',
      warning: 'bg-yellow-50 rounded-lg border border-yellow-200 p-6',
      error: 'bg-red-50 rounded-lg border border-red-200 p-6'
    }
  },

  // ===========================================
  // INPUTS
  // ===========================================
  // Estilos para campos de entrada
  input: {
    // Estilos base para todos los inputs
    base: 'w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white',
    
    // Variantes de inputs
    variants: {
      default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
      success: 'border-green-300 focus:ring-green-500 focus:border-green-500',
      warning: 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500',
      error: 'border-red-300 focus:ring-red-500 focus:border-red-500'
    },
    
    // Tamaños de padding
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    },
    
    // Clases predefinidas
    classes: {
      default: 'w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white',
      success: 'w-full px-4 py-2 text-sm border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white',
      error: 'w-full px-4 py-2 text-sm border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white'
    }
  },

  // ===========================================
  // BADGES
  // ===========================================
  // Estilos para etiquetas y badges
  badge: {
    // Estilos base para todos los badges
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    
    // Variantes de badges
    variants: {
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-sky-100 text-sky-800'
    },
    
    // Clases predefinidas
    classes: {
      primary: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
      secondary: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
      success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
      warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
      error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
      info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800'
    }
  },

  // ===========================================
  // MODALES
  // ===========================================
  // Estilos para modales
  modal: {
    // Overlay del modal
    overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    
    // Contenedor del modal
    container: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto',
    
    // Header del modal
    header: 'px-6 py-4 border-b border-gray-200',
    
    // Contenido del modal
    content: 'px-6 py-4',
    
    // Footer del modal
    footer: 'px-6 py-4 border-t border-gray-200 flex justify-end space-x-2',
    
    // Clases predefinidas
    classes: {
      overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      container: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto',
      header: 'px-6 py-4 border-b border-gray-200',
      content: 'px-6 py-4',
      footer: 'px-6 py-4 border-t border-gray-200 flex justify-end space-x-2'
    }
  },

  // ===========================================
  // TABLAS
  // ===========================================
  // Estilos para tablas
  table: {
    // Contenedor de la tabla
    container: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
    
    // Tabla
    table: 'min-w-full divide-y divide-gray-200',
    
    // Header de la tabla
    header: 'bg-gray-50',
    headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    
    // Cuerpo de la tabla
    body: 'bg-white divide-y divide-gray-200',
    bodyRow: 'hover:bg-gray-50',
    bodyCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
    
    // Clases predefinidas
    classes: {
      container: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
      table: 'min-w-full divide-y divide-gray-200',
      header: 'bg-gray-50',
      headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      body: 'bg-white divide-y divide-gray-200',
      bodyRow: 'hover:bg-gray-50',
      bodyCell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'
    }
  },

  // ===========================================
  // FILTROS
  // ===========================================
  // Estilos para componentes de filtros
  filters: {
    // Contenedor de filtros
    container: 'bg-white rounded-xl shadow-lg mb-6 border border-gray-200 overflow-hidden',
    
    // Header de filtros
    header: 'px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200',
    
    // Contenido de filtros
    content: 'p-6',
    
    // Grid de filtros
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
    
    // Clases predefinidas
    classes: {
      container: 'bg-white rounded-xl shadow-lg mb-6 border border-gray-200 overflow-hidden',
      header: 'px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200',
      content: 'p-6',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    }
  }
};

// ===========================================
// UTILIDADES DE COMPONENTES
// ===========================================
// Funciones de utilidad para componentes
export const componentUtils = {
  // Crear clase de botón
  createButtonClass: (variant, size, additionalClasses = '') => {
    const base = components.button.base;
    const variantClass = components.button.variants[variant] || components.button.variants.primary;
    const sizeClass = components.button.sizes[size] || components.button.sizes.md;
    return `${base} ${variantClass} ${sizeClass} ${additionalClasses}`.trim();
  },
  
  // Crear clase de card
  createCardClass: (variant, padding, additionalClasses = '') => {
    const base = components.card.base;
    const variantClass = components.card.variants[variant] || components.card.variants.default;
    const paddingClass = components.card.padding[padding] || components.card.padding.md;
    return `${base} ${variantClass} ${paddingClass} ${additionalClasses}`.trim();
  },
  
  // Crear clase de input
  createInputClass: (variant, size, additionalClasses = '') => {
    const base = components.input.base;
    const variantClass = components.input.variants[variant] || components.input.variants.default;
    const sizeClass = components.input.sizes[size] || components.input.sizes.md;
    return `${base} ${variantClass} ${sizeClass} ${additionalClasses}`.trim();
  },
  
  // Crear clase de badge
  createBadgeClass: (variant, additionalClasses = '') => {
    const base = components.badge.base;
    const variantClass = components.badge.variants[variant] || components.badge.variants.primary;
    return `${base} ${variantClass} ${additionalClasses}`.trim();
  }
};
