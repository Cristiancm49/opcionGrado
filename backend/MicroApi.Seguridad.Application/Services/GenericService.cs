using System.Linq.Expressions;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.Interfaces;

namespace MicroApi.Seguridad.Application.Services
{
    /// <summary>
    /// Implementación genérica de servicio.
    /// 
    /// IMPORTANTE: Esta clase es "abstracta" porque necesita que cada 
    /// servicio específico implemente los métodos de mapeo:
    /// - MapToDto: Convierte Entity → DTO
    /// - MapToEntity: Convierte CreateDto → Entity
    /// - MapUpdateToEntity: Aplica UpdateDto sobre Entity existente
    /// 
    /// ¿Por qué abstracta?
    /// Cada entidad tiene campos diferentes, entonces el mapeo es diferente.
    /// Pero la lógica CRUD es la misma para todos.
    /// </summary>
    public abstract class GenericService<TEntity, TDto, TCreateDto, TUpdateDto> 
        : IGenericService<TEntity, TDto, TCreateDto, TUpdateDto>
        where TEntity : class
        where TDto : class
        where TCreateDto : class
        where TUpdateDto : class
    {
        protected readonly IGenericRepository<TEntity> _repository;

        protected GenericService(IGenericRepository<TEntity> repository)
        {
            _repository = repository;
        }

        // ==================== MÉTODOS ABSTRACTOS (cada servicio los implementa) ====================
        
        /// <summary>
        /// Convierte una entidad a DTO
        /// Cada servicio específico implementa esto
        /// </summary>
        protected abstract TDto MapToDto(TEntity entity);

        /// <summary>
        /// Convierte un CreateDto a entidad nueva
        /// </summary>
        protected abstract TEntity MapToEntity(TCreateDto createDto);

        /// <summary>
        /// Aplica los cambios del UpdateDto sobre la entidad existente
        /// </summary>
        protected abstract void MapUpdateToEntity(TUpdateDto updateDto, TEntity entity);

        /// <summary>
        /// Obtiene el ID de una entidad (necesario para retornar después de crear)
        /// </summary>
        protected abstract long GetEntityId(TEntity entity);

        // ==================== IMPLEMENTACIÓN CRUD ====================

        public virtual async Task<ApiResponseDto<IEnumerable<TDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _repository.GetAllAsync();
                var dtos = entities.Select(MapToDto);

                return new ApiResponseDto<IEnumerable<TDto>>
                {
                    Success = true,
                    Message = "Registros obtenidos exitosamente",
                    Data = dtos
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<IEnumerable<TDto>>
                {
                    Success = false,
                    Message = $"Error al obtener registros: {ex.Message}",
                    Data = null
                };
            }
        }

        public virtual async Task<ApiResponseDto<TDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);

                if (entity == null)
                {
                    return new ApiResponseDto<TDto>
                    {
                        Success = false,
                        Message = $"Registro con ID {id} no encontrado",
                        Data = null
                    };
                }

                return new ApiResponseDto<TDto>
                {
                    Success = true,
                    Message = "Registro obtenido exitosamente",
                    Data = MapToDto(entity)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<TDto>
                {
                    Success = false,
                    Message = $"Error al obtener registro: {ex.Message}",
                    Data = null
                };
            }
        }

        public virtual async Task<ApiResponseDto<TDto>> CreateAsync(TCreateDto createDto)
        {
            try
            {
                // Convertir DTO a entidad
                var entity = MapToEntity(createDto);

                // Guardar en BD
                var created = await _repository.AddAsync(entity);

                return new ApiResponseDto<TDto>
                {
                    Success = true,
                    Message = "Registro creado exitosamente",
                    Data = MapToDto(created)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<TDto>
                {
                    Success = false,
                    Message = $"Error al crear registro: {ex.Message}",
                    Data = null
                };
            }
        }

        public virtual async Task<ApiResponseDto<TDto>> UpdateAsync(long id, TUpdateDto updateDto)
        {
            try
            {
                // Buscar entidad existente
                var entity = await _repository.GetByIdAsync(id);

                if (entity == null)
                {
                    return new ApiResponseDto<TDto>
                    {
                        Success = false,
                        Message = $"Registro con ID {id} no encontrado",
                        Data = null
                    };
                }

                // Aplicar cambios
                MapUpdateToEntity(updateDto, entity);

                // Guardar
                var updated = await _repository.UpdateAsync(entity);

                return new ApiResponseDto<TDto>
                {
                    Success = true,
                    Message = "Registro actualizado exitosamente",
                    Data = MapToDto(updated)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<TDto>
                {
                    Success = false,
                    Message = $"Error al actualizar registro: {ex.Message}",
                    Data = null
                };
            }
        }

        // NOTA: No implementamos DeleteAsync porque usamos "Soft Delete"
        // Los servicios específicos implementan DesactivarAsync() si la entidad tiene IdEstadoGeneral

        public virtual async Task<ApiResponseDto<PagedResponseDto<TDto>>> GetPagedAsync(int page, int pageSize)
        {
            try
            {
                var entities = await _repository.GetPagedAsync(page, pageSize);
                var totalItems = await _repository.CountAsync();

                var pagedResponse = new PagedResponseDto<TDto>
                {
                    Items = entities.Select(MapToDto).ToList(),
                    Page = page,
                    PageSize = pageSize,
                    TotalItems = totalItems
                };

                return new ApiResponseDto<PagedResponseDto<TDto>>
                {
                    Success = true,
                    Message = "Registros obtenidos exitosamente",
                    Data = pagedResponse
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<PagedResponseDto<TDto>>
                {
                    Success = false,
                    Message = $"Error al obtener registros: {ex.Message}",
                    Data = null
                };
            }
        }

        public virtual async Task<ApiResponseDto<int>> CountAsync()
        {
            try
            {
                var count = await _repository.CountAsync();

                return new ApiResponseDto<int>
                {
                    Success = true,
                    Message = "Conteo obtenido exitosamente",
                    Data = count
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<int>
                {
                    Success = false,
                    Message = $"Error al contar registros: {ex.Message}",
                    Data = 0
                };
            }
        }

        public virtual async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _repository.ExistsAsync(predicate);
        }
    }
}

