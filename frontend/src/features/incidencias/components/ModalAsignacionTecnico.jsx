import React, { useState } from 'react';
import { X, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ModalAsignacionTecnico = ({ 
  incidencia, 
  tecnicos, 
  isOpen, 
  onClose, 
  onAsignar 
}) => {
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('');
  const [comentarioAsignacion, setComentarioAsignacion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsignar = async () => {
    if (!tecnicoSeleccionado) return;
    
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const tecnico = tecnicos.find(t => t.email === tecnicoSeleccionado);
      
      onAsignar({
        incidenciaId: incidencia.id,
        tecnicoAsignado: tecnicoSeleccionado,
        nombreTecnico: tecnico.nombre,
        areaTecnica: tecnico.area,
        comentarioAsignacion,
        fechaAsignacion: new Date().toISOString()
      });
      
      onClose();
    } catch (error) {
      console.error('Error al asignar técnico:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReasignar = async () => {
    if (!tecnicoSeleccionado) return;
    
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const tecnico = tecnicos.find(t => t.email === tecnicoSeleccionado);
      
      onAsignar({
        incidenciaId: incidencia.id,
        tecnicoAsignado: tecnicoSeleccionado,
        nombreTecnico: tecnico.nombre,
        areaTecnica: tecnico.area,
        comentarioAsignacion,
        fechaAsignacion: new Date().toISOString(),
        esReasignacion: true,
        tecnicoAnterior: incidencia.tecnicoAsignado,
        nombreTecnicoAnterior: incidencia.nombreTecnico
      });
      
      onClose();
    } catch (error) {
      console.error('Error al reasignar técnico:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Card.Title>
                    {incidencia.tecnicoAsignado ? 'Reasignar Técnico' : 'Asignar Técnico'}
                  </Card.Title>
                  <p className="text-sm text-gray-600">
                    {incidencia.numeroIncidencia} - {incidencia.titulo}
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
              {/* Información de la incidencia */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Información de la Incidencia</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Estado:</span>
                    <span className="ml-2 font-medium">{incidencia.estado}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Prioridad:</span>
                    <span className="ml-2 font-medium">{incidencia.prioridad}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Categoría:</span>
                    <span className="ml-2 font-medium">{incidencia.categoria}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Impacto:</span>
                    <span className="ml-2 font-medium">{incidencia.impacto}</span>
                  </div>
                </div>
              </div>

              {/* Técnico actual (si existe) */}
              {incidencia.tecnicoAsignado && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Técnico Actualmente Asignado
                  </h4>
                  <div className="text-sm text-yellow-700">
                    <div className="font-medium">{incidencia.nombreTecnico}</div>
                    <div className="text-yellow-600">{incidencia.areaTecnica}</div>
                    <div className="text-yellow-600">{incidencia.tecnicoAsignado}</div>
                  </div>
                </div>
              )}

              {/* Selección de técnico */}
              <div>
                <Select
                  label="Seleccionar Técnico"
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
                    <CheckCircle className="w-4 h-4 mr-2" />
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
                          Incidencias asignadas: {tecnico.incidenciasAsignadas} | 
                          Promedio resolución: {tecnico.promedioResolucion}h
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Comentario de asignación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentario de Asignación
                </label>
                <textarea
                  value={comentarioAsignacion}
                  onChange={(e) => setComentarioAsignacion(e.target.value)}
                  placeholder="Agregar comentario sobre la asignación (opcional)..."
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
                {incidencia.tecnicoAsignado ? (
                  <Button
                    onClick={handleReasignar}
                    disabled={!tecnicoSeleccionado || loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {loading ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Reasignar Técnico
                  </Button>
                ) : (
                  <Button
                    onClick={handleAsignar}
                    disabled={!tecnicoSeleccionado || loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Asignar Técnico
                  </Button>
                )}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ModalAsignacionTecnico;
