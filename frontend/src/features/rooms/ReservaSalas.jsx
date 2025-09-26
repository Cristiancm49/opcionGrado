import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, AlertCircle, CheckCircle, Clock, User, Building, FileText, Edit, Trash2, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { useRoomReservations } from './hooks/useRoomReservations';

const ReservaSalas = () => {
  const navigate = useNavigate();
  const {
    salas,
    reservas,
    loading,
    error,
    crearReserva,
    editarReserva,
    eliminarReserva,
    confirmarReserva,
    cancelarReserva,
    verificarDisponibilidad
  } = useRoomReservations();

  const [formData, setFormData] = useState({
    salaId: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    departamento: '',
    motivo: '',
    observaciones: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conflictos, setConflictos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    departamento: '',
    sala: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  const departamentos = [
    'Administración',
    'Ingeniería de Sistemas',
    'Ingeniería Industrial',
    'Contaduría Pública',
    'Administración de Empresas',
    'Recursos Humanos',
    'Mantenimiento',
    'Otro'
  ];

  const horarios = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.salaId) newErrors.salaId = 'Selecciona una sala';
    if (!formData.fecha) newErrors.fecha = 'Selecciona una fecha';
    if (!formData.horaInicio) newErrors.horaInicio = 'Selecciona hora de inicio';
    if (!formData.horaFin) newErrors.horaFin = 'Selecciona hora de fin';
    if (!formData.departamento) newErrors.departamento = 'Selecciona un departamento';
    if (!formData.motivo.trim()) newErrors.motivo = 'Ingresa el motivo de la reserva';

    if (formData.horaInicio && formData.horaFin) {
      const inicio = new Date(`2000-01-01 ${formData.horaInicio}`);
      const fin = new Date(`2000-01-01 ${formData.horaFin}`);
      if (fin <= inicio) {
        newErrors.horaFin = 'La hora de fin debe ser mayor que la de inicio';
      }
    }

    if (formData.fecha) {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaSeleccionada < hoy) {
        newErrors.fecha = 'No puedes reservar fechas pasadas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verificarConflictos = async () => {
    if (!formData.salaId || !formData.fecha || !formData.horaInicio || !formData.horaFin) {
      return;
    }

    const fechaInicio = new Date(`${formData.fecha}T${formData.horaInicio}:00`);
    const fechaFin = new Date(`${formData.fecha}T${formData.horaFin}:00`);

    const conflictosEncontrados = await verificarDisponibilidad(
      formData.salaId,
      fechaInicio,
      fechaFin
    );

    setConflictos(conflictosEncontrados);
    return conflictosEncontrados.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const sinConflictos = await verificarConflictos();
    if (!sinConflictos) {
      setErrors({ conflicto: 'Existen conflictos de horario. Revisa los detalles.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const fechaInicio = new Date(`${formData.fecha}T${formData.horaInicio}:00`);
      const fechaFin = new Date(`${formData.fecha}T${formData.horaFin}:00`);

      await crearReserva({
        salaId: formData.salaId,
        fechaInicio,
        fechaFin,
        departamento: formData.departamento,
        motivo: formData.motivo,
        observaciones: formData.observaciones
      });

      setFormData({
        salaId: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        departamento: '',
        motivo: '',
        observaciones: ''
      });
      setConflictos([]);
      setErrors({});
      setShowForm(false);

    } catch (error) {
      console.error('Error al crear reserva:', error);
      setErrors({ submit: 'Error al crear la reserva. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSalaNombre = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    return sala ? sala.nombre : 'Sala no encontrada';
  };

  const getSalaCapacidad = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    return sala ? sala.capacidad : 0;
  };

  const getSalaEquipamiento = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    return sala ? sala.equipamiento : [];
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('es-ES'),
      time: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getDuracion = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const duracionMs = fin - inicio;
    const duracionMinutos = Math.round(duracionMs / (1000 * 60));
    
    if (duracionMinutos < 60) {
      return `${duracionMinutos} min`;
    } else {
      const horas = Math.floor(duracionMinutos / 60);
      const minutos = duracionMinutos % 60;
      return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`;
    }
  };

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(reserva => {
    const cumpleBusqueda = !filtros.busqueda || 
      reserva.motivo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      reserva.observaciones?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      getSalaNombre(reserva.salaId).toLowerCase().includes(filtros.busqueda.toLowerCase());

    const cumpleEstado = !filtros.estado || reserva.estado === filtros.estado;
    
    const cumpleDepartamento = !filtros.departamento || reserva.departamento === filtros.departamento;
    
    const cumpleSala = !filtros.sala || reserva.salaId === filtros.sala;

    const cumpleFechaDesde = !filtros.fechaDesde || new Date(reserva.fechaInicio) >= new Date(filtros.fechaDesde);
    
    const cumpleFechaHasta = !filtros.fechaHasta || new Date(reserva.fechaInicio) <= new Date(filtros.fechaHasta);

    return cumpleBusqueda && cumpleEstado && cumpleDepartamento && cumpleSala && cumpleFechaDesde && cumpleFechaHasta;
  });

  const estadosReserva = ['Pendiente', 'Confirmada', 'Cancelada'];

  // Calcular estadísticas
  const estadisticas = {
    totalReservas: reservas.length,
    reservasHoy: reservas.filter(reserva => {
      const hoy = new Date().toDateString();
      return new Date(reserva.fechaInicio).toDateString() === hoy;
    }).length,
    reservasPendientes: reservas.filter(reserva => reserva.estado === 'Pendiente').length,
    reservasConfirmadas: reservas.filter(reserva => reserva.estado === 'Confirmada').length,
    reservasCanceladas: reservas.filter(reserva => reserva.estado === 'Cancelada').length,
    salasOcupadas: reservas.filter(reserva => {
      const hoy = new Date();
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);
      return reserva.estado !== 'Cancelada' && 
             fechaInicio <= hoy && 
             fechaFin >= hoy;
    }).length,
    salasDisponibles: salas.length - reservas.filter(reserva => {
      const hoy = new Date();
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);
      return reserva.estado !== 'Cancelada' && 
             fechaInicio <= hoy && 
             fechaFin >= hoy;
    }).length,
    reservasProximas24h: reservas.filter(reserva => {
      const ahora = new Date();
      const fechaReserva = new Date(reserva.fechaInicio);
      const diferenciaHoras = (fechaReserva - ahora) / (1000 * 60 * 60);
      return diferenciaHoras > 0 && diferenciaHoras <= 24;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Reservas</h1>
          <p className="text-gray-600">Administra todas las reservas de salas del sistema</p>
        </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                icon={Calendar}
                onClick={() => navigate('/inventory/disponibilidad-salas')}
              >
                Ver Calendario
              </Button>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Agregar Reserva'}
          </Button>
        </div>
      </div>

      {/* Formulario de Reserva */}
      {showForm && (
        <Card>
        <Card.Header>
          <Card.Title>Crear Nueva Reserva</Card.Title>
          <p className="text-sm text-gray-600 mt-1">
            Registra una nueva reserva en el sistema
          </p>
        </Card.Header>
          
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Selección de Sala */}
                <div>
                  <Select
                    label="Sala"
                    placeholder="Selecciona una sala"
                    value={formData.salaId}
                    onChange={(value) => handleInputChange('salaId', value)}
                    error={errors.salaId}
                    required
                  >
                    {salas.map(sala => (
                      <option key={sala.id} value={sala.id}>
                        {sala.nombre} - Capacidad: {sala.capacidad} personas
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Departamento */}
                <div>
                  <Select
                    label="Departamento"
                    placeholder="Selecciona departamento"
                    value={formData.departamento}
                    onChange={(value) => handleInputChange('departamento', value)}
                    error={errors.departamento}
                    required
                  >
                    {departamentos.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Información de la sala seleccionada */}
              {formData.salaId && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {getSalaNombre(formData.salaId)}
                    </span>
                  </div>
                  <div className="text-sm text-blue-700">
                    <p>Capacidad: {getSalaCapacidad(formData.salaId)} personas</p>
                    {getSalaEquipamiento(formData.salaId).length > 0 && (
                      <p>Equipamiento: {getSalaEquipamiento(formData.salaId).join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fecha */}
                <div>
                  <Input
                    label="Fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                    error={errors.fecha}
                    required
                  />
                </div>

                {/* Horarios */}
                <div>
                  <Select
                    label="Hora de Inicio"
                    placeholder="Selecciona hora"
                    value={formData.horaInicio}
                    onChange={(value) => handleInputChange('horaInicio', value)}
                    error={errors.horaInicio}
                    required
                  >
                    {horarios.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    label="Hora de Fin"
                    placeholder="Selecciona hora"
                    value={formData.horaFin}
                    onChange={(value) => handleInputChange('horaFin', value)}
                    error={errors.horaFin}
                    required
                  >
                    {horarios.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Motivo */}
                <div>
                  <Input
                    label="Motivo de la Reserva"
                    placeholder="Ej: Reunión de equipo, Capacitación, Examen..."
                    value={formData.motivo}
                    onChange={(e) => handleInputChange('motivo', e.target.value)}
                    error={errors.motivo}
                    required
                  />
                </div>

                {/* Observaciones */}
                <div>
                  <Input
                    label="Observaciones (Opcional)"
                    placeholder="Información adicional sobre la reserva"
                    value={formData.observaciones}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                  />
                </div>
              </div>

              {/* Alertas de conflictos */}
              {conflictos.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-900">
                      Conflictos de Horario Detectados
                    </span>
                  </div>
                  <div className="text-sm text-red-700">
                    <p className="mb-2">La sala ya tiene reservas en este horario:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {conflictos.map((conflicto, index) => (
                        <li key={index}>
                          {conflicto.motivo} - {conflicto.horaInicio} a {conflicto.horaFin}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Errores generales */}
              {errors.conflicto && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">{errors.conflicto}</span>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">{errors.submit}</span>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  icon={Plus}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Creando Reserva...' : 'Crear Reserva'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      salaId: '',
                      fecha: '',
                      horaInicio: '',
                      horaFin: '',
                      departamento: '',
                      motivo: '',
                      observaciones: ''
                    });
                    setErrors({});
                    setConflictos([]);
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </form>
          </Card.Content>
        </Card>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Reservas */}
        <Card.Stat
          title="Total Reservas"
          value={estadisticas.totalReservas}
          icon={Calendar}
          color="blue"
          subtitle="Todas las reservas"
        />

        {/* Reservas Hoy */}
        <Card.Stat
          title="Reservas Hoy"
          value={estadisticas.reservasHoy}
          icon={Clock}
          color="green"
          subtitle={new Date().toLocaleDateString('es-ES')}
        />

        {/* Reservas Próximas 24h */}
        <Card.Stat
          title="Próximas 24h"
          value={estadisticas.reservasProximas24h}
          icon={AlertCircle}
          color="yellow"
          subtitle="Próximas reservas"
        />

        {/* Salas Disponibles */}
        <Card.Stat
          title="Salas Disponibles"
          value={estadisticas.salasDisponibles}
          icon={CheckCircle}
          color="green"
          subtitle={`${estadisticas.salasOcupadas} ocupadas`}
        />
      </div>

      {/* Estadísticas por Estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card.Stat
          title="Pendientes"
          value={estadisticas.reservasPendientes}
          icon={AlertCircle}
          color="yellow"
          subtitle="Esperando confirmación"
        />

        <Card.Stat
          title="Confirmadas"
          value={estadisticas.reservasConfirmadas}
          icon={CheckCircle}
          color="green"
          subtitle="Reservas activas"
        />

        <Card.Stat
          title="Canceladas"
          value={estadisticas.reservasCanceladas}
          icon={Trash2}
          color="red"
          subtitle="Reservas canceladas"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-lg mb-6 border border-gray-200 overflow-hidden">
        {/* Header con gradiente */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Filtros Avanzados</h3>
                <p className="text-sm text-gray-600">Refina tu búsqueda con filtros específicos</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  console.log('🔍 Ejecutando búsqueda de reservas:', filtros.busqueda);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                disabled={!filtros.busqueda}
              >
                <Calendar className="w-4 h-4" />
                <span>Aplicar</span>
              </button>
              <button
                onClick={() => setFiltros({
                  busqueda: '',
                  estado: '',
                  departamento: '',
                  sala: '',
                  fechaDesde: '',
                  fechaHasta: ''
                })}
                className="px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 bg-white text-gray-700 hover:bg-gray-50 border"
                disabled={Object.values(filtros).every(valor => valor === '')}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Limpiar</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Contenido de filtros */}
        <div className="p-6">
          {/* Fila 1: Búsqueda principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="lg:col-span-2 space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Buscar</span>
              </label>
              <input
                type="text"
                placeholder="Motivo, observaciones, sala..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              />
              <div className="text-xs text-gray-500">
                💡 Ejemplos: "reunión", "capacitación", "Sala A", "presentación"
              </div>
            </div>
          </div>

          {/* Fila 2: Filtros específicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Estado</span>
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              >
                <option value="">Todos los estados</option>
                {estadosReserva.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 text-blue-500" />
                <span>Departamento</span>
              </label>
              <select
                value={filtros.departamento}
                onChange={(e) => setFiltros(prev => ({ ...prev, departamento: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              >
                <option value="">Todos los departamentos</option>
                {departamentos.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 text-purple-500" />
                <span>Sala</span>
              </label>
              <select
                value={filtros.sala}
                onChange={(e) => setFiltros(prev => ({ ...prev, sala: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              >
                <option value="">Todas las salas</option>
                {salas.map(sala => (
                  <option key={sala.id} value={sala.id}>{sala.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Fecha Desde</span>
              </label>
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros(prev => ({ ...prev, fechaDesde: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Fila 3: Filtros adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Fecha Hasta</span>
              </label>
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros(prev => ({ ...prev, fechaHasta: e.target.value }))}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Información de resultados */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <strong>{reservasFiltradas.length}</strong> de <strong>{reservas.length}</strong> reservas
              </div>
              {Object.values(filtros).some(valor => valor !== '') && (
                <div className="text-xs text-blue-600">
                  Filtros aplicados
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Reservas */}
      <Card>
        <Card.Header>
          <Card.Title>Todas las Reservas</Card.Title>
          <p className="text-sm text-gray-600 mt-1">
            Administra todas las reservas del sistema ({reservasFiltradas.length} reservas)
          </p>
        </Card.Header>
        
        <Card.Content>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="animate-pulse p-4 border border-gray-200 rounded-lg">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : reservasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {reservas.length === 0 ? 'No hay reservas registradas' : 'No hay reservas que coincidan'}
              </h3>
              <p className="text-gray-500 mb-4">
                {reservas.length === 0 
                  ? 'Crea la primera reserva usando el botón "Agregar Reserva"'
                  : 'Ajusta los filtros para ver más resultados'
                }
              </p>
              {reservas.length === 0 ? (
                <Button
                  variant="primary"
                  icon={Plus}
                  onClick={() => setShowForm(true)}
                >
                  Crear Primera Reserva
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setFiltros({
                    busqueda: '',
                    estado: '',
                    departamento: '',
                    sala: '',
                    fechaDesde: '',
                    fechaHasta: ''
                  })}
                >
                  Limpiar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reservasFiltradas.map(reserva => {
                const fechaInicio = formatDateTime(reserva.fechaInicio);
                const fechaFin = formatDateTime(reserva.fechaFin);
                const duracion = getDuracion(reserva.fechaInicio, reserva.fechaFin);

                return (
                  <div key={reserva.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <h3 className="font-medium text-gray-900">
                            {getSalaNombre(reserva.salaId)}
                          </h3>
                          <Badge 
                            variant={reserva.estado === 'Confirmada' ? 'success' : 
                                    reserva.estado === 'Pendiente' ? 'warning' : 'danger'}
                            size="sm"
                          >
                            {reserva.estado}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{fechaInicio.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{fechaInicio.time} - {fechaFin.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{reserva.departamento}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>{duracion}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700">
                            <strong>Motivo:</strong> {reserva.motivo}
                          </p>
                          {reserva.observaciones && (
                            <p className="text-sm text-gray-600">
                              <strong>Observaciones:</strong> {reserva.observaciones}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            <strong>Reservado:</strong> {formatDateTime(reserva.fechaReserva).date} a las {formatDateTime(reserva.fechaReserva).time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => console.log('Ver reserva:', reserva.id)}
                        />
                        {reserva.estado === 'Pendiente' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Edit}
                            onClick={() => console.log('Editar reserva:', reserva.id)}
                          />
                        )}
                        {reserva.estado === 'Pendiente' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={CheckCircle}
                            onClick={() => confirmarReserva(reserva.id)}
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => eliminarReserva(reserva.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ReservaSalas;