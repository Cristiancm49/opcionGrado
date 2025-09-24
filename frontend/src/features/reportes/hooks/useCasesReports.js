import { useState, useEffect } from 'react';
import { mockCasos, mockEstadosCaso, mockTiposCaso, mockPrioridades, mockAreasTecnicas, mockTecnicos } from '../data/casesReportsData';

export const useCasesReports = () => {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    estado: '',
    tipoCaso: '',
    prioridad: '',
    tecnico: '',
    areaTecnica: '',
    fechaDesde: '',
    fechaHasta: '',
    diasAbiertoMinimo: '',
    diasAbiertoMaximo: '',
    tiempoResolucionMinimo: '',
    tiempoResolucionMaximo: '',
    satisfaccionMinima: '',
    satisfaccionMaxima: '',
    busqueda: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarCasos = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCasos(mockCasos);
        setError(null);
      } catch (err) {
        setError('Error al cargar los casos');
      } finally {
        setLoading(false);
      }
    };

    cargarCasos();
  }, []);

  // Filtrar casos
  const casosFiltrados = casos.filter(caso => {
    const cumpleEstado = !filtros.estado || caso.estado === filtros.estado;
    const cumpleTipoCaso = !filtros.tipoCaso || caso.tipoCaso === filtros.tipoCaso;
    const cumplePrioridad = !filtros.prioridad || caso.prioridad === filtros.prioridad;
    const cumpleTecnico = !filtros.tecnico || caso.tecnicoAsignado === filtros.tecnico;
    const cumpleArea = !filtros.areaTecnica || caso.areaTecnica === filtros.areaTecnica;
    
    const cumpleFechaDesde = !filtros.fechaDesde || new Date(caso.fechaRegistro) >= new Date(filtros.fechaDesde);
    const cumpleFechaHasta = !filtros.fechaHasta || new Date(caso.fechaRegistro) <= new Date(filtros.fechaHasta);
    
    const cumpleDiasAbiertoMinimo = !filtros.diasAbiertoMinimo || caso.diasAbierto >= parseInt(filtros.diasAbiertoMinimo);
    const cumpleDiasAbiertoMaximo = !filtros.diasAbiertoMaximo || caso.diasAbierto <= parseInt(filtros.diasAbiertoMaximo);
    
    const cumpleTiempoMinimo = !filtros.tiempoResolucionMinimo || (caso.tiempoResolucion && caso.tiempoResolucion >= parseFloat(filtros.tiempoResolucionMinimo));
    const cumpleTiempoMaximo = !filtros.tiempoResolucionMaximo || (caso.tiempoResolucion && caso.tiempoResolucion <= parseFloat(filtros.tiempoResolucionMaximo));
    
    const cumpleSatisfaccionMinima = !filtros.satisfaccionMinima || (caso.satisfaccion && caso.satisfaccion >= parseInt(filtros.satisfaccionMinima));
    const cumpleSatisfaccionMaxima = !filtros.satisfaccionMaxima || (caso.satisfaccion && caso.satisfaccion <= parseInt(filtros.satisfaccionMaxima));
    
    const cumpleBusqueda = !filtros.busqueda || 
      // Búsqueda en campos principales
      caso.numeroCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.nombreUsuario.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.nombreTecnico.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.areaTecnica.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.tipoCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.prioridad.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.estado.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.activoAfectado?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      caso.ubicacion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      // Búsqueda en números
      caso.diasAbierto.toString().includes(filtros.busqueda) ||
      (caso.tiempoResolucion && caso.tiempoResolucion.toString().includes(filtros.busqueda)) ||
      (caso.satisfaccion && caso.satisfaccion.toString().includes(filtros.busqueda)) ||
      // Búsqueda por palabras clave de estado
      (filtros.busqueda.toLowerCase().includes('abierto') && caso.estado === 'Abierto') ||
      (filtros.busqueda.toLowerCase().includes('proceso') && caso.estado === 'En Proceso') ||
      (filtros.busqueda.toLowerCase().includes('cerrado') && caso.estado === 'Cerrado') ||
      (filtros.busqueda.toLowerCase().includes('cancelado') && caso.estado === 'Cancelado') ||
      // Búsqueda por palabras clave de prioridad
      (filtros.busqueda.toLowerCase().includes('critica') && caso.prioridad === 'Crítica') ||
      (filtros.busqueda.toLowerCase().includes('alta') && caso.prioridad === 'Alta') ||
      (filtros.busqueda.toLowerCase().includes('media') && caso.prioridad === 'Media') ||
      (filtros.busqueda.toLowerCase().includes('baja') && caso.prioridad === 'Baja') ||
      // Búsqueda por fecha (formato aproximado)
      caso.fechaRegistro.includes(filtros.busqueda);

    return cumpleEstado && cumpleTipoCaso && cumplePrioridad && cumpleTecnico && cumpleArea && 
           cumpleFechaDesde && cumpleFechaHasta && cumpleDiasAbiertoMinimo && cumpleDiasAbiertoMaximo &&
           cumpleTiempoMinimo && cumpleTiempoMaximo && cumpleSatisfaccionMinima && cumpleSatisfaccionMaxima &&
           cumpleBusqueda;
  });

  // Estadísticas para reportes
  const estadisticas = {
    totalCasos: casos.length,
    casosAbiertos: casos.filter(c => c.estado === 'Abierto').length,
    casosEnProceso: casos.filter(c => c.estado === 'En Proceso').length,
    casosCerrados: casos.filter(c => c.estado === 'Cerrado').length,
    casosCancelados: casos.filter(c => c.estado === 'Cancelado').length,
    casosEscalados: casos.filter(c => c.escalado).length,
    casosRetrasados: casos.filter(c => c.retrasado).length,
    casosActivos: casos.filter(c => c.estado === 'Abierto' || c.estado === 'En Proceso').length,
    promedioTiempoResolucion: casos.filter(c => c.tiempoResolucion).length > 0 ? 
      (casos.filter(c => c.tiempoResolucion).reduce((sum, c) => sum + c.tiempoResolucion, 0) / casos.filter(c => c.tiempoResolucion).length).toFixed(1) : 0,
    promedioDiasAbierto: casos.length > 0 ? 
      (casos.reduce((sum, c) => sum + c.diasAbierto, 0) / casos.length).toFixed(1) : 0,
    promedioSatisfaccion: casos.filter(c => c.satisfaccion).length > 0 ? 
      (casos.filter(c => c.satisfaccion).reduce((sum, c) => sum + c.satisfaccion, 0) / casos.filter(c => c.satisfaccion).length).toFixed(2) : 0,
    promedioDiasRetraso: casos.filter(c => c.retrasado).length > 0 ? 
      (casos.filter(c => c.retrasado).reduce((sum, c) => sum + c.diasRetraso, 0) / casos.filter(c => c.retrasado).length).toFixed(1) : 0,
    casosPorEstado: casos.reduce((acc, caso) => {
      acc[caso.estado] = (acc[caso.estado] || 0) + 1;
      return acc;
    }, {}),
    casosPorTipo: casos.reduce((acc, caso) => {
      acc[caso.tipoCaso] = (acc[caso.tipoCaso] || 0) + 1;
      return acc;
    }, {}),
    casosPorPrioridad: casos.reduce((acc, caso) => {
      acc[caso.prioridad] = (acc[caso.prioridad] || 0) + 1;
      return acc;
    }, {}),
    casosPorTecnico: casos.reduce((acc, caso) => {
      acc[caso.nombreTecnico] = (acc[caso.nombreTecnico] || 0) + 1;
      return acc;
    }, {}),
    casosPorArea: casos.reduce((acc, caso) => {
      acc[caso.areaTecnica] = (acc[caso.areaTecnica] || 0) + 1;
      return acc;
    }, {}),
    tiempoResolucionPorTecnico: casos.reduce((acc, caso) => {
      if (!acc[caso.nombreTecnico]) {
        acc[caso.nombreTecnico] = { total: 0, suma: 0, casos: 0 };
      }
      if (caso.tiempoResolucion) {
        acc[caso.nombreTecnico].suma += caso.tiempoResolucion;
        acc[caso.nombreTecnico].casos += 1;
        acc[caso.nombreTecnico].total = acc[caso.nombreTecnico].suma / acc[caso.nombreTecnico].casos;
      }
      return acc;
    }, {}),
    satisfaccionPorTecnico: casos.reduce((acc, caso) => {
      if (!acc[caso.nombreTecnico]) {
        acc[caso.nombreTecnico] = { total: 0, suma: 0, casos: 0 };
      }
      if (caso.satisfaccion) {
        acc[caso.nombreTecnico].suma += caso.satisfaccion;
        acc[caso.nombreTecnico].casos += 1;
        acc[caso.nombreTecnico].total = acc[caso.nombreTecnico].suma / acc[caso.nombreTecnico].casos;
      }
      return acc;
    }, {}),
    casosPorMes: casos.reduce((acc, caso) => {
      const mes = new Date(caso.fechaRegistro).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
      acc[mes] = (acc[mes] || 0) + 1;
      return acc;
    }, {}),
    casosPorEscalado: casos.reduce((acc, caso) => {
      const escalado = caso.escalado ? 'Escalado' : 'No Escalado';
      acc[escalado] = (acc[escalado] || 0) + 1;
      return acc;
    }, {}),
    casosPorNivelEscalado: casos.filter(c => c.escalado).reduce((acc, caso) => {
      acc[caso.nivelEscalado] = (acc[caso.nivelEscalado] || 0) + 1;
      return acc;
    }, {}),
    casosPorRetraso: casos.reduce((acc, caso) => {
      const retrasado = caso.retrasado ? 'Retrasado' : 'A Tiempo';
      acc[retrasado] = (acc[retrasado] || 0) + 1;
      return acc;
    }, {}),
    casosPorDiasRetraso: casos.filter(c => c.retrasado).reduce((acc, caso) => {
      const rango = caso.diasRetraso <= 2 ? '1-2 días' : 
                   caso.diasRetraso <= 5 ? '3-5 días' : 
                   caso.diasRetraso <= 10 ? '6-10 días' : 'Más de 10 días';
      acc[rango] = (acc[rango] || 0) + 1;
      return acc;
    }, {}),
    casosPorTiempoResolucion: casos.filter(c => c.tiempoResolucion).reduce((acc, caso) => {
      const rango = caso.tiempoResolucion <= 2 ? '0-2h' : 
                   caso.tiempoResolucion <= 8 ? '2-8h' : 
                   caso.tiempoResolucion <= 24 ? '8-24h' : 'Más de 24h';
      acc[rango] = (acc[rango] || 0) + 1;
      return acc;
    }, {}),
    casosPorSatisfaccion: casos.filter(c => c.satisfaccion).reduce((acc, caso) => {
      const nivel = caso.satisfaccion >= 4.5 ? 'Excelente' : 
                   caso.satisfaccion >= 3.5 ? 'Buena' : 
                   caso.satisfaccion >= 2.5 ? 'Regular' : 'Mala';
      acc[nivel] = (acc[nivel] || 0) + 1;
      return acc;
    }, {}),
    casosCriticosAbiertos: casos.filter(c => c.prioridad === 'Crítica' && (c.estado === 'Abierto' || c.estado === 'En Proceso')).length,
    casosAltaPrioridadAbiertos: casos.filter(c => c.prioridad === 'Alta' && (c.estado === 'Abierto' || c.estado === 'En Proceso')).length,
    casosPorUbicacion: casos.reduce((acc, caso) => {
      const ubicacion = caso.ubicacion.split(' - ')[0]; // Solo la parte principal
      acc[ubicacion] = (acc[ubicacion] || 0) + 1;
      return acc;
    }, {})
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      estado: '',
      tipoCaso: '',
      prioridad: '',
      tecnico: '',
      areaTecnica: '',
      fechaDesde: '',
      fechaHasta: '',
      diasAbiertoMinimo: '',
      diasAbiertoMaximo: '',
      tiempoResolucionMinimo: '',
      tiempoResolucionMaximo: '',
      satisfaccionMinima: '',
      satisfaccionMaxima: '',
      busqueda: ''
    });
  };

  return {
    casos: casosFiltrados,
    casosOriginales: casos,
    loading,
    error,
    filtros,
    estadisticas,
    estadosCaso: mockEstadosCaso,
    tiposCaso: mockTiposCaso,
    prioridades: mockPrioridades,
    areasTecnicas: mockAreasTecnicas,
    tecnicos: mockTecnicos,
    actualizarFiltros,
    limpiarFiltros
  };
};
