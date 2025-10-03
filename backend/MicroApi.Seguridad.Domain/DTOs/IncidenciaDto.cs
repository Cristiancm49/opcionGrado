namespace MicroApi.Seguridad.Domain.DTOs
{
    public class IncidenciaDto
    {
        public int Id { get; set; }
        public string NumeroIncidencia { get; set; } = string.Empty;
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Solicitante { get; set; } = string.Empty;
        public string? Dependencia { get; set; }
        public string? Contacto { get; set; }
        public string? Telefono { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Prioridad { get; set; } = string.Empty;
        public string? AreaTecnica { get; set; }
        public string? TipoTrabajo { get; set; }
        public string Estado { get; set; } = string.Empty;
        public string? TecnicoAsignado { get; set; }
        public int? DiasAbierto { get; set; }
        public string? SlaStatus { get; set; }
        public string? Ubicacion { get; set; }
        public string? ElementoAfectado { get; set; }
        public string? Observaciones { get; set; }
        public string? CanalIngreso { get; set; }
        public string? UsuarioCreacion { get; set; }
        public string? UsuarioModificacion { get; set; }
    }

    public class IncidenciaCreateDto
    {
        public string Solicitante { get; set; } = string.Empty;
        public string? Dependencia { get; set; }
        public string? Contacto { get; set; }
        public string? Telefono { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Prioridad { get; set; } = string.Empty;
        public string? AreaTecnica { get; set; }
        public string? TipoTrabajo { get; set; }
        public string? Ubicacion { get; set; }
        public string? ElementoAfectado { get; set; }
        public string? Observaciones { get; set; }
        public string? CanalIngreso { get; set; }
    }

    public class IncidenciaUpdateDto
    {
        public int Id { get; set; }
        public string? Estado { get; set; }
        public string? TecnicoAsignado { get; set; }
        public string? Observaciones { get; set; }
        public string? UsuarioModificacion { get; set; }
    }

    public class IncidenciaFiltrosDto
    {
        public string? Solicitante { get; set; }
        public string? Estado { get; set; }
        public string? Tecnico { get; set; }
        public string? SlaStatus { get; set; }
        public DateTime? FechaDesde { get; set; }
        public DateTime? FechaHasta { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}


