import { useState, useEffect } from 'react';
import { mockEncuestas, mockTecnicos, mockAreasTecnicas, mockTiposCaso, mockPrioridades, mockPreguntas } from '../data/qualitySurveysData';

export const useQualitySurveysReport = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    tecnico: '',
    areaTecnica: '',
    tipoCaso: '',
    prioridad: '',
    fechaDesde: '',
    fechaHasta: '',
    satisfaccionMinima: '',
    satisfaccionMaxima: '',
    busqueda: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarEncuestas = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEncuestas(mockEncuestas);
        setError(null);
      } catch (err) {
        setError('Error al cargar las encuestas de calidad');
      } finally {
        setLoading(false);
      }
    };

    cargarEncuestas();
  }, []);

  // Filtrar encuestas
  const encuestasFiltradas = encuestas.filter(encuesta => {
    const cumpleTecnico = !filtros.tecnico || encuesta.tecnicoAsignado === filtros.tecnico;
    const cumpleArea = !filtros.areaTecnica || encuesta.areaTecnica === filtros.areaTecnica;
    const cumpleTipoCaso = !filtros.tipoCaso || encuesta.tipoCaso === filtros.tipoCaso;
    const cumplePrioridad = !filtros.prioridad || encuesta.prioridad === filtros.prioridad;
    
    const cumpleFechaDesde = !filtros.fechaDesde || new Date(encuesta.fechaEncuesta) >= new Date(filtros.fechaDesde);
    const cumpleFechaHasta = !filtros.fechaHasta || new Date(encuesta.fechaEncuesta) <= new Date(filtros.fechaHasta);
    
    const cumpleSatisfaccionMinima = !filtros.satisfaccionMinima || encuesta.satisfaccionGeneral >= parseInt(filtros.satisfaccionMinima);
    const cumpleSatisfaccionMaxima = !filtros.satisfaccionMaxima || encuesta.satisfaccionGeneral <= parseInt(filtros.satisfaccionMaxima);
    
    const cumpleBusqueda = !filtros.busqueda || 
      // Búsqueda en campos principales
      encuesta.casoId.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.nombreUsuario.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.nombreTecnico.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.areaTecnica.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.tipoCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.prioridad.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      encuesta.observaciones.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      // Búsqueda en satisfacción (números y texto)
      encuesta.satisfaccionGeneral.toString().includes(filtros.busqueda) ||
      encuesta.promedioRespuestas.toString().includes(filtros.busqueda) ||
      encuesta.tiempoResolucion.toString().includes(filtros.busqueda) ||
      // Búsqueda en respuestas individuales
      encuesta.respuestas.some(respuesta => 
        respuesta.pregunta.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        respuesta.respuesta.toString().includes(filtros.busqueda) ||
        respuesta.valorNumerico.toString().includes(filtros.busqueda)
      ) ||
      // Búsqueda por palabras clave de satisfacción
      (filtros.busqueda.toLowerCase().includes('excelente') && encuesta.satisfaccionGeneral >= 5) ||
      (filtros.busqueda.toLowerCase().includes('buena') && encuesta.satisfaccionGeneral >= 4 && encuesta.satisfaccionGeneral < 5) ||
      (filtros.busqueda.toLowerCase().includes('regular') && encuesta.satisfaccionGeneral >= 3 && encuesta.satisfaccionGeneral < 4) ||
      (filtros.busqueda.toLowerCase().includes('mala') && encuesta.satisfaccionGeneral < 3) ||
      // Búsqueda por rangos de tiempo
      (filtros.busqueda.includes('hora') && encuesta.tiempoResolucion < 1) ||
      (filtros.busqueda.includes('día') && encuesta.tiempoResolucion >= 1 && encuesta.tiempoResolucion < 8) ||
      (filtros.busqueda.includes('semana') && encuesta.tiempoResolucion >= 8) ||
      // Búsqueda por fecha (formato aproximado)
      encuesta.fechaEncuesta.includes(filtros.busqueda);

    return cumpleTecnico && cumpleArea && cumpleTipoCaso && cumplePrioridad && 
           cumpleFechaDesde && cumpleFechaHasta && cumpleSatisfaccionMinima && 
           cumpleSatisfaccionMaxima && cumpleBusqueda;
  });

  // Estadísticas para reportes
  const estadisticas = {
    totalEncuestas: encuestas.length,
    promedioSatisfaccion: encuestas.length > 0 ? 
      (encuestas.reduce((sum, encuesta) => sum + encuesta.satisfaccionGeneral, 0) / encuestas.length).toFixed(2) : 0,
    promedioRespuestas: encuestas.length > 0 ?
      (encuestas.reduce((sum, encuesta) => sum + encuesta.promedioRespuestas, 0) / encuestas.length).toFixed(2) : 0,
    satisfaccionExcelente: encuestas.filter(e => e.satisfaccionGeneral >= 5).length,
    satisfaccionBuena: encuestas.filter(e => e.satisfaccionGeneral >= 4 && e.satisfaccionGeneral < 5).length,
    satisfaccionRegular: encuestas.filter(e => e.satisfaccionGeneral >= 3 && e.satisfaccionGeneral < 4).length,
    satisfaccionMala: encuestas.filter(e => e.satisfaccionGeneral < 3).length,
    tiempoPromedioResolucion: encuestas.length > 0 ?
      (encuestas.reduce((sum, encuesta) => sum + encuesta.tiempoResolucion, 0) / encuestas.length).toFixed(1) : 0,
    encuestasPorTecnico: encuestas.reduce((acc, encuesta) => {
      acc[encuesta.nombreTecnico] = (acc[encuesta.nombreTecnico] || 0) + 1;
      return acc;
    }, {}),
    satisfaccionPorTecnico: encuestas.reduce((acc, encuesta) => {
      if (!acc[encuesta.nombreTecnico]) {
        acc[encuesta.nombreTecnico] = { total: 0, suma: 0, casos: 0 };
      }
      acc[encuesta.nombreTecnico].suma += encuesta.satisfaccionGeneral;
      acc[encuesta.nombreTecnico].casos += 1;
      acc[encuesta.nombreTecnico].total = acc[encuesta.nombreTecnico].suma / acc[encuesta.nombreTecnico].casos;
      return acc;
    }, {}),
    satisfaccionPorArea: encuestas.reduce((acc, encuesta) => {
      if (!acc[encuesta.areaTecnica]) {
        acc[encuesta.areaTecnica] = { total: 0, suma: 0, casos: 0 };
      }
      acc[encuesta.areaTecnica].suma += encuesta.satisfaccionGeneral;
      acc[encuesta.areaTecnica].casos += 1;
      acc[encuesta.areaTecnica].total = acc[encuesta.areaTecnica].suma / acc[encuesta.areaTecnica].casos;
      return acc;
    }, {}),
    satisfaccionPorTipoCaso: encuestas.reduce((acc, encuesta) => {
      if (!acc[encuesta.tipoCaso]) {
        acc[encuesta.tipoCaso] = { total: 0, suma: 0, casos: 0 };
      }
      acc[encuesta.tipoCaso].suma += encuesta.satisfaccionGeneral;
      acc[encuesta.tipoCaso].casos += 1;
      acc[encuesta.tipoCaso].total = acc[encuesta.tipoCaso].suma / acc[encuesta.tipoCaso].casos;
      return acc;
    }, {}),
    respuestasPorPregunta: mockPreguntas.map(pregunta => {
      const respuestas = encuestas.flatMap(e => 
        e.respuestas.filter(r => r.pregunta === pregunta)
      );
      const promedio = respuestas.length > 0 ? 
        (respuestas.reduce((sum, r) => sum + r.valorNumerico, 0) / respuestas.length).toFixed(2) : 0;
      return {
        pregunta,
        promedio: parseFloat(promedio),
        totalRespuestas: respuestas.length
      };
    })
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      tecnico: '',
      areaTecnica: '',
      tipoCaso: '',
      prioridad: '',
      fechaDesde: '',
      fechaHasta: '',
      satisfaccionMinima: '',
      satisfaccionMaxima: '',
      busqueda: ''
    });
  };

  return {
    encuestas: encuestasFiltradas,
    encuestasOriginales: encuestas,
    loading,
    error,
    filtros,
    estadisticas,
    tecnicos: mockTecnicos,
    areasTecnicas: mockAreasTecnicas,
    tiposCaso: mockTiposCaso,
    prioridades: mockPrioridades,
    preguntas: mockPreguntas,
    actualizarFiltros,
    limpiarFiltros
  };
};
