

const SidebarHeader = ({ 
  sidebarOpen, 
  darkMode, 
  toggleTheme, 
  themeClasses 
}) => {
  return (
    <div className={`p-6 ${themeClasses.headerBg}`}>
      <div className={`transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-bold text-xl">Menú Principal</h1>

        </div>
        <p className={`text-sm ${themeClasses.headerSubtitle}`}>
          Sistema de gestión de incidencias
        </p>
      </div>
      
      {!sidebarOpen && (
        <div className="text-center space-y-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto ${themeClasses.logoCircle}`}>
            <span className="text-sm font-bold">MS</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default SidebarHeader;