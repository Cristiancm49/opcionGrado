using MicroApi.Seguridad.Domain.DTOs.Inventario;
using MicroApi.Seguridad.Domain.Models.Inventario;

namespace MicroApi.Seguridad.Domain.Interfaces.Services
{
    public interface IComponenteService : IGenericService<Componente, ComponenteDto, ComponenteCreateDto, ComponenteUpdateDto>
    {
    }
}

