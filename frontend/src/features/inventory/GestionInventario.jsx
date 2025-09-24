import React, { useState } from 'react';
import { Plus, BarChart3, Package, Zap } from 'lucide-react';
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
    // TODO: Implementar vista de detalles
    console.log('Ver detalles:', item);
  };

  const handleDelete = (item) => {
    // TODO: Implementar confirmación y eliminación
    console.log('Eliminar:', item);
  };

  const handleVerDetallesStock = () => {
    // TODO: Implementar vista de detalles de stock
    console.log('Ver detalles de stock:', alertasStock);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
            Gestión de Inventario
          </h1>
          <p className={`${themeClasses.secondaryText}`}>
            Administra activos fijos y consumibles del sistema
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
            Agregar {activeTab === 'activos' ? 'Activo' : 'Consumible'}
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card.Stat
          title="Total Activos"
          value={estadisticas.totalActivos}
          subtitle={`${estadisticas.activosActivos} activos`}
          icon={Package}
          color="blue"
          trend={{ positive: true, value: '+12%', period: 'vs mes anterior' }}
        />

        <Card.Stat
          title="Total Consumibles"
          value={estadisticas.totalConsumibles}
          subtitle={`${estadisticas.categorias} categorías`}
          icon={Zap}
          color="green"
          trend={{ positive: true, value: '+8%', period: 'vs mes anterior' }}
        />

        <Card.Stat
          title="Stock Bajo"
          value={estadisticas.stockBajo}
          subtitle="Requiere atención"
          icon={Package}
          color="yellow"
          trend={{ positive: false, value: '-3%', period: 'vs mes anterior' }}
        />

        <Card.Stat
          title="Ubicaciones"
          value={estadisticas.ubicaciones}
          subtitle="Distribuidas"
          icon={BarChart3}
          color="purple"
        />
      </div>

      {/* Alertas de stock */}
      {activeTab === 'consumibles' && alertasStock.length > 0 && (
        <StockAlert 
          alertas={alertasStock} 
          onVerDetalles={handleVerDetallesStock}
        />
      )}

      {/* Tabs */}
      <InventoryTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        estadisticas={estadisticas}
      />

      {/* Filtros */}
      <InventoryFilters
        filtros={filtros}
        onFiltrosChange={handleFiltrosChange}
        ubicaciones={ubicaciones}
        estados={estados}
        categorias={categorias}
        tipoActual={activeTab}
      />

      {/* Lista de items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab === 'activos' ? 'Activos Fijos' : 'Consumibles'}
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

      {/* TODO: Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedItem ? 'Editar' : 'Agregar'} {activeTab === 'activos' ? 'Activo' : 'Consumible'}
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
