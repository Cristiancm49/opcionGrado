import useAppStore from '../../store/useAppStore';
import { useIncidencias } from './hooks/useIncidencias';
import EstadoSelector from './components/EstadoSelector';
import FiltrosIncidencias from './components/FiltrosIncidencias';
import IncidenciasTable from './components/IncidenciasTable';
import DetalleModal from './components/DetalleModal';
import SeguimientoModal from './components/SeguimientoModal';
import EncuestaModal from './components/EncuestaModal';

const MisIncidencias = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const {
    incidencias,
    incidenciasFiltradas,
    loading,
    filtros,
    estadisticas,
    showDetalleModal,
    showSeguimientoModal,
    showEncuestaModal,
    incidenciaSeleccionada,
    cambiarEstadoGeneral,
    aplicarFiltros,
    limpiarFiltros,
    actualizarFiltros,
    setShowDetalleModal,
    setShowSeguimientoModal,
    setShowEncuestaModal,
    setIncidenciaSeleccionada
  } = useIncidencias();

  const handleShowDetalle = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setShowDetalleModal(true);
  };

  const handleShowSeguimiento = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setShowSeguimientoModal(true);
  };

  const handleShowEncuesta = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setShowEncuestaModal(true);
  };

  const handleCloseModal = () => {
    setShowDetalleModal(false);
    setShowSeguimientoModal(false);
    setShowEncuestaModal(false);
    setIncidenciaSeleccionada(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={themeClasses.secondaryText}>Cargando incidencias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
          Mis Incidencias
        </h1>
        <p className={`${themeClasses.secondaryText}`}>
          Gestione y consulte todas las incidencias reportadas
        </p>
      </div>

      {/* Estadísticas */}
      <div className={themeClasses.statCardGrid}>
        <div className={`${themeClasses.cardBg} ${themeClasses.statCard}`}>
          <div className={themeClasses.statIconContainer}>
            <div className={themeClasses.statIconBlue}>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className={themeClasses.statContent}>
              <p className={`${themeClasses.statTitle} ${themeClasses.secondaryText}`}>Total</p>
              <p className={`${themeClasses.statValue} ${themeClasses.primaryText}`}>{estadisticas.total}</p>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.statCard}`}>
          <div className={themeClasses.statIconContainer}>
            <div className={themeClasses.statIconOrange}>
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={themeClasses.statContent}>
              <p className={`${themeClasses.statTitle} ${themeClasses.secondaryText}`}>Activos</p>
              <p className={`${themeClasses.statValue} ${themeClasses.primaryText}`}>{estadisticas.activos}</p>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.statCard}`}>
          <div className={themeClasses.statIconContainer}>
            <div className={themeClasses.statIconGreen}>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={themeClasses.statContent}>
              <p className={`${themeClasses.statTitle} ${themeClasses.secondaryText}`}>Resueltos</p>
              <p className={`${themeClasses.statValue} ${themeClasses.primaryText}`}>{estadisticas.resueltos}</p>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.statCard}`}>
          <div className={themeClasses.statIconContainer}>
            <div className={themeClasses.statIconRed}>
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className={themeClasses.statContent}>
              <p className={`${themeClasses.statTitle} ${themeClasses.secondaryText}`}>Críticos</p>
              <p className={`${themeClasses.statValue} ${themeClasses.primaryText}`}>{estadisticas.criticos}</p>
            </div>
          </div>
        </div>
      </div>

        {/* Selector de estado */}
        <EstadoSelector 
          estadoGeneral={filtros.estadoGeneral}
          cambiarEstadoGeneral={cambiarEstadoGeneral}
          estadisticas={estadisticas}
        />

        {/* Filtros */}
        <FiltrosIncidencias 
          filtros={filtros}
          actualizarFiltros={actualizarFiltros}
          aplicarFiltros={aplicarFiltros}
          limpiarFiltros={limpiarFiltros}
        />

      {/* Tabla de incidencias */}
      <div className={`${themeClasses.cardBg} ${themeClasses.statCard}`}>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${themeClasses.primaryText}`}>
            Incidencias ({incidenciasFiltradas.length})
          </h3>
        </div>
        <div className={themeClasses.padding6}>
          {incidenciasFiltradas.length > 0 ? (
            <IncidenciasTable 
              incidencias={incidenciasFiltradas}
              onShowDetalle={handleShowDetalle}
              onShowSeguimiento={handleShowSeguimiento}
              onShowEncuesta={handleShowEncuesta}
            />
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📋</div>
              <h3 className={`text-xl font-semibold mb-2 ${themeClasses.primaryText}`}>
                No hay incidencias
              </h3>
              <p className={`${themeClasses.secondaryText}`}>
                No se encontraron incidencias con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showDetalleModal && (
        <DetalleModal 
          incidencia={incidenciaSeleccionada}
          onClose={handleCloseModal}
        />
      )}
      
      {showSeguimientoModal && (
        <SeguimientoModal 
          incidencia={incidenciaSeleccionada}
          onClose={handleCloseModal}
        />
      )}
      
      {showEncuestaModal && (
        <EncuestaModal 
          incidencia={incidenciaSeleccionada}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MisIncidencias;
