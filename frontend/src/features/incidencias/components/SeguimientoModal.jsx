// Modal para mostrar seguimiento de la incidencia

import useAppStore from '../../../store/useAppStore';

const SeguimientoModal = ({ incidencia, onClose }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  if (!incidencia) return null;

  const historialSeguimiento = [
    {
      fecha: incidencia.fechaModificacion + ' 15:30',
      usuario: incidencia.tecnicoAsignado || 'Sistema',
      accion: 'Última Actualización',
      detalle: incidencia.observaciones || 'Seguimiento en progreso',
      tipo: 'actualizacion'
    },
    {
      fecha: incidencia.fechaRegistro + ' 09:45',
      usuario: incidencia.solicitante,
      accion: 'Incidencia Creada',
      detalle: 'Incidencia reportada por el usuario',
      tipo: 'creacion'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              Seguimiento - {incidencia.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={`text-gray-400 hover:text-gray-600 text-2xl`}
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {historialSeguimiento.map((evento, index) => (
              <div key={index} className={`border-l-4 pl-4 pb-4 ${
                evento.tipo === 'actualizacion' ? 'border-blue-500' :
                evento.tipo === 'creacion' ? 'border-green-500' : 'border-gray-500'
              } ${index !== historialSeguimiento.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                      <span>{
                        evento.tipo === 'actualizacion' ? '🔄' :
                        evento.tipo === 'creacion' ? '📝' : '⚙️'
                      }</span>
                      <span>{evento.accion}</span>
                    </h3>
                    <p className={`text-sm ${themeClasses.secondaryText} mb-2`}>
                      {evento.fecha} - {evento.usuario}
                    </p>
                    <p className={`${themeClasses.primaryText}`}>
                      {evento.detalle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className={`font-semibold mb-2 ${themeClasses.primaryText}`}>
              📊 Resumen de la Incidencia
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {incidencia.diasAbierto}
                </div>
                <div className="text-xs text-gray-500">Días Abierto</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  incidencia.slaStatus === 'Vencido' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {incidencia.slaStatus}
                </div>
                <div className="text-xs text-gray-500">Estado SLA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {incidencia.prioridad}
                </div>
                <div className="text-xs text-gray-500">Prioridad</div>
              </div>
            </div>
          </div>

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

export default SeguimientoModal;





