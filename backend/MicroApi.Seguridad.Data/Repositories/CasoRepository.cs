using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models;

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
                .ToListAsync();
        }

        public async Task<Caso?> GetByIdAsync(long id)
        {
            return await _context.Casos
                .Include(c => c.Trazabilidades)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Caso>> GetByTecnicoAsync(long idTecnico)
        {
            return await _context.Casos
                .Include(c => c.Trazabilidades)
                .Where(c => c.IdTecnicoAsignado == idTecnico)
                .ToListAsync();
        }

        public async Task<IEnumerable<Caso>> GetByEstadoAsync(long idEstadoCaso)
        {
            return await _context.Casos
                .Include(c => c.Trazabilidades)
                .Where(c => c.IdEstadoCaso == idEstadoCaso)
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
                .Include(c => c.Trazabilidades)
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

            return await query.ToListAsync();
        }

        public async Task<Caso> CreateAsync(Caso caso)
        {
            _context.Casos.Add(caso);
            await _context.SaveChangesAsync();
            return caso;
        }

        public async Task<Caso> UpdateAsync(Caso caso)
        {
            _context.Casos.Update(caso);
            await _context.SaveChangesAsync();
            return caso;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var caso = await _context.Casos.FindAsync(id);
            if (caso == null)
            {
                return false;
            }

            _context.Casos.Remove(caso);
            await _context.SaveChangesAsync();
            return true;
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
                .Include(c => c.Trazabilidades)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}

