import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppStore from '../../store/useAppStore';
import useFormStore from '../../store/useFormStore';
import { incidenciaSchema } from '../../schemas/incidenciaSchema';

const RegistrarIncidencia = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const {
    isSubmitting,
    isSearchingUser,
    isSearchingElement,
    uploadingFile,
    searchUser,
    searchElement,
    uploadEvidence,
    removeEvidence,
    resetForm,
    submitIncidencia,
    formatFileSize
  } = useFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(incidenciaSchema),
    defaultValues: {
      canalIngreso: 'WEB',
      fechaRegistro: new Date().toISOString().split('T')[0],
      evidencias: []
    }
  });

  // Watch para obtener valores actuales
  const watchedValues = watch();

  const handleUserSearch = () => {
    searchUser(watchedValues.identificacionSolicitante, setValue);
  };

  const handleElementSearch = () => {
    searchElement(watchedValues.codigoPatrimonial, setValue);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      try {
        await uploadEvidence(file, setValue, watchedValues.evidencias);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    
    e.target.value = '';
  };

  const handleRemoveEvidence = (id, fileName) => {
    removeEvidence(id, fileName, setValue, watchedValues.evidencias);
  };

  const handleClearForm = () => {
    resetForm(reset);
  };

  const onSubmit = async (data) => {
    const result = await submitIncidencia(data);
    if (result.success) {
      reset();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
          Registrar Incidencia
        </h1>
        <p className={themeClasses.secondaryText}>
          Complete el siguiente formulario para registrar una nueva incidencia en el sistema
        </p>
      </div>

      <div className={`${themeClasses.sidebarBg} rounded-lg p-8 shadow-lg`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Datos del Solicitante */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.primaryText}`}>
              Datos del Solicitante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Identificación *
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text"
                    {...register('identificacionSolicitante')}
                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } ${errors.identificacionSolicitante ? 'border-red-500' : ''}`}
                    placeholder="Número de cédula"
                  />
                  <button
                    type="button"
                    onClick={handleUserSearch}
                    disabled={isSearchingUser || !watchedValues.identificacionSolicitante?.trim()}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    {isSearchingUser ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
                {errors.identificacionSolicitante && (
                  <span className="text-red-500 text-sm mt-1">{errors.identificacionSolicitante.message}</span>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Nombre del Solicitante *
                </label>
                <input 
                  type="text"
                  {...register('nombreSolicitante')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  } ${errors.nombreSolicitante ? 'border-red-500' : ''}`}
                  placeholder="Se completará automáticamente"
                />
                {errors.nombreSolicitante && (
                  <span className="text-red-500 text-sm mt-1">{errors.nombreSolicitante.message}</span>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Dependencia
                </label>
                <input 
                  type="text"
                  {...register('dependencia')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  }`}
                  placeholder="Se completará automáticamente"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Teléfono / Extensión
                </label>
                <input 
                  type="text"
                  {...register('telefonoExtension')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  }`}
                  placeholder="Se completará automáticamente"
                />
              </div>
            </div>
          </div>

          {/* Descripción del Caso */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.primaryText}`}>
              Descripción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Fecha y Hora de Registro
                </label>
                <input 
                  type="date"
                  {...register('fechaRegistro')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Tipo de Caso *
                </label>
                <select 
                  {...register('tipoCaso')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } ${errors.tipoCaso ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="INCIDENCIA">Incidencia</option>
                  <option value="REQUERIMIENTO">Requerimiento</option>
                  <option value="SOLICITUD_SERVICIO">Solicitud de Servicio</option>
                  <option value="PROBLEMA">Problema</option>
                </select>
                {errors.tipoCaso && (
                  <span className="text-red-500 text-sm mt-1">{errors.tipoCaso.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Área Técnica *
                </label>
                <select 
                  {...register('areaTecnica')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } ${errors.areaTecnica ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="HARDWARE">Hardware</option>
                  <option value="SOFTWARE">Software</option>
                  <option value="REDES">Redes y Comunicaciones</option>
                  <option value="SISTEMAS">Sistemas de Información</option>
                  <option value="SEGURIDAD">Seguridad Informática</option>
                  <option value="INFRAESTRUCTURA">Infraestructura TI</option>
                </select>
                {errors.areaTecnica && (
                  <span className="text-red-500 text-sm mt-1">{errors.areaTecnica.message}</span>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Categoría
                </label>
                <select 
                  {...register('categoria')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="HARDWARE_PC">Hardware PC</option>
                  <option value="HARDWARE_IMPRESORA">Hardware Impresora</option>
                  <option value="SOFTWARE_OFFICE">Software Office</option>
                  <option value="SOFTWARE_SO">Software SO</option>
                  <option value="RED_CONECTIVIDAD">Red Conectividad</option>
                  <option value="RED_WIFI">Red WiFi</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Tipo de Trabajo
                </label>
                <select 
                  {...register('tipoTrabajo')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="REPARACION">Reparación</option>
                  <option value="INSTALACION">Instalación</option>
                  <option value="CONFIGURACION">Configuración</option>
                  <option value="MANTENIMIENTO">Mantenimiento</option>
                  <option value="REVISION">Revisión</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Prioridad del Caso *
                </label>
                <select 
                  {...register('prioridad')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } ${errors.prioridad ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar...</option>
                  <option value="1">1 - Crítica (Resolver inmediatamente)</option>
                  <option value="2">2 - Alta (Resolver en 4 horas)</option>
                  <option value="3">3 - Media (Resolver en 24 horas)</option>
                  <option value="4">4 - Baja (Resolver en 72 horas)</option>
                  <option value="5">5 - Planificada (Resolver según cronograma)</option>
                </select>
                {errors.prioridad && (
                  <span className="text-red-500 text-sm mt-1">{errors.prioridad.message}</span>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Canal de Ingreso
                </label>
                <select 
                  {...register('canalIngreso')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="WEB">Portal Web</option>
                  <option value="TELEFONO">Teléfono</option>
                  <option value="EMAIL">Correo Electrónico</option>
                  <option value="PRESENCIAL">Presencial</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Observaciones del Caso *
              </label>
              <textarea 
                {...register('descripcion')}
                rows={4}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } ${errors.descripcion ? 'border-red-500' : ''}`}
                placeholder="Describa detalladamente el problema o incidencia..."
              />
              {errors.descripcion && (
                <span className="text-red-500 text-sm mt-1">{errors.descripcion.message}</span>
              )}
            </div>

            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Observaciones Adicionales
              </label>
              <textarea 
                {...register('observaciones')}
                rows={3}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Información adicional relevante..."
              />
            </div>
          </div>

          {/* Elemento Afectado */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.primaryText}`}>
              Elemento Afectado (Solo si aplica)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Buscar Elemento
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text"
                    {...register('codigoPatrimonial')}
                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Código patrimonial o serie"
                  />
                  <button
                    type="button"
                    onClick={handleElementSearch}
                    disabled={isSearchingElement || !watchedValues.codigoPatrimonial?.trim()}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                  >
                    {isSearchingElement ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Elemento Afectado
                </label>
                <input 
                  type="text"
                  {...register('elementoAfectado')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  }`}
                  placeholder="Se completará automáticamente"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Ubicación Específica
                </label>
                <input 
                  type="text"
                  {...register('ubicacionEspecifica')}
                  readOnly
                  className={`w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed ${
                    themeClasses.darkMode ? 'bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'
                  }`}
                  placeholder="Se completará automáticamente al buscar elemento"
                />
              </div>
            </div>
          </div>

          {/* Evidencias */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.primaryText}`}>
              Evidencias (Opcional)
            </h3>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                Adjuntar Archivos
              </label>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={uploadingFile}
                className={`w-full p-3 border rounded-lg ${
                  themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } ${uploadingFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <p className={`text-sm mt-1 ${themeClasses.secondaryText}`}>
                Formatos permitidos: Imágenes, PDF, Word. Tamaño máximo: 10MB por archivo.
              </p>
              {uploadingFile && (
                <p className={`text-sm mt-1 text-blue-600`}>
                  Subiendo archivo...
                </p>
              )}
            </div>

            {/* Lista de evidencias */}
            {watchedValues.evidencias && watchedValues.evidencias.length > 0 && (
              <div className="space-y-2">
                <h4 className={`text-sm font-medium ${themeClasses.primaryText}`}>
                  Archivos adjuntos ({watchedValues.evidencias.length}):
                </h4>
                {watchedValues.evidencias.map((evidencia) => (
                  <div 
                    key={evidencia.id} 
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      themeClasses.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-500">
                        {evidencia.tipo.includes('image') ? '🖼️' : 
                         evidencia.tipo.includes('pdf') ? '📄' : '📝'}
                      </div>
                      <div>
                        <p className={`font-medium ${themeClasses.primaryText}`}>
                          {evidencia.nombre}
                        </p>
                        <p className={`text-sm ${themeClasses.secondaryText}`}>
                          {formatFileSize(evidencia.tamaño)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(evidencia.id, evidencia.nombre)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información adicional */}
          <div className={`p-4 rounded-lg ${themeClasses.darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${themeClasses.primaryText}`}>
                  Información Importante
                </h4>
                <p className={`text-sm mt-1 ${themeClasses.secondaryText}`}>
                  • Los campos marcados con (*) son obligatorios<br/>
                  • Busque al solicitante por identificación para autocompletar sus datos<br/>
                  • Se generará un número de caso automáticamente<br/>
                  • El tiempo de respuesta depende de la prioridad seleccionada
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Incidencia'}
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                themeClasses.darkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Limpiar Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarIncidencia;