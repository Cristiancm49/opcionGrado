using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("ENCUESTA", Schema = "soporte")]
    public class Encuesta
    {
        [Key]
        [Column("ID_ENC")]
        public int Id { get; set; }

        [Column("ENC_INCIDENCIAID")]
        [Required]
        public int IncidenciaId { get; set; }

        [Column("ENC_FECHA")]
        [Required]
        public DateTime Fecha { get; set; }

        [Column("ENC_SOLICITANTE")]
        [Required]
        [StringLength(200)]
        public string Solicitante { get; set; } = string.Empty;

        [Column("ENC_CALIFICACIONGENERAL")]
        [Required]
        public int CalificacionGeneral { get; set; }

        [Column("ENC_TIEMPORESPUESTA")]
        public int? TiempoRespuesta { get; set; }

        [Column("ENC_ATENCIONTECNICO")]
        public int? AtencionTecnico { get; set; }

        [Column("ENC_CALIDADTRABAJO")]
        public int? CalidadTrabajo { get; set; }

        [Column("ENC_COMUNICACION")]
        public int? Comunicacion { get; set; }

        [Column("ENC_SOLUCIONPROBLEMA")]
        public int? SolucionProblema { get; set; }

        [Column("ENC_RECOMENDARIA")]
        public bool? Recomendaria { get; set; }

        [Column("ENC_COMENTARIOS")]
        public string? Comentarios { get; set; }

        [Column("ENC_SUGERENCIAS")]
        public string? Sugerencias { get; set; }

        [Column("ENC_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = "Completada";

        [Column("ENC_FECHACREACION")]
        [Required]
        public DateTime FechaCreacion { get; set; }

        [Column("ENC_FECHAMODIFICACION")]
        public DateTime? FechaModificacion { get; set; }

        // Propiedades de navegación
        [ForeignKey("IncidenciaId")]
        public virtual Incidencia Incidencia { get; set; } = null!;
    }
}


