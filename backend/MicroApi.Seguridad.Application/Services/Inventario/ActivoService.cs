using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Inventario;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Application.Services.Inventario
{
    public class ActivoService : GenericService<Activo, ActivoDto, ActivoCreateDto, ActivoUpdateDto>, IActivoService
    {
        private readonly IActivoRepository _activoRepository;

        public ActivoService(IActivoRepository repository) : base(repository)
        {
            _activoRepository = repository;
        }

        protected override long GetEntityId(Activo entity) => entity.Id;

        protected override ActivoDto MapToDto(Activo entity)
        {
            // Construir ubicación completa
            string? ubicacionCompleta = null;
            if (entity.Ubicacion != null)
            {
                var partes = new List<string>();
                if (!string.IsNullOrEmpty(entity.Ubicacion.Sede)) partes.Add(entity.Ubicacion.Sede);
                if (!string.IsNullOrEmpty(entity.Ubicacion.Bloque)) partes.Add($"Bloque {entity.Ubicacion.Bloque}");
                if (!string.IsNullOrEmpty(entity.Ubicacion.Piso)) partes.Add($"Piso {entity.Ubicacion.Piso}");
                if (!string.IsNullOrEmpty(entity.Ubicacion.Sala)) partes.Add(entity.Ubicacion.Sala);
                ubicacionCompleta = string.Join(" - ", partes);
            }

            return new ActivoDto
            {
                Id = entity.Id,
                CodigoPatrimonial = entity.CodigoPatrimonial,
                NombreActivo = entity.NombreActivo,
                DescripcionTecnica = entity.DescripcionTecnica,
                Marca = entity.Marca,
                Modelo = entity.Modelo,
                Serie = entity.Serie,
                IdCategoriaActivo = entity.IdCategoriaActivo,
                NombreCategoria = entity.CategoriaActivo?.NombreCategoria,
                IdEstadoActivo = entity.IdEstadoActivo,
                NombreEstadoActivo = entity.EstadoActivo?.NombreEstado,
                IdInventario = entity.IdInventario,
                NombreInventario = entity.Inventario?.NombreInventario,
                IdUbicacion = entity.IdUbicacion,
                UbicacionCompleta = ubicacionCompleta,
                FechaIngreso = entity.FechaIngreso,
                IdResponsableActivo = entity.IdResponsableActivo,
                NombreResponsable = entity.Responsable?.NombreCompleto,
                FechaCreacion = entity.FechaCreacion,
                FechaActualizacion = entity.FechaActualizacion
            };
        }

        protected override Activo MapToEntity(ActivoCreateDto createDto)
        {
            return new Activo
            {
                CodigoPatrimonial = createDto.CodigoPatrimonial,
                NombreActivo = createDto.NombreActivo,
                DescripcionTecnica = createDto.DescripcionTecnica,
                Marca = createDto.Marca,
                Modelo = createDto.Modelo,
                Serie = createDto.Serie,
                IdCategoriaActivo = createDto.IdCategoriaActivo,
                IdEstadoActivo = createDto.IdEstadoActivo,
                IdInventario = createDto.IdInventario,
                IdUbicacion = createDto.IdUbicacion,
                FechaIngreso = createDto.FechaIngreso ?? DateTime.Now,
                IdResponsableActivo = createDto.IdResponsableActivo,
                IdUsuarioCreacion = createDto.IdUsuarioCreacion,
                FechaCreacion = DateTime.Now
            };
        }

        protected override void MapUpdateToEntity(ActivoUpdateDto updateDto, Activo entity)
        {
            if (updateDto.CodigoPatrimonial != null)
                entity.CodigoPatrimonial = updateDto.CodigoPatrimonial;
            
            if (!string.IsNullOrEmpty(updateDto.NombreActivo))
                entity.NombreActivo = updateDto.NombreActivo;
            
            if (updateDto.DescripcionTecnica != null)
                entity.DescripcionTecnica = updateDto.DescripcionTecnica;
            
            if (updateDto.Marca != null)
                entity.Marca = updateDto.Marca;
            
            if (updateDto.Modelo != null)
                entity.Modelo = updateDto.Modelo;
            
            if (updateDto.Serie != null)
                entity.Serie = updateDto.Serie;
            
            if (updateDto.IdCategoriaActivo.HasValue)
                entity.IdCategoriaActivo = updateDto.IdCategoriaActivo.Value;
            
            if (updateDto.IdEstadoActivo.HasValue)
                entity.IdEstadoActivo = updateDto.IdEstadoActivo.Value;
            
            if (updateDto.IdInventario.HasValue)
                entity.IdInventario = updateDto.IdInventario.Value;
            
            if (updateDto.IdUbicacion.HasValue)
                entity.IdUbicacion = updateDto.IdUbicacion.Value;
            
            if (updateDto.FechaIngreso.HasValue)
                entity.FechaIngreso = updateDto.FechaIngreso.Value;
            
            if (updateDto.IdResponsableActivo.HasValue)
                entity.IdResponsableActivo = updateDto.IdResponsableActivo.Value;
            
            entity.FechaActualizacion = DateTime.Now;
        }

        public override async Task<ApiResponseDto<IEnumerable<ActivoDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _activoRepository.GetAllWithRelationsAsync();
                var dtos = entities.Select(MapToDto);
                return new ApiResponseDto<IEnumerable<ActivoDto>>
                {
                    Success = true,
                    Message = "Registros obtenidos",
                    Data = dtos
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<IEnumerable<ActivoDto>>
                {
                    Success = false,
                    Message = $"Error: {ex.Message}",
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<ActivoDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _activoRepository.GetByIdWithRelationsAsync(id);
                if (entity == null)
                {
                    return new ApiResponseDto<ActivoDto>
                    {
                        Success = false,
                        Message = $"Activo con ID {id} no encontrado",
                        Data = null
                    };
                }
                return new ApiResponseDto<ActivoDto>
                {
                    Success = true,
                    Message = "Registro obtenido",
                    Data = MapToDto(entity)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<ActivoDto>
                {
                    Success = false,
                    Message = $"Error: {ex.Message}",
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<ActivoDto>> CreateAsync(ActivoCreateDto createDto)
        {
            try
            {
                var entity = MapToEntity(createDto);
                var created = await _activoRepository.AddAsync(entity);
                var entityWithRelations = await _activoRepository.GetByIdWithRelationsAsync(created.Id);
                return new ApiResponseDto<ActivoDto>
                {
                    Success = true,
                    Message = "Activo creado exitosamente",
                    Data = MapToDto(entityWithRelations!)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<ActivoDto>
                {
                    Success = false,
                    Message = $"Error: {ex.Message}",
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<ActivoDto>> UpdateAsync(long id, ActivoUpdateDto updateDto)
        {
            try
            {
                var entity = await _activoRepository.GetByIdAsync(id);
                if (entity == null)
                {
                    return new ApiResponseDto<ActivoDto>
                    {
                        Success = false,
                        Message = $"Activo con ID {id} no encontrado",
                        Data = null
                    };
                }
                MapUpdateToEntity(updateDto, entity);
                await _activoRepository.UpdateAsync(entity);
                var entityWithRelations = await _activoRepository.GetByIdWithRelationsAsync(id);
                return new ApiResponseDto<ActivoDto>
                {
                    Success = true,
                    Message = "Activo actualizado exitosamente",
                    Data = MapToDto(entityWithRelations!)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<ActivoDto>
                {
                    Success = false,
                    Message = $"Error: {ex.Message}",
                    Data = null
                };
            }
        }
    }
}



