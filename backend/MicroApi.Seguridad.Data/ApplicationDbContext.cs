using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Domain.Models;

namespace MicroApi.Seguridad.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets para las entidades principales
        public DbSet<Caso> Casos { get; set; }
        public DbSet<TrazabilidadCaso> TrazabilidadesCaso { get; set; }
        public DbSet<IntervencionTecnica> IntervencionesTecnicas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de Caso
            // Los nombres de columnas ya están mapeados con [Column] en el modelo
            // Solo configuramos las relaciones aquí
            modelBuilder.Entity<Caso>(entity =>
            {
                // Relación con TrazabilidadCaso
                entity.HasMany(e => e.Trazabilidades)
                    .WithOne(t => t.Caso)
                    .HasForeignKey(t => t.IdCaso)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configuración de TrazabilidadCaso
            modelBuilder.Entity<TrazabilidadCaso>(entity =>
            {
                // Relación con IntervencionTecnica
                entity.HasMany(t => t.IntervencionesTecnicas)
                    .WithOne(i => i.TrazabilidadCaso)
                    .HasForeignKey(i => i.IdTrazabilidadCaso)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}

