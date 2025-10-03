using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("CASO", Schema = "soporte")]
    public class Caso
    {
        [Key]
        [Column("ID_CAS")]
        public int Id { get; set; }

        [Column("CASO_NUMERO")]
        [Required]
        [StringLength(20)]
        public string NumeroCaso { get; set; } = string.Empty;

        [Column("CASO_FECHAREGISTRO")]
        [Required]
        public DateTime FechaRegistro { get; set; }

        [Column("CASO_FECHAASIGNACION")]
        public DateTime? FechaAsignacion { get; set; }

        [Column("CASO_FECHALIMITE")]
        public DateTime? FechaLimite { get; set; }

        [Column("CASO_FECHAFIN")]
        public DateTime? FechaFin { get; set; }

        [Column("CASO_FECHAULTIMAACTUALIZACION")]
        public DateTime? FechaUltimaActualizacion { get; set; }

        [Column("CASO_SOLICITANTE")]
        [Required]
        [StringLength(200)]
        public string Solicitante { get; set; } = string.Empty;

        [Column("CASO_DEPENDENCIA")]
        [StringLength(200)]
        public string? Dependencia { get; set; }

        [Column("CASO_CONTACTO")]
        [StringLength(200)]
        public string? Contacto { get; set; }

        [Column("CASO_TELEFONO")]
        [StringLength(20)]
        public string? Telefono { get; set; }

        [Column("CASO_DESCRIPCION")]
        [Required]
        public string Descripcion { get; set; } = string.Empty;

        [Column("CASO_PRIORIDAD")]
        [Required]
        [StringLength(20)]
        public string Prioridad { get; set; } = string.Empty;

        [Column("CASO_AREATECNICA")]
        [StringLength(100)]
        public string? AreaTecnica { get; set; }

        [Column("CASO_TIPOTRABAJO")]
        [StringLength(50)]
        public string? TipoTrabajo { get; set; }

        [Column("CASO_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = string.Empty;

        [Column("CASO_ESTADOTECNICO")]
        [StringLength(20)]
        public string? EstadoTecnico { get; set; }

        [Column("CASO_TECNICOASIGNADO")]
        [StringLength(100)]
        public string? TecnicoAsignado { get; set; }

        [Column("CASO_DIASASIGNADO")]
        public int? DiasAsignado { get; set; }

        [Column("CASO_HORASESTIMADAS")]
        public int? HorasEstimadas { get; set; }

        [Column("CASO_HORASTRABAJADAS")]
        public int? HorasTrabajadas { get; set; }

        [Column("CASO_SLASTATUS")]
        [StringLength(20)]
        public string? SlaStatus { get; set; }

        [Column("CASO_PRIORIDADSLA")]
        public int? PrioridadSla { get; set; }

        [Column("CASO_UBICACION")]
        [StringLength(200)]
        public string? Ubicacion { get; set; }

        [Column("CASO_ELEMENTOAFECTADO")]
        [StringLength(200)]
        public string? ElementoAfectado { get; set; }

        [Column("CASO_OBSERVACIONES")]
        public string? Observaciones { get; set; }

        [Column("CASO_DIASABIERTO_CALC")]
        public int? DiasAbiertoCalc { get; set; }

        [Column("CASO_CANALINGRESO")]
        [StringLength(20)]
        public string? CanalIngreso { get; set; }

        [Column("CASO_USUARIOCREACION")]
        [StringLength(100)]
        public string? UsuarioCreacion { get; set; }

        [Column("CASO_USUARIOMODIFICACION")]
        [StringLength(100)]
        public string? UsuarioModificacion { get; set; }

        // Propiedades de navegación
        public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();
        public virtual ICollection<Diagnostico> Diagnosticos { get; set; } = new List<Diagnostico>();
        public virtual ICollection<Evidencia> Evidencias { get; set; } = new List<Evidencia>();
    }
}


