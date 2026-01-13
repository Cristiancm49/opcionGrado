import { useState, useEffect, useCallback } from 'react';
import { 
  activosService, 
  consumiblesService, 
  componentesService,
  ubicacionesService 
} from '../../../services';
import { 
  estadosActivoService, 
  estadosConsumibleService,
  categoriasActivoService,
  tiposConsumibleService 
} from '../../../services';
import { mockActivos, mockConsumibles, mockUbicaciones, mockEstados, mockCategorias } from '../data/inventoryData';

export const useInventory = () => {
  const [activos, setActivos] = useState([]);
  const [consumibles, setConsumibles] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tiposConsumible, setTiposConsumible] = useState([
    { id: 1, nombre: 'Toner', descripcion: 'Cartuchos de tóner' },
    { id: 2, nombre: 'Cables', descripcion: 'Cables de red y energía' },
    { id: 3, nombre: 'Periféricos', descripcion: 'Mouse, teclados, etc.' }
  ]);
  
  const [filtros, _setFiltros] = useState({
    busqueda: '',
    ubicacion: '',
    estado: '',
    categoria: '',
    tipo: 'activos'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setFiltros = (nuevosFiltros) => {
    _setFiltros((prev) => ({
      ...prev,
      ...(nuevosFiltros || {})
    }));
  };

  const transformarActivo = (activo) => ({
    id: activo.id,
    codigoPatrimonial: activo.codigoPatrimonial || '',
    nombre: activo.nombreActivo || '',
    descripcion: activo.descripcionTecnica || '',
    marca: activo.marca || '',
    modelo: activo.modelo || '',
    serie: activo.serie || '',
    ubicacion: activo.ubicacionCompleta || '',
    ubicacionId: activo.idUbicacion,
    estado: activo.nombreEstadoActivo || '',
    estadoId: activo.idEstadoActivo,
    responsable: activo.nombreResponsable || '',
    fechaIngreso: activo.fechaIngreso?.split('T')[0] || '',
    categoria: activo.nombreCategoria || '',
    categoriaId: activo.idCategoriaActivo,
    inventario: activo.nombreInventario || '',
    inventarioId: activo.idInventario,
  });

  const transformarConsumible = (consumible) => ({
    id: consumible.id,
    nombre: consumible.nombreConsumible || '',
    descripcion: consumible.descripcionTecnica || '',
    marca: consumible.marca || '',
    modelo: consumible.modelo || '',
    stockActual: consumible.stockActual || 0,
    stockMinimo: consumible.stockMinimo || 0,
    ubicacion: consumible.nombreInventario || '',
    estado: consumible.nombreEstado || '',
    estadoId: consumible.idEstadoConsumible,
    categoria: consumible.nombreTipo || '',
    categoriaId: consumible.idTipoConsumible,
    fechaIngreso: consumible.fechaCreacion?.split('T')[0] || '',
    stockBajo: consumible.stockBajo || consumible.stockActual <= consumible.stockMinimo,
  });

  const transformarComponente = (componente) => ({
    id: componente.id,
    nombre: componente.nombreComponente || '',
    descripcion: componente.descripcion || '',
    marca: componente.marca || '',
    modelo: componente.modelo || '',
    stockActual: componente.stockActual || 0,
    stockMinimo: componente.stockMinimo || 0,
    ubicacion: componente.nombreInventario || '',
    estado: componente.nombreEstado || '',
    estadoId: componente.idEstadoGeneral,
    categoria: 'Componente',
    fechaIngreso: componente.fechaCreacion?.split('T')[0] || '',
    stockBajo: componente.stockBajo || componente.stockActual <= componente.stockMinimo,
  });

  const transformarUbicacion = (ubicacion) => ({
    id: ubicacion.id,
    nombre: ubicacion.ubicacionCompleta || `${ubicacion.sede} - ${ubicacion.bloque} - ${ubicacion.piso} - ${ubicacion.sala}`,
    descripcion: ubicacion.descripcion || '',
  });

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [
        activosRes,
        consumiblesRes,
        componentesRes,
        ubicacionesRes,
        estadosActivoRes,
        estadosConsumibleRes,
        categoriasRes,
        tiposRes
      ] = await Promise.all([
        activosService.getAll(),
        consumiblesService.getAll(),
        componentesService.getAll(),
        ubicacionesService.getAll(),
        estadosActivoService.getAll(),
        estadosConsumibleService.getAll(),
        categoriasActivoService.getAll(),
        tiposConsumibleService.getAll(),
      ]);

      setActivos((activosRes.data || []).map(transformarActivo));
      setConsumibles((consumiblesRes.data || []).map(transformarConsumible));
      setComponentes((componentesRes.data || []).map(transformarComponente));
      setUbicaciones((ubicacionesRes.data || []).map(transformarUbicacion));

      const estadosActivo = (estadosActivoRes.data || []).map(e => ({
        id: e.id,
        nombre: e.nombreEstado,
        descripcion: e.descripcion,
        tipo: 'activo'
      }));
      const estadosConsumible = (estadosConsumibleRes.data || []).map(e => ({
        id: e.id,
        nombre: e.nombreEstado,
        descripcion: e.descripcion,
        tipo: 'consumible'
      }));
      setEstados([...estadosActivo, ...estadosConsumible]);

      setCategorias((categoriasRes.data || []).map(c => ({
        id: c.id,
        nombre: c.nombreCategoria,
        descripcion: c.descripcion,
      })));

      setTiposConsumible((tiposRes.data || []).map(t => ({
        id: t.id,
        nombre: t.nombreTipo,
        descripcion: t.descripcion,
      })));

    } catch (err) {
      console.error('Error cargando datos de inventario:', err);
      setError(err.message || 'Error al cargar datos');
      setActivos(mockActivos);
      setConsumibles(mockConsumibles);
      setUbicaciones(mockUbicaciones);
      setEstados(mockEstados);
      setCategorias(mockCategorias);
      setTiposConsumible([
        { id: 1, nombre: 'Toner', descripcion: 'Cartuchos de tóner' },
        { id: 2, nombre: 'Cables', descripcion: 'Cables de red y energía' },
        { id: 3, nombre: 'Periféricos', descripcion: 'Mouse, teclados, etc.' }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

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

  const componentesFiltrados = componentes.filter(componente => {
    const cumpleBusqueda = !filtros.busqueda || 
      componente.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      componente.marca.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const cumpleEstado = !filtros.estado || componente.estado === filtros.estado;

    return cumpleBusqueda && cumpleEstado;
  });

  const getDatosActuales = () => {
    if (filtros.tipo === 'activos') return activosFiltrados;
    if (filtros.tipo === 'consumibles') return consumiblesFiltrados;
    if (filtros.tipo === 'componentes') return componentesFiltrados;
    return activosFiltrados;
  };

  const getAlertasStock = () => {
    const alertasConsumibles = consumibles.filter(c => c.stockActual <= c.stockMinimo);
    const alertasComponentes = componentes.filter(c => c.stockActual <= c.stockMinimo);
    return [...alertasConsumibles, ...alertasComponentes];
  };

  const agregarActivo = async (nuevoActivo) => {
    await activosService.create(nuevoActivo);
    await cargarDatos();
  };

  const agregarConsumible = async (nuevoConsumible) => {
    await consumiblesService.create(nuevoConsumible);
    await cargarDatos();
  };

  const agregarComponente = async (nuevoComponente) => {
    console.log('🔄 Intentando crear componente en backend:', nuevoComponente);
    console.log('📡 Endpoint: POST /inventario/componentes');
    try {
      const response = await componentesService.create(nuevoComponente);
      console.log('✅ Componente creado exitosamente en backend:', response);
      await cargarDatos();
      return response;
    } catch (error) {
      console.error('❌ Error al crear componente:', error);
      console.error('Error details:', {
        status: error.status,
        message: error.message,
        stack: error.stack
      });
      
      // Si el backend no está disponible, mostrar error claro
      if (!error.status || error.status === 0 || error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        const errorMsg = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:5181';
        console.error('🚫 Backend no disponible:', errorMsg);
        throw new Error(errorMsg);
      }
      
      // Si hay otro error del backend, lanzarlo
      throw error;
    }
  };

  const actualizarActivo = async (id, datosActualizados) => {
    await activosService.update(id, datosActualizados);
    await cargarDatos();
  };

  const actualizarConsumible = async (id, datosActualizados) => {
    await consumiblesService.update(id, datosActualizados);
    await cargarDatos();
  };

  const actualizarComponente = async (id, datosActualizados) => {
    await componentesService.update(id, datosActualizados);
    await cargarDatos();
  };

  const eliminarActivo = (id) => {
    setActivos(activos.filter(activo => activo.id !== id));
  };

  const eliminarConsumible = (id) => {
    setConsumibles(consumibles.filter(consumible => consumible.id !== id));
  };

  const eliminarComponente = (id) => {
    setComponentes(componentes.filter(componente => componente.id !== id));
  };

  const getEstadisticas = () => {
    const totalActivos = activos.length;
    const activosActivos = activos.filter(a => 
      a.estado === 'Operativo' || a.estado === 'Activo'
    ).length;
    const totalConsumibles = consumibles.length;
    const totalComponentes = componentes.length;
    const stockBajo = getAlertasStock().length;

    return {
      totalActivos,
      activosActivos,
      totalConsumibles,
      totalComponentes,
      stockBajo,
      ubicaciones: ubicaciones.length,
      categorias: categorias.length
    };
  };

  const refrescar = () => {
    cargarDatos();
  };

  return {
    activos: activosFiltrados,
    consumibles: consumiblesFiltrados,
    componentes: componentesFiltrados,
    ubicaciones,
    estados,
    categorias,
    tiposConsumible,
    filtros,
    loading,
    error,
    setFiltros,
    getDatosActuales,
    getAlertasStock,
    agregarActivo,
    agregarConsumible,
    agregarComponente,
    actualizarActivo,
    actualizarConsumible,
    actualizarComponente,
    eliminarActivo,
    eliminarConsumible,
    eliminarComponente,
    getEstadisticas,
    refrescar
  };
};
