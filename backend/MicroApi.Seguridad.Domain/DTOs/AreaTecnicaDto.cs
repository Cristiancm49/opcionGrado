namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Área Técnica
    /// </summary>
    public class AreaTecnicaDto
    {
        public long Id { get; set; }
        public string NombreAreaTecnica { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public long IdEncargado { get; set; }
        public long IdEstadoGeneral { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Área Técnica
    /// </summary>
    public class AreaTecnicaCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre del área técnica es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombreAreaTecnica { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del encargado es requerido")]
        public long IdEncargado { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado general es requerido")]
        public long IdEstadoGeneral { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Área Técnica
    /// </summary>
    public class AreaTecnicaUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del área técnica es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombreAreaTecnica { get; set; }

        public string? Descripcion { get; set; }

        public long? IdEncargado { get; set; }

        public long? IdEstadoGeneral { get; set; }
    }
}


