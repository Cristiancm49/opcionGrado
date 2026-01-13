import React, { useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAppStore from '../../../store/useAppStore';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

// Schema de validación
const consumibleSchema = yup.object().shape({
  nombreConsumible: yup.string().required('El nombre del consumible es requerido'),
  marca: yup.string().optional(),
  modelo: yup.string().optional(),
  stockActual: yup.number().min(0, 'El stock actual debe ser mayor o igual a 0').required('El stock actual es requerido'),
  stockMinimo: yup.number().min(0, 'El stock mínimo debe ser mayor o igual a 0').required('El stock mínimo es requerido'),
  descripcionTecnica: yup.string().optional(),
  idInventario: yup.number().required('El inventario es requerido'),
  idTipoConsumible: yup.number().required('El tipo de consumible es requerido'),
  idEstadoConsumible: yup.number().required('El estado es requerido'),
});

const ConsumibleFormModal = ({
  isOpen,
  onClose,
  onSave,
  consumible = null,
  tiposConsumible = [],
  estadosConsumible = [],
  inventarios = []
}) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(consumibleSchema),
    defaultValues: {
      nombreConsumible: '',
      marca: '',
      modelo: '',
      stockActual: 0,
      stockMinimo: 1,
      descripcionTecnica: '',
      idInventario: '',
      idTipoConsumible: '',
      idEstadoConsumible: '',
    }
  });

  // Resetear formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (consumible) {
        // Modo edición
        reset({
          nombreConsumible: consumible.nombre || '',
          marca: consumible.marca || '',
          modelo: consumible.modelo || '',
          stockActual: consumible.stockActual || 0,
          stockMinimo: consumible.stockMinimo || 1,
          descripcionTecnica: consumible.descripcion || '',
          idInventario: consumible.inventarioId || '',
          idTipoConsumible: consumible.categoriaId || '',
          idEstadoConsumible: consumible.estadoId || '',
        });
      } else {
        // Modo creación
        reset({
          nombreConsumible: '',
          marca: '',
          modelo: '',
          stockActual: 0,
          stockMinimo: 1,
          descripcionTecnica: '',
          idInventario: '',
          idTipoConsumible: '',
          idEstadoConsumible: '',
        });
      }
    }
  }, [isOpen, consumible, reset]);

  const onSubmit = async (data) => {
    try {
      // Convertir campos numéricos
      const consumibleData = {
        ...data,
        stockActual: parseInt(data.stockActual),
        stockMinimo: parseInt(data.stockMinimo),
        idInventario: parseInt(data.idInventario),
        idTipoConsumible: parseInt(data.idTipoConsumible),
        idEstadoConsumible: parseInt(data.idEstadoConsumible),
      };

      await onSave(consumibleData);
      onClose();
    } catch (error) {
      console.error('Error guardando consumible:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={themeClasses.modalContainer}>
        <div className={themeClasses.modalHeader}>
          <h2 className={themeClasses.modalTitle}>
            {consumible ? 'Editar Consumible' : 'Crear Nuevo Consumible'}
          </h2>
          <button
            onClick={onClose}
            className={themeClasses.modalCloseButton}
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={themeClasses.modalContent}>
          <div className={themeClasses.spaceY6}>
            {/* Información Básica */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Información Básica</h3>
              <div className="space-y-4">
                <Input
                  label="Nombre del Consumible *"
                  placeholder="Ej: Toner HP 85A Negro"
                  {...register('nombreConsumible')}
                  error={errors.nombreConsumible?.message}
                />

                <div className={themeClasses.gridCols3}>
                  <Input
                    label="Marca"
                    placeholder="Ej: HP"
                    {...register('marca')}
                    error={errors.marca?.message}
                  />
                  <Input
                    label="Modelo"
                    placeholder="Ej: 85A"
                    {...register('modelo')}
                    error={errors.modelo?.message}
                  />
                </div>

                <div className={themeClasses.formLabelWithMargin}>
                  <label className={themeClasses.formLabel}>Descripción Técnica</label>
                  <textarea
                    {...register('descripcionTecnica')}
                    className={`${themeClasses.formTextarea} ${errors.descripcionTecnica ? 'border-red-500' : ''}`}
                    rows={3}
                    placeholder="Describe las características técnicas del consumible"
                  />
                  {errors.descripcionTecnica && (
                    <p className="text-red-500 text-sm mt-1">{errors.descripcionTecnica.message}</p>
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
                  placeholder="0"
                  {...register('stockActual')}
                  error={errors.stockActual?.message}
                />
                <Input
                  label="Stock Mínimo *"
                  type="number"
                  min="0"
                  placeholder="1"
                  {...register('stockMinimo')}
                  error={errors.stockMinimo?.message}
                />
              </div>

              {watch('stockActual') <= watch('stockMinimo') && (
                <div className={`${themeClasses.infoBoxYellow} mt-4`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      ⚠️
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">
                        <strong>Alerta:</strong> El stock actual está por debajo o igual al stock mínimo.
                        Considere reabastecer este consumible.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clasificación */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Clasificación</h3>
              <div className={themeClasses.gridCols3}>
                <Select
                  label="Tipo de Consumible *"
                  {...register('idTipoConsumible')}
                  error={errors.idTipoConsumible?.message}
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposConsumible.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Estado *"
                  {...register('idEstadoConsumible')}
                  error={errors.idEstadoConsumible?.message}
                >
                  <option value="">Seleccionar estado</option>
                  {estadosConsumible.map(estado => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Inventario *"
                  {...register('idInventario')}
                  error={errors.idInventario?.message}
                >
                  <option value="">Seleccionar inventario</option>
                  {inventarios.map(inv => (
                    <option key={inv.idInventario} value={inv.idInventario}>
                      {inv.nombreInventario}
                    </option>
                  ))}
                </Select>
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className={themeClasses.actionButtonGreen}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  {consumible ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {consumible ? 'Actualizar Consumible' : 'Crear Consumible'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsumibleFormModal;
