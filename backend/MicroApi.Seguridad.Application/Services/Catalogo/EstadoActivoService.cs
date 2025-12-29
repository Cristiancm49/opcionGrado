using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class EstadoActivoService : GenericService<EstadoActivo, EstadoActivoDto, EstadoActivoCreateDto, EstadoActivoUpdateDto>, IEstadoActivoService
    {
        public EstadoActivoService(IGenericRepository<EstadoActivo> repository) : base(repository) { }

        protected override EstadoActivoDto MapToDto(EstadoActivo entity) => new()
        {
            Id = entity.Id,
            NombreEstado = entity.NombreEstado,
            Descripcion = entity.Descripcion,
            FechaCreacion = entity.FechaCreacion
        };

        protected override EstadoActivo MapToEntity(EstadoActivoCreateDto dto) => new()
        {
            NombreEstado = dto.NombreEstado,
            Descripcion = dto.Descripcion,
            FechaCreacion = DateTime.UtcNow,
            IdUsuarioCreacion = dto.IdUsuarioCreacion
        };

        protected override void MapUpdateToEntity(EstadoActivoUpdateDto dto, EstadoActivo entity)
        {
            if (!string.IsNullOrEmpty(dto.NombreEstado)) entity.NombreEstado = dto.NombreEstado;
            if (dto.Descripcion != null) entity.Descripcion = dto.Descripcion;
        }

        protected override long GetEntityId(EstadoActivo entity) => entity.Id;
    }
}





