// src/features/configuracion/GestionUsuarios.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { usuariosService, rolesService } from '../../services';
import Swal from 'sweetalert2';
import { 
  Users, 
  Plus, 
  Edit2, 
  ArrowLeft,
  Search,
  RefreshCw,
  Loader2,
  Mail,
  Phone,
  Shield
} from 'lucide-react';

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  // Estados
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Form state - Campos reales del backend
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    idRol: ''
  });

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  // Abrir modal si viene con ?crear=true
  useEffect(() => {
    if (searchParams.get('crear') === 'true' && roles.length > 0) {
      abrirModalCrear();
    }
  }, [searchParams, roles]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [usuariosRes, rolesRes] = await Promise.all([
        usuariosService.getAll(),
        rolesService.getAll()
      ]);
      
      setUsuarios(usuariosRes.data || []);
      setRoles(rolesRes.data || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const abrirModalCrear = () => {
    setUsuarioEditando(null);
    setFormData({
      nombreCompleto: '',
      email: '',
      telefono: '',
      idRol: roles[0]?.id || ''
    });
    setModalAbierto(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nombreCompleto: usuario.nombreCompleto || '',
      email: usuario.email || '',
      telefono: usuario.telefono || '',
      idRol: usuario.idRol || ''
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
    setFormData({ nombreCompleto: '', email: '', telefono: '', idRol: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    
    if (!formData.nombreCompleto.trim() || !formData.email.trim()) {
      Swal.fire('Error', 'Nombre y correo son requeridos', 'error');
      return;
    }

    setGuardando(true);
    try {
      const dataToSend = {
        ...formData,
        idRol: parseInt(formData.idRol)
      };

      if (usuarioEditando) {
        await usuariosService.update(usuarioEditando.id, dataToSend);
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
      } else {
        await usuariosService.create(dataToSend);
        Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
      }
      
      cerrarModal();
      cargarDatos();
    } catch (error) {
      console.error('Error guardando usuario:', error);
      Swal.fire('Error', error.message || 'No se pudo guardar el usuario', 'error');
    } finally {
      setGuardando(false);
    }
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(u => 
    u.nombreCompleto?.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email?.toLowerCase().includes(filtro.toLowerCase()) ||
    u.nombreRol?.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className={themeClasses.secondaryText}>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/admin/configuracion-sistema')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              Gestión de Usuarios
            </h1>
            <p className={themeClasses.secondaryText}>
              {usuarios.length} usuarios registrados
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={cargarDatos}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
          <button 
            onClick={abrirModalCrear}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className={`${themeClasses.sidebarBg} rounded-xl p-4 shadow-lg border border-gray-200`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o rol..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className={themeClasses.secondaryText}>No se encontraron usuarios</p>
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {usuario.nombreCompleto?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className={`font-medium ${themeClasses.primaryText}`}>
                          {usuario.nombreCompleto}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className={themeClasses.secondaryText}>{usuario.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className={themeClasses.secondaryText}>{usuario.telefono || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className={themeClasses.primaryText}>{usuario.nombreRol || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => abrirModalEditar(usuario)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-2xl w-full max-w-md mx-4`}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">
                {usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
            </div>
            
            <form onSubmit={guardarUsuario} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre del usuario"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Correo *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3001234567"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Rol *
                </label>
                <select
                  name="idRol"
                  value={formData.idRol}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Seleccionar rol...</option>
                  {roles.map(rol => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombreRol}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {guardando && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{guardando ? 'Guardando...' : 'Guardar'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;
