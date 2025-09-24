// Datos mock para reservas de salas

export const mockSalas = [
  {
    id: 1,
    nombre: 'Sala de Juntas A',
    ubicacion: 'Piso 1 - Oficina Principal',
    capacidad: 8,
    equipamiento: ['Proyector', 'Pizarra', 'WiFi'],
    estado: 'Disponible',
    tipo: 'Juntas'
  },
  {
    id: 2,
    nombre: 'Sala de Conferencias',
    ubicacion: 'Piso 2 - Oficina Principal',
    capacidad: 20,
    equipamiento: ['Proyector', 'Sistema de Audio', 'WiFi', 'Aire Acondicionado'],
    estado: 'Disponible',
    tipo: 'Conferencias'
  },
  {
    id: 3,
    nombre: 'Laboratorio de Computación',
    ubicacion: 'Piso 1 - Laboratorio',
    capacidad: 30,
    equipamiento: ['Computadoras', 'Proyector', 'WiFi', 'Aire Acondicionado'],
    estado: 'Disponible',
    tipo: 'Laboratorio'
  },
  {
    id: 4,
    nombre: 'Sala de Capacitación',
    ubicacion: 'Piso 3 - Oficina Principal',
    capacidad: 15,
    equipamiento: ['Proyector', 'Pizarra', 'WiFi', 'Aire Acondicionado'],
    estado: 'Mantenimiento',
    tipo: 'Capacitación'
  },
  {
    id: 5,
    nombre: 'Sala de Juntas B',
    ubicacion: 'Piso 2 - Oficina Principal',
    capacidad: 6,
    equipamiento: ['Pizarra', 'WiFi'],
    estado: 'Disponible',
    tipo: 'Juntas'
  }
];

export const mockReservas = [
  {
    id: 1,
    salaId: 1,
    salaNombre: 'Sala de Juntas A',
    usuario: 'Juan Pérez',
    departamento: 'IT',
    motivo: 'Reunión semanal del equipo',
    fechaInicio: '2024-01-20T09:00:00',
    fechaFin: '2024-01-20T10:30:00',
    estado: 'Confirmada',
    fechaReserva: '2024-01-18T14:30:00',
    observaciones: 'Necesitamos el proyector'
  },
  {
    id: 2,
    salaId: 2,
    salaNombre: 'Sala de Conferencias',
    usuario: 'María García',
    departamento: 'RRHH',
    motivo: 'Presentación de nuevos empleados',
    fechaInicio: '2024-01-22T14:00:00',
    fechaFin: '2024-01-22T16:00:00',
    estado: 'Confirmada',
    fechaReserva: '2024-01-19T10:15:00',
    observaciones: 'Preparar sistema de audio'
  },
  {
    id: 3,
    salaId: 3,
    salaNombre: 'Laboratorio de Computación',
    usuario: 'Carlos López',
    departamento: 'IT',
    motivo: 'Capacitación en nuevas tecnologías',
    fechaInicio: '2024-01-25T08:00:00',
    fechaFin: '2024-01-25T12:00:00',
    estado: 'Pendiente',
    fechaReserva: '2024-01-20T16:45:00',
    observaciones: 'Curso completo de 4 horas'
  },
  {
    id: 4,
    salaId: 1,
    salaNombre: 'Sala de Juntas A',
    usuario: 'Ana Martínez',
    departamento: 'Ventas',
    motivo: 'Reunión con cliente importante',
    fechaInicio: '2024-01-21T11:00:00',
    fechaFin: '2024-01-21T12:00:00',
    estado: 'Confirmada',
    fechaReserva: '2024-01-20T09:20:00',
    observaciones: 'Cliente externo'
  },
  {
    id: 5,
    salaId: 5,
    salaNombre: 'Sala de Juntas B',
    usuario: 'Roberto Silva',
    departamento: 'Finanzas',
    motivo: 'Revisión de presupuesto',
    fechaInicio: '2024-01-23T15:30:00',
    fechaFin: '2024-01-23T17:00:00',
    estado: 'Cancelada',
    fechaReserva: '2024-01-21T11:30:00',
    observaciones: 'Cancelada por cambio de agenda'
  }
];

export const mockDepartamentos = [
  { id: 1, nombre: 'IT', descripcion: 'Tecnología de la Información' },
  { id: 2, nombre: 'RRHH', descripcion: 'Recursos Humanos' },
  { id: 3, nombre: 'Ventas', descripcion: 'Departamento de Ventas' },
  { id: 4, nombre: 'Finanzas', descripcion: 'Departamento Financiero' },
  { id: 5, nombre: 'Marketing', descripcion: 'Departamento de Marketing' },
  { id: 6, nombre: 'Operaciones', descripcion: 'Operaciones Generales' }
];

export const mockEstadosReserva = [
  { id: 1, nombre: 'Pendiente', descripcion: 'Esperando confirmación', color: 'yellow' },
  { id: 2, nombre: 'Confirmada', descripcion: 'Reserva confirmada', color: 'green' },
  { id: 3, nombre: 'Cancelada', descripcion: 'Reserva cancelada', color: 'red' },
  { id: 4, nombre: 'En Progreso', descripcion: 'Reserva en curso', color: 'blue' },
  { id: 5, nombre: 'Finalizada', descripcion: 'Reserva completada', color: 'gray' }
];

export const mockHorariosDisponibles = [
  { hora: '08:00', disponible: true },
  { hora: '08:30', disponible: true },
  { hora: '09:00', disponible: false },
  { hora: '09:30', disponible: false },
  { hora: '10:00', disponible: true },
  { hora: '10:30', disponible: true },
  { hora: '11:00', disponible: false },
  { hora: '11:30', disponible: true },
  { hora: '12:00', disponible: true },
  { hora: '12:30', disponible: true },
  { hora: '13:00', disponible: true },
  { hora: '13:30', disponible: true },
  { hora: '14:00', disponible: false },
  { hora: '14:30', disponible: false },
  { hora: '15:00', disponible: true },
  { hora: '15:30', disponible: true },
  { hora: '16:00', disponible: false },
  { hora: '16:30', disponible: true },
  { hora: '17:00', disponible: true },
  { hora: '17:30', disponible: true },
  { hora: '18:00', disponible: true }
];
