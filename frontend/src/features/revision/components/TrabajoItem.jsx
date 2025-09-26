import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building, 
  Calendar, 
  Star, 
  FileText, 
  Wrench, 
  AlertCircle,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import { Card, Button, Badge } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, THEME_CONSTANTS } from '../../../styles/theme';

const TrabajoItem = ({ trabajo, onAprobar, onRechazar, esRevisado = false }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentarios, setComentarios] = useState('');

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Función para obtener color según estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'warning',
      'Revisado': 'success',
      'Cerrado': 'primary'
    };
    return colores[estado] || 'secondary';
  };

  // Función para obtener color según prioridad
  const getPrioridadColor = (prioridad) => {
    const colores = {
      'Crítica': 'error',
      'Alta': 'warning',
      'Media': 'warning',
      'Baja': 'success'
    };
    return colores[prioridad] || 'secondary';
  };

  // Función para obtener color según eficiencia
  const getEficienciaColor = (eficiencia) => {
    if (eficiencia >= 100) return 'text-green-600';
    if (eficiencia >= 80) return 'text-blue-600';
    if (eficiencia >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAprobar = () => {
    onAprobar(trabajo.id, comentarios);
    setMostrarFormulario(false);
    setComentarios('');
  };

  const handleRechazar = () => {
    onRechazar(trabajo.id, comentarios);
    setMostrarFormulario(false);
    setComentarios('');
  };

  return (
    <Card variant="default" className={cn('hover:shadow-md', THEME_CONSTANTS.TRANSITION)}>
      <Card.Body>
        {/* Header del trabajo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className={cn(textStyles.h6, 'font-semibold')}>{trabajo.numeroCaso}</h3>
              <Badge variant={trabajo.estadoRevision === 'Pendiente' ? 'warning' : 'success'}>
                {trabajo.estadoRevision}
              </Badge>
              <Badge variant={getPrioridadColor(trabajo.prioridad)}>
                {trabajo.prioridad}
              </Badge>
            </div>
            <h4 className={cn(textStyles.h5, 'mb-1')}>{trabajo.titulo}</h4>
            <p className={textStyles.body2}>{trabajo.descripcion}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMostrarDetalles(!mostrarDetalles)}
            >
              {mostrarDetalles ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            
            {!esRevisado && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="text-blue-600 hover:text-blue-800"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{trabajo.tecnicoAsignado}</div>
              <div className="text-xs text-gray-600">{trabajo.areaTecnica}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(trabajo.fechaFin).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-600">
                {trabajo.tiempoResolucion}h de resolución
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {trabajo.tiempoResolucion}h
              </div>
              <div className="text-xs text-gray-600">
                Tiempo de resolución
              </div>
            </div>
          </div>
        </div>

        {/* Detalles expandibles */}
        {mostrarDetalles && (
          <div className="border-t pt-4 space-y-4">
            {/* Solución implementada */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Solución Implementada
              </h5>
              <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                {trabajo.solucionImplementada}
              </p>
            </div>

            {/* Herramientas utilizadas */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-blue-600" />
                Herramientas Utilizadas
              </h5>
              <div className="flex flex-wrap gap-2">
                {trabajo.herramientasUtilizadas.map((herramienta, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {herramienta}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Documentación */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-600" />
                Documentación
              </h5>
              <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                {trabajo.documentacion}
              </p>
            </div>

            {/* Observaciones del técnico */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                Observaciones del Técnico
              </h5>
              <p className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                {trabajo.observacionesTecnico}
              </p>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Usuario Reporta</h6>
                <p className="text-sm text-gray-600">{trabajo.usuarioReporta}</p>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Activo Afectado</h6>
                <p className="text-sm text-gray-600">{trabajo.activoAfectado}</p>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Ubicación</h6>
                <p className="text-sm text-gray-600">{trabajo.ubicacion}</p>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-900 mb-1">Calidad de Solución</h6>
                <Badge variant="outline" className="text-green-600">
                  {trabajo.calidadSolucion}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de revisión */}
        {mostrarFormulario && !esRevisado && (
          <div className="border-t pt-4 mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-4">Evaluación del Trabajo</h5>
            
            {/* Comentarios */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentarios de Revisión
              </label>
              <textarea
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                placeholder="Ingresa tus comentarios sobre el trabajo realizado..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleAprobar}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={comentarios.trim() === ''}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Aprobar Trabajo
              </Button>
              <Button
                onClick={handleRechazar}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                disabled={comentarios.trim() === ''}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Rechazar Trabajo
              </Button>
            </div>
          </div>
        )}

        {/* Información de revisión (si ya fue revisado) */}
        {esRevisado && (
          <div className="border-t pt-4 mt-4">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Evaluación Administrativa</h5>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Revisado por:</strong> {trabajo.revisadoPor}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Fecha de revisión:</strong> {new Date(trabajo.fechaRevision).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Comentarios:</strong> {trabajo.comentariosRevision}
              </p>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TrabajoItem;
