using System.Linq.Expressions;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    /// <summary>
    /// Interfaz genérica para operaciones CRUD básicas.
    /// T = cualquier entidad (Usuario, Caso, Activo, etc.)
    /// 
    /// ¿Por qué usar esto?
    /// - Evita repetir el mismo código para cada tabla
    /// - Garantiza que todos los repositorios tengan los mismos métodos
    /// - Facilita el testing y mantenimiento
    /// </summary>
    /// <typeparam name="T">Tipo de entidad (ej: Usuario, Caso, Activo)</typeparam>
    public interface IGenericRepository<T> where T : class
    {
        // ==================== LECTURA (READ) ====================
        
        /// <summary>
        /// Obtiene todas las entidades
        /// Ejemplo: Obtener todos los usuarios
        /// </summary>
        Task<IEnumerable<T>> GetAllAsync();

        /// <summary>
        /// Obtiene una entidad por su ID
        /// Ejemplo: Obtener el usuario con ID = 5
        /// </summary>
        Task<T?> GetByIdAsync(long id);

        /// <summary>
        /// Busca entidades que cumplan una condición
        /// Ejemplo: Buscar usuarios donde Rol == "Admin"
        /// </summary>
        /// <param name="predicate">Condición de búsqueda (expresión lambda)</param>
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Obtiene la primera entidad que cumpla la condición, o null
        /// Ejemplo: Buscar usuario con Email == "admin@test.com"
        /// </summary>
        Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Verifica si existe alguna entidad que cumpla la condición
        /// Ejemplo: ¿Existe un usuario con ese email?
        /// </summary>
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Cuenta el total de entidades
        /// </summary>
        Task<int> CountAsync();

        /// <summary>
        /// Cuenta entidades que cumplan una condición
        /// Ejemplo: Contar casos con estado "Abierto"
        /// </summary>
        Task<int> CountAsync(Expression<Func<T, bool>> predicate);

        // ==================== ESCRITURA (CREATE, UPDATE, DELETE) ====================

        /// <summary>
        /// Crea una nueva entidad
        /// </summary>
        Task<T> AddAsync(T entity);

        /// <summary>
        /// Crea múltiples entidades a la vez
        /// </summary>
        Task AddRangeAsync(IEnumerable<T> entities);

        /// <summary>
        /// Actualiza una entidad existente
        /// </summary>
        Task<T> UpdateAsync(T entity);

        // NOTA: No implementamos DELETE físico porque viola integridad referencial.
        // En su lugar, usamos "Soft Delete" cambiando el estado a "Inactivo".

        // ==================== PAGINACIÓN ====================

        /// <summary>
        /// Obtiene entidades paginadas
        /// Ejemplo: Página 2, mostrando 10 por página
        /// </summary>
        /// <param name="page">Número de página (empieza en 1)</param>
        /// <param name="pageSize">Cantidad por página</param>
        Task<IEnumerable<T>> GetPagedAsync(int page, int pageSize);

        /// <summary>
        /// Obtiene entidades paginadas con filtro
        /// </summary>
        Task<IEnumerable<T>> GetPagedAsync(
            Expression<Func<T, bool>>? filter,
            int page,
            int pageSize);
    }
}

