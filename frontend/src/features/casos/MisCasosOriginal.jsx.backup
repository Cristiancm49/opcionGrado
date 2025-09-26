import { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import Swal from 'sweetalert2';

const MisCasos = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [casos, setCasos] = useState([]);
  const [casosFiltrados, setCasosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [showGestionModal, setShowGestionModal] = useState(false);
  const [showDiagnosticoModal, setShowDiagnosticoModal] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    // ⭐ FILTRO PRINCIPAL PARA TÉCNICOS - Asignados por defecto
    estadoTecnico: 'ASIGNADOS', // ASIGNADOS, EN_PROCESO, PENDIENTES, RESUELTOS, TODOS
    prioridad: '',
    areaTecnica: '',
    slaStatus: '',
    fechaDesde: '',
    fechaHasta: '',
    solicitante: '',
    tipoTrabajo: ''
  });

  // Datos específicos para técnicos - casos asignados y gestionados
  useEffect(() => {
    const cargarCasos = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const casosParaTecnicos = [
        // ====== CASOS ASIGNADOS ======
        {
          id: 1,
          numeroCaso: 'CAS-001234',
          fechaRegistro: '2025-01-15',
          fechaAsignacion: '2025-01-15',
          fechaLimite: '2025-01-17',
          fechaUltimaActualizacion: '2025-01-18',
          solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
          dependencia: 'OFICINA DE PLANEACION',
          contacto: 'diego.quesada@uniamazonia.edu.co',
          telefono: '123456789',
          descripcion: 'Computador no enciende en oficina 205, presenta problema eléctrico',
          prioridad: 'Alta',
          areaTecnica: 'Hardware',
          tipoTrabajo: 'Reparación',
          estado: 'Asignado',
          estadoTecnico: 'ASIGNADO',
          tecnicoAsignado: 'Juan Pérez', // Usuario actual (técnico logueado)
          diasAsignado: 3,
          horasEstimadas: 4,
          horasTrabajadas: 0,
          slaStatus: 'En Tiempo',
          prioridadSla: 4, // horas límite
          ubicacion: 'Edificio A - Piso 2 - Oficina 205',
          elementoAfectado: 'Computador HP ProDesk 400',
          diagnostico: null,
          solucionPropuesta: null,
          observacionesTecnico: null,
          requiereConsumibles: false,
          consumiblesRequeridos: [],
          evidencias: [],
          proximaAccion: 'Diagnóstico inicial pendiente'
        },
        {
          id: 2,
          numeroCaso: 'CAS-001235',
          fechaRegistro: '2025-01-14',
          fechaAsignacion: '2025-01-14',
          fechaLimite: '2025-01-18',
          fechaUltimaActualizacion: '2025-01-18',
          solicitante: 'MARIA GONZALEZ LOPEZ',
          dependencia: 'RECURSOS HUMANOS',
          contacto: 'maria.gonzalez@uniamazonia.edu.co',
          telefono: '987654321',
          descripcion: 'Problema con impresora en recepción, no imprime documentos',
          prioridad: 'Media',
          areaTecnica: 'Hardware',
          tipoTrabajo: 'Reparación',
          estado: 'En Proceso',
          estadoTecnico: 'EN_PROCESO',
          tecnicoAsignado: 'Juan Pérez',
          diasAsignado: 4,
          horasEstimadas: 2,
          horasTrabajadas: 1.5,
          slaStatus: 'En Tiempo',
          prioridadSla: 24,
          ubicacion: 'Edificio Principal - Recepción',
          elementoAfectado: 'Impresora Canon ImageRunner',
          diagnostico: 'Atasco de papel en el alimentador principal',
          solucionPropuesta: 'Limpieza de rodillos y reemplazo de papel',
          observacionesTecnico: 'Se detectó papel húmedo en el alimentador',
          requiereConsumibles: true,
          consumiblesRequeridos: ['Papel tamaño carta', 'Kit de limpieza'],
          evidencias: ['foto_atasco.jpg'],
          proximaAccion: 'Aplicar solución propuesta'
        },
        {
          id: 3,
          numeroCaso: 'CAS-001236',
          fechaRegistro: '2025-01-13',
          fechaAsignacion: '2025-01-13',
          fechaLimite: '2025-01-14',
          fechaUltimaActualizacion: '2025-01-17',
          solicitante: 'CARLOS RIVERA MORA',
          dependencia: 'SISTEMAS',
          contacto: 'carlos.rivera@uniamazonia.edu.co',
          telefono: '456789123',
          descripcion: 'Problema de conectividad a internet en toda la oficina',
          prioridad: 'Crítica',
          areaTecnica: 'Redes',
          tipoTrabajo: 'Configuración',
          estado: 'Pendiente',
          estadoTecnico: 'PENDIENTE',
          tecnicoAsignado: 'Juan Pérez',
          diasAsignado: 5,
          horasEstimadas: 6,
          horasTrabajadas: 3,
          slaStatus: 'Vencido',
          prioridadSla: 2,
          ubicacion: 'Edificio B - Piso 1',
          elementoAfectado: 'Switch de red principal',
          diagnostico: 'Configuración incorrecta en VLAN después de actualización',
          solucionPropuesta: 'Reconfigurar VLANs y actualizar firmware del switch',
          observacionesTecnico: 'Requiere coordinación con proveedor de internet',
          requiereConsumibles: false,
          consumiblesRequeridos: [],
          evidencias: ['log_switch.txt', 'config_backup.cfg'],
          proximaAccion: 'Esperar ventana de mantenimiento aprobada'
        },
        
        // ====== CASOS RESUELTOS POR EL TÉCNICO ======
        {
          id: 4,
          numeroCaso: 'CAS-001200',
          fechaRegistro: '2025-01-10',
          fechaAsignacion: '2025-01-10',
          fechaLimite: '2025-01-13',
          fechaResolucion: '2025-01-12',
          fechaUltimaActualizacion: '2025-01-12',
          solicitante: 'ANA JIMENEZ TORRES',
          dependencia: 'CONTABILIDAD',
          contacto: 'ana.jimenez@uniamazonia.edu.co',
          telefono: '789123456',
          descripcion: 'Computador lento, requiere optimización',
          prioridad: 'Baja',
          areaTecnica: 'Hardware',
          tipoTrabajo: 'Mantenimiento',
          estado: 'Resuelto',
          estadoTecnico: 'RESUELTO',
          tecnicoAsignado: 'Juan Pérez',
          diasAsignado: null,
          horasEstimadas: 3,
          horasTrabajadas: 2.5,
          slaStatus: 'Cumplido',
          prioridadSla: 72,
          ubicacion: 'Edificio Principal - Contabilidad',
          elementoAfectado: 'Computador Dell OptiPlex 7090',
          diagnostico: 'Disco duro fragmentado y programas innecesarios instalados',
          solucionPropuesta: 'Desfragmentación y limpieza de software',
          solucionAplicada: 'Se realizó desfragmentación completa, limpieza de archivos temporales, desinstalación de programas innecesarios y actualización de drivers',
          observacionesTecnico: 'Se recomendó al usuario realizar limpiezas periódicas',
          requiereConsumibles: false,
          consumiblesRequeridos: [],
          evidencias: ['before_after_performance.png'],
          proximaAccion: 'Seguimiento en 30 días',
          calificacionUsuario: 5,
          comentarioUsuario: 'Excelente trabajo, el computador funciona perfecto ahora'
        }
      ];
      
      setCasos(casosParaTecnicos);
      // Aplicar filtro inicial (solo asignados)
      const casosAsignados = casosParaTecnicos.filter(caso => caso.estadoTecnico === 'ASIGNADO');
      setCasosFiltrados(casosAsignados);
      setLoading(false);
    };

    cargarCasos();
  }, []);

  const aplicarFiltros = () => {
    let resultado = [...casos];

    // ⭐ FILTRO PRINCIPAL POR ESTADO TÉCNICO
    if (filtros.estadoTecnico === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (filtros.estadoTecnico === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (filtros.estadoTecnico === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (filtros.estadoTecnico === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
    }
    // Si es 'TODOS', no filtramos

    // Resto de filtros
    if (filtros.busqueda) {
      resultado = resultado.filter(caso => 
        caso.numeroCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        caso.solicitante.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        (caso.diagnostico && caso.diagnostico.toLowerCase().includes(filtros.busqueda.toLowerCase()))
      );
    }

    if (filtros.prioridad) {
      resultado = resultado.filter(caso => caso.prioridad === filtros.prioridad);
    }

    if (filtros.areaTecnica) {
      resultado = resultado.filter(caso => caso.areaTecnica === filtros.areaTecnica);
    }

    if (filtros.slaStatus) {
      resultado = resultado.filter(caso => caso.slaStatus === filtros.slaStatus);
    }

    if (filtros.tipoTrabajo) {
      resultado = resultado.filter(caso => caso.tipoTrabajo === filtros.tipoTrabajo);
    }

    if (filtros.solicitante) {
      resultado = resultado.filter(caso => 
        caso.solicitante.toLowerCase().includes(filtros.solicitante.toLowerCase()) ||
        caso.dependencia.toLowerCase().includes(filtros.solicitante.toLowerCase())
      );
    }

    if (filtros.fechaDesde) {
      resultado = resultado.filter(caso => 
        new Date(caso.fechaAsignacion) >= new Date(filtros.fechaDesde)
      );
    }

    if (filtros.fechaHasta) {
      resultado = resultado.filter(caso => 
        new Date(caso.fechaAsignacion) <= new Date(filtros.fechaHasta)
      );
    }

    setCasosFiltrados(resultado);
  };

  const limpiarFiltros = () => {
    const estadoActual = filtros.estadoTecnico;
    setFiltros({
      busqueda: '',
      estadoTecnico: estadoActual,
      prioridad: '',
      areaTecnica: '',
      slaStatus: '',
      fechaDesde: '',
      fechaHasta: '',
      solicitante: '',
      tipoTrabajo: ''
    });
    
    // Reaplica solo el filtro de estado técnico
    let resultado = [...casos];
    if (estadoActual === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (estadoActual === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (estadoActual === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (estadoActual === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
    }
    setCasosFiltrados(resultado);
  };

  const cambiarEstadoTecnico = (nuevoEstado) => {
    setFiltros(prev => ({ ...prev, estadoTecnico: nuevoEstado }));
    
    let resultado = [...casos];
    if (nuevoEstado === 'ASIGNADOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'ASIGNADO');
    } else if (nuevoEstado === 'EN_PROCESO') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'EN_PROCESO');
    } else if (nuevoEstado === 'PENDIENTES') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'PENDIENTE');
    } else if (nuevoEstado === 'RESUELTOS') {
      resultado = resultado.filter(caso => caso.estadoTecnico === 'RESUELTO');
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

  const getEstadoTecnicoColor = (estadoTecnico) => {
    switch(estadoTecnico) {
      case 'ASIGNADO': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EN_PROCESO': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PENDIENTE': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'RESUELTO': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSlaColor = (slaStatus) => {
    switch(slaStatus) {
      case 'En Tiempo': return 'bg-green-100 text-green-800 border-green-200';
      case 'En Riesgo': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Vencido': return 'bg-red-100 text-red-800 border-red-200';
      case 'Cumplido': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const mostrarDetalle = (caso) => {
    setCasoSeleccionado(caso);
    setShowDetalleModal(true);
  };

  const mostrarSeguimiento = (caso) => {
    setCasoSeleccionado(caso);
    setShowSeguimientoModal(true);
  };

  const mostrarGestion = (caso) => {
    setCasoSeleccionado(caso);
    setShowGestionModal(true);
  };

  const mostrarDiagnostico = (caso) => {
    setCasoSeleccionado(caso);
    setShowDiagnosticoModal(true);
  };

  const aceptarCaso = (caso) => {
    Swal.fire({
      title: '¿Aceptar caso?',
      text: `¿Confirma que acepta el caso ${caso.numeroCaso}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Caso aceptado',
          text: 'El caso ha sido marcado como "En Proceso"',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const marcarResuelto = (caso) => {
    Swal.fire({
      title: '¿Marcar como resuelto?',
      text: `¿El caso ${caso.numeroCaso} ha sido completamente resuelto?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, está resuelto',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Caso resuelto',
          text: 'El caso ha sido marcado como resuelto exitosamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const escalarCaso = (caso) => {
    Swal.fire({
      title: 'Escalar caso',
      text: 'Seleccione el motivo de escalamiento:',
      input: 'select',
      inputOptions: {
        'falta_recursos': 'Falta de recursos/herramientas',
        'fuera_conocimiento': 'Fuera de mi área de conocimiento',
        'requiere_aprobacion': 'Requiere aprobación superior',
        'otro': 'Otro motivo'
      },
      showCancelButton: true,
      confirmButtonText: 'Escalar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Caso escalado',
          text: 'El caso ha sido escalado al supervisor',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  // Modal de Detalle (versión técnico)
  const DetalleModal = () => {
    if (!showDetalleModal || !casoSeleccionado) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Caso Técnico - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowDetalleModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del caso */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Información del Caso
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
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
                        Contacto
                      </label>
                      <p className={`text-sm ${themeClasses.primaryText}`}>
                        📧 {casoSeleccionado.contacto}
                      </p>
                      <p className={`text-sm ${themeClasses.primaryText}`}>
                        📞 {casoSeleccionado.telefono}
                      </p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Ubicación
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {casoSeleccionado.ubicacion}
                      </p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Elemento Afectado
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {casoSeleccionado.elementoAfectado}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Descripción del Problema
                  </h3>
                  <p className={`${themeClasses.primaryText} p-3 bg-gray-50 rounded`}>
                    {casoSeleccionado.descripcion}
                  </p>
                </div>

                {casoSeleccionado.diagnostico && (
                  <div className="border rounded-lg p-4">
                    <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                      Diagnóstico Técnico
                    </h3>
                    <p className={`${themeClasses.primaryText} p-3 bg-blue-50 rounded`}>
                      {casoSeleccionado.diagnostico}
                    </p>
                  </div>
                )}

                {casoSeleccionado.solucionPropuesta && (
                  <div className="border rounded-lg p-4">
                    <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                      Solución Propuesta
                    </h3>
                    <p className={`${themeClasses.primaryText} p-3 bg-green-50 rounded`}>
                      {casoSeleccionado.solucionPropuesta}
                    </p>
                  </div>
                )}

                {casoSeleccionado.solucionAplicada && (
                  <div className="border rounded-lg p-4">
                    <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                      Solución Aplicada ✅
                    </h3>
                    <p className={`${themeClasses.primaryText} p-3 bg-green-100 rounded`}>
                      {casoSeleccionado.solucionAplicada}
                    </p>
                  </div>
                )}
              </div>

              {/* Panel lateral de información técnica */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Estado del Trabajo
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Estado Actual
                      </label>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getEstadoTecnicoColor(casoSeleccionado.estadoTecnico)}`}>
                        {casoSeleccionado.estado}
                      </span>
                    </div>
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
                        SLA
                      </label>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getSlaColor(casoSeleccionado.slaStatus)}`}>
                        {casoSeleccionado.slaStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Tiempo de Trabajo
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Tiempo Estimado
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {casoSeleccionado.horasEstimadas} horas
                      </p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Tiempo Trabajado
                      </label>
                      <p className={`${themeClasses.primaryText}`}>
                        {casoSeleccionado.horasTrabajadas} horas
                      </p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                        Fecha Límite
                      </label>
                      <p className={`${casoSeleccionado.slaStatus === 'Vencido' ? 'text-red-600' : themeClasses.primaryText}`}>
                        {casoSeleccionado.fechaLimite}
                      </p>
                    </div>
                  </div>
                </div>

                {casoSeleccionado.requiereConsumibles && (
                  <div className="border rounded-lg p-4">
                    <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                      Consumibles Requeridos
                    </h3>
                    <ul className="space-y-1">
                      {casoSeleccionado.consumiblesRequeridos.map((item, index) => (
                        <li key={index} className={`text-sm ${themeClasses.primaryText} flex items-center space-x-2`}>
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border rounded-lg p-4">
                  <h3 className={`font-semibold mb-4 ${themeClasses.primaryText}`}>
                    Próxima Acción
                  </h3>
                  <p className={`text-sm ${themeClasses.primaryText} p-3 bg-yellow-50 rounded`}>
                    {casoSeleccionado.proximaAccion}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => mostrarSeguimiento(casoSeleccionado)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Seguimiento
              </button>
              <button
                onClick={() => mostrarDiagnostico(casoSeleccionado)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Gestionar Diagnóstico
              </button>
              <button
                onClick={() => mostrarGestion(casoSeleccionado)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Gestionar Caso
              </button>
              <button
                onClick={() => setShowDetalleModal(false)}
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

  // Modal de Gestión (cambiar estados, escalar, etc.)
  const GestionModal = () => {
    if (!showGestionModal || !casoSeleccionado) return null;

    const [nuevoEstado, setNuevoEstado] = useState(casoSeleccionado.estado);
    const [observaciones, setObservaciones] = useState('');
    const [horasTrabajo, setHorasTrabajo] = useState('');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Gestionar Caso - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowGestionModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Cambiar Estado
                </label>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300`}
                >
                  <option value="Asignado">🔵 Asignado</option>
                  <option value="En Proceso">🟡 En Proceso</option>
                  <option value="Pendiente">🟠 Pendiente</option>
                  <option value="Resuelto">✅ Resuelto</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Registrar Horas Trabajadas
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={horasTrabajo}
                  onChange={(e) => setHorasTrabajo(e.target.value)}
                  placeholder="Ej: 2.5"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white border-gray-300`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Observaciones del Técnico
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={4}
                  placeholder="Describa el trabajo realizado, problemas encontrados, etc..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className={`font-semibold mb-3 ${themeClasses.primaryText}`}>
                  Acciones Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => aceptarCaso(casoSeleccionado)}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>✋</span>
                    <span>Aceptar Caso</span>
                  </button>
                  <button
                    onClick={() => marcarResuelto(casoSeleccionado)}
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <span>✅</span>
                    <span>Marcar Resuelto</span>
                  </button>
                  <button
                    onClick={() => escalarCaso(casoSeleccionado)}
                    className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  >
                    <span>⬆️</span>
                    <span>Escalar Caso</span>
                  </button>
                  <button
                    className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <span>📞</span>
                    <span>Contactar Usuario</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setShowGestionModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Diagnóstico
  const DiagnosticoModal = () => {
    if (!showDiagnosticoModal || !casoSeleccionado) return null;

    const [diagnostico, setDiagnostico] = useState(casoSeleccionado.diagnostico || '');
    const [solucionPropuesta, setSolucionPropuesta] = useState(casoSeleccionado.solucionPropuesta || '');
    const [requiereConsumibles, setRequiereConsumibles] = useState(casoSeleccionado.requiereConsumibles);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Diagnóstico Técnico - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowDiagnosticoModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Diagnóstico del Problema
                </label>
                <textarea
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  rows={4}
                  placeholder="Describa detalladamente el problema identificado..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                  Solución Propuesta
                </label>
                <textarea
                  value={solucionPropuesta}
                  onChange={(e) => setSolucionPropuesta(e.target.value)}
                  rows={4}
                  placeholder="Describa la solución propuesta paso a paso..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="requiereConsumibles"
                  checked={requiereConsumibles}
                  onChange={(e) => setRequiereConsumibles(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="requiereConsumibles" className={`text-sm font-medium ${themeClasses.primaryText}`}>
                  Requiere consumibles o materiales adicionales
                </label>
              </div>

              {requiereConsumibles && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
                    Lista de Consumibles Requeridos
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Liste los consumibles necesarios (uno por línea)..."
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300`}
                  />
                </div>
              )}

              <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className={`font-semibold mb-2 ${themeClasses.primaryText}`}>
                  💡 Plantillas de Diagnóstico
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                    🖥️ Problema de Hardware
                  </button>
                  <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                    💽 Problema de Software
                  </button>
                  <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                    🌐 Problema de Red
                  </button>
                  <button className="text-left p-2 text-sm bg-white rounded border hover:bg-gray-50">
                    🔧 Mantenimiento Preventivo
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Guardar Diagnóstico
              </button>
              <button
                onClick={() => setShowDiagnosticoModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal de Seguimiento (igual que en incidencias pero enfocado en trabajo técnico)
  const SeguimientoModal = () => {
    if (!showSeguimientoModal || !casoSeleccionado) return null;

    const historialTecnico = [
      {
        fecha: casoSeleccionado.fechaUltimaActualizacion + ' 15:30',
        usuario: casoSeleccionado.tecnicoAsignado,
        accion: 'Trabajo en Progreso',
        detalle: casoSeleccionado.observacionesTecnico || 'Continuando con el diagnóstico del problema',
        tipo: 'trabajo'
      },
      {
        fecha: casoSeleccionado.fechaAsignacion + ' 10:15',
        usuario: 'Sistema',
        accion: 'Caso Asignado',
        detalle: `Caso asignado al técnico ${casoSeleccionado.tecnicoAsignado}`,
        tipo: 'sistema'
      },
      {
        fecha: casoSeleccionado.fechaRegistro + ' 09:45',
        usuario: casoSeleccionado.solicitante,
        accion: 'Caso Creado',
        detalle: 'Incidencia reportada por el usuario',
        tipo: 'creacion'
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Seguimiento Técnico - {casoSeleccionado.numeroCaso}
              </h2>
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {historialTecnico.map((evento, index) => (
                <div key={index} className={`border-l-4 pl-4 pb-4 ${
                  evento.tipo === 'trabajo' ? 'border-blue-500' :
                  evento.tipo === 'sistema' ? 'border-green-500' : 'border-gray-500'
                } ${index !== historialTecnico.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${themeClasses.primaryText} flex items-center space-x-2`}>
                        <span>{
                          evento.tipo === 'trabajo' ? '🔧' :
                          evento.tipo === 'sistema' ? '⚙️' : '📝'
                        }</span>
                        <span>{evento.accion}</span>
                      </h3>
                      <p className={`text-sm ${themeClasses.secondaryText} mb-2`}>
                        {evento.fecha} - {evento.usuario}
                      </p>
                      <p className={`${themeClasses.primaryText}`}>
                        {evento.detalle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className={`font-semibold mb-2 ${themeClasses.primaryText}`}>
                📊 Resumen de Tiempo
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {casoSeleccionado.horasEstimadas}h
                  </div>
                  <div className="text-xs text-gray-500">Estimado</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {casoSeleccionado.horasTrabajadas}h
                  </div>
                  <div className="text-xs text-gray-500">Trabajado</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${
                    (casoSeleccionado.horasEstimadas - casoSeleccionado.horasTrabajadas) < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {(casoSeleccionado.horasEstimadas - casoSeleccionado.horasTrabajadas).toFixed(1)}h
                  </div>
                  <div className="text-xs text-gray-500">Restante</div>
                </div>
              </div>
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

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${themeClasses.primaryText}`}>
          Mis Casos Técnicos
        </h1>
        <p className={themeClasses.secondaryText}>
          Gestione sus casos asignados y registre el progreso de su trabajo técnico
        </p>
      </div>

      {/* ⭐ SELECTOR PRINCIPAL PARA TÉCNICOS - MODERNO */}
      <div className={`${themeClasses.sidebarBg} rounded-xl p-4 shadow-lg mb-6 border border-gray-200`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className={`font-semibold ${themeClasses.primaryText}`}>Estado del Trabajo</h3>
              <p className={`text-sm ${themeClasses.secondaryText}`}>Filtra casos por estado de trabajo técnico</p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => cambiarEstadoTecnico('ASIGNADOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoTecnico === 'ASIGNADOS'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Asignados</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoTecnico === 'ASIGNADO').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoTecnico('EN_PROCESO')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoTecnico === 'EN_PROCESO'
                  ? 'bg-yellow-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>En Proceso</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoTecnico === 'EN_PROCESO').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoTecnico('PENDIENTES')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoTecnico === 'PENDIENTES'
                  ? 'bg-orange-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Pendientes</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoTecnico === 'PENDIENTE').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoTecnico('RESUELTOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoTecnico === 'RESUELTOS'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              <span>Resueltos</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {casos.filter(c => c.estadoTecnico === 'RESUELTO').length}
              </span>
            </button>
            <button
              onClick={() => cambiarEstadoTecnico('TODOS')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                filtros.estadoTecnico === 'TODOS'
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

      {/* Panel de Filtros Técnicos - DISEÑO MODERNO */}
      <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg mb-6 border border-gray-200 overflow-hidden`}>
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-600 rounded-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold ${themeClasses.primaryText}`}>Filtros Técnicos</h3>
                <p className={`text-sm ${themeClasses.secondaryText}`}>Filtra casos por criterios específicos de trabajo</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={aplicarFiltros}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Filtrar</span>
              </button>
              <button
                onClick={limpiarFiltros}
                className={`px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 border`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Limpiar</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${themeClasses.primaryText}`}>
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Buscar</span>
              </label>
              <input
                type="text"
                placeholder="Caso, problema, diagnóstico..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white border-gray-300`}
              />
            </div>

            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${themeClasses.primaryText}`}>
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Prioridad</span>
              </label>
              <select
                value={filtros.prioridad}
                onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white border-gray-300`}
              >
                <option value="">Todas</option>
                <option value="Crítica">🔴 Crítica</option>
                <option value="Alta">🟠 Alta</option>
                <option value="Media">🟡 Media</option>
                <option value="Baja">🟢 Baja</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${themeClasses.primaryText}`}>
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>SLA</span>
              </label>
              <select
                value={filtros.slaStatus}
                onChange={(e) => setFiltros({...filtros, slaStatus: e.target.value})}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white border-gray-300`}
              >
                <option value="">Todos</option>
                <option value="Vencido">❌ Vencido</option>
                <option value="En Riesgo">⚠️ En Riesgo</option>
                <option value="En Tiempo">✅ En Tiempo</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`flex items-center space-x-2 text-sm font-medium ${themeClasses.primaryText}`}>
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tipo de Trabajo</span>
              </label>
              <select
                value={filtros.tipoTrabajo}
                onChange={(e) => setFiltros({...filtros, tipoTrabajo: e.target.value})}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white border-gray-300`}
              >
                <option value="">Todos</option>
                <option value="Reparación">🔧 Reparación</option>
                <option value="Mantenimiento">🛠️ Mantenimiento</option>
                <option value="Instalación">📦 Instalación</option>
                <option value="Configuración">⚙️ Configuración</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 min-w-0 flex-shrink-0">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="Solicitante..."
                value={filtros.solicitante}
                onChange={(e) => setFiltros({...filtros, solicitante: e.target.value})}
                className="bg-transparent border-none outline-none text-sm min-w-0 flex-1"
              />
            </div>

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
          </div>
        </div>
      </div>

      {/* Tabla de Casos Técnicos - DISEÑO PREMIUM */}
      <div className={`${themeClasses.sidebarBg} rounded-xl shadow-lg overflow-hidden border border-gray-200`}>
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${themeClasses.primaryText}`}>
                  {filtros.estadoTecnico === 'ASIGNADOS' ? 'Casos Asignados' : 
                   filtros.estadoTecnico === 'EN_PROCESO' ? 'Casos en Proceso' : 
                   filtros.estadoTecnico === 'PENDIENTES' ? 'Casos Pendientes' :
                   filtros.estadoTecnico === 'RESUELTOS' ? 'Casos Resueltos' : 'Todos los Casos'}
                </h3>
                <p className={`text-sm ${themeClasses.secondaryText}`}>
                  {casosFiltrados.length} casos en tu cola de trabajo
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {casos.filter(c => c.slaStatus === 'Vencido').length}
                </div>
                <div className="text-xs text-gray-500">Vencidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {casos.filter(c => c.estadoTecnico === 'EN_PROCESO').length}
                </div>
                <div className="text-xs text-gray-500">En Proceso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {casos.filter(c => c.estadoTecnico === 'RESUELTO').length}
                </div>
                <div className="text-xs text-gray-500">Resueltos</div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-r-2 border-orange-300 animate-pulse"></div>
              </div>
              <div>
                <p className={`font-medium ${themeClasses.primaryText}`}>Cargando casos técnicos...</p>
                <p className={`text-sm ${themeClasses.secondaryText}`}>Preparando su cola de trabajo</p>
              </div>
            </div>
          </div>
        ) : casosFiltrados.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className={`font-medium ${themeClasses.primaryText}`}>No hay casos en esta cola</p>
                <p className={`text-sm ${themeClasses.secondaryText}`}>Ajusta los filtros o revisa otras categorías</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                      </svg>
                      <span>Caso</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <span>Problema</span>
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
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Estado</span>
                    </div>
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${themeClasses.secondaryText} border-b border-gray-200`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Tiempo/SLA</span>
                    </div>
                  </th>
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
                    className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:shadow-md group ${caso.slaStatus === 'Vencido' ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          caso.estadoTecnico === 'ASIGNADO' ? 'bg-blue-100 text-blue-600' :
                          caso.estadoTecnico === 'EN_PROCESO' ? 'bg-yellow-100 text-yellow-600' :
                          caso.estadoTecnico === 'PENDIENTE' ? 'bg-orange-100 text-orange-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className={`text-sm font-semibold ${themeClasses.primaryText} group-hover:text-orange-600 transition-colors`}>
                            {caso.numeroCaso}
                          </div>
                          <div className={`text-xs ${themeClasses.secondaryText} flex items-center space-x-1`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Asignado: {caso.fechaAsignacion}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {caso.solicitante.split(' ')[0][0]}{caso.solicitante.split(' ')[1] ? caso.solicitante.split(' ')[1][0] : ''}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${themeClasses.primaryText}`}>
                            {caso.solicitante}
                          </div>
                          <div className={`text-xs ${themeClasses.secondaryText} flex items-center space-x-1`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{caso.dependencia}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`max-w-xs`}>
                        <p className={`text-sm ${themeClasses.primaryText} truncate mb-1`} title={caso.descripcion}>
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
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700`}>
                            {caso.tipoTrabajo}
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
                      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getEstadoTecnicoColor(caso.estadoTecnico)}`}>
                        {caso.estadoTecnico === 'ASIGNADO' ? '🔵' :
                         caso.estadoTecnico === 'EN_PROCESO' ? '🟡' :
                         caso.estadoTecnico === 'PENDIENTE' ? '🟠' : '✅'}
                        <span className="ml-1">{caso.estado}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className={`text-sm font-semibold ${themeClasses.primaryText} flex items-center space-x-1`}>
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{caso.horasTrabajadas}h / {caso.horasEstimadas}h</span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full shadow-sm ${getSlaColor(caso.slaStatus)}`}>
                          {caso.slaStatus === 'En Tiempo' ? '✅' :
                           caso.slaStatus === 'En Riesgo' ? '⚠️' :
                           caso.slaStatus === 'Vencido' ? '❌' : '🔵'}
                          <span className="ml-1">{caso.slaStatus}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => mostrarDetalle(caso)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Ver detalle completo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => mostrarDiagnostico(caso)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Gestionar diagnóstico"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => mostrarGestion(caso)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Gestionar caso"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => mostrarSeguimiento(caso)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Ver seguimiento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                        {caso.estadoTecnico === 'ASIGNADO' && (
                          <button 
                            onClick={() => aceptarCaso(caso)}
                            className="p-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Aceptar caso"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                        {(caso.estadoTecnico === 'EN_PROCESO' || caso.estadoTecnico === 'PENDIENTE') && (
                          <button 
                            onClick={() => marcarResuelto(caso)}
                            className="p-2 text-green-700 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Marcar como resuelto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      <GestionModal />
      <DiagnosticoModal />
      <SeguimientoModal />
    </div>
  );
};

export default MisCasos;