import React from 'react';
import { Search, Filter, X, MapPin, Package, Building } from 'lucide-react';
import { Button, Card, Input } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, gradients, THEME_CONSTANTS } from '../../../styles/theme';

const InventoryFilters = ({ 
  filtros, 
  actualizarFiltros, 
  limpiarFiltros, 
  ubicaciones, 
  estadosFiltrados, 
  categoriasFiltradas 
}) => {
  const tieneFiltrosActivos = Object.values(filtros).some(valor => valor !== '');

  const handleFiltroChange = (campo, valor) => {
    actualizarFiltros({ [campo]: valor });
  };

  return (
    <Card variant="elevated" className="mb-6">
      {/* Header con gradiente */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r',
        gradients.primary,
        'border-b border-gray-200'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={cn(textStyles.h4, 'text-white')}>Filtros Avanzados</h3>
              <p className={cn(textStyles.caption, 'text-white text-opacity-80')}>Refina tu búsqueda con filtros específicos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('🔍 Ejecutando búsqueda de inventario:', filtros.busqueda);
              }}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              disabled={!filtros.busqueda}
              icon={<Search className="w-4 h-4" />}
            >
              Aplicar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFiltroChange('busqueda', '')}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              disabled={!filtros.busqueda}
              icon={<X className="w-4 h-4" />}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contenido de filtros */}
      <div className="p-6">
        {/* Fila 1: Búsqueda principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Search className="w-4 h-4 text-blue-500" />
              <span>Buscar</span>
            </label>
            <input
              type="text"
              placeholder="Nombre, código, marca, modelo..."
              value={filtros.busqueda}
              onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
            <div className="text-xs text-gray-500">
              💡 Ejemplos: "Laptop", "HP", "Dell", "Monitor"
            </div>
          </div>
        </div>

        {/* Fila 2: Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>Ubicación</span>
            </label>
            <select
              value={filtros.ubicacion}
              onChange={(e) => handleFiltroChange('ubicacion', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las ubicaciones</option>
              {ubicaciones && ubicaciones.map(ubicacion => (
                <option key={ubicacion.nombre} value={ubicacion.nombre}>
                  {ubicacion.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Package className="w-4 h-4 text-orange-500" />
              <span>Estado</span>
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => handleFiltroChange('estado', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los estados</option>
              {estadosFiltrados && estadosFiltrados.map(estado => (
                <option key={estado.nombre} value={estado.nombre}>
                  {estado.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Categoría</span>
            </label>
            <select
              value={filtros.categoria}
              onChange={(e) => handleFiltroChange('categoria', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las categorías</option>
              {categoriasFiltradas && categoriasFiltradas.map(categoria => (
                <option key={categoria.nombre} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Package className="w-4 h-4 text-purple-500" />
              <span>Tipo</span>
            </label>
            <select
              value={filtros.tipo}
              onChange={(e) => handleFiltroChange('tipo', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los tipos</option>
              <option value="activo">Activo</option>
              <option value="consumible">Consumible</option>
            </select>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>Inventario</strong> filtrado
            </div>
            {tieneFiltrosActivos && (
              <div className="text-xs text-blue-600">
                Filtros aplicados
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InventoryFilters;