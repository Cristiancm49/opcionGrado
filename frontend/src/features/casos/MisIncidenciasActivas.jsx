import { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import Swal from 'sweetalert2';

const MisIncidenciasActivas = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();
  
  const [incidencias, setIncidencias] = useState([]);
  const [incidenciasFiltradas, setIncidenciasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    prioridad: '',
    areaTecnica: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: '',
    tecnico: ''
  });

  // Simular carga de datos
  useEffect(() => {
    const cargarIncidencias = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const datosSimulados = [
        {
          id: 1,
          numeroCaso: 'INC-001234',
          fechaRegistro: '2025-01-15',
          fechaModificacion: '2025-01-17',
          solicitante: 'DIEGO FERNANDO QUESADA PEÑA',
          dependencia: 'OFICINA DE PLANEACION',
          descripcion: 'Computador no enciende en oficina 205, presenta problema eléctrico',
          prioridad: 'Alta',
          areaTecnica: 'Hardware',
          estado: 'En Proceso',
          tecnicoAsignado: 'Juan Pérez',
          diasAbierto: 3,
          ubicacion: 'Edificio A - Piso 2 - Oficina 205',
          elementoAfectado: 'Computador HP ProDesk 400',
          observaciones: 'Se reportó olor a quemado'
        },
        {
          id: 2,
          numeroCaso: 'INC-001235',
          fechaRegistro: '2025-01-14',
          fechaModificacion: '2025-01-16',
          solicitante: 'MARIA GONZALEZ LOPEZ',
          dependencia: 'RECURSOS HUMANOS',
          descripcion: 'Problema con impresora en recepción, no imprime documentos',
          prioridad: 'Media',
          areaTecnica: 'Hardware',
          estado: 'Asignado',
          tecnicoAsignado: 'María González',
          diasAbierto: 4,
          ubicacion: 'Edificio Principal - Recepción',
          elementoAfectado: 'Impresora Canon ImageRunner',
          observaciones: 'Presenta mensaje de error E000001'
        },
        {
          id: 3,
          numeroCaso: 'INC-001236',
          fechaRegistro: '2025-01-13',
          fechaModificacion: '2025-01-18',
          solicitante: 'CARLOS RIVERA MORA',
          dependencia: 'SISTEMAS',
          descripcion: 'Problema de conectividad a internet en toda la oficina',
          prioridad: 'Crítica',
          areaTecnica: 'Redes',
          estado: 'Pendiente',
          tecnicoAsignado: 'Luis Martínez',
          diasAbierto: 5,
          ubicacion: 'Edificio B - Piso 1',
          elementoAfectado: 'Switch de red principal',
          observaciones: 'Afecta a 15 usuarios'
        }
      ];
      
      setIncidencias(datosSimulados);
      setIncidenciasFiltradas(datosSimulados);
      setLoading(false);
    };

    cargarIncidencias();
  }, []);

  const aplicarFiltros = () => {
    let resultado = [...incidencias];

    if (filtros.busqueda) {
      resultado = resultado.filter(inc => 
        inc.numeroCaso.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        inc.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        inc.solicitante.toLowerCase().includes(filtros.busqueda.toLowerCase())
      );
    }

    if (filtros.prioridad) {
      resultado = resultado.filter(inc => inc.prioridad === filtros.prioridad);
    }

    if (filtros.areaTecnica) {
      resultado = resultado.filter(inc => inc.areaTecnica === filtros.areaTecnica);
    }

    if (filtros.estado) {
      resultado = resultado.filter(inc => inc.estado === filtros.estado);
    }

    if (filtros.tecnico) {
      resultado = resultado.filter(inc => 
        inc.tecnicoAsignado.toLowerCase().includes(filtros.tecnico.toLowerCase())
      );
    }

    if (filtros.fechaDesde) {
      resultado = resultado.filter(inc => 
        new Date(inc.fechaRegistro) >= new Date(filtros.fechaDesde)
      );
    }

    if (filtros.fechaHasta) {
      resultado = resultado.filter(inc => 
        new Date(inc.fechaRegistro) <= new Date(filtros.fechaHasta)
      );
    }

    setIncidenciasFiltradas(resultado);
  };

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      prioridad: '',
      areaTecnica: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
      tecnico: ''
    });
    setIncidenciasFiltradas(incidencias);
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

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'En Proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Asignado': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const mostrarDetalle = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setShowDetalleModal(true);
  };

  const mostrarSeguimiento = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setShowSeguimientoModal(true);
  };

  // Modal de Detalle
  const DetalleModal = () => {
    if (!showDetalleModal || !incidenciaSeleccionada) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Detalle de Incidencia - {incidenciaSeleccionada.numeroCaso}
              </h2>
              <button
                onClick={() => setShowDetalleModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Número de Caso
                  </label>
                  <p className={`text-lg font-semibold ${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.numeroCaso}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Solicitante
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.solicitante}
                  </p>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>
                    {incidenciaSeleccionada.dependencia}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Fecha de Registro
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.fechaRegistro}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Prioridad
                  </label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getPrioridadColor(incidenciaSeleccionada.prioridad)}`}>
                    {incidenciaSeleccionada.prioridad}
                  </span>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Estado Actual
                  </label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getEstadoColor(incidenciaSeleccionada.estado)}`}>
                    {incidenciaSeleccionada.estado}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Área Técnica
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.areaTecnica}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Técnico Asignado
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.tecnicoAsignado}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Ubicación
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.ubicacion}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Elemento Afectado
                  </label>
                  <p className={`${themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.elementoAfectado}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.secondaryText}`}>
                    Días Abierto
                  </label>
                  <p className={`text-lg font-semibold ${incidenciaSeleccionada.diasAbierto > 3 ? 'text-red-600' : themeClasses.primaryText}`}>
                    {incidenciaSeleccionada.diasAbierto} días
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                Descripción
              </label>
              <p className={`${themeClasses.primaryText} p-4 border rounded-lg ${themeClasses.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                {incidenciaSeleccionada.descripcion}
              </p>
            </div>

            <div className="mt-4">
              <label className={`block text-sm font-medium mb-2 ${themeClasses.secondaryText}`}>
                Observaciones
              </label>
              <p className={`${themeClasses.primaryText} p-4 border rounded-lg ${themeClasses.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                {incidenciaSeleccionada.observaciones}
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => mostrarSeguimiento(incidenciaSeleccionada)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Seguimiento
              </button>
              <button
                onClick={() => setShowDetalleModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  themeClasses.darkMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
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
    if (!showSeguimientoModal || !incidenciaSeleccionada) return null;

    const historialSeguimiento = [
      {
        fecha: '2025-01-18 10:30',
        usuario: 'Juan Pérez',
        accion: 'Diagnóstico Realizado',
        detalle: 'Se identificó problema en la fuente de poder del equipo'
      },
      {
        fecha: '2025-01-17 14:15',
        usuario: 'Juan Pérez',
        accion: 'Caso Asignado',
        detalle: 'Caso asignado al técnico para revisión'
      },
      {
        fecha: '2025-01-15 09:45',
        usuario: 'Sistema',
        accion: 'Caso Registrado',
        detalle: 'Incidencia registrada en el sistema'
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${themeClasses.sidebarBg} rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                Seguimiento - {incidenciaSeleccionada.numeroCaso}
              </h2>
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className={`text-gray-400 hover:text-gray-600 text-2xl`}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {historialSeguimiento.map((evento, index) => (
                <div key={index} className={`border-l-4 border-blue-500 pl-4 pb-4 ${index !== historialSeguimiento.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
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
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSeguimientoModal(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  themeClasses.darkMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
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
          Mis Incidencias Activas
        </h1>
        <p className={themeClasses.secondaryText}>
          Gestione el seguimiento de sus casos activos en el sistema
        </p>
      </div>

      {/* Panel de Filtros */}
      <div className={`${themeClasses.sidebarBg} rounded-lg p-6 shadow-lg mb-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${themeClasses.primaryText}`}>
          Filtros de Búsqueda
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Buscar
            </label>
            <input
              type="text"
              placeholder="Caso, descripción o solicitante..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Prioridad
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Todas</option>
              <option value="Crítica">Crítica</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Área Técnica
            </label>
            <select
              value={filtros.areaTecnica}
              onChange={(e) => setFiltros({...filtros, areaTecnica: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Todas</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Redes">Redes</option>
              <option value="Sistemas">Sistemas</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Estado
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Todos</option>
              <option value="Asignado">Asignado</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Fecha Desde
            </label>
            <input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Fecha Hasta
            </label>
            <input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => setFiltros({...filtros, fechaHasta: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.primaryText}`}>
              Técnico
            </label>
            <input
              type="text"
              placeholder="Nombre del técnico..."
              value={filtros.tecnico}
              onChange={(e) => setFiltros({...filtros, tecnico: e.target.value})}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                themeClasses.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={aplicarFiltros}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={limpiarFiltros}
            className={`px-6 py-2 rounded-lg transition-colors ${
              themeClasses.darkMode 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className={`${themeClasses.sidebarBg} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${themeClasses.primaryText}`}>
            Lista de Incidencias Activas (Total: {incidenciasFiltradas.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-2 ${themeClasses.secondaryText}`}>Cargando incidencias...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${themeClasses.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Caso
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Solicitante
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Descripción
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Prioridad
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Estado
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Técnico
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Días
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.secondaryText}`}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {incidenciasFiltradas.map((incidencia) => (
                  <tr key={incidencia.id} className={`${themeClasses.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${themeClasses.primaryText}`}>
                          {incidencia.numeroCaso}
                        </div>
                        <div className={`text-sm ${themeClasses.secondaryText}`}>
                          {incidencia.fechaRegistro}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`text-sm font-medium ${themeClasses.primaryText}`}>
                          {incidencia.solicitante}
                        </div>
                        <div className={`text-sm ${themeClasses.secondaryText}`}>
                          {incidencia.dependencia}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${themeClasses.primaryText} max-w-xs`}>
                        <p className="truncate" title={incidencia.descripcion}>
                          {incidencia.descripcion}
                        </p>
                        <div className={`text-sm ${themeClasses.secondaryText}`}>
                          {incidencia.areaTecnica}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPrioridadColor(incidencia.prioridad)}`}>
                        {incidencia.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getEstadoColor(incidencia.estado)}`}>
                        {incidencia.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${themeClasses.primaryText}`}>
                        {incidencia.tecnicoAsignado}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${incidencia.diasAbierto > 3 ? 'text-red-600' : themeClasses.primaryText}`}>
                        {incidencia.diasAbierto} días
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => mostrarDetalle(incidencia)}
                          className="text-blue-600 hover:text-blue-900 hover:underline"
                        >
                          Ver Detalle
                        </button>
                        <button 
                          onClick={() => mostrarSeguimiento(incidencia)}
                          className="text-green-600 hover:text-green-900 hover:underline"
                        >
                          Seguimiento
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {incidenciasFiltradas.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className={`${themeClasses.secondaryText}`}>
                  No se encontraron incidencias con los filtros aplicados
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modales */}
      <DetalleModal />
      <SeguimientoModal />
    </div>
  );
};

export default MisIncidenciasActivas;