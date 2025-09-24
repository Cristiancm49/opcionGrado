import React from 'react';
import { Search, Filter, Calendar, User, Shield, RefreshCw, Download, BarChart3 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ConfigAuditFilters = ({ 
  filtros, 
  actualizarFiltros, 
  limpiarFiltros, 
  usuarios, 
  acciones, 
  entidades,
  auditLogsFiltrados,
  auditLogsOriginales 
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Filtros de Reporte</Card.Title>
        <p className="text-sm text-gray-600 mt-1">
          Filtra el historial de cambios de configuración del sistema
        </p>
      </Card.Header>
      
      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Búsqueda general */}
          <div>
            <Input
              label="Buscar"
              placeholder="Usuario, entidad, detalles..."
              value={filtros.busqueda}
              onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
              icon={Search}
            />
          </div>

          {/* Usuario */}
          <div>
            <Select
              label="Usuario"
              placeholder="Todos los usuarios"
              value={filtros.usuario}
              onChange={(value) => actualizarFiltros({ usuario: value })}
            >
              <option value="">Todos los usuarios</option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.email}>
                  {usuario.nombre} ({usuario.rol})
                </option>
              ))}
            </Select>
          </div>

          {/* Acción */}
          <div>
            <Select
              label="Acción"
              placeholder="Todas las acciones"
              value={filtros.accion}
              onChange={(value) => actualizarFiltros({ accion: value })}
            >
              <option value="">Todas las acciones</option>
              {acciones.map(accion => (
                <option key={accion} value={accion}>
                  {accion.replace(/_/g, ' ')}
                </option>
              ))}
            </Select>
          </div>

          {/* Entidad */}
          <div>
            <Select
              label="Entidad"
              placeholder="Todas las entidades"
              value={filtros.entidad}
              onChange={(value) => actualizarFiltros({ entidad: value })}
            >
              <option value="">Todas las entidades</option>
              {entidades.map(entidad => (
                <option key={entidad} value={entidad}>
                  {entidad}
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
        </div>

        {/* Botones de filtros */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Mostrando {auditLogsFiltrados.length} de {auditLogsOriginales.length} registros
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={limpiarFiltros}
            >
              Limpiar Filtros
            </Button>
            <Button
              variant="outline"
              icon={BarChart3}
              onClick={() => console.log('Ver gráficas')}
            >
              Ver Gráficas
            </Button>
            <Button
              variant="outline"
              icon={Download}
              onClick={() => console.log('Exportar reporte')}
            >
              Exportar
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ConfigAuditFilters;
