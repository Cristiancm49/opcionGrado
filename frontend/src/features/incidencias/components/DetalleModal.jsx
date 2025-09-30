// Modal para mostrar detalles completos de la incidencia

import useAppStore from '../../../store/useAppStore';

const DetalleModal = ({ incidencia, onClose }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  if (!incidencia) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              Incidencia - {incidencia.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={`text-gray-400 hover:text-gray-600 text-2xl`}
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información de la incidencia */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Información de la Incidencia
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Solicitante
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.solicitante}
                    </p>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {incidencia.dependencia}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Contacto
                    </label>
                    <p className={`text-sm ${themeClasses.primaryText}`}>
                      📧 {incidencia.contacto}
                    </p>
                    <p className={`text-sm ${themeClasses.primaryText}`}>
                      📞 {incidencia.telefono}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Ubicación
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.ubicacion}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Elemento Afectado
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.elementoAfectado}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Descripción del Problema
                </h3>
                <p className={`${themeClasses.primaryText} p-3 bg-gray-50 rounded`}>
                  {incidencia.descripcion}
                </p>
              </div>

              {incidencia.observaciones && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Observaciones
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-blue-50 rounded`}>
                    {incidencia.observaciones}
                  </p>
                </div>
              )}

              {incidencia.evidencias && incidencia.evidencias.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Evidencias Adjuntas
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {incidencia.evidencias.map((evidencia, index) => (
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

              {incidencia.historial && incidencia.historial.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Historial de la Incidencia
                  </h3>
                  <div className="space-y-3">
                    {incidencia.historial.map((evento, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${themeClasses.primaryText}`}>
                            {evento.accion}
                          </p>
                          <p className={`text-xs ${themeClasses.secondaryText}`}>
                            {evento.fecha} - {evento.usuario}
                          </p>
                        </div>
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
                  Estado de la Incidencia
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Estado Actual
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      incidencia.estado === 'Activo' ? 'bg-blue-100 text-blue-800' :
                      incidencia.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                      incidencia.estado === 'Pendiente' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incidencia.estado}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Prioridad
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      incidencia.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                      incidencia.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                      incidencia.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incidencia.prioridad}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      SLA
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      incidencia.slaStatus === 'En Tiempo' ? 'bg-green-100 text-green-800' :
                      incidencia.slaStatus === 'En Riesgo' ? 'bg-yellow-100 text-yellow-800' :
                      incidencia.slaStatus === 'Vencido' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {incidencia.slaStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Información Técnica
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Área Técnica
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.areaTecnica}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Tipo de Trabajo
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.tipoTrabajo}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Técnico Asignado
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.tecnicoAsignado || 'Sin asignar'}
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
                      {incidencia.fechaRegistro}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Última Modificación
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.fechaModificacion}
                    </p>
                  </div>
                  {incidencia.fechaResolucion && (
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Resolución
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {incidencia.fechaResolucion}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {incidencia.calificacion && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Calificación del Usuario
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Calificación
                      </label>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < incidencia.calificacion ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                        <span className={`ml-2 text-sm ${themeClasses.primaryText}`}>
                          ({incidencia.calificacion}/5)
                        </span>
                      </div>
                    </div>
                    {incidencia.comentario && (
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                          Comentario
                        </label>
                        <p className={`${themeClasses.primaryText} p-3 bg-yellow-50 rounded`}>
                          {incidencia.comentario}
                        </p>
                      </div>
                    )}
                  </div>
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





