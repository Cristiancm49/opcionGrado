// src/features/configuracion/GestionCatalogos.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { catalogosService } from '../../services';
import { 
  Database, 
  ArrowLeft,
  Search,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Activity,
  FileText,
  Star,
  Settings,
  Layers,
  Tag,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const GestionCatalogos = () => {
  const navigate = useNavigate();
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  // Estados
  const [loading, setLoading] = useState(true);
  const [catalogos, setCatalogos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [error, setError] = useState(null);

  // Iconos y colores para catálogos
  const catalogoConfig = {
    'estadosGenerales': { icono: Activity, color: 'blue', descripcion: 'Estados generales del sistema' },
    'estadosCaso': { icono: Activity, color: 'blue', descripcion: 'Estados del flujo de casos' },
    'estadosActivo': { icono: CheckCircle, color: 'green', descripcion: 'Estados de activos fijos' },
    'estadosConsumible': { icono: Tag, color: 'orange', descripcion: 'Estados de consumibles' },
    'estadosIntervencion': { icono: Settings, color: 'purple', descripcion: 'Estados de intervenciones' },
    'areasTecnicas': { icono: Settings, color: 'purple', descripcion: 'Áreas de especialización técnica' },
    'canalesIngreso': { icono: FileText, color: 'indigo', descripcion: 'Canales de entrada de casos' },
    'prioridades': { icono: Star, color: 'orange', descripcion: 'Niveles de prioridad' },
    'tiposCaso': { icono: FileText, color: 'green', descripcion: 'Clasificación de tipos de caso' },
    'tiposTrabajo': { icono: Layers, color: 'indigo', descripcion: 'Tipos de trabajo técnico' },
    'categoriasActivo': { icono: Tag, color: 'pink', descripcion: 'Categorías de activos' },
    'tiposConsumible': { icono: Tag, color: 'pink', descripcion: 'Tipos de consumibles' },
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      indigo: 'from-indigo-500 to-indigo-600',
      pink: 'from-pink-500 to-pink-600',
    };
    return colors[color] || colors.blue;
  };

  // Cargar datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await catalogosService.getEstadisticas();
      setCatalogos(stats.catalogos || []);
    } catch (err) {
      console.error('Error cargando catálogos:', err);
      setError(err.message || 'Error al cargar los catálogos');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar catálogos
  const catalogosFiltrados = catalogos.filter(c => 
    c.nombre?.toLowerCase().includes(filtro.toLowerCase())
  );

  // Calcular totales
  const totalRegistros = catalogos.reduce((acc, c) => acc + (c.datos?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className={themeClasses.secondaryText}>Cargando catálogos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 font-medium mb-2">Error al cargar</p>
          <p className={themeClasses.secondaryText}>{error}</p>
          <button 
            onClick={cargarDatos}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/admin/configuracion-sistema')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              Gestión de Catálogos
            </h1>
            <p className={themeClasses.secondaryText}>
              {catalogos.length} catálogos • {totalRegistros} registros totales
            </p>
          </div>
        </div>

        <button 
          onClick={cargarDatos}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className={`${themeClasses.sidebarBg} rounded-xl p-4 shadow-lg border border-gray-200`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar catálogo..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Grid de catálogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogosFiltrados.map((catalogo) => {
          const config = catalogoConfig[catalogo.tipo] || { icono: Database, color: 'blue', descripcion: '' };
          const Icono = config.icono;
          
          return (
            <div 
              key={catalogo.tipo}
              onClick={() => navigate(`/admin/catalogo/${catalogo.tipo}`)}
              className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer hover:border-gray-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${getColorClasses(config.color)} rounded-lg`}>
                  <Icono className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                    {catalogo.datos?.length || 0}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
              
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} mb-1`}>
                {catalogo.nombre}
              </h3>
              
              <p className={`text-sm ${themeClasses.secondaryText}`}>
                {config.descripcion}
              </p>
            </div>
          );
        })}
      </div>

      {catalogosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className={themeClasses.secondaryText}>No se encontraron catálogos</p>
        </div>
      )}
    </div>
  );
};

export default GestionCatalogos;

