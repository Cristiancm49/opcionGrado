// Componente para seleccionar el estado general de las incidencias

import { createComponentClass, combineClasses, getTextColorClass } from '../../../styles/tailwind';

const EstadoSelector = ({ estadoGeneral, cambiarEstadoGeneral, estadisticas }) => {
  return (
    <div className={createComponentClass('card', 'default', 'md', 'shadow-lg mb-6')}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className={combineClasses('font-semibold', getTextColorClass('primary'))}>Estado de las Incidencias</h3>
            <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Filtra incidencias por estado general</p>
          </div>
        </div>
        
        {/* Selector compacto y responsive */}
        <div className="flex flex-wrap gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => cambiarEstadoGeneral('ACTIVOS')}
            className={combineClasses(
              'px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 text-sm',
              estadoGeneral === 'ACTIVOS'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-white hover:shadow-md'
            )}
          >
            <span className="w-2 h-2 bg-current rounded-full"></span>
            <span>Activos</span>
            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
              {estadisticas.activos}
            </span>
          </button>
          <button
            onClick={() => cambiarEstadoGeneral('RESUELTOS')}
            className={combineClasses(
              'px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 text-sm',
              estadoGeneral === 'RESUELTOS'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-white hover:shadow-md'
            )}
          >
            <span className="w-2 h-2 bg-current rounded-full"></span>
            <span>Resueltos</span>
            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
              {estadisticas.resueltos}
            </span>
          </button>
          <button
            onClick={() => cambiarEstadoGeneral('TODOS')}
            className={combineClasses(
              'px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 text-sm',
              estadoGeneral === 'TODOS'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-white hover:shadow-md'
            )}
          >
            <span className="w-2 h-2 bg-current rounded-full"></span>
            <span>Todos</span>
            <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
              {estadisticas.total}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstadoSelector;