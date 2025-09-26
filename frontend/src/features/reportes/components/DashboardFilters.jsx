import React from 'react';
import { Search, Filter, X, Calendar, User, Building, Star, Clock } from 'lucide-react';
import { Button, Card, Input } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, gradients, THEME_CONSTANTS } from '../../../styles/theme';

const DashboardFilters = ({ filtros, actualizarFiltros, limpiarFiltros, opcionesFiltros, casosFiltrados, encuestasFiltradas }) => {
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
                console.log('🔍 Ejecutando búsqueda del dashboard:', filtros.busqueda);
              }}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              disabled={!filtros.busqueda}
              icon={<Search className="w-4 h-4" />}
            >
              Aplicar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => actualizarFiltros({ busqueda: '' })}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              disabled={!filtros.busqueda}
              icon={<X className="w-4 h-4" />}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Contenido de filtros */}
      <div className="p-6">
        {/* Fila 1: Búsqueda principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Número de caso, título, descripción, usuario, técnico..."
              value={filtros.busqueda}
              onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
              icon={<Search className="w-4 h-4 text-primary-500" />}
              helper="💡 Ejemplos: 'CAS-2024', 'impresora', 'Carlos', 'Hardware', 'Alta'"
            />
          </div>
        </div>

        {/* Fila 2: Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtros de Casos */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Estado Caso</span>
            </label>
            <select
              value={filtros.estadoCaso}
              onChange={(e) => actualizarFiltros({ estadoCaso: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los estados</option>
              {opcionesFiltros.estadosCaso && opcionesFiltros.estadosCaso.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-green-500" />
              <span>Tipo Caso</span>
            </label>
            <select
              value={filtros.tipoCaso}
              onChange={(e) => actualizarFiltros({ tipoCaso: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los tipos</option>
              {opcionesFiltros.tiposCaso && opcionesFiltros.tiposCaso.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4 text-purple-500" />
              <span>Técnico</span>
            </label>
            <select
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los técnicos</option>
              {opcionesFiltros.tecnicos && opcionesFiltros.tecnicos.map(tecnico => (
                <option key={tecnico.id} value={tecnico.nombre}>{tecnico.nombre}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Calificación</span>
            </label>
            <select
              value={filtros.calificacion}
              onChange={(e) => actualizarFiltros({ calificacion: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las calificaciones</option>
              <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
              <option value="4">⭐⭐⭐⭐ Buena</option>
              <option value="3">⭐⭐⭐ Regular</option>
              <option value="2">⭐⭐ Mala</option>
              <option value="1">⭐ Muy Mala</option>
            </select>
          </div>
        </div>

        {/* Fila 3: Filtros adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Días Abierto</span>
            </label>
            <select
              value={filtros.diasAbierto}
              onChange={(e) => actualizarFiltros({ diasAbierto: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos</option>
              <option value="1-3">1-3 días</option>
              <option value="4-7">4-7 días</option>
              <option value="8-15">8-15 días</option>
              <option value="15+">Más de 15 días</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-indigo-500" />
              <span>Área</span>
            </label>
            <select
              value={filtros.area}
              onChange={(e) => actualizarFiltros({ area: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las áreas</option>
              {opcionesFiltros.areas && opcionesFiltros.areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>{casosFiltrados.length}</strong> casos • <strong>{encuestasFiltradas.length}</strong> encuestas
            </div>
            {filtrosActivos > 0 && (
              <div className="text-xs text-blue-600">
                {filtrosActivos} filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardFilters;