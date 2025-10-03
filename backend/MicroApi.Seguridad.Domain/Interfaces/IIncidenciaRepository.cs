using MicroApi.Seguridad.Domain.Models;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    public interface IIncidenciaRepository
    {
        Task<IEnumerable<Incidencia>> GetAllAsync();
        Task<Incidencia?> GetByIdAsync(int id);
        Task<Incidencia?> GetByNumeroAsync(string numero);
        Task<IEnumerable<Incidencia>> GetByTecnicoAsync(string tecnico);
        Task<IEnumerable<Incidencia>> GetByEstadoAsync(string estado);
        Task<IEnumerable<Incidencia>> GetByFiltrosAsync(string? solicitante, string? estado, string? tecnico, DateTime? fechaDesde, DateTime? fechaHasta);
        Task<Incidencia> CreateAsync(Incidencia incidencia);
        Task<Incidencia> UpdateAsync(Incidencia incidencia);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<int> CountAsync();
        Task<IEnumerable<Incidencia>> GetPagedAsync(int page, int pageSize);
    }
}


