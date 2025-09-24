import React, { useState } from 'react';
import { X, Users, CheckSquare, Square, AlertCircle, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ModalAsignacionMasiva = ({ 
  incidenciasSeleccionadas, 
  tecnicos, 
  isOpen, 
  onClose, 
  onAsignarMasivo 
}) => {
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('');
  const [comentarioAsignacion, setComentarioAsignacion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsignarMasivo = async () => {
    if (!tecnicoSeleccionado || incidenciasSeleccionadas.length === 0) return;
    
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tecnico = tecnicos.find(t => t.email === tecnicoSeleccionado);
      
      const asignaciones = incidenciasSeleccionadas.map(incidencia => ({
        incidenciaId: incidencia.id,
        tecnicoAsignado: tecnicoSeleccionado,
        nombreTecnico: tecnico.nombre,
        areaTecnica: tecnico.area,
        comentarioAsignacion,
        fechaAsignacion: new Date().toISOString(),
        esAsignacionMasiva: true
      }));
      
      onAsignarMasivo(asignaciones);
      onClose();
    } catch (error) {
      console.error('Error en asignación masiva:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <Card.Title>Asignación Masiva de Técnicos</Card.Title>
                  <p className="text-sm text-gray-600">
                    {incidenciasSeleccionadas.length} incidencia{incidenciasSeleccionadas.length !== 1 ? 's' : ''} seleccionada{incidenciasSeleccionadas.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card.Header>

          <Card.Content>
            <div className="space-y-6">
              {/* Lista de incidencias seleccionadas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Incidencias Seleccionadas
                </h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {incidenciasSeleccionadas.map((incidencia) => (
                    <div key={incidencia.id} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {incidencia.numeroIncidencia}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {incidencia.titulo}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          incidencia.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                          incidencia.estado === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {incidencia.estado}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          incidencia.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                          incidencia.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                          incidencia.prioridad === 'Media' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {incidencia.prioridad}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selección de técnico */}
              <div>
                <Select
                  label="Seleccionar Técnico para Asignación Masiva"
                  value={tecnicoSeleccionado}
                  onChange={(e) => setTecnicoSeleccionado(e.target.value)}
                  options={[
                    { value: '', label: 'Seleccionar técnico...' },
                    ...tecnicos.map(tecnico => ({
                      value: tecnico.email,
                      label: `${tecnico.nombre} - ${tecnico.area}`
                    }))
                  ]}
                  required
                />
              </div>

              {/* Información del técnico seleccionado */}
              {tecnicoSeleccionado && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Información del Técnico Seleccionado
                  </h4>
                  {(() => {
                    const tecnico = tecnicos.find(t => t.email === tecnicoSeleccionado);
                    return (
                      <div className="text-sm text-blue-700">
                        <div className="font-medium">{tecnico.nombre}</div>
                        <div className="text-blue-600">{tecnico.area}</div>
                        <div className="text-blue-600">{tecnico.email}</div>
                        <div className="mt-2 text-xs text-blue-600">
                          Incidencias actuales: {tecnico.incidenciasAsignadas} | 
                          Promedio resolución: {tecnico.promedioResolucion}h
                        </div>
                        <div className="mt-1 text-xs text-blue-600">
                          Después de esta asignación: {tecnico.incidenciasAsignadas + incidenciasSeleccionadas.length} incidencias
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Advertencia de carga de trabajo */}
              {tecnicoSeleccionado && incidenciasSeleccionadas.length > 3 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Advertencia de Carga de Trabajo
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Se están asignando {incidenciasSeleccionadas.length} incidencias al mismo técnico. 
                    Esto podría aumentar significativamente su carga de trabajo.
                  </p>
                </div>
              )}

              {/* Comentario de asignación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentario de Asignación Masiva
                </label>
                <textarea
                  value={comentarioAsignacion}
                  onChange={(e) => setComentarioAsignacion(e.target.value)}
                  placeholder="Agregar comentario sobre la asignación masiva (opcional)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAsignarMasivo}
                  disabled={!tecnicoSeleccionado || loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {loading ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Users className="w-4 h-4 mr-2" />
                  )}
                  Asignar {incidenciasSeleccionadas.length} Incidencia{incidenciasSeleccionadas.length !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ModalAsignacionMasiva;
