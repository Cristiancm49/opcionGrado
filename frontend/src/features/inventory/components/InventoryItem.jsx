import React from 'react';
import { Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge, { getBadgeVariant } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const InventoryItem = ({ 
  item, 
  tipo, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  const isActivo = tipo === 'activos';
  const isStockBajo = !isActivo && item.stockActual <= item.stockMinimo;

  return (
    <Card className="hover:shadow-lg transition-all duration-200" hover padding="sm">
      {/* Header compacto */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <Card.Title size="md" className="truncate">
            {isActivo ? item.codigoPatrimonial : item.nombre}
          </Card.Title>
          {isStockBajo && (
            <AlertTriangle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
          )}
          <Badge variant={getBadgeVariant(item.estado)} size="sm">
            {item.estado}
          </Badge>
        </div>
        
        {/* Acciones horizontales compactas */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(item)}
            icon={Eye}
            className="px-1 py-1 text-xs h-6 w-6"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
            icon={Edit}
            className="px-1 py-1 text-xs h-6 w-6"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item)}
            icon={Trash2}
            className="px-1 py-1 text-xs h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
          />
        </div>
      </div>

      {/* Información en formato tarjeta compacta */}
      <div className="space-y-1">
        {isActivo ? (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nombre:</span>
              <span className="font-medium text-gray-900 truncate ml-2">{item.nombre}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ubicación:</span>
              <span className="font-medium text-gray-900">{item.ubicacion}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Marca:</span>
              <span className="font-medium text-gray-900">{item.marca} {item.modelo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Responsable:</span>
              <span className="font-medium text-gray-900">{item.responsable}</span>
            </div>
            {item.serie && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Serie:</span>
                <span className="font-medium text-gray-900">{item.serie}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Categoría:</span>
              <span className="font-medium text-gray-900">{item.categoria}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Marca:</span>
              <span className="font-medium text-gray-900">{item.marca} {item.modelo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ubicación:</span>
              <span className="font-medium text-gray-900">{item.ubicacion}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stock:</span>
              <span className="font-medium text-gray-900">{item.stockActual} unidades</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Categoría:</span>
              <span className="font-medium text-gray-900">{item.categoria}</span>
            </div>
            {item.stockMinimo && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mínimo:</span>
                <span className="font-medium text-gray-900">{item.stockMinimo} unidades</span>
              </div>
            )}
          </>
        )}
        
        {/* Fecha de ingreso */}
        <div className="flex justify-between text-sm pt-1 border-t border-gray-100">
          <span className="text-gray-500">Ingreso:</span>
          <span className="font-medium text-gray-900">{item.fechaIngreso}</span>
        </div>
      </div>

      {/* Alerta de stock bajo - integrada */}
      {isStockBajo && (
        <div className="mt-2 pt-2 border-t border-yellow-200">
          <div className="flex items-center text-xs text-yellow-800 bg-yellow-50 px-2 py-1 rounded">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span><strong>Stock bajo:</strong> Solo quedan {item.stockActual} unidades</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default InventoryItem;
