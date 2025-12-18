namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Estado de Caso
    /// </summary>
    public class EstadoCasoDto
    {
        public long Id { get; set; }
        public string NombreEstadoCaso { get; set; } = string.Empty;
        public string? DescripcionEstadoCaso { get; set; }
        public int Orden { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Estado de Caso
    /// </summary>
    public class EstadoCasoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre del estado es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombreEstadoCaso { get; set; } = string.Empty;

        public string? DescripcionEstadoCaso { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El orden es requerido")]
        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El orden debe ser mayor a 0")]
        public int Orden { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Estado de Caso
    /// </summary>
    public class EstadoCasoUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombreEstadoCaso { get; set; }

        public string? DescripcionEstadoCaso { get; set; }

        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "El orden debe ser mayor a 0")]
        public int? Orden { get; set; }
    }
}


