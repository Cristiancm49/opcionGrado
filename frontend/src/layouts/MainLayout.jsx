import { Outlet } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import Sidebar from '../features/sidebar/Sidebar';

const MainLayout = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  return (
    <div className={`flex h-screen transition-colors duration-500 ${themeClasses.mainBg}`}>
      
      <Sidebar />

      
      <div className="flex-1 flex flex-col overflow-hidden">
        


        <div className="flex-1 overflow-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;