// frontend/src/features/casos/components/CasosTable.jsx
// Tabla para mostrar los casos técnicos

import { 
  createComponentClass, 
  combineClasses, 
  getTextColorClass
} from '../../../styles/tailwind';
import { getPrioridadColor, getEstadoTecnicoColor, getSlaColor } from '../data/casosData';

const CasosTable = ({ 
  casos, 
  loading, 
  onDetalle, 
  onSeguimiento, 
  onGestion, 
  onDiagnostico,
  onAceptar,
  onMarcarResuelto,
  onEscalar
}) => {
  if (loading) {
    return (
      <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg')}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className={combineClasses('text-lg', getTextColorClass('secondary'))}>
              Cargando casos técnicos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (casos.length === 0) {
    return (
      <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg')}>
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className={combineClasses('text-lg font-medium mb-2', getTextColorClass('primary'))}>
            No hay casos disponibles
          </h3>
          <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>
            No se encontraron casos que coincidan con los filtros aplicados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg overflow-hidden')}>
      <div className="overflow-x-auto">
        <table className={createComponentClass('table')}>
          <thead className="bg-gray-50">
            <tr>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Caso
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Solicitante
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Descripción
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Técnico
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Tiempo
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Días
              </th>
              <th className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {casos.map((caso) => (
              <tr key={caso.id} className="hover:bg-gray-50 transition-colors">
                {/* Número de caso */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                      {caso.numeroCaso}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={combineClasses('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getPrioridadColor(caso.prioridad))}>
                        {caso.prioridad}
                      </span>
                      <span className={combineClasses('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getEstadoTecnicoColor(caso.estadoTecnico))}>
                        {caso.estadoTecnico}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Solicitante */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={combineClasses('text-sm', getTextColorClass('primary'))}>
                    {caso.solicitante}
                  </div>
                  <div className={combineClasses('text-sm', getTextColorClass('secondary'))}>
                    {caso.dependencia}
                  </div>
                </td>

                {/* Descripción */}
                <td className="px-6 py-4">
                  <div className={combineClasses('text-sm max-w-xs truncate', getTextColorClass('primary'))}>
                    {caso.descripcion}
                  </div>
                  <div className={combineClasses('text-xs mt-1', getTextColorClass('secondary'))}>
                    {caso.areaTecnica} • {caso.tipoTrabajo}
                  </div>
                </td>

                {/* Técnico asignado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                    {caso.tecnicoAsignado}
                  </div>
                </td>

                {/* Tiempo de resolución */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={combineClasses('text-sm', getTextColorClass('primary'))}>
                    {caso.tiempoResolucion || 'Pendiente'}
                  </div>
                  <div className={combineClasses('text-xs', getTextColorClass('secondary'))}>
                    {caso.horasTrabajadas || 0}h trabajadas
                  </div>
                </td>

                {/* Días abierto */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                    {caso.diasAsignado || 0} días
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={combineClasses('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border', getSlaColor(caso.slaStatus))}>
                      {caso.slaStatus}
                    </span>
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDetalle(caso)}
                      className={createComponentClass('button', 'info', 'sm', 'text-xs')}
                      title="Ver detalles"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onSeguimiento(caso)}
                      className={createComponentClass('button', 'warning', 'sm', 'text-xs')}
                      title="Registrar seguimiento"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onGestion(caso)}
                      className={createComponentClass('button', 'success', 'sm', 'text-xs')}
                      title="Gestionar caso"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onDiagnostico(caso)}
                      className={createComponentClass('button', 'primary', 'sm', 'text-xs')}
                      title="Registrar diagnóstico"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </button>

                    {/* Acciones específicas por estado */}
                    {caso.estadoTecnico === 'ASIGNADO' && (
                      <button
                        onClick={() => onAceptar(caso)}
                        className={createComponentClass('button', 'success', 'sm', 'text-xs')}
                        title="Aceptar caso"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}

                    {caso.estadoTecnico === 'EN_PROCESO' && (
                      <button
                        onClick={() => onMarcarResuelto(caso)}
                        className={createComponentClass('button', 'success', 'sm', 'text-xs')}
                        title="Marcar como resuelto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}

                    {(caso.estadoTecnico === 'ASIGNADO' || caso.estadoTecnico === 'EN_PROCESO') && (
                      <button
                        onClick={() => onEscalar(caso)}
                        className={createComponentClass('button', 'error', 'sm', 'text-xs')}
                        title="Escalar caso"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CasosTable;
