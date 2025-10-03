namespace MicroApi.Seguridad.Domain.DTOs
{
    public class CasoDto
    {
        public int Id { get; set; }
        public string NumeroCaso { get; set; } = string.Empty;
        public DateTime FechaRegistro { get; set; }
        public DateTime? FechaAsignacion { get; set; }
        public DateTime? FechaLimite { get; set; }
        public DateTime? FechaFin { get; set; }
        public DateTime? FechaUltimaActualizacion { get; set; }
        public string Solicitante { get; set; } = string.Empty;
        public string? Dependencia { get; set; }
        public string? Contacto { get; set; }
        public string? Telefono { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Prioridad { get; set; } = string.Empty;
        public string? AreaTecnica { get; set; }
        public string? TipoTrabajo { get; set; }
        public string Estado { get; set; } = string.Empty;
        public string? EstadoTecnico { get; set; }
        public string? TecnicoAsignado { get; set; }
        public int? DiasAsignado { get; set; }
        public int? HorasEstimadas { get; set; }
        public int? HorasTrabajadas { get; set; }
        public string? SlaStatus { get; set; }
        public int? PrioridadSla { get; set; }
        public string? Ubicacion { get; set; }
        public string? ElementoAfectado { get; set; }
        public string? Observaciones { get; set; }
        public int? DiasAbiertoCalc { get; set; }
        public string? CanalIngreso { get; set; }
        public string? UsuarioCreacion { get; set; }
        public string? UsuarioModificacion { get; set; }
    }

    public class CasoCreateDto
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

    public class CasoUpdateDto
    {
        public int Id { get; set; }
        public string? Estado { get; set; }
        public string? EstadoTecnico { get; set; }
        public string? TecnicoAsignado { get; set; }
        public int? HorasTrabajadas { get; set; }
        public string? Observaciones { get; set; }
        public string? UsuarioModificacion { get; set; }
    }

    public class CasoFiltrosDto
    {
        public string? Solicitante { get; set; }
        public string? Estado { get; set; }
        public string? Tecnico { get; set; }
        public string? TipoTrabajo { get; set; }
        public DateTime? FechaDesde { get; set; }
        public DateTime? FechaHasta { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}


