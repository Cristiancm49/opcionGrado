namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar una Prioridad
    /// </summary>
    public class PrioridadDto
    {
        public long Id { get; set; }
        public string NombrePrioridad { get; set; } = string.Empty;
        public int TiempoRespuestaDias { get; set; }
        public int TiempoResolucionDias { get; set; }
        public long IdEstadoGeneral { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear una nueva Prioridad
    /// </summary>
    public class PrioridadCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre de la prioridad es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombrePrioridad { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El tiempo de respuesta es requerido")]
        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El tiempo de respuesta debe ser mayor a 0")]
        public int TiempoRespuestaDias { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El tiempo de resolución es requerido")]
        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El tiempo de resolución debe ser mayor a 0")]
        public int TiempoResolucionDias { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado general es requerido")]
        public long IdEstadoGeneral { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar una Prioridad
    /// </summary>
    public class PrioridadUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID de la prioridad es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombrePrioridad { get; set; }

        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El tiempo de respuesta debe ser mayor a 0")]
        public int? TiempoRespuestaDias { get; set; }

        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El tiempo de resolución debe ser mayor a 0")]
        public int? TiempoResolucionDias { get; set; }

        public long? IdEstadoGeneral { get; set; }
    }
}


