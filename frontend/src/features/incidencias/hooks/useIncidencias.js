// Hook personalizado para manejar la lógica de incidencias

import { useState, useEffect } from 'react';
import { incidenciasData } from '../data/incidenciasData';

export const useIncidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [showEncuestaModal, setShowEncuestaModal] = useState(false);
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    estadoGeneral: 'ACTIVOS', // ACTIVOS, RESUELTOS, TODOS
    prioridad: '',
    areaTecnica: '',
    estadoEspecifico: '',
    fechaDesde: '',
    fechaHasta: '',
    tecnico: '',
    calificacion: '',
    slaStatus: ''
  });

  useEffect(() => {
    const cargarIncidencias = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIncidencias(incidenciasData);
      const incidenciasActivas = incidenciasData.filter(incidencia => incidencia.estado === 'Activo');
      setIncidenciasFiltradas(incidenciasActivas);
      setLoading(false);
    };
    cargarIncidencias();
  }, []);

  // Función para cambiar el estado general
  const cambiarEstadoGeneral = (nuevoEstado) => {
    setFiltros(prev => ({ ...prev, estadoGeneral: nuevoEstado }));
    
    let incidenciasFiltradas = [];
    switch(nuevoEstado) {
      case 'ACTIVOS':
        incidenciasFiltradas = incidencias.filter(incidencia => incidencia.estado === 'Activo');
        break;
      case 'RESUELTOS':
        incidenciasFiltradas = incidencias.filter(incidencia => incidencia.estado === 'Resuelto');
        break;
      case 'TODOS':
        incidenciasFiltradas = incidencias;
        break;
      default:
        incidenciasFiltradas = incidencias;
    }
    
    setIncidenciasFiltradas(incidenciasFiltradas);
  };

  // Función para aplicar filtros
  const aplicarFiltros = () => {
    let resultado = [...incidencias];

    // Filtro por estado general
    if (filtros.estadoGeneral === 'ACTIVOS') {
      resultado = resultado.filter(incidencia => incidencia.estado === 'Activo');
    } else if (filtros.estadoGeneral === 'RESUELTOS') {
      resultado = resultado.filter(incidencia => incidencia.estado === 'Resuelto');
    }

    // Filtro por búsqueda
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(incidencia =>
        incidencia.numeroCaso.toLowerCase().includes(busqueda) ||
        incidencia.solicitante.toLowerCase().includes(busqueda) ||
        incidencia.descripcion.toLowerCase().includes(busqueda) ||
        incidencia.dependencia.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por prioridad
    if (filtros.prioridad) {
      resultado = resultado.filter(incidencia => incidencia.prioridad === filtros.prioridad);
    }

    // Filtro por área técnica
    if (filtros.areaTecnica) {
      resultado = resultado.filter(incidencia => incidencia.areaTecnica === filtros.areaTecnica);
    }

    // Filtro por estado específico
    if (filtros.estadoEspecifico) {
      resultado = resultado.filter(incidencia => incidencia.estado === filtros.estadoEspecifico);
    }

    // Filtro por técnico
    if (filtros.tecnico) {
      resultado = resultado.filter(incidencia => incidencia.tecnicoAsignado === filtros.tecnico);
    }

    // Filtro por SLA
    if (filtros.slaStatus) {
      resultado = resultado.filter(incidencia => incidencia.slaStatus === filtros.slaStatus);
    }

    // Filtro por calificación (solo para resueltos)
    if (filtros.calificacion && filtros.estadoGeneral === 'RESUELTOS') {
      resultado = resultado.filter(incidencia => incidencia.calificacion === parseInt(filtros.calificacion));
    }

    // Filtro por fechas
    if (filtros.fechaDesde) {
      resultado = resultado.filter(incidencia => incidencia.fechaRegistro >= filtros.fechaDesde);
    }
    if (filtros.fechaHasta) {
      resultado = resultado.filter(incidencia => incidencia.fechaRegistro <= filtros.fechaHasta);
    }

    setIncidenciasFiltradas(resultado);
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      estadoGeneral: 'ACTIVOS',
      prioridad: '',
      areaTecnica: '',
      estadoEspecifico: '',
      fechaDesde: '',
      fechaHasta: '',
      tecnico: '',
      calificacion: '',
      slaStatus: ''
    });
    const incidenciasActivas = incidencias.filter(incidencia => incidencia.estado === 'Activo');
    setIncidenciasFiltradas(incidenciasActivas);
  };

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Estadísticas
  const estadisticas = {
    total: incidencias.length,
    activos: incidencias.filter(incidencia => incidencia.estado === 'Activo').length,
    resueltos: incidencias.filter(incidencia => incidencia.estado === 'Resuelto').length,
    criticos: incidencias.filter(incidencia => incidencia.prioridad === 'Crítica').length,
    vencidos: incidencias.filter(incidencia => incidencia.slaStatus === 'Vencido').length,
    promedioCalificacion: incidencias
      .filter(incidencia => incidencia.calificacion)
      .reduce((acc, incidencia) => acc + incidencia.calificacion, 0) / 
      incidencias.filter(incidencia => incidencia.calificacion).length || 0
  };

  return {
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
  };
};