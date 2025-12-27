using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models.Catalogo
{
    [Table("EstadoCaso", Schema = "catalogo")]
    public class EstadoCaso
    {
        [Key]
        [Column("IdEstadoCaso")]
        public long Id { get; set; }

        [Column("NombreEstadoCaso")]
        [Required]
        [StringLength(100)]
        public string NombreEstadoCaso { get; set; } = string.Empty;

        [Column("DescripcionEstadoCaso")]
        public string? DescripcionEstadoCaso { get; set; }

        [Column("FechaCreacion")]
        [Required]
        public DateTime FechaCreacion { get; set; }

        [Column("IdUsuarioCreacion")]
        [Required]
        public long IdUsuarioCreacion { get; set; }
    }
}
