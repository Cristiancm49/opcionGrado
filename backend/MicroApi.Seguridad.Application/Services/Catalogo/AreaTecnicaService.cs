using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class AreaTecnicaService : GenericService<AreaTecnica, AreaTecnicaDto, AreaTecnicaCreateDto, AreaTecnicaUpdateDto>, IAreaTecnicaService
    {
        public AreaTecnicaService(IGenericRepository<AreaTecnica> repository) : base(repository)
        {
        }

        protected override AreaTecnicaDto MapToDto(AreaTecnica entity)
        {
            return new AreaTecnicaDto
            {
                Id = entity.Id,
                NombreAreaTecnica = entity.NombreAreaTecnica,
                Descripcion = entity.Descripcion,
                IdEncargado = entity.IdEncargado,
                IdEstadoGeneral = entity.IdEstadoGeneral,
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
    }
}


