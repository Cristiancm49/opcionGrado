using System.ComponentModel.DataAnnotations;

namespace MicroApi.Seguridad.Domain.DTOs.Inventario
{
    public class UbicacionDto
    {
        public long Id { get; set; }
        public string Sede { get; set; } = string.Empty;
        public string? Bloque { get; set; }
        public string? Piso { get; set; }
        public string? Sala { get; set; }
        public string? Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }

        /// <summary>
        /// Ubicación formateada: Sede - Bloque - Piso - Sala
        /// </summary>
        public string UbicacionCompleta => string.Join(" - ", 
            new[] { Sede, Bloque, Piso, Sala }.Where(x => !string.IsNullOrEmpty(x)));
    }

    public class UbicacionCreateDto
    {
        [Required(ErrorMessage = "La sede es requerida")]
        [StringLength(150, ErrorMessage = "La sede no puede exceder 150 caracteres")]
        public string Sede { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "El bloque no puede exceder 100 caracteres")]
        public string? Bloque { get; set; }

        [StringLength(50, ErrorMessage = "El piso no puede exceder 50 caracteres")]
        public string? Piso { get; set; }

        [StringLength(150, ErrorMessage = "La sala no puede exceder 150 caracteres")]
        public string? Sala { get; set; }

        public string? Descripcion { get; set; }

        [Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    public class UbicacionUpdateDto
    {
        [Required(ErrorMessage = "El ID de la ubicación es requerido")]
        public long Id { get; set; }

        [StringLength(150, ErrorMessage = "La sede no puede exceder 150 caracteres")]
        public string? Sede { get; set; }

        [StringLength(100, ErrorMessage = "El bloque no puede exceder 100 caracteres")]
        public string? Bloque { get; set; }

        [StringLength(50, ErrorMessage = "El piso no puede exceder 50 caracteres")]
        public string? Piso { get; set; }

        [StringLength(150, ErrorMessage = "La sala no puede exceder 150 caracteres")]
        public string? Sala { get; set; }

        public string? Descripcion { get; set; }
    }
}

