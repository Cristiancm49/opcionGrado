using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class CanalIngresoService : GenericService<CanalIngreso, CanalIngresoDto, CanalIngresoCreateDto, CanalIngresoUpdateDto>, ICanalIngresoService
    {
        public CanalIngresoService(IGenericRepository<CanalIngreso> repository) : base(repository) { }

        protected override CanalIngresoDto MapToDto(CanalIngreso entity) => new()
        {
            Id = entity.Id,
            NombreCanal = entity.NombreCanal,
            Descripcion = entity.Descripcion,
            IdEstadoGeneral = entity.IdEstadoGeneral,
            FechaCreacion = entity.FechaCreacion
        };

        protected override CanalIngreso MapToEntity(CanalIngresoCreateDto dto) => new()
        {
            NombreCanal = dto.NombreCanal,
            Descripcion = dto.Descripcion,
            IdEstadoGeneral = dto.IdEstadoGeneral,
            FechaCreacion = DateTime.UtcNow,
            IdUsuarioCreacion = dto.IdUsuarioCreacion
        };

        protected override void MapUpdateToEntity(CanalIngresoUpdateDto dto, CanalIngreso entity)
        {
            if (!string.IsNullOrEmpty(dto.NombreCanal)) entity.NombreCanal = dto.NombreCanal;
            if (dto.Descripcion != null) entity.Descripcion = dto.Descripcion;
            if (dto.IdEstadoGeneral.HasValue) entity.IdEstadoGeneral = dto.IdEstadoGeneral.Value;
        }

        protected override long GetEntityId(CanalIngreso entity) => entity.Id;
    }
}


