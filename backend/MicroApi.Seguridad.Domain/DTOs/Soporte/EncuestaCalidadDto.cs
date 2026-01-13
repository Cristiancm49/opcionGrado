using System.ComponentModel.DataAnnotations;

namespace MicroApi.Seguridad.Domain.DTOs.Soporte
{
    public class EncuestaCalidadDto
    {
        public long Id { get; set; }
        public long IdCaso { get; set; }
        public DateTime FechaEncuesta { get; set; }
        public string? Observaciones { get; set; }
        public long IdUsuarioCreacion { get; set; }
        public string? NombreUsuario { get; set; }
        public List<DetalleEncuestaDto> Detalles { get; set; } = new();
    }

    public class EncuestaCalidadCreateDto
    {
        [Required(ErrorMessage = "El ID del caso es requerido")]
        public long IdCaso { get; set; }

        public string? Observaciones { get; set; }

        [Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }

        /// <summary>
        /// Detalles de la encuesta (preguntas y respuestas)
        /// </summary>
        public List<DetalleEncuestaCreateDto> Detalles { get; set; } = new();
    }
}









