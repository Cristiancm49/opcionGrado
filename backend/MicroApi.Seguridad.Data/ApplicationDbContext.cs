using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Models.Acceso;
using MicroApi.Seguridad.Domain.Models.Catalogo;
using MicroApi.Seguridad.Domain.Models.Inventario;
using MicroApi.Seguridad.Domain.Models.Soporte;

namespace MicroApi.Seguridad.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // ==================== SCHEMA ACCESO ====================
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        // ==================== SCHEMA CATALOGO ====================
        public DbSet<EstadoGeneral> EstadosGenerales { get; set; }
        public DbSet<AreaTecnica> AreasTecnicas { get; set; }
        public DbSet<TipoTrabajo> TiposTrabajos { get; set; }
        public DbSet<EstadoIntervencionTecnica> EstadosIntervencionTecnica { get; set; }
        public DbSet<EstadoCaso> EstadosCaso { get; set; }
        public DbSet<Prioridad> Prioridades { get; set; }
        public DbSet<TipoCaso> TiposCaso { get; set; }
        public DbSet<CanalIngreso> CanalesIngreso { get; set; }
        public DbSet<Pregunta> Preguntas { get; set; }
        public DbSet<Respuesta> Respuestas { get; set; }
        public DbSet<CategoriaActivo> CategoriasActivo { get; set; }
        public DbSet<EstadoActivo> EstadosActivo { get; set; }
        public DbSet<TipoConsumible> TiposConsumible { get; set; }
        public DbSet<EstadoConsumible> EstadosConsumible { get; set; }

        // ==================== SCHEMA INVENTARIO ====================
        public DbSet<Ubicacion> Ubicaciones { get; set; }
        public DbSet<Inventario> Inventarios { get; set; }
        public DbSet<Activo> Activos { get; set; }
        public DbSet<Componente> Componentes { get; set; }
        public DbSet<Consumible> Consumibles { get; set; }
        public DbSet<HojaDeVidaActivo> HojasDeVidaActivo { get; set; }

        // ==================== SCHEMA SOPORTE ====================
        public DbSet<Caso> Casos { get; set; }
        public DbSet<TrazabilidadCaso> TrazabilidadesCaso { get; set; }
        public DbSet<IntervencionTecnica> IntervencionesTecnicas { get; set; }
        public DbSet<DetalleCambioComponentes> DetallesCambioComponentes { get; set; }
        public DbSet<DetalleConsumible> DetallesConsumible { get; set; }
        public DbSet<RevisionAdmi> RevisionesAdmi { get; set; }
        public DbSet<EncuestaCalidad> EncuestasCalidad { get; set; }
        public DbSet<DetalleEncuesta> DetallesEncuesta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==================== CONFIGURACION ACCESO ====================
            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasMany(r => r.Usuarios)
                    .WithOne(u => u.Rol)
                    .HasForeignKey(u => u.IdRol)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== CONFIGURACION CATALOGO ====================
            modelBuilder.Entity<AreaTecnica>(entity =>
            {
                entity.HasOne(a => a.EstadoGeneral)
                    .WithMany()
                    .HasForeignKey(a => a.IdEstadoGeneral)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Encargado)
                    .WithMany()
                    .HasForeignKey(a => a.IdEncargado)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<CanalIngreso>(entity =>
            {
                entity.HasOne(c => c.EstadoGeneral)
                    .WithMany()
                    .HasForeignKey(c => c.IdEstadoGeneral)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Prioridad>(entity =>
            {
                entity.HasOne(p => p.EstadoGeneral)
                    .WithMany()
                    .HasForeignKey(p => p.IdEstadoGeneral)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TipoCaso>(entity =>
            {
                entity.HasOne(t => t.EstadoGeneral)
                    .WithMany()
                    .HasForeignKey(t => t.IdEstadoGeneral)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TipoTrabajo>(entity =>
            {
                entity.HasOne(t => t.EstadoGeneral)
                    .WithMany()
                    .HasForeignKey(t => t.IdEstadoGeneral)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== CONFIGURACION INVENTARIO ====================
            modelBuilder.Entity<Inventario>(entity =>
            {
                entity.HasMany(i => i.Activos)
                    .WithOne(a => a.Inventario)
                    .HasForeignKey(a => a.IdInventario)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(i => i.Componentes)
                    .WithOne(c => c.Inventario)
                    .HasForeignKey(c => c.IdInventario)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(i => i.Consumibles)
                    .WithOne(c => c.Inventario)
                    .HasForeignKey(c => c.IdInventario)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Activo>(entity =>
            {
                entity.HasMany(a => a.HojasDeVida)
                    .WithOne(h => h.Activo)
                    .HasForeignKey(h => h.IdActivo)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== CONFIGURACION SOPORTE ====================
            modelBuilder.Entity<Caso>(entity =>
            {
                entity.HasMany(c => c.Trazabilidades)
                    .WithOne(t => t.Caso)
                    .HasForeignKey(t => t.IdCaso)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(c => c.Encuestas)
                    .WithOne(e => e.Caso)
                    .HasForeignKey(e => e.IdCaso)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<TrazabilidadCaso>(entity =>
            {
                entity.HasMany(t => t.IntervencionesTecnicas)
                    .WithOne(i => i.TrazabilidadCaso)
                    .HasForeignKey(i => i.IdTrazabilidadCaso)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<IntervencionTecnica>(entity =>
            {
                entity.HasMany(i => i.CambiosComponentes)
                    .WithOne(c => c.IntervencionTecnica)
                    .HasForeignKey(c => c.IdIntervencionTecnica)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(i => i.DetallesConsumibles)
                    .WithOne(d => d.IntervencionTecnica)
                    .HasForeignKey(d => d.IdIntervencionTecnica)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(i => i.RevisionAdmi)
                    .WithOne(r => r.IntervencionTecnica)
                    .HasForeignKey<RevisionAdmi>(r => r.IdIntervencionTecnica)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<EncuestaCalidad>(entity =>
            {
                entity.HasMany(e => e.Detalles)
                    .WithOne(d => d.Encuesta)
                    .HasForeignKey(d => d.IdEncuesta)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
