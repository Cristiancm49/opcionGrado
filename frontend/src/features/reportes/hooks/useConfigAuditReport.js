import { useState, useEffect } from 'react';
import { mockAuditLogs, mockUsuarios, mockAcciones, mockEntidades } from '../data/configAuditData';

export const useConfigAuditReport = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    usuario: '',
    accion: '',
    entidad: '',
    fechaDesde: '',
    fechaHasta: '',
    busqueda: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarAuditLogs = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAuditLogs(mockAuditLogs);
        setError(null);
      } catch (err) {
        setError('Error al cargar el reporte de configuración');
      } finally {
        setLoading(false);
      }
    };

    cargarAuditLogs();
  }, []);

  // Filtrar logs de auditoría
  const auditLogsFiltrados = auditLogs.filter(log => {
    const cumpleUsuario = !filtros.usuario || log.usuario.includes(filtros.usuario);
    const cumpleAccion = !filtros.accion || log.accion === filtros.accion;
    const cumpleEntidad = !filtros.entidad || log.entidad === filtros.entidad;
    
    const cumpleFechaDesde = !filtros.fechaDesde || new Date(log.fecha) >= new Date(filtros.fechaDesde);
    const cumpleFechaHasta = !filtros.fechaHasta || new Date(log.fecha) <= new Date(filtros.fechaHasta);
    
    const cumpleBusqueda = !filtros.busqueda || 
      log.detalles.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      log.entidadNombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      log.nombreUsuario.toLowerCase().includes(filtros.busqueda.toLowerCase());

    return cumpleUsuario && cumpleAccion && cumpleEntidad && 
           cumpleFechaDesde && cumpleFechaHasta && cumpleBusqueda;
  });

  // Estadísticas para reportes
  const estadisticas = {
    totalCambios: auditLogs.length,
    cambiosHoy: auditLogs.filter(log => {
      const hoy = new Date().toDateString();
      return new Date(log.fecha).toDateString() === hoy;
    }).length,
    cambiosEstaSemana: auditLogs.filter(log => {
      const semanaPasada = new Date();
      semanaPasada.setDate(semanaPasada.getDate() - 7);
      return new Date(log.fecha) >= semanaPasada;
    }).length,
    cambiosEsteMes: auditLogs.filter(log => {
      const mesPasado = new Date();
      mesPasado.setMonth(mesPasado.getMonth() - 1);
      return new Date(log.fecha) >= mesPasado;
    }).length,
    usuariosActivos: [...new Set(auditLogs.map(log => log.usuario))].length,
    accionesMasComunes: auditLogs.reduce((acc, log) => {
      acc[log.accion] = (acc[log.accion] || 0) + 1;
      return acc;
    }, {}),
    entidadesMasModificadas: auditLogs.reduce((acc, log) => {
      acc[log.entidad] = (acc[log.entidad] || 0) + 1;
      return acc;
    }, {}),
    cambiosPorUsuario: auditLogs.reduce((acc, log) => {
      acc[log.nombreUsuario] = (acc[log.nombreUsuario] || 0) + 1;
      return acc;
    }, {}),
    cambiosPorDia: auditLogs.reduce((acc, log) => {
      const dia = new Date(log.fecha).toDateString();
      acc[dia] = (acc[dia] || 0) + 1;
      return acc;
    }, {})
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      usuario: '',
      accion: '',
      entidad: '',
      fechaDesde: '',
      fechaHasta: '',
      busqueda: ''
    });
  };

  return {
    auditLogs: auditLogsFiltrados,
    auditLogsOriginales: auditLogs,
    loading,
    error,
    filtros,
    estadisticas,
    usuarios: mockUsuarios,
    acciones: mockAcciones,
    entidades: mockEntidades,
    actualizarFiltros,
    limpiarFiltros
  };
};
