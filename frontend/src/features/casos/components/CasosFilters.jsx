import { useState } from 'react';
import { Search, Filter, X, Calendar, User, Settings } from 'lucide-react';
import { Button, Card, Input } from '../../../styles/components';
import { cn, classNames } from '../../../styles/utils';
import { textStyles, componentColors, gradients, THEME_CONSTANTS } from '../../../styles/theme';

const CasosFilters = ({ filtros, opcionesFiltros, actualizarFiltros, limpiarFiltros, aplicarFiltros }) => {
  const [busquedaTemporal, setBusquedaTemporal] = useState(filtros.busqueda);

  const handleBuscar = () => {
    actualizarFiltros({ busqueda: busquedaTemporal });
  };

  const handleLimpiarBusqueda = () => {
    setBusquedaTemporal('');
    actualizarFiltros({ busqueda: '' });
  };

  return (
    <Card variant="default" className="mb-6">
      {/* Header con gradiente */}
      <div className={cn(
        'bg-gradient-to-r',
        gradients.primary,
        'px-6 py-4 rounded-t-lg'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-white" />
            <h3 className={cn(textStyles.h4, 'text-white')}>Filtros de Casos</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={aplicarFiltros}
              className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              icon={<Filter className="w-4 h-4" />}
            >
              Aplicar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={limpiarFiltros}
              className="bg-red-500 bg-opacity-20 text-white hover:bg-opacity-30"
              icon={<X className="w-4 h-4" />}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Búsqueda general */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={busquedaTemporal}
              onChange={(e) => setBusquedaTemporal(e.target.value)}
              placeholder="Buscar por número, solicitante, descripción..."
              icon={<Search className="w-4 h-4" />}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleBuscar}
              icon={<Search className="w-4 h-4" />}
            >
              Buscar
            </Button>
            <Button
              variant="error"
              size="md"
              onClick={handleLimpiarBusqueda}
              icon={<X className="w-4 h-4" />}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {/* Filtros principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Estado Técnico */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <Settings className="w-4 h-4" />
              <span>Estado Técnico</span>
            </label>
            <select
              value={filtros.estadoTecnico}
              onChange={(e) => actualizarFiltros({ estadoTecnico: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            >
              {opcionesFiltros.estadosTecnico.map(estado => (
                <option key={estado.value} value={estado.value}>{estado.label}</option>
              ))}
            </select>
          </div>

          {/* Prioridad */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <span>⚠️</span>
              <span>Prioridad</span>
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            >
              {opcionesFiltros.prioridades.map(prioridad => (
                <option key={prioridad.value} value={prioridad.value}>{prioridad.label}</option>
              ))}
            </select>
          </div>

          {/* Área Técnica */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <span>🔧</span>
              <span>Área Técnica</span>
            </label>
            <select
              value={filtros.areaTecnica}
              onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            >
              {opcionesFiltros.areasTecnicas.map(area => (
                <option key={area.value} value={area.value}>{area.label}</option>
              ))}
            </select>
          </div>

          {/* SLA Status */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <span>⏰</span>
              <span>Estado SLA</span>
            </label>
            <select
              value={filtros.slaStatus}
              onChange={(e) => actualizarFiltros({ slaStatus: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            >
              {opcionesFiltros.slaStatus.map(sla => (
                <option key={sla.value} value={sla.value}>{sla.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtros adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tipo de Trabajo */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <span>🛠️</span>
              <span>Tipo de Trabajo</span>
            </label>
            <select
              value={filtros.tipoTrabajo}
              onChange={(e) => actualizarFiltros({ tipoTrabajo: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            >
              {opcionesFiltros.tiposTrabajo.map(tipo => (
                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
              ))}
            </select>
          </div>

          {/* Fecha Desde */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <Calendar className="w-4 h-4" />
              <span>Fecha Desde</span>
            </label>
            <input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            />
          </div>

          {/* Fecha Hasta */}
          <div className="space-y-2">
            <label className={cn(textStyles.label, 'flex items-center space-x-2')}>
              <Calendar className="w-4 h-4" />
              <span>Fecha Hasta</span>
            </label>
            <input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
              className={cn(
                'w-full',
                THEME_CONSTANTS.TRANSITION,
                'focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              )}
            />
          </div>
        </div>

        {/* Filtro por solicitante */}
        <div className="mt-4">
          <Input
            type="text"
            value={filtros.solicitante}
            onChange={(e) => actualizarFiltros({ solicitante: e.target.value })}
            placeholder="Buscar por nombre del solicitante..."
            label="Solicitante"
            icon={<User className="w-4 h-4" />}
          />
        </div>
      </div>
    </Card>
  );
};

export default CasosFilters;
