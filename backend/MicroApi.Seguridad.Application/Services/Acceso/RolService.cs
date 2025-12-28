using MicroApi.Seguridad.Domain.DTOs.Acceso;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Acceso;

namespace MicroApi.Seguridad.Application.Services.Acceso
{
    public class RolService : GenericService<Rol, RolDto, RolCreateDto, RolUpdateDto>, IRolService
    {
        public RolService(IGenericRepository<Rol> repository) : base(repository)
        {
        }

        protected override long GetEntityId(Rol entity) => entity.Id;

        protected override RolDto MapToDto(Rol entity)
        {
            return new RolDto
            {
                Id = entity.Id,
                NombreRol = entity.NombreRol,
                Descripcion = entity.Descripcion,
                FechaCreacion = entity.FechaCreacion
            };
        }

        protected override Rol MapToEntity(RolCreateDto createDto)
        {
            return new Rol
            {
                NombreRol = createDto.NombreRol,
                Descripcion = createDto.Descripcion,
                IdUsuarioCreacion = createDto.IdUsuarioCreacion,
                FechaCreacion = DateTime.Now
            };
        }

        protected override void MapUpdateToEntity(RolUpdateDto updateDto, Rol entity)
        {
            if (!string.IsNullOrEmpty(updateDto.NombreRol))
                entity.NombreRol = updateDto.NombreRol;
            
            if (updateDto.Descripcion != null)
                entity.Descripcion = updateDto.Descripcion;
        }
    }
}

