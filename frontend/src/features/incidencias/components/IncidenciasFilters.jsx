import React from 'react';
import { Search, Filter, X, Building, User, Calendar, Clock, AlertCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const IncidenciasFilters = ({ filtros, actualizarFiltros, limpiarFiltros, opcionesFiltros, incidenciasFiltradas }) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <Card className="mb-6">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <Card.Title>Filtros de Incidencias</Card.Title>
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
        {/* Búsqueda general */}
        <div className="mb-6">
          <Input
            label="🔍 Búsqueda General"
            placeholder="Buscar por número, título, descripción, usuario, técnico, categoría, ubicación, solución..."
            value={filtros.busqueda}
            onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
            icon={Search}
            className="w-full"
          />
          <div className="mt-2 text-xs text-gray-500">
            💡 Ejemplos: "INC-2024", "servidor", "Carlos", "Infraestructura", "crítico"
          </div>
        </div>

        {/* Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtros de Estado */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Estado y Prioridad
            </h4>
            
            <Select
              label="Estado"
              value={filtros.estado}
              onChange={(e) => actualizarFiltros({ estado: e.target.value })}
              options={[
                { value: '', label: 'Todos los estados' },
                ...opcionesFiltros.estados.map(estado => ({ value: estado, label: estado }))
              ]}
            />

            <Select
              label="Prioridad"
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              options={[
                { value: '', label: 'Todas las prioridades' },
                ...opcionesFiltros.prioridades.map(prioridad => ({ value: prioridad, label: prioridad }))
              ]}
            />

            <Select
              label="Impacto"
              value={filtros.impacto}
              onChange={(e) => actualizarFiltros({ impacto: e.target.value })}
              options={[
                { value: '', label: 'Todos los impactos' },
                ...opcionesFiltros.impactos.map(impacto => ({ value: impacto, label: impacto }))
              ]}
            />

            <Select
              label="Urgencia"
              value={filtros.urgencia}
              onChange={(e) => actualizarFiltros({ urgencia: e.target.value })}
              options={[
                { value: '', label: 'Todas las urgencias' },
                ...opcionesFiltros.urgencias.map(urgencia => ({ value: urgencia, label: urgencia }))
              ]}
            />
          </div>

          {/* Filtros de Categoría */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Categoría y Ubicación
            </h4>
            
            <Select
              label="Categoría"
              value={filtros.categoria}
              onChange={(e) => {
                actualizarFiltros({ 
                  categoria: e.target.value,
                  subcategoria: '' // Limpiar subcategoría al cambiar categoría
                });
              }}
              options={[
                { value: '', label: 'Todas las categorías' },
                ...opcionesFiltros.categorias.map(categoria => ({ value: categoria, label: categoria }))
              ]}
            />

            <Select
              label="Subcategoría"
              value={filtros.subcategoria}
              onChange={(e) => actualizarFiltros({ subcategoria: e.target.value })}
              options={[
                { value: '', label: 'Todas las subcategorías' },
                ...(filtros.categoria && opcionesFiltros.subcategorias[filtros.categoria] 
                  ? opcionesFiltros.subcategorias[filtros.categoria].map(sub => ({ value: sub, label: sub }))
                  : [])
              ]}
              disabled={!filtros.categoria}
            />

            <Select
              label="Ubicación"
              value={filtros.ubicacion}
              onChange={(e) => actualizarFiltros({ ubicacion: e.target.value })}
              options={[
                { value: '', label: 'Todas las ubicaciones' },
                ...opcionesFiltros.ubicaciones.map(ubicacion => ({ value: ubicacion, label: ubicacion }))
              ]}
            />
          </div>

          {/* Filtros de Personal */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal Asignado
            </h4>
            
            <Select
              label="Técnico Asignado"
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              options={[
                { value: '', label: 'Todos los técnicos' },
                ...opcionesFiltros.tecnicos.map(tecnico => ({ value: tecnico.email, label: tecnico.nombre }))
              ]}
            />

            <Select
              label="Cumplimiento SLA"
              value={filtros.cumplioSLA}
              onChange={(e) => actualizarFiltros({ cumplioSLA: e.target.value })}
              options={[
                { value: '', label: 'Todos' },
                { value: 'true', label: 'Cumplió SLA' },
                { value: 'false', label: 'No cumplió SLA' }
              ]}
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

            {/* Información de resultados */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="text-sm text-gray-600">
                <strong>{incidenciasFiltradas.length}</strong> incidencias encontradas
              </div>
              {filtrosActivos > 0 && (
                <div className="text-xs text-blue-600">
                  (filtradas de {incidenciasFiltradas.length} incidencias totales)
                </div>
              )}
            </div>

            {(incidenciasFiltradas.length === 0) && filtrosActivos > 0 && (
              <div className="text-sm text-red-600 p-2 bg-red-50 rounded">
                ⚠️ No se encontraron incidencias con los filtros aplicados
              </div>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default IncidenciasFilters;
