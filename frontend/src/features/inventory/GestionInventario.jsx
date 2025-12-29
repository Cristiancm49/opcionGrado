import React, { useState } from 'react';
import { Plus, BarChart3, Package, Zap, Cpu } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useInventory } from './hooks/useInventory';
import InventoryTabs from './components/InventoryTabs';
import InventoryFilters from './components/InventoryFilters';
import InventoryList from './components/InventoryList';
import StockAlert from './components/StockAlert';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GestionInventario = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const {
    activos,
    consumibles,
    componentes,
    ubicaciones,
    estados,
    categorias,
    filtros,
    loading,
    setFiltros,
    getDatosActuales,
    getAlertasStock,
    getEstadisticas
  } = useInventory();

  const [activeTab, setActiveTab] = useState('activos');
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const estadisticas = getEstadisticas();
  const datosActuales = getDatosActuales();
  const alertasStock = getAlertasStock();

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

  const handleDelete = (item) => {
    console.log('Eliminar:', item);
  };

  const handleVerDetallesStock = () => {
    console.log('Ver detalles de stock:', alertasStock);
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
          <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
            Gestión de Inventario
          </h1>
          <p className={`${themeClasses.secondaryText}`}>
            Administra activos fijos, componentes y consumibles del sistema
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

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedItem ? 'Editar' : 'Agregar'} {getTabLabel()}
            </h3>
            <p className="text-gray-600 mb-4">
              Formulario en desarrollo...
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setShowForm(false)}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionInventario;
