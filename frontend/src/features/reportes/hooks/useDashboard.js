import { useState, useEffect, useMemo } from 'react';
import { mockDashboardData, mockTecnicos, mockAreas } from '../data/dashboardData';

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estadoCaso: '',
    tipoCaso: '',
    prioridad: '',
    areaTecnica: '',
    tecnico: '',
    calificacion: '',
    nivelSatisfaccion: '',
    satisfaccionMinima: '',
    satisfaccionMaxima: '',
    fechaDesde: '',
    fechaHasta: '',
    diasAbiertoMinimo: '',
    diasAbiertoMaximo: '',
    tiempoResolucionMinimo: '',
    tiempoResolucionMaximo: '',
    escalado: '',
    retrasado: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarDashboard = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockDashboardData);
        setError(null);
      } catch (err) {
        setError('Error al cargar el dashboard');
      } finally {
        setLoading(false);
      }
    };

    cargarDashboard();
  }, []);

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      estadoCaso: '',
      tipoCaso: '',
      prioridad: '',
      areaTecnica: '',
      tecnico: '',
      calificacion: '',
      nivelSatisfaccion: '',
      satisfaccionMinima: '',
      satisfaccionMaxima: '',
      fechaDesde: '',
      fechaHasta: '',
      diasAbiertoMinimo: '',
      diasAbiertoMaximo: '',
      tiempoResolucionMinimo: '',
      tiempoResolucionMaximo: '',
      escalado: '',
      retrasado: ''
    });
  };

  // Función para verificar si un caso cumple con los filtros
  const cumpleFiltrosCaso = (caso) => {
    // Búsqueda general
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      const textoCompleto = [
        caso.numeroCaso,
        caso.titulo,
        caso.descripcion,
        caso.nombreUsuario,
        caso.nombreTecnico,
        caso.areaTecnica,
        caso.tipoCaso,
        caso.prioridad,
        caso.estado,
        caso.activoAfectado,
        caso.ubicacion
      ].join(' ').toLowerCase();
      
      if (!textoCompleto.includes(busqueda)) return false;
    }

    // Filtros específicos
    if (filtros.estadoCaso && caso.estado !== filtros.estadoCaso) return false;
    if (filtros.tipoCaso && caso.tipoCaso !== filtros.tipoCaso) return false;
    if (filtros.prioridad && caso.prioridad !== filtros.prioridad) return false;
    if (filtros.areaTecnica && caso.areaTecnica !== filtros.areaTecnica) return false;
    if (filtros.tecnico && caso.tecnicoAsignado !== filtros.tecnico) return false;

    // Filtros de fechas
    if (filtros.fechaDesde) {
      const fechaRegistro = new Date(caso.fechaRegistro);
      const fechaDesde = new Date(filtros.fechaDesde);
      if (fechaRegistro < fechaDesde) return false;
    }
    if (filtros.fechaHasta) {
      const fechaRegistro = new Date(caso.fechaRegistro);
      const fechaHasta = new Date(filtros.fechaHasta);
      fechaHasta.setHours(23, 59, 59, 999);
      if (fechaRegistro > fechaHasta) return false;
    }

    // Filtros de días abierto
    if (filtros.diasAbiertoMinimo && caso.diasAbierto < parseInt(filtros.diasAbiertoMinimo)) return false;
    if (filtros.diasAbiertoMaximo && caso.diasAbierto > parseInt(filtros.diasAbiertoMaximo)) return false;

    // Filtros de tiempo de resolución
    if (filtros.tiempoResolucionMinimo && caso.tiempoResolucion && caso.tiempoResolucion < parseFloat(filtros.tiempoResolucionMinimo)) return false;
    if (filtros.tiempoResolucionMaximo && caso.tiempoResolucion && caso.tiempoResolucion > parseFloat(filtros.tiempoResolucionMaximo)) return false;

    // Filtros de escalado y retraso
    if (filtros.escalado === 'true' && !caso.escalado) return false;
    if (filtros.escalado === 'false' && caso.escalado) return false;
    if (filtros.retrasado === 'true' && !caso.retrasado) return false;
    if (filtros.retrasado === 'false' && caso.retrasado) return false;

    return true;
  };

  // Función para verificar si una encuesta cumple con los filtros
  const cumpleFiltrosEncuesta = (encuesta) => {
    // Búsqueda general
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      const textoCompleto = [
        encuesta.casoId,
        encuesta.nombreUsuario,
        encuesta.nombreTecnico,
        encuesta.areaTecnica,
        encuesta.tipoCaso,
        encuesta.prioridad,
        encuesta.observaciones,
        encuesta.satisfaccionGeneral?.toString(),
        encuesta.promedioRespuestas?.toString(),
        encuesta.tiempoResolucion?.toString(),
        ...encuesta.respuestas.map(r => r.pregunta + ' ' + r.respuesta)
      ].join(' ').toLowerCase();
      
      if (!textoCompleto.includes(busqueda)) return false;
    }

    // Filtros específicos
    if (filtros.areaTecnica && encuesta.areaTecnica !== filtros.areaTecnica) return false;
    if (filtros.tecnico && encuesta.nombreTecnico !== filtros.tecnico) return false;

    // Filtros de satisfacción
    if (filtros.satisfaccionMinima && encuesta.satisfaccionGeneral < parseFloat(filtros.satisfaccionMinima)) return false;
    if (filtros.satisfaccionMaxima && encuesta.satisfaccionGeneral > parseFloat(filtros.satisfaccionMaxima)) return false;

    // Filtros de calificación
    if (filtros.calificacion) {
      const calificacionNum = parseInt(filtros.calificacion.split('(')[1].split('★')[0]);
      if (encuesta.satisfaccionGeneral !== calificacionNum) return false;
    }

    // Filtros de nivel de satisfacción
    if (filtros.nivelSatisfaccion) {
      const nivel = filtros.nivelSatisfaccion;
      let cumple = false;
      
      if (nivel === 'Excelente' && encuesta.satisfaccionGeneral >= 5) cumple = true;
      else if (nivel === 'Buena' && encuesta.satisfaccionGeneral >= 4 && encuesta.satisfaccionGeneral < 5) cumple = true;
      else if (nivel === 'Regular' && encuesta.satisfaccionGeneral >= 3 && encuesta.satisfaccionGeneral < 4) cumple = true;
      else if (nivel === 'Mala' && encuesta.satisfaccionGeneral < 3) cumple = true;
      
      if (!cumple) return false;
    }

    // Filtros de fechas
    if (filtros.fechaDesde) {
      const fechaEncuesta = new Date(encuesta.fechaEncuesta);
      const fechaDesde = new Date(filtros.fechaDesde);
      if (fechaEncuesta < fechaDesde) return false;
    }
    if (filtros.fechaHasta) {
      const fechaEncuesta = new Date(encuesta.fechaEncuesta);
      const fechaHasta = new Date(filtros.fechaHasta);
      fechaHasta.setHours(23, 59, 59, 999);
      if (fechaEncuesta > fechaHasta) return false;
    }

    return true;
  };

  // Casos y encuestas filtrados
  const casosFiltrados = useMemo(() => {
    if (!data?.casosDetallados) return [];
    return data.casosDetallados.filter(cumpleFiltrosCaso);
  }, [data, filtros]);

  const encuestasFiltradas = useMemo(() => {
    if (!data?.encuestasDetalladas) return [];
    return data.encuestasDetalladas.filter(cumpleFiltrosEncuesta);
  }, [data, filtros]);

  // Calcular estadísticas con datos filtrados
  const estadisticasCalculadas = useMemo(() => {
    if (!data) return null;

    const casosFiltrados = data.casosDetallados?.filter(cumpleFiltrosCaso) || [];
    const encuestasFiltradas = data.encuestasDetalladas?.filter(cumpleFiltrosEncuesta) || [];

    const totalCasos = casosFiltrados.length;
    const casosAbiertos = casosFiltrados.filter(c => c.estado === 'Abierto' || c.estado === 'En Proceso').length;
    const casosCerrados = casosFiltrados.filter(c => c.estado === 'Cerrado').length;
    const casosEscalados = casosFiltrados.filter(c => c.escalado).length;
    const casosRetrasados = casosFiltrados.filter(c => c.retrasado).length;

    const satisfaccionPromedio = encuestasFiltradas.length > 0 
      ? encuestasFiltradas.reduce((sum, e) => sum + e.satisfaccionGeneral, 0) / encuestasFiltradas.length 
      : 0;

    const tiempoPromedioResolucion = casosFiltrados.filter(c => c.tiempoResolucion).length > 0
      ? casosFiltrados.filter(c => c.tiempoResolucion).reduce((sum, c) => sum + c.tiempoResolucion, 0) / casosFiltrados.filter(c => c.tiempoResolucion).length
      : 0;

    return {
      totalCasos,
      casosAbiertos,
      casosCerrados,
      casosEscalados,
      casosRetrasados,
      casosPendientes: casosAbiertos + casosEscalados,
      eficienciaResolucion: totalCasos > 0 ? ((casosCerrados / totalCasos) * 100).toFixed(1) : 0,
      satisfaccionPromedio: satisfaccionPromedio.toFixed(1),
      tiempoPromedioResolucion: tiempoPromedioResolucion.toFixed(1),
      casosPorDia: totalCasos > 0 ? (totalCasos / 30).toFixed(1) : 0,
      satisfaccionPorcentaje: ((satisfaccionPromedio / 5) * 100).toFixed(1),
      casosResueltosHoy: casosFiltrados.filter(c => {
        const hoy = new Date();
        const fechaFin = c.fechaFin ? new Date(c.fechaFin) : null;
        return fechaFin && fechaFin.toDateString() === hoy.toDateString();
      }).length,
      casosNuevosHoy: casosFiltrados.filter(c => {
        const hoy = new Date();
        const fechaRegistro = new Date(c.fechaRegistro);
        return fechaRegistro.toDateString() === hoy.toDateString();
      }).length,
      tecnicosDisponibles: data.estadisticasGenerales.tecnicosDisponibles,
      totalTecnicos: data.estadisticasGenerales.totalTecnicos
    };
  }, [data, filtros]);

  return {
    data,
    estadisticas: estadisticasCalculadas,
    loading,
    error,
    tecnicos: mockTecnicos,
    areas: mockAreas,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    casosFiltrados,
    encuestasFiltradas
  };
};
