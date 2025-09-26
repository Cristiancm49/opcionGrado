import { useState, useEffect } from 'react';
import { casosParaTecnicos, opcionesFiltros } from '../data/casosData';

export const useCasos = () => {
  const [casos, setCasos] = useState([]);
  const [casosFiltrados, setCasosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estadoTecnico: 'ASIGNADOS',
    prioridad: '',
    areaTecnica: '',
    slaStatus: '',
    fechaDesde: '',
    fechaHasta: '',
    solicitante: '',
    tipoTrabajo: ''
  });

  // Cargar casos iniciales
  useEffect(() => {
    const cargarCasos = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCasos(casosParaTecnicos);
      setLoading(false);
    };

    cargarCasos();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let casosFiltrados = [...casos];

    // Filtro de búsqueda general
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      casosFiltrados = casosFiltrados.filter(caso =>
        caso.numeroCaso.toLowerCase().includes(busqueda) ||
        caso.solicitante.toLowerCase().includes(busqueda) ||
        caso.descripcion.toLowerCase().includes(busqueda) ||
        caso.dependencia.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por estado técnico
    if (filtros.estadoTecnico && filtros.estadoTecnico !== 'TODOS') {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.estadoTecnico === filtros.estadoTecnico
      );
    }

    // Filtro por prioridad
    if (filtros.prioridad) {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.prioridad === filtros.prioridad
      );
    }

    // Filtro por área técnica
    if (filtros.areaTecnica) {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.areaTecnica === filtros.areaTecnica
      );
    }

    // Filtro por SLA
    if (filtros.slaStatus) {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.slaStatus === filtros.slaStatus
      );
    }

    // Filtro por tipo de trabajo
    if (filtros.tipoTrabajo) {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.tipoTrabajo === filtros.tipoTrabajo
      );
    }

    // Filtro por fecha desde
    if (filtros.fechaDesde) {
      casosFiltrados = casosFiltrados.filter(caso => 
        new Date(caso.fechaRegistro) >= new Date(filtros.fechaDesde)
      );
    }

    // Filtro por fecha hasta
    if (filtros.fechaHasta) {
      casosFiltrados = casosFiltrados.filter(caso => 
        new Date(caso.fechaRegistro) <= new Date(filtros.fechaHasta)
      );
    }

    // Filtro por solicitante
    if (filtros.solicitante) {
      casosFiltrados = casosFiltrados.filter(caso => 
        caso.solicitante.toLowerCase().includes(filtros.solicitante.toLowerCase())
      );
    }

    setCasosFiltrados(casosFiltrados);
  }, [casos, filtros]);

  // Actualizar filtros
  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      estadoTecnico: 'ASIGNADOS',
      prioridad: '',
      areaTecnica: '',
      slaStatus: '',
      fechaDesde: '',
      fechaHasta: '',
      solicitante: '',
      tipoTrabajo: ''
    });
  };

  // Aplicar filtros
  const aplicarFiltros = () => {
    // Los filtros se aplican automáticamente en el useEffect
    // Esta función puede usarse para lógica adicional si es necesario
  };

  // Estadísticas
  const estadisticas = {
    total: casos.length,
    asignados: casos.filter(c => c.estadoTecnico === 'ASIGNADO').length,
    enProceso: casos.filter(c => c.estadoTecnico === 'EN_PROCESO').length,
    pendientes: casos.filter(c => c.estadoTecnico === 'PENDIENTE').length,
    resueltos: casos.filter(c => c.estadoTecnico === 'RESUELTO').length,
    vencidos: casos.filter(c => c.slaStatus === 'Vencido').length,
    enRiesgo: casos.filter(c => c.slaStatus === 'En Riesgo').length
  };

  return {
    casos,
    casosFiltrados,
    loading,
    filtros,
    opcionesFiltros,
    estadisticas,
    actualizarFiltros,
    limpiarFiltros,
    aplicarFiltros
  };
};
