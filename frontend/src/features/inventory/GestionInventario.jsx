import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Package, Zap, Cpu } from 'lucide-react';
import Swal from 'sweetalert2';
import useAppStore from '../../store/useAppStore';
import { useInventory } from './hooks/useInventory';
import InventoryTabs from './components/InventoryTabs';
import InventoryFilters from './components/InventoryFilters';
import InventoryList from './components/InventoryList';
import StockAlert from './components/StockAlert';
import ActivoFormModal from './components/ActivoFormModal';
import ConsumibleFormModal from './components/ConsumibleFormModal';
import ComponenteFormModal from './components/ComponenteFormModal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {
  inventariosService,
  usuariosService,
  estadosGeneralesService
} from '../../services';

const GestionInventario = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const {
    ubicaciones,
    estados,
    categorias,
    tiposConsumible,
    filtros,
    loading,
    setFiltros,
    getDatosActuales,
    getAlertasStock,
    getEstadisticas,
    agregarActivo,
    agregarConsumible,
    agregarComponente,
    actualizarActivo,
    actualizarConsumible,
    actualizarComponente
  } = useInventory();

  const [activeTab, setActiveTab] = useState('activos');
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Estado adicional para formularios
  const [inventarios, setInventarios] = useState([
    { idInventario: 1, nombreInventario: 'Almacén Principal' },
    { idInventario: 2, nombreInventario: 'Almacén Secundario' },
    { idInventario: 3, nombreInventario: 'Oficina Central' }
  ]);
  const [usuarios, setUsuarios] = useState([
    { idUsuario: 1, nombreCompleto: 'Juan Pérez', email: 'juan@empresa.com' },
    { idUsuario: 2, nombreCompleto: 'María García', email: 'maria@empresa.com' },
    { idUsuario: 3, nombreCompleto: 'Carlos López', email: 'carlos@empresa.com' }
  ]);
  const [estadosGenerales, setEstadosGenerales] = useState([
    { idEstadoGeneral: 1, nombreEstado: 'Activo', descripcion: 'Estado activo' },
    { idEstadoGeneral: 2, nombreEstado: 'Inactivo', descripcion: 'Estado inactivo' }
  ]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'

  const estadisticas = getEstadisticas();
  const datosActuales = getDatosActuales();
  const alertasStock = getAlertasStock();

  // Verificar estado del backend y cargar datos adicionales para formularios
  useEffect(() => {
    const verificarBackend = async () => {
      try {
        // Intentar hacer una petición simple para verificar conexión
        const testResponse = await fetch('http://localhost:5181/api/inventario/componentes');
        if (testResponse.ok || testResponse.status === 404) {
          // Si responde (aunque sea 404), el backend está disponible
          setBackendStatus('connected');
          console.log('✅ Backend conectado en http://localhost:5181');
        } else {
          setBackendStatus('disconnected');
        }
      } catch (error) {
        setBackendStatus('disconnected');
        console.warn('⚠️ Backend no disponible:', error.message);
      }
    };

    const cargarDatosFormulario = async () => {
      try {
        const [inventariosRes, usuariosRes, estadosRes] = await Promise.all([
          inventariosService.getAll(),
          usuariosService.getAll(),
          estadosGeneralesService.getAll()
        ]);

        // Actualizar datos del backend si existen
        if (inventariosRes?.data?.length > 0) {
          setInventarios(inventariosRes.data);
          setBackendStatus('connected');
        }
        if (usuariosRes?.data?.length > 0) {
          setUsuarios(usuariosRes.data);
        }
        if (estadosRes?.data?.length > 0) {
          setEstadosGenerales(estadosRes.data);
        }
      } catch (error) {
        // Backend no disponible, mantener datos mock
        setBackendStatus('disconnected');
      }
    };

    verificarBackend();
    cargarDatosFormulario();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFiltros({
      ...filtros,
      tipo: tab
    });
  };

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleView = (item) => {
    console.log('Ver detalles:', item);
  };

  const handleDelete = async (item) => {
    const tipo = activeTab === 'activos' ? 'activo' :
                 activeTab === 'consumibles' ? 'consumible' : 'componente';

    const result = await Swal.fire({
      title: `¿Eliminar ${tipo}?`,
      text: `¿Estás seguro de que deseas eliminar "${item.nombre || item.nombreActivo || item.nombreConsumible || item.nombreComponente}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // TODO: Implementar eliminación en el hook
        console.log('Eliminando:', item);
        await Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: `El ${tipo} ha sido eliminado correctamente.`,
          timer: 2000,
          showConfirmButton: false
        });
        // Aquí se debería recargar la lista
      } catch (error) {
        console.error('Error eliminando:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo eliminar el ${tipo}.`,
          confirmButtonText: 'Entendido'
        });
      }
    }
  };

  const handleVerDetallesStock = () => {
    console.log('Ver detalles de stock:', alertasStock);
  };

  // Funciones para guardar formularios
  const handleSaveActivo = async (activoData) => {
    setLoadingForm(true);
    try {
      if (selectedItem) {
        await actualizarActivo(selectedItem.id, activoData);
        await Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El activo ha sido actualizado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await agregarActivo(activoData);
        await Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El activo ha sido creado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setShowForm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error guardando activo:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Ocurrió un error al guardar el activo.',
        confirmButtonText: 'Entendido'
      });
      throw error;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleSaveConsumible = async (consumibleData) => {
    setLoadingForm(true);
    try {
      if (selectedItem) {
        await actualizarConsumible(selectedItem.id, consumibleData);
        await Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El consumible ha sido actualizado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await agregarConsumible(consumibleData);
        await Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El consumible ha sido creado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setShowForm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error guardando consumible:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Ocurrió un error al guardar el consumible.',
        confirmButtonText: 'Entendido'
      });
      throw error;
    } finally {
      setLoadingForm(false);
    }
  };

  const handleSaveComponente = async (componenteData) => {
    setLoadingForm(true);
    try {
      if (selectedItem) {
        await actualizarComponente(selectedItem.id, componenteData);
        await Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El componente ha sido actualizado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await agregarComponente(componenteData);
        await Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El componente ha sido creado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      // Cerrar modal y limpiar selección después de guardar exitosamente
      setShowForm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error guardando componente:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Ocurrió un error al guardar el componente.',
        confirmButtonText: 'Entendido'
      });
      throw error;
    } finally {
      setLoadingForm(false);
    }
  };

  const getTabLabel = () => {
    if (activeTab === 'activos') return 'Activo';
    if (activeTab === 'componentes') return 'Componente';
    return 'Consumible';
  };

  const getTabTitle = () => {
    if (activeTab === 'activos') return 'Activos Fijos';
    if (activeTab === 'componentes') return 'Componentes';
    return 'Consumibles';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${themeClasses.primaryText}`}>
              Gestión de Inventario
            </h1>
            {backendStatus === 'connected' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Backend Conectado
              </span>
            )}
            {backendStatus === 'disconnected' && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Modo Offline (Datos Mock)
              </span>
            )}
          </div>
          <p className={`${themeClasses.secondaryText}`}>
            Administra activos fijos, componentes y consumibles del sistema
            {backendStatus === 'disconnected' && (
              <span className="block text-xs text-yellow-600 mt-1">
                ⚠️ El backend no está disponible. Los datos se guardan localmente.
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon={BarChart3}
            onClick={() => console.log('Ver estadísticas')}
          >
            Estadísticas
          </Button>
          <Button
            variant="primary"
            icon={Plus}
            onClick={handleAddNew}
          >
            Agregar {getTabLabel()}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card.Stat
          title="Total Activos"
          value={estadisticas.totalActivos}
          subtitle={`${estadisticas.activosActivos} operativos`}
          icon={Package}
          color="blue"
        />

        <Card.Stat
          title="Componentes"
          value={estadisticas.totalComponentes}
          subtitle="En inventario"
          icon={Cpu}
          color="purple"
        />

        <Card.Stat
          title="Consumibles"
          value={estadisticas.totalConsumibles}
          subtitle={`${estadisticas.categorias} categorías`}
          icon={Zap}
          color="green"
        />

        <Card.Stat
          title="Stock Bajo"
          value={estadisticas.stockBajo}
          subtitle="Requiere atención"
          icon={Package}
          color="yellow"
        />

        <Card.Stat
          title="Ubicaciones"
          value={estadisticas.ubicaciones}
          subtitle="Distribuidas"
          icon={BarChart3}
          color="indigo"
        />
      </div>

      {(activeTab === 'consumibles' || activeTab === 'componentes') && alertasStock.length > 0 && (
        <StockAlert 
          alertas={alertasStock} 
          onVerDetalles={handleVerDetallesStock}
        />
      )}

      <InventoryTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        estadisticas={estadisticas}
      />

      <InventoryFilters
        filtros={filtros}
        actualizarFiltros={handleFiltrosChange}
        limpiarFiltros={() => setFiltros({ busqueda: '', ubicacion: '', estado: '', categoria: '', tipo: activeTab })}
        ubicaciones={ubicaciones}
        estadosFiltrados={estados}
        categoriasFiltradas={categorias}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {getTabTitle()}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({datosActuales.length} elementos)
            </span>
          </h2>
        </div>

        <InventoryList
          items={datosActuales}
          tipo={activeTab}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      {/* Modal de Activo */}
      <ActivoFormModal
        isOpen={showForm && activeTab === 'activos'}
        onClose={() => setShowForm(false)}
        onSave={handleSaveActivo}
        activo={selectedItem}
        categorias={categorias}
        estados={estados.filter(e => e.tipo === 'activo')}
        inventarios={inventarios}
        ubicaciones={ubicaciones}
        usuarios={usuarios}
        loading={loadingForm}
      />

      {/* Modal de Consumible */}
      <ConsumibleFormModal
        isOpen={showForm && activeTab === 'consumibles'}
        onClose={() => setShowForm(false)}
        onSave={handleSaveConsumible}
        consumible={selectedItem}
        tiposConsumible={tiposConsumible}
        estadosConsumible={estados.filter(e => e.tipo === 'consumible')}
        inventarios={inventarios}
        loading={loadingForm}
      />

      {/* Modal de Componente */}
      <ComponenteFormModal
        isOpen={showForm && activeTab === 'componentes'}
        onClose={() => setShowForm(false)}
        onSave={handleSaveComponente}
        componente={selectedItem}
        estadosGenerales={estadosGenerales}
        inventarios={inventarios}
        loading={loadingForm}
      />
    </div>
  );
};

export default GestionInventario;
