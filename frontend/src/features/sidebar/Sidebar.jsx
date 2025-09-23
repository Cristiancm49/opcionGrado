import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { menuItems } from '../../utils/menuData';
import { menuRoutes } from '../../router/routes';
import SidebarHeader from '../../components/ui/SidebarHeader';
import MenuItem from '../../components/ui/MenuItem';
import CollapseButton from '../../components/ui/CollapseButton';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const {
    sidebarOpen,
    expandedMenuItems,
    toggleSidebar,
    toggleMenuItem,
    getThemeClasses
  } = useAppStore();

  const themeClasses = getThemeClasses();

  const handleSubItemClick = (subItemName) => {

    const route = menuRoutes[subItemName];
    if (route) {
      navigate(route);
    } else {
      console.log('Ruta no encontrada para:', subItemName);
    }
  };

  const handleMenuItemToggle = (index) => {
    toggleMenuItem(index);
  };

  return (
    <div className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-500 ease-in-out ${themeClasses.sidebarBg} flex flex-col`}>
      
      
      <SidebarHeader
        sidebarOpen={sidebarOpen}
        themeClasses={themeClasses}
      />

      
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isExpanded={expandedMenuItems[index]}
            onToggle={() => handleMenuItemToggle(index)}
            sidebarOpen={sidebarOpen}
            themeClasses={themeClasses}
            onSubItemClick={handleSubItemClick}
          />
        ))}
      </div>

      {/* Collapse Button */}
      <CollapseButton
        sidebarOpen={sidebarOpen}
        onToggle={toggleSidebar}
        themeClasses={themeClasses}
      />
    </div>
  );
};

export default Sidebar;