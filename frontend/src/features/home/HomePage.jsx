const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-2xl">
        <div className="content-circle w-32 h-32 mx-auto mb-8">
          <div className="text-4xl">📞</div>
        </div>
        <h1 className="text-primary text-4xl font-bold mb-4">
          Mesa de Servicios
        </h1>
        <p className="text-secondary text-lg mb-8">
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