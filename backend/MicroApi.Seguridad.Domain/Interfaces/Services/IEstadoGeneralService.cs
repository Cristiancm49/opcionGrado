using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Domain.Interfaces.Services
{
    /// <summary>
    /// Interfaz para el servicio de EstadoGeneral.
    /// Hereda los métodos CRUD básicos de IGenericService.
    /// </summary>
    public interface IEstadoGeneralService : IGenericService<
        EstadoGeneral,
        EstadoGeneralDto,
        EstadoGeneralCreateDto,
        EstadoGeneralUpdateDto>
    {
        // Esta tabla es muy simple, no necesita métodos adicionales.
        // Los métodos heredados (GetAll, GetById, Create, Update, Count) son suficientes.
    }
}
