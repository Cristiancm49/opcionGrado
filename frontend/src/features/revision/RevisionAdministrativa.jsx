import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  FileText, 
  AlertCircle,
  RefreshCw,
  Download,
  Settings,
  Filter,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  Target,
  Activity
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useRevisionAdministrativa } from './hooks/useRevisionAdministrativa';
import RevisionFilters from './components/RevisionFilters';
import TrabajoItem from './components/TrabajoItem';

const RevisionAdministrativa = () => {
  const [vistaActiva, setVistaActiva] = useState('pendientes');
  const [refrescar, setRefrescar] = useState(false);
  
  const { 
    data, 
    estadisticas, 
    loading, 
    error, 
    filtros, 
    actualizarFiltros, 
    limpiarFiltros, 
    trabajosFiltrados,
    trabajosPendientesFiltrados,
    trabajosRevisadosFiltrados,
    aprobarTrabajo,
    rechazarTrabajo
  } = useRevisionAdministrativa();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando revisiones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar las revisiones</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revisión Administrativa</h1>
          <p className="text-gray-600 mt-1">
            Evaluación de trabajos realizados por técnicos
          </p>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card.Stat
          title="Total Trabajos"
          value={estadisticas.totalTrabajos}
          icon={FileText}
          color="blue"
          subtitle="Trabajos en el sistema"
          trend="+3"
          trendUp={true}
        />
        <Card.Stat
          title="Pendientes"
          value={estadisticas.trabajosPendientes}
          icon={Clock}
          color="yellow"
          subtitle="Esperando revisión"
          trend="+2"
          trendUp={false}
        />
        <Card.Stat
          title="Revisados"
          value={estadisticas.trabajosRevisados}
          icon={CheckCircle}
          color="green"
          subtitle="Trabajos evaluados"
          trend="+1"
          trendUp={true}
        />
        <Card.Stat
          title="Trabajos Aprobados"
          value={estadisticas.trabajosAprobados}
          icon={ThumbsUp}
          color="green"
          subtitle="Trabajos aprobados"
        />
      </div>

      {/* Filtros */}
      <RevisionFilters
        filtros={filtros}
        actualizarFiltros={actualizarFiltros}
        limpiarFiltros={limpiarFiltros}
        trabajosFiltrados={trabajosFiltrados}
        trabajosPendientesFiltrados={trabajosPendientesFiltrados}
        trabajosRevisadosFiltrados={trabajosRevisadosFiltrados}
      />

      {/* Tabs de vista */}
      <Card>
        <Card.Header>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'pendientes', label: 'Pendientes', icon: Clock },
              { id: 'revisados', label: 'Revisados', icon: CheckCircle },
              { id: 'estadisticas', label: 'Estadísticas', icon: TrendingUp },
              { id: 'tecnicos', label: 'Por Técnico', icon: Users }
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
          {/* Vista Pendientes */}
          {vistaActiva === 'pendientes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Trabajos Pendientes de Revisión
                </h3>
                <span className="text-sm text-gray-600">
                  {trabajosPendientesFiltrados.length} trabajos encontrados
                </span>
              </div>

              {trabajosPendientesFiltrados.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay trabajos pendientes</h3>
                  <p className="text-gray-600">
                    {Object.values(filtros).some(f => f !== '') 
                      ? 'No se encontraron trabajos con los filtros aplicados'
                      : 'Todos los trabajos han sido revisados'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trabajosPendientesFiltrados.map(trabajo => (
                    <TrabajoItem
                      key={trabajo.id}
                      trabajo={trabajo}
                      onAprobar={aprobarTrabajo}
                      onRechazar={rechazarTrabajo}
                      esRevisado={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vista Revisados */}
          {vistaActiva === 'revisados' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Trabajos Ya Revisados
                </h3>
                <span className="text-sm text-gray-600">
                  {trabajosRevisadosFiltrados.length} trabajos encontrados
                </span>
              </div>

              {trabajosRevisadosFiltrados.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay trabajos revisados</h3>
                  <p className="text-gray-600">
                    {Object.values(filtros).some(f => f !== '') 
                      ? 'No se encontraron trabajos con los filtros aplicados'
                      : 'No hay trabajos revisados aún'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trabajosRevisadosFiltrados.map(trabajo => (
                    <TrabajoItem
                      key={trabajo.id}
                      trabajo={trabajo}
                      onAprobar={aprobarTrabajo}
                      onRechazar={rechazarTrabajo}
                      esRevisado={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vista Estadísticas */}
          {vistaActiva === 'estadisticas' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Estadísticas de Revisión</h3>
              
              {/* Gráfico de distribución de calificaciones */}
              <Card>
                <Card.Header>
                  <Card.Title>Distribución de Calificaciones</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución de calificaciones otorgadas en las revisiones
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Barras de calificaciones */}
                      {[1, 2, 3, 4, 5].map((calificacion, index) => {
                        const cantidad = trabajosRevisadosFiltrados.filter(t => t.calificacionRevision === calificacion).length;
                        const altura = (cantidad / Math.max(...[1, 2, 3, 4, 5].map(c => 
                          trabajosRevisadosFiltrados.filter(t => t.calificacionRevision === c).length
                        ))) * 100;
                        const x = 60 + (index * 60);
                        const y = 130 - altura;
                        const colores = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
                        
                        return (
                          <g key={calificacion}>
                            <rect
                              x={x}
                              y={y}
                              width="40"
                              height={altura}
                              fill={colores[index]}
                              className="transition-all duration-1000 ease-out"
                            />
                            <text
                              x={x + 20}
                              y={145}
                              textAnchor="middle"
                              className="text-xs fill-gray-600"
                            >
                              {calificacion}★
                            </text>
                            <text
                              x={x + 20}
                              y={y - 5}
                              textAnchor="middle"
                              className="text-sm font-medium fill-gray-900"
                            >
                              {cantidad}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </Card.Content>
              </Card>

              {/* Gráfico de eficiencia por técnico */}
              <Card>
                <Card.Header>
                  <Card.Title>Eficiencia por Técnico</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Promedio de eficiencia de cada técnico
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 500 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="480" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Barras horizontales */}
                      {data.trabajosPendientes.concat(data.trabajosRevisados).reduce((acc, trabajo) => {
                        const tecnico = trabajo.tecnicoAsignado;
                        if (!acc[tecnico]) {
                          acc[tecnico] = { trabajos: 0, eficienciaTotal: 0 };
                        }
                        acc[tecnico].trabajos++;
                        acc[tecnico].eficienciaTotal += trabajo.eficiencia;
                        return acc;
                      }, {}).map((tecnico, index) => {
                        const eficienciaPromedio = tecnico.eficienciaTotal / tecnico.trabajos;
                        const ancho = (eficienciaPromedio / 100) * 400;
                        const y = 40 + (index * 25);
                        
                        return (
                          <g key={tecnico}>
                            <rect
                              x="45"
                              y={y - 8}
                              width={ancho}
                              height="16"
                              fill="#3b82f6"
                              className="transition-all duration-1000 ease-out"
                            />
                            <text
                              x="35"
                              y={y + 2}
                              textAnchor="end"
                              className="text-xs fill-gray-600"
                            >
                              {tecnico.split(' ')[0]}
                            </text>
                            <text
                              x={ancho + 50}
                              y={y + 2}
                              textAnchor="start"
                              className="text-xs font-medium fill-gray-900"
                            >
                              {eficienciaPromedio.toFixed(1)}%
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

          {/* Vista Por Técnico */}
          {vistaActiva === 'tecnicos' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Evaluación por Técnico</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.trabajosPendientes.concat(data.trabajosRevisados).reduce((acc, trabajo) => {
                  const tecnico = trabajo.tecnicoAsignado;
                  if (!acc[tecnico]) {
                    acc[tecnico] = { 
                      trabajos: 0, 
                      eficienciaTotal: 0, 
                      calificaciones: [],
                      area: trabajo.areaTecnica
                    };
                  }
                  acc[tecnico].trabajos++;
                  acc[tecnico].eficienciaTotal += trabajo.eficiencia;
                  if (trabajo.calificacionRevision) {
                    acc[tecnico].calificaciones.push(trabajo.calificacionRevision);
                  }
                  return acc;
                }, {}).map((tecnico, index) => {
                  const eficienciaPromedio = tecnico.eficienciaTotal / tecnico.trabajos;
                  const calificacionPromedio = tecnico.calificaciones.length > 0 
                    ? tecnico.calificaciones.reduce((sum, c) => sum + c, 0) / tecnico.calificaciones.length 
                    : 0;
                  
                  return (
                    <Card key={tecnico} className="hover:shadow-md transition-shadow">
                      <Card.Content>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{tecnico}</h4>
                            <p className="text-sm text-gray-600">{tecnico.area}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{tecnico.trabajos}</div>
                            <div className="text-xs text-gray-600">trabajos</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Eficiencia Promedio:</span>
                            <span className="text-sm font-medium text-blue-600">
                              {eficienciaPromedio.toFixed(1)}%
                            </span>
                          </div>
                          
                          {calificacionPromedio > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Calificación Promedio:</span>
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < calificacionPromedio ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="text-sm font-medium text-gray-900 ml-1">
                                  {calificacionPromedio.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Trabajos Revisados:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {tecnico.calificaciones.length}
                            </span>
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default RevisionAdministrativa;
