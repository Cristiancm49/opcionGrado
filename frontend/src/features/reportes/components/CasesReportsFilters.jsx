import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CasesReportsFilters = ({ filtros, actualizarFiltros, limpiarFiltros, estadosCaso, tiposCaso, prioridades, areasTecnicas, tecnicos, casosFiltrados }) => {
  const filtrosActivos = Object.values(filtros).filter(valor => valor !== '').length;

  return (
    <Card className="mb-6">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <Card.Title>Filtros de Reportes</Card.Title>
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
            placeholder="Buscar por número de caso, título, descripción, usuario, técnico, área, tipo, prioridad, estado, activo, ubicación..."
            value={filtros.busqueda}
            onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
            icon={Search}
            className="w-full"
          />
          <div className="mt-2 text-xs text-gray-500">
            💡 Ejemplos: "CAS-2024", "impresora", "Carlos", "Hardware", "Alta", "Cerrado", "Oficina Principal"
          </div>
        </div>

        {/* Filtros específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Estado del Caso"
            value={filtros.estado}
            onChange={(e) => actualizarFiltros({ estado: e.target.value })}
            options={[
              { value: '', label: 'Todos los estados' },
              ...estadosCaso.map(estado => ({ value: estado, label: estado }))
            ]}
          />

          <Select
            label="Tipo de Caso"
            value={filtros.tipoCaso}
            onChange={(e) => actualizarFiltros({ tipoCaso: e.target.value })}
            options={[
              { value: '', label: 'Todos los tipos' },
              ...tiposCaso.map(tipo => ({ value: tipo, label: tipo }))
            ]}
          />

          <Select
            label="Prioridad"
            value={filtros.prioridad}
            onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
            options={[
              { value: '', label: 'Todas las prioridades' },
              ...prioridades.map(prioridad => ({ value: prioridad, label: prioridad }))
            ]}
          />

          <Select
            label="Técnico Asignado"
            value={filtros.tecnico}
            onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
            options={[
              { value: '', label: 'Todos los técnicos' },
              ...tecnicos.map(tecnico => ({ value: tecnico.email, label: tecnico.nombre }))
            ]}
          />

          <Select
            label="Área Técnica"
            value={filtros.areaTecnica}
            onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
            options={[
              { value: '', label: 'Todas las áreas' },
              ...areasTecnicas.map(area => ({ value: area, label: area }))
            ]}
          />

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

          <Input
            label="Satisfacción (Mínima)"
            type="number"
            min="1"
            max="5"
            placeholder="1"
            value={filtros.satisfaccionMinima}
            onChange={(e) => actualizarFiltros({ satisfaccionMinima: e.target.value })}
          />

          <Input
            label="Satisfacción (Máxima)"
            type="number"
            min="1"
            max="5"
            placeholder="5"
            value={filtros.satisfaccionMaxima}
            onChange={(e) => actualizarFiltros({ satisfaccionMaxima: e.target.value })}
          />
        </div>

        {/* Información de resultados */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <strong>{casosFiltrados.length}</strong> casos encontrados
              {filtrosActivos > 0 && (
                <span className="ml-2 text-blue-600">
                  (filtrados de {casosFiltrados.length > 0 ? casosFiltrados.length : '0'} casos totales)
                </span>
              )}
            </div>
            {casosFiltrados.length === 0 && filtrosActivos > 0 && (
              <div className="text-sm text-red-600">
                ⚠️ No se encontraron casos con los filtros aplicados
              </div>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default CasesReportsFilters;
