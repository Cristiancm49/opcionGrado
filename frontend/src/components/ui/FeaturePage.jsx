import useAppStore from '../../store/useAppStore';

const FeaturePage = ({ 
  title, 
  description, 
  icon, 
  children, 
  showComingSoon = true 
}) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          {icon && (
            <div className="p-3 bg-blue-500 text-white rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <h1 className={`text-3xl font-bold ${themeClasses.primaryText}`}>
              {title}
            </h1>
            {description && (
              <p className={`mt-1 ${themeClasses.secondaryText}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {children ? (
        children
      ) : showComingSoon ? (
        <div className={`${themeClasses.sidebarBg} rounded-lg p-12 shadow-lg text-center`}>
          <div className="mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${themeClasses.contentCircle}`}>
              <span className="text-3xl">🚧</span>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${themeClasses.primaryText}`}>
              Próximamente
            </h2>
            <p className={themeClasses.secondaryText}>
              Esta funcionalidad está en desarrollo y estará disponible pronto.
            </p>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FeaturePage;