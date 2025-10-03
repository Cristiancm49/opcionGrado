using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroApi.Seguridad.Domain.Models
{
    [Table("INVENTARIO", Schema = "inventario")]
    public class Inventario
    {
        [Key]
        [Column("ID_INV")]
        public int Id { get; set; }

        [Column("INV_CODIGO")]
        [Required]
        [StringLength(50)]
        public string Codigo { get; set; } = string.Empty;

        [Column("INV_NOMBRE")]
        [Required]
        [StringLength(200)]
        public string Nombre { get; set; } = string.Empty;

        [Column("INV_DESCRIPCION")]
        public string? Descripcion { get; set; }

        [Column("INV_TIPO")]
        [Required]
        [StringLength(20)]
        public string Tipo { get; set; } = string.Empty; // Activo, Consumible

        [Column("INV_CATEGORIA")]
        [StringLength(100)]
        public string? Categoria { get; set; }

        [Column("INV_MARCA")]
        [StringLength(100)]
        public string? Marca { get; set; }

        [Column("INV_MODELO")]
        [StringLength(100)]
        public string? Modelo { get; set; }

        [Column("INV_SERIE")]
        [StringLength(100)]
        public string? Serie { get; set; }

        [Column("INV_ESTADO")]
        [Required]
        [StringLength(20)]
        public string Estado { get; set; } = string.Empty;

        [Column("INV_UBICACION")]
        [StringLength(200)]
        public string? Ubicacion { get; set; }

        [Column("INV_RESPONSABLE")]
        [StringLength(100)]
        public string? Responsable { get; set; }

        [Column("INV_FECHAADQUISICION")]
        public DateTime? FechaAdquisicion { get; set; }

        [Column("INV_VALOR")]
        public decimal? Valor { get; set; }

        [Column("INV_STOCK")]
        public int? Stock { get; set; }

        [Column("INV_STOCKMINIMO")]
        public int? StockMinimo { get; set; }

        [Column("INV_PROVEEDOR")]
        [StringLength(200)]
        public string? Proveedor { get; set; }

        [Column("INV_FACTURA")]
        [StringLength(50)]
        public string? Factura { get; set; }

        [Column("INV_GARANTIA")]
        public DateTime? Garantia { get; set; }

        [Column("INV_OBSERVACIONES")]
        public string? Observaciones { get; set; }

        [Column("INV_ARCHIVOSADJUNTOS")]
        public string? ArchivosAdjuntos { get; set; }

        [Column("INV_FECHACREACION")]
        [Required]
        public DateTime FechaCreacion { get; set; }

        [Column("INV_FECHAMODIFICACION")]
        public DateTime? FechaModificacion { get; set; }

        [Column("INV_USUARIOCREACION")]
        [StringLength(100)]
        public string? UsuarioCreacion { get; set; }

        [Column("INV_USUARIOMODIFICACION")]
        [StringLength(100)]
        public string? UsuarioModificacion { get; set; }
    }
}


