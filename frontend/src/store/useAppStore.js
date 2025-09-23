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
      headerSubtitle: 'text-blue-100'
    };
  }
}));

export default useAppStore;