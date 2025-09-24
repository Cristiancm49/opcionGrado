// Datos mock para la gestión de inventario

export const mockActivos = [
  {
    id: 1,
    codigoPatrimonial: 'PC-001',
    nombre: 'Computadora Dell OptiPlex 7090',
    descripcion: 'PC de escritorio para oficina',
    marca: 'Dell',
    modelo: 'OptiPlex 7090',
    serie: 'DL7090-001',
    ubicacion: 'Oficina Principal',
    estado: 'Activo',
    responsable: 'Juan Pérez',
    fechaIngreso: '2024-01-15',
    categoria: 'Computadoras'
  },
  {
    id: 2,
    codigoPatrimonial: 'IMP-002',
    nombre: 'Impresora HP LaserJet Pro',
    descripcion: 'Impresora láser para oficina',
    marca: 'HP',
    modelo: 'LaserJet Pro M404dn',
    serie: 'HP404-002',
    ubicacion: 'Sala de Impresión',
    estado: 'Activo',
    responsable: 'María García',
    fechaIngreso: '2024-02-10',
    categoria: 'Impresoras'
  },
  {
    id: 3,
    codigoPatrimonial: 'SW-003',
    nombre: 'Switch Cisco Catalyst 2960',
    descripcion: 'Switch de red 24 puertos',
    marca: 'Cisco',
    modelo: 'Catalyst 2960-24TC-L',
    serie: 'CS2960-003',
    ubicacion: 'Sala de Servidores',
    estado: 'Mantenimiento',
    responsable: 'Carlos López',
    fechaIngreso: '2024-01-20',
    categoria: 'Redes'
  },
  {
    id: 4,
    codigoPatrimonial: 'MON-004',
    nombre: 'Monitor Samsung 24"',
    descripcion: 'Monitor LED 24 pulgadas',
    marca: 'Samsung',
    modelo: 'S24F350FH',
    serie: 'SM24-004',
    ubicacion: 'Laboratorio de Computación',
    estado: 'Activo',
    responsable: 'Ana Martínez',
    fechaIngreso: '2024-03-05',
    categoria: 'Monitores'
  }
];

export const mockConsumibles = [
  {
    id: 1,
    nombre: 'Toner HP 85A Negro',
    descripcion: 'Cartucho de tóner negro para impresoras HP',
    marca: 'HP',
    modelo: '85A',
    stockActual: 5,
    stockMinimo: 3,
    ubicacion: 'Almacén Principal',
    estado: 'Disponible',
    categoria: 'Toner',
    fechaIngreso: '2024-03-15'
  },
  {
    id: 2,
    nombre: 'Cable Ethernet Cat6',
    descripcion: 'Cable de red Ethernet categoría 6',
    marca: 'Generic',
    modelo: 'Cat6-3m',
    stockActual: 25,
    stockMinimo: 10,
    ubicacion: 'Almacén de Redes',
    estado: 'Disponible',
    categoria: 'Cables',
    fechaIngreso: '2024-02-20'
  },
  {
    id: 3,
    nombre: 'Mouse Óptico USB',
    descripcion: 'Mouse óptico con conexión USB',
    marca: 'Logitech',
    modelo: 'M100',
    stockActual: 1,
    stockMinimo: 5,
    ubicacion: 'Almacén Principal',
    estado: 'Stock Bajo',
    categoria: 'Periféricos',
    fechaIngreso: '2024-03-10'
  },
  {
    id: 4,
    nombre: 'Teclado USB',
    descripcion: 'Teclado estándar con conexión USB',
    marca: 'Microsoft',
    modelo: 'Wired Keyboard 600',
    stockActual: 8,
    stockMinimo: 5,
    ubicacion: 'Almacén Principal',
    estado: 'Disponible',
    categoria: 'Periféricos',
    fechaIngreso: '2024-03-01'
  }
];

export const mockUbicaciones = [
  { id: 1, nombre: 'Oficina Principal', descripcion: 'Oficina administrativa principal' },
  { id: 2, nombre: 'Sala de Impresión', descripcion: 'Sala dedicada a impresión' },
  { id: 3, nombre: 'Sala de Servidores', descripcion: 'Sala de equipos de red y servidores' },
  { id: 4, nombre: 'Laboratorio de Computación', descripcion: 'Laboratorio de cómputo' },
  { id: 5, nombre: 'Almacén Principal', descripcion: 'Almacén general' },
  { id: 6, nombre: 'Almacén de Redes', descripcion: 'Almacén especializado en equipos de red' }
];

export const mockEstados = [
  { id: 1, nombre: 'Activo', descripcion: 'Equipo funcionando correctamente' },
  { id: 2, nombre: 'Inactivo', descripcion: 'Equipo fuera de servicio' },
  { id: 3, nombre: 'Mantenimiento', descripcion: 'Equipo en proceso de mantenimiento' },
  { id: 4, nombre: 'Disponible', descripcion: 'Consumible disponible para uso' },
  { id: 5, nombre: 'Stock Bajo', descripcion: 'Consumible con stock bajo' },
  { id: 6, nombre: 'Agotado', descripcion: 'Consumible sin stock' }
];

export const mockCategorias = [
  { id: 1, nombre: 'Computadoras', descripcion: 'Equipos de cómputo' },
  { id: 2, nombre: 'Impresoras', descripcion: 'Equipos de impresión' },
  { id: 3, nombre: 'Redes', descripcion: 'Equipos de red' },
  { id: 4, nombre: 'Monitores', descripcion: 'Pantallas y monitores' },
  { id: 5, nombre: 'Toner', descripcion: 'Cartuchos de tóner' },
  { id: 6, nombre: 'Cables', descripcion: 'Cables y conectores' },
  { id: 7, nombre: 'Periféricos', descripcion: 'Mouse, teclados y accesorios' }
];
