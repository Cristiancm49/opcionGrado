namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Tipo de Caso
    /// </summary>
    public class TipoCasoDto
    {
        public long Id { get; set; }
        public string NombreTipoCaso { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public long IdEstadoGeneral { get; set; }
        public DateTime FechaCreacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Tipo de Caso
    /// </summary>
    public class TipoCasoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El nombre del tipo de caso es requerido")]
        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string NombreTipoCaso { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado general es requerido")]
        public long IdEstadoGeneral { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Tipo de Caso
    /// </summary>
    public class TipoCasoUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del tipo de caso es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
        public string? NombreTipoCaso { get; set; }

        public string? Descripcion { get; set; }

        public long? IdEstadoGeneral { get; set; }
    }
}




