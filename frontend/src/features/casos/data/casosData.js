// ===========================================
// DATOS DE CASOS PARA TÉCNICOS
// ===========================================

export const casosParaTecnicos = [
  // ====== CASOS ASIGNADOS ======
  {
    id: 1,
    numeroCaso: 'CAS-001234',
    fechaRegistro: '2025-01-15',
    fechaAsignacion: '2025-01-15',
    fechaLimite: '2025-01-17',
    fechaUltimaActualizacion: '2025-01-18',
    solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
    dependencia: 'OFICINA DE PLANEACION',
    contacto: 'diego.quesada@uniamazonia.edu.co',
    telefono: '123456789',
    descripcion: 'Impresora HP LaserJet no imprime correctamente',
    prioridad: 'Alta',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'Asignado',
    estadoTecnico: 'ASIGNADO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 4,
    horasEstimadas: 3,
    horasTrabajadas: 0,
    slaStatus: 'En Riesgo',
    prioridadSla: 1,
    ubicacion: 'Edificio A - Piso 2',
    elementoAfectado: 'Impresora HP LaserJet Pro 400',
    diagnostico: 'Pendiente de diagnóstico',
    solucionPropuesta: '',
    observacionesTecnico: '',
    requiereConsumibles: false,
    consumiblesRequeridos: [],
    evidencias: [],
    proximaAccion: 'Realizar diagnóstico inicial'
  },
  {
    id: 2,
    numeroCaso: 'CAS-001235',
    fechaRegistro: '2025-01-14',
    fechaAsignacion: '2025-01-14',
    fechaLimite: '2025-01-16',
    fechaUltimaActualizacion: '2025-01-18',
    solicitante: 'MARIA ELENA RODRIGUEZ',
    dependencia: 'RECURSOS HUMANOS',
    contacto: 'maria.rodriguez@uniamazonia.edu.co',
    telefono: '987654321',
    descripcion: 'Atasco de papel en impresora multifuncional',
    prioridad: 'Media',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Mantenimiento',
    estado: 'En Proceso',
    estadoTecnico: 'EN_PROCESO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 5,
    horasEstimadas: 2,
    horasTrabajadas: 1.5,
    slaStatus: 'En Tiempo',
    prioridadSla: 2,
    ubicacion: 'Edificio C - Piso 1',
    elementoAfectado: 'Impresora Canon MF445dw',
    diagnostico: 'Papel húmedo causando atascos en el alimentador',
    solucionPropuesta: 'Limpiar alimentador y reemplazar papel',
    observacionesTecnico: 'Se detectó papel húmedo en el alimentador',
    requiereConsumibles: true,
    consumiblesRequeridos: ['Papel tamaño carta', 'Kit de limpieza'],
    evidencias: ['foto_atasco.jpg'],
    proximaAccion: 'Aplicar solución propuesta'
  },
  {
    id: 3,
    numeroCaso: 'CAS-001236',
    fechaRegistro: '2025-01-13',
    fechaAsignacion: '2025-01-13',
    fechaLimite: '2025-01-14',
    fechaUltimaActualizacion: '2025-01-17',
    solicitante: 'CARLOS RIVERA MORA',
    dependencia: 'SISTEMAS',
    contacto: 'carlos.rivera@uniamazonia.edu.co',
    telefono: '456789123',
    descripcion: 'Problema de conectividad a internet en toda la oficina',
    prioridad: 'Crítica',
    areaTecnica: 'Redes',
    tipoTrabajo: 'Configuración',
    estado: 'Pendiente',
    estadoTecnico: 'PENDIENTE',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 5,
    horasEstimadas: 6,
    horasTrabajadas: 3,
    slaStatus: 'Vencido',
    prioridadSla: 2,
    ubicacion: 'Edificio B - Piso 1',
    elementoAfectado: 'Switch de red principal',
    diagnostico: 'Configuración incorrecta en VLAN después de actualización',
    solucionPropuesta: 'Reconfigurar VLANs y actualizar firmware del switch',
    observacionesTecnico: 'Requiere coordinación con proveedor de internet',
    requiereConsumibles: false,
    consumiblesRequeridos: [],
    evidencias: ['log_switch.txt', 'config_backup.cfg'],
    proximaAccion: 'Esperar ventana de mantenimiento aprobada'
  },
  
  // ====== CASOS RESUELTOS POR EL TÉCNICO ======
  {
    id: 4,
    numeroCaso: 'CAS-001200',
    fechaRegistro: '2025-01-10',
    fechaAsignacion: '2025-01-10',
    fechaLimite: '2025-01-13',
    fechaResolucion: '2025-01-12',
    fechaUltimaActualizacion: '2025-01-12',
    solicitante: 'ANA JIMENEZ TORRES',
    dependencia: 'CONTABILIDAD',
    contacto: 'ana.jimenez@uniamazonia.edu.co',
    telefono: '789123456',
    descripcion: 'Computador no enciende después de corte de energía',
    prioridad: 'Alta',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'Resuelto',
    estadoTecnico: 'RESUELTO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 3,
    horasEstimadas: 4,
    horasTrabajadas: 3.5,
    slaStatus: 'En Tiempo',
    prioridadSla: 1,
    ubicacion: 'Edificio A - Piso 3',
    elementoAfectado: 'PC Dell OptiPlex 7090',
    diagnostico: 'Fuente de poder dañada por pico de voltaje',
    solucionPropuesta: 'Reemplazo de fuente de poder y protección adicional',
    observacionesTecnico: 'Se instaló protector de picos para prevenir futuros daños',
    requiereConsumibles: true,
    consumiblesRequeridos: ['Fuente de poder 500W', 'Protector de picos'],
    evidencias: ['foto_fuente_dañada.jpg', 'factura_repuesto.pdf'],
    proximaAccion: 'Caso cerrado exitosamente'
  },
  {
    id: 5,
    numeroCaso: 'CAS-001198',
    fechaRegistro: '2025-01-08',
    fechaAsignacion: '2025-01-08',
    fechaLimite: '2025-01-11',
    fechaResolucion: '2025-01-09',
    fechaUltimaActualizacion: '2025-01-09',
    solicitante: 'LUIS ALBERTO MARTINEZ',
    dependencia: 'BIBLIOTECA',
    contacto: 'luis.martinez@uniamazonia.edu.co',
    telefono: '321654987',
    descripcion: 'Problema con software de gestión bibliotecaria',
    prioridad: 'Media',
    areaTecnica: 'Software',
    tipoTrabajo: 'Configuración',
    estado: 'Resuelto',
    estadoTecnico: 'RESUELTO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 2,
    horasEstimadas: 3,
    horasTrabajadas: 2.5,
    slaStatus: 'En Tiempo',
    prioridadSla: 2,
    ubicacion: 'Edificio D - Piso 2',
    elementoAfectado: 'Sistema de gestión bibliotecaria',
    diagnostico: 'Configuración de base de datos incorrecta después de actualización',
    solucionPropuesta: 'Restaurar configuración de BD y actualizar drivers',
    observacionesTecnico: 'Se realizó backup antes de aplicar cambios',
    requiereConsumibles: false,
    consumiblesRequeridos: [],
    evidencias: ['backup_config.bak', 'log_aplicacion.txt'],
    proximaAccion: 'Caso cerrado exitosamente'
  }
];

// ===========================================
// OPCIONES DE FILTROS
// ===========================================

export const opcionesFiltros = {
  estadosTecnico: [
    { value: 'TODOS', label: 'Todos los estados' },
    { value: 'ASIGNADOS', label: 'Asignados' },
    { value: 'EN_PROCESO', label: 'En Proceso' },
    { value: 'PENDIENTES', label: 'Pendientes' },
    { value: 'RESUELTOS', label: 'Resueltos' }
  ],
  prioridades: [
    { value: '', label: 'Todas las prioridades' },
    { value: 'Crítica', label: 'Crítica' },
    { value: 'Alta', label: 'Alta' },
    { value: 'Media', label: 'Media' },
    { value: 'Baja', label: 'Baja' }
  ],
  areasTecnicas: [
    { value: '', label: 'Todas las áreas' },
    { value: 'Hardware', label: 'Hardware' },
    { value: 'Software', label: 'Software' },
    { value: 'Redes', label: 'Redes' },
    { value: 'Sistemas', label: 'Sistemas' }
  ],
  slaStatus: [
    { value: '', label: 'Todos los SLA' },
    { value: 'En Tiempo', label: 'En Tiempo' },
    { value: 'En Riesgo', label: 'En Riesgo' },
    { value: 'Vencido', label: 'Vencido' }
  ],
  tiposTrabajo: [
    { value: '', label: 'Todos los tipos' },
    { value: 'Reparación', label: 'Reparación' },
    { value: 'Mantenimiento', label: 'Mantenimiento' },
    { value: 'Configuración', label: 'Configuración' },
    { value: 'Instalación', label: 'Instalación' }
  ]
};

// ===========================================
// FUNCIONES DE UTILIDAD
// ===========================================

export const getEstadoColor = (estado) => {
  const colores = {
    'Asignado': 'bg-blue-100 text-blue-800',
    'En Proceso': 'bg-yellow-100 text-yellow-800',
    'Pendiente': 'bg-orange-100 text-orange-800',
    'Resuelto': 'bg-green-100 text-green-800',
    'Cerrado': 'bg-gray-100 text-gray-800'
  };
  return colores[estado] || 'bg-gray-100 text-gray-800';
};

export const getPrioridadColor = (prioridad) => {
  const colores = {
    'Crítica': 'bg-red-100 text-red-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-green-100 text-green-800'
  };
  return colores[prioridad] || 'bg-gray-100 text-gray-800';
};

export const getSlaColor = (slaStatus) => {
  const colores = {
    'En Tiempo': 'bg-green-100 text-green-800',
    'En Riesgo': 'bg-yellow-100 text-yellow-800',
    'Vencido': 'bg-red-100 text-red-800'
  };
  return colores[slaStatus] || 'bg-gray-100 text-gray-800';
};

export const calcularDiasTranscurridos = (fechaInicio) => {
  const hoy = new Date();
  const inicio = new Date(fechaInicio);
  const diferencia = hoy - inicio;
  return Math.floor(diferencia / (1000 * 60 * 60 * 24));
};

export const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatearHora = (fecha) => {
  if (!fecha) return 'N/A';
  return new Date(fecha).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
