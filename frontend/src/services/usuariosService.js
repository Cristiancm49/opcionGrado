import api from './api';

const BASE_PATH = '/acceso/usuarios';

export const usuariosService = {
  getAll: () => api.get(BASE_PATH),
  getById: (id) => api.get(`${BASE_PATH}/${id}`),
  create: (data) => api.post(BASE_PATH, data),
  update: (id, data) => api.put(`${BASE_PATH}/${id}`, data),

  async getEstadisticas() {
    try {
      const response = await this.getAll();
      const usuarios = response.data || [];
      
      const activos = usuarios.length;
      const inactivos = 0;
      
      const ahora = new Date();
      const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      const nuevosEsteMes = usuarios.filter(u => {
        if (!u.fechaCreacion) return false;
        const fechaCreacion = new Date(u.fechaCreacion);
        return fechaCreacion >= inicioMes;
      }).length;

      return {
        total: usuarios.length,
        activos,
        inactivos,
        nuevosEsteMes,
        usuarios,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas de usuarios:', error);
      throw error;
    }
  },
};

export default usuariosService;
