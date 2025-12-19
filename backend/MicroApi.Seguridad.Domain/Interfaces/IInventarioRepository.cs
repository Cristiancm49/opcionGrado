using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    /// <summary>
    /// Repositorio para gestión de Inventarios
    /// </summary>
    public interface IInventarioRepository
    {
        Task<IEnumerable<Inventario>> GetAllAsync();
        Task<Inventario?> GetByIdAsync(long id);
        Task<IEnumerable<Inventario>> GetByEstadoAsync(long idEstadoGeneral);
        Task<Inventario> CreateAsync(Inventario inventario);
        Task<Inventario> UpdateAsync(Inventario inventario);
        Task<bool> DeleteAsync(long id);
        Task<bool> ExistsAsync(long id);
        Task<int> CountAsync();
        Task<IEnumerable<Inventario>> GetPagedAsync(int page, int pageSize);
    }

    /// <summary>
    /// Repositorio para gestión de Activos
    /// </summary>
    public interface IActivoRepository
    {
        Task<IEnumerable<Activo>> GetAllAsync();
        Task<Activo?> GetByIdAsync(long id);
        Task<Activo?> GetByCodigoPatrimonialAsync(string codigoPatrimonial);
        Task<IEnumerable<Activo>> GetByInventarioAsync(long idInventario);
        Task<IEnumerable<Activo>> GetByCategoriaAsync(long idCategoriaActivo);
        Task<IEnumerable<Activo>> GetByEstadoAsync(long idEstadoActivo);
        Task<IEnumerable<Activo>> GetByUbicacionAsync(long idUbicacion);
        Task<Activo> CreateAsync(Activo activo);
        Task<Activo> UpdateAsync(Activo activo);
        Task<bool> DeleteAsync(long id);
        Task<bool> ExistsAsync(long id);
        Task<int> CountAsync();
        Task<IEnumerable<Activo>> GetPagedAsync(int page, int pageSize);
    }

    /// <summary>
    /// Repositorio para gestión de Componentes
    /// </summary>
    public interface IComponenteRepository
    {
        Task<IEnumerable<Componente>> GetAllAsync();
        Task<Componente?> GetByIdAsync(long id);
        Task<IEnumerable<Componente>> GetByInventarioAsync(long idInventario);
        Task<IEnumerable<Componente>> GetAlertasStockAsync();
        Task<Componente> CreateAsync(Componente componente);
        Task<Componente> UpdateAsync(Componente componente);
        Task<bool> DeleteAsync(long id);
        Task<bool> ExistsAsync(long id);
    }

    /// <summary>
    /// Repositorio para gestión de Consumibles
    /// </summary>
    public interface IConsumibleRepository
    {
        Task<IEnumerable<Consumible>> GetAllAsync();
        Task<Consumible?> GetByIdAsync(long id);
        Task<IEnumerable<Consumible>> GetByInventarioAsync(long idInventario);
        Task<IEnumerable<Consumible>> GetByTipoAsync(long idTipoConsumible);
        Task<IEnumerable<Consumible>> GetAlertasStockAsync();
        Task<Consumible> CreateAsync(Consumible consumible);
        Task<Consumible> UpdateAsync(Consumible consumible);
        Task<bool> DeleteAsync(long id);
        Task<bool> ExistsAsync(long id);
    }
}
