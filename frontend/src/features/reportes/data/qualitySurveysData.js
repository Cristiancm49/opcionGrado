// Mock data para encuestas de calidad
export const mockEncuestas = [
  {
    id: 1,
    casoId: 'CAS-2024-001',
    fechaEncuesta: '2024-01-15T14:30:00Z',
    usuario: 'maria.garcia@empresa.com',
    nombreUsuario: 'María García',
    tecnicoAsignado: 'carlos.martinez@empresa.com',
    nombreTecnico: 'Carlos Martínez',
    areaTecnica: 'Soporte Hardware',
    tipoCaso: 'Reparación',
    prioridad: 'Media',
    tiempoResolucion: 2.5, // horas
    satisfaccionGeneral: 5,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 5, valorNumerico: 5 }
    ],
    observaciones: 'Excelente servicio, muy profesional y rápido.',
    promedioRespuestas: 4.75
  },
  {
    id: 2,
    casoId: 'CAS-2024-002',
    fechaEncuesta: '2024-01-14T16:45:00Z',
    usuario: 'juan.perez@empresa.com',
    nombreUsuario: 'Juan Pérez',
    tecnicoAsignado: 'ana.lopez@empresa.com',
    nombreTecnico: 'Ana López',
    areaTecnica: 'Soporte Software',
    tipoCaso: 'Instalación',
    prioridad: 'Alta',
    tiempoResolucion: 1.5,
    satisfaccionGeneral: 4,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 4, valorNumerico: 4 }
    ],
    observaciones: 'Buen servicio, aunque tardó un poco más de lo esperado.',
    promedioRespuestas: 4.0
  },
  {
    id: 3,
    casoId: 'CAS-2024-003',
    fechaEncuesta: '2024-01-13T11:20:00Z',
    usuario: 'pedro.silva@empresa.com',
    nombreUsuario: 'Pedro Silva',
    tecnicoAsignado: 'luis.rodriguez@empresa.com',
    nombreTecnico: 'Luis Rodríguez',
    areaTecnica: 'Soporte Redes',
    tipoCaso: 'Configuración',
    prioridad: 'Baja',
    tiempoResolucion: 3.0,
    satisfaccionGeneral: 3,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 3, valorNumerico: 3 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 3, valorNumerico: 3 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 3, valorNumerico: 3 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 3, valorNumerico: 3 }
    ],
    observaciones: 'Servicio regular, el técnico parecía tener prisa.',
    promedioRespuestas: 3.0
  },
  {
    id: 4,
    casoId: 'CAS-2024-004',
    fechaEncuesta: '2024-01-12T09:15:00Z',
    usuario: 'laura.martinez@empresa.com',
    nombreUsuario: 'Laura Martínez',
    tecnicoAsignado: 'carlos.martinez@empresa.com',
    nombreTecnico: 'Carlos Martínez',
    areaTecnica: 'Soporte Hardware',
    tipoCaso: 'Mantenimiento',
    prioridad: 'Media',
    tiempoResolucion: 2.0,
    satisfaccionGeneral: 5,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 5, valorNumerico: 5 }
    ],
    observaciones: 'Servicio excepcional, muy detallado y profesional.',
    promedioRespuestas: 5.0
  },
  {
    id: 5,
    casoId: 'CAS-2024-005',
    fechaEncuesta: '2024-01-11T15:30:00Z',
    usuario: 'roberto.gonzalez@empresa.com',
    nombreUsuario: 'Roberto González',
    tecnicoAsignado: 'ana.lopez@empresa.com',
    nombreTecnico: 'Ana López',
    areaTecnica: 'Soporte Software',
    tipoCaso: 'Actualización',
    prioridad: 'Alta',
    tiempoResolucion: 1.0,
    satisfaccionGeneral: 4,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 4, valorNumerico: 4 }
    ],
    observaciones: 'Buen servicio, técnico muy amable.',
    promedioRespuestas: 4.25
  },
  {
    id: 6,
    casoId: 'CAS-2024-006',
    fechaEncuesta: '2024-01-10T13:45:00Z',
    usuario: 'sofia.hernandez@empresa.com',
    nombreUsuario: 'Sofía Hernández',
    tecnicoAsignado: 'luis.rodriguez@empresa.com',
    nombreTecnico: 'Luis Rodríguez',
    areaTecnica: 'Soporte Redes',
    tipoCaso: 'Diagnóstico',
    prioridad: 'Media',
    tiempoResolucion: 2.5,
    satisfaccionGeneral: 2,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 2, valorNumerico: 2 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 2, valorNumerico: 2 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 2, valorNumerico: 2 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 2, valorNumerico: 2 }
    ],
    observaciones: 'El técnico no fue muy claro en las explicaciones.',
    promedioRespuestas: 2.0
  },
  {
    id: 7,
    casoId: 'CAS-2024-007',
    fechaEncuesta: '2024-01-09T10:20:00Z',
    usuario: 'diego.torres@empresa.com',
    nombreUsuario: 'Diego Torres',
    tecnicoAsignado: 'carlos.martinez@empresa.com',
    nombreTecnico: 'Carlos Martínez',
    areaTecnica: 'Soporte Hardware',
    tipoCaso: 'Reparación',
    prioridad: 'Alta',
    tiempoResolucion: 1.5,
    satisfaccionGeneral: 5,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 5, valorNumerico: 5 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 5, valorNumerico: 5 }
    ],
    observaciones: 'Excelente trabajo, muy rápido y eficiente.',
    promedioRespuestas: 5.0
  },
  {
    id: 8,
    casoId: 'CAS-2024-008',
    fechaEncuesta: '2024-01-08T14:10:00Z',
    usuario: 'carmen.vargas@empresa.com',
    nombreUsuario: 'Carmen Vargas',
    tecnicoAsignado: 'ana.lopez@empresa.com',
    nombreTecnico: 'Ana López',
    areaTecnica: 'Soporte Software',
    tipoCaso: 'Instalación',
    prioridad: 'Baja',
    tiempoResolucion: 3.5,
    satisfaccionGeneral: 4,
    respuestas: [
      { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿El técnico fue profesional y cortés?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿El problema fue resuelto completamente?', respuesta: 4, valorNumerico: 4 },
      { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 4, valorNumerico: 4 }
    ],
    observaciones: 'Buen servicio, técnico paciente y explicativo.',
    promedioRespuestas: 4.0
  }
];

export const mockTecnicos = [
  { id: 1, nombre: 'Carlos Martínez', email: 'carlos.martinez@empresa.com', area: 'Soporte Hardware' },
  { id: 2, nombre: 'Ana López', email: 'ana.lopez@empresa.com', area: 'Soporte Software' },
  { id: 3, nombre: 'Luis Rodríguez', email: 'luis.rodriguez@empresa.com', area: 'Soporte Redes' }
];

export const mockAreasTecnicas = [
  'Soporte Hardware',
  'Soporte Software', 
  'Soporte Redes',
  'Soporte Móvil',
  'Soporte General'
];

export const mockTiposCaso = [
  'Reparación',
  'Instalación',
  'Configuración',
  'Mantenimiento',
  'Actualización',
  'Diagnóstico',
  'Consultoría'
];

export const mockPrioridades = [
  'Baja',
  'Media',
  'Alta',
  'Crítica'
];

export const mockPreguntas = [
  '¿Qué tan satisfecho está con el tiempo de respuesta?',
  '¿El técnico fue profesional y cortés?',
  '¿El problema fue resuelto completamente?',
  '¿Recomendaría nuestro servicio?',
  '¿La solución fue clara y comprensible?',
  '¿El técnico mostró conocimiento técnico?',
  '¿Se sintió cómodo durante el servicio?'
];
