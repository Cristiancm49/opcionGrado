import api from './api';

export const estadosGeneralesService = {
  getAll: () => api.get('/catalogo/estados-generales'),
  getById: (id) => api.get(`/catalogo/estados-generales/${id}`),
  create: (data) => api.post('/catalogo/estados-generales', data),
  update: (id, data) => api.put(`/catalogo/estados-generales/${id}`, data),
};

export const estadosCasoService = {
  getAll: () => api.get('/catalogo/estados-caso'),
  getById: (id) => api.get(`/catalogo/estados-caso/${id}`),
  create: (data) => api.post('/catalogo/estados-caso', data),
  update: (id, data) => api.put(`/catalogo/estados-caso/${id}`, data),
};

export const estadosActivoService = {
  getAll: () => api.get('/catalogo/estados-activo'),
  getById: (id) => api.get(`/catalogo/estados-activo/${id}`),
  create: (data) => api.post('/catalogo/estados-activo', data),
  update: (id, data) => api.put(`/catalogo/estados-activo/${id}`, data),
};

export const estadosConsumibleService = {
  getAll: () => api.get('/catalogo/estados-consumible'),
  getById: (id) => api.get(`/catalogo/estados-consumible/${id}`),
  create: (data) => api.post('/catalogo/estados-consumible', data),
  update: (id, data) => api.put(`/catalogo/estados-consumible/${id}`, data),
};

export const estadosIntervencionService = {
  getAll: () => api.get('/catalogo/estados-intervencion'),
  getById: (id) => api.get(`/catalogo/estados-intervencion/${id}`),
  create: (data) => api.post('/catalogo/estados-intervencion', data),
  update: (id, data) => api.put(`/catalogo/estados-intervencion/${id}`, data),
};

export const areasTecnicasService = {
  getAll: () => api.get('/catalogo/areas-tecnicas'),
  getById: (id) => api.get(`/catalogo/areas-tecnicas/${id}`),
  create: (data) => api.post('/catalogo/areas-tecnicas', data),
  update: (id, data) => api.put(`/catalogo/areas-tecnicas/${id}`, data),
};

export const canalesIngresoService = {
  getAll: () => api.get('/catalogo/canales-ingreso'),
  getById: (id) => api.get(`/catalogo/canales-ingreso/${id}`),
  create: (data) => api.post('/catalogo/canales-ingreso', data),
  update: (id, data) => api.put(`/catalogo/canales-ingreso/${id}`, data),
};

export const prioridadesService = {
  getAll: () => api.get('/catalogo/prioridades'),
  getById: (id) => api.get(`/catalogo/prioridades/${id}`),
  create: (data) => api.post('/catalogo/prioridades', data),
  update: (id, data) => api.put(`/catalogo/prioridades/${id}`, data),
};

export const tiposCasoService = {
  getAll: () => api.get('/catalogo/tipos-caso'),
  getById: (id) => api.get(`/catalogo/tipos-caso/${id}`),
  create: (data) => api.post('/catalogo/tipos-caso', data),
  update: (id, data) => api.put(`/catalogo/tipos-caso/${id}`, data),
};

export const tiposTrabajoService = {
  getAll: () => api.get('/catalogo/tipos-trabajo'),
  getById: (id) => api.get(`/catalogo/tipos-trabajo/${id}`),
  create: (data) => api.post('/catalogo/tipos-trabajo', data),
  update: (id, data) => api.put(`/catalogo/tipos-trabajo/${id}`, data),
};

export const categoriasActivoService = {
  getAll: () => api.get('/catalogo/categorias-activo'),
  getById: (id) => api.get(`/catalogo/categorias-activo/${id}`),
  create: (data) => api.post('/catalogo/categorias-activo', data),
  update: (id, data) => api.put(`/catalogo/categorias-activo/${id}`, data),
};

export const tiposConsumibleService = {
  getAll: () => api.get('/catalogo/tipos-consumible'),
  getById: (id) => api.get(`/catalogo/tipos-consumible/${id}`),
  create: (data) => api.post('/catalogo/tipos-consumible', data),
  update: (id, data) => api.put(`/catalogo/tipos-consumible/${id}`, data),
};

export const catalogosService = {
  async getEstadisticas() {
    try {
      const [
        estadosGenerales,
        estadosCaso,
        estadosActivo,
        estadosConsumible,
        estadosIntervencion,
        areasTecnicas,
        canalesIngreso,
        prioridades,
        tiposCaso,
        tiposTrabajo,
        categoriasActivo,
        tiposConsumible,
      ] = await Promise.all([
        estadosGeneralesService.getAll(),
        estadosCasoService.getAll(),
        estadosActivoService.getAll(),
        estadosConsumibleService.getAll(),
        estadosIntervencionService.getAll(),
        areasTecnicasService.getAll(),
        canalesIngresoService.getAll(),
        prioridadesService.getAll(),
        tiposCasoService.getAll(),
        tiposTrabajoService.getAll(),
        categoriasActivoService.getAll(),
        tiposConsumibleService.getAll(),
      ]);

      const catalogos = [
        { nombre: 'Estados Generales', tabla: 'ESTADO_GENERAL', datos: estadosGenerales.data || [], tipo: 'estadosGenerales' },
        { nombre: 'Estados de Caso', tabla: 'ESTADO_CASO', datos: estadosCaso.data || [], tipo: 'estadosCaso' },
        { nombre: 'Estados de Activo', tabla: 'ESTADO_ACTIVO', datos: estadosActivo.data || [], tipo: 'estadosActivo' },
        { nombre: 'Estados de Consumible', tabla: 'ESTADO_CONSUMIBLE', datos: estadosConsumible.data || [], tipo: 'estadosConsumible' },
        { nombre: 'Estados de Intervención', tabla: 'ESTADO_INTERVENCION', datos: estadosIntervencion.data || [], tipo: 'estadosIntervencion' },
        { nombre: 'Áreas Técnicas', tabla: 'AREA_TECNICA', datos: areasTecnicas.data || [], tipo: 'areasTecnicas' },
        { nombre: 'Canales de Ingreso', tabla: 'CANAL_INGRESO', datos: canalesIngreso.data || [], tipo: 'canalesIngreso' },
        { nombre: 'Prioridades', tabla: 'PRIORIDAD', datos: prioridades.data || [], tipo: 'prioridades' },
        { nombre: 'Tipos de Caso', tabla: 'TIPO_CASO', datos: tiposCaso.data || [], tipo: 'tiposCaso' },
        { nombre: 'Tipos de Trabajo', tabla: 'TIPOTRABAJO', datos: tiposTrabajo.data || [], tipo: 'tiposTrabajo' },
        { nombre: 'Categorías de Activo', tabla: 'CATEGORIA_ACTIVO', datos: categoriasActivo.data || [], tipo: 'categoriasActivo' },
        { nombre: 'Tipos de Consumible', tabla: 'TIPO_CONSUMIBLE', datos: tiposConsumible.data || [], tipo: 'tiposConsumible' },
      ];

      const totalRegistros = catalogos.reduce((acc, cat) => acc + cat.datos.length, 0);

      return {
        catalogos,
        totalTablas: catalogos.length,
        totalRegistros,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas de catálogos:', error);
      throw error;
    }
  },
};

export default catalogosService;
