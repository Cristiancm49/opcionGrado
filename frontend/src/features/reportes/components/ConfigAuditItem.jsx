import React from 'react';
import { Clock, User, Shield, AlertCircle, CheckCircle, XCircle, Edit, Trash2, Plus, Settings, Eye } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const ConfigAuditItem = ({ log }) => {
  const [mostrarDetalles, setMostrarDetalles] = React.useState(false);

  const getAccionIcon = (accion) => {
    if (accion.includes('CREAR')) return <Plus className="h-4 w-4 text-green-600" />;
    if (accion.includes('MODIFICAR')) return <Edit className="h-4 w-4 text-blue-600" />;
    if (accion.includes('ELIMINAR')) return <Trash2 className="h-4 w-4 text-red-600" />;
    return <Settings className="h-4 w-4 text-gray-600" />;
  };

  const getAccionVariant = (accion) => {
    if (accion.includes('CREAR')) return 'success';
    if (accion.includes('MODIFICAR')) return 'info';
    if (accion.includes('ELIMINAR')) return 'danger';
    return 'default';
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return {
      fecha: date.toLocaleDateString('es-ES'),
      hora: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const fechaFormateada = formatFecha(log.fecha);

  return (
    <Card className="hover:shadow-md transition-all duration-200" hover padding="sm">
      <div className="flex items-start space-x-4">
        {/* Icono de acción */}
        <div className="flex-shrink-0 mt-1">
          {getAccionIcon(log.accion)}
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge variant={getAccionVariant(log.accion)} size="sm">
                {log.accion.replace(/_/g, ' ')}
              </Badge>
              <span className="text-sm font-medium text-gray-900">
                {log.entidadNombre}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500">
                {fechaFormateada.fecha} {fechaFormateada.hora}
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={mostrarDetalles ? Eye : Eye}
                onClick={() => setMostrarDetalles(!mostrarDetalles)}
                className="h-6 w-6 p-0"
              />
            </div>
          </div>

          {/* Detalles básicos */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">{log.nombreUsuario}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{log.usuario}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Entidad:</span>
              <span className="text-gray-900">{log.entidad}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">IP:</span>
              <span className="text-gray-900">{log.ip}</span>
            </div>

            {/* Descripción */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-gray-700">{log.detalles}</p>
            </div>

            {/* Cambios detallados (expandible) */}
            {mostrarDetalles && log.cambios && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-600 mb-2">CAMBIOS REALIZADOS:</h4>
                
                {log.cambios.anterior && (
                  <div className="mb-2">
                    <div className="text-xs text-red-600 font-medium">ANTES:</div>
                    <div className="text-xs text-gray-600 ml-2 bg-red-50 p-2 rounded">
                      {typeof log.cambios.anterior === 'object' 
                        ? JSON.stringify(log.cambios.anterior, null, 2)
                        : log.cambios.anterior
                      }
                    </div>
                  </div>
                )}

                {log.cambios.nuevo && (
                  <div>
                    <div className="text-xs text-green-600 font-medium">DESPUÉS:</div>
                    <div className="text-xs text-gray-600 ml-2 bg-green-50 p-2 rounded">
                      {typeof log.cambios.nuevo === 'object' 
                        ? JSON.stringify(log.cambios.nuevo, null, 2)
                        : log.cambios.nuevo
                      }
                    </div>
                  </div>
                )}

                {/* Información técnica adicional */}
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <div><strong>User Agent:</strong> {log.userAgent}</div>
                    <div><strong>ID Entidad:</strong> {log.entidadId}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfigAuditItem;
