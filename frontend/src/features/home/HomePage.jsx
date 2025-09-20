import useAppStore from '../../store/useAppStore';

const HomePage = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-2xl">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg ${themeClasses.contentCircle}`}>
          <div className="text-4xl">📞</div>
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${themeClasses.primaryText}`}>
          Mesa de Servicios
        </h1>
        <p className={`text-lg mb-8 ${themeClasses.secondaryText}`}>
          Sistema integral de gestión de incidencias y servicios técnicos
        </p>
        <div className="flex space-x-4 justify-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-75"></div>
          <div className="w-3 h-3 bg-blue-200 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;