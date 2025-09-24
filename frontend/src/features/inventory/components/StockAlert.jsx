import React from 'react';
import { AlertTriangle, Package, TrendingDown } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const StockAlert = ({ alertas, onVerDetalles }) => {
  if (!alertas || alertas.length === 0) {
    return null;
  }

  const alertasCriticas = alertas.filter(item => item.stockActual === 0);
  const alertasBajas = alertas.filter(item => item.stockActual > 0 && item.stockActual <= item.stockMinimo);

  return (
    <Card.Alert
      type="warning"
      title="Alertas de Stock"
      icon={AlertTriangle}
      className="mb-6"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          {alertasCriticas.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="danger" size="sm">
                Crítico
              </Badge>
              <span className="text-sm">
                {alertasCriticas.length} consumible{alertasCriticas.length > 1 ? 's' : ''} agotado{alertasCriticas.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {alertasBajas.length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="warning" size="sm">
                Bajo
              </Badge>
              <span className="text-sm">
                {alertasBajas.length} consumible{alertasBajas.length > 1 ? 's' : ''} con stock bajo
              </span>
            </div>
          )}
        </div>

        {/* Lista de productos con stock bajo */}
        <div className="space-y-2">
          {alertas.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm bg-yellow-100 p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <Package className="h-3 w-3" />
                <span className="font-medium">{item.nombre}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-700">
                  {item.stockActual} / {item.stockMinimo}
                </span>
                <TrendingDown className="h-3 w-3 text-yellow-600" />
              </div>
            </div>
          ))}
          
          {alertas.length > 3 && (
            <div className="text-sm font-medium text-center py-2">
              +{alertas.length - 3} más productos con stock bajo...
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="warning"
            size="sm"
            onClick={onVerDetalles}
            icon={Package}
          >
            Ver Detalles Completos
          </Button>
        </div>
      </div>
    </Card.Alert>
  );
};

export default StockAlert;