import { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import Swal from 'sweetalert2';
import { 
  createComponentClass, 
  combineClasses, 
  getTextColorClass,
  STYLE_CONSTANTS 
} from '../../styles/tailwind';

const MisIncidencias = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [casos, setCasos] = useState([]);
  const [casosFiltrados, setCasosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [showEncuestaModal, setShowEncuestaModal] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    // ⭐ FILTRO PRINCIPAL POR ESTADO - Activos por defecto
    estadoGeneral: 'ACTIVOS', // ACTIVOS, RESUELTOS, TODOS
    prioridad: '',
    areaTecnica: '',
    estadoEspecifico: '',
    fechaDesde: '',
    fechaHasta: '',
    tecnico: '',
    calificacion: '',
    slaStatus: ''
  });

  // Datos unificados - activos y resueltos
  useEffect(() => {
    const cargarCasos = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const datosUnificados = [
        // ====== CASOS ACTIVOS ======
        {
          id: 1,
          numeroCaso: 'INC-001234',
          fechaRegistro: '2025-01-15',
          fechaModificacion: '2025-01-17',
          fechaResolucion: null,
          fechaCierre: null,
          solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
          dependencia: 'OFICINA DE PLANEACION',
          descripcion: 'Computador no enciende en oficina 205, presenta problema eléctrico',
          prioridad: 'Alta',
          areaTecnica: 'Hardware',
          estado: 'En Proceso',
          estadoGeneral: 'ACTIVO',
          tecnicoAsignado: 'Juan Pérez',
          diasAbierto: 3,
          tiempoResolucion: null,
          slaStatus: null,
          ubicacion: 'Edificio A - Piso 2 - Oficina 205',
          elementoAfectado: 'Computador HP ProDesk 400',
          solucionAplicada: null,
          observaciones: 'Se reportó olor a quemado',
          calificacionUsuario: null,
          comentarioUsuario: null,
          tieneEncuesta: false
        },
        {
          id: 2,
          numeroCaso: 'INC-001235',
          fechaRegistro: '2025-01-14',
          fechaModificacion: '2025-01-16',
          fechaResolucion: null,
          fechaCierre: null,
          solicitante: 'MARIA GONZALEZ LOPEZ',
          dependencia: 'RECURSOS HUMANOS',
          descripcion: 'Problema con impresora en recepción, no imprime documentos',
          prioridad: 'Media',
          areaTecnica: 'Hardware',
          estado: 'Asignado',
          estadoGeneral: 'ACTIVO',
          tecnicoAsignado: 'María González',
          diasAbierto: 4,
          tiempoResolucion: null,
          slaStatus: null,
          ubicacion: 'Edificio Principal - Recepción',
          elementoAfectado: 'Impresora Canon ImageRunner',
          solucionAplicada: null,
          observaciones: 'Presenta mensaje de error E000001',
          calificacionUsuario: null,
          comentarioUsuario: null,
          tieneEncuesta: false
        },
        {
          id: 3,
          numeroCaso: 'INC-001236',
          fechaRegistro: '2025-01-13',
          fechaModificacion: '2025-01-18',
          fechaResolucion: null,
          fechaCierre: null,
          solicitante: 'CARLOS RIVERA MORA',
          dependencia: 'SISTEMAS',
          descripcion: 'Problema de conectividad a internet en toda la oficina',
          prioridad: 'Crítica',
          areaTecnica: 'Redes',
          estado: 'Pendiente',
          estadoGeneral: 'ACTIVO',
          tecnicoAsignado: 'Luis Martínez',
          diasAbierto: 5,
          tiempoResolucion: null,
          slaStatus: null,
          ubicacion: 'Edificio B - Piso 1',
          elementoAfectado: 'Switch de red principal',
          solucionAplicada: null,
          observaciones: 'Afecta a 15 usuarios',
          calificacionUsuario: null,
          comentarioUsuario: null,
          tieneEncuesta: false
        },
        
        // ====== CASOS RESUELTOS ======
        {
          id: 4,
          numeroCaso: 'INC-001200',
          fechaRegistro: '2025-01-10',
          fechaModificacion: '2025-01-13',
          fechaResolucion: '2025-01-12',
          fechaCierre: '2025-01-13',
          solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
          dependencia: 'OFICINA DE PLANEACION',
          descripcion: 'Computador lento en oficina 203, requería mantenimiento preventivo',
          prioridad: 'Media',
          areaTecnica: 'Hardware',
          estado: 'Cerrado',
          estadoGeneral: 'RESUELTO',
          tecnicoAsignado: 'Juan Pérez',
          diasAbierto: null,
          tiempoResolucion: '2 días',
          slaStatus: 'Cumplido',
          ubicacion: 'Edificio A - Piso 2 - Oficina 203',
          elementoAfectado: 'Computador HP EliteDesk 800',
          solucionAplicada: 'Se realizó limpieza interna, actualización de drivers y optimización del sistema operativo',
          observaciones: null,
          calificacionUsuario: 5,
          comentarioUsuario: 'Excelente servicio, muy rápido',
          tieneEncuesta: true
        },
        {
          id: 5,
          numeroCaso: 'INC-001198',
          fechaRegistro: '2025-01-08',
          fechaModificacion: '2025-01-10',
          fechaResolucion: '2025-01-09',
          fechaCierre: '2025-01-10',
          solicitante: 'MARIA GONZALEZ LOPEZ',
          dependencia: 'RECURSOS HUMANOS',
          descripcion: 'Problema con instalación de software de nómina',
          prioridad: 'Alta',
          areaTecnica: 'Software',
          estado: 'Resuelto',
          estadoGeneral: 'RESUELTO',
          tecnicoAsignado: 'Ana Rodríguez',
          diasAbierto: null,
          tiempoResolucion: '1 día',
          slaStatus: 'Cumplido',
          ubicacion: 'Edificio Principal - RRHH',
          elementoAfectado: 'Computador Dell OptiPlex 7090',
          solucionAplicada: 'Instalación y configuración del software de nómina, capacitación al usuario',
          observaciones: null,
          calificacionUsuario: 4,
          comentarioUsuario: 'Buena atención, funcionó correctamente',
          tieneEncuesta: true
        },
        {
          id: 6,
          numeroCaso: 'INC-001190',
          fechaRegistro: '2025-01-01',
          fechaModificacion: '2025-01-07',
          fechaResolucion: '2025-01-06',
          fechaCierre: '2025-01-07',
          solicitante: 'SOFIA HERNANDEZ VEGA',
          dependencia: 'CONTABILIDAD',
          descripcion: 'Recuperación de archivos importantes eliminados accidentalmente',
          prioridad: 'Crítica',
          areaTecnica: 'Sistemas',
          estado: 'Cerrado',
          estadoGeneral: 'RESUELTO',
          tecnicoAsignado: 'Miguel Torres',
          diasAbierto: null,
          tiempoResolucion: '5 días',
          slaStatus: 'Incumplido',
          ubicacion: 'Edificio Principal - Contabilidad',
          elementoAfectado: 'Servidor de archivos compartidos',
          solucionAplicada: 'Recuperación desde backup, configuración de papelera de reciclaje de red',
          observaciones: null,
          calificacionUsuario: 3,
          comentarioUsuario: 'Se demoró mucho pero se recuperaron los archivos',
          tieneEncuesta: true
        }
      ];
      
      setCasos(datosUnificados);
      // Aplicar filtro inicial (solo activos)
      const casosActivos = datosUnificados.filter(caso => caso.estadoGeneral === 'ACTIVO');
      setCasosFiltrados(casosActivos);
      setLoading(false);
    };

    cargarCasos();
  }, []);

  const aplicarFiltros = () => {
    let resultado = [...casos];

    // ⭐ FILTRO PRINCIPAL POR ESTADO GENERAL
    if (filtros.estadoGeneral === 'ACTIVOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'ACTIVO');
    } else if (filtros.estadoGeneral === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'RESUELTO');
    }
    // Si es 'TODOS', no filtramos

    // Resto de filtros
    if (filtros.busqueda) {
      resultado = resultado.filter(caso => 
        caso.numeroCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.solicitante.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        (caso.solucionAplicada && caso.solucionAplicada.toLowerCase().includes(filtros.busqueda.toLowerCase()))
      );
    }

    if (filtros.prioridad) {
      resultado = resultado.filter(caso => caso.prioridad === filtros.prioridad);
    }

    if (filtros.areaTecnica) {
      resultado = resultado.filter(caso => caso.areaTecnica === filtros.areaTecnica);
    }

    if (filtros.estadoEspecifico) {
      resultado = resultado.filter(caso => caso.estado === filtros.estadoEspecifico);
    }

    if (filtros.tecnico) {
      resultado = resultado.filter(caso => 
        caso.tecnicoAsignado.toLowerCase().includes(filtros.tecnico.toLowerCase())
      );
    }

    if (filtros.calificacion) {
      const rating = parseInt(filtros.calificacion);
      resultado = resultado.filter(caso => caso.calificacionUsuario === rating);
    }

    if (filtros.slaStatus) {
      resultado = resultado.filter(caso => caso.slaStatus === filtros.slaStatus);
    }

    if (filtros.fechaDesde) {
      const fechaComparar = filtros.estadoGeneral === 'RESUELTOS' ? 'fechaResolucion' : 'fechaRegistro';
      resultado = resultado.filter(caso => 
        new Date(caso[fechaComparar]) >= new Date(filtros.fechaDesde)
      );
    }

    if (filtros.fechaHasta) {
      const fechaComparar = filtros.estadoGeneral === 'RESUELTOS' ? 'fechaResolucion' : 'fechaRegistro';
      resultado = resultado.filter(caso => 
        new Date(caso[fechaComparar]) <= new Date(filtros.fechaHasta)
      );
    }

    setCasosFiltrados(resultado);
  };

  const limpiarFiltros = () => {
    const estadoActual = filtros.estadoGeneral; // Mantener el estado general
    setFiltros({
      busqueda: '',
      estadoGeneral: estadoActual,
      prioridad: '',
      areaTecnica: '',
      estadoEspecifico: '',
      fechaDesde: '',
      fechaHasta: '',
      tecnico: '',
      calificacion: '',
      slaStatus: ''
    });
    
    // Reaplica solo el filtro de estado general
    let resultado = [...casos];
    if (estadoActual === 'ACTIVOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'ACTIVO');
    } else if (estadoActual === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'RESUELTO');
    }
    setCasosFiltrados(resultado);
  };

  // ⭐ FUNCIÓN PARA CAMBIAR ESTADO GENERAL Y REAPLICAR FILTROS
  const cambiarEstadoGeneral = (nuevoEstado) => {
    setFiltros(prev => ({ ...prev, estadoGeneral: nuevoEstado }));
    
    let resultado = [...casos];
    if (nuevoEstado === 'ACTIVOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'ACTIVO');
    } else if (nuevoEstado === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoGeneral === 'RESUELTO');
    }
    
    setCasosFiltrados(resultado);
  };

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case 'Crítica': return 'bg-red-100 text-red-800 border-red-200';
      case 'Alta': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoColor = (estado, estadoGeneral) => {
    if (estadoGeneral === 'RESUELTO') {
      switch(estado) {
        case 'Cerrado': return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'Resuelto': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      switch(estado) {
        case 'En Proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Asignado': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const getSlaColor = (slaStatus) => {
    switch(slaStatus) {
      case 'Cumplido': return 'bg-green-100 text-green-800 border-green-200';
      case 'Incumplido': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderCalificacion = (calificacion) => {
    if (!calificacion) return <span className="text-gray-400">Sin calificar</span>;
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= calificacion ? 'text-yellow-400' : 'text-gray-300'}
          >
            ⭐
          </span>
        ))}
        <span className="text-sm ml-1">({calificacion}/5)</span>
      </div>
    );
  };

  const mostrarDetalle = (caso) => {
    setCasoSeleccionado(caso);
    setShowDetalleModal(true);
  };

  const mostrarSeguimiento = (caso) => {
    setCasoSeleccionado(caso);
    setShowSeguimientoModal(true);
  };

  const mostrarEncuesta = (caso) => {
    setCasoSeleccionado(caso);
    setShowEncuestaModal(true);
  };

  const reabrirCaso = (caso) => {
    Swal.fire({
      title: '¿Reabrir caso?',
      text: `¿Está seguro que desea reabrir el caso ${caso.numeroCaso}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reabrir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Caso reabierto',
          text: 'El caso ha sido reabierto y aparecerá en casos activos',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  // Modal de Detalle
  const DetalleModal = () => {
    if (!showDetalleModal || !casoSeleccionado) return null;

    const esResuelto = casoSeleccionado.estadoGeneral === 'RESUELTO';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={createComponentClass('card', 'default', 'xl', 'shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto')}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={combineClasses('text-2xl font-bold', getTextColorClass('primary'))}>
                Detalle de {esResuelto ? 'Caso Resuelto' : 'Caso Activo'} - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowDetalleModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className={combineClasses('block text-sm font-medium', getTextColorClass('secondary'))}>
                    Número de Caso
                  </label>
                  <p className={combineClasses('text-lg font-semibold', getTextColorClass('primary'))}>
                    {casoSeleccionado.numeroCaso}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Solicitante
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {casoSeleccionado.solicitante}
                  </p>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>
                    {casoSeleccionado.dependencia}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Fechas
                  </label>
                  <p className={`${themeClasses.primaryText} text-sm`}>
                    <strong>Registro:</strong> {casoSeleccionado.fechaRegistro}
                  </p>
                  {esResuelto && (
                    <>
                      <p className={`${themeClasses.primaryText} text-sm`}>
                        <strong>Resolución:</strong> {casoSeleccionado.fechaResolucion}
                      </p>
                      <p className={`${themeClasses.primaryText} text-sm`}>
                        <strong>Cierre:</strong> {casoSeleccionado.fechaCierre}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    {esResuelto ? 'Tiempo de Resolución' : 'Días Abierto'}
                  </label>
                  <p className={`${esResuelto ? themeClasses.primaryText : (casoSeleccionado.diasAbierto > 3 ? 'text-red-600' : themeClasses.primaryText)}`}>
                    {esResuelto ? casoSeleccionado.tiempoResolucion : `${casoSeleccionado.diasAbierto} días`}
                  </p>
                </div>

                {esResuelto && (
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      SLA
                    </label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getSlaColor(casoSeleccionado.slaStatus)}`}>
                      {casoSeleccionado.slaStatus}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Prioridad
                  </label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getPrioridadColor(casoSeleccionado.prioridad)}`}>
                    {casoSeleccionado.prioridad}
                  </span>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Estado
                  </label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getEstadoColor(casoSeleccionado.estado, casoSeleccionado.estadoGeneral)}`}>
                    {casoSeleccionado.estado}
                  </span>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Área Técnica
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {casoSeleccionado.areaTecnica}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Técnico Asignado
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {casoSeleccionado.tecnicoAsignado}
                  </p>
                </div>

                {esResuelto && (
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                      Calificación del Usuario
                    </label>
                    {renderCalificacion(casoSeleccionado.calificacionUsuario)}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                  Descripción Original
                </label>
                <p className={`${themeClasses.primaryText} p-4 border rounded-lg border-gray-300 bg-gray-50`}>
                  {casoSeleccionado.descripcion}
                </p>
              </div>

              {esResuelto && casoSeleccionado.solucionAplicada && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                    Solución Aplicada
                  </label>
                  <p className={`${themeClasses.primaryText} p-4 border rounded-lg border-green-300 bg-green-50`}>
                    {casoSeleccionado.solucionAplicada}
                  </p>
                </div>
              )}

              {casoSeleccionado.observaciones && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                    Observaciones
                  </label>
                  <p className={`${themeClasses.primaryText} p-4 border rounded-lg border-gray-300 bg-gray-50`}>
                    {casoSeleccionado.observaciones}
                  </p>
                </div>
              )}

              {esResuelto && casoSeleccionado.comentarioUsuario && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                    Comentario del Usuario
                  </label>
                  <p className={`${themeClasses.primaryText} p-4 border rounded-lg border-blue-300 bg-blue-50`}>
                    "{casoSeleccionado.comentarioUsuario}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => mostrarSeguimiento(casoSeleccionado)}
                className={createComponentClass('button', 'primary', 'md')}
              >
                Ver Seguimiento
              </button>
              {esResuelto && casoSeleccionado.tieneEncuesta && (
                <button
                  onClick={() => mostrarEncuesta(casoSeleccionado)}
                  className={createComponentClass('button', 'success', 'md')}
                >
                  Ver Encuesta
                </button>
              )}
              {esResuelto && (
                <button
                  onClick={() => reabrirCaso(casoSeleccionado)}
                  className={createComponentClass('button', 'warning', 'md')}
                >
                  Reabrir Caso
                </button>
              )}
              <button
                onClick={() => setShowDetalleModal(false)}
                className={createComponentClass('button', 'secondary', 'md')}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Seguimiento
  const SeguimientoModal = () => {
    if (!showSeguimientoModal || !casoSeleccionado) return null;

    const esResuelto = casoSeleccionado.estadoGeneral === 'RESUELTO';
    
    const historial = esResuelto ? [
      {
        fecha: casoSeleccionado.fechaCierre + ' 16:30',
        usuario: 'Sistema',
        accion: 'Caso Cerrado',
        detalle: 'Caso cerrado automáticamente tras confirmación del usuario'
      },
      {
        fecha: casoSeleccionado.fechaResolucion + ' 14:45',
        usuario: casoSeleccionado.tecnicoAsignado,
        accion: 'Solución Aplicada',
        detalle: casoSeleccionado.solucionAplicada
      },
      {
        fecha: casoSeleccionado.fechaRegistro + ' 10:15',
        usuario: casoSeleccionado.tecnicoAsignado,
        accion: 'Caso Asignado',
        detalle: 'Caso asignado al técnico para revisión'
      },
      {
        fecha: casoSeleccionado.fechaRegistro + ' 09:45',
        usuario: 'Sistema',
        accion: 'Caso Registrado',
        detalle: 'Incidencia registrada en el sistema'
      }
    ] : [
      {
        fecha: casoSeleccionado.fechaModificacion + ' 10:30',
        usuario: casoSeleccionado.tecnicoAsignado,
        accion: 'En Diagnóstico',
        detalle: 'Se está revisando el problema reportado'
      },
      {
        fecha: casoSeleccionado.fechaRegistro + ' 14:15',
        usuario: casoSeleccionado.tecnicoAsignado,
        accion: 'Caso Asignado',
        detalle: 'Caso asignado al técnico para revisión'
      },
      {
        fecha: casoSeleccionado.fechaRegistro + ' 09:45',
        usuario: 'Sistema',
        accion: 'Caso Registrado',
        detalle: 'Incidencia registrada en el sistema'
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Seguimiento {esResuelto ? 'Completo' : 'Actual'} - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {historial.map((evento, index) => (
                <div key={index} className={`border-l-4 ${esResuelto ? 'border-green-500' : 'border-blue-500'} pl-4 pb-4 ${index !== historial.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${themeClasses.primaryText}`}>
                        {evento.accion}
                      </h3>
                      <p className={`text-sm ${themeClasses.secondaryText} mb-2`}>
                        {evento.fecha} - {evento.usuario}
                      </p>
                      <p className={`${themeClasses.primaryText}`}>
                        {evento.detalle}
                      </p>
                    </div>
                    {evento.accion === 'Caso Cerrado' && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                        Finalizado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Encuesta (solo para casos resueltos)
  const EncuestaModal = () => {
    if (!showEncuestaModal || !casoSeleccionado) return null;

    const preguntas = [
      {
        pregunta: '¿Qué tan satisfecho está con el tiempo de respuesta?',
        respuesta: casoSeleccionado.calificacionUsuario || 0
      },
      {
        pregunta: '¿La solución resolvió completamente su problema?',
        respuesta: casoSeleccionado.calificacionUsuario || 0
      },
      {
        pregunta: '¿Cómo califica la atención del técnico?',
        respuesta: casoSeleccionado.calificacionUsuario || 0
      },
      {
        pregunta: '¿Recomendaría nuestro servicio técnico?',
        respuesta: casoSeleccionado.calificacionUsuario || 0
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Encuesta de Calidad - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowEncuestaModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {preguntas.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg border-gray-300 bg-gray-50`}>
                  <h3 className={`font-medium mb-3 ${themeClasses.primaryText}`}>
                    {item.pregunta}
                  </h3>
                  {renderCalificacion(item.respuesta)}
                </div>
              ))}

              {casoSeleccionado.comentarioUsuario && (
                <div className={`p-4 border rounded-lg border-blue-300 bg-blue-50`}>
                  <h3 className={`font-medium mb-3 ${themeClasses.primaryText}`}>
                    Comentarios adicionales:
                  </h3>
                  <p className={`${themeClasses.primaryText} italic`}>
                    "{casoSeleccionado.comentarioUsuario}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowEncuestaModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-6">
        <h1 className={combineClasses('text-3xl font-bold mb-2', getTextColorClass('primary'))}>
          Mis Incidencias
        </h1>
        <p className={getTextColorClass('secondary')}>
          Gestione el seguimiento de todas sus incidencias en el sistema
        </p>
      </div>

      {/* ⭐ SELECTOR PRINCIPAL DE ESTADO - MODERNO */}
      <div className={createComponentClass('card', 'default', 'md', 'shadow-lg mb-6')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className={combineClasses('font-semibold', getTextColorClass('primary'))}>Vista de Casos</h3>
              <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Selecciona el tipo de casos a mostrar</p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => cambiarEstadoGeneral('ACTIVOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoGeneral === 'ACTIVOS'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Activos</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoGeneral === 'ACTIVO').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoGeneral('RESUELTOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoGeneral === 'RESUELTOS'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Resueltos</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoGeneral === 'RESUELTO').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoGeneral('TODOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoGeneral === 'TODOS'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Todos</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Panel de Filtros Avanzados - DISEÑO MODERNO */}
      <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg mb-6 overflow-hidden')}>
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
              </div>
              <div>
                <h3 className={combineClasses('font-semibold', getTextColorClass('primary'))}>Filtros Avanzados</h3>
                <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Refina tu búsqueda con filtros específicos</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={aplicarFiltros}
                className={createComponentClass('button', 'primary', 'md', 'shadow-md hover:shadow-lg flex items-center space-x-2')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Aplicar</span>
              </button>
              <button
                onClick={limpiarFiltros}
                className={createComponentClass('button', 'secondary', 'md', 'shadow-md hover:shadow-lg flex items-center space-x-2')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Limpiar</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Fila 1: Filtros principales más compactos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Buscar</span>
              </label>
              <input
                type="text"
                placeholder="Caso, descripción..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                className={createComponentClass('input', 'default', 'sm')}
              />
            </div>

            <div className="space-y-2">
              <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Prioridad</span>
              </label>
              <select
                value={filtros.prioridad}
                onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
                className={createComponentClass('input', 'default', 'sm')}
              >
                <option value="">Todas</option>
                <option value="Crítica">🔴 Crítica</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Media">🟡 Media</option>
                <option value="Baja">🟢 Baja</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Área Técnica</span>
              </label>
              <select
                value={filtros.areaTecnica}
                onChange={(e) => setFiltros({...filtros, areaTecnica: e.target.value})}
                className={createComponentClass('input', 'default', 'sm')}
              >
                <option value="">Todas</option>
                <option value="Hardware">💻 Hardware</option>
                <option value="Software">💽 Software</option>
                <option value="Redes">🌐 Redes</option>
                <option value="Sistemas">⚙️ Sistemas</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={combineClasses('flex items-center space-x-2 text-sm font-medium', getTextColorClass('primary'))}>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Estado</span>
              </label>
              <select
                value={filtros.estadoEspecifico}
                onChange={(e) => setFiltros({...filtros, estadoEspecifico: e.target.value})}
                className={createComponentClass('input', 'default', 'sm')}
              >
                <option value="">Todos</option>
                {filtros.estadoGeneral === 'ACTIVOS' && (
                  <>
                    <option value="Asignado">🔵 Asignado</option>
                    <option value="En Proceso">🟡 En Proceso</option>
                    <option value="Pendiente">🟠 Pendiente</option>
                  </>
                )}
                {filtros.estadoGeneral === 'RESUELTOS' && (
                  <>
                    <option value="Resuelto">✅ Resuelto</option>
                    <option value="Cerrado">⚫ Cerrado</option>
                  </>
                )}
                {filtros.estadoGeneral === 'TODOS' && (
                  <>
                    <option value="Asignado">🔵 Asignado</option>
                    <option value="En Proceso">🟡 En Proceso</option>
                    <option value="Pendiente">🟠 Pendiente</option>
                    <option value="Resuelto">✅ Resuelto</option>
                    <option value="Cerrado">⚫ Cerrado</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Fila 2: Filtros adicionales en chips compactos */}
          <div className="flex flex-wrap gap-3">
            {/* Técnico */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 min-w-0 flex-shrink-0">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="Técnico..."
                value={filtros.tecnico}
                onChange={(e) => setFiltros({...filtros, tecnico: e.target.value})}
                className="bg-transparent border-none outline-none text-sm min-w-0 flex-1"
              />
            </div>

            {/* Fechas */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
                className="bg-transparent border-none outline-none text-sm"
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros({...filtros, fechaHasta: e.target.value})}
                className="bg-transparent border-none outline-none text-sm"
              />
            </div>

            {/* Filtros específicos para casos resueltos */}
            {(filtros.estadoGeneral === 'RESUELTOS' || filtros.estadoGeneral === 'TODOS') && (
              <>
                <div className="flex items-center space-x-2 bg-yellow-50 rounded-lg px-3 py-2">
                  <span className="text-yellow-500">⭐</span>
                  <select
                    value={filtros.calificacion}
                    onChange={(e) => setFiltros({...filtros, calificacion: e.target.value})}
                    className="bg-transparent border-none outline-none text-sm"
                  >
                    <option value="">Cualquier calificación</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 bg-green-50 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <select
                    value={filtros.slaStatus}
                    onChange={(e) => setFiltros({...filtros, slaStatus: e.target.value})}
                    className="bg-transparent border-none outline-none text-sm"
                  >
                    <option value="">Cualquier SLA</option>
                    <option value="Cumplido">✅ Cumplido</option>
                    <option value="Incumplido">❌ Incumplido</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabla Unificada - DISEÑO MODERNO */}
      <div className={createComponentClass('card', 'default', 'lg', 'shadow-lg overflow-hidden')}>
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className={combineClasses('text-lg font-semibold', getTextColorClass('primary'))}>
                  {filtros.estadoGeneral === 'ACTIVOS' ? 'Incidencias Activas' : 
                   filtros.estadoGeneral === 'RESUELTOS' ? 'Incidencias Resueltas' : 'Todas las Incidencias'}
                </h3>
                <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>
                  {casosFiltrados.length} incidencias encontradas
                </p>
              </div>
            </div>
            
            {/* Indicadores de resumen */}
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {casos.filter(c => c.estadoGeneral === 'ACTIVO').length}
                </div>
                <div className="text-xs text-gray-500">Activas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {casos.filter(c => c.estadoGeneral === 'RESUELTO').length}
                </div>
                <div className="text-xs text-gray-500">Resueltas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {casos.length}
                </div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-r-2 border-blue-300 animate-pulse"></div>
              </div>
              <div>
                <p className={combineClasses('font-medium', getTextColorClass('primary'))}>Cargando incidencias...</p>
                <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Esto solo tomará un momento</p>
              </div>
            </div>
          </div>
        ) : casosFiltrados.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className={combineClasses('font-medium', getTextColorClass('primary'))}>No se encontraron incidencias</p>
                <p className={combineClasses('text-sm', getTextColorClass('secondary'))}>Ajusta los filtros para obtener resultados diferentes</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className={combineClasses('px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-200', getTextColorClass('secondary'))}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                      </svg>
                      <span>Incidencia</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Solicitante</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Descripción</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span>Prioridad</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Estado</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Técnico</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{filtros.estadoGeneral === 'RESUELTOS' ? 'Tiempo/SLA' : 'Días Abierto'}</span>
                    </div>
                  </th>
                  {(filtros.estadoGeneral === 'RESUELTOS' || filtros.estadoGeneral === 'TODOS') && (
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span>Calificación</span>
                      </div>
                    </th>
                  )}
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                      <span>Acciones</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {casosFiltrados.map((caso, index) => (
                  <tr 
                    key={caso.id} 
                    className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md group`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          caso.estadoGeneral === 'ACTIVO' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className={combineClasses('text-sm font-semibold group-hover:text-blue-600 transition-colors', getTextColorClass('primary'))}>
                            {caso.numeroCaso}
                          </div>
                          <div className={combineClasses('text-xs flex items-center space-x-1', getTextColorClass('secondary'))}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{caso.fechaRegistro}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">

                        <div>
                          <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                            {caso.solicitante}
                          </div>
                          <div className={combineClasses('text-xs flex items-center space-x-1', getTextColorClass('secondary'))}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{caso.dependencia}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className={combineClasses('text-sm truncate mb-1', getTextColorClass('primary'))} title={caso.descripcion}>
                          {caso.descripcion}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            caso.areaTecnica === 'Hardware' ? 'bg-blue-100 text-blue-800' :
                            caso.areaTecnica === 'Software' ? 'bg-purple-100 text-purple-800' :
                            caso.areaTecnica === 'Redes' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {caso.areaTecnica === 'Hardware' ? '💻' :
                             caso.areaTecnica === 'Software' ? '💽' :
                             caso.areaTecnica === 'Redes' ? '🌐' : '⚙️'}
                            <span className="ml-1">{caso.areaTecnica}</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getPrioridadColor(caso.prioridad)}`}>
                        {caso.prioridad === 'Crítica' ? '🔴' :
                         caso.prioridad === 'Alta' ? '🟠' :
                         caso.prioridad === 'Media' ? '🟡' : '🟢'}
                        <span className="ml-1">{caso.prioridad}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getEstadoColor(caso.estado, caso.estadoGeneral)}`}>
                        {caso.estadoGeneral === 'RESUELTO' ? 
                          (caso.estado === 'Cerrado' ? '⚫' : '✅') :
                          (caso.estado === 'En Proceso' ? '🟡' : 
                           caso.estado === 'Asignado' ? '🔵' : '🟠')
                        }
                        <span className="ml-1">{caso.estado}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">

                        <div className={combineClasses('text-sm font-medium', getTextColorClass('primary'))}>
                          {caso.tecnicoAsignado}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {caso.estadoGeneral === 'RESUELTO' ? (
                        <div className="space-y-1">
                          <div className={combineClasses('text-sm font-semibold flex items-center space-x-1', getTextColorClass('primary'))}>
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{caso.tiempoResolucion}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full shadow-sm ${getSlaColor(caso.slaStatus)}`}>
                            {caso.slaStatus === 'Cumplido' ? '✅' : '❌'}
                            <span className="ml-1">{caso.slaStatus}</span>
                          </span>
                        </div>
                      ) : (
                        <div className={`flex items-center space-x-2`}>
                          <div className={`w-2 h-2 rounded-full ${caso.diasAbierto > 3 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                          <span className={combineClasses('text-sm font-semibold', caso.diasAbierto > 3 ? 'text-red-600' : getTextColorClass('primary'))}>
                            {caso.diasAbierto} días
                          </span>
                        </div>
                      )}
                    </td>
                    {(filtros.estadoGeneral === 'RESUELTOS' || filtros.estadoGeneral === 'TODOS') && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {caso.estadoGeneral === 'RESUELTO' ? (
                          <div className="flex items-center space-x-1">
                            {renderCalificacion(caso.calificacionUsuario)}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => mostrarDetalle(caso)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Ver detalle"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => mostrarSeguimiento(caso)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Ver seguimiento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                        {caso.estadoGeneral === 'RESUELTO' && caso.tieneEncuesta && (
                          <button 
                            onClick={() => mostrarEncuesta(caso)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Ver encuesta"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modales */}
      <DetalleModal />
      <SeguimientoModal />
      <EncuestaModal />
    </div>
  );
};

export default MisIncidencias;