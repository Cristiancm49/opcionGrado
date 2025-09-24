import { useState, useEffect } from 'react';
import { mockSalas as salas, mockReservas as reservasMock } from '../data/roomReservationsData';

export const useRoomReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simular carga inicial
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReservas(reservasMock);
      } catch (err) {
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const crearReserva = async (nuevaReserva) => {
    try {
      const reserva = {
        id: Date.now().toString(),
        ...nuevaReserva,
        usuario: 'Usuario Actual', // En una app real vendría del contexto de autenticación
        estado: 'Pendiente',
        fechaReserva: new Date().toISOString()
      };

      setReservas(prev => [reserva, ...prev]);
      return reserva;
    } catch (error) {
      throw new Error('Error al crear la reserva');
    }
  };

  const editarReserva = async (id, datosActualizados) => {
    try {
      setReservas(prev => 
        prev.map(reserva => 
          reserva.id === id 
            ? { ...reserva, ...datosActualizados }
            : reserva
        )
      );
    } catch (error) {
      throw new Error('Error al editar la reserva');
    }
  };

  const eliminarReserva = async (id) => {
    try {
      setReservas(prev => prev.filter(reserva => reserva.id !== id));
    } catch (error) {
      throw new Error('Error al eliminar la reserva');
    }
  };

  const confirmarReserva = async (id) => {
    try {
      setReservas(prev => 
        prev.map(reserva => 
          reserva.id === id 
            ? { ...reserva, estado: 'Confirmada' }
            : reserva
        )
      );
    } catch (error) {
      throw new Error('Error al confirmar la reserva');
    }
  };

  const cancelarReserva = async (id) => {
    try {
      setReservas(prev => 
        prev.map(reserva => 
          reserva.id === id 
            ? { ...reserva, estado: 'Cancelada' }
            : reserva
        )
      );
    } catch (error) {
      throw new Error('Error al cancelar la reserva');
    }
  };

  const verificarDisponibilidad = async (salaId, fechaInicio, fechaFin) => {
    try {
      // Simular verificación de conflictos
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const conflictos = reservas.filter(reserva => {
        if (reserva.salaId !== salaId) return false;
        if (reserva.estado === 'Cancelada') return false;
        
        const reservaInicio = new Date(reserva.fechaInicio);
        const reservaFin = new Date(reserva.fechaFin);
        
        // Verificar solapamiento
        return (fechaInicio < reservaFin && fechaFin > reservaInicio);
      });

      return conflictos.map(conflicto => ({
        motivo: conflicto.motivo,
        horaInicio: new Date(conflicto.fechaInicio).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        horaFin: new Date(conflicto.fechaFin).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }));
    } catch (error) {
      throw new Error('Error al verificar disponibilidad');
    }
  };

  return {
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
  };
};