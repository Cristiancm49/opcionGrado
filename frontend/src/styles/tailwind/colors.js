// ===========================================
// CONFIGURACIÓN DE COLORES - TAILWIND CSS
// ===========================================
// Este archivo define todos los colores utilizados en la aplicación
// Basado en la auditoría realizada de todos los módulos

export const colors = {
  // ===========================================
  // COLORES PRIMARIOS
  // ===========================================
  // Colores principales de la marca y elementos destacados
  primary: {
    50: '#eff6ff',    // Fondo muy claro para elementos primarios
    100: '#dbeafe',   // Fondo claro para elementos primarios
    200: '#bfdbfe',   // Bordes claros primarios
    300: '#93c5fd',   // Estados hover claros
    400: '#60a5fa',   // Estados activos
    500: '#3b82f6',   // Color principal (más usado)
    600: '#2563eb',   // Estados hover principales
    700: '#1d4ed8',   // Estados activos principales
    800: '#1e40af',   // Texto sobre fondos claros
    900: '#1e3a8a',   // Texto principal
    950: '#172554'    // Texto sobre fondos muy claros
  },

  // ===========================================
  // COLORES SECUNDARIOS
  // ===========================================
  // Colores de apoyo y elementos secundarios
  secondary: {
    50: '#f8fafc',    // Fondos muy claros
    100: '#f1f5f9',   // Fondos claros
    200: '#e2e8f0',   // Bordes claros
    300: '#cbd5e1',   // Separadores
    400: '#94a3b8',   // Texto secundario
    500: '#64748b',   // Texto secundario principal
    600: '#475569',   // Texto secundario oscuro
    700: '#334155',   // Texto principal
    800: '#1e293b',   // Texto principal oscuro
    900: '#0f172a',   // Texto principal muy oscuro
    950: '#020617'    // Texto sobre fondos claros
  },

  // ===========================================
  // COLORES DE ESTADO
  // ===========================================
  // Colores para estados específicos (éxito, error, advertencia, info)

  // Verde - Éxito, completado, resuelto
  success: {
    50: '#f0fdf4',    // Fondo muy claro para éxito
    100: '#dcfce7',   // Fondo claro para éxito
    200: '#bbf7d0',   // Bordes claros de éxito
    300: '#86efac',   // Estados hover claros
    400: '#4ade80',   // Estados activos
    500: '#22c55e',   // Color principal de éxito
    600: '#16a34a',   // Estados hover principales
    700: '#15803d',   // Estados activos principales
    800: '#166534',   // Texto sobre fondos claros
    900: '#14532d',   // Texto principal
    950: '#052e16'    // Texto sobre fondos muy claros
  },

  // Amarillo/Naranja - Advertencia, en proceso, pendiente
  warning: {
    50: '#fffbeb',    // Fondo muy claro para advertencia
    100: '#fef3c7',   // Fondo claro para advertencia
    200: '#fde68a',   // Bordes claros de advertencia
    300: '#fcd34d',   // Estados hover claros
    400: '#fbbf24',   // Estados activos
    500: '#f59e0b',   // Color principal de advertencia
    600: '#d97706',   // Estados hover principales
    700: '#b45309',   // Estados activos principales
    800: '#92400e',   // Texto sobre fondos claros
    900: '#78350f',   // Texto principal
    950: '#451a03'    // Texto sobre fondos muy claros
  },

  // Rojo - Error, crítico, vencido
  error: {
    50: '#fef2f2',    // Fondo muy claro para error
    100: '#fee2e2',   // Fondo claro para error
    200: '#fecaca',   // Bordes claros de error
    300: '#fca5a5',   // Estados hover claros
    400: '#f87171',   // Estados activos
    500: '#ef4444',   // Color principal de error
    600: '#dc2626',   // Estados hover principales
    700: '#b91c1c',   // Estados activos principales
    800: '#991b1b',   // Texto sobre fondos claros
    900: '#7f1d1d',   // Texto principal
    950: '#450a0a'    // Texto sobre fondos muy claros
  },

  // Azul cielo - Información, en tiempo
  info: {
    50: '#f0f9ff',    // Fondo muy claro para info
    100: '#e0f2fe',   // Fondo claro para info
    200: '#bae6fd',   // Bordes claros de info
    300: '#7dd3fc',   // Estados hover claros
    400: '#38bdf8',   // Estados activos
    500: '#0ea5e9',   // Color principal de info
    600: '#0284c7',   // Estados hover principales
    700: '#0369a1',   // Estados activos principales
    800: '#075985',   // Texto sobre fondos claros
    900: '#0c4a6e',   // Texto principal
    950: '#082f49'    // Texto sobre fondos muy claros
  },

  // ===========================================
  // COLORES NEUTROS
  // ===========================================
  // Grises para elementos neutros y fondos
  gray: {
    50: '#f9fafb',    // Fondo muy claro
    100: '#f3f4f6',   // Fondo claro
    200: '#e5e7eb',   // Bordes claros
    300: '#d1d5db',   // Separadores
    400: '#9ca3af',   // Texto secundario
    500: '#6b7280',   // Texto secundario principal
    600: '#4b5563',   // Texto secundario oscuro
    700: '#374151',   // Texto principal
    800: '#1f2937',   // Texto principal oscuro
    900: '#111827',   // Texto principal muy oscuro
    950: '#030712'    // Texto sobre fondos claros
  },

  // ===========================================
  // COLORES ESPECÍFICOS DE LA APLICACIÓN
  // ===========================================
  // Colores específicos para estados de casos, incidencias, etc.

  // Estados de casos
  case: {
    assigned: '#3b82f6',    // Azul - Asignado
    inProgress: '#f59e0b',  // Amarillo - En proceso
    pending: '#ef4444',     // Rojo - Pendiente
    resolved: '#22c55e',    // Verde - Resuelto
    closed: '#6b7280'       // Gris - Cerrado
  },

  // Prioridades
  priority: {
    critical: '#dc2626',    // Rojo - Crítica
    high: '#ea580c',        // Naranja - Alta
    medium: '#d97706',      // Amarillo - Media
    low: '#16a34a'          // Verde - Baja
  },

  // Estados de SLA
  sla: {
    onTime: '#22c55e',      // Verde - En tiempo
    atRisk: '#f59e0b',      // Amarillo - En riesgo
    overdue: '#dc2626'      // Rojo - Vencido
  },

  // ===========================================
  // COLORES ESPECIALES
  // ===========================================
  // Colores para elementos especiales

  // Púrpura - Para elementos destacados
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  },

  // Esmeralda - Para elementos de éxito
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  }
};

// ===========================================
// GRADIENTES PREDEFINIDOS
// ===========================================
// Gradientes comunes utilizados en la aplicación
export const gradients = {
  // Gradientes principales
  primary: 'from-blue-500 to-blue-600',
  primaryHover: 'from-blue-600 to-blue-700',
  
  // Gradientes de estado
  success: 'from-green-500 to-green-600',
  warning: 'from-yellow-500 to-yellow-600',
  error: 'from-red-500 to-red-600',
  info: 'from-sky-500 to-sky-600',
  
  // Gradientes especiales
  purple: 'from-purple-500 to-purple-600',
  emerald: 'from-emerald-500 to-emerald-600',
  
  // Gradientes neutros
  gray: 'from-gray-50 to-gray-100',
  grayDark: 'from-gray-100 to-gray-200',
  
  // Gradientes mixtos
  purpleBlue: 'from-purple-500 to-blue-600',
  bluePurple: 'from-blue-500 to-purple-600'
};

// ===========================================
// CLASES DE COLORES PARA COMPONENTES
// ===========================================
// Clases predefinidas para componentes comunes
export const componentColors = {
  // Botones
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-sky-600 hover:bg-sky-700 text-white',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  },
  
  // Badges
  badge: {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-sky-100 text-sky-800'
  },
  
  // Cards
  card: {
    default: 'bg-white border-gray-200',
    elevated: 'bg-white border-gray-200 shadow-lg',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  }
};
