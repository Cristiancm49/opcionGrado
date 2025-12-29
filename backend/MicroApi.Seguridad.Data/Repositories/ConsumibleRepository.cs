using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Data.Repositories
{
    public class ConsumibleRepository : GenericRepository<Consumible>, IConsumibleRepository
    {
        public ConsumibleRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Consumible>> GetAllWithRelationsAsync()
        {
            return await _dbSet
                .Include(c => c.Inventario)
                .Include(c => c.TipoConsumible)
                .Include(c => c.EstadoConsumible)
                .ToListAsync();
        }

        public async Task<Consumible?> GetByIdWithRelationsAsync(long id)
        {
            return await _dbSet
                .Include(c => c.Inventario)
                .Include(c => c.TipoConsumible)
                .Include(c => c.EstadoConsumible)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}



