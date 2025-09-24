// Mock data para reportes de configuración/auditoría
export const mockAuditLogs = [
  {
    id: 1,
    fecha: '2024-01-15T14:30:00Z',
    usuario: 'admin@empresa.com',
    nombreUsuario: 'Administrador Sistema',
    accion: 'MODIFICAR_ROL',
    entidad: 'ROL',
    entidadId: 3,
    entidadNombre: 'Técnico',
    cambios: {
      anterior: {
        permisos: ['Ver casos', 'Crear casos']
      },
      nuevo: {
        permisos: ['Ver casos', 'Crear casos', 'Ver inventario']
      }
    },
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se agregó permiso de visualización de inventario al rol Técnico'
  },
  {
    id: 2,
    fecha: '2024-01-15T10:15:00Z',
    usuario: 'juan.perez@empresa.com',
    nombreUsuario: 'Juan Pérez',
    accion: 'CREAR_USUARIO',
    entidad: 'USUARIO',
    entidadId: 25,
    entidadNombre: 'maria.garcia@empresa.com',
    cambios: {
      anterior: null,
      nuevo: {
        nombre: 'María García',
        email: 'maria.garcia@empresa.com',
        rol: 'Usuario',
        estado: 'Activo'
      }
    },
    ip: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    detalles: 'Se creó nuevo usuario con rol Usuario'
  },
  {
    id: 3,
    fecha: '2024-01-14T16:45:00Z',
    usuario: 'admin@empresa.com',
    nombreUsuario: 'Administrador Sistema',
    accion: 'MODIFICAR_CONFIGURACION',
    entidad: 'SISTEMA',
    entidadId: 1,
    entidadNombre: 'Configuración General',
    cambios: {
      anterior: {
        tiempoResolucionMaximo: 72,
        notificacionesEmail: true
      },
      nuevo: {
        tiempoResolucionMaximo: 48,
        notificacionesEmail: true
      }
    },
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se redujo el tiempo máximo de resolución de casos de 72 a 48 horas'
  },
  {
    id: 4,
    fecha: '2024-01-14T09:20:00Z',
    usuario: 'carlos.martinez@empresa.com',
    nombreUsuario: 'Carlos Martínez',
    accion: 'ELIMINAR_USUARIO',
    entidad: 'USUARIO',
    entidadId: 18,
    entidadNombre: 'usuario.inactivo@empresa.com',
    cambios: {
      anterior: {
        nombre: 'Usuario Inactivo',
        email: 'usuario.inactivo@empresa.com',
        estado: 'Inactivo'
      },
      nuevo: null
    },
    ip: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    detalles: 'Se eliminó usuario inactivo del sistema'
  },
  {
    id: 5,
    fecha: '2024-01-13T11:30:00Z',
    usuario: 'admin@empresa.com',
    nombreUsuario: 'Administrador Sistema',
    accion: 'CREAR_AREA_TECNICA',
    entidad: 'AREA_TECNICA',
    entidadId: 7,
    entidadNombre: 'Soporte Móvil',
    cambios: {
      anterior: null,
      nuevo: {
        nombre: 'Soporte Móvil',
        descripcion: 'Área especializada en dispositivos móviles',
        categoria: 'Hardware',
        estado: 'Activo'
      }
    },
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se creó nueva área técnica para soporte de dispositivos móviles'
  },
  {
    id: 6,
    fecha: '2024-01-12T15:45:00Z',
    usuario: 'ana.lopez@empresa.com',
    nombreUsuario: 'Ana López',
    accion: 'MODIFICAR_USUARIO',
    entidad: 'USUARIO',
    entidadId: 12,
    entidadNombre: 'pedro.silva@empresa.com',
    cambios: {
      anterior: {
        rol: 'Usuario',
        estado: 'Activo'
      },
      nuevo: {
        rol: 'Técnico',
        estado: 'Activo'
      }
    },
    ip: '192.168.1.120',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    detalles: 'Se cambió el rol del usuario de Usuario a Técnico'
  },
  {
    id: 7,
    fecha: '2024-01-11T08:15:00Z',
    usuario: 'admin@empresa.com',
    nombreUsuario: 'Administrador Sistema',
    accion: 'MODIFICAR_CATALOGO',
    entidad: 'PRIORIDAD',
    entidadId: 2,
    entidadNombre: 'Media',
    cambios: {
      anterior: {
        tiempoRespuestaDias: 3,
        tiempoResolucionDias: 5
      },
      nuevo: {
        tiempoRespuestaDias: 2,
        tiempoResolucionDias: 4
      }
    },
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se redujeron los tiempos de respuesta y resolución para prioridad Media'
  },
  {
    id: 8,
    fecha: '2024-01-10T13:20:00Z',
    usuario: 'luis.rodriguez@empresa.com',
    nombreUsuario: 'Luis Rodríguez',
    accion: 'CREAR_CATEGORIA',
    entidad: 'CATEGORIA',
    entidadId: 8,
    entidadNombre: 'Software Especializado',
    cambios: {
      anterior: null,
      nuevo: {
        nombre: 'Software Especializado',
        descripcion: 'Categoría para software de aplicaciones especializadas'
      }
    },
    ip: '192.168.1.115',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    detalles: 'Se creó nueva categoría para software especializado'
  },
  {
    id: 9,
    fecha: '2024-01-09T14:30:00Z',
    usuario: 'admin@empresa.com',
    nombreUsuario: 'Administrador Sistema',
    accion: 'MODIFICAR_MENU',
    entidad: 'MENU',
    entidadId: 4,
    entidadNombre: 'Reportes',
    cambios: {
      anterior: {
        submenus: ['Dashboard Principal', 'Reportes de Casos', 'Encuestas de Calidad']
      },
      nuevo: {
        submenus: ['Dashboard Principal', 'Reportes de Casos', 'Encuestas de Calidad', 'Reportes de Configuración']
      }
    },
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se agregó nuevo submenú "Reportes de Configuración" al menú Reportes'
  },
  {
    id: 10,
    fecha: '2024-01-08T11:45:00Z',
    usuario: 'maria.garcia@empresa.com',
    nombreUsuario: 'María García',
    accion: 'MODIFICAR_PERMISOS',
    entidad: 'PERMISOS',
    entidadId: 15,
    entidadNombre: 'Rol Usuario',
    cambios: {
      anterior: {
        permisos: ['Ver casos propios']
      },
      nuevo: {
        permisos: ['Ver casos propios', 'Crear incidencias']
      }
    },
    ip: '192.168.1.125',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    detalles: 'Se agregó permiso para crear incidencias al rol Usuario'
  }
];

export const mockUsuarios = [
  { id: 1, nombre: 'Administrador Sistema', email: 'admin@empresa.com', rol: 'Administrador' },
  { id: 2, nombre: 'Juan Pérez', email: 'juan.perez@empresa.com', rol: 'Supervisor' },
  { id: 3, nombre: 'Carlos Martínez', email: 'carlos.martinez@empresa.com', rol: 'Administrador' },
  { id: 4, nombre: 'Ana López', email: 'ana.lopez@empresa.com', rol: 'Supervisor' },
  { id: 5, nombre: 'Luis Rodríguez', email: 'luis.rodriguez@empresa.com', rol: 'Técnico' },
  { id: 6, nombre: 'María García', email: 'maria.garcia@empresa.com', rol: 'Usuario' }
];

export const mockAcciones = [
  'CREAR_USUARIO',
  'MODIFICAR_USUARIO', 
  'ELIMINAR_USUARIO',
  'CREAR_ROL',
  'MODIFICAR_ROL',
  'ELIMINAR_ROL',
  'CREAR_AREA_TECNICA',
  'MODIFICAR_AREA_TECNICA',
  'ELIMINAR_AREA_TECNICA',
  'CREAR_CATEGORIA',
  'MODIFICAR_CATEGORIA',
  'ELIMINAR_CATEGORIA',
  'MODIFICAR_CONFIGURACION',
  'CREAR_PRIORIDAD',
  'MODIFICAR_PRIORIDAD',
  'ELIMINAR_PRIORIDAD',
  'MODIFICAR_MENU',
  'MODIFICAR_PERMISOS'
];

export const mockEntidades = [
  'USUARIO',
  'ROL', 
  'AREA_TECNICA',
  'CATEGORIA',
  'PRIORIDAD',
  'TIPO_CASO',
  'SISTEMA',
  'MENU',
  'SUBMENU',
  'PERMISOS'
];
