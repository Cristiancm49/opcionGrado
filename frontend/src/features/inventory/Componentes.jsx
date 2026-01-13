import React, { useEffect, useState } from 'react';
import { Cpu, Search } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import Card from '../../components/ui/Card';
import InventoryList from './components/InventoryList';
import { componentesService } from '../../services';

const Componentes = () => {
  const { getThemeClasses } = useAppStore();
  const themeClasses = getThemeClasses();

  const [componentes, setComponentes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await componentesService.getAll();
        console.log('📦 Respuesta API:', res);
        
        // El backend devuelve { success, data, message }
        const items = res?.data || [];
        console.log('📦 Items del backend:', items);
        
        // Transformar al formato que espera InventoryItem
        const transformados = items.map((c) => ({
          id: c.id,
          nombre: c.nombreComponente || '',
          descripcion: c.descripcion || '',
          marca: c.marca || '',
          modelo: c.modelo || '',
          stockActual: c.stockActual || 0,
          stockMinimo: c.stockMinimo || 0,
          ubicacion: c.nombreInventario || '',
          estado: c.nombreEstado || '',
          estadoId: c.idEstadoGeneral,
          categoria: 'Componente',
          fechaIngreso: c.fechaCreacion?.split('T')[0] || '',
          stockBajo: c.stockActual <= c.stockMinimo,
        }));
        
        console.log('📦 Transformados:', transformados);
        setComponentes(transformados);
        setError(null);
      } catch (e) {
        console.error('❌ Error cargando componentes:', e);
        setError(e?.message || 'Error al cargar componentes');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Filtrar por búsqueda
  const componentesFiltrados = busqueda
    ? componentes.filter((c) => {
        const q = busqueda.toLowerCase();
        return (
          c.nombre.toLowerCase().includes(q) ||
          c.marca.toLowerCase().includes(q) ||
          c.modelo.toLowerCase().includes(q)
        );
      })
    : componentes;

  console.log('📦 Estado actual - loading:', loading, 'componentes:', componentes.length, 'filtrados:', componentesFiltrados.length);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${themeClasses.primaryText}`}>
              Componentes
            </h1>
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
              <Cpu className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className={`${themeClasses.secondaryText}`}>
            Listado de componentes registrados en el inventario
          </p>
        </div>
      </div>

      <Card className="bg-white">
        <div className="p-4">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 text-blue-500" />
            <span>Buscar</span>
          </label>
          <input
            type="text"
            placeholder='Nombre, marca o modelo...'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white border-gray-300"
          />
        </div>
      </Card>

      {error && (
        <Card className="border border-red-200 bg-red-50">
          <div className="p-4 text-sm text-red-800">{error}</div>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Componentes
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({componentesFiltrados.length} elementos)
            </span>
          </h2>
        </div>

        <InventoryList
          items={componentesFiltrados}
          tipo="componentes"
          loading={loading}
          onEdit={() => {}}
          onDelete={() => {}}
          onView={() => {}}
        />
      </div>
    </div>
  );
};

export default Componentes;
