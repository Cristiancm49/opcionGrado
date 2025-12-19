namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar una Trazabilidad de Caso
    /// No incluye la referencia al Caso para evitar referencias circulares
    /// </summary>
    public class TrazabilidadCasoDto
    {
        public long Id { get; set; }
        public long IdCaso { get; set; }
        public DateTime FechaEvento { get; set; }
        public long IdUsuarioAccion { get; set; }
        public string TipoEvento { get; set; } = string.Empty; // Creacion, CambioEstado, Asignacion, Reasignacion, Comentario, Resolucion, Cierre
        public string? Comentario { get; set; }
        public long? IdEstadoCaso { get; set; }
        public long? IdAreaTecnica { get; set; }
        public long? IdTecnicoAsignado { get; set; }
        
        // Intervenciones técnicas sin referencia circular
        public List<IntervencionTecnicaDto> IntervencionesTecnicas { get; set; } = new();
    }

    /// <summary>
    /// DTO para crear una nueva Trazabilidad de Caso
    /// </summary>
    public class TrazabilidadCasoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del caso es requerido")]
        public long IdCaso { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de acción es requerido")]
        public long IdUsuarioAccion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El tipo de evento es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El tipo de evento no puede exceder 100 caracteres")]
        public string TipoEvento { get; set; } = string.Empty;

        public string? Comentario { get; set; }

        public long? IdEstadoCaso { get; set; }

        public long? IdAreaTecnica { get; set; }

        public long? IdTecnicoAsignado { get; set; }
    }
}




