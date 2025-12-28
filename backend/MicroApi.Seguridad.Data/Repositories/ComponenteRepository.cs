using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Data.Repositories
{
    public class ComponenteRepository : GenericRepository<Componente>, IComponenteRepository
    {
        public ComponenteRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Componente>> GetAllWithRelationsAsync()
        {
            return await _dbSet
                .Include(c => c.Inventario)
                .Include(c => c.EstadoGeneral)
                .ToListAsync();
        }

        public async Task<Componente?> GetByIdWithRelationsAsync(long id)
        {
            return await _dbSet
                .Include(c => c.Inventario)
                .Include(c => c.EstadoGeneral)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}


