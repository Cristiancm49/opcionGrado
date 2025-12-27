using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class PrioridadService : GenericService<Prioridad, PrioridadDto, PrioridadCreateDto, PrioridadUpdateDto>, IPrioridadService
    {
        public PrioridadService(IGenericRepository<Prioridad> repository) : base(repository) { }

        protected override PrioridadDto MapToDto(Prioridad entity) => new()
        {
            Id = entity.Id,
            NombrePrioridad = entity.NombrePrioridad,
            TiempoRespuestaDias = entity.TiempoRespuestaDias,
            TiempoResolucionDias = entity.TiempoResolucionDias,
            IdEstadoGeneral = entity.IdEstadoGeneral,
            FechaCreacion = entity.FechaCreacion
        };

        protected override Prioridad MapToEntity(PrioridadCreateDto dto) => new()
        {
            NombrePrioridad = dto.NombrePrioridad,
            TiempoRespuestaDias = dto.TiempoRespuestaDias,
            TiempoResolucionDias = dto.TiempoResolucionDias,
            IdEstadoGeneral = dto.IdEstadoGeneral,
            FechaCreacion = DateTime.UtcNow,
            IdUsuarioCreacion = dto.IdUsuarioCreacion
        };

        protected override void MapUpdateToEntity(PrioridadUpdateDto dto, Prioridad entity)
        {
            if (!string.IsNullOrEmpty(dto.NombrePrioridad)) entity.NombrePrioridad = dto.NombrePrioridad;
            if (dto.TiempoRespuestaDias.HasValue) entity.TiempoRespuestaDias = dto.TiempoRespuestaDias.Value;
            if (dto.TiempoResolucionDias.HasValue) entity.TiempoResolucionDias = dto.TiempoResolucionDias.Value;
            if (dto.IdEstadoGeneral.HasValue) entity.IdEstadoGeneral = dto.IdEstadoGeneral.Value;
        }

        protected override long GetEntityId(Prioridad entity) => entity.Id;
    }
}


