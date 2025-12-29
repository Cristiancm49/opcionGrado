using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Data.Repositories
{
    public class UbicacionRepository : GenericRepository<Ubicacion>, IUbicacionRepository
    {
        public UbicacionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Ubicacion>> GetAllWithSedeAsync()
        {
            return await _context.Set<Ubicacion>()
                .Include(u => u.Sede)
                .ToListAsync();
        }

        public async Task<Ubicacion?> GetByIdWithSedeAsync(long id)
        {
            return await _context.Set<Ubicacion>()
                .Include(u => u.Sede)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}

