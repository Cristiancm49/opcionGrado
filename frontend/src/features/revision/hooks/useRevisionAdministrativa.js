import { useState, useEffect, useMemo } from 'react';
import { mockRevisionesData, mockTecnicosRevision } from '../data/revisionData';

export const useRevisionAdministrativa = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    tecnico: '',
    areaTecnica: '',
    estadoRevision: '',
    prioridad: '',
    fechaDesde: '',
    fechaHasta: '',
    calificacionMinima: '',
    calificacionMaxima: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarRevisiones = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockRevisionesData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las revisiones');
      } finally {
        setLoading(false);
      }
    };

    cargarRevisiones();
  }, []);

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      tecnico: '',
      areaTecnica: '',
      estadoRevision: '',
      prioridad: '',
      fechaDesde: '',
      fechaHasta: '',
      calificacionMinima: '',
      calificacionMaxima: ''
    });
  };

  // Función para verificar si un trabajo cumple con los filtros
  const cumpleFiltros = (trabajo) => {
    // Búsqueda general
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      const textoCompleto = [
        trabajo.numeroCaso,
        trabajo.titulo,
        trabajo.descripcion,
        trabajo.tecnicoAsignado,
        trabajo.areaTecnica,
        trabajo.usuarioReporta,
        trabajo.activoAfectado,
        trabajo.ubicacion,
        trabajo.solucionImplementada,
        trabajo.observacionesTecnico,
        trabajo.comentariosRevision || ''
      ].join(' ').toLowerCase();
      
      if (!textoCompleto.includes(busqueda)) return false;
    }

    // Filtros específicos
    if (filtros.tecnico && trabajo.tecnicoAsignado !== filtros.tecnico) return false;
    if (filtros.areaTecnica && trabajo.areaTecnica !== filtros.areaTecnica) return false;
    if (filtros.estadoRevision && trabajo.estadoRevision !== filtros.estadoRevision) return false;
    if (filtros.prioridad && trabajo.prioridad !== filtros.prioridad) return false;

    // Filtros de fechas
    if (filtros.fechaDesde) {
      const fechaFin = new Date(trabajo.fechaFin);
      const fechaDesde = new Date(filtros.fechaDesde);
      if (fechaFin < fechaDesde) return false;
    }
    if (filtros.fechaHasta) {
      const fechaFin = new Date(trabajo.fechaFin);
      const fechaHasta = new Date(filtros.fechaHasta);
      fechaHasta.setHours(23, 59, 59, 999);
      if (fechaFin > fechaHasta) return false;
    }

    // Filtros de calificación
    if (filtros.calificacionMinima && trabajo.calificacionRevision && trabajo.calificacionRevision < parseInt(filtros.calificacionMinima)) return false;
    if (filtros.calificacionMaxima && trabajo.calificacionRevision && trabajo.calificacionRevision > parseInt(filtros.calificacionMaxima)) return false;

    return true;
  };

  // Trabajos filtrados
  const trabajosFiltrados = useMemo(() => {
    if (!data) return [];
    const todosTrabajos = [...data.trabajosPendientes, ...data.trabajosRevisados];
    return todosTrabajos.filter(cumpleFiltros);
  }, [data, filtros]);

  // Trabajos pendientes filtrados
  const trabajosPendientesFiltrados = useMemo(() => {
    if (!data) return [];
    return data.trabajosPendientes.filter(cumpleFiltros);
  }, [data, filtros]);

  // Trabajos revisados filtrados
  const trabajosRevisadosFiltrados = useMemo(() => {
    if (!data) return [];
    return data.trabajosRevisados.filter(cumpleFiltros);
  }, [data, filtros]);

  // Calcular estadísticas con datos filtrados
  const estadisticasCalculadas = useMemo(() => {
    if (!data) return null;

    const trabajosFiltrados = [...data.trabajosPendientes, ...data.trabajosRevisados].filter(cumpleFiltros);
    const trabajosRevisados = trabajosFiltrados.filter(t => t.estadoRevision === 'Revisado');
    const trabajosAprobados = trabajosRevisados.filter(t => t.aprobado === true);
    const trabajosRechazados = trabajosRevisados.filter(t => t.aprobado === false);

    const promedioCalificacion = trabajosRevisados.length > 0 
      ? trabajosRevisados.reduce((sum, t) => sum + (t.calificacionRevision || 0), 0) / trabajosRevisados.length 
      : 0;

    const eficienciaPromedio = trabajosFiltrados.length > 0
      ? trabajosFiltrados.reduce((sum, t) => sum + t.eficiencia, 0) / trabajosFiltrados.length
      : 0;

    return {
      totalTrabajos: trabajosFiltrados.length,
      trabajosPendientes: trabajosFiltrados.filter(t => t.estadoRevision === 'Pendiente').length,
      trabajosRevisados: trabajosRevisados.length,
      trabajosAprobados: trabajosAprobados.length,
      trabajosRechazados: trabajosRechazados.length,
      promedioCalificacion: promedioCalificacion.toFixed(1),
      eficienciaPromedio: eficienciaPromedio.toFixed(1),
      tiempoPromedioRevision: 2.5
    };
  }, [data, filtros]);

  // Función para aprobar trabajo
  const aprobarTrabajo = (trabajoId, comentarios) => {
    if (!data) return;
    
    const trabajosActualizados = data.trabajosPendientes.map(trabajo => {
      if (trabajo.id === trabajoId) {
        return {
          ...trabajo,
          estadoRevision: 'Revisado',
          fechaRevision: new Date().toISOString(),
          revisadoPor: 'admin.mesa@empresa.com', // En producción sería el usuario actual
          comentariosRevision: comentarios,
          aprobado: true
        };
      }
      return trabajo;
    });

    setData(prev => ({
      ...prev,
      trabajosPendientes: trabajosActualizados.filter(t => t.estadoRevision === 'Pendiente'),
      trabajosRevisados: [
        ...prev.trabajosRevisados,
        ...trabajosActualizados.filter(t => t.estadoRevision === 'Revisado')
      ]
    }));
  };

  // Función para rechazar trabajo
  const rechazarTrabajo = (trabajoId, comentarios) => {
    if (!data) return;
    
    const trabajosActualizados = data.trabajosPendientes.map(trabajo => {
      if (trabajo.id === trabajoId) {
        return {
          ...trabajo,
          estadoRevision: 'Revisado',
          fechaRevision: new Date().toISOString(),
          revisadoPor: 'admin.mesa@empresa.com', // En producción sería el usuario actual
          comentariosRevision: comentarios,
          aprobado: false
        };
      }
      return trabajo;
    });

    setData(prev => ({
      ...prev,
      trabajosPendientes: trabajosActualizados.filter(t => t.estadoRevision === 'Pendiente'),
      trabajosRevisados: [
        ...prev.trabajosRevisados,
        ...trabajosActualizados.filter(t => t.estadoRevision === 'Revisado')
      ]
    }));
  };

  return {
    data,
    estadisticas: estadisticasCalculadas,
    loading,
    error,
    tecnicos: mockTecnicosRevision,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    trabajosFiltrados,
    trabajosPendientesFiltrados,
    trabajosRevisadosFiltrados,
    aprobarTrabajo,
    rechazarTrabajo
  };
};
