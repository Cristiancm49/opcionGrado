import { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { useCasos } from './hooks/useCasos';
import EstadoSelector from './components/EstadoSelector';
import FiltrosTecnicos from './components/FiltrosTecnicos';
import CasosTable from './components/CasosTable';
import DetalleModal from './components/DetalleModal';
import GestionModal from './components/GestionModal';
import DiagnosticoModal from './components/DiagnosticoModal';
import SeguimientoModal from './components/SeguimientoModal';
import Swal from 'sweetalert2';

const MisCasos = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const {
    casos,
    casosFiltrados,
    loading,
    casoSeleccionado,
    setCasoSeleccionado,
    filtros,
    setFiltros,
    aplicarFiltros,
    limpiarFiltros,
    cambiarEstadoTecnico
  } = useCasos();

  // Estados para modales
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [showGestionModal, setShowGestionModal] = useState(false);
  const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);

  // Handlers para modales
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

  // Handlers para acciones
  const aceptarCaso = async (caso) => {
    try {
      await Swal.fire({
        title: '¿Aceptar caso?',
        text: `¿Estás seguro de que quieres aceptar el caso ${caso.numeroCaso}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, aceptar',
        cancelButtonText: 'Cancelar'
      });

      if (Swal.isConfirmed) {
        // Aquí iría la lógica para actualizar el caso
        await Swal.fire({
          title: 'Caso aceptado',
          text: `El caso ${caso.numeroCaso} ha sido aceptado exitosamente`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error al aceptar caso:', error);
    }
  };

  const marcarResuelto = async (caso) => {
    try {
      await Swal.fire({
        title: '¿Marcar como resuelto?',
        text: `¿Estás seguro de que el caso ${caso.numeroCaso} está completamente resuelto?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, marcar como resuelto',
        cancelButtonText: 'Cancelar'
      });

      if (Swal.isConfirmed) {
        // Aquí iría la lógica para marcar como resuelto
        await Swal.fire({
          title: 'Caso resuelto',
          text: `El caso ${caso.numeroCaso} ha sido marcado como resuelto`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error al marcar caso como resuelto:', error);
    }
  };

  const escalarCaso = async (caso) => {
    try {
      const { value: motivo } = await Swal.fire({
        title: 'Escalar caso',
        text: `¿Por qué necesitas escalar el caso ${caso.numeroCaso}?`,
        input: 'textarea',
        inputPlaceholder: 'Describe el motivo del escalamiento...',
        inputAttributes: {
          'aria-label': 'Motivo del escalamiento'
        },
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Escalar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Debes proporcionar un motivo para el escalamiento';
          }
        }
      });

      if (motivo) {
        // Aquí iría la lógica para escalar el caso
        await Swal.fire({
          title: 'Caso escalado',
          text: `El caso ${caso.numeroCaso} ha sido escalado exitosamente`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error al escalar caso:', error);
    }
  };

  // Handlers para guardar cambios en modales
  const guardarGestion = (casoActualizado) => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando gestión:', casoActualizado);
  };

  const guardarDiagnostico = (casoActualizado) => {
    // Aquí iría la lógica para guardar el diagnóstico
    console.log('Guardando diagnóstico:', casoActualizado);
  };

  const guardarSeguimiento = (casoActualizado) => {
    // Aquí iría la lógica para guardar el seguimiento
    console.log('Guardando seguimiento:', casoActualizado);
  };

  return (
    <div className={themeClasses.mainContainer}>
      <div className={themeClasses.headerSection}>
        <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
          Mis Casos Técnicos
        </h1>
        <p className={themeClasses.secondaryText}>
          Gestione sus casos asignados y registre el progreso de su trabajo técnico
        </p>
      </div>

      {/* Selector de estado */}
      <EstadoSelector 
        filtros={filtros}
        casos={casos}
        cambiarEstadoTecnico={cambiarEstadoTecnico}
      />

      {/* Filtros técnicos */}
      <FiltrosTecnicos 
        filtros={filtros}
        setFiltros={setFiltros}
        aplicarFiltros={aplicarFiltros}
        limpiarFiltros={limpiarFiltros}
      />

      {/* Tabla de casos */}
      <CasosTable 
        casos={casosFiltrados}
        loading={loading}
        onDetalle={mostrarDetalle}
        onSeguimiento={mostrarSeguimiento}
        onGestion={mostrarGestion}
        onDiagnostico={mostrarDiagnostico}
        onAceptar={aceptarCaso}
        onMarcarResuelto={marcarResuelto}
        onEscalar={escalarCaso}
      />

      {/* Modales */}
      {showDetalleModal && (
        <DetalleModal 
          caso={casoSeleccionado}
          onClose={() => setShowDetalleModal(false)}
        />
      )}

      {showGestionModal && (
        <GestionModal 
          caso={casoSeleccionado}
          onClose={() => setShowGestionModal(false)}
          onSave={guardarGestion}
        />
      )}

      {showDiagnosticoModal && (
        <DiagnosticoModal 
          caso={casoSeleccionado}
          onClose={() => setShowDiagnosticoModal(false)}
          onSave={guardarDiagnostico}
        />
      )}

      {showSeguimientoModal && (
        <SeguimientoModal 
          caso={casoSeleccionado}
          onClose={() => setShowSeguimientoModal(false)}
          onSave={guardarSeguimiento}
        />
      )}
    </div>
  );
};

export default MisCasos;