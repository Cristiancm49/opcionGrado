// frontend/src/features/casos/components/DetalleModal.jsx
// Modal para mostrar detalles completos del caso

import useAppStore from '../../../store/useAppStore';

const DetalleModal = ({ caso, onClose }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  if (!caso) return null;

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={`${themeClasses.sidebarBg} ${themeClasses.modalContainerLarge}`}>
        <div className={themeClasses.modalContent}>
          <div className={themeClasses.modalHeader}>
            <h2 className={`${themeClasses.modalTitle} ${themeClasses.primaryText}`}>
              Caso Técnico - {caso.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={themeClasses.modalCloseButton}
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información del caso */}
            <div className="lg:col-span-2 space-y-6">
              <div className={themeClasses.borderContainer}>
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Información del Caso
                </h3>
                <div className={themeClasses.gridCols2}>
                  <div>
                    <label className={`${themeClasses.formLabel} ${themeClasses.secondaryText}`}>
                      Solicitante
                    </label>
                    <p className={themeClasses.primaryText}>
                      {caso.solicitante}
                    </p>
                    <p className={`${themeClasses.textSm} ${themeClasses.secondaryText}`}>
                      {caso.dependencia}
                    </p>
                  </div>
                  <div>
                    <label className={`${themeClasses.formLabel} ${themeClasses.secondaryText}`}>
                      Contacto
                    </label>
                    <p className={`text-sm ${themeClasses.primaryText}`}>
                      📧 {caso.contacto}
                    </p>
                    <p className={`text-sm ${themeClasses.primaryText}`}>
                      📞 {caso.telefono}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Ubicación
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.ubicacion}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Elemento Afectado
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.elementoAfectado}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Descripción del Problema
                </h3>
                <p className={`${themeClasses.primaryText} p-3 bg-gray-50 rounded`}>
                  {caso.descripcion}
                </p>
              </div>

              {caso.diagnostico && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Diagnóstico Técnico
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-blue-50 rounded`}>
                    {caso.diagnostico}
                  </p>
                </div>
              )}

              {caso.solucionPropuesta && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Solución Propuesta
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-green-50 rounded`}>
                    {caso.solucionPropuesta}
                  </p>
                </div>
              )}

              {caso.solucionAplicada && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Solución Aplicada
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-green-50 rounded`}>
                    {caso.solucionAplicada}
                  </p>
                </div>
              )}

              {caso.observacionesTecnico && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Observaciones del Técnico
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-yellow-50 rounded`}>
                    {caso.observacionesTecnico}
                  </p>
                </div>
              )}

              {caso.requiereConsumibles && caso.consumiblesRequeridos.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Consumibles Requeridos
                  </h3>
                  <div className="p-3 bg-orange-50 rounded">
                    <ul className="space-y-1">
                      {caso.consumiblesRequeridos.map((consumible, index) => (
                        <li key={index} className={`${themeClasses.primaryText}`}>
                          • {consumible}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {caso.evidencias && caso.evidencias.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Evidencias Adjuntas
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {caso.evidencias.map((evidencia, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded text-center">
                        <div className="text-2xl mb-2">📎</div>
                        <p className={`text-xs ${themeClasses.secondaryText}`}>
                          {evidencia}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Panel lateral */}
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Estado del Caso
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Estado Actual
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caso.estado === 'Asignado' ? 'bg-blue-100 text-blue-800' :
                      caso.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                      caso.estado === 'Pendiente' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {caso.estado}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Prioridad
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caso.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                      caso.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                      caso.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {caso.prioridad}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      SLA
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caso.slaStatus === 'En Tiempo' ? 'bg-green-100 text-green-800' :
                      caso.slaStatus === 'En Riesgo' ? 'bg-yellow-100 text-yellow-800' :
                      caso.slaStatus === 'Vencido' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {caso.slaStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Tiempo de Trabajo
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Horas Estimadas
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.horasEstimadas}h
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Horas Trabajadas
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.horasTrabajadas || 0}h
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Días Asignado
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.diasAsignado || 0} días
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Fechas Importantes
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Registro
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.fechaRegistro}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Asignación
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.fechaAsignacion}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Límite SLA
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {caso.fechaLimite}
                    </p>
                  </div>
                  {caso.fechaResolucion && (
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Resolución
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {caso.fechaResolucion}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {caso.proximaAccion && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Próxima Acción
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-blue-50 rounded`}>
                    {caso.proximaAccion}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleModal;
