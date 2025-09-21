import { ChevronRight, FileText, Settings, Package, BarChart3 } from 'lucide-react';

// Mapeo de nombres de iconos a componentes
const iconMap = {
  FileText,
  Settings,
  Package,
  BarChart3
};

const MenuItem = ({ 
  item, 
  isExpanded, 
  onToggle, 
  sidebarOpen,
  onSubItemClick
}) => {
  const IconComponent = iconMap[item.iconName];

  return (
    <div className="mb-2 px-3">
      <button
        onClick={onToggle}
        className="menu-item transition-all duration-200 group"
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${item.color} text-white shadow-md group-hover:scale-105 transition-transform duration-200`}>
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </div>
          {sidebarOpen && (
            <span className="text-menu font-medium text-sm group-hover:scale-[1.02] transition-all">
              {item.title}
            </span>
          )}
        </div>
        {sidebarOpen && (
          <div className={`p-1 rounded-full transition-all duration-300 ${
            isExpanded 
              ? 'bg-blue-100 text-blue-600 rotate-90'
              : 'bg-gray-100 text-gray-400'
          }`}>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </button>
      
      {/* Subitems */}
      {sidebarOpen && isExpanded && (
        <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-left duration-300">
          {item.subItems.map((subItem, subIndex) => (
            <button
              key={subIndex}
              onClick={() => onSubItemClick && onSubItemClick(subItem)}
              className="submenu-item border-l-2 border-transparent"
            >
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <span>{subItem}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;