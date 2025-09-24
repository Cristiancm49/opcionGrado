import React from 'react';
import { Search, Filter, X, User, Building, Star, Calendar, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const RevisionFilters = ({ filtros, actualizarFiltros, limpiarFiltros, trabajosFiltrados, trabajosPendientesFiltrados, trabajosRevisadosFiltrados }) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <Card className="mb-6">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <Card.Title>Filtros de Revisión</Card.Title>
            {filtrosActivos > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {filtrosActivos} filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {filtrosActivos > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={limpiarFiltros}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4 mr-1" />
              Limpiar Filtros
            </Button>
          )}
        </div>
      </Card.Header>
      
      <Card.Content>
        {/* Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Filtros de Trabajo */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Filtros de Trabajo
            </h4>
            
            <Select
              label="Técnico Asignado"
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              options={[
                { value: '', label: 'Todos los técnicos' },
                { value: 'Carlos Martínez', label: 'Carlos Martínez' },
                { value: 'Ana López', label: 'Ana López' },
                { value: 'Luis Rodríguez', label: 'Luis Rodríguez' }
              ]}
            />

            <Select
              label="Área Técnica"
              value={filtros.areaTecnica}
              onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
              options={[
                { value: '', label: 'Todas las áreas' },
                { value: 'Soporte Hardware', label: 'Soporte Hardware' },
                { value: 'Soporte Software', label: 'Soporte Software' },
                { value: 'Soporte Redes', label: 'Soporte Redes' }
              ]}
            />

            <Select
              label="Prioridad"
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              options={[
                { value: '', label: 'Todas las prioridades' },
                { value: 'Baja', label: 'Baja' },
                { value: 'Media', label: 'Media' },
                { value: 'Alta', label: 'Alta' },
                { value: 'Crítica', label: 'Crítica' }
              ]}
            />
          </div>

          {/* Filtros de Estado */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Estado de Revisión
            </h4>
            
            <Select
              label="Estado de Revisión"
              value={filtros.estadoRevision}
              onChange={(e) => actualizarFiltros({ estadoRevision: e.target.value })}
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'Pendiente', label: 'Pendiente de Revisión' },
                { value: 'Revisado', label: 'Revisado' }
              ]}
            />

            <Input
              label="Calificación Mínima"
              type="number"
              min="1"
              max="5"
              placeholder="1"
              value={filtros.calificacionMinima}
              onChange={(e) => actualizarFiltros({ calificacionMinima: e.target.value })}
            />

            <Input
              label="Calificación Máxima"
              type="number"
              min="1"
              max="5"
              placeholder="5"
              value={filtros.calificacionMaxima}
              onChange={(e) => actualizarFiltros({ calificacionMaxima: e.target.value })}
            />
          </div>

          {/* Filtros de Fechas */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Filtros de Fechas
            </h4>
            
            <Input
              label="Fecha Desde"
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
            />

            <Input
              label="Fecha Hasta"
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
            />
          </div>

          {/* Información de resultados */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Resumen
            </h4>
            
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="text-sm text-gray-600">
                <strong>{trabajosFiltrados.length}</strong> trabajos encontrados
              </div>
              <div className="text-sm text-gray-600">
                <strong>{trabajosPendientesFiltrados.length}</strong> pendientes de revisión
              </div>
              <div className="text-sm text-gray-600">
                <strong>{trabajosRevisadosFiltrados.length}</strong> ya revisados
              </div>
            </div>

            {(trabajosFiltrados.length === 0) && filtrosActivos > 0 && (
              <div className="text-sm text-red-600 p-2 bg-red-50 rounded">
                ⚠️ No se encontraron trabajos con los filtros aplicados
              </div>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default RevisionFilters;
