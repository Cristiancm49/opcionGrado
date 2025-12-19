namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar una Intervención Técnica
    /// No incluye la referencia a TrazabilidadCaso para evitar referencias circulares
    /// </summary>
    public class IntervencionTecnicaDto
    {
        public long Id { get; set; }
        public long IdTrazabilidadCaso { get; set; }
        public long IdTipoTrabajo { get; set; }
        public long IdEstadoIntervencion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string? Diagnostico { get; set; }
        public string? SolucionAplicada { get; set; }
        public long IdUsuarioAccion { get; set; }
    }

    /// <summary>
    /// DTO para crear una nueva Intervención Técnica
    /// </summary>
    public class IntervencionTecnicaCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID de trazabilidad de caso es requerido")]
        public long IdTrazabilidadCaso { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del tipo de trabajo es requerido")]
        public long IdTipoTrabajo { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado de intervención es requerido")]
        public long IdEstadoIntervencion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "La fecha de inicio es requerida")]
        public DateTime FechaInicio { get; set; }

        public DateTime? FechaFin { get; set; }

        public string? Diagnostico { get; set; }

        public string? SolucionAplicada { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de acción es requerido")]
        public long IdUsuarioAccion { get; set; }
    }
}




