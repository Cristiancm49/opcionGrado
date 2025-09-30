// frontend/src/features/casos/components/GestionModal.jsx
// Modal para gestionar el estado del caso

import { useState } from 'react';
import useAppStore from '../../../store/useAppStore';

const GestionModal = ({ caso, onClose, onSave }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [nuevoEstado, setNuevoEstado] = useState(caso.estado);
  const [observaciones, setObservaciones] = useState('');
  const [horasTrabajo, setHorasTrabajo] = useState('');

  const handleSave = () => {
    onSave({
      ...caso,
      estado: nuevoEstado,
      observacionesTecnico: observaciones,
      horasTrabajadas: parseFloat(horasTrabajo) || 0
    });
    onClose();
  };

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={`${themeClasses.sidebarBg} ${themeClasses.modalContainerMedium}`}>
        <div className={themeClasses.modalContent}>
          <div className={themeClasses.modalHeader}>
            <h2 className={`${themeClasses.modalTitle} ${themeClasses.primaryText}`}>
              Gestionar Caso - {caso.numeroCaso}
            </h2>
            <button
              onClick={onClose}
              className={themeClasses.modalCloseButton}
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Cambiar Estado
              </label>
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300`}
              >
                <option value="Asignado">🔵 Asignado</option>
                <option value="En Proceso">🟡 En Proceso</option>
                <option value="Pendiente">🟠 Pendiente</option>
                <option value="Resuelto">✅ Resuelto</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Registrar Horas Trabajadas
              </label>
              <input
                type="number"
                step="0.5"
                value={horasTrabajo}
                onChange={(e) => setHorasTrabajo(e.target.value)}
                placeholder="Ej: 2.5"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Observaciones del Técnico
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={4}
                placeholder="Describa el trabajo realizado, problemas encontrados, etc..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className={`font-semibold mb-3 ${themeClasses.primaryText}`}>
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSave({...caso, estado: 'En Proceso'})}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <span>✋</span>
                  <span>Aceptar Caso</span>
                </button>
                <button
                  onClick={() => onSave({...caso, estado: 'Resuelto'})}
                  className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <span>✅</span>
                  <span>Marcar Resuelto</span>
                </button>
                <button
                  onClick={() => onSave({...caso, estado: 'Pendiente'})}
                  className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                  <span>⬆️</span>
                  <span>Escalar Caso</span>
                </button>
                <button
                  className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>Contactar Usuario</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionModal;
