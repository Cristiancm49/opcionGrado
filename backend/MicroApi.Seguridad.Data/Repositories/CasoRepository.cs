using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Soporte;

namespace MicroApi.Seguridad.Data.Repositories
{
    public class CasoRepository : ICasoRepository
    {
        private readonly ApplicationDbContext _context;

        public CasoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Caso>> GetAllAsync()
        {
            return await _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .Include(c => c.CanalIngreso)
                .Include(c => c.AreaTecnica)
                .Include(c => c.Activo)
                .OrderByDescending(c => c.FechaRegistro)
                .ToListAsync();
        }

        public async Task<Caso?> GetByIdAsync(long id)
        {
            return await _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .Include(c => c.CanalIngreso)
                .Include(c => c.AreaTecnica)
                .Include(c => c.Activo)
                .Include(c => c.Trazabilidades)
                    .ThenInclude(t => t.EstadoCaso)
                .Include(c => c.Trazabilidades)
                    .ThenInclude(t => t.AreaTecnica)
                .Include(c => c.Trazabilidades)
                    .ThenInclude(t => t.IntervencionesTecnicas)
                        .ThenInclude(i => i.TipoTrabajo)
                .Include(c => c.Trazabilidades)
                    .ThenInclude(t => t.IntervencionesTecnicas)
                        .ThenInclude(i => i.EstadoIntervencion)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Caso>> GetByTecnicoAsync(long idTecnico)
        {
            return await _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .Where(c => c.IdTecnicoAsignado == idTecnico)
                .OrderByDescending(c => c.FechaRegistro)
                .ToListAsync();
        }

        public async Task<IEnumerable<Caso>> GetByEstadoAsync(long idEstadoCaso)
        {
            return await _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .Where(c => c.IdEstadoCaso == idEstadoCaso)
                .OrderByDescending(c => c.FechaRegistro)
                .ToListAsync();
        }

        public async Task<IEnumerable<Caso>> GetByFiltrosAsync(
            long? idEstadoCaso, 
            long? idTecnico, 
            long? idAreaTecnica, 
            DateTime? fechaDesde, 
            DateTime? fechaHasta)
        {
            var query = _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .AsQueryable();

            if (idEstadoCaso.HasValue)
            {
                query = query.Where(c => c.IdEstadoCaso == idEstadoCaso.Value);
            }

            if (idTecnico.HasValue)
            {
                query = query.Where(c => c.IdTecnicoAsignado == idTecnico.Value);
            }

            if (idAreaTecnica.HasValue)
            {
                query = query.Where(c => c.IdAreaTecnica == idAreaTecnica.Value);
            }

            if (fechaDesde.HasValue)
            {
                query = query.Where(c => c.FechaRegistro >= fechaDesde.Value);
            }

            if (fechaHasta.HasValue)
            {
                query = query.Where(c => c.FechaRegistro <= fechaHasta.Value);
            }

            return await query.OrderByDescending(c => c.FechaRegistro).ToListAsync();
        }

        public async Task<Caso> CreateAsync(Caso caso)
        {
            _context.Casos.Add(caso);
            await _context.SaveChangesAsync();
            return caso;
        }

        public async Task<Caso> UpdateAsync(Caso caso)
        {
            caso.FechaActualizacion = DateTime.UtcNow;
            _context.Casos.Update(caso);
            await _context.SaveChangesAsync();
            return caso;
        }

        public async Task<bool> ExistsAsync(long id)
        {
            return await _context.Casos.AnyAsync(c => c.Id == id);
        }

        public async Task<int> CountAsync()
        {
            return await _context.Casos.CountAsync();
        }

        public async Task<IEnumerable<Caso>> GetPagedAsync(int page, int pageSize)
        {
            return await _context.Casos
                .Include(c => c.EstadoCaso)
                .Include(c => c.TipoCaso)
                .Include(c => c.Prioridad)
                .OrderByDescending(c => c.FechaRegistro)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}
