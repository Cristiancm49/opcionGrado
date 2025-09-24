// Mock data para Dashboard General (consolidado con casos y encuestas)
export const mockDashboardData = {
  // Estadísticas generales
  estadisticasGenerales: {
    totalCasos: 156,
    casosAbiertos: 23,
    casosCerrados: 128,
    casosEscalados: 8,
    totalUsuarios: 45,
    usuariosActivos: 38,
    totalTecnicos: 12,
    tecnicosDisponibles: 9,
    satisfaccionPromedio: 4.2,
    tiempoPromedioResolucion: 6.8,
    casosResueltosHoy: 12,
    casosNuevosHoy: 8
  },

  // Datos para gráficos de tendencias temporales
  tendenciasMensuales: [
    { mes: 'Enero', casos: 45, resueltos: 38, escalados: 3, satisfaccion: 4.1 },
    { mes: 'Febrero', casos: 52, resueltos: 44, escalados: 5, satisfaccion: 4.0 },
    { mes: 'Marzo', casos: 48, resueltos: 42, escalados: 4, satisfaccion: 4.2 },
    { mes: 'Abril', casos: 61, resueltos: 55, escalados: 6, satisfaccion: 4.3 },
    { mes: 'Mayo', casos: 58, resueltos: 52, escalados: 3, satisfaccion: 4.4 },
    { mes: 'Junio', casos: 67, resueltos: 59, escalados: 7, satisfaccion: 4.2 },
    { mes: 'Julio', casos: 72, resueltos: 65, escalados: 4, satisfaccion: 4.5 },
    { mes: 'Agosto', casos: 69, resueltos: 62, escalados: 5, satisfaccion: 4.3 }
  ],

  // Datos para gráficos de barras
  casosPorArea: [
    { area: 'Hardware', casos: 45, resueltos: 38, pendientes: 7 },
    { area: 'Software', casos: 52, resueltos: 44, pendientes: 8 },
    { area: 'Redes', casos: 38, resueltos: 32, pendientes: 6 },
    { area: 'Móvil', casos: 21, resueltos: 18, pendientes: 3 }
  ],

  casosPorPrioridad: [
    { prioridad: 'Crítica', casos: 8, color: '#dc2626' },
    { prioridad: 'Alta', casos: 23, color: '#ea580c' },
    { prioridad: 'Media', casos: 67, color: '#d97706' },
    { prioridad: 'Baja', casos: 58, color: '#16a34a' }
  ],

  // Datos para gráficos circulares y donas
  distribucionEstados: [
    { estado: 'Cerrado', cantidad: 128, porcentaje: 82.1, color: '#10b981' },
    { estado: 'En Proceso', cantidad: 15, porcentaje: 9.6, color: '#f59e0b' },
    { estado: 'Abierto', cantidad: 8, porcentaje: 5.1, color: '#3b82f6' },
    { estado: 'Escalado', cantidad: 5, porcentaje: 3.2, color: '#ef4444' }
  ],

  satisfaccionPorTecnico: [
    { tecnico: 'Carlos Martínez', casos: 45, satisfaccion: 4.5, color: '#10b981' },
    { tecnico: 'Ana López', casos: 38, satisfaccion: 4.3, color: '#3b82f6' },
    { tecnico: 'Luis Rodríguez', casos: 32, satisfaccion: 4.1, color: '#f59e0b' },
    { tecnico: 'María García', casos: 28, satisfaccion: 4.0, color: '#8b5cf6' },
    { tecnico: 'Pedro Silva', casos: 13, satisfaccion: 3.8, color: '#ef4444' }
  ],

  // Datos para gráfico de calor
  casosPorTecnicoYArea: [
    { tecnico: 'Carlos Martínez', hardware: 15, software: 8, redes: 12, movil: 10 },
    { tecnico: 'Ana López', hardware: 5, software: 20, redes: 8, movil: 5 },
    { tecnico: 'Luis Rodríguez', hardware: 8, software: 6, redes: 15, movil: 3 },
    { tecnico: 'María García', hardware: 12, software: 10, redes: 3, movil: 3 },
    { tecnico: 'Pedro Silva', hardware: 5, software: 8, redes: 0, movil: 0 }
  ],

  // Datos para gráficos de líneas
  tendenciasDiarias: [
    { dia: 'Lun', casos: 8, resueltos: 6, escalados: 1 },
    { dia: 'Mar', casos: 12, resueltos: 9, escalados: 2 },
    { dia: 'Mié', casos: 15, resueltos: 12, escalados: 1 },
    { dia: 'Jue', casos: 18, resueltos: 15, escalados: 2 },
    { dia: 'Vie', casos: 14, resueltos: 11, escalados: 1 },
    { dia: 'Sáb', casos: 6, resueltos: 5, escalados: 0 },
    { dia: 'Dom', casos: 4, resueltos: 3, escalados: 0 }
  ],

  // Datos para gráficos de porcentajes
  eficienciaPorArea: [
    { area: 'Hardware', eficiencia: 84.4, casosResueltos: 38, casosTotales: 45 },
    { area: 'Software', eficiencia: 84.6, casosResueltos: 44, casosTotales: 52 },
    { area: 'Redes', eficiencia: 84.2, casosResueltos: 32, casosTotales: 38 },
    { area: 'Móvil', eficiencia: 85.7, casosResueltos: 18, casosTotales: 21 }
  ],

  // Datos para estados de encuestas
  estadosEncuestas: [
    { estado: 'Completadas', cantidad: 89, porcentaje: 78.1, color: '#10b981' },
    { estado: 'Pendientes', cantidad: 18, porcentaje: 15.8, color: '#f59e0b' },
    { estado: 'No Enviadas', cantidad: 7, porcentaje: 6.1, color: '#6b7280' }
  ],

  satisfaccionDetallada: [
    { nivel: 'Excelente (5★)', cantidad: 45, porcentaje: 50.6, color: '#10b981' },
    { nivel: 'Buena (4★)', cantidad: 28, porcentaje: 31.5, color: '#3b82f6' },
    { nivel: 'Regular (3★)', cantidad: 12, porcentaje: 13.5, color: '#f59e0b' },
    { nivel: 'Mala (2★)', cantidad: 4, porcentaje: 4.5, color: '#ef4444' }
  ],

  // Datos para gráficos de radar
  rendimientoTecnico: [
    { tecnico: 'Carlos Martínez', tiempo: 85, satisfaccion: 90, casos: 95, conocimiento: 88, comunicacion: 82 },
    { tecnico: 'Ana López', tiempo: 78, satisfaccion: 86, casos: 88, conocimiento: 92, comunicacion: 85 },
    { tecnico: 'Luis Rodríguez', tiempo: 82, satisfaccion: 82, casos: 85, conocimiento: 85, comunicacion: 78 }
  ],

  // Datos para gráficos de área
  casosPorHora: [
    { hora: '08:00', casos: 2 },
    { hora: '09:00', casos: 5 },
    { hora: '10:00', casos: 8 },
    { hora: '11:00', casos: 12 },
    { hora: '12:00', casos: 15 },
    { hora: '13:00', casos: 8 },
    { hora: '14:00', casos: 10 },
    { hora: '15:00', casos: 14 },
    { hora: '16:00', casos: 18 },
    { hora: '17:00', casos: 12 },
    { hora: '18:00', casos: 6 },
    { hora: '19:00', casos: 3 }
  ],

  // Datos para métricas de rendimiento
  metricasRendimiento: {
    tiempoPromedioResolucion: 6.8,
    casosResueltosPorDia: 12.5,
    satisfaccionPromedio: 4.2,
    eficienciaGeneral: 84.5,
    casosEscaladosPorcentaje: 5.1,
    casosRetrasadosPorcentaje: 8.3
  },

  // Datos consolidados de casos (del módulo Reportes de Casos)
  casosDetallados: [
    {
      id: 1,
      numeroCaso: 'CAS-2024-001',
      titulo: 'Problema con impresora láser',
      descripcion: 'La impresora láser del área administrativa no está funcionando correctamente',
      fechaRegistro: '2024-01-15T08:30:00Z',
      fechaFin: '2024-01-15T16:45:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Reparación',
      prioridad: 'Alta',
      usuarioReporta: 'maria.garcia@empresa.com',
      nombreUsuario: 'María García',
      tecnicoAsignado: 'carlos.martinez@empresa.com',
      nombreTecnico: 'Carlos Martínez',
      areaTecnica: 'Soporte Hardware',
      diasAbierto: 0,
      tiempoResolucion: 8.25,
      satisfaccion: 5,
      activoAfectado: 'IMP-001 - HP LaserJet Pro',
      ubicacion: 'Oficina Principal - Piso 2',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 2,
      numeroCaso: 'CAS-2024-002',
      titulo: 'Instalación de software nuevo',
      descripcion: 'Necesidad de instalar Microsoft Office 365 en equipos del departamento de ventas',
      fechaRegistro: '2024-01-14T09:15:00Z',
      fechaFin: '2024-01-16T14:20:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Instalación',
      prioridad: 'Media',
      usuarioReporta: 'juan.perez@empresa.com',
      nombreUsuario: 'Juan Pérez',
      tecnicoAsignado: 'ana.lopez@empresa.com',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      diasAbierto: 2,
      tiempoResolucion: 29.08,
      satisfaccion: 4,
      activoAfectado: 'PC-015 - Dell OptiPlex',
      ubicacion: 'Departamento Ventas - Piso 1',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 3,
      numeroCaso: 'CAS-2024-003',
      titulo: 'Configuración de red WiFi',
      descripcion: 'Problemas de conectividad WiFi en la sala de juntas',
      fechaRegistro: '2024-01-13T11:20:00Z',
      fechaFin: '2024-01-13T15:30:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Configuración',
      prioridad: 'Baja',
      usuarioReporta: 'pedro.silva@empresa.com',
      nombreUsuario: 'Pedro Silva',
      tecnicoAsignado: 'luis.rodriguez@empresa.com',
      nombreTecnico: 'Luis Rodríguez',
      areaTecnica: 'Soporte Redes',
      diasAbierto: 0,
      tiempoResolucion: 4.17,
      satisfaccion: 3,
      activoAfectado: 'ROUTER-003 - Cisco Catalyst',
      ubicacion: 'Sala de Juntas - Piso 3',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 4,
      numeroCaso: 'CAS-2024-004',
      titulo: 'Mantenimiento preventivo servidor',
      descripcion: 'Mantenimiento programado del servidor principal',
      fechaRegistro: '2024-01-12T07:00:00Z',
      fechaFin: '2024-01-12T12:00:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Mantenimiento',
      prioridad: 'Media',
      usuarioReporta: 'laura.martinez@empresa.com',
      nombreUsuario: 'Laura Martínez',
      tecnicoAsignado: 'carlos.martinez@empresa.com',
      nombreTecnico: 'Carlos Martínez',
      areaTecnica: 'Soporte Hardware',
      diasAbierto: 0,
      tiempoResolucion: 5.0,
      satisfaccion: 5,
      activoAfectado: 'SRV-001 - Dell PowerEdge',
      ubicacion: 'Centro de Datos - Sótano',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 5,
      numeroCaso: 'CAS-2024-005',
      titulo: 'Actualización de sistema operativo',
      descripcion: 'Actualización de Windows 10 a Windows 11 en equipos administrativos',
      fechaRegistro: '2024-01-11T10:30:00Z',
      fechaFin: '2024-01-11T18:45:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Actualización',
      prioridad: 'Alta',
      usuarioReporta: 'roberto.gonzalez@empresa.com',
      nombreUsuario: 'Roberto González',
      tecnicoAsignado: 'ana.lopez@empresa.com',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      diasAbierto: 0,
      tiempoResolucion: 8.25,
      satisfaccion: 4,
      activoAfectado: 'PC-008 - HP EliteDesk',
      ubicacion: 'Oficina Administrativa - Piso 2',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 6,
      numeroCaso: 'CAS-2024-006',
      titulo: 'Diagnóstico de lentitud en red',
      descripcion: 'La red está muy lenta, necesitamos diagnosticar el problema',
      fechaRegistro: '2024-01-10T13:45:00Z',
      fechaFin: '2024-01-12T10:15:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Diagnóstico',
      prioridad: 'Alta',
      usuarioReporta: 'sofia.hernandez@empresa.com',
      nombreUsuario: 'Sofía Hernández',
      tecnicoAsignado: 'luis.rodriguez@empresa.com',
      nombreTecnico: 'Luis Rodríguez',
      areaTecnica: 'Soporte Redes',
      diasAbierto: 1,
      tiempoResolucion: 44.5,
      satisfaccion: 2,
      activoAfectado: 'SWITCH-002 - Cisco Catalyst',
      ubicacion: 'Oficina Principal - Piso 2',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 7,
      numeroCaso: 'CAS-2024-007',
      titulo: 'Reparación de monitor dañado',
      descripcion: 'Monitor con pantalla rota necesita reparación',
      fechaRegistro: '2024-01-09T14:20:00Z',
      fechaFin: '2024-01-09T17:30:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Reparación',
      prioridad: 'Media',
      usuarioReporta: 'diego.torres@empresa.com',
      nombreUsuario: 'Diego Torres',
      tecnicoAsignado: 'carlos.martinez@empresa.com',
      nombreTecnico: 'Carlos Martínez',
      areaTecnica: 'Soporte Hardware',
      diasAbierto: 0,
      tiempoResolucion: 3.17,
      satisfaccion: 5,
      activoAfectado: 'MON-012 - Samsung 24"',
      ubicacion: 'Oficina Contabilidad - Piso 1',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 8,
      numeroCaso: 'CAS-2024-008',
      titulo: 'Instalación de antivirus corporativo',
      descripcion: 'Instalación de antivirus corporativo en todos los equipos',
      fechaRegistro: '2024-01-08T08:00:00Z',
      fechaFin: '2024-01-10T16:00:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Instalación',
      prioridad: 'Alta',
      usuarioReporta: 'carmen.vargas@empresa.com',
      nombreUsuario: 'Carmen Vargas',
      tecnicoAsignado: 'ana.lopez@empresa.com',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      diasAbierto: 2,
      tiempoResolucion: 56.0,
      satisfaccion: 4,
      activoAfectado: 'PC-025 - Lenovo ThinkCentre',
      ubicacion: 'Oficina Principal - Piso 2',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    },
    {
      id: 9,
      numeroCaso: 'CAS-2024-009',
      titulo: 'Problema con correo electrónico',
      descripcion: 'No se pueden enviar correos electrónicos desde Outlook',
      fechaRegistro: '2024-01-07T15:30:00Z',
      fechaFin: null,
      estado: 'En Proceso',
      tipoCaso: 'Configuración',
      prioridad: 'Alta',
      usuarioReporta: 'miguel.ruiz@empresa.com',
      nombreUsuario: 'Miguel Ruiz',
      tecnicoAsignado: 'luis.rodriguez@empresa.com',
      nombreTecnico: 'Luis Rodríguez',
      areaTecnica: 'Soporte Redes',
      diasAbierto: 8,
      tiempoResolucion: null,
      satisfaccion: null,
      activoAfectado: 'SRV-002 - Exchange Server',
      ubicacion: 'Centro de Datos - Sótano',
      escalado: true,
      nivelEscalado: 'Supervisor',
      motivoEscalado: 'Tiempo límite excedido',
      retrasado: true,
      diasRetraso: 3
    },
    {
      id: 10,
      numeroCaso: 'CAS-2024-010',
      titulo: 'Consulta sobre licencias de software',
      descripcion: 'Consulta sobre renovación de licencias de Microsoft Office',
      fechaRegistro: '2024-01-06T11:15:00Z',
      fechaFin: '2024-01-06T12:30:00Z',
      estado: 'Cerrado',
      tipoCaso: 'Consultoría',
      prioridad: 'Baja',
      usuarioReporta: 'elena.morales@empresa.com',
      nombreUsuario: 'Elena Morales',
      tecnicoAsignado: 'ana.lopez@empresa.com',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      diasAbierto: 0,
      tiempoResolucion: 1.25,
      satisfaccion: 5,
      activoAfectado: null,
      ubicacion: 'Oficina Administrativa - Piso 2',
      escalado: false,
      nivelEscalado: null,
      motivoEscalado: null,
      retrasado: false,
      diasRetraso: 0
    }
  ],

  // Datos consolidados de encuestas (del módulo Encuestas de Calidad)
  encuestasDetalladas: [
    {
      id: 1,
      casoId: 'CAS-2024-001',
      nombreUsuario: 'María García',
      nombreTecnico: 'Carlos Martínez',
      areaTecnica: 'Soporte Hardware',
      tipoCaso: 'Reparación',
      prioridad: 'Alta',
      fechaEncuesta: '2024-01-15T17:00:00Z',
      satisfaccionGeneral: 5,
      promedioRespuestas: 4.8,
      tiempoResolucion: 8.25,
      observaciones: 'Excelente servicio, muy profesional',
      respuestas: [
        { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 'Muy satisfecho', valorNumerico: 5 },
        { pregunta: '¿Cómo califica la profesionalidad del técnico?', respuesta: 'Excelente', valorNumerico: 5 },
        { pregunta: '¿El problema fue resuelto completamente?', respuesta: 'Sí', valorNumerico: 5 },
        { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 'Definitivamente', valorNumerico: 5 }
      ]
    },
    {
      id: 2,
      casoId: 'CAS-2024-002',
      nombreUsuario: 'Juan Pérez',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      tipoCaso: 'Instalación',
      prioridad: 'Media',
      fechaEncuesta: '2024-01-16T15:00:00Z',
      satisfaccionGeneral: 4,
      promedioRespuestas: 4.2,
      tiempoResolucion: 29.08,
      observaciones: 'Buen servicio, pero tardó más de lo esperado',
      respuestas: [
        { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 'Regular', valorNumerico: 3 },
        { pregunta: '¿Cómo califica la profesionalidad del técnico?', respuesta: 'Buena', valorNumerico: 4 },
        { pregunta: '¿El problema fue resuelto completamente?', respuesta: 'Sí', valorNumerico: 5 },
        { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 'Probablemente', valorNumerico: 4 }
      ]
    },
    {
      id: 3,
      casoId: 'CAS-2024-003',
      nombreUsuario: 'Pedro Silva',
      nombreTecnico: 'Luis Rodríguez',
      areaTecnica: 'Soporte Redes',
      tipoCaso: 'Configuración',
      prioridad: 'Baja',
      fechaEncuesta: '2024-01-13T16:00:00Z',
      satisfaccionGeneral: 3,
      promedioRespuestas: 3.5,
      tiempoResolucion: 4.17,
      observaciones: 'Servicio regular, técnico poco comunicativo',
      respuestas: [
        { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 'Satisfecho', valorNumerico: 4 },
        { pregunta: '¿Cómo califica la profesionalidad del técnico?', respuesta: 'Regular', valorNumerico: 3 },
        { pregunta: '¿El problema fue resuelto completamente?', respuesta: 'Sí', valorNumerico: 4 },
        { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 'Tal vez', valorNumerico: 3 }
      ]
    },
    {
      id: 4,
      casoId: 'CAS-2024-004',
      nombreUsuario: 'Laura Martínez',
      nombreTecnico: 'Carlos Martínez',
      areaTecnica: 'Soporte Hardware',
      tipoCaso: 'Mantenimiento',
      prioridad: 'Media',
      fechaEncuesta: '2024-01-12T13:00:00Z',
      satisfaccionGeneral: 5,
      promedioRespuestas: 4.9,
      tiempoResolucion: 5.0,
      observaciones: 'Mantenimiento preventivo excelente',
      respuestas: [
        { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 'Muy satisfecho', valorNumerico: 5 },
        { pregunta: '¿Cómo califica la profesionalidad del técnico?', respuesta: 'Excelente', valorNumerico: 5 },
        { pregunta: '¿El problema fue resuelto completamente?', respuesta: 'Sí', valorNumerico: 5 },
        { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 'Definitivamente', valorNumerico: 5 }
      ]
    },
    {
      id: 5,
      casoId: 'CAS-2024-005',
      nombreUsuario: 'Roberto González',
      nombreTecnico: 'Ana López',
      areaTecnica: 'Soporte Software',
      tipoCaso: 'Actualización',
      prioridad: 'Alta',
      fechaEncuesta: '2024-01-11T19:00:00Z',
      satisfaccionGeneral: 4,
      promedioRespuestas: 4.0,
      tiempoResolucion: 8.25,
      observaciones: 'Actualización exitosa, técnico muy competente',
      respuestas: [
        { pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?', respuesta: 'Satisfecho', valorNumerico: 4 },
        { pregunta: '¿Cómo califica la profesionalidad del técnico?', respuesta: 'Buena', valorNumerico: 4 },
        { pregunta: '¿El problema fue resuelto completamente?', respuesta: 'Sí', valorNumerico: 4 },
        { pregunta: '¿Recomendaría nuestro servicio?', respuesta: 'Probablemente', valorNumerico: 4 }
      ]
    }
  ],

  // Opciones para filtros
  opcionesFiltros: {
    estados: ['Abierto', 'En Proceso', 'Cerrado', 'Cancelado', 'Pendiente'],
    tiposCaso: ['Reparación', 'Instalación', 'Configuración', 'Mantenimiento', 'Actualización', 'Diagnóstico', 'Consultoría'],
    prioridades: ['Baja', 'Media', 'Alta', 'Crítica'],
    areasTecnicas: ['Soporte Hardware', 'Soporte Software', 'Soporte Redes', 'Soporte Móvil', 'Soporte General'],
    tecnicos: [
      { id: 1, nombre: 'Carlos Martínez', email: 'carlos.martinez@empresa.com', area: 'Soporte Hardware' },
      { id: 2, nombre: 'Ana López', email: 'ana.lopez@empresa.com', area: 'Soporte Software' },
      { id: 3, nombre: 'Luis Rodríguez', email: 'luis.rodriguez@empresa.com', area: 'Soporte Redes' }
    ],
    calificaciones: ['Excelente (5★)', 'Buena (4★)', 'Regular (3★)', 'Mala (2★)', 'Muy Mala (1★)'],
    nivelesSatisfaccion: ['Excelente', 'Buena', 'Regular', 'Mala']
  }
};

export const mockTecnicos = [
  { id: 1, nombre: 'Carlos Martínez', area: 'Hardware', estado: 'Disponible', casosActivos: 3 },
  { id: 2, nombre: 'Ana López', area: 'Software', estado: 'Ocupado', casosActivos: 5 },
  { id: 3, nombre: 'Luis Rodríguez', area: 'Redes', estado: 'Disponible', casosActivos: 2 },
  { id: 4, nombre: 'María García', area: 'Hardware', estado: 'Disponible', casosActivos: 1 },
  { id: 5, nombre: 'Pedro Silva', area: 'Software', estado: 'Ocupado', casosActivos: 4 }
];

export const mockAreas = [
  'Hardware',
  'Software', 
  'Redes',
  'Móvil',
  'General'
];
