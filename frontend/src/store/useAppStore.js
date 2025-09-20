import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // UI State
  sidebarOpen: true,
  darkMode: false,
  expandedMenuItems: {},

  // Actions
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMenuItem: (index) => set((state) => ({
    expandedMenuItems: {
      ...state.expandedMenuItems,
      [index]: !state.expandedMenuItems[index]
    }
  })),

  // Theme Classes
  getThemeClasses: () => {
    const { darkMode } = get();
    return {
      mainBg: darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50',
      
      sidebarBg: darkMode 
        ? 'bg-gray-800 shadow-2xl border-r border-gray-700' 
        : 'bg-white shadow-2xl border-r border-gray-200',
      
      headerBg: darkMode 
        ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white' 
        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
      
      topBarBg: darkMode 
        ? 'bg-gray-800 border-b border-gray-700' 
        : 'bg-white border-b border-gray-100',
      
      primaryText: darkMode ? 'text-white' : 'text-gray-800',
      secondaryText: darkMode ? 'text-gray-300' : 'text-gray-600',
      menuText: darkMode ? 'text-gray-200' : 'text-gray-700',
      subMenuText: darkMode ? 'text-gray-300' : 'text-gray-600',
      
      menuHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
      subMenuHover: darkMode 
        ? 'hover:text-white hover:bg-gray-700 hover:border-gray-500' 
        : 'hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300',
      
      collapseButton: darkMode
        ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
      
      themeButton: darkMode
        ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300'
        : 'bg-white/20 hover:bg-white/30 text-white',
      
      border: darkMode ? 'border-gray-700' : 'border-gray-100',
      logoCircle: darkMode ? 'bg-gray-600' : 'bg-blue-500',
      contentCircle: darkMode 
        ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
        : 'bg-gradient-to-br from-blue-100 to-blue-200',
      
      chevronExpanded: darkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-blue-600',
      chevronCollapsed: darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400',
      bullet: darkMode ? 'bg-gray-500' : 'bg-gray-300',
      headerSubtitle: darkMode ? 'text-gray-300' : 'text-blue-100'
    };
  }
}));

export default useAppStore;