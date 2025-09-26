// ===========================================
// SISTEMA DE COLORES CENTRALIZADO
// ===========================================

export const colors = {
  // Colores primarios
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Color principal
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },

  // Colores secundarios
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // Colores de estado
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },

  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },

  // Colores neutros
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
    950: '#030712'
  },

  // Colores específicos para estados de casos
  case: {
    assigned: '#3b82f6',    // Azul
    inProgress: '#f59e0b',  // Amarillo
    pending: '#ef4444',     // Rojo
    resolved: '#22c55e',    // Verde
    closed: '#6b7280'       // Gris
  },

  // Colores para prioridades
  priority: {
    critical: '#dc2626',    // Rojo
    high: '#ea580c',        // Naranja
    medium: '#d97706',      // Amarillo
    low: '#16a34a'          // Verde
  },

  // Colores para SLA
  sla: {
    onTime: '#22c55e',      // Verde
    atRisk: '#f59e0b',      // Amarillo
    overdue: '#dc2626'      // Rojo
  }
};

// ===========================================
// FUNCIONES DE UTILIDAD PARA COLORES
// ===========================================

export const getColor = (colorPath, shade = 500) => {
  const keys = colorPath.split('.');
  let color = colors;
  
  for (const key of keys) {
    color = color[key];
    if (!color) return null;
  }
  
  return color[shade] || color;
};

export const getColorClasses = (colorPath, shade = 500, type = 'bg') => {
  const color = getColor(colorPath, shade);
  if (!color) return '';
  
  // Convertir hex a clases de Tailwind
  const colorMap = {
    [colors.primary[500]]: 'blue-500',
    [colors.primary[600]]: 'blue-600',
    [colors.primary[700]]: 'blue-700',
    [colors.secondary[500]]: 'slate-500',
    [colors.success[500]]: 'green-500',
    [colors.warning[500]]: 'yellow-500',
    [colors.error[500]]: 'red-500',
    [colors.info[500]]: 'sky-500',
    [colors.gray[500]]: 'gray-500',
    [colors.gray[600]]: 'gray-600',
    [colors.gray[700]]: 'gray-700',
    [colors.gray[800]]: 'gray-800',
    [colors.gray[900]]: 'gray-900'
  };
  
  const tailwindColor = colorMap[color] || 'gray-500';
  return `${type}-${tailwindColor}`;
};

// ===========================================
// GRADIENTES PREDEFINIDOS
// ===========================================

export const gradients = {
  primary: 'from-blue-500 to-blue-600',
  secondary: 'from-slate-500 to-slate-600',
  success: 'from-green-500 to-green-600',
  warning: 'from-yellow-500 to-yellow-600',
  error: 'from-red-500 to-red-600',
  info: 'from-sky-500 to-sky-600',
  neutral: 'from-gray-500 to-gray-600'
};

// ===========================================
// CLASES DE COLORES PARA COMPONENTES
// ===========================================

export const componentColors = {
  button: {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-slate-500 hover:bg-slate-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    error: 'bg-red-500 hover:bg-red-600 text-white',
    info: 'bg-sky-500 hover:bg-sky-600 text-white'
  },
  
  badge: {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-slate-100 text-slate-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-sky-100 text-sky-800'
  },
  
  card: {
    default: 'bg-white border-gray-200',
    elevated: 'bg-white border-gray-200 shadow-lg',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  }
};
