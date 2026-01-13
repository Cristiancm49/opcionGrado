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
const activoSchema = yup.object().shape({
  codigoPatrimonial: yup.string().optional(),
  nombreActivo: yup.string().required('El nombre del activo es requerido'),
  descripcionTecnica: yup.string().optional(),
  marca: yup.string().optional(),
  modelo: yup.string().optional(),
  serie: yup.string().optional(),
  idCategoriaActivo: yup.number().required('La categoría es requerida'),
  idEstadoActivo: yup.number().required('El estado es requerido'),
  idInventario: yup.number().required('El inventario es requerido'),
  idUbicacion: yup.number().required('La ubicación es requerida'),
  fechaIngreso: yup.date().optional(),
  idResponsableActivo: yup.number().optional(),
});

const ActivoFormModal = ({
  isOpen,
  onClose,
  onSave,
  activo = null,
  categorias = [],
  estados = [],
  inventarios = [],
  ubicaciones = [],
  usuarios = []
}) => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(activoSchema),
    defaultValues: {
      codigoPatrimonial: '',
      nombreActivo: '',
      descripcionTecnica: '',
      marca: '',
      modelo: '',
      serie: '',
      idCategoriaActivo: '',
      idEstadoActivo: '',
      idInventario: '',
      idUbicacion: '',
      fechaIngreso: '',
      idResponsableActivo: '',
    }
  });

  // Resetear formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (activo) {
        // Modo edición
        reset({
          codigoPatrimonial: activo.codigoPatrimonial || '',
          nombreActivo: activo.nombre || '',
          descripcionTecnica: activo.descripcion || '',
          marca: activo.marca || '',
          modelo: activo.modelo || '',
          serie: activo.serie || '',
          idCategoriaActivo: activo.categoriaId || '',
          idEstadoActivo: activo.estadoId || '',
          idInventario: activo.inventarioId || '',
          idUbicacion: activo.ubicacionId || '',
          fechaIngreso: activo.fechaIngreso || '',
          idResponsableActivo: activo.responsableId || '',
        });
      } else {
        // Modo creación
        reset({
          codigoPatrimonial: '',
          nombreActivo: '',
          descripcionTecnica: '',
          marca: '',
          modelo: '',
          serie: '',
          idCategoriaActivo: '',
          idEstadoActivo: '',
          idInventario: '',
          idUbicacion: '',
          fechaIngreso: '',
          idResponsableActivo: '',
        });
      }
    }
  }, [isOpen, activo, reset]);

  const onSubmit = async (data) => {
    try {
      // Convertir campos numéricos
      const activoData = {
        ...data,
        idCategoriaActivo: parseInt(data.idCategoriaActivo),
        idEstadoActivo: parseInt(data.idEstadoActivo),
        idInventario: parseInt(data.idInventario),
        idUbicacion: parseInt(data.idUbicacion),
        idResponsableActivo: data.idResponsableActivo ? parseInt(data.idResponsableActivo) : null,
        fechaIngreso: data.fechaIngreso ? new Date(data.fechaIngreso).toISOString() : null,
      };

      await onSave(activoData);
      onClose();
    } catch (error) {
      console.error('Error guardando activo:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={themeClasses.modalOverlay}>
      <div className={themeClasses.modalContainer}>
        <div className={themeClasses.modalHeader}>
          <h2 className={themeClasses.modalTitle}>
            {activo ? 'Editar Activo' : 'Crear Nuevo Activo'}
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
              <div className={themeClasses.gridCols2}>
                <Input
                  label="Código Patrimonial"
                  placeholder="Ej: PC-001"
                  {...register('codigoPatrimonial')}
                  error={errors.codigoPatrimonial?.message}
                />
                <Input
                  label="Nombre del Activo *"
                  placeholder="Ej: Computadora Dell OptiPlex"
                  {...register('nombreActivo')}
                  error={errors.nombreActivo?.message}
                />
              </div>

              <div className="mt-4">
                <label className={themeClasses.formLabelWithMargin}>Descripción Técnica</label>
                <textarea
                  {...register('descripcionTecnica')}
                  className={`${themeClasses.formTextarea} ${errors.descripcionTecnica ? 'border-red-500' : ''}`}
                  rows={3}
                  placeholder="Describe las características técnicas del activo"
                />
                {errors.descripcionTecnica && (
                  <p className="text-red-500 text-sm mt-1">{errors.descripcionTecnica.message}</p>
                )}
              </div>
            </div>

            {/* Especificaciones Técnicas */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Especificaciones Técnicas</h3>
              <div className={themeClasses.gridCols3}>
                <Input
                  label="Marca"
                  placeholder="Ej: Dell"
                  {...register('marca')}
                  error={errors.marca?.message}
                />
                <Input
                  label="Modelo"
                  placeholder="Ej: OptiPlex 7090"
                  {...register('modelo')}
                  error={errors.modelo?.message}
                />
                <Input
                  label="Serie"
                  placeholder="Ej: DL7090-001"
                  {...register('serie')}
                  error={errors.serie?.message}
                />
              </div>
            </div>

            {/* Clasificación y Estado */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Clasificación y Estado</h3>
              <div className={themeClasses.gridCols2}>
                <Select
                  label="Categoría *"
                  {...register('idCategoriaActivo')}
                  error={errors.idCategoriaActivo?.message}
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Estado *"
                  {...register('idEstadoActivo')}
                  error={errors.idEstadoActivo?.message}
                >
                  <option value="">Seleccionar estado</option>
                  {estados.map(estado => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Ubicación e Inventario */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Ubicación e Inventario</h3>
              <div className={themeClasses.gridCols2}>
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

                <Select
                  label="Ubicación *"
                  {...register('idUbicacion')}
                  error={errors.idUbicacion?.message}
                >
                  <option value="">Seleccionar ubicación</option>
                  {ubicaciones.map(ubic => (
                    <option key={ubic.id} value={ubic.id}>
                      {ubic.nombre}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Información Adicional */}
            <div className={themeClasses.borderContainer}>
              <h3 className="text-lg font-semibold mb-4">Información Adicional</h3>
              <div className={themeClasses.gridCols2}>
                <Input
                  label="Fecha de Ingreso"
                  type="date"
                  {...register('fechaIngreso')}
                  error={errors.fechaIngreso?.message}
                />

                <Select
                  label="Responsable"
                  {...register('idResponsableActivo')}
                  error={errors.idResponsableActivo?.message}
                >
                  <option value="">Seleccionar responsable</option>
                  {usuarios.map(user => (
                    <option key={user.idUsuario} value={user.idUsuario}>
                      {user.nombreCompleto}
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
                  {activo ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {activo ? 'Actualizar Activo' : 'Crear Activo'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivoFormModal;
