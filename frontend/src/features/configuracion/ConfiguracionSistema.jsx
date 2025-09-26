// src/features/configuracion/pages/ConfiguracionSistema.jsx

import { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { 
  Users, 
  Shield, 
  Database, 
  Settings, 
  List, 
  AlertTriangle,
  Activity,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Layers,
  Tag,
  Filter,
  Star
} from 'lucide-react';
import { Card, Button } from '../../styles/components';
import { cn } from '../../styles/utils';
import { textStyles, THEME_CONSTANTS } from '../../styles/theme';

const ConfiguracionSistema = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [seccionActiva, setSeccionActiva] = useState('dashboard');


  const estadisticas = {
    usuarios: {
      total: 45,
      activos: 38,
      inactivos: 7,
      nuevosEsteMes: 5
    },
    roles: {
      total: 8,
      conUsuarios: 6,
      sinUsuarios: 2,
      permisosTotales: 234
    },
    catalogos: {
      totalTablas: 12,
      totalRegistros: 348,
      ultimaActualizacion: '2025-01-20'
    }
  };

  // Configuración de secciones principales
  const secciones = [
    {
      id: 'usuarios',
      nombre: 'Gestión de Usuarios',
      descripcion: 'Administrar usuarios del sistema',
      icono: Users,
      color: 'blue',
      estadisticas: [
        { label: 'Total Usuarios', valor: estadisticas.usuarios.total, icono: Users },
        { label: 'Usuarios Activos', valor: estadisticas.usuarios.activos, icono: CheckCircle, color: 'green' },
        { label: 'Usuarios Inactivos', valor: estadisticas.usuarios.inactivos, icono: XCircle, color: 'red' },
        { label: 'Nuevos este mes', valor: estadisticas.usuarios.nuevosEsteMes, icono: TrendingUp, color: 'blue' }
      ],
      acciones: ['Ver Usuarios', 'Crear Usuario', 'Importar Usuarios']
    },
    {
      id: 'roles',
      nombre: 'Gestión de Roles',
      descripcion: 'Configurar roles y permisos',
      icono: Shield,
      color: 'purple',
      estadisticas: [
        { label: 'Total Roles', valor: estadisticas.roles.total, icono: Shield },
        { label: 'Roles Activos', valor: estadisticas.roles.conUsuarios, icono: Activity, color: 'green' },
        { label: 'Sin Usuarios', valor: estadisticas.roles.sinUsuarios, icono: AlertTriangle, color: 'orange' },
        { label: 'Total Permisos', valor: estadisticas.roles.permisosTotales, icono: Settings, color: 'purple' }
      ],
      acciones: ['Ver Roles', 'Crear Rol', 'Matriz Permisos']
    },
    {
      id: 'catalogos',
      nombre: 'Catálogos del Sistema',
      descripcion: 'Estados, tipos, categorías y más',
      icono: Database,
      color: 'green',
      estadisticas: [
        { label: 'Tablas de Catálogo', valor: estadisticas.catalogos.totalTablas, icono: Database },
        { label: 'Total Registros', valor: estadisticas.catalogos.totalRegistros, icono: List, color: 'blue' },
        { label: 'Última Actualización', valor: estadisticas.catalogos.ultimaActualizacion, icono: Calendar, color: 'gray', esTexto: true }
      ],
      acciones: ['Ver Catálogos', 'Sincronizar', 'Importar Datos']
    }
  ];

  // Catálogos específicos con detalles
  const catalogosDetalle = [
    { 
      nombre: 'Estados de Caso', 
      tabla: 'ESTADO_CASO', 
      registros: 8, 
      icono: Activity, 
      color: 'blue',
      descripcion: 'Estados del flujo de casos'
    },
    { 
      nombre: 'Prioridades', 
      tabla: 'PRIORIDAD', 
      registros: 5, 
      icono: Star, 
      color: 'orange',
      descripcion: 'Niveles de prioridad'
    },
    { 
      nombre: 'Tipos de Caso', 
      tabla: 'TIPO_CASO', 
      registros: 12, 
      icono: FileText, 
      color: 'green',
      descripcion: 'Clasificación de casos'
    },
    { 
      nombre: 'Áreas Técnicas', 
      tabla: 'AREA_TECNICA', 
      registros: 6, 
      icono: Settings, 
      color: 'purple',
      descripcion: 'Áreas de especialización'
    },
    { 
      nombre: 'Tipos de Trabajo', 
      tabla: 'TIPOTRABAJO', 
      registros: 15, 
      icono: Layers, 
      color: 'indigo',
      descripcion: 'Clasificación de trabajos'
    },
    { 
      nombre: 'Categorías', 
      tabla: 'CATEGORIA', 
      registros: 8, 
      icono: Tag, 
      color: 'pink',
      descripción: 'Categorías generales'
    }
  ];

  const actividades = [
    {
      id: 1,
      accion: 'Usuario creado',
      detalles: 'Se creó el usuario "Ana García"',
      usuario: 'Admin Sistema',
      fecha: '2025-01-20 14:30',
      tipo: 'success'
    },
    {
      id: 2,
      accion: 'Rol modificado',
      detalles: 'Se actualizaron permisos del rol "Técnico"',
      usuario: 'Diego Quesada',
      fecha: '2025-01-20 11:15',
      tipo: 'info'
    },
    {
      id: 3,
      accion: 'Catálogo sincronizado',
      detalles: 'Se sincronizaron estados de caso',
      usuario: 'Sistema',
      fecha: '2025-01-20 08:00',
      tipo: 'success'
    },
    {
      id: 4,
      accion: 'Usuario desactivado',
      detalles: 'Usuario "Carlos López" marcado como inactivo',
      usuario: 'Admin Sistema',
      fecha: '2025-01-19 16:45',
      tipo: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
      red: 'from-red-500 to-red-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colors[color] || colors.blue;
  };

  const getTipoActividadColor = (tipo) => {
    const tipos = {
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      warning: 'bg-orange-100 text-orange-800 border-orange-200',
      error: 'bg-red-100 text-red-800 border-red-200'
    };
    return tipos[tipo] || tipos.info;
  };

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn(textStyles.h1, 'mb-2')}>
              Configuración del Sistema
            </h1>
            <p className={textStyles.body2}>
              Administre usuarios, roles, permisos y catálogos del sistema
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon={<Settings className="w-4 h-4" />}>
              Configuración
            </Button>
            <Button variant="primary" icon={<Activity className="w-4 h-4" />}>
              Sincronizar Todo
            </Button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(textStyles.caption, 'mb-1')}>
                Total Usuarios
              </p>
              <p className="text-3xl font-bold text-primary-600">
                {estadisticas.usuarios.total}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={cn('mt-2', textStyles.caption)}>
            <span className="text-green-600">+{estadisticas.usuarios.nuevosEsteMes}</span> este mes
          </div>
        </div>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(textStyles.caption, 'mb-1')}>
                Total Roles
              </p>
              <p className="text-3xl font-bold text-primary-600">
                {estadisticas.roles.total}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={cn('mt-2', textStyles.caption)}>
            {estadisticas.roles.conUsuarios} con usuarios asignados
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(textStyles.caption, 'mb-1')}>
                Catálogos
              </p>
              <p className="text-3xl font-bold text-primary-600">
                {estadisticas.catalogos.totalTablas}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={cn('mt-2', textStyles.caption)}>
            {estadisticas.catalogos.totalRegistros} registros totales
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={cn(textStyles.caption, 'mb-1')}>
                Permisos
              </p>
              <p className="text-3xl font-bold text-primary-600">
                {estadisticas.roles.permisosTotales}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={cn('mt-2', textStyles.caption)}>
            En {estadisticas.roles.total} roles
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Panel Izquierdo - Secciones Principales */}
        <div className="xl:col-span-2 space-y-6">
          {/* Secciones Principales */}
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Settings className="w-5 h-5" />
                <span>Módulos de Configuración</span>
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {secciones.map((seccion) => {
                  const IconoSeccion = seccion.icono;
                  return (
                    <div key={seccion.id} className={`p-6 border rounded-xl transition-all duration-200 hover:shadow-md border-gray-200 hover:border-gray-300`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 bg-gradient-to-r ${getColorClasses(seccion.color)} rounded-lg`}>
                            <IconoSeccion className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className={`text-lg font-semibold ${themeClasses.primaryText}`}>
                              {seccion.nombre}
                            </h4>
                            <p className={`text-sm ${themeClasses.secondaryText}`}>
                              {seccion.descripcion}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {seccion.acciones.map((accion, index) => (
                            <button 
                              key={index}
                              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                index === 0 
                                  ? `bg-gradient-to-r ${getColorClasses(seccion.color)} text-white`
                                  : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                              }`}
                            >
                              {accion}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Estadísticas de la sección */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {seccion.estadisticas.map((stat, index) => {
                          const IconoStat = stat.icono;
                          return (
                            <div key={index} className={`p-3 rounded-lg bg-gray-50`}>
                              <div className="flex items-center space-x-2 mb-1">
                                <IconoStat className={`w-4 h-4 ${stat.color ? `text-${stat.color}-500` : themeClasses.secondaryText}`} />
                                <span className={`text-xs font-medium ${themeClasses.secondaryText}`}>
                                  {stat.label}
                                </span>
                              </div>
                              <p className={`text-lg font-bold ${themeClasses.primaryText}`}>
                                {stat.esTexto ? stat.valor : stat.valor.toLocaleString()}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detalle de Catálogos */}
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Database className="w-5 h-5" />
                <span>Catálogos Detallados</span>
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catalogosDetalle.map((catalogo) => {
                  const IconoCatalogo = catalogo.icono;
                  return (
                    <div key={catalogo.tabla} className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer border-gray-200 hover:border-gray-300`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 bg-gradient-to-r ${getColorClasses(catalogo.color)} rounded-lg`}>
                          <IconoCatalogo className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-lg font-bold ${themeClasses.primaryText}`}>
                          {catalogo.registros}
                        </span>
                      </div>
                      <h4 className={`font-semibold ${themeClasses.primaryText} mb-1`}>
                        {catalogo.nombre}
                      </h4>
                      <p className={`text-xs ${themeClasses.secondaryText} mb-2`}>
                        {catalogo.descripcion}
                      </p>
                      <div className={`text-xs ${themeClasses.secondaryText} bg-opacity-50 px-2 py-1 rounded bg-gray-100`}>
                        {catalogo.tabla}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Actividad Reciente */}
        <div className="space-y-6">
          {/* Actividad Reciente */}
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Clock className="w-5 h-5" />
                <span>Actividad Reciente</span>
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {actividades.map((actividad) => (
                  <div key={actividad.id} className="flex items-start space-x-3">
                    <div className={`px-2 py-1 text-xs rounded-full border ${getTipoActividadColor(actividad.tipo)}`}>
                      {actividad.tipo === 'success' && <CheckCircle className="w-3 h-3" />}
                      {actividad.tipo === 'info' && <Activity className="w-3 h-3" />}
                      {actividad.tipo === 'warning' && <AlertTriangle className="w-3 h-3" />}
                      {actividad.tipo === 'error' && <XCircle className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${themeClasses.primaryText}`}>
                        {actividad.accion}
                      </p>
                      <p className={`text-xs ${themeClasses.secondaryText} mt-1`}>
                        {actividad.detalles}
                      </p>
                      <div className={`flex items-center space-x-2 mt-2 text-xs ${themeClasses.secondaryText}`}>
                        <span>{actividad.usuario}</span>
                        <span>•</span>
                        <span>{actividad.fecha}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="w-full text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver toda la actividad →
                </button>
              </div>
            </div>
          </div>

          {/* Estado del Sistema */}
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Activity className="w-5 h-5" />
                <span>Estado del Sistema</span>
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>Base de Datos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Activa</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>API Externa</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Conectada</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>Sincronización</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600 font-medium">En Proceso</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>Última Copia</span>
                <span className={`text-sm ${themeClasses.primaryText} font-medium`}>Hoy 06:00</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium">
                  Verificar Sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSistema;