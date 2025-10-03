using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("INCIDENCIA", Schema = "soporte")]
    public class Incidencia
    {
        [Key]
        [Column("ID_INC")]
        public int Id { get; set; }

        [Column("INC_NUMERO")]
        [Required]
        [StringLength(20)]
        public string NumeroIncidencia { get; set; } = string.Empty;

        [Column("INC_FECHAREGISTRO")]
        [Required]
        public DateTime FechaRegistro { get; set; }

        [Column("INC_FECHAMODIFICACION")]
        public DateTime? FechaModificacion { get; set; }

        [Column("INC_SOLICITANTE")]
        [Required]
        [StringLength(200)]
        public string Solicitante { get; set; } = string.Empty;

        [Column("INC_DEPENDENCIA")]
        [StringLength(200)]
        public string? Dependencia { get; set; }

        [Column("INC_CONTACTO")]
        [StringLength(200)]
        public string? Contacto { get; set; }

        [Column("INC_TELEFONO")]
        [StringLength(20)]
        public string? Telefono { get; set; }

        [Column("INC_DESCRIPCION")]
        [Required]
        public string Descripcion { get; set; } = string.Empty;

        [Column("INC_PRIORIDAD")]
        [Required]
        [StringLength(20)]
        public string Prioridad { get; set; } = string.Empty;

        [Column("INC_AREATECNICA")]
        [StringLength(100)]
        public string? AreaTecnica { get; set; }

        [Column("INC_TIPOTRABAJO")]
        [StringLength(50)]
        public string? TipoTrabajo { get; set; }

        [Column("INC_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = string.Empty;

        [Column("INC_TECNICOASIGNADO")]
        [StringLength(100)]
        public string? TecnicoAsignado { get; set; }

        [Column("INC_DIASABIERTO")]
        public int? DiasAbierto { get; set; }

        [Column("INC_SLASTATUS")]
        [StringLength(20)]
        public string? SlaStatus { get; set; }

        [Column("INC_UBICACION")]
        [StringLength(200)]
        public string? Ubicacion { get; set; }

        [Column("INC_ELEMENTOAFECTADO")]
        [StringLength(200)]
        public string? ElementoAfectado { get; set; }

        [Column("INC_OBSERVACIONES")]
        public string? Observaciones { get; set; }

        [Column("INC_CANALINGRESO")]
        [StringLength(20)]
        public string? CanalIngreso { get; set; }

        [Column("INC_USUARIOCREACION")]
        [StringLength(100)]
        public string? UsuarioCreacion { get; set; }

        [Column("INC_USUARIOMODIFICACION")]
        [StringLength(100)]
        public string? UsuarioModificacion { get; set; }

        // Propiedades de navegación
        public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();
        public virtual ICollection<Evidencia> Evidencias { get; set; } = new List<Evidencia>();
        public virtual ICollection<Encuesta> Encuestas { get; set; } = new List<Encuesta>();
    }
}


