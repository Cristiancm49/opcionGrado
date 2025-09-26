import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Building, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Tag,
  Link,
  Timer,
  Target,
  UserPlus
} from 'lucide-react';
import { Card, Badge, Button } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, THEME_CONSTANTS } from '../../../styles/theme';

const IncidenciaItem = ({ incidencia, onEdit, onDelete, onView, onAsignar }) => {
  const [expanded, setExpanded] = useState(false);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'warning';
      case 'En Proceso': return 'primary';
      case 'Cerrado': return 'success';
      case 'Cancelado': return 'secondary';
      case 'Escalado': return 'error';
      default: return 'secondary';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'Baja': return 'secondary';
      case 'Media': return 'primary';
      case 'Alta': return 'warning';
      case 'Crítica': return 'error';
      default: return 'secondary';
    }
  };

  const getImpactoColor = (impacto) => {
    switch (impacto) {
      case 'Bajo': return 'success';
      case 'Medio': return 'warning';
      case 'Alto': return 'warning';
      case 'Crítico': return 'error';
      default: return 'secondary';
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularTiempoTranscurrido = (fechaRegistro) => {
    const ahora = new Date();
    const registro = new Date(fechaRegistro);
    const diffMs = ahora - registro;
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffHoras / 24);
    
    if (diffDias > 0) {
      return `${diffDias} día${diffDias !== 1 ? 's' : ''}`;
    } else if (diffHoras > 0) {
      return `${diffHoras} hora${diffHoras !== 1 ? 's' : ''}`;
    } else {
      const diffMinutos = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutos} minuto${diffMinutos !== 1 ? 's' : ''}`;
    }
  };

  return (
    <Card variant="default" className="mb-4">
      <Card.Header>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Card.Title>{incidencia.numeroIncidencia}</Card.Title>
              <Badge variant={getEstadoColor(incidencia.estado)} size="sm">
                {incidencia.estado}
              </Badge>
              <Badge variant={getPrioridadColor(incidencia.prioridad)} size="sm">
                {incidencia.prioridad}
              </Badge>
              {incidencia.cumplioSLA !== null && (
                <Badge 
                  variant={incidencia.cumplioSLA ? 'success' : 'error'} 
                  size="sm"
                  className="flex items-center"
                >
                  {incidencia.cumplioSLA ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  SLA {incidencia.cumplioSLA ? 'Cumplido' : 'No Cumplido'}
                </Badge>
              )}
            </div>
            
            <h3 className={cn(textStyles.h5, 'mb-2')}>
              {incidencia.titulo}
            </h3>
            
            <div className={cn('flex flex-wrap items-center gap-4', textStyles.body2)}>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatFecha(incidencia.fechaRegistro)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Hace {calcularTiempoTranscurrido(incidencia.fechaRegistro)}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {incidencia.nombreUsuario}
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {incidencia.ubicacion}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(incidencia)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAsignar(incidencia)}
              className="text-purple-600 hover:text-purple-800"
            >
              <UserPlus className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(incidencia)}
              className="text-green-600 hover:text-green-800"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(incidencia)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-gray-600 hover:text-gray-800"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card.Header>

      {expanded && (
        <Card.Content>
          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Información General
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{incidencia.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subcategoría:</span>
                    <span className="font-medium">{incidencia.subcategoría}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impacto:</span>
                    <Badge variant={getImpactoColor(incidencia.impacto)} size="sm">
                      {incidencia.impacto}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgencia:</span>
                    <Badge variant={getPrioridadColor(incidencia.urgencia)} size="sm">
                      {incidencia.urgencia}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SLA:</span>
                    <span className="font-medium">{incidencia.sla}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Asignación
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Técnico:</span>
                    <span className="font-medium">{incidencia.nombreTecnico}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{incidencia.areaTecnica}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo Estimado:</span>
                    <span className="font-medium">{incidencia.tiempoEstimado}h</span>
                  </div>
                  {incidencia.tiempoReal && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiempo Real:</span>
                      <span className="font-medium">{incidencia.tiempoReal}h</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Descripción</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {incidencia.descripcion}
              </p>
            </div>

            {/* Solución y observaciones */}
            {(incidencia.solucion || incidencia.observaciones) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incidencia.solucion && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Solución</h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                      {incidencia.solucion}
                    </p>
                  </div>
                )}
                {incidencia.observaciones && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Observaciones</h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {incidencia.observaciones}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Etiquetas y archivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incidencia.etiquetas && incidencia.etiquetas.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Etiquetas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {incidencia.etiquetas.map((etiqueta, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {etiqueta}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {incidencia.archivosAdjuntos && incidencia.archivosAdjuntos.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Archivos Adjuntos
                  </h4>
                  <div className="space-y-1">
                    {incidencia.archivosAdjuntos.map((archivo, index) => (
                      <div key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📎 {archivo}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Casos relacionados */}
            {incidencia.casosRelacionados && incidencia.casosRelacionados.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Link className="w-4 h-4 mr-2" />
                  Casos Relacionados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {incidencia.casosRelacionados.map((caso, index) => (
                    <Badge key={index} variant="outline" size="sm" className="text-blue-600">
                      {caso}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card.Content>
      )}
    </Card>
  );
};

export default IncidenciaItem;
