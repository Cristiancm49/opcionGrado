// Datos mock para incidencias

export const incidenciasData = [
  // ====== CASOS ACTIVOS ======
  {
    id: 1,
    numeroCaso: 'INC-001234',
    fechaRegistro: '2025-01-15',
    fechaModificacion: '2025-01-17',
    solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
    dependencia: 'OFICINA DE PLANEACION',
    contacto: 'diego.quesada@uniamazonia.edu.co',
    telefono: '123456789',
    descripcion: 'Computador no enciende en oficina 205, presenta problema eléctrico',
    prioridad: 'Alta',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'Activo',
    tecnicoAsignado: null,
    diasAbierto: 3,
    slaStatus: 'En Tiempo',
    ubicacion: 'Edificio A - Piso 2 - Oficina 205',
    elementoAfectado: 'Computador HP ProDesk 400',
    observaciones: 'Se requiere revisión urgente del equipo.',
    evidencias: [],
    historial: [
      { fecha: '2025-01-15', usuario: 'Sistema', accion: 'Incidencia Creada' },
      { fecha: '2025-01-17', usuario: 'Administrador', accion: 'Modificada' }
    ]
  },
  {
    id: 2,
    numeroCaso: 'INC-001235',
    fechaRegistro: '2025-01-14',
    fechaModificacion: '2025-01-14',
    solicitante: 'MARIA GONZALEZ LOPEZ',
    dependencia: 'RECURSOS HUMANOS',
    contacto: 'maria.gonzalez@uniamazonia.edu.co',
    telefono: '987654321',
    descripcion: 'Problema con impresora en recepción, no imprime documentos',
    prioridad: 'Media',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Reparación',
    estado: 'Activo',
    tecnicoAsignado: 'Juan Pérez',
    diasAbierto: 4,
    slaStatus: 'En Tiempo',
    ubicacion: 'Edificio Principal - Recepción',
    elementoAfectado: 'Impresora Canon ImageRunner',
    observaciones: 'Se asignó a Juan Pérez para revisión.',
    evidencias: ['foto_impresora.jpg'],
    historial: [
      { fecha: '2025-01-14', usuario: 'Sistema', accion: 'Incidencia Creada' },
      { fecha: '2025-01-14', usuario: 'Administrador', accion: 'Asignada a Juan Pérez' }
    ]
  },
  {
    id: 3,
    numeroCaso: 'INC-001236',
    fechaRegistro: '2025-01-13',
    fechaModificacion: '2025-01-17',
    solicitante: 'CARLOS RIVERA MORA',
    dependencia: 'SISTEMAS',
    contacto: 'carlos.rivera@uniamazonia.edu.co',
    telefono: '456789123',
    descripcion: 'Problema de conectividad a internet en toda la oficina',
    prioridad: 'Crítica',
    areaTecnica: 'Redes',
    tipoTrabajo: 'Configuración',
    estado: 'Activo',
    tecnicoAsignado: 'Luis Martínez',
    diasAbierto: 5,
    slaStatus: 'Vencido',
    ubicacion: 'Edificio B - Piso 1',
    elementoAfectado: 'Switch de red principal',
    observaciones: 'Requiere reconfiguración de VLANs.',
    evidencias: ['log_red.txt'],
    historial: [
      { fecha: '2025-01-13', usuario: 'Sistema', accion: 'Incidencia Creada' },
      { fecha: '2025-01-13', usuario: 'Administrador', accion: 'Asignada a Luis Martínez' },
      { fecha: '2025-01-17', usuario: 'Luis Martínez', accion: 'Diagnóstico inicial' }
    ]
  },
  // ====== CASOS RESUELTOS ======
  {
    id: 4,
    numeroCaso: 'INC-001200',
    fechaRegistro: '2025-01-10',
    fechaModificacion: '2025-01-12',
    fechaResolucion: '2025-01-12',
    solicitante: 'ANA JIMENEZ TORRES',
    dependencia: 'CONTABILIDAD',
    contacto: 'ana.jimenez@uniamazonia.edu.co',
    telefono: '789123456',
    descripcion: 'Computador lento, requiere optimización',
    prioridad: 'Baja',
    areaTecnica: 'Hardware',
    tipoTrabajo: 'Mantenimiento',
    estado: 'Resuelto',
    tecnicoAsignado: 'Juan Pérez',
    diasAbierto: 2,
    slaStatus: 'Cumplido',
    ubicacion: 'Edificio Principal - Contabilidad',
    elementoAfectado: 'Computador Dell OptiPlex 7090',
    observaciones: 'Se realizó desfragmentación y limpieza de software.',
    evidencias: ['reporte_optimizacion.pdf'],
    historial: [
      { fecha: '2025-01-10', usuario: 'Sistema', accion: 'Incidencia Creada' },
      { fecha: '2025-01-10', usuario: 'Administrador', accion: 'Asignada a Juan Pérez' },
      { fecha: '2025-01-12', usuario: 'Juan Pérez', accion: 'Resuelta' }
    ],
    calificacion: 5,
    comentario: 'Excelente servicio, el equipo funciona mucho mejor.'
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

export const getEstadoColor = (estado) => {
  switch(estado) {
    case 'Activo': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'En Proceso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Pendiente': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Resuelto': return 'bg-green-100 text-green-800 border-green-200';
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