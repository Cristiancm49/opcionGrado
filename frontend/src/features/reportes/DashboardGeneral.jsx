import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Star,
  Calendar,
  Target,
  Activity,
  Zap,
  Award,
  FileText,
  Filter,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Bell,
  Search,
  Grid,
  List,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';
import { useDashboard } from './hooks/useDashboard';
import DashboardFilters from './components/DashboardFilters';

const DashboardGeneral = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const [vistaActiva, setVistaActiva] = useState('general');
  const [refrescar, setRefrescar] = useState(false);
  const { 
    data, 
    estadisticas, 
    loading, 
    error, 
    tecnicos, 
    areas, 
    filtros, 
    actualizarFiltros, 
    limpiarFiltros, 
    casosFiltrados, 
    encuestasFiltradas 
  } = useDashboard();

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Función para obtener color según estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Disponible': 'bg-green-100 text-green-800',
      'Ocupado': 'bg-yellow-100 text-yellow-800',
      'Ausente': 'bg-red-100 text-red-800',
      'En Reunión': 'bg-blue-100 text-blue-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className={themeClasses.loadingContainer}>
        <div className={themeClasses.centerContainer}>
          <div className={themeClasses.loadingSpinner}></div>
          <p className={themeClasses.secondaryText}>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={themeClasses.centerContainer}>
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className={`text-lg font-semibold mb-2 ${themeClasses.primaryText}`}>Error al cargar el dashboard</h3>
        <p className={themeClasses.secondaryText}>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={themeClasses.spaceY6}>
      {/* Header */}
      <div className={themeClasses.flexJustifyBetweenItems}>
        <div>
          <h1 className={`text-3xl font-bold ${themeClasses.primaryText}`}>Dashboard General</h1>
          <p className={`${themeClasses.secondaryText} mt-1`}>
            Vista general del sistema de soporte técnico
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setRefrescar(!refrescar)}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refrescar ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Filtros del Dashboard */}
      <DashboardFilters
        filtros={filtros}
        actualizarFiltros={actualizarFiltros}
        limpiarFiltros={limpiarFiltros}
        opcionesFiltros={data?.opcionesFiltros || {}}
        casosFiltrados={casosFiltrados}
        encuestasFiltradas={encuestasFiltradas}
      />

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card.Stat
          title="Total Casos"
          value={estadisticas.totalCasos}
          icon={FileText}
          color="blue"
          subtitle="Casos registrados"
          trend="+12%"
          trendUp={true}
        />
        <Card.Stat
          title="Casos Activos"
          value={estadisticas.casosPendientes}
          icon={Activity}
          color="yellow"
          subtitle="Pendientes de resolver"
          trend="+5%"
          trendUp={false}
        />
        <Card.Stat
          title="Eficiencia"
          value={`${estadisticas.eficienciaResolucion}%`}
          icon={Target}
          color="green"
          subtitle="Casos resueltos"
          trend="+3%"
          trendUp={true}
        />
        <Card.Stat
          title="Satisfacción"
          value={estadisticas.satisfaccionPromedio}
          icon={Star}
          color="purple"
          subtitle="Calificación promedio"
          trend="+0.2"
          trendUp={true}
        />
      </div>

      {/* Segunda fila de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card.Stat
          title="Tiempo Promedio"
          value={`${estadisticas.tiempoPromedioResolucion}h`}
          icon={Clock}
          color="blue"
          subtitle="Resolución de casos"
          trend="-0.5h"
          trendUp={true}
        />
        <Card.Stat
          title="Casos Hoy"
          value={estadisticas.casosNuevosHoy}
          icon={Calendar}
          color="green"
          subtitle="Nuevos casos"
          trend="+2"
          trendUp={true}
        />
        <Card.Stat
          title="Resueltos Hoy"
          value={estadisticas.casosResueltosHoy}
          icon={CheckCircle}
          color="green"
          subtitle="Casos completados"
          trend="+3"
          trendUp={true}
        />
        <Card.Stat
          title="Técnicos Activos"
          value={estadisticas.tecnicosDisponibles}
          icon={Users}
          color="purple"
          subtitle="De {estadisticas.totalTecnicos} total"
          trend="+1"
          trendUp={true}
        />
      </div>

      {/* Tabs de vista */}
      <Card>
        <Card.Header>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'general', label: 'General', icon: Grid },
              { id: 'casos', label: 'Casos', icon: FileText },
              { id: 'encuestas', label: 'Encuestas', icon: Star },
              { id: 'tendencias', label: 'Tendencias', icon: TrendingUp },
              { id: 'tecnicos', label: 'Técnicos', icon: Users },
              { id: 'rendimiento', label: 'Rendimiento', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setVistaActiva(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  vistaActiva === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </Card.Header>

        <Card.Content>
          {/* Vista Casos */}
          {vistaActiva === 'casos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card.Stat
                  title="Casos Filtrados"
                  value={casosFiltrados.length}
                  icon={FileText}
                  color="blue"
                  subtitle="Casos que cumplen los filtros"
                />
                <Card.Stat
                  title="Casos Abiertos"
                  value={casosFiltrados.filter(c => c.estado === 'Abierto' || c.estado === 'En Proceso').length}
                  icon={AlertCircle}
                  color="yellow"
                  subtitle="Pendientes de resolver"
                />
                <Card.Stat
                  title="Casos Cerrados"
                  value={casosFiltrados.filter(c => c.estado === 'Cerrado').length}
                  icon={CheckCircle}
                  color="green"
                  subtitle="Resueltos exitosamente"
                />
              </div>

              {/* Lista de casos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Lista de Casos</h3>
                {casosFiltrados.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay casos</h3>
                    <p className="text-gray-600">
                      {Object.values(filtros).some(f => f !== '') 
                        ? 'No se encontraron casos con los filtros aplicados'
                        : 'No hay casos registrados'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {casosFiltrados.map(caso => (
                      <Card key={caso.id} className="hover:shadow-md transition-shadow">
                        <Card.Content>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{caso.numeroCaso}</h4>
                              <p className="text-sm text-gray-600">{caso.titulo}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              caso.estado === 'Cerrado' ? 'bg-green-100 text-green-800' :
                              caso.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {caso.estado}
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Usuario:</span>
                              <span className="font-medium">{caso.nombreUsuario}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Técnico:</span>
                              <span className="font-medium">{caso.nombreTecnico}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Área:</span>
                              <span className="font-medium">{caso.areaTecnica}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Prioridad:</span>
                              <span className={`font-medium ${
                                caso.prioridad === 'Alta' ? 'text-red-600' :
                                caso.prioridad === 'Media' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {caso.prioridad}
                              </span>
                            </div>
                            {caso.tiempoResolucion && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tiempo Resolución:</span>
                                <span className="font-medium">{caso.tiempoResolucion}h</span>
                              </div>
                            )}
                            {caso.satisfaccion && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Satisfacción:</span>
                                <div className="flex items-center space-x-1">
                                  {renderStars(caso.satisfaccion)}
                                </div>
                              </div>
                            )}
                          </div>
                        </Card.Content>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vista Encuestas */}
          {vistaActiva === 'encuestas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card.Stat
                  title="Encuestas Filtradas"
                  value={encuestasFiltradas.length}
                  icon={Star}
                  color="purple"
                  subtitle="Encuestas que cumplen los filtros"
                />
                <Card.Stat
                  title="Satisfacción Promedio"
                  value={estadisticas.satisfaccionPromedio}
                  icon={Star}
                  color="yellow"
                  subtitle="Calificación promedio"
                />
                <Card.Stat
                  title="Tiempo Promedio"
                  value={`${estadisticas.tiempoPromedioResolucion}h`}
                  icon={Clock}
                  color="blue"
                  subtitle="Resolución de casos"
                />
              </div>

              {/* Lista de encuestas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Lista de Encuestas</h3>
                {encuestasFiltradas.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay encuestas</h3>
                    <p className="text-gray-600">
                      {Object.values(filtros).some(f => f !== '') 
                        ? 'No se encontraron encuestas con los filtros aplicados'
                        : 'No hay encuestas registradas'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {encuestasFiltradas.map(encuesta => (
                      <Card key={encuesta.id} className="hover:shadow-md transition-shadow">
                        <Card.Content>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{encuesta.casoId}</h4>
                              <p className="text-sm text-gray-600">{encuesta.nombreUsuario}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(encuesta.satisfaccionGeneral)}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Técnico:</span>
                              <span className="font-medium">{encuesta.nombreTecnico}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Área:</span>
                              <span className="font-medium">{encuesta.areaTecnica}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Satisfacción:</span>
                              <span className="font-medium">{encuesta.satisfaccionGeneral}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Promedio Respuestas:</span>
                              <span className="font-medium">{encuesta.promedioRespuestas}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tiempo Resolución:</span>
                              <span className="font-medium">{encuesta.tiempoResolucion}h</span>
                            </div>
                            {encuesta.observaciones && (
                              <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-700">
                                <strong>Observaciones:</strong> {encuesta.observaciones}
                              </div>
                            )}
                          </div>
                        </Card.Content>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vista General */}
          {vistaActiva === 'general' && (
            <div className="space-y-6">
              {/* Primera fila - Gráficos principales */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de barras - Casos por Área */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos por Área Técnica</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución de casos según área técnica
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-64 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        {/* Ejes */}
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                        <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                        
                        {/* Barras */}
                        {data.casosPorArea.map((area, index) => {
                          const altura = (area.casos / Math.max(...data.casosPorArea.map(a => a.casos))) * 140;
                          const x = 60 + (index * 70);
                          const y = 180 - altura;
                          const colores = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                          
                          return (
                            <g key={area.area}>
                              <rect
                                x={x}
                                y={y}
                                width="50"
                                height={altura}
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x={x + 25}
                                y={195}
                                textAnchor="middle"
                                className="text-xs fill-gray-600"
                              >
                                {area.area}
                              </text>
                              <text
                                x={x + 25}
                                y={y - 5}
                                textAnchor="middle"
                                className="text-sm font-medium fill-gray-900"
                              >
                                {area.casos}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </Card.Content>
                </Card>

                {/* Gráfico circular - Distribución de Estados */}
                <Card>
                  <Card.Header>
                    <Card.Title>Distribución de Estados</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Proporción de casos según estado
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                          {(() => {
                            let currentAngle = 0;
                            
                            return data.distribucionEstados.map((estado, index) => {
                              const angulo = (estado.cantidad / estadisticas.totalCasos) * 360;
                              const radio = 80;
                              const x1 = 100 + radio * Math.cos((currentAngle * Math.PI) / 180);
                              const y1 = 100 + radio * Math.sin((currentAngle * Math.PI) / 180);
                              const x2 = 100 + radio * Math.cos(((currentAngle + angulo) * Math.PI) / 180);
                              const y2 = 100 + radio * Math.sin(((currentAngle + angulo) * Math.PI) / 180);
                              const largeArcFlag = angulo > 180 ? 1 : 0;
                              
                              const pathData = [
                                `M 100 100`,
                                `L ${x1} ${y1}`,
                                `A ${radio} ${radio} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                'Z'
                              ].join(' ');
                              
                              currentAngle += angulo;
                              
                              return (
                                <path
                                  key={estado.estado}
                                  d={pathData}
                                  fill={estado.color}
                                  className="transition-all duration-1000 ease-out"
                                />
                              );
                            });
                          })()}
                          
                          {/* Centro con total */}
                          <circle cx="100" cy="100" r="40" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
                          <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-gray-900">
                            {estadisticas.totalCasos}
                          </text>
                          <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">
                            Total Casos
                          </text>
                        </svg>
                      </div>
                      
                      {/* Leyenda */}
                      <div className="ml-8 space-y-2">
                        {data.distribucionEstados.map((estado, index) => (
                          <div key={estado.estado} className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: estado.color }}
                            ></div>
                            <span className="text-sm text-gray-700">{estado.estado}</span>
                            <span className="text-sm font-medium text-gray-900">{estado.cantidad}</span>
                            <span className="text-xs text-gray-500">({estado.porcentaje}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Segunda fila - Gráficos de líneas y barras */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de líneas - Tendencias Diarias */}
                <Card>
                  <Card.Header>
                    <Card.Title>Tendencias Semanales</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Casos registrados por día de la semana
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-48 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Ejes */}
                        <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                        <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                        
                        {/* Línea de casos */}
                        <polyline
                          points="60,110 100,80 140,60 180,40 220,50 260,70 300,90"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          className="transition-all duration-1000 ease-out"
                        />
                        
                        {/* Línea de resueltos */}
                        <polyline
                          points="60,120 100,95 140,75 180,55 220,65 260,85 300,105"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          className="transition-all duration-1000 ease-out"
                        />
                        
                        {/* Puntos de datos */}
                        {data.tendenciasDiarias.map((dia, index) => {
                          const x = 60 + (index * 40);
                          const yCasos = 130 - (dia.casos * 4);
                          const yResueltos = 130 - (dia.resueltos * 4);
                          
                          return (
                            <g key={dia.dia}>
                              <circle cx={x} cy={yCasos} r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                              <circle cx={x} cy={yResueltos} r="3" fill="#10b981" className="transition-all duration-1000 ease-out"/>
                              <text x={x} y={145} textAnchor="middle" className="text-xs fill-gray-500">
                                {dia.dia}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                      
                      {/* Leyenda */}
                      <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-700">Casos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-700">Resueltos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                {/* Gráfico de barras horizontales - Casos por Prioridad */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos por Prioridad</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución según nivel de prioridad
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-48 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Ejes */}
                        <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                        <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                        
                        {/* Barras horizontales */}
                        {data.casosPorPrioridad.map((prioridad, index) => {
                          const ancho = (prioridad.casos / Math.max(...data.casosPorPrioridad.map(p => p.casos))) * 300;
                          const y = 40 + (index * 25);
                          
                          return (
                            <g key={prioridad.prioridad}>
                              <rect
                                x="45"
                                y={y - 8}
                                width={ancho}
                                height="16"
                                fill={prioridad.color}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="35"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {prioridad.prioridad}
                              </text>
                              <text
                                x={ancho + 50}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
                              >
                                {prioridad.casos}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Tercera fila - Gráfico de calor */}
              <Card>
                <Card.Header>
                  <Card.Title>Mapa de Calor - Casos por Técnico y Área</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución de casos según técnico y área técnica
                    </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 500 200">
                      {/* Títulos de columnas */}
                      <text x="100" y="20" textAnchor="middle" className="text-sm font-medium fill-gray-900">Hardware</text>
                      <text x="180" y="20" textAnchor="middle" className="text-sm font-medium fill-gray-900">Software</text>
                      <text x="260" y="20" textAnchor="middle" className="text-sm font-medium fill-gray-900">Redes</text>
                      <text x="340" y="20" textAnchor="middle" className="text-sm font-medium fill-gray-900">Móvil</text>
                      
                      {/* Filas de técnicos */}
                      {data.casosPorTecnicoYArea.map((tecnico, index) => {
                        const y = 50 + (index * 30);
                        const areas = ['hardware', 'software', 'redes', 'movil'];
                        const maxCasos = Math.max(...areas.map(area => tecnico[area]));
                        
                        return (
                          <g key={tecnico.tecnico}>
                            <text x="20" y={y + 5} textAnchor="end" className="text-xs fill-gray-600">
                              {tecnico.tecnico.split(' ')[0]}
                            </text>
                            
                            {areas.map((area, areaIndex) => {
                              const casos = tecnico[area];
                              const intensidad = casos / maxCasos;
                              const x = 80 + (areaIndex * 80);
                              const color = `rgba(59, 130, 246, ${intensidad})`;
                              
                              return (
                                <g key={area}>
                                  <rect
                                    x={x - 20}
                                    y={y - 10}
                                    width="40"
                                    height="20"
                                    fill={color}
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                    className="transition-all duration-1000 ease-out"
                                  />
                                  <text
                                    x={x}
                                    y={y + 2}
                                    textAnchor="middle"
                                    className="text-xs font-medium fill-gray-900"
                                  >
                                    {casos}
                                  </text>
                                </g>
                              );
                            })}
                          </g>
                        );
                      })}
                    </svg>
                    
                    {/* Leyenda de colores */}
                    <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border">
                      <div className="text-xs text-gray-700 mb-1">Intensidad</div>
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 bg-blue-200 rounded"></div>
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <div className="w-4 h-4 bg-blue-800 rounded"></div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Vista Tendencias */}
          {vistaActiva === 'tendencias' && (
            <div className="space-y-6">
              {/* Gráfico de líneas - Tendencias Mensuales */}
              <Card>
                <Card.Header>
                  <Card.Title>Tendencias Mensuales</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evolución de casos y satisfacción en los últimos meses
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 600 200">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="180" x2="580" y2="180" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Línea de casos */}
                      <polyline
                        points="60,160 120,140 180,150 240,120 300,130 360,110 420,100 480,105"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Línea de satisfacción (escalada) */}
                      <polyline
                        points="60,80 120,90 180,85 240,70 300,65 360,55 420,50 480,55"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Puntos de datos */}
                      {data.tendenciasMensuales.map((mes, index) => {
                        const x = 60 + (index * 60);
                        const yCasos = 180 - (mes.casos * 2);
                        const ySatisfaccion = 180 - (mes.satisfaccion * 40);
                        
                        return (
                          <g key={mes.mes}>
                            <circle cx={x} cy={yCasos} r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                            <circle cx={x} cy={ySatisfaccion} r="3" fill="#10b981" className="transition-all duration-1000 ease-out"/>
                            <text x={x} y={195} textAnchor="middle" className="text-xs fill-gray-500">
                              {mes.mes.substring(0, 3)}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    
                    {/* Leyenda */}
                    <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Casos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Satisfacción</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Gráfico de área - Casos por Hora */}
              <Card>
                <Card.Header>
                  <Card.Title>Casos por Hora del Día</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución de casos según hora de registro
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 500 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="480" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Área sombreada */}
                      <polygon
                        points={`40,130 ${data.casosPorHora.map((hora, index) => {
                          const x = 40 + (index * 35);
                          const y = 130 - (hora.casos * 4);
                          return `${x},${y}`;
                        }).join(' ')} 480,130`}
                        fill="rgba(59, 130, 246, 0.2)"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Línea */}
                      <polyline
                        points={data.casosPorHora.map((hora, index) => {
                          const x = 40 + (index * 35);
                          const y = 130 - (hora.casos * 4);
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Puntos de datos */}
                      {data.casosPorHora.map((hora, index) => {
                        const x = 40 + (index * 35);
                        const y = 130 - (hora.casos * 4);
                        
                        return (
                          <g key={hora.hora}>
                            <circle cx={x} cy={y} r="2" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                            {index % 2 === 0 && (
                              <text x={x} y={145} textAnchor="middle" className="text-xs fill-gray-500">
                                {hora.hora}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Vista Técnicos */}
          {vistaActiva === 'tecnicos' && (
            <div className="space-y-6">
              {/* Lista de técnicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tecnicos.map(tecnico => (
                  <Card key={tecnico.id} className="hover:shadow-md transition-shadow">
                    <Card.Content>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{tecnico.nombre}</h3>
                          <p className="text-sm text-gray-600">{tecnico.area}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(tecnico.estado)}`}>
                          {tecnico.estado}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Casos Activos:</span>
                          <span className="font-medium">{tecnico.casosActivos}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Satisfacción:</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(4)}
                          </div>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>

              {/* Gráfico de satisfacción por técnico */}
              <Card>
                <Card.Header>
                  <Card.Title>Satisfacción por Técnico</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Calificación promedio de cada técnico
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 500 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="480" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Barras horizontales */}
                      {data.satisfaccionPorTecnico.map((tecnico, index) => {
                        const ancho = (tecnico.satisfaccion / 5) * 400;
                        const y = 30 + (index * 25);
                        
                        return (
                          <g key={tecnico.tecnico}>
                            <rect
                              x="45"
                              y={y - 8}
                              width={ancho}
                              height="16"
                              fill={tecnico.color}
                              className="transition-all duration-1000 ease-out"
                            />
                            <text
                              x="35"
                              y={y + 2}
                              textAnchor="end"
                              className="text-xs fill-gray-600"
                            >
                              {tecnico.tecnico.split(' ')[0]}
                            </text>
                            <text
                              x={ancho + 50}
                              y={y + 2}
                              textAnchor="start"
                              className="text-xs font-medium fill-gray-900"
                            >
                              {tecnico.satisfaccion}/5
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}

          {/* Vista Encuestas */}
          {vistaActiva === 'encuestas' && (
            <div className="space-y-6">
              {/* Gráfico de dona - Estados de Encuestas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <Card.Header>
                    <Card.Title>Estados de Encuestas</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución de encuestas según estado
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 150 150">
                          {(() => {
                            let currentAngle = 0;
                            
                            return data.estadosEncuestas.map((estado, index) => {
                              const angulo = (estado.cantidad / 114) * 360; // Total de encuestas
                              const radio = 60;
                              const x1 = 75 + radio * Math.cos((currentAngle * Math.PI) / 180);
                              const y1 = 75 + radio * Math.sin((currentAngle * Math.PI) / 180);
                              const x2 = 75 + radio * Math.cos(((currentAngle + angulo) * Math.PI) / 180);
                              const y2 = 75 + radio * Math.sin(((currentAngle + angulo) * Math.PI) / 180);
                              const largeArcFlag = angulo > 180 ? 1 : 0;
                              
                              const pathData = [
                                `M 75 75`,
                                `L ${x1} ${y1}`,
                                `A ${radio} ${radio} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                'Z'
                              ].join(' ');
                              
                              currentAngle += angulo;
                              
                              return (
                                <path
                                  key={estado.estado}
                                  d={pathData}
                                  fill={estado.color}
                                  className="transition-all duration-1000 ease-out"
                                />
                              );
                            });
                          })()}
                          
                          {/* Centro hueco */}
                          <circle cx="75" cy="75" r="30" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
                          <text x="75" y="72" textAnchor="middle" className="text-sm font-bold fill-gray-900">
                            114
                          </text>
                          <text x="75" y="85" textAnchor="middle" className="text-xs fill-gray-600">
                            Total
                          </text>
                        </svg>
                      </div>
                      
                      {/* Leyenda */}
                      <div className="ml-4 space-y-1">
                        {data.estadosEncuestas.map((estado, index) => (
                          <div key={estado.estado} className="flex items-center space-x-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: estado.color }}
                            ></div>
                            <span className="text-xs text-gray-700">{estado.estado}</span>
                            <span className="text-xs font-medium text-gray-900">{estado.cantidad}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header>
                    <Card.Title>Satisfacción Detallada</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución por nivel de satisfacción
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-4">
                      {data.satisfaccionDetallada.map((nivel, index) => (
                        <div key={nivel.nivel} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{nivel.nivel}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{nivel.cantidad}</span>
                              <span className="text-xs text-gray-500">({nivel.porcentaje}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${nivel.porcentaje}%`,
                                backgroundColor: nivel.color
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            </div>
          )}

          {/* Vista Rendimiento */}
          {vistaActiva === 'rendimiento' && (
            <div className="space-y-6">
              {/* Métricas de rendimiento */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card.Stat
                  title="Eficiencia General"
                  value={`${data.metricasRendimiento.eficienciaGeneral}%`}
                  icon={Target}
                  color="green"
                  subtitle="Casos resueltos exitosamente"
                />
                <Card.Stat
                  title="Casos por Día"
                  value={data.metricasRendimiento.casosResueltosPorDia}
                  icon={Calendar}
                  color="blue"
                  subtitle="Promedio de resolución diaria"
                />
                <Card.Stat
                  title="Escalados"
                  value={`${data.metricasRendimiento.casosEscaladosPorcentaje}%`}
                  icon={TrendingUp}
                  color="orange"
                  subtitle="Casos que requieren escalado"
                />
              </div>

              {/* Gráfico de radar - Rendimiento Técnico */}
              <Card>
                <Card.Header>
                  <Card.Title>Perfil de Rendimiento Técnico</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evaluación multidimensional de técnicos
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      {/* Círculos concéntricos */}
                      <circle cx="150" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      <circle cx="150" cy="100" r="45" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      <circle cx="150" cy="100" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      <circle cx="150" cy="100" r="15" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      
                      {/* Líneas radiales */}
                      {[0, 60, 120, 180, 240, 300].map(angle => {
                        const x = 150 + 60 * Math.cos((angle * Math.PI) / 180);
                        const y = 100 + 60 * Math.sin((angle * Math.PI) / 180);
                        return (
                          <line
                            key={angle}
                            x1="150"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                        );
                      })}
                      
                      {/* Datos del primer técnico */}
                      {data.rendimientoTecnico[0] && (() => {
                        const tecnico = data.rendimientoTecnico[0];
                        const puntos = [
                          { label: 'Tiempo', value: tecnico.tiempo, angle: 0 },
                          { label: 'Satisfacción', value: tecnico.satisfaccion, angle: 60 },
                          { label: 'Casos', value: tecnico.casos, angle: 120 },
                          { label: 'Conocimiento', value: tecnico.conocimiento, angle: 180 },
                          { label: 'Comunicación', value: tecnico.comunicacion, angle: 240 },
                          { label: 'Tiempo', value: tecnico.tiempo, angle: 300 }
                        ];
                        
                        const pathData = puntos.map(punto => {
                          const x = 150 + (punto.value * 0.6) * Math.cos((punto.angle * Math.PI) / 180);
                          const y = 100 + (punto.value * 0.6) * Math.sin((punto.angle * Math.PI) / 180);
                          return `${x},${y}`;
                        }).join(' ');
                        
                        return (
                          <polygon
                            points={pathData}
                            fill="rgba(59, 130, 246, 0.3)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="transition-all duration-1000 ease-out"
                          />
                        );
                      })()}
                      
                      {/* Etiquetas */}
                      {['Tiempo', 'Satisfacción', 'Casos', 'Conocimiento', 'Comunicación'].map((label, index) => {
                        const angle = (index * 60) * Math.PI / 180;
                        const x = 150 + 75 * Math.cos(angle);
                        const y = 100 + 75 * Math.sin(angle);
                        return (
                          <text
                            key={label}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            className="text-xs fill-gray-600"
                          >
                            {label}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                </Card.Content>
              </Card>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default DashboardGeneral;
