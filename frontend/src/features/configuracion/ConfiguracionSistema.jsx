// src/features/configuracion/ConfiguracionSistema.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import useConfiguracion from './hooks/useConfiguracion';
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
  Star,
  RefreshCw,
  Loader2
} from 'lucide-react';

const ConfiguracionSistema = () => {
  const navigate = useNavigate();
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  // Hook para datos reales de la API
  const { loading, error, estadisticas, catalogos, refrescar } = useConfiguracion();

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
      acciones: [
        { label: 'Ver Usuarios', ruta: '/admin/gestion-usuarios', primary: true },
        { label: 'Crear Usuario', ruta: '/admin/gestion-usuarios?crear=true', primary: false }
      ]
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
        { label: 'Sin Usuarios', valor: estadisticas.roles.sinUsuarios, icono: AlertTriangle, color: 'orange' }
      ],
      acciones: [
        { label: 'Ver Roles', ruta: '/admin/gestion-roles', primary: true },
        { label: 'Crear Rol', ruta: '/admin/gestion-roles?crear=true', primary: false }
      ]
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
      acciones: [
        { label: 'Ver Catálogos', ruta: '/admin/gestion-catalogos', primary: true }
      ]
    }
  ];

  // Iconos para catálogos
  const catalogoIconos = {
    'estadosGenerales': Activity,
    'estadosCaso': Activity,
    'estadosActivo': CheckCircle,
    'estadosConsumible': Tag,
    'estadosIntervencion': Settings,
    'areasTecnicas': Settings,
    'canalesIngreso': FileText,
    'prioridades': Star,
    'tiposCaso': FileText,
    'tiposTrabajo': Layers,
    'categoriasActivo': Tag,
    'tiposConsumible': Tag,
  };

  const catalogoColores = {
    'estadosGenerales': 'blue',
    'estadosCaso': 'blue',
    'estadosActivo': 'green',
    'estadosConsumible': 'orange',
    'estadosIntervencion': 'purple',
    'areasTecnicas': 'purple',
    'canalesIngreso': 'indigo',
    'prioridades': 'orange',
    'tiposCaso': 'green',
    'tiposTrabajo': 'indigo',
    'categoriasActivo': 'pink',
    'tiposConsumible': 'pink',
  };

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

  const handleNavegar = (ruta) => {
    navigate(ruta);
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className={`${themeClasses.secondaryText}`}>Cargando configuración...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 font-medium mb-2">Error al cargar los datos</p>
          <p className={`${themeClasses.secondaryText} mb-4`}>{error}</p>
          <button 
            onClick={refrescar}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
              Configuración del Sistema
            </h1>
            <p className={`${themeClasses.secondaryText}`}>
              Administre usuarios, roles, permisos y catálogos del sistema
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={refrescar}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`${themeClasses.sidebarBg} rounded-xl p-6 shadow-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                Total Usuarios
              </p>
              <p className={`text-3xl font-bold ${themeClasses.primaryText}`}>
                {estadisticas.usuarios.total}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={`mt-2 text-sm ${themeClasses.secondaryText}`}>
            <span className="text-green-600">+{estadisticas.usuarios.nuevosEsteMes}</span> este mes
          </div>
        </div>

        <div className={`${themeClasses.sidebarBg} rounded-xl p-6 shadow-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                Total Roles
              </p>
              <p className={`text-3xl font-bold ${themeClasses.primaryText}`}>
                {estadisticas.roles.total}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={`mt-2 text-sm ${themeClasses.secondaryText}`}>
            {estadisticas.roles.conUsuarios} con usuarios asignados
          </div>
        </div>

        <div className={`${themeClasses.sidebarBg} rounded-xl p-6 shadow-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                Catálogos
              </p>
              <p className={`text-3xl font-bold ${themeClasses.primaryText}`}>
                {estadisticas.catalogos.totalTablas}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={`mt-2 text-sm ${themeClasses.secondaryText}`}>
            {estadisticas.catalogos.totalRegistros} registros totales
          </div>
        </div>

        <div className={`${themeClasses.sidebarBg} rounded-xl p-6 shadow-lg border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.secondaryText}`}>
                Estado API
              </p>
              <p className={`text-3xl font-bold text-green-600`}>
                Activa
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className={`mt-2 text-sm ${themeClasses.secondaryText}`}>
            Conectado a localhost:5181
          </div>
        </div>
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
                              onClick={() => handleNavegar(accion.ruta)}
                              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                accion.primary 
                                  ? `bg-gradient-to-r ${getColorClasses(seccion.color)} text-white`
                                  : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                              }`}
                            >
                              {accion.label}
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
                                {stat.esTexto ? stat.valor : (stat.valor ?? 0).toLocaleString()}
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
                <span>Catálogos Detallados ({catalogos.length})</span>
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catalogos.map((catalogo) => {
                  const IconoCatalogo = catalogoIconos[catalogo.tipo] || Database;
                  const color = catalogoColores[catalogo.tipo] || 'blue';
                  return (
                    <div 
                      key={catalogo.tipo} 
                      onClick={() => handleNavegar(`/admin/catalogo/${catalogo.tipo}`)}
                      className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer border-gray-200 hover:border-gray-300`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 bg-gradient-to-r ${getColorClasses(color)} rounded-lg`}>
                          <IconoCatalogo className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-lg font-bold ${themeClasses.primaryText}`}>
                          {catalogo.datos.length}
                        </span>
                      </div>
                      <h4 className={`font-semibold ${themeClasses.primaryText}`}>
                        {catalogo.nombre}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Estado del Sistema */}
        <div className="space-y-6">
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
                <span className={`text-sm ${themeClasses.secondaryText}`}>Backend API</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Conectado</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>Base de Datos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Activa</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>URL API</span>
                <span className={`text-sm ${themeClasses.primaryText} font-mono`}>:5181</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${themeClasses.secondaryText}`}>Última Sincronización</span>
                <span className={`text-sm ${themeClasses.primaryText} font-medium`}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={refrescar}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sincronizar Datos</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumen Rápido */}
          <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                <Clock className="w-5 h-5" />
                <span>Accesos Rápidos</span>
              </h3>
            </div>
            
            <div className="p-6 space-y-3">
              <button 
                onClick={() => handleNavegar('/admin/gestion-usuarios')}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Users className="w-5 h-5 text-blue-500" />
                <span className={themeClasses.primaryText}>Gestionar Usuarios</span>
              </button>
              
              <button 
                onClick={() => handleNavegar('/admin/gestion-roles')}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Shield className="w-5 h-5 text-purple-500" />
                <span className={themeClasses.primaryText}>Gestionar Roles</span>
              </button>
              
              <button 
                onClick={() => handleNavegar('/admin/gestion-catalogos')}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center space-x-3"
              >
                <Database className="w-5 h-5 text-green-500" />
                <span className={themeClasses.primaryText}>Gestionar Catálogos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSistema;
