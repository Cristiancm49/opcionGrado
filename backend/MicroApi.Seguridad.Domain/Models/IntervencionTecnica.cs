using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("IntervencionTecnica", Schema = "soporte")]
    public class IntervencionTecnica
    {
        [Key]
        [Column("IdIntervencionTecnica")]
        public long Id { get; set; }

        [Column("IdTrazabilidadCaso")]
        [Required]
        public long IdTrazabilidadCaso { get; set; }

        [Column("IdTipoTrabajo")]
        [Required]
        public long IdTipoTrabajo { get; set; }

        [Column("IdEstadoIntervencion")]
        [Required]
        public long IdEstadoIntervencion { get; set; }

        [Column("FechaInicio")]
        [Required]
        public DateTime FechaInicio { get; set; }

        [Column("FechaFin")]
        public DateTime? FechaFin { get; set; }

        [Column("Diagnostico")]
        public string? Diagnostico { get; set; }

        [Column("SolucionAplicada")]
        public string? SolucionAplicada { get; set; }

        [Column("IdUsuarioAccion")]
        [Required]
        public long IdUsuarioAccion { get; set; }

        // Propiedades de navegación
        [ForeignKey("IdTrazabilidadCaso")]
        public virtual TrazabilidadCaso TrazabilidadCaso { get; set; } = null!;
    }
}



