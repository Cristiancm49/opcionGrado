import * as yup from 'yup';

export const incidenciaSchema = yup.object({
  // Datos del solicitante
  identificacionSolicitante: yup
    .string()
    .required('La identificación es obligatoria')
    .min(6, 'La identificación debe tener al menos 6 caracteres'),
  
  nombreSolicitante: yup
    .string()
    .required('El nombre del solicitante es obligatorio'),
  
  dependencia: yup.string(),
  telefonoExtension: yup.string(),
  
  // Datos del caso
  descripcion: yup
    .string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  
  tipoCaso: yup
    .string()
    .required('Debe seleccionar un tipo de caso'),
  
  areaTecnica: yup
    .string()
    .required('Debe seleccionar un área técnica'),
  
  prioridad: yup
    .string()
    .required('Debe seleccionar una prioridad'),
  
  // Campos opcionales
  observaciones: yup.string(),
  categoria: yup.string(),
  tipoTrabajo: yup.string(),
  codigoPatrimonial: yup.string(),
  elementoAfectado: yup.string(),
  ubicacionEspecifica: yup.string(),
  
  // Valores por defecto
  canalIngreso: yup.string().default('WEB'),
  fechaRegistro: yup.date().default(() => new Date()),
  evidencias: yup.array().default([])
});