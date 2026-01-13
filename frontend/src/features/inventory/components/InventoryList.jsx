import React from 'react';
import { Package, AlertTriangle, Search } from 'lucide-react';
import InventoryItem from './InventoryItem';
import Card from '../../../components/ui/Card';

const InventoryList = ({ 
  items, 
  tipo, 
  loading, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="flex flex-col items-center">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron {tipo === 'activos' ? 'activos' : tipo === 'componentes' ? 'componentes' : 'consumibles'}
          </h3>
          <p className="text-gray-500 mb-4">
            {tipo === 'activos'
              ? 'No hay activos que coincidan con los filtros aplicados.'
              : tipo === 'componentes'
                ? 'No hay componentes que coincidan con los filtros aplicados.'
                : 'No hay consumibles que coincidan con los filtros aplicados.'
            }
          </p>
          <div className="flex items-center text-sm text-gray-400">
            <Search className="h-4 w-4 mr-1" />
            <span>Intenta ajustar los filtros de búsqueda</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((item) => (
        <InventoryItem
          key={item.id}
          item={item}
          tipo={tipo}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default InventoryList;
