import { useState, useEffect, useMemo } from 'react';
import { incidenciasData } from '../data/incidenciasData';

export const useGestionIncidencias = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    prioridad: '',
    categoria: '',
    subcategoria: '',
    tecnico: '',
    impacto: '',
    urgencia: '',
    fechaDesde: '',
    fechaHasta: '',
    ubicacion: '',
    cumplioSLA: ''
  });
  
  const [busquedaTemporal, setBusquedaTemporal] = useState('');

  // Simular carga de datos
  useEffect(() => {
    const cargarIncidencias = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(incidenciasData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las incidencias');
      } finally {
        setLoading(false);
      }
    };

    cargarIncidencias();
  }, []);

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      estado: '',
      prioridad: '',
      categoria: '',
      subcategoria: '',
      tecnico: '',
      impacto: '',
      urgencia: '',
      fechaDesde: '',
      fechaHasta: '',
      ubicacion: '',
      cumplioSLA: ''
    });
    setBusquedaTemporal('');
  };

  // Función para ejecutar búsqueda manual
  const ejecutarBusqueda = () => {
    setFiltros(prev => ({ ...prev, busqueda: busquedaTemporal }));
  };

  // Función para limpiar búsqueda
  const limpiarBusqueda = () => {
    setBusquedaTemporal('');
    setFiltros(prev => ({ ...prev, busqueda: '' }));
  };

  // Función para verificar si una incidencia cumple con los filtros
  const cumpleFiltros = (incidencia) => {
    // Búsqueda general
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      const textoCompleto = [
        incidencia.numeroIncidencia,
        incidencia.titulo,
        incidencia.descripcion,
        incidencia.nombreUsuario,
        incidencia.nombreTecnico,
        incidencia.areaTecnica,
        incidencia.categoria,
        incidencia.subcategoria,
        incidencia.ubicacion,
        incidencia.solucion || '',
        incidencia.observaciones || '',
        incidencia.etiquetas.join(' ')
      ].join(' ').toLowerCase();
      
      if (!textoCompleto.includes(busqueda)) return false;
    }

    // Filtros específicos
    if (filtros.estado && incidencia.estado !== filtros.estado) return false;
    if (filtros.prioridad && incidencia.prioridad !== filtros.prioridad) return false;
    if (filtros.categoria && incidencia.categoria !== filtros.categoria) return false;
    if (filtros.subcategoria && incidencia.subcategoria !== filtros.subcategoria) return false;
    if (filtros.tecnico && incidencia.tecnicoAsignado !== filtros.tecnico) return false;
    if (filtros.impacto && incidencia.impacto !== filtros.impacto) return false;
    if (filtros.urgencia && incidencia.urgencia !== filtros.urgencia) return false;
    if (filtros.ubicacion && incidencia.ubicacion !== filtros.ubicacion) return false;

    // Filtros de fechas
    if (filtros.fechaDesde) {
      const fechaRegistro = new Date(incidencia.fechaRegistro);
      const fechaDesde = new Date(filtros.fechaDesde);
      if (fechaRegistro < fechaDesde) return false;
    }
    if (filtros.fechaHasta) {
      const fechaRegistro = new Date(incidencia.fechaRegistro);
      const fechaHasta = new Date(filtros.fechaHasta);
      fechaHasta.setHours(23, 59, 59, 999);
      if (fechaRegistro > fechaHasta) return false;
    }

    // Filtro de cumplimiento SLA
    if (filtros.cumplioSLA === 'true' && !incidencia.cumplioSLA) return false;
    if (filtros.cumplioSLA === 'false' && incidencia.cumplioSLA !== false) return false;

    return true;
  };

  // Incidencias filtradas
  const incidenciasFiltradas = useMemo(() => {
    if (!data?.incidencias) return [];
    return data.incidencias.filter(cumpleFiltros);
  }, [data, filtros]);

  // Calcular estadísticas con datos filtrados
  const estadisticasCalculadas = useMemo(() => {
    if (!data) return null;

    const incidenciasFiltradas = data.incidencias?.filter(cumpleFiltros) || [];
    const incidenciasCerradas = incidenciasFiltradas.filter(i => i.estado === 'Cerrado');
    const incidenciasConSLA = incidenciasCerradas.filter(i => i.cumplioSLA !== null);
    const cumplieronSLA = incidenciasConSLA.filter(i => i.cumplioSLA === true);

    const promedioTiempoResolucion = incidenciasCerradas.length > 0
      ? incidenciasCerradas.reduce((sum, i) => sum + (i.tiempoReal || 0), 0) / incidenciasCerradas.length
      : 0;

    const cumplimientoSLA = incidenciasConSLA.length > 0
      ? (cumplieronSLA.length / incidenciasConSLA.length) * 100
      : 0;

    return {
      totalIncidencias: incidenciasFiltradas.length,
      incidenciasPendientes: incidenciasFiltradas.filter(i => i.estado === 'Pendiente').length,
      incidenciasEnProceso: incidenciasFiltradas.filter(i => i.estado === 'En Proceso').length,
      incidenciasCerradas: incidenciasCerradas.length,
      incidenciasCriticas: incidenciasFiltradas.filter(i => i.prioridad === 'Crítica').length,
      incidenciasAltaPrioridad: incidenciasFiltradas.filter(i => i.prioridad === 'Alta').length,
      promedioTiempoResolucion: promedioTiempoResolucion.toFixed(1),
      cumplimientoSLA: cumplimientoSLA.toFixed(1)
    };
  }, [data, filtros]);

  // Función para crear nueva incidencia
  const crearIncidencia = (nuevaIncidencia) => {
    if (!data) return;
    
    const incidencia = {
      id: data.incidencias.length + 1,
      numeroIncidencia: `INC-2024-${String(data.incidencias.length + 1).padStart(3, '0')}`,
      fechaRegistro: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      estado: 'Pendiente',
      tiempoReal: null,
      solucion: null,
      observaciones: null,
      cumplioSLA: null,
      ...nuevaIncidencia
    };

    setData(prev => ({
      ...prev,
      incidencias: [...prev.incidencias, incidencia]
    }));
  };

  // Función para actualizar incidencia
  const actualizarIncidencia = (incidenciaId, datosActualizados) => {
    if (!data) return;
    
    const incidenciasActualizadas = data.incidencias.map(incidencia => {
      if (incidencia.id === incidenciaId) {
        return {
          ...incidencia,
          ...datosActualizados,
          fechaActualizacion: new Date().toISOString()
        };
      }
      return incidencia;
    });

    setData(prev => ({
      ...prev,
      incidencias: incidenciasActualizadas
    }));
  };

  // Función para eliminar incidencia
  const eliminarIncidencia = (incidenciaId) => {
    if (!data) return;
    
    const incidenciasFiltradas = data.incidencias.filter(incidencia => incidencia.id !== incidenciaId);
    
    setData(prev => ({
      ...prev,
      incidencias: incidenciasFiltradas
    }));
  };

  return {
    data,
    estadisticas: estadisticasCalculadas,
    loading,
    error,
    tecnicos: [
      { id: 1, nombre: 'Juan Pérez', especialidad: 'Hardware' },
      { id: 2, nombre: 'María González', especialidad: 'Software' },
      { id: 3, nombre: 'Luis Martínez', especialidad: 'Redes' },
      { id: 4, nombre: 'Ana Rodríguez', especialidad: 'Sistemas' }
    ],
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
  };
};
