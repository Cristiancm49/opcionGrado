import React, { useState } from 'react';
import { 
  BarChart3, 
  History, 
  Activity, 
  Shield, 
  Clock, 
  User, 
  Database,
  RefreshCw,
  Download,
  Filter,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Calendar
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import useAppStore from '../../store/useAppStore';
import ConfigAuditFilters from './components/ConfigAuditFilters';
import ConfigAuditItem from './components/ConfigAuditItem';
import { useConfigAuditReport } from './hooks/useConfigAuditReport';

const ReportesConfiguracion = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const [tabActivo, setTabActivo] = useState('auditoria');
  
  const {
    auditLogs,
    auditLogsOriginales,
    loading,
    error,
    filtros,
    estadisticas,
    usuarios,
    acciones,
    entidades,
    actualizarFiltros,
    limpiarFiltros
  } = useConfigAuditReport();

  const tabs = [
    { id: 'auditoria', label: 'Historial de Cambios', icon: History },
    { id: 'graficas', label: 'Gráficas', icon: BarChart3 },
    { id: 'estadisticas', label: 'Estadísticas', icon: Activity },
    { id: 'exportar', label: 'Exportar', icon: Download }
  ];

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener las acciones más comunes para gráficas
  const accionesMasComunes = Object.entries(estadisticas.accionesMasComunes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const entidadesMasModificadas = Object.entries(estadisticas.entidadesMasModificadas)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const usuariosMasActivos = Object.entries(estadisticas.cambiosPorUsuario)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes de Configuración</h1>
          <p className="text-gray-600">Análisis y auditoría de cambios en la configuración del sistema</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            icon={RefreshCw}
            onClick={() => window.location.reload()}
          >
            Actualizar
          </Button>
          <Button
            variant="outline"
            icon={Download}
            onClick={() => console.log('Exportar reporte completo')}
          >
            Exportar Todo
          </Button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card.Stat
          title="Total Cambios"
          value={estadisticas.totalCambios}
          icon={Activity}
          color="blue"
          subtitle="Registros de auditoría"
        />

        <Card.Stat
          title="Cambios Hoy"
          value={estadisticas.cambiosHoy}
          icon={Clock}
          color="green"
          subtitle={formatFecha(new Date())}
        />

        <Card.Stat
          title="Esta Semana"
          value={estadisticas.cambiosEstaSemana}
          icon={TrendingUp}
          color="yellow"
          subtitle="Últimos 7 días"
        />

        <Card.Stat
          title="Usuarios Activos"
          value={estadisticas.usuariosActivos}
          icon={User}
          color="purple"
          subtitle="Con actividad reciente"
        />
      </div>

      {/* Tabs */}
      <Card>
        <Card.Header>
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={tabActivo === tab.id ? "primary" : "ghost"}
                  icon={Icon}
                  onClick={() => setTabActivo(tab.id)}
                  className="flex-1"
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </Card.Header>
        
        <Card.Content>
          {/* Tab Auditoría */}
          {tabActivo === 'auditoria' && (
            <div className="space-y-6">
              {/* Filtros */}
              <ConfigAuditFilters
                filtros={filtros}
                actualizarFiltros={actualizarFiltros}
                limpiarFiltros={limpiarFiltros}
                usuarios={usuarios}
                acciones={acciones}
                entidades={entidades}
                auditLogsFiltrados={auditLogs}
                auditLogsOriginales={auditLogsOriginales}
              />

              {/* Lista de auditoría */}
              <Card>
                <Card.Header>
                  <Card.Title>Historial de Cambios de Configuración</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Registro detallado de todas las modificaciones del sistema
                  </p>
                </Card.Header>
                
                <Card.Content>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-20 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <Card.Alert type="error" title="Error al cargar reporte">
                      <p>{error}</p>
                    </Card.Alert>
                  ) : auditLogs.length === 0 ? (
                    <div className="text-center py-12">
                      <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {auditLogsOriginales.length === 0 ? 'No hay registros de configuración' : 'No hay registros que coincidan'}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {auditLogsOriginales.length === 0 
                          ? 'Los cambios de configuración aparecerán aquí'
                          : 'Ajusta los filtros para ver más resultados'
                        }
                      </p>
                      {auditLogsOriginales.length === 0 ? (
                        <Button variant="outline" icon={RefreshCw}>
                          Actualizar
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={limpiarFiltros}>
                          Limpiar Filtros
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {auditLogs.map(log => (
                        <ConfigAuditItem key={log.id} log={log} />
                      ))}
                    </div>
                  )}
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Tab Gráficas */}
          {tabActivo === 'graficas' && (
            <div className="space-y-6">
              {/* Gráfica de barras - Acciones más comunes */}
              <Card>
                <Card.Header>
                  <Card.Title>Acciones Más Comunes</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Gráfica de barras mostrando los tipos de cambios más frecuentes
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {accionesMasComunes.map(([accion, cantidad], index) => {
                      const maxCantidad = Math.max(...accionesMasComunes.map(([,cant]) => cant));
                      const porcentaje = (cantidad / maxCantidad) * 100;
                      const colores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                      return (
                        <div key={accion} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {accion.replace(/_/g, ' ')}
                            </span>
                            <span className="text-sm text-gray-600">{cantidad}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-6">
                            <div 
                              className={`${colores[index % colores.length]} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out`}
                              style={{ width: `${porcentaje}%` }}
                            >
                              <span className="text-white text-xs font-medium">{cantidad}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Content>
              </Card>

              {/* Gráfica circular simulada - Entidades */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <Card.Header>
                    <Card.Title>Distribución por Entidad</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Elementos del sistema más modificados
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {entidadesMasModificadas.map(([entidad, cantidad], index) => {
                        const porcentaje = Math.round((cantidad / estadisticas.totalCambios) * 100);
                        const colores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                        return (
                          <div key={entidad} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${colores[index % colores.length]}`}></div>
                              <span className="text-sm font-medium text-gray-700">{entidad}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${colores[index % colores.length]} h-2 rounded-full transition-all duration-1000 ease-out`}
                                  style={{ width: `${porcentaje}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {cantidad} ({porcentaje}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Actividad por Usuario</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Usuarios con más cambios realizados
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {usuariosMasActivos.map(([usuario, cantidad], index) => {
                        const porcentaje = Math.round((cantidad / estadisticas.totalCambios) * 100);
                        const colores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                        return (
                          <div key={usuario} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${colores[index % colores.length]}`}></div>
                              <span className="text-sm font-medium text-gray-700">{usuario}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${colores[index % colores.length]} h-2 rounded-full transition-all duration-1000 ease-out`}
                                  style={{ width: `${porcentaje}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {cantidad} ({porcentaje}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Gráfica de líneas simulada - Tendencias temporales */}
              <Card>
                <Card.Header>
                  <Card.Title>Tendencias Temporales</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evolución de cambios en el tiempo (simulado)
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[5, 8, 3, 12, 7, 9, 6, 4, 11, 8].map((altura, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t w-8 transition-all duration-1000 ease-out"
                          style={{ height: `${(altura / 12) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-500">{altura}</span>
                        <span className="text-xs text-gray-400">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Últimos 10 días de actividad</span>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Tab Estadísticas */}
          {tabActivo === 'estadisticas' && (
            <div className="space-y-6">
              {/* Estadísticas principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card.Stat
                  title="Cambios Este Mes"
                  value={estadisticas.cambiosEsteMes}
                  icon={Calendar}
                  color="blue"
                  subtitle="Últimos 30 días"
                />
                <Card.Stat
                  title="Promedio Diario"
                  value={Math.round(estadisticas.cambiosEsteMes / 30)}
                  icon={TrendingUp}
                  color="green"
                  subtitle="Cambios por día"
                />
                <Card.Stat
                  title="Tipos de Acciones"
                  value={Object.keys(estadisticas.accionesMasComunes).length}
                  icon={Settings}
                  color="purple"
                  subtitle="Diferentes acciones"
                />
                <Card.Stat
                  title="Entidades Únicas"
                  value={Object.keys(estadisticas.entidadesMasModificadas).length}
                  icon={Database}
                  color="orange"
                  subtitle="Elementos modificados"
                />
              </div>

              {/* Resumen detallado */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <Card.Header>
                    <Card.Title>Actividad por Usuario</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Cambios realizados por cada usuario
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {usuariosMasActivos.map(([usuario, cantidad]) => {
                        const porcentaje = Math.round((cantidad / estadisticas.totalCambios) * 100);
                        return (
                          <div key={usuario} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{usuario}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${porcentaje}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {cantidad} ({porcentaje}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Distribución por Entidad</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Elementos del sistema más modificados
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {entidadesMasModificadas.map(([entidad, cantidad]) => {
                        const porcentaje = Math.round((cantidad / estadisticas.totalCambios) * 100);
                        return (
                          <div key={entidad} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Database className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{entidad}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${porcentaje}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {cantidad} ({porcentaje}%)
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Resumen general */}
              <Card>
                <Card.Header>
                  <Card.Title>Resumen de Actividad</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Estadísticas generales del sistema
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{estadisticas.totalCambios}</div>
                      <div className="text-sm text-blue-700">Total Cambios</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{estadisticas.usuariosActivos}</div>
                      <div className="text-sm text-green-700">Usuarios Activos</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{Object.keys(estadisticas.entidadesMasModificadas).length}</div>
                      <div className="text-sm text-yellow-700">Entidades</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{Object.keys(estadisticas.accionesMasComunes).length}</div>
                      <div className="text-sm text-purple-700">Tipos de Acción</div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Tab Exportar */}
          {tabActivo === 'exportar' && (
            <div className="text-center py-12">
              <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Exportar Reportes</h3>
              <p className="text-gray-500 mb-4">Exporta los datos de configuración en diferentes formatos</p>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" icon={Download}>
                  Exportar PDF
                </Button>
                <Button variant="outline" icon={Download}>
                  Exportar Excel
                </Button>
                <Button variant="outline" icon={Download}>
                  Exportar CSV
                </Button>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ReportesConfiguracion;
