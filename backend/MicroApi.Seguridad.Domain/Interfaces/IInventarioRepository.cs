using MicroApi.Seguridad.Domain.Models;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    public interface IInventarioRepository
    {
        Task<IEnumerable<Inventario>> GetAllAsync();
        Task<Inventario?> GetByIdAsync(int id);
        Task<Inventario?> GetByCodigoAsync(string codigo);
        Task<IEnumerable<Inventario>> GetByTipoAsync(string tipo);
        Task<IEnumerable<Inventario>> GetByCategoriaAsync(string categoria);
        Task<IEnumerable<Inventario>> GetByEstadoAsync(string estado);
        Task<IEnumerable<Inventario>> GetByFiltrosAsync(string? tipo, string? categoria, string? estado, string? ubicacion);
        Task<IEnumerable<Inventario>> GetAlertasStockAsync();
        Task<Inventario> CreateAsync(Inventario inventario);
        Task<Inventario> UpdateAsync(Inventario inventario);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> CountAsync();
        Task<IEnumerable<Inventario>> GetPagedAsync(int page, int pageSize);
    }
}


