using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("EVIDENCIA", Schema = "soporte")]
    public class Evidencia
    {
        [Key]
        [Column("ID_EVID")]
        public int Id { get; set; }

        [Column("EVID_CASOID")]
        public int? CasoId { get; set; }

        [Column("EVID_INCIDENCIAID")]
        public int? IncidenciaId { get; set; }

        [Column("EVID_NOMBREARCHIVO")]
        [Required]
        [StringLength(200)]
        public string NombreArchivo { get; set; } = string.Empty;

        [Column("EVID_RUTAARCHIVO")]
        [Required]
        [StringLength(500)]
        public string RutaArchivo { get; set; } = string.Empty;

        [Column("EVID_TIPOARCHIVO")]
        [Required]
        [StringLength(50)]
        public string TipoArchivo { get; set; } = string.Empty;

        [Column("EVID_TAMANOARCHIVO")]
        public long TamañoArchivo { get; set; }

        [Column("EVID_DESCRIPCION")]
        public string? Descripcion { get; set; }

        [Column("EVID_FECHASUBIDA")]
        [Required]
        public DateTime FechaSubida { get; set; }

        [Column("EVID_USUARIOSUBIDA")]
        [Required]
        [StringLength(100)]
        public string UsuarioSubida { get; set; } = string.Empty;

        [Column("EVID_ESPRINCIPAL")]
        public bool EsPrincipal { get; set; } = false;

        [Column("EVID_ORDEN")]
        public int? Orden { get; set; }

        [Column("EVID_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = "Activo";

        // Propiedades de navegación
        [ForeignKey("CasoId")]
        public virtual Caso? Caso { get; set; }

        [ForeignKey("IncidenciaId")]
        public virtual Incidencia? Incidencia { get; set; }
    }
}


