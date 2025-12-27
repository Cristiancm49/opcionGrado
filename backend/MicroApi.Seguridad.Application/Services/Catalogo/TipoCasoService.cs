using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    public class TipoCasoService : GenericService<TipoCaso, TipoCasoDto, TipoCasoCreateDto, TipoCasoUpdateDto>, ITipoCasoService
    {
        public TipoCasoService(IGenericRepository<TipoCaso> repository) : base(repository) { }

        protected override TipoCasoDto MapToDto(TipoCaso entity) => new()
        {
            Id = entity.Id,
            NombreTipoCaso = entity.NombreTipoCaso,
            Descripcion = entity.Descripcion,
            IdEstadoGeneral = entity.IdEstadoGeneral,
            FechaCreacion = entity.FechaCreacion
        };

        protected override TipoCaso MapToEntity(TipoCasoCreateDto dto) => new()
        {
            NombreTipoCaso = dto.NombreTipoCaso,
            Descripcion = dto.Descripcion,
            IdEstadoGeneral = dto.IdEstadoGeneral,
            FechaCreacion = DateTime.UtcNow,
            IdUsuarioCreacion = dto.IdUsuarioCreacion
        };

        protected override void MapUpdateToEntity(TipoCasoUpdateDto dto, TipoCaso entity)
        {
            if (!string.IsNullOrEmpty(dto.NombreTipoCaso)) entity.NombreTipoCaso = dto.NombreTipoCaso;
            if (dto.Descripcion != null) entity.Descripcion = dto.Descripcion;
            if (dto.IdEstadoGeneral.HasValue) entity.IdEstadoGeneral = dto.IdEstadoGeneral.Value;
        }

        protected override long GetEntityId(TipoCaso entity) => entity.Id;
    }
}


