using System.ComponentModel.DataAnnotations;

namespace MicroApi.Seguridad.Domain.DTOs.Soporte
{
    public class RevisionAdmiDto
    {
        public long Id { get; set; }
        public long IdIntervencionTecnica { get; set; }
        public bool Aprobado { get; set; }
        public string? ObservacionRevision { get; set; }
        public DateTime FechaRegistro { get; set; }
        public long IdUsuarioCreacion { get; set; }
        public string? NombreUsuario { get; set; }
    }

    public class RevisionAdmiCreateDto
    {
        [Required(ErrorMessage = "El ID de la intervención técnica es requerido")]
        public long IdIntervencionTecnica { get; set; }

        [Required(ErrorMessage = "El campo aprobado es requerido")]
        public bool Aprobado { get; set; }

        public string? ObservacionRevision { get; set; }

        [Required(ErrorMessage = "El ID del usuario de creación es requerido")]
        public long IdUsuarioCreacion { get; set; }
    }

    public class RevisionAdmiUpdateDto
    {
        [Required(ErrorMessage = "El ID de la revisión es requerido")]
        public long Id { get; set; }

        public bool? Aprobado { get; set; }

        public string? ObservacionRevision { get; set; }
    }
}

