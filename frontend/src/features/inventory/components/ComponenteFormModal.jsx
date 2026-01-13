import React, { useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAppStore from '../../../store/useAppStore';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

// Schema de validación
const componenteSchema = yup.object().shape({
  nombreComponente: yup.string().required('El nombre del componente es requerido').trim(),
  marca: yup.string().nullable().transform((value) => (value === '' ? null : value)),
  modelo: yup.string().nullable().transform((value) => (value === '' ? null : value)),
  idInventario: yup
    .string()
    .required('El inventario es requerido')
    .test('is-not-empty', 'El inventario es requerido', (value) => value !== '' && value != null),
  stockActual: yup
    .mixed()
    .test('is-number', 'El stock actual debe ser un número', (value) => {
      if (value === '' || value == null) return false;
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    })
    .transform((value) => {
      if (value === '' || value == null) return 0;
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    })
    .required('El stock actual es requerido'),
  stockMinimo: yup
    .mixed()
    .test('is-number', 'El stock mínimo debe ser un número', (value) => {
      if (value === '' || value == null) return false;
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    })
    .transform((value) => {
      if (value === '' || value == null) return 1;
      const num = Number(value);
      return isNaN(num) ? 1 : num;
    })
    .required('El stock mínimo es requerido'),
  descripcion: yup.string().nullable().transform((value) => (value === '' ? null : value)),
  idEstadoGeneral: yup
    .string()
    .required('El estado es requerido')
    .test('is-not-empty', 'El estado es requerido', (value) => value !== '' && value != null),
});

const ComponenteFormModal = ({
  isOpen,
  onClose,
  onSave,
  componente = null,
  estadosGenerales = [],
  inventarios = []
}) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: yupResolver(componenteSchema),
    mode: 'onChange', // Validar mientras el usuario escribe
    defaultValues: {
      nombreComponente: '',
      marca: '',
      modelo: '',
      idInventario: '',
      stockActual: 0,
      stockMinimo: 1,
      descripcion: '',
      idEstadoGeneral: '',
    }
  });

  // Debug: mostrar errores de validación
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('❌ Errores de validación:', errors);
    }
  }, [errors]);

  // Resetear formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (componente) {
        // Modo edición
        reset({
          nombreComponente: componente.nombre || '',
          marca: componente.marca || '',
          modelo: componente.modelo || '',
          idInventario: componente.inventarioId ? String(componente.inventarioId) : '',
          stockActual: componente.stockActual || 0,
          stockMinimo: componente.stockMinimo || 1,
          descripcion: componente.descripcion || '',
          idEstadoGeneral: componente.estadoId ? String(componente.estadoId) : '',
        });
      } else {
        // Modo creación - resetear a valores por defecto
        reset({
          nombreComponente: '',
          marca: '',
          modelo: '',
          idInventario: '',
          stockActual: 0,
          stockMinimo: 1,
          descripcion: '',
          idEstadoGeneral: '',
        });
      }
    } else {
      // Limpiar formulario cuando se cierra
      reset();
    }
  }, [isOpen, componente, reset]);

  const onSubmit = async (data) => {
    console.log('🚀 onSubmit llamado con datos:', data);
    console.log('📋 Errores actuales:', errors);
    console.log('✅ Formulario válido:', isValid);
    
    try {
      console.log('📝 Datos del formulario recibidos:', data);
      
      // Convertir campos numéricos y validar
      const componenteData = {
        nombreComponente: data.nombreComponente?.trim() || '',
        marca: data.marca?.trim() || null,
        modelo: data.modelo?.trim() || null,
        descripcion: data.descripcion?.trim() || null,
        idInventario: parseInt(data.idInventario, 10),
        stockActual: parseInt(data.stockActual, 10) || 0,
        stockMinimo: parseInt(data.stockMinimo, 10) || 1,
        idEstadoGeneral: parseInt(data.idEstadoGeneral, 10),
      };

      console.log('🔧 Datos procesados para enviar:', componenteData);

      // Validar que los números sean válidos
      if (isNaN(componenteData.idInventario) || componenteData.idInventario <= 0) {
        throw new Error('El inventario seleccionado no es válido');
      }
      if (isNaN(componenteData.idEstadoGeneral) || componenteData.idEstadoGeneral <= 0) {
        throw new Error('El estado seleccionado no es válido');
      }
      if (isNaN(componenteData.stockActual) || componenteData.stockActual < 0) {
        throw new Error('El stock actual debe ser un número válido mayor o igual a 0');
      }
      if (isNaN(componenteData.stockMinimo) || componenteData.stockMinimo < 0) {
        throw new Error('El stock mínimo debe ser un número válido mayor o igual a 0');
      }

      console.log('✅ Validación exitosa, enviando a backend...');
      await onSave(componenteData);
      console.log('✅ Componente guardado exitosamente');
      // El onClose se llama desde el componente padre después de mostrar el mensaje de éxito
    } catch (error) {
      console.error('❌ Error guardando componente:', error);
      throw error; // Re-lanzar para que el componente padre pueda manejarlo
    }
  };


  if (!isOpen) return null;

  // Mostrar mensaje si no hay datos disponibles
  if (estadosGenerales.length === 0 || inventarios.length === 0) {
    return (
      <div className={themeClasses.modalOverlay}>
        <div className={themeClasses.modalContainer}>
          <div className={themeClasses.modalHeader}>
            <h2 className={themeClasses.modalTitle}>
              Crear Nuevo Componente
            </h2>
            <button
              onClick={onClose}
              className={themeClasses.modalCloseButton}
            >
              <X size={24} />
            </button>
          </div>
          <div className={themeClasses.modalContent}>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando datos del formulario...</p>
              <p className="text-sm text-gray-500 mt-2">
                Estados: {estadosGenerales.length} | Inventarios: {inventarios.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={themeClasses.modalContainer}>
        <div className={themeClasses.modalHeader}>
          <h2 className={themeClasses.modalTitle}>
            {componente ? 'Editar Componente' : 'Crear Nuevo Componente'}
          </h2>
          <button
            onClick={onClose}
            className={themeClasses.modalCloseButton}
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className={themeClasses.modalContent}
          noValidate
        >
          <div className={themeClasses.spaceY6}>
            {/* Información Básica */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Información Básica</h3>
              <div className="space-y-4">
                <Input
                  label="Nombre del Componente *"
                  placeholder="Ej: Disco Duro SSD 1TB"
                  {...register('nombreComponente')}
                  error={errors.nombreComponente?.message}
                />

                <div className={themeClasses.gridCols2}>
                  <Input
                    label="Marca"
                    placeholder="Ej: Samsung"
                    {...register('marca')}
                    error={errors.marca?.message}
                  />
                  <Input
                    label="Modelo"
                    placeholder="Ej: 870 EVO"
                    {...register('modelo')}
                    error={errors.modelo?.message}
                  />
                </div>

                <div className={themeClasses.formLabelWithMargin}>
                  <label className={themeClasses.formLabel}>Descripción</label>
                  <textarea
                    {...register('descripcion')}
                    className={`${themeClasses.formTextarea} ${errors.descripcion ? 'border-red-500' : ''}`}
                    rows={3}
                    placeholder="Describe las características del componente"
                  />
                  {errors.descripcion && (
                    <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Control de Stock */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Control de Stock</h3>
              <div className={themeClasses.gridCols2}>
                <Input
                  label="Stock Actual *"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  {...register('stockActual')}
                  error={errors.stockActual?.message}
                />
                <Input
                  label="Stock Mínimo *"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="1"
                  {...register('stockMinimo')}
                  error={errors.stockMinimo?.message}
                />
              </div>

              {(() => {
                const stockActual = watch('stockActual');
                const stockMinimo = watch('stockMinimo');
                const stockActualNum = Number(stockActual) || 0;
                const stockMinimoNum = Number(stockMinimo) || 0;
                
                return stockActualNum > 0 && stockActualNum <= stockMinimoNum ? (
                  <div className={`${themeClasses.infoBoxYellow} mt-4`}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        ⚠️
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">
                          <strong>Alerta:</strong> El stock actual ({stockActualNum}) está por debajo o igual al stock mínimo ({stockMinimoNum}).
                          Considere reabastecer este componente.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Clasificación */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Clasificación</h3>
              <div className={themeClasses.gridCols2}>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register('idEstadoGeneral')}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
                      errors.idEstadoGeneral ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar estado</option>
                    {estadosGenerales.map(estado => (
                      <option key={estado.idEstadoGeneral} value={estado.idEstadoGeneral}>
                        {estado.nombreEstado}
                      </option>
                    ))}
                  </select>
                  {errors.idEstadoGeneral && (
                    <p className="mt-1 text-sm text-red-600">{errors.idEstadoGeneral.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventario *
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    {...register('idInventario')}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
                      errors.idInventario ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar inventario</option>
                    {inventarios.map(inv => (
                      <option key={inv.idInventario} value={inv.idInventario}>
                        {inv.nombreInventario}
                      </option>
                    ))}
                  </select>
                  {errors.idInventario && (
                    <p className="mt-1 text-sm text-red-600">{errors.idInventario.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className={`${themeClasses.flexBetween} mt-6 pt-6 border-t`}>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                console.log('🖱️ Botón submit clickeado');
                console.log('📋 Errores:', errors);
                console.log('✅ Válido:', isValid);
              }}
              className={`${themeClasses.actionButtonGreen} flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  {componente ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {componente ? 'Actualizar Componente' : 'Crear Componente'}
                </>
              )}
            </button>
          </div>
          
          {/* Debug: Mostrar errores de validación */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-semibold text-red-800 mb-2">
                ⚠️ Errores de validación que impiden guardar:
              </p>
              <ul className="text-xs text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>
                    • <strong>{field}</strong>: {error?.message || 'Error de validación'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ComponenteFormModal;
