// src/features/configuracion/DetalleCatalogo.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import {
  estadosGeneralesService,
  estadosCasoService,
  estadosActivoService,
  estadosConsumibleService,
  estadosIntervencionService,
  areasTecnicasService,
  canalesIngresoService,
  prioridadesService,
  tiposCasoService,
  tiposTrabajoService,
  categoriasActivoService,
  tiposConsumibleService,
} from '../../services';
import Swal from 'sweetalert2';
import { 
  Database, 
  ArrowLeft,
  Plus,
  Edit2,
  RefreshCw,
  Loader2,
  Search
} from 'lucide-react';

// Configuración de catálogos con nombres REALES del backend
const catalogoConfig = {
  estadosGenerales: {
    nombre: 'Estados Generales',
    service: estadosGeneralesService,
    campos: [
      { key: 'nombreEstado', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false }
    ],
    idKey: 'id'
  },
  estadosCaso: {
    nombre: 'Estados de Caso',
    service: estadosCasoService,
    campos: [
      { key: 'nombreEstadoCaso', label: 'Nombre', required: true },
      { key: 'descripcionEstadoCaso', label: 'Descripción', required: false }
    ],
    idKey: 'id'
  },
  estadosActivo: {
    nombre: 'Estados de Activo',
    service: estadosActivoService,
    campos: [
      { key: 'nombreEstado', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false }
    ],
    idKey: 'id'
  },
  estadosConsumible: {
    nombre: 'Estados de Consumible',
    service: estadosConsumibleService,
    campos: [
      { key: 'nombreEstado', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false }
    ],
    idKey: 'id'
  },
  estadosIntervencion: {
    nombre: 'Estados de Intervención',
    service: estadosIntervencionService,
    campos: [
      { key: 'nombreEstado', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false }
    ],
    idKey: 'id'
  },
  areasTecnicas: {
    nombre: 'Áreas Técnicas',
    service: areasTecnicasService,
    campos: [
      { key: 'nombreAreaTecnica', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEncargado', label: 'Encargado', required: false, readOnly: true },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  canalesIngreso: {
    nombre: 'Canales de Ingreso',
    service: canalesIngresoService,
    campos: [
      { key: 'nombreCanal', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  prioridades: {
    nombre: 'Prioridades',
    service: prioridadesService,
    campos: [
      { key: 'nombrePrioridad', label: 'Nombre', required: true },
      { key: 'tiempoRespuestaDias', label: 'Tiempo Respuesta (días)', required: false, type: 'number' },
      { key: 'tiempoResolucionDias', label: 'Tiempo Resolución (días)', required: false, type: 'number' },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  tiposCaso: {
    nombre: 'Tipos de Caso',
    service: tiposCasoService,
    campos: [
      { key: 'nombreTipoCaso', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  tiposTrabajo: {
    nombre: 'Tipos de Trabajo',
    service: tiposTrabajoService,
    campos: [
      { key: 'nombreTipoTrabajo', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  categoriasActivo: {
    nombre: 'Categorías de Activo',
    service: categoriasActivoService,
    campos: [
      { key: 'nombreCategoria', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
  tiposConsumible: {
    nombre: 'Tipos de Consumible',
    service: tiposConsumibleService,
    campos: [
      { key: 'nombreTipo', label: 'Nombre', required: true },
      { key: 'descripcion', label: 'Descripción', required: false },
      { key: 'nombreEstado', label: 'Estado', required: false, readOnly: true }
    ],
    idKey: 'id'
  },
};

const DetalleCatalogo = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const config = catalogoConfig[tipo];

  // Estados
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [formData, setFormData] = useState({});

  // Validar que el catálogo exista
  useEffect(() => {
    if (!config) {
      navigate('/admin/gestion-catalogos');
    }
  }, [config, navigate]);

  // Cargar datos
  useEffect(() => {
    if (config) {
      cargarDatos();
    }
  }, [tipo]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const response = await config.service.getAll();
      setDatos(response.data || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inicializarFormData = (item = null) => {
    const data = {};
    config.campos.forEach(campo => {
      if (!campo.readOnly) {
        data[campo.key] = item ? (item[campo.key] || '') : '';
      }
    });
    return data;
  };

  const abrirModalCrear = () => {
    setItemEditando(null);
    setFormData(inicializarFormData());
    setModalAbierto(true);
  };

  const abrirModalEditar = (item) => {
    setItemEditando(item);
    setFormData(inicializarFormData(item));
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setItemEditando(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? (value ? parseInt(value) : null) : value 
    }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const camposEditables = config.campos.filter(c => !c.readOnly);
    const campoRequerido = camposEditables.find(c => c.required && !formData[c.key]?.toString().trim());
    if (campoRequerido) {
      Swal.fire('Error', `El campo "${campoRequerido.label}" es requerido`, 'error');
      return;
    }

    setGuardando(true);
    try {
      if (itemEditando) {
        await config.service.update(itemEditando[config.idKey], formData);
        Swal.fire('Éxito', 'Registro actualizado correctamente', 'success');
      } else {
        await config.service.create(formData);
        Swal.fire('Éxito', 'Registro creado correctamente', 'success');
      }
      
      cerrarModal();
      cargarDatos();
    } catch (error) {
      console.error('Error guardando:', error);
      Swal.fire('Error', error.message || 'No se pudo guardar', 'error');
    } finally {
      setGuardando(false);
    }
  };

  // Obtener el campo principal para filtrar (el primer campo editable)
  const getCampoPrincipal = () => {
    return config?.campos.find(c => !c.readOnly)?.key || config?.campos[0]?.key;
  };

  // Filtrar datos
  const datosFiltrados = datos.filter(item => {
    const campoPrincipal = getCampoPrincipal();
    if (!campoPrincipal) return true;
    const valor = item[campoPrincipal];
    return valor?.toString().toLowerCase().includes(filtro.toLowerCase());
  });

  if (!config) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className={themeClasses.secondaryText}>Cargando {config.nombre}...</p>
        </div>
      </div>
    );
  }

  // Campos para mostrar en tabla (excluyendo descripción larga)
  const camposTabla = config.campos.filter(c => !c.key.includes('descripcion'));

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/admin/gestion-catalogos')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              {config.nombre}
            </h1>
            <p className={themeClasses.secondaryText}>
              {datos.length} registros
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
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo</span>
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className={`${themeClasses.sidebarBg} rounded-xl p-4 shadow-lg border border-gray-200`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                {camposTabla.map(campo => (
                  <th key={campo.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {campo.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {datosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={camposTabla.length + 2} className="px-6 py-8 text-center">
                    <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className={themeClasses.secondaryText}>No hay registros</p>
                  </td>
                </tr>
              ) : (
                datosFiltrados.map((item) => (
                  <tr key={item[config.idKey]} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-500">
                        {item[config.idKey]}
                      </span>
                    </td>
                    {camposTabla.map(campo => (
                      <td key={campo.key} className="px-6 py-4 whitespace-nowrap">
                        <span className={themeClasses.primaryText}>
                          {item[campo.key] ?? '-'}
                        </span>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => abrirModalEditar(item)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
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
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">
                {itemEditando ? 'Editar Registro' : 'Nuevo Registro'}
              </h3>
            </div>
            
            <form onSubmit={guardar} className="p-6 space-y-4">
              {config.campos.filter(c => !c.readOnly).map(campo => (
                <div key={campo.key}>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                    {campo.label} {campo.required && '*'}
                  </label>
                  {campo.key.toLowerCase().includes('descripcion') ? (
                    <textarea
                      name={campo.key}
                      value={formData[campo.key] || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={`Ingrese ${campo.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type={campo.type || 'text'}
                      name={campo.key}
                      value={formData[campo.key] ?? ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={`Ingrese ${campo.label.toLowerCase()}...`}
                      required={campo.required}
                    />
                  )}
                </div>
              ))}
              
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
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
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

export default DetalleCatalogo;
