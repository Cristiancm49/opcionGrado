using MicroApi.Seguridad.Domain.DTOs.Inventario;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Application.Services.Inventario
{
    public class UbicacionService : GenericService<Ubicacion, UbicacionDto, UbicacionCreateDto, UbicacionUpdateDto>, IUbicacionService
    {
        public UbicacionService(IGenericRepository<Ubicacion> repository) : base(repository)
        {
        }

        protected override long GetEntityId(Ubicacion entity) => entity.Id;

        protected override UbicacionDto MapToDto(Ubicacion entity)
        {
            return new UbicacionDto
            {
                Id = entity.Id,
                Sede = entity.Sede,
                Bloque = entity.Bloque,
                Piso = entity.Piso,
                Sala = entity.Sala,
                Descripcion = entity.Descripcion,
                FechaCreacion = entity.FechaCreacion
            };
        }

        protected override Ubicacion MapToEntity(UbicacionCreateDto createDto)
        {
            return new Ubicacion
            {
                Sede = createDto.Sede,
                Bloque = createDto.Bloque,
                Piso = createDto.Piso,
                Sala = createDto.Sala,
                Descripcion = createDto.Descripcion,
                IdUsuarioCreacion = createDto.IdUsuarioCreacion,
                FechaCreacion = DateTime.Now
            };
        }

        protected override void MapUpdateToEntity(UbicacionUpdateDto updateDto, Ubicacion entity)
        {
            if (!string.IsNullOrEmpty(updateDto.Sede))
                entity.Sede = updateDto.Sede;
            
            if (updateDto.Bloque != null)
                entity.Bloque = updateDto.Bloque;
            
            if (updateDto.Piso != null)
                entity.Piso = updateDto.Piso;
            
            if (updateDto.Sala != null)
                entity.Sala = updateDto.Sala;
            
            if (updateDto.Descripcion != null)
                entity.Descripcion = updateDto.Descripcion;
        }
    }
}

