import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const InventoryFilters = ({ 
  filtros, 
  onFiltrosChange, 
  ubicaciones, 
  estados, 
  categorias,
  tipoActual 
}) => {
  const handleFiltroChange = (campo, valor) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    });
  };

  const limpiarFiltros = () => {
    onFiltrosChange({
      busqueda: '',
      ubicacion: '',
      estado: '',
      categoria: '',
      tipo: tipoActual
    });
  };

  const tieneFiltrosActivos = filtros.busqueda || filtros.ubicacion || filtros.estado || filtros.categoria;

  // Filtrar opciones según el tipo
  const estadosFiltrados = estados.filter(estado => {
    if (tipoActual === 'activos') {
      return !estado.nombre.toLowerCase().includes('stock') && 
             !estado.nombre.toLowerCase().includes('agotado');
    }
    return true;
  });

  const categoriasFiltradas = categorias.filter(categoria => {
    if (tipoActual === 'activos') {
      return ['Computadoras', 'Impresoras', 'Redes', 'Monitores'].includes(categoria.nombre);
    }
    return ['Toner', 'Cables', 'Periféricos'].includes(categoria.nombre);
  });

  return (
    <Card className="mb-6" gradient>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <Card.Title size="lg">Filtros</Card.Title>
          </div>
          {tieneFiltrosActivos && (
            <Button
              variant="ghost"
              size="sm"
              onClick={limpiarFiltros}
              icon={X}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </Card.Header>

      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="lg:col-span-2">
          <Input
            label="Buscar"
            placeholder="Buscar por nombre, código, marca..."
            value={filtros.busqueda}
            onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
            icon={Search}
            iconPosition="left"
          />
        </div>

        {/* Ubicación */}
        <Select
          label="Ubicación"
          placeholder="Todas las ubicaciones"
          value={filtros.ubicacion}
          onChange={(e) => handleFiltroChange('ubicacion', e.target.value)}
          options={ubicaciones.map(ubicacion => ({
            value: ubicacion.nombre,
            label: ubicacion.nombre
          }))}
        />

        {/* Estado */}
        <Select
          label="Estado"
          placeholder="Todos los estados"
          value={filtros.estado}
          onChange={(e) => handleFiltroChange('estado', e.target.value)}
          options={estadosFiltrados.map(estado => ({
            value: estado.nombre,
            label: estado.nombre
          }))}
        />

        {/* Categoría */}
        <Select
          label="Categoría"
          placeholder="Todas las categorías"
          value={filtros.categoria}
          onChange={(e) => handleFiltroChange('categoria', e.target.value)}
          options={categoriasFiltradas.map(categoria => ({
            value: categoria.nombre,
            label: categoria.nombre
          }))}
        />
        </div>
      </Card.Content>

      {/* Filtros activos */}
      {tieneFiltrosActivos && (
        <Card.Footer>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Filtros activos:</span>
            {filtros.busqueda && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Búsqueda: {filtros.busqueda}
                <button
                  onClick={() => handleFiltroChange('busqueda', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filtros.ubicacion && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ubicación: {filtros.ubicacion}
                <button
                  onClick={() => handleFiltroChange('ubicacion', '')}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filtros.estado && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Estado: {filtros.estado}
                <button
                  onClick={() => handleFiltroChange('estado', '')}
                  className="ml-1 hover:text-yellow-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filtros.categoria && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Categoría: {filtros.categoria}
                <button
                  onClick={() => handleFiltroChange('categoria', '')}
                  className="ml-1 hover:text-purple-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </Card.Footer>
      )}
    </Card>
  );
};

export default InventoryFilters;
