import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // UI State
  sidebarOpen: true,
  expandedMenuItems: {},

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  toggleMenuItem: (index) => set((state) => ({
    expandedMenuItems: {
      ...state.expandedMenuItems,
      [index]: !state.expandedMenuItems[index]
    }
  })),

  // Sistema de clases simplificado (solo modo claro)
  getThemeClasses: () => {
    return {
      // === CLASES ORIGINALES (sin tocar) ===
      mainBg: 'bg-gradient-to-br from-gray-50 to-blue-50',
      sidebarBg: 'bg-white shadow-2xl border-r border-gray-200',
      headerBg: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
      topBarBg: 'bg-white border-b border-gray-100',
      primaryText: 'text-gray-800',
      secondaryText: 'text-gray-600',
      menuText: 'text-gray-700',
      subMenuText: 'text-gray-600',
      menuHover: 'hover:bg-gray-50',
      subMenuHover: 'hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300',
      collapseButton: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
      border: 'border-gray-100',
      logoCircle: 'bg-blue-500',
      contentCircle: 'bg-gradient-to-br from-blue-100 to-blue-200',
      chevronExpanded: 'bg-blue-100 text-blue-600',
      chevronCollapsed: 'bg-gray-100 text-gray-400',
      bullet: 'bg-gray-300',
      headerSubtitle: 'text-blue-100',

      // === CLASES MÓDULO CASOS (copiadas exactamente) ===
      // Contenedores principales
      mainContainer: 'max-w-full mx-auto',
      headerSection: 'mb-6',
      cardBg: 'bg-white',
      
      // Modales (clases exactas que se repiten)
      modalOverlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
      modalContainer: 'rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto',
      modalContainerLarge: 'rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto',
      modalContainerMedium: 'rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto',
      modalContent: 'p-6',
      modalHeader: 'flex justify-between items-center mb-6',
      modalTitle: 'text-2xl font-bold',
      modalCloseButton: 'text-gray-400 hover:text-gray-600 text-2xl',
      
      // Formularios y labels
      formLabel: 'block text-sm font-medium',
      formLabelWithMargin: 'block text-sm font-medium mb-2',
      formInput: 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300',
      formTextarea: 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300',
      
      // Contenedores con borde
      borderContainer: 'border rounded-lg p-4',
      borderContainerYellow: 'border rounded-lg p-4 bg-yellow-50',
      
      // Tablas
      tableCell: 'px-6 py-4 whitespace-nowrap',
      tableCellRegular: 'px-6 py-4',
      tableRow: 'hover:bg-gray-50 transition-colors',
      
      // Espaciado común
      padding6: 'p-6',
      spaceY4: 'space-y-4',
      spaceY6: 'space-y-6',
      
      // Flex layouts comunes
      flexBetween: 'flex justify-between items-center',
      flexStart: 'flex justify-between items-start',
      flexCenter: 'flex items-center',
      flexCenterSpace: 'flex items-center space-x-2',
      flexCenterSpace3: 'flex items-center space-x-3',
      
      // Grids comunes
      gridCols2: 'grid grid-cols-2 gap-4',
      gridCols3: 'grid grid-cols-3 gap-4 text-center',
      gridCols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6',
      
      // Botones de acción (colores exactos del módulo casos)
      actionButtonBlue: 'p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2',
      actionButtonGreen: 'p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2',
      actionButtonOrange: 'p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2',
      actionButtonPurple: 'p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2',
      actionButtonGray: 'px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors',
      actionButtonGreenAlt: 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors',
      
      // Estados y badges
      textXs: 'text-xs',
      textSm: 'text-sm',
      textSmMedium: 'text-sm font-medium',
      
      // Contenedores de información
      infoBoxBlue: 'mt-6 p-4 bg-blue-50 rounded-lg',
      infoBoxGray: 'p-3 bg-gray-50 rounded',
      infoBoxGreen: 'p-3 bg-green-50 rounded',
      infoBoxYellow: 'p-3 bg-yellow-50 rounded',
      
      // Loading y estados vacíos
      loadingSpinner: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4',
      centerContainer: 'text-center py-12',
      loadingContainer: 'flex items-center justify-center py-12',
      
      // Estadísticas (números grandes)
      statNumber: 'text-2xl font-bold',
      statNumberBlue: 'text-2xl font-bold text-blue-600',
      statNumberGreen: 'text-2xl font-bold text-green-600',
      statLabel: 'text-xs text-gray-500',
      
      // === CLASES MÓDULO INCIDENCIAS (específicas) ===
      // Tarjetas de estadísticas
      statCard: 'rounded-lg shadow-lg p-6',
      statCardGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
      statIconContainer: 'flex items-center',
      statIconBlue: 'p-3 bg-blue-100 rounded-full',
      statIconOrange: 'p-3 bg-orange-100 rounded-full',
      statIconGreen: 'p-3 bg-green-100 rounded-full',
      statIconRed: 'p-3 bg-red-100 rounded-full',
      statContent: 'ml-4',
      statTitle: 'text-sm font-medium',
      statValue: 'text-2xl font-bold',

      // === CLASES MÓDULO REPORTES (copiadas exactamente) ===
      // Formularios y filtros
      filterLabel: 'flex items-center space-x-2 text-sm font-medium text-gray-700',
      filterInput: 'w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300',
      filterContainer: 'space-y-2',
      filterSection: 'space-y-6',
      
      // Layouts comunes
      gridLg2: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
      spaceY2: 'space-y-2',
      spaceY3: 'space-y-3',
      flexItemsCenter: 'flex items-center space-x-2',
      flexJustifyBetween: 'flex justify-between',
      flexJustifyBetweenItems: 'flex justify-between items-center',
      flexItemsCenterJustifyCenter: 'flex items-center justify-center',
      
      // Textos comunes
      textSmGray: 'text-sm text-gray-600 mt-1',
      textXsGray: 'text-xs text-gray-600',
      textXsFontMedium: 'text-xs font-medium fill-gray-900',
      
      // Gráficas y visualizaciones
      chartContainer: 'h-40 relative',
      chartSvg: 'w-full h-full',
      progressBar: 'w-full bg-gray-200 rounded-full h-3',
      transitionAll: 'transition-all duration-1000 ease-out',
      
      // Iconos específicos
      iconPurple: 'w-4 h-4 text-purple-500',
      iconCalendar: 'w-4 h-4 text-purple-500'
    };
  }
}));

export default useAppStore;