using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models.Acceso
{
    [Table("Rol", Schema = "acceso")]
    public class Rol
    {
        [Key]
        [Column("IdRol")]
        public long Id { get; set; }

        [Column("NombreRol")]
        [Required]
        [StringLength(100)]
        public string NombreRol { get; set; } = string.Empty;

        [Column("Descripcion")]
        public string? Descripcion { get; set; }

        [Column("FechaCreacion")]
        [Required]
        public DateTime FechaCreacion { get; set; }

        [Column("IdUsuarioCreacion")]
        [Required]
        public long IdUsuarioCreacion { get; set; }

        // Navegación
        public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
    }
}



