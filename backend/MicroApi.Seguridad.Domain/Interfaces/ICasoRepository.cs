using MicroApi.Seguridad.Domain.Models;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    public interface ICasoRepository
    {
        Task<IEnumerable<Caso>> GetAllAsync();
        Task<Caso?> GetByIdAsync(int id);
        Task<Caso?> GetByNumeroAsync(string numero);
        Task<IEnumerable<Caso>> GetByTecnicoAsync(string tecnico);
        Task<IEnumerable<Caso>> GetByEstadoAsync(string estado);
        Task<IEnumerable<Caso>> GetByFiltrosAsync(string? solicitante, string? estado, string? tecnico, DateTime? fechaDesde, DateTime? fechaHasta);
        Task<Caso> CreateAsync(Caso caso);
        Task<Caso> UpdateAsync(Caso caso);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> CountAsync();
        Task<IEnumerable<Caso>> GetPagedAsync(int page, int pageSize);
    }
}


