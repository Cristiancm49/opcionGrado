using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class AreaTecnicaService : GenericService<AreaTecnica, AreaTecnicaDto, AreaTecnicaCreateDto, AreaTecnicaUpdateDto>, IAreaTecnicaService
    {
        private readonly IAreaTecnicaRepository _areaTecnicaRepository;

        public AreaTecnicaService(IAreaTecnicaRepository repository) : base(repository)
        {
            _areaTecnicaRepository = repository;
        }

        protected override AreaTecnicaDto MapToDto(AreaTecnica entity)
        {
            return new AreaTecnicaDto
            {
                Id = entity.Id,
                NombreAreaTecnica = entity.NombreAreaTecnica,
                Descripcion = entity.Descripcion,
                IdEncargado = entity.IdEncargado,
                NombreEncargado = entity.Encargado?.NombreCompleto,
                IdEstadoGeneral = entity.IdEstadoGeneral,
                NombreEstado = entity.EstadoGeneral?.NombreEstado,
                FechaCreacion = entity.FechaCreacion
            };
        }

        protected override AreaTecnica MapToEntity(AreaTecnicaCreateDto dto)
        {
            return new AreaTecnica
            {
                NombreAreaTecnica = dto.NombreAreaTecnica,
                Descripcion = dto.Descripcion,
                IdEncargado = dto.IdEncargado,
                IdEstadoGeneral = dto.IdEstadoGeneral,
                FechaCreacion = DateTime.UtcNow,
                IdUsuarioCreacion = dto.IdUsuarioCreacion
            };
        }

        protected override void MapUpdateToEntity(AreaTecnicaUpdateDto dto, AreaTecnica entity)
        {
            if (!string.IsNullOrEmpty(dto.NombreAreaTecnica))
                entity.NombreAreaTecnica = dto.NombreAreaTecnica;

            if (dto.Descripcion != null)
                entity.Descripcion = dto.Descripcion;

            if (dto.IdEncargado.HasValue)
                entity.IdEncargado = dto.IdEncargado.Value;

            if (dto.IdEstadoGeneral.HasValue)
                entity.IdEstadoGeneral = dto.IdEstadoGeneral.Value;
        }

        protected override long GetEntityId(AreaTecnica entity) => entity.Id;

        public override async Task<ApiResponseDto<IEnumerable<AreaTecnicaDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _areaTecnicaRepository.GetAllWithRelationsAsync();
                var dtos = entities.Select(MapToDto);

                return new ApiResponseDto<IEnumerable<AreaTecnicaDto>>
                {
                    Success = true,
                    Message = "Registros obtenidos",
                    Data = dtos
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<IEnumerable<AreaTecnicaDto>>
                {
                    Success = false,
                    Message = "Error: " + ex.Message,
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<AreaTecnicaDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _areaTecnicaRepository.GetByIdWithRelationsAsync(id);

                if (entity == null)
                {
                    return new ApiResponseDto<AreaTecnicaDto>
                    {
                        Success = false,
                        Message = "Registro con ID " + id + " no encontrado",
                        Data = null
                    };
                }

                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = true,
                    Message = "Registro obtenido",
                    Data = MapToDto(entity)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = false,
                    Message = "Error: " + ex.Message,
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<AreaTecnicaDto>> CreateAsync(AreaTecnicaCreateDto createDto)
        {
            try
            {
                var entity = MapToEntity(createDto);
                var created = await _repository.AddAsync(entity);
                
                // Recargar la entidad con sus relaciones
                var entityWithRelations = await _areaTecnicaRepository.GetByIdWithRelationsAsync(GetEntityId(created));

                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = true,
                    Message = "Registro creado",
                    Data = MapToDto(entityWithRelations!)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = false,
                    Message = "Error: " + ex.Message,
                    Data = null
                };
            }
        }

        public override async Task<ApiResponseDto<AreaTecnicaDto>> UpdateAsync(long id, AreaTecnicaUpdateDto updateDto)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);

                if (entity == null)
                {
                    return new ApiResponseDto<AreaTecnicaDto>
                    {
                        Success = false,
                        Message = "Registro con ID " + id + " no encontrado",
                        Data = null
                    };
                }

                MapUpdateToEntity(updateDto, entity);
                await _repository.UpdateAsync(entity);
                
                // Recargar la entidad con sus relaciones
                var entityWithRelations = await _areaTecnicaRepository.GetByIdWithRelationsAsync(id);

                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = true,
                    Message = "Registro actualizado",
                    Data = MapToDto(entityWithRelations!)
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseDto<AreaTecnicaDto>
                {
                    Success = false,
                    Message = "Error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
