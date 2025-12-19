using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Interfaces;

namespace MicroApi.Seguridad.Data.Repositories
{
    /// <summary>
    /// Implementación genérica del repositorio.
    /// Esta clase hace las consultas reales a la base de datos.
    /// 
    /// CONCEPTOS CLAVE:
    /// - DbContext: Es el "puente" entre C# y SQL Server
    /// - DbSet<T>: Representa una tabla de la BD
    /// - async/await: Operaciones asíncronas (no bloquean la app)
    /// - LINQ: Lenguaje para consultar datos (similar a SQL pero en C#)
    /// </summary>
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        // El contexto de base de datos (nuestra conexión)
        protected readonly ApplicationDbContext _context;
        
        // El DbSet representa la tabla de la entidad T
        // Si T = Usuario, entonces _dbSet = la tabla Usuarios
        protected readonly DbSet<T> _dbSet;

        /// <summary>
        /// Constructor: recibe el contexto por Inyección de Dependencias
        /// .NET automáticamente nos pasa el contexto cuando creamos el repositorio
        /// </summary>
        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>(); // Obtiene el DbSet correspondiente a T
        }

        // ==================== LECTURA (READ) ====================

        /// <summary>
        /// SELECT * FROM Tabla
        /// </summary>
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            // ToListAsync() ejecuta la consulta y trae los resultados
            return await _dbSet.ToListAsync();
        }

        /// <summary>
        /// SELECT * FROM Tabla WHERE Id = @id
        /// </summary>
        public virtual async Task<T?> GetByIdAsync(long id)
        {
            // FindAsync busca por la clave primaria
            return await _dbSet.FindAsync(id);
        }

        /// <summary>
        /// SELECT * FROM Tabla WHERE [condición]
        /// El "predicate" es la condición en formato lambda
        /// Ejemplo: x => x.Estado == "Activo"
        /// </summary>
        public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        /// <summary>
        /// SELECT TOP 1 * FROM Tabla WHERE [condición]
        /// </summary>
        public virtual async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.FirstOrDefaultAsync(predicate);
        }

        /// <summary>
        /// SELECT CASE WHEN EXISTS(...) THEN 1 ELSE 0 END
        /// </summary>
        public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        /// <summary>
        /// SELECT COUNT(*) FROM Tabla
        /// </summary>
        public virtual async Task<int> CountAsync()
        {
            return await _dbSet.CountAsync();
        }

        /// <summary>
        /// SELECT COUNT(*) FROM Tabla WHERE [condición]
        /// </summary>
        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.CountAsync(predicate);
        }

        // ==================== ESCRITURA (CREATE, UPDATE, DELETE) ====================

        /// <summary>
        /// INSERT INTO Tabla VALUES (...)
        /// </summary>
        public virtual async Task<T> AddAsync(T entity)
        {
            // Add marca la entidad como "nueva"
            await _dbSet.AddAsync(entity);
            
            // SaveChangesAsync envía los cambios a la BD
            await _context.SaveChangesAsync();
            
            return entity;
        }

        /// <summary>
        /// INSERT múltiple (más eficiente que insertar uno por uno)
        /// </summary>
        public virtual async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// UPDATE Tabla SET ... WHERE Id = @id
        /// </summary>
        public virtual async Task<T> UpdateAsync(T entity)
        {
            // Update marca la entidad como "modificada"
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        // NOTA: No implementamos DELETE físico porque viola integridad referencial.
        // En su lugar, cada servicio implementa "Soft Delete" cambiando IdEstadoGeneral a "Inactivo".

        // ==================== PAGINACIÓN ====================

        /// <summary>
        /// SELECT * FROM Tabla 
        /// ORDER BY Id 
        /// OFFSET @skip ROWS 
        /// FETCH NEXT @take ROWS ONLY
        /// 
        /// Ejemplo: Página 2 con 10 items
        /// - Skip = (2-1) * 10 = 10 (salta los primeros 10)
        /// - Take = 10 (toma los siguientes 10)
        /// </summary>
        public virtual async Task<IEnumerable<T>> GetPagedAsync(int page, int pageSize)
        {
            return await _dbSet
                .Skip((page - 1) * pageSize)  // Salta los anteriores
                .Take(pageSize)                // Toma solo los de esta página
                .ToListAsync();
        }

        /// <summary>
        /// Paginación con filtro
        /// </summary>
        public virtual async Task<IEnumerable<T>> GetPagedAsync(
            Expression<Func<T, bool>>? filter,
            int page,
            int pageSize)
        {
            IQueryable<T> query = _dbSet;

            // Si hay filtro, lo aplica
            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}

