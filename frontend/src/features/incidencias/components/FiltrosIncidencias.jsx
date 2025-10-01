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
        {/* Primera fila de filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Búsqueda General</span>
            </label>
            <input
              type="text"
              placeholder="Buscar por número, solicitante, descripción..."
              value={filtros.busqueda}
              onChange={(e) => actualizarFiltros({ busqueda: e.target.value })}
              className={createComponentClass('input', 'default', 'sm')}
            />
          </div>

          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Prioridad</span>
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

          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Área Técnica</span>
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

          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Estado Específico</span>
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
        </div>

        {/* Segunda fila de filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Técnico Asignado</span>
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

          <div className="space-y-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Estado SLA</span>
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

          <div className="space-y-2 lg:col-span-2">
            <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Rango de Fechas</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
                className={createComponentClass('input', 'default', 'md')}
                placeholder="dd/mm/aaaa"
              />
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
                className={createComponentClass('input', 'default', 'md')}
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrosIncidencias;