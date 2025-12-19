using System.Linq.Expressions;
using MicroApi.Seguridad.Domain.DTOs.Common;

namespace MicroApi.Seguridad.Domain.Interfaces
{
    /// <summary>
    /// Interfaz genérica para servicios de negocio.
    /// 
    /// ¿Por qué separar Repositorio y Servicio?
    /// - Repositorio: Solo acceso a datos (consultas SQL)
    /// - Servicio: Lógica de negocio, validaciones, transformaciones
    /// 
    /// Ejemplo de lógica de negocio:
    /// - "No puedes eliminar un usuario si tiene casos asignados"
    /// - "Al crear un caso, automáticamente crear la primera trazabilidad"
    /// </summary>
    /// <typeparam name="TEntity">Entidad (Model de la BD)</typeparam>
    /// <typeparam name="TDto">DTO de lectura</typeparam>
    /// <typeparam name="TCreateDto">DTO para crear</typeparam>
    /// <typeparam name="TUpdateDto">DTO para actualizar</typeparam>
    public interface IGenericService<TEntity, TDto, TCreateDto, TUpdateDto>
        where TEntity : class
        where TDto : class
        where TCreateDto : class
        where TUpdateDto : class
    {
        /// <summary>
        /// Obtiene todos los registros
        /// </summary>
        Task<ApiResponseDto<IEnumerable<TDto>>> GetAllAsync();

        /// <summary>
        /// Obtiene un registro por ID
        /// </summary>
        Task<ApiResponseDto<TDto>> GetByIdAsync(long id);

        /// <summary>
        /// Crea un nuevo registro
        /// </summary>
        Task<ApiResponseDto<TDto>> CreateAsync(TCreateDto createDto);

        /// <summary>
        /// Actualiza un registro existente
        /// </summary>
        Task<ApiResponseDto<TDto>> UpdateAsync(long id, TUpdateDto updateDto);

        // NOTA: No hay DeleteAsync porque usamos "Soft Delete" (cambiar estado a Inactivo)
        // Cada servicio específico puede implementar DesactivarAsync() si aplica.

        /// <summary>
        /// Obtiene registros paginados
        /// </summary>
        Task<ApiResponseDto<PagedResponseDto<TDto>>> GetPagedAsync(int page, int pageSize);

        /// <summary>
        /// Cuenta el total de registros
        /// </summary>
        Task<ApiResponseDto<int>> CountAsync();

        /// <summary>
        /// Verifica si existe un registro con la condición dada
        /// </summary>
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate);
    }
}

