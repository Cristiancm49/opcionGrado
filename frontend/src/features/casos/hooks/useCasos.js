// frontend/src/features/casos/hooks/useCasos.js
// Hook personalizado para manejar la lógica de casos técnicos

import { useState, useEffect } from 'react';
import { casosParaTecnicos } from '../data/casosData';

export const useCasos = () => {
  const [casos, setCasos] = useState([]);
  const [casosFiltrados, setCasosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estadoTecnico: 'ASIGNADOS', // ASIGNADOS, EN_PROCESO, PENDIENTES, RESUELTOS, TODOS
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
      // Aplicar filtro inicial (solo asignados)
      const casosAsignados = casosParaTecnicos.filter(caso => caso.estadoTecnico === 'ASIGNADO');
      setCasosFiltrados(casosAsignados);
      setLoading(false);
    };

    cargarCasos();
  }, []);

  // Aplicar filtros
  const aplicarFiltros = () => {
    let resultado = [...casos];

    // FILTRO PRINCIPAL POR ESTADO TÉCNICO
    if (filtros.estadoTecnico === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (filtros.estadoTecnico === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (filtros.estadoTecnico === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (filtros.estadoTecnico === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
    }
    // Si es 'TODOS', no filtramos

    // Resto de filtros
    if (filtros.busqueda) {
      resultado = resultado.filter(caso => 
        caso.numeroCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.solicitante.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        (caso.diagnostico && caso.diagnostico.toLowerCase().includes(filtros.busqueda.toLowerCase()))
      );
    }

    if (filtros.prioridad) {
      resultado = resultado.filter(caso => caso.prioridad === filtros.prioridad);
    }

    if (filtros.areaTecnica) {
      resultado = resultado.filter(caso => caso.areaTecnica === filtros.areaTecnica);
    }

    if (filtros.slaStatus) {
      resultado = resultado.filter(caso => caso.slaStatus === filtros.slaStatus);
    }

    if (filtros.solicitante) {
      resultado = resultado.filter(caso => 
        caso.solicitante.toLowerCase().includes(filtros.solicitante.toLowerCase())
      );
    }

    if (filtros.tipoTrabajo) {
      resultado = resultado.filter(caso => caso.tipoTrabajo === filtros.tipoTrabajo);
    }

    if (filtros.fechaDesde) {
      resultado = resultado.filter(caso => 
        new Date(caso.fechaRegistro) >= new Date(filtros.fechaDesde)
      );
    }

    if (filtros.fechaHasta) {
      resultado = resultado.filter(caso => 
        new Date(caso.fechaRegistro) <= new Date(filtros.fechaHasta)
      );
    }

    setCasosFiltrados(resultado);
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    const estadoActual = filtros.estadoTecnico;
    setFiltros({
      busqueda: '',
      estadoTecnico: estadoActual,
      prioridad: '',
      areaTecnica: '',
      slaStatus: '',
      fechaDesde: '',
      fechaHasta: '',
      solicitante: '',
      tipoTrabajo: ''
    });
    
    // Reaplica solo el filtro de estado técnico
    let resultado = [...casos];
    if (estadoActual === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (estadoActual === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (estadoActual === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (estadoActual === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
    }
    setCasosFiltrados(resultado);
  };

  // Cambiar estado técnico
  const cambiarEstadoTecnico = (nuevoEstado) => {
    setFiltros(prev => ({ ...prev, estadoTecnico: nuevoEstado }));
    
    let resultado = [...casos];
    if (nuevoEstado === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (nuevoEstado === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (nuevoEstado === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (nuevoEstado === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
    }
    
    setCasosFiltrados(resultado);
  };

  return {
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
  };
};

