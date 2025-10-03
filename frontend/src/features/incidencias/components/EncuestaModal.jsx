// Modal para mostrar encuesta de calidad

import useAppStore from '../../../store/useAppStore';

const EncuestaModal = ({ incidencia, onClose }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  if (!incidencia) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              Encuesta de Calidad - {incidencia.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={`text-gray-400 hover:text-gray-600 text-2xl`}
            >
              ×
            </button>
          </div>

          {incidencia.calificacion ? (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Calificación del Servicio
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-3xl ${i < incidencia.calificacion ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                      {incidencia.calificacion}/5
                    </p>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      {incidencia.calificacion === 5 ? 'Excelente' :
                       incidencia.calificacion === 4 ? 'Muy Bueno' :
                       incidencia.calificacion === 3 ? 'Bueno' :
                       incidencia.calificacion === 2 ? 'Regular' : 'Malo'}
                    </p>
                  </div>
                </div>
              </div>

              {incidencia.comentario && (
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Comentario del Usuario
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-yellow-50 rounded`}>
                    "{incidencia.comentario}"
                  </p>
                </div>
              )}

              <div className="border rounded-lg p-4">
                <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                  Detalles del Servicio
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Técnico Asignado
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.tecnicoAsignado}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Tiempo de Resolución
                    </label>
                    <p className={`${themeClasses.primaryText}`}>
                      {incidencia.diasAbierto} días
                    </p>
                  </div>
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
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className={`text-xl font-semibold mb-2 ${themeClasses.primaryText}`}>
                Encuesta Pendiente
              </h3>
              <p className={`${themeClasses.secondaryText} mb-4`}>
                Esta incidencia aún no ha sido calificada por el usuario.
              </p>
              <p className={`text-sm ${themeClasses.secondaryText}`}>
                La encuesta de calidad estará disponible una vez que la incidencia sea resuelta.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuestaModal;









