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
  Filter
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAppStore from '../../store/useAppStore';
import CasesReportsFilters from './components/CasesReportsFilters';
import { useCasesReports } from './hooks/useCasesReports';

const ReportesCasos = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  const [tabActivo, setTabActivo] = useState('casos');
  const {
    casos,
    casosOriginales,
    loading,
    error,
    filtros,
    estadisticas,
    estadosCaso,
    tiposCaso,
    prioridades,
    areasTecnicas,
    tecnicos,
    actualizarFiltros,
    limpiarFiltros
  } = useCasesReports();

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Función para obtener color según estado
  const getEstadoColor = (estado) => {
    const colores = {
      'Abierto': 'bg-blue-100 text-blue-800',
      'En Proceso': 'bg-yellow-100 text-yellow-800',
      'Cerrado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
      'Pendiente': 'bg-gray-100 text-gray-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  // Función para obtener color según prioridad
  const getPrioridadColor = (prioridad) => {
    const colores = {
      'Crítica': 'bg-red-100 text-red-800',
      'Alta': 'bg-orange-100 text-orange-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Baja': 'bg-green-100 text-green-800'
    };
    return colores[prioridad] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reportes de casos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar los datos</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes de Casos</h1>
          <p className="text-gray-600 mt-1">
            Análisis completo de casos, incidencias y rendimiento técnico
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <CasesReportsFilters
        filtros={filtros}
        actualizarFiltros={actualizarFiltros}
        limpiarFiltros={limpiarFiltros}
        estadosCaso={estadosCaso}
        tiposCaso={tiposCaso}
        prioridades={prioridades}
        areasTecnicas={areasTecnicas}
        tecnicos={tecnicos}
        casosFiltrados={casos}
      />

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card.Stat
          title="Total Casos"
          value={estadisticas.totalCasos}
          icon={FileText}
          color="blue"
          subtitle="Casos registrados"
        />
        <Card.Stat
          title="Casos Activos"
          value={estadisticas.casosActivos}
          icon={Activity}
          color="yellow"
          subtitle="Abiertos + En Proceso"
        />
        <Card.Stat
          title="Casos Escalados"
          value={estadisticas.casosEscalados}
          icon={TrendingUp}
          color="red"
          subtitle="Requieren atención superior"
        />
        <Card.Stat
          title="Casos Retrasados"
          value={estadisticas.casosRetrasados}
          icon={AlertCircle}
          color="orange"
          subtitle="Fuera del tiempo límite"
        />
      </div>

      {/* Distribución por estado */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{estadisticas.casosAbiertos}</div>
          <div className="text-sm text-blue-700">Abiertos</div>
          <div className="text-xs text-blue-600 mt-1">
            {estadisticas.totalCasos > 0 ? ((estadisticas.casosAbiertos / estadisticas.totalCasos) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{estadisticas.casosEnProceso}</div>
          <div className="text-sm text-yellow-700">En Proceso</div>
          <div className="text-xs text-yellow-600 mt-1">
            {estadisticas.totalCasos > 0 ? ((estadisticas.casosEnProceso / estadisticas.totalCasos) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{estadisticas.casosCerrados}</div>
          <div className="text-sm text-green-700">Cerrados</div>
          <div className="text-xs text-green-600 mt-1">
            {estadisticas.totalCasos > 0 ? ((estadisticas.casosCerrados / estadisticas.totalCasos) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{estadisticas.casosCancelados}</div>
          <div className="text-sm text-red-700">Cancelados</div>
          <div className="text-xs text-red-600 mt-1">
            {estadisticas.totalCasos > 0 ? ((estadisticas.casosCancelados / estadisticas.totalCasos) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <Card.Header>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'casos', label: 'Casos', icon: FileText },
              { id: 'graficas', label: 'Gráficas', icon: BarChart3 },
              { id: 'tecnicos', label: 'Por Técnico', icon: Users },
              { id: 'estadisticas', label: 'Estadísticas', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTabActivo(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tabActivo === tab.id
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
          {/* Tab Casos */}
          {tabActivo === 'casos' && (
            <div className="space-y-4">
              {casos.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay casos</h3>
                  <p className="text-gray-600">
                    {Object.values(filtros).some(f => f !== '') 
                      ? 'No se encontraron casos con los filtros aplicados'
                      : 'No hay casos registrados en el sistema'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {casos.map(caso => (
                    <div key={caso.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{caso.numeroCaso}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(caso.estado)}`}>
                              {caso.estado}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(caso.prioridad)}`}>
                              {caso.prioridad}
                            </span>
                          </div>
                          <h4 className="text-md font-medium text-gray-800 mb-2">{caso.titulo}</h4>
                          <p className="text-sm text-gray-600 mb-3">{caso.descripcion}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Usuario:</span>
                          <div className="font-medium">{caso.nombreUsuario}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Técnico:</span>
                          <div className="font-medium">{caso.nombreTecnico}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Área:</span>
                          <div className="font-medium">{caso.areaTecnica}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tipo:</span>
                          <div className="font-medium">{caso.tipoCaso}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Fecha Registro:</span>
                          <div className="font-medium">{new Date(caso.fechaRegistro).toLocaleDateString('es-ES')}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Días Abierto:</span>
                          <div className="font-medium">{caso.diasAbierto} días</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tiempo Resolución:</span>
                          <div className="font-medium">{caso.tiempoResolucion ? `${caso.tiempoResolucion}h` : 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Satisfacción:</span>
                          <div className="flex items-center space-x-1">
                            {caso.satisfaccion ? renderStars(caso.satisfaccion) : <span className="text-gray-400">N/A</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Gráficas */}
          {tabActivo === 'graficas' && (
            <div className="space-y-6">
              {/* Primera fila - Gráficas principales */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfica de barras - Casos por Estado */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos por Estado</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución según estado actual
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-48 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 150">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="135" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="135" x2="270" y2="135" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras */}
                        {Object.entries(estadisticas.casosPorEstado).map(([estado, cantidad], index) => {
                          const altura = (cantidad / Math.max(...Object.values(estadisticas.casosPorEstado))) * 100;
                          const x = 40 + (index * 55);
                          const y = 135 - altura;
                          const colores = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#6b7280'];
                          
                          return (
                            <g key={estado}>
                              <rect
                                x={x}
                                y={y}
                                width="40"
                                height={altura}
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x={x + 20}
                                y={150}
                                textAnchor="middle"
                                className="text-xs fill-gray-600"
                              >
                                {estado.split(' ')[0]}
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

                {/* Gráfica circular - Casos por Tipo */}
                <Card>
                  <Card.Header>
                    <Card.Title>Distribución por Tipo</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Proporción según tipo de caso
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 150 150">
                          {(() => {
                            const total = Object.values(estadisticas.casosPorTipo).reduce((sum, val) => sum + val, 0);
                            let currentAngle = 0;
                            const colores = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];
                            
                            return Object.entries(estadisticas.casosPorTipo).map(([tipo, cantidad], index) => {
                              const angulo = (cantidad / total) * 360;
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
                                  key={tipo}
                                  d={pathData}
                                  fill={colores[index % colores.length]}
                                  className="transition-all duration-1000 ease-out"
                                />
                              );
                            });
                          })()}
                          
                          {/* Centro con total */}
                          <circle cx="75" cy="75" r="30" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
                          <text x="75" y="72" textAnchor="middle" className="text-sm font-bold fill-gray-900">
                            {estadisticas.totalCasos}
                          </text>
                          <text x="75" y="85" textAnchor="middle" className="text-xs fill-gray-600">
                            Total
                          </text>
                        </svg>
                      </div>
                      
                      {/* Leyenda compacta */}
                      <div className="ml-4 space-y-1">
                        {Object.entries(estadisticas.casosPorTipo).map(([tipo, cantidad], index) => {
                          const porcentaje = ((cantidad / estadisticas.totalCasos) * 100).toFixed(1);
                          const colores = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];
                          
                          return (
                            <div key={tipo} className="flex items-center space-x-2">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: colores[index % colores.length] }}
                              ></div>
                              <span className="text-xs text-gray-700">{tipo}</span>
                              <span className="text-xs font-medium text-gray-900">{cantidad}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Segunda fila - Gráficas secundarias */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfica de líneas - Tendencias temporales */}
                <Card>
                  <Card.Header>
                    <Card.Title>Tendencias Temporales</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Evolución mensual de casos
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Línea de tendencia */}
                        <polyline
                          points="50,90 80,75 110,60 140,50 170,45 200,40 230,35 260,30"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          className="transition-all duration-1000 ease-out"
                        />
                        
                        {/* Puntos de datos */}
                        <circle cx="50" cy="90" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="80" cy="75" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="110" cy="60" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="140" cy="50" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="170" cy="45" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="200" cy="40" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="230" cy="35" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        <circle cx="260" cy="30" r="2.5" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                        
                        {/* Etiquetas del eje Y */}
                        <text x="25" y="20" textAnchor="end" className="text-xs fill-gray-500">10</text>
                        <text x="25" y="45" textAnchor="end" className="text-xs fill-gray-500">8</text>
                        <text x="25" y="70" textAnchor="end" className="text-xs fill-gray-500">6</text>
                        <text x="25" y="95" textAnchor="end" className="text-xs fill-gray-500">4</text>
                        <text x="25" y="110" textAnchor="end" className="text-xs fill-gray-500">0</text>
                        
                        {/* Etiquetas del eje X */}
                        <text x="50" y="120" textAnchor="middle" className="text-xs fill-gray-500">Ene</text>
                        <text x="80" y="120" textAnchor="middle" className="text-xs fill-gray-500">Feb</text>
                        <text x="110" y="120" textAnchor="middle" className="text-xs fill-gray-500">Mar</text>
                        <text x="140" y="120" textAnchor="middle" className="text-xs fill-gray-500">Abr</text>
                        <text x="170" y="120" textAnchor="middle" className="text-xs fill-gray-500">May</text>
                        <text x="200" y="120" textAnchor="middle" className="text-xs fill-gray-500">Jun</text>
                        <text x="230" y="120" textAnchor="middle" className="text-xs fill-gray-500">Jul</text>
                        <text x="260" y="120" textAnchor="middle" className="text-xs fill-gray-500">Ago</text>
                      </svg>
                      
                      {/* Leyenda */}
                      <div className="absolute top-2 right-2 bg-white p-1 rounded shadow-sm border">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-700">Casos</span>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                {/* Gráfica de barras horizontales - Casos por Prioridad */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos por Prioridad</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución según nivel de prioridad
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras horizontales */}
                        {Object.entries(estadisticas.casosPorPrioridad).map(([prioridad, cantidad], index) => {
                          const ancho = (cantidad / Math.max(...Object.values(estadisticas.casosPorPrioridad))) * 200;
                          const y = 30 + (index * 20);
                          const colores = ['#ef4444', '#f59e0b', '#eab308', '#22c55e'];
                          
                          return (
                            <g key={prioridad}>
                              <rect
                                x="35"
                                y={y - 5}
                                width={ancho}
                                height="12"
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="25"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {prioridad}
                              </text>
                              <text
                                x={ancho + 40}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
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
              </div>

              {/* Tercera fila - Gráficas de escalado y retrasos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfica de escalado */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos Escalados</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución de casos escalados por nivel
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras horizontales */}
                        {Object.entries(estadisticas.casosPorNivelEscalado).map(([nivel, cantidad], index) => {
                          const ancho = (cantidad / Math.max(...Object.values(estadisticas.casosPorNivelEscalado))) * 200;
                          const y = 30 + (index * 25);
                          const colores = ['#ef4444', '#f59e0b', '#8b5cf6'];
                          
                          return (
                            <g key={nivel}>
                              <rect
                                x="35"
                                y={y - 8}
                                width={ancho}
                                height="16"
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="25"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {nivel}
                              </text>
                              <text
                                x={ancho + 40}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
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

                {/* Gráfica de retrasos */}
                <Card>
                  <Card.Header>
                    <Card.Title>Casos Retrasados</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución por días de retraso
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras horizontales */}
                        {Object.entries(estadisticas.casosPorDiasRetraso).map(([rango, cantidad], index) => {
                          const ancho = (cantidad / Math.max(...Object.values(estadisticas.casosPorDiasRetraso))) * 200;
                          const y = 30 + (index * 25);
                          const colores = ['#f59e0b', '#ef4444', '#dc2626', '#991b1b'];
                          
                          return (
                            <g key={rango}>
                              <rect
                                x="35"
                                y={y - 8}
                                width={ancho}
                                height="16"
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="25"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {rango}
                              </text>
                              <text
                                x={ancho + 40}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
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
              </div>

              {/* Cuarta fila - Gráficas de tiempo y satisfacción */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfica de tiempo de resolución */}
                <Card>
                  <Card.Header>
                    <Card.Title>Tiempo de Resolución</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución por rangos de tiempo
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras horizontales */}
                        {Object.entries(estadisticas.casosPorTiempoResolucion).map(([rango, cantidad], index) => {
                          const ancho = (cantidad / Math.max(...Object.values(estadisticas.casosPorTiempoResolucion))) * 200;
                          const y = 30 + (index * 25);
                          const colores = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                          
                          return (
                            <g key={rango}>
                              <rect
                                x="35"
                                y={y - 8}
                                width={ancho}
                                height="16"
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="25"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {rango}
                              </text>
                              <text
                                x={ancho + 40}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
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

                {/* Gráfica de satisfacción */}
                <Card>
                  <Card.Header>
                    <Card.Title>Nivel de Satisfacción</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Distribución por calificación
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="h-40 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        {/* Ejes */}
                        <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        <line x1="30" y1="105" x2="270" y2="105" stroke="#e5e7eb" strokeWidth="1.5"/>
                        
                        {/* Barras horizontales */}
                        {Object.entries(estadisticas.casosPorSatisfaccion).map(([nivel, cantidad], index) => {
                          const ancho = (cantidad / Math.max(...Object.values(estadisticas.casosPorSatisfaccion))) * 200;
                          const y = 30 + (index * 25);
                          const colores = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                          
                          return (
                            <g key={nivel}>
                              <rect
                                x="35"
                                y={y - 8}
                                width={ancho}
                                height="16"
                                fill={colores[index % colores.length]}
                                className="transition-all duration-1000 ease-out"
                              />
                              <text
                                x="25"
                                y={y + 2}
                                textAnchor="end"
                                className="text-xs fill-gray-600"
                              >
                                {nivel}
                              </text>
                              <text
                                x={ancho + 40}
                                y={y + 2}
                                textAnchor="start"
                                className="text-xs font-medium fill-gray-900"
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
              </div>

              {/* Quinta fila - Gráfica de área técnica */}
              <Card>
                <Card.Header>
                  <Card.Title>Casos por Área Técnica</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución y rendimiento por área técnica
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-32 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                      {/* Ejes */}
                      <line x1="40" y1="10" x2="40" y2="90" stroke="#e5e7eb" strokeWidth="1.5"/>
                      <line x1="40" y1="90" x2="360" y2="90" stroke="#e5e7eb" strokeWidth="1.5"/>
                      
                      {/* Barras */}
                      {Object.entries(estadisticas.casosPorArea).map(([area, cantidad], index) => {
                        const altura = (cantidad / Math.max(...Object.values(estadisticas.casosPorArea))) * 60;
                        const x = 50 + (index * 70);
                        const y = 90 - altura;
                        const colores = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                        
                        return (
                          <g key={area}>
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
                              y={95}
                              textAnchor="middle"
                              className="text-xs fill-gray-600"
                            >
                              {area.split(' ')[1] || area.split(' ')[0]}
                            </text>
                            <text
                              x={x + 25}
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
            </div>
          )}

          {/* Tab Por Técnico */}
          {tabActivo === 'tecnicos' && (
            <div className="space-y-6">
              {Object.entries(estadisticas.casosPorTecnico).map(([tecnico, casos]) => {
                const tiempoPromedio = estadisticas.tiempoResolucionPorTecnico[tecnico]?.total || 0;
                const satisfaccionPromedio = estadisticas.satisfaccionPorTecnico[tecnico]?.total || 0;
                
                return (
                  <Card key={tecnico}>
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <div>
                          <Card.Title>{tecnico}</Card.Title>
                          <p className="text-sm text-gray-600 mt-1">
                            {casos} casos atendidos
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{casos}</div>
                            <div className="text-xs text-gray-500">Casos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{tiempoPromedio.toFixed(1)}h</div>
                            <div className="text-xs text-gray-500">Tiempo Prom.</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center space-x-1">
                              {renderStars(Math.round(satisfaccionPromedio))}
                            </div>
                            <div className="text-xs text-gray-500">Satisfacción</div>
                          </div>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Content>
                      <div className="space-y-4">
                        {/* Casos del técnico */}
                        {casosOriginales.filter(c => c.nombreTecnico === tecnico).map(caso => (
                          <div key={caso.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-900">{caso.numeroCaso}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(caso.estado)}`}>
                                  {caso.estado}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(caso.prioridad)}`}>
                                  {caso.prioridad}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">{caso.titulo}</div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div>{caso.diasAbierto} días</div>
                              <div>{caso.tiempoResolucion ? `${caso.tiempoResolucion}h` : 'N/A'}</div>
                              <div className="flex items-center space-x-1">
                                {caso.satisfaccion ? renderStars(caso.satisfaccion) : <span className="text-gray-400">N/A</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Content>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Tab Estadísticas */}
          {tabActivo === 'estadisticas' && (
            <div className="space-y-6">
              {/* Estadísticas detalladas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card.Stat
                  title="Promedio Tiempo"
                  value={`${estadisticas.promedioTiempoResolucion}h`}
                  icon={Clock}
                  color="blue"
                  subtitle="Resolución de casos"
                />
                <Card.Stat
                  title="Promedio Días"
                  value={estadisticas.promedioDiasAbierto}
                  icon={Calendar}
                  color="green"
                  subtitle="Días abiertos"
                />
                <Card.Stat
                  title="Promedio Satisfacción"
                  value={estadisticas.promedioSatisfaccion}
                  icon={Star}
                  color="yellow"
                  subtitle="Calificación promedio"
                />
                <Card.Stat
                  title="Técnicos Activos"
                  value={Object.keys(estadisticas.casosPorTecnico).length}
                  icon={Users}
                  color="purple"
                  subtitle="Técnicos con casos"
                />
              </div>

              {/* Análisis por área técnica */}
              <Card>
                <Card.Header>
                  <Card.Title>Análisis por Área Técnica</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución de casos y rendimiento por área
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {Object.entries(estadisticas.casosPorArea).map(([area, casos]) => {
                      const porcentaje = ((casos / estadisticas.totalCasos) * 100).toFixed(1);
                      return (
                        <div key={area} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{area}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{casos} casos</span>
                              <span className="text-xs text-gray-500">({porcentaje}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Content>
              </Card>

              {/* Análisis por prioridad */}
              <Card>
                <Card.Header>
                  <Card.Title>Análisis por Prioridad</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Distribución de casos según su nivel de prioridad
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {Object.entries(estadisticas.casosPorPrioridad).map(([prioridad, casos]) => {
                      const porcentaje = ((casos / estadisticas.totalCasos) * 100).toFixed(1);
                      const colores = {
                        'Crítica': 'bg-red-500',
                        'Alta': 'bg-orange-500',
                        'Media': 'bg-yellow-500',
                        'Baja': 'bg-green-500'
                      };
                      return (
                        <div key={prioridad} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">{prioridad}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{casos} casos</span>
                              <span className="text-xs text-gray-500">({porcentaje}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${colores[prioridad] || 'bg-gray-500'} h-3 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
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

export default ReportesCasos;
