// Componente para filtros de incidencias

import { createComponentClass, combineClasses, getTextColorClass } from '../../../styles/tailwind';

const FiltrosIncidencias = ({ filtros, actualizarFiltros, aplicarFiltros, limpiarFiltros }) => {
  const opcionesFiltros = {
    prioridades: ['Crítica', 'Alta', 'Media', 'Baja'],
    areasTecnicas: ['Hardware', 'Software', 'Redes', 'Sistemas'],
    estados: ['Activo', 'En Proceso', 'Pendiente', 'Resuelto'],
    tecnicos: ['Juan Pérez', 'María González', 'Luis Martínez', 'Ana Rodríguez'],
    slaStatus: ['En Tiempo', 'En Riesgo', 'Vencido', 'Cumplido'],
    calificaciones: [1, 2, 3, 4, 5]
  };

  return (
    <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg mb-6 overflow-hidden')}>
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-green-600 rounded-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <div>
              <h3 className={combineClasses('font-semibold', getTextColorClass('primary'))}>Filtros de Incidencias</h3>
              <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Filtra incidencias por criterios específicos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={aplicarFiltros}
              className={createComponentClass('button', 'success', 'md', 'shadow-md hover:shadow-lg flex items-center space-x-2')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Filtrar</span>
            </button>
            <button
              onClick={limpiarFiltros}
              className={createComponentClass('button', 'secondary', 'md', 'shadow-md hover:shadow-lg flex items-center space-x-2')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Búsqueda general */}
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              🔍 Búsqueda General
            </label>
            <input
              type="text"
              value={filtros.busqueda}
              onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
              placeholder="Buscar por número, solicitante, descripción..."
              className={createComponentClass('input', 'default', 'sm')}
            />
          </div>

          {/* Prioridad */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              ⚡ Prioridad
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => actualizarFiltros({ prioridad: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            >
              <option value="">Todas las prioridades</option>
              {opcionesFiltros.prioridades.map(prioridad => (
                <option key={prioridad} value={prioridad}>{prioridad}</option>
              ))}
            </select>
          </div>

          {/* Área Técnica */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              🔧 Área Técnica
            </label>
            <select
              value={filtros.areaTecnica}
              onChange={(e) => actualizarFiltros({ areaTecnica: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            >
              <option value="">Todas las áreas</option>
              {opcionesFiltros.areasTecnicas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Estado Específico */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              📊 Estado Específico
            </label>
            <select
              value={filtros.estadoEspecifico}
              onChange={(e) => actualizarFiltros({ estadoEspecifico: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            >
              <option value="">Todos los estados</option>
              {opcionesFiltros.estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          {/* Técnico Asignado */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              👨‍💻 Técnico Asignado
            </label>
            <select
              value={filtros.tecnico}
              onChange={(e) => actualizarFiltros({ tecnico: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            >
              <option value="">Todos los técnicos</option>
              {opcionesFiltros.tecnicos.map(tecnico => (
                <option key={tecnico} value={tecnico}>{tecnico}</option>
              ))}
            </select>
          </div>

          {/* SLA Status */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              ⏰ Estado SLA
            </label>
            <select
              value={filtros.slaStatus}
              onChange={(e) => actualizarFiltros({ slaStatus: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            >
              <option value="">Todos los estados SLA</option>
              {opcionesFiltros.slaStatus.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Calificación (solo para resueltos) */}
          {filtros.estadoGeneral === 'RESUELTOS' && (
            <div>
              <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
                ⭐ Calificación
              </label>
              <select
                value={filtros.calificacion}
                onChange={(e) => actualizarFiltros({ calificacion: e.target.value })}
                className={createComponentClass('input', 'default', 'sm')}
              >
                <option value="">Todas las calificaciones</option>
                {opcionesFiltros.calificaciones.map(calificacion => (
                  <option key={calificacion} value={calificacion}>{calificacion} estrella{calificacion > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          )}

          {/* Fecha Desde */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              📅 Fecha Desde
            </label>
            <input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            />
          </div>

          {/* Fecha Hasta */}
          <div>
            <label className={combineClasses('block text-sm font-medium mb-2', getTextColorClass('primary'))}>
              📅 Fecha Hasta
            </label>
            <input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrosIncidencias;