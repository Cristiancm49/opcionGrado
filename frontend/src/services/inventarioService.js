import api from './api';

export const ubicacionesService = {
  getAll: () => api.get('/inventario/ubicaciones'),
  getById: (id) => api.get(`/inventario/ubicaciones/${id}`),
  create: (data) => api.post('/inventario/ubicaciones', data),
  update: (id, data) => api.put(`/inventario/ubicaciones/${id}`, data),
};

export const inventariosService = {
  getAll: () => api.get('/inventario/inventarios'),
  getById: (id) => api.get(`/inventario/inventarios/${id}`),
  create: (data) => api.post('/inventario/inventarios', data),
  update: (id, data) => api.put(`/inventario/inventarios/${id}`, data),
};

export const activosService = {
  getAll: () => api.get('/inventario/activos'),
  getById: (id) => api.get(`/inventario/activos/${id}`),
  create: (data) => api.post('/inventario/activos', data),
  update: (id, data) => api.put(`/inventario/activos/${id}`, data),
};

export const componentesService = {
  getAll: () => api.get('/inventario/componentes'),
  getById: (id) => api.get(`/inventario/componentes/${id}`),
  create: (data) => api.post('/inventario/componentes', data),
  update: (id, data) => api.put(`/inventario/componentes/${id}`, data),
};

export const consumiblesService = {
  getAll: () => api.get('/inventario/consumibles'),
  getById: (id) => api.get(`/inventario/consumibles/${id}`),
  create: (data) => api.post('/inventario/consumibles', data),
  update: (id, data) => api.put(`/inventario/consumibles/${id}`, data),
};

export const hojaVidaActivoService = {
  getAll: () => api.get('/inventario/hoja-vida-activo'),
  getById: (id) => api.get(`/inventario/hoja-vida-activo/${id}`),
  getByActivo: (idActivo) => api.get(`/inventario/hoja-vida-activo/activo/${idActivo}`),
  create: (data) => api.post('/inventario/hoja-vida-activo', data),
  update: (id, data) => api.put(`/inventario/hoja-vida-activo/${id}`, data),
};

export const inventarioService = {
  ubicaciones: ubicacionesService,
  inventarios: inventariosService,
  activos: activosService,
  componentes: componentesService,
  consumibles: consumiblesService,
  hojaVidaActivo: hojaVidaActivoService,
};

export default inventarioService;
