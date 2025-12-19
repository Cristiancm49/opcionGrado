using MicroApi.Seguridad.Application.Services.Catalogo;
using MicroApi.Seguridad.Data.Repositories;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Catalogo;

namespace MicroApi.Seguridad.Api.Extensions
{
    /// <summary>
    /// Extensiones para configurar la Inyección de Dependencias (DI).
    /// 
    /// ¿QUÉ ES INYECCIÓN DE DEPENDENCIAS?
    /// Es un patrón donde .NET automáticamente crea y pasa las dependencias.
    /// 
    /// Ejemplo sin DI:
    ///   var repository = new GenericRepository<Usuario>(context); // Tú creas todo
    ///   var service = new UsuarioService(repository);
    /// 
    /// Ejemplo con DI:
    ///   public class MiController(IUsuarioService service) // .NET te lo pasa
    /// 
    /// TIPOS DE CICLO DE VIDA:
    /// - AddScoped: Una instancia por request HTTP (más común)
    /// - AddTransient: Nueva instancia cada vez que se pide
    /// - AddSingleton: Una sola instancia para toda la app
    /// </summary>
    public static class ServiceExtensions
    {
        /// <summary>
        /// Registra todos los repositorios genéricos
        /// </summary>
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // Registra el repositorio genérico para cualquier entidad
            // Cuando alguien pida IGenericRepository<Usuario>, .NET creará GenericRepository<Usuario>
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // Aquí puedes agregar repositorios específicos si los necesitas
            // services.AddScoped<ICasoRepository, CasoRepository>();

            return services;
        }

        /// <summary>
        /// Registra todos los servicios de negocio
        /// </summary>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // ==================== CATÁLOGO ====================
            services.AddScoped<IEstadoGeneralService, EstadoGeneralService>();
            
            // Aquí iremos agregando más servicios conforme los creemos:
            // services.AddScoped<IAreaTecnicaService, AreaTecnicaService>();
            // services.AddScoped<IPrioridadService, PrioridadService>();
            // etc.

            return services;
        }
    }
}

