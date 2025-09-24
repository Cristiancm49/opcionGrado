import React from 'react';
import { Search, Filter, Calendar, User, Shield, RefreshCw, Download, BarChart3, Star } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const QualitySurveysFilters = ({ 
  filtros, 
  actualizarFiltros, 
  limpiarFiltros, 
  tecnicos, 
  areasTecnicas, 
  tiposCaso,
  prioridades,
  encuestasFiltradas,
  encuestasOriginales 
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Filtros de Encuestas de Calidad</Card.Title>
        <p className="text-sm text-gray-600 mt-1">
          Filtra las encuestas por diferentes criterios para análisis detallado
        </p>
      </Card.Header>
      
      <Card.Content>
        {/* Búsqueda general - Destacada */}
        <div className="mb-6">
          <Input
            label="🔍 Búsqueda General"
            placeholder="Buscar por: caso, usuario, técnico, área, tipo, prioridad, satisfacción, tiempo, observaciones, respuestas..."
            value={filtros.busqueda}
            onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
            icon={Search}
            className="text-lg"
          />
          <div className="mt-2 text-xs text-gray-500">
            💡 <strong>Ejemplos:</strong> "excelente", "hardware", "carlos", "CAS-2024", "2.5", "buena", "hora", "reparación"
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Técnico */}
          <div>
            <Select
              label="Técnico"
              placeholder="Todos los técnicos"
              value={filtros.tecnico}
              onChange={(value) => actualizarFiltros({ tecnico: value })}
            >
              <option value="">Todos los técnicos</option>
              {tecnicos.map(tecnico => (
                <option key={tecnico.id} value={tecnico.email}>
                  {tecnico.nombre} ({tecnico.area})
                </option>
              ))}
            </Select>
          </div>

          {/* Área Técnica */}
          <div>
            <Select
              label="Área Técnica"
              placeholder="Todas las áreas"
              value={filtros.areaTecnica}
              onChange={(value) => actualizarFiltros({ areaTecnica: value })}
            >
              <option value="">Todas las áreas</option>
              {areasTecnicas.map(area => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Select>
          </div>

          {/* Tipo de Caso */}
          <div>
            <Select
              label="Tipo de Caso"
              placeholder="Todos los tipos"
              value={filtros.tipoCaso}
              onChange={(value) => actualizarFiltros({ tipoCaso: value })}
            >
              <option value="">Todos los tipos</option>
              {tiposCaso.map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Select>
          </div>

          {/* Prioridad */}
          <div>
            <Select
              label="Prioridad"
              placeholder="Todas las prioridades"
              value={filtros.prioridad}
              onChange={(value) => actualizarFiltros({ prioridad: value })}
            >
              <option value="">Todas las prioridades</option>
              {prioridades.map(prioridad => (
                <option key={prioridad} value={prioridad}>
                  {prioridad}
                </option>
              ))}
            </Select>
          </div>

          {/* Fecha desde */}
          <div>
            <Input
              label="Fecha desde"
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
              icon={Calendar}
            />
          </div>

          {/* Fecha hasta */}
          <div>
            <Input
              label="Fecha hasta"
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
              icon={Calendar}
            />
          </div>

          {/* Satisfacción mínima */}
          <div>
            <Select
              label="Satisfacción Mínima"
              placeholder="Cualquier nivel"
              value={filtros.satisfaccionMinima}
              onChange={(value) => actualizarFiltros({ satisfaccionMinima: value })}
            >
              <option value="">Cualquier nivel</option>
              <option value="5">5 - Excelente</option>
              <option value="4">4 - Buena</option>
              <option value="3">3 - Regular</option>
              <option value="2">2 - Mala</option>
              <option value="1">1 - Muy Mala</option>
            </Select>
          </div>

          {/* Satisfacción máxima */}
          <div>
            <Select
              label="Satisfacción Máxima"
              placeholder="Cualquier nivel"
              value={filtros.satisfaccionMaxima}
              onChange={(value) => actualizarFiltros({ satisfaccionMaxima: value })}
            >
              <option value="">Cualquier nivel</option>
              <option value="5">5 - Excelente</option>
              <option value="4">4 - Buena</option>
              <option value="3">3 - Regular</option>
              <option value="2">2 - Mala</option>
              <option value="1">1 - Muy Mala</option>
            </Select>
          </div>
        </div>

        {/* Botones de filtros */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {filtros.busqueda ? (
              <div>
                <span className="font-medium text-blue-600">
                  🔍 "{filtros.busqueda}" encontrado en {encuestasFiltradas.length} de {encuestasOriginales.length} encuestas
                </span>
                {encuestasFiltradas.length === 0 && (
                  <div className="text-red-500 text-xs mt-1">
                    No se encontraron resultados. Intenta con otros términos.
                  </div>
                )}
              </div>
            ) : (
              <span>Mostrando {encuestasFiltradas.length} de {encuestasOriginales.length} encuestas</span>
            )}
          </div>
          <div className="flex space-x-2">
            {filtros.busqueda && (
              <Button
                variant="outline"
                icon={Search}
                onClick={() => actualizarFiltros({ busqueda: '' })}
              >
                Limpiar Búsqueda
              </Button>
            )}
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={limpiarFiltros}
            >
              Limpiar Todo
            </Button>
            <Button
              variant="outline"
              icon={BarChart3}
              onClick={() => console.log('Ver análisis detallado')}
            >
              Análisis Detallado
            </Button>
            <Button
              variant="outline"
              icon={Download}
              onClick={() => console.log('Exportar encuestas')}
            >
              Exportar
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default QualitySurveysFilters;
