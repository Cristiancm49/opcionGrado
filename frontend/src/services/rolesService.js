import api from './api';

const BASE_PATH = '/acceso/roles';

export const rolesService = {
  getAll: () => api.get(BASE_PATH),
  getById: (id) => api.get(`${BASE_PATH}/${id}`),
  create: (data) => api.post(BASE_PATH, data),
  update: (id, data) => api.put(`${BASE_PATH}/${id}`, data),

  async getEstadisticas(usuarios = []) {
    try {
      const response = await this.getAll();
      const roles = response.data || [];
      
      const rolesConUsuarios = new Set(usuarios.map(u => u.idRol));
      const conUsuarios = roles.filter(r => rolesConUsuarios.has(r.id)).length;
      const sinUsuarios = roles.length - conUsuarios;

      return {
        total: roles.length,
        conUsuarios,
        sinUsuarios,
        roles,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas de roles:', error);
      throw error;
    }
  },
};

export default rolesService;
