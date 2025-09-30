// frontend/src/features/casos/components/SeguimientoModal.jsx
// Modal para registrar seguimiento del caso

import useAppStore from '../../../store/useAppStore';

const SeguimientoModal = ({ caso, onClose, onSave }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const historialTecnico = [
    {
      fecha: caso.fechaUltimaActualizacion + ' 15:30',
      usuario: caso.tecnicoAsignado,
      accion: 'Trabajo en Progreso',
      detalle: caso.observacionesTecnico || 'Continuando con el diagnóstico del problema',
      tipo: 'trabajo'
    },
    {
      fecha: caso.fechaAsignacion + ' 10:15',
      usuario: 'Sistema',
      accion: 'Caso Asignado',
      detalle: `Caso asignado al técnico ${caso.tecnicoAsignado}`,
      tipo: 'sistema'
    },
    {
      fecha: caso.fechaRegistro + ' 09:45',
      usuario: caso.solicitante,
      accion: 'Caso Creado',
      detalle: 'Incidencia reportada por el usuario',
      tipo: 'creacion'
    }
  ];

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={`${themeClasses.sidebarBg} ${themeClasses.modalContainer}`}>
        <div className={themeClasses.modalContent}>
          <div className={themeClasses.modalHeader}>
            <h2 className={`${themeClasses.modalTitle} ${themeClasses.primaryText}`}>
              Seguimiento Técnico - {caso.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={themeClasses.modalCloseButton}
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {historialTecnico.map((evento, index) => (
              <div key={index} className={`border-l-4 pl-4 pb-4 ${
                evento.tipo === 'trabajo' ? 'border-blue-500' :
                evento.tipo === 'sistema' ? 'border-green-500' : 'border-gray-500'
              } ${index !== historialTecnico.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                      <span>{
                        evento.tipo === 'trabajo' ? '🔧' :
                        evento.tipo === 'sistema' ? '⚙️' : '📝'
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

          <div className={themeClasses.infoBoxBlue}>
            <h3 className={`font-semibold mb-2 ${themeClasses.primaryText}`}>
              📊 Resumen de Tiempo
            </h3>
            <div className={themeClasses.gridCols3}>
              <div>
                <div className={themeClasses.statNumberBlue}>
                  {caso.horasEstimadas}h
                </div>
                <div className={themeClasses.statLabel}>Estimado</div>
              </div>
              <div>
                <div className={themeClasses.statNumberGreen}>
                  {caso.horasTrabajadas}h
                </div>
                <div className={themeClasses.statLabel}>Trabajado</div>
              </div>
              <div>
                <div className={`${themeClasses.statNumber} ${
                  (caso.horasEstimadas - caso.horasTrabajadas) < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {(caso.horasEstimadas - caso.horasTrabajadas).toFixed(1)}h
                </div>
                <div className={themeClasses.statLabel}>Restante</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className={themeClasses.actionButtonGray}
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
