import React from 'react';
import { Clock, User, Shield, Star, MessageSquare, Calendar, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

const QualitySurveyItem = ({ encuesta }) => {
  const [mostrarDetalles, setMostrarDetalles] = React.useState(false);

  const getSatisfaccionColor = (satisfaccion) => {
    if (satisfaccion >= 5) return 'text-green-600 bg-green-50';
    if (satisfaccion >= 4) return 'text-blue-600 bg-blue-50';
    if (satisfaccion >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSatisfaccionVariant = (satisfaccion) => {
    if (satisfaccion >= 5) return 'success';
    if (satisfaccion >= 4) return 'info';
    if (satisfaccion >= 3) return 'warning';
    return 'danger';
  };

  const getSatisfaccionTexto = (satisfaccion) => {
    if (satisfaccion >= 5) return 'Excelente';
    if (satisfaccion >= 4) return 'Buena';
    if (satisfaccion >= 3) return 'Regular';
    return 'Mala';
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

  const fechaFormateada = formatFecha(encuesta.fechaEncuesta);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200" hover padding="sm">
      <div className="flex items-start space-x-4">
        {/* Icono de satisfacción */}
        <div className="flex-shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSatisfaccionColor(encuesta.satisfaccionGeneral)}`}>
            <Star className="h-5 w-5" />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Badge variant={getSatisfaccionVariant(encuesta.satisfaccionGeneral)} size="sm">
                {getSatisfaccionTexto(encuesta.satisfaccionGeneral)}
              </Badge>
              <span className="text-sm font-medium text-gray-900">
                {encuesta.casoId}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500">
                {fechaFormateada.fecha} {fechaFormateada.hora}
              </div>
              <button
                onClick={() => setMostrarDetalles(!mostrarDetalles)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {mostrarDetalles ? 'Ocultar' : 'Ver detalles'}
              </button>
            </div>
          </div>

          {/* Detalles básicos */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Usuario:</span>
              <span className="text-gray-900">{encuesta.nombreUsuario}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Técnico:</span>
              <span className="text-gray-900">{encuesta.nombreTecnico}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">Tiempo:</span>
              <span className="text-gray-900">{encuesta.tiempoResolucion}h</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Área:</span>
              <Badge variant="outline" size="sm">{encuesta.areaTecnica}</Badge>
            </div>

            {/* Calificación con estrellas */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Calificación:</span>
              <div className="flex items-center space-x-1">
                {renderStars(encuesta.satisfaccionGeneral)}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {encuesta.satisfaccionGeneral}/5
                </span>
              </div>
            </div>

            {/* Observaciones */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-3 w-3 text-gray-400 mt-0.5" />
                <p className="text-gray-700 text-sm">{encuesta.observaciones}</p>
              </div>
            </div>

            {/* Detalles expandibles */}
            {mostrarDetalles && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-600 mb-3">RESPUESTAS DETALLADAS:</h4>
                
                <div className="space-y-2">
                  {encuesta.respuestas.map((respuesta, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-xs text-gray-700 flex-1">
                        {respuesta.pregunta}
                      </span>
                      <div className="flex items-center space-x-1">
                        {renderStars(respuesta.valorNumerico)}
                        <span className="text-xs font-medium text-gray-900 ml-1">
                          {respuesta.valorNumerico}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Información adicional */}
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <strong>Tipo de Caso:</strong> {encuesta.tipoCaso}
                    </div>
                    <div>
                      <strong>Prioridad:</strong> {encuesta.prioridad}
                    </div>
                    <div>
                      <strong>Promedio Respuestas:</strong> {encuesta.promedioRespuestas}/5
                    </div>
                    <div>
                      <strong>Tiempo Resolución:</strong> {encuesta.tiempoResolucion}h
                    </div>
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

export default QualitySurveyItem;
