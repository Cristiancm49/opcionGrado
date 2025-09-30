import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users, 
  TrendingUp, 
  BarChart3,
  Plus,
  UserPlus,
  CheckSquare,
  X,
  RefreshCw
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';
import FiltrosIncidencias from './components/FiltrosIncidencias';
import IncidenciaItem from './components/IncidenciaItem';
import ModalAsignacionTecnico from './components/ModalAsignacionTecnico';
import ModalAsignacionMasiva from './components/ModalAsignacionMasiva';
import { useGestionIncidencias } from './hooks/useGestionIncidencias';

const GestionIncidencias = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const {
    data,
    estadisticas,
    loading,
    error,
    tecnicos,
    filtros,
    busquedaTemporal,
    actualizarFiltros,
    limpiarFiltros,
    ejecutarBusqueda,
    limpiarBusqueda,
    setBusquedaTemporal,
    incidenciasFiltradas,
    crearIncidencia,
    actualizarIncidencia,
    eliminarIncidencia
  } = useGestionIncidencias();

  const [tabActivo, setTabActivo] = useState('incidencias');
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  const [incidenciasSeleccionadas, setIncidenciasSeleccionadas] = useState([]);
  const [modalAsignacionAbierto, setModalAsignacionAbierto] = useState(false);
  const [modalAsignacionMasivaAbierto, setModalAsignacionMasivaAbierto] = useState(false);

  // Handlers para acciones
  const handleVerIncidencia = (incidencia) => {
    console.log('Ver incidencia:', incidencia);
    // Aquí se abriría un modal o navegaría a una página de detalle
  };

  const handleEditarIncidencia = (incidencia) => {
    console.log('Editar incidencia:', incidencia);
    // Aquí se abriría un modal de edición
  };

  const handleEliminarIncidencia = (incidencia) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la incidencia ${incidencia.numeroIncidencia}?`)) {
      eliminarIncidencia(incidencia.id);
    }
  };

  const handleNuevaIncidencia = () => {
    console.log('Nueva incidencia');
    // Aquí se abriría un modal para crear nueva incidencia
  };

  const handleAsignarTecnico = (incidencia) => {
    console.log('🔧 Abriendo modal de asignación para:', incidencia.numeroIncidencia);
    setIncidenciaSeleccionada(incidencia);
    setModalAsignacionAbierto(true);
  };

  const handleAsignacionMasiva = () => {
    if (incidenciasSeleccionadas.length === 0) {
      alert('Selecciona al menos una incidencia para asignación masiva');
      return;
    }
    setModalAsignacionMasivaAbierto(true);
  };

  const handleConfirmarAsignacion = (datosAsignacion) => {
    actualizarIncidencia(datosAsignacion.incidenciaId, {
      tecnicoAsignado: datosAsignacion.tecnicoAsignado,
      nombreTecnico: datosAsignacion.nombreTecnico,
      areaTecnica: datosAsignacion.areaTecnica,
      estado: 'En Proceso',
      fechaActualizacion: datosAsignacion.fechaAsignacion
    });
    
    console.log('Asignación realizada:', datosAsignacion);
  };

  const handleConfirmarAsignacionMasiva = (asignaciones) => {
    asignaciones.forEach(asignacion => {
      actualizarIncidencia(asignacion.incidenciaId, {
        tecnicoAsignado: asignacion.tecnicoAsignado,
        nombreTecnico: asignacion.nombreTecnico,
        areaTecnica: asignacion.areaTecnica,
        estado: 'En Proceso',
        fechaActualizacion: asignacion.fechaAsignacion
      });
    });
    
    setIncidenciasSeleccionadas([]);
    console.log('Asignación masiva realizada:', asignaciones);
  };

  const toggleSeleccionIncidencia = (incidencia) => {
    setIncidenciasSeleccionadas(prev => {
      const existe = prev.find(i => i.id === incidencia.id);
      if (existe) {
        return prev.filter(i => i.id !== incidencia.id);
      } else {
        return [...prev, incidencia];
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando incidencias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <XCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
          <p className="text-gray-600">No se pudieron cargar los datos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Incidencias</h1>
          <p className="text-gray-600">Administra todas las incidencias del sistema</p>
        </div>
        <div className="flex items-center space-x-3">
          {incidenciasSeleccionadas.length > 0 && (
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-gray-600">
                {incidenciasSeleccionadas.length} seleccionada{incidenciasSeleccionadas.length !== 1 ? 's' : ''}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAsignacionMasiva}
                className="text-purple-600 hover:text-purple-800"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Asignación Masiva
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIncidenciasSeleccionadas([])}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
            </div>
          )}
          <Button
            onClick={handleNuevaIncidencia}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Incidencia
          </Button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card.Stat
          title="Total Incidencias"
          value={estadisticas?.totalIncidencias || 0}
          icon={AlertTriangle}
          color="blue"
          subtitle="Incidencias registradas"
        />
        <Card.Stat
          title="En Proceso"
          value={estadisticas?.incidenciasEnProceso || 0}
          icon={Clock}
          color="yellow"
          subtitle="Actualmente en trabajo"
        />
        <Card.Stat
          title="Cerradas"
          value={estadisticas?.incidenciasCerradas || 0}
          icon={CheckCircle}
          color="green"
          subtitle="Resueltas exitosamente"
        />
        <Card.Stat
          title="Críticas"
          value={estadisticas?.incidenciasCriticas || 0}
          icon={XCircle}
          color="red"
          subtitle="Requieren atención inmediata"
        />
      </div>

      {/* Estadísticas secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card.Stat
          title="Alta Prioridad"
          value={estadisticas?.incidenciasAltaPrioridad || 0}
          icon={TrendingUp}
          color="orange"
          subtitle="Incidencias prioritarias"
        />
        <Card.Stat
          title="Pendientes"
          value={estadisticas?.incidenciasPendientes || 0}
          icon={Clock}
          color="gray"
          subtitle="Esperando asignación"
        />
        <Card.Stat
          title="Tiempo Promedio"
          value={`${estadisticas?.promedioTiempoResolucion || 0}h`}
          icon={Clock}
          color="blue"
          subtitle="Tiempo de resolución"
        />
        <Card.Stat
          title="Cumplimiento SLA"
          value={`${estadisticas?.cumplimientoSLA || 0}%`}
          icon={BarChart3}
          color="green"
          subtitle="SLA cumplido"
        />
      </div>

      {/* Filtros */}
      <FiltrosIncidencias
        filtros={filtros}
        busquedaTemporal={busquedaTemporal}
        actualizarFiltros={actualizarFiltros}
        limpiarFiltros={limpiarFiltros}
        ejecutarBusqueda={ejecutarBusqueda}
        limpiarBusqueda={limpiarBusqueda}
        setBusquedaTemporal={setBusquedaTemporal}
        opcionesFiltros={data.opcionesFiltros}
        incidenciasFiltradas={incidenciasFiltradas}
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'incidencias', label: 'Incidencias', count: incidenciasFiltradas.length },
              { id: 'estadisticas', label: 'Estadísticas', count: null },
              { id: 'tecnicos', label: 'Por Técnico', count: tecnicos.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActivo(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tabActivo === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Incidencias */}
          {tabActivo === 'incidencias' && (
            <div className="space-y-4">
              {incidenciasFiltradas.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay incidencias
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {Object.values(filtros).some(valor => valor !== '') 
                      ? 'No se encontraron incidencias con los filtros aplicados.'
                      : 'No hay incidencias registradas en el sistema.'
                    }
                  </p>
                  {Object.values(filtros).some(valor => valor !== '') && (
                    <Button
                      variant="outline"
                      onClick={limpiarFiltros}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Limpiar Filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {incidenciasFiltradas.map((incidencia) => (
                    <div key={incidencia.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 pt-2">
                        <input
                          type="checkbox"
                          checked={incidenciasSeleccionadas.some(i => i.id === incidencia.id)}
                          onChange={() => toggleSeleccionIncidencia(incidencia)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      <div className="flex-1">
                        <IncidenciaItem
                          incidencia={incidencia}
                          onView={handleVerIncidencia}
                          onEdit={handleEditarIncidencia}
                          onDelete={handleEliminarIncidencia}
                          onAsignar={handleAsignarTecnico}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Estadísticas */}
          {tabActivo === 'estadisticas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(data.estadisticasGenerales.incidenciasPorCategoria).map(([categoria, cantidad]) => (
                  <Card key={categoria} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">{categoria}</h3>
                        <p className="text-2xl font-bold text-gray-900">{cantidad}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <Card.Header>
                    <Card.Title>Tendencias por Estado</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {[
                        { estado: 'Pendiente', cantidad: estadisticas?.incidenciasPendientes || 0, color: 'bg-yellow-500' },
                        { estado: 'En Proceso', cantidad: estadisticas?.incidenciasEnProceso || 0, color: 'bg-blue-500' },
                        { estado: 'Cerrado', cantidad: estadisticas?.incidenciasCerradas || 0, color: 'bg-green-500' }
                      ].map(({ estado, cantidad, color }) => (
                        <div key={estado} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{estado}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${color}`}
                                style={{ width: `${(cantidad / (estadisticas?.totalIncidencias || 1)) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{cantidad}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Distribución por Prioridad</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {[
                        { prioridad: 'Crítica', cantidad: estadisticas?.incidenciasCriticas || 0, color: 'bg-red-500' },
                        { prioridad: 'Alta', cantidad: estadisticas?.incidenciasAltaPrioridad || 0, color: 'bg-orange-500' },
                        { prioridad: 'Media', cantidad: Math.max(0, (estadisticas?.totalIncidencias || 0) - (estadisticas?.incidenciasCriticas || 0) - (estadisticas?.incidenciasAltaPrioridad || 0)), color: 'bg-blue-500' }
                      ].map(({ prioridad, cantidad, color }) => (
                        <div key={prioridad} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{prioridad}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${color}`}
                                style={{ width: `${(cantidad / (estadisticas?.totalIncidencias || 1)) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{cantidad}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            </div>
          )}

          {/* Tab: Por Técnico */}
          {tabActivo === 'tecnicos' && (
            <div className="space-y-4">
              {tecnicos.map((tecnico) => (
                <Card key={tecnico.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{tecnico.nombre}</h3>
                        <p className="text-sm text-gray-600">{tecnico.area}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Incidencias Asignadas</div>
                      <div className="text-2xl font-bold text-blue-600">{tecnico.incidenciasAsignadas}</div>
                      <div className="text-sm text-gray-500">
                        Promedio: {tecnico.promedioResolucion}h
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <ModalAsignacionTecnico
        incidencia={incidenciaSeleccionada}
        tecnicos={tecnicos}
        isOpen={modalAsignacionAbierto}
        onClose={() => {
          console.log('🔧 Cerrando modal de asignación');
          setModalAsignacionAbierto(false);
          setIncidenciaSeleccionada(null);
        }}
        onAsignar={handleConfirmarAsignacion}
      />

      <ModalAsignacionMasiva
        incidenciasSeleccionadas={incidenciasSeleccionadas}
        tecnicos={tecnicos}
        isOpen={modalAsignacionMasivaAbierto}
        onClose={() => setModalAsignacionMasivaAbierto(false)}
        onAsignarMasivo={handleConfirmarAsignacionMasiva}
      />
    </div>
  );
};

export default GestionIncidencias;
