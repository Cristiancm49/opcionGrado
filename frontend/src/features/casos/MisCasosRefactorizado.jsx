import { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import Swal from 'sweetalert2';
import { useCasos } from './hooks/useCasos';
import CasosFilters from './components/CasosFilters';
import CasosStats from './components/CasosStats';
import CasosTable from './components/CasosTable';

const MisCasosRefactorizado = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const {
    casos,
    casosFiltrados,
    loading,
    filtros,
    opcionesFiltros,
    estadisticas,
    actualizarFiltros,
    limpiarFiltros,
    aplicarFiltros
  } = useCasos();

  // Estados para modales
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [showGestionModal, setShowGestionModal] = useState(false);
  const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  // Funciones para manejar acciones
  const mostrarDetalle = (caso) => {
    setCasoSeleccionado(caso);
    setShowDetalleModal(true);
  };

  const mostrarSeguimiento = (caso) => {
    setCasoSeleccionado(caso);
    setShowSeguimientoModal(true);
  };

  const mostrarGestion = (caso) => {
    setCasoSeleccionado(caso);
    setShowGestionModal(true);
  };

  const mostrarDiagnostico = (caso) => {
    setCasoSeleccionado(caso);
    setShowDiagnosticoModal(true);
  };

  const aceptarCaso = async (caso) => {
    const result = await Swal.fire({
      title: '¿Aceptar caso?',
      text: `¿Estás seguro de que quieres aceptar el caso ${caso.numeroCaso}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // Aquí iría la lógica para aceptar el caso
      Swal.fire({
        title: 'Caso Aceptado',
        text: `El caso ${caso.numeroCaso} ha sido aceptado exitosamente.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const marcarResuelto = async (caso) => {
    const result = await Swal.fire({
      title: '¿Marcar como resuelto?',
      text: `¿Estás seguro de que quieres marcar el caso ${caso.numeroCaso} como resuelto?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, marcar como resuelto',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // Aquí iría la lógica para marcar como resuelto
      Swal.fire({
        title: 'Caso Resuelto',
        text: `El caso ${caso.numeroCaso} ha sido marcado como resuelto.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
            Mis Casos
          </h1>
          <p className={`mt-2 text-lg ${themeClasses.textSecondary}`}>
            Gestiona los casos asignados y en proceso
          </p>
        </div>

        {/* Estadísticas */}
        <CasosStats estadisticas={estadisticas} />

        {/* Filtros */}
        <CasosFilters
          filtros={filtros}
          opcionesFiltros={opcionesFiltros}
          actualizarFiltros={actualizarFiltros}
          limpiarFiltros={limpiarFiltros}
          aplicarFiltros={aplicarFiltros}
        />

        {/* Tabla de casos */}
        <CasosTable
          casos={casosFiltrados}
          loading={loading}
          onVerDetalle={mostrarDetalle}
          onGestionarDiagnostico={mostrarDiagnostico}
          onGestionarCaso={mostrarGestion}
          onVerSeguimiento={mostrarSeguimiento}
          onAceptarCaso={aceptarCaso}
          onMarcarResuelto={marcarResuelto}
        />

        {/* Modales - Placeholder para futuros componentes */}
        {showDetalleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Detalle del Caso</h3>
              <p className="text-gray-600 mb-4">
                Detalle del caso: {casoSeleccionado?.numeroCaso}
              </p>
              <button
                onClick={() => setShowDetalleModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showSeguimientoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Seguimiento del Caso</h3>
              <p className="text-gray-600 mb-4">
                Seguimiento del caso: {casoSeleccionado?.numeroCaso}
              </p>
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showGestionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Gestión del Caso</h3>
              <p className="text-gray-600 mb-4">
                Gestión del caso: {casoSeleccionado?.numeroCaso}
              </p>
              <button
                onClick={() => setShowGestionModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showDiagnosticoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Diagnóstico del Caso</h3>
              <p className="text-gray-600 mb-4">
                Diagnóstico del caso: {casoSeleccionado?.numeroCaso}
              </p>
              <button
                onClick={() => setShowDiagnosticoModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisCasosRefactorizado;
