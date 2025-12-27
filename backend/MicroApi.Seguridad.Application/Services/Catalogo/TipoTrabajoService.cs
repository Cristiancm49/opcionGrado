using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class TipoTrabajoService : GenericService<TipoTrabajo, TipoTrabajoDto, TipoTrabajoCreateDto, TipoTrabajoUpdateDto>, ITipoTrabajoService
    {
        public TipoTrabajoService(IGenericRepository<TipoTrabajo> repository) : base(repository) { }

        protected override TipoTrabajoDto MapToDto(TipoTrabajo entity) => new()
        {
            Id = entity.Id,
            NombreTipoTrabajo = entity.NombreTipoTrabajo,
            Descripcion = entity.Descripcion,
            IdEstadoGeneral = entity.IdEstadoGeneral,
            FechaCreacion = entity.FechaCreacion
        };

        protected override TipoTrabajo MapToEntity(TipoTrabajoCreateDto dto) => new()
        {
            NombreTipoTrabajo = dto.NombreTipoTrabajo,
            Descripcion = dto.Descripcion,
            IdEstadoGeneral = dto.IdEstadoGeneral,
            FechaCreacion = DateTime.UtcNow,
            IdUsuarioCreacion = dto.IdUsuarioCreacion
        };

        protected override void MapUpdateToEntity(TipoTrabajoUpdateDto dto, TipoTrabajo entity)
        {
            if (!string.IsNullOrEmpty(dto.NombreTipoTrabajo)) entity.NombreTipoTrabajo = dto.NombreTipoTrabajo;
            if (dto.Descripcion != null) entity.Descripcion = dto.Descripcion;
            if (dto.IdEstadoGeneral.HasValue) entity.IdEstadoGeneral = dto.IdEstadoGeneral.Value;
        }

        protected override long GetEntityId(TipoTrabajo entity) => entity.Id;
    }
}


