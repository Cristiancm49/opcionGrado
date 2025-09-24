import React, { useState } from 'react';
import { 
  BarChart3, 
  Star, 
  Activity, 
  Users, 
  Clock, 
  TrendingUp,
  RefreshCw,
  Download,
  Filter,
  AlertCircle,
  CheckCircle,
  Settings,
  Calendar,
  MessageSquare,
  Award,
  Target,
  Search
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import QualitySurveysFilters from './components/QualitySurveysFilters';
import QualitySurveyItem from './components/QualitySurveyItem';
import { useQualitySurveysReport } from './hooks/useQualitySurveysReport';

const EncuestasCalidad = () => {
  const [tabActivo, setTabActivo] = useState('encuestas');
  
  const {
    encuestas,
    encuestasOriginales,
    loading,
    error,
    filtros,
    estadisticas,
    tecnicos,
    areasTecnicas,
    tiposCaso,
    prioridades,
    preguntas,
    actualizarFiltros,
    limpiarFiltros
  } = useQualitySurveysReport();

  const tabs = [
    { id: 'encuestas', label: 'Encuestas', icon: Star },
    { id: 'graficas', label: 'Gráficas', icon: BarChart3 },
    { id: 'tecnicos', label: 'Por Técnico', icon: Users },
    { id: 'estadisticas', label: 'Estadísticas', icon: Activity }
  ];

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener datos para gráficas
  const satisfaccionPorTecnico = Object.entries(estadisticas.satisfaccionPorTecnico)
    .sort(([,a], [,b]) => b.total - a.total);

  const satisfaccionPorArea = Object.entries(estadisticas.satisfaccionPorArea)
    .sort(([,a], [,b]) => b.total - a.total);

  const satisfaccionPorTipoCaso = Object.entries(estadisticas.satisfaccionPorTipoCaso)
    .sort(([,a], [,b]) => b.total - a.total);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Encuestas de Calidad</h1>
          <p className="text-gray-600">Análisis de satisfacción y calidad del servicio técnico</p>
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

      {/* Todos los Filtros - Siempre visibles */}
      <QualitySurveysFilters
        filtros={filtros}
        actualizarFiltros={actualizarFiltros}
        limpiarFiltros={limpiarFiltros}
        tecnicos={tecnicos}
        areasTecnicas={areasTecnicas}
        tiposCaso={tiposCaso}
        prioridades={prioridades}
        encuestasFiltradas={encuestas}
        encuestasOriginales={encuestasOriginales}
      />

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card.Stat
          title="Promedio General"
          value={estadisticas.promedioSatisfaccion}
          icon={Star}
          color="yellow"
          subtitle="Satisfacción promedio"
        />

        <Card.Stat
          title="Total Encuestas"
          value={estadisticas.totalEncuestas}
          icon={MessageSquare}
          color="blue"
          subtitle="Encuestas completadas"
        />

        <Card.Stat
          title="Tiempo Promedio"
          value={`${estadisticas.tiempoPromedioResolucion}h`}
          icon={Clock}
          color="green"
          subtitle="Resolución de casos"
        />

        <Card.Stat
          title="Excelente (5★)"
          value={estadisticas.satisfaccionExcelente}
          icon={Award}
          color="purple"
          subtitle="Calificaciones máximas"
        />
      </div>

      {/* Distribución de satisfacción */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <Card.Content padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{estadisticas.satisfaccionExcelente}</div>
              <div className="text-sm text-green-700">Excelente (5★)</div>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <Card.Content padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{estadisticas.satisfaccionBuena}</div>
              <div className="text-sm text-blue-700">Buena (4★)</div>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <Card.Content padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{estadisticas.satisfaccionRegular}</div>
              <div className="text-sm text-yellow-700">Regular (3★)</div>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <Card.Content padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{estadisticas.satisfaccionMala}</div>
                      <div className="text-sm text-red-700">Mala (&lt;3★)</div>
            </div>
          </Card.Content>
        </Card>
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
          {/* Tab Encuestas */}
          {tabActivo === 'encuestas' && (
            <div className="space-y-6">
              {/* Lista de encuestas */}
              <Card>
                <Card.Header>
                  <Card.Title>Encuestas de Calidad</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evaluaciones de satisfacción del servicio técnico ({encuestas.length} encuestas)
                  </p>
                </Card.Header>
                
                <Card.Content>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-24 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <Card.Alert type="error" title="Error al cargar encuestas">
                      <p>{error}</p>
                    </Card.Alert>
                  ) : encuestas.length === 0 ? (
                    <div className="text-center py-12">
                      <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {encuestasOriginales.length === 0 ? 'No hay encuestas disponibles' : 'No hay encuestas que coincidan'}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {encuestasOriginales.length === 0 
                          ? 'Las encuestas de calidad aparecerán aquí'
                          : 'Ajusta los filtros para ver más resultados'
                        }
                      </p>
                      {encuestasOriginales.length === 0 ? (
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
                      {encuestas.map(encuesta => (
                        <QualitySurveyItem key={encuesta.id} encuesta={encuesta} />
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
              {/* Primera fila: Gráficas principales */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfica Circular - Más pequeña */}
                <Card>
                  <Card.Header>
                    <Card.Title>Distribución de Satisfacción</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Calificaciones recibidas
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        {/* Gráfica circular */}
                        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                          {/* Excelente (5★) - Verde */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeDasharray={`${(estadisticas.satisfaccionExcelente / estadisticas.totalEncuestas) * 251.2} 251.2`}
                            className="transition-all duration-1000 ease-out"
                          />
                          
                          {/* Buena (4★) - Azul */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="8"
                            strokeDasharray={`${(estadisticas.satisfaccionBuena / estadisticas.totalEncuestas) * 251.2} 251.2`}
                            strokeDashoffset={`-${(estadisticas.satisfaccionExcelente / estadisticas.totalEncuestas) * 251.2}`}
                            className="transition-all duration-1000 ease-out"
                          />
                          
                          {/* Regular (3★) - Amarillo */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="8"
                            strokeDasharray={`${(estadisticas.satisfaccionRegular / estadisticas.totalEncuestas) * 251.2} 251.2`}
                            strokeDashoffset={`-${((estadisticas.satisfaccionExcelente + estadisticas.satisfaccionBuena) / estadisticas.totalEncuestas) * 251.2}`}
                            className="transition-all duration-1000 ease-out"
                          />
                          
                          {/* Mala (<3★) - Rojo */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="8"
                            strokeDasharray={`${(estadisticas.satisfaccionMala / estadisticas.totalEncuestas) * 251.2} 251.2`}
                            strokeDashoffset={`-${((estadisticas.satisfaccionExcelente + estadisticas.satisfaccionBuena + estadisticas.satisfaccionRegular) / estadisticas.totalEncuestas) * 251.2}`}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        
                        {/* Texto central */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-900">{estadisticas.totalEncuestas}</div>
                            <div className="text-xs text-gray-600">Encuestas</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Leyenda compacta */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="text-xs">
                          <div className="font-medium">Excelente</div>
                          <div className="text-gray-600">{estadisticas.satisfaccionExcelente}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="text-xs">
                          <div className="font-medium">Buena</div>
                          <div className="text-gray-600">{estadisticas.satisfaccionBuena}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="text-xs">
                          <div className="font-medium">Regular</div>
                          <div className="text-gray-600">{estadisticas.satisfaccionRegular}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="text-xs">
                          <div className="font-medium">Mala</div>
                          <div className="text-gray-600">{estadisticas.satisfaccionMala}</div>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                {/* Gráfica de Radar - Más pequeña */}
                <Card>
                  <Card.Header>
                    <Card.Title>Perfil de Satisfacción</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Dimensiones de calidad
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-48 h-48" viewBox="0 0 200 200">
                          {/* Círculos de referencia */}
                          <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                          <circle cx="100" cy="100" r="40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                          <circle cx="100" cy="100" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                          
                          {/* Líneas radiales */}
                          {[0, 60, 120, 180, 240, 300].map(angle => {
                            const x1 = 100 + 60 * Math.cos((angle - 90) * Math.PI / 180);
                            const y1 = 100 + 60 * Math.sin((angle - 90) * Math.PI / 180);
                            return (
                              <line
                                key={angle}
                                x1="100"
                                y1="100"
                                x2={x1}
                                y2={y1}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                              />
                            );
                          })}
                          
                          {/* Datos del radar */}
                          <polygon
                            points="100,40 130,50 130,100 100,150 70,100 70,50"
                            fill="rgba(59, 130, 246, 0.2)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="transition-all duration-1000 ease-out"
                          />
                          
                          {/* Puntos de datos */}
                          {[
                            { angle: 0, value: 4.5 },
                            { angle: 60, value: 4.2 },
                            { angle: 120, value: 4.8 },
                            { angle: 180, value: 4.3 },
                            { angle: 240, value: 4.6 },
                            { angle: 300, value: 4.4 }
                          ].map(({ angle, value }) => {
                            const x = 100 + (value / 5) * 60 * Math.cos((angle - 90) * Math.PI / 180);
                            const y = 100 + (value / 5) * 60 * Math.sin((angle - 90) * Math.PI / 180);
                            return (
                              <circle
                                key={angle}
                                cx={x}
                                cy={y}
                                r="2"
                                fill="#3b82f6"
                                className="transition-all duration-1000 ease-out"
                              />
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Leyenda compacta */}
                    <div className="mt-3 text-center">
                      <div className="inline-flex items-center space-x-2 bg-blue-50 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-blue-700">Perfil Promedio</span>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Segunda fila: Gráficas de barras compactas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Satisfacción por Técnico - Compacta */}
                <Card>
                  <Card.Header>
                    <Card.Title>Satisfacción por Técnico</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Calificación promedio
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {satisfaccionPorTecnico.map(([tecnico, datos], index) => {
                        const porcentaje = (datos.total / 5) * 100;
                        const colores = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
                        const coloresTexto = ['text-blue-600', 'text-green-600', 'text-purple-600'];
                        
                        return (
                          <div key={tecnico} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <div className={`w-6 h-6 ${colores[index % colores.length]} rounded-full flex items-center justify-center`}>
                                  <Users className="h-3 w-3 text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{tecnico.split(' ')[0]}</div>
                                  <div className="text-xs text-gray-600">{datos.casos} casos</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                {renderStars(Math.round(datos.total))}
                                <span className={`text-sm font-bold ${coloresTexto[index % coloresTexto.length]}`}>
                                  {datos.total.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            
                            {/* Barra compacta */}
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`${colores[index % colores.length]} h-3 rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${porcentaje}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Content>
                </Card>

                {/* Mapa de Calor - Compacto */}
                <Card>
                  <Card.Header>
                    <Card.Title>Mapa de Calor</Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      Satisfacción por técnico y área
                    </p>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3">
                      {/* Encabezados */}
                      <div className="grid grid-cols-4 gap-1 text-xs font-medium text-gray-600">
                        <div></div>
                        <div className="text-center">HW</div>
                        <div className="text-center">SW</div>
                        <div className="text-center">Red</div>
                      </div>
                      
                      {/* Filas de técnicos */}
                      {Object.entries(estadisticas.satisfaccionPorTecnico).map(([tecnico, datos]) => {
                        const areas = ['Soporte Hardware', 'Soporte Software', 'Soporte Redes'];
                        return (
                          <div key={tecnico} className="grid grid-cols-4 gap-1">
                            <div className="text-xs font-medium text-gray-700 flex items-center">
                              {tecnico.split(' ')[0]}
                            </div>
                            {areas.map(area => {
                              const satisfaccion = datos.total;
                              const intensidad = Math.min(satisfaccion / 5, 1);
                              const colorIntensity = Math.round(intensidad * 255);
                              const bgColor = `rgb(${255 - colorIntensity}, ${colorIntensity}, 100)`;
                              
                              return (
                                <div
                                  key={area}
                                  className="h-6 rounded flex items-center justify-center text-xs font-medium text-white"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  {satisfaccion.toFixed(1)}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                      
                      {/* Leyenda compacta */}
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <div className="text-xs text-gray-600">Baja</div>
                        <div className="flex space-x-1">
                          {[0, 0.5, 1].map(intensidad => {
                            const colorIntensity = Math.round(intensidad * 255);
                            const bgColor = `rgb(${255 - colorIntensity}, ${colorIntensity}, 100)`;
                            return (
                              <div
                                key={intensidad}
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: bgColor }}
                              ></div>
                            );
                          })}
                        </div>
                        <div className="text-xs text-gray-600">Alta</div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>

              {/* Tercera fila: Gráfica de tendencias compacta */}
              <Card>
                <Card.Header>
                  <Card.Title>Tendencias Temporales</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evolución de satisfacción mensual
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Línea de satisfacción */}
                      <polyline
                        points="60,120 100,100 140,80 180,70 220,65 260,60 300,55 340,50"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Puntos de datos */}
                      <circle cx="60" cy="120" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="100" cy="100" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="140" cy="80" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="180" cy="70" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="220" cy="65" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="260" cy="60" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="300" cy="55" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="340" cy="50" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      
                      {/* Etiquetas del eje Y */}
                      <text x="35" y="25" textAnchor="end" className="text-xs fill-gray-500">5.0</text>
                      <text x="35" y="55" textAnchor="end" className="text-xs fill-gray-500">4.0</text>
                      <text x="35" y="85" textAnchor="end" className="text-xs fill-gray-500">3.0</text>
                      <text x="35" y="115" textAnchor="end" className="text-xs fill-gray-500">2.0</text>
                      <text x="35" y="135" textAnchor="end" className="text-xs fill-gray-500">0</text>
                      
                      {/* Etiquetas del eje X */}
                      <text x="60" y="145" textAnchor="middle" className="text-xs fill-gray-500">Ene</text>
                      <text x="100" y="145" textAnchor="middle" className="text-xs fill-gray-500">Feb</text>
                      <text x="140" y="145" textAnchor="middle" className="text-xs fill-gray-500">Mar</text>
                      <text x="180" y="145" textAnchor="middle" className="text-xs fill-gray-500">Abr</text>
                      <text x="220" y="145" textAnchor="middle" className="text-xs fill-gray-500">May</text>
                      <text x="260" y="145" textAnchor="middle" className="text-xs fill-gray-500">Jun</text>
                      <text x="300" y="145" textAnchor="middle" className="text-xs fill-gray-500">Jul</text>
                      <text x="340" y="145" textAnchor="middle" className="text-xs fill-gray-500">Ago</text>
                    </svg>
                    
                    {/* Leyenda */}
                    <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-700">Satisfacción</span>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Gráfica de respuestas por pregunta */}
              <Card>
                <Card.Header>
                  <Card.Title>Análisis por Pregunta</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Calificación promedio de cada pregunta de la encuesta
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {estadisticas.respuestasPorPregunta.map((pregunta, index) => {
                      const porcentaje = (pregunta.promedio / 5) * 100;
                      const colores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 flex-1 pr-4">
                              {pregunta.pregunta}
                            </span>
                            <div className="flex items-center space-x-2">
                              {renderStars(Math.round(pregunta.promedio))}
                              <span className="text-sm text-gray-600">{pregunta.promedio}/5</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${colores[index % colores.length]} h-3 rounded-full transition-all duration-1000 ease-out`}
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

          {/* Tab Por Técnico */}
          {tabActivo === 'tecnicos' && (
            <div className="space-y-6">
              {satisfaccionPorTecnico.map(([tecnico, datos]) => {
                const encuestasTecnico = encuestasOriginales.filter(e => e.nombreTecnico === tecnico);
                const promedioTiempo = encuestasTecnico.length > 0 ? 
                  (encuestasTecnico.reduce((sum, e) => sum + e.tiempoResolucion, 0) / encuestasTecnico.length).toFixed(1) : 0;
                
                return (
                  <Card key={tecnico}>
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <Card.Title>{tecnico}</Card.Title>
                            <p className="text-sm text-gray-600 mt-1">
                              {datos.casos} casos atendidos
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.round(datos.total))}
                            <span className="text-lg font-bold text-gray-900">{datos.total.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600">Promedio de satisfacción</p>
                        </div>
                      </div>
                    </Card.Header>
                    
                    <Card.Content>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">{datos.casos}</div>
                          <div className="text-sm text-blue-700">Casos Atendidos</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{promedioTiempo}h</div>
                          <div className="text-sm text-green-700">Tiempo Promedio</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-xl font-bold text-yellow-600">{datos.total.toFixed(2)}/5</div>
                          <div className="text-sm text-yellow-700">Calificación</div>
                        </div>
                      </div>

                      {/* Casos recientes del técnico */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">Casos Recientes:</h4>
                        {encuestasTecnico.slice(0, 3).map(encuesta => (
                          <div key={encuesta.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{encuesta.casoId}</span>
                              <Badge variant="outline" size="sm">{encuesta.tipoCaso}</Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(encuesta.satisfaccionGeneral)}
                              <span className="text-sm text-gray-600">{encuesta.satisfaccionGeneral}/5</span>
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
              {/* Análisis por Pregunta */}
              <Card>
                <Card.Header>
                  <Card.Title>Análisis por Pregunta</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Calificación promedio de cada pregunta de la encuesta
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {estadisticas.respuestasPorPregunta.map((pregunta, index) => {
                      const porcentaje = (pregunta.promedio / 5) * 100;
                      const colores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 flex-1 pr-4">
                              {pregunta.pregunta}
                            </span>
                            <div className="flex items-center space-x-2">
                              {renderStars(Math.round(pregunta.promedio))}
                              <span className="text-sm text-gray-600">{pregunta.promedio}/5</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${colores[index % colores.length]} h-3 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Content>
              </Card>

              {/* Ranking de Técnicos */}
              <Card>
                <Card.Header>
                  <Card.Title>Ranking de Técnicos</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Clasificación por satisfacción promedio
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {satisfaccionPorTecnico.map(([tecnico, datos], index) => {
                      const porcentaje = (datos.total / 5) * 100;
                      const colores = ['bg-yellow-100 text-yellow-800', 'bg-gray-100 text-gray-800', 'bg-orange-100 text-orange-800'];
                      const posiciones = ['🥇', '🥈', '🥉'];
                      
                      return (
                        <div key={tecnico} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${colores[index % colores.length]}`}>
                              {index < 3 ? posiciones[index] : index + 1}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{tecnico}</div>
                              <div className="text-sm text-gray-600">{datos.casos} casos atendidos</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {renderStars(Math.round(datos.total))}
                            <span className="text-lg font-bold text-gray-900">{datos.total.toFixed(2)}/5</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Content>
              </Card>

              {/* Análisis Temporal */}
              <Card>
                <Card.Header>
                  <Card.Title>Tendencias Temporales</Card.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Evolución de satisfacción en los últimos meses
                  </p>
                </Card.Header>
                <Card.Content>
                  <div className="h-48 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Ejes */}
                      <line x1="40" y1="20" x2="40" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      <line x1="40" y1="130" x2="380" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                      
                      {/* Línea de satisfacción */}
                      <polyline
                        points="60,120 100,100 140,80 180,70 220,65 260,60 300,55 340,50"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        className="transition-all duration-1000 ease-out"
                      />
                      
                      {/* Puntos de datos */}
                      <circle cx="60" cy="120" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="100" cy="100" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="140" cy="80" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="180" cy="70" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="220" cy="65" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="260" cy="60" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="300" cy="55" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      <circle cx="340" cy="50" r="3" fill="#3b82f6" className="transition-all duration-1000 ease-out"/>
                      
                      {/* Etiquetas del eje Y */}
                      <text x="35" y="25" textAnchor="end" className="text-xs fill-gray-500">5.0</text>
                      <text x="35" y="55" textAnchor="end" className="text-xs fill-gray-500">4.0</text>
                      <text x="35" y="85" textAnchor="end" className="text-xs fill-gray-500">3.0</text>
                      <text x="35" y="115" textAnchor="end" className="text-xs fill-gray-500">2.0</text>
                      <text x="35" y="135" textAnchor="end" className="text-xs fill-gray-500">0</text>
                      
                      {/* Etiquetas del eje X */}
                      <text x="60" y="145" textAnchor="middle" className="text-xs fill-gray-500">Ene</text>
                      <text x="100" y="145" textAnchor="middle" className="text-xs fill-gray-500">Feb</text>
                      <text x="140" y="145" textAnchor="middle" className="text-xs fill-gray-500">Mar</text>
                      <text x="180" y="145" textAnchor="middle" className="text-xs fill-gray-500">Abr</text>
                      <text x="220" y="145" textAnchor="middle" className="text-xs fill-gray-500">May</text>
                      <text x="260" y="145" textAnchor="middle" className="text-xs fill-gray-500">Jun</text>
                      <text x="300" y="145" textAnchor="middle" className="text-xs fill-gray-500">Jul</text>
                      <text x="340" y="145" textAnchor="middle" className="text-xs fill-gray-500">Ago</text>
                    </svg>
                    
                    {/* Leyenda */}
                    <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-700">Satisfacción</span>
                      </div>
                    </div>
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

export default EncuestasCalidad;
