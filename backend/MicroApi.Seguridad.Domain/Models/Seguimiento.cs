using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("SEGUIMIENTO", Schema = "soporte")]
    public class Seguimiento
    {
        [Key]
        [Column("ID_SEG")]
        public int Id { get; set; }

        [Column("SEG_CASOID")]
        public int? CasoId { get; set; }

        [Column("SEG_INCIDENCIAID")]
        public int? IncidenciaId { get; set; }

        [Column("SEG_FECHA")]
        [Required]
        public DateTime Fecha { get; set; }

        [Column("SEG_USUARIO")]
        [Required]
        [StringLength(100)]
        public string Usuario { get; set; } = string.Empty;

        [Column("SEG_ACCION")]
        [Required]
        [StringLength(200)]
        public string Accion { get; set; } = string.Empty;

        [Column("SEG_DESCRIPCION")]
        public string? Descripcion { get; set; }

        [Column("SEG_ESTADOANTERIOR")]
        [StringLength(20)]
        public string? EstadoAnterior { get; set; }

        [Column("SEG_ESTADONUEVO")]
        [StringLength(20)]
        public string? EstadoNuevo { get; set; }

        [Column("SEG_TIEMPOINVERTIDO")]
        public int? TiempoInvertido { get; set; }

        [Column("SEG_OBSERVACIONES")]
        public string? Observaciones { get; set; }

        [Column("SEG_ARCHIVOSADJUNTOS")]
        public string? ArchivosAdjuntos { get; set; }

        // Propiedades de navegación
        [ForeignKey("CasoId")]
        public virtual Caso? Caso { get; set; }

        [ForeignKey("IncidenciaId")]
        public virtual Incidencia? Incidencia { get; set; }
    }
}


