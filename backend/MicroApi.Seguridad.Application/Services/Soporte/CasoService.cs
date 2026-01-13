using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Soporte;

namespace MicroApi.Seguridad.Application.Services.Soporte
{
    public class CasoService : ICasoService
    {
        private readonly ICasoRepository _repository;

        public CasoService(ICasoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CasoDto>> GetAllAsync()
        {
            var casos = await _repository.GetAllAsync();
            return casos.Select(MapToDto);
        }

        public async Task<CasoDto?> GetByIdAsync(long id)
        {
            var caso = await _repository.GetByIdAsync(id);
            return caso == null ? null : MapToDto(caso);
        }

        public async Task<CasoDetalleDto?> GetDetalleByIdAsync(long id)
        {
            var caso = await _repository.GetByIdAsync(id);
            if (caso == null) return null;

            return new CasoDetalleDto
            {
                Id = caso.Id,
                Descripcion = caso.Descripcion,
                IdUsuarioReporta = caso.IdUsuarioReporta,
                NombreUsuarioReporta = caso.UsuarioReporta?.NombreCompleto,
                TelefonoContacto = caso.TelefonoContacto,
                CorreoContacto = caso.CorreoContacto,
                IdEstadoCaso = caso.IdEstadoCaso,
                NombreEstadoCaso = caso.EstadoCaso?.NombreEstadoCaso,
                FechaRegistro = caso.FechaRegistro,
                FechaAceptacion = caso.FechaAceptacion,
                FechaResolucion = caso.FechaResolucion,
                FechaCierre = caso.FechaCierre,
                IdTipoCaso = caso.IdTipoCaso,
                NombreTipoCaso = caso.TipoCaso?.NombreTipoCaso,
                IdActivo = caso.IdActivo,
                NombreActivo = caso.Activo?.NombreActivo,
                IdAreaTecnica = caso.IdAreaTecnica,
                NombreAreaTecnica = caso.AreaTecnica?.NombreAreaTecnica,
                IdPrioridad = caso.IdPrioridad,
                NombrePrioridad = caso.Prioridad?.NombrePrioridad,
                IdCanalIngreso = caso.IdCanalIngreso,
                NombreCanalIngreso = caso.CanalIngreso?.NombreCanal,
                IdTecnicoAsignado = caso.IdTecnicoAsignado,
                NombreTecnicoAsignado = caso.TecnicoAsignado?.NombreCompleto,
                FechaActualizacion = caso.FechaActualizacion,
                IdUsuarioCreacion = caso.IdUsuarioCreacion,
                Trazabilidades = caso.Trazabilidades?.Select(t => new TrazabilidadCasoDto
                {
                    Id = t.Id,
                    IdCaso = t.IdCaso,
                    FechaEvento = t.FechaEvento,
                    IdUsuarioAccion = t.IdUsuarioAccion,
                    TipoEvento = t.TipoEvento,
                    Comentario = t.Comentario,
                    IdEstadoCaso = t.IdEstadoCaso,
                    NombreEstadoCaso = t.EstadoCaso?.NombreEstadoCaso,
                    IdAreaTecnica = t.IdAreaTecnica,
                    NombreAreaTecnica = t.AreaTecnica?.NombreAreaTecnica,
                    IdTecnicoAsignado = t.IdTecnicoAsignado
                }).ToList() ?? new List<TrazabilidadCasoDto>()
            };
        }

        public async Task<IEnumerable<CasoDto>> GetByTecnicoAsync(long idTecnico)
        {
            var casos = await _repository.GetByTecnicoAsync(idTecnico);
            return casos.Select(MapToDto);
        }

        public async Task<IEnumerable<CasoDto>> GetByEstadoAsync(long idEstadoCaso)
        {
            var casos = await _repository.GetByEstadoAsync(idEstadoCaso);
            return casos.Select(MapToDto);
        }

        public async Task<IEnumerable<CasoDto>> GetByFiltrosAsync(CasoFiltrosDto filtros)
        {
            var casos = await _repository.GetByFiltrosAsync(
                filtros.IdEstadoCaso,
                filtros.IdTecnico,
                filtros.IdAreaTecnica,
                filtros.FechaDesde,
                filtros.FechaHasta
            );
            return casos.Select(MapToDto);
        }

        public async Task<CasoDto> CreateAsync(CasoCreateDto dto)
        {
            var caso = new Caso
            {
                Descripcion = dto.Descripcion,
                IdUsuarioReporta = dto.IdUsuarioReporta,
                TelefonoContacto = dto.TelefonoContacto,
                CorreoContacto = dto.CorreoContacto,
                IdEstadoCaso = dto.IdEstadoCaso,
                FechaRegistro = DateTime.UtcNow,
                IdTipoCaso = dto.IdTipoCaso,
                IdActivo = dto.IdActivo,
                IdAreaTecnica = dto.IdAreaTecnica,
                IdPrioridad = dto.IdPrioridad,
                IdCanalIngreso = dto.IdCanalIngreso,
                IdTecnicoAsignado = dto.IdTecnicoAsignado,
                IdUsuarioCreacion = dto.IdUsuarioCreacion
            };

            var created = await _repository.CreateAsync(caso);
            return MapToDto(created);
        }

        public async Task<CasoDto?> UpdateAsync(CasoUpdateDto dto)
        {
            var caso = await _repository.GetByIdAsync(dto.Id);
            if (caso == null) return null;

            if (dto.Descripcion != null) caso.Descripcion = dto.Descripcion;
            if (dto.TelefonoContacto != null) caso.TelefonoContacto = dto.TelefonoContacto;
            if (dto.CorreoContacto != null) caso.CorreoContacto = dto.CorreoContacto;
            if (dto.IdEstadoCaso.HasValue) caso.IdEstadoCaso = dto.IdEstadoCaso.Value;
            if (dto.FechaAceptacion.HasValue) caso.FechaAceptacion = dto.FechaAceptacion;
            if (dto.FechaResolucion.HasValue) caso.FechaResolucion = dto.FechaResolucion;
            if (dto.FechaCierre.HasValue) caso.FechaCierre = dto.FechaCierre;
            if (dto.IdTipoCaso.HasValue) caso.IdTipoCaso = dto.IdTipoCaso.Value;
            if (dto.IdActivo.HasValue) caso.IdActivo = dto.IdActivo;
            if (dto.IdAreaTecnica.HasValue) caso.IdAreaTecnica = dto.IdAreaTecnica;
            if (dto.IdPrioridad.HasValue) caso.IdPrioridad = dto.IdPrioridad.Value;
            if (dto.IdCanalIngreso.HasValue) caso.IdCanalIngreso = dto.IdCanalIngreso.Value;
            if (dto.IdTecnicoAsignado.HasValue) caso.IdTecnicoAsignado = dto.IdTecnicoAsignado;

            var updated = await _repository.UpdateAsync(caso);
            return MapToDto(updated);
        }

        public async Task<int> CountAsync()
        {
            return await _repository.CountAsync();
        }

        private CasoDto MapToDto(Caso caso)
        {
            return new CasoDto
            {
                Id = caso.Id,
                Descripcion = caso.Descripcion,
                IdUsuarioReporta = caso.IdUsuarioReporta,
                NombreUsuarioReporta = caso.UsuarioReporta?.NombreCompleto,
                TelefonoContacto = caso.TelefonoContacto,
                CorreoContacto = caso.CorreoContacto,
                IdEstadoCaso = caso.IdEstadoCaso,
                NombreEstadoCaso = caso.EstadoCaso?.NombreEstadoCaso,
                FechaRegistro = caso.FechaRegistro,
                FechaAceptacion = caso.FechaAceptacion,
                FechaResolucion = caso.FechaResolucion,
                FechaCierre = caso.FechaCierre,
                IdTipoCaso = caso.IdTipoCaso,
                NombreTipoCaso = caso.TipoCaso?.NombreTipoCaso,
                IdActivo = caso.IdActivo,
                NombreActivo = caso.Activo?.NombreActivo,
                IdAreaTecnica = caso.IdAreaTecnica,
                NombreAreaTecnica = caso.AreaTecnica?.NombreAreaTecnica,
                IdPrioridad = caso.IdPrioridad,
                NombrePrioridad = caso.Prioridad?.NombrePrioridad,
                IdCanalIngreso = caso.IdCanalIngreso,
                NombreCanalIngreso = caso.CanalIngreso?.NombreCanal,
                IdTecnicoAsignado = caso.IdTecnicoAsignado,
                NombreTecnicoAsignado = caso.TecnicoAsignado?.NombreCompleto,
                FechaActualizacion = caso.FechaActualizacion,
                IdUsuarioCreacion = caso.IdUsuarioCreacion
            };
        }
    }
}

