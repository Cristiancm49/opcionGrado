// src/features/configuracion/GestionRoles.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { rolesService } from '../../services';
import Swal from 'sweetalert2';
import { 
  Shield, 
  Plus, 
  Edit2, 
  ArrowLeft,
  Search,
  RefreshCw,
  Loader2,
  FileText
} from 'lucide-react';

const GestionRoles = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  // Estados
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rolEditando, setRolEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Form state - Campos reales del backend
  const [formData, setFormData] = useState({
    nombreRol: '',
    descripcion: ''
  });

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  // Abrir modal si viene con ?crear=true
  useEffect(() => {
    if (searchParams.get('crear') === 'true') {
      abrirModalCrear();
    }
  }, [searchParams]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const rolesRes = await rolesService.getAll();
      setRoles(rolesRes.data || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const abrirModalCrear = () => {
    setRolEditando(null);
    setFormData({
      nombreRol: '',
      descripcion: ''
    });
    setModalAbierto(true);
  };

  const abrirModalEditar = (rol) => {
    setRolEditando(rol);
    setFormData({
      nombreRol: rol.nombreRol || '',
      descripcion: rol.descripcion || ''
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRolEditando(null);
    setFormData({ nombreRol: '', descripcion: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const guardarRol = async (e) => {
    e.preventDefault();
    
    if (!formData.nombreRol.trim()) {
      Swal.fire('Error', 'El nombre del rol es requerido', 'error');
      return;
    }

    setGuardando(true);
    try {
      if (rolEditando) {
        await rolesService.update(rolEditando.id, formData);
        Swal.fire('Éxito', 'Rol actualizado correctamente', 'success');
      } else {
        await rolesService.create(formData);
        Swal.fire('Éxito', 'Rol creado correctamente', 'success');
      }
      
      cerrarModal();
      cargarDatos();
    } catch (error) {
      console.error('Error guardando rol:', error);
      Swal.fire('Error', error.message || 'No se pudo guardar el rol', 'error');
    } finally {
      setGuardando(false);
    }
  };

  // Filtrar roles
  const rolesFiltrados = roles.filter(r => 
    r.nombreRol?.toLowerCase().includes(filtro.toLowerCase()) ||
    r.descripcion?.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className={themeClasses.secondaryText}>Cargando roles...</p>
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
              Gestión de Roles
            </h1>
            <p className={themeClasses.secondaryText}>
              {roles.length} roles registrados
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
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Rol</span>
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className={`${themeClasses.sidebarBg} rounded-xl p-4 shadow-lg border border-gray-200`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Grid de roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rolesFiltrados.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className={themeClasses.secondaryText}>No se encontraron roles</p>
          </div>
        ) : (
          rolesFiltrados.map((rol) => (
            <div 
              key={rol.id} 
              className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  ID: {rol.id}
                </span>
              </div>
              
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} mb-2`}>
                {rol.nombreRol}
              </h3>
              
              {rol.descripcion && (
                <p className={`text-sm ${themeClasses.secondaryText} mb-4 line-clamp-2`}>
                  {rol.descripcion}
                </p>
              )}

              {rol.fechaCreacion && (
                <p className={`text-xs ${themeClasses.secondaryText} mb-4`}>
                  Creado: {new Date(rol.fechaCreacion).toLocaleDateString()}
                </p>
              )}
              
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={() => abrirModalEditar(rol)}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Crear/Editar */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-2xl w-full max-w-md mx-4`}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">
                {rolEditando ? 'Editar Rol' : 'Nuevo Rol'}
              </h3>
            </div>
            
            <form onSubmit={guardarRol} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Nombre del Rol *
                </label>
                <input
                  type="text"
                  name="nombreRol"
                  value={formData.nombreRol}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Ej: Administrador, Técnico..."
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Descripción del rol..."
                />
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
                  className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
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

export default GestionRoles;
