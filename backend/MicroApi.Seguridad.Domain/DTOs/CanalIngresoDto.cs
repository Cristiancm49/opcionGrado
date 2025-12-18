namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Canal de Ingreso
    /// </summary>
    public class CanalIngresoDto
    {
        public long Id { get; set; }
        public string NombreCanal { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public long IdEstadoGeneral { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Canal de Ingreso
    /// </summary>
    public class CanalIngresoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre del canal es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombreCanal { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado general es requerido")]
        public long IdEstadoGeneral { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Canal de Ingreso
    /// </summary>
    public class CanalIngresoUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del canal es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombreCanal { get; set; }

        public string? Descripcion { get; set; }

        public long? IdEstadoGeneral { get; set; }
    }
}


