import { useState, useEffect } from 'react';
import { mockActivos, mockConsumibles, mockUbicaciones, mockEstados, mockCategorias } from '../data/inventoryData';

export const useInventory = () => {
  const [activos, setActivos] = useState([]);
  const [consumibles, setConsumibles] = useState([]);
  const [ubicaciones] = useState(mockUbicaciones);
  const [estados] = useState(mockEstados);
  const [categorias] = useState(mockCategorias);
  
  const [filtros, setFiltros] = useState({
    busqueda: '',
    ubicacion: '',
    estado: '',
    categoria: '',
    tipo: 'activos' // 'activos' o 'consumibles'
  });

  const [loading, setLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 500));
      setActivos(mockActivos);
      setConsumibles(mockConsumibles);
      setLoading(false);
    };

    cargarDatos();
  }, []);

  // Filtrar activos
  const activosFiltrados = activos.filter(activo => {
    const cumpleBusqueda = !filtros.busqueda || 
      activo.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      activo.codigoPatrimonial.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      activo.marca.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const cumpleUbicacion = !filtros.ubicacion || activo.ubicacion === filtros.ubicacion;
    const cumpleEstado = !filtros.estado || activo.estado === filtros.estado;
    const cumpleCategoria = !filtros.categoria || activo.categoria === filtros.categoria;

    return cumpleBusqueda && cumpleUbicacion && cumpleEstado && cumpleCategoria;
  });

  // Filtrar consumibles
  const consumiblesFiltrados = consumibles.filter(consumible => {
    const cumpleBusqueda = !filtros.busqueda || 
      consumible.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      consumible.marca.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      consumible.categoria.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const cumpleUbicacion = !filtros.ubicacion || consumible.ubicacion === filtros.ubicacion;
    const cumpleEstado = !filtros.estado || consumible.estado === filtros.estado;
    const cumpleCategoria = !filtros.categoria || consumible.categoria === filtros.categoria;

    return cumpleBusqueda && cumpleUbicacion && cumpleEstado && cumpleCategoria;
  });

  // Obtener datos según el tipo seleccionado
  const getDatosActuales = () => {
    return filtros.tipo === 'activos' ? activosFiltrados : consumiblesFiltrados;
  };

  // Obtener alertas de stock bajo
  const getAlertasStock = () => {
    return consumibles.filter(consumible => 
      consumible.stockActual <= consumible.stockMinimo
    );
  };

  // Agregar nuevo activo
  const agregarActivo = (nuevoActivo) => {
    const activo = {
      ...nuevoActivo,
      id: Math.max(...activos.map(a => a.id)) + 1,
      fechaIngreso: new Date().toISOString().split('T')[0]
    };
    setActivos([...activos, activo]);
  };

  // Agregar nuevo consumible
  const agregarConsumible = (nuevoConsumible) => {
    const consumible = {
      ...nuevoConsumible,
      id: Math.max(...consumibles.map(c => c.id)) + 1,
      fechaIngreso: new Date().toISOString().split('T')[0]
    };
    setConsumibles([...consumibles, consumible]);
  };

  // Actualizar activo
  const actualizarActivo = (id, datosActualizados) => {
    setActivos(activos.map(activo => 
      activo.id === id ? { ...activo, ...datosActualizados } : activo
    ));
  };

  // Actualizar consumible
  const actualizarConsumible = (id, datosActualizados) => {
    setConsumibles(consumibles.map(consumible => 
      consumible.id === id ? { ...consumible, ...datosActualizados } : consumible
    ));
  };

  // Eliminar activo
  const eliminarActivo = (id) => {
    setActivos(activos.filter(activo => activo.id !== id));
  };

  // Eliminar consumible
  const eliminarConsumible = (id) => {
    setConsumibles(consumibles.filter(consumible => consumible.id !== id));
  };

  // Obtener estadísticas
  const getEstadisticas = () => {
    const totalActivos = activos.length;
    const activosActivos = activos.filter(a => a.estado === 'Activo').length;
    const totalConsumibles = consumibles.length;
    const stockBajo = getAlertasStock().length;

    return {
      totalActivos,
      activosActivos,
      totalConsumibles,
      stockBajo,
      ubicaciones: ubicaciones.length,
      categorias: categorias.length
    };
  };

  return {
    // Datos
    activos: activosFiltrados,
    consumibles: consumiblesFiltrados,
    ubicaciones,
    estados,
    categorias,
    
    // Estado
    filtros,
    loading,
    
    // Funciones
    setFiltros,
    getDatosActuales,
    getAlertasStock,
    agregarActivo,
    agregarConsumible,
    actualizarActivo,
    actualizarConsumible,
    eliminarActivo,
    eliminarConsumible,
    getEstadisticas
  };
};
