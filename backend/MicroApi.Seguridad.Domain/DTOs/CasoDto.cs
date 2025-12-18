namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO para representar un Caso en las respuestas de la API
    /// No incluye relaciones para evitar referencias circulares
    /// </summary>
    public class CasoDto
    {
        public long Id { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public long IdUsuarioReporta { get; set; }
        public string? TelefonoContacto { get; set; }
        public string? CorreoContacto { get; set; }
        public long IdEstadoCaso { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaAceptacion { get; set; }
        public DateTime? FechaResolucion { get; set; }
        public DateTime? FechaCierre { get; set; }
        public long IdTipoCaso { get; set; }
        public long? IdActivo { get; set; }
        public long? IdAreaTecnica { get; set; }
        public long IdPrioridad { get; set; }
        public long IdCanalIngreso { get; set; }
        public long? IdTecnicoAsignado { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para crear un nuevo Caso
    /// Solo incluye los campos necesarios para la creación
    /// </summary>
    public class CasoCreateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "La descripción es requerida")]
        [System.ComponentModel.DataAnnotations.StringLength(2000, ErrorMessage = "La descripción no puede exceder 2000 caracteres")]
        public string Descripcion { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario que reporta es requerido")]
        public long IdUsuarioReporta { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(20, ErrorMessage = "El teléfono no puede exceder 20 caracteres")]
        public string? TelefonoContacto { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(150, ErrorMessage = "El correo no puede exceder 150 caracteres")]
        [System.ComponentModel.DataAnnotations.EmailAddress(ErrorMessage = "El formato del correo no es válido")]
        public string? CorreoContacto { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del estado del caso es requerido")]
        public long IdEstadoCaso { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del tipo de caso es requerido")]
        public long IdTipoCaso { get; set; }

        public long? IdActivo { get; set; }

        public long? IdAreaTecnica { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID de prioridad es requerido")]
        public long IdPrioridad { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del canal de ingreso es requerido")]
        public long IdCanalIngreso { get; set; }

        public long? IdTecnicoAsignado { get; set; }

        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    /// <summary>
    /// DTO para actualizar un Caso existente
    /// Todos los campos son opcionales excepto el ID
    /// </summary>
    public class CasoUpdateDto
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "El ID del caso es requerido")]
        public long Id { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(2000, ErrorMessage = "La descripción no puede exceder 2000 caracteres")]
        public string? Descripcion { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(20, ErrorMessage = "El teléfono no puede exceder 20 caracteres")]
        public string? TelefonoContacto { get; set; }

        [System.ComponentModel.DataAnnotations.StringLength(150, ErrorMessage = "El correo no puede exceder 150 caracteres")]
        [System.ComponentModel.DataAnnotations.EmailAddress(ErrorMessage = "El formato del correo no es válido")]
        public string? CorreoContacto { get; set; }

        public long? IdEstadoCaso { get; set; }

        public DateTime? FechaAceptacion { get; set; }

        public DateTime? FechaResolucion { get; set; }

        public DateTime? FechaCierre { get; set; }

        public long? IdTipoCaso { get; set; }

        public long? IdActivo { get; set; }

        public long? IdAreaTecnica { get; set; }

        public long? IdPrioridad { get; set; }

        public long? IdCanalIngreso { get; set; }

        public long? IdTecnicoAsignado { get; set; }
    }

    /// <summary>
    /// DTO para representar un Caso con sus Trazabilidades
    /// Usado cuando se necesita el detalle completo de un caso
    /// </summary>
    public class CasoDetalleDto
    {
        public long Id { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public long IdUsuarioReporta { get; set; }
        public string? TelefonoContacto { get; set; }
        public string? CorreoContacto { get; set; }
        public long IdEstadoCaso { get; set; }
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaAceptacion { get; set; }
        public DateTime? FechaResolucion { get; set; }
        public DateTime? FechaCierre { get; set; }
        public long IdTipoCaso { get; set; }
        public long? IdActivo { get; set; }
        public long? IdAreaTecnica { get; set; }
        public long IdPrioridad { get; set; }
        public long IdCanalIngreso { get; set; }
        public long? IdTecnicoAsignado { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public long IdUsuarioCreacion { get; set; }
        
        // Trazabilidades sin referencia circular
        public List<TrazabilidadCasoDto> Trazabilidades { get; set; } = new();
    }

    /// <summary>
    /// DTO para filtros de búsqueda de casos
    /// </summary>
    public class CasoFiltrosDto
    {
        public long? IdEstadoCaso { get; set; }
        public long? IdTecnico { get; set; }
        public long? IdAreaTecnica { get; set; }
        public DateTime? FechaDesde { get; set; }
        public DateTime? FechaHasta { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
