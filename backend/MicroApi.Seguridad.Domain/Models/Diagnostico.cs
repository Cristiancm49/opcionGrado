using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("DIAGNOSTICO", Schema = "soporte")]
    public class Diagnostico
    {
        [Key]
        [Column("ID_DIAG")]
        public int Id { get; set; }

        [Column("DIAG_CASOID")]
        [Required]
        public int CasoId { get; set; }

        [Column("DIAG_FECHA")]
        [Required]
        public DateTime Fecha { get; set; }

        [Column("DIAG_TECNICO")]
        [Required]
        [StringLength(100)]
        public string Tecnico { get; set; } = string.Empty;

        [Column("DIAG_DESCRIPCION")]
        [Required]
        public string Descripcion { get; set; } = string.Empty;

        [Column("DIAG_CAUSARAIZ")]
        public string? CausaRaiz { get; set; }

        [Column("DIAG_SOLUCIONPROPUESTA")]
        public string? SolucionPropuesta { get; set; }

        [Column("DIAG_TIEMPOESTIMADO")]
        public int? TiempoEstimado { get; set; }

        [Column("DIAG_MATERIALESREQUERIDOS")]
        public string? MaterialesRequeridos { get; set; }

        [Column("DIAG_COSTOESTIMADO")]
        public decimal? CostoEstimado { get; set; }

        [Column("DIAG_PRIORIDAD")]
        [StringLength(20)]
        public string? Prioridad { get; set; }

        [Column("DIAG_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = string.Empty;

        [Column("DIAG_OBSERVACIONES")]
        public string? Observaciones { get; set; }

        [Column("DIAG_ARCHIVOSADJUNTOS")]
        public string? ArchivosAdjuntos { get; set; }

        // Propiedades de navegación
        [ForeignKey("CasoId")]
        public virtual Caso Caso { get; set; } = null!;
    }
}


