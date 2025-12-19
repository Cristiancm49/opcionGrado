namespace MicroApi.Seguridad.Domain.DTOs
{
    /// <summary>
    /// DTO base para catálogos simples (solo lectura)
    /// </summary>
    public class CatalogoSimpleDto
    {
        public long Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
    }
}




