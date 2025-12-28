using MicroApi.Seguridad.Domain.Models.Soporte;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    public interface ICasoRepository
    {
        Task<IEnumerable<Caso>> GetAllAsync();
        Task<Caso?> GetByIdAsync(long id);
        Task<IEnumerable<Caso>> GetByTecnicoAsync(long idTecnico);
        Task<IEnumerable<Caso>> GetByEstadoAsync(long idEstadoCaso);
        Task<IEnumerable<Caso>> GetByFiltrosAsync(long? idEstadoCaso, long? idTecnico, long? idAreaTecnica, DateTime? fechaDesde, DateTime? fechaHasta);
        Task<Caso> CreateAsync(Caso caso);
        Task<Caso> UpdateAsync(Caso caso);
        Task<bool> ExistsAsync(long id);
        Task<int> CountAsync();
        Task<IEnumerable<Caso>> GetPagedAsync(int page, int pageSize);
    }
}
