using MicroApi.Seguridad.Application.Services.Acceso;
using MicroApi.Seguridad.Application.Services.Catalogo;
using MicroApi.Seguridad.Application.Services.Inventario;
using MicroApi.Seguridad.Application.Services.Soporte;
using MicroApi.Seguridad.Data.Repositories;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            
            // Repositorios específicos - Catálogo
            services.AddScoped<IAreaTecnicaRepository, AreaTecnicaRepository>();
            services.AddScoped<ICanalIngresoRepository, CanalIngresoRepository>();
            services.AddScoped<IPrioridadRepository, PrioridadRepository>();
            services.AddScoped<ITipoCasoRepository, TipoCasoRepository>();
            services.AddScoped<ITipoTrabajoRepository, TipoTrabajoRepository>();
            
            // Repositorios específicos - Acceso
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            
            // Repositorios específicos - Inventario/Catálogo
            services.AddScoped<ICategoriaActivoRepository, CategoriaActivoRepository>();
            services.AddScoped<ITipoConsumibleRepository, TipoConsumibleRepository>();
            
            // Repositorios específicos - Inventario
            services.AddScoped<IInventarioRepository, InventarioRepository>();
            services.AddScoped<IComponenteRepository, ComponenteRepository>();
            services.AddScoped<IConsumibleRepository, ConsumibleRepository>();
            services.AddScoped<IActivoRepository, ActivoRepository>();
            services.AddScoped<IHojaDeVidaActivoRepository, HojaDeVidaActivoRepository>();
            
            // Repositorios específicos - Soporte
            services.AddScoped<ICasoRepository, CasoRepository>();
            services.AddScoped<ITrazabilidadCasoRepository, TrazabilidadCasoRepository>();
            services.AddScoped<IIntervencionTecnicaRepository, IntervencionTecnicaRepository>();
            services.AddScoped<IDetalleCambioComponentesRepository, DetalleCambioComponentesRepository>();
            services.AddScoped<IDetalleConsumibleRepository, DetalleConsumibleRepository>();
            services.AddScoped<IRevisionAdmiRepository, RevisionAdmiRepository>();
            services.AddScoped<IEncuestaCalidadRepository, EncuestaCalidadRepository>();
            services.AddScoped<IDetalleEncuestaRepository, DetalleEncuestaRepository>();
            
            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Catálogo
            services.AddScoped<IEstadoGeneralService, EstadoGeneralService>();
            services.AddScoped<IAreaTecnicaService, AreaTecnicaService>();
            services.AddScoped<ICanalIngresoService, CanalIngresoService>();
            services.AddScoped<ITipoCasoService, TipoCasoService>();
            services.AddScoped<IEstadoCasoService, EstadoCasoService>();
            services.AddScoped<IEstadoActivoService, EstadoActivoService>();
            services.AddScoped<IEstadoConsumibleService, EstadoConsumibleService>();
            services.AddScoped<IEstadoIntervencionTecnicaService, EstadoIntervencionTecnicaService>();
            services.AddScoped<IPrioridadService, PrioridadService>();
            services.AddScoped<ITipoTrabajoService, TipoTrabajoService>();
            
            // Acceso
            services.AddScoped<IRolService, RolService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            
            // Inventario
            services.AddScoped<IUbicacionService, UbicacionService>();
            services.AddScoped<ICategoriaActivoService, CategoriaActivoService>();
            services.AddScoped<ITipoConsumibleService, TipoConsumibleService>();
            services.AddScoped<IInventarioService, InventarioService>();
            services.AddScoped<IComponenteService, ComponenteService>();
            services.AddScoped<IConsumibleService, ConsumibleService>();
            services.AddScoped<IActivoService, ActivoService>();
            services.AddScoped<IHojaDeVidaActivoService, HojaDeVidaActivoService>();
            
            // Soporte
            services.AddScoped<ICasoService, CasoService>();
            services.AddScoped<ITrazabilidadCasoService, TrazabilidadCasoService>();
            services.AddScoped<IIntervencionTecnicaService, IntervencionTecnicaService>();
            services.AddScoped<IDetalleCambioComponentesService, DetalleCambioComponentesService>();
            services.AddScoped<IDetalleConsumibleService, DetalleConsumibleService>();
            services.AddScoped<IRevisionAdmiService, RevisionAdmiService>();
            services.AddScoped<IEncuestaCalidadService, EncuestaCalidadService>();
            services.AddScoped<IDetalleEncuestaService, DetalleEncuestaService>();
            
            return services;
        }
    }
}
