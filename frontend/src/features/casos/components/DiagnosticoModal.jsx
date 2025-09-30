// frontend/src/features/casos/components/DiagnosticoModal.jsx
// Modal para registrar diagnóstico y solución

import { useState } from 'react';
import useAppStore from '../../../store/useAppStore';

const DiagnosticoModal = ({ caso, onClose, onSave }) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [diagnostico, setDiagnostico] = useState(caso.diagnostico || '');
  const [solucionPropuesta, setSolucionPropuesta] = useState(caso.solucionPropuesta || '');
  const [requiereConsumibles, setRequiereConsumibles] = useState(caso.requiereConsumibles || false);

  const handleSave = () => {
    onSave({
      ...caso,
      diagnostico,
      solucionPropuesta,
      requiereConsumibles
    });
    onClose();
  };

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={`${themeClasses.sidebarBg} ${themeClasses.modalContainer}`}>
        <div className={themeClasses.modalContent}>
          <div className={themeClasses.modalHeader}>
            <h2 className={`${themeClasses.modalTitle} ${themeClasses.primaryText}`}>
              Diagnóstico Técnico - {caso.numeroCaso}
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
                Diagnóstico del Problema
              </label>
              <textarea
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                rows={4}
                placeholder="Describa detalladamente el problema identificado..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Solución Propuesta
              </label>
              <textarea
                value={solucionPropuesta}
                onChange={(e) => setSolucionPropuesta(e.target.value)}
                rows={4}
                placeholder="Describa la solución propuesta paso a paso..."
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="requiereConsumibles"
                checked={requiereConsumibles}
                onChange={(e) => setRequiereConsumibles(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="requiereConsumibles" className={`text-sm font-medium ${themeClasses.primaryText}`}>
                Requiere consumibles o materiales adicionales
              </label>
            </div>

            {requiereConsumibles && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Lista de Consumibles Requeridos
                </label>
                <textarea
                  rows={3}
                  placeholder="Liste los consumibles necesarios (uno por línea)..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
                />
              </div>
            )}

            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className={`font-semibold mb-2 ${themeClasses.primaryText}`}>
                💡 Plantillas de Diagnóstico
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                  🖥️ Problema de Hardware
                </button>
                <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                  💽 Problema de Software
                </button>
                <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                  🌐 Problema de Red
                </button>
                <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                  🔧 Mantenimiento Preventivo
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
              Guardar Diagnóstico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoModal;
