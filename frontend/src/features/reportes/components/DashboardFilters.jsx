import React from 'react';
import { Search, Filter, X, Calendar, User, Building, Star, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const DashboardFilters = ({ filtros, actualizarFiltros, limpiarFiltros, opcionesFiltros, casosFiltrados, encuestasFiltradas }) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <Card className="mb-6">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <Card.Title>Filtros del Dashboard</Card.Title>
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
            placeholder="Buscar por número de caso, título, descripción, usuario, técnico, área, tipo, prioridad, estado, observaciones..."
            value={filtros.busqueda}
            onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
            icon={Search}
            className="w-full"
          />
          <div className="mt-2 text-xs text-gray-500">
            💡 Ejemplos: "CAS-2024", "impresora", "Carlos", "Hardware", "Alta", "Cerrado", "Excelente"
          </div>
        </div>

        {/* Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtros de Casos */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Filtros de Casos
            </h4>
            
            <Select
              label="Estado del Caso"
              value={filtros.estadoCaso}
              onChange={(e) => actualizarFiltros({ estadoCaso: e.target.value })}
              options={[
                { value: '', label: 'Todos los estados' },
                ...opcionesFiltros.estados.map(estado => ({ value: estado, label: estado }))
              ]}
            />

            <Select
              label="Tipo de Caso"
              value={filtros.tipoCaso}
              onChange={(e) => actualizarFiltros({ tipoCaso: e.target.value })}
              options={[
                { value: '', label: 'Todos los tipos' },
                ...opcionesFiltros.tiposCaso.map(tipo => ({ value: tipo, label: tipo }))
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
              label="Área Técnica"
              value={filtros.areaTecnica}
              onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
              options={[
                { value: '', label: 'Todas las áreas' },
                ...opcionesFiltros.areasTecnicas.map(area => ({ value: area, label: area }))
              ]}
            />

            <Select
              label="Técnico Asignado"
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              options={[
                { value: '', label: 'Todos los técnicos' },
                ...opcionesFiltros.tecnicos.map(tecnico => ({ value: tecnico.email, label: tecnico.nombre }))
              ]}
            />
          </div>

          {/* Filtros de Encuestas */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Filtros de Encuestas
            </h4>
            
            <Select
              label="Calificación General"
              value={filtros.calificacion}
              onChange={(e) => actualizarFiltros({ calificacion: e.target.value })}
              options={[
                { value: '', label: 'Todas las calificaciones' },
                ...opcionesFiltros.calificaciones.map(cal => ({ value: cal, label: cal }))
              ]}
            />

            <Select
              label="Nivel de Satisfacción"
              value={filtros.nivelSatisfaccion}
              onChange={(e) => actualizarFiltros({ nivelSatisfaccion: e.target.value })}
              options={[
                { value: '', label: 'Todos los niveles' },
                ...opcionesFiltros.nivelesSatisfaccion.map(nivel => ({ value: nivel, label: nivel }))
              ]}
            />

            <Input
              label="Satisfacción Mínima"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="1.0"
              value={filtros.satisfaccionMinima}
              onChange={(e) => actualizarFiltros({ satisfaccionMinima: e.target.value })}
            />

            <Input
              label="Satisfacción Máxima"
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="5.0"
              value={filtros.satisfaccionMaxima}
              onChange={(e) => actualizarFiltros({ satisfaccionMaxima: e.target.value })}
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

            <Input
              label="Días Abierto (Mínimo)"
              type="number"
              placeholder="0"
              value={filtros.diasAbiertoMinimo}
              onChange={(e) => actualizarFiltros({ diasAbiertoMinimo: e.target.value })}
            />

            <Input
              label="Días Abierto (Máximo)"
              type="number"
              placeholder="30"
              value={filtros.diasAbiertoMaximo}
              onChange={(e) => actualizarFiltros({ diasAbiertoMaximo: e.target.value })}
            />
          </div>

          {/* Filtros de Tiempo */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Filtros de Tiempo
            </h4>
            
            <Input
              label="Tiempo Resolución (Mínimo)"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={filtros.tiempoResolucionMinimo}
              onChange={(e) => actualizarFiltros({ tiempoResolucionMinimo: e.target.value })}
            />

            <Input
              label="Tiempo Resolución (Máximo)"
              type="number"
              step="0.1"
              placeholder="24.0"
              value={filtros.tiempoResolucionMaximo}
              onChange={(e) => actualizarFiltros({ tiempoResolucionMaximo: e.target.value })}
            />

            <Select
              label="Casos Escalados"
              value={filtros.escalado}
              onChange={(e) => actualizarFiltros({ escalado: e.target.value })}
              options={[
                { value: '', label: 'Todos' },
                { value: 'true', label: 'Solo Escalados' },
                { value: 'false', label: 'No Escalados' }
              ]}
            />

            <Select
              label="Casos Retrasados"
              value={filtros.retrasado}
              onChange={(e) => actualizarFiltros({ retrasado: e.target.value })}
              options={[
                { value: '', label: 'Todos' },
                { value: 'true', label: 'Solo Retrasados' },
                { value: 'false', label: 'A Tiempo' }
              ]}
            />
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>{casosFiltrados.length}</strong> casos encontrados
              <span className="mx-2">•</span>
              <strong>{encuestasFiltradas.length}</strong> encuestas encontradas
              {filtrosActivos > 0 && (
                <span className="ml-2 text-blue-600">
                  (filtrados de {casosFiltrados.length + encuestasFiltradas.length} registros totales)
                </span>
              )}
            </div>
            {(casosFiltrados.length === 0 && encuestasFiltradas.length === 0) && filtrosActivos > 0 && (
              <div className="text-sm text-red-600">
                ⚠️ No se encontraron registros con los filtros aplicados
              </div>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default DashboardFilters;
