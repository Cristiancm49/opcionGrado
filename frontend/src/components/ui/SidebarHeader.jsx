
const SidebarHeader = ({ sidebarOpen }) => {
  return (
    <div className="app-header p-6">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-bold text-xl text-white">Menú Principal</h1>
        </div>
        <p className="text-sm text-blue-100">
          Sistema de gestión de incidencias
        </p>
      </div>
      
      {!sidebarOpen && (
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto bg-blue-500">
            <span className="text-sm font-bold text-white">MS</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;