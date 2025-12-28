using System.ComponentModel.DataAnnotations;

namespace MicroApi.Seguridad.Domain.DTOs.Soporte
{
    public class IntervencionTecnicaDto
    {
        public long Id { get; set; }
        public long IdTrazabilidadCaso { get; set; }
        public long IdTipoTrabajo { get; set; }
        public string? NombreTipoTrabajo { get; set; }
        public long IdEstadoIntervencion { get; set; }
        public string? NombreEstadoIntervencion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string? Diagnostico { get; set; }
        public string? SolucionAplicada { get; set; }
        public long IdUsuarioAccion { get; set; }
        public string? NombreUsuarioAccion { get; set; }
        public List<DetalleCambioComponentesDto> CambiosComponentes { get; set; } = new();
        public List<DetalleConsumibleDto> DetallesConsumibles { get; set; } = new();
        public RevisionAdmiDto? RevisionAdmi { get; set; }
    }

    public class IntervencionTecnicaCreateDto
    {
        [Required(ErrorMessage = "El ID de trazabilidad de caso es requerido")]
        public long IdTrazabilidadCaso { get; set; }

        [Required(ErrorMessage = "El ID del tipo de trabajo es requerido")]
        public long IdTipoTrabajo { get; set; }

        [Required(ErrorMessage = "El ID del estado de intervención es requerido")]
        public long IdEstadoIntervencion { get; set; }

        [Required(ErrorMessage = "La fecha de inicio es requerida")]
        public DateTime FechaInicio { get; set; }

        public DateTime? FechaFin { get; set; }

        public string? Diagnostico { get; set; }

        public string? SolucionAplicada { get; set; }

        [Required(ErrorMessage = "El ID del usuario de acción es requerido")]
        public long IdUsuarioAccion { get; set; }
    }

    public class IntervencionTecnicaUpdateDto
    {
        [Required(ErrorMessage = "El ID de la intervención es requerido")]
        public long Id { get; set; }

        public long? IdTipoTrabajo { get; set; }

        public long? IdEstadoIntervencion { get; set; }

        public DateTime? FechaFin { get; set; }

        public string? Diagnostico { get; set; }

        public string? SolucionAplicada { get; set; }
    }
}



