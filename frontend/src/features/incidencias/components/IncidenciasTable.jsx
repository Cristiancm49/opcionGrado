// Componente para mostrar la tabla de incidencias

import { createComponentClass, combineClasses, getTextColorClass } from '../../../styles/tailwind';
import { getPrioridadColor, getEstadoColor, getSlaColor } from '../data/incidenciasData';

const IncidenciasTable = ({ incidencias, onShowDetalle, onShowSeguimiento, onShowEncuesta }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Incidencia
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Solicitante
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Descripción
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Técnico Asignado
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Estado SLA
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Días Abierto
            </th>
            <th scope="col" className={combineClasses('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', getTextColorClass('secondary'))}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incidencias.map((incidencia) => (
            <tr key={incidencia.id} className="hover:bg-gray-50 transition-colors">
              {/* Número de incidencia */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                    {incidencia.numeroCaso}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={combineClasses('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getPrioridadColor(incidencia.prioridad))}>
                      {incidencia.prioridad}
                    </span>
                    <span className={combineClasses('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getEstadoColor(incidencia.estado))}>
                      {incidencia.estado}
                    </span>
                  </div>
                </div>
              </td>

              {/* Solicitante */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={combineClasses('text-sm', getTextColorClass('primary'))}>
                  {incidencia.solicitante}
                </div>
                <div className={combineClasses('text-xs mt-1', getTextColorClass('secondary'))}>
                  {incidencia.dependencia}
                </div>
              </td>

              {/* Descripción */}
              <td className="px-6 py-4">
                <div className={combineClasses('text-sm text-gray-700 truncate w-64', getTextColorClass('primary'))}>
                  {incidencia.descripcion}
                </div>
                <div className={combineClasses('text-xs mt-1', getTextColorClass('secondary'))}>
                  {incidencia.areaTecnica} • {incidencia.tipoTrabajo}
                </div>
              </td>

              {/* Técnico asignado */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                  {incidencia.tecnicoAsignado || 'Sin asignar'}
                </div>
              </td>

              {/* Estado SLA */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={combineClasses('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getSlaColor(incidencia.slaStatus))}>
                  {incidencia.slaStatus}
                </span>
              </td>

              {/* Días Abierto */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={combineClasses('text-sm', getTextColorClass('primary'))}>
                  {incidencia.diasAbierto} días
                </div>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onShowDetalle(incidencia)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    title="Ver Detalles"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </button>
                  <button
                    onClick={() => onShowSeguimiento(incidencia)}
                    className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-50"
                    title="Ver Seguimiento"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </button>
                  {incidencia.estado === 'Resuelto' && (
                    <button
                      onClick={() => onShowEncuesta(incidencia)}
                      className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                      title="Ver Encuesta"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidenciasTable;



