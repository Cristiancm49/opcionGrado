// frontend/src/features/casos/data/casosData.js
// Datos mock para casos técnicos

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
    descripcion: 'Computador no enciende en oficina 205, presenta problema eléctrico',
    prioridad: 'Alta',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'Asignado',
    estadoTecnico: 'ASIGNADO',
    tecnicoAsignado: 'Juan Pérez', // Usuario actual (técnico logueado)
    diasAsignado: 3,
    horasEstimadas: 4,
    horasTrabajadas: 0,
    slaStatus: 'En Tiempo',
    prioridadSla: 4, // horas límite
    ubicacion: 'Edificio A - Piso 2 - Oficina 205',
    elementoAfectado: 'Computador HP ProDesk 400',
    diagnostico: null,
    solucionPropuesta: null,
    observacionesTecnico: null,
    requiereConsumibles: false,
    consumiblesRequeridos: [],
    evidencias: [],
    proximaAccion: 'Diagnóstico inicial pendiente'
  },
  {
    id: 2,
    numeroCaso: 'CAS-001235',
    fechaRegistro: '2025-01-14',
    fechaAsignacion: '2025-01-14',
    fechaLimite: '2025-01-18',
    fechaUltimaActualizacion: '2025-01-18',
    solicitante: 'MARIA GONZALEZ LOPEZ',
    dependencia: 'RECURSOS HUMANOS',
    contacto: 'maria.gonzalez@uniamazonia.edu.co',
    telefono: '987654321',
    descripcion: 'Problema con impresora en recepción, no imprime documentos',
    prioridad: 'Media',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'En Proceso',
    estadoTecnico: 'EN_PROCESO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: 4,
    horasEstimadas: 2,
    horasTrabajadas: 1.5,
    slaStatus: 'En Tiempo',
    prioridadSla: 24,
    ubicacion: 'Edificio Principal - Recepción',
    elementoAfectado: 'Impresora Canon ImageRunner',
    diagnostico: 'Atasco de papel en el alimentador principal',
    solucionPropuesta: 'Limpieza de rodillos y reemplazo de papel',
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
    descripcion: 'Computador lento, requiere optimización',
    prioridad: 'Baja',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Mantenimiento',
    estado: 'Resuelto',
    estadoTecnico: 'RESUELTO',
    tecnicoAsignado: 'Juan Pérez',
    diasAsignado: null,
    horasEstimadas: 3,
    horasTrabajadas: 2.5,
    slaStatus: 'Cumplido',
    prioridadSla: 72,
    ubicacion: 'Edificio Principal - Contabilidad',
    elementoAfectado: 'Computador Dell OptiPlex 7090',
    diagnostico: 'Disco duro fragmentado y programas innecesarios instalados',
    solucionPropuesta: 'Desfragmentación y limpieza de software',
    solucionAplicada: 'Se realizó desfragmentación completa, limpieza de archivos temporales, desinstalación de programas innecesarios y actualización de drivers',
    observacionesTecnico: 'Se recomendó al usuario realizar limpiezas periódicas',
    requiereConsumibles: false,
    consumiblesRequeridos: [],
    evidencias: ['before_after_performance.png'],
    proximaAccion: 'Seguimiento en 30 días',
    calificacionUsuario: 5,
    comentarioUsuario: 'Excelente trabajo, el computador funciona perfecto ahora'
  }
];

// Utilidades para colores
export const getPrioridadColor = (prioridad) => {
  switch(prioridad) {
    case 'Crítica': return 'bg-red-100 text-red-800 border-red-200';
    case 'Alta': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Baja': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getEstadoTecnicoColor = (estadoTecnico) => {
  switch(estadoTecnico) {
    case 'ASIGNADO': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'EN_PROCESO': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'PENDIENTE': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'RESUELTO': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getSlaColor = (slaStatus) => {
  switch(slaStatus) {
    case 'En Tiempo': return 'bg-green-100 text-green-800 border-green-200';
    case 'En Riesgo': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Vencido': return 'bg-red-100 text-red-800 border-red-200';
    case 'Cumplido': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
