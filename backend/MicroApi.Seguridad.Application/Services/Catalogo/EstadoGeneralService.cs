using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Application.Services.Catalogo
{
    /// <summary>
    /// Servicio para gestionar EstadoGeneral (Activo/Inactivo).
    /// 
    /// Esta es la tabla más simple del sistema.
    /// Hereda todo el CRUD de GenericService.
    /// </summary>
    public class EstadoGeneralService : GenericService<
        EstadoGeneral,
        EstadoGeneralDto,
        EstadoGeneralCreateDto,
        EstadoGeneralUpdateDto>,
        IEstadoGeneralService
    {
        public EstadoGeneralService(IGenericRepository<EstadoGeneral> repository) 
            : base(repository)
        {
        }

        // ==================== MÉTODOS DE MAPEO ====================

        /// <summary>
        /// Convierte EstadoGeneral (Entity) → EstadoGeneralDto
        /// </summary>
        protected override EstadoGeneralDto MapToDto(EstadoGeneral entity)
        {
            return new EstadoGeneralDto
            {
                Id = entity.Id,
                NombreEstado = entity.NombreEstado,
                Descripcion = entity.Descripcion,
                FechaCreacion = entity.FechaCreacion
            };
        }

        /// <summary>
        /// Convierte EstadoGeneralCreateDto → EstadoGeneral (Entity)
        /// </summary>
        protected override EstadoGeneral MapToEntity(EstadoGeneralCreateDto createDto)
        {
            return new EstadoGeneral
            {
                NombreEstado = createDto.NombreEstado,
                Descripcion = createDto.Descripcion,
                FechaCreacion = DateTime.UtcNow,
                IdUsuarioCreacion = createDto.IdUsuarioCreacion
            };
        }

        /// <summary>
        /// Aplica los cambios del UpdateDto sobre la entidad existente
        /// </summary>
        protected override void MapUpdateToEntity(EstadoGeneralUpdateDto updateDto, EstadoGeneral entity)
        {
            if (!string.IsNullOrEmpty(updateDto.NombreEstado))
                entity.NombreEstado = updateDto.NombreEstado;

            if (updateDto.Descripcion != null)
                entity.Descripcion = updateDto.Descripcion;
        }

        /// <summary>
        /// Obtiene el ID de la entidad
        /// </summary>
        protected override long GetEntityId(EstadoGeneral entity)
        {
            return entity.Id;
        }
    }
}
