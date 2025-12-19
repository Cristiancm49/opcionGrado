namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Tipo de Trabajo
    /// </summary>
    public class TipoTrabajoDto
    {
        public long Id { get; set; }
        public string NombreTipoTrabajo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public long IdEstadoGeneral { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Tipo de Trabajo
    /// </summary>
    public class TipoTrabajoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre del tipo de trabajo es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombreTipoTrabajo { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado general es requerido")]
        public long IdEstadoGeneral { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Tipo de Trabajo
    /// </summary>
    public class TipoTrabajoUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del tipo de trabajo es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombreTipoTrabajo { get; set; }

        public string? Descripcion { get; set; }

        public long? IdEstadoGeneral { get; set; }
    }
}




