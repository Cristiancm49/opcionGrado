import React from 'react';
import { Search, Filter, X, User, Building, Star, Calendar, Clock } from 'lucide-react';
import { Button, Card, Input } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, gradients, THEME_CONSTANTS } from '../../../styles/theme';

const RevisionFilters = ({ filtros, actualizarFiltros, limpiarFiltros, trabajosFiltrados, trabajosPendientesFiltrados, trabajosRevisadosFiltrados }) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <Card variant="elevated" className="mb-6">
      {/* Header con gradiente */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r',
        gradients.primary,
        'border-b border-gray-200'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={cn(textStyles.h4, 'text-white')}>Filtros Avanzados</h3>
              <p className={cn(textStyles.caption, 'text-white text-opacity-80')}>Refina tu búsqueda con filtros específicos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('🔍 Ejecutando búsqueda de revisión administrativa');
              }}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              icon={<Search className="w-4 h-4" />}
            >
              Aplicar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={limpiarFiltros}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              disabled={filtrosActivos === 0}
              icon={<X className="w-4 h-4" />}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contenido de filtros */}
      <div className="p-6">
        {/* Fila 1: Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4 text-green-500" />
              <span>Técnico</span>
            </label>
            <select
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los técnicos</option>
              <option value="Carlos Martínez">Carlos Martínez</option>
              <option value="Ana López">Ana López</option>
              <option value="Luis Rodríguez">Luis Rodríguez</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Área Técnica</span>
            </label>
            <select
              value={filtros.areaTecnica}
              onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las áreas</option>
              <option value="Soporte Hardware">Soporte Hardware</option>
              <option value="Soporte Software">Soporte Software</option>
              <option value="Soporte Redes">Soporte Redes</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Prioridad</span>
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las prioridades</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>Estado</span>
            </label>
            <select
              value={filtros.estadoRevision}
              onChange={(e) => actualizarFiltros({ estadoRevision: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente de Revisión</option>
              <option value="Revisado">Revisado</option>
            </select>
          </div>
        </div>

        {/* Fila 2: Filtros adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Calificación Mínima</span>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="1"
              value={filtros.calificacionMinima}
              onChange={(e) => actualizarFiltros({ calificacionMinima: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Calificación Máxima</span>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="5"
              value={filtros.calificacionMaxima}
              onChange={(e) => actualizarFiltros({ calificacionMaxima: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Fecha Desde</span>
            </label>
            <input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Fecha Hasta</span>
            </label>
            <input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>{trabajosFiltrados.length}</strong> trabajos • <strong>{trabajosPendientesFiltrados.length}</strong> pendientes • <strong>{trabajosRevisadosFiltrados.length}</strong> revisados
            </div>
            {filtrosActivos > 0 && (
              <div className="text-xs text-blue-600">
                {filtrosActivos} filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          {(trabajosFiltrados.length === 0) && filtrosActivos > 0 && (
            <div className="mt-2 text-sm text-red-600 p-2 bg-red-50 rounded">
              ⚠️ No se encontraron trabajos con los filtros aplicados
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RevisionFilters;