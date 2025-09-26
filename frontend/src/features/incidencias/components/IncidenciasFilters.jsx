import React from 'react';
import { Search, Filter, X, Building, User, Calendar, Clock, AlertCircle } from 'lucide-react';

const IncidenciasFilters = ({ 
  filtros, 
  busquedaTemporal, 
  actualizarFiltros, 
  limpiarFiltros, 
  ejecutarBusqueda, 
  limpiarBusqueda, 
  setBusquedaTemporal, 
  opcionesFiltros, 
  incidenciasFiltradas 
}) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-200 overflow-hidden">
      {/* Header con gradiente */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Filtros Avanzados</h3>
              <p className="text-sm text-gray-600">Refina tu búsqueda con filtros específicos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={ejecutarBusqueda}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              disabled={!busquedaTemporal}
            >
              <Search className="w-4 h-4" />
              <span>Aplicar</span>
            </button>
            <button
              onClick={limpiarBusqueda}
              className="px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 border"
              disabled={!busquedaTemporal && !filtros.busqueda}
            >
              <X className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenido de filtros */}
      <div className="p-6">
        {/* Fila 1: Búsqueda principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2 space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Search className="w-4 h-4 text-blue-500" />
              <span>Buscar</span>
            </label>
            <input
              type="text"
              placeholder="Número, título, descripción, usuario, técnico..."
              value={busquedaTemporal}
              onChange={(e) => setBusquedaTemporal(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            />
            <div className="text-xs text-gray-500">
              💡 Ejemplos: "INC-2024", "servidor", "Carlos", "Infraestructura"
            </div>
          </div>
        </div>

        {/* Fila 2: Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Estado y Prioridad */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span>Estado</span>
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => actualizarFiltros({ estado: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos los estados</option>
              {opcionesFiltros.estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span>Prioridad</span>
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las prioridades</option>
              {opcionesFiltros.prioridades.map(prioridad => (
                <option key={prioridad} value={prioridad}>{prioridad}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Categoría</span>
            </label>
            <select
              value={filtros.categoria}
              onChange={(e) => {
                actualizarFiltros({ 
                  categoria: e.target.value,
                  subcategoria: '' // Limpiar subcategoría al cambiar categoría
                });
              }}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las categorías</option>
              {opcionesFiltros.categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

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
              {opcionesFiltros.tecnicos && opcionesFiltros.tecnicos.map(tecnico => (
                <option key={tecnico.email} value={tecnico.email}>{tecnico.nombre}</option>
              ))}
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
              <Clock className="w-4 h-4 text-yellow-500" />
              <span>SLA</span>
            </label>
            <select
              value={filtros.cumplioSLA}
              onChange={(e) => actualizarFiltros({ cumplioSLA: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todos</option>
              <option value="true">Cumplió SLA</option>
              <option value="false">No cumplió SLA</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 text-indigo-500" />
              <span>Ubicación</span>
            </label>
            <select
              value={filtros.ubicacion}
              onChange={(e) => actualizarFiltros({ ubicacion: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
            >
              <option value="">Todas las ubicaciones</option>
              {opcionesFiltros.ubicaciones.map(ubicacion => (
                <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>{incidenciasFiltradas.length}</strong> incidencias encontradas
            </div>
            {filtrosActivos > 0 && (
              <div className="text-xs text-blue-600">
                {filtrosActivos} filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          {(incidenciasFiltradas.length === 0) && filtrosActivos > 0 && (
            <div className="mt-2 text-sm text-red-600 p-2 bg-red-50 rounded">
              ⚠️ No se encontraron incidencias con los filtros aplicados
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidenciasFilters;