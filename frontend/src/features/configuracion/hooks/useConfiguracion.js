// src/features/configuracion/hooks/useConfiguracion.js
// Hook para gestionar datos de configuración del sistema

import { useState, useEffect, useCallback } from 'react';
import { usuariosService, rolesService, catalogosService } from '../../../services';

export const useConfiguracion = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para datos
  const [estadisticas, setEstadisticas] = useState({
    usuarios: { total: 0, activos: 0, inactivos: 0, nuevosEsteMes: 0 },
    roles: { total: 0, conUsuarios: 0, sinUsuarios: 0 },
    catalogos: { totalTablas: 0, totalRegistros: 0, ultimaActualizacion: '-' },
  });
  
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [catalogos, setCatalogos] = useState([]);

  // Función para cargar todos los datos
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Cargar usuarios primero (necesitamos para estadísticas de roles)
      const statsUsuarios = await usuariosService.getEstadisticas();
      setUsuarios(statsUsuarios.usuarios);

      // Cargar roles con estadísticas (pasamos usuarios para calcular asignaciones)
      const statsRoles = await rolesService.getEstadisticas(statsUsuarios.usuarios);
      setRoles(statsRoles.roles);

      // Cargar catálogos
      const statsCatalogos = await catalogosService.getEstadisticas();
      setCatalogos(statsCatalogos.catalogos);

      // Actualizar estadísticas generales
      setEstadisticas({
        usuarios: {
          total: statsUsuarios.total,
          activos: statsUsuarios.activos,
          inactivos: statsUsuarios.inactivos,
          nuevosEsteMes: statsUsuarios.nuevosEsteMes,
        },
        roles: {
          total: statsRoles.total,
          conUsuarios: statsRoles.conUsuarios,
          sinUsuarios: statsRoles.sinUsuarios,
        },
        catalogos: {
          totalTablas: statsCatalogos.totalTablas,
          totalRegistros: statsCatalogos.totalRegistros,
          ultimaActualizacion: new Date().toISOString().split('T')[0],
        },
      });

    } catch (err) {
      console.error('Error cargando datos de configuración:', err);
      setError(err.message || 'Error al cargar los datos. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Función para refrescar datos
  const refrescar = () => {
    cargarDatos();
  };

  return {
    loading,
    error,
    estadisticas,
    usuarios,
    roles,
    catalogos,
    refrescar,
  };
};

export default useConfiguracion;
